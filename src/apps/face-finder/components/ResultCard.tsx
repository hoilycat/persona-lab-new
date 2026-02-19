
import React from 'react';
import type{ AnimalResult } from '../types';

interface ResultCardProps {
  result: AnimalResult;
  capturedImage: string;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, capturedImage, onReset }) => {
  const getAnimalEmoji = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('cat') || n.includes('고양이')) return '🐱';
    if (n.includes('dog') || n.includes('puppy') || n.includes('강아지') || n.includes('개')) return '🐶';
    if (n.includes('fox') || n.includes('여우')) return '🦊';
    if (n.includes('wolf') || n.includes('늑대')) return '🐺';
    if (n.includes('rabbit') || n.includes('bunny') || n.includes('토끼')) return '🐰';
    if (n.includes('lion') || n.includes('사자')) return '🦁';
    if (n.includes('tiger') || n.includes('호랑이')) return '🐯';
    if (n.includes('bear') || n.includes('곰')) return '🐻';
    if (n.includes('panda') || n.includes('판다')) return '🐼';
    if (n.includes('koala') || n.includes('코알라')) return '🐨';
    if (n.includes('deer') || n.includes('사슴')) return '🦌';
    if (n.includes('owl') || n.includes('부엉이') || n.includes('올빼미')) return '🦉';
    if (n.includes('quokka') || n.includes('쿼카')) return '🐹';
    return '🐾';
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden p-6 md:p-10 border border-zinc-100 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative group">
          <div className="w-48 h-48 rounded-[32px] overflow-hidden border-4 border-pink-500 shadow-xl shadow-pink-100 transform rotate-[-2deg] transition-transform hover:rotate-0">
            <img src={capturedImage} alt="Captured face" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg border-2 border-zinc-100 transform rotate-[12deg]">
            {getAnimalEmoji(result.animalName)}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-pink-50 text-pink-600 rounded-full text-sm font-bold tracking-widest uppercase mb-2">
            AI 일치율: {result.matchPercentage}%
          </div>
          <h1 className="text-4xl font-fredoka font-bold text-zinc-900 mb-1 leading-tight">
            {result.nickname}
          </h1>
          <p className="text-lg font-medium text-pink-500 mb-4">{result.animalName} 관상</p>
          
          <div className="bg-zinc-50 rounded-2xl p-4 mb-6 italic text-zinc-600 leading-relaxed relative">
            <span className="absolute -top-3 -left-2 text-4xl text-zinc-200">"</span>
            {result.reasoning}
            <span className="absolute -bottom-6 -right-2 text-4xl text-zinc-200">"</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-orange-50 rounded-3xl p-6">
          <h3 className="text-orange-700 font-bold mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            주요 닮은 점
          </h3>
          <ul className="space-y-2">
            {result.similarFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-zinc-700">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 rounded-3xl p-6">
          <h3 className="text-purple-700 font-bold mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            특징 키워드
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.personalityTraits.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-white/60 border border-purple-200 rounded-full text-sm font-medium text-purple-600">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button 
          onClick={onReset}
          className="flex-1 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition shadow-xl"
        >
          다시 하기
        </button>
        <button 
          onClick={() => window.print()}
          className="flex-1 py-4 bg-white border-2 border-zinc-900 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-50 transition"
        >
          결과 저장
        </button>
      </div>
      
      <p className="text-center text-zinc-400 text-xs mt-6">AI 안면 인식 기술을 통한 분석 결과입니다.</p>
    </div>
  );
};

export default ResultCard;
