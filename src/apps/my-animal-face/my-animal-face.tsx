import { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import { ANIMAL_RESULTS, type AnimalData } from './data';

const App = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const latestStats = useRef({ ratio: 0, eyeAngle: 0 });

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [finalResult, setFinalResult] = useState<AnimalData | null>(null);
  const [faceStats, setFaceStats] = useState({ ratio: 0, eyeAngle: 0 });

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setIsModelLoaded(true);
      } catch (e) { console.error("모델 로드 실패", e); }
    };
    loadModels();
  }, []);

  const getDist = (p1: faceapi.Point, p2: faceapi.Point) =>
    Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

  const handleVideoOnPlay = () => {
    if (!isModelLoaded || !webcamRef.current?.video) return;
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const displaySize = { width: video.clientWidth, height: video.clientHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const scanFrame = async () => {
      if (!isAnalyzing || video.paused || video.ended) return;
      if (video.readyState === 4) {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        if (detections.length > 0) {
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          const { landmarks } = resizedDetections[0];

          const jaw = landmarks.getJawOutline();
          const width = getDist(jaw[0], jaw[16]);
          const height = getDist(jaw[8], landmarks.getNose()[0]);
          const ratio = width / height;
          const leftEye = landmarks.getLeftEye();
          const eyeAngle = leftEye[3].y - leftEye[0].y;

          if (ratio > 0.5) {
            const stats = { ratio, eyeAngle };
            setFaceStats(stats);
            latestStats.current = stats;
          }

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#E879F9';
            resizedDetections.forEach(d => {
              d.landmarks.positions.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI);
                ctx.fill();
              });
            });
          }
        }
      }
      requestAnimationFrame(scanFrame);
    };
    scanFrame();
  };

  const completeAnalysis = () => {
    const { ratio, eyeAngle } = latestStats.current;
    if (ratio === 0) return;

    // 1. 15종의 모든 동물을 포함하는 점수판 생성
    const scores: Record<string, number> = {
      dog: 0, cat: 0, fox: 0, rabbit: 0, deer: 0, dino: 0,
      hamster: 0, chick: 0, otter: 0, wolf: 0, snake: 0,
      frog: 0, bear: 0, squirrel: 0, alpaca: 0
    };

    // 2. 얼굴 비율(ratio)과 눈 각도(eyeAngle)에 따른 점수 부여 로직

    // [강아지상] 얼굴이 둥글고 눈매가 처짐
    scores.dog += (ratio > 1.25 ? 5 : 0) + (eyeAngle < 1.2 ? 5 : 0);
    // [고양이상] 얼굴이 갸름하고 눈매가 올라감
    scores.cat += (ratio < 1.2 ? 5 : 0) + (eyeAngle > 3.5 ? 5 : 0);
    // [토끼상] 얼굴 비율이 보통이고 눈이 아주 처지지도 올라가지도 않음
    scores.rabbit += (ratio >= 1.2 && ratio <= 1.35 ? 5 : 0) + (eyeAngle >= 1.5 && eyeAngle <= 2.5 ? 5 : 0);
    // [여우상] 고양이보다 더 날렵한 눈매와 턱선
    scores.fox += (ratio < 1.1 ? 5 : 0) + (eyeAngle > 4.5 ? 6 : 0);
    // [사슴상] 얼굴이 매우 갸름하고 눈매가 순함
    scores.deer += (ratio < 1.05 ? 6 : 0) + (eyeAngle < 1.0 ? 5 : 0);
    // [공룡상] T존이 뚜렷하고 강한 인상 (보통의 얼굴형, 약간 올라간 눈매)
    scores.dino += (ratio >= 1.1 && ratio <= 1.2 ? 4 : 0) + (eyeAngle > 3.0 ? 5 : 0);
    // [햄스터상] 얼굴 가로폭이 넓고(볼살) 동글동글함
    scores.hamster += (ratio > 1.35 ? 6 : 0) + (eyeAngle >= 1.0 && eyeAngle <= 2.5 ? 4 : 0);
    // [병아리상] 전체적으로 이목구비가 작고 순함
    scores.chick += (ratio >= 1.15 && ratio <= 1.25 ? 5 : 0) + (eyeAngle < 2.0 ? 5 : 0);
    // [수달상] 가로로 긴 눈매, 매끈한 하관
    scores.otter += (ratio >= 1.2 && ratio <= 1.3 ? 5 : 0) + (eyeAngle >= 2.0 && eyeAngle <= 3.5 ? 5 : 0);
    // [늑대상] 날카롭고 강렬한 눈빛, 각진 골격
    scores.wolf += (ratio >= 1.05 && ratio <= 1.2 ? 4 : 0) + (eyeAngle > 4.0 ? 6 : 0);
    // [뱀상] 매우 날카로운 눈매와 아주 갸름한 V라인
    scores.snake += (ratio < 1.0 ? 6 : 0) + (eyeAngle > 5.0 ? 7 : 0);
    // [개구리상] 눈이 크고 시원한 가로형 얼굴
    scores.frog += (ratio > 1.4 ? 5 : 0) + (eyeAngle >= 2.5 && eyeAngle <= 4.0 ? 5 : 0);
    // [곰상] 얼굴 가로폭이 가장 넓고 눈매가 아주 순함
    scores.bear += (ratio > 1.45 ? 7 : 0) + (eyeAngle < 0.8 ? 5 : 0);
    // [다람쥐상] 햄스터보다 조금 더 날렵하고 생기있는 눈매
    scores.squirrel += (ratio > 1.3 ? 4 : 0) + (eyeAngle > 2.5 && eyeAngle <= 4.0 ? 6 : 0);
    // [알파카상] 얼굴이 길고 눈매가 처짐 (순한 매력)
    scores.alpaca += (ratio < 1.1 ? 5 : 0) + (eyeAngle < 0.5 ? 6 : 0);

    // 가장 높은 점수를 받은 동물을 결과로 선택
    const bestKey = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    const resultData = ANIMAL_RESULTS[bestKey];

    if (resultData) {
      setFinalResult(resultData);
      setIsAnalyzing(false);
    }
  };

  const saveAsImage = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, { backgroundColor: '#FFF1F2' });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "result.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#FFF1F2] flex flex-col items-center justify-center p-6 font-sans text-[#4A4A4A]">
      <header className="text-center mb-10 w-full px-4"> {/* 양옆 여백 추가 */}
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A9E] to-[#A18CD1] mb-4 pr-2 break-keep leading-tight">
          나와 닮은 동물찾기
        </h1>
        <p className="text-[#A0A0A0] text-base md:text-lg font-medium">
          밝은 곳에서 정면을 찍으면 정확도가 올라가요
        </p>
      </header>

      <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-[0_20px_50px_rgba(255,182,193,0.3)] border-[6px] border-[#FBCFE8] max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center">
        <div className="relative w-full aspect-square md:w-[450px] rounded-[30px] overflow-hidden shadow-inner bg-slate-100">
          <Webcam ref={webcamRef} onPlay={handleVideoOnPlay} mirrored className="w-full h-full object-cover" />
          <canvas ref={canvasRef} style={{ transform: 'scaleX(-1)' }} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-pink-200 shadow-sm">
              <span className="text-[10px] font-bold text-pink-400 mr-2">Ratio</span>
              <span className="font-mono font-bold text-gray-700">{faceStats.ratio.toFixed(3)}</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-pink-200 shadow-sm">
              <span className="text-[10px] font-bold text-purple-400 mr-2">Angle</span>
              <span className="font-mono font-bold text-gray-700">{faceStats.eyeAngle.toFixed(3)}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full space-y-6 text-center md:text-left">
          {isAnalyzing ? (
            <>
              <div>
                <h2 className="text-[#F43F5E] text-3xl font-black mb-2">분석 준비 완료</h2>
                <p className="text-gray-400 leading-relaxed">
                  정면을 응시한 상태에서<br />결과 버튼을 눌러주세요
                </p>
              </div>
              <button
                onClick={completeAnalysis}
                className="w-full py-5 bg-gradient-to-r from-[#FB7185] to-[#E879F9] hover:opacity-90 text-white rounded-2xl font-black text-2xl shadow-lg shadow-pink-200 transition-all active:scale-95"
              >
                결과 분석하기
              </button>
            </>
          ) : (
            finalResult && (
              <div ref={resultRef} className="space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="space-y-1">
                  <p className="text-pink-400 font-bold tracking-widest text-sm uppercase">Your Face Type</p>
                  <h2 className="text-5xl font-black text-[#4A4A4A]">{finalResult.name}</h2>
                </div>
                <p className="text-xl text-[#F43F5E] font-bold italic">"{finalResult.title}"</p>
                <p className="text-gray-500 text-sm leading-relaxed">{finalResult.description}</p>

                <div className="flex gap-3 pt-4">
                  <button onClick={saveAsImage} className="flex-1 py-4 bg-[#FBCFE8] text-[#BE185D] rounded-xl font-bold hover:bg-[#F9A8D4] transition-all">저장하기</button>
                  <button onClick={() => setIsAnalyzing(true)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-all">다시하기</button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;