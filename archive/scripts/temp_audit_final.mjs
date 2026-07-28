import { readFileSync } from 'fs';

const files = ['scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js'];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const pattern = 'question_state: "Certified"';
  
  let itemCount = 0;
  let caseCount = 0;
  let idx = 0;
  
  while ((idx = content.indexOf(pattern, idx)) >= 0) {
    // Look at 100 chars before the match
    const before = content.substring(Math.max(0, idx - 100), idx);
    if (before.includes(']')) {
      caseCount++;
    } else {
      itemCount++;
    }
    idx += pattern.length;
  }
  
  // Cross-check: count all lines matching the pattern
  const totalLines = content.split('\n').filter(l => l.includes(pattern)).length;
  
  console.log(`${file}: Total=${itemCount + caseCount}, Item=${itemCount}, Case=${caseCount}, LineCheck=${totalLines}`);
}
