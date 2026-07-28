const fs = require('fs');
let code = fs.readFileSync('pack_d_corrected.js', 'utf8');

// Find all lines with just a comma and surrounding context
const lines = code.split('\n');
console.log('Total lines:', lines.length);

// Find standalone commas (lines with just whitespace and a comma)
lines.forEach((line, i) => {
  const trimmed = line.trim();
  if (trimmed === ',' || trimmed === ',') {
    console.log('Line ' + (i+1) + ': standalone comma');
    console.log('  Context before: ' + (lines[i-1] || '').substring(0, 120));
    console.log('  Context after:  ' + (lines[i+1] || '').substring(0, 120));
    console.log('');
  }
});
