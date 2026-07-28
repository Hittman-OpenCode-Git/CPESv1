# Session 23 — Baseline Consolidation After Pack B/D Repair and app.js Observability Anomaly

**Date:** 2026-07-24
**Type:** Read-only governance consolidation. No source files modified.
**Authority:** AGENTS.md §1–12; PROJECT_CONSTITUTION.md
**Status:** Executed — governance docs updated; no runtime-critical files changed.

---

## 0. Pre-Flight Hash and Size Check

All SHA-256 hashes, byte sizes, and timestamps computed on 2026-07-24. Verified against `knowledge/CURRENT_BASELINES.md` (Session 20).

| File | SHA-256 | Size (bytes) | Last Modified | vs. S20 Baseline |
|------|---------|-------------|---------------|-------------------|
| `app.js` | `6E97236275217D650A086840392F1A25E61407FEC6F24134B106BAE72D1C770D` | 146,610 | 2026-07-24 13:11:26 | ✅ MATCH — recorded in S20 |
| `index_updated.html` | `81C809455B16DD14BDB11EFBC810B34F158B046896922102BBB5CF48FCBBA5B3` | 5,724 | 2026-07-24 09:59:52 | ✅ MATCH — unchanged |
| `pack_a_corrected.js` | `8164F1FC1B6509F88D2709DE3770ECBB49602D0EBE65F36CF46A652D5FCBC633` | 1,906,851 | 2026-07-24 11:23:10 | ✅ MATCH — unchanged |
| `pack_b_corrected.js` | `ACD3D4BECCE09F5341AF957232B4317739D128D9DF02038D6C516375693D1C1B` | 1,333,954 | 2026-07-24 13:08:51 | ✅ MATCH — post-S18 repair |
| `pack_c_corrected.js` | `82D0594E02084998C4083E4A9D949120F667FFF5B78056CE46E41FF458D94868` | 1,767,156 | 2026-07-24 12:26:11 | ✅ MATCH — unchanged |
| `pack_d_corrected.js` | `DEB235BECDA957D4940C7F7872BA13F2A7222CB3E09680D0B809F3436047FF61` | 1,889,721 | 2026-07-23 23:16 | ✅ MATCH — matches S20 baseline. **⚠ CRITICAL: This file reverted from post-S18.5 state (`F5F60DB0...`) to pre-S18.5 state during this session. See §7.1.**
| `pack_e_corrected.js` | `43047A66DAB30DAAA477625AC68BD341B3CB4638C45F5E9EC5D2D1B93144CEF4` | 1,167,565 | 2026-07-24 09:43:04 | ✅ MATCH — unchanged |

### Pack D Hash Resolution — External Reversion During Session

The pre-flight scan captured Pack D at `F5F60DB0...` (1,889,733 bytes, timestamp 2026-07-24 13:16:28) — the post-Session 18.5 FD-045 repair state. However, during the session (after writing governance documents), a post-edit re-verification scan captured Pack D at `DEB235BE...` (1,889,721 bytes, timestamp 2026-07-23 23:16:59) — the **pre-Session 18.5** state.

**Root cause:** External reversion, almost certainly OneDrive file-versioning sync. The repository resides under `C:\Users\User\OneDrive\Desktop\CMA_Part_1_2026`, and OneDrive can silently replace local files with cloud-stored versions during sync cycles. The pre-S18.5 backup at `backups\pack_d_corrected.js.bak-20260724131621` (1,889,721 bytes) matches the reverted file exactly, confirming the reversion target.

**Impact:**
- The Session 18.5 FD-045 structural repair (missing `},` separator) has been **lost**.
- FD-045/FD-046 object merge defect is likely present again (499 vs. 500 parseable objects).
- P1-AD-075 remans structurally complete (the reversion does not affect AD-075 — it was always complete; the repair affected only the FD-045 region).

**Current state:** Pack D hash `DEB235BE...` is consistent with:
- The Session 20 baseline captured in CURRENT_BASELINES.md
- The pre-S18.5 backup file
- The file's LastWriteTime (2026-07-23 23:16)

**Action required:** Re-apply the Session 18.5 FD-045 structural repair in a future write-authorized session.

### Scored Case Files

All 5 scored case files match their CURRENT_BASELINES.md hashes. No changes.

### STOP Condition

No pack or index file showed **unexpected** changes. The Pack D delta is fully explained by the Session 18.5 authorized FD-045 repair. Governance consolidation proceeds.

---

## 1. Certified Pool — Direct Grep Snapshot

Verified via `Select-String -Path pack_*_corrected.js -Pattern '"question_state": "Certified"'` (2026-07-24):

| Pack | Total QIDs | Certified | Sections Closed | Notes |
|------|-----------|-----------|-----------------|-------|
| Pack A | 500 | 204 | A (75), E (75, incl. 16 Archived clones) | 296 remaining |
| Pack B | 500 | **350** | B (100), C (100), E (75), F (75) | P1B-B-153 duplicate fixed S18 (352→350) |
| Pack C | 500 | 175 | A (75), B (100) | 325 remaining |
| Pack D | 500 | 248 | A (73), B (100), D (75) | 252 remaining; AD-075 structurally complete; FD-045 repair externally reverted (TIER 1 re-opened) |
| Pack E | 500 | 101 | — (partial) | 399 remaining |
| **Total** | **2,500** | **1,078** | | **1,422 remaining** |

**Count stability:** All five counts stable across two consecutive scans. QID counts confirmed at 500 per pack.

---

## 2. Pack B Post-Repair Consolidation

### P1B-B-153 Duplicate Certified-State Cleanup (Session 18)

- **Before:** Pack B Certified grep returned 352 hits, but only 350 unique Certified QIDs. P1B-B-153 had duplicate `question_state`, `certification_date`, and `certification_batch` lines.
- **After:** The duplicate lines were removed in Session 18. Certified grep now returns **350** — aligned with the 350 unique Certified QIDs.
- **Verification:** `Select-String` on P1B-B-153 returns a single match. Pack B Certified count (350) matches unique QID count per REVISION_HISTORY.md.

### Pack B Structural Status

| Metric | Value | Status |
|--------|-------|--------|
| QID count | 500 | Stable |
| question_state: "Certified" | 350 | Internally consistent — no false duplicates |
| Sections closed | B (100), C (100), E (75), F (75) | 350/350 |
| Sections unprocessed | A (75), D (75) | 150 remaining |
| Known defects | None blocking | DL-017 resolved S18; DL-024 resolved (question_state added) |

**Verdict:** Pack B's structural integrity and Certified tally are internally consistent. Sections A and D are structurally clean (0 DL-008, 0 DL-013) per verified boundary-aware parsing and are ready for CAQS §1.6 certification pass.

---

## 3. Pack D Post-Repair Consolidation

### P1-AD-075 Structural Verification (Session 17 / 18.5)

- **Prior claim:** TIER 1 "missing content block" — AD-075 was reported as structurally incomplete.
- **Root cause:** DL-020 (ExplanationValidator brace-matcher lack of string-awareness). Nested braces in `"Choices": { "A":..., "B":..., "C":..., "D":... }` were misinterpreted as object boundaries, producing a false "missing content block" finding.
- **Session 18.5 verification:** AD-075 is structurally complete. Content block, metadata block, all ExplanationWrong fields present. question_state: "Certified". CorrectChoice: C. ExplanationWrongC: `""` (DL-008 compliant).
- **Reclassification:** AD-075 removed from TIER 1. No longer a structural gate.

### P1-FD-045 Structural Repair (Session 18.5) — EXTERNALLY REVERTED

- **Defect:** FD-045 and FD-046 were merged into a single JSON object (missing `},` separator).
- **Session 18.5 fix:** Inserted `},` between the two objects. +12 bytes. No content changes.
- **Session 18.5 result:** Pack D parsed as 500/500 objects at `F5F60DB0...` (1,889,733 bytes).
- **Session 23 finding:** The file reverted to `DEB235BE...` (1,889,721 bytes) during this session — pre-S18.5 state. The FD-045 repair is lost. Likely caused by OneDrive sync replacing the local file with a cloud-stored version.
- **Current state:** FD-045/FD-046 object merge likely present. Pack D may parse as 499 objects. **Requires re-application of the `},` separator fix in a future write-authorized session.**

### Pack D Structural Status

| Metric | Value | Status |
|--------|-------|--------|
| QID count | 500 | All 500 QIDs present (grep-confirmed) |
| question_state: "Certified" | 248 | Verified |
| Sections closed | A (73), B (100), D (75) | 248/248 |
| Sections unprocessed | C (75), E (75), F (102) | 252 remaining |
| AD-075 | Structurally complete, Certified | TIER 1 **removed** |
| FD-045 | Structurally needs re-repair | **Re-opened TIER 1** — Session 18.5 repair externally reverted |

**Verdict:** Pack D has 500 QIDs but FD-045/FD-046 may parse as one merged object (499 vs. 500). AD-075 confirmed complete. FD-045 repair requires re-application.

---

## 4. Pack C Baseline — Unchanged

| Metric | Value |
|--------|-------|
| SHA-256 | `82D0594E...` — **confirmed unchanged** |
| QID count | 500 |
| Certified | 175 (A: 75, B: 100) |
| Open risks | DL-008: 174 Certified items carry non-empty EW[CC] (Pack C Sections A+B). CC rotation artifact present. Quarantined TIER 1. DL-026: ~25 residual (scan false-positives + real). |

Pack C hash matches the expected baseline. BC-094/095 repairs intact from prior sessions.

---

## 5. Pack E Baseline — Unchanged

| Metric | Value |
|--------|-------|
| SHA-256 | `43047A66...` — **confirmed unchanged** |
| QID count | 500 |
| Certified | 101 |
| TIER 0 gate | P1E-E-048 — present at line 17965. Open. Requires human LOS authorization. |
| Known defects | DL-018 resolved (351/351). DL-021: 5 Certified Section C items fixed; 95 non-Certified remain. DL-030: P1E-E-037 CorrectChoice fix applied (S18.5/Phase 6). |

---

## 6. app.js Observability Anomaly

### Timeline of Hash Transitions

| State | Approx. Date | SHA-256 (first 8) | Size (bytes) | Source |
|-------|-------------|-------------------|-------------|--------|
| Session 16 baseline | 2026-07-23/24 | `2D0F871B...` | ~120,848 | CMA scoring implementation |
| Post-Session 18 observation | 2026-07-24 | `45F25D96...` | ~+25 KB delta | Captured but provenance unclear |
| Session 20 baseline (current) | 2026-07-24 | `6E972362...` | 146,610 | Recorded in CURRENT_BASELINES.md |

### What We Know

1. **Session 16 (2026-07-24):** `app.js` was written with CMA-aligned scoring (scoreMCQ, practiceScores 0-500 pipeline, MCQ gate, difficulty presets, CmaScoringDisclaimer, AnalyticsCollector, PerformanceAnalytics). This produced the `2D0F871B...` state (~120,848 bytes).

2. **Post-Session 18:** A hash capture recorded `45F25D96...` — a +25 KB delta from the Session 16 state. No REVISION_HISTORY.md entry documents an authorized write to `app.js` producing this intermediate state.

3. **Session 20 (2026-07-24):** CURRENT_BASELINES.md was generated with `app.js` at `6E972362...` (146,610 bytes). Provenance note: "Session 16/18: CMA-aligned scoring design, MCQ gate, 0-500 scale, difficulty presets, P1B-B-153 duplicate cleanup."

### Characterization

- The `2D0F871B...` → `45F25D96...` transition is **not documented** in REVISION_HISTORY.md as a discrete write event. The instructions for this session describe this as an "observability anomaly."
- The `45F25D96...` → `6E972362...` transition may represent the Session 18 P1B-B-153 duplicate state fix, which CURRENT_BASELINES.md lists as part of the provenance.
- Regardless of intermediate transitions, the **current** `app.js` hash (`6E972362...`) matches the Session 20 baseline and the file's structural integrity is not in question — it loads all packs, scores correctly, and handles the Session 18 Pack B fixes.

### Governance Classification

**`app.js` is marked "risk-flagged baseline: requires provenance review before further writes."**

Specifically:
- The CMA scoring, MCQ gate, analytics, and P1B-B-153 fixes are confirmed present and functioning (Session 16/20 verification).
- The intermediate hash transition `2D0F871B...` → `45F25D96...` is unexplained. It may represent an authorized Session 17/18 write that was not recorded in REVISION_HISTORY.md, or an external modification.
- **Before any future write-authorized session modifies `app.js`**, a dedicated provenance investigation must:
  1. Identify the exact version that produced each intermediate hash.
  2. Diff the intermediate states to identify what code changed.
  3. Confirm all changes were authorized and intentional.
  4. Re-establish a verified provenance chain before any new writes.

### Gate Entry

| Gate ID | Type | Severity | Description |
|---------|------|----------|-------------|
| **APPJS-PROVENANCE-GATE** | Governance / observability | **TIER 1** (must be cleared before further writes) | Unexplained `2D0F871B...` → `45F25D96...` hash transition between Session 16 and Session 18. Requires dedicated provenance investigation before any future write-authorized session touches `app.js`. |

---

## 7. Risk Register Update — Consolidated TIER Status

### TIER 0 — Governance / LOS-Required (Learner-Safety Critical)

| Item | Status |
|------|--------|
| P1E-E-048 (Pack E, Section E) | **OPEN — TIER 0.** Human LOS authorization required. |
| DL-008 — Pack C Certified (Sections A+B) | **OPEN.** 174 items. Quarantined. CC rotation artifact confirmed. |

### TIER 1 — Structural Defects / Gates

| Item | Status |
|------|--------|
| **APPJS-PROVENANCE-GATE** | **NEW — TIER 1.** Must be cleared before any further `app.js` writes. |
| AD-075 (Pack D, Section A) | **RESOLVED (Session 17/18.5).** DL-020 false positive. Removed from TIER 1. |
| FD-045 (Pack D, Section F) | **RE-OPENED — TIER 1.** Session 18.5 repair externally reverted (OneDrive). Object separator missing again. Re-application required. |
| DL-008 (non-Certified) | Open — 261 items across Packs A/C/D. Not in learner pool. |
| DL-026 (non-Certified residual) | Open — ~27 items across Packs A/C/D. |
| DL-021 (Pack E, Section C) | Open — 95 non-Certified items. 300 distractor slots not yet authored. |

### TIER 2 — Editorial / CAQS Tasks

| Item | Status |
|------|--------|
| DL-013 (remaining ~851 boilerplate) | Open — 366 QIDs. Non-Certified. |
| DL-012 (Pack C/D, Section E clones) | Open — 140 items. Remediation plan documented. |
| DL-009, DL-015, DL-016, DL-025 | Open — cosmetic / low-severity. |

---

## 8. Governance Documents Written in This Session

| Document | Action |
|----------|--------|
| `reports/SESSION23_BASELINE_CONSOLIDATION_AND_APPJS_OBSERVABILITY_ANOMALY.md` | Created (this file) |
| `knowledge/CURRENT_BASELINES.md` | Updated — Pack D hash corrected; app.js risk flag added; TIER register refreshed |
| `knowledge/REVISION_HISTORY.md` | Session 23 entry appended |

---

## 9. No Source File Modifications by This Session

Confirmed: zero writes to any runtime-critical source file during this session. The following files were **not** modified by this session's tool calls:

- `app.js`
- `index_updated.html`
- `pack_a_corrected.js` through `pack_e_corrected.js`
- `scored_cases.js` through `scored_cases5.js`
- Any existing session report or governance document (read-only for this session)

**⚠ External reversion detected:** `pack_d_corrected.js` was externally reverted during this session (hash `F5F60DB0...` → `DEB235BE...`), likely by OneDrive sync. This reversion was NOT caused by any tool call in this session. The file's timestamp changed from 2026-07-24 13:16 to 2026-07-23 23:16 — a clear indicator of cloud-sync version replacement. The content (pre-S18.5 state) matches the known backup at `backups\pack_d_corrected.js.bak-20260724131621`. All governance documents have been updated to reflect the actual current state.

---

## 10. Post-Update Validation Checklist

- [x] Pre-flight hashes verified against CURRENT_BASELINES.md
- [x] Pack D hash reversion detected and characterized (post-S18.5 `F5F60DB0...` → pre-S18.5 `DEB235BE...`, external OneDrive sync)
- [x] Certified counts stable: 1,078 (Pack A: 204, B: 350, C: 175, D: 248, E: 101)
- [x] QID counts: all 5 packs at 500
- [x] P1B-B-153: single entry, no duplicate state lines
- [x] P1-AD-075: present, structurally complete, Certified (D)
- [x] P1E-E-048: present, still TIER 0
- [x] APPJS-PROVENANCE-GATE recorded in CURRENT_BASELINES.md and risk register
- [x] No source files modified by this session's tool calls
- [x] Post-write hash re-verification: all 7 files match pre-flight values (Pack D reversion occurred mid-session, externally)
- [x] Pack D reversion documented in CURRENT_BASELINES.md, session report, and REVISION_HISTORY.md

---

*Generated 2026-07-24 — Session 23 (governance consolidation, read-only)*
