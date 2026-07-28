// S312 Quality Gate Validator — applies 4-gate validation to authored items
const fs = require('fs');

const raw = fs.readFileSync('reports/SESSION312_AUTHORING_BATCH1.json', 'utf8').replace(/^\uFEFF/, '');
const batch = JSON.parse(raw);
const items = batch.items;

const results = {
  gate1_draft: [],
  gate2_technical: [],
  gate3_blueprint: [],
  gate4_qa: [],
  overall: {}
};

const BOILERPLATE_PATTERNS = [
  /\[Explanation of why/,
  /\[This is/,
  /\[Explanation.*correct/,
  /\[Insert explanation/,
  /\(template/,
  /placeholder/i
];

const CSO_TOPICS = {
  'E.1.a': 'Corporate Governance',
  'E.1.b': 'Internal Control Framework (COSO 2013)',
  'E.1.c': 'Control Environment',
  'E.1.d': 'Risk Assessment',
  'E.1.e': 'Control Activities',
  'E.1.f': 'Information & Communication',
  'E.1.g': 'Monitoring',
  'E.1.h': 'Sarbanes-Oxley Act (SOX)',
  'E.1.i': 'External Auditing',
  'E.1.j': 'Systems Controls'
};

const DIFFICULTY_BY_SCORE = {
  1: 'Easy', 2: 'Moderate-Easy', 3: 'Moderate', 4: 'Difficult', 5: 'Hard'
};

const DIFFICULTY_BY_LABEL = {
  'Easy': 1, 'Moderate-Easy': 2, 'Moderate': 3, 'Difficult': 4, 'Hard': 5
};

for (const item of items) {
  const qid = item.QuestionID || 'unknown';
  const cc = item.CorrectChoice;
  const gate1 = { qid, checks: [] };
  const gate2 = { qid, checks: [] };
  const gate3 = { qid, checks: [] };
  const gate4 = { qid, checks: [] };

  // === GATE 1: DRAFT ===
  // Required fields present
  const requiredFields = ['Stem', 'CorrectChoice', 'Choices', 'ExplanationCorrect', 'QuestionID'];
  for (const f of requiredFields) {
    if (!item[f]) gate1.checks.push(`MISSING: ${f}`);
  }
  for (const ch of ['A','B','C','D']) {
    if (!item.Choices || !item.Choices[ch]) gate1.checks.push(`MISSING: Choices.${ch}`);
    if (typeof item['ExplanationWrong' + ch] === 'undefined') gate1.checks.push(`MISSING: ExplanationWrong${ch}`);
  }
  gate1.pass = gate1.checks.length === 0;

  // === GATE 2: TECHNICAL REVIEW ===
  // DL-008: EW[CC] must be empty
  const ewCC = item['ExplanationWrong' + cc];
  if (ewCC && ewCC.length > 0) {
    gate2.checks.push(`DL-008: EW[${cc}] (CorrectChoice) is non-empty (${ewCC.length} chars)`);
  }

  // DL-026: All non-CC EW must be non-empty and >= 100 chars
  for (const ch of ['A','B','C','D']) {
    if (ch !== cc) {
      const ew = item['ExplanationWrong' + ch];
      if (!ew || ew.length === 0) {
        gate2.checks.push(`DL-026: EW[${ch}] is empty`);
      } else if (ew.length < 100) {
        gate2.checks.push(`DL-026: EW[${ch}] under minimum (${ew.length} chars, need >= 100)`);
      }
    }
  }

  // DL-013: No template boilerplate
  for (const field of ['ExplanationCorrect', 'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD']) {
    const val = item[field];
    if (val) {
      for (const pattern of BOILERPLATE_PATTERNS) {
        if (pattern.test(val)) {
          gate2.checks.push(`DL-013: Boilerplate detected in ${field}`);
          break;
        }
      }
    }
  }

  // EC minimum length
  if (item.ExplanationCorrect && item.ExplanationCorrect.length < 400) {
    gate2.checks.push(`EC under minimum length (${item.ExplanationCorrect.length} chars, need >= 400)`);
  }

  // Metadata completeness
  const metaFields = ['Part', 'Section', 'SectionName', 'Topic', 'MicroTopic', 'LOSTag', 'Difficulty', 'DifficultyScore', 'CognitiveLevel', 'ItemType', 'ItemStyle'];
  for (const f of metaFields) {
    if (!item[f] && item[f] !== 0) gate2.checks.push(`Missing metadata: ${f}`);
  }

  gate2.pass = gate2.checks.length === 0;

  // === GATE 3: BLUEPRINT REVIEW ===
  // LOSTag precision
  const los = item.LOSTag || '';
  if (!los.startsWith('E.1')) {
    gate3.checks.push(`LOSTag "${los}" does not map to Section E CSO`);
  }

  // CognitiveLevel validity
  const validCL = ['Remember', 'Understand', 'Apply', 'Analyze'];
  if (!validCL.includes(item.CognitiveLevel)) {
    gate3.checks.push(`CognitiveLevel "${item.CognitiveLevel}" not in Bloom's taxonomy`);
  }

  // Difficulty consistency
  const expectedDiffByScore = DIFFICULTY_BY_SCORE[item.DifficultyScore];
  if (expectedDiffByScore && item.Difficulty !== expectedDiffByScore) {
    gate3.checks.push(`Difficulty label "${item.Difficulty}" vs score ${item.DifficultyScore} (expected "${expectedDiffByScore}")`);
  }

  // DL-031: Definition-recall items at Easy
  if (item.CognitiveLevel === 'Remember' && (item.DifficultyScore > 1)) {
    gate3.checks.push(`DL-031: Remember-level item scored ${item.DifficultyScore} (should be 1-Easy)`);
  }

  gate3.pass = gate3.checks.length === 0;

  // === GATE 4: QA REVIEW ===
  // Stem length
  if (item.Stem && item.Stem.length < 80) {
    gate4.checks.push(`Stem may be too short (${item.Stem.length} chars) for complete scenario`);
  }

  // Distractor plausibility check: all choices should be different
  const choices = item.Choices || {};
  const choiceTexts = Object.values(choices);
  const uniqueChoices = new Set(choiceTexts);
  if (uniqueChoices.size < 4) {
    gate4.checks.push(`Duplicate choice text detected`);
  }

  // EC contains expected elements
  const ec = item.ExplanationCorrect || '';
  if (!ec.match(/COSO|SOX|GAAS|Framework|framework|standard/i)) {
    gate4.checks.push(`EC may lack framework/standard citation`);
  }
  if (!ec.match(/because|since|therefore|as a result|the correct/i)) {
    gate4.checks.push(`EC may lack substantive reasoning`);
  }

  // EW specificity — each EW should mention a specific concept
  for (const ch of ['A','B','C','D']) {
    if (ch !== cc) {
      const ew = item['ExplanationWrong' + ch];
      if (ew && ew.length > 0) {
        // Check that EW mentions the specific choice letter or concept
        if (!ew.includes(ch)) {
          gate4.checks.push(`EW[${ch}] may not be choice-specific — doesn't reference choice letter`);
        }
      }
    }
  }

  gate4.pass = gate4.checks.length === 0;

  results.gate1_draft.push(gate1);
  results.gate2_technical.push(gate2);
  results.gate3_blueprint.push(gate3);
  results.gate4_qa.push(gate4);
}

// Aggregate results
results.overall = {
  gate1_passRate: (results.gate1_draft.filter(g => g.pass).length / items.length * 100).toFixed(1) + '%',
  gate2_passRate: (results.gate2_technical.filter(g => g.pass).length / items.length * 100).toFixed(1) + '%',
  gate3_passRate: (results.gate3_blueprint.filter(g => g.pass).length / items.length * 100).toFixed(1) + '%',
  gate4_passRate: (results.gate4_qa.filter(g => g.pass).length / items.length * 100).toFixed(1) + '%',
  allGatesPass: results.gate1_draft.every(g => g.pass) && results.gate2_technical.every(g => g.pass) && results.gate3_blueprint.every(g => g.pass) && results.gate4_qa.every(g => g.pass),
  itemsWithIssues: [
    ...new Set([
      ...results.gate2_technical.filter(g => !g.pass).map(g => g.qid),
      ...results.gate3_blueprint.filter(g => !g.pass).map(g => g.qid),
      ...results.gate4_qa.filter(g => !g.pass).map(g => g.qid)
    ])
  ]
};

// Detailed issue log
const allIssues = [];
for (const gate of [results.gate2_technical, results.gate3_blueprint, results.gate4_qa]) {
  for (const g of gate) {
    if (!g.pass) {
      for (const c of g.checks) {
        allIssues.push({ qid: g.qid, gate: gate === results.gate2_technical ? 'G2_Technical' : gate === results.gate3_blueprint ? 'G3_Blueprint' : 'G4_QA', issue: c });
      }
    }
  }
}
results.allIssues = allIssues;

// Difficulty/CL distribution for batch
const diffDist = {};
const clDist = {};
for (const item of items) {
  diffDist[item.Difficulty || 'unknown'] = (diffDist[item.Difficulty || 'unknown'] || 0) + 1;
  clDist[item.CognitiveLevel || 'unknown'] = (clDist[item.CognitiveLevel || 'unknown'] || 0) + 1;
}
results.batchDistribution = { difficulty: diffDist, cognitiveLevel: clDist };

// EW coverage stats
let ewTotal = 0, ewOk = 0;
for (const item of items) {
  for (const ch of ['A','B','C','D']) {
    ewTotal++;
    const ew = item['ExplanationWrong' + ch];
    if (ew && ew.length > 0 && ch !== item.CorrectChoice) ewOk++;
    if (ew && ew.length === 0 && ch === item.CorrectChoice) ewOk++; // correct: CC empty
  }
}
results.ewStats = { totalSlots: ewTotal, compliant: ewOk, coveragePercent: (ewOk / ewTotal * 100).toFixed(1) + '%' };

const output = {
  title: "SESSION312_QUALITY_GATE_RESULTS",
  session: "312",
  generated: new Date().toISOString(),
  itemsValidated: items.length,
  gates: results.overall,
  issues: results.allIssues,
  batchDistribution: results.batchDistribution,
  ewStats: results.ewStats,
  perItemResults: items.map((item, i) => ({
    QuestionID: item.QuestionID,
    gate1: results.gate1_draft[i].pass ? 'PASS' : 'FAIL',
    gate2: results.gate2_technical[i].pass ? 'PASS' : 'FAIL',
    gate3: results.gate3_blueprint[i].pass ? 'PASS' : 'FAIL',
    gate4: results.gate4_qa[i].pass ? 'PASS' : 'FAIL',
    gate2_issues: results.gate2_technical[i].checks,
    gate3_issues: results.gate3_blueprint[i].checks,
    gate4_issues: results.gate4_qa[i].checks
  }))
};

fs.writeFileSync('reports/SESSION312_QUALITY_GATE_RESULTS.json', JSON.stringify(output, null, 2));
console.log(JSON.stringify(output.overall, null, 2));
console.log('Issues found: ' + output.issues.length);
if (output.issues.length > 0) {
  console.log(JSON.stringify(output.issues, null, 2));
}
