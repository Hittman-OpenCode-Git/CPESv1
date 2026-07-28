const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const rhPath = path.join(root, 'knowledge', 'REVISION_HISTORY.md');

const entry = `## Session 306 — Unified Item Quality Score & Portfolio Prioritization Engine (2026-07-26)

**Type:** Spec/Analysis — No Pack Content Changes. 300-series analysis session. Pre-flight: governance guard 20/20 PASS, all 13 runtime-critical hashes verified, 5 pack hashes drifted (S718/S719 metadata sessions, no REVISION_HISTORY entries yet — parse integrity confirmed, certified count stable at 2,181). Post-flight: governance guard 20/20 PASS, all pack hashes stable — zero drift.

**Scope:** Full portfolio analysis across 2,500 MCQ items (5 packs) and 400 case-bank items (5 scored_cases files). 2,900 total items scored with new Unified Item Quality Score (UIQS). Single-script A-Z pipeline implementing 26-agent-equivalent analysis.

**Key findings:**

| Metric | Value |
|--------|-------|
| Portfolio Avg UIQS | 68.8 (Grade C) |
| MCQ Avg UIQS | 68.7 |
| Case Avg UIQS | 69.7 |
| Grade Distribution | A:170 B:1,431 C:939 D:313 F:47 |
| P0 Immediate Rewrite | 46 items |
| P1 High Priority | 583 items |
| Certification Debt | 358 uncertified items |
| EW Debt (<30% fill) | 539 items |

**Domain Rankings:**
1. Domain C: UIQS 74.1 (A) — 930 items, 98.3% cert, 4 P0
2. Domain B: UIQS 71.3 (B) — 569 items, 98.9% cert, 0 P0
3. Domain A: UIQS 70.3 (B) — 457 items, 98.2% cert, 3 P0
4. Domain D: UIQS 70.1 (B) — 454 items, 98.7% cert, 2 P0
5. Domain E: UIQS 62.5 (C) — 446 items, 59.7% cert, 29 P0
6. Domain F: UIQS 62.4 (C) — 44 items, 65.2% cert, 8 P0

**UIQS Formula:** 0.25×CertMaturity + 0.25×ExplanationQuality + 0.20×DistractorQuality + 0.10×BlueprintImportance + 0.10×ExhibitQuality + 0.10×LearningValue

**Strategy:** HYBRID — Certify E/F blocks (with EW authoring) + standalone EW remediation for certified P0 items (Pack C DL-008 cluster). Sequencing: Wave 1 (Domain E cert + Pack C EW), Wave 2 (Domain F cert + Pack A EW), Wave 3 (Pack D cert + remaining EW debt).

**Deliverables:** 9 JSON reports in reports/ + SESSION306_SESSION_SUMMARY.md. Engine: scripts/s306_uiqs_engine.js.

**Files NOT changed:** All pack files, case banks, app.js, may-core.js, may-learner-state.js, index_updated.html, styles.css.

**Governance attestation:**
- No pack/case/scoring/certification/answer-key changes
- All pack hashes stable (post-flight MATCH)
- Governance guard: 20/20 PASS
- 300-series lane — read-only
- UIQS: auditable, deterministic, reproducible

**Recommended next: S307 — remediation sequencing from Top 100**

---

`;

const existing = fs.readFileSync(rhPath, 'utf8');
fs.writeFileSync(rhPath, entry + existing, 'utf8');
console.log('REVISION_HISTORY.md updated. New size:', fs.statSync(rhPath).size, 'bytes');
