/**
 * Recovery v2: Reads corrupted files, extracts case sections,
 * adds opening braces, removes numeric key artifacts, and rebuilds.
 * Uses CaseExtractor for robust JSON parsing.
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");
const CaseExtractor = require("./lib/CaseExtractor");
const gs = require("./lib/MetadataMigrator");

function escStr(s) {
    if (typeof s !== "string") return String(s || "");
    return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
}
function escObj(o) { return JSON.stringify(o); }

function recover(file) {
    const filePath = path.join(config.paths.root, file);
    if (!fs.existsSync(filePath)) { console.log(`${file}: NOT FOUND`); return false; }

    const content = fs.readFileSync(filePath, "utf8");
    console.log(`\n=== ${file} (${content.length} bytes) ===`);

    // Find where case data starts (after line 5 artifacts)
    const lines = content.split("\n");
    let dataStart = -1;

    // Find the first line that looks like case data (has field: value pattern)
    // Skip lines 1-5 (comments and artifacts)
    for (let i = 5; i < lines.length; i++) {
        const line = lines[i];
        // Look for lines starting with a number followed by colon (the corrupted Title)
        if (/^\s*\d+:\s/.test(line)) {
            dataStart = i;
            break;
        }
        // Also look for "SectionTags" or "Title" or ScenarioText
        if (/SectionTags|"Title"|ScenarioText/.test(line) && !line.trim().startsWith("//")) {
            dataStart = i;
            break;
        }
    }

    if (dataStart === -1) {
        console.log("Could not find data start");
        return false;
    }

    console.log(`Data starts at line ${dataStart + 1}: ${lines[dataStart].substring(0, 80)}`);

    // Find where data ends (before function definitions or end of file)
    let dataEnd = lines.length;
    for (let i = dataStart; i < lines.length; i++) {
        if (lines[i].includes("function cloneEnhancedCase") ||
            lines[i].includes("const ENHANCED_CASE_BANK") ||
            lines[i].includes("module.exports")) {
            dataEnd = i + 1; // Include this line... wait, don't include it
            dataEnd = i; // Don't include the line itself
            break;
        }
    }

    // Extract case sections by finding matching braces
    // The file doesn't have opening { for each case, but does have closing }
    // We need to: find each case boundary and wrap in {}

    // Strategy: Find CaseID references to identify case boundaries
    // Each case section ends with a `}` line followed by a blank or comma line

    // First, let's find the end of each case (closing })
    const caseSections = [];
    let sectionLines = [];
    let braceDepth = 0;
    let inSection = false;

    // We need to track { } depth to find case boundaries
    // Add a virtual { at the start
    for (let i = dataStart; i < dataEnd; i++) {
        const line = lines[i];
        
        if (!inSection) {
            // Start a new section when we see data
            inSection = true;
            sectionLines = []; // Start fresh
            braceDepth = 0;
        }

        sectionLines.push(line);

        // Count braces (but not in strings)
        for (let j = 0; j < line.length; j++) {
            const ch = line[j];
            if (ch === '"' || ch === "'") {
                const quote = ch;
                j++;
                while (j < line.length) {
                    if (line[j] === '\\') { j += 2; continue; }
                    if (line[j] === quote) break;
                    j++;
                }
                continue;
            }
            if (ch === "{") braceDepth++;
            if (ch === "}") braceDepth--;
        }

        if (braceDepth === 0 && sectionLines.length > 0) {
            // End of a case
            caseSections.push(sectionLines);
            inSection = false;
            sectionLines = [];
        }
    }

    // If there's an unclosed section, add it
    if (sectionLines.length > 0) {
        caseSections.push(sectionLines);
    }

    console.log(`Found ${caseSections.length} case sections`);

    // Process each case section
    const origCases = [];

    caseSections.forEach((lines, idx) => {
        // Join lines and add opening brace
        let text = lines.join("\n");

        // The section might already have a { at some point (from exhibits/items)
        // or might not. Let's just try wrapping it.
        text = "{\n" + text + "\n}";

        // Remove the numeric key artifacts: `NNNN: "value"` → keep the value, try to identify field
        // For Packs 2-5, the first numeric key is the Title
        // For Pack 1, the first numeric key is the ScenarioText (Title was lost entirely)

        // Replace `NNNN: "value"` (numeric key) - but only at the start of a case (not inside exhibits)
        // Find text that starts with { followed by newline + spaces + number + colon
        text = text.replace(/^\{[\s\S]*?^\s*(\d+):\s*/m, (match) => {
            // Just remove the number: at the start; we'll handle field identification later
            return match.replace(/^\s*\d+:\s*/, (m2) => m2.replace(/^\s*\d+:\s*/, ""));
        });

        // Actually, let me try replacing the first numeric key specifically
        // Find: `\s{2,}NUMBER: "VALUE"` and replace with just the value part
        text = text.replace(/^(\s*)\d+:\s*/, "$1");

        // Now try to parse with CaseExtractor
        // The text is now "{\n    [first field]\n...}"
        // But we need to handle both single and double quote formats
        // For Pack 1, the format is single-quoted JS
        // For Packs 2-5, the format is double-quoted JSON

        // Try JSON parsing first
        // For double-quoted format: convert the text to valid JSON
        // It might already be JSON-like if it's double-quoted

        let orig;
        try {
            // Try as JSON
            orig = JSON.parse(text);
        } catch (e) {
            // Try with CaseExtractor
            const cExtract = CaseExtractor.normalizeToJSON(text);
            try {
                orig = JSON.parse(cExtract);
            } catch (e2) {
                // Manual extraction
                orig = extractManual(text, idx);
            }
        }

        if (orig && orig.CaseID) {
            console.log(`  ${idx}: ${orig.CaseID}`);
            origCases.push(orig);
        } else if (orig && (orig.SectionTags || orig.ScenarioText)) {
            // CaseID might be missing - extract it
            const cid = findCaseID(text, lines);
            if (cid) {
                orig.CaseID = cid;
                console.log(`  ${idx}: ${cid}`);
                origCases.push(orig);
            } else {
                console.log(`  ${idx}: NO CaseID found, content: ${text.substring(0, 200)}`);
            }
        } else {
            console.log(`  ${idx}: FAILED, content: ${text.substring(0, 300)}`);
        }
    });

    if (origCases.length === 0) {
        console.log("No cases recovered!");
        return false;
    }

    console.log(`\nRecovered ${origCases.length} cases. Rebuilding...`);

    // Build the file
    const typeMap = { "numeric": "Apply", "select": "Analyze", "multi": "Evaluate", "fill": "Understand", "match": "Synthesize" };
    const packName = file.match(/scored_cases(\d*)\.js/);
    const packNum = packName ? packName[1] : "";
    const packLabel = packNum ? `Pack ${packNum}` : "Pack 1";

    const output = [];
    output.push(`// Enhanced 2026-style CMA Part 1 case simulations - ${packLabel}`);
    output.push("// These cases are original study content and are not official IMA or Prometric material.");
    output.push("");
    output.push(`const ENHANCED_CASE_BASE${packNum} = [`);
    output.push("");

    let gsCount = 0, phCount = 0;

    origCases.forEach((orig, idx) => {
        const comma = idx < origCases.length - 1 ? "," : "";
        const isPH = !orig.ScenarioText || orig.ScenarioText.length < 20 ||
            (orig.ScenarioText || "").toLowerCase().includes("placeholder");

        if (isPH) {
            phCount++;
            const lines = [`  {`];
            lines.push(`    CaseID: '${escStr(orig.CaseID)}',`);
            lines.push(`    Title: '${escStr(orig.Title || "")}',`);
            const tags = (orig.SectionTags || []).map(t => `'${t}'`).join(", ");
            lines.push(`    SectionTags: [${tags}],`);
            lines.push(`    EstimatedMinutes: ${orig.EstimatedMinutes || 30},`);
            lines.push(`    ScenarioText: '${escStr(orig.ScenarioText || "")}',`);
            lines.push(``);
            lines.push(`    Exhibits: ${JSON.stringify(orig.Exhibits || [])},`);
            lines.push(``);
            lines.push(`    Items: ${JSON.stringify(orig.Items || [])}`);
            lines.push(`  }`);
            output.push(lines.join("\n") + (comma ? "," : ""));
        } else {
            gsCount++;
            const meta = gs.deriveMetadata(orig);
            const lines = [`  {`];
            lines.push(`    CaseID: '${escStr(orig.CaseID)}',`);
            lines.push(`    BlueprintDomain: '${escStr(meta.BlueprintDomain)}',`);
            lines.push(`    BlueprintObjectives: [${meta.BlueprintObjectives.slice(0, 5).map(o => `'${escStr(o)}'`).join(", ")}],`);
            lines.push(`    PrimaryCompetency: '${escStr(meta.PrimaryCompetency)}',`);
            lines.push(`    Difficulty: '${escStr(meta.Difficulty)}',`);
            lines.push(`    DifficultyScore: ${meta.DifficultyScore},`);
            lines.push(`    EstimatedMinutes: ${orig.EstimatedMinutes || 30},`);
            lines.push(`    Industry: '${escStr(meta.Industry)}',`);
            lines.push(`    CompanyType: '${escStr(meta.CompanyType)}',`);
            lines.push(`    CompanyName: '${escStr(meta.CompanyName)}',`);
            lines.push(`    Stakeholder: '${escStr(meta.Stakeholder)}',`);
            lines.push(`    BusinessFunction: '${escStr(meta.BusinessFunction)}',`);
            lines.push(`    QuestionCount: ${meta.QuestionCount},`);
            lines.push(`    ExhibitCount: ${meta.ExhibitCount},`);
            lines.push(`    ProductionStatus: '${meta.ProductionStatus}',`);
            lines.push(`    Version: '${meta.Version}',`);
            lines.push(`    Tags: ${escObj(meta.Tags)},`);
            lines.push(`    CreatedDate: '${meta.CreatedDate}',`);
            lines.push(`    ModifiedDate: '${meta.ModifiedDate}',`);
            lines.push(`    Author: '${meta.Author}',`);
            lines.push(`    Reviewer: '${meta.Reviewer}',`);
            lines.push(`    QAReviewer: '${meta.QAReviewer}',`);
            lines.push(`    Confidence: ${meta.Confidence},`);
            lines.push(`    RevisionHistory: [{Date: '${meta.RevisionHistory[0].Date}', Version: '${meta.RevisionHistory[0].Version}', Author: '${meta.RevisionHistory[0].Author}', Summary: '${escStr(meta.RevisionHistory[0].Summary)}'}],`);
            lines.push(`    Dependencies: ${escObj(meta.Dependencies)},`);
            const loItems = meta.LearningObjectives.slice(0, 6).map(o => `'${escStr(o)}'`).join(", ");
            lines.push(`    LearningObjectives: [${loItems}],`);
            lines.push(`    Title: '${escStr(orig.Title || "")}',`);
            const tags = (orig.SectionTags || []).map(t => `'${t}'`).join(", ");
            lines.push(`    SectionTags: [${tags}],`);
            lines.push(`    ScenarioText: '${escStr(orig.ScenarioText || "")}',`);
            lines.push(``);
            lines.push(`    Exhibits: [`);

            (orig.Exhibits || []).forEach((ex, ei) => {
                const ec = ei < (orig.Exhibits || []).length - 1 ? "," : "";
                lines.push(`      {`);
                lines.push(`        ExhibitID: '${orig.CaseID}-E${ei + 1}',`);
                ["Type", "Title", "Body", "Headers", "Rows"].forEach(k => {
                    const v = ex[k];
                    if (v === undefined) return;
                    const tr = k !== "Headers" && k !== "Rows" ? "," : "";
                    if (typeof v === "string") lines.push(`        ${k}: '${escStr(v)}'${tr}`);
                    else if (Array.isArray(v)) lines.push(`        ${k}: ${escObj(v)}${tr}`);
                });
                lines.push(`      }${ec}`);
            });
            lines.push(`    ],`);
            lines.push(``);
            lines.push(`    Items: [`);

            (orig.Items || []).forEach((item, ii) => {
                const ic = ii < (orig.Items || []).length - 1 ? "," : "";
                const cognitive = typeMap[item.Type] || "Apply";
                lines.push(`      {`);
                lines.push(`        ItemID: '${orig.CaseID}-Q${ii + 1}',`);
                lines.push(`        Type: '${item.Type}',`);
                lines.push(`        CognitiveLevel: '${cognitive}',`);
                if (item.Type === "numeric") lines.push(`        CalculationRequired: true,`);
                if (item.Prompt) lines.push(`        Prompt: '${escStr(item.Prompt)}',`);
                if (item.Correct !== undefined) {
                    if (Array.isArray(item.Correct)) lines.push(`        Correct: ${escObj(item.Correct)},`);
                    else if (typeof item.Correct === "object" && item.Correct !== null) lines.push(`        Correct: ${escObj(item.Correct)},`);
                    else if (/^\d+$/.test(String(item.Correct))) lines.push(`        Correct: ${item.Correct},`);
                    else lines.push(`        Correct: '${escStr(String(item.Correct))}',`);
                }
                if (item.Explanation) lines.push(`        Explanation: '${escStr(item.Explanation)}',`);
                if (item.Topic) lines.push(`        Topic: '${escStr(item.Topic)}',`);
                if (item.Choices && Array.isArray(item.Choices)) lines.push(`        Choices: ${escObj(item.Choices)},`);
                if (item.LeftItems && Array.isArray(item.LeftItems)) lines.push(`        LeftItems: ${escObj(item.LeftItems)},`);
                if (item.RightItems && Array.isArray(item.RightItems)) lines.push(`        RightItems: ${escObj(item.RightItems)}`);
                lines.push(`      }${ic}`);
            });
            lines.push(`    ]`);
            lines.push(`  }`);
            output.push(lines.join("\n") + (comma ? "," : ""));
        }
    });

    output.push("");
    output.push("];");

    // Add the original file's footer (functions, bank definitions)
    // Find in the original file
    const origContent = fs.readFileSync(filePath, "utf8");
    const origLines = origContent.split("\n");
    const footerLines = [];
    let inFooter = false;
    for (let i = origLines.length - 1; i >= 0; i--) {
        if (origLines[i].includes("function cloneEnhancedCase") ||
            origLines[i].includes("const ENHANCED_CASE_BANK") ||
            origLines[i].includes("module.exports")) {
            inFooter = true;
        }
        if (inFooter) {
            footerLines.unshift(origLines[i]);
        }
    }
    if (footerLines.length > 0) {
        output.push("");
        output.push(footerLines.join("\n"));
    }

    const newContent = output.join("\n") + "\n";
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`${file}: ${gsCount} GS + ${phCount} PH = ${origCases.length} total`);
    console.log(`Written: ${newContent.length} bytes`);
    return true;
}

function extractManual(text, idx) {
    const obj = {};
    obj.CaseID = extractValue(text, "CaseID");
    obj.Title = extractValue(text, "Title");
    obj.ScenarioText = extractValue(text, "ScenarioText");
    obj.EstimatedMinutes = extractNum(text, "EstimatedMinutes");
    obj.SectionTags = extractTags(text);
    obj.Exhibits = extractArray(text, "Exhibits");
    obj.Items = extractArray(text, "Items");
    return obj;
}

function extractValue(text, key) {
    const p1 = text.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    if (p1) return p1[1].replace(/\\"/g, '"').replace(/\\n/g, "\n");
    const p2 = text.match(new RegExp(`${key}\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
    if (p2) return p2[1].replace(/\\'/g, "'").replace(/\\n/g, "\n");
    return "";
}

function extractNum(text, key) {
    const m = text.match(new RegExp(`"${key}"\\s*:\\s*(\\d+)`));
    if (m) return parseInt(m[1], 10);
    const m2 = text.match(new RegExp(`${key}\\s*:\\s*(\\d+)`));
    if (m2) return parseInt(m2[1], 10);
    return 30;
}

function extractTags(text) {
    const m = text.match(/"SectionTags"\s*:\s*\[([^\]]+)\]/);
    if (m) {
        const vals = m[1].match(/"(\w)"/g);
        return vals ? vals.map(t => t[1]) : [];
    }
    const m2 = text.match(/SectionTags\s*:\s*\[([^\]]+)\]/);
    if (m2) {
        const vals = m2[1].match(/'(\w)'/g);
        return vals ? vals.map(t => t[1]) : [];
    }
    return [];
}

function extractArray(text, key) {
    const re = new RegExp(`"${key}"\\s*:\\s*(\\[)`);
    const m = text.match(re);
    if (!m) {
        const m2 = text.match(new RegExp(`${key}\\s*:\\s*(\\[)`));
        if (!m2) return [];
        // Hack: parse the array from rest of text
        const start = m2.index + m2[0].length - 1;
        let d = 0, inS = false, sC = null, end = -1;
        for (let i = start; i < text.length; i++) {
            const ch = text[i], prev = i > 0 ? text[i - 1] : "";
            if (inS) { if (ch === sC && prev !== "\\") { inS = false; sC = null; } continue; }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "[") d++;
            if (ch === "]") d--;
            if (d === 0) { end = i + 1; break; }
        }
        if (end === -1) return [];
        try {
            let raw = text.substring(start, end);
            raw = raw.replace(/'/g, '"');
            return JSON.parse(raw);
        } catch (e) { return []; }
    }

    const start = m.index + m[0].length - 1;
    let depth = 0, inS = false, sC = null, end = -1;
    for (let i = start; i < text.length; i++) {
        const ch = text[i], prev = i > 0 ? text[i - 1] : "";
        if (inS) { if (ch === sC && prev !== "\\") { inS = false; sC = null; } continue; }
        if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
        if (ch === "[") d++;
        if (ch === "]") d--;
        if (d === 0) { end = i + 1; break; }
    }
    if (end === -1) return [];
    try {
        return JSON.parse(text.substring(start, end));
    } catch (e) { return []; }
}

function findCaseID(text, lines) {
    // Search in lines for CaseID
    for (const line of lines) {
        const m = line.match(/"CaseID"\s*:\s*"([^"]+)"/);
        if (m) return m[1];
        const m2 = line.match(/CaseID\s*:\s*'([^']+)'/);
        if (m2) return m2[1];
    }
    return null;
}

// MAIN
const banks = config.caseBanks;
let ok = true;
banks.forEach(f => { if (!recover(f)) ok = false; });
console.log(ok ? "\n=== ALL DONE ===" : "\n=== ERRORS ===");
