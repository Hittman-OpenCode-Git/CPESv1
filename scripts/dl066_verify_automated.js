const fs = require('fs');
const path = require('path');

// Load the automated hand-solve results
const autoPath = path.join(__dirname, 'output', 'dl066_complete_hand_solve.json');
const autoData = JSON.parse(fs.readFileSync(autoPath, 'utf8'));

// Load case packs
const packFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js'
];

function loadCasePack(packPath) {
  const content = fs.readFileSync(packPath, 'utf8');
  let code = content.replace(/^const CASE_PACK_\d+ = /, '').trim();
  if (code.endsWith(';')) code = code.slice(0, -1);
  return eval(code);
}

const allCases = [];
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (!fs.existsSync(fullPath)) continue;
  const cases = loadCasePack(fullPath);
  for (const c of cases) allCases.push(c);
}

const caseLookup = new Map();
for (const c of allCases) caseLookup.set(c.CaseID, c);

let total = 0;
let matched = 0;
let mismatched = 0;

console.log('=== VERIFYING AUTOMATED HAND-SOLVE (dl066_complete_hand_solve.json) ===\n');

for (const autoCase of autoData) {
  const caseId = autoCase.caseId;
  const casePack = caseLookup.get(caseId);
  
  if (!casePack) {
    console.log(`Case ${caseId} not found in packs`);
    continue;
  }
  
  for (const autoItem of autoCase.items) {
    total++;
    const packItem = (casePack.Items || []).find(i => i.ItemID === autoItem.itemId);
    
    if (!packItem) {
      console.log(`${autoItem.itemId}: NOT FOUND in pack`);
      mismatched++;
      continue;
    }
    
    const hiddenCorrect = packItem.Correct;
    const derived = autoItem.derived;
    
    const derivedStr = Array.isArray(derived) ? derived.sort().join(',') : String(derived);
    const correctStr = Array.isArray(hiddenCorrect) ? hiddenCorrect.sort().join(',') : String(hiddenCorrect);
    
    const match = derivedStr === correctStr || 
                  (typeof derived === 'number' && typeof hiddenCorrect === 'number' && 
                   Math.abs(derived - hiddenCorrect) < 1);
    
    if (match) {
      matched++;
    } else {
      mismatched++;
      console.log(`❌ ${autoItem.itemId} [${autoItem.type}] Hidden: ${JSON.stringify(hiddenCorrect)} Derived: ${JSON.stringify(derived)}`);
    }
  }
}

console.log(`\n=== AUTOMATED HAND-SOLVE VERIFICATION ===`);
console.log(`Total: ${total}`);
console.log(`Matched: ${matched}`);
console.log(`Mismatched: ${mismatched}`);
console.log(`Match rate: ${((matched/total)*100).toFixed(1)}%`);