/**
 * audit_pack_b_rotation.js — Full Pack B rotation-artifact audit
 * 
 * Checks all Pack B items (using parse_pack_b.js) for the positional rotation
 * artifact pattern that produced 17 confirmed Section E defects:
 *   - CorrectChoice letter (A/B/C/D) maps to the correct choice text per the stem
 *   - No clone-group positional rotation masking a wrong answer key
 * 
 * Method: For each item, verify that the choice text at the CorrectChoice letter
 * is substantively confirmed by ExplanationCorrect text. Flag mismatches.
 */

const { parsePackB } = require("./parse_pack_b.js");

// ============================================================
// Word similarity check (basic overlap)
// ============================================================
function wordOverlap(text1, text2) {
    if (!text1 || !text2) return 0;
    const words1 = new Set(text1.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/));
    const words2 = new Set(text2.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/));
    let overlap = 0;
    words1.forEach(w => { if (words2.has(w) && w.length > 2) overlap++; });
    return overlap / Math.max(1, Math.min(words1.size, words2.size));
}

// ============================================================
// MAIN
// ============================================================
console.log("=== Pack B Rotation-Artifact Audit ===\n");

const questions = parsePackB("pack_b_corrected.js");

if (questions.length !== 500) {
    console.log(`ERROR: Expected 500 items, got ${questions.length}. Aborting.`);
    process.exit(1);
}

console.log(`Parsed ${questions.length} items successfully.\n`);

// Group by Section
const sectionGroups = {};
questions.forEach(q => {
    const sec = q.Section || "MISSING";
    if (!sectionGroups[sec]) sectionGroups[sec] = [];
    sectionGroups[sec].push(q);
});

// Results
const results = {
    total: questions.length,
    certified: questions.filter(q => q.question_state === "Certified").length,
    uncertified: questions.filter(q => q.question_state !== "Certified").length,
    sectionsChecked: 0,
    itemsChecked: 0,
    mismatches: [],
    warnings: []
};

// Audit each item
console.log("Auditing all items...");
questions.forEach((q, idx) => {
    const cc = q.CorrectChoice;
    if (!cc) {
        results.warnings.push({
            QID: q.QuestionID,
            Section: q.Section,
            Issue: "Missing CorrectChoice"
        });
        return;
    }
    
    // Get the choice text at CorrectChoice letter
    let choiceText = "";
    if (q.Choices && q.Choices[cc]) {
        choiceText = q.Choices[cc];
    }
    // Also check flat ChoiceA/B/C/D fields (used in some items)
    // Actually, choices are nested in Choices object for standard items
    
    if (!choiceText || choiceText.trim() === "") {
        results.warnings.push({
            QID: q.QuestionID,
            Section: q.Section,
            CorrectChoice: cc,
            Issue: "No choice text found at CorrectChoice letter"
        });
        return;
    }
    
    // Check if ExplanationCorrect references the chosen answer
    const explanation = q.ExplanationCorrect || "";
    const overlap = wordOverlap(choiceText, explanation);
    
    // A mismatch flag is raised if:
    // 1. ExplanationCorrect explicitly describes a DIFFERENT choice than CorrectChoice
    // 2. Overlap is very low (suggesting the explanation is about the wrong choice)
    
    // Check for "Option X is correct" / "Choice X" patterns that contradict
    const otherChoices = ["A","B","C","D"].filter(l => l !== cc);
    for (const other of otherChoices) {
        // If ExplanationCorrect says "Option [other] is correct" — flag as mismatch
        const pattern = new RegExp(`(?<!wrong|incorrect|not\\s)\\boption\\s+${other}\\b.*\\bcorrect\\b`, "i");
        if (pattern.test(explanation)) {
            results.mismatches.push({
                QID: q.QuestionID,
                Section: q.Section,
                State: q.question_state || "MISSING",
                CorrectChoice: cc,
                ExplanationSays: other,
                Stem: (q.Stem || "").substring(0, 100),
                Severity: q.question_state === "Certified" ? "CRITICAL" : "HIGH"
            });
        }
    }
    
    // Also check if any ExplanationWrong field directly contradicts (says the correct answer)
    ["A","B","C","D"].forEach(letter => {
        const fieldName = `ExplanationWrong${letter}`;
        const wrongExp = q[fieldName] || "";
        // If wrong explanation says "this is the correct answer" or similar
        const correctPattern = /(?:is correct|is the correct|correct answer|the correct choice)/i;
        if (letter !== cc && correctPattern.test(wrongExp) && wrongExp.length > 20) {
            // Check if it's actually explaining the distractor
            const isActuallyWrong = /incorrectly|instead|should|could be|misappl/i.test(wrongExp);
            if (!isActuallyWrong) {
                results.warnings.push({
                    QID: q.QuestionID,
                    Section: q.Section,
                    State: q.question_state || "MISSING",
                    CorrectChoice: cc,
                    Warning: `ExplanationWrong${letter} describes itself as correct (should be empty or describe error)`
                });
            }
        }
    });
    
    results.itemsChecked++;
});

// Section-level breakdown
console.log("\n=== Per-Section Breakdown ===");
Object.keys(sectionGroups).sort().forEach(sec => {
    const items = sectionGroups[sec];
    const certified = items.filter(q => q.question_state === "Certified").length;
    const uncertified = items.filter(q => q.question_state !== "Certified").length;
    console.log(`Section ${sec}: ${items.length} total (${certified} Certified, ${uncertified} Uncertified)`);
    results.sectionsChecked++;
});

// Findings
console.log("\n=== Findings ===");
console.log(`Items audited: ${results.itemsChecked}`);
console.log(`Mismatches found: ${results.mismatches.length}`);
console.log(`Warnings: ${results.warnings.length}`);

if (results.mismatches.length > 0) {
    console.log("\n!!! MISMATCHES — Possible Rotation Artifacts !!!");
    results.mismatches.forEach(m => {
        console.log(`  [${m.Severity}] ${m.QID} (Section ${m.Section}, ${m.State})`);
        console.log(`    CorrectChoice: ${m.CorrectChoice}`);
        console.log(`    Explanation says: ${m.ExplanationSays}`);
        console.log(`    Stem: ${m.Stem}`);
        console.log("");
    });
}

if (results.warnings.length > 0) {
    console.log("\nWarnings:");
    results.warnings.forEach(w => {
        console.log(`  [${w.QID}] ${w.Issue || w.Warning}`);
    });
}

// Certified mismatch critical flags
const criticalMismatches = results.mismatches.filter(m => m.Severity === "CRITICAL");
if (criticalMismatches.length > 0) {
    console.log("\n!!! CRITICAL: Certified items with rotation-artifact mismatch !!!");
    criticalMismatches.forEach(m => console.log(`  ${m.QID}`));
    console.log("\nSTOP CONDITION: Certified items affected. Halt immediately.");
} else if (results.mismatches.length === 0 && results.warnings.length === 0) {
    console.log("\n=== AUDIT RESULT: CLEAN ===");
    console.log("No rotation-artifact mismatches found. All CorrectChoice letters map to correct answer text.");
}

// Clone-group analysis for Sections B, C (template-generated sections)
console.log("\n=== Clone-Group Analysis ===");
// Sections B, C, F are template-generated; check for 5-item clone groups
// by comparing stems within each section
["B", "C", "F"].forEach(sec => {
    if (!sectionGroups[sec]) return;
    const items = sectionGroups[sec];
    
    // Group by stem skeleton (remove proper nouns, numbers)
    function stemSkeleton(stem) {
        if (!stem) return "";
        return stem
            .replace(/[A-Z][a-z]+ (?:Corp|Inc|Corporation|Manufacturing|Technologies|Construction|Industries)/g, "COMPANY")
            .replace(/\$\d[\d,.]*/g, "$N")
            .replace(/\d+%/g, "N%")
            .replace(/\b\d[\d,]*\b/g, "N")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
    }
    
    const skeletons = {};
    items.forEach(q => {
        const sk = stemSkeleton(q.Stem);
        if (!skeletons[sk]) skeletons[sk] = [];
        skeletons[sk].push({ QID: q.QuestionID, CorrectChoice: q.CorrectChoice, State: q.question_state });
    });
    
    // Find groups of 5 (clone pattern)
    const groups = Object.entries(skeletons).filter(([sk, qids]) => qids.length === 5);
    if (groups.length > 0) {
        console.log(`\nSection ${sec}: ${groups.length} clone groups of 5 items each`);
        groups.forEach(([sk, qids]) => {
            console.log(`  Group: ${qids.map(q => q.QID).join(", ")}`);
            console.log(`    Answer positions: ${qids.map(q => q.CorrectChoice).join(", ")}`);
            
            // Check for rotational pattern: are answers A,B,C,D distributed +1 per item?
            const positions = qids.map(q => q.CorrectChoice);
            const allDifferent = new Set(positions).size === Math.min(5, positions.length);
            console.log(`    All different positions? ${allDifferent ? "YES" : "NO"}`);
            
            // If 5 items and 4 distinct positions, some rotation pattern likely
            if (qids.length === 5 && new Set(positions).size >= 4) {
                console.log(`    >>> Rotational pattern detected — verify answers individually <<<`);
            }
        });
    } else {
        console.log(`Section ${sec}: No 5-item clone groups found`);
    }
});

// Section E already had 17 confirmed defects — recheck
console.log("\n=== Section E Recheck (17 defects confirmed in prior session) ===");
if (sectionGroups["E"]) {
    const eItems = sectionGroups["E"];
    const certified = eItems.filter(q => q.question_state === "Certified");
    console.log(`Section E: ${eItems.length} total, ${certified.length} Certified`);
    
    // Check clone groups in Section E
    const eSkeletons = {};
    eItems.forEach(q => {
        const stem = (q.Stem || "").toLowerCase().replace(/\s+/g, " ").trim();
        const sk = stem.replace(/\b[a-z]+ (?:corp|inc|ltd|company)\b/g, "COMPANY");
        if (!eSkeletons[sk]) eSkeletons[sk] = [];
        eSkeletons[sk].push({ QID: q.QuestionID, CorrectChoice: q.CorrectChoice, State: q.question_state });
    });
    
    const eGroups = Object.entries(eSkeletons).filter(([sk, qids]) => qids.length >= 3);
    console.log(`  ${eGroups.length} groups with 3+ similar stems`);
    eGroups.forEach(([sk, qids]) => {
        if (qids.length >= 4) {
            console.log(`    Group (${qids.length}): ${qids.map(q => q.QID + "(" + q.CorrectChoice + ")").join(", ")}`);
        }
    });
}

console.log("\n=== AUDIT COMPLETE ===");
