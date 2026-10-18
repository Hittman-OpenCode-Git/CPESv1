const fs = require('fs');
const packs = ['pack_p2_a.js', 'pack_p2_b.js', 'pack_p2_c.js', 'pack_p2_d.js', 'pack_p2_e.js', 'pack_p2_f.js'];
packs.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const regex = /question_state\s*:\s*"Certified"/g;
  const matches = content.match(regex);
  console.log(p, matches ? matches.length : 0);
});