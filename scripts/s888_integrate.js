/**
 * S888 Agent W — Master Integration
 * Apply 20 S886 upgraded items to their respective pack files.
 * 
 * Packs affected: pack_a (16 items), pack_b (1 item), pack_d (1 item), pack_e (2 items)
 * Dual-block: Packs A, D (metadata block at QID-1)
 * Single-object: Packs B, E (all fields in same object)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname + '/..';

// === Load upgrade data ===
let analyzeUpgrades;
let upgradedItems;

try {
    analyzeUpgrades = require('./output/s886_analyze_upgrades.js');
} catch (e) {
    // Load manually from the S886_ANALYZE_UPGRADES variable
    const src = fs.readFileSync('./output/s886_analyze_upgrades.js', 'utf8');
    // Extract JSON array content
    const match = src.match(/const S886_ANALYZE_UPGRADES = (\[[\s\S]*\]);/);
    if (!match) throw new Error('Cannot parse s886_analyze_upgrades.js');
    analyzeUpgrades = eval(match[1]);
}

try {
    upgradedItems = require('./s886_upgraded_items.js');
} catch (e) {
    const src = fs.readFileSync('./s886_upgraded_items.js', 'utf8');
    const match = src.match(/module\.exports = (\[[\s\S]*\]);/);
    if (!match) throw new Error('Cannot parse s886_upgraded_items.js');
    upgradedItems = eval(match[1]);
}

const allUpgrades = [...analyzeUpgrades, ...upgradedItems];

console.log(`Loaded ${analyzeUpgrades.length} Section C + ${upgradedItems.length} Section D = ${allUpgrades.length} total upgrades`);

// === Pack file definitions ===
const PACK_CONFIG = {
    pack_a: { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A', decl: 'var MCQ_BANK_A = ', expectedQID: 500, dualBlock: true },
    pack_b: { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B', decl: 'const MCQ_BANK_B = ', expectedQID: 500, dualBlock: false },
    pack_d: { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D', decl: 'const MCQ_BANK_D = ', expectedQID: 500, dualBlock: true },
    pack_e: { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E', decl: 'const MCQ_BANK_E = ', expectedQID: 540, dualBlock: false },
};

// === QID to pack routing ===
function getPackForQID(qid) {
    if (qid.startsWith('P1B-')) return 'pack_b';
    if (qid.startsWith('P1E-')) return 'pack_e';
    if (/^P1-[A-F]D-\d{3}$/.test(qid)) return 'pack_d';
    if (/^P1-[A-F]-\d{3}$/.test(qid)) return 'pack_a';
    return null;
}

// === Parse a pack file using Function constructor ===
function parsePack(packName) {
    const cfg = PACK_CONFIG[packName];
    const filePath = path.join(ROOT, cfg.file);
    const src = fs.readFileSync(filePath, 'utf8');
    
    // Extract the array - handle both var and const declarations
    let arraySrc;
    if (src.startsWith('var ' + cfg.varName)) {
        arraySrc = src.substring(src.indexOf('['));
    } else if (src.startsWith('const ' + cfg.varName)) {
        arraySrc = src.substring(src.indexOf('['));
    } else {
        // Try to find array start
        const idx = src.indexOf('[');
        if (idx === -1) throw new Error(`Cannot find array start in ${cfg.file}`);
        arraySrc = src.substring(idx);
    }
    
    // Trim trailing semicolon if present
    arraySrc = arraySrc.replace(/;$/, '').trim();
    
    try {
        return new Function('return ' + arraySrc)();
    } catch (e) {
        console.error(`Failed to parse ${cfg.file}: ${e.message}`);
        throw e;
    }
}

// === Serialize pack back to file ===
function writePack(packName, array) {
    const cfg = PACK_CONFIG[packName];
    const filePath = path.join(ROOT, cfg.file);
    const json = JSON.stringify(array, null, 2);
    const content = cfg.decl + json + ';';
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Wrote ${cfg.file}: ${array.length} objects, ${content.length} bytes`);
}

// === Classify an object ===
function isContentBlock(obj) {
    return obj && typeof obj.Stem === 'string' && obj.Stem.length > 0;
}

function isMetadataBlock(obj) {
    return obj && obj.question_state && !isContentBlock(obj);
}

// === Decrement QID (e.g., P1-D-007 → P1-D-006) ===
function decrementQID(qid) {
    const match = qid.match(/^(P1(?:[A-F]D?)?-)?([A-F])-(\d{3})$/);
    if (!match) return null;
    const prefix = match[1] || '';
    const section = match[2];
    const num = parseInt(match[3], 10);
    if (num <= 1) return null;
    return `${prefix}${section}-${String(num - 1).padStart(3, '0')}`;
}

// === Find content block by QID ===
function findContentBlock(array, qid) {
    return array.find(obj => obj.QuestionID === qid && isContentBlock(obj));
}

// === Find metadata block for a content QID ===
function findMetadataBlock(array, contentQID) {
    // Try QID-1 first (DL-016 offset)
    const metaQID = decrementQID(contentQID);
    if (metaQID) {
        const candidate = array.find(obj => obj.QuestionID === metaQID && isMetadataBlock(obj));
        if (candidate) return candidate;
    }
    
    // Fallback: find content block index, look at adjacent objects
    const contentIdx = array.findIndex(obj => obj.QuestionID === contentQID && isContentBlock(obj));
    if (contentIdx >= 0) {
        // Check previous object
        if (contentIdx > 0 && isMetadataBlock(array[contentIdx - 1])) {
            return array[contentIdx - 1];
        }
        // Check next object
        if (contentIdx < array.length - 1 && isMetadataBlock(array[contentIdx + 1])) {
            return array[contentIdx + 1];
        }
    }
    
    return null;
}

// === Build the upgrade map: packName → [{qid, item}] ===
const upgradeMap = {};
for (const item of allUpgrades) {
    const qid = item.QuestionID;
    const pack = getPackForQID(qid);
    if (!pack) {
        console.error(`ERROR: Cannot determine pack for QID ${qid}`);
        continue;
    }
    if (!upgradeMap[pack]) upgradeMap[pack] = [];
    upgradeMap[pack].push({ qid, item });
}

console.log('\nUpgrade distribution:');
for (const [pack, items] of Object.entries(upgradeMap)) {
    console.log(`  ${pack}: ${items.length} items`);
}

// === MAIN INTEGRATION ===
const results = {
    upgraded: [],
    notFound: [],
    errors: [],
};

for (const [packName, upgrades] of Object.entries(upgradeMap)) {
    const cfg = PACK_CONFIG[packName];
    console.log(`\n=== Processing ${packName} (${cfg.file}) — ${upgrades.length} items ===`);
    
    let array = parsePack(packName);
    const initialCount = array.length;
    console.log(`  Parsed: ${initialCount} objects`);
    
    let packUpgraded = 0;
    let packNotFound = 0;
    
    for (const { qid, item } of upgrades) {
        console.log(`\n  Processing ${qid}...`);
        
        // Find content block
        const contentBlock = findContentBlock(array, qid);
        if (!contentBlock) {
            console.error(`    ERROR: Content block not found for ${qid}`);
            results.notFound.push(qid);
            packNotFound++;
            continue;
        }
        
        // === Update content block ===
        contentBlock.Stem = item.Stem;
        contentBlock.Choices = item.Choices;
        contentBlock.CorrectChoice = item.CorrectChoice;
        contentBlock.ExplanationCorrect = item.ExplanationCorrect;
        contentBlock.CognitiveLevel = item.CognitiveLevel;
        contentBlock.Difficulty = item.Difficulty;
        contentBlock.DifficultyScore = item.DifficultyScore;
        contentBlock.upgrade_note = item.upgrade_note;
        
        console.log(`    Content block found at index ${array.indexOf(contentBlock)}`);
        console.log(`    CognitiveLevel: → ${item.CognitiveLevel}, Difficulty: → ${item.Difficulty}`);
        
        // === Handle ExplanationWrong and ChoiceA-D ===
        if (cfg.dualBlock) {
            const metaBlock = findMetadataBlock(array, qid);
            if (metaBlock) {
                console.log(`    Metadata block found: ${metaBlock.QuestionID} (index ${array.indexOf(metaBlock)})`);
                
                // Update ChoiceA-D (flat) from Choices (nested)
                if (item.Choices) {
                    metaBlock.ChoiceA = item.Choices.A || metaBlock.ChoiceA;
                    metaBlock.ChoiceB = item.Choices.B || metaBlock.ChoiceB;
                    metaBlock.ChoiceC = item.Choices.C || metaBlock.ChoiceC;
                    metaBlock.ChoiceD = item.Choices.D || metaBlock.ChoiceD;
                }
                
                // Update ExplanationWrongA-D in metadata block
                const cc = item.CorrectChoice;
                ['A', 'B', 'C', 'D'].forEach(letter => {
                    const field = 'ExplanationWrong' + letter;
                    if (letter === cc) {
                        metaBlock[field] = '';
                    } else {
                        metaBlock[field] = item[field] || '';
                    }
                });
                
                // Also update metadata block's CognitiveLevel/Difficulty
                metaBlock.CognitiveLevel = item.CognitiveLevel;
                metaBlock.Difficulty = item.Difficulty;
                metaBlock.DifficultyScore = item.DifficultyScore;
                metaBlock.upgrade_note = item.upgrade_note;
                
                // Check DL-008
                const ccField = 'ExplanationWrong' + cc;
                if (metaBlock[ccField] && metaBlock[ccField] !== '') {
                    console.log(`    WARNING: Metadata block EW[${cc}] was non-empty, cleared to ""`);
                }
            } else {
                console.log(`    No separate metadata block found — clearing EW fields in content block`);
                // No separate metadata block — update EW in content block
                const cc = item.CorrectChoice;
                ['A', 'B', 'C', 'D'].forEach(letter => {
                    const field = 'ExplanationWrong' + letter;
                    if (letter === cc) {
                        contentBlock[field] = '';
                    } else {
                        contentBlock[field] = item[field] || '';
                    }
                });
            }
        } else {
            // Single-object pack: replace EW directly in content block
            const cc = item.CorrectChoice;
            ['A', 'B', 'C', 'D'].forEach(letter => {
                const field = 'ExplanationWrong' + letter;
                if (letter === cc) {
                    contentBlock[field] = '';
                } else {
                    contentBlock[field] = item[field] || '';
                }
            });
            console.log(`    Single-object: EW fields updated directly`);
        }
        
        results.upgraded.push(qid);
        packUpgraded++;
    }
    
    // Write pack
    writePack(packName, array);
    
    // Verify
    console.log(`\n  Verification for ${packName}:`);
    const verifyArray = parsePack(packName);
    console.log(`    Object count: ${verifyArray.length} (expected ${cfg.expectedQID} unique QIDs)`);
    
    // Count unique QIDs (QuestionID field can exist in both metadata and content blocks)
    const allQIDs = new Set();
    verifyArray.forEach(obj => {
        if (obj.QuestionID) allQIDs.add(obj.QuestionID);
    });
    console.log(`    Unique QuestionIDs: ${allQIDs.size}`);
    
    // Verify upgraded items have new CognitiveLevel
    for (const { qid, item } of upgrades) {
        if (packUpgraded > 0 && results.upgraded.includes(qid)) {
            const cb = findContentBlock(verifyArray, qid);
            if (cb) {
                console.log(`    ${qid}: CognitiveLevel=${cb.CognitiveLevel}, Stem starts with: "${cb.Stem.substring(0, 60)}..."`);
            }
        }
    }
}

// === FINAL REPORT ===
console.log('\n' + '='.repeat(70));
console.log('S888 INTEGRATION REPORT');
console.log('='.repeat(70));
console.log(`\nUpgraded: ${results.upgraded.length} items`);
console.log(`  ${results.upgraded.join(', ')}`);
console.log(`\nNot found: ${results.notFound.length} items`);
if (results.notFound.length > 0) {
    console.log(`  ${results.notFound.join(', ')}`);
}
console.log(`\nErrors: ${results.errors.length}`);
if (results.errors.length > 0) {
    results.errors.forEach(e => console.log(`  ${e}`));
}

// === POST-INTEGRATION VERIFICATION ===
console.log('\n' + '='.repeat(70));
console.log('POST-INTEGRATION VERIFICATION');
console.log('='.repeat(70));

for (const packName of ['pack_a', 'pack_b', 'pack_d', 'pack_e']) {
    const cfg = PACK_CONFIG[packName];
    const array = parsePack(packName);
    const allQIDs = new Set();
    array.forEach(obj => {
        if (obj.QuestionID) allQIDs.add(obj.QuestionID);
    });
    const certifiedCount = array.filter(obj => obj.question_state === 'Certified').length;
    console.log(`\n${packName} (${cfg.file}):`);
    console.log(`  Objects: ${array.length}`);
    console.log(`  Unique QuestionIDs: ${allQIDs.size}`);
    console.log(`  Certified items: ${certifiedCount}`);
}

console.log('\nDone. Run "node scripts/test_governance_guard.js" to verify.');
