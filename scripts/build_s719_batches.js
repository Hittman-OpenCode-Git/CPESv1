// Build all S719 batch files
const fs = require('fs');
const decisions = JSON.parse(fs.readFileSync('reports/systematic_testing/SESSION719_ALIGNMENT_DECISIONS.json', 'utf8'));

// Phase 1: Pack A items
const packA = decisions.decisions.filter(x => x.Pack === 'pack_a');
console.log('Pack A items:', packA.length);

// Phase 2: Pack E BOTH_UPDATE items
const packE_both = decisions.decisions.filter(x => x.Pack === 'pack_e');
console.log('Pack E BOTH_UPDATE items:', packE_both.length);

// Build Pack A batches (28 items per batch)
const packAQids = packA.map(x => x.QuestionID);
const batchSize = 28;
const batchesDir = 'scripts/s719_batches';
if (!fs.existsSync(batchesDir)) fs.mkdirSync(batchesDir, { recursive: true });

// Pack A batches
for (let i = 0; i < packAQids.length; i += batchSize) {
    const batchQids = packAQids.slice(i, i + batchSize);
    const changes = [];
    for (const qid of batchQids) {
        changes.push([qid, 'CognitiveLevel', 'Evaluate', 'Understand']);
        changes.push([qid, 'Difficulty', 'Easy', 'Moderate-Easy']);
        changes.push([qid, 'DifficultyScore', 1, 2]);
    }
    const batchNum = Math.floor(i / batchSize) + 1;
    const fileName = `${batchesDir}/packA_batch${batchNum}.json`;
    fs.writeFileSync(fileName, JSON.stringify(changes));
    console.log(`Wrote ${fileName}: ${batchQids.length} items, ${changes.length} changes`);
}

// Pack E BOTH_UPDATE batches
const packEQids = packE_both.map(x => x.QuestionID);
for (let i = 0; i < packEQids.length; i += batchSize) {
    const batchQids = packEQids.slice(i, i + batchSize);
    const changes = [];
    for (const qid of batchQids) {
        changes.push([qid, 'CognitiveLevel', 'Remember', 'Understand']);
        changes.push([qid, 'Difficulty', 'Difficult', 'Moderate-Easy']);
        changes.push([qid, 'DifficultyScore', 4, 2]);
    }
    const batchNum = Math.floor(i / batchSize) + 1;
    const fileName = `${batchesDir}/packE_phase2_batch${batchNum}.json`;
    fs.writeFileSync(fileName, JSON.stringify(changes));
    console.log(`Wrote ${fileName}: ${batchQids.length} items, ${changes.length} changes`);
}

console.log('\nAll batch files created.');
console.log('Pack A batches:', Math.ceil(packAQids.length / batchSize));
console.log('Pack E Phase 2 batches:', Math.ceil(packEQids.length / batchSize));
