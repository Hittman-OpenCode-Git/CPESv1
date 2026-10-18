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
    // Strategy: Find the FINAL computed answer, not intermediate steps
    // Look for patterns indicating final answer

    // Pattern 1: Explicit "Answer: X" or "The answer is X"
    let m = expl.match(/(?:^|\.|\n)\s*(?:the\s+)?(?:answer|result|final\s+(?:answer|result)|correct\s+(?:answer|value))\s*(?:is|=|:)\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/i);
    if (m) return { derived: m[1].replace(/,/g, ''), method: 'explicit-answer' };

    // Pattern 2: "= X" at end of sentence or before period (final equals)
    // But avoid intermediate calculations - look for the LAST equals that gives a clean result
    const equalsMatches = [...expl.matchAll(/=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/g)];
    if (equalsMatches.length > 0) {
      // Take the LAST equals match that isn't part of a multi-step calc
      // Check if it's followed by % or "percentage points" etc
      for (let i = equalsMatches.length - 1; i >= 0; i--) {
        const match = equalsMatches[i];
        const after = expl.substring(match.index + match[0].length, match.index + match[0].length + 30);
        // Skip if it's clearly intermediate (followed by more math operators)
        if (!after.match(/^[\s]*[+\-*/]/)) {
          let val = match[1].replace(/,/g, '');
          // If prompt asks for percentage and value is decimal, check for percentage form
          if ((prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate')) && parseFloat(val) < 1) {
            // Look for percentage version nearby
            const pctMatch = after.match(/(\d+(?:\.\d+)?)\s*%/);
            if (pctMatch) val = pctMatch[1];
          }
          return { derived: val, method: 'final-equals' };
        }
      }
    }

    // Pattern 3: "X percentage points" or "X%" explicitly stated as final
    m = expl.match(/(\d+(?:\.\d+)?)\s*percentage\s+points?\.?\s*(?:$|[^.]*?\.)/i);
    if (m) return { derived: m[1], method: 'percentage-points' };

    m = expl.match(/(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer|result)/i);
    if (m) return { derived: m[1], method: 'final-percent' };

    // Pattern 4: Rounded to N decimal places
    m = expl.match(/rounded\s+to\s+\d+\s+decimal\s+places?:\s*(\d+(?:\.\d+)?)/i);
    if (m) return { derived: m[1], method: 'rounded-explicit' };

    // Pattern 5: "is X" or "equals X" (not part of formula)
    m = expl.match(/\b(?:is|equals|yields?|results?\s+in|computes?\s+to)\s+\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b(?!\s*[+\-*/])/i);
    if (m) return { derived: m[1].replace(/,/g, ''), method: 'is-equals-final' };

    // Pattern 6: For whole number prompts, look for integer at end
    if (prompt.toLowerCase().includes('whole number')) {
      m = expl.match(/=\s*(\d+)\s*[%.]?\s*(?:\.|$)/);
      if (m) return { derived: m[1], method: 'whole-number-final' };
    }

    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Could not extract from: ${expl.substring(0, 300)}` };
  }

  // ===== SELECT =====
  if (type === 'select') {
    const choices = item.Choices || [];

    // Pattern 1: Explicit "The correct answer is Choice X" or "Choice X is correct"
    let m = expl.match(/(?:correct\s+answer|answer\s+is)\s+(?:choice\s+)?([A-E])/i);
    if (m) {
      const idx = m[1].toUpperCase().charCodeAt(0) - 65;
      if (idx >= 0 && idx < choices.length) return { derived: String(idx + 1), method: 'explicit-correct-choice', choice: choices[idx] };
    }

    // Pattern 2: "Choice X" or "Option X" endorsed
    for (let i = 0; i < choices.length; i++) {
      const letter = String.fromCharCode(65 + i);
      const patterns = [
        new RegExp(`\\b(?:choice|option|answer)\\s+${letter}\\b.*\\b(?:correct|right|accurate)\\b`, 'i'),
        new RegExp(`\\b(?:choice|option)\\s+${letter}\\b(?:\\s+is\\s+)?(?:correct|the\\s+answer)`, 'i'),
      ];
      if (patterns.some(p => p.test(expl))) {
        return { derived: String(i + 1), method: 'choice-endorsed', choice: choices[i] };
      }
    }

    // Pattern 3: Choice text explicitly endorsed in explanation
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      const keyPhrase = choice.substring(0, 40).toLowerCase();
      // Check if this choice text appears in explanation in a positive context
      const idx = expl.toLowerCase().indexOf(keyPhrase);
      if (idx >= 0) {
        // Check context - is it refuted?
        const before = expl.substring(Math.max(0, idx - 50), idx).toLowerCase();
        const after = expl.substring(idx, idx + 100).toLowerCase();
        const refuted = /(incorrect|wrong|not|eliminate|reject|exclude|false|mistake|error)/.test(before + after);
        if (!refuted) {
          return { derived: String(i + 1), method: 'choice-text-endorsed', choice };
        }
      }
    }

    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Could not identify choice from: ${expl.substring(0, 300)}` };
  }

  // ===== MULTI =====
  if (type === 'multi') {
    const choices = item.Choices || [];
    const selected = [];

    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      const keyPhrase = choice.substring(0, 40).toLowerCase();
      const idx = expl.toLowerCase().indexOf(keyPhrase);
      if (idx >= 0) {
        const before = expl.substring(Math.max(0, idx - 50), idx).toLowerCase();
        const after = expl.substring(idx, idx + 100).toLowerCase();
        const refuted = /(incorrect|wrong|not|eliminate|reject|exclude|false|mistake|error)/.test(before + after);
        if (!refuted) {
          selected.push(i + 1);
        }
      }
    }

    // Also check for explicit "Choices A, B, C" or "Options 1, 2, 3" patterns
    const explicitMulti = expl.match(/(?:correct\s+(?:choices|options|answers)|select)\s+([A-E](?:\s*,\s*[A-E])*)/i);
    if (explicitMulti && selected.length === 0) {
      const letters = explicitMulti[1].split(/[, ]+/).filter(l => l.match(/^[A-E]$/i));
      for (const l of letters) {
        const idx = l.toUpperCase().charCodeAt(0) - 65;
        if (idx >= 0 && idx < choices.length && !selected.includes(idx + 1)) {
          selected.push(idx + 1);
        }
      }
    }

    if (selected.length > 0) {
      return { derived: selected.sort((a,b) => a-b).join(','), method: 'choices-endorsed', selected };
    }
    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Could not identify choices from: ${expl.substring(0, 300)}` };
  }

  // ===== MATCH =====
  if (type === 'match') {
    const pairs = [];
    // Look for "Left -> Right" or "Left: Right" patterns
    const lines = expl.split(/[;\n]/);
    for (const line of lines) {
      let m = line.match(/([A-Z][^:->]*?)\s*[->:]\s*([^;,\n]+)/);
      if (m) {
        pairs.push(`${m[1].trim()}->${m[2].trim()}`);
      }
    }
    if (pairs.length > 0) {
      return { derived: pairs.join(';'), method: 'pair-extraction', pairs };
    }
    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Could not extract pairs from: ${expl.substring(0, 300)}` };
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
    stampSession: 'DL-066-keyless-hand-solve-v2',
    stampDate: new Date().toISOString().split('T')[0],
    items: solItems
  });
}

// --- Write solutions file ---
const solutionsPath = path.join(__dirname, 'output', 'dl066_keyless_solutions_v2.json');
fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2));
console.log('\nSolutions written to', solutionsPath);

// --- Summary ---
const certifyCases = solutions.filter(s => s.verdict === 'certify').length;
const quarantineCases = solutions.filter(s => s.verdict === 'quarantine').length;

console.log('\n=== KEYLESS HAND-SOLVE SUMMARY (v2) ===');
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

// --- Method breakdown ---
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