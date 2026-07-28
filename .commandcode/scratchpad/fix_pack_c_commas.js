// Find all syntax errors in pack_c by iterative require
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packFile = path.resolve(__dirname, '..', '..', 'pack_c_corrected.js');
let raw = fs.readFileSync(packFile, 'utf8');
let fixed = 0;

// Iterative fix: find error, fix it, repeat
for (let iteration = 0; iteration < 20; iteration++) {
  const tmpFile = path.resolve(__dirname, '_pack_c_tmp.js');
  fs.writeFileSync(tmpFile, raw);
  
  try {
    require(tmpFile);
    console.log(`PARSE OK after ${fixed} fixes`);
    // Restore to main file
    if (fixed > 0) {
      fs.writeFileSync(packFile, raw);
      console.log(`Applied ${fixed} comma fixes to pack_c_corrected.js`);
    }
    fs.unlinkSync(tmpFile);
    process.exit(0);
  } catch (e) {
    const lineMatch = (e.stack || '').match(/pack_c.*?:(\d+)/);
    if (!lineMatch) {
      console.log('Cannot determine error line:', e.message.substring(0, 200));
      fs.unlinkSync(tmpFile);
      process.exit(1);
    }
    const lineNum = parseInt(lineMatch[1]);
    const lines = raw.split('\n');
    
    // Check if the error is at a line where previous line needs a comma
    const prevLine = (lines[lineNum - 2] || '').trimEnd();
    const errLine = (lines[lineNum - 1] || '').trim();
    
    // Missing comma: previous line ends with " or } without ,
    if (prevLine.length > 0 && !prevLine.endsWith(',') && !prevLine.endsWith('{') && !prevLine.endsWith('[') && !prevLine.endsWith('(')) {
      const needsComma = 
        (prevLine.endsWith('"') || prevLine.endsWith(']') || prevLine.endsWith('}') || 
         prevLine.match(/\d$/) || prevLine.match(/[a-z]\)$/i) || prevLine.endsWith('false') || prevLine.endsWith('true'));
      
      if (needsComma && errLine.match(/^\s*"/)) {
        // Add comma to previous line
        lines[lineNum - 2] = prevLine + ',';
        raw = lines.join('\n');
        fixed++;
        console.log(`Fixed missing comma at line ${lineNum - 1} (prev line ${lineNum})`);
        continue;
      }
    }
    
    console.log(`Unfixable error at line ${lineNum}:`, e.message.substring(0, 100));
    console.log('Prev:', prevLine.substring(0, 100));
    console.log('This:', errLine.substring(0, 100));
    fs.unlinkSync(tmpFile);
    process.exit(1);
  }
}

console.log('ERROR: Could not fix all parse errors after 20 iterations');
process.exit(1);
