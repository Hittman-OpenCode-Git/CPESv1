# APP_JS_DRIFT_RECONCILIATION.md

**Date:** 2026-09-23
**Session:** Remediation Lead — Board Report Response
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md, CURRENT_BASELINES.md

---

## 1. Executive Summary

**Finding:** Baseline coherence check reports **1 divergence** — `app.js` hash mismatch.

| Source | SHA-256 Hash | Status |
|--------|-------------|--------|
| Documented in `CURRENT_BASELINES.md` (line 29) | `E998A72A1BC5738DEDA5DFEA84BB2AE9F0AF44637C2F0E0879DF1B1B5CC4F207` | **FABRICATED** — matches no actual file |
| Committed version (`cb9b3b4` / `9c32f1c`) | `E03C7EBEE3C788C15B5343A09C9624E00030C595D9AFFA38C5BC07BA0FFF6EBF` | **AUTHORITATIVE COMMITTED** |
| Working directory (uncommitted changes) | `31901F3F886421EA5606365BDC2721589D427DB94306EDCE5C7839F871C598C3` | **CURRENT WORKING STATE** |
| Backup `app.js.bak-20260920153000` (closeout) | `70A5FE1A26F1A446BD2F0EEDD45CCFEE50081706C9FEB7CA617A0C785A1AEF2B` | Historical snapshot |
| Backup `app.js.bak-PROMO-135203` | `EA4279AB9D76BA88CFC12A022408F0DF74A6FD7F3EFA3C56EC127EA2B94869A2` | Historical snapshot |

**Conclusion:** The hash documented in `CURRENT_BASELINES.md` (`E998A72A...`) is **fabricated** — it does not correspond to any actual version of `app.js` in the repository, backups, or git history. The authoritative baseline should be the committed version hash `E03C7EBE...`.

---

## 2. Git History Analysis

### Last 5 commits modifying `app/app.js`

| Commit | Date | Message | Hash |
|--------|------|---------|------|
| `9c32f1c` | 2026-09-19 | DL-056 Complete: 11 HOLD items certified | `E03C7EBE...` |
| `a68e3ac` | 2026-09-07 | Pause-clock persistence fix + DL-003 remediation | `90A13902...` |
| `e99d85d` | 2026-09-04 | Tier 3 Waves 13-15: Author, insert, verify, certify 90 items | `D3EBA44B...` |
| `05de776` | 2026-08-31 | fix(scoring): tolerant case free-text scoring | `91170014...` |
| `4435330` | 2026-08-28 | feat(app): pause-aware timer + double-confirmation submit guard | `882107AB...` |

**Key finding:** The committed version at `HEAD` (`cb9b3b4`) has the same `app.js` as `9c32f1c` (hash `E03C7EBE...`). The working directory has **uncommitted changes** on top of this committed version.

---

## 3. Uncommitted Changes Analysis

### Scope: 860 lines changed (git diff)

### Functional Areas Modified

| Area | Lines | Description | Authorization Status |
|------|-------|-------------|---------------------|
| **BOM/Encoding** | 1 | Leading BOM character (`﻿`) added | **Unattributed** — likely editor artifact |
| `liveBankCounts()` | ~30 | Removed `eval()` fallback; added `casePackP2Authored`, `casePackP2_C4_C8` to P2 case iteration | **Authorized** — aligns with F1 wiring (2026-09-21) documented in CURRENT_BASELINES.md |
| `escapeHtml()` | 4 | New XSS protection utility | **Authorized** — H2 table-sink XSS fix (2026-09-18 Production Review remediation) |
| `assignTier()` | ~15 | **Hard-block non-Certified from learner delivery** (`_tier = -1`, `_blockedReason = 'NON_CERTIFIED_DELIVERY_BLOCK'`) | **Authorized** — Board directive S7 (2026-09-22), AGENTS.md §7, CAQS §1.7.1 |
| `P2BankLoader` | ~50 | Added 2 new case banks (`casePackP2Authored`, `casePackP2_C4_C8`); enhanced `isLoaded()` verification; fail-fast on missing globals | **Authorized** — F1 wiring (2026-09-21) + Phase 4 P2 case delivery |
| `SessionPersistence.restore()` / `recoveryResume()` | ~20 | Added null guards: `state.session.mcqs = state.session.mcqs \|\| []` | **Authorized** — DL-022 / DL-014 crash prevention |
| `SessionPersistence.saveHistory()` | ~80 | Enhanced history entry: `sessionId`, `learnerId`, `time`, `part`, `questions[]`, `questionCount`, `timerExpired`; MayTelemetry cognitive-budget emission; Admin delete support (`deleteHistoryEntry`, `_purgeMayForEntry`) | **Authorized** — W_ADMIN token (may_v2_1_admin_history_delete), W9 T5 telemetry, Promotion part-namespacing |
| Comment updates | ~10 | P2 lazy-load comment: "nine" → "eleven" P2 scripts | **Authorized** — reflects actual count |

### Security-Sensitive Changes

| Change | Risk | Assessment |
|--------|------|------------|
| `eval()` removal in `liveBankCounts()` | **Positive** — eliminates code injection surface | **Safe, authorized** |
| `escapeHtml()` addition | **Positive** — XSS mitigation for table rendering | **Safe, authorized** |
| Non-Certified hard-block in `assignTier()` | **Behavioral** — changes delivery pool eligibility | **Authorized by Board S7 / AGENTS.md §7** |
| Session null-guards | **Positive** — prevents DL-022 crashes | **Safe, authorized** |
| BOM character at file start | **Neutral/negative** — encoding artifact | **Unattributed, cosmetic** |

---

## 4. Attribution Mapping

| Diff Hunk | Ticket/Defect | Revision History | Status |
|-----------|---------------|------------------|--------|
| BOM character | — | — | **UNATTRIBUTED** (editor artifact) |
| `eval()` removal, P2 case banks | F1 wiring (2026-09-21) | CURRENT_BASELINES.md line 29 | **ATTRIBUTED** |
| `escapeHtml()` | H2 fix (2026-09-18) | CURRENT_BASELINES.md line 13 | **ATTRIBUTED** |
| `assignTier()` hard-block | Board S7 (2026-09-22) | AGENTS.md §7, CAQS §1.7.1 | **ATTRIBUTED** |
| P2BankLoader enhancements | Phase 4 P2 case delivery (2026-09-18) | CURRENT_BASELINES.md lines 8-10 | **ATTRIBUTED** |
| Session null-guards | DL-022 / DL-014 | DEFECT_LIBRARY.md DL-022 | **ATTRIBUTED** |
| History enhancement + Admin delete | W_ADMIN / W9 T5 / Promotion | REVISION_HISTORY.md (cb9b3b4) | **ATTRIBUTED** |

**All material functional changes are attributed to authorized work.** Only the leading BOM character is unattributed (cosmetic).

---

## 5. Regression Test Evidence

| Test | Result | Notes |
|------|--------|-------|
| `npm run smoke` | **PASS** (62/62 checks) | W1-A/B/C/D integrity mode, pause clock, resume, May gating all verified |
| `node scripts/thorough_test.js` | **PASS** (18/18 checks) | MCQ, Case, Mixed, Full Exam, Real Conditions, Corrupted restore |
| `node scripts/test_governance_guard.js` | **PASS** (101/101) | All 21 rules validated |
| `npm run preflight` | **1 divergence** (app.js hash only) | Pack parsing, certified counts, guard tests all PASS |
| `npm run pipeline` | **GREEN** (per cb9b3b4 commit message) | validate → case-screens → build-registry → dashboard → baseline-coherence |

**Corrupted localStorage restoration tested:** Smoke test includes "Abnormal: corrupted session (null mcqs) does not crash" and "no 'Something went wrong' overlay on corrupted restore" — both PASS.

---

## 6. Resolution Path

### Option A: Commit working directory changes + update baseline (RECOMMENDED)

All functional changes are **authorized and regression-tested**. The only unattributed change is a leading BOM character (cosmetic).

**Actions:**
1. Remove leading BOM character from `app/app.js` (cosmetic cleanup)
2. Commit the working directory changes with message referencing Board S7, F1 wiring, Phase 4 delivery
3. Run `npm run rebuild_baselines` (or equivalent) to recapture `app.js` hash
4. Update `CURRENT_BASELINES.md` with new authoritative hash
5. Append `REVISION_HISTORY.md` entry documenting the reconciliation

### Option B: Restore committed version + update baseline to match

**Actions:**
1. `git restore app/app.js` — reverts to committed `E03C7EBE...`
2. Update `CURRENT_BASELINES.md` to document `E03C7EBE...` as authoritative
3. Append `REVISION_HISTORY.md` entry

**Risk:** Loses authorized enhancements (admin history delete, telemetry, enhanced P2 loading verification) that exist only in working directory.

---

## 7. Recommendation

**Adopt Option A** with BOM cleanup. The working directory contains authorized, tested enhancements that should not be discarded. The fabricated hash in `CURRENT_BASELINES.md` must be corrected to match the actual authoritative file state.

**Required human action:** Review and approve the uncommitted changes for commit. The changes are:
- Behavioral: Non-Certified delivery block (Board S7)
- Security: `eval()` removal, `escapeHtml()`
- Robustness: P2BankLoader verification, SessionPersistence null-guards
- Feature: Admin history delete, cognitive-budget telemetry, part-namespaced history

---

## 8. Files Requiring Update Post-Resolution

1. `app/app.js` — commit working directory (minus BOM)
2. `knowledge/CURRENT_BASELINES.md` — line 29: replace `E998A72A...` with actual committed hash
3. `knowledge/REVISION_HISTORY.md` — append reconciliation entry
4. `reports/APP_JS_DRICT_RECONCILIATION.md` — this document (complete)

---

**Prepared by:** Remediation Lead (AI)
**Review required by:** Human maintainer / Release Manager
**Blocking release:** Yes — G-01/A-02/S-02 require resolution before release sign-off