/**
 * classify_dl031.js — DL-031 Definition-Match Difficulty Inflation Classifier
 * 
 * Scans all 5 packs for items where the stem is a textbook definition
 * and the correct answer is the term being defined, but the difficulty
 * is labeled "Moderate" or higher (should be "Easy").
 * 
 * Classification categories (S372 model):
 *   Simple Relabel — Difficulty/DifficultyScore change only
 *   Calibration — Re-evaluate against all cognitive dimensions
 *   Rewrite Required — Stem or distractors need enhancement
 * 
 * Usage: node scripts/classify_dl031.js [--execute]
 *   Without --execute: classify only (read-only)
 *   With --execute: apply Simple Relabel batch (max 28/pack)
 */

const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const PACK_FILES = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];
const BATTERY_NAMES = {
  'pack_a_corrected.js': 'MCQ_BANK_A',
  'pack_b_corrected.js': 'MCQ_BANK_B',
  'pack_c_corrected.js': 'MCQ_BANK_C',
  'pack_d_corrected.js': 'MCQ_BANK_D',
  'pack_e_corrected.js': 'MCQ_BANK_E',
};

// Definition-match signals: stem defines/asks about a term/concept
// Explicitly excludes calculation-type markers like "What are the..."
const DEFINITION_MARKERS = [
  /is\s+defined\s+as/i,
  /is\s+known\s+as/i,
  /is\s+called/i,
  /is\s+referred\s+to\s+as/i,
  /refers\s+to\s+the\s+(concept|idea|term|notion|principle|process|practice|method)/i,
  /the\s+term\s+for/i,
  /are\s+referred\s+to\s+as/i,
  /is\s+(best\s+)?described\s+as/i,
  /which\s+of\s+the\s+following\s+best\s+describes/i,
  /this\s+describes\s+(a|an|the)/i,
  /this\s+is\s+an\s+example\s+of/i,
  /this\s+concept\s+is/i,
  /what\s+concept/i,
  /what\s+is\s+the\s+term/i,
  // "X is a ..." — definitional, but ONLY when not ending in a calculation request
  /\bis\s+a\s+(?!method|way|technique|function|process|tool|system|measure|ratio|rate)\b[^.]{10,100}$/im,
  // "X are ..." — definitional when defining a category
  /\bare\s+(typically|generally|commonly|always|usually)\s+(used|found|classified|treated|reported|recorded|recognized|considered|applied|assigned|allocated|categorized)/i,
  // "X, Y, and Z are..." at end of stem
  /\b(are|is)\s+(classified|categorized|known|termed|considered)\s+as/i,
];

// Exclusion patterns: calculation stems that should NOT be flagged
const CALCULATION_MARKERS = [
  /(calculate|compute|enter|determine|find|solve for)\s+the\s+(amount|total|number|value|cost|price|rate|balance|income|revenue|margin|net|gross|tax|cash|units|hours|dollars|variance|equivalent|depreciation|overhead|payments?|collections?|disbursements?)/i,
  /what\s+(is|are)\s+the\s+(amount|total|number|value|cost|price|rate|balance|income|revenue|margin|net|gross|tax|cash|units|hours|dollars|variance|equivalent|depreciation|payments?|collections?|disbursements?|borrowing)/i,
  /what\s+(is|are)\s+the\s+(budget|forecast)/i,
  /enter\s+the\s+/i,
  /what\s+is\s+the\s+(total|net|amount|number)/i,
  // Formula-based: give numbers, ask for computed result
  /(budget|actual|planned|standard)\s+(machine.hours|units|sales|costs?|volume|price)/i,
  /(pays?|collects?)\s+\d+%/i,
  /(estimated\s+cost|variable\s+cost|fixed\s+cost|operating\s+income|operating\s+assets|sales\s+price)/i,
  /if\s+(planned|actual|budgeted|standard|the)\s+(sales|machine|units|volume|cost|price|hours|rate)/i,
];

const STOP_WORDS = new Set(['which', 'that', 'this', 'with', 'from', 'when', 'what', 'where', 'these', 'those', 'their', 'there', 'about', 'above', 'after', 'before', 'between', 'during', 'through', 'under', 'over']);
const TRIVIAL_WORDS = new Set(['the', 'a', 'an', 'of', 'to', 'is', 'are', 'in', 'on', 'at', 'by', 'for', 'and', 'or', 'not', 'but', 'it', 'its', 'be', 'as', 'has', 'been', 'can', 'does', 'will', 'would', 'may', 'also', 'each', 'all', 'than', 'more', 'most', 'some', 'such', 'only', 'other', 'one', 'two', 'any', 'if', 'no', 'so', 'then']);

function extractItems(packFile) {
  const filePath = path.join(BASE, packFile);
  const content = fs.readFileSync(filePath, 'utf8');
  const varName = BATTERY_NAMES[packFile];
  try {
    const fn = new Function(content + '; return ' + varName + ';');
    const items = fn();
    return Array.isArray(items) ? items : [];
  } catch (e) {
    console.error('Parse error for ' + packFile + ': ' + e.message);
    return [];
  }
}

function normalizeText(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function isNumericAnswer(text) {
  if (!text) return false;
  const cleaned = text.replace(/[,$%]/g, '').trim();
  return /^-?\d+(\.\d+)?%?$/.test(cleaned);
}

function isDefinitional(stem) {
  const normalized = stem.toLowerCase().trim();
  for (const marker of DEFINITION_MARKERS) {
    if (marker.test(normalized)) return true;
  }
  return false;
}

function isCalculation(stem) {
  const normalized = stem.toLowerCase().trim();
  for (const marker of CALCULATION_MARKERS) {
    if (marker.test(normalized)) return true;
  }
  return false;
}

function computeOverlap(stem, correctText) {
  const sNorm = normalizeText(stem);
  const cNorm = normalizeText(correctText);
  const stemWords = new Set(sNorm.split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w) && !TRIVIAL_WORDS.has(w)));
  const ccWords = cNorm.split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w) && !TRIVIAL_WORDS.has(w));
  if (ccWords.length === 0) return 0;
  let overlapCount = 0;
  for (const w of ccWords) {
    if (stemWords.has(w)) overlapCount++;
  }
  return overlapCount / ccWords.length;
}

function classifyItem(item) {
  const stem = item.Stem || '';
  const choices = item.Choices || {};
  const cc = item.CorrectChoice;
  const correctText = choices[cc] || '';
  const difficulty = item.Difficulty || '';
  const diffScore = item.DifficultyScore;
  const cognitive = item.CognitiveLevel || '';
  const topic = item.Topic || '';
  const qid = item.QuestionID || '';

  if (!cc) return null;
  if (!correctText) return null;

  // Skip items already at Easy (correctly calibrated)
  if (difficulty === 'Easy' || diffScore === 1 || diffScore === 2) return null;
  // Must be Moderate or higher
  if (difficulty !== 'Moderate' && difficulty !== 'Moderate-Easy' &&
      difficulty !== 'Difficult' && difficulty !== 'Very Difficult') {
    if (diffScore !== 3 && diffScore !== 4 && diffScore !== 5) return null;
  }

  // Exclude pure calculation items
  if (isCalculation(stem)) return null;

  // Exclude items with purely numeric answers (they're calculations, not definitions)
  if (isNumericAnswer(correctText)) return null;

  // Check for definition-match pattern
  if (!isDefinitional(stem)) return null;

  const overlapRatio = computeOverlap(stem, correctText);
  const cogLevel = (cognitive || '').toLowerCase();

  let classification;
  if (cogLevel === 'understand' || cogLevel === 'remember') {
    if (overlapRatio >= 0.20) {
      classification = 'Simple Relabel';
    } else {
      classification = 'Calibration';
    }
  } else if (cogLevel === 'apply') {
    if (overlapRatio >= 0.30) {
      classification = 'Simple Relabel';
    } else {
      classification = 'Calibration';
    }
  } else if (cogLevel === 'analyze' || cogLevel === 'evaluate') {
    classification = 'Rewrite Required';
  } else {
    classification = 'Calibration';
  }

  return {
    qid,
    section: item.Section || '',
    topic,
    difficulty,
    difficultyScore: diffScore,
    cognitiveLevel: cognitive,
    stemSnippet: stem ? stem.substring(0, 100) : '',
    correctTextSnippet: correctText ? correctText.substring(0, 80) : '',
    overlapRatio: overlapRatio.toFixed(3),
    classification,
  };
}

function main() {
  const execute = process.argv.includes('--execute');
  console.log('=== DL-031 Difficulty Inflation Classifier (v2) ===');
  console.log('Mode: ' + (execute ? 'EXECUTE (Simple Relabel only)' : 'CLASSIFY ONLY'));
  console.log('Extraction: Function constructor parse\n');

  let allFindings = [];
  let simpleRelabels = [];
  const packStats = {};

  for (const pf of PACK_FILES) {
    console.log('Parsing ' + pf + '...');
    const items = extractItems(pf);
    const packKey = pf.replace('_corrected.js', '').replace('pack_', '');
    packStats[packKey] = { total: items.length, found: 0, simple: 0, calibration: 0, rewrite: 0 };

    for (const item of items) {
      const finding = classifyItem(item);
      if (finding) {
        finding.pack = packKey;
        allFindings.push(finding);
        packStats[packKey].found++;
        if (finding.classification === 'Simple Relabel') {
          packStats[packKey].simple++;
          simpleRelabels.push(finding);
        } else if (finding.classification === 'Calibration') {
          packStats[packKey].calibration++;
        } else if (finding.classification === 'Rewrite Required') {
          packStats[packKey].rewrite++;
        }
      }
    }
  }

  const byClass = {};
  for (const f of allFindings) byClass[f.classification] = (byClass[f.classification] || 0) + 1;

  console.log('\n=== PER-PACK RESULTS ===');
  for (const [pack, stats] of Object.entries(packStats)) {
    console.log(pack.toUpperCase() + ': ' + stats.total + ' items, ' + stats.found + ' flagged (' +
      'Simple: ' + stats.simple + ', Calib: ' + stats.calibration + ', Rewrite: ' + stats.rewrite + ')');
  }

  console.log('\n=== CLASSIFICATION SUMMARY ===');
  for (const [cls, count] of Object.entries(byClass)) {
    console.log('  ' + cls + ': ' + count);
  }
  console.log('  TOTAL: ' + allFindings.length);

  console.log('\n=== SIMPLE RELABEL CANDIDATES (' + simpleRelabels.length + ' items) ===');
  for (const sr of simpleRelabels.slice(0, 30)) {
    console.log('  ' + sr.qid + ' | ' + sr.pack + '/' + sr.section + ' | ' + sr.cognitiveLevel +
      ' | ' + sr.difficulty + '(' + sr.difficultyScore + ')→Easy(1) | ov=' + sr.overlapRatio +
      ' | ' + sr.stemSnippet.substring(0, 70));
  }
  if (simpleRelabels.length > 30) {
    console.log('  ... and ' + (simpleRelabels.length - 30) + ' more');
  }

  // Calibration preview
  const calibrations = allFindings.filter(f => f.classification === 'Calibration');
  if (calibrations.length > 0) {
    console.log('\n=== CALIBRATION SAMPLE (first 15 of ' + calibrations.length + ') ===');
    for (const c of calibrations.slice(0, 15)) {
      console.log('  ' + c.qid + ' | ' + c.pack + '/' + c.section + ' | ' + c.cognitiveLevel +
        ' | ' + c.difficulty + ' | ov=' + c.overlapRatio + ' | ' + c.stemSnippet.substring(0, 70));
    }
  }

  // Rewrite required
  const rewrites = allFindings.filter(f => f.classification === 'Rewrite Required');
  if (rewrites.length > 0) {
    console.log('\n=== REWRITE REQUIRED (' + rewrites.length + ' items) ===');
    for (const r of rewrites) {
      console.log('  ' + r.qid + ' | ' + r.pack + '/' + r.section + ' | ' + r.cognitiveLevel +
        ' | ' + r.difficulty + ' | ' + r.stemSnippet.substring(0, 80) + '...');
    }
  }

  // ---- Execute Simple Relabels ----
  if (execute && simpleRelabels.length > 0) {
    console.log('\n=== EXECUTING SIMPLE RELABELS ===');
    console.log('Maximum 28 items per pack per batch (governance-guard Rule 5)\n');

    let totalApplied = 0;
    const backupPaths = [];
    const appliedQIDs = [];

    for (const pf of PACK_FILES) {
      const packKey = pf.replace('_corrected.js', '').replace('pack_', '');
      const packQIDs = simpleRelabels.filter(sr => sr.pack === packKey);
      if (packQIDs.length === 0) continue;

      const filePath = path.join(BASE, pf);
      // Backup first (mandatory)
      const ts = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);
      const backupName = pf + '.bak-DL031-' + ts;
      const backupPath = path.join(BASE, 'backups', backupName);
      fs.copyFileSync(filePath, backupPath);
      backupPaths.push(backupPath);

      let content = fs.readFileSync(filePath, 'utf8');
      let packApplied = 0;
      const skipped = [];
      const batch = packQIDs.slice(0, 28);

      // Process in REVERSE order (last items first) so positions don't shift
      batch.reverse();
      
      for (const sr of batch) {
        const qidIdx = content.indexOf('"QuestionID": "' + sr.qid + '"');
        if (qidIdx === -1) {
          skipped.push({ qid: sr.qid, reason: 'QID not found' });
          continue;
        }

        // Use lastIndexOf to find the closest Difficulty/DifficultyScore BEFORE this QID
        // This avoids picking up neighbor items' fields in rotation groups
        const diffKey = '"Difficulty": "' + sr.difficulty + '"';
        const scoreKey = '"DifficultyScore": ' + sr.difficultyScore;
        
        const diffIdx = content.lastIndexOf(diffKey, qidIdx);
        const scoreIdx = content.lastIndexOf(scoreKey, qidIdx);
        
        if (diffIdx === -1) {
          skipped.push({ qid: sr.qid, reason: 'Difficulty field (' + sr.difficulty + ') not found before QID' });
          continue;
        }
        
        // Also verify the found Difficulty is reasonably close (within 20000 chars)
        if (qidIdx - diffIdx > 20000) {
          skipped.push({ qid: sr.qid, reason: 'Difficulty too far from QID (' + (qidIdx-diffIdx) + ' chars)' });
          continue;
        }

        // Replace Difficulty
        content = content.substring(0, diffIdx) + '"Difficulty": "Easy"' +
          content.substring(diffIdx + diffKey.length);
        
        // Adjust QID position (content shifted by -(diffKey.length - '"Difficulty": "Easy"'.length))
        const diffShift = '"Difficulty": "Easy"'.length - diffKey.length;
        const adjustedQidIdx = content.indexOf('"QuestionID": "' + sr.qid + '"', diffIdx);
        
        if (adjustedQidIdx === -1) {
          skipped.push({ qid: sr.qid, reason: 'QID lost after Difficulty replace' });
          continue;
        }
        
        // Replace DifficultyScore (re-compute its index after the Difficulty replacement)
        const newScoreIdx = content.lastIndexOf(scoreKey, adjustedQidIdx);
        if (newScoreIdx === -1) {
          // Try any DifficultyScore >= 3 near the Difficulty
          // Search between difficulty and QID
          const between = content.substring(diffIdx, adjustedQidIdx);
          const anyScore = between.match(/"DifficultyScore":\s*(\d+)/);
          if (anyScore && parseInt(anyScore[1]) >= 3) {
            const scoreFull = between.match(/"DifficultyScore":\s*\d+/);
            const fullScoreIdx = diffIdx + between.indexOf(scoreFull[0]);
            content = content.substring(0, fullScoreIdx) + '"DifficultyScore": 1' +
              content.substring(fullScoreIdx + scoreFull[0].length);
          } else {
            // DifficultyScore might be in metadata block AFTER QID (Pack D dual-block)
            const afterQid = content.substring(adjustedQidIdx, adjustedQidIdx + 5000);
            const afterScore = afterQid.match(/"DifficultyScore":\s*(\d+)/);
            if (afterScore && parseInt(afterScore[1]) >= 3) {
              const fullMatch = afterQid.match(/"DifficultyScore":\s*\d+/);
              const matchIdx = adjustedQidIdx + afterQid.indexOf(fullMatch[0]);
              content = content.substring(0, matchIdx) + '"DifficultyScore": 1' +
                content.substring(matchIdx + fullMatch[0].length);
            } else {
              skipped.push({ qid: sr.qid, reason: 'DifficultyScore not found near item' });
              continue;
            }
          }
        } else {
          content = content.substring(0, newScoreIdx) + '"DifficultyScore": 1' +
            content.substring(newScoreIdx + scoreKey.length);
        }

        packApplied++;
        totalApplied++;
        appliedQIDs.push({ qid: sr.qid, pack: packKey, section: sr.section, topic: sr.topic });
      }
      
      // Restore original order for reporting
      batch.reverse();

      if (skipped.length > 0) {
        console.log('  SKIPPED in ' + pf + ':');
        for (const s of skipped) console.log('    ' + s.qid + ': ' + s.reason);
      }

      fs.writeFileSync(filePath, content);
      console.log('  ' + pf + ': ' + packApplied + ' relabels applied, ' + skipped.length + ' skipped. Backup: ' + backupName);
    }

    console.log('\nApplied: ' + totalApplied + ' | Remaining Simple Relabels (deferred): ' +
      (simpleRelabels.length - totalApplied));
    return { totalApplied, backupPaths, appliedQIDs, allFindings, byClass, simpleRelabels, packStats };
  }

  // Write classification JSON (read-only mode)
  const outDir = path.join(BASE, 'scripts', 'output');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const reportPath = path.join(outDir, 'dl031_classification.json');
  const totalItems = Object.values(packStats).reduce((a, b) => a + b.total, 0);
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    items_scanned_total: totalItems,
    items_flagged: allFindings.length,
    by_classification: byClass,
    by_pack: packStats,
    simple_relabels: simpleRelabels.map(sr => ({
      qid: sr.qid, pack: sr.pack, section: sr.section, topic: sr.topic,
      cognitiveLevel: sr.cognitiveLevel, difficulty: sr.difficulty, overlapRatio: sr.overlapRatio,
    })),
    calibration_items: allFindings.filter(f => f.classification === 'Calibration').map(c => ({
      qid: c.qid, pack: c.pack, section: c.section, topic: c.topic,
      cognitiveLevel: c.cognitiveLevel, difficulty: c.difficulty, overlapRatio: c.overlapRatio,
    })),
    rewrite_required: allFindings.filter(f => f.classification === 'Rewrite Required').map(r => ({
      qid: r.qid, pack: r.pack, section: r.section, topic: r.topic,
      cognitiveLevel: r.cognitiveLevel, difficulty: r.difficulty,
    })),
  }, null, 2));
  console.log('\nReport written to: scripts/output/dl031_classification.json');
}

main();
