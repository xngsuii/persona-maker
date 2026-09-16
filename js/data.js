/*
 * 키워드 데이터
 * - 문자열 항목: 텍스트만 출력
 * - 객체 항목: { ko: 화면 표기, tag: 이미지 프롬프트 태그, g: 허용 성별, natural: 자연 색상 여부 }
 * 키워드를 추가·수정하려면 이 파일만 고치면 됩니다.
 */
window.PERSONA_DATA = {
  genders: [
    { id: 'female', ko: '여성', tag: 'girl' },
    { id: 'male', ko: '남성', tag: 'boy' },
    { id: 'nonbinary', ko: '논바이너리', tag: 'androgynous' },
  ],

  // order: east = 성+이름 / west = 이름+성, spaceKo = 한글 표기 시 띄어쓰기
  // 러시아처럼 성별에 따라 성이 바뀌면 { m: [...], f: [...] }
  nations: {
    kr: {
      ko: '한국', order: 'east', spaceKo: false,
      surnames: [['김', 'Kim'], ['이', 'Lee'], ['박', 'Park'], ['최', 'Choi'], ['정', 'Jung'], ['강', 'Kang'], ['윤', 'Yoon'], ['한', 'Han'], ['서', 'Seo'], ['신', 'Shin']],
      given: {
        female: [['서연', 'Seoyeon'], ['지우', 'Jiwoo'], ['하윤', 'Hayoon'], ['은채', 'Eunchae'], ['수아', 'Sua'], ['다인', 'Dain'], ['예린', 'Yerin'], ['채원', 'Chaewon'], ['유진', 'Yujin'], ['소희', 'Sohee']],
        male: [['도윤', 'Doyoon'], ['시우', 'Siwoo'], ['준혁', 'Junhyuk'], ['태오', 'Taeo'], ['현우', 'Hyunwoo'], ['재민', 'Jaemin'], ['승현', 'Seunghyun'], ['이안', 'Ian'], ['민재', 'Minjae'], ['건우', 'Gunwoo']],
      },
    },
    jp: {
      ko: '일본', order: 'east', spaceKo: true,
      surnames: [['사토', 'Sato'], ['스즈키', 'Suzuki'], ['다카하시', 'Takahashi'], ['이치노세', 'Ichinose'], ['기리시마', 'Kirishima'], ['시노미야', 'Shinomiya'], ['아마미야', 'Amamiya'], ['쿠로사와', 'Kurosawa']],
      given: {
        female: [['하루카', 'Haruka'], ['유이', 'Yui'], ['린', 'Rin'], ['사쿠라', 'Sakura'], ['미오', 'Mio'], ['츠바키', 'Tsubaki'], ['히나타', 'Hinata'], ['시오리', 'Shiori']],
        male: [['하루토', 'Haruto'], ['렌', 'Ren'], ['소마', 'Soma'], ['카이토', 'Kaito'], ['료', 'Ryo'], ['이츠키', 'Itsuki'], ['아키라', 'Akira'], ['소라', 'Sora']],
      },
    },
    cn: {
      ko: '중국', order: 'east', spaceKo: true,
      surnames: [['왕', 'Wang'], ['리', 'Li'], ['장', 'Zhang'], ['천', 'Chen'], ['린', 'Lin'], ['선', 'Shen'], ['셰', 'Xie'], ['루', 'Lu']],
      given: {
        female: [['위란', 'Yulan'], ['샤오위', 'Xiaoyu'], ['링링', 'Lingling'], ['메이', 'Mei'], ['칭옌', 'Qingyan'], ['멍야오', 'Mengyao'], ['쯔한', 'Zihan'], ['신이', 'Xinyi']],
        male: [['하오란', 'Haoran'], ['쯔쉬안', 'Zixuan'], ['이천', 'Yichen'], ['쥔제', 'Junjie'], ['무바이', 'Mubai'], ['윈셴', 'Yunxian'], ['톈유', 'Tianyou'], ['자오양', 'Zhaoyang']],
      },
    },
    us: {
      ko: '미국', order: 'west',
      surnames: [['포스터', 'Foster'], ['헤이스', 'Hayes'], ['브룩스', 'Brooks'], ['칼라일', 'Carlisle'], ['리드', 'Reed'], ['모건', 'Morgan'], ['설리번', 'Sullivan'], ['코너', 'Connor']],
      given: {
        female: [['엘리너', 'Eleanor'], ['매디슨', 'Madison'], ['헤일리', 'Hailey'], ['오드리', 'Audrey'], ['클레어', 'Claire'], ['줄리아', 'Julia'], ['스텔라', 'Stella'], ['노라', 'Nora']],
        male: [['이선', 'Ethan'], ['노아', 'Noah'], ['케일럽', 'Caleb'], ['라이언', 'Ryan'], ['오웬', 'Owen'], ['잭슨', 'Jackson'], ['루카스', 'Lucas'], ['네이선', 'Nathan']],
      },
    },
    uk: {
      ko: '영국', order: 'west',
      surnames: [['애쉬포드', 'Ashford'], ['블랙우드', 'Blackwood'], ['해링턴', 'Harrington'], ['윈슬로', 'Winslow'], ['펨브로크', 'Pembroke'], ['크롬웰', 'Cromwell'], ['헤이스팅스', 'Hastings'], ['에버렛', 'Everett']],
      given: {
        female: [['비어트리스', 'Beatrice'], ['이모젠', 'Imogen'], ['샬럿', 'Charlotte'], ['플로렌스', 'Florence'], ['로절린드', 'Rosalind'], ['엘로이즈', 'Eloise'], ['헨리에타', 'Henrietta'], ['아이비', 'Ivy']],
        male: [['시어도어', 'Theodore'], ['에드먼드', 'Edmund'], ['아서', 'Arthur'], ['세바스찬', 'Sebastian'], ['올리버', 'Oliver'], ['제임스', 'James'], ['퍼시벌', 'Percival'], ['휴고', 'Hugo']],
      },
    },
    fr: {
      ko: '프랑스', order: 'west',
      surnames: [['뒤부아', 'Dubois'], ['르페브르', 'Lefèvre'], ['모로', 'Moreau'], ['로랑', 'Laurent'], ['베르나르', 'Bernard'], ['퐁텐', 'Fontaine'], ['지라르', 'Girard'], ['드 라 쿠르', 'de la Cour']],
      given: {
        female: [['엘로디', 'Élodie'], ['카미유', 'Camille'], ['마농', 'Manon'], ['셀린', 'Céline'], ['아멜리', 'Amélie'], ['클로에', 'Chloé'], ['소피', 'Sophie'], ['리즈', 'Lise']],
        male: [['뤼시앵', 'Lucien'], ['가스파르', 'Gaspard'], ['앙투안', 'Antoine'], ['쥘', 'Jules'], ['테오', 'Théo'], ['레미', 'Rémy'], ['루이', 'Louis'], ['바티스트', 'Baptiste']],
      },
    },
    de: {
      ko: '독일', order: 'west',
      surnames: [['슈바르츠', 'Schwarz'], ['베버', 'Weber'], ['하르트만', 'Hartmann'], ['폰 아이헨', 'von Eichen'], ['뮐러', 'Müller'], ['크라우제', 'Krause'], ['로젠탈', 'Rosenthal'], ['베커', 'Becker']],
      given: {
        female: [['클라라', 'Clara'], ['리젤', 'Liesel'], ['한나', 'Hanna'], ['프리다', 'Frieda'], ['마를레네', 'Marlene'], ['엠마', 'Emma'], ['레아', 'Lea'], ['이레네', 'Irene']],
        male: [['루카스', 'Lukas'], ['펠릭스', 'Felix'], ['막시밀리안', 'Maximilian'], ['요나스', 'Jonas'], ['레온', 'Leon'], ['에리히', 'Erich'], ['크리스토프', 'Christoph'], ['파울', 'Paul']],
      },
    },
    ru: {
      ko: '러시아', order: 'west',
      surnames: [
        { m: ['볼코프', 'Volkov'], f: ['볼코바', 'Volkova'] },
        { m: ['이바노프', 'Ivanov'], f: ['이바노바', 'Ivanova'] },
        { m: ['소콜로프', 'Sokolov'], f: ['소콜로바', 'Sokolova'] },
        { m: ['모로조프', 'Morozov'], f: ['모로조바', 'Morozova'] },
        { m: ['오를로프', 'Orlov'], f: ['오를로바', 'Orlova'] },
        { m: ['페트로프', 'Petrov'], f: ['페트로바', 'Petrova'] },
      ],
      given: {
        female: [['아나스타샤', 'Anastasia'], ['나탈리야', 'Natalia'], ['소피야', 'Sofia'], ['베라', 'Vera'], ['알리사', 'Alisa'], ['옐레나', 'Elena'], ['다리야', 'Darya'], ['밀라나', 'Milana']],
        male: [['알렉세이', 'Alexei'], ['드미트리', 'Dmitri'], ['이반', 'Ivan'], ['미하일', 'Mikhail'], ['니콜라이', 'Nikolai'], ['유리', 'Yuri'], ['레프', 'Lev'], ['세르게이', 'Sergei']],
      },
    },
  },

  // [최소, 최대] cm
  heights: { female: [150, 178], male: [165, 192], nonbinary: [155, 185] },

  bodies: [
    { ko: '마른 체형', tag: 'slim' },
    { ko: '슬렌더', tag: 'slender' },
    { ko: '균형 잡힌 체형', tag: '' },
    { ko: '근육질', tag: 'muscular' },
    { ko: '탄탄한 체형', tag: 'toned' },
    { ko: '글래머러스', tag: 'curvy', g: ['female'] },
    { ko: '가녀린 체형', tag: 'petite', g: ['female', 'nonbinary'] },
    { ko: '어깨가 넓은 체형', tag: 'broad shoulders', g: ['male', 'nonbinary'] },
  ],

  jobs: [
    '대학원생', '바리스타', '강력계 형사', '외과의사', '일러스트레이터', '소설가', '바텐더', '변호사',
    '사진작가', '조향사', '피아니스트', '프로그래머', '헤드헌터', '꽃집 사장', '수의사', '호텔리어',
    '미술관 큐레이터', '고등학교 교사', '경호원', '번역가', '타투이스트', '셰프', '기자', '모델',
    '편의점 아르바이트생', '화이트 해커', '고서점 주인', '응급구조사', '웹툰 작가', '카페 사장',
  ],

  // hex: 기준 색상코드 (생성할 때마다 조금씩 변형), en: 프롬프트용 색 이름
  hairColors: [
    { ko: '흑발', en: 'black', hex: '#1C1C1E', natural: true },
    { ko: '짙은 갈색', en: 'dark brown', hex: '#3B2A22', natural: true },
    { ko: '밝은 갈색', en: 'light brown', hex: '#8A5F3F', natural: true },
    { ko: '금발', en: 'golden', hex: '#D9B061', natural: true },
    { ko: '백금발', en: 'platinum blonde', hex: '#E8DFC8', natural: true },
    { ko: '적갈색', en: 'auburn', hex: '#7A3A24', natural: true },
    { ko: '붉은 머리', en: 'red', hex: '#A8322A', natural: true },
    { ko: '애쉬 그레이', en: 'ash grey', hex: '#8E9194', natural: true },
    { ko: '은발', en: 'silver', hex: '#C4C8CE' },
    { ko: '백발', en: 'white', hex: '#EEEEEA' },
    { ko: '청발', en: 'blue', hex: '#3A62B0' },
    { ko: '남색', en: 'navy blue', hex: '#1F2B55' },
    { ko: '분홍색', en: 'pink', hex: '#E59AB5' },
    { ko: '보라색', en: 'purple', hex: '#6C4A9E' },
    { ko: '라벤더', en: 'lavender', hex: '#B7A3D8' },
    { ko: '민트색', en: 'mint', hex: '#8FD3C1' },
    { ko: '애쉬 그린', en: 'ash green', hex: '#7E9A8A' },
    { ko: '와인색', en: 'wine red', hex: '#6B1E33' },
  ],

  // 첫 항목(없음)이 뽑힐 확률은 app.js에서 조정. {c} = 두 번째 색 이름
  hairExtras: [
    { ko: '', tag: '' },
    { ko: '이너컬러', tag: 'colored inner hair, {c} inner hair' },
    { ko: '브릿지', tag: 'streaked hair, {c} streaks' },
    { ko: '그라데이션', tag: 'gradient hair, {c} hair tips' },
    { ko: '투톤', tag: 'two-tone hair, {c} hair' },
  ],

  // tag에 NovelAI 가중치 문법(0.7::tag::)을 그대로 쓸 수 있음
  bangs: [
    { ko: '일자 앞머리', tag: 'blunt bangs' },
    { ko: '시스루 앞머리', tag: 'wispy bangs' },
    { ko: '옆으로 넘긴 앞머리', tag: 'swept bangs' },
    { ko: '가르마 앞머리', tag: 'parted bangs' },
    { ko: '눈 사이로 흘러내린 앞머리', tag: 'hair between eyes, 1.5::hair strands::' },
    { ko: '한쪽 눈을 가리는 앞머리', tag: 'hair over one eye' },
    { ko: '눈을 덮는 긴 앞머리', tag: '0.8::hair over eyes::' },
    { ko: '이마를 드러낸 올백', tag: '0.7::hair slicked back::, 2::hair strands::, forehead' },
  ],

  // lv: 길이 단계 (스타일 선택 시 사용), len: 색 앞에 붙는 길이 단어, cut: 추가 태그
  hairLengths: [
    { ko: '숏컷', len: 'short', cut: '', lv: 0 },
    { ko: '픽시컷', len: 'short', cut: 'pixie cut', lv: 0 },
    { ko: '단발', len: 'short', cut: 'bob cut', lv: 1 },
    { ko: '중단발', len: 'medium', cut: '', lv: 2 },
    { ko: '장발', len: 'long', cut: '', lv: 3 },
    { ko: '허리까지 오는 장발', len: 'very long', cut: '', lv: 4 },
  ],

  // minLv: 이 길이 이상일 때만 선택
  hairStyles: [
    { ko: '생머리', tag: 'straight hair' },
    { ko: '자연스러운 웨이브', tag: 'wavy hair' },
    { ko: '곱슬머리', tag: 'curly hair' },
    { ko: '부스스한 머리', tag: 'messy hair' },
    { ko: '울프컷', tag: 'wolf cut', minLv: 1 },
    { ko: '하나로 묶은 포니테일', tag: 'ponytail', minLv: 2 },
    { ko: '낮게 묶은 머리', tag: 'low ponytail', minLv: 2 },
    { ko: '반묶음', tag: 'half updo', minLv: 2 },
    { ko: '올림머리', tag: 'hair bun', minLv: 2 },
    { ko: '땋은 머리', tag: 'braid', minLv: 3 },
    { ko: '트윈테일', tag: 'twintails', minLv: 3 },
  ],

  // odd: 오드아이 (다른 색 두 개를 뽑음)
  eyeColors: [
    { ko: '흑색', en: 'black', hex: '#1E1B1A', natural: true },
    { ko: '갈색', en: 'brown', hex: '#5A3B26', natural: true },
    { ko: '호박색', en: 'amber', hex: '#C7862E', natural: true },
    { ko: '회색', en: 'grey', hex: '#7D8388', natural: true },
    { ko: '푸른색', en: 'blue', hex: '#3E6FB8', natural: true },
    { ko: '하늘색', en: 'light blue', hex: '#8DBBE0', natural: true },
    { ko: '녹색', en: 'green', hex: '#4E8A4A', natural: true },
    { ko: '애쉬 그린', en: 'ash green', hex: '#7C9A88', natural: true },
    { ko: '청록색', en: 'aqua', hex: '#3FA7A6' },
    { ko: '금색', en: 'golden', hex: '#D9A92E' },
    { ko: '붉은색', en: 'red', hex: '#B3262E' },
    { ko: '보라색', en: 'purple', hex: '#7A4FB0' },
    { ko: '분홍색', en: 'pink', hex: '#DC7FA3' },
    { ko: '오드아이', odd: true },
  ],

  eyeShapes: [
    { ko: '올라간 눈매', tag: '0.8::tsurime::' },
    { ko: '처진 눈매', tag: '0.8::tareme::' },
    { ko: '날카로운 눈매', tag: 'sharp eyes' },
    { ko: '동그란 눈', tag: 'round eyes' },
    { ko: '나른한 눈매', tag: '0.6::half-closed eyes::' },
    { ko: '게슴츠레한 눈', tag: '0.5::jitome::' },
    { ko: '가늘게 뜬 눈', tag: 'narrowed eyes' },
    { ko: '삼백안', tag: 'sanpaku' },
  ],

  eyebrows: [
    { ko: '일자 눈썹', tag: 'straight eyebrows' },
    { ko: '올라간 눈썹', tag: '0.5::v-shaped eyebrows::' },
    { ko: '처진 눈썹', tag: '0.5::sad eyebrows::' },
    { ko: '짙은 눈썹', tag: 'thick eyebrows' },
    { ko: '옅은 눈썹', tag: '-1::thick eyebrows::, thin eyebrows' },
    { ko: '짧은 눈썹', tag: 'short eyebrows' },
  ],

  // mature: true 인상이면 나이와 상관없이 mature female/male 태그를 붙임
  impressions: [
    { ko: '차갑고 도도한' }, { ko: '온화하고 부드러운' }, { ko: '무심한' }, { ko: '날카로운' },
    { ko: '나른한' }, { ko: '장난기 어린' }, { ko: '순해 보이는' }, { ko: '늘 피곤해 보이는' },
    { ko: '화려한' }, { ko: '단정한' }, { ko: '어딘가 쓸쓸한' },
    { ko: '위압감 있는', mature: true }, { ko: '성숙하고 차분한', mature: true }, { ko: '노련해 보이는', mature: true },
  ],

  skins: [
    { ko: '창백한 피부', tag: 'pale skin' },
    { ko: '하얀 피부', tag: 'fair skin' },
    { ko: '건강한 피부톤', tag: '' },
    { ko: '구릿빛 피부', tag: 'tan' },
    { ko: '어두운 피부', tag: 'dark skin' },
  ],

  marks: [
    { ko: '눈 밑 점', tag: 'mole under eye' },
    { ko: '입가 점', tag: 'mole under mouth' },
    { ko: '목덜미 점', tag: 'mole on neck' },
    { ko: '안경', tag: 'glasses' },
    { ko: '귀 피어싱', tag: 'ear piercing' },
    { ko: '얼굴의 옅은 흉터', tag: 'scar on face' },
    { ko: '주근깨', tag: 'freckles' },
    { ko: '뾰족한 송곳니', tag: 'fang' },
    { ko: '긴 속눈썹', tag: 'long eyelashes' },
    { ko: '팔의 문신', tag: 'arm tattoo' },
    { ko: '짙은 다크서클', tag: 'eyebags' },
    { ko: '볼의 반창고', tag: 'bandaid on face' },
  ],

  // {c} = 옷 색 (clothColors에서 랜덤, 한 벌 안에서는 같은 색)
  fashions: [
    { ko: '캐주얼', tag: '{c} hoodie, blue jeans' },
    { ko: '정장', tag: '{c} suit, white collared shirt, necktie' },
    { ko: '스트릿', tag: '{c} oversized jacket, cargo pants, sneakers' },
    { ko: '댄디', tag: 'white collared shirt, {c} cardigan, slacks' },
    { ko: '고딕', tag: 'gothic, black clothes, choker' },
    { ko: '미니멀', tag: '{c} shirt, black pants' },
    { ko: '스포티', tag: '{c} track jacket, {c} track pants' },
    { ko: '클래식', tag: '{c} turtleneck, long coat' },
    { ko: '빈티지', tag: '{c} knit sweater, corduroy pants' },
    { ko: '페미닌', tag: '{c} blouse, long skirt', g: ['female', 'nonbinary'] },
    { ko: '오피스룩', tag: 'white blouse, {c} pencil skirt, office lady', g: ['female'] },
    { ko: '워크웨어', tag: '{c} work jacket, cargo pants, boots', g: ['male', 'nonbinary'] },
  ],
  clothColors: ['black', 'white', 'grey', 'navy', 'beige', 'brown', 'dark green', 'burgundy', 'cream'],

  voices: [
    '낮고 허스키한 목소리', '맑고 높은 목소리', '나긋나긋한 목소리', '건조하고 무뚝뚝한 목소리',
    '부드러운 중저음', '발랄하고 톤이 높은 목소리', '느릿하고 나른한 목소리', '또렷하고 단호한 목소리',
  ],

  traits: [
    '츤데레', '다정함', '냉소적', '능글맞음', '무뚝뚝함', '완벽주의', '소심함', '자존심이 셈',
    '호기심이 많음', '집착이 강함', '낙천적', '계산적', '충동적', '느긋함', '책임감이 강함',
    '눈치가 빠름', '허당', '독설가', '헌신적', '질투가 많음', '겁이 많음', '대담함', '예의 바름',
    '제멋대로', '외로움을 잘 탐', '감정 표현이 서툶', '장난기가 많음', '이성적', '감성적', '고집이 셈',
  ],

  gaps: [
    '겉으론 차갑지만 속은 여림', '늘 웃지만 속을 알 수 없음', '무심한 척하지만 전부 기억함',
    '허술해 보이지만 치밀함', '어른스러워 보이지만 어리광이 많음', '강해 보이지만 혼자 있는 걸 무서워함',
    '예의 바르지만 선을 긋는 데 능함', '가벼워 보이지만 한 사람만 봄', '순해 보이지만 화나면 제일 무서움',
  ],

  values: [
    '약속은 반드시 지킨다', '결과가 과정을 증명한다', '내 사람은 끝까지 지킨다', '자유가 무엇보다 중요하다',
    '돈은 배신하지 않는다', '진실은 언젠가 드러난다', '오늘을 즐기는 것이 최선이다', '감정보다 이성이 우선이다',
    '받은 만큼 돌려준다', '누구에게도 빚지지 않는다', '사랑은 증명하는 것이다', '할 수 있을 때 최선을 다한다',
  ],

  speeches: [
    '누구에게나 존댓말', '반말과 존댓말을 섞어 씀', '짧고 단답형', '느릿하게 늘어지는 말투',
    '사투리가 섞인 말투', '비꼬는 말투', '말끝을 흐림', '다정한 반말', '장난스러운 말투',
    '격식 있는 문어체', '말수가 적고 핵심만 말함', '혼잣말이 많음',
  ],

  likes: [
    '비 오는 날', '블랙커피', '단 음식', '고양이', '오래된 영화', '새벽 산책', '향초', '따뜻한 차',
    '칭찬받는 것', '조용한 서점', '바다', '위스키', '손편지', '빈티지 소품', '매운 음식', '별 보기',
    '강아지', '늦잠', '재즈', '겨울',
  ],

  dislikes: [
    '시끄러운 곳', '거짓말', '오이', '기다리는 것', '벌레', '무례한 사람', '동정받는 것',
    '계획이 틀어지는 것', '뜨거운 음식', '병원', '천둥', '아침', '사람 많은 곳', '단 음식',
    '여름', '매운 음식', '빚지는 것', '고양이',
  ],

  hobbies: [
    '독서', '요리', '러닝', '사진 촬영', '보드게임', '영화 감상', '식물 키우기', '뜨개질', '복싱',
    '드라이브', '게임', '그림 그리기', '레코드 수집', '베이킹', '수영', '퍼즐', '칵테일 만들기',
    '캠핑', '피아노 연주', '서예',
  ],

  habits: [
    '생각할 때 입술을 깨문다', '거짓말할 때 눈을 피한다', '긴장하면 머리카락을 만지작거린다',
    '무의식적으로 펜을 돌린다', '잠들기 전 일기를 쓴다', '초조하면 손톱을 뜯는다',
    '기분 좋으면 콧노래를 부른다', '상대의 말을 곱씹듯 따라 한다', '불안하면 손가락으로 톡톡 두드린다',
    '커피를 하루 네 잔 이상 마신다', '물건을 정해진 자리에만 둔다', '한숨을 자주 쉰다',
  ],

  scents: [
    '은은한 비누 향', '머스크', '상큼한 시트러스', '우디 향', '달콤한 바닐라', '섬유유연제 향',
    '담배와 민트', '장미', '베이비 파우더', '비 온 뒤 흙내음', '커피 향', '라벤더', '복숭아',
    '가죽과 스모키',
  ],

  weaknesses: [
    '술에 약함', '칭찬에 약함', '동물 앞에서 무장해제', '거절을 못 함', '길치', '기계치',
    '추위를 많이 탐', '눈물에 약함', '간지럼을 많이 탐', '고소공포증',
  ],

  families: [
    '외동', '화목한 집안의 첫째', '형제 많은 집안의 막내', '쌍둥이 동생이 있음', '편부 가정',
    '편모 가정', '조부모 손에 자람', '연락을 끊은 가족', '재벌가의 막내', '입양됨',
    '이복형제가 있음', '가족을 모두 잃음',
  ],

  traumas: [
    '어린 시절 방치됨', '가까운 사람의 배신', '화재 사고 생존자', '소중한 사람을 눈앞에서 잃음',
    '오랫동안 괴롭힘을 당함', '물에 빠진 경험 (물 공포)', '부모의 과도한 기대', '연인의 잠적',
    '납치당한 경험', '좁은 곳에 갇힌 기억 (폐소공포)', '큰 실패로 모든 것을 잃음', '없음 (본인은 그렇게 믿음)',
  ],

  secrets: [
    '몰래 팬픽을 씀', '사실 겁이 아주 많음', '갚지 못한 빚이 있음', '과거에 다른 이름으로 살았음',
    '누군가를 오래 짝사랑 중', '인형 없이는 잠들지 못함', '숨기고 싶은 전과가 있음',
    '가족에게 숨긴 직업이 있음', '사실 요리를 전혀 못 함', '남에게 말 못 한 지병이 있음',
    '익명으로 꾸준히 기부 중', '유명 인플루언서의 부계정 주인',
  ],

  loves: [
    '연애는 사치라고 생각함', '한번 빠지면 전부를 거는 타입', '천천히 스며드는 타입',
    '먼저 다가가지 못하는 타입', '표현은 서툴지만 행동으로 보여줌', '밀당을 즐김',
    '질투를 숨기지 못함', '첫사랑을 잊지 못함', '결혼을 전제로만 만남', '상대에게 맞춰주는 타입',
  ],

  nsfwRoles: ['주도적 (Dom)', '수동적 (Sub)', '스위치', '평소와 정반대', '바닐라'],
  nsfwStyles: [
    '다정하고 배려 깊음', '집요함', '장난스러움', '말로 몰아붙이는 타입', '조용하지만 격렬함',
    '수줍어하지만 적극적', '느긋하게 애태움',
  ],
  nsfwSpots: ['귀', '목덜미', '허리', '쇄골', '손목', '등', '허벅지 안쪽'],
  nsfwPrefs: ['잦은 스킨십', '칭찬과 속삭임', '분위기와 무드', '소유욕 표현', '긴 키스', '흔적 남기기'],

  // 이미지 프롬프트 표정 (표정 재생성 버튼으로 바뀌는 부분)
  // 기본 표정 1개 + 50% 확률로 보조 표정 1개
  expressions: [
    'expressionless', 'light smile', 'smile', 'gentle smile', 'smirk', 'smug', 'pout',
    'serious', 'annoyed', 'bored', 'surprised', 'frown', 'closed mouth', 'parted lips',
  ],
  expressionMods: ['shy', 'blush', 'embarrassed', 'sleepy', 'nervous', 'light blush'],
};
