<#
.SYNOPSIS
    Creates a timestamped backup of a pack file and verifies it exists.
.DESCRIPTION
    Use before ANY edit to a pack file (pack_p2_*.js, case_pack_p2_*.js).
    Creates a .bak-<timestamp> file alongside the source, then verifies
    with Test-Path. Halts (exit 1) if backup verification fails.
    
    This script exists because two prior remediation sessions (Pack B DL-026
    and Case Pack 2) experienced silent backup failures when hand-rolled
    Copy-Item commands had their output swallowed by CLIXML formatting.
    
    Usage:
        powershell -File scripts/backup_verify.ps1 -SourcePath "p2/case_pack_p2_2.js"
    
    The timestamp format uses lowercase yyyyMMddHHmmss (NOT uppercase SS,
    which PowerShell passes through literally, producing broken filenames).
#>
param(
    [Parameter(Mandatory=$true)]
    [string]$SourcePath
)

# Resolve to absolute path
$SourcePath = Resolve-Path $SourcePath -ErrorAction Stop
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$backupPath = "${SourcePath}.bak-${timestamp}"

Write-Host "Backing up: $SourcePath"
Write-Host "        -> $backupPath"

try {
    Copy-Item -Path $SourcePath -Destination $backupPath -ErrorAction Stop
} catch {
    Write-Host "ERROR: Copy-Item failed: $_" -ForegroundColor Red
    exit 1
}

# Mandatory verification — do NOT proceed without this
if (Test-Path $backupPath) {
    $bakSize = (Get-Item $backupPath).Length
    $srcSize = (Get-Item $SourcePath).Length
    if ($bakSize -eq $srcSize) {
        Write-Host "VERIFIED: Backup exists ($bakSize bytes, matches source)" -ForegroundColor Green
        Write-Host "BackupPath=$backupPath"
        exit 0
    } else {
        Write-Host "ERROR: Backup size mismatch (source=$srcSize, backup=$bakSize)" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ERROR: Backup file not found after Copy-Item. DO NOT PROCEED WITH EDITS." -ForegroundColor Red
    exit 1
}
