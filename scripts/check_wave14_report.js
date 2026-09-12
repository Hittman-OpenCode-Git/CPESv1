const fs = require('fs');
const raw = fs.readFileSync('./scripts/reports/output/ValidationReport.json', 'utf8');
for (let n = 101; n <= 130; n++) {
  const id = 'P1-C-' + n;
  let c = 0, idx = -1;
  while ((idx = raw.indexOf(id, idx + 1)) !== -1) c++;
  if (c) console.log(id + ': mentioned ' + c + 'x');
}
console.log('scan done');