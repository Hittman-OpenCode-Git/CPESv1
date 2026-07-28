// S809 Explanation Review Agent D — Analyze ExplanationCorrect and ExplanationWrong fields
// for 38 Domain E seeds (Pack C: 19, Pack D: 19)
// READ-ONLY — no file modifications

const fs = require('fs');

const seedsC = ["P1-EC-004","P1-EC-008","P1-EC-014","P1-EC-020","P1-EC-021","P1-EC-022","P1-EC-023","P1-EC-024","P1-EC-025","P1-EC-028","P1-EC-031","P1-EC-040","P1-EC-041","P1-EC-049","P1-EC-052","P1-EC-060","P1-EC-061","P1-EC-066","P1-EC-072"];
const seedsD = ["P1-ED-001","P1-ED-010","P1-ED-014","P1-ED-016","P1-ED-025","P1-ED-028","P1-ED-035","P1-ED-036","P1-ED-042","P1-ED-046","P1-ED-051","P1-ED-058","P1-ED-064","P1-ED-066","P1-ED-071","P1-ED-072","P1-ED-073","P1-ED-074","P1-ED-075"];

function extractPack(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayStart = content.indexOf('[');
    const arrayEnd = content.lastIndexOf(']');
    const arrayStr = content.slice(arrayStart, arrayEnd + 1);
    const allItems = JSON.parse(arrayStr);
    const map = {};
    for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i];
        if (item.QuestionID) {
            const contentBlock = allItems[i + 1];
            if (contentBlock && contentBlock.Stem && contentBlock.CorrectChoice) {
                map[item.QuestionID] = { ...contentBlock, ...item };
            } else {
                map[item.QuestionID] = { ...item };
            }
        }
    }
    return map;
}

const packC = extractPack("pack_c_corrected.js");
const packD = extractPack("pack_d_corrected.js");

// === EVALUATION FUNCTIONS ===

function evaluateExplanationCorrect(item) {
    const ec = (item.ExplanationCorrect || "").trim();
    const cc = item.CorrectChoice;
    const stem = (item.Stem || "").trim();
    const findings = [];
    let score = 0; // max 20

    // 1. Length check (>= 100 chars for certification)
    if (ec.length < 50) { findings.push("EC_TOO_SHORT: " + ec.length + " chars (<50 minimum)"); score += 0; }
    else if (ec.length < 100) { findings.push("EC_SHORT: " + ec.length + " chars (<100 recommended for certification)"); score += 2; }
    else if (ec.length < 200) { score += 3; }
    else { score += 4; }

    // 2. Names COSO principle or accounting standard?
    const hasCOSO = /COSO/i.test(ec);
    const hasASC = /ASC\s?\d{3}/i.test(ec);
    const hasIAS = /IAS\s?\d+/i.test(ec);
    const hasIFRS = /IFRS/i.test(ec);
    const hasGAAP = /GAAP/i.test(ec);
    const hasIMA = /IMA/i.test(ec);
    const hasFASB = /FASB/i.test(ec);
    const hasStandard = hasCOSO || hasASC || hasIAS || hasIFRS || hasGAAP || hasIMA || hasFASB;
    if (hasStandard) { score += 4; }
    else { findings.push("EC_NO_STANDARD_REFERENCE: No COSO/ASC/IAS/GAAP/IMA/FASB citation"); score += 0; }

    // 3. Does it name a specific principle/rule?
    const hasPrinciple = /\b(principle|framework|component|element|standard|internal control|risk assessment|control environment|monitoring|information.*communication|control activit|segregation|preventive|detective|corrective)\b/i.test(ec);
    if (hasPrinciple) { score += 3; }
    else { findings.push("EC_NO_PRINCIPLE: Does not name a specific COSO/internal control principle"); score += 1; }

    // 4. Does it explain WHY the answer is correct (not just state it)?
    const whyPatterns = [/\bbecause\b/i, /\bthe reason\b/i, /\bthis is because\b/i, /\bunder\b/i, /\bper\b/i, /\baccording to\b/i, /\breflects\b/i, /\bdemonstrates\b/i, /\bthis means\b/i, /\btherefore\b/i, /\bconsequently\b/i, /\bthis ensures\b/i];
    const hasWhy = whyPatterns.some(p => p.test(ec));
    if (hasWhy) { score += 3; }
    else { findings.push("EC_NO_JUSTIFICATION: Does not explain why the answer is correct"); score += 1; }

    // 5. Business interpretation or practical application
    const hasBusiness = /\b(organization|company|business|firm|entity|management|manager|board|audit committee|controller|CFO|stakeholder|investor|practice|real.world|operational|strategic)\b/i.test(ec);
    if (hasBusiness) { score += 2; }
    else { findings.push("EC_NO_BUSINESS_CONTEXT: Missing business interpretation"); }

    // 6. Professional tone — check for disqualifying patterns
    const hasUncertain = /(I think|probably|maybe|could be|might be|possibly|not sure)/i.test(ec);
    if (hasUncertain) { findings.push("EC_UNCERTAIN_LANGUAGE: Contains hedging/uncertain language"); score -= 2; }
    
    // 7. Self-reference patterns
    const hasSelfRef = /(this answer|this choice|the correct answer|that choice|that option)/i.test(ec);
    if (hasSelfRef) { findings.push("EC_SELF_REFERENCE: Uses self-referential language"); score -= 1; }

    // 8. Instructional quality — does it TEACH?
    const teachPatterns = [/\bfor example\b/i, /\bin contrast\b/i, /\bcommon error\b/i, /\bremember\b/i, /\bnote that\b/i, /\bkey point\b/i, /\bimportant\b/i, /\bcandidate/i, /\bstudent/i];
    const teaches = teachPatterns.some(p => p.test(ec));
    if (teaches) { score += 2; }
    else { findings.push("EC_NO_TEACHING: Does not actively teach the concept"); score += 1; }

    // Clamp score
    score = Math.max(0, Math.min(20, score));

    return { score, findings, length: ec.length, hasStandard, hasPrinciple, hasWhy, hasBusiness };
}

function evaluateExplanationWrong(item, letter, choiceText) {
    const field = "ExplanationWrong" + letter;
    const ew = (item[field] || "").trim();
    const findings = [];
    let score = 0; // max 15

    if (ew === "") {
        return { score: 0, findings: ["EW_EMPTY: Field is empty — DL-026/025"], length: 0, quality: "EMPTY" };
    }

    // 1. Length check
    if (ew.length < 50) { findings.push("EW_SHORT: " + ew.length + " chars (<50)"); score += 1; }
    else if (ew.length < 100) { findings.push("EW_MODERATE: " + ew.length + " chars (<100 recommended)"); score += 2; }
    else { score += 3; }

    // 2. Does it identify WHY this specific choice is wrong?
    const hasWhyWrong = /\bwrong\b|\bincorrect\b|\bnot correct\b|\bmisleading\b|\bimproper\b/i.test(ew);
    if (hasWhyWrong) { score += 3; }
    else { findings.push("EW_NO_WHY_WRONG: Does not explain why this choice is wrong"); score += 1; }

    // 3. Does it describe a specific misconception?
    const hasMisconception = /\b(misconcep|misunderst|mistake|error|confus|misappl|fail to|overlook|incorrectly assumes|common.*error)\b/i.test(ew);
    if (hasMisconception) { score += 3; }
    else { findings.push("EW_NO_MISCONCEPTION: Does not identify the likely candidate misconception"); score += 1; }

    // 4. Is it choice-specific (not generic template)?
    const isGeneric = /\brepresents a plausible misconception\b/i.test(ew) || /\bcandidate may select this option by misapplying\b/i.test(ew) || /\bdoes not align with\b/i.test(ew) || /\bThe correct approach involves\b/i.test(ew) || /\bOption [A-D] is incorrect\.\s*$/i.test(ew);
    if (isGeneric) { findings.push("EW_GENERIC: Contains boilerplate/template language"); score += 0; }
    else { score += 3; }

    // 5. Instructional tone vs dismissive
    const isDismissive = /\bobviously\b|\bclearly wrong\b|\bsilly\b|\btrivial\b/i.test(ew);
    if (isDismissive) { findings.push("EW_DISMISSIVE: Uses dismissive language"); score -= 2; }
    else { score += 2; }

    // 6. Does it reference a principle/standard?
    const hasRef = /(COSO|ASC|IAS|IFRS|GAAP|FASB|IMA|standard|principle|framework|rule|guidance)\b/i.test(ew);
    if (hasRef) { score += 1; }

    score = Math.max(0, Math.min(15, score));

    return { score, findings, length: ew.length, quality: isGeneric ? "GENERIC_TEMPLATE" : (ew.length >= 50 ? "ADEQUATE" : "SHORT") };
}

function analyzeItem(qid, item) {
    const cc = item.CorrectChoice;
    const letters = ["A", "B", "C", "D"];
    const choices = item.Choices || {};

    // Evaluate ExplanationCorrect
    const ecEvaluation = evaluateExplanationCorrect(item);

    // Evaluate ExplanationWrong[A-D] for non-CC slots
    const ewEvaluations = {};
    let totalEWScore = 0;
    let ewCount = 0;

    for (const L of letters) {
        const field = "ExplanationWrong" + L;
        const val = item[field];
        const choiceText = choices[L] || "N/A";

        if (L === cc) {
            // CorrectChoice slot — should be empty
            const isEmpty = val === undefined || val === null || val === "";
            ewEvaluations[L] = {
                type: "CORRECT_CHOICE_SLOT",
                status: isEmpty ? "EMPTY_OK" : "DL_008_VIOLATION",
                value_preview: isEmpty ? "" : (val || "").substring(0, 80) + "..."
            };
        } else {
            // Distractor slot
            const eval_ = evaluateExplanationWrong(item, L, choiceText);
            ewEvaluations[L] = {
                type: "DISTRACTOR_SLOT",
                status: val === undefined || val === null ? "ABSENT_DL018" : (val === "" ? "EMPTY_DL026" : "NON_EMPTY"),
                value_preview: (val || "").substring(0, 120) + ((val && val.length > 120) ? "..." : ""),
                choice_text: choiceText,
                ...eval_
            };
            totalEWScore += eval_.score;
            ewCount++;
        }
    }

    // Overall verdict
    const avgEWScore = ewCount > 0 ? Math.round(totalEWScore / ewCount) : 0;
    let overallScore = ecEvaluation.score + totalEWScore;
    const maxPossible = 20 + (3 * 15); // EC max 20 + up to 3 EW slots max 15 each = 65

    let verdict;
    if (ecEvaluation.score < 8) {
        verdict = "FAIL";
    } else if (ecEvaluation.score < 12) {
        verdict = "HOLD";
    } else if (avgEWScore < 7) {
        verdict = "HOLD";
    } else if (ecEvaluation.findings.length > 0 || Object.values(ewEvaluations).some(e => e.findings && e.findings.length > 0)) {
        verdict = "PASS_WITH_NOTES";
    } else {
        verdict = "PASS";
    }

    // If missing distractor explanations is problematic
    const emptyDistractors = Object.entries(ewEvaluations).filter(([L, e]) => L !== cc && (e.status === "EMPTY_DL026" || e.status === "ABSENT_DL018"));
    const genericCount = Object.entries(ewEvaluations).filter(([L, e]) => L !== cc && e.quality === "GENERIC_TEMPLATE").length;

    if (emptyDistractors.length > 0) {
        verdict = "HOLD"; // Empty distractor slots block certification
    }
    if (genericCount >= 2) {
        verdict = (verdict === "PASS_WITH_NOTES" || verdict === "HOLD") ? "HOLD" : "HOLD";
    }

    return {
        qid,
        pack: qid.startsWith("P1-EC") ? "PackC" : "PackD",
        stem: (item.Stem || "N/A").substring(0, 200),
        topic: item.Topic || "N/A",
        cc,
        choices,
        question_state: item.question_state || "N/A",
        difficulty: item.Difficulty || "N/A",
        difficulty_score: item.DifficultyScore || "N/A",
        cognitive_level: item.CognitiveLevel || "N/A",
        explanation_correct: {
            text: (item.ExplanationCorrect || ""),
            ...ecEvaluation
        },
        explanation_wrong: ewEvaluations,
        empty_distractor_count: emptyDistractors.length,
        generic_distractor_count: genericCount,
        overall_score: overallScore,
        max_possible_score: maxPossible,
        avg_ew_score: avgEWScore,
        verdict,
        remediation_notes: [
            ...ecEvaluation.findings,
            ...Object.entries(ewEvaluations)
                .filter(([L, e]) => L !== cc && e.findings && e.findings.length > 0)
                .flatMap(([L, e]) => e.findings.map(f => `EW_${L}: ${f}`)),
            ...emptyDistractors.map(([L, e]) => `EW_${L}: ${e.status} — distractor explanation missing`),
        ]
    };
}

// Process all seeds
const results = [];
for (const qid of seedsC) {
    const item = packC[qid];
    if (item) results.push(analyzeItem(qid, item));
    else results.push({ qid, error: "NOT_FOUND in pack_c" });
}
for (const qid of seedsD) {
    const item = packD[qid];
    if (item) results.push(analyzeItem(qid, item));
    else results.push({ qid, error: "NOT_FOUND in pack_d" });
}

// Summary
const valid = results.filter(r => !r.error);
const verdictCounts = { PASS: 0, PASS_WITH_NOTES: 0, HOLD: 0, FAIL: 0 };
let totalECScore = 0, totalEWScore = 0;
let totalEmptyEWSlots = 0, totalGenericEW = 0;

for (const r of valid) {
    verdictCounts[r.verdict] = (verdictCounts[r.verdict] || 0) + 1;
    totalECScore += r.explanation_correct.score;
    const ewSlots = Object.entries(r.explanation_wrong).filter(([L, e]) => L !== r.cc);
    for (const [L, e] of ewSlots) {
        if (e.score !== undefined) totalEWScore += e.score;
    }
    totalEmptyEWSlots += r.empty_distractor_count;
    totalGenericEW += r.generic_distractor_count;
}

const summary = {
    total_seeds: results.length,
    found: valid.length,
    not_found: results.length - valid.length,
    verdict_distribution: verdictCounts,
    avg_ec_score: valid.length > 0 ? Math.round(totalECScore / valid.length * 10) / 10 : 0,
    avg_ew_slot_score: valid.length > 0 ? Math.round(totalEWScore / (valid.length * 3) * 10) / 10 : 0,
    total_empty_distractor_slots: totalEmptyEWSlots,
    total_generic_distractor_slots: totalGenericEW,
    question_states: {},
    sections: {
        packC_count: valid.filter(r => r.pack === "PackC").length,
        packD_count: valid.filter(r => r.pack === "PackD").length
    }
};

for (const r of valid) {
    summary.question_states[r.question_state] = (summary.question_states[r.question_state] || 0) + 1;
}

const report = { summary, items: results };

fs.writeFileSync("reports/SESSION809_EXPLANATION_REVIEW.json", JSON.stringify(report, null, 2), 'utf8');
console.log("Report written to reports/SESSION809_EXPLANATION_REVIEW.json");
console.log(JSON.stringify(summary, null, 2));
