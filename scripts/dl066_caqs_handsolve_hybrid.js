const fs = require('fs');
const path = require('path');

// ============================================================================
// DL-066 CAQS §5.1 KEYLESS HAND-SOLVE - HYBRID (Explanation Arithmetic + Exhibit Substitution)
// ============================================================================
// Strategy: Extract explicit arithmetic from explanations, substitute exhibit values,
// evaluate, compare to hidden Correct.
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

// --- Extract and evaluate explicit arithmetic from explanation ---
function evaluateExplanationArithmetic(expl, exhibits) {
  const results = [];
  
  // Pattern 1: Explicit arithmetic chains: "$A + $B + $C = $RESULT" or "A op B = C"
  const arithmeticChains = [...expl.matchAll(/(\$?\s*\(?\d{1,3}(?:,\d{3})*(?:\.\d+)?\)?)\s*([+\-*/])\s*(\$?\s*\(?\d{1,3}(?:,\d{3})*(?:\.\d+)?\)?)(?:\s*([+\-*/])\s*(\$?\s*\(?\d{1,3}(?:,\d{3})*(?:\.\d+)?\)?))*\s*=\s*(\$?\s*\(?\d{1,3}(?:,\d{3})*(?:\.\d+)?\)?)/g)];
  
  for (const m of arithmeticChains) {
    const parts = [];
    parts.push(parseNumber(m[1]));
    parts.push(m[2]);
    parts.push(parseNumber(m[3]));
    if (m[4]) { parts.push(m[4]); parts.push(parseNumber(m[5])); }
    if (m[6]) { parts.push(m[6]); parts.push(parseNumber(m[7])); }
    const expected = parseNumber(m[m.length - 1]);
    
    // Evaluate left-to-right
    let computed = parts[0];
    for (let i = 1; i < parts.length; i += 2) {
      const op = parts[i];
      const val = parts[i + 1];
      if (op === '+') computed += val;
      else if (op === '-') computed -= val;
      else if (op === '*') computed *= val;
      else if (op === '/') computed /= val;
    }
    
    if (expected !== null && Math.abs(computed - expected) < 0.01) {
      results.push({ computed, expected, method: 'explicit-arithmetic-chain', expression: m[0] });
    }
  }
  
  // Pattern 2: Multi-step with intermediate: "X = A op B = C op D = RESULT"
  const multiStep = [...expl.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]+?)\s*=\s*([^.]+)/g)];
  for (const m of multiStep) {
    const metric = m[1].trim();
    const steps = m[2].split('=').map(s => s.trim()).filter(s => s);
    const expected = parseNumber(m[3]);
    
    let lastComputed = null;
    for (const step of steps) {
      const val = evaluateSimpleExpression(step);
      if (val !== null) lastComputed = val;
    }
    if (lastComputed !== null && expected !== null && Math.abs(lastComputed - expected) < 0.01) {
      results.push({ computed: lastComputed, expected, metric, method: 'multi-step-defining', expression: m[0] });
    }
  }
  
  // Pattern 3: Simple "A = B" where B is arithmetic
  const simpleEq = [...expl.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*([^.]+)/g)];
  for (const m of simpleEq) {
    if (!m[2].includes('=')) { // Not multi-step
      const metric = m[1].trim();
      const val = evaluateSimpleExpression(m[2]);
      if (val !== null) {
        results.push({ computed: val, metric, method: 'simple-equation', expression: m[0] });
      }
    }
  }
  
  // Pattern 4: Final computed values "= X Unfavorable/Favorable"
  const finalVals = [...expl.matchAll(/=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:unfavorable|favorable|credit|debit|rounded|\.)/gi)];
  for (const m of finalVals) {
    results.push({ computed: parseNumber(m[1]), method: 'final-computed', expression: m[0] });
  }
  
  // Pattern 5: Percentage results
  const pctVals = [...expl.matchAll(/(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer|is)/gi)];
  for (const m of pctVals) {
    results.push({ computed: parseFloat(m[1]), method: 'percentage', expression: m[0] });
  }
  
  return results;
}

function evaluateSimpleExpression(expr) {
  // Clean: remove $, commas, replace exhibit refs with values if needed
  let clean = expr.replace(/[$,]/g, '');
  // Only allow safe chars
  if (!/^[\d\s+\-*/().%]+$/.test(clean)) return null;
  try {
    return Function(`"use strict"; return (${clean})`)();
  } catch {
    return null;
  }
}

// --- Try to substitute exhibit values into explanation arithmetic ---
function substituteExhibitValues(expl, exhibits) {
  let substituted = expl;
  
  // Build value map from exhibits
  const valueMap = new Map();
  for (const [exName, ex] of Object.entries(exhibits)) {
    if (ex.type === 'table') {
      for (const row of ex.rows) {
        const rowLabel = String(row[0]).toLowerCase();
        for (let i = 1; i < row.length; i++) {
          const val = parseNumber(row[i]);
          if (val !== null) {
            const colName = ex.headers[i]?.toLowerCase() || `col${i}`;
            const key = `${rowLabel} ${colName}`.toLowerCase();
            valueMap.set(key, val);
            // Also map the raw display value
            const rawVal = String(row[i]).replace(/[$,]/g, '').replace(/,/g, '');
            if (!isNaN(parseFloat(rawVal))) {
              valueMap.set(rawVal, val);
            }
          }
        }
      }
    }
  }
  
  // Also collect numbers mentioned in explanation with context
  const contextNumbers = [...expl.matchAll(/\$?\s*\(?\d{1,3}(?:,\d{3})*(?:\.\d+)?\)?/g)];
  for (const m of contextNumbers) {
    const val = parseNumber(m[0]);
    if (val !== null) {
      const start = Math.max(0, m.index - 50);
      const end = Math.min(expl.length, m.index + m[0].length + 50);
      const context = expl.substring(start, end).toLowerCase();
      valueMap.set(m[0].replace(/[$,]/g, ''), { value: val, context });
    }
  }
  
  return valueMap;
}

// --- Main computation per item ---
function computeItem(item, exhibits) {
  if (item.type !== 'numeric' && item.type !== 'fill') return null;
  
  const expl = item.ExplanationCorrect || item.Explanation || '';
  const prompt = item.Prompt || '';
  
  // First try: explicit arithmetic chains in explanation
  const arithmeticResults = evaluateExplanationArithmetic(expl, exhibits);
  
  // Filter by metric from prompt
  const metricTerms = [];
  const m = prompt.match(/(?:enter|calculate|compute|determine|find)\s+(?:the\s+)?([^.?]+?)(?:\s+as|\s+rounded|\s*[?.])/i);
  if (m) {
    let term = m[1].trim().toLowerCase();
    term = term.replace(/^(total|required|ending|final|budgeted|actual|projected)\s+/i, '');
    metricTerms.push(term);
  }
  
  // Prefer results matching metric term
  for (const term of metricTerms) {
    for (const r of arithmeticResults) {
      if (r.metric && r.metric.toLowerCase().includes(term)) return r.computed;
    }
  }
  
  // Prefer "final-computed" or "percentage" 
  for (const r of arithmeticResults) {
    if (r.method === 'final-computed' || r.method === 'percentage') return r.computed;
  }
  
  // Return first valid numeric result
  for (const r of arithmeticResults) {
    if (typeof r.computed === 'number' && !isNaN(r.computed)) return r.computed;
  }
  
  return null;
}

// --- Process all cases ---
const results = [];

for (const maskedCase of masked) {
  const caseId = maskedCase.caseId;
  const casePack = casePacks.get(caseId);
  
  if (!casePack) continue;
  
  const exhibits = parseExhibits(casePack);
  
  for (const mItem of maskedCase.items || []) {
    const packItem = (casePack.Items || []).find(i => 
      i.Prompt === mItem.Prompt || i.ItemID === mItem.itemId
    );
    
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

// --- Summary ---
const total = results.length;
const matched = results.filter(r => r.match).length;
const computed = results.filter(r => r.computed !== null).length;

console.log('\n=== CAQS §5.1 KEYLESS HAND-SOLVE (Hybrid) ===');
console.log(`Total: ${total} | Computed: ${computed} | Matched: ${matched} | Rate: ${((matched/total)*100).toFixed(1)}%`);

for (const r of results) {
  const status = r.match ? '✅' : (r.computed === null ? '⚠️' : '❌');
  console.log(`${status} ${r.caseId}-${r.itemId} [${r.type}] Hidden: ${JSON.stringify(r.hiddenCorrect)} Computed: ${r.computed}`);
}

fs.writeFileSync(path.join(__dirname, 'output', 'dl066_caqs_hand_solve_hybrid.json'), JSON.stringify(results, null, 2));
console.log('\nWritten to scripts/output/dl066_caqs_hand_solve_hybrid.json');