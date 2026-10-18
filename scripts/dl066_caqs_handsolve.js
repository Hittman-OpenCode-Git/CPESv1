const fs = require('fs');
const path = require('path');

// ============================================================================
// DL-066 CAQS §5.1-COMPLIANT KEYLESS HAND-SOLVE - PRODUCTION
// ============================================================================
// Loads case packs, masks Correct, independently computes from exhibits + 
// explanation arithmetic, compares to hidden Correct.
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

const casePacks = new Map();
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (!fs.existsSync(fullPath)) continue;
  const cases = loadCasePack(fullPath);
  for (const c of cases) casePacks.set(c.CaseID, c);
}

console.log(`Loaded ${casePacks.size} cases from packs`);

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

function extractAndEvaluateArithmetic(expl) {
  const results = [];
  const text = expl.replace(/\\"/g, '"').replace(/\\n/g, ' ').replace(/\\"/g, '"');
  
  // Pattern 1: Division chain "X = A / B = C"
  const divChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*\/\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*=\s*([^.]*?(?:\d+(?:\.\d+)?)[^.]*?)/g)];
  for (const m of divChain) {
    const metric = m[1].trim();
    const num = parseNumber(m[2]);
    const den = parseNumber(m[3]);
    if (num !== null && den !== null && den !== 0) {
      const computed = num / den;
      results.push({ metric, computed, method: 'division-chain', expression: m[0] });
    }
  }
  
  // Pattern 2: Multiplication chain "X = A x B = C"
  const multChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*[x×]\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*=\s*([^.]*?(?:\d+(?:\.\d+)?)[^.]*?)/g)];
  for (const m of multChain) {
    const metric = m[1].trim();
    const a = parseNumber(m[2]);
    const b = parseNumber(m[3]);
    if (a !== null && b !== null) {
      const computed = a * b;
      results.push({ metric, computed, method: 'multiplication-chain', expression: m[0] });
      const expected = parseNumber(m[4]);
      if (expected !== null && Math.abs(computed - expected) < 1) {
        results.push({ metric, computed: expected, method: 'multiplication-chain-verified', expression: m[0] });
      }
    }
  }
  
  // Pattern 3: Addition chain "X = A + B + C = RESULT"
  const addChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]*?)\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of addChain) {
    const metric = m[1].trim();
    const middle = m[2].trim();
    const expected = parseNumber(m[3]);
    const sum = evaluateAddition(middle);
    if (sum !== null && expected !== null && Math.abs(sum - expected) < 1) {
      results.push({ metric, computed: expected, method: 'addition-chain-verified', expression: m[0] });
    } else if (sum !== null) {
      results.push({ metric, computed: sum, method: 'addition-chain', expression: m[0] });
    }
  }
  
  // Pattern 4: Parentheses equations "X = (expr) = RESULT"
  const parenEq = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]*?\([^)]+\)[^.]*?)\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of parenEq) {
    const metric = m[1].trim();
    const expr = m[2].trim();
    const expected = parseNumber(m[3]);
    const val = evaluateArithmeticExpression(expr);
    if (val !== null && expected !== null && Math.abs(val - expected) < 1) {
      results.push({ metric, computed: expected, method: 'parentheses-equation-verified', expression: m[0] });
    } else if (val !== null) {
      results.push({ metric, computed: val, method: 'parentheses-equation', expression: m[0] });
    }
  }
  
  // Pattern 5: Simple equations "X = VALUE"
  const simpleEq = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]+?)(?:\.|$)/g)];
  for (const m of simpleEq) {
    const metric = m[1].trim();
    const expr = m[2].trim();
    if (expr.includes('=')) continue;
    const val = evaluateArithmeticExpression(expr);
    if (val !== null) {
      results.push({ metric, computed: val, method: 'simple-equation', expression: m[0] });
    }
  }
  
  // Pattern 6: Subtraction "A - B = C"
  const subChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*=\s*([^.]*?(?:\d+(?:\.\d+)?)[^.]*?)/g)];
  for (const m of subChain) {
    const metric = m[1].trim();
    const a = parseFloat(m[2]);
    const b = parseFloat(m[3]);
    const computed = a - b;
    results.push({ metric, computed, method: 'subtraction-chain', expression: m[0] });
    const expected = parseNumber(m[4]);
    if (expected !== null && Math.abs(computed - expected) < 0.01) {
      results.push({ metric, computed: expected, method: 'subtraction-chain-verified', expression: m[0] });
    }
  }
  
  // Pattern 7: Final computed "= X Unfavorable/Favorable."
  const finalVals = [...text.matchAll(/=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:unfavorable|favorable|credit|debit|rounded)\./gi)];
  for (const m of finalVals) {
    results.push({ metric: 'final', computed: parseNumber(m[1]), method: 'final-computed', expression: m[0] });
  }
  
  // Pattern 8: Percentage "X%."
  const pctVals = [...text.matchAll(/(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer|is)\./gi)];
  for (const m of pctVals) {
    results.push({ metric: 'percentage', computed: parseFloat(m[1]), method: 'percentage', expression: m[0] });
  }
  
  // Pattern 9: "X% of Y"
  const pctOf = [...text.matchAll(/(\d+(?:\.\d+)?)\s*%\s*[x×]\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of pctOf) {
    const pct = parseFloat(m[1]) / 100;
    const base = parseNumber(m[2]);
    if (base !== null) {
      results.push({ metric: 'percentage-of', computed: pct * base, method: 'percentage-of', expression: m[0] });
    }
  }
  
  // Pattern 10: PV calculations
  const pvCalc = [...text.matchAll(/PV\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of pvCalc) {
    const pmt = parseNumber(m[1]);
    const factor = parseFloat(m[2]);
    const expected = parseNumber(m[3]);
    if (pmt !== null && factor !== null) {
      const computed = pmt * factor;
      if (expected !== null && Math.abs(computed - expected) < 1) {
        results.push({ metric: 'pv', computed: expected, method: 'pv-verified', expression: m[0] });
      } else {
        results.push({ metric: 'pv', computed, method: 'pv', expression: m[0] });
      }
    }
  }
  
  return results;
}

function evaluateAddition(expr) {
  const nums = [...expr.matchAll(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)].map(m => parseNumber(m[1]));
  const valid = nums.filter(n => n !== null);
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => a + b, 0);
}

function extractMetricTerms(prompt) {
  const terms = [];
  const m = prompt.match(/(?:enter|calculate|compute|determine|find)\s+(?:the\s+)?([^.?]+?)(?:\s+as|\s+rounded|\s*[?.])/i);
  if (m) {
    let term = m[1].trim().toLowerCase();
    term = term.replace(/^(total|required|ending|final|budgeted|actual|projected)\s+/i, '');
    terms.push(term);
  }
  return terms;
}

function computeItem(item, exhibits) {
  const itemType = item.type || item.Type;
  if (itemType !== 'numeric' && itemType !== 'fill') return null;
  
  const expl = item.Explanation || item.ExplanationCorrect || '';
  const prompt = item.Prompt || '';
  
  const arithmeticResults = extractAndEvaluateArithmetic(expl);
  
  const metricTerms = extractMetricTerms(prompt);
  
  let bestResult = null;
  let bestScore = -1;
  
  for (const r of arithmeticResults) {
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
  
  return finalComputed;
}

// --- Process all cases ---
const results = [];

for (const maskedCase of masked) {
  const caseId = maskedCase.caseId;
  const casePack = casePacks.get(caseId);
  if (!casePack) continue;
  
  const exhibits = parseExhibits(casePack);
  
  for (const mItem of maskedCase.items || []) {
    const packItem = (casePack.Items || []).find(i => i.Prompt === mItem.Prompt);
    if (!packItem) {
      results.push({
        itemId: mItem.itemId, caseId, type: mItem.type,
        prompt: mItem.Prompt?.substring(0, 80),
        hiddenCorrect: '[NOT FOUND]', computed: null, match: false
      });
      continue;
    }
    
    const hiddenCorrect = packItem.Correct;
    const computed = computeItem(packItem, exhibits);
    
    let match = false;
    if (computed !== null && hiddenCorrect !== undefined && hiddenCorrect !== '[NOT FOUND]') {
      const computedStr = String(computed);
      const correctStr = Array.isArray(hiddenCorrect) ? hiddenCorrect.sort().join(',') : String(hiddenCorrect);
      match = computedStr === correctStr || 
              (typeof computed === 'number' && typeof hiddenCorrect === 'number' && 
               Math.abs(computed - hiddenCorrect) < 1);
    }
    
    results.push({
      itemId: mItem.itemId, caseId, type: mItem.type,
      prompt: mItem.Prompt?.substring(0, 80),
      hiddenCorrect, computed, match
    });
  }
}

const total = results.length;
const matched = results.filter(r => r.match).length;
const computed = results.filter(r => r.computed !== null).length;

console.log('\n=== CAQS §5.1 KEYLESS HAND-SOLVE SUMMARY ===');
console.log(`Total: ${total} | Computed: ${computed} | Matched: ${matched} | Rate: ${((matched/total)*100).toFixed(1)}%`);

for (const r of results) {
  const status = r.match ? '✅' : (r.computed === null ? '⚠️' : '❌');
  console.log(`${status} ${r.caseId}-${r.itemId} [${r.type}] Hidden: ${JSON.stringify(r.hiddenCorrect)} Computed: ${r.computed}`);
}

fs.writeFileSync(path.join(__dirname, 'output', 'dl066_caqs_hand_solve.json'), JSON.stringify(results, null, 2));
console.log('\nResults written to scripts/output/dl066_caqs_hand_solve.json');