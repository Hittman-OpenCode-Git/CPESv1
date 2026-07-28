// S708 Cross-Pack Residual Defect Analyzer
// Read-only. Object-bounded (Function constructor parse). No forward-scan.
// Outputs: JSON report to stdout.

const fs = require('fs');
const path = require('path');

const PACKS = ['a', 'b', 'c', 'd', 'e'];
const LETTERS = ['A', 'B', 'C', 'D'];

function analyzePack(packLetter) {
  const filePath = path.join(__dirname, '..', '..', `pack_${packLetter}_corrected.js`);
  const source = fs.readFileSync(filePath, 'utf8');

  // Find the array variable name
  const varMatch = source.match(/(?:var|const|let)\s+(\w+)\s*=\s*\[/);
  if (!varMatch) return { error: `Cannot find array variable in pack_${packLetter}` };

  const varName = varMatch[1];
  // Evaluate the source to define the variable, then return it
  const parseFn = new Function(source + ';\nreturn ' + varName + ';');
  const items = parseFn();

  const results = {
    pack: packLetter,
    qid_count: items.length,
    dl008: [],
    dl025: [],
    dl026_fields: [],
    dl026_items: [],
    state_counts: { Certified: 0, 'Editorial Queue': 0, Archived: 0, Unprocessed: 0, missing: 0 },
    ew_non_empty_by_pos: { A: 0, B: 0, C: 0, D: 0, total: 0 }
  };

  for (const item of items) {
    const cc = item.CorrectChoice;
    if (!cc) {
      results.missing_cc = (results.missing_cc || 0) + 1;
      continue;
    }

    // State count
    const state = item.question_state || 'missing';
    results.state_counts[state] = (results.state_counts[state] || 0) + 1;

    let dl008_flags = [];
    let dl025_flags = [];
    let dl026_empty_slots = [];

    for (const L of LETTERS) {
      const ewKey = 'ExplanationWrong' + L;
      const ewVal = item[ewKey];

      // Count non-empty for overall stats
      if (ewVal && ewVal.length > 0) {
        results.ew_non_empty_by_pos[L]++;
        results.ew_non_empty_by_pos.total++;
      }

      // DL-008: non-empty at CorrectChoice slot
      if (L === cc && ewVal && ewVal.length > 0) {
        dl008_flags.push({ slot: L, len: ewVal.length, excerpt: ewVal.substring(0, 80) });
      }

      // DL-025/DL-026: empty at non-CorrectChoice distractor slot
      if (L !== cc) {
        if (ewVal === undefined || ewVal === null) {
          dl025_flags.push({ slot: L, status: 'absent' });
        } else if (typeof ewVal === 'string' && ewVal.length === 0) {
          dl025_flags.push({ slot: L, status: 'empty' });
          dl026_empty_slots.push(L);
        }
      }
    }

    if (dl008_flags.length > 0) {
      results.dl008.push({
        qid: item.QuestionID,
        section: item.Section || '?',
        state: item.question_state || 'missing',
        cc: cc,
        flags: dl008_flags
      });
    }

    if (dl025_flags.length > 0) {
      results.dl025.push({
        qid: item.QuestionID,
        section: item.Section || '?',
        state: item.question_state || 'missing',
        cc: cc,
        flags: dl025_flags
      });
    }

    if (dl026_empty_slots.length > 0) {
      results.dl026_items.push({
        qid: item.QuestionID,
        section: item.Section || '?',
        state: item.question_state || 'missing',
        cc: cc,
        empty_slots: dl026_empty_slots,
        count: dl026_empty_slots.length
      });
      results.dl026_fields += dl026_empty_slots.length;
    }
  }

  // Summarize
  results.dl008_summary = {
    total: results.dl008.length,
    certified: results.dl008.filter(d => d.state === 'Certified').length,
    other: results.dl008.filter(d => d.state !== 'Certified').length
  };

  const dl025_summary_items = results.dl025.length;
  results.dl025_summary = {
    total_items: dl025_summary_items,
    certified: results.dl025.filter(d => d.state === 'Certified').length,
    total_empty_slots: results.dl025.reduce((s, d) => s + d.flags.length, 0),
    total_absent_slots: results.dl025.reduce((s, d) => s + d.flags.filter(f => f.status === 'absent').length, 0),
    total_empty_string_slots: results.dl025.reduce((s, d) => s + d.flags.filter(f => f.status === 'empty').length, 0)
  };

  results.dl026_summary = {
    total_fields: results.dl026_fields,
    total_items: results.dl026_items.length,
    certified: results.dl026_items.filter(d => d.state === 'Certified').length,
    unprocessed: results.dl026_items.filter(d => d.state === 'Unprocessed').length,
    archived: results.dl026_items.filter(d => d.state === 'Archived').length
  };

  return results;
}

// Run all packs
const allResults = {};
for (const p of PACKS) {
  try {
    allResults[p] = analyzePack(p);
  } catch (e) {
    allResults[p] = { pack: p, error: e.message };
  }
}

// Cross-pack totals
const totals = {
  total_qids: 0,
  total_certified: 0,
  total_editorial: 0,
  total_archived: 0,
  total_unprocessed: 0,
  total_missing_state: 0,
  total_dl008: 0,
  total_dl008_certified: 0,
  total_dl026_fields: 0,
  total_dl026_items: 0,
  total_dl026_certified: 0,
  total_dl026_unprocessed: 0
};

for (const p of PACKS) {
  const r = allResults[p];
  if (r.error) continue;
  totals.total_qids += r.qid_count;
  totals.total_certified += r.state_counts.Certified || 0;
  totals.total_editorial += r.state_counts['Editorial Queue'] || 0;
  totals.total_archived += r.state_counts.Archived || 0;
  totals.total_unprocessed += r.state_counts.Unprocessed || 0;
  totals.total_missing_state += r.state_counts.missing || 0;
  totals.total_dl008 += r.dl008_summary.total;
  totals.total_dl008_certified += r.dl008_summary.certified;
  totals.total_dl026_fields += r.dl026_summary.total_fields;
  totals.total_dl026_items += r.dl026_summary.total_items;
  totals.total_dl026_certified += r.dl026_summary.certified;
  totals.total_dl026_unprocessed += r.dl026_summary.unprocessed;
}

const report = {
  session: '708',
  timestamp: new Date().toISOString(),
  methodology: 'Function constructor parse with within-object CorrectChoice extraction (G-NEW-3 compliant). No forward-scan.',
  cross_pack_totals: totals,
  per_pack: allResults
};

console.log(JSON.stringify(report, null, 2));
