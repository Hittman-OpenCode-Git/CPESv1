// S881: Pack C forensic diff — trace corruption window around P1-CC-001
const fs = require('fs');
const path = require('path');
const dir = process.cwd();

const backups = fs.readdirSync(dir)
  .filter(f => f.startsWith('pack_c_corrected.js.bak-'));

backups.sort().forEach(f => {
  let c = fs.readFileSync(path.join(dir, f), 'utf8');
  if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);
  
  // Find P1-CC-001 QID
  const qidIdx = c.indexOf('"QuestionID": "P1-CC-001"');
  if (qidIdx < 0) { console.log(f + ': P1-CC-001 NOT FOUND'); return; }
  
  // Get the chunk from QID to 600 chars after
  const chunk = c.substring(qidIdx, qidIdx + 600);
  
  // Find CognitiveLevel position within chunk
  const clIdx = chunk.indexOf('"CognitiveLevel"');
  if (clIdx < 0) { console.log(f + ': NO CognitiveLevel'); return; }
  
  // Everything after CognitiveLevel until we see the next object or key
  const tail = chunk.substring(clIdx + 20);
  // Check: is there a closing }, within the next 100 chars?
  const closeIdx = tail.indexOf('},');
  const hasClose = closeIdx >= 0 && closeIdx < 100;
  
  // Also check if the file evals
  let evalOk = false;
  try {
    eval(c);
    evalOk = true;
  } catch(e) {
    evalOk = false;
  }
  
  console.log(f + ': hasCloseBrace=' + hasClose + ' evalOK=' + evalOk + ' | tail=' + JSON.stringify(tail.substring(0, 80)));
});
