const fs = require('fs');

// Fix P1-EC-010 in pack_c_corrected.js: swap ExplanationWrongB and ExplanationWrongD
let raw = fs.readFileSync('pack_c_corrected.js', 'utf8');

// Fix EC-010: CorrectChoice=B, so ExplanationWrongB must be ""
// Currently EWB has text, EWD is "". Need to move EWB text to EWD
const ec010Idx = raw.indexOf('"QuestionID": "P1-EC-010"');
const ec010next = raw.indexOf('"QuestionID": "P1-EC-011"', ec010Idx + 1);
if (ec010next === -1) {
  // fallback
  const ec010window = raw.substring(ec010Idx, ec010Idx + 10000);
  // Find EW fields
  const ewbMatch = ec010window.match(/"ExplanationWrongB":\s*"((?:[^"\\]|\\.)*)"/s);
  const ewdMatch = ec010window.match(/"ExplanationWrongD":\s*"((?:[^"\\]|\\.)*)"/s);
  if (ewbMatch && ewdMatch) {
    console.log('EC-010: EWB=' + ewbMatch[1].length + ' chars, EWD=' + ewdMatch[1].length + ' chars');
    // Swap: EWB → "", EWD → EWB text
    // Use direct replacement
    const oldEWB = '"ExplanationWrongB": ' + JSON.stringify(ewbMatch[1]);
    const newEWB = '"ExplanationWrongB": ""';
    const oldEWD = '"ExplanationWrongD": ' + JSON.stringify(ewdMatch[1]);
    const newEWD = '"ExplanationWrongD": ' + JSON.stringify(ewbMatch[1]);
    
    raw = raw.replace(oldEWB, newEWB);
    raw = raw.replace(oldEWD, newEWD);
    console.log('EC-010: fixed');
  }
}

// Fix P1-ED-015 in pack_d_corrected.js: Same issue
let rawD = fs.readFileSync('pack_d_corrected.js', 'utf8');

const ed015Idx = rawD.indexOf('"QuestionID": "P1-ED-015"');
const ed015window = rawD.substring(ed015Idx, ed015Idx + 10000);
const ewbMatch2 = ed015window.match(/"ExplanationWrongB":\s*"((?:[^"\\]|\\.)*)"/s);
const ewdMatch2 = ed015window.match(/"ExplanationWrongD":\s*"((?:[^"\\]|\\.)*)"/s);

if (ewbMatch2 && ewdMatch2) {
  console.log('ED-015: EWB=' + ewbMatch2[1].length + ' chars, EWD=' + ewdMatch2[1].length + ' chars');
  const oldEWB = '"ExplanationWrongB": ' + JSON.stringify(ewbMatch2[1]);
  const newEWB = '"ExplanationWrongB": ""';
  const oldEWD = '"ExplanationWrongD": ' + JSON.stringify(ewdMatch2[1]);
  const newEWD = '"ExplanationWrongD": ' + JSON.stringify(ewbMatch2[1]);
  
  rawD = rawD.replace(oldEWB, newEWB);
  rawD = rawD.replace(oldEWD, newEWD);
  console.log('ED-015: fixed');
}

fs.writeFileSync('pack_c_corrected.js', raw, 'utf8');
fs.writeFileSync('pack_d_corrected.js', rawD, 'utf8');

// Verify
console.log('\nVerification:');
const vc = fs.readFileSync('pack_c_corrected.js', 'utf8');
const vd = fs.readFileSync('pack_d_corrected.js', 'utf8');

// Check parse
try { new Function(vc); console.log('Pack C: PARSE PASS'); } catch(e) { console.log('Pack C: PARSE FAIL'); }
try { new Function(vd); console.log('Pack D: PARSE PASS'); } catch(e) { console.log('Pack D: PARSE FAIL'); }

console.log('\nDone.');
