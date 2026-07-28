const fs = require("fs");
const path = require("path");

const base = "C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026";
const packs = ["pack_a_corrected.js", "pack_b_corrected.js", "pack_c_corrected.js", "pack_d_corrected.js", "pack_e_corrected.js"];

const results = {};

for (const packFile of packs) {
    const filePath = path.join(base, packFile);
    const code = fs.readFileSync(filePath, "utf8");
    const varName = "MCQ_BANK_" + packFile.charAt(5).toUpperCase();
    const obj = new Function(code + "; return " + varName + ";")();
    
    const items = [];
    for (const q of obj) {
        items.push({
            qid: q.QuestionID || null,
            difficulty: q.Difficulty || null,
            difficultyScore: q.DifficultyScore != null ? q.DifficultyScore : null,
            cognitiveLevel: q.CognitiveLevel || null,
            question_state: q.question_state || null,
            section: q.Section || null,
            topic: q.Topic || null
        });
    }
    results[packFile] = items;
}

fs.writeFileSync(path.join(base, "reports", "s722a_distribution_raw.json"), JSON.stringify(results, null, 2));
console.log("Extraction complete. Items per pack:");
for (const [k, v] of Object.entries(results)) {
    console.log(`  ${k}: ${v.length} items`);
}
