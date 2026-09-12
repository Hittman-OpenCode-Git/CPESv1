const fs = require('fs');
const entry = `
## 2026-09-11 — Tier 3 Wave 15 INSERT (Pack B Section C, P1B-C-211..240, Unprocessed)

**Scope:** 30 new Analyze/Evaluate items for Pack B Sec C (An10/Ev1/DS5-1 across 110 items). Staging: scripts/tier3_wave15a.js (211-220), tier3_wave15b.js (221-230), tier3_wave15c.js (231-240). Pack B conventions verified from Wave-8 item (Topic "B-C.N", Key "B-C-N", LOSTag "P1-C Variance analysis"). Verifier: scripts/verify_wave15.js ALL PASS (30/30 QIDs, keys A8/B8/C7/D7, DS4x19/DS5x11, CL Analyze19/Evaluate11 with DS-CL pairing enforced, DL-008 0, DL-026 0, R18/R9 clean, key/topic format asserts, choice strong-absolute screen, DUP-QID screen).

**Drafting defects caught at authoring (staged files only):** 220 tail duplication (VerifiedChecks clobbered + P1B-C-220-DUP fragment — repaired); stray non-English word in 212C ("alguien" — repaired); 7 at-authoring key rebalances via hand-rewrite with consistent letter-refs (225/229 D->B in 15b; 232/234/237 D->A and 235/238/239/240 D->B in 15c — no mechanical rotation per W13 lesson); strong absolutes cleaned at authoring (Wave-14 lesson — verifier screens them); 19/11 DS/CL split kept demand-honest (gap needs Analyze-heavy) over symmetric 18/12.

**Insert:** scripts/insert_wave15.js — pack_b 590 -> 620 objects, Function-constructor parse OK, all 30 QIDs present (pre-verified absent). Backup: content/packs/pack_b_corrected.js.bak-W15-20260911163545 (1,929,378 bytes, verified pre-write). No question_state/key changes. Preflight expectation bumped 590->620 (scripts/preflight.js).

**Validation:** npm run preflight PASS (pipeline chained on exit 0). npm run pipeline GREEN, 0 errors; registry 3495 rows. Wave-15 report mentions: 4 warnings only — 2x legitimate restrictive "only" (216C, 218A per DL-003) + 2x AmbiguityValidator false positives on the technical term "normal capacity" (223A/D — defined denominator term, not a vague qualifier). No remediation required.

**Residual:** 30 items Unprocessed, pending six-dimension verification + certification (excluded from delivery pool).
`;
fs.appendFileSync('knowledge/REVISION_HISTORY.md', entry, 'utf8');
console.log('appended');