const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/scored_cases5.js', 'utf8');

// After case 2 (CBQ5-A2), find where the next CaseID appears
const re = content.match(/const\s+ENHANCED_CASE_BASE5\s*=\s*\[/);
const start = re.index + re[0].length;

// Find all top-level CaseID occurrences (between the main array brackets)
let braceDepth = 0;
let bracketDepth = 1;
let inString = false;
let allCaseIDs = [];
let depthLog = [];

for (let i = start; i < content.length; i++) {
  const ch = content[i];
  if (!inString && ch === '"') { inString = true; continue; }
  if (inString && ch === '\\') { i++; continue; }
  if (inString && ch === '"') { inString = false; continue; }
  if (inString) continue;
  
  if (ch === '{') braceDepth++;
  else if (ch === '}') {
    braceDepth--;
    if (braceDepth === 0 && bracketDepth === 1) {
      // This should be end of a case
      const snippetStart = Math.max(0, i - 30);
      console.log('Case closing } at pos ' + i + ', depth: brace=' + braceDepth + ' bracket=' + bracketDepth);
      console.log('  Snippet: ' + JSON.stringify(content.substring(snippetStart, i + 1).slice(-80)));
    }
  }
  else if (ch === '[') bracketDepth++;
  else if (ch === ']') {
    bracketDepth--;
    if (bracketDepth === 0) break;
  }
}

// Also just find all "CaseID" strings
const cidRe = /"CaseID":\s*"([^"]+)"/g;
let m;
while ((m = cidRe.exec(content)) !== null) {
  allCaseIDs.push({id: m[1], pos: m.index});
}
console.log('\nAll CaseIDs:');
for (const c of allCaseIDs) console.log('  ' + c.id + ' at ' + c.pos);
