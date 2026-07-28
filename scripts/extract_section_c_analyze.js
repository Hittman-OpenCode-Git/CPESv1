// DEBUG: Extract Section C items and show filtering

const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const SECTION_C_QID = /^P1E?-C-\d+$/;

function findObjectBoundary(content, qidStart) {
    let inStr = false, esc = false, braceStart = qidStart;
    for (let j = qidStart; j >= 0; j--) {
        if (esc) { esc = false; continue; }
        if (j > 0 && content[j - 1] === '\\' && inStr) { esc = true; continue; }
        if (content[j] === '"') { if (!esc) inStr = !inStr; continue; }
        if (inStr) continue;
        if (content[j] === '{') { braceStart = j; break; }
    }
    let objEnd = braceStart, depth = 0;
    inStr = false; esc = false;
    for (let j = braceStart; j < content.length; j++) {
        if (esc) { esc = false; continue; }
        if (content[j] === '\\' && inStr) { esc = true; continue; }
        if (content[j] === '"') { inStr = !inStr; continue; }
        if (inStr) continue;
        if (content[j] === '{') depth++;
        if (content[j] === '}') { depth--; if (depth === 0) { objEnd = j + 1; break; } }
    }
    return { start: braceStart, end: objEnd };
}

function getStringField(block, fieldName) {
    const idx = block.indexOf('"' + fieldName + '"');
    if (idx === -1) return null;
    let pos = idx + fieldName.length + 2;
    while (pos < block.length && (block[pos] === ' ' || block[pos] === '\t' || block[pos] === '\n' || block[pos] === '\r')) pos++;
    if (pos >= block.length || block[pos] !== '"') return null;
    pos++;
    let val = '';
    while (pos < block.length) {
        if (block[pos] === '\\' && pos + 1 < block.length) {
            const next = block[pos + 1];
            if (next === '"') { val += '"'; pos += 2; continue; }
            if (next === '\\') { val += '\\'; pos += 2; continue; }
            if (next === 'n') { val += '\n'; pos += 2; continue; }
            if (next === 'r') { val += '\r'; pos += 2; continue; }
            if (next === 't') { val += '\t'; pos += 2; continue; }
            val += '\\' + next; pos += 2; continue;
        }
        if (block[pos] === '"') break;
        val += block[pos];
        pos++;
    }
    return val;
}

function debugPack(filename) {
    const filePath = path.join(BASE, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n=== ${filename} ===`);
    console.log(`File size: ${content.length}`);
    
    const qidRegex = /"QuestionID":\s*"([^"]+)"/g;
    let match;
    let scCount = 0;
    let scCertified = 0;
    let scUnderstand = 0;
    let scApply = 0;
    const clDist = {};
    const stemLenDist = {};
    
    while ((match = qidRegex.exec(content)) !== null) {
        const qid = match[1];
        if (!SECTION_C_QID.test(qid)) continue;
        scCount++;
        
        const { start, end } = findObjectBoundary(content, match.index);
        const block = content.substring(start, end);
        
        const qs = getStringField(block, 'question_state');
        if (qs === 'Certified') scCertified++;
        
        const cl = getStringField(block, 'CognitiveLevel');
        clDist[cl] = (clDist[cl] || 0) + 1;
        
        const stem = getStringField(block, 'Stem');
        const stemLen = stem ? stem.length : 0;
        
        if (stemLen < 80) stemLenDist['<80'] = (stemLenDist['<80'] || 0) + 1;
        else if (stemLen < 100) stemLenDist['80-99'] = (stemLenDist['80-99'] || 0) + 1;
        else if (stemLen <= 250) stemLenDist['100-250'] = (stemLenDist['100-250'] || 0) + 1;
        else stemLenDist['>250'] = (stemLenDist['>250'] || 0) + 1;
        
        // Show first few items with details
        if (scCount <= 5) {
            console.log(`  [${scCount}] ${qid} | CL="${cl}" | q_state="${qs}" | Stem: ${stemLen} chars`);
            console.log(`      Stem: "${(stem || '').substring(0, 120)}"`);
        }
    }
    
    console.log(`  Total Section C: ${scCount}`);
    console.log(`  Certified: ${scCertified}`);
    console.log(`  CognitiveLevel dist: ${JSON.stringify(clDist)}`);
    console.log(`  Stem length dist: ${JSON.stringify(stemLenDist)}`);
}

debugPack('pack_e_corrected.js');
debugPack('pack_a_corrected.js');
