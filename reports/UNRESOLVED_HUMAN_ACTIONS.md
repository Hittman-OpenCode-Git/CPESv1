# UNRESOLVED_HUMAN_ACTIONS.md

**Version:** 1.0
**Date:** 2026-09-23
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md
**Status:** Active — human decision queue; release blocked until P0 items clear

---

## How to read this file

Each entry states: action needed; why the LLM cannot complete it; preconditions already satisfied; exact artifact/command needed next; responsible role; release impact; deadline or sequencing dependency. Entries close only with named human sign-off recorded in `knowledge/REVISION_HISTORY.md`.

---

## HA-01 — Authorize app.js working-directory changes and baseline recapture (P0 BLOCKER)

- **Action needed:** Review the uncommitted `app/app.js` working-directory diff (860 lines vs `cb9b3b4`), approve commit (recommended: strip leading BOM first), then run the authorized recapture `node scripts/baseline_coherence.js --fix` and record a REVISION_HISTORY.md entry.
- **Why LLM cannot complete:** Operating rule 3 prohibits normalizing baseline drift without human attribution of code changes; one diff hunk (leading BOM character) is unattributed; `--fix` rewrites governance baselines (Rule 7 token path) and must not run on LLM authority.
- **Preconditions satisfied:** Full attribution table (APP_JS_DRIFT_RECONCILIATION.md §4 — all functional hunks mapped to F1 wiring / H2 fix / Board S7 / Phase 4 / DL-014+DL-022 / W_ADMIN+W9 T5); regression green (smoke 62/62, thorough 18/18 observed, guard 101/101, parity PASS, semantic verifier exit 0 BLOCK 0, case screens exit 0); fabricated documented hash proven (E998A72A matches no file, backup, or commit).
- **Artifact/command next:** `reports/APP_JS_DRIFT_RECONCILIATION.md` (review package) → `git diff app/app.js` (human review) → `node scripts/baseline_coherence.js --fix` → `npm run preflight` (must show 0 divergences).
- **Responsible role:** Release Manager + JavaScript Architect.
- **Release impact:** **BLOCKING** — G-01/A-02/S-02 stay unresolved; preflight HALT persists until this clears.
- **Deadline/dependency:** Before any release tag; gates HA-02/HA-03/HA-05.

## HA-02 — Sign formal release status / approve release notes

- **Action needed:** Sign RELEASE_READINESS_CHECKLIST.md and the vX.Y.Z release notes; declare whether residual Tier 2 debt is accepted.
- **Why LLM cannot complete:** Release status is a formal governance claim; LLM is prohibited from altering release labels or production claims to make gates appear green (operating rule 10).
- **Preconditions satisfied:** Checklist, runbook, two-tier policy, warning governance plan all drafted; Tier 1 gates green; Tier 2 verified PASS — DL-013 CLOSED CLEAN (0 non-Certified boilerplate fields pool-wide per 2026-09-05 closeout); preflight 0 divergences (2026-09-23).
- **Artifact/command next:** `governance/RELEASE_READINESS_CHECKLIST.md` §12 + `governance/TWO_TIER_QUALITY_GATE_DECISION.md` §5 board-minute fields.
- **Responsible role:** Release Manager (+ Accountant for Tier 2 acceptance).
- **Release impact:** **BLOCKING** — Outcome C impossible without this.
- **Deadline/dependency:** After HA-01; before HA-03.

## HA-03 — Create and push release tag / publish artifact

- **Action needed:** Execute `RELEASE_AND_ROLLBACK_RUNBOOK.md` §3 (version bump, annotated tag, verification). No credentials exist in this environment for publishing; local git tag is the only available mechanism.
- **Why LLM cannot complete:** Tag creation and publication are human-authority acts; environment lacks credentials and the LLM must not perform release-authority operations.
- **Preconditions satisfied:** Runbook procedure documented; pre-release backup procedure defined; no tag created this session.
- **Artifact/command next:** `governance/RELEASE_AND_ROLLBACK_RUNBOOK.md` §3.1 steps; `git tag -a vX.Y.Z`.
- **Responsible role:** Release Manager.
- **Release impact:** **BLOCKING** for any formal release.
- **Deadline/dependency:** After HA-01 + HA-02.

## HA-04 — Perform production rollback drill (O-01/S-04)

- **Action needed:** Execute `RELEASE_AND_ROLLBACK_RUNBOOK.md` §7 drill (git-based rollback to prior tag + §6 validation), record evidence with the §7.2 template.
- **Why LLM cannot complete:** Drill requires human operator judgment, timing, and sign-off; LLM-executed rollbacks would themselves be unauthorized state changes.
- **Preconditions satisfied:** Runbook + evidence template complete; last file-level restores verified via rebuild_baselines history; no full drill ever executed.
- **Artifact/command next:** `governance/RELEASE_AND_ROLLBACK_RUNBOOK.md` §7.1; evidence filed under `reports/`.
- **Responsible role:** Release Manager (operator) + Validator (evidence review).
- **Release impact:** **BLOCKING** — O-01 release-path evidence unmet until drilled.
- **Deadline/dependency:** Before release tag; quarterly thereafter.

## HA-05 — Execute P2 certification sample audit (D-01) — semantic review

- **Action needed:** Assign a qualified Accountant/CMA reviewer to complete the six-dimension review of the frozen 60-QID sample and sign the audit report.
- **Why LLM cannot complete:** Dimensions A (key correctness), B (explanation correctness), C (stem clarity), D (distractor plausibility), E (domain alignment) require qualified human accounting judgment; LLM must not fabricate semantic adjudications.
- **Preconditions satisfied:** `reports/P2_SAMPLE_AUDIT_PLAN.md` with frozen QID list (seed 20260923, A11/B11/C14/D8/E8/F8, 60 distinct topics, full cognitive spread); machine-readable `scripts/output/p2_audit_sample_20260923.json`; automated structural pre-check done (all 60 parse, Certified, Part2OnlyFlag true, parity clean, semantic gate exit 0 BLOCK 0).
- **Artifact/command next:** Worksheets per plan §10 → `reports/P2_CERTIFICATION_AUDIT_20260923.md`; escalations via quarantine + DL filing.
- **Responsible role:** Accountant (reviewer) + Release Manager (acceptance).
- **Release impact:** **BLOCKING** for any claim resembling "P2 audit passed"; release may proceed only with the audit package explicitly marked pending if the board accepts Outcome A with D-01 open.
- **Deadline/dependency:** Independent of HA-01; required before P2-related release claims.

## HA-06 — Formally accept residual Tier 2 psychometric debt (Q-02)

- **Action needed:** Board-minute approval for remaining advisory Tier 2 residuals (DL-031 definition-match monitoring tail, DL-032 legacy-bank difficulty tail, DL-031/DL-032 disposition pending human decision). DL-013 boilerplate is CLOSED CLEAN (0 fields verified by raw-file screen; 0 ≤ 200 threshold) — no board-minute approval needed for DL-013. Per TWO_TIER_QUALITY_GATE_DECISION.md §2.2 amendment (2026-09-23), the `exceedance` column distinguishes below-threshold residual (no approval needed) from above-threshold exception.
- **Why LLM cannot complete:** DL-031/DL-032 disposition involves two genuine governance forks: (a) "monitored-class" label on 483 unadjudicated DL-031 items is not a finding; (b) DL-032 legacy bank (330 items, all Moderate) requires either recalibration or formal scope retirement — authoring new items alone does not remediate a known-miscalibrated bank. Debt acceptance is a governance judgment balancing educational quality against throughput; LLM must not relabel warnings as resolved by assertion.
- **Preconditions satisfied:** Two-tier policy with thresholds (§2.2 exceedance disambiguation applied); warning governance plan with taxonomy; current counts measured (validate 10,345 warnings, 0 errors; psychometric 6,730; preflight 0 divergences); DL-013 verified CLOSED CLEAN by raw-file screen (0 template hits in pack_a_corrected.js); DL-031 broader triage closed as systematic false positives (REVISION_HISTORY.md 2026-09-10); DL-032 demand-consistent (0 mismatches).
- **Artifact/command next:** `governance/TWO_TIER_QUALITY_GATE_DECISION.md` §5 board-minute fields for DL-031/DL-032 only → REVISION_HISTORY.md entry.
- **Responsible role:** Release Manager + Accountant (+ Psychometrician for psychometric classes).
- **Release impact:** Advisory only — no Tier 2 debt exceeds threshold; release is READY without HA-06 board-minute approval. HA-06 tracks unresolved DL-031/DL-032 human decisions only.
- **Deadline/dependency:** Before release sign-off; review ≤90 days.

## HA-07 — Adopt governance-policy amendments (G-02)

- **Action needed:** Approve and adopt: RUNTIME_CHANGE_CONTROL_POLICY.md, TWO_TIER_QUALITY_GATE_DECISION.md, VALIDATOR_WARNING_GOVERNANCE_PLAN.md (incl. allowlist mechanism), CANONICAL_TOOLCHAIN_INVENTORY.md, LEGACY_LOADER_PROTECTION_PLAN.md (§3.1 negative-test implementation).
- **Why LLM cannot complete:** Policy amendments are governance decisions requiring human authority; LLM drafted proposals only.
- **Preconditions satisfied:** All five documents complete; existing content guardrails untouched (guard 101/101 PASS); automation for legacy negative test specified with pass/fail cases.
- **Artifact/command next:** Review each document; record adoption in REVISION_HISTORY.md; assign LEGACY_LOADER guard implementation to JavaScript Architect.
- **Responsible role:** Release Manager (adoption) + Governance Validator.
- **Release impact:** Non-blocking for engineering, blocking for G-02 closure.
- **Deadline/dependency:** Before claiming G-02 remediated.

## HA-08 — Offline-only directive: no realtime access, May stays local (AI-01/S-03) — DIRECTED 2026-09-23

- **Human directive (binding, 2026-09-23):** The application must not require or use internet connectivity while working. Updates come from git and content updates only — never realtime access. If May is ever extended to the point of realtime access, governance must be revisited first. Until then, realtime/online capability is a student-privacy concern and is to be avoided until studied.
- **Effect:** The advisory board's "conditional pilot" long-ledger framing is **closed as unauthorized future work** until this directive is explicitly revisited by human authority. Keep-off is no longer a recommendation — it is a directed posture with three components: (a) all LLM provider flags stay OFF, (b) no network-dependent runtime behavior (the only `fetch` sites — provider-registry ×2, may-core manifest ×1 — must never execute against remote endpoints), (c) no pilot evaluation involving external transmission without a prior governance revisit + privacy study.
- **Action needed:** None to preserve posture (already compliant). Any future proposal touching network behavior requires a new HA entry + privacy study first.
- **Why LLM cannot complete:** Enabling providers sends learner data to external endpoints, requires secrets provisioning and privacy consent — all human-authority decisions. LLM must not enable flags to test them.
- **Preconditions satisfied:** Flag inventory verified (ENABLE_LLM/ENABLE_OPENAI_PROVIDER/ENABLE_AZURE_OPENAI_PROVIDER false; P2 domain agents true but local; no API keys in repo — providers read env vars only); smoke confirms hidden-beta providers not available.
- **Artifact/command next:** No command. If a pilot is ever authorized: provision env vars out-of-band, set flags via `MayFeatureFlags.setFlag`, run provider-failure tests, record privacy consent (see REMEDIATION_STATUS_REPORT.md App. C).
- **Responsible role:** Release Manager (+ privacy owner).
- **Release impact:** None while flags stay off; any enablement re-opens S-03/AI-01 review.
- **Deadline/dependency:** No deadline; standing posture.

## HA-09 — Confirm hosted CI branch-protection / required-check settings (O-02)

- **Action needed:** In the hosting provider UI, confirm branch protection on `main` and required checks (preflight, governance, validate, registry per ci.yml), plus CodeQL/Dependabot execution evidence.
- **Why LLM cannot complete:** No access to hosting-provider settings; cannot verify server-side configuration from the repo.
- **Preconditions satisfied:** ci.yml, smoke.yml, codeql.yml, dependabot.yml inventoried; local equivalents all green; gap precisely documented (REMEDIATION_STATUS_REPORT.md App. E).
- **Artifact/command next:** Provider settings screenshots or API output filed under `reports/`; required-check list mapped to ci.yml jobs.
- **Responsible role:** Release Manager / repo admin.
- **Release impact:** Non-blocking for local release; blocking for hosted-release claims.
- **Deadline/dependency:** Before any hosted deployment claim.

## HA-10 — Assistive-technology accessibility testing (U-01)

- **Action needed:** Screen-reader pass (NVDA/JAWS/VoiceOver), keyboard-only full-exam run, and contrast measurement with tooling, recorded against the checklist in REMEDIATION_STATUS_REPORT.md App. D.
- **Why LLM cannot complete:** Environment has no assistive technology, browser/device matrix, or human sensory judgment; LLM performed only static code inspection (dialogs, focus order, pause/submit paths present; live measurements not possible).
- **Preconditions satisfied:** Checklist created; smoke covers render paths and keyboard flows at the DOM level; no accessibility code changes made.
- **Artifact/command next:** Completed checklist + tool outputs filed under `reports/`; defects filed to DEFECT_LIBRARY.md if found.
- **Responsible role:** Release Manager (assign tester).
- **Release impact:** Non-blocking for correctness release; must be declared as known limitation in release notes.
- **Deadline/dependency:** Before any accessibility conformance claim.

## HA-11 — Authorize root-hygiene cleanup of this session's scratch files (§3.1 staged authorization)

- **Action needed:** Authorize deletion of the remediation session's temporary evidence files from the repository root (reproducible `git show` outputs, not backups, not content):
  `app_9c32f1c.js`, `app_cb9b3b4.js`, `app_a68e3ac.js`, `app_e99d85d.js`, `app_05de776.js`, `app_4435330.js`, `CURRENT_BASELINES_cb9b3b4.md`.
- **Why LLM cannot complete:** AGENTS.md §3.1 requires staged authorization for any file-deletion primitive: proposal (this entry) → backup (files are byte-reproducible via `git show <commit>:app/app.js`; no backup needed beyond this note) → explicit authorization → verification.
- **Preconditions satisfied:** Proposal complete (file list above); files verified as scratch (no pack/case content, no governance history); hashes recorded in APP_JS_DRIFT_RECONCILIATION.md §1.
- **Artifact/command next:** On authorization phrase ("delete the files" / "execute the cleanup"): `Remove-Item app_9c32f1c.js, app_cb9b3b4.js, app_a68e3ac.js, app_e99d85d.js, app_05de776.js, app_4435330.js, CURRENT_BASELINES_cb9b3b4.md` then `git status --short` to verify clean.
- **Responsible role:** Release Manager (or user acting as repo owner).
- **Release impact:** Non-blocking for gates, but root-hygiene violation (Constitution §11) until cleared.
- **Deadline/dependency:** Immediately; required before release tag (clean tree).

## HA-12 — Rule on unattributed BOM byte in app.js (P0 detail)

- **Action needed:** Decide: strip the leading BOM (`﻿` at `app/app.js:1`) as an editor artifact during the HA-01 commit, or retain and document. Recommendation: strip.
- **Why LLM cannot complete:** Any byte change to a governance-critical runtime file requires human attribution per operating rule 3, however cosmetic.
- **Preconditions satisfied:** Diff hunk identified (git diff `--- a/app/app.js` line 1); zero functional impact assessed; smoke/thorough green with the byte present.
- **Artifact/command next:** One-byte edit + `Get-FileHash` recapture inside the HA-01 commit.
- **Responsible role:** JavaScript Architect + Release Manager.
- **Release impact:** Folds into HA-01 (blocking).
- **Deadline/dependency:** With HA-01.
