/* 예당고 1학년 기출 유형 연습 - 앱 */
(function () {
  'use strict';
  const SUBJ = [
    { id: 'kor', name: '공통국어', icon: '📖', color: '#d9485f', desc: '비문학·현대시·고전 소설·문법' },
    { id: 'eng', name: '공통영어', icon: '🔤', color: '#2f7de1', desc: '주제·빈칸·어법·어휘·삽입·요약' },
    { id: 'math', name: '공통수학', icon: '📐', color: '#7c5cff', desc: '도형의 방정식·집합', gen: true },
    { id: 'soc', name: '통합사회', icon: '🏛️', color: '#e08a0b', desc: '정의·시장·인권' },
    { id: 'sci', name: '통합과학', icon: '🧪', color: '#0f9d68', desc: '진화·산화환원·산염기·반응열' },
    { id: 'his', name: '한국사', icon: '📜', color: '#a0522d', desc: '일제 강점기~현대' }
  ];
  const CIRC = ['①', '②', '③', '④', '⑤'];
  const $app = document.getElementById('app');

  /* ---------- 저장소 ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 저장 불가 환경 */ } }
  };
  const getStats = () => store.get('yd_v1_stats', {});
  const getNotes = () => store.get('yd_v1_notes', {});
  const getPast = () => store.get('yd_v1_past', {});
  const PAST = window.PAST || {};
  const PMAP = window.PASTMAP || {};

  /* ---------- 유틸 ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const subj = (id) => SUBJ.find((s) => s.id === id);
  const round1 = (x) => Math.round(x * 10) / 10;

  function rich(text) {
    const lines = String(text).split('\n');
    let out = '', buf = [], tbl = [];
    const flushP = () => { if (buf.length) { out += '<p>' + buf.map(esc).join('<br>') + '</p>'; buf = []; } };
    const flushT = () => {
      if (tbl.length) {
        out += '<table class="tbl">' + tbl.map((r) => '<tr>' + r.replace(/^\||\|$/g, '').split('|').map((c) => '<td>' + esc(c.trim()) + '</td>').join('') + '</tr>').join('') + '</table>';
        tbl = [];
      }
    };
    lines.forEach((ln) => {
      if (/^\s*\|/.test(ln)) { flushP(); tbl.push(ln.trim()); }
      else if (ln.trim() === '') { flushP(); flushT(); }
      else { flushT(); buf.push(ln); }
    });
    flushP(); flushT();
    return out;
  }

  /* ---------- 문제 만들기(생성) ---------- */
  function inst(e) {
    let q;
    if (e.gen) {
      const g = e.gen();
      q = Object.assign({}, g, { type: e.type, pts: e.pts, subj: e.subj, kind: e.kind || g.kind });
    } else {
      q = JSON.parse(JSON.stringify(e));
    }
    if (q.bogi) U.buildBogi(q);
    if (q.order) {
      const o = U.orderChoices(q.order);
      q.choices = o.choices; q.ans = o.ans; q.shuffle = false;
    }
    if (q.kind !== 'essay' && q.shuffle !== false && !q.posChoices) {
      const idx = U.shuffle(q.choices.map((_, i) => i));
      q.ans = idx.indexOf(q.ans - 1) + 1;
      q.choices = idx.map((i) => q.choices[i]);
    }
    q.uid = Math.random().toString(36).slice(2, 9);
    return q;
  }

  function mcqTypes(sid) {
    const m = new Map();
    window.BANK[sid].forEach((e) => {
      if (e.kind === 'essay') return;
      m.set(e.type, (m.get(e.type) || 0) + 1);
    });
    return Array.from(m, ([name, n]) => ({ name, n }));
  }

  function draw(sid, types, n, withEssay) {
    const pool = window.BANK[sid].filter((e) => e.kind !== 'essay' && types.has(e.type));
    const units = [], gmap = {};
    pool.forEach((e) => {
      if (e.group) (gmap[e.group] = gmap[e.group] || []).push(e);
      else units.push([e]);
    });
    Object.keys(gmap).forEach((k) => units.push(gmap[k]));
    let out = [];
    for (let pass = 0; out.length < n && pass < 5 && units.length; pass++) {
      const list = pass === 0 ? U.shuffle(units) : U.shuffle(units.filter((u) => u.every((e) => e.gen)));
      if (!list.length) break;
      for (const u of list) { if (out.length >= n) break; out = out.concat(u); }
    }
    out = out.slice(0, n).map(inst);
    if (withEssay) {
      const es = U.shuffle(window.BANK[sid].filter((e) => e.kind === 'essay'));
      out = out.concat(es.slice(0, Math.min(2, es.length)).map(inst));
    }
    return out;
  }

  /* ---------- 상태 ---------- */
  const S = {
    view: 'home', sid: null, tab: 'play',
    cfg: { types: null, n: 10, mode: 'practice', essay: false },
    run: null, timer: null, msg: '', past: null
  };
  function stopTimer() { if (S.timer) { clearInterval(S.timer); S.timer = null; } }

  function go(view, extra) {
    stopTimer();
    Object.assign(S, { view }, extra || {});
    render();
    window.scrollTo({ top: 0 });
  }

  function startRun(questions, opt) {
    if (!questions.length) { S.msg = '선택한 유형에 풀 수 있는 문제가 없어요.'; render(); return; }
    S.msg = '';
    S.run = {
      qs: questions, idx: 0, ans: questions.map(() => null), text: questions.map(() => ''),
      checked: questions.map(() => false), grade: questions.map(() => null),
      mode: opt.mode, from: opt.from, started: Date.now(), sid: S.sid
    };
    go('quiz');
  }

  /* ---------- 화면: 홈 ---------- */
  function viewHome() {
    const st = getStats();
    let c = 0, t = 0;
    Object.keys(st).forEach((s) => Object.keys(st[s].types || {}).forEach((k) => { c += st[s].types[k].c; t += st[s].types[k].t; }));
    const notes = getNotes();
    const nn = Object.keys(notes).reduce((a, k) => a + notes[k].length, 0);
    const total = SUBJ.reduce((a, s) => a + window.BANK[s.id].length, 0);
    return (
      '<div class="wrap">' +
      '<div class="hero"><h2>예당고 1학년 기출 유형 연습</h2>' +
      '<p>작년 기출문제를 먼저 풀어 보고, 이어서 같은 유형의 예상문제로 연습하세요.</p>' +
      '<div class="stats"><span class="stat"><b>' + total + '</b>문제 유형 은행</span>' +
      '<span class="stat"><b>' + t + '</b>푼 문제' + (t ? ' · 정답률 ' + Math.round((c / t) * 100) + '%' : '') + '</span>' +
      '<span class="stat"><b>' + nn + '</b>오답노트</span></div></div>' +
      '<div class="grid">' +
      SUBJ.map((s) => {
        const types = mcqTypes(s.id).length;
        const cnt = window.BANK[s.id].filter((e) => e.kind !== 'essay').length;
        return (
          '<button class="scard" data-act="open" data-sid="' + s.id + '" style="--c:' + s.color + '">' +
          '<h3><span class="ic" aria-hidden="true">' + s.icon + '</span>' + s.name + '</h3>' +
          '<p>' + s.desc + '</p>' +
          '<div class="meta">' + (PAST[s.id] ? '<span class="chip c">기출 ' + PAST[s.id].n + '문항</span>' : '') + '<span class="chip c">예상 ' + types + '개 유형</span><span class="chip c">객관식 ' + cnt + (s.gen ? '+' : '') + '</span>' +
          (s.gen ? '<span class="chip gen">매번 새 문제 생성</span>' : '') + '</div></button>'
        );
      }).join('') +
      '</div>' +
      '<footer class="note">작년 기출문제의 출제 유형을 분석해 새로 만든 연습용 문항입니다. 해설은 학습 참고용이며, 실제 시험 범위는 학교 공지를 따르세요.</footer>' +
      '</div>'
    );
  }

  /* ---------- 화면: 과목 ---------- */
  function viewSubject() {
    const s = subj(S.sid);
    const g = window.GUIDE[S.sid];
    const types = mcqTypes(S.sid);
    if (!S.cfg.types) S.cfg.types = new Set(types.map((t) => t.name));
    const cfg = S.cfg;
    let body = '';
    if (S.tab === 'past') {
      const P = PAST[S.sid], pr = getPast()[S.sid] || [];
      body = '<div class="card"><h3>① 작년 기출문제 풀기</h3>' +
        (P ? '<p style="margin:0 0 6px;color:var(--ink-2)">작년 ' + s.name + ' 시험지를 그대로 보면서 풀어 보세요. 객관식 <b>' + P.n + '문항</b>의 답을 고르고 채점하면, 결과 화면에서 바로 <b>② 예상문제</b>로 이어집니다.</p>' +
        '<p style="margin:0;color:var(--ink-2);font-size:.9rem">서술형은 채점 대상이 아니에요. 시험지는 두 단으로 나뉘어 위에서 아래로 이어서 읽으면 됩니다.</p>' +
        (pr.length ? '<div class="empty" style="text-align:left;margin-top:10px">최근 기출 점수 · ' + pr.slice(-3).reverse().map((x) => x.date + ' ' + x.right + '/' + x.total).join(' · ') + '</div>' : '') +
        '<div class="navrow"><button class="btn primary grow" data-act="startpast">기출문제 풀기 시작</button></div>'
        : '<div class="empty">이 과목의 기출문제 자료가 없어요.</div>') + '</div>' +
        '<div class="card hint"><b>② 예상문제</b> · 기출을 푼 뒤에는 같은 출제 유형으로 만든 예상문제를 풀어 실력을 굳혀요. (위 탭에서도 바로 시작할 수 있어요.)</div>';
    } else if (S.tab === 'play') {
      const selectedCount = types.filter((t) => cfg.types.has(t.name)).length;
      body =
        '<div class="card"><h3>② 예상문제 · 어떤 유형을 풀어 볼까요?</h3>' +
        '<div class="opts"><button class="btn sm" data-act="alltypes">전체 선택</button><button class="btn sm" data-act="notypes">전체 해제</button></div>' +
        '<div class="typelist">' +
        types.map((t) => '<label class="tcheck"><input type="checkbox" data-act="type" data-name="' + esc(t.name) + '"' + (cfg.types.has(t.name) ? ' checked' : '') + '><span>' + esc(t.name) + '</span><small>' + t.n + (s.gen ? '+' : '') + '</small></label>').join('') +
        '</div></div>' +
        '<div class="card"><h3>풀이 방식</h3>' +
        '<div class="opts"><span class="lbl">문항 수</span><div class="seg" role="group" aria-label="문항 수">' +
        [5, 10, 15, 20].map((n) => '<button data-act="n" data-n="' + n + '" aria-pressed="' + (cfg.n === n) + '">' + n + '문항</button>').join('') + '</div></div>' +
        '<div class="opts"><span class="lbl">방식</span><div class="seg" role="group" aria-label="방식">' +
        '<button data-act="mode" data-m="practice" aria-pressed="' + (cfg.mode === 'practice') + '">연습 (문항마다 채점)</button>' +
        '<button data-act="mode" data-m="exam" aria-pressed="' + (cfg.mode === 'exam') + '">시험 (끝에 채점)</button></div></div>' +
        '<label class="tcheck" style="max-width:360px"><input type="checkbox" data-act="essay"' + (cfg.essay ? ' checked' : '') + '><span>서술형도 포함 (최대 2문항, 자가 채점)</span></label>' +
        (S.msg ? '<div class="banner bad" style="margin-top:12px">' + esc(S.msg) + '</div>' : '') +
        '<div class="navrow"><span class="chip">선택한 유형 ' + selectedCount + '/' + types.length + '</span>' +
        '<button class="btn primary grow" data-act="start"' + (selectedCount ? '' : ' disabled') + '>' + (s.gen ? '새 문제 생성해서 풀기' : '문제 풀기 시작') + '</button></div></div>';
    } else if (S.tab === 'guide') {
      body = '<div class="card"><h3>' + s.name + ' 출제 경향</h3><p style="margin:0;color:var(--ink-2)">' + esc(g.summary) + '</p></div>' +
        '<div class="card">' + g.types.map((t) => '<div class="guide-item"><h4>' + esc(t.name) + '</h4><p>' + esc(t.tips) + '</p><div class="ex">기출 문구 예 · ' + esc(t.ex) + '</div></div>').join('') + '</div>';
    } else {
      const st = (getStats()[S.sid] || {});
      const tys = st.types || {};
      const notes = (getNotes()[S.sid] || []);
      const keys = Object.keys(tys);
      const pr2 = getPast()[S.sid] || [];
      body = '<div class="card"><h3>기출 풀이 기록</h3>' + (pr2.length ? pr2.slice().reverse().slice(0, 8).map((x) => '<div class="bar"><span>' + esc(x.date) + '</span><span class="track"><i class="' + (x.rate < 50 ? 'low' : x.rate < 80 ? 'mid' : '') + '" style="width:' + x.rate + '%"></i></span><b>' + x.right + '/' + x.total + '</b></div>').join('') : '<div class="empty">아직 기출을 풀지 않았어요.</div>') + '</div>' +
        '<div class="card"><h3>예상문제 유형별 정답률</h3>' +
        (keys.length ? keys.map((k) => barRow(k, tys[k].c, tys[k].t)).join('') : '<div class="empty">아직 푼 문제가 없어요. 문제를 풀면 유형별 정답률이 여기에 쌓입니다.</div>') + '</div>' +
        '<div class="card"><h3>오답노트 (' + notes.length + ')</h3>' +
        (notes.length ? '<p style="color:var(--ink-2);margin-top:0">틀렸던 문제입니다. 다시 풀어서 맞히면 자동으로 삭제됩니다.</p><div class="navrow" style="margin-top:0"><button class="btn primary grow" data-act="solvenotes">오답노트 풀기</button><button class="btn" data-act="clearnotes">비우기</button></div>' : '<div class="empty">틀린 문제가 없어요. 👍</div>') + '</div>' +
        ((st.sessions && st.sessions.length) ? '<div class="card"><h3>최근 기록</h3>' + st.sessions.slice().reverse().slice(0, 8).map((x) => '<div class="bar"><span>' + esc(x.date) + '</span><span class="track"><i class="' + (x.rate < 50 ? 'low' : x.rate < 80 ? 'mid' : '') + '" style="width:' + x.rate + '%"></i></span><b>' + x.right + '/' + x.total + '</b></div>').join('') + '</div>' : '');
    }
    return (
      '<div class="wrap"><div class="top"><button class="btn sm" data-act="home">← 과목 선택</button><h1>' + s.icon + ' ' + s.name + '</h1><span class="sp"></span></div>' +
      '<div class="tabs" role="tablist">' +
      [['past', '① 기출 풀기'], ['play', '② 예상문제'], ['guide', '유형 가이드'], ['record', '내 기록']].map((t) => '<button class="tab" role="tab" data-act="tab" data-t="' + t[0] + '" aria-selected="' + (S.tab === t[0]) + '">' + t[1] + '</button>').join('') +
      '</div>' + body + '</div>'
    );
  }

  function barRow(label, c, t) {
    const r = t ? Math.round((c / t) * 100) : 0;
    return '<div class="bar"><span>' + esc(label) + '</span><span class="track"><i class="' + (r < 50 ? 'low' : r < 80 ? 'mid' : '') + '" style="width:' + r + '%"></i></span><b>' + r + '% <small style="font-weight:400;color:var(--ink-2)">(' + round1(c) + '/' + t + ')</small></b></div>';
  }

  /* ---------- 화면: 기출 ---------- */
  function sheetRows(P, a, list) {
    let h = '';
    (list || Array.from({ length: P.n }, (_, i) => i + 1)).forEach((no) => { const i = no - 1;
      h += '<div class="arow"><span class="no">' + (i + 1) + '</span>' + [0, 1, 2, 3, 4].map((k) => '<button class="ab' + (a[i] === k ? ' on' : '') + '" data-act="pa" data-q="' + i + '" data-k="' + k + '" aria-pressed="' + (a[i] === k) + '" aria-label="' + (i + 1) + '번 ' + CIRC[k] + '">' + CIRC[k] + '</button>').join('') + '</div>';
    });
    return h;
  }
  function viewPast() {
    const p = S.past, P = PAST[p.sid], s = subj(p.sid);
    const done = p.ans.filter((x) => x !== null).length;
    return '<div class="wrap pastwrap"><div class="top"><button class="btn sm" data-act="quitpast">그만 풀기</button><h1>' + s.icon + ' ' + s.name + ' 기출</h1><span class="sp"></span><span class="chip">작년 시험지</span></div>' +
      '<div class="paper">' + P.strips.map((b, i) => '<img class="strip" alt="시험지 ' + (i + 1) + '/' + P.strips.length + '" loading="lazy" src="data:image/jpeg;base64,' + b + '">' +
        (((PMAP[p.sid] || [])[i] || []).length ? '<div class="inl"><div class="inlt">✏️ 이 단의 문항 답 체크</div>' + sheetRows(P, p.ans, PMAP[p.sid][i]) + '</div>' : '')).join('') + '</div>' +
      '<div class="sheet' + (p.open ? ' open' : '') + '" id="sheet"><button class="sheetbar" data-act="togglesheet" aria-expanded="' + p.open + '"><b>답안지</b><span id="sheetcnt">' + done + '/' + P.n + ' 선택</span><span>' + (p.open ? '▼ 접기' : '▲ 펼치기') + '</span></button>' +
      '<div class="sheetbody" id="sheetbody">' + sheetRows(P, p.ans) + '<div class="navrow"><button class="btn primary grow" data-act="gradepast">채점하기</button></div><div id="sheetmsg" class="hint"></div></div></div></div>';
  }
  function viewPastResult() {
    const p = S.past, P = PAST[p.sid], s = subj(p.sid), res = p.res;
    const rate = Math.round(res.right / P.n * 100);
    let h = '<div class="wrap"><div class="top"><button class="btn sm" data-act="back">← ' + s.name + '</button><h1>기출 결과</h1><span class="sp"></span></div>';
    h += '<div class="card"><div class="score"><div class="ring" style="--p:' + rate + '"><div><span><b>' + rate + '%</b><small>' + res.right + '/' + P.n + '</small></span></div></div>' +
      '<div><div style="font-size:1.2rem;font-weight:800">' + (rate >= 90 ? '훌륭해요! 🏆' : rate >= 70 ? '잘하고 있어요 👍' : rate >= 50 ? '조금만 더 연습해요 💪' : '예상문제로 유형을 익혀 봐요 📚') + '</div>' +
      '<div style="color:var(--ink-2)">틀린 문항: ' + (res.wrong.length ? res.wrong.map((i) => (i + 1) + '번').join(', ') : '없음') + '</div></div></div></div>';
    h += '<div class="card"><h3>문항별 정답표</h3><div class="rgrid">' + P.ans.map((a, i) => {
      const my = p.ans[i], ok = my === a - 1;
      return '<div class="rcell ' + (ok ? 'ok' : 'bad') + '"><b>' + (i + 1) + '</b><span>정답 ' + CIRC[a - 1] + '</span><span>' + (my === null ? '미응답' : '내 답 ' + CIRC[my]) + '</span></div>';
    }).join('') + '</div><p class="hint" style="margin:10px 0 0">시험지로 돌아가 틀린 문항을 다시 확인해 보세요. 해설은 아래 예상문제에서 같은 유형으로 연습할 수 있어요.</p></div>';
    h += '<div class="card"><h3>다음 단계 · ② 예상문제</h3><p style="margin:0;color:var(--ink-2)">방금 푼 기출과 같은 출제 유형의 예상문제 10문항을 바로 풀어 볼까요?</p>' +
      '<div class="navrow"><button class="btn" data-act="reviewpast">시험지 다시 보기</button><button class="btn primary grow" data-act="toplaystart">예상문제 바로 풀기</button></div>' +
      '<div class="navrow" style="margin-top:8px"><button class="btn sm" data-act="toplay">유형 고르기</button></div></div></div>';
    return h;
  }

  /* ---------- 문항 본문 ---------- */
  function qBody(q, state) {
    // state: {sel, text, checked, review}
    let h = '';
    if (q.passage) h += '<div class="passage">' + rich(q.passage) + '</div>';
    if (q.box) h += '<div class="bogi"><span class="bt">〈' + esc(q.boxTitle || '보 기') + '〉</span>' + rich(q.box) + '</div>';
    if (q.fig) h += '<div class="fig">' + q.fig + '</div>';
    h += '<div class="stem">' + esc(q.stem) + '</div>';
    return h;
  }

  function choiceHtml(q, state) {
    const locked = state.locked;
    const cls = (i) => {
      if (!state.reveal) return '';
      if (i === q.ans - 1) return ' ok';
      if (state.sel === i) return ' bad';
      return '';
    };
    const items = q.choices.map((c, i) =>
      '<button class="choice' + cls(i) + '" data-act="pick" data-i="' + i + '" aria-pressed="' + (state.sel === i) + '"' + (locked ? ' disabled' : '') + '>' +
      (q.posChoices ? '' : '<span class="n">' + CIRC[i] + '</span>') + '<span>' + esc(c) + '</span></button>'
    ).join('');
    return '<div class="' + (q.posChoices ? 'poschoices' : 'choices') + '" role="group" aria-label="선택지">' + items + '</div>';
  }

  function essayAnswerHtml(q) {
    return '<div class="banner" style="background:var(--surface-2)">모범 답안</div><div class="explain">' + esc(q.model) + '</div>' +
      (q.rubric ? '<p style="margin:10px 0 0;font-weight:700;font-size:.92rem">채점 기준</p><ul class="rubric">' + q.rubric.map((r) => '<li>' + esc(r) + '</li>').join('') + '</ul>' : '');
  }

  /* ---------- 화면: 퀴즈 ---------- */
  function viewQuiz() {
    const r = S.run, q = r.qs[r.idx], i = r.idx, n = r.qs.length;
    const practice = r.mode === 'practice';
    const essay = q.kind === 'essay';
    const checked = r.checked[i];
    let h = '<div class="wrap"><div class="top"><button class="btn sm" data-act="quit">그만 풀기</button><h1>' + subj(r.sid).icon + ' ' + subj(r.sid).name + '</h1><span class="sp"></span><span class="chip">' + (practice ? '연습' : '시험') + '</span></div>';
    h += '<div class="prog" aria-hidden="true"><i style="width:' + ((i + (checked ? 1 : 0)) / n * 100) + '%"></i></div>';
    h += '<div class="card"><div class="qhead"><span class="qnum">' + (i + 1) + '<small style="font-size:.8rem;color:var(--ink-2);font-weight:600"> / ' + n + '</small></span>' +
      '<span class="chip">' + q.pts + '점</span><span class="chip c" style="--c:' + subj(r.sid).color + '">' + esc(q.type) + '</span>' +
      (q.kind === 'essay' ? '<span class="chip">서술형</span>' : '') +
      (practice ? '' : '<span class="timer" id="timer">00:00</span>') + '</div>';
    h += qBody(q, {});
    if (essay) {
      h += '<textarea class="ans" id="essay" placeholder="답을 직접 써 보세요. (실제 시험처럼 문장형으로)" ' + (checked ? 'readonly' : '') + '>' + esc(r.text[i]) + '</textarea>';
      if (checked) {
        h += essayAnswerHtml(q);
        h += '<p style="margin:12px 0 4px;font-weight:700">내 답안을 모범 답안과 비교해 자가 채점하세요.</p><div class="selfgrade">' +
          [[1, '✔ 맞게 썼어요'], [0.5, '△ 부분 점수'], [0, '✘ 다시 공부']].map((g) => '<button class="btn sm" data-act="grade" data-g="' + g[0] + '" aria-pressed="' + (r.grade[i] === g[0]) + '">' + g[1] + '</button>').join('') + '</div>';
      }
    } else {
      const reveal = practice && checked;
      h += choiceHtml(q, { sel: r.ans[i], reveal, locked: reveal });
      if (reveal) {
        const ok = r.ans[i] === q.ans - 1;
        h += '<div class="banner ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '정답입니다! 🎉' : '아쉬워요. 정답은 ' + CIRC[q.ans - 1] + (q.posChoices ? '' : ' ' + esc(q.choices[q.ans - 1])) + '입니다.') + '</div>';
        if (q.explain) h += '<div class="explain"><b>해설</b>\n' + esc(q.explain) + '</div>';
      }
    }
    // 하단 버튼
    const last = i === n - 1;
    let primary = '';
    if (essay) {
      if (practice) {
        if (!checked) primary = '<button class="btn primary grow" data-act="reveal">모범 답안 보기</button>';
        else primary = '<button class="btn primary grow" data-act="next"' + (r.grade[i] === null ? ' disabled' : '') + '>' + (last ? '결과 보기' : '다음 문제') + '</button>';
      } else primary = '<button class="btn primary grow" data-act="next">' + (last ? '제출하기' : '다음 문제') + '</button>';
    } else if (practice) {
      if (!checked) primary = '<button class="btn primary grow" data-act="check"' + (r.ans[i] === null ? ' disabled' : '') + '>정답 확인</button>';
      else primary = '<button class="btn primary grow" data-act="next">' + (last ? '결과 보기' : '다음 문제') + '</button>';
    } else {
      primary = '<button class="btn primary grow" data-act="next">' + (last ? '제출하기' : '다음 문제') + '</button>';
    }
    h += '<div class="navrow">' + (!practice && i > 0 ? '<button class="btn" data-act="prev">← 이전</button>' : '<span></span>') + primary + '</div></div>';
    h += '<footer class="note">키보드: 1~5 선택 · Enter ' + (practice ? '확인/다음' : '다음') + '</footer></div>';
    return h;
  }

  /* ---------- 채점 ---------- */
  function finish() {
    const r = S.run;
    const res = { items: [], objRight: 0, objTotal: 0, ptsGot: 0, ptsAll: 0, byType: {}, essayGot: 0, essayAll: 0 };
    r.qs.forEach((q, i) => {
      const essay = q.kind === 'essay';
      const t = (res.byType[q.type] = res.byType[q.type] || { c: 0, t: 0 });
      if (essay) {
        const g = r.grade[i];
        res.essayAll += q.pts;
        if (g !== null) { res.essayGot += q.pts * g; t.t += 1; t.c += g; }
        res.items.push({ i, essay: true, g });
      } else {
        const ok = r.ans[i] === q.ans - 1;
        res.objTotal++; res.ptsAll += q.pts;
        if (ok) { res.objRight++; res.ptsGot += q.pts; }
        t.t += 1; if (ok) t.c += 1;
        res.items.push({ i, ok, none: r.ans[i] === null });
      }
    });
    // 저장
    const st = getStats();
    const s = (st[r.sid] = st[r.sid] || { types: {}, sessions: [] });
    Object.keys(res.byType).forEach((k) => {
      const x = (s.types[k] = s.types[k] || { c: 0, t: 0 });
      x.c = round1(x.c + res.byType[k].c); x.t += res.byType[k].t;
    });
    if (res.objTotal) {
      const d = new Date();
      s.sessions.push({ date: (d.getMonth() + 1) + '/' + d.getDate() + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'), right: res.objRight, total: res.objTotal, rate: Math.round((res.objRight / res.objTotal) * 100) });
      s.sessions = s.sessions.slice(-20);
    }
    store.set('yd_v1_stats', st);
    // 오답노트
    const notes = getNotes();
    const list = (notes[r.sid] = notes[r.sid] || []);
    const key = (q) => q.type + '|' + q.stem + '|' + (q.choices || []).join('/');
    r.qs.forEach((q, i) => {
      if (q.kind === 'essay') return;
      const ok = r.ans[i] === q.ans - 1;
      const idx = list.findIndex((x) => key(x) === key(q));
      if (ok && idx >= 0 && r.from === 'notes') list.splice(idx, 1);
      if (!ok && idx < 0) list.push(Object.assign({}, q, { uid: undefined }));
    });
    notes[r.sid] = list.slice(-80);
    store.set('yd_v1_notes', notes);
    r.res = res;
    go('result');
  }

  /* ---------- 화면: 결과 ---------- */
  function viewResult() {
    const r = S.run, res = r.res, s = subj(r.sid);
    const rate = res.objTotal ? Math.round((res.objRight / res.objTotal) * 100) : 0;
    const wrong = res.items.filter((x) => !x.essay && !x.ok).length;
    let h = '<div class="wrap"><div class="top"><button class="btn sm" data-act="back">← ' + s.name + '</button><h1>결과</h1><span class="sp"></span></div>';
    h += '<div class="card"><div class="score"><div class="ring" style="--p:' + rate + '"><div><span><b>' + rate + '%</b><small>' + res.objRight + '/' + res.objTotal + '</small></span></div></div>' +
      '<div><div style="font-size:1.2rem;font-weight:800">' + (rate >= 90 ? '훌륭해요! 🏆' : rate >= 70 ? '잘하고 있어요 👍' : rate >= 50 ? '조금만 더 연습해요 💪' : '유형을 다시 확인해 봐요 📚') + '</div>' +
      '<div style="color:var(--ink-2)">객관식 점수 ' + round1(res.ptsGot) + ' / ' + round1(res.ptsAll) + '점' + (res.essayAll ? ' · 서술형 자가 채점 ' + round1(res.essayGot) + ' / ' + round1(res.essayAll) + '점' : '') + '</div>' +
      '<div style="color:var(--ink-2)">걸린 시간 ' + fmtTime(Math.round((Date.now() - r.started) / 1000)) + '</div></div></div></div>';
    h += '<div class="card"><h3>유형별 결과</h3>' + Object.keys(res.byType).map((k) => barRow(k, res.byType[k].c, res.byType[k].t)).join('') + '</div>';
    h += '<div class="card"><h3>문항별 복습</h3>' + r.qs.map((q, i) => {
      const it = res.items[i];
      const mark = it.essay ? '<span class="mark na">서</span>' : it.ok ? '<span class="mark ok">○</span>' : '<span class="mark bad">✕</span>';
      let inner = qBody(q, {});
      if (it.essay) {
        inner += '<p><b>내 답안</b></p><div class="explain">' + (r.text[i].trim() ? esc(r.text[i]) : '(작성하지 않음)') + '</div>' + essayAnswerHtml(q);
        if (r.mode === 'exam') inner += '<div class="selfgrade" data-q="' + i + '">' + [[1, '✔ 맞게 썼어요'], [0.5, '△ 부분 점수'], [0, '✘ 다시 공부']].map((g) => '<button class="btn sm" data-act="rgrade" data-i="' + i + '" data-g="' + g[0] + '" aria-pressed="' + (r.grade[i] === g[0]) + '">' + g[1] + '</button>').join('') + '</div>';
      } else {
        inner += choiceHtml(q, { sel: r.ans[i], reveal: true, locked: true });
        inner += '<div class="banner ' + (it.ok ? 'ok' : 'bad') + '">' + (it.ok ? '정답' : (it.none ? '답을 고르지 않았어요. ' : '오답. ') + '정답: ' + CIRC[q.ans - 1]) + '</div>';
        if (q.explain) inner += '<div class="explain"><b>해설</b>\n' + esc(q.explain) + '</div>';
      }
      return '<details class="rv"' + (!it.essay && !it.ok ? ' open' : '') + '><summary>' + mark + '<b>' + (i + 1) + '번</b><span class="chip">' + esc(q.type) + '</span><span class="chip">' + q.pts + '점</span></summary><div class="body">' + inner + '</div></details>';
    }).join('') + '</div>';
    h += '<div class="navrow">' +
      '<button class="btn" data-act="home">처음으로</button>' +
      (wrong ? '<button class="btn" data-act="retrywrong">틀린 ' + wrong + '문제 다시 풀기</button>' : '') +
      '<button class="btn primary grow" data-act="again">' + (s.gen ? '새 문제 생성해서 다시 풀기' : '같은 설정으로 다시 풀기') + '</button></div></div>';
    return h;
  }
  const fmtTime = (sec) => String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');

  /* ---------- 렌더 ---------- */
  function render() {
    stopTimer();
    if (S.view === 'home') $app.innerHTML = viewHome();
    else if (S.view === 'subject') $app.innerHTML = viewSubject();
    else if (S.view === 'quiz') {
      $app.innerHTML = viewQuiz();
      if (S.run.mode === 'exam') {
        const tick = () => { const el = document.getElementById('timer'); if (el) el.textContent = fmtTime(Math.round((Date.now() - S.run.started) / 1000)); };
        tick(); S.timer = setInterval(tick, 1000);
      }
    } else if (S.view === 'result') $app.innerHTML = viewResult();
    else if (S.view === 'past') $app.innerHTML = viewPast();
    else if (S.view === 'pastresult') $app.innerHTML = viewPastResult();
  }

  /* ---------- 이벤트 ---------- */
  function saveEssayText() {
    const t = document.getElementById('essay');
    if (t && S.run && S.view === 'quiz') S.run.text[S.run.idx] = t.value;
  }

  $app.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-act]');
    if (!el) return;
    const act = el.dataset.act, r = S.run;
    if (act === 'type') return; // change 이벤트에서 처리
    if (act === 'essay') return;
    switch (act) {
      case 'open': S.cfg = { types: null, n: 10, mode: 'practice', essay: false }; go('subject', { sid: el.dataset.sid, tab: PAST[el.dataset.sid] ? 'past' : 'play', msg: '' }); break;
      case 'startpast': S.past = { sid: S.sid, ans: new Array(PAST[S.sid].n).fill(null), open: false, started: Date.now(), res: null }; go('past'); break;
      case 'quitpast': go('subject', { tab: 'past' }); break;
      case 'togglesheet': S.past.open = !S.past.open; { const sh = document.getElementById('sheet'); sh.classList.toggle('open', S.past.open); el.setAttribute('aria-expanded', S.past.open); el.lastElementChild.textContent = S.past.open ? '▼ 접기' : '▲ 펼치기'; } break;
      case 'pa': {
        const q = +el.dataset.q, k = +el.dataset.k;
        S.past.ans[q] = S.past.ans[q] === k ? null : k;
        document.querySelectorAll('.ab[data-q="' + q + '"]').forEach((b) => { const on = S.past.ans[q] === +b.dataset.k; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
        document.getElementById('sheetcnt').textContent = S.past.ans.filter((x) => x !== null).length + '/' + S.past.ans.length + ' 선택';
        break;
      }
      case 'gradepast': {
        const p = S.past, P = PAST[p.sid];
        const blank = p.ans.filter((x) => x === null).length;
        if (blank && !p.warned) { p.warned = true; document.getElementById('sheetmsg').textContent = blank + '문항이 비어 있어요. 그대로 채점하려면 한 번 더 눌러 주세요.'; break; }
        const wrong = [];
        P.ans.forEach((a, i) => { if (p.ans[i] !== a - 1) wrong.push(i); });
        p.res = { right: P.n - wrong.length, wrong }; p.warned = false;
        const d = new Date(), pr = getPast(), list = (pr[p.sid] = pr[p.sid] || []);
        list.push({ date: (d.getMonth() + 1) + '/' + d.getDate() + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'), right: p.res.right, total: P.n, rate: Math.round(p.res.right / P.n * 100) });
        pr[p.sid] = list.slice(-10); store.set('yd_v1_past', pr);
        go('pastresult');
        break;
      }
      case 'reviewpast': S.past.open = false; go('past'); break;
      case 'toplay': S.cfg = { types: null, n: 10, mode: 'practice', essay: false }; go('subject', { sid: S.past.sid, tab: 'play', msg: '' }); break;
      case 'toplaystart': {
        S.sid = S.past.sid; S.cfg = { types: new Set(mcqTypes(S.sid).map((t) => t.name)), n: 10, mode: 'practice', essay: false };
        startRun(draw(S.sid, S.cfg.types, S.cfg.n, false), { mode: 'practice', from: 'bank' });
        break;
      }
      case 'home': go('home'); break;
      case 'back': go('subject'); break;
      case 'tab': S.tab = el.dataset.t; render(); break;
      case 'alltypes': S.cfg.types = new Set(mcqTypes(S.sid).map((t) => t.name)); render(); break;
      case 'notypes': S.cfg.types = new Set(); render(); break;
      case 'n': S.cfg.n = +el.dataset.n; render(); break;
      case 'mode': S.cfg.mode = el.dataset.m; render(); break;
      case 'start': startRun(draw(S.sid, S.cfg.types, S.cfg.n, S.cfg.essay), { mode: S.cfg.mode, from: 'bank' }); break;
      case 'again':
        if (r.from === 'notes') { S.tab = 'record'; go('subject'); }
        else startRun(draw(r.sid, S.cfg.types || new Set(mcqTypes(r.sid).map((t) => t.name)), S.cfg.n, S.cfg.essay), { mode: r.mode, from: 'bank' });
        break;
      case 'solvenotes': {
        const list = getNotes()[S.sid] || [];
        startRun(U.shuffle(list).slice(0, 20).map((q) => Object.assign({}, q)), { mode: 'practice', from: 'notes' });
        break;
      }
      case 'clearnotes': { const nt = getNotes(); nt[S.sid] = []; store.set('yd_v1_notes', nt); render(); break; }
      case 'retrywrong': {
        const qs = r.qs.filter((q, i) => q.kind !== 'essay' && r.ans[i] !== q.ans - 1).map((q) => Object.assign({}, q));
        startRun(qs, { mode: 'practice', from: 'retry' });
        break;
      }
      case 'quit': go('subject'); break;
      case 'pick': {
        const i = +el.dataset.i;
        if (r.mode === 'practice' && r.checked[r.idx]) return;
        r.ans[r.idx] = i; render(); break;
      }
      case 'check': r.checked[r.idx] = true; render(); break;
      case 'reveal': saveEssayText(); r.checked[r.idx] = true; render(); break;
      case 'grade': r.grade[r.idx] = +el.dataset.g; render(); break;
      case 'rgrade': r.grade[+el.dataset.i] = +el.dataset.g; {
        r.res.essayGot = r.qs.reduce((a, q, k) => a + (q.kind === 'essay' && r.grade[k] !== null ? q.pts * r.grade[k] : 0), 0);
        const open = Array.from(document.querySelectorAll('details.rv')).map((d) => d.open);
        render(); document.querySelectorAll('details.rv').forEach((d, k) => { d.open = open[k]; });
      } break;
      case 'prev': saveEssayText(); r.idx = Math.max(0, r.idx - 1); render(); window.scrollTo({ top: 0 }); break;
      case 'next': {
        saveEssayText();
        if (r.idx < r.qs.length - 1) { r.idx++; render(); window.scrollTo({ top: 0 }); }
        else {
          if (r.mode === 'exam') {
            const blank = r.qs.filter((q, i) => (q.kind === 'essay' ? !r.text[i].trim() : r.ans[i] === null)).length;
            if (blank && !r.warned) { r.warned = true; S.msg = ''; const nb = document.querySelector('.navrow .btn.primary'); if (nb) nb.textContent = blank + '문항이 비었어요. 한 번 더 누르면 제출'; return; }
          }
          finish();
        }
        break;
      }
    }
  });

  $app.addEventListener('change', (ev) => {
    const el = ev.target;
    if (el.dataset && el.dataset.act === 'type') {
      if (el.checked) S.cfg.types.add(el.dataset.name); else S.cfg.types.delete(el.dataset.name);
      render();
    } else if (el.dataset && el.dataset.act === 'essay') {
      S.cfg.essay = el.checked; render();
    }
  });
  $app.addEventListener('input', (ev) => { if (ev.target.id === 'essay' && S.run) S.run.text[S.run.idx] = ev.target.value; });

  document.addEventListener('keydown', (ev) => {
    if (S.view !== 'quiz' || ev.target.tagName === 'TEXTAREA' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const r = S.run, q = r.qs[r.idx];
    if (/^[1-5]$/.test(ev.key) && q.kind !== 'essay') {
      const i = +ev.key - 1;
      if (i < q.choices.length && !(r.mode === 'practice' && r.checked[r.idx])) { r.ans[r.idx] = i; render(); }
    } else if (ev.key === 'Enter') {
      const btn = document.querySelector('.navrow .btn.primary:not([disabled])');
      if (btn && document.activeElement && document.activeElement.tagName !== 'BUTTON') btn.click();
    }
  });

  render();
})();
