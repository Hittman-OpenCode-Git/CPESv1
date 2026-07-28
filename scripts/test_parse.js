const fs = require('fs');
const path = require('path');

// Build a temp module for each pack
const packs = {
  B: { file: 'pack_b_corrected.js' },
  C: { file: 'pack_c_corrected.js' },
  D: { file: 'pack_d_corrected.js' },
  E: { file: 'pack_e_corrected.js' }
};

const results = {};

for (const [pack, info] of Object.entries(packs)) {
  const content = fs.readFileSync(info.file, 'utf8');
  // Try to find the items array by extracting just the array literal
  const match = content.match(/const\s+MCQ_BANK_\w+\s*=\s*(\[[\s\S]*\];?)/);
  if (!match) {
    console.error(`Could not extract array from ${info.file}`);
    continue;
  }
  try {
    const items = JSON.parse(match[1].replace(/;\s*$/, ''));
    info.items = items;
  } catch(e) {
    // Try eval approach
    try {
      const items = eval(content + '; MCQ_BANK_' + pack + ';');
      info.items = items;
    } catch(e2) {
      console.error(`Failed to parse ${info.file}: ${e2.message.substring(0,200)}`);
      continue;
    }
  }
}

console.log(`Pack B: ${packs.B.items?.length || 0} items`);
console.log(`Pack C: ${packs.C.items?.length || 0} items`);
console.log(`Pack D: ${packs.D.items?.length || 0} items`);
console.log(`Pack E: ${packs.E.items?.length || 0} items`);
