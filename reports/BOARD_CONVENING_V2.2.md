# Board Convening — V2.2 Goal Setting

**Date:** 2026-10-20
**Trigger:** V2.1 released (660/660 P2 items Certified, G7 APPROVED, tag v2.1.0)
**Status:** V2.1 COMPLETE — all content live, active, and accurate

---

## V2.1 Accomplishments (Baseline)

| Metric | V2.0.0 | V2.1.0 | Delta |
|--------|--------|--------|-------|
| P2 case items Certified | 0 | 660 | +660 |
| P1 case items Certified | 425 | 425 | 0 |
| P1 MCQ items Certified | 3,070 | 3,070 | 0 |
| Screen-debt genuine inversions | 129 FLAG | 0 | -129 |
| Blind-verified items | 0 | 660 | +660 |
| Governance guard rules | 21 | 21 | 0 |
| Tend gates | 6 | 8 | +2 |
| Release plan | None | v1.0 written | +1 |
| Scan-boundary doctrine | Implicit | Codified | +1 |

---

## V2.2 — What Remains to Polish

### Category A: Editor Backlog (Content Quality — Non-Blocking for V2.1)

| # | Item | Count | Severity | Owner | Effort |
|---|------|-------|----------|-------|--------|
| A1 | P1 short-explanation items (<150 chars) | 24 | WARN | Editor | ~2-3 hrs |
| A2 | CBQ21-B5-Q1 schema drift (Explanation references Choice A/C/D on numeric item) | 1 | WARN | Editor | 15 min |
| A4 | Learning science standards (CAQS 11) — retrieval practice, error correction, worked examples, transfer learning | 660 P2 items | Recommended | Editor | ~1 week |
| A5 | Anti-AI writing standards (CAQS 3.8) — ensure all scenarios use business language | 190 cases | Recommended | Editor + Case Author | ~1 week |
| A6 | Realism standards (CAQS 3.7) — verify all cases pass 6-item realism checklist | 190 cases | Recommended | Case Author | ~3 days |

### Category B: Portfolio/Authoring Gaps (G2 WARN — Non-Blocking)

| # | Item | Count | Severity | Owner | Effort |
|---|------|-------|----------|-------|--------|
| B1 | P2-E Remember (3.2% vs 10% target) | ~11 items needed | WARN | Author | ~3 days |
| B2 | P2-D Apply (23.6% vs 45% target) | ~22 items needed | WARN | Author | ~1 week |
| B3 | 55 cognitive floor/ceiling mismatches (DL-P2-015) | 55 items | WARN | Psychometrician | ~2 days |
| B4 | 7,108 distractor-similarity WARNs | Portfolio-wide | WARN | Author | Ongoing |
| B5 | 68 REVIEW semantic-screen flags | 68 items | WARN | Accountant (hand-solve) | ~3 days |
| B6 | 1 acknowledged rotation-clone (CBQ21-F3-Q4 == CBQ22-F1-Q5) | 1 item | WARN | Human review | 30 min |

### Category C: Technical Polish (Non-Blocking for Content)

| # | Item | Status | Owner | Effort |
|---|------|--------|-------|--------|
| C1 | Runtime governance checkpoints (Tmid) for sessions >30 min | Not implemented | JavaScript Architect | ~2 days |
| C2 | Real browser P2 activation in smoke test (DL-073 follow-up) | Deferred | JavaScript Architect | ~1 day |
| C3 | Normalized-stem hash in clone gate (DL-074 follow-up, A-03) | Deferred | JavaScript Architect | ~1 day |
| C4 | Adaptive testing support (DifficultyScore, CognitiveLevel, EstimatedMinutes) | Schema exists, algorithm not implemented | JavaScript Architect | ~1 week |
| C5 | Analytics instrumentation (AverageTime, CorrectPercentage, DiscriminationIndex) | Schema exists, not populated | JavaScript Architect | ~1 week |
| C6 | LMS integration (SCORM/xAPI) | Not started | JavaScript Architect | ~2 weeks |
| C7 | Database export (relational/document DB) | Schema designed, not implemented | JavaScript Architect | ~1 week |

### Category D: Part 1 Content (Maintenance)

| # | Item | Status | Owner | Effort |
|---|------|--------|-------|--------|
| D1 | P1 MCQ packs (5 packs, 3,070 items) blind-verified | Not yet done | Accountant (blind subagent) | ~1 week |
| D2 | P1 case banks (3 packs, 425 items) blind-verified | Not yet done | Accountant (blind subagent) | ~3 days |
| D3 | P1 short-explanation items (24 in P1 case banks) | Identified, not repaired | Editor | ~1 day |

### Category E: Release Infrastructure (Governance)

| # | Item | Status | Owner | Effort |
|---|------|--------|-------|--------|
| E1 | G1-G7 sign-off matrix — all owners need to sign | G7 approved, G1-G6 have converged evidence | Release Manager | ~1 day |
| E2 | S121 portfolio audit run + within-target verification | Dashboard exists, needs formal run | Psychometrician | ~1 day |
| E3 | Third-party handoff (§18) — chunked parts for quarantined P2 cases | Protocol written, not executed | Release Manager | ~2 days |
| E4 | Versioned hash-stamped release artifact | RELEASE_PLAN v1.0 written, not executed | Release Manager | ~1 day |
| E5 | REVISION_HISTORY entry for V2.1 release | Partial (Goal 1 entry exists) | Release Manager | ~1 hour |

---

## Board Recommendation: V2.2 Goals (Priority Order)

### Goal 1 — Close Editor Backlog (Category A)
**Priority:** HIGH | **Effort:** ~2 weeks | **Lane:** Governance Light

Repair all content quality issues identified in V2.1:
- Expand 24 P1 short-explanation items (A1)
- Fix CBQ21-B5-Q1 schema drift (A2)
- Apply learning science standards to 660 P2 items (A4) — retrieval practice, error correction, worked examples
- Verify Anti-AI writing standards (A5) and realism standards (A6)

**Governance:** Governance Light Lane (no pack content changes to answer keys; explanation-only edits). Backups recommended. REVISION_HISTORY entry for content changes.

### Goal 2 — Portfolio Authoring Wave (Category B)
**Priority:** HIGH | **Effort:** ~2 weeks | **Lane:** Full Governance

Author new content to close portfolio gaps (Rule 12 — author, never relabel):
- 11 new P2-E Remember items (B1)
- 22 new P2-D Apply items (B2)
- Resolve 55 cognitive floor/ceiling mismatches (B3) — review and adjust difficulty where needed
- Hand-solve 68 REVIEW semantic-screen flags (B5) — per DL-045, no auto-remediation
- Human review of 1 rotation-clone (B6)

**Governance:** Full Governance Lane. RULE 5 (≤30 items/wave), RULE 16 (cert stamps), RULE 22 (evidence basis), §9.2.1 Tend gate.

### Goal 3 — Release Infrastructure (Category E)
**Priority:** MEDIUM | **Effort:** ~1 week | **Lane:** Governance Light

Execute the release plan:
- Run S121 portfolio audit formally (E2)
- Collect G1-G7 sign-off signatures (E1)
- Execute §18 third-party handoff for quarantined P2 cases (E3)
- Generate versioned hash-stamped release artifact (E4)
- Complete REVISION_HISTORY entry for V2.1 (E5)

**Governance:** Governance Light Lane (documentation + tooling, no content changes).

### Goal 4 — Technical Polish (Category C) — DEFERRED to V2.3
**Priority:** LOW | **Effort:** ~4 weeks | **Lane:** Governance Light

- Runtime governance checkpoints (C1)
- Real browser P2 activation in smoke test (C2)
- Normalized-stem hash in clone gate (C3)
- Adaptive testing algorithm (C4)
- Analytics instrumentation (C5)
- LMS integration (C6)
- Database export (C7)

### Goal 5 — Part 1 Blind Verification (Category D) — DEFERRED to V2.3
**Priority:** LOW | **Effort:** ~2 weeks | **Lane:** Full Governance

- Blind-verify P1 MCQ packs (5 packs, 3,070 items) via keyless extraction + subagent solve
- Blind-verify P1 case banks (3 packs, 425 items)
- Repair 24 P1 short-explanation items

---

## Board Vote

| Goal | Priority | Effort | Lane | Vote |
|------|----------|--------|------|------|
| Goal 1 — Editor Backlog | HIGH | ~2 weeks | Light | Recommend APPROVE |
| Goal 2 — Portfolio Authoring Wave | HIGH | ~2 weeks | Full | Recommend APPROVE |
| Goal 3 — Release Infrastructure | MEDIUM | ~1 week | Light | Recommend APPROVE |
| Goal 4 — Technical Polish | LOW | ~4 weeks | Light | Recommend DEFER to V2.3 |
| Goal 5 — Part 1 Blind Verification | LOW | ~2 weeks | Full | Recommend DEFER to V2.3 |

## Sequencing (V2.2)

1. **Week 1-2:** Goal 1 (Editor Backlog) + Goal 3 (Release Infrastructure) — parallel, Light Lane
2. **Week 3-4:** Goal 2 (Portfolio Authoring Wave) — Full Lane, after Goal 1 explanations are repaired
3. **Week 5+:** Goal 4 + Goal 5 (deferred to V2.3)

## Governance Constraints (V2.2)

- All Full Governance Lane work: RULE 1, 5, 16, 22, §3 backups, §5 dual verification, §9.2.1 Tend gate
- All Governance Light Lane work: smoke test at Tend, preflight recommended
- No cognitive relabeling (Rule 12) — author new content for portfolio gaps
- No auto-remediation from screen output (DL-045)
- All closure claims must state tested population boundary (SCAN_BOUNDARY_DOCTRINE.md)
- All claims verified against raw file/line evidence (§5, §20.1)

## Definition of V2.2 Complete

V2.2 is complete when:
1. All 24 P1 short-explanation items expanded to 150+ chars
2. CBQ21-B5-Q1 schema drift fixed
3. 11 new P2-E Remember items authored and certified
4. 22 new P2-D Apply items authored and certified
5. 68 REVIEW semantic-screen flags adjudicated (DL-045)
6. G1-G7 sign-off matrix fully signed
7. S121 portfolio audit run and documented
8. Versioned hash-stamped release artifact generated
9. All Tend gates PASS (preflight, pipeline, probe:parity, case-screens, smoke, guard)
10. No new genuine key errors (blind verification on new content)
BOARD
echo "Board convening written"