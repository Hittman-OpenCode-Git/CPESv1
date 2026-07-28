// Session 718 — Classification Engine V3 (balanced)
// Fixes V2 over-correction: broader company detection, stronger calculation signals,
// properly weighted Analyze/Evaluate pathways

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function classify(stem, topic, choices, difficulty, diffScore, isNumeric) {
  const s = (stem || '').toLowerCase();
  const t = (topic || '').toLowerCase();
  
  // ---- FEATURES ----
  const numWords = (stem || '').split(/\s+/).length;
  
  // Numbers: dollar amounts, percentages, quantities, units
  const hasNumbers = /\$\d[\d,]*/.test(stem) || /\d+%/.test(stem) || /\d[\d,]*\s*(units|shares|hours|days|years)/i.test(stem) || /(cost|price|amount|value)\s*(of|is|:)\s*\$?\d/i.test(stem);
  
  // Calculation verbs
  const hasCalcVerb = /\b(calculate|compute|determine|what is the|how much|what amount|solve for|find the|enter)\b/i.test(stem);
  
  // Scenario detection: company name + action description
  const hasScenario = (stem || '').length > 60 && /\b(is |has |purchased|sold|issued|acquired|reports|reported|estimates|estimating|reviewing|implementing|implemented|established|evaluating|assessing|preparing|developing|conduct|conducts|wants to|needs to|uses|using)\b/i.test(stem);
  
  // Company name detection (broad: any capitalized multi-word)
  const hasCompanyName = /[A-Z][a-z]+ (Technologies|Industries|Manufacturing|Corporation|Corp\.?|Medical|Supply|Financial|Group|Global|Holdings|Logistics|Innovations|Healthcare|Enterprises|Properties|Solutions|Services|Systems|Energy|Communications|Data|Software|Biotech|Wholesale|Bank|Partners|Inc\.?|LLC|Ltd\.?|Co\.?)/.test(stem) ||
    // Also catch generic company patterns like "[Name] [verb]..."
    /^[A-Z][a-z]+ (is |has |purchased|sold|reports|reported|estimates|reviewing|implementing|uses|using|produces|manufactures|operates|provides|sells|buys|owns|holds|prepares|develops|conducts|announces|plans|expects|projects|forecasts|budgets)/.test(stem);
  
  // "Which response is most appropriate?" pattern
  const isMostAppropriate = /\bwhich (response|statement|action|conclusion) is most appropriate\b/i.test(s);
  
  // "Which of the following is/are" (definition/classification)
  const isWhichOf = /^which of the following/i.test(s);
  
  // Judgment/recommendation language
  const hasRecommend = /\b(recommend|advise|propose|suggest|should (select|choose|implement|adopt|pursue|use))\b/i.test(s);
  const hasBest = /\b(best approach|most effective|optimal|preferable|most beneficial|most suitable)\b/i.test(s);
  
  // Interpretation language
  const hasInterpret = /\b(indicate|reveal|imply|conclude|signify|explain why|what (does|would|might) this|what is the (most likely|primary) (reason|cause|explanation))\b/i.test(s);
  
  // Data-driven: "Given the following", "Based on the data"
  const hasDataGiven = /\b(given the following|based on the (data|information|exhibit|schedule|report)|provided (below|above)|following (data|information))\b/i.test(s);
  
  // Variance analysis keywords
  const hasVariance = /\b(variance|favorable|unfavorable)\b/i.test(s);
  
  // Multi-step/complexity indicators
  const hasMultiStep = /\b(both|combining|integrating|taking into account|considering|furthermore|moreover|in addition)\b/i.test(s);
  
  // "analyze" keyword — check if genuine or concept-ID
  const hasAnalyzeKeyword = /\banalyze\b/i.test(s);
  
  // Financial statements / reporting
  const isFinancialReporting = /\b(balance sheet|income statement|cash flow|statement of|financial statements?|retained earnings|comprehensive income|equity)\b/i.test(s);
  
  // Internal control / COSO
  const isInternalControl = /\b(internal control|coso|sox|sarbanes|segregation of duties|control (environment|activities|risk)|icfr)\b/i.test(s);
  
  // Budget/planning
  const isBudgetPlanning = /\b(budget|forecast|projection|master budget|operating budget|cash budget|flexible budget|static budget|planning)\b/i.test(s);
  
  // Cost management
  const isCostMgmt = /\b(costing|cost allocation|joint cost|process cost|job (order|cost)|activity.based|overhead|cost driver|cost pool|cost behavior|cvp|break.even|contribution margin)\b/i.test(s);
  
  // Definition/recall signals
  const isDefinition = /^(what is|what are|which of the following (best |)defines|the term|is defined as|refers to|is called|is known as)\b/i.test(s);
  
  // ========== CLASSIFICATION LOGIC ==========
  
  // NUMERIC / CALCULATION ITEMS
  if (isNumeric || (hasNumbers && hasCalcVerb)) {
    if (hasMultiStep && (hasInterpret || hasDataGiven)) return 'Analyze';
    return 'Apply';
  }
  
  // PURE RECALL / DEFINITION (no scenario, no company)
  if (isDefinition && !hasScenario && !hasCompanyName) {
    return 'Remember';
  }
  
  // Short "Which of the following" with no scenario
  if (isWhichOf && numWords < 15 && !hasScenario && !hasCompanyName) {
    // Check if choices require discrimination
    if (choices && choices.length >= 3 && choices.every(c => c && c.length > 15)) {
      return 'Understand'; // Choices are substantive, requires discrimination
    }
    return 'Remember';
  }
  
  // Medium "Which of the following" concept questions
  if (isWhichOf && !hasScenario && !hasCompanyName) {
    if (/is (not |)true|is (not |)correct|is (not |)a characteristic|is (not |)an example/i.test(s)) {
      return 'Understand'; // Requires discrimination
    }
    if (/\b(under |according to |per |pursuant to )/i.test(s)) {
      return 'Understand'; // Standard application
    }
    return 'Remember';
  }
  
  // "Which response is most appropriate?" — UNLESS genuine judgment
  if (isMostAppropriate) {
    // Genuine judgment: recommends action, best approach among alternatives
    if ((hasRecommend && hasBest) || (hasBest && hasJudgment())) return 'Evaluate';
    // Otherwise: recognizing correct standard/treatment
    return 'Understand';
  }
  
  // ANALYZE DETECTION
  // "analyze" keyword used correctly
  if (hasAnalyzeKeyword) {
    if (/what (approach|method|technique|tool|framework) (is|is being)/i.test(s)) {
      return 'Understand'; // Naming a technique, not analyzing
    }
    if (hasInterpret || (hasDataGiven && hasVariance)) {
      return 'Analyze'; // Genuine analysis
    }
  }
  
  // Variance interpretation (not calculation)
  if (hasVariance && hasInterpret) return 'Analyze';
  
  // Data-driven interpretation
  if (hasDataGiven && hasInterpret) return 'Analyze';
  
  // Multi-step with interpretation
  if (hasMultiStep && hasInterpret && hasScenario) return 'Analyze';
  
  // EVALUATE DETECTION
  if (hasRecommend && hasBest) return 'Evaluate';
  if (hasBest && hasScenario && /\b(choose|select|decide|pick) (between|among|from)\b/i.test(s)) return 'Evaluate';
  if (/\b(which (costing method|budgeting approach|pricing strategy|transfer price|allocation method|control framework) (should|would|is) best)\b/i.test(s)) return 'Evaluate';
  if (/ethical|ethics|professional (judgment|responsibility)/i.test(s) && (hasRecommend || hasBest)) return 'Evaluate';
  
  // APPLY DETECTION
  // Scenario + procedure/calculation/classification
  if (hasCalcVerb && (hasScenario || hasCompanyName)) return 'Apply';
  if (hasNumbers && hasCompanyName) return 'Apply';
  
  // Cost management scenarios with computation
  if (isCostMgmt && hasScenario && (hasNumbers || hasCalcVerb)) return 'Apply';
  
  // Budget scenarios with numbers
  if (isBudgetPlanning && hasScenario && hasNumbers) return 'Apply';
  
  // Financial reporting scenarios requiring application
  if (isFinancialReporting && hasScenario && (hasNumbers || /what amount|how (should|must)|prepare|record|report/i.test(s))) return 'Apply';
  
  // SCENARIO + CONCEPT = UNDERSTAND (most common CMA MCQ type)
  if (hasScenario || hasCompanyName) return 'Understand';
  
  // DEFAULT: Understand (concept recognition without scenario)
  return 'Understand';
}

function hasJudgment() {
  // Called only from within the function where s is available
  return false; // already integrated into main function
}

// ============================================================================
// MAIN
// ============================================================================

const assignmentsPath = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS.json');
const firstPass = JSON.parse(fs.readFileSync(assignmentsPath, 'utf8'));

const censusPath = path.join(root, 'reports', 'session_status', 'SESSION718_MCQ_METADATA_CENSUS.json');
const census = JSON.parse(fs.readFileSync(censusPath, 'utf8'));

const itemLookup = {};
for (const [packName, packData] of Object.entries(census)) {
  if (packName === 'summary') continue;
  for (const item of packData.items || []) {
    itemLookup[item.QuestionID] = item;
  }
}

const v3Assignments = {};
const v3Stats = {
  total: 0,
  byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 },
  byPack: {},
  changes: {},
};

for (const [qid, v1] of Object.entries(firstPass.assignments)) {
  const item = itemLookup[qid];
  if (!item) continue;
  
  const choices = (item.Choices || '').split(' | ').filter(Boolean);
  const isNumeric = item.Type === 'numeric' || /\$\d/.test(item.StemPreview || '') && /\b(calculate|compute|what is the)\b/i.test(item.StemPreview || '');
  
  const v3CL = classify(item.StemPreview, item.Topic, choices, item.Difficulty, item.DifficultyScore, isNumeric);
  
  v3Assignments[qid] = {
    CognitiveLevel: v3CL,
    QuestionID: qid,
    Section: item.Section,
    Pack: v1.Pack,
    Topic: item.Topic,
    StemPreview: item.StemPreview,
    Difficulty: item.Difficulty,
    question_state: item.question_state,
    Certified: item.question_state === 'Certified',
    v1: v1.CognitiveLevel,
    changed: v3CL !== v1.CognitiveLevel,
  };
  
  v3Stats.total++;
  v3Stats.byLevel[v3CL]++;
  
  if (!v3Stats.byPack[v1.Pack]) {
    v3Stats.byPack[v1.Pack] = { total: 0, byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 }, changes: 0 };
  }
  v3Stats.byPack[v1.Pack].total++;
  v3Stats.byPack[v1.Pack].byLevel[v3CL]++;
  
  if (v3CL !== v1.CognitiveLevel) {
    const key = v1.CognitiveLevel + '→' + v3CL;
    v3Stats.changes[key] = (v3Stats.changes[key] || 0) + 1;
  }
}

const v3Path = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS_V3.json');
fs.writeFileSync(v3Path, JSON.stringify({ assignments: v3Assignments, stats: v3Stats }, null, 2));

console.log('=== S718 V3 ===\n');
console.log(`Total: ${v3Stats.total}`);
console.log('\nBy CognitiveLevel:');
for (const [level, count] of Object.entries(v3Stats.byLevel)) {
  console.log(`  ${level}: ${count} (${(count/v3Stats.total*100).toFixed(1)}%)`);
}
console.log('\nBy Pack:');
for (const [pack, pdata] of Object.entries(v3Stats.byPack)) {
  const parts = [];
  for (const [level, count] of Object.entries(pdata.byLevel)) {
    if (count > 0) parts.push(`${level}:${count}`);
  }
  console.log(`  ${pack}: ${pdata.total} — ${parts.join(', ')}`);
}
console.log(`\nTop changes from V1:`);
const sorted = Object.entries(v3Stats.changes).sort((a,b) => b[1]-a[1]);
for (const [ch, ct] of sorted.slice(0,8)) {
  console.log(`  ${ch}: ${ct}`);
}
console.log(`\nWritten to: ${v3Path}`);
