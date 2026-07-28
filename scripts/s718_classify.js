// Session 718 — Agent B+C: Cognitive Framework + Classification Engine
// Reads census + pack files, assigns CognitiveLevel to items lacking it.
// Applies CMA-aligned rubric from DIFFICULTY_CALIBRATION_STANDARD.md v1.0 §3.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// ============================================================================
// COGNITIVE FRAMEWORK (Agent B)
// ============================================================================

// Bloom's Revised Taxonomy for CMA Part 1 MCQs
// Source: DIFFICULTY_CALIBRATION_STANDARD.md §3, TAXONOMY_REGISTRY.md §1

const FRAMEWORK = {
  Remember: {
    label: 'Remember',
    defaultDifficulty: 2,
    description: 'Recall facts, terms, definitions, standards. No scenario parsing required.',
    stemPatterns: [
      /^which of the following (is|are|best describes|correctly identifies|defines)/i,
      /^according to (gaap|ifrs|asc|coso|ima)/i,
      /^under (the )?(coso|gaap|ifrs|asc|sarbanes-oxley|dodd-frank)/i,
      /^what (is|are) the (primary|main|key|basic)/i,
      /^how (is|are) .{1,30} (defined|classified|reported|recognized|categorized)/i,
      /^which (standard|framework|guidance|pronouncement|concept|principle)/i,
    ],
    // Indicators: stem asks for a definition, lists terms, or expects direct recall
    heuristicScore: function(item) {
      let score = 0;
      const stem = (item.StemPreview || '').toLowerCase();
      const topic = (item.Topic || '').toLowerCase();
      
      // Short stem + definition ask
      if (stem.length < 60) score += 3;
      
      // Contains "defined as" / "refers to" / "is called"
      if (/\b(defined as|refers to|is called|is known as|is termed)\b/i.test(stem)) score += 3;
      
      // "Which of the following" + short stem = likely recall
      if (/^which of the following/i.test(stem) && stem.length < 100) score += 2;
      
      // Topic contains "definition" or similar
      if (/\b(definition|overview|introduction|basic|fundamental)\b/i.test(topic)) score += 1;
      
      return score;
    }
  },
  
  Understand: {
    label: 'Understand',
    defaultDifficulty: 2,
    description: 'Explain concepts, interpret meaning, distinguish between alternatives.',
    stemPatterns: [
      /^which of the following (best |most accurately )?(explains|describes|illustrates|exemplifies|represents|characterizes)/i,
      /(difference|distinction|contrast|comparison) between/i,
      /how does|why does|what is the role of/i,
      /(primary reason|main reason|key reason) (for|why)/i,
      /the (concept|principle|idea|notion) of .{1,40} (suggests|indicates|implies|means)/i,
      /(all of the above|none of the above|both .+ and .+)/i,
    ],
    heuristicScore: function(item) {
      let score = 0;
      const stem = (item.StemPreview || '').toLowerCase();
      
      // "Difference/distinguish between" = Understanding
      if (/\b(difference|distinguish|contrast|compared to|unlike)\b/i.test(stem)) score += 3;
      
      // "Which best describes/explains" = Understanding
      if (/\b(best describes|best explains|most accurate|most likely reason)\b/i.test(stem)) score += 2;
      
      // Moderate length scenario interpretation
      if (stem.length >= 60 && stem.length <= 200) score += 1;
      
      return score;
    }
  },
  
  Apply: {
    label: 'Apply',
    defaultDifficulty: 3,
    description: 'Execute calculations, apply procedures to scenarios.',
    stemPatterns: [
      /(calculate|compute|determine|solve for|what is the|how much|how many|what amount)/i,
      /^(a company|an entity|a firm) (has|had|reports|reported|purchased|sold|issued|acquired)/i,
      /(using|applying|under) the (straight-line|double-declining|units-of-production|fifo|lifo|weighted-average)/i,
      /(prepare|record|journalize|post|report)/i,
      /what (entry|amount|balance|total|cost|price|value|rate) should/i,
      /(break-even|breakeven|margin of safety|contribution margin|cash flow|net income|overhead)/i,
      /(variance|budget|forecast|projection|estimate)\b/i,
    ],
    heuristicScore: function(item) {
      let score = 0;
      const stem = (item.StemPreview || '').toLowerCase();
      const topic = (item.Topic || '').toLowerCase();
      
      // Contains numbers/dollar amounts in stem
      if (/\$\d+/.test(item.StemPreview || '') || /\d+%/.test(item.StemPreview || '') || /\d+ units/.test(item.StemPreview || '')) score += 4;
      
      // Calculation keywords
      if (/\b(calculate|compute|determine|what is the|how much)\b/i.test(stem)) score += 3;
      
      // Multi-step scenario
      if (/^(a company|an entity|meridian|nova|ember|zenith|harbor|northstar|atlas|vertex)\b/i.test(stem) && stem.length > 100) score += 2;
      
      // Topic is calculation-heavy
      if (/\b(calculation|budget|variance|costing|allocation|pricing|margin|break-even|depreciation|amortization|overhead)\b/i.test(topic)) score += 2;
      
      return score;
    }
  },
  
  Analyze: {
    label: 'Analyze',
    defaultDifficulty: 4,
    description: 'Break down information, identify patterns, interpret data.',
    stemPatterns: [
      /(analyze|interpret|evaluate the impact|assess the effect|what does .{1,30} indicate|what conclusion)/i,
      /based on the (data|information|exhibit|schedule|report|analysis)/i,
      /which (factor|trend|pattern|finding|result) (is|was|would be) most/i,
      /(variance analysis|trend analysis|ratio analysis|comparative analysis|financial statement analysis)/i,
      /why (might|would|could|should) the (difference|variance|change|deviation)/i,
      /how (should|would|can) .{1,40} (be interpreted|be explained|be understood)/i,
    ],
    heuristicScore: function(item) {
      let score = 0;
      const stem = (item.StemPreview || '').toLowerCase();
      
      // "Based on the data/information/exhibit" = Analysis
      if (/\b(based on the|according to the data|review the|examine the)\b/i.test(stem)) score += 3;
      
      // "What does this indicate/reveal/imply" = Analysis
      if (/\b(indicate|reveal|imply|suggest|infer|conclude)\b/i.test(stem)) score += 3;
      
      // Long scenario with data interpretation
      if (stem.length > 200 && /\b(analysis|interpretation|review|assessment)\b/i.test(stem)) score += 2;
      
      // Multi-concept integration
      if (/\b(both|combining|integrating|considering|taking into account)\b/i.test(stem)) score += 2;
      
      return score;
    }
  },
  
  Evaluate: {
    label: 'Evaluate',
    defaultDifficulty: 4,
    description: 'Make judgments, assess alternatives, professional decision-making.',
    stemPatterns: [
      /(recommend|advise|suggest|propose|which (action|course|decision|step|approach) should|what should .{1,30} (do|recommend|propose))/i,
      /(most appropriate|best course|optimal|preferable|least desirable|most effective)/i,
      /(evaluate|judge|decide|choose|select the best|which alternative is)/i,
      /(ethical|ethics|professional (judgment|responsibility|obligation))/i,
      /(risk (assessment|evaluation|management|response) |cost-benefit|trade.off|pros and cons)/i,
      /which (investment|project|proposal|option|alternative|plan) should be (selected|chosen|approved|implemented|rejected)/i,
    ],
    heuristicScore: function(item) {
      let score = 0;
      const stem = (item.StemPreview || '').toLowerCase();
      
      // "Recommend/advise which action" = Evaluation
      if (/\b(recommend|advise|propose|suggest|endorse)\b/i.test(stem)) score += 4;
      
      // "Most appropriate/best course" = Evaluation
      if (/\b(most appropriate|best course|most effective|least desirable|optimal choice)\b/i.test(stem)) score += 3;
      
      // Professional judgment
      if (/\b(professional judgment|ethical|ethics|should the controller|should management)\b/i.test(stem)) score += 3;
      
      return score;
    }
  }
};

// ============================================================================
// CLASSIFICATION ENGINE (Agent C)
// ============================================================================

function classifyCognitiveLevel(item) {
  const scores = {};
  
  for (const [level, config] of Object.entries(FRAMEWORK)) {
    scores[level] = config.heuristicScore(item);
    
    // Pattern matching boost
    const stem = (item.StemPreview || '').toLowerCase();
    for (const pattern of config.stemPatterns) {
      if (pattern.test(stem)) {
        scores[level] += 3;
        break; // One pattern match is sufficient
      }
    }
  }
  
  // Apply topic-based adjustments
  const topic = (item.Topic || '').toLowerCase();
  
  // Calculation-heavy topics → Apply
  if (/\b(calculation|compute|budget|variance|costing|overhead allocation|depreciation schedule)\b/i.test(topic)) {
    scores.Apply += 2;
  }
  
  // Definition-heavy topics → Remember
  if (/\b(definition|overview|terminology|classification|types of|elements of|components of)\b/i.test(topic)) {
    scores.Remember += 2;
  }
  
  // Analysis topics → Analyze
  if (/\b(analysis|interpretation|ratio analysis|trend analysis|variance analysis|comparative)\b/i.test(topic)) {
    scores.Analyze += 2;
  }
  
  // Decision-making topics → Evaluate
  if (/\b(decision|ethics|recommendation|selection|choice|investment decision|capital budget)\b/i.test(topic)) {
    scores.Evaluate += 2;
  }
  
  // Numeric answer detection — strong Apply signal
  if (item.Type === 'numeric' || /\$\d+/.test(item.StemPreview || '') || /\d+%/.test(item.StemPreview || '')) {
    scores.Apply += 2;
  }
  
  // Determine the highest-scoring level
  let bestLevel = 'Understand'; // safe default
  let bestScore = -Infinity;
  
  for (const [level, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestLevel = level;
    }
  }
  
  // Tie-breaker rules
  if (Object.values(scores).filter(s => s === bestScore).length > 1) {
    // Prefer Apply over Understand for numeric
    if (scores.Apply === bestScore && item.Type === 'numeric') bestLevel = 'Apply';
    // Prefer Understand over Remember for >60-char stems
    else if (scores.Understand === bestScore && scores.Remember === bestScore && (item.StemPreview || '').length > 60) bestLevel = 'Understand';
    // Prefer Understand for stems with "best describes" / "explains"
    else if (scores.Understand === bestScore && /\b(best describes|explains|illustrates)\b/i.test((item.StemPreview || '').toLowerCase())) bestLevel = 'Understand';
    // Prefer Analyze for stems with "based on"
    else if (scores.Analyze === bestScore && /\b(based on|according to the)\b/i.test((item.StemPreview || '').toLowerCase())) bestLevel = 'Analyze';
  }
  
  return {
    CognitiveLevel: bestLevel,
    Confidence: Math.min(100, Math.round(bestScore / Math.max(1, Object.values(scores).reduce((a, b) => a + b, 0)) * 100)),
    Scores: scores,
  };
}

// ============================================================================
// MAIN: Process all packs
// ============================================================================

const PACKS = [
  { name: 'pack_a', file: 'pack_a_corrected.js', varName: 'pack_a' },
  { name: 'pack_b', file: 'pack_b_corrected.js', varName: 'pack_b' },
  { name: 'pack_c', file: 'pack_c_corrected.js', varName: 'pack_c' },
  { name: 'pack_d', file: 'pack_d_corrected.js', varName: 'pack_d' },
  { name: 'pack_e', file: 'pack_e_corrected.js', varName: 'pack_e' },
];

// Load census
const censusPath = path.join(root, 'reports', 'session_status', 'SESSION718_MCQ_METADATA_CENSUS.json');
const census = JSON.parse(fs.readFileSync(censusPath, 'utf8'));

const allAssignments = {};
const stats = {
  total: 0,
  classified: 0,
  alreadyHadCL: 0,
  byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 },
  byPack: {},
  bySection: {},
  lowConfidence: [],
};

for (const [packName, packData] of Object.entries(census)) {
  if (packName === 'summary') continue;
  
  stats.byPack[packName] = { total: 0, classified: 0, alreadyHadCL: 0, byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 } };
  
  for (const item of (packData.items || [])) {
    stats.total++;
    stats.byPack[packName].total++;
    
    if (item.CognitiveLevel) {
      stats.alreadyHadCL++;
      stats.byPack[packName].alreadyHadCL++;
      continue;
    }
    
    const result = classifyCognitiveLevel(item);
    allAssignments[item.QuestionID] = {
      ...result,
      Section: item.Section,
      Pack: packName,
      Topic: item.Topic,
      StemPreview: item.StemPreview,
      Difficulty: item.Difficulty,
      question_state: item.question_state,
      Certified: item.question_state === 'Certified',
    };
    
    stats.classified++;
    stats.byPack[packName].classified++;
    stats.byLevel[result.CognitiveLevel]++;
    stats.byPack[packName].byLevel[result.CognitiveLevel]++;
    
    if (!stats.bySection[item.Section]) {
      stats.bySection[item.Section] = { total: 0, byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 } };
    }
    stats.bySection[item.Section].total++;
    stats.bySection[item.Section].byLevel[result.CognitiveLevel]++;
    
    // Flag low-confidence assignments (<60)
    if (result.Confidence < 60) {
      stats.lowConfidence.push(item.QuestionID);
    }
  }
}

// Write assignments
const assignmentsPath = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS.json');
fs.writeFileSync(assignmentsPath, JSON.stringify({ assignments: allAssignments, stats }, null, 2));

console.log(`\n=== S718 Classification Results ===`);
console.log(`Total items in scope: ${stats.total}`);
console.log(`Already had CognitiveLevel: ${stats.alreadyHadCL}`);
console.log(`Classified: ${stats.classified}`);
console.log(`\nBy CognitiveLevel:`);
for (const [level, count] of Object.entries(stats.byLevel)) {
  const pct = stats.classified > 0 ? (count / stats.classified * 100).toFixed(1) : '0.0';
  console.log(`  ${level}: ${count} (${pct}%)`);
}
console.log(`\nBy Pack:`);
for (const [pack, pdata] of Object.entries(stats.byPack)) {
  console.log(`  ${pack}: ${pdata.classified} classified (${pdata.alreadyHadCL} already had CL)`);
  for (const [level, count] of Object.entries(pdata.byLevel)) {
    if (count > 0) console.log(`    ${level}: ${count}`);
  }
}
console.log(`\nLow-confidence assignments (<60): ${stats.lowConfidence.length}`);
if (stats.lowConfidence.length > 0 && stats.lowConfidence.length <= 20) {
  console.log(`  QIDs: ${stats.lowConfidence.join(', ')}`);
}
console.log(`\nAssignments written to: ${assignmentsPath}`);
