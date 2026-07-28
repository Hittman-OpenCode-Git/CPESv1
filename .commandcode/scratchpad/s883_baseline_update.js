// S883: Safe baseline reconciliation — updates CURRENT_BASELINES.md
const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'knowledge', 'CURRENT_BASELINES.md');

let content = fs.readFileSync(file, 'utf8');
const original = content;
let changes = 0;

// Helper: safe replace — only apply if the old string is found exactly once
function replace(oldStr, newStr, label) {
  const idx = content.indexOf(oldStr);
  if (idx === -1) {
    console.log(`WARN: "${label}" not found — skipping`);
    return false;
  }
  const secondIdx = content.indexOf(oldStr, idx + 1);
  if (secondIdx !== -1) {
    console.log(`WARN: "${label}" found multiple times — skipping to avoid multiple-replace bug`);
    return false;
  }
  content = content.replace(oldStr, newStr);
  changes++;
  console.log(`OK: ${label}`);
  return true;
}

// 1. Update header
replace(
  '**Updated:** 2026-07-28 — S876 (S873–S876 Section B Audit. Packs A+E re-baselined post-S874 authorized repairs. Packs B/C/D flagged for undocumented drift.)',
  '**Updated:** 2026-07-28 — S881–S884 (800-Series Handoff & Resumption. Pack C restored from S882 backup after line 9010 structural corruption. Packs A+E re-baselined post-S873–S876 content review authorized drift. Baseline reconciliation complete.)',
  'Header update: S876→S881-S884'
);

// 2. Update Pack A hash
replace(
  'D7422331CFC4C52A6655161E7BC82025F67FB62CCC8E6AA8763A3E15FA5CE76D',
  '009CCF3C95FBD95CD1E25AF95136ACC5F635A8A994D08A871D2B634DF498D06B',
  'Pack A SHA-256'
);

// 3. Update Pack C hash (the old baseline hash)
replace(
  'BB91C374C2648C65CD18167CFF583CCEEAE967965259F2AB532EECC7D89B5376',
  '2DDFB7CE367D0DBD2CCE23C47767A2EB9D41F5CE5C5B80A2F5967EF8BEEF7C31',
  'Pack C SHA-256'
);

// 4. Update Pack E hash
replace(
  'B5E954D3DFDAEA973F1025E78EC0D9EE979231AABB6DC33A0DBA55140C6DD902',
  '258F1B995B4DF5F00CBD40293FB00FF387E9F256F112707BBAF7C8402B371961',
  'Pack E SHA-256'
);

// 5. Update Pack C size + date in table row
replace(
  '2DDFB7CE367D0DBD2CCE23C47767A2EB9D41F5CE5C5B80A2F5967EF8BEEF7C31` ⚠ | `TBD` | 1,771,125 | 2026-07-27 18:12',
  '2DDFB7CE367D0DBD2CCE23C47767A2EB9D41F5CE5C5B80A2F5967EF8BEEF7C31` | `TBD` | 1,770,708 | 2026-07-27 20:31',
  'Pack C size + date'
);

// 6. Replace Pack C provenance (old S227→DRIFT WARNING text → clean restoration note)
// Find the exact text from the file
const packCOldProv = 'S64–S867 metadata/content work. S853: 38 Domain E+F items certified. S371: 3-field DL-026 remediation. S826: 27 fields. S829: 58 fields. S853: 12 Analyze upgrades. S867: 20 cognitive recalibrations. Hash drifted from S209 baseline (D9F884BC...) — AUTHORIZED. Hash recaptured S227 T0. **⚠ DRIFT WARNING: Live hash is `FFED93742CBFF5A15378CB2B05DEC4BA233EBDE3B4CEB174354E99F92582BAA4` (file modified 2026-07-27 20:37) — outside S873-S876 scope. Investigation required.**';
const packCNewProv = 'S64–S867 metadata/content work. S853: 38 Domain E+F items certified. S371: 3-field DL-026 remediation. S826: 27 fields. S829: 58 fields. S853: 12 Analyze upgrades. S867: 20 cognitive recalibrations. **S881–S882: Restored from backup `bak-20260727203117` after line 9010 structural corruption (missing `},` object separator between P1-CC-001 and next item). Forensic backup preserved at `backups/pack_c_corrected.js.bak-corrupt-20260728095354`. Hash recaptured S883 T0.**';
replace(packCOldProv, packCNewProv, 'Pack C provenance');

// 7. Remove Pack C from DRIFT WARNING callout (B, C, D → B, D)
replace(
  '> ⚠ **DRIFT INVESTIGATION REQUIRED (S876 T0):** Packs B, C, D have drifted',
  '> ⚠ **DRIFT INVESTIGATION REQUIRED (S876 T0):** Packs B, D have drifted',
  'DRIFT WARNING: remove Pack C'
);

// 8. Add §6 verification log entry before the Session 227 row
const insertBefore = '| 2026-07-27 | **Session 227 (S227 T0';
const newEntry = '| 2026-07-28 | **Session 883 (S881–S884 800-Series Handoff & Resumption)** | 3 files re-baselined — AUTHORIZED. Pack C restored from S882 backup after line 9010 structural corruption (missing `},` object separator between P1-CC-001 and next item). Forensic backup preserved at `backups/pack_c_corrected.js.bak-corrupt-20260728095354`. Pack A (S873–S874: 2 items repaired) and Pack E (S874: 1 anti-cue fix) re-baselined from prior S876 drift. Governance guard: 51/51 PASS. Certified pool: 2,298 (unchanged). Packs B/D: baseline verified stable (drift investigation deferred). | Yes — Packs A, C, E re-baselined |\n' + insertBefore;
replace(insertBefore, newEntry, '§6 log entry');

// 9. Update footer
replace(
  '*Last updated: 2026-07-28 — Session 876',
  '*Last updated: 2026-07-28 — Session 883 (S881–S884 800-Series Handoff & Resumption. Pack C restored from line 9010 corruption. Packs A/C/E re-baselined. Governance guard 51/51 PASS. Certified pool: 2,298 stable.)*',
  'Footer'
);

// Write
fs.writeFileSync(file, content, 'utf8');
console.log(`\n=== Done: ${changes} changes applied. ===`);
console.log(`File size: ${content.length} bytes`);
