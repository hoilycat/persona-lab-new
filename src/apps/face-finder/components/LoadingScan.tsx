
import React from 'react';

const LoadingScan: React.FC<{ image: string }> = ({ image }) => {
  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center p-6">
      <div className="relative w-64 h-80 rounded-[40px] overflow-hidden shadow-2xl mb-8">
        <img src={image} alt="Target" className="w-full h-full object-cover grayscale opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"></div>
        <div className="scanner-line"></div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-800 mb-2 animate-pulse">특징 분석 중...</h2>
        <p className="text-zinc-500 font-fredoka max-w-xs mx-auto">
          동물 왕국에서 당신과 가장 닮은 단짝을 찾고 있어요!
        </p>
      </div>
      
      <div className="mt-12 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-pink-400 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 rounded-full bg-pink-300 animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingScan;
