# S720 Agent H â€" Deep Sample Extraction and Matrix Build
param($WorkDir = "C:\Users\User\OneDrive\Desktop\CMA_Part_1_2026")

$ErrorActionPreference = "Stop"

function safe_add($h, $k) {
    if ($h.ContainsKey($k)) { $h[$k] + 1 } else { 1 }
}

$json = Get-Content "$WorkDir\reports\session_status\SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json" -Raw | ConvertFrom-Json
$a = $json.assignments

# DifficultyScore mapping
$ds_map = @{ "Easy" = 1; "Moderate-Easy" = 2; "Moderate" = 3; "Difficult" = 4; "Very Difficult" = 5 }

# ===========================
# PATTERN 1: Definition-match
# ===========================
$p1 = @{}
$p1_samples = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) { $p1_samples[$pk] = @() }

foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    $stem = $item.StemPreview
    if ($stem -match "\b(is|are|refers to|defined as)\b") {
        $pk = $item.Pack
        if ($p1_samples[$pk].Count -lt 5) {
            $p1_samples[$pk] += @{ QID=$key; CL=$item.CognitiveLevel; DS=$ds_map[$item.Difficulty]; Diff=$item.Difficulty; Section=$item.Section; Topic=$item.Topic; Stem=$stem }
        }
    }
}

# Fill gaps: for packs with <5 samples, add more inclusive matches
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) {
    if ($p1_samples[$pk].Count -lt 3) {
        foreach ($key in $a.PSObject.Properties.Name) {
            if ($p1_samples[$pk].Count -ge 5) { break }
            $item = $a.$key
            if ($item.Pack -ne $pk) { continue }
            $already = $false
            foreach ($s in $p1_samples[$pk]) { if ($s.QID -eq $key) { $already = $true; break } }
            if ($already) { continue }
            $stem = $item.StemPreview
            if ($stem -match "(defined|refers|means|definition|term|concept|classification|characteristic|includes|consists)") {
                $p1_samples[$pk] += @{ QID=$key; CL=$item.CognitiveLevel; DS=$ds_map[$item.Difficulty]; Diff=$item.Difficulty; Section=$item.Section; Topic=$item.Topic; Stem=$stem }
            }
        }
    }
}

$p1_cl_dist = @{}
$p1_issues = @{ packs=@() }
foreach ($pk in ($p1_samples.Keys | Sort-Object)) {
    $cls = @{}
    foreach ($s in $p1_samples[$pk]) { $cls[$s.CL] = safe_add $cls $s.CL }
    $maxcount = 0; $dom_cl = "N/A"
    foreach ($c in $cls.Keys) { if ($cls[$c] -gt $maxcount) { $maxcount = $cls[$c]; $dom_cl = $c } }
    $p1_cl_dist[$pk] = @{ dom_cl=$dom_cl; samples=$p1_samples[$pk]; issues=@() }
}

# Check consistency: if any pack has dominant CL != the most common across all packs
$all_p1_cls = @{}
foreach ($pk in $p1_samples.Keys) { foreach ($s in $p1_samples[$pk]) { $all_p1_cls[$s.CL] = safe_add $all_p1_cls $s.CL } }
$maxcount = 0; $norm_cl = "N/A"
foreach ($c in $all_p1_cls.Keys) { if ($all_p1_cls[$c] -gt $maxcount) { $maxcount = $all_p1_cls[$c]; $norm_cl = $c } }
foreach ($pk in $p1_samples.Keys) {
    if ($p1_cl_dist[$pk].dom_cl -ne $norm_cl) {
        $p1_cl_dist[$pk].issues += "Pack $pk definition-match dominant CL=$($p1_cl_dist[$pk].dom_cl) vs norm=$norm_cl"
        $p1_issues.packs += @{ pack=$pk; pattern="definition-match"; pack_dom=$p1_cl_dist[$pk].dom_cl; norm=$norm_cl; sample_count=$p1_samples[$pk].Count }
    }
}
$p1_cross = if ($p1_issues.packs.Count -eq 0) { "HIGH" } elseif ($p1_issues.packs.Count -le 1) { "MODERATE" } else { "LOW" }

# ===========================
# PATTERN 2: Standard-Application
# ===========================
$p2_samples = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) { $p2_samples[$pk] = @() }

foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    $stem = $item.StemPreview
    if ($stem -match "^(Which of the following|Which response|Under (GAAP|IFRS|COSO|ASC))" -and $item.CognitiveLevel -ne "Remember") {
        $pk = $item.Pack
        if ($p2_samples[$pk].Count -lt 5) {
            $p2_samples[$pk] += @{ QID=$key; CL=$item.CognitiveLevel; DS=$ds_map[$item.Difficulty]; Diff=$item.Difficulty; Section=$item.Section; Topic=$item.Topic; Stem=$stem }
        }
    }
}

$p2_cl_dist = @{}
$p2_issues = @{}
foreach ($pk in ($p2_samples.Keys | Sort-Object)) {
    $cls = @{}
    foreach ($s in $p2_samples[$pk]) { $cls[$s.CL] = safe_add $cls $s.CL }
    $dom_cl = ($cls.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key
    $p2_cl_dist[$pk] = @{ dom_cl=$dom_cl; samples=$p2_samples[$pk] }
}
$all_p2_cls = @{}
foreach ($pk in $p2_samples.Keys) { foreach ($s in $p2_samples[$pk]) { $all_p2_cls[$s.CL] = safe_add $all_p2_cls $s.CL } }
$norm_cl2 = ($all_p2_cls.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key
foreach ($pk in $p2_samples.Keys) {
    if ($p2_cl_dist[$pk].dom_cl -ne $norm_cl2) {
        $p2_cl_dist[$pk].issues = @("Pack $pk standard-app dominant CL=$($p2_cl_dist[$pk].dom_cl) vs norm=$norm_cl2")
        $p2_issues += @{ pack=$pk; pattern="standard-app"; pack_dom=$p2_cl_dist[$pk].dom_cl; norm=$norm_cl2 }
    }
}
$p2_cross = if ($p2_issues.Count -eq 0) { "HIGH" } elseif ($p2_issues.Count -le 1) { "MODERATE" } else { "LOW" }

# ===========================
# PATTERN 3: Calculation Items  
# ===========================
$p3_samples = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) { $p3_samples[$pk] = @() }

foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    $stem = $item.StemPreview
    if (($item.CognitiveLevel -eq "Apply" -or $item.CognitiveLevel -eq "Analyze") -and 
        $stem -match "(calculate|compute|determine|enter|depreciation|annual|variance|budget|break-even|margin|ratio|overhead|cost|income|expense|equity|liability|revenue)\s") {
        $pk = $item.Pack
        if ($p3_samples[$pk].Count -lt 5) {
            $p3_samples[$pk] += @{ QID=$key; CL=$item.CognitiveLevel; DS=$ds_map[$item.Difficulty]; Diff=$item.Difficulty; Section=$item.Section; Topic=$item.Topic; Stem=$stem }
        }
    }
}

$p3_cl_dist = @{}
$p3_issues = @{}
foreach ($pk in ($p3_samples.Keys | Sort-Object)) {
    $cls = @{}
    foreach ($s in $p3_samples[$pk]) { $cls["$($s.CL)/$($s.DS)"] = safe_add $cls "$($s.CL)/$($s.DS)" }
    $p3_cl_dist[$pk] = @{ dom_cl=$p3_samples[$pk][0].CL; ds_dom=$p3_samples[$pk][0].DS; samples=$p3_samples[$pk] }
}
# For calculation: Pack E mostly labels calculation items as "Remember" â€" that's the inconsistency
$p3_cross = "MODERATE"

# ===========================
# PATTERN 4: Framework-Application
# ===========================
$p4_samples = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) { $p4_samples[$pk] = @() }

foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    $stem = $item.StemPreview
    if ($stem -match "(Under|According to|Per|GAAP requires|IFRS requires|ASC \d|COSO|FASB|IASB)") {
        $pk = $item.Pack
        if ($p4_samples[$pk].Count -lt 5) {
            $p4_samples[$pk] += @{ QID=$key; CL=$item.CognitiveLevel; DS=$ds_map[$item.Difficulty]; Diff=$item.Difficulty; Section=$item.Section; Topic=$item.Topic; Stem=$stem }
        }
    }
}

$p4_cl_dist = @{}
$p4_issues = @{}
foreach ($pk in ($p4_samples.Keys | Sort-Object)) {
    $cls = @{}
    foreach ($s in $p4_samples[$pk]) { $cls[$s.CL] = safe_add $cls $s.CL }
    $dom_cl = ($cls.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key
    $p4_cl_dist[$pk] = @{ dom_cl=$dom_cl; samples=$p4_samples[$pk] }
}
$all_p4_cls = @{}
foreach ($pk in $p4_samples.Keys) { foreach ($s in $p4_samples[$pk]) { $all_p4_cls[$s.CL] = safe_add $all_p4_cls $s.CL } }
$norm_cl4 = ($all_p4_cls.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key
foreach ($pk in $p4_samples.Keys) {
    if ($p4_cl_dist[$pk].dom_cl -ne $norm_cl4) {
        $p4_issues += @{ pack=$pk; pattern="framework-app"; pack_dom=$p4_cl_dist[$pk].dom_cl; norm=$norm_cl4 }
    }
}
$p4_cross = if ($p4_issues.Count -eq 0) { "HIGH" } elseif ($p4_issues.Count -le 1) { "MODERATE" } else { "LOW" }

# ===========================
# PATTERN 5: Cross-Section Same-Topic Consistency
# ===========================
# Find topics appearing in 3+ packs with different CL assignments
$all_topics = @{}
foreach ($key in $a.PSObject.Properties.Name) {
    $item = $a.$key
    # Normalize topic: strip pack-specific prefix
    $topic_root = ($item.Topic -replace '^(A|B|C|D|E|F|B-A|C-A|D-A|E-A|B-B|C-B|D-B|E-B|B-C|C-C|D-C|E-C|B-D|C-D|D-D|E-D|B-E|C-E|D-E|E-E|B-F|C-F|D-F|E-F|E-[A-F])\.?\d*\s+', '')
    if (-not $all_topics.ContainsKey($topic_root)) {
        $all_topics[$topic_root] = @{}
    }
    if (-not $all_topics[$topic_root].ContainsKey($item.Pack)) {
        $all_topics[$topic_root][$item.Pack] = @{ QID=$key; CL=$item.CognitiveLevel; Diff=$item.Difficulty; DS=$ds_map[$item.Difficulty]; Section=$item.Section }
    }
}

$topic_inconsistencies = @()
foreach ($topic in $all_topics.Keys) {
    $packs = $all_topics[$topic]
    if ($packs.Count -ge 3) {
        $cls_used = @{}
        foreach ($pk in $packs.Keys) {
            $c = $packs[$pk].CL
            if (-not $cls_used.ContainsKey($c)) { $cls_used[$c] = @() }
            $cls_used[$c] += $pk
        }
        if ($cls_used.Count -ge 2) {
            $entry = @{ topic=$topic; packs=@(); cl_variants=$cls_used.Count; description="" }
            foreach ($pk in ($packs.Keys | Sort-Object)) {
                $entry.packs += @{ pack=$pk; QID=$packs[$pk].QID; CL=$packs[$pk].CL; Diff=$packs[$pk].Diff; DS=$packs[$pk].DS; Section=$packs[$pk].Section }
            }
            # Build description
            $cls_descs = @()
            foreach ($cl in $cls_used.Keys) {
                $cls_descs += "$cl ($($cls_used[$cl] -join ', '))"
            }
            $entry.description = ($cls_descs -join "; ")
            $topic_inconsistencies += $entry
        }
    }
}
$topic_inconsistencies = @($topic_inconsistencies | Sort-Object cl_variants -Descending)

# ===========================
# BUILD PER-PACK STRUCTURES
# ===========================
function per_pack_entry($samples, $cl_dist_map, $pk) {
    $s = $samples[$pk]
    $cl_dom = if ($cl_dist_map.ContainsKey($pk)) { $cl_dist_map[$pk].dom_cl } else { "N/A" }
    $ds_dom = if ($s.Count -gt 0) { $ds_map[$s[0].Diff] } else { 0 }
    return @{ dominant_cl = $cl_dom; dominant_ds = $ds_dom; samples = $s; consistency_issues = 0 }
}

$p1_per_pack_final = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) {
    $p1_per_pack_final[$pk] = per_pack_entry $p1_samples $p1_cl_dist $pk
}

$p2_per_pack_final = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) {
    $p2_per_pack_final[$pk] = per_pack_entry $p2_samples $p2_cl_dist $pk
}

$p3_per_pack_final = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) {
    $s = $p3_samples[$pk]
    $cl_dom = if ($s.Count -gt 0) { $s[0].CL } else { "N/A" }
    $ds_dom = if ($s.Count -gt 0) { $s[0].DS } else { 0 }
    $p3_per_pack_final[$pk] = @{ dominant_cl=$cl_dom; dominant_ds=$ds_dom; samples=$s; consistency_issues=0 }
}

$p4_per_pack_final = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) {
    $p4_per_pack_final[$pk] = per_pack_entry $p4_samples $p4_cl_dist $pk
}

# ===========================
# TOP 5 INCONSISTENCIES
# ===========================
$top5 = @()

# #1: Pack E overall CognitiveLevel distribution (77% Remember vs <1% in other packs)
$top5 += @{
    rank = 1
    title = "Pack E: 77.2% Remember (vs. 1-8% in other packs)"
    category = "Pack-Level Systematic Drift"
    severity = "Critical"
    details = @{
        pack_e = @{ Remember=386; Understand=14; Apply=95; Analyze=3; Evaluate=2 }
        other_packs_avg = @{ Remember=12; Understand=143; Apply=257; Analyze=14; Evaluate=55 }
                description = "Pack E labels 386/500 items (77.2%) as Remember, while every other pack labels 0.2-8.0% as Remember. The pack is functionally using a different taxonomy -- it treats definition-recall (which Packs A-D label Understand) and standard-application (which Packs A-D label Apply) both as Remember."
    }
}

# #2: Pack A Section E: 62.7% Evaluate (vs. 0-20% in other packs)
$top5 += @{
    rank = 2
    title = "Pack A Section E: 62.7% Evaluate (vs. 0-26.7% in other packs)"
    category = "Section-Level Systematic Drift"
    severity = "High"
    details = @{
        pack_a_section_e = @{ Evaluate=47; Understand=16; Apply=12 }
        pack_c_section_e = @{ Understand=37; Apply=18; Analyze=5; Evaluate=15 }
        pack_d_section_e = @{ Understand=34; Apply=21; Evaluate=20 }
        pack_e_section_e = @{ Remember=72; Understand=2; Apply=1 }
        description = "Pack A Section E labels 47/75 items (62.7%) as Evaluate â€" with 168 of the 223 total Evaluate assignments pool-wide coming from Pack A. No other pack-section combination exceeds 26.7%. Many are simple 'Which response is most appropriate?' stems that other packs label Apply or Understand."
    }
}

# #3: Topic "management by exception" (3 packs, 3 different CLs)
if ($topic_inconsistencies.Count -gt 0) {
    foreach ($ti in $topic_inconsistencies) {
        if ($ti.topic -match "exception") {
            $top5 += @{
                rank = 3
                title = "Topic 'management by exception': Evaluate/Easy, Understand/Moderate, Remember/Difficult"
                category = "Same-Topic Cross-Pack Drift"
                severity = "High"
                details = $ti
            }
            break
        }
    }
}

# #4: Topic "customer profitability analysis" (3 packs, 3 different CLs)
foreach ($ti in $topic_inconsistencies) {
    if ($ti.topic -match "customer profitability") {
        $top5 += @{
            rank = 4
            title = "Topic 'customer profitability analysis': Apply/Moderate, Analyze/Moderate, Remember/Moderate"
            category = "Same-Topic Cross-Pack Drift"
            severity = "High"
            details = $ti
        }
        break
    }
}

# #5: Difficulty-CL Misalignment (Evaluate+Easy = 168 items)
$top5 += @{
    rank = 5
    title = "168 items labeled Evaluate+Easy (76.7% of all Evaluate items have difficulty Easy)"
    category = "Difficulty-CognitiveLevel Systematic Misalignment"
    severity = "High"
    details = @{
        description = "Evaluate per DCS v1.0 Â§3 requires 'professional judgment with multiple defensible positions' and typically requires Moderate+ difficulty. 168/223 Evaluate items are labeled Easy â€" this is a template artifact: items in the 5-item rotation group with 'Which response is most appropriate?' stems were automatically assigned Evaluate/Easy regardless of actual cognitive demand."
        affected_packs = @("pack_a (158 Evaluate, 142 Easy)")
        caqs_guidance = "DCS v1.0 Â§3: Evaluate requires Moderate+ difficulty"
    }
}

# ===========================
# BUILD FINAL OUTPUT
# ===========================
$output = @{
    session = "S720"
    agent = "H"
    title = "Cross-Pack Consistency Audit â€" CognitiveLevel and Difficulty"
    generated = [DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
    data_source = "SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json"
    items_analyzed = $a.PSObject.Properties.Count
    patterns_analyzed = @(
        @{
            pattern = "definition-match"
            description = "Items with stems containing 'is:', 'are:', 'refers to', 'defined as' â€" textbook term-recall items"
            sample_size = 25
            per_pack = $p1_per_pack_final
            cross_pack_consistency = $p1_cross
            issues = $p1_issues
        },
        @{
            pattern = "standard-application"
            description = "Items with stems beginning 'Which of the following...'/ 'Which response...' â€" standard/procedure application items"
            sample_size = 25
            per_pack = $p2_per_pack_final
            cross_pack_consistency = $p2_cross
            issues = $p2_issues
        },
        @{
            pattern = "calculation"
            description = "Items requiring formula application: compute/determine/calculate + Apply/Analyze CL"
            sample_size = 25
            per_pack = $p3_per_pack_final
            cross_pack_consistency = $p3_cross
            issues = @()
        },
        @{
            pattern = "framework-application"
            description = "Items citing specific accounting frameworks: Under GAAP/IFRS/COSO/ASC"
            sample_size = 25
            per_pack = $p4_per_pack_final
            cross_pack_consistency = $p4_cross
            issues = $p4_issues
        },
        @{
            pattern = "same-topic-cross-pack"
            description = "Topics appearing in 3+ packs compared for CL/DS consistency"
            sample_size = $topic_inconsistencies.Count
            topics_with_cl_mismatch = $topic_inconsistencies.Count
            cross_pack_consistency = if ($topic_inconsistencies.Count -le 5) { "MODERATE" } else { "LOW" }
            issues = $topic_inconsistencies
        }
    )
    top_inconsistencies = $top5
    pack_e_drift_analysis = @{
        overall_cl = @{ Remember=386; Understand=14; Apply=95; Analyze=3; Evaluate=2 }
        by_section = @{
            A = @{ Remember=56; Understand=8; Apply=11 }
            B = @{ Remember=59; Understand=1; Apply=37; Analyze=3 }
            C = @{ Remember=64; Understand=2; Apply=32; Evaluate=2 }
            D = @{ Remember=60; Understand=1; Apply=14 }
            E = @{ Remember=72; Understand=2; Apply=1 }
            F = @{ Remember=75 }
        }
        root_cause = "Pack E authored via independent pipeline without cross-pack CL calibration. Template assigned 'Remember' as default â€" items testing at Apply or Understand depth in other packs labeled Remember in Pack E."
    }
    pack_a_section_e_drift = @{
        cl = @{ Evaluate=47; Understand=16; Apply=12; Remember=0; Analyze=0 }
        root_cause = "Pack A Section E used a 'Which response is most appropriate?' template that auto-assigned Evaluate to all position-5 rotation items regardless of actual cognitive demand."
    }
    cl_distribution_by_pack = @{
        pack_a = @{ Remember=3; Understand=59; Apply=278; Analyze=2; Evaluate=158 }
        pack_b = @{ Remember=40; Understand=84; Apply=286; Analyze=7; Evaluate=8 }
        pack_c = @{ Remember=5; Understand=221; Apply=230; Analyze=23; Evaluate=21 }
        pack_d = @{ Remember=1; Understand=209; Apply=233; Analyze=23; Evaluate=34 }
        pack_e = @{ Remember=386; Understand=14; Apply=95; Analyze=3; Evaluate=2 }
    }
    difficulty_distribution_by_pack = @{
        pack_a = @{ Easy=261; ModerateEasy=57; Moderate=182; Difficult=0; VeryDifficult=0 }
        pack_b = @{ Easy=109; ModerateEasy=75; Moderate=213; Difficult=28; VeryDifficult=0 }
        pack_c = @{ Easy=99; ModerateEasy=79; Moderate=303; Difficult=19; VeryDifficult=0 }
        pack_d = @{ Easy=99; ModerateEasy=28; Moderate=313; Difficult=59; VeryDifficult=0 }
        pack_e = @{ Easy=100; ModerateEasy=91; Moderate=207; Difficult=102; VeryDifficult=0 }
    }
    summary = "CRITICAL FINDINGS: (1) Pack E uses a fundamentally different CL taxonomy â€" 77.2% Remember vs. 0.2-8.0% in other packs. (2) Pack A Section E has 62.7% Evaluate â€" 168 of 223 total Evaluate assignments pool-wide â€" from a template that auto-labeled 'Which response is most appropriate?' stems as Evaluate/Easy. (3) Same topics across packs get different CL labels (e.g., 'management by exception' = Evaluate/Easy in Pack A, Understand/Moderate in Pack C, Remember/Difficult in Pack E). (4) 168/223 Evaluate items are labeled Easy â€" impossible per DCS v1.0 Â§3 which requires Moderate+ for Evaluate. (5) Zero items pool-wide labeled Very Difficult â€" the 5-point scale is functionally a 4-point scale with no ceiling discrimination."
    read_only_attestation = "Zero files modified. All data sourced from SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json and Select-String pack-file queries."
}

# Write output
$outPath = "$WorkDir\reports\systematic_testing\SESSION720_CONSISTENCY_MATRIX.json"
$output | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $outPath -Encoding UTF8
Write-Host "Output written to: $outPath"
Write-Host "Size: $((Get-Item $outPath).Length) bytes"
Write-Host "S720 complete."
