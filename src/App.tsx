import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FaceFinderApp from './apps/face-finder/face-finder';
import MbtiApp from './apps/mbti/mbti';
import ThemeParkApp from './apps/theme-park/theme-park';
import MyAnimalFaceApp from './apps/my-animal-face/my-animal-face';
import MyGameApp from './apps/my-game-app/my-game-app';

function App() {
  return (
    <Router>
      {/* 상단 네비게이션 */}
      <nav className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 flex gap-4 justify-center shadow-sm">
        <Link to="/" className="font-bold text-gray-700 hover:text-pink-500 transition">홈</Link>
        <Link to="/face-finder" className="font-bold text-gray-700 hover:text-pink-500 transition">페이스 파인더</Link>
         <Link to="/my-animal-face" className="font-bold text-gray-700 hover:text-pink-500 transition">애니멀 페이스</Link>
        <Link to="/mbti" className="font-bold text-gray-700 hover:text-pink-500 transition">MBTI</Link>
        <Link to="/theme-park" className="font-bold text-gray-700 hover:text-pink-500 transition">테마파크</Link>
        <Link to="/my-game-app" className="font-bold text-gray-700 hover:text-pink-500 transition">게임 모음집</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/face-finder/*" element={<FaceFinderApp />} />
        <Route path="/my-animal-face/*" element={<MyAnimalFaceApp />} />
        <Route path="/mbti/*" element={<MbtiApp />} />
        <Route path="/theme-park/*" element={<ThemeParkApp />} />
        <Route path="/my-game-app/*" element={<MyGameApp />} />
      </Routes>
    </Router>
  );
}

// 간단한 홈 컴포넌트
const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 p-10">
    <h1 className="text-5xl font-black text-gray-900 mb-6">🚀 Persona Lab</h1>
    <p className="text-xl text-gray-600 mb-10">당신의 숨겨진 성격을 탐구하는 공간</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 여기에 각 앱으로 가는 예쁜 카드들을 넣어주면 끝! */}
<Link to="/face-finder" className="group p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-pink-300">
  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🦊</div>
  <h2 className="text-2xl font-bold text-gray-800 mb-2">페이스 파인더</h2>
  <p className="text-gray-500 text-sm">AI 비전 기술로 닮은 동물을 찾아보세요!</p>
</Link>

<Link to="/my-animal-face" className="group p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-pink-300">
  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">😺</div>
  <h2 className="text-2xl font-bold text-gray-800 mb-2">애니멀 페이스</h2>
  <p className="text-gray-500 text-sm">AI 비전 기술로 닮은 동물을 찾아보세요!</p>
</Link>

<Link to="/mbti" className="group p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-pink-300">
  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧬</div>
  <h2 className="text-2xl font-bold text-gray-800 mb-2">부캐 MBTI</h2>
  <p className="text-gray-500 text-sm">20가지 질문으로 분석하는 나의 숨겨진 성격!</p>
</Link>

<Link to="/theme-park" className="group p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-pink-300">
  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎡</div>
  <h2 className="text-2xl font-bold text-gray-800 mb-2">데스티니 월드</h2>
  <p className="text-gray-500 text-sm">전생 직업과 이름, 이상형을 알아보는 테마파크!</p>
</Link>

<Link to="/my-game-app" className="group p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-pink-300">
  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🕹️</div>
  <h2 className="text-2xl font-bold text-gray-800 mb-2">게임 모음집</h2>
  <p className="text-gray-500 text-sm">간단한 게임을 즐길 수 있어요!</p>
</Link>


    </div>
  </div>
);

export default App;