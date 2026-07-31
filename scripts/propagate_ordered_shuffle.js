// Session 85 — Ordered-Pattern Propagation Script
// Fixes CBQ5-C3-Q2 Unicode mismatch, then deranges RightItems in all 3 case_pack files

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026');
const DRY_RUN = process.argv.includes('--dry-run');

const CASE_PACK_FILES = [
    'case_pack_1_corrected.js',
    'case_pack_2_corrected.js',
    'case_pack_3_corrected.js'
];

const MAX_SHUFFLE_ATTEMPTS = 1000;

// =========================================================================
// String-Aware Brace Matcher
// =========================================================================
function extractMatchItems(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    const items = [];
    const regex = /"Type"\s*:\s*"match"/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const typeStart = match.index;
        let braceStart = typeStart;
        while (braceStart > 0 && text[braceStart] !== '{') braceStart--;
        if (text[braceStart] !== '{') continue;
        
        let depth = 0, inString = false, stringChar = '', escapeNext = false, objEnd = -1;
        for (let i = braceStart; i < text.length; i++) {
            const ch = text[i];
            if (escapeNext) { escapeNext = false; continue; }
            if (ch === '\\') { escapeNext = true; continue; }
            if (inString) { if (ch === stringChar) inString = false; continue; }
            if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
            if (ch === '{') depth++; else if (ch === '}') { depth--; if (depth === 0) { objEnd = i + 1; break; } }
        }
        if (objEnd === -1) continue;
        
        try {
            const objText = text.substring(braceStart, objEnd);
            const item = JSON.parse(objText);
            if (item.Type !== 'match') continue;
            if (!item.ItemID || !item.Correct || !item.LeftItems || !item.RightItems) continue;
            items.push({ item, braceStart, objEnd, filePath });
        } catch (e) {}
    }
    return items;
}

// =========================================================================
// Fisher-Yates Shuffle
// =========================================================================
function fisherYatesShuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// =========================================================================
// Derangement Shuffle
// =========================================================================
function shuffleWithDerangement(item) {
    const leftItems = item.LeftItems || [];
    const originalRightItems = item.RightItems || [];
    const correct = item.Correct || {};

    if (!leftItems.length || !originalRightItems.length) {
        return { error: 'Missing LeftItems or RightItems' };
    }

    const correctTexts = leftItems.map(left => {
        const v = correct[left];
        return v !== undefined ? v : null;
    });

    if (correctTexts.includes(null)) {
        return { error: 'Correct object missing key for one or more LeftItems' };
    }

    for (const ct of correctTexts) {
        if (!originalRightItems.includes(ct)) {
            return { error: `Correct value not found in RightItems: ${ct.substring(0,80)}...` };
        }
    }

    for (let attempt = 1; attempt <= MAX_SHUFFLE_ATTEMPTS; attempt++) {
        const shuffled = fisherYatesShuffle(originalRightItems);
        const newIndices = correctTexts.map(ct => shuffled.indexOf(ct));
        if (newIndices.includes(-1)) {
            return { error: 'Shuffle lost a correct answer (should not happen)' };
        }
        const deranged = newIndices.every((newIdx, i) => newIdx !== i);
        if (deranged) {
            return {
                rightItems: shuffled,
                newIndices,
                attempts: attempt,
                beforeIndices: leftItems.map((_, i) => i),
                derangementSatisfied: true,
                error: null
            };
        }
    }

    return {
        rightItems: null,
        newIndices: null,
        attempts: MAX_SHUFFLE_ATTEMPTS,
        derangementSatisfied: false,
        error: `Failed to find derangement after ${MAX_SHUFFLE_ATTEMPTS} attempts`
    };
}

// =========================================================================
// Find RightItems array within a brace-delimited object
// =========================================================================
function findRightItemsInFile(fileContent, braceStart, braceEnd) {
    const searchRegion = fileContent.substring(braceStart, braceEnd);
    let pos = searchRegion.indexOf('"RightItems"');
    if (pos === -1) return { start: -1, end: -1 };
    pos += '"RightItems"'.length;
    while (pos < searchRegion.length && searchRegion[pos] !== ':') pos++;
    if (pos >= searchRegion.length) return { start: -1, end: -1 };
    pos++;
    while (pos < searchRegion.length && /\s/.test(searchRegion[pos])) pos++;
    if (pos >= searchRegion.length || searchRegion[pos] !== '[') return { start: -1, end: -1 };
    
    let depth = 0, inString = false, stringChar = '', escapeNext = false;
    for (let i = pos; i < searchRegion.length; i++) {
        const ch = searchRegion[i];
        if (escapeNext) { escapeNext = false; continue; }
        if (ch === '\\') { escapeNext = true; continue; }
        if (inString) { if (ch === stringChar) inString = false; continue; }
        if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
        if (ch === '[') depth++;
        else if (ch === ']') { depth--; if (depth === 0) return { start: braceStart + pos, end: braceStart + i + 1 }; }
    }
    return { start: -1, end: -1 };
}

// =========================================================================
// Main
// =========================================================================
console.log('Session 85 — Ordered-Pattern Propagation (case_pack files)');
console.log('Mode: ' + (DRY_RUN ? 'DRY-RUN' : 'EXECUTE'));
console.log('');

// Step 1: Fix CBQ5-C3-Q2 Unicode mismatch
if (!DRY_RUN) {
    console.log('=== STEP 1: Fix CBQ5-C3-Q2 Unicode Mismatch ===');
    const cp3 = path.join(ROOT, 'case_pack_3_corrected.js');
    let text = fs.readFileSync(cp3, 'utf8');
    
    // Fix "x $13.20" → "× $13.20" in RightItems entries
    // Line 3127 and 3128 in the file
    const orig = text;
    text = text.replace(
        'yielding 25,000 additional units x $13.20 WACM',
        'yielding 25,000 additional units × $13.20 WACM'
    );
    text = text.replace(
        'represents 10,000 lost units x $13.20 WACM',
        'represents 10,000 lost units × $13.20 WACM'
    );
    
    if (text !== orig) {
        fs.writeFileSync(cp3, text, 'utf8');
        console.log('  Fixed: 2 RightItems entries in CBQ5-C3-Q2 (x → ×)');
    } else {
        console.log('  NOTE: Unicode fix not applied (strings not found — may already be fixed)');
    }
    console.log('');
}

// Step 2: Extract and shuffle
let allResults = [];
let hasErrors = false;

for (const file of CASE_PACK_FILES) {
    const fp = path.join(ROOT, file);
    if (!fs.existsSync(fp)) { console.error(`NOT FOUND: ${file}`); continue; }
    
    console.log(`=== Scanning ${file} ===`);
    const matchItems = extractMatchItems(fp);
    console.log(`  Found ${matchItems.length} match-type items`);
    
    let shuffled = 0;
    let failed = 0;
    let alreadyDeranged = 0;
    
    for (const { item, braceStart, objEnd } of matchItems) {
        const result = shuffleWithDerangement(item);
        
        if (result.error) {
            console.log(`  FAIL  ${item.ItemID}: ${result.error}`);
            failed++;
            hasErrors = true;
            continue;
        }
        
        if (result.derangementSatisfied) {
            // Check if already deranged (skip in that case)
            const leftItems = item.LeftItems;
            const correctTexts = leftItems.map(l => item.Correct[l]);
            const alreadyShuffled = correctTexts.every((ct, i) => item.RightItems.indexOf(ct) !== i);
            
            if (alreadyShuffled) {
                console.log(`  SKIP  ${item.ItemID} (already deranged)`);
                alreadyDeranged++;
            } else {
                shuffled++;
                console.log(`  OK    ${item.ItemID} [${result.attempts} attempts] indices: ${result.newIndices.join(',')}`);
            }
        }
        
        allResults.push({
            itemId: item.ItemID,
            filePath: fp,
            item,
            result,
            braceStart,
            objEnd
        });
    }
    
    console.log(`  Summary: ${shuffled} shuffled, ${alreadyDeranged} already deranged, ${failed} failed`);
    console.log('');
}

if (hasErrors && !DRY_RUN) {
    console.error('ERRORS DETECTED. Aborting write-back.');
    process.exit(1);
}

// Step 3: Write back
if (DRY_RUN) {
    console.log('DRY-RUN complete. No files written.');
    process.exit(0);
}

console.log('=== WRITE-BACK PHASE ===');

// Group by file path
const fileGroups = {};
for (const r of allResults) {
    if (!r.result || r.result.error) continue;
    if (!r.result.rightItems) continue;
    if (!r.result.derangementSatisfied) continue;
    
    // Skip items that are already deranged
    const item = r.item;
    const correctTexts = item.LeftItems.map(l => item.Correct[l]);
    const alreadyDeranged = correctTexts.every((ct, i) => item.RightItems.indexOf(ct) !== i);
    if (alreadyDeranged) continue;
    
    const fp = r.filePath;
    if (!fileGroups[fp]) fileGroups[fp] = [];
    fileGroups[fp].push(r);
}

let totalWritten = 0;

for (const [filePath, items] of Object.entries(fileGroups)) {
    const basename = path.basename(filePath);
    console.log(`\nProcessing ${basename} — ${items.length} items to write...`);
    
    let fileContent = fs.readFileSync(filePath, 'utf8');
    const originalContent = fileContent;
    
    const replacements = [];
    for (const r of items) {
        if (r.braceStart === undefined || r.objEnd === undefined) {
            console.log(`  WARN  ${r.itemId} — missing stored brace positions`);
            continue;
        }
        
        const bounds = findRightItemsInFile(fileContent, r.braceStart, r.objEnd);
        if (bounds.start === -1) {
            console.log(`  WARN  ${r.itemId} — could not locate RightItems array`);
            continue;
        }
        
        const newRightItems = JSON.stringify(r.result.rightItems, null, 8);
        replacements.push({
            itemId: r.itemId,
            start: bounds.start,
            end: bounds.end,
            oldText: fileContent.substring(bounds.start, bounds.end),
            newText: newRightItems
        });
    }
    
    // Apply replacements from right to left
    replacements.sort((a, b) => b.start - a.start);
    for (const repl of replacements) {
        fileContent = fileContent.substring(0, repl.start) + repl.newText + fileContent.substring(repl.end);
    }
    
    // Verify file integrity
    let verifyOk = true;
    try {
        fs.writeFileSync(filePath, fileContent, 'utf8');
        const reExtracted = extractMatchItems(filePath);
        const extractedIds = new Set(reExtracted.map(e => e.item.ItemID));
        for (const r of items) {
            if (!extractedIds.has(r.itemId)) {
                console.error(`  VERIFY FAIL: ${r.itemId} not found in post-write extraction`);
                verifyOk = false;
            }
        }
        if (verifyOk) {
            console.log(`  Verify OK: ${reExtracted.length} match items extractable after write`);
        }
    } catch (e) {
        console.error(`  FATAL: ${basename} extraction failed: ${e.message}`);
        verifyOk = false;
    }
    
    if (!verifyOk) {
        fs.writeFileSync(filePath, originalContent, 'utf8');
        console.error(`  FILE RESTORED from backup. No changes.`);
        process.exit(1);
    }
    
    console.log(`  ${replacements.length} replacements applied.`);
    totalWritten += replacements.length;
}

console.log(`\nTotal items written: ${totalWritten}`);
console.log('=== PROPAGATION COMPLETE ===');
