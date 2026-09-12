const fs = require('fs');
const raw = fs.readFileSync('./scripts/reports/output/ValidationReport.json', 'utf8');
const ids = [];
for (let n = 101; n <= 130; n++) ids.push('P1-DC-' + n);
for (const id of ids) {
  const hits = [];
  let idx = -1;
  while ((idx = raw.indexOf(id, idx + 1)) !== -1) hits.push(idx);
  if (hits.length) console.log(id + ': mentioned ' + hits.length + 'x');
}
console.log('scan done');