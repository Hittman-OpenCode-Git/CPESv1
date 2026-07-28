<#
.SYNOPSIS
  Final CMA Part 1 Simulator cleanup + wind-down documentation script.

.DESCRIPTION
  - Dry-run by default.
  - Moves loose, non-operational project artifacts into organized folders.
  - Does NOT move core app/source/data/test files.
  - Creates final documentation/governance handoff files.
  - Appends a cleanup entry to knowledge/REVISION_HISTORY.md.
  - Produces a JSON cleanup manifest.

.USAGE
  Dry run:
    powershell -ExecutionPolicy Bypass -File .\tools\maintenance\final_project_cleanup.ps1

  Apply:
    powershell -ExecutionPolicy Bypass -File .\tools\maintenance\final_project_cleanup.ps1 -Apply

  Apply and run tests:
    powershell -ExecutionPolicy Bypass -File .\tools\maintenance\final_project_cleanup.ps1 -Apply -TestCommand "npm test"
#>

param(
  [switch]$Apply,
  [string]$ProjectRoot = (Get-Location).Path,
  [string]$TestCommand = ""
)

$ErrorActionPreference = "Stop"

function Write-Step($msg) {
  Write-Host "`n=== $msg ===" -ForegroundColor Cyan
}

function Ensure-Dir($path) {
  if (-not (Test-Path $path)) {
    if ($Apply) {
      New-Item -ItemType Directory -Path $path | Out-Null
    }
    Write-Host "[DIR] $path"
  }
}

function Move-IfNeeded($src, $destDir) {
  if (-not (Test-Path $src)) { return $null }

  Ensure-Dir $destDir

  $fileName = Split-Path $src -Leaf
  $dest = Join-Path $destDir $fileName

  if (Test-Path $dest) {
    $stamp = Get-Date -Format "yyyyMMddHHmmss"
    $base = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
    $ext = [System.IO.Path]::GetExtension($fileName)
    $dest = Join-Path $destDir "$base-$stamp$ext"
  }

  if ($Apply) {
    Move-Item -Path $src -Destination $dest
    Write-Host "[MOVE] $src -> $dest" -ForegroundColor Green
  } else {
    Write-Host "[DRY]  $src -> $dest" -ForegroundColor Yellow
  }

  return @{
    source = $src
    destination = $dest
    applied = [bool]$Apply
  }
}

function Safe-Hash($path) {
  if (Test-Path $path) {
    return (Get-FileHash $path -Algorithm MD5).Hash
  }
  return $null
}

function Run-TestCommand($cmd) {
  if ([string]::IsNullOrWhiteSpace($cmd)) {
    Write-Host "[SKIP] No TestCommand supplied."
    return @{
      command = $cmd
      skipped = $true
      exitCode = $null
    }
  }

  Write-Step "Running test command: $cmd"
  if ($Apply) {
    cmd.exe /c $cmd
    $code = $LASTEXITCODE
    if ($code -ne 0) {
      throw "Test command failed with exit code $code"
    }
    return @{
      command = $cmd
      skipped = $false
      exitCode = $code
    }
  } else {
    Write-Host "[DRY] Would run: $cmd"
    return @{
      command = $cmd
      skipped = $true
      exitCode = $null
    }
  }
}

Set-Location $ProjectRoot

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$stampFile = Get-Date -Format "yyyyMMddHHmmss"

Write-Step "CMA project final cleanup"
Write-Host "ProjectRoot: $ProjectRoot"
Write-Host "Mode: $(if ($Apply) { 'APPLY' } else { 'DRY RUN' })"

# -----------------------------------------------------------------------------
# Protected operational files and folders
# -----------------------------------------------------------------------------

$protectedFiles = @(
  "app.js",
  "index.html",
  "index_updated.html",
  "styles.css",
  "package.json",
  "package-lock.json",
  "may-core.js",
  "may-learner-state.js",
  "pack_a_corrected.js",
  "pack_b_corrected.js",
  "pack_c_corrected.js",
  "pack_d_corrected.js",
  "pack_e_corrected.js",
  "scored_cases.js",
  "scored_cases2.js",
  "scored_cases3.js",
  "scored_cases4.js",
  "scored_cases5.js"
)

$protectedDirs = @(
  ".git",
  "node_modules",
  "scripts",
  "tools",
  "reports",
  "knowledge",
  "docs",
  "backups",
  "assets",
  "images",
  "css",
  "js",
  "data"
)

$preHashes = @{}
foreach ($file in $protectedFiles) {
  $full = Join-Path $ProjectRoot $file
  $preHashes[$file] = Safe-Hash $full
}

# -----------------------------------------------------------------------------
# Create archive / documentation structure
# -----------------------------------------------------------------------------

Write-Step "Ensuring cleanup folders"

$dirs = @{
  docs                = Join-Path $ProjectRoot "docs"
  governanceDocs      = Join-Path $ProjectRoot "docs\governance"
  opsDocs             = Join-Path $ProjectRoot "docs\operations"
  looseReports        = Join-Path $ProjectRoot "reports\loose_root_artifacts"
  archivedLogs        = Join-Path $ProjectRoot "reports\logs"
  archivedTemp        = Join-Path $ProjectRoot "reports\temp"
  archivedBackups     = Join-Path $ProjectRoot "backups\manual_and_session_backups"
  cleanupReports      = Join-Path $ProjectRoot "reports\systematic_testing"
  sessionStatus       = Join-Path $ProjectRoot "reports\session_status"
}

$dirs.Values | ForEach-Object { Ensure-Dir $_ }

# -----------------------------------------------------------------------------
# Move loose non-operational files from repository root
# -----------------------------------------------------------------------------

Write-Step "Scanning root for loose non-operational artifacts"

$moves = @()

# Only scan root level, not recursively.
$rootFiles = Get-ChildItem -Path $ProjectRoot -File

foreach ($f in $rootFiles) {
  $name = $f.Name
  $ext = $f.Extension.ToLowerInvariant()
  $full = $f.FullName

  if ($protectedFiles -contains $name) {
    continue
  }

  # Keep common config files in root.
  if ($name -in @(
    ".gitignore",
    ".gitattributes",
    "README.md",
    "LICENSE",
    "tsconfig.json",
    "vite.config.js",
    "webpack.config.js",
    "jest.config.js"
  )) {
    continue
  }

  # Backup / temporary / loose report patterns.
  if ($name -match "\.bak($|[-_.])" -or $name -match "backup" -or $ext -in @(".bak", ".old")) {
    $moves += Move-IfNeeded $full $dirs.archivedBackups
    continue
  }

  if ($ext -in @(".log", ".out", ".err", ".trace")) {
    $moves += Move-IfNeeded $full $dirs.archivedLogs
    continue
  }

  if ($ext -in @(".tmp", ".temp", ".scratch")) {
    $moves += Move-IfNeeded $full $dirs.archivedTemp
    continue
  }

  if ($ext -in @(".json", ".csv") -and $name -match "SESSION|REPORT|AUDIT|MANIFEST|RESULT|EXPORT") {
    $moves += Move-IfNeeded $full $dirs.looseReports
    continue
  }

  if ($ext -eq ".md" -and $name -match "SESSION|REPORT|HANDOFF|STATUS|AUDIT|MANIFEST|GOVERNANCE") {
    $moves += Move-IfNeeded $full $dirs.looseReports
    continue
  }

  if ($ext -in @(".png", ".jpg", ".jpeg", ".webp", ".gif") -and $name -match "screenshot|capture|debug|report") {
    $moves += Move-IfNeeded $full $dirs.looseReports
    continue
  }
}

# Remove null move entries.
$moves = @($moves | Where-Object { $_ -ne $null })

# -----------------------------------------------------------------------------
# Documentation / governance handoff
# -----------------------------------------------------------------------------

Write-Step "Writing final documentation and governance handoff"

$projectStatusPath = Join-Path $dirs.opsDocs "PROJECT_PAUSE_STATUS.md"
$governanceHandoffPath = Join-Path $dirs.governanceDocs "GOVERNANCE_HANDOFF.md"
$restartPath = Join-Path $dirs.opsDocs "RESTART_POINTS.md"
$cleanupManifestPath = Join-Path $dirs.cleanupReports "FINAL_PROJECT_CLEANUP_MANIFEST_$stampFile.json"
$cleanupReportPath = Join-Path $dirs.sessionStatus "FINAL_PROJECT_CLEANUP_AND_GOVERNANCE_HANDOFF_$stampFile.md"

$projectStatus = @"
# CMA Part 1 Simulator — Project Pause Status

Generated: $timestamp

## Current operating posture

Operations are paused unless explicitly resumed.

## Lane status

### 100-series / May lane

- Status: paused after pre-production readiness and wind-down work.
- May remains local/pre-production only.
- No broad rollout is authorized.
- No external telemetry endpoint is authorized.
- Real single-user use requires explicit approval.

### 500-series / Case-bank lane

- Status: paused.
- Recently completed work includes certification and quality uplift for migrated case banks.
- Recommended restart options:
  - CBQ2-A3 explanation uplift.
  - MIGRATED_CASE_BASE_D first CAQS review.
  - Optional case realism / difficulty / metadata enhancements.

### 700-series / MCQ lane

- Status: paused after certified DL-026 pedagogical uplift and freeze confirmation.
- Certification-blocking defects should remain at zero unless future scans show otherwise.
- Optional restart options:
  - DL-010 cleanup for documented legacy issues.
  - DL-031 / DL-032 difficulty recalibration.

## Resume rule

Resume one lane at a time. Do not run 100-, 500-, and 700-series write sessions against overlapping files without explicit concurrent-lane guards.
"@

$governanceHandoff = @"
# CMA Simulator Governance Handoff

Generated: $timestamp

## Non-negotiable operating rules

1. Run full automated tests before and after every session.
2. Use sessions as no-change attestation even for analysis-only work.
3. Preserve strict lane isolation:
   - 100-series: May / tutoring / telemetry.
   - 500-series: case-bank remediation and certification.
   - 700-series: MCQ remediation and certification governance.
4. Every prompt must include:
   - authorized files,
   - forbidden files,
   - stop conditions,
   - governance attestation,
   - final response format.
5. If target lists conflict, stop and reconcile before remediation.
6. If a governance definition cannot be found, return a coded blocker rather than guessing.
7. If delegated agents fail silently, primary execution should fall back to direct analysis.
8. Do not alter answer keys, prompts, choices, explanations, or states unless the session explicitly authorizes that exact field.
9. For May:
   - no broad rollout,
   - no external telemetry,
   - no pass/fail prediction,
   - exam details must be volunteered by the learner,
   - local/pre-production posture remains default unless explicitly changed.
10. For learner-facing privacy:
   - use only the amount of privacy required by the actual use case,
   - remove or scale back scaffolding that no longer matches the threat model.

## Recommended restart sequence

Primary:
1. May single-user pilot only if explicitly approved.
2. CBQ2-A3 explanation uplift if resuming case-bank quality work.
3. Optional MCQ difficulty recalibration only after confirming 700-series remains frozen clean.

Alternate:
- Resume MIGRATED_CASE_BASE_D first CAQS review.

Deferred:
- Broad May rollout.
- Production data persistence.
- Non-certified DL-026 preparation.
"@

$restartPoints = @"
# Restart Points

Generated: $timestamp

## Primary restart options

### Option A — May single-user pilot readiness

Use when the upcoming test-taker is ready to use May locally.

Start with a readiness review, not a broad launch.

### Option B — CBQ2-A3 explanation uplift

Use when resuming the smallest case-bank quality win.

Expected scope:
- 5 items.
- Explanation sufficiency.
- Citations.
- Distractor rationale.
- Difficulty metadata.
- Certification only after validation.

### Option C — MIGRATED_CASE_BASE_D first CAQS review

Use when resuming the next case-bank certification wave.

### Option D — 700-series optional cleanup

Use only if you want to resume MCQ governance:
- DL-010 cleanup for documented legacy issues.
- DL-031 / DL-032 difficulty recalibration.

## Resume guard

Before restarting any lane:
1. Run the full test suite.
2. Verify no unexpected diffs.
3. Confirm lane-specific authorized files.
4. Confirm other lanes are untouched.
5. Write a session prompt with explicit stop conditions.
"@

if ($Apply) {
  Set-Content -Path $projectStatusPath -Value $projectStatus -Encoding UTF8
  Set-Content -Path $governanceHandoffPath -Value $governanceHandoff -Encoding UTF8
  Set-Content -Path $restartPath -Value $restartPoints -Encoding UTF8
} else {
  Write-Host "[DRY] Would write $projectStatusPath"
  Write-Host "[DRY] Would write $governanceHandoffPath"
  Write-Host "[DRY] Would write $restartPath"
}

# -----------------------------------------------------------------------------
# Run optional tests
# -----------------------------------------------------------------------------

$preTest = Run-TestCommand $TestCommand

# -----------------------------------------------------------------------------
# Verify protected source hashes
# -----------------------------------------------------------------------------

Write-Step "Verifying protected operational files"

$postHashes = @{}
$hashDrift = @()

foreach ($file in $protectedFiles) {
  $full = Join-Path $ProjectRoot $file
  $postHashes[$file] = Safe-Hash $full

  if ($preHashes[$file] -ne $postHashes[$file]) {
    $hashDrift += @{
      file = $file
      before = $preHashes[$file]
      after = $postHashes[$file]
    }
  }
}

if ($hashDrift.Count -gt 0) {
  Write-Host "[WARN] Protected file hash drift detected:" -ForegroundColor Red
  $hashDrift | ConvertTo-Json -Depth 5 | Write-Host
  throw "Protected operational file drift detected. Review before proceeding."
}

Write-Host "[OK] Protected operational file hashes unchanged."

# -----------------------------------------------------------------------------
# Write cleanup manifest and session report
# -----------------------------------------------------------------------------

Write-Step "Writing cleanup manifest"

$manifest = @{
  generatedAt = $timestamp
  projectRoot = $ProjectRoot
  applied = [bool]$Apply
  movedFiles = $moves
  writtenDocs = @(
    $projectStatusPath
    $governanceHandoffPath
    $restartPath
  )
  protectedFilesChecked = $protectedFiles
  protectedHashDrift = $hashDrift
  testCommand = $preTest
  governanceAttestation = @{
    noPackFilesChanged = $true
    noCaseBankFilesChanged = $true
    noMaySourceChanged = $true
    noScoringRuntimeChanged = $true
    noCertificationStateChanged = $true
    docsUpdated = $true
    cleanupWasDryRun = -not [bool]$Apply
  }
}

$manifestJson = $manifest | ConvertTo-Json -Depth 10

$finalReport = @"
# Final Project Cleanup and Governance Handoff

Generated: $timestamp

## Mode

$(if ($Apply) { "APPLIED" } else { "DRY RUN ONLY" })

## Summary

- Loose non-operational root artifacts identified: $($moves.Count)
- Protected operational file hashes unchanged: YES
- Documentation handoff generated:
  - $projectStatusPath
  - $governanceHandoffPath
  - $restartPath

## Files moved

$(if ($moves.Count -eq 0) { "No loose files matched cleanup rules." } else { ($moves | ForEach-Object { "- $($_.source) -> $($_.destination)" }) -join "`n" })

## Governance Attestation

- No pack content changes.
- No case-bank changes.
- No May source changes.
- No scoring/runtime changes.
- No certification-state changes.
- No answer-key changes.
- No explanation/distractor changes.
- Protected operational file hashes verified.
- Cleanup was limited to loose non-operational artifacts and documentation.

## Restart Guidance

Pause operations unless explicitly resumed.

Recommended restart options:
1. May single-user pilot readiness, only with explicit approval.
2. CBQ2-A3 explanation uplift.
3. MIGRATED_CASE_BASE_D first CAQS review.
4. Optional 700-series cleanup / difficulty recalibration.

"@

if ($Apply) {
  Set-Content -Path $cleanupManifestPath -Value $manifestJson -Encoding UTF8
  Set-Content -Path $cleanupReportPath -Value $finalReport -Encoding UTF8
  Write-Host "[WRITE] $cleanupManifestPath"
  Write-Host "[WRITE] $cleanupReportPath"
} else {
  Write-Host "[DRY] Would write $cleanupManifestPath"
  Write-Host "[DRY] Would write $cleanupReportPath"
}

# -----------------------------------------------------------------------------
# Append revision history
# -----------------------------------------------------------------------------

Write-Step "Updating revision history"

$revisionPath = Join-Path $ProjectRoot "knowledge\REVISION_HISTORY.md"
$revisionEntry = @"

---

## Final Cleanup and Governance Handoff ($timestamp)

Type: Documentation and repository hygiene.

Summary:
- Moved loose non-operational root artifacts into organized report/backup/temp folders.
- Generated project pause status, governance handoff, and restart-point documentation.
- Verified protected operational file hashes remained unchanged.
- No pack, case-bank, May source, scoring/runtime, answer-key, explanation, or certification-state changes.

Generated:
- docs/operations/PROJECT_PAUSE_STATUS.md
- docs/governance/GOVERNANCE_HANDOFF.md
- docs/operations/RESTART_POINTS.md
- reports/systematic_testing/FINAL_PROJECT_CLEANUP_MANIFEST_$stampFile.json
- reports/session_status/FINAL_PROJECT_CLEANUP_AND_GOVERNANCE_HANDOFF_$stampFile.md

Recommended restart:
- Resume one lane only after explicit approval: May single-user pilot readiness, CBQ2-A3 explanation uplift, MIGRATED_CASE_BASE_D CAQS review, or optional 700-series cleanup.
"@

if ($Apply) {
  if (Test-Path $revisionPath) {
    Add-Content -Path $revisionPath -Value $revisionEntry -Encoding UTF8
    Write-Host "[APPEND] $revisionPath"
  } else {
    Write-Host "[WARN] REVISION_HISTORY.md not found at $revisionPath"
  }
} else {
  Write-Host "[DRY] Would append to $revisionPath"
}

Write-Step "Cleanup complete"
Write-Host "Mode: $(if ($Apply) { 'APPLIED' } else { 'DRY RUN' })"
Write-Host "Loose artifacts matched: $($moves.Count)"
Write-Host "Protected hash drift: $($hashDrift.Count)"
Write-Host "Done."
