const A = require('./tier3_wave13a.js');
const A2 = require('./tier3_wave13a2.js');
const B = require('./tier3_wave13b.js');
const B2 = require('./tier3_wave13b2.js');
const C = require('./tier3_wave13c.js');
const files = { a: A, a2: A2, b: B, b2: B2, c: C };
for (const [f, arr] of Object.entries(files)) {
  for (const it of arr) {
    if (it.QuestionID === 'P1-DC-105' && f === 'a') continue;
    console.log(`${it.QuestionID}:${it.CorrectChoice} [${f}]`);
  }
}