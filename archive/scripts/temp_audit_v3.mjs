import { readFileSync } from 'fs';

const files = ['scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js'];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const pattern = 'question_state: "Certified"';
  
  let itemCount = 0;
  let caseCount = 0;
  let idx = 0;
  
  while ((idx = content.indexOf(pattern, idx)) >= 0) {
    // Look at 2000 chars before the match - item-level always has ItemID within this range
    const before = content.substring(Math.max(0, idx - 2000), idx);
    // Case-level: between Items array close and case object close — NO ItemID in recent context
    // Item-level: within an Items array object — ItemID appears in the same object
    
    // Check if there's an ItemID: within ~800 chars (approximate max within one item object)
    const recent800 = content.substring(Math.max(0, idx - 800), idx);
    if (recent800.includes('ItemID:')) {
      itemCount++;
    } else {
      caseCount++;
    }
    idx += pattern.length;
  }
  
  console.log(`${file}: Total=${itemCount + caseCount}, Item=${itemCount}, Case=${caseCount}`);
}
