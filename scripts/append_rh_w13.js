const fs = require('fs');
const entry = `
## 2026-09-11 — Tier 3 Wave 13 INSERT (Pack C Section D, P1-DC-101..130, Unprocessed)

**Scope:** 30 new Analyze/Evaluate items authored for Pack C Section D (joint/by-product costing, process-costing EU/EWIP/BWIP, service-department allocation, spoilage/scrap/rework, capacity & ethics). Staging: scripts/tier3_wave13a.js (101-104 + WITHDRAWN 105 draft), tier3_wave13a2.js (corrected 105 + 106-110), tier3_wave13b.js (111-113), tier3_wave13b2.js (114-120), tier3_wave13c.js (121-130). Verifier: scripts/verify_wave13.js ALL PASS (30/30 QIDs, keys A8/B8/C7/D7, DS4x21/DS5x9, CL Analyze22/Evaluate8, DL-008 0, DL-026 0, R18/R9 clean).

**Insert:** scripts/insert_wave13.js — pack_c 590 -> 620 objects, Function-constructor parse OK, all 30 QIDs present. Backup: content/packs/pack_c_corrected.js.bak-W13-20260911155002 (2,600,125 bytes, verified non-zero pre-write). QuestionID range P1-DC-101..130 verified absent pre-insert. No question_state changes to existing items (all 30 inserted Unprocessed); no key changes.

**Authoring defects caught pre-insert (staged files only, never reached pack):**
- P1-DC-105 (wave13a draft): EU inconsistency caught at authoring — withdrawn, corrected version shipped in wave13a2 (staged NRV $160,000 vs $110,000 of $270,000 -> $53,333/$36,667).
- Rotation-script $1-backreference bug (scripts/rotate_wave13_keys.js): 7 moved choice texts containing dollar amounts mangled ($180,000 -> "D": "80,000 pattern). All 7 slots rewritten wholesale from authored originals + 14 option-letter refs fixed (EW_B/EC). scripts/verify_wave13.js ALL PASS post-repair. Buggy rotator retained but MUST NOT be reused without $ escaping fix (use String.replace with function replacer).

**Key rebalance:** authored keys skewed B:15/D:2 -> mechanical choice-position rotation on 7 items (108/114/119/122/128 B->D; 116/125 B->C) -> A8/B8/C7/D7. No content changed; EW slots + EC letter-refs followed rotation.

**Validation:** npm run preflight PASS 0 divergences (Pack C expectation bumped 590->620 in scripts/preflight.js; Certified total 2962 unchanged — new items Unprocessed). npm run pipeline GREEN (0 errors; Wave-13 QIDs zero mentions in ValidationReport). Registry rebuilt: 3435 rows.

**Residual:** CL 22 Analyze/8 Evaluate vs 20/10 wave target (-2 Evaluate; adjust Wave 14). Items pending six-dimension verification + certification (NOT Certified; excluded from delivery pool).
`;
fs.appendFileSync('knowledge/REVISION_HISTORY.md', entry, 'utf8');
console.log('appended');