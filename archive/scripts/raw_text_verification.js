/**
 * raw_text_verification.js
 * Direct regex-based scan of raw file text — no object parsing.
 * Authoritative because it doesn't depend on JavaScript parsing.
 */

const fs = require("fs");

// ================================================================
// DL-008: Non-empty ExplanationWrong[CorrectChoice]
// Uses boundary-aware block scanning (QuestionID to QuestionID)
// Then extracts CorrectChoice letter + checks corresponding ExplanationWrong field
// ================================================================
function scanDL008(filePath, label) {
    const content = fs.readFileSync(filePath, "utf8");
    
    // Find all QuestionID positions
    const qidPattern = /"QuestionID"\s*:\s*"(P1-[A-F]+-\d+)"/g;
    const qidPositions = [];
    let m;
    while ((m = qidPattern.exec(content)) !== null) {
        qidPositions.push({ qid: m[1], pos: m.index, end: m.index + m[0].length });
    }
    
    console.log(`\n  ${label}: Found ${qidPositions.length} QuestionIDs`);
    
    let violations = [];
    
    for (let i = 0; i < qidPositions.length; i++) {
        const qid = qidPositions[i].qid;
        const blockStart = qidPositions[i].pos;
        const blockEnd = i < qidPositions.length - 1 ? qidPositions[i + 1].pos : content.length;
        const block = content.substring(blockStart, blockEnd);
        
        // Extract CorrectChoice from either format:
        // "CorrectChoice": "B" (flat) or within the object
        let cc = null;
        const ccMatch = block.match(/"CorrectChoice"\s*:\s*"([A-D])"/);
        if (ccMatch) cc = ccMatch[1];
        
        if (!cc || !["A","B","C","D"].includes(cc)) continue;
        
        // Check ExplanationWrong[cc] in the block
        // Pattern: "ExplanationWrongX": "content"  where X is the correct letter
        const fieldName = "ExplanationWrong" + cc;
        const fieldPattern = new RegExp('"' + fieldName + '"\\s*:\\s*"');
        const fieldMatch = block.match(fieldPattern);
        
        if (fieldMatch) {
            // Extract the value after the field name
            const afterField = block.substring(fieldMatch.index + fieldMatch[0].length);
            // Find where the string value ends (closing quote, not escaped)
            let valEnd = -1;
            for (let j = 0; j < afterField.length; j++) {
                if (afterField[j] === '"') {
                    valEnd = j;
                    break;
                }
                if (afterField[j] === '\\') j++; // skip escaped char
            }
            
            if (valEnd > 0) {
                // Non-empty value
                const val = afterField.substring(0, valEnd);
                if (val.trim().length > 0) {
                    violations.push({
                        QID: qid,
                        field: fieldName,
                        valLength: val.length,
                        valPreview: val.substring(0, 80)
                    });
                }
            }
        }
    }
    
    console.log(`  DL-008 violations: ${violations.length}`);
    if (violations.length > 0) {
        violations.forEach(v => {
            console.log(`    ${v.QID}: ${v.field} non-empty (${v.valLength} chars): "${v.valPreview}..."`);
        });
    }
    
    return violations;
}

// ================================================================
// DL-013: Boilerplate text in Section F
// ================================================================
function scanDL013SectionF(filePath, label) {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    
    // Find Section F boundaries using QID patterns
    let qidLineIndices = [];
    lines.forEach((line, i) => {
        const m = line.match(/"QuestionID"\s*:\s*"(P1-[A-F]+-\d+)"/);
        if (m) qidLineIndices.push({ line: i, qid: m[1] });
    });
    
    // Find Section F items by QID pattern (P1-[FC]{1,2}- for Pack C/D)
    // Pack C: P1-FC-* or P1-F-* depending on section
    // For Pack C: Section F items have QID pattern "P1-FC-" 
    // For Pack D: Section F items have QID pattern "P1-FD-"
    
    let sectionFItems = qidLineIndices.filter(q => {
        if (label.includes("Pack C")) return q.qid.startsWith("P1-FC-");
        if (label.includes("Pack D")) return q.qid.startsWith("P1-FD-");
        return false;
    });
    
    console.log(`\n  ${label}: Section F items identified: ${sectionFItems.length}`);
    
    // Check each Section F item's block for DL-013 boilerplate
    let dl013Hits = [];
    
    for (let i = 0; i < sectionFItems.length; i++) {
        const item = sectionFItems[i];
        const blockStart = item.line;
        const blockEnd = i < sectionFItems.length - 1 ? sectionFItems[i + 1].line : lines.length;
        const block = lines.slice(blockStart, blockEnd).join("\n");
        
        const bpCount = (block.match(/represents a plausible misconception/g) || []).length;
        if (bpCount > 0) {
            dl013Hits.push({ qid: item.qid, hits: bpCount });
        }
    }
    
    console.log(`  Section F DL-013 hits: ${dl013Hits.length} items, ${dl013Hits.reduce((s,v)=>s+v.hits,0)} field occurrences`);
    if (dl013Hits.length > 0) {
        dl013Hits.forEach(h => console.log(`    ${h.qid}: ${h.hits} fields`));
    }
    
    return dl013Hits;
}

// ================================================================
// MAIN
// ================================================================
console.log("=== RAW-TEXT FILE-STATE VERIFICATION ===\n");

// Agent 1: DL-008
console.log("--- AGENT 1: DL-008 Verification (raw text scan) ---");
const dl008_c = scanDL008("pack_c_corrected.js", "Pack C");
const dl008_d = scanDL008("pack_d_corrected.js", "Pack D");
console.log(`\nDL-008 Summary: ${dl008_c.length} in Pack C + ${dl008_d.length} in Pack D = ${dl008_c.length + dl008_d.length} total`);

// Agent 2: DL-013 Section F
console.log("\n--- AGENT 2: DL-013 Section F Verification (raw text scan) ---");
const dl013_c = scanDL013SectionF("pack_c_corrected.js", "Pack C");
const dl013_d = scanDL013SectionF("pack_d_corrected.js", "Pack D");
const dl013CFTotal = dl013_c.reduce((s, v) => s + v.hits, 0);
const dl013DFTotal = dl013_d.reduce((s, v) => s + v.hits, 0);
console.log(`\nDL-013 Section F Summary: ${dl013CFTotal} fields in Pack C + ${dl013DFTotal} fields in Pack D`);

// Final verdict
console.log("\n=== FINAL VERDICT ===");
const totalDL008 = dl008_c.length + dl008_d.length;
const totalDL013 = dl013CFTotal + dl013DFTotal;

if (totalDL008 === 0 && totalDL013 === 0) {
    console.log("NO COLLISION — both remediation efforts survived intact across all items.");
    console.log("All files on disk reflect the cumulative correct state.");
} else {
    console.log("COLLISION DETECTED:");
    if (totalDL008 > 0) console.log(`  DL-008 regressions: ${totalDL008} items across Pack C+D`);
    if (totalDL013 > 0) console.log(`  DL-013 Section F regressions: ${totalDL013} fields`);
}

// Per-section DL-013 breakdown for reference
console.log("\n=== Full File DL-013 Distribution (for reference) ===");
["pack_c_corrected.js","pack_d_corrected.js"].forEach(f => {
    const c = fs.readFileSync(f, "utf8");
    const total = (c.match(/represents a plausible misconception/g) || []).length;
    console.log(`  ${f}: ${total} occurrences`);
});
