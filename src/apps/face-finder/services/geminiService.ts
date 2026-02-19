
import type{ AnimalResult } from "../types";

// 아주 상세하게 작성된 동물 관상 데이터베이스
const ANIMAL_DATABASE: AnimalResult[] = [
  {
    animalName: "강아지",
    nickname: "천진난만 대형견상",
    reasoning: "전체적으로 부드러운 얼굴 곡선과 선한 눈망울이 특징이시네요! 웃을 때 입꼬리가 시원하게 올라가는 모습이 주인을 기다리는 리트리버처럼 주변 사람들에게 긍정적인 에너지를 줍니다. 누구에게나 호감을 사는 인상이시군요.",
    similarFeatures: ["처진 듯 선한 눈매", "시원하고 넓은 입매", "둥글둥글한 턱선"],
    personalityTraits: ["친화력 만렙", "무한 긍정", "충성심"],
    matchPercentage: 98
  },
  {
    animalName: "고양이",
    nickname: "도도한 아기 고양이상",
    reasoning: "살짝 올라간 눈매와 오똑한 코가 매력적인 고양이상이시네요. 가만히 있으면 차가워 보일 수 있지만, 사실은 누구보다 섬세하고 알면 알수록 빠져드는 '츤데레' 같은 매력을 소유하고 계십니다. 신비로운 분위기가 느껴져요.",
    similarFeatures: ["매력적인 캣츠아이", "날렵한 코끝", "깔끔한 얼굴 윤곽"],
    personalityTraits: ["깔끔함", "독립적임", "반전 매력"],
    matchPercentage: 95
  },
  {
    animalName: "사막여우",
    nickname: "지적인 사막여우상",
    reasoning: "갸름한 얼굴형에 가로로 긴 눈매가 지적인 분위기를 풍깁니다. 사막여우처럼 예민한 감각과 영리함을 동시에 갖춘 인상으로, 어떤 상황에서도 상황 판단이 빠를 것 같은 똑 부러지는 매력이 돋보이시네요.",
    similarFeatures: ["가로로 긴 눈매", "V라인 턱선", "오밀조밀한 이목구비"],
    personalityTraits: ["영리함", "예술적 감각", "은근한 애교"],
    matchPercentage: 92
  },
  {
    animalName: "토끼",
    nickname: "상큼발랄 토끼상",
    reasoning: "동그란 눈과 귀여운 앞니, 그리고 생기 넘치는 얼굴이 마치 숲속의 토끼 같습니다. 보고만 있어도 보호 본능을 자극하며 주변을 밝게 만드는 매력이 있어요. 동안 소리를 자주 들으실 것 같은 아주 귀여운 관상입니다!",
    similarFeatures: ["크고 동그란 눈", "짧은 인중과 귀여운 입술", "투명한 피부톤"],
    personalityTraits: ["애교쟁이", "호기심 천국", "평화주의자"],
    matchPercentage: 97
  },
  {
    animalName: "공룡",
    nickname: "듬직한 아기 공룡상",
    reasoning: "무심한 듯 시크한 눈매와 뚜렷한 T존이 돋보이는 공룡상이시네요. 겉으로 보기엔 강해 보이고 카리스마가 넘치지만, 웃을 때는 아이처럼 순수해 보이는 반전 매력을 가지고 있습니다. 요즘 가장 인기 있는 트렌디한 인상이에요.",
    similarFeatures: ["짙은 눈썹과 T존", "남성적인 턱선", "깊은 눈빛"],
    personalityTraits: ["츤데레", "듬직함", "리더십"],
    matchPercentage: 94
  },
  {
    animalName: "곰",
    nickname: "푸근한 아기 곰상",
    reasoning: "넓은 이마와 둥근 코, 전체적으로 안정감 있고 푸근한 인상을 주시네요. 곰처럼 듬직하고 믿음직스러워 보이며, 주변 사람들에게 편안한 안식처 같은 느낌을 줍니다. 은근히 귀여운 구석이 많아 인기가 많으실 관상입니다.",
    similarFeatures: ["도톰한 콧날", "부드러운 눈매", "건강한 피부"],
    personalityTraits: ["성실함", "포용력", "은근한 고집"],
    matchPercentage: 91
  },
  {
    animalName: "늑대",
    nickname: "고독하고 날카로운 늑대상",
    reasoning: "강렬한 눈빛과 날렵한 콧날이 야성적인 매력을 뿜어냅니다. 늑대처럼 한 사람만 바라보는 지조가 느껴지며, 자기 주관이 뚜렷하고 카리스마가 넘치는 인상입니다. 범접할 수 없는 아우라가 느껴지는군요.",
    similarFeatures: ["날카롭고 깊은 눈매", "높은 콧대", "강인한 턱선"],
    personalityTraits: ["일편단심", "카리스마", "강한 생활력"],
    matchPercentage: 89
  },
  {
    animalName: "사슴",
    nickname: "청초한 숲속 사슴상",
    reasoning: "길고 가느다란 목선과 맑고 큰 눈망울이 청순한 분위기를 자아냅니다. 사슴처럼 깨끗하고 순수한 느낌을 주며, 우아하면서도 어딘가 보호해주고 싶은 가냘픈 매력이 공존하는 아주 귀한 관상입니다.",
    similarFeatures: ["맑고 초롱초롱한 눈", "가느다란 목", "입체적인 이목구비"],
    personalityTraits: ["섬세함", "우아함", "감수성 풍부"],
    matchPercentage: 96
  },
  {
    animalName: "햄스터",
    nickname: "볼빵빵 귀요미 햄스터상",
    reasoning: "볼살이 살짝 있고 입술이 작고 귀여워서 마치 해바라기씨를 머금은 햄스터 같아요! 화를 내도 귀여워 보일 것 같은 사랑스러운 인상으로, 주변 사람들에게 웃음을 주는 해피바이러스 역할을 톡톡히 하시는군요.",
    similarFeatures: ["말랑말랑한 볼살", "동그란 코끝", "작고 도톰한 입술"],
    personalityTraits: ["엉뚱함", "친근함", "겁이 많음"],
    matchPercentage: 99
  },
  {
    animalName: "쿼카",
    nickname: "세상에서 가장 행복한 쿼카상",
    reasoning: "가만히 있어도 웃고 있는 듯한 입꼬리와 선한 눈매가 쿼카와 판박이시네요! 당신을 보는 것만으로도 힐링이 된다는 소리를 자주 듣지 않으신가요? 긍정적인 에너지가 얼굴 전체에 넘쳐흐르는 축복받은 관상입니다.",
    similarFeatures: ["올라간 입꼬리", "둥근 뺨", "따뜻한 눈빛"],
    personalityTraits: ["힐링 아이콘", "낙천주의자", "사교성"],
    matchPercentage: 100
  },
  {
    animalName: "아기 호랑이",
    nickname: "위엄 있는 아기 호랑이상",
    reasoning: "눈매가 또렷하고 눈썹 뼈가 발달해 있어 어린 호랑이 같은 패기가 느껴집니다. 귀여움 속에 숨겨진 날카로움이 매력적이며, 어디서든 존재감을 드러내는 당당한 모습이 아주 인상적이네요. 장차 크게 될 관상입니다!",
    similarFeatures: ["강렬한 눈동자", "뚜렷한 인상", "탄탄한 얼굴형"],
    personalityTraits: ["용기", "열정", "강한 승부욕"],
    matchPercentage: 93
  },
  {
    animalName: "나무늘보",
    nickname: "여유로운 나무늘보상",
    reasoning: "전체적으로 편안하고 나른한 분위기가 느껴지는 인상입니다. 세상의 속도에 구애받지 않고 자신만의 페이스를 유지할 것 같은 여유로움이 매력적이에요. 함께 있으면 시간이 천천히 흐르는 듯한 편안함을 주는 분이시군요.",
    similarFeatures: ["처진 눈매", "편안한 입매", "부드러운 인상"],
    personalityTraits: ["여유", "인내심", "마이페이스"],
    matchPercentage: 88
  }
];

export const analyzeFaceForAnimal = async (base64Image: string): Promise<AnimalResult> => {
  // 실제 분석을 시뮬레이션하기 위한 딜레이 (2.5초)
  await new Promise(resolve => setTimeout(resolve, 2500));

  // 로직: 사진 데이터(base64Image)의 길이나 특정 문자를 기반으로 
  // '가짜' 시드값을 만들어 매번 같은 사진에는 최대한 같은 결과가 나오도록 유도
  const seed = base64Image.length % ANIMAL_DATABASE.length;
  
  // 혹은 완전 랜덤을 원한다면:
  // const randomIndex = Math.floor(Math.random() * ANIMAL_DATABASE.length);
  
  return ANIMAL_DATABASE[seed];
};
