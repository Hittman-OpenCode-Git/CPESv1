const fs = require('fs');
const c = fs.readFileSync('content/packs/pack_c_corrected.js', 'utf8');
const a = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const show = (src, qid) => {
  const i = src.indexOf('"QuestionID": "' + qid + '"');
  const o = src.lastIndexOf('  {\n    "Part": 1,', i);
  const n = src.indexOf('  {\n    "Part": 1,', i + 20);
  console.log('===== ' + qid + ' =====');
  console.log(src.slice(o, n === -1 ? o + 6000 : n).slice(0, 5500));
};
show(c, 'P1-DC-104');
show(c, 'P1-DC-101');
show(a, 'P1-C-101');