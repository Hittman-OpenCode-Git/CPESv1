# BOARD MEETING — Top-10 Issues Secret Ballot, Debate, and Project Lessons

**Date:** 2026-10-18 · **Type:** Board review (issue-identification exercise, secret ballot + independent tally)
**Trigger:** Chairwoman directive — reconvene the board, run a secret ballot in which every member documents their 10 biggest issues with the project to date, have an independent tallying agent produce the top 10 by vote, then debate the top 10 and extract 5 clear lessons with remediation advice.
**Presiding:** Release Manager · **Attendees (9 voting personas):** Accountant, Editor, Reviewer, Psychometrician, Case Author, JavaScript Architect, Validator, Release Manager, Student
**Method:** Each ballot was written blind (members did not see each other's lists). Ballots were sealed in a working file, normalized and tallied by an independent general agent with full mapping provenance. Top 10 then returned to the floor for debate. 90 nominations processed → 61 distinct families → top 10 selected.

---

## PART 1 — The Nominations (as submitted, ranked)

### Ballot 1 — Accountant
1. Wrong answer keys shipped as Certified — 3 Section-E items with inverted keys and explanations that refuted the stored key, including a Gold Standard exemplar (DL-070).
2. Five Certified case items with genuinely wrong keys (LCM/NRV confusion, variance sign/magnitude, wrong multi keys) found only by post-certification adjudication (DL-065).
3. 539 occurrences of wrong-slot explanation contamination — the largest content defect ever measured (DL-008).
4. One case whose Q2 and Q4 stored keys used mutually exclusive rebate treatments — two keys on one fact pattern that could not both be right (DL-069).
5. A wrong multi-select key survived three certification waves ({1,3,4} vs statement 3 only) — the HIGH-confidence six-dimension gate certified a wrong key (DL-066, CBQ4-D3-Q3).
6. Unattributed bulk quarantine demoted 31 P1 cases legit-certified, destroying content state with no per-item evidence review (DL-066 exposure/DL-P2-023 class).
7. Governance libraries recorded stale live assertions that later false-failed after authorized flips (L-05).
8. Certification never required independent hand-solve of the key itself (CAQS §5.1 practice gap).
9. AccountingPrinciple free-text, no controlled vocabulary; EV3 enforced only for certification-era items (CAQS §4.3).
10. Exhibit internal-consistency (§3.4) and no-decorative-data rules enforced only by reviewer discipline (QMS Part 5).

### Ballot 2 — Editor
1. Generic boilerplate explanations in the learner pool — 45 P1 case items (7 wholly filler, 29 Certified) plus P2 sibling; survived because no screen existed and scans stayed inside declared boundaries (DL-067/DL-P2-026).
2. Prompt-stated constraints drift from stored keys — "two-word term" prompt on a three-word answer; no prompt–key validator (DL-068).
3. Present-but-empty distractor feedback — formatting compliance masquerading as content compliance (DL-026).
4. Trailing filler defeats explanation-length floors; word-count gates measure effort, not substance (DL-067 tier 2).
5. Choice-text hygiene floor catches whitespace fragments/sub-8-char slots only post-ship; three regex families for one editorial defect class (Rules 15/18).
6. Lead-in polarity mismatches needed a guard rule; editorial QA cannot rely on post-hoc regex (Rule 9/DL-037).
7. Stem/choice lexical overlap masking cognitive relaxation; 40%-overlap check displaces burden without a design-stage tool (S122 AF-A1).
8. Editorial review authority routinely overridden by accountant/validator triage order in practice (COLLABORATION_MATRIX reality).
9. Multi-pack terminology drift; glossary enforcement not in the validation loop.
10. CAQS §4 explanation standard authored retroactively; 1,000+ pre-standard items never received an editorial sweep (CAQS §15.1 backlog).

### Ballot 3 — Reviewer
1. Verifier pointed at masked-snapshot bytes instead of the live pack — repeated false failures; repairing tooling, not content (DL-066 B1/DL-011).
2. Subagent self-reports circulated as fact — three false "verified %" claims nearly closed a batch on fiction (L-01).
3. No verifier control set: no standing rule that a failure detector must pass known-good and fail seeded-defect samples (L-03).
4. Defects discovered but left in chat/session reports without DEFECT_LIBRARY entries (DL-019/DL-020 pattern).
5. Count instability (128→112→138) nearly drove action on wrong numbers; methodology reconciliation not automatic (§6 origin, DL-012).
6. Third-party handoff dispute: 730KB pack silently indexed at ~89/160 items; days lost; §18.2 protocol formalized only afterward.
7. Screen-flag calibration churn: same items, different flag sets across tool versions (DL-051 v1/v2).
8. Attribution boundaries blur — certification batches absorbed content-repair stories; recorded-state provenance discipline arrived late (L-09/L-05).
9. Screen output was used as remediation authority before DL-045; mass-rewrite incidents followed.
10. No single per-item workflow ledger; RACI documented, artifact trails session-local only.

### Ballot 4 — Psychometrician
1. 58.7% cognitive misclassification on Part 1 HO-labelled items (309/528 labeled by rotation position); recovery cost 6+ Full-Governance sessions (S121/§17.3).
2. The False Positive Library catalogs 28 overstatement exemplars — labeling inflation was systemic (S122).
3. Difficulty floors for HO labels not enforced before S122: Analyze/Evaluate items at Easy difficulty; back catalog unreconciled.
4. Whole-item clones with re-suffixed Topics defeated the rotation-clone gate; Jaccard-only screens missed traded pairs (DL-074/§19.4/DL-048).
5. Distractor padding/value distortion surviving multi-wave certification (DL-046 family, $1,364,000 precedent).
6. 431 certified-state case flags persist; the 110-flag family measured ~98% FP requiring hand-adjudication (DL-047/DL-065/DL-070-A).
7. Wrong-slot explanations are exam-integrity leaks when Certified content exposes cueing text (DL-008/026).
8. Answer-position governance enforced only pre-certification; no runtime/adaptive assembly support (S121 §6).
9. Psychometric telemetry fields schema-present, data-empty — no pilot response data (CAQS §7.3).
10. Case-pack difficulty drift (CF4 ±1 rule) lacks pooled cross-case variance monitoring.

### Ballot 5 — Case Author
1. Case-scoped boilerplate crisis: DL-067's 45-item family shows case waves were certified three times without checking explanation substance inside cases.
2. Scenario authenticity regressions: "Company XYZ"-style textbook openings survive in early packs, grandfathered without an anti-AI-pattern sweep (CAQS §3.8).
3. Item independence after a missed earlier item is inconsistently honored (CAQS §3.3).
4. Cognitive progression within cases inconsistently sequenced (§3.5 violations).
5. Exhibit decorative-data rule fails on legacy exhibits; ReferencedBy arrays incomplete (QMS Part 3).
6. EstimatedMinutes plausibility (CF5 0.7-divisor) inconsistently honored; timing estimates vary wildly for matched shapes.
7. Bank-of-record fragility: banks 4/5 retired 6 weeks after shipping; consolidation required a survivor-equivalence map (DL-P2-024, L-06).
8. Case-level Version/RevisionHistory discipline: live content at 2.x sits in cases still stamped 1.0; migration lanes never fully run.
9. The "dual marketplace": S122-pattern-era cases are structurally different maturity from legacy banks.
10. Authoring-time governance tax: every wave pays a growing constant (manifest, cognitive gates, screens, clone gates, Rule 11 calibration) but no tooling performs it at author time — defects surface only later, expensively.

### Ballot 6 — JavaScript Architect
1. The browser-injection runtime path was never exercised in an automated test — the loader bug made P2 impossible in a browser while every Node/VM-harness gate said PASS (DL-073/L-10).
2. Load design never modeled the const/let vs var binding split across static-and-lazy injection regimes (DL-073).
3. app.js is a 500KB monolith with no unit-test architecture; key behaviors only exercisable through full-suite smoke or full-file parse.
4. `pausedElapsed` declared-but-never-read masked the pause-timer defect for an extended period; no lint for dead runtime-critical state (§19.1).
5. Two HTML entry surfaces (index_updated.html vs dev-shell) carry different binding regimes; manifest drift risk between editors.
6. var/const era mixing across P1 static/P2 lazy banks; the loader follow-up (P1 static loading is unGATED today) remains open.
7. Validators read 3,050+ objects via Function-constructor eval — a runtime-eval error inside one valid-syntax object slips through to runtime only.
8. OneDrive working directory: file-locking/sync-latency hazards on every 2.8MB pack write.
9. Playwright smoke exists but no harness-equivalence assertion (browser vs vm); one-shot page checks only.
10. Bank retirement leaves typeof-guarded no-op branches at consumer sites — tech debt requiring discipline to prune (R-01 lineage).

### Ballot 7 — Validator
1. Verifier self-validation debt: DL-066's verifier had 3 independent bugs; the project lacked a standard seeded-defect control (L-03/A-04).
2. 431 certified-state case flags persisting — item-by-item adjudication only, backlog unbounded without a systematic wave (DL-070-A).
3. Known-noise ceiling: 10,716 tolerated warnings will mask genuine new-warning regressions (DL-064).
4. Single-source-of-truth drift: baseline docs needed `--fix` 3× in one day; derived registries regenerate out of date (Rule 7 lineage).
5. Coverage assertions arrived late: pipeline acceptance ran without full scanner coverage for a period (DL-044/049/050 family).
6. Pack-manifest wiring lacked a tripwire until this session — critical wiring with two eras and no discriminator check (DL-073 scope).
7. DL-012-style count instability: §6 is written discipline, not automated three-run stabilization tooling.
8. Duplicate detection surfaced in the runtime panel but no validation gate existed before; identity checks scattered across screens (DL-074).
9. §3 backup protocol enforced by write-guard only for some file types; JSON/pipeline script writes lack the same guarantee.
10. §11.1 root-hygiene permitted-list enforcement still manual (A-05-style backlog flag).

### Ballot 8 — Release Manager
1. The v2.0.0 tag was pushed on materially false claims — the repo's own release artifact asserted work not yet true (L-08).
2. No Release Plan v1.0: tags, release gates, rollback posture, hotfix flow all informal; go-live is minutes-based, not plan-based (§8.2).
3. The §3.1 deletion incident: an uncommented fs.unlinkSync deleted 13 files, application file included, with no backups (2026-07-28).
4. Source-tree hygiene: .bak and scratch files accumulated in content directories; gitignore policy came last (L-07).
5. Report sprawl: 200+ session reports with no index; finding precedent requires remembering sessions.
6. Governance library fragmentation: two defect libraries, two baselines, dual revision histories — single-source-of-truth is aspirational (Rule 7).
7. Commit hygiene: 30+ file mixed-domain commits, no template, hard to bisect content regressions.
8. Branch-protection bypass norms: pushes log "Bypassed rule violations"; release confidence rests on bypass behavior, not green checks.
9. VERSION file 3-part semver vs case 2-part semantics documented as non-conflicting but consumer confusion persists (P2002 §e).
10. Delivery-pool guarantees live in app code paths (state filters at every consumer), not a data layer (DL-071 lineage).

### Ballot 9 — Student (learner perspective)
1. The exam would actually malfunction on launch until a learner reported a cryptic banner — worst experience failure to date (DL-073).
2. I can be told a wrong answer is correct — inverted keys with confident wrong explanations (DL-070).
3. The same identical item scheduled twice in one roster wastes slots and coverage (DL-074).
4. Some feedback tells me nothing — present-but-empty distractor explanations fill the panel without substance (DL-026).
5. Some answers teach nothing — 7 wholly-filler explanations leave "= 10,400" and no reasoning (DL-067).
6. My correct answer was rejected — SDLC fill item penalized correct phrasing due to a prompt/word-count mismatch (DL-068).
7. Paused time counted against my timer — pauses silently burned remaining exam time (pause-timer bug, 2026-08-31).
8. Clone-style repetition in the same session reduces study value (DL-048 rotation family).
9. Wrong topical feedback: a variance analysis explanation on an SDLC answer (DL-026/P1E-F-001 class).
10. Bloom's labels say Analyze/Evaluate but too many questions are recall-in-costume (S121/S122).

---

## PART 2 — Independent Tally (by the general tallying agent; board reviewed the mapping)

**Method summary.** All 90 nominations read; merged into 61 families strictly by underlying failure mechanism (same mechanism = same family, even across personas; content vs process never merged; borderline calls kept separate and logged). Scores: raw votes (shared defect-class nominations) primary; Borda points (rank 1 = 10 … rank 10 = 1) as tie-break. Ties at ranks 9–11 (2 votes / Borda 14 each: FLAG-BACKLOG, INJECTION-DESIGN, PROMPT-KEY) broken deterministically by alphabetical order; PROMPT-KEY fell to rank 11 and is recorded as the first alternate.

**Ambiguity calls logged by the tally agent (panel did not overturn):** DL-069 joined the wrong-key family (mechanism: wrong stored key) rather than a separate "internal consistency" family; the §19.1 event split into a lint gap (JS) and a runtime defect (Student); manifest-eras drift split from binding-regime design; the duplicate gate gap split from the clone content family; B3-1 (stale bytes) split from B7-1 (no control set) as tooling-correctness vs verification-discipline.

### TOP 10 RESULTS

| Rank | Family | Votes | Borda | Contributing personas | Evidence cited |
|---|---|---|---|---|---|
| 1 | Wrong answer keys shipped as Certified | 5 | 41 | ACC ×4, STU | DL-070, DL-065, DL-066 (CBQ4-D3-Q3), DL-069 |
| 2 | Cognitive-label inflation (HO terms without HO demand) | 5 | 32 | ED, PSY ×3, STU | S121/§17.3, S122 FP library, AF-A1, difficulty floors |
| 3 | Boilerplate/filler explanations certified and delivered | 4 | 33 | ED ×2, CA, STU | DL-067, DL-P2-026 |
| 4 | Clone/duplicate items defeat detection, reach delivery | 3 | 18 | PSY, STU ×2 | DL-074, DL-048, §19.4 |
| 5 | Wrong-slot explanation contamination | 3 | 14 | ACC, PSY, STU | DL-008, DL-026 |
| 6 | P2 browser loader failure (harnesses passed) | 2 | 20 | JS, STU | DL-073 |
| 7 | Verification tooling lacks control-set discipline | 2 | 18 | REV, VAL | L-03, A-04 |
| 8 | Present-but-empty distractor feedback slots | 2 | 15 | ED, STU | DL-026 |
| 9 | Screen-flag adjudication backlog | 2 | 14 | PSY, VAL | DL-047, DL-065, DL-070-A |
| 10 | Injection-regime design gaps (const/var across static/lazy) | 2 | 14 | JS ×2 | DL-073 root + follow-up |

**First alternates (excluded by tiebreak):** PROMPT-KEY (DL-068, 2/14), DISTRACTOR-TEXT (DL-046, 2/12), MANIFEST-DRIFT (2/11), STALE-STATE (L-05, 2/11).

---

## PART 3 — Open Debate on the Top 10

### Item 1 — Wrong answer keys shipped as Certified (5 votes, rank 1)
**Positions.** Accountant: the root failure is that certification has audited *explanations around the key* while the key itself was never independently re-solved at certification time — four of the ten most serious key incidents came from certified-pool content. Student-second: an inverted key with a confident wrong explanation is worse than a crash — it teaches the wrong lesson. Psychometrician: three of these incidents passed multi-wave certification and one was a Gold Standard exemplar; the "curated content" assumption itself is now evidence-humbled. JavaScript Architect: notes the delivery layer cannot compensate — delivery transfers the key verbatim; no runtime rescue exists.
**Tension.** Validator: a mandatory hand-solve attestation at certification for every item increases certification cost materially — the 163-item DL-066 hand-solve wave was an entire session. Accountant (counter): certification us the *only* gate that claims "learner-trustworthy"; if it doesn't solve, it doesn't certify — cheap-but-wrong is the expensive option, as DL-065/DL-070 already proved in repair sessions.
**Synthesis.** Board adopts the hand-solve standard: no future batch may flip Certified without a documented independent re-solve per key (or an explicit batch-level exemption that documents the verification basis used instead, e.g., verified-at-authoring lineage) — formalized as **A-07**. Rule 16 stamps extended to record the hand-solve basis.

### Item 2 — Cognitive-label inflation (5 votes, rank 2)
**Positions.** Psychometrician: the 58.7% misclassification wave is the most expensive quality fix in project history; the demand-check discipline (definition match, stakeholder check, decomposition check, difficulty floor) must apply at authoring, never after. Editor: overlap-oriented heuristics (AF-A1 <40%) gently punish appropriately-wordy correct stems — the check is a screen, not an identity test. Student: label inflation is the quiet killer — study time allocation is built on those labels.
**Tension.** Case Author: authoring-time cognitive gates exist but add friction; Rule 12 already forbids relabeling — will gate-less authoring just move the defect later? Validator (counter): gates are cheap if they run in the wave harness pre-certification rather than screens post-certification; the expensive point is later.
**Synthesis.** Board directs an authoring-time cognitive gate (structure-level, screen-free-of-FP-risk per §A-08): the S122 checklist becomes a pre-commit checklist in any future authoring wave; certified-era **mislabels are never silently relabeled** (Rule 12 reaffirms) — fix through new authoring instead.Logged as **A-08**.

### Item 3 — Boilerplate/filler explanations certified and delivered (4 votes, rank 3)
**Positions.** Editor: EV1/EV2 + screen D closed the class detection-side; the deeper problem is that authoring waves were certified without *reading the explanations* — the checklist existed but was treated as mechanical. Case Author: the wave checklists keep growing; boilerplate was the byproduct of template pipeline velocity, not laziness. Student: the 7 wholly-filler items were a learner-safety failure in every sense (DL-067 table).
**Tension.** Validator: screen D is now pipeline-mandatory; adding more explanation-quality screens drifts toward LLM-in-the-loop territory. Editor (counter): quality checks do not need LLM judgment for boilerplate — phrase-family detection + real-content word floors are deterministic; fine as validation-layer rules.
**Synthesis.** Keep screen D as institutional; no expansion into semantic explanation scoring (LLM-based checks remain adjudication-class, per DL-045). Log a content-lineage note: future authoring templates must ship with a substantive-explanation floor — boilerplate vacuousness treated as certification-blocker per §9.4.1 (already law; the lesson is adherence).

### Item 4 — Clone/duplicate items defeat detection (3 votes, rank 4)
**Positions.** Psychometrician: the DL-074 Topic re-suffix is the canonical defeat of a weak identity key; Jaccard-only checks missed sibling twin families first (DL-048). Student: the symptom is modest (duplicated seat slots) but wasteful and quality-killing.
**Tension.** Validator: a normalized-stem hash (A-03) adds an explicit identity signal; the trade is that some near-identical items in a rotation family share stems legitimately — the gate must distinguish declarative duplicates from revision twins. Accountant: duplicated content is worse than one missing item; a slightly-op-consumer gate is fine.
**Synthesis.** A-03 priority raised: add normalized-stem hash to the §19.4/P2 clone-gate identity key and a P1 equivalent; gate treats Topic-suffixed twins as duplicates; per-existing precedent, archived items excluded.

### Item 5 — Wrong-slot explanation contamination (3 votes, rank 5)
**Positions.** Accountant: the 539-item DL-008 sweep proved the class was template-wide; Rule 2/6/10 now guard it. Psychometrician: present-but-empty (026) is a *positive inversion signal* — DL-070's three inverted keys all surfaced that way; never auto-clear. Student: wrong-topical feedback is a fairness issue, ranked the same as wrong keys mentally.
**Tension.** Editor: enforcement works both ways — rules 6/10 distinguish presence vs absence carefully; screens already tie-slot (EC-stem mismatch screens) to catch wrong-topic assigns.
**Synthesis.** No relaxation; standing zero-tolerance for the class on Certified content; DL-047-A adjudication (A-05) covers the remaining family scan. The §9.4.1 topic-mismatch BLOCK stays.

### Item 6 — P2 browser loader failure (2 votes, rank 6, high Borda)
**Positions.** JavaScript Architect: the harnesses were never truly equivalent to the runtime — the injection path is browser-side; this is the DL-073 lesson, not the DL-071 lesson. Student: this was a *shipping product* dead until a learner reported it — telemetry here is unacceptable.
**Tension.** Release Manager: a browser-path smoke means standing test infrastructure for a file:// app — Playwright already exists; the cost is small. Validator: probe must not fetch an offline podded environment into a browser context — keep browser smoke to injection/delivery assertions only.
**Synthesis.** A-01 confirmed at priority(Med): the smoke extension is scoped to P2 activation (bank manifest injection, globals resolution, one MCQ + one case render), not full E2E.

### Item 7 — Verification tooling lacks control-set discipline (2 votes, rank 7)
**Positions.** Reviewer: DL-066's verifier bugs made verification *the* bottleneck — false negatives consumed weeks. Validator: a parallel false-positive path (missing screens) also exists — controls in both directions.
**Tension.** Validator vs Editor: heavier checklists vs faster cycles — the board previously blessed "assert-before-write-is-success" culture; the shared view: verification controls do not slow work, buggy verifiers do.
**Synthesis.** Adopt A-04 as a standing rule: any new verify/ledger script ships with (a) a known-good sample that passes and (b) a seeded-defect sample that fails, evidence recorded in its debut session.

### Item 8 — Present-but-empty distractor feedback slots (2 votes, rank 8)
**Positions.** Editor: DL-026 enforcement is mature; the residue is adjudicating *new* hits. Student: the reply quality matters almost as much as the key itself — "empty panel" is a trust burn for the learner.
**Tension.** Validator: Rule 6 vs Rule 10 splits are subtle (presence vs absence); the rule-boundary education is institutional, fine; nothing structural remains beyond diligence.
**Synthesis.** No further action beyond the standing adjudication discipline; recorded as permanently monitored-class.

### Item 9 — Screen-flag adjudication backlog (2 votes, rank 9)
**Positions.** Psychometrician: 431 certified-state case flags is the largest standing review debt; DL-047's ~98% FP verdict did not mean "ignore it" — DL-070 proved inversion carriers live inside flag families. Validator: backlog can be safely wave-planned (DL-047-A) but not swept; no auto-remediation (DL-045).
**Tension.** Release Manager: big backlogs decay trust; a dated plan beats an unbounded pile. Accountant: adjudication must remain hand-solve; throughput claims of 100s per session were already disproven once (L-01).
**Synthesis.** A-05 schedule bound: DL-047-A wave with a defined per-session wave size (e.g., 30-item Rule 5 batch), ownership Validator+Accountant, evidence file per wave; completion target — before the next release tag (ties into A-06).

### Item 10 — Injection-regime design gaps (2 votes, rank 10)
**Positions.** JavaScript Architect: static `var` era vs lazy `const` era; the loader fix resolves through the lexical record, so both regimes pass today, but every future manifest edit remains a hazard without a regime check. Reviewer: the lack of a browser test (Item 6) is the same root; no further structural split needed.
**Tension.** Validator: doing regime-specific checks per-file risks divergence; one central manifest-consumer gate is simpler (already exists in tripwire form for shims).
**Synthesis.** Document the binding-regime doctrine in `governance/RUNTIME_CHANGE_CONTROL_POLICY.md` (bank globals must be `var` OR manifest must go through Function-constructor verification — today covered), and fold the audit into A-01's browser smoke. Logged as **A-09** (doc-only).

---

## PART 4 — Five Clear Lessons from the Project (Board Distillation, E-01 … E-05)

### E-01 — Certification is only as strong as its weakest verification.
The project's worst content incidents (DL-070, DL-065, DL-069, CBQ4-D3-Q3) share one property: the content was certified on explanation quality and metadata discipline, while the **key itself** was never independently re-solved at certification. Even a Gold Standard exemplar carried an inverted key — curation silence, not curation safety.
**Remediation advice:** Every future certification batch includes a per-key independent hand-solve attestation (A-07). Batch-level verification-basis documentation replaces "HIGH confidence" as the operative standard. Adjudicate — never assume — curated content.

### E-02 — Screens find; humans decide.
The DL-047 family produced ~110 flags at ~98% false-positive rate — while still containing genuine inversion carriers (DL-070). Every screen is simultaneously the project's best detector and its greatest false-alarm risk; the DL-045 no-auto-remediate doctrine exists because screens *cannot* weigh evidence.
**Remediation advice:** Retain rule: screens emit evidence only; every remediation cites an independent basis (Rule 17). Budget adjudication waves explicitly (A-05), with per-wave caps. Each new screen ships with its documented false-positive set — a screen without a documented FP set is presumption, not evidence.

### E-03 — Verification tooling is code, and code without controls is a liability.
DL-066's verifier had three independent bugs — each alone sufficient to produce false failure — and consumed multiple sessions before detection. Symmetrically, DL-073 showed harnesses that *bake in* the failure mode (Node/VM only) produce confident PASS while the product is broken. Both false negatives and false positives cost more than the work they gate.
**Remediation advice:** Standing rule (A-04): every new verify/ledger/screen script debuts with a known-good control that passes and a seeded-defect control that fails, evidence recorded at intro. Harness results whose environment differs from the user-visible runtime must state "environment-conditional PASS" (L-10) until the runtime path itself is exercised (A-01 browser smoke).

### E-04 — Trust is asymmetric: agent-speaking is not agent-solving.
Three subagent self-reports ("44/44 verified", "0 mismatches", "16/34 verified") were each contradicted by raw evidence. Meanwhile, as currently run, claims of a passing project survive on *other tools that have never failed a suspect item* — the SHARED failure of both states is that neither was measured with first-party executable evidence (L-01).
**Remediation advice:** §5 dual verification + L-01 standing rule: subagent session summaries are hypotheses to verify, never evidence. Reasonable automation burden targets: ~2 tool-runs per certification claim made by/for a session machine whose full evidence path exists.

### E-05 — The cost of late process is the pattern that produces every major fix.
The backup protocol (§3), destructive-script authorization (§3.1), dual verification (§5), count-stability (§6), no-auto-remediate (DL-045), third-party handoff protocol (§18.2), tag discipline (L-08), and today's A-04/A-07/A-08 were ALL authored *after* an incident. The project has never lost a fight because it over-governed; it has repeatedly lost (or nearly lost) content because process arrived post-hoc.
**Remediation advice:** Where a rule says "there is no rule until a precedent," make pre-authoring the default: run authoring waves with the wave-harness pre-loaded with the checklist (e.g., Rule 11 calibration items, explanation-substance floor, cognitive demand-check, guard suite) rather than authoring-first-audit-later (A-08). Institute Release Plan v1.0 so release posture lives in a plan rather than accumulated pain-memory (A-06/A-10).

---

## PART 5 — Consolidated Action Register (this meeting, A-01 … A-10, cumulative)

| # | Item | Owner | Due | Sourced From |
|---|---|---|---|---|
| A-01 | Browser-path smoke extension: P2 activation (injection, globals, one MCQ + one case render) | JS Architect | Next tooling wave | DL-073, Item 6/10 |
| A-02 | (Standing, user-disposed) Runtime-side ingestion of JSON blocklist manifest | Validator | Backlog | DL-071 |
| A-03 | Clone-gate identity hardening: normalized-stem hash (P2 + P1 equivalent) | Validator | Next tooling wave — **priority raised today** | DL-074, Item 4 |
| A-04 | Standing rule: every new verify/ledger script debuts with known-good PASS control + seeded-defect FAIL control | Validator | Next tooling wave | L-03, Item 7 |
| A-05 | DL-047-A adjudication wave (per-session Rule-5 caps, evidence file per wave); complete before next release tag | Validator + Accountant | Next content wave | Item 9 |
| A-06 | Release Plan v1.0 + tag decision (v2.0.1) with verified claim-set body | Release Manager | Next 2 sessions | Items 1/6, lessons E-05 |
| A-07 | Certification batch hand-solve attestation (per-key independent re-solve or documented verification-basis exemption); Rule 16 stamps record the basis | Validator + Accountant | Immediate (effective next batch) | **New** — Item 1 |
| A-08 | Authoring-wave pre-commit cognitive gates: S122 checklist becomes authoring-harness items; no post-cert relabeling except §17.3 route | Psychometrician | Next authoring wave | **New** — Item 2 |
| A-09 | Binding-regime doctrine documented in RUNTIME_CHANGE_CONTROL_POLICY (var-vs-const bank globals; Function-constructor loader rule) | JS Architect | Doc-only, next wave | **New** — Item 10 |
| A-10 | Board-minutes consistency: evaluate consolidating DEFECT_LIBRARY / DEFECT_LIBRARY_P2 and dual baselines into the hereby-established one-closeout-per-family pattern (or retain, with an index) | Reviewer | Backlog | Vote-record continuity, Item 8 lineage |

---

## PART 6 — Vote Record (Personas) — this meeting's resolutions

- **Accountant:** endorses Item 1 synthesis (hand-solve standard); notes the DL-069/Q2-remediation is an Item-1 class poster-child.
- **Editor:** endorses Items 3/5/8; opposes semantic LLM scoring in validation; boilerplate remains a certification-blocker.
- **Reviewer:** endorses L-01 as **the** institutional fix of the cycle; justified all cautionary subagent-declarative claims to have controls added in-tool.
- **Psychometrician:** endorses Item 2 as top-2 priority and stands with Item 9; points to A-05 for wave-bound discipline.
- **Case Author:** endorses A-08; leans toward "authoring-gate" (pre-commit) rather than taller checklists.
- **JavaScript Architect:** endorses Items 6/10 dispositions and A-01/A-09; flags monolith architecture as a longer-term ballot-1-class risk leading to Item 8-style drift.
- **Validator:** endorses A-03 priority bump and A-04 standard; commits to evidence files per A-05 wave.
- **Release Manager:** endorses A-06/A-07; the 2026-10-18 emergency review and this ballot-meeting together resolve the Part 2 go-live direction — unless a new defect-triggered event occurs, the next scheduled board is the A-05 completion review.
- **Student:** endorses Items 1, 3, 4, 5; flags the topic-mismatch feedback (DL-026/P1E-F-001 family) and the pause-timer accuracy fix as "resolved, keep vigil."

**Minutes closed by the Release Manager. Next board: A-05 completion review, or the next defect-triggered event.**
