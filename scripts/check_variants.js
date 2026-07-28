const fs = require('fs');
const pack = fs.readFileSync('pack_d_corrected.js', 'utf8');
for (const qid of ['P1-ED-064', 'P1-ED-066', 'P1-ED-058', 'P1-ED-028', 'P1-ED-042']) {
  let idx = 0;
  let found = 0;
  console.log(`=== ${qid} ===`);
  while ((idx = pack.indexOf('"QuestionID": "' + qid + '"', idx)) !== -1) {
    const after = pack.substring(idx, Math.min(idx + 5000, pack.length));
    const ewA = (after.match(/"ExplanationWrongA":\s*"([^"]*)"/) || [null,'UNKNOWN'])[1];
    const ewB = (after.match(/"ExplanationWrongB":\s*"([^"]*)"/) || [null,'UNKNOWN'])[1];
    const ewC = (after.match(/"ExplanationWrongC":\s*"([^"]*)"/) || [null,'UNKNOWN'])[1];
    const ewD = (after.match(/"ExplanationWrongD":\s*"([^"]*)"/) || [null,'UNKNOWN'])[1];
    const cc = (after.match(/"CorrectChoice":\s*"([^"]*)"/) || [null,'?'])[1];
    const state = (after.match(/"question_state":\s*"([^"]*)"/) || [null,'?'])[1];
    found++;
    console.log(`  #${found} CC=${cc} state=${state} A=${ewA.length} B=${ewB.length} C=${ewC.length} D=${ewD.length}`);
    idx++;
  }
  console.log(`  Total occurrences: ${found}`);
  console.log('');
}
