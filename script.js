gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.cursor');
const homeBtn = document.querySelector('.home-btn');
const closeBtn = document.querySelector('.close-btn');
const detailView = document.querySelector('.detail-view');
const detailTitleContainer = document.querySelector('.detail-title-container');
const detailTitle = document.querySelector('.detail-title');
const detailStage = document.getElementById('detailStage');
const detailStageMain = document.getElementById('detailStageMain');
const detailCurrentImage = document.getElementById('detailCurrentImage');
const detailPrevCard = document.getElementById('detailPrevCard');
const detailPrevImage = document.getElementById('detailPrevImage');
const detailPrevLabel = document.getElementById('detailPrevLabel');
const detailPrevArrow = document.getElementById('detailPrevArrow');
const detailNextCard = document.getElementById('detailNextCard');
const detailNextImage = document.getElementById('detailNextImage');
const detailNextLabel = document.getElementById('detailNextLabel');
const detailNextArrow = document.getElementById('detailNextArrow');
const detailContentContainer = document.querySelector('.detail-stage-content');
const detailExploreBtn = document.querySelector('.detail-explore-btn');
const detailApplyBtn = document.querySelector('.detail-apply-btn');
const detailCompareTab = document.querySelector('.detail-compare-tab');
const detailActions = document.querySelector('.detail-actions');
const detailLocationPanel = document.getElementById('detailLocationPanel');
const detailLocationMap = document.getElementById('detailLocationMap');
const detailLocationText = document.getElementById('detailLocationText');
const detailLocationLinks = document.getElementById('detailLocationLinks');
const detailInfoCard = document.getElementById('detailInfoCard');
const detailEyebrow = document.getElementById('detailEyebrow');
const detailHeading = document.getElementById('detailHeading');
const detailSummary = document.getElementById('detailSummary');

const exploreMode = document.getElementById('exploreMode');
const exploreLeftTitle = document.getElementById('exploreLeftTitle');
const explorePagesTrack = document.getElementById('explorePagesTrack');
const exploreThumbs = document.getElementById('exploreThumbs');

const track = document.querySelector('.gallery-track');
const stickyWrapper = document.querySelector('.sticky-wrapper');
const scrollContainer = document.querySelector('.scroll-container');
const progressBar = document.getElementById('progress-bar');
const exploreStage = document.querySelector('.explore-stage');

const overlayFallbackEarly = ['SOULFUL VOCAL', 'BGC', 'RNR', 'PRIVATE LESSON'];
const overlayFallbackLate = ['NUVOCAL', 'MENTO', 'LOCATION', 'SOCIAL', 'CONTACT'];
const detailImageHiddenLabels = new Set(['MENTO', 'LOCATION', 'CONTACT', 'LOCATION & CONTACT']);
const exploreDisabledLabels = new Set(['LOCATION', 'CONTACT', 'LOCATION & CONTACT']);
const ENABLE_3D_EFFECTS = false;
const depthEnhancedTitles = new Set(ENABLE_3D_EFFECTS ? ['NUVOCAL', 'NAVC CARE+', 'LOCATION'] : []);
const overlaySideLabels = {
    NAVC: 'Not A Vocal Class',
    RNR: 'Riffs and Runs',
    BGC: 'Black Gospel Choir',
    'SINGASONG WRITER': 'Songwriting Class',
    MIDI: 'Music Production',
    GUITAR: 'Instrument Performance',
    'JAZZ PIANO': 'Jazz Harmony Class',
};

const paymentLabelAliases = {
    TECHNIQUE: 'NUVOCAL',
    MINDSET: 'MENTO',
};

const paymentPriceTable = {
    NUVOCAL: 290000,
    MENTO: 290000,
    NAVC: 290000,
    'SOULFUL VOCAL': 490000,
    'NAVC CARE+': 190000,
    RNR: 190000,
    BGC: 190000,
    'SINGASONG WRITER': 190000,
    MIDI: 190000,
    GUITAR: 190000,
    'JAZZ PIANO': 190000,
};

const detailSummaryOverrides = {
    NAVC: `"기초부터 다시"가 아닙니다.
현장에서 쓰이는 보컬 운용법을 처음부터 제대로 쌓는 과정입니다.

NAVC는 발성 이론과 즉흥 가창, 실전 무대까지
12주 안에 한 사이클로 완주하도록 설계된 집합 프로그램입니다.

[커리큘럼]
· 발성 & 보컬 테크닉 (박성태, 전다빈)
· 즉흥 가창법 (윤수용)
· 실전 무대 운용 (길구)

12주 · 참여 멘토 4인 · 기수제 운영
"가르치는 게 아니라 함께 만드는 보컬."`,
    'SOULFUL VOCAL': `잘 부른다는 말을 들어도, 매번 다르게 나온다면?

Soulful Vocal은 감성이 아닌 '재현 가능한 시스템'을 만드는 클래스입니다.
R&B · Soul 기반의 보컬 언어를 해체하고,
무대와 레코딩 어디서든 꺼낼 수 있도록 내재화합니다.

[집중 영역]
· 보컬 컬러 설계 & 다이나믹 운용
· 레코딩 퍼포먼스 최적화
· 감성과 기능의 통합 훈련

12주 · 소수 정원 · 실전 레코딩 세션 포함`,
    'NAVC CARE+': `배운 것이 3개월 뒤에도 남아있게 하려면?

CARE+는 NAVC 이후를 위한 지속 관리 시스템입니다.
실력은 배울 때가 아니라, 유지하는 방식에서 격차가 생깁니다.

[구성]
· 꾸불이반 — 발성 감각 리텐션 루틴
· 블랙가스펠콰이어 — 앙상블 & 실전 블렌딩
· CARE+ 클래스 — 개인 약점 집중 보정

NAVC 수료생 대상 · 지속 가능한 보컬의 조건`,
    RNR: `"늘 같은 부분에서 막힌다"는 느낌, 그게 기술의 한계입니다.

RNR은 보컬테크닉을 기능 단위로 해체해
4주 안에 정확도를 끌어올리는 집중 트레이닝입니다.

[훈련 방식]
· 혼성 등록 기능 분리 훈련
· 레지스터 이동 & 패시지 제어
· 실전 가창 시나리오 적용

4주 · 소수 정원 · 기능 단위 반복 훈련
"보컬은 연습량이 아니라 정확도의 문제입니다."`,
    BGC: `혼자 부를 때와 함께 부를 때, 왜 소리가 달라질까요?

BGC는 블랙가스펠의 화성 언어를 통해
앙상블 블렌딩 감각을 빠르게 체화하는 클래스입니다.
귀가 달라지면, 혼자 부를 때도 달라집니다.

[집중 영역]
· 파트 보이싱 & 화성 청음
· 앙상블 블렌딩 & 다이나믹 조율
· 실전 퍼포먼스 완성

4주 · Whitney Sol 지도 · 팀 보컬 실전 중심`,
    'PRIVATE LESSON': `내 문제가 정확히 뭔지 모른 채 연습하고 있진 않으신가요?

누보컬 1:1 레슨은 SLS 인증 트레이너가
당신의 보컬 패턴을 분석하고 개인화된 루트를 설계합니다.

그룹 수업으로는 해결되지 않는 습관, 음역, 음색 문제를
가장 빠른 경로로 교정합니다.

· 강동협 — SLS 인증, 한국보이스교정협회 소속
· 김서연 — 실용음악 전공, 보컬 코칭 전문

첫 상담 후 맞춤 커리큘럼 설계 진행`,
    'SINGASONG WRITER': `노래를 잘 부르는 것과, 자신만의 노래를 만드는 것은 다릅니다.

Singasong Writer는 멜로디 설계 → 가사 구성 → 톱라인 레이어링까지
가창자의 감각으로 한 곡을 완성하는 클래스입니다.

작곡 이론이 없어도 됩니다.
당신이 이미 가진 보컬 언어를 곡으로 확장합니다.

[결과물]
· 자작 데모 트랙 1곡 완성
· 톱라인 & 가사 포트폴리오

가창자가 작가가 되는 과정`,
    MIDI: `머릿속 사운드를 트랙으로 꺼내는 방법이 있습니다.

MIDI 클래스는 이론 없이도 시작할 수 있도록
리듬 → 코드 → 레이어 순서로 실전 중심으로 진행합니다.

[4주 구성]
· Week 1-2: 리듬 패턴 & 코드 배치
· Week 3: 사운드 레이어링 & 믹스
· Week 4: 완성 트랙 발표

보컬리스트, 작곡 입문자, 홈 레코딩 준비 중인 분께 권합니다.
4주 · 1인 1트랙 완성`,
    GUITAR: `코드는 칠 수 있는데, 왜 무대에서 설득력이 없을까요?

Guitar 클래스는 기술보다 '퍼포머의 기타'를 만드는 과정입니다.
톤 메이킹과 리듬 운용, 무대 흐름 설계까지
4주 안에 라이브 완성도를 끌어올립니다.

[집중 영역]
· 톤 메이킹 & 이펙팅
· 리듬 운용 & 다이나믹 컨트롤
· 보컬-기타 동시 퍼포먼스 설계

싱어송라이터, 보컬리스트 겸 기타리스트에게 최적화`,
    'JAZZ PIANO': `코드는 외웠는데, 왜 즉흥 연주는 막막할까요?

Jazz Piano는 화성 언어를 귀로 먼저 익히고
손이 그것을 따라가도록 설계된 클래스입니다.
악보를 읽는 피아노가 아닌,
대화하는 피아노를 배웁니다.

[집중 영역]
· 재즈 보이싱 & 텐션 운용
· 블루스 스케일 & 모달 즉흥
· 리드시트 기반 실전 연주

악기 경험자 · 보컬리스트 · 작편곡 입문자에게 권합니다.
"연주자의 귀가 달라지면, 노래도 달라집니다."`,
};

const portoneConfig = {
    storeId: document.querySelector('meta[name="portone-store-id"]')?.content?.trim() || '',
    channelKey: document.querySelector('meta[name="portone-channel-key"]')?.content?.trim() || '',
    verifyEndpoint: document.querySelector('meta[name="portone-verify-endpoint"]')?.content?.trim() || '',
    currency: 'KRW',
    payMethod: 'CARD',
};

const mentorProfiles = [
    {
        name: '박성태',
        image: 'https://i.pravatar.cc/280?u=mentor-park',
        desc: '발성 구조를 정밀하게 정리해 재현 가능한 톤을 설계합니다.',
        detailUrl: './park-sungtae-detail.html',
    },
    {
        name: '전다빈',
        image: 'https://i.pravatar.cc/280?u=mentor-jeon',
        desc: '고음 전환과 리듬 컨트롤을 실전 템포에 맞춰 교정합니다.',
    },
    {
        name: '윤수용',
        image: 'https://i.pravatar.cc/280?u=mentor-yoon',
        desc: '퍼포먼스 상황에서도 흔들리지 않는 보컬 운용을 코칭합니다.',
        detailUrl: './yoon-suyong-detail.html',
    },
    {
        name: '길구',
        image: 'https://i.pravatar.cc/280?u=mentor-gilgu',
        desc: '감정 전달과 딕션 밀도를 높여 곡 해석 완성도를 강화합니다.',
    },
    {
        name: 'Whitney',
        image: 'https://i.pravatar.cc/280?u=mentor-whitney',
        desc: '하모니와 그루브 중심의 글로벌 팀 보컬 디렉팅을 담당합니다.',
    },
];

const privateLessonProfiles = [
    {
        name: '강동협',
        image: 'https://i.pravatar.cc/280?u=private-kang',
        desc: '보컬 밸런스와 발성 안정화 중심의 1:1 코칭',
    },
    {
        name: '김서연',
        image: 'https://i.pravatar.cc/280?u=private-kim',
        desc: '톤 메이킹과 표현 디테일 중심의 개인 트레이닝',
    },
];

const cards = Array.from(document.querySelectorAll('.gallery-item')).map((el, index) => ({
    el,
    index,
    inner: el.querySelector('.gallery-item-inner'),
    img: el.querySelector('img'),
}));

const EXPLORE_PAGE_LIBRARY = {
    NAVC: [
        {
            title: '12주 과정 · VOCAL FOUNDATION',
            desc: '소리를 억지로 만드는 수업이 아닙니다.',
            image: './assets/navc-detail.png',
            tone: 'light',
        },
        {
            title: '상세 설명',
            desc: '노래가 막히지 않는 몸의 상태를 함께 찾습니다. 숨, 리듬, 감각이 자연스럽게 연결되도록 돕고, 음의 끝처리와 소리를 유지/변화시키는 방식 등 싱잉 스타일이 실제로 어떻게 작동하는지 다룹니다.',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
        {
            title: '멘토진',
            desc: '박성태 · 전다빈 · 윤수용 · 길구',
            image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
    ],
    'SOULFUL VOCAL': [
        {
            title: '12주 과정 · SOULFUL VOCAL',
            desc: '감각 의존을 버리고, 무대와 레코딩에서 동일하게 재현되는 보컬 시스템을 구축합니다.',
            image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
            proKicker: 'Philosophy',
            proSignature: '감정은 자유롭게, 운용은 정밀하게.',
            proPillars: ['Tone Stability', 'Range Transition', 'Performance Recall'],
            proMetricLabel: 'PROGRAM',
            proMetricValue: '12 WEEKS',
        },
        {
            title: '실전 운용 프로토콜',
            desc: '곡 해석부터 호흡 분배, 딕션 밀도, 다이내믹 컨트롤까지 실전 체계를 단계별로 설계합니다.',
            image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
            proKicker: 'Method',
            proSignature: '문제는 교정하고, 강점은 증폭한다.',
            proPillars: ['Mic Technique', 'Session Direction', 'Live Recovery'],
            proMetricLabel: 'DELIVERY',
            proMetricValue: '1:1 FEEDBACK',
        },
        {
            title: '결과 기준',
            desc: '프로젝트 단위 점검으로 가창 완성도와 컨디션 편차를 수치로 확인하며 결과를 고정합니다.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
            proKicker: 'Outcome',
            proSignature: '한 번의 컨디션이 아닌, 반복 가능한 퍼포먼스.',
            proPillars: ['Weekly Audit', 'Record Feedback', 'Showcase Simulation'],
            proMetricLabel: 'MENTORS',
            proMetricValue: '3 DIRECTORS',
        },
    ],
    'NAVC CARE+': [
        {
            title: 'NAVC CARE+',
            desc: '단순한 수강 완료를 넘어, 당신의 목소리가 변치 않는 성능을 유지하도록 설계된 프리미엄 사후 관리 서비스입니다.',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
        {
            title: 'Premium Support',
            desc: 'NAVC / SOULFUL VOCAL 유지 보수 · RNR 클래스 상시 포함',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
        {
            title: '지원 항목',
            desc: '전담 멘토 1:1 보이스 체킹 · 정기 발성 정밀 진단',
            image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
    ],
    MENTO: [
        {
            kind: 'mentor',
            title: 'NUVOCAL MENTOR TEAM',
            desc: '실전 보컬 코칭을 담당하는 누보컬 멘토진',
            tone: 'light',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1800&auto=format&fit=crop',
            mentors: mentorProfiles,
        },
        {
            title: 'Coaching Session',
            desc: '개인 보컬 분석을 기반으로 맞춤형 트레이닝 루틴을 운영합니다.',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
        {
            title: 'Performance Guide',
            desc: '무대/녹음 환경에 맞춘 실전 코칭으로 결과물을 완성합니다.',
            image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
    ],
    RNR: [
        {
            title: '4주 과정 · 보컬테크닉 집중반',
            desc: '짧은 기간 동안 핵심 테크닉을 집중적으로 끌어올리는 트랙입니다.',
            image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
        {
            title: '상세 설명',
            desc: '보컬테크닉을 완전히 분해시켜 습득하는 클래스입니다.',
            image: 'https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
        {
            title: '멘토진',
            desc: '전다빈',
            image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
    ],
    BGC: [
        {
            title: '4주 과정 · MAKE HARMONY',
            desc: '화음과 팀 보컬의 결속감을 집중적으로 체화하는 과정입니다.',
            image: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
        {
            title: '상세 설명',
            desc: '아무것도 신경 쓰지 않는 순수한 가창과 화음감을 만들어주는 클래스입니다.',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
        {
            title: '멘토진',
            desc: 'Whitney',
            image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
    ],
    MIDI: [
        {
            title: '4주 과정 · MIDI PRODUCTION',
            desc: 'MIDI 기반으로 리듬, 코드, 사운드 레이어를 빠르게 설계하는 프로덕션 클래스입니다.',
            image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
        {
            title: '핵심 트레이닝',
            desc: 'MIDI 입력 정밀도, 벨로시티 컨트롤, 템포 그리드 운용을 실습 중심으로 다룹니다.',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
        {
            title: '결과물 제작',
            desc: '클래스 종료 시 실제 트랙 구조를 갖춘 데모 프로젝트를 완성합니다.',
            image: 'https://images.unsplash.com/photo-1461783436728-0a9217714694?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
    ],
    'SINGASONG WRITER': [
        {
            title: '4주 과정 · SONGWRITING CLASS',
            desc: '보컬리스트의 감각을 바탕으로 톱라인과 가사, 멜로디 구조를 직접 설계하는 클래스입니다.',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
        {
            title: '핵심 트레이닝',
            desc: '멜로디 메이킹, 훅 설계, 리릭 스케치, 데모 보컬 디렉션을 실습 중심으로 다룹니다.',
            image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
        {
            title: '데모 완성',
            desc: '클래스 종료 시 본인만의 메시지를 담은 톱라인 데모를 완성합니다.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
    ],
    GUITAR: [
        {
            title: '4주 과정 · GUITAR PERFORMANCE',
            desc: '톤 메이킹과 리듬 운용을 바탕으로 실전 연주 완성도를 끌어올리는 클래스입니다.',
            image: 'https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
        {
            title: '핵심 테크닉',
            desc: '피킹 다이내믹, 핑거링 안정성, 프레이징 연결을 단계별로 훈련합니다.',
            image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
        {
            title: '실전 셋업',
            desc: '앰프/이펙터 셋업과 무대 동선까지 포함해 라이브 퍼포먼스 기준으로 마무리합니다.',
            image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
    ],
    'JAZZ PIANO': [
        {
            title: '4주 과정 · JAZZ PIANO',
            desc: '화성 언어를 귀로 익히고 손으로 연결하는 실전 중심의 재즈 피아노 클래스입니다.',
            image: 'https://images.unsplash.com/photo-1514119412350-e174d90d280e?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
        {
            title: '핵심 트레이닝',
            desc: '재즈 보이싱, 텐션 운용, 블루스 스케일과 모달 즉흥을 단계적으로 다룹니다.',
            image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1800&auto=format&fit=crop',
            tone: 'light',
        },
        {
            title: '실전 연주',
            desc: '리드시트 기반 연주와 즉흥 흐름 설계까지, 대화하는 피아노를 목표로 마무리합니다.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1800&auto=format&fit=crop',
            tone: 'dark',
        },
    ],
};

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

let itemPositions = [];
let isDetailOpen = false;
let isDetailTransitioning = false;
let detailTransitionStartedAt = 0;
let activeCard = null;
let activeCardIndex = -1;
let detailWheelAccum = 0;
let detailTouchStartY = null;

let isExploreOpen = false;
let isExploreTransitioning = false;
let explorePages = [];
let exploreIndex = 0;
let exploreWheelAccum = 0;
let exploreTouchStartY = null;
let isPaymentPending = false;
let detailTitleHideTimer = null;
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function clearDetailTitleTimer() {
    if (!detailTitleHideTimer) return;
    window.clearTimeout(detailTitleHideTimer);
    detailTitleHideTimer = null;
}

function hideDetailTitleOverlay(options = {}) {
    const { instant = false } = options;
    if (!detailTitleContainer || !detailTitle) return;

    clearDetailTitleTimer();
    const chars = detailTitle.querySelectorAll('.char');
    gsap.killTweensOf(detailTitleContainer);
    gsap.killTweensOf(chars);

    if (instant) {
        gsap.set(chars, { yPercent: -120, opacity: 0, rotateX: -22 });
        gsap.set(detailTitleContainer, { opacity: 0 });
        detailTitle.innerHTML = '';
        return;
    }

    gsap.to(chars, {
        yPercent: 110,
        opacity: 0,
        rotateX: 20,
        duration: 0.48,
        stagger: 0.012,
        ease: 'power3.in',
    });

    gsap.to(detailTitleContainer, {
        opacity: 0,
        duration: 0.42,
        delay: 0.08,
        ease: 'power2.out',
        onComplete: () => {
            detailTitle.innerHTML = '';
        },
    });
}

function showDetailTitleOverlay(card) {
    if (!detailTitleContainer || !detailTitle || !card) return;

    hideDetailTitleOverlay({ instant: true });

    const titleText = overlayLabelNormalizedForCard(card).replace(/\s+/g, ' ').trim();
    detailTitle.innerHTML = titleText
        .split('')
        .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

    const chars = detailTitle.querySelectorAll('.char');
    gsap.set(detailTitleContainer, { opacity: 1 });
    gsap.set(chars, { yPercent: -120, opacity: 0, rotateX: -28 });

    gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: prefersReducedMotion ? 0.42 : 0.86,
        stagger: prefersReducedMotion ? 0.01 : 0.025,
        ease: 'expo.out',
    });

    detailTitleHideTimer = window.setTimeout(() => {
        hideDetailTitleOverlay();
    }, 2000);
}

function detailStageImageForCard(card) {
    if (!card) return '';
    const data = card.el?.dataset || {};
    return data.detailImage || card.img?.dataset.originalSrc || card.img?.currentSrc || card.img?.src || '';
}

function updateDetailStagePreview(button, image, label, card) {
    if (!button || !image || !label) return;

    if (!card) {
        button.classList.add('is-hidden');
        button.disabled = true;
        image.removeAttribute('src');
        image.alt = '';
        label.textContent = '';
        return;
    }

    button.classList.remove('is-hidden');
    button.disabled = false;
    image.src = detailStageImageForCard(card);
    image.alt = overlayLabelForCard(card);
    label.textContent = overlayLabelForCard(card);
}

function clearDetailStage() {
    if (detailStage) {
        detailStage.setAttribute('aria-hidden', 'true');
    }
    if (detailCurrentImage) {
        detailCurrentImage.removeAttribute('src');
        detailCurrentImage.alt = '';
    }
    updateDetailStagePreview(detailPrevCard, detailPrevImage, detailPrevLabel, null);
    updateDetailStagePreview(detailNextCard, detailNextImage, detailNextLabel, null);
    detailPrevArrow?.classList.add('is-hidden');
    detailNextArrow?.classList.add('is-hidden');
}

function renderDetailStage(options = {}) {
    const { animate = false, direction = 0 } = options;
    if (!detailStage || !detailCurrentImage || !activeCard) return;

    const previousCard = activeCardIndex > 0 ? cards[activeCardIndex - 1] : null;
    const nextCard = activeCardIndex < cards.length - 1 ? cards[activeCardIndex + 1] : null;

    detailStage.setAttribute('aria-hidden', 'false');
    detailCurrentImage.src = detailStageImageForCard(activeCard);
    detailCurrentImage.alt = overlayLabelForCard(activeCard);

    updateDetailStagePreview(detailPrevCard, detailPrevImage, detailPrevLabel, previousCard);
    updateDetailStagePreview(detailNextCard, detailNextImage, detailNextLabel, nextCard);

    detailPrevArrow?.classList.toggle('is-hidden', !previousCard);
    detailNextArrow?.classList.toggle('is-hidden', !nextCard);

    if (!animate) return;

    const xOffset = direction === 0 ? 0 : direction > 0 ? 28 : -28;
    const sideOffset = direction === 0 ? 0 : direction > 0 ? 18 : -18;

    if (detailStageMain) {
        gsap.fromTo(
            detailStageMain,
            { autoAlpha: 0.42, x: xOffset, scale: 0.965 },
            { autoAlpha: 1, x: 0, scale: 1, duration: 0.52, ease: 'expo.out', overwrite: 'auto' }
        );
    }

    [detailPrevCard, detailNextCard].forEach((element, index) => {
        if (!element || element.classList.contains('is-hidden')) return;
        const offset = index === 0 ? -sideOffset : sideOffset;
        gsap.fromTo(
            element,
            { autoAlpha: 0.18, x: offset, scale: 0.96 },
            { autoAlpha: 1, x: 0, scale: 1, duration: 0.42, ease: 'power3.out', overwrite: 'auto' }
        );
    });
}

function syncActiveDetailCard(index, options = {}) {
    const { animateStage = false, direction = 0 } = options;
    const nextCard = cards[index];
    if (!nextCard) return;

    activeCard = nextCard;
    activeCardIndex = index;

    setupDetailButtons(activeCard);
    setupDetailInfo(activeCard);
    showDetailTitleOverlay(activeCard);

    if (detailView) {
        detailView.classList.toggle('has-explore', cardSupportsExplore(activeCard));
    }

    document.body.style.backgroundColor = '#ffffff';
    renderDetailStage({ animate: animateStage, direction });
}

function navigateDetail(direction) {
    if (!isDetailOpen || isExploreOpen || isDetailTransitioning) return;
    const nextIndex = activeCardIndex + direction;
    if (nextIndex < 0 || nextIndex >= cards.length) return;

    isDetailTransitioning = true;
    syncActiveDetailCard(nextIndex, { animateStage: true, direction });

    window.setTimeout(() => {
        isDetailTransitioning = false;
        detailTransitionStartedAt = 0;
    }, 520);
}

function setupAristideInteractiveMotion() {
    if (!stickyWrapper && !exploreStage && !exploreMode) return;

    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let wheelImpulse = 0;

    let exploreTargetX = 0;
    let exploreTargetY = 0;
    let exploreX = 0;
    let exploreY = 0;

    const pointerEase = prefersReducedMotion ? 0.08 : 0.14;
    const stageEase = prefersReducedMotion ? 0.08 : 0.12;
    const wheelDecay = prefersReducedMotion ? 0.84 : 0.9;
    const wheelBoost = prefersReducedMotion ? 0.01 : 0.016;
    const maxWheel = prefersReducedMotion ? 8 : 16;

    document.addEventListener(
        'pointermove',
        (event) => {
            if (!window.innerWidth || !window.innerHeight) return;
            pointerTargetX = (event.clientX / window.innerWidth) * 2 - 1;
            pointerTargetY = (event.clientY / window.innerHeight) * 2 - 1;

            if (!exploreStage || !isExploreOpen) return;
            const rect = exploreStage.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            exploreTargetX = clamp((event.clientX - rect.left) / rect.width, 0, 1) * 2 - 1;
            exploreTargetY = clamp((event.clientY - rect.top) / rect.height, 0, 1) * 2 - 1;
        },
        { passive: true }
    );

    document.addEventListener(
        'pointerleave',
        () => {
            pointerTargetX = 0;
            pointerTargetY = 0;
            exploreTargetX = 0;
            exploreTargetY = 0;
        },
        { passive: true }
    );

    window.addEventListener(
        'wheel',
        (event) => {
            if (isDetailOpen || isExploreOpen) return;
            wheelImpulse = clamp(wheelImpulse + event.deltaY * -wheelBoost, -maxWheel, maxWheel);
        },
        { passive: true }
    );

    if (exploreMode) {
        exploreMode.addEventListener(
            'pointerleave',
            () => {
                exploreTargetX = 0;
                exploreTargetY = 0;
            },
            { passive: true }
        );
    }

    gsap.ticker.add(() => {
        const freezeLanding = isDetailOpen || isExploreOpen;
        const nextLandingX = freezeLanding ? 0 : pointerTargetX;
        const nextLandingY = freezeLanding ? 0 : pointerTargetY;

        pointerX += (nextLandingX - pointerX) * pointerEase;
        pointerY += (nextLandingY - pointerY) * pointerEase;
        wheelImpulse *= wheelDecay;

        if (stickyWrapper) {
            const shiftX = pointerX * (prefersReducedMotion ? 6 : 12);
            const shiftY = pointerY * (prefersReducedMotion ? -4 : -7) + wheelImpulse;
            const scale = 1 + (Math.abs(pointerX) + Math.abs(pointerY)) * (prefersReducedMotion ? 0.0012 : 0.0024);

            stickyWrapper.style.setProperty('--ambient-shift-x', `${shiftX.toFixed(2)}px`);
            stickyWrapper.style.setProperty('--ambient-shift-y', `${shiftY.toFixed(2)}px`);
            stickyWrapper.style.setProperty('--ambient-scale', scale.toFixed(4));
        }

        const nextExploreX = isExploreOpen ? exploreTargetX : 0;
        const nextExploreY = isExploreOpen ? exploreTargetY : 0;
        exploreX += (nextExploreX - exploreX) * stageEase;
        exploreY += (nextExploreY - exploreY) * stageEase;

        if (exploreStage) {
            const tiltX = -exploreY * (prefersReducedMotion ? 1.2 : 2.8);
            const tiltY = exploreX * (prefersReducedMotion ? 1.6 : 3.6);
            const shiftX = exploreX * (prefersReducedMotion ? 4 : 8);
            const shiftY = exploreY * (prefersReducedMotion ? 4 : 8);

            exploreStage.style.setProperty('--explore-tilt-x', `${tiltX.toFixed(2)}deg`);
            exploreStage.style.setProperty('--explore-tilt-y', `${tiltY.toFixed(2)}deg`);
            exploreStage.style.setProperty('--explore-shift-x', `${shiftX.toFixed(2)}px`);
            exploreStage.style.setProperty('--explore-shift-y', `${shiftY.toFixed(2)}px`);
        }

        if (exploreMode) {
            const imageShiftX = exploreX * (prefersReducedMotion ? 8 : 18);
            const imageShiftY = exploreY * (prefersReducedMotion ? 6 : 14);
            exploreMode.style.setProperty('--explore-image-shift-x', `${imageShiftX.toFixed(2)}px`);
            exploreMode.style.setProperty('--explore-image-shift-y', `${imageShiftY.toFixed(2)}px`);
        }
    });
}

function hasPortOneBrowserSdk() {
    return typeof window.PortOne?.requestPayment === 'function';
}

function isPortOneConfigured() {
    return Boolean(portoneConfig.storeId && portoneConfig.channelKey);
}

function getCardPaymentLabel(card) {
    const data = card?.el?.dataset || {};
    const title = (data.title || '').toUpperCase();
    const overlay = (data.overlayLabel || '').replace(/\|/g, ' ').toUpperCase().trim();
    if (title === 'SOULFUL VOCAL' || overlay === 'SOULFUL VOCAL') return 'SOULFUL VOCAL';
    return paymentLabelAliases[title] || overlay || title || 'NUVOCAL';
}

function getCardPaymentAmount(card) {
    const data = card?.el?.dataset || {};
    const fromDataset = Number(data.paymentAmount || 0);
    if (Number.isFinite(fromDataset) && fromDataset > 0) return Math.round(fromDataset);
    return paymentPriceTable[getCardPaymentLabel(card)] || 0;
}

function getPortOneRedirectUrl() {
    const base = `${window.location.origin}${window.location.pathname}`;
    return `${base}?portone_redirect=1`;
}

function setApplyButtonLoadingState(isLoading) {
    if (!detailApplyBtn) return;
    detailApplyBtn.classList.toggle('is-loading', isLoading);
    detailApplyBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');
}

async function verifyPortOnePayment(paymentId, amount, orderName) {
    if (!portoneConfig.verifyEndpoint) return null;
    try {
        const response = await fetch(portoneConfig.verifyEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, amount, orderName }),
        });
        if (!response.ok) return false;
        const result = await response.json();
        return Boolean(result?.ok);
    } catch (error) {
        console.error('[PortOne] verify request failed:', error);
        return false;
    }
}

async function startPortOnePaymentForCard(card) {
    if (!card || isPaymentPending) return;

    const fallbackUrl = card.el.dataset.applyUrl;

    if (!hasPortOneBrowserSdk() || !isPortOneConfigured()) {
        if (fallbackUrl) {
            window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
        } else {
            window.alert('결제 연동 정보가 아직 설정되지 않았습니다.');
        }
        return;
    }

    const orderLabel = getCardPaymentLabel(card);
    const amount = getCardPaymentAmount(card);
    if (!amount) {
        window.alert('결제 금액이 설정되지 않았습니다. 관리자에게 문의해주세요.');
        return;
    }

    const paymentId = `nuvocal-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    isPaymentPending = true;
    setApplyButtonLoadingState(true);

    try {
        const response = await window.PortOne.requestPayment({
            storeId: portoneConfig.storeId,
            channelKey: portoneConfig.channelKey,
            paymentId,
            orderName: `${orderLabel} 클래스 신청`,
            totalAmount: amount,
            currency: portoneConfig.currency,
            payMethod: portoneConfig.payMethod,
            redirectUrl: getPortOneRedirectUrl(),
        });

        if (!response) return;

        if (response.code) {
            const reason = response.message || '결제가 취소되었거나 실패했습니다.';
            window.alert(reason);
            return;
        }

        const resolvedPaymentId = response.paymentId || paymentId;
        const verifyResult = await verifyPortOnePayment(
            resolvedPaymentId,
            amount,
            `${orderLabel} 클래스 신청`
        );

        if (verifyResult === true) {
            window.alert('결제가 완료되었습니다.');
        } else if (verifyResult === false) {
            window.alert('결제는 완료되었지만 서버 검증에 실패했습니다. 관리자에게 문의해주세요.');
        } else {
            window.alert('결제 요청이 완료되었습니다. 서버 검증 연동 후 자동 확정됩니다.');
        }
    } catch (error) {
        console.error('[PortOne] requestPayment error:', error);
        window.alert('결제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        isPaymentPending = false;
        setApplyButtonLoadingState(false);
    }
}

async function handlePortOneRedirectResult() {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('paymentId');
    const errorCode = params.get('code');
    const errorMessage = params.get('message');
    const redirectedFromPortOne = params.get('portone_redirect') === '1' || Boolean(paymentId || errorCode);

    if (!redirectedFromPortOne) return;

    const clearRedirectParams = () => {
        ['portone_redirect', 'paymentId', 'code', 'message'].forEach((key) => params.delete(key));
        const query = params.toString();
        const cleanUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    };

    if (errorCode) {
        window.alert(errorMessage || `결제가 완료되지 않았습니다. (${errorCode})`);
        clearRedirectParams();
        return;
    }

    if (!paymentId) {
        clearRedirectParams();
        return;
    }

    const verifyResult = await verifyPortOnePayment(paymentId, null, null);
    if (verifyResult === true) {
        window.alert('결제가 완료되었습니다.');
    } else if (verifyResult === false) {
        window.alert('결제는 완료되었지만 서버 검증에 실패했습니다. 관리자에게 문의해주세요.');
    } else {
        window.alert('결제 결과가 돌아왔습니다. 서버 검증 연동 후 최종 확정됩니다.');
    }
    clearRedirectParams();
}

function preload(src) {
    if (!src) return;
    const image = new Image();
    image.src = src;
}

cards
    .map((card) => card.el.dataset.detailImage)
    .filter(Boolean)
    .forEach(preload);

Object.values(EXPLORE_PAGE_LIBRARY)
    .flat()
    .map((entry) => entry.image)
    .filter(Boolean)
    .forEach(preload);

function splitVerticalChunks(label, noWrap = false) {
    const normalized = (label || '').toUpperCase().trim();
    if (!normalized) return [''];
    if (noWrap) return [normalized];
    if (normalized.includes('|')) {
        return normalized
            .split('|')
            .map((part) => part.trim())
            .filter(Boolean);
    }

    const words = normalized.split(/\s+/).filter(Boolean);
    const chunks = [];

    words.forEach((word) => {
        // Keep symbolic labels like CARE+ as a single vertical line.
        if (word.includes('+')) {
            chunks.push(word);
            return;
        }
        if (word.length <= 4) {
            chunks.push(word);
            return;
        }
        for (let i = 0; i < word.length; i += 4) {
            chunks.push(word.slice(i, i + 4));
        }
    });

    return chunks.length ? chunks : [''];
}

function renderVerticalLabel(container, label, noWrap = false) {
    if (!container) return;
    container.innerHTML = '';
    splitVerticalChunks(label, noWrap).forEach((chunk) => {
        const line = document.createElement('span');
        line.className = 'navc-line';
        line.textContent = chunk;
        container.appendChild(line);
    });
}

function labelForCard(card) {
    if (card.el.dataset.overlayLabel) {
        return card.el.dataset.overlayLabel;
    }
    if (card.index === 0) return 'NAVC';
    if (card.index >= 1 && card.index <= 4) return overlayFallbackEarly[card.index - 1];
    return overlayFallbackLate[(card.index - 5) % overlayFallbackLate.length];
}

function initCardOverlays() {
    cards.forEach((card) => {
        if (!card.inner) return;

        let overlay = card.inner.querySelector('.navc-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'navc-overlay';
            overlay.setAttribute('aria-hidden', 'true');

            const main = document.createElement('div');
            main.className = 'navc-vertical';

            const side = document.createElement('div');
            side.className = 'navc-side';

            overlay.appendChild(main);
            overlay.appendChild(side);
            card.inner.appendChild(overlay);
        }

        const main = overlay.querySelector('.navc-vertical');
        const side = overlay.querySelector('.navc-side');
        const noWrap = card.el.dataset.overlayNowrap === 'true';
        renderVerticalLabel(main, labelForCard(card), noWrap);

        if (side) {
            const titleKey = (card.el.dataset.title || '').toUpperCase();
            side.textContent = overlaySideLabels[titleKey] || '';
        }
    });
}

function resetDepthCardState(card) {
    if (!card?.el) return;
    card.el.style.setProperty('--depth-tilt-x', '0deg');
    card.el.style.setProperty('--depth-tilt-y', '0deg');
    card.el.style.setProperty('--depth-shift-x', '0px');
    card.el.style.setProperty('--depth-shift-y', '0px');
    card.el.classList.remove('is-depth-pressed');
}

function setupDepthCards() {
    if (!ENABLE_3D_EFFECTS) {
        cards.forEach((card) => {
            card.el.classList.remove('is-depth-card', 'is-depth-pressed');
            card.el.style.removeProperty('--depth-tilt-x');
            card.el.style.removeProperty('--depth-tilt-y');
            card.el.style.removeProperty('--depth-shift-x');
            card.el.style.removeProperty('--depth-shift-y');
            card.el.style.removeProperty('z-index');
        });
        return;
    }

    cards.forEach((card) => {
        const label = (card.el.dataset.title || card.el.dataset.overlayLabel || '')
            .replace(/\|/g, ' ')
            .trim()
            .toUpperCase();

        if (!depthEnhancedTitles.has(label)) {
            card.el.classList.remove('is-depth-card', 'is-depth-pressed');
            card.el.style.removeProperty('--depth-tilt-x');
            card.el.style.removeProperty('--depth-tilt-y');
            card.el.style.removeProperty('--depth-shift-x');
            card.el.style.removeProperty('--depth-shift-y');
            card.el.style.removeProperty('z-index');
            return;
        }

        card.el.classList.add('is-depth-card');
        resetDepthCardState(card);

        card.el.addEventListener('pointermove', (event) => {
            if (isDetailOpen || isDetailTransitioning) return;

            const rect = card.el.getBoundingClientRect();
            if (!rect.width || !rect.height) return;

            const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
            const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);

            const tiltX = (0.5 - py) * 26;
            const tiltY = (px - 0.5) * 32;
            const shiftX = (px - 0.5) * 80;
            const shiftY = (py - 0.5) * 64;

            card.el.style.setProperty('--depth-tilt-x', `${tiltX.toFixed(2)}deg`);
            card.el.style.setProperty('--depth-tilt-y', `${tiltY.toFixed(2)}deg`);
            card.el.style.setProperty('--depth-shift-x', `${shiftX.toFixed(2)}px`);
            card.el.style.setProperty('--depth-shift-y', `${shiftY.toFixed(2)}px`);
        });

        card.el.addEventListener('pointerenter', () => {
            if (isDetailOpen || isDetailTransitioning) return;
            card.el.style.zIndex = '8';
            card.el.classList.remove('is-depth-pressed');
        });

        card.el.addEventListener('pointerdown', () => {
            if (isDetailOpen || isDetailTransitioning) return;
            card.el.classList.add('is-depth-pressed');
        });

        card.el.addEventListener('pointerup', () => {
            card.el.classList.remove('is-depth-pressed');
        });

        card.el.addEventListener('pointerleave', () => {
            resetDepthCardState(card);
            if (!isDetailOpen) card.el.style.zIndex = '2';
        });

        card.el.addEventListener('pointercancel', () => {
            resetDepthCardState(card);
            if (!isDetailOpen) card.el.style.zIndex = '2';
        });
    });
}

function findCardEntryFromElement(element) {
    if (!element?.closest) return null;
    const targetCard = element.closest('.gallery-item');
    if (!targetCard) return null;
    return cards.find((card) => card.el === targetCard) || null;
}

function activateCard(card) {
    if (!card) return;
    if (isDetailOpen || isDetailTransitioning || isExploreOpen) return;
    openDetailAtIndex(card.index);
}

function setupCursor() {
    if (!cursor) return;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        gsap.set(cursor, { x: cursorX, y: cursorY });
    });

    const hoverElements = [
        ...cards.map((card) => card.el),
        homeBtn,
        closeBtn,
        detailExploreBtn,
        detailApplyBtn,
        detailCompareTab,
        detailPrevCard,
        detailNextCard,
        detailPrevArrow,
        detailNextArrow,
    ].filter(Boolean);

    hoverElements.forEach((element) => {
        element.addEventListener('mouseenter', () => cursor.classList.add('active'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

setupCursor();
initCardOverlays();
setupDepthCards();
setupAristideInteractiveMotion();
if (!ENABLE_3D_EFFECTS && track) {
    track.style.perspective = 'none';
    track.style.transformStyle = 'flat';
}
handlePortOneRedirectResult();

if (homeBtn) {
    homeBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (isExploreOpen) {
            closeExploreMode({ instant: true });
        }

        if (isDetailOpen) {
            closeActiveDetail({ force: true });
        }

        if (lenis) {
            lenis.start();
            lenis.scrollTo(0, {
                duration: 0.9,
                easing: (t) => 1 - Math.pow(1 - t, 4),
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

const lenis =
    typeof Lenis === 'function'
        ? new Lenis({
              duration: 0.6,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              direction: 'vertical',
              gestureDirection: 'vertical',
              smooth: true,
              mouseMultiplier: 1.2,
          })
        : null;

if (lenis) {
    const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
}

gsap.ticker.lagSmoothing(0);

function init3DGallery() {
    cards.forEach((card) => gsap.set(card.el, { clearProps: 'all' }));
    itemPositions = cards.map((card) => card.el.offsetLeft + card.el.offsetWidth / 2);
}

if (track && scrollContainer) {
    init3DGallery();

    window.addEventListener('resize', () => {
        if (!isDetailOpen) init3DGallery();
    });

    gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: scrollContainer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => updateProgressBar(self.progress),
        },
    });

    gsap.ticker.add(() => {
        if (isDetailOpen) return;

        const trackX = Number(gsap.getProperty(track, 'x'));
        const viewportCenter = window.innerWidth / 2;
        const time = gsap.ticker.time;

        cards.forEach((card, i) => {
            if (!card.img) return;

            const absoluteCenter = itemPositions[i] + trackX;
            const dist = absoluteCenter - viewportCenter;
            const maxDist = window.innerWidth * 0.44;
            const progress = clamp(dist / maxDist, -1, 1);
            const centerStrength = 1 - Math.abs(progress);
            const liftDrift =
                Math.sin(time * 1.55 + i * 0.9) * (prefersReducedMotion ? 2.2 : 6.8) * centerStrength;

            const rotateY = ENABLE_3D_EFFECTS ? progress * -65 : 0;
            const z = ENABLE_3D_EFFECTS ? Math.abs(progress) * -600 : 0;
            const pullX = -progress * window.innerWidth * (prefersReducedMotion ? 0.022 : 0.048);
            const scale = 0.78 + centerStrength * (prefersReducedMotion ? 0.16 : 0.32);
            const liftY = centerStrength * (prefersReducedMotion ? -14 : -34) + liftDrift;
            const skewY = progress * (prefersReducedMotion ? -1.2 : -3.4);
            const rotateZ = progress * (prefersReducedMotion ? 0.8 : 2.8);
            const brightness = 1 - Math.abs(progress) * 0.6;
            const grayscale = Math.abs(progress) * 100;
            const imageScale = 1.02 + centerStrength * (prefersReducedMotion ? 0.1 : 0.24);

            gsap.set(card.el, { x: pullX, y: liftY, rotateY, rotateZ, skewY, z, scale });
            gsap.set(card.img, {
                scale: imageScale,
                filter: `brightness(${brightness}) grayscale(${grayscale}%)`,
            });
        });
    });
}

let bars = [];
if (progressBar) {
    for (let i = 0; i < 30; i += 1) {
        const span = document.createElement('span');
        progressBar.appendChild(span);
    }
    bars = Array.from(progressBar.querySelectorAll('span'));
}

function updateProgressBar(progress) {
    if (!bars.length) return;
    const activeIndex = clamp(Math.floor(progress * bars.length), 0, bars.length - 1);
    bars.forEach((bar, index) => {
        const distance = Math.abs(index - activeIndex);
        const influence = clamp(1 - distance / 5, 0, 1);
        bar.classList.toggle('active', index === activeIndex);
        bar.style.opacity = (0.18 + influence * 0.82).toFixed(3);
        bar.style.transform = `scaleY(${(0.72 + influence * 0.62).toFixed(3)})`;
    });
}

function setupDetailButtons(card) {
    const data = card?.el?.dataset || {};
    const enableExplore = cardSupportsExplore(card);
    const hasApplyAction = Boolean(data.applyUrl);
    const hasCompareAction = Boolean(data.compareUrl);
    const hasVisibleAction = enableExplore || hasApplyAction || hasCompareAction;

    if (detailExploreBtn) {
        detailExploreBtn.textContent = data.exploreLabel || '자세히 보기';
        detailExploreBtn.style.display = enableExplore ? 'inline-flex' : 'none';
    }

    if (detailApplyBtn) {
        if (hasApplyAction) {
            detailApplyBtn.href = data.applyUrl;
            detailApplyBtn.textContent = data.applyLabel || '신청하기';
            detailApplyBtn.classList.add('is-visible');
        } else {
            detailApplyBtn.removeAttribute('href');
            detailApplyBtn.textContent = '';
            detailApplyBtn.classList.remove('is-visible');
        }
    }

    if (detailCompareTab) {
        if (hasCompareAction) {
            detailCompareTab.href = data.compareUrl;
            detailCompareTab.textContent = data.compareLabel || '클래스 비교';
            detailCompareTab.classList.add('is-visible');
        } else {
            detailCompareTab.removeAttribute('href');
            detailCompareTab.textContent = '';
            detailCompareTab.classList.remove('is-visible');
        }
    }

    if (detailActions) {
        detailActions.classList.toggle('is-hidden', !hasVisibleAction);
    }

    if (detailLocationPanel && detailLocationText && detailLocationLinks) {
        const overlayLabel = (data.overlayLabel || '').replace(/\|/g, ' ').toUpperCase().trim();
        const isMentoCard = overlayLabel === 'MENTO';
        const isPrivateLessonCard =
            overlayLabel === 'PRIVATE LESSON' || (data.title || '').toUpperCase().trim() === 'PRIVATE LESSON';
        const isLocationCard = overlayLabel.includes('LOCATION') || Boolean(data.mapEmbed);
        const isContactCard = overlayLabel.includes('CONTACT') || data.contactMode === 'true';
        const hasContactLinks = Boolean(data.instagramUrl) || Boolean(data.kakaoUrl) || Boolean(data.youtubeUrl);

        if (isMentoCard) {
            if (detailLocationMap) {
                detailLocationMap.removeAttribute('src');
                detailLocationMap.classList.add('is-hidden');
            }
            detailLocationText.textContent = 'NUVOCAL Mentor Team';
            detailLocationLinks.innerHTML = `
                <div class="detail-mentor-grid">
                    ${mentorProfiles
                        .map(
                            (mentor) => `
                                ${
                                    mentor.detailUrl
                                        ? `<a class="detail-mentor-card detail-mentor-card-link" href="${mentor.detailUrl}">`
                                        : '<article class="detail-mentor-card">'
                                }
                                    <img class="detail-mentor-photo" src="${mentor.image}" alt="${mentor.name} 멘토">
                                    <h4 class="detail-mentor-name">${mentor.name}</h4>
                                    <p class="detail-mentor-role">보컬 코치</p>
                                    <p class="detail-mentor-desc">${mentor.desc}</p>
                                ${mentor.detailUrl ? '</a>' : '</article>'}
                            `
                        )
                        .join('')}
                </div>
            `;
            detailLocationPanel.classList.add('is-visible', 'is-mentor');
            detailLocationPanel.classList.remove('is-contact', 'is-private');
            detailLocationPanel.setAttribute('aria-hidden', 'false');
        } else if (isPrivateLessonCard) {
            if (detailLocationMap) {
                detailLocationMap.removeAttribute('src');
                detailLocationMap.classList.add('is-hidden');
            }
            detailLocationText.textContent =
                '누보컬] 서티파이드(Certified) 트레이너 1:1 맞춤형 보컬 트레이닝';
            detailLocationLinks.innerHTML = `
                <div class="detail-mentor-grid detail-private-grid">
                    ${privateLessonProfiles
                        .map(
                            (coach) => `
                                <article class="detail-mentor-card">
                                    <img class="detail-mentor-photo" src="${coach.image}" alt="${coach.name} 보컬 코치">
                                    <h4 class="detail-mentor-name">${coach.name}</h4>
                                    <p class="detail-mentor-role">보컬 코치</p>
                                    <p class="detail-mentor-desc">${coach.desc}</p>
                                </article>
                            `
                        )
                        .join('')}
                </div>
            `;
            detailLocationPanel.classList.add('is-visible', 'is-mentor', 'is-private');
            detailLocationPanel.classList.remove('is-contact');
            detailLocationPanel.setAttribute('aria-hidden', 'false');
        } else if (isLocationCard) {
            if (detailLocationMap) {
                detailLocationMap.src =
                    data.mapEmbed ||
                    'https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%EC%99%80%EC%9A%B0%EC%82%B0%EB%A1%9C%2018%EA%B8%B8%2012&output=embed';
                detailLocationMap.classList.remove('is-hidden');
            }
            detailLocationText.textContent = data.locationText || '누보컬 서울 마포구 와우산로 18길 12, 4층';

            const googleMapUrl =
                data.googleMapUrl ||
                'https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%EC%99%80%EC%9A%B0%EC%82%B0%EB%A1%9C%2018%EA%B8%B8%2012';
            const naverMapUrl =
                data.naverMapUrl ||
                'https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%EC%99%80%EC%9A%B0%EC%82%B0%EB%A1%9C%2018%EA%B8%B8%2012';

            let locationLinksHtml = `
                <a class="detail-link-chip" href="${googleMapUrl}" target="_blank" rel="noopener noreferrer">Google 지도</a>
                <a class="detail-link-chip" href="${naverMapUrl}" target="_blank" rel="noopener noreferrer">Naver 지도</a>
            `;

            detailLocationLinks.innerHTML = locationLinksHtml;
            detailLocationPanel.classList.add('is-visible');
            detailLocationPanel.classList.remove('is-contact', 'is-mentor', 'is-private');
            detailLocationPanel.setAttribute('aria-hidden', 'false');
        } else if (isContactCard && hasContactLinks) {
            if (detailLocationMap) {
                detailLocationMap.removeAttribute('src');
                detailLocationMap.classList.add('is-hidden');
            }
            detailLocationText.textContent = data.contactText || '누보컬 공식 채널';

            const instagramUrl = data.instagramUrl || 'https://www.instagram.com/nuvocal_/';
            const kakaoUrl = data.kakaoUrl || 'https://open.kakao.com/o/spwR12Rg';
            const youtubeUrl = data.youtubeUrl || 'https://www.youtube.com/@nuvocal';

            const contactLinksHtml = `
                <a class="detail-contact-link" href="${instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="누보컬 인스타그램">
                    <span class="detail-contact-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect>
                            <circle cx="12" cy="12" r="4.2"></circle>
                            <circle cx="17.3" cy="6.7" r="1.1"></circle>
                        </svg>
                    </span>
                    <span class="detail-contact-text">누보컬 인스타그램</span>
                </a>
                <a class="detail-contact-link" href="${kakaoUrl}" target="_blank" rel="noopener noreferrer" aria-label="카카오톡 연결하기">
                    <span class="detail-contact-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 3.2C6.7 3.2 2.5 6.6 2.5 10.7c0 2.8 1.9 5.2 4.6 6.5l-1 3.5 4-2.4c.6.1 1.2.1 1.9.1 5.3 0 9.5-3.4 9.5-7.7S17.3 3.2 12 3.2Z"></path>
                            <text x="12" y="13.6" text-anchor="middle" font-size="7.2" font-family="Arial, sans-serif" font-weight="700">K</text>
                        </svg>
                    </span>
                    <span class="detail-contact-text">카카오톡 연결하기</span>
                </a>
                <a class="detail-contact-link" href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" aria-label="누보컬 유튜브">
                    <span class="detail-contact-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="2.8" y="6.2" width="18.4" height="11.6" rx="3.6"></rect>
                            <path class="youtube-play" d="M10.2 9.5L15.3 12L10.2 14.5Z"></path>
                        </svg>
                    </span>
                    <span class="detail-contact-text">누보컬 유튜브</span>
                </a>
            `;

            detailLocationLinks.innerHTML = contactLinksHtml;
            detailLocationPanel.classList.add('is-visible', 'is-contact');
            detailLocationPanel.classList.remove('is-mentor', 'is-private');
            detailLocationPanel.setAttribute('aria-hidden', 'false');
        } else {
            if (detailLocationMap) {
                detailLocationMap.removeAttribute('src');
                detailLocationMap.classList.remove('is-hidden');
            }
            detailLocationText.textContent = '';
            detailLocationLinks.innerHTML = '';
            detailLocationPanel.classList.remove('is-visible', 'is-contact', 'is-mentor', 'is-private');
            detailLocationPanel.setAttribute('aria-hidden', 'true');
        }
    }
}

function clearDetailButtons() {
    if (detailActions) {
        detailActions.classList.add('is-hidden');
    }

    if (detailExploreBtn) {
        detailExploreBtn.textContent = '자세히 보기';
        detailExploreBtn.style.display = '';
    }

    if (detailApplyBtn) {
        detailApplyBtn.classList.remove('is-visible');
        detailApplyBtn.classList.remove('is-loading');
        detailApplyBtn.setAttribute('aria-busy', 'false');
        detailApplyBtn.removeAttribute('href');
        detailApplyBtn.textContent = '';
    }

    if (detailCompareTab) {
        detailCompareTab.classList.remove('is-visible');
        detailCompareTab.removeAttribute('href');
        detailCompareTab.textContent = '';
    }

    if (detailLocationPanel && detailLocationText && detailLocationLinks) {
        detailLocationPanel.classList.remove('is-visible', 'is-contact', 'is-mentor', 'is-private');
        detailLocationPanel.setAttribute('aria-hidden', 'true');
        detailLocationText.textContent = '';
        detailLocationLinks.innerHTML = '';
        if (detailLocationMap) {
            detailLocationMap.removeAttribute('src');
            detailLocationMap.classList.remove('is-hidden');
        }
    }

    clearDetailInfo();
}

function overlayLabelForCard(card) {
    const overlay = card?.el?.dataset.overlayLabel;
    if (overlay && overlay.trim()) return overlay;
    return card?.el?.dataset.title || 'PROJECT';
}

function overlayLabelNormalizedForCard(card) {
    return overlayLabelForCard(card).replace(/\|/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
}

function plainTextContent(input = '') {
    return input
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n[ \t]+/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();
}

function isLocationOrContactLabel(label = '') {
    const normalized = label.toUpperCase().trim();
    return (
        exploreDisabledLabels.has(normalized) ||
        normalized.includes('LOCATION') ||
        normalized.includes('CONTACT')
    );
}

function isLocationOrContactCard(card) {
    return isLocationOrContactLabel(overlayLabelNormalizedForCard(card));
}

function cardSupportsExplore(card) {
    return (
        Boolean(card) &&
        card?.el?.dataset.disableExplore !== 'true' &&
        !isLocationOrContactCard(card)
    );
}

function setupDetailInfo(card) {
    if (!detailInfoCard || !detailEyebrow || !detailHeading || !detailSummary) return;

    const data = card?.el?.dataset || {};
    const label = overlayLabelForCard(card).replace(/\|/g, ' ').replace(/\s+/g, ' ').trim();
    const normalized = overlayLabelNormalizedForCard(card);
    const isLocationCard = normalized.includes('LOCATION') || Boolean(data.mapEmbed);
    const isContactCard = normalized.includes('CONTACT') || data.contactMode === 'true';

    let eyebrow = data.subtitle || 'NUVOCAL CLASS';
    let heading = label || data.title || 'NUVOCAL';
    let summary = plainTextContent(data.desc || '');

    if (normalized === 'NUVOCAL') {
        eyebrow = '';
        heading = 'NUVOCAL';
        summary = `누보컬은 '잘 부르는 것'의 본질을 묻습니다.
화려한 기교보다 먼저,
목소리가 어떻게 만들어지는지,
감정이 어떻게 소리가 되는지,
그 근본부터 다시 쌓아 올립니다.
누보컬의 강사진은 무대 위에서 활동 중인 현역 뮤지션들입니다.
길구, 유다빈, Korean Soul, 그리고 K-POP 프로듀서와 가스펠 보컬리스트까지.
이들이 직접 가르칩니다. 이론이 아닌, 현장에서 검증된 언어로.
본질에 집중할 때, 목소리는 비로소 달라집니다.`;
    } else if (isLocationCard) {
        eyebrow = 'Location';
        heading = 'LOCATION';
        summary = data.locationText || '누보컬 서울 마포구 와우산로 18길 12, 4층';
    } else if (isContactCard) {
        eyebrow = 'Contact';
        heading = 'CONTACT';
        summary = data.contactText || '누보컬 공식 채널을 확인해보세요.';
    } else if (detailSummaryOverrides[normalized]) {
        summary = detailSummaryOverrides[normalized];
    }

    if (!summary) {
        summary = '누보컬 클래스를 자세히 확인해보세요.';
    }

    detailEyebrow.textContent = eyebrow;
    detailHeading.textContent = heading;
    detailSummary.textContent = summary;
    detailInfoCard.classList.toggle('is-compact', isLocationCard || isContactCard);
}

function clearDetailInfo() {
    if (!detailInfoCard || !detailEyebrow || !detailHeading || !detailSummary) return;
    detailEyebrow.textContent = '';
    detailHeading.textContent = '';
    detailSummary.textContent = '';
    detailInfoCard.classList.remove('is-compact');
}

function titleForExplore(card) {
    return overlayLabelNormalizedForCard(card).replace(/\+/g, ' + ');
}

function renderExploreLeftTitle(card) {
    if (!exploreLeftTitle) return;
    const rawLabel = overlayLabelForCard(card);
    const noWrap = card?.el?.dataset.overlayNowrap === 'true';
    const chunks = splitVerticalChunks(rawLabel, noWrap);
    exploreLeftTitle.innerHTML = '';
    chunks.forEach((chunk) => {
        const line = document.createElement('span');
        line.className = 'explore-left-line';
        line.textContent = chunk;
        exploreLeftTitle.appendChild(line);
    });
    exploreLeftTitle.classList.toggle('is-single-line', chunks.length <= 1);
}

function buildExplorePages(card) {
    const title = (card?.el?.dataset.title || '').toUpperCase();
    const overlayTitle = overlayLabelNormalizedForCard(card);
    const known = EXPLORE_PAGE_LIBRARY[overlayTitle] || EXPLORE_PAGE_LIBRARY[title];
    if (known?.length) return known.slice(0, 3);

    const fallbackImage =
        card?.el?.dataset.detailImage ||
        card?.img?.getAttribute('src') ||
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1800&auto=format&fit=crop';

    const subtitle = card?.el?.dataset.subtitle || `${overlayTitle || title} CLASS`;
    const desc = (card?.el?.dataset.desc || '프로젝트 상세 정보').replace(/<br\s*\/?>/gi, ' ');

    return [
        { title: subtitle, desc, image: fallbackImage, tone: 'light' },
        {
            title: `${overlayTitle || title} FLOW`,
            desc: '탐색, 분석, 실행의 단계로 프로젝트 리듬을 설계하는 중간 페이지.',
            image: fallbackImage,
            tone: 'dark',
        },
        {
            title: `${overlayTitle || title} OUTPUT`,
            desc: '결과물을 실전 컨텍스트에 연결해 완성도를 끌어올리는 마지막 페이지.',
            image: fallbackImage,
            tone: 'light',
        },
    ];
}

function renderExplorePages() {
    if (!explorePagesTrack || !exploreThumbs) return;

    explorePagesTrack.innerHTML = '';
    exploreThumbs.innerHTML = '';

    const activeOverlayLabel = overlayLabelNormalizedForCard(activeCard);
    const isNavcProMode = activeOverlayLabel === 'SOULFUL VOCAL';
    const projectText = `${titleForExplore(activeCard).replace(/\s+/g, ' ').toLowerCase()}.`;

    explorePages.forEach((page, index) => {
        const article = document.createElement('article');
        const isMentorPage = page.kind === 'mentor';
        const isNavcProPage = isNavcProMode;
        article.className = `explore-page ${page.tone === 'light' ? 'is-light' : ''} ${isMentorPage ? 'is-mentor' : ''} ${isNavcProPage ? 'is-navc-pro' : ''}`.trim();

        const content = document.createElement('div');
        content.className = `explore-page-content ${isMentorPage ? 'mentor-page-content' : ''} ${isNavcProPage ? 'pro-page-content' : ''}`.trim();

        const topline = document.createElement('div');
        topline.className = 'explore-page-topline';

        const topLeft = document.createElement('span');
        topLeft.textContent = projectText;

        const topRight = document.createElement('span');
        topRight.textContent = `${String(index + 1).padStart(2, '0')} / ${String(explorePages.length).padStart(2, '0')}`;

        topline.appendChild(topLeft);
        topline.appendChild(topRight);

        const headline = document.createElement('h3');
        headline.className = 'explore-page-headline';
        headline.textContent = page.title;

        const description = document.createElement('p');
        description.className = 'explore-page-desc';
        description.textContent = page.desc;

        content.appendChild(topline);
        content.appendChild(headline);
        if (!isMentorPage) {
            content.appendChild(description);
        }

        if (isNavcProPage && !isMentorPage) {
            const premiumPanel = document.createElement('section');
            premiumPanel.className = 'pro-philosophy-panel';

            const kicker = document.createElement('p');
            kicker.className = 'pro-kicker';
            kicker.textContent = page.proKicker || 'Philosophy';

            const signature = document.createElement('p');
            signature.className = 'pro-signature';
            signature.textContent = page.proSignature || '프로 레벨 가창은 구조에서 시작됩니다.';

            const pillars = document.createElement('div');
            pillars.className = 'pro-pillars';
            (Array.isArray(page.proPillars) ? page.proPillars : []).forEach((pillar) => {
                const chip = document.createElement('span');
                chip.className = 'pro-pillar-chip';
                chip.textContent = pillar;
                pillars.appendChild(chip);
            });

            const metric = document.createElement('div');
            metric.className = 'pro-metric';

            const metricLabel = document.createElement('span');
            metricLabel.className = 'pro-metric-label';
            metricLabel.textContent = page.proMetricLabel || 'PROGRAM';

            const metricValue = document.createElement('strong');
            metricValue.className = 'pro-metric-value';
            metricValue.textContent = page.proMetricValue || '12 WEEKS';

            metric.appendChild(metricLabel);
            metric.appendChild(metricValue);

            premiumPanel.appendChild(kicker);
            premiumPanel.appendChild(signature);
            if (pillars.childElementCount) premiumPanel.appendChild(pillars);
            premiumPanel.appendChild(metric);
            content.appendChild(premiumPanel);
        }

        if (!isMentorPage) {
            const image = document.createElement('img');
            image.className = 'explore-page-image';
            image.src = page.image;
            image.alt = page.title;
            article.appendChild(image);

            const overlay = document.createElement('div');
            overlay.className = 'explore-page-overlay';
            article.appendChild(overlay);
        } else {
            const mentorGrid = document.createElement('div');
            mentorGrid.className = 'mentor-grid';

            (page.mentors || []).forEach((mentor) => {
                const mentorCard = document.createElement(mentor.detailUrl ? 'a' : 'article');
                mentorCard.className = `mentor-card${mentor.detailUrl ? ' mentor-card-link' : ''}`;
                if (mentor.detailUrl) {
                    mentorCard.href = mentor.detailUrl;
                }

                const photo = document.createElement('img');
                photo.className = 'mentor-photo';
                photo.src = mentor.image;
                photo.alt = `${mentor.name} 멘토`;

                const name = document.createElement('h4');
                name.className = 'mentor-name';
                name.textContent = mentor.name;

                const role = document.createElement('p');
                role.className = 'mentor-role';
                role.textContent = '보컬 코치';

                const mentorDesc = document.createElement('p');
                mentorDesc.className = 'mentor-desc';
                mentorDesc.textContent = mentor.desc;

                mentorCard.appendChild(photo);
                mentorCard.appendChild(name);
                mentorCard.appendChild(role);
                mentorCard.appendChild(mentorDesc);
                mentorGrid.appendChild(mentorCard);
            });

            content.appendChild(mentorGrid);
        }

        article.appendChild(content);

        explorePagesTrack.appendChild(article);

        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'explore-thumb-btn';
        thumb.setAttribute('aria-label', `${index + 1}번 페이지`);
        thumb.innerHTML = `<img src="${page.image}" alt="">`;
        thumb.addEventListener('click', () => setExplorePage(index));
        exploreThumbs.appendChild(thumb);
    });
}

function updateExploreThumbs() {
    if (!exploreThumbs) return;
    exploreThumbs.querySelectorAll('.explore-thumb-btn').forEach((thumb, idx) => {
        thumb.classList.toggle('is-active', idx === exploreIndex);
    });
}

function setExplorePage(index, options = {}) {
    const { instant = false } = options;
    if (!isExploreOpen || !explorePagesTrack) return;

    const next = clamp(index, 0, explorePages.length - 1);
    if (!explorePages[next]) return;
    if (!instant && isExploreTransitioning) return;

    exploreIndex = next;
    updateExploreThumbs();

    const target = `translate3d(0, -${exploreIndex * 100}%, 0)`;
    if (instant) {
        explorePagesTrack.style.transition = 'none';
        explorePagesTrack.style.transform = target;
        explorePagesTrack.offsetHeight;
        explorePagesTrack.style.transition = '';
        isExploreTransitioning = false;
        return;
    }

    isExploreTransitioning = true;
    explorePagesTrack.style.transform = target;
    window.setTimeout(() => {
        isExploreTransitioning = false;
    }, 680);
}

function moveExplorePage(direction) {
    if (!isExploreOpen || isExploreTransitioning) return;
    const next = exploreIndex + direction;
    if (next < 0 || next > explorePages.length - 1) {
        closeExploreMode();
        return;
    }
    setExplorePage(next);
}

function openExploreMode() {
    if (!activeCard || !exploreMode || isExploreOpen || isDetailTransitioning) return;
    if (!cardSupportsExplore(activeCard)) return;

    explorePages = buildExplorePages(activeCard);
    renderExplorePages();
    exploreIndex = 0;
    exploreWheelAccum = 0;
    exploreTouchStartY = null;

    renderExploreLeftTitle(activeCard);

    const activeOverlayLabel = overlayLabelNormalizedForCard(activeCard);
    const isMentoDetail = activeOverlayLabel === 'MENTO';
    const isNavcProDetail = activeOverlayLabel === 'SOULFUL VOCAL';
    exploreMode.classList.toggle('is-mento-theme', isMentoDetail);
    exploreMode.classList.toggle('is-navc-pro-theme', isNavcProDetail);

    exploreMode.classList.add('is-active');
    exploreMode.setAttribute('aria-hidden', 'false');
    isExploreOpen = true;

    setExplorePage(0, { instant: true });
    updateExploreThumbs();

    if (detailContentContainer) {
        gsap.to(detailContentContainer, { opacity: 0, duration: 0.2, pointerEvents: 'none' });
    }
    if (closeBtn) {
        gsap.to(closeBtn, { opacity: 0, pointerEvents: 'none', duration: 0.2 });
    }

    detailWheelAccum = 0;
    detailTouchStartY = null;
}

function closeExploreMode(options = {}) {
    const { instant = false } = options;
    if (!isExploreOpen || !exploreMode) return;

    const cleanup = () => {
        exploreMode.classList.remove('is-active');
        exploreMode.classList.remove('is-mento-theme');
        exploreMode.classList.remove('is-navc-pro-theme');
        exploreMode.setAttribute('aria-hidden', 'true');
        explorePages = [];
        exploreIndex = 0;
        exploreWheelAccum = 0;
        exploreTouchStartY = null;
        isExploreTransitioning = false;

        if (explorePagesTrack) {
            explorePagesTrack.innerHTML = '';
            explorePagesTrack.style.transform = 'translate3d(0, 0, 0)';
        }
        if (exploreThumbs) {
            exploreThumbs.innerHTML = '';
        }
        if (exploreLeftTitle) {
            exploreLeftTitle.innerHTML = '';
            exploreLeftTitle.classList.remove('is-single-line');
        }

        isExploreOpen = false;
    };

    if (instant) {
        cleanup();
    } else {
        gsap.to(exploreMode, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                gsap.set(exploreMode, { clearProps: 'opacity' });
                cleanup();
            },
        });
    }

    if (detailContentContainer) {
        gsap.to(detailContentContainer, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.24,
            delay: 0.04,
        });
    }
    if (closeBtn) {
        gsap.to(closeBtn, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.24,
            delay: 0.04,
        });
    }
}

function openDetailAtIndex(index) {
    if (
        isDetailTransitioning &&
        !isDetailOpen &&
        !activeCard &&
        Date.now() - detailTransitionStartedAt > 1800
    ) {
        isDetailTransitioning = false;
        detailTransitionStartedAt = 0;
    }
    if (!isDetailOpen && detailView?.classList.contains('active')) {
        detailView.classList.remove('active', 'has-explore');
    }
    if (!isExploreOpen && exploreMode?.classList.contains('is-active')) {
        exploreMode.classList.remove('is-active', 'is-mento-theme', 'is-navc-pro-theme');
        exploreMode.setAttribute('aria-hidden', 'true');
    }
    if (isDetailOpen || isDetailTransitioning || !cards[index]) return;

    isDetailTransitioning = true;
    detailTransitionStartedAt = Date.now();
    isDetailOpen = true;
    detailWheelAccum = 0;
    detailTouchStartY = null;

    if (detailView) {
        detailView.classList.add('active');
    }

    syncActiveDetailCard(index, { animateStage: true, direction: 0 });

    if (lenis) lenis.stop();
    if (homeBtn) {
        gsap.to(homeBtn, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
    }

    gsap.to(cards.map((card) => card.el), {
        opacity: 0,
        duration: 0.42,
        ease: 'power2.out',
        overwrite: 'auto',
    });

    if (closeBtn) {
        gsap.to(closeBtn, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.4,
            delay: 0.34,
        });
    }

    window.setTimeout(() => {
        isDetailTransitioning = false;
        detailTransitionStartedAt = 0;
    }, 620);
}

function closeActiveDetail(options = {}) {
    const { force = false } = options;
    if (!activeCard) return;
    if (isDetailTransitioning && !force) return;

    if (isExploreOpen) {
        closeExploreMode({ instant: true });
    }

    isDetailTransitioning = true;
    detailTransitionStartedAt = Date.now();

    if (closeBtn) {
        gsap.to(closeBtn, { opacity: 0, pointerEvents: 'none', duration: 0.25 });
    }
    if (homeBtn) {
        gsap.to(homeBtn, { opacity: 1, pointerEvents: 'auto', duration: 0.3, delay: 0.45 });
    }

    clearDetailButtons();
    clearDetailStage();
    hideDetailTitleOverlay({ instant: true });

    document.body.style.backgroundColor = '#111';

    gsap.to(
        cards.map((entry) => entry.el),
        {
            opacity: 1,
            duration: 0.58,
            delay: 0.12,
            ease: 'power2.inOut',
            onComplete: () => {
                activeCard = null;
                activeCardIndex = -1;
                isDetailOpen = false;
                isDetailTransitioning = false;
                detailTransitionStartedAt = 0;
                if (detailView) {
                    detailView.classList.remove('active', 'has-explore');
                }
                if (lenis) lenis.start();
            },
        }
    );
}

cards.forEach((card) => {
    card.el.addEventListener('click', () => {
        activateCard(card);
    });
});

document.addEventListener(
    'click',
    (event) => {
        activateCard(findCardEntryFromElement(event.target));
    },
    { capture: true }
);

let pendingPointerCard = null;
let pendingPointerX = 0;
let pendingPointerY = 0;
let pendingPointerAt = 0;

document.addEventListener(
    'pointerdown',
    (event) => {
        if (event.button !== 0) return;
        const card = findCardEntryFromElement(event.target);
        if (!card) return;
        pendingPointerCard = card;
        pendingPointerX = event.clientX;
        pendingPointerY = event.clientY;
        pendingPointerAt = Date.now();
    },
    { capture: true }
);

document.addEventListener(
    'pointerup',
    (event) => {
        if (event.button !== 0) return;
        if (!pendingPointerCard) return;
        const elapsed = Date.now() - pendingPointerAt;
        const move = Math.hypot(event.clientX - pendingPointerX, event.clientY - pendingPointerY);
        const releasedCard = findCardEntryFromElement(event.target);
        const shouldOpen =
            releasedCard &&
            releasedCard.el === pendingPointerCard.el &&
            elapsed < 900 &&
            move < 18;
        const cardToOpen = shouldOpen ? pendingPointerCard : null;
        pendingPointerCard = null;
        if (!cardToOpen) return;
        activateCard(cardToOpen);
    },
    { capture: true }
);

document.addEventListener(
    'pointercancel',
    () => {
        pendingPointerCard = null;
    },
    { capture: true }
);

if (detailExploreBtn) {
    detailExploreBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openExploreMode();
    });
}

if (detailApplyBtn) {
    detailApplyBtn.addEventListener('click', async (event) => {
        if (!activeCard) return;
        const applyUrl = activeCard.el.dataset.applyUrl;
        if (!applyUrl) return;
        event.preventDefault();
        event.stopPropagation();
        await startPortOnePaymentForCard(activeCard);
    });
}

if (detailPrevCard) {
    detailPrevCard.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigateDetail(-1);
    });
}

if (detailNextCard) {
    detailNextCard.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigateDetail(1);
    });
}

if (detailPrevArrow) {
    detailPrevArrow.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigateDetail(-1);
    });
}

if (detailNextArrow) {
    detailNextArrow.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigateDetail(1);
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        closeActiveDetail({ force: true });
    });
}

if (exploreMode) {
    exploreMode.addEventListener(
        'wheel',
        (event) => {
            if (!isExploreOpen) return;
            event.preventDefault();
            if (isExploreTransitioning) return;

            exploreWheelAccum += event.deltaY;
            if (Math.abs(exploreWheelAccum) < 70) return;

            const direction = exploreWheelAccum > 0 ? 1 : -1;
            exploreWheelAccum = 0;
            moveExplorePage(direction);
        },
        { passive: false }
    );

    exploreMode.addEventListener(
        'touchstart',
        (event) => {
            if (!isExploreOpen || !event.touches[0]) return;
            exploreTouchStartY = event.touches[0].clientY;
        },
        { passive: true }
    );

    exploreMode.addEventListener(
        'touchmove',
        (event) => {
            if (!isExploreOpen || exploreTouchStartY === null || !event.touches[0]) return;
            event.preventDefault();
            if (isExploreTransitioning) return;

            const currentY = event.touches[0].clientY;
            const deltaY = exploreTouchStartY - currentY;
            if (Math.abs(deltaY) < 42) return;

            exploreTouchStartY = currentY;
            moveExplorePage(deltaY > 0 ? 1 : -1);
        },
        { passive: false }
    );

    exploreMode.addEventListener('touchend', () => {
        exploreTouchStartY = null;
    });
}

if (exploreStage) {
    exploreStage.addEventListener('click', (event) => {
        if (!isExploreOpen || isExploreTransitioning) return;
        if (event.target.closest('.explore-thumb-btn')) return;
        if (event.target.closest('a')) return;
        moveExplorePage(1);
    });
}

if (detailView) {
    detailView.addEventListener('click', (event) => {
        if (!isDetailOpen) {
            detailView.classList.remove('active', 'has-explore');
            return;
        }
        if (isExploreOpen || isDetailTransitioning) return;
        if (event.target.closest('.detail-stage')) return;
        if (event.target.closest('.detail-content-container')) return;
        if (event.target.closest('.detail-actions')) return;
        if (event.target.closest('.detail-location-panel')) return;
        closeActiveDetail({ force: true });
    });
}

if (detailView) {
    detailView.addEventListener(
        'wheel',
        (event) => {
            if (!isDetailOpen || isExploreOpen) return;
            if (!cardSupportsExplore(activeCard)) return;
            event.preventDefault();
            if (isDetailTransitioning) return;

            detailWheelAccum += event.deltaY;
            if (Math.abs(detailWheelAccum) < 60) return;
            detailWheelAccum = 0;
            openExploreMode();
        },
        { passive: false }
    );

    detailView.addEventListener(
        'touchstart',
        (event) => {
            if (!isDetailOpen || isExploreOpen || !event.touches[0]) return;
            if (!cardSupportsExplore(activeCard)) return;
            detailTouchStartY = event.touches[0].clientY;
        },
        { passive: true }
    );

    detailView.addEventListener(
        'touchmove',
        (event) => {
            if (!isDetailOpen || isExploreOpen || detailTouchStartY === null || !event.touches[0]) return;
            if (!cardSupportsExplore(activeCard)) return;
            event.preventDefault();
            if (isDetailTransitioning) return;

            const currentY = event.touches[0].clientY;
            const deltaY = detailTouchStartY - currentY;
            if (Math.abs(deltaY) < 36) return;

            detailTouchStartY = null;
            openExploreMode();
        },
        { passive: false }
    );

    detailView.addEventListener('touchend', () => {
        detailTouchStartY = null;
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && isDetailOpen && !isExploreOpen) {
        navigateDetail(-1);
        return;
    }

    if (event.key === 'ArrowRight' && isDetailOpen && !isExploreOpen) {
        navigateDetail(1);
        return;
    }

    if (event.key !== 'Escape') return;

    if (isExploreOpen) {
        closeExploreMode();
        return;
    }

    if (isDetailOpen) {
        closeActiveDetail({ force: true });
    }
});
