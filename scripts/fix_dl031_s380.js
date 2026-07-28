/**
 * S380 DL-031 Calibration Board — Repair Script v2
 * Fixed: dl031_review_note insertion (stops at closing brace, not newline)
 */
const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');

const calibrationChanges = [
  { qid: 'P1B-F-134', pack: 'B', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Pure definition match — stem describes vulnerability management process, asks "this process is known as"' },
  { qid: 'P1B-F-146', pack: 'B', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Pure definition match — stem describes data lineage, asks "this tracking capability is known as"' },
  { qid: 'P1-BC-054', pack: 'C', diff_before: 'Difficult', diff_after: 'Moderate-Easy', ds_before: 4, ds_after: 2,
    rationale: 'Scenario-based top-down budgeting drawback — requires concept recognition but labeled Difficult(4) is inflated' },
  { qid: 'P1-FC-041', pack: 'C', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Definition match — blockchain characteristic identification; thin scenario wrapper, rotation clone' },
  { qid: 'P1-FC-042', pack: 'C', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as FC-041 (rotation clone)' },
  { qid: 'P1-FC-043', pack: 'C', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as FC-041 (rotation clone)' },
  { qid: 'P1-FC-044', pack: 'C', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as FC-041 (rotation clone)' },
  { qid: 'P1-FC-061', pack: 'C', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Definition match — ERP primary benefit; reads like textbook definition' },
  { qid: 'P1-FC-063', pack: 'C', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as FC-061 (rotation clone)' },
  { qid: 'P1-FC-065', pack: 'C', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as FC-061 (rotation clone)' },
  { qid: 'P1-CD-053', pack: 'D', diff_before: 'Moderate-Easy', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Definition match — goal congruence; label/score inconsistent (Moderate-Easy label but DifficultyScore=3)' },
  { qid: 'P1-CD-054', pack: 'D', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as CD-053 (rotation clone)' },
  { qid: 'P1-FD-071', pack: 'D', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Definition match — data retention policy purpose' },
  { qid: 'P1-FD-072', pack: 'D', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as FD-071 (rotation clone)' },
  { qid: 'P1-FD-074', pack: 'D', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as FD-071 (rotation clone)' },
  { qid: 'P1-FD-075', pack: 'D', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 3, ds_after: 1,
    rationale: 'Same as FD-071 (rotation clone)' },
  { qid: 'P1-E-R01', pack: 'E', diff_before: 'Moderate', diff_after: 'Moderate-Easy', ds_before: 3, ds_after: 2,
    rationale: 'Scenario-based segregation of duties identification — requires applying concept to situation; stem explicitly describes incompatible duties' },
  { qid: 'P1-E-R37', pack: 'E', diff_before: 'Moderate', diff_after: 'Moderate-Easy', ds_before: 3, ds_after: 2,
    rationale: 'Scenario-based risk identification — stem explicitly describes Delphi method characteristics; requires recognition but not deep analysis' },
];

const rewriteChanges = [
  { qid: 'P1-EC-019', pack: 'C', cl_before: 'Analyze', cl_after: 'Apply', diff_before: 'Difficult', diff_after: 'Moderate', ds_before: 4, ds_after: 3,
    rationale: 'COSO Principle 17 aggregation evaluation — stem describes scenario requiring application of specific principle',
    dl031_review_note: 'Downgraded from Analyze->Apply — stem describes COSO Principle 17 deficiency aggregation scenario (DL-031)' },
  { qid: 'P1-FC-005', pack: 'C', cl_before: 'Analyze', cl_after: 'Understand', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 4, ds_after: 1,
    rationale: 'Stem IS a textbook definition of data governance',
    dl031_review_note: 'Downgraded from Analyze->Understand — stem is definitional per DL-031 classification (establishes ownership, definitions, quality standards, asks what concept)' },
  { qid: 'P1-FC-045', pack: 'C', cl_before: 'Analyze', cl_after: 'Understand', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 4, ds_after: 1,
    rationale: 'Same definition match as FC-041-044 rotation group, mislabeled Analyze',
    dl031_review_note: 'Downgraded from Analyze->Understand — stem is identical definition-match to FC-041-044 rotation group (DL-031)' },
  { qid: 'P1-CD-050', pack: 'D', cl_before: 'Analyze', cl_after: 'Understand', diff_before: 'Moderate', diff_after: 'Easy', ds_before: 4, ds_after: 1,
    rationale: 'Same definition match as CD-053-054 rotation group, mislabeled Analyze',
    dl031_review_note: 'Downgraded from Analyze->Understand — stem is identical definition-match to CD-053-054 rotation group; "What concept describes this alignment?" (DL-031)' },
];

const PACK_FILES = { B: 'pack_b_corrected.js', C: 'pack_c_corrected.js', D: 'pack_d_corrected.js', E: 'pack_e_corrected.js' };
const results = { calibration: [], rewrite: [], errors: [] };

const packSets = {};
for (const c of [...calibrationChanges, ...rewriteChanges]) {
  if (!packSets[c.pack]) packSets[c.pack] = [];
  packSets[c.pack].push(c);
}

for (const [packLabel, changes] of Object.entries(packSets)) {
  const filePath = path.join(BASE, PACK_FILES[packLabel]);
  console.log(`\n=== Processing ${PACK_FILES[packLabel]} (${changes.length} changes) ===`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Sort by file position (last first) for reverse processing
  changes.sort((a, b) => {
    return content.indexOf('"QuestionID": "' + b.qid + '"') - content.indexOf('"QuestionID": "' + a.qid + '"');
  });

  for (const c of changes) {
    const qidIdx = content.indexOf('"QuestionID": "' + c.qid + '"');
    if (qidIdx === -1) {
      results.errors.push({ qid: c.qid, reason: 'QID not found' });
      console.log('  SKIP ' + c.qid + ': QID not found');
      continue;
    }

    // --- Difficulty (search backward from QID) ---
    const diffFull = '"Difficulty": "' + c.diff_before + '"';
    const diffIdx = content.lastIndexOf(diffFull, qidIdx);
    if (diffIdx === -1 || qidIdx - diffIdx > 30000) {
      results.errors.push({ qid: c.qid, reason: 'Difficulty not found' });
      console.log('  SKIP ' + c.qid + ': Difficulty ' + c.diff_before + ' not found');
      continue;
    }
    content = content.substring(0, diffIdx) + '"Difficulty": "' + c.diff_after + '"' +
      content.substring(diffIdx + diffFull.length);

    // --- DifficultyScore (find closest to QID, checking both directions) ---
    const qidIdx2 = content.indexOf('"QuestionID": "' + c.qid + '"');
    const scoreFull = '"DifficultyScore": ' + c.ds_before;
    const fwScoreIdx = content.indexOf(scoreFull, qidIdx2);
    const bwScoreIdx = content.lastIndexOf(scoreFull, qidIdx2);
    
    // Pick the closest match to QID
    let scoreIdx = -1;
    if (fwScoreIdx !== -1 && bwScoreIdx !== -1) {
      scoreIdx = (fwScoreIdx - qidIdx2) < (qidIdx2 - bwScoreIdx) ? fwScoreIdx : bwScoreIdx;
    } else if (fwScoreIdx !== -1) {
      scoreIdx = fwScoreIdx;
    } else if (bwScoreIdx !== -1) {
      scoreIdx = bwScoreIdx;
    }
    
    if (scoreIdx === -1 || Math.abs(scoreIdx - qidIdx2) > 20000) {
      results.errors.push({ qid: c.qid, reason: 'DifficultyScore not found near QID distance=' + Math.abs(scoreIdx - qidIdx2) });
      console.log('  SKIP ' + c.qid + ': DifficultyScore not found');
      continue;
    }
    content = content.substring(0, scoreIdx) + '"DifficultyScore": ' + c.ds_after +
      content.substring(scoreIdx + scoreFull.length);

    // --- CognitiveLevel (forward from QID, after DifficultyScore) ---
    if (c.cl_before) {
      const qidIdx3 = content.indexOf('"QuestionID": "' + c.qid + '"');
      const clFull = '"CognitiveLevel": "' + c.cl_before + '"';
      const clIdx = content.indexOf(clFull, qidIdx3);
      if (clIdx === -1 || clIdx - qidIdx3 > 20000) {
        results.errors.push({ qid: c.qid, reason: 'CognitiveLevel not found' });
        console.log('  SKIP ' + c.qid + ': CognitiveLevel not found');
        continue;
      }
      content = content.substring(0, clIdx) + '"CognitiveLevel": "' + c.cl_after + '"' +
        content.substring(clIdx + clFull.length);
    }

    // --- DL-031 Review Note ---
    if (c.dl031_review_note) {
      const qidIdx4 = content.indexOf('"QuestionID": "' + c.qid + '"');
      // Find the closing brace of the metadata block (4-char indentation level)
      // Look for \n    }, after the QID
      const searchFrom = qidIdx4;
      const closingBrace = content.indexOf('\n    },', searchFrom);
      if (closingBrace !== -1) {
        // Insert before "}"
        const insertPos = closingBrace + 5; // '\n    '
        const escapedNote = c.dl031_review_note.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        const noteText = ',\n        "dl031_review_note": "' + escapedNote + '"';
        content = content.substring(0, insertPos) + noteText + content.substring(insertPos);
      } else {
        // Fallback: search for '},' after QID and insert before it
        const altBrace = content.indexOf('},', qidIdx4);
        if (altBrace !== -1 && altBrace - qidIdx4 < 5000) {
          const escapedNote = c.dl031_review_note.replace(/"/g, '\\"').replace(/\n/g, '\\n');
          const noteText = ',\n        "dl031_review_note": "' + escapedNote + '",';
          content = content.substring(0, altBrace) + noteText + content.substring(altBrace + 2);
        } else {
          results.errors.push({ qid: c.qid, reason: 'Closing brace not found for dl031 note' });
          console.log('  SKIP ' + c.qid + ': closing brace not found');
          continue;
        }
      }
    }

    console.log('  OK  ' + c.qid + ': ' + c.diff_before + '(' + c.ds_before + ')→' + c.diff_after + '(' + c.ds_after + ')' +
      (c.cl_before ? ' CL:' + c.cl_before + '→' + c.cl_after : ''));
  }

  fs.writeFileSync(filePath, content);
  console.log('  WRITTEN: ' + PACK_FILES[packLabel]);
}

// Verify
console.log('\n=== PARSE VERIFICATION ===');
const varNames = { B: 'MCQ_BANK_B', C: 'MCQ_BANK_C', D: 'MCQ_BANK_D', E: 'MCQ_BANK_E' };
for (const [pl, pf] of Object.entries(PACK_FILES)) {
  try {
    const items = new Function(fs.readFileSync(path.join(BASE, pf), 'utf8') + '; return ' + varNames[pl] + ';')();
    console.log('  ' + pf + ': ' + items.length + ' items PARSE OK');
  } catch(e) {
    console.log('  ' + pf + ': PARSE ERROR: ' + e.message.substring(0, 120));
  }
}

// Verify specific items
console.log('\n=== ITEM VERIFICATION ===');
const allQIDs = [...calibrationChanges.map(c => c.qid), ...rewriteChanges.map(c => c.qid)];
for (const [pl, pf] of Object.entries(PACK_FILES)) {
  try {
    const items = new Function(fs.readFileSync(path.join(BASE, pf), 'utf8') + '; return ' + varNames[pl] + ';')();
    for (const item of items) {
      if (allQIDs.includes(item.QuestionID)) {
        const cal = calibrationChanges.find(c => c.qid === item.QuestionID);
        const rew = rewriteChanges.find(c => c.qid === item.QuestionID);
        const expected = cal || rew;
        const ok = item.Difficulty === expected.diff_after && item.DifficultyScore === expected.ds_after &&
          (!expected.cl_after || item.CognitiveLevel === expected.cl_after);
        console.log('  ' + (ok ? 'OK' : 'MISMATCH') + '  ' + item.QuestionID + ': ' + item.Difficulty + '(' + item.DifficultyScore + ')' +
          (item.CognitiveLevel ? ' CL:' + item.CognitiveLevel : '') + (ok ? '' : ' [expected ' + expected.diff_after + '(' + expected.ds_after + ')' + (expected.cl_after ? ' CL:' + expected.cl_after : '') + ']'));
      }
    }
  } catch(e) {}
}

console.log('\nErrors: ' + results.errors.length);
for (const e of results.errors) console.log('  ' + e.qid + ': ' + e.reason);
console.log('\nDone.');
