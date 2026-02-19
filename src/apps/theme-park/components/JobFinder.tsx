
import React, { useState } from 'react';
import { PAST_LIFE_JOBS } from '../constants';
import type{ DetailedJobResult } from '../types';

const JobFinder: React.FC = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetailedJobResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) return;
    setLoading(true);
    const combined = name + birthDate;
    const index = combined.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % PAST_LIFE_JOBS.length;
    setTimeout(() => {
      setResult(PAST_LIFE_JOBS[index]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 leading-tight">
              시간 여행 <span className="text-violet-500">스타트!</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium italic">당신은 과거에 어떤 위인이었을까요?</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-2xl shadow-violet-100/50 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-violet-400 uppercase tracking-widest ml-1">Identity Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="당신의 성함을 알려주세요"
                  className="w-full bg-white/50 px-6 py-4 rounded-2xl border border-violet-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10 focus:outline-none transition-all text-slate-800 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-violet-400 uppercase tracking-widest ml-1">Birth Cycle</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-white/50 px-6 py-4 rounded-2xl border border-violet-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10 focus:outline-none transition-all text-slate-800 font-bold"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-black py-5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-violet-200">
              {loading ? '운명의 실타래 푸는 중...' : '전생 기록 복원하기'}
            </button>
          </form>
        </>
      ) : (
        <div className="animate-popIn space-y-6">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3.5rem] border border-white shadow-2xl space-y-6 overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${result.color}-200/20 rounded-full blur-3xl`}></div>
            
            <div className="flex justify-between items-start">
              <span className={`bg-${result.color}-50 text-${result.color}-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase border border-${result.color}-100`}>
                {result.era}
              </span>
              <div className="text-6xl animate-bounce">{result.emoji}</div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Revealed Profile</h3>
              <p className={`text-4xl font-black text-${result.color}-600 leading-tight`}>{result.job}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50/50 p-5 rounded-2xl border border-white">
                <h4 className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Main Trait</h4>
                <p className="text-sm font-bold text-slate-700">{result.trait}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-violet-400 mb-2 uppercase tracking-widest text-center">Your Past Life Story</h4>
                <p className="text-base leading-relaxed font-medium text-slate-600 text-center italic">"{result.story}"</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                  <h4 className="text-[9px] font-black text-orange-400 mb-1 uppercase">Lesson</h4>
                  <p className="text-[12px] font-bold text-slate-700 leading-tight">{result.lesson}</p>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                  <h4 className="text-[9px] font-black text-blue-400 mb-1 uppercase">Lucky Item</h4>
                  <p className="text-[12px] font-bold text-slate-700 leading-tight">{result.luckyItem}</p>
                </div>
              </div>
            </div>
            
            <button onClick={() => setResult(null)} className="w-full py-4 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] font-black uppercase text-slate-400 hover:text-violet-500 transition-all">
              다른 시간대로 돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFinder;
