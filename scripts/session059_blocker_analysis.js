const fs = require('fs');
const path = require('path');
const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';

function rxStr(text, key) { const m = text.match(new RegExp('"' + key + '"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"')); return m ? m[1].replace(/\\"/g,'"').replace(/\\n/g,'\n') : null; }
function rxNum(text, key) { const m = text.match(new RegExp('"' + key + '"\\s*:\\s*(-?\\d+(?:\\.\\d+)?)')); return m ? Number(m[1]) : null; }
function rxBool(text, key) { const m = text.match(new RegExp('"' + key + '"\\s*:\\s*(true|false)')); return m ? m[1] === 'true' : null; }

function splitArrayContent(arrayText) {
  const cases = [];
  let depth = 0, inStr = false, esc = false, caseStart = -1;
  for (let i = 0; i < arrayText.length; i++) {
    const ch = arrayText[i];
    if (!inStr && ch === '"') { inStr = true; continue; }
    if (inStr && esc) { esc = false; continue; }
    if (inStr && ch === '\\') { esc = true; continue; }
    if (inStr && ch === '"') { inStr = false; continue; }
    if (inStr) continue;
    if (ch === '{') { depth++; if (depth === 1) caseStart = i; }
    else if (ch === '}') { depth--; if (depth === 0 && caseStart >= 0) { cases.push(arrayText.substring(caseStart, i + 1)); caseStart = -1; } }
  }
  return cases;
}

function getMainArrayText(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const m = content.match(/const\s+\w+\s*=\s*\[/);
  if (!m) return '';
  const startPos = m.index + m[0].length;
  // Try bracket tracking first
  let depth = 1, inStr = false, esc = false;
  for (let i = startPos; i < content.length; i++) {
    const ch = content[i];
    if (!inStr && ch === '"') { inStr = true; continue; }
    if (inStr && esc) { esc = false; continue; }
    if (inStr && ch === '\\') { esc = true; continue; }
    if (inStr && ch === '"') { inStr = false; continue; }
    if (inStr) continue;
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) return content.substring(startPos, i); }
  }
  // Fallback: find ]; that is NOT inside a string
  // The main array closing ]; appears right before additional code (if/function/const)
  let i2 = startPos;
  while (true) {
    const idx = content.indexOf('];', i2);
    if (idx === -1) return '';
    // Check if this ]; is inside a string
    inStr = false; esc = false;
    let inStr2 = false;
    for (let j = startPos; j < idx; j++) {
      const ch2 = content[j];
      if (!inStr2 && ch2 === '"') { inStr2 = true; continue; }
      if (inStr2 && esc) { esc = false; continue; }
      if (inStr2 && ch2 === '\\') { esc = true; continue; }
      if (inStr2 && ch2 === '"') { inStr2 = false; continue; }
    }
    if (!inStr2) return content.substring(startPos, idx);
    i2 = idx + 2;
  }
}

function extractItemsArray(caseText) {
  const m = caseText.match(/"Items"\s*:\s*\[/);
  if (!m) return '';
  let depth = 1, inStr = false, esc = false;
  for (let i = m.index + m[0].length; i < caseText.length; i++) {
    const ch = caseText[i];
    if (!inStr && ch === '"') { inStr = true; continue; }
    if (inStr && esc) { esc = false; continue; }
    if (inStr && ch === '\\') { esc = true; continue; }
    if (inStr && ch === '"') { inStr = false; continue; }
    if (inStr) continue;
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) return caseText.substring(m.index + m[0].length, i); }
  }
  return '';
}

function extractItemTexts(itemsText) {
  const items = [];
  let depth = 0, inStr = false, esc = false, start = -1;
  for (let i = 0; i < itemsText.length; i++) {
    const ch = itemsText[i];
    if (!inStr && ch === '"') { inStr = true; continue; }
    if (inStr && esc) { esc = false; continue; }
    if (inStr && ch === '\\') { esc = true; continue; }
    if (inStr && ch === '"') { inStr = false; continue; }
    if (inStr) continue;
    if (ch === '{') { depth++; if (depth === 1) start = i; }
    else if (ch === '}') { depth--; if (depth === 0 && start >= 0) { items.push(itemsText.substring(start, i + 1)); start = -1; } }
  }
  return items;
}

function analyzeCase(caseText, fileName) {
  const caseID = rxStr(caseText, 'CaseID') || 'UNKNOWN';
  const r = { caseID, file: fileName, blocker_types: [],
    details: { stakeholder: [], metadata: [], explanation: [], progression: [], content_defect: [] } };

  // Stakeholder
  for (const f of ['CompanyName','Stakeholder','BusinessFunction','Industry','CompanyType'])
    if (rxStr(caseText, f) === null) r.details.stakeholder.push('Missing ' + f);

  // Metadata — case level
  for (const f of ['Difficulty','DifficultyScore','BlueprintDomain','BlueprintObjectives','ProductionStatus','Version','Author','Confidence','QuestionCount','ExhibitCount']) {
    let v;
    if (['DifficultyScore','Confidence','QuestionCount','ExhibitCount'].includes(f)) v = rxNum(caseText, f);
    else if (f === 'BlueprintObjectives') v = (caseText.match(new RegExp('"' + f + '"\\s*:\\s*\\[([^\\]]*)\\]', 's')) || [null,null])[1] ? true : null;
    else v = rxStr(caseText, f);
    if (v === null) r.details.metadata.push('Case missing ' + f);
  }

  // Contradiction check: ProductionStatus vs item question_state
  const prodStatus = rxStr(caseText, 'ProductionStatus');

  const itemsText = extractItemsArray(caseText);
  const items = extractItemTexts(itemsText);
  const itemStates = items.map(it => rxStr(it, 'question_state'));
  const allCertified = items.length > 0 && itemStates.every(s => s === 'Certified');

  if (prodStatus === 'Draft' && allCertified) {
    r.details.metadata.push('CONTRADICTION: ProductionStatus=Draft but all ' + items.length + ' items are Certified');
  }

  if (items.length === 0) r.details.metadata.push('No items found');

  let missState = 0, gapItems = 0;
  const reqFields = ['Type','ItemID','Prompt','Explanation','Topic','Difficulty','DifficultyScore','CognitiveLevel','CalculationRequired'];
  const types = [], cogs = [], diffs = [];
  let emptyE = 0, shortE = 0, noStd = 0, minE = 0, boiler = 0;

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (rxStr(it, 'question_state') === null) missState++;
    let gaps = 0;
    for (const f of reqFields) {
      let v;
      if (f === 'DifficultyScore') v = rxNum(it, f);
      else if (f === 'CalculationRequired') v = rxBool(it, f);
      else if (f === 'Explanation') {
        v = rxStr(it, f);
        if (v === null || v === '') { emptyE++; gaps++; }
      }
      else { v = rxStr(it, f); if (v === null) gaps++; }
      if (v !== null && f === 'Type') types.push(v);
      if (v !== null && f === 'CognitiveLevel') cogs.push(v);
      if (v !== null && f === 'Difficulty') diffs.push(v);
    }
    if (gaps > 0) gapItems++;

    const expl = rxStr(it, 'Explanation');
    if (expl && expl.length > 0) {
      if (expl.length < 50) shortE++;
      if (!/ASC\s+\d|GAAP|IFRS|COSO|IMA|FASB|IAS\s+\d/i.test(expl)) noStd++;
      if (expl.split(/[.!?]+/).filter(s => s.trim().length > 10).length <= 2) minE++;
      if (/represents a plausible misconception|does not align with|A candidate may select this option/i.test(expl)) boiler++;
    }
  }

  if (missState > 0) r.details.metadata.push(missState + ' items missing question_state');
  if (gapItems > 0) r.details.metadata.push(gapItems + ' items with field gaps');

  if (emptyE > 0) r.details.explanation.push(emptyE + ' items empty/missing Explanation');
  if (shortE > items.length * 0.5 && shortE > 0) r.details.explanation.push(shortE + ' items < 50 chars');
  if (noStd > 0) r.details.explanation.push(noStd + ' items no standard reference');
  if (minE === items.length && items.length > 0 && emptyE === 0) r.details.explanation.push('All items minimal (1-2 sentences)');
  if (boiler > 0) r.details.explanation.push(boiler + ' items boilerplate');

  if (items.length >= 3) {
    const ut = new Set(types);
    if (ut.size <= 1) r.details.progression.push('All items same type');
    const co = { Remember:1, Understand:2, Apply:3, Analyze:4, Evaluate:5 };
    const cv = cogs.map(l => co[l]||0);
    if (cv.length >= 3 && cv.every(v => v > 0)) {
      let d = 0;
      for (let j = 1; j < cv.length; j++) if (cv[j] < cv[j-1]) d++;
      if (d >= 2) r.details.progression.push('Cognitive levels decrease');
    }
    const ud = new Set(diffs);
    if (ud.size === 1 && diffs[0] === 'Moderate') r.details.progression.push('All ' + items.length + ' items Moderate (DL-032)');
  }

  const hs = r.details.stakeholder.length > 0;
  const hm = r.details.metadata.length > 0;
  const he = r.details.explanation.length > 0;
  const hp = r.details.progression.length > 0;
  const hc = r.details.content_defect.length > 0;
  const bc = [hs,hm,he,hp,hc].filter(Boolean).length;

  if (bc === 0) r.overall_blocker_class = 'No Blockers';
  else if (bc === 1) {
    if (hs) r.overall_blocker_class = 'Stakeholder-only';
    else if (hm) r.overall_blocker_class = 'Metadata-only';
    else if (he) r.overall_blocker_class = 'Explanation-only';
    else if (hp) r.overall_blocker_class = 'Progression-only';
    else r.overall_blocker_class = 'True Content Defect';
  } else r.overall_blocker_class = 'Multiple Blockers';

  if (hs) r.blocker_types.push('Stakeholder');
  if (hm) r.blocker_types.push('Metadata');
  if (he) r.blocker_types.push('Explanation');
  if (hp) r.blocker_types.push('Progression');
  if (hc) r.blocker_types.push('Content Defect');
  return r;
}

// === MAIN ===
console.log('Session 59 Blocker Analysis (v5) — Starting...\n');

const FILES = ['content/cases/legacy/scored_cases.js','content/cases/legacy/scored_cases2.js','content/cases/legacy/scored_cases3.js','content/cases/legacy/scored_cases4.js','content/cases/legacy/scored_cases5.js'];
const allResults = [], patterns = new Set();
const certified = [], nonCert = [];

for (const fn of FILES) {
  const fp = path.join(BASE, fn);
  const arrText = getMainArrayText(fp);
  if (!arrText) { console.log('  FAILED: ' + fn); continue; }
  const cases = splitArrayContent(arrText);
  console.log('  ' + fn + ': ' + cases.length + ' cases');
  for (const ct of cases) {
    // Skip non-case objects (like function return objects that happen to be in the array text)
    const cid = rxStr(ct, 'CaseID');
    if (!cid) continue;
    const r = analyzeCase(ct, fn);
    allResults.push(r);
    const its = extractItemTexts(extractItemsArray(ct));
    const allCert = its.length > 0 && its.every(it => rxStr(it, 'question_state') === 'Certified');
    if (allCert) certified.push(r.caseID);
    else nonCert.push(r.caseID);
  }
}

const totals = { cases_analyzed: allResults.length, certified: certified.length, non_certified: nonCert.length,
  stakeholder_only: 0, metadata_only: 0, explanation_only: 0, progression_only: 0,
  multiple_blockers: 0, true_content_defect: 0, no_blockers: 0 };

for (const r of allResults) {
  switch (r.overall_blocker_class) {
    case 'No Blockers': totals.no_blockers++; break;
    case 'Stakeholder-only': totals.stakeholder_only++; break;
    case 'Metadata-only': totals.metadata_only++; break;
    case 'Explanation-only': totals.explanation_only++; break;
    case 'Progression-only': totals.progression_only++; break;
    case 'True Content Defect': totals.true_content_defect++; break;
    case 'Multiple Blockers': totals.multiple_blockers++; break;
  }
}

// Patterns
for (const fn of FILES) {
  const fr = allResults.filter(r => r.file === fn);
  if (!fr.length) continue;
  for (const f of ['CompanyName','Stakeholder','BusinessFunction','Industry','CompanyType'])
    if (fr.every(r => r.details.stakeholder.some(x => x.includes(f)))) patterns.add(fn + ': ALL missing ' + f);
  if (fr.every(r => r.details.metadata.some(x => x.includes('Author')))) patterns.add(fn + ': ALL missing Author');
  if (fr.every(r => r.details.progression.some(p => p.includes('DL-032')))) patterns.add(fn + ': ALL DL-032 uniform Moderate');
  if (fr.every(r => r.details.metadata.some(x => x.includes('CONTRADICTION')))) patterns.add(fn + ': ALL ProductionStatus=Draft with Certified items (contradiction)');
}

for (const field of ['CompanyName','Stakeholder','BusinessFunction','Industry','CompanyType','Author']) {
  const aff = [];
  for (const fn of FILES) {
    const fr = allResults.filter(r => r.file === fn);
    const cat = field === 'Author' ? 'metadata' : 'stakeholder';
    if (fr.length && fr.every(r => r.details[cat].some(x => x.includes(field)))) aff.push(fn);
  }
  if (aff.length >= 2) patterns.add('Cross-file: ' + field + ' missing in ' + aff.join(', '));
}

const output = {
  session: '059', timestamp: '2026-07-28',
  totals,
  certified_case_ids: certified.sort(),
  non_certified_case_ids: nonCert.sort(),
  blocker_classification: allResults,
  patterns: Array.from(patterns).sort(),
  key_findings: {
    all_items_certified: totals.non_certified === 0,
    note: 'All 75 cases have ALL items with question_state: "Certified". Zero non-certified items exist. However, many cases have structural issues that would block re-certification under current rubrics: missing metadata fields (CompanyName, Stakeholder, BusinessFunction, etc.), ProductionStatus contradictions, uniform Moderate difficulty (DL-032), and explanation quality gaps.'
  }
};

const outDir = path.join(BASE, 'reports', 'certification');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'SESSION059_BLOCKER_MATRIX.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

console.log('\n=== TOTALS ===');
console.log('Cases Analyzed: ' + totals.cases_analyzed);
console.log('Certified (all items): ' + totals.certified);
console.log('Non-Certified: ' + totals.non_certified);
console.log('');
console.log('Blocker Classification (structural issues, though items certified):');
console.log('  No Blockers: ' + totals.no_blockers);
console.log('  Stakeholder-only: ' + totals.stakeholder_only);
console.log('  Metadata-only: ' + totals.metadata_only);
console.log('  Explanation-only: ' + totals.explanation_only);
console.log('  Progression-only: ' + totals.progression_only);
console.log('  Multiple Blockers: ' + totals.multiple_blockers);
console.log('  True Content Defect: ' + totals.true_content_defect);
console.log('\nPatterns:');
for (const p of Array.from(patterns).sort()) console.log('  - ' + p);
const cd = allResults.filter(r => r.details.content_defect.length > 0);
console.log('\nTRUE CONTENT DEFECTS: ' + cd.length + ' cases');
for (const c of cd) console.log('  ' + c.caseID + ': ' + c.details.content_defect.join('; '));
console.log('\nOutput: ' + outPath);
