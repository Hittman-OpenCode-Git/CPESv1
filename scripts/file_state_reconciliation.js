/**
 * file_state_reconciliation.js
 * Full verification of Pack C and Pack D current disk state.
 * Checks:
 *   1. DL-008: non-empty ExplanationWrong[CorrectChoice] in Pack C + D
 *   2. DL-013: boilerplate text in Pack C Section F + Pack D Section F
 *   3. QuestionID count integrity
 * Does NOT write anything — read-only.
 */

const fs = require("fs");

// ================================================================
// UTILITY: Parse pack files using string-aware object extraction
// ================================================================
function parsePack(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const varMatch = content.match(/const\s+MCQ_BANK_\w+\s*=\s*\[/);
    if (!varMatch) {
        console.log(`  ERROR: Could not find MCQ_BANK array in ${filePath}`);
        return [];
    }
    
    const arrContent = content.substring(varMatch.index + varMatch[0].length - 1);
    
    // String-aware brace matcher
    let braceDepth = 0;
    let inString = false;
    let stringChar = "";
    let escape = false;
    let arrayEnd = -1;
    
    for (let i = 1; i < arrContent.length; i++) {
        const ch = arrContent[i];
        if (escape) { escape = false; continue; }
        if (inString) {
            if (ch === '\\') { escape = true; continue; }
            if (ch === stringChar) { inString = false; stringChar = ""; }
            continue;
        }
        if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
        if (ch === '[') braceDepth++;
        else if (ch === ']') {
            braceDepth--;
            if (braceDepth === -1) { arrayEnd = i; break; }
        }
    }
    
    // Now the actual array content starts at arrContent[1] (after the leading '[')
    const arrayStr = arrContent.substring(1, arrayEnd);
    
    // Extract individual objects
    const objects = [];
    let objDepth = 0;
    let currentObjStart = -1;
    inString = false;
    stringChar = "";
    escape = false;
    let errors = 0;
    
    for (let i = 0; i < arrayStr.length; i++) {
        const ch = arrayStr[i];
        if (escape) { escape = false; continue; }
        if (inString) {
            if (ch === '\\') { escape = true; continue; }
            if (ch === stringChar) { inString = false; stringChar = ""; }
            continue;
        }
        if (ch === '"') { inString = true; stringChar = '"'; continue; }
        
        if (ch === '{') {
            objDepth++;
            if (currentObjStart === -1) { currentObjStart = i; }
            continue;
        }
        
        if (ch === '}') {
            objDepth--;
            if (objDepth === 0 && currentObjStart >= 0) {
                const objStr = arrayStr.substring(currentObjStart, i + 1);
                try {
                    const fn = new Function("return " + objStr);
                    const obj = fn();
                    objects.push(obj);
                } catch (e) {
                    errors++;
                }
                currentObjStart = -1;
            }
        }
    }
    
    return { objects, errors };
}

// ================================================================
// CHECK 1: DL-008 — non-empty ExplanationWrong[CorrectChoice]
// ================================================================
function checkDL008(label, filePath) {
    console.log(`\n=== ${label} DL-008 Check ===`);
    const { objects, errors } = parsePack(filePath);
    
    if (errors > 0) {
        console.log(`  WARNING: ${errors} parse errors`);
    }
    console.log(`  Parsed: ${objects.length} items`);
    
    let dl008Violations = [];
    objects.forEach((q, idx) => {
        const cc = q.CorrectChoice;
        if (!cc) return;
        
        ["A", "B", "C", "D"].forEach(letter => {
            const field = "ExplanationWrong" + letter;
            const val = q[field] || "";
            if (letter === cc && val.trim().length > 0) {
                dl008Violations.push({
                    QID: q.QuestionID || `index_${idx}`,
                    Section: q.Section || "?",
                    field,
                    valLength: val.length,
                    valPreview: val.substring(0, 100)
                });
            }
        });
    });
    
    console.log(`  DL-008 violations: ${dl008Violations.length}`);
    if (dl008Violations.length > 0) {
        console.log(`  !!! REGRESSION DETECTED !!!`);
        dl008Violations.sort((a, b) => a.QID.localeCompare(b.QID));
        dl008Violations.forEach(v => {
            console.log(`    ${v.QID} (${v.Section}): ${v.field} non-empty (${v.valLength} chars): "${v.valPreview}..."`);
        });
    }
    
    return dl008Violations;
}

// ================================================================
// CHECK 2: DL-013 — boilerplate in Section F only
// ================================================================
function checkDL013SectionF(label, filePath, sectionFQIDPattern) {
    console.log(`\n=== ${label} DL-013 Section F Check ===`);
    const content = fs.readFileSync(filePath, "utf8");
    
    // Count all DL-013 hits in the file
    const totalHits = (content.match(/represents a plausible misconception/g) || []).length;
    console.log(`  Total DL-013 hits in file: ${totalHits}`);
    
    // Split into lines and locate Section F region
    const lines = content.split("\n");
    let inSectionF = false;
    let sectionFItems = 0;
    let sectionFHits = 0;
    let hitItems = [];
    
    let currentQID = "";
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Track QID
        const qidMatch = line.match(/"QuestionID":\s*"(P1-[FC]{1,2}-\d+)"/);
        if (qidMatch) currentQID = qidMatch[1];
        
        // Track section
        const secMatch = line.match(/"Section":\s*"F"/);
        if (secMatch) inSectionF = true;
        
        // Detect section transition out of F
        if (inSectionF && qidMatch) {
            const qidParts = qidMatch[1].match(/P1-([A-F]+)-/);
            if (qidParts && !qidParts[1].includes("F")) {
                // Hit a non-F section QID while in F region
                inSectionF = false;
            }
        }
        
        if (inSectionF) {
            if (line.includes('"QuestionID":')) sectionFItems++;
            if (line.includes("represents a plausible misconception")) {
                sectionFHits++;
                if (currentQID) hitItems.push(currentQID);
            }
        }
    }
    
    console.log(`  Section F items: ${sectionFItems}`);
    console.log(`  Section F DL-013 hits: ${sectionFHits}`);
    
    if (sectionFHits > 0) {
        console.log(`  !!! REGRESSION DETECTED !!!`);
        // Deduplicate
        const unique = [...new Set(hitItems)].sort();
        unique.forEach(qid => console.log(`    ${qid}`));
    }
    
    return { sectionFItems, sectionFHits, hitItems: [...new Set(hitItems)] };
}

// ================================================================
// MAIN
// ================================================================
console.log("=== FILE-STATE RECONCILIATION ===");
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log("");

// Agent 1: DL-008 in Pack C + D
const dl008_c = checkDL008("Pack C", "pack_c_corrected.js");
const dl008_d = checkDL008("Pack D", "pack_d_corrected.js");
const totalDL008 = dl008_c.length + dl008_d.length;
console.log(`\n=== DL-008 Summary: ${totalDL008} violations across Pack C+D ===`);

// Agent 2: DL-013 in Pack C Section F + Pack D Section F
const dl013_f_c = checkDL013SectionF("Pack C", "pack_c_corrected.js");
const dl013_f_d = checkDL013SectionF("Pack D", "pack_d_corrected.js");
console.log(`\n=== DL-013 Section F Summary ===`);
console.log(`  Pack C Section F: ${dl013_f_c.sectionFHits} hits`);
console.log(`  Pack D Section F: ${dl013_f_d.sectionFHits} hits`);

// Also verify: QuestionID counts
console.log(`\n=== QuestionID Integrity ===`);
["pack_a_corrected.js","pack_b_corrected.js","pack_c_corrected.js","pack_d_corrected.js","pack_e_corrected.js"].forEach(f => {
    const c = fs.readFileSync(f, "utf8");
    const count = (c.match(/"QuestionID":/g) || []).length;
    console.log(`  ${f}: ${count} QIDs (expected 500)`);
    if (count !== 500) console.log(`    !!! MISMATCH !!!`);
});

// Also: check for "A candidate may select" (other DL-013 pattern)
console.log(`\n=== DL-013 Pattern: "A candidate may select this option" ===`);
["pack_c_corrected.js","pack_d_corrected.js"].forEach(f => {
    const c = fs.readFileSync(f, "utf8");
    const hits = (c.match(/A candidate may select this option by misapplying/g) || []).length;
    const hitsCF = c.match(/represents a plausible misconception[\s\S]*?A candidate may select this option by misapplying/g) || [];
    console.log(`  ${f}: ${hits} occurrences ("represent...misapplying" pairs: ${hitsCF.length})`);
});

console.log(`\n=== RECONCILIATION COMPLETE ===`);
console.log(`\nVerdict (preliminary):`);
if (totalDL008 === 0 && dl013_f_c.sectionFHits === 0 && dl013_f_d.sectionFHits === 0) {
    console.log("  NO COLLISION — both remediation efforts survived intact.");
    console.log("  DL-008 in Pack C: 0 violations");
    console.log("  DL-008 in Pack D: 0 violations");
    console.log("  DL-013 in Pack C Section F: 0 hits");
    console.log("  DL-013 in Pack D Section F: 0 hits");
} else {
    console.log("  COLLISION DETECTED — see above for affected items.");
    if (totalDL008 > 0) console.log(`  DL-008 regressions: ${totalDL008} items`);
    if (dl013_f_c.sectionFHits > 0) console.log(`  DL-013 Pack C Section F regressions: ${dl013_f_c.sectionFHits} hits`);
    if (dl013_f_d.sectionFHits > 0) console.log(`  DL-013 Pack D Section F regressions: ${dl013_f_d.sectionFHits} hits`);
}
