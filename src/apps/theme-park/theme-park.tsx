
import React, { useState } from 'react';
import type{ TabType } from './types';
import JobFinder from './components/JobFinder';
import IdealTypeTest from './components/IdealTypeTest';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('job');

  const renderContent = () => {
    switch (activeTab) {
      case 'job': return <JobFinder />;
      case 'ideal': return <IdealTypeTest />;
      default: return <JobFinder />;
    }
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'job', label: '전생 직업', icon: '✨' },
    { id: 'ideal', label: '이상형', icon: '💘' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fdfbff] text-slate-800 pb-24">
      {/* Pastel Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] bg-purple-100/40 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-pink-100/30 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      <header className="sticky top-0 z-50 px-6 py-4 backdrop-blur-md bg-white/60 border-b border-white">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 tracking-tighter">
              DESTINY LAB
            </h1>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Hyper Destiny Portal</span>
          </div>
          <div className="bg-pink-100/50 px-3 py-1.5 rounded-full border border-pink-200">
            <span className="text-[10px] font-black text-pink-500 uppercase">Ver 2.0</span>
          </div>
        </div>
      </header>

      <main className="relative max-w-md mx-auto p-6 z-10 min-h-[calc(100vh-160px)] flex flex-col justify-center">
        <div className="animate-popIn">
          {renderContent()}
        </div>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2.5rem] px-4 py-3 flex justify-around items-center z-50 shadow-xl shadow-slate-200/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center gap-1 transition-all duration-300 py-2 px-10 rounded-2xl ${
              activeTab === tab.id ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            {activeTab === tab.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl -z-10 shadow-inner"></div>
            )}
            <span className={`text-2xl transition-transform duration-500 ${activeTab === tab.id ? 'scale-125 -translate-y-1' : ''}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>

      <style>{`
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.95) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(20px, -30px) scale(1.05); } 66% { transform: translate(-10px, 15px) scale(0.95); } }
        .animate-popIn { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-blob { animation: blob 8s infinite alternate ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default App;
