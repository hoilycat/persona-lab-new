import React, { useState } from 'react';

interface Attempt {
    number: number;
    result: 'UP' | 'DOWN' | 'CORRECT';
}

interface Round {
    roundNumber: number;
    attempts: Attempt[];
}

const NumberGame: React.FC = () => {
    const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

    const [target, setTarget] = useState<number>(generateRandomNumber);
    const [input, setInput] = useState<string>('');
    const [message, setMessage] = useState<string>('1부터 100 사이의 숫자를 맞춰보세요!');
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [gameHistory, setGameHistory] = useState<Round[]>([]);
    const [currentAttempts, setCurrentAttempts] = useState<Attempt[]>([]);

    const checkNumber = () => {
        if (isFinished) return;
        const userNum = parseInt(input);
        if (isNaN(userNum)) return;

        let result: 'UP' | 'DOWN' | 'CORRECT';
        if (userNum === target) {
            result = 'CORRECT';
            setMessage('🎉 정답입니다!');
            setIsFinished(true);
        } else if (userNum > target) {
            result = 'DOWN';
            setMessage('DOWN 👇');
        } else {
            result = 'UP';
            setMessage('UP 👆');
        }

        setCurrentAttempts(prev => [...prev, { number: userNum, result }]);
        setInput('');
    };

    const resetGame = () => {
        const newRound: Round = {
            roundNumber: gameHistory.length + 1,
            attempts: currentAttempts
        };
        setGameHistory([newRound, ...gameHistory]);
        setTarget(generateRandomNumber());
        setCurrentAttempts([]);
        setInput('');
        setMessage('새 게임 시작! 숫자를 맞춰보세요.');
        setIsFinished(false);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') checkNumber();
    };

    // 🎨 기존 색상 로직 유지
    const getResultColor = (result: string) => {
        switch (result) {
            case 'UP': return '#e67e22';
            case 'DOWN': return '#3498db';
            case 'CORRECT': return '#2ecc71';
            default: return '#B980FF';
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
            {/* 메인 게임 영역 (정사각형 스타일 유지) */}
            <div style={{
                backgroundColor: isFinished ? '#D1A3FF' : '#330066',
                width: '100%',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: isFinished ? '#330066' : '#E6CCFF',
                borderRadius: '25px',
                transition: 'all 0.2s',
                boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{message}</h2>

                {!isFinished ? (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder=""
                            style={{
                                width: '80px', padding: '15px', fontSize: '1.5rem',
                                textAlign: 'center', borderRadius: '15px', border: '3px solid #4D0080',
                                backgroundColor: '#1A0033', color: 'white', outline: 'none'
                            }}
                        />
                        <button onClick={checkNumber} style={{
                            padding: '15px 30px', fontSize: '1.1rem', cursor: 'pointer',
                            backgroundColor: '#4D0080', color: 'white', border: 'none',
                            borderRadius: '15px', fontWeight: 'bold', boxShadow: '0 4px 0 #1A0033'
                        }}>확인</button>
                    </div>
                ) : (
                    <button onClick={resetGame} style={{
                        padding: '15px 40px', fontSize: '1.2rem', cursor: 'pointer',
                        backgroundColor: '#330066', color: 'white', border: 'none',
                        borderRadius: '15px', fontWeight: 'bold', boxShadow: '0 4px 0 #4D0080'
                    }}>다시 시작하기</button>
                )}
            </div>

            {/* 현재 진행 상황 (박스 바로 아래) */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ color: '#B980FF', fontSize: '1rem', marginBottom: '10px' }}>
                    시도 횟수: {currentAttempts.length}회
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {currentAttempts.map((at, i) => (
                        <span key={i} style={{
                            padding: '5px 12px', background: '#330066',
                            color: getResultColor(at.result), borderRadius: '12px',
                            fontSize: '0.9rem', border: `1px solid ${getResultColor(at.result)}`
                        }}>
                            {at.number} {at.result === 'CORRECT' ? '★' : at.result === 'UP' ? '▲' : '▼'}
                        </span>
                    ))}
                </div>
            </div>

            {/* 지난 기록 (점선 테두리 스타일) */}
            {gameHistory.length > 0 && (
                <div style={{ marginTop: '30px', borderTop: '2px solid #8A2BE2', paddingTop: '20px' }}>
                    <h3 style={{ color: '#E6CCFF', fontSize: '1.1rem', marginBottom: '15px' }}>지난 기록</h3>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {gameHistory.map((round) => (
                            <div key={round.roundNumber} style={{
                                marginBottom: '15px', padding: '15px',
                                background: 'transparent', borderRadius: '18px',
                                border: '2px dashed #4D0080'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: '#E6CCFF', fontWeight: 'bold' }}>{round.roundNumber}회차</span>
                                    <span style={{ color: '#D1A3FF' }}>{round.attempts.length}번 만에 맞춤</span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {round.attempts.map((at, i) => (
                                        <span key={i} style={{
                                            color: getResultColor(at.result), fontSize: '0.85rem',
                                            padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(185, 128, 255, 0.2)'
                                        }}>
                                            {at.number}
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

export default NumberGame;