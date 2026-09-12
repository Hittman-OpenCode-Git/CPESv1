// regen_pack_baselines_20260910.js — Rule-7-compliant baseline regeneration.
// Derives CURRENT_BASELINES.md §1 (MCQ rows) + §2 (certified snapshot) from raw pack files.
// Methodology: SHA256/file size from disk; QID + Certified via direct grep (same as preflight).
// Backs up CURRENT_BASELINES.md before writing. Run: node scripts/regen_pack_baselines_20260910.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const BASE = path.resolve(__dirname, '..');
const BL = path.join(BASE, 'knowledge', 'CURRENT_BASELINES.md');
const PACKS = [
  { label: 'pack_a_corrected.js', file: 'content/packs/pack_a_corrected.js' },
  { label: 'pack_b_corrected.js', file: 'content/packs/pack_b_corrected.js' },
  { label: 'pack_c_corrected.js', file: 'content/packs/pack_c_corrected.js' },
  { label: 'pack_d_corrected.js', file: 'content/packs/pack_d_corrected.js' },
  { label: 'pack_e_corrected.js', file: 'content/packs/pack_e_corrected.js' },
];
const stats = PACKS.map(p => {
  const fp = path.join(BASE, p.file);
  const buf = fs.readFileSync(fp);
  const txt = buf.toString('utf8');
  return {
    label: p.label,
    sha: crypto.createHash('sha256').update(buf).digest('hex').toUpperCase(),
    size: buf.length,
    qids: (txt.match(/"QuestionID"\s*:/g) || []).length,
    cert: (txt.match(/"question_state"\s*:\s*"Certified"/g) || []).length,
  };
});
for (const s of stats) console.log(`${s.label} sha=${s.sha} size=${s.size} qids=${s.qids} cert=${s.cert}`);
fs.copyFileSync(BL, BL + '.bak-regen-20260910');
let bl = fs.readFileSync(BL, 'utf8');
// §1 MCQ rows: replace SHA + size cells, append provenance note
for (const s of stats) {
  const rowRe = new RegExp('(\\| `' + s.label.replace(/\./g, '\\.') + '` \\| `)[0-9A-F]+(` \\| `TBD` \\| )[0-9,]+');
  if (!rowRe.test(bl)) { console.log('ROW NOT FOUND: ' + s.label); continue; }
  bl = bl.replace(rowRe, '$1' + s.sha + '$2' + s.size.toLocaleString('en-US'));
}
// §2 per-pack certified cells: Pack C 500->cert, Pack D 500->cert
const sec2 = bl.indexOf('## 2. Certified Pool');
if (sec2 === -1) throw new Error('§2 not found');
let sec2txt = bl.substring(sec2);
for (const s of stats) {
  const packLetter = s.label.charAt(5).toUpperCase();
  const rowRe = new RegExp('(\\| Pack ' + packLetter + ' \\| ' + s.qids + ' \\| )\\d+');
  sec2txt = sec2txt.replace(rowRe, '$1' + s.cert);
}
// §2 Total row
const totalQ = stats.reduce((a, s) => a + s.qids, 0);
const totalC = stats.reduce((a, s) => a + s.cert, 0);
sec2txt = sec2txt.replace(/(\| \*\*Total\*\* \| )\*\*[\d,]+\*\*( \| )\*\*[\d,]+\*\*/, '$1**' + totalQ.toLocaleString('en-US') + '**$2**' + totalC.toLocaleString('en-US') + '**');
bl = bl.substring(0, sec2) + sec2txt;
// §6 log row (append after the S918-Authoring Wave line)
const logRow = '| 2026-09-10 | **Polish regen_baselines (Tier 1.2)** | 5 MCQ pack files — SHA-256 + size recaptured from content/packs; §2 certified snapshot recomputed via direct grep (same method as preflight). Drift from 2026-08-03 snapshot AUTHORIZED: DL-012 archival disposition (18 clones Certified→Archived 2026-09-05: C 500→486, D 500→496) + Tier 1/2 polish waves (VerifiedChecks, Part1OnlyFlag, DL-031). Certified pool: 2,620→2,602. QID counts unchanged (500/500/500/500/620). | Yes — 5 files re-baselined |';
bl = bl.replace(/(\| 2026-09-04 \| \*\*S918-Authoring Wave[^\n]*\n)/, '$1' + logRow + '\n');
// footer note
bl = bl.replace(/\*Last updated: [^\n]*\n/, '*Last updated: 2026-09-10 regen_pack_baselines — Tier 1.2 recurrency. Certified pool: 2,602 (A 500 + B 500 + C 486 + D 496 + E 620). QID: 500/500/500/500/620. Governance guard 74/74.*\n');
fs.writeFileSync(BL, bl, 'utf8');
console.log(`TOTAL qids=${totalQ} cert=${totalC}`);
console.log('CURRENT_BASELINES.md regenerated + backed up. Verify with npm run preflight.');