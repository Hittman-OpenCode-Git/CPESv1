# Codebase Audit — CMA Part 1 Simulator & Part 2 Readiness

**Date:** 2026-08-03
**Lane:** Governance Light (read-only; no pack/case/app writes)
**T0 evidence:** `npm run preflight` → PASS, 0 divergences, 2,451 certified, governance guard 66/66
**Scope reviewed:** `app/app.js` (7,824 lines / 429 KB), `content/packs/pack_[a-e]_corrected.js`, `content/cases/case_pack_[1-3]_corrected.js`, `index_updated.html`, `styles.css` (6,880 lines / 151 KB), `p2/pack_p2_a.js`, `foundation/P2001_PART2_BLUEPRINT_FOUNDATION.md`, `scripts/preflight.js`

---

## 1. Architecture Snapshot

| Layer | Implementation | Part-agnostic? |
|-------|----------------|----------------|
| Delivery shell | `index_updated.html` — 40 `<script>` tags, no bundler, no modules | ❌ hardcodes 5 P1 pack paths + 3 case packs |
| Content | Global `var MCQ_BANK_A…E`, `const CASE_PACK_1..3` + alias consts | ❌ global-namespace, Part-1 named |
| Engine | `ExamSessionManager` (~1,650 lines), `scoreMCQ`, `practiceScores`, `NavigationController`, `SessionPersistence`, `AnalyticsCollector` | ⚠️ mostly agnostic logic, Part-1 constants inlined |
| Analytics/coaching | `PerformanceAnalytics`, `ReadinessModel`, `ReviewCoach`, 30-file `app/may/*` layer | ⚠️ `SECTION_INFO` A–F assumed throughout |
| Persistence | `localStorage`, keys prefixed `cmaP1*` + unified `cmaProfile2026` | ❌ P1-scoped keys, single profile namespace |
| Governance | `.opencode/plugins/governance-guard.js` (10 BLOCK rules) + `scripts/preflight.js` | ✅ generalizes; preflight has a hardcoded P1 pack table |

**Pattern:** single-file object-literal "modules" on the global scope, string-template rendering into `innerHTML`, no build step, no tests for app logic (only content/governance scripts + a Playwright smoke test). This is a working, feature-rich monolith — the risk is not quality of logic but *coupling of Part-1 identity into every layer*.

---

## 2. Strengths (keep these)

1. **Scoring engine is structurally correct and centralized.** `scoreMCQ` (app.js:1934) handles single/multi/match uniformly; `practiceScores` (app.js:3205) applies fixed 75/25 MCQ/CBQ weighting → 0–500 linear scale → 360 threshold, with an explicit, honest disclaimer block (`CmaScoringDisclaimer`). The MCQ 50% gate (app.js:2585) is implemented as a real hard gate, not cosmetic. All of this is Part-agnostic math already.
2. **Learner-safety pipeline is genuinely enforced at runtime,** not just in docs. `assignTier` (app.js:1068) hard-excludes `Archived`/`In Audit`/`Editorial Queue`, and `_DefectManifest.isBlocked` gates both MCQs and *whole cases* by CaseID or any child ItemID (app.js:2334). This satisfies AGENTS.md §7 in code, and it will carry to Part 2 unchanged.
3. **Deduplication is unusually sophisticated.** `deriveSimilarityKey` (app.js:2380) fingerprints structural templates (strips amounts, company names, dates, units) so template-variant clones can't co-occur; `uniqueByConcept` layers concept-key + stem-core + similarity-key dedup with Tier-1-first ordering so a Certified item always beats an Unprocessed duplicate.
4. **Session durability is well engineered.** `SessionPersistence` has autosave (5 s), checkpoints before MCQ→case transitions, an action journal, backup rotation, and legacy-key migration through `CMAProfileManager`. Resume-after-crash actually reconstructs elapsed time.
5. **Case-study support is complete and richer than most simulators.** 75 cases / 400 items, all `Certified`, five response types (`numeric` 117, `select` 104, `multi` 67, `match` 83, `fill` 29), exhibits, per-item flags, partial credit. Zero items missing a `Correct` key.
6. **Content quality is high and verifiable.** 2,545 MCQs, 2,451 Certified (96.3%), preflight cross-checks counts against `CURRENT_BASELINES.md` and parses every pack via the `Function` constructor.

---

## 3. Defects & Risks (raw evidence)

### R1 — Timer ignores paused time (CRITICAL, functional bug)
`remaining()` (app.js:2564) = `duration - (Date.now() - start)`. `pausedElapsed` is initialized at app.js:2048 and app.js:3770 but **never read or written anywhere** (verified: only 2 grep hits, both initializers). `startTimer` computes elapsed the same way. Effect: pausing a non-exam-integrity session still burns the clock; a 30-minute pause silently destroys 30 minutes of a practice session and can auto-submit it. The pause overlay explicitly promises "Timer… suspended."
**Fix:** accumulate `pausedElapsed` on pause/resume and subtract it in both `remaining()` and `startTimer()`. ~10 lines.

### R2 — Four duplicate QuestionIDs in Pack A (HIGH, content integrity)
`P1-B-016`, `P1-B-022`, `P1-B-070`, `P1-B-036` each appear twice in `MCQ_BANK_A` (500 objects, 496 unique IDs). Preflight counts `"QuestionID":` occurrences (500) so it cannot see this. Downstream impact: `state.answers` is keyed by `QuestionID` — if both twins reach one session, answering one answers the other and scoring double-counts. Concept dedup usually prevents co-occurrence, but that is luck, not a guarantee.
**Fix:** add a uniqueness assertion to `preflight.js` (read-only, no content change), then remediate the 4 IDs under Full Governance Lane.

### R3 — `P1-FD-046` is a malformed item (HIGH, content integrity)
In `pack_d_corrected.js`: `Choices` is empty `{}`, `CorrectChoice` is `undefined`, `UniqueConceptKey` missing. It is filtered out at runtime by the `if (!copy.Stem || !copy.CorrectChoice) continue;` guard (app.js:2246), so no learner harm today — but it inflates the Pack D count to 500 and no validator flags it. It is the sole survivor of a class the pool builder silently swallows.
**Fix:** make preflight report "parseable objects lacking Stem/CorrectChoice" as a divergence rather than letting the app hide it.

### R4 — 116 missing distractor explanations in Packs C and D (MEDIUM)
Non-correct slots empty: Pack C 61, Pack D 55 (Packs A/B/E: 0). This is exactly the class governance-guard RULE 6 / RULE 10 (DL-021/DL-026) exist to block — meaning these predate the rules and were never swept. Packs C/D also hold the only non-Certified content (C: 9 Unprocessed + 36 Archived; D: 10 + 34).

### R5 — Blueprint weighting is duplicated and divergent (MEDIUM, tech debt + Part-2 blocker)
Section weights exist twice: `SECTION_INFO[x].weight` (15/20/20/15/15/15, app.js:24) and a literal `targets = { A:0.15, B:0.20, … }` inside `weightedPick` (app.js:2449). They agree today by coincidence. `weightedPick` also gates on `sections.length === 6` — a hardcoded Part-1 section count that will silently disable blueprint weighting for any Part with a different domain count.

### R6 — Pack↔case mapping is a lie maintained by aliasing (MEDIUM)
There are 3 case packs but 5 UI pack checkboxes, reconciled by `const CASE_BANK_A = CASE_PACK_1; CASE_BANK_D = CASE_PACK_1; CASE_BANK_B/E = CASE_PACK_2; CASE_BANK_C = CASE_PACK_3;` appended to the pack files ("resolves the 0-case display bug"). `getCasePool` then needs a `seenCaseIDs` dedup pass to undo the aliasing it just created. `getCasePool` also references `ENHANCED_CASE_BANK[2-5]_[A-F]` — **30 globals, none of which exist anywhere in the repo** (verified). That is ~15 lines of dead `typeof` guards on every call.

### R7 — Bank enumeration copy-pasted 6× (MEDIUM, the main Part-2 blocker in code)
The literal `MCQ_BANK_A…E` ternary block is repeated at app.js:2232, 5712, 5748, 5862, 5895, 7002 (plus an inline copy inside an `onclick` string at app.js:6833). Adding Part 2 means editing seven sites, one of which lives inside an HTML attribute inside a JS string.

### R8 — Schema drift between Part 1 and Part 2 content (HIGH for Part 2)
`pack_p2_a.js` (100 items, all `Unprocessed`) already diverges from the P1 schema:

| Only in P1 | Only in P2 |
|---|---|
| `SectionName`, `MicroTopic`, `UniqueConceptKey`, `ItemType`, `ItemStyle`, `StudyLinks`, `SourceDescription`, `Part1OnlyFlag`, `ReviewNote`, `certification_date`, `certification_batch`, `VerifiedChecks` | `Part2OnlyFlag`, `Type`, `BlueprintDomain`, `FormulaReference`, `CommonTrapReference`, `Authorities`, `VerificationChecks` |

Three of these are load-bearing:
- **`UniqueConceptKey` absent** → `uniqueByConcept` falls back to `Topic`/`Stem`, degrading dedup quality.
- **`ItemType`/`ItemStyle` absent, `Type` present** → P2 MCQs carry a `Type` field, which is the *same key `scoreMCQ` uses to detect multi/match case items*. A P2 MCQ with `Type: "numeric"` or `"multi"` would be routed down the case-item scoring branch and mis-scored. This is a live collision, not a hypothetical.
- **`VerifiedChecks` vs `VerificationChecks`** — near-identical names, guaranteed to break any shared validator.
- Variable name is `pack_p2_a_questions`, not `MCQ_BANK_*`.

### R9 — Persistence namespace is Part-1-scoped (MEDIUM for Part 2)
`cmaP1SessionState`, `cmaP1History2026`, `cmaP1SeenQuestions2026`, `cmaP1SeenTopics2026`, `cmaP1Dashboard`, plus a single `cmaProfile2026`. Running Part 2 in the same origin without namespacing would cross-contaminate seen-question tracking, history, readiness scoring, and the May learner model.

### R10 — Lower-severity debt
- 83 inline `onclick=` handlers built into template strings, including a ~700-character multi-statement handler at app.js:6833 — unlintable, untestable, XSS-shaped.
- `styles.css`: 151 KB, 1,094 top-level class rules, `.floating-calculator` redefined 16×, `.choice` 11×.
- `scripts/` holds 81,074 lines across ~200 files including `debug_bounds.js`, `debug_bounds2.js`, `debug_brace.js`, `debug_braces.js` — one-off session scripts never pruned.
- Duplicate scoring paths: `scoreMCQ` (MCQ) and `ExamSessionManager.correctCase` (case items) implement the *same* multi/match comparison logic twice with slightly different normalization (`scoreMCQ` strips `[$,]`, `correctCase` delegates to `this.norm`). A future fix to one will miss the other.
- `admin.html` (86 KB) is a second, unlinked application surface with its own inline scripts, outside the smoke test.

---

## 4. Part-2 Separation Verdict

**The engine is ~70% Part-agnostic; the wiring is ~0% Part-agnostic.** That estimate matches `P2001_PART2_BLUEPRINT_FOUNDATION.md` §6, which concluded "fork and extend, ~70% reusable" and proposed a *separate repo* (`CMA_Part_2_2026`).

Clean today (portable as-is): `scoreMCQ` math, `practiceScores` 75/25→0–500→360, timer/warning machinery, navigator/flags/strike-through, review mode, `SessionPersistence` mechanics, `assignTier`/defect-blocklist, `deriveSimilarityKey`, calculator, governance guard, `ExplanationValidator`.

Hard-bound to Part 1: script-tag content manifest; 7 bank-enumeration sites; `SECTION_INFO` A–F; the `sections.length === 6` weighting gate; `cmaP1*` storage keys; `Part1OnlyFlag`; ~40 user-facing "Part 1" strings; May's `SYSTEM_PROMPT` ("You are the CMA Part 1 AI Review Coach"); `preflight.js`'s hardcoded pack table.

**None of this is architecturally hard — it is uniformly shallow coupling.** There is no inheritance to untangle, no Part-1 assumption baked into the scoring math. The whole problem is that the *identity of the exam part* is a constant scattered across ~60 sites instead of a value in one registry.

**Recommended approach: a single `EXAM_PART_REGISTRY` config object, not a fork.** Forking (per P2001) duplicates a 7,824-line file plus 30 May modules; every future engine fix and every one of R1–R7 must then be applied twice. Given the two Parts share scoring rules, gate threshold, timer, and UI wholesale, config-driven is materially cheaper *provided the registry lands before Part 2 content ships*. If Part 2 ships first and diverges, the fork becomes permanent by default.

---

## 5. Refactor Priorities — Effort vs. Impact

Effort: S ≤ half day · M ≈ 1–3 days · L ≈ 1–2 weeks

### Do now (high impact, low effort)
| # | Item | Effort | Lane |
|---|------|--------|------|
| P1 | **Fix the pause timer (R1)** — accumulate `pausedElapsed`, subtract in `remaining()`/`startTimer()` | S | Light |
| P2 | **Harden `preflight.js` (R2/R3)** — assert QID uniqueness per pack; report objects missing `Stem`/`CorrectChoice`. Read-only, catches the class not the instance | S | Light |
| P3 | **Collapse bank enumeration (R7)** — one `getBanks()` accessor; replace all 7 sites incl. the app.js:6833 `onclick` | S | Light |
| P4 | **Single source of truth for weights (R5)** — `weightedPick` reads `SECTION_INFO[sec].weight/100`; replace `sections.length === 6` with `sections.length === Object.keys(SECTION_INFO).length` | S | Light |

### Do before any Part 2 content ships (high impact, medium effort)
| # | Item | Effort | Lane |
|---|------|--------|------|
| P5 | **Freeze a shared item schema (R8)** — rename P2 `Type`→`ItemStyle` (or namespace the case-item discriminator), require `UniqueConceptKey`, unify `VerifiedChecks`. **This is the single highest-leverage item in the audit**: it is nearly free at 100 P2 items and prohibitive at 2,500 | M | Full |
| P6 | **`EXAM_PART_REGISTRY`** — `{ id, label, sections{}, packs[], casePacks[], fullExamSeconds, mcqCount, caseCount, qidPrefix, storagePrefix }`; drive `SECTION_INFO`, pool builders, catalog, and copy from it | M | Light |
| P7 | **Namespace persistence (R9)** — `cmaP1*` → `cma_${partId}_*` with a migration in `CMAProfileManager` (the legacy-key migration pattern already exists and works) | M | Light |
| P8 | **Unify the two scoring paths** — have `correctCase` delegate to `scoreMCQ`; one normalization function | S | Full (touches scoring) |

### Content remediation (independent track)
| # | Item | Effort | Lane |
|---|------|--------|------|
| P9 | Resolve the 4 duplicate Pack A QIDs + `P1-FD-046` (R2/R3) | S | Full |
| P10 | Sweep 116 missing distractor explanations in Packs C/D (R4) | M | Full |
| P11 | Resolve the 79 non-Certified / Archived items in Packs C/D | L | Full |

### Deferred (real debt, low urgency)
| # | Item | Effort |
|---|------|--------|
| P12 | Delete the 30 nonexistent `ENHANCED_CASE_BANK*` guards; replace case-pack aliasing with an explicit pack→casepack map (R6) | S |
| P13 | Migrate 83 inline `onclick` handlers to delegated listeners (R10) | M |
| P14 | Split `app.js` into ES modules + add a build step | L |
| P15 | Dedupe `styles.css`; archive one-off `scripts/debug_*` | M |
| P16 | Bring `admin.html` under the smoke test or archive it | M |

---

## 6. Bottom Line

The **engine is in better shape than the wiring**: scoring, gating, tiering, and learner-safety filtering are correct, centralized, and already Part-agnostic. The genuine blockers to a second Part are (a) the item-schema divergence already forming in `p2/pack_p2_a.js` — including a live `Type`-key collision that would mis-score P2 MCQs — and (b) Part-1 identity being a scattered constant rather than a config value.

P1–P4 are roughly one day and fix a real learner-facing timer bug plus the enumeration sprawl. P5 is the one with a closing window: the P2 schema is cheap to align at 100 items and expensive at 2,500.

**No writes were made. All findings are reported, not applied,** per AGENTS.md §2. R2/R3/R4 are content-integrity findings that warrant `DEFECT_LIBRARY.md` entries — say the word and I'll draft them under Full Governance Lane, or start on P1–P4.
