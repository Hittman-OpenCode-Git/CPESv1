const fs = require('fs');
const entry = `
## 2026-09-11 — Tier 3 Waves 13+14 CERTIFICATION (60 items Unprocessed -> Certified)

**Flip:** scripts/certify_waves1314.js — pack_c P1-DC-101..130 (W13) + pack_a P1-C-101..130 (W14), 30 per change-set (Rule-5 compliant). Method: forward-bounded question_state search per QID (no brace-matching — DL-020 safe; prior cert script's backward search failed because question_state follows QuestionID in these objects; last-in-file no-trailing-comma handled by quote-anchored batch close). Pre-asserts per item (Unprocessed + Tier-3 tag + unstamped); post-asserts (Certified + certification_date 2026-09-11). Backups: .bak-cert1314-2026091120 (pack_c 2,728,328 bytes; pack_a 2,651,521 bytes, both verified pre-write).

**Verification basis:** six-dimension HIGH per 2026-09-11 verification pass (57/60 clean, 3 repaired: DC-104 key arithmetic EU 9,070/$21.17; DC-101 EC margins 59.5%/60.7% + exact pro-rata values; C-101 choice-B/EW/EC $15,600/$6,400). User-approved.

**Post-cert gates:** npm run preflight PASS 0 divergences (counts 560/590/620/590/680; Certified 2962 -> 3022, delta exactly +60, no collateral; guard 89/89). Baseline §2 Total updated 2,980/2,962 -> 3,040/3,022. npm run pipeline GREEN 0 errors; registry 3465 rows.

**Pool state:** 3,022 Certified / 3,040 total. Waves 13+14 live in delivery pool.
`;
fs.appendFileSync('knowledge/REVISION_HISTORY.md', entry, 'utf8');
console.log('appended');