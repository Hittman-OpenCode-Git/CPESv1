# MAY-018 Decision Distribution Report

**Session:** MAY-018 — Pilot Telemetry Review & Calibration
**Date:** 2026-07-31
**Governance Lane:** Light (read-only analysis)
**Phase:** Implementer — Telemetry Analysis

---

## 1. Data Source

Primary: `reports/MAY014_TELEMETRY.json` — 10 synthetic profiles (L1-L10)
Engine version: MAY014-1.0
Pipeline version: MAY006-1.0

**No real user telemetry exists yet** — the controlled pilot (MAY-017) was activated today. All analysis uses synthetic calibration profiles from MAY-014.

---

## 2. D1-D10 Decision Distribution

### 2.1 Trigger Frequency

| Decision | Count | % of Profiles | Mode | Priority | Profile(s) |
|----------|-------|---------------|------|----------|------------|
| **D1** | 1 | 10% | QUIZ | critical | D1 — Critical Remediation (score=42, band=Recovery needed) |
| **D2** | 1 | 10% | QUIZ | critical | D2 — Critical Weakness (Standard Costing, acc=46%) |
| **D3** | 1 | 10% | SOCRATIC | high | D3 — SOCRATIC Unstable Declining (Standard Costing, acc=50%) |
| **D4** | 1 | 10% | STUDY_PLAN | high | D4 — Exam Strategy (14 days, Developing) |
| **D5** | 2 | 20% | QUIZ | medium | D5 — Declining Trend (Revenue Recognition) + D7 profile captured |
| **D6** | 1 | 10% | QUIZ | medium | D6 — Emerging Weakness (Cash Flow Statement) |
| **D7** | 0 | **0%** | EXPLAIN | — | **NEVER TRIGGERED** |
| **D8** | 2 | 20% | EXPLAIN | low | D8 — Section Gap (3 sections) + L10 zero-data profile |
| **D9** | 1 | 10% | QUIZ | low | D9 — High Mastery (Budgeting Concepts, acc=93%) |
| **D10** | 0 | **0%** | EXPLAIN | — | **NEVER TRIGGERED (DEAD PATH)** |

### 2.2 Priority Distribution

| Priority | Count | % |
|----------|-------|---|
| critical | 2 | 20% |
| high | 2 | 20% |
| medium | 3 | 30% |
| low | 3 | 30% |

Priority distribution is balanced — all 4 levels are reachable.

### 2.3 Key Findings

#### Finding 1: D7 — Fragile Knowledge (EXPLAIN) Never Triggers
- **Severity:** Medium
- **Root cause:** D5 (declining trends) captures D7-suitable profiles first in the priority chain. The D7-intended profile (L7, "Fragile Knowledge") was captured by D5 because its Cost Behavior topic had a declining delta (-23%).
- **Impact:** EXPLAIN mode is under-utilized. Fragile knowledge (usable but unreliable) goes to QUIZ mode instead.
- **Calibration options:** See `MAY018_CALIBRATION_RECOMMENDATIONS.md`

#### Finding 2: D10 — Insufficient Data (EXPLAIN) Is Dead
- **Severity:** Medium
- **Root cause:** D8 triggers on `sectionsWithData < 4`, which catches the zero-data case (0 < 4 = true). D10 is never reached.
- **Evidence:** Profile L10 (0 sessions with data, score=0, band="Not enough data") triggered D8 with rationale "Section coverage is incomplete (0/6 sections with data)" — not D10's "More practice data is needed."
- **Impact:** The D10 fallback path is dead code. No practical impact since D8's action for 0-section profiles is functionally equivalent (EXPLAIN mode, exploratory action).
- **Calibration options:** Either add `sectionsWithData > 0` guard to D8 or move D10 before D8.

#### Finding 3: D1 Guard Works Correctly
- **Verification:** MAY-013 fix correctly excludes "Not enough data" band from D1. Profile L10 (score=0, band=Not enough data) did NOT trigger D1.
- **Status:** Calibration validated.

#### Finding 4: D5 Dominates Declining-Trend Profiles
- D5 triggered for 2/10 profiles (20%), including one profile (L7) that was designed for D7.
- D5's catch condition is broad: any topic in `profile.decliningTopics` triggers.
- D5 suggests QUIZ mode; D7 would suggest EXPLAIN mode — pedagogical difference matters.

#### Finding 5: D2 Secondary Action (D4) — Never Triggered in Test
- MAY-012 enhancement adds D4 as secondary action when exam ≤30 days + Developing/Recovery readiness.
- **Issue:** In MAY-014 test, the D2 profile (L2) had no exam plan (examPlan: false), so the secondary action was not tested.
- **Verification needed:** A profile with D2 + exam within 30 days should be added to test coverage.

#### Finding 6: D3 Calibration (MAY-014) — Working
- D3 now triggers on accuracy<60 + declining + >=5 attempts (no stability check).
- L3 profile triggered D3 with SOCRATIC mode as expected.
- **Status:** Calibration validated.

#### Finding 7: D9 Calibration (MAY-014) — Working
- D9 triggered for the high-mastery profile (L9, acc=93%, 14 attempts).
- **Status:** Calibration validated.

---

## 3. Decision-Mode Mapping

| Decision | Mode | Mode Purpose |
|----------|------|-------------|
| D1 | QUIZ | Remediation fundamentals |
| D2 | QUIZ | Critical weakness remediation |
| D3 | SOCRATIC | Systematic misunderstanding |
| D4 | STUDY_PLAN | Exam-focused review |
| D5 | QUIZ | Declining trend intervention |
| D6 | QUIZ | Emerging weakness practice |
| D7 | EXPLAIN | Fragile knowledge consolidation |
| D8 | EXPLAIN | Section coverage exploration |
| D9 | QUIZ | High-mastery challenge |
| D10 | EXPLAIN | Insufficient data fallback |

### Mode Frequency (by decision)

| Mode | Decision Count | % |
|------|---------------|----|
| QUIZ | 5 | 50% |
| EXPLAIN | 2 | 20% |
| SOCRATIC | 1 | 10% |
| STUDY_PLAN | 1 | 10% |
| MOTIVATE | 0 | 0% |
| EXAM_REVIEW | 0 | 0% |

---

## 4. Unexpected Decision Dominance

| Pattern | Severity | Detail |
|---------|----------|--------|
| QUIZ mode dominance | Informational | 50% of decisions route to QUIZ. This may reflect the profile mix (mostly weak/declining learners) rather than a bug. |
| D5 capturing D7 profiles | Medium | D5's `decliningTopics` array is checked before D7's tier-3 intervention check |
| D8 capturing D10 profile | Medium | Structural priority issue |
| EXPLAIN mode underused | Informational | Only D8 routes to EXPLAIN (with D7 and D10 unreachable) |
| MOTIVATE never triggered | By design | MOTIVATE is event-driven (not decision-driven) |
| EXAM_REVIEW never triggered | By design | EXAM_REVIEW is context-driven (post-session, exam briefing) |

---

## 5. Dead Paths and Rarely Triggered Paths

### 5.1 Dead Path: D10
- **Status:** Unreachable (shadowed by D8)
- **Fix priority:** P1
- **Impact:** Cosmetic — D8's behavior for zero-data profiles is functionally equivalent to D10

### 5.2 Dead Path: D7
- **Status:** Unreachable (captured by D5)
- **Fix priority:** P2
- **Impact:** Pedagogical — EXPLAIN mode should handle fragile knowledge, not QUIZ mode

### 5.3 Rare: D3 (10%)
- **Status:** Reachable but narrow — requires accuracy<60 + declining + >=5 attempts simultaneously
- **Fix priority:** None — appropriate filtering for SOCRATIC mode's intensive requirements

### 5.4 Rare: D4 (10%)
- **Status:** Reachable but narrow — requires exam plan + ≤30 days + Developing/Recovery readiness
- **Fix priority:** None — appropriate gating for exam-strategy mode

---

## 6. Recently Calibrated Decisions — Verification

### 6.1 D3 (MAY-014)
- **Change:** Removed stability<50 requirement
- **Verification:** D3 triggered for L3 profile (acc=50%, declining, 10 attempts) — PASS
- **No false positives:** Other profiles with accuracy<60 but stable/improving did not trigger D3 — PASS

### 6.2 D7 (MAY-014)
- **Status:** Never triggered — calibration did not fix reachability
- **Root cause:** Priority order issue, not threshold issue

### 6.3 D9 (MAY-014)
- **Change:** Accuracy guard unchanged (>=85%, >=6 attempts)
- **Verification:** D9 triggered for L9 (93%, 14 attempts) — PASS
- **No false positives:** Other profiles with high accuracy but <6 attempts or declining direction did not trigger D9 — PASS

---

## 7. Action-Dispatch Gap

The decision engine selects a mode, but the coaching router (`may-coaching-router.js`) dispatches based on **learner action**, not decision engine output. The orchestrator's `nextAction` is available as metadata but is not consumed by the router's action-to-mode mapping.

| Layer | Mode Selection Logic | Consumer |
|-------|---------------------|----------|
| Decision Engine | D1-D10 priority chain → coachingMode | `nextAction.coachingMode` |
| Coaching Router | Action-to-mode map (`ACTION_MODE_MAP`) | `route(action)` |
| Orchestrator | Both — decision + routerPayload | `orchestrate()` return |

**Finding:** The decision engine's coachingMode is available in the orchestrator's `nextAction` but the router currently selects mode by action mapping. The adaptive pipeline's decision output is not yet connected to the router's dispatch logic.

---

## 8. Recommendations

| ID | Recommendation | Priority | Target Session |
|----|---------------|----------|---------------|
| DEC-01 | Fix D10 dead path — add `sectionsWithData > 0` guard to D8 | P1 | MAY-019 |
| DEC-02 | Fix D7 reachability — narrow D5 to exclude tier-3 topics, or reorder | P2 | MAY-019 |
| DEC-03 | Test D2+D4 secondary action with exam-plan profile | P2 | MAY-019 |
| DEC-04 | Wire decision engine output into router dispatch | P3 | MAY-020+ |
| DEC-05 | Add synthetic profile achieving "Ready for focused review" | P3 | MAY-019 |
| DEC-06 | Add test profiles for MOTIVATE + EXAM_REVIEW trigger paths | P4 | MAY-020+ |
