const fs = require('fs');
const f = 'knowledge/CURRENT_BASELINES.md';
let bl = fs.readFileSync(f, 'utf8');
const reps = [
  ['pack_a_corrected.js', '6FFD8908647E013094CA89D8DF2CF9E0BDBAC0D81247FBD84EDFF0FA9A0C478D', '2,374,526'],
  ['pack_d_corrected.js', '96F728B39F2D6F61BD387B3DAA17EE9C6811DA5346BD01D076877B6090E79892', '2,593,710'],
];
for (const [label, sha, size] of reps) {
  const esc = label.replace(/\./g, '\\.');
  const re = new RegExp('(\\| `' + esc + '` \\| `)[0-9A-F]+(` \\| `TBD` \\| )(?:TBD|[0-9,]+)');
  if (!re.test(bl)) { console.log('MISS ' + label); continue; }
  bl = bl.replace(re, '$1' + sha + '$2' + size);
  console.log('patched ' + label);
}
fs.writeFileSync(f, bl, 'utf8');
console.log('done');