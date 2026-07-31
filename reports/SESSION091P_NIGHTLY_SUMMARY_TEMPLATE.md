# Session 91P — Nightly Summary Template

**Session:** 91P | **Lane:** Governance Light | **Date:** 2026-07-30
**Purpose:** Consistent, structured summary produced after each nightly test analysis session.
**Use:** Fill in after collecting test feedback and running the feedback validator. Append new summaries below.

---

## Summary Template

```markdown
# Nightly Test Summary — YYYY-MM-DD

**Prepared:** YYYY-MM-DD HH:MM
**Analyzed By:**
**Feedback Files:** (list of NIGHTLY_FEEDBACK_YYYY-MM-DD.md files analyzed)

---

## 1. Session Overview

| Metric | Value |
|--------|-------|
| Test sessions run | |
| Testers | |
| Total scenarios executed | |
| Total checks passed | |
| Total checks failed | |
| New issues discovered | |
| Previously known issues reproduced | |
| Issues resolved since last nightly | |
| Total open USAB entries | |

---

## 2. Scenario Results

| Scenario | Tester | Pass/Fail | Issues Found | Notes |
|----------|--------|-----------|--------------|-------|
| 15-MCQ Sanity Run | | | | |
| 50-MCQ Timing Run | | | | |
| 100-MCQ Full Exam | | | | |
| Case Study Validation | | | | |
| May Coaching Walkthrough | | | | |

---

## 3. Telemetry Snapshot

(If MayTelemetry was active during any test session)

| Metric | Value |
|--------|-------|
| Total events captured | |
| Decision events | |
| Mode invocations | |
| Readiness assessments | |
| Recommendations generated | |
| Interventions triggered | |
| Buffer status | (OK / overflowed) |

---

## 4. New Issues Logged

| USAB-ID | Category | Severity | Description (1 line) |
|---------|----------|----------|----------------------|
| | | | |
| | | | |
| | | | |

---

## 5. Resolved This Nightly

| USAB-ID | Resolution | Fixed By |
|---------|------------|----------|
| | | |

---

## 6. Issue Trends

| Metric | This Night | Last Night | Trend |
|--------|-----------|------------|-------|
| Total open issues | | | |
| S1 Critical open | | | |
| S2 High open | | | |
| S3 Medium open | | | |
| New issues rate (per session) | | | |
| Resolution rate (per session) | | | |

---

## 7. Top Observations

1. 
2. 
3. 

---

## 8. Recommendations

### Immediate (before next nightly)

1. 
2. 

### Next Session

1. 
2. 

### Backlog

1. 
2. 

---

## 9. Governance Verification

| Check | Result |
|-------|--------|
| No pack file modifications | PASS / FAIL |
| No case file modifications | PASS / FAIL |
| No certification changes | PASS / FAIL |
| No May logic changes | PASS / FAIL |
| Preflight PASS (if run) | PASS / FAIL / N/A |
| feedback_validator.js PASS | PASS / FAIL |

---

## 10. Overall Verdict

**Status:** (GREEN — All Clear / YELLOW — Issues Found, Non-Blocking / RED — Blocking Issues)

**Summary:** (1-2 sentences)

---

## 11. Next Nightly Target

- **Date:** YYYY-MM-DD
- **Scenarios to run:**
- **Specific areas to watch:**
```

---

## Archive: Past Nightly Summaries

*Completed nightly summaries are appended below.*

### Nightly Test Summary — (template — not yet run)

*First nightly summary will be written after the first test feedback cycle completes.*

---

## How to Use This Template

1. **Collect feedback:** Gather all completed `NIGHTLY_FEEDBACK_YYYY-MM-DD.md` files from testers.
2. **Run validator:** Execute `node scripts/nightly_feedback_validator.js` to verify completeness.
3. **Fill summary:** Copy the template block above and populate with data.
4. **Update registry:** Add new USAB entries to `SESSION091P_USABILITY_REGISTRY.md`.
5. **Update severity:** Use `SESSION091P_ISSUE_SEVERITY_MATRIX.md` to classify new findings.
6. **Close resolved:** Update USAB entries that were fixed since the last nightly.
7. **Append below:** Paste the completed summary into the Archive section above.
