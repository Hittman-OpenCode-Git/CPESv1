// Dump the BC-074 object raw text to find the parse issue
const fs = require('fs');
const src = fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/pack_c_corrected.js', 'utf8');

// Object BC-074 starts at position 557536, length 4271
// Let's look for unusual characters
const startPos = 557536;
const objStr = src.substring(startPos, startPos + 4271);

// Check for unusual characters
let unusual = [];
for (let i = 0; i < objStr.length; i++) {
  const code = objStr.charCodeAt(i);
  if (code < 32 && code !== 10 && code !== 13 && code !== 9) {
    unusual.push({pos: i, code: code, context: objStr.substring(Math.max(0,i-20), i+20)});
  }
  if (code === 0x201C || code === 0x201D || code === 0x2018 || code === 0x2019) {
    unusual.push({pos: i, code: code, char: objStr[i], context: objStr.substring(Math.max(0,i-20), i+20)});
  }
}
if (unusual.length > 0) {
  console.log('Unusual characters:');
  unusual.forEach(u => console.log(JSON.stringify(u)));
} else {
  console.log('No unusual characters found');
}

// Count quotes
let dqCount = 0;
let inDQ = false;
let escapeNext = false;
for (let i = 0; i < objStr.length; i++) {
  const ch = objStr[i];
  if (escapeNext) { escapeNext = false; continue; }
  if (ch === '\\') { escapeNext = true; continue; }
  if (ch === '"') { inDQ = !inDQ; if (!inDQ) dqCount++; }
}
console.log('Double-quote pairs: ' + dqCount + ' (should be even after key:value parsing)');

// Try to find the Stem field
const stemMatch = objStr.match(/"Stem"\s*:\s*"/);
if (stemMatch) {
  const stemStart = stemMatch.index + stemMatch[0].length;
  // Find the closing quote
  let inStr = true;
  let esc = false;
  for (let i = stemStart; i < objStr.length; i++) {
    const ch = objStr[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (ch === '"') { 
      console.log('Stem length: ' + (i - stemStart) + ' chars');
      console.log('Stem: ' + objStr.substring(stemStart, i));
      break;
    }
  }
}

// Try Function constructor on a modified version
console.log('\nTrying Function constructor approach...');
try {
  const wrapped = objStr.replace(/"([^"]+)":/g, '$1:');
  // Actually let's try a simpler test
  const fnBody = 'return [' + objStr + ']';
  new Function(fnBody)();
  console.log('SUCCESS');
} catch(e) {
  console.log('Function fails: ' + e.message);
  // Find the problematic line
  const lines = objStr.split('\n');
  // Find the approx line from error if possible
  // Try progressive narrowing
  for (let chunkSize = 100; chunkSize <= objStr.length; chunkSize *= 2) {
    const chunk = objStr.substring(0, Math.min(chunkSize, objStr.length));
    try {
      eval('({' + chunk + '})');
    } catch(e2) {
      console.log('Fails at chunk size ' + chunkSize + ': ' + e2.message);
      break;
    }
  }
}
