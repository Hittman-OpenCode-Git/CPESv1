const fs = require('fs');
const content = fs.readFileSync('content/cases/case_pack_1_corrected.js', 'utf8');
const caseRegex = /"CaseID":\s*"([^"]+)"/g;
let m;
const positions = [];
while ((m = caseRegex.exec(content)) !== null) {
  positions.push({id: m[1], pos: m.index});
}
console.log('Cases found:', positions.length);
if (positions.length > 0) {
  const start = positions[0].pos;
  const end = positions.length > 1 ? positions[1].pos : content.length;
  const block = content.substring(start, end);
  const itemRegex = /"ItemID":\s*"([^"]+)"/g;
  let im;
  let count = 0;
  while ((im = itemRegex.exec(block)) !== null) {
    count++;
  }
  console.log('Items in first case:', count);
  console.log('First case ID:', positions[0].id);
  console.log('Block length:', block.length);
  console.log('Block preview:', block.substring(0, 200));
}
