/*
 * 키워드 데이터
 * - 문자열 항목: 텍스트만 출력
 * - 객체 항목: { ko: 화면 표기, tag: 이미지 프롬프트 태그, g: 허용 성별, natural: 자연 색상 여부 }
 * 키워드를 추가·수정하려면 이 파일만 고치면 됩니다.
 * 이름 목록의 중복(같은 로마자 표기)은 app.js가 불러올 때 자동으로 걸러집니다.
 */

// 영미권 공통 이름 (미국 · 영국에 함께 들어감)
const ANGLO = {
  surnames: [
    ['윌리엄스', 'Williams'], ['브라운', 'Brown'], ['존스', 'Jones'], ['밀러', 'Miller'], ['데이비스', 'Davis'],
    ['윌슨', 'Wilson'], ['앤더슨', 'Anderson'], ['토마스', 'Thomas'], ['테일러', 'Taylor'], ['무어', 'Moore'],
    ['잭슨', 'Jackson'], ['마틴', 'Martin'], ['리', 'Lee'], ['톰슨', 'Thompson'], ['화이트', 'White'],
    ['해리스', 'Harris'], ['클라크', 'Clark'], ['루이스', 'Lewis'], ['로빈슨', 'Robinson'], ['카터', 'Carter'],
    ['로저스', 'Rogers'], ['헤이즈', 'Hayes'], ['도노반', 'Donovan'], ['딜런', 'Dillon'], ['레비', 'Levy'],
    ['레어드', 'Laird'], ['레일리', 'Reilly'], ['로슨', 'Lawson'], ['로웰', 'Lowell'], ['그레이브스', 'Graves'],
    ['그웬', 'Gwynne'], ['길모어', 'Gilmore'], ['베넷', 'Bennett'], ['번스타인', 'Bernstein'], ['베켓', 'Beckett'],
    ['보일', 'Boyle'], ['맥코이', 'McCoy'], ['맥클레인', 'McClain'], ['메이슨', 'Mason'], ['린드버그', 'Lindbergh'],
    ['린든', 'Linden'], ['멜빌', 'Melville'], ['섀넌', 'Shannon'], ['브룩스', 'Brooks'], ['싱클레어', 'Sinclair'],
    ['시모어', 'Seymour'], ['웨버', 'Webber'], ['캐번디시', 'Cavendish'], ['캐롤', 'Carroll'], ['칼라일', 'Carlisle'],
    ['파킨슨', 'Parkinson'], ['프로스트', 'Frost'], ['트레비스', 'Travis'], ['콘스탄틴', 'Constantine'], ['크레인', 'Crane'],
    ['포지', 'Posey'], ['스톤', 'Stone'], ['테이트', 'Tate'], ['발레리', 'Valery'], ['발렌타인', 'Valentine'],
    ['킹', 'King'], ['라이언', 'Ryan'], ['스트라이더', 'Strider'], ['마이어스', 'Myers'], ['코린', 'Corin'],
    ['크롬웰', 'Cromwell'], ['니켈', 'Nickel'], ['퀸', 'Quinn'], ['와이즈먼', 'Wiseman'], ['레이크', 'Lake'],
    ['카메론', 'Cameron'], ['캠벨', 'Campbell'], ['하웰', 'Howell'], ['그린버그', 'Greenberg'],
  ],
  male: [
    ['리암', 'Liam'], ['노아', 'Noah'], ['올리버', 'Oliver'], ['일라이저', 'Elijah'], ['로건', 'Logan'],
    ['맥스', 'Max'], ['아이작', 'Isaac'], ['오스카', 'Oscar'], ['제임스', 'James'], ['윌리엄', 'William'],
    ['벤자민', 'Benjamin'], ['루카스', 'Lucas'], ['헨리', 'Henry'], ['테오도르', 'Theodore'], ['잭', 'Jack'],
    ['리바이', 'Levi'], ['알렉산더', 'Alexander'], ['잭슨', 'Jackson'], ['마테오', 'Mateo'], ['다니엘', 'Daniel'],
    ['마이클', 'Michael'], ['메이슨', 'Mason'], ['호레이쇼', 'Horatio'], ['네이선', 'Nathan'], ['나타니엘', 'Nathaniel'],
    ['에반', 'Evan'], ['세바스찬', 'Sebastian'], ['에단', 'Ethan'], ['오웬', 'Owen'], ['사무엘', 'Samuel'],
    ['제이콥', 'Jacob'], ['애셔', 'Asher'], ['제이', 'Jay'], ['콜린', 'Colin'], ['조슈아', 'Joshua'],
    ['다윈', 'Darwin'], ['딜런', 'Dylan'], ['랜돌프', 'Randolph'], ['루이스', 'Louis'], ['사이먼', 'Simon'],
    ['마크', 'Mark'], ['마틴', 'Martin'], ['버나드', 'Bernard'], ['버스터', 'Buster'], ['래리', 'Larry'],
    ['아론', 'Aaron'], ['아벨', 'Abel'], ['매그너스', 'Magnus'], ['아나킨', 'Anakin'], ['어빈', 'Irvin'],
    ['체스터', 'Chester'], ['제이크', 'Jake'], ['칼라일', 'Carlisle'], ['유진', 'Eugene'], ['클레이튼', 'Clayton'],
    ['행크', 'Hank'],
  ],
  female: [
    ['올리비아', 'Olivia'], ['엠마', 'Emma'], ['샬럿', 'Charlotte'], ['다이애나', 'Diana'], ['아멜리아', 'Amelia'],
    ['에이바', 'Ava'], ['소피아', 'Sophia'], ['이사벨라', 'Isabella'], ['미아', 'Mia'], ['에블린', 'Evelyn'],
    ['하퍼', 'Harper'], ['루나', 'Luna'], ['카밀라', 'Camila'], ['지안나', 'Gianna'], ['엘리자베스', 'Elizabeth'],
    ['엘리너', 'Eleanor'], ['엘라', 'Ella'], ['애비게일', 'Abigail'], ['스칼렛', 'Scarlett'], ['에밀리', 'Emily'],
    ['아리아', 'Aria'], ['페넬로페', 'Penelope'], ['클로이', 'Chloe'], ['레일라', 'Layla'], ['그웬', 'Gwen'],
    ['그웬돌린', 'Gwendolyn'], ['레베카', 'Rebecca'], ['레지나', 'Regina'], ['로레인', 'Lorraine'], ['엘리노어', 'Elinor'],
    ['릴리', 'Lily'], ['릴리안', 'Lillian'], ['릴리아나', 'Liliana'], ['마가렛', 'Margaret'], ['마릴린', 'Marilyn'],
    ['비비안', 'Vivian'], ['비앙카', 'Bianca'], ['사브리나', 'Sabrina'], ['사라', 'Sarah'], ['산드라', 'Sandra'],
    ['샤론', 'Sharon'], ['세이디', 'Sadie'], ['스테이시', 'Stacy'], ['에이프릴', 'April'], ['에반젤린', 'Evangeline'],
    ['이졸데', 'Isolde'], ['일레인', 'Elaine'], ['클라리스', 'Clarice'], ['트리샤', 'Tricia'], ['헤일리', 'Hailey'],
    ['헨리에타', 'Henrietta'], ['해리엇', 'Harriet'], ['헤이즐', 'Hazel'], ['프리실라', 'Priscilla'],
  ],
  // 성별 구분 없이 쓰이는 이름
  unisex: [
    ['블레이크', 'Blake'], ['시드니', 'Sidney'], ['브라이어', 'Briar'], ['에이버리', 'Avery'], ['블레어', 'Blair'],
    ['프란시스', 'Francis'], ['샌디', 'Sandy'], ['할리', 'Harley'],
  ],
};

// 미국에만 들어가는 히스패닉계 성씨
const US_HISPANIC = [
  ['가르시아', 'Garcia'], ['로드리게스', 'Rodriguez'], ['마르티네스', 'Martinez'], ['에르난데스', 'Hernandez'],
  ['로페즈', 'Lopez'], ['곤잘레스', 'Gonzalez'], ['페레스', 'Perez'], ['산체스', 'Sanchez'],
  ['라미레스', 'Ramirez'], ['멘데즈', 'Mendez'], ['마르코스', 'Marcos'],
];

window.PERSONA_DATA = {
  genders: [
    { id: 'female', ko: '여성', tag: 'girl' },
    { id: 'male', ko: '남성', tag: 'boy' },
    { id: 'nonbinary', ko: '논바이너리', tag: 'androgynous' },
  ],

  // order: east = 성+이름 / west = 이름+성, spaceKo = 한글 표기 시 띄어쓰기
  // 러시아처럼 성별에 따라 성이 바뀌면 { m: [...], f: [...] }
  // given.unisex: 성별과 상관없이 나오는 이름
  nations: {
    kr: {
      ko: '한국', order: 'east', spaceKo: false,
      surnames: [
        ['김', 'Kim'], ['이', 'Lee'], ['박', 'Park'], ['최', 'Choi'], ['정', 'Jung'], ['강', 'Kang'], ['윤', 'Yoon'], ['한', 'Han'], ['서', 'Seo'], ['신', 'Shin'],
        ['조', 'Jo'], ['장', 'Jang'], ['임', 'Lim'], ['오', 'Oh'], ['권', 'Kwon'], ['황', 'Hwang'], ['안', 'Ahn'], ['송', 'Song'], ['전', 'Jeon'], ['홍', 'Hong'],
        ['유', 'Yoo'], ['고', 'Ko'], ['문', 'Moon'], ['양', 'Yang'], ['손', 'Son'], ['배', 'Bae'], ['백', 'Baek'], ['허', 'Heo'], ['남', 'Nam'], ['심', 'Shim'],
      ],
      given: {
        female: [
          ['서연', 'Seoyeon'], ['하윤', 'Hayoon'], ['은채', 'Eunchae'], ['수아', 'Sua'], ['다인', 'Dain'], ['예린', 'Yerin'], ['채원', 'Chaewon'], ['소희', 'Sohee'],
          ['서윤', 'Seoyoon'], ['서현', 'Seohyun'], ['하은', 'Haeun'], ['민서', 'Minseo'], ['윤서', 'Yoonseo'], ['지아', 'Jia'], ['다은', 'Daeun'], ['은지', 'Eunji'],
          ['지윤', 'Jiyoon'], ['예은', 'Yeeun'], ['소민', 'Somin'], ['아인', 'Ain'], ['시은', 'Sieun'], ['가은', 'Gaeun'], ['유나', 'Yuna'], ['서영', 'Seoyoung'],
          ['민지', 'Minji'], ['수민', 'Sumin'], ['아란', 'Aran'], ['채영', 'Chaeyoung'], ['혜원', 'Hyewon'], ['유정', 'Yujeong'],
        ],
        male: [
          ['도윤', 'Doyoon'], ['시우', 'Siwoo'], ['준혁', 'Junhyuk'], ['태오', 'Taeo'], ['현우', 'Hyunwoo'], ['재민', 'Jaemin'], ['승현', 'Seunghyun'], ['민재', 'Minjae'], ['건우', 'Gunwoo'],
          ['민준', 'Minjun'], ['서준', 'Seojun'], ['예준', 'Yejun'], ['하준', 'Hajun'], ['지호', 'Jiho'], ['주원', 'Juwon'], ['우진', 'Woojin'], ['선우', 'Sunwoo'],
          ['지훈', 'Jihoon'], ['은우', 'Eunwoo'], ['정우', 'Jungwoo'], ['승우', 'Seungwoo'], ['지환', 'Jihwan'], ['태현', 'Taehyun'], ['진우', 'Jinwoo'], ['민석', 'Minseok'],
          ['도현', 'Dohyun'], ['동현', 'Donghyun'], ['재윤', 'Jaeyoon'],
        ],
        unisex: [
          ['지우', 'Jiwoo'], ['유진', 'Yujin'], ['이안', 'Ian'], ['수빈', 'Subin'], ['지민', 'Jimin'], ['연우', 'Yeonwoo'], ['시윤', 'Siyoon'], ['아람', 'Aram'], ['유하', 'Yuha'],
        ],
      },
    },
    jp: {
      ko: '일본', order: 'east', spaceKo: true,
      surnames: [
        ['사토', 'Sato'], ['스즈키', 'Suzuki'], ['타카하시', 'Takahashi'], ['이치노세', 'Ichinose'], ['키리시마', 'Kirishima'], ['시노미야', 'Shinomiya'], ['아마미야', 'Amamiya'], ['쿠로사와', 'Kurosawa'],
        ['타나카', 'Tanaka'], ['이토', 'Ito'], ['와타나베', 'Watanabe'], ['야마모토', 'Yamamoto'], ['나카무라', 'Nakamura'], ['코바야시', 'Kobayashi'], ['카토', 'Kato'],
        ['요시다', 'Yoshida'], ['야마다', 'Yamada'], ['사사키', 'Sasaki'], ['야마구치', 'Yamaguchi'], ['사이토', 'Saito'], ['마츠모토', 'Matsumoto'], ['이노우에', 'Inoue'],
        ['키무라', 'Kimura'], ['하야시', 'Hayashi'], ['시미즈', 'Shimizu'], ['야마자키', 'Yamazaki'], ['모리', 'Mori'], ['이케다', 'Ikeda'], ['하시모토', 'Hashimoto'],
        ['호시노', 'Hoshino'], ['미야모토', 'Miyamoto'], ['쿠로다', 'Kuroda'], ['이시카와', 'Ishikawa'], ['나카지마', 'Nakajima'], ['오가와', 'Ogawa'],
      ],
      given: {
        female: [
          ['하루카', 'Haruka'], ['유이', 'Yui'], ['린', 'Rin'], ['사쿠라', 'Sakura'], ['미오', 'Mio'], ['츠바키', 'Tsubaki'], ['시오리', 'Shiori'],
          ['히나', 'Hina'], ['리오', 'Rio'], ['메이', 'Mei'], ['이치카', 'Ichika'], ['아카리', 'Akari'], ['미사키', 'Misaki'], ['칸나', 'Kanna'],
          ['모모카', 'Momoka'], ['나나미', 'Nanami'], ['시즈쿠', 'Shizuku'], ['루나', 'Runa'], ['미유', 'Miyu'], ['코코네', 'Kokone'], ['호노카', 'Honoka'],
        ],
        male: [
          ['하루토', 'Haruto'], ['렌', 'Ren'], ['소마', 'Soma'], ['카이토', 'Kaito'], ['료', 'Ryo'], ['이츠키', 'Itsuki'],
          ['미나토', 'Minato'], ['유마', 'Yuma'], ['소타', 'Sota'], ['리쿠', 'Riku'], ['유토', 'Yuto'], ['쇼', 'Sho'], ['타쿠미', 'Takumi'],
          ['다이키', 'Daiki'], ['류노스케', 'Ryunosuke'], ['켄지', 'Kenji'], ['다이스케', 'Daisuke'],
        ],
        unisex: [
          ['히나타', 'Hinata'], ['아키라', 'Akira'], ['소라', 'Sora'], ['유키', 'Yuki'], ['카에데', 'Kaede'], ['마코토', 'Makoto'],
          ['시온', 'Shion'], ['아오이', 'Aoi'], ['미즈키', 'Mizuki'],
        ],
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
      surnames: [
        ['포스터', 'Foster'], ['헤이스', 'Hayes'], ['브룩스', 'Brooks'], ['칼라일', 'Carlisle'], ['리드', 'Reed'], ['모건', 'Morgan'], ['설리번', 'Sullivan'], ['코너', 'Connor'],
        ...ANGLO.surnames, ...US_HISPANIC,
      ],
      given: {
        female: [['엘리너', 'Eleanor'], ['매디슨', 'Madison'], ['헤일리', 'Hailey'], ['오드리', 'Audrey'], ['클레어', 'Claire'], ['줄리아', 'Julia'], ['스텔라', 'Stella'], ['노라', 'Nora'], ...ANGLO.female],
        male: [['이선', 'Ethan'], ['노아', 'Noah'], ['케일럽', 'Caleb'], ['라이언', 'Ryan'], ['오웬', 'Owen'], ['잭슨', 'Jackson'], ['루카스', 'Lucas'], ['네이선', 'Nathan'], ...ANGLO.male],
        unisex: [...ANGLO.unisex],
      },
    },
    uk: {
      ko: '영국', order: 'west',
      surnames: [
        ['애쉬포드', 'Ashford'], ['블랙우드', 'Blackwood'], ['해링턴', 'Harrington'], ['윈슬로', 'Winslow'], ['펨브로크', 'Pembroke'], ['크롬웰', 'Cromwell'], ['헤이스팅스', 'Hastings'], ['에버렛', 'Everett'],
        ...ANGLO.surnames,
      ],
      given: {
        female: [['비어트리스', 'Beatrice'], ['이모젠', 'Imogen'], ['샬럿', 'Charlotte'], ['플로렌스', 'Florence'], ['로절린드', 'Rosalind'], ['엘로이즈', 'Eloise'], ['헨리에타', 'Henrietta'], ['아이비', 'Ivy'], ...ANGLO.female],
        male: [['시어도어', 'Theodore'], ['에드먼드', 'Edmund'], ['아서', 'Arthur'], ['세바스찬', 'Sebastian'], ['올리버', 'Oliver'], ['제임스', 'James'], ['퍼시벌', 'Percival'], ['휴고', 'Hugo'], ...ANGLO.male],
        unisex: [...ANGLO.unisex],
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
        { m: ['스미르노프', 'Smirnov'], f: ['스미르노바', 'Smirnova'] }, { m: ['쿠즈네초프', 'Kuznetsov'], f: ['쿠즈네초바', 'Kuznetsova'] },
        { m: ['로모프', 'Lomov'], f: ['로모바', 'Lomova'] }, { m: ['레베데프', 'Lebedev'], f: ['레베데바', 'Lebedeva'] },
        { m: ['코즐로프', 'Kozlov'], f: ['코즐로바', 'Kozlova'] }, { m: ['노비코프', 'Novikov'], f: ['노비코바', 'Novikova'] },
        { m: ['솔로비요프', 'Solovyov'], f: ['솔로비요바', 'Solovyova'] }, { m: ['바실리예프', 'Vasiliev'], f: ['바실리예바', 'Vasilieva'] },
        { m: ['자이체프', 'Zaitsev'], f: ['자이체바', 'Zaitseva'] }, { m: ['세묘노프', 'Semyonov'], f: ['세묘노바', 'Semyonova'] },
        { m: ['골루베프', 'Golubev'], f: ['골루베바', 'Golubeva'] }, { m: ['비노그라도프', 'Vinogradov'], f: ['비노그라도바', 'Vinogradova'] },
        { m: ['보그다노프', 'Bogdanov'], f: ['보그다노바', 'Bogdanova'] }, { m: ['보로비요프', 'Vorobyov'], f: ['보로비요바', 'Vorobyova'] },
        { m: ['페도로프', 'Fyodorov'], f: ['페도로바', 'Fyodorova'] }, { m: ['미하일로프', 'Mikhailov'], f: ['미하일로바', 'Mikhailova'] },
        { m: ['벨로프', 'Belov'], f: ['벨로바', 'Belova'] }, { m: ['타라소프', 'Tarasov'], f: ['타라소바', 'Tarasova'] },
        { m: ['코마로프', 'Komarov'], f: ['코마로바', 'Komarova'] }, { m: ['소로킨', 'Sorokin'], f: ['소로키나', 'Sorokina'] },
        { m: ['니키틴', 'Nikitin'], f: ['니키티나', 'Nikitina'] }, { m: ['볼로딘', 'Volodin'], f: ['볼로디나', 'Volodina'] },
        { m: ['일린', 'Ilyin'], f: ['일리나', 'Ilyina'] }, { m: ['사빈', 'Savin'], f: ['사비나', 'Savina'] },
        { m: ['쿠진', 'Kuzin'], f: ['쿠지나', 'Kuzina'] }, { m: ['루딘', 'Rudin'], f: ['루디나', 'Rudina'] },
        { m: ['루빈', 'Rubin'], f: ['루비나', 'Rubina'] }, { m: ['벨린스키', 'Belinsky'], f: ['벨린스카야', 'Belinskaya'] },
        { m: ['카멘스키', 'Kamensky'], f: ['카멘스카야', 'Kamenskaya'] }, { m: ['코발스키', 'Kovalsky'], f: ['코발스카야', 'Kovalskaya'] },
        ['솁첸코', 'Shevchenko'], ['크리벤코', 'Krivenko'],
        ['이그나텐코', 'Ignatenko'], ['타라센코', 'Tarasenko'],
        ['다첸코', 'Datsenko'], ['코발추크', 'Kovalchuk'],
        ['폴리슈크', 'Polishchuk'], ['본다르추크', 'Bondarchuk'],
        ['마르틴', 'Martin'], ['비도비치', 'Vidovich'],
        { m: ['샤토프', 'Shatov'], f: ['샤토바', 'Shatova'] }, { m: ['키릴로프', 'Kirillov'], f: ['키릴로바', 'Kirillova'] },
        { m: ['야코블레프', 'Yakovlev'], f: ['야코블레바', 'Yakovleva'] }, { m: ['그리고리예프', 'Grigoriev'], f: ['그리고리예바', 'Grigorieva'] },
        { m: ['마카로프', 'Makarov'], f: ['마카로바', 'Makarova'] }, { m: ['자하로프', 'Zakharov'], f: ['자하로바', 'Zakharova'] },
        { m: ['체르노프', 'Chernov'], f: ['체르노바', 'Chernova'] }, { m: ['벨랴예프', 'Belyaev'], f: ['벨랴예바', 'Belyaeva'] },
        { m: ['티호노프', 'Tikhonov'], f: ['티호노바', 'Tikhonova'] }, { m: ['고르데예프', 'Gordeev'], f: ['고르데예바', 'Gordeeva'] },
        { m: ['데니소프', 'Denisov'], f: ['데니소바', 'Denisova'] }, { m: ['라자레프', 'Lazarev'], f: ['라자레바', 'Lazareva'] },
        { m: ['멜니코프', 'Melnikov'], f: ['멜니코바', 'Melnikova'] }, { m: ['셰르바코프', 'Shcherbakov'], f: ['셰르바코바', 'Shcherbakova'] },
        { m: ['쿠드랴프체프', 'Kudryavtsev'], f: ['쿠드랴프체바', 'Kudryavtseva'] }, { m: ['우샤코프', 'Ushakov'], f: ['우샤코바', 'Ushakova'] },
        { m: ['우스펜스키', 'Uspensky'], f: ['우스펜스카야', 'Uspenskaya'] }, { m: ['포크롭스키', 'Pokrovsky'], f: ['포크롭스카야', 'Pokrovskaya'] },
        { m: ['소스놉스키', 'Sosnovsky'], f: ['소스놉스카야', 'Sosnovskaya'] }, { m: ['스트렐초프', 'Streltsov'], f: ['스트렐초바', 'Streltsova'] },
        { m: ['예르몰로프', 'Yermolov'], f: ['예르몰로바', 'Yermolova'] }, { m: ['아브데예프', 'Avdeev'], f: ['아브데예바', 'Avdeeva'] },
      ],
      given: {
        female: [['아나스타샤', 'Anastasia'], ['나탈리야', 'Natalia'], ['소피야', 'Sofia'], ['베라', 'Vera'], ['알리사', 'Alisa'], ['옐레나', 'Elena'], ['다리야', 'Darya'], ['밀라나', 'Milana'],
          ['아나스타샤', 'Anastasia'], ['안나', 'Anna'], ['마리아', 'Maria'], ['예카테리나', 'Yekaterina'], ['소피아', 'Sofia'], ['옐레나', 'Elena'],
          ['나탈리아', 'Natalia'], ['타티아나', 'Tatiana'], ['올가', 'Olga'], ['스베틀라나', 'Svetlana'], ['다리아', 'Darya'], ['빅토리아', 'Viktoria'],
          ['율리아', 'Yulia'], ['이리나', 'Irina'], ['알리사', 'Alisa'], ['폴리나', 'Polina'], ['크세니아', 'Ksenia'], ['마르가리타', 'Margarita'],
          ['마리나', 'Marina'], ['발레리아', 'Valeria'], ['갈리나', 'Galina'], ['나데즈다', 'Nadezhda'], ['베라', 'Vera'], ['류보프', 'Lyubov'],
          ['인나', 'Inna'], ['옥사나', 'Oksana'], ['야나', 'Yana'], ['니나', 'Nina'], ['알리나', 'Alina'], ['밀라나', 'Milana'],
          ['디아나', 'Diana'], ['예바', 'Eva'], ['안젤리나', 'Angelina'], ['바실리사', 'Vasilisa'], ['타이시야', 'Taisiya'], ['라리사', 'Larisa'],
          ['베로니카', 'Veronika'], ['안토니나', 'Antonina'], ['발렌티나', 'Valentina'], ['아리나', 'Arina'], ['일로나', 'Ilona'], ['조야', 'Zoya'],
          ['릴리야', 'Liliya'], ['마야', 'Maya'], ['타마라', 'Tamara'], ['클라라', 'Klara'], ['스네자나', 'Snezhana'], ['류드밀라', 'Lyudmila'],
          ['엘비라', 'Elvira'], ['이네사', 'Inessa'],
          ['카테리나', 'Katerina'], ['아젤라이다', 'Adelaida'], ['리자베타', 'Lizaveta'], ['예브게니야', 'Yevgeniya'], ['마르파', 'Marfa'], ['다리야', 'Darya'],
          ['리디야', 'Lidiya'],
          ['알렉산드라', 'Alexandra'], ['울리야나', 'Ulyana'], ['예세니야', 'Yesenia'], ['미로슬라바', 'Miroslava'], ['블라다', 'Vlada'], ['레나타', 'Renata'],
          ['라다', 'Lada'], ['에벨리나', 'Evelina'], ['프라스코비야', 'Praskovya'], ['아브도티야', 'Avdotya'], ['스타니슬라바', 'Stanislava'],
        ],
        male: [['알렉세이', 'Alexei'], ['드미트리', 'Dmitri'], ['이반', 'Ivan'], ['미하일', 'Mikhail'], ['니콜라이', 'Nikolai'], ['유리', 'Yuri'], ['레프', 'Lev'], ['세르게이', 'Sergei'],
          ['이반', 'Ivan'], ['알렉산드르', 'Alexander'], ['세르게이', 'Sergei'], ['안드레이', 'Andrei'], ['드미트리', 'Dmitri'], ['알렉세이', 'Alexei'],
          ['막심', 'Maxim'], ['블라디미르', 'Vladimir'], ['예브게니', 'Yevgeny'], ['데니스', 'Denis'], ['미하일', 'Mikhail'], ['이고르', 'Igor'],
          ['유리', 'Yuri'], ['올레그', 'Oleg'], ['안톤', 'Anton'], ['니콜라이', 'Nikolai'], ['일리야', 'Ilya'], ['아르툠', 'Artyom'],
          ['빅토르', 'Viktor'], ['로만', 'Roman'], ['티무르', 'Timur'], ['파벨', 'Pavel'], ['보리스', 'Boris'], ['콘스탄틴', 'Konstantin'],
          ['루슬란', 'Ruslan'], ['레오니드', 'Leonid'], ['아나톨리', 'Anatoly'], ['뱌체슬라프', 'Vyacheslav'], ['바딤', 'Vadim'], ['마카르', 'Makar'],
          ['스테판', 'Stepan'], ['글렙', 'Gleb'], ['표트르', 'Pyotr'], ['이그나트', 'Ignat'], ['아르투르', 'Artur'], ['에두아르드', 'Eduard'],
          ['보그단', 'Bogdan'], ['야로슬라프', 'Yaroslav'], ['아르세니', 'Arseny'], ['레프', 'Lev'], ['티모페이', 'Timofei'], ['스타니슬라프', 'Stanislav'],
          ['발레리', 'Valery'], ['비탈리', 'Vitaly'], ['겐나디', 'Gennady'], ['루카', 'Luka'], ['마트베이', 'Matvei'], ['다닐', 'Danil'],
          ['알베르트', 'Albert'], ['펠릭스', 'Felix'], ['세바스티안', 'Sebastian'], ['마라트', 'Marat'], ['발렌틴', 'Valentin'], ['필립', 'Philipp'],
          ['키릴', 'Kirill'], ['게오르기', 'Georgy'], ['세묜', 'Semyon'], ['자하르', 'Zakhar'], ['다비드', 'David'], ['마르크', 'Mark'],
          ['파벨', 'Pavel'], ['일리야', 'Ilya'], ['로디온', 'Rodion'], ['레프', 'Lev'], ['발렌틴', 'Valentin'], ['아르카디', 'Arkady'],
          ['니키타', 'Nikita'],
          ['사벨리', 'Savely'], ['미론', 'Miron'], ['데미안', 'Demyan'], ['엘리세이', 'Yelisei'], ['로스티슬라프', 'Rostislav'], ['스뱌토슬라프', 'Svyatoslav'],
          ['야코프', 'Yakov'], ['바실리', 'Vasily'], ['표도르', 'Fyodor'], ['아파나시', 'Afanasy'], ['프로호르', 'Prokhor'], ['이노켄티', 'Innokenty'],
          ['예멜리안', 'Yemelyan'], ['니키포르', 'Nikifor'],
        ],
      },
    },
  },

  // 성별 기본 키 범위 [최소, 최대] cm (선택기에서 비워 두면 사용)
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

  // 체향: 탑 노트(top) 1개 + 베이스 노트(base) 1개
  // top / base: 그 계열의 향료가 탑 노트 / 베이스 노트로 나올 수 있는지
  scentFamilies: [
    {
      ko: '시트러스 & 그린', en: 'Citrus & Green', top: true,
      notes: ['베르가못', '비터 오렌지', '자몽', '갈바눔', '페퍼민트', '레몬', '유자', '라임', '네롤리', '바질', '로즈마리', '그린 티', '무화과 잎'],
    },
    {
      ko: '플로럴 & 프루티', en: 'Floral & Fruity', top: true, base: true,
      notes: ['튜베로즈', '은방울꽃', '아이리스', '무화과', '블랙베리', '장미', '자스민', '작약', '프리지아', '금목서', '라일락', '라벤더', '복숭아', '서양배', '블랙커런트'],
    },
    {
      ko: '우디 & 스파이시', en: 'Woody & Spicy', base: true,
      notes: ['샌달우드', '시더우드', '패출리', '핑크 페퍼', '베티버', '오드(침향)', '카다멈', '시나몬', '사이프러스', '과이악우드', '사프란'],
    },
    {
      ko: '머스크 & 발사믹', en: 'Musk & Balsamic', base: true,
      notes: ['화이트 머스크', '애니멀릭 머스크', '앰버그리스', '바닐라', '통카빈', '벤조인', '라브다넘', '스웨이드', '파우더리 머스크', '꿀', '비누 향', '섬유유연제', '베이비 파우더'],
    },
    {
      ko: '특수 / 이색', en: 'Special & Ozonic', top: true, base: true,
      notes: ['오조닉', '타바코', '코냑', '인센스', '페트리코', '씨솔트', '미네랄', '메탈릭', '오래된 종이', '럼', '에스프레소', '눈 내린 공기'],
    },
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

  attachments: [
    '안정형 (Secure)',
    '불안형 (Anxious)',
    '회피형 (Avoidant)',
    '혼란형 (Fearful-Avoidant)',
  ],

  // ---------- NSFW (BDSM 성향 테스트 결과 항목 참고) ----------
  // side: dom / sub / any(어느 쪽이든 가능)
  bdsmPositions: [
    { ko: '돔 (Dominant)', side: 'dom' },
    { ko: '섭 (Submissive)', side: 'sub' },
    { ko: '스위치 (Switch)', side: 'switch' },
  ],
  bdsmRoles: [
    { ko: '도미넌트', side: 'dom' },
    { ko: '사디스트', side: 'dom' },
    { ko: '브랫 테이머', side: 'dom' },
    { ko: '마스터/미스트리스', side: 'dom' },
    { ko: '오너', side: 'dom' },
    { ko: '리거', side: 'dom', rope: true },
    { ko: '헌터 (Primal)', side: 'dom' },
    { ko: '디그레이더', side: 'dom' },
    { ko: '서브미시브', side: 'sub' },
    { ko: '마조히스트', side: 'sub' },
    { ko: '브랫', side: 'sub' },
    { ko: '슬레이브', side: 'sub' },
    { ko: '펫', side: 'sub' },
    { ko: '로프 버니', side: 'sub', rope: true },
    { ko: '프레이 (Primal)', side: 'sub' },
    { ko: '디그레이디', side: 'sub' },
    { ko: '익스페리멘탈리스트', side: 'any' },
    { ko: '보이어', side: 'any' },
    { ko: '익시비셔니스트', side: 'any' },
    { ko: '논모노가미스트', side: 'any' },
    { ko: '바닐라', side: 'any' },
  ],
  nsfwStyles: [
    '다정하고 배려 깊음', '집요함', '장난스러움', '말로 몰아붙이는 타입', '조용하지만 격렬함',
    '수줍어하지만 적극적', '느긋하게 애태움', '규칙과 의식을 중시함', '평소와 정반대',
  ],
  // tag: 한계선과 겹치는지 확인할 때 쓰는 분류
  nsfwPlays: [
    { ko: '본디지 (결박)', tag: 'rope' },
    { ko: '스팽킹', tag: 'pain' },
    { ko: '칭찬 (Praise)' },
    { ko: '초커 · 목줄' },
    { ko: '명령과 복종' },
    { ko: '눈가리개' },
    { ko: '애태우기 (Teasing)' },
    { ko: '흔적 남기기', tag: 'mark' },
    { ko: '역할극' },
    { ko: '감각 차단' },
    { ko: '말로 몰아붙이기', tag: 'verbal' },
    { ko: '긴 애프터케어' },
  ],
  nsfwLimits: [
    { ko: '흔적이 남는 행위', tag: 'mark' },
    { ko: '강한 고통', tag: 'pain' },
    { ko: '언어적 모욕', tag: 'verbal' },
    { ko: '결박', tag: 'rope' },
    { ko: '공개된 장소' },
    { ko: '사진 · 영상 촬영' },
    { ko: '제3자 개입' },
    { ko: '없음 (대화로 조율)' },
  ],
  nsfwSpots: ['귀', '목덜미', '허리', '쇄골', '손목', '등', '허벅지 안쪽'],

  // 이미지 프롬프트 표정 (표정 재생성 버튼으로 바뀌는 부분)
  // 기본 표정 1개 + 50% 확률로 보조 표정 1개
  expressions: [
    'expressionless', 'light smile', 'smile', 'gentle smile', 'smirk', 'smug', 'pout',
    'serious', 'annoyed', 'bored', 'surprised', 'frown', 'closed mouth', 'parted lips',
  ],
  expressionMods: ['shy', 'blush', 'embarrassed', 'sleepy', 'nervous', 'light blush'],
};
