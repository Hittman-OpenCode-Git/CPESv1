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

      const definingMatch = sent.match(/(\w+(?:\s+\w+){0,3})\s*=\s*.*?=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/);
      if (definingMatch) {
        score += 50;
        val = definingMatch[2].replace(/,/g, '');
        if (metricTerms.some(t => definingMatch[1].toLowerCase().includes(t.toLowerCase()))) score += 20;
      }

      const singleEq = sent.match(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/);
      if (singleEq && !definingMatch) {
        score += 25;
        val = singleEq[2].replace(/,/g, '');
        if (metricTerms.some(t => singleEq[1].toLowerCase().includes(t.toLowerCase()))) score += 20;
      }

      const totalMatch = sent.match(/\b(?:total|required|ending|final|balance)\s+\w+\s*=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/i);
      if (totalMatch && !val) { score += 30; val = totalMatch[1].replace(/,/g, ''); }

      const roundedMatch = sent.match(/rounded\s+to\s+\d+[^:]*:\s*(\d+(?:\.\d+)?)/i);
      if (roundedMatch) { score += 40; val = roundedMatch[1]; }

      const ppMatch = sent.match(/\b(\d+(?:\.\d+)?)\s*percentage\s+points?\b/i);
      if (ppMatch && prompt.toLowerCase().includes('percentage points')) { score += 45; val = ppMatch[1]; }

      const pctMatch = sent.match(/\b(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer)/i);
      if (pctMatch) { score += 35; val = pctMatch[1]; }

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
      if (prompt.toLowerCase().includes('whole number') && bestVal.includes('.')) {
        const pctMatch = expl.match(new RegExp(`${bestVal.replace('.', '\\.')}\\s*=\\s*(\\d+)\\s*%`));
        if (pctMatch) bestVal = pctMatch[1];
      }
      if ((prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate')) && parseFloat(bestVal) < 1) {
        const pctMatch = expl.match(/\b(\d+(?:\.\d+)?)\s*%\b/);
        if (pctMatch) bestVal = pctMatch[1];
      }
      return { derived: bestVal, method: bestMethod };
    }

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

  // ===== SELECT / MULTI =====
  if (type === 'select' || type === 'multi') {
    const choices = item.Choices || [];
    const isMulti = type === 'multi';
    const selected = [];

    // For each choice, extract the KEY CONCEPT (text before dash/em-dash)
    const choiceConcepts = choices.map(c => {
      const dashIdx = c.indexOf('—');
      const dashIdx2 = c.indexOf('-');
      const dashIdx3 = c.indexOf(':');
      let idx = -1;
      if (dashIdx >= 0) idx = dashIdx;
      if (dashIdx2 >= 0 && (idx === -1 || dashIdx2 < idx)) idx = dashIdx2;
      if (dashIdx3 >= 0 && (idx === -1 || dashIdx3 < idx)) idx = dashIdx3;
      return idx > 0 ? c.substring(0, idx).trim() : c.substring(0, 40).trim();
    });

    // Analyze each choice in the explanation
    for (let i = 0; i < choices.length; i++) {
      const concept = choiceConcepts[i].toLowerCase();
      const fullChoice = choices[i].toLowerCase();
      
      // Find mentions of this concept in explanation
      const mentions = [];
      let searchIdx = 0;
      while (true) {
        const idx = expl.toLowerCase().indexOf(concept, searchIdx);
        if (idx === -1) break;
        mentions.push(idx);
        searchIdx = idx + concept.length;
      }

      // Also search for key distinctive words from the choice
      const distinctiveWords = fullChoice.split(/\s+/).filter(w => w.length > 4 && !/^(the|and|for|with|from|this|that|would|could|should|will|does|have|has|been|were|are|was|been|being|into|onto|upon|over|under|above|below|between|among|through|during|before|after|since|until|while|when|where|which|who|whom|whose|what|how|why|then|than|there|here|their|they|them|these|those|such|each|every|any|all|some|many|few|more|most|less|least|much|many|more|most)$/.test(w));
      
      let endorsementScore = 0;
      let refutationScore = 0;

      for (const mentionIdx of mentions) {
        const before = expl.substring(Math.max(0, mentionIdx - 100), mentionIdx).toLowerCase();
        const after = expl.substring(mentionIdx, mentionIdx + 200).toLowerCase();
        const context = before + after;

        // Refutation patterns
        if (/(rules?\s+out|are incorrect|is incorrect|wrong|false|not\s+(?:the|a|an)|eliminate|reject|exclude|degradation|loophole|not\s+included|would\s+require|requires)/.test(context)) {
          refutationScore += 2;
        }
        // Endorsement patterns
        if (/(enable|enable[s]?|is|triggering|classification|correct|right|accurate|valid|true|should|would improve|addresses|mitigates|removes|extends|transforms|blocks|stops|closes|spreading effect|set before|always included|equals|represents|means|indicates)/.test(context)) {
          endorsementScore += 1;
        }
        // Strong endorsement: "X enables Y" or "X is Y" 
        if (new RegExp(`${escapeRegExp(concept.substring(0, 20))}\\s+(?:enable|enables|is|represents|means|indicates|triggers)`).test(context)) {
          endorsementScore += 3;
        }
        // Strong refutation: "X rules out Y" or "X is not Y"
        if (new RegExp(`${escapeRegExp(concept.substring(0, 20))}\\s+(?:rules?\\s+out|is\\s+not|are\\s+not|incorrect)`).test(context)) {
          refutationScore += 3;
        }
      }

      // Also check distinctive words
      for (const word of distinctiveWords.slice(0, 3)) {
        const idx = expl.toLowerCase().indexOf(word);
        if (idx >= 0) {
          const context = expl.substring(Math.max(0, idx - 80), idx + 150).toLowerCase();
          if (/(rules?\s+out|incorrect|wrong|false|not|eliminate)/.test(context)) refutationScore += 1;
          if (/(enable|enables|is|represents|means|correct|true|valid)/.test(context)) endorsementScore += 1;
        }
      }

      // Check for explicit letter references
      const letter = String.fromCharCode(65 + i);
      if (new RegExp(`\\b(?:choice|option|statement)\\s+${letter}\\b.*\\b(?:correct|right|accurate|true|valid|enable|triggering)\\b`, 'i').test(expl)) endorsementScore += 5;
      if (new RegExp(`\\b(?:choice|option|statement)\\s+${letter}\\b.*\\b(?:incorrect|wrong|false|not|eliminate|rules?\\s+out)\\b`, 'i').test(expl)) refutationScore += 5;

      // Check explicit "correct choices are A, B, C"
      if (new RegExp(`\\b(?:correct|select)\\s+(?:choices?|options?|statements?)\\s+[^.]*${letter}`, 'i').test(expl)) endorsementScore += 5;

      // Decision logic
      if (refutationScore > endorsementScore) {
        // Refuted - not selected (for multi) or wrong (for select)
      } else if (endorsementScore > 0 || (endorsementScore === 0 && refutationScore === 0 && mentions.length > 0)) {
        // Endorsed or mentioned positively/neutrally
        selected.push(i + 1);
      }
    }

    // Special handling for select: should have exactly 1
    if (!isMulti) {
      if (selected.length === 1) {
        return { derived: String(selected[0]), method: 'concept-analysis', choice: choices[selected[0]-1] };
      }
      // If multiple, pick the one with strongest endorsement
      if (selected.length > 1) {
        // Re-score with more detail
        let bestIdx = -1, bestScore = -1;
        for (const idx of selected) {
          const concept = choiceConcepts[idx-1].toLowerCase();
          const mentions = [];
          let si = 0;
          while (true) {
            const m = expl.toLowerCase().indexOf(concept, si);
            if (m === -1) break;
            mentions.push(m);
            si = m + concept.length;
          }
          let score = 0;
          for (const m of mentions) {
            const ctx = expl.substring(Math.max(0, m - 100), m + 200).toLowerCase();
            if (/(enable|enables|triggering|classification|is\s+the|represents|means)/.test(ctx)) score += 3;
            if (/(rules?\s+out|incorrect|wrong|false)/.test(ctx)) score -= 3;
          }
          if (score > bestScore) { bestScore = score; bestIdx = idx; }
        }
        if (bestIdx > 0) return { derived: String(bestIdx), method: 'concept-analysis-best', choice: choices[bestIdx-1] };
      }
      return { derived: 'EXTRACT_FAILED', method: 'none', note: `Select: ${selected.length} candidates from ${choices.length}; ${expl.substring(0, 200)}` };
    }

    // Multi: return all selected
    if (selected.length > 0 && selected.length <= choices.length) {
      return { derived: selected.sort((a,b) => a-b).join(','), method: 'concept-analysis', selected };
    }

    // Fallback: explicit "correct choices are A, B, C"
    let m = expl.match(/(?:correct\s+(?:choices?|options?|answers?|statements?)|select)\s+([A-E](?:\s*[,;]\s*[A-E])*)/i);
    if (m) {
      const letters = m[1].split(/[,;]\s*/).filter(l => l.match(/^[A-E]$/i));
      const sel = [];
      for (const l of letters) {
        const idx = l.toUpperCase().charCodeAt(0) - 65;
        if (idx >= 0 && idx < choices.length && !sel.includes(idx + 1)) sel.push(idx + 1);
      }
      if (sel.length > 0) return { derived: sel.sort((a,b)=>a-b).join(','), method: 'explicit-list', selected: sel };
    }

    // Fallback: infer from refuted
    const refuted = [];
    for (let i = 0; i < choices.length; i++) {
      const concept = choiceConcepts[i].toLowerCase();
      const idx = expl.toLowerCase().indexOf(concept);
      if (idx >= 0) {
        const context = expl.substring(Math.max(0, idx - 80), idx + 200).toLowerCase();
        if (/(incorrect|wrong|false|not|eliminate|degradation|loophole|not included)/.test(context)) refuted.push(i);
      }
    }
    if (refuted.length > 0 && refuted.length < choices.length) {
      const sel = [];
      for (let i = 0; i < choices.length; i++) if (!refuted.includes(i)) sel.push(i + 1);
      if (sel.length > 0) return { derived: sel.sort((a,b)=>a-b).join(','), method: 'infer-from-refuted', selected: sel };
    }

    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Multi: ${selected.length} selected from ${choices.length}; ${expl.substring(0, 200)}` };
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
    stampSession: 'DL-066-keyless-hand-solve-v6',
    stampDate: new Date().toISOString().split('T')[0],
    items: solItems
  });
}

// --- Write solutions file ---
const solutionsPath = path.join(__dirname, 'output', 'dl066_keyless_solutions_v6.json');
fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2));
console.log('\nSolutions written to', solutionsPath);

// --- Summary ---
const certifyCases = solutions.filter(s => s.verdict === 'certify').length;
const quarantineCases = solutions.filter(s => s.verdict === 'quarantine').length;

console.log('\n=== KEYLESS HAND-SOLVE SUMMARY (v6) ===');
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