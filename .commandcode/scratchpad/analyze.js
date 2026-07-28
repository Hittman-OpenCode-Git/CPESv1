const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
const lines = src.split('\n');
for (let i = 23595; i < 23610; i++) {
    const l = lines[i];
    const qc = (l.match(/"/g) || []).length;
    console.log((i + 1) + ' [Q=' + qc + '] ' + l.slice(0, 200));
}
