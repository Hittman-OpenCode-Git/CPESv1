# RUNTIME_CHANGE_CONTROL_POLICY.md

**Version:** 1.0
**Date:** 2026-09-23
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md
**Status:** Active — Mandatory for all Full Governance Lane sessions

---

## 1. Purpose

Establish enforceable change control for runtime-critical files that affect learner safety, exam integrity, certification validity, and delivery pool correctness. This policy extends the existing content guardrails (governance-guard.js Rules 1-21) to cover application runtime logic.

---

## 2. In-Scope Files

### 2.1 Tier 1 — Core Runtime (Highest Control)

| File | Protection | Rationale |
|------|------------|-----------|
| `app/app.js` | Hash baseline + diff review + regression suite | Exam engine, timer, pause/resume, submission, session restore, delivery pool selection, integrity mode |
| `index_updated.html` | Hash baseline + smoke test | Entry point, script loading order, CSP, UI structure |
| `styles.css` | Hash baseline | Visual rendering, accessibility contrast, exam-integrity-mode styles |

### 2.2 Tier 2 — May Coaching Layer (High Control)

| File | Protection | Rationale |
|------|------------|-----------|
| `app/may/may-core.js` | Hash baseline + smoke test | Coaching orchestration, fallback routing, learner-facing responses |
| `app/may/may-learner-state.js` | Hash baseline + smoke test | Learner profile, session history, telemetry |
| `app/may/may-coaching-orchestrator.js` | Hash baseline | Agent dispatch, graceful degradation |
| `app/may/may-context-builder.js` | Hash baseline | Context assembly for LLM prompts |
| `app/may/may-feature-flags.js` | Hash baseline | Feature gate integrity (Phase 0-2 flags) |
| `app/may/providers/*.js` | Hash baseline | Provider contracts, fallback behavior |

### 2.3 Tier 3 — Delivery & Persistence Logic (High Control)

| File | Protection | Rationale |
|------|------------|-----------|
| `app/app.js` — `assignTier()`, `selectWithDifficultyDistribution()`, `getCasePool()`, `getMCQPool()` | Inline guard comments + governance-guard Rule 7 (derived registry) | Certified-only pool enforcement (§7 AGENTS.md, §1.7.1 CAQS) |
| `app/app.js` — `SessionPersistence` | Hash baseline + corruption restore tests | Session save/restore, history, localStorage integrity |
| `app/app.js` — `P2BankLoader`, `resolveP2MCQBanks()` | Hash baseline | P2 content loading, lazy-load integrity |
| `app/app.js` — `ExamSessionManager` timer/pause/submit | Hash baseline + W1-A/B/C/D smoke tests | Exam integrity mode, pause clock, double-confirmation submit |

### 2.4 Tier 4 — Governance Tooling (Highest Control)

| File | Protection | Rationale |
|------|------------|-----------|
| `.opencode/plugins/governance-guard.js` | Hash baseline + test suite (101 tests) | 21 BLOCK-level rules |
| `scripts/test_governance_guard.js` | Hash baseline | Guard test integrity |
| `scripts/preflight.js` | Hash baseline | T0 integrity gate |
| `scripts/baseline_coherence.js` | Hash baseline | Baseline verification |
| `scripts/build_master_registry.js` | Hash baseline | Registry regeneration |
| `scripts/validators/ExplanationValidator.js` | Hash baseline | DL-008/DL-018 detection |

---

## 3. Required Review Evidence by Change Category

| Category | Required Evidence | Minimum Tests |
|----------|-------------------|---------------|
| **Timer / Pause / Resume** | Diff + W1-A/D smoke test log | `npm run smoke` (W1-A Full Exam, W1-D Pause clock) |
| **Submission / Integrity Mode** | Diff + W1-A/B smoke test log | `npm run smoke` (W1-A/B Full Exam, Real Conditions) |
| **Session Restore / localStorage** | Diff + corruption restore test log | `npm run smoke` (Abnormal: corrupted session) |
| **Delivery Pool / Tier Assignment** | Diff + preflight + certified count verification | `npm run preflight`, `npm run probe:parity` |
| **May Coaching / LLM Integration** | Diff + smoke test (May-alive gate) | `npm run smoke` (May core API, feature flags, providers) |
| **Content Pack Loading / P2 Banks** | Diff + preflight + pool parity | `npm run preflight`, `npm run probe:parity` |
| **Governance Guard / Validators** | Diff + guard test suite (101 tests) | `node scripts/test_governance_guard.js` |
| **UI / Accessibility / CSS** | Diff + smoke test + manual checklist | `npm run smoke`, Accessibility checklist (U-01) |
| **Bug Fix / Refactor (non-behavioral)** | Diff + relevant regression tests | Affected test suite + `npm run smoke` |

---

## 4. Baseline Update Procedure

### 4.1 Authoritative Baseline Source

`knowledge/CURRENT_BASELINES.md` §1 is the single source of truth for SHA-256 hashes of all governance-critical files.

### 4.2 Update Process (Full Governance Lane Only)

1. **Pre-condition:** All required regression tests PASS (green)
2. **Pre-condition:** `npm run preflight` reports 0 divergences
3. **Pre-condition:** `npm run pipeline` exits 0 (GREEN)
4. **Action:** Run `Get-FileHash -Algorithm SHA256` on each modified governance-critical file
5. **Action:** Update `CURRENT_BASELINES.md` §1 table with new hashes, sizes, timestamps, provenance
6. **Action:** Append `knowledge/REVISION_HISTORY.md` entry with:
   - Date, session ID
   - Files changed with before/after hashes
   - Authorization reference (Board directive, defect ID, AGENTS.md section)
   - Test results summary (smoke, preflight, pipeline, guard)
   - Certified pool impact statement
7. **Verification:** Re-run `npm run preflight` + `npm run baseline_coherence` — both must report 0 divergences

### 4.3 Prohibited Shortcuts

- ❌ Updating `CURRENT_BASELINES.md` hash without running regression tests
- ❌ Updating hash without `REVISION_HISTORY.md` entry
- ❌ Claiming "functional equivalence" without diff review
- ❌ Bypassing `npm run pipeline` gate
- ❌ Using `--force` or skipping guard tests

---

## 5. Emergency Fix Handling

### 5.1 Definition

An emergency fix addresses a **learner-safety incident in production** (wrong answer delivered, crash, data loss, integrity bypass).

### 5.2 Emergency Process

1. **Immediate:** Apply minimal fix to restore safety
2. **Same session:** Run `npm run smoke` + targeted regression test
3. **Same session:** Run `npm run preflight` — must pass
4. **Document:** `REVISION_HISTORY.md` entry marked `EMERGENCY` with justification
5. **Follow-up (next Full Governance session):** Full baseline update procedure (§4.2) + `npm run pipeline`

### 5.3 Emergency Fixes Do NOT

- Skip smoke test
- Skip preflight
- Skip REVISION_HISTORY entry
- Modify content packs (answer keys, explanations, certification states) without full CAQS §1.6 verification

---

## 6. Responsible Roles

| Role | Responsibility |
|------|----------------|
| **Release Manager** | Final sign-off on baseline updates; release gate authority |
| **JavaScript Architect** | Implements runtime changes; produces diff + test evidence |
| **Validator** | Runs regression suites; certifies test evidence |
| **Governance Validator (AI)** | Enforces governance-guard rules; validates change-control compliance |
| **Accountant / Psychometrician** | Review content-impacting changes (tier assignment, pool selection) |

**Rule:** No persona may self-approve. JavaScript Architect proposes; Validator tests; Release Manager approves.

---

## 7. Sign-Off Requirements

| Change Tier | Minimum Signatures |
|-------------|-------------------|
| Tier 1 (Core Runtime) | JavaScript Architect + Validator + Release Manager |
| Tier 2 (May Layer) | JavaScript Architect + Validator + Release Manager |
| Tier 3 (Delivery/Persistence) | JavaScript Architect + Validator + Accountant (if pool logic) + Release Manager |
| Tier 4 (Governance Tooling) | Governance Validator + Release Manager |

**Evidence package** for each sign-off:
- Unified diff (git diff or equivalent)
- Test command output logs
- Preflight/pipeline results
- REVISION_HISTORY.md entry draft

---

## 8. Automated Enforcement (Implemented)

| Mechanism | Scope | Status |
|-----------|-------|--------|
| `npm run preflight` | T0 gate — QID counts, parse, certified totals, guard tests, baseline coherence | **Active** — HALT on divergence |
| `npm run pipeline` | Tend gate — validate → case-screens → build-registry → dashboard → baseline-coherence | **Active** — Full Governance Lane required |
| `governance-guard.js` Rules 1-21 | Write-time BLOCK on content packs, registries, certification writes | **Active** — 101 tests PASS |
| `scripts/probe:parity` | Delivery pool contract — Tier-1 Certified-only, blocklist, validator coverage | **Active** — FAIL on mismatch |
| Smoke test (W1-A/B/C/D) | Runtime integrity — timer, pause, resume, submit, integrity mode, May gating | **Active** — 62 checks |

---

## 9. CI Integration (Documented)

| Pipeline | Trigger | Required Gates |
|----------|---------|----------------|
| **Pre-commit** (local) | Manual `npm run preflight` | Preflight 0 divergences |
| **Pre-push** (local) | Manual `npm run pipeline` | Pipeline GREEN |
| **CI Build** (if hosted) | Push to main | Preflight + Pipeline + Guard tests |
| **Release Tag** | Manual `git tag` | All above + Release Manager sign-off + Rollback drill evidence |

**Note:** This repository uses local-first distribution (Electron / file-based). No hosted CI is currently configured. All gates must be run locally and evidenced in REVISION_HISTORY.md before any release tag.

---

## 10. Testing the Change Control

### 9.1 Expected-Pass Case

**Scenario:** Authorized bug fix (e.g., DL-022 null-guard addition)
1. Make change to `app/app.js`
2. Run `npm run smoke` → PASS
3. Run `npm run preflight` → PASS (0 divergences after baseline update)
4. Run `npm run pipeline` → GREEN
5. Update baseline per §4.2 → `npm run baseline_coherence` → 0 divergences

### 9.2 Expected-Fail/Change-Detected Case

**Scenario:** Unauthorized modification to `assignTier()` (removing non-Certified block)
1. Make change to `app/app.js`
2. Run `npm run preflight` → **HALT** (baseline coherence divergence)
3. Run `npm run smoke` → **FAIL** (W1-A/B integrity mode or pool delivery test)
4. Guard test may not catch directly, but preflight + smoke provide detection

---

## 11. Relationship to Content Guardrails

| Content Guardrail | Runtime Change Control |
|-------------------|------------------------|
| Governance-guard Rules 1-21 (content packs) | This policy (runtime files) |
| CAQS §1.6 six-dimension verification | Regression test suites |
| `REVISION_HISTORY.md` for content | `REVISION_HISTORY.md` for runtime (same file) |
| `CURRENT_BASELINES.md` content pack hashes | `CURRENT_BASELINES.md` runtime file hashes (same file) |
| `DEFECT_LIBRARY.md` content defects | `DEFECT_LIBRARY.md` runtime defects (DL-014, DL-022, DL-037, DL-042) |

**No weakening:** This policy adds coverage; it does not relax any content guardrail.

---

## 12. Appendices

### A. Quick Reference — Commands by Tier

| Tier | Baseline Check | Regression Test | Update Command |
|------|----------------|-----------------|----------------|
| 1 | `Get-FileHash app/app.js` | `npm run smoke` + `npm run preflight` | `Get-FileHash` → update CURRENT_BASELINES.md |
| 2 | `Get-FileHash app/may/*.js` | `npm run smoke` (May-alive gate) | Same |
| 3 | `Get-FileHash app/app.js` | `npm run preflight` + `npm run probe:parity` | Same |
| 4 | `Get-FileHash .opencode/plugins/governance-guard.js` | `node scripts/test_governance_guard.js` | Same |

### B. Hash Verification at Session Start (T0)

```powershell
# Run at start of every Full Governance Lane session
Get-FileHash -Algorithm SHA256 app/app.js
Get-FileHash -Algorithm SHA256 index_updated.html
Get-FileHash -Algorithm SHA256 styles.css
Get-FileHash -Algorithm SHA256 app/may/may-core.js
Get-FileHash -Algorithm SHA256 app/may/may-learner-state.js
Get-FileHash -Algorithm SHA256 .opencode/plugins/governance-guard.js
# Compare each against CURRENT_BASELINES.md §1
# Any mismatch → HALT all certification operations
```

---

**End of Policy**

**Next Review:** 2026-10-23 or upon next governance guard rule addition
**Owner:** Release Manager / JavaScript Architect