const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\p2\\pack_p2_c.js', 'utf8');

// Count QIDs
const qidMatches = content.match(/"QuestionID":\s*"P2-C-\d+"/g);
console.log('QID count:', qidMatches ? qidMatches.length : 0);

// Check DL-008: ExplanationWrong[CorrectChoice] non-empty
let dl008 = 0;
const ccRegex = /"CorrectChoice":\s*"([A-D])"/g;
let match;
while ((match = ccRegex.exec(content)) !== null) {
  const cc = match[1];
  const ewField = 'ExplanationWrong' + cc;
  const idx = match.index;
  const slice = content.slice(idx, idx + 2000);
  const ewRegex = new RegExp('"' + ewField + '":\\s*"([^"]*)"');
  const ewMatch = ewRegex.exec(slice);
  if (ewMatch && ewMatch[1].length > 0) dl008++;
}
console.log('DL-008:', dl008);

// Check DL-026: non-CC ExplanationWrong < 50 chars
let dl026 = 0;
const ewRegex = /"ExplanationWrong([A-D])":\s*"([^"]*)"/g;
while ((match = ewRegex.exec(content)) !== null) {
  const letter = match[1];
  const text = match[2];
  if (text.length > 0 && text.length < 50) {
    // Check if this is the CC slot by looking backwards for CorrectChoice
    const before = content.slice(Math.max(0, match.index - 500), match.index);
    const ccMatch = before.match(/"CorrectChoice":\s*"([A-D])"/);
    if (ccMatch && ccMatch[1] !== letter) {
      dl026++;
      console.log('DL-026 candidate: EW_' + letter + ' len=' + text.length + ' text=' + text.substring(0,60));
    }
  }
}
console.log('DL-026:', dl026);