# RELEASE_AND_ROLLBACK_RUNBOOK.md

**Version:** 1.0
**Date:** 2026-09-23
**Authority:** PROJECT_CONSTITUTION.md, RELEASE_READINESS_CHECKLIST.md
**Status:** Active — Operational procedure

---

## 1. Overview

This runbook defines the release and rollback procedures for the CMA Exam Simulator, a local-first Electron application distributed via file-based delivery (git repository + optional Electron build).

**Distribution Model:** Local-first — no hosted deployment, no CDN, no app store.
**Rollback Mechanism:** Git-based (tag/checkout) + local file restoration from backups.

---

## 2. Pre-Release Backup Process

### 2.1 Automated Backup (Pre-Release Checklist)

Run before any release tag creation:

```powershell
# 1. Verify working directory clean
git status --short

# 2. Create full repository backup (excluding node_modules)
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$backupDir = "backups\pre-release-$timestamp"
New-Item -ItemType Directory -Path $backupDir | Out-Null
Copy-Item -Path "app\", "content\", "p2\", "knowledge\", "scripts\", "index_updated.html", "styles.css", "main.js", "package.json", "VERSION", "AGENTS.md" -Destination $backupDir -Recurse -Force

# 3. Verify backup integrity
$files = Get-ChildItem $backupDir -Recurse -File
Write-Host "Backed up $($files.Count) files to $backupDir"

# 4. Capture baseline hashes
node scripts/baseline_coherence.js > "$backupDir\baseline_coherence_$timestamp.log"
npm run preflight > "$backupDir\preflight_$timestamp.log" 2>&1
npm run smoke > "$backupDir\smoke_$timestamp.log" 2>&1
```

### 2.2 Artifact Retention Policy

| Artifact | Retention | Location |
|----------|-----------|----------|
| Git tags (releases) | Permanent | Git history |
| Pre-release backups | 90 days | `backups/pre-release-*` |
| Baseline coherence logs | 90 days | `backups/pre-release-*/baseline_coherence_*.log` |
| Test result logs | 90 days | `backups/pre-release-*/*.log` |
| `CURRENT_BASELINES.md` | Permanent (versioned) | `knowledge/CURRENT_BASELINES.md` |
| `REVISION_HISTORY.md` | Permanent (versioned) | `knowledge/REVISION_HISTORY.md` |

---

## 3. Release Procedure

### 3.1 Standard Release (All Gates Green)

```powershell
# PREREQUISITE: All gates green in current session
# npm run preflight → 0 divergences
# npm run smoke → 62 PASS
# npm run pipeline → GREEN
# npm run probe:parity → PASS
# node scripts/test_governance_guard.js → 101/101 PASS

# 1. Pre-release backup
.\scripts\pre_release_backup.ps1  # (create this script from §2.1)

# 2. Version bump
$version = "X.Y.Z"  # Determine next semantic version
echo $version > VERSION
npm version $version --no-git-tag-version  # Updates package.json

# 3. Commit version bump
git add VERSION package.json
git commit -m "chore(release): v$version — [one-line summary]"

# 4. Create annotated release tag
$tagMsg = @"
Release v$version — <Date>

Summary: <one paragraph>

Content: P1 <N> MCQ (<N> Certified), <N> Cases; P2 <N> MCQ (<N> Certified), <N> Cases

Runtime: <list changes>

Defects: DL-XXX, DL-YYY

Gates: Preflight 0, Smoke 62, Pipeline GREEN, Guard 101, Parity PASS
"@
git tag -a "v$version" -m $tagMsg

# 5. Verify tag
git show "v$version" --stat

# 6. Release Manager sign-off (manual)
#    - Review tag message
#    - Verify all gate logs in backup directory
#    - Sign REVISION_HISTORY.md entry

# 7. (Optional) Push to remote if configured
# git push origin main --tags
```

### 3.2 Emergency Release (Hotfix)

```powershell
# ONLY for learner-safety incidents (wrong answer, crash, integrity bypass)

# 1. Apply minimal fix on maintenance branch
git checkout -b hotfix/vX.Y.Z+1 main

# 2. Make fix, run targeted tests
#    - npm run smoke (must pass W1-A/B/D for integrity)
#    - npm run preflight (must pass 0 divergences)

# 3. Version bump (patch only)
npm version patch --no-git-tag-version

# 4. Commit + tag
git add -A
git commit -m "fix: <description> — EMERGENCY HOTFIX"
git tag -a "v$version" -m "EMERGENCY HOTFIX v$version — <description> — <gate evidence>"

# 5. Document in REVISION_HISTORY.md with EMERGENCY marker

# 6. Merge to main after Release Manager approval
git checkout main && git merge hotfix/vX.Y.Z+1
```

---

## 4. Rollback Procedure

### 4.1 Git-Based Rollback (Primary)

**Scenario:** Release tag exists, need to revert to prior version.

```powershell
# 1. Identify target rollback tag
git tag -l "v*" --sort=-v:refname | Select-Object -First 10
# Example: v1.2.3 (current) → v1.2.2 (rollback target)

# 2. Verify target tag is green (has passing gate evidence)
git show v1.2.2 --stat
# Check backup logs: backups/pre-release-<timestamp_for_v1.2.2>/

# 3. Create rollback tag (annotated)
git tag -a "v1.2.3-rollback-$(Get-Date -Format yyyyMMddHHmmss)" -m "Rollback from v1.2.3 to v1.2.2 — <reason>"

# 4. Reset working directory to target (HARD - destroys uncommitted work)
git reset --hard v1.2.2

# 5. Verify rollback
npm run preflight
npm run smoke
node scripts/baseline_coherence.js

# 6. Record in REVISION_HISTORY.md
#    "ROLLBACK: v1.2.3 → v1.2.2 on <date> — <reason> — gates verified post-rollback"
```

### 4.2 File-Level Rollback (Content Packs / Runtime Files)

**Scenario:** Specific file corruption or unauthorized change detected post-release.

```powershell
# 1. Identify affected file(s)
# Example: app/app.js hash mismatch detected

# 2. Locate clean backup
# Priority order:
#   a) Pre-release backup for target version: backups/pre-release-<timestamp>/
#   b) Governance-critical backups: backups/app.js.bak-<timestamp>
#   c) Git history: git show v1.2.2:app/app.js

# 3. Verify backup integrity
Get-FileHash -Algorithm SHA256 backups\pre-release-20260923120000\app\app.js
# Compare to CURRENT_BASELINES.md for target version

# 4. Restore file
Copy-Item -Path "backups\pre-release-20260923120000\app\app.js" -Destination "app\app.js" -Force

# 5. Verify restoration
npm run preflight
npm run smoke
node scripts/baseline_coherence.js

# 6. If baseline hash updated, update CURRENT_BASELINES.md to match restored version
```

### 4.3 Content Pack Rollback (Certification State)

**Scenario:** Certified items incorrectly flipped, or non-Certified items leaked to pool.

```powershell
# 1. Identify affected QIDs
# Use probe:parity output or preflight certified counts

# 2. Restore pack file from backup
# Priority: pre-release backup → governance backup → git tag

# 3. Verify question_state values
node -e "
const fs = require('fs');
const content = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const evaled = eval('(' + content.replace(/^const MCQ_BANK_A\s*=/, '').trim() + ')');
const certified = evaled.filter(q => q.question_state === 'Certified').length;
const total = evaled.length;
console.log('Pack A: ' + certified + '/' + total + ' Certified');
"

# 4. Run full validation
npm run pipeline

# 5. Update REVISION_HISTORY.md with rollback details
```

---

## 5. Restore Instructions (Disaster Recovery)

### 5.1 Full Repository Restore

```powershell
# 1. Clone fresh
git clone <repository-url> cma-restore
cd cma-restore

# 2. Checkout target release tag
git checkout v1.2.2  # or latest known-good tag

# 3. Install dependencies
npm ci

# 4. Verify integrity
npm run preflight
npm run smoke
npm run pipeline

# 5. If using Electron build, rebuild
# npm run build  (if script exists)
```

### 5.2 Baseline Document Restore

```powershell
# If CURRENT_BASELINES.md corrupted
# 1. Restore from git
git show v1.2.2:knowledge/CURRENT_BASELINES.md > knowledge/CURRENT_BASELINES.md

# 2. Restore REVISION_HISTORY.md
git show v1.2.2:knowledge/REVISION_HISTORY.md > knowledge/REVISION_HISTORY.md

# 3. Re-run baseline coherence to verify
node scripts/baseline_coherence.js
```

---

## 6. Validation After Rollback

**Mandatory post-rollback verification:**

| Check | Command | Expected |
|-------|---------|----------|
| Preflight | `npm run preflight` | 0 divergences |
| Smoke Test | `npm run smoke` | 62 PASS |
| Baseline Coherence | `node scripts/baseline_coherence.js` | 0 divergences |
| Governance Guard | `node scripts/test_governance_guard.js` | 101/101 PASS |
| Pipeline | `npm run pipeline` | Exit 0 GREEN |
| Pool Parity | `npm run probe:parity` | Exit 0 |
| Certified Pool Count | `npm run preflight` | Matches target version baseline |

**All must pass before declaring rollback complete.**

---

## 7. Drill Procedure & Evidence Template

### 7.1 Rollback Drill (Quarterly / Pre-Release)

**Objective:** Prove rollback can be executed by a new maintainer in <30 minutes.

```powershell
# DRILL START - $(Get-Date)
# 1. Simulate bad release: create temp tag v99.0.0-BAD with known defect
# 2. Execute §4.1 rollback to prior tag
# 3. Execute §6 validation
# 4. Record timing and issues

# DRILL END - $(Get-Date)
```

### 7.2 Evidence Template

```markdown
# Rollback Drill Evidence — <Date>

**Operator:** <Name/Role>
**Target Version:** vX.Y.Z → vX.Y.(Z-1)
**Start Time:** <timestamp>
**End Time:** <timestamp>
**Duration:** <minutes>

## Steps Executed
- [ ] Git tag identification
- [ ] Backup location verified
- [ ] Git reset / file restore
- [ ] Post-rollback validation (all 7 checks)

## Gate Results Post-Rollback
| Gate | Result | Evidence |
|------|--------|----------|
| Preflight | PASS/FAIL | <log snippet> |
| Smoke | PASS/FAIL | <log snippet> |
| Baseline Coherence | PASS/FAIL | <log snippet> |
| Guard Tests | PASS/FAIL | <log snippet> |
| Pipeline | PASS/FAIL | <log snippet> |
| Pool Parity | PASS/FAIL | <log snippet> |
| Certified Count | PASS/FAIL | <log snippet> |

## Issues Encountered
<None / Description>

## Sign-Off
**Operator:** <signature>
**Release Manager Review:** <signature> <date>
```

---

## 8. Decision Points & Human Authority

| Decision | Required Authority | Cannot Be Automated |
|----------|-------------------|---------------------|
| Create release tag | Release Manager | Yes — requires human judgment on scope |
| Declare emergency hotfix | Release Manager + Accountant | Yes — safety impact assessment |
| Initiate rollback | Release Manager | Yes — business impact assessment |
| Accept rollback validation | Validator + Release Manager | Yes — evidence review |
| Approve release notes | Release Manager | Yes — communication artifact |

**No automated system may create tags, declare emergencies, or approve rollbacks.**

---

## 9. Contact / Escalation

| Role | Contact | Escalation Trigger |
|------|---------|-------------------|
| Release Manager | <configured in repo> | Release gate, rollback authorization |
| JavaScript Architect | <configured in repo> | Runtime defect, integrity bypass |
| Accountant | <configured in repo> | Content defect, wrong answer key |
| Validator | <configured in repo> | Test failure, gate regression |

---

## 10. Current Drill Status (2026-09-23)

| Drill | Last Executed | Status | Next Due |
|-------|---------------|--------|----------|
| Full git-based rollback | Never | **PENDING** | Pre-release |
| File-level restore (app.js) | 2026-09-18 (W1-finish rebuild) | Verified via rebuild_baselines | Pre-release |
| Content pack rollback | 2026-07-28 (S896 DL-008 remediation) | Verified | Pre-release |
| Baseline document restore | Never | **PENDING** | Pre-release |

**Release remains blocked until at least one full rollback drill is executed and evidenced.**

---

**End of Runbook**

**Owner:** Release Manager
**Review Cycle:** Quarterly or pre-release, whichever comes first