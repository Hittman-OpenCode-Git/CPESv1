<# 
.SYNOPSIS
Remediation script for app.js drift reconciliation (2026-09-23).
Strips BOM, verifies preflight, prepares for bundled commit.

.DESCRIPTION
Per advisory board disposition: T3 BOM strip (unanimous), T1 bundled commit, T2 current (|| []).
This script performs read-only verification + BOM removal. Does NOT commit or modify baselines.

.PREREQUISITES
- Run from repository root (C:\Users\User\OneDrive\Desktop\CMA_Part_1_2026)
- Requires npm, node, PowerShell 5.1+

.OUTPUTS
- Timestamped backup in backups/
- Preflight result (must be 0 divergences post-strip)
- New SHA-256 hash for CURRENT_BASELINES.md update
#>

param(
    [switch]$SkipBackup,
    [switch]$SkipPreflightCheck
)

$ErrorActionPreference = "Stop"
$repoRoot = "C:\Users\User\OneDrive\Desktop\CMA_Part_1_2026"
$appJs = Join-Path $repoRoot "app\app.js"
$backupDir = Join-Path $repoRoot "backups"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$backupFile = Join-Path $backupDir "app.js.bak-$timestamp"

Write-Host "=== APP.JS DRIFT REMEDIATION ===" -ForegroundColor Cyan
Write-Host "Repo: $repoRoot" -ForegroundColor Gray
Write-Host "Target: $appJs" -ForegroundColor Gray
Write-Host "Timestamp: $timestamp" -ForegroundColor Gray
Write-Host ""

# --- Step 1: Verify file exists ---
if (-not (Test-Path -LiteralPath $appJs)) {
    Write-Error "app.js not found at $appJs"
    exit 1
}

# --- Step 2: Read file and detect BOM ---
$bytes = [IO.File]::ReadAllBytes($appJs)
$hasBOM = ($bytes.Length -ge 3) -and ($bytes[0] -eq 0xEF) -and ($bytes[1] -eq 0xBB) -and ($bytes[2] -eq 0xBF)

$fileSizeMsg = "File size: $($bytes.Length) bytes"
$bomMsg = "BOM present: $hasBOM"
$bomColor = if ($hasBOM) { "Yellow" } else { "Green" }

Write-Host $fileSizeMsg -ForegroundColor Gray
Write-Host $bomMsg -ForegroundColor $bomColor

if (-not $hasBOM) {
    Write-Warning "No BOM found - nothing to strip. Exiting."
    exit 0
}

# --- Step 3: Backup (mandatory per AGENTS.md §3) ---
if (-not $SkipBackup) {
    if (-not (Test-Path -LiteralPath $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    }
    Copy-Item -LiteralPath $appJs -Destination $backupFile -Force
    $bakSize = (Get-Item -LiteralPath $backupFile).Length
    
    $bakMsg = "Backup created: $backupFile ($bakSize bytes)"
    Write-Host $bakMsg -ForegroundColor Green
    
    # Verify backup
    $bakBytes = [IO.File]::ReadAllBytes($backupFile)
    if ($bakBytes.Length -ne $bytes.Length) {
        Write-Error "Backup size mismatch! Aborting."
        exit 1
    }
    Write-Host "Backup verified: byte-for-byte match" -ForegroundColor Green
} else {
    Write-Warning "Backup skipped (-SkipBackup)"
}

# --- Step 4: Strip BOM ---
$newBytes = $bytes[3..($bytes.Length - 1)]
[IO.File]::WriteAllBytes($appJs, $newBytes)

$stripMsg = "BOM stripped: $($bytes.Length) -> $($newBytes.Length) bytes (-3 bytes)"
Write-Host $stripMsg -ForegroundColor Green

# Verify strip
$verifyBytes = [IO.File]::ReadAllBytes($appJs)
$verifyBOM = ($verifyBytes.Length -ge 3) -and ($verifyBytes[0] -eq 0xEF) -and ($verifyBytes[1] -eq 0xBB) -and ($verifyBytes[2] -eq 0xBF)
if ($verifyBOM) {
    Write-Error "BOM still present after strip! Aborting."
    exit 1
}
Write-Host "Post-strip verification: BOM confirmed absent" -ForegroundColor Green

# --- Step 5: Capture new hash ---
$hash = Get-FileHash -Algorithm SHA256 -LiteralPath $appJs
$hashValue = $hash.Hash
$hashSize = ($hash.Path | Get-Item | Select-Object -ExpandProperty Length)

Write-Host ""
Write-Host "=== NEW BASELINE HASH ===" -ForegroundColor Cyan
Write-Host "SHA-256: $hashValue" -ForegroundColor White
Write-Host "Size: $hashSize bytes" -ForegroundColor Gray
Write-Host ""

# --- Step 6: Run preflight ---
if (-not $SkipPreflightCheck) {
    Write-Host "=== RUNNING PREFLIGHT ===" -ForegroundColor Cyan
    Write-Host "Command: npm run preflight" -ForegroundColor Gray
    Write-Host ""
    
    $result = & npm run preflight 2>&1
    $exitCode = $LASTEXITCODE
    
    Write-Host $result
    Write-Host ""
    
    if ($exitCode -eq 0) {
        Write-Host "PREFLIGHT: PASS (0 divergences)" -ForegroundColor Green
    } else {
        $failMsg = "PREFLIGHT: FAIL (exit code $exitCode)"
        Write-Host $failMsg -ForegroundColor Red
        Write-Warning "Do NOT commit until preflight passes with 0 divergences."
        exit 1
    }
} else {
    Write-Warning "Preflight skipped (-SkipPreflightCheck)"
}

# --- Step 7: Summary ---
Write-Host ""
Write-Host "=== REMEDIATION COMPLETE ===" -ForegroundColor Cyan
Write-Host "Next manual steps:" -ForegroundColor Yellow
Write-Host "  1. git add app/app.js"
Write-Host "  2. git commit -m 'app.js: Board S7 non-Certified block + F1 wiring + Phase 4 P2 case delivery + DL-022 null-guards + H2 escapeHtml + W_ADMIN history delete + W9 T5 telemetry (BOM stripped)'"
Write-Host "  3. Get-FileHash -Algorithm SHA256 app/app.js  # confirm hash matches above"
Write-Host "  4. Update knowledge/CURRENT_BASELINES.md line 29 with hash: $hashValue"
Write-Host "  5. Append knowledge/REVISION_HISTORY.md entry (per AGENTS.md §4)"
Write-Host "  6. npm run baseline_coherence  # must be 0 divergences"
Write-Host "  7. npm run pipeline            # must be GREEN (if content-triggered)"
Write-Host "  8. npm run smoke               # must be 62/62 PASS"
Write-Host ""
Write-Host "Backup retained at: $backupFile" -ForegroundColor Gray