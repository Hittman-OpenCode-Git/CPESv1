import { readFileSync } from 'fs';

// Count per-CaseID: items total vs items certified
function perCaseAnalysis(filename) {
  const content = readFileSync(filename, 'utf8');
  
  // Find all case blocks by splitting on CaseID
  const cases = [];
  let idx = 0;
  const casePattern = /CaseID: "([^"]+)"/g;
  let match;
  
  while ((match = casePattern.exec(content)) !== null) {
    const caseID = match[1];
    if (!caseID.startsWith('CBQ')) continue;
    cases.push({ id: caseID, start: match.index });
  }
  
  for (const c of cases) {
    const nextStart = cases.find(x => x.start > c.start)?.start ?? content.length;
    const block = content.substring(c.start, nextStart);
    
    const itemIDs = [...block.matchAll(/ItemID: "[^"]+"/g)];
    const itemCerts = [...block.matchAll(/question_state: "Certified"/g)];
    
    // Case-level is last question_state in block, preceded by "],"
    // Count item-level only (preceded by something other than "],")
    const lines = block.split('\n');
    let itemCertCount = 0;
    for (let i = 0; i < lines.length; i++) {
      if (/question_state: "Certified"/.test(lines[i])) {
        const prevLine = (lines[i - 1] || '').replace(/\r$/, '').trimEnd();
        if (!prevLine.endsWith('],')) {
          itemCertCount++;
        }
      }
    }
    
    const totalItems = itemIDs.length;
    const isFullyCertified = totalItems > 0 && itemCertCount === totalItems;
    const isPartial = itemCertCount > 0 && itemCertCount < totalItems;
    
    if (isPartial) {
      console.log(`  ALERT: ${c.id} PARTIAL! ${itemCertCount}/${totalItems} items certified`);
    }
  }
}

console.log('=== Partial Certification Check ===');
for (const f of ['scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js']) {
  console.log(`\n${f}:`);
  perCaseAnalysis(f);
}
console.log('\n=== DONE ===');
