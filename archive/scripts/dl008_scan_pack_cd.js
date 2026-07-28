// DL-008 boundary-aware scan for Pack C and Pack D only (FIXED)
// Fix: CorrectChoice is BEFORE QuestionID in each object — scan backward for it.
// Read-only — no writes to any pack files.

const fs = require('fs');

function scanPack(filepath, packName) {
    const raw = fs.readFileSync(filepath, 'utf8');
    
    // Find all QID positions in the file
    const qidRegex = /"QuestionID":\s*"([^"]+)"/g;
    let match;
    const qids = [];
    
    while ((match = qidRegex.exec(raw)) !== null) {
        qids.push({
            questionID: match[1],
            pos: match.index,
            matchLen: match[0].length
        });
    }
    
    console.log(`Found ${qids.length} QuestionID entries in ${packName}`);
    
    const results = [];
    
    for (let i = 0; i < qids.length; i++) {
        const qid = qids[i];
        const thisQIDPos = qid.pos;
        // Forward block: from this QID to the next QID (or EOF)
        const nextQIDPos = (i + 1 < qids.length) ? qids[i + 1].pos : raw.length;
        const forwardBlock = raw.substring(thisQIDPos, nextQIDPos);
        
        // Backward block: from PREVIOUS QID (or file start) to this QID
        const prevQIDPos = (i > 0) ? qids[i - 1].pos : 0;
        const backwardBlock = raw.substring(prevQIDPos, thisQIDPos);
        
        // Extract Section (in forward block, since it's typically near QID)
        const sectionMatch = forwardBlock.match(/"Section":\s*"([A-F])"/);
        // If not found, try backward block
        const section = sectionMatch ? sectionMatch[1] : 
            ((backwardBlock.match(/"Section":\s*"([A-F])"/) || [])[1] || '?');
        
        // Extract CorrectChoice from backward block (it's BEFORE the QID)
        let correctChoice = '?';
        const ccMatches = [...backwardBlock.matchAll(/"CorrectChoice":\s*"([ABCD])"/g)];
        if (ccMatches.length > 0) {
            // Take the LAST CorrectChoice in the backward block (closest to QID)
            correctChoice = ccMatches[ccMatches.length - 1][1];
        }
        
        // Extract question_state (after QID in the object)
        const stateMatch = forwardBlock.match(/"question_state":\s*"([^"]+)"/);
        const state = stateMatch ? stateMatch[1] : 'MISSING';
        
        if (correctChoice === '?') {
            console.log(`WARNING: ${qid.questionID} has no CorrectChoice found in backward block`);
            continue;
        }
        
        // Extract ExplanationWrong fields from forward block
        // These are after the QID in the object
        const explFields = {};
        for (const letter of ['A', 'B', 'C', 'D']) {
            // Find "ExplanationWrongX": position
            const fieldPattern = new RegExp(`"ExplanationWrong${letter}":\\s*"`, 'g');
            const fieldMatch = fieldPattern.exec(forwardBlock);
            
            if (!fieldMatch) {
                // Try backward block for items where ExplanationWrong might be before QID
                // (should not happen in this file structure, but just in case)
                const backFieldMatch = new RegExp(`"ExplanationWrong${letter}":\\s*"`, 'g').exec(backwardBlock);
                if (backFieldMatch) {
                    // Extract value from backward block
                    let pos = backFieldMatch.index + backFieldMatch[0].length;
                    let value = '';
                    let inString = true;
                    while (pos < backwardBlock.length && inString) {
                        const ch = backwardBlock[pos];
                        if (ch === '\\') {
                            value += ch;
                            if (pos + 1 < backwardBlock.length) {
                                value += backwardBlock[pos + 1];
                                pos += 2;
                            } else { pos++; }
                        } else if (ch === '"') {
                            inString = false;
                            pos++;
                        } else {
                            value += ch;
                            pos++;
                        }
                    }
                    explFields[letter] = value;
                } else {
                    explFields[letter] = '';
                }
                continue;
            }
            
            // Start after the opening quote
            let pos = fieldMatch.index + fieldMatch[0].length;
            let value = '';
            let inString = true;
            
            while (pos < forwardBlock.length && inString) {
                const ch = forwardBlock[pos];
                if (ch === '\\') {
                    value += ch;
                    if (pos + 1 < forwardBlock.length) {
                        value += forwardBlock[pos + 1];
                        pos += 2;
                    } else { pos++; }
                } else if (ch === '"') {
                    inString = false;
                    pos++;
                } else {
                    value += ch;
                    pos++;
                }
            }
            
            explFields[letter] = value;
        }
        
        // Check DL-008: ExplanationWrong[CorrectChoice] must be empty
        const violatingContent = explFields[correctChoice];
        
        if (violatingContent !== undefined && violatingContent.trim().length > 0) {
            const trimmed = violatingContent.trim();
            const preview = trimmed.substring(0, 80).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
            
            // Bucket classification
            let bucket = 2;
            
            if (trimmed.includes('represents a plausible misconception') || 
                trimmed.includes('A candidate may select this option by misapplying') ||
                trimmed.includes('Under CMA Part 1 accounting principles')) {
                bucket = 2; // DL-013 boilerplate
            } else if (/^\$?\d/.test(trimmed)) {
                bucket = 1;
            } else if (/\.\s*Option\s+[A-D]\s*\(/.test(trimmed)) {
                bucket = 2; // DL-013 boilerplate variant
            } else if (/=.*\d/.test(trimmed) && trimmed.length < 300 && !trimmed.includes('represents a plausible')) {
                bucket = 1;
            }
            
            results.push({
                qid: qid.questionID,
                section,
                state,
                correctChoice,
                violatingField: `ExplanationWrong${correctChoice}`,
                bucket,
                preview
            });
        }
    }
    
    return results;
}

// Scan both packs
console.log('=== SCANNING Pack C ===');
const packC = scanPack('pack_c_corrected.js', 'Pack C');

console.log('\n=== SCANNING Pack D ===');
const packD = scanPack('pack_d_corrected.js', 'Pack D');

// ===== REPORT =====
console.log('\n\n');
console.log('='.repeat(80));
console.log('DL-008 INDEPENDENT RECONFIRMATION SCAN — Pack C & Pack D (CORRECTED METHOD)');
console.log('='.repeat(80));

// Pack C detail
console.log('\n--- PACK C: DL-008 VIOLATIONS ---');
console.log(`Total: ${packC.length}`);
console.log();
console.log('QID | Section | State | CC | ViolatingField | Bucket | ContentPreview');
console.log('-'.repeat(100));
for (const r of packC) {
    console.log(`${r.qid} | ${r.section} | ${r.state} | ${r.correctChoice} | ${r.violatingField} | B${r.bucket} | ${r.preview}`);
}

// Pack D detail
console.log('\n\n--- PACK D: DL-008 VIOLATIONS ---');
console.log(`Total: ${packD.length}`);
console.log();
console.log('QID | Section | State | CC | ViolatingField | Bucket | ContentPreview');
console.log('-'.repeat(100));
for (const r of packD) {
    console.log(`${r.qid} | ${r.section} | ${r.state} | ${r.correctChoice} | ${r.violatingField} | B${r.bucket} | ${r.preview}`);
}

// ===== SUMMARY =====
console.log('\n\n');
console.log('='.repeat(80));
console.log('SUMMARY BREAKDOWN (CORRECTED METHOD)');
console.log('='.repeat(80));

console.log(`\nPack C violations: ${packC.length}`);
console.log(`Pack D violations: ${packD.length}`);
console.log(`GRAND TOTAL:        ${packC.length + packD.length}`);

for (const [pack, data] of [['C', packC], ['D', packD]]) {
    const bySection = {};
    for (const r of data) {
        bySection[r.section] = (bySection[r.section] || 0) + 1;
    }
    
    const byBucket = {1: 0, 2: 0};
    for (const r of data) {
        byBucket[r.bucket] = (byBucket[r.bucket] || 0) + 1;
    }
    
    const byState = {};
    for (const r of data) {
        byState[r.state] = (byState[r.state] || 0) + 1;
    }
    
    console.log(`\nPack ${pack} by Section: ${JSON.stringify(bySection)}`);
    console.log(`Pack ${pack} by Bucket:  Bucket1(calc)=${byBucket[1]}, Bucket2(prose)=${byBucket[2]}`);
    console.log(`Pack ${pack} by State:   ${JSON.stringify(byState)}`);
}

// Cross-tab
console.log('\n--- CERTIFIED vs NON-CERTIFIED (both packs) ---');
const allViolations = [...packC, ...packD];
const certBySec = {};
const nonCertBySec = {};
const certByBucket = {1: 0, 2: 0};
const nonCertByBucket = {1: 0, 2: 0};

for (const r of allViolations) {
    if (r.state === 'Certified') {
        certBySec[r.section] = (certBySec[r.section] || 0) + 1;
        certByBucket[r.bucket] = (certByBucket[r.bucket] || 0) + 1;
    } else {
        nonCertBySec[r.section] = (nonCertBySec[r.section] || 0) + 1;
        nonCertByBucket[r.bucket] = (nonCertByBucket[r.bucket] || 0) + 1;
    }
}

const totalCert = Object.values(certBySec).reduce((a, b) => a + b, 0);
const totalNonCert = Object.values(nonCertBySec).reduce((a, b) => a + b, 0);

console.log(`Certified:     ${totalCert} (Bucket1=${certByBucket[1]}, Bucket2=${certByBucket[2]})`);
console.log(`  by Section:  ${JSON.stringify(certBySec)}`);
console.log(`Non-Certified: ${totalNonCert} (Bucket1=${nonCertByBucket[1]}, Bucket2=${nonCertByBucket[2]})`);
console.log(`  by Section:  ${JSON.stringify(nonCertBySec)}`);

// Bucket 1 detail
console.log('\n--- BUCKET 1 DETAIL (mechanical calculation summaries — safe to clear) ---');
const b1Items = allViolations.filter(r => r.bucket === 1);
for (const r of b1Items) {
    console.log(`${r.qid} | Pack${r.qid.includes('-C') ? 'C' : 'D'} | ${r.section} | ${r.state} | ${r.correctChoice} | ${r.preview}`);
}

console.log('\n=== SCAN COMPLETE ===');
