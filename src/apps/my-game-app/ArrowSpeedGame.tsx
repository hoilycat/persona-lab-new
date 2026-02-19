import React, { useState, useEffect, useCallback, useRef } from 'react';

// 1. 타입 및 상수 설정
type ArrowDir = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';
const ARROW_MAP: Record<ArrowDir, string> = {
    ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→'
};

interface Round {
    id: number;
    score: number;
}

const ArrowSpeedGame: React.FC = () => {
    // 2. 상태 관리 (State)
    const [target, setTarget] = useState<ArrowDir>('ArrowUp'); // 현재 맞춰야 할 화살표 방향
    const [score, setScore] = useState(0);                    // 화면 표시용 점수
    const [isActive, setIsActive] = useState(false);          // 게임 진행 중 여부
    const [timeLeft, setTimeLeft] = useState(15);             // 남은 시간 (초)
    const [history, setHistory] = useState<Round[]>([]);      // 이전 게임 기록 리스트

    // 3. 참조 변수 (Ref) - 렌더링을 유발하지 않고 즉시 값을 참조/변경하기 위함
    const scoreRef = useRef(0);                               // 실시간 점수 계산용 (handleKeyDown에서 참조)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // 타이머 인터벌 저장
    const isEndingRef = useRef(false);                        // 종료 로직 중복 실행 방지 플래그

    // [함수] 랜덤 화살표 생성
    const getRandomArrow = (): ArrowDir => {
        const keys = Object.keys(ARROW_MAP) as ArrowDir[];
        return keys[Math.floor(Math.random() * keys.length)];
    };

    // [함수] 게임 종료 로직
    const endGame = useCallback(() => {
        if (isEndingRef.current) return; // 이미 종료 처리 중이면 무시
        isEndingRef.current = true;

        setIsActive(false);
        if (timerRef.current) {
            clearInterval(timerRef.current); // 타이머 멈춤
            timerRef.current = null;
        }

        // 결과 기록 저장 (최신순)
        const finalScore = scoreRef.current;
        setHistory(prev => {
            const nextId = prev.length > 0 ? prev[0].id + 1 : 1;
            return [{ id: nextId, score: finalScore }, ...prev];
        });
    }, []);

    // [함수] 게임 시작 로직
    const startGame = () => {
        isEndingRef.current = false;
        scoreRef.current = 0;
        setScore(0);
        setTimeLeft(15);
        setIsActive(true);
        setTarget(getRandomArrow());

        // 0.1초마다 시간이 줄어드는 타이머 설정
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0.1) {
                    endGame(); // 0초 도달 시 종료
                    return 0;
                }
                return Number((prev - 0.1).toFixed(1)); // 소수점 한자리 유지
            });
        }, 100);
    };

    // 4. 키보드 입력 감지 (Event Listener)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // 게임 중 화살표 키/스페이스바를 누를 때 화면 스크롤 방지
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }

            if (!isActive) return;

            // 방향키 입력 시 실행
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                // 정답 판정: 입력한 키와 현재 타겟이 일치하는지 확인
                if (e.key === target) {
                    const nextScore = scoreRef.current + 1;
                    scoreRef.current = nextScore;
                    setScore(nextScore);
                }
                // 틀려도 다음 화살표로 넘어가 리듬감 유지
                setTarget(getRandomArrow());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, target]); // 타겟이 바뀔 때마다 리스너 업데이트

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
            {/* 메인 게임 박스 */}
            <div style={{
                backgroundColor: '#1A0033',
                padding: '40px 20px',
                borderRadius: '30px',
                boxShadow: '0 0 50px rgba(161, 78, 255, 0.2)',
                border: '4px solid #4D0080',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* 실시간 점수 표시 */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: '#B980FF', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {score} <span style={{ fontSize: '0.8rem' }}>HITS</span>
                </div>

                {/* 상단 타임 바 그래프 */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, height: '6px',
                    width: `${(timeLeft / 15) * 100}%`,
                    backgroundColor: timeLeft <= 3 ? '#FF4D4D' : '#A14EFF', // 3초 이하일 때 빨간색
                    transition: 'width 0.1s linear',
                    // 3초 이하일 때 바가 파르르 떨리며 깜빡임
                    animation: timeLeft <= 3 ? 'barDanger 0.2s infinite' : 'none',
                    boxShadow: timeLeft <= 3 ? '0 0 10px #FF4D4D' : 'none'
                }} />

                {!isActive ? (
                    /* 대기 화면 */
                    <div>
                        <h2 style={{ color: '#E6CCFF', marginBottom: '10px' }}>Arrow Speed Run</h2>
                        <p style={{ color: '#B980FF', fontSize: '0.9rem', marginBottom: '20px' }}>제한 시간 15초 타임어택!</p>
                        <button onClick={startGame} style={buttonStyle}>시작하기</button>
                    </div>
                ) : (
                    /* 화살표 표시부 */
                    <div style={{
                        fontSize: '7rem',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        transition: 'transform 0.05s ease-out',
                        // 그림자 애니메이션: 항상 깜빡이되, 3초 이하에선 속도가 0.8s -> 0.3s로 빨라짐
                        animation: `shadowPulse ${timeLeft <= 3 ? '0.3s' : '0.8s'} infinite alternate`,
                        textShadow: '0 0 20px #A14EFF'
                    }}>
                        {ARROW_MAP[target]}
                    </div>
                )}
            </div>

            {/* 과거 기록 리스트 */}
            {history.length > 0 && (
                <div style={{ marginTop: '30px', textAlign: 'left' }}>
                    <h3 style={{ color: '#E6CCFF', fontSize: '1rem', opacity: 0.7 }}>RECENT RECORDS</h3>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '10px' }}>
                        {history.map(round => (
                            <div key={round.id} style={recordItemStyle}>
                                <span>{round.id}회차</span>
                                <strong style={{ color: '#B980FF' }}>{round.score} hits</strong>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CSS 애니메이션 정의 */}
            <style>{`
                /* 화살표 보라색 그림자 퍼짐 효과 */
                @keyframes shadowPulse {
                    from { text-shadow: 0 0 10px #A14EFF, 0 0 20px #A14EFF; }
                    to { text-shadow: 0 0 30px #D1A3FF, 0 0 50px #A14EFF, 0 0 80px #4D0080; }
                }

                /* 남은 시간 3초 미만 시 타임바 흔들림 효과 */
                @keyframes barDanger {
                    0% { opacity: 1; transform: translateX(0); }
                    50% { opacity: 0.5; transform: translateX(1px); }
                    100% { opacity: 1; transform: translateX(-1px); }
                }
            `}</style>
        </div>
    );
};

// 5. 공용 스타일 설정
const recordItemStyle = {
    display: 'flex', justifyContent: 'space-between', padding: '12px 18px',
    backgroundColor: '#330066', borderRadius: '15px', marginBottom: '8px',
    border: '1px solid #4D0080', color: '#E6CCFF'
};

const buttonStyle = {
    padding: '15px 45px', fontSize: '1.2rem', backgroundColor: '#A14EFF',
    color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold',
    cursor: 'pointer', boxShadow: '0 6px 0 #4D0080', transition: 'all 0.1s'
};

export default ArrowSpeedGame;