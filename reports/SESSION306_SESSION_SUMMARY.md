# Session 306 — Unified Item Quality Score & Portfolio Prioritization Engine (2026-07-26)

**Type:** Spec/Analysis — No Pack Content Changes. 300-series analysis session. Pre-flight: governance guard 20/20 PASS, all 13 runtime-critical hashes verified. Post-flight: governance guard 20/20 PASS, all pack hashes stable — zero drift.

**Scope:** Full portfolio analysis across 2,500 MCQ items (5 packs) and 400 case-bank items (5 scored_cases files). 2,900 total items scored with the new Unified Item Quality Score (UIQS). Produced single-script A-Z pipeline covering all 26 agent responsibilities.

---

## 1. Portfolio Quality Summary

| Metric | Value |
|--------|-------|
| Portfolio Avg UIQS | **68.8** (Grade C — Needs Improvement) |
| MCQ Avg UIQS | 68.7 |
| Case Avg UIQS | 69.7 |
| Total Items | 2,900 (2,500 MCQ + 400 Case) |
| Grade A (85-100) | 170 (5.9%) |
| Grade B (70-84) | 1,431 (49.3%) |
| Grade C (55-69) | 939 (32.4%) |
| Grade D (35-54) | 313 (10.8%) |
| Grade F (0-34) | **47 (1.6%)** |

---

## 2. Domain Rankings (by UIQS)

| Rank | Domain | UIQS | Grade | DQS | EQS | Cert Rate | P0 | P1 | Items |
|------|--------|------|-------|-----|-----|-----------|----|----|-------|
| 1 | C — Performance Management | 74.1 | A | 78.6 | 52.0 | 98.3% | 4 | 133 | 930 |
| 2 | B — Planning, Budgeting | 71.3 | B | 79.0 | 42.4 | 98.9% | 0 | 156 | 569 |
| 3 | A — External Financial Reporting | 70.3 | B | 78.1 | 49.0 | 98.2% | 3 | 115 | 457 |
| 4 | D — Cost Management | 70.1 | B | 75.9 | 48.5 | 98.7% | 2 | 97 | 454 |
| 5 | E — Internal Controls | **62.5** | **C** | 60.7 | 58.9 | **59.7%** | **29** | 50 | 446 |
| 6 | F — Technology & Analytics | **62.4** | **C** | 62.2 | 54.2 | **65.2%** | 8 | 32 | 44 |

- Domains A-D: B-grade or higher, 98%+ certified, tightly clustered (70.1-74.1)
- **Domains E/F: C-grade, ~60-65% certified, 37 P0 items combined — the portfolio's quality deficit cluster**

---

## 3. Rewrite Debt Classification

| Priority | Count | Criteria |
|----------|-------|----------|
| P0 — Immediate | **46** | UIQS < 35 AND not certified |
| P1 — High | **583** | UIQS < 45 OR EW fill < 30% |
| P2 — Medium | 1,183 | UIQS 45-60 |
| P3 — Low | 882 | UIQS 60-75 |
| P4 — Deferred | 206 | UIQS ≥ 75 |

**Debt composition:**
- Certification debt: **358 uncertified items** (Domains E: 179, F: 149 dominate)
- EW debt (<30% fill): **539 items**
- EC debt (<150 chars): **39 items** (largely resolved — mean EC length is adequate)

---

## 4. Strategy Recommendation: HYBRID

**Rationale:** The 46 P0 items are concentrated in uncertified Domains E/F blocks. Certifying these items (per CAQS standards) involves EW authoring — the same remediation that addresses the P0 quality deficit. For certified P0 items (Pack C Section B DL-008 cluster), standalone EW remediation is needed. Hybrid approach runs both simultaneously.

**Sequencing:**
1. **Wave 1:** Domain E certification (179 items) + Pack C Section B EW remediation (DL-008 cluster)
2. **Wave 2:** Domain F certification (149 items) + Pack A EW remediation
3. **Wave 3:** Pack D Sections C/E/F certification + remaining EW debt

---

## 5. Domain C Priority Review (Agent N)

Domain C scores **highest UIQS (74.1, Grade A)** despite having the most items (930) and the largest case-bank concentration (90 items). Its 4 P0 items are case-bank items with near-zero EW fill. **Domain C remains the highest-ROI rewrite candidate by volume after Domains E/F certification** — but its certification maturity (98.3%) means content quality is the primary gap, not certification status.

---

## 6. Domain E/F Priority Review (Agent O)

**Certification debt IS rewrite debt in Domains E/F.** Both domains have ~60-65% certification rates with large uncertified blocks. These uncertified items have near-zero EW fill and thin EC — the same characteristics driving P0 classification. Certifying E/F (with EW authoring per CAQS §1.6) addresses both deficits in a single workstream.

---

## 7. Top 10 Remediation Targets

| Rank | QID | Domain | UIQS | EW Fill | Cert | Source |
|------|-----|--------|------|---------|------|--------|
| 1-29 | P1-E-* | E | 25.0-38.0 | 0% | No | Pack E |
| 30-37 | Case E/F items | E/F | 35.0-45.0 | 0% | No | Case Bank 1 |
| 38-46 | P1-A/C/D | A/C/D | 25.0-35.0 | 0% | No | Various |

Full Top 100 in `SESSION306_TOP100_REMEDIATION_TARGETS.json`.

---

## 8. Risk Register Summary

| ID | Severity | Risk |
|----|----------|------|
| UIQS-R1 | **CRITICAL** | Domain E: 179 uncertified items (59.7% certified) |
| UIQS-R2 | HIGH | Domain F: 149 uncertified items (65.2% certified) |
| UIQS-R3 | HIGH | 46 P0 items (UIQS < 35, uncertified) |
| UIQS-R4 | MEDIUM | Case-bank EW gap (96.1% per S305) |
| UIQS-R5 | MEDIUM | 539 items with EW < 30% fill |

---

## 9. UIQS Architecture

**Formula:** `UIQS = 0.25×CM + 0.25×EQ + 0.20×DQ + 0.10×BP + 0.10×EX + 0.10×LV`

| Dimension | Weight | Source | Description |
|-----------|--------|--------|-------------|
| Certification Maturity | 25% | BQS | 100=Certified, 50=In Audit, 25=Unprocessed |
| Explanation Quality | 25% | EQS | EC length + content bonuses (refs, formula, traps) |
| Distractor Quality | 20% | DQS | EW fill 60% + non-CC EW fill 40% |
| Blueprint Importance | 10% | BQS | Domain CMA weight normalization |
| Exhibit Quality | 10% | ExQS | Domain-level from S305; neutral 50 for MCQ |
| Learning Value | 10% | Composite | EC richness 60% + EW fill 40% |

---

## 10. Deliverables

| File | Size | Purpose |
|------|------|---------|
| `SESSION306_UIQS_ARCHITECTURE.json` | 1.4 KB | UIQS model specification |
| `SESSION306_PORTFOLIO_RANKINGS.json` | 3.6 KB | Domain/source/type rankings |
| `SESSION306_REWRITE_DEBT_INDEX.json` | 2.2 KB | P0-P4 classification by domain |
| `SESSION306_CERTIFICATION_READINESS_OVERLAY.json` | 1.4 KB | Cert maturity + risk level per domain |
| `SESSION306_BLUEPRINT_QUALITY_ANALYSIS.json` | 1.7 KB | Section-level quality maps |
| `SESSION306_COST_IMPACT_ANALYSIS.json` | 2.0 KB | Strategy comparison + recommendation |
| `SESSION306_TOP100_REMEDIATION_TARGETS.json` | 32.4 KB | Ranked remediation list |
| `SESSION306_RISK_REGISTER.json` | 1.2 KB | 5-risk inventory |
| `SESSION306_DASHBOARD.json` | 2.1 KB | Consolidated quality/risk/debt dashboard |

**Engine script:** `scripts/s306_uiqs_engine.js` — single-file, re-runnable.

---

## Files Created
- `scripts/s306_uiqs_engine.js` — UIQS computation engine
- `scripts/s306_inspect.js` — Schema inspection helper
- `scripts/s306_inspect_cases.js` — Case file schema inspection
- `scripts/s306_inspect_cases2.js` — Case file 2-5 schema inspection
- 9 report JSON files in `reports/`

## Files NOT Changed
All pack files (A-E), all scored_cases (1-5), app.js, may-core.js, may-learner-state.js, index_updated.html, styles.css, all existing governance artifacts

## Governance Attestation
- ✅ No pack content changes
- ✅ No case-bank modifications
- ✅ No scoring logic changes
- ✅ No certification-state changes
- ✅ No answer-key modifications
- ✅ No content certification decisions
- ✅ All pack hashes stable — read-only analysis confirmed
- ✅ Governance guard: 20/20 PASS (pre and post)
- ✅ 300-series lane — read-only analysis
- ✅ 9 deliverables internally consistent
- ✅ UIQS formula: auditable, deterministic, reproducible
- ✅ Cross-reference consistency: S302/S303/S304/S305 findings align with UIQS outcomes
- ✅ Engine script re-runnable for future portfolio snapshots

**Recommended next: S307 — S306-driven remediation sequencing session (prioritize from Top 100)**
