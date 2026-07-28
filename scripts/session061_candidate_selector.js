// Session 61 — CMA Part 1 MCQ Rewrite Program Candidate Selector
// READ ONLY — generates report at reports/SESSION061_REWRITE_CANDIDATES.json

const fs = require('fs');
const path = require('path');

// === 1. Parse all 5 pack files using Function constructor ===

const packFiles = [
  { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A', label: 'A' },
  { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B', label: 'B' },
  { file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C', label: 'C' },
  { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D', label: 'D' },
  { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E', label: 'E' },
];

const allItems = [];
const byPack = {};

for (const pf of packFiles) {
  const src = fs.readFileSync(path.join(__dirname, '..', pf.file), 'utf8');
  // Wrap: declare variable in function scope, then return it
  const fn = new Function(src + '\nreturn ' + pf.varName + ';');
  const items = fn();
  if (!Array.isArray(items)) {
    console.error(`ERROR: ${pf.file} did not produce an array, got ${typeof items}`);
    process.exit(1);
  }
  for (const item of items) {
    item._pack = pf.label;
    item._file = pf.file;
    allItems.push(item);
  }
  byPack[pf.label] = items;
  console.error(`Parsed ${pf.file}: ${items.length} items`);
}

console.error(`\nTotal items parsed: ${allItems.length}`);

// === 2. Filter to question_state: "Certified" only ===

const certified = allItems.filter(item => item.question_state === 'Certified');
console.error(`Certified items: ${certified.length}`);

// === 3. Cognitive level distribution of certified pool ===

const cogCounts = {};
for (const item of certified) {
  const cl = item.CognitiveLevel || 'UNKNOWN';
  cogCounts[cl] = (cogCounts[cl] || 0) + 1;
}
console.error('\nCognitive level distribution (Certified pool):');
for (const [k, v] of Object.entries(cogCounts).sort()) {
  console.error(`  ${k}: ${v} (${(v / certified.length * 100).toFixed(1)}%)`);
}

// === 4. Difficulty distribution ===

const diffCounts = {};
for (const item of certified) {
  const d = item.Difficulty || 'UNKNOWN';
  diffCounts[d] = (diffCounts[d] || 0) + 1;
}
console.error('\nDifficulty distribution (Certified pool):');
for (const [k, v] of Object.entries(diffCounts).sort()) {
  console.error(`  ${k}: ${v}`);
}

// === 5. Define avoidance rules ===

// Pack B Sections E+F — recently certified, avoid
function isPackB_EF(item) {
  return item._pack === 'B' && (item.Section === 'E' || item.Section === 'F');
}

// DL-012 replacements in Pack A (19 items replaced by S892: Section A: 2 + Section E: 17)
// These were authored as Analyze/Evaluate — extract from Topic field
function is_DL012_replacement(item) {
  // Pack A Section A: 2 items — Topics likely "A.xxx" with Section A
  // Pack A Section E: 17 items — COSO topics with Section E
  // The replacement items were newly authored so they likely have distinct topic names
  // We identify by: Pack A, and the item is already Analyze or Evaluate (which we're filtering out anyway)
  // Also, Pack A Section E items in the range P1-E-046 through P1-E-074 were the clone group
  // The replacements would be in similar QID ranges
  if (item._pack !== 'A') return false;
  // DL-012 replacements are Pack A items that replace archived clones
  // The S892 replacements are in Pack A Section A (2 items) and Section E (17 items)
  // Since they're all already Analyze/Evaluate, our cognitive filter will exclude them
  // So this is redundant — but let's be explicit
  return false; // Filtered by cognitive level already
}

// Structural defects: DL-008 = non-empty ExplanationWrong[CorrectChoice]
function hasDL008(item) {
  const cc = item.CorrectChoice;
  if (!cc) return false;
  const ewField = 'ExplanationWrong' + cc;
  return item[ewField] && item[ewField].trim() !== '';
}

// Structural defects: DL-026 = empty non-CC ExplanationWrong slots
function hasDL026(item) {
  const cc = item.CorrectChoice;
  if (!cc) return false;
  for (const letter of ['A', 'B', 'C', 'D']) {
    if (letter === cc) continue;
    const ewField = 'ExplanationWrong' + letter;
    if (!item[ewField] || item[ewField].trim() === '') return true;
  }
  return false;
}

// Check for certification_session field (S899-S60)
function isRecentlyCertified(item) {
  if (!item.certification_session) return false;
  // Match S60 through S899
  const m = item.certification_session.match(/S(\d+)/i);
  if (!m) return false;
  const num = parseInt(m[1]);
  return num >= 60 && num <= 899;
}

// === 6. Build candidate pool: Understand or Apply, Easy or Moderate-Easy ===

const candidatePool = certified.filter(item => {
  const cl = item.CognitiveLevel;
  const diff = item.Difficulty;
  
  // Must be Understand or Apply
  if (cl !== 'Understand' && cl !== 'Apply') return false;
  
  // Must be Easy or Moderate-Easy
  if (diff !== 'Easy' && diff !== 'Moderate-Easy') return false;
  
  // Avoid Pack B Sections E+F
  if (isPackB_EF(item)) return false;
  
  // Avoid recently certified (S60-S899)
  if (isRecentlyCertified(item)) return false;
  
  // Avoid structural defects
  if (hasDL008(item)) return false;
  if (hasDL026(item)) return false;
  
  return true;
});

console.error(`\nCandidate pool (Understand/Apply + Easy/Moderate-Easy, no defects, no recent certs): ${candidatePool.length}`);

// Distribution
const poolByCog = {};
const poolByDiff = {};
const poolByPack = {};
const poolBySection = {};
for (const item of candidatePool) {
  poolByCog[item.CognitiveLevel] = (poolByCog[item.CognitiveLevel] || 0) + 1;
  poolByDiff[item.Difficulty] = (poolByDiff[item.Difficulty] || 0) + 1;
  const pk = item._pack;
  poolByPack[pk] = (poolByPack[pk] || 0) + 1;
  const sec = item.Section;
  poolBySection[sec] = (poolBySection[sec] || 0) + 1;
}
console.error('\nCandidate pool by CognitiveLevel:', JSON.stringify(poolByCog));
console.error('Candidate pool by Difficulty:', JSON.stringify(poolByDiff));
console.error('Candidate pool by Pack:', JSON.stringify(poolByPack));
console.error('Candidate pool by Section:', JSON.stringify(poolBySection));

// === 7. Classify candidates: definition-driven vs. shallow calculation ===

// Definition-driven: stem contains a textbook definition and answer is the term
// Heuristic: short stem (<200 chars), simple wording, correct answer is a simple term
function isDefinitionDriven(item) {
  const stem = item.Stem || '';
  const choices = item.Choices || {};
  const cc = item.CorrectChoice;
  
  // Short stems are more likely definition-driven
  if (stem.length > 250) return false;
  
  // Check if the correct choice is a short, simple term (not a number or calculation result)
  const correctText = choices[cc] || '';
  if (correctText.length < 3 || correctText.length > 80) return false;
  
  // Definition-driven stems often follow patterns like:
  // "X is..." "Which of the following..." "What is..."
  const definitionPatterns = [
    /^which of the following (best )?describes/i,
    /^what (is|are) /i,
    /^the (term|concept|process) /i,
    /^which (of the )?following (is|best|most|correctly) (describes|defines|identifies)/i,
    /^[A-Z][a-z]+ (is|are|refers to|describes) /i,
    /^(under|in|per) (GAAP|IFRS|COSO|ASC)/i,
    /^a (company|firm|business) (that|which) /i,
    /^a(?:n)? [a-z]+ (is|are) /i,
  ];
  
  for (const pat of definitionPatterns) {
    if (pat.test(stem)) return true;
  }
  
  return false;
}

// Shallow calculation: requires a simple calculation but is labeled Easy
function isShallowCalculation(item) {
  if (item.CognitiveLevel !== 'Apply') return false;
  if (item.Difficulty !== 'Easy') return false;
  
  const stem = item.Stem || '';
  // Contains numbers or calculation indicators
  const calcIndicators = [
    /\$\d[\d,]*/,
    /\d+%/,
    /\d+ units/,
    /calculate/i,
    /compute/i,
    /amount is/i,
    /how much/i,
    /what is the (amount|total|value|cost|price|rate)/i,
    /how many/i,
  ];
  
  for (const ind of calcIndicators) {
    if (ind.test(stem)) return true;
  }
  
  return false;
}

// Score each candidate for rewrite potential
function scoreCandidate(item) {
  let score = 0;
  
  // Definition-driven = highest priority for Analyze conversion
  if (isDefinitionDriven(item)) score += 100;
  
  // Shallow calculation = good for Evaluate conversion
  if (isShallowCalculation(item)) score += 50;
  
  // Easy items are better candidates (more room to grow)
  if (item.Difficulty === 'Easy') score += 30;
  
  // Understand → Analyze is a bigger jump opportunity
  if (item.CognitiveLevel === 'Understand') score += 20;
  
  // Shorter stems are more likely to be bare definitions
  const stem = item.Stem || '';
  if (stem.length < 150) score += 10;
  
  return score;
}

// Score all candidates
for (const item of candidatePool) {
  item._score = scoreCandidate(item);
  item._isDefinition = isDefinitionDriven(item);
  item._isShallowCalc = isShallowCalculation(item);
}

// Sort by score descending
candidatePool.sort((a, b) => b._score - a._score);

// === 8. Determine rewrite target (Analyze vs Evaluate) ===

function determineRewriteTarget(item) {
  // Definition-driven: convert to Analyze (compare/contrast, apply to scenario, identify implications)
  if (item._isDefinition) return 'Analyze';
  
  // Shallow calculation with decision-making potential: convert to Evaluate
  if (item._isShallowCalc) return 'Evaluate';
  
  // Understand at Easy → Analyze (add scenario/context)
  if (item.CognitiveLevel === 'Understand' && item.Difficulty === 'Easy') return 'Analyze';
  
  // Apply at Easy → Evaluate (add judgment/decision)
  if (item.CognitiveLevel === 'Apply' && item.Difficulty === 'Easy') return 'Evaluate';
  
  // Default
  return 'Analyze';
}

function describeRewriteAngle(item) {
  const stem = item.Stem || '';
  const choices = item.Choices || {};
  const cc = item.CorrectChoice;
  const correctText = choices[cc] || '';
  const topic = item.Topic || '';
  const section = item.Section || '';
  const topicShort = topic.replace(/^[A-F][.-]?\d{3}\s*/, ''); // Strip topic number prefix
  
  if (item._isDefinition && item.CognitiveLevel === 'Understand') {
    // Pure definition recall → Analyze: add a business scenario
    return `[Current: "${stem.substring(0, 120)}"] Rewrite: Add a realistic business scenario (named company, specific issue) requiring the candidate to analyze the situation and select which concept/standard applies, with distractors that represent similar but incorrect concepts applied to the same scenario.`;
  }
  
  if (item._isDefinition && item.CognitiveLevel === 'Apply') {
    // Mislabeled definition as Apply → Analyze with scenario
    return `[Current: "${stem.substring(0, 120)}"] This is definition recall mislabeled as Apply. Rewrite: Embed in a multi-fact scenario where the candidate must analyze the fact pattern, determine which standard/rule governs, and identify the consequence for financial reporting or control.`;
  }
  
  if (item._isShallowCalc) {
    // Simple calculation → Evaluate: add judgment/decision
    return `[Current: "${stem.substring(0, 120)}"] Rewrite: Add a managerial decision context — after computing the metric, the candidate must evaluate a business proposal (accept/reject, invest/divest, favorable/unfavorable investigation) and justify the recommendation using the computed result.`;
  }
  
  if (item.CognitiveLevel === 'Understand') {
    // Understand → Analyze: add comparative/contextual elements
    return `[Current: "${stem.substring(0, 120)}"] Rewrite: Present a business situation with competing indicators and ask the candidate to analyze which concept applies and explain the implication for the decision-maker, with distractors testing confusion between this and a closely related ${section} domain concept.`;
  }
  
  return `[Current: "${stem.substring(0, 120)}"] Rewrite: Extend to require a judgment call — present a business decision with quantitative and qualitative factors, and ask the candidate to evaluate the alternatives, selecting the best course of action with supporting rationale.`;
}

// === 9. Select 20 candidates with strict diversification ===

// Target: 12 Analyze + 8 Evaluate
// Minimums: 2 per domain (12 of 20), per-pack cap ~5, per-section cap ~2
// Phase 1: Fill minimums (2 per domain, prioritizing Analyze targets first)
// Phase 2: Fill remaining slots balancing packs and target split

const selected = [];
const selectedIds = new Set();

// Sort: pack diversity first (prefer underrepresented packs), then score
// Group candidates by pack for rotation
const candidatesByPack = {};
for (const item of candidatePool) {
  const p = item._pack;
  if (!candidatesByPack[p]) candidatesByPack[p] = [];
  candidatesByPack[p].push(item);
}

// Sort within each pack by score
for (const p of Object.keys(candidatesByPack)) {
  candidatesByPack[p].sort((a, b) => b._score - a._score);
}

// Phase 1: Fill domain minimums (2 per domain, across 6 domains = 12 slots)
// Target: 7 Analyze + 5 Evaluate from these 12
const domainPhase1Targets = { 'A': 2, 'B': 2, 'C': 2, 'D': 2, 'E': 2, 'F': 2 };
const domainPhase1Counts = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0 };
const packPhase1Counts = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0 };

function selectFromPhase1() {
  // Try to meet domain minimums by iterating through packs in round-robin order
  const packOrder = ['B', 'C', 'D', 'E', 'A']; // Prefer underrepresented packs first
  let changed = true;
  
  while (changed && selected.length < 12) {
    changed = false;
    for (const pack of packOrder) {
      const candidates = candidatesByPack[pack] || [];
      for (const item of candidates) {
        if (selectedIds.has(item.QuestionID)) continue;
        const domain = item.Section;
        if (domainPhase1Counts[domain] >= domainPhase1Targets[domain]) continue;
        if (packPhase1Counts[pack] >= 3) continue; // Cap per pack in phase 1
        
        // Determine target - favor Analyze for definition-driven, Evaluate otherwise
        const target = determineRewriteTarget(item);
        const currentA = selected.filter(s => s._rewriteTarget === 'Analyze').length;
        const currentE = selected.filter(s => s._rewriteTarget === 'Evaluate').length;
        
        if (currentA >= 7 && target === 'Analyze') continue;
        if (currentE >= 5 && target === 'Evaluate') continue;
        
        item._rewriteTarget = target;
        item._rewriteAngle = describeRewriteAngle(item);
        selected.push(item);
        selectedIds.add(item.QuestionID);
        domainPhase1Counts[domain]++;
        packPhase1Counts[pack]++;
        changed = true;
        break; // Move to next pack
      }
    }
  }
}

selectFromPhase1();

console.error(`\nPhase 1 complete: ${selected.length} items selected`);
console.error(`Domain counts: ${JSON.stringify(domainPhase1Counts)}`);
console.error(`Pack counts: ${JSON.stringify(packPhase1Counts)}`);

// Phase 2: Fill remaining 8 slots with balance across packs and target split
const remainingSlots = 20 - selected.length;
const remainingAnalyze = 12 - selected.filter(s => s._rewriteTarget === 'Analyze').length;
const remainingEvaluate = 8 - selected.filter(s => s._rewriteTarget === 'Evaluate').length;

console.error(`Phase 2: ${remainingSlots} slots remaining (${remainingAnalyze}A + ${remainingEvaluate}E)`);

// Build a set of already-selected topic patterns to avoid clone pairs
function topicKey(item) {
  const t = (item.Topic || '').replace(/^[A-F][.-]?\d{3}\s*/, '').toLowerCase().trim();
  // Further normalize: strip company names, trailing numbers
  return t.replace(/\b[a-z]+way\b|\b[a-z]+side\b|\b[a-z]+view\b|\b[a-z]+wood\b|\b[a-z]+land\b|\b[a-z]+ton\b|\b[a-z]+ley\b|\b[a-z]+son\b|\b[a-z]+set\b|\b[a-z]+ford\b|\b[a-z]+dale\b|\b[a-z]+well\b/gi, '');
}

const selectedTopicKeys = new Set();
for (const item of selected) {
  selectedTopicKeys.add(topicKey(item));
}

// Sort remaining candidates by: pack diversity bonus + score
const remaining = candidatePool.filter(item => {
  if (selectedIds.has(item.QuestionID)) return false;
  // Avoid clone pairs: skip if same topic already selected
  if (selectedTopicKeys.has(topicKey(item))) return false;
  return true;
});

function packDiversityBonus(item) {
  const pack = item._pack;
  const current = selected.filter(s => s._pack === pack).length;
  // Heavy bonus for packs with few selections
  if (current === 0) return 1000;
  if (current === 1) return 500;
  if (current === 2) return 200;
  if (current === 3) return 50;
  return 0;
}

function domainDiversityBonus(item) {
  const domain = item.Section;
  const current = selected.filter(s => s.Section === domain).length;
  if (current <= 2) return 300;
  if (current === 3) return 100;
  return 0;
}

remaining.forEach(item => {
  item._diversityScore = item._score + packDiversityBonus(item) + domainDiversityBonus(item);
});

remaining.sort((a, b) => b._diversityScore - a._diversityScore);

// Select phase 2 with caps
const maxPerPack = 5; // Max 5 per pack
const maxPerDomain = 5; // Max 5 per domain
const maxPerSection = 3; // Max 3 per pack-section combo

for (const item of remaining) {
  if (selected.length >= 20) break;
  
  const pack = item._pack;
  const domain = item.Section;
  const secKey = pack + '-' + domain;
  
  const packCount = selected.filter(s => s._pack === pack).length;
  const domainCount = selected.filter(s => s.Section === domain).length;
  const secCount = selected.filter(s => s._pack + '-' + s.Section === secKey).length;
  
  if (packCount >= maxPerPack) continue;
  if (domainCount >= maxPerDomain) continue;
  if (secCount >= maxPerSection) continue;
  
  let target = determineRewriteTarget(item);
  const currentA = selected.filter(s => s._rewriteTarget === 'Analyze').length;
  const currentE = selected.filter(s => s._rewriteTarget === 'Evaluate').length;
  
  if (currentA >= 12 && target === 'Analyze') continue;
  if (currentE >= 8 && target === 'Evaluate') continue;
  
  // If we need more of the other type, try to flip
  if (currentA >= 12 && target === 'Analyze') target = 'Evaluate';
  if (currentE >= 8 && target === 'Evaluate') target = 'Analyze';
  
  item._rewriteTarget = target;
  item._rewriteAngle = describeRewriteAngle(item);
  selected.push(item);
  selectedIds.add(item.QuestionID);
}

console.error(`Phase 2 complete: ${selected.length} total selected`);

const analyzeSelected = selected.filter(s => s._rewriteTarget === 'Analyze');
const evaluateSelected = selected.filter(s => s._rewriteTarget === 'Evaluate');
console.error(`\nFinal: ${selected.length} total (${analyzeSelected.length} Analyze, ${evaluateSelected.length} Evaluate)`);

// === 10. Build output ===

const domainDist = {};
const packDist = {};
const sectionDist = {};
for (const item of selected) {
  const d = item.Section;
  domainDist[d] = (domainDist[d] || 0) + 1;
  const p = item._pack;
  packDist[p] = (packDist[p] || 0) + 1;
  const s = p + '-' + d;
  sectionDist[s] = (sectionDist[s] || 0) + 1;
}

const output = {
  session: "061",
  phase: "candidate-selection",
  timestamp: new Date().toISOString(),
  pool_summary: {
    total_certified: certified.length,
    understand: cogCounts['Understand'] || 0,
    apply: cogCounts['Apply'] || 0,
    analyze: cogCounts['Analyze'] || 0,
    evaluate: cogCounts['Evaluate'] || 0,
    remember: cogCounts['Remember'] || 0,
    candidate_pool_size: candidatePool.length
  },
  candidates: selected.map((item, idx) => ({
    rank: idx + 1,
    question_id: item.QuestionID,
    pack: item._pack,
    section: item.Section,
    current_cognitive: item.CognitiveLevel,
    current_difficulty: item.Difficulty,
    topic: item.Topic || '',
    stem_preview: (item.Stem || '').substring(0, 200),
    correct_choice: item.CorrectChoice,
    is_definition_driven: item._isDefinition,
    is_shallow_calculation: item._isShallowCalc,
    rewrite_target: item._rewriteTarget,
    rewrite_angle: item._rewriteAngle
  })),
  selection_rationale: `Selected ${selected.length} certified items from a candidate pool of ${candidatePool.length} (Understand/Apply at Easy/Moderate-Easy, no structural defects DL-008/DL-026, excluding Pack B Sections E+F). Prioritized definition-driven items (stem as textbook definition + answer as term) for Analyze conversion, and shallow Apply-at-Easy items for Evaluate conversion. Diversified across all 6 blueprint domains (minimum 2 per domain) and all 5 packs.`,
  domain_distribution: domainDist,
  pack_distribution: packDist,
  section_distribution: sectionDist,
  target_split: { analyze: 12, evaluate: 8 }
};

// === 11. Write output ===

const outPath = path.join(__dirname, '..', 'reports', 'SESSION061_REWRITE_CANDIDATES.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.error(`\nOutput written to: ${outPath}`);

// === 12. Print candidate list ===
console.log('\n=== SESSION 61 REWRITE CANDIDATES ===\n');
for (const c of output.candidates) {
  console.log(`${c.rank.toString().padStart(2)}. ${c.question_id} | ${c.pack}/${c.section} | ${c.current_cognitive.padEnd(10)} | ${c.current_difficulty.padEnd(13)} | → ${c.rewrite_target.padEnd(8)} | ${c.rewrite_angle.substring(0, 120)}...`);
}
console.log(`\nDomain: ${JSON.stringify(domainDist)}`);
console.log(`Pack: ${JSON.stringify(packDist)}`);
console.log(`Split: ${output.candidates.filter(c => c.rewrite_target === 'Analyze').length}A / ${output.candidates.filter(c => c.rewrite_target === 'Evaluate').length}E`);
