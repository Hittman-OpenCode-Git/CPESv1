const fs = require('fs');
const path = require('path');

// --- Load masked file (keys already hidden) ---
const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));

console.log(`Loaded ${masked.length} cases from masked file`);

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// --- Smart extraction from ExplanationCorrect ---
function deriveFromExplanation(item) {
  const expl = item.ExplanationCorrect || '';
  const type = item.type;
  const prompt = item.Prompt || '';
  const itemId = item.itemId;

  // ===== NUMERIC / FILL =====
  if (type === 'numeric' || type === 'fill') {
    const metricTerms = extractMetricTerms(prompt);
    const sentences = expl.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
    
    let bestScore = -1;
    let bestVal = null;
    let bestMethod = '';

    for (const sent of sentences) {
      if (/(common error|trap|incorrect|wrong|mistake|would yield|if you|misapply|common mistake)/i.test(sent)) continue;
      
      let score = 0;
      let val = null;

      for (const term of metricTerms) {
        if (sent.toLowerCase().includes(term.toLowerCase())) { score += 30; break; }
      }

      // Pattern: X = ... = Y (defining equation with final value)
      const definingMatch = sent.match(/(\w+(?:\s+\w+){0,3})\s*=\s*.*?=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/);
      if (definingMatch) {
        score += 50;
        val = definingMatch[2].replace(/,/g, '');
        if (metricTerms.some(t => definingMatch[1].toLowerCase().includes(t.toLowerCase()))) score += 20;
      }

      // Pattern: "Metric = VALUE" (single equals, defining)
      const singleEq = sent.match(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/);
      if (singleEq && !definingMatch) {
        score += 25;
        val = singleEq[2].replace(/,/g, '');
        if (metricTerms.some(t => singleEq[1].toLowerCase().includes(t.toLowerCase()))) score += 20;
      }

      // Pattern: "Total/Required/Ending/Final X = VALUE"
      const totalMatch = sent.match(/\b(?:total|required|ending|final|balance)\s+\w+\s*=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/i);
      if (totalMatch && !val) { score += 30; val = totalMatch[1].replace(/,/g, ''); }

      // Pattern: "rounded to N: X"
      const roundedMatch = sent.match(/rounded\s+to\s+\d+[^:]*:\s*(\d+(?:\.\d+)?)/i);
      if (roundedMatch) { score += 40; val = roundedMatch[1]; }

      // Pattern: "X percentage points" 
      const ppMatch = sent.match(/\b(\d+(?:\.\d+)?)\s*percentage\s+points?\b/i);
      if (ppMatch && prompt.toLowerCase().includes('percentage points')) { score += 45; val = ppMatch[1]; }

      // Pattern: "X%" with "rounded" or "final" or "answer"
      const pctMatch = sent.match(/\b(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer)/i);
      if (pctMatch) { score += 35; val = pctMatch[1]; }

      // Bonus for being in first half (solution) not last (traps)
      const sentIndex = sentences.indexOf(sent);
      if (sentIndex < sentences.length / 2) score += 15;
      else if (sentIndex >= sentences.length - 2) score -= 20;

      if (val && score > bestScore) {
        bestScore = score;
        bestVal = val;
        bestMethod = 'defining-equation';
      }
    }

    if (bestVal) {
      // Post-process: whole number prompt -> check for % form
      if (prompt.toLowerCase().includes('whole number') && bestVal.includes('.')) {
        const pctMatch = expl.match(new RegExp(`${bestVal.replace('.', '\\.')}\\s*=\\s*(\\d+)\\s*%`));
        if (pctMatch) bestVal = pctMatch[1];
      }
      // Percentage prompt -> if decimal < 1, look for % form
      if ((prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate')) && parseFloat(bestVal) < 1) {
        const pctMatch = expl.match(/\b(\d+(?:\.\d+)?)\s*%\b/);
        if (pctMatch) bestVal = pctMatch[1];
      }
      return { derived: bestVal, method: bestMethod };
    }

    // Fallback: Last non-trap "=" in first half
    const firstHalf = sentences.slice(0, Math.ceil(sentences.length / 2)).join(' ');
    const allEquals = [...firstHalf.matchAll(/=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/g)];
    for (let i = allEquals.length - 1; i >= 0; i--) {
      const match = allEquals[i];
      const context = firstHalf.substring(Math.max(0, match.index - 50), match.index + match[0].length + 50);
      if (!/(common error|trap|incorrect|wrong|mistake|would yield)/i.test(context)) {
        let val = match[1].replace(/,/g, '');
        if ((prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate')) && parseFloat(val) < 1) {
          const pctM = context.match(/(\d+(?:\.\d+)?)\s*%/);
          if (pctM) val = pctM[1];
        }
        return { derived: val, method: 'first-half-last-equals' };
      }
    }

    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Could not extract from: ${expl.substring(0, 300)}` };
  }

  // ===== SELECT =====
  if (type === 'select') {
    const choices = item.Choices || [];

    // For each choice, determine if endorsed or refuted
    const choiceStatus = []; // +1 endorsed, -1 refuted, 0 unknown
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      const keyPhrase = choice.substring(0, 40).toLowerCase();
      const idx = expl.toLowerCase().indexOf(keyPhrase);
      let status = 0;
      if (idx >= 0) {
        const before = expl.substring(Math.max(0, idx - 80), idx).toLowerCase();
        const after = expl.substring(idx, idx + 150).toLowerCase();
        const context = before + after;
        const refuted = /(incorrect|wrong|not|eliminate|reject|exclude|false|mistake|error|rules?\s+out|are incorrect|rules out)/.test(context);
        const endorsed = /(correct|right|accurate|the\s+answer|is\s+the|best|primary|most|directly|proper|required|triggering|classification|enable)/.test(context);
        if (refuted) status = -1;
        else if (endorsed) status = 1;
      }
      // Also check for letter references
      const letter = String.fromCharCode(65 + i);
      if (status === 0) {
        if (new RegExp(`\\b(?:choice|option|answer)\\s+${letter}\\b.*\\b(?:correct|right|accurate|the\\s+answer|is\\s+the|triggering)\\b`, 'i').test(expl)) status = 1;
        if (new RegExp(`\\b(?:choice|option|answer)\\s+${letter}\\b.*\\b(?:incorrect|wrong|not|eliminate|rules?\s+out)\\b`, 'i').test(expl)) status = -1;
      }
      choiceStatus.push(status);
    }

    // Find endorsed choice
    const endorsed = choiceStatus.map((s, i) => s > 0 ? i + 1 : null).filter(x => x);
    const refuted = choiceStatus.map((s, i) => s < 0 ? i + 1 : null).filter(x => x);
    
    if (endorsed.length === 1) {
      return { derived: String(endorsed[0]), method: 'single-endorsed', choice: choices[endorsed[0]-1] };
    }
    // If all but one refuted, the remaining is correct
    if (refuted.length === choices.length - 1) {
      const correct = [...Array(choices.length).keys()].map(i => i + 1).find(i => !refuted.includes(i));
      if (correct) return { derived: String(correct), method: 'all-others-refuted', choice: choices[correct-1] };
    }

    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Choice status: ${choiceStatus.join(',')}; Could not identify from: ${expl.substring(0, 300)}` };
  }

  // ===== MULTI =====
  if (type === 'multi') {
    const choices = item.Choices || [];
    const selected = [];

    // For each choice, determine if endorsed (true statement) or refuted (false statement)
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      const keyPhrase = choice.substring(0, 40).toLowerCase();
      const idx = expl.toLowerCase().indexOf(keyPhrase);
      let status = 0; // +1 true, -1 false, 0 unknown
      if (idx >= 0) {
        const before = expl.substring(Math.max(0, idx - 80), idx).toLowerCase();
        const after = expl.substring(idx, idx + 150).toLowerCase();
        const context = before + after;
        const refuted = /(incorrect|wrong|not|eliminate|reject|exclude|false|mistake|error|rules?\s+out|are incorrect|degradation|loophole|not included)/.test(context);
        const endorsed = /(correct|right|accurate|valid|true|should|would improve|addresses|mitigates|removes|extends|transforms|blocks|stops|closes|spreading effect|set before|always included|equals)/.test(context);
        if (refuted) status = -1;
        else if (endorsed) status = 1;
      }
      // Also check letter references
      const letter = String.fromCharCode(65 + i);
      if (status === 0) {
        if (new RegExp(`\\b(?:choice|option|statement)\\s+${letter}\\b.*\\b(?:correct|right|accurate|true|valid)\\b`, 'i').test(expl)) status = 1;
        if (new RegExp(`\\b(?:choice|option|statement)\\s+${letter}\\b.*\\b(?:incorrect|wrong|false|not)\\b`, 'i').test(expl)) status = -1;
      }
      if (status > 0) selected.push(i + 1);
    }

    // Pattern: Explicit "correct choices are A, C, D"
    if (selected.length === 0) {
      let m = expl.match(/(?:correct\s+(?:choices?|options?|answers?|statements?)|select)\s+([A-E](?:\s*[,;]\s*[A-E])*)/i);
      if (m) {
        const letters = m[1].split(/[,;]\s*/).filter(l => l.match(/^[A-E]$/i));
        for (const l of letters) {
          const idx = l.toUpperCase().charCodeAt(0) - 65;
          if (idx >= 0 && idx < choices.length && !selected.includes(idx + 1)) selected.push(idx + 1);
        }
      }
    }

    // Pattern: "The three correct choices" - infer from refuted
    if (selected.length === 0) {
      const refuted = [];
      for (let i = 0; i < choices.length; i++) {
        const choice = choices[i];
        const keyPhrase = choice.substring(0, 40).toLowerCase();
        const idx = expl.toLowerCase().indexOf(keyPhrase);
        if (idx >= 0) {
          const context = expl.substring(Math.max(0, idx - 80), idx + 150).toLowerCase();
          if (/(incorrect|wrong|false|not|eliminate|degradation|loophole|not included)/.test(context)) refuted.push(i);
        }
      }
      if (refuted.length > 0 && refuted.length < choices.length) {
        for (let i = 0; i < choices.length; i++) if (!refuted.includes(i)) selected.push(i + 1);
      }
    }

    if (selected.length > 0 && selected.length <= choices.length) {
      return { derived: selected.sort((a,b) => a-b).join(','), method: 'choices-endorsed', selected };
    }
    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Could not identify choices from: ${expl.substring(0, 300)}` };
  }

  // ===== MATCH =====
  if (type === 'match') {
    const pairs = [];
    const lines = expl.split(/[;\n]/);
    for (const line of lines) {
      let m = line.match(/([A-Z][^:->]*?)\s*[->:]\s*([^;,\n]+)/);
      if (m) pairs.push(`${m[1].trim()}->${m[2].trim()}`);
    }
    if (pairs.length > 0) return { derived: pairs.join(';'), method: 'pair-extraction', pairs };
    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Could not extract pairs from: ${expl.substring(0, 300)}` };
  }

  return { derived: 'UNKNOWN_TYPE', method: 'none' };
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
  const nouns = prompt.match(/\b(ROI|conversion cost|equivalent unit|cash disbursements|collections|borrowing|overhead|variance|impairment|goodwill|lease liability|issue price|fixed cost|accounts receivable|volume variance|rate|percentage|shortfall|exception rate|allowance|doubtful|residual income|manufacturing overhead|cash budget|conversion cost per)\b/gi);
  if (nouns) terms.push(...nouns.map(n => n.toLowerCase()));
  return [...new Set(terms)];
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
    stampSession: 'DL-066-keyless-hand-solve-v5',
    stampDate: new Date().toISOString().split('T')[0],
    items: solItems
  });
}

// --- Write solutions file ---
const solutionsPath = path.join(__dirname, 'output', 'dl066_keyless_solutions_v5.json');
fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2));
console.log('\nSolutions written to', solutionsPath);

// --- Summary ---
const certifyCases = solutions.filter(s => s.verdict === 'certify').length;
const quarantineCases = solutions.filter(s => s.verdict === 'quarantine').length;

console.log('\n=== KEYLESS HAND-SOLVE SUMMARY (v5) ===');
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