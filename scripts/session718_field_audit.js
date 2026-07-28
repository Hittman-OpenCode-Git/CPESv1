// Session 718 Final Field-Level Analysis
const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const PACKS = ['a', 'b', 'c', 'd', 'e'];
const packVarMap = { a: 'MCQ_BANK_A', b: 'MCQ_BANK_B', c: 'MCQ_BANK_C', d: 'MCQ_BANK_D', e: 'MCQ_BANK_E' };

// Critical content fields
const CRITICAL_CONTENT_FIELDS = [
    'QuestionID', 'Part', 'Section', 'SectionName', 'Topic', 'MicroTopic',
    'UniqueConceptKey', 'LOSTag', 'Difficulty', 'DifficultyScore', 'ItemType',
    'ItemStyle', 'Stem', 'Choices', 'CorrectChoice', 'ExplanationCorrect',
    'question_state', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
    'CalculationItem', 'StudyLinks', 'ExplanationWrongA', 'ExplanationWrongB',
    'ExplanationWrongC', 'ExplanationWrongD', 'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
    'VerifiedChecks', 'pedagogical_cluster', 'pack_state'
];

const results = {};

for (const pl of PACKS) {
    const filePath = path.join(BASE, `pack_${pl}_corrected.js`);
    const backupPath = path.join(BASE, `pack_${pl}_corrected.js.bak-20260726S718`);
    const varName = packVarMap[pl];
    
    const curContent = fs.readFileSync(filePath, 'utf8');
    const bakContent = fs.readFileSync(backupPath, 'utf8');
    
    const curItems = new Function(curContent + '; return ' + varName + ';')();
    const bakItems = new Function(bakContent + '; return ' + varName + ';')();
    
    const curMap = {};
    for (const item of curItems) curMap[item.QuestionID] = item;
    const bakMap = {};
    for (const item of bakItems) bakMap[item.QuestionID] = item;
    
    // Field key analysis
    const allCurrentKeys = new Set();
    const allBackupKeys = new Set();
    const itemsWithExtraFields = [];
    const itemsWithMissingFields = [];
    
    for (const qid of Object.keys(curMap)) {
        const cur = curMap[qid];
        const bak = bakMap[qid];
        if (!bak) continue;
        
        const curKeys = Object.keys(cur);
        const bakKeys = Object.keys(bak);
        
        for (const k of curKeys) allCurrentKeys.add(k);
        for (const k of bakKeys) allBackupKeys.add(k);
        
        const extra = curKeys.filter(k => !bakKeys.includes(k) && k !== 'CognitiveLevel');
        const missing = bakKeys.filter(k => !curKeys.includes(k));
        
        if (extra.length > 0) {
            itemsWithExtraFields.push({ qid, extra });
        }
        if (missing.length > 0) {
            itemsWithMissingFields.push({ qid, missing });
        }
    }
    
    // Determine exclusively new keys (in current but not in backup)
    const newKeys = [...allCurrentKeys].filter(k => !allBackupKeys.has(k));
    
    results[pl] = {
        itemCount: curItems.length,
        backupItemCount: bakItems.length,
        currentFieldKeys: [...allCurrentKeys].sort(),
        backupFieldKeys: [...allBackupKeys].sort(),
        exclusivelyNewKeys: newKeys,
        itemsWithExtraFields: itemsWithExtraFields.length,
        itemsWithMissingFields: itemsWithMissingFields.length,
        extraFieldDetails: itemsWithExtraFields.slice(0, 5),
        missingFieldDetails: itemsWithMissingFields.slice(0, 5),
        // Verify all existing fields are unchanged
        allFieldsMatch: itemsWithExtraFields.length === 0 && itemsWithMissingFields.length === 0 && (newKeys.length === 0 || (newKeys.length === 1 && newKeys[0] === 'CognitiveLevel'))
    };
    
    console.log(`Pack ${pl.toUpperCase()}:`);
    console.log(`  Current field key count: ${allCurrentKeys.size}`);
    console.log(`  Backup field key count: ${allBackupKeys.size}`);
    console.log(`  Exclusively new keys: [${newKeys.join(', ')}]`);
    console.log(`  Items with extra (non-CL) fields: ${itemsWithExtraFields.length}`);
    console.log(`  Items with missing fields: ${itemsWithMissingFields.length}`);
    console.log(`  All fields match (except CL): ${results[pl].allFieldsMatch}`);
    
    if (itemsWithExtraFields.length > 0) {
        console.log(`  EXTRA FIELD EXAMPLES:`);
        for (const ex of results[pl].extraFieldDetails) {
            console.log(`    ${ex.qid}: ${ex.extra.join(', ')}`);
        }
    }
    console.log('');
}

// Summary
const allNewKeys = new Set();
for (const pl of PACKS) {
    for (const k of results[pl].exclusivelyNewKeys) allNewKeys.add(k);
}

console.log('=== CROSS-PACK SUMMARY ===');
console.log(`Exclusively new keys across all packs: [${[...allNewKeys].join(', ')}]`);
const allGood = [...allNewKeys].length === 1 && [...allNewKeys][0] === 'CognitiveLevel';
console.log(`Only CognitiveLevel is new: ${allGood}`);

let totalExtraFields = 0;
let totalMissingFields = 0;
for (const pl of PACKS) {
    totalExtraFields += results[pl].itemsWithExtraFields;
    totalMissingFields += results[pl].itemsWithMissingFields;
}
console.log(`Total items with extra fields (non-CL): ${totalExtraFields}`);
console.log(`Total items with missing fields: ${totalMissingFields}`);
console.log(`\nVERDICT: ${(allGood && totalExtraFields === 0 && totalMissingFields === 0) ? 'PASS - Only CognitiveLevel was added to all items' : 'FAIL - Additional changes detected'}`);

// Write field-level report
const reportPath = path.join(BASE, 'reports', 'session_status', 'SESSION718_FIELD_LEVEL_ANALYSIS.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');
console.log(`\nField-level report written to: ${reportPath}`);
