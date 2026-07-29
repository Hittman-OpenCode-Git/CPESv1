// Session 62 Rewrite Application Script v2
// Uses Function constructor parsing for reliable object manipulation
const fs = require('fs');
const path = require('path');

// Load all rewrite data
const batch1 = JSON.parse(fs.readFileSync('scripts/output/rewrites_batch.json', 'utf8'));
const batch2 = JSON.parse(fs.readFileSync('scripts/output/rewrite_batch_items_6_10.json', 'utf8'));
const batch3 = JSON.parse(fs.readFileSync('scripts/output/batch5_rewrites.json', 'utf8'));
const batch4 = JSON.parse(fs.readFileSync(path.join(process.env.TEMP, 'opencode/rewrites_batch_16_20.json'), 'utf8'));

const allRewrites = [...batch1, ...batch2, ...batch3, ...batch4];
console.log(`Loaded ${allRewrites.length} rewrites`);

const rewriteMap = {};
for (const rw of allRewrites) {
    rewriteMap[rw.qid] = rw;
}

const packs = ['a', 'b', 'e'];
let totalApplied = 0;

for (const packLetter of packs) {
    const packFile = `pack_${packLetter}_corrected.js`;
    console.log(`\nProcessing ${packFile}...`);
    
    let content = fs.readFileSync(packFile, 'utf8');
    
    // Extract the array part - find "[{" and the matching "}];"
    const arrayStart = content.indexOf('[');
    const arrayEnd = content.lastIndexOf(']');
    
    // Use Function constructor to parse
    const arrayCode = content.substring(arrayStart, arrayEnd + 1);
    let items;
    try {
        items = new Function('return ' + arrayCode)();
    } catch(e) {
        console.log(`  ERROR parsing ${packFile}: ${e.message}`);
        continue;
    }
    
    console.log(`  Parsed ${items.length} items`);
    
    let applied = 0;
    
    // For Pack E, items is a flat array of alternating metadata and content blocks
    // For Packs A and B, items is an array of single objects
    if (packLetter === 'e') {
        // Pack E dual-block: iterate by pairs
        for (let i = 0; i < items.length - 1; i += 2) {
            const metaBlock = items[i];
            const contentBlock = items[i + 1];
            
            if (!metaBlock || !metaBlock.QuestionID) continue;
            if (!contentBlock || !contentBlock.Stem) continue;
            
            const qid = metaBlock.QuestionID;
            const rewrite = rewriteMap[qid];
            if (!rewrite) continue;
            
            // Update content block fields
            contentBlock.Stem = rewrite.stem;
            contentBlock.Choices = rewrite.choices;
            contentBlock.CorrectChoice = rewrite.correctChoice;
            contentBlock.ExplanationCorrect = rewrite.explanationCorrect;
            contentBlock.Difficulty = rewrite.difficulty;
            
            // Update metadata block fields
            metaBlock.CognitiveLevel = rewrite.cognitiveLevel;
            metaBlock.DifficultyScore = rewrite.difficultyScore;
            metaBlock.ExplanationWrongA = rewrite.explanationWrongA;
            metaBlock.ExplanationWrongB = rewrite.explanationWrongB;
            metaBlock.ExplanationWrongC = rewrite.explanationWrongC;
            metaBlock.ExplanationWrongD = rewrite.explanationWrongD;
            
            applied++;
            console.log(`  Applied: ${qid}`);
        }
    } else {
        // Packs A and B: single object per item
        for (const item of items) {
            if (!item || !item.QuestionID) continue;
            
            const qid = item.QuestionID;
            const rewrite = rewriteMap[qid];
            if (!rewrite) continue;
            
            // Update fields
            item.Stem = rewrite.stem;
            item.Choices = rewrite.choices;
            item.CorrectChoice = rewrite.correctChoice;
            item.ExplanationCorrect = rewrite.explanationCorrect;
            item.ExplanationWrongA = rewrite.explanationWrongA;
            item.ExplanationWrongB = rewrite.explanationWrongB;
            item.ExplanationWrongC = rewrite.explanationWrongC;
            item.ExplanationWrongD = rewrite.explanationWrongD;
            item.CognitiveLevel = rewrite.cognitiveLevel;
            item.Difficulty = rewrite.difficulty;
            item.DifficultyScore = rewrite.difficultyScore;
            
            applied++;
            console.log(`  Applied: ${qid}`);
        }
    }
    
    // Reconstruct the file
    const prefix = content.substring(0, arrayStart);
    const suffix = content.substring(arrayEnd + 1);
    const newContent = prefix + JSON.stringify(items, null, 4) + suffix;
    
    fs.writeFileSync(packFile, newContent, 'utf8');
    console.log(`  Saved ${packFile} (${applied} rewrites applied)`);
    totalApplied += applied;
}

console.log(`\n=== Done: ${totalApplied} rewrites applied ===`);
