// Session 65: Fix case governance contradictions in scored_cases2-5.js
const fs = require('fs');

const files = ['scored_cases2.js','scored_cases3.js','scored_cases4.js','scored_cases5.js'];
const prodPattern = /ProductionStatus:\s*"Production"/g;
let totalChanges = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const prodCount = (content.match(prodPattern) || []).length;
  content = content.replace(prodPattern, 'ProductionStatus: "Draft"');
  const afterCount = (content.match(prodPattern) || []).length;
  fs.writeFileSync(file, content, 'utf8');
  console.log(`${file}: ${prodCount} → ${afterCount} (${prodCount} changes)`);
  totalChanges += prodCount;
}
console.log(`Total: ${totalChanges} changes across 4 files`);
