// session69_roadmap_scan.js
// READ-ONLY — Counts CognitiveLevel distribution across all 5 packs
// Output: JSON to stdout, summary to stderr

const fs = require('fs');
const path = require('path');

const packs = [
  { name: 'Pack A', file: 'pack_a_corrected.js', expected: 500 },
  { name: 'Pack B', file: 'pack_b_corrected.js', expected: 500 },
  { name: 'Pack C', file: 'pack_c_corrected.js', expected: 500 },
  { name: 'Pack D', file: 'pack_d_corrected.js', expected: 500 },
  { name: 'Pack E', file: 'pack_e_corrected.js', expected: 540 },
];

const levels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
const countsByPack = {};
const countsBySection = {}; // Pack:Section -> {level: count}
let grandTotal = 0;
let grand = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 };

for (const pack of packs) {
  const filePath = path.join(__dirname, '..', pack.file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${pack.file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Count QuestionID occurrences to get actual item count
  const qidMatches = content.match(/"QuestionID":/g);
  const actualCount = qidMatches ? qidMatches.length : 0;
  
  // Count by CognitiveLevel
  const packCounts = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 };
  for (const level of levels) {
    const regex = new RegExp(`"CognitiveLevel":\\s*"${level}"`, 'g');
    const matches = content.match(regex);
    packCounts[level] = matches ? matches.length : 0;
  }
  
  // Section-level counts — extract QuestionID to get section, then pair with CognitiveLevel
  // Use a simpler approach: extract all pairs of (Section, CognitiveLevel)
  const sectionLevelPairs = [];
  const blockRegex = /"Section":\s*"([A-F])"[\s\S]*?"CognitiveLevel":\s*"(Remember|Understand|Apply|Analyze|Evaluate)"/g;
  let match;
  while ((match = blockRegex.exec(content)) !== null) {
    sectionLevelPairs.push({ section: match[1], level: match[2] });
  }
  
  // Fallback: try reverse pattern (CognitiveLevel before Section)
  if (sectionLevelPairs.length === 0) {
    const revRegex = /"CognitiveLevel":\s*"(Remember|Understand|Apply|Analyze|Evaluate)"[\s\S]*?"Section":\s*"([A-F])"/g;
    while ((match = revRegex.exec(content)) !== null) {
      sectionLevelPairs.push({ section: match[2], level: match[1] });
    }
  }
  
  // Aggregate section counts
  const sectionCounts = {};
  for (const { section, level } of sectionLevelPairs) {
    const key = `${pack.name}:Section ${section}`;
    if (!sectionCounts[key]) sectionCounts[key] = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 };
    sectionCounts[key][level]++;
  }
  
  countsByPack[pack.name] = {
    file: pack.file,
    expected: pack.expected,
    actual: actualCount,
    counts: packCounts,
    sections: sectionCounts,
  };
  
  for (const level of levels) {
    grand[level] += packCounts[level];
  }
  grandTotal += actualCount;
}

// Compute percentages
const result = {
  scan_time: new Date().toISOString(),
  total_items: grandTotal,
  grand_counts: grand,
  grand_percentages: {},
  by_pack: countsByPack,
  velocity: {
    rewrites_per_session: 12.6,
    evaluate_per_session: 5.4,
    analyze_per_session: 5.1,
    sessions_completed: 8, // S61-S68
    rewrites_completed: 84,
    evaluate_completed: 43,
    analyze_completed: 41,
  },
};

for (const level of levels) {
  result.grand_percentages[level] = grandTotal > 0 ? ((grand[level] / grandTotal) * 100).toFixed(1) + '%' : '0.0%';
}

// Target calculations
const targetHO = 0.40; // 40% higher-order
const targetEvaluate = 0.15; // 15% Evaluate
const targetAnalyze = 0.25; // 25% Analyze

const currentHO = grand.Analyze + grand.Evaluate;
const currentHOPct = grandTotal > 0 ? (currentHO / grandTotal) * 100 : 0;
const gapHO = Math.max(0, Math.ceil(targetHO * grandTotal) - currentHO);
const gapEvaluate = Math.max(0, Math.ceil(targetEvaluate * grandTotal) - grand.Evaluate);
const gapAnalyze = Math.max(0, Math.ceil(targetAnalyze * grandTotal) - grand.Analyze);

result.targets = {
  higher_order_target_pct: '40%',
  evaluate_target_pct: '15%',
  analyze_target_pct: '25%',
  current_higher_order: currentHO,
  current_higher_order_pct: currentHOPct.toFixed(1) + '%',
  target_higher_order_count: Math.ceil(targetHO * grandTotal),
  gap_higher_order: gapHO,
  gap_evaluate: gapEvaluate,
  gap_analyze: gapAnalyze,
};

// Session projections
const rewritesPerSession = 12.6;
const evalPerSession = 5.4;
const analyzePerSession = 5.1;

result.projections = {
  sessions_to_close_HO_gap: Math.ceil(gapHO / rewritesPerSession),
  sessions_to_close_evaluate_gap: Math.ceil(gapEvaluate / evalPerSession),
  sessions_to_close_analyze_gap: Math.ceil(gapAnalyze / analyzePerSession),
};

// Wave projections (8 sessions per wave)
const waves = [];
let cumHO = currentHO;
let cumEval = grand.Evaluate;
let cumAnalyze = grand.Analyze;
let waveNum = 1;
while (cumHO < Math.ceil(targetHO * grandTotal)) {
  const estRewrites = Math.round(rewritesPerSession * 8);
  const estEval = Math.round(evalPerSession * 8);
  const estAnalyze = Math.round(analyzePerSession * 8);
  cumHO += estRewrites;
  cumEval += estEval;
  cumAnalyze += estAnalyze;
  const cumPct = Math.min(100, (cumHO / grandTotal) * 100);
  waves.push({
    wave: waveNum,
    sessions: `S${61 + (waveNum - 1) * 8}-S${68 + (waveNum - 1) * 8}`,
    est_rewrites: estRewrites,
    est_evaluate: estEval,
    est_analyze: estAnalyze,
    cumulative_higher_order: cumHO,
    cumulative_higher_order_pct: cumPct.toFixed(1) + '%',
  });
  waveNum++;
  if (waveNum > 10) break; // safety limit
}

result.wave_projections = waves;

// Section-level ROI analysis (which sections have most Apply items to upgrade)
result.section_roi = [];
for (const [packName, packData] of Object.entries(countsByPack)) {
  for (const [sectionKey, sectionCounts] of Object.entries(packData.sections || {})) {
    const applyCount = sectionCounts.Apply || 0;
    const understandCount = sectionCounts.Understand || 0;
    result.section_roi.push({
      section: sectionKey,
      apply: applyCount,
      understand: understandCount,
      upgrade_pool: applyCount + understandCount,
    });
  }
}
result.section_roi.sort((a, b) => b.upgrade_pool - a.upgrade_pool);

console.log(JSON.stringify(result, null, 2));
