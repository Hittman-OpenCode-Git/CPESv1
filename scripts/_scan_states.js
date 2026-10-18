const fs = require('fs');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';
const src = fs.readFileSync(base + '/p2/case_pack_p2_1.js', 'utf8');
const arr = new Function(src + '\nreturn casePackP2_1;')();
const unproc = arr.filter(c => c.question_state !== 'Certified');
console.log('Pack 1 Unprocessed: ' + unproc.length);
for (const c of arr) {
  console.log(c.CaseID + ' state=' + c.question_state + ' session=' + (c.certification_session || 'MISSING') + ' date=' + (c.certification_date || 'MISSING'));
}
