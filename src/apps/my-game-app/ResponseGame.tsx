import { useState, useRef } from 'react';

type ScreenState = 'waiting' | 'ready' | 'now' | 'finished';

interface Round {
    roundNumber: number;
    attempts: number[];
    average: number;
}

const ResponseGame = () => {
    const [state, setState] = useState<ScreenState>('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [currentAttempts, setCurrentAttempts] = useState<number[]>([]);
    const [gameHistory, setGameHistory] = useState<Round[]>([]);

    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startTime = useRef(0);

    const onClickScreen = () => {
        if (state === 'waiting' || state === 'finished') {
            if (state === 'finished') setCurrentAttempts([]);

            setState('ready');
            setMessage('초록색이 되면 클릭하세요!');

            timer.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭!!');
                startTime.current = performance.now();
            }, Math.floor(Math.random() * 3000) + 2000);

        } else if (state === 'ready') {
            if (timer.current) clearTimeout(timer.current);
            setState('waiting');
            setMessage('너무 빨라요! 다시 클릭하세요.');

        } else if (state === 'now') {
            const endTime = performance.now();
            const reactionTime = Math.floor(endTime - startTime.current);
            const nextAttempts = [...currentAttempts, reactionTime];

            setCurrentAttempts(nextAttempts);

            if (nextAttempts.length < 5) {
                setState('waiting');
                setMessage(`성공! 다시 클릭해서 이어가세요.`);
            } else {
                const avg = Math.floor(nextAttempts.reduce((a, b) => a + b) / 5);
                const newRound: Round = {
                    roundNumber: gameHistory.length + 1,
                    attempts: nextAttempts,
                    average: avg
                };

                setGameHistory([newRound, ...gameHistory]);
                setState('finished');
                setMessage(`테스트 완료! 평균: ${avg}ms`);
            }
        }
    };

    // 🎨 배경색 로직 수정
    const getBgColor = () => {
        switch (state) {
            case 'waiting': return '#ff4d4d';     // 빨간색
            case 'ready': return '#ffcc00';       // 노란색
            case 'now': return '#2ecc71';         // 초록색
            case 'finished': return '#D1A3FF';    // 연보라 (#D1A3FF)
            default: return '#B980FF';           // 연보라보다 살짝 진한 보라 (#B980FF)
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
            {/* 클릭 영역 (메시지만 표시) */}
            <div
                onClick={onClickScreen}
                style={{
                    backgroundColor: getBgColor(),
                    width: '100%',
                    height: '250px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: (state === 'ready' || state === 'finished') ? '#330066' : '#FFFFFF',
                    borderRadius: '25px',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                    textAlign: 'center',
                    userSelect: 'none'
                }}
            >
                <h2 style={{ fontSize: '1.6rem', margin: '0 20px', fontWeight: 'bold' }}>{message}</h2>
            </div>

            {/* 박스 아래 영역 (진행도 + 시도 기록) */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {/* 진행도 표시 */}
                <p style={{ color: '#B980FF', fontSize: '1rem', marginBottom: '10px', fontWeight: '500' }}>
                    {state !== 'finished' ? `진행도: ${currentAttempts.length} / 5` : '테스트가 종료되었습니다.'}
                </p>

                {/* 현재 판 실시간 기록 배지 */}
                {currentAttempts.length > 0 && state !== 'finished' && (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                        {currentAttempts.map((time, i) => (
                            <span key={i} style={{
                                padding: '5px 12px', background: '#330066', color: '#B980FF',
                                borderRadius: '12px', fontSize: '0.85rem', border: '1px solid #4D0080'
                            }}>
                                {time}ms
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* 누적 지난 기록 (점선 테두리 스타일) */}
            {gameHistory.length > 0 && (
                <div style={{ marginTop: '30px', borderTop: '2px solid #8A2BE2', paddingTop: '20px' }}>
                    <h3 style={{ color: '#E6CCFF', fontSize: '1.1rem', marginBottom: '15px' }}>지난 기록</h3>
                    <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '5px' }}>
                        {gameHistory.map((round) => (
                            <div key={round.roundNumber} style={{
                                marginBottom: '15px',
                                padding: '15px',
                                // 배경색(background)과 그림자(boxShadow) 제거
                                background: 'transparent',
                                borderRadius: '18px',
                                // 실선(solid) 대신 점선(dashed)으로 변경
                                border: '2px dashed #4D0080'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ color: '#E6CCFF', fontWeight: 'bold' }}>{round.roundNumber}회차</span>
                                    <span style={{ color: '#D1A3FF', fontSize: '1.1rem', fontWeight: '900' }}>평균 {round.average}ms</span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {round.attempts.map((t, i) => (
                                        <span key={i} style={{
                                            color: '#B980FF',
                                            fontSize: '0.85rem',
                                            // 각 시도별 배지도 배경 없이 경계선만 주거나 깔끔하게 텍스트로 표현
                                            background: 'transparent',
                                            border: '1px solid rgba(185, 128, 255, 0.3)',
                                            padding: '3px 8px',
                                            borderRadius: '6px'
                                        }}>
                                            {i + 1}차: {t}ms
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResponseGame;