// Extract Pack C Certified QIDs using regex block extraction
// Pack C uses PAIRED-OBJECT architecture: every 2 objects = 1 QID
// Object 0 = metadata (has question_state), Object 1 = content
// We extract QID blocks and check question_state within each metadata block

const fs = require('fs');
const path = require('path');

const WORKDIR = path.resolve(__dirname, '..');
const filepath = path.join(WORKDIR, 'pack_c_corrected.js');
const content = fs.readFileSync(filepath, 'utf8');

// Find all QID positions
const qidRegex = /"QuestionID":\s*"([^"]+)"/g;
const qidPositions = [];
let match;
while ((match = qidRegex.exec(content)) !== null) {
    qidPositions.push({ qid: match[1], index: match.index, length: match[0].length });
}
console.log(`Found ${qidPositions.length} QID references in Pack C`);

// For each QID, find the nearest preceding question_state
// In the paired architecture, QID appears in BOTH blocks
// We need to check if question_state is "Certified" in the metadata block (which has ChoiceA-D)

const certified = [];
const flagged = [];

for (let i = 0; i < qidPositions.length; i++) {
    const pos = qidPositions[i];
    const nextPos = (i + 1 < qidPositions.length) ? qidPositions[i + 1].index : content.length;
    
    // Get block from this QID to next QID
    const block = content.substring(pos.index, nextPos);
    
    // Check if this block has question_state: "Certified"
    const hasCertified = block.includes('"question_state": "Certified"') || 
                         block.includes('"question_state":"Certified"');
    
    if (hasCertified) {
        certified.push(pos.qid);
    }
}

// Deduplicate (since QID appears in both metadata and content blocks)
const uniqueCertified = [...new Set(certified)].sort();
console.log(`Certified QIDs (raw): ${certified.length}`);
console.log(`Certified QIDs (unique): ${uniqueCertified.length}`);

// Verify count against grep
console.log(`\nExpected: 174 (from grep)`);
console.log(`Got: ${uniqueCertified.length}`);

if (uniqueCertified.length !== 174) {
    console.log('DISCREPANCY — checking manually...');
    // Check which QIDs have the state
    for (const pos of qidPositions) {
        const nextPos = qidPositions[qidPositions.indexOf(pos) + 1]?.index || content.length;
        const block = content.substring(pos.index, Math.min(pos.index + 5000, nextPos));
        const stateMatch = block.match(/"question_state"\s*:\s*"([^"]+)"/);
        if (stateMatch && stateMatch[1] === 'Certified') {
            if (!uniqueCertified.includes(pos.qid)) {
                flagged.push(pos.qid);
            }
        }
    }
}

// Output
const outPath = path.join(WORKDIR, 'reports', 'phase0b_pack_c_certified_qids.json');
fs.writeFileSync(outPath, JSON.stringify({
    pack: 'C',
    count: uniqueCertified.length,
    qids: uniqueCertified,
    flagged: flagged
}, null, 2));
console.log(`\nWrote ${outPath}`);
console.log('QID list (first 20):', uniqueCertified.slice(0, 20).join(', '));
console.log('QID list (last 10):', uniqueCertified.slice(-10).join(', '));
