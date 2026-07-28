// Session 718 — Agent A: Full MCQ Metadata Census
// Extracts ItemID, Section, Topic, Difficulty, CognitiveLevel, question_state, type classification
const fs = require('fs');
const path = require('path');

const PACKS = [
  { name: 'pack_a', file: 'pack_a_corrected.js', varName: 'pack_a' },
  { name: 'pack_b', file: 'pack_b_corrected.js', varName: 'pack_b' },
  { name: 'pack_c', file: 'pack_c_corrected.js', varName: 'pack_c' },
  { name: 'pack_d', file: 'pack_d_corrected.js', varName: 'pack_d' },
  { name: 'pack_e', file: 'pack_e_corrected.js', varName: 'pack_e' },
];

const root = path.join(__dirname, '..');
const results = {};

function classifyType(item) {
  // Check for numeric answer type
  if (item.Type && item.Type.toLowerCase() === 'numeric') return 'numeric';
  if (item.Correct && typeof item.Correct === 'string' && /^\d+$/.test(item.Correct.trim())) return 'numeric';
  // Check if stem asks for a calculation
  if (item.Stem && /\b(calculate|compute|what is the|how much|how many|enter|amount|total)\b/i.test(item.Stem)) {
    return 'conceptual'; // default unless clearly numeric
  }
  if (item.CalculationRequired === true) return 'numeric';
  return 'conceptual';
}

for (const pack of PACKS) {
  const filePath = path.join(root, pack.file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the array portion
  const varDeclIdx = content.indexOf(`var ${pack.varName}`);
  const eqIdx = content.indexOf('=', varDeclIdx);
  const bracketIdx = content.indexOf('[', eqIdx);
  
  // Use Function constructor to get the array
  // Find matching closing bracket
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let endIdx = -1;
  
  for (let i = bracketIdx; i < content.length; i++) {
    const ch = content[i];
    
    if (inString) {
      if (ch === '\\') { i++; continue; }
      if (ch === stringChar) { inString = false; }
      continue;
    }
    
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }
    
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) { endIdx = i + 1; break; }
    }
  }
  
  if (endIdx === -1) {
    console.error(`Could not find end of array for ${pack.name}`);
    continue;
  }
  
  const arrayStr = content.substring(bracketIdx, endIdx);
  const items = new Function('return ' + arrayStr)();
  
  const packData = [];
  for (const item of items) {
    packData.push({
      QuestionID: item.QuestionID || 'UNKNOWN',
      Section: item.Section || item.Part || 'UNKNOWN',
      Topic: item.Topic || '',
      Difficulty: item.Difficulty || '',
      DifficultyScore: item.DifficultyScore || null,
      CognitiveLevel: item.CognitiveLevel || null,
      question_state: item.question_state || item.pack_state || 'MISSING',
      Type: classifyType(item),
      StemPreview: item.Stem ? item.Stem.substring(0, 120) : '',
      CorrectChoice: item.CorrectChoice || '',
      Choices: item.Choices ? Object.values(item.Choices).join(' | ') : '',
    });
  }
  
  results[pack.name] = {
    file: pack.file,
    totalItems: packData.length,
    withCognitiveLevel: packData.filter(i => i.CognitiveLevel).length,
    withoutCognitiveLevel: packData.filter(i => !i.CognitiveLevel).length,
    certified: packData.filter(i => i.question_state === 'Certified').length,
    bySection: {},
    items: packData,
  };
  
  // Section breakdown
  for (const item of packData) {
    const sec = item.Section;
    if (!results[pack.name].bySection[sec]) {
      results[pack.name].bySection[sec] = { total: 0, certified: 0, withCL: 0, withoutCL: 0, numeric: 0, conceptual: 0 };
    }
    results[pack.name].bySection[sec].total++;
    if (item.question_state === 'Certified') results[pack.name].bySection[sec].certified++;
    if (item.CognitiveLevel) results[pack.name].bySection[sec].withCL++;
    else results[pack.name].bySection[sec].withoutCL++;
    if (item.Type === 'numeric') results[pack.name].bySection[sec].numeric++;
    else results[pack.name].bySection[sec].conceptual++;
  }
  
  console.log(`${pack.name}: ${packData.length} items, ${results[pack.name].certified} Certified, ${results[pack.name].withCognitiveLevel} with CL`);
}

// Summary
const summary = {
  generated: new Date().toISOString(),
  totalItems: 0,
  totalCertified: 0,
  totalWithCL: 0,
  totalWithoutCL: 0,
  totalNumeric: 0,
  totalConceptual: 0,
  packs: {},
};

for (const [name, data] of Object.entries(results)) {
  summary.totalItems += data.totalItems;
  summary.totalCertified += data.certified;
  summary.totalWithCL += data.withCognitiveLevel;
  summary.totalWithoutCL += data.withoutCognitiveLevel;
  summary.packs[name] = {
    file: data.file,
    total: data.totalItems,
    certified: data.certified,
    withCL: data.withCognitiveLevel,
    withoutCL: data.withoutCognitiveLevel,
    sections: Object.keys(data.bySection),
  };
  
  const numeric = Object.values(data.bySection).reduce((s, v) => s + v.numeric, 0);
  const conceptual = Object.values(data.bySection).reduce((s, v) => s + v.conceptual, 0);
  summary.totalNumeric += numeric;
  summary.totalConceptual += conceptual;
  summary.packs[name].numeric = numeric;
  summary.packs[name].conceptual = conceptual;
}

results.summary = summary;

const outPath = path.join(root, 'reports', 'session_status', 'SESSION718_MCQ_METADATA_CENSUS.json');
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\nCensus written to: ${outPath}`);
console.log(`\nSUMMARY:`);
console.log(`Total items: ${summary.totalItems}`);
console.log(`Certified: ${summary.totalCertified}`);
console.log(`With CognitiveLevel: ${summary.totalWithCL}`);
console.log(`Without CognitiveLevel: ${summary.totalWithoutCL}`);
console.log(`Numeric: ${summary.totalNumeric}, Conceptual: ${summary.totalConceptual}`);
console.log(`\nPer Pack:`);
for (const [name, p] of Object.entries(summary.packs)) {
  console.log(`  ${name}: ${p.total} items, ${p.certified} Certified, ${p.withCL} CL, ${p.withoutCL} no-CL, ${p.numeric} num, ${p.conceptual} con`);
}
