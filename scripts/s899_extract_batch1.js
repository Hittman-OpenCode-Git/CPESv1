// S899 — Extract exact text boundaries for Batch 1 items
const fs = require('fs');

function extractItemRange(filePath, qids) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const results = [];
  
  for (const qid of qids) {
    const searchStr = `"QuestionID": "${qid}"`;
    const startIdx = raw.indexOf(searchStr);
    if (startIdx === -1) { results.push({ qid, error: 'NOT FOUND' }); continue; }
    
    // Find the next QuestionID after this one
    const nextSearch = raw.indexOf('"QuestionID": "', startIdx + searchStr.length);
    const endIdx = nextSearch !== -1 ? nextSearch : startIdx + 5000;
    
    const text = raw.substring(startIdx, endIdx);
    results.push({
      qid,
      startIdx,
      endIdx,
      length: text.length,
      preview: text.substring(0, 200),
      last200: text.substring(text.length - 200)
    });
  }
  return results;
}

const batch1 = ['P1-EC-001', 'P1-EC-005', 'P1-EC-010', 'P1-EC-030', 'P1-EC-055'];
const results = extractItemRange('pack_c_corrected.js', batch1);

results.forEach(r => {
  if (r.error) { console.log(`${r.qid}: ${r.error}`); return; }
  console.log(`\n=== ${r.qid} (start:${r.startIdx}, end:${r.endIdx}, len:${r.length}) ===`);
  console.log('FIRST 300:');
  console.log(r.preview.substring(0, 300));
  console.log('...');
  console.log('LAST 200:');
  console.log(r.last200);
});
