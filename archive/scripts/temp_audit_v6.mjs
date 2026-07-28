import { readFileSync } from 'fs';

function countPrecise(filename) {
  const content = readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  const pattern = /question_state: "Certified"/;
  
  let itemCount = 0;
  let caseCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) {
      // Check the line above for context
      // Case-level: preceded by "           ]," (closing Items array, ~12 spaces)
      // Item-level: preceded by Section/ProductionStatus/CaseID etc (~20 spaces)
      const prevLine = lines[i - 1] || '';
      const trimmedPrev = prevLine.trimEnd();
      
      // Case-level signature: ], after Items array
      // Also check: case-level question_state has same indentation as "Items:" / case props (~12 spaces)
      // Item-level has indentation matching item props (~20 spaces)
      const lineIndent = lines[i].match(/^(\s*)/)[1].length;
      
      if (trimmedPrev === '],' && lineIndent <= 13) {
        caseCount++;
      } else {
        itemCount++;
      }
    }
  }
  
  console.log(`${filename}: Total=${itemCount + caseCount}, Item=${itemCount}, Case=${caseCount}`);
  return { item: itemCount, case: caseCount };
}

const results = {};
results['scored_cases2.js'] = countPrecise('scored_cases2.js');
results['scored_cases3.js'] = countPrecise('scored_cases3.js');
results['scored_cases4.js'] = countPrecise('scored_cases4.js');
results['scored_cases5.js'] = countPrecise('scored_cases5.js');

console.log('\n=== CROSS-REFERENCE SUMMARY ===');
console.log(`Total item-level Certified: ${Object.values(results).reduce((s, r) => s + r.item, 0)}`);
console.log(`Total case-level Certified: ${Object.values(results).reduce((s, r) => s + r.case, 0)}`);
console.log(`Grand total (all question_state): ${Object.values(results).reduce((s, r) => s + r.item + r.case, 0)}`);
