const fs = require('fs');
let a = fs.readFileSync('scripts/tier3_wave12a.js', 'utf8');
a = a.split('B-A-110-').join('B-A-160-').split('B-A.110 ').join('B-A.160 ');
fs.writeFileSync('scripts/tier3_wave12a.js', a, 'utf8');
for (const f of ['scripts/tier3_wave12b.js', 'scripts/tier3_wave12b2.js']) {
  let s = fs.readFileSync(f, 'utf8');
  s = s.split('B-A-120-').join('B-A-170-').split('B-A.120 ').join('B-A.170 ');
  fs.writeFileSync(f, s, 'utf8');
}
console.log('done');