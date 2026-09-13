const fs = require('fs');
// Step 1: strip WITHDRAWN CC-104 object from tier3_wave1-conflicting wave2a (keep 101-103)
let a = fs.readFileSync('scripts/tier3_wave2a.js', 'utf8');
const wStart = a.indexOf('  {\n    "Part": 1,\n    "Section": "C",\n    "SectionName": "Performance Management",\n    "Topic": "C.104');
if (wStart === -1) throw new Error('104 block not found in wave2a');
// find matching close of that object: it is the last object before "];"
const wEndMarker = 'certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, WITHDRAWN';
const wEndIdx = a.indexOf(wEndMarker);
if (wEndIdx === -1) throw new Error('withdrawn marker not found');
const objEnd = a.indexOf('}', a.indexOf('\n  }\n];') !== -1 ? 0 : 0); // placeholder, use structural approach below
// structural: remove from the ',\\n  {' preceding the 104 object through its closing '\\n  }'
const sepIdx = a.lastIndexOf(',\n  {', wStart);
const closeIdx = a.indexOf('\n  }\n];', wStart);
if (sepIdx === -1 || closeIdx === -1) throw new Error('bounds not found');
a = a.substring(0, sepIdx) + '\n];' + a.substring(closeIdx + '\n  }\n];'.length).replace(/^module.*$/m, '');
a = a.replace(/\n\);?[\s\S]*$/, '\n];\nmodule.exports = WAVE2A;');
fs.writeFileSync('scripts/tier3_wave2a.js', a, 'utf8');
console.log('wave2a trimmed; verify manually');
console.log(a.substring(a.length - 400));