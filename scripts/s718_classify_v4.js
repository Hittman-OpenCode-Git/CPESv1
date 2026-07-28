// Session 718 — Classification Engine V4 (CMA-aligned)
// Key insight from Pack B reference: scenario-present = Apply by default
// Understand reserved for simpler concept questions without detailed scenarios

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function classify(stem, topic, choices, difficulty, diffScore) {
  const s = (stem || '').trim();
  const sL = s.toLowerCase();
  const t = (topic || '').toLowerCase();
  const numWords = s.split(/\s+/).length;
  
  // ---- FEATURES ----
  
  // Calculation signals
  const hasDollarAmount = /\$\d[\d,]*/.test(s);
  const hasPercent = /\d+\s*%/.test(s);
  const hasUnits = /\d[\d,]*\s*(units?|shares?|hours?|days?|years?|months?)\b/i.test(s);
  const hasQuantities = hasDollarAmount || hasPercent || hasUnits;
  const hasCalcVerb = /\b(calculate|compute|determine|what is the|how much|what amount|solve for|enter|find the)\b/i.test(sL);
  
  // Scenario signals: company name + action
  const hasCompanyName = /[A-Z][a-z]+\s+(?:Technologies|Industries|Manufacturing|Corporation|Corp\.?|Inc\.?|Medical|Supply|Financial|Group|Global|Holdings|Logistics|Innovations|Healthcare|Enterprises|Properties|Solutions|Services|Systems|Energy|Communications|Data|Software|Biotech|Wholesale|Bank|Partners|LLC|Ltd\.?|Co\.?)\b/.test(s) ||
    /^[A-Z][a-z]+\s+(?:is |has |purchased|sold|issued|acquired|reports?|reported|estimates?|reviewing|implementing|uses?|using|produces|manufactures|operates|provides|sells?|buying|owns?|holds?|prepares?|develops|conducts|announces|plans?|expects?|projects?|forecasts|budgets?|closed|opened|started)\b/.test(s) ||
    /\b(?:At |The ).{1,40}(?:is |are |has |have |was |were |reports?|reported|estimates?|reviewing|implementing|uses?|using|produces|manufactures|operates)\b/.test(s);
  
  const hasScenario = hasCompanyName && numWords > 15;
  const isLongScenario = numWords > 40;
  
  // Question type signals
  const isWhichOf = /^which of the following/i.test(sL);
  const isDefinition = /^(what is|what are|which of the following (best |)defines|is defined as|refers to|is called|is known as)\b/i.test(sL);
  const isMostAppropriate = /\bwhich (response|statement|action) is most appropriate\b/i.test(sL);
  
  // Cognitive complexity signals
  const hasRecommend = /\b(recommend|advise|propose|suggest|should (select|choose|implement|adopt|pursue|use))\b/i.test(sL);
  const hasBest = /\b(best approach|most effective|optimal|preferable|most beneficial|most suitable|best course|best method)\b/i.test(sL);
  const hasTradeOff = /\b(trade.off|weigh|pros and cons|competing|alternatives|versus|vs\.?)\b/i.test(sL);
  const hasInterpret = /\b(indicate|reveal|imply|conclude|signify|explain why|what (does|would|might) this|what is the (most likely|primary) (reason|cause|explanation|implication)|what conclusion)\b/i.test(sL);
  const hasDataGiven = /\b(given the following|based on the (data|information|exhibit|schedule|report|analysis)|provided (below|above)|following (data|information))\b/i.test(sL);
  
  // Topic signals
  const isCostMgmt = /\b(costing|cost allocation|joint cost|process cost|job (order|cost)|activity.based|overhead|cost driver|cost pool|cost behavior|cvp|break.even|contribution margin|relevant cost|make.or.buy|sell.or.process)\b/i.test(t);
  const isBudget = /\b(budget|forecast|projection|master budget|operating budget|cash budget|flexible budget|static budget|planning|zero.based)\b/i.test(t);
  const isVariance = /\b(variance|favorable|unfavorable|price variance|quantity variance|efficiency variance|spending variance|volume variance)\b/i.test(t);
  const isFinReporting = /\b(financial statements?|balance sheet|income statement|cash flow|revenue recognition|inventory|depreciation|intangible|goodwill|bond|lease|equity|eps|ratio)\b/i.test(t);
  const isInternalControl = /\b(internal control|coso|sox|sarbanes|segregation|fraud|ethics|audit|risk (assessment|management|response))\b/i.test(t);
  const isTechAnalytics = /\b(data (analytics|governance|quality|mining|visualization)|erp|cybersecurity|ai |artificial intelligence|blockchain|automation|rpa|cloud|machine learning)\b/i.test(t);
  
  const hasAnalysisKeyword = /\banalyze\b/i.test(sL);
  
  // ========== CLASSIFICATION ENGINE ==========
  
  // --- EVALUATE: Genuine judgment, trade-offs, recommendations ---
  if (hasRecommend || hasBest) {
    if (hasTradeOff) return 'Evaluate';
    if (hasScenario && (hasRecommend || hasBest) && isLongScenario) return 'Evaluate';
    if (/\b(which (costing method|budgeting approach|pricing strategy|transfer price|allocation method|control framework) (should|would|is) best)\b/i.test(sL)) return 'Evaluate';
  }
  
  // --- ANALYZE: Data interpretation, pattern detection, cause analysis ---
  if (hasInterpret && (hasDataGiven || isLongScenario)) return 'Analyze';
  if (isVariance && hasInterpret) return 'Analyze';
  if (hasAnalysisKeyword && hasInterpret) return 'Analyze';
  if (hasDataGiven && hasScenario && isLongScenario) return 'Analyze';
  
  // --- APPLY: Scenario with procedural execution, calculation, or concept application ---
  // Calculation items
  if (hasQuantities && hasCalcVerb) return 'Apply';
  if (hasCalcVerb && hasScenario) return 'Apply';
  
  // Cost management scenarios (typically calculation-heavy)
  if (isCostMgmt && hasScenario) return 'Apply';
  
  // Budget items with scenarios
  if (isBudget && hasScenario) return 'Apply';
  
  // Variance items (even without interpretation, variance items are Apply)
  if (isVariance && hasScenario) return 'Apply';
  
  // Financial reporting scenario items
  if (isFinReporting && hasScenario && hasQuantities) return 'Apply';
  
  // Internal control scenario — concept application
  if (isInternalControl && hasScenario && !isMostAppropriate) return 'Apply';
  
  // General scenario items — the CMA norm is Apply
  if (hasScenario && isLongScenario) return 'Apply';
  
  // --- UNDERSTAND: Concept identification, standard recognition, classification ---
  // Scenario + concept identification (CMA norm)
  if (hasScenario) return 'Understand';
  
  // "Which response is most appropriate?" — standard recognition
  if (isMostAppropriate) return 'Understand';
  
  // "Which of the following" with substantive/discrimination choices
  if (isWhichOf && choices && choices.length >= 4 && choices.every(c => c && c.length > 10)) {
    return 'Understand';
  }
  
  // Concept explanation, standard application without scenario
  if (/\b(under |according to |per |pursuant to )/i.test(sL) && !hasScenario) return 'Understand';
  if (isFinReporting && !hasScenario) return 'Understand';
  if (isInternalControl && !hasScenario) return 'Understand';
  if (isBudget && !hasScenario) return 'Understand';
  if (isCostMgmt && !hasScenario) return 'Understand';
  if (isTechAnalytics) return 'Understand';
  
  // --- REMEMBER: Pure definitional recall ---
  if (isDefinition) return 'Remember';
  if (isWhichOf && numWords < 15 && !hasScenario) return 'Remember';
  if (numWords < 10 && !hasScenario) return 'Remember';
  
  // Default: Understand (safe fallback)
  return 'Understand';
}

// ============================================================================
const assignmentsPath = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS.json');
const firstPass = JSON.parse(fs.readFileSync(assignmentsPath, 'utf8'));
const censusPath = path.join(root, 'reports', 'session_status', 'SESSION718_MCQ_METADATA_CENSUS.json');
const census = JSON.parse(fs.readFileSync(censusPath, 'utf8'));

const itemLookup = {};
for (const [packName, packData] of Object.entries(census)) {
  if (packName === 'summary') continue;
  for (const item of packData.items || []) itemLookup[item.QuestionID] = item;
}

const v4Assignments = {};
const v4Stats = { total: 0, byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 }, byPack: {}, changes: {} };

for (const [qid, v1] of Object.entries(firstPass.assignments)) {
  const item = itemLookup[qid];
  if (!item) continue;
  const choices = (item.Choices || '').split(' | ').filter(Boolean);
  const cl = classify(item.StemPreview, item.Topic, choices, item.Difficulty, item.DifficultyScore);
  
  v4Assignments[qid] = { CognitiveLevel: cl, QuestionID: qid, Section: item.Section, Pack: v1.Pack, Topic: item.Topic, StemPreview: item.StemPreview, Difficulty: item.Difficulty, question_state: item.question_state, Certified: item.question_state === 'Certified', v1: v1.CognitiveLevel, changed: cl !== v1.CognitiveLevel };
  
  v4Stats.total++;
  v4Stats.byLevel[cl]++;
  if (!v4Stats.byPack[v1.Pack]) v4Stats.byPack[v1.Pack] = { total: 0, byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 } };
  v4Stats.byPack[v1.Pack].total++;
  v4Stats.byPack[v1.Pack].byLevel[cl]++;
  if (cl !== v1.CognitiveLevel) { const k = v1.CognitiveLevel + '→' + cl; v4Stats.changes[k] = (v4Stats.changes[k] || 0) + 1; }
}

const v4Path = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS_V4.json');
fs.writeFileSync(v4Path, JSON.stringify({ assignments: v4Assignments, stats: v4Stats }, null, 2));

console.log('=== S718 V4 (CMA-Aligned) ===\n');
console.log(`Total: ${v4Stats.total}`);
console.log('\nBy CognitiveLevel:');
for (const [level, count] of Object.entries(v4Stats.byLevel)) {
  console.log(`  ${level}: ${count} (${(count/v4Stats.total*100).toFixed(1)}%)`);
}
console.log('\nBy Pack:');
for (const [pack, pdata] of Object.entries(v4Stats.byPack)) {
  const parts = [];
  for (const [level, count] of Object.entries(pdata.byLevel)) {
    if (count > 0) parts.push(`${level}:${count}`);
  }
  console.log(`  ${pack}: ${pdata.total} — ${parts.join(', ')}`);
}
console.log(`\nTop changes from V1:`);
const sorted = Object.entries(v4Stats.changes).sort((a,b)=>b[1]-a[1]).slice(0,10);
for (const [ch, ct] of sorted) console.log(`  ${ch}: ${ct}`);
console.log(`\nWritten to: ${v4Path}`);
