# Session 89 Planner — Pack A Section F Cognitive Upgrade Wave 3

**Date:** 2026-07-30
**Governance Lane:** Full
**Status:** PLANNER PHASE

---

## 1. Mission

Continue the Pack A Section F cognitive modernization campaign. S87 (Wave 2) upgraded 15 items (8 Evaluate + 7 Analyze), raising HO from 2.7% to 22.7%. Wave 3 upgrades 15 additional low-order items to push Section F past the 40% higher-order threshold, making it a proven template for future campaigns.

## 2. Scope Lock

**Allowed files:**
- `pack_a_corrected.js` (write — cognitive upgrade rewrites only)
- `reports/SESSION089_PLANNER.md` (write)
- `reports/SESSION089_AUDITOR.md` (write)
- `reports/SESSION089_CLOSEOUT.md` (write)
- `knowledge/REVISION_HISTORY.md` (append — closeout entry)

**Forbidden files:**
- All other pack files (`pack_b_corrected.js`, `pack_c_corrected.js`, `pack_d_corrected.js`, `pack_e_corrected.js`)
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
- Batch cap ≤30 items per Rule 5
- No CorrectChoice changes — cognitive upgrade only (CL, DS, stem, choices, explanations)

## 4. Current State (Post-S87)

| Metric | Pre-S87 | Post-S87 | Pre-S89 |
|--------|---------|----------|---------|
| Section F HO | 2.7% | 22.7% | 22.7% |
| Evaluate | 0 | 8 | 8 |
| Analyze | 2 | 9 | 9 |
| Understand | 59 | 46 | 46 |
| Apply | 13 | 11 | 11 |
| Remember | 1 | 1 | 1 |
| Total | 75 | 75 | 75 |
| Certified | 75 | 75 | 75 |

**Remaining low-order pool:** 58 items (1 Remember, 46 Understand, 11 Apply)

## 5. Wave 3 Target Selection

### Selection Criteria
1. **Topic supports business scenario** — Domain F topics that naturally involve decision trade-offs, competing alternatives, or multi-source analysis
2. **Prefer Understand → Evaluate/Apply → Analyze** — since Understand-level items are definition-matching (lowest cognitive demand, most room for elevation)
3. **No overlap with S87 targets** — P1-F-{001,005,010,015,025,030,035,040,045,048,050,055,060,065,070} excluded
4. **Structural integrity** — All 15 verified: 0 DL-008, 0 DL-026, 0 Rule 9, all Certified

### Evaluate Targets (8)

| # | QID | Current CL | Current DS | Topic | Scenario Angle |
|---|-----|-----------|-----------|-------|----------------|
| 1 | **P1-F-028** | Understand | 2 | AI model governance | CIO evaluating 3 AI governance frameworks (EU AI Act, NIST AI RMF, self-regulation) for financial forecasting models with bias/fairness/explainability data |
| 2 | **P1-F-031** | Understand | 1 | Cloud computing scalability risk | CTO evaluating cloud migration strategies (lift-and-shift, refactor, hybrid) for legacy ERP with cost/risk/performance and RTO/RPO data |
| 3 | **P1-F-033** | Understand | 2 | Multi-factor authentication | CISO evaluating MFA deployment approaches (SMS, authenticator app, hardware token) with security-strength, cost, and user-experience trade-off data |
| 4 | **P1-F-034** | Understand | 2 | Least privilege access | IT audit director evaluating access control model redesign after a privilege escalation incident — RBAC vs. ABAC vs. PBAC with implementation costs and coverage data |
| 5 | **P1-F-038** | Understand | 2 | SDLC requirements phase | VP of Engineering evaluating SDLC methodology (waterfall, agile, DevOps) for a regulatory compliance system subject to FDA validation requirements |
| 6 | **P1-F-041** | Understand | 1 | System interface reconciliation | Controller evaluating 3 interface reconciliation approaches (batch, real-time API, blockchain) for 12 inter-system interfaces with cost/reliability/latency data |
| 7 | **P1-F-049** | Understand | 1 | Digital transformation finance role | CFO evaluating 3 investment prioritization frameworks (NPV-weighted, strategic alignment scorecard, risk-adjusted return) for a $5.8M digital portfolio |
| 8 | **P1-F-069** | Understand | 2 | Real-time analytics use | COO evaluating real-time vs. batch analytics architecture for supply chain visibility — latency, cost, and decision-quality trade-off data across 3 scenarios |

### Analyze Targets (7)

| # | QID | Current CL | Current DS | Topic | Scenario Angle |
|---|-----|-----------|-----------|-------|----------------|
| 9 | **P1-F-024** | Understand | 1 | Outlier detection | FP&A analyst decomposing transaction anomaly patterns across 4 detection methods (Z-score, IQR, DBSCAN, isolation forest) — identifying which outliers represent fraud vs. legitimate business events |
| 10 | **P1-F-027** | Understand | 2 | RPA invoice matching | Process improvement manager analyzing RPA implementation metrics (automation rate, exception handling, cost savings) across AP, AR, and procurement to identify which process delivers highest ROI |
| 11 | **P1-F-036** | Understand | 2 | Backup recovery objective | IT disaster recovery analyst analyzing RPO/RTO requirements and recovery cost data across 5 business applications to determine backup strategy prioritization |
| 12 | **P1-F-042** | Understand | 2 | API access control | Security architect analyzing API access log patterns (authentication failures, rate anomalies, data volume outliers) to identify compromised API keys and prioritize remediation |
| 13 | **P1-F-051** | Understand | 2 | Data visualization KPI selection | FP&A manager analyzing KPI selection for quarterly board dashboard — evaluating which metrics best communicate business performance vs. operational noise, given competing stakeholder requests |
| 14 | **P1-F-053** | Understand | 2 | Self-service BI governance | Data governance lead analyzing self-service BI usage telemetry (report count by department, data source diversity, duplication rate, stale report percentage) to identify the highest-risk governance gap |
| 15 | **P1-F-054** | Understand | 2 | Data lineage tracing | Data architect analyzing data lineage gaps in CFO close package — tracing 5 key financial metrics back through ETL pipeline to identify undocumented transformations and single points of failure |

## 6. Difficulty Recalibration

| From | To | New Difficulty | New DS |
|------|----|---------------|--------|
| Understand (DS=1) | Evaluate | Difficult | 4 |
| Understand (DS=2) | Evaluate | Difficult | 4 |
| Understand (DS=1) | Analyze | Moderate | 3 |
| Understand (DS=2) | Analyze | Moderate | 3 |

## 7. Rewrite Standards

**Required:**
- Named organizations (company + stakeholder with role)
- Multiple competing alternatives
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

## 8. Projected Impact

| Metric | Before (Post-S87) | After S89 Wave 3 | Delta |
|--------|-------------------|-----------------|-------|
| Section F Evaluate | 8 | 16 | +8 |
| Section F Analyze | 9 | 16 | +7 |
| Section F HO items | 17 (22.7%) | 32 (42.7%) | +15 (+20pp) |
| Section F Understand | 46 | 31 | -15 |
| Pack A HO% | 20.6% | 23.4% | +2.8pp |
| Repository HO% | 18.9% | 19.5% | +0.6pp |

## 9. Stop Conditions

- QID count deviates from 500
- Certified count deviates from 500
- Any DL-008, DL-026, or Rule 9 violation introduced
- Governance guard deviates from 54/54 PASS
- Pipeline fails
- Preflight reports any divergence

## 10. Preflight Status

```
PREFLIGHT PASS — 2026-07-30T21:04:31.324Z
  500 — Pack A
  500 — Pack B
  500 — Pack C  
  500 — Pack D
  545 — Pack E
  2451 Certified
  0 Divergences
  54/54 Governance PASS
```
