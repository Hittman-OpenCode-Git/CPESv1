const fs = require('fs');
const path = require('path');

const packFile = path.resolve(__dirname, '..', '..', 'pack_c_corrected.js');
let raw = fs.readFileSync(packFile, 'utf8');
let fixed = 0;
let maxIter = 30;

while (maxIter-- > 0) {
  const tmpFile = path.resolve(__dirname, '_tmp.js');
  fs.writeFileSync(tmpFile, raw);
  try {
    require(tmpFile);
    console.log(`PASS after ${fixed} comma fix(es)`);
    if (fixed > 0) {
      const backupName = packFile.replace('.js', '.js.bak-20260727130223');
      // Backup already exists
      fs.writeFileSync(packFile, raw);
      console.log(`Applied ${fixed} total comma fix(es) to pack_c_corrected.js`);
    }
    fs.unlinkSync(tmpFile);
    process.exit(0);
  } catch (e) {
    fs.unlinkSync(tmpFile);
    const lineMatch = (e.stack || '').match(/_tmp\.js:(\d+)/);
    if (!lineMatch) { 
      console.log('Cannot find line in:', (e.stack || e.message).substring(0, 200));
      process.exit(1);
    }
    const lineNum = parseInt(lineMatch[1]);
    const lines = raw.split('\n');
    if (lineNum < 2 || lineNum > lines.length) {
      console.log(`Bad line ${lineNum}, msg:`, e.message.substring(0,100));
      process.exit(1);
    }
    // Fix: add comma to previous line if missing
    const prevIdx = lineNum - 2;
    const prevLine = lines[prevIdx];
    // Add comma at end of prev line (before any trailing whitespace)
    lines[prevIdx] = prevLine.trimEnd() + ',';
    raw = lines.join('\n');
    fixed++;
    console.log(`  Fixed comma at prev line ${prevIdx + 1} (err at line ${lineNum})`);
  }
}
console.log('ERROR: Exceeded iteration limit');
process.exit(1);
