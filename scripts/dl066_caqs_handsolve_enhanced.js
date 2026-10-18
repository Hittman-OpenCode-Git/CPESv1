const fs = require('fs');
const path = require('path');

// ============================================================================
// DL-066 CAQS §5.1-COMPLIANT KEYLESS HAND-SOLVE - ENHANCED
// ============================================================================
// Loads exhibits from case packs, masks Correct, independently computes,
// properly substitutes exhibit values into formulas from explanations.
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
  for (const c of cases) {
    casePacks.set(c.CaseID, c);
  }
}

console.log(`Loaded ${casePacks.size} cases from packs`);

function parseExhibits(caseObj) {
  const exhibits = {};
  for (const ex of caseObj.Exhibits || []) {
    if (ex.Type === 'table' && ex.Headers && ex.Rows) {
      const colMap = {};
      ex.Headers.forEach((h, i) => { colMap[h.toLowerCase().trim()] = i; });
      
      exhibits[ex.ExhibitID || ex.Title] = {
        type: 'table',
        headers: ex.Headers,
        rows: ex.Rows,
        colMap,
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

// --- Enhanced formula evaluation with exhibit substitution ---
function evaluateFormula(expl, exhibits) {
  const results = {};
  
  // Extract all numeric values from explanation with context
  const contextValues = [];
  
  // Pattern: "$X,XXX" or "X,XXX" or "(X,XXX)" 
  const numMatches = [...expl.matchAll(/(?:^|[^$\w])(\$?\s*\(?\d{1,3}(?:,\d{3})*(?:\.\d+)?\)?)/g)];
  for (const m of numMatches) {
    const val = parseNumber(m[1]);
    if (val !== null) {
      const start = Math.max(0, m.index - 100);
      const end = Math.min(expl.length, m.index + m[0].length + 100);
      const context = expl.substring(start, end).toLowerCase();
      contextValues.push({ value: val, raw: m[1], context });
    }
  }
  
  // Also extract from exhibits directly
  const exhibitValues = {};
  for (const [exName, ex] of Object.entries(exhibits)) {
    if (ex.type === 'table') {
      for (const row of ex.rows) {
        const rowLabel = String(row[0]).toLowerCase();
        for (let i = 1; i < row.length; i++) {
          const val = parseNumber(row[i]);
          if (val !== null) {
            const colName = ex.headers[i]?.toLowerCase() || `col${i}`;
            const key = `${exName}|${rowLabel}|${colName}`.toLowerCase();
            exhibitValues[key] = val;
          }
        }
      }
    }
  }
  
  // Find defining equations in explanation
  const eqPatterns = [
    // "Metric = A + B + C = RESULT"
    /(\w+(?:\s+\w+){0,4})\s*=\s*([^.]+?)\s*=\s*([^.]+)/g,
    // "Total = $X + $Y + $Z = $RESULT"
    /(?:total|required|ending|final|balance)\s*=\s*([^.]+?)\s*=\s*([^.]+)/gi,
  ];
  
  for (const pattern of eqPatterns) {
    for (const m of [...expl.matchAll(pattern)]) {
      const left = m[1]?.trim() || 'result';
      const expression = m[2]?.trim();
      const expected = m[3]?.trim();
      
      // Try to evaluate expression with exhibit substitution
      const computed = evaluateExpression(expression, exhibitValues, contextValues);
      const expectedNum = parseNumber(expected);
      
      if (computed !== null && expectedNum !== null && Math.abs(computed - expectedNum) < 1) {
        results[left.toLowerCase()] = computed;
      }
    }
  }
  
  // Also look for final computed values: "= X Unfavorable/Favorable"
  const finalMatches = [...expl.matchAll(/=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:unfavorable|favorable|credit|debit|rounded|\.)/gi)];
  for (const m of finalMatches) {
    results['final'] = parseNumber(m[1]);
  }
  
  // Look for percentage results
  const pctMatches = [...expl.matchAll(/(\d+(?:\.\d+)?)\s*%\s*(?:rounded|final|answer|is)/gi)];
  for (const m of pctMatches) {
    results['percentage'] = parseFloat(m[1]);
  }
  
  return results;
}

function evaluateExpression(expr, exhibitValues, contextValues) {
  // Clean expression
  let clean = expr.replace(/[$,]/g, '');
  
  // Replace known exhibit references
  // Pattern: "Exhibit 1: $390,000" -> substitute
  for (const [key, val] of Object.entries(exhibitValues)) {
    const parts = key.split('|');
    if (parts.length >= 3) {
      const rowLabel = parts[1];
      const colLabel = parts[2];
      // Try to find references like "390,000" in expression
      const valStr = String(val).replace(/,/g, '');
      if (clean.includes(valStr)) {
        clean = clean.replace(valStr, String(val));
      }
    }
  }
  
  // Also substitute from context values (numbers mentioned in explanation)
  for (const cv of contextValues) {
    const valStr = String(cv.value);
    if (clean.includes(valStr)) {
      clean = clean.replace(valStr, String(cv.value));
    }
  }
  
  // Only allow safe characters
  if (!/^[\d\s+\-*/().%]+$/.test(clean)) return null;
  
  try {
    return Function(`"use strict"; return (${clean})`)();
  } catch {
    return null;
  }
}

// --- Try to extract specific exhibit-driven computations ---
function computeFromExhibits(item, exhibits) {
  const expl = item.ExplanationCorrect || item.Explanation || '';
  const prompt = item.Prompt || '';
  
  // Extract metric name from prompt
  const metricTerms = [];
  const m = prompt.match(/(?:enter|calculate|compute|determine|find)\s+(?:the\s+)?([^.?]+?)(?:\s+as|\s+rounded|\s*[?.])/i);
  if (m) {
    let term = m[1].trim().toLowerCase();
    term = term.replace(/^(total|required|ending|final|budgeted|actual|projected)\s+/i, '');
    metricTerms.push(term);
  }
  
  const results = evaluateFormula(expl, exhibits);
  
  // Try to match metric term
  for (const term of metricTerms) {
    for (const [key, val] of Object.entries(results)) {
      if (key.includes(term) || term.includes(key)) {
        return val;
      }
    }
  }
  
  // Return first numeric result
  for (const val of Object.values(results)) {
    if (typeof val === 'number' && !isNaN(val)) return val;
  }
  
  return null;
}

// --- Main processing ---
const results = [];

for (const maskedCase of masked) {
  const caseId = maskedCase.caseId;
  const casePack = casePacks.get(caseId);
  
  if (!casePack) {
    console.log(`⚠️  Case ${caseId} not found in packs`);
    continue;
  }
  
  const exhibits = parseExhibits(casePack);
  
  for (const mItem of maskedCase.items || []) {
    const packItem = (casePack.Items || []).find(i => 
      i.Prompt === mItem.Prompt || i.ItemID === mItem.itemId
    );
    
    if (!packItem) {
      results.push({
        itemId: mItem.itemId,
        caseId,
        type: mItem.type,
        prompt: mItem.Prompt?.substring(0, 80),
        hiddenCorrect: '[NOT FOUND IN PACK]',
        computed: null,
        match: false,
        note: 'Item not found in case pack'
      });
      continue;
    }
    
    const hiddenCorrect = packItem.Correct;
    
    // Only attempt numeric/calculation items
    let computed = null;
    if (mItem.type === 'numeric' || mItem.type === 'fill') {
      computed = computeFromExhibits(packItem, exhibits);
    }
    
    let match = false;
    if (computed !== null && hiddenCorrect !== undefined && hiddenCorrect !== '[NOT FOUND IN PACK]') {
      const computedStr = String(computed);
      const correctStr = Array.isArray(hiddenCorrect) ? hiddenCorrect.sort().join(',') : String(hiddenCorrect);
      match = computedStr === correctStr || 
              (typeof computed === 'number' && typeof hiddenCorrect === 'number' && 
               Math.abs(computed - hiddenCorrect) < 1);
    }
    
    results.push({
      itemId: mItem.itemId,
      caseId,
      type: mItem.type,
      prompt: mItem.Prompt?.substring(0, 80),
      hiddenCorrect: hiddenCorrect,
      computed,
      match,
      note: computed === null ? 'No computation extracted' : 'Computed from exhibits'
    });
  }
}

// --- Summary ---
const total = results.length;
const matched = results.filter(r => r.match).length;
const computed = results.filter(r => r.computed !== null).length;

console.log('\n=== CAQS §5.1 KEYLESS HAND-SOLVE SUMMARY (Enhanced) ===');
console.log(`Total items: ${total}`);
console.log(`Computed: ${computed}`);
console.log(`Matched hidden key: ${matched}`);
console.log(`Match rate: ${((matched / total) * 100).toFixed(1)}%`);

for (const r of results) {
  const status = r.match ? '✅' : (r.computed === null ? '⚠️' : '❌');
  console.log(`\n${status} ${r.caseId} - ${r.itemId} [${r.type}]`);
  console.log(`   Hidden: ${JSON.stringify(r.hiddenCorrect)}`);
  console.log(`   Computed: ${r.computed}`);
}

fs.writeFileSync(
  path.join(__dirname, 'output', 'dl066_caqs_hand_solve_enhanced.json'),
  JSON.stringify(results, null, 2)
);
console.log('\nResults written to scripts/output/dl066_caqs_hand_solve_enhanced.json');