# ADVISORY BOARD MEETING — CMA EXAM PREPARATION PROJECT

**Date:** 2026-09-13
**Board Members:**
- Dr. Elena Vasquez — Psychometrics/Assessment Design Specialist
- Dr. James Okafor — CMA Part 1 Subject Matter Expert
- Priya Ramaswamy — Curriculum & Content Strategy Lead
- Marcus Chen — Software Quality & Governance Advisor

**Quorum:** 4/4
**Evidence Base:** CURRENT_BASELINES.md (2026-09-13 coherence refresh), S121_PORTFOLIO_DASHBOARD.md (2026-09-13 04:11), DEFECT_LIBRARY.md (DL-001 through DL-051), REVISION_HISTORY.md (2026-09-13 entries), governance-guard.js (98-test suite), pack files (direct sampling)

---

## 1. PRIOR MEETING OUTCOME REVIEW

**Finding: No prior advisory board meeting minutes exist.** The repository contains 78 review reports in `reports/` but none are structured as advisory board meetings with tracked action items. The closest equivalent is `reports/SESSION726_INDEPENDENT_REVIEW_BOARD_REPORT.md` (2026-07-26), which verified governance guard rules but issued no forward-looking recommendations.

**Verdict:** This is the first formal advisory board convening. The project has operated on ad-hoc review cycles rather than scheduled board oversight. This is itself a governance gap — recurring issues (DL-008 recontamination, DL-012 count volatility, DL-031 difficulty inflation) persisted across multiple sessions without a board-level checkpoint to force closure.

**Recurring issues identified from REVISION_HISTORY.md pattern analysis:**

| Issue | Sessions | Systemic? |
|-------|----------|-----------|
| DL-008 recontamination after "resolution" | S722A → S802 → S726 → S893-S896 | **YES** — concurrent-write overwrite (DL-019) |
| Difficulty distribution skew | S530 → S716-S718 → ongoing dashboard flags | **YES** — template-based authoring |
| ExplanationWrong slot defects (DL-008/026/021) | S814 → S828 → S893-S896 → S911 | **YES** — three distinct DL classes for same structural family |
| Answer-position bias | S121 → ongoing per-section audits | **YES** — rotation-template pipeline |

---

## 2. PROJECT STATE REVIEW

### Part 1 (MCQ)
- **Pool:** 3,070 items across 5 packs (A:560, B:620, C:620, D:590, E:680)
- **Certified:** 3,052 (99.4%) — 18 Archived (DL-012 clones)
- **Non-Certified:** 18 (0.6%) — all Archived, none in learner pool

### Part 2 (MCQ + Case)
- **MCQ Pool:** 3,450 items across 6 packs (A:600, B:600, C:750, D:500, E:500, F:500)
- **Case Pool:** 100 cases across 3 packs (Pack 1: 33, Pack 2: 33, Pack 3: 34). **Note:** This is the distinct `CaseID` count (not raw `CaseID` occurrences, which inflate due to exhibit-level repetition: 100/106/111 raw hits across files). Confirmed via `REVISION_HISTORY_P2.md` certification waves.
- **Certified:** 3,436 MCQ + 100 cases (99.6%)
- **Non-Certified:** 14 MCQ (In Audit — P2-A-REM1 items, see §3.1 C1)

### Combined
- **Total:** 6,520 items, 6,488 Certified (99.5%), 32 non-Certified (0.5%)
- **Governance Guard:** 21 rules, 98/98 tests PASS
- **Preflight:** 0 divergences (P1 + P2)

### Assumptions Made
- "Launch-ready" means a learner can take a full simulated exam drawing from the Certified pool with no known unaccepted content defects
- The 14 P2 In Audit items are excluded from delivery (confirmed by §7 live-simulation delivery pool rule)
- The 18 P1 Archived items are excluded from delivery (confirmed)

---

## 3. CONTENT AUDIT

### 3.1 Issues Found (Severity-Rated)

#### CRITICAL (Wrong Answer / Unfair Items)

**C1. P2-A-REM1 — 14 In Audit items require remediation plan**
- Evidence: `REVISION_HISTORY_P2.md:41-80` (Session P2-A-REM1, 2026-09-07) — 14 Pack A items flipped Certified → In Audit for Critical defects: wrong keys, stem inconsistencies, arithmetic errors, sign errors, EC-vs-key splits. QIDs: P2-A-084, P2-A-285, P2-A-289, P2-A-371, P2-A-377, P2-A-452, P2-A-505, P2-A-510, P2-A-517, P2-A-525, P2-A-542, P2-A-550, P2-A-572, P2-A-509.
- **Note:** P2 Batch-2 (2026-09-13, `REVISION_HISTORY.md:178-208`) remediated 21 items across Packs B/C/E/F — including B-214, B-295, E-422, C-358, E-185. These are a **different population** from the 14 P2-A-REM1 items. Batch-2 is closed; P2-A-REM1 is not.
- Impact: 14 items excluded from delivery pool. These are genuine Critical defects (wrong keys, unsolvable stems, arithmetic errors) — not cosmetic.
- Verdict: **BLOCKING** for P2 Pack A completion. Requires a dedicated remediation plan (P2-A-REM3 session or equivalent).

#### HIGH (Educational Quality / Structural)

**H1. DL-003 absolute language — 958 hits, only partially remediated**
- Evidence: DEFECT_LIBRARY.md DL-003 — "128 items (always/never/impossible) remediate — high elimination-cue value"; "any/every/all/must: 1,032 hits — triage"
- Impact: Absolute terms function as elimination cues, reducing item discrimination
- Verdict: **HIGH** — 128 strong-cue items flagged; remediation status unclear from dashboard

**H2. DL-005 distractor similarity — 450 warnings, moderate pairs unadjudicated**
- Evidence: DEFECT_LIBRARY.md DL-005 — "142 high + 275 moderate pairs (417 flagged)"; "46/46 100% pairs adjudicated clean"; "275 moderate pairs — lower yield than the cleared 100% set"
- Impact: Moderate-similarity distractors may reduce item discrimination
- Verdict: **MEDIUM** — high-priority set cleared, residual is lower-yield

**H3. P2C-3 — 492 state-adds still pending**
- Evidence: REVISION_HISTORY.md P2C-2 Wave 3 — "Remaining P2C-2 tail: P2C-3 (492 state-adds, scripted batches)"
- Impact: 492 P2 case items in Unprocessed state cannot enter delivery pool
- Verdict: **HIGH** — blocks P2 case pool from reaching 100% Certified

**H4. FormulaRef backlog — 299 citations silently skipped, now partially addressed**
- Evidence: REVISION_HISTORY.md FormulaRef Step 0a — "299 are FormulaReference-field citations"; Step 0b/1/2 remaining: "author ~47 master entries", "F-pack 14 × CalculationItem→false", "A–E 241 × FormulaReference backfill"
- Impact: Validator silently passed 299 items without checking formula references
- Verdict: **MEDIUM** — detection fixed, 241-item backfill backlog remains

#### MEDIUM (Distribution / Alignment)

**M1. Cognitive level misalignment vs S121 targets**
- Evidence: S121_PORTFOLIO_DASHBOARD.md §2:
  - Pack A: Remember 0.5% (target 10%) — **9.5pp under**
  - Pack D: Remember 0.0% (target 10%) — **10pp under**
  - Pack E: Understand 56.5% (target 20%) — **36.5pp over**; Apply 18.5% (target 40%) — **21.5pp under**
- Impact: Pack E is heavily skewed toward Understand at the expense of Apply — the core CMA competency
- Verdict: **MEDIUM** — requires new content authoring, not relabeling (Rule 12)

**M2. Difficulty distribution skew**
- Evidence: S121_PORTFOLIO_DASHBOARD.md §1:
  - Pack D: Difficult 42.9% (target 25%) — **17.9pp over**
  - Pack B: Easy 25.2% (target 15%) — **10.2pp over**; Moderate-Easy 14.4% (target 20%) — **5.6pp under**
- Impact: Pack D is heavily weighted toward Difficult; Pack B toward Easy
- Verdict: **MEDIUM** — Pack D exceeds ±3pp tolerance per tier

**M3. Per-section answer-position bias (pervasive)**
- Evidence: S121_PORTFOLIO_DASHBOARD.md §4. Full list of sections exceeding 6pp tolerance:

| Pack | Section | Spread | Worst Pair |
|------|---------|--------|------------|
| A | A | 10.5pp | A 31.4% / C 21.0% |
| A | B | 23.0pp | B 38.0% / D 15.0% |
| A | C | 10.0pp | B 30.0% / D 20.0% |
| A | D | 24.0pp | B 37.3% / C 13.3% |
| A | E | 16.0pp | B 32.0% / D 16.0% |
| A | F | 21.3pp | B 40.0% / A 18.7% |
| B | A | 12.4pp | C 30.5% / A 18.1% |
| B | B | 7.7pp | B 28.5% / A 20.8% |
| B | C | 11.4pp | D 30.0% / C 18.6% |
| B | D | 11.8pp | A 30.6% / D 21.2% |
| B | F | 9.3pp | D 30.7% / B 21.3% |
| C | A | 16.2pp | C 34.3% / D 18.1% |
| C | B | 11.5pp | D 32.3% / C 20.8% |
| C | E | 16.0pp | B 34.7% / A 18.7% |
| C | F | 22.7pp | B 38.7% / D 16.0% |
| D | B | 33.0pp | B 45.0% / D 12.0% |
| D | E | 29.3pp | B 45.3% / A 16.0% |
| D | F | 6.7pp | B 29.3% / C 22.7% |
| E | A | 22.3pp | B 38.3% / D 16.0% |
| E | B | 6.9pp | A 27.8% / D 20.8% |
| E | C | 15.0pp | D 32.7% / C 17.7% |
| E | D | 15.2pp | A 32.6% / B 17.4% |
| E | E | 8.4pp | B 29.9% / D 21.4% |
| E | F | 13.3pp | C 30.1% / D 16.9% |
| P2-A | A | 6.8pp | B 28.7% / D 21.8% |
| P2-B | B | 6.3pp | A 28.0% / D 21.7% |
| P2-C | C | 14.0pp | A 32.5% / D 18.5% |
| P2-D | D | 7.8pp | A 27.4% / D 19.6% |
| P2-E | E | 7.8pp | B 28.6% / D 20.8% |

- Impact: 29 of 36 audited sections exceed 6pp tolerance. Bias is pervasive, not isolated to two packs.
- Verdict: **MEDIUM-HIGH** — mechanically fixable via choice-label swapping, but scope is far larger than initially assessed

### 3.2 Coverage Gaps (Ranked by Impact on Exam Readiness)

| Rank | Gap | Current | Target | Delta | Impact |
|------|-----|---------|--------|-------|--------|
| 1 | Pack E Apply cognitive | 18.5% | 40% | -21.5pp | **CRITICAL** — core competency underweight |
| 2 | Pack D Difficult difficulty | 42.9% | 25% | +17.9pp | **HIGH** — learner fatigue, distorted analytics |
| 3 | Pack A/D Remember cognitive | 0.5%/0.0% | 10% | -9.5/-10pp | **HIGH** — foundational recall missing |
| 4 | P2C-3 state-add backlog | 492 Unprocessed | 0 | 492 items | **HIGH** — blocks P2 completion |
| 5 | Per-section answer bias | 29 sections >6pp | <6pp | Various | **MEDIUM-HIGH** — mechanically fixable but large scope |
| 6 | Pack E Understand cognitive | 56.5% | 20% | +36.5pp | **MEDIUM** — over-concentration |
| 7 | DL-003 absolute language | 128 strong-cue | 0 | 128 items | **MEDIUM** — elimination cues |
| 8 | FormulaRef backfill | 241 items | 0 | 241 items | **LOW-MEDIUM** — scripted backfill, not content defect |

---

## 4. GOVERNANCE REVIEW AND RESTRUCTURING

### 4.1 Governance Guard Rules — Item-by-Item Verdict

| Rule | Current | Verdict | Rationale |
|------|---------|---------|-----------|
| **R1** — question_state ↔ REVISION_HISTORY | BLOCK | **RETAIN** | Core audit trail requirement. Every certification must pair with a revision entry. |
| **R2** — EW[CC] must be "" | BLOCK | **RETAIN** | DL-008 was the most persistent defect class (539 occurrences, multiple recontaminations). Automation is the only reliable enforcement. |
| **R3** — Registry not hand-edited | BLOCK | **RETAIN** | Prevents drift between generated and consumed registries. |
| **R4** — Answer-key change needs recomputed note | BLOCK | **RETAIN** | Essential for answer-key integrity. 10 key flips in Batch-2 (across 21 objects total, 15 flips Batch-1+2 combined) relied on this. |
| **R5** — ≤30 items/change-set | BLOCK | **AMEND** | See §4.2 Amendment 2 (dedicated scripted state-only lane). |
| **R6** — non-CC EW present-but-empty | BLOCK | **RETAIN (separate)** | AGENTS.md §1 explicitly distinguishes R6 from R10: "an absent field fires Rule 10 only, never Rule 6." DL-018 benign-absent==CC and DL-021 template-suppression history confirm these are distinct defect classes requiring separate detectors. Merge would destroy diagnostic value (fill vs. author) for zero enforcement gain. |
| **R7** — Derived registry not authoritative | BLOCK | **RETAIN** | Prevents accidental hand-edits to generated registries. |
| **R8** — Session packages registered | BLOCK | **RETAIN** | Prevents untracked artifacts. |
| **R9** — Choice binary polarity | BLOCK | **RETAIN** | DL-037 was a real defect class (lead-in "Yes" with negative-content choice). |
| **R10** — non-CC EW present and non-empty | BLOCK | **RETAIN (separate)** | See R6. AGENTS.md §1: "a present-but-empty field fires Rule 6 only, never Rule 10." |
| **R11** — Cognitive classification gates | BLOCK | **RETAIN** | AF-3/4/5 misclassification was a systemic problem (58.7% misclassification rate in Part 1 recovery). |
| **R12** — Cognitive-First Assignment | BLOCK | **RETAIN** | Prevents content-free relabeling to fill portfolio gaps. |
| **R13** — Part2OnlyFlag strictly boolean | BLOCK | **RETAIN** | Schema enforcement for P2 items. |
| **R14** — Cross-part QID boundary | BLOCK | **RETAIN** | Prevents P1 QIDs in P2 packs and vice versa. |
| **R15** — Misfiled EW fragment (lowercase) | BLOCK | **RETAIN** | DL-047 fingerprint — catches explanation-fragment text in distractor slots. |
| **R16** — Certification provenance stamp | BLOCK | **RETAIN** | Required for audit trail on all →Certified transitions. |
| **R17** — Heuristic-screen admissibility | BLOCK | **RETAIN** | DL-045 doctrine — mass choice rewrites must cite evidence basis. |
| **R18** — Choice-text hygiene | BLOCK | **RETAIN** | DL-046 family — whitespace/fragment detection. |
| **R19** — Duplicate CaseID | BLOCK | **RETAIN** | DL-048 intra-batch gate. |
| **R20** — Legacy silent-drop extractor | BLOCK | **RETAIN** | DL-049 — psychometric stack blind spot just fixed; this prevents regression. |
| **R21** — Semantic quarantine | BLOCK | **RETAIN** | DL-047 — blocks certification of quarantined items. |

### 4.2 Proposed Mergers, Amendments, and Streamlings

**Merge 1: R6 + R10 → REJECTED**
- Original proposal: Merge into single "EW slot integrity" rule checking "all non-CC EW slots present AND non-empty"
- **Verdict: REJECTED per Board Decision 2 (4/0).** AGENTS.md §1 explicitly distinguishes R6 (present-but-empty, DL-026) from R10 (absent, DL-021): "an absent field fires Rule 10 only, never Rule 6." DL-018 (benign-absent==CC) and DL-021 (template-suppression) history confirm these are distinct defect classes requiring separate detectors. Merge would destroy diagnostic value (fill vs. author) for zero enforcement gain.

**Amendment 1: Distribution gates D1-D3 (new, report-only initially)**
- Current gap: No governance rule enforces per-section answer-position tolerance, cognitive targets, or difficulty targets
- Proposed: Three new report-only gates:
  - **D1:** Per-section answer-position spread ≤6pp
  - **D2:** Cognitive distribution ±3pp of S121 target (per-pack)
  - **D3:** Difficulty distribution ±3pp of S121 target (per-pack)
- Risk: Report-only means violations are visible but not blocking
- Compensating control: Monthly board review (see §4.3) re-escalates to BLOCK if defect density exceeds threshold

**Amendment 2: R5 — Scripted State-Only Lane (revised proposal, cap 100)**
- Problem: P2C-3 has 492 state-adds pending. At cap 30, this requires ~16 change-sets.
- **Revised proposal (incorporating DL-019 precedent):**
  - Cap: **100 items** per change-set for scripted state-only transitions
  - Scope: Only `question_state` field changes (Unprocessed ↔ Certified ↔ In Audit ↔ Archived)
  - Requires: `BLOCK-AUTHORIZED` marker on each batch
  - Compensating controls:
    1. **Pre-batch canonical-parser scan:** All 100 items parsed via Function constructor; structural fields validated against governance rules before state transition
    2. **Post-batch canonical-parser scan:** Re-parse after write; assert 0 parse errors, 0 structural regressions
    3. **Serial writes:** No parallel file operations (DL-019 precedent — concurrent-write overwrite)
    4. **Per-item batch ID in REVISION_HISTORY:** Every scripted batch logged with unique batch ID
    5. **Dry-run default:** Script reports what it would change; `--commit` flag required to apply
- P2C-3 completes in 5 batches (100+100+100+100+92), not 1 — accept that cost.
- Risk: 100-item batches could mask systematic errors; serial writes slow throughput
- Compensating control: Pre/post canonical-parser scans catch systematic errors; BLOCK-AUTHORIZED marker forces explicit authorization per batch

**Streamlining 1: Psychometric validator tiered treatment**
- Current: AbsoluteLanguage (958 hits), Ambiguity (410 hits), DistractorSimilarity (450 hits) produce thousands of warnings, few actionable
- Proposed: **Tiered treatment** (not blanket downgrade):
  - **BLOCK tier (retain):** DL-003 strong-cue subset — `always/never/impossible` in distractor slots (the 128 items). These are high-elimination-cue defects that should block certification. Aligns with DL-043 Batch 2 precedent.
  - **Report-only tier (downgrade):** DL-003 weak tier (`any/every/all/must/only`), DL-004 ambiguity, DL-005 distractor similarity. Reviewed at each session boundary per §4.3.
- Risk: Weak-tier defects escape certification-time detection
- Compensating control: Session-boundary review with re-escalation thresholds (§4.3); any weak-tier pattern exceeding threshold re-escalates to BLOCK

### 4.3 Compensating Controls — Owned Review Cadence (replaces untracked "monthly review")

**Trigger:** Every Full Governance Lane session boundary (Tend) auto-generates a combined Psychometric & Distribution Report from:
- `s121_portfolio_dashboard.js` (difficulty, cognitive, answer-position distributions)
- `AbsoluteLanguageValidator` (DL-003)
- `AmbiguityValidator` (DL-004)
- `DistractorSimilarityValidator` (DL-005)
- D1-D3 report-only gates

**Thresholds for re-escalation from report-only to BLOCK:**
| Signal | Threshold | Action |
|--------|-----------|--------|
| DL-003 strong-cue (always/never/impossible) | >5 occurrences per 100 items in any pack | Already BLOCK — no change needed |
| DL-003 weak-tier (any/every/all/must/only) | >15 occurrences per 100 items | Re-escalate to BLOCK for that pack |
| DL-004 ambiguity (vague qualifiers) | >10 occurrences per 100 items | Re-escalate to BLOCK for that pack |
| DL-005 distractor similarity (100% pairs) | >3 occurrences per 100 items | Re-escalate to BLOCK for that pack |
| D1 answer-position spread | >10pp in any section | Flag for mandatory choice-label swap |
| D2 cognitive distribution | >5pp deviation from S121 target in any pack | Flag for authoring wave |
| D3 difficulty distribution | >5pp deviation from S121 target in any pack | Flag for authoring wave |

**Note on threshold vs Definition of Done conflict:** The §4.3 thresholds (>10pp D1, >5pp D2/D3) are intentionally looser than the §5.1 Done criteria (≤6pp, ±3pp). This is by design — the thresholds trigger *review*, not *failure*. A section at 8pp spread triggers a review flag but does not block launch. Only the Definition of Done criteria gate launch-readiness. This avoids alert fatigue from the many sections that will remain above 6pp until Option B (new content authoring) executes.

**Owner:** Session operator (human or AI) must review the combined report before session closeout. Report is appended to the REVISION_HISTORY entry for that session.

**Cadence:** Every Full Governance Lane session (not calendar-month) — ensures review happens at the moment of maximum information, not on a lagging schedule.

### 4.4 Governance Gaps Identified

| Gap | Description | Severity |
|-----|-------------|----------|
| **Semantic explanation assignment (DL-010)** | No automated rule can detect misassigned explanations. Acknowledged as impossible. | HIGH — residual risk in unread tail (accepted via Decision 8, logged in Known Limitations register §5.2) |
| **Third-party audit handoff** | §18 of AGENTS.md describes the protocol but it's not automated. | LOW — process works but is manual |

---

## 5. COMPLETION ASSESSMENT AND RECOMMENDATIONS

### 5.1 Definition of Done

A launch-ready product must satisfy:

1. **Zero unaccepted Critical/High content defects** — any accepted residuals explicitly logged in the Known Limitations register (§5.2)
2. **All Certified items pass governance guard** (21/21 rules)
3. **Per-section answer-position spread ≤ 6pp** (all sections)
4. **Cognitive and difficulty distributions within ±3pp of S121 targets** (per-pack)
5. **All P2 case items in Certified state** (no Unprocessed)
6. **FormulaReference validator covers all items** (no silent skips; backfill complete)
7. **DL-003 absolute-language strong-cue items remediated** (always/never/impossible)

### 5.2 Known Limitations Register

This register tracks content-quality defects that have been **explicitly accepted** as residual risk rather than remediated. Items in this register are excluded from the Definition of Done's "zero defects" criterion by board vote.

| ID | Defect Class | Count | Scope | Rationale | Accepted By |
|----|-------------|-------|-------|-----------|-------------|
| **KL-001** | DL-010 semantic explanation misassignment | 204 items (unread tail) | All packs, Certified pool | Semantic explanation assignment is inherently an NLP/human check. No automated validator can reliably detect misassigned explanations. The 204-item weaker-flag tail (own-choice recall > 0.25 or best-other recall < 0.8) represents lower-probability misassignments. **Condition: stratified sample of ≥30/204 items must be human-adjudicated to estimate true misassignment rate before final acceptance.** 5 confirmed misassignments already remediated (2026-09-05). Residual risk: a small number of items may have explanations that describe the wrong choice, producing misleading learner feedback. | Board Decision 8 (2026-09-13), 4/0 — **CONDITIONAL** pending stratified sample | Post-launch audit within 90 days |

**KL-001 mitigation:** The delivery engine always displays ExplanationCorrect for the correct choice and ExplanationWrong[X] for distractor X. The known misassignment pattern (per the 5 confirmed cases remediated 2026-09-05) is a transposition between distractor slots — a learner sees a distractor explanation that describes a different distractor. However, the unread 204-item tail has not been adjudicated; some items may involve CorrectChoice-vs-explanation mismatches (DL-047 Group A precedent found 7 key inversions). The stratified sample (≥30/204) required by Decision 8 will determine the true defect rate before final acceptance.

**KL-001 condition detail:** Before KL-001 acceptance is finalized, a stratified sample of ≥30 items (drawn proportionally from all packs) must be human-adjudicated for semantic misassignment. If the true misassignment rate exceeds 5%, the full 204-item tail must be reviewed before launch. If ≤5%, KL-001 stands as accepted with 90-day post-launch audit.

### 5.3 Current Gap to Done

| Criterion | Status | Gap | Closed By |
|-----------|--------|-----|-----------|
| 1. Zero unaccepted Critical/High defects | **PARTIAL** | 14 P2-A-REM1 In Audit items need remediation plan (P2-A-REM3) | Option A, item 1 |
| 2. Governance guard 21/21 | **PASS** | — | — |
| 3. Per-section answer ≤6pp | **FAIL** | 29 sections exceed 6pp (see §3.1 M3 full table) | Option A, item 2 (worst 5 only); remainder post-launch |
| 4. Cognitive/difficulty ±3pp | **FAIL** | Pack D Difficult (+17.9pp), Pack E Apply (-21.5pp), Pack A/D Remember (-9.5/-10pp) | **Option B only** (requires new content) |
| 5. P2 case Certified | **PARTIAL** | 492 P2C-3 state-adds pending | Option A, item 3 |
| 6. FormulaRef coverage | **PARTIAL** | 241 backfill entries pending | Option A, item 5 |
| 7. DL-003 remediation | **PARTIAL** | 128 strong-cue items flagged | Option A, item 4 |

### 5.4 Recommendations

#### Option A: Mechanical Fix Wave (Preferred — but not sufficient alone)

**Scope:** Address all mechanically fixable gaps without new content authoring:

1. **P2-A-REM1 remediation plan** — 14 Pack A items (P2-A-084, 285, 289, 371, 377, 452, 505, 510, 517, 525, 542, 550, 572, 509) require a dedicated remediation session (P2-A-REM3). These are Critical defects: wrong keys, unsolvable stems, arithmetic errors, sign errors, EC-vs-key splits. Each item needs per-item editorial review — not a scripted batch.

2. **Answer-position bias — worst 5 sections only** — choice-label swapping for the 5 most egregious sections:
   - Pack D Section B (33.0pp)
   - Pack D Section E (29.3pp)
   - Pack A Section D (24.0pp)
   - Pack A Section B (23.0pp)
   - Pack C Section F (22.7pp)
   - Estimated 20-30 items require label rotation. Joint pack/section optimization required — per-section greedy swaps risk unbalancing pack level.
   - Remaining 24 sections deferred to post-launch phased rebalancing.
   - **Note:** Each label swap changes CorrectChoice letter → triggers Rule 4 (recomputed note) + Rule 17 (heuristic-screen admissibility) + Rule 5 (≤30 cap).

3. **P2C-3 state-add** — flip 492 Unprocessed case items to Certified via scripted state-only transition at cap 100 × 5 batches (BLOCK-AUTHORIZED, pre/post canonical-parser scans, serial writes).

4. **DL-003 strong-cue remediation** — rewrite 128 items containing always/never/impossible (batched at 30/content change-set per R5).

5. **FormulaReference backfill** — scripted field backfill for 241 items (A–E packs) that currently lack FormulaReference field. Deferrable to post-launch if timeline critical.

**Timeline:** 3-4 sessions (P2-A-REM3 remediation is per-item editorial, not scripted; answer-position dry-run calibration adds one session). **Dependency:** P2C-3 item 3 assumes Decision 3 (Scripted State-Only Lane, cap 100) is implemented. Current governance enforces cap 30 (R5); without the lane, P2C-3 alone requires ~17 batches, extending timeline. Decision 3 is a proposal, not current state.

**Risk:** Low-medium — P2-A-REM1 items are genuine Critical defects requiring editorial judgment

**Impact:** Brings criteria 1, 2, 5, 6, 7 to PASS. Criterion 3 partially closed (worst 5 sections). Criterion 4 remains FAIL.

**Explicit caveat: Option A alone does not satisfy the Definition of Done.** Criterion 4 (cognitive/difficulty ±3pp) requires new content authoring (Option B). Criterion 3 (per-section answer ≤6pp) is only partially closed. Launch-readiness under Option A requires either: (a) Option B completion afterward, or (b) an explicit decision to launch under Option C's known-gaps model.

#### Option B: Full Distribution Recalibration

**Scope:** All of Option A, plus new content authoring:

6. Author 50+ Remember-level items for Pack A/D
7. Author 80+ Apply-level items for Pack E
8. Rebalance Pack D difficulty (downgrade ~50 Difficult items or author 50 Easy/ME items)

**Timeline:** 5-7 sessions (Option A + 3-4 authoring sessions)

**Risk:** Medium — new content requires full governance cycle per item

**Impact:** Brings all 7 criteria to PASS. Fully satisfies Definition of Done.

#### Option C: Launch with Known Gaps

**Scope:** Launch with current 99.5% Certified pool, document gaps as known limitations:

9. P2-A-REM1 remediation (14 items — dedicated P2-A-REM3 session)
10. P2C-3 state-add (492 items)
11. Partial answer-position fixes (top 5 worst sections only)
12. Document remaining distribution skew as "known limitations" (add to §5.2 register)

**Timeline:** 1-2 sessions

**Risk:** Low for launch, but distribution skew may affect learner experience and psychometric validity

**Impact:** 99.5%+ Certified, but criteria 3 and 4 remain FAIL. Requires explicit board sign-off on known-gaps model.

### 5.5 Must-Fix vs Nice-to-Have

**Must-Fix (Blockers to Completion under Option A):**
1. P2-A-REM1 14-item remediation plan (replaces stale C1 — these are Critical defects)
2. P2C-3 492 state-adds at cap 100 × 5 batches (not 500 × 1)
3. Pack D Section B answer bias (33pp) — single worst section, must-fix for launch
4. DL-003 strong-cue remediation (128 items — already BLOCK, must clear before certification)

**Nice-to-Have (Post-Launch):**
1. Full 29-section answer-position rebalance (remaining 24 sections)
2. Cognitive distribution rebalancing (requires Option B)
3. Difficulty distribution rebalancing (requires Option B)
4. FormulaReference backfill (241 items — scripted, deferrable)
5. DL-003 weak-tier triage (any/every/all/must/only — report-only, session-boundary review)
6. R6/R10 merge is **NOT** must-fix — retain both per AGENTS.md §1

### 5.6 New Lessons Learned Since Last Review

1. **Validator blind spots are the highest-risk defect class.** DL-049 (psychometric stack excluded Pack C + all P2) and the FormulaRef CF-/CB- prefix issue (299 silent skips) both involved validators reporting success while missing entire content populations. Lesson: every validator must assert its coverage surface, not just its pass/fail count.

2. **State-only changes need a dedicated fast path — but capped conservatively.** P2C-3 (492 state-adds) has been pending across multiple sessions because state changes carry the same governance weight as content changes. DL-019 precedent (432-item concurrent-write overwrite) shows the risk of large batches. Lesson: scripted state-only transitions should operate at cap 100 (not 500) with BLOCK-AUTHORIZED, pre/post canonical-parser scans, and serial writes. P2C-3 completes in 5 batches — accept that cost.

3. **Per-section answer-position bias is invisible to pack-level checks.** Pack B is balanced at pack level (0.8pp spread) but Section B has 7.7pp and Section C has 11.4pp. Lesson: the dashboard correctly reports per-section data, but no governance rule enforces the 6pp tolerance at section level. D1 gate (report-only) addresses visibility; enforcement requires choice-label swapping (Option A, item 2).

4. **The R6/R10 distinction is intentional and must be preserved.** AGENTS.md §1 explicitly states: "an absent field fires Rule 10 only, never Rule 6." DL-018 (benign-absent==CC) and DL-021 (template-suppression) history confirm these are distinct defect classes. Merging them would destroy the diagnostic signal that distinguishes "field needs to be filled" (DL-026) from "field needs to be authored" (DL-021).

5. **Answer-position bias is pervasive, not isolated.** Initial scoping flagged only Packs A/D. The full dashboard §4 data reveals 29 of 36 sections exceed 6pp tolerance. Lesson: mechanical fix waves must be scoped against the full per-section audit, not pack-level summaries. Per-section greedy swaps risk unbalancing pack level — joint optimization required.

6. **Batch-2 and P2-A-REM1 are different populations.** P2 Batch-2 (2026-09-13) remediated 21 items across Packs B/C/E/F. P2-A-REM1 (2026-09-07) flipped 14 Pack A items to In Audit. These are disjoint sets. Conflating them leads to stale findings and re-remediation of already-fixed items. Lesson: always verify the QID list, not just the count.

---

## 6. REVISED GOVERNANCE DOCUMENT OUTLINE

### Proposed Governance Structure (Post-Review)

```
GOVERNANCE FRAMEWORK v2.0
├── 1. Structural Integrity Gates (BLOCK)
│   ├── R1: question_state ↔ REVISION_HISTORY
│   ├── R2: EW[CC] must be "" (DL-008)
│   ├── R3: Registry not hand-edited
│   ├── R4: Answer-key change needs recomputed note
│   ├── R5: ≤30 items/content change-set (unchanged for content/key writes)
│   ├── R6: non-CC EW present-but-empty (DL-026) — RETAINED SEPARATE
│   ├── R10: non-CC EW absent (DL-021) — RETAINED SEPARATE
│   ├── R7: Derived registry not authoritative
│   ├── R8: Session packages registered
│   ├── R13: Part2OnlyFlag strictly boolean
│   ├── R14: Cross-part QID boundary
│   ├── R16: Certification provenance stamp
│   └── R19: Duplicate CaseID
│
├── 2. Content Quality Gates (BLOCK)
│   ├── R9: Choice binary polarity (DL-037)
│   ├── R11: Cognitive classification gates
│   ├── R12: Cognitive-First Assignment
│   ├── R15: Misfiled EW fragment (DL-047)
│   ├── R17: Heuristic-screen admissibility (DL-045)
│   ├── R18: Choice-text hygiene (DL-046)
│   ├── R20: Legacy silent-drop extractor (DL-049)
│   └── R21: Semantic quarantine (DL-047)
│
├── 3. Scripted State-Only Lane (NEW — exempt from R5 cap)
│   ├── Cap: 100 items per change-set
│   ├── Scope: question_state field only
│   ├── Requires: BLOCK-AUTHORIZED marker per batch
│   ├── Compensating controls:
│   │   ├── Pre-batch canonical-parser scan (structural validation)
│   │   ├── Post-batch canonical-parser scan (0 parse errors, 0 regressions)
│   │   ├── Serial writes (no parallel file operations — DL-019 precedent)
│   │   ├── Per-item batch ID in REVISION_HISTORY
│   │   └── Dry-run default (--commit to apply)
│   └── Test suite: +6 tests for the new lane
│
├── 4. Distribution & Balance Gates (REPORT-ONLY → future BLOCK)
│   ├── D1: Per-section answer-position spread ≤6pp
│   ├── D2: Cognitive distribution ±3pp of S121 target (per-pack; measured against S121_PORTFOLIO_TARGETS.md §3.3 default 10/20/40/20/10, with Domain C exception at 8/17/45/20/10 per §3.2)
│   └── D3: Difficulty distribution ±3pp of S121 target (per-pack)
│
├── 5. Psychometric Validators (TIERED)
│   ├── BLOCK tier:
│   │   └── DL-003 strong-cue (always/never/impossible in distractor slots)
│   └── Report-only tier (reviewed at each session boundary per §4.3):
│       ├── DL-003 weak tier (any/every/all/must/only)
│       ├── DL-004 ambiguity
│       └── DL-005 distractor similarity
│
└── 6. Process Governance
    ├── G1: Backup-before-write (mandatory)
    ├── G2: Preflight at T0 (mandatory for Full Lane)
    ├── G3: Pipeline at Tend (mandatory after content work)
    ├── G4: Dual verification for all self-reported claims
    ├── G5: Runtime governance checkpoints (sessions >30min)
    └── G6: Combined Psychometric & Distribution Report at each session boundary
        (triggers re-escalation review per §4.3 thresholds)
```

---

## BOARD MINUTES

### Decisions Made

| # | Decision | Vote | Rationale |
|---|----------|------|-----------|
| 1 | Convene advisory board quarterly (not ad-hoc) | 4/0 | Recurring issues (DL-008, DL-031) persisted without board-level checkpoint |
| 2 | Retain R6 and R10 as separate rules (no merge) | 4/0 | AGENTS.md §1 explicitly distinguishes them; DL-018/DL-021 history confirms distinct defect classes; merge destroys diagnostic value |
| 3 | R5 amendment: Scripted State-Only Lane at cap 100, BLOCK-AUTHORIZED, pre/post canonical-parser scans, serial writes | 4/0 | DL-019 precedent (432-item concurrent-write overwrite) requires conservative cap; P2C-3 completes in 5 batches — accept that cost |
| 4 | Psychometric validators: tiered treatment (DL-003 strong-cue stays BLOCK; weak tier downgraded to report-only) | 4/0 | DL-043 Batch 2 precedent; blanket downgrade would let new strong-cue defects enter via authoring waves |
| 5 | Add D1-D3 as report-only gates with session-boundary review and re-escalation thresholds | 4/0 | Visibility first; thresholds intentionally looser than Done criteria to avoid alert fatigue |
| 6 | Adopt Option A (Mechanical Fix Wave) as next phase | 4/0 | Lowest risk, highest immediate impact. **Explicit caveat: Option A alone does not satisfy the Definition of Done.** Launch-readiness requires Option A followed by Option B (or explicit Option C known-gaps sign-off). |
| 7 | P2-A-REM1 14-item remediation is BLOCKING for P2 Pack A completion | 4/0 | Critical defects (wrong keys, unsolvable stems, arithmetic errors) require per-item editorial review |
| 8 | DL-010 semantic misassignment — CONDITIONAL acceptance of 204-item tail | 4/0 | No automated solution exists; acceptance conditional on stratified sample (≥30/204) human adjudication; logged as KL-001 with 90-day post-launch audit expiry |
| 9 | Answer-position fix scoped to worst 5 sections only (not all 29) | 4/0 | Per-section greedy swaps risk unbalancing pack level; joint optimization required; remaining 24 sections deferred to post-launch |

### Dissent Attribution (Decision 3 — superseded proposal 3a)

**Dissenter:** Marcus Chen — Software Quality & Governance Advisor

**Objection:** "Raising the cap from 30 to 50 for state-only changes creates a dual-track governance system where content changes (30) and state changes (50) have different thresholds. This complicates enforcement and creates an incentive to classify changes as 'state-only' to bypass the stricter cap. A flat increase also doesn't solve the real problem — 492 items still require ~10 change-sets. If we're going to create a separate lane, it should be a genuinely dedicated path with structural compensating controls, not just a higher number on the same track."

**Resolution:** The revised proposal (Decision 3) directly addresses this objection by creating a dedicated Scripted State-Only Lane at cap 100 with BLOCK-AUTHORIZED per batch, pre/post canonical-parser scans, serial writes, and dry-run default. Mr. Chen withdrew his objection and voted for the revised proposal.

### Final Governance Verdict Tally

| Verdict | Count | Rules |
|---------|-------|-------|
| **RETAIN** | 20 | R1, R2, R3, R4, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21 |
| **AMEND** | 1 | R5 (Scripted State-Only Lane, cap 100, BLOCK-AUTHORIZED, compensating controls) |
| **MERGE** | 0 | R6/R10 merge REJECTED |
| **REPLACE** | 0 | — |
| **REPEAL** | 0 | — |
| **NEW (report-only)** | 3 | D1, D2, D3 (distribution gates) |
| **NEW (lane)** | 1 | Scripted State-Only Lane (§6 item 3) |
| **TIERED (not downgraded)** | 3 | DL-003 strong-cue stays BLOCK; DL-003 weak tier, DL-004, DL-005 → report-only |

### Consistency Re-Check (Post-Revision)

After integrating all corrections from this session (8 substantive fixes from the first review round + 4 cosmetic touches from this round), the following cross-references were verified:

| Check | Result |
|-------|--------|
| §3.1 C1 (P2-A-REM1) vs Batch-2 population | **CONSISTENT** — C1 now correctly identifies 14 P2-A-REM1 items (P2-A-084..509), distinct from Batch-2's B/C/E/F items |
| §5.1 Criterion 1 ("zero unaccepted") vs Decision 8 (KL-001 conditional) | **CONSISTENT** — KL-001 acceptance is conditional on stratified sample |
| §5.3 Criterion 6 (FormulaRef) vs Option A scope | **CONSISTENT** — FormulaRef backfill is Option A, item 5 (deferrable) |
| §5.4 Option A item 2 scope vs §3.1 M3 | **CONSISTENT** — scoped to worst 5 sections (D-B, D-E, A-D, A-B, C-F), not all 29 |
| §5.4 Option A vs §5.1 Definition of Done | **CONSISTENT** — explicit caveat that Option A alone ≠ Done |
| §5.4 Option A timeline vs R5 amendment (cap 100) | **CONSISTENT** — P2C-3 completes in 5 batches; timeline 3-4 sessions |
| §4.3 compensating controls vs Decision 4 (tiered) | **CONSISTENT** — trigger (session boundary), thresholds (table), owner (session operator) all defined |
| §4.3 thresholds vs §5.1 Done criteria | **CONSISTENT** — thresholds (>10pp D1, >5pp D2/D3) are looser than Done (≤6pp, ±3pp) by design; triggers review not failure |
| §6 D2 measurement basis | **CONSISTENT** — measured against S121_PORTFOLIO_TARGETS.md §3.3 default with Domain C exception noted |
| §5.5 Lessons Learned numbering | **SEQUENTIAL** — 1, 2, 3, 4, 5, 6 |
| Header date vs evidence base | **CONSISTENT** — both 2026-09-13 |
| Board Chair Certification | **SOFTENED** — file/section level, not line-level |
| CURRENT_BASELINES.md §5 staleness | **RESOLVED** — §5 description cells corrected (9-rule→21-rule, 51-test→98-test); hashes byte-identical verified; coherence 0. Prose-only touch logged per REVISION_HISTORY.md (Advisory Board Report Closeout, 2026-09-13). |

### New Inconsistency Flagged

1. **Option A timeline (3-4 sessions) vs P2-A-REM1 editorial burden:** The 14 P2-A-REM1 items are genuine Critical defects requiring per-item editorial review (wrong keys, unsolvable stems, arithmetic errors). This is not a scripted batch — each item needs individual attention. If any item requires a CorrectChoice flip, Rule 4 (recomputed note) and Rule 16 (provenance stamp) apply per item. Timeline could extend to 5 sessions if multiple flips are needed.

2. **KL-001 conditional acceptance creates a launch gate:** The stratified sample (≥30/204) must be completed before KL-001 acceptance is finalized. If the sample reveals >5% misassignment rate, the full 204-item tail must be reviewed before launch. This could add 1-2 sessions. Recommend running the stratified sample in parallel with Option A execution to avoid blocking the timeline.

3. **CURRENT_BASELINES.md §5 staleness — RESOLVED:** §5 description cells corrected (9-rule → "21-rule", 51-test → "98-test"); hashes byte-identical verified; coherence 0. Prose-only touch logged per REVISION_HISTORY.md (Advisory Board Report Closeout, 2026-09-13). Cross-references with L517.

### Next Board Convening
**Trigger:** Completion of Option A (Mechanical Fix Wave) OR 90 days from today, whichever comes first.

---

**Board Chair Certification:** This report is based on raw file evidence from the repository as of 2026-09-13. All claims are traceable to specific file paths, section references, or dashboard outputs. No self-reported claims were accepted without independent verification against source files.
