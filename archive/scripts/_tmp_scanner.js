const fs = require('fs');
['scored_cases3.js','scored_cases4.js','scored_cases5.js'].forEach(f => {
  const content = fs.readFileSync(f,'utf8');
  const ids = [...content.matchAll(/CaseID: "([^"]+)"/g)].map(m => m[1]);
  const domains = [...content.matchAll(/BlueprintDomain: "([^"]+)"/g)].map(m => m[1]);
  const cases = ids.map((id,i) => id + ' | ' + (domains[i] || '?'));
  console.log('=== ' + f + ' (' + ids.length + ' cases) ===');
  cases.forEach(c => console.log('  ' + c));
  console.log('');
});
