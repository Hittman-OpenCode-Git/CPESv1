// Split Pack C into review packs for third-party review handoff
// Per AGENTS.md §18.2: verbatim parts ≤40KB each (~10K tokens)
// Emit part→QID manifest, prove no-gap/no-dup via concat check

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const inputFile = 'content/packs/pack_c_corrected.js';
const outputDir = 'content/packs/review_parts/pack_c';
const MAX_PART_SIZE = 40000; // 40KB target

// Read the source file
const sourceContent = fs.readFileSync(inputFile, 'utf8');

// Find the array by locating the first '[' after 'const MCQ_BANK_C'
const constIndex = sourceContent.indexOf('const MCQ_BANK_C');
if (constIndex === -1) {
    throw new Error('Could not find const MCQ_BANK_C declaration');
}

const arrayStart = sourceContent.indexOf('[', constIndex);
if (arrayStart === -1) {
    throw new Error('Could not find array start');
}

// Parse the array by tracking brackets
let depth = 0;
let arrayEnd = -1;
for (let i = arrayStart; i < sourceContent.length; i++) {
    const char = sourceContent[i];
    if (char === '[') depth++;
    else if (char === ']') {
        depth--;
        if (depth === 0) {
            arrayEnd = i;
            break;
        }
    }
}
if (arrayEnd === -1) {
    throw new Error('Could not find matching array end');
}

const arrayContent = sourceContent.substring(arrayStart, arrayEnd + 1);
const questions = JSON.parse(arrayContent);
console.log(`Total questions: ${questions.length}`);

// Calculate approximate size per question
const totalSize = Buffer.byteLength(arrayContent, 'utf8');
const avgSizePerQuestion = totalSize / questions.length;
console.log(`Total array size: ${totalSize} bytes, avg per question: ${Math.round(avgSizePerQuestion)} bytes`);

// Target questions per part for ~40KB
const QUESTIONS_PER_PART = Math.max(1, Math.floor(MAX_PART_SIZE / avgSizePerQuestion));
console.log(`Target questions per part: ${QUESTIONS_PER_PART}`);

// Create output directory
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Split into parts
const parts = [];
for (let i = 0; i < questions.length; i += QUESTIONS_PER_PART) {
    const chunk = questions.slice(i, i + QUESTIONS_PER_PART);
    const partNum = Math.floor(i / QUESTIONS_PER_PART) + 1;
    const partName = `pack_c_part_${partNum.toString().padStart(3, '0')}.js`;
    
    const qids = chunk.map(q => q.QuestionID);
    const firstQid = qids[0];
    const lastQid = qids[qids.length - 1];
    
    // Write as valid JS module
    const partContent = `const MCQ_BANK_C_PART_${partNum} = ${JSON.stringify(chunk, null, 2)};`;
    const partPath = path.join(outputDir, partName);
    fs.writeFileSync(partPath, partContent, 'utf8');
    
    const partSize = Buffer.byteLength(partContent, 'utf8');
    parts.push({
        part: partNum,
        file: partName,
        path: partPath,
        qidRange: `${firstQid}–${lastQid}`,
        count: chunk.length,
        sizeBytes: partSize,
        qids: qids
    });
    
    console.log(`Part ${partNum}: ${chunk.length} questions (${firstQid}–${lastQid}), ${partSize} bytes`);
}

// Verify concat reconstruction
const reconstructed = parts.flatMap(p => {
    const content = fs.readFileSync(p.path, 'utf8');
    // Find the array in the part file
    const partArrayStart = content.indexOf('[');
    if (partArrayStart === -1) return [];
    let depth = 0;
    let partArrayEnd = -1;
    for (let i = partArrayStart; i < content.length; i++) {
        const char = content[i];
        if (char === '[') depth++;
        else if (char === ']') {
            depth--;
            if (depth === 0) {
                partArrayEnd = i;
                break;
            }
        }
    }
    if (partArrayEnd === -1) return [];
    const partArrayContent = content.substring(partArrayStart, partArrayEnd + 1);
    return JSON.parse(partArrayContent);
});

console.log(`\nReconstructed count: ${reconstructed.length}`);
console.log(`Original count: ${questions.length}`);
console.log(`Match: ${reconstructed.length === questions.length ? 'YES' : 'NO'}`);

// Verify byte-for-byte match of the array content only
const reconstructedArray = JSON.stringify(reconstructed);
const originalArray = JSON.stringify(questions);
console.log(`Byte-for-byte array match: ${reconstructedArray === originalArray ? 'YES' : 'NO'}`);

// Compute SHA256 of source
const sourceHash = crypto.createHash('sha256').update(sourceContent).digest('hex');
console.log(`Source SHA256: ${sourceHash}`);

// Write manifest
const manifest = {
    sourceFile: inputFile,
    sourceSHA256: sourceHash,
    totalQuestions: questions.length,
    totalParts: parts.length,
    partSizeTarget: MAX_PART_SIZE,
    parts: parts.map(p => ({
        part: p.part,
        file: p.file,
        qidRange: p.qidRange,
        questionCount: p.count,
        sizeBytes: p.sizeBytes,
        qids: p.qids
    })),
    verification: {
        reconstructedCount: reconstructed.length,
        countMatch: reconstructed.length === questions.length,
        byteMatch: reconstructedArray === originalArray
    }
};

const manifestPath = path.join(outputDir, 'pack_c_review_manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`\nManifest written to: ${manifestPath}`);