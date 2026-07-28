const fs = require('fs');
const path = require('path');
const c = fs.readFileSync(path.join(__dirname, '..', 'pack_c_corrected.js'), 'utf8');

// Check pattern
const idx1 = c.indexOf('P1-BC-001');
console.log('P1-BC-001 at pos:', idx1);
console.log('Context:', c.substring(idx1 - 5, idx1 + 25));

// Check full QID pattern
const fullPattern = '"QuestionID": "P1-BC-001"';
const idx2 = c.indexOf(fullPattern);
console.log('Full pattern at pos:', idx2);

if (idx2 !== -1) {
  console.log('Context around:', JSON.stringify(c.substring(idx2 - 10, idx2 + 40)));
} else {
  console.log('Not found!');
}

// Try with escaped quotes
const idx3 = c.indexOf('"QuestionID": "P1-BC-001"');
console.log('Variant at pos:', idx3);

// Check first 3 QIDs in the file
const qidPattern = /"QuestionID":\s*"(\w+-\w+-\d+)"/g;
let match;
let count = 0;
while ((match = qidPattern.exec(c)) !== null && count < 10) {
  console.log('QID:', match[1], 'at', match.index);
  count++;
}
