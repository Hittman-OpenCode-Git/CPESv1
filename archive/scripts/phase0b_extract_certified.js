// Phase 0B — Extract all Certified QIDs from each pack file
// Uses Function constructor for packs that support it, regex fallback otherwise
const fs = require('fs');
const path = require('path');

const WORKDIR = path.resolve(__dirname, '..');

function tryFunctionParse(filename, varName) {
    const filepath = path.join(WORKDIR, filename);
    const code = fs.readFileSync(filepath, 'utf8');
    try {
        const fn = new Function(code + '; return ' + varName + ';');
        const arr = fn();
        return { success: true, data: arr, error: null };
    } catch (e) {
        return { success: false, data: null, error: e.message };
    }
}

function extractCertifiedFromArray(arr, packLabel) {
    const certified = [];
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        if (!obj || typeof obj !== 'object') continue;
        const qid = obj.QuestionID;
        const state = obj.question_state;
        if (state === 'Certified' && qid) {
            certified.push({ QID: qid, pack: packLabel, line: i });
        }
    }
    return certified;
}

// Handle paired-object architecture (Pack A): every 2 objects = 1 QID
// Object 0 = metadata block (has question_state), Object 1 = content block
function extractCertifiedPaired(arr, packLabel) {
    const certified = [];
    for (let i = 0; i < arr.length; i += 2) {
        const meta = arr[i];
        const content = arr[i + 1];
        if (!meta || typeof meta !== 'object') continue;
        const qid = meta.QuestionID;
        const state = meta.question_state;
        if (state === 'Certified' && qid) {
            certified.push({ QID: qid, pack: packLabel, line: i });
        }
    }
    return certified;
}

const results = {};

// Pack B — single object, known to parse
console.log('=== Pack B ===');
const packB = tryFunctionParse('pack_b_corrected.js', 'MCQ_BANK_B');
if (packB.success) {
    const certB = extractCertifiedFromArray(packB.data, 'B');
    results.B = certB;
    console.log(`Pack B: ${packB.data.length} objects, ${certB.length} Certified`);
} else {
    console.log(`Pack B parse failed: ${packB.error}`);
}

// Pack D — single object
console.log('\n=== Pack D ===');
const packD = tryFunctionParse('pack_d_corrected.js', 'MCQ_BANK_D');
if (packD.success) {
    const certD = extractCertifiedFromArray(packD.data, 'D');
    results.D = certD;
    console.log(`Pack D: ${packD.data.length} objects, ${certD.length} Certified`);
} else {
    console.log(`Pack D parse failed: ${packD.error}`);
}

// Pack E — single object
console.log('\n=== Pack E ===');
const packE = tryFunctionParse('pack_e_corrected.js', 'MCQ_BANK_E');
if (packE.success) {
    const certE = extractCertifiedFromArray(packE.data, 'E');
    results.E = certE;
    console.log(`Pack E: ${packE.data.length} objects, ${certE.length} Certified`);
} else {
    console.log(`Pack E parse failed: ${packE.error}`);
}

// Pack C — may have syntax issue
console.log('\n=== Pack C ===');
const packC = tryFunctionParse('pack_c_corrected.js', 'MCQ_BANK_C');
if (packC.success) {
    const certC = extractCertifiedFromArray(packC.data, 'C');
    results.C = certC;
    console.log(`Pack C: ${packC.data.length} objects, ${certC.length} Certified`);
} else {
    console.log(`Pack C parse failed: ${packC.error}`);
}

// Pack A — paired-object architecture
console.log('\n=== Pack A ===');
const packA = tryFunctionParse('pack_a_corrected.js', 'MCQ_BANK_A');
if (packA.success) {
    console.log(`Pack A: ${packA.data.length} raw objects`);
    const certA = extractCertifiedPaired(packA.data, 'A');
    results.A = certA;
    console.log(`Pack A Certified: ${certA.length}`);
} else {
    console.log(`Pack A parse failed: ${packA.error}`);
}

// Summary
console.log('\n=== SUMMARY ===');
let total = 0;
for (const [pack, items] of Object.entries(results)) {
    console.log(`Pack ${pack}: ${items.length} Certified`);
    total += items.length;
}
console.log(`Total: ${total}`);

// Write CSV
let csv = 'Pack,QID\n';
for (const [pack, items] of Object.entries(results)) {
    for (const item of items) {
        csv += `${pack},${item.QID}\n`;
    }
}
const outPath = path.join(WORKDIR, 'reports', 'phase0b_certified_qid_list.csv');
fs.writeFileSync(outPath, csv);
console.log(`\nWrote ${outPath}`);

// Also write JSON
const jsonPath = path.join(WORKDIR, 'reports', 'phase0b_certified_qid_list.json');
fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
console.log(`Wrote ${jsonPath}`);
