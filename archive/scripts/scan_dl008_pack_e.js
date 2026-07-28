const fs = require('fs');
const path = require('path');

console.log('=== DL-008/DL-018/DL-025/DL-026 Scan: Pack E Certified Items ===\n');

// 1. Load the file
const filePath = 'pack_e_corrected.js';
const code = fs.readFileSync(filePath, 'utf8');

// 2. Parse using Function constructor
let parseCode = code.replace('const MCQ_BANK_E =', 'global.MCQ_BANK_E =');
new Function(parseCode)();
const bank = global.MCQ_BANK_E;

console.log(`Total items in MCQ_BANK_E: ${bank.length}\n`);

// 3. Filter for Certified
const certified = bank.filter(q => q.question_state === 'Certified');
console.log(`Certified items: ${certified.length}\n`);

// 4. Scan for DL-008, DL-018, DL-025/DL-026
const dl008 = [];
const dl018 = [];
const dl025 = [];

const allLetters = ['A', 'B', 'C', 'D'];

for (const q of certified) {
  const qid = q.QuestionID || 'UNKNOWN';
  const cc = q.CorrectChoice;
  const section = q.Section || 'UNKNOWN';

  if (!cc) {
    console.log(`WARNING: ${qid} has no CorrectChoice`);
    continue;
  }

  const ccField = 'ExplanationWrong' + cc;

  // DL-008: field exists and non-empty at CC position
  if (ccField in q && typeof q[ccField] === 'string' && q[ccField].trim() !== '') {
    dl008.push({
      qid,
      section,
      cc,
      preview: q[ccField].substring(0, 200)
    });
  }

  // DL-018: field does not exist at CC position
  if (!(ccField in q)) {
    dl018.push({
      qid,
      section,
      cc
    });
  }

  // DL-025/DL-026: check non-CC slots for empty/missing
  for (const L of allLetters) {
    if (L === cc) continue; // skip CC slot
    const field = 'ExplanationWrong' + L;
    if (!(field in q)) {
      // Field absent entirely
      dl025.push({
        qid,
        section,
        cc,
        slot: L,
        reason: 'ABSENT (field does not exist)'
      });
    } else if (typeof q[field] !== 'string' || q[field].trim() === '') {
      // Field exists but empty
      dl025.push({
        qid,
        section,
        cc,
        slot: L,
        reason: 'EMPTY (field exists but is "" or whitespace-only)'
      });
    }
  }
}

// 5. Print results

console.log('='.repeat(80));
console.log('DL-008: ExplanationWrong[CorrectChoice] is NON-EMPTY');
console.log('='.repeat(80));
console.log(`Count: ${dl008.length}\n`);
if (dl008.length === 0) {
  console.log('  (none)\n');
} else {
  for (const item of dl008) {
    console.log(`  QID: ${item.qid}`);
    console.log(`  Section: ${item.section}`);
    console.log(`  CorrectChoice: ${item.cc}`);
    console.log(`  ExplanationWrong${item.cc} content (first 200 chars):`);
    console.log(`  "${item.preview}"`);
    console.log();
  }
}

console.log('='.repeat(80));
console.log('DL-018: ExplanationWrong[CorrectChoice] field ABSENT (undefined)');
console.log('='.repeat(80));
console.log(`Count: ${dl018.length}\n`);
if (dl018.length === 0) {
  console.log('  (none)\n');
} else {
  for (const item of dl018) {
    console.log(`  QID: ${item.qid}  Section: ${item.section}  CorrectChoice: ${item.cc}`);
  }
  console.log();
}

console.log('='.repeat(80));
console.log('DL-025/DL-026: Non-CC ExplanationWrong slots that are EMPTY or ABSENT');
console.log('='.repeat(80));
console.log(`Count: ${dl025.length}\n`);
if (dl025.length === 0) {
  console.log('  (none)\n');
} else {
  // Group by QID for readability
  const grouped = {};
  for (const item of dl025) {
    if (!grouped[item.qid]) grouped[item.qid] = [];
    grouped[item.qid].push(item);
  }
  console.log(`Affected QIDs: ${Object.keys(grouped).length}\n`);
  for (const [qid, items] of Object.entries(grouped)) {
    console.log(`  QID: ${qid}  Section: ${items[0].section}  CorrectChoice: ${items[0].cc}`);
    for (const slot of items) {
      console.log(`    Slot ${slot.slot}: ${slot.reason}`);
    }
    console.log();
  }
}

console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`Total items in MCQ_BANK_E:       ${bank.length}`);
console.log(`Total Certified items:            ${certified.length}`);
console.log(`DL-008 violations (non-empty CC): ${dl008.length}`);
console.log(`DL-018 violations (absent CC):    ${dl018.length}`);
console.log(`DL-025/DL-026 empty/absent slots: ${dl025.length} (across ${Object.values(dl025.reduce((g, i) => { g[i.qid] = (g[i.qid] || 0) + 1; return g; }, {})).length} QIDs)`);
