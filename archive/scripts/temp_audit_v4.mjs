import { readFileSync } from 'fs';

const files = ['scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js'];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const pattern = 'question_state: "Certified"';
  
  let itemCount = 0;
  let caseCount = 0;
  let idx = 0;
  
  while ((idx = content.indexOf(pattern, idx)) >= 0) {
    // Extract the ~200 chars before this match
    const before = content.substring(Math.max(0, idx - 200), idx);
    
    // Case-level signature: the Items array close pattern
    // "            ]," followed by whitespace then "question_state"
    // This is the ] that closes the Items array
    
    // Check if the immediate preceding context (last ~60 chars) contains the
    // pattern of closing an array followed by case properties
    const last60 = content.substring(Math.max(0, idx - 60), idx);
    
    // Case-level: preceded by "],\n            " (Items array close)
    // Item-level: preceded by field name like "Section:"
    if (last60.includes('],"') || last60.includes('],\n') || last60.includes(']        ') || last60.includes('], ')) {
      // This might be case-level. But item-level can also have ]",
      // Let's be more specific: case-level has "]," followed by newline and indentation
      // while item-level arrays like DifficultyDrivers: ["..."] don't have newlines after ]
      
      // Check for the specific pattern: end of Items array: "])]" or "]        ]" or similar
      // Actually: look at the 100 chars before. If we see "ItemID:" nearby, it's item-level
      const before100 = content.substring(Math.max(0, idx - 100), idx);
      if (before100.includes('ItemID:')) {
        itemCount++;
      } else {
        caseCount++;
      }
    } else {
      itemCount++;
    }
    
    idx += pattern.length;
  }
  
  console.log(`${file}: Total=${itemCount + caseCount}, Item=${itemCount}, Case=${caseCount}`);
}
