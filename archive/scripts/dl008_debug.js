// Debug script — test methodology on 3 known QIDs
const fs = require('fs');

function debugQID(filepath, qid, packName) {
    const raw = fs.readFileSync(filepath, 'utf8');
    
    // Find this QID
    const qidRegex = new RegExp(`"QuestionID":\\s*"${qid}"`);
    const qidMatch = qidRegex.exec(raw);
    if (!qidMatch) { console.log(`QID ${qid} not found`); return; }
    
    const thisPos = qidMatch.index;
    console.log(`${qid} at position ${thisPos}`);
    
    // Find previous and next QID positions
    const allQidRegex = /"QuestionID":\s*"([^"]+)"/g;
    const allQids = [];
    let m;
    while ((m = allQidRegex.exec(raw)) !== null) {
        allQids.push({ id: m[1], pos: m.index });
    }
    
    const myIdx = allQids.findIndex(q => q.id === qid);
    const prevPos = myIdx > 0 ? allQids[myIdx - 1].pos : 0;
    const nextPos = myIdx + 1 < allQids.length ? allQids[myIdx + 1].pos : raw.length;
    
    console.log(`Previous QID: ${myIdx > 0 ? allQids[myIdx - 1].id : '(start)'} at ${prevPos}`);
    console.log(`Next QID: ${myIdx + 1 < allQids.length ? allQids[myIdx + 1].id : '(end)'} at ${nextPos}`);
    
    // Backward block: prevPos to thisPos
    const backwardBlock = raw.substring(prevPos, thisPos);
    console.log(`\nBackward block length: ${backwardBlock.length}`);
    
    // Extract CorrectChoice from backward block
    const ccMatches = [...backwardBlock.matchAll(/"CorrectChoice":\s*"([ABCD])"/g)];
    console.log(`CorrectChoice matches in backward block: ${ccMatches.length}`);
    ccMatches.forEach((m, i) => console.log(`  [${i}]: "${m[1]}" at offset ${m.index}`));
    
    // Forward block: thisPos to nextPos
    const forwardBlock = raw.substring(thisPos, nextPos);
    console.log(`\nForward block length: ${forwardBlock.length}`);
    
    // Extract ExplanationWrong from forward block
    for (const letter of ['A', 'B', 'C', 'D']) {
        const fieldName = `ExplanationWrong${letter}`;
        const explRegex = new RegExp(`"${fieldName}":\\s*"`, 'g');
        const explMatch = explRegex.exec(forwardBlock);
        if (explMatch) {
            let pos = explMatch.index + explMatch[0].length;
            let value = '';
            let inString = true;
            let safety = 0;
            while (pos < forwardBlock.length && inString && safety < 100000) {
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
                safety++;
            }
            const display = value.length > 80 ? value.substring(0, 80) + '...' : value;
            console.log(`${fieldName}: "${display}" (len=${value.length})`);
        } else {
            console.log(`${fieldName}: NOT FOUND in forward block`);
        }
    }
    
    // Also check for question_state
    const stateMatch = forwardBlock.match(/"question_state":\s*"([^"]+)"/);
    console.log(`question_state: ${stateMatch ? stateMatch[1] : 'NOT FOUND'}`);
    
    // Now cross-check with actual DL-008 logic
    const correctChoice = ccMatches.length > 0 ? ccMatches[ccMatches.length - 1][1] : '?';
    console.log(`\n=== RESULT ===`);
    console.log(`Assigned CorrectChoice: ${correctChoice}`);
}

// Debug specific QIDs
console.log('=== DEBUG PACK C ===');
debugQID('pack_c_corrected.js', 'P1-CC-001', 'C');
console.log('\n\n=== DEBUG PACK D ===');
debugQID('pack_d_corrected.js', 'P1-AD-002', 'D');
console.log('\n\n=== DEBUG PACK C Section E ===');
debugQID('pack_c_corrected.js', 'P1-EC-001', 'C');
