/* ============================================================
   Aurum Sports Management — data.js
   All site content inlined. No fetch, no server needed.

   TO ADD A NEW PLAYER:
   1. Add a new object to the PLAYERS array below
   2. That's it. The roster, player page, modal, sponsors
      all update automatically. No other files needed.
   ============================================================ */

const SETTINGS = {
  site: {
    name: "Aurum Sports Management",
    tagline: {
      en: "Elevating Champions on the World Stage",
      ko: "세계 무대에서 챔피언을 만들다",
    },
  },
  contact: {
    email: "Sophia@aurumsm.com",
    phone: "949.378.7555",
    location: { en: "Dallas, Texas, USA", ko: "미국 텍사스주 댈러스" },
    // Set to "/api/contact" once the Vercel function is deployed and
    // RESEND_API_KEY is added to Vercel Environment Variables.
    formEndpoint: "/api/contact",
  },
  agent: {
    name: "Sophia Lee",
    title: {
      en: "Founder & Lead Sports Agent",
      ko: "창업자 겸 수석 스포츠 에이전트",
    },
    photo: "images/sophia-lee.jpg",
    intro: {
      en: "From Dallas, Texas, Sophia is the founder and lead sports agent at Aurum Sports Management. With a deep understanding of the golf industry and a passion for helping athletes succeed, she combines business expertise with a personal commitment to each client's success.",
      ko: "텍사스주 댈러스 출신의 소피아 리는 Aurum Sports Management의 창업자이자 수석 스포츠 에이전트입니다. 골프 산업에 대한 깊은 이해와 선수들의 성공을 돕고자 하는 열정으로 비즈니스 전문성과 고객 헌신을 결합합니다.",
    },
    approach: {
      en: "Sophia believes in building relationships founded on trust, transparency, and long-term vision. Every athlete receives a tailored strategy that aligns with their goals.",
      ko: "소피아는 신뢰, 투명성, 장기적 비전을 바탕으로 한 관계 구축을 믿습니다. 모든 선수는 자신의 목표에 맞는 맞춤형 전략을 받습니다.",
    },
    credentials: {
      en: [
        "LPGA Expert",
        "Sponsorship Acquisition",
        "P-1 Visa Coordination",
        "Korea–US Market",
        "Dallas, Texas",
      ],
      ko: [
        "LPGA 전문가",
        "스폰서십 확보",
        "P-1 비자",
        "한미 시장",
        "텍사스주 댈러스",
      ],
    },
  },
  mission: {
    tagline: {
      en: "We empower athletes and elevate careers through expert guidance, strategic opportunities, and unwavering support.",
      ko: "전문적인 지도, 전략적 기회, 변함없는 지원을 통해 선수들에게 힘을 실어주고 커리어를 높입니다.",
    },
    service: {
      en: "We provide representation and career management for professional golfers. Our services include contract negotiation, sponsorship acquisition, brand development, and media relations. We also offer performance support and travel coordination, ensuring our athletes have the resources and opportunities they need to succeed.",
      ko: "프로 골퍼를 위한 대리 및 커리어 관리를 제공합니다. 계약 협상, 스폰서십 확보, 브랜드 개발, 미디어 관계 서비스를 제공합니다. 또한 퍼포먼스 지원과 여행 조율로 선수들이 성공에 필요한 자원과 기회를 갖출 수 있도록 합니다.",
    },
    missionStatement: {
      en: "At Aurum Sports Management, we are dedicated to guiding athletes through their professional journey. We strive to secure opportunities that maximize competitive success, build lasting brand value, and ensure long-term stability.",
      ko: "Aurum Sports Management에서 우리는 선수들의 프로 여정을 안내하는 데 헌신합니다. 경쟁적 성공을 극대화하고 지속적인 브랜드 가치를 구축하며 장기적 안정을 보장하는 기회를 확보하기 위해 노력합니다.",
    },
    values: [
      {
        name: { en: "Partnership", ko: "파트너십" },
        desc: {
          en: "We build lasting, trusted relationships with athletes, sponsors, and the golf community.",
          ko: "선수, 스폰서, 골프 커뮤니티와 지속적이고 신뢰할 수 있는 관계를 구축합니다.",
        },
      },
      {
        name: { en: "Excellence", ko: "탁월함" },
        desc: {
          en: "We push for the highest performance, from our athletes and ourselves.",
          ko: "선수와 우리 자신 모두에게서 최고의 퍼포먼스를 추구합니다.",
        },
      },
      {
        name: { en: "Commitment", ko: "헌신" },
        desc: {
          en: "We are dedicated to supporting our athletes through every stage of their careers and beyond.",
          ko: "선수들의 커리어 모든 단계와 그 이후에도 지원하는 데 헌신합니다.",
        },
      },
    ],
  },
  recentWin: {
    active: true,
    message: {
      en: "🏆  Mi Hyang Lee wins Blue Bay LPGA 2026 — Aurum's latest Tour victory",
      ko: "🏆  이미향, 2026 LPGA Blue Bay 우승 — Aurum 소속 최근 투어 우승",
    },
  },
  social: { instagram: "https://www.instagram.com/aurumsm" },
  decks: {
    elitePackage: "public/decks/elite-golf-support-package.pdf",
  },
};

/* ============================================================
   PLAYERS — Roster Management
   ─────────────────────────────────────────────────────────────
   Each object is one player. Adding/editing here automatically
   updates the roster grid, sponsor page, player profile,
   modal, and hero stats. No other files need to change.

   ROSTER CONTROL FLAGS:
   ─────────────────────
   show: true    → visible on site (default if omitted)
   show: false   → hidden everywhere on site; the direct
                   /player.html#/player/<id> URL still works
                   (useful for drafts or temporarily inactive)
   active: true  → counts toward the "X Athletes" hero stat
   featured: true → reserved for future ordering / badge use
   recentWin: true → shows 🏆 tag on the player card

   QUICK ACTIONS:
   ──────────────
   Hide a player:   set  show: false
   Remove for good: delete the entire object
   Add a player:    copy any block below, update all fields

   displayStats: array of { label, value } pairs — fully
   data-driven. Add any stat with any label; the template
   loops over it automatically.
   ============================================================ */
const PLAYERS = [
  {
    id: "mi-hyang-lee",
    show: true,
    active: true,
    featured: true,
    recentWin: true,
    deck: "public/decks/mi-hyang-lee-sponsorship-deck.pdf",
    name: { en: "Mi Hyang Lee", ko: "이미향" },
    nationality: { en: "South Korean", ko: "대한민국" },
    flag: "🇰🇷",
    birthplace: { en: "South Korea", ko: "대한민국" },
    dob: "March 30, 1993",
    tour: "LPGA",
    photo: "images/players/mi-hyang-lee.jpg",
    bio: {
      en: "Mi Hyang Lee is one of the most decorated players on the LPGA Tour. Since turning professional in 2011 and joining the LPGA in 2012, she has built a remarkable career with 3 LPGA wins and over 30 top-10 finishes. In March 2026 she dramatically claimed victory at the Blue Bay LPGA — her first title in eight years.",
      ko: "이미향은 LPGA 투어에서 가장 주목받는 선수 중 한 명입니다. 2011년 프로 전향 후 2012년 LPGA에 합류해 3승과 30회 이상의 톱10 피니시를 기록했습니다. 2026년 3월 Blue Bay LPGA에서 8년 만에 투어 정상에 복귀했습니다.",
    },
    displayStats: [
      { label: { en: "CME Rank", ko: "CME 랭킹" }, value: "#4" },
      { label: { en: "Rolex Rank", ko: "롤렉스 랭킹" }, value: "#60" },
      { label: { en: "Career Wins", ko: "통산 승" }, value: "3" },
      { label: { en: "Top 10s", ko: "톱10 피니시" }, value: "30+" },
    ],
    highlights: {
      en: [
        "Won Blue Bay LPGA 2026 — 3rd career LPGA title",
        "CME Group Tour Ranking: #4",
        "Rolex World Ranking: #60",
        "30+ career top-10 finishes",
        "LPGA member since 2012",
      ],
      ko: [
        "2026 LPGA Blue Bay 우승 — 통산 3번째 LPGA 우승",
        "CME 그룹 투어 랭킹: 4위",
        "롤렉스 세계 랭킹: 60위",
        "통산 톱10 30회 이상",
        "2012년부터 LPGA 투어 활동",
      ],
    },
    results: [
      { year: 2026, tour: "LPGA", event: "Blue Bay LPGA", result: "Winner" },
      {
        year: 2025,
        tour: "LPGA",
        event: "ISPS HANDA World Invitational",
        result: "T8",
      },
      { year: 2025, tour: "LPGA", event: "Dow Championship", result: "T10" },
      { year: 2025, tour: "LPGA", event: "Ford Championship", result: "T6" },
      { year: 2024, tour: "LPGA", event: "Ford Championship", result: "3rd" },
      {
        year: 2024,
        tour: "LPGA",
        event: "HSBC Womens World Championship",
        result: "3rd",
      },
      {
        year: 2023,
        tour: "LPGA",
        event: "Kroger Queen City Championship",
        result: "T5",
      },
      {
        year: 2022,
        tour: "LPGA",
        event: "Epson Tour French Lick Classic",
        result: "T6",
      },
    ],
    sponsorship: {
      marketReach: {
        en: ["South Korea", "Japan", "China", "USA", "Global LPGA broadcast"],
        ko: ["대한민국", "일본", "중국", "미국", "글로벌 LPGA 방송"],
      },
      categories: {
        en: ["Apparel", "Equipment", "Lifestyle", "Finance", "Beauty"],
        ko: ["의류", "장비", "라이프스타일", "금융", "뷰티"],
      },
    },
  },
  {
    id: "alicia-joo",
    show: true,
    active: true,
    featured: true,
    recentWin: false,
    deck: "public/decks/alicia-joo-sponsorship-deck.pdf",
    name: { en: "Soo Bin (Alicia) Joo", ko: "주수빈" },
    nationality: { en: "Korean-American", ko: "재미교포" },
    flag: "🇺🇸🇰🇷",
    birthplace: { en: "Los Angeles, California", ko: "미국 로스앤젤레스" },
    dob: "May 28, 2004",
    tour: "LPGA",
    photo: "images/players/alicia-joo.jpg",
    bio: {
      en: "Born in Los Angeles on May 28, 2004, Soo Bin 'Alicia' Joo is one of the youngest and most exciting players on the LPGA Tour. Fluent in both Korean and English and holding dual citizenship, she bridges both markets perfectly. In 2024 she won the Epson Island Resort Championship and earned her full 2025 LPGA card.",
      ko: "2004년 5월 28일 로스앤젤레스에서 태어난 주수빈(알리시아)은 LPGA 투어에서 가장 젊고 주목받는 선수 중 한 명입니다. 한국어·영어 모두 유창하며 이중 시민권 보유로 양 시장을 완벽히 연결합니다. 2024년 Epson Island Resort Championship 우승 후 2025 LPGA 풀 카드를 획득했습니다.",
    },
    displayStats: [
      { label: { en: "CME Rank", ko: "CME 랭킹" }, value: "#92" },
      { label: { en: "Career Wins", ko: "통산 승" }, value: "1" },
      { label: { en: "Top 25 Finishes", ko: "톱25 피니시" }, value: "4" },
      { label: { en: "Driving Distance", ko: "드라이빙 거리" }, value: "268y" },
    ],
    highlights: {
      en: [
        "2024 Epson Island Resort Championship — Winner",
        "2022 U.S. Women's Open Sectional Qualifying (Korea) — Winner",
        "Dual US & Korean citizenship · Bilingual (EN/KO)",
        "4 Top-25 LPGA finishes",
        "CME Ranking: #92",
      ],
      ko: [
        "2024 Epson Island Resort Championship 우승",
        "2022 US 여자오픈 섹셔널 퀄리파잉 (한국) 우승",
        "미국·한국 이중 시민권 · 한영 이중언어",
        "LPGA 톱25 피니시 4회",
        "CME 랭킹: 92위",
      ],
    },
    results: [
      {
        year: 2025,
        tour: "LPGA",
        event: "ISPS Handa Women's Scottish Open",
        result: "T16",
      },
      {
        year: 2025,
        tour: "LPGA",
        event: "ShopRite LPGA Classic",
        result: "T20",
      },
      {
        year: 2024,
        tour: "Epson",
        event: "Island Resort Championship",
        result: "Winner",
      },
      {
        year: 2024,
        tour: "LPGA",
        event: "LPGA Q-School — Earned 2025 Card",
        result: "T13",
      },
      {
        year: 2023,
        tour: "LPGA",
        event: "ISPS Handa World Invitational",
        result: "16th",
      },
      {
        year: 2023,
        tour: "LPGA",
        event: "ShopRite LPGA Classic",
        result: "6th",
      },
      {
        year: 2022,
        tour: "USGA",
        event: "U.S. Women's Open Sectional Qualifying",
        result: "Winner",
      },
    ],
    sponsorship: {
      marketReach: {
        en: ["South Korea", "USA", "Korean-American community"],
        ko: ["대한민국", "미국", "재미교포 커뮤니티"],
      },
      categories: {
        en: ["Apparel", "Equipment", "Youth brands", "Technology", "Lifestyle"],
        ko: ["의류", "장비", "청년 브랜드", "테크", "라이프스타일"],
      },
    },
  },
  {
    id: "kumkang-park",
    show: false,
    active: true,
    featured: true,
    recentWin: false,
    deck: "public/decks/kumkang-park-sponsorship-deck.pdf",
    name: { en: "Kumkang Park", ko: "박금강" },
    nationality: { en: "South Korean", ko: "대한민국" },
    flag: "🇰🇷",
    birthplace: { en: "Seoul, South Korea", ko: "서울, 대한민국" },
    dob: "April 2001",
    tour: "LPGA",
    photo: "images/players/kumkang-park.jpg",
    bio: {
      en: "Kumkang Park is an aggressive, physically gifted golfer and a true icon of next-generation LPGA talent. Born in Seoul in April 2001, she won the prestigious Avondale Amateur in Australia before turning professional. She won in her Symetra Tour debut year and has secured full LPGA cards multiple times — featured across major Korean sports media.",
      ko: "박금강은 뛰어난 신체 조건과 공격적인 플레이로 주목받는 차세대 LPGA의 도전 아이콘입니다. 2001년 4월 서울 출생으로 호주 Avondale Amateur에서 우승한 후 프로로 전향했습니다. Symetra Tour 데뷔 첫 해 우승 후 LPGA 풀시드를 여러 차례 확보했습니다.",
    },
    displayStats: [
      { label: { en: "Career Wins", ko: "통산 승" }, value: "4" },
      { label: { en: "2024 Cut Rate", ko: "2024 컷 통과율" }, value: "84.2%" },
      { label: { en: "Epson Rank", ko: "Epson 상금 순위" }, value: "#29" },
      { label: { en: "LPGA Cards", ko: "LPGA 풀시드" }, value: "3×" },
    ],
    highlights: {
      en: [
        "2025 LPGA Tour full card secured",
        "2022 LPGA Florida's Natural Charity Classic — Winner",
        "2021 Symetra Tour Murphy USA El Dorado Shootout — Winner",
        "2019 Avondale Amateur (Australia) — Winner",
        "2018 South Korea National Golf Team",
      ],
      ko: [
        "2025년 LPGA 1부투어 풀시드 확보",
        "2022 LPGA Florida's Natural Charity Classic 우승",
        "2021 Symetra Tour Murphy USA El Dorado Shootout 우승",
        "2019 호주 Avondale Amateur 우승",
        "2018년 대한민국 골프 국가대표 상비군",
      ],
    },
    results: [
      { year: 2025, tour: "LPGA", event: "Dow Championship", result: "14th" },
      {
        year: 2025,
        tour: "LPGA",
        event: "ShopRite LPGA Classic",
        result: "11th",
      },
      { year: 2024, tour: "Epson", event: "IOA Championship", result: "8th" },
      { year: 2024, tour: "Epson", event: "IOA Golf Classic", result: "3rd" },
      { year: 2022, tour: "LPGA", event: "Qualifying Series", result: "9th" },
      {
        year: 2022,
        tour: "Symetra",
        event: "Florida's Natural Charity Classic",
        result: "Winner",
      },
      {
        year: 2021,
        tour: "Symetra",
        event: "Murphy USA El Dorado Shootout",
        result: "Winner",
      },
      {
        year: 2019,
        tour: "Amateur",
        event: "The Avondale Amateur — Australia",
        result: "Winner",
      },
    ],
    sponsorship: {
      marketReach: {
        en: ["South Korea", "Japan", "Australia"],
        ko: ["대한민국", "일본", "호주"],
      },
      categories: {
        en: ["Apparel", "Equipment", "Sports nutrition", "Finance"],
        ko: ["의류", "장비", "스포츠 영양", "금융"],
      },
    },
  },
  {
    id: "robyn-choi",
    show: true,
    active: true,
    featured: true,
    recentWin: false,
    deck: "public/decks/robyn-choi-sponsorship-deck.docx",
    name: { en: "Robyn Choi", ko: "로빈 최" },
    nationality: { en: "Australian (Korean heritage)", ko: "호주 (한국계)" },
    flag: "🇦🇺",
    birthplace: { en: "Sydney, Australia", ko: "호주 시드니" },
    dob: "March 17, 1998",
    college: "University of Colorado Boulder",
    tour: "LPGA",
    photo: "images/players/robyn-choi.jpg",
    bio: {
      en: "Robyn Choi is a highly consistent LPGA Tour player born in Sydney to Korean parents. A University of Colorado Boulder graduate, she earned her LPGA card in 2023 as the Q-Series Medalist — finishing 1st overall. Since joining full-time she has built an impressive record of top-10 and top-20 finishes across major events.",
      ko: "로빈 최는 한국계 호주인으로 시드니 출생의 안정적인 LPGA 투어 선수입니다. 콜로라도 볼더 대학교를 졸업한 그녀는 2023년 Q-시리즈 메달리스트(전체 1위)로 LPGA 카드를 획득했습니다.",
    },
    displayStats: [
      { label: { en: "CME Rank", ko: "CME 랭킹" }, value: "#67" },
      { label: { en: "Career Wins", ko: "통산 승" }, value: "1" },
      { label: { en: "Q-Series", ko: "Q-시리즈" }, value: "Medalist" },
      { label: { en: "College", ko: "대학교" }, value: "CU Boulder" },
    ],
    highlights: {
      en: [
        "2023 LPGA Q-Series — Medalist (1st Overall)",
        "2023 Women's Professional Sandbelt Invitational — Winner",
        "CME Ranking: #67",
        "University of Colorado Boulder graduate",
        "Born in Sydney to Korean parents",
      ],
      ko: [
        "2023 LPGA Q-시리즈 메달리스트 (전체 1위)",
        "2023 Women's Professional Sandbelt Invitational 우승",
        "CME 랭킹: 67위",
        "미국 콜로라도 볼더 대학교 졸업",
        "한국계 호주인 — 시드니 출생",
      ],
    },
    results: [
      { year: 2025, tour: "LPGA", event: "Walmart Championship", result: "T9" },
      {
        year: 2025,
        tour: "LPGA",
        event: "ShopRite LPGA Classic",
        result: "T11",
      },
      {
        year: 2025,
        tour: "LPGA",
        event: "Mexico Riviera Maya Open",
        result: "T9",
      },
      { year: 2025, tour: "LPGA", event: "CPKC Women's Open", result: "T15" },
      {
        year: 2025,
        tour: "LPGA",
        event: "BMW Ladies Championship",
        result: "T16",
      },
      { year: 2024, tour: "LPGA", event: "FM Championship", result: "T25" },
      {
        year: 2024,
        tour: "LPGA",
        event: "LPGA Drive On Championship",
        result: "T16",
      },
      { year: 2023, tour: "LPGA", event: "LPGA Q-Series", result: "1st" },
      {
        year: 2023,
        tour: "Other",
        event: "Women's Professional Sandbelt Invitational",
        result: "Winner",
      },
    ],
    sponsorship: {
      marketReach: {
        en: ["Australia", "USA", "South Korea", "Global LPGA broadcast"],
        ko: ["호주", "미국", "대한민국", "글로벌 LPGA 방송"],
      },
      categories: {
        en: ["Apparel", "Equipment", "Lifestyle", "Finance"],
        ko: ["의류", "장비", "라이프스타일", "금융"],
      },
    },
  },

  /*
  ── HOW TO ADD A NEW PLAYER ──────────────────────────────────
  Copy the block below as a starting template, fill in all
  fields, set show: true, and save. The player automatically
  appears everywhere on the site. No other files need to change.

  {
    id: "player-url-slug",       // lowercase, hyphens, URL-safe
    show: true,                  // false = hidden on site
    active: true,                // true = counts in hero stat
    featured: true,
    recentWin: false,            // true = shows 🏆 tag on card
    deck: "",                    // path to PDF or leave empty
    name:        { en: "", ko: "" },
    nationality: { en: "", ko: "" },
    flag: "🇰🇷",
    birthplace:  { en: "", ko: "" },
    dob: "",
    tour: "LPGA",
    photo: "images/players/<filename>.jpg",
    bio:         { en: "", ko: "" },
    displayStats: [
      { label: { en: "", ko: "" }, value: "" },
    ],
    highlights: { en: [], ko: [] },
    results: [
      { year: 2025, tour: "LPGA", event: "", result: "" },
    ],
    sponsorship: {
      marketReach: { en: [], ko: [] },
      categories:  { en: [], ko: [] },
    },
  }
  ─────────────────────────────────────────────────────────── */
];

const SERVICES = {
  representation: [
    {
      id: "tour",
      icon: "📋",
      title: { en: "Tour & Contract Management", ko: "투어 및 계약 관리" },
      description: {
        en: "Negotiating playing opportunities, tournament entries, and securing favorable contract terms for our athletes.",
        ko: "출전 기회 확보, 대회 등록, 유리한 계약 조건 협상을 대행합니다.",
      },
    },
    {
      id: "sponsorship",
      icon: "🤝",
      title: { en: "Sponsorship Acquisition", ko: "스폰서십 확보" },
      description: {
        en: "Connecting athletes with sponsors across equipment, apparel, lifestyle and Korean-market brands seeking LPGA visibility.",
        ko: "골프 장비, 의류, 라이프스타일 브랜드와 선수를 연결합니다.",
      },
    },
    {
      id: "visa",
      icon: "🛂",
      title: { en: "P-1 Visa Services", ko: "P-1 비자 서비스" },
      featured: true,
      description: {
        en: "We work directly with licensed immigration attorneys to secure P-1 athlete visas — handling paperwork, timelines, and renewals.",
        ko: "전문 이민 변호사와 협력하여 P-1 선수 비자를 신청합니다. 서류 준비부터 갱신까지 처리합니다.",
      },
    },
    {
      id: "brand",
      icon: "📱",
      title: { en: "Brand & Media Development", ko: "브랜드 및 미디어 관리" },
      description: {
        en: "Social media strategy, PR support, and brand building for both Korean and US audiences.",
        ko: "SNS 전략, PR 지원, 한국·미국 양 시장을 겨냥한 브랜드 구축.",
      },
    },
    {
      id: "performance",
      icon: "⛳",
      title: { en: "Performance Support", ko: "퍼포먼스 지원" },
      description: {
        en: "Performance support and travel coordination, ensuring our athletes have the resources and opportunities they need to succeed.",
        ko: "퍼포먼스 지원과 여행 조율로 선수들이 성공에 필요한 자원과 기회를 갖출 수 있도록 합니다.",
      },
    },
    {
      id: "korea-us",
      icon: "🇰🇷",
      title: { en: "Korea–US Market Bridge", ko: "한미 시장 브릿지" },
      description: {
        en: "Bringing Korean golf talent to LPGA and creating opportunities for Korean brands entering the US market.",
        ko: "한국 선수의 LPGA 진출과 한국 브랜드의 미국 시장 진입을 동시에 지원합니다.",
      },
    },
  ],
  elitePackage: {
    title: {
      en: "Elite Golf Support — Core Package",
      ko: "엘리트 골프 서포트 — 코어 패키지",
    },
    tagline: {
      en: "Focus on Your Game. Leave the Logistics to Us.",
      ko: "골프에만 집중하세요. 나머지는 저희가 처리합니다.",
    },
    services: [
      {
        icon: "🗓️",
        title: {
          en: "Tournament Scheduling & Registration",
          ko: "대회 일정 및 등록",
        },
        items: {
          en: [
            "Seamless entry management and confirmations",
            "Personalized tournament calendar",
          ],
          ko: ["원활한 참가 신청 관리 및 확인", "개인 맞춤형 대회 캘린더"],
        },
      },
      {
        icon: "✈️",
        title: { en: "Travel Arrangements", ko: "여행 준비" },
        items: {
          en: [
            "Domestic & international flight bookings",
            "Ground transportation: limo, shuttle, rental car",
            "Airport transfers & local travel",
          ],
          ko: [
            "국내외 항공권 예약",
            "지상 교통: 리무진, 셔틀, 렌터카",
            "공항 픽업 및 현지 이동 조율",
          ],
        },
      },
      {
        icon: "🏨",
        title: { en: "Accommodation Booking", ko: "숙소 예약" },
        items: {
          en: [
            "Hotels or serviced apartments near venues",
            "Competitive rates tailored to preferences",
          ],
          ko: [
            "대회장 인근 호텔 또는 서비스 아파트",
            "개인 선호에 맞는 경쟁력 있는 요금",
          ],
        },
      },
      {
        icon: "🏌️",
        title: {
          en: "Equipment & Shipping Logistics",
          ko: "장비 및 배송 물류",
        },
        items: {
          en: [
            "Shipping & receiving of golf gear",
            "Coordination with trusted shipping providers",
          ],
          ko: ["골프 장비 발송 및 수령", "신뢰할 수 있는 배송 업체 조율"],
        },
      },
      {
        icon: "🏥",
        title: { en: "Medical & Wellness Support", ko: "의료 및 웰니스 지원" },
        items: {
          en: ["Health, wellness, and emergency assistance"],
          ko: ["건강, 웰니스 및 응급 지원"],
        },
      },
      {
        icon: "🎯",
        title: { en: "On-Site Support", ko: "현장 지원" },
        items: {
          en: [
            "Tournament registration & check-in",
            "Event-day coordination & shuttle logistics",
          ],
          ko: ["대회 등록 및 체크인 완료", "대회 당일 조율 및 셔틀 물류"],
        },
      },
    ],
    addOns: {
      en: [
        "Tax preparation support",
        "Personal caddy or support staff",
        "Media and sponsorship management",
      ],
      ko: [
        "세금 신고 지원",
        "개인 캐디 또는 지원 스태프",
        "미디어 및 스폰서십 관리",
      ],
    },
    pricingNote: {
      en: "Core Basic Package: Lower monthly retainer with remote coordination and on-site support at select events, with the option to add premium services as needed. Pricing available upon request.",
      ko: "코어 기본 패키지: 월 기본 요금으로 원격 조율 및 선택 대회 현장 지원 제공. 필요에 따라 프리미엄 서비스 추가 가능. 요금은 문의 시 안내됩니다.",
    },
  },
};

const VISA_FAQ = [
  {
    q: { en: "What is a P-1 visa?", ko: "P-1 비자란 무엇인가요?" },
    a: {
      en: "A P-1 visa is a US nonimmigrant visa for internationally recognized athletes who come to the United States to compete in their sport at a nationally or internationally recognized level.",
      ko: "P-1 비자는 국제적으로 인정받은 선수가 미국에서 스포츠 대회에 참가하기 위한 비이민 비자입니다.",
    },
  },
  {
    q: { en: "Who qualifies?", ko: "자격 요건은 무엇인가요?" },
    a: {
      en: "LPGA and PGA Tour players generally qualify based on their international recognition and tour membership. Epson Tour players may also qualify. We assess each player's eligibility individually.",
      ko: "LPGA 및 PGA 투어 선수는 국제적 인지도와 투어 자격으로 일반적으로 자격이 됩니다. Epson Tour 선수도 해당될 수 있습니다.",
    },
  },
  {
    q: {
      en: "How long does the process take?",
      ko: "비자 발급까지 얼마나 걸리나요?",
    },
    a: {
      en: "Standard processing takes 3–5 months. Premium processing can reduce this to 15 business days. We recommend starting 6 months before your first US tournament.",
      ko: "일반 처리 기간은 3~5개월입니다. 프리미엄 처리를 이용하면 15영업일로 단축할 수 있습니다. 첫 미국 대회 6개월 전에 시작하는 것을 권장합니다.",
    },
  },
  {
    q: {
      en: "Do you work with a licensed attorney?",
      ko: "전문 이민 변호사와 함께 일하나요?",
    },
    a: {
      en: "Yes. Aurum works directly with licensed US immigration attorneys who specialize in athlete visas. We coordinate all documentation, timelines, and correspondence.",
      ko: "네. Aurum은 선수 비자 전문 미국 이민 변호사와 직접 협력합니다. 모든 서류, 일정, 서신 조율을 담당합니다.",
    },
  },
  {
    q: {
      en: "Is the initial consultation free?",
      ko: "초기 상담은 무료인가요?",
    },
    a: {
      en: "Yes. We offer a free initial visa eligibility consultation for all prospective athletes. Contact us at Sophia@aurumsm.com to schedule.",
      ko: "네. 모든 선수 지원자에게 무료 초기 비자 자격 상담을 제공합니다.",
    },
  },
];

const TRANSLATIONS = {
  nav: {
    home: { en: "Home", ko: "홈" },
    roster: { en: "Our Roster", ko: "선수단" },
    services: { en: "Services", ko: "서비스" },
    visa: { en: "P-1 Visa", ko: "P-1 비자" },
    sponsors: { en: "For Sponsors", ko: "스폰서" },
    contact: { en: "Contact", ko: "연락처" },
  },
};
