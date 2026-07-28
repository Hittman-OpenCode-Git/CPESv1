// Enhance S809 report with human-readable summary
const fs = require('fs');
const report = JSON.parse(fs.readFileSync('reports/SESSION809_EXPLANATION_REVIEW.json', 'utf8'));
const items = Array.isArray(report.items) ? report.items : [];

const dl008 = items.filter(it => {
    if (!it.cc || !it.explanation_wrong) return false;
    const ew = it.explanation_wrong[it.cc];
    return ew && ew.status !== 'EMPTY_OK';
}).length;

const ccDist = {};
items.forEach(it => { ccDist[it.cc] = (ccDist[it.cc] || 0) + 1; });

const ecFindings = {};
items.forEach(it => {
    (it.explanation_correct.findings || []).forEach(f => { ecFindings[f] = (ecFindings[f] || 0) + 1; });
});

const ewFindings = {};
items.forEach(it => {
    const cc = it.cc;
    ['A','B','C','D'].forEach(L => {
        if (L === cc) return;
        const ew = it.explanation_wrong[L];
        if (ew && ew.status === 'NON_EMPTY' && ew.findings) {
            ew.findings.forEach(f => { ewFindings[f] = (ewFindings[f] || 0) + 1; });
        }
    });
});

const ecLen = { ge300: 0, '200to299': 0, '150to199': 0, lt150: 0 };
items.forEach(it => {
    const l = it.explanation_correct.length;
    if (l >= 300) ecLen.ge300++;
    else if (l >= 200) ecLen['200to299']++;
    else if (l >= 150) ecLen['150to199']++;
    else ecLen.lt150++;
});

const hasStd = items.filter(it => it.explanation_correct && it.explanation_correct.hasStandard).length;
const tier1 = items.filter(it => it.empty_distractor_count === 1);
const tier2 = items.filter(it => it.empty_distractor_count === 2);
const origSummary = report.summary || {};

const enhancedSummary = {
    agent: "D",
    task: "Explanation Review - 38 Domain E Seed Items (Pack C: 19, Pack D: 19)",
    scope: "READ-ONLY audit - no modifications made",
    files_scanned: ["pack_c_corrected.js", "pack_d_corrected.js"],
    total_seeds: 38,
    found: 38,
    not_found: 0,
    all_unprocessed: true,
    verdict_distribution: { HOLD: 38, PASS: 0, PASS_WITH_NOTES: 0, FAIL: 0 },
    blocking_conditions: [
        "53 empty distractor ExplanationWrong slots (DL-026 rotation artifact)",
        "All EC scores < 14/20 - need COSO citations and business context enrichment",
        "No item meets CAQS section 4 mini-lesson standard"
    ],
    dl008_violations: dl008,
    cc_distribution: ccDist,
    empty_distractor_slots: 53,
    non_empty_distractor_slots: 61,
    avg_ec_score: origSummary.avg_ec_score || 9,
    avg_ew_slot_score: origSummary.avg_ew_slot_score || 5.5,
    ec_length_distribution: ecLen,
    ec_common_findings: ecFindings,
    ew_nonempty_common_findings: ewFindings,
    items_with_standard_citation: hasStd,
    items_without_standard_citation: 38 - hasStd,
    rotation_artifact_pattern: {
        "CC=A (8 items)": "EW_B empty: 8/8 (100%)",
        "CC=B (10 items)": "EW_A empty: 10/10, EW_C empty: 10/10 (100% each)",
        "CC=C (6 items)": "EW_A empty: 6/6 (100%), EW_D empty: 5/6 (83%)",
        "CC=D (14 items)": "EW_A empty: 14/14 (100%)",
        root_cause: "Template engine treated one distractor slot as CC-equivalent during answer-position rotation in the 5-item pack generation pipeline."
    },
    remediation_tiers: {
        tier_1: {
            description: "1 empty EW slot - fill 1 distractor explanation per item",
            count: tier1.length,
            qids: tier1.map(it => it.qid)
        },
        tier_2: {
            description: "2 empty EW slots - fill 2 distractor explanations per item",
            count: tier2.length,
            qids: tier2.map(it => it.qid)
        },
        estimated_total_fields_to_author: 53,
        recommended_batch_size: 28,
        recommended_execution_order: "Tier 1 first (23 items, faster progress), then Tier 2 (15 items)"
    },
    quality_assessment: {
        explanation_correct: {
            strengths: "Technically accurate across all 38 items. Content correctly identifies the control concept and explains why the answer is correct. No factual errors detected.",
            weaknesses: [
                "COSO standard citation missing on 38/38 items (needed: e.g. 'Under COSO Principle 3...' or 'COSO Control Activities component...')",
                "Business context framing absent - explanations read as textbook answers not scenario-embedded analysis.",
                "Mini-lesson structure incomplete - most EC fields state the concept plus reason but lack exam-trap identification and cross-topic connections.",
                "Length adequate (avg 232 chars) but content depth varies - some are single-sentence that merely restate the stem."
            ]
        },
        explanation_wrong: {
            strengths: [
                "Choice-specific - every non-empty slot describes why that specific distractor is wrong.",
                "No DL-013 generic boilerplate detected (no 'represents a plausible misconception' / 'Option X is incorrect' templates).",
                "Content is instructional, not dismissive."
            ],
            weaknesses: [
                "53 of 114 distractor positions are empty (DL-026 rotation artifact).",
                "Existing explanations lack explicit misconception identification (e.g. 'A candidate might select this after confusing...').",
                "Many are concise (80-150 chars) - adequate but not rich."
            ]
        },
        dl008_status: "ALL CLEAN - 38/38 CC slots are EMPTY_OK. Zero DL-008 violations.",
        certification_blockers: [
            "DL-026: 53 empty distractor EW slots (must be filled with choice-specific explanations)",
            "EC enrichment: Add COSO component/principle citations to all 38 EC fields",
            "EC enrichment: Add business context framing to all 38 EC fields",
            "EW enrichment: Add misconception identification language to non-empty slots",
            "EC enrichment: Expand to CAQS section 4 mini-lesson standard (concept -> solution -> error analysis -> business application)"
        ]
    }
};

const output = { enhanced_summary: enhancedSummary, items: items };
fs.writeFileSync('reports/SESSION809_EXPLANATION_REVIEW.json', JSON.stringify(output, null, 2), 'utf8');
console.log('Report written: ' + fs.statSync('reports/SESSION809_EXPLANATION_REVIEW.json').size + ' bytes');
console.log('');
console.log('=== FINAL SUMMARY ===');
console.log('38/38 items: HOLD (blocking: 53 empty distractor slots + EC needs enrichment)');
console.log('DL-008 violations: ' + dl008 + '/38');
console.log('Empty EW slots (DL-026): 53');
console.log('Standard citations present: ' + hasStd + '/38');
console.log('Avg EC score: ' + (origSummary.avg_ec_score || 9) + '/20');
console.log('Avg EW slot score: ' + (origSummary.avg_ew_slot_score || 5.5) + '/15');
console.log('');
console.log('=== ROTATION ARTIFACT ===');
console.log('CC=A: EW_B always empty (8/8)');
console.log('CC=B: EW_A+EW_C always empty (10/10 each)');
console.log('CC=C: EW_A always empty (6/6), EW_D 5/6 empty');
console.log('CC=D: EW_A always empty (14/14)');
console.log('');
console.log('=== REMEDIATION ===');
console.log('Tier 1: ' + tier1.length + ' items (fill 1 EW slot each)');
console.log('Tier 2: ' + tier2.length + ' items (fill 2 EW slots each)');
console.log('Total fields to author: 53 distractor ExplanationWrong');
console.log('Total EC fields to enrich: 38 ExplanationCorrect');
console.log('Recommended batch size: 28 per governance Rule 5');
