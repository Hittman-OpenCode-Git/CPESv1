// S861: Verify edited items
const fs = require('fs');
const code = fs.readFileSync('pack_c_corrected.js', 'utf8');
const qids = ['P1-CC-060','P1-CC-061','P1-CC-064','P1-CC-071','P1-DC-005','P1-DC-010','P1-DC-012','P1-DC-013','P1-DC-015','P1-DC-025','P1-DC-030','P1-DC-035','P1-DC-040','P1-DC-045'];
let issues = 0;
for (const qid of qids) {
  const idx = code.indexOf('"QuestionID": "' + qid + '"');
  if (idx === -1) { console.log(qid + ' NOT FOUND'); issues++; continue; }
  const objStart = code.lastIndexOf('{', idx);
  let d = 0, is = false, esc = false, end = objStart;
  for (let i = objStart; i < Math.min(objStart + 6000, code.length); i++) {
    const ch = code[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (ch === '"') { is = !is; continue; }
    if (is) continue;
    if (ch === '{') d++;
    if (ch === '}') { d--; if (d === 0) { end = i + 1; break; } }
  }
  const block = code.substring(objStart, end);
  const cl = (block.match(/"CognitiveLevel"\s*:\s*"(\w+)"/) || [])[1] || '?';
  const ds = (block.match(/"DifficultyScore"\s*:\s*(\d+)/) || [])[1] || '?';
  const cc = (block.match(/"CorrectChoice"\s*:\s*"([ABCD])"/) || [])[1] || '?';
  
  // Check DL-008
  const ewCCRegex = new RegExp('"ExplanationWrong' + cc + '"\\s*:\\s*"([^"]*)"');
  const ewCCMatch = block.match(ewCCRegex);
  const ewCCval = ewCCMatch ? ewCCMatch[1] : 'ABSENT';
  const dl008 = (ewCCval !== 'ABSENT' && ewCCval.length > 0);
  
  // Check DL-026
  const letters = ['A', 'B', 'C', 'D'];
  let emptyNonCC = [];
  for (const l of letters) {
    if (l === cc) continue;
    const regex = new RegExp('"ExplanationWrong' + l + '"\\s*:\\s*"([^"]*)"');
    const m = block.match(regex);
    if (!m || m[1].length === 0) emptyNonCC.push(l);
  }
  
  const status = (dl008 ? ' DL008!' : '') + (emptyNonCC.length > 0 ? ' DL026:' + emptyNonCC.join(',') : '');
  console.log(qid + ' CL=' + cl + ' DS=' + ds + ' CC=' + cc + (status || ' CLEAN'));
  if (dl008 || emptyNonCC.length > 0) issues++;
}
console.log('\nTotal issues: ' + issues);
