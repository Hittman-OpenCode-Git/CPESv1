/**
 * parse_pack_b.js v2 — Working parser for pack_b_corrected.js
 * 
 * Fixes the backtick-n encoding in Sections B, C, F, then parses
 * all 500 question objects using boundary-aware object extraction.
 */

const fs = require("fs");

function parsePackB(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    // ============================================================
    // STEP 1: Fix backtick-n pattern
    // Pattern: "QuestionID": "P1B-{SEC}-{NUM}",`n    "question_state": "Certified",{NUM}: true,
    // Result:  "QuestionID": "P1B-{SEC}-{NUM}",
    //          "question_state": "Certified",
    // Add trailing comma after "question_state": "Certified" since we removed the ,{NUM}: true, part
    // ============================================================
    let fixCount = 0;
    content = content.replace(
        /("QuestionID":\s*"P1B-[BCF]-\d+"),`n\s+"question_state":\s*"([^"]+)",\d+:\s*true,/g,
        (match, qidPart, state) => {
            fixCount++;
            return qidPart + ',\n    "question_state": "' + state + '",';
        }
    );
    console.log(`[parse_pack_b] Fixed ${fixCount} backtick-n lines`);

    // ============================================================
    // STEP 2: Extract array content using string-aware bracket matcher
    // ============================================================
    const arrayStart = content.indexOf("const MCQ_BANK_B = [");
    if (arrayStart === -1) throw new Error("Array start not found");
    
    const arrContent = content.substring(arrayStart + 22); // skip "const MCQ_BANK_B = ["
    
    let braceDepth = 1;
    let inString = false;
    let stringChar = "";
    let escape = false;
    let arrayEnd = -1;
    
    for (let i = 0; i < arrContent.length; i++) {
        const ch = arrContent[i];
        if (escape) { escape = false; continue; }
        
        if (inString) {
            if (ch === '\\') { escape = true; continue; }
            if (ch === stringChar) { inString = false; stringChar = ""; }
            continue;
        }
        
        if (ch === '"' || ch === "'") {
            inString = true;
            stringChar = ch;
            continue;
        }
        
        if (ch === '[') braceDepth++;
        else if (ch === ']') {
            braceDepth--;
            if (braceDepth === 0) { arrayEnd = i; break; }
        }
    }
    
    if (arrayEnd === -1) throw new Error("Array end bracket not found");
    
    const arrayStr = arrContent.substring(0, arrayEnd + 1);
    console.log(`[parse_pack_b] Array string: ${arrayStr.length} chars`);
    
    // ============================================================
    // STEP 3: Extract individual objects using brace matching
    // ============================================================
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
            if (currentObjStart === -1) {
                currentObjStart = i;
            }
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
                    if (errors <= 5) {
                        console.log(`[parse_pack_b] Parse error near object ${objects.length}: ${e.message.substring(0, 120)}`);
                        // Show the problematic area
                        if (errors === 1) {
                            console.log(`  Context: ${objStr.substring(0, 150)}`);
                        }
                    }
                }
                currentObjStart = -1;
            }
        }
    }
    
    console.log(`[parse_pack_b] Parsed ${objects.length} objects, ${errors} errors`);
    
    if (errors > 0) {
        console.log(`[parse_pack_b] WARNING: ${errors} parse errors! Investigate before using results.`);
    }
    
    return objects;
}


// ============================================================
// MAIN
// ============================================================
if (require.main === module) {
    const args = process.argv.slice(2);
    const filePath = args[0] || "pack_b_corrected.js";
    
    console.log("=== Pack B Parser v2 ===\n");
    
    const questions = parsePackB(filePath);
    
    console.log(`\n=== Results ===`);
    console.log(`Total items: ${questions.length}`);
    
    // Section breakdown
    const secCount = {};
    questions.forEach(q => {
        const s = q.Section || "MISSING";
        secCount[s] = (secCount[s] || 0) + 1;
    });
    console.log("\nSection breakdown:");
    Object.keys(secCount).sort().forEach(s => {
        console.log(`  Section ${s}: ${secCount[s]}`);
    });
    
    // State breakdown
    const stateCount = {};
    questions.forEach(q => {
        const s = q.question_state || "MISSING";
        stateCount[s] = (stateCount[s] || 0) + 1;
    });
    console.log("\nState breakdown:");
    Object.keys(stateCount).sort().forEach(s => {
        console.log(`  ${s}: ${stateCount[s]}`);
    });
    
    // Verify: expected 75+100+100+75+75+75 = 500
    const expected = { A: 75, B: 100, C: 100, D: 75, E: 75, F: 75 };
    let allGood = true;
    Object.keys(expected).forEach(s => {
        const f = secCount[s] || 0;
        if (f !== expected[s]) {
            console.log(`  MISMATCH Section ${s}: expected ${expected[s]}, got ${f}`);
            allGood = false;
        }
    });
    console.log(allGood ? "\nSection counts: ALL MATCH" : "\nSection counts: MISMATCHES");
    console.log(questions.length === 500 ? "Total count 500: MATCH" : `Total count: ${questions.length}`);
    
    // Show sample from each section
    console.log("\n=== Sample from each section ===");
    const samples = {};
    questions.forEach(q => {
        const s = q.Section || "MISSING";
        if (!samples[s]) samples[s] = q;
    });
    Object.keys(samples).sort().forEach(s => {
        const q = samples[s];
        console.log(`\n--- Section ${s} ---`);
        console.log(`  QID: ${q.QuestionID}`);
        console.log(`  State: ${q.question_state || "MISSING"}`);
        console.log(`  CorrectChoice: ${q.CorrectChoice}`);
        console.log(`  Stem: ${(q.Stem || "").substring(0, 100)}`);
        if (q.Choices) {
            console.log(`  A: ${q.Choices.A ? q.Choices.A.substring(0, 60) : ''}`);
            console.log(`  B: ${q.Choices.B ? q.Choices.B.substring(0, 60) : ''}`);
            console.log(`  C: ${q.Choices.C ? q.Choices.C.substring(0, 60) : ''}`);
            console.log(`  D: ${q.Choices.D ? q.Choices.D.substring(0, 60) : ''}`);
        }
    });
}

module.exports = { parsePackB };
