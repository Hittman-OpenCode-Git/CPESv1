/**
 * S887 Agent M — Validate S886 Generated Upgrade Items
 * READ-ONLY. Validates 20 items (10 Section C + 10 Section D) before master integration.
 * 
 * Usage: node scripts/s887_validate_s886_items.js
 */

const path = require('path');
const fs = require('fs');

// ─── Load generated items ───────────────────────────────────────────────
const analyzeUpgrades = require('./output/s886_analyze_upgrades');
const upgradedItems = require('./s886_upgraded_items');

const ALL_ITEMS = [...analyzeUpgrades, ...upgradedItems];

// ─── Load pack files for cross-reference ─────────────────────────────────
const PACK_A_PATH = path.join(__dirname, '..', 'pack_a_corrected.js');
const PACK_B_PATH = path.join(__dirname, '..', 'pack_b_corrected.js');
const PACK_D_PATH = path.join(__dirname, '..', 'pack_d_corrected.js');
const PACK_E_PATH = path.join(__dirname, '..', 'pack_e_corrected.js');

function loadPackItems(filePath) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    // Pack files use: `var MCQ_BANK_A = [...]` or `const MCQ_BANK_X = [...]`
    // Replace the assignment with a return statement for Function constructor
    const wrapped = raw.replace(/^(?:var|const|let)\s+\w+\s*=\s*/, 'return ');
    const fn = new Function(wrapped);
    return fn();
}

let packAItems = [];
let packBItems = [];
let packDItems = [];
let packEItems = [];

try {
    packAItems = loadPackItems(PACK_A_PATH);
    console.log(`Loaded pack_a: ${packAItems.length} items`);
} catch (e) {
    console.log(`WARNING: Could not parse pack_a: ${e.message}`);
}
try {
    packBItems = loadPackItems(PACK_B_PATH);
    console.log(`Loaded pack_b: ${packBItems.length} items`);
} catch (e) {
    console.log(`WARNING: Could not parse pack_b: ${e.message}`);
}
try {
    packDItems = loadPackItems(PACK_D_PATH);
    console.log(`Loaded pack_d: ${packDItems.length} items`);
} catch (e) {
    console.log(`WARNING: Could not parse pack_d: ${e.message}`);
}
try {
    packEItems = loadPackItems(PACK_E_PATH);
    console.log(`Loaded pack_e: ${packEItems.length} items`);
} catch (e) {
    console.log(`WARNING: Could not parse pack_e: ${e.message}`);
}

// ─── Helpers ─────────────────────────────────────────────────────────────
const ALL_LETTERS = ['A', 'B', 'C', 'D'];

function getChoices(item) {
    return item.Choices || item.choices || null;
}

function getChoiceValue(item, letter) {
    const c = getChoices(item);
    if (!c) return null;
    return c[letter] || null;
}

function hasExplanationField(item, letter) {
    const key = 'ExplanationWrong' + letter;
    return item.hasOwnProperty(key);
}

function getExplanationWrong(item, letter) {
    const key = 'ExplanationWrong' + letter;
    return item[key] || '';
}

// ─── Rule 9: Binary lead-in polarity check ───────────────────────────────
const AFFIRMATIVE_PATTERNS = [
    /\bshould be investigated\b/i,
    /\bshould be accepted\b/i,
    /\bshould be selected\b/i,
    /\bcould be\b/i,
    /\bis (the )?correct\b/i,
    /\bis appropriate\b/i,
    /\bis justified\b/i,
    /\bis recommended\b/i,
    /\bwould be (the )?\w+ (choice|option|answer|method|approach)\b/i,
    /\bshould be (chosen|implemented|adopted|used)\b/i,
    /\bconfirms? (that )?the/i,
    /\bconsistent with/i,
    /\bcorrectly (states?|identifies?|describes?|interprets?|applies?)\b/i,
];

const NEGATIVE_PATTERNS = [
    /\bshould not be (investigated|accepted|selected|chosen|used)\b/i,
    /\bwould not be\b/i,
    /\bis not (the )?correct\b/i,
    /\bis not appropriate\b/i,
    /\bis (incorrect|wrong|misleading|invalid)\b/i,
    /\bcannot be\b/i,
    /\bdoes not (apply|meet|satisfy|change|represent|reflect|capture|align|indicate|prove|confirm)\b/i,
    /\bis (flawed|false|incorrect|invalid)\b/i,
];

function hasAffirmativeConclusion(text) {
    return AFFIRMATIVE_PATTERNS.some(p => p.test(text));
}

function hasNegativeConclusion(text) {
    return NEGATIVE_PATTERNS.some(p => p.test(text));
}

function checkBinaryLeadInPolarity(item) {
    const issues = [];
    const choices = getChoices(item);
    if (!choices) return issues;

    for (const letter of ALL_LETTERS) {
        const text = choices[letter];
        if (!text) continue;
        
        // Check choices starting with "No," or "Yes,"
        const noMatch = text.match(/^No,\s*(.+)/i);
        const yesMatch = text.match(/^Yes,\s*(.+)/i);
        
        if (noMatch) {
            const afterNo = noMatch[1];
            // "No," paired with affirmative conclusion → inverted
            if (hasAffirmativeConclusion(afterNo)) {
                // Check if the "No" is actually correct (e.g., "No, the variance is favorable")
                // If the choice is the correct answer, "No" could legitimately be the answer to
                // a stem asking a yes/no question
                // We only flag if "No" contradicts the trailing clause
                issues.push({
                    type: 'RULE_9_NO_AFFIRMATIVE',
                    letter,
                    detail: `Choice ${letter} starts with "No," but trailing clause appears affirmative: "${text.substring(0, 100)}..."`,
                });
            }
        }
        
        if (yesMatch) {
            const afterYes = yesMatch[1];
            // "Yes," paired with negative conclusion → inverted
            if (hasNegativeConclusion(afterYes)) {
                issues.push({
                    type: 'RULE_9_YES_NEGATIVE',
                    letter,
                    detail: `Choice ${letter} starts with "Yes," but trailing clause appears negative: "${text.substring(0, 100)}..."`,
                });
            }
        }
    }
    return issues;
}

// ─── Check if ExplanationWrong text describes its choice ─────────────────
function checkExplanationDescribesChoice(item) {
    const issues = [];
    const choices = getChoices(item);
    if (!choices) return issues;

    for (const letter of ALL_LETTERS) {
        const choiceText = choices[letter] || '';
        const ewText = getExplanationWrong(item, letter);
        
        if (!ewText || ewText.trim() === '') continue; // CC slot is empty
        
        // Basic lexical overlap check
        const choiceWords = new Set(
            choiceText.toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .split(/\s+/)
                .filter(w => w.length > 3)
        );
        const ewWords = ewText.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 3);
        
        // Count meaningful word overlap
        let overlap = 0;
        for (const w of ewWords) {
            if (choiceWords.has(w)) overlap++;
        }
        const ewSignificant = ewWords.filter(w => w.length > 3).length;
        const overlapRatio = ewSignificant > 0 ? overlap / ewSignificant : 0;
        
        if (overlapRatio < 0.03) {
            issues.push({
                type: 'LOW_OVERLAP',
                letter,
                detail: `ExplanationWrong${letter} has very low lexical overlap (${(overlapRatio*100).toFixed(1)}%) with Choice ${letter}. May describe a different choice.`,
                choicePreview: choiceText.substring(0, 80),
                ewPreview: ewText.substring(0, 80),
            });
        }
    }
    return issues;
}

// ─── Check ExplanationCorrect describes CorrectChoice ────────────────────
function checkExplanationMatchesCorrectChoice(item) {
    const issues = [];
    const cc = item.CorrectChoice;
    const choices = getChoices(item);
    const ec = item.ExplanationCorrect || '';
    
    if (!cc || !choices || !ec) return issues;
    
    const ccText = choices[cc] || '';
    const ccWords = new Set(
        ccText.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 4)
    );
    const ecWords = ec.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 4);
    
    let overlap = 0;
    for (const w of ecWords) {
        if (ccWords.has(w)) overlap++;
    }
    const overlapRatio = ccWords.size > 0 ? overlap / ccWords.size : 0;
    
    // For conceptual questions, overlap may be low but the EC should still confirm the CC
    // Check if EC mentions the correct choice letter or key topic
    const mentionsCorrectConcept = ec.toLowerCase().includes('correct') || 
                                    ec.toLowerCase().includes('appropriate') ||
                                    ec.toLowerCase().includes('recommend') ||
                                    overlapRatio > 0.05;
    
    if (!mentionsCorrectConcept && !item.CalculationItem) {
        issues.push({
            type: 'EC_CC_WEAK_LINK',
            detail: `ExplanationCorrect has low lexical overlap (${(overlapRatio*100).toFixed(1)}%) with CorrectChoice ${cc} text. Verify EC actually explains why ${cc} is correct.`,
            ccPreview: ccText.substring(0, 80),
            ecPreview: ec.substring(0, 80),
        });
    }
    
    return issues;
}

// ─── QID pattern validation ──────────────────────────────────────────────
function validateQIDPattern(qid) {
    if (!qid || typeof qid !== 'string') {
        return { valid: false, issue: 'Missing or non-string QuestionID' };
    }
    // Accept: P1-C-NNN, P1-D-NNN, P1E-C-NNN, P1-DD-NNN, P1B-D-NNN
    const validPattern = /^P1[A-Z]*-[A-Z]+-\d{3}$/;
    const validPattern2 = /^P1[A-Z]*-[A-Z]+-\d+$/; // P1-C-005, P1-DD-069
    if (validPattern.test(qid) || validPattern2.test(qid)) {
        return { valid: true };
    }
    return { valid: false, issue: `QuestionID "${qid}" does not match expected pattern` };
}

// ─── Main validation ─────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('  S887 Agent M — S886 Upgrade Item Validation');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log(`Total items to validate: ${ALL_ITEMS.length}`);
console.log(`  Section C (s886_analyze_upgrades): ${analyzeUpgrades.length}`);
console.log(`  Section D (s886_upgraded_items):   ${upgradedItems.length}\n`);

const results = [];
let totalIssues = 0;
let totalPasses = 0;
let totalFails = 0;

for (const item of ALL_ITEMS) {
    const qid = item.QuestionID || 'MISSING_QID';
    const itemIssues = [];
    const cc = item.CorrectChoice;
    const choices = getChoices(item);
    const ec = item.ExplanationCorrect || '';
    const stem = item.Stem || '';
    const cogLevel = item.CognitiveLevel || '';
    
    // (a) QID pattern
    const qidCheck = validateQIDPattern(qid);
    if (!qidCheck.valid) {
        itemIssues.push({ type: 'QID_PATTERN', detail: qidCheck.issue });
    }
    
    // (b) 4 choices
    if (!choices) {
        itemIssues.push({ type: 'NO_CHOICES', detail: 'No Choices/choices field found' });
    } else {
        const choiceKeys = Object.keys(choices);
        if (choiceKeys.length !== 4) {
            itemIssues.push({ type: 'CHOICE_COUNT', detail: `Expected 4 choices, got ${choiceKeys.length}: [${choiceKeys.join(',')}]` });
        }
        for (const l of ALL_LETTERS) {
            if (!choices[l]) {
                itemIssues.push({ type: 'MISSING_CHOICE', letter: l, detail: `Choice ${l} is missing` });
            }
        }
    }
    
    // (c) CorrectChoice is A/B/C/D
    if (!cc || !ALL_LETTERS.includes(cc)) {
        itemIssues.push({ type: 'INVALID_CC', detail: `CorrectChoice "${cc}" is not one of A/B/C/D` });
    }
    
    // (d) DL-008: ExplanationWrong[CorrectChoice] === ""
    if (cc && ALL_LETTERS.includes(cc)) {
        const ewCC = getExplanationWrong(item, cc);
        if (ewCC !== '' && ewCC !== undefined) {
            itemIssues.push({
                type: 'DL_008',
                detail: `ExplanationWrong${cc} is non-empty ("${ewCC.substring(0, 60)}...") — DL-008 violation. Must be "".`,
            });
        }
    }
    
    // (e) DL-026: ExplanationWrong[non-CC] non-empty for all 3 non-CC slots
    if (cc && ALL_LETTERS.includes(cc)) {
        for (const l of ALL_LETTERS) {
            if (l === cc) continue;
            const ew = getExplanationWrong(item, l);
            if (!ew || ew.trim() === '') {
                itemIssues.push({
                    type: 'DL_026',
                    letter: l,
                    detail: `ExplanationWrong${l} is empty or absent — DL-026 violation. All non-CC distractor slots must be non-empty.`,
                });
            }
        }
    }
    
    // (f) Rule 9: Binary lead-in polarity
    const rule9Issues = checkBinaryLeadInPolarity(item);
    itemIssues.push(...rule9Issues);
    
    // (g) ExplanationCorrect >= 50 chars
    if (ec.length < 50) {
        itemIssues.push({
            type: 'EC_TOO_SHORT',
            detail: `ExplanationCorrect is ${ec.length} chars (minimum 50 required)`,
        });
    }
    
    // (h) Stem >= 50 chars
    if (stem.length < 50) {
        itemIssues.push({
            type: 'STEM_TOO_SHORT',
            detail: `Stem is ${stem.length} chars (minimum 50 required)`,
        });
    }
    
    // (i) CognitiveLevel "Analyze" or "Evaluate"
    if (cogLevel && cogLevel !== 'Analyze' && cogLevel !== 'Evaluate') {
        itemIssues.push({
            type: 'COG_LEVEL',
            detail: `CognitiveLevel is "${cogLevel}" — expected "Analyze" or "Evaluate"`,
        });
    }
    if (!cogLevel) {
        itemIssues.push({
            type: 'COG_LEVEL',
            detail: `CognitiveLevel is missing — expected "Analyze" or "Evaluate"`,
        });
    }
    
    // (j) All 4 ExplanationWrong fields present
    for (const l of ALL_LETTERS) {
        if (!hasExplanationField(item, l)) {
            itemIssues.push({
                type: 'MISSING_EW_FIELD',
                letter: l,
                detail: `ExplanationWrong${l} field is absent from the object`,
            });
        }
    }
    
    // ─── Step 3: ExplanationWrong describes its choice ─────────────────
    const overlapIssues = checkExplanationDescribesChoice(item);
    itemIssues.push(...overlapIssues);
    
    // ─── Step 4: ExplanationCorrect matches CorrectChoice ──────────────
    const ecMatchIssues = checkExplanationMatchesCorrectChoice(item);
    itemIssues.push(...ecMatchIssues);
    
    // ─── Verdict ───────────────────────────────────────────────────────
    const criticalIssues = itemIssues.filter(i => 
        ['DL_008', 'DL_026', 'INVALID_CC', 'NO_CHOICES', 'MISSING_EW_FIELD', 'CHOICE_COUNT'].includes(i.type)
    );
    const passed = criticalIssues.length === 0;
    
    if (passed) totalPasses++;
    else totalFails++;
    totalIssues += itemIssues.length;
    
    results.push({
        qid,
        passed,
        issues: itemIssues,
        criticalCount: criticalIssues.length,
        totalIssueCount: itemIssues.length,
    });
    
    // Print per-item summary
    const status = passed ? 'PASS' : 'FAIL';
    const issueSummary = itemIssues.length > 0 
        ? ` (${itemIssues.length} issues: ${itemIssues.map(i => i.type).join(', ')})`
        : '';
    console.log(`  ${status}  ${qid}  | CC=${cc} | Cog=${cogLevel} | EW[CC]=${cc ? (getExplanationWrong(item, cc) === '' ? 'CLEAN' : 'DIRTY') : 'N/A'} | non-CC slots present=${ALL_LETTERS.filter(l => hasExplanationField(item, l)).length}/4${issueSummary}`);
}

// ─── Step 5: Summary ─────────────────────────────────────────────────────
console.log(`\n═══════════════════════════════════════════════════════════════`);
console.log(`  SUMMARY`);
console.log(`═══════════════════════════════════════════════════════════════`);
console.log(`  Total items:         ${ALL_ITEMS.length}`);
console.log(`  PASS:                ${totalPasses}`);
console.log(`  FAIL:                ${totalFails}`);
console.log(`  Total issues found:  ${totalIssues}`);
console.log(``);

// ─── Detailed issues ─────────────────────────────────────────────────────
if (totalIssues > 0) {
    console.log(`  ─── ISSUE DETAILS ───\n`);
    for (const r of results.filter(r => r.issues.length > 0)) {
        console.log(`  ${r.passed ? 'PASS' : 'FAIL'}  ${r.qid}:`);
        for (const issue of r.issues) {
            const label = issue.letter ? `[${issue.letter}] ` : '';
            console.log(`       ${issue.type}: ${label}${issue.detail}`);
        }
        console.log('');
    }
}

// ─── Step 6: P1-DD-068 / P1-DD-069 cross-reference ───────────────────────
console.log(`═══════════════════════════════════════════════════════════════`);
console.log(`  STEP 6: P1-DD-068 Cross-Reference`);
console.log(`═══════════════════════════════════════════════════════════════`);

const existingDD068 = packDItems.find(q => q.QuestionID === 'P1-DD-068');
const existingDD069 = packDItems.find(q => q.QuestionID === 'P1-DD-069');
const generatedDD069 = ALL_ITEMS.find(q => q.QuestionID === 'P1-DD-069');

if (existingDD068) {
    console.log(`\n  EXISTING P1-DD-068 in pack_d_corrected.js:`);
    console.log(`    CorrectChoice:      "${existingDD068.CorrectChoice}"`);
    console.log(`    Topic:              "${existingDD068.Topic}"`);
    console.log(`    CognitiveLevel:     "${existingDD068.CognitiveLevel}"`);
    console.log(`    question_state:     "${existingDD068.question_state}"`);
    console.log(`    DifficultyScore:    ${existingDD068.DifficultyScore}`);
    
    // DL-008 check
    const cc068 = existingDD068.CorrectChoice;
    const ewCC068 = existingDD068['ExplanationWrong' + cc068] || '';
    console.log(`    EW[${cc068}] (DL-008):     "${ewCC068 === '' ? '"" (CLEAN)' : ewCC068.substring(0, 50) + '..."'} `);
    
    // DL-026 check
    const emptyNonCC = [];
    for (const l of ALL_LETTERS) {
        if (l === cc068) continue;
        const ew = existingDD068['ExplanationWrong' + l];
        if (!ew || ew.trim() === '') emptyNonCC.push(l);
    }
    if (emptyNonCC.length > 0) {
        console.log(`    DL-026:             WARNING — empty non-CC EW slots: [${emptyNonCC.join(',')}]`);
    } else {
        console.log(`    DL-026:             CLEAN — all non-CC slots populated`);
    }
    console.log(`    Stem preview:       "${(existingDD068.Stem || '').substring(0, 80)}..."`);
}

if (existingDD069) {
    console.log(`\n  EXISTING P1-DD-069 in pack_d_corrected.js:`);
    console.log(`    CorrectChoice:      "${existingDD069.CorrectChoice}"`);
    console.log(`    Topic:              "${existingDD069.Topic}"`);
    console.log(`    CognitiveLevel:     "${existingDD069.CognitiveLevel}"`);
    console.log(`    question_state:     "${existingDD069.question_state}"`);
    console.log(`    DifficultyScore:    ${existingDD069.DifficultyScore}`);
    
    const cc069 = existingDD069.CorrectChoice;
    const ewCC069 = existingDD069['ExplanationWrong' + cc069] || '';
    console.log(`    EW[${cc069}] (DL-008):     "${ewCC069 === '' ? '"" (CLEAN)' : ewCC069.substring(0, 50) + '..."'} `);
    console.log(`    Stem preview:       "${(existingDD069.Stem || '').substring(0, 80)}..."`);
}

if (generatedDD069) {
    console.log(`\n  GENERATED S886 upgrade (P1-DD-069 content block):`);
    console.log(`    CorrectChoice:      "${generatedDD069.CorrectChoice}"`);
    console.log(`    Topic:              "${generatedDD069.Topic}"`);
    console.log(`    CognitiveLevel:     "${generatedDD069.CognitiveLevel}"`);
    console.log(`    question_state:     "${generatedDD069.question_state}"`);
    console.log(`    DifficultyScore:    ${generatedDD069.DifficultyScore}`);
    
    const ccGen = generatedDD069.CorrectChoice;
    const ewCCGen = getExplanationWrong(generatedDD069, ccGen);
    console.log(`    EW[${ccGen}] (DL-008):     "${ewCCGen === '' ? '"" (CLEAN)' : ewCCGen.substring(0, 50) + '..."'} `);
    console.log(`    Stem preview:       "${(generatedDD069.Stem || '').substring(0, 80)}..."`);
    
    // Compare CorrectChoice alignment
    if (existingDD069 && generatedDD069.CorrectChoice !== existingDD069.CorrectChoice) {
        console.log(`\n    ⚠  CorrectChoice MISMATCH: existing=${existingDD069.CorrectChoice}, generated=${generatedDD069.CorrectChoice}`);
    } else if (existingDD069) {
        console.log(`\n    ✓  CorrectChoice matches existing: ${existingDD069.CorrectChoice}`);
    }
}

// Check for duplicate QIDs within the generated set
console.log(`\n═══════════════════════════════════════════════════════════════`);
console.log(`  DUPLICATE QID CHECK (within generated set)`);
console.log(`═══════════════════════════════════════════════════════════════`);
const qidCounts = {};
ALL_ITEMS.forEach(item => {
    const q = item.QuestionID;
    qidCounts[q] = (qidCounts[q] || 0) + 1;
});
const dupes = Object.entries(qidCounts).filter(([_, c]) => c > 1);
if (dupes.length > 0) {
    console.log(`  WARNING: ${dupes.length} duplicate QID(s) found:`);
    dupes.forEach(([q, c]) => console.log(`    ${q}: appears ${c} times`));
} else {
    console.log(`  No duplicate QIDs found — all 20 items have unique IDs.`);
}

// ─── QID overlap with existing packs ──────────────────────────────────────
console.log(`\n═══════════════════════════════════════════════════════════════`);
console.log(`  QID OVERLAP WITH EXISTING PACK FILES`);
console.log(`═══════════════════════════════════════════════════════════════`);

const allExistingItems = [...packAItems, ...packBItems, ...packDItems, ...packEItems];
const existingQIDs = new Set(allExistingItems.map(q => q.QuestionID));
const generatedQIDs = new Set(ALL_ITEMS.map(q => q.QuestionID));
const overlaps = [...generatedQIDs].filter(q => existingQIDs.has(q));

if (overlaps.length > 0) {
    console.log(`  ${overlaps.length} generated QIDs already exist in pack files:`);
    for (const qid of overlaps.sort()) {
        const existing = allExistingItems.find(q => q.QuestionID === qid);
        if (existing) {
            const existingCC = existing.CorrectChoice;
            const existingState = existing.question_state || 'MISSING';
            const existingCog = existing.CognitiveLevel || 'N/A';
            const gen = ALL_ITEMS.find(q => q.QuestionID === qid);
            const genCC = gen.CorrectChoice;
            const genCog = gen.CognitiveLevel;
            const ccMatch = existingCC === genCC ? 'MATCH' : 'MISMATCH';
            console.log(`    ${qid}: existing(CC=${existingCC}, cog=${existingCog}, state=${existingState}) vs generated(CC=${genCC}, cog=${genCog}) → CC ${ccMatch}`);
        }
    }
} else {
    console.log(`  No QID overlap found.`);
}

// ─── Overall integration readiness ────────────────────────────────────────
console.log(`\n═══════════════════════════════════════════════════════════════`);
console.log(`  INTEGRATION READINESS ASSESSMENT`);
console.log(`═══════════════════════════════════════════════════════════════`);

const blockingIssues = results.filter(r => !r.passed);
const hasBlocking = blockingIssues.length > 0;

if (hasBlocking) {
    console.log(`\n  VERDICT: NOT READY for integration`);
    console.log(`  ${blockingIssues.length} item(s) have blocking issues (DL-008, DL-026, invalid CC, missing choices/EW fields):`);
    for (const r of blockingIssues) {
        const blockers = r.issues.filter(i => ['DL_008', 'DL_026', 'INVALID_CC', 'NO_CHOICES', 'MISSING_EW_FIELD', 'CHOICE_COUNT'].includes(i.type));
        console.log(`    ${r.qid}: ${blockers.map(b => b.type).join(', ')}`);
    }
} else {
    console.log(`\n  VERDICT: READY for integration (all blocking checks pass)`);
}

const nonBlockingIssueCount = results.reduce((sum, r) => sum + r.issues.filter(i => !['DL_008', 'DL_026', 'INVALID_CC', 'NO_CHOICES', 'MISSING_EW_FIELD', 'CHOICE_COUNT'].includes(i.type)).length, 0);
if (nonBlockingIssueCount > 0) {
    console.log(`  ${nonBlockingIssueCount} non-blocking advisory issue(s) found (see details above).`);
    console.log(`  Recommendation: review before deployment but not blocking.`);
}

console.log(`\n  Per-item verdicts:`);
for (const r of results) {
    console.log(`    ${r.passed ? 'PASS' : 'FAIL'}  ${r.qid}  (${r.totalIssueCount} issues, ${r.criticalCount} critical)`);
}

console.log(`\n═══════════════════════════════════════════════════════════════\n`);
