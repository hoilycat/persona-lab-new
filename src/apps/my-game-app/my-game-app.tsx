import { Routes, Route, useNavigate } from 'react-router-dom';
import NumberGame from './NumberGame';
import ResponseGame from './ResponseGame';
import ArrowSpeedGame from './ArrowSpeedGame';


// 홈 화면 컴포넌트
const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', gap: '30px' }}>
        <button
          style={squareButtonStyle}
          onClick={() => navigate('number')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <span style={{ fontSize: '3rem', marginBottom: '15px' }}>🔢</span>
          <br />
          숫자 맞추기<br />(Up & Down)
        </button>

        <button
          style={squareButtonStyle}
          onClick={() => navigate('response')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <span style={{ fontSize: '3rem', marginBottom: '15px' }}>⚡</span>
          <br />
          반응 속도<br />테스트
        </button>


        <button
          style={squareButtonStyle}
          onClick={() => navigate('arrow')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <span style={{ fontSize: '3rem', marginBottom: '15px' }}>🏹</span>
          <br />
          애로우 런<br />(Speed Run)
        </button>


      </div>
    </div>
  );
};

// 메인 App 컴포넌트
function App() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1A0033' }}>
      {/* 상단 네비게이션 */}
      <nav style={{ padding: '20px', borderBottom: '1px solid rgba(230, 204, 255, 0.1)' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', color: '#E6CCFF',
            cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          🎮 미니 게임 홈
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/number" element={<NumberGame />} />
        <Route path="/response" element={<ResponseGame />} />
        <Route path="/arrow" element={<ArrowSpeedGame />} />

      </Routes>
    </div>
  );
}

// 레이아웃 스타일
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
};

// 큰 정사각형 버튼 스타일
const squareButtonStyle: React.CSSProperties = {
  width: '250px',
  height: '250px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '24px',
  border: '5px solid #330066',
  backgroundColor: '#330066',
  color: '#E6CCFF',
  boxShadow: '0 10px 0 #4D0080',
  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '1.5',
  textAlign: 'center'
};

export default App;