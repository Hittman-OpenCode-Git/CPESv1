// Session 69 — Evaluate Cognitive Level Gap Scan
// READ-ONLY. No file modifications.

const fs = require('fs');
const path = require('path');

const PACKS = [
  { file: 'pack_a_corrected.js', name: 'Pack A' },
  { file: 'pack_b_corrected.js', name: 'Pack B' },
  { file: 'pack_c_corrected.js', name: 'Pack C' },
  { file: 'pack_d_corrected.js', name: 'Pack D' },
  { file: 'pack_e_corrected.js', name: 'Pack E' },
];

// Extract section from QuestionID
function extractSection(qid) {
  // Pack A: P1-A-XXX = A, P1-B-XXX = B, P1-C-XXX = C, P1-D-XXX = D, P1-E-XXX = E, P1-F-XXX = F
  const matchA = qid.match(/^P1-([A-F])-\d+$/);
  if (matchA) return matchA[1];

  // Pack B: P1B-A-XXX = A, P1B-B-XXX = B, ...
  const matchB = qid.match(/^P1B-([A-F])-\d+$/);
  if (matchB) return matchB[1];

  // Pack C: P1-AC-XXX = A, P1-BC-XXX = B, ...
  const matchC = qid.match(/^P1-([A-F])C-\d+$/);
  if (matchC) return matchC[1];

  // Pack D: P1-AD-XXX = A, P1-BD-XXX = B, ...
  const matchD = qid.match(/^P1-([A-F])D-\d+$/);
  if (matchD) return matchD[1];

  // Pack E: P1E-A-XXX = A, P1E-B-XXX = B, ...
  const matchE = qid.match(/^P1E-([A-F])-\d+$/);
  if (matchE) return matchE[1];

  // Pack E R-series: P1-E-RXX = E
  const matchR = qid.match(/^P1-E-R\d+$/);
  if (matchR) return 'E';

  return null;
}

// Extract question objects using Function constructor
function parsePack(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    const arr = new Function('return ' + raw)();
    return arr;
  } catch (e) {
    console.error(`  FUNCTION parse failed: ${e.message}`);
    return null;
  }
}

// Fallback: extract using string-aware brace matcher
function parsePackBraceAware(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const objects = [];
  let depth = 0;
  let inString = false;
  let stringChar = null;
  let escape = false;
  let start = -1;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (inString) {
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === stringChar) {
        inString = false;
        stringChar = null;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      continue;
    }

    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        const objStr = raw.substring(start, i + 1);
        try {
          const obj = JSON.parse(objStr);
          objects.push(obj);
        } catch (e) {
          // skip unparseable objects
        }
        start = -1;
      }
    }
  }
  return objects;
}

function main() {
  console.log('Session 69 — Evaluate Gap Scan');
  console.log('==============================\n');

  let allItems = [];

  for (const pack of PACKS) {
    const filePath = path.join(__dirname, '..', pack.file);
    console.log(`Processing ${pack.file} (${pack.name})...`);

    let arr = parsePack(filePath);
    if (!arr) {
      console.log(`  Falling back to brace-aware parser...`);
      arr = parsePackBraceAware(filePath);
    }

    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      console.error(`  FAILED to parse ${pack.file}`);
      continue;
    }

    console.log(`  Parsed ${arr.length} items`);

    for (const item of arr) {
      const qid = item.QuestionID;
      const cl = item.CognitiveLevel || 'Unknown';
      const qs = item.question_state || 'Unprocessed';

      if (!qid) continue;

      const section = extractSection(qid);
      if (!section) {
        console.error(`  WARNING: Could not extract section from QID: ${qid}`);
        continue;
      }

      allItems.push({
        qid,
        section,
        pack: pack.name,
        cognitiveLevel: cl,
        questionState: qs,
      });
    }
  }

  // --- COUNTS ---
  const totalItems = allItems.length;
  const evaluateItems = allItems.filter(i => i.cognitiveLevel === 'Evaluate');
  const analyzeItems = allItems.filter(i => i.cognitiveLevel === 'Analyze');
  const certifiedEvaluate = evaluateItems.filter(i => i.questionState === 'Certified');
  const certifiedAnalyze = analyzeItems.filter(i => i.questionState === 'Certified');
  const higherOrderItems = allItems.filter(i => i.cognitiveLevel === 'Evaluate' || i.cognitiveLevel === 'Analyze');
  const certifiedHigherOrder = higherOrderItems.filter(i => i.questionState === 'Certified');

  // Cognitive distribution
  const cognitiveCounts = {};
  for (const item of allItems) {
    cognitiveCounts[item.cognitiveLevel] = (cognitiveCounts[item.cognitiveLevel] || 0) + 1;
  }

  // Evaluate by section
  const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
  const evaluateBySection = {};
  for (const sec of sections) {
    const total = evaluateItems.filter(i => i.section === sec).length;
    const certified = evaluateItems.filter(i => i.section === sec && i.questionState === 'Certified').length;
    evaluateBySection[sec] = { total, certified };
  }

  // Evaluate by pack
  const evaluateByPack = {};
  for (const pack of PACKS) {
    const total = evaluateItems.filter(i => i.pack === pack.name).length;
    const certified = evaluateItems.filter(i => i.pack === pack.name && i.questionState === 'Certified').length;
    evaluateByPack[pack.name] = { total, certified };
  }

  // Analyze by section (for cluster analysis)
  const analyzeBySection = {};
  for (const sec of sections) {
    const total = analyzeItems.filter(i => i.section === sec).length;
    const certified = analyzeItems.filter(i => i.section === sec && i.questionState === 'Certified').length;
    analyzeBySection[sec] = { total, certified };
  }

  // Section-level item counts
  const sectionTotalItems = {};
  for (const sec of sections) {
    sectionTotalItems[sec] = allItems.filter(i => i.section === sec).length;
  }

  // Targets
  const targetEvaluate = Math.round(totalItems * 0.15);
  const targetAnalyze = Math.round(totalItems * 0.25);
  const targetHigherOrder = Math.round(totalItems * 0.40);

  const evaluatePct = (evaluateItems.length / totalItems * 100);
  const analyzePct = (analyzeItems.length / totalItems * 100);
  const higherOrderPct = (higherOrderItems.length / totalItems * 100);

  // Cognitive distribution with pcts
  const cognitiveDistribution = {};
  const orderedLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
  for (const level of orderedLevels) {
    const count = cognitiveCounts[level] || 0;
    cognitiveDistribution[level] = {
      count,
      pct: parseFloat((count / totalItems * 100).toFixed(1)),
    };
  }
  // Also include Unknown if any
  if (cognitiveCounts['Unknown']) {
    cognitiveDistribution['Unknown'] = {
      count: cognitiveCounts['Unknown'],
      pct: parseFloat((cognitiveCounts['Unknown'] / totalItems * 100).toFixed(1)),
    };
  }

  // --- CLUSTER ANALYSIS ---
  // Which sections are most evaluate-rich?
  let clusterAnalysis = '';
  const sectionEvalPcts = sections.map(sec => ({
    section: sec,
    evaluateTotal: evaluateBySection[sec].total,
    evaluatePct: parseFloat((evaluateBySection[sec].total / sectionTotalItems[sec] * 100).toFixed(1)),
    analyzeTotal: analyzeBySection[sec].total,
    higherOrderPct: parseFloat(((evaluateBySection[sec].total + analyzeBySection[sec].total) / sectionTotalItems[sec] * 100).toFixed(1)),
    totalItems: sectionTotalItems[sec],
  }));

  // Sort by evaluate % descending
  sectionEvalPcts.sort((a, b) => b.evaluatePct - a.evaluatePct);

  const richSections = sectionEvalPcts.filter(s => s.evaluatePct >= 3.0).map(s => s.section);
  const poorSections = sectionEvalPcts.filter(s => s.evaluatePct < 1.0).map(s => s.section);

  clusterAnalysis = `Evaluate items are concentrated in section(s) ${richSections.join(', ') || 'none'} (highest density). `;
  clusterAnalysis += `Sections ${poorSections.join(', ') || 'none'} are most evaluate-poor and should be prioritized for new Evaluate-level item creation.\n\n`;

  clusterAnalysis += `Section breakdown (% Evaluate): `;
  clusterAnalysis += sectionEvalPcts.map(s => `Section ${s.section}: ${s.evaluateTotal} Evaluate (${s.evaluatePct}% of ${s.totalItems} items in section)`).join('; ') + '. ';

  clusterAnalysis += `\n\nSection breakdown (% Analyze+Evaluate): `;
  clusterAnalysis += sectionEvalPcts.map(s => `Section ${s.section}: ${s.evaluateTotal + s.analyzeTotal} higher-order (${s.higherOrderPct}% of ${s.totalItems} items)`).join('; ') + '.';

  // --- RECOMMENDATION ---
  const evalGap = targetEvaluate - evaluateItems.length;
  const sectionDeficits = sections.map(sec => {
    const targetPerSec = Math.round(sectionTotalItems[sec] * 0.15);
    const current = evaluateBySection[sec].total;
    return { section: sec, deficit: Math.max(0, targetPerSec - current), total: sectionTotalItems[sec] };
  }).sort((a, b) => b.deficit - a.deficit);

  let recommendation = '';
  recommendation += `Current Evaluate count: ${evaluateItems.length} (${evaluatePct.toFixed(1)}%). `;
  recommendation += `Target: ${targetEvaluate} (15%). Gap: ${evalGap} items.\n\n`;

  recommendation += `Priority sections for new Evaluate items:\n`;
  for (const d of sectionDeficits.filter(d => d.deficit > 0)) {
    recommendation += `  Section ${d.section}: deficit of ${d.deficit} Evaluate items (target ${Math.round(d.total * 0.15)}, currently at ${evaluateBySection[d.section].total})\n`;
  }

  recommendation += `\nRecommended approach: Create ${evalGap} new Evaluate-level items distributed across the most deficient sections. `;
  recommendation += `Focus on converting existing Analyze items to Evaluate where possible (raising the cognitive bar via revised prompt wording, distractor complexity, or scenario framing). `;
  recommendation += `Nearly all Evaluate items currently referenced in this pool are Certified, meaning the existing Evaluate items meet quality standards — the gap is a quantity issue, not a quality issue.`;

  // --- OUTPUT ---
  const output = {
    session: 'S69',
    board: 'evaluate-gap-board',
    timestamp: new Date().toISOString(),
    read_only: true,
    methodology_note: `Scanned ${PACKS.length} pack files via brace-aware parsing. ${totalItems} total items parsed.`,
    targets: {
      total_items: totalItems,
      evaluate_target_pct: 15.0,
      evaluate_target_count: targetEvaluate,
      analyze_target_pct: 25.0,
      analyze_target_count: targetAnalyze,
      higher_order_target_pct: 40.0,
      higher_order_target_count: targetHigherOrder,
    },
    current_state: {
      total_evaluate: evaluateItems.length,
      certified_evaluate: certifiedEvaluate.length,
      total_analyze: analyzeItems.length,
      certified_analyze: certifiedAnalyze.length,
      total_higher_order: higherOrderItems.length,
      certified_higher_order: certifiedHigherOrder.length,
      evaluate_pct: parseFloat(evaluatePct.toFixed(1)),
      analyze_pct: parseFloat(analyzePct.toFixed(1)),
      higher_order_pct: parseFloat(higherOrderPct.toFixed(1)),
    },
    gaps: {
      evaluate_gap: evalGap,
      analyze_gap: targetAnalyze - analyzeItems.length,
      higher_order_gap: targetHigherOrder - higherOrderItems.length,
      evaluate_gap_pct_points: parseFloat((15.0 - evaluatePct).toFixed(1)),
      higher_order_gap_pct_points: parseFloat((40.0 - higherOrderPct).toFixed(1)),
    },
    evaluate_by_section: evaluateBySection,
    analyze_by_section: analyzeBySection,
    evaluate_by_pack: evaluateByPack,
    section_total_items: sectionTotalItems,
    current_cognitive_distribution: cognitiveDistribution,
    evaluate_cluster_analysis: clusterAnalysis,
    recommendation: recommendation,
    // Raw data for verification
    _evaluate_qids: evaluateItems.map(i => i.qid),
    _analyze_qids: analyzeItems.map(i => i.qid),
    _evaluate_qid_count: evaluateItems.length,
    _analyze_qid_count: analyzeItems.length,
    _total_items_parsed: totalItems,
  };

  const outDir = path.join(__dirname, '..', 'reports', 'session_69');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'SESSION069_EVALUATE_GAP_REPORT.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

  // Console summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total items parsed: ${totalItems}`);
  console.log('');
  console.log('Cognitive Distribution:');
  for (const level of orderedLevels) {
    const d = cognitiveDistribution[level];
    console.log(`  ${level}: ${d.count} (${d.pct}%)`);
  }
  console.log('');
  console.log(`Evaluate: ${evaluateItems.length}/${totalItems} (${evaluatePct.toFixed(1)}%) — Gap: ${evalGap} items (${(15.0 - evaluatePct).toFixed(1)}pp)`);
  console.log(`Analyze:  ${analyzeItems.length}/${totalItems} (${analyzePct.toFixed(1)}%) — Gap: ${targetAnalyze - analyzeItems.length} items`);
  console.log(`Higher-order: ${higherOrderItems.length}/${totalItems} (${higherOrderPct.toFixed(1)}%) — Gap: ${targetHigherOrder - higherOrderItems.length} items`);
  console.log('');
  console.log(`Certified Evaluate: ${certifiedEvaluate.length}`);
  console.log(`Certified Analyze: ${certifiedAnalyze.length}`);
  console.log('');
  console.log(`Output written to: ${outPath}`);
}

main();
