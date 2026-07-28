// Targeted DL-026 verification for disputed Pack D items
const fs = require('fs');

function scanItem(filePath, targetQid) {
  const source = fs.readFileSync(filePath, 'utf8');
  const varMatch = source.match(/(?:var|const|let)\s+(\w+)\s*=\s*\[/);
  const varName = varMatch[1];
  const parseFn = new Function(source + ';\nreturn ' + varName + ';');
  const items = parseFn();
  
  const item = items.find(i => i.QuestionID === targetQid);
  if (!item) return { error: 'Not found', qid: targetQid };
  
  const LETTERS = ['A', 'B', 'C', 'D'];
  const cc = item.CorrectChoice;
  const result = { qid: targetQid, cc, state: item.question_state, ew: {} };
  
  for (const L of LETTERS) {
    const ewKey = 'ExplanationWrong' + L;
    const ewVal = item[ewKey];
    result.ew[L] = {
      present: ewVal !== undefined && ewVal !== null,
      empty: ewVal === undefined || ewVal === null || ewVal.length === 0,
      len: ewVal ? ewVal.length : -1,
      isCC: L === cc,
      preview: ewVal ? ewVal.substring(0, 60) : 'N/A'
    };
  }
  
  result.dl008 = result.ew[cc].empty ? 'CLEAN' : 'DL-008: NON-EMPTY EW[CC]';
  result.dl026 = Object.entries(result.ew)
    .filter(([L, v]) => !v.isCC && v.empty)
    .map(([L]) => L);
  result.dl026_verdict = result.dl026.length > 0 ? `DL-026: ${result.dl026.length} empty non-CC slots: ${result.dl026.join(',')}` : 'CLEAN';
  
  return result;
}

// S708 Pack D list
const s708_list = ['P1-AD-047', 'P1-AD-052', 'P1-BD-014', 'P1-BD-042', 'P1-BD-047', 'P1-CD-002', 'P1-CD-012', 'P1-CD-031', 'P1-DD-006', 'P1-DD-025'];

// S709 Pack D list
const s709_list = ['P1-AD-047', 'P1-AD-048', 'P1-AD-054', 'P1-AD-055', 'P1-CD-002', 'P1-CD-003', 'P1-CD-006', 'P1-CD-022', 'P1-CD-023', 'P1-CD-034'];

// Current scan list
const current_list = ['P1-AD-047', 'P1-AD-048', 'P1-AD-054', 'P1-AD-055', 'P1-CD-002', 'P1-CD-003', 'P1-CD-006', 'P1-CD-022', 'P1-CD-023', 'P1-CD-034'];

// All unique QIDs
const allQids = [...new Set([...s708_list, ...s709_list, ...current_list])];

const results = {};
for (const qid of allQids) {
  results[qid] = scanItem('pack_d_corrected.js', qid);
}
console.log(JSON.stringify(results, null, 2));

// Also check Pack C items from both lists
const s708_packC = ['P1-BC-094', 'P1-DC-019'];
const s709_packC = ['P1-AC-001', 'P1-AC-002'];

console.log('\n=== PACK C VERIFICATION ===');
for (const qid of [...s708_packC, ...s709_packC]) {
  const r = scanItem('pack_c_corrected.js', qid);
  console.log(`${qid}: state=${r.state}, cc=${r.cc}, dl026=${r.dl026.join(',') || 'CLEAN'}`);
}
