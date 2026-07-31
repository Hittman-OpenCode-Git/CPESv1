# S122 Phase 1 — Gold Standard Library

**Session:** S122
**Date:** 2026-07-31
**Governance Lane:** Light (Read-Only)
**Scope:** 2,545 items across 5 packs

---

## 1. Methodology

Items were identified by scanning all 5 pack files for CognitiveLevel and DifficultyScore fields, then cross-referenced against S93P section-level cognitive accuracy data. Sections with 0% known accuracy for a given cognitive level were excluded.

- **Analyze filter**: Sections CD (Pack D) 0%, DD (Pack D) 0%, A-SectionA (Pack A) 0% excluded
- **Evaluate filter**: Section EC (Pack C) 0%, Section A (Pack A) 25% excluded
- **138 of 188 Analyze items** and **113 of 164 Evaluate items** passed AF/E filters

---

## 2. Analyze — Top 25

### Tier 1: All 4 Criteria Met (5 items)

| # | QID | Pack/Sec | Topic | Diff | Criteria |
|---|-----|----------|-------|------|----------|
| 1 | **P1-BD-002** | D/BD | Flexible budget variance decomposition | 4 | A1+A2+A3+A4 |
| 2 | **P1-BD-073** | D/BD | Forecast accuracy measurement (MAD/MSE) | 4 | A1+A2+A3+A4 |
| 3 | **P1-B-016** | A/B | Production budget — build-ahead vs. overtime | 4 | A1+A2+A3+A4 |
| 4 | **P1-B-022** | A/B | Learning curve validation | 4 | A1+A2+A3+A4 |
| 5 | **P1-F-024** | A/F | Outlier detection method comparison | 3 | A1+A2+A3+A4 |

### Tier 2: Decomposition + Cause-Effect + Pattern (13 items)

| # | QID | Pack/Sec | Topic |
|---|-----|----------|-------|
| 6 | **P1-BD-011** | D/BD | Incremental budgeting — use-it-or-lose-it pattern |
| 7 | **P1-BD-012** | D/BD | Incremental budgeting — structural gap diagnosis |
| 8 | **P1-BD-025** | D/BD | Learning curve budget calibration (80% vs 90% curve) |
| 9 | **P1-ED-006** | D/ED | COSO Principle 16 — monitoring frequency adequacy |
| 10 | **P1-ED-013** | D/ED | COSO Principle 12 — IT-dependent manual control circumvention |
| 11 | **P1-ED-033** | D/ED | COSO Principle 11 — RTO/RPO adequacy analysis |
| 12 | **P1-ED-047** | D/ED | COSO Principle 1 — tone at the top gap diagnosis |
| 13 | **P1-ED-048** | D/ED | COSO Principle 3 — delegation of authority gap |
| 14 | **P1-ED-057** | D/ED | COSO Principle 17 — separate evaluations scope |
| 15 | **P1-ED-061** | D/ED | COSO Principle 12 — dual approval circumvention |
| 16 | **P1-ED-062** | D/ED | COSO Principle 9 — management override risk |
| 17 | **P1-ED-063** | D/ED | COSO Principle 6 — supply chain risk identification |
| 18 | **P1-ED-065** | D/ED | COSO Principle 2 — board independence gap |
| 19 | **P1-ED-068** | D/ED | COSO Principle 16 — KPI manipulation detection |
| 20 | **P1-ED-073** | D/ED | Monitoring — exception reports not reviewed |
| 21 | **P1-E-042** | A/E | Control exception root cause analysis |

### Tier 3: Decomposition + Cause-Effect + Comparative (4 items)

| # | QID | Pack/Sec | Topic |
|---|-----|----------|-------|
| 22 | **P1-EC-011** | C/EC | COSO Principle 7 — inherent vs. residual risk conflation |
| 23 | **P1-F-042** | A/F | API access control — anomaly detection |
| 24 | **P1B-C-147** | B/C | Transfer pricing — external supplier conflict |
| 25 | **P1-F-015** | A/F | BI dashboard — margin decline decomposition |

---

## 3. Evaluate — Top 25

### Tier 1: All Criteria Met (22 items)

**Section F — Gold Standard (100% Evaluate accuracy):**

| # | QID | Pack/Sec | Topic | Diff |
|---|-----|----------|-------|------|
| 1 | **P1-F-010** | A/F | Data cleansing — duplicate detection approach selection | 4 |
| 2 | **P1-F-028** | A/F | AI model governance framework (NIST AI RMF, EU AI Act, ISO 42001) | 4 |
| 3 | **P1B-F-089** | B/F | Blockchain vs. shared ledger for intercompany reconciliation | 4 |
| 4 | **P1B-F-110** | B/F | Cybersecurity — ransomware tabletop exercise prioritization | 4 |
| 5 | **P1-F-030** | A/F | Blockchain shared ledger adoption decision | 4 |
| 6 | **P1-F-031** | A/F | Cloud computing migration strategy (lift-and-shift vs. refactor) | 4 |
| 7 | **P1-F-033** | A/F | Multi-factor authentication tiered approach | 4 |
| 8 | **P1-F-034** | A/F | Least privilege access — RBAC vs. ABAC vs. PBAC | 4 |
| 9 | **P1-F-038** | A/F | SDLC methodology — FDA 21 CFR Part 11 compliance | 4 |
| 10 | **P1-F-040** | A/F | Change control policy design (preventive vs. detective vs. hybrid) | 4 |
| 11 | **P1-F-041** | A/F | System interface reconciliation — tiered modernization | 4 |
| 12 | **P1-F-049** | A/F | Digital transformation framework — risk-adjusted return | 4 |
| 13 | **P1-F-060** | A/F | Vendor cyber risk assessment approach | 4 |
| 14 | **P1-F-069** | A/F | Real-time analytics investment — targeted vs. full deployment | 4 |
| 15 | **P1B-F-086** | B/F | AI fraud detection approach selection | 4 |
| 16 | **P1B-F-120** | B/F | AI/ML training data risk evaluation | 4 |
| 17 | **P1B-F-122** | B/F | Cloud provider selection — weighted scoring | 4 |
| 18 | **P1B-F-140** | B/F | AI ethics framework — FAT (Fairness/Accountability/Transparency) | 4 |

**Section B — High-Accuracy Items (83% Pack A, 71% Pack D):**

| # | QID | Pack/Sec | Topic | Diff |
|---|-----|----------|-------|------|
| 19 | **P1-B-002** | A/B | Budget process overhaul — participative budgeting | 4 |
| 20 | **P1-B-004** | A/B | Zero-based budgeting — department pilot selection | 4 |
| 21 | **P1-B-008** | A/B | Cash budget — financing alternatives evaluation | 4 |
| 22 | **P1-B-031** | A/B | Cash collections acceleration — discount vs. factoring vs. tightening | 4 |
| 23 | **P1-B-085** | A/B | Material sourcing strategy — bulk vs. JIT vs. hybrid | 4 |
| 24 | **P1-BD-005** | D/BD | Variance investigation policy design | 4 |
| 25 | **P1-E-008** | A/E | Bank reconciliation — COSO governance decision | 4 |

---

## 4. Difficulty-5 — Top 25

| # | QID | Pack/Sec | Topic | CL | Score |
|---|-----|----------|-------|-----|-------|
| 1 | **P1-BD-016** | D/BD | Capital expenditure — CNC replacement | Evaluate | 8 |
| 2 | **P1-BD-021** | D/BD | 3-year capex plan — phased approach | Evaluate | 8 |
| 3 | **P1-B-030** | A/B | Supplier evaluation — TCO quantification | Evaluate | 6 |
| 4 | **P1-FC-018** | C/FC | Cybersecurity — phishing incident response | Evaluate | 6 |
| 5 | **P1-FC-019** | C/FC | Digital transformation — tech obsolescence risk | Evaluate | 6 |
| 6 | **P1-BD-098** | D/BD | Strategic planning — resource allocation conflict | Evaluate | 6 |
| 7 | **P1-FD-055** | D/FD | RPA bot credential unauthorized transaction | Evaluate | 6 |
| 8 | **P1-BD-018** | D/BD | Capex — make-vs-buy CNC analysis | Evaluate | 5 |
| 9 | **P1-BD-023** | D/BD | Direct labor budget — staffing mix | Evaluate | 5 |
| 10 | **P1-BD-026** | D/BD | Direct labor — robotic welding automation | Evaluate | 5 |
| 11 | **P1-ED-056** | D/ED | COSO Principle 5 — accountability incentives | Evaluate | 5 |
| 12 | **P1-EC-034** | C/EC | COSO Principle 9 — fraud risk with constrained audit | Evaluate | 3 |
| 13 | **P1-EC-035** | C/EC | COSO ERM — risk appetite strategic alignment | Evaluate | 3 |
| 14 | **P1-FC-004** | C/FC | Third-party SaaS vendor cyber risk | Evaluate | 3 |
| 15 | **P1-FC-055** | C/FC | AI/ML model bias — loan approval | Evaluate | 3 |
| 16 | **P1-BD-029** | D/BD | Standard cost setting — phased approach | Evaluate | 3 |
| 17 | **P1-BD-097** | D/BD | Strategic planning — budget conflict resolution | Evaluate | 3 |
| 18 | **P1-BD-099** | D/BD | Strategic planning — investment sequencing | Evaluate | 3 |
| 19 | **P1-ED-043** | D/ED | COSO ERM — risk appetite recalibration | Evaluate | 3 |
| 20 | **P1-B-039** | A/B | Credit terms revision | Evaluate | 3 |
| 21 | **P1E-EVAL-001** | E/D | Make-or-buy — qualitative risk factors | Evaluate | 3 |
| 22 | **P1E-EVAL-004** | E/C | Transfer pricing — capacity constraints | Evaluate | 3 |
| 23 | **P1-EC-026** | C/EC | COSO ERM — risk culture post-merger | Apply* | 3 |
| 24 | **P1-FC-050** | C/FC | Data quality dimensions — ⚠ **MISCLASSIFIED** | Evaluate* | 0 |
| 25 | **P1-FD-046** | D/FD | ⚠ **STRUCTURALLY EMPTY** | Evaluate* | 0 |

> **Warnings:** Items 23-25 are flagged. P1-EC-026 is Apply, not Evaluate. P1-FC-050 is Easy definition-match ("accuracy, completeness, consistency" → data quality dimensions). P1-FD-046 has all fields blank (S93P confirmed structural defect).

---

## 5. Technology (Section F) — Top 25

### Gold Tier: Pack A Section F (100% Evaluate accuracy)

| # | QID | Topic | CL | Diff | Why Excellent |
|---|-----|-------|-----|------|--------------|
| 1 | **P1-F-001** | ERP module sequencing | Evaluate | 4 | CIO prioritizes Finance→Supply Chain→HR based on dependency hierarchy |
| 2 | **P1-F-005** | Metadata standard selection (ISO 11179) | Evaluate | 4 | CDO selects standard for 3-system legacy migration |
| 3 | **P1-F-010** | Data de-duplication method selection | Evaluate | 4 | 4 methods evaluated for 85K records; ML fuzzy matching |
| 4 | **P1-F-030** | Blockchain shared ledger adoption | Evaluate | 4 | 400+ intercompany transactions, 8 subsidiaries |
| 5 | **P1-F-031** | Cloud migration strategy | Evaluate | 4 | Lift-and-shift vs. refactor vs. SaaS replacement |
| 6 | **P1-F-033** | Multi-factor authentication tiered design | Evaluate | 4 | 4 user groups with different risk profiles |
| 7 | **P1-F-034** | Least privilege access — RBAC/ABAC/PBAC | Evaluate | 4 | Claims adjuster privilege escalation incident |
| 8 | **P1-F-038** | SDLC methodology for FDA compliance | Evaluate | 4 | Waterfall vs. Agile vs. Hybrid for 21 CFR Part 11 |
| 9 | **P1-F-040** | Change control policy design | Evaluate | 4 | $340K revenue error from ERP config bypass |
| 10 | **P1-F-041** | System interface reconciliation strategy | Evaluate | 4 | Pareto-driven tiered modernization |
| 11 | **P1-F-049** | Digital transformation framework | Evaluate | 4 | $5.8M budget across 5 initiatives |
| 12 | **P1-F-060** | Vendor cyber risk assessment approach | Evaluate | 4 | Continuous monitoring vs. questionnaire vs. on-site |
| 13 | **P1-F-069** | Real-time analytics deployment | Evaluate | 4 | Decision latency principle — cold chain vs. batch |
| 14 | **P1-F-028** | AI model governance framework | Evaluate | 4 | NIST AI RMF for credit risk model |
| 15 | **P1-F-042** | API access control — anomaly detection | Analyze | 3 | 2.8M daily requests, 14 production APIs |
| 16 | **P1-F-024** | Outlier detection method comparison | Analyze | 3 | 4 methods across effectiveness, cost, false-positive rate |
| 17 | **P1-F-015** | BI dashboard — margin decline decomposition | Analyze | 3 | 4.2% margin decline across 3 product lines |

### Silver Tier: Pack B Section F (100% Evaluate accuracy)

| # | QID | Topic | CL | Diff | Why Excellent |
|---|-----|-------|-----|------|--------------|
| 18 | **P1B-F-089** | Blockchain — central ledger vs. full blockchain | Evaluate | 4 | $640K net benefit, 150-day payback |
| 19 | **P1B-F-110** | Cybersecurity — ransomware containment protocol | Evaluate | 4 | NIST CSF Respond function |
| 20 | **P1B-F-086** | AI fraud detection — supervised classification | Evaluate | 4 | 94% recall satisfying audit committee constraints |
| 21 | **P1B-F-120** | AI/ML — training data risk evaluation | Evaluate | 4 | Systematic error replication as SOX risk |
| 22 | **P1B-F-122** | Cloud provider weighted scoring | Evaluate | 4 | AWS vs. Azure vs. GCP across 5 criteria |
| 23 | **P1B-F-140** | AI ethics — FAT framework selection | Evaluate | 4 | Fairness/Accountability/Transparency for consumer model |
| 24 | **P1B-F-091** | SaaS migration — contractual safeguards | Evaluate | 4 | SOC 2 with 2 compliance gaps requiring negotiation |
| 25 | **P1B-F-131** | RPA bot governance — access management priority | Evaluate | 4 | COSO Control Activities as foundational priority |

---

## 6. Summary Statistics

| Category | Labeled | After Filtering | Top 25 Selected |
|----------|---------|----------------|-----------------|
| Analyze | 188 | 138 | 25 |
| Evaluate | 164 | 113 | 25 |
| Difficulty-5 | 25 | 25 | 25 |
| Technology (Sec F) | 226 | 226 | 25 |

### Section Concentration of Top Performers

| Section | Analyze | Evaluate | Notes |
|---------|---------|----------|-------|
| D/BD (Pack D, Budgeting) | 5 | 6 | Highest concentration of quality items |
| D/ED (Pack D, COSO) | 10 | 2 | Best COSO cause-effect analysis |
| A/F (Pack A, Technology) | 3 | 11 | Gold standard for Evaluate |
| B/F (Pack B, Technology) | 1 | 5 | Gold standard for Evaluate |
| A/B (Pack A, Budgeting) | 2 | 7 | Strong trade-off scenarios |

---

*Generated: 2026-07-31 | S122 Phase 1 | Read-Only Research*
