const fs = require('fs');
// wave12a: QIDs 151-160 but keys/topics say 101-110 -> shift to 151-160
let a = fs.readFileSync('scripts/tier3_wave12a.js', 'utf8');
a = a.replace(/B-A-10(\d)/g, 'B-A-15$1').replace(/B-A\.10(\d)/g, 'B-A.15$1');
fs.writeFileSync('scripts/tier3_wave12a.js', a, 'utf8');
// wave12b (+b2): QIDs 161-170 but keys/topics say 111-120 -> shift to 161-170
for (const f of ['scripts/tier3_wave12b.js', 'scripts/tier3_wave12b2.js']) {
  let s = fs.readFileSync(f, 'utf8');
  s = s.replace(/B-A-11(\d)/g, 'B-A-16$1').replace(/B-A\.11(\d)/g, 'B-A.16$1');
  fs.writeFileSync(f, s, 'utf8');
}
console.log('keys renumbered; verifying no stale 10x/11x remain:');
for (const f of ['scripts/tier3_wave12a.js', 'scripts/tier3_wave12b.js', 'scripts/tier3_wave12b2.js']) {
  const s = fs.readFileSync(f, 'utf8');
  const stale = (s.match(/B-A-(10\d|11\d)[^0-9]/g) || []).length + (s.match(/B-A\.(10\d|11\d)[^0-9]/g) || []).length;
  console.log(f + ' stale refs: ' + stale);
}