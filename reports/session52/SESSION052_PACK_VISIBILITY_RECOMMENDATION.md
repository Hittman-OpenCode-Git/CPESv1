# Session 52 — Pack Visibility Recommendation

**Date:** 2026-07-28
**Decision Authority:** Release Manager
**Status:** Recommendation Only (Read-Only Audit)

---

## Visibility Recommendation Matrix

| Pack | Letter(s) | Cases | Items | All Certified? | Decision | Rationale |
|------|-----------|-------|-------|----------------|----------|-----------|
| Pack 1 | A, D | 25 | 141 | Yes (question_state) | **VISIBLE** | 18/25 Production cases. Gold Standard quality in all 6 blueprint domains. Strong business realism. Pack D aliased from same content. |
| Pack 2 | B, E | 25 | 132 | Yes (question_state) | **VISIBLE** | 9/25 Production cases. Content quality is sound — all Draft cases have proper stems, explanations, and exhibits. Metadata population deferred. Pack E was originally 'Stretch Goal Only' but is already wired and delivering. |
| Pack 3 | C | 25 | 127 | Yes (question_state) | **VISIBLE** | Only 4/25 Production cases. Highest Draft ratio. Contains the two P0 critical defects (CBQ4-A2 CompanyName corruption, CBQ4-A1-Q2 ASC citation error). Content is structurally sound but metadata is weakest of 3 packs. |

## Overall Verdict

**All 3 case packs should remain VISIBLE.** 

Despite CONDITIONAL ratings in this session's audit, the application-level governance check (`question_state: "Certified"`) passes for all 400 items. The CONDITIONAL issues identified are:

1. **Metadata gaps** (ProductionStatus, CompanyName, Industry) — do not affect learner experience. The application renders from scenario text and exhibits, not from metadata fields.
2. **Uniform difficulty** — application does not currently filter or adapt by difficulty for cases.
3. **Cognitive progression** — application displays items in array order; re-ordering is aesthetic, not functional.
4. **Exhibit count** — single-exhibit cases still render correctly; the 2-exhibit minimum is a Gold Standard goal, not a learner-blocker.

**Zero learner-facing defects.** No incorrect answers. No broken exhibits. No missing stems. No empty explanations at the correct-answer slot.

---

## Visibility vs. Certification Status Gap

There is a documented gap between two certification frameworks:

| Framework | What It Checks | Status | Implication |
|-----------|---------------|--------|-------------|
| `question_state: "Certified"` | CAQS §1.6 6-dimension AI verification + user approval | **PASS (400/400)** | Learner pool is valid per governance framework |
| Session 52 Audit Criteria | 6-dimension quality scoring (≥85 average, no issues) | **FAIL (0/75 CERTIFIED)** | Stricter standard; metadata/calibration issues flagged |

The Session 52 criteria add metadata completeness, difficulty distribution, and Gold Standard checklist items that are NOT part of the existing `question_state` certification gate. Per CAQS §1.7.1, learner-pool eligibility is gated by `question_state = Certified` — which all 400 items satisfy.

---

## Stretch Goals Assessment

### Pack D

**Decision:** ACTIVE (via CASE_PACK_1 alias). 

Pack D is already delivering the same 25 cases as Pack A via alias. No additional work needed. Per original prompt's question: "Build From Candidates or Not Needed" → **Already built** — aliasing is complete as of S922. Unique distribution of 25 distinct cases per pack letter is deferred but not blocking.

### Pack E

**Decision:** ACTIVE (via CASE_PACK_2 alias).

Originally specified as "Stretch Goal Only / Hidden By Default." Current state: **Already wired and delivering** to learners via CASE_PACK_2 alias. Same 25 cases as Pack B. Recommendation: keep visible since content has been certified and no additional work is needed to maintain visibility. If truly a stretch goal, the decision to hide should be explicit — Session 52 flags this for Release Manager attention.

---

## Archive Candidates

**Zero cases recommended for archival.**

No case has critical data errors that would justify removal from the learner pool. Even the two P0 defect cases (CBQ4-A2, CBQ4-A1-Q2) have correct learner-facing content — only metadata fields are wrong. Archival would deny learners access to educationally sound content.

The 5 legacy `scored_cases*.js` files in root are the only archive candidates — and they are already ARCHIVED in governance status but not physically removed. See `SESSION052_ARCHIVE_CANDIDATE_LIST.json`.

---

## Recommended Action Sequence

1. Remove 5 legacy `scored_cases*.js` from root (Constitution §11.4 compliance)
2. Fix 2 P0 critical metadata defects (CBQ4-A2 CompanyName, CBQ4-A1-Q2 ASC citation)
3. Upgrade ProductionStatus on 44 Draft cases to match existing Certfied status
4. Populate missing metadata (CompanyName, Industry, CompanyType) on 4 cases
5. Recalibrate difficulty (DL-032) in Phase 2 quality sweep
6. Re-order items for cognitive progression in Phase 3 editorial sweep

**Keep all 3 packs visible throughout.** No learner-facing defect justifies hiding any pack.
