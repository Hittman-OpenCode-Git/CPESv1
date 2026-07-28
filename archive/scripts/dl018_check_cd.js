// DL-018 check: missing ExplanationWrong[CorrectChoice] fields in Packs C/D
// These fields exist for other letters but are absent at the CorrectChoice position
const fs = require('fs');

function checkMissingFields(filepath, packName) {
    const raw = fs.readFileSync(filepath, 'utf8');
    const qidRegex = /"QuestionID":\s*"([^"]+)"/g;
    const allQids = [];
    let m;
    while ((m = qidRegex.exec(raw)) !== null) {
        allQids.push({ id: m[1], pos: m.index });
    }
    
    const dl018 = [];
    const dl008 = [];
    
    for (let i = 0; i < allQids.length; i++) {
        const qid = allQids[i];
        const prevPos = i > 0 ? allQids[i - 1].pos : 0;
        const nextPos = i + 1 < allQids.length ? allQids[i + 1].pos : raw.length;
        
        const backwardBlock = raw.substring(prevPos, qid.pos);
        const forwardBlock = raw.substring(qid.pos, nextPos);
        
        // CorrectChoice
        const ccMatches = [...backwardBlock.matchAll(/"CorrectChoice":\s*"([ABCD])"/g)];
        if (ccMatches.length === 0) continue;
        const correctChoice = ccMatches[ccMatches.length - 1][1];
        
        // Check if ExplanationWrong[CorrectChoice] field exists in forward block
        const fieldName = `ExplanationWrong${correctChoice}`;
        const fieldRegex = new RegExp(`"${fieldName}":\\s*"`);
        const fieldMatch = fieldRegex.exec(forwardBlock);
        
        if (!fieldMatch) {
            // Try backward block
            const backMatch = new RegExp(`"${fieldName}":\\s*"`).exec(backwardBlock);
            if (!backMatch) {
                // DL-018: field structurally absent
                const stateM = forwardBlock.match(/"question_state":\s*"([^"]+)"/);
                const state = stateM ? stateM[1] : 'MISSING';
                const secM = forwardBlock.match(/"Section":\s*"([A-F])"/);
                const section = secM ? secM[1] : '?';
                
                // Check if ALL four ExplanationWrong fields are missing (unlikely)
                let allMissing = true;
                for (const l of ['A', 'B', 'C', 'D']) {
                    const re2 = new RegExp(`"ExplanationWrong${l}":\\s*"`);
                    if (re2.exec(forwardBlock) || new RegExp(`"ExplanationWrong${l}":\\s*"`).exec(backwardBlock)) {
                        allMissing = false;
                    }
                }
                
                dl018.push({
                    qid: qid.id,
                    section,
                    state,
                    correctChoice,
                    allExplanationWrongMissing: allMissing
                });
            }
        } else {
            // Field exists — check if non-empty (DL-008)
            let pos = fieldMatch.index + fieldMatch[0].length;
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
            
            if (value.trim().length > 0) {
                const stateM = forwardBlock.match(/"question_state":\s*"([^"]+)"/);
                const state = stateM ? stateM[1] : 'MISSING';
                const secM = forwardBlock.match(/"Section":\s*"([A-F])"/);
                const section = secM ? secM[1] : '?';
                dl008.push({
                    qid: qid.id,
                    section,
                    state,
                    correctChoice,
                    preview: value.trim().substring(0, 60)
                });
            }
        }
    }
    
    console.log(`\n${packName}: ${dl018.length} DL-018 (missing field), ${dl008.length} DL-008 (non-empty field)`);
    
    if (dl018.length > 0) {
        console.log('\nDL-018 items:');
        for (const v of dl018) {
            console.log(`  ${v.qid} | Sec${v.section} | ${v.state} | CC=${v.correctChoice} | All4Missing=${v.allExplanationWrongMissing}`);
        }
    }
    
    if (dl008.length > 0) {
        console.log('\nDL-008 items (reconfirm):');
        for (const v of dl008) {
            console.log(`  ${v.qid} | Sec${v.section} | ${v.state} | CC=${v.correctChoice} | ${v.preview}`);
        }
    }
    
    return { dl018, dl008 };
}

console.log('=== PACK C ===');
const pc = checkMissingFields('pack_c_corrected.js', 'Pack C');
console.log('\n=== PACK D ===');
const pd = checkMissingFields('pack_d_corrected.js', 'Pack D');
console.log(`\n\nTOTAL: DL-018=${pc.dl018.length + pd.dl018.length}, DL-008=${pc.dl008.length + pd.dl008.length}`);
