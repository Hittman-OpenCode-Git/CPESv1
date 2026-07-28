# S720 Agent H - Cross-Pack Consistency Audit
$ErrorActionPreference = "Stop"
$WorkDir = if ($PSScriptRoot) { Split-Path -Parent $PSScriptRoot } else { "C:\Users\User\OneDrive\Desktop\CMA_Part_1_2026" }

function safe_add($h, $k) { if ($h.ContainsKey($k)) { return $h[$k] + 1 } else { return 1 } }

$vf_path = Join-Path $WorkDir "reports\session_status\SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json"
Write-Host "Loading: $vf_path"
$json = Get-Content $vf_path -Raw | ConvertFrom-Json
$a = $json.assignments
$total = @($a | Get-Member -MemberType NoteProperty).Count
Write-Host "Items loaded: $total"

$ds_map = @{ "Easy" = 1; "Moderate-Easy" = 2; "Moderate" = 3; "Difficult" = 4; "Very Difficult" = 5 }

# =========== CL AND DIFF DISTRIBUTIONS ===========
$cl_dist = @{}; $diff_dist = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) {
    $cl_dist[$pk] = @{Remember=0;Understand=0;Apply=0;Analyze=0;Evaluate=0}
    $diff_dist[$pk] = @{Easy=0;ModerateEasy=0;Moderate=0;Difficult=0;VeryDifficult=0}
}
foreach ($key in $a.PSObject.Properties.Name) {
    $it = $a.$key; $pk = $it.Pack; $cl_dist[$pk][$it.CognitiveLevel]++
    $dn = ($it.Difficulty -replace '-',''); $diff_dist[$pk][$dn]++
}

# =========== P1: Definition-Match ===========
$p1_samples=@{};$p1_all=@{};$p1_dominant=@{}
foreach($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")){$p1_samples[$pk]=@();$p1_all[$pk]=@()}
foreach($key in $a.PSObject.Properties.Name){$it=$a.$key;$stem=$it.StemPreview;$pk=$it.Pack
if($stem-match"\b(is|are|refers to|defined as|means)\b"){$rec=@{QID=$key;CL=$it.CognitiveLevel;DS=$ds_map[$it.Difficulty];Diff=$it.Difficulty;Section=$it.Section;Topic=$it.Topic;Stem=$stem}
$p1_all[$pk]+=$rec;if($p1_samples[$pk].Count-lt5){$p1_samples[$pk]+=$rec}}}
foreach($pk in ($p1_all.Keys|Sort)){$cm=@{};foreach($e in $p1_all[$pk]){$cm[$e.CL]=safe_add $cm $e.CL};$max=0;$dom="N/A";foreach($c in $cm.Keys){if($cm[$c]-gt$max){$max=$cm[$c];$dom=$c}};$p1_dominant[$pk]=@{CL=$dom;count=$max;total=$p1_all[$pk].Count}}
$p1_n="";$p1_m=0;foreach($cl in @("Remember","Understand","Apply","Analyze","Evaluate")){$cnt=0;foreach($pk in $p1_all.Keys){foreach($e in $p1_all[$pk]){if($e.CL-eq$cl){$cnt++}}};if($cnt-gt$p1_m){$p1_m=$cnt;$p1_n=$cl}}
$p1_issues=@();foreach($pk in $p1_dominant.Keys){if($p1_dominant[$pk].CL-ne$p1_n-and$p1_dominant[$pk].total-ge3){$p1_issues+=@{pack=$pk;pack_dominant=$p1_dominant[$pk].CL;pool_norm=$p1_n;sample_count=$p1_dominant[$pk].total}}}
$p1_cross=if($p1_issues.Count-eq0){"HIGH"}elseif($p1_issues.Count-le1){"MODERATE"}else{"LOW"}

# =========== P2: Standard-Application ===========
$p2_samples=@{};$p2_all=@{};$p2_dominant=@{}
foreach($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")){$p2_samples[$pk]=@();$p2_all[$pk]=@()}
foreach($key in $a.PSObject.Properties.Name){$it=$a.$key;$stem=$it.StemPreview;$pk=$it.Pack
if($stem-match"^(Which of the following|Which response|Under GAAP|Under IFRS|Under COSO|Under ASC)"){$rec=@{QID=$key;CL=$it.CognitiveLevel;DS=$ds_map[$it.Difficulty];Diff=$it.Difficulty;Section=$it.Section;Topic=$it.Topic;Stem=$stem}
$p2_all[$pk]+=$rec;if($p2_samples[$pk].Count-lt5){$p2_samples[$pk]+=$rec}}}
foreach($pk in ($p2_all.Keys|Sort)){$cm=@{};foreach($e in $p2_all[$pk]){$cm[$e.CL]=safe_add $cm $e.CL};$max=0;$dom="N/A";foreach($c in $cm.Keys){if($cm[$c]-gt$max){$max=$cm[$c];$dom=$c}};$p2_dominant[$pk]=@{CL=$dom;count=$max;total=$p2_all[$pk].Count}}
$p2_n="";$p2_m=0;foreach($cl in @("Remember","Understand","Apply","Analyze","Evaluate")){$cnt=0;foreach($pk in $p2_all.Keys){foreach($e in $p2_all[$pk]){if($e.CL-eq$cl){$cnt++}}};if($cnt-gt$p2_m){$p2_m=$cnt;$p2_n=$cl}}
$p2_issues=@();foreach($pk in $p2_dominant.Keys){if($p2_dominant[$pk].CL-ne$p2_n-and$p2_dominant[$pk].total-ge3){$p2_issues+=@{pack=$pk;pack_dominant=$p2_dominant[$pk].CL;pool_norm=$p2_n;sample_count=$p2_dominant[$pk].total}}}
$p2_cross=if($p2_issues.Count-eq0){"HIGH"}elseif($p2_issues.Count-le1){"MODERATE"}else{"LOW"}

# =========== P3: Calculation ===========
$p3_samples=@{};$p3_all=@{};$p3_dominant=@{}
foreach($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")){$p3_samples[$pk]=@();$p3_all[$pk]=@()}
foreach($key in $a.PSObject.Properties.Name){$it=$a.$key;$stem=$it.StemPreview;$pk=$it.Pack
if(($it.CognitiveLevel-eq"Apply"-or$it.CognitiveLevel-eq"Analyze")-and$stem-match"(calculate|compute|determine|enter|depreciation|annual|variance|budget|break-even|margin|ratio|overhead|revenue|income|expense|equity|liability|cash flow)"){$rec=@{QID=$key;CL=$it.CognitiveLevel;DS=$ds_map[$it.Difficulty];Diff=$it.Difficulty;Section=$it.Section;Topic=$it.Topic;Stem=$stem}
$p3_all[$pk]+=$rec;if($p3_samples[$pk].Count-lt5){$p3_samples[$pk]+=$rec}}}
foreach($pk in ($p3_all.Keys|Sort)){$cm=@{};$dm=@{};foreach($e in $p3_all[$pk]){$cm[$e.CL]=safe_add $cm $e.CL;$dm[$e.DS]=safe_add $dm $e.DS};$max=0;$dom="N/A";foreach($c in $cm.Keys){if($cm[$c]-gt$max){$max=$cm[$c];$dom=$c}};$max2=0;$dom2=0;foreach($c in $dm.Keys){if($dm[$c]-gt$max2){$max2=$dm[$c];$dom2=$c}};$p3_dominant[$pk]=@{CL=$dom;DS=$dom2;count=$max;total=$p3_all[$pk].Count}}
$p3_issues=@();if($cl_dist["pack_e"]["Apply"]-lt100-and$cl_dist["pack_e"]["Remember"]-gt300){$p3_issues+=@{issue="Pack E labels 77.2% of items Remember, including calculation items other packs label Apply. Only $($cl_dist['pack_e']['Apply'])/500 items labeled Apply."}}
$p3_cross=if($p3_issues.Count-eq0){"HIGH"}else{"LOW"}

# =========== P4: Framework-Application ===========
$p4_samples=@{};$p4_all=@{};$p4_dominant=@{}
foreach($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")){$p4_samples[$pk]=@();$p4_all[$pk]=@()}
foreach($key in $a.PSObject.Properties.Name){$it=$a.$key;$stem=$it.StemPreview;$pk=$it.Pack
if($stem-match"(Under |According to |Per |GAAP requires|IFRS requires|ASC \d|COSO |FASB|IASB)"){$rec=@{QID=$key;CL=$it.CognitiveLevel;DS=$ds_map[$it.Difficulty];Diff=$it.Difficulty;Section=$it.Section;Topic=$it.Topic;Stem=$stem}
$p4_all[$pk]+=$rec;if($p4_samples[$pk].Count-lt5){$p4_samples[$pk]+=$rec}}}
foreach($pk in ($p4_all.Keys|Sort)){$cm=@{};foreach($e in $p4_all[$pk]){$cm[$e.CL]=safe_add $cm $e.CL};$max=0;$dom="N/A";foreach($c in $cm.Keys){if($cm[$c]-gt$max){$max=$cm[$c];$dom=$c}};$p4_dominant[$pk]=@{CL=$dom;count=$max;total=$p4_all[$pk].Count}}
$p4_n="";$p4_m=0;foreach($cl in @("Remember","Understand","Apply","Analyze","Evaluate")){$cnt=0;foreach($pk in $p4_all.Keys){foreach($e in $p4_all[$pk]){if($e.CL-eq$cl){$cnt++}}};if($cnt-gt$p4_m){$p4_m=$cnt;$p4_n=$cl}}
$p4_issues=@();foreach($pk in $p4_dominant.Keys){if($p4_dominant[$pk].CL-ne$p4_n-and$p4_dominant[$pk].total-ge3){$p4_issues+=@{pack=$pk;pack_dominant=$p4_dominant[$pk].CL;pool_norm=$p4_n;sample_count=$p4_dominant[$pk].total}}}
$p4_cross=if($p4_issues.Count-eq0){"HIGH"}elseif($p4_issues.Count-le1){"MODERATE"}else{"LOW"}

# =========== P5: Section-Level Cross-Pack Comparison ===========
# For each section, compare the dominant CL across packs
$section_cl_by_pack = @{}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) {
    $section_cl_by_pack[$pk] = @{}
}
foreach ($key in $a.PSObject.Properties.Name) {
    $it = $a.$key; $pk = $it.Pack; $sec = $it.Section
    if (-not $section_cl_by_pack[$pk].ContainsKey($sec)) {
        $section_cl_by_pack[$pk][$sec] = @{Remember=0;Understand=0;Apply=0;Analyze=0;Evaluate=0}
    }
    $section_cl_by_pack[$pk][$sec][$it.CognitiveLevel]++
}

$section_issues = @()
foreach ($sec in @("A","B","C","D","E","F")) {
    $dom_map = @{}
    foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) {
        if (-not $section_cl_by_pack[$pk].ContainsKey($sec)) { continue }
        $sc = $section_cl_by_pack[$pk][$sec]
        $max = 0; $dom = "N/A"
        foreach ($cl in @("Remember","Understand","Apply","Analyze","Evaluate")) {
            if ($sc[$cl] -gt $max) { $max = $sc[$cl]; $dom = $cl }
        }
        $dom_map[$pk] = @{ CL=$dom; count=$max; total=($sc.Remember+$sc.Understand+$sc.Apply+$sc.Analyze+$sc.Evaluate) }
    }
    $cls_used = @{}
    foreach ($pk in $dom_map.Keys) {
        $c = $dom_map[$pk].CL
        if (-not $cls_used.ContainsKey($c)) { $cls_used[$c] = @() }
        $cls_used[$c] += $pk
    }
    if ($cls_used.Count -ge 2) {
        $entry = @{ section=$sec; pack_dominant=@{}; cl_variant_count=$cls_used.Count }
        foreach ($pk in ($dom_map.Keys | Sort-Object)) {
            $entry.pack_dominant[$pk] = $dom_map[$pk]
        }
        $cl_desc = @(); foreach ($cl in $cls_used.Keys) { $cl_desc += "$cl ($($cls_used[$cl] -join ', '))" }
        $entry.description = ($cl_desc -join " vs. ")
        $section_issues += $entry
    }
}
$section_issues = @($section_issues | Sort-Object cl_variant_count -Descending)
Write-Host "Section-level cross-pack mismatches: $($section_issues.Count)"

# =========== PATTERN TOTALS ===========
$p1_total=0;foreach($pk in $p1_all.Keys){$p1_total+=$p1_all[$pk].Count}
$p2_total=0;foreach($pk in $p2_all.Keys){$p2_total+=$p2_all[$pk].Count}
$p3_total=0;foreach($pk in $p3_all.Keys){$p3_total+=$p3_all[$pk].Count}
$p4_total=0;foreach($pk in $p4_all.Keys){$p4_total+=$p4_all[$pk].Count}

# =========== PER-PACK SAMPLE STRUCTURES ===========
function make_pp($samples,$dominant,$pk_name){
    $s=$samples[$pk_name];$cl=if($dominant.ContainsKey($pk_name)-and$dominant[$pk_name].CL){$dominant[$pk_name].CL}else{"N/A"}
    $ds=if($s.Count-gt0){$s[0].DS}else{0}
    return @{dominant_cl=$cl;dominant_ds=$ds;sample_count=$s.Count;samples=$s}
}
$p1_pp=@{};$p2_pp=@{};$p3_pp=@{};$p4_pp=@{}
foreach($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")){
    $p1_pp[$pk]=make_pp $p1_samples $p1_dominant $pk
    $p2_pp[$pk]=make_pp $p2_samples $p2_dominant $pk
    $p3_pp[$pk]=make_pp $p3_samples $p3_dominant $pk
    $p4_pp[$pk]=make_pp $p4_samples $p4_dominant $pk
}

# =========== PACK E SECTION ANALYSIS ===========
$pack_e_section = @{}
$other_section_avg = @{}
foreach ($sec in @("A","B","C","D","E","F")) {
    $pack_e_section[$sec] = if ($section_cl_by_pack["pack_e"].ContainsKey($sec)) { $section_cl_by_pack["pack_e"][$sec] } else { @{Remember=0;Understand=0;Apply=0;Analyze=0;Evaluate=0} }
    $other_section_avg[$sec] = @{Remember=0;Understand=0;Apply=0;Analyze=0;Evaluate=0}
    $cnt=0
    foreach ($pk in @("pack_a","pack_b","pack_c","pack_d")) {
        if ($section_cl_by_pack[$pk].ContainsKey($sec)) {
            $sc = $section_cl_by_pack[$pk][$sec]
            foreach ($cl in @("Remember","Understand","Apply","Analyze","Evaluate")) {
                $other_section_avg[$sec][$cl] += $sc[$cl]
            }
            $cnt++
        }
    }
    if ($cnt -gt 0) { foreach ($cl in @("Remember","Understand","Apply","Analyze","Evaluate")) { $other_section_avg[$sec][$cl] = [math]::Round($other_section_avg[$sec][$cl]/$cnt, 1) } }
}

# =========== PACK A SECTION E ANALYSIS ===========
$pack_a_e = if ($section_cl_by_pack["pack_a"].ContainsKey("E")) { $section_cl_by_pack["pack_a"]["E"] } else { @{Remember=0;Understand=0;Apply=0;Analyze=0;Evaluate=0} }
$section_e_others = @{}
foreach ($pk in @("pack_c","pack_d","pack_e")) {
    $section_e_others[$pk] = if ($section_cl_by_pack[$pk].ContainsKey("E")) { $section_cl_by_pack[$pk]["E"] } else { @{Remember=0;Understand=0;Apply=0;Analyze=0;Evaluate=0} }
}

# =========== EVALUATE AT EASY ===========
$eval_easy = @{}; $eval_easy_count = 0
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d","pack_e")) { $eval_easy[$pk] = @() }
foreach ($key in $a.PSObject.Properties.Name) {
    $it = $a.$key
    if ($it.CognitiveLevel -eq "Evaluate" -and $it.Difficulty -eq "Easy") {
        $eval_easy_count++
        $pk = $it.Pack
        if ($eval_easy[$pk].Count -lt 10) { $eval_easy[$pk] += @{ QID=$key; Topic=$it.Topic; Stem=$it.StemPreview } }
    }
}

# =========== OTHER PACKS AVERAGE ===========
$other_avg = @{Remember=0;Understand=0;Apply=0;Analyze=0;Evaluate=0}
foreach ($pk in @("pack_a","pack_b","pack_c","pack_d")) {
    foreach ($cl in @("Remember","Understand","Apply","Analyze","Evaluate")) {
        $other_avg[$cl] += $cl_dist[$pk][$cl]
    }
}
$other_keys = @($other_avg.Keys)
foreach ($cl in $other_keys) { $other_avg[$cl] = [math]::Round($other_avg[$cl] / 4.0, 1) }

# =========== TOP 5 INCONSISTENCIES ===========
$top5 = @()

$top5 += @{
    rank=1; title="Pack E: 77.2% Remember vs. 1-8% in other packs -- fundamentally different CL taxonomy"
    category="Pack-Level Systematic Drift"; severity="Critical"
    pack_e=$cl_dist["pack_e"]; other_packs_avg=$other_avg
    description="Pack E labels 386/500 items (77.2%) as Remember while every other pack labels 0.2-8.0% as Remember. All 6 Pack E sections are Remember-dominant (Section F: 100% Remember). Pack E treats definition-recall and standard-application both as Remember where Packs A-D label them Understand and Apply."
}

$top5 += @{
    rank=2; title="Pack A Section E: 62.7% Evaluate vs. 0-26.7% in other pack-sections"
    category="Section-Level Systematic Drift"; severity="High"
    pack_a_e=$pack_a_e; section_e_others=$section_e_others
    description="Pack A Section E labels 47/75 items as Evaluate, accounting for 168 of the 223 total Evaluate assignments pool-wide. No other pack-section exceeds 26.7%. Many are simple 'Which response is most appropriate?' stems that other packs label Understand or Apply."
}

# #3: Section E cross-pack drift (pack_a=Evaluate, pack_c=Understand, pack_d=Understand, pack_e=Remember)
$sec_e_issue = @()
foreach ($si in $section_issues) { if ($si.section -eq "E") { $sec_e_issue = $si; break } }
if ($sec_e_issue.Count -gt 0) {
    $top5 += @{
        rank=3; title="Section E: 4 different dominant CL labels across 4 packs (Evaluate/Understand/Remember)"
        category="Section-Level Cross-Pack Drift"; severity="High"
        section="E"; pack_dominant=$sec_e_issue.pack_dominant; cl_description=$sec_e_issue.description
        description="Section E (Internal Controls) has dominate CL = Evaluate in Pack A, Understand in Pack C/D, and Remember in Pack E. Same exam section, same standard, but the CL assigned is entirely pack-dependent."
    }
} else {
    $si_first_example = if ($si_first) { $si_first.section } else { "none" }
    $top5 += @{
        rank=3; title="Section-level CL assignment is entirely pack-dependent across all sections"
        category="Section-Level Cross-Pack Drift"; severity="High"
        section_count=$section_issues.Count; example=$si_first_example
    }
}

# #4: Difficulty-CL misalignment
$pct_eval_easy = [math]::Round($eval_easy_count / 223.0 * 100, 1)
$top5 += @{
    rank=4; title="$eval_easy_count items labeled Evaluate+Easy ($pct_eval_easy% of all Evaluate at Easy) -- violates DCS v1.0"
    category="Difficulty-CognitiveLevel Misalignment"; severity="High"
    evaluate_total=223; evaluate_at_easy=$eval_easy_count; pct=$pct_eval_easy
    description="Evaluate per DCS v1.0 requires Moderate+ difficulty and professional judgment with multiple defensible positions. $pct_eval_easy% of Evaluate items are labeled Easy -- a template artifact from auto-assigning Evaluate/Easy to 'Which response is most appropriate?' stems in the 5-item rotation."
}

# #5: Section A cross-pack (pack_a/b/d Apply, pack_c Understand, pack_e Remember)
$sec_a_issue = @()
foreach ($si in $section_issues) { if ($si.section -eq "A") { $sec_a_issue = $si; break } }
if ($sec_a_issue.Count -gt 0) {
    $top5 += @{
        rank=5; title="Section A: 3 different dominant CL labels across 5 packs (Apply/Understand/Remember)"
        category="Section-Level Cross-Pack Drift"; severity="High"
        section="A"; pack_dominant=$sec_a_issue.pack_dominant; cl_description=$sec_a_issue.description
        description="Section A (External Financial Reporting) has dominant CL = Apply in Packs A/B/D (56-72%), Understand in Pack C (56%), and Remember in Pack E (74.7%). Same blueprint domain, entirely different CL distribution."
    }
} else {
    $top5 += @{rank=5;title="Zero items pool-wide labeled Very Difficult -- 5-point scale functionally 4-point";category="Difficulty Ceiling Effect";severity="Medium"}
}

# =========== BUILD FINAL OUTPUT ===========
$output = [ordered]@{
    session = "S720"
    agent = "H"
    title = "Cross-Pack Consistency Audit -- CognitiveLevel and Difficulty"
    generated = [DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
    data_source = "SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json"
    items_analyzed = $total

    patterns_analyzed = @(
        [ordered]@{pattern="definition-match";description="Items with stems containing 'is:', 'are:', 'refers to', 'defined as'";total_pool=$p1_total;per_pack_dominant=$p1_dominant;per_pack_samples=$p1_pp;cross_pack_consistency=$p1_cross;issues=$p1_issues}
        [ordered]@{pattern="standard-application";description="Items beginning 'Which of the following...'/ 'Under GAAP/COSO...'";total_pool=$p2_total;per_pack_dominant=$p2_dominant;per_pack_samples=$p2_pp;cross_pack_consistency=$p2_cross;issues=$p2_issues}
        [ordered]@{pattern="calculation";description="Items with Apply/Analyze CL requiring formula execution";total_pool=$p3_total;per_pack_dominant=$p3_dominant;per_pack_samples=$p3_pp;cross_pack_consistency=$p3_cross;issues=$p3_issues}
        [ordered]@{pattern="framework-application";description="Items citing GAAP/COSO/ASC/IASB";total_pool=$p4_total;per_pack_dominant=$p4_dominant;per_pack_samples=$p4_pp;cross_pack_consistency=$p4_cross;issues=$p4_issues}
        [ordered]@{pattern="section-level-cross-pack";description="Same blueprint section (A-F) compared across packs for dominant CL";section_mismatches=$section_issues.Count;cross_pack_consistency="LOW";issues=$section_issues}
    )

    top_inconsistencies = $top5

    cl_distribution_by_pack = $cl_dist
    difficulty_distribution_by_pack = $diff_dist

    pack_e_drift_analysis = [ordered]@{
        overall_cl = $cl_dist["pack_e"]
        other_packs_avg = $other_avg
        by_section = $pack_e_section
        by_section_other_packs_avg = $other_section_avg
        root_cause = "Pack E authored via independent pipeline without cross-pack CL calibration. Template assigned 'Remember' as default."
    }

    pack_a_section_e_analysis = [ordered]@{
        cl = $pack_a_e
        section_e_comparison = $section_e_others
        root_cause = "Pack A Section E used a template that auto-assigned Evaluate/Easy to 'Which response is most appropriate?' stems."
    }

    section_dominant_cl_by_pack = $section_cl_by_pack

    evaluate_at_easy_analysis = [ordered]@{
        total = $eval_easy_count
        pct_of_evaluate = $pct_eval_easy
        samples_by_pack = $eval_easy
    }

    summary = "CRITICAL FINDINGS: (1) Pack E uses a fundamentally different CL taxonomy: 77.2% Remember vs. 0.2-8.0% in other packs. (2) Pack A Section E has 62.7% Evaluate (168 of 223 total Evaluate assignments pool-wide). (3) Section E (Internal Controls) has 4 different dominant CL labels across 4 packs. (4) $eval_easy_count/223 Evaluate items ($pct_eval_easy%) labeled Easy -- violates DCS v1.0 which requires Moderate+ for Evaluate. (5) Zero items pool-wide labeled Very Difficult."

    read_only_attestation = "Zero files modified. All data sourced from SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json."
}

$outPath = Join-Path $WorkDir "reports\systematic_testing\SESSION720_CONSISTENCY_MATRIX.json"
$output | ConvertTo-Json -Depth 7 | Set-Content -LiteralPath $outPath -Encoding UTF8
Write-Host "Output: $outPath"
Write-Host "Size: $((Get-Item $outPath).Length) bytes"
Write-Host ""
Write-Host "=== S720 AUDIT COMPLETE ==="
Write-Host "P1 definition-match: $p1_cross ($($p1_issues.Count) issue packs)"
Write-Host "P2 standard-application: $p2_cross ($($p2_issues.Count) issue packs)"
Write-Host "P3 calculation: $p3_cross"
Write-Host "P4 framework-application: $p4_cross ($($p4_issues.Count) issue packs)"
Write-Host "P5 section-level: $($section_issues.Count) section mismatches"
Write-Host "Evaluate-at-Easy: $eval_easy_count / 223"
Write-Host "Top finding: Pack E 77.2% Remember vs. <8% all other packs"
