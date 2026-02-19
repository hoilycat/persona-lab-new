
import React, { useState, useMemo, useRef, useEffect } from 'react';
import type{ AppStep, MBTIType } from './types';
import { QUESTIONS, RESULTS } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep | 'LOADING'>('START');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIType[]>([]);
  const [introImage, setIntroImage] = useState<string>("https://picsum.photos/seed/cute/300/300");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStart = () => {
    setStep('QUIZ');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIntroImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAnswer = (type: MBTIType) => {
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('LOADING');
    }
  };

  // Anticipation effect before showing the result
  useEffect(() => {
    if (step === 'LOADING') {
      const timer = setTimeout(() => {
        setStep('RESULT');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const calculateResult = useMemo(() => {
    if (answers.length < QUESTIONS.length) return "";

    const counts: Record<MBTIType, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    answers.forEach(ans => {
      counts[ans]++;
    });

    const mbti = 
      (counts.E >= counts.I ? 'E' : 'I') +
      (counts.S >= counts.N ? 'S' : 'N') +
      (counts.T >= counts.F ? 'T' : 'F') +
      (counts.J >= counts.P ? 'J' : 'P');

    return mbti;
  }, [answers]);

  const resultData = step === 'RESULT' ? RESULTS[calculateResult] : null;
  const progressPercentage = (currentQuestionIndex / QUESTIONS.length) * 100;

  // Dynamic Background Style
  const pageStyle = {
    backgroundColor: step === 'RESULT' && resultData ? resultData.themeColor : '#FFF5F5',
    transition: 'background-color 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-1000" style={pageStyle}>
      <div 
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 flex flex-col min-h-[600px] transition-all duration-500"
        style={{ borderColor: step === 'RESULT' && resultData ? `${resultData.themeColor}cc` : '#FFE4E6' }}
      >
        
        {/* Step 1: Start Screen */}
        {step === 'START' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 bounce-in">
            <div className="relative group">
              <div className="w-48 h-48 bg-pink-50 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-inner transform transition-transform group-hover:scale-105">
                 <img src={introImage} alt="Intro" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={triggerFileUpload}
                className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-pink-100 hover:bg-pink-50 transition-colors"
                title="사진 바꾸기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-pink-500 font-gaegu">내 안의 부캐 찾기</h1>
              <p className="text-gray-600 font-medium leading-relaxed">
                20가지 질문으로 알아보는<br />
                나의 숨겨진 성격 캐릭터!
              </p>
            </div>
            
            <button
              onClick={handleStart}
              className="w-full py-5 bg-pink-400 hover:bg-pink-500 text-white font-bold text-xl rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              테스트 시작하기! ✨
            </button>
          </div>
        )}

        {/* Step 2: Quiz Screen */}
        {step === 'QUIZ' && (
          <div className="flex-1 flex flex-col p-6">
            <div className="mb-8 space-y-4">
              <div className="flex justify-between items-center px-2">
                <span className="text-pink-400 font-bold font-gaegu text-xl">
                  {currentQuestionIndex + 1} / {QUESTIONS.length}
                </span>
                <span className="text-gray-400 text-sm">진행중...</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-300 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-12 bounce-in">
              <h2 className="text-2xl font-bold text-gray-800 text-center leading-relaxed">
                {QUESTIONS[currentQuestionIndex].text}
              </h2>
              <div className="space-y-4">
                {QUESTIONS[currentQuestionIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.type)}
                    className="w-full p-6 text-left border-2 border-pink-100 hover:border-pink-300 hover:bg-pink-50 bg-white text-gray-700 font-medium rounded-3xl shadow-sm transition-all transform active:scale-[0.98]"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step: Loading Screen */}
        {step === 'LOADING' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
            <div className="dot-flashing"></div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-pink-500 font-gaegu">분석 중...</h2>
              <p className="text-gray-500 font-medium">당신의 성격을 열심히 분석하고 있어요!</p>
            </div>
          </div>
        )}

        {/* Step 3: Result Screen */}
        {step === 'RESULT' && resultData && (
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
            <div className="text-center mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-pink-400 font-bold mb-1">나의 부캐는...</p>
              <h1 className="text-5xl font-bold text-pink-600 font-gaegu">{calculateResult}</h1>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-1">
              <div className="rounded-3xl overflow-hidden shadow-xl pop-in" style={{ animationDelay: '0.4s' }}>
                <img 
                  src={resultData.imageUrl} 
                  alt="Result" 
                  className="w-full h-56 object-cover transform transition-transform hover:scale-110 duration-1000"
                />
              </div>

              <div className="text-center fade-in-up" style={{ animationDelay: '0.7s' }}>
                <h2 className="text-3xl font-bold text-gray-800 font-gaegu mb-2">
                  {resultData.title}
                </h2>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {resultData.description}
                </p>
              </div>

              <div className="p-6 rounded-3xl space-y-3 pop-in" style={{ backgroundColor: `${resultData.themeColor}cc`, animationDelay: '0.9s' }}>
                <h3 className="font-bold text-pink-600 mb-3 text-lg">✨ 주요 특징</h3>
                {resultData.traits.map((trait, i) => (
                  <div 
                    key={i} 
                    className="flex items-center space-x-3 text-gray-700 slide-in-right" 
                    style={{ animationDelay: `${1.1 + (i * 0.15)}s` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    <span className="font-medium">{trait}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center p-5 bg-white border-2 border-pink-50 rounded-2xl shadow-sm fade-in-up" style={{ animationDelay: '1.6s' }}>
                <span className="text-gray-500 font-bold">찰떡궁합 친구</span>
                <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-5 py-1.5 rounded-full font-bold shadow-md">
                  {resultData.matching}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep('START')}
              className="mt-6 w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 fade-in-up"
              style={{ animationDelay: '1.9s' }}
            >
              다시 테스트하기 🔄
            </button>
          </div>
        )}

      </div>
      
      {/* Footer Text */}
      <div className="fixed bottom-4 text-gray-400 text-xs font-medium tracking-wide">
        © 2024 CUTE MBTI LAB • DESIGNED WITH LOVE
      </div>
    </div>
  );
};

export default App;
