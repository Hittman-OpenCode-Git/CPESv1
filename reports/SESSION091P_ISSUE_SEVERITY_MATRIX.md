# Session 91P — Issue Severity Matrix

**Session:** 91P | **Lane:** Governance Light | **Date:** 2026-07-30
**Purpose:** Consistent, objective severity classification for all usability issues.
**Use:** Reference when assigning severity to any USAB entry or test feedback finding.

---

## 1. Severity Levels

| Level | Label | Definition | Response Time |
|-------|-------|------------|---------------|
| **S1** | Critical | App crash, data loss, scoring error, blocked exam flow — prevents simulator use | Must fix before next nightly |
| **S2** | High | Major feature broken, significant degradation, learner confusion likely | Fix within 2 sessions |
| **S3** | Medium | Usability friction, confusing but not blocking, affects experience quality | Fix when convenient |
| **S4** | Low | Cosmetic, minor annoyance, edge case — does not impair core function | Backlog — no urgency |
| **S5** | Informational | Observation, suggestion, "nice to have" — not a defect | Optional enhancement |

---

## 2. Impact Dimensions

Score each issue across these dimensions to determine severity. The highest-scoring dimension sets the baseline; adjust up or down based on combined impact.

### 2.1 Functional Impact

| Score | Description |
|-------|-------------|
| 5 | Prevents simulator use — crash, blank screen, infinite loop |
| 4 | Blocks a core workflow — cannot start, submit, or review |
| 3 | Breaks a feature — timer, scoring, navigation degrades |
| 2 | Impairs but does not break — workaround exists |
| 1 | Cosmetic — no functional impact |

### 2.2 User Impact

| Score | Description |
|-------|-------------|
| 5 | All users affected, every session |
| 4 | Most users affected, common scenarios |
| 3 | Some users affected, specific scenarios |
| 2 | Few users affected, edge cases |
| 1 | No user impact (code/audit only) |

### 2.3 Learner-Safety Impact

| Score | Description |
|-------|-------------|
| 5 | Wrong answer shown as correct, learner taught incorrect material |
| 4 | Missing or misleading explanation could impair learning |
| 3 | UI confusion may lead to learner frustration |
| 2 | Minor distraction, no learning impact |
| 1 | No learner impact |

### 2.4 Recovery Difficulty

| Score | Description |
|-------|-------------|
| 5 | Irreversible — session lost, data lost, history corrupted |
| 4 | Hard to recover — requires localStorage clear or page reload |
| 3 | Moderate recovery — requires manual step |
| 2 | Easy recovery — refresh or re-click |
| 1 | Self-recovering |

---

## 3. Severity Decision Matrix

| Func | User | Safety | Recovery | → Severity |
|------|------|--------|----------|------------|
| 5 | — | — | — | **S1 Critical** |
| 4 | — | 5 | — | **S1 Critical** |
| 4 | 4+ | 4 | — | **S1 Critical** |
| 3 | 3+ | — | 4+ | **S2 High** |
| 3 | 3+ | 3 | — | **S2 High** |
| 2-3 | 3+ | 2 | 3 | **S3 Medium** |
| 2 | 3 | 2 | 2 | **S3 Medium** |
| 2 | 1-2 | 1-2 | 2 | **S4 Low** |
| 1 | 1-2 | 1 | 1 | **S5 Informational** |

---

## 4. Category-Specific Examples

### Scrolling

| Example | Severity |
|---------|----------|
| Scrollbar missing — content inaccessible | S1 Critical |
| Double scrollbar on main viewport | S3 Medium |
| Horizontal scroll on question stem | S3 Medium |
| Scroll position lost on navigation | S3 Medium |
| Minor scroll jank on long lists | S4 Low |

### Layout

| Example | Severity |
|---------|----------|
| Submit button off-screen, unreachable | S1 Critical |
| Content cut off at common viewport sizes | S2 High |
| Panels overlap, obscuring content | S2 High |
| Misaligned elements, whitespace gaps | S4 Low |
| Font size inconsistent between views | S5 Informational |

### Timer

| Example | Severity |
|---------|----------|
| Timer counts up instead of down | S1 Critical |
| Timer freezes permanently, cannot resume | S2 High |
| Auto-submit fires at wrong time | S2 High |
| Timer warning covers question text | S3 Medium |
| Timer bar and text out of sync | S4 Low |

### Rendering

| Example | Severity |
|---------|----------|
| Questions render blank (all items) | S1 Critical |
| Choices missing from specific questions | S2 High |
| Explanation renders garbled text | S2 High |
| Exhibits fail to load for a case | S2 High |
| Specific question has minor formatting issue | S4 Low |

### Session Flow

| Example | Severity |
|---------|----------|
| Cannot start any session | S1 Critical |
| Submit does nothing — cannot finish | S1 Critical |
| Session recovery fails after crash | S2 High |
| Navigating back loses all answers | S2 High |
| No submit confirmation (accidental submit) | S3 Medium |
| Navigator shows wrong question count | S3 Medium |
| History shows incorrect score | S3 Medium |

### May Coaching

| Example | Severity |
|---------|----------|
| May panel crashes the app | S1 Critical |
| May gives demonstrably wrong coaching advice | S2 High |
| "Review with May" link does nothing | S2 High |
| May panel renders off-screen | S3 Medium |
| May recommendations are generic, not personalized | S4 Low |
| May cards have minor text overflow | S4 Low |

### Theme

| Example | Severity |
|---------|----------|
| Dark mode renders text invisible (same as background) | S2 High |
| Theme toggle breaks and cannot switch back | S3 Medium |
| Some elements don't adapt to theme | S4 Low |
| Light/dark preference not persisted across sessions | S5 Informational |

### Performance

| Example | Severity |
|---------|----------|
| App unresponsive for >5 seconds on load | S2 High |
| Noticeable lag on every answer selection | S3 Medium |
| Slow render on 100-MCQ session | S4 Low |
| 38 script loads — theoretical load time concern | S5 Informational |

### Accessibility

| Example | Severity |
|---------|----------|
| Keyboard navigation completely broken | S2 High |
| Color-only information (e.g., red/green for correct/incorrect) | S3 Medium |
| Focus order is illogical | S3 Medium |
| Low contrast on specific UI elements | S4 Low |
| Alt text missing from decorative elements | S5 Informational |

---

## 5. Prioritization Rules

When ordering fixes, apply these rules in sequence:

1. **S1 Critical always first** — no exceptions. A crash blocks all testing.
2. **S2 High with learner-safety impact** — wrong information being shown to learners.
3. **S2 High with all-users impact** — common paths that degrade for everyone.
4. **S3 Medium with no workaround** — friction points with no escape route.
5. **S3 Medium with easy workaround** — can defer if workaround is documented.
6. **S4 Low in batches** — group by file (styles.css, app.js) for efficient fixes.
7. **S5 Informational** — review during planning sessions; promote or close.

---

## 6. Frequency Multiplier

Frequency adjusts effective severity for prioritization among same-level issues:

| Frequency | Multiplier | Effect |
|-----------|-----------|--------|
| Every Time | 1.0 | Default — no adjustment |
| Intermittent (common) | 0.8 | Slightly lower priority |
| Once / Unreproducible | 0.5 | Much lower priority — needs reproduction |

Example: Two S3 Medium issues. One happens "Every Time," one is "Once." The "Every Time" issue gets fixed first.

---

## 7. Decision Flowchart

```
Issue Discovered
│
├─ Does it prevent simulator use? (crash, blank, cannot start/submit)
│  └─ YES → S1 Critical
│
├─ Does it break a core feature for all users?
│  └─ YES → S2 High
│
├─ Does it degrade experience (confusing, friction, workaround needed)?
│  └─ YES → S3 Medium
│
├─ Cosmetic or edge case?
│  └─ YES → S4 Low
│
└─ Observation / suggestion?
   └─ YES → S5 Informational
```

---

## 8. Triage Cheat Sheet

| Quick Question | If Yes |
|----------------|--------|
| Crash or data loss? | S1 |
| Wrong info shown to learner? | S1/S2 |
| Core feature broken? | S2 |
| Confusing but workable? | S3 |
| Looks bad? | S4 |
| "Would be nice..." | S5 |
