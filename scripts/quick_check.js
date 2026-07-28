const fs = require('fs');
for (const fn of ['scored_cases.js','scored_cases2.js','scored_cases3.js','scored_cases4.js','scored_cases5.js']) {
  const c = fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/' + fn, 'utf8');
  const cert = (c.match(/"question_state":\s*"Certified"/g) || []).length;
  const all = (c.match(/"question_state"/g) || []).length;
  const notCert = all - cert;
  const cids = (c.match(/"CaseID"/g) || []).length;
  console.log(fn + ': CaseIDs=' + cids + ' question_state total=' + all + ' Certified=' + cert + ' nonCert=' + notCert);
}
