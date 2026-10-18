const fs = require('fs');

function checkLengthCueing(packPath, label) {
  const content = fs.readFileSync(packPath, 'utf8');
  // Parse items using simple regex - find all question objects
  // We'll use the pack parser for accuracy
  const packParser = require('./lib/pack_parser.js');
  const result = packParser.parsePack(content);
  
  let correctLengths = [];
  let distractorLengths = [];
  
  for (const r of result.records) {
    if (r.Choices && r.CorrectChoice) {
      const correctText = r.Choices[r.CorrectChoice];
      if (correctText) correctLengths.push(correctText.length);
      
      for (const [k, v] of Object.entries(r.Choices)) {
        if (k !== r.CorrectChoice && v) {
          distractorLengths.push(v.length);
        }
      }
    }
  }
  
  if (correctLengths.length > 0) {
    const avgCorrect = correctLengths.reduce((a,b) => a+b, 0) / correctLengths.length;
    const avgDistractor = distractorLengths.reduce((a,b) => a+b, 0) / distractorLengths.length;
    const diff = avgCorrect - avgDistractor;
    console.log(label + ': Avg correct=' + avgCorrect.toFixed(1) + ', Avg distractor=' + avgDistractor.toFixed(1) + ', Diff=' + diff.toFixed(1));
    
    if (diff > 50) {
      console.log('  *** LENGTH CUEING ALERT: Correct answers ' + diff.toFixed(1) + ' chars longer on average ***');
    }
  }
}

checkLengthCueing('content/packs/pack_d_corrected.js', 'Pack D');
checkLengthCueing('p2/pack_p2_f.js', 'P2-F');
checkLengthCueing('p2/pack_p2_d.js', 'P2-D');
checkLengthCueing('content/packs/pack_a_corrected.js', 'Pack A');
checkLengthCueing('content/packs/pack_b_corrected.js', 'Pack B');
checkLengthCueing('content/packs/pack_c_corrected.js', 'Pack C');
checkLengthCueing('content/packs/pack_e_corrected.js', 'Pack E');