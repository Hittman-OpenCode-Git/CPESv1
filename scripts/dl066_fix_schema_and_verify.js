const fs = require('fs');
const path = require('path');

// ============================================================================
// FIX SCHEMA AND VERIFY DL-066 MANUAL SOLUTIONS
// ============================================================================

// --- Load the bad-schema file ---
const badPath = path.join(__dirname, 'output', 'dl066_manual_solutions.json');
const badData = JSON.parse(fs.readFileSync(badPath, 'utf8'));

// Extract the cases array
const cases = badData.cases || [];

console.log(`Loaded ${cases.length} cases from bad-schema file`);

// --- Convert to verification format: [{ caseId, bank, items }] ---
const verifyFormat = cases.map(c => ({
  bank: c.bank,
  caseId: c.caseId,
  currentState: 'In Audit',  // or derive from actual pack
  verdict: c.items.every(i => i.derived !== null && i.derived !== undefined) ? 'certify' : 'review',
  handSolveNotes: c.items.map(i => `${i.itemId}: ${i.derived}`).join('; '),
  stampSession: 'DL-066-manual-solve',
  stampDate: '2026-10-13',
  items: c.items.map(i => ({
    itemId: i.itemId,
    type: i.type,
    derived: i.derived,
    keyHidden: true,
    derivationNotes: i.derivationNotes
  }))
}));

// --- Write fixed schema ---
const fixedPath = path.join(__dirname, 'output', 'dl066_manual_solutions_fixed.json');
fs.writeFileSync(fixedPath, JSON.stringify(verifyFormat, null, 2));
console.log(`Fixed schema written to ${fixedPath}`);

// --- Now verify against case packs ---
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

const promptLookup = new Map();
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (!fs.existsSync(fullPath)) continue;
  const cases = loadCasePack(fullPath);
  for (const c of cases) {
    for (const item of c.Items || []) {
      promptLookup.set(item.Prompt, item);
    }
  }
}

console.log(`\nLoaded ${promptLookup.size} items from case packs`);

// --- Verify each item ---
let totalVerified = 0;
let totalMismatched = 0;
let totalNotFound = 0;

for (const solCase of verifyFormat) {
  console.log(`\n=== ${solCase.caseId} ===`);
  
  for (const item of solCase.items) {
    // Find in case pack by prompt (we need the masked file for prompts)
    // For now, try to find by ItemID pattern
    let found = false;
    let packItem = null;
    
    // Try to find by matching prompt from masked file
    const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
    const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));
    const maskedCase = masked.find(mc => mc.caseId === solCase.caseId);
    const maskedItem = maskedCase?.items?.find(mi => mi.itemId === item.itemId);
    
    if (maskedItem) {
      packItem = promptLookup.get(maskedItem.Prompt);
    }
    
    // Fallback: try to find by ItemID in any pack
    if (!packItem) {
      for (const pf of packFiles) {
        const fullPath = path.join(__dirname, '..', pf);
        const cases = loadCasePack(fullPath);
        for (const c of cases) {
          const pi = c.Items?.find(i => i.ItemID === item.itemId);
          if (pi) { packItem = pi; break; }
        }
        if (packItem) break;
      }
    }
    
    if (!packItem) {
      console.log(`  ${item.itemId} [${item.type}]: NOT FOUND in case packs`);
      totalNotFound++;
      continue;
    }
    
    const hiddenCorrect = packItem.Correct;
    const derived = item.derived;
    
    // Normalize for comparison
    const derivedStr = Array.isArray(derived) ? derived.sort().join(',') : String(derived);
    const correctStr = Array.isArray(hiddenCorrect) ? hiddenCorrect.sort().join(',') : String(hiddenCorrect);
    
    const match = derivedStr === correctStr || 
                  (typeof derived === 'number' && typeof hiddenCorrect === 'number' && 
                   Math.abs(derived - hiddenCorrect) < 1);
    
    const status = match ? '✅' : '❌';
    console.log(`  ${status} ${item.itemId} [${item.type}] Hidden: ${JSON.stringify(hiddenCorrect)} Derived: ${JSON.stringify(derived)}`);
    
    if (match) totalVerified++;
    else totalMismatched++;
  }
}

console.log('\n=== VERIFICATION SUMMARY ===');
console.log(`Verified (matched): ${totalVerified}`);
console.log(`Mismatched: ${totalMismatched}`);
console.log(`Not found in packs: ${totalNotFound}`);
console.log(`Total: ${totalVerified + totalMismatched + totalNotFound}`);

// --- Write verification report ---
const report = {
  timestamp: new Date().toISOString(),
  sourceFile: 'dl066_manual_solutions.json (fixed schema)',
  summary: {
    totalCases: cases.length,
    totalItems: verifyFormat.reduce((n, c) => n + c.items.length, 0),
    verified: totalVerified,
    mismatched: totalMismatched,
    notFound: totalNotFound
  },
  details: verifyFormat.map(c => ({
    caseId: c.caseId,
    items: c.items.map(i => ({
      itemId: i.itemId,
      type: i.type,
      derived: i.derived,
      verified: false // would need per-item check
    }))
  }))
};

fs.writeFileSync(
  path.join(__dirname, 'output', 'dl066_manual_solutions_verification.json'),
  JSON.stringify(report, null, 2)
);
console.log('\nVerification report written to scripts/output/dl066_manual_solutions_verification.json');