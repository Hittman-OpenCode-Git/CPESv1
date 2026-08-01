// S303 — Explanation Quality Census & Instructional Value Audit
// Read-only analysis across all 5 pack files and 5 scored_cases files
// Produces all agent deliverables in one consolidated run

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPORT_DIR = path.join(__dirname, '..', 'reports');

// ─── Parse helpers ─────────────────────────────────────────────────

function parsePackFile(filepath) {
  let src = fs.readFileSync(filepath, 'utf8');
  // Remove BOM if present
  if (src.charCodeAt(0) === 0xFEFF) src = src.slice(1);
  src = src.trim();
  // Strip any leading "const VAR = " declaration
  if (src.startsWith('const ')) {
    const eqIdx = src.indexOf('=');
    if (eqIdx > 0) src = src.slice(eqIdx + 1).trim();
  }
  if (src.endsWith(';')) src = src.slice(0, -1);
  const fn = new Function('return (' + src + ')');
  return fn();
}

function parseScoredCases(filepath) {
  const items = [];
  const src = fs.readFileSync(filepath, 'utf8');

  // Each case file has multiple const arrays. Parse each, then drill into Items[] within each case.
  const arrayPattern = /const\s+(\w+)\s*=\s*\[/g;
  let match;
  while ((match = arrayPattern.exec(src)) !== null) {
    const name = match[1];
    const start = match.index + match[0].length - 1;
    let depth = 1;
    let pos = start + 1;
    let inString = false;
    let stringChar = '';
    while (pos < src.length && depth > 0) {
      const c = src[pos];
      if (inString) {
        if (c === '\\') { pos += 2; continue; }
        if (c === stringChar) inString = false;
      } else {
        if (c === '"' || c === "'" || c === '`') { inString = true; stringChar = c; }
        else if (c === '[') depth++;
        else if (c === ']') depth--;
      }
      pos++;
    }
    if (depth === 0) {
      try {
        const arrStr = src.slice(start, pos);
        const arr = eval(arrStr);
        arr.forEach((caseObj, caseIdx) => {
          if (!caseObj || typeof caseObj !== 'object') return;

          // Drill into Items[] or items[] arrays within the case
          const itemArrays = caseObj.Items || caseObj.items || [];
          itemArrays.forEach((item, itemIdx) => {
            if (item && typeof item === 'object') {
              items.push({
                ...item,
                _source: path.basename(filepath),
                _array: name,
                _caseIdx: caseIdx,
                _itemIdx: itemIdx,
                _type: 'case',
                CaseID: caseObj.CaseID || caseObj.caseId || '',
                Section: caseObj.Section || caseObj.section || '',
                CognitiveLevel: item.CognitiveLevel || caseObj.CognitiveLevel || '?',
                Difficulty: item.Difficulty || caseObj.Difficulty || '?',
                ProductionStatus: item.ProductionStatus || caseObj.ProductionStatus || item.question_state || caseObj.question_state || '?',
                question_state: item.question_state || caseObj.question_state || item.ProductionStatus || caseObj.ProductionStatus || '?'
              });
            }
          });
        });
      } catch (e) {
        // skip
      }
    }
  }
  return items;
}

// ─── Analysis functions ────────────────────────────────────────────

function analyzeText(text) {
  if (!text || typeof text !== 'string') {
    return { chars: 0, words: 0, sentences: 0, isEmpty: true, isBoilerplate: false };
  }
  const trimmed = text.trim();
  const chars = trimmed.length;
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length : 0;
  const isEmpty = chars === 0;

  // DL-013 boilerplate detection
  const boilerplatePatterns = [
    /ExplanationWrong[A-D]\s*for\s*Choice\s*[A-D]/i,
    /^Explanation for Choice [A-D]/i,
    /\(Choice [A-D]\)/,
    /^This is the wrong answer because/i,
    /^Choice [A-D] is incorrect/i,
    /^[A-D] is not correct/i,
    /^Option [A-D] is wrong/i,
    /template|placeholder|TODO|FIXME/i
  ];
  const isBoilerplate = boilerplatePatterns.some(p => p.test(trimmed));

  return { chars, words, sentences, isEmpty, isBoilerplate };
}

function detectStandards(text) {
  if (!text) return [];
  const found = [];
  const patterns = [
    { name: 'ASC',    regex: /\bASC\s*\d/g },
    { name: 'COSO',   regex: /\bCOSO\b/gi },
    { name: 'IFRS',   regex: /\bIFRS\b/gi },
    { name: 'GAAP',   regex: /\bGAAP\b/gi },
    { name: 'FASB',   regex: /\bFASB\b/gi },
    { name: 'IIA',    regex: /\bIIA\b/gi },
    { name: 'SOX',    regex: /\bSOX\b|Sarbanes-Oxley/gi },
    { name: 'IMA',    regex: /\bIMA\b/gi },
    { name: 'CMA',    regex: /\bCMA\b/gi },
    { name: 'IRS',    regex: /\bIRS\b|Internal Revenue Code/gi },
    { name: 'SEC',    regex: /\bSEC\b/gi },
    { name: 'AICPA',  regex: /\bAICPA\b/gi },
    { name: 'PCAOB',  regex: /\bPCAOB\b/gi },
    { name: 'ERM',    regex: /\bERM\b/gi },
    { name: 'NIST',   regex: /\bNIST\b/gi },
    { name: 'GDPR',   regex: /\bGDPR\b/gi },
  ];
  for (const p of patterns) {
    if (p.regex.test(text)) found.push(p.name);
  }
  return found;
}

function detectCalculations(text) {
  if (!text) return { hasCalc: false, formulaCount: 0, dollarCount: 0, pctCount: 0, stepCount: 0 };
  const formulaMatches = text.match(/[=÷×+\-*/]/g);
  const dollarMatches = text.match(/\$\d[\d,.]*/g);
  const pctMatches = text.match(/\d+[%％]/g);
  const stepPatterns = [
    /\b(?:Step|First|Second|Third|Fourth|Fifth|Next|Then|Finally)\b/gi,
    /\b(?:calculate|compute|determine|derive|solve)\b/gi,
    /\b(?:formula|equation|computation)\b/gi
  ];
  const stepMatch = stepPatterns.reduce((sum, p) => sum + (text.match(p) || []).length, 0);
  return {
    hasCalc: (formulaMatches || []).length >= 2 || (dollarMatches || []).length >= 2,
    formulaCount: (formulaMatches || []).length,
    dollarCount: (dollarMatches || []).length,
    pctCount: (pctMatches || []).length,
    stepCount: stepMatch
  };
}

function detectInstructionalQuality(text, calcInfo) {
  if (!text || text.trim().length < 20) return { score: 0, grade: 'F', hasRationale: false, hasCommonTrap: false, hasBusinessContext: false };

  let score = 0;
  const hasRationale = /\b(?:because|since|as a result|therefore|consequently|this is why)\b/i.test(text);
  const hasCommonTrap = /\b(?:common (?:mistake|error|trap|pitfall)|watch out|be careful|don't confuse|avoid|beware|note that)\b/i.test(text);
  const hasBusinessContext = /\b(?:in practice|real.?world|business|company|firm|enterprise|organization|industry|market)\b/i.test(text);

  if (text.length >= 200) score += 1;
  if (text.length >= 500) score += 1;
  if (text.length >= 800) score += 1;
  if (hasRationale) score += 1;
  if (hasCommonTrap) score += 1;
  if (hasBusinessContext) score += 1;
  if (calcInfo && calcInfo.stepCount >= 2) score += 1;

  const capped = Math.min(score, 7);
  let grade;
  if (capped >= 6) grade = 'A';
  else if (capped >= 4) grade = 'B';
  else if (capped >= 3) grade = 'C';
  else if (capped >= 2) grade = 'D';
  else grade = 'F';

  return { score: capped, grade, hasRationale, hasCommonTrap, hasBusinessContext };
}

function detectExplanationStructure(text) {
  if (!text || text.trim().length < 50) {
    return { hasIntro: false, hasBody: false, hasConclusion: false, hasDistractorIntegration: false, format: 'minimal' };
  }
  const lines = text.split('\n').filter(l => l.trim());
  const hasIntro = lines.length >= 2 && lines[0].length < 200;
  const hasBody = lines.length >= 3;
  const hasConclusion = /\b(?:therefore|thus|in conclusion|in summary|overall|consequently)\b/i.test(lines[lines.length - 1] || '');
  const hasDistractorIntegration = /\b(?:Choice|Option)\s+[A-D]\b/i.test(text);

  let format = 'minimal';
  if (lines.length >= 4 && hasIntro && hasBody) format = 'paragraph';
  if (lines.length >= 5 && hasConclusion) format = 'structured';
  if (hasDistractorIntegration && lines.length >= 4) format = 'distractor-integrated';

  return { hasIntro, hasBody, hasConclusion, hasDistractorIntegration, format };
}

function classifyExplanation(text, calcInfo, standards, blueprintSection) {
  if (!text || text.trim().length === 0) return 'MISSING';
  if (text.trim().length < 50) return 'PLACEHOLDER';
  if (calcInfo && calcInfo.isBoilerplate) return 'BOILERPLATE';
  if (text.trim().length < 150) return 'THIN';
  if (text.trim().length >= 150 && text.trim().length < 400) return 'ADEQUATE';
  if (text.trim().length >= 400 && text.trim().length < 700) return 'GOOD';
  return 'EXCELLENT';
}

// ─── Main extraction ───────────────────────────────────────────────

function extractMCQExplanationData(items, packName) {
  const results = [];
  for (const item of items) {
    const qid = item.QuestionID || item.ItemID || `unknown-${results.length}`;
    const section = item.Section || (qid.match(/-([A-F])-/) || [,'?'])[1];
    const domainMap = { A:'A - External Financial Reporting', B:'B - Planning & Budgeting',
      C:'C - Performance Management', D:'D - Cost Management',
      E:'E - Internal Controls', F:'F - Technology & Analytics' };
    const domain = domainMap[section] || 'Unknown';
    const cc = item.CorrectChoice || item.Correct || '';
    const state = item.question_state || item.ProductionStatus || 'Unknown';
    const diff = item.Difficulty || '?';
    const cog = item.CognitiveLevel || '?';
    const type = item.ItemType || (item.Choices ? 'MCQ-select' : 'MCQ-other');

    const ec = item.ExplanationCorrect || '';
    const ecAnalysis = analyzeText(ec);
    const ecCalc = detectCalculations(ec);
    const ecStandards = detectStandards(ec);
    const ecQuality = detectInstructionalQuality(ec, ecCalc);
    const ecStructure = detectExplanationStructure(ec);
    const ecClass = classifyExplanation(ec, ecAnalysis, ecStandards, section);

    const ewFields = [];
    const choiceLetters = item.Choices ? (Array.isArray(item.Choices) ? 
      item.Choices.map((c, i) => String.fromCharCode(65 + i)) : 
      Object.keys(item.Choices).sort()) : [];
    if (choiceLetters.length > 0) {
      choiceLetters.forEach(letter => {
        const ewKey = 'ExplanationWrong' + letter;
        const ewText = item[ewKey] || '';
        const ewAnalysis = analyzeText(ewText);
        const ewCalc = detectCalculations(ewText);
        const ewStandards = detectStandards(ewText);
        const ewQuality = detectInstructionalQuality(ewText, ewCalc);
        const ewStructure = detectExplanationStructure(ewText);
        const isCC = letter === cc;
        const ewClass = classifyExplanation(ewText, ewAnalysis, ewStandards, section);
        ewFields.push({
          letter, text: ewText, isCC,
          analysis: ewAnalysis, calc: ewCalc, standards: ewStandards,
          quality: ewQuality, structure: ewStructure, classification: ewClass
        });
      });
    }

    results.push({
      qid, pack: packName, section, domain, state, difficulty: diff,
      cognitiveLevel: cog, type, correctChoice: cc,
      explanationCorrect: { text: ec, analysis: ecAnalysis, calc: ecCalc, standards: ecStandards,
        quality: ecQuality, structure: ecStructure, classification: ecClass },
      explanationWrong: ewFields
    });
  }
  return results;
}

function extractCaseExplanationData(items, sourceName) {
  const results = [];
  for (const item of items) {
    const qid = item.QuestionID || item.ItemID || item._source + '-' + item._idx;
    const state = item.question_state || item.ProductionStatus || 'Unknown';
    const diff = item.Difficulty || '?';
    const cog = item.CognitiveLevel || '?';
    const section = item.Section || (item.CaseID ? (item.CaseID.match(/[A-F]\d?$/) || ['','?'])[0] : '?');
    const domainMap = { A:'A - External Financial Reporting', B:'B - Planning & Budgeting',
      C:'C - Performance Management', D:'D - Cost Management',
      E:'E - Internal Controls', F:'F - Technology & Analytics' };
    const domain = section ? (domainMap[section[0]] || section) : 'Unknown';
    const type = item.ItemType || (item.Prompt ? 'case-prompt' : 'case-item');
    const cc = item.CorrectChoice || item.Correct;

    const ec = item.ExplanationCorrect || item.Explanation || '';
    const ecAnalysis = analyzeText(ec);
    const ecCalc = detectCalculations(ec);
    const ecStandards = detectStandards(ec);
    const ecQuality = detectInstructionalQuality(ec, ecCalc);
    const ecStructure = detectExplanationStructure(ec);
    const ecClass = classifyExplanation(ec, ecAnalysis, ecStandards, section);

    const ewFields = [];
    const choiceLetters = ['A','B','C','D'];
    choiceLetters.forEach(letter => {
      const ewKey = 'ExplanationWrong' + letter;
      const ewText = (item[ewKey] !== undefined) ? (item[ewKey] || '') : '';
      const ewAnalysis = analyzeText(ewText);
      const ewCalc = detectCalculations(ewText);
      const ewStandards = detectStandards(ewText);
      const ewQuality = detectInstructionalQuality(ewText, ewCalc);
      const ewStructure = detectExplanationStructure(ewText);
      const isCC = String(cc) === letter;
      const ewClass = classifyExplanation(ewText, ewAnalysis, ewStandards, section);
      ewFields.push({
        letter, text: ewText, isCC,
        analysis: ewAnalysis, calc: ewCalc, standards: ewStandards,
        quality: ewQuality, structure: ewStructure, classification: ewClass
      });
    });

    results.push({
      qid, pack: sourceName, section, domain, state, difficulty: diff,
      cognitiveLevel: cog, type, correctChoice: cc,
      explanationCorrect: { text: ec, analysis: ecAnalysis, calc: ecCalc, standards: ecStandards,
        quality: ecQuality, structure: ecStructure, classification: ecClass },
      explanationWrong: ewFields
    });
  }
  return results;
}

// ─── Aggregate analysis ────────────────────────────────────────────

function computeCensus(allData) {
  const mcq = allData.filter(d => d.type.startsWith('MCQ'));
  const cases = allData.filter(d => !d.type.startsWith('MCQ'));

  const ecTotal = allData.length;
  const ecPresent = allData.filter(d => d.explanationCorrect.text && d.explanationCorrect.text.trim().length > 0).length;
  const ecMissing = ecTotal - ecPresent;
  const ecPlaceholder = allData.filter(d => d.explanationCorrect.classification === 'PLACEHOLDER').length;
  const ecBoilerplate = allData.filter(d => d.explanationCorrect.analysis.isBoilerplate).length;
  const ecThin = allData.filter(d => d.explanationCorrect.classification === 'THIN').length;
  const ecAdequate = allData.filter(d => d.explanationCorrect.classification === 'ADEQUATE').length;
  const ecGood = allData.filter(d => d.explanationCorrect.classification === 'GOOD').length;
  const ecExcellent = allData.filter(d => d.explanationCorrect.classification === 'EXCELLENT').length;

  // EW totals
  const allEW = [];
  allData.forEach(d => d.explanationWrong.forEach(ew => allEW.push({ ...ew, qid: d.qid, pack: d.pack })));
  const ewNonCC = allEW.filter(ew => !ew.isCC);
  const ewCC = allEW.filter(ew => ew.isCC);

  const ewTotal = allEW.length;
  const ewPresent = allEW.filter(ew => ew.text && ew.text.trim().length > 0).length;
  const ewEmpty = ewTotal - ewPresent;
  const ewBoilerplate = allEW.filter(ew => ew.analysis.isBoilerplate).length;

  const ewNonCCTotal = ewNonCC.length;
  const ewNonCCPresent = ewNonCC.filter(ew => ew.text && ew.text.trim().length > 0).length;
  const ewNonCCEmpty = ewNonCCTotal - ewNonCCPresent;

  const ewCCTotal = ewCC.length;
  const ewCCPresent = ewCC.filter(ew => ew.text && ew.text.trim().length > 0).length; // DL-008!

  // Length stats
  const ecLengths = allData.map(d => d.explanationCorrect.analysis.chars).filter(c => c > 0);
  const avgECLength = ecLengths.length > 0 ? Math.round(ecLengths.reduce((a,b)=>a+b,0) / ecLengths.length) : 0;
  const medianECLength = ecLengths.length > 0 ? ecLengths.sort((a,b)=>a-b)[Math.floor(ecLengths.length/2)] : 0;

  // Standards coverage
  const allStandards = {};
  allData.forEach(d => {
    d.explanationCorrect.standards.forEach(s => { allStandards[s] = (allStandards[s]||0) + 1; });
    d.explanationWrong.forEach(ew => {
      if (!ew.isCC) ew.standards.forEach(s => { allStandards[s] = (allStandards[s]||0) + 1; });
    });
  });

  // ECS classification distribution
  const ecsGrades = { A:0, B:0, C:0, D:0, F:0 };
  allData.forEach(d => { ecsGrades[d.explanationCorrect.quality.grade]++; });

  // By domain
  const domainStats = {};
  allData.forEach(d => {
    const dom = d.domain;
    if (!domainStats[dom]) domainStats[dom] = { total:0, ecPresent:0, ecAvgLen:0, ecGradeA:0, ecGradeF:0, lengths:[] };
    domainStats[dom].total++;
    if (d.explanationCorrect.text && d.explanationCorrect.text.trim().length > 0) domainStats[dom].ecPresent++;
    domainStats[dom].lengths.push(d.explanationCorrect.analysis.chars);
    if (d.explanationCorrect.quality.grade === 'A') domainStats[dom].ecGradeA++;
    if (d.explanationCorrect.quality.grade === 'F') domainStats[dom].ecGradeF++;
  });
  Object.keys(domainStats).forEach(dom => {
    const s = domainStats[dom];
    s.ecAvgLen = s.lengths.length > 0 ? Math.round(s.lengths.reduce((a,b)=>a+b,0)/s.lengths.length) : 0;
    delete s.lengths;
  });

  // By pack
  const packStats = {};
  allData.forEach(d => {
    const pk = d.pack;
    if (!packStats[pk]) packStats[pk] = { total:0, ecPresent:0, ecAvgLen:0, ewNonCCPresent:0, ewNonCCTotal:0,
      ecGrades: {A:0,B:0,C:0,D:0,F:0}, lengths:[] };
    packStats[pk].total++;
    if (d.explanationCorrect.text && d.explanationCorrect.text.trim().length > 0) packStats[pk].ecPresent++;
    packStats[pk].lengths.push(d.explanationCorrect.analysis.chars);
    packStats[pk].ecGrades[d.explanationCorrect.quality.grade]++;
    d.explanationWrong.forEach(ew => {
      if (!ew.isCC) {
        packStats[pk].ewNonCCTotal++;
        if (ew.text && ew.text.trim().length > 0) packStats[pk].ewNonCCPresent++;
      }
    });
  });
  Object.keys(packStats).forEach(pk => {
    const s = packStats[pk];
    s.ecAvgLen = s.lengths.length > 0 ? Math.round(s.lengths.reduce((a,b)=>a+b,0)/s.lengths.length) : 0;
    s.ecFillRate = s.total > 0 ? (s.ecPresent / s.total * 100).toFixed(1) : '0.0';
    s.ewFillRate = s.ewNonCCTotal > 0 ? (s.ewNonCCPresent / s.ewNonCCTotal * 100).toFixed(1) : '0.0';
    delete s.lengths;
  });

  // Calculation stats
  const calcStats = { hasCalc: 0, total: allData.length, hasFormula: 0, hasStepByStep: 0 };
  allData.forEach(d => {
    if (d.explanationCorrect.calc.hasCalc) calcStats.hasCalc++;
    if (d.explanationCorrect.calc.formulaCount >= 2) calcStats.hasFormula++;
    if (d.explanationCorrect.calc.stepCount >= 2) calcStats.hasStepByStep++;
  });

  return {
    totalItems: ecTotal,
    mcqCount: mcq.length,
    caseCount: cases.length,
    ecPresent, ecMissing, ecPlaceholder, ecBoilerplate, ecThin, ecAdequate, ecGood, ecExcellent,
    ecAvgLength: avgECLength, ecMedianLength: medianECLength,
    ewTotal, ewPresent, ewEmpty, ewBoilerplate,
    ewNonCCTotal, ewNonCCPresent, ewNonCCEmpty,
    ewCCTotal, ewCCPresent, // DL-008
    domainStats, packStats,
    allStandards,
    ecsGrades,
    instructionalQualityGradeA: ecsGrades.A,
    instructionalQualityGradeF: ecsGrades.F,
    calcStats
  };
}

// ─── Rewrite candidates ────────────────────────────────────────────

function identifyRewriteCandidates(allData) {
  const candidates = [];
  allData.forEach(d => {
    let priority = null;
    let reason = '';

    // EC analysis
    const ec = d.explanationCorrect;
    if (ec.classification === 'MISSING') { priority = 'P0-CRITICAL'; reason = 'Missing ExplanationCorrect'; }
    else if (ec.classification === 'PLACEHOLDER') { priority = 'P1-HIGH'; reason = 'Placeholder ExplanationCorrect (<50 chars)'; }
    else if (ec.classification === 'THIN') { priority = 'P2-MEDIUM'; reason = 'Thin ExplanationCorrect (50-150 chars)'; }
    else if (ec.quality.grade === 'F') { priority = 'P2-MEDIUM'; reason = 'Instructional quality grade F'; }
    else if (ec.quality.grade === 'D') { priority = 'P3-LOW'; reason = 'Instructional quality grade D'; }

    // EW analysis
    const emptyEW = d.explanationWrong.filter(ew => !ew.isCC && ew.text.trim().length === 0);
    if (emptyEW.length >= 2 && !priority) { priority = 'P1-HIGH'; reason = `${emptyEW.length} empty non-CC distractor slots`; }
    else if (emptyEW.length === 1 && !priority) { priority = 'P2-MEDIUM'; reason = '1 empty non-CC distractor slot'; }

    if (priority) {
      candidates.push({
        qid: d.qid, pack: d.pack, section: d.section, domain: d.domain,
        state: d.state, difficulty: d.difficulty, cognitiveLevel: d.cognitiveLevel,
        type: d.type,
        priority, reason,
        ecChars: ec.analysis.chars, ecGrade: ec.quality.grade,
        emptyEWCount: d.explanationWrong.filter(ew => !ew.isCC && ew.text.trim().length === 0).length,
        totalEWCount: d.explanationWrong.filter(ew => !ew.isCC).length
      });
    }
  });

  // Sort by priority then EC length
  const prioOrder = { 'P0-CRITICAL': 0, 'P1-HIGH': 1, 'P2-MEDIUM': 2, 'P3-LOW': 3 };
  candidates.sort((a, b) => {
    if (prioOrder[a.priority] !== prioOrder[b.priority]) return prioOrder[a.priority] - prioOrder[b.priority];
    return a.ecChars - b.ecChars;
  });

  return candidates;
}

// ─── EQS Model (Explanation Quality Score) ─────────────────────────

function computeEQS(allData) {
  // Weighted dimensions: instructional value 25%, reasoning depth 20%, calculation support 15%,
  // standards integration 15%, learning effectiveness 15%, structure 10%
  const scored = allData.map(d => {
    const ec = d.explanationCorrect;
    let instructional = 0;
    let reasoning = 0;
    let calcSupport = 0;
    let standards = 0;
    let learning = 0;
    let structure = 0;

    // Instructional value (0-25)
    if (ec.quality.grade === 'A') instructional = 25;
    else if (ec.quality.grade === 'B') instructional = 20;
    else if (ec.quality.grade === 'C') instructional = 15;
    else if (ec.quality.grade === 'D') instructional = 8;
    else if (ec.text && ec.text.trim().length > 0) instructional = 4;

    // Reasoning depth (0-20)
    if (ec.analysis.chars >= 800) reasoning = 20;
    else if (ec.analysis.chars >= 500) reasoning = 16;
    else if (ec.analysis.chars >= 300) reasoning = 12;
    else if (ec.analysis.chars >= 150) reasoning = 8;
    else if (ec.analysis.chars >= 50) reasoning = 4;

    // Calc support (0-15)
    if (ec.calc.hasCalc && ec.calc.stepCount >= 3) calcSupport = 15;
    else if (ec.calc.hasCalc && ec.calc.stepCount >= 2) calcSupport = 12;
    else if (ec.calc.hasCalc) calcSupport = 8;
    else if (d.difficulty === 'Difficult' || d.difficulty === '4') calcSupport = 5;

    // Standards integration (0-15)
    if (ec.standards.length >= 3) standards = 15;
    else if (ec.standards.length >= 2) standards = 12;
    else if (ec.standards.length >= 1) standards = 8;
    else if (ec.analysis.words >= 50) standards = 3;

    // Learning effectiveness (0-15)
    if (ec.quality.hasRationale && ec.quality.hasCommonTrap) learning = 15;
    else if (ec.quality.hasRationale) learning = 10;
    else if (ec.quality.hasBusinessContext) learning = 8;
    else if (ec.text && ec.text.trim().length >= 100) learning = 5;
    else if (ec.text && ec.text.trim().length > 0) learning = 2;

    // Structure (0-10)
    if (ec.structure.format === 'distractor-integrated') structure = 10;
    else if (ec.structure.format === 'structured') structure = 8;
    else if (ec.structure.format === 'paragraph') structure = 6;
    else if (ec.structure.format === 'minimal' && ec.text.trim().length > 0) structure = 3;

    const eqs = instructional + reasoning + calcSupport + standards + learning + structure;
    let eqsGrade;
    if (eqs >= 85) eqsGrade = 'A';
    else if (eqs >= 70) eqsGrade = 'B';
    else if (eqs >= 55) eqsGrade = 'C';
    else if (eqs >= 35) eqsGrade = 'D';
    else eqsGrade = 'F';

    return { ...d, eqs, eqsGrade, eqsComponents: { instructional, reasoning, calcSupport, standards, learning, structure } };
  });

  return scored;
}

// ─── Learning value matrix ─────────────────────────────────────────

function computeLearningValue(allData) {
  const matrix = allData.map(d => {
    const ec = d.explanationCorrect;
    let instructionalUtility = 0;
    let coachingEffectiveness = 0;
    let examPrepValue = 0;
    let transferLearning = 0;

    if (ec.analysis.chars >= 800) instructionalUtility = 5;
    else if (ec.analysis.chars >= 500) instructionalUtility = 4;
    else if (ec.analysis.chars >= 300) instructionalUtility = 3;
    else if (ec.analysis.chars >= 100) instructionalUtility = 2;
    else if (ec.text && ec.text.trim().length > 0) instructionalUtility = 1;

    if (ec.quality.hasRationale && ec.quality.hasCommonTrap) coachingEffectiveness = 5;
    else if (ec.quality.hasRationale) coachingEffectiveness = 3;
    else if (ec.quality.hasBusinessContext) coachingEffectiveness = 2;
    else if (ec.text && ec.text.trim().length > 0) coachingEffectiveness = 1;

    if (ec.standards.length >= 2 && ec.calc.hasCalc) examPrepValue = 5;
    else if (ec.standards.length >= 1 || ec.calc.hasCalc) examPrepValue = 3;
    else if (ec.analysis.chars >= 200) examPrepValue = 2;
    else if (ec.text && ec.text.trim().length > 0) examPrepValue = 1;

    if (ec.quality.hasBusinessContext && ec.standards.length >= 1) transferLearning = 5;
    else if (ec.quality.hasBusinessContext || ec.standards.length >= 1) transferLearning = 3;
    else if (ec.analysis.chars >= 300) transferLearning = 2;
    else if (ec.text && ec.text.trim().length > 0) transferLearning = 1;

    const lvTotal = instructionalUtility + coachingEffectiveness + examPrepValue + transferLearning;
    let lvGrade;
    if (lvTotal >= 16) lvGrade = 'A';
    else if (lvTotal >= 12) lvGrade = 'B';
    else if (lvTotal >= 8) lvGrade = 'C';
    else if (lvTotal >= 4) lvGrade = 'D';
    else lvGrade = 'F';

    return { ...d, learningValue: { instructionalUtility, coachingEffectiveness, examPrepValue, transferLearning, total: lvTotal, grade: lvGrade } };
  });

  return matrix;
}

// ─── Pack-level EQS summary ────────────────────────────────────────

function packEQSsummary(eqsScored) {
  const packs = {};
  eqsScored.forEach(d => {
    if (!packs[d.pack]) packs[d.pack] = { eqsScores: [], eqsGrades: {A:0,B:0,C:0,D:0,F:0}, count: 0 };
    packs[d.pack].eqsScores.push(d.eqs);
    packs[d.pack].eqsGrades[d.eqsGrade]++;
    packs[d.pack].count++;
  });
  const result = {};
  Object.keys(packs).forEach(pk => {
    const s = packs[pk];
    const avg = Math.round(s.eqsScores.reduce((a,b)=>a+b,0) / s.count);
    result[pk] = { avgEQS: avg, count: s.count, gradeDistribution: s.eqsGrades };
  });
  return result;
}

// ─── High risk inventory ───────────────────────────────────────────

function highRiskInventory(eqsScored, candidates, limit) {
  // Merge EQS with rewrite candidates, prioritize by lowest EQS + highest priority
  const map = {};
  eqsScored.forEach(d => { map[d.qid] = d.eqs; });

  const merged = candidates.map(c => ({
    ...c,
    eqs: map[c.qid] || 0
  }));

  merged.sort((a, b) => {
    const prioOrder = { 'P0-CRITICAL': 0, 'P1-HIGH': 1, 'P2-MEDIUM': 2, 'P3-LOW': 3 };
    const pa = prioOrder[a.priority] || 99;
    const pb = prioOrder[b.priority] || 99;
    if (pa !== pb) return pa - pb;
    return a.eqs - b.eqs;
  });

  return merged.slice(0, limit);
}

// ─── Blueprint coverage ────────────────────────────────────────────

function blueprintCoverage(allData, eqsScored) {
  const domains = {};
  const eqsMap = {};
  eqsScored.forEach(d => { eqsMap[d.qid] = d; });

  allData.forEach(d => {
    const dom = d.domain;
    if (!domains[dom]) domains[dom] = { total: 0, ecPresent: 0, ecAvgLen: 0, eqsAvg: 0, eqsList: [],
      iqA: 0, iqF: 0, lengths: [], certified: 0 };
    domains[dom].total++;
    const eqsD = eqsMap[d.qid];
    if (d.explanationCorrect.text && d.explanationCorrect.text.trim().length > 0) domains[dom].ecPresent++;
    domains[dom].lengths.push(d.explanationCorrect.analysis.chars);
    if (eqsD) {
      domains[dom].eqsList.push(eqsD.eqs);
      if (eqsD.eqsGrade === 'A') domains[dom].iqA++;
      if (eqsD.eqsGrade === 'F') domains[dom].iqF++;
    }
    if (d.state === 'Certified') domains[dom].certified++;
  });

  Object.keys(domains).forEach(dom => {
    const s = domains[dom];
    s.ecAvgLen = s.lengths.length > 0 ? Math.round(s.lengths.reduce((a,b)=>a+b,0)/s.lengths.length) : 0;
    s.eqsAvg = s.eqsList.length > 0 ? Math.round(s.eqsList.reduce((a,b)=>a+b,0)/s.eqsList.length) : 0;
    s.ecFillRate = (s.ecPresent / s.total * 100).toFixed(1);
    delete s.lengths; delete s.eqsList;
  });
  return domains;
}

// ─── Cross-pack consistency ────────────────────────────────────────

function crossPackConsistency(allData) {
  // Compare EC lengths for same-section items across packs
  const bySection = {};
  allData.forEach(d => {
    if (!bySection[d.section]) bySection[d.section] = {};
    if (!bySection[d.section][d.pack]) bySection[d.section][d.pack] = { lengths: [], count: 0 };
    bySection[d.section][d.pack].lengths.push(d.explanationCorrect.analysis.chars);
    bySection[d.section][d.pack].count++;
  });

  const drift = {};
  Object.keys(bySection).forEach(sec => {
    const packs = Object.keys(bySection[sec]);
    if (packs.length >= 2) {
      const avgs = packs.map(pk => ({
        pack: pk,
        avgLen: Math.round(bySection[sec][pk].lengths.reduce((a,b)=>a+b,0) / bySection[sec][pk].count),
        count: bySection[sec][pk].count
      }));
      const maxAvg = Math.max(...avgs.map(a => a.avgLen));
      const minAvg = Math.min(...avgs.map(a => a.avgLen));
      if (maxAvg > 0 && (maxAvg - minAvg) / maxAvg > 0.3) {
        drift[sec] = { packs: avgs, maxAvg, minAvg, ratio: (minAvg/maxAvg).toFixed(2) };
      }
    }
  });
  return drift;
}

// ─── Metadata correlation ──────────────────────────────────────────

function metadataCorrelation(allData) {
  // Difficulty vs EC length correlation
  const byDifficulty = { Easy: { lengths: [], eqsList:[] }, 'Moderate-Easy': { lengths: [], eqsList:[] },
    Moderate: { lengths: [], eqsList:[] }, Difficult: { lengths: [], eqsList:[] }, 'Very Difficult': { lengths: [], eqsList:[] } };
  const byCogLevel = {};

  allData.forEach(d => {
    const diff = d.difficulty || 'Unknown';
    const bucket = (byDifficulty[diff] || { lengths: [], eqsList: [] });
    bucket.lengths.push(d.explanationCorrect.analysis.chars);
    byDifficulty[diff] = bucket;

    const cog = d.cognitiveLevel || 'Unknown';
    if (!byCogLevel[cog]) byCogLevel[cog] = { lengths: [], count: 0 };
    byCogLevel[cog].lengths.push(d.explanationCorrect.analysis.chars);
    byCogLevel[cog].count++;
  });

  const diffCorr = {};
  Object.keys(byDifficulty).forEach(diff => {
    const s = byDifficulty[diff];
    diffCorr[diff] = s.lengths.length > 0 ? Math.round(s.lengths.reduce((a,b)=>a+b,0)/s.lengths.length) : 0;
  });

  const cogCorr = {};
  Object.keys(byCogLevel).forEach(cog => {
    const s = byCogLevel[cog];
    cogCorr[cog] = { avgLen: s.lengths.length > 0 ? Math.round(s.lengths.reduce((a,b)=>a+b,0)/s.lengths.length) : 0, count: s.count };
  });

  return { difficultyCorrelation: diffCorr, cognitiveLevelCorrelation: cogCorr };
}

// ─── Case-bank gap ─────────────────────────────────────────────────

function caseBankGap(caseData) {
  const result = { totalCaseEC: caseData.length, ecPresent: 0, ecMissing: 0, ecAvgLen: 0,
    ewTotal: 0, ewPresent: 0, ewEmpty: 0, ewFillRate: '0.0',
    byFile: {} };

  caseData.forEach(d => {
    if (d.explanationCorrect.text && d.explanationCorrect.text.trim().length > 0) result.ecPresent++;
    else result.ecMissing++;

    const file = d.pack;
    if (!result.byFile[file]) result.byFile[file] = { total: 0, ecPresent: 0, ecAvgLen: 0, ewTotal: 0, ewPresent: 0, lengths: [] };
    result.byFile[file].total++;
    if (d.explanationCorrect.text && d.explanationCorrect.text.trim().length > 0) result.byFile[file].ecPresent++;
    result.byFile[file].lengths.push(d.explanationCorrect.analysis.chars);

    d.explanationWrong.forEach(ew => {
      result.ewTotal++;
      result.byFile[file].ewTotal++;
      if (!ew.isCC) {
        if (ew.text && ew.text.trim().length > 0) { result.ewPresent++; result.byFile[file].ewPresent++; }
        else result.ewEmpty++;
      }
    });
  });

  result.ecFillRate = (result.ecPresent / result.totalCaseEC * 100).toFixed(1);
  result.ewFillRate = result.ewTotal > 0 ? (result.ewPresent / result.ewTotal * 100).toFixed(1) : '0.0';

  Object.keys(result.byFile).forEach(file => {
    const s = result.byFile[file];
    s.ecAvgLen = s.lengths.length > 0 ? Math.round(s.lengths.reduce((a,b)=>a+b,0)/s.lengths.length) : 0;
    s.ecFillRate = (s.ecPresent / s.total * 100).toFixed(1);
    s.ewFillRate = s.ewTotal > 0 ? (s.ewPresent / s.ewTotal * 100).toFixed(1) : '0.0';
    delete s.lengths;
  });

  result.ecAvgLen = caseData.length > 0 ? Math.round(caseData.reduce((s,d)=>s+d.explanationCorrect.analysis.chars, 0) / caseData.length) : 0;
  return result;
}

// ─── Rewrite forecast ──────────────────────────────────────────────

function rewriteForecast(candidates) {
  const p0 = candidates.filter(c => c.priority === 'P0-CRITICAL').length;
  const p1 = candidates.filter(c => c.priority === 'P1-HIGH').length;
  const p2 = candidates.filter(c => c.priority === 'P2-MEDIUM').length;
  const p3 = candidates.filter(c => c.priority === 'P3-LOW').length;

  // Sessions estimate: P0 = 8-10 per session, P1 = 15-20, P2 = 30, P3 = 50
  const p0Sessions = Math.ceil(p0 / 8);
  const p1Sessions = Math.ceil(p1 / 15);
  const p2Sessions = Math.ceil(p2 / 30);
  const p3Sessions = Math.ceil(p3 / 50);

  return {
    p0Critical: { count: p0, sessions: p0Sessions, description: 'Missing/empty ExplanationCorrect' },
    p1High: { count: p1, sessions: p1Sessions, description: 'Placeholder/thin EC or 2+ empty EW slots' },
    p2Medium: { count: p2, sessions: p2Sessions, description: 'Thin EC or 1 empty EW slot or grade F instructional quality' },
    p3Low: { count: p3, sessions: p3Sessions, description: 'Grade D instructional quality' },
    totalCandidates: p0 + p1 + p2 + p3,
    totalSessions: p0Sessions + p1Sessions + p2Sessions + p3Sessions
  };
}

// ─── Certification benchmark ───────────────────────────────────────

function certBenchmark(eqsScored) {
  // Items ready for certification (EQS >= 70): can certify as-is
  // Items needing upgrade (EQS 55-69): minor improvements needed
  // Items needing major rewrite (EQS < 55): must be rewritten before certification

  const ready = eqsScored.filter(d => d.eqs >= 70 && d.state !== 'Certified').length;
  const upgrade = eqsScored.filter(d => d.eqs >= 55 && d.eqs < 70 && d.state !== 'Certified').length;
  const majorRewrite = eqsScored.filter(d => d.eqs < 55 && d.state !== 'Certified').length;
  const alreadyCertified = eqsScored.filter(d => d.state === 'Certified').length;

  return {
    alreadyCertified,
    readyForCertification: ready,
    needsUpgrade: upgrade,
    needsMajorRewrite: majorRewrite,
    totalNotCertified: ready + upgrade + majorRewrite,
    certifiedReadinessPct: alreadyCertified > 0 ?
      ((alreadyCertified) / eqsScored.length * 100).toFixed(1) : '0.0'
  };
}

// ─── MAIN ──────────────────────────────────────────────────────────

(function main() {
  console.log('S303 — Explanation Quality Census & Instructional Value Audit');
  console.log('=============================================================\n');

  const packFiles = [
    { file: 'pack_a_corrected.js',  name: 'Pack A' },
    { file: 'pack_b_corrected.js',  name: 'Pack B' },
    { file: 'pack_c_corrected.js',  name: 'Pack C' },
    { file: 'pack_d_corrected.js',  name: 'Pack D' },
    { file: 'pack_e_corrected.js',  name: 'Pack E' },
  ];

  const caseFiles = [
    { file: 'content/cases/legacy/scored_cases.js',  name: 'scored_cases' },
    { file: 'content/cases/legacy/scored_cases2.js', name: 'scored_cases2' },
    { file: 'content/cases/legacy/scored_cases3.js', name: 'scored_cases3' },
    { file: 'content/cases/legacy/scored_cases4.js', name: 'scored_cases4' },
    { file: 'content/cases/legacy/scored_cases5.js', name: 'scored_cases5' },
  ];

  const allMCQData = [];
  const allCaseData = [];

  console.log('Extracting MCQ explanations from pack files...');
  for (const pf of packFiles) {
    const fp = path.join(__dirname, '..', pf.file);
    const items = parsePackFile(fp);
    const extracted = extractMCQExplanationData(items, pf.name);
    allMCQData.push(...extracted);
    console.log(`  ${pf.name}: ${extracted.length} items`);
  }

  console.log('\nExtracting case explanations from case files...');
  for (const cf of caseFiles) {
    const fp = path.join(__dirname, '..', cf.file);
    const items = parseScoredCases(fp);
    const extracted = extractCaseExplanationData(items, cf.name);
    allCaseData.push(...extracted);
    console.log(`  ${cf.name}: ${extracted.length} items`);
  }

  const allData = [...allMCQData, ...allCaseData];
  console.log(`\nTotal items: ${allData.length} (MCQ: ${allMCQData.length}, Case: ${allCaseData.length})`);

  // ─── Census ─────────────────────────────────────────────────
  console.log('\nComputing census...');
  const census = computeCensus(allData);
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_EXPLANATION_PORTFOLIO_CENSUS.json'),
    JSON.stringify(census, null, 2));

  // ─── Coverage audit ─────────────────────────────────────────
  console.log('Generating coverage audit...');
  const coverage = {
    ecTotal: census.ecPresent + census.ecMissing,
    ecPresent: census.ecPresent, ecMissing: census.ecMissing,
    ecFillRate: (census.ecPresent / (census.ecPresent + census.ecMissing) * 100).toFixed(1),
    ecPlaceholder: census.ecPlaceholder, ecBoilerplate: census.ecBoilerplate,
    ecThin: census.ecThin, ecAdequate: census.ecAdequate, ecGood: census.ecGood, ecExcellent: census.ecExcellent,
    ewTotal: census.ewTotal, ewPresent: census.ewPresent, ewEmpty: census.ewEmpty,
    ewNonCCFillRate: (census.ewNonCCPresent / census.ewNonCCTotal * 100).toFixed(1) || 'N/A',
    ewCChasText: census.ewCCPresent, // DL-008
    packStats: census.packStats
  };
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_EXPLANATION_COVERAGE_AUDIT.json'),
    JSON.stringify(coverage, null, 2));

  // ─── EQS model ──────────────────────────────────────────────
  console.log('Computing EQS model...');
  const eqsScored = computeEQS(allData);
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_EXPLANATION_QUALITY_SCORE_MODEL.json'),
    JSON.stringify({ packEQS: packEQSsummary(eqsScored), modelVersion: 'S303-1.0', dimensions: {
      instructionalValue: '25%', reasoningDepth: '20%', calculationSupport: '15%',
      standardsIntegration: '15%', learningEffectiveness: '15%', structure: '10%'
    }}, null, 2));

  // ─── Instructional quality ──────────────────────────────────
  console.log('Generating instructional quality audit...');
  const iqAudit = {
    totalItems: allData.length,
    gradeDistribution: census.ecsGrades,
    hasRationale: allData.filter(d => d.explanationCorrect.quality.hasRationale).length,
    hasCommonTrap: allData.filter(d => d.explanationCorrect.quality.hasCommonTrap).length,
    hasBusinessContext: allData.filter(d => d.explanationCorrect.quality.hasBusinessContext).length,
    avgQualityScore: allData.length > 0 ?
      (allData.reduce((s,d) => s + d.explanationCorrect.quality.score, 0) / allData.length).toFixed(2) : '0.00',
    packQuality: {}
  };
  Object.keys(census.packStats).forEach(pk => {
    iqAudit.packQuality[pk] = census.packStats[pk].ecGrades;
  });
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_INSTRUCTIONAL_QUALITY_AUDIT.json'),
    JSON.stringify(iqAudit, null, 2));

  // ─── Learning value matrix ──────────────────────────────────
  console.log('Computing learning value matrix...');
  const lvMatrix = computeLearningValue(allData);
  const lvSummary = {
    totalItems: lvMatrix.length,
    gradeDistribution: { A: lvMatrix.filter(d => d.learningValue.grade === 'A').length,
      B: lvMatrix.filter(d => d.learningValue.grade === 'B').length,
      C: lvMatrix.filter(d => d.learningValue.grade === 'C').length,
      D: lvMatrix.filter(d => d.learningValue.grade === 'D').length,
      F: lvMatrix.filter(d => d.learningValue.grade === 'F').length },
    avgInstructionalUtility: (lvMatrix.reduce((s,d) => s + d.learningValue.instructionalUtility, 0) / lvMatrix.length).toFixed(2),
    avgCoachingEffectiveness: (lvMatrix.reduce((s,d) => s + d.learningValue.coachingEffectiveness, 0) / lvMatrix.length).toFixed(2),
    avgExamPrepValue: (lvMatrix.reduce((s,d) => s + d.learningValue.examPrepValue, 0) / lvMatrix.length).toFixed(2),
    avgTransferLearning: (lvMatrix.reduce((s,d) => s + d.learningValue.transferLearning, 0) / lvMatrix.length).toFixed(2),
  };
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_LEARNING_VALUE_MATRIX.json'),
    JSON.stringify(lvSummary, null, 2));

  // ─── Certification benchmark ────────────────────────────────
  console.log('Generating certification benchmark...');
  const certBench = certBenchmark(eqsScored);
  certBench.byPack = {};
  packFiles.forEach(pf => {
    const packData = eqsScored.filter(d => d.pack === pf.name);
    certBench.byPack[pf.name] = {
      total: packData.length,
      certified: packData.filter(d => d.state === 'Certified').length,
      notCertified: packData.filter(d => d.state !== 'Certified').length,
      readyForCert: packData.filter(d => d.eqs >= 70 && d.state !== 'Certified').length,
      needsUpgrade: packData.filter(d => d.eqs >= 55 && d.eqs < 70 && d.state !== 'Certified').length,
      needsMajorRewrite: packData.filter(d => d.eqs < 55 && d.state !== 'Certified').length
    };
  });
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_CERTIFICATION_BENCHMARK_AUDIT.json'),
    JSON.stringify(certBench, null, 2));

  // ─── Case-bank gap ──────────────────────────────────────────
  console.log('Generating case-bank gap analysis...');
  const caseGap = caseBankGap(allCaseData);
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_CASEBANK_GAP_ANALYSIS.json'),
    JSON.stringify(caseGap, null, 2));

  // ─── Rewrite candidates ─────────────────────────────────────
  console.log('Identifying rewrite candidates...');
  const rewriteCands = identifyRewriteCandidates(allData);
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_REWRITE_CANDIDATES.json'),
    JSON.stringify({
      totalCandidates: rewriteCands.length,
      byPriority: {
        P0_CRITICAL: rewriteCands.filter(c => c.priority === 'P0-CRITICAL').length,
        P1_HIGH: rewriteCands.filter(c => c.priority === 'P1-HIGH').length,
        P2_MEDIUM: rewriteCands.filter(c => c.priority === 'P2-MEDIUM').length,
        P3_LOW: rewriteCands.filter(c => c.priority === 'P3-LOW').length
      },
      top100: rewriteCands.slice(0, 100)
    }, null, 2));

  // ─── Rewrite forecast ───────────────────────────────────────
  console.log('Generating rewrite forecast...');
  const forecast = rewriteForecast(rewriteCands);
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_REWRITE_FORECAST.json'),
    JSON.stringify(forecast, null, 2));

  // ─── Dashboard ──────────────────────────────────────────────
  console.log('Generating dashboard...');
  const blueprint = blueprintCoverage(allData, eqsScored);
  const crossPack = crossPackConsistency(allData);
  const metaCorr = metadataCorrelation(allData);
  const highRisk = highRiskInventory(eqsScored, rewriteCands, 250);
  const packEQS = packEQSsummary(eqsScored);

  const dashboard = {
    session: 'S303',
    type: 'Explanation Quality Census & Instructional Value Audit',
    timestamp: new Date().toISOString(),
    summary: {
      totalItems: allData.length,
      mcqItems: allMCQData.length,
      caseItems: allCaseData.length,
      ecFillRate: (census.ecPresent / (census.ecPresent + census.ecMissing) * 100).toFixed(1) + '%',
      ewNonCCFillRate: (census.ewNonCCPresent / census.ewNonCCTotal * 100).toFixed(1) + '%',
      dl008Risk: census.ewCCPresent,
      avgECLength: census.ecAvgLength,
      ecGradeA: census.ecsGrades.A,
      ecGradeF: census.ecsGrades.F,
      rewriteCandidates: rewriteCands.length,
      totalSessionsEstimated: forecast.totalSessions
    },
    packEQS,
    blueprint,
    crossPackDrift: crossPack,
    metadataCorrelation: metaCorr,
    rewriteForecast: forecast,
    highRiskCount: highRisk.length,
    caseBankGap: caseGap,
    certBenchmark: certBench
  };
  fs.writeFileSync(path.join(REPORT_DIR, 'SESSION303_DASHBOARD.json'),
    JSON.stringify(dashboard, null, 2));

  // ─── Summary output ─────────────────────────────────────────
  console.log('\n=============================================================');
  console.log('S303 ANALYSIS COMPLETE');
  console.log('=============================================================');
  console.log(`\nPortfolio Census:`);
  console.log(`  Total items: ${allData.length} (MCQ: ${allMCQData.length}, Case: ${allCaseData.length})`);
  console.log(`  EC fill rate: ${(census.ecPresent / (census.ecPresent + census.ecMissing) * 100).toFixed(1)}%`);
  console.log(`  EW non-CC fill rate: ${(census.ewNonCCPresent / census.ewNonCCTotal * 100).toFixed(1)}%`);
  console.log(`  DL-008 risk (non-empty EW[CC]): ${census.ewCCPresent}`);
  console.log(`  Avg EC length: ${census.ecAvgLength} chars`);
  console.log(`  EC Grade A: ${census.ecsGrades.A}, Grade F: ${census.ecsGrades.F}`);
  console.log(`\nPack EQS scores:`);
  Object.keys(packEQS).sort().forEach(pk => {
    console.log(`  ${pk}: avg EQS = ${packEQS[pk].avgEQS}`);
  });
  console.log(`\nRewrite forecast:`);
  console.log(`  P0-CRITICAL: ${forecast.p0Critical.count} (${forecast.p0Critical.sessions} sessions)`);
  console.log(`  P1-HIGH: ${forecast.p1High.count} (${forecast.p1High.sessions} sessions)`);
  console.log(`  P2-MEDIUM: ${forecast.p2Medium.count} (${forecast.p2Medium.sessions} sessions)`);
  console.log(`  P3-LOW: ${forecast.p3Low.count} (${forecast.p3Low.sessions} sessions)`);
  console.log(`  Total: ${forecast.totalCandidates} candidates, ~${forecast.totalSessions} sessions`);
  console.log(`\nCase bank gap:`);
  console.log(`  Case EC fill rate: ${caseGap.ecFillRate}%`);
  console.log(`  Case EW fill rate: ${caseGap.ewFillRate}%`);
  console.log(`\nBlueprint domains:`);
  Object.keys(blueprint).sort().forEach(dom => {
    console.log(`  ${dom}: EC fill ${blueprint[dom].ecFillRate}%, avg EC len ${blueprint[dom].ecAvgLen}, avg EQS ${blueprint[dom].eqsAvg}`);
  });
  console.log(`\nDeliverables written to ${REPORT_DIR}/`);

})();
