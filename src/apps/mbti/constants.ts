
import type{ Question, ResultMap } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "기다리고 기다리던 주말! 당신의 선택은?",
    category: 'EI',
    options: [
      { text: "사람들을 만나서 에너지를 충전해야지! 밖으로 나간다.", type: 'E' },
      { text: "혼자만의 시간이 필요해. 집에서 넷플릭스를 본다.", type: 'I' }
    ]
  },
  {
    id: 2,
    text: "새로운 식당에 갔다. 메뉴판을 볼 때 당신은?",
    category: 'SN',
    options: [
      { text: "베스트 메뉴나 먹어본 맛을 고른다. 실패는 싫어!", type: 'S' },
      { text: "새로운 도전! 이름이 독특한 메뉴에 눈길이 간다.", type: 'N' }
    ]
  },
  {
    id: 3,
    text: "친구가 '나 너무 우울해서 화분 샀어'라고 한다면?",
    category: 'TF',
    options: [
      { text: "어떤 화분 샀어? 갑자기 왜 샀어?", type: 'T' },
      { text: "무슨 일 있어? 왜 우울해ㅠㅠ 많이 힘들었구나.", type: 'F' }
    ]
  },
  {
    id: 4,
    text: "여행을 가기 전날, 당신의 모습은?",
    category: 'JP',
    options: [
      { text: "시간별로 동선을 짠 계획표를 다시 확인한다.", type: 'J' },
      { text: "가서 하고 싶은 것 몇 개만 생각하고 일단 잔다.", type: 'P' }
    ]
  },
  {
    id: 5,
    text: "모임에서 처음 본 사람이 말을 걸어온다면?",
    category: 'EI',
    options: [
      { text: "오히려 좋아! 자연스럽게 대화를 이어간다.", type: 'E' },
      { text: "어색하지만 대답은 한다. 속으로는 기가 빨린다.", type: 'I' }
    ]
  },
  {
    id: 6,
    text: "길을 가다가 구름을 봤을 때 당신의 생각은?",
    category: 'SN',
    options: [
      { text: "음, 구름이 많네. 비가 오려나?", type: 'S' },
      { text: "저 구름은 솜사탕 같아. 저 위를 걸으면 어떨까?", type: 'N' }
    ]
  },
  {
    id: 7,
    text: "시험을 망친 친구가 울고 있을 때?",
    category: 'TF',
    options: [
      { text: "다음에 잘 보면 되지. 공부 방법이 문제였나?", type: 'T' },
      { text: "말없이 옆에 있어주며 같이 속상해한다.", type: 'F' }
    ]
  },
  {
    id: 8,
    text: "책상 위를 정리하는 당신의 스타일은?",
    category: 'JP',
    options: [
      { text: "용도별로 딱딱 맞춰서 깔끔하게 정리한다.", type: 'J' },
      { text: "어디에 뭐가 있는지만 알면 된다. 조금 어질러진 편.", type: 'P' }
    ]
  },
  {
    id: 9,
    text: "자기 전, 당신이 주로 하는 생각은?",
    category: 'SN',
    options: [
      { text: "오늘 할 일 다 했나? 내일은 뭐 입지?", type: 'S' },
      { text: "갑자기 좀비가 나타나면 어쩌지? 우주엔 끝이 있을까?", type: 'N' }
    ]
  },
  {
    id: 10,
    text: "친구가 말도 안 되는 고민을 털어놓는다면?",
    category: 'TF',
    options: [
      { text: "냉정하게 그건 좀 아닌 것 같다고 말해준다.", type: 'T' },
      { text: "일단 친구 편을 들어주며 공감해준다.", type: 'F' }
    ]
  },
  {
    id: 11,
    text: "노트북을 켰는데 업데이트 팝업이 떴다!",
    category: 'JP',
    options: [
      { text: "지금 당장 업데이트해서 깔끔하게 만든다.", type: 'J' },
      { text: "나중에 하기 버튼을 누르고 하던 일을 계속한다.", type: 'P' }
    ]
  },
  {
    id: 12,
    text: "쉬는 날, 누군가 갑자기 '나와!'라고 한다면?",
    category: 'EI',
    options: [
      { text: "오예! 신나서 준비하고 바로 나간다.", type: 'E' },
      { text: "이미 씻고 누웠는데... 다음에 보자고 거절한다.", type: 'I' }
    ]
  },
  {
    id: 13,
    text: "축제나 파티장에 갔을 때 당신은?",
    category: 'EI',
    options: [
      { text: "모르는 사람과도 금방 친해지며 분위기를 즐긴다.", type: 'E' },
      { text: "아는 사람 곁에만 있거나 기회를 봐서 일찍 집에 간다.", type: 'I' }
    ]
  },
  {
    id: 14,
    text: "모르는 번호로 전화가 왔을 때?",
    category: 'EI',
    options: [
      { text: "일단 받아본다. 누구신가요?", type: 'E' },
      { text: "절대 안 받는다. 나중에 문자로 물어보거나 검색해본다.", type: 'I' }
    ]
  },
  {
    id: 15,
    text: "요리 레시피를 보고 음식을 만들 때?",
    category: 'SN',
    options: [
      { text: "계량 스푼을 써서 정확한 양을 지키려고 노력한다.", type: 'S' },
      { text: "대충 눈대중으로 '적당히' 넣으며 내 감을 믿는다.", type: 'N' }
    ]
  },
  {
    id: 16,
    text: "영화나 소설을 볼 때 더 끌리는 것은?",
    category: 'SN',
    options: [
      { text: "현실에서 일어날 법한 생생하고 구체적인 이야기", type: 'S' },
      { text: "상상력을 자극하고 은유적인 메시지가 담긴 이야기", type: 'N' }
    ]
  },
  {
    id: 17,
    text: "친구가 고민 상담을 요청하면 당신의 반응은?",
    category: 'TF',
    options: [
      { text: "상황을 분석하고 도움이 될만한 해결책을 제시한다.", type: 'T' },
      { text: "친구가 느꼈을 감정에 공감하며 따뜻하게 위로한다.", type: 'F' }
    ]
  },
  {
    id: 18,
    text: "슬픈 영화를 보고 펑펑 우는 사람을 보면?",
    category: 'TF',
    options: [
      { text: "왜 저렇게까지 울지? 연출이 좀 과한가 생각한다.", type: 'T' },
      { text: "어느새 나도 같이 코끝이 찡해지며 몰입한다.", type: 'F' }
    ]
  },
  {
    id: 19,
    text: "외출 준비를 할 때 당신의 스타일은?",
    category: 'JP',
    options: [
      { text: "미리 필요한 걸 다 챙겨두고 정해진 시간에 나간다.", type: 'J' },
      { text: "나가기 직전에 허둥지둥 챙기며 급하게 뛰어나간다.", type: 'P' }
    ]
  },
  {
    id: 20,
    text: "설거지나 빨래가 쌓여있다면?",
    category: 'JP',
    options: [
      { text: "눈에 보일 때 바로 해버려야 마음이 편안하다.", type: 'J' },
      { text: "내일의 내가 하겠지! 일단 좀 쉬었다가 나중에 한다.", type: 'P' }
    ]
  }
];

export const RESULTS: ResultMap = {
  ISTJ: {
    title: "성실한 거북이",
    description: "한 번 시작한 일은 끝까지 해내는 책임감의 아이콘!",
    traits: ["계획적이에요", "논리적이에요", "약속을 잘 지켜요"],
    imageUrl: "https://images.unsplash.com/photo-1544710340-7764726e6963?auto=format&fit=crop&w=600&q=80",
    matching: "ESFP",
    themeColor: "#F1F5F9"
  },
  ISFJ: {
    title: "다정한 곰돌이",
    description: "주변 사람들을 챙기는 따뜻한 마음씨를 가졌어요.",
    traits: ["배려심이 깊어요", "기억력이 좋아요", "안정을 추구해요"],
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    matching: "ESTP",
    themeColor: "#FEF3C7"
  },
  INFJ: {
    title: "현명한 부엉이",
    description: "생각이 깊고 통찰력이 뛰어난 조용한 조언가!",
    traits: ["공감 능력이 높아요", "통찰력이 있어요", "신중해요"],
    imageUrl: "https://images.unsplash.com/photo-1543549736-6352fa2423bf?auto=format&fit=crop&w=600&q=80",
    matching: "ENFP",
    themeColor: "#D1FAE5"
  },
  INTJ: {
    title: "철저한 고양이",
    description: "혼자서도 척척! 독립적이고 지적인 전략가예요.",
    traits: ["냉철한 판단력", "독립심이 강함", "완벽주의적"],
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    matching: "ENTP",
    themeColor: "#EDE9FE"
  },
  ISTP: {
    title: "쿨한 너구리",
    description: "손재주가 좋고 상황 적응력이 빠른 해결사!",
    traits: ["관찰력이 좋아요", "과묵하지만 효율적", "모험을 즐겨요"],
    imageUrl: "https://images.unsplash.com/photo-1503929357654-fe0bc7bc9963?auto=format&fit=crop&w=600&q=80",
    matching: "ESFJ",
    themeColor: "#FFEDD5"
  },
  ISFP: {
    title: "예술가 강아지",
    description: "오늘을 즐기는 부드럽고 온화한 성격의 소유자.",
    traits: ["겸손해요", "예술적 감각", "마음이 따뜻해요"],
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80",
    matching: "ENFJ",
    themeColor: "#FCE7F3"
  },
  INFP: {
    title: "꿈꾸는 토끼",
    description: "풍부한 상상력과 낭만을 가진 따뜻한 영혼!",
    traits: ["감수성이 풍부해요", "창의적이에요", "나만의 세계가 있음"],
    imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80",
    matching: "ENTJ",
    themeColor: "#ECFDF5"
  },
  INTP: {
    title: "호기심 많은 미어캣",
    description: "아이디어가 넘치는 지적인 탐구가!",
    traits: ["분석적이에요", "호기심이 많아요", "비판적인 사고"],
    imageUrl: "https://images.unsplash.com/photo-1591824438708-ce405f36bb3d?auto=format&fit=crop&w=600&q=80",
    matching: "ESTJ",
    themeColor: "#F3E8FF"
  },
  ESTP: {
    title: "활동적인 호랑이",
    description: "에너지가 넘치고 문제를 즉각 해결하는 행동파!",
    traits: ["사교적이에요", "순발력이 좋아요", "현실적이에요"],
    imageUrl: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=600&q=80",
    matching: "ISFJ",
    themeColor: "#FFF7ED"
  },
  ESFP: {
    title: "해피 바이러스 돌고래",
    description: "어디서나 분위기 메이커! 즐거움을 전파해요.",
    traits: ["낙천적이에요", "사람을 좋아해요", "감각적이에요"],
    imageUrl: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=600&q=80",
    matching: "ISTJ",
    themeColor: "#FFF1F2"
  },
  ENFP: {
    title: "열정적인 쿼카",
    description: "자유로운 영혼의 소유자! 매일매일이 새로워요.",
    traits: ["창의적이에요", "열정이 넘쳐요", "공감 능력이 만렙"],
    imageUrl: "https://images.unsplash.com/photo-1591901393114-419352e0618b?auto=format&fit=crop&w=600&q=80",
    matching: "INFJ",
    themeColor: "#FDF2F8"
  },
  ENTP: {
    title: "재치 있는 여우",
    description: "지적 호기심이 강하고 토론을 즐기는 아이디어 뱅크!",
    traits: ["두뇌 회전이 빨라요", "다재다능해요", "새로운 시도"],
    imageUrl: "https://images.unsplash.com/photo-1516934024742-b461fbc4760e?auto=format&fit=crop&w=600&q=80",
    matching: "INTJ",
    themeColor: "#EEF2FF"
  },
  ESTJ: {
    title: "추진력 갑 사자",
    description: "현실적이고 구체적이며 리더십이 뛰어난 지휘관!",
    traits: ["조직적이에요", "체계적이에요", "확실한 결단력"],
    imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80",
    matching: "INTP",
    themeColor: "#F1F5F9"
  },
  ESFJ: {
    title: "친절한 코끼리",
    description: "타인을 돕는 것에 기쁨을 느끼는 따뜻한 리더!",
    traits: ["협력적이에요", "사교성이 좋아요", "충성심이 강해요"],
    imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80",
    matching: "ISTP",
    themeColor: "#FFFBEB"
  },
  ENFJ: {
    title: "다정한 리더 판다",
    description: "모두를 이끄는 카리스마 있는 성인군자!",
    traits: ["사람을 잘 이끌어요", "이타적이에요", "언변이 좋아요"],
    imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08bef1ed1?auto=format&fit=crop&w=600&q=80",
    matching: "ISFP",
    themeColor: "#F0FDF4"
  },
  ENTJ: {
    title: "결단력 있는 늑대",
    description: "철저한 준비와 추진력으로 목표를 달성하는 전략가!",
    traits: ["자신감이 넘쳐요", "계획적이에요", "논리적 분석"],
    imageUrl: "https://images.unsplash.com/photo-1512403213568-71e860950669?auto=format&fit=crop&w=600&q=80",
    matching: "INFP",
    themeColor: "#F5F3FF"
  }
};
