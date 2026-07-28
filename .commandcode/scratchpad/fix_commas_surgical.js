// Surgical comma fix for pack_c
// Strategy: extract exact array portion, find all lines needing commas, repair once
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', '..', 'pack_c_corrected.js');
const raw = fs.readFileSync(file, 'utf8');

// Extract array portion: from first '[' to last ']'
const openBracket = raw.indexOf('[');
const lastClose = raw.lastIndexOf(']');
const prefix = raw.substring(0, openBracket + 1);
const suffix = raw.substring(lastClose);
const arrayBody = raw.substring(openBracket + 1, lastClose);

// Find all lines that need commas using a state machine
const lines = arrayBody.split('\n');
const resultLines = [];
let inString = false;
let escapeNext = false;
let prevLineIdx = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  resultLines.push(line);
  
  // If this trimmed line starts with a JSON key (") and isn't inside a string
  // and the previous non-empty trimmed line didn't end with , { [ (
  // then we need a comma on the previous line
  if (trimmed.length > 0 && trimmed.startsWith('"')) {
    // Find previous non-empty line
    for (let j = resultLines.length - 2; j >= 0; j--) {
      const prev = resultLines[j].trimEnd();
      if (prev.trim().length > 0) {
        const lastChar = prev[prev.length - 1];
        // If last char is not comma, brace, bracket, or paren (structural chars)
        if (lastChar !== ',' && lastChar !== '{' && lastChar !== '[' && lastChar !== '(') {
          // Need comma
          resultLines[j] = prev + ',';
        }
        break;
      }
    }
  }
}

// Reassemble
const fixed = prefix + '\n' + resultLines.join('\n') + '\n' + suffix;
const tmpFile = path.resolve(__dirname, '_tmp_fixed.js');
fs.writeFileSync(tmpFile, fixed);

try {
  require(tmpFile);
  console.log('PACK_C PARSE SUCCESSFUL!');
  // Write fixed version
  fs.copyFileSync(file, file + '.bak-20260727130223-commas');
  fs.writeFileSync(file, fixed);
  console.log('Written fixed pack_c with all comma gaps repaired');
  fs.unlinkSync(tmpFile);
} catch (e) {
  console.log('STILL FAILS:', e.message.substring(0, 150));
  const m = (e.stack || '').match(/_tmp_fixed\.js:(\d+)/);
  if (m) {
    const lines2 = fixed.split('\n');
    const ln = parseInt(m[1]);
    console.log('Line', ln, ':', lines2[ln-1]?.trim()?.substring(0, 120));
    console.log('Prev:', lines2[ln-2]?.trim()?.substring(0, 120));
  }
  fs.unlinkSync(tmpFile);
  process.exit(1);
}
