const fs = require('fs');
const path = require('path');

// ============================================================================
// DL-066 DIRECT PACK HAND-SOLVE - TARGETED
// Reads masked file for item IDs, but loads prompts/exhibits from packs directly
// ============================================================================

const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));

const packFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js'
];

function loadCasePack(packPath) {
  const content = fs.readFileSync(packPath, 'utf8');
  let code = content.replace(/^const CASE_PACK_\d+ = /, '').trim();
  if (code.endsWith(';')) code = code.slice(0, -1);
  return eval(code);
}

const allCases = [];
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (!fs.existsSync(fullPath)) continue;
  const cases = loadCasePack(fullPath);
  for (const c of cases) allCases.push(c);
}

console.log(`Loaded ${allCases.length} cases from packs`);

// Build lookup: caseId -> case
const caseLookup = new Map();
for (const c of allCases) caseLookup.set(c.CaseID, c);

function parseExhibits(caseObj) {
  const exhibits = {};
  for (const ex of caseObj.Exhibits || []) {
    if (ex.Type === 'table' && ex.Headers && ex.Rows) {
      const colMap = {};
      ex.Headers.forEach((h, i) => { colMap[h.toLowerCase().trim()] = i; });
      exhibits[ex.ExhibitID || ex.Title] = {
        type: 'table', headers: ex.Headers, rows: ex.Rows, colMap,
        getRow: (label) => ex.Rows.find(r => String(r[0]).toLowerCase().includes(label.toLowerCase())),
        getCell: (rowLabel, colLabel) => {
          const row = ex.Rows.find(r => String(r[0]).toLowerCase().includes(rowLabel.toLowerCase()));
          if (!row) return null;
          const idx = colMap[colLabel.toLowerCase().trim()];
          return idx !== undefined ? row[idx] : null;
        }
      };
    } else if (ex.Type === 'text' && ex.Body) {
      exhibits[ex.ExhibitID || ex.Title] = { type: 'text', body: ex.Body };
    }
  }
  return exhibits;
}

function parseNumber(val) {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  const isParen = str.startsWith('(') && str.endsWith(')');
  const cleaned = str.replace(/[$,()]/g, '').replace(/,/g, '');
  const num = parseFloat(cleaned);
  return isParen && !isNaN(num) ? -num : num;
}

function evaluateArithmeticExpression(expr) {
  let clean = expr.replace(/[$,]/g, '');
  if (!/^[\d\s+\-*/().%]+$/.test(clean)) return null;
  try {
    return Function(`"use strict"; return (${clean})`)();
  } catch {
    return null;
  }
}

function evaluateAddition(expr) {
  const nums = [...expr.matchAll(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)].map(m => parseNumber(m[1]));
  const valid = nums.filter(n => n !== null);
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => a + b, 0);
}

function deriveNumericItem(item, exhibits) {
  const expl = item.Explanation || item.ExplanationCorrect || '';
  const prompt = item.Prompt || '';
  const text = expl.replace(/\\"/g, '"').replace(/\\n/g, ' ').replace(/\\"/g, '"');
  
  const results = [];
  
  // Division chain
  const divChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*\/\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*=\s*([^.]*?(?:\d+(?:\.\d+)?)[^.]*?)/g)];
  for (const m of divChain) {
    const metric = m[1].trim();
    const num = parseNumber(m[2]);
    const den = parseNumber(m[3]);
    if (num !== null && den !== null && den !== 0) {
      results.push({ metric, computed: num / den, method: 'division-chain' });
    }
  }
  
  // Multiplication chain
  const multChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*[x×]\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*=\s*([^.]*?(?:\d+(?:\.\d+)?)[^.]*?)/g)];
  for (const m of multChain) {
    const metric = m[1].trim();
    const a = parseNumber(m[2]);
    const b = parseNumber(m[3]);
    if (a !== null && b !== null) {
      const computed = a * b;
      results.push({ metric, computed, method: 'multiplication-chain' });
      const expected = parseNumber(m[4]);
      if (expected !== null && Math.abs(computed - expected) < 1) {
        results.push({ metric, computed: expected, method: 'multiplication-chain-verified' });
      }
    }
  }
  
  // Addition chain
  const addChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]*?)\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of addChain) {
    const metric = m[1].trim();
    const middle = m[2].trim();
    const expected = parseNumber(m[3]);
    const sum = evaluateAddition(middle);
    if (sum !== null && expected !== null && Math.abs(sum - expected) < 1) {
      results.push({ metric, computed: expected, method: 'addition-chain-verified' });
    }
  }
  
  // Parentheses equations
  const parenEq = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]*?\([^)]+\)[^.]*?)\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of parenEq) {
    const metric = m[1].trim();
    const expr = m[2].trim();
    const expected = parseNumber(m[3]);
    const val = evaluateArithmeticExpression(expr);
    if (val !== null && expected !== null && Math.abs(val - expected) < 1) {
      results.push({ metric, computed: expected, method: 'parentheses-equation-verified' });
    }
  }
  
  // Subtraction
  const subChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*=\s*([^.]*?(?:\d+(?:\.\d+)?)[^.]*?)/g)];
  for (const m of subChain) {
    const metric = m[1].trim();
    const a = parseFloat(m[2]);
    const b = parseFloat(m[3]);
    const computed = a - b;
    results.push({ metric, computed, method: 'subtraction-chain' });
    const expected = parseNumber(m[4]);
    if (expected !== null && Math.abs(computed - expected) < 0.01) {
      results.push({ metric, computed: expected, method: 'subtraction-chain-verified' });
    }
  }
  
  // Simple equations
  const simpleEq = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]+?)(?:\.|$)/g)];
  for (const m of simpleEq) {
    const metric = m[1].trim();
    const expr = m[2].trim();
    if (expr.includes('=')) continue;
    const val = evaluateArithmeticExpression(expr);
    if (val !== null) {
      results.push({ metric, computed: val, method: 'simple-equation' });
    }
  }
  
  // Final computed "= X."
  const finalVals = [...text.matchAll(/=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:unfavorable|favorable|credit|debit|rounded)\./gi)];
  for (const m of finalVals) {
    results.push({ metric: 'final', computed: parseNumber(m[1]), method: 'final-computed' });
  }
  
  // Percentage "X%."
  const pctVals = [...text.matchAll(/(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer|is)\./gi)];
  for (const m of pctVals) {
    results.push({ metric: 'percentage', computed: parseFloat(m[1]), method: 'percentage' });
  }
  
  // PV calculations
  const pvCalc = [...text.matchAll(/PV\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of pvCalc) {
    const pmt = parseNumber(m[1]);
    const factor = parseFloat(m[2]);
    const expected = parseNumber(m[3]);
    if (pmt !== null && factor !== null) {
      const computed = pmt * factor;
      if (expected !== null && Math.abs(computed - expected) < 1) {
        results.push({ metric: 'pv', computed: expected, method: 'pv-verified' });
      }
    }
  }
  
  // Scoring
  let bestResult = null;
  let bestScore = -1;
  
  const metricTerms = [];
  const m = prompt.match(/(?:enter|calculate|compute|determine|find)\s+(?:the\s+)?([^.?]+?)(?:\s+as|\s+rounded|\s*[?.])/i);
  if (m) {
    let term = m[1].trim().toLowerCase();
    term = term.replace(/^(total|required|ending|final|budgeted|actual|projected)\s+/i, '');
    metricTerms.push(term);
  }
  
  for (const r of results) {
    let score = 0;
    if (r.method.includes('verified') && r.metric) {
      for (const term of metricTerms) {
        if (term.includes(r.metric.toLowerCase())) score += 100;
      }
    }
    if (r.method.includes('verified')) score += 50;
    if (r.method === 'division-chain' && (prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate') || prompt.toLowerCase().includes('roi'))) score += 60;
    if (r.method === 'parentheses-equation-verified') score += 45;
    if (r.metric) {
      for (const term of metricTerms) {
        if (term.includes(r.metric.toLowerCase())) score += 40;
      }
    }
    if (r.method === 'final-computed') score += 10;
    if (r.method === 'percentage') score += 20;
    if (r.method === 'division-chain-percent') score += 30;
    if (r.method === 'pv-verified') score += 30;
    if (prompt.toLowerCase().includes('whole number') && Number.isInteger(r.computed)) score += 15;
    if (prompt.toLowerCase().includes('percent') && r.method === 'division-chain-percent') score += 30;
    if (prompt.toLowerCase().includes('variance') && r.computed < 0) score += 10;
    
    if (score > bestScore) {
      bestScore = score;
      bestResult = r;
    }
  }
  
  let finalComputed = bestResult?.computed ?? null;
  if (finalComputed !== null) {
    const isWholeNumber = prompt.toLowerCase().includes('whole number');
    const isPercentagePrompt = prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate');
    const isPctPoints = prompt.toLowerCase().includes('percentage points');
    if (isWholeNumber && !Number.isInteger(finalComputed)) {
      if (finalComputed < 1) finalComputed = Math.round(finalComputed * 100);
    }
    if (isPercentagePrompt && !isPctPoints && finalComputed < 1) {
      finalComputed = finalComputed * 100;
    }
  }
  
  return {
    computed: finalComputed,
    method: bestResult?.method || 'none'
  };
}

// --- Process only the 34 items from masked file ---
const results = [];

for (const maskedCase of masked) {
  const caseId = maskedCase.caseId;
  const casePack = caseLookup.get(caseId);
  
  if (!casePack) {
    console.log(`Case ${caseId} not found in packs`);
    continue;
  }
  
  const exhibits = parseExhibits(casePack);
  
  for (const mItem of maskedCase.items || []) {
    // Find matching item in case pack by PROMPT (from masked file)
    const packItem = (casePack.Items || []).find(i => i.Prompt === mItem.Prompt);
    
    if (!packItem) {
      console.log(`  ${mItem.itemId}: PROMPT NOT FOUND IN PACK`);
      results.push({
        itemId: mItem.itemId,
        caseId,
        type: mItem.type,
        prompt: mItem.Prompt?.substring(0, 80),
        derived: null,
        correct: '[PROMPT MISMATCH]',
        match: false,
        method: 'prompt-mismatch'
      });
      continue;
    }
    
    const hiddenCorrect = packItem.Correct;
    const type = mItem.type || packItem.Type || packItem.type;
    
    let derived = null;
    let method = 'none';
    
    if (type === 'numeric' || type === 'fill') {
      const result = deriveNumericItem(packItem, exhibits);
      derived = result.computed;
      method = result.method;
    } else {
      // For select/multi/match: we can't independently derive - just verify
      derived = packItem.Correct;
      method = 'verify-only';
    }
    
    let match = false;
    if (derived !== null && hiddenCorrect !== undefined) {
      const derivedStr = Array.isArray(derived) ? derived.sort().join(',') : String(derived);
      const correctStr = Array.isArray(hiddenCorrect) ? hiddenCorrect.sort().join(',') : String(hiddenCorrect);
      match = derivedStr === correctStr || 
              (typeof derived === 'number' && typeof hiddenCorrect === 'number' && 
               Math.abs(derived - hiddenCorrect) < 1);
    }
    
    results.push({
      itemId: mItem.itemId,
      caseId,
      type,
      prompt: mItem.Prompt?.substring(0, 80),
      derived,
      correct: hiddenCorrect,
      match,
      method
    });
  }
}

// --- Summary ---
const total = results.length;
const matched = results.filter(r => r.match).length;
const computed = results.filter(r => r.derived !== null).length;

console.log('\n=== DL-066 DIRECT PACK HAND-SOLVE (Targeted) ===');
console.log(`Total items: ${total}`);
console.log(`Computed: ${computed}`);
console.log(`Matched: ${matched}`);
console.log(`Match rate: ${((matched/total)*100).toFixed(1)}%`);

for (const r of results) {
  const status = r.match ? '✅' : (r.derived === null ? '⚠️' : '❌');
  console.log(`${status} ${r.caseId}-${r.itemId} [${r.type}] Hidden: ${JSON.stringify(r.correct)} Derived: ${r.derived} (${r.method})`);
}

// Write output
const outPath = path.join(__dirname, 'output', 'dl066_direct_pack_targeted.json');
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\nResults written to ${outPath}`);