// Broad spot-check: test methodology across all sections of both packs
const fs = require('fs');

function spotCheck(filepath, packName) {
    const raw = fs.readFileSync(filepath, 'utf8');
    const allQidRegex = /"QuestionID":\s*"([^"]+)"/g;
    const allQids = [];
    let m;
    while ((m = allQidRegex.exec(raw)) !== null) {
        allQids.push({ id: m[1], pos: m.index });
    }
    
    // Check first 2 items per section, plus every 10th
    const indices = [];
    let prevSection = '';
    let sectionCount = 0;
    
    for (let i = 0; i < allQids.length; i++) {
        const qid = allQids[i];
        const nextPos = i + 1 < allQids.length ? allQids[i + 1].pos : raw.length;
        const fwdBlock = raw.substring(qid.pos, nextPos);
        const secMatch = fwdBlock.match(/"Section":\s*"([A-F])"/) || [];
        const section = secMatch[1] || '?';
        
        if (section !== prevSection) {
            // First 3 of each new section
            indices.push(i, i + 1, i + 2);
            prevSection = section;
            sectionCount = 0;
        }
        sectionCount++;
        
        if (sectionCount % 10 === 0) {
            indices.push(i);
        }
    }
    
    // Deduplicate and sort
    const uniqueIndices = [...new Set(indices)].filter(i => i < allQids.length).sort((a,b) => a-b);
    
    const findings = [];
    
    for (const i of uniqueIndices) {
        const qid = allQids[i];
        const prevPos = i > 0 ? allQids[i - 1].pos : 0;
        const nextPos = i + 1 < allQids.length ? allQids[i + 1].pos : raw.length;
        
        const backwardBlock = raw.substring(prevPos, qid.pos);
        const forwardBlock = raw.substring(qid.pos, nextPos);
        
        // Section
        const secMatch = forwardBlock.match(/"Section":\s*"([A-F])"/);
        const section = secMatch ? secMatch[1] : '?';
        
        // CorrectChoice (backward)
        const ccMatches = [...backwardBlock.matchAll(/"CorrectChoice":\s*"([ABCD])"/g)];
        let cc = '?';
        if (ccMatches.length > 0) cc = ccMatches[ccMatches.length - 1][1];
        
        // ExplanationWrong
        const expl = {};
        for (const letter of ['A', 'B', 'C', 'D']) {
            const re = new RegExp(`"ExplanationWrong${letter}":\\s*"`, 'g');
            const m2 = re.exec(forwardBlock);
            if (m2) {
                let pos = m2.index + m2[0].length;
                let val = '';
                let inS = true;
                while (pos < forwardBlock.length && inS) {
                    if (forwardBlock[pos] === '\\') { val += forwardBlock[pos]; pos++; if (pos < forwardBlock.length) { val += forwardBlock[pos]; pos++; }}
                    else if (forwardBlock[pos] === '"') { inS = false; pos++; }
                    else { val += forwardBlock[pos]; pos++; }
                }
                expl[letter] = val;
            } else {
                expl[letter] = '';
            }
        }
        
        // question_state
        const stateM = forwardBlock.match(/"question_state":\s*"([^"]+)"/);
        const state = stateM ? stateM[1] : 'MISSING';
        
        const violating = expl[cc] && expl[cc].trim().length > 0;
        findings.push({ qid: qid.id, section, state, cc, explEmpty: expl[cc] === '' || !expl[cc].trim(), violating, preview: violating ? expl[cc].trim().substring(0, 60) : '' });
    }
    
    // Show only violations
    const violations = findings.filter(f => f.violating);
    console.log(`\n${packName}: ${findings.length} items spot-checked, ${violations.length} DL-008 violations found`);
    for (const v of violations) {
        console.log(`  ${v.qid} | Sec${v.section} | ${v.state} | CC=${v.cc} | ${v.preview}...`);
    }
    
    // Section summary
    const secClean = {};
    const secVio = {};
    for (const f of findings) {
        if (!secClean[f.section]) { secClean[f.section] = 0; secVio[f.section] = 0; }
        if (f.violating) secVio[f.section]++; else secClean[f.section]++;
    }
    for (const s of Object.keys(secClean)) {
        console.log(`  Section ${s}: ${secClean[s]}+${secVio[s]} clean+violations`);
    }
    
    return violations;
}

console.log('=== PACK C SPOT CHECK ===');
const pc = spotCheck('pack_c_corrected.js', 'Pack C');
console.log('\n=== PACK D SPOT CHECK ===');
const pd = spotCheck('pack_d_corrected.js', 'Pack D');
