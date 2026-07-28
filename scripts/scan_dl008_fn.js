// scan_dl008_fn.js v2 — Function-constructor DL-008 scanner
// Handles pack files with variable assignment format

const fs = require('fs');

const packMap = {
  'pack_c_corrected.js': 'MCQ_BANK_C',
  'pack_d_corrected.js': 'MCQ_BANK_D'
};

for (const [file, varName] of Object.entries(packMap)) {
  console.log('\n=== ' + file + ' ===');
  const code = fs.readFileSync(file, 'utf8');
  
  // Wrap in a function that returns the array
  const fn = new Function(
    code + '\nreturn ' + varName + ';'
  );
  
  const arr = fn();
  
  if (!Array.isArray(arr)) {
    console.log('ERROR: not an array, got ' + typeof arr);
    continue;
  }

  console.log('Total objects: ' + arr.length);

  // Group objects by QuestionID
  const qidMap = {};
  for (const obj of arr) {
    if (obj && obj.QuestionID) {
      if (!qidMap[obj.QuestionID]) qidMap[obj.QuestionID] = [];
      qidMap[obj.QuestionID].push(obj);
    }
  }

  let dl008Total = 0;
  let dl008Certified = 0;
  const findings = [];

  for (const [qid, objs] of Object.entries(qidMap)) {
    // Only items in this pack (Pack C = P1-*C-* or P1-C*, Pack D = P1-*D-* or P1-D*)
    
    // Find CorrectChoice and question_state across all objects for this QID
    let cc = null;
    let qs = null;
    for (const obj of objs) {
      if (obj.CorrectChoice) cc = obj.CorrectChoice;
      if (obj.question_state) qs = obj.question_state;
    }
    
    if (!cc) continue;
    
    const isCertified = qs === 'Certified';
    
    // Check ExplanationWrong[CC] across all objects for this QID
    const ewKey = 'ExplanationWrong' + cc;
    let ewVal = null;
    for (const obj of objs) {
      if (obj[ewKey] !== undefined) {
        ewVal = obj[ewKey];
        break;
      }
    }
    
    if (ewVal !== undefined && ewVal !== null && ewVal !== '') {
      dl008Total++;
      if (isCertified) dl008Certified++;
      findings.push({
        qid: qid,
        cc: cc,
        ew: ewVal.substring(0, 80),
        certified: isCertified
      });
    }
  }

  console.log('DL-008 instances: ' + dl008Total + ' (' + dl008Certified + ' Certified)');
  console.log('');
  for (const f of findings) {
    console.log('  ' + f.qid + ' | CC=' + f.cc + ' | EW_' + f.cc + '="' + f.ew + '..."' + (f.certified ? ' [Certified]' : ''));
  }
}
