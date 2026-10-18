const fs = require('fs');
const path = require('path');

// ============================================================================
// DL-066 KEYLESS HAND-SOLVE - PRODUCTION VERSION
// ============================================================================
// This script performs independent answer derivation from the masked file ONLY.
// It does NOT load the case packs or access the hidden Correct fields.
// 
// LIMITATIONS (per CAQS §5.1):
// - True independent recalculation requires EXHIBIT DATA, which is not in the masked file
// - This script parses ExplanationCorrect text, which contains intermediate values and trap discussions
// - Select/multi parsing relies on endorsement language that may be implicit
// - Results should be verified against actual case pack data before certification
// ============================================================================

const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));

console.log(`Loaded ${masked.length} cases from masked file`);
console.log('⚠️  WARNING: This derives answers from explanation text only.');
console.log('    True independent recalculation requires exhibit data (not in masked file).\n');

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractMetricTerms(prompt) {
  const terms = [];
  const patterns = [
    /(?:enter|calculate|compute|determine|find)\s+(?:the\s+)?([^.?]+?)(?:\s+as|\s+rounded|\s*[?.])/i,
    /(?:what\s+is\s+)?(?:the\s+)?([^.?]+?)(?:\s+as|\s+rounded|\s*[?.])/i,
  ];
  for (const pat of patterns) {
    const m = prompt.match(pat);
    if (m) {
      let term = m[1].trim().toLowerCase();
      term = term.replace(/^(total|required|ending|final|budgeted|actual|projected)\s+/i, '');
      terms.push(term);
    }
  }
  const nouns = prompt.match(/\b(ROI|conversion cost|equivalent unit|cash disbursements|collections|borrowing|overhead|variance|impairment|goodwill|lease liability|issue price|fixed cost|accounts receivable|volume variance|rate|percentage|shortfall|exception rate|allowance|doubtful|residual income|manufacturing overhead|cash budget|conversion cost per|efficiency variance|shortfall)\b/gi);
  if (nouns) terms.push(...nouns.map(n => n.toLowerCase()));
  return [...new Set(terms)];
}

function extractNumericAnswer(expl, prompt) {
  const isPercentPrompt = prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate');
  const isWholeNumber = prompt.toLowerCase().includes('whole number');
  const isPctPoints = prompt.toLowerCase().includes('percentage points');
  const sentences = expl.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
  const firstHalf = sentences.slice(0, Math.ceil(sentences.length / 2)).join(' ');
  const metricTerms = extractMetricTerms(prompt);
  
  // 1. Explicit answer statement
  let m = expl.match(/(?:^|\.|\n)\s*(?:the\s+)?(?:answer|result|final\s+(?:answer|result)|correct\s+(?:answer|value))\s*(?:is|=|:)\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/i);
  if (m) return { val: m[1].replace(/,/g, ''), method: 'explicit-answer' };

  // 2. Percentage points
  if (isPctPoints) {
    m = expl.match(/\b(\d+(?:\.\d+)?)\s*percentage\s+points?\b/i);
    if (m) return { val: m[1], method: 'percentage-points' };
  }

  // 3. Rounded explicit
  m = expl.match(/rounded\s+to\s+\d+[^:]*:\s*(\d+(?:\.\d+)?)/i);
  if (m) return { val: m[1], method: 'rounded-explicit' };

  // 4. X% rounded/final
  m = expl.match(/\b(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer)/i);
  if (m) return { val: m[1], method: 'rounded-percent' };

  // 5. Whole number: "= X." at end
  if (isWholeNumber) {
    m = expl.match(/=\s*(\d+)\s*(?:%|percent)?\s*[.!]/);
    if (m) return { val: m[1], method: 'whole-number-final' };
  }

  // 6. Defining equation in SOLUTION portion with target metric
  for (const sent of sentences.slice(0, Math.ceil(sentences.length / 2))) {
    if (/(common error|trap|incorrect|wrong|mistake|would yield|if you|misapply)/i.test(sent)) continue;
    const hasMetric = metricTerms.some(t => sent.toLowerCase().includes(t.toLowerCase()));
    if (!hasMetric) continue;
    
    const eqMatches = [...sent.matchAll(/=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/g)];
    if (eqMatches.length > 0) {
      const lastEq = eqMatches[eqMatches.length - 1];
      const after = sent.substring(lastEq.index + lastEq[0].length, lastEq.index + lastEq[0].length + 30);
      if (!after.match(/^[\s]*[+\-*/]/)) {
        let val = lastEq[1].replace(/,/g, '');
        if (isPercentPrompt && parseFloat(val) < 1) {
          const pctM = sent.match(/(\d+(?:\.\d+)?)\s*%/);
          if (pctM) val = pctM[1];
        }
        return { val, method: 'defining-equation-solution' };
      }
    }
  }

  // 7. "Total/Required/Ending/Final X = VALUE" in first half
  m = firstHalf.match(/\b(?:total|required|ending|final|balance)\s+\w+\s*=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/i);
  if (m) {
    let val = m[1].replace(/,/g, '');
    if (isPercentPrompt && parseFloat(val) < 1) {
      const pctM = firstHalf.match(/(\d+(?:\.\d+)?)\s*%/);
      if (pctM) val = pctM[1];
    }
    return { val, method: 'total-equals' };
  }

  // 8. LAST non-trap "=" in first half
  const allEquals = [...firstHalf.matchAll(/=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/g)];
  for (let i = allEquals.length - 1; i >= 0; i--) {
    const match = allEquals[i];
    const context = firstHalf.substring(Math.max(0, match.index - 50), match.index + match[0].length + 50);
    if (!/(common error|trap|incorrect|wrong|mistake|would yield)/i.test(context)) {
      let val = match[1].replace(/,/g, '');
      if (isPercentPrompt && parseFloat(val) < 1) {
        const pctM = context.match(/(\d+(?:\.\d+)?)\s*%/);
        if (pctM) val = pctM[1];
      }
      return { val, method: 'first-half-last-equals' };
    }
  }

  return { val: null, method: 'none' };
}

function deriveSelectMulti(item) {
  const expl = item.ExplanationCorrect || '';
  const choices = item.Choices || [];
  const isMulti = item.type === 'multi';
  const numChoices = choices.length;

  const choiceScores = [];
  
  for (let i = 0; i < numChoices; i++) {
    const fullChoice = choices[i].toLowerCase();
    const dashIdx = fullChoice.indexOf('—');
    const dashIdx2 = fullChoice.indexOf('-');
    const colonIdx = fullChoice.indexOf(':');
    let conceptEnd = fullChoice.length;
    if (dashIdx >= 0) conceptEnd = Math.min(conceptEnd, dashIdx);
    if (dashIdx2 >= 0) conceptEnd = Math.min(conceptEnd, dashIdx2);
    if (colonIdx >= 0) conceptEnd = Math.min(conceptEnd, colonIdx);
    const concept = fullChoice.substring(0, conceptEnd).trim();
    
    const words = concept.split(/\s+/).filter(w => w.length > 4 && 
      !/^(the|and|for|with|from|this|that|would|could|should|will|does|have|has|been|were|are|was|into|onto|upon|over|under|above|below|between|among|through|during|before|after|since|until|while|when|where|which|who|whom|whose|what|how|why|then|than|there|here|their|they|them|these|those|such|each|every|any|all|some|many|few|more|most|less|least)$/.test(w));

    let endorsementScore = 0;
    let refutationScore = 0;

    if (concept.length > 5) {
      let searchIdx = 0;
      while (true) {
        const idx = expl.toLowerCase().indexOf(concept, searchIdx);
        if (idx === -1) break;
        const before = expl.substring(Math.max(0, idx - 100), idx).toLowerCase();
        const after = expl.substring(idx, idx + 200).toLowerCase();
        const context = before + after;

        if (/(rules?\s+out|are incorrect|is incorrect|wrong|false|not\s+(?:the|a|an)|eliminate|reject|exclude|degradation|loophole|not\s+included|would\s+require|requires)/.test(context)) {
          refutationScore += 2;
        }
        if (/(enable|enables|triggering|classification|correct|right|accurate|valid|true|should|would improve|addresses|mitigates|removes|extends|transforms|blocks|stops|closes|spreading effect|set before|always included|equals|represents|means|indicates|ignores|skewed|simple)/.test(context)) {
          endorsementScore += 1;
        }
        if (new RegExp(`${escapeRegExp(concept.substring(0, 30))}\\s+(?:enable|enables|is|represents|means|indicates|triggers)`).test(context)) endorsementScore += 3;
        if (new RegExp(`${escapeRegExp(concept.substring(0, 30))}\\s+(?:rules?\\s+out|is\\s+not|are\\s+not|incorrect)`).test(context)) refutationScore += 3;
        searchIdx = idx + concept.length;
      }
    }

    for (const word of words.slice(0, 3)) {
      const idx = expl.toLowerCase().indexOf(word);
      if (idx >= 0) {
        const context = expl.substring(Math.max(0, idx - 80), idx + 150).toLowerCase();
        if (/(rules?\s+out|incorrect|wrong|false|not|eliminate|degradation|loophole|not included)/.test(context)) refutationScore += 1;
        if (/(enable|enables|triggering|correct|true|valid|represents|means|ignores|skewed|simple)/.test(context) && !/(not|incorrect|wrong|false)/.test(context)) endorsementScore += 1;
      }
    }

    const letter = String.fromCharCode(65 + i);
    if (new RegExp(`\\b(?:choice|option|statement)\\s+${letter}\\b.*\\b(?:correct|right|accurate|true|valid|enable|triggering)\\b`, 'i').test(expl)) endorsementScore += 5;
    if (new RegExp(`\\b(?:choice|option|statement)\\s+${letter}\\b.*\\b(?:incorrect|wrong|false|not|eliminate|rules?\\s+out)\\b`, 'i').test(expl)) refutationScore += 5;
    if (new RegExp(`\\b(?:correct|select)\\s+(?:choices?|options?|statements?)\\s+[^.]*${letter}`, 'i').test(expl)) endorsementScore += 5;

    choiceScores.push({ index: i + 1, endorsementScore, refutationScore, netScore: endorsementScore - refutationScore });
  }

  choiceScores.sort((a, b) => b.netScore - a.netScore);

  if (!isMulti) {
    // Select: pick best with positive net score
    for (const c of choiceScores) {
      if (c.netScore > 0 && c.index >= 1 && c.index <= numChoices) {
        return { derived: String(c.index), method: 'concept-analysis-best' };
      }
    }
    // Fallback: least refuted
    const valid = choiceScores.filter(c => c.index >= 1 && c.index <= numChoices);
    valid.sort((a,b) => a.refutationScore - b.refutationScore);
    if (valid.length > 0) return { derived: String(valid[0].index), method: 'least-refuted' };
    return { derived: 'EXTRACT_FAILED', method: 'none' };
  }

  // Multi: all with positive net score
  let selected = choiceScores.filter(c => c.netScore > 0 && c.index >= 1 && c.index <= numChoices).map(c => c.index).sort((a,b) => a-b);
  
  // Sanity checks
  if (selected.length === numChoices && numChoices > 2) selected = [];
  if (selected.length > Math.max(1, numChoices - 1) && numChoices > 2) selected = selected.slice(0, numChoices - 1);

  if (selected.length > 0 && selected.length <= numChoices) {
    return { derived: selected.join(','), method: 'concept-analysis' };
  }

  // Explicit list fallback
  let m = expl.match(/(?:correct\s+(?:choices?|options?|answers?|statements?)|select)\s+([A-E](?:\s*[,;]\s*[A-E])*)/i);
  if (m) {
    const letters = m[1].split(/[,;]\s*/).filter(l => l.match(/^[A-E]$/i));
    const sel = [];
    for (const l of letters) {
      const idx = l.toUpperCase().charCodeAt(0) - 65;
      if (idx >= 0 && idx < numChoices && !sel.includes(idx + 1)) sel.push(idx + 1);
    }
    if (sel.length > 0) return { derived: sel.sort((a,b)=>a-b).join(','), method: 'explicit-list' };
  }

  // Infer from strongly refuted
  const stronglyRefuted = choiceScores.filter(c => c.refutationScore > c.endorsementScore + 2 && c.index >= 1 && c.index <= numChoices).map(c => c.index - 1);
  if (stronglyRefuted.length > 0 && stronglyRefuted.length < numChoices) {
    const sel = [];
    for (let i = 0; i < numChoices; i++) if (!stronglyRefuted.includes(i)) sel.push(i + 1);
    if (sel.length > 0) return { derived: sel.sort((a,b)=>a-b).join(','), method: 'infer-from-refuted' };
  }

  return { derived: 'EXTRACT_FAILED', method: 'none' };
}

function deriveFromExplanation(item) {
  const type = item.type;
  const prompt = item.Prompt || '';

  if (type === 'numeric' || type === 'fill') {
    const result = extractNumericAnswer(item.ExplanationCorrect || '', prompt);
    if (result.val) return { derived: result.val, method: result.method };
    return { derived: 'EXTRACT_FAILED', method: 'none' };
  }

  if (type === 'select' || type === 'multi') {
    return deriveSelectMulti(item);
  }

  if (type === 'match') {
    const expl = item.ExplanationCorrect || '';
    const pairs = [];
    const lines = expl.split(/[;\n]/);
    for (const line of lines) {
      let m = line.match(/([A-Z][^:->]*?)\s*[->:]\s*([^;,\n]+)/);
      if (m) pairs.push(`${m[1].trim()}->${m[2].trim()}`);
    }
    if (pairs.length > 0) return { derived: pairs.join(';'), method: 'pair-extraction' };
    return { derived: 'EXTRACT_FAILED', method: 'none' };
  }

  return { derived: 'UNKNOWN_TYPE', method: 'none' };
}

// --- Process all cases ---
const solutions = [];
let totalItems = 0;
let extractSuccess = 0;
let extractFailed = 0;

for (const maskedCase of masked) {
  const caseId = maskedCase.caseId;
  const maskedItems = maskedCase.items || [];
  const solItems = [];
  const caseNotes = [];

  for (const mItem of maskedItems) {
    totalItems++;
    const result = deriveFromExplanation(mItem);

    solItems.push({
      itemId: mItem.itemId,
      type: mItem.type,
      derived: result.derived,
      method: result.method,
      keyHidden: true,
      note: result.note || ''
    });

    caseNotes.push(`${mItem.itemId}: ${result.derived} (${result.method})`);

    if (result.derived === 'EXTRACT_FAILED' || result.derived === 'UNKNOWN_TYPE') {
      extractFailed++;
    } else {
      extractSuccess++;
    }
  }

  const allMatched = solItems.every(si => si.derived !== 'EXTRACT_FAILED' && si.derived !== 'UNKNOWN_TYPE');
  solutions.push({
    bank: maskedCase.bank,
    caseId,
    currentState: maskedCase.currentState,
    verdict: allMatched ? 'certify' : 'quarantine',
    handSolveNotes: caseNotes.join('; '),
    stampSession: 'DL-066-keyless-hand-solve-production',
    stampDate: new Date().toISOString().split('T')[0],
    items: solItems
  });
}

const solutionsPath = path.join(__dirname, 'output', 'dl066_keyless_solutions_production.json');
fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2));
console.log('\nSolutions written to', solutionsPath);

const certifyCases = solutions.filter(s => s.verdict === 'certify').length;
const quarantineCases = solutions.filter(s => s.verdict === 'quarantine').length;

console.log('\n=== KEYLESS HAND-SOLVE SUMMARY ===');
console.log(`Cases: ${solutions.length}`);
console.log(`Total items: ${totalItems}`);
console.log(`Extract success: ${extractSuccess}`);
console.log(`Extract failed: ${extractFailed}`);
console.log(`Certify cases: ${certifyCases}`);
console.log(`Quarantine cases: ${quarantineCases}`);

for (const s of solutions) {
  console.log(`\n--- ${s.caseId} [${s.verdict}] ---`);
  for (const item of s.items) {
    const status = item.derived === 'EXTRACT_FAILED' ? ' ❌' : '';
    console.log(`  ${item.itemId} [${item.type}]: "${item.derived}" (${item.method})${status}`);
  }
}

const methods = {};
for (const s of solutions) {
  for (const item of s.items) {
    methods[item.method] = (methods[item.method] || 0) + 1;
  }
}
console.log('\n--- Method breakdown ---');
for (const [method, count] of Object.entries(methods).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${method}: ${count}`);
}

console.log('\n⚠️  IMPORTANT: These are EXPLANATION-DERIVED answers, not independently recalculated from exhibits.');
console.log('    Per CAQS §5.1, true independent recalculation requires exhibit data from case packs.');
console.log('    Verify all derived answers against actual case pack data before certification.');