export interface AnimalData {
    id: string;
    name: string;
    title: string;
    description: string;
    imageUrl: string;
}

export const ANIMAL_RESULTS: Record<string, AnimalData> = {
    dog: {
        id: "dog",
        name: "강아지상",
        title: "누구에게나 사랑받는 다정다감한 호감형",
        description: "부드러운 얼굴선과 살짝 처진 눈매를 가진 당신! 보는 사람을 무장해제 시키는 선한 미소가 매력이군요. 다정하고 따뜻한 성격으로 주변에 늘 사람이 모이는 스타일입니다.",
        imageUrl: "/images/dog.png"
    },
    cat: {
        id: "cat",
        name: "고양이상",
        title: "도도한 매력 속에 숨겨진 신비로운 아우라",
        description: "시원하게 올라간 눈매와 날렵한 턱선이 매력적이네요! 처음엔 차가워 보일 수 있지만, 알면 알수록 빠져드는 시크하고 세련된 매력의 소유자입니다.",
        imageUrl: "/images/cat.png"
    },
    rabbit: {
        id: "rabbit",
        name: "토끼상",
        title: "맑고 깨끗한 이미지의 순수 결정체",
        description: "동그랗고 큰 눈과 밝은 에너지를 가진 당신! 보고 있으면 보호 본능을 자극하는 청순하고 귀여운 스타일입니다. 주변을 밝게 만드는 긍정적인 매력이 넘치네요.",
        imageUrl: "/images/rabbit.png"
    },
    fox: {
        id: "fox",
        name: "여우상",
        title: "사람을 홀리는 영리하고 매혹적인 눈빛",
        description: "날렵한 눈매와 오뚝한 코가 특징이군요. 지적이면서도 묘하게 섹시한 분위기를 풍깁니다. 영리하고 센스 있는 모습이 사람들에게 강렬한 인상을 남깁니다.",
        imageUrl: "/images/fox.png"
    },
    deer: {
        id: "deer",
        name: "사슴상",
        title: "우아하고 차분한 분위기의 독보적 아우라",
        description: "맑은 눈망울과 가느다란 목선이 조화롭네요. 우아하면서도 고귀한 느낌을 주며, 차분한 분위기 속에서 느껴지는 깊은 눈빛이 주변 사람들을 편안하게 만듭니다.",
        imageUrl: "/images/deer.png"
    },
    dino: {
        id: "dino",
        name: "공룡상",
        title: "강한 존재감을 뿜어내는 카리스마 페이스",
        description: "뚜렷한 T존과 강한 턱선이 매력적인 당신! 무심한 듯 시크한 표정이 굉장히 멋지네요. 개성 넘치면서도 신뢰감을 주는 듬직한 카리스마를 가졌습니다.",
        imageUrl: "/images/dino.png"
    },
    hamster: {
        id: "hamster",
        name: "햄스터상",
        title: "깨물어주고 싶은 깜찍함, 최고의 입덕요정",
        description: "통통한 볼살과 짧은 하관이 매력 포인트! 가만히 있어도 애교가 묻어나는 스타일입니다. 주변 사람들에게 행복을 주는 쿼카 같은 미소를 가졌네요.",
        imageUrl: "/images/hamster.png"
    },
    chick: {
        id: "chick",
        name: "병아리상",
        title: "보호 본능을 자극하는 상큼한 과즙미",
        description: "앳된 얼굴과 오밀조밀한 이목구비가 특징입니다. 보고 있으면 절로 미소가 지어지는 발랄하고 상큼한 에너지를 가졌어요. 전형적인 아이돌 센터 느낌이네요!",
        imageUrl: "/images/chick.png"
    },
    otter: {
        id: "otter",
        name: "수달상",
        title: "장난기 가득한 표정의 호감형 매력쟁이",
        description: "가로로 긴 눈매와 매끈한 얼굴형이 매력적이네요. 유쾌하고 영리해 보이는 인상으로 누구와도 금방 친해지는 친화력 갑! 장난기 넘치는 모습이 매력 포인트입니다.",
        imageUrl: "/images/otter.png"
    },
    wolf: {
        id: "wolf",
        name: "늑대상",
        title: "차가운 지성미 속에 숨겨진 뜨거운 열정",
        description: "날카로운 눈빛과 뚜렷한 이목구비가 압도적입니다. 서늘한 카리스마가 느껴지지만, 내 사람에게는 한없이 다정한 '겉차속따'의 매력을 가진 신뢰감 있는 스타일입니다.",
        imageUrl: "/images/wolf.png"
    },
    snake: {
        id: "snake",
        name: "뱀상",
        title: "치명적이고 트렌디한 무드의 세련된 마스크",
        description: "가늘고 긴 눈매와 날카로운 V라인이 특징입니다. 독보적인 세련미와 미스테리한 분위기를 동시에 가졌네요. 요즘 가장 주목받는 트렌디하고 매혹적인 얼굴입니다.",
        imageUrl: "/images/snake.png"
    },
    frog: {
        id: "frog",
        name: "개구리상",
        title: "시원한 이목구비와 유니크한 매력의 소유자",
        description: "돌출된 큰 눈과 시원시원한 입매가 매력적입니다. 개성 있으면서도 유쾌한 에너지가 넘치네요! 트렌디한 마스크로 사람들에게 잊히지 않는 강렬한 인상을 남깁니다.",
        imageUrl: "/images/frog.png"
    },
    bear: {
        id: "bear",
        name: "곰상",
        title: "포근한 품에 안기고 싶은 듬직한 매력",
        description: "선하고 굵직한 이목구비와 푸근한 인상을 가진 당신! 강아지상보다 한층 더 듬직하고 신뢰감을 주는 스타일이네요. 따뜻한 마음씨와 여유로운 분위기로 주변 사람들에게 깊은 안정감을 줍니다.",
        imageUrl: "/images/bear.png"
    },
    squirrel: {
        id: "squirrel",
        name: "다람쥐상",
        title: "어디서나 반짝이는 생기발랄 에너자이저",
        description: "야무진 입매와 반짝이는 눈망울이 매력 포인트! 가만히 있어도 똑 부러지고 영리해 보이는 인상입니다. 특유의 생동감 넘치는 표정과 밝은 에너지로 주변 분위기를 화사하게 만드는 재주가 있네요.",
        imageUrl: "/images/squirrel.png"
    },
    alpaca: {
        id: "alpaca",
        name: "알파카상",
        title: "순수한 눈망울을 가진 몽환적인 분위기",
        description: "길고 가느다란 목선과 맑으면서도 몽환적인 눈빛이 돋보입니다. 꾸미지 않아도 묻어나는 순수함과 독보적인 분위기가 매력적이네요! 남들과는 차별화된 자신만의 신비로운 아우라를 가진 스타일입니다.",
        imageUrl: "/images/alpaca.png"
    }
};