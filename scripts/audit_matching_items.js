// Session 80P — Matching Item Integrity Audit (Governance Light Lane, Read-Only)
// Audits all "match" type items across case_pack_1/2/3_corrected.js for:
//   1. Same-answer reuse (multiple LeftItems map to identical RightItem)
//   2. Ordered-answer patterns (positional cueing)
//   3. Distractor quality (unused, duplicates, impossible)
//   4. Scoring integrity (unique answers, option consistency)
//
// Output: reports/matching/MATCHING_ITEM_AUDIT.json
//         reports/matching/MATCHING_ITEM_DEFECT_REPORT.md
//         reports/matching/MATCHING_ITEM_REMEDIATION_QUEUE.json

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const packFiles = [
  'case_pack_1_corrected.js',
  'case_pack_2_corrected.js',
  'case_pack_3_corrected.js'
];

// --- Parse helpers ---
function parsePackFile(filePath) {
  const raw = fs.readFileSync(path.join(rootDir, filePath), 'utf-8');
  // Use Function constructor — project standard approach
  const varName = raw.match(/const\s+(CASE_PACK_\d+)\s*=/);
  if (!varName) throw new Error(`Cannot find CASE_PACK constant in ${filePath}`);
  const fn = new Function(raw + '; return ' + varName[1] + ';');
  return fn();
}

// --- Audit Functions ---

function auditMatchingItem(item, caseMeta) {
  const findings = [];
  const { LeftItems, RightItems, Correct } = item;
  const leftCount = LeftItems.length;
  const rightCount = RightItems.length;

  // === CHECK 1: Same-answer reuse ===
  // Multiple LeftItems map to the same RightItem text
  const answerMap = {};
  for (const left of LeftItems) {
    const mapped = Correct[left];
    if (!answerMap[mapped]) answerMap[mapped] = [];
    answerMap[mapped].push(left);
  }
  const reusedAnswers = [];
  for (const [answer, lefts] of Object.entries(answerMap)) {
    if (lefts.length > 1) {
      reusedAnswers.push({ answer, leftItems: lefts, count: lefts.length });
      findings.push({
        category: 'SAME_ANSWER_REUSE',
        severity: 'HIGH',
        detail: `"${answer}" is the correct mapping for ${lefts.length} different LeftItems: [${lefts.map(l => `"${l}"`).join(', ')}]`,
        affectedPrompts: lefts
      });
    }
  }

  // === CHECK 2: Ordered-answer patterns ===
  // Check sequential pairing: LeftItems[0] → RightItems[0], LeftItems[1] → RightItems[1], etc.
  let sequentialMatches = 0;
  const pairs = [];
  for (let i = 0; i < Math.min(leftCount, rightCount); i++) {
    const expected = RightItems[i];
    const actual = Correct[LeftItems[i]];
    if (actual === expected) {
      sequentialMatches++;
      pairs.push({ index: i, left: LeftItems[i], right: expected });
    }
  }
  const sequentialRatio = sequentialMatches / leftCount;
  if (sequentialRatio >= 0.75) {
    findings.push({
      category: 'ORDERED_ANSWER_PATTERN',
      severity: sequentialRatio === 1.0 ? 'HIGH' : 'MEDIUM',
      detail: `${sequentialMatches}/${leftCount} LeftItems map sequentially to RightItems (${(sequentialRatio*100).toFixed(0)}%). Learner can guess by position.`,
      sequentialPairs: pairs,
      sequentialRatio
    });
  }

  // === CHECK 3: Distractor quality ===
  // 3a. Unused distractors (RightItems not used in Correct)
  const usedRightItems = new Set(Object.values(Correct));
  const unusedRightItems = RightItems.filter(r => !usedRightItems.has(r));
  if (unusedRightItems.length > 0) {
    findings.push({
      category: 'UNUSED_DISTRACTOR',
      severity: 'LOW',
      detail: `${unusedRightItems.length} RightItems are never used as a correct answer: [${unusedRightItems.map(r => `"${r}"`).join(', ')}]`,
      unusedRightItems
    });
  }

  // 3b. Duplicate RightItems (identical text in RightItems array)
  const rightCounts = {};
  for (const r of RightItems) {
    rightCounts[r] = (rightCounts[r] || 0) + 1;
  }
  const duplicateRightItems = Object.entries(rightCounts)
    .filter(([, c]) => c > 1)
    .map(([r, c]) => ({ text: r, count: c }));
  if (duplicateRightItems.length > 0) {
    findings.push({
      category: 'DUPLICATE_DISTRACTOR',
      severity: 'HIGH',
      detail: `${duplicateRightItems.length} RightItems appear multiple times in the choices list: ${duplicateRightItems.map(d => `"${d.text}" (${d.count}x)`).join(', ')}`,
      duplicateRightItems
    });
  }

  // 3c. RightItems count = LeftItems count (no extra distractors)
  if (rightCount === leftCount) {
    findings.push({
      category: 'NO_EXTRA_DISTRACTORS',
      severity: 'MEDIUM',
      detail: `RightItems count (${rightCount}) equals LeftItems count (${leftCount}). No extra distractor choices — process of elimination works perfectly.`
    });
  }

  // === CHECK 4: Scoring integrity ===
  // 4a. Every LeftItem has a valid mapping in Correct
  const missingMappings = LeftItems.filter(l => !Correct.hasOwnProperty(l));
  if (missingMappings.length > 0) {
    findings.push({
      category: 'MISSING_CORRECT_MAPPING',
      severity: 'CRITICAL',
      detail: `${missingMappings.length} LeftItems have no mapping in Correct: [${missingMappings.map(m => `"${m}"`).join(', ')}]`,
      missingMappings
    });
  }

  // 4b. Correct mappings refer to unknown RightItems
  const unknownRightRefs = Object.entries(Correct)
    .filter(([, v]) => !RightItems.includes(v))
    .map(([k, v]) => ({ left: k, mappedTo: v }));
  if (unknownRightRefs.length > 0) {
    findings.push({
      category: 'UNKNOWN_RIGHT_REFERENCE',
      severity: 'CRITICAL',
      detail: `${unknownRightRefs.length} Correct mappings reference RightItems not in the choices list`,
      unknownRightRefs
    });
  }

  // 4c. Extra keys in Correct not in LeftItems
  const extraKeys = Object.keys(Correct).filter(k => !LeftItems.includes(k));
  if (extraKeys.length > 0) {
    findings.push({
      category: 'EXTRA_CORRECT_KEYS',
      severity: 'MEDIUM',
      detail: `Correct mapping contains ${extraKeys.length} keys not in LeftItems: [${extraKeys.map(k => `"${k}"`).join(', ')}]`,
      extraKeys
    });
  }

  // Compute position-based answer index
  // For each LeftItem, what index in RightItems is its correct answer?
  const answerIndices = LeftItems.map((left, i) => {
    const correctAnswer = Correct[left];
    const idx = RightItems.indexOf(correctAnswer);
    return { left, position: i, answerIndex: idx, answer: correctAnswer };
  });

  return {
    itemId: item.ItemID || 'UNKNOWN',
    caseId: caseMeta.CaseID,
    caseTitle: caseMeta.Title || 'Untitled',
    section: caseMeta.Section || caseMeta.SectionTags?.[0] || '?',
    pack: caseMeta.Pack || '?',
    prompt: item.Prompt,
    leftCount,
    rightCount,
    reusedAnswers,
    sequentialRatio,
    answerIndices,
    findings
  };
}

// --- Main ---
function main() {
  console.log('=== Session 80P — Matching Item Integrity Audit ===\n');

  const allResults = [];
  const summary = {
    totalMatchItems: 0,
    totalClean: 0,
    totalWithFindings: 0,
    byCategory: {
      SAME_ANSWER_REUSE: 0,
      ORDERED_ANSWER_PATTERN: 0,
      UNUSED_DISTRACTOR: 0,
      DUPLICATE_DISTRACTOR: 0,
      NO_EXTRA_DISTRACTORS: 0,
      MISSING_CORRECT_MAPPING: 0,
      UNKNOWN_RIGHT_REFERENCE: 0,
      EXTRA_CORRECT_KEYS: 0
    },
    bySeverity: {
      CRITICAL: 0,
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0
    },
    byPack: {},
    bySection: {}
  };

  for (const file of packFiles) {
    const packNum = file.match(/case_pack_(\d+)/)[1];
    console.log(`Parsing ${file}...`);
    const cases = parsePackFile(file);
    console.log(`  ${cases.length} cases loaded.\n`);

    if (!summary.byPack[`Pack ${packNum}`]) {
      summary.byPack[`Pack ${packNum}`] = { total: 0, clean: 0, withFindings: 0 };
    }

    for (const c of cases) {
      if (!c.Items) continue;
      for (const item of c.Items) {
        if (item.Type !== 'match') continue;
        summary.totalMatchItems++;

        const section = c.Section || c.SectionTags?.[0] || '?';
        if (!summary.bySection[section]) {
          summary.bySection[section] = { total: 0, clean: 0, withFindings: 0 };
        }
        summary.bySection[section].total++;
        summary.byPack[`Pack ${packNum}`].total++;

        const result = auditMatchingItem(item, c);
        allResults.push(result);

        if (result.findings.length === 0) {
          summary.totalClean++;
          summary.byPack[`Pack ${packNum}`].clean++;
          summary.bySection[section].clean++;
        } else {
          summary.totalWithFindings++;
          summary.byPack[`Pack ${packNum}`].withFindings++;
          summary.bySection[section].withFindings++;

          for (const f of result.findings) {
            summary.byCategory[f.category] = (summary.byCategory[f.category] || 0) + 1;
            summary.bySeverity[f.severity] = (summary.bySeverity[f.severity] || 0) + 1;
          }

          if (result.findings.some(f => f.severity === 'HIGH' || f.severity === 'CRITICAL')) {
            console.log(`  [!!] ${result.itemId} (${result.caseId}/${result.section}): ${result.findings.length} finding(s)`);
            for (const f of result.findings) {
              console.log(`       [${f.severity}] ${f.category}: ${f.detail.substring(0, 120)}...`);
            }
          }
        }
      }
    }
  }

  // --- Output ---
  const outDir = path.join(rootDir, 'reports', 'matching');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // MATCHING_ITEM_AUDIT.json — full per-item detail
  const auditJson = {
    title: 'Session 80P — Matching Item Integrity Audit',
    generated: new Date().toISOString(),
    governanceLane: 'Governance Light — Read-Only',
    summary,
    results: allResults
  };
  fs.writeFileSync(path.join(outDir, 'MATCHING_ITEM_AUDIT.json'), JSON.stringify(auditJson, null, 2), 'utf-8');
  console.log(`\nWrote MATCHING_ITEM_AUDIT.json (${allResults.length} items)`);

  // MATCHING_ITEM_REMEDIATION_QUEUE.json — prioritized
  const remediationItems = allResults
    .filter(r => r.findings.length > 0)
    .map(r => {
      // Priority score: CRITICAL=100, HIGH=10, MEDIUM=1, LOW=0 per finding
      const priorityScore = r.findings.reduce((score, f) => {
        const weights = { CRITICAL: 100, HIGH: 10, MEDIUM: 1, LOW: 0 };
        return score + (weights[f.severity] || 0);
      }, 0);
      return {
        itemId: r.itemId,
        caseId: r.caseId,
        caseTitle: r.caseTitle,
        section: r.section,
        pack: r.pack,
        prompt: r.prompt,
        priorityScore,
        findings: r.findings,
        remediationHints: r.findings.map(f => {
          switch (f.category) {
            case 'SAME_ANSWER_REUSE':
              return 'Author distinct RightItems for each LeftItem so no two prompts share the same answer text.';
            case 'ORDERED_ANSWER_PATTERN':
              return 'Shuffle RightItems so correct answers are not at same position as prompts.';
            case 'DUPLICATE_DISTRACTOR':
              return 'Remove duplicate RightItems; ensure all choices are unique.';
            case 'UNUSED_DISTRACTOR':
              return 'Either remove unused RightItems or assign them as distractors in a redesigned set.';
            case 'NO_EXTRA_DISTRACTORS':
              return 'Add 1-2 extra RightItems as plausible distractors.';
            case 'MISSING_CORRECT_MAPPING':
              return 'Add Correct mapping for each missing LeftItem.';
            case 'UNKNOWN_RIGHT_REFERENCE':
              return 'Fix Correct mapping to reference only RightItems present in the choices list.';
            case 'EXTRA_CORRECT_KEYS':
              return 'Remove stale keys from Correct that are not in LeftItems.';
            default:
              return 'Investigate and fix.';
          }
        })
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);

  fs.writeFileSync(
    path.join(outDir, 'MATCHING_ITEM_REMEDIATION_QUEUE.json'),
    JSON.stringify({ title: 'Session 80P — Matching Item Remediation Queue', generated: new Date().toISOString(), totalItems: remediationItems.length, queue: remediationItems }, null, 2),
    'utf-8'
  );
  console.log(`Wrote MATCHING_ITEM_REMEDIATION_QUEUE.json (${remediationItems.length} items queued)`);

  // MATCHING_ITEM_DEFECT_REPORT.md — human-readable
  const lines = [];
  lines.push('# Session 80P — Matching Item Integrity Defect Report');
  lines.push('');
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push('**Governance Lane:** Light — Read-Only Analysis');
  lines.push('**Files Audited:** case_pack_1_corrected.js, case_pack_2_corrected.js, case_pack_3_corrected.js');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Executive Summary');
  lines.push('');
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Total matching items | ${summary.totalMatchItems} |`);
  lines.push(`| Clean (no findings) | ${summary.totalClean} |`);
  lines.push(`| Items with defects | ${summary.totalWithFindings} |`);
  lines.push(`| CRITICAL findings | ${summary.bySeverity.CRITICAL || 0} |`);
  lines.push(`| HIGH severity findings | ${summary.bySeverity.HIGH || 0} |`);
  lines.push(`| MEDIUM severity findings | ${summary.bySeverity.MEDIUM || 0} |`);
  lines.push(`| LOW severity findings | ${summary.bySeverity.LOW || 0} |`);
  lines.push('');
  lines.push('## Defect Categories Found');
  lines.push('');
  lines.push('| Category | Count | Severity |');
  lines.push('|----------|-------|----------|');
  for (const [cat, count] of Object.entries(summary.byCategory)) {
    lines.push(`| ${cat} | ${count} | |`);
  }
  lines.push('');
  lines.push('## Distribution by Pack');
  lines.push('');
  lines.push('| Pack | Total | Clean | With Defects |');
  lines.push('|------|-------|-------|-------------|');
  for (const [pack, stats] of Object.entries(summary.byPack)) {
    lines.push(`| ${pack} | ${stats.total} | ${stats.clean} | ${stats.withFindings} |`);
  }
  lines.push('');
  lines.push('## Distribution by Section');
  lines.push('');
  lines.push('| Section | Total | Clean | With Defects |');
  lines.push('|---------|-------|-------|-------------|');
  const sectionOrder = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (const sec of sectionOrder) {
    const stats = summary.bySection[sec];
    if (stats) {
      lines.push(`| ${sec} | ${stats.total} | ${stats.clean} | ${stats.withFindings} |`);
    }
  }
  lines.push('');
  lines.push('## Detailed Findings');
  lines.push('');

  for (const r of allResults.filter(r => r.findings.length > 0)) {
    lines.push(`### ${r.itemId} — ${r.caseId} (${r.section}, Pack ${r.pack})`);
    lines.push('');
    lines.push(`**Prompt:** "${r.prompt}"`);
    lines.push(`**LeftItems:** ${r.leftCount} | **RightItems:** ${r.rightCount} | **Sequential ratio:** ${(r.sequentialRatio * 100).toFixed(0)}%`);
    lines.push('');
    lines.push('**Answer mapping:**');
    lines.push('');
    lines.push('| # | LeftItem | → RightItem (index) | Index |');
    lines.push('|---|----------|---------------------|-------|');
    for (const ai of r.answerIndices) {
      lines.push(`| ${ai.position + 1} | ${ai.left} | ${ai.answer} | ${ai.answerIndex}${ai.position === ai.answerIndex ? ' ← SAME POSITION' : ''} |`);
    }
    lines.push('');
    for (const f of r.findings) {
      lines.push(`- **[${f.severity}] ${f.category}:** ${f.detail}`);
    }
    lines.push('');
  }

  fs.writeFileSync(path.join(outDir, 'MATCHING_ITEM_DEFECT_REPORT.md'), lines.join('\n'), 'utf-8');
  console.log('Wrote MATCHING_ITEM_DEFECT_REPORT.md');

  // Print summary to console
  console.log('\n=== AUDIT SUMMARY ===');
  console.log(`Total matching items:   ${summary.totalMatchItems}`);
  console.log(`Clean (no findings):    ${summary.totalClean}`);
  console.log(`Items with defects:     ${summary.totalWithFindings}`);
  console.log(`CRITICAL findings:      ${summary.bySeverity.CRITICAL || 0}`);
  console.log(`HIGH findings:          ${summary.bySeverity.HIGH || 0}`);
  console.log(`MEDIUM findings:        ${summary.bySeverity.MEDIUM || 0}`);
  console.log(`LOW findings:           ${summary.bySeverity.LOW || 0}`);
  console.log(`\nRemediation queue:      ${remediationItems.length} items (sorted by priority)`);
  console.log(`Output directory:       ${outDir}`);
}

main();
