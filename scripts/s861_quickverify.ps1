# S861: Quick verification
$qids = @("P1-CC-060","P1-CC-061","P1-CC-064","P1-CC-071","P1-DC-005","P1-DC-010","P1-DC-012","P1-DC-013","P1-DC-015","P1-DC-025","P1-DC-030","P1-DC-035","P1-DC-040","P1-DC-045")
$file = "pack_c_corrected.js"
$content = Get-Content $file -Raw
foreach ($q in $qids) {
    $qidx = $content.IndexOf("`"QuestionID`": `"$q`"")
    if ($qidx -lt 0) { Write-Output "$q NOT FOUND"; continue }
    $objStart = $content.LastIndexOf('{', $qidx)
    # Simple: find CorrectChoice in the block after QuestionID
    $block = $content.Substring($qidx, [Math]::Min(3000, $content.Length - $qidx))
    $ccMatch = [regex]::Match($block, '"CorrectChoice"\s*:\s*"([ABCD])"')
    if (-not $ccMatch.Success) { Write-Output "$q NO CC"; continue }
    $cc = $ccMatch.Groups[1].Value
    # Check ExplanationWrong[CC]
    $ewPattern = '"ExplanationWrong' + $cc + '"'
    $ewIdx = $block.IndexOf($ewPattern)
    if ($ewIdx -lt 0) { Write-Output "$q CC=$cc EW[$cc] ABSENT"; continue }
    $ewAfter = $block.Substring($ewIdx + $ewPattern.Length)
    $ewValMatch = [regex]::Match($ewAfter, '"\s*:\s*"([^"]*)"')
    $ewVal = if ($ewValMatch.Success) { $ewValMatch.Groups[1].Value } else { "PARSE_FAIL" }
    $dl008 = if ($ewVal.Length -gt 0) { "DL-008!" } else { "OK" }
    Write-Output "$q CC=$cc EW[$cc]='$ewVal' $dl008"
}
