const fs = require('fs');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';
const files = [
  ['p2/case_pack_p2_1.js', 'casePackP2_1'],
  ['p2/case_pack_p2_2.js', 'casePackP2_2'],
  ['p2/case_pack_p2_3.js', 'casePackP2_3']
];
const sessions = {};
for (const [rel, varName] of files) {
  const src = fs.readFileSync(base + '/' + rel, 'utf8');
  const arr = new Function(src + '\nreturn ' + varName + ';')();
  for (const c of arr) {
    if (c.question_state === 'Certified') {
      const s = c.certification_session || 'NONE';
      sessions[s] = (sessions[s] || 0) + 1;
    }
  }
}
console.log('Session distribution: ' + JSON.stringify(sessions));
