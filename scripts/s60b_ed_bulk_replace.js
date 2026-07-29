// S60B — ED Bulk Replacement Script
// Replaces 14 archived ED items in pack_d_corrected.js with authored replacements
// Run: node scripts/s60b_ed_bulk_replace.js

const fs = require('fs');
const path = require('path');

const PACK_D_PATH = path.join(__dirname, '..', 'pack_d_corrected.js');
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const OUTPUT_DIR = path.join(__dirname, 'output');

// The two saved agent output files
const AGENT1_FILE = path.join(process.env.USERPROFILE, '.local', 'share', 'opencode', 'tool-output', 'tool_faa966e8e0010mf3Sc3RWaMR9f');
const AGENT2_FILE = path.join(process.env.USERPROFILE, '.local', 'share', 'opencode', 'tool-output', 'tool_faa94a79d001Zpu73qyRfCJlpS');

// The 14 archived QIDs to replace
const TARGET_QIDS = new Set([
    'P1-ED-041', 'P1-ED-047', 'P1-ED-048', 'P1-ED-052', 'P1-ED-053',
    'P1-ED-055', 'P1-ED-056', 'P1-ED-057', 'P1-ED-059', 'P1-ED-061',
    'P1-ED-062', 'P1-ED-063', 'P1-ED-065', 'P1-ED-068'
]);

function log(msg) { console.log(`[S60B] ${msg}`); }

// Step 1: Extract JSON blocks from saved agent output files
function extractJsonBlocks(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const blocks = {};
    
    // Find all ```json ... ``` OR ``` ... ``` blocks (agent2 uses no "json" tag)
    const jsonBlockRegex = /```(?:json)?\s*\n([\s\S]*?)```/g;
    let match;
    while ((match = jsonBlockRegex.exec(content)) !== null) {
        let jsonText = match[1].trim();
        // Ensure it starts with { and ends with }, or starts with [ and ends with ]
        if ((jsonText.startsWith('{') && jsonText.endsWith('},')) ||
            (jsonText.startsWith('[') && jsonText.endsWith('],'))) {
            // Try to extract QID
            const qidMatch = jsonText.match(/"QuestionID"\s*:\s*"(P1-ED-\d+)"/);
            if (qidMatch) {
                const qid = qidMatch[1];
                if (TARGET_QIDS.has(qid)) {
                    // Validate it's proper JSON (strip trailing comma for validation only)
                    let validJson = jsonText;
                    let parseOk = false;
                    try {
                        JSON.parse(validJson);
                        parseOk = true;
                    } catch (e) {
                        // Try without trailing comma
                        const trimmed = validJson.replace(/,\s*$/, '');
                        try {
                            JSON.parse(trimmed);
                            parseOk = true;
                        } catch (e2) {
                            log(`ERROR: ${qid} JSON parse failed: ${e2.message}. Skipping.`);
                        }
                    }
                    if (parseOk) {
                        blocks[qid] = jsonText; // Keep original WITH trailing comma
                        log(`Extracted ${qid} (${jsonText.length} chars) from ${path.basename(filePath)}`);
                    }
                }
            }
        }
    }
    return blocks;
}

// Step 2: Read pack_d and split into object strings
function splitPackObjects(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find the array start - pack_d uses MCQ_BANK_D
    const arrayMatch = content.match(/(const\s+\w+\s*=\s*\[)/);
    if (!arrayMatch) throw new Error('Could not find MCQ array declaration');
    const arrayStart = arrayMatch.index;
    
    const prefix = content.substring(0, arrayStart + arrayMatch[0].length);
    
    // Extract the array content
    let arrayContent = content.substring(prefix.length);
    // Find the closing ]; of the array
    const lastBracket = arrayContent.lastIndexOf('];');
    if (lastBracket === -1) throw new Error('Could not find array closing');
    const suffix = arrayContent.substring(lastBracket);
    arrayContent = arrayContent.substring(0, lastBracket);
    
    // Split into individual object strings
    // Each object in the array is separated by 8 spaces + "    },\n    {"
    // We need to find boundaries
    const objects = [];
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let objStart = -1;
    let objEnd = -1;
    
    for (let i = 0; i < arrayContent.length; i++) {
        const ch = arrayContent[i];
        
        if (inString) {
            if (ch === '\\') {
                i++; // Skip escaped char
            } else if (ch === stringChar) {
                inString = false;
            }
            continue;
        }
        
        if (ch === '"' || ch === "'") {
            inString = true;
            stringChar = ch;
            continue;
        }
        
        if (ch === '{') {
            if (depth === 0) objStart = i;
            depth++;
        } else if (ch === '}') {
            depth--;
            if (depth === 0) {
                objEnd = i;
                // Include the comma and whitespace after }
                let endPos = i + 1;
                while (endPos < arrayContent.length && /[\s,]/.test(arrayContent[endPos])) {
                    endPos++;
                }
                const objText = arrayContent.substring(objStart, endPos).trim();
                objects.push({ text: objText, start: objStart, end: endPos });
                objStart = -1;
                objEnd = -1;
            }
        }
    }
    
    return { prefix, suffix: '\n' + suffix, objects, originalContent: content };
}

// Step 3: Extract QID from an object text
function extractQid(objText) {
    const match = objText.match(/"QuestionID"\s*:\s*"(P1-[A-Z]+-\d+)"/);
    return match ? match[1] : null;
}

// Main execution
log('=== S60B ED Bulk Replacement Started ===');

// Extract new JSON blocks
log('Extracting new JSON blocks from agent outputs...');
const newBlocks = {};
const blocks1 = extractJsonBlocks(AGENT1_FILE);
const blocks2 = extractJsonBlocks(AGENT2_FILE);
Object.assign(newBlocks, blocks1, blocks2);

log(`Extracted ${Object.keys(newBlocks).length} replacement blocks.`);
for (const qid of TARGET_QIDS) {
    if (!newBlocks[qid]) {
        log(`ERROR: Missing replacement for ${qid}!`);
    }
}

// Check we have all 14
const missingQids = [...TARGET_QIDS].filter(q => !newBlocks[q]);
if (missingQids.length > 0) {
    log(`\nFATAL: Missing ${missingQids.length} replacements: ${missingQids.join(', ')}`);
    log('Attempting alternative extraction without JSON wrapping...');
    
    // Try alternative: extract raw JSON objects without ```json markers
    // The second agent may have formatted differently
    for (const file of [AGENT1_FILE, AGENT2_FILE]) {
        const content = fs.readFileSync(file, 'utf8');
        for (const qid of missingQids) {
            const regex = new RegExp(`"QuestionID"\\s*:\\s*"${qid}"`, 'g');
            let m;
            while ((m = regex.exec(content)) !== null) {
                // Found a QID reference, try to extract surrounding JSON
                log(`Found reference to ${qid} in ${path.basename(file)} at position ${m.index}`);
            }
        }
    }
    
    if (missingQids.length > 0) {
        log(`\nProceeding with ${Object.keys(newBlocks).length} available blocks. ${missingQids.length} will remain unchanged.`);
    }
}

// Read and split pack_d
log(`\nReading ${PACK_D_PATH}...`);
const { prefix, suffix, objects } = splitPackObjects(PACK_D_PATH);
log(`Split into ${objects.length} objects.`);

// Count before
let beforeArchived = 0;
let beforeCertified = 0;
let beforeOther = 0;
for (const obj of objects) {
    const qid = extractQid(obj.text);
    if (qid && TARGET_QIDS.has(qid)) {
        const stateMatch = obj.text.match(/"question_state"\s*:\s*"([^"]+)"/);
        if (stateMatch) {
            if (stateMatch[1] === 'Archived') beforeArchived++;
            else if (stateMatch[1] === 'Certified') beforeCertified++;
            else beforeOther++;
        }
    }
}
log(`Before: ${beforeArchived} Archived, ${beforeCertified} Certified, ${beforeOther} other among target QIDs.`);

// Build QID → new text map from extracted blocks
const qidToNewText = {};
for (const [qid, jsonText] of Object.entries(newBlocks)) {
    // Ensure the object text has the right indentation (8 spaces)
    // The extracted JSON from agent outputs already has 8-space indent
    qidToNewText[qid] = jsonText;
}

// Apply replacements
let replacedCount = 0;
let skippedCount = 0;
const replacementLedger = [];

for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    const qid = extractQid(obj.text);
    
    if (qid && TARGET_QIDS.has(qid) && qidToNewText[qid]) {
        const oldQid = qid;
        const newText = qidToNewText[qid];
        
        // Validate new text
        const newQid = extractQid(newText);
        if (newQid !== oldQid) {
            log(`ERROR: QID mismatch! Old=${oldQid}, New block has QID=${newQid}. Skipping.`);
            skippedCount++;
            continue;
        }
        
        // Check question_state is "Certified"
        const stateMatch = newText.match(/"question_state"\s*:\s*"([^"]+)"/);
        if (!stateMatch || stateMatch[1] !== 'Certified') {
            log(`ERROR: ${oldQid} new block question_state is "${stateMatch ? stateMatch[1] : 'missing'}", expected "Certified". Skipping.`);
            skippedCount++;
            continue;
        }
        
        // Check ExplanationWrong[CorrectChoice] is empty
        const ccMatch = newText.match(/"CorrectChoice"\s*:\s*"([A-D])"/);
        if (ccMatch) {
            const cc = ccMatch[1];
            const ewRegex = new RegExp(`"ExplanationWrong${cc}"\\s*:\\s*"([^"]*)"`);
            const ewMatch = newText.match(ewRegex);
            if (ewMatch && ewMatch[1] !== '') {
                log(`ERROR: ${oldQid} CC=${cc} but ExplanationWrong${cc} is non-empty: "${ewMatch[1].substring(0, 50)}...". Skipping.`);
                skippedCount++;
                continue;
            }
        }
        
        // Replace the object
        objects[i].text = newText;
        replacedCount++;
        replacementLedger.push({ qid: oldQid, status: 'REPLACED' });
        log(`Replaced ${oldQid} (${newText.length} chars)`);
    }
}

log(`\nReplaced: ${replacedCount}, Skipped: ${skippedCount}`);

if (replacedCount === 0) {
    log('FATAL: No replacements were applied. Aborting write.');
    process.exit(1);
}

// Reconstruct the file
// Each object already ends with }, including trailing comma/whitespace
const reconstructedArray = objects.map(o => o.text).join('\n');
const newContent = prefix + reconstructedArray + suffix;
const newObjectCount = objects.length;

log(`\nReconstructed: ${newObjectCount} objects.`);

// Verify parse
log('Verifying parse...');
try {
    // Extract just the array portion for parsing
    const arrayMatch = newContent.match(/(?:const\s+\w+\s*=\s*)(\[[\s\S]*\]);/);
    if (!arrayMatch) throw new Error('Could not find correctQuestions array in reconstructed content');
    
    const arrayStr = arrayMatch[1];
    const parsed = JSON.parse(arrayStr);
    log(`Parse OK: ${parsed.length} items.`);
    
    // Verify QID uniqueness
    const qids = parsed.map(q => q.QuestionID);
    const uniqueQids = new Set(qids);
    if (uniqueQids.size !== qids.length) {
        log(`ERROR: Duplicate QIDs found! ${qids.length} total, ${uniqueQids.size} unique.`);
        const dupes = qids.filter((q, i) => qids.indexOf(q) !== i);
        log(`Duplicates: ${[...new Set(dupes)].join(', ')}`);
        process.exit(1);
    }
    log(`QID uniqueness: OK (${uniqueQids.size} unique)`);
    
    // Count states
    let certifiedCount = 0;
    let archivedCount = 0;
    let otherCount = 0;
    for (const q of parsed) {
        if (q.question_state === 'Certified') certifiedCount++;
        else if (q.question_state === 'Archived') archivedCount++;
        else otherCount++;
    }
    log(`States: ${certifiedCount} Certified, ${archivedCount} Archived, ${otherCount} other`);
    
    // Check target QIDs
    let remainingArchived = 0;
    for (const qid of TARGET_QIDS) {
        const item = parsed.find(q => q.QuestionID === qid);
        if (item && item.question_state === 'Archived') remainingArchived++;
    }
    log(`Target QIDs still Archived after replacement: ${remainingArchived}`);
    
} catch (e) {
    log(`FATAL: Parse verification failed: ${e.message}`);
    log('Aborting write. File has NOT been modified.');
    process.exit(1);
}

// Write back
log(`\nWriting ${PACK_D_PATH}...`);
fs.writeFileSync(PACK_D_PATH, newContent, 'utf8');
log('Write complete.');

// Write replacement ledger
const ledgerPath = path.join(OUTPUT_DIR, 'SESSION060B_ED_REPLACEMENT_LEDGER.json');
fs.writeFileSync(ledgerPath, JSON.stringify({
    session: 'S60B',
    date: new Date().toISOString(),
    pack: 'pack_d_corrected.js',
    targets: [...TARGET_QIDS],
    replaced: replacedCount,
    skipped: skippedCount,
    beforeArchived: beforeArchived,
    objectsTotal: newObjectCount,
    ledger: replacementLedger
}, null, 2), 'utf8');
log(`Ledger written to ${ledgerPath}`);

log('\n=== S60B ED Bulk Replacement Complete ===');
log(`Summary: ${replacedCount}/${TARGET_QIDS.size} items replaced. ${skippedCount} skipped.`);
