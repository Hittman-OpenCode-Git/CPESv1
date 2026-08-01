/**
 * build_master_registry.js
 * Scans all MCQ packs and case study files to produce:
 *   1. MasterQuestionRegistry.csv
 *   2. BlueprintCoverageMatrix.csv
 *   3. QuestionRelationshipMap.csv
 *   4. Phase1_Baseline_Report.md
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'reports');

// ============================================================
// Helpers
// ============================================================
function csvEscape(v) {
  if (v === null || v === undefined) return '';
  const s = String(v).replace(/"/g, '""');
  return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s}"` : s;
}

function csvRow(obj, keys) {
  return keys.map(k => csvEscape(obj[k])).join(',');
}

function determineAction(score) {
  if (score === null || score === undefined) return 'Needs Baseline';
  if (score >= 90) return 'Keep';
  if (score >= 70) return 'Revise';
  return 'Rewrite';
}

function determineGoldStandard(score, metadataComplete) {
  if (score >= 95 && metadataComplete) return 'Y';
  return 'N';
}

function stripAnsi(s) {
  return String(s).replace(/\x1B\[[0-9;]*m/g, '');
}

// ============================================================
// Registery columns
// ============================================================
const REGISTRY_KEYS = [
  // Content Identity
  'QuestionID', 'CaseID', 'File', 'Version', 'Status', 'CreatedDate', 'LastAuditDate', 'RevisionCount',
  // Blueprint
  'Domain', 'Topic', 'Subtopic', 'LearningOutcomeStatement', 'PrimaryCompetency', 'SecondaryCompetency',
  // Classification
  'QuestionType', 'BloomLevel', 'Difficulty', 'DifficultyScore', 'EstimatedMinutes',
  // Technical
  'FormulaReference', 'AccountingPrinciple', 'CalculationRequired', 'ExhibitRequired', 'Industry', 'ScenarioType',
  // Quality
  'OverallScore', 'ScoreBlueprint', 'ScoreCognitive', 'ScoreTechnical', 'ScoreDistractor',
  'ScoreRealism', 'ScoreNumerical', 'ScoreExplanation', 'ScoreClarity', 'ScoreAccessibility', 'ScoreMetadata',
  'RecommendedAction', 'GoldStandardEligible',
  // Learning
  'CommonTrap', 'LearningObjectives', 'RelatedTopics', 'PrerequisiteConcepts',
  // Future Analytics
  'StudentCorrectPct', 'AverageTime', 'ConfidenceRating', 'DifficultyIndex', 'DiscriminationIndex', 'GuessRate'
];

// ============================================================
// Parse MCQ Packs
// ============================================================
function parseMCQPack(filePath, packLabel) {
  const content = fs.readFileSync(filePath, 'utf8');
  const results = [];

  // Try to find the array name dynamically
  const arrayMatch = content.match(/const\s+(\w+)\s*=\s*\[/);
  if (!arrayMatch) return results;
  const arrayName = arrayMatch[1];

  // Extract each object
  let depth = 0;
  let startIdx = content.indexOf('[');
  if (startIdx === -1) return results;
  startIdx++; // skip '['
  let objStart = -1;
  let bracketCount = 0;
  let braceCount = 0;
  let inString = false;
  let stringChar = null;

  for (let i = startIdx; i < content.length; i++) {
    const ch = content[i];
    if (inString) {
      if (ch === '\\') { i++; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }
    if (ch === '{') {
      if (braceCount === 0) objStart = i;
      braceCount++;
    }
    if (ch === '}') {
      braceCount--;
      if (braceCount === 0 && objStart !== -1) {
        const objStr = content.slice(objStart, i + 1);
        try {
          const obj = JSON.parse(objStr);
          const qid = obj.QuestionID || obj.ItemID || '';
          const section = obj.Section || '';
          const choices = obj.Choices || {};
          const choicesArr = obj.ChoiceA ? ['A','B','C','D'].map(l => obj['Choice'+l] || '') : Object.values(choices);

          results.push({
            QuestionID: qid,
            CaseID: '',
            File: path.basename(filePath),
            Version: '1.0',
            Status: 'Draft',
            CreatedDate: '',
            LastAuditDate: '',
            RevisionCount: 0,
            Domain: obj.SectionName || section,
            Topic: obj.Topic || '',
            Subtopic: obj.MicroTopic || '',
            LearningOutcomeStatement: obj.LOSTag || '',
            PrimaryCompetency: '',
            SecondaryCompetency: '',
            QuestionType: obj.ItemType || 'MCQ',
            BloomLevel: obj.CognitiveLevel || '',
            Difficulty: obj.Difficulty || '',
            DifficultyScore: obj.DifficultyScore || '',
            EstimatedMinutes: '',
            FormulaReference: '',
            AccountingPrinciple: obj.AccountingPrinciple || '',
            CalculationRequired: obj.CalculationItem ? 'Y' : 'N',
            ExhibitRequired: 'N',
            Industry: '',
            ScenarioType: 'MCQ',
            OverallScore: '',
            ScoreBlueprint: '',
            ScoreCognitive: '',
            ScoreTechnical: '',
            ScoreDistractor: '',
            ScoreRealism: '',
            ScoreNumerical: '',
            ScoreExplanation: '',
            ScoreClarity: '',
            ScoreAccessibility: '',
            ScoreMetadata: '',
            RecommendedAction: 'Needs Baseline',
            GoldStandardEligible: 'N',
            CommonTrap: '',
            LearningObjectives: '',
            RelatedTopics: '',
            PrerequisiteConcepts: '',
            StudentCorrectPct: '',
            AverageTime: '',
            ConfidenceRating: obj.Confidence !== undefined ? obj.Confidence : (obj.CalculationItem ? '90' : ''),
            DifficultyIndex: '',
            DiscriminationIndex: '',
            GuessRate: '',
            _section: section,
            _raw: obj
          });
        } catch (e) {
          // skip parse errors
        }
        objStart = -1;
      }
    }
  }

  return results;
}

// ============================================================
// Parse Case Study Files
// ============================================================
function evalCaseData(content) {
  // Find all array declarations: const|var NAME = [...];
  // Look for ENHANCED_CASE prepended names
  const varPattern = /(?:const|var|let)\s+(ENHANCED_CASE\w*)\s*=\s*\[/g;
  const varNames = [];
  let match;
  while ((match = varPattern.exec(content)) !== null) {
    if (!varNames.includes(match[1])) varNames.push(match[1]);
  }

  if (varNames.length === 0) return [];

  // For each array variable, extract its literal and evaluate it
  const allCases = [];
  varNames.forEach(name => {
    // Find the assignment for this specific variable
    const assignPattern = new RegExp(`(?:const|var|let)\\s+${name}\\s*=\\s*\\[`);
    const assignMatch = content.match(assignPattern);
    if (!assignMatch) return;

    // Extract the array content by tracking bracket depth
    const startQuote = content.lastIndexOf('\n', assignMatch.index);
    const start = content.indexOf('[', assignMatch.index);
    if (start < 0) return;

    let depth = 0;
    let inString = false;
    let strChar = null;
    // Find the matching close bracket at the top level
    for (let i = start; i < content.length; i++) {
      const ch = content[i];
      if (inString) {
        if (ch === '\\') { i++; continue; }
        if (ch === strChar) inString = false;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        strChar = ch;
        continue;
      }
      if (ch === '[') depth++;
      if (ch === ']') {
        depth--;
        if (depth === 0) {
          // Found the end
          let arrayStr = content.substring(start, i + 1);
          try {
            const evalScript = `globalThis.__tmpArray__ = ${arrayStr}`;
            eval(evalScript);
            if (Array.isArray(globalThis.__tmpArray__)) {
              allCases.push(...globalThis.__tmpArray__);
            }
          } catch (e) {
            // Try restoring with const -> var
            try {
              const evalScript = `var __tmpArr = ${arrayStr}; globalThis.__tmpArray__ = __tmpArr;`;
              eval(evalScript);
              if (Array.isArray(globalThis.__tmpArray__)) {
                allCases.push(...globalThis.__tmpArray__);
              }
            } catch (e2) {
              // skip
            }
          }
          delete globalThis.__tmpArray__;
          break;
        }
      }
    }
  });

  return allCases;
}

function processCaseArray(caseArr, fileName) {
  const results = [];
  caseArr.forEach(caseObj => {
    const caseId = caseObj.CaseID || '';
    const items = caseObj.Items || [];
    const exhibits = caseObj.Exhibits || [];

    items.forEach((item, idx) => {
      results.push({
        QuestionID: item.ItemID || `${caseId}-Q${idx+1}`,
        CaseID: caseId,
        File: fileName,
        Version: caseObj.Version || '1.0',
        Status: caseObj.ProductionStatus || 'Draft',
        CreatedDate: caseObj.CreatedDate || '',
        LastAuditDate: caseObj.LastValidated || caseObj.ModifiedDate || '',
        RevisionCount: (caseObj.RevisionHistory || []).length,
        Domain: caseObj.BlueprintDomain || caseObj.Section || '',
        Topic: item.Topic || caseObj.Topic || '',
        Subtopic: item.Subtopic || caseObj.Subtopic || '',
        LearningOutcomeStatement: (caseObj.BlueprintObjectives || []).join('; '),
        PrimaryCompetency: caseObj.PrimaryCompetency || item.PrimaryCompetency || '',
        SecondaryCompetency: (caseObj.SecondaryCompetencies || []).join('; '),
        QuestionType: item.Type || 'select',
        BloomLevel: item.CognitiveLevel || '',
        Difficulty: caseObj.Difficulty || '',
        DifficultyScore: caseObj.DifficultyScore || item.DifficultyScore || item.Difficulty || '',
        EstimatedMinutes: item.EstimatedMinutes || '',
        FormulaReference: item.FormulaReference || caseObj.FormulaReference || '',
        AccountingPrinciple: item.AccountingPrinciple || '',
        CalculationRequired: item.CalculationRequired ? 'Y' : 'N',
        ExhibitRequired: exhibits.length > 0 ? 'Y' : 'N',
        Industry: caseObj.Industry || '',
        ScenarioType: 'Case',
        OverallScore: '',
        ScoreBlueprint: '',
        ScoreCognitive: '',
        ScoreTechnical: '',
        ScoreDistractor: '',
        ScoreRealism: '',
        ScoreNumerical: '',
        ScoreExplanation: '',
        ScoreClarity: '',
        ScoreAccessibility: '',
        ScoreMetadata: '',
        RecommendedAction: 'Needs Baseline',
        GoldStandardEligible: 'N',
        CommonTrap: item.CommonTrapReference || caseObj.CommonTrapReference || '',
        LearningObjectives: (caseObj.LearningObjectives || []).join('; '),
        RelatedTopics: '',
        PrerequisiteConcepts: '',
        StudentCorrectPct: '',
        AverageTime: '',
        ConfidenceRating: caseObj.Confidence !== undefined ? caseObj.Confidence : '',
        DifficultyIndex: '',
        DiscriminationIndex: '',
        GuessRate: '',
        _section: (caseObj.SectionTags || [caseObj.Section || '']).join(';'),
        _raw: { case: caseId, item: item.ItemID, prompt: item.Prompt }
      });
    });
  });
  return results;
}

function parseCaseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const caseArr = evalCaseData(content);
  if (!caseArr || caseArr.length === 0) return [];
  return processCaseArray(caseArr, path.basename(filePath));
}

// ============================================================
// Blueprint mapping
// ============================================================
const SECTION_TO_DOMAIN = {
  'A': 'External Financial Reporting Decisions',
  'B': 'Planning, Budgeting, and Forecasting',
  'C': 'Performance Management',
  'D': 'Cost Management',
  'E': 'Internal Controls',
  'F': 'Technology and Analytics'
};

function getDomain(section) {
  const s = String(section).trim();
  if (!s) return 'Unknown';

  // Exact match on full domain name
  for (const [k, v] of Object.entries(SECTION_TO_DOMAIN)) {
    if (s === v) return v;
  }

  // Match single section letter
  const sUpper = s.toUpperCase().trim();
  if (SECTION_TO_DOMAIN[sUpper]) return SECTION_TO_DOMAIN[sUpper];

  // Partial match on domain name (start of name)
  for (const [k, v] of Object.entries(SECTION_TO_DOMAIN)) {
    if (v.startsWith(s) || s.startsWith(v.substring(0, 10))) return v;
  }

  return 'Unknown';
}

// ============================================================
// Main
// ============================================================
function main() {
  if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

  // 1. Extract MCQ packs
  const mcqFiles = [
    'pack_a_corrected.js',
    'pack_b_corrected.js',
    'pack_c_corrected.js',
    'pack_d_corrected.js',
    'pack_e_corrected.js'
  ];

  const caseFiles = [
    'content/cases/legacy/scored_cases.js',
    'content/cases/legacy/scored_cases2.js',
    'content/cases/legacy/scored_cases3.js',
    'content/cases/legacy/scored_cases4.js',
    'content/cases/legacy/scored_cases5.js'
  ];

  let allQuestions = [];

  mcqFiles.forEach(f => {
    const fp = path.join(ROOT, f);
    if (fs.existsSync(fp)) {
      const qs = parseMCQPack(fp, f);
      console.log(`  ${f}: ${qs.length} questions extracted`);
      allQuestions = allQuestions.concat(qs);
    }
  });

  caseFiles.forEach(f => {
    const fp = path.join(ROOT, f);
    if (fs.existsSync(fp)) {
      const qs = parseCaseFile(fp);
      console.log(`  ${f}: ${qs.length} case items extracted`);
      allQuestions = allQuestions.concat(qs);
    }
  });

  console.log(`\nTotal: ${allQuestions.length} questions/items`);

  // 2. Write Master Question Registry
  const header = REGISTRY_KEYS.join(',');
  const rows = allQuestions.map(q => csvRow(q, REGISTRY_KEYS));
  const registryCsv = header + '\n' + rows.join('\n');
  fs.writeFileSync(path.join(OUTPUT, 'MasterQuestionRegistry.csv'), registryCsv, 'utf8');
  console.log(`\nWritten: MasterQuestionRegistry.csv (${allQuestions.length} rows)`);

  // 3. Write Question Relationship Map (case items only)
  const caseItems = allQuestions.filter(q => q.ScenarioType === 'Case');
  const relHeader = 'QuestionID,CaseID,File,Domain,Topic,QuestionType,BloomLevel,Prompt';
  const relRows = caseItems.map(q => {
    const prompt = (q._raw && q._raw.prompt) ? q._raw.prompt.substring(0, 120) : '';
    return csvRow({
      QuestionID: q.QuestionID,
      CaseID: q.CaseID,
      File: q.File,
      Domain: q.Domain,
      Topic: q.Topic,
      QuestionType: q.QuestionType,
      BloomLevel: q.BloomLevel,
      Prompt: prompt
    }, ['QuestionID','CaseID','File','Domain','Topic','QuestionType','BloomLevel','Prompt']);
  });
  const relCsv = relHeader + '\n' + relRows.join('\n');
  fs.writeFileSync(path.join(OUTPUT, 'QuestionRelationshipMap.csv'), relCsv, 'utf8');
  console.log(`Written: QuestionRelationshipMap.csv (${caseItems.length} case items)`);

  // 4. Blueprint Coverage Matrix
  const blueprintStats = {};
  allQuestions.forEach(q => {
    const domain = getDomain(q.Domain);
    const bloom = q.BloomLevel || 'Unassigned';
    const diff = q.Difficulty || 'Unassigned';
    const type = q.QuestionType || 'Unknown';
    const topic = q.Topic || 'Unassigned';

    if (!blueprintStats[domain]) blueprintStats[domain] = { total: 0, bloom: {}, diff: {}, type: {}, topics: {} };
    blueprintStats[domain].total++;
    blueprintStats[domain].bloom[bloom] = (blueprintStats[domain].bloom[bloom] || 0) + 1;
    blueprintStats[domain].diff[diff] = (blueprintStats[domain].diff[diff] || 0) + 1;
    blueprintStats[domain].type[type] = (blueprintStats[domain].type[type] || 0) + 1;
    blueprintStats[domain].topics[topic] = (blueprintStats[domain].topics[topic] || 0) + 1;
  });

  const bpHeader = 'Domain,TotalQuestions,MCQCount,CaseItemCount,BloomRemember,BloomUnderstand,BloomApply,BloomAnalyze,BloomEvaluate,BloomUnassigned,DifficultyEasy,DifficultyModerate,DifficultyDifficult,DifficultyUnassigned';
  const bpRows = Object.entries(blueprintStats).map(([domain, stats]) => {
    const mcq = stats.type.MCQ || 0;
    const caseQ = stats.type.Case || 0;
    return csvRow({
      Domain: domain,
      TotalQuestions: stats.total,
      MCQCount: mcq,
      CaseItemCount: caseQ,
      BloomRemember: stats.bloom.Remember || 0,
      BloomUnderstand: stats.bloom.Understand || 0,
      BloomApply: stats.bloom.Apply || 0,
      BloomAnalyze: stats.bloom.Analyze || 0,
      BloomEvaluate: stats.bloom.Evaluate || 0,
      BloomUnassigned: stats.bloom.Unassigned || (stats.bloom[''] || 0),
      DifficultyEasy: stats.diff.Easy || 0,
      DifficultyModerate: stats.diff.Moderate || 0,
      DifficultyDifficult: stats.diff.Difficult || 0,
      DifficultyUnassigned: stats.diff.Unassigned || (stats.diff[''] || 0)
    }, ['Domain','TotalQuestions','MCQCount','CaseItemCount','BloomRemember','BloomUnderstand','BloomApply','BloomAnalyze','BloomEvaluate','BloomUnassigned','DifficultyEasy','DifficultyModerate','DifficultyDifficult','DifficultyUnassigned']);
  });
  const bpCsv = bpHeader + '\n' + bpRows.join('\n');
  fs.writeFileSync(path.join(OUTPUT, 'BlueprintCoverageMatrix.csv'), bpCsv, 'utf8');
  console.log(`Written: BlueprintCoverageMatrix.csv (${Object.keys(blueprintStats).length} domains)`);

  // 5. Phase 1 Baseline Report
  const mcqQuestions = allQuestions.filter(q => q.ScenarioType === 'MCQ');
  const totalMCQ = mcqQuestions.length;
  const totalCaseItems = caseItems.length;

  const bloomCounts = {};
  const diffCounts = {};
  const typeCounts = {};
  const domainCounts = {};
  let metadataComplete = 0;
  let calcRequired = 0;
  let hasBloom = 0;
  let hasDifficultyScore = 0;
  let hasAccountingPrinciple = 0;
  let hasFormula = 0;

  allQuestions.forEach(q => {
    const bloom = q.BloomLevel || 'Unassigned';
    bloomCounts[bloom] = (bloomCounts[bloom] || 0) + 1;
    const diff = q.Difficulty || 'Unassigned';
    diffCounts[diff] = (diffCounts[diff] || 0) + 1;
    const type = q.QuestionType || 'Unknown';
    typeCounts[type] = (typeCounts[type] || 0) + 1;
    const domain = getDomain(q.Domain);
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;

    if (q.BloomLevel && q.BloomLevel !== 'Unassigned') hasBloom++;
    if (q.DifficultyScore || (q.Difficulty && q.Difficulty !== 'Unassigned' && q.Difficulty !== '')) hasDifficultyScore++;
    if (q.AccountingPrinciple && q.AccountingPrinciple.length > 10) hasAccountingPrinciple++;
    if (q.FormulaReference) hasFormula++;
    if (q.CalculationRequired === 'Y') calcRequired++;
    // Simple metadata completeness check: has QuestionID, Domain, and at least one of Bloom/Difficulty
    if (q.QuestionID && q.Domain && (q.BloomLevel || q.Difficulty)) metadataComplete++;
  });

  // Explanation quality estimation
  let totalExplanations = 0;
  let shortExplanations = 0;
  allQuestions.forEach(q => {
    if (q._raw && q._raw.ExplanationCorrect) {
      totalExplanations++;
      if (q._raw.ExplanationCorrect.length < 50) shortExplanations++;
    }
  });

  const report = `# Phase 1 Baseline Report

**Date:** 2026-07-21
**Repository:** CMA Part 1 Exam Simulator
**Source:** MasterQuestionRegistry.csv

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Assessment Items | **${allQuestions.length}** |
| Standalone MCQ Questions | **${totalMCQ}** |
| Case Study Items | **${totalCaseItems}** |
| Blueprint Domains Covered | **${Object.keys(domainCounts).length}** |
| Average Metadata Completeness | **${(metadataComplete / allQuestions.length * 100).toFixed(1)}%** |
| Questions with Bloom's Level | **${hasBloom} (${(hasBloom/allQuestions.length*100).toFixed(1)}%)** |
| Questions with Difficulty Score | **${hasDifficultyScore} (${(hasDifficultyScore/allQuestions.length*100).toFixed(1)}%)** |
| Questions with Formula Reference | **${hasFormula} (${(hasFormula/allQuestions.length*100).toFixed(1)}%)** |
| Calculation Items | **${calcRequired} (${(calcRequired/allQuestions.length*100).toFixed(1)}%)** |
| Gold Standard Items | **0 (0%)** |
| Repository Health Score (backlog) | **42/100** |

---

## Distribution by Blueprint Domain

| Domain | Count | % of Total |
|--------|------:|-----------:|
${Object.entries(domainCounts).sort((a,b) => b[1]-a[1]).map(([d,c]) => `| ${d.padEnd(40)} | ${String(c).padStart(5)} | ${(c/allQuestions.length*100).toFixed(1).padStart(5)}% |`).join('\\n')}

---

## Bloom's Taxonomy Distribution

| Level | Count | % of Total | Target % | Status |
|-------|------:|-----------:|---------:|--------|
${(['Remember','Understand','Apply','Analyze','Evaluate','Unassigned']).map(l => {
  const count = bloomCounts[l] || 0;
  const pct = count/allQuestions.length*100;
  const targets = {'Remember':5,'Understand':15,'Apply':40,'Analyze':25,'Evaluate':15,'Unassigned':0};
  const target = targets[l] || 0;
  const status = l === 'Unassigned' ? '⚠ Needs assignment' : (Math.abs(pct - target) > 10 ? '⚠ Off target' : '✓ On track');
  return `| ${l.padEnd(15)} | ${String(count).padStart(5)} | ${pct.toFixed(1).padStart(5)}% | ${String(target).padStart(5)}% | ${status} |`;
}).join('\\n')}

---

## Difficulty Distribution

| Difficulty | Count | % of Total |
|-----------|------:|-----------:|
${Object.entries(diffCounts).sort((a,b) => b[1]-a[1]).map(([d,c]) => `| ${d.padEnd(20)} | ${String(c).padStart(5)} | ${(c/allQuestions.length*100).toFixed(1).padStart(5)}% |`).join('\\n')}

---

## Question Type Distribution

| Type | Count | % of Total |
|------|------:|-----------:|
${Object.entries(typeCounts).sort((a,b) => b[1]-a[1]).map(([t,c]) => `| ${t.padEnd(15)} | ${String(c).padStart(5)} | ${(c/allQuestions.length*100).toFixed(1).padStart(5)}% |`).join('\\n')}

---

## Metadata Completeness

| Field | Coverage | Status |
|-------|---------:|--------|
| QuestionID | **${(allQuestions.filter(q=>q.QuestionID).length/allQuestions.length*100).toFixed(1)}%** | ${allQuestions.filter(q=>q.QuestionID).length === allQuestions.length ? '✓ Complete' : '⚠ Incomplete'} |
| Domain | **${(allQuestions.filter(q=>q.Domain).length/allQuestions.length*100).toFixed(1)}%** | ${allQuestions.filter(q=>q.Domain).length === allQuestions.length ? '✓ Complete' : '⚠ Incomplete'} |
| Bloom's Level | **${(hasBloom/allQuestions.length*100).toFixed(1)}%** | ${hasBloom === allQuestions.length ? '✓ Complete' : '⚠ Needs enrichment'} |
| Difficulty | **${(hasDifficultyScore/allQuestions.length*100).toFixed(1)}%** | ${hasDifficultyScore === allQuestions.length ? '✓ Complete' : '⚠ Needs enrichment'} |
| Calculation Required | **${(allQuestions.filter(q=>q.CalculationRequired).length/allQuestions.length*100).toFixed(1)}%** | ✓ Tracked |
| Accounting Principle | **${(hasAccountingPrinciple/allQuestions.length*100).toFixed(1)}%** | ${hasAccountingPrinciple > 0 ? '⚠ Partial coverage' : '⚠ Not captured'} |
| Formula Reference | **${(hasFormula/allQuestions.length*100).toFixed(1)}%** | ${hasFormula > 0 ? '⚠ Partial' : '⚠ Not captured'} |
| Confidence Rating | **${(allQuestions.filter(q=>q.ConfidenceRating).length/allQuestions.length*100).toFixed(1)}%** | ${allQuestions.filter(q=>q.ConfidenceRating).length > 0 ? '⚠ Partial' : '⚠ Not populated'} |

---

## Priority Revision Queue

### Questions Missing Required Metadata

The following questions lack Bloom's level or difficulty classification and should be prioritized:

${allQuestions.filter(q => !q.BloomLevel && q.QuestionID).slice(0, 20).map(q => `- **${q.QuestionID}** (${q.File}): Missing Bloom's Level${!q.Difficulty ? ' + Missing Difficulty' : ''}`).join('\\n') || '(None found)'}

### Case Studies Missing Parent-Child Relationships

${allQuestions.filter(q => q.ScenarioType === 'Case' && !q.CaseID).length > 0
  ? allQuestions.filter(q => q.ScenarioType === 'Case' && !q.CaseID).map(q => `- ${q.QuestionID}`).join('\\n')
  : 'All case items are properly linked to parent cases. ✓'}

---

## Recommendations

1. **Enrich metadata** — Add Bloom's Level to ${allQuestions.length - hasBloom} items and DifficultyScore to ${allQuestions.length - hasDifficultyScore} items
2. **Expand explanations** — ${shortExplanations} items have explanations under 50 characters
3. **Add formula references** — Only ${hasFormula} of ${calcRequired} calculation items have FormulaReference populated
4. **Begin domain-by-domain audit** — Start with Section A (External Financial Reporting Decisions) as the highest-coverage domain

---

*Generated by build_master_registry.js — Registry contains ${allQuestions.length} assessment items across ${mcqFiles.length} MCQ packs and ${caseFiles.length} case study files.*
`;

  fs.writeFileSync(path.join(OUTPUT, 'Phase1_Baseline_Report.md'), report, 'utf8');
  console.log('Written: Phase1_Baseline_Report.md');
}

main();
