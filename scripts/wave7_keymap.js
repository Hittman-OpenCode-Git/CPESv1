const files = ['tier3_wave7a.js', 'tier3_wave7b2.js', 'tier3_wave7b3.js', 'tier3_wave7c.js'];
for (const f of files) {
  const arr = require('./' + f);
  const live = arr.filter(o => !(o.certification_batch || '').includes('WITHDRAWN'));
  console.log(f + ': ' + live.map(o => o.QuestionID + '=' + o.CorrectChoice).join(' '));
}