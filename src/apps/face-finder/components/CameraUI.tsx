
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CameraUIProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const CameraUI: React.FC<CameraUIProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("카메라에 접근할 수 없습니다. 권한 설정을 확인해주세요.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.85);
      onCapture(imageData);
    }
  }, [onCapture]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-lg aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-900 border-4 border-pink-500/30">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <p className="text-white mb-4">{error}</p>
            <button onClick={onClose} className="px-6 py-2 bg-white text-black rounded-full font-bold">뒤로 가기</button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover mirror transform -scale-x-100"
            />
            <div className="absolute inset-0 border-[10px] border-white/10 pointer-events-none"></div>
            {/* Simple facial guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-64 h-80 border-2 border-white rounded-[100px] border-dashed"></div>
            </div>
            <div className="scanner-line"></div>
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="mt-8 flex gap-6">
        <button
          onClick={onClose}
          className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <button
          onClick={handleCapture}
          className="w-20 h-20 rounded-full bg-pink-500 border-8 border-white/20 flex items-center justify-center text-white hover:bg-pink-600 transition shadow-lg shadow-pink-500/50"
        >
          <div className="w-12 h-12 rounded-full border-4 border-white"></div>
        </button>
      </div>
      
      <p className="text-white/60 mt-6 text-sm font-fredoka tracking-wider uppercase">얼굴을 중앙에 맞춰주세요</p>
    </div>
  );
};

export default CameraUI;
