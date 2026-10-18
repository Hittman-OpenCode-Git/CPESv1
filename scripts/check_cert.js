const fs = require('fs');
const packs = [
  'content/packs/pack_a_corrected.js',
  'content/packs/pack_b_corrected.js',
  'content/packs/pack_c_corrected.js',
  'content/packs/pack_d_corrected.js',
  'content/packs/pack_e_corrected.js'
];
let total = 0;
for (const f of packs) {
  const c = fs.readFileSync(f, 'utf8');
  const regex = /"question_state"\s*:\s*"Certified"/gi;
  const m = c.match(regex);
  const n = m ? m.length : 0;
  total += n;
  console.log(f + ': ' + n);
}
console.log('Total: ' + total);