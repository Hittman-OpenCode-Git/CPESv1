// Session 718 Certification Protection Audit
// Verifies that CognitiveLevel was the ONLY field added/modified

const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const PACKS = ['a', 'b', 'c', 'd', 'e'];

// Results accumulator
const results = {
    auditTitle: "Session 718 CognitiveLevel Metadata-Only Write Audit",
    timestamp: new Date().toISOString(),
    packs: {},
    summary: {
        totalItems: 0,
        totalItemsVerified: 0,
        itemsWithContentChanges: 0,
        itemsWithOnlyCognitiveLevelAdded: 0,
        itemsWithPreExistingCognitiveLevel: 0,
        anomalies: [],
        confidenceScore: 0
    }
};

function parsePack(packLetter) {
    const filePath = path.join(BASE, `pack_${packLetter}_corrected.js`);
    const backupPath = path.join(BASE, `pack_${packLetter}_corrected.js.bak-20260726S718`);
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    
    // Parse via Function constructor
    const varName = 'MCQ_BANK_' + packLetter.toUpperCase();
    let currentItems, backupItems;
    try {
        currentItems = new Function(fileContent + '; return ' + varName + ';')();
    } catch(e) {
        results.packs[packLetter] = { error: `Current file parse failed: ${e.message}` };
        return;
    }
    try {
        backupItems = new Function(backupContent + '; return ' + varName + ';')();
    } catch(e) {
        results.packs[packLetter] = { error: `Backup file parse failed: ${e.message}` };
        return;
    }
    
    return { currentItems, backupItems };
}

// Field keys that ARE allowed to differ (CognitiveLevel is new)
const ALLOWED_NEW_FIELDS = ['CognitiveLevel'];

// Deep equality check (for values, ignoring allowed new fields)
function deepEqual(a, b, path) {
    if (typeof a !== typeof b) return { match: false, diff: `Type mismatch at ${path}: ${typeof a} vs ${typeof b}` };
    
    if (a === null || b === null) {
        if (a !== b) return { match: false, diff: `Null mismatch at ${path}: ${a} vs ${b}` };
        return { match: true };
    }
    
    if (typeof a !== 'object') {
        if (a !== b) return { match: false, diff: `Value mismatch at ${path}: "${a}" vs "${b}"` };
        return { match: true };
    }
    
    if (Array.isArray(a) !== Array.isArray(b)) {
        return { match: false, diff: `Array mismatch at ${path}` };
    }
    
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return { match: false, diff: `Array length mismatch at ${path}: ${a.length} vs ${b.length}` };
        }
        for (let i = 0; i < a.length; i++) {
            const r = deepEqual(a[i], b[i], `${path}[${i}]`);
            if (!r.match) return r;
        }
        return { match: true };
    }
    
    // Object comparison
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of allKeys) {
        const inA = key in a;
        const inB = key in b;
        
        if (!inA && inB) {
            // Key only in current (new)
            if (!ALLOWED_NEW_FIELDS.includes(key)) {
                return { match: false, diff: `UNEXPECTED new field "${key}" at ${path}` };
            }
            continue;
        }
        if (inA && !inB) {
            return { match: false, diff: `Field "${key}" removed (was in backup, missing in current) at ${path}` };
        }
        
        const r = deepEqual(a[key], b[key], `${path}.${key}`);
        if (!r.match) return r;
    }
    return { match: true };
}

function getNewFieldKeys(current, backup) {
    const cKeys = new Set(Object.keys(current));
    const bKeys = new Set(Object.keys(backup));
    const newKeys = [];
    for (const k of cKeys) {
        if (!bKeys.has(k)) newKeys.push(k);
    }
    return newKeys;
}

function getChangedFields(current, backup) {
    const changed = [];
    const allKeys = new Set([...Object.keys(current), ...Object.keys(backup)]);
    for (const key of allKeys) {
        if (ALLOWED_NEW_FIELDS.includes(key) && !(key in backup)) continue;
        if (key === 'CognitiveLevel' && !(key in backup)) continue;
        
        const inA = key in current;
        const inB = key in backup;
        
        if (inA && inB) {
            if (JSON.stringify(current[key]) !== JSON.stringify(backup[key])) {
                changed.push(key);
            }
        } else if (!inA && inB) {
            changed.push(`REMOVED:${key}`);
        } else if (inA && !inB) {
            changed.push(`ADDED:${key}`);
        }
    }
    return changed;
}

function auditPack(packLetter) {
    console.log(`\n=== Auditing Pack ${packLetter.toUpperCase()} ===`);
    
    const parsed = parsePack(packLetter);
    if (!parsed) return;
    
    const { currentItems, backupItems } = parsed;
    
    const packResult = {
        itemCount: currentItems.length,
        backupItemCount: backupItems.length,
        itemsWithContentChanges: [],
        itemsWithOnlyCognitiveLevel: [],
        itemsWithPreExistingCognitiveLevel: 0,
        itemsWithNoChanges: [],
        anomalies: [],
        fieldAnalysis: {},
        newFieldsFound: new Set()
    };
    
    // Build map by QuestionID for alignment
    const currentMap = {};
    const backupMap = {};
    
    for (const item of currentItems) {
        const qid = item.QuestionID;
        if (!qid) {
            packResult.anomalies.push({ type: 'MISSING_QUESTIONID', item: JSON.stringify(item).substring(0, 100) });
            continue;
        }
        if (currentMap[qid]) {
            packResult.anomalies.push({ type: 'DUPLICATE_QID', qid });
        }
        currentMap[qid] = item;
    }
    
    for (const item of backupItems) {
        const qid = item.QuestionID;
        if (!qid) continue;
        backupMap[qid] = item;
    }
    
    // Compare each item
    for (const qid of Object.keys(currentMap)) {
        const cur = currentMap[qid];
        const bak = backupMap[qid];
        
        if (!bak) {
            packResult.anomalies.push({ type: 'NEW_ITEM_NOT_IN_BACKUP', qid });
            continue;
        }
        
        // Check what fields changed
        const changed = getChangedFields(cur, bak);
        const newKeys = getNewFieldKeys(cur, bak);
        
        // Filter out CognitiveLevel from "changes"
        const contentChanges = changed.filter(c => c !== 'CognitiveLevel' && !c.startsWith('ADDED:CognitiveLevel'));
        
        if (contentChanges.length > 0) {
            packResult.itemsWithContentChanges.push({
                qid,
                changedFields: contentChanges
            });
        } else if (newKeys.length === 1 && newKeys[0] === 'CognitiveLevel') {
            packResult.itemsWithOnlyCognitiveLevel.push(qid);
        } else if (changed.length === 1 && changed[0] === 'CognitiveLevel') {
            // CognitiveLevel existed but was changed
            packResult.itemsWithPreExistingCognitiveLevel++;
            packResult.itemsWithOnlyCognitiveLevel.push(qid);
        } else if (changed.length === 0) {
            packResult.itemsWithNoChanges.push(qid);
        } else {
            packResult.anomalies.push({
                type: 'UNEXPECTED_CHANGE_PATTERN',
                qid,
                changed,
                newKeys
            });
        }
        
        // Track all new fields found
        for (const k of newKeys) {
            packResult.newFieldsFound.add(k);
        }
    }
    
    // Check for items in backup not in current
    for (const qid of Object.keys(backupMap)) {
        if (!currentMap[qid]) {
            packResult.anomalies.push({ type: 'ITEM_REMOVED', qid });
        }
    }
    
    results.packs[packLetter] = {
        itemCount: packResult.itemCount,
        backupItemCount: packResult.backupItemCount,
        itemsWithContentChanges: packResult.itemsWithContentChanges,
        itemsWithOnlyCognitiveLevelAdded: packResult.itemsWithOnlyCognitiveLevel.length,
        itemsWithPreExistingCognitiveLevel: packResult.itemsWithPreExistingCognitiveLevel,
        itemsWithNoChanges: packResult.itemsWithNoChanges.length,
        anomalies: packResult.anomalies,
        newFieldsFound: [...packResult.newFieldsFound],
        qidCountMismatch: packResult.itemCount !== packResult.backupItemCount
    };
    
    console.log(`  Items: ${packResult.itemCount}`);
    console.log(`  Items with content changes: ${packResult.itemsWithContentChanges.length}`);
    console.log(`  Items with only CognitiveLevel added: ${packResult.itemsWithOnlyCognitiveLevel.length}`);
    console.log(`  Pre-existing CognitiveLevel (changed value): ${packResult.itemsWithPreExistingCognitiveLevel}`);
    console.log(`  Items with no changes: ${packResult.itemsWithNoChanges.length}`);
    console.log(`  Anomalies: ${packResult.anomalies.length}`);
    
    if (packResult.itemsWithContentChanges.length > 0) {
        console.log(`  *** CONTENT CHANGE DETAILS ***`);
        for (const cc of packResult.itemsWithContentChanges.slice(0, 10)) {
            console.log(`    ${cc.qid}: ${cc.changedFields.join(', ')}`);
        }
        if (packResult.itemsWithContentChanges.length > 10) {
            console.log(`    ... and ${packResult.itemsWithContentChanges.length - 10} more`);
        }
    }
    
    for (const a of packResult.anomalies.slice(0, 5)) {
        console.log(`  ANOMALY: ${JSON.stringify(a)}`);
    }
}

// Run audit for all packs
for (const p of PACKS) {
    auditPack(p);
}

// Compute summary
let totalContentChanges = 0;
let totalOnlyCognitiveLevel = 0;
let totalPreExisting = 0;
let totalAnomalies = 0;
let totalItems = 0;

for (const p of PACKS) {
    const pr = results.packs[p];
    if (!pr) continue;
    totalItems += pr.itemCount;
    totalContentChanges += pr.itemsWithContentChanges.length;
    totalOnlyCognitiveLevel += pr.itemsWithOnlyCognitiveLevelAdded;
    totalPreExisting += pr.itemsWithPreExistingCognitiveLevel || 0;
    totalAnomalies += pr.anomalies.length;
}

results.summary.totalItems = totalItems;
results.summary.totalItemsVerified = totalItems;
results.summary.itemsWithContentChanges = totalContentChanges;
results.summary.itemsWithOnlyCognitiveLevelAdded = totalOnlyCognitiveLevel;
results.summary.itemsWithPreExistingCognitiveLevel = totalPreExisting;
results.summary.anomalies = totalAnomalies;

// Confidence scoring
let confidence = 100;
if (totalContentChanges > 0) confidence -= totalContentChanges * 2;
if (totalAnomalies > 0) confidence -= totalAnomalies * 1;
if (confidence < 0) confidence = 0;
results.summary.confidenceScore = Math.max(0, Math.min(100, Math.round(confidence)));

// Write report
const reportPath = path.join(BASE, 'reports', 'session_status', 'SESSION718_CERTIFICATION_PROTECTION_AUDIT.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

console.log(`\n========== FINAL SUMMARY ==========`);
console.log(`Total items verified: ${totalItems}`);
console.log(`Items with content changes: ${totalContentChanges}`);
console.log(`Items with only CognitiveLevel added: ${totalOnlyCognitiveLevel}`);
console.log(`Items with pre-existing CognitiveLevel: ${totalPreExisting}`);
console.log(`Total anomalies: ${totalAnomalies}`);
console.log(`Confidence: ${results.summary.confidenceScore}%`);
console.log(`\nReport written to: ${reportPath}`);
