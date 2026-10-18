# REMEDIATION_STATUS_REPORT.md

**Version:** 1.0
**Date:** 2026-09-23
**Session:** Board-Report Remediation Lead
**Board recommendation in force:** **DEFER RELEASE — ADDITIONAL DEVELOPMENT REQUIRED**
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md, CAQS_v1.0.md
**Lane:** Governance Light Lane — documentation + read-only verification. No pack/case content writes, no answer-key changes, no certification-state changes, no baseline writes, no May flag changes.

---

## 1. Executive Status

**Outcome: OUTCOME A — RELEASE BLOCKED.**

P0 app.js baseline drift (G-01/A-02/S-02) is fully attributed and regression-tested but **not normalized**: the documented hash is fabricated, the working tree carries uncommitted changes, and operating rule 3 requires a human to authorize the commit + recapture. Release-path evidence (O-01 rollback drill), runtime policy adoption (G-02), and the P2 semantic sample review (D-01) additionally require human authority. All Tier 1 content gates are green; the blockers are engineering-governance actions, not newly discovered content defects.

**What changed this session:** eleven decision-ready artifacts (A–K), one frozen P2 audit sample (60 QIDs), one REVISION_HISTORY.md append. Zero content modifications.

**Shortest safe next sequence:**
1. Human reviews `reports/APP_JS_DRIFT_RECONCILIATION.md` → approves HA-01/HA-12 → commits `app/app.js` (minus BOM) → runs `node scripts/baseline_coherence.js --fix` → `npm run preflight` shows 0 divergences.
2. Human authorizes HA-11 cleanup (`Remove-Item` scratch files) → clean tree.
3. Human executes HA-04 rollback drill → evidence filed.
4. Accountant executes HA-05 P2 60-item review → audit report or defect escalations.
5. Board records HA-06 Tier 2 acceptance + HA-07 policy adoption → re-review for Outcome B.

---

## 2. Factual Evidence Table (repository-authoritative)

| # | Claim | Source file or command | Verified status | Exact evidence | Impact on remediation |
|---|-------|------------------------|-----------------|----------------|-----------------------|
| E-01 | P1 pool 3,070 QIDs / 3,052 Certified | `npm run preflight` 2026-09-23 | **Verified** | A560/560 B620/620 C620/606 D590/586 E680/680; total 3052; 18 Archived | Baseline for all pool claims; matches parity probe |
| E-02 | P2 pool 3,530 QIDs / 3,530 Certified | `npm run preflight:p2` 2026-09-23 | **Verified** | A622 B620 C788 D500 E500 F500; Part2OnlyFlag 3530/3530; 0 duplicates | D-01 population confirmed |
| E-03 | P1 live cases 80/425; P2 strict 110/660 | `node scripts/pool_parity_probe.js` | **Verified** | P1 25+25+30 cases; P2 33+33+34+5+5; PROBE PASS 0 divergences | A-03, D-01 case scope |
| E-04 | Documented app.js hash fabricated | `Get-FileHash` vs `knowledge/CURRENT_BASELINES.md:29` | **Verified** | Doc `E998A72A…` matches no working file (`31901F3F…`), commit (`E03C7EBE…`), or any of 17 backups / 5 sampled commits | G-01 root cause; `--fix` forbidden without HA-01 |
| E-05 | app.js working diff 860 lines, functionally attributed | `git diff app/app.js`, `git status` | **Verified** | Uncommitted vs `cb9b3b4`; hunks map to F1 wiring/H2/Board S7/Phase 4/DL-014+022/W_ADMIN+W9T5; only BOM unattributed | A-02/S-02 safety assessment |
| E-06 | Guard suite 101/101 PASS | `node scripts/test_governance_guard.js` | **Verified** | `=== RESULTS: 101 PASS, 0 FAIL ===` | G-02: content guardrails intact |
| E-07 | Smoke 62/62 PASS incl. integrity/corruption paths | `npm run smoke` | **Verified** | W1-A/B integrity restore, W1-D pause clock, abnormal corrupted-restore, DL-060 truthfulness | S-02 re-proven on current bytes |
| E-08 | Thorough test observed 18/18 PASS (run exceeded 120 s timeout at tail) | `node scripts/thorough_test.js` | **Partially verified** | All rendered checks PASS incl. corrupted-restore; process hit tool timeout after score-report section | Supports S-02; full re-run recommended pre-release |
| E-09 | Validator 0 errors / 10,345 warnings | `node scripts/validate.js` | **Verified** | 10 validators; psychometric 6,730 (Abs 2,571 / Amb 2,303 / Sim 1,968); Math 0; ExplConsistency 0 | Q-01/Q-02 measured baseline |
| E-10 | Semantic key verifier exit 0, BLOCK 0 | `node scripts/semantic_key_verifier.js` | **Verified** | 6,600 items / 6,582 Certified; Screen B BLOCK 0 (29 known FPs demoted); REVIEW 69 + WARN 27 advisory | DL-047-class gate clean |
| E-11 | Case screens exit 0 | `node scripts/case_semantic_screens.js` | **Verified** | Flags stable; output `case_semantic_flags.json` | DL-051 gate stable |
| E-12 | No legacy globals in any pool path | grep `index_updated.html` + `app/app.js` + parity probe | **Verified** | 0 legacy script tags; 0 `ENHANCED_CASE_BASE` refs in app.js; parity legacy checks PASS | A-03 containment |
| E-13 | Providers disabled; no secrets in repo | `app/may/may-feature-flags.js`, `may-llm-provider-registry.js` | **Verified** | ENABLE_LLM/OPENAI/AZURE false; keys read from env only; smoke hidden-beta not-available | S-03/AI-01 posture |
| E-14 | CI/CodeQL/Dependabot configured; hosted enforcement unverifiable | `.github/workflows/*`, `.github/dependabot.yml` | **Verified** | ci.yml (preflight/governance/validate/registry), smoke.yml, codeql.yml weekly, dependabot weekly; no settings access | O-02 gap documented |
| E-15 | 655 top-level scripts; 1,774 recursive | `Get-ChildItem scripts` | **Verified** | canonical-or-gate 17 / diagnostic 168 / one-shot 247 / scratch 13 / unknown 210 | A-01 inventory basis |

---

## 3. Remediation Log (per finding)

### G-01 — app.js baseline incoherence / preflight HALT (BLOCKER)
- **Files inspected:** `app/app.js`, `knowledge/CURRENT_BASELINES.md:29`, 4 `app.js.bak-*`, 17 `backups/app.js.bak-*`, 5 commits via `git show`.
- **Files changed:** None (read-only). New: `reports/APP_JS_DRIFT_RECONCILIATION.md`.
- **Commands:** `npm run preflight`, `node scripts/baseline_coherence.js`, `Get-FileHash` (working + 4 backups), `git log/status/diff`, `git show <6 commits>`.
- **Before/after:** Before — HALT 1 divergence (doc E998A72A vs actual 31901F3F). After — divergence preserved (not concealed); attribution + regression complete; decision package ready.
- **Tests:** smoke 62/62, thorough 18/18 observed, guard 101/101, parity PASS, semantic exit 0, case-screens exit 0.
- **Dependencies:** HA-01 + HA-12 (human commit + recapture).
- **Disposition:** **Documented; implementation deferred** — release blocker.

### A-02 — drift touches integrity/timer surface (HIGH)
- Covered by G-01 evidence plus hunk-level safety analysis (eval removal positive; escapeHtml positive; assignTier hard-block authorized Board S7; session null-guards DL-014/022; P2BankLoader verification; history/admin telemetry).
- **Disposition:** **Documented; implementation deferred** — folds into HA-01. Release blocker until baseline matches reviewed bytes.

### S-02 — corrupted-restore protections re-proven (HIGH)
- **Evidence:** smoke abnormal checks PASS on current working bytes; thorough_test corrupted-restore PASS; SessionPersistence null-guards present at app.js:2079-2152 (working tree).
- **Disposition:** **Repaired pending human approval** — code protections verified; formal closure rides HA-01 baseline acceptance.

### G-02 — runtime change-control coverage (CRITICAL)
- **Files changed:** New `governance/RUNTIME_CHANGE_CONTROL_POLICY.md` (tiers, evidence matrix, baseline procedure, emergency handling, roles, sign-off, CI mapping, T0 hash ritual, pass/fail test design).
- **Existing guardrails:** untouched (guard 101/101 PASS post-session).
- **Disposition:** **Documented; implementation deferred** — policy requires HA-07 adoption. Automation already active (preflight/pipeline/parity/smoke).

### G-03 — "Production" label without release procedure (HIGH)
- **Files changed:** New `governance/RELEASE_READINESS_CHECKLIST.md` (distribution model declared local-first/Electron; 8 gates; versioning/tagging; roles; artifact verification; notes template; known-issue declaration; rollback criteria; post-release verification; dry-run).
- **No status/label changes made** (operating rule 10; VERSION still 1.1.1, no tags created).
- **Disposition:** **Documented; implementation deferred** — needs HA-02/HA-03.

### O-01 — deploy/release/monitor/rollback path (HIGH) + S-04 backup/restore drill (MEDIUM)
- **Files changed:** New `governance/RELEASE_AND_ROLLBACK_RUNBOOK.md` (pre-release backup script, retention, §3 release, §4 git + file-level + content-pack rollback, §5 disaster restore, §6 post-rollback validation, §7 drill + evidence template).
- **Drill status:** never executed (runbook §10). No rollback performed this session.
- **Disposition:** **Documented; implementation deferred** — HA-04 drill required.

### D-01 — P2 3,530 Certified without sampled re-verification (HIGH)
- **Population verified:** preflight:p2 3,530/3,530 Certified; Part2OnlyFlag 3,530/3,530; parity Tier-1-only clean all six packs.
- **Files changed:** New `reports/P2_SAMPLE_AUDIT_PLAN.md` (stratified A11/B11/C14/D8/E8/F8, seed 20260923, six CAQS dimensions, decision categories, thresholds, escalation) + `scripts/output/p2_audit_sample_20260923.json` (frozen 60 with topic/DS/cognitive/provenance; 60 distinct topics; Remember 2/Understand 11/Apply 29/Analyze 13/Evaluate 5).
- **Automated pre-check:** all 60 parse, Certified, Part2OnlyFlag true; semantic gate exit 0 BLOCK 0. **No semantic PASS/FAIL claimed.**
- **Disposition:** **Documented; implementation deferred** — HA-05 human review required.

### Q-01 — warning noise (CRITICAL for future waves) + Q-02 — psychometric adjudication (HIGH/MEDIUM)
- **Measured:** validate 0 errors / 10,345 warnings; psychometric 6,730 breakdown captured (§2 E-09).
- **Files changed:** New `governance/VALIDATOR_WARNING_GOVERNANCE_PLAN.md` (taxonomy, FP categories with DL-005/DL-043 adjudication records, allowlist schema + requirements, delta assertion, escalation rules, triage-queue design, roadmap).
- **No validator code changed; no warnings suppressed; no bulk edits.**
- **Disposition:** **Documented; implementation deferred** — HA-06/HA-07.

### A-01 — 683-script unclear safe path (CRITICAL for future waves)
- **Measured:** 655 top-level / 1,774 recursive; heuristic classes counted (§2 E-15).
- **Files changed:** New `reports/CANONICAL_TOOLCHAIN_INVENTORY.md` (17-command safe path with I/O/risk/prereqs, prohibited list, CI mapping, quick-start, residual unknown-210 triage plan).
- **No scripts deleted/moved.**
- **Disposition:** **Documented; implementation deferred** — HA-07 adoption; owner triage of unknown class outstanding.

### A-03 — legacy case-bank re-feed risk (MEDIUM)
- **Verified:** live HTML tags + getCasePool P1/P2 branches consume only CASE_PACK_1/2/3 and casePackP2_*; zero legacy references; parity legacy checks PASS; legacy files retained on disk.
- **Files changed:** New `reports/LEGACY_LOADER_PROTECTION_PLAN.md` (wiring table, residual mechanisms, negative-test spec with pass/fail cases, policy, rollback).
- **No loader code changed; no archive removed.**
- **Disposition:** **Documented; implementation deferred** — automated negative test pending (HA-07).

---

## 4. Finding-by-Finding Remediation Table (final gate)

| Finding ID | Severity | Board Requirement | Action Taken | Evidence | Status | Release Blocker? | Human Action Needed |
|---|---|---|---|---|---|---|---|
| G-01 | BLOCKER | Reconcile app.js hash without concealing changes; 0-divergence preflight + coherence | Attribution + regression completed; failure preserved; decision package written | APP_JS_DRIFT_RECONCILIATION.md; preflight HALT 1 divergence; smoke 62/62; guard 101/101 | Documented; implementation deferred | **YES** | HA-01 + HA-12: review diff, commit, --fix, re-verify |
| A-02 | HIGH | Assess integrity/timer-surface drift | Hunk safety analysis; all functional hunks attributed; BOM flagged | Same + git diff 860 lines | Documented; implementation deferred | **YES** (folds into G-01) | HA-01 |
| S-02 | HIGH | Re-prove corrupted-restore protections | Smoke + thorough abnormal paths PASS on current bytes | smoke abnormal checks; app.js:2079-2152 guards | Repaired pending human approval | **YES** (formal closure via HA-01) | HA-01 sign-off |
| G-02 | CRITICAL | Enforceable runtime change control | Policy written; automation evidenced; content guards intact | RUNTIME_CHANGE_CONTROL_POLICY.md; guard 101/101 | Documented; implementation deferred | YES (adoption) | HA-07 |
| G-03 | HIGH | Release procedure for "Production" label | Checklist written; no labels changed | RELEASE_READINESS_CHECKLIST.md; VERSION untouched | Documented; implementation deferred | YES (sign-off/tag) | HA-02 + HA-03 |
| O-01 | HIGH | Proven deploy/release/monitor/rollback path | Runbook written; distribution declared local-first | RELEASE_AND_ROLLBACK_RUNBOOK.md | Documented; implementation deferred | **YES** (drill) | HA-04 |
| S-04 | MEDIUM | Full restore/rollback drill evidence | Drill procedure + evidence template; no drill executed | Same §7/§10 | Documented; implementation deferred | **YES** (drill) | HA-04 |
| D-01 | HIGH | Independent P2 sampled re-verification | Population verified; 60-QID frozen sample + plan; structural pre-check only | P2_SAMPLE_AUDIT_PLAN.md; p2_audit_sample_20260923.json; preflight:p2; parity | Documented; implementation deferred | **YES** (review) | HA-05 |
| Q-01 | CRITICAL (future waves) | Reduce FP noise without hiding errors | Measured baseline + taxonomy + allowlist/delta design; no code changed | VALIDATOR_WARNING_GOVERNANCE_PLAN.md; validate output | Documented; implementation deferred | No (this release); YES for future-wave gate changes | HA-06 + HA-07 |
| Q-02 | HIGH/MEDIUM | QID-level psychometric adjudication + thresholds | Triage-queue design; DL-005/DL-043 adjudication records cited; no global defect counts claimed | Same; TWO_TIER §6 | Documented; implementation deferred | YES (acceptance for residual) | HA-06 |
| A-01 | CRITICAL (future waves) | Usable safe workflow for new maintainer | 17-command inventory + prohibited list + CI map + quick-start | CANONICAL_TOOLCHAIN_INVENTORY.md | Documented; implementation deferred | No (this release); YES for wave-velocity claims | HA-07 |
| A-03 | MEDIUM | Block legacy-bank re-feed | Wiring verified; negative-test + policy proposed; archives retained | LEGACY_LOADER_PROTECTION_PLAN.md; parity PASS | Documented; implementation deferred | No (contained); YES for automation | HA-07 |
| S-01 | P3 doc | Parser trust boundary | Appendix A below | pack_parser.js:67,427; build_master_registry.js:233,241 | Documented | No | None (staged alternative needs future approval) |
| S-03 | P3 doc | Secrets/telemetry/privacy | Appendix B below | may-feature-flags.js; provider-registry grep | Documented | No (posture safe) | HA-08 only if enabling |
| AI-01 | P3 doc | May prompt/version/eval governance | Appendix C below | prompts/ inventory; smoke provider gates | Documented | No (flags off) | HA-08 only if enabling |
| U-01 | P3 doc | Accessibility evidence | Appendix D below | Static inspection only | Documented | No (declare limitation) | HA-10 for conformance claims |
| O-02 | P3 doc | Dependency/security cadence | Appendix E below | codeql.yml; dependabot.yml; ci.yml | Documented | No (declare gap) | HA-09 for hosted claims |

**Status vocabulary used:** Repaired pending human approval (S-02 only); Documented; implementation deferred (all others). No item is marked repaired-and-verified except via explicitly scoped evidence (S-02 code behavior).

---

## 5. Exact Commands Executed and Outcomes

| # | Command | Outcome |
|---|---------|---------|
| 1 | `npm run preflight` (×3) | HALT 1 divergence (app.js hash); all pack counts/parse/Certified/guard PASS; 3052 total |
| 2 | `node scripts/baseline_coherence.js` (×2) | DIVERGE app.js doc E998A72A vs actual 31901F3F; all other rows OK; P2 §1 OK; exit 1 |
| 3 | `Get-FileHash app/app.js` + 4 `app.js.bak-*` + 17 `backups/app.js.bak-*` | Working 31901F3F; closeout 70A5FE1A; PROMO EA4279AB; none match E998A72A |
| 4 | `git log/status/diff/show ×6 commits` | Uncommitted 860-line diff vs cb9b3b4 (= 9c32f1c app.js E03C7EBE); last app.js commit 9c32f1c (DL-056, 711 lines per stat) |
| 5 | `npm run smoke` | 62/62 PASS (W1-A/B/C/D, abnormal corrupted-restore, DL-060) |
| 6 | `node scripts/thorough_test.js` | 18/18 observed PASS; process exceeded 120 s tool timeout at tail (re-run advised) |
| 7 | `node scripts/test_governance_guard.js` | 101/101 PASS |
| 8 | `npm run preflight:p2` | 3,530 QIDs / 3,530 Certified; Part2OnlyFlag 3,530/3,530; cases 33+33+34; 0 duplicates |
| 9 | `node scripts/validate.js` | 0 errors / 10,345 warnings; psychometric 6,730; Math 0; ExplConsistency 0; Status WARN |
| 10 | `node scripts/pool_parity_probe.js` | PROBE PASS 0 divergences; Tier-1-only all packs; 80/425 P1 cases; 110/660 P2 strict; blocklists present (378 entries); extractor 6,600/6,600 |
| 11 | `node scripts/semantic_key_verifier.js` | Exit 0; 6,600 items; Screen B BLOCK 0; REVIEW 69 + WARN 27; report JSON written |
| 12 | `node scripts/case_semantic_screens.js` | Exit 0; flags written to case_semantic_flags.json |
| 13 | `node C:\…\gen_p2_audit_sample.js` (temp, outside repo) | Wrote `scripts/output/p2_audit_sample_20260923.json` n=60; 60 distinct topics; cog R2/U11/Ap29/An13/Ev5 |
| 14 | Select-String audits (QIDs, Certified, loaders, legacy, eval, secrets) | Counts per §2; 0 legacy loader refs; Function-constructor pervasive in scripts; providers env-only |

**Not executed (deliberately):** `baseline_coherence.js --fix` (needs HA-01); `npm run pipeline` full (no content changes; Tend gate not triggered — documented limitation); any `stamp_cert`, `rebuild`, `insert_wave`, `remediate_*` scripts; any deletion; any May flag changes.

---

## 6. Changed-File List

**Modified (tracked):** `knowledge/REVISION_HISTORY.md` (append-only entry 2026-09-23; prior entries untouched).
**New (untracked, by location):**
- `reports/REMEDIATION_STATUS_REPORT.md` (this file)
- `reports/APP_JS_DRIFT_RECONCILIATION.md`
- `reports/P2_SAMPLE_AUDIT_PLAN.md`
- `reports/CANONICAL_TOOLCHAIN_INVENTORY.md`
- `reports/LEGACY_LOADER_PROTECTION_PLAN.md`
- `reports/UNRESOLVED_HUMAN_ACTIONS.md`
- `governance/RUNTIME_CHANGE_CONTROL_POLICY.md`
- `governance/RELEASE_READINESS_CHECKLIST.md`
- `governance/RELEASE_AND_ROLLBACK_RUNBOOK.md`
- `governance/TWO_TIER_QUALITY_GATE_DECISION.md`
- `governance/VALIDATOR_WARNING_GOVERNANCE_PLAN.md`
- `scripts/output/p2_audit_sample_20260923.json`
**Not modified:** all pack files, case files, `app/app.js`, `index_updated.html`, `styles.css`, `app/may/*`, `CURRENT_BASELINES.md`, `DEFECT_LIBRARY.md`, guard plugin/tests, validators, CI files, VERSION, package.json.
**Scratch pending HA-11 cleanup (repo root):** `app_9c32f1c.js`, `app_cb9b3b4.js`, `app_a68e3ac.js`, `app_e99d85d.js`, `app_05de776.js`, `app_4435330.js`, `CURRENT_BASELINES_cb9b3b4.md`.

---

## 7. Tests Run and Results

| Test | Result | Notes |
|------|--------|-------|
| preflight (P1) | HALT — 1 divergence (app.js only) | All content/guard checks PASS |
| preflight:p2 | PASS — 0 divergences | 3,530/3,530 Certified |
| baseline_coherence | INCOHERENT — 1 divergence | Same single hash drift |
| governance guard | 101/101 PASS | 21 rules |
| smoke | 62/62 PASS | Integrity, pause, resume, corruption, May gates |
| thorough | 18/18 observed PASS, timeout at tail | Re-run pre-release |
| validate | 0 errors / 10,345 warnings | Baseline for warning governance |
| probe:parity | PASS 0 divergences | Tier-1-only, blocklists, coverage |
| semantic_key_verifier | Exit 0, BLOCK 0 | 69 REVIEW + 27 WARN advisory |
| case_semantic_screens | Exit 0 | Stable |
| pipeline (full) | **Not run** | No content changes; Tend not triggered |

---

## 8. Remaining Release Blockers

1. **HA-01/HA-12** — app.js commit + BOM ruling + baseline recapture (G-01/A-02/S-02 formal closure).
2. **HA-04** — rollback drill with evidence (O-01/S-04).
3. **HA-05** — P2 60-item semantic review completion (D-01).
4. **HA-02/HA-03** — release sign-off + tag (G-03).
5. **HA-06** — Advisory DL-031/DL-032 tail disposition (Q-02). DL-013 CLOSED CLEAN (0 fields, verified by raw-file screen 2026-09-05); no board-minute approval needed.
6. **HA-07** — policy adoption incl. legacy negative-test build (G-02/Q-01/A-01/A-03).
7. **HA-11** — scratch-file cleanup (hygiene gate before tag).

---

## 9. Human Approvals / External Actions Still Required

See `reports/UNRESOLVED_HUMAN_ACTIONS.md` HA-01–HA-12 (each with preconditions, next command, role, impact, dependency). No other external actions identified. In particular: no credentials needed (local-first model); no vendor actions; no IMA/regulatory filings in scope.

---

## 10. Re-Review Evidence Checklist for the Board

- [ ] HA-01: `git diff app/app.js` reviewed; commit hash recorded; `baseline_coherence --fix` backup + rewrite log; `npm run preflight` 0 divergences
- [ ] HA-11: `git status --short` clean
- [ ] `npm run pipeline` exit 0 GREEN (post-HA-01)
- [ ] `npm run smoke` all PASS (post-HA-01)
- [ ] HA-04: drill evidence filed per runbook §7.2
- [ ] HA-05: `reports/P2_CERTIFICATION_AUDIT_20260923.md` with 60 worksheets + escalation log (or defects quarantined + DL entries)
- [ ] HA-06: board-minute Tier 2 acceptance in REVISION_HISTORY.md
- [ ] HA-07: policy adoption recorded; legacy negative test wired + passing
- [ ] Release tag `vX.Y.Z` + notes per checklist §6; known issues declared (U-01/O-02 limitations)

---

## Appendix A — S-01: Function-Constructor Parsing Trust Boundary

**Mechanism:** `scripts/lib/pack_parser.js:67` documents the JS fallback executing `new Function(…)` on region text (`:427` per-object parse); `build_master_registry.js:233,241` uses `eval(evalScript)`; 100+ one-shot/diagnostic scripts use `new Function` for bank loading. Runtime `app/app.js` no longer uses `eval` in `liveBankCounts` (working tree removed it — HA-01 review item); prior `scripts/exploit_test.js`/`final_stress_report.js` already flagged the two legacy-migration `eval()` calls.
**Trust assumptions:** pack/case bank files are trusted developer-authored source (same trust as code); parser runs locally in Node, never on learner input; `localStorage` content is never passed to Function/eval (SessionPersistence uses JSON.parse).
**Threat model:** malicious or corrupted pack file → arbitrary code execution **at build/validation time on the maintainer machine** (not in learner browser beyond normal script-tag trust). No privilege boundary crossed beyond "running the repo's own scripts."
**Staged safer alternative (proposal, no rewrite undertaken):** (1) integrity gate — verify SHA-256 against CURRENT_BASELINES.md before any Function/eval parse, refuse on mismatch; (2) constrained parsing — migrate the five canonical consumers (extractor, parity probe, semantic verifier, case screens, registry builder) to `pack_parser` JSON-regions-only mode with `--no-js-fallback`, logging regions that require fallback for manual review; (3) add a `no-new-function` lint rule for new scripts with waiver process. Each stage independently testable via `test_pack_parser.js` + parity probe.
**Decision needed:** none now (documentation only); parser rewrite requires test coverage + HA-07 approval.

## Appendix B — S-03: Secrets, Telemetry, Privacy (current state + minimal policy draft)

**Verified state:** `may-llm-provider-registry.js` implements Azure/OpenAI skeleton adapters reading `AZURE_OPENAI_ENDPOINT/API_KEY/DEPLOYMENT`, `OPENAI_API_KEY/MODEL` from env (`_env()`); missing credentials yield fail-closed errors, never network calls. `may-telemetry.js` + `trackFallback`/`trackCognitiveBudget` emit local telemetry; no evidence of exfiltration (no fetch to analytics endpoints found in May layer). Learner data persists in `localStorage` (sessions, history, MayLearnerState, CMAProfile) on-device. All LLM provider flags OFF (`may-feature-flags.js`: ENABLE_LLM/ENABLE_OPENAI_PROVIDER/ENABLE_AZURE_OPENAI_PROVIDER false); smoke confirms hidden-beta providers unavailable.
**Minimal policy draft:** (1) secrets never committed — env-only, `.gitignore` enforced, CI uses secret store; (2) no provider flag enabled without privacy notice + consent record + data-flow memo (what leaves device, retention, processor); (3) telemetry stays on-device by default; any remote telemetry requires opt-in + endpoint allowlist; (4) admin history-delete path (working tree) purges May aggregates — verify before release. **Do not claim "no data leaves the device"** beyond current flags-off configuration — enabling any provider re-opens this review.

## Appendix C — AI-01: May Prompt/Version/Evaluation Governance

**Inventory:** `prompts/` holds third-party review/authoring prompts (certify, compare, longcat2/nemotron/laguna review packs, case-pack reviews, pause-clock fix) — reviewer instructions, not runtime May prompts. Runtime May artifacts: `app/may/may-llm-adapter.js`, `may-llm-provider-registry.js`, `may-llm-types.js`, `may-context-builder.js`, `may-coaching-router.js`, `may-coaching-orchestrator.js`, `agents/*` (misconception/formula/hint/whisperer/guard/planner + P2 risk/investment/decision), `may-telemetry*.js`, `may-pilot-activation.js`.
**Version manifests:** none found for prompts/models (local `providers/models/mobilebert-intent-q8` artifacts present per smoke; no manifest pinning them to code version). **Test cases:** smoke asserts provider registration + hidden-beta unavailability + routing gates (routeWithGate, 0.60 thresholds, trackFallback, DL-060 truthfulness); `test_may_*.js` suites exist (regression/stage-C/tutoring-safety) but were not executed this session. **Fallback behavior:** registry `_fallback` + router fallbackBehavior + orchestrator `degraded[]`, all exercised with flags off. **Provider-failure tests:** fail-closed paths coded (missing env → error, never send); live failure injection not performed (would require enabling flags — prohibited).
**Proposal:** (1) prompt/config version manifest (`prompts/MANIFEST.md`: file, SHA-256, model, threshold, flag) consumed by smoke; (2) fallback matrix (provider × failure mode × expected learner-visible behavior × test); (3) eval set of scripted coaching scenarios with recorded outputs, re-run per May change. No flags touched; no learner data sent.

## Appendix D — U-01: Accessibility Test Checklist (human testing required)

| # | Check | Method available here | Status |
|---|-------|----------------------|--------|
| 1 | Keyboard-only full MCQ run (Tab order, Enter/Space, focus visible) | Static: tabbable controls + focus styles in styles.css; smoke DOM checks | **Needs human run** |
| 2 | Focus order: setup → question → choices → nav → submit → review | Static: render order in app.js | **Needs human run** |
| 3 | Dialogs (pause overlay, submit double-confirm, recovery modal): focus trap + Esc + return focus | Static: overlay/submit/recovery code paths present | **Needs human run** |
| 4 | Pause/resume announced; timer exposed as text (not color-only) | Static: pause overlay + timer text render | **Needs human run** |
| 5 | Submit confirmation reachable + cancellable in two locations | Static: confirmFinish two-stage per AGENTS §19.3 | **Needs human run (HA-10)** |
| 6 | Semantic labels (aria) on choices, nav, timer, dialogs | Static inspection (not completed) | **Needs human + tooling** |
| 7 | Contrast ratios (text, exhibits, integrity-mode banners) | Measurement tooling required | **Needs human + tooling** |
| 8 | Screen-reader pass (NVDA/JAWS/VoiceOver) full exam | Assistive tech required | **Needs human (HA-10)** |
| 9 | 150% zoom / responsive scaling, no horizontal scroll | Browser matrix required | **Needs human** |
| 10 | No information by color alone (charts/exhibits grayscale-legible) | Human judgment | **Needs human** |

**Non-destructive checks performed:** none beyond smoke's DOM-level render assertions. All screen-reader/browser/device testing is explicitly unperformed — declare as limitation in release notes (HA-10).

## Appendix E — O-02: Dependency/Security Cadence (configured vs evidenced)

| Control | Configured | Execution evidence available locally |
|---------|-----------|--------------------------------------|
| `ci.yml` preflight/governance/validate/registry jobs | Yes (push/PR/dispatch, Node 22) | Local equivalents green; hosted run history not accessible |
| `smoke.yml` Playwright weekly + dispatch | Yes | Local `npm run smoke` green; hosted history not accessible |
| `codeql.yml` JS analysis weekly + push/PR | Yes | **No local execution; no SARIF/results in repo** |
| `dependabot.yml` weekly npm (Mon 09:00 America/Chicago, ≤10 PRs) | Yes | **No PR history accessible; `package-lock.json` present (43425 bytes)** |
| Branch protection / required checks | Unknown (server-side) | **Cannot verify — HA-09** |

**Proposed cadence (no hosted claims):** weekly local `npm run smoke` + `npm audit` review; monthly dependency review against `package-lock.json`; quarterly CodeQL result review once HA-09 confirms execution; required-check mapping (ci.yml jobs ↔ protection rules) filed after HA-09. Current dependencies: electron ^44.4.3, playwright ^1.61.1, @huggingface/transformers ^4.2.0 (dev).

---

## 12. Final Gate

**OUTCOME A — RELEASE BLOCKED.**

P0 is not fully reconciled (attribution complete, normalization pending HA-01/HA-12); release-path evidence (HA-04 drill), runtime policy adoption (HA-07), and P2 sample review (HA-05) are unmet. No Outcome B/C conditions satisfied. All remaining items are clearly human-authority actions (UNRESOLVED_HUMAN_ACTIONS.md HA-01–HA-12), not unknown engineering gaps — except the 210 `unknown`-class scripts, which are explicitly scoped as owner-triage backlog, not release evidence.

**Exact remaining blockers:** §8 items 1–7. **Shortest safe next sequence:** §1 items 1–5. **Re-review checklist:** §10.
