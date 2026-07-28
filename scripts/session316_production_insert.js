// S316 Production Insertion — Wave 2 Domain E items → pack_e_corrected.js
const fs = require('fs');

const batch = JSON.parse(fs.readFileSync('./reports/SESSION314_AUTHORING_BATCH_FULL.json', 'utf8'));
const packEPath = './pack_e_corrected.js';
let packSrc = fs.readFileSync(packEPath, 'utf8');

const today = '2026-07-27';
const session = 'S316';
let inserted = 0;
const items = batch.items;

for (const item of items) {
  const qid = item.QuestionID;
  // Promote to production
  item.ProductionStatus = 'Production';
  item.question_state = 'Certified';
  item.certification_date = today;
  item.certification_session = session;
  
  // Serialize the item (compact JSON — single line after the opening brace)
  const serialized = JSON.stringify(item, null, 2);
  
  // Insert before closing ];
  const insertIdx = packSrc.lastIndexOf('];');
  if (insertIdx === -1) {
    console.error('ERROR: Could not find closing ]; in pack_e');
    process.exit(1);
  }
  
  packSrc = packSrc.slice(0, insertIdx) + ',\n' + serialized + '\n];';
  inserted++;
  console.log('Inserted:', qid);
}

fs.writeFileSync(packEPath, packSrc, 'utf8');
console.log('\nTotal inserted:', inserted);
console.log('File size:', fs.statSync(packEPath).size, 'bytes');
