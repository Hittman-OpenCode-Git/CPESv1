// EXHAUSTIVE DL-008 scan — Pack C and Pack D — with methodology validation
const fs = require('fs');

function exhaustiveScan(filepath, packName) {
    const raw = fs.readFileSync(filepath, 'utf8');
    
    // Find all QIDs
    const qidRegex = /"QuestionID":\s*"([^"]+)"/g;
    const allQids = [];
    let m;
    while ((m = qidRegex.exec(raw)) !== null) {
        allQids.push({ id: m[1], pos: m.index });
    }
    
    console.log(`Total QIDs in ${packName}: ${allQids.length}`);
    
    const stats = {
        total: allQids.length,
        processed: 0,
        violations: 0,
        missingCC: 0,
        missingExpl: [],
        bySection: {},
        byState: {},
        byBucket: {1: 0, 2: 0},
        items: []
    };
    
    for (let i = 0; i < allQids.length; i++) {
        const qid = allQids[i];
        const prevPos = i > 0 ? allQids[i - 1].pos : 0;
        const nextPos = i + 1 < allQids.length ? allQids[i + 1].pos : raw.length;
        
        const backwardBlock = raw.substring(prevPos, qid.pos);
        const forwardBlock = raw.substring(qid.pos, nextPos);
        
        // CorrectChoice — from backward block (last match = closest to QID)
        const ccMatches = [...backwardBlock.matchAll(/"CorrectChoice":\s*"([ABCD])"/g)];
        let correctChoice = '?';
        if (ccMatches.length > 0) {
            correctChoice = ccMatches[ccMatches.length - 1][1];
        } else {
            stats.missingCC++;
        }
        
        // Section
        const secMatch = forwardBlock.match(/"Section":\s*"([A-F])"/);
        const section = secMatch ? secMatch[1] : '?';
        
        // question_state
        const stateMatch = forwardBlock.match(/"question_state":\s*"([^"]+)"/);
        const state = stateMatch ? stateMatch[1] : 'MISSING';
        
        // ExplanationWrong fields
        const explValues = {};
        for (const letter of ['A', 'B', 'C', 'D']) {
            const explRegex = new RegExp(`"ExplanationWrong${letter}":\\s*"`, 'g');
            const explMatch = explRegex.exec(forwardBlock);
            if (explMatch) {
                let pos = explMatch.index + explMatch[0].length;
                let value = '';
                let inString = true;
                while (pos < forwardBlock.length && inString) {
                    const ch = forwardBlock[pos];
                    if (ch === '\\') {
                        value += ch;
                        if (pos + 1 < forwardBlock.length) { value += forwardBlock[pos + 1]; pos += 2; }
                        else { pos++; }
                    } else if (ch === '"') {
                        inString = false;
                        pos++;
                    } else {
                        value += ch;
                        pos++;
                    }
                }
                explValues[letter] = value;
            }
        }
        
        stats.processed++;
        
        // DL-008 check
        let isViolation = false;
        if (correctChoice !== '?') {
            const violatingValue = explValues[correctChoice];
            isViolation = violatingValue !== undefined && violatingValue.trim().length > 0;
            
            if (isViolation) {
                stats.violations++;
                const trimmed = violatingValue.trim();
                
                // Bucket classification
                let bucket = 2;
                if (trimmed.includes('represents a plausible misconception') || 
                    trimmed.includes('A candidate may select this option by misapplying') ||
                    trimmed.includes('Under CMA Part 1 accounting principles, the correct')) {
                    bucket = 2;
                } else if (/^\$?\d[.,\d]*\s+(is|equals|=|results)/.test(trimmed)) {
                    bucket = 1;
                } else if (/^(Under the|The correct|Straight-line|Annual)/.test(trimmed) && /\d/.test(trimmed)) {
                    bucket = 1;
                }
                
                stats.byBucket[bucket] = (stats.byBucket[bucket] || 0) + 1;
                
                stats.items.push({
                    qid: qid.id,
                    section,
                    state,
                    correctChoice,
                    bucket,
                    preview: trimmed.substring(0, 100).replace(/\n/g, '\\n')
                });
            }
        }
        
        // Accumulate stats
        if (!stats.bySection[section]) stats.bySection[section] = { total: 0, violations: 0, certified: 0, nonCert: 0 };
        stats.bySection[section].total++;
        stats.bySection[section].violations += (isViolation ? 1 : 0);
        if (state === 'Certified') stats.bySection[section].certified++;
        else stats.bySection[section].nonCert++;
        
        if (!stats.byState[state]) stats.byState[state] = { total: 0, violations: 0 };
        stats.byState[state].total++;
        stats.byState[state].violations += (isViolation ? 1 : 0);
    }
    
    return stats;
}

// Run for both packs
console.log('='.repeat(80));
console.log('DL-008 EXHAUSTIVE SCAN — PACK C');
console.log('='.repeat(80));
const packC = exhaustiveScan('pack_c_corrected.js', 'Pack C');

console.log(`\nProcessed: ${packC.processed}/${packC.total}`);
console.log(`Missing CorrectChoice: ${packC.missingCC}`);
console.log(`DL-008 VIOLATIONS: ${packC.violations}`);

console.log('\nBy Section:');
for (const [sec, data] of Object.entries(packC.bySection).sort()) {
    console.log(`  Section ${sec}: ${data.total} items, ${data.violations} violations, ${data.certified} Certified, ${data.nonCert} non-Cert`);
}

console.log('\nBy State:');
for (const [st, data] of Object.entries(packC.byState).sort()) {
    console.log(`  ${st}: ${data.total} items, ${data.violations} violations`);
}

console.log(`\nBy Bucket: Bucket1=${packC.byBucket[1]}, Bucket2=${packC.byBucket[2]}`);

if (packC.violations > 0) {
    console.log('\nViolation details:');
    for (const v of packC.items) {
        console.log(`  ${v.qid} | Sec${v.section} | ${v.state} | CC=${v.correctChoice} | B${v.bucket} | ${v.preview}`);
    }
}

console.log('\n\n');
console.log('='.repeat(80));
console.log('DL-008 EXHAUSTIVE SCAN — PACK D');
console.log('='.repeat(80));
const packD = exhaustiveScan('pack_d_corrected.js', 'Pack D');

console.log(`\nProcessed: ${packD.processed}/${packD.total}`);
console.log(`Missing CorrectChoice: ${packD.missingCC}`);
console.log(`DL-008 VIOLATIONS: ${packD.violations}`);

console.log('\nBy Section:');
for (const [sec, data] of Object.entries(packD.bySection).sort()) {
    console.log(`  Section ${sec}: ${data.total} items, ${data.violations} violations, ${data.certified} Certified, ${data.nonCert} non-Cert`);
}

console.log('\nBy State:');
for (const [st, data] of Object.entries(packD.byState).sort()) {
    console.log(`  ${st}: ${data.total} items, ${data.violations} violations`);
}

console.log(`\nBy Bucket: Bucket1=${packD.byBucket[1]}, Bucket2=${packD.byBucket[2]}`);

if (packD.violations > 0) {
    console.log('\nViolation details:');
    for (const v of packD.items) {
        console.log(`  ${v.qid} | Sec${v.section} | ${v.state} | CC=${v.correctChoice} | B${v.bucket} | ${v.preview}`);
    }
}

// Final summary
console.log('\n\n');
console.log('='.repeat(80));
console.log('FINAL SUMMARY');
console.log('='.repeat(80));
console.log(`Pack C: ${packC.total} items, ${packC.violations} DL-008 violations`);
console.log(`Pack D: ${packD.total} items, ${packD.violations} DL-008 violations`);
console.log(`GRAND TOTAL: ${packC.violations + packD.violations} violations across ${packC.total + packD.total} items`);
console.log('\n=== SCANS COMPLETE ===');
