// Final DL-013 verification across Packs C and D
const fs = require("fs");

function checkPack(filename, label) {
    const content = fs.readFileSync(filename, "utf8");
    const totalHits = (content.match(/represents a plausible misconception/g) || []).length;
    console.log(`${label} total DL-013 hits: ${totalHits}`);
    
    // Per-section breakdown
    let currentSection = "";
    let sectionHits = {};
    
    // Find section boundaries using QID patterns
    const lines = content.split("\n");
    for (const line of lines) {
        const secMatch = line.match(/"Section":\s*"([A-F])"/);
        if (secMatch) {
            currentSection = secMatch[1];
            if (!sectionHits[currentSection]) sectionHits[currentSection] = 0;
        }
        if (line.includes("represents a plausible misconception")) {
            if (currentSection) {
                sectionHits[currentSection] = (sectionHits[currentSection] || 0) + 1;
            }
        }
    }
    
    console.log("  By section:");
    Object.keys(sectionHits).sort().forEach(s => {
        const marker = sectionHits[s] === 0 ? "✓ CLEAN" : "✗ " + sectionHits[s] + " hits";
        console.log(`    Section ${s}: ${marker}`);
    });
    
    console.log("");
}

checkPack("pack_d_corrected.js", "Pack D");
checkPack("pack_c_corrected.js", "Pack C");
checkPack("pack_a_corrected.js", "Pack A");

// Also verify QuestionID counts
["pack_a_corrected.js","pack_b_corrected.js","pack_c_corrected.js","pack_d_corrected.js","pack_e_corrected.js"].forEach(f => {
    const c = fs.readFileSync(f, "utf8");
    const qids = (c.match(/"QuestionID":/g) || []).length;
    console.log(`${f}: ${qids} QuestionIDs`);
});
