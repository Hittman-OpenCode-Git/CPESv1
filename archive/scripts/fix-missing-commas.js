/**
 * Fixes missing commas after LearningObjectives arrays in case bank files.
 * The migration script inserted metadata without a trailing comma
 * after the LearningObjectives closing bracket.
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");

const root = config.paths.root;
const banks = config.caseBanks;

banks.forEach(file => {
    const filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) {
        console.log(`${file}: NOT FOUND`);
        return;
    }

    let content = fs.readFileSync(filePath, "utf8");
    const originalLength = content.length;

    // Fix 1: LearningObjectives ] followed directly by next property (no comma)
    // Pattern: closing bracket, whitespace, then property name
    // This handles both: ]    "Title": and ]    ScenarioText:
    content = content.replace(
        /\](\s{2,})(?:"(?:Title|ScenarioText|SectionTags)"|Title|ScenarioText|SectionTags)\s*:/g,
        "],\n      $&".replace(",      ", ",      ")
    );

    // Also fix closing bracket followed by newline then property
    content = content.replace(
        /\]\s*\n\s*(?:"(?:Title|ScenarioText|SectionTags)"|Title|ScenarioText|SectionTags)\s*:/g,
        "],\n      $&".replace(",      ", ",      ")
    );

    // Actually, let me use a simpler approach - just replace ] followed by whitespace and property
    // with ],\n followed by indentation and property
    content = content.replace(
        /\](\s+)(?:"(?:Title|ScenarioText|SectionTags)"|(?:Title|ScenarioText|SectionTags))\s*:/g,
        (match, ws, prop) => {
            // Determine indentation from the whitespace
            return `],\n      ${prop}:`;
        }
    );

    const fixed = content.length !== originalLength;
    if (fixed) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`${file}: Fixed (${content.length - originalLength} bytes changed)`);
    } else {
        console.log(`${file}: No changes needed`);
    }
});

console.log("Done.");
