const fs = require('fs');
for (const f of ['tier3_wave12a.js', 'tier3_wave12b.js', 'tier3_wave12b2.js', 'tier3_wave12c.js']) {
  const s = fs.readFileSync('scripts/' + f, 'utf8');
  const keys = [];
  const re = /"UniqueConceptKey": "([^"]+)"/g;
  let m;
  while ((m = re.exec(s)) !== null) keys.push(m[1]);
  const qids = [];
  const re2 = /"QuestionID": "([^"]+)"/g;
  while ((m = re2.exec(s)) !== null) qids.push(m[1]);
  console.log(f);
  for (let i = 0; i < qids.length; i++) console.log('  ' + qids[i] + ' <-> ' + keys[i]);
}