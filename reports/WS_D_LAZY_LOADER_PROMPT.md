# WS-D Prompt — Lazy-Loader Fail-Closed (Governance Light Lane)

> **SUPERSEDED 2026-09-22 (Board M2, unanimous).** The scoped work was executed
> 2026-09-21 23:15 (REVISION_HISTORY.md) and behavior-verified by E-02 matrix
> 12/12 (`reports/PHASE_S1_CLOSEOUT_20260922.md`). Retained as scope record only —
> do not execute. Verification on any future loader touch: re-run E-02.

**Version:** 1.0
**Status:** Complete — executed 2026-09-21T23:15 (T0-Tend green, single file: app/app.js)
**Lane:** Governance Light Lane
**Token:** `may_3_0_adaptive_selection`

---

## Executive Summary

Fix the P2 lazy-loader (`P2BankLoader` in `app/app.js:1401-1435`) to:
1. Check **all 11 P2 globals** in `isLoaded()` (currently only checks `pack_p2_a_questions`)
2. **Block P2 session start explicitly** on `ensureLoaded()` failure (currently silently swallowed in catch blocks at lines 2613-2615 and 6651-6653)
3. **Preserve P1 sessions** — gate only fires at `getExamPart() === 'P2'` (line 2606)

**No delivery changes to P1.** Zero pack/case/key/state modifications.

---

## Current State (Verified)

| Component | Location | Current Behavior | Required Behavior |
|-----------|----------|------------------|-------------------|
| `isLoaded()` | `app/app.js:1401-1410` | Checks only `pack_p2_a_questions` | Check all 11 P2 globals |
| `ensureLoaded()` | `app/app.js:1412-1435` | Errors caught & swallowed silently | Throw/return error → block P2 session |
| Session start guard | `app/app.js:2606` | `getExamPart() === 'P2'` check | Preserve; only P2 affected |
| Validation catch | `app/app.js:6651-6653` | Silent swallow | Explicit error for P2 |

**11 P2 Globals to Check** (from `p2/` pack files):
- `pack_p2_a_questions`, `pack_p2_b_questions`, `pack_p2_c_questions`
- `pack_p2_d_questions`, `pack_p2_e_questions`, `pack_p2_f_questions`
- `pack_p2_g_questions`, `pack_p2_h_questions`, `pack_p2_i_questions`
- `pack_p2_j_questions`, `pack_p2_k_questions`

---

## Session Plan — Single Light Lane Session

### T0 — Preflight (Mandatory per §9.3)
```bash
npm run preflight
```
Verify: 0 divergences, 3,052 P1 + 3,450 P2 Certified, baseline coherence 0.

### T1 — Backup Protocol (§3)
```bash
# Backup app.js before edit
Copy-Item "app/app.js" "backups/app.js.bak-$(Get-Date -Format 'yyyyMMddHHmmss')"
```
Confirm backup exists and non-zero size.

### T2 — Implementation
**Files to modify:** `app/app.js` (only)

**Changes:**
1. **`isLoaded()`** (lines ~1401-1410): Replace single-global check with array of all 11 P2 globals; return `true` only if all exist and are arrays with length > 0.
2. **`ensureLoaded()`** (lines ~1412-1435): On load failure, throw descriptive error (not swallow). Error message must indicate which global(s) failed.
3. **Session start catch** (lines ~2613-2615): Catch `ensureLoaded` error → show user-facing "Part 2 content unavailable" modal → abort session start (do not proceed with partial load).
4. **Validation catch** (lines ~6651-6653): Same — explicit error, not silent swallow.

### T3 — Verification (Tend Gates — Mandatory per §9.3)
```bash
npm run smoke
npm run preflight
```
- Smoke: 50+ checks PASS (including new loader assertions)
- Preflight: 0 divergences, guard 101/101 PASS
- P1 session start: Unaffected (verify via smoke)
- P2 session start with missing globals: Blocked with clear error (manual verify)

### Tend — Closeout
- `knowledge/REVISION_HISTORY.md` entry: Document loader fix, files changed, verification results
- No `DEFECT_LIBRARY.md` entry (no new content defect)
- Session complete

---

## Governance Checklist

| Requirement | Status |
|-------------|--------|
| Lane: Governance Light | ✅ (no delivery changes) |
| Preflight T0 mandatory | ✅ |
| Backup-before-write (§3) | ✅ (app.js) |
| Smoke test Tend mandatory | ✅ |
| Preflight Tend mandatory | ✅ |
| REVISION_HISTORY entry | ✅ Required |
| DEFECT_LIBRARY entry | ⏳ Only if defect found |
| Rule 5 (≤30 objects) | ✅ (1 file, ~50 lines) |
| Rule 12 (zero relabel) | ✅ (no existing items touched) |
| Learner-pool protections | ✅ Never weakened (§7) |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| P1 session regression | Near-zero | High | Smoke tests cover P1; gate at line 2606 unchanged |
| P2 session false-block | Low | Medium | Error message identifies missing globals; manual verify |
| Silent swallow regression | Near-zero | Medium | Explicit throw replaces catch-swallow; testable |
| Global name drift | Low | Medium | Array of 11 names in one place; single source of truth |

---

## Authorization Required

**User must provide:**
1. Explicit task: "Execute WS-D Lazy-Loader Fail-Closed"
2. Scope authorization: "Governance Light Lane — app.js P2BankLoader fix only"
3. Confirmation: No pack/case/key/state files will be touched

**Expected duration:** 30–45 minutes (single agent, Light Lane)

---

## Post-Completion State

- `may_3_0_adaptive_selection` token → **AUTHORIZED**
- P2BankLoader → **FAIL-CLOSED** (all 11 globals, explicit errors)
- P1 sessions → **UNAFFECTED**
- No new content created

---

## References

- Board Briefing: `reports/BOARD_BRIEFING_20260921.md` §4 WS-D
- Design Doc: `reports/MAY_3_0_DESIGN_20260921.md` (F1–F4 accepted)
- Replan: `reports/MAY_PHASE_2_REPLAN_20260920.md` §10
- Governance: `AGENTS.md` §2, §3, §5, §9.3
- Current loader: `app/app.js:1401-1435`, `2606`, `2613-2615`, `6651-6653`