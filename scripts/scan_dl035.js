// scan_dl035.js — Boundary-aware scan for DL-035 (Certified Domain F items with empty non-CC EW slots)
// Uses Function constructor to parse pack files

const fs = require('fs');
const path = require('path');

function loadPack(filename, varName) {
    const src = fs.readFileSync(filename, 'utf8');
    const fn = new Function(src + ';\nreturn ' + varName + ';');
    return fn();
}

function scanDL035(packData, packLabel) {
    const results = [];
    
    for (const item of packData) {
        if (!item.question_state || item.question_state !== 'Certified') continue;
        if (!item.QuestionID) continue;
        
        // Check if this is Domain F (Section F)
        const section = item.Section || '';
        if (section !== 'F') continue;
        
        const cc = item.CorrectChoice;
        if (!cc) continue;
        
        const emptyNonCC = [];
        
        for (const letter of ['A', 'B', 'C', 'D']) {
            if (letter === cc) continue;
            const ewKey = 'ExplanationWrong' + letter;
            const ewVal = item[ewKey];
            if (ewVal === '' || ewVal === undefined || ewVal === null) {
                emptyNonCC.push({ slot: letter, state: ewVal === '' ? 'empty' : 'absent' });
            }
        }
        
        if (emptyNonCC.length > 0) {
            results.push({
                QID: item.QuestionID,
                pack: packLabel,
                CorrectChoice: cc,
                emptyNonCCSlots: emptyNonCC,
                Stem: item.Stem ? item.Stem.substring(0, 80) + '...' : 'MISSING',
                Topic: item.Topic || 'N/A',
                choiceA: item.Choices ? item.Choices.A || item.Choices.a || '' : '',
                choiceB: item.Choices ? item.Choices.B || item.Choices.b || '' : '',
                choiceC: item.Choices ? item.Choices.C || item.Choices.c || '' : '',
                choiceD: item.Choices ? item.Choices.D || item.Choices.d || '' : '',
            });
        }
    }
    
    return results;
}

// Also verify DL-008 (non-empty EW[CC])
function scanDL008(packData) {
    const results = [];
    for (const item of packData) {
        if (!item.question_state || item.question_state !== 'Certified') continue;
        if (!item.QuestionID) continue;
        const section = item.Section || '';
        if (section !== 'F') continue;
        
        const cc = item.CorrectChoice;
        if (!cc) continue;
        const ewKey = 'ExplanationWrong' + cc;
        const ewVal = item[ewKey];
        if (ewVal && ewVal !== '') {
            results.push({ QID: item.QuestionID, CorrectChoice: cc, ewVal: ewVal.substring(0, 60) });
        }
    }
    return results;
}

console.log('=== DL-035 SCAN (Certified Domain F items with empty non-CC EW slots) ===\n');

const packC = loadPack('pack_c_corrected.js', 'MCQ_BANK_C');
console.log(`Pack C loaded: ${packC.length} items`);

const packD = loadPack('pack_d_corrected.js', 'MCQ_BANK_D');
console.log(`Pack D loaded: ${packD.length} items\n`);

const dl035C = scanDL035(packC, 'C');
const dl035D = scanDL035(packD, 'D');

console.log(`--- Pack C Domain F Certified DL-035 items: ${dl035C.length} ---`);
for (const r of dl035C) {
    const slots = r.emptyNonCCSlots.map(s => `EW_${s.slot}=${s.state}`).join(', ');
    console.log(`  ${r.QID}  CC=${r.CorrectChoice}  [${slots}]  Topic: ${r.Topic}`);
}

console.log(`\n--- Pack D Domain F Certified DL-035 items: ${dl035D.length} ---`);
for (const r of dl035D) {
    const slots = r.emptyNonCCSlots.map(s => `EW_${s.slot}=${s.state}`).join(', ');
    console.log(`  ${r.QID}  CC=${r.CorrectChoice}  [${slots}]  Topic: ${r.Topic}`);
}

console.log(`\n=== TOTAL DL-035: ${dl035C.length + dl035D.length} items ===`);

// DL-008 check
console.log('\n=== DL-008 CHECK (Certified Domain F items with non-empty EW[CC]) ===');
const dl008C = scanDL008(packC);
const dl008D = scanDL008(packD);
console.log(`Pack C: ${dl008C.length} DL-008 items`);
for (const r of dl008C) console.log(`  ${r.QID}  CC=${r.CorrectChoice}  EW[CC]="${r.ewVal}..."`);
console.log(`Pack D: ${dl008D.length} DL-008 items`);
for (const r of dl008D) console.log(`  ${r.QID}  CC=${r.CorrectChoice}  EW[CC]="${r.ewVal}..."`);

// Count Domain F Certified items
const fCertsC = packC.filter(i => i.question_state === 'Certified' && i.Section === 'F').length;
const fCertsD = packD.filter(i => i.question_state === 'Certified' && i.Section === 'F').length;
console.log(`\nDomain F Certified total: Pack C=${fCertsC}, Pack D=${fCertsD}, Combined=${fCertsC + fCertsD}`);

// Output JSON
const output = {
    scan_timestamp: new Date().toISOString(),
    pack_c_items: packC.length,
    pack_d_items: packD.length,
    domain_f_certified_packC: fCertsC,
    domain_f_certified_packD: fCertsD,
    dl035_items: [...dl035C, ...dl035D],
    dl008_items: [...dl008C, ...dl008D],
    total_dl035: dl035C.length + dl035D.length,
    total_dl008: dl008C.length + dl008D.length,
};
fs.writeFileSync('scripts/output/DL035_SCAN_RESULTS.json', JSON.stringify(output, null, 2));
console.log('\nWrote scripts/output/DL035_SCAN_RESULTS.json');
