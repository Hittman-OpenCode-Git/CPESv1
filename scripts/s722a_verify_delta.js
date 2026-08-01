const fs = require("fs");
const path = require("path");

const base = "C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026";

// Load pre-S722 backups and current files for Packs C, D, E (Wave 2 pre-write)
const packMap = {
    "content/packs/pack_c_corrected.js": { backup: "backups\\pack_c_corrected.js.bak-20260726173128" },
    "content/packs/pack_d_corrected.js": { backup: "backups\\pack_d_corrected.js.bak-20260726173128" },
    "content/packs/pack_e_corrected.js": { backup: "backups\\pack_e_corrected.js.bak-20260726173128" },
    "content/packs/pack_a_corrected.js": { backup: "backups\\pack_a_corrected.js.bak-20260726174053" },
    "content/packs/pack_b_corrected.js": { backup: "backups\\pack_b_corrected.js.bak-20260726174053" }
};

function extractMetadata(code) {
    const items = {};
    // Extract per-item using regex boundaries
    const qidPattern = /"QuestionID"\s*:\s*"(P1[A-E]?-[A-F]?-\d+)"/g;
    let match;
    const qids = [];
    while ((match = qidPattern.exec(code)) !== null) {
        qids.push({ qid: match[1], pos: match.index });
    }
    
    for (let i = 0; i < qids.length; i++) {
        const { qid, pos } = qids[i];
        const nextPos = i + 1 < qids.length ? qids[i + 1].pos : code.length;
        const block = code.substring(pos, nextPos);
        
        const clMatch = block.match(/"CognitiveLevel"\s*:\s*"([^"]+)"/);
        const dMatch = block.match(/"Difficulty"\s*:\s*"([^"]+)"/);
        const dsMatch = block.match(/"DifficultyScore"\s*:\s*(\d+)/);
        const qsMatch = block.match(/"question_state"\s*:\s*"([^"]+)"/);
        
        items[qid] = {
            qid,
            cognitiveLevel: clMatch ? clMatch[1] : null,
            difficulty: dMatch ? dMatch[1] : null,
            difficultyScore: dsMatch ? parseInt(dsMatch[1]) : null,
            question_state: qsMatch ? qsMatch[1] : null
        };
    }
    return items;
}

console.log("=" .repeat(80));
console.log("S722 MODIFICATION INVENTORY VERIFICATION");
console.log("Comparing pre-S722 backup vs current state");
console.log("=" .repeat(80));

const changes = [];
const notInInventory = [];
const s722Inventory = {
    // Wave 2: 22 Understand@DS4→DS2 (Packs C:7, D:14, E:1)
    wave2: { pattern: "Understand@DS4→DS2", packs: { C: 7, D: 14, E: 1 }, total: 22 },
    // Wave 3: 55 Analyze→Understand (DL-012 clones) + 9 Apply DS1→DS2/DS3
    wave3_cl: { pattern: "Analyze→Understand", packs: {}, total: 55 },
    wave3_ds: { pattern: "Apply DS1→DS2/DS3", packs: {}, total: 9 },
    total: 86
};

for (const [packFile, paths] of Object.entries(packMap)) {
    const currentPath = path.join(base, packFile);
    const backupPath = path.join(base, paths.backup);
    
    if (!fs.existsSync(backupPath)) {
        console.log(`  Skipping ${packFile} — backup not found: ${backupPath}`);
        continue;
    }
    
    const currentCode = fs.readFileSync(currentPath, "utf8");
    const backupCode = fs.readFileSync(backupPath, "utf8");
    
    const currentItems = extractMetadata(currentCode);
    const backupItems = extractMetadata(backupCode);
    
    console.log(`\n${packFile}:`);
    console.log(`  Backup: ${Object.keys(backupItems).length} items, Current: ${Object.keys(currentItems).length} items`);
    
    const packChanges = [];
    for (const qid of Object.keys(currentItems)) {
        const curr = currentItems[qid];
        const prev = backupItems[qid];
        if (!prev) {
            packChanges.push({ qid, type: "NEW_ITEM", curr });
            continue;
        }
        if (curr.cognitiveLevel !== prev.cognitiveLevel || curr.difficulty !== prev.difficulty || curr.difficultyScore !== prev.difficultyScore) {
            packChanges.push({
                qid,
                type: "MODIFIED",
                prev: { cl: prev.cognitiveLevel, d: prev.difficulty, ds: prev.difficultyScore },
                curr: { cl: curr.cognitiveLevel, d: curr.difficulty, ds: curr.difficultyScore, qs: curr.question_state }
            });
        }
    }
    
    console.log(`  Items changed (CL/Difficulty/DS): ${packChanges.length}`);
    
    if (packChanges.length > 0) {
        // Categorize changes
        const categories = {};
        for (const ch of packChanges) {
            const prev = ch.prev || {};
            const curr = ch.curr || {};
            const cat = `${prev.cl || 'NEW'}@DS${prev.ds || '?'} → ${curr.cl || 'N/A'}@DS${curr.ds || '?'}`;
            categories[cat] = (categories[cat] || 0) + 1;
        }
        for (const [cat, count] of Object.entries(categories)) {
            console.log(`    ${cat}: ${count}`);
        }
        changes.push({ pack: packFile, packChanges, categories });
    }
}

// Total
const totalChanged = changes.reduce((sum, c) => sum + c.packChanges.length, 0);
console.log(`\nTOTAL ITEMS CHANGED: ${totalChanged}`);
console.log(`S722 CLAIMED: ${s722Inventory.total}`);
console.log(`DISCREPANCY: ${totalChanged - s722Inventory.total} ${totalChanged === s722Inventory.total ? '✓ MATCH' : '✗ MISMATCH'}`);

// Also check for any items not in the backup that DO appear in current
console.log("\n\n=== MISSING ITEMS CHECK ===");
let missing = 0;
for (const [packFile, paths] of Object.entries(packMap)) {
    const currentPath = path.join(base, packFile);
    const backupPath = path.join(base, paths.backup);
    if (!fs.existsSync(backupPath)) continue;
    
    const currentCode = fs.readFileSync(currentPath, "utf8");
    const backupCode = fs.readFileSync(backupPath, "utf8");
    const currentItems = extractMetadata(currentCode);
    const backupItems = extractMetadata(backupCode);
    
    const onlyInBackup = Object.keys(backupItems).filter(q => !currentItems[q]);
    const onlyInCurrent = Object.keys(currentItems).filter(q => !backupItems[q]);
    
    if (onlyInCurrent.length > 0) {
        console.log(`  ${packFile}: ${onlyInCurrent.length} items in current but NOT in backup`);
        missing += onlyInCurrent.length;
    }
    if (onlyInBackup.length > 0) {
        console.log(`  ${packFile}: ${onlyInBackup.length} items in backup but NOT in current`);
    }
}
if (missing === 0) console.log("  [PASS] No items missing from either side.");
