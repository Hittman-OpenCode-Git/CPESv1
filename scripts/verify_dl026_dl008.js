const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\p2\\pack_p2_c.js', 'utf8');
const items = content.match(/\{[^}]*QuestionID[^}]*\}/g) || [];
let dl026 = 0, dl008 = 0, total = 0;
for (const item of items) {
  total++;
  const qidMatch = item.match(/"QuestionID":\s*"([^"]+)"/);
  const qid = qidMatch ? qidMatch[1] : 'unknown';
  const ccMatch = item.match(/"CorrectChoice":\s*"([A-D])"/);
  const cc = ccMatch ? ccMatch[1] : null;
  if (cc) {
    const ewCCRegex = new RegExp('"ExplanationWrong' + cc + '":\\s*"([^"]*)"');
    const ewCC = ewCCRegex.exec(item);
    if (ewCC && ewCC[1].length > 0) dl008++;
    for (const L of ['A','B','C','D']) {
      if (L !== cc) {
        const ewRegex = new RegExp('"ExplanationWrong' + L + '":\\s*"([^"]*)"');
        const ew = ewRegex.exec(item);
        if (ew && ew[1].length > 0 && ew[1].length < 50) {
          dl026++;
          console.log('DL-026:', qid, 'EW_' + L, 'len=' + ew[1].length, 'text=' + ew[1].substring(0,60));
        }
      }
    }
  }
}
console.log('Total items:', total);
console.log('DL-008:', dl008);
console.log('DL-026:', dl026);