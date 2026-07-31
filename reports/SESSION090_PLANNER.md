# Session 90 Planner — Pack B Section F Cognitive Upgrade Wave 1

**Date:** 2026-07-30
**Governance Lane:** Full
**Status:** PLANNER PHASE

---

## 1. Mission

Launch Wave 1 modernization for Pack B Section F (Technology & Analytics). This is the #2-ranked section by ROI from S86P (score: 90), following the successful Pack A Section F campaign (S87/S89). Wave 1 targets 15 rewrites (8 Evaluate + 7 Analyze) mirroring Pack A Section F Wave 1, raising Pack B Section F higher-order from 2.7% to 22.7%.

Additionally, 2 items with missing CognitiveLevel/Difficulty metadata (P1B-F-120, P1B-F-138) will be repaired — they are already at Evaluate/Analyze quality respectively.

## 2. Scope Lock

**Allowed files:**
- `pack_b_corrected.js` (write — cognitive upgrade rewrites + metadata repairs)
- `reports/SESSION090_PLANNER.md` (write)
- `reports/SESSION090_AUDITOR.md` (write)
- `reports/SESSION090_IMPLEMENTER.md` (write)
- `reports/SESSION090_CLOSEOUT.md` (write)
- `knowledge/REVISION_HISTORY.md` (append — closeout entry)

**Forbidden files:**
- All other pack files (`pack_a_corrected.js`, `pack_c_corrected.js`, `pack_d_corrected.js`, `pack_e_corrected.js`)
- All case pack files
- `app.js`, `styles.css`, `index_updated.html`
- Generated registries, baselines

## 3. Hard Rules

- Read-only by default except for the authorized write target
- Backup-before-write (timestamped `.bak-YYYYMMDDHHMMSS`)
- `npm run preflight` at T0 (PASSED — 0 divergences, 54/54 governance)
- Raw evidence verification for all count/state claims
- REVISION_HISTORY.md entry at closeout
- `npm run pipeline` at Tend
- Batch cap ≤30 items per Rule 5 (15 rewrites + 2 metadata repairs = 17, under cap)
- No CorrectChoice changes — cognitive upgrade only (CL, DS, stem, choices, explanations)
- CC-EW rotation fix applied post-rewrite (learned from S89: 10 of 15 items needed rotation)

## 4. Current State

| Metric | Value |
|--------|-------|
| Section F total | 75 |
| Evaluate | 2 (P1B-F-091, P1B-F-116) |
| Analyze | 0 |
| Apply | 22 |
| Understand | 49 |
| MISSING CL/DS | 2 (P1B-F-120, P1B-F-138) |
| Higher Order % | 2.7% |
| Certified | 75/75 |
| Architecture | Single-object (no DL-016) |
| DL-008 | 0 |
| DL-026 | 0 |

## 5. Wave 1 Target Selection

### Selection Criteria
1. **Topic supports business scenario** — Domain F topics that naturally involve decision trade-offs, competing alternatives, or multi-source analysis
2. **Prefer Understand → Evaluate** — since Understand-level items are definition-matching (lowest cognitive demand, most room for elevation)
3. **DS=3 items prioritized** — items already marked Moderate difficulty have slightly more complex foundations
4. **Diverse topic coverage** — spread across AI, blockchain, cloud, RPA, cybersecurity, data ethics clusters
5. **Structural integrity** — All 15 verified: 0 DL-008, 0 DL-026, all Certified, single-object architecture

### Evaluate Targets (8)

| # | QID | Current CL | Current DS | MicroTopic | Scenario Angle |
|---|-----|-----------|-----------|------------|----------------|
| 1 | **P1B-F-086** | Understand | 1 | AI basics | CFO Elena Voss at Meridian Analytics evaluating 3 ML approaches (supervised classification, unsupervised anomaly detection, NLP) for a $2.1M fraud detection initiative — accuracy, false-positive rate, explainability, and implementation cost data provided |
| 2 | **P1B-F-089** | Understand | 3 | blockchain fundamentals | Controller James Park at Pacific Foods evaluating whether blockchain or a centralized ledger is the right technology for intercompany reconciliation across 12 subsidiaries — immutability, throughput, cost, auditability data |
| 3 | **P1B-F-110** | Understand | 1 | incident response | CISO Rachel Tam at Westlake Health evaluating their incident response plan after a simulated ransomware tabletop exercise revealed 3 critical gaps — containment time, communication protocol, evidence preservation trade-off data |
| 4 | **P1B-F-122** | Understand | 3 | cloud vendor management | IT Director Marcus Chen at Orion Industrial evaluating 3 cloud providers (AWS, Azure, GCP) for migrating the financial reporting system — SOC 2 Type II coverage, FedRAMP status, latency benchmarks, TCO projections |
| 5 | **P1B-F-131** | Understand | 1 | RPA governance | Internal Audit Director Sarah Kwan at Northland Bank evaluating 3 RPA governance framework proposals after 14 bots were deployed without standardized controls — access management, change control, exception handling, segregation of duties criteria |
| 6 | **P1B-F-135** | Understand | 1 | generative AI in accounting | CFO David Okonkwo at Summit Manufacturing evaluating 2 control frameworks for the finance team's generative AI deployment (drafting MD&A, variance explanations, contract summaries) — hallucination risk, data confidentiality, human review requirements |
| 7 | **P1B-F-140** | Understand | 2 | data ethics | Chief Data Officer Amara Singh at Crescent Analytics evaluating a proposed customer behavior prediction model against 3 data ethics frameworks (FAT, IEEE 7000, EU Ethics Guidelines) — consent scope, algorithmic fairness metrics, secondary-use restrictions |
| 8 | **P1B-F-148** | Understand | 1 | RPA control considerations | IT Audit Manager Leo Tran at Harbor Distribution prioritizing 3 RPA control deficiencies found during a SOX ITGC audit — bot credential sharing, unlogged transaction overrides, untested exception-handling scripts — with severity, likelihood, and remediation cost data |

### Analyze Targets (7)

| # | QID | Current CL | Current DS | MicroTopic | Scenario Angle |
|---|-----|-----------|-----------|------------|----------------|
| 9 | **P1B-F-095** | Understand | 1 | SDLC phases | VP of Engineering Priya Nair at Phoenix Corp analyzing whether waterfall, agile, or hybrid methodology is most appropriate for a GxP-validated financial consolidation system — regulatory constraints, requirement stability, team distribution data |
| 10 | **P1B-F-108** | Understand | 3 | SOC reports | External Auditor Thomas Reid at Grant & Chen LLP analyzing a SaaS provider's SOC 2 Type II report to determine whether 3 identified control exceptions (backup failure, access recertification gap, change management deviation) affect financial statement audit reliance |
| 11 | **P1B-F-113** | Understand | 1 | RPA vs AI | Process Excellence Lead Nina Okonkwo at Atlas Manufacturing analyzing 4 business processes (AP invoice matching, customer sentiment classification, inventory reorder forecasting, GL account reconciliation) to classify each as best suited for RPA vs. AI/ML |
| 12 | **P1B-F-121** | Understand | 1 | smart contracts | Controller Grace Liu at Orion Supply Chain analyzing a smart-contract-based purchase-to-pay deployment — identifying which of 4 risk scenarios (oracle data manipulation, irreversible payment execution, code vulnerability, blockchain fork) represents the highest financial reporting risk |
| 13 | **P1B-F-136** | Understand | 1 | shared responsibility model | IT Risk Analyst Daniel Park at Meridian Insurance analyzing a cloud security incident (PII exposure from an unsecured S3 bucket) — decomposing the incident timeline to determine whether responsibility falls on the cloud provider, the customer, or is shared, per the shared responsibility model |
| 14 | **P1B-F-141** | Understand | 1 | blockchain limitations | CFO Maria Santos at Verde Supply Co. analyzing a blockchain feasibility assessment for a cocoa supply chain traceability initiative — identifying which 3 findings (throughput limitation, energy cost, node governance, immutability conflict with GDPR right-to-erasure) are genuine adoption blockers vs. addressable concerns |
| 15 | **P1B-F-145** | Understand | 2 | system implementation strategies | CIO Robert Klein at Eastwood Medical analyzing 4 implementation strategies (big bang, phased rollout, parallel run, pilot conversion) for an EHR-to-ERP financial integration — comparing cutover risk, cost, timeline, and business disruption data |

### Metadata Repair (2)

| # | QID | Current | Assignment | Rationale |
|---|-----|---------|-----------|-----------|
| 16 | **P1B-F-120** | MISSING CL + DS | CognitiveLevel: "Evaluate", Difficulty: "Difficult", DifficultyScore: 4 | Sophisticated ML deployment risk scenario with 4-category risk trade-off and nuanced distractor explanations. No content rewrite needed. |
| 17 | **P1B-F-138** | MISSING CL + DS | CognitiveLevel: "Analyze", Difficulty: "Moderate", DifficultyScore: 3 | ERP control deficiency root-cause analysis with discriminating distractor explanations. No content rewrite needed. |

## 6. Difficulty Recalibration

| From | To | New Difficulty | New DS |
|------|----|---------------|--------|
| Understand (DS=1) | Evaluate | Difficult | 4 |
| Understand (DS=2) | Evaluate | Difficult | 4 |
| Understand (DS=3) | Evaluate | Difficult | 4 |
| Understand (DS=1) | Analyze | Moderate | 3 |
| Understand (DS=2) | Analyze | Moderate | 3 |
| Understand (DS=3) | Analyze | Moderate | 3 |

## 7. Rewrite Standards

**Required:**
- Named organizations (company + stakeholder with role)
- Multiple competing alternatives with specific, comparable data
- Real business constraints (budget, timeline, regulatory, system dependencies)
- Decision trade-offs (financial, operational, risk, compliance)
- Analyze/Evaluate cognitive demand (decompose, compare, prioritize, recommend, justify)
- Minimum 4 choices with choice-specific distractors
- Choice-specific ExplanationWrong for all 3 non-CC slots (≥50 chars each)
- ExplanationCorrect references governing standard/framework + business interpretation

**Avoid:**
- Definition matching ("X is defined as...")
- Rule recall (single standard citation, no scenario)
- Single-step calculations
- Textbook phrasing without business context
- Generic "Option X is incorrect" placeholder text (DL-013 pattern)
- "CIO evaluating..." pattern fatigue — vary stakeholder roles and business triggers

## 8. Projected Impact

| Metric | Before | After Wave 1 | Delta |
|--------|--------|-------------|-------|
| Section F Evaluate | 2 | 10 | +8 |
| Section F Analyze | 0 | 7 | +7 |
| Section F HO items | 2 (2.7%) | 17 (22.7%) | +15 (+20pp) |
| Section F Understand | 49 | 34 | -15 |
| Pack B HO% | ~20.9% | ~23.9% | +3.0pp |
| Repository HO% | ~19.1% | ~19.7% | +0.6pp |

Plus metadata repairs add effective HO (items already at Evaluate/Analyze quality):
| Section F Evaluate | 2 | 11 | +9 |
| Section F Analyze | 0 | 8 | +8 |
| Section F HO items | 2 (2.7%) | 19 (25.3%) | +17 (+22.7pp) |

## 9. Stop Conditions

- QID count deviates from 500
- Certified count deviates from 500
- Any DL-008, DL-026, or Rule 9 violation introduced
- Governance guard deviates from 54/54 PASS
- Pipeline fails
- Preflight reports any divergence
- Pack B file fails `node --check` syntax check

## 10. Preflight Status (T0)

```
PREFLIGHT PASS — 2026-07-31T03:03:12.287Z
  500 — Pack A
  500 — Pack B
  500 — Pack C
  500 — Pack D
  545 — Pack E
  2451 Certified
  0 Divergences
  54/54 Governance PASS
```

## 11. Session Structure

Per SESSION_SCAFFOLD.md Full Lane template:
1. **Planner** — this document
2. **Auditor** — T0 evidence, queue integrity, structural integrity, risk assessment, GO/NO-GO
3. **Implementer** — backup, rewrite 15 items, metadata repair 2 items, CC-EW rotation fix, structural verification
4. **Verifier** — preflight, pipeline, cognitive level census, closeout
