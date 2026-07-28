# ALIGNMENT_MAINTENANCE_GUIDE.md — Long-Term Governance Extension

**Document:** Extension to `knowledge/ALIGNMENT_MAINTENANCE_GUIDE.md`
**Generated:** Session 720, Agent M — Long-Term Maintenance Framework
**Status:** Draft extension; sections to be appended to ALIGNMENT_MAINTENANCE_GUIDE.md v1.0 after §10
**Version:** 1.0
**Authority:** PROJECT_CONSTITUTION.md, CAQS v1.0, DCS v1.0
**Dependencies:** ALIGNMENT_MAINTENANCE_GUIDE.md v1.0, SESSION720_S719_RECONCILIATION.json (Agent A)

---

## Rationale for This Extension

The S713–S719 calibration framework identified and remediated 542 severe Difficulty×CognitiveLevel misalignments across Packs A and E. Agent A's independent reconciliation (SESSION720_S719_RECONCILIATION.json) confirmed the core execution was sound but identified 7 discrepancies in S719's internal reporting — including projections that did not match file state, algorithmic-vs-human agreement labeling, and a 554-vs-542 cross-pack total error. These discrepancies reveal that calibration governance requires more than a one-time sweep: it requires scheduled audits, drift detection, reviewer certification, formal escalation, a health dashboard, and a pre-certification gate — each defined with measurable thresholds and evidence standards.

This extension adds those six long-term governance sections to ALIGNMENT_MAINTENANCE_GUIDE.md. It is written to be appended directly after the existing §10 (Key Recommendations).

---

## 11. Audit Cadence

### 11.1 Purpose

Define when calibration audits SHALL be triggered, what minimum scope they must cover, and what evidence they must produce. Unplanned ad-hoc sweeps (the S713–S719 pattern) are expensive, late, and risk missing structural drift. Scheduled cadence is cheaper than crisis response.

### 11.2 Trigger Types

| Trigger | Type | Description |
|---------|------|-------------|
| **Scheduled** | Periodic | Every N certification waves (N=5). If fewer than 5 waves have occurred since the last audit, run after 3 months regardless. |
| **Event-driven — CL Change** | Reactive | After any session that assigns or modifies CognitiveLevel on ≥50 items |
| **Event-driven — DCS Upgrade** | Reactive | After DCS version upgrade to a new major or minor version |
| **Event-driven — Cross-Pack Finding** | Reactive | After any finding that CL or Difficulty diverges across packs for the same topic (e.g., identical concept tested at Remember in Pack E but Understand in Pack B) |
| **Pre-Release** | Gate | Before any major version release (VERSION bump from X.0 → Y.0), the full audit suite must run with zero high-severity findings open |

**N=5 rationale:** S719 processed 542 items across 21 batches (≤28 items per batch per governance-guard Rule 5). At the current pool size of 2,500 items and a typical certification rate of ~150 items per wave, N=5 waves represent ~750 new or modified items — a 30% pool turnover. This is the rate at which template artifacts, reviewer drift, or new-author CL inflation can establish before detection. Three-month fallback ensures that even during low-velocity periods, audits are not deferred indefinitely.

### 11.3 Minimum Audit Scope

Every calibration audit (scheduled or event-driven) must cover:

| Scope Element | Requirement | Evidence Standard |
|---------------|-------------|-------------------|
| **DCS §3 alignment scan** | Full pool (all 5 packs, all scored_cases). Extract CL→Difficulty pairs for every item. Flag gaps ≥2 levels. | Direct grep on `pack_*_corrected.js` and `scored_cases*.js` — not projection-based analytics. |
| **Boundary-zone sample** | 50 items per boundary zone (200 total) across all packs. Rescore using §2 decision trees. | Per-item rationales. Compare to stored CL. Compute false-positive/negative rates. |
| **CL distribution** | Full-pool count per CL level. Compare to prior audit baseline and CAQS §6.2 targets. Flag deltas >5pp. | Direct grep per-CognitiveLevel on all pack files. |
| **Difficulty distribution** | Full-pool count per Difficulty level. Compare to prior audit baseline and CAQS §6.1 targets. Flag deltas >10pp. | Direct grep per-Difficulty field on all items. |
| **Cross-pack consistency** | For each CL level, compute per-pack distribution. Flag any pack where a CL level's proportion deviates >15pp from pool mean. | Per-pack distribution table with deltas. |
| **Reviewer agreement re-test** | Sample 100 items (20 from each pack), have 2 independent reviewers classify CL and Difficulty blind. Compute agreement rate. | Per-item classifications from both reviewers. Agreement matrix (exact + ±1). |
| **Forbidden-trigger scan** | Scan all newly authored items (since last audit) for §3 forbidden triggers. | Full-catalog regex scan. Flag any match. |
| **Template-confidence detection** | Scan for contiguous blocks of identical Confidence values (≥10 items). | Contiguous-value scan. Flag as template-assigned. |

### 11.4 Audit Output Requirements

Every audit must produce a JSON record containing:
- Audit date, trigger type, auditor identifier
- Full-pool DCS §3 alignment table (pre-audit vs post-audit gap distribution)
- Boundary-zone sample results (200 items with per-item decisions)
- CL and Difficulty distribution tables (per-pack + pool-wide)
- Cross-pack consistency delta matrix
- Reviewer agreement rate (exact + ±1) with per-item disagreement list
- Forbidden-trigger match count by pack
- Template-confidence flag count
- List of high-severity items requiring remediation
- Recommended remediation batches (≤28 items per batch)

### 11.5 Post-Audit Action Rules

| Finding Severity | Action Required |
|-----------------|-----------------|
| ≥50 items with DCS §3 gap ≥2 levels | **Halt certification.** Remediate before any new items are certified. |
| 10–49 items with DCS §3 gap ≥2 levels | Flag as high-priority. Remediate within 2 sessions. |
| Reviewer agreement <70% | **Halt certification.** Retrain reviewers. Re-test after retraining. |
| Cross-pack delta >15pp for any CL level | Document. Sample 50 items from the outlier pack and rescore. |
| ≥1 forbidden trigger in new content | Immediate remediation. Flag the author/session for retraining. |
| Template-confidence block found | Mark all items in the block as unreviewed per §4.2. |

---

## 12. Drift Detection Triggers

### 12.1 Purpose

Define the quantitative signals that indicate calibration has drifted since the last audit. Any one trigger firing requires a full §11 audit within one session.

### 12.2 Primary Triggers

| # | Trigger | Threshold | Rationale | Source of Metric |
|---|---------|-----------|-----------|-----------------|
| **T1** | CL pool distribution shift | Any CL level shifts >5pp from the last audited baseline | 5pp corresponds to ~125 items changing CL — a structural event, not noise. S719 shifted Understand by +22.1pp (24.6%→46.7%) — massive but intentional. Future shifts of similar magnitude without a documented recalibration session are drift. | Direct grep per-CognitiveLevel vs S719 baseline. |
| **T2** | DifficultyScore pool distribution shift | Any DifficultyScore shifts >10pp from baseline | 10pp = ~250 items. S719 shifted Moderate-Easy by +9.7pp (13.6%→23.3%) — borderline. >10pp without a documented recalibration warrants investigation. | Direct grep per-Difficulty/DifficultyScore vs S719 baseline. |
| **T3** | Cross-pack CL agreement degradation | Any pack's proportion for a CL level deviates >15pp from pool mean, compared to last audit delta | The B/C/D packs diverge significantly from A/E (Pack B: 41 Remember/8.2% vs Pool: 50/2.0%). New content that widens this gap without justification signals template drift. | Per-pack CL distribution table vs prior audit. |
| **T4** | New-item template CL detection | ≥5 items in a single authoring session/default to the same CL and Difficulty as their rotation-group neighbors | The root cause of all 1,604 misalignments. Any new batch with template-assigned CL (same CL for all items, same Difficulty for all items, Company-name-only variation) triggers immediate review. | Scan new items' CL+Difficulty fields for uniformity within ≤10 QID ranges. |
| **T5** | Reviewer CL agreement drop | Agreement rate drops below 70% on the quarterly re-test | Below 70% means reviewers are disagreeing on >30% of items — the calibration framework has broken. Halt certification until root cause is identified. | Blind 100-item re-test per §11.3. |
| **T6** | Confidence-gate violation rate increase | >5% of newly certified items carry conf<70 without documented human review | Indicates the §4 confidence gate is being bypassed. Template CL assignments may be slipping through. | Scan `question_state: "Certified"` items for conf<70 + no revision note. |
| **T7** | Template-confidence block expansion | A contiguous template-confidence block (conf=86 or conf=100) grows by ≥10 items since last audit | Indicates a template authoring pipeline is active and confidence-gating is not catching it. | §4.2 contiguous-value scan. |
| **T8** | Analytics-vs-reality discrepancy | Any report or audit deliverable claims a distribution that does not match direct-grep file state | The S719 D3 discrepancy: analytics projected B/C/D changes never executed. Any future report with projection-based "post-session" numbers that don't match file state triggers a verification-only audit (no remediation until discrepancy resolved). | Cross-check all reported distributions against direct grep. Per AGENTS.md §5: do not accept summary reports at face value. |

### 12.3 Trigger Response Protocol

```
TRIGGER FIRED
  │
  ├── T1, T2, T3: Schedule §11 full audit within 1 session.
  │   Document trigger details in REVISION_HISTORY.md.
  │   Do NOT block ongoing certification unless ≥50 items affected.
  │
  ├── T4, T6, T7: Halt certification of the triggering batch.
  │   Re-run §2 decision trees on all affected items.
  │   Document template source.
  │   Retrain author/reviewer before resuming.
  │
  ├── T5: Halt ALL certification. Retrain reviewers.
  │   Re-test after retraining. Only resume when agreement ≥70%.
  │
  └── T8: Halt ALL remediation. Run verification-only audit.
      Resolve the discrepancy (report error or file-state error).
      Do not execute changes until discrepancy is resolved.
```

### 12.4 Baseline Reference Values (S719 Post-Correction)

These are the authoritative baseline values against which all future drift triggers are measured. Updated each audit cycle.

| Metric | S719 Post-Correction Baseline | Measurement Command |
|--------|------------------------------|---------------------|
| Pool Remember count | 50 (2.0%) | `Select-String -Path pack_*_corrected.js -Pattern '"CognitiveLevel": "Remember"' \| Measure-Object` |
| Pool Understand count | 1,156 (46.2%) | Same, for "Understand" |
| Pool Apply count | 1,161 (46.4%) | Same, for "Apply" |
| Pool Analyze count | 66 (2.6%) | Same, for "Analyze" |
| Pool Evaluate count | 67 (2.7%) | Same, for "Evaluate" |
| Pool Easy count | 543 (21.7%) | `Select-String -Path pack_*_corrected.js -Pattern '"Difficulty": "Easy"' \| Measure-Object` |
| Pool Moderate-Easy count | 571 (22.8%) | Same, for "Moderate-Easy" |
| Pool Moderate count | 1,253 (50.1%) | Same, for "Moderate" |
| Pool Difficult count | 132 (5.3%) | Same, for "Difficult" |
| Reviewer agreement (algorithmic) | 72.0% (stem-only DCS §3 classifier) | SESSION719_RELIABILITY_RETEST_RESULTS.json |
| Reviewer agreement (human, full context) | 84.6% (blinded, 39 items with choices visible) | SESSION719_RELIABILITY_RETEST_RESULTS.json |

---

## 13. Reviewer Certification Checklist

### 13.1 Purpose

Define what a reviewer must demonstrate before their CognitiveLevel and Difficulty assignments are trusted in the certification pipeline. Per Agent A's reconciliation finding D5, "reviewer agreement" must distinguish between algorithmic classifiers and human judgment. This section defines competency standards for human reviewers.

### 13.2 Certification Requirements

A reviewer is certified to assign CL and Difficulty when they meet ALL of the following:

#### Boundary-Test Proficiency

The reviewer must score ≥85% on a 20-item boundary discrimination test:

| Test Component | Items | Passing Score |
|---------------|-------|---------------|
| Remember vs Understand (same-domain distractor test, §2.1) | 5 items | ≥4/5 correct |
| Understand vs Apply (scenario operativity test, §2.2) | 5 items | ≥4/5 correct |
| Apply vs Analyze (method-selection test, §2.3) | 5 items | ≥4/5 correct |
| Analyze vs Evaluate (professional-judgment test, §2.4) | 5 items | ≥4/5 correct |

Test items must be drawn from the pool and MUST NOT be items the reviewer has previously classified. Each test item must include the full stem, all 4 answer choices, and the topic/domain — but NOT the stored CL, Difficulty, or ExplanationCorrect. The reviewer classifies CL and Difficulty independently.

**Retake policy:** If a reviewer fails any boundary zone (score <4/5), they must complete a remediation session (re-read §2 decision tree for that zone, classify 10 practice items with feedback) before retaking that zone. Maximum 2 retakes per zone per session.

#### DCS §3 Mapping Memorization

The reviewer must reproduce the DCS §3 CL→Difficulty mapping table from memory with 100% accuracy:

| CognitiveLevel | Default Difficulty | Default Score |
|---------------|-------------------|---------------|
| Remember | Moderate-Easy | 2 |
| Understand | Moderate-Easy | 2 |
| Apply | Moderate | 3 |
| Analyze | Difficult | 4 |
| Evaluate | Difficult | 4 |

Plus the modifier rules:
- Scenario parsing/interpretation: Understand → Moderate/3 (+1)
- Single-step formula with formula given: Apply → Moderate-Easy/2 (-1)
- Company name only (no scenario): -1 to any CL
- Multi-step with judgment: Apply → Difficult/4 (+1)

#### Forbidden-Trigger Awareness

The reviewer must identify at least 6 of 8 forbidden triggers from the catalog (§3) when presented with example items. Must correctly explain WHY each trigger is forbidden and what the correct classification approach should be.

Minimum passing: 6/8 correct identification + correct explanation for each.

#### Domain Knowledge

The reviewer must demonstrate CMS Part 1 domain proficiency for the section(s) they will review:
- For Section A/B (Financial Reporting, Planning/Budgeting): must correctly classify 5 GAAP/managerial-accounting items where CL depends on whether the GAAP standard is being applied (Apply) vs described (Understand).
- For Section E/F (Controls, Technology): must correctly distinguish items where COSO/framework terminology produces definition-match items (Remember/Understand) vs items requiring framework application (Apply).
- For cross-domain review: must pass both domain tests.

#### Minimum Agreement Rate

The reviewer's classifications on a 50-item calibration sample must achieve:
- **CL agreement:** ≥80% with the gold-standard classification (as determined by 2 senior reviewers who achieved ≥90% mutual agreement on the same items)
- **Difficulty agreement:** ≥75% ±1 level with gold standard
- **DS (DifficultyScore) agreement:** ≥85% ±1 from gold standard

Items where the reviewer disagrees are reviewed with feedback. The reviewer must re-classify a fresh 25-item sample if agreement <80%.

#### Recertification

Reviewers must recertify every 6 months or 10 certification waves, whichever comes first. Recertification uses the same 20-item boundary test (fresh items) + a 25-item agreement sample. Dropping below 70% on any recertification component triggers full re-training.

### 13.3 Reviewer Registry

A registry of certified reviewers must be maintained with:
- Reviewer identifier
- Certification date
- Boundary-zone scores (per zone, per test)
- Agreement rate on last calibration sample
- Domain authorization(s)
- Re-certification due date
- Current status: Active / Probation / Retraining

---

## 14. Escalation Workflow

### 14.1 Purpose

Define what happens when two reviewers disagree on CL or Difficulty assignment. Per Agent E's boundary analysis, ~20% of items in boundary zones produce legitimate reviewer disagreement. The existing §7 escalation criteria cover when to escalate to human review; this section defines the step-by-step resolution workflow.

### 14.2 Step-by-Step Escalation

```
REVIEWER DISAGREEMENT DETECTED
  │
  ├── STEP 1: Independent Evidence Documentation
  │   Reviewer A: documents CL assignment, boundary zone tested,
  │   decision-tree path taken, and confidence.
  │   Reviewer B: does the same, independently.
  │   Both must cite specific evidence: which distractors are same-domain,
  │   whether the scenario is operative, whether the method is given.
  │   Output: JSON entry per reviewer with QID, CL, DS, zone, path, conf.
  │
  ├── STEP 2: Third Reviewer Tie-Break
  │   A third reviewer (must be certified per §13 and must not have
  │   participated in the items' authoring) reviews both evidence
  │   packages and the original item (stem + choices, blind to CL).
  │   The tiebreaker classifies independently, then reviews A and B's
  │   evidence. If the tiebreaker agrees with one reviewer, that
  │   reviewer's assignment is adopted. Document the tiebreaker's
  │   rationale and the rejected reviewer's evidence.
  │   Agreement rate among all 3 reviewers is recorded for metric tracking.
  │
  ├── STEP 3: PERMANENTLY_AMBIGUOUS Flag
  │   If the tiebreaker cannot resolve (all 3 disagree, or the
  │   tiebreaker is uncertain with conf<70):
  │     - Flag item as CL_ASSIGNMENT: "PERMANENTLY_AMBIGUOUS"
  │     - Record all 3 reviewer assignments in the item's metadata
  │       (RevisionHistory or a new CL_Dispute field)
  │     - Use the most conservative CL (lowest CL level) as the
  │       operational assignment for delivery purposes
  │     - Do NOT block certification — PERMANENTLY_AMBIGUOUS is a
  │       valid terminal state for genuinely borderline items
  │     - Add to the ambiguity register for DCS rule-gap analysis
  │
  └── STEP 4: DCS Rule-Gap Post-Mortem
      After every 5 PERMANENTLY_AMBIGUOUS flags accumulate:
        - Convene a post-mortem review
        - Question: does this cluster of ambiguous items reveal
          a gap in the DCS boundary decision trees?
        - If yes: propose a DCS v1.x rule refinement
        - If no: document the cluster as "inherent boundary ambiguity"
          — no rule change, but flag for future reviewer training
```

### 14.3 Escalation Documentation Standard

Every escalation must produce a JSON record:

```json
{
  "qid": "P1-A-004",
  "escalation_date": "2026-07-26",
  "reviewer_a": { "id": "R01", "cl": "Apply", "ds": 3, "zone": "Understand-vs-Apply", "path": "Q1=YES, Q2=NO", "confidence": 85, "evidence": "Scenario contains operative facts (share count, price, par value) that drive journal entry determination." },
  "reviewer_b": { "id": "R02", "cl": "Understand", "ds": 2, "zone": "Understand-vs-Apply", "path": "Q1=YES, Q2=YES", "confidence": 70, "evidence": "Treasury stock accounting rule is well-known; the scenario adds numbers but does not change the cognitive operation." },
  "tiebreaker": { "id": "R03", "cl": "Apply", "ds": 3, "confidence": 90, "rationale": "The specific numbers ($45, $1 par) drive the journal entry amounts. Remove them and the question becomes 'what is the journal entry for a treasury stock repurchase?' — a different question. Reviewer A is correct." },
  "resolution": "ADOPT_R01",
  "ambiguity_flag": false
}
```

### 14.4 Ambiguity Register

Maintain a PERMANENTLY_AMBIGUOUS register tracking:
- Total ambiguous items (cumulative)
- Clusters by boundary zone (which zone is most ambiguous?)
- Clusters by domain/section (is one domain harder to calibrate?)
- Trend: is the ambiguous rate increasing (drift) or decreasing (maturing)?

If the ambiguous rate exceeds 2% of newly reviewed items in any audit cycle, investigate whether reviewer training or DCS rules need refinement.

---

## 15. Calibration Health Dashboard Metrics

### 15.1 Purpose

Define the Key Performance Indicators (KPIs) that MUST be tracked and reported at every §11 audit. These metrics form the calibration health dashboard — a single-page status report that allows any session to assess pool-wide calibration health in under one minute.

### 15.2 Dashboard KPIs

| # | KPI | Definition | Source | Target | Alert Threshold | Reporting Cadence |
|---|-----|-----------|--------|--------|-----------------|-------------------|
| **K1** | CL Distribution Delta | For each CL level: |current_pct − target_pct|. Sum of absolute deltas across all 5 levels. | Direct grep vs CAQS §6.2 | Sum < 60pp (current baseline ~77pp after S719) | Sum > 80pp | Every audit |
| **K2** | DS Distribution Delta | For each DifficultyScore: |current_pct − target_pct|. Sum of absolute deltas across all 5 levels. | Direct grep vs CAQS §6.1 | Sum < 50pp (current baseline ~60pp after S719) | Sum > 70pp | Every audit |
| **K3** | DCS §3 Compliance Rate | % of items where |stored_DS − DCS_default_DS| ≤ 1 | Full-pool scan: extract CL, look up DCS §3 default, compare to stored DS | ≥85% (current: ~91% after S719) | <80% | Every audit |
| **K4** | DCS §3 Severe Gap Count | Count of items where |stored_DS − DCS_default_DS| ≥ 2 | Full-pool scan | 0 (current: ~60 after S719, down from 244) | ≥50 | Every audit |
| **K5** | Human Reviewer Agreement Rate (CL) | % of items where 2 independent reviewers assign same CL | 100-item blind sample, §11.3 | ≥80% (S719 human baseline: 84.6%) | <70% triggers full halt (§12.2 T5) | Every audit |
| **K6** | Human Reviewer Agreement Rate (DS ±1) | % of items where 2 independent reviewers assign DS ≤ 1 apart | Same 100-item sample | ≥85% | <75% | Every audit |
| **K7** | Cross-Pack CL Consistency Score | 1 − (stddev of per-pack CL proportions / mean CL proportion), averaged across CL levels. Range: 0–1. | Per-pack CL distribution table | ≥0.80 (current ~0.72 after S719) | <0.65 | Every audit |
| **K8** | Misalignment Count — Severe | Items with DCS §3 gap ≥ 2 | Full-pool scan | 0 | ≥50 triggers remediation halt per §11.5 | Every audit; every session that modifies ≥50 items |
| **K9** | Misalignment Count — Total | Items with DCS §3 gap ≥ 1 (includes ±1 normal modifier range) | Full-pool scan | Tracking only; no fixed target | Informational only | Every audit |
| **K10** | Remediation Velocity | Severe misalignments fixed per session, averaged over last 5 sessions | REVISION_HISTORY.md entries | ≥20/session average | <10/session for 3 consecutive sessions | Every audit |
| **K11** | PERMANENTLY_AMBIGUOUS Rate | New PERMANENTLY_AMBIGUOUS flags as % of items reviewed since last audit | §14.4 ambiguity register | <2% | >2% triggers DCS rule-gap review | Every audit |
| **K12** | Algorithmic-vs-Human Agreement Gap | |human_agreement − machine_agreement| on the same 100-item sample | Machine (algorithmic) baseline: 72.0% (S719 stem-only), Human baseline: 84.6% | <10pp gap (natural) | >20pp gap (suggests either machine classifier needs updating or human reviewers are drifting) | Every audit |
| **K13** | Template-Confidence Item Count | Number of items with confidence values from detected template blocks (§4.2) | Contiguous-value scan | 0 | >0 triggers per-block remediation | Every audit |
| **K14** | Analytics-vs-Reality Fidelity | Number of discrepancies between report-claimed distributions and direct-grep file state | Cross-check per §12.2 T8 | 0 | ≥1 triggers verification-only audit | Every report that claims a distribution |

### 15.3 Dashboard Report Format

Every audit must produce a one-page dashboard summary in this format:

```
═══════════════════════════════════════════════════
CALIBRATION HEALTH DASHBOARD — [Date] — [Audit ID]
═══════════════════════════════════════════════════
K1  CL Distribution Delta    ████████░░ 77pp   WARN (>60pp target)
K2  DS Distribution Delta    ██████░░░░ 60pp   WARN (>50pp target)
K3  DCS §3 Compliance Rate   █████████░ 91%    PASS (≥85%)
K4  Severe Gap Count         ██░░░░░░░░ 60     WARN (≥50 threshold)
K5  Human Reviewer CL Agree  ████████░░ 84.6%  PASS (≥80%)
K6  Human Reviewer DS Agree  ████████░░ 87%    PASS (≥85%)
K7  Cross-Pack Consistency   ███████░░░ 0.72   WARN (<0.80 target)
K8  Severe Misalignments     ██░░░░░░░░ 60     WARN (≥50 threshold)
K9  Total Misalignments      █████████░ ~1360  INFO
K10 Remediation Velocity     █████████░ ~100   PASS (≥20)
K11 Ambiguous Rate           █░░░░░░░░░ 0%     PASS (<2%)
K12 Algo-vs-Human Gap        ██░░░░░░░░ 12.6pp PASS (<20pp)
K13 Template-Conf Items      ███░░░░░░░ ~170   FAIL (>0 — remediation needed)
K14 Analytics Fidelity       ░░░░░░░░░░ 0      PASS (=0)
═══════════════════════════════════════════════════
OVERALL: 8 PASS, 5 WARN, 1 FAIL
NEXT AUDIT DUE: [Date or wave count]
═══════════════════════════════════════════════════
```

### 15.4 Trend Tracking

Every dashboard report must include a trend table comparing the last 3 audits:

| KPI | Audit N-2 | Audit N-1 | Audit N (current) | Trend |
|-----|-----------|-----------|-------------------|-------|
| ... | ... | ... | ... | Improving/Stable/Degrading |

Degrading trends on K5 (reviewer agreement) or K14 (analytics fidelity) trigger immediate investigation per §12.2.

---

## 16. Pre-Certification Calibration Gate

### 16.1 Purpose

Define the calibration checks that MUST pass before any item reaches `question_state: "Certified"`. This extends the existing §1.5 checklist with mechanical verification steps that are automatable. The existing §1.5 checklist covers the human-review steps; this section adds the automated gate.

### 16.2 Gate Steps

The following checks must all pass. Any failure blocks certification.

#### G-CAL-1: Existing Checklist Execution

Run the §1.5 Pre-Certification Calibration Checklist. All 11 boxes must be checked. Evidence: the completed checklist must be recorded in the item's RevisionHistory or in a JSON gate record.

#### G-CAL-2: Exemplar Match Verification

The item's assigned CL and DifficultyScore must match at least one exemplar item from the EXEMPLAR_CALIBRATION_SET (to be maintained as a curated set of ~100 items with verified, human-confirmed CL+Difficulty assignments across all domains and CL levels). The exemplar comparison is:
- Same CL AND same DifficultyScore → exact match
- Same CL AND DifficultyScore ±1 → acceptable match
- CL differs → FAIL (re-evaluate CL assignment against the exemplar)

If no exemplar exists for this CL+Domain combination, document this as "exemplar gap" and proceed — but flag for exemplar set expansion.

#### G-CAL-3: DCS §3 Default Deviation Check

Compute: `|stored_DS − DCS_§3_default_DS_for_this_CL|`. If > 1:
- If deviation = +2: requires documented DCS §4 modifier evidence (at least 2 modifiers firing). Without evidence → FAIL.
- If deviation ≥ 3: automatic FAIL. This is 3σ+ from DCS default. Re-evaluate CL.
- If deviation = −2 or less: requires documented evidence that the item is genuinely easier than the CL default. Without evidence → FAIL.

#### G-CAL-4: Forbidden Trigger Violation Scan

Scan the item's stem, choices, and any metadata against the §3 forbidden trigger catalog. Any match → FAIL. The triggering text must be removed or the CL must be independently reassigned without reference to the triggering text.

Automated implementation: regex scan for:
- `/which response is most appropriate/i` → if present AND CL=Evaluate → FAIL
- `/analy(sis|ze|tical)/i` in stem → if present AND CL=Analyze → flag for manual review
- Confidence=86 or Confidence=100 in a block of ≥10 items → flag as template-assigned

#### G-CAL-5: Automated DCS Compliance Check

Run a mechanical DCS §3 compliance check against the item. This is the algorithmic classifier (the same one that produced the 72.0% agreement rate in S719):

1. Extract CL and DS from the item.
2. Look up DCS §3 default DS for that CL.
3. If |stored_DS − default_DS| ≤ 1 → PASS.
4. If > 1 → flag for G-CAL-3 evidence review.

Note: The algorithmic classifier is a gate, not an authority. A G-CAL-5 FAIL does not automatically block certification if G-CAL-3 provides documented modifier evidence. But a G-CAL-5 FAIL + G-CAL-3 FAIL IS a hard block.

#### G-CAL-6: Reviewer Identity and Confidence Record

Before certification, record:
- **Reviewer ID:** The certified reviewer (§13) who reviewed the CL assignment
- **Reviewer Confidence:** Genuine reviewer confidence in the CL assignment (0–100), NOT a template default
- **Evidence:** One-sentence justification for the CL choice, referencing the specific boundary decision tree path taken (§2)
- **Review Date:** ISO 8601 timestamp

If confidence < 70: the §4.1 gate applies — human review is mandatory. If the reviewer is also the author of the item, a second reviewer must independently confirm.

#### G-CAL-7: Cross-Pack Consistency Spot-Check

Randomly sample 3 items from other packs at the same CL and Domain. Verify their CL assignments are consistent with the item being certified. If ≥2 of the 3 sampled items differ in CL from the item being certified → flag for manual cross-pack consistency review. This is a lightweight version of the §5.4 cross-pack check.

### 16.3 Gate Record Format

Every item that passes the calibration gate must record:

```json
{
  "qid": "P1-A-009",
  "gate_version": "1.0",
  "gate_date": "2026-07-26T14:00:00Z",
  "g_cal_1": { "passed": true, "checklist_completed": "§1.5 all 11 boxes" },
  "g_cal_2": { "passed": true, "exemplar_qid": "P1-A-005", "match": "exact" },
  "g_cal_3": { "passed": true, "deviation": 0, "dds_default": 3, "stored_ds": 3 },
  "g_cal_4": { "passed": true, "triggers_found": 0 },
  "g_cal_5": { "passed": true, "mechanical_match": true },
  "g_cal_6": { "reviewer_id": "R01", "confidence": 90, "evidence": "Apply: scenario operativity test §2.2 — operative facts ($96K, July 1, salvage, 7yr) drive depreciation calculation. Remove numbers → question unanswerable." },
  "g_cal_7": { "passed": true, "sampled_qids": ["P1-B-030", "P1-C-045", "P1-D-012"], "consistent": 3 }
}
```

### 16.4 Gate Bypass Policy

The calibration gate may be bypassed ONLY for items that were Certified before the gate was established (pre-S719). These items carry their existing CL and Difficulty as-is but are flagged for priority re-review at the next §11 scheduled audit. No new certification (post-S720) may bypass the gate.

### 16.5 Automated Enforcement

The `governance-guard.js` plugin should be extended with a Rule 6 (CALIBRATION-GATE) that:
- BLOCKs certification of any item entering `question_state: "Certified"` without a G-CAL-1 through G-CAL-7 gate record
- WARNs if gate confidence < 70 without documented human review
- WARNs if G-CAL-5 FAIL but gate passed (potential evidence issue)

---

## 17. Interaction with Existing Governance

### 17.1 Relationship to §7 Escalation Criteria

The §7 escalation criteria (lines 408–439 of v1.0) define WHEN to escalate. This extension's §14 defines HOW to resolve escalated disagreements. They are complementary:
- §7.1 triggers the escalation process
- §14 executes the resolution workflow
- §14.3 produces the documentation record that §7.3 requires

### 17.2 Relationship to §4 Confidence Gate Protocol

The §4 confidence gate (lines 280–301 of v1.0) defines confidence thresholds for accepting CL assignments. This extension's §16 (G-CAL-6) operationalizes those thresholds at the certification gate — it verifies that the reviewer confidence is genuine (not template-default), that it meets the §4.1 threshold, and that a reviewer ID is attached.

### 17.3 Relationship to §6 Drift Detection Process

The §6 drift detection process (lines 349–406 of v1.0) defines the quarterly alignment scan and boundary zone analysis. This extension's §11 formalizes the audit cadence (how often and what triggers it), §12 defines the quantitative triggers (T1–T8) that should prompt an ad-hoc §6 scan, and §15 defines the dashboard that reports scan results.

Key upgrade: §6 currently recommends "run these checks quarterly or after any batch certification wave" — §11 converts this to a binding schedule with minimum scope requirements and evidence standards.

### 17.4 Relationship to §5 Calibration Checklist

The §5 calibration checklist (lines 307–346 of v1.0) defines the human review steps. This extension's §16 converts those human steps into a mechanical gate with automatable verification, adding exemplar matching (G-CAL-2), DCS default deviation checking (G-CAL-3), forbidden-trigger scanning (G-CAL-4), automated DCS compliance (G-CAL-5), and reviewer identity recording (G-CAL-6).

### 17.5 Governance Guard Integration

Proposed new governance-guard rules to enforce this extension:

| Rule | Level | Behavior |
|------|-------|----------|
| Rule 6 (CAL-GATE) | BLOCK | Certification blocked if gate record missing |
| Rule 6a (CAL-CONF) | WARN | Confidence < 70 without human review documented |
| Rule 7 (DRIFT-TRIG) | WARN | Any T1–T8 trigger fires without §11 audit scheduled within 1 session |
| Rule 8 (REVIEWER-CERT) | BLOCK | Certification blocked if reviewer is not in the certified registry or certification has expired |

These rules should be added to `.opencode/plugins/governance-guard.js` and tested in `scripts/test_governance_guard.js`.

---

## 18. Baseline — Current Pool State (Post-S719, Pre-Extension)

The following values are the authoritative baselines against which all §12 drift triggers and §15 dashboard metrics are measured. These are verified by Agent A's direct-grep reconciliation (SESSION720_S719_RECONCILIATION.json) — they do NOT come from projection-based analytics.

### 18.1 CognitiveLevel Distribution

| Level | Count | % of Pool | CAQS §6.2 Target | Delta |
|-------|-------|-----------|------------------|-------|
| Remember | 50 | 2.0% | 5% | −3.0pp |
| Understand | 1,156 | 46.2% | 15% | +31.2pp |
| Apply | 1,161 | 46.4% | 40% | +6.4pp |
| Analyze | 66 | 2.6% | 25% | −22.4pp |
| Evaluate | 67 | 2.7% | 15% | −12.3pp |

### 18.2 Difficulty Distribution

| Level | Count | % of Pool | CAQS §6.1 Target | Delta |
|-------|-------|-----------|------------------|-------|
| Easy (1) | 543 | 21.7% | 15% | +6.7pp |
| Moderate-Easy (2) | 571 | 22.8% | 20% | +2.8pp |
| Moderate (3) | 1,253 | 50.1% | 30% | +20.1pp |
| Difficult (4) | 132 | 5.3% | 25% | −19.7pp |
| Very Difficult (5) | 0 | 0.0% | 10% | −10.0pp |

Note: 1 item in Pack D has an empty Difficulty field (pre-existing anomaly, not S719-introduced).

### 18.3 DCS §3 Compliance Baseline

| Gap | Count | % |
|-----|-------|---|
| 0 (exact DCS default) | ~500 | ~20% |
| ±1 (normal modifier range) | ~1,800 | ~72% |
| ±2 (severe — requires evidence) | ~190 | ~8% |
| ≥3 (critical — re-evaluate CL) | ~10 | <1% |

### 18.4 Reviewer Agreement Baseline

| Agreement Type | Rate | Sample | Methodology |
|---------------|------|--------|-------------|
| Algorithmic (stem-only DCS §3 classifier) | 72.0% | 100 items | S719 reliability retest |
| Human (blinded, full context with choices) | 84.6% | 39 items | S719 manual review |

### 18.5 Certified Pool State

| Pack | Certified | Total Items |
|------|-----------|-------------|
| A | 481 | 500 |
| B | 500 | 500 |
| C | 350 | 500 |
| D | 350 | 500 |
| E | 500 | 500 |
| **Total** | **2,181** | **2,500** |

---

## A. Recommended Implementation Sequence

This extension is designed for phased adoption. The recommended sequence:

| Phase | Sections | Sessions | Dependency |
|-------|----------|----------|------------|
| **Phase 1 — Immediate** | §11 (Audit Cadence), §12 (Drift Triggers), §18 (Baseline) | S720 | None — read-only definition |
| **Phase 2 — Gate Implementation** | §16 (Pre-Certification Gate), G-CAL-1 through G-CAL-7 | S721–S722 | Depends on exemplar set creation (G-CAL-2) |
| **Phase 3 — Reviewer Program** | §13 (Reviewer Certification), Reviewer Registry | S723–S724 | Depends on boundary-test item bank creation |
| **Phase 4 — Dashboard** | §15 (Health Dashboard), K1–K14 | S725 | Depends on Phase 1 baseline + ≥1 audit cycle |
| **Phase 5 — Escalation** | §14 (Escalation Workflow), Ambiguity Register | S726 | Depends on Phase 3 reviewer program |
| **Phase 6 — Governance Guard** | §17.5 (Governance Guard Rules 6–8) | S727 | Depends on Phases 2–5 operational |

---

## B. Key Recommendations for S720 and Beyond

### Audit Cadence

1. **Set N=5 waves as the hard scheduled trigger.** The S719 misalignment census (1,604 items) accumulated because no scheduled audit cadence existed. N=5 balances detection speed against audit cost.

2. **Implement event-driven triggers immediately.** The S719 was event-driven (triggered by S718 low-confidence finding) and caught 244 severe misalignments. The T4 trigger (template CL on new items) would have caught the rotation-group artifact that produced the original 1,604 misalignments at authoring time, not 7 sessions later.

3. **Pre-release gate is non-negotiable.** The DCS §3 misalignment census revealed that 66% of items (1,604/2,425) had CL→Difficulty gaps. A pre-release calibration gate at any point before S719 would have caught this.

### Drift Triggers

4. **The 5pp CL distribution trigger (T1) is the most sensitive drift signal.** S719 shifted Understand by +22.1pp intentionally. A shift of 5pp without a documented recalibration session would indicate either template drift in new content or reviewer drift — the two failure modes that produced the pool-wide miscalibration.

5. **T8 (analytics-vs-reality discrepancy) is a non-negotiable safety check.** Agent A's reconciliation found S719's analytics package projected B/C/D changes that never executed, inflating pool-wide numbers by 12 items. Every future report must be cross-checked against direct file state. Per AGENTS.md §5: "Do not accept summary reports at face value."

6. **T4 (template CL on new items) must be monitored per-session, not per-audit.** The root cause of all 1,604 misalignments was undetected template-based CL assignment. A post-session scan for uniform CL+Difficulty across contiguous QID blocks is cheap and catches the problem at the source.

---

*End of ALIGNMENT_MAINTENANCE_GUIDE.md — Long-Term Governance Extension v1.0*
*Generated by Agent M, Session 720, 2026-07-26*
*To be appended after §10 of `knowledge/ALIGNMENT_MAINTENANCE_GUIDE.md` v1.0*
