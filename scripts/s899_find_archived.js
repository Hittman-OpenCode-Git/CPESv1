// S899 — Corrected findArchived (QuestionID-first, not window-based)
const fs = require('fs');

function findArchivedByBlock(filePath, label) {
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Split by QuestionID boundaries
  const blocks = raw.split(/"QuestionID":/);
  const results = [];
  
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    // Extract QuestionID value
    const qidMatch = block.match(/"\s*(P1-[EF][CD]-\d+)/);
    if (!qidMatch) continue;
    const qid = qidMatch[1];
    
    // Check question_state within this block (before next QuestionID)
    if (block.includes('"Archived"')) {
      const secMatch = block.match(/"Section":\s*"([EF])"/);
      const topicMatch = block.match(/"Topic":\s*"([^"]+)"/);
      results.push({
        qid, 
        section: secMatch ? secMatch[1] : '?',
        topic: topicMatch ? topicMatch[1] : '?'
      });
    }
  }
  
  console.log(`\n=== ${label} ===`);
  console.log(`E+F Archived: ${results.length}`);
  
  const bySec = {};
  results.forEach(r => {
    bySec[r.section] = (bySec[r.section] || 0) + 1;
    console.log(`  ${r.qid}  Sec:${r.section}  Topic: ${r.topic}`);
  });
  console.log(`  Section E: ${bySec['E'] || 0}, Section F: ${bySec['F'] || 0}`);
  return results;
}

const c = findArchivedByBlock('pack_c_corrected.js', 'PACK C');
const d = findArchivedByBlock('pack_d_corrected.js', 'PACK D');
console.log(`\n=== TOTAL: ${c.length + d.length} archived E+F items ===`);
