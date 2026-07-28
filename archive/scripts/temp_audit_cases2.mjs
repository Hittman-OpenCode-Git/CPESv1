import { readFileSync } from 'fs';

const files = ['scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js'];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  
  // Find all cases: split by CaseID marker (each enhanced case starts with CaseID)
  const caseIDs = [...content.matchAll(/CaseID: "([^"]+)"/g)].map(m => m[1]);
  
  // Only unique CaseIDs (first occurrence is the case-level declaration)
  const uniqueCases = [...new Set(caseIDs)].filter(id => id.startsWith('CBQ'));
  
  console.log(`\n=== ${file} ===`);
  console.log(`Unique enhanced CaseIDs: ${uniqueCases.length}`);
  
  for (const caseID of uniqueCases) {
    // Find this case's block from its CaseID declaration to the next one
    const caseStart = content.indexOf(`CaseID: "${caseID}"`);
    const nextStart = uniqueCases.filter(id => id !== caseID)
      .map(id => content.indexOf(`CaseID: "${id}"`, caseStart + 20))
      .filter(pos => pos > caseStart)
      .sort((a, b) => a - b)[0] || content.length;
    
    const caseBlock = content.substring(caseStart, nextStart);
    
    // Count item-level question_state: "Certified" in this block
    const itemCertified = [...caseBlock.matchAll(/question_state: "Certified"/g)].length;
    
    // Find case-level question_state near the end of the block
    // The case-level is after "]" and before the next CaseID
    const itemsEnd = caseBlock.lastIndexOf(']');
    const afterItems = caseBlock.substring(itemsEnd);
    const caseLevelCertified = afterItems.includes('question_state: "Certified"');
    
    // Count items
    const itemIDs = [...caseBlock.matchAll(/ItemID: "([^"]+)"/g)];
    const itemCount = itemIDs.length;
    
    const status = caseLevelCertified ? 'CASE_CERT' : 'CASE_NOT_CERT';
    const info = itemCount > 0 
      ? `items=${itemCount}, item_cert=${itemCertified}, case_cert=${caseLevelCertified}`
      : `items=${itemCount}`;
    
    // Only flag discrepancies
    if (itemCount !== itemCertified && itemCount > 0) {
      console.log(`  ${caseID}: ${status} PARTIAL! ${info}`);
    } else if (itemCount > 0) {
      console.log(`  ${caseID}: ${status} ${info}`);
    }
  }
}
