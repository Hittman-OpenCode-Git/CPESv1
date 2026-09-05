// Brute-force a coherent (cl,diff) assignment with exact counts, trying many orders.
const CL_DIFF_OK = {
  "Remember": ["Easy", "Moderate-Easy", "Moderate"],
  "Understand": ["Easy", "Moderate-Easy", "Moderate"],
  "Apply": ["Moderate-Easy", "Moderate", "Difficult"],
  "Analyze": ["Moderate", "Difficult"],
  "Evaluate": ["Difficult", "Very Difficult"]
};
const WANT_DIFF = { "Easy": 4, "Moderate-Easy": 6, "Moderate": 9, "Difficult": 8, "Very Difficult": 3 };
const WANT_CL = { "Remember": 3, "Understand": 6, "Apply": 12, "Analyze": 6, "Evaluate": 3 };

// Generate the multiset of cl entries
const clMultiset = [];
for (const [k, v] of Object.entries(WANT_CL)) for (let i = 0; i < v; i++) clMultiset.push(k);

// Recursive backtracking over slots: assign each cl a diff from its allowed set,
// tracking remaining difficulty counts.
function search(order, idx, need, acc) {
  if (idx === order.length) {
    if (Object.values(need).every(v => v === 0)) return acc.slice();
    return null;
  }
  const cl = order[idx];
  const allowed = CL_DIFF_OK[cl].filter(d => need[d] > 0);
  // Try hardest-first to spread Difficult/VD
  allowed.sort((a, b) => need[b] - need[a]);
  for (const d of allowed) {
    need[d]--;
    acc.push({ cl, diff: d });
    const r = search(order, idx + 1, need, acc);
    if (r) return r;
    acc.pop();
    need[d]++;
  }
  return null;
}

// Try several orderings: original, reversed, interleaved variants
const orders = [
  clMultiset.slice(),
  clMultiset.slice().reverse(),
  ["Apply","Apply","Apply","Apply","Understand","Apply","Apply","Remember","Apply","Apply","Analyze","Understand","Apply","Apply","Analyze","Remember","Apply","Analyze","Understand","Apply","Apply","Evaluate","Apply","Analyze","Evaluate","Understand","Analyze","Remember","Evaluate","Analyze"],
  ["Remember","Understand","Apply","Analyze","Evaluate","Remember","Understand","Apply","Analyze","Evaluate","Remember","Understand","Apply","Analyze","Evaluate","Understand","Apply","Analyze","Evaluate","Apply","Understand","Apply","Analyze","Evaluate","Apply","Understand","Apply","Analyze","Apply","Apply"]
];

let sol = null;
for (const o of orders) {
  const need = { ...WANT_DIFF };
  const r = search(o, 0, need, []);
  if (r) { sol = { order: o, pairs: r }; break; }
}
if (!sol) { console.error("no coherent assignment found"); process.exit(1); }

// Build cl[] and diff[] sequences in slot order 0..29
const clSeq = sol.order;
const diffSeq = sol.pairs.map(p => p.diff);
console.log("clSeq:", clSeq.join(","));
console.log("diffSeq:", diffSeq.join(","));
const c = {}; for (const d of diffSeq) c[d] = (c[d] || 0) + 1;
console.log("diff counts:", JSON.stringify(c));
const cc2 = {}; for (const cl of clSeq) cc2[cl] = (cc2[cl] || 0) + 1;
console.log("cl counts:", JSON.stringify(cc2));

// Coherent check
let ok = true;
for (let i = 0; i < 30; i++) if (!CL_DIFF_OK[clSeq[i]].includes(diffSeq[i])) { ok = false; console.log("incoherent", i); }
console.log("coherent:", ok);

// CC sequence (A7 B8 C8 D7, max streak 2)
const ccSeq = [];
let counts = { A: 7, B: 8, C: 8, D: 7 };
let prev = "", prev2 = "";
for (let i = 0; i < 30; i++) {
  const cands = ["A", "B", "C", "D"].filter(L => counts[L] > 0 && L !== prev2);
  cands.sort((a, b) => counts[b] - counts[a]);
  const pick = cands[0];
  ccSeq.push(pick);
  counts[pick]--;
  prev2 = prev; prev = pick;
}
console.log("ccSeq:", ccSeq.join(""));
console.log("cc counts:", JSON.stringify({ A: ccSeq.filter(x=>x==="A").length, B: ccSeq.filter(x=>x==="B").length, C: ccSeq.filter(x=>x==="C").length, D: ccSeq.filter(x=>x==="D").length }));

// Calc positions (9 spread)
const calcIdx = [];
for (let i = 0; i < 9; i++) calcIdx.push(Math.round(i * 29 / 8));
console.log("calcIdx:", calcIdx.join(","));
