// Screen Wave-4 items (P1-A-076..105) against new Rules 15 + 18.
const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
let fails = 0;
for (let n = 76; n <= 105; n++) {
  const qid = 'P1-A-' + String(n).padStart(3, '0');
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  if (qi === -1) { console.log('MISSING ' + qid); fails++; continue; }
  let d = 0, start = -1;
  for (let i = qi; i >= 0; i--) {
    if (src[i] === '}') d++;
    else if (src[i] === '{') { d--; if (d < 0) { start = i; break; } }
  }
  let d2 = 0, end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') d2++;
    else if (src[i] === '}') { d2--; if (d2 === 0) { end = i + 1; break; } }
  }
  const seg = src.substring(start, end);
  const obj = new Function('return ' + seg + ';')();
  // R15: non-empty EW slots must not start lowercase
  for (const L of ['A', 'B', 'C', 'D']) {
    const v = obj['ExplanationWrong' + L];
    if (v && v.length > 0 && /^[a-z]/.test(v.trim())) {
      console.log('R15 FLAG ' + qid + ' EW' + L + ': ' + v.substring(0, 60));
      fails++;
    }
  }
  // R18: choices trimmed, >=8 chars, alphanumeric start
  for (const L of ['A', 'B', 'C', 'D']) {
    const ch = (obj.Choices || {})[L] || '';
    if (ch !== ch.trim()) { console.log('R18 FLAG ' + qid + ' choice ' + L + ': untrimmed'); fails++; }
    else if (ch.trim().length < 8) { console.log('R18 FLAG ' + qid + ' choice ' + L + ': len<8'); fails++; }
    else if (!/^[A-Za-z0-9]/.test(ch.trim())) { console.log('R18 FLAG ' + qid + ' choice ' + L + ': non-alphanumeric start'); fails++; }
  }
}
console.log(fails === 0 ? 'R15/R18: ALL 30 WAVE-4 ITEMS CLEAN' : fails + ' FLAGS');