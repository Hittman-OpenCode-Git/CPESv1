# May Phase 2.1 — Implementation-Ready Design (V2.1)

**Status:** Design-only. No code changes authorized by this document.
**Authority:** `reports/MAY_PHASE_2_REPLAN_20260920.md` V2.1 (§10 governance contract + §11 design additions) + board conditional-proceed verdict 2026-09-20
**Date:** 2026-09-20
**Lane:** Design (future code work per-workstream Light/Full per §10 C3)
**Owner:** May coaching layer
**Prerequisite:** §10 blockers C1/C2/C3 closed in replan V2.1. Per-workstream token `may_v2_1_<workstream>` required before any code change.

---

## 1. Purpose

This is the **implementation-ready sub-doc** for May Phase 2.1 required by deliverable G. It translates `MAY_PHASE_2_REPLAN_20260920.md` V2.1 (§10/§11) into per-workstream specifications that are ready for code authorization. Each workstream names its token, lane, hard-stop, source lines, and acceptance criteria. No code is changed by this document.

---

## 2. Workstream Token Registry (C1)

| # | Workstream | Token | Lane (C3) | §10/§11 scope |
|---|------------|-------|-----------|---------------|
| W1 | Dashboard filter UI bridge (W1/W4) | `may_v2_1_dashboard_filter` | **Light** — `app/may/**`, `index_updated.html`/`styles.css` if needed; no pack/case/state writes | §5.1 W1/W4; HS-6/HS-9; T1 |
| W2 | Study-plan P1→P2 bridge | `may_v2_1_study_plan_bridge` | **Light** — `app/may/may-learner-state.js`, `app/may/may-core.js` read-only recommendation strings | §5.1 bridge; D4 (60/40); HS-2/HS-4; T1+T4 |
| W3 | Confusion-heuristic threshold tuning + env overrides | `may_v2_1_confusion_heuristic` | **Light** — `app/may/**` heuristic only; no bank writes | §4.2/§5.1; HS-1/HS-5; T3 |
| W4 | Micro-lesson authority + misconception-tag pipeline | `may_v2_1_micro_lesson` | **Light** — `app/may/**` prose maps; no stems/numbers/choices (D1) | D1/HS-1/HS-5; T2/T3 |
| W5 | Socratic mode + recommendation-context guard | `may_v2_1_socratic_guard` | **Light** — `app/may/**` chat gating | §4.3 Q3; D2; HS-4 |
| W6 | Graceful-degradation learner indicator (Q5 gap) | `may_v2_1_graceful_degradation_indicator` | **Light** — `app/may/may-coaching-orchestrator.js` + May panel indicator | §4.5 Q5; T6; DL-060 |
| W7 | Telemetry instrumentation (T1–T6) + dashboard render/validate split | `may_v2_1_telemetry` | **Light** — `app/may/may-telemetry.js`, `app/may/may-learner-state.js` (aggregated only) | §5.2 render +30d / validate +60d; HS-6/HS-9/HS-10; T1–T6 |
| W8 | Conversation-buffer persistence decision (Q1 — deferred) | `may_v2_1_conversation_buffer` | **Light** — `app/may/may-core.js`/`may-learner-state.js` IF persisted in 2.2 | Q1; DL-022/DL-014; HS-6/HS-10; T5 |
| W9 | Cognitive-budget circuit-breaker shell (HS-10) | `may_v2_1_cognitive_budget` | **Light** — `app/may/**` surface metering | HS-10; T5 |

**Rule:** No code work in a workstream begins without its token cited in the `REVISION_HISTORY.md` entry for that change-set (AGENTS.md §10 ¶5). Tokens are not interchangeable across workstreams. The 21 governance-guard BLOCK rules do not trigger on this design lane but **do** apply to any downstream Full-Lane content work; Light Lane drift signals (AGENTS.md §13.1) apply to all workstreams (app.js hash, self-report conflict, registered-artifact gaps).

---

## 3. Source-of-Truth Baseline (for all workstreams)

| Claim | Source line | Verified |
|-------|-------------|----------|
| `chatHistory` in-memory array | `app/may/may-core.js:104` `chatHistory: []` | Yes |
| `maxChatMessages: 40` | `app/may/may-core.js:80` `maxChatMessages: 40` | Yes (replan cites `app/may/may-learner-state.js:1554` `chatHistoryMax: 40` as source of truth) |
| `MAY_CONFUSION_WINDOW/THRESHOLD` zero hits in `app/may/**` | grep 2026-09-20 → 0 | Yes — Phase 2.1 introduction |
| Graceful-degradation backend shipped | `app/may/may-coaching-orchestrator.js:226-262` `degraded[]`, `app/may/may-coaching-router.js:79-124` `fallbackBehavior`, `app/may/may-llm-provider-registry.js:663` `_fallback` | Yes |
| Exam-integrity timer + submission guard | AGENTS.md §19.1, §19.3 | Yes |
| `question_state: "Certified"` delivery gate | AGENTS.md §7; `app/app.js` pool filter | Yes |
| CAQS §4.3 EV3 authority-citation standard | `knowledge/CAQS_v1.0.md` §4.3 EV3 | Yes |

---

## 4. Per-Workstream Specifications (§10/§11 terms, HS-cited, line-referenced)

### W1 — Dashboard Filter UI Bridge (`may_v2_1_dashboard_filter`)

- **Spec (§5.1):** Learners filter dashboard by Part (P1/P2/All). **Render +30d** (what's recorded), **validate +60d** (what's accurate) per §5.2 split.
- **Hard-stops:** **HS-2** (filter reads only `question_state: "Certified"` pools), **HS-6/HS-9** (no PII, aggregated), **HS-3** (filter must not bias tier distribution beyond CAQS §6.1 ±5% — T1 guards).
- **Source lines:** `app/may/may-learner-state.js:114-158` `getPartAwareReadiness`/`getCrossPartReadiness` (already part-aware); `app/app.js` pool builder (Certified filter).
- **D1–D4:** D3 (LOS not used for filtering), D4 (no recommendation algorithm here).
- **Telemetry:** T1 (diversity ratio alert ≥3:1 on filtered views), T4 (intent capture does not alter filter counts).
- **Acceptance:** Filter toggles P1/P2/All; counts match `preflight:all` certified denominators; `smoke` PASS; no pack/case writes.
- **Lane closeout:** Light — `npm run smoke` Tend if `app.js`/HTML/CSS/May touched.

### W2 — Study-Plan P1→P2 Bridge (`may_v2_1_study_plan_bridge`)

- **Spec (§5.1 bridge; §9 DL lineage):** Top-3 recommended next-Topic suggestions per learner, validated at +60d. **Algorithm pre-spec D4:** 60% weakest-Topic / 40% strongest-Topic (prevents "push to strength" grade-inflation drift). Recommendations are pure strings — no state change.
- **Hard-stops:** **HS-2** (recommendations draw from Certified pools only), **HS-4** (D2 context guard: never recommend during active timer, between case items, exam-integrity review, or when T4 P2-intent would be skipped), **HS-8** (bridge is not Phase 3.0 adaptive selection).
- **Source lines:** `app/may/may-learner-state.js:134-158` `getCrossPartStudyPlan()` (pure strings, already weakest-part-first); `app/may/may-core.js:193-198` defect manifest fetch (illustrates read-only pattern).
- **Telemetry:** T1 (acceptance rate + diversity ratio), T4 (stated Part-intent guards D2(d)), T5 (abandonment vs bridge uptake).
- **Acceptance:** 3 recommendations per learner; 60/40 split verifiable in logged evidence field; D2 guard unit-tested; `smoke` PASS.

### W3 — Confusion-Heuristic Threshold Tuning (`may_v2_1_confusion_heuristic`)

- **Spec (§4.2 Q2; corrected):** Starting threshold 3 wrong-choices on same Topic within 6-item window. Phase 2.1 **introduces** `MAY_CONFUSION_WINDOW` (default 6) and `MAY_CONFUSION_THRESHOLD` (default 3) as env overrides — not current capability.
- **Hard-stops:** **HS-1** (micro-lesson is coaching, not new item authoring — D1), **HS-5** (micro-lesson cites governing authority per CAQS §4.3 EV3), **HS-4** (no heuristic firing during exam contexts).
- **Source lines:** `app/may/may-learner-state.js:297-352` `_trackMisconception` (keyword chain + agent augmentation at `confidence >=0.8`); `app/may/may-core.js:104` context (`chatHistory` not used for heuristic).
- **Telemetry:** T3 (per-EW misconception-tag accuracy + outcome split by tag accuracy — DL-010 analog); confusion uptake metric per §7 now **baseline +20pp OR ≥50% whichever lower, re-target +60d**.
- **Acceptance:** Env overrides tune without code change; threshold changes logged; chaos-free via T5.

### W4 — Micro-Lesson + Misconception-Tag Pipeline (`may_v2_1_micro_lesson`)

- **Spec (D1; HS-1/HS-5; T2/T3):** Micro-lesson may re-cite formula/principle text from existing items; may NOT introduce new stems, numbers, or answer choices. Misconception tags target per-EW fields.
- **Hard-stops:** **HS-1** (no stems/numbers/choices generation — authoring is a hard stop), **HS-5** (every micro-lesson and EW tag cites governing authority — COSO/ASC/IMA per EV3), **HS-7** (no auto-remediation of content defects).
- **Source lines:** `app/may/may-learner-state.js:54` `misconceptionPatterns[]`, `297-352` tagging; `app/may/may-core.js:58-63` P2 domain-agent prose maps (authority-citing pattern).
- **Telemetry:** T2 (monthly N=50 micro-lesson authority-citation audit, DL-009 analog; <95% cite = defect), T3 (per-EW tag accuracy + intervention-outcome split; DL-010 analog).
- **Case lineage:** DL-051 — confusion heuristic must respect case `Correct` (case `Correct` is answer text, not letter; screen adaptation).

### W5 — Socratic Mode + Recommendation-Context Guard (`may_v2_1_socratic_guard`)

- **Spec (§4.3 Q3; D2; HS-4):** **Confirmed decision:** Opt-out for practice / opt-in for exam-integrity. Socratic clarifying question before answering when learner request is ambiguous — never during active exam timer per AGENTS.md §19.1, never in submission-guard window (§19.3), never between case items, never against stated P2-intent (D2).
- **Hard-stop:** **HS-4** (no Socratic/free-form chat/cross-item recommendations during active timer, submission-guard, or between case items).
- **Source lines:** `app/may/may-core.js:104` sessionActive guard (`sessionActive` at `may-core.js:102-104`); `app/app.js` exam-integrity mode body class (DL-042 precedent).
- **Acceptance:** Discoverability explainer for Socratic in practice mode; exam-integrity opt-in toggle; D2 guard unit-tested (4 negative cases).

### W6 — Graceful-Degradation Learner Indicator (`may_v2_1_graceful_degradation_indicator`)

- **Spec (§4.5 Q5; corrected):** Backend already shipped (`orchestrator:226-262`, `router:79-124`, `registry:663`). Phase 2.1 ships the **learner-visible "coaching is reduced" non-blocking indicator** in the May panel.
- **Hard-stop:** **HS-5** (indicator prose cites that coaching is reduced, not that content is wrong); no HS-7 violation (indicator is not remediation).
- **Source lines:** `app/may/may-coaching-orchestrator.js:226-262` `degraded[]`; `app/may/may-coaching-router.js:79-124` `fallbackBehavior`; `app/may/may-llm-provider-registry.js:663` `_fallback`.
- **Telemetry:** T6 (failures per 1k sessions + ops alert threshold). **DL-060:** pre-registered now per user decision — 3 sub-classes A/B/C, Medium severity; upgrade on defect-surfacing event (see §6).
- **Acceptance:** Indicator appears only when fallback fires; learner session continues uninterrupted; chaos test per DL-045 positive-evidence doctrine (cite fallback evidence, not empty results).

### W7 — Telemetry Instrumentation + Dashboard Render/Validate Split (`may_v2_1_telemetry`)

- **Spec (§5.2; §11.2 T1–T6; §11.6 metrics):** Instrument T1–T6; dashboard **render +30d** (what's recorded) / **validate +60d** (what's accurate).
- **Hard-stops:** **HS-6** (no PII; aggregated), **HS-9** (no per-learner profiles), **HS-10** (surface bounded by T5), **HS-3** (T1 diversity).
- **Source lines:** `app/may/may-telemetry.js:trackAdoption` (already stamps `examPart`); `app/may/may-learner-state.js:55-58` `recommendationLog`/`recommendationOutcomes` (provenance for T1).
- **Per-signal spec:**
  - T1: acceptance rate + diversity ratio (top-20%/bottom-20%, alert ≥3:1) — closes D1 soft-archiving drift [HIGH].
  - T2: N=50/month micro-lesson authority audit (DL-009 analog) — HS-5.
  - T3: per-EW tag accuracy + outcome split (DL-010 analog).
  - T4: stated Part-intent at session start, aggregated only, not PII — closes D2 drift; HS-9.
  - T5: abandonment + completion-time deltas vs surface area — closes D3 drift; validates HS-10.
  - T6: failures per 1k sessions + alert threshold — DL-060 candidate (see W6).
- **Lifetime:** LOS retention ≤[N] days per D3 (proposal 30d) where applicable; aggregated only.
- **Acceptance:** All 6 signals emit; alert thresholds firing verified; `smoke` + `pipeline` green.

### W8 — Conversation-Buffer Persistence (`may_v2_1_conversation_buffer`) — DEFERRED

- **Spec (Q1; DL-022/DL-014 lineage):** **Confirmed decision:** Live-only for 2.0+2.1. `chatHistory` remains 40-message in-memory (`app/may/may-core.js:80/104`), not persisted — revisits in Phase 2.2 pending 30-day telemetry (T5 abandonment/completion-time signal).
- **Hard-stops:** **HS-6** (no PII persistence), **HS-10** (persisted buffer would grow surface — bounds apply), **HS-7** (persistence is not remediation).
- **Deferred work:** If 30d telemetry signals demand persistence, Phase 2.2 ships localStorage hardening against DL-022/DL-014 corruption path with 7-day circuit-breaker discipline (HS-10 both-signals framing).
- **Acceptance (now):** No code; instrument T5 to inform the +30d revisit.

### W9 — Cognitive-Budget Circuit-Breaker Shell (`may_v2_1_cognitive_budget`)

- **Spec (HS-10; T5):** **Confirmed decision:** Both signals — time-delta primary, abandonment secondary — with 7-day circuit-breaker. **Threshold numbers deferred to +30d baseline** (no invented threshold now).
- **Hard-stop:** **HS-10** — May's cumulative UI surface bounded by T5 signal. Violation = hard stop, file defect, escalate to board.
- **Phase 2.1 ships:** Instrumentation + shell (metering surface area vs T5); threshold calibration at +30d. Phase 2.2 enforces cap.

---

## 5. Cross-Cutting Governance

### 5.1 Hard-Stop Matrix (per-feature citation)

| Workstream | HS |
|------------|----|
| W1 dashboard filter | HS-2, HS-3, HS-6, HS-9 |
| W2 study-plan bridge | HS-2, HS-4, HS-8 |
| W3 confusion heuristic | HS-1, HS-5, HS-4 |
| W4 micro-lesson | HS-1, HS-5, HS-7 |
| W5 Socratic | HS-4 |
| W6 degradation indicator | HS-5 |
| W7 telemetry | HS-6, HS-9, HS-10, HS-3 |
| W8 buffer (deferred) | HS-6, HS-10 |
| W9 circuit-breaker | HS-10 |

Any HS violation → halt workstream, file defect, escalate to board per §10.1.

### 5.2 Defect-Library Lineage (per §9.1)

All workstreams respect: DL-051 (case `Correct` semantics), DL-049 (no P2 drop — T1), DL-035/DL-036 (no silent-empty — T1), DL-022/DL-014 (persistence corruption), DL-047 (semantic gap — T2/T3), DL-045 (positive-evidence for chaos testing). DL-060 (T6) pre-registered — see §6.

### 5.3 Metric Refinements (per §11.6)

- Confusion uptake: baseline +20pp OR ≥50% whichever lower; re-target +60d (T3 split informs).
- Defect rate: 0 new defects where root cause = May output side-effects on pack/case/scored file state, verified by validator suite + guard.
- P2 coverage depth: P2 items attempted per learner ≥ [N] (N at +30d baseline).
- Agent helpfulness: per-invocation confidence ≥0.65 on subset.

---

## 6. DL-060 Pre-Registration (per user decision 2026-09-20)

**Verdict:** Pre-register now as Medium, 3 sub-classes A/B/C. Severity upgrade on defect-surfacing event.

| Sub-class | Signal | Filing trigger |
|-----------|--------|----------------|
| A — Undetected degradation | `degraded[]`/`fallbackBehavior`/`_fallback` fires but no learner indicator | T6 rate > threshold with 0 indicators |
| B — False indicator | Indicator shown but no backend fallback | Indicator without `degraded[]` evidence |
| C — Degradation without telemetry | Fallback fires but T6 not recorded | `degraded[]` without T6 event |

Entry to be filed in `knowledge/DEFECT_LIBRARY.md` on the next Full-Governance content session or immediately if a surfacing event occurs in Phase 2.1. This design pre-registers the candidate; DL filing is a separate REVISION_HISTORY entry.

---

## 7. Open Decisions — Resolved Record (2026-09-20)

| Q | Decision | Net cost |
|---|----------|----------|
| **Q1** | Live-only for 2.0+2.1; persistence revisit in 2.2 pending 30d telemetry (T5) | Zero new code in 2.1 for buffer |
| **Q3** | Opt-out practice / opt-in exam-integrity (board-accepted stance) | Zero new code in 2.0 (already this behavior); 2.1 ships discoverability explainer |
| **HS-10** | Both signals — time-delta primary, abandonment secondary — 7-day circuit-breaker; threshold numbers at +30d baseline | 2.1 ships instrumentation + shell; 2.2 enforces cap |
| **DL-060** | Pre-register now (A/B/C, Medium) | 2.1 ships indicator + T6; severity upgrade on surfacing event |

All four carry zero new code in 2.0; Phase 2.1 ships instrumentation/shell/indicator/explainer; +30d establishes numeric thresholds.

---

## 8. Authorization Checklist (per-workstream, before code)

For each workstream, the implementing session must have:

- [ ] User-provided token `may_v2_1_<workstream>` cited in `REVISION_HISTORY.md` entry
- [ ] Lane declared (Light per this doc unless a pack/case/state write forces Full) per AGENTS.md §9.1
- [ ] Backup taken if touching a pack/case file per `knowledge/BACKUP_PROTOCOL.md` (not expected for these Light workstreams)
- [ ] HS-* cited for every feature in the change-set
- [ ] Source-file line numbers cited for any state claims (per this §3 table)
- [ ] T1–T6 instrumentation verified where applicable
- [ ] `npm run smoke` PASS if `app/may/**`/HTML/CSS touched (Light Lane Tend)

---

## 9. Deliverable Map

| Deliverable | File | Status |
|-------------|------|--------|
| D — Replan amended (C1/C2/C3 + source corrections D1–D4) | `reports/MAY_PHASE_2_REPLAN_20260920.md` V2.1 | Done — backup `.bak-20260920205357`, §11 appended |
| E — §11 Phase 2.1 V2.1 Design Additions | Same file §11 | Done — T1–T6, D1–D4, HS-1–10, 6 cross-refs, 4 metric refinements |
| F — REVISION_HISTORY log | `knowledge/REVISION_HISTORY.md` | This design's entry + DL-060 note |
| G — This implementation-ready sub-doc | `reports/MAY_PHASE_2_1_DESIGN_20260920.md` | This file |
| H — Token list + readiness verdict + next-step | §10 below | — |

---

## 10. Ready-for-Code Verdict + Next Step

### Per-Workstream Token List (copy-paste for authorization)

```
may_v2_1_dashboard_filter
may_v2_1_study_plan_bridge
may_v2_1_confusion_heuristic
may_v2_1_micro_lesson
may_v2_1_socratic_guard
may_v2_1_graceful_degradation_indicator
may_v2_1_telemetry
may_v2_1_conversation_buffer   (deferred to 2.2 — do not authorize in 2.1)
may_v2_1_cognitive_budget
```

### Verdict

**Ready for code authorization — per workstream.** The design lane (§10 blockers C1/C2/C3) is closed. No workstream may begin code without its specific token in a `REVISION_HISTORY.md` entry. W1–W7 + W9 are implementation-ready for Phase 2.1 upon token. W8 is deferred to Phase 2.2.

Light Lane drift signals (AGENTS.md §13.1) apply to all code sessions: app.js hash mismatch, agent self-report conflict, registered-artifact gaps. The 21 BLOCK rules do not trigger on this design lane but apply to any Full-Lane content work downstream.

### Next-Step Decision the User Must Make

**Authorize the first workstream token** (recommend starting with `may_v2_1_telemetry` or `may_v2_1_dashboard_filter` — both are pure Light Lane, zero content risk, and unblock T1–T6 instrumentation) **or** direct a different workstream order. Provide the token string verbatim (e.g., "authorize `may_v2_1_telemetry`") to open that workstream's code session.

---

*Last updated: 2026-09-20 — May Phase 2.1 V2.1 implementation-ready design, per board conditional-proceed verdict.*
