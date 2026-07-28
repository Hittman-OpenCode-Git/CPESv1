// Session 720 - Sample extraction for Reliability Improvement Program
// Extracts 400 items: 200 Pack E, 100 Pack A (Sections A+E), 100 Controls (B/C/D)
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function loadPack(filename, varName) {
  const filepath = path.join(ROOT, filename);
  const data = fs.readFileSync(filepath, 'utf8');
  const fn = new Function(data + `; return ${varName};`);
  return fn();
}

// Load all packs
console.log('Loading packs...');
const packE = loadPack('pack_e_corrected.js', 'MCQ_BANK_E');
const packA = loadPack('pack_a_corrected.js', 'MCQ_BANK_A');
const packB = loadPack('pack_b_corrected.js', 'MCQ_BANK_B');
const packC = loadPack('pack_c_corrected.js', 'MCQ_BANK_C');
const packD = loadPack('pack_d_corrected.js', 'MCQ_BANK_D');

console.log(`Loaded: A=${packA.length}, B=${packB.length}, C=${packC.length}, D=${packD.length}, E=${packE.length}`);

function getChoices(item) {
  const c = {};
  if (typeof item.Choices === 'object' && item.Choices !== null) {
    for (const [k, v] of Object.entries(item.Choices)) {
      c[k] = v;
    }
  }
  return c;
}

function makeItemRecord(pack, item, idx) {
  return {
    pack: pack,
    QuestionID: item.QuestionID || `UNKNOWN_${idx}`,
    Section: item.Section || (item.Topic || '').substring(0, 1) || '',
    Stem: (item.Stem || '').substring(0, 300),
    Choices: getChoices(item),
    CorrectChoice: item.CorrectChoice || '',
    file_CL: item.CognitiveLevel || '',
    file_DS: item.DifficultyScore || 0,
    file_Diff: item.Difficulty || '',
    file_question_state: item.question_state || ''
  };
}

// --- SAMPLING ---

// Pack E: systematic sample (every Nth) from items that were Remember pre-S719
// S719 reclassified 386 Remember -> Understand. Use all 500 items with systematic sampling
const packE_items = packE.map((item, i) => makeItemRecord('E', item, i));
// Systematic: every 2nd or 3rd item to get ~200
const packE_sample = [];
for (let i = 0; i < packE_items.length; i += 2) {
  packE_sample.push(packE_items[i]);
}
// Trim to exactly 200
const packE_final = packE_sample.slice(0, 200);
console.log(`Pack E sample: ${packE_final.length}`);

// Pack A: Sections A and E, ~50 each
const packA_items = packA.map((item, i) => makeItemRecord('A', item, i));
const packA_sectionA = packA_items.filter(it => it.Section === 'A');
const packA_sectionE = packA_items.filter(it => it.Section === 'E');
// Systematic sample: every 2nd
const packA_A_sample = [];
for (let i = 0; i < packA_sectionA.length; i += 2) {
  packA_A_sample.push(packA_sectionA[i]);
}
const packA_E_sample = [];
for (let i = 0; i < packA_sectionE.length; i += 1) {
  packA_E_sample.push(packA_sectionE[i]);
}
const packA_final = [...packA_A_sample.slice(0, 50), ...packA_E_sample.slice(0, 50)];
console.log(`Pack A sample: ${packA_final.length} (A:${packA_A_sample.slice(0, 50).length}, E:${packA_E_sample.slice(0, 50).length})`);

// Controls: random 100 from B/C/D (33/33/34)
function sampleRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
const packB_items = packB.map((item, i) => makeItemRecord('B', item, i));
const packC_items = packC.map((item, i) => makeItemRecord('C', item, i));
const packD_items = packD.map((item, i) => makeItemRecord('D', item, i));
const controls = [
  ...sampleRandom(packB_items, 34),
  ...sampleRandom(packC_items, 33),
  ...sampleRandom(packD_items, 33)
].slice(0, 100);
console.log(`Controls sample: ${controls.length} (B:34, C:33, D:33)`);

const allSamples = [...packE_final, ...packA_final, ...controls];
console.log(`Total samples: ${allSamples.length}`);

// Output
const outPath = path.join(ROOT, 'reports', 'systematic_testing', 'SESSION720_SAMPLED_ITEMS.json');
fs.writeFileSync(outPath, JSON.stringify(allSamples, null, 2));
console.log(`Written to ${outPath}`);

// Print summary stats
for (const s of allSamples) {
  console.log(`${s.QuestionID}|${s.pack}|${s.Section}|CL=${s.file_CL}|DS=${s.file_DS}|CC=${s.file_question_state}`);
}
