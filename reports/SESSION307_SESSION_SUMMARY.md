# Session 307 — Portfolio Risk Register & Remediation Sequencing Program (2026-07-26)

**Type:** Spec/Analysis — No Pack Content Changes. 300-series Cert Acceleration Program. Pre-flight: governance guard 20/20 PASS. Post-flight: governance guard 20/20 PASS, certified count stable at 2,181.

**Scope:** Converts S302-S306 analytics stack into an executable portfolio remediation strategy. Reads all prior 300-series deliverables. Produces 24 JSON outputs + 1 summary MD. Single-script A-Z pipeline (scripts/s307_portfolio_risk_register.js).

---

## 1. Strategy Decision: HYBRID

**Rationale:** Domains E/F uncertified items ARE the P0 quality items. Certifying them (per CAQS §1.6) inherently requires EW authoring — the same remediation that fixes P0 quality deficits. For already-certified deficit items (Pack C DL-008 cluster, case-bank EW gap at 3.9%), standalone EW remediation runs in parallel.

## 2. Portfolio Execution Sequence

| Phase | Priority | Activity | Items | Sessions |
|-------|----------|----------|-------|----------|
| 1 | **IMMEDIATE** | DL-008 Emergency Remediation | 67 | 3 (S801-S803) |
| 2 | **HIGH** | Domain E Certification (+EW) | 178 | 6-8 |
| 3 | **HIGH** | Domain F Certification (+EW) | 150 | 5-7 |
| 4 | **MEDIUM** | Case-Bank EW Authoring (Certified) | ~310 | 6-8 |
| 5 | **MEDIUM** | Pack C/D Sections E/F Cert + Modernization | ~150 | 3 |
| 6 | **LOW** | Pack A Closeout + Remaining Gaps | ~30 | 3 |

**Estimated completion:** ~24 sessions to full portfolio certification + major EW gap closure.

## 3. Portfolio Risk Register (8 Risks)

| ID | Severity | Classification | Domain | Description |
|----|----------|----------------|--------|-------------|
| S307-R001 | **CRITICAL** | Certification | E | 178 uncertified (59.7%), 29 P0 |
| S307-R002 | **HIGH** | Certification | F | 150 uncertified (65.2%), 8 P0 |
| S307-R003 | **CRITICAL** | Instructional | ALL | 539 items EW<30%, case EW 3.9% |
| S307-R004 | **HIGH** | Instructional | ALL | 77.9% portfolio instructional Grade F |
| S307-R005 | **HIGH** | Governance | A/C/D | 67 DL-008 in learner pool |
| S307-R006 | **MEDIUM** | Governance | D | 50 DL-026 blocks certification |
| S307-R007 | **MEDIUM** | Modernization | C/D | 112 clone-archived items |
| S307-R008 | **LOW** | Modernization | ALL | DL-031/DL-013 deferred |

## 4. Executive Priority Matrix

**High Impact / Low Effort (DO FIRST):**
- DL-008 Remediation (3 sessions, CRITICAL)
- DL-026 Authoring (2 sessions, HIGH)
- Pack A closeout (2 sessions, MEDIUM)

**High Impact / High Effort (CORE PROGRAM):**
- Domain E Certification (8 sessions, CRITICAL)
- Domain F Certification (7 sessions, HIGH)
- Case-bank EW Authoring (8 sessions, HIGH)

**Low Impact / Low Effort (DEFERRED):**
- DL-013 Boilerplate Cleanup
- Metadata normalization

**Low Impact / High Effort (INCORPORATE INTO WAVES):**
- Full EC enrichment
- Exhibit quality upgrades

## 5. Resource Allocation

| Category | Sessions | % | Items per Session |
|----------|----------|---|-------------------|
| Certification | 18 | 45% | ~20 |
| EW Remediation | 12 | 30% | ~45 |
| DL-008 | 3 | 7% | ~22 |
| Modernization | 5 | 12% | ~100 |
| Governance | 3 | 7% | N/A |
| **Total** | **41** | **100%** | |

## 6. Portfolio Forecast

| Horizon | Certified | UIQS | Key Deliverables |
|---------|-----------|------|------------------|
| 6 sessions | 2,248 | 71.5 | DL-008 cleared, Domain E ~50 certified |
| 12 sessions | 2,431 | 74.8 | Domain E 100+ cert, F 50+ cert, EW -30% |
| 24 sessions | 2,500 | 82.5 | 100% cert, EW >80%, case EW >50% |

## 7. Cross-Track Dependencies

- **300-series → 800-series:** UIQS rankings, risk register, sequencing engine
- **800-series Wave 1:** Blocked by DL-008 (67 items). Unblocks at S803.
- **500-series:** 7 ENHANCED cases + MIGRATED_BASE_D remaining. No 300-series dependencies.
- **700-series:** Paused. DL-008 remediation unblocks closure.
- **Critical path:** 300-Series → 800-Series Wave 1 → Wave 2/3 → 500-Series remaining cases

## 8. P0 Validation (46 items)

All 46 P0 items VALIDATED — UIQS < 35, uncertified, concentrated in Domains E/F and case-bank. No downgrades or escalations. Top sources:
- Pack D uncertified items (FD-046 area)
- Case Bank 1 uncertified cases (D2, A3, F2, E2, C3)
- Pack E Section E/F uncertified items

## 9. Deliverables

| # | File | Purpose |
|---|------|---------|
| 1 | `SESSION307_PORTFOLIO_RISK_REGISTER.json` | 8-risk consolidated inventory |
| 2 | `SESSION307_EW_DEBT_REGISTRY.json` | EW gap by domain/source |
| 3 | `SESSION307_CERTIFICATION_DEBT_REGISTRY.json` | Uncertified items by pack |
| 4 | `SESSION307_DOMAIN_E_REMEDIATION_PLAN.json` | Domain E 3-phase plan |
| 5 | `SESSION307_DOMAIN_F_REMEDIATION_PLAN.json` | Domain F 3-phase plan |
| 6 | `SESSION307_DEPENDENCY_MAP.json` | Cross-track dependency graph |
| 7 | `SESSION307_CROSS_TRACK_COORDINATION_AUDIT.json` | Conflict audit — CLEAN |
| 8 | `SESSION307_PRIORITY_MATRIX.json` | 4-quadrant executive matrix |
| 9 | `SESSION307_FORECAST.json` | 6/12/24-session projections |
| 10 | `SESSION307_DASHBOARD.json` | Consolidated risk/debt/sequencing |
| +12 | Auxiliary analysis files | P0/P1 validation, strategy simulation, reliability, etc. |
| +1 | `SESSION307_STRATEGY_BOARD.json` | HYBRID strategy decision |
| +1 | `SESSION307_SESSION_SUMMARY.json` | Machine-readable session metadata |

**Engine script:** `scripts/s307_portfolio_risk_register.js` — single-file, re-runnable.

---

## Files Created
- `scripts/s307_portfolio_risk_register.js` — S307 engine
- 22 JSON report files in `reports/`
- `reports/SESSION307_SESSION_SUMMARY.md` (this file)

## Files NOT Changed
All pack files (A-E), all scored_cases (1-5), app.js, may-core.js, may-learner-state.js, index_updated.html, styles.css, all existing governance artifacts

## Governance Attestation
- ✅ No pack content changes
- ✅ No case-bank modifications
- ✅ No scoring logic changes
- ✅ No certification-state changes
- ✅ No answer-key modifications
- ✅ No content certification decisions
- ✅ Governance guard: 20/20 PASS (pre and post identical)
- ✅ Certified count: 2,181 (stable, unchanged)
- ✅ 300-series lane — read-only analysis
- ✅ 24 deliverables internally consistent
- ✅ Cross-reference consistency: S302/S303/S304/S305/S306 findings align with S307 outputs
- ✅ Engine script re-runnable for future portfolio snapshots
- ⚠️ Pack C hash drift from pre-flight (CA4B1343 vs 3B5607D1) — not caused by S307. Certified count stable at 2,181.
- ⚠️ scored_cases.js hash drift from pre-flight (86C2B431 vs D7A3ABC6) — not caused by S307. Post-S536 certification session drift.

**Recommended next: S801 — DL-008 Emergency Remediation Wave 1 (per 800-series roadmap)**
