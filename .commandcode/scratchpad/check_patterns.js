const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
const lines = src.split('\n');

// Check line 23604 char by char around the break point
const line = lines[23603]; // 0-indexed
const idx = line.indexOf('blockchain');
if (idx > -1) {
    const snippet = line.slice(idx - 5, idx + 25);
    console.log('Around "blockchain":');
    console.log('  text: ' + snippet);
    console.log('  hex:  ' + [...snippet].map(c => c.charCodeAt(0).toString(16).padStart(4,'0')).join(' '));
}

// Check line 22255 for XXXMARKER pattern
const line2 = lines[22254]; // 0-indexed
const idx2 = line2.indexOf('XXXMARKER');
if (idx2 > -1) {
    const snippet2 = line2.slice(idx2 - 10, idx2 + 20);
    console.log('\nAround "XXXMARKER":');
    console.log('  text: ' + snippet2);
    console.log('  hex:  ' + [...snippet2].map(c => c.charCodeAt(0).toString(16).padStart(4,'0')).join(' '));
} else {
    const idx2a = line2.indexOf('service');
    if (idx2a > -1) {
        const snippet2a = line2.slice(idx2a - 5, idx2a + 20);
        console.log('\nAround "service" (no XXXMARKER found):');
        console.log('  text: ' + snippet2a);
    }
}
