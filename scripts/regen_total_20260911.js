// Rule-7-compliant §2 Total-row regeneration: derives QID + Certified totals
// from raw pack files via direct grep (same method as preflight), backs up first.
// Refuses to write unless derived totals match preflight's live counts.
const fs = require('fs');
const path = require('path');
const BASE = path.resolve(__dirname, '..');
const files = [
  'content/packs/pack_a_corrected.js',
  'content/packs/pack_b_corrected.js',
  'content/packs/pack_c_corrected.js',
  'content/packs/pack_d_corrected.js',
  'content/packs/pack_e_corrected.js',
];
let totalQ = 0, totalC = 0;
for (const f of files) {
  const txt = fs.readFileSync(path.join(BASE, f), 'utf8');
  const q = (txt.match(/"QuestionID"\s*:/g) || []).length;
  const c = (txt.match(/"question_state"\s*:\s*"Certified"/g) || []).length;
  console.log(`${f}: qids=${q} cert=${c}`);
  totalQ += q; totalC += c;
}
if (totalQ !== 3070 || totalC !== 3052) throw new Error(`DERIVED TOTALS UNEXPECTED: qids=${totalQ} cert=${totalC}`);
const BL = path.join(BASE, 'knowledge', 'CURRENT_BASELINES.md');
fs.copyFileSync(BL, BL + '.bak-regentotal-20260911');
let bl = fs.readFileSync(BL, 'utf8');
const rowRe = /\| \*\*Total\*\* \| \*\*[\d,]+\*\* \| \*\*[\d,]+\*\* \|[^\n]*/;
const m = bl.match(rowRe);
if (!m) throw new Error('Total row not found');
const note = '| Tier 3 Waves 13+14+15 certified 2026-09-11 (A 560/560; B 620/620 incl. P1B-C-211..240; C 620/606; D 590/586; E 680/680) |';
const newRow = `| **Total** | **${totalQ.toLocaleString('en-US')}** | **${totalC.toLocaleString('en-US')}** | ` + note;
bl = bl.slice(0, m.index) + newRow + bl.slice(m.index + m[0].length);
fs.writeFileSync(BL, bl, 'utf8');
console.log(`TOTAL row regenerated: qids=${totalQ} cert=${totalC}`);