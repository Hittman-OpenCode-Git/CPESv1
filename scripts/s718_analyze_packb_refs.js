// Comprehensive analysis of Pack B existing CognitiveLevel assignments
const fs = require('fs');

const content = fs.readFileSync('pack_b_corrected.js', 'utf8');

const re = /"QuestionID":\s*"(P1B-[^"]+)"[\s\S]*?"CognitiveLevel":\s*"([^"]+)"/g;
let m;
const refs = [];

while ((m = re.exec(content)) !== null) {
  const qid = m[1];
  const cl = m[2];
  const qidIdx = content.indexOf('"QuestionID": "' + qid + '"');
  if (qidIdx < 0) continue;
  const block = content.substring(qidIdx, qidIdx + 4000);
  
  // Extract stem
  const stemStart = block.indexOf('"Stem": "');
  let stem = '';
  if (stemStart >= 0) {
    let stemEnd = stemStart + 9;
    let escaped = false;
    for (let i = stemEnd; i < block.length; i++) {
      if (escaped) { escaped = false; continue; }
      if (block[i] === '\\') { escaped = true; continue; }
      if (block[i] === '"') { stemEnd = i; break; }
    }
    stem = block.substring(stemStart + 9, stemEnd);
  }
  
  // Extract choices
  const choicesStart = block.indexOf('"Choices":');
  let choiceA = '', choiceB = '', choiceC = '', choiceD = '';
  if (choicesStart >= 0) {
    const a = block.indexOf('"A": "', choicesStart); if (a >= 0) { let e = block.indexOf('"', a + 6); choiceA = block.substring(a + 6, e); }
    const b = block.indexOf('"B": "', choicesStart); if (b >= 0) { let e = block.indexOf('"', b + 6); choiceB = block.substring(b + 6, e); }
    const c = block.indexOf('"C": "', choicesStart); if (c >= 0) { let e = block.indexOf('"', c + 6); choiceC = block.substring(c + 6, e); }
    const d = block.indexOf('"D": "', choicesStart); if (d >= 0) { let e = block.indexOf('"', d + 6); choiceD = block.substring(d + 6, e); }
  }
  
  // Extract CorrectChoice and topic
  const ccMatch = block.match(/"CorrectChoice":\s*"([A-D])"/);
  const topicMatch = block.match(/"Topic":[\s\S]*?"([^"]{0,100})"/);
  const sectionMatch = block.match(/"Section":\s*"([A-Fa-f])"/);
  
  refs.push({ qid, cl, stem, choiceA, choiceB, choiceC, choiceD, cc: ccMatch ? ccMatch[1] : '', topic: topicMatch ? topicMatch[1] : '', section: sectionMatch ? sectionMatch[1] : '' });
}

// Show ALL items per level with their stems
for (const level of ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate']) {
  const items = refs.filter(r => r.cl === level);
  if (items.length === 0) continue;
  console.log(`\n======== ${level} (${items.length}) ========`);
  for (const item of items) {
    console.log(`${item.qid}: ${item.stem.substring(0, 150)}`);
    console.log(`  Sec:${item.section} CC:${item.cc} Q:${item.choiceA.substring(0,40)}|${item.choiceB.substring(0,40)}|${item.choiceC.substring(0,40)}|${item.choiceD.substring(0,40)}`);
    console.log(`  Topic: ${item.topic}`);
  }
}
