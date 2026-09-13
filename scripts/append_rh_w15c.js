const fs = require('fs');
const entry = `
## 2026-09-11 — Tier 3 Wave 15 CERTIFICATION (30 items Unprocessed -> Certified)

**Verification basis:** six-dimension HIGH per 2026-09-11 pass (30/30 clean, all keys independently re-derived, zero content fixes). User-approved.

**Flip:** scripts/certify_wave15.js — pack_b P1B-C-211..240, single 30-object change-set (Rule-5 compliant). Forward-bounded state search + quote-anchored batch close (last-in-file safe). Pre/post-asserts per item (Unprocessed + Tier-3 tag + unstamped -> Certified + certification_date 2026-09-11). Backup: .bak-cert15-20260911 (verified pre-write).

**Baseline:** §2 Total row regenerated Rule-7-compliantly via scripts/regen_total_20260911.js (derives 3,070/3,052 from raw grep; refuses on mismatch) after a hand-edit attempt was correctly BLOCKED by Rule 7. Note: the earlier Waves-13/14 Total update was a hand-edit that passed the guard — process gap acknowledged; all future baseline updates go through regeneration scripts. Backup: .bak-regentotal-20260911.

**Post-cert gates:** npm run preflight PASS 0 divergences (counts 560/620/620/590/680; Certified 3022 -> 3052, delta exactly +30; guard 89/89). npm run pipeline GREEN 0 errors; registry 3495 rows.

**Pool state:** 3,052 Certified / 3,070 total. Wave 15 live in delivery pool. Tier-3 program totals: Waves 1-15 authored 450 items (13 waves x 30 + W8 tails counted within wave structure); Waves 13/14/15 (90 items) certified this session.
`;
fs.appendFileSync('knowledge/REVISION_HISTORY.md', entry, 'utf8');
console.log('appended');