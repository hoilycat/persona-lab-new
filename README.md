# 🚀 Persona Lab (페르소나 랩)

> **"당신의 숨겨진 성격을 탐구하는 공간"** > AI와 다양한 인터랙티브 콘텐츠를 통해 나의 새로운 모습을 발견할 수 있는 통합 웹 어플리케이션 플랫폼입니다.

## 📌 프로젝트 소개
Persona Lab은 5가지의 개별적인 재미있는 웹 애플리케이션을 하나의 포털로 통합한 프로젝트입니다. 사용자는 얼굴 인식, 성격 분석, 미니 게임 등 다양한 테마파크 같은 경험을 한곳에서 즐길 수 있습니다.

## 🌐 링크
- url: (http://persona-lab-2026.s3-website-us-east-1.amazonaws.com/)
- amplify url: (https://master.dlzsbc51blf9z.amplifyapp.com/)

## 🛠 기술 스택 (Tech Stack)

| 분류 | 기술 스택 | 상세 내용 |
| :--- | :--- | :--- |
| **Frontend** | React (v19) | 최신 기능을 활용한 사용자 인터페이스 구축 |
| **Routing** | React Router DOM (v7) | 효율적인 페이지 전환 및 경로 관리 |
| **Build Tool** | Vite | 빠르고 가벼운 차세대 프론트엔드 빌드 도구 |
| **AI Vision** | face-api.js, react-webcam | AI 비전 기반 얼굴 인식 및 웹캠 실시간 연동 |
| **Utilities** | html2canvas | 결과 화면 캡처 및 이미지 저장 기능 구현 |

## 🌟 주요 기능 (Features)

### 1. 🦊 페이스 파인더 & 🐱 애니멀 페이스
- **AI 비전 기술 연동:** `face-api.js`와 웹캠을 활용하여 사용자의 얼굴 특징을 분석합니다.
- 나비, 강아지, 고양이 등 나와 가장 닮은 동물 상을 매칭해 주는 기능입니다.

### 2. 🧬 부캐 MBTI
- 20가지의 심도 있는 질문을 통해 숨겨진 나의 '부캐(Alter-ego)' 성격을 분석합니다.

### 3. 🎡 데스티니 월드
- 전생의 직업, 전생의 이름, 그리고 이상형을 알아보는 운명 테스트 테마파크입니다.

### 4. 🕹️ 게임 모음집
- 가볍게 즐길 수 있는 미니 게임 컬렉션입니다.
  - **Arrow Speed Game:** 방향키 반응 속도 테스트
  - **Number Game:** 숫자 기억력/순발력 테스트
  - **Response Game:** 순수 반응 속도 테스트

## 🧠 사용된 AI 모델 (AI Models)
이 프로젝트는 `face-api.js`의 경량화된 모델들을 사용하여 브라우저 환경에서 실시간 얼굴 추론을 수행합니다. 빠른 인식을 위해 `src/assets/models` 폴더에 다음 파일들이 포함되어 있습니다.
| 모델명 (Model Name) | 역할 및 기능 | 특징 |
| :--- | :--- | :--- |
| **Tiny Face Detector** | 실시간 얼굴 검출 (Detection) | 웹캠 환경에 최적화된 가볍고 빠른 감지 성능 제공 |
| **Face Landmark 68 Net** | 68개 특징점 추적 (Landmarks) | 눈, 코, 입, 턱선 등 얼굴의 주요 포인트를 정밀 추적 |
| **Face Expression Net** | 표정 분석 (Recognition) | 사용자의 감정 상태(행복, 슬픔, 놀람 등)를 실시간 분석 |

## 📁 프로젝트 구조 (Directory Structure)

```text
src/
├── assets/models/      # 🧠 face-api.js AI 학습 모델 파일
└── apps/               # 🚀 개별 애플리케이션 모음
    ├── face-finder/    # 얼굴 인식 기반 앱 1
    ├── mbti/           # 부캐 성향 분석 앱
    ├── my-animal-face/ # 얼굴 인식 기반 앱 2
    ├── my-game-app/    # 3가지 미니 게임
    └── theme-park/     # 데스티니 월드 (전생/이상형)
```

## 🚀 실행 방법 (Getting Started)
```
1. 의존성 라이브러리 설치
   npm install

2. 개발 서버 실행
   npm run dev

3. 브라우저 접속
브라우저에서 http://localhost:5173 접속
```
