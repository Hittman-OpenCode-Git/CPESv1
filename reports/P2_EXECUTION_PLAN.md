# P2 — Cognitive Integrity Verification: Execution Plan

**Session:** S132 (planning) — Full Governance Lane
**Date:** 2026-08-01
**Primary:** P2 (critical path) | **Parallel:** P4 Hardening
**Depends:** P1 Repository Truth Verification (COMPLETE — `reports/P1_REPOSITORY_TRUTH_VERIFICATION.md`)

---

## 1. Purpose

P2 is the last meaningful content-integrity gate before P3. P1 found new certified-pool defects, expanding P2's scope from "verify labels" to "verify labels + explanation integrity + metadata integrity." This is a bounded verification-and-repair effort — NOT a recovery campaign.

**Gate:** P2 CLEAR → P3 (Pack C/D completion) proceeds on clean evidence.

---

## 2. Scope Summary (P1-derived)

| Defect | Count | State | Repair Scope |
|--------|-------|-------|--------------|
| DL-039 | 9 | Certified (Pack D Section B) | ExplanationWrong[CorrectChoice] + full EW topicality |
| DL-040 | 20 | "Active" (non-registry) | Registry/state decision (plan only — no content repair) |
| DL-041 | 3 | Certified (Pack A Section E) | Add Difficulty, DifficultyScore, CognitiveLevel |
| Stale manifest | 1 | Governance artifact | Regenerate DEFECT_MANIFEST_DL008_DL026.json |

**DL-040 and manifest regeneration are governance fixes (documentation/registry), not content authoring.** They will be executed as plan items but their remediation is lightweight.

---

## 3. Phase A — DL-039 Explanation Integrity Remediation (PRIMARY)

### 3.1 Target (9 Certified Pack D Section B items)

P1-BD-008, P1-BD-015, P1-BD-056, P1-BD-064, P1-BD-070, P1-BD-076, P1-BD-077, P1-BD-079, P1-BD-100

### 3.2 Evidence-Based Categorization (from P2 inspection, 2026-08-01)

**CRITICAL NEW FINDING — contamination is broader than the CC slot alone.** Two distinct patterns:

**Category 1 — Full EW contamination (5 items):** ALL non-empty EW slots describe a *different question's* choices, not just the CC slot:

| QID | Stem topic | EW contamination source |
|-----|-----------|------------------------|
| P1-BD-008 | Incremental budgeting drawback | All EW = ZBB pilot scalability (shipping dept 7.4%, $9.4M base) |
| P1-BD-056 | Direct materials purchases budget | All EW = budget committee authority proposals |
| P1-BD-070 | Variable S&A costs | All EW = forecast model A/B selection |
| P1-BD-076 | MAPE purpose | All EW = variance decomposition (receiving/inspection/setup) |
| P1-BD-100 | Strategic vs operational planning | All EW = labor rate/efficiency variance analysis |

**Category 2 — CC-slot misassignment (4 items):** non-CC slots are topically correct; the CC slot holds a different choice's distractor text:

| QID | CC | CC-slot text actually describes |
|-----|----|-------------------------------|
| P1-BD-015 | D | Choice C (reject both proposals) — misassigned |
| P1-BD-064 | C | Choice B ($197,800, high-low without step-cost) — misassigned |
| P1-BD-077 | B | A receiving-cost-only analysis (not the CC content) — misassigned |
| P1-BD-079 | D | Choice C (defer investigation) — misassigned |

**All 9 also have 1 empty non-CC slot (DL-026):** BD-008 (C), BD-015 (C), BD-056 (C), BD-064 (B), BD-070 (C), BD-076 (none — DL-008 only), BD-077 (A), BD-079 (C), BD-100 (A).

### 3.3 Remediation Strategy

| Category | Items | Approach |
|----------|-------|----------|
| Cat 1 — Full contamination | 5 | **Full EW re-authoring** — rewrite all non-CC EW slots to be choice-specific for the item's own choices; clear CC slot to `""`. |
| Cat 2 — CC misassignment | 4 | **CC slot clear** to `""`; **fill the empty non-CC slot** with choice-specific text; verify remaining non-CC slots are topically correct (they are). |

**CorrectChoice values are verified correct for the rendered stems (P1 DL-030 check). No answer-key changes.**

### 3.4 Batches (governance-guard Rule 5: ≤30 items/batch; here 9 items = 1 batch)

| Batch | Items | Action |
|-------|-------|--------|
| B1 | All 9 | Cat 1: full EW re-author (5); Cat 2: CC clear + empty fill (4) |

**Backup-before-write (mandatory):** `content/packs/pack_d_corrected.js.bak-<timestamp>`

### 3.5 Per-Item Verification

For each repaired item:
- `ExplanationWrong[CorrectChoice] === ""` (EV8 / DL-008)
- All 3 non-CC slots non-empty, ≥50 chars, **topically matching the item's own choices** (EV4 topicality — the new criterion this plan adds)
- CorrectChoice unchanged
- ExplanationCorrect unchanged

### 3.6 Deliverable

`reports/P2_DL039_REMEDIATION_REPORT.md`

---

## 4. Phase B — DL-041 Metadata Repair (3 Certified Pack A Section E items)

### 4.1 Target

P1-E-081 (remediation of control deficiency prioritization), P1-E-082 (IT change management emergency bypass), P1-E-083 (vendor master file segregation)

### 4.2 Evidence (from P2 inspection)

All three are missing **Difficulty, DifficultyScore, AND CognitiveLevel** (no key at all — broader than P1's "CognitiveLevel only" note). All three are structurally complete and topically coherent COSO items (Principles 17/11, segregation of duties) with rich stems, correct CC=A, and full EC/EW text. VerifiedChecks, LOSTag, StudyLinks present.

### 4.3 Labeling Method

Assign `Difficulty`, `DifficultyScore`, `CognitiveLevel` per:
- CAQS §6.2 (Bloom's) and §6.1 (difficulty)
- DCS v1.1 §3 (CL↔DS defaults)
- S122 Gold Standard Library (COSO remediation/evaluation items as reference)
- Rule 11 cognitive gates (AF-E4 Evaluate criteria: named decision-maker, judgment, competing alternatives)

**Assessment (evidence-based, to be confirmed during execution):** All three test Analyze/Evaluate — named decision-maker (controller/audit committee), competing priorities, judgment required. Anticipated labels: **Evaluate / Difficult (4)** for P1-E-081 (prioritization judgment) and P1-E-082 (procedure design judgment); **Evaluate / Difficult (4)** or **Analyze / Moderate (3)** for P1-E-083 — final per Rule 11 AF-gate and S122 reference comparison.

**Guard against DL-031 (definition-match inflation):** none are definition-match — all require analysis/judgment on scenario data. Confirmed by stem structure.

### 4.4 Verification

- No CL↔DS mismatch (DCS §3)
- No definition-match pattern (DL-031)
- Compare against S122 Gold Standard COSO items (P1-ED-*) for calibration
- May coaching (may-context-builder.js:150, may-core.js:5410/5457) reads the new labels correctly

### 4.5 Deliverable

`reports/P2_METADATA_VERIFICATION.md` — covers Phase B assignments + the 29-item Difficulty-5 population integrity check.

---

## 5. Phase C — Cognitive Integrity Sampling (Statistical, not a re-audit)

### 5.1 Purpose

Estimate residual cognitive-label defect rate across the populations P1 confirmed intact. **Not** a full re-audit. Answers: "how many items actually remain cognitively suspect?"

### 5.2 Populations and Sample Design

| Population | Pool Size | Sample | Confidence |
|------------|-----------|--------|------------|
| Analyze | 188 | 30 | ±15% @ 90% CI (30/188 = 16%) |
| Evaluate | 164 | 30 | ±15% @ 90% CI |
| Difficulty-5 (of 29, exclude known defective: P1-FC-050, P1-FD-046) | 27 | 12 | ±25% @ 90% CI |

Total sample: **72 items**, stratified random. Method: seeded RNG with QID order (deterministic, reproducible). Sample across all 5 packs proportionally.

### 5.3 Review Method (per item)

Score each sampled item against:
1. **S122 Gold Standard Library** — does the item's demand match genuine Analyze/Evaluate exemplars (definition-match < 40%, decomposition/judgment required)?
2. **S122 False Positive Library** — does the item exhibit any of the 5 documented inflation patterns?
3. **Rule 11 AF gates** (AF-1 definition-match, AF-E2/E4 formula/diagnostic) — reuse `scripts/s097p_automated_gate.js` where applicable.

### 5.4 Decision Threshold

- **≤5% residual defect rate** (≤3/72) → taxonomy integrity **PROVEN** → P3 proceeds
- **>5%** → targeted remediation of confirmed categories only (not a full recovery)

### 5.5 Deliverable

`reports/P2_COGNITIVE_SAMPLING.md` — sample manifest, per-item verdicts, residual-rate estimate with CI, category breakdown.

---

## 6. Phase D — Downstream Consumer Verification

### 6.1 Consumers to Verify (9 sites mapped from app/may source)

| Consumer | File:Line | Reads |
|----------|-----------|-------|
| MCQ pool metadata | app/app.js:1524 | CognitiveLevel into pool object |
| Exam review item | app/app.js:4853/4869 | CognitiveLevel → review UI |
| Review labeler | app/app.js:5819 | CognitiveLevel default '(missing)' |
| May context builder | app/may/may-context-builder.js:150 | CognitiveLevel default 'Apply' |
| May learner state | app/may/may-learner-state.js:110/150 | CognitiveLevel default 'Unknown' |
| May item hydration | app/may/may-core.js:5315 | merges CL from case/item |
| May coaching | app/may/may-core.js:5410/5457 | CL default 'Apply' |

### 6.2 Verification Targets (per user scope)

- **Mixed Session Selection** — difficulty/CognitiveLevel-weighted selection consumes correct metadata (app/app.js selectWithDifficultyDistribution)
- **Full Exam Selection** — same path, count=100/100 sections
- **May Study Plans** — recovery sprint logic (may-decision-engine.js:53 tier logic)
- **May Exam Review** — review-mode CL display (may-core.js:4663)
- **Recovery Sprint Logic** — does it filter by CL correctly?

### 6.3 Method

Read each consumer; verify it reads the authoritative field name and handles missing CL (defaults are documented). Flag any consumer that:
- Reads a stale/non-existent field name
- Applies a misleading default (e.g., 'Apply' when 'Unknown' would be safer)
- Filters or weights on CL in a way that would misbehave post-DL-041 (missing labels become 'Unknown')

### 6.4 Deliverable

`reports/P2_CONSUMER_VERIFICATION.md`

---

## 7. Phase E — Governance Fixes (lightweight, non-content)

| Item | Action | Deliverable |
|------|--------|-------------|
| DL-040 (20 "Active") | Register "Active" in QUESTION_METADATA_STANDARD.md §9.1 OR transition to Unprocessed/Editorial Queue. **P1-FD-046 → Archived (shell item).** | Registry amendment or state transition record |
| Stale manifest | Regenerate `governance/DEFECT_MANIFEST_DL008_DL026.json` from Function-constructor parse of all 5 packs (S725/S726 requirement, never executed). | Regenerated manifest with truthful `dl008_certified` count |

**Decision required at execution:** register "Active" vs. transition. Default recommendation: **register it** (S899 items are intentional, high-quality replacements; "Active" is a meaningful authoring state), and add governance tracking.

---

## 8. Sequencing and Parallelism

```
P2 (primary, critical path):
  Phase A (DL-039 repair) ──→ Phase B (DL-041 metadata) ──→ Phase C (sampling) ──→ Phase D (consumers)
  Phase E (governance fixes) can run interleaved (lightweight)
        ↓
  P2 GATE: CLEAR
        ↓
P3 (Pack C/D completion) ──→ P5 (Alpha Exit) ──→ P6 (Beta)

P4 (parallel, no dependency):
  Table renderer → Case exhibit renderer → Tour repair → Session-mode layout → Floating May → Exam integrity mode
```

**P4 does not block P2 and vice versa.** P4 is the higher user-visible value; P2 is the higher integrity gate.

---

## 9. Governance Controls

| Control | Application |
|----------|-------------|
| Lane | Full Governance (pack file writes in Phase A/B) |
| Preflight | Run at each write stage |
| Backup | pack_d_corrected.js + pack_a_corrected.js before writes |
| Rule 5 | 9-item Phase A batch = compliant (≤30); Phase B = 3 items |
| Rule 1/4 | REVISION_HISTORY.md entry at each content-change stage |
| Defect updates | DL-039/DL-041 status → Resolved after verification; DL-040 status per decision |
| Dual verification | Independent re-scan (Function-constructor) after each batch — not self-attestation |
| No answer-key changes | CorrectChoice verified correct for all 12 content items |

---

## 10. Success Criteria

1. **9/9 DL-039 items**: CC slot empty, all non-CC slots topically correct, CorrectChoice unchanged — confirmed by independent re-scan
2. **3/3 DL-041 items**: Difficulty + DifficultyScore + CognitiveLevel present and DCS/S122-aligned
3. **Phase C**: residual defect rate ≤5% (or quantified with CI and remediation plan)
4. **Phase D**: all 9 consumers verified, any defects logged
5. **Manifest**: `dl008_certified` truthful, rebuilt from Function-constructor parse
6. **Registry**: "Active" registered or items transitioned
7. **P2 GATE**: CLEAR → P3 authorized

---

## 11. Open Decisions for User

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| D1 | DL-040 "Active" state | (a) Register "Active" in §9.1 + governance tracking; (b) transition 20 items to Unprocessed/Editorial Queue | **(a) Register** — S899 items are intentional high-quality replacements |
| D2 | P1-FD-046 shell | Archive (content preserved) | **Archive** — no content block, Tier 3 fallback only |
| D3 | Phase A execution start | This session vs. next | **This session** — 9 items, single batch, bounded |
| D4 | P4 start | Parallel now vs. after P2 Phase A | **Parallel** — independent track |
