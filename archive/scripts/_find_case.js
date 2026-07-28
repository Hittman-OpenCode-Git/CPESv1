const fs = require('fs');
const content = fs.readFileSync('scored_cases3.js', 'utf8');
const idx = content.indexOf('CaseID: "CBQ3-C2"');
console.log('Position:', idx);
if (idx >= 0) {
  const beforeBrace = content.lastIndexOf('{', idx);
  const nextCase = content.indexOf('CaseID: "CBQ3-C3"', idx);
  console.log('Opening brace at:', beforeBrace);
  console.log('Next case at:', nextCase);
  console.log('Case text from', beforeBrace, 'to', nextCase);
  console.log('Length:', nextCase - beforeBrace);
  console.log(content.substring(beforeBrace, beforeBrace + 500));
}
