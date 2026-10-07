/* 공통수학 - 매번 새 문제를 만드는 생성기 + 기출 변형 문항 */
(function () {
  const { R, pick, shuffle, gcd, num, fs, intChoices, venn } = U;
  const T_IN = '내분점·직선';
  const T_DIST = '점과 직선 사이의 거리';
  const T_LINE = '두 직선의 위치 관계';
  const T_CIRCLE = '원의 방정식';
  const T_CL = '원과 직선';
  const T_MOVE = '평행이동·대칭이동';
  const T_SET = '집합의 연산·개수';
  const T_SUB = '부분집합';
  const T_VENN = '벤다이어그램';
  const T_ESSAY = '서술형';
  const sgn = (n, v) => (n === 0 ? '' : (n > 0 ? ' + ' : ' − ') + Math.abs(n) + (v || ''));
  const pol = (a, b, c) => {
    // ax + by + c = 0 문자열
    let s = '';
    if (a !== 0) s += (a === 1 ? '' : a === -1 ? '−' : num(a)) + 'x';
    if (b !== 0) s += (s ? (b > 0 ? ' + ' : ' − ') : b < 0 ? '−' : '') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y';
    if (c !== 0) s += (c > 0 ? ' + ' : ' − ') + Math.abs(c);
    return s + ' = 0';
  };
  const C = (x, y) => '(' + num(x) + ', ' + num(y) + ')';

  const BT = [0, 1, 3, 6, 7, 8]; // 받침 있는 한 자리 숫자
  const hasB = (n) => BT.indexOf(Math.abs(n) % 10) >= 0;
  const eul = (n) => n + (hasB(n) ? '을' : '를');
  const eun = (n) => n + (hasB(n) ? '은' : '는');
  const gwa = (n) => n + (hasB(n) ? '과' : '와');
  const ro = (n) => n + (hasB(n) && Math.abs(n) % 10 !== 1 && Math.abs(n) % 10 !== 7 && Math.abs(n) % 10 !== 8 && Math.abs(n) % 10 !== 0 ? '으로' : '로');

  const cf = (s) => (s === 1 ? '' : s === -1 ? '−' : num(s));
  const list = [];

  // 1. 내분점이 직선 위에 있을 때
  list.push({
    type: T_IN, pts: 3,
    gen() {
      let m = R(1, 3), n = R(1, 3);
      if (m === n) n = m === 3 ? 1 : m + 1;
      const px = R(-3, 4), py = R(-3, 4);
      const u = R(1, 3) * pick([1, -1]), v = R(1, 3) * pick([1, -1]);
      const A = [px - m * u, py - m * v], B = [px + n * u, py + n * v];
      const s = pick([1, 2, -1, -2, 3]);
      const k = py - s * px;
      const ch = intChoices(k);
      return {
        stem: '두 점 A' + C(A[0], A[1]) + ', B' + C(B[0], B[1]) + '에 대하여 선분 AB를 ' + m + ' : ' + ro(n) + ' 내분하는 점이 직선 y = ' + (s === 1 ? '' : s === -1 ? '−' : num(s)) + 'x + k 위에 있을 때, 상수 k의 값은?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '내분점 P = ((' + m + '·(' + num(B[0]) + ') + ' + n + '·(' + num(A[0]) + ')) / ' + (m + n) + ', (' + m + '·(' + num(B[1]) + ') + ' + n + '·(' + num(A[1]) + ')) / ' + (m + n) + ') = ' + C(px, py) + '. 이 점이 y = ' + cf(s) + 'x + k 위에 있으므로 ' + py + ' = ' + num(s) + '×(' + num(px) + ') + k, 따라서 k = ' + k + '.'
      };
    }
  });

  // 2. 점과 직선 사이의 거리
  list.push({
    type: T_DIST, pts: 3,
    gen() {
      const [a, b, h] = pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [6, 8, 10]]);
      const x0 = R(-4, 4), y0 = R(-4, 4);
      if (R(0, 1)) {
        const d = R(1, 4);
        const c1 = -a * x0 - b * y0 + h * d, c2 = -a * x0 - b * y0 - h * d;
        const ans = c1 + c2;
        const ch = intChoices(ans);
        return {
          stem: '점 ' + C(x0, y0) + '과 직선 ' + pol(a, b, 0).replace(' = 0', '') + ' + c = 0 사이의 거리가 ' + d + '일 때, 모든 실수 c의 값의 합은?',
          choices: ch.choices, ans: ch.ans, shuffle: false,
          explain: '거리 = |' + a + '·(' + num(x0) + ') + ' + b + '·(' + num(y0) + ') + c| / √(' + a + '² + ' + b + '²) = |' + (a * x0 + b * y0) + ' + c| / ' + h + ' = ' + d + ' 이므로 |c ' + sgn(a * x0 + b * y0) + '| = ' + h * d + '. c = ' + c1 + ' 또는 ' + c2 + ', 합은 ' + ans + '.'
        };
      }
      const d = R(1, 5), sg = pick([1, -1]);
      const c = sg * h * d - a * x0 - b * y0;
      const ch = intChoices(d, { min: 1 });
      return {
        stem: '점 ' + C(x0, y0) + '에서 직선 ' + pol(a, b, c) + '까지의 거리는?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '거리 = |' + a + '·(' + num(x0) + ') + ' + b + '·(' + num(y0) + ') ' + (c < 0 ? '− ' + -c : '+ ' + c) + '| / √(' + a + '² + ' + b + '²) = ' + h * d + ' / ' + h + ' = ' + d + '.'
      };
    }
  });

  // 3. 평행·수직 조건 (기출 변형)
  list.push({
    type: T_LINE, pts: 4,
    gen() {
      const k = R(2, 8);
      const divs = [];
      for (let i = 1; i <= k; i++) if (k % i === 0) divs.push(i);
      const a0 = pick(divs) * pick([1, -1]);
      const b0 = -k / a0;
      const m = a0 + b0;
      const ans = m * m + 2 * k;
      const ch = intChoices(ans, { min: 1 });
      return {
        stem: '두 직선 y = ax + 2, y = (' + m + ' − b)x + 3이 서로 평행하고, 직선 y = ax + 2가 직선 bx − ' + k + 'y + 1 = 0과 수직일 때, a² + b²의 값은? (단, a, b는 상수이다.)',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '평행하므로 a = ' + m + ' − b, 즉 a + b = ' + m + '. 직선 bx − ' + k + 'y + 1 = 0의 기울기는 b/' + k + '이고 수직이므로 a·(b/' + k + ') = −1, 즉 ab = −' + k + '. 따라서 a² + b² = (a + b)² − 2ab = ' + m * m + ' + ' + 2 * k + ' = ' + ans + '.'
      };
    }
  });

  // 4. 원의 방정식과 반지름 조건
  list.push({
    type: T_CIRCLE, pts: 3,
    gen() {
      const p = R(1, 4), q = R(1, 3);
      const tot = p * p + q * q;
      const mm = R(1, Math.max(1, tot - 2));
      const ans = tot - mm;
      const ch = intChoices(ans, { min: 1 });
      const D = -2 * p, E = 2 * q;
      return {
        stem: '방정식 x² + y² ' + (D < 0 ? '− ' + -D : '+ ' + D) + 'x + ' + E + 'y + k = 0이 나타내는 도형이 반지름의 길이가 ' + (mm === 1 ? '1' : '√' + mm) + ' 이상인 원이 되도록 하는 자연수 k의 개수는?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '(x − ' + p + ')² + (y + ' + q + ')² = ' + tot + ' − k 이므로 반지름의 제곱은 ' + tot + ' − k. 반지름이 ' + (mm === 1 ? '1' : '√' + mm) + ' 이상이려면 ' + tot + ' − k ≥ ' + mm + ', 즉 k ≤ ' + (tot - mm) + '. 자연수 k는 1부터 ' + ans + '까지 ' + ans + '개.'
      };
    }
  });

  // 5. 원과 직선의 위치 관계 (만나지 않을 조건)
  list.push({
    type: T_CL, pts: 4,
    gen() {
      const r = R(1, 6), a = pick([[3, 4, 5], [4, 3, 5]]);
      const ans = a[2] * r + 1;
      const ch = intChoices(ans, { min: 1 });
      return {
        stem: '원 x² + y² = ' + gwa(r * r) + ' 직선 ' + a[0] + 'x + ' + a[1] + 'y − k = 0이 만나지 않도록 하는 자연수 k의 최솟값은?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '원의 중심 (0, 0)에서 직선까지의 거리는 |k|/' + a[2] + '. 만나지 않으려면 거리 > 반지름 ' + r + ' 이므로 |k| > ' + a[2] * r + '. 자연수 k의 최솟값은 ' + ans + '.'
      };
    }
  });

  // 6. 접선과 접하는 원 (기출 변형)
  list.push({
    type: T_CL, pts: 4,
    gen() {
      const t = R(1, 3), c = R(t + 1, t + 4);
      const k = 2 * c * c - 2 * (c - t) * (c - t);
      const ch = intChoices(k);
      return {
        stem: '원 x² + y² = ' + 2 * t * t + ' 위의 점 ' + C(t, t) + '에서의 접선이 원 x² + y² − ' + 2 * c + 'x − ' + 2 * c + 'y + k = 0과 접할 때, 실수 k의 값은?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '접선: ' + t + 'x + ' + t + 'y = ' + 2 * t * t + ' → x + y = ' + 2 * t + '. 다른 원은 (x − ' + c + ')² + (y − ' + c + ')² = ' + 2 * c * c + ' − k, 중심 (' + c + ', ' + c + '). 중심과 접선 사이 거리 |' + 2 * c + ' − ' + 2 * t + '|/√2 = √2·' + (c - t) + ' 이므로 반지름² = 2·' + (c - t) + '² = ' + 2 * (c - t) * (c - t) + '. 따라서 ' + 2 * c * c + ' − k = ' + 2 * (c - t) * (c - t) + ', k = ' + k + '.'
      };
    }
  });

  // 7. 아폴로니우스의 원 (PA:PB = k:1)
  list.push({
    type: T_CIRCLE, pts: 4,
    gen() {
      const kk = pick([2, 3]);
      const dMul = kk === 2 ? 3 : 8;
      const d = dMul * R(1, 2);
      const r = (kk * d) / (kk * kk - 1);
      const xa = R(-4, 1);
      const A = xa, B = xa + d;
      const ans = r * r;
      const ch = intChoices(ans, { min: 1, fmt: (v) => (v === 1 ? '' : v) + 'π' });
      return {
        stem: '두 점 A(' + num(A) + ', 0), B(' + num(B) + ', 0)에 대하여 PA : PB = ' + kk + ' : 1을 만족시키는 점 P가 나타내는 도형의 넓이는?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: 'P(x, y)라 하면 PA² = ' + kk * kk + '·PB². 정리하면 중심이 x축 위에 있는 원이 되고 반지름은 ' + kk + '·AB / |' + kk + '² − 1| = ' + kk + '·' + d + ' / ' + (kk * kk - 1) + ' = ' + r + '. 따라서 넓이는 ' + ans + 'π.'
      };
    }
  });

  // 8. 직선의 원점 대칭 + 원의 넓이 이등분 (기출 변형)
  list.push({
    type: T_MOVE, pts: 4,
    gen() {
      const p = R(1, 6), c = R(1, 3);
      const ans = c + p;
      const ch = intChoices(ans);
      return {
        stem: '직선 x + y − ' + p + ' = 0을 원점에 대하여 대칭이동한 직선이 원 x² + y² + 2ax − ' + 2 * c + 'y − 6 = 0의 넓이를 이등분할 때, 상수 a의 값은?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '원점 대칭이동은 (x, y) → (−x, −y). 직선은 −x − y − ' + p + ' = 0, 즉 x + y + ' + p + ' = 0. 원의 중심 (−a, ' + c + ')이 이 직선 위에 있어야 하므로 −a + ' + c + ' + ' + p + ' = 0, a = ' + ans + '.'
      };
    }
  });

  // 9. 점/직선 평행이동
  list.push({
    type: T_MOVE, pts: 3,
    gen() {
      const s = pick([1, 2, 3, -1, -2]), p = R(-3, 3), m = R(-3, 3), u = R(-3, 3), v = R(-4, 6);
      const n = v - s * u + s * m - p;
      const ch = intChoices(n);
      return {
        stem: '직선 y = ' + (s === 1 ? '' : s === -1 ? '−' : num(s)) + 'x' + sgn(p) + '을 x축의 방향으로 ' + num(m) + '만큼, y축의 방향으로 n만큼 평행이동한 직선이 점 ' + C(u, v) + '을 지날 때, n의 값은?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '평행이동한 직선: y − n = ' + cf(s) + '(x − (' + num(m) + '))' + sgn(p) + ', 즉 y = ' + cf(s) + 'x + (' + num(-s * m + p) + ') + n. 점 ' + C(u, v) + '을 대입하면 ' + num(v) + ' = ' + num(s * u) + ' + (' + num(-s * m + p) + ') + n, 따라서 n = ' + n + '.'
      };
    }
  });

  // 10. 점의 대칭이동
  list.push({
    type: T_MOVE, pts: 3,
    gen() {
      const a = R(-4, 4), b = R(-4, 4);
      const ans = 2 * (a + b) * (a + b);
      const ch = intChoices(ans, { min: 0 });
      return {
        stem: '점 A' + C(a, b) + '를 직선 y = x에 대하여 대칭이동한 점을 P, 원점에 대하여 대칭이동한 점을 Q라 할 때, 선분 PQ의 길이의 제곱은?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: 'P' + C(b, a) + ', Q' + C(-a, -b) + '. PQ² = (' + num(b) + ' − (' + num(-a) + '))² + (' + num(a) + ' − (' + num(-b) + '))² = 2·(' + num(a + b) + ')² = ' + ans + '.'
      };
    }
  });

  // 11. A ⊂ X ⊂ B 인 집합 X의 개수
  list.push({
    type: T_SUB, pts: 3,
    gen() {
      const q = R(4, 7), p = R(1, 3);
      const elems = Array.from({ length: q }, (_, i) => i + 1);
      const A = shuffle(elems).slice(0, p).sort((x, y) => x - y);
      const ans = Math.pow(2, q - p);
      const ch = intChoices(ans, { min: 1 });
      return {
        stem: '두 집합 A = {' + A.join(', ') + '}, B = {' + elems.join(', ') + '}에 대하여 A ⊂ X ⊂ B를 만족시키는 집합 X의 개수는?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: 'X는 A의 원소 ' + p + '개를 반드시 포함하고, B의 나머지 ' + (q - p) + '개의 원소는 포함 여부를 자유롭게 정할 수 있다. 따라서 2^' + (q - p) + ' = ' + ans + '(개).'
      };
    }
  });

  // 12. 특정 원소 포함/제외 부분집합 수
  list.push({
    type: T_SUB, pts: 3,
    gen() {
      const n = R(5, 8), a = R(1, n), b = ((a + R(0, n - 2)) % n) + 1;
      if (a === b) return list[10].gen();
      const ans = Math.pow(2, n - 2);
      const ch = intChoices(ans, { min: 1 });
      return {
        stem: '집합 A = {1, 2, 3, …, ' + n + '}의 부분집합 중에서 원소 ' + eul(a) + ' 반드시 포함하고 원소 ' + eul(b) + ' 포함하지 않는 부분집합의 개수는?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: '원소 ' + gwa(a) + ' ' + eun(b) + ' 정해져 있고, 나머지 ' + (n - 2) + '개 원소는 포함 여부가 자유롭다. 따라서 2^' + (n - 2) + ' = ' + ans + '(개).'
      };
    }
  });

  // 13. 벤 다이어그램 색칠 부분의 원소 합
  list.push({
    type: T_VENN, pts: 4,
    gen() {
      const N = pick([6, 8, 9, 10, 12]);
      const top = pick([7, 8, 9, 10]);
      const U_ = Array.from({ length: top }, (_, i) => i + 1);
      const isPrime = (x) => x > 1 && Array.from({ length: x - 1 }, (_, i) => i + 2).every((d) => d >= x || x % d);
      const Aset = U_.filter((x) => N % x === 0);
      const Bset = U_.filter(isPrime);
      const regions = [
        { cells: ['A_'], txt: 'A − B', f: (a, b) => a && !b },
        { cells: ['_B'], txt: 'B − A', f: (a, b) => !a && b },
        { cells: ['AB'], txt: 'A ∩ B', f: (a, b) => a && b },
        { cells: ['__'], txt: '(A ∪ B)ᶜ', f: (a, b) => !a && !b },
        { cells: ['A_', '_B', '__'], txt: '(A ∩ B)ᶜ', f: (a, b) => !(a && b) },
        { cells: ['A_', '_B'], txt: '(A − B) ∪ (B − A)', f: (a, b) => a !== b }
      ];
      const rg = pick(regions);
      const els = U_.filter((x) => rg.f(Aset.includes(x), Bset.includes(x)));
      if (els.length === 0) return list[12].gen();
      const ans = els.reduce((s, x) => s + x, 0);
      const ch = intChoices(ans, { min: 1 });
      return {
        stem: '전체집합 U = {1, 2, 3, …, ' + top + '}의 두 부분집합 A = {x | x는 ' + N + '의 약수}, B = {x | x는 ' + top + ' 이하의 소수}에 대하여, 그림의 색칠한 부분을 나타내는 집합의 모든 원소의 합은?',
        fig: venn(rg.cells), choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: 'A = {' + Aset.join(', ') + '}, B = {' + Bset.join(', ') + '}. 색칠한 부분은 ' + rg.txt + ' = {' + els.join(', ') + '}이므로 원소의 합은 ' + ans + '.'
      };
    }
  });

  // 14. 두 조건으로 인원 구하기 (기출 변형)
  list.push({
    type: T_SET, pts: 5,
    gen() {
      for (let t = 0; t < 200; t++) {
        const r = R(2, 3), s = R(3, 4), x = R(2, 6), y = R(1, 4);
        const N = (1 + r) * x + (s + 1) * y;
        const sol = [];
        for (let xx = 1; xx <= N; xx++) for (let yy = 1; yy <= N; yy++) if ((1 + r) * xx + (s + 1) * yy === N) sol.push([xx, yy]);
        if (sol.length !== 1 || N > 60) continue;
        const ans = x + s * y;
        const ch = intChoices(ans, { min: 1 });
        return {
          stem: '어느 동호회 회원 ' + N + '명을 대상으로 축구와 농구 중 좋아하는 운동을 조사하였더니 다음과 같았다.\n(가) 축구만 좋아하는 회원의 수는 축구와 농구를 모두 좋아하는 회원의 수의 ' + r + '배이다.\n(나) 농구만 좋아하는 회원의 수는 축구와 농구 중 어느 것도 좋아하지 않는 회원의 수의 ' + s + '배이다.\n축구와 농구를 좋아하는 회원이 각각 존재할 때, 농구를 좋아하는 회원의 수는?',
          choices: ch.choices, ans: ch.ans, shuffle: false,
          explain: '둘 다 좋아하는 수를 x, 어느 것도 안 좋아하는 수를 y라 하면 축구만 ' + r + 'x, 농구만 ' + s + 'y. 전체 인원은 ' + r + 'x + x + ' + s + 'y + y = ' + (1 + r) + 'x + ' + (s + 1) + 'y = ' + N + '. x, y가 자연수인 해는 (x, y) = (' + x + ', ' + y + ') 하나뿐이다. 농구를 좋아하는 회원 = x + ' + s + 'y = ' + ans + '.'
        };
      }
      return list[0].gen();
    }
  });

  // 15. 두 집합의 포함 관계에서 정수 개수 / 합 (기출 변형)
  list.push({
    type: T_SET, pts: 4,
    gen() {
      const lo = R(1, 3), hi = lo + R(1, 2);
      const m = R(2, 4), c = R(3, 6);
      // A = {x | lo ≤ x < hi}, B = {x | a − m < x < m·a + c}
      // 조건: a − m < lo, hi ≤ m·a + c
      const aMax = lo + m - 1; // a - m < lo → a < lo + m → a ≤ lo + m - 1
      const aMin = Math.ceil((hi - c) / m);
      if (aMin > aMax) return list[14].gen();
      let sum = 0;
      for (let a = aMin; a <= aMax; a++) sum += a;
      const ch = intChoices(sum);
      return {
        stem: '두 집합 A = {x | ' + lo + ' ≤ x < ' + hi + '}, B = {x | a − ' + m + ' < x < ' + m + 'a + ' + c + '}에 대하여 A ⊂ B가 성립하도록 하는 모든 정수 a의 값의 합은?',
        choices: ch.choices, ans: ch.ans, shuffle: false,
        explain: 'A ⊂ B이려면 a − ' + m + ' < ' + lo + ' 이고 ' + hi + ' ≤ ' + m + 'a + ' + c + ' 이어야 한다(A의 오른쪽 끝은 포함하지 않으므로 등호 가능). 즉 ' + aMin + ' ≤ a ≤ ' + aMax + '. 정수 a의 합은 ' + sum + '.'
      };
    }
  });

  // ----- 고정 문항 (기출 변형) -----
  list.push({
    type: T_IN, pts: 4,
    stem: '삼각형 ABC의 세 꼭짓점이 A(−1, −1), B(5, −9), C(2, 3)이다. ∠A의 이등분선이 변 BC와 만나는 점을 D(a, b)라 할 때, a − b의 값은?',
    choices: ['3', '4', '5', '6', '7'], ans: 2, shuffle: false,
    explain: 'AB = √(6² + 8²) = 10, AC = √(3² + 4²) = 5. 각의 이등분선은 대변 BC를 AB : AC = 2 : 1로 내분한다. D = ((2·2 + 1·5)/3, (2·3 + 1·(−9))/3) = (3, −1). 따라서 a − b = 3 − (−1) = 4.'
  });

  list.push({
    type: T_IN, pts: 5,
    stem: '두 점 A(−2, −3), B(6, 1)에 대하여 서로 다른 두 점 C₁, C₂가 다음 조건을 만족시킬 때, 선분 C₁C₂의 길이는? (단, 점 C₁의 x좌표는 점 C₂의 x좌표보다 작다.)',
    box: '(가) 두 점 C₁, C₂는 모두 직선 AB 위의 점이다.\n(나) AB = 3BC₁, AB = 3BC₂', boxTitle: '조 건',
    choices: ['(4√5)/3', '(5√5)/3', '(7√5)/3', '(8√5)/3', '(10√5)/3'], ans: 4, shuffle: false,
    explain: 'AB = √(8² + 4²) = 4√5. BC = AB/3 이므로 점 C는 B에서 (4√5)/3 만큼 떨어진 직선 AB 위의 두 점이다. 두 점은 B를 중심으로 양쪽에 있으므로 C₁C₂ = 2 × (4√5)/3 = (8√5)/3.'
  });

  list.push({
    type: T_CIRCLE, pts: 4,
    stem: '두 점 A(−1, 0), B(2, 0)에 대하여 PA : PB = 2 : 1을 만족시키는 점 P가 나타내는 도형의 넓이는?',
    choices: ['π', '2π', '3π', '4π', '5π'], ans: 4, shuffle: false,
    explain: 'P(x, y)라 하면 (x + 1)² + y² = 4{(x − 2)² + y²}. 정리하면 (x − 3)² + y² = 4. 반지름이 2인 원이므로 넓이는 4π.'
  });

  list.push({
    type: T_VENN, pts: 5,
    stem: '전체집합 U의 세 부분집합 A, B, C에 대하여 집합 (A ∪ B) ∩ (Aᶜ ∪ C)를 간단히 하면?',
    choices: ['(A ∩ C) ∪ (B ∩ Aᶜ)', '(A ∩ B) ∪ C', 'A ∪ (B ∩ C)', 'B ∩ C', 'A ∩ Bᶜ'], ans: 1, shuffle: false,
    explain: '(A ∪ B) ∩ (Aᶜ ∪ C) = (A ∩ Aᶜ) ∪ (A ∩ C) ∪ (B ∩ Aᶜ) ∪ (B ∩ C) = (A ∩ C) ∪ (B ∩ Aᶜ) ∪ (B ∩ C). 그런데 B ∩ C는 A에 속하든(A ∩ C에 포함) 속하지 않든(B ∩ Aᶜ에 포함) 이미 포함되므로 (A ∩ C) ∪ (B ∩ Aᶜ).'
  });

  list.push({
    type: T_SET, pts: 4,
    stem: '집합 A = {∅, 1, 2, {1, 2}}에 대하여 다음 <보기> 중 옳은 것은?',
    box: 'ㄱ. ∅ ∈ A\nㄴ. {1, 2} ⊂ A\nㄷ. n(A) = 4\nㄹ. {{1, 2}} ⊂ A', boxTitle: '보 기',
    choices: ['ㄱ, ㄴ', 'ㄱ, ㄷ', 'ㄱ, ㄴ, ㄷ', 'ㄴ, ㄷ, ㄹ', 'ㄱ, ㄴ, ㄷ, ㄹ'], ans: 5, shuffle: false,
    explain: 'ㄱ. ∅은 A의 원소이므로 ∈ 성립. ㄴ. 1, 2가 모두 A의 원소이므로 {1, 2} ⊂ A. ㄷ. A의 원소는 ∅, 1, 2, {1, 2} 4개. ㄹ. {1, 2}가 A의 원소이므로 {{1, 2}} ⊂ A. 모두 옳다.'
  });

  // ----- 서술형 (생성형) -----
  list.push({
    type: T_ESSAY, pts: 6, kind: 'essay',
    gen() {
      const p = R(1, 4), q = R(2, 7), s = R(2, 6), t = R(-3, 3);
      const cx = p + s, cy = q + t;
      return {
        stem: '원 (x − ' + p + ')² + (y − ' + q + ')² = 9를 x축의 방향으로 ' + s + '만큼, y축의 방향으로 ' + num(t) + '만큼 평행이동한 후, 직선 y = x에 대하여 대칭이동한 원의 방정식을 구하시오. (풀이 과정을 쓰시오.) [6점]',
        model: '평행이동: 중심 (' + p + ', ' + q + ') → (' + cx + ', ' + cy + '), 반지름 3은 그대로.\n직선 y = x 에 대한 대칭이동: 중심 (' + cx + ', ' + cy + ') → (' + cy + ', ' + cx + ').\n따라서 구하는 원의 방정식은 (x − ' + cy + ')² + (y − ' + cx + ')² = 9.',
        rubric: ['평행이동한 원의 중심 (' + cx + ', ' + cy + ')을 구함 (2점)', 'y = x 대칭이동으로 x, y를 서로 바꾼 중심 (' + cy + ', ' + cx + ')을 구함 (2점)', '반지름 3을 유지하여 방정식을 바르게 씀 (2점)']
      };
    }
  });
  list.push({
    type: T_ESSAY, pts: 4, kind: 'essay',
    gen() {
      const a = R(2, 6), b = R(1, 2 * a);
      const s = -2 * a, t = a - b;
      return {
        stem: '좌표평면에서 두 양수 a, b에 대하여 원 (x − a)² + (y − b)² = a²을 x축의 방향으로 ' + num(s) + ', y축의 방향으로 ' + num(t) + '만큼 평행이동한 원 C′이 x축과 y축에 동시에 접할 때, a + b의 값을 구하시오. (풀이 과정을 쓰시오.) [4점]',
        model: '원 C의 중심은 (a, b), 반지름은 a. 평행이동하면 중심은 (a ' + (s < 0 ? '− ' + -s : '+ ' + s) + ', b ' + (t < 0 ? '− ' + -t : '+ ' + t) + '), 반지름은 a 그대로.\nx축·y축에 동시에 접하려면 |중심의 x좌표| = |중심의 y좌표| = 반지름 = a.\n|a − ' + 2 * a + '| = a 이므로 (a가 주어진 값과 일치) a = ' + a + '. (x좌표 = −a)\n|b + (' + t + ')| = ' + a + ' 에서 b = ' + b + ' (b > 0).\n따라서 a + b = ' + (a + b) + '.',
        rubric: ['평행이동한 원의 중심과 반지름을 구함 (1점)', '두 축에 접할 조건 |x좌표| = |y좌표| = 반지름을 세움 (1점)', 'a의 값을 바르게 구함 (1점)', 'b의 값과 a + b = ' + (a + b) + '를 구함 (1점)']
      };
    }
  });

  addQ('math', list);

  GUIDE.math = {
    summary: '객관식 20문항(3~5점) + 서술형 4문항. 도형의 방정식과 집합 두 단원이 절반씩 출제됩니다. 계산이 길어지는 5점 문항이 후반부에 몰려 있어요.',
    types: [
      { name: T_IN, tips: '내분점 공식을 외우고, 각의 이등분선은 “두 변의 길이 비로 내분”임을 기억하세요.', ex: '선분 AB를 1:2로 내분하는 점이 직선 위에 있을 때 상수 k' },
      { name: T_DIST, tips: '점과 직선 사이 거리 공식 |ax₀+by₀+c|/√(a²+b²). 절댓값 때문에 해가 2개 나오는지 꼭 확인하세요.', ex: '점 (0,k)와 두 직선 사이의 거리가 같을 때 모든 k의 합' },
      { name: T_LINE, tips: '평행: 기울기 같음, 수직: 기울기의 곱이 −1. 합·곱을 이용해 a²+b²를 구하는 곱셈 공식 변형이 단골입니다.', ex: '평행하고 수직일 때 a²+b²' },
      { name: T_CIRCLE, tips: '일반형 → 표준형 완전제곱 변형. 반지름² > 0 조건과 아폴로니우스 원(PA:PB=m:n)을 연습하세요.', ex: 'PA:PB=2:1인 점 P가 그리는 도형의 넓이' },
      { name: T_CL, tips: '중심과 직선 사이 거리 d와 반지름 r 비교: d<r 두 점, d=r 접함, d>r 만나지 않음.', ex: '원과 직선이 서로 다른 두 점에서 만날 때 정수 k의 개수' },
      { name: T_MOVE, tips: '평행이동 (x,y)→(x+m,y+n), 대칭: x축 (x,−y), y축 (−x,y), 원점 (−x,−y), y=x (y,x).', ex: '직선을 원점 대칭한 직선이 원의 넓이를 이등분' },
      { name: T_SET, tips: '부분집합 조건은 수직선으로 그리고 등호 포함 여부를 점검. 인원 문제는 벤다이어그램 4칸에 문자를 넣어 식을 세웁니다.', ex: 'A⊂B가 되도록 하는 모든 정수 a의 합' },
      { name: T_SUB, tips: '원소 n개인 집합의 부분집합은 2ⁿ개, 특정 원소 k개를 포함/제외하면 2ⁿ⁻ᵏ개.', ex: 'A⊂X⊂B인 집합 X의 개수' },
      { name: T_VENN, tips: '색칠된 부분을 4칸(A만, 둘 다, B만, 둘 다 아님)으로 나누어 어느 칸인지 판단하세요.', ex: '(A∪B)∩(Aᶜ∪C)에 해당하는 영역' },
      { name: T_ESSAY, tips: '부분 점수가 있으니 풀이 과정을 반드시 쓰세요. 중심·반지름을 먼저 정리하면 실수가 줄어요.', ex: '원을 평행이동·대칭이동한 원의 방정식' }
    ]
  };
})();
