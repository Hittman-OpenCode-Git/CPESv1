const fs = require("fs");
const path = require("path");

const base = "C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026";

function extractWithFunction(filePath, varName) {
    const code = fs.readFileSync(filePath, "utf8");
    const obj = new Function(code + "; return " + varName + ";")();
    const items = {};
    for (const q of obj) {
        items[q.QuestionID] = {
            qid: q.QuestionID,
            cognitiveLevel: q.CognitiveLevel || null,
            difficulty: q.Difficulty || null,
            difficultyScore: q.DifficultyScore != null ? q.DifficultyScore : null,
            question_state: q.question_state || null
        };
    }
    return items;
}

const packConfigs = [
    { file: "pack_a_corrected.js", varName: "MCQ_BANK_A", backup: "backups\\pack_a_corrected.js.bak-20260726174053" },
    { file: "pack_b_corrected.js", varName: "MCQ_BANK_B", backup: "backups\\pack_b_corrected.js.bak-20260726174053" },
    { file: "pack_c_corrected.js", varName: "MCQ_BANK_C", backup: "backups\\pack_c_corrected.js.bak-20260726173128" },
    { file: "pack_d_corrected.js", varName: "MCQ_BANK_D", backup: "backups\\pack_d_corrected.js.bak-20260726173128" },
    { file: "pack_e_corrected.js", varName: "MCQ_BANK_E", backup: "backups\\pack_e_corrected.js.bak-20260726173128" }
];

console.log("=" .repeat(80));
console.log("S722 MODIFICATION INVENTORY VERIFICATION (Function constructor)");
console.log("=" .repeat(80));

let totalChanged = 0;
const allChanges = [];

for (const cfg of packConfigs) {
    const currentPath = path.join(base, cfg.file);
    const backupPath = path.join(base, cfg.backup);
    
    if (!fs.existsSync(backupPath)) {
        console.log(`  ${cfg.file}: Backup NOT FOUND at ${cfg.backup}`);
        continue;
    }
    
    const currentItems = extractWithFunction(currentPath, cfg.varName);
    const backupItems = extractWithFunction(backupPath, cfg.varName);
    
    console.log(`\n${cfg.file}: Backup=${Object.keys(backupItems).length} curr=${Object.keys(currentItems).length}`);
    
    const packChanges = [];
    for (const qid of Object.keys(currentItems)) {
        const curr = currentItems[qid];
        const prev = backupItems[qid];
        if (!prev) continue;
        if (curr.cognitiveLevel !== prev.cognitiveLevel || 
            curr.difficultyScore !== prev.difficultyScore ||
            curr.difficulty !== prev.difficulty) {
            packChanges.push({
                qid,
                prevCL: prev.cognitiveLevel, prevDS: prev.difficultyScore, prevD: prev.difficulty,
                currCL: curr.cognitiveLevel, currDS: curr.difficultyScore, currD: curr.difficulty,
                qs: curr.question_state
            });
        }
    }
    
    console.log(`  Changed: ${packChanges.length}`);
    
    if (packChanges.length > 0) {
        const cats = {};
        for (const ch of packChanges) {
            const key = `${ch.prevCL || '?'}@DS${ch.prevDS} -> ${ch.currCL || '?'}@DS${ch.currDS}`;
            cats[key] = (cats[key] || 0) + 1;
        }
        for (const [cat, count] of Object.entries(cats)) console.log(`    ${cat}: ${count}`);
        
        // Show QIDs
        console.log(`  QIDs:`);
        for (const ch of packChanges) {
            console.log(`    ${ch.qid}: ${ch.prevCL}@DS${ch.prevDS} → ${ch.currCL}@DS${ch.currDS} (${ch.qs || 'no-state'})`);
        }
        totalChanged += packChanges.length;
        allChanges.push(...packChanges);
    }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Total items changed (CL/Difficulty/DS): ${totalChanged}`);
console.log(`S722 claimed: 86 (Wave 2: 22 + Wave 3: 64)`);
console.log(`Discrepancy: ${totalChanged - 86} ${totalChanged === 86 ? '✓ MATCH' : (totalChanged > 86 ? '✗ MORE CHANGES THAN CLAIMED' : '✗ FEWER CHANGES THAN CLAIMED')}`);

// Categorize: which changes are pure DS adjustments
console.log(`\n=== CHANGE CATEGORIZATION ===`);
const dsOnly = allChanges.filter(c => c.prevCL === c.currCL && c.prevDS !== c.currDS);
const clOnly = allChanges.filter(c => c.prevCL !== c.currCL && c.prevDS === c.currDS);
const both = allChanges.filter(c => c.prevCL !== c.currCL && c.prevDS !== c.currDS);
console.log(`DS-only (CL unchanged): ${dsOnly.length}`);
console.log(`CL-only (DS unchanged): ${clOnly.length}`);
console.log(`Both CL+DS changed: ${both.length}`);

// Specifically: 22 Und@DS4→DS2? 
const undDS4toDS2 = allChanges.filter(c => c.prevCL === "Understand" && c.prevDS === 4 && c.currDS === 2);
console.log(`\nUnd@DS4→DS2 (Wave 2 claim: 22): ${undDS4toDS2.length}`);
if (undDS4toDS2.length > 0) console.log(`  QIDs: ${undDS4toDS2.map(c => c.qid).join(', ')}`);

// Analyze→Understand (Wave 3 claim: 55)
const anaToUnd = allChanges.filter(c => c.prevCL === "Analyze" && c.currCL === "Understand");
console.log(`Analyze→Understand (Wave 3 claim: 55): ${anaToUnd.length}`);

// Apply DS1→DS2/DS3 (Wave 3 claim: 9)
const applyDS1adjust = allChanges.filter(c => c.prevCL === "Apply" && c.prevDS === 1 && c.currDS > 1 && c.prevCL === c.currCL);
console.log(`Apply DS1→DS2/DS3 (Wave 3 claim: 9): ${applyDS1adjust.length}`);

// Unknown: items that changed but don't fit the pattern
const unexpected = allChanges.filter(c => {
    const isUndDS4 = c.prevCL === "Understand" && c.prevDS === 4 && c.currDS === 2;
    const isAnaToUnd = c.prevCL === "Analyze" && c.currCL === "Understand";
    const isApplyDS1adj = c.prevCL === "Apply" && c.prevDS === 1 && c.currDS > 1 && c.prevCL === c.currCL;
    return !isUndDS4 && !isAnaToUnd && !isApplyDS1adj;
});
console.log(`\nUNCATEGORIZED CHANGES (not in S722 Wave 2 or Wave 3 pattern): ${unexpected.length}`);
for (const ch of unexpected) {
    console.log(`  ${ch.qid}: ${ch.prevCL}@DS${ch.prevDS} → ${ch.currCL}@DS${ch.currDS} (${ch.qs || '?'})`);
}
