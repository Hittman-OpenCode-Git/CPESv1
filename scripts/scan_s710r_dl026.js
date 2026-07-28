// S710R — Current object-bounded Certified DL-026 scan (Packs A, C, D)
// G-NEW-3 within-object extraction. No forward-scan methodology.
const fs = require('fs');
const path = require('path');

const PACKS = ['a', 'c', 'd'];
const LETTERS = ['A', 'B', 'C', 'D'];

function scanPack(packLetter) {
  const filePath = path.join(__dirname, '..', `pack_${packLetter}_corrected.js`);
  const source = fs.readFileSync(filePath, 'utf8');
  const varMatch = source.match(/(?:var|const|let)\s+(\w+)\s*=\s*\[/);
  if (!varMatch) return { error: `Cannot find array variable in pack_${packLetter}` };
  const varName = varMatch[1];
  const parseFn = new Function(source + ';\nreturn ' + varName + ';');
  const items = parseFn();

  const results = {
    pack: packLetter.toUpperCase(),
    qid_count: items.length,
    dl026_certified: [],
    state_counts: { Certified: 0, 'Editorial Queue': 0, Archived: 0, Unprocessed: 0, missing: 0 }
  };

  for (const item of items) {
    const state = item.question_state || 'missing';
    results.state_counts[state] = (results.state_counts[state] || 0) + 1;

    if (state !== 'Certified') continue;

    const cc = item.CorrectChoice;
    if (!cc) continue;

    // Check DL-008: EW[CC] non-empty?
    let dl008_flag = null;
    const ccKey = 'ExplanationWrong' + cc;
    if (item[ccKey] && item[ccKey].length > 0) {
      dl008_flag = { slot: cc, len: item[ccKey].length, excerpt: item[ccKey].substring(0, 60) };
    }

    // Check DL-026: empty EW at non-CC slot
    const emptySlots = [];
    for (const L of LETTERS) {
      if (L === cc) continue;
      const ewKey = 'ExplanationWrong' + L;
      const ewVal = item[ewKey];
      if (ewVal === undefined || ewVal === null || (typeof ewVal === 'string' && ewVal.length === 0)) {
        emptySlots.push({ slot: L, status: ewVal === undefined || ewVal === null ? 'ABSENT' : 'EMPTY_STRING' });
      }
    }

    if (emptySlots.length > 0) {
      results.dl026_certified.push({
        qid: item.QuestionID,
        section: item.Section || '?',
        cc: cc,
        empty_slots: emptySlots.map(s => s.slot),
        empty_details: emptySlots,
        dl008_clean: dl008_flag === null,
        dl008_detail: dl008_flag,
        total_empty: emptySlots.length
      });
    }
  }

  results.dl026_certified_count = results.dl026_certified.length;
  return results;
}

const report = {
  session: '710R',
  timestamp: new Date().toISOString(),
  methodology: 'G-NEW-3 object-bounded via Function constructor. Within-object CorrectChoice extraction. DL-026 = empty ExplanationWrong at non-CC slot on Certified items.',
  packs: {},
  totals: { dl026_certified: 0, qid_list: [] }
};

for (const p of PACKS) {
  report.packs[p] = scanPack(p);
  report.totals.dl026_certified += report.packs[p].dl026_certified_count;
  for (const item of report.packs[p].dl026_certified) {
    report.totals.qid_list.push(item.qid);
  }
}

console.log(JSON.stringify(report, null, 2));
