// SESSION060A quality benchmark extraction script
// READ-ONLY

const fs = require('fs');
const path = require('path');

const TARGET_QIDS = [
  "P1-EC-030", "P1-FC-050", "P1-FD-050", "P1-FD-046",
  "P1-EC-005", "P1-ED-015", "P1-FC-016", "P1-FD-010",
  "P1-EC-010", "P1-ED-020", "P1-FD-020", "P1-EC-055",
  "P1-FD-041", "P1-EC-059", "P1-FD-035",
];

function loadPack(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  // Extract variable name from first line: "const MCQ_BANK_C = [" or "const MCQ_BANK_D = ["
  const m = code.match(/^(?:const|var|let)\s+(\w+)\s*=\s*\[/m);
  if (!m) throw new Error(`Cannot find array variable in ${filePath}`);
  const varName = m[1];
  // Build a function that returns the array
  const wrapped = code + `\n; return ${varName};`;
  try {
    const fn = new Function(wrapped);
    const result = fn();
    if (Array.isArray(result) && result.length > 0) return result;
    throw new Error(`Function returned non-array or empty array for ${filePath}`);
  } catch (e) {
    throw new Error(`Failed to parse ${filePath}: ${e.message}`);
  }
}

const QID_TO_PACK = {};
for (const qid of TARGET_QIDS) {
  if (qid.startsWith('P1-EC-') || qid.startsWith('P1-FC-')) {
    QID_TO_PACK[qid] = 'pack_c_corrected.js';
  } else {
    QID_TO_PACK[qid] = 'pack_d_corrected.js';
  }
}

const packs = {};
for (const [qid, packFile] of Object.entries(QID_TO_PACK)) {
  if (!packs[packFile]) {
    console.error(`Loading ${packFile}...`);
    packs[packFile] = loadPack(path.join(__dirname, '..', packFile));
    console.error(`  -> ${packs[packFile].length} items`);
  }
}

function hasNamedCompany(stem) {
  if (!stem) return false;
  return /\b[A-Z][a-z]+ (?:Corporation|Corp\.|Inc\.|LLC|Ltd\.|Group|Industries|Solutions|Technologies|Holdings|Enterprises|Partners|Associates|Manufacturing|Medical|Financial|Bank|Insurance)\b/.test(stem)
    || /\b(?:CFO|CEO|COO|CIO|Controller|Audit Committee|Board of Directors|Chief |VP of |Director of |Manager of )\b/i.test(stem)
    || /\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(stem);
}

function hasDecisionScenario(stem) {
  if (!stem) return false;
  return /\b(?:should|must|recommend|evaluate|assess|determine|select|choose|advise|propose|which (?:of the following|approach|strategy|action))\b/i.test(stem)
    || /\b(?:needs to|asks|requested|concerned about|discovered|identified|found that|reported|escalated|recently|currently)\b/i.test(stem)
    || /\b(?:after|following|during|in response to|as a result of)\b/i.test(stem);
}

function hasStandardReference(ec) {
  if (!ec) return false;
  return /\b(?:ASC\s*\d|COSO|IAS\s*\d|IFRS\s*\d|IMA|FASB|GAAP|SOX|PCAOB|IIA|ISO\s*\d)\b/i.test(ec);
}

function areDistractorsChoiceSpecific(item) {
  const cc = item.CorrectChoice || '';
  const texts = [];
  const letters = ['A', 'B', 'C', 'D'];
  for (const L of letters) {
    if (L === cc) continue;
    const val = item['ExplanationWrong' + L];
    if (val && val.length >= 50) texts.push(val);
  }
  if (texts.length < 2) return texts.length === 1; // single non-CC with real text = ok
  
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      const words1 = new Set(texts[i].toLowerCase().split(/\W+/).filter(w => w.length > 2));
      const words2 = new Set(texts[j].toLowerCase().split(/\W+/).filter(w => w.length > 2));
      const intersection = new Set([...words1].filter(w => words2.has(w)));
      const union = new Set([...words1, ...words2]);
      const jaccard = intersection.size / union.size;
      if (jaccard > 0.7) return false;
    }
  }
  return true;
}

function extractMetrics(item) {
  const stem = item.Stem || '';
  const ec = item.ExplanationCorrect || '';
  const cc = item.CorrectChoice || '';
  
  const ewNonCC = [];
  for (const L of ['A', 'B', 'C', 'D']) {
    if (L !== cc) {
      const v = item['ExplanationWrong' + L];
      if (v !== undefined && v !== null) ewNonCC.push(v.length);
    }
  }
  const ewMean = ewNonCC.length > 0 ? Math.round(ewNonCC.reduce((a, b) => a + b, 0) / ewNonCC.length) : 0;
  
  return {
    ec_length: ec.length,
    ew_mean_length: ewMean,
    ew_a_len: (item.ExplanationWrongA || '').length,
    ew_b_len: (item.ExplanationWrongB || '').length,
    ew_c_len: (item.ExplanationWrongC || '').length,
    ew_d_len: (item.ExplanationWrongD || '').length,
    stem_length: stem.length,
    has_company: hasNamedCompany(stem),
    has_decision_scenario: hasDecisionScenario(stem),
    has_standard: hasStandardReference(ec),
    has_choice_specific: areDistractorsChoiceSpecific(item),
  };
}

const results = [];
for (const qid of TARGET_QIDS) {
  const packFile = QID_TO_PACK[qid];
  const items = packs[packFile];
  const item = items.find(i => i.QuestionID === qid);
  if (!item) {
    console.error(`WARNING: ${qid} not found in ${packFile}`);
    continue;
  }
  
  const m = extractMetrics(item);
  results.push({
    qid,
    ...m,
    cognitive_level: item.CognitiveLevel || 'unknown',
    difficulty_score: item.DifficultyScore || 0,
    topic: item.Topic || '',
    section: item.Section || '',
    correct_choice: item.CorrectChoice || '',
  });
  
  console.error(`${qid}: EC=${m.ec_length}, EW_mean=${m.ew_mean_length}, Stem=${m.stem_length} | Company=${m.has_company} Decision=${m.has_decision_scenario} Standard=${m.has_standard} ChoiceSpec=${m.has_choice_specific}`);
}

// Save raw
fs.writeFileSync(
  path.join(__dirname, '..', 'reports', 'SESSION060A_EXTRACTION_RAW.json'),
  JSON.stringify(results, null, 2)
);

// Aggregate
const ecLengths = results.map(r => r.ec_length);
const ewMeans = results.map(r => r.ew_mean_length);
const stemLengths = results.map(r => r.stem_length);

function m(values) {
  const s = [...values].sort((a, b) => a - b);
  return {
    mean: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
    median: s[Math.floor(s.length / 2)],
    min: s[0],
    max: s[s.length - 1],
  };
}

// Tier: count of criteria met
const perItem = [];
for (const r of results) {
  let score = 0;
  if (r.has_standard) score++;
  if (r.has_company) score++;
  if (r.has_choice_specific) score++;
  if (r.ec_length > 500) score++;
  
  const tier = score >= 4 ? 'GOLD' : score >= 3 ? 'SILVER' : score >= 2 ? 'BRONZE' : 'BELOW';
  
  perItem.push({
    qid: r.qid,
    tier,
    ec_length: r.ec_length,
    ew_mean_length: r.ew_mean_length,
    stem_length: r.stem_length,
    has_company: r.has_company,
    has_standard: r.has_standard,
    has_choice_specific: r.has_choice_specific,
    cognitive_level: r.cognitive_level,
    difficulty_score: r.difficulty_score,
    topic: r.topic,
  });
}

const tierCounts = { GOLD: 0, SILVER: 0, BRONZE: 0, BELOW: 0 };
for (const p of perItem) tierCounts[p.tier]++;

const baseline = {
  session: "SESSION060A",
  sample_size: results.length,
  metrics: {
    explanation_correct: m(ecLengths),
    explanation_wrong: m(ewMeans),
    stem_length: m(stemLengths),
    pct_named_company: Math.round(results.filter(r => r.has_company).length / results.length * 100),
    pct_standard_reference: Math.round(results.filter(r => r.has_standard).length / results.length * 100),
    pct_choice_specific_distractors: Math.round(results.filter(r => r.has_choice_specific).length / results.length * 100),
  },
  tier_distribution: tierCounts,
  quality_baseline: {
    min_acceptable_ec_length: 500,
    min_acceptable_ew_length: 100,
    min_stem_complexity_markers: ["named company", "decision trigger"],
    required_standard_reference: true,
  },
  per_item: perItem,
};

const outputPath = path.join(__dirname, '..', 'reports', 'SESSION060A_QUALITY_BASELINE.json');
fs.writeFileSync(outputPath, JSON.stringify(baseline, null, 2));
console.error(`\nWrote ${results.length} items to ${outputPath}`);
console.log(JSON.stringify(baseline, null, 2));
