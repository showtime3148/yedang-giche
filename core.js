/* 예당고 1학년 기출 유형 연습 - 공통 헬퍼 */
window.BANK = { kor: [], eng: [], math: [], soc: [], sci: [], his: [] };
window.GUIDE = {};

window.U = (function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (a) => a[R(0, a.length - 1)];
  const shuffle = (a) => {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const num = (n) => (n < 0 ? '−' + -n : String(n));
  // 분수 표시
  const fs = (n, d) => {
    const g = gcd(n, d);
    n /= g; d /= g;
    if (d < 0) { n = -n; d = -d; }
    if (d === 1) return num(n);
    return (n < 0 ? '−' : '') + '<span class="fr"><i>' + Math.abs(n) + '</i><i>' + d + '</i></span>';
  };
  // 정수 정답 주변에서 5지선다 보기 만들기 (오름차순)
  const intChoices = (ans, opt) => {
    opt = opt || {};
    const min = opt.min === undefined ? -Infinity : opt.min;
    const set = new Set([ans]);
    const cands = [];
    for (let d = 1; d <= 12; d++) { cands.push(ans + d, ans - d); }
    // 약간 섞어서 너무 규칙적이지 않게
    const near = shuffle(cands.slice(0, 8)).concat(cands.slice(8));
    for (const c of near) {
      if (set.size >= 5) break;
      if (c < min) continue;
      set.add(c);
    }
    let arr = Array.from(set).sort((a, b) => a - b);
    return { choices: arr.map((v) => (opt.fmt ? opt.fmt(v) : num(v))), ans: arr.indexOf(ans) + 1 };
  };
  // <보기> ㄱㄴㄷ(ㄹ) 조합형 문항 만들기
  const LABELS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ'];
  const buildBogi = (q) => {
    const n = q.bogi.items.length;
    const truth = q.bogi.truth;
    const correct = [];
    truth.forEach((t, i) => t && correct.push(i));
    const all = [];
    for (let m = 1; m < 1 << n; m++) {
      const s = [];
      for (let i = 0; i < n; i++) if (m & (1 << i)) s.push(i);
      if (n >= 4 && (s.length < 2 || s.length > 3)) continue;
      all.push(s);
    }
    const key = (s) => s.join(',');
    const ck = key(correct);
    const others = shuffle(all.filter((s) => key(s) !== ck)).slice(0, 4);
    const opts = others.concat([correct]).sort((a, b) => a.length - b.length || key(a).localeCompare(key(b)));
    q.choices = opts.map((s) => s.map((i) => LABELS[i]).join(', '));
    q.ans = opts.findIndex((s) => key(s) === ck) + 1;
    q.box = q.bogi.items.map((t, i) => LABELS[i] + '. ' + t).join('\n');
    q.boxTitle = '보 기';
    q.shuffle = false;
    const why = q.bogi.why || [];
    q.explain =
      (q.explain ? q.explain + '\n' : '') +
      q.bogi.items.map((t, i) => LABELS[i] + '(' + (truth[i] ? '옳음' : '옳지 않음') + ') ' + (why[i] || '')).join('\n');
    return q;
  };
  // 순서 배열형 보기 만들기: order = 올바른 순서(문자열 배열), 정답 + 오답 순열
  const orderChoices = (order) => {
    const seen = new Set([order.join('')]);
    const list = [order];
    let guard = 0;
    while (list.length < 5 && guard++ < 200) {
      const p = shuffle(order);
      const k = p.join('');
      if (!seen.has(k)) { seen.add(k); list.push(p); }
    }
    const sorted = shuffle(list);
    return { choices: sorted.map((o) => o.map((x) => '(' + x + ')').join(' → ')), ans: sorted.findIndex((o) => o.join('') === order.join('')) + 1 };
  };
  // 2집합 벤다이어그램 (색칠 영역: AB, A_, _B, __ 중 포함할 셀)
  let vid = 0;
  const venn = (cells) => {
    const id = 'v' + ++vid;
    const shade = 'var(--accent)';
    const A = '<circle cx="85" cy="70" r="42"/>';
    const B = '<circle cx="135" cy="70" r="42"/>';
    let s = '<svg viewBox="0 0 220 140" class="fig-svg" role="img" aria-label="벤다이어그램"><defs>';
    s += '<clipPath id="' + id + 'cA"><circle cx="85" cy="70" r="42"/></clipPath>';
    s += '<clipPath id="' + id + 'cB"><circle cx="135" cy="70" r="42"/></clipPath>';
    s += '<mask id="' + id + 'mB"><rect width="220" height="140" fill="#fff"/><circle cx="135" cy="70" r="42" fill="#000"/></mask>';
    s += '<mask id="' + id + 'mA"><rect width="220" height="140" fill="#fff"/><circle cx="85" cy="70" r="42" fill="#000"/></mask>';
    s += '<mask id="' + id + 'mAB"><rect width="220" height="140" fill="#fff"/><circle cx="85" cy="70" r="42" fill="#000"/><circle cx="135" cy="70" r="42" fill="#000"/></mask>';
    s += '</defs>';
    if (cells.indexOf('AB') >= 0) s += '<circle cx="85" cy="70" r="42" clip-path="url(#' + id + 'cB)" fill="' + shade + '" opacity=".55"/>';
    if (cells.indexOf('A_') >= 0) s += '<circle cx="85" cy="70" r="42" mask="url(#' + id + 'mB)" fill="' + shade + '" opacity=".55"/>';
    if (cells.indexOf('_B') >= 0) s += '<circle cx="135" cy="70" r="42" mask="url(#' + id + 'mA)" fill="' + shade + '" opacity=".55"/>';
    if (cells.indexOf('__') >= 0) s += '<rect x="2" y="2" width="216" height="136" mask="url(#' + id + 'mAB)" fill="' + shade + '" opacity=".55"/>';
    s += '<rect x="2" y="2" width="216" height="136" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    s += '<g fill="none" stroke="currentColor" stroke-width="1.5">' + A + B + '</g>';
    s += '<g fill="currentColor" font-size="14" font-family="serif" font-style="italic"><text x="55" y="30">A</text><text x="155" y="30">B</text><text x="10" y="20">U</text></g></svg>';
    return s;
  };
  // 에너지 도표 SVG (발열/흡열)
  const energy = (exo) => {
    const y1 = exo ? 40 : 90, y2 = exo ? 90 : 40;
    return (
      '<svg viewBox="0 0 240 140" class="fig-svg" role="img" aria-label="반응 진행에 따른 에너지 변화">' +
      '<g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M30 10 V120 H225"/><path d="M45 ' + y1 + ' H105 L135 ' + y2 + ' H195" stroke-width="2.5" stroke="var(--accent)"/></g>' +
      '<g fill="currentColor" font-size="11"><text x="4" y="14">에너지</text><text x="150" y="134">반응의 진행</text>' +
      '<text x="48" y="' + (y1 - 6) + '">반응물</text><text x="150" y="' + (y2 - 6) + '">생성물</text></g></svg>'
    );
  };
  return { R, pick, shuffle, gcd, num, fs, intChoices, buildBogi, orderChoices, venn, energy, LABELS };
})();

// 문제 추가 헬퍼
window.addQ = function (subj, list) {
  list.forEach((q) => { q.subj = subj; window.BANK[subj].push(q); });
};
