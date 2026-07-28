const fs = require('fs');
const pack = fs.readFileSync('pack_d_corrected.js', 'utf8');
for (const qid of ['P1-ED-064', 'P1-ED-066', 'P1-ED-058']) {
  let idx = pack.indexOf('"QuestionID": "' + qid + '"');
  let found = 0;
  while (idx !== -1) {
    const after = pack.substring(idx, Math.min(idx + 4000, pack.length));
    const ewAM = after.match(/"ExplanationWrongA":\s*"([^"]*)"/);
    const ewBM = after.match(/"ExplanationWrongB":\s*"([^"]*)"/);
    const ewCM = after.match(/"ExplanationWrongC":\s*"([^"]*)"/);
    const ewDM = after.match(/"ExplanationWrongD":\s*"([^"]*)"/);
    const ccM = after.match(/"CorrectChoice":\s*"([^"]*)"/);
    const stateM = after.match(/"question_state":\s*"([^"]*)"/);
    found++;
    const cc = ccM ? ccM[1] : '?';
    const state = stateM ? stateM[1] : '?';
    console.log(qid + ' #' + found + ': CC=' + cc + ' state=' + state + 
      ' A=' + (ewAM ? ewAM[1].length : -1) +
      ' B=' + (ewBM ? ewBM[1].length : -1) +
      ' C=' + (ewCM ? ewCM[1].length : -1) +
      ' D=' + (ewDM ? ewDM[1].length : -1));
    idx = pack.indexOf('"QuestionID": "' + qid + '"', idx + 1);
  }
}
