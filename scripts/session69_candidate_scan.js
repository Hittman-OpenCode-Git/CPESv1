/**
 * Session 69 — Cognitive Gap Measurement & Rewrite Targeting (v3 — Final)
 * READ-ONLY. Multi-dimensional scoring with fine-grained tie-breaking.
 */

const fs = require('fs');
const path = require('path');

const PACKS = [
  { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A', label: 'Pack A' },
  { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B', label: 'Pack B' },
  { file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C', label: 'Pack C' },
  { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D', label: 'Pack D' },
  { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E', label: 'Pack E' },
];

const UPGRADE_PATHS = {
  'Remember':    { target: 'Understand', label: 'Remember → Understand' },
  'Understand':  { target: 'Apply',      label: 'Understand → Apply' },
  'Apply':       { target: 'Analyze',    label: 'Apply → Analyze' },
};

function loadPack(packDef) {
  const filePath = path.join(__dirname, '..', packDef.file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const fn = new Function(raw + '; return ' + packDef.varName + ';');
  const data = fn();
  if (!Array.isArray(data)) throw new Error(packDef.file + ': eval did not return an array');
  return data;
}

function extractSection(item) {
  if (item.Section && /^[A-F]$/.test(item.Section)) return item.Section;
  if (item.Topic) {
    const m = item.Topic.match(/^[A-Z]{1,2}-?([A-F])[. ]/);
    if (m) return m[1];
    const m2 = item.Topic.match(/^([A-F])[. ]/);
    if (m2) return m2[1];
  }
  if (item.QuestionID) {
    const m = item.QuestionID.match(/^P1(?:[A-E])?-([A-F])/);
    if (m) return m[1];
  }
  return '?';
}

function getPackLabel(qid) {
  if (!qid) return '?';
  if (/^P1E-/.test(qid)) return 'E';
  if (/^P1B-/.test(qid)) return 'B';
  if (/^P1-[A-F]C-/.test(qid)) return 'C';
  if (/^P1-[A-F]D-/.test(qid)) return 'D';
  if (/^P1-[A-F]-/.test(qid)) return 'A';
  return '?';
}

function getTopicLabel(item) {
  if (item.Topic) return item.Topic.replace(/^[A-Z]{1,3}[-.][A-Z]?\d+\s*/, '').trim() || item.Topic;
  return (item.Stem || '').substring(0, 80).trim();
}

/**
 * Stem complexity score: longer scenarios with detail are better upgrade targets
 */
function stemComplexityScore(stem) {
  const len = stem.length;
  if (len > 600) return 5;
  if (len > 400) return 4;
  if (len > 250) return 3;
  if (len > 100) return 2;
  return 1;
}

/**
 * Distractor sophistication: how good are the current distractors?
 * Longer, more nuanced distractors = better foundation for analysis rewrites.
 */
function distractorScore(choices) {
  const vals = Object.values(choices || {}).filter(c => c && typeof c === 'string');
  if (vals.length < 4) return 1;
  let totalLen = 0;
  for (const v of vals) totalLen += v.length;
  const avgLen = totalLen / vals.length;
  if (avgLen > 80) return 5;
  if (avgLen > 50) return 4;
  if (avgLen > 30) return 3;
  if (avgLen > 15) return 2;
  return 1;
}

/**
 * Core scoring — returns 7 dimension scores plus a weighted total.
 */
function scoreItem(item, poolStats) {
  const current = item.CognitiveLevel;
  const path = UPGRADE_PATHS[current];
  if (!path) return null;

  const section = extractSection(item);
  const topic = (item.Topic || '').toLowerCase();
  const stem = (item.Stem || '').toLowerCase();
  const certified = item.question_state === 'Certified';
  const choices = item.Choices || {};
  const difficulty = item.Difficulty || '';
  const secStats = poolStats.sections[section];
  const highPct = secStats ? secStats.analyzePct + secStats.evaluatePct : 100;

  // ── 1. Upgrade Feasibility (1-5) ──
  let feasibility = 2;
  if (current === 'Remember') {
    if (/standard|framework|principle|concept|rule|purpose|objective|role|scope/i.test(stem)) feasibility = 5;
    else if (/asc|gaap|ifrs|coso|ima|definition/i.test(stem)) feasibility = 4;
    else if (stem.length > 150) feasibility = 3;
  } else if (current === 'Understand') {
    if (item.CalculationItem === true || /calculate|compute|determine|how much|amount|cost.*\$|rate|percent|total|prepare|budget/i.test(stem)) feasibility = 5;
    else if (/apply|use|using|which method|how should|classification of|identify|classify|describe/i.test(stem)) feasibility = 4;
    else feasibility = 3;
    if (stem.length > 300) feasibility = Math.min(5, feasibility + 1);
    if (/budget|forecast|variance|costing|allocation|overhead|margin/i.test(topic)) feasibility = Math.min(5, feasibility + 1);
  } else if (current === 'Apply') {
    if (/compare|analyze|interpret|evaluate|recommend|assess|explain.*why|which.*best|impact|effect|implication|conclusion/i.test(stem)) feasibility = 5;
    else if (/or|versus|vs\.|between|among|difference|prefer|better/i.test(stem)) feasibility = 4;
    else if (/calculate|compute|amount|determine|how much/i.test(stem)) feasibility = 3;
    else feasibility = 2;
    if (/diff|cult|hard/i.test(difficulty)) feasibility = Math.min(5, feasibility + 1);
    if (stem.length > 300) feasibility = Math.min(5, feasibility + 1);
  }

  // ── 2. Gap Contribution (1-5): Apply→Analyze is by far most impactful ──
  let gapContribution = 1;
  if (current === 'Remember') gapContribution = 1;
  else if (current === 'Understand') gapContribution = 3;
  else if (current === 'Apply') gapContribution = 5;

  // ── 3. Section Priority (1-5): based on Analyze+Evaluate percentage ──
  let sectionPriority = 3;
  if (highPct < 5) sectionPriority = 5;        // Section B (3.8%)
  else if (highPct < 8) sectionPriority = 4;   // Section A (7.5%)
  else if (highPct < 12) sectionPriority = 3;  // Sections C (9.4%)
  else if (highPct < 18) sectionPriority = 2;  // Sections D (13.0%), F (12.8%)
  else sectionPriority = 1;                     // Section E (39.2%)

  // ── 4. Certification Impact (1-5) ──
  const certImpact = certified ? 5 : 2;

  // ── 5. Topic Richness (1-5): how much depth for analyze/evaluate scenarios ──
  let topicRichness = 2;
  const richPatterns = [
    [/cost.*(variance|behavior|allocation|absorption|variable|standard)|standard.*(cost|variance)/i, 5],
    [/budget|forecast|predict|rolling/i, 5],
    [/performance.*(measure|evaluat|benchmark|balanced.*scorecard)/i, 5],
    [/risk.*(assess|control|manage|response|framework)/i, 5],
    [/internal.*control|fraud|segregation|sox|sarbanes/i, 4],
    [/ratio.*anal|financial.*anal|trend|comparative.*anal|dupont/i, 5],
    [/decision.*(make|relevant|make.*buy|differential|pricing|special.*order)/i, 5],
    [/transfer.*pric|responsibility.*center|segment.*report/i, 4],
    [/data.*(anal|govern|quality)|analytics|business.*intel/i, 4],
    [/revenue.*recogn|asc.*606|contract.*obligat/i, 4],
    [/cash.*flow|indirect.*method|operating.*investing.*financing/i, 4],
    [/depreciation|amortization|impairment|asset.*long.*lived|fixed.*asset/i, 4],
    [/inventory.*(valuation|costing|flow|write.*down|lcm|nrv|fi(f)o|li(f)o)/i, 4],
    [/eq(a)uity|earnings.*share|diluted|treasury/i, 3],
    [/ethics|professional.*conduct|ima.*statement/i, 3],
    [/lean|just.*time|kaizen|quality|tq[mc]|six.*sigma/i, 4],
    [/cyber|erp|it.*(control|governan|risk)|system.*implement|data.*secur/i, 3],
    [/valuation|fair.*value|present.*value|discount/i, 4],
    [/capital.*(budget|invest)|npv|irr|payback/i, 5],
  ];
  for (const [re, sc] of richPatterns) {
    if (re.test(topic) || re.test(stem)) { topicRichness = Math.max(topicRichness, sc); }
  }
  if (stem.length > 500) topicRichness = Math.max(topicRichness, 5);
  else if (stem.length > 300) topicRichness = Math.max(topicRichness, 4);
  else if (stem.length > 150) topicRichness = Math.max(topicRichness, 3);

  // ── 6. Stem Complexity (1-5): more detail = more to build on ──
  const stemScore = stemComplexityScore(item.Stem || '');

  // ── 7. Distractor Sophistication (1-5): quality distractors = better analysis base ──
  const distractScore = distractorScore(choices);

  // Weighted total: feasibility×3 + gap×3 + section×2 + cert×2 + richness×3 + stem×2 + distract×1
  const weightedTotal =
    feasibility * 3 +
    gapContribution * 3 +
    sectionPriority * 2 +
    certImpact * 2 +
    topicRichness * 3 +
    stemScore * 2 +
    distractScore * 1;

  const rawTotal = feasibility + gapContribution + sectionPriority + certImpact + topicRichness + stemScore + distractScore;

  return {
    upgrade_feasibility: feasibility,
    gap_contribution: gapContribution,
    section_priority: sectionPriority,
    certification_impact: certImpact,
    topic_richness: topicRichness,
    stem_complexity: stemScore,
    distractor_sophistication: distractScore,
    weighted_total: Math.round(weightedTotal * 10) / 10,
    raw_total: rawTotal,
  };
}

function computePoolStats(allItems) {
  const sections = {};
  for (const s of ['A','B','C','D','E','F'])
    sections[s] = { remember:0,understand:0,apply:0,analyze:0,evaluate:0,count:0,analyzePct:0,evaluatePct:0 };
  let tR=0,tU=0,tA=0,tAn=0,tE=0;
  for (const item of allItems) {
    const sec = extractSection(item);
    if (!sections[sec]) continue;
    const lv = item.CognitiveLevel || '';
    const lc = lv.toLowerCase();
    if (sections[sec][lc] !== undefined) sections[sec][lc]++;
    sections[sec].count++;
    switch (lv) { case 'Remember':tR++;break; case 'Understand':tU++;break; case 'Apply':tA++;break; case 'Analyze':tAn++;break; case 'Evaluate':tE++;break; }
  }
  for (const s of ['A','B','C','D','E','F']) {
    const sec = sections[s];
    sec.analyzePct = sec.count>0?(sec.analyze/sec.count)*100:0;
    sec.evaluatePct = sec.count>0?(sec.evaluate/sec.count)*100:0;
  }
  const totalWL = tR+tU+tA+tAn+tE;
  return { totalRemember:tR,totalUnderstand:tU,totalApply:tA,totalAnalyze:tAn,totalEvaluate:tE,totalWithLevel:totalWL,analyzeShortfall:Math.max(0,Math.round(totalWL*0.25-tAn)),sections };
}

// ── MAIN ──────────────────────────────────────────────────────────────────
function main() {
  console.log('Session 69 v3 — Cognitive Gap Measurement & Rewrite Targeting');
  console.log('='.repeat(72));

  const allItems = [];
  for (const pd of PACKS) {
    try {
      const data = loadPack(pd);
      console.log(`  Loaded ${pd.file}: ${data.length} items`);
      allItems.push(...data);
    } catch (e) {
      console.error(`  FAILED ${pd.file}: ${e.message}`);
    }
  }
  console.log(`  Total pool: ${allItems.length} items`);

  const poolStats = computePoolStats(allItems);
  console.log(`\n  Pool: R=${poolStats.totalRemember} U=${poolStats.totalUnderstand} Ap=${poolStats.totalApply} An=${poolStats.totalAnalyze} E=${poolStats.totalEvaluate} (shortfall An: ~${poolStats.analyzeShortfall})`);

  console.log(`\n  Section High-Level %:`);
  for (const s of ['A','B','C','D','E','F']) {
    const sec = poolStats.sections[s];
    console.log(`    ${s}: An=${sec.analyzePct.toFixed(1)}% Ev=${sec.evaluatePct.toFixed(1)}% Total=${(sec.analyzePct+sec.evaluatePct).toFixed(1)}% n=${sec.count}`);
  }

  // Score all eligible
  const eligible = [];
  for (const item of allItems) {
    const level = item.CognitiveLevel;
    if (!level || !UPGRADE_PATHS[level]) continue;
    const s = scoreItem(item, poolStats);
    if (!s) continue;
    eligible.push({
      qid: item.QuestionID || 'UNKNOWN',
      pack: getPackLabel(item.QuestionID),
      section: extractSection(item),
      current_level: level,
      target_level: UPGRADE_PATHS[level].target,
      topic: getTopicLabel(item),
      certified: item.question_state === 'Certified',
      difficulty: item.Difficulty || '',
      score: s,
      stem_preview: (item.Stem || '').substring(0, 120).trim(),
    });
  }

  console.log(`\n  Eligible candidates: ${eligible.length}`);

  // Show weighted score histogram
  const hist = {};
  for (const e of eligible) { const b = Math.floor(e.score.weighted_total); hist[b] = (hist[b]||0)+1; }
  const hKeys = Object.keys(hist).map(Number).sort((a,b)=>b-a);
  console.log('  Weighted score histogram (top 20 buckets):');
  for (const k of hKeys.slice(0, 20)) console.log(`    ${k}: ${hist[k]}`);

  // Sort: weighted_total desc, then raw_total desc, then feasibility desc
  eligible.sort((a, b) => {
    if (b.score.weighted_total !== a.score.weighted_total) return b.score.weighted_total - a.score.weighted_total;
    if (b.score.raw_total !== a.score.raw_total) return b.score.raw_total - a.score.raw_total;
    if (b.score.gap_contribution !== a.score.gap_contribution) return b.score.gap_contribution - a.score.gap_contribution;
    if (b.score.upgrade_feasibility !== a.score.upgrade_feasibility) return b.score.upgrade_feasibility - a.score.upgrade_feasibility;
    return b.score.topic_richness - a.score.topic_richness;
  });

  const topN = Math.min(100, eligible.length);
  const top100 = eligible.slice(0, topN);

  // Build summary
  const summary = {
    candidates_scored: eligible.length,
    top100_ranked: topN,
    by_pack: { 'Pack A':0,'Pack B':0,'Pack C':0,'Pack D':0,'Pack E':0 },
    by_section: { A:0,B:0,C:0,D:0,E:0,F:0 },
    by_current_level: { Remember:0, Understand:0, Apply:0 },
    by_target_level: { Understand:0, Apply:0, Analyze:0, Evaluate:0 },
    certified_count: 0,
    score_range: { min_wt: 0, max_wt: 0, min_raw: 0, max_raw: 0 },
  };

  for (const c of top100) {
    const pk = 'Pack ' + c.pack;
    summary.by_pack[pk] = (summary.by_pack[pk] || 0) + 1;
    summary.by_section[c.section] = (summary.by_section[c.section] || 0) + 1;
    summary.by_current_level[c.current_level] = (summary.by_current_level[c.current_level] || 0) + 1;
    summary.by_target_level[c.target_level] = (summary.by_target_level[c.target_level] || 0) + 1;
    if (c.certified) summary.certified_count++;
  }

  if (top100.length > 0) {
    summary.score_range.min_wt = top100[top100.length-1].score.weighted_total;
    summary.score_range.max_wt = top100[0].score.weighted_total;
    summary.score_range.min_raw = top100[top100.length-1].score.raw_total;
    summary.score_range.max_raw = top100[0].score.raw_total;
  }

  const ranked = top100.map((c, i) => ({ rank: i + 1, ...c }));

  // Recommendation
  let topPack = ''; let topPackCount = 0;
  for (const [k,v] of Object.entries(summary.by_pack)) { if (v > topPackCount) { topPack = k; topPackCount = v; } }
  let topSection = ''; let topSectionCount = 0;
  for (const [k,v] of Object.entries(summary.by_section)) { if (v > topSectionCount) { topSection = k; topSectionCount = v; } }
  let topTarget = ''; let topTargetCount = 0;
  for (const [k,v] of Object.entries(summary.by_target_level)) { if (v > topTargetCount) { topTarget = k; topTargetCount = v; } }
  let topCurr = ''; let topCurrCount = 0;
  for (const [k,v] of Object.entries(summary.by_current_level)) { if (v > topCurrCount) { topCurr = k; topCurrCount = v; } }

  const output = {
    session: 'S69',
    board: 'rewrite-candidate-board',
    timestamp: new Date().toISOString(),
    read_only: true,
    methodology: (
      'Seven-dimension scoring: upgrade_feasibility(×3) + gap_contribution(×3) + section_priority(×2) + ' +
      'certification_impact(×2) + topic_richness(×3) + stem_complexity(×2) + distractor_sophistication(×1). ' +
      'Weighted range: 10–70. Viable upgrade paths: Remember→Understand, Understand→Apply, Apply→Analyze. ' +
      'Non-viable: 2-step jumps (Remember→Analyze, Understand→Evaluate, Remember→Evaluate).'
    ),
    pool_distribution: {
      remember: poolStats.totalRemember,
      understand: poolStats.totalUnderstand,
      apply: poolStats.totalApply,
      analyze: poolStats.totalAnalyze,
      evaluate: poolStats.totalEvaluate,
      total_with_levels: poolStats.totalWithLevel,
      analyze_shortfall_vs_25pct_target: poolStats.analyzeShortfall,
    },
    section_high_level_pct: {},
    summary: summary,
    candidates: ranked,
    recommendation_for_s70:
      `Target ${topPack} (${topPackCount} candidates in top 100) first — ` +
      `highest concentration of high-value upgrade opportunities. ` +
      `Focus on ${topCurr} → ${topTarget} upgrades in Section ${topSection} as the primary rewrite path. ` +
      `${summary.certified_count}/${summary.top100_ranked} of the top 100 are Certified (learner-pool impact). ` +
      `The pool-wide cognitive gap is most severe at Analyze (${poolStats.analyzeShortfall} shortfall vs. 25% CAQS target), ` +
      `so Apply → Analyze conversions offer the highest marginal gain per rewrite. ` +
      `Section ${topSection} (${poolStats.sections[topSection] ? (poolStats.sections[topSection].analyzePct + poolStats.sections[topSection].evaluatePct).toFixed(1) : '?'}% Analyze+Evaluate) is the most under-developed section for higher-order thinking.`,
  };

  for (const s of ['A','B','C','D','E','F']) {
    const sec = poolStats.sections[s];
    output.section_high_level_pct[s] = {
      analyze_pct: Math.round(sec.analyzePct * 10) / 10,
      evaluate_pct: Math.round(sec.evaluatePct * 10) / 10,
      total_high_pct: Math.round((sec.analyzePct + sec.evaluatePct) * 10) / 10,
      count: sec.count,
    };
  }

  const outDir = path.join(__dirname, '..', 'reports', 'session_69');
  const outFile = path.join(outDir, 'SESSION069_TOP100_REWRITE_CANDIDATES.json');
  fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n  === OUTPUT ===`);
  console.log(`  File: ${outFile}`);
  console.log(`  Top 100 weighted range: ${summary.score_range.min_wt}–${summary.score_range.max_wt}`);
  console.log(`  Top 100 raw range: ${summary.score_range.min_raw}–${summary.score_range.max_raw}`);
  console.log(`  Certified: ${summary.certified_count}/100`);
  console.log('  By pack:', JSON.stringify(summary.by_pack));
  console.log('  By section:', JSON.stringify(summary.by_section));
  console.log('  By current level:', JSON.stringify(summary.by_current_level));
  console.log('  By target level:', JSON.stringify(summary.by_target_level));
}

main();
