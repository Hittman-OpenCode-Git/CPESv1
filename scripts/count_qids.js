const fs = require('fs');
for (const f of ['pack_a_corrected.js','pack_b_corrected.js','pack_c_corrected.js','pack_d_corrected.js','pack_e_corrected.js']) {
  const c = fs.readFileSync('content/packs/'+f,'utf8');
  const m = c.match(/"QuestionID"\s*:/gi);
  console.log(f, ':', m?m.length:0);
}