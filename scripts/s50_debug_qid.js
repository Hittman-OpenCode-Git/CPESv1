const fs = require('fs');

// Debug: find P1-EC-003 in pack_c and show what object is actually there
const content = fs.readFileSync('pack_c_corrected.js', 'utf8');

// Find ALL occurrences of P1-EC-003 in the file
let pos = 0;
let count = 0;
const qid = 'P1-EC-003';
while ((pos = content.indexOf(qid, pos)) !== -1) {
  count++;
  // Show context
  const start = Math.max(0, pos - 50);
  const end = Math.min(content.length, pos + 80);
  console.log(`Occurrence ${count} at position ${pos}:`);
  console.log(content.substring(start, end));
  console.log('---');
  pos += 1;
}
console.log(`Total occurrences of "${qid}": ${count}`);
