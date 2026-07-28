// Check existing Pack B CognitiveLevel assignments for reference patterns
const fs = require('fs');

const content = fs.readFileSync('pack_b_corrected.js', 'utf8');

// Find all items with CognitiveLevel (string escape-safe)
const re = /"QuestionID":\s*"(P1B-[^"]+)"[\s\S]*?"CognitiveLevel":\s*"([^"]+)"/g;
let m;
const items = [];
while ((m = re.exec(content)) !== null) {
  items.push({ qid: m[1], cl: m[2] });
}

console.log('=== Pack B existing CognitiveLevel assignments ===');
const byCL = {};
for (const item of items) byCL[item.cl] = (byCL[item.cl] || 0) + 1;
for (const [cl, c] of Object.entries(byCL)) console.log('  ' + cl + ': ' + c);

// Show sample per level
for (const level of ['Remember', 'Understand', 'Apply', 'Analyze']) {
  const levelItems = items.filter(i => i.cl === level);
  console.log('\n--- ' + level + ' (' + levelItems.length + ' total) ---');
  for (const s of levelItems.slice(0, 5)) {
    const qidIdx = content.indexOf('"QuestionID": "' + s.qid + '"');
    if (qidIdx < 0) continue;
    const block = content.substring(qidIdx, qidIdx + 3000);
    // Extract stem - be careful with string escaping
    const stemStart = block.indexOf('"Stem": "');
    if (stemStart < 0) continue;
    let stemEnd = stemStart + 9;
    let escaped = false;
    let inStr = true;
    for (let i = stemEnd; i < block.length; i++) {
      if (escaped) { escaped = false; continue; }
      if (block[i] === '\\') { escaped = true; continue; }
      if (block[i] === '"') { stemEnd = i; break; }
    }
    const stem = block.substring(stemStart + 9, stemEnd);
    
    // Extract topic
    const topicStart = block.indexOf('"Topic": "');
    let topic = '';
    if (topicStart >= 0) {
      let topicEnd = topicStart + 10;
      let esc2 = false;
      for (let i = topicEnd; i < block.length; i++) {
        if (esc2) { esc2 = false; continue; }
        if (block[i] === '\\') { esc2 = true; continue; }
        if (block[i] === '"') { topicEnd = i; break; }
      }
      topic = block.substring(topicStart + 10, topicEnd);
    }
    
    console.log('  ' + s.qid + ': ' + stem.substring(0, 120));
    if (topic) console.log('    Topic: ' + topic);
  }
}
