const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\pack_a_corrected.js', 'utf8');
const idx = c.indexOf('"QuestionID": "P1-C-037"');
console.log('pos:', idx);
console.log('around:', c.substring(idx - 80, idx + 80));
