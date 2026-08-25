# Executive Architecture Board — Tooling Hardening Determination

**Date:** 2026-08-24
**Program:** 200-Series Framework v2 Stewardship Execution
**Session lane:** Governance Light (determination only)
**Companion data:** `reports/BOARD_DECISION_TOOLING_HARDENING.json`
**Stop conditions fired:** None

---

## 1. Charter Framing

The 200-Series charter bars architecture construction. Items 1–2 of the audited proposal are **instrument calibration**, not construction: they repair the measurement and enforcement layer that S208's controls depend on. The defect library convicts current instrumentation directly:

| Defect | Instrument failure | Cost |
|--------|-------------------|------|
| DL-020 | String-unaware brace-matcher silently dropped objects | 336 real DL-008 items missed |
| DL-029 | CC-offset forward-scans | ~885 phantom violations, nearly acted upon |
| DL-036 | Zero artifact reuse between pipeline stages | 40-item routing divergence |
| DL-019 | Concurrent-write overwrite | 432 remediated items lost; lock protocol documented but unimplemented |

Controls running on unreliable instruments are not controls. Repairing them is stewardship execution.

## 2. Verification Probe Outcomes

Two evidence gates were dispatched before any writes (per AGENTS.md §5):

| Probe | Agent | Purpose | Outcome |
|-------|-------|---------|---------|
| calm-amber-raven | general | Plugin-resolution evidence (gates Item 4) | `status: complete`, **empty output** |
| keen-amber-owl | explore | Large-file delegation capability (gates Item 5) | `status: complete`, **empty output** |

**Finding:** Background delegation returned silent-empty completions on 2/2 trivial read-only tasks across two agent types. Failure is broader than the large-file signature documented in AGENTS.md §9.4. Recommended as **DL-044** (Process/Methodology; cf. DL-028), to be filed by the next Full Governance Lane session. Until resolved, Board investigations route through foreground `task` agents.

## 3. Determinations

### Item 4 — Dead plugin config cleanup: APPROVED, GATED (Priority 0)

Board received no independent resolution evidence (probe returned empty). Executing session must, before editing:

1. Read `opencode.json` plugin array verbatim.
2. Confirm each bare npm name (reported: `background-agents`, `goal-plugin`, `vibeguard`, `conductor`, `websearch-cited`) is non-resolvable via `node_modules` glob + `package.json` dependency check.
3. Confirm local entries (`governance-guard.js`, `stem-similarity-guard.js`) resolve — **do not touch**.
4. Back up `opencode.json`.
5. Remove only confirmed-unresolvable names; anything that resolves or is referenced elsewhere stays and is logged.
6. Post-edit: `npm run preflight` green (guard loads, full suite passes).

Lane: Light.

### Item 1 — Canonical pack-parser (`scripts/lib/pack_parser.js`): APPROVED (Priority 1)

Closes three defect families (DL-020, DL-029, DL-036). Conditions:

- Conformance harness **before any consumer migrates**: per-pack object counts equal raw `grep -c '"QuestionID"'` baselines.
- CorrectChoice always read from the same enclosing object as the ExplanationWrong fields (DL-029 rule).
- String-aware matching proven against historical corruption corpus (DL-017 backtick artifacts, brackets-in-stems).
- **No silent drops** — malformed regions surface as errors.
- Consumers migrate one per change-set; two consecutive agreeing scans (§6 stability) before the next migrates.

Lane: module build Light; consumer migrations into validators/guards/scanners **Full** (§9.1 trigger).

### Item 2 — File-lock plugin: APPROVED, AMENDED (Priority 2)

Closes DL-019. Conditions:

- Locks cover edit/write paths only; read-only tools never blocked.
- Staleness TTL/liveness; stale locks broken automatically with logged warning.
- Explicit override flag requiring a justification string (logged).
- **Amendment:** `session.idle` post-write rescan invokes local scripts/foreground agents — never the background delegation channel (see §2 finding).

Lane: **Full** (write-path safety logic).

### Item 3 — Budget-injection hook: APPROVED (Priority 3 executed last; low effort)

`chat.params` reads latest `probe-model` output and injects current limits into authoring context. Missing/stale output ⇒ inject nothing + warn; never fabricate limits. Lane: Light.

### Item 5 — AGENTS.md §9.4 update: REJECTED AS PROPOSED

The audit's premise ("native delegation supersedes the npm entry") failed live verification 2/2. §9.4 **remains as written** (prefer `task` over `delegate`). Replacement action: append a dated retest annotation — *2026-08-24: two background delegations returned status=complete with empty output on trivial read-only tasks* — so future sessions do not re-litigate. Flipping documented guidance on unverified claims would repeat the exact pattern the guidance exists to prevent.

## 4. Sequencing

**4 (gated) → 1 → 2 → 3**

- Item 4 first: near-free, de-risks config surface before heavier work lands.
- Item 1 before Item 2: the lock plugin's rescan hook should consume the canonical parser rather than become consumer #139.

## 5. Rejected Alternatives (concurred with audit)

Nested AGENTS.md (single repo, one team); MCP servers (no external service need); community plugins (nothing beats purpose-built items 1–3 mapped to defect history).

## 6. Risk Register

| Risk | Mitigation |
|------|-----------|
| Parser migration manufactures fresh count instability | Conformance parity gate + one-consumer-per-change-set + §6 stability protocol |
| File-lock blocks legitimate concurrent work | Narrow scope + TTL + logged-break + justified override |
| Config edit breaks guard registration | Local entries untouched; post-edit preflight mandatory |
| Remediation tooling creates new defects (DL-028 precedent) | Tooling changes receive content-change-grade scrutiny; regression seeds from corruption corpus |

---

## 7. Execution Log — Item 4 Gate (2026-08-24)

**Verification (foreground @stewardship-inspector, read-only):**

- Actual config names carry the `opencode-` prefix: `opencode-background-agents`, `opencode-goal-plugin`, `opencode-vibeguard`, `opencode-conductor`, `opencode-websearch-cited`.
- **All five non-resolvable:** absent from `node_modules` (prefixed and unprefixed globs), absent from root `package.json` (which has **no dependencies key at all**; devDependencies = electron, playwright only), absent from both lockfiles.
- Local plugins confirmed intact: `governance-guard.js` (563 lines — matches AGENTS.md §1 declaration) and `stem-similarity-guard.js` (284 lines); `.opencode/plugins/` contains exactly these two files.
- Cross-references are documentation-only (`archive/.../DL012_REMEDIATION_PROPOSAL.md`; `knowledge/EXTERNAL_INTEGRATION_DECISION_RECORD.md`). No functional dependency anywhere. "conductor" substring hits inside "semiconductor" excluded as false positives.
- Standing-decision check on `EXTERNAL_INTEGRATION_DECISION_RECORD.md`: **no decision overturned** — its Mem0/Browser-Use rejections rest on independent grounds (markdown knowledge files as authoritative memory; Playwright + autonomous-browser governance risk). The record is itself stale (cites `opencode-supermemory`, absent from current config). *Follow-up recommended:* annotate its §2 capability table.
- Preflight baseline could not be captured: audit seat has no shell access.

**Edit executed:**

| Step | Result |
|------|--------|
| Backup | `backups/opencode.json.bak-20260824153100` (140 lines, verified faithful pre-edit) |
| Change | `plugin` array 7 → 2 entries (both local guards retained); file 140 → 135 lines |
| Scope | Exactly 5 lines removed; no other keys touched |
| Post-edit structural verification | **PASS** (direct read: valid array closure, surrounding keys byte-intact) |

**Gate status: CLOSED (2026-08-24).** Runtime confirmation executed by user: `npm run preflight` → exit 0, `DIVERGENCES: 0` (Certified total **2620** matches baseline), governance guard suite **74/74 PASS**, all five packs parse clean (A–D: 500 QIDs each; E: 620). The `opencode.json` cleanup changed nothing functional. Backup retained: `backups/opencode.json.bak-20260824153100`.

**Environment finding (routing-relevant):** foreground `task` is permission-restricted to the four program agents (`stewardship-inspector`, `registry-integrity`, `drift-detector`, `governance-validator`); `general`/`explore` are denied by `opencode.json`. Combined with DL-044 (background delegation silent-empty), all future Board investigations route through the four allowed foreground agents.

---

## 8. Execution Log — Item 1 Phases A & B (2026-08-24)

**Phase A CLOSED:** `scripts/lib/pack_parser.js` (~560 lines) + 20-test unit suite + real-corpus fixtures. All four board conditions landed (neighbor-isolation incl. first/last variants; invariant as thrown `ParserInvariantViolation` backed by independent `{`-census; ERROR/WARNING severity enum; determinism via two-run deep-equality). Corpus pass: 500×4 + 620 records, zero errors/warnings, 100% JSON parse, invariant held per pack. Preflight post-build: byte-untouched packs, 0 divergences. In-scope fixes: closing-bracket scan bug (caught by unit gate); Pack C `// BLOCK-AUTHORIZED` discovery tolerance (scoped, unit fixture required — delivered in Phase B gate 4).

**Phase B CLOSED:** all five gates pass — count parity 5/5 packs; ground truth 11/11 (DL-039 nine post-S133 + P1B-A-143 CC-first + P1-E-R33); §6 stability via identical run fingerprints (`9d6c89c2…d1601` ×2); artifact at `reports/PHASE_B_CONFORMANCE_HARNESS_2026-08-24.json`; comment-tolerance unit fixture added.

**Headline finding — dual-block divergence = 0 pool-wide.** Zero paired metadata/content blocks across all 2,620 items; every object is `single` architecture. Dual-method verified (structural parse + independent raw-key census agree); full-file coverage proven by grep count parity. Interpretation: DL-016/DL-026/DL-029 dual-block descriptions reflect historical structures consolidated by later remediation waves (consistent with S805). **Doctrine: the metadata-vs-content divergence risk class is closed at the file level.** DEFECT_LIBRARY historical-state annotation scheduled for Phase C's first Full Lane closeout.

**New targets surfaced:** four DL-018-class items with an absent (not empty) EW slot — `P1B-E-083`, `P1B-F-091`, `P1-EC-045`, `P1E-B-012`. Board condition: Migration 1 report must classify each by absent-slot position (CC vs distractor) and certification state; distractor-absent on Certified items = DL-021 class, learner-safety-relevant, DEFECT_LIBRARY entry with priority remediation.

**Phase C AUTHORIZED (Full Lane):** order ① ExplanationValidator → ② defect scanners → ③ readiness/candidate engines together. Binding conditions: (1) target classification above; (2) Migration 1 ships old-vs-new extractor equivalence evidence (identical flag sets + counts across all packs) before legacy removal, rollback preserved; (3) per-change-set T0 preflight, backups, count parity, contemporaneous REVISION_HISTORY entries. `preflight.js` migration decision deferred until ①–③ complete.

---

## 9. Execution Log — Migration 1 Acceptance + Registry Integrity Check (2026-08-24)

**Migration 1 ACCEPTED.** Equivalence diff across 10 files: deep-equality on all 7 legacy-readable files; 3 coverage restorations — Pack C 500 items first-ever validated (**0 EV8 errors**), scored_cases.js 12+3E, scored_cases5.js 1+3E (genuine DL-044 corruption, V8-verified coordinates). Legacy "Errors: 0" was omission, not health; post-migration 5 loud errors = gate restored. DL-018 four targets classified benign variant (absent slot == CC, all Certified, distractor slots substantive 600–850 chars) — schema normalization only, matching the library's own amendment verbatim. Ceremony complete: backups, ledger entries, preflight ×2 green, parser suite 20/20, harness ALL GATES PASS. P1-EC-009 placeholder-pattern false positive deferred to Migration 2 pattern refinement.

**Board determination — pipeline blockage: Option (a) AUTHORIZED.** DL-044 content wave before Migrations 2–3 (their closeouts need a functioning pipeline). Conditions: (1) §3 backups on all touched case files; (2) zero-data-loss proof via deep-diff — only structural tokens change; (3) root-vs-`content/cases/legacy` copy reconciliation, closing DL-044's open exposure question; (4) post-fix battery: validate Errors→0/WARN, `npm run pipeline` green end-to-end, harness fingerprints stable, preflight ×2, contemporaneous ledgers; (5) Rule 5 satisfied (4 cases).

**Registry integrity check (@registry-integrity):** 44 DL entries, zero duplicates, DL-044 exclusively the case-bank corruption, DL-045+ unallocated. **Finding: the background-delegation silent-empty finding was never filed** — it existed only as a Board recommendation carrying a defective pre-assigned ID. **Corrective: assigned DL-045 by Board determination; filing is mandatory in the DL-044 wave session's ledger updates.** Process lesson recorded: ID allocation happens against registry state, never in session prose.

---

## 10. Execution Log — DL-044 Wave Acceptance (2026-08-24)

**WAVE ACCEPTED — DL-044 CLOSED.** All five Board conditions met: (1) §3 backups (`scored_cases.js.bak` 456,450 B; `scored_cases5.js.bak` 332,612 B); (2) **bidirectional byte-proof** — forward constructive equivalence AND reverse excision both BYTE-EQUAL, total change 4 characters (3× `,`, 1× `]`), content censuses unchanged; (3) exposure question closed — root `scored_cases*.js` absent, no loader references in `index_updated.html`/`app/app.js`; (4) post-fix battery green — parsePack 15/15 cases per file, `test:parser` 20/20, harness ALL GATES PASS, validate Errors 0 / WARN / exit 0 (warnings 1861→1983 = coverage expansion into recovered cases), **`npm run pipeline` GREEN end-to-end** (registry 3,020 questions); (5) ledgers contemporaneous — DL-044 → Resolved, **DL-045 filed Open** (delegation silent-empty inadmissibility + foreground-agent routing + registry-first ID allocation, with the collision episode as precedent).

**Severity reframe recorded:** if the no-runtime-path finding holds, DL-044's entire cost was validation blindness (silent-null files), never learner exposure — informing severity weighting for analogous findings.

**Pending confirmation:** "corruption never had a runtime path" currently rests on two named entry points only. Repo-wide `scored_cases` consumption sweep dispatched (@stewardship-inspector); DL-044's resolution block will be amended if any additional path surfaces. Current learner safety unaffected either way — files are repaired.

**Migrations 2–3 UNBLOCKED** — proceed per plan: ② defect scanners + P1-EC-009 placeholder-pattern refinement; ③ readiness scorer + candidate engine together (DL-036 artifact reuse). Dual-block historical-state annotations remain queued for closeout.

---

## 11. Execution Log — Runtime-Path Sweep Closure (2026-08-24)

**"No runtime path" CONFIRMED (@stewardship-inspector repo-wide sweep).** Verified at every delivery layer: Electron `main.js` loads only `index_updated.html`; zero scored_cases script tags in the sole loaded document; zero literal references in `app/app.js`; zero references in `package.json`/`opencode.json`. Actual case content: `content/cases/case_pack_{1,2,3}_corrected.js` via `<script>` tags + tail alias constants (`CASE_BANK_*`, `MIGRATED_CASE_BASE_*`) consumed by `getCasePool()`. Legacy copies' only consumers are validators/dashboards/registries/audit tooling. **DL-044 severity story final: validation blindness, never learner exposure.**

**Two residual mechanisms surfaced (absent from DL-044's record):**
1. *Inert consumer* — `app/may/may-context-builder.js:35` looks up `window.scoredCases…5` behind default-off feature flags; nothing defines the globals; no-op today.
2. *Unfed hook (hazard)* — `app/app.js getCasePool()` retains `typeof`-guarded fallback branches for the full legacy bank global family. Load-chain dismantled only; a future `<script src="…/scored_casesN.js">` re-addition would silently re-ingest legacy arrays into delivery with no gate.

**Board determinations:** (a) DL-044 resolution block amended at Migration 2 closeout — confirmed verdict + both mechanisms + correction of stale pre-S916 sentence (DL-044 Issue section, "the app loads root-level scored_cases*.js"); (b) candidate future hardening: guard rule rejecting new script tags targeting legacy bank filenames (closes mechanism 2 permanently) — noted, not mandated; (c) Migrations 2–3 proceed.

---

## 12. Execution Log — Migration 2 Acceptance (2026-08-24)

**MIGRATION 2 ACCEPTED.** Four migrations landed with parity evidence: `engine/pack_reader.js` substrate (19 consumers inherit canonical parsing; per-pack fingerprints BYTE-EQUAL; Board ratifies substrate-level migration as fulfilling the one-consumer-per-change-set intent when API preserved + fingerprint-proven); `scan_logic_inversions.js` (console identical); `scan_orchestrator.js` (**rootDir repaired — was silently scanning 0 packs and writing all-zero clean artifacts, a live DL-045-class defect in the certification pipeline; zero-scan guard added, exit 1**); ExplanationValidator elaboration-aware refinement (1983→1981 = exactly the known FP+rollup).

**Gate results cross-validated:** Gate −1 blocks 80 (DL-036 sibling class, Pack E supplemental series vs stale regex); DL-008/DL-016 = 0/0 matching harness; DL-018 = exactly the four named benign targets (third method in agreement); **DL-026 = 12 new Certified items with one empty non-CC slot each** (live feedback gaps).

**Board determinations:**
1. **DL-026 twelve-item remediation AUTHORIZED** — discrete content change-set, single batch (Rule 5), §3 backups, choice-specific EW authoring only, no CC/state changes, post-scan zero + preflight ×2, contemporaneous ledgers.
2. **QID_REGEX APPROVED, folded into M3** — condition: validate proposed regex (`^(?:P1E-(?:[A-F]-\d{3}|[A-F]-S\d{2}|EVAL-\d{3})|P1-E-R\d{2})$`) against full 620-item Pack E population (unique match per QID, zero orphans, no over-match) + structural spot-checks on sampled S##/EVAL-### items before flip.
3. **M3 scope confirmed:** readiness→candidate artifact-consumption wiring + regex disposition + dual-block historical-state annotations (DL-016/DL-026/DL-029) at Full Lane closeout.

Ceremony verified: backups ×3 (20260824171150 series), REVISION_HISTORY Session 2026-08-24(c), DEFECT_LIBRARY amendments (DL-026 twelve-item table, DL-036 sibling + proposed regex, full DL-044 amendment package incl. stale-sentence correction).

---

## 13. Execution Log — Migration 3 Closure & Program Closure (2026-08-24)

**MIGRATION 3 COMPLETE — PROGRAM CLOSED END-TO-END.**

Three workstreams, all closed:

1. **QID_REGEX flip** — validated 620/620 Pack E items (zero orphans, zero over-matches, 7 sampled supplemental items structurally complete). Flip applied in both live copies (`engine/pack_reader.js` identity authority; candidate engine's local table deleted outright). Gate −1: 2540P/80B → 2620P/0B. DL-036 sibling class resolved.

2. **Artifact-consumption wiring** — DL-036 retired. Engine now strictly consumes `readiness_scoring.json` with refusal guards at every evidence boundary (missing/empty/stale/evidence-gap → hard refuse). Parity invariant compiled into code. Bonus: `readiness_scorer.js` carried the same rootDir bug — now fixed. First fully-populated chain run in repo history: orchestrator (2620 scanned) → scorer (Portfolio 1.0000 READY, CERTIFY=2620) → engine (mirrored exactly).

3. **Dual-block annotations** — DL-016/DL-026/DL-029 carry dated closeout notes. Historical counts marked as retired methodology artifacts. DL-029's CC-offset mechanism *structurally eliminated* (forward-scan windows no longer exist in the toolchain).

**Battery:** test:parser 20/20 · harness ALL GATES · validate Errors 0/WARN/exit 0 · preflight ×2 · pipeline GREEN · chain run green with `parseFailures: []`. Backups `*-bak-m3-20260824222332` ×3. REVISION_HISTORY Session 2026-08-24(e); DL-036 resolved block filed.

**Program closure:** Every migration authorized is complete. The validator, scanners/orchestrator, and readiness/candidate pair all consume canonical parsing or upstream artifacts exclusively, with refusal guards at every evidence boundary.

**Open items (exactly two, both queued):**
- **DL-046** — `P1E-A-024` Option C is `" securities"` (truncated fragment on Certified item). Answer key intact (CC=D). Detection rule proposed for future Gate-1 content-shape check.
- **Legacy-script-tag guard rule** — parked as future hardening candidate.

**Program retrospective:** The original tooling audit identified three defect families (DL-020, DL-029, DL-036). All are now closed or structurally eliminated. Along the way, the instruments surfaced two things nobody was looking for: a certification-pipeline tool certifying from zero data (now guarded by DL-045), and twelve real feedback gaps on live Certified items (DL-026, now repaired). The instruments didn't just count better — they *saw* more.

---

*Drafted by the Executive Architecture Board, 200-Series. Companion machine-readable record: `BOARD_DECISION_TOOLING_HARDENING.json`.*
