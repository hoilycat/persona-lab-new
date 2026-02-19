
import React, { useState } from 'react';
import { QUIZ_QUESTIONS, IDEAL_RESULTS } from '../constants';
import type{ DetailedIdealResult } from '../types';

const IdealTypeTest: React.FC = () => {
  const [step, setStep] = useState(0); 
  const [scores, setScores] = useState({ T: 0, E: 0 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetailedIdealResult | null>(null);

  const handleAnswer = (type: 'T' | 'E') => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);
    if (step < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setStep(QUIZ_QUESTIONS.length + 1);
      setTimeout(() => {
        const finalType = newScores.T >= newScores.E ? 'T' : 'E';
        setResult(IDEAL_RESULTS[finalType]);
        setLoading(false);
      }, 1200);
    }
  };

  if (step === 0) {
    return (
      <div className="text-center py-10 animate-popIn space-y-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-pink-200 blur-3xl opacity-60"></div>
          <div className="relative text-8xl transform hover:scale-110 transition-transform cursor-pointer drop-shadow-xl">💝</div>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            나의 <span className="text-pink-500">운명메이트</span><br/>누구일까?
          </h2>
          <p className="text-slate-500 font-medium text-sm">심층 심리 분석을 통해 당신의 취향을 맞춤 설계해 드려요.</p>
        </div>
        <button onClick={() => setStep(1)} className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-black py-6 rounded-[2rem] shadow-xl shadow-pink-100 active:scale-95 transition-all text-xl">
          매칭 시뮬레이션 시작
        </button>
      </div>
    );
  }

  if (step <= QUIZ_QUESTIONS.length) {
    const q = QUIZ_QUESTIONS[step - 1];
    return (
      <div className="space-y-8 animate-popIn">
        <div className="space-y-2">
          <div className="flex justify-between items-end px-2">
            <span className="text-[11px] font-black text-pink-500 uppercase tracking-widest">Matching Process</span>
            <span className="text-xs font-bold text-slate-300">{step}/{QUIZ_QUESTIONS.length}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-pink-400 transition-all duration-500" style={{ width: `${(step / QUIZ_QUESTIONS.length) * 100}%` }} />
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3.5rem] border border-white shadow-2xl min-h-[420px] flex flex-col justify-between">
          <h3 className="text-2xl font-black text-slate-800 text-center leading-snug py-10">{q.text}</h3>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt.type as 'T' | 'E')} className="w-full p-6 text-left rounded-2xl bg-white border-2 border-pink-50 hover:border-pink-300 hover:bg-pink-50 transition-all active:scale-[0.98] shadow-sm font-bold text-slate-600">
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-popIn space-y-6">
      {loading ? (
        <div className="py-20 flex flex-col items-center space-y-4">
          <div className="w-14 h-14 border-8 border-pink-100 border-t-pink-500 rounded-full animate-spin" />
          <p className="text-lg font-black text-pink-500 animate-pulse">알맞은 짝을 찾는 중...</p>
        </div>
      ) : result && (
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[4rem] border border-white shadow-2xl space-y-6 relative overflow-hidden">
          <div className="text-center space-y-2">
            <div className="text-7xl mb-2">{result.emoji}</div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Your Destiny Type</p>
            <h2 className={`text-5xl font-black ${result.type === 'T' ? 'text-indigo-500' : 'text-pink-500'}`}>{result.name}</h2>
          </div>

          <div className="bg-slate-50 p-5 rounded-3xl text-center">
            <p className="text-[15px] font-black text-slate-700 italic">"{result.summary}"</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className={`w-1.5 h-3 ${result.type === 'T' ? 'bg-indigo-400' : 'bg-pink-400'} rounded-full`} />
                Type Analysis
              </h4>
              <p className="text-[14px] leading-relaxed font-medium text-slate-600">{result.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                <h5 className="text-[10px] font-black text-blue-400 mb-1 uppercase">Date Style</h5>
                <p className="text-[13px] font-bold text-slate-700">{result.dateStyle}</p>
              </div>
              <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100">
                <h5 className="text-[10px] font-black text-pink-400 mb-1 uppercase">Recommended Menu</h5>
                <p className="text-[13px] font-bold text-slate-700">{result.bestMenu}</p>
              </div>
            </div>

            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100">
              <h5 className="text-[10px] font-black text-amber-400 mb-1 uppercase">Point to Note</h5>
              <p className="text-[13px] font-bold text-slate-700 leading-snug">{result.caution}</p>
            </div>
          </div>

          <button onClick={() => {setStep(0); setScores({T:0, E:0}); setResult(null);}} className="w-full py-5 rounded-3xl bg-slate-100 text-[11px] font-black uppercase text-slate-400 hover:text-pink-500 transition-all">
            다시 매칭해보기
          </button>
        </div>
      )}
    </div>
  );
};

export default IdealTypeTest;
