const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\pack_a_corrected.js', 'utf8');
const q = 'P1-C-037';
const idx = c.indexOf('"QuestionID": "' + q + '"');
console.log('QID at', idx);

// Scan backward, log every brace
let p = idx, d = 0, s = false, e = false;
let count = 0;
while (p >= 0 && count < 2000) {
  const ch = c[p];
  if (ch === '{' || ch === '}') {
    console.log(`  pos ${p}: char='${ch}' inString=${s} depth=${d} context=${JSON.stringify(c.substring(Math.max(0,p-5), p+6))}`);
  }
  if (ch === '}' && !s) d++;
  else if (ch === '{' && !s) { if (d === 0) { console.log('FOUND ITEM START at', p); break; } d--; }
  else if (ch === '"' && !e) s = !s;
  e = (ch === '\\' && s && !e);
  p--;
  count++;
}
if (p < 0) console.log('Reached beginning of file without finding item start');
