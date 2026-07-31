// S69 Cognitive Gap Measurement — Read-Only Scan
// Extracts CognitiveLevel, question_state, Section, QuestionID from all 5 packs

const fs = require('fs');
const path = require('path');

const packDefs = [
  { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A', label: 'Pack A' },
  { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B', label: 'Pack B' },
  { file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C', label: 'Pack C' },
  { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D', label: 'Pack D' },
  { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E', label: 'Pack E' },
];

const COGNITIVE_LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];

function loadPack(filePath, varName) {
  const src = fs.readFileSync(filePath, 'utf8');
  const fn = new Function(src + '; return ' + varName + ';');
  return fn();
}

function emptyCognitive() {
  const obj = {};
  for (const cl of COGNITIVE_LEVELS) obj[cl] = 0;
  return obj;
}

function emptySectionCognitive() {
  const obj = {};
  for (const cl of COGNITIVE_LEVELS) obj[cl] = 0;
  obj.total = 0;
  return obj;
}

// ---- Gather all items ----
const allItems = [];
for (const pd of packDefs) {
  const filePath = path.join(__dirname, '..', pd.file);
  const items = loadPack(filePath, pd.varName);
  for (const item of items) {
    allItems.push({
      pack: pd.label,
      cognitiveLevel: item.CognitiveLevel || 'Unknown',
      questionState: item.question_state || 'Unknown',
      section: item.Section || 'Unknown',
      questionID: item.QuestionID || 'Unknown',
    });
  }
}

console.log(`Total items loaded: ${allItems.length}`);

// ---- Summary ----
const totalItems = allItems.length;
const certifiedItems = allItems.filter(i => i.questionState === 'Certified');
const totalCertified = certifiedItems.length;

// ---- Cognitive Profile (inventory-wide) ----
const cogProfile = {};
for (const cl of COGNITIVE_LEVELS) {
  const count = allItems.filter(i => i.cognitiveLevel === cl).length;
  const certCount = certifiedItems.filter(i => i.cognitiveLevel === cl).length;
  cogProfile[cl] = {
    count,
    pct: totalItems > 0 ? Math.round((count / totalItems) * 1000) / 10 : 0,
    certified_count: certCount
  };
}

// Higher-order = Analyze + Evaluate
const hoCount = (cogProfile['Analyze']?.count || 0) + (cogProfile['Evaluate']?.count || 0);
const hoPct = totalItems > 0 ? Math.round((hoCount / totalItems) * 1000) / 10 : 0;
const certHoCount = (cogProfile['Analyze']?.certified_count || 0) + (cogProfile['Evaluate']?.certified_count || 0);
const certHoPct = totalCertified > 0 ? Math.round((certHoCount / totalCertified) * 1000) / 10 : 0;

const summary = {
  total_items: totalItems,
  higher_order_thinking_count: hoCount,
  higher_order_thinking_pct: hoPct,
  certified_total: totalCertified,
  certified_higher_order_count: certHoCount,
  certified_higher_order_pct: certHoPct
};

// ---- By Pack ----
const byPack = {};
for (const pd of packDefs) {
  const packItems = allItems.filter(i => i.pack === pd.label);
  const packCertified = packItems.filter(i => i.questionState === 'Certified');
  const entry = {};
  for (const cl of COGNITIVE_LEVELS) {
    entry[cl] = packItems.filter(i => i.cognitiveLevel === cl).length;
  }
  entry.total = packItems.length;
  entry.certified = packCertified.length;
  byPack[pd.label] = entry;
}

// ---- By Section ----
const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
const bySection = {};
for (const sec of sections) {
  const secItems = allItems.filter(i => i.section === sec);
  const entry = { total: secItems.length };
  for (const cl of COGNITIVE_LEVELS) {
    entry[cl] = secItems.filter(i => i.cognitiveLevel === cl).length;
  }
  bySection[sec] = entry;
}

// ---- Certified By Section ----
const certifiedBySection = {};
for (const sec of sections) {
  const secCertItems = certifiedItems.filter(i => i.section === sec);
  const entry = { total: secCertItems.length };
  for (const cl of COGNITIVE_LEVELS) {
    entry[cl] = secCertItems.filter(i => i.cognitiveLevel === cl).length;
  }
  certifiedBySection[sec] = entry;
}

// ---- Build output ----
const output = {
  session: 'S69',
  board: 'cognitive-inventory-board',
  timestamp: new Date().toISOString(),
  read_only: true,
  summary,
  cognitive_profile: cogProfile,
  by_pack: byPack,
  by_section: bySection,
  certified_by_section: certifiedBySection
};

// ---- Write ----
const outDir = path.join(__dirname, '..', 'reports', 'session_69');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'SESSION069_COGNITIVE_BASELINE.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`Wrote: ${outPath}`);
console.log(`\n=== SUMMARY ===`);
console.log(`Total items: ${totalItems}`);
console.log(`Certified: ${totalCertified}`);
console.log(`Higher-order (Analyze+Evaluate): ${hoCount} (${hoPct}%)`);
console.log(`Certified higher-order: ${certHoCount} (${certHoPct}%)`);
console.log(`\n=== COGNITIVE PROFILE ===`);
for (const cl of COGNITIVE_LEVELS) {
  const d = cogProfile[cl];
  console.log(`${cl.padEnd(12)} ${String(d.count).padStart(6)} (${String(d.pct).padStart(5)}%)  Certified: ${d.certified_count}`);
}
console.log(`\n=== BY PACK ===`);
for (const pd of packDefs) {
  const d = byPack[pd.label];
  const parts = COGNITIVE_LEVELS.map(cl => `${cl[0]}:${d[cl]}`);
  console.log(`${pd.label.padEnd(8)} total:${d.total} cert:${d.certified}  ${parts.join(' ')}`);
}
console.log(`\n=== BY SECTION ===`);
for (const sec of sections) {
  const d = bySection[sec];
  const parts = COGNITIVE_LEVELS.map(cl => `${cl[0]}:${d[cl]}`);
  console.log(`Section ${sec.padEnd(2)} total:${String(d.total).padStart(4)}  ${parts.join(' ')}`);
}
console.log(`\n=== CERTIFIED BY SECTION ===`);
for (const sec of sections) {
  const d = certifiedBySection[sec];
  const parts = COGNITIVE_LEVELS.map(cl => `${cl[0]}:${d[cl]}`);
  console.log(`Section ${sec.padEnd(2)} total:${String(d.total).padStart(4)}  ${parts.join(' ')}`);
}
console.log(`\nDone.`);
