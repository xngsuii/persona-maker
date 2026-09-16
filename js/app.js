(() => {
  'use strict';

  const D = window.PERSONA_DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const STORE_KEY = 'pr-last-v2';
  const AGE_MIN = 20;
  const AGE_MAX = 60;

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

  const isLight = (hex) => hexToHsl(hex)[2] > 72;

  // 색 항목 하나를 뽑아 색상코드를 붙인다
  function rollColor(list, o, excludeKo) {
    const pool = list.filter((x) => !x.odd && (o.fantasy || x.natural) && x.ko !== excludeKo);
    const c = pick(pool);
    return { ko: c.ko, en: c.en, code: jitterHex(c.hex) };
  }

  /* ---------- options ---------- */
  function readOptions() {
    const minEl = $('#ageMin');
    const maxEl = $('#ageMax');
    let min = clamp(parseInt(minEl.value, 10) || AGE_MIN, AGE_MIN, AGE_MAX);
    let max = clamp(parseInt(maxEl.value, 10) || AGE_MAX, AGE_MIN, AGE_MAX);
    if (min > max) [min, max] = [max, min];
    minEl.value = min;
    maxEl.value = max;
    return {
      gender: $('input[name="gender"]:checked').value,
      nation: $('#nation').value,
      min,
      max,
      fantasy: $('#optFantasy').checked,
      nsfw: $('#optNsfw').checked,
      prompt: $('#optPrompt').checked,
    };
  }

  /* ---------- persona rollers ---------- */
  function rollName(p) {
    const n = D.nations[p.nation];
    const gid = p.gender.id === 'nonbinary' ? pick(['female', 'male']) : p.gender.id;
    const given = pick(n.given[gid]);
    let sur = pick(n.surnames);
    if (!Array.isArray(sur)) sur = gid === 'female' ? sur.f : sur.m;
    if (n.order === 'east') {
      return { ko: sur[0] + (n.spaceKo ? ' ' : '') + given[0], en: `${sur[1]} ${given[1]}` };
    }
    return { ko: `${given[0]} ${sur[0]}`, en: `${given[1]} ${sur[1]}` };
  }

  const ROLL = {
    gender: (p, o) => (o.gender === 'random' ? pick(D.genders) : D.genders.find((g) => g.id === o.gender)),
    nation: (p, o) => (o.nation === 'random' ? pick(Object.keys(D.nations)) : o.nation),
    age: (p, o) => randInt(o.min, o.max),
    name: (p) => rollName(p),
    height: (p) => randInt(...D.heights[p.gender.id]),
    body: (p) => pick(D.bodies.filter((x) => fitsGender(x, p.gender.id))),
    job: () => pick(D.jobs),
    mbti: () => ['EI', 'SN', 'TF', 'JP'].map((s) => s[rand(2)]).join(''),

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
    eyebrow: () => pick(D.eyebrows),
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
    scent: () => pick(D.scents),
    weakness: () => pick(D.weaknesses),

    family: () => pick(D.families),
    trauma: () => pick(D.traumas),
    secret: () => pick(D.secrets),
    love: () => pick(D.loves),

    nsfwRole: () => pick(D.nsfwRoles),
    nsfwStyle: () => pick(D.nsfwStyles),
    nsfwSpot: () => pickN(D.nsfwSpots, 2).join(', '),
    nsfwPref: () => pick(D.nsfwPrefs),
  };

  // 어떤 항목을 다시 뽑을 때 함께 바뀌어야 하는 항목
  const DEPENDS = {
    gender: ['name', 'height', 'body', 'fashion'],
    nation: ['name'],
    hairLen: ['hairStyle'],
  };

  function rollPersona(o) {
    const p = {};
    Object.keys(ROLL).forEach((k) => { p[k] = ROLL[k](p, o); });
    return p;
  }

  function rerollKeys(p, keys, o) {
    const queue = [];
    keys.forEach((k) => {
      queue.push(k);
      (DEPENDS[k] || []).forEach((d) => queue.push(d));
    });
    [...new Set(queue)].forEach((k) => { p[k] = ROLL[k](p, o); });
  }

  /* ---------- sections (receipt + markdown 공용) ---------- */
  const list = (arr) => arr.map(textOf).join(', ');

  // 색 항목: 텍스트용 / 영수증 HTML용 (글자를 해당 색으로)
  const colorText = (c) => `${c.ko} ${c.code}`;
  const colorHtml = (c) =>
    `<span class="swatch${isLight(c.code) ? ' is-light' : ''}" style="color:${c.code}">${esc(c.ko)} ${c.code}</span>`;

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

  const SECTIONS = [
    {
      en: 'BASIC', ko: '기본 정보',
      rows: [
        { label: '성별', keys: ['gender'], v: (p) => p.gender.ko },
        { label: '나이', keys: ['age'], v: (p) => `${p.age}세` },
        { label: '국적', keys: ['nation'], v: (p) => D.nations[p.nation].ko },
        { label: '키·체형', keys: ['height', 'body'], v: (p) => `${p.height}cm · ${p.body.ko}` },
        { label: '직업', keys: ['job'], v: (p) => p.job },
        { label: 'MBTI', keys: ['mbti'], v: (p) => p.mbti },
      ],
    },
    {
      en: 'APPEARANCE', ko: '외형',
      rows: [
        { label: '머리색', keys: ['hairColor', 'hairExtra'], v: (p) => hairText(p), html: (p) => hairText(p, true) },
        { label: '앞머리', keys: ['bangs'], v: (p) => p.bangs.ko },
        { label: '뒷머리', keys: ['hairLen'], v: (p) => `${p.hairLen.ko} · ${p.hairStyle.ko}` },
        { label: '눈동자', keys: ['eyeColor'], v: (p) => eyeText(p), html: (p) => eyeText(p, true) },
        { label: '눈매', keys: ['eyeShape'], v: (p) => p.eyeShape.ko },
        { label: '눈썹', keys: ['eyebrow'], v: (p) => p.eyebrow.ko },
        { label: '인상', keys: ['impression'], v: (p) => `${p.impression.ko} 인상` },
        { label: '피부', keys: ['skin'], v: (p) => p.skin.ko },
        { label: '특징', keys: ['marks'], v: (p) => list(p.marks) },
        { label: '스타일', keys: ['fashion'], v: (p) => p.fashion.ko },
        { label: '목소리', keys: ['voice'], v: (p) => p.voice },
      ],
    },
    {
      en: 'PERSONALITY', ko: '성격',
      rows: [
        { label: '키워드', keys: ['traits'], v: (p) => p.traits.map((t) => `#${t}`).join(' ') },
        { label: '겉과 속', keys: ['gap'], v: (p) => p.gap },
        { label: '가치관', keys: ['values'], v: (p) => p.values },
        { label: '말투', keys: ['speech'], v: (p) => p.speech },
      ],
    },
    {
      en: 'TASTE', ko: '취향 · 습관',
      rows: [
        { label: '호(好)', keys: ['likes'], v: (p) => list(p.likes) },
        { label: '불호(不好)', keys: ['dislikes'], v: (p) => list(p.dislikes) },
        { label: '취미', keys: ['hobbies'], v: (p) => list(p.hobbies) },
        { label: '습관', keys: ['habit'], v: (p) => p.habit },
        { label: '체향', keys: ['scent'], v: (p) => p.scent },
        { label: '약점', keys: ['weakness'], v: (p) => p.weakness },
      ],
    },
    {
      en: 'BACKGROUND', ko: '배경',
      rows: [
        { label: '가족관계', keys: ['family'], v: (p) => p.family },
        { label: '트라우마', keys: ['trauma'], v: (p) => p.trauma },
        { label: '비밀', keys: ['secret'], v: (p) => p.secret },
        { label: '연애관', keys: ['love'], v: (p) => p.love },
      ],
    },
    {
      en: 'AFTER DARK', ko: 'NSFW', only: 'nsfw',
      rows: [
        { label: '성향', keys: ['nsfwRole'], v: (p) => p.nsfwRole },
        { label: '스타일', keys: ['nsfwStyle'], v: (p) => p.nsfwStyle },
        { label: '민감한 곳', keys: ['nsfwSpot'], v: (p) => p.nsfwSpot },
        { label: '선호', keys: ['nsfwPref'], v: (p) => p.nsfwPref },
      ],
    },
  ];

  const visibleSections = (o) => SECTIONS.filter((s) => !s.only || o[s.only]);

  const summaryLine = (p) =>
    `${D.nations[p.nation].ko} · ${p.gender.ko} · ${p.age}세 · ${p.job}`;

  function toMarkdown(p, o) {
    const out = [`# ${p.name.ko} (${p.name.en})`, '', `> ${summaryLine(p)}`, ''];
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
  function genderTag(p) {
    const mature = p.age >= 30 || p.impression.mature;
    if (mature && p.gender.id !== 'nonbinary') return `mature ${p.gender.id}`;
    return p.gender.tag;
  }

  function eyeTags(p) {
    const e = p.eyeColor;
    if (!e.odd) return `${e.en} eyes`;
    return `heterochromia, ${e.colors[0].en} eyes, ${e.colors[1].en} eyes`;
  }

  function buildPrompt(p, x) {
    return [
      {
        title: '외형',
        text: joinTags([
          genderTag(p),
          `${p.hairLen.len} ${p.hairColor.en} hair`, p.hairLen.cut, p.hairStyle.tag, p.hairExtra.tag, p.bangs.tag,
          eyeTags(p), p.eyeShape.tag, p.eyebrow.tag,
          p.skin.tag, p.body.tag, heightTag(p),
          ...p.marks.map((m) => m.tag),
        ]),
      },
      { title: '표정', text: joinTags(x.expression) },
      { title: '의상', text: p.fashion.tag },
    ];
  }

  // 전체 복사는 NovelAI에 바로 붙여넣을 수 있게 한 줄로
  const promptToText = (secs) => joinTags(secs.map((s) => s.text));

  /* ---------- state ---------- */
  const state = { persona: null, extras: null, order: 0, time: null };

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* noop */ }
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && s.persona && s.persona.name) Object.assign(state, s);
    } catch (e) { /* noop */ }
  }

  /* ---------- rendering ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtCount = (str) => Array.from(str).length.toLocaleString('ko-KR');
  const pad = (n, l = 2) => String(n).padStart(l, '0');

  const rule = (type) =>
    `<div class="rule ${type}" aria-hidden="true">${(type === 'dots' ? '•' : '-').repeat(type === 'dots' ? 120 : 80)}</div>`;

  function barcode(seed) {
    let s = seed * 9301 + 49297;
    const bars = [];
    for (let i = 0; i < 46; i++) {
      s = (s * 9301 + 49297) % 233280;
      const w = 1 + Math.floor((s / 233280) * 3);
      bars.push(`<i style="width:${w}px;margin-right:${i % 3 === 0 ? 2 : 1}px"></i>`);
    }
    return `<div class="barcode" aria-hidden="true">${bars.join('')}</div>`;
  }

  function fmtTime(t) {
    const d = new Date(t);
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function renderReceipt(o) {
    const el = $('#receipt');
    const p = state.persona;

    if (!p) {
      el.innerHTML = `<div class="r-body">
        <p class="r-kicker">PERSONA RECEIPT</p>
        ${rule('dots')}
        <div class="r-empty">
          <p class="big">NO ORDER YET</p>
          <p class="r-small">왼쪽에서 조건을 고르고<br>[페르소나 생성]을 눌러주세요.</p>
        </div>
        ${rule('dots')}
        <p class="r-center r-small">Thank you for creating with us.</p>
      </div>`;
      return;
    }

    const secs = visibleSections(o);
    const traitCount = secs.reduce((n, s) => n + s.rows.length, 0);
    let rowIndex = 0;
    const sectionHtml = secs.map((s, i) => {
      const rows = s.rows.map((r) => {
        const idx = rowIndex++;
        return `<div class="r-row" role="button" tabindex="0" data-row="${idx}" title="이 항목만 다시 뽑기">
          <span class="r-re" data-html2canvas-ignore aria-hidden="true">↻</span>
          <span class="r-label">${esc(r.label)}</span>
          <span class="r-val">${r.html ? r.html(p) : esc(r.v(p))}</span>
        </div>`;
      }).join('');
      return `<div class="r-sec-head"><span class="en">${pad(i + 1)} ${s.en}</span><span class="ko">${esc(s.ko)}</span></div>
        ${rows}
        ${rule('dots')}`;
    }).join('');

    el.innerHTML = `<div class="r-body">
      <p class="r-kicker">PERSONA RECEIPT</p>
      <h1 class="r-name rr" role="button" tabindex="0" data-row="name" title="이름만 다시 뽑기">${esc(p.name.ko)}</h1>
      <p class="r-roman">${esc(p.name.en)}</p>
      <p class="r-meta">${esc(summaryLine(p))}</p>
      <div class="r-info"><span>ORDER# ${pad(state.order, 4)}</span><span>${fmtTime(state.time)}</span></div>
      ${rule('dots')}
      <div class="r-sec-head"><span class="en">ITEM</span><span class="ko">DETAIL</span></div>
      ${rule('dash')}
      ${sectionHtml}
      <div class="r-total"><span>TOTAL</span><span>${traitCount} ×</span></div>
      ${rule('dash')}
      ${barcode(state.order)}
      <p class="barcode-num">${pad(state.order, 4)} ${String(state.time).slice(-8)}</p>
      <p class="r-center r-dup">***ORIGINAL PERSONA***</p>
      <p class="r-center r-small">KEEP FOR YOUR ROLEPLAY</p>
      ${rule('dots')}
      <p class="r-center r-small">Thank you for creating with us.</p>
    </div>`;

    // row index → section row 매핑 저장
    el._rows = secs.flatMap((s) => s.rows);
  }

  function renderPrompt(o) {
    const card = $('#promptCard');
    if (!o.prompt || !state.persona) {
      card.hidden = true;
      return;
    }
    if (!state.extras) state.extras = rollExtras();
    const secs = buildPrompt(state.persona, state.extras);
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
    state.time = Date.now();
    save();
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
    const sel = $('#nation');
    Object.entries(D.nations).forEach(([id, n]) => sel.add(new Option(n.ko, id)));

    $('#options').addEventListener('submit', (e) => { e.preventDefault(); generate(); });
    $('#optNsfw').addEventListener('change', () => { save(); renderAll(); });
    $('#optPrompt').addEventListener('change', (e) => {
      if (!e.target.checked) { state.extras = null; save(); }
      renderAll();
    });
    ['#ageMin', '#ageMax'].forEach((s) => $(s).addEventListener('change', readOptions));

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
