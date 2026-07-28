const fs = require('fs');

// Get all remaining Pack E Remember items
const packECode = fs.readFileSync('pack_e_corrected.js', 'utf8');
const fn = new Function(packECode + '; return MCQ_BANK_E;');
const items = fn();

// Get Phase 2 QIDs
const phase2Qids = new Set();
for (let b = 1; b <= 3; b++) {
    const batch = JSON.parse(fs.readFileSync(`scripts/s719_batches/packE_phase2_batch${b}.json`, 'utf8'));
    batch.forEach(x => phase2Qids.add(x[0]));
}

// Find remaining Remember items
const remaining = items.filter(x => x.CognitiveLevel === 'Remember' && !phase2Qids.has(x.QuestionID));
console.log('Remaining Remember:', remaining.length);

// Create batches of 28
const batchSize = 28;
for (let i = 0; i < remaining.length; i += batchSize) {
    const batchQids = remaining.slice(i, i + batchSize);
    const changes = [];
    for (const item of batchQids) {
        changes.push([item.QuestionID, 'CognitiveLevel', 'Remember', 'Understand']);
    }
    const batchNum = Math.floor(i / batchSize) + 1;
    const fileName = `scripts/s719_batches/packE_phase3_batch${batchNum}.json`;
    fs.writeFileSync(fileName, JSON.stringify(changes));
    console.log(`Wrote ${fileName}: ${batchQids.length} items`);
}
