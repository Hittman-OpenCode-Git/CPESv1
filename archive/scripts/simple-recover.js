/**
 * Simple recovery: removes broken metadata that was inserted between
 * CaseID: line and Title: line, restoring original case structure.
 * Also strips any corruption from the fix-missing-commas script.
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");

const root = config.paths.root;
const banks = config.caseBanks;

banks.forEach(file => {
    const filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) { console.log(`${file}: NOT FOUND`); return; }

    let content = fs.readFileSync(filePath, "utf8");
    const origLen = content.length;
    let changes = 0;

    // Fix 1: Remove broken metadata inserted between CaseID and Title
    // Pattern: After `CaseID: 'X'` or `"CaseID": "X"`, everything up to `Title:` or `"Title":`
    // But only the metadata we inserted (BlueprintDomain through LearningObjectives)

    // Remove from BlueprintDomain: line through LearningObjectives: [...] line
    // This handles both single and double quote formats

    // Pattern 1: BlueprintDomain: '...', through LearningObjectives: [...] (single quotes)
    content = content.replace(
        /,\n\s+BlueprintDomain: '[^']+',\n[\s\S]*?LearningObjectives:\s*\[[^\]]+\]/g,
        ","
    );

    // Pattern 2: "BlueprintDomain": "...", through "LearningObjectives": [...] (double quotes)
    content = content.replace(
        /,\n\s+"BlueprintDomain": "[^"]+",\n[\s\S]*?"LearningObjectives":\s*\[[^\]]+\]/g,
        ","
    );

    // Pattern 3: Handle the case where LearningObjectives array spans multiple lines with individual items
    content = content.replace(
        /,\n\s+BlueprintDomain: '[^']+',\n[\s\S]*?LearningObjectives:\s*\[[\s\S]*?\][\s\S]*?(?=Title|"Title")/g,
        ","
    );

    // Pattern 4: Double-quote version of multi-line
    content = content.replace(
        /,\n\s+"BlueprintDomain": "[^"]+",\n[\s\S]*?"LearningObjectives":\s*\[[\s\S]*?\][\s\S]*?(?=Title|"Title")/g,
        ","
    );

    // Fix 2: Remove any "undefined:" artifacts from fix-missing-commas.js
    content = content.replace(/\n\s*undefined:\s*/g, "\n");

    // Fix 3: Remove duplicate commas and traling whitespace
    content = content.replace(/,\s*,/g, ",");
    content = content.replace(/,\s*\n\s*,/g, ",\n");

    if (content.length !== origLen) {
        changes++;
    }

    if (changes > 0) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`${file}: Recovered (${origLen} → ${content.length} bytes)`);
    } else {
        console.log(`${file}: No changes needed`);
    }
});

console.log("Done.");
