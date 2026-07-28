import { readFileSync } from 'fs';

function countPrecise(filename) {
  const content = readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  const pattern = /question_state: "Certified"/;
  
  let itemCount = 0;
  let caseCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) {
      const prevLine = (lines[i - 1] || '').replace(/\r$/, '');
      const trimmedPrev = prevLine.trimEnd();
      
      // Case-level: preceded by "           ]," (end of Items array)
      if (trimmedPrev.endsWith('],')) {
        caseCount++;
      } else {
        itemCount++;
      }
    }
  }
  
  console.log(`${filename}: Total=${itemCount + caseCount}, Item=${itemCount}, Case=${caseCount}`);
  return { item: itemCount, case: caseCount };
}

const r = {};
r['scored_cases2.js'] = countPrecise('scored_cases2.js');
r['scored_cases3.js'] = countPrecise('scored_cases3.js');
r['scored_cases4.js'] = countPrecise('scored_cases4.js');
r['scored_cases5.js'] = countPrecise('scored_cases5.js');

console.log('\n=== RECONCILIATION ===');
for (const [file, v] of Object.entries(r)) {
  const s83claim = { 'scored_cases2.js': 87, 'scored_cases3.js': 88, 'scored_cases4.js': 75, 'scored_cases5.js': 84 }[file];
  const qaFound = { 'scored_cases2.js': 73, 'scored_cases3.js': 74, 'scored_cases4.js': 63, 'scored_cases5.js': 70 }[file];
  console.log(`${file}: S83=${s83claim} (Item=${v.item} + Case=${v.case}), QA-found=${qaFound}, Match=${v.item === qaFound ? 'YES' : 'NO'}`);
}
console.log(`\nTotal item-level: ${Object.values(r).reduce((s,x) => s+x.item, 0)}`);
console.log(`Total case-level: ${Object.values(r).reduce((s,x) => s+x.case, 0)}`);
console.log(`Grand total:       ${Object.values(r).reduce((s,x) => s+x.item+s+x.case, 0)}`);
