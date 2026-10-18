# RELEASE_READINESS_CHECKLIST.md

**Version:** 1.0
**Date:** 2026-09-23
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md, RUNTIME_CHANGE_CONTROL_POLICY.md
**Status:** Active — Mandatory pre-release gate

---

## 1. Distribution Model Declaration

**Actual Supported Channel:** Local-first Electron application / file-based distribution
- **No hosted web deployment** exists or is configured
- **No CI/CD pipeline** to external registry (npm, Docker, app stores)
- **Artifacts:** `app/app.js`, `index_updated.html`, `styles.css`, `app/may/**`, `content/packs/**`, `p2/**`, `scripts/**`, `knowledge/**`
- **Runtime:** Electron (via `main.js` entry point per `package.json`) or direct file:// browser load
- **Versioning:** `VERSION` file (semantic) + git tag + `CURRENT_BASELINES.md` hash registry

---

## 2. Prerequisites & Required Green Gates

| Gate | Command | Required Result | Evidence Location |
|------|---------|-----------------|-------------------|
| **T0 Preflight** | `npm run preflight` | 0 divergences | Console output + REVISION_HISTORY.md |
| **Baseline Coherence** | `node scripts/baseline_coherence.js` | 0 divergences | Console output |
| **Governance Guard** | `node scripts/test_governance_guard.js` | 101/101 PASS | Console output |
| **Smoke Test** | `npm run smoke` | All 62 checks PASS | Console output (W1-A/B/C/D integrity) |
| **Thorough Test** | `node scripts/thorough_test.js` | All checks PASS | Console output |
| **Pipeline (Tend)** | `npm run pipeline` | Exit 0, GREEN | Console output (validate → case-screens → build-registry → dashboard → baseline-coherence) |
| **Pool Parity** | `npm run probe:parity` | Exit 0 | Console output (Tier-1 Certified-only, blocklist, coverage) |
| **P2 Preflight** | `npm run preflight:p2` | 0 divergences | Console output |

**All gates must be green in the same session.** No gate may be waived.

---

## 3. Versioning & Tagging Procedure

| Step | Action | Command | Verification |
|------|--------|---------|--------------|
| 3.1 | Update `VERSION` file | `echo "X.Y.Z" > VERSION` | `cat VERSION` |
| 3.2 | Update `package.json` version | Edit `"version": "X.Y.Z"` | `npm pkg get version` |
| 3.3 | Commit version bump | `git add VERSION package.json; git commit -m "chore(release): vX.Y.Z"` | `git log -1 --oneline` |
| 3.4 | Create annotated tag | `git tag -a "vX.Y.Z" -m "Release vX.Y.Z — [summary]"` | `git tag -l "vX.Y.Z"` |
| 3.5 | Verify tag points to green commit | `git show vX.Y.Z --stat` | Commit hash matches last green pipeline run |

**Tag Format:** `v<major>.<minor>.<patch>` (semantic versioning per PROJECT_CONSTITUTION.md §11.1)

---

## 4. Signer / Approver Roles

| Role | Required For | Authority |
|------|--------------|-----------|
| **Release Manager** | Final release sign-off, tag creation | Sole authority to push tag / declare release |
| **JavaScript Architect** | Runtime code changes review | Must sign diff + test evidence |
| **Validator** | Regression test certification | Must certify all gates green |
| **Accountant** | Content pool changes (tier assignment, certification) | Must sign CAQS verification |
| **Governance Validator** | Guard rule compliance | Must certify 101/101 PASS |

**Minimum signatures for release:** Release Manager + Validator + (JavaScript Architect if runtime changes) + (Accountant if content changes)

---

## 5. Artifact Creation & Verification

### 5.1 Electron Build (if applicable)

| Step | Command | Expected Artifact |
|------|---------|-------------------|
| Install deps | `npm ci` | `node_modules/` clean |
| Build | `npm run build` (if defined) | `dist/` or `out/` with signed executable |
| Verify | `Get-FileHash dist/*.exe` | SHA-256 recorded in release notes |

**Note:** No `build` script currently defined in `package.json`. Electron runs from source via `main.js`.

### 5.2 Source Distribution (Primary)

| Artifact | Verification |
|----------|--------------|
| Git repository at tag | `git clone --branch vX.Y.Z <repo>` |
| `CURRENT_BASELINES.md` hashes | `npm run baseline_coherence` → 0 divergences |
| Content pack integrity | `npm run preflight` → 0 divergences |
| Governance guard integrity | `node scripts/test_governance_guard.js` → 101/101 PASS |

---

## 6. Release Notes Template

```markdown
# Release vX.Y.Z — <Date>

## Summary
<One-paragraph description of release scope>

## Content Changes
- P1 MCQ: <count> items, <count> Certified, <count> Archived
- P1 Cases: <count> cases, <count> items, all Certified
- P2 MCQ: <count> items across <packs>, <count> Certified
- P2 Cases: <count> cases, <count> items, <count> strict-eligible

## Runtime Changes
- [ ] Timer / Pause / Resume
- [ ] Submission / Integrity Mode
- [ ] Session Restore / localStorage
- [ ] Delivery Pool / Tier Logic
- [ ] May Coaching / LLM
- [ ] P2 Content Loading
- [ ] UI / Accessibility

## Defects Remediated
- DL-XXX: <description>
- ...

## Known Issues
- <Issue ID>: <description> — <mitigation / timeline>

## Certification Provenance
- Content: CAQS §1.6 six-dimension verification complete
- Runtime: RUNTIME_CHANGE_CONTROL_POLICY.md §4.2 followed
- Baselines: CURRENT_BASELINES.md recaptured post-change

## Verification Evidence
- Preflight: 0 divergences
- Pipeline: GREEN
- Guard: 101/101 PASS
- Smoke: 62/62 PASS
- Thorough: <N>/<N> PASS
- Pool Parity: PASS
```

---

## 7. Known-Issue Declaration

**Mandatory:** Every release must declare known issues that do not block release but require tracking.

| Category | Declaration Required |
|----------|---------------------|
| Psychometric debt (DL-003, DL-005, DL-013, DL-031) | Yes — list residual counts per CURRENT_BASELINES.md §3 |
| Accessibility gaps (U-01) | Yes — screen-reader/device testing status |
| May/LLM feature flags | Yes — explicitly state all Phase 2+ flags OFF |
| Legacy loader exposure (A-03) | Yes — LEGACY_LOADER_PROTECTION_PLAN.md status |
| Validator warning noise (Q-01/Q-02) | Yes — VALIDATOR_WARNING_GOVERNANCE_PLAN.md baseline |

---

## 8. Rollback Criteria

**Automatic rollback triggers (post-release):**
- Learner-reported wrong answer key in Certified pool
- Crash on session restore (DL-022 regression)
- Exam integrity mode bypass (W1-A/B regression)
- Delivery pool serves non-Certified content (Tier -1 leak)
- Governance guard regression (Rule 2/6/9/16 failure)

**Rollback procedure:** See `RELEASE_AND_ROLLBACK_RUNBOOK.md`

---

## 9. Post-Release Verification

| Check | Timing | Method |
|-------|--------|--------|
| Smoke test on tagged release | T+0 | `git checkout vX.Y.Z && npm run smoke` |
| Baseline coherence on tag | T+0 | `npm run baseline_coherence` |
| Certified pool count | T+0 | `npm run preflight` → verify 3052 P1 + 3436 P2 |
| Learner feedback monitor | T+24h | Manual review of issue tracker / logs |
| Telemetry health check | T+24h | MayTelemetry dashboard (if enabled) |

---

## 10. Incident Ownership

| Incident Type | Owner | Escalation |
|---------------|-------|------------|
| Wrong answer delivered | Accountant + Release Manager | Immediate hotfix + emergency CAQS verification |
| Runtime crash | JavaScript Architect + Validator | Hotfix + regression suite |
| Integrity bypass | JavaScript Architect + Release Manager | Emergency fix + W1-A/B smoke verification |
| Content pool contamination | Accountant + Validator | Quarantine + re-verification |
| Governance guard failure | Governance Validator | Rule-specific remediation |

---

## 11. Operational Logging / Health Checks

| Metric | Frequency | Tool |
|--------|-----------|------|
| `npm run preflight` | Daily (dev) / Pre-release | Local |
| `npm run smoke` | Pre-release / Post-change | Local |
| `npm run probe:parity` | Pre-release / Post-delivery-change | Local |
| Certified pool count | Weekly | `npm run preflight` |
| Validator warning delta | Per change | `npm run validate` → compare to baseline |

---

## 12. Release Blockers (Current as of 2026-09-23)

| Blocker | Finding | Status | Resolution Path |
|---------|---------|--------|-----------------|
| **G-01** | app.js baseline hash fabricated in CURRENT_BASELINES.md | **OPEN** | Commit working dir changes (Option A per APP_JS_DRIFT_RECONCILIATION.md) + recapture baseline |
| **A-02** | Drift touches integrity/timer surface | **OPEN** | Same as G-01 — changes are authorized but baseline must match |
| **S-02** | Corrupted localStorage restore protections re-proven | **VERIFIED** — Smoke test PASS | No action needed; evidence captured |
| **G-02** | Runtime change control policy | **RESOLVED** — Policy created | Policy documented; automation active |
| **G-03** | Release procedure | **RESOLVED** — This checklist | Checklist complete; dry-run pending |
| **O-01** | Deploy/release/monitor/rollback path | **PARTIAL** — Runbook created | Rollback drill required (human) |
| **D-01** | P2 certification sample audit | **OPEN** — Plan created | P2_SAMPLE_AUDIT_PLAN.md ready; human reviewer needed |
| **Q-01/Q-02** | Validator warning governance | **OPEN** — Plan created | VALIDATOR_WARNING_GOVERNANCE_PLAN.md drafted |
| **A-01** | Canonical toolchain inventory | **OPEN** — In progress | CANONICAL_TOOLCHAIN_INVENTORY.md in progress |
| **A-03** | Legacy loader protection | **OPEN** — Plan created | LEGACY_LOADER_PROTECTION_PLAN.md drafted |

**Release cannot proceed until G-01/A-02 are resolved and human rollback drill completed.**

---

## 13. Dry-Run Procedure (New Maintainer)

```powershell
# 1. Clone at candidate tag
git clone <repo> && cd <repo> && git checkout vX.Y.Z

# 2. Verify environment
node --version  # >= 18
npm ci

# 3. Run all gates
npm run preflight          # Must show 0 divergences
npm run smoke              # Must show 62 PASS
node scripts/thorough_test.js  # Must show all PASS
npm run pipeline           # Must exit 0 GREEN
npm run probe:parity       # Must exit 0
npm run preflight:p2       # Must show 0 divergences

# 4. Verify baselines
node scripts/baseline_coherence.js  # 0 divergences

# 5. Launch Electron (if built) or open index_updated.html
#    Verify: MCQ banks load, Cases load, May panel loads, Timer works, Pause/Resume works

# 6. If all green → Release Manager signs off
```

---

**Checklist Status:** **NOT READY FOR RELEASE** — G-01/A-02 unresolved, O-01 rollback drill pending human action.

**Next Action:** Resolve app.js baseline drift (commit working dir + recapture), then execute dry-run + rollback drill.