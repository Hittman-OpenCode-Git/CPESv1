const fs = require('fs');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';
const files = [
  ['p2/case_pack_p2_1.js', 'casePackP2_1'],
  ['p2/case_pack_p2_2.js', 'casePackP2_2'],
  ['p2/case_pack_p2_3.js', 'casePackP2_3']
];
let allCert = 0;
let allUnp = 0;
for (const [rel, varName] of files) {
  const src = fs.readFileSync(base + '/' + rel, 'utf8');
  const arr = new Function(src + '\nreturn ' + varName + ';')();
  const cert = arr.filter(c => c.question_state === 'Certified');
  const unp = arr.filter(c => c.question_state !== 'Certified');
  allCert += cert.length;
  allUnp += unp.length;
  const sessions = {};
  cert.forEach(c => {
    const s = c.certification_session || 'NONE';
    sessions[s] = (sessions[s] || 0) + 1;
  });
  console.log(rel + ': ' + cert.length + ' Certified, ' + unp.length + ' Unprocessed — sessions: ' + JSON.stringify(sessions));
}
console.log('\nTOTAL: ' + allCert + ' Certified, ' + allUnp + ' Unprocessed out of ' + (allCert + allUnp));
