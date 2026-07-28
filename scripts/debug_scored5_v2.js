const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/scored_cases5.js', 'utf8');

// Test regex match
const re = /const\s+\w+\s*=\s*\[/;
const m = content.match(re);
console.log('Regex match:', m ? 'YES at ' + m.index + ' [' + m[0] + ']' : 'NO');

// Try direct indexOf
const idx = content.indexOf('const ENHANCED_CASE_BASE5');
console.log('Direct indexOf:', idx);

// Try the getMainArrayText logic
if (m) {
  let depth = 1, inStr = false, esc = false;
  let i;
  for (i = m.index + m[0].length; i < content.length; i++) {
    const ch = content[i];
    if (!inStr && ch === '"') { inStr = true; continue; }
    if (inStr && esc) { esc = false; continue; }
    if (inStr && ch === '\\') { esc = true; continue; }
    if (inStr && ch === '"') { inStr = false; continue; }
    if (inStr) continue;
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  console.log('Main array ends at position:', i);
  console.log('Context: ' + JSON.stringify(content.substring(i-10, i+50)));
  const arrText = content.substring(m.index + m[0].length, i);
  console.log('Array text length:', arrText.length);
  console.log('Array text start: ' + JSON.stringify(arrText.substring(0, 80)));
  console.log('Array text end: ' + JSON.stringify(arrText.substring(arrText.length - 80)));
}
