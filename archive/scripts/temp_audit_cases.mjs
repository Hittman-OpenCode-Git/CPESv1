import { readFileSync } from 'fs';

const files = ['scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js'];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  
  // Find all 'question_state: "Certified"' occurrences
  let itemCount = 0;
  let caseCount = 0;
  let idx = 0;
  const pattern = 'question_state: "Certified"';
  
  while ((idx = content.indexOf(pattern, idx)) >= 0) {
    // Look at the ~200 chars before this match
    const before = content.substring(Math.max(0, idx - 300), idx);
    
    // Case-level: preceded by "]" (end of Items array) followed by "question_state"
    // Check if there's a closing bracket pattern: "            ]," followed by "question_state:" 
    // within the last few lines
    const last100 = content.substring(Math.max(0, idx - 100), idx);
    if (last100.includes(']')) {
      caseCount++;
    } else {
      itemCount++;
    }
    
    idx += pattern.length;
  }
  
  // Also count by checking if line has ItemID 
  // Actually, let's also count items with "ItemID" separately for cross-check
  let itemIDCheck = 0;
  let caseIDCheck = 0;
  idx = 0;
  while ((idx = content.indexOf(pattern, idx)) >= 0) {
    const before = content.substring(Math.max(0, idx - 600), idx);
    if (before.includes('ItemID:')) {
      itemIDCheck++;
    }
    idx += pattern.length;
  }
  
  console.log(`${file}: Total=${itemCount + caseCount}, Item-level=${itemCount}, Case-level=${caseCount}, ItemID-verif=${itemIDCheck}`);
}
