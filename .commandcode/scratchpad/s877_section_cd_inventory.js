// S877-A: Section C/D inventory scanner
const fs = require('fs');

const PACKS = [
  { file: 'pack_a_corrected.js', varname: 'MCQ_BANK_A' },
  { file: 'pack_b_corrected.js', varname: 'MCQ_BANK_B' },
  { file: 'pack_c_corrected.js', varname: 'MCQ_BANK_C' },
  { file: 'pack_d_corrected.js', varname: 'MCQ_BANK_D' },
  { file: 'pack_e_corrected.js', varname: 'MCQ_BANK_E' },
];

const allCdItems = [];
let grandTotal = 0, grandCert = 0, grandUnproc = 0, grandInAudit = 0;
let grandC = 0, grandD = 0, grandCF = 0, grandDF = 0;

PACKS.forEach(({ file, varname }) => {
  const content = fs.readFileSync(file, 'utf8');
  // Pack A uses 'var', B-E use 'const'. Normalize.
  // Strip BOM if present (Pack C)
  let mod = content.replace(/^\uFEFF/, '').replace(/^const /, 'var ').replace(/^var /m, 'var ');
  let bank;
  try {
    eval(mod);
    bank = eval(varname);
  } catch (e) {
    console.log(`${file}: EVAL FAILED — ${e.message}`);
    return;
  }
  if (!Array.isArray(bank)) {
    console.log(`${file}: NOT AN ARRAY`);
    return;
  }

  const packLabel = file.replace('_corrected.js', '').toUpperCase();
  let total = 0, cert = 0, unproc = 0, inaudit = 0, ct = 0, dt = 0, ft = 0;

  bank.forEach(q => {
    total++;
    const s = q.question_state || '';
    const sec = (q.Section || '').trim();
    if (s === 'Certified') cert++;
    if (s === 'Unprocessed') unproc++;
    if (s === 'In Audit') inaudit++;
    if (sec === 'C') { ct++;
      allCdItems.push({ pack: packLabel, qid: q.QuestionID || '?', section: sec, state: s, topic: q.Topic || '', cleft: q.CognitiveLevel || '' });
    }
    if (sec === 'D') { dt++;
      allCdItems.push({ pack: packLabel, qid: q.QuestionID || '?', section: sec, state: s, topic: q.Topic || '', cleft: q.CognitiveLevel || '' });
    }
    if (sec === 'F') ft++;
  });

  grandTotal += total; grandCert += cert; grandUnproc += unproc; grandInAudit += inaudit;
  grandC += ct; grandD += dt; grandCF += ft;
  console.log(`${file}: total=${total} cert=${cert} unproc=${unproc} inaudit=${inaudit} | SecC=${ct} SecD=${dt} SecF=${ft}`);
});

console.log(`\nGRAND: total=${grandTotal} cert=${grandCert} unproc=${grandUnproc} inaudit=${grandInAudit} | SecC=${grandC} SecD=${grandD} SecF=${grandCF}`);
console.log(`\nSec C+D items extracted: ${allCdItems.length}`);

// Group by certification state
const unprocCd = allCdItems.filter(q => q.state !== 'Certified');
const certCd = allCdItems.filter(q => q.state === 'Certified');
console.log(`\n  Certified C/D: ${certCd.length}`);
console.log(`  Non-Cert C/D: ${unprocCd.length} (Unprocessed: ${unprocCd.filter(q=>q.state==='Unprocessed').length}, In Audit: ${unprocCd.filter(q=>q.state==='In Audit').length})`);

// Write inventory
fs.writeFileSync('.commandcode/scratchpad/s877_cd_inventory.json', JSON.stringify({ items: allCdItems, summary: { total: allCdItems.length, cert: certCd.length, unproc: unprocCd.length, byPack: PACKS.reduce((a,p) => { a[p.file]=allCdItems.filter(q=>q.pack===p.file.replace('_corrected.js','').toUpperCase()).length; return a; }, {}) } }, null, 2));
console.log('\nWritten to .commandcode/scratchpad/s877_cd_inventory.json');
