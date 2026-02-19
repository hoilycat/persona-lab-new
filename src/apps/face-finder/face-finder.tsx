
import React, { useState, useCallback } from 'react';
import type { AppState, AnimalResult } from './types';
import CameraUI from './components/CameraUI';
import LoadingScan from './components/LoadingScan';
import ResultCard from './components/ResultCard';
import { analyzeFaceForAnimal } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('IDLE');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnimalResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startTest = () => {
    setError(null);
    setState('CAMERA');
  };

  const handleCapture = useCallback(async (image: string) => {
    setCapturedImage(image);
    setState('ANALYZING');
    
    try {
      const analysis = await analyzeFaceForAnimal(image);
      setResult(analysis);
      setState('RESULT');
    } catch (err) {
      console.error(err);
      setError("AI 분석에 실패했습니다. 다른 사진으로 시도해보세요.");
      setState('IDLE');
    }
  }, []);

  const reset = () => {
    setCapturedImage(null);
    setResult(null);
    setError(null);
    setState('IDLE');
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] flex flex-col items-center justify-center p-4 selection:bg-pink-200">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {state === 'IDLE' && (
        <div className="max-w-xl w-full text-center py-12 px-6 bg-white rounded-[48px] shadow-2xl border border-zinc-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 bg-pink-500 rounded-[32px] rotate-3 flex items-center justify-center text-6xl shadow-2xl shadow-pink-200">
              🦊
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg border border-zinc-100">
              ✨
            </div>
          </div>
          
          <h1 className="text-5xl font-fredoka font-bold text-zinc-900 mb-4 tracking-tight">
            나와 닮은 <span className="text-pink-500">동물</span> 찾기
          </h1>
          <p className="text-lg text-zinc-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
            AI 비전 기술을 통해 당신의 얼굴과 가장 닮은 동물을 찾아보세요!
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={startTest}
              className="w-full py-5 bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold rounded-3xl shadow-xl shadow-pink-200 transform transition active:scale-95 flex items-center justify-center gap-3"
            >
              분석 시작하기
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <p className="text-zinc-400 text-xs font-fredoka uppercase tracking-widest">단 10초면 완료됩니다</p>
          </div>

          <div className="mt-12 flex justify-center gap-8 grayscale opacity-40">
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1">🦁</span>
              <span className="text-[10px] font-bold">용맹함</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1">🐱</span>
              <span className="text-[10px] font-bold">도도함</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1">🐰</span>
              <span className="text-[10px] font-bold">발랄함</span>
            </div>
          </div>
        </div>
      )}

      {state === 'CAMERA' && (
        <CameraUI onCapture={handleCapture} onClose={reset} />
      )}

      {state === 'ANALYZING' && capturedImage && (
        <LoadingScan image={capturedImage} />
      )}

      {state === 'RESULT' && result && capturedImage && (
        <div className="w-full flex justify-center py-8">
          <ResultCard result={result} capturedImage={capturedImage} onReset={reset} />
        </div>
      )}

      {/* Footer information */}
      <footer className="mt-12 text-zinc-400 text-sm font-fredoka flex flex-col items-center gap-1">
        <p>© 2024 AI 동물 관상 테스트</p>
        <p className="opacity-60">Powered by Gemini Vision 2.0</p>
      </footer>
    </div>
  );
};

export default App;
