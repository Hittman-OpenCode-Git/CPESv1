// Session 718 Random Sample Manual Verification
const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const PACKS = ['a', 'b', 'c', 'd', 'e'];
const SAMPLE_SIZE = 20;

// Valid CognitiveLevel values
const VALID_CL = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];

const packVarMap = { a: 'MCQ_BANK_A', b: 'MCQ_BANK_B', c: 'MCQ_BANK_C', d: 'MCQ_BANK_D', e: 'MCQ_BANK_E' };

// Critical content fields to verify
const CRITICAL_FIELDS = ['QuestionID', 'question_state', 'CorrectChoice', 'Stem', 'Difficulty', 'DifficultyScore', 'ExplanationCorrect'];

console.log('Session 718 Random Sample Manual Verification');
console.log('=============================================\n');

let totalSampled = 0;
let totalMismatches = 0;

for (const pl of PACKS) {
    const filePath = path.join(BASE, `pack_${pl}_corrected.js`);
    const backupPath = path.join(BASE, `pack_${pl}_corrected.js.bak-20260726S718`);
    const varName = packVarMap[pl];
    
    const curContent = fs.readFileSync(filePath, 'utf8');
    const bakContent = fs.readFileSync(backupPath, 'utf8');
    
    const curItems = new Function(curContent + '; return ' + varName + ';')();
    const bakItems = new Function(bakContent + '; return ' + varName + ';')();
    
    // Build maps
    const curMap = {};
    for (const item of curItems) curMap[item.QuestionID] = item;
    const bakMap = {};
    for (const item of bakItems) bakMap[item.QuestionID] = item;
    
    // Random sample
    const qids = Object.keys(curMap);
    const shuffled = qids.sort(() => Math.random() - 0.5);
    const sample = shuffled.slice(0, SAMPLE_SIZE);
    
    console.log(`--- Pack ${pl.toUpperCase()} (${SAMPLE_SIZE} random samples) ---`);
    
    let packMismatches = 0;
    let packCLInvalid = 0;
    const clDistribution = {};
    
    for (const qid of sample) {
        const cur = curMap[qid];
        const bak = bakMap[qid];
        
        if (!bak) {
            console.log(`  ${qid}: NOT IN BACKUP - SKIPPED`);
            continue;
        }
        
        const diffs = [];
        let clValue = null;
        
        for (const field of CRITICAL_FIELDS) {
            if (JSON.stringify(cur[field]) !== JSON.stringify(bak[field])) {
                diffs.push(`${field}: "${bak[field]}" => "${cur[field]}"`);
            }
        }
        
        // Check CognitiveLevel
        clValue = cur['CognitiveLevel'];
        if (!clValue) {
            diffs.push('CognitiveLevel: MISSING');
            packCLInvalid++;
        } else if (!VALID_CL.includes(clValue)) {
            diffs.push(`CognitiveLevel: INVALID VALUE "${clValue}"`);
            packCLInvalid++;
        } else {
            clDistribution[clValue] = (clDistribution[clValue] || 0) + 1;
        }
        
        if (diffs.length > 0) {
            packMismatches++;
            console.log(`  *** ${qid}: ${diffs.join('; ')}`);
        }
        
        totalSampled++;
    }
    
    console.log(`  Mismatches in sample: ${packMismatches}`);
    console.log(`  Invalid CognitiveLevel: ${packCLInvalid}`);
    console.log(`  CL distribution in sample: ${JSON.stringify(clDistribution)}`);
    console.log('');
    
    totalMismatches += packMismatches;
}

// Full pool CognitiveLevel distribution
console.log('--- Full Pool CognitiveLevel Distribution ---');
for (const pl of PACKS) {
    const filePath = path.join(BASE, `pack_${pl}_corrected.js`);
    const varName = packVarMap[pl];
    const curContent = fs.readFileSync(filePath, 'utf8');
    const curItems = new Function(curContent + '; return ' + varName + ';')();
    
    const dist = {};
    for (const item of curItems) {
        const cl = item['CognitiveLevel'] || 'MISSING';
        dist[cl] = (dist[cl] || 0) + 1;
    }
    console.log(`  Pack ${pl.toUpperCase()}: ${JSON.stringify(dist)}`);
}

console.log(`\nTotal sampled: ${totalSampled}`);
console.log(`Total mismatches found: ${totalMismatches}`);
console.log(totalMismatches === 0 ? 'VERDICT: ALL SAMPLES PASS - No content changes detected' : `VERDICT: ${totalMismatches} MISMATCHES FOUND`);
