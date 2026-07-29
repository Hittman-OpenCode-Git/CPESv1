// Session 62 Rewrite Application Script v3 - Fix Pack E dual-block matching
const fs = require('fs');
const path = require('path');

const batch1 = JSON.parse(fs.readFileSync('scripts/output/rewrites_batch.json', 'utf8'));
const batch2 = JSON.parse(fs.readFileSync('scripts/output/rewrite_batch_items_6_10.json', 'utf8'));
const batch3 = JSON.parse(fs.readFileSync('scripts/output/batch5_rewrites.json', 'utf8'));
const batch4 = JSON.parse(fs.readFileSync(path.join(process.env.TEMP, 'opencode/rewrites_batch_16_20.json'), 'utf8'));

const allRewrites = [...batch1, ...batch2, ...batch3, ...batch4];
const rewriteMap = {};
for (const rw of allRewrites) {
    rewriteMap[rw.qid] = rw;
}

// Only process Pack E (the other packs are done)
const packFile = 'pack_e_corrected.js';
console.log(`Processing ${packFile}...`);

let content = fs.readFileSync(packFile, 'utf8');
const arrayStart = content.indexOf('[');
const arrayEnd = content.lastIndexOf(']');
const arrayCode = content.substring(arrayStart, arrayEnd + 1);
let items = new Function('return ' + arrayCode)();

console.log(`Parsed ${items.length} items`);

// Pack E dual-block: find pairs where one has QuestionID and the other has Stem
const qidIndex = {};
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item && item.QuestionID) {
        qidIndex[item.QuestionID] = i;
    }
}

console.log(`Found ${Object.keys(qidIndex).length} QIDs`);

let applied = 0;
for (const [qid, idx] of Object.entries(qidIndex)) {
    const rewrite = rewriteMap[qid];
    if (!rewrite) continue;
    
    const metaBlock = items[idx];
    const nextItem = items[idx + 1];
    const prevItem = items[idx - 1];
    
    // Find the content block (has Stem) - could be next or prev
    let contentBlock = null;
    let contentIdx = -1;
    
    if (nextItem && nextItem.Stem !== undefined) {
        contentBlock = nextItem;
        contentIdx = idx + 1;
    } else if (prevItem && prevItem.Stem !== undefined && (!nextItem || nextItem.Stem === undefined)) {
        contentBlock = prevItem;
        contentIdx = idx - 1;
    }
    
    if (!contentBlock) {
        console.log(`  WARNING: No content block for ${qid} at index ${idx}`);
        continue;
    }
    
    // Update content block
    contentBlock.Stem = rewrite.stem;
    contentBlock.Choices = rewrite.choices;
    contentBlock.CorrectChoice = rewrite.correctChoice;
    contentBlock.ExplanationCorrect = rewrite.explanationCorrect;
    contentBlock.Difficulty = rewrite.difficulty;
    
    // Update metadata block
    metaBlock.CognitiveLevel = rewrite.cognitiveLevel;
    metaBlock.DifficultyScore = rewrite.difficultyScore;
    metaBlock.ExplanationWrongA = rewrite.explanationWrongA;
    metaBlock.ExplanationWrongB = rewrite.explanationWrongB;
    metaBlock.ExplanationWrongC = rewrite.explanationWrongC;
    metaBlock.ExplanationWrongD = rewrite.explanationWrongD;
    
    applied++;
    console.log(`  Applied: ${qid} (meta@${idx}, content@${contentIdx})`);
}

// Reconstruct
const prefix = content.substring(0, arrayStart);
const suffix = content.substring(arrayEnd + 1);
const newContent = prefix + JSON.stringify(items, null, 4) + suffix;
fs.writeFileSync(packFile, newContent, 'utf8');
console.log(`Saved ${packFile} (${applied} rewrites applied)`);
