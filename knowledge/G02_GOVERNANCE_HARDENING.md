# G02 — Governance Hardening & Final Push

**Version:** 1.0
**Status:** Active
**Governance Tier:** Foundational
**Authority:** Companion Governance Standard to PROJECT_CONSTITUTION.md, AGENTS.md, CAQS_v1.0.md
**Effective Date:** Post-S109P (2026-07-31)
**Prerequisite:** G01 Governance Rebaseline (G01_PROGRAM_BASELINE_2026Q3.md)

---

## Purpose

G02 formalizes governance lessons learned during the Quality Recovery program (S92P–S109P) and converts them into permanent institutional controls. It moves governance from a reactive posture (detect → correct) to a preventive posture (prevent → enforce → measure).

This document is the companion governance standard to the existing framework established at S221 and rebaselined at G01. It does not replace any existing governance document — it extends them with hardening controls derived from evidence accumulated across real sessions.

---

## Section 1 — Governance Lessons Learned

The following findings are no longer temporary observations. They have been demonstrated repeatedly across production sessions and are now elevated to operating principles.

### 1.1 Misclassification Is More Dangerous Than Missing Content

**Evidence:** S92P–S93P established a cognitive baseline across all 5 packs. The audit found a **58.7% misclassification rate** — 309 of 528 Higher Order (HO)-labeled items were overstated. Only ~219 items (8.6% of 2,545) genuinely tested at Analyze or Evaluate level.

An inflated `CognitiveLevel` label is invisible to the learner. The item renders correctly, the answer key is correct, and the validator passes. But the strategic metrics that govern content planning — HO inventory, Bloom's distribution, difficulty coverage — are all corrupted. Decisions made on inflated metrics (modernization priorities, blueprint gap targets, certification velocity targets) compound the error.

**Principle:** Metadata accuracy carries equal governance weight to content accuracy. A wrong cognitive label is a strategic defect even when no individual learner notices it.

### 1.2 Recovery Is Much More Expensive Than Prevention

**Evidence:** The recovery program executed:

| Wave | Session | Scope | Pattern |
|------|---------|-------|---------|
| DL-031 calibration | S89B, S89C, S713 | ~677 items | DifficultyScore downgrades for definition-match items |
| Pack C EC | S102P | 35 items | Analyze→Apply, Evaluate→Apply (54.7% → 8.0% HO) |
| Pack D BD+ED | S103P | 29 items | Evaluate→Analyze, Analyze→Apply |
| Pack C EC re-audit | S102P (second session) | 7 items | Definition-match and one-tier slippage |

Each recovery batch required: T0 preflight, backup creation, per-item audit against S95P rubrics, metadata-only edits, post-flight verification, REVISION_HISTORY.md entry, and governance guard validation. Total cost: 6+ Full Governance Lane sessions recovering damage that a single prevention gate would have blocked.

**Principle:** A 5-minute governance gate at write time is cheaper than a 2-hour recovery session. Prevention scales linearly; recovery scales with the inventory base.

### 1.3 Metadata Can Affect Strategic Metrics as Much as Content Quality

**Evidence:** When Pack C EC shifted from 54.7% HO to 8.0% HO in a single session (S102P), every strategic metric dependent on HO counts also shifted:
- Blueprint coverage by cognitive level
- Section readiness for modernization
- Certification priority scoring
- Learner-pool composition analytics

These shifts were caused by metadata corrections — zero content lines changed. The content was fine. The labels were wrong.

**Principle:** Strategic metrics must draw from verified metadata, not as-labeled metadata. The `Verified Higher Order Count` is a separate metric from the `Certified Count`. Governance must track both independently.

### 1.4 Governance Must Execute Before Certification, Not After Audits

**Evidence:** The DL-035 incident (39 Certified Domain F items carrying empty distractor ExplanationWrong slots) occurred because the S853 WAVE_A certification pipeline checked DL-008 (Rule 2) but did not check DL-026. Governance guard Rules 1-5 passed, and the items were certified. Rule 6 (DL-026 enforcement) was deployed after the fact at S814. The 39 items remain in the learner pool pending S816-S818 content remediation.

This is the canonical example of "governance trailing certification." The governance gap was known (DL-026 was documented as a defect class with 1,005 items pool-wide), but the certification pipeline did not integrate it.

**Principle:** Every governance rule that is BLOCK-level must be checked during certification — not audited after certification. A certification wave that passes 5 of 6 BLOCK rules has not passed governance.

### 1.5 Telemetry Without Attribution Produces Misleading Conclusions

**Evidence:** MAY-027 identified an attribution gap in the May telemetry pipeline — recommendation clicks were recorded as anonymous events without session correlation. Without attribution, the effectiveness measurement was ambiguous: a high recommendation-adoption rate could mean strong recommendations or could mean a single enthusiastic learner clicking everything. MAY-028 closed this gap by adding `attributionCardId` and session-start/completion correlation.

**Principle:** Every telemetry event must carry sufficient attribution to answer "who, when, in what context." Aggregated counts without per-learner/per-session attribution are not basis for effectiveness decisions.

---

## Section 2 — Rule 11 Governance

### 2.1 Status: Active, Mandatory

Rule 11 (Cognitive Classification Gates) is deployed as the 11th BLOCK-level rule in `governance-guard.js`. It enforces three AF gates at write/edit time, preventing items with inflated `CognitiveLevel` labels from entering the learner pool.

| Gate | Pattern | Detection | FP Rate | Action | Deployed |
|------|---------|-----------|---------|--------|----------|
| **AF-3** (Deterministic Rule) | Stem: "Under ASC/COSO/IFRS/GAAP" + no trade-off language in EC | Regex cross-check | 2-3% | **Auto-BLOCK** Analyze/Evaluate | S109P |
| **AF-4** (Taxonomy Classification) | Stem: "What type of" / "Which COSO component" / "classified as" | Surface regex | 0% | **Auto-BLOCK** Analyze/Evaluate | S109P |
| **AF-5** (Difficulty Mismatch) | DifficultyScore ≤ 2 AND Evaluate; DifficultyScore = 1 AND Analyze | Field comparison | 0% | **Auto-BLOCK** Analyze/Evaluate | S109P |

**Test suite:** 66/66 PASS (post-Rule 11 deployment, S109P).

### 2.2 AF Gate Override Rules

| Gate | Override Available? | Mechanism |
|------|--------------------|-----------|
| AF-3 | Yes — BLOCK-AUTHORIZED marker with certification evidence | Genuine Evaluate items with trade-off language embedded deeper than surface regex can detect |
| AF-4 | **No override path** | Taxonomy classification is structurally Apply or Remember. No content authoring decision can make "Which COSO component does this describe?" into an Evaluate item |
| AF-5 | Yes — BLOCK-AUTHORIZED marker with certification evidence | Edge-case items where low difficulty co-occurs with genuine analysis (e.g., simple data-set analysis with short stem) |

### 2.3 Future AF Gate Promotions

| Gate | Current Status | Target Status | Prerequisites |
|------|---------------|---------------|---------------|
| **AF-2** (Formula Substitution) | Not deployed | **BLOCK** after tuning (S110P) | 5-8% FP rate requires domain-specific tuning. Formula substitution patterns vary by domain (learning curve in D, cash collections in B). FLAG-level deployment recommended before BLOCK promotion |
| **AF-1** (Definition Match) | Not deployed | NLP-assisted review queue (S112P) | Semantic ceiling — surface regex achieves ~2% sensitivity. NLP enhancement projected at S112P. Full auto-BLOCK is not achievable without semantic understanding |
| **AF-6** (Single Correct Option) | Not deployed | **WARN** (S111P) | 10-15% FP rate — heuristic only. Items where only one choice is defensible are suspicious but cannot be automatically rejected without content analysis |

### 2.4 G-Gates (Complementary)

The S94P G-Gates complement the AF gates for the certification pipeline. They are not deployed as governance guard rules but serve as certification audit criteria:

| Gate | Purpose |
|------|---------|
| G-EVAL-1 | No decision maker → BLOCK Evaluate |
| G-EVAL-2 | <2 defensible choices → BLOCK Evaluate |
| G-EVAL-3 | Deterministic rule → BLOCK Evaluate |
| G-EVAL-4 | Difficulty ≤ 2 AND Evaluate → BLOCK |
| G-ANALYZE | <2 of A1-A4 → BLOCK Analyze |
| G-STRUCT | Missing structural fields → BLOCK HO |

### 2.5 Scope

Rule 11 covers classification integrity. It prevents new items from entering the pool with inflated labels but does not retroactively audit existing items. The S92P–S103P recovery program handled the existing-inventory correction. Rule 11 handles the future.

---

## Section 3 — Cognitive Certification Workflow

### 3.1 Mandatory Pipeline

Every item entering the Certified pool must pass through the following mandatory sequence:

```
Question Created
     ↓
Content Validation (CAQS §1.6 six-dimension verification)
     ↓
Rule 11 Screening (AF-3, AF-4, AF-5 BLOCK gates)
     ↓
Cognitive Audit (G-gates, S95P rubrics, per-item cognitive assessment)
     ↓
Certification (question_state → "Certified")
```

### 3.2 Explicitly Prohibited

The following certification pattern is **prohibited**:

```
Create → Certify → Audit Later
```

This pattern is what produced the DL-031 systematic difficulty inflation (~677 items), the S102P/S103P 58.7% misclassification rate, and the DL-035 39-item governance gap. Every instance where certification preceded cognitive audit created debt that required recovery sessions to repay.

### 3.3 Cognitive Audit Requirements

The cognitive audit step must verify:

1. **Bloom's level alignment** — Does the item's `CognitiveLevel` match the cognitive demand of the stem, choices, and correct answer?
2. **AF gate clearance** — Do AF-3, AF-4, AF-5 pass? If any gate fires, the item is capped at Apply until overridden with BLOCK-AUTHORIZED evidence.
3. **G-gate clearance** — If labeled Evaluate, does the item pass G-EVAL-1 through G-EVAL-4? If labeled Analyze, does it pass G-ANALYZE?
4. **Difficulty-cognitive consistency** — Does `DifficultyScore` meet the minimum threshold for the claimed `CognitiveLevel`?
5. **Distractor engineering** — Do distractors support the cognitive level? Analyze/Evaluate items require distractors that represent competing analytical conclusions, not obviously wrong alternatives.

### 3.4 Certification Blocking Conditions

An item shall not be certified if:

- Any AF gate fires and no BLOCK-AUTHORIZED override exists
- Any G-gate fires for the claimed cognitive level
- Cognitive audit has not been completed
- Rule 11 screening has not been executed

### 3.5 Integration with Existing Pipeline

The cognitive certification workflow integrates into the existing `npm run pipeline` sequence as follows:

```
validate
   ↓
build-registry
   ↓
[COGNITIVE AUDIT GATE — NEW]
   ↓
dashboard
```

A certification wave is incomplete until the cognitive audit gate has passed for every item in the wave.

---

## Section 4 — Metrics Governance

### 4.1 Metric Separation

The project shall track two independent certified-item metrics:

| Metric | Definition | Purpose |
|--------|-----------|---------|
| **Certified Inventory** | Count of items with `question_state: "Certified"` | Learner-pool eligibility; delivery-pool safety |
| **Verified Higher Order Inventory** | Count of Certified items independently verified as genuinely Analyze or Evaluate | Strategic coverage; modernization readiness; cognitive distribution accuracy |

**These metrics are not the same number.** The Certified Inventory includes items at all cognitive levels. The Verified HO Inventory is a subset — only items that pass both certification and cognitive audit. Conflating them produces the strategic metric inflation documented in §1.3.

### 4.2 Dashboard Metrics

The governance dashboard shall display:

| Metric | Current Value (G01 Baseline) | Source |
|--------|------------------------------|--------|
| Certified Inventory | 2,451 | Direct grep on pack files |
| Verified Higher Order | Post-recovery verified count (tracks true Analyze + Evaluate) | Per-item cognitive audit |
| Reclassification Queue Remaining | Items flagged for cognitive review but not yet audited | S97P gate output + recovery queue |
| Rule 11 Violations Blocked | Running total of writes blocked by AF-3/4/5 | Governance guard telemetry |
| Reclassification Drift Rate | Rate at which Verified HO items shift in/out per audit cycle | Sequential audit comparison |

### 4.3 Reclassification Drift Rate

Proposed by the G02 design review. A stable HO count with a high drift rate indicates a different governance problem than simple inventory growth or decline:

- **Low drift, stable count** → Classification system is accurate and stable
- **High drift, stable count** → Items are being reclassified in both directions — classification criteria are inconsistent or ambiguous
- **Low drift, declining count** → Systematic inflation being corrected (expected during recovery)
- **High drift, declining count** → Active recovery with inconsistent methodology

Drift rate shall be calculated as: `(items_reclassified_in + items_reclassified_out) / Verified_HO_count` per audit cycle.

### 4.4 Metric Authority

- **Certified Inventory** is authoritative from raw pack files (direct grep on `question_state: "Certified"`)
- **Verified HO Inventory** is authoritative from the most recent cognitive audit report
- No derived registry is authoritative for either metric (per governance guard Rule 7)

---

## Section 5 — May Operational Governance

### 5.1 Status

May is an operational product as of MAY-024 (2026-07-31). It is in Phase 2 Limited Rollout (5-10 testers). It is no longer a project — it is governed as a product with permanent governance requirements.

### 5.2 Monthly Review Gates

Every calendar month in which May is active, a production effectiveness review shall be performed. The review evaluates:

| Gate | Metric | Threshold | Measurement |
|------|--------|-----------|-------------|
| **Effectiveness** | Recommendation adoption rate per learner | ≥ baseline (first review establishes baseline) | `may-telemetry.js` — `adoptionRate` per session |
| **Telemetry Quality** | Event attribution completeness | ≥ 95% | Percentage of events with valid `sessionId` + `learnerId` |
| **Recommendation Conversion** | Rate at which viewed recommendations produce clicks | Measured, trended | `viewed → clicked` ratio per session |
| **Readiness Accuracy** | Pre-session readiness predictions vs. post-session performance | Correlation ≥ 0.3 | Readiness score delta vs. actual score delta |

### 5.3 Threshold Publication Requirement

**All effectiveness, reliability, and adoption thresholds must be published before the review period begins.** This prevents retroactive standard-setting — a governance practice where thresholds are adjusted post-hoc to match observed performance. The first effectiveness review (MAY-029A — Single-Learner Effectiveness Review) is the initial baseline-establishment review and does not require pre-published thresholds. MAY-029A is gated by behavioral maturity (≥5 completed sessions OR ≥1 Recovery Sprint), not calendar time or learner count — reflecting the single-learner longitudinal deployment model.

Subsequent reviews (from the second review onward) must:

1. Publish thresholds no later than day 1 of the review period
2. Use the same threshold definitions as the prior review
3. Document any threshold changes with rationale before the review begins

### 5.4 May Release Governance

A May release (any change to `may-core.js`, `may-learner-state.js`, `may-feature-flags.js`, `may-telemetry.js`, `may-pilot-activation.js`, or May integration points in `app.js`) shall:

1. **Pass `npm run preflight`** — verify 0 divergences from baselines
2. **Pass `npm run smoke`** — verify app loads, MCQ banks present, May coaching layer active
3. **Pass governance guard test suite** — verify no regression on any rule
4. **Pass May-specific rollback test** — verify `ENABLE_PRODUCTION_MAY_INTEGRATION: false` restores pre-May behavior
5. **Not weaken learner-pool protections** — per AGENTS.md §9.3, delivery-pool safety checks are never weakened

### 5.5 Escalation Thresholds

These thresholds trigger May session review. They are not automatic rollback triggers — they trigger investigation:

| Tier | Trigger | Response |
|------|---------|----------|
| Tier 0 | Any of: preflight divergence, smoke failure, governance guard fail | Halt May release; investigate |
| Tier 1 | Effectiveness score below threshold for 2 consecutive reviews | May session review; root cause analysis |
| Tier 2 | Recommendation conversion rate < 5% for one review period | Recommendation engine audit |
| Tier 3 | Readiness accuracy correlation < 0.1 for one review period | Readiness model recalibration |
| Rollback | Any crash attributable to May, answer-key exposure, learner state corruption | Immediate `ENABLE_PRODUCTION_MAY_INTEGRATION: false` |

---

## Section 6 — Campaign Exit Requirements

### 6.1 Mandatory Exit Gates

Before any modernization, certification, or recovery campaign can close, the following gates must pass:

| Gate | Requirement | Verification |
|------|-------------|-------------|
| **Rule 11 PASS** | All items in campaign pass AF-3, AF-4, AF-5 (or have BLOCK-AUTHORIZED overrides) | Governance guard run against campaign items |
| **Cognitive Audit PASS** | Per-item cognitive audit completed; no item carries inflated CognitiveLevel | Audit report with per-item QID evidence |
| **QA Review PASS** | Independent second-reviewer verification of campaign changes | QA review report |
| **Governance Review PASS** | All applicable governance guard rules pass for campaign scope | Governance guard test suite |
| **Post-Campaign Verification PASS** | Independent re-scan confirms campaign claims against raw file evidence | Per AGENTS.md §5 (Dual Verification) |

### 6.2 Closeout Documentation

A campaign closeout must produce:

1. **QID list** — every QuestionID touched by the campaign
2. **Before/after state** — what changed and why (per-item evidence, not summary counts)
3. **Gate results** — pass/fail for each of the 5 exit gates
4. **REVISION_HISTORY.md entry** — contemporaneous, not batched (per AGENTS.md §4)
5. **DEFECT_LIBRARY.md entry** — if any new defect was discovered
6. **CURRENT_BASELINES.md update** — if file hashes or certified counts changed

### 6.3 Prohibited Closeout Patterns

The following campaign closeout patterns are prohibited:

- **"All gates passed" without per-item evidence** — summary claims require raw file verification per AGENTS.md §5
- **"Deferred to next session" without a registered deferral** — undeferred issues become abandoned issues
- **Closeout before post-campaign verification** — the verification step must be completed, not planned
- **Closeout without REVISION_HISTORY.md entry** — per-governance guard Rule 1

---

## Section 7 — Integration with Existing Framework

### 7.1 Relationship to AGENTS.md

G02 extends AGENTS.md with the following additions:

- **§9.2 (Full Governance Lane Requirements):** Cognitive audit is now a mandatory step before certification. The certification pipeline at §15 (`npm run pipeline`) gains a cognitive audit gate.
- **§9.5 (Session Closeout Protocol):** Full Governance Lane sessions that change `CognitiveLevel` must verify AF gate clearance.
- **§14 (Authoring Priority):** Cognitive classification integrity is elevated to a quality-protection priority (item 2 under quality protection).

### 7.2 Relationship to CAQS_v1.0.md

G02 operationalizes CAQS §1.6 dimension 3 (Difficulty Calibration) and adds the cognitive dimension:

- CAQS §1.6 requires build-time AI verification across 6 dimensions including "Difficulty Calibration." G02 §3 (Cognitive Certification Workflow) makes this verifiable and gateable before certification.
- CAQS §6.1 (Target Difficulty Distribution) and §6.2 (Bloom's Taxonomy Distribution) are the target distributions. G02 §4 (Metrics Governance) ensures the measured distributions are drawn from verified metadata, not as-labeled metadata.

### 7.3 Relationship to PROJECT_CONSTITUTION.md

G02 is a companion governance standard at the Foundational tier. It serves the constitution's core principles:

| Constitution Principle | G02 Contribution |
|------------------------|------------------|
| Accuracy | Prevents cognitive label inflation that corrupts strategic metrics |
| Consistency | Establishes uniform cognitive classification enforcement |
| Transparency | Requires per-item evidence for all campaign closeouts |
| Maintainability | Converts lessons learned into institutional controls that survive personnel changes |
| Educational Value | Ensures learners receive items calibrated to their actual cognitive demand |

### 7.4 Relationship to G01 Governance Rebaseline

G01 established the authoritative governance snapshot as of 2026-07-31. G02 is the hardening layer built on that snapshot. The G01 documents are prerequisite reading:

| G01 Document | Relevance to G02 |
|-------------|-----------------|
| G01_PROGRAM_BASELINE_2026Q3.md | Authoritative certified pool, defect status, guard inventory, AF gate deployability |
| G01_GOVERNANCE_DELTA_REPORT.md | 13 governance deltas — G02 addresses Deltas 6, 7, 13 directly |
| G01_RISK_REGISTER.md | Risks R2, R3, R4 — G02 mitigates through Rule 11 + cognitive certification pipeline |
| G01_RULE11_FINALIZATION.md | Rule 11 specification — G02 §2 codifies the deployment |
| G01_MAY_PRODUCTION_GOVERNANCE.md | May operational assessment — G02 §5 formalizes ongoing governance |
| G01_DEFECT_STATUS_MATRIX.md | Defect inventory — G02 §1 derives lessons from DL-031, DL-035, DL-008 patterns |

---

## Section 8 — Governance Roadmap (Post-G02)

```
G01 GOVERNANCE REBASELINE  ← COMPLETE
     │
     ├── S109P  Rule 11 Deployment (AF-3/4/5 BLOCK)  ← COMPLETE
     │
     ├── G02  GOVERNANCE HARDENING  ← YOU ARE HERE
     │
     ├── S110P  AF-2 FLAG Gate (domain-tuned)
     │
     ├── S111P  AF-6 WARN Gate
     │
     ├── S112P  AF-1 NLP Enhancement (R&D)
     │
     ├── S816–S818  DL-035 Content Remediation (39 Certified items)
     │
      ├── MAY-029A  Single-Learner Effectiveness Review (behavioral maturity gate: ≥5 sessions OR ≥1 Recovery Sprint)
     │
     ├── S103P Residual  Remaining PH2-B3, PH2-B4 reclassification batches
     │
     └── Resume Modernization  With Rule 11 protection enabled
```

---

*G02 closes the gap between governance knowledge (G01 discovery) and governance practice (permanent institutional controls). The controls documented here are no longer proposals or recommendations — they are the operating standard for all future certification, modernization, recovery, and May sessions.*

*Referenced by: AGENTS.md, REVISION_HISTORY.md, G01 Governance Rebaseline reports*

---

## Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-31 | G02 Governance Hardening Session | Initial release. Codifies 5 governance lessons, Rule 11 governance, cognitive certification workflow, metrics governance, May operational governance, and campaign exit requirements. Cross-referenced against G01 baseline and S92P–S109P evidence. |
