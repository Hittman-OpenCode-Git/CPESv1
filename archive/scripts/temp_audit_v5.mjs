import { readFileSync } from 'fs';

function countQuestionStates(filename) {
  let content = readFileSync(filename, 'utf8');
  let total = 0, item = 0, caseLev = 0;
  
  // Find all occurrences
  let idx = 0;
  const pattern = 'question_state: "Certified"';
  const cases = [];
  
  while ((idx = content.indexOf(pattern, idx)) >= 0) {
    // Extract 15 lines of context before the match
    const lineStart = content.lastIndexOf('\n', idx - 1);
    const searchStart = Math.max(0, lineStart - 800); // go back ~800 chars
    const context = content.substring(searchStart, idx);
    const lines = context.split('\n');
    const lastFew = lines.slice(Math.max(0, lines.length - 10));
    
    // Case-level: last line before match has indentation at case-property level (12 spaces)
    // Item-level: last line before match has indentation at item-property level (20 spaces)
    // Also: case-level has "]," (Items array close) within ~2 lines above
    const last2Lines = lines.slice(Math.max(0, lines.length - 3)).join('\n');
    
    if (last2Lines.includes('          ],') || last2Lines.includes('           ],')) {
      caseLev++;
    } else {
      item++;
    }
    
    total++;
    idx += pattern.length;
  }
  
  console.log(`${filename}: Total=${total}, Item-level=${item}, Case-level=${caseLev}`);
  return { total, item, caseLev };
}

countQuestionStates('scored_cases2.js');
countQuestionStates('scored_cases3.js');
countQuestionStates('scored_cases4.js');
countQuestionStates('scored_cases5.js');
