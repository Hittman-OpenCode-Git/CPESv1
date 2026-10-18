const fs = require('fs');
const path = require('path');

// Case files to process with their variable names
const caseFiles = [
  { path: 'content/cases/case_pack_1_corrected.js', varName: 'CASE_PACK_1' },
  { path: 'content/cases/case_pack_2_corrected.js', varName: 'CASE_PACK_2' },
  { path: 'content/cases/case_pack_3_corrected.js', varName: 'CASE_PACK_3' },
  { path: 'p2/case_pack_p2_1.js', varName: 'casePackP2_1' },
  { path: 'p2/case_pack_p2_2.js', varName: 'casePackP2_2' },
  { path: 'p2/case_pack_p2_3.js', varName: 'casePackP2_3' },
  { path: 'p2/case_pack_p2_authored.js', varName: 'casePackP2Authored' },
  { path: 'p2/case_pack_p2_C4_C8.js', varName: 'casePackP2_C4_C8' }
];

// Items to quarantine (caseId -> [itemIds])
const quarantineItems = {
  "CBQ-C2": ["CBQ-C2-Q3"],
  "CBQ-C3": ["CBQ-C3-Q3"],
  "CBQ-D2": ["CBQ-D2-Q3"],
  "CBQ-E1": ["CBQ-E1-Q1"],
  "CBQ-E2": ["CBQ-E2-Q6"],
  "CBQ2-F1": ["CBQ2-F1-Q1", "CBQ2-F1-Q5"],
  "CBQ2-A3": ["CBQ2-A3-Q4"],
  "CBQ3-A1": ["CBQ3-A1-Q2"],
  "CBQ4-A1": ["CBQ4-A1-Q5"],
  "CBQ2-B2": ["CBQ2-B2-Q4"],
  "CBQ3-B2": ["CBQ3-B2-Q4"],
  "CBQ2-C3": ["CBQ2-C3-Q5"],
  "CBQ3-C3": ["CBQ3-C3-Q1", "CBQ3-C3-Q5"],
  "CBQ4-C1": ["CBQ4-C1-Q5"],
  "CBQ4-E1": ["CBQ4-E1-Q3", "CBQ4-E1-Q5"],
  "CBQ4-F1": ["CBQ4-F1-Q4"],
  "CBQ5-A2": ["CBQ5-A2-Q4"],
  "CBQ5-B2": ["CBQ5-B2-Q5"],
  "CBQ4-B1": ["CBQ4-B1-Q4"],
  "CBQ4-B2": ["CBQ4-B2-Q5"],
  "CBQ4-D3": ["CBQ4-D3-Q1", "CBQ4-D3-Q2", "CBQ4-D3-Q5"],
  "CBQ4-E2": ["CBQ4-E2-Q5"],
  "CBQ4-E3": ["CBQ4-E3-Q5"],
  "CBQ5-E1": ["CBQ5-E1-Q2"],
  "CBQ5-E2": ["CBQ5-E2-Q5"],
  "CBQ5-E3": ["CBQ5-E3-Q1", "CBQ5-E3-Q2", "CBQ5-E3-Q4", "CBQ5-E3-Q5"],
  "CBQ4-F2": ["CBQ4-F2-Q4"],
  "CBQ5-F2": ["CBQ5-F2-Q5"],
  "CBQ3-A3": ["CBQ3-A3-Q1", "CBQ3-A3-Q4"],
  "CBQ3-A4": ["CBQ3-A4-Q3"],
  "CBQ3-C4": ["CBQ3-C4-Q4"],
  "CBQ21-B1": ["CBQ21-B1-Q3"],
  "CBQ21-C1": ["CBQ21-C1-Q3"],
  "CBQ21-E1": ["CBQ21-E1-Q3"],
  "CBQ21-A1": ["CBQ21-A1-Q6"],
  "CBQ21-D1": ["CBQ21-D1-Q4", "CBQ21-D1-Q6"],
  "CBQ21-B2": ["CBQ21-B2-Q5"],
  "CBQ21-E2": ["CBQ21-E2-Q6"],
  "CBQ21-A3": ["CBQ21-A3-Q4"],
  "CBQ21-C3": ["CBQ21-C3-Q4"],
  "CBQ21-D2": ["CBQ21-D2-Q3"],
  "CBQ21-F2": ["CBQ21-F2-Q5"],
  "CBQ21-E3": ["CBQ21-E3-Q4", "CBQ21-E3-Q5"],
  "CBQ21-A4": ["CBQ21-A4-Q2", "CBQ21-A4-Q5"],
  "CBQ21-B4": ["CBQ21-B4-Q2", "CBQ21-B4-Q3", "CBQ21-B4-Q5"],
  "CBQ21-C4": ["CBQ21-C4-Q5", "CBQ21-C4-Q6"],
  "CBQ21-F3": ["CBQ21-F3-Q3"],
  "CBQ21-A6": ["CBQ21-A6-Q3", "CBQ21-A6-Q4"],
  "CBQ21-F4": ["CBQ21-F4-Q1", "CBQ21-F4-Q3", "CBQ21-F4-Q4"],
  "CBQ21-B5": ["CBQ21-B5-Q3", "CBQ21-B5-Q4"],
  "CBQ21-D3": ["CBQ21-D3-Q3", "CBQ21-D3-Q4"],
  "CBQ21-D4": ["CBQ21-D4-Q3"],
  "CBQ21-F5": ["CBQ21-F5-Q1", "CBQ21-F5-Q2"],
  "CBQ22-F1": ["CBQ22-F1-Q1"],
  "CBQ22-A2": ["CBQ22-A2-Q5", "CBQ22-A2-Q6"],
  "CBQ22-D2": ["CBQ22-D2-Q4", "CBQ22-D2-Q5", "CBQ22-D2-Q6"],
  "CBQ22-C1": ["CBQ22-C1-Q3"],
  "CBQ22-E1": ["CBQ22-E1-Q4"],
  "CBQ22-B2": ["CBQ22-B2-Q4"],
  "CBQ22-C2": ["CBQ22-C2-Q3", "CBQ22-C2-Q4"],
  "CBQ22-D3": ["CBQ22-D3-Q3", "CBQ22-D3-Q4"],
  "CBQ22-A3": ["CBQ22-A3-Q2", "CBQ22-A3-Q4", "CBQ22-A3-Q5"],
  "CBQ22-F3": ["CBQ22-F3-Q3"],
  "CBQ22-B3": ["CBQ22-B3-Q2", "CBQ22-B3-Q4", "CBQ22-B3-Q5"],
  "CBQ22-D4": ["CBQ22-D4-Q3", "CBQ22-D4-Q4"],
  "CBQ22-B5": ["CBQ22-B5-Q3", "CBQ22-B5-Q4"],
  "CBQ22-D5": ["CBQ22-D5-Q4"],
  "CBQ22-A4": ["CBQ22-A4-Q4"],
  "CBQ22-C3": ["CBQ22-C3-Q3"],
  "CBQ22-F4": ["CBQ22-F4-Q2", "CBQ22-F4-Q4"],
  "CBQ22-C4": ["CBQ22-C4-Q4"],
  "CBQ22-C6": ["CBQ22-C6-Q4"],
  "CBQ22-C7": ["CBQ22-C7-Q3", "CBQ22-C7-Q4", "CBQ22-C7-Q6"],
  "CBQ22-C8": ["CBQ22-C8-Q4"],
  "CBQ22-A5": ["CBQ22-A5-Q3"],
  "CBQ22-F5": ["CBQ22-F5-Q1", "CBQ22-F5-Q2"],
  "CBQ22-F6": ["CBQ22-F6-Q6"],
  "CBQ22-C9": ["CBQ22-C9-Q4"],
  "CBQ22-C10": ["CBQ22-C10-Q4"],
  "CBQ22-C11": ["CBQ22-C11-Q4"],
  "CBQ22-C12": ["CBQ22-C12-Q3", "CBQ22-C12-Q4", "CBQ22-C12-Q6"],
  "CBQ23-C1": ["CBQ23-C1-Q4", "CBQ23-C1-Q6"],
  "CBQ23-E1": ["CBQ23-E1-Q5"],
  "CBQ23-C2": ["CBQ23-C2-Q6"],
  "CBQ23-F2": ["CBQ23-F2-Q2", "CBQ23-F2-Q3", "CBQ23-F2-Q4", "CBQ23-F2-Q6"],
  "CBQ23-A1": ["CBQ23-A1-Q3", "CBQ23-A1-Q4"],
  "CBQ23-E2": ["CBQ23-E2-Q3", "CBQ23-E2-Q4"],
  "CBQ23-C3": ["CBQ23-C3-Q2", "CBQ23-C3-Q3", "CBQ23-C3-Q5"],
  "CBQ23-D2": ["CBQ23-D2-Q2"],
  "CBQ23-E3": ["CBQ23-E3-Q4", "CBQ23-E3-Q5"],
  "CBQ23-A3": ["CBQ23-A3-Q3"],
  "CBQ23-F4": ["CBQ23-F4-Q3"],
  "CBQ23-A4": ["CBQ23-A4-Q3", "CBQ23-A4-Q4"],
  "CBQ23-C5": ["CBQ23-C5-Q3"],
  "CBQ23-D3": ["CBQ23-D3-Q3", "CBQ23-D3-Q4"],
  "CBQ23-E4": ["CBQ23-E4-Q3"],
  "CBQ23-F5": ["CBQ23-F5-Q1", "CBQ23-F5-Q3", "CBQ23-F5-Q4"],
  "CBQ23-A6": ["CBQ23-A6-Q4"],
  "CBQ23-A7": ["CBQ23-A7-Q4"],
  "CBQ23-B3": ["CBQ23-B3-Q4"],
  "CBQ23-B4": ["CBQ23-B4-Q6"],
  "CBQ23-B5": ["CBQ23-B5-Q5"],
  "CBQ23-B6": ["CBQ23-B6-Q2"],
  "CBQ23-C6": ["CBQ23-C6-Q5"],
  "CBQ23-C9": ["CBQ23-C9-Q4", "CBQ23-C9-Q6"],
  "CBQ22-A8": ["CBQ22-A8-Q3"],
  "CBQ22-F9": ["CBQ22-F9-Q1", "CBQ22-F9-Q2"],
  "CBQ22-F10": ["CBQ22-F10-Q6"],
  "CBQ22-C9": ["CBQ22-C9-Q4"],
  "CBQ22-C10": ["CBQ22-C10-Q4"],
  "CBQ22-C11": ["CBQ22-C11-Q4"],
  "CBQ22-C12": ["CBQ22-C12-Q3", "CBQ22-C12-Q4", "CBQ22-C12-Q6"]
};

let totalQuarantined = 0;

for (const fileInfo of caseFiles) {
  const filePath = fileInfo.path;
  const varName = fileInfo.varName;
  
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const backupPath = filePath + '.bak-quarantine-inversions-' + Date.now();
  fs.writeFileSync(backupPath, content);
  console.log('Backup created:', backupPath);
  console.log('Processing', filePath, 'with variable', varName);
  
  let cases;
  try {
    cases = new Function(content + '\nreturn ' + varName + ';')();
  } catch (e) {
    console.log('Failed to parse', filePath, ':', e.message);
    continue;
  }
  
  let fileQuarantined = 0;
  
  for (const c of cases) {
    const caseId = c.CaseID;
    if (quarantineItems[caseId]) {
      const itemsToQuarantine = quarantineItems[caseId];
      for (const item of c.Items) {
        const itemId = item.ItemID || item.QuestionID;
        if (itemsToQuarantine.includes(itemId)) {
          if ((item.question_state || '').trim() === 'Certified') {
            item.question_state = 'In Audit';
            fileQuarantined++;
            totalQuarantined++;
            console.log('  Quarantined ' + caseId + ' ' + itemId + ' -> In Audit');
          }
        }
      }
      // Also check case-level question_state
      if ((c.question_state || '').trim() === 'Certified') {
        // Only downgrade case if ALL items are now non-Certified
        const certifiedItems = c.Items.filter(it => (it.question_state || c.question_state || '').trim() === 'Certified').length;
        if (certifiedItems === 0) {
          c.question_state = 'In Audit';
        }
      }
    }
  }
  
  if (fileQuarantined > 0) {
    const newContent = 'const ' + varName + ' = ' + JSON.stringify(cases, null, 2) + ';\n';
    fs.writeFileSync(filePath, newContent);
    console.log('Quarantined', fileQuarantined, 'items in', filePath);
  } else {
    console.log('No items quarantined in', filePath);
  }
}

console.log('\nTotal items quarantined:', totalQuarantined);