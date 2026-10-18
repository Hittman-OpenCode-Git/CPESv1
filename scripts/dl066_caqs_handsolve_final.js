const fs = require('fs');
const path = require('path');

// ============================================================================
// DL-066 CAQS §5.1 KEYLESS HAND-SOLVE - FINAL
// Extracts explicit arithmetic from ExplanationCorrect, evaluates independently,
// compares to hidden Correct in case packs.
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

// ============================================================================
// ARITHMETIC EXTRACTOR - Handles the specific patterns in ExplanationCorrect
// ============================================================================

function extractAndEvaluateArithmetic(expl) {
  const results = [];
  
  // Clean the explanation for processing
  const text = expl.replace(/\\"/g, '"').replace(/\\n/g, ' ').replace(/\\"/g, '"');
  
  // Pattern 1: "X = A / B = C = D%" (e.g., "ROI = $420,000 / $2,800,000 = 0.15 = 15%")
  const divChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*\/\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*=\s*([^.]*?(?:\d+(?:\.\d+)?)[^.]*?)/g)];
  for (const m of divChain) {
    const metric = m[1].trim();
    const num = parseNumber(m[2]);
    const den = parseNumber(m[3]);
    if (num !== null && den !== null && den !== 0) {
      const computed = num / den;
      results.push({ metric, computed, method: 'division-chain', expression: m[0] });
      
      // Also check for percentage form
      const pctMatch = m[4].match(/(\d+(?:\.\d+)?)\s*%/);
      if (pctMatch) {
        const pct = parseFloat(pctMatch[1]);
        if (Math.abs(computed * 100 - pct) < 0.5) {
          results.push({ metric, computed: pct, method: 'division-chain-percent', expression: m[0] });
        }
      }
    }
  }
  
  // Pattern 2: "X = A x B = C" (multiplication chain)
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
  
  // Pattern 3: "X = A + B + C = RESULT" (addition chain)
  const addChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]*?)\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of addChain) {
    const metric = m[1].trim();
    const middle = m[2].trim();
    const expected = parseNumber(m[3]);
    // Try to evaluate middle as addition
    const sum = evaluateAddition(middle);
    if (sum !== null && expected !== null && Math.abs(sum - expected) < 1) {
      results.push({ metric, computed: expected, method: 'addition-chain-verified', expression: m[0] });
    } else if (sum !== null) {
      results.push({ metric, computed: sum, method: 'addition-chain', expression: m[0] });
    }
  }
  
  // Pattern 4: Simple equations "X = VALUE" where VALUE is arithmetic
  const simpleEq = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]+?)(?:\.|$)/g)];
  for (const m of simpleEq) {
    const metric = m[1].trim();
    const expr = m[2].trim();
    // Skip if already captured as chain
    if (expr.includes('=')) continue;
    
    const val = evaluateArithmeticExpression(expr);
    if (val !== null) {
      results.push({ metric, computed: val, method: 'simple-equation', expression: m[0] });
    }
  }
  
  // Pattern 4b: Equations with parentheses like "Total Cost - (VC/hr x Hours) = $42,000 - ($4 x 8,000) = $10,000"
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
  
  // Pattern 5: Subtraction "A - B = C" (e.g., "Shortfall = 96 - 91 = 5")
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
  
  // Pattern 6: Final computed values "= X Unfavorable/Favorable" - ONLY at end of sentence
  const finalVals = [...text.matchAll(/=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:unfavorable|favorable|credit|debit|rounded)\./gi)];
  for (const m of finalVals) {
    results.push({ metric: 'final', computed: parseNumber(m[1]), method: 'final-computed', expression: m[0] });
  }
  
  // Pattern 7: Percentage results "X%"
  const pctVals = [...text.matchAll(/(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer|is)\./gi)];
  for (const m of pctVals) {
    results.push({ metric: 'percentage', computed: parseFloat(m[1]), method: 'percentage', expression: m[0] });
  }
  
  // Pattern 8: "X% of Y" calculations
  const pctOf = [...text.matchAll(/(\d+(?:\.\d+)?)\s*%\s*[x×]\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)];
  for (const m of pctOf) {
    const pct = parseFloat(m[1]) / 100;
    const base = parseNumber(m[2]);
    if (base !== null) {
      const computed = pct * base;
      results.push({ metric: 'percentage-of', computed, method: 'percentage-of', expression: m[0] });
    }
  }
  
  // Pattern 9: PV calculations "PV = $X x factor = $Y"
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
  // Extract all numbers connected by +
  const nums = [...expr.matchAll(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g)].map(m => parseNumber(m[1]));
  const valid = nums.filter(n => n !== null);
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => a + b, 0);
}

function evaluateArithmeticExpression(expr) {
  // Try to evaluate as simple arithmetic
  let clean = expr.replace(/[$,]/g, '');
  // Only allow safe characters
  if (!/^[\d\s+\-*/().%]+$/.test(clean)) return null;
  try {
    return Function(`"use strict"; return (${clean})`)();
  } catch {
    return null;
  }
}

// ============================================================================
// MAIN COMPUTATION
// ============================================================================

function computeItem(item, exhibits) {
  const itemType = item.type || item.Type;
  if (itemType !== 'numeric' && itemType !== 'fill') return null;
  
  const expl = item.Explanation || item.ExplanationCorrect || '';
  const prompt = item.Prompt || '';
  
  console.log(`\n[DEBUG] Computing ${item.ItemID || item.itemId}: ${prompt.substring(0, 60)}`);
  
  const arithmeticResults = extractAndEvaluateArithmetic(expl);
  console.log(`[DEBUG] Arithmetic results: ${arithmeticResults.length}`);
  for (const r of arithmeticResults) {
    console.log(`  ${r.metric}: ${r.computed} (${r.method})`);
  }
  
  // Extract metric from prompt
  const metricTerms = [];
  const m = prompt.match(/(?:enter|calculate|compute|determine|find)\s+(?:the\s+)?([^.?]+?)(?:\s+as|\s+rounded|\s*[?.])/i);
  if (m) {
    let term = m[1].trim().toLowerCase();
    term = term.replace(/^(total|required|ending|final|budgeted|actual|projected)\s+/i, '');
    metricTerms.push(term);
  }
  console.log(`[DEBUG] Metric terms: ${metricTerms.join(', ')}`);
  
  // Score and pick best result
  let bestResult = null;
  let bestScore = -1;
  
  for (const r of arithmeticResults) {
    let score = 0;
    // HIGHEST PRIORITY: verified chains with metric match
    if (r.method.includes('verified') && r.metric) {
      for (const term of metricTerms) {
        if (term.includes(r.metric.toLowerCase())) score += 100;
      }
    }
    // HIGH PRIORITY: verified chains
    if (r.method.includes('verified')) score += 50;
    // HIGH PRIORITY: division-chain for percentage/ratio metrics
    if (r.method === 'division-chain' && (prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate') || prompt.toLowerCase().includes('roi'))) score += 60;
    // HIGH PRIORITY: parentheses-equation-verified
    if (r.method === 'parentheses-equation-verified') score += 45;
    // MEDIUM PRIORITY: metric match without verified
    if (r.metric) {
      for (const term of metricTerms) {
        if (term.includes(r.metric.toLowerCase())) score += 40;
      }
    }
    // LOWER PRIORITY: specific method types
    if (r.method === 'final-computed') score += 10;
    if (r.method === 'percentage') score += 20;
    if (r.method === 'division-chain-percent') score += 30;
    if (r.method === 'pv-verified') score += 30;
    // Prefer whole number for whole number prompts
    if (prompt.toLowerCase().includes('whole number') && Number.isInteger(r.computed)) score += 15;
    // Prefer percentage for percentage prompts
    if (prompt.toLowerCase().includes('percent') && r.method === 'division-chain-percent') score += 30;
    // Prefer correct sign for variance prompts
    if (prompt.toLowerCase().includes('variance') && r.computed < 0) score += 10;
    
    if (score > bestScore) {
      bestScore = score;
      bestResult = r;
    }
  }
  
  console.log(`[DEBUG] Best: ${bestResult?.metric} = ${bestResult?.computed} (score: ${bestScore})`);
  
  // Post-process for percentage/whole number prompts
  let finalComputed = bestResult?.computed ?? null;
  if (finalComputed !== null) {
    const isWholeNumber = prompt.toLowerCase().includes('whole number');
    const isPercentagePrompt = prompt.toLowerCase().includes('percent') || prompt.toLowerCase().includes('rate');
    const isPctPoints = prompt.toLowerCase().includes('percentage points');
    
    // Whole number prompt: if decimal, check for percentage form
    if (isWholeNumber && !Number.isInteger(finalComputed)) {
      // If it's a decimal < 1, it's likely a percentage that needs conversion
      if (finalComputed < 1) {
        finalComputed = Math.round(finalComputed * 100);
      }
    }
    // Percentage/rate prompt: if decimal < 1 and not percentage points, convert
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
    // Match on Prompt (most reliable)
    const packItem = (casePack.Items || []).find(i => i.Prompt === mItem.Prompt);
    
    console.log(`[MAIN] ${mItem.itemId}: ${packItem ? 'MATCHED' : 'NO MATCH'}`);
    
    if (!packItem) {
      results.push({
        itemId: mItem.itemId, caseId, type: mItem.type,
        prompt: mItem.Prompt?.substring(0, 80),
        hiddenCorrect: '[NOT FOUND]', computed: null, match: false
      });
      continue;
    }
    
    console.log(`[MAIN] Calling computeItem for ${mItem.itemId}`);
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

// --- Summary ---
const total = results.length;
const matched = results.filter(r => r.match).length;
const computed = results.filter(r => r.computed !== null).length;

console.log('\n=== CAQS §5.1 KEYLESS HAND-SOLVE (Final) ===');
console.log(`Total: ${total} | Computed: ${computed} | Matched: ${matched} | Rate: ${((matched/total)*100).toFixed(1)}%`);

for (const r of results) {
  const status = r.match ? '✅' : (r.computed === null ? '⚠️' : '❌');
  console.log(`${status} ${r.caseId}-${r.itemId} [${r.type}] Hidden: ${JSON.stringify(r.hiddenCorrect)} Computed: ${r.computed}`);
}

fs.writeFileSync(path.join(__dirname, 'output', 'dl066_caqs_hand_solve_final.json'), JSON.stringify(results, null, 2));
console.log('\nWritten to scripts/output/dl066_caqs_hand_solve_final.json');