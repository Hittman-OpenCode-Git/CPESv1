// remediate_dl008_v3.js — Targeted string replacement for EW[CC] fields
// For each DL-008 QID, finds the exact "ExplanationWrongX": "value" and replaces with "ExplanationWrongX": ""

const fs = require('fs');

const packMap = {
  'pack_c_corrected.js': { varName: 'MCQ_BANK_C' },
  'pack_d_corrected.js': { varName: 'MCQ_BANK_D' }
};

for (const [file, config] of Object.entries(packMap)) {
  console.log('\n=== Processing ' + file + ' ===');
  const code = fs.readFileSync(file, 'utf8');
  
  // Parse
  let arr;
  try {
    arr = new Function(code + '\nreturn ' + config.varName + ';')();
  } catch(e) {
    console.log('ERROR parsing: ' + e.message);
    continue;
  }
  
  // Find DL-008 items
  const dl008 = [];
  for (const obj of arr) {
    if (!obj.QuestionID || !obj.CorrectChoice) continue;
    const cc = obj.CorrectChoice;
    const ewKey = 'ExplanationWrong' + cc;
    const ewVal = obj[ewKey];
    if (ewVal && ewVal !== '') {
      dl008.push({ qid: obj.QuestionID, cc, ewKey, ewVal });
    }
  }
  
  console.log('DL-008 items to fix: ' + dl008.length);
  
  // For each DL-008 item, find the specific line and replace
  // Strategy: Find "QuestionID": "QID", then search forward for the ExplanationWrongX field
  let content = code;
  let fixed = 0;
  const failures = [];
  
  for (const item of dl008) {
    // Find the QuestionID position
    const qidStr = '"QuestionID": "' + item.qid + '"';
    const qidPos = content.indexOf(qidStr);
    if (qidPos < 0) {
      failures.push({ ...item, reason: 'QID not found' });
      continue;
    }
    
    // Search forward from QID for the EW key (within next 8000 chars - enough for one object)
    const searchWindow = content.substring(qidPos, qidPos + 8000);
    const ewKeyStr = '"' + item.ewKey + '": ';
    const ewPos = searchWindow.indexOf(ewKeyStr);
    if (ewPos < 0) {
      failures.push({ ...item, reason: 'EW key not found near QID' });
      continue;
    }
    
    const absEwPos = qidPos + ewPos + ewKeyStr.length;
    
    // The value starts with " and goes to the closing "
    // Find the value boundaries
    const afterKey = content.substring(absEwPos);
    if (afterKey[0] !== '"') {
      failures.push({ ...item, reason: 'Value does not start with quote: ' + afterKey.substring(0, 10) });
      continue;
    }
    
    // Parse the JSON string value to find its end
    let valEnd = 1;
    let escape = false;
    while (valEnd < afterKey.length) {
      const ch = afterKey[valEnd];
      if (escape) { escape = false; valEnd++; continue; }
      if (ch === '\\') { escape = true; valEnd++; continue; }
      if (ch === '"') break; // Found closing quote
      valEnd++;
    }
    
    if (valEnd >= afterKey.length) {
      failures.push({ ...item, reason: 'Could not find closing quote for value' });
      continue;
    }
    
    const valEndAbs = absEwPos + valEnd + 1; // +1 to include the closing quote
    
    // Replace the value with ""
    const before = content.substring(0, absEwPos);
    const after = content.substring(valEndAbs);
    content = before + '""' + after;
    
    fixed++;
    console.log('  OK ' + item.qid + ': ' + item.ewKey + ' cleared');
  }
  
  console.log('Fixed: ' + fixed + '/' + dl008.length);
  if (failures.length > 0) {
    console.log('FAILURES:');
    for (const f of failures) {
      console.log('  ' + f.qid + ' | ' + f.ewKey + ' | ' + f.reason);
    }
  }
  
  if (fixed > 0) {
    // Verify by re-parsing
    try {
      const verifyArr = new Function(content + '\nreturn ' + config.varName + ';')();
      // Count remaining DL-008
      let remaining = 0;
      for (const obj of verifyArr) {
        if (!obj.QuestionID || !obj.CorrectChoice) continue;
        const cc = obj.CorrectChoice;
        const ewKey = 'ExplanationWrong' + cc;
        if (obj[ewKey] && obj[ewKey] !== '') remaining++;
      }
      console.log('Post-fix verification: ' + remaining + ' DL-008 remaining (' + verifyArr.length + ' objects)');
      
      if (remaining === 0) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Written: ' + file);
      } else {
        console.log('WARNING: Not writing - ' + remaining + ' DL-008 items still remain');
      }
    } catch(e) {
      console.log('ERROR: Verify re-parse failed: ' + e.message);
    }
  }
}
