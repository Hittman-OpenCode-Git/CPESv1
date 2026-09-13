const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const i = src.indexOf('no center');
console.log(JSON.stringify(src.slice(i, i + 60)));
const j = src.indexOf('Always accept');
console.log(JSON.stringify(src.slice(j, j + 60)));