const fs = require('fs');
const varNames = { pack_a: 'MCQ_BANK_A', pack_b: 'MCQ_BANK_B', pack_c: 'MCQ_BANK_C', pack_d: 'MCQ_BANK_D', pack_e: 'MCQ_BANK_E' };

function analyzePack(prefix) {
  const filename = prefix + '_corrected.js';
  const d = fs.readFileSync(filename, 'utf8');
  const varName = varNames[prefix];
  const fn = new Function(d + '; return ' + varName + ';');
  const items = fn();
  const sections = {};
  items.forEach(item => {
    const sec = item.Section || '?';
    if (!sections[sec]) sections[sec] = { item_count: 0, Certified: 0, Unprocessed: 0, Archived: 0, EditorialQueue: 0 };
    sections[sec].item_count++;
    const state = item.question_state || 'unknown';
    sections[sec][state] = (sections[sec][state] || 0) + 1;
  });
  const summary = {};
  for (const [sec, data] of Object.entries(sections)) {
    const total = data.item_count;
    const cert = data.Certified || 0;
    const unp = data.Unprocessed || 0;
    const arch = data.Archived || 0;
    let status = 'partial';
    if (cert === total) status = 'fully_certified';
    else if (unp === total) status = 'unprocessed';
    else if (arch === total) status = 'all_archived';
    summary[sec] = { item_count: total, certified: cert, unprocessed: unp, archived: arch, status };
  }
  return summary;
}

const result = {};
for (const p of ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e']) {
  result[p] = analyzePack(p);
}
console.log(JSON.stringify(result, null, 2));
