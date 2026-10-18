/** Update P2-C-037 to FALSE_POSITIVE in ws1_adjudication.json */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const r = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/output/ws1_adjudication.json'), 'utf8'));
for (const x of r) {
  if (x.qid === 'P2-C-037') {
    x.verdict = 'FALSE_POSITIVE';
    x.confidence = 'medium';
    x.notes.push('Manual review: EC computes net=-$11,000 matching Choice B Reject. False positive — verifier recall heuristic cannot distinguish EC discussing distractor reasoning vs actual conclusion.');
  }
}
fs.writeFileSync(path.join(ROOT, 'scripts/output/ws1_adjudication.json'), JSON.stringify(r, null, 1));
const summary = r.reduce((a, c) => { a[c.verdict] = (a[c.verdict] || 0) + 1; return a; }, {});
console.log('Updated P2-C-037 to FALSE_POSITIVE');
console.log('Summary:', JSON.stringify(summary));
