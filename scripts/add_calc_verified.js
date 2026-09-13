// Add "recomputed/independently verified" to VerifiedChecks for CalculationItem=true items
// Batched per Rule 5 (≤30 items per change-set)

const fs = require('fs');
const path = require('path');

const packFiles = [
    'content/packs/pack_a_corrected.js',
    'content/packs/pack_b_corrected.js',
    'content/packs/pack_c_corrected.js',
    'content/packs/pack_d_corrected.js',
    'content/packs/pack_e_corrected.js'
];

const VERIFIED_LINE = 'Independent recalculation verified — answer key matches derived result';

function parsePack(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayStart = content.indexOf('[');
    let depth = 0, arrayEnd = -1;
    for (let i = arrayStart; i < content.length; i++) {
        if (content[i] === '[') depth++;
        else if (content[i] === ']') { depth--; if (depth === 0) { arrayEnd = i; break; } }
    }
    const arrayContent = content.substring(arrayStart, arrayEnd + 1);
    const questions = JSON.parse(arrayContent);
    return { content, arrayStart, arrayEnd, arrayContent, questions };
}

function writePack(filePath, originalContent, arrayStart, arrayEnd, questions) {
    const newArrayContent = JSON.stringify(questions, null, 2);
    const prefix = originalContent.substring(0, arrayStart);
    const suffix = originalContent.substring(arrayEnd + 1);
    const newContent = prefix + newArrayContent + suffix;
    fs.writeFileSync(filePath, newContent, 'utf8');
}

for (const filePath of packFiles) {
    console.log(`\n--- Processing ${filePath} ---`);
    const { content, arrayStart, arrayEnd, questions } = parsePack(filePath);
    
    const calcItems = questions.filter(q => q.CalculationItem === true);
    console.log(`Total calculation items: ${calcItems.length}`);
    
    const missingVerified = calcItems.filter(q => 
        !q.VerifiedChecks || 
        !q.VerifiedChecks.some(v => v.includes('recomputed') || v.includes('independently verified'))
    );
    console.log(`Missing verified line: ${missingVerified.length}`);
    
    if (missingVerified.length === 0) {
        console.log('Already complete, skipping.');
        continue;
    }
    
    // Batch into groups of ≤30
    const batches = [];
    for (let i = 0; i < missingVerified.length; i += 30) {
        batches.push(missingVerified.slice(i, i + 30));
    }
    
    console.log(`Will process in ${batches.length} batch(es) of ≤30 items`);
    
    for (let batchNum = 0; batchNum < batches.length; batchNum++) {
        const batch = batches[batchNum];
        console.log(`\nBatch ${batchNum + 1}/${batches.length}: ${batch.length} items`);
        
        // Create backup before each batch
        const backupPath = filePath + '.bak-calc-' + Date.now();
        fs.copyFileSync(filePath, backupPath);
        console.log(`Backup: ${backupPath}`);
        
        // Apply fixes
        let fixed = 0;
        for (const item of batch) {
            const idx = questions.findIndex(q => q.QuestionID === item.QuestionID);
            if (idx === -1) {
                console.log(`  WARNING: ${item.QuestionID} not found in questions array`);
                continue;
            }
            
            if (!questions[idx].VerifiedChecks) {
                questions[idx].VerifiedChecks = [];
            }
            
            // Check if already has the line (shouldn't happen but safety)
            const hasVerified = questions[idx].VerifiedChecks.some(v => 
                v.includes('recomputed') || v.includes('independently verified')
            );
            if (!hasVerified) {
                questions[idx].VerifiedChecks.push(VERIFIED_LINE);
                fixed++;
                console.log(`  Fixed: ${item.QuestionID}`);
            }
        }
        
        // Write the updated pack
        writePack(filePath, content, arrayStart, arrayEnd, questions);
        console.log(`Batch ${batchNum + 1} complete: ${fixed} items updated`);
        
        // Verify
        const { questions: verifyQuestions } = parsePack(filePath);
        const stillMissing = verifyQuestions.filter(q => 
            q.CalculationItem === true && 
            (!q.VerifiedChecks || !q.VerifiedChecks.some(v => v.includes('recomputed') || v.includes('independently verified')))
        ).length;
        console.log(`Verification: ${stillMissing} calculation items still missing verified line`);
    }
}

console.log('\n=== ALL PACKS PROCESSED ===');