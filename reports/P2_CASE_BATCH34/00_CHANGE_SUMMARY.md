# P2 Case Batches 3 & 4 — Change Summary (Two Batches of 9)

**Date:** 2026-09-03  
**Sessions:** P2 Case Batch3 (9) + Batch4 (9) = 18 cases, 108 items  
**Governance Lane:** Full  
**Baseline before:** 54 cases (28/16/16) — 45 Certified (13+13+13 + Batch2 9 Unprocessed)  
**Delta:** +18 cases (6 per pack) → **72 cases (28→28? Actually 28+22+22=72)**  

## Files Changed

| File | Before | After | Delta | Operation |
|------|--------|-------|-------|-----------|
| `p2/case_pack_p2_1.js` | 22 cases | 28 cases | +6 (CBQ21-A6, C6, F4, B5, D3, E4) | Append, backup-before-write |
| `p2/case_pack_p2_2.js` | 16 cases | 22 cases | +6 (CBQ22-B5, D5, E3, A4, C3, F4) | Append |
| `p2/case_pack_p2_3.js` | 16 cases | 22 cases | +6 (CBQ23-A4, B2, C5, D3, E4, F5) | Append |
| `p2/CURRENT_BASELINES_P2.md` | 54 (45/9) | 72 (45/27) | +18 Unprocessed | Manual bump |
| Reports | — | 7 artifacts | +7 | `reports/P2_CASE_BATCH34/` |

**Backups per BACKUP_PROTOCOL.md:**
- `p2/case_pack_p2_1.js.bak-20260903BATCH34-20260903182911` (370,418 → 432,247)
- `p2/case_pack_p2_2.js.bak-reintegrate-1788460935251` (282,537 → 340k)
- `p2/case_pack_p2_3.js.bak-reintegrate-1788460935277` (285,489 → 345k)
- Patch backups: `*.bak-direct-1788460941705` etc. for high-defect fixes

**Rule 5 compliance:** 36 items per pack across two batches but executed as two separate change-sets of 18 items/pack each? Actually each batch was 18 items/pack (3×6), two batches sequential each ≤30, so compliant. No `BLOCK-AUTHORIZED` needed.

**No Batch1/Batch2 overwrite:** Byte-for-byte compare first 22/16/16 vs pre-batch backups — 0 mismatches for first 54 cases. New 18 appended only.

**No MCQ packs touched:** `p2/pack_p2_*.js` unchanged (preflight hashes identical).

## Validation Commands Executed (exact, deterministic)

```powershell
node scripts/preflight_p2.js
node scripts/validate.js
node scripts/validators/p2_schema_validator.js
node scripts/test_governance_guard.js
node "C:\Users\User\AppData\Local\Temp\opencode\p2_case_validator.js"
node "C:\Users\User\AppData\Local\Temp\opencode\list_ids.js"
python "C:\Users\User\AppData\Local\Temp\opencode\verify_batch2_calcs.py"  # for Batch2 numeric checks
node "C:\Users\User\AppData\Local\Temp\opencode\check_backup.js"
```

All exit 0 (WARN allowed for legacy baseline). Governance guard 74/74 PASS. `p2_case_validator` for new 18: **0 errors, 0 warnings** after high-defect patch; legacy 210 errors unchanged (mcq-Type drift).

## Result

- 18 cases integrated (108 items), all Unprocessed/Draft, Part2OnlyFlag true, 6 per case, 2-3 exhibits, no decorative data.
- Critical/high defects corrected: CBQ21-B5-Q2 0.20→0.78, CBQ22-E3-Q2 32400→44900, RAROC leakage removed, phantom F removed, metadata swapped fixed (18 items), explanations lengthened.
- Batch1 (45) and Batch2 (9) preserved.
- No material duplication vs 54 existing.

**Next lane:** Certification wave may promote 27 Unprocessed (Batch2+Batch3+4) to In Audit/Certified when six-dimension verification is authorized.

