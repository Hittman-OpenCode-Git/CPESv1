/**
 * adjudicate_review_flags.js — Analyze all 68 REVIEW flags to classify each
 * as either GENUINE_INVERSION or FALSE_POSITIVE.
 *
 * Method: For each item, extract full text (stem, choices, EC, EW) and apply
 * deterministic checks:
 *   1. Does EC explicitly name a letter as correct (e.g., "correct answer is X")?
 *   2. For calculation items, does the EC's computed answer match the CC's choice text?
 *   3. Does the EC reference the CC choice's content vs. another letter's?
 *
 * READ-ONLY: does not modify any pack files.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { parsePack } = require('./lib/pack_parser');
const flags = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/output/semantic_key_flags.json'), 'utf8'));

// Group by file
const byFile = {};
for (const f of flags.flags) {
  if (!byFile[f.file]) byFile[f.file] = [];
  byFile[f.file].push(f);
}

const results = [];

for (const fileKey of Object.keys(byFile)) {
  const fp = path.join(ROOT, fileKey);
  const src = fs.readFileSync(fp, 'utf8');
  const parsed = parsePack(src, { sourceName: path.basename(fileKey) });
  const recordMap = {};
  for (const rec of parsed.records) {
    if (rec.object && rec.object.QuestionID) recordMap[rec.object.QuestionID] = rec;
  }

  // Helper: extract first number from a string
  const extractNum = (s) => {
    const m = s && s.match(/\$?([\d,]+\.?\d*)/);
    return m ? m[1].replace(/,/g, '') : null;
  };

  for (const flag of byFile[fileKey]) {
    const rec = recordMap[flag.qid];
    if (!rec) {
      results.push({ qid: flag.qid, verdict: 'NOT_FOUND' });
      continue;
    }
    const o = rec.object;
    const cc = flag.storedCC;

    // Get choices
    let choices = {};
    if (o.Choices) {
      choices = typeof o.Choices === 'string' ? JSON.parse(o.Choices) : o.Choices;
    } else {
      choices = { A: o.A, B: o.B, C: o.C, D: o.D };
    }

    // Get EC text
    const ec = o.ExplanationCorrect || o.EC || '';
    const ecLower = ec.toLowerCase();

    // Get EW for bestLetter (the letter the verifier thinks EC recalls)
    const bestLetter = flag.bestLetter;
    const ewBest = o[`ExplanationWrong${bestLetter}`] || '';
    const ewCC = o[`ExplanationWrong${cc}`] || '';

    // Check 1: Explicit "correct answer is X" or "correct answer: X" pattern
    let explicitAnswer = null;
    const explicitPatterns = [
      /the correct answer is\s+(?:choice|option)?\s*([a-d])\b(?![a-z])/i,
      /correct answer is\s+(?:choice|option)?\s*([a-d])\b(?![a-z])/i,
      /the answer is\s+(?:choice|option)?\s*([a-d])\b(?![a-z])/i,
      /answer is\s+(?:choice|option)?\s*([a-d])\b(?![a-z])/i,
      /choice\s+([a-d])\s+is\s+correct/i,
    ];
    for (const pat of explicitPatterns) {
      const m = ec.match(pat);
      if (m) { explicitAnswer = m[1].toUpperCase(); break; }
    }

    // Check 2: For calc items, try to extract the numerical answer from EC
    // and see if it matches the CC's choice value
    let calcMatch = false;
    let calcNote = '';
    let ccNum = null;
    if (o.CalculationItem && choices[cc]) {
      // Try to find the answer value in the EC text
      const ccVal = String(choices[cc]).trim();
      ccNum = extractNum(ccVal);
      const ecNums = ec.match(/\$?([\d,]+\.?\d*)/g) || [];
      const ecNumSet = new Set(ecNums.map(n => n.replace(/,/g, '').replace('$', '')));
      if (ccNum && ecNumSet.has(ccNum)) {
        calcMatch = true;
        calcNote = `CC choice value (${ccVal}) found in EC`;
      } else {
        calcNote = `CC choice value (${ccVal}) NOT found in EC numbers: ${[...ecNumSet].slice(0,10).join(', ')}`;
      }
    }

    // Check 3: Does EC mention bestLetter's content vs CC's content?
    const ccText = String(choices[cc] || '').toLowerCase();
    const bestText = String(choices[bestLetter] || '').toLowerCase();
    const ccWords = new Set(ccText.replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3));
    const bestWords = new Set(bestText.replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3));
    let ccWordHits = 0, bestWordHits = 0;
    for (const w of ccWords) if (ecLower.includes(w)) ccWordHits++;
    for (const w of bestWords) if (ecLower.includes(w)) bestWordHits++;
    const ccRatio = ccWords.size > 0 ? ccWordHits / ccWords.size : 0;
    const bestRatio = bestWords.size > 0 ? bestWordHits / bestWords.size : 0;

    // Check 4: Does EC reference the choice letter explicitly?
    // e.g., "Choice X" or "Option X" or "Choice B states..."
    const ccReferences = ec.match(new RegExp(`(choice|option|letter)\\s*\\(?${cc}\\)?`, 'gi')) || [];
    const bestReferences = ec.match(new RegExp(`(choice|option|letter)\\s*\\(?${bestLetter}\\)?`, 'gi')) || [];

    let verdict = 'FALSE_POSITIVE';
    let confidence = 'low';
    let notes = [];

    // Strong inversion: EC explicitly names a different letter as correct
    if (explicitAnswer && explicitAnswer !== cc) {
      verdict = 'GENUINE_INVERSION';
      confidence = 'high';
      notes.push(`EC explicitly states correct answer is ${explicitAnswer}, but storedCC=${cc}`);
    }
    // Strong inversion: EC explicitly names the correct letter
    else if (explicitAnswer === cc) {
      notes.push(`EC confirms correct answer is ${cc} (matches storedCC)`);
    }

    // Check: does EC compute/conclude an answer matching a different choice?
    if (o.CalculationItem && choices[bestLetter]) {
      const bestVal = String(choices[bestLetter]).trim();
      const bestNum = extractNum(bestVal);
      if (bestNum) {
        const ecNums2 = ec.match(/\$?([\d,]+\.?\d*)/g) || [];
        const ecNumSet2 = new Set(ecNums2.map(n => n.replace(/,/g, '').replace('$', '')));
        if (ecNumSet2.has(bestNum) && !ecNumSet2.has(ccNum)) {
          // EC contains bestLetter's number but not CC's number
          if (verdict !== 'GENUINE_INVERSION') {
            verdict = 'POTENTIAL_INVERSION';
            confidence = 'medium';
            notes.push(`EC contains bestLetter (${bestLetter}) value (${bestVal}) but not CC (${cc}) value`);
          }
        }
      }
    }

    // Summary
    const result = {
      qid: flag.qid,
      pack: flag.pack,
      storedCC: cc,
      bestLetter: bestLetter,
      bestRecall: flag.bestRecall,
      ccRecall: flag.ccRecall,
      margin: flag.margin,
      explicitAnswer,
      calcMatch,
      calcNote,
      ccWordHits,
      ccRatio: ccRatio.toFixed(2),
      bestWordHits,
      bestRatio: bestRatio.toFixed(2),
      ccReferences: ccReferences.length,
      bestReferences: bestReferences.length,
      verdict,
      confidence,
      notes,
      ecPreview: ec.substring(0, 120) + (ec.length > 120 ? '...' : ''),
      ccChoice: choices[cc]?.substring(0, 80),
      bestChoice: choices[bestLetter]?.substring(0, 80),
    };

    results.push(result);

    const tag = verdict === 'GENUINE_INVERSION' ? '🔴 INVERSION' : verdict === 'POTENTIAL_INVERSION' ? '🟡 POTENTIAL' : '✅ FP';
    console.log(`[${tag}] ${flag.qid} (CC=${cc}, best=${bestLetter}, margin=${flag.margin}) ${notes.length ? '-' + notes.join(';') : ''}`);
  }
}

// Summary
const inversions = results.filter(r => r.verdict === 'GENUINE_INVERSION');
const potentials = results.filter(r => r.verdict === 'POTENTIAL_INVERSION');
const fps = results.filter(r => r.verdict === 'FALSE_POSITIVE');
console.log(`\n=== SUMMARY ===`);
console.log(`GENUINE_INVERSION: ${inversions.length}`);
console.log(`POTENTIAL_INVERSION: ${potentials.length}`);
console.log(`FALSE_POSITIVE: ${fps.length}`);

// Save full results
fs.writeFileSync(path.join(ROOT, 'scripts/output/ws1_adjudication.json'), JSON.stringify(results, null, 1), 'utf8');
console.log(`Full results: scripts/output/ws1_adjudication.json`);

// List potential inversions with details
if (potentials.length || inversions.length) {
  console.log(`\n=== Items needing manual verification ===`);
  for (const r of [...inversions, ...potentials]) {
    console.log(`\n--- ${r.qid} ---`);
    console.log(`  storedCC=${r.storedCC}, bestLetter=${r.bestLetter}, margin=${r.margin}`);
    console.log(`  explicitAnswer=${r.explicitAnswer || 'none'}`);
    console.log(`  ccChoice: ${r.ccChoice?.substring(0, 60)}`);
    console.log(`  bestChoice: ${r.bestChoice?.substring(0, 60)}`);
    console.log(`  ccWordHits=${r.ccWordHits} (${r.ccRatio}), bestWordHits=${r.bestWordHits} (${r.bestRatio})`);
    console.log(`  calcNote: ${r.calcNote}`);
    console.log(`  notes: ${r.notes.join('; ')}`);
  }
}
