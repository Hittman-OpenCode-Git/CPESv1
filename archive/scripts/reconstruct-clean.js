const fs = require("fs");
const path = require("path");
const config = require("./config");
const gs = require("./lib/MetadataMigrator");

/**
 * Cleans a case bank file by:
 * 1. Removing previously inserted bad metadata
 * 2. Re-adding proper metadata using the MetadataMigrator
 */
function cleanFile(filePath) {
    const filename = path.basename(filePath);
    console.log(`\n=== ${filename} ===`);

    let content = fs.readFileSync(filePath, "utf8");

    // Find array boundaries
    const arrMatch = content.match(/(const\s+\w+\s*=\s*\[)/);
    if (!arrMatch) { console.log("No array pattern found"); return; }

    const arrStart = arrMatch.index + arrMatch[0].length - 1;
    const header = content.substring(0, arrMatch.index);

    // Find array end
    let depth = 0, inStr = false, strChar = null, arrEnd = -1;
    for (let i = arrStart; i < content.length; i++) {
        const ch = content[i], prev = i > 0 ? content[i - 1] : "";
        if (inStr) {
            if (ch === strChar && prev !== "\\") { inStr = false; strChar = null; }
            continue;
        }
        if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strChar = ch; continue; }
        if (ch === "[") depth++;
        if (ch === "]") depth--;
        if (depth === 0) { arrEnd = i; break; }
    }
    if (arrEnd === -1) { console.log("Could not find array end"); return; }

    const arrayText = content.substring(arrStart, arrEnd + 1);
    const footer = content.substring(arrEnd + 1);

    // Extract individual case objects
    const caseTexts = [];
    let scanPos = 0;
    while (scanPos < arrayText.length) {
        while (scanPos < arrayText.length && arrayText[scanPos] !== "{") scanPos++;
        if (scanPos >= arrayText.length) break;

        let d = 0, inS = false, sC = null, objEnd = scanPos;
        for (let i = scanPos; i < arrayText.length; i++) {
            const ch = arrayText[i], prev = i > 0 ? arrayText[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "{") d++;
            if (ch === "}") d--;
            if (d === 0) { objEnd = i + 1; break; }
        }

        caseTexts.push(arrayText.substring(scanPos, objEnd));
        scanPos = objEnd;
    }

    console.log(`Found ${caseTexts.length} case objects`);

    // Process each case: strip bad metadata, then reconstruct
    const reconstructed = caseTexts.map((raw, idx) => {
        const original = extractCleanOriginal(raw, idx);
        if (!original.CaseID) {
            console.log(`  Case ${idx}: NO CaseID found, keeping raw`);
            return raw;
        }

        // Check if this case should have metadata (not a placeholder)
        const isPlaceholder = !original.ScenarioText || original.ScenarioText.length < 20;
        if (isPlaceholder) {
            console.log(`  ${original.CaseID}: Placeholder, keeping original without metadata`);
            return raw; // Return raw with bad metadata stripped
        }

        console.log(`  ${original.CaseID}: Reconstructing with metadata`);
        const meta = gs.deriveMetadata(original);
        return reconstructCase(original, meta);
    });

    // Rebuild file
    const outputLines = [header.trimEnd(), ""];
    const indent = "  ";

    reconstructed.forEach((caseText, idx) => {
        const comma = idx < reconstructed.length - 1 ? "," : "";
        if (caseText.trim().startsWith("{")) {
            // It's a raw text - clean it first if needed
            outputLines.push(caseText.trimEnd() + (caseText.trimEnd().endsWith(",") && !comma ? "" : comma));
        } else {
            outputLines.push(caseText + (comma ? "," : ""));
        }
    });

    if (footer.trim()) {
        outputLines.push("");
        outputLines.push(footer.trimEnd());
    }

    const newContent = outputLines.join("\n") + "\n";
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`Written: ${newContent.length} bytes`);
}

/**
 * Extracts only original fields from a case object text,
 * stripping out any previously inserted metadata.
 */
function extractCleanOriginal(rawText, idx) {
    const result = { _raw: rawText };

    // Try single-quoted and double-quoted patterns for each field
    const patterns = {
        CaseID: [/'([^']+)'/, /"([^"]+)"/],
        Title: [/'([^']+)'/, /"([^"]+)"/],
        ScenarioText: [/'((?:[^'\\]|\\.)*)'/, /"((?:[^"\\]|\\.)*)"/],
    };

    // Extract CaseID
    const cidMatch = rawText.match(/CaseID\s*:\s*'([^']+)'/) || rawText.match(/"CaseID"\s*:\s*"([^"]+)"/);
    result.CaseID = cidMatch ? cidMatch[1] : "";

    // Extract Title
    const titleMatch = rawText.match(/Title\s*:\s*'([^']+)'/) || rawText.match(/"Title"\s*:\s*"([^"]+)"/);
    result.Title = titleMatch ? titleMatch[1] : "";

    // Extract SectionTags
    const tagsMatch = rawText.match(/SectionTags\s*:\s*\[([^\]]+)\]/) || rawText.match(/"SectionTags"\s*:\s*\[([^\]]+)\]/);
    if (tagsMatch) {
        const tagStr = tagsMatch[1];
        const tags = [];
        const singleMatch = tagStr.match(/'([A-F])'/g);
        if (singleMatch) singleMatch.forEach(m => tags.push(m[1]));
        const doubleMatch = tagStr.match(/"([A-F])"/g);
        if (doubleMatch) doubleMatch.forEach(m => tags.push(m[1]));
        result.SectionTags = tags;
    } else {
        result.SectionTags = [];
    }

    // Extract EstimatedMinutes
    const emMatch = rawText.match(/EstimatedMinutes\s*:\s*(\d+)/);
    result.EstimatedMinutes = emMatch ? parseInt(emMatch[1], 10) : 30;

    // Extract ScenarioText
    const stMatch = rawText.match(/ScenarioText\s*:\s*'((?:[^'\\]|\\.)*)'/s) || rawText.match(/"ScenarioText"\s*:\s*"((?:[^"\\]|\\.)*)"/s);
    result.ScenarioText = stMatch ? stMatch[1].replace(/\\'/g, "'").replace(/\\n/g, "\n") : "";

    return result;
}

/**
 * Reconstructs a single case with proper metadata.
 */
function reconstructCase(original, meta) {
    const p2 = "    ";
    const p3 = p2 + "    ";
    const p4 = p3 + "    ";
    const lines = [];

    lines.push("  {");

    // CaseID first
    lines.push(`${p2}CaseID: '${esc(original.CaseID)}',`);

    // Metadata
    lines.push(`${p2}BlueprintDomain: '${esc(meta.BlueprintDomain)}',`);
    lines.push(`${p2}BlueprintObjectives: [${meta.BlueprintObjectives.slice(0, 5).map(o => `'${esc(o)}'`).join(", ")}],`);
    lines.push(`${p2}PrimaryCompetency: '${esc(meta.PrimaryCompetency)}',`);
    lines.push(`${p2}Difficulty: '${esc(meta.Difficulty)}',`);
    lines.push(`${p2}DifficultyScore: ${meta.DifficultyScore},`);
    lines.push(`${p2}EstimatedMinutes: ${original.EstimatedMinutes || 30},`);
    lines.push(`${p2}Industry: '${esc(meta.Industry)}',`);
    lines.push(`${p2}CompanyType: '${esc(meta.CompanyType)}',`);
    lines.push(`${p2}CompanyName: '${esc(meta.CompanyName)}',`);
    lines.push(`${p2}Stakeholder: '${esc(meta.Stakeholder)}',`);
    lines.push(`${p2}BusinessFunction: '${esc(meta.BusinessFunction)}',`);
    lines.push(`${p2}QuestionCount: ${meta.QuestionCount},`);
    lines.push(`${p2}ExhibitCount: ${meta.ExhibitCount},`);
    lines.push(`${p2}ProductionStatus: '${meta.ProductionStatus}',`);
    lines.push(`${p2}Version: '${meta.Version}',`);
    lines.push(`${p2}Tags: ${JSON.stringify(meta.Tags)},`);
    lines.push(`${p2}CreatedDate: '${meta.CreatedDate}',`);
    lines.push(`${p2}ModifiedDate: '${meta.ModifiedDate}',`);
    lines.push(`${p2}Author: '${meta.Author}',`);
    lines.push(`${p2}Reviewer: '${meta.Reviewer}',`);
    lines.push(`${p2}QAReviewer: '${meta.QAReviewer}',`);
    lines.push(`${p2}Confidence: ${meta.Confidence},`);
    lines.push(`${p2}RevisionHistory: [{Date: '${meta.RevisionHistory[0].Date}', Version: '${meta.RevisionHistory[0].Version}', Author: '${meta.RevisionHistory[0].Author}', Summary: '${esc(meta.RevisionHistory[0].Summary)}'}],`);
    lines.push(`${p2}Dependencies: ${JSON.stringify(meta.Dependencies)},`);
    const loItems = meta.LearningObjectives.slice(0, 6).map(o => `'${esc(o)}'`).join(", ");
    lines.push(`${p2}LearningObjectives: [${loItems}],`);

    // Title
    lines.push(`${p2}Title: '${esc(original.Title)}',`);

    // SectionTags
    const tags = (original.SectionTags || []).map(t => `'${t}'`).join(", ");
    lines.push(`${p2}SectionTags: [${tags}],`);

    // ScenarioText
    lines.push(`${p2}ScenarioText: '${esc(original.ScenarioText)}',`);

    // Exhibits - extract from raw
    const exRaw = extractRawSection(original._raw, "Exhibits");
    if (exRaw) {
        lines.push(``);
        lines.push(`${p2}Exhibits: [`);
        const exhibits = parseRawArray(exRaw);
        exhibits.forEach((ex, ei) => {
            const exComma = ei < exhibits.length - 1 ? "," : "";
            lines.push(`${p3}{`);
            const exKeys = Object.keys(ex);
            exKeys.forEach((key, ki) => {
                const val = ex[key];
                const trailing = ki < exKeys.length - 1 ? "," : "";
                if (key === "Type" || key === "Title" || key === "Body") {
                    lines.push(`${p4}${key}: '${esc(String(val))}'${trailing}`);
                } else {
                    lines.push(`${p4}${key}: ${JSON.stringify(val)}${trailing}`);
                }
            });
            lines.push(`${p3}}${exComma}`);
        });
        lines.push(`${p2}],`);
    } else {
        lines.push(`${p2}Exhibits: [],`);
    }

    // Items - extract from raw
    const itRaw = extractRawSection(original._raw, "Items");
    if (itRaw) {
        lines.push(``);
        lines.push(`${p2}Items: [`);
        const items = parseRawArray(itRaw);
        items.forEach((item, ii) => {
            const itemComma = ii < items.length - 1 ? "," : "";
            const typeMap = { "numeric": "Apply", "select": "Analyze", "multi": "Evaluate", "fill": "Understand", "match": "Synthesize" };
            const cognitive = typeMap[item.Type] || "Apply";

            lines.push(`${p3}{`);
            lines.push(`${p4}ItemID: '${original.CaseID}-Q${ii + 1}',`);
            lines.push(`${p4}Type: '${item.Type}',`);
            lines.push(`${p4}CognitiveLevel: '${cognitive}',`);
            if (item.Type === "numeric") {
                lines.push(`${p4}CalculationRequired: true,`);
            }
            if (item.Prompt !== undefined) {
                lines.push(`${p4}Prompt: '${esc(String(item.Prompt))}',`);
            }
            if (item.Correct !== undefined) {
                if (Array.isArray(item.Correct)) {
                    lines.push(`${p4}Correct: ${JSON.stringify(item.Correct)},`);
                } else if (typeof item.Correct === "object" && item.Correct !== null) {
                    lines.push(`${p4}Correct: ${JSON.stringify(item.Correct)},`);
                } else {
                    const cStr = String(item.Correct);
                    if (/^\d+$/.test(cStr)) {
                        lines.push(`${p4}Correct: ${cStr},`);
                    } else {
                        lines.push(`${p4}Correct: '${esc(cStr)}',`);
                    }
                }
            }
            if (item.Explanation !== undefined) {
                lines.push(`${p4}Explanation: '${esc(String(item.Explanation))}',`);
            }
            if (item.Topic !== undefined) {
                lines.push(`${p4}Topic: '${esc(item.Topic)}',`);
            }
            if (item.Choices && Array.isArray(item.Choices)) {
                lines.push(`${p4}Choices: ${JSON.stringify(item.Choices)},`);
            }
            if (item.LeftItems && Array.isArray(item.LeftItems)) {
                lines.push(`${p4}LeftItems: ${JSON.stringify(item.LeftItems)},`);
            }
            if (item.RightItems && Array.isArray(item.RightItems)) {
                lines.push(`${p4}RightItems: ${JSON.stringify(item.RightItems)}`);
            }
            lines.push(`${p3}}${itemComma}`);
        });
        lines.push(`${p2}]`);
    }

    lines.push("  }");
    return lines.join("\n");
}

/**
 * Extracts a named section (Exhibits, Items) as raw text from case object text.
 * Handles nested brackets and strings.
 */
function extractRawSection(raw, sectionName) {
    const re = new RegExp(`(?:${sectionName}|"${sectionName}")\\s*:\\s*(\\[)`);
    const m = raw.match(re);
    if (!m) return null;

    const startPos = m.index + m[0].indexOf("[");
    let depth = 0, inS = false, sC = null, endPos = -1;

    for (let i = startPos; i < raw.length; i++) {
        const ch = raw[i], prev = i > 0 ? raw[i - 1] : "";
        if (inS) {
            if (ch === sC && prev !== "\\") { inS = false; sC = null; }
            continue;
        }
        if (ch === '"' || ch === "'") { inS = true; sC = ch; continue; }
        if (ch === "[") depth++;
        if (ch === "]") depth--;
        if (depth === 0) { endPos = i + 1; break; }
    }

    if (endPos === -1) return null;
    return raw.substring(startPos, endPos);
}

/**
 * Parses a [...] array of {...} objects from raw text.
 */
function parseRawArray(raw) {
    const results = [];
    let pos = 0;

    while (pos < raw.length) {
        const objStart = raw.indexOf("{", pos);
        if (objStart === -1) break;

        let depth = 0, inS = false, sC = null, objEnd = objStart;
        for (let i = objStart; i < raw.length; i++) {
            const ch = raw[i], prev = i > 0 ? raw[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'") { inS = true; sC = ch; continue; }
            if (ch === "{") depth++;
            if (ch === "}") depth--;
            if (depth === 0) { objEnd = i + 1; break; }
        }

        results.push(parseRawObject(raw.substring(objStart, objEnd)));
        pos = objEnd;
    }

    return results;
}

/**
 * Parses an individual {...} object from raw text, extracting key-value pairs.
 */
function parseRawObject(text) {
    const obj = {};
    // Find all key: value pairs (simplified)
    const pairRe = /([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*/g;
    let match;

    while ((match = pairRe.exec(text)) !== null) {
        const key = match[1];
        // Skip common non-field keys
        if (key === "Type" || key === "Title" || key === "Body" || key === "Prompt" ||
            key === "Explanation" || key === "Topic" || key === "Correct" ||
            key === "Choices" || key === "Headers" || key === "Rows" ||
            key === "LeftItems" || key === "RightItems") {

            const valStart = match.index + match[0].length;
            const rest = text.substring(valStart);

            if (rest[0] === "'" || rest[0] === '"') {
                const quote = rest[0];
                let valEnd = 1;
                while (valEnd < rest.length) {
                    if (rest[valEnd] === "\\") { valEnd += 2; continue; }
                    if (rest[valEnd] === quote) break;
                    valEnd++;
                }
                obj[key] = rest.substring(1, valEnd);
            } else if (rest[0] === "[") {
                let arrDepth = 0, arrEnd = 0;
                for (let i = 0; i < rest.length; i++) {
                    if (rest[i] === "[") arrDepth++;
                    if (rest[i] === "]") arrDepth--;
                    if (arrDepth === 0) { arrEnd = i + 1; break; }
                }
                try {
                    obj[key] = JSON.parse(rest.substring(0, arrEnd).replace(/'/g, '"'));
                } catch(e) {}
            } else if (rest[0] === "{") {
                // Skip nested objects for now (Correct for match)
                let objDepth = 0, objEnd2 = 0;
                for (let i = 0; i < rest.length; i++) {
                    if (rest[i] === "{") objDepth++;
                    if (rest[i] === "}") objDepth--;
                    if (objDepth === 0) { objEnd2 = i + 1; break; }
                }
                try {
                    obj[key] = JSON.parse(rest.substring(0, objEnd2).replace(/'/g, '"'));
                } catch(e) {}
            } else {
                // Number
                const numMatch = rest.match(/^(\d[\d,]*)/);
                if (numMatch) {
                    obj[key] = parseInt(numMatch[1].replace(/,/g, ""), 10);
                }
            }
        }
    }

    return obj;
}

function esc(s) {
    if (typeof s !== "string") return String(s || "");
    return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
}

// MAIN
const root = config.paths.root;
const banks = config.caseBanks;

banks.forEach(file => {
    const filePath = path.join(root, file);
    if (fs.existsSync(filePath)) {
        cleanFile(filePath);
    } else {
        console.log(`\n=== ${file} === NOT FOUND`);
    }
});

console.log("\n=== DONE ===");
