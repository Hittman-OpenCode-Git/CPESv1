const fs = require('fs');
// Find CBQ-C2-Q1's prompt in the pack file directly
const raw = fs.readFileSync('content/cases/case_pack_1_corrected.js', 'utf8');
const i = raw.indexOf('CBQ-C2-Q1');
console.log('CBQ-C2-Q1 found at char', i);
const seg = raw.slice(i - 100, i + 1500);
const pm = seg.match(/"Prompt"\s*:\s*"((?:[^"\\]|\\.)*)"/);
console.log('Pack prompt:', pm ? pm[1].substring(0, 150) : 'NOT FOUND');
// Compare with solutions file
const d = JSON.parse(fs.readFileSync('scripts/output/dl066_byte_range_solutions.json', 'utf8'));
const c = d.find(x => x.caseId === 'CBQ-C2');
const it = c.items.find(y => y.itemId === 'CBQ-C2-Q1');
console.log('Solution prompt:', it.prompt.substring(0, 150));
if (pm) {
  console.log('Equal?', pm[1] === it.prompt);
  console.log('Pack len:', pm[1].length, 'Sol len:', it.prompt.length);
  if (pm[1] !== it.prompt) {
    for (let k = 0; k < Math.min(pm[1].length, it.prompt.length); k++) {
      if (pm[1][k] !== it.prompt[k]) {
        console.log('First diff at char', k, ': pack=', JSON.stringify(pm[1][k]), 'sol=', JSON.stringify(it.prompt[k]));
        break;
      }
    }
  }
}
// Also test what the verifier's prompt matching does
const v = fs.readFileSync('scripts/dl066_verify.js', 'utf8');
console.log('\n=== Verifier prompt-match logic (search) ===');
const lines = v.split('\n');
lines.forEach((line, idx) => {
  if (/prompt/i.test(line) && (idx < 120)) console.log(idx + 1, ':', line.trim().substring(0, 120));
});
