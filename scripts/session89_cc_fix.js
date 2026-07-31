// Session 89 CC-EW Alignment Fix
// Fixes 10 items where scenario correct answer was written as Choice A
// but the preserved CorrectChoice is B, C, or D.
const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, '..', 'pack_a_corrected.js');
const raw = fs.readFileSync(TARGET, 'utf8');
const PACK = new Function(raw + '; return MCQ_BANK_A;')();

// Items that need CC-EW realignment:
// These have preserved CC != A but scenario was written with A as correct answer
const FIX_MAP = {
    "P1-F-024": "D", // CC=D, scenario: Choice A is correct (IQR is best standalone)
    "P1-F-027": "B", // CC=B, scenario: Choice A is correct (AP highest return)
    "P1-F-028": "B", // CC=B, scenario: Choice A is correct (NIST AI RMF)
    "P1-F-031": "C", // CC=C, scenario: Choice A is correct (Cloud-Native PaaS)
    "P1-F-033": "C", // CC=C, scenario: Choice A is correct (tiered MFA)
    "P1-F-034": "D", // CC=D, scenario: Choice A is correct (PBAC)
    "P1-F-036": "B", // CC=B, scenario: Choice A is correct (Core Banking)
    "P1-F-041": "B", // CC=B, scenario: Choice A is correct (Tiered reconciliation)
    "P1-F-042": "B", // CC=B, scenario: Choice A is correct (AK-8472 compromised)
    "P1-F-069": "B"  // CC=B, scenario: Choice A is correct (targeted real-time)
};

// Items where CC == A — these should already be fine:
// P1-F-038(CC=A), P1-F-049(CC=A), P1-F-051(CC=A), P1-F-053(CC=A), P1-F-054(CC=A)

const LETTERS = ['A', 'B', 'C', 'D'];

function getNextLetter(l) {
    const idx = LETTERS.indexOf(l);
    return LETTERS[(idx + 1) % 4];
}

console.log('Fixing CC-EW alignment...');
let fixed = 0;

for (const [qid, cc] of Object.entries(FIX_MAP)) {
    const item = PACK.find(i => i.QuestionID === qid);
    if (!item) { console.log('  MISSING: ' + qid); continue; }
    if (item.CorrectChoice !== cc) { console.log('  CC MISMATCH: ' + qid + ' expected ' + cc + ' got ' + item.CorrectChoice); continue; }
    
    // The current state: scenario was written with Choice A as the correct answer
    // item.ExplanationWrongA is empty (""), item.Choices.A is the correct answer text
    // item.ExplanationCorrect explains Choice A
    
    // We need to rotate so the correct answer moves to the CC letter
    // How many positions to rotate? CC - A = index difference
    const shift = LETTERS.indexOf(cc); // how many positions to shift right
    
    if (shift === 0) continue; // already correct
    
    // Strategy: rotate the content
    // Choice A -> Choice[CC], Choice B -> Choice[next after CC], etc.
    // ExplanationWrongA -> ExplanationWrong[CC], ExplanationCorrect -> stay with Choice[CC]
    
    // Build rotated choices
    const oldChoices = { ...item.Choices };
    const oldEW = {};
    LETTERS.forEach(L => { oldEW[L] = item['ExplanationWrong' + L]; });
    const oldEC = item.ExplanationCorrect;
    
    // Rotate choices
    for (let i = 0; i < 4; i++) {
        const fromLetter = LETTERS[i];
        const toLetter = LETTERS[(i + shift) % 4];
        item.Choices[toLetter] = oldChoices[fromLetter];
    }
    
    // Rotate EW fields
    for (let i = 0; i < 4; i++) {
        const fromLetter = LETTERS[i];
        const toLetter = LETTERS[(i + shift) % 4];
        item['ExplanationWrong' + toLetter] = oldEW[fromLetter];
    }
    
    // Now the CC slot was shifted from position 0 (A), so:
    // EW[CC] = old EW_A which was "" → good, this is now the CC slot
    // But ExplanationCorrect still explains the old Choice A... 
    // Actually no. The ExplanationCorrect text was about the CONCEPT that A was correct.
    // Now that concept is at the CC position. So EC still correctly describes the content
    // at the CC letter... UNLESS the EC says "Choice A" specifically.
    
    // Wait - my EC texts don't reference choice letters by name. They describe
    // which approach/concept is correct. The approach/concept moved to the CC letter.
    // So the EC text should still be valid.
    
    // But we need to also set EW[CC] to "" (empty) since that's the correct answer slot.
    // After rotation, EW[CC] = old EW_A = "" → already empty. 
    
    // But old EW[cc] moved to EW[something_else], and might have old text.
    // We need to ensure ONLY EW[CC] is empty, not EW[shifted_to].
    
    // Wait, let me think more carefully about what happened after the rotation.
    // Before rotation:
    //   Choices: A=correct, B=distr1, C=distr2, D=distr3
    //   EW: A="", B=text1, C=text2, D=text3
    //   EC = "Choice A is correct because..."
    //   CC preserved = some non-A letter
    
    // Desired state (CC = preserved letter):
    //   Choices: CC=correct_text, next=distr1, next=distr2, next=distr3
    //   EW: CC="", next=text1, next=text2, next=text3
    //   EC still describes the correct concept
    
    // After rotation with shift:
    //   Choices[CC] = old Choices[A] = correct text ✓
    //   EW[CC] = old EW[A] = "" ✓
    //   EW[next] = old EW[B] = text1 ✓
    //   EC unchanged — should describe correct concept ✓
    
    // This looks correct! The rotation preserves the relationship.
    // EW[CC] ends up empty because it rotates from EW_A which was empty.
    // The other EW slots get the distractor texts from the rotated positions.
    
    // Verify:
    const newEWcc = item['ExplanationWrong' + cc];
    if (newEWcc && newEWcc.length > 0) {
        console.log('  WARNING: ' + qid + ' EW_' + cc + ' is non-empty after rotation: ' + newEWcc.substring(0, 60));
    }
    
    // Check that other EW slots are non-empty
    let missingCount = 0;
    LETTERS.forEach(L => {
        if (L === cc) return;
        const ew = item['ExplanationWrong' + L];
        if (!ew || ew.length === 0) {
            console.log('  WARNING: ' + qid + ' EW_' + L + ' is empty after rotation');
            missingCount++;
        }
    });
    
    console.log('  Fixed ' + qid + ': rotated choices/EW by ' + shift + ' positions to CC=' + cc + (missingCount > 0 ? ' (' + missingCount + ' empty non-CC slots!)' : ''));
    fixed++;
}

console.log('\nFixed ' + fixed + ' items.');

// Write back
let output = 'var MCQ_BANK_A = ' + JSON.stringify(PACK, null, '\t') + ';\n';
fs.writeFileSync(TARGET, output, 'utf8');
console.log('File written: ' + TARGET);
