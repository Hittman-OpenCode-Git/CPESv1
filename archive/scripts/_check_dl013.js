// Quick check: DL-013 status in Pack C and D
const fs = require("fs");

function checkPack(filename, label) {
    const content = fs.readFileSync(filename, "utf8");
    const hits = (content.match(/represents a plausible misconception/g) || []).length;
    console.log(`${label}: ${hits} DL-013 boilerplate hits`);
    
    // Section F only
    const lines = content.split("\n");
    let inSectionF = false;
    let sectionFItems = 0;
    let sectionFHits = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const sectionMatch = line.match(/"Section":\s*"F"/);
        if (sectionMatch) {
            inSectionF = true;
        }
        if (inSectionF && line.includes('"Section":')) {
            const sec = line.match(/"Section":\s*"([A-F])"/);
            if (sec && sec[1] !== "F") {
                inSectionF = false;
            }
        }
        if (inSectionF) {
            if (line.includes('"QuestionID":')) sectionFItems++;
            if (line.includes("represents a plausible misconception")) sectionFHits++;
        }
    }
    console.log(`  Section F: ${sectionFItems} items, ${sectionFHits} DL-013 hits`);
}

checkPack("pack_d_corrected.js", "Pack D");
checkPack("pack_c_corrected.js", "Pack C");
