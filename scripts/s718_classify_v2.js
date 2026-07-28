// Session 718 — Refined Classification Engine (v2)
// Incorporates Agent B findings: 4 bias corrections, decision tree, edge case rules
// Source: DIFFICULTY_CALIBRATION_STANDARD.md §3, Pack B reference patterns, Agent B analysis

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// ============================================================================
// REFINED CLASSIFICATION RULES (v2)
// ============================================================================

function classify(stem, topic, choices, difficulty, diffScore, isNumeric) {
  const s = (stem || '').toLowerCase();
  const t = (topic || '').toLowerCase();
  const d = (difficulty || '').toLowerCase();
  
  // ---- DETECT FEATURES ----
  const hasNumbers = /\$\d+/.test(stem) || /\d+%/.test(stem) || /\d+ units/.test(stem) || /\d+,\d{3}/.test(stem);
  const hasCalcVerbs = /\b(calculate|compute|determine|what is the|how much|what amount|solve for)\b/i.test(stem);
  const hasCompany = /^[A-Z][a-z]+ (Technologies|Industries|Manufacturing|Corp|Medical|Supply|Financial|Global|Holdings|Logistics|Innovations|Healthcare|Enterprises|Properties|Solutions|Services|Systems|Energy|Communications|Data|Software|Biotech|Wholesale|Bank)\b/i.test(stem);
  const isShort = s.length < 60;
  const isMedium = s.length >= 60 && s.length <= 200;
  const isLong = s.length > 200;
  const isWhichOf = /^which of the following/i.test(s);
  const isMostAppropriate = /\b(which (response|statement) is most appropriate|which of the following (is|statements) (is|are) correct)\b/i.test(s);
  const hasRecommend = /\b(recommend|advise|propose|suggest|endorse|should (select|choose|implement|adopt|pursue))\b/i.test(s);
  const hasJudgment = /\b(best approach|optimal|preferable|most effective|most suitable|trade.off|weigh|pros and cons|genuine alternatives|competing)\b/i.test(s);
  const hasInterpret = /\b(indicate|reveal|imply|suggest|infer|conclude|signify|explain (why|the reason))\b/i.test(s);
  const hasDataGiven = /\b(given|based on the (following |)data|provided|following information|exhibit)\b/i.test(s);
  const hasAnalysisKeyword = /\b(analyze|analysis|analyzing)\b/i.test(s);
  const hasVariance = /\b(variance|favorable|unfavorable)\b/i.test(s);
  const hasMultiStep = /\b(both|combining|integrating|considering|taking into account|additionally|furthermore|moreover)\b/i.test(s);
  
  // ---- DECISION TREE ----
  
  // STEP 1: Is there a numbered calculation required?
  if (isNumeric || (hasNumbers && hasCalcVerbs)) {
    // Check if computation is single-step (formula given) or multi-step
    if (hasMultiStep || hasInterpret || (hasDataGiven && isLong)) {
      return 'Analyze'; // Multi-step calculation + interpretation
    }
    return 'Apply';
  }
  
  // STEP 2: Does stem describe a specific scenario?
  if (!hasCompany || isShort) {
    // Pure definition/direct recall
    if (isWhichOf && isShort) {
      // Check choices for discrimination requirement
      const choiceStr = choices.map(c => c.toLowerCase()).join(' ');
      const allSimilar = choices.every((c, i, arr) => {
        if (i === 0) return true;
        return c.length > 10 && arr[i-1].length > 10; // All choices are substantive
      });
      if (allSimilar) return 'Understand'; // Requires discrimination
      return 'Remember';
    }
    if (s.length < 40 || /^(what is the|what are the|which of the following is the definition)/i.test(s)) {
      return 'Remember';
    }
    return 'Understand';
  }
  
  // STEP 3: What does the candidate do with the scenario?
  
  // BIAS CORRECTION 1: "Which response is most appropriate?" — NOT automatically Evaluate
  if (isMostAppropriate) {
    // Check if this is a standard-dictated answer vs genuine judgment
    if (/coso|gaap|ifrs|asc |sox|sarbanes/i.test(s) || 
        /internal control|financial reporting|balance sheet|income statement|revenue recognition|inventory|depreciation|amortization/i.test(t)) {
      // Standard-dictated — one correct answer
      return 'Understand';
    }
    if (hasJudgment || hasRecommend) {
      return 'Evaluate'; // Genuine judgment needed
    }
    return 'Understand'; // Default: concept recognition
  }
  
  // BIAS CORRECTION 2: "analyze" keyword — check actual cognitive demand
  if (hasAnalysisKeyword) {
    // "wants to analyze... what approach/method is being used" → naming a technique = Understand
    if (/what (approach|method|technique|tool|framework) (is|is being)/i.test(s)) {
      return 'Understand';
    }
    // "analyze... what does this indicate" → genuine analysis
    if (hasInterpret) {
      return 'Analyze';
    }
    // "using [method] analysis" — might be Apply
    if (/using|applying|employing|based on/i.test(s)) {
      return 'Apply';
    }
    return 'Understand'; // Default for "analyze" + concept-ID
  }
  
  // Detect genuine Analyze items
  // Variance interpretation
  if (hasVariance && hasInterpret && !hasCalcVerbs) {
    return 'Analyze';
  }
  
  // Data interpretation with multi-step reasoning
  if (hasDataGiven && hasInterpret && isLong) {
    return 'Analyze';
  }
  
  // Multi-step financial analysis requiring interpretation
  if (hasMultiStep && hasInterpret && isMedium) {
    return 'Analyze';
  }
  
  // Budget/performance analysis with interpretation
  if (/(budget|performance|actual|plan|forecast).*(difference|gap|shortfall|exceed|behind|ahead)/i.test(s) && hasInterpret) {
    return 'Analyze';
  }
  
  // Detect Evaluate items
  if (hasRecommend && hasJudgment) {
    return 'Evaluate';
  }
  if (hasJudgment && /(choose|select|decide|pick) (between|among)/i.test(s)) {
    return 'Evaluate';
  }
  if (/(which (costing method|budgeting approach|pricing strategy|transfer price|allocation method|control framework) (should|would be|is) best)/i.test(s)) {
    return 'Evaluate';
  }
  if (/ethical|ethics|professional (judgment|responsibility|obligation)/i.test(s) && hasRecommend) {
    return 'Evaluate';
  }
  
  // Detect Apply items — procedural or computational
  if (hasCalcVerbs) {
    return 'Apply';
  }
  if (/prepare|record|journalize|post|classify|allocate|assign/i.test(s) && hasCompany) {
    return 'Apply';
  }
  
  // Default: scenario + concept identification = Understand
  return 'Understand';
}

// ============================================================================
// MAIN: Re-classify all items
// ============================================================================

// Load first-pass assignments
const assignmentsPath = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS.json');
const firstPass = JSON.parse(fs.readFileSync(assignmentsPath, 'utf8'));

// Load census for full item data
const censusPath = path.join(root, 'reports', 'session_status', 'SESSION718_MCQ_METADATA_CENSUS.json');
const census = JSON.parse(fs.readFileSync(censusPath, 'utf8'));

// Build item lookup
const itemLookup = {};
for (const [packName, packData] of Object.entries(census)) {
  if (packName === 'summary') continue;
  for (const item of packData.items || []) {
    itemLookup[item.QuestionID] = item;
  }
}

// Re-classify
const v2Assignments = {};
const v2Stats = {
  total: 0,
  reclassified: 0,
  byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 },
  byPack: {},
  changes: { 'Remember→Understand': 0, 'Evaluate→Understand': 0, 'Analyze→Understand': 0, 'Understand→Analyze': 0, 'Apply→Analyze': 0, 'Apply→Understand': 0, other: 0 },
};

for (const [qid, v1] of Object.entries(firstPass.assignments)) {
  const item = itemLookup[qid];
  if (!item) continue;
  
  const choices = (item.Choices || '').split(' | ').filter(Boolean);
  const isNumeric = item.Type === 'numeric';
  
  const v2CL = classify(item.StemPreview, item.Topic, choices, item.Difficulty, item.DifficultyScore, isNumeric);
  
  v2Assignments[qid] = {
    CognitiveLevel: v2CL,
    QuestionID: qid,
    Section: item.Section,
    Pack: v1.Pack,
    Topic: item.Topic,
    StemPreview: item.StemPreview,
    Difficulty: item.Difficulty,
    question_state: item.question_state,
    Certified: item.question_state === 'Certified',
    v1Level: v1.CognitiveLevel,
    changed: v2CL !== v1.CognitiveLevel,
  };
  
  v2Stats.total++;
  v2Stats.byLevel[v2CL]++;
  
  if (!v2Stats.byPack[v1.Pack]) {
    v2Stats.byPack[v1.Pack] = { total: 0, byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 }, changes: 0 };
  }
  v2Stats.byPack[v1.Pack].total++;
  v2Stats.byPack[v1.Pack].byLevel[v2CL]++;
  
  if (v2CL !== v1.CognitiveLevel) {
    v2Stats.reclassified++;
    v2Stats.byPack[v1.Pack].changes++;
    const changeKey = v1.CognitiveLevel + '→' + v2CL;
    v2Stats.changes[changeKey] = (v2Stats.changes[changeKey] || 0) + 1;
  }
}

// Write v2 assignments
const v2Path = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS_V2.json');
fs.writeFileSync(v2Path, JSON.stringify({ assignments: v2Assignments, stats: v2Stats }, null, 2));

console.log('=== S718 Refined Classification (V2) ===\n');
console.log(`Total classified: ${v2Stats.total}`);
console.log(`Reclassified from V1: ${v2Stats.reclassified} (${(v2Stats.reclassified/v2Stats.total*100).toFixed(1)}%)`);

console.log('\nBy CognitiveLevel:');
for (const [level, count] of Object.entries(v2Stats.byLevel)) {
  const pct = (count / v2Stats.total * 100).toFixed(1);
  console.log(`  ${level}: ${count} (${pct}%)`);
}

console.log('\nChanges from V1:');
for (const [change, count] of Object.entries(v2Stats.changes)) {
  if (count > 0) console.log(`  ${change}: ${count}`);
}

console.log('\nBy Pack:');
for (const [pack, pdata] of Object.entries(v2Stats.byPack)) {
  console.log(`  ${pack}: ${pdata.total} items, ${pdata.changes} changed`);
  for (const [level, count] of Object.entries(pdata.byLevel)) {
    if (count > 0) console.log(`    ${level}: ${count}`);
  }
}

// Cross-reference: Difficulty vs CognitiveLevel alignment
console.log('\n=== Difficulty x CognitiveLevel Alignment ===');
const alignmentIssues = [];
for (const [qid, a] of Object.entries(v2Assignments)) {
  const cl = a.CognitiveLevel;
  const diff = a.DifficultyScore;
  const diffLabel = a.Difficulty;
  
  // DIFFICULTY_CALIBRATION_STANDARD.md §3 mapping
  const expectedDiff = {
    Remember: { min: 1, max: 2, label: 'Easy or Moderate-Easy' },
    Understand: { min: 1, max: 3, label: 'Easy to Moderate' },
    Apply: { min: 2, max: 4, label: 'Moderate-Easy to Difficult' },
    Analyze: { min: 3, max: 5, label: 'Moderate to Very Difficult' },
    Evaluate: { min: 3, max: 5, label: 'Moderate to Very Difficult' },
  };
  
  const exp = expectedDiff[cl];
  if (exp && (diff < exp.min || diff > exp.max)) {
    alignmentIssues.push(`${qid}: CL=${cl} but Difficulty=${diffLabel}(${diff}) — expected ${exp.label}`);
  }
}

if (alignmentIssues.length === 0) {
  console.log('  All items aligned!');
} else {
  console.log(`  ${alignmentIssues.length} misalignments found:`);
  for (const issue of alignmentIssues.slice(0, 20)) {
    console.log(`  ${issue}`);
  }
  if (alignmentIssues.length > 20) console.log(`  ... and ${alignmentIssues.length - 20} more`);
}

console.log(`\nV2 assignments written to: ${v2Path}`);
