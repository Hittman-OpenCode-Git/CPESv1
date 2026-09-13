const fs = require('fs');
function extract(s, id) {
  const i = s.indexOf('"QuestionID": "' + id + '"');
  let d = 0, st = -1;
  for (let k = i; k >= 0; k--) {
    if (s[k] === '}') d++;
    else if (s[k] === '{') { d--; if (d < 0) { st = k; break; } }
  }
  let d2 = 0, en = -1;
  for (let k = st; k < s.length; k++) {
    if (s[k] === '{') d2++;
    else if (s[k] === '}') { d2--; if (d2 === 0) { en = k + 1; break; } }
  }
  return s.substring(st, en);
}
const pairs = [
  ['content/packs/pack_d_corrected.js', 'P1-DD-025'],
  ['content/packs/pack_c_corrected.js', 'P1-AC-050'],
];
for (const [f, id] of pairs) {
  const cur = fs.readFileSync(f, 'utf8');
  const bak = fs.readFileSync(f + '.bak-cert-20260910', 'utf8');
  console.log(id + ': untouched-bytes-identical=' + (extract(cur, id) === extract(bak, id)));
}
// certified counts per pack
for (const f of ['content/packs/pack_a_corrected.js', 'content/packs/pack_b_corrected.js', 'content/packs/pack_c_corrected.js', 'content/packs/pack_d_corrected.js', 'content/packs/pack_e_corrected.js']) {
  const t = fs.readFileSync(f, 'utf8');
  const c = (t.match(/"question_state"\s*:\s*"Certified"/g) || []).length;
  console.log(f + ' certified=' + c);
}