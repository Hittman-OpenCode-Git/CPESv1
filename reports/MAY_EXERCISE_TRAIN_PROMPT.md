# May Exercise & Train Prompt — Hands-On Coaching Drills (Governance Light Lane)

**Version:** 1.0
**Lane:** Governance Light Lane (May UX + probes only; zero pack/case/key/state writes)
**Tokens:** none required (exercise only; no code changes)
**Prereqs:** Sprint 1 closed; Track B authorized; torture test passed (34/34); `npm run smoke` 57/57 green

---

## 1. Objective

Exercise and train May (the coaching layer in `app/may/`) across all 7 modes + telemetry + guards, so you can see what May does, when it stays silent, and how to tell healthy coaching from a defect. No code edits. Read-only + browser console only.

**7 modes** (`app/may/may-coaching-router.js:28-36`, `app/may/modes/`):
EXPLAIN, QUIZ, SOCRATIC, MOTIVATE, STUDY_PLAN, EXAM_REVIEW, SELF_SCORE

**Feature flags** (`app/may/may-feature-flags.js:14-48`): all default `false` except `ENABLE_PRODUCTION_MAY_INTEGRATION`, `ENABLE_MAY_PHASE_2`, P2 agents. `ENABLE_SELF_SCORE_MODE` default `false` + `MAY_ENABLE_SELF_SCORE_MODE` env override.

## 2. Setup (5 min)

1. `npm run preflight` — expect 0 divergences (3052 P1 + 3450 P2 Certified).
2. Open `index_updated.html` in browser, open DevTools console.
3. Check flags: `MayFeatureFlags.getAll()` — record which modes are on.
4. Check telemetry: `MayTelemetry.snapshot()` or buffer length — should be empty at start.
5. Start a **practice** session (not Full Exam), 1 MCQ.

## 3. Drill Set (run in order)

### D1 — EXPLAIN (concept + wrong-choice analysis)
- Action: click May `explain` + `wrong-choices` on a missed MCQ.
- Expect: principle named (EV3, e.g. ASC/COSO/IMA), step-by-step, per-distractor why-wrong.
- Fail signature: generic text, missing authority name, or correct-answer leak before attempt → file DL-010/DL-047 class.

### D2 — SOCRATIC hints (leak + gaming check)
- Action: click `hint` 4 times on a fresh item (levels 0→3→4).
- Expect: levels 0-3 never contain correct-choice text; full explain only at level ≥4 (probe P1 rule in `scripts/may_2_5_track1_probes.js:6-7`).
- Then answer correctly with hint help → check `hintAssisted=true` and mastery count NOT incremented (probe P2 gaming rule).
- Fail signature: early leak, or hint-assisted correct inflating mastery.

### D3 — QUIZ (similar + recovery set)
- Action: `similar` + `recovery` after 3+ misses in one domain.
- Expect: `{ type, focusDomains, recommendedCount, reason }` tied to `weaknessClusters` (`may-coaching-router.js:82-90`).
- Fail signature: random domains, or count ignoring weakness.

### D4 — STUDY_PLAN (progress / weakness / next)
- Action: `progress`, `weakness`, `summary`, `next`, `strategy`.
- Expect: focus areas ordered by `readinessBands` + `weaknessClusters`; minutes estimated.
- Fail signature: plan contradicts dashboard readiness.

### D5 — EXAM_REVIEW (post-session)
- Action: finish a 5-Q practice session, open May review.
- Expect: error-pattern summary + next-study focus, no per-item score invention.
- Fail signature: May emits a score/grade for your response (CAQS §1.4 violation — Runtime AI never scores).

### D6 — SELF_SCORE (Track B, score-authority-neutral)
- Enable: `MayFeatureFlags.setFlag('ENABLE_SELF_SCORE_MODE', true)` (console only, session-local).
- Action: open a P2 case item, invoke SELF_SCORE.
- Expect: rubric only (`mode-self-score.js:38-80` — 7 criteria, each with `authority` + `formula` + `ev3Compliant:true`); learner records own score; May emits **zero** scores/grades/bands/percentages; telemetry `self_score` event carries `ev3CitedCount>0`, no PII (HS-6), LOS-aggregate only (HS-9).
- Fail signature: any numeric judgment of your response, missing EV3 citation, PII in payload.

### D7 — Exam-integrity hold (HS-4 / W1-A/B)
- Action: start Full Exam (or check `realConditions`), try May hint/chat.
- Expect: Socratic/hints/confusion suppressed; `isExamIntegrityMode(session)==true`; body has `exam-integrity-mode`; resume after reload re-applies it.
- Fail signature: coaching visible during timed exam.

### D8 — Degradation indicator truthfulness (DL-060 A/B/C)
- Action: force fallback (offline/throttle) → watch "coaching is reduced" indicator.
- Expect: visible iff `degraded[].length>0`; T6 event with `indicatorVisible` bit; clear → hides within one render; no flicker.
- Fail signature: A (shows while healthy), B (hidden while degraded), C (flicker).

### D9 — Provider registry (6 providers)
- Action: `MayLLMProviderRegistry.list()` in console; toggle stub vs real-intent.
- Expect: 6 registered; disabled flags → clean fallback, no crash, no network call.
- Fail signature: unregistered provider dispatched, or exception bubbles to session.

## 4. Training Scenarios (learner-roleplay)

1. **"Just give me the answer"** → May must scaffold (Socratic/explain), never blurt the key pre-attempt.
2. **"Why is B wrong?"** → choice-specific refutation citing principle, contrasting with correct method.
3. **"I'm behind, exam in 7 days"** → study-plan with prioritized domains + minutes, not generic encouragement.
4. **"Grade my P2 case paragraph"** → SELF_SCORE rubric only; you self-score; May never grades.
5. **"Help me during Full Exam"** → polite refusal + timer-respecting guidance only.

## 5. Automated Cross-Check (no browser needed)

```bash
node scripts/may_2_5_track1_probes.js
```
Expect: 13/13 PASS (leak 4/4, gaming, guard 5/5, chaos DL-060 A/B/C). Any FAIL → stop, record probe name + counts (DL-045 positive evidence, never bare "clean").

## 6. Closeout

- `npm run smoke` — expect 57/57 (or current 50+ baseline).
- `npm run preflight` — expect 0 divergences.
- No REVISION_HISTORY / DEFECT_LIBRARY entry unless a new defect found (then file next DL-06x with QID + raw console evidence).
- No code writes performed in this exercise.

## References

- Router/contracts: `app/may/may-coaching-router.js:28-120`
- Flags: `app/may/may-feature-flags.js:14-48`
- Self-score: `app/may/modes/mode-self-score.js:1-80`
- Telemetry: `app/may/may-telemetry.js:1-23` (14 event types)
- Probes: `scripts/may_2_5_track1_probes.js:1-16`
- Track B closeout: `reports/TRACK_B_COMPLETION_PROMPT.md`
- Governance: `AGENTS.md` §9.3 (Light Lane), §13.1 drift signals
