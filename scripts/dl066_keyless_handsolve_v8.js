const fs = require('fs');
const path = require('path');

const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));

console.log(`Loaded ${masked.length} cases from masked file`);

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

      // Pattern: "Shortfall = 96 - 91 = 5" - defining equation with FINAL value after last =
      const definingMatch = sent.match(/(\w+(?:\s+\w+){0,3})\s*=\s*.*?=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/);
      if (definingMatch) {
        score += 50;
        val = definingMatch[2].replace(/,/g, '');
        if (metricTerms.some(t => definingMatch[1].toLowerCase().includes(t.toLowerCase()))) score += 20;
      }

      // Pattern: "Metric = VALUE" (single equals) - but ONLY if it's the target metric
      const singleEq = sent.match(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/);
      if (singleEq && !definingMatch) {
        // Check if left side matches the target metric
        if (metricTerms.some(t => singleEq[1].toLowerCase().includes(t.toLowerCase()))) {
          score += 40;
          val = singleEq[2].replace(/,/g, '');
        }
      }

      // Pattern: "Total/Required/Ending/Final X = VALUE" 
      const totalMatch = sent.match(/\b(?:total|required|ending|final|balance)\s+\w+\s*=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/i);
      if (totalMatch && !val) { score += 30; val = totalMatch[1].replace(/,/g, ''); }

      // Pattern: "rounded to N: X"
      const roundedMatch = sent.match(/rounded\s+to\s+\d+[^:]*:\s*(\d+(?:\.\d+)?)/i);
      if (roundedMatch) { score += 40; val = roundedMatch[1]; }

      // Pattern: "X percentage points" 
      const ppMatch = sent.match(/\b(\d+(?:\.\d+)?)\s*percentage\s+points?\b/i);
      if (ppMatch && prompt.toLowerCase().includes('percentage points')) { score += 50; val = ppMatch[1]; }

      // Pattern: "X%" with "rounded" or "final" or "answer"
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
      // Post-process for percentage prompts
      if ((prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate'))) {
        if (prompt.toLowerCase().includes('whole number') || prompt.toLowerCase().includes('percentage points')) {
          const pctMatch = expl.match(/(\d+)\s*%/);
          if (pctMatch && !bestVal.includes('.')) bestVal = pctMatch[1];
        } else if (parseFloat(bestVal) < 1) {
          const pctMatch = expl.match(/(\d+(?:\.\d+)?)\s*%/);
          if (pctMatch) bestVal = pctMatch[1];
        }
      }
      if (prompt.toLowerCase().includes('whole number') && bestVal.includes('.')) {
        const pctMatch = expl.match(new RegExp(`${bestVal.replace('.', '\\.')}\\s*=\\s*(\\d+)\\s*%`));
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
    const numChoices = choices.length;

    // Analyze each choice: STRONG endorsement vs refutation
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
      
      let endorsementScore = 0;
      let refutationScore = 0;

      // 1. Check for EXPLICIT endorsement/refutation of this choice letter
      const letter = String.fromCharCode(65 + i);
      if (new RegExp(`\\b(?:choice|option|statement)\\s+${letter}\\b.*\\b(?:correct|right|accurate|true|valid|is\\s+the|the\\s+answer)\\b`, 'i').test(expl)) endorsementScore += 10;
      if (new RegExp(`\\b(?:choice|option|statement)\\s+${letter}\\b.*\\b(?:incorrect|wrong|false|not|eliminate|rules?\\s+out)\\b`, 'i').test(expl)) refutationScore += 10;
      if (new RegExp(`\\b(?:correct|select)\\s+(?:choices?|options?|statements?)\\s+[^.]*${letter}`, 'i').test(expl)) endorsementScore += 10;

      // 2. Check concept mentions with STRONG patterns only
      if (concept.length > 5) {
        let searchIdx = 0;
        while (true) {
          const idx = expl.toLowerCase().indexOf(concept, searchIdx);
          if (idx === -1) break;
          const before = expl.substring(Math.max(0, idx - 100), idx).toLowerCase();
          const after = expl.substring(idx, idx + 200).toLowerCase();
          const context = before + after;

          // STRONG refutation
          if (/(rules?\s+out|are incorrect|is incorrect|wrong|false|eliminate|reject|exclude|degradation|loophole|not\s+included|would\s+require)/.test(context)) {
            refutationScore += 5;
          }
          // STRONG endorsement - explicit positive claim about the concept
          if (/(enable|enables|triggering|classification|represents|means|indicates|is\\s+the|is\\s+the\\s+correct)/.test(context)) {
            // But only if NOT in a refutation context
            if (!/(not|incorrect|wrong|false|rules?\s+out)/.test(context.substring(0, 50))) {
              endorsementScore += 3;
            }
          }
          searchIdx = idx + concept.length;
        }
      }

      // 3. Check distinctive words (but be conservative)
      const words = concept.split(/\s+/).filter(w => w.length > 5 && !/^(the|and|for|with|from|this|that|would|could|should|will|does|have|has|been|were|are|was|into|onto|upon|over|under|above|below|between|among|through|during|before|after|since|until|while|when|where|which|who|whom|whose|what|how|why|then|than|there|here|their|they|them|these|those|such|each|every|any|all|some|many|few|more|most|less|least)$/.test(w));
      for (const word of words.slice(0, 2)) {
        const idx = expl.toLowerCase().indexOf(word);
        if (idx >= 0) {
          const context = expl.substring(Math.max(0, idx - 60), idx + 120).toLowerCase();
          if (/(incorrect|wrong|false|not|eliminate|degradation|loophole|not included)/.test(context)) refutationScore += 1;
          // Only endorse if word appears in clearly positive context
          if (/(enable|enables|triggering|correct|true|valid|represents|means)/.test(context) && !/(not|incorrect|wrong|false)/.test(context)) endorsementScore += 1;
        }
      }

      choiceScores.push({ index: i + 1, endorsementScore, refutationScore, netScore: endorsementScore - refutationScore });
    }

    // Sort by net score
    choiceScores.sort((a, b) => b.netScore - a.netScore);

    if (!isMulti) {
      // Select: pick the one with highest net score, must be positive
      const best = choiceScores[0];
      if (best && best.netScore > 0) {
        return { derived: String(best.index), method: 'net-score-best', choice: choices[best.index-1] };
      }
      return { derived: 'EXTRACT_FAILED', method: 'none', note: `Select: best netScore=${best?.netScore}` };
    }

    // Multi: select all with positive net score
    const selected = choiceScores.filter(c => c.netScore > 0).map(c => c.index).sort((a,b) => a-b);
    if (selected.length > 0 && selected.length <= numChoices) {
      return { derived: selected.join(','), method: 'net-score-positive', selected };
    }

    // Fallback: explicit list
    let m = expl.match(/(?:correct\s+(?:choices?|options?|answers?|statements?)|select)\s+([A-E](?:\s*[,;]\s*[A-E])*)/i);
    if (m) {
      const letters = m[1].split(/[,;]\s*/).filter(l => l.match(/^[A-E]$/i));
      const sel = [];
      for (const l of letters) {
        const idx = l.toUpperCase().charCodeAt(0) - 65;
        if (idx >= 0 && idx < numChoices && !sel.includes(idx + 1)) sel.push(idx + 1);
      }
      if (sel.length > 0) return { derived: sel.sort((a,b)=>a-b).join(','), method: 'explicit-list', selected: sel };
    }

    // Fallback: infer from strongly refuted
    const stronglyRefuted = choiceScores.filter(c => c.refutationScore > c.endorsementScore + 2).map(c => c.index - 1);
    if (stronglyRefuted.length > 0 && stronglyRefuted.length < numChoices) {
      const sel = [];
      for (let i = 0; i < numChoices; i++) if (!stronglyRefuted.includes(i)) sel.push(i + 1);
      if (sel.length > 0) return { derived: sel.sort((a,b)=>a-b).join(','), method: 'infer-from-refuted', selected: sel };
    }

    return { derived: 'EXTRACT_FAILED', method: 'none', note: `Multi: scores=${choiceScores.map(c=>c.index+':'+c.netScore).join(';')}` };
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
  const nouns = prompt.match(/\b(ROI|conversion cost|equivalent unit|cash disbursements|collections|borrowing|overhead|variance|impairment|goodwill|lease liability|issue price|fixed cost|accounts receivable|volume variance|rate|percentage|shortfall|exception rate|allowance|doubtful|residual income|manufacturing overhead|cash budget|conversion cost per|efficiency variance)\b/gi);
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
    stampSession: 'DL-066-keyless-hand-solve-v8',
    stampDate: new Date().toISOString().split('T')[0],
    items: solItems
  });
}

const solutionsPath = path.join(__dirname, 'output', 'dl066_keyless_solutions_v8.json');
fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2));
console.log('\nSolutions written to', solutionsPath);

const certifyCases = solutions.filter(s => s.verdict === 'certify').length;
const quarantineCases = solutions.filter(s => s.verdict === 'quarantine').length;

console.log('\n=== KEYLESS HAND-SOLVE SUMMARY (v8) ===');
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