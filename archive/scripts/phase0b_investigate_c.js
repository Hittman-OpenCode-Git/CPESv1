// Investigate Pack C parse errors
const fs = require('fs');
const src = fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/pack_c_corrected.js', 'utf8');

// Show text around error positions
const errorPositions = [557536, 561812, 566073, 573840, 581773];

for (const pos of errorPositions.slice(0, 2)) {
  console.log('=== Position ' + pos + ' ===');
  const lines = src.substring(pos - 300, pos + 500).split(/\r?\n/);
  lines.forEach((line, i) => {
    console.log(String(i+1).padStart(3) + ': ' + (line.length > 200 ? line.substring(0, 200) + '...' : line));
  });
  console.log('');
}

// Count backticks
let backtickCount = 0;
let templateLiteralCount = 0;
for (let i = 0; i < src.length; i++) {
  if (src.charCodeAt(i) === 96) backtickCount++; // 96 is backtick
}
console.log('Backtick count: ' + backtickCount);

// Check for the missing-comma pattern near line 7957
const lines = src.split(/\r?\n/);
if (lines.length >= 7957) {
  console.log('\n=== Around line 7957 ===');
  for (let i = 7954; i <= Math.min(7962, lines.length - 1); i++) {
    console.log(i + ': ' + (lines[i-1] ? lines[i-1].substring(0, 250) : ''));
  }
}

// Find which objects are at the error positions
// The error objects are in Section B based on context
console.log('\n=== Finding Section B objects near error positions ===');
// Search for P1-BC in the area around each error
for (const pos of errorPositions.slice(0, 2)) {
  const ctx = src.substring(pos, pos + 10000);
  const qidMatches = [...ctx.matchAll(/"QuestionID"\s*:\s*"([^"]+)"/g)];
  console.log('At pos ' + pos + ': found QIDs: ' + qidMatches.map(m => m[1]).join(', '));
}
