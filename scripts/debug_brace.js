const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\pack_a_corrected.js', 'utf8');
const q = 'P1-C-037';
const idx = c.indexOf('"QuestionID": "' + q + '"');
console.log('QID found at:', idx);
if (idx >= 0) {
  let p = idx, d = 0, s = false, e = false, st = -1;
  while (p >= 0) {
    const ch = c[p];
    if (ch === '}' && !s) d++;
    else if (ch === '{' && !s) { if (d === 0) { st = p; break; } d--; }
    else if (ch === '"' && !e) s = !s;
    e = (ch === '\\' && s && !e);
    p--;
  }
  console.log('itemStart:', st);
  if (st >= 0) console.log('context:', c.substring(st, st + 50));
}
