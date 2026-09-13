// Rebalance Wave 9 CC 3/12/14/1 -> 7/8/8/7 via key rotation (Choices + EW swap; EC letter-free).
// Flips: B->A (E-103, E-106, E-114, E-130), C->D (E-105, E-112, E-117, E-125).
// Net: A+4 (3->7), B-4 (12->8), C-4 (14->10)... recount: C-4+D+4.
// Target check below asserts 7/8/8/7.
const fs = require('fs');
const flips = {
  'P1E-E-103': ['B', 'A'], 'P1E-E-106': ['B', 'A'], 'P1E-E-114': ['B', 'A'], 'P1E-E-130': ['B', 'A'],
  'P1E-E-105': ['C', 'D'], 'P1E-E-112': ['C', 'D'], 'P1E-E-117': ['C', 'D'], 'P1E-E-125': ['C', 'D'],
};
const files = ['scripts/tier3_wave9a.js', 'scripts/tier3_wave9b.js', 'scripts/tier3_wave9c.js'];
for (const f of files) {
  let src = fs.readFileSync(f, 'utf8');
  let n = 0;
  for (const [qid, [from, to]] of Object.entries(flips)) {
    if (!src.includes('"QuestionID": "' + qid + '"')) continue;
    // swap Choices."FROM": "..." with Choices."TO": "..." (first occurrence after QID)
    const qi = src.indexOf('"QuestionID": "' + qid + '"');
    // find Choices block after qi
    const ci = src.indexOf('"Choices"', qi);
    const cb = src.indexOf('{', ci);
    let d = 0, ce = -1;
    for (let i = cb; i < src.length; i++) {
      if (src[i] === '{') d++;
      else if (src[i] === '}') { d--; if (d === 0) { ce = i + 1; break; } }
    }
    let cblock = src.substring(cb, ce);
    const reF = new RegExp('"' + from + '": "((?:[^"\\\\]|\\\\.)*)"');
    const reT = new RegExp('"' + to + '": "((?:[^"\\\\]|\\\\.)*)"');
    const mF = cblock.match(reF), mT = cblock.match(reT);
    if (!mF || !mT) throw new Error('choices not found for ' + qid);
    cblock = cblock.replace(reF, '"' + from + '": "%%TMP%%"').replace(reT, '"' + to + '": "' + mF[1] + '"').replace('"' + from + '": "%%TMP%%"', '"' + from + '": "' + mT[1] + '"');
    src = src.substring(0, cb) + cblock + src.substring(ce);
    // swap EW slots
    const eF = '"ExplanationWrong' + from + '": "';
    const eT = '"ExplanationWrong' + to + '": "';
    // extract values via object parse of enclosing item is complex; use span-based swap
    // find item span
    let dd = 0, st = -1;
    for (let i = qi; i >= 0; i--) {
      if (src[i] === '}') dd++;
      else if (src[i] === '{') { dd--; if (dd < 0) { st = i; break; } }
    }
    let dd2 = 0, en = -1;
    for (let i = st; i < src.length; i++) {
      if (src[i] === '{') dd2++;
      else if (src[i] === '}') { dd2--; if (dd2 === 0) { en = i + 1; break; } }
    }
    let seg = src.substring(st, en);
    const vRe = L => new RegExp('"ExplanationWrong' + L + '": "((?:[^"\\\\]|\\\\.)*)"');
    const vF = seg.match(vRe(from)), vT = seg.match(vRe(to));
    if (!vF || !vT) throw new Error('EW not found for ' + qid);
    seg = seg.replace(vRe(from), '"ExplanationWrong' + from + '": "%%EW%%"')
             .replace(vRe(to), '"ExplanationWrong' + to + '": "' + vF[1] + '"')
             .replace('"' + 'ExplanationWrong' + from + '": "%%EW%%"', '"ExplanationWrong' + from + '": "' + vT[1] + '"');
    seg = seg.replace('"CorrectChoice": "' + from + '"', '"CorrectChoice": "' + to + '"');
    src = src.substring(0, st) + seg + src.substring(en);
    n++;
    console.log(qid + ': ' + from + '->' + to);
  }
  if (n) fs.writeFileSync(f, src, 'utf8');
}
console.log('done');