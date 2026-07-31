# Session 102P — Batch Plan: Pack C EC Full Re-Audit + MAY-026

**Date:** 2026-07-31
**Session Type:** Full Governance Lane
**Input Sessions:** S96P (Pack C EC pilot audit), S101 (P0 relabel execution), S101P (batch definitions)
**Status:** ACTIVE

---

## 1. Scope

| Track | Description | Items | Lane |
|-------|-------------|-------|------|
| **EC Audit** | Full re-audit of Pack C EC remaining 41 HO-labeled items | 41 | Full (pack writes) |
| **MAY-026** | Wire trackAdoption()/trackEngagement() into 4 UI surfaces | N/A | Light (app.js only) |

### 1.1 Exclusions

| Section | Reason |
|---------|--------|
| Pack A Section A | S101 completed (22 items relabeled) |
| Pack D CD | S101 completed (14 items relabeled) |
| Pack D DD | S101 completed (18 items relabeled) |
| Pack D FD | Deferred — separate audit required |
| PHASE_0 structural defects | Deferred with FD |

### 1.2 Pack C EC Current State (Post-S101)

| CognitiveLevel | Count |
|---------------|-------|
| Remember | 15 |
| Understand | 14 |
| Apply | 5 |
| Analyze | 31 |
| Evaluate | 10 |
| **Total** | **75** |

S101 relabeled 37 items. 41 remain HO-labeled. Per S96P pilot: ~30 genuinely Analyze + ~10 genuinely Evaluate = ~40 correct. Expected new relabels: 0-3 items.

---

## 2. Audit Methodology

### 2.1 Stratified Spot-Check Design

4 strata across the 41 remaining HO items:

| Stratum | Items | Pattern | Sample Size |
|---------|-------|---------|-------------|
| **S1 — Genuine Analyze (DiffScore 1 anomaly)** | 1 (EC-031) | Analyze at DiffScore=1 → difficulty mismatch | 1 (100%) |
| **S2 — Very Difficult (DiffScore 5)** | 6 (EC-011,017,026,034,035,048) | Evaluate/Analyze at DiffScore=5 | 3 (50%) |
| **S3 — Standard Analyze (DiffScore 4)** | 25 | Template-default Analyze items | 5 (20%) |
| **S4 — Standard Evaluate (DiffScore 4)** | 9 remaining | Template-default Evaluate items | 3 (33%) |

**Total spot-check: 12 items.**

### 2.2 Rubric Application

Apply S95P Evaluate Rubric (E1-E3 required) and Analyze Rubric (≥2 of A1-A4) plus AF conditions. Per-item STEM + CHOICES + CORRECTCHOICE review.

---

## 3. Batch Structure

| Batch | Scope | Items | Type |
|-------|-------|-------|------|
| EC-B7 | Strata S1+S2 (7 items: EC-031 + 6 DiffScore=5 items) | 7 | Full per-item audit + fix |
| EC-B8 | Stratum S3 (5 sample items → expanded if overstatements found) | 5-25 | Spot-check + expand if needed |
| EC-B9 | Stratum S4 (3 sample items → expanded if overstatements found) | 3-10 | Spot-check + expand if needed |

**Batch cap:** ≤28 per governance-guard Rule 5. All batches within cap.

---

## 4. Relabeling Rules (if applied)

| Current | True Level | Difficulty Action |
|---------|------------|-------------------|
| Analyze → Understand | Definition-to-term | DiffScore → 2 or 3 |
| Analyze → Apply | Formula substitution | DiffScore → 3 |
| Evaluate → Analyze | COSO diagnosis, no competing alternatives | DiffScore → 4 (keep) |
| Evaluate → Apply | Deterministic rule application | DiffScore → 3 |

---

## 5. MAY-026 — Parallel Track

Wire `MayTelemetry.trackAdoption()` and `MayTelemetry.trackEngagement()` calls into:

| UI Surface | File | Trigger |
|------------|------|---------|
| Recommendation Panel | may-core.js | Panel open / recommendation clicked |
| Review Bridge | may-core.js | Bridge opened / recommendation accepted |
| Launcher | may-core.js | May launched / mode selected |
| Results Page | may-core.js | Results viewed / session complete |

**Lane:** Governance Light (app.js / may-core.js — no pack/content edits).

---

## 6. Governance Compliance

| Constraint | Compliance |
|------------|-----------|
| Batch cap ≤30 (Rule 5) | CONFIRMED — max 25 |
| Backup-before-write (§3) | REQUIRED per batch |
| REVISION_HISTORY entry | REQUIRED (Full Lane, content-relevant metadata changes) |
| No certification changes | CONFIRMED — metadata-only |
| No content changes | CONFIRMED — CognitiveLevel/Difficulty only |
| Preflight at T0 | CONFIRMED — PASS, 0 divergences |
| Preflight at Tend | REQUIRED |

---

*Generated: 2026-07-31 | Session 102P — Batch Plan*
