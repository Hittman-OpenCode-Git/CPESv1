const fs = require('fs');
const content = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');

const declRegex = /(?:const|let|var)\s+([A-Za-z_\$][\w\$]*)\s*=\s*(?:\/\/[^\n]*\n\s*)*\[/g;
let match;
const banks = [];
while ((match = declRegex.exec(content)) !== null) {
  banks.push({ name: match[1], index: match.index });
}
console.log('Bank declarations found:', banks.length);
banks.forEach(b => console.log('  ', b.name, 'at', b.index));

const firstBank = banks[0];
if (firstBank) {
  const bankContent = content.substring(firstBank.index);
  const arrayStart = bankContent.indexOf('[');
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escape = false;
  let objCount = 0;
  let objStarts = [];
  
  for (let i = arrayStart; i < bankContent.length; i++) {
    const ch = bankContent[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (inString) {
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === '{') {
      if (depth === 0) objStarts.push(i);
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && objStarts.length > 0) {
        objCount++;
        objStarts.pop();
      }
    } else if (ch === ']' && depth === 0) {
      break;
    }
  }
  console.log('Top-level objects in first bank:', objCount);
}

// Test malformed content parsing
console.log('\n=== MALFORMED CONTENT TESTS ===');

const malformedTests = [
  { name: 'Trailing comma', content: 'const TEST = [{"a":1},];' },
  { name: 'Missing comma', content: 'const TEST = [{"a":1}{"b":2}];' },
  { name: 'Unclosed brace', content: 'const TEST = [{"a":1};' },
  { name: 'Unclosed bracket', content: 'const TEST = [{"a":1}]' },
  { name: 'Single quotes', content: "const TEST = [{'a':1}];" },
  { name: 'Bare keys', content: 'const TEST = [{a:1}];' },
  { name: 'Comments in array', content: 'const TEST = [// comment\n{"a":1}];' },
];

malformedTests.forEach(test => {
  try {
    // Simulate the parser's discovery
    const declMatch = test.content.match(/(?:const|let|var)\s+([A-Za-z_\$][\w\$]*)\s*=\s*(?:\/\/[^\n]*\n\s*)*\[/);
    if (!declMatch) {
      console.log(test.name + ': No bank declaration found');
      return;
    }
    const bankContent = test.content.substring(declMatch.index);
    const arrayStart = bankContent.indexOf('[');
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let escape = false;
    let objCount = 0;
    let error = null;
    
    for (let i = arrayStart; i < bankContent.length; i++) {
      const ch = bankContent[i];
      if (escape) { escape = false; continue; }
      if (ch === '\\') { escape = true; continue; }
      if (inString) {
        if (ch === stringChar) inString = false;
        continue;
      }
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
      if (ch === '{') {
        if (depth === 0) objCount++;
        depth++;
      } else if (ch === '}') {
        depth--;
        if (depth < 0) { error = 'MISMATCHED_CLOSER'; break; }
      } else if (ch === ']' && depth === 0) {
        break;
      }
    }
    
    if (depth !== 0) error = 'TRUNCATED_ARRAY';
    console.log(test.name + ':', error ? 'ERROR - ' + error : 'OK - ' + objCount + ' objects');
  } catch (e) {
    console.log(test.name + ': EXCEPTION - ' + e.message);
  }
});