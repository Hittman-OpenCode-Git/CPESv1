# S720 Agent H — Cross-Pack Consistency Audit
# Analyzes CognitiveLevel and Difficulty across 5 packs for same task types

$ErrorActionPreference = "Stop"
$workdir = "C:\Users\User\OneDrive\Desktop\CMA_Part_1_2026"

Write-Host "=== S720 Agent H: Loading VFINAL assignments ==="
$json = Get-Content "$workdir\reports\session_status\SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json" -Raw | ConvertFrom-Json
$a = $json.assignments

# --- Helper: safe increment ---
function safe_add($h, $k) {
    if ($h.ContainsKey($k)) { $h[$k] + 1 } else { 1 }
}

# --- CL / Difficulty distribution ---
$cl_dist = @{}
$diff_dist = @{}
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    $pack = $item.Pack
    if (-not $cl_dist.ContainsKey($pack)) { $cl_dist[$pack] = @{}; $diff_dist[$pack] = @{} }
    $cl = $item.CognitiveLevel
    $df = $item.Difficulty
    $cl_dist[$pack][$cl] = (safe_add $cl_dist[$pack] $cl)
    $diff_dist[$pack][$df] = (safe_add $diff_dist[$pack] $df)
}

Write-Host "=== CL Distribution by Pack ==="
foreach ($pk in ($cl_dist.Keys | Sort-Object)) {
    Write-Host "$pk`:"
    foreach ($lv in @("Remember","Understand","Apply","Analyze","Evaluate")) {
        $n = if ($cl_dist[$pk].ContainsKey($lv)) { $cl_dist[$pk][$lv] } else { 0 }
        Write-Host "  $lv = $n"
    }
}

Write-Host "`n=== Difficulty Distribution by Pack ==="
foreach ($pk in ($diff_dist.Keys | Sort-Object)) {
    Write-Host "$pk`:"
    foreach ($lv in @("Easy","Moderate-Easy","Moderate","Difficult","Very Difficult")) {
        $n = if ($diff_dist[$pk].ContainsKey($lv)) { $diff_dist[$pk][$lv] } else { 0 }
        Write-Host "  $lv = $n"
    }
}

# ============================================================
# PATTERN 1: Definition-match items
# Stem contains "[term] is:" / "Standard costs are:" / "[Concept] refers to:"
# ============================================================
Write-Host "`n=== PATTERN 1: Definition-Match Items ==="
$def_match = @()
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    $stem = $item.StemPreview
    if ($stem -match "(?:is:|are:|refers\s+to:|defined\s+as|means:|consists\s+of:|includes:|represents:)" -and 
        $stem -match "^(?!.*calculate|.*compute|.*determine\s+the\s+amount|.*enter\s+total|.*what\s+is\s+the)") {
        $def_match += $item
    }
}
Write-Host "Definition-match items found: $($def_match.Count)"

$per_pack_p1 = @{}
foreach ($item in $def_match) {
    $pk = $item.Pack
    if (-not $per_pack_p1.ContainsKey($pk)) { $per_pack_p1[$pk] = @() }
    if ($per_pack_p1[$pk].Count -lt 5) { $per_pack_p1[$pk] += $item }
}

$p1_issues = @()
foreach ($pk in ($per_pack_p1.Keys | Sort-Object)) {
    $items = $per_pack_p1[$pk]
    $cls = @{}
    $diffs = @{}
    foreach ($it in $items) {
        $cls[$it.CognitiveLevel] = safe_add $cls $it.CognitiveLevel
        $diffs[$it.Difficulty] = safe_add $diffs $it.Difficulty
    }
    $dom_cl = ($cls.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key
    $dom_diff = ($diffs.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key
    Write-Host "  $pk : dominant CL=$dom_cl, diff=$dom_diff"
}

# For deeper analysis: search pack files directly for exact definition-match stems
# using Select-String across all 5 packs
Write-Host "`n=== PATTERN 1 DEEP: Direct file grep for definition stems ==="
foreach ($pack_file in @("pack_a_corrected.js","pack_b_corrected.js","pack_c_corrected.js","pack_d_corrected.js","pack_e_corrected.js")) {
    $stem_matches = Select-String -Path "$workdir\$pack_file" -Pattern '"Stem":\s*"[^"]*\b(is|are|refers to|defined as)\b[^"]*"' -AllMatches
    Write-Host "  $pack_file definition stems: $($stem_matches.Matches.Count)"
}

# Sample 5 per pack for pattern 1 using the assignment data
$p1_samples = @{ pack_a = @(); pack_b = @(); pack_c = @(); pack_d = @(); pack_e = @() }
foreach ($item in $def_match) {
    $pk = $item.Pack
    if ($p1_samples[$pk].Count -lt 5) {
        $p1_samples[$pk] += @{ QID=$key; CL=$item.CognitiveLevel; DS=0; Diff=$item.Difficulty; Stem=$item.StemPreview; Topic=$item.Topic }
    }
}

# ============================================================
# PATTERN 2: Standard-application items (Which of the following is...)
# ============================================================
Write-Host "`n=== PATTERN 2: Standard-Application Items (Which of the following...) ==="
$std_apply = @()
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    $stem = $item.StemPreview
    if ($stem -match "^(Which of the following|Which response|Under (GAAP|IFRS|COSO|ASC|U\.S\. GAAP))" -and 
        $stem -notmatch "^(Which of the following is|are)\s+(true|correct|not|least|most accurate|best)\b") {
        $std_apply += @{ key=$key; item=$item }
    }
}
Write-Host "Standard-application items found: $($std_apply.Count)"

$per_pack_p2 = @{}
foreach ($entry in $std_apply) {
    $pk = $entry.item.Pack
    if (-not $per_pack_p2.ContainsKey($pk)) { $per_pack_p2[$pk] = @() }
    if ($per_pack_p2[$pk].Count -lt 5) { $per_pack_p2[$pk] += $entry }
}

foreach ($pk in ($per_pack_p2.Keys | Sort-Object)) {
    $entries = $per_pack_p2[$pk]
    $cls = @{}; $diffs = @{}
    foreach ($e in $entries) {
        $cls[$e.item.CognitiveLevel] = safe_add $cls $e.item.CognitiveLevel
        $diffs[$e.item.Difficulty] = safe_add $diffs $e.item.Difficulty
    }
    $dom_cl = ($cls.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key
    $dom_diff = ($diffs.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key
    Write-Host "  $pk : dominant CL=$dom_cl, diff=$dom_diff"
}

# ============================================================
# PATTERN 3: Calculation items (Calculate/Compute + numeric answer)
# ============================================================
Write-Host "`n=== PATTERN 3: Calculation Items ==="
$calc_items = @()
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    $stem = $item.StemPreview
    if ($stem -match "(calculate|compute|determine|enter|what is the|what amount|total|annual|cost|depreciation|depreciable|variance|budget|revenue|income|expense|equity|liability)\s" -and 
        $stem.Length -gt 40) {
        # Check if this item has numeric-type characteristics (Apply CL, calculation-oriented topic)
        if ($item.CognitiveLevel -eq "Apply" -or $item.CognitiveLevel -eq "Analyze") {
            $calc_items += @{ key=$key; item=$item }
        }
    }
}
Write-Host "Calculation items (Apply/Analyze) found: $($calc_items.Count)"

# ============================================================
# PATTERN 4: Section A cross-pack comparison (financial reporting)
# ============================================================
Write-Host "`n=== PATTERN 4: Section A Cross-Pack Comparison (same topics) ==="
$sectionA = @{}
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    if ($item.Section -eq "A") {
        $topic_root = ($item.Topic -replace '^(A|B-A|C-A|D-A|A-A)\.[\d]+\s+', '')
        if (-not $sectionA.ContainsKey($topic_root)) { $sectionA[$topic_root] = @{} }
        if (-not $sectionA[$topic_root].ContainsKey($item.Pack)) {
            $sectionA[$topic_root][$item.Pack] = @{ CL=$item.CognitiveLevel; Diff=$item.Difficulty; QID=$key }
        }
    }
}

# Find topics appearing in 3+ packs with inconsistent CL
$a_topic_issues = @()
foreach ($topic in $sectionA.Keys) {
    $packs = $sectionA[$topic]
    if ($packs.Count -ge 3) {
        $cls_seen = @{}
        foreach ($pk in $packs.Keys) {
            $v = $packs[$pk].CL; if (-not $cls_seen.ContainsKey($v)) { $cls_seen[$v] = @() }; $cls_seen[$v] += $pk
        }
        if ($cls_seen.Count -ge 2) {
            $a_topic_issues += @{ topic=$topic; assignment=$packs; cls=$cls_seen }
            Write-Host "  MISMATCH Topic: $topic"
            foreach ($pk in ($packs.Keys | Sort-Object)) {
                Write-Host "    $pk : $($packs[$pk].CL) / $($packs[$pk].Diff) ($($packs[$pk].QID))"
            }
        }
    }
}
Write-Host "Section A cross-pack mismatches: $($a_topic_issues.Count)"

# ============================================================
# PATTERN 5: Section C cross-pack comparison (performance management)
# ============================================================
Write-Host "`n=== PATTERN 5: Section C Cross-Pack Comparison ==="
$sectionC = @{}
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    if ($item.Section -eq "C") {
        $topic_root = ($item.Topic -replace '^(C|B-C|C-C|D-C|E-C)\.[\d]+\s+', '')
        if (-not $sectionC.ContainsKey($topic_root)) { $sectionC[$topic_root] = @{} }
        if (-not $sectionC[$topic_root].ContainsKey($item.Pack)) {
            $sectionC[$topic_root][$item.Pack] = @{ CL=$item.CognitiveLevel; Diff=$item.Difficulty; QID=$key }
        }
    }
}

$c_topic_issues = @()
foreach ($topic in $sectionC.Keys) {
    $packs = $sectionC[$topic]
    if ($packs.Count -ge 3) {
        $cls_seen = @{}
        foreach ($pk in $packs.Keys) {
            $v = $packs[$pk].CL; if (-not $cls_seen.ContainsKey($v)) { $cls_seen[$v] = @() }; $cls_seen[$v] += $pk
        }
        if ($cls_seen.Count -ge 2) {
            $c_topic_issues += @{ topic=$topic; assignment=$packs; cls=$cls_seen }
            Write-Host "  MISMATCH Topic: $topic"
            foreach ($pk in ($packs.Keys | Sort-Object)) {
                Write-Host "    $pk : $($packs[$pk].CL) / $($packs[$pk].Diff) ($($packs[$pk].QID))"
            }
        }
    }
}
Write-Host "Section C cross-pack mismatches: $($c_topic_issues.Count)"

# ============================================================
# TOP INCONSISTENCIES: Pack E vs others
# ============================================================
Write-Host "`n=== TOP INCONSISTENCIES: Pack E drift analysis ==="
$pack_e_drift = @()
$drift_examples = @()
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    if ($item.Pack -eq "pack_e") {
        # Find items in other packs with same topic root
        $topic_root = ($item.Topic -replace '^E-\w*\.*[\d]+\s+', '')
        # Look for same Section+CognitiveLevel mismatch
    }
}

# Direct CL comparison: for each topic that appears in 2+ packs, show Pack E vs dominant
Write-Host "Pack E CL distribution: Remember=$($cl_dist['pack_e']['Remember']), Understand=$($cl_dist['pack_e']['Understand']), Apply=$($cl_dist['pack_e']['Apply']), Analyze=$($cl_dist['pack_e']['Analyze']), Evaluate=$($cl_dist['pack_e']['Evaluate'])"
Write-Host "Other packs average CL distribution:"
$other_packs = @("pack_a","pack_b","pack_c","pack_d")
foreach ($cl in @("Remember","Understand","Apply","Analyze","Evaluate")) {
    $total = 0; $count = 0
    foreach ($pk in $other_packs) {
        if ($cl_dist[$pk].ContainsKey($cl)) { $total += $cl_dist[$pk][$cl] }
        $count++
    }
    $avg = [math]::Round($total / $count, 1)
    Write-Host "  $cl`: Pack E=$($cl_dist['pack_e'][$cl]), Other avg=$avg"
}

# ============================================================
# PACK E SECTION-BY-SECTION ANALYSIS
# ============================================================
Write-Host "`n=== PACK E Section-by-Section CL Distribution ==="
$pack_e_section = @{}
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    if ($item.Pack -eq "pack_e") {
        $sec = $item.Section
        if (-not $pack_e_section.ContainsKey($sec)) { $pack_e_section[$sec] = @{} }
        $pack_e_section[$sec][$item.CognitiveLevel] = safe_add $pack_e_section[$sec] $item.CognitiveLevel
    }
}
foreach ($sec in ($pack_e_section.Keys | Sort-Object)) {
    Write-Host "  Section $sec`:"
    foreach ($cl in @("Remember","Understand","Apply","Analyze","Evaluate")) {
        $n = if ($pack_e_section[$sec].ContainsKey($cl)) { $pack_e_section[$sec][$cl] } else { 0 }
        if ($n -gt 0) { Write-Host "    $cl = $n" }
    }
}

# ============================================================
# PACK A Section E (the odd duck: 62.7% Evaluate)
# ============================================================
Write-Host "`n=== PACK A Section E vs Others ==="
$pack_a_e = @{}
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    if ($item.Pack -eq "pack_a" -and $item.Section -eq "E") {
        $pack_a_e[$item.CognitiveLevel] = safe_add $pack_a_e $item.CognitiveLevel
    }
}
foreach ($cl in @("Remember","Understand","Apply","Analyze","Evaluate")) {
    $n = if ($pack_a_e.ContainsKey($cl)) { $pack_a_e[$cl] } else { 0 }
    Write-Host "  Pack A Section E $cl = $n"
}

# Other packs Section E
$other_section_e = @{}
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    if ($item.Pack -ne "pack_a" -and $item.Section -eq "E") {
        $pk = $item.Pack
        if (-not $other_section_e.ContainsKey($pk)) { $other_section_e[$pk] = @{} }
        $other_section_e[$pk][$item.CognitiveLevel] = safe_add $other_section_e[$pk] $item.CognitiveLevel
    }
}
foreach ($pk in ($other_section_e.Keys | Sort-Object)) {
    Write-Host "  $pk Section E:"
    foreach ($cl in @("Remember","Understand","Apply","Analyze","Evaluate")) {
        $n = if ($other_section_e[$pk].ContainsKey($cl)) { $other_section_e[$pk][$cl] } else { 0 }
        if ($n -gt 0) { Write-Host "    $cl = $n" }
    }
}

Write-Host "`n=== S720 Audit Complete ==="
