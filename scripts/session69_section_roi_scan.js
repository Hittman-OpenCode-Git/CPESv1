const fs = require('fs');
const path = require('path');

const PACK_FILES = [
  'pack_a_corrected.js',
  'pack_b_corrected.js',
  'pack_c_corrected.js',
  'pack_d_corrected.js',
  'pack_e_corrected.js',
];

const SECTION_MAP_FROM_QID = {
  'pack_a_corrected.js': { regex: /^P1-([A-F])-\d+$/, group: 1 },
  'pack_b_corrected.js': { regex: /^P1B-([A-F])-\d+$/, group: 1 },
  'pack_c_corrected.js': { regex: /^P1-([A-F])C-\d+$/, group: 1 },
  'pack_d_corrected.js': { regex: /^P1-([A-F])D-\d+$/, group: 1 },
  'pack_e_corrected.js': { regex: /^P1E-([A-F])-/, group: 1, supplemental: /^P1-E-R\d+$/ },
};

function extractSection(fileName, questionId) {
  const map = SECTION_MAP_FROM_QID[fileName];
  if (!map) return null;
  if (map.supplemental && map.supplemental.test(questionId)) return 'E';
  const m = map.regex.exec(questionId);
  return m ? m[1] : null;
}

const PACK_VAR_NAMES = {
  'pack_a_corrected.js': 'MCQ_BANK_A',
  'pack_b_corrected.js': 'MCQ_BANK_B',
  'pack_c_corrected.js': 'MCQ_BANK_C',
  'pack_d_corrected.js': 'MCQ_BANK_D',
  'pack_e_corrected.js': 'MCQ_BANK_E',
};

function loadPack(filePath, fileName) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const varName = PACK_VAR_NAMES[fileName];
  const fn = new Function(raw + '; return ' + varName + ';');
  return fn();
}

function normalizeLevel(level) {
  if (!level) return null;
  const l = String(level).trim();
  const map = {
    remember: 'Remember',
    understand: 'Understand',
    apply: 'Apply',
    analyze: 'Analyze',
    evaluate: 'Evaluate',
  };
  return map[l.toLowerCase()] || l;
}

// Ordered by cognitive demand (ascending)
const COG_ORDER = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
const AT_OR_BELOW_APPLY = new Set(['Remember', 'Understand', 'Apply']);

function aggregate(results) {
  const sections = {};
  for (const r of results) {
    const s = r.section;
    if (!s) continue;
    if (!sections[s]) {
      sections[s] = { total: 0, remember: 0, understand: 0, apply: 0, analyze: 0, evaluate: 0, unknown: 0, certified_total: 0, certified_at_or_below_apply: 0 };
    }
    sections[s].total++;
    const level = r.cognitiveLevel || 'unknown';
    if (level === 'Remember') sections[s].remember++;
    else if (level === 'Understand') sections[s].understand++;
    else if (level === 'Apply') sections[s].apply++;
    else if (level === 'Analyze') sections[s].analyze++;
    else if (level === 'Evaluate') sections[s].evaluate++;
    else sections[s].unknown++;

    if (r.question_state === 'Certified') {
      sections[s].certified_total++;
      if (AT_OR_BELOW_APPLY.has(level)) {
        sections[s].certified_at_or_below_apply++;
      }
    }
  }
  return sections;
}

function assessROI(section, data) {
  const total = data.total;
  const atOrBelow = (data.remember || 0) + (data.understand || 0) + (data.apply || 0);
  const above = (data.analyze || 0) + (data.evaluate || 0);
  const upgradeCandidates = atOrBelow;
  const certifiedBelow = data.certified_at_or_below_apply || 0;

  // Domain-specific assessments
  const domainInfo = {
    A: { name: 'External Financial Reporting', upgradeable: true, reason: 'Heavy calculations and judgment scenarios (ASC topics, discontinued ops, revenue recognition) — strong candidates for Analyze/Evaluate rewrite. Many Apply items can become "recommend the treatment" or "evaluate the CFO\'s position" type questions.' },
    B: { name: 'Planning, Budgeting, Forecasting', upgradeable: true, reason: 'Budgeting scenarios with multiple variables, cash collection schedules, and forecast revision decisions naturally support Evaluate-level "which budget approach should management recommend" items.' },
    C: { name: 'Performance Management', upgradeable: true, reason: 'Variance analysis, responsibility accounting, and KPI evaluation are inherently Evaluate domains. Many Apply items can be reframed as "identify the root cause" or "recommend corrective action."' },
    D: { name: 'Cost Management', upgradeable: true, reason: 'CVP, relevant costing, make-or-buy decisions, and transfer pricing are classic Analyze/Evaluate topics. Several Apply items can become multi-step decision scenarios.' },
    E: { name: 'Internal Controls', upgradeable: true, reason: 'COSO framework application, fraud risk assessment, and control deficiency evaluation are natural Evaluate domains. Many Understand items can become "assess the control weakness" scenarios.' },
    F: { name: 'Technology and Analytics', upgradeable: false, reason: 'Technology topics (ERP modules, data governance definitions, cybersecurity terms) are heavily definitional. Harder to write deep cognitive items without becoming a Part 2-style IT governance question.' },
  };

  const info = domainInfo[section];
  const fracBelow = total > 0 ? (atOrBelow / total * 100) : 0;
  const fracAbove = total > 0 ? (above / total * 100) : 0;

  let roi = 'LOW';
  let rationale = '';

  if (upgradeCandidates >= 300 && info.upgradeable) {
    roi = 'HIGH';
    rationale = `${info.reason} Pool: ${total} items, ${atOrBelow} at/below Apply (${fracBelow.toFixed(0)}%). `;
  } else if (upgradeCandidates >= 150 && info.upgradeable) {
    roi = 'MEDIUM';
    rationale = `${info.reason} Pool: ${total} items, ${atOrBelow} at/below Apply (${fracBelow.toFixed(0)}%). `;
  } else if (upgradeCandidates >= 300 && !info.upgradeable) {
    roi = 'MEDIUM';
    rationale = `Large pool (${total} items, ${atOrBelow} at/below Apply) but ${info.name} items are harder to upgrade cognitively. ${info.reason}`;
  } else {
    roi = 'LOW';
    rationale = `${info.reason} Only ${atOrBelow} candidates for upgrade (${fracBelow.toFixed(0)}% of ${total} items). `;
  }

  rationale += `Certified pool exposure: ${certifiedBelow} items in learner pool at/below Apply.`;

  return {
    section,
    total_items: total,
    remember: data.remember || 0,
    understand: data.understand || 0,
    apply: data.apply || 0,
    analyze: data.analyze || 0,
    evaluate: data.evaluate || 0,
    unknown: data.unknown || 0,
    certified_total: data.certified_total || 0,
    certified_at_or_below_apply: certifiedBelow,
    upgrade_candidates: upgradeCandidates,
    at_or_below_apply_pct: parseFloat(fracBelow.toFixed(1)),
    roi_assessment: roi,
    roi_rationale: rationale,
  };
}

function main() {
  const allResults = [];
  const baseDir = __dirname + '/..';

  for (const fileName of PACK_FILES) {
    const filePath = path.join(baseDir, fileName);
    console.error(`Loading ${fileName}...`);
    const items = loadPack(filePath, fileName);
    console.error(`  ${items.length} raw entries`);

    let seen = new Set();
    for (const item of items) {
      const qid = item.QuestionID;
      if (!qid) continue;

      // Pack A has dual-block architecture — deduplicate by QuestionID
      if (fileName === 'pack_a_corrected.js') {
        if (seen.has(qid)) continue;
        seen.add(qid);
        // Use metadata block's CognitiveLevel (from the first object, which has question_state)
        // The second object (content block) may have a different CognitiveLevel in some cases,
        // but the metadata block is authoritative for question_state
      }

      const section = extractSection(fileName, qid);
      const level = normalizeLevel(item.CognitiveLevel);
      const state = item.question_state || null;

      allResults.push({ questionId: qid, section, cognitiveLevel: level, question_state: state });
    }
    console.error(`  Done processing ${fileName}`);
  }

  console.error(`\nTotal allResults entries: ${allResults.length}`);

  const aggregated = aggregate(allResults);

  const sections = {};
  const roiRanking = [];
  for (const sec of ['A', 'B', 'C', 'D', 'E', 'F']) {
    const data = aggregated[sec] || { total: 0, remember: 0, understand: 0, apply: 0, analyze: 0, evaluate: 0, unknown: 0, certified_total: 0, certified_at_or_below_apply: 0 };
    const assessed = assessROI(sec, data);
    sections[sec] = assessed;
    roiRanking.push({ section: sec, roi: assessed.roi_assessment, upgrade_candidates: assessed.upgrade_candidates, certified_at_or_below_apply: assessed.certified_at_or_below_apply, rationale: assessed.roi_rationale });
  }

  // Sort by ROI priority: HIGH > MEDIUM > LOW, then by upgrade_candidates descending
  const roiOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  roiRanking.sort((a, b) => {
    const d = roiOrder[a.roi] - roiOrder[b.roi];
    if (d !== 0) return d;
    return b.upgrade_candidates - a.upgrade_candidates;
  });

  // Generate recommendation
  const highROI = roiRanking.filter(r => r.roi === 'HIGH');
  const medROI = roiRanking.filter(r => r.roi === 'MEDIUM');

  let recommendation = '';
  if (highROI.length > 0) {
    recommendation = `HIGHEST PRIORITY: ${highROI.map(r => `Section ${r.section} (${r.upgrade_candidates} candidates, ${r.certified_at_or_below_apply} in learner pool)`).join('; ')}. `;
    if (medROI.length > 0) {
      recommendation += `SECONDARY: ${medROI.map(r => `Section ${r.section} (${r.upgrade_candidates} candidates)`).join('; ')}. `;
    }
    recommendation += 'Begin with the section having the most Certified items at/below Apply to maximize learner impact. For each rewrite target, preserve the underlying accounting concept but elevate the question stem from "calculate/identify" to "recommend/evaluate/assess." Use business-scenario framing with named companies and stakeholders.';
  } else {
    recommendation = 'No HIGH-ROI sections identified. Target MEDIUM sections first.';
  }

  const totalItems = Object.values(sections).reduce((sum, s) => sum + s.total_items, 0);
  const totalCertified = Object.values(sections).reduce((sum, s) => sum + s.certified_total, 0);
  const totalAtOrBelowApply = Object.values(sections).reduce((sum, s) => sum + (s.remember + s.understand + s.apply), 0);
  const totalCertifiedAtOrBelow = Object.values(sections).reduce((sum, s) => sum + s.certified_at_or_below_apply, 0);

  const output = {
    session: 'S69',
    board: 'section-roi-board',
    timestamp: new Date().toISOString(),
    read_only: true,
    methodology: {
      packs_parsed: PACK_FILES,
      section_mapping: 'Regex-based from QuestionID per pack naming convention',
      deduplication: 'Pack A uses dual-block architecture — QuestionID deduplicated, metadata block CognitiveLevel used',
      cognitive_level_threshold: 'At or below Apply = Remember, Understand, Apply (candidates for upgrade to Analyze/Evaluate)',
    },
    pool_summary: {
      total_items_pool_wide: totalItems,
      total_certified: totalCertified,
      total_at_or_below_apply: totalAtOrBelowApply,
      total_at_or_below_apply_pct: parseFloat((totalAtOrBelowApply / totalItems * 100).toFixed(1)),
      total_certified_at_or_below_apply: totalCertifiedAtOrBelow,
    },
    sections,
    roi_ranking: roiRanking,
    recommendation,
    domain_viability_notes: {
      A: 'HIGH viability — financial reporting has many judgment scenarios (ASC 205-20, 606, 842, 326). Convert "calculate depreciation" to "evaluate which depreciation method best reflects asset usage."',
      B: 'HIGH viability — budgeting chain (sales → production → materials → cash) supports multi-step Analyze scenarios and "recommend the budget approach" Evaluate items.',
      C: 'MEDIUM-HIGH viability — variance analysis and performance evaluation naturally support Analyze/Evaluate. "Calculate the variance" → "Diagnose the root cause and recommend corrective action."',
      D: 'HIGH viability — CVP, relevant costing, make-or-buy, special orders, and transfer pricing are decision-oriented. Many Apply items are one step away from Analyze.',
      E: 'MEDIUM viability — COSO framework can support Evaluate ("assess control deficiency severity"), but many items are definition-based (5 components, 17 principles).',
      F: 'LOW viability — Technology terms, data governance definitions, and cybersecurity frameworks are inherently Remember/Understand. Converting to Analyze/Evaluate risks drifting into Part 2 IT governance territory.',
    },
    next_steps: 'Run section-level deep scan to identify specific QIDs at/below Apply within the highest-ROI section. Cross-reference with MASTER_QUESTION_REGISTRY.md for topic distribution. Produce per-item cognitive upgrade recommendation report.',
  };

  const outPath = path.join(baseDir, 'reports', 'session_69', 'SESSION069_SECTION_ROI_REPORT.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
  console.error(`\nReport written to ${outPath}`);
  console.log(JSON.stringify(output, null, 2));
}

main();
