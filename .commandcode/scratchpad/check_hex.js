const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
const lines = src.split('\n');
const line = lines[23603];
// Find position of "blockchain" and show surrounding chars with hex
const idx = line.indexOf('blockchain');
if (idx >= 0) {
    const region = line.slice(idx + 10, idx + 30);
    console.log('After "blockchain": [' + region + ']');
    for (let i = 0; i < region.length; i++) {
        console.log('  [' + i + '] char=' + JSON.stringify(region[i]) + ' code=U+' + region.charCodeAt(i).toString(16).toUpperCase().padStart(4,'0'));
    }
}
