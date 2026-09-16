(() => {
  'use strict';

  const D = window.PERSONA_DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const STORE_KEY = 'pr-last-v4';
  const OPTS_KEY = 'pr-opts';
  const AGE_MIN = 20;
  const AGE_MAX = 60;
  const HEIGHT_MIN = 140;
  const HEIGHT_MAX = 210;

  /* ---------- random helpers ---------- */
  const rand = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[rand(arr.length)];
  const randInt = (a, b) => a + rand(b - a + 1);
  const textOf = (v) => (typeof v === 'string' ? v : v.ko);
  const fitsGender = (item, gid) => !item.g || item.g.includes(gid);
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = rand(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const pickN = (arr, n, exclude = []) =>
    shuffle(arr.filter((x) => !exclude.includes(textOf(x)))).slice(0, n);

  /* ---------- color helpers ---------- */
  function hexToHsl(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }
    return [h, s * 100, l * 100];
  }

  function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return '#' + [f(0), f(8), f(4)].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  // 기준 색에서 살짝 흔들어 매번 다른 색상코드를 만든다
  function jitterHex(hex) {
    const [h, s, l] = hexToHsl(hex);
    return hslToHex(
      (h + randInt(-6, 6) + 360) % 360,
      clamp(s + randInt(-8, 8), 0, 100),
      clamp(l + randInt(-5, 5), 3, 97),
    );
  }

  // 색 항목 하나를 뽑아 색상코드를 붙인다
  function rollColor(list, o, excludeKo) {
    const pool = list.filter((x) => !x.odd && (o.fantasy || x.natural) && x.ko !== excludeKo);
    const c = pick(pool);
    return { ko: c.ko, en: c.en, code: jitterHex(c.hex) };
  }

  const hashHue = (str) => [...str].reduce((n, ch) => (n * 31 + ch.charCodeAt(0)) % 360, 7);

  // 페르소나 테마색: 머리·눈 색 중 채도가 가장 높은 색을 기준으로 영수증에서 읽히는 밝기로 맞춘다.
  // 전부 무채색이면 인상·체향에서 색조를 가져와 차분한 톤으로 만든다.
  function themeColor(p) {
    const eyes = p.eyeColor.odd ? p.eyeColor.colors : [p.eyeColor];
    const codes = [p.hairColor, p.hairExtra.color, ...eyes].filter(Boolean).map((c) => c.code);
    let [h, s, l] = codes.map(hexToHsl).sort((a, b) => b[1] - a[1])[0];
    if (s < 14) {
      h = hashHue(p.impression.ko + p.scent.top.note);
      s = 22;
    }
    return hslToHex(h, clamp(s, 22, 72), clamp(l, 36, 56));
  }

  /* ---------- persona rollers ---------- */
  // 이름 순서는 국적을 따른다.
  // ~계: 성은 혈통 쪽, 이름은 국적 쪽 / 혼혈: 성과 이름을 두 나라에서 섞어서
  function rollName(p) {
    const n = D.nations[p.nation];
    const h = p.heritage;
    let surNation = n;
    let givenNation = n;
    if (h && h.type === 'heritage') {
      surNation = D.nations[h.other];
    } else if (h && h.type === 'mixed') {
      const other = D.nations[h.other];
      [surNation, givenNation] = shuffle([n, other]);
      if (Math.random() < 0.3) givenNation = surNation; // 가끔은 한쪽 나라 이름 그대로
    }
    const gid = p.gender.id === 'nonbinary' ? pick(['female', 'male']) : p.gender.id;
    const given = pick(givenPool(givenNation, gid, p.gender.id === 'nonbinary'));
    let sur = pick(surNation.surnames);
    if (!Array.isArray(sur)) sur = gid === 'female' ? sur.f : sur.m;
    if (n.order === 'east') {
      const space = n.spaceKo || surNation !== givenNation ? ' ' : '';
      return { ko: sur[0] + space + given[0], en: `${sur[1]} ${given[1]}` };
    }
    return { ko: `${given[0]} ${sur[0]}`, en: `${given[1]} ${sur[1]}` };
  }

  // 성별 이름 + 중성적인 이름. 논바이너리는 절반 확률로 중성적인 이름만
  function givenPool(nation, gid, preferUnisex) {
    const unisex = nation.given.unisex || [];
    if (preferUnisex && unisex.length && Math.random() < 0.5) return unisex;
    return [...nation.given[gid], ...unisex];
  }

  // 같은 로마자 표기의 이름·성은 하나만 남긴다 (중성 이름이 우선)
  function dedupeNames() {
    const uniq = (arr, key, seen = new Set()) => arr.filter((x) => {
      const k = key(x).toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    Object.values(D.nations).forEach((n) => {
      n.surnames = uniq(n.surnames, (x) => (Array.isArray(x) ? x[1] : x.m[1]));
      const seen = new Set();
      ['unisex', 'female', 'male'].forEach((g) => {
        if (n.given[g]) n.given[g] = uniq(n.given[g], (x) => x[1], seen);
      });
    });
  }

  // 혈통: 단일 / 혼혈(mixed) / ~계(heritage)
  function rollHeritage(p, o) {
    let type = o.blood;
    if (type === 'random') {
      const r = Math.random();
      type = r < 0.7 ? 'single' : r < 0.85 ? 'mixed' : 'heritage';
    }
    if (type === 'single') return null;
    return { type, other: pick(Object.keys(D.nations).filter((id) => id !== p.nation)) };
  }

  function nationText(p) {
    const n = D.nations[p.nation].ko;
    const h = p.heritage;
    if (!h) return n;
    const other = D.nations[h.other].ko;
    return h.type === 'mixed' ? `${n} · ${other} 혼혈` : `${other}계 ${n}인`;
  }

  // 체향: 탑 노트 향료 1개 + 베이스 노트 향료 1개 (서로 다른 향료)
  function rollScent() {
    const note = (stage, except) => {
      const fam = pick(D.scentFamilies.filter((f) => f[stage]));
      const n = pick(fam.notes.filter((x) => x !== except));
      return { note: n, family: fam.ko };
    };
    const top = note('top');
    return { top, base: note('base', top.note) };
  }

  function scentText(sc, html) {
    if (html) {
      const line = (label, x) => `${label} ${esc(x.note)} <span class="r-sub">${esc(x.family)}</span>`;
      return `${line('탑 노트', sc.top)}<br>${line('베이스 노트', sc.base)}`;
    }
    return `탑 노트 ${sc.top.note} → 베이스 노트 ${sc.base.note}`;
  }

  // 선택기 값이 비어 있으면 성별 기본 범위를 쓴다
  function heightRange(gid, o) {
    const [dLo, dHi] = D.heights[gid];
    let lo = o.hMin ?? dLo;
    let hi = o.hMax ?? dHi;
    if (lo > hi) {
      if (o.hMin != null && o.hMax == null) hi = lo + 10;
      else if (o.hMax != null && o.hMin == null) lo = hi - 10;
      else [lo, hi] = [hi, lo];
    }
    return [lo, hi];
  }

  // 포지션에 맞는 BDSM 성향 3개를 높은 퍼센트 순으로
  function rollBdsm(p) {
    const side = p.nsfwPos.side;
    const bySide = (s) => D.bdsmRoles.filter((r) => r.side === s);
    const first = side === 'switch' ? [pick(bySide('dom')), pick(bySide('sub'))] : [pick(bySide(side))];
    const pool = D.bdsmRoles.filter((r) => !first.includes(r) && (r.side === 'any' || r.side === side));
    const roles = [...first, ...pickN(pool, 3 - first.length)];
    let pct = randInt(82, 99);
    return roles.map((r) => {
      const out = { ko: r.ko, rope: !!r.rope, pct };
      pct = Math.max(30, pct - randInt(6, 20));
      return out;
    });
  }

  const ROLL = {
    gender: (p, o) => (o.gender === 'random' ? pick(D.genders) : D.genders.find((g) => g.id === o.gender)),
    nation: (p, o) => (o.nation === 'random' ? pick(Object.keys(D.nations)) : o.nation),
    heritage: (p, o) => rollHeritage(p, o),
    age: (p, o) => randInt(o.min, o.max),
    name: (p) => rollName(p),
    height: (p, o) => randInt(...heightRange(p.gender.id, o)),
    body: (p) => pick(D.bodies.filter((x) => fitsGender(x, p.gender.id))),
    job: () => pick(D.jobs),

    hairColor: (p, o) => rollColor(D.hairColors, o),
    hairExtra: (p, o) => {
      if (Math.random() < 0.65) return { ko: '', tag: '' };
      const x = pick(D.hairExtras.slice(1));
      const color = rollColor(D.hairColors, o, p.hairColor.ko);
      return { ko: x.ko, tag: x.tag.replace(/\{c\}/g, color.en), color };
    },
    bangs: () => pick(D.bangs),
    hairLen: () => pick(D.hairLengths),
    hairStyle: (p) => pick(D.hairStyles.filter((x) => (x.minLv || 0) <= p.hairLen.lv)),
    eyeColor: (p, o) => {
      const odd = o.fantasy && Math.random() < 1 / D.eyeColors.length;
      if (!odd) return rollColor(D.eyeColors, o);
      const a = rollColor(D.eyeColors, o);
      return { ko: '오드아이', odd: true, colors: [a, rollColor(D.eyeColors, o, a.ko)] };
    },
    eyeShape: () => pick(D.eyeShapes),
    impression: () => pick(D.impressions),
    skin: () => pick(D.skins),
    marks: () => pickN(D.marks, randInt(1, 2)),
    fashion: (p) => {
      const f = pick(D.fashions.filter((x) => fitsGender(x, p.gender.id)));
      return { ko: f.ko, tag: f.tag.replace(/\{c\}/g, pick(D.clothColors)) };
    },
    voice: () => pick(D.voices),

    traits: () => pickN(D.traits, 3),
    gap: () => pick(D.gaps),
    values: () => pick(D.values),
    speech: () => pick(D.speeches),

    likes: (p) => pickN(D.likes, 2, p.dislikes || []),
    dislikes: (p) => pickN(D.dislikes, 2, p.likes || []),
    hobbies: () => pickN(D.hobbies, 2),
    habit: () => pick(D.habits),
    scent: () => rollScent(),
    weakness: () => pick(D.weaknesses),

    family: () => pick(D.families),
    trauma: () => pick(D.traumas),
    secret: () => pick(D.secrets),
    love: () => pick(D.loves),
    attachment: () => pick(D.attachments),

    nsfwPos: () => pick(D.bdsmPositions),
    nsfwTop: (p) => rollBdsm(p),
    nsfwStyle: () => pick(D.nsfwStyles),
    nsfwPlays: () => pickN(D.nsfwPlays, 2),
    nsfwSpot: () => pickN(D.nsfwSpots, 2).map(textOf),
    // 선호 플레이·성향과 겹치는 비선호 플레이는 뽑지 않는다
    nsfwLimit: (p) => {
      const used = p.nsfwPlays.map((x) => x.tag).filter(Boolean);
      if (p.nsfwTop.some((r) => r.rope)) used.push('rope');
      return pick(D.nsfwLimits.filter((x) => !used.includes(x.tag)));
    },
  };

  // 어떤 항목을 다시 뽑을 때 함께 바뀌어야 하는 항목
  const DEPENDS = {
    gender: ['name', 'height', 'body', 'fashion'],
    nation: ['heritage'],
    heritage: ['name'],
    hairLen: ['hairStyle'],
    nsfwPos: ['nsfwTop', 'nsfwLimit'],
    nsfwTop: ['nsfwLimit'],
    nsfwPlays: ['nsfwLimit'],
  };

  function rollPersona(o) {
    const p = {};
    Object.keys(ROLL).forEach((k) => { p[k] = ROLL[k](p, o); });
    return p;
  }

  function rerollKeys(p, keys, o) {
    const queue = [];
    const add = (k) => {
      queue.push(k);
      (DEPENDS[k] || []).forEach(add);
    };
    keys.forEach(add);
    // 원래 뽑는 순서대로 다시 뽑아야 의존 관계가 맞는다
    const order = Object.keys(ROLL);
    [...new Set(queue)].sort((a, b) => order.indexOf(a) - order.indexOf(b))
      .forEach((k) => { p[k] = ROLL[k](p, o); });
  }

  /* ---------- sections (receipt + markdown 공용) ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const list = (arr) => arr.map(textOf).join(', ');

  // 색 항목: 텍스트용 / 영수증 HTML용 (글자를 해당 색으로)
  const colorText = (c) => `${c.ko} ${c.code}`;
  const colorHtml = (c) => `<span class="swatch" style="color:${c.code}">${esc(c.ko)} ${c.code}</span>`;

  function hairText(p, html) {
    const fmt = html ? colorHtml : colorText;
    let s = fmt(p.hairColor);
    if (p.hairExtra.ko) s += ` + ${html ? esc(p.hairExtra.ko) : p.hairExtra.ko} ${fmt(p.hairExtra.color)}`;
    return s;
  }

  function eyeText(p, html) {
    const fmt = html ? colorHtml : colorText;
    if (!p.eyeColor.odd) return fmt(p.eyeColor);
    return `${p.eyeColor.ko} (${p.eyeColor.colors.map(fmt).join(' / ')})`;
  }

  // id: 선택기에서 쓰는 항목 id, keys: 클릭 시 다시 뽑을 값
  const SECTIONS = [
    {
      id: 'basic', en: 'BASIC', ko: '기본 정보',
      rows: [
        { id: 'gender', label: '성별', keys: ['gender'], v: (p) => p.gender.ko },
        { id: 'age', label: '나이', keys: ['age'], v: (p) => `${p.age}세` },
        { id: 'nation', label: '국적', keys: ['nation'], v: (p) => nationText(p) },
        { id: 'height', label: '키·체형', keys: ['height', 'body'], v: (p) => `${p.height}cm · ${p.body.ko}` },
        { id: 'job', label: '직업', keys: ['job'], v: (p) => p.job },
      ],
    },
    {
      id: 'look', en: 'APPEARANCE', ko: '외형',
      rows: [
        { id: 'hairColor', label: '머리색', keys: ['hairColor', 'hairExtra'], v: (p) => hairText(p), html: (p) => hairText(p, true) },
        { id: 'hair', label: '헤어스타일', keys: ['bangs', 'hairLen'], v: (p) => `${p.bangs.ko} + ${p.hairLen.ko} ${p.hairStyle.ko}` },
        { id: 'eyeColor', label: '눈동자', keys: ['eyeColor'], v: (p) => eyeText(p), html: (p) => eyeText(p, true) },
        { id: 'eyeShape', label: '눈매', keys: ['eyeShape'], v: (p) => p.eyeShape.ko },
        { id: 'impression', label: '인상', keys: ['impression'], v: (p) => `${p.impression.ko} 인상` },
        { id: 'skin', label: '피부', keys: ['skin'], v: (p) => p.skin.ko },
        { id: 'marks', label: '특징', keys: ['marks'], v: (p) => list(p.marks) },
        { id: 'fashion', label: '스타일', keys: ['fashion'], v: (p) => p.fashion.ko },
        { id: 'voice', label: '목소리', keys: ['voice'], v: (p) => p.voice },
      ],
    },
    {
      id: 'mind', en: 'PERSONALITY', ko: '성격',
      rows: [
        { id: 'traits', label: '키워드', keys: ['traits'], v: (p) => p.traits.map((t) => `#${t}`).join(' ') },
        { id: 'gap', label: '겉과 속', keys: ['gap'], v: (p) => p.gap },
        { id: 'values', label: '가치관', keys: ['values'], v: (p) => p.values },
        { id: 'speech', label: '말투', keys: ['speech'], v: (p) => p.speech },
      ],
    },
    {
      id: 'taste', en: 'TASTE', ko: '취향 · 습관',
      rows: [
        { id: 'likes', label: '호(好)', keys: ['likes'], v: (p) => list(p.likes) },
        { id: 'dislikes', label: '불호(不好)', keys: ['dislikes'], v: (p) => list(p.dislikes) },
        { id: 'hobbies', label: '취미', keys: ['hobbies'], v: (p) => list(p.hobbies) },
        { id: 'habit', label: '습관', keys: ['habit'], v: (p) => p.habit },
        { id: 'scent', label: '체향', keys: ['scent'], v: (p) => scentText(p.scent), html: (p) => scentText(p.scent, true) },
        { id: 'weakness', label: '약점', keys: ['weakness'], v: (p) => p.weakness },
      ],
    },
    {
      id: 'story', en: 'BACKGROUND', ko: '배경',
      rows: [
        { id: 'family', label: '가족관계', keys: ['family'], v: (p) => p.family },
        { id: 'trauma', label: '트라우마', keys: ['trauma'], v: (p) => p.trauma },
        { id: 'secret', label: '비밀', keys: ['secret'], v: (p) => p.secret },
        { id: 'love', label: '연애관', keys: ['love'], v: (p) => p.love },
        { id: 'attachment', label: '애착 유형', keys: ['attachment'], v: (p) => p.attachment },
      ],
    },
    {
      id: 'nsfw', en: 'INTIMATE PREFERENCE', ko: 'NSFW',
      rows: [
        { id: 'nsfwPos', label: '포지션', keys: ['nsfwPos'], v: (p) => p.nsfwPos.ko },
        {
          id: 'nsfwTop', label: '성향 결과', keys: ['nsfwTop'],
          v: (p) => p.nsfwTop.map((r) => `${r.ko} ${r.pct}%`).join(', '),
          html: (p) => p.nsfwTop.map((r) => `${esc(r.ko)} ${r.pct}%`).join('<br>'),
        },
        { id: 'nsfwStyle', label: '스타일', keys: ['nsfwStyle'], v: (p) => p.nsfwStyle },
        { id: 'nsfwPlays', label: '선호 플레이', keys: ['nsfwPlays'], v: (p) => list(p.nsfwPlays) },
        { id: 'nsfwLimit', label: '비선호 플레이', keys: ['nsfwLimit'], v: (p) => p.nsfwLimit.ko },
        { id: 'nsfwSpot', label: '민감한 곳', keys: ['nsfwSpot'], v: (p) => p.nsfwSpot.join(', ') },
      ],
    },
  ];

  const ALL_ROWS = SECTIONS.flatMap((s) => s.rows.map((r) => r.id));
  // 기본값: NSFW만 빼고 전부 포함
  const DEFAULT_HIDDEN = SECTIONS.find((s) => s.id === 'nsfw').rows.map((r) => r.id);

  const visibleSections = (o) => SECTIONS
    .map((s) => ({ ...s, rows: s.rows.filter((r) => !o.hidden.has(r.id)) }))
    .filter((s) => s.rows.length);

  function summaryLine(p, o, withTheme) {
    const show = (id) => !o.hidden.has(id);
    return [
      show('nation') && nationText(p),
      show('gender') && p.gender.ko,
      show('age') && `${p.age}세`,
      show('job') && p.job,
      withTheme && `테마색 ${themeColor(p)}`,
    ].filter(Boolean).join(' · ');
  }

  function toMarkdown(p, o) {
    const out = [`# ${p.name.ko} (${p.name.en})`, '', `> ${summaryLine(p, o, true)}`, ''];
    visibleSections(o).forEach((s) => {
      out.push(`## ${s.ko}`);
      s.rows.forEach((r) => out.push(`- ${r.label}: ${r.v(p)}`));
      out.push('');
    });
    return out.join('\n').trim();
  }

  /* ---------- image prompt ---------- */
  // 표정만 따로 다시 뽑을 수 있게 페르소나와 분리해서 저장
  const rollExtras = () => ({
    expression: [pick(D.expressions), Math.random() < 0.5 ? pick(D.expressionMods) : ''],
  });

  const joinTags = (arr) => arr.filter(Boolean).join(', ');

  function heightTag(p) {
    const g = p.gender.id;
    const tall = g === 'female' ? 170 : g === 'male' ? 183 : 176;
    const short = g === 'female' ? 155 : g === 'male' ? 169 : 160;
    if (p.height >= tall) return 'tall';
    if (p.height <= short) return 'short';
    return '';
  }

  // 나이가 많거나 성숙한 인상이면 girl/boy 대신 mature female/male
  function genderTag(p, o) {
    const mature = p.age >= 30 || (p.impression.mature && !o.hidden.has('impression'));
    if (mature && p.gender.id !== 'nonbinary') return `mature ${p.gender.id}`;
    return p.gender.tag;
  }

  function eyeTags(p) {
    const e = p.eyeColor;
    if (!e.odd) return `${e.en} eyes`;
    return `heterochromia, ${e.colors[0].en} eyes, ${e.colors[1].en} eyes`;
  }

  // 영수증에서 뺀 항목은 프롬프트에서도 뺀다 (성별은 항상 포함)
  function buildPrompt(p, x, o) {
    const on = (id, ...tags) => (o.hidden.has(id) ? [] : tags);
    return [
      {
        title: '외형',
        text: joinTags([
          genderTag(p, o),
          ...on('hairColor', `${o.hidden.has('hair') ? '' : `${p.hairLen.len} `}${p.hairColor.en} hair`),
          ...on('hair', p.hairLen.cut, p.hairStyle.tag),
          ...on('hairColor', p.hairExtra.tag),
          ...on('hair', p.bangs.tag),
          ...on('eyeColor', eyeTags(p)),
          ...on('eyeShape', p.eyeShape.tag),
          ...on('skin', p.skin.tag),
          ...on('height', p.body.tag, heightTag(p)),
          ...on('marks', ...p.marks.map((m) => m.tag)),
        ]),
      },
      { title: '표정', text: joinTags(x.expression) },
      { title: '의상', text: joinTags(on('fashion', p.fashion.tag)) },
    ].filter((s) => s.text);
  }

  // 전체 복사는 NovelAI에 바로 붙여넣을 수 있게 한 줄로
  const promptToText = (secs) => joinTags(secs.map((s) => s.text));

  /* ---------- state & options ---------- */
  const state = { persona: null, extras: null, order: 0, auth: 0, time: null };
  let hidden = new Set(DEFAULT_HIDDEN);

  function readOptions() {
    const minEl = $('#ageMin');
    const maxEl = $('#ageMax');
    let min = clamp(parseInt(minEl.value, 10) || AGE_MIN, AGE_MIN, AGE_MAX);
    let max = clamp(parseInt(maxEl.value, 10) || AGE_MAX, AGE_MIN, AGE_MAX);
    if (min > max) [min, max] = [max, min];
    minEl.value = min;
    maxEl.value = max;
    const cm = (el) => {
      const v = parseInt(el.value, 10);
      if (Number.isNaN(v)) { el.value = ''; return null; }
      el.value = clamp(v, HEIGHT_MIN, HEIGHT_MAX);
      return +el.value;
    };
    return {
      gender: $('input[name="gender"]:checked').value,
      nation: $('#nation').value,
      blood: $('#blood').value,
      min,
      max,
      hMin: cm($('#heightMin')),
      hMax: cm($('#heightMax')),
      fantasy: $('#optFantasy').checked,
      prompt: $('#optPrompt').checked,
      hidden,
    };
  }

  function saveOptions() {
    const o = readOptions();
    try {
      localStorage.setItem(OPTS_KEY, JSON.stringify({ ...o, hidden: [...o.hidden] }));
    } catch (e) { /* noop */ }
  }

  function loadOptions() {
    let o = null;
    try { o = JSON.parse(localStorage.getItem(OPTS_KEY)); } catch (e) { /* noop */ }
    if (!o) return;
    const g = $(`input[name="gender"][value="${o.gender}"]`);
    if (g) g.checked = true;
    if (o.nation && (o.nation === 'random' || D.nations[o.nation])) $('#nation').value = o.nation;
    if (['random', 'single', 'mixed', 'heritage'].includes(o.blood)) $('#blood').value = o.blood;
    if (o.min) $('#ageMin').value = o.min;
    if (o.max) $('#ageMax').value = o.max;
    $('#heightMin').value = o.hMin ?? '';
    $('#heightMax').value = o.hMax ?? '';
    if (typeof o.fantasy === 'boolean') $('#optFantasy').checked = o.fantasy;
    if (typeof o.prompt === 'boolean') $('#optPrompt').checked = o.prompt;
    if (Array.isArray(o.hidden)) hidden = new Set(o.hidden.filter((id) => ALL_ROWS.includes(id)));
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* noop */ }
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && s.persona && s.persona.name) Object.assign(state, s);
    } catch (e) { /* noop */ }
  }

  /* ---------- item picker (왼쪽 선택기) ---------- */
  function renderPicker() {
    $('#itemPicker').innerHTML = SECTIONS.map((s) => `
      <div class="pick-group" data-group="${s.id}">
        <div class="pick-head">
          <label class="check"><input type="checkbox" data-sec="${s.id}"><span>${esc(s.ko)}</span></label>
          <button class="pick-toggle" type="button" data-expand="${s.id}" aria-expanded="false">
            <span class="pick-count"></span><span class="chev" aria-hidden="true">▾</span>
          </button>
        </div>
        <div class="pick-rows" hidden>
          ${s.rows.map((r) => `<label class="chip"><input type="checkbox" data-rowid="${r.id}"><span>${esc(r.label)}</span></label>`).join('')}
        </div>
      </div>`).join('');
    syncPicker();
  }

  function syncPicker() {
    SECTIONS.forEach((s) => {
      const group = $(`[data-group="${s.id}"]`);
      const on = s.rows.filter((r) => !hidden.has(r.id)).length;
      s.rows.forEach((r) => { $(`[data-rowid="${r.id}"]`, group).checked = !hidden.has(r.id); });
      const box = $(`[data-sec="${s.id}"]`, group);
      box.checked = on === s.rows.length;
      box.indeterminate = on > 0 && on < s.rows.length;
      $('.pick-count', group).textContent = `${on}/${s.rows.length}`;
    });
  }

  function onPickerChange(e) {
    const t = e.target;
    if (t.dataset.rowid) {
      if (t.checked) hidden.delete(t.dataset.rowid); else hidden.add(t.dataset.rowid);
    } else if (t.dataset.sec) {
      SECTIONS.find((s) => s.id === t.dataset.sec).rows
        .forEach((r) => { if (t.checked) hidden.delete(r.id); else hidden.add(r.id); });
    } else {
      return;
    }
    syncPicker();
    saveOptions();
    renderAll();
  }

  /* ---------- rendering ---------- */
  const fmtCount = (str) => Array.from(str).length.toLocaleString('ko-KR');
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const rule = (type) => `<div class="rule ${type}" aria-hidden="true"></div>`;

  function barcode(seed) {
    let s = seed % 233280;
    const bars = [];
    for (let i = 0; i < 72; i++) {
      s = (s * 9301 + 49297) % 233280;
      const w = 1 + Math.floor((s / 233280) * 4);
      const gap = 1 + ((s >> 3) % 3);
      bars.push(`<i style="width:${w}px;margin-right:${gap}px"></i>`);
    }
    return `<div class="barcode" aria-hidden="true">${bars.join('')}</div>`;
  }

  function fmtTime(t) {
    const d = new Date(t);
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  const kv = (k, v) => `<div class="r-kv"><span>${k}</span><span>${v}</span></div>`;

  function renderReceipt(o) {
    const el = $('#receipt');
    const p = state.persona;

    if (!p) {
      el.innerHTML = `<div class="r-body">
        <p class="r-kicker">PERSONA RECEIPT</p>
        ${rule('dash')}
        <div class="r-empty">
          <p class="big">NO ORDER YET</p>
          <p>왼쪽에서 조건을 고르고<br>[페르소나 생성]을 눌러주세요.</p>
        </div>
        ${rule('dash')}
        <p class="r-center">THANK YOU FOR VISITING!</p>
      </div>`;
      return;
    }

    const secs = visibleSections(o);
    const rows = secs.flatMap((s) => s.rows);
    const theme = themeColor(p);
    const total = Array.from(toMarkdown(p, o)).length;
    let rowIndex = 0;

    const sectionHtml = secs.map((s, i) => {
      const rowHtml = s.rows.map((r) => {
        const idx = rowIndex++;
        return `<div class="r-row" role="button" tabindex="0" data-row="${idx}" title="이 항목만 다시 뽑기">
          <span class="r-re" data-html2canvas-ignore aria-hidden="true">↻</span>
          <span class="r-label">${esc(r.label)}</span>
          <span class="r-val">${r.html ? r.html(p) : esc(r.v(p))}</span>
        </div>`;
      }).join('');
      return `<div class="r-sec-head"><span class="en">${pad(i + 1)} ${s.en}</span><span class="ko">${esc(s.ko)}</span></div>
        ${rowHtml}
        ${rule('dash')}`;
    }).join('');

    el.innerHTML = `<div class="r-body">
      <p class="r-kicker">PERSONA RECEIPT</p>
      <h1 class="r-name rr" role="button" tabindex="0" data-row="name" title="이름만 다시 뽑기">${esc(p.name.ko)}</h1>
      <p class="r-roman">${esc(p.name.en)}</p>
      <p class="r-meta">${esc(summaryLine(p, o))}</p>
      <div class="r-order">
        <span>ORDER# <b style="color:${theme}">${theme.slice(1)}</b></span>
        <span>${fmtTime(state.time)}</span>
      </div>
      ${rule('dash')}
      <div class="r-sec-head"><span class="en">QTY ITEM</span><span class="ko">DETAIL</span></div>
      ${rule('dash')}
      ${sectionHtml}
      ${kv('ITEM COUNT:', rows.length)}
      ${kv('TOTAL:', `${total.toLocaleString('en-US')}.00`)}
      ${rule('dash')}
      <div class="r-card">
        <p>CARD #: **** **** **** ${pad(state.order, 4)}</p>
        <p>AUTH CODE: ${state.auth}</p>
        <p>CARDHOLDER: ${esc(p.name.en.toUpperCase())}</p>
      </div>
      <p class="r-center r-thanks">THANK YOU FOR VISITING!</p>
      ${barcode(state.order * 7 + state.auth)}
      <p class="r-center barcode-num">${pad(state.order, 4)} ${String(state.time).slice(-8)}</p>
    </div>`;

    // row index → section row 매핑 저장
    el._rows = rows;
  }

  function renderPrompt(o) {
    const card = $('#promptCard');
    if (!o.prompt || !state.persona) {
      card.hidden = true;
      return;
    }
    if (!state.extras) state.extras = rollExtras();
    const secs = buildPrompt(state.persona, state.extras, o);
    $('#promptBody').innerHTML = secs.map((s, i) => `
      <div class="p-sec">
        <div class="p-sec-head"><span>${esc(s.title)}</span><button class="p-copy" type="button" data-psec="${i}">복사</button></div>
        <pre>${esc(s.text)}</pre>
      </div>`).join('');
    $('#promptBody')._secs = secs;
    const text = promptToText(secs);
    $('#copyPrompt').textContent = `프롬프트 복사하기 (${fmtCount(text)} 자)`;
    card.hidden = false;
  }

  function renderActions(o) {
    const has = !!state.persona;
    $('#copyMd').disabled = !has;
    $('#saveImg').disabled = !has;
    $('#copyMd').textContent = has
      ? `마크다운 복사하기 (${fmtCount(toMarkdown(state.persona, o))} 자)`
      : '마크다운 복사하기';
  }

  function renderAll() {
    const o = readOptions();
    renderReceipt(o);
    renderPrompt(o);
    renderActions(o);
  }

  /* ---------- actions ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    toast(`복사했어요 · ${fmtCount(text)} 자`);
  }

  function generate() {
    const o = readOptions();
    state.persona = rollPersona(o);
    state.extras = o.prompt ? rollExtras() : null;
    state.order = randInt(1, 9999);
    state.auth = randInt(100000, 999999);
    state.time = Date.now();
    save();
    saveOptions();
    renderAll();
  }

  function rerollRow(target) {
    if (!state.persona) return;
    const o = readOptions();
    const rowId = target.dataset.row;
    const keys = rowId === 'name' ? ['name'] : $('#receipt')._rows[+rowId].keys;
    rerollKeys(state.persona, keys, o);
    save();
    renderAll();
    const again = $(`[data-row="${rowId}"]`, $('#receipt'));
    if (again) {
      again.classList.add('flash');
      again.focus({ preventScroll: true });
    }
  }

  async function saveImage() {
    if (!state.persona || typeof html2canvas !== 'function') {
      toast('이미지 저장 도구를 불러오지 못했어요');
      return;
    }
    const btn = $('#saveImg');
    btn.disabled = true;
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      const canvas = await html2canvas($('#receipt'), { scale: 2, backgroundColor: null, useCORS: true, logging: false });
      const a = document.createElement('a');
      a.download = `persona_${state.persona.name.en.replace(/\s+/g, '_')}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
      toast('이미지를 저장했어요');
    } catch (e) {
      console.error(e);
      toast('이미지 저장에 실패했어요');
    } finally {
      btn.disabled = false;
    }
  }

  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('pr-theme', t); } catch (e) { /* noop */ }
  }

  /* ---------- init ---------- */
  function init() {
    dedupeNames();
    const sel = $('#nation');
    Object.entries(D.nations).forEach(([id, n]) => sel.add(new Option(n.ko, id)));

    loadOptions();
    renderPicker();

    $('#options').addEventListener('submit', (e) => { e.preventDefault(); generate(); });
    $('#options').addEventListener('change', (e) => {
      if (e.target.closest('#itemPicker')) return;
      saveOptions();
    });
    $('#optPrompt').addEventListener('change', (e) => {
      if (!e.target.checked) { state.extras = null; save(); }
      renderAll();
    });

    $('#itemPicker').addEventListener('change', onPickerChange);
    $('#itemPicker').addEventListener('click', (e) => {
      const b = e.target.closest('[data-expand]');
      if (!b) return;
      const rowsEl = $('.pick-rows', b.closest('.pick-group'));
      rowsEl.hidden = !rowsEl.hidden;
      b.setAttribute('aria-expanded', String(!rowsEl.hidden));
    });
    $('#pickAll').addEventListener('click', () => {
      hidden = new Set();
      syncPicker(); saveOptions(); renderAll();
    });
    $('#pickNone').addEventListener('click', () => {
      hidden = new Set(ALL_ROWS);
      syncPicker(); saveOptions(); renderAll();
    });
    $('#pickReset').addEventListener('click', () => {
      hidden = new Set(DEFAULT_HIDDEN);
      syncPicker(); saveOptions(); renderAll();
    });

    $('#receipt').addEventListener('click', (e) => {
      const row = e.target.closest('[data-row]');
      if (row) rerollRow(row);
    });
    $('#receipt').addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const row = e.target.closest('[data-row]');
      if (row) { e.preventDefault(); rerollRow(row); }
    });

    $('#copyMd').addEventListener('click', () => copyText(toMarkdown(state.persona, readOptions())));
    $('#saveImg').addEventListener('click', saveImage);
    $('#rerollPrompt').addEventListener('click', () => {
      state.extras = rollExtras();
      save();
      renderPrompt(readOptions());
    });
    $('#copyPrompt').addEventListener('click', () => copyText(promptToText($('#promptBody')._secs)));
    $('#promptBody').addEventListener('click', (e) => {
      const b = e.target.closest('[data-psec]');
      if (b) copyText($('#promptBody')._secs[+b.dataset.psec].text);
    });

    $('#themeToggle').addEventListener('click', () => {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });

    load();
    if (state.extras) $('#optPrompt').checked = true;
    renderAll();
  }

  init();
})();
