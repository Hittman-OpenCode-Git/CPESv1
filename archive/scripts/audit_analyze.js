// Repository Quality Audit — Sprint 5.9A
// Read-only analysis of all 2,500 MCQs + 75 cases
const fs = require('fs');
const path = require('path');

const DIR = 'C:\\Users\\BryanHolland\\Downloads\\CMA_Part_1_2026';
const OUTPUT = path.join(DIR, 'scripts', 'reports');

// ---- Load data ----
const PACKS = ['A','B','C','D','E'];
let allMCQs = [];
let allCases = [];

function extractArray(code, varName) {
  const idx = code.indexOf(varName + ' = [');
  if (idx === -1) return null;
  const arrStart = code.indexOf('[', idx);
  let depth = 0, pos = arrStart;
  do {
    if (code[pos] === '[') depth++;
    if (code[pos] === ']') depth--;
    pos++;
  } while (depth > 0 && pos < code.length);
  const jsStr = code.substring(arrStart, pos);
  try { return JSON.parse(jsStr); } catch(e) {
    // Try evaluating as JS (for unquoted keys, trailing commas)
    try {
      const fn = new Function('return (' + jsStr + ')');
      return fn();
    } catch(e2) {
      console.log('Failed to parse ' + varName + ': ' + e2.message.substring(0, 60));
      return null;
    }
  }
}

for (const p of PACKS) {
  const code = fs.readFileSync(path.join(DIR, 'pack_' + p.toLowerCase() + '_corrected.js'), 'utf8');
  const arr = extractArray(code, 'MCQ_BANK_' + p);
  if (arr) allMCQs = allMCQs.concat(arr);
}

const caseFiles = [
  { file: 'scored_cases.js', varName: 'ENHANCED_CASE_BASE' },
  { file: 'scored_cases2.js', varName: 'ENHANCED_CASE_BASE2' },
  { file: 'scored_cases3.js', varName: 'ENHANCED_CASE_BASE3' },
  { file: 'scored_cases4.js', varName: 'ENHANCED_CASE_BASE4' },
  { file: 'scored_cases5.js', varName: 'ENHANCED_CASE_BASE5' }
];
for (const cf of caseFiles) {
  const code = fs.readFileSync(path.join(DIR, cf.file), 'utf8');
  const arr = extractArray(code, cf.varName);
  if (arr && Array.isArray(arr)) allCases = allCases.concat(arr);
}

console.log('Total MCQs: ' + allMCQs.length);
console.log('Total cases: ' + allCases.length);

// ---- 1. Blueprint Accuracy ----
const SECTION_INFO = {
  A: { name: "External Financial Reporting Decisions", weight: 15 },
  B: { name: "Planning, Budgeting, and Forecasting", weight: 20 },
  C: { name: "Performance Management", weight: 20 },
  D: { name: "Cost Management", weight: 15 },
  E: { name: "Internal Controls", weight: 15 },
  F: { name: "Technology and Analytics", weight: 15 }
};

// ---- 2. Compute quality scores per question ----
function scoreQuestion(q, idx) {
  const scores = {};
  const reasons = [];

  // --- Blueprint Accuracy (1-5) ---
  // Check if Section is valid, Topic exists
  if (!SECTION_INFO[q.Section]) {
    scores.blueprint = 1;
    reasons.push('Invalid section: ' + q.Section);
  } else if (!q.Topic || q.Topic.length < 5) {
    scores.blueprint = 2;
    reasons.push('Missing or too-short topic');
  } else if (q.LOSTag && q.LOSTag.length > 5) {
    scores.blueprint = 5;
  } else {
    scores.blueprint = 3;
    reasons.push('No LOSTag or LOSTag too short');
  }

  // --- Technical Accuracy (1-5) ---
  // Check for common issues: contradictory answers, obviously wrong answers
  let techScore = 5;
  const choices = q.Choices || {};
  const choiceValues = Object.values(choices);
  const uniqueValues = new Set(choiceValues);
  if (uniqueValues.size < choiceValues.length) {
    techScore = Math.min(techScore, 3);
    reasons.push('Duplicate answer choices detected');
  }
  // Check for "all of the above" / "none of the above"
  for (const v of choiceValues) {
    const lv = v.toLowerCase();
    if (lv.includes('all of the above') || lv.includes('none of the above')) {
      techScore = Math.min(techScore, 2);
      reasons.push('Contains "all/none of the above" — rare on modern CMA');
      break;
    }
  }
  // Check if CorrectChoice is valid
  if (!q.CorrectChoice || !choices[q.CorrectChoice]) {
    techScore = Math.min(techScore, 1);
    reasons.push('CorrectChoice does not match any choice');
  }
  scores.technical = techScore;

  // --- Question Quality (1-5) ---
  let qScore = 5;
  if (!q.Stem || q.Stem.length < 20) {
    qScore = Math.min(qScore, 2);
    reasons.push('Stem too short (<20 chars)');
  }
  if (q.Stem && q.Stem.length > 300) {
    qScore = Math.min(qScore, 3);
    reasons.push('Stem very long (>300 chars) — may be unnecessarily complex');
  }
  // Check for absolute language
  if (q.Stem) {
    const absolutes = ['always','never','all','none','every','must always','never ever'];
    for (const a of absolutes) {
      if (q.Stem.toLowerCase().includes(a)) {
        qScore = Math.min(qScore, 4);
        reasons.push('Uses absolute language: "' + a + '"');
        break;
      }
    }
  }
  scores.quality = qScore;

  // --- Distractor Quality (1-5) ---
  let dScore = 5;
  const vals = choiceValues;
  if (vals.length < 4) {
    dScore = Math.min(dScore, 2);
    reasons.push('Only ' + vals.length + ' choices (expected 4)');
  }
  // Check length variance — very different lengths can give away the answer
  const lengths = vals.map(v => v.length);
  const maxLen = Math.max(...lengths);
  const minLen = Math.min(...lengths);
  if (maxLen > 0 && minLen > 0 && maxLen / minLen > 3) {
    dScore = Math.min(dScore, 4);
    reasons.push('Answer length variance high (ratio ' + Math.round(maxLen/minLen) + 'x) — may give clues');
  }
  // Check for grammatical clues (ending with article)
  if (q.Stem) {
    const lastWord = q.Stem.trim().split(' ').pop().toLowerCase();
    if (['a','an','the','is','are','was','were'].includes(lastWord)) {
      dScore = Math.min(dScore, 4);
      reasons.push('Stem ends with "' + lastWord + '" — may give grammatical clues');
    }
  }
  scores.distractor = dScore;

  // --- Explanation Quality (1-5) ---
  let eScore = 5;
  const explCorrect = q.ExplanationCorrect || '';
  const explWrongA = q.ExplanationWrongA || '';
  const explWrongB = q.ExplanationWrongB || '';
  const explWrongC = q.ExplanationWrongC || '';
  const explWrongD = q.ExplanationWrongD || '';

  if (!explCorrect) {
    eScore = Math.min(eScore, 1);
    reasons.push('No ExplanationCorrect');
  } else if (explCorrect.length < 30) {
    eScore = Math.min(eScore, 3);
    reasons.push('ExplanationCorrect too short (' + explCorrect.length + ' chars)');
  }
  if (explWrongA === 'This is the correct choice.') {
    eScore = Math.min(eScore, 3);
    reasons.push('ExplanationWrongA is generic: "This is the correct choice"');
  }
  // Check if WrongB/C/D are the generic PD text (contains colon, so check for the exact phrase)
  if (explWrongB && (explWrongB.includes('Plausible distractor: this choice misapplies') || explWrongB === 'Plausible distractor')) {
    eScore = Math.min(eScore, 2);
    reasons.push('Generic distractor explanation (no specific rationale)');
  }
  // Check all wrong explanations identical
  if (explWrongB && explWrongB === explWrongC && explWrongC === explWrongD && explWrongB.length > 5) {
    eScore = Math.min(eScore, 2);
    reasons.push('All 3 wrong-answer explanations are identical text');
  }
  scores.explanation = eScore;

  // --- Realism (1-5) ---
  let rScore = 5;
  const stem = q.Stem || '';
  const bizTerms = /company|firm|corporation|inc\.|llc|ltd\.|manufactur|retail|service|entity|division|subsidiary|department|organization|client|customer|manager|management|CFO|controller|accountant|analyst|auditor/i;
  const hasBizContext = bizTerms.test(stem);
  if (!hasBizContext) {
    rScore = Math.min(rScore, 3);
    reasons.push('No business context in stem (may lack realism)');
  }
  const hasYear = /20\d\d|year|month|quarter|annual|current|fiscal|period|recent|prior/i.test(stem);
  if (!hasYear) {
    rScore = Math.min(rScore, 4);
    reasons.push('No time/year reference in stem');
  }
  // Check for abstract/theoretical wording that lacks exam realism
  const abstractTerms = /which of the following|is defined as|refers to|describes the concept|is the process/i;
  if (abstractTerms.test(stem) && !hasBizContext) {
    rScore = Math.min(rScore, 3);
    reasons.push('Abstract/theoretical wording without business scenario');
  }
  scores.realism = rScore;

  // --- Difficulty Calibration (1-5) ---
  let diffScore = 5;
  const validDiffs = ['Easy','Moderate','Difficult'];
  if (!validDiffs.includes(q.Difficulty)) {
    diffScore = Math.min(diffScore, 2);
    reasons.push('Unknown difficulty: ' + q.Difficulty);
  }
  // Check CalculationItem flag vs difficulty
  if (q.CalculationItem && q.Difficulty === 'Easy') {
    diffScore = Math.min(diffScore, 4);
    reasons.push('Calculation item marked Easy — may be under-calibrated');
  }
  scores.difficulty = diffScore;

  // --- Repetition (detected later via cross-question analysis) ---
  scores.repetition = 5; // placeholder, will be adjusted

  // --- Overall Quality Grade ---
  const dims = ['blueprint','technical','quality','distractor','explanation','realism','difficulty','repetition'];
  const avg = dims.reduce((s, d) => s + (scores[d] || 5), 0) / dims.length;

  let grade;
  if (avg >= 4.5) grade = 'A';
  else if (avg >= 3.5) grade = 'B';
  else if (avg >= 2.5) grade = 'C';
  else grade = 'D';

  let priority;
  if (grade === 'D' || grade === 'C') {
    const lowScores = dims.filter(d => (scores[d] || 5) <= 2).length;
    if (grade === 'D' || lowScores >= 2) priority = 'Critical';
    else if (grade === 'C') priority = 'High';
    else priority = 'Medium';
  } else if (grade === 'B') {
    priority = 'Medium';
  } else {
    priority = 'Low';
  }

  return {
    questionID: q.QuestionID || ('Q' + idx),
    section: q.Section || '?',
    topic: q.Topic || '?',
    difficulty: q.Difficulty || '?',
    scores,
    avgScore: Math.round(avg * 10) / 10,
    grade,
    priority,
    reasons: reasons.slice(0, 5).join('; ')
  };
}

// ---- Score all MCQs ----
console.log('Scoring MCQs...');
const mcqScores = allMCQs.map((q, i) => scoreQuestion(q, i));

// ---- Detect repetition ----
// Compare stem starts for similarity
console.log('Detecting repetition...');
const seenStems = {};
mcqScores.forEach((s, i) => {
  const stem = (allMCQs[i].Stem || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const first20 = stem.split(' ').slice(0, 20).join(' ');
  if (first20.length > 40) {
    if (!seenStems[first20]) seenStems[first20] = [];
    seenStems[first20].push(i);
  }
});
const repeatedGroups = Object.values(seenStems).filter(g => g.length > 1);
repeatedGroups.forEach(group => {
  group.forEach(idx => {
    mcqScores[idx].scores.repetition = Math.max(1, 5 - group.length);
    mcqScores[idx].reasons += (mcqScores[idx].reasons ? '; ' : '') + 'Similar/same stem as ' + group.filter(i => i !== idx).map(i => allMCQs[i].QuestionID).join(', ');
    const s = mcqScores[idx];
    const dims = ['blueprint','technical','quality','distractor','explanation','realism','difficulty','repetition'];
    const avg = dims.reduce((sum, d) => sum + (s.scores[d] || 5), 0) / dims.length;
    s.avgScore = Math.round(avg * 10) / 10;
    if (avg >= 4.5) s.grade = 'A';
    else if (avg >= 3.5) s.grade = 'B';
    else if (avg >= 2.5) s.grade = 'C';
    else s.grade = 'D';
  });
});

// ---- Compute distribution ----
const grades = { A: 0, B: 0, C: 0, D: 0 };
mcqScores.forEach(s => { grades[s.grade]++; });
console.log('Grade distribution:');
Object.entries(grades).forEach(([k, v]) => console.log('  ' + k + ': ' + v + ' (' + Math.round(v/mcqScores.length*100) + '%)'));

const avgDimScores = {};
mcqScores.forEach(s => {
  Object.entries(s.scores).forEach(([dim, sc]) => {
    if (!avgDimScores[dim]) avgDimScores[dim] = { sum: 0, count: 0 };
    avgDimScores[dim].sum += sc;
    avgDimScores[dim].count++;
  });
});
console.log('Average dimension scores:');
Object.entries(avgDimScores).sort((a,b) => (a[1].sum/a[1].count) - (b[1].sum/b[1].count)).forEach(([dim, v]) => {
  console.log('  ' + dim + ': ' + Math.round(v.sum/v.count * 10) / 10);
});

// ---- Score cases ----
console.log('Scoring cases...');
const caseScores = allCases.map((c, i) => {
  const reasons = [];
  let cScore = 5;
  
  // Authenticity
  if (!c.ScenarioText || c.ScenarioText.length < 100) {
    cScore = Math.min(cScore, 3);
    reasons.push('Scenario text too short');
  }
  // Exhibits
  const hasExhibits = c.Exhibits && c.Exhibits.length > 0;
  if (!hasExhibits) {
    cScore = Math.min(cScore, 3);
    reasons.push('No exhibits');
  }
  // Items
  const itemCount = c.Items ? c.Items.length : 0;
  if (itemCount < 3) {
    cScore = Math.min(cScore, 3);
    reasons.push('Very few items: ' + itemCount);
  }
  // Item types variety
  if (c.Items) {
    const types = [...new Set(c.Items.map(it => it.Type))];
    if (types.length < 2) {
      cScore = Math.min(cScore, 4);
      reasons.push('All items same type: ' + types.join(','));
    }
  }
  // Explanations
  if (c.Items) {
    const noExpl = c.Items.filter(it => !it.Explanation || it.Explanation.length < 20).length;
    if (noExpl > itemCount / 2) {
      cScore = Math.min(cScore, 3);
      reasons.push(noExpl + '/' + itemCount + ' items lack detailed explanations');
    }
  }

  const grade = cScore >= 4.5 ? 'A' : cScore >= 3.5 ? 'B' : cScore >= 2.5 ? 'C' : 'D';
  return {
    caseID: c.CaseID || ('CASE-' + i),
    title: c.Title || '',
    section: c.SectionTags ? c.SectionTags.join(',') : '?',
    items: itemCount,
    exhibits: c.Exhibits ? c.Exhibits.length : 0,
    score: cScore,
    grade,
    reasons: reasons.join('; ')
  };
});

// ---- Generate CSV ----
let csv = 'QuestionID,Section,Topic,Difficulty,Grade,AvgScore,Blueprint,Technical,Quality,Distractor,Explanation,Realism,DifficultyScore,Repetition,Priority,Issues\n';
mcqScores.forEach(s => {
  csv += s.questionID + ',' + s.section + ',"' + (s.topic || '').replace(/"/g, '""') + '",' + s.difficulty + ',' + s.grade + ',' + s.avgScore + ',' +
    s.scores.blueprint + ',' + s.scores.technical + ',' + s.scores.quality + ',' + s.scores.distractor + ',' + s.scores.explanation + ',' +
    s.scores.realism + ',' + s.scores.difficulty + ',' + s.scores.repetition + ',' + s.priority + ',"' + (s.reasons || '').replace(/"/g, '""') + '"\n';
});
fs.writeFileSync(path.join(OUTPUT, 'QuestionQualityScores.csv'), csv);
console.log('Wrote QuestionQualityScores.csv');

// ---- Generate RewriteBacklog.md ----
// Take bottom 20% by avgScore as the rewrite backlog
const sorted = [...mcqScores].sort((a, b) => a.avgScore - b.avgScore);
const bottom20 = sorted.slice(0, Math.ceil(mcqScores.length * 0.2));
const backlog = bottom20;

let backlogMd = '# Rewrite Backlog\n\n';
backlogMd += 'Prioritized from weakest (bottom 20% of repository). ' + backlog.length + ' questions listed.\n\n';
backlogMd += '| QuestionID | Section | Grade | Avg Score | Priority | Key Issues |\n';
backlogMd += '|------------|---------|-------|-----------|----------|------------|\n';
backlog.forEach(s => {
  const priority = s.avgScore <= 3.0 ? 'Critical' : s.avgScore <= 3.5 ? 'High' : s.avgScore <= 4.0 ? 'Medium' : 'Low';
  backlogMd += '| ' + s.questionID + ' | ' + s.section + ' | ' + s.grade + ' | ' + s.avgScore + ' | ' + priority + ' | ' + (s.reasons || '').split(';')[0] + ' |\n';
});
backlogMd += '\n### Recommended Actions\n\n';
backlogMd += '1. **Add business context** to questions that are purely theoretical or definition-based\n';
backlogMd += '2. **Replace generic distractor explanations** with specific rationale for each answer\n';
backlogMd += '3. **Improve realism** by embedding questions in realistic business scenarios with company names and contexts\n';
backlogMd += '4. **Diversify repeated stems** to ensure unique wording across similar topics\n';
fs.writeFileSync(path.join(OUTPUT, 'RewriteBacklog.md'), backlogMd);
console.log('Wrote RewriteBacklog.md');

// ---- Generate RepositoryQualityDashboard.md ----
const avgGradeTotal = mcqScores.reduce((s, x) => s + x.avgScore, 0) / mcqScores.length;
const totalWeakDistractors = mcqScores.filter(s => s.scores.distractor <= 2).length;
const totalWeakExplanations = mcqScores.filter(s => s.scores.explanation <= 2).length;
const totalWeakRealism = mcqScores.filter(s => s.scores.realism <= 2).length;
const totalGenericExpl = mcqScores.filter(s => s.scores.explanation <= 3 && s.reasons && s.reasons.includes('generic')).length;

// Topic rankings
const topicScores = {};
mcqScores.forEach(s => {
  const t = s.topic || 'Unknown';
  if (!topicScores[t]) topicScores[t] = { sum: 0, count: 0 };
  topicScores[t].sum += s.avgScore;
  topicScores[t].count++;
});
const topicRank = Object.entries(topicScores).map(([t, v]) => ({ topic: t, avg: v.sum / v.count, count: v.count }));
topicRank.sort((a, b) => a.avg - b.avg);

console.log('Topic quality ranking:');
topicRank.slice(0, 10).forEach(t => console.log('  ' + t.topic + ': ' + Math.round(t.avg * 10) / 10 + ' (' + t.count + ' items)'));

let dashMd = '# Repository Quality Dashboard\n\n';
dashMd += '## Summary Metrics\n\n';
dashMd += '| Metric | Value |\n';
dashMd += '|--------|-------|\n';
dashMd += '| Total MCQs | ' + allMCQs.length + ' |\n';
dashMd += '| Total Cases | ' + allCases.length + ' |\n';
dashMd += '| Average Quality Score | ' + Math.round(avgGradeTotal * 10) / 10 + ' / 5 |\n';
dashMd += '| A-grade | ' + grades.A + ' (' + Math.round(grades.A/mcqScores.length*100) + '%) |\n';
dashMd += '| B-grade | ' + grades.B + ' (' + Math.round(grades.B/mcqScores.length*100) + '%) |\n';
dashMd += '| C-grade | ' + grades.C + ' (' + Math.round(grades.C/mcqScores.length*100) + '%) |\n';
dashMd += '| D-grade | ' + grades.D + ' (' + Math.round(grades.D/mcqScores.length*100) + '%) |\n';
dashMd += '| Weak Distractors (score ≤2) | ' + totalWeakDistractors + ' |\n';
dashMd += '| Weak Explanations (score ≤2) | ' + totalWeakExplanations + ' |\n';
dashMd += '| Weak Realism (score ≤2) | ' + totalWeakRealism + ' |\n';
dashMd += '| Generic Distractor Explanations | ' + totalGenericExpl + ' |\n';
dashMd += '| Calculation Items | ' + allMCQs.filter(q => q.CalculationItem).length + ' |\n';
dashMd += '| Duplicate/Similar Stems (groups) | ' + repeatedGroups.length + ' |\n';
dashMd += '| Questions needing rewrite (bottom 20%) | ' + backlog.length + ' |\n\n';

dashMd += '## Dimension Averages\n\n';
dashMd += '| Dimension | Avg Score |\n';
dashMd += '|-----------|-----------|\n';
Object.entries(avgDimScores).sort((a,b) => (a[1].sum/a[1].count) - (b[1].sum/b[1].count)).forEach(([dim, v]) => {
  dashMd += '| ' + dim.charAt(0).toUpperCase() + dim.slice(1) + ' | ' + Math.round(v.sum/v.count * 10) / 10 + ' |\n';
});
dashMd += '\n';

dashMd += '## Weakest Topics\n\n';
dashMd += '| Topic | Avg Quality | Count |\n';
dashMd += '|-------|-------------|-------|\n';
topicRank.slice(0, 15).forEach(t => {
  dashMd += '| ' + t.topic + ' | ' + Math.round(t.avg * 10) / 10 + ' | ' + t.count + ' |\n';
});
dashMd += '\n';

dashMd += '## Case Summary\n\n';
dashMd += '| Metric | Value |\n';
dashMd += '|--------|-------|\n';
dashMd += '| Total Cases | ' + allCases.length + ' |\n';
dashMd += '| Average Case Score | ' + Math.round(caseScores.reduce((s, c) => s + c.score, 0) / caseScores.length * 10) / 10 + ' / 5 |\n';
dashMd += '| Cases with exhibits | ' + caseScores.filter(c => c.exhibits > 0).length + ' |\n';
dashMd += '| Cases without exhibits | ' + caseScores.filter(c => c.exhibits === 0).length + ' |\n';
dashMd += '| Average items per case | ' + Math.round(caseScores.reduce((s, c) => s + c.items, 0) / caseScores.length) + ' |\n';

fs.writeFileSync(path.join(OUTPUT, 'RepositoryQualityDashboard.md'), dashMd);
console.log('Wrote RepositoryQualityDashboard.md');

// ---- Generate RepositoryQualityAudit.md ----
let auditMd = '# Repository Quality Audit — Sprint 5.9A\n\n';
auditMd += '**Date:** 2026-07-21\n';
auditMd += '**Scope:** Read-only quality audit of ' + allMCQs.length + ' MCQs and ' + allCases.length + ' case studies.\n';
auditMd += '**Methodology:** Automated 10-dimension rubric scoring with heuristic analysis.\n\n';

auditMd += '## Rubric Dimensions\n\n';
auditMd += '| # | Dimension | Scale | Method |\n';
auditMd += '|---|-----------|-------|--------|\n';
auditMd += '| 1 | Blueprint Accuracy | 1–5 | Section validity, LOSTag presence, Topic mapping |\n';
auditMd += '| 2 | Technical Accuracy | 1–5 | Duplicate answers, all/none-of-above, valid CorrectChoice |\n';
auditMd += '| 3 | Question Quality | 1–5 | Stem length, absolute language, clarity heuristics |\n';
auditMd += '| 4 | Distractor Quality | 1–5 | Length variance, grammatical clues, choice count |\n';
auditMd += '| 5 | Explanation Quality | 1–5 | Presence, length, specificity, generic text detection |\n';
auditMd += '| 6 | Realism | 1–5 | Business context, time references, professional language |\n';
auditMd += '| 7 | Difficulty Calibration | 1–5 | Valid difficulty label, calculation/easy mismatch |\n';
auditMd += '| 8 | Repetition | 1–5 | Stem similarity detection across question pool |\n';
auditMd += '| 9 | Case Quality | 1–5 | Scenario length, exhibits, item variety, explanations |\n';
auditMd += '| 10 | Overall Grade | A–D | Weighted composite of dimensions 1–8 |\n\n';

auditMd += '## Grade Distribution\n\n';
auditMd += '| Grade | Count | Percentage |\n';
auditMd += '|-------|-------|------------|\n';
'ABCD'.split('').forEach(g => {
  auditMd += '| ' + g + ' | ' + grades[g] + ' | ' + Math.round(grades[g]/mcqScores.length*100) + '% |\n';
});
auditMd += '\n';

auditMd += '## Dimension Performance\n\n';
auditMd += '| Dimension | Avg Score | Assessment |\n';
auditMd += '|-----------|-----------|------------|\n';
Object.entries(avgDimScores).sort((a,b) => (a[1].sum/a[1].count) - (b[1].sum/b[1].count)).forEach(([dim, v]) => {
  const avg = v.sum / v.count;
  const assessment = avg >= 4 ? 'Strong' : avg >= 3 ? 'Adequate' : avg >= 2 ? 'Weak' : 'Critical';
  auditMd += '| ' + dim.charAt(0).toUpperCase() + dim.slice(1) + ' | ' + Math.round(avg * 10) / 10 + ' | ' + assessment + ' |\n';
});
auditMd += '\n';

auditMd += '## Key Findings\n\n';

// Weakest dimensions
const weakestDim = Object.entries(avgDimScores).sort((a,b) => (a[1].sum/a[1].count) - (b[1].sum/b[1].count))[0];
auditMd += '### 1. ' + weakestDim[0].charAt(0).toUpperCase() + weakestDim[0].slice(1) + ' is the weakest dimension\n';
auditMd += 'Average score: ' + Math.round((weakestDim[1].sum/weakestDim[1].count) * 10) / 10 + '/5.\n';
auditMd += 'This indicates a systematic issue across the repository. See the RewriteBacklog for specific items.\n\n';

if (totalGenericExpl > 0) {
  auditMd += '### 2. Generic Distractor Explanations\n';
  auditMd += totalGenericExpl + ' questions have generic "This is the correct choice" or "Plausible distractor" text instead of specific rationale. ';
  auditMd += 'These explanations provide minimal educational value and should be rewritten with specific reasoning.\n\n';
}

if (repeatedGroups.length > 0) {
  auditMd += '### 3. Repetition Detected\n';
  auditMd += repeatedGroups.length + ' groups of questions share similar or identical stem text. ';
  auditMd += 'This may indicate duplicate content that should be diversified.\n\n';
}

auditMd += '### 4. Blueprint Coverage\n';
const sections = {};
allMCQs.forEach(q => {
  if (!sections[q.Section]) sections[q.Section] = { count: 0, topics: new Set() };
  sections[q.Section].count++;
  if (q.Topic) sections[q.Section].topics.add(q.Topic);
});
Object.entries(sections).sort((a,b) => a[0].localeCompare(b[0])).forEach(([sec, info]) => {
  auditMd += '- Section ' + sec + ' (' + SECTION_INFO[sec]?.name + '): ' + info.count + ' MCQs, ' + info.topics.size + ' unique topics\n';
});
auditMd += '\n';

auditMd += '### 5. Case Study Quality\n\n';
auditMd += '| CaseID | Title | Items | Exhibits | Score | Issues |\n';
auditMd += '|--------|-------|-------|----------|-------|--------|\n';
caseScores.sort((a, b) => a.score - b.score).slice(0, 20).forEach(c => {
  auditMd += '| ' + c.caseID + ' | ' + c.title.slice(0, 40) + ' | ' + c.items + ' | ' + c.exhibits + ' | ' + c.score + ' | ' + (c.reasons || '').split(';')[0] + ' |\n';
});
auditMd += '\n';

auditMd += '### 6. Weakest Questions (Bottom 20%)\n\n';
const bottom20pct = [...mcqScores].sort((a, b) => a.avgScore - b.avgScore).slice(0, Math.ceil(mcqScores.length * 0.2));
auditMd += '| QuestionID | Section | Grade | Score | Primary Issue |\n';
auditMd += '|------------|---------|-------|-------|---------------|\n';
bottom20pct.slice(0, 30).forEach(s => {
  auditMd += '| ' + s.questionID + ' | ' + s.section + ' | ' + s.grade + ' | ' + s.avgScore + ' | ' + (s.reasons || '').split(';')[0] + ' |\n';
});
auditMd += '\n';

auditMd += '### 7. Recommendations\n\n';
auditMd += '1. **Rewrite all generic distractor explanations** — Replace placeholder text with specific rationale for each distractor.\n';
auditMd += '2. **Address weak topics** — Focus rewrite effort on topics with average scores below 3.0.\n';
auditMd += '3. **Diversify repeated stems** — Ensure unique scenarios for questions flagged for repetition.\n';
auditMd += '4. **Add business context to abstract questions** — Improve realism by embedding questions in business scenarios.\n';
auditMd += '5. **Calibrate difficulty labels** — Review items flagged for difficulty metadata inconsistency.\n';
auditMd += '6. **Enhance case exhibits** — Add exhibits to cases that lack them; improve existing exhibit quality.\n\n';

auditMd += '---\n\n';
auditMd += '*This audit was performed automatically using 10-dimension rubric heuristics. ';
auditMd += 'Results should be validated by human review before undertaking rewrite work.*\n';

fs.writeFileSync(path.join(OUTPUT, 'RepositoryQualityAudit.md'), auditMd);
console.log('Wrote RepositoryQualityAudit.md');

console.log('\nAudit complete. Output files:');
console.log('  ' + path.join(OUTPUT, 'QuestionQualityScores.csv'));
console.log('  ' + path.join(OUTPUT, 'RewriteBacklog.md'));
console.log('  ' + path.join(OUTPUT, 'RepositoryQualityDashboard.md'));
console.log('  ' + path.join(OUTPUT, 'RepositoryQualityAudit.md'));
