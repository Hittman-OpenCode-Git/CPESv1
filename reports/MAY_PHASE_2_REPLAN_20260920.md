# May Phase 2 — Replan & Forward Design

**Status:** Design-only. No code changes in this document.
**Authority:** PROJECT_CONSTITUTION.md
**Date:** 2026-09-20
**Lane:** Forward-looking design (no immediate execution)
**Owner:** May coaching layer

---

## 1. Purpose

This document records the **forward design for the May coaching layer after Phase 2 closeout** (commit `cb9b3b4`, 2026-09-20). Phase 2 is shipped to production with all gates green. This replan addresses:

- What Phase 2 delivered vs. what was originally scoped
- Open design questions deferred during the Phase 2 build
- The 2.x → 3.0 trajectory
- Risks, mitigations, and success metrics

The doc is design-only. No code changes are authorized by this document.

---

## 2. Phase 2 — Delivered Scope (Closed 2026-09-20)

### 2.1 Feature Flags (4, all default `false`)

| Flag | Purpose |
|------|---------|
| `ENABLE_MAY_PHASE_2` | Master switch for the Phase 2 surface area |
| `ENABLE_P2_RISK_ANALYST` | Activates the P2 Risk Management agent (Section D) |
| `ENABLE_P2_INVESTMENT_AGENT` | Activates the P2 Investment Decisions agent (Section E) |
| `ENABLE_P2_DECISION_ANALYST` | Activates the P2 Decision Analysis agent (Section C) |

Master gate (`ENABLE_MAY_PHASE_2`) must be `true` for any of the three sub-agents to mount. Sub-agents can be toggled independently for staged rollout.

### 2.2 Domain Agents (3)

| Agent | Section | Worker | State |
|-------|---------|--------|-------|
| `p2-risk-analyst` | Section D — Risk Management | `worker.js` | Mounted but flag-gated |
| `p2-investment-decision` | Section E — Investment Decisions | `worker.js` | Mounted but flag-gated |
| `p2-decision-analyst` | Section C — Decision Analysis | `worker.js` | Mounted but flag-gated |

All three agents share the same IIFE bootstrap pattern as the existing `p2-risk-analyst/index.js` and use the canonical `getExamPart()` override to dispatch Part-aware logic. Per DL-058, the IIFE opener for the agents was retrofitted to resolve a parse-breaking template slip.

### 2.3 Interaction Polish (5 features in `may-learner-state.js`)

| Feature | Behavior |
|---------|----------|
| Conversation buffer (40-message in-memory `chatHistory`) | Pre-existing 40-message in-memory `chatHistory` is unchanged in Phase 2.0. Phase 2.1 introduces the persistence decision per Q1 (§4.1). Source: `app/may/may-core.js:104` (`chatHistory: []`, in-memory), `app/may/may-learner-state.js:1554` (`chatHistoryMax: 40`) — live verified as `app/may/may-core.js:80` `maxChatMessages: 40` + `app/may/may-core.js:104` `chatHistory: []` |
| Per-EW misconception tags | Tags distractor ExplanationWrong fields with the specific misconception they target |
| Socratic mode | May asks one clarifying question before answering when learner request is ambiguous |
| Confusion heuristic | Detects repeated wrong-choice patterns and offers targeted micro-lessons |
| Conversational NLG wrapper | Wraps templated responses with light conversational framing (does not modify factual content) |

### 2.4 Wiring & Dispatch

| Surface | Change |
|---------|--------|
| `may-core.js` | Added 7 P2 prose maps; `P2DomainAgent` dispatch; cross-part aggregation; `getExamPart()` override |
| `may-context-builder.js` | Added `formulaReference`, `commonTrapReference` to context payload |
| `modes/mode-explain.js` | Accepts both `stem` and `Stem` fields (P1/P2 schema tolerance); Part-aware authority string (`CMA Part 1/2`) |
| `may-telemetry.js` | `trackAdoption` now stamps `examPart` so per-Part adoption can be measured |

### 2.5 Gate State at Closeout

| Gate | Result |
|------|--------|
| `node --check` on all modified files | PASS |
| `npm run preflight:all` | 0 divergences |
| `npm run smoke` | PASS (May core API alive, May chat send/clear verified) |
| `npm run pipeline` | exit 0, baseline coherent |

---

## 3. What Phase 2 Did NOT Ship (Open Scope)

### 3.1 Items Deferred from Original Phase 2 Brief

| Item | Reason | Target |
|------|--------|--------|
| W1/W4 dashboard filter UI bridge | UI work dependent on telemetry data; deferred until 30 days of post-Phase-2 telemetry | Phase 2.1 |
| Study-plan P1→P2 bridge | Bridge needs longer post-launch telemetry to validate recommendation accuracy | Phase 2.1 |
| Lazy-loader for May agents | Code scaffold exists, untested in production | Phase 2.2 |
| May Phase 2 telemetry dashboard | Telemetry now records `examPart`; visualization layer not built | Phase 2.2 |

### 3.2 Items Explicitly Out-of-Scope for Phase 2

| Item | Rationale |
|------|-----------|
| Auto-remediation of MCQ defects | May is learner-facing, not an authoring tool. Defect remediation stays in the build-time AI lane. |
| Direct question-bank writes by May | May is read-only on content. All writes go through the regeneration pipeline. |
| Real-time collaborative May sessions | Single-learner session model only; multi-learner UX is a 3.0 question. |
| Free-form essay grading by May | Out of scope for CMA Part 1/2 MCQ + case format. |

### 3.3 Bright-Line Definitions D1–D4 (V2.1 — codified as §3.2/§4/§8 amendments)

**D1. Micro-lesson / authored-item boundary:** A micro-lesson may re-cite formula/principle text from existing items; it may NOT introduce new stems, new numbers, or new answer choices. Violation = authoring (HS-1). See §8 "May-authored new questions" remains out-of-scope; T2 audits compliance.

**D2. Recommendation-context guard:** Recommendations shall NOT appear (a) during active exam timer (AGENTS.md §19.1), (b) between items within a single case, (c) during exam-integrity review screens (AGENTS.md §19.3), or (d) when learner has stated P2-intent and the recommendation would skip a P2 sub-topic. See §4.4/§8; enforced via HS-4.

**D3. LOS-level storage policy:** LOS-level data is collected for ops/coach dashboard only; never fed back into May recommendation logic; retention ≤ [N] days (to be set at Q1 decision; default proposal 30d, aggregated-only, not PII). See §4.4.

**D4. Cross-part recommendation algorithm pre-spec:** Weakness-emphasis (e.g., 60% weakest-Topic / 40% strongest-Topic) to prevent grade-inflation "push to strength" default. See §5.1 study-plan bridge; monitored by T1 diversity ratio.

---

## 4. Open Design Questions

These are the questions that should be resolved before Phase 2.1 design starts. None of them block the current Phase 2 production deployment.

### 4.1 Q1 — Conversation Buffer Persistence

**Question:** Should the 5-turn conversation buffer persist across session resumes (refresh, navigate-away), or only within a single live session?

**Trade-offs:**
- Persist: better learner continuity across short interruptions; storage cost
- Live-only: simpler; matches "ephemeral coaching" mental model

**Recommendation:** Live-only for Phase 2.0. Re-evaluate after Phase 2.1 telemetry.

### 4.2 Q2 — Confusion Heuristic Threshold Tuning

**Question:** What threshold of repeated wrong-choices should trigger the "targeted micro-lesson" intervention?

**Trade-offs:**
- Aggressive (2 wrong): high intervention rate, potential learner friction
- Conservative (4 wrong): low intervention rate, may miss early confusion
- Adaptive (per-LOS difficulty): best UX, harder to tune

**Recommendation:** Adaptive with starting threshold = 3 wrong-choices on the same Topic within a 6-item window. Phase 2.1 **introduces** `MAY_CONFUSION_WINDOW` and `MAY_CONFUSION_THRESHOLD` as new env overrides (zero grep hits in `app/may/**` at 2026-09-20 — not current capability; corrected from prior "Tunable via" framing).

### 4.3 Q3 — Socratic Mode Opt-Out

**Question:** Should Socratic mode be opt-out (default on) or opt-in (default off)?

**Trade-offs:**
- Opt-out: maximum pedagogical benefit; some learners may find clarifying questions frustrating under time pressure
- Opt-in: learner agency preserved; lower adoption

**Recommendation:** Opt-out for practice mode, opt-in for exam-integrity mode (Full Exam, real-conditions). Socratic questions must not appear during active exam timer per AGENTS.md §19.1 (timer reflects only active time; no Socratic mid-exam prompts).

### 4.4 Q4 — Cross-Part Aggregation Granularity

**Question:** When May shows "you're strong in P1-C, weak in P2-D", what granularity of P1/P2 aggregation is most actionable?

**Options:**
- By Section (A–F)
- By Topic within Section
- By Difficulty tier (Easy → Very Difficult)
- By LOS

**Recommendation:** Primary view = Section + Difficulty tier. Drill-down = Topic + LOS. Avoid exposing LOS-level recommendations to learners (too granular, may feel like surveillance). **V2.1 D3:** LOS-level data stored for ops/coach dashboard only — never fed into May recommendation logic; retention ≤ [N] days (aggregated, not PII); requires Q1 telemetry decision.

### 4.5 Q5 — Agent Routing Failure Mode

**Question:** When a flag-gated sub-agent fails to mount or crashes, what is the user-visible behavior?

**Recommendation:** Graceful-degradation backend **already shipped** — `app/may/may-coaching-orchestrator.js:226-262` (`degraded[]`), `app/may/may-coaching-router.js:79-124` (`fallbackBehavior`), `app/may/may-llm-provider-registry.js:663` (`_fallback`). Phase 2.1 gap is the **learner-visible "coaching is reduced" indicator**, not the fallback. May falls back to base mode (no P2 prose maps, no agent routing), logs the failure, and surfaces the non-blocking indicator in the May panel. Learner session continues uninterrupted. Telemetry records the failure for ops review (see T6).

---

## 5. Roadmap

### 5.1 Phase 2.1 — Telemetry-Informed Polish (target: +30 days from Phase 2.0)

| Scope | Success criterion | Hard-stop |
|-------|-------------------|-----------|
| W1/W4 dashboard filter UI | Learners can filter dashboard by Part (P1/P2/All); **render at +30d** (what's recorded) | HS-6, HS-9 |
| Study-plan P1→P2 bridge | Top-3 recommended next-Topic suggestions per learner, validated against 30-day telemetry; **algorithm pre-spec D4: 60% weakest / 40% strongest** | HS-2, HS-4, D4 |
| Conversation-buffer decision (Q1) | Implemented per Phase 2.1 telemetry review (Q1 persistence choice) | HS-6, DL-022/DL-014 path |
| Confusion-heuristic threshold tuning (Q2) | Threshold values adjusted based on observed intervention rates; `MAY_CONFUSION_*` introduced per §4.2 | HS-1, HS-5 |

**V2.1 timing split:** Dashboard **render at +30d** (what's recorded), **validate at +60d** (what's accurate) per §5.2. Study-plan bridge validates at +60d against T1 diversity and T4 intent signals.

### 5.2 Phase 2.2 — Operational Hardening (target: +60 days)

| Scope | Success criterion | Timing split (V2.1) |
|-------|-------------------|---------------------|
| Lazy-loader for May agents | Agents mount on first use; cold-start < 200ms; idle memory < 50MB per agent | Validate +60d |
| May Phase 2 telemetry dashboard | Ops can view `examPart` adoption, agent usage, Socratic mode opt-in rate, confusion intervention rate | Render +30d (what's recorded), **Validate +60d** (what's accurate) |
| Agent failure-mode learner indicator (Q5) | "Coaching is reduced" indicator visible when backend fallback fires; graceful degradation verified via chaos testing (DL-045 positive-evidence doctrine) | Render +30d, Validate +60d |
| `MAY_CONFUSION_WINDOW` and `MAY_CONFUSION_THRESHOLD` env overrides | Operators can tune without code changes (introduced in Phase 2.1) | Validate +60d |

### 5.3 Phase 3.0 — Strategic Direction (target: +6 months, requires separate authorization)

Phase 3 is intentionally out-of-scope for this replan. Likely candidates for 3.0 scoping:

- Multi-learner collaborative sessions
- May-driven adaptive item selection (currently static `selectWithDifficultyDistribution`)
- May-authored practice problem generation (out-of-scope today per §3.2)
- Free-form essay grading for Part 2 case writeups

Phase 3.0 design must be re-authorized; this doc does not pre-approve Phase 3 work.

---

## 6. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Confusion heuristic over-triggers | Medium | Learner friction, abandonment | Adaptive threshold + A/B test in Phase 2.1 |
| Socratic mode slows exam-integrity learners | Medium | Timer pressure, exam validity violation | Opt-in for exam-integrity mode (Q3); confirm via 30-day telemetry |
| Sub-agent crash breaks May session | Low | Learner blocked | Graceful degradation (Q5) |
| `examPart` telemetry missing from older sessions | Low | Adoption metrics skewed | Pre-Phase-2 sessions excluded from adoption analysis |
| Conversation buffer grows unbounded across sessions | Low (live-only) | Memory pressure | Already live-only; revisit if Q1 decision flips |
| `formulaReference`/`commonTrapReference` not always populated | Medium | May gives generic instead of specific guidance | Phase 2.1 review of populator coverage; fallback to Topic-level guidance |

---

## 7. Success Metrics

Phase 2 is considered successful if, at the +90-day mark:

| Metric | Target | Measurement |
|--------|--------|-------------|
| P2 Part coverage rate | ≥ 60% of P2-eligible learners practice at least one P2 item with May enabled | `examPart` telemetry |
| P2 agent activation rate | ≥ 30% of P2 sessions invoke at least one of the 3 agents | Agent invocation telemetry |
| Confusion intervention uptake | **≥ baseline + 20pp OR absolute ≥50%, whichever is lower; re-target at +60d** (V2.1 refinement — was fixed ≥50%) | Confusion-heuristic outcome tracking + T3 split |
| Socratic opt-in rate (exam-integrity mode) | ≥ 20% of exam-integrity learners opt in to Socratic | Socratic mode telemetry |
| May core availability | ≥ 99.5% monthly uptime (excluding scheduled maintenance) | Smoke + ops dashboard |
| Defect rate introduced by Phase 2 | **0 new defects where root cause = May output side-effects on pack/case/scored file state, verified by validator suite + guard** (V2.1 — was "0 new content defects attributed to May output") | Validator suite + guard; DL-060 pre-registered for T6 |
| P2 coverage depth (V2.1) | **P2 items attempted per learner ≥ [N]** (V2.1 addition; N set after 30-day baseline) | Per-learner P2 item count (aggregated) + T1 |
| Agent helpfulness depth (V2.1) | **Per-invocation confidence ≥ 0.65 on subset** (provider-reported) | Agent telemetry |

If any metric misses its target by >25% at the +90-day mark, escalate to board review and trigger a Phase 2.x replan.

---

## 8. Scope Boundaries (Authoritative)

Phase 2.x is bounded by:

| In scope | Out of scope |
|---------|--------------|
| Read-only May access to content | May-authored new questions (HS-1; D1) |
| Coaching, hints, micro-lessons citing governing authority (HS-5) | Auto-grading of constructed-response items |
| P1 + P2 item coverage from `question_state: "Certified"` only (HS-2) | Part 2 essay grading |
| Confusion heuristics within MCQ + case context; **not during active timer / between case items / submission-guard** (HS-4) | Free-form chat outside MCQ/case review; Socratic during exam (HS-4) |
| Telemetry that records `examPart` and adoption signals; aggregated, no PII (HS-6, HS-9) | Telemetry that records learner PII; per-learner profiles (HS-9) |
| Flag-gated agent rollout | Always-on sub-agent deployment |
| Graceful degradation on agent failure + learner-visible indicator (T6) | Hard-fail on agent unavailability |
| Delivery diversity within CAQS §6.1 ±5% per tier (HS-3) | Soft-archiving via recommendation bias (T1) |
| LOS stored for ops/coach dashboard only, never for recommendations; ≤[N] days (D3) | LOS-driven adaptive selection (HS-8; Phase 3.0) |

**D1–D4 codified here:** D1 (micro-lesson ≠ new items), D2 (context guards), D3 (LOS storage), D4 (60/40 weakness-emphasis). Cumulative UI surface bounded by T5 cognitive budget (HS-10).

Any expansion of scope requires explicit board authorization and an updated replan.

---

## 9. Cross-References

- `reports/VERIFICATION_REPORT_20260919.md` — pre-Phase-2 verification
- `reports/SESSION_SUMMARY_20260919.md` — Phase 2 session summary
- `reports/P2_VERIFY_PACK_*_HANDOFF.md` — P2 verification handoffs (6 packs)
- `knowledge/DEFECT_LIBRARY.md` — DL-058 (IIFE opener fix for P2 micro-agents)
- `knowledge/REVISION_HISTORY.md` — Phase 2 closeout entries
- AGENTS.md §19.1 (Exam-Integrity Timer Rule), §19.3 (Learner-Submission Guard)

### 9.1 Defect-Library Lineage (V2.1 — §9 cross-references to add)

| Defect | Relevance to May Phase 2.1 |
|--------|----------------------------|
| **DL-051** | Case semantic screens — confusion heuristic must respect case `Correct` (case `Correct` is answer text, not letter); T3 tag accuracy analog |
| **DL-049** | Psychometric validator drop — May output must not silently drop P2 items; T1 telemetry guards the analog |
| **DL-035 / DL-036** | Silent-empty scan — dashboard pipeline must not silently exclude items; T1 delivery-diversity guards reuse |
| **DL-022 / DL-014** | localStorage corruption path — Q1 buffer persistence decision inherits this failure mode; live-only default contains risk |
| **DL-047** | Semantic verification gap — micro-lesson DL-009/DL-010 analog; T2/T3 audits prevent same class |
| **DL-045** | Positive-evidence doctrine — Phase 2.2 chaos testing for graceful degradation must cite evidence, not empty results |

DL-060 candidate (T6 graceful-degradation indicator) pre-registered as lineage successor; filing deferred per Q4 decision (§10/§11).

---

## 10. Approval & Authorization — Governance Contract (V2.1 — closes C1/C2/C3)

> **C2 — Spec-framing fix (BLOCKER):** This document is **not a change-set specification**. It is a design-only replan. No code changes are authorized by this document. Any future implementation change-set requires its own specification, backup-protocol compliance per `knowledge/BACKUP_PROTOCOL.md`, lane determination per AGENTS.md §9, and guard compliance (see below). A 21-rule BLOCK verdict of "zero triggers on this lane" does not waive backup or lane rules for a downstream code change-set.

Future Phase 2.1 / 2.2 / 3.0 work requires:
1. Separate design authorization (this doc does not pre-approve)
2. Per-workstream REVISION_HISTORY.md entry citing the workstream token
3. Per-workstream DL-XXX filing for any new defects discovered
4. Per-batch governance guard compliance (Rules 1–21) — plus Light Lane drift signals per AGENTS.md §13.1 (app.js hash mismatch, agent self-report conflict, registered-artifact gaps) which **do** apply
5. **C1 — Per-workstream authorization token (BLOCKER):** No code work begins without the specific token `may_v2_1_<workstream>` present in the REVISION_HISTORY.md entry authorizing that workstream (e.g., `may_v2_1_dashboard_filter`, `may_v2_1_confusion_heuristic`). Pattern `may_v2_1_<workstream>` is mandatory. Token is obtained from the user before any code change in that workstream.
6. **C3 — Lane determination per workstream (BLOCKER):** Each workstream must declare its lane (Full vs Light per AGENTS.md §9.1) before code work begins and follow that lane's closeout (Full: `npm run preflight` T0 + `npm run pipeline` Tend + REVISION_HISTORY + DEFECT_LIBRARY; Light: `npm run smoke` if app/HTML/CSS/May coaching changed). The 21 BLOCK rules do not trigger on this design lane; they **do** apply to any Full-Lane content/pack/case workstream downstream.

### 10.1 Hard-Stop Conditions HS-1 to HS-10 (V2.1 governance contract)

| HS | Condition | Codified in |
|----|-----------|-------------|
| **HS-1** | No authoring / stems / numbers / choices generation | §3.2, §8; D1 |
| **HS-2** | Delivery strictly from `question_state: "Certified"` | §8; AGENTS §7 |
| **HS-3** | Delivery diversity within CAQS §6.1 ±5% per tier | §8; T1 |
| **HS-4** | No Socratic/free-form chat/cross-item recommendations during active timer, submission-guard window, or between case items | §4.3, §8; D2 |
| **HS-5** | Micro-lessons / misconception tags / prose maps cite the governing authority (CAQS §4.3 EV3 standard, same as MCQ EC) | §8; T2 |
| **HS-6** | No learner PII; signals aggregated | §8 |
| **HS-7** | No auto-remediation of content defects | §3.2, §8 |
| **HS-8** | Phase 3.0 adaptive selection requires CAQS-aligned floor + separate authorization | §5.3, §8 |
| **HS-9** | No per-learner profiles from telemetry | §8; T4 |
| **HS-10** | May's cumulative UI surface bounded by T5 cognitive-budget signal (abandonment + completion-time deltas vs surface area; threshold to be set per open decision) | §8; T5 |

Violation of any HS condition is a hard stop: halt the workstream, file a defect, and escalate to board review. HS-10 threshold is pending the Q4 open decision (both signals vs single; value at +30d baseline).

### 10.2 Open Decisions Required Before Finalizing Design (V2.1)

| Q | Question | Options | Status |
|---|----------|---------|--------|
| **Q1** | Conversation-buffer persistence | Live-only (ephemeral, 40-message in-memory `chatHistory` unchanged) vs persisted (survives refresh) with DL-022/DL-014 hardening | **Pending — confirm live-only for 2.0; revisit per 30-day telemetry?** |
| **Q3** | Socratic default | Opt-out for practice / opt-in for exam-integrity (recommended) vs override | **Pending — confirm or override** |
| **HS-10** | Cognitive-load cap signal | T5 abandonment vs completion-time vs both; threshold value | **Pending — which signal anchors the cap; threshold** |
| **DL-060** | Graceful-degradation indicator DL filing | Pre-register DL-060 now vs defer to defect-surfacing event | **Pending — pre-register or defer** |

Design is not final until these four decisions are recorded in §11 and REVISION_HISTORY.md.

---

## 11. Phase 2.1 V2.1 Design Additions (Board Conditional-Proceed Verdict — 2026-09-20)

**Status:** Design-only. No code changes authorized by this section. Closes top-3 drift paths per board replan review. All items below shape the Phase 2.1 implementation per §10 governance contract.

### 11.1 Source-of-Truth Corrections Applied (V2.1 §2.3/§4.2/§4.5/§5.2)

| # | Location | Before | After (this doc) | Source |
|---|----------|--------|-------------------|--------|
| 1 | §2.3 | "Conversation buffer (5 turns)" | "Pre-existing 40-message in-memory chatHistory is unchanged in Phase 2.0. Phase 2.1 introduces the persistence decision per Q1." | `app/may/may-core.js:104` (`chatHistory: []`), `app/may/may-learner-state.js:1554` (`chatHistoryMax: 40`) — verified live `app/may/may-core.js:80` `maxChatMessages: 40` |
| 2 | §4.2 | "Tunable via env overrides" (`MAY_CONFUSION_WINDOW`, `MAY_CONFUSION_THRESHOLD`) | Reframed as Phase 2.1 introduction (zero grep hits in `app/may/**` at 2026-09-20) | Board grep |
| 3 | §4.5 | Graceful-degradation as future work | Backend already shipped (`may-coaching-orchestrator.js:226-262` `degraded[]`, `may-coaching-router.js:79-124` `fallbackBehavior`, `may-llm-provider-registry.js:663` `_fallback`); Phase 2.1 gap is learner-visible indicator | File:line citations |
| 4 | §5.2 | Single timing | Split: render at +30d (what's recorded), validate at +60d (what's accurate) | Board directive |

### 11.2 New Telemetry T1–T6 (closes top-3 drift paths; V2.1 addition)

| ID | Signal | Closes | Spec |
|----|--------|--------|------|
| **T1** | Recommendation-acceptance rate + delivery-diversity ratio (top-20% / bottom-20% items, alert ≥3:1) | **D1 soft-archiving drift** [HIGH, 90–180d] + HS-3 | Aggregated, per-Topic; alert triggers board review |
| **T2** | Monthly N=50 micro-lesson authority-citation audit (DL-009 analog) | Micro-lesson authority drift; HS-5 | Sample 50 micro-lessons/month; each must cite governing authority per CAQS §4.3 EV3; defect if <95% cite |
| **T3** | Per-EW misconception-tag accuracy telemetry + intervention-outcome split by tag accuracy (DL-010 analog) | Misconception-tag drift; confusion-heuristic quality | Tag-accuracy sampled per EW; outcome split: correct-next rate when tag correct vs incorrect |
| **T4** | Stated Part-intent capture (one session-start, aggregated only, not PII) | **D2 prescriptive recommendations drift** | Single prompt at session start; aggregated counts only; never per-learner profile (HS-9); guards D2(d) |
| **T5** | Cognitive-budget telemetry (session abandonment + completion-time deltas vs surface area) | **D3 May adaptive-selection drift** + validates HS-10 cap | Tracks abandonment rate and median completion-time delta as May UI surface grows; anchors HS-10 |
| **T6** | Graceful-degradation event rate (failures per 1k sessions) + ops alert threshold | Pre-register DL-060 candidate (degradation invisible) | `degraded[]`/`fallbackBehavior`/`_fallback` fires per 1k sessions; alert threshold [N] to be set at +30d baseline |

All telemetry: aggregated, no PII (HS-6), no per-learner profiles (HS-9), retention ≤[N] days per D3 where applicable.

### 11.3 Bright-Line Definitions D1–D4 (codified as §3.2/§4/§8 amendments)

| ID | Boundary | Rule |
|----|----------|------|
| **D1** | Micro-lesson / authored-item boundary | Micro-lesson may re-cite formula/principle text from existing items; may NOT introduce new stems, new numbers, or new answer choices. New stem/number/choice = authoring → blocked by HS-1. |
| **D2** | Recommendation-context guard | No recommendations (a) during active exam timer (AGENTS.md §19.1), (b) between items within a single case, (c) during exam-integrity review screens (AGENTS.md §19.3), (d) when learner has stated P2-intent and recommendation would skip a P2 sub-topic (T4). |
| **D3** | LOS-level storage policy | LOS collected for ops/coach dashboard only; never fed back into May recommendation logic; retention ≤ [N] days (proposal 30d). |
| **D4** | Cross-part recommendation algorithm pre-spec | Weakness-emphasis (e.g., 60% weakest-Topic / 40% strongest-Topic) to prevent "push to strength" grade-inflation default. Applies to P1→P2 bridge (§5.1). |

### 11.4 Hard-Stop Conditions HS-1 to HS-10 (governance contract — see §10.1 for table)

HS-1 through HS-10 as defined in §10.1. Each implementation workstream must cite its governing HS-* in its REVISION_HISTORY entry and in `reports/MAY_PHASE_2_1_DESIGN_*.md`. Summary: HS-1 no authoring; HS-2 Certified-only; HS-3 CAQS ±5%; HS-4 no mid-exam Socratic; HS-5 cite authority; HS-6 no PII; HS-7 no auto-remediation; HS-8 Phase 3.0 needs floor+auth; HS-9 no per-learner profiles; HS-10 UI surface bounded by T5.

### 11.5 Cross-References Added (§9.1 — defect-library lineage)

DL-051, DL-049, DL-035/DL-036, DL-022/DL-014, DL-047, DL-045 — see §9.1 table. DL-060 candidate pre-registered as successor to T6.

### 11.6 Success-Metric Refinements (§7 — V2.1)

| Metric | Before | After (V2.1) |
|--------|--------|---------------|
| Confusion uptake | ≥50% | **≥ baseline + 20pp OR absolute ≥50%, whichever is lower; re-target at +60d** |
| Defect rate | "0 new content defects attributed to May output" | **"0 new defects where root cause = May output side-effects on pack/case/scored file state, verified by validator suite + guard"** |
| P2 coverage depth | — | **New: P2 items attempted per learner ≥ [N]** |
| Agent helpfulness depth | — | **New: per-invocation confidence ≥ 0.65 on subset** |

### 11.7 Blocker Closeout Record (C1/C2/C3 — this session)

| Blocker | Requirement | Closed in | Evidence |
|---------|-------------|-----------|----------|
| **C1** | Per-workstream token `may_v2_1_<workstream>` in §10 | §10 ¶5 | Pattern `may_v2_1_<workstream>` mandatory; exemplars `may_v2_1_dashboard_filter`, `may_v2_1_confusion_heuristic` |
| **C2** | "Not a change-set specification" disclaimer + backup/lane/guard language in §10 | §10 blockquote | Cites `knowledge/BACKUP_PROTOCOL.md`, AGENTS.md §9, 21 BLOCK rules + Light Lane drift signals |
| **C3** | Lane determination per workstream in §10 | §10 ¶6 | Full vs Light per AGENTS.md §9.1; closeout requirements listed |

All §10 blockers closed before design per authority chain. Next code change in any workstream requires the specific workstream token from the user (pattern `may_v2_1_<workstream>`) recorded in REVISION_HISTORY.md.

### 11.8 Open Decisions Carried Forward (see §10.2)

Q1, Q3, HS-10, DL-060 — pending user decision before design finalization. Design is implementation-ready per workstream **only after** the relevant Q/HS/DL decision for that workstream is recorded. Undecided workstreams remain design-only.

---

*Last updated: 2026-09-20 — May Phase 2 replan, V2.1 board additions + §10 blocker closeout (C1/C2/C3), §11 Phase 2.1 design additions*
