const fs = require("fs");
const path = require("path");
const config = require("./config");
const CaseExtractor = require("./lib/CaseExtractor");
const gs = require("./lib/MetadataMigrator");

const CACHE_DIR = path.join(config.paths.output, "case_cache");

/**
 * Extracts original case data from a raw case object text.
 * This is a custom parser that only extracts the original fields
 * and ignores any broken metadata that was inserted.
 */
function extractOriginalFields(rawText) {
    const result = {
        CaseID: extractStr(rawText, "CaseID"),
        Title: extractStr(rawText, "Title"),
        SectionTags: extractArr(rawText, "SectionTags"),
        EstimatedMinutes: extractNum(rawText, "EstimatedMinutes"),
        ScenarioText: extractStr(rawText, "ScenarioText"),
        Exhibits: [],
        Items: []
    };

    return result;
}

function extractStr(text, key) {
    const patterns = [
        new RegExp(`${key}\\s*:\\s*'([^']+)'`),
        new RegExp(`"${key}"\\s*:\\s*'([^']+)'`),
        new RegExp(`${key}\\s*:\\s*"([^"]+)"`),
        new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`)
    ];
    for (const p of patterns) {
        const m = text.match(p);
        if (m) return m[1].replace(/\\'/g, "'").replace(/\\n/g, "\n");
    }
    return "";
}

function extractNum(text, key) {
    const patterns = [
        new RegExp(`${key}\\s*:\\s*(\\d+)`),
        new RegExp(`"${key}"\\s*:\\s*(\\d+)`)
    ];
    for (const p of patterns) {
        const m = text.match(p);
        if (m) return parseInt(m[1], 10);
    }
    return 0;
}

function extractArr(text, key) {
    const patterns = [
        new RegExp(`${key}\\s*:\\s*\\[([^\\]]+)\\]`),
        new RegExp(`"${key}"\\s*:\\s*\\[([^\\]]+)\\]`)
    ];
    for (const p of patterns) {
        const m = text.match(p);
        if (m) {
            // Extract string literals from the array
            const items = [];
            const strPattern = /'([^']+)'/g;
            let sm;
            while ((sm = strPattern.exec(m[1])) !== null) {
                items.push(sm[1]);
            }
            return items;
        }
    }
    return [];
}

/**
 * Reconstructs a case bank file from raw text.
 * Extracts original data, adds metadata, and rewrites.
 */
function reconstructFile(filePath) {
    const filename = path.basename(filePath);
    console.log(`\n=== ${filename} ===`);

    const content = fs.readFileSync(filePath, "utf8");

    // Find array boundaries
    const arrMatch = content.match(/(const\s+\w+\s*=\s*\[)/);
    if (!arrMatch) { console.log("No array pattern found"); return; }

    const arrStart = arrMatch.index + arrMatch[0].length - 1; // position of '['
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

    console.log("Array length:", arrayText.length);

    // Extract individual cases from the array text
    const cases = [];
    let scanPos = 0;
    let firstChar = true;

    while (scanPos < arrayText.length) {
        // Skip non-brace content (whitespace, commas before first case)
        while (scanPos < arrayText.length && arrayText[scanPos] !== "{") {
            scanPos++;
        }
        if (scanPos >= arrayText.length) break;

        // Find matching closing brace
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

        const rawCase = arrayText.substring(scanPos, objEnd);
        const original = extractOriginalFields(rawCase);

        if (original.CaseID) {
            original._raw = rawCase;
            cases.push(original);
            console.log(`  Found: ${original.CaseID} (Title: ${(original.Title || "").substring(0, 40)})`);
        }

        scanPos = objEnd;
    }

    console.log(`Total cases extracted: ${cases.length}`);

    // Now reconstruct the file
    const outputLines = [];
    outputLines.push(header.trimEnd());
    outputLines.push("");

    const indent = "  ";

    cases.forEach((c, idx) => {
        const comma = idx < cases.length - 1 ? "," : "";
        const meta = gs.deriveMetadata(c);

        outputLines.push(reconstructCase(c, meta, indent, comma));
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
 * Reconstructs a single case as a JS object literal string.
 */
function reconstructCase(original, meta, indent, comma) {
    const pad = indent;
    const p2 = pad + pad;
    const p3 = p2 + pad;
    const p4 = p3 + pad;
    const lines = [];

    lines.push(`${pad}{`);

    // 1. CaseID
    lines.push(`${p2}CaseID: '${esc(original.CaseID)}',`);

    // 2. Metadata fields
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

    // 3. Title
    lines.push(`${p2}Title: '${esc(original.Title)}',`);

    // 4. SectionTags
    const tags = (original.SectionTags || []).map(t => `'${t}'`).join(", ");
    lines.push(`${p2}SectionTags: [${tags}],`);

    // 5. EstimatedMinutes (already added in metadata above, but keeping original in the right position)
    // Skip - already added in metadata

    // 6. ScenarioText
    lines.push(`${p2}ScenarioText: '${esc(original.ScenarioText)}',`);

    // 7. Exhibits - extract from raw text
    const exRaw = extractSection(original._raw, "Exhibits", "Items");
    if (exRaw) {
        lines.push(``);
        lines.push(`${p2}Exhibits: [`);
        const exhibits = extractExhibitArray(exRaw);
        exhibits.forEach((ex, ei) => {
            const exComma = ei < exhibits.length - 1 ? "," : "";
            lines.push(`${p3}{`);
            lines.push(`${p4}ExhibitID: '${original.CaseID}-E${ei + 1}',`);
            Object.keys(ex).forEach((key, ki) => {
                const val = ex[key];
                if (key === "Headers" || key === "Rows") {
                    lines.push(`${p4}${key}: ${JSON.stringify(val)}${ki < Object.keys(ex).length - 1 ? "," : ""}`);
                } else if (typeof val === "string") {
                    lines.push(`${p4}${key}: '${esc(val)}'${ki < Object.keys(ex).length - 1 ? "," : ""}`);
                } else {
                    lines.push(`${p4}${key}: ${JSON.stringify(val)}${ki < Object.keys(ex).length - 1 ? "," : ""}`);
                }
            });
            lines.push(`${p3}}${exComma}`);
        });
        lines.push(`${p2}],`);
    } else {
        lines.push(`${p2}Exhibits: [],`);
    }

    // 8. Items - extract from raw text
    const itRaw = extractSection(original._raw, "Items");
    if (itRaw) {
        lines.push(``);
        lines.push(`${p2}Items: [`);
        const items = extractItemArray(itRaw);
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
                    if (/^[\d.,]+$/.test(cStr.replace(/,/g, ""))) {
                        lines.push(`${p4}Correct: ${cStr.replace(/,/g, "")},`);
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
        lines.push(`${p2}]` // no trailing comma
        );
    }

    lines.push(`${pad}}${comma}`);
    return lines.join("\n");
}

/**
 * Extracts a named section from raw case text.
 */
function extractSection(raw, sectionName, endSection) {
    const re = new RegExp(`${sectionName}\\s*:\\s*(\\[)`);
    const m = raw.match(re);
    if (!m) return null;

    const startPos = m.index + m[1].length;
    // Track bracket depth
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
    return raw.substring(startPos - 1, endPos); // include the opening [
}

/**
 * Extracts exhibit objects from raw Exhibits array text.
 */
function extractExhibitArray(raw) {
    const exhibits = [];
    if (!raw) return exhibits;

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

        const objText = raw.substring(objStart, objEnd);
        const ex = {};
        ex.Type = extractStr(objText, "Type") || extractStr2(objText, "Type");
        ex.Title = extractStr(objText, "Title") || extractStr2(objText, "Title");

        // Try Headers
        const hMatch = objText.match(/Headers\s*:\s*(\[[^\]]+\])/);
        if (hMatch) try { ex.Headers = JSON.parse(hMatch[1].replace(/'/g, '"')); } catch(e) {}

        // Try Rows
        const rMatch = objText.match(/Rows\s*:\s*(\[[\s\S]*?\](?=\s*[,\}]))/);
        if (rMatch) {
            try {
                const rText = rMatch[1].replace(/'/g, '"');
                ex.Rows = JSON.parse(rText);
            } catch(e) {}
        }

        // Try Body
        ex.Body = extractStr(objText, "Body") || extractStr2(objText, "Body");

        exhibits.push(ex);
        pos = objEnd;
    }

    return exhibits;
}

/**
 * Extracts item objects from raw Items array text.
 */
function extractItemArray(raw) {
    const items = [];
    if (!raw) return items;

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

        const objText = raw.substring(objStart, objEnd);
        const item = {};
        item.Type = extractStr(objText, "Type") || extractStr2(objText, "Type");
        item.Prompt = extractStr(objText, "Prompt") || extractStr2(objText, "Prompt");
        item.Explanation = extractStr(objText, "Explanation") || extractStr2(objText, "Explanation");
        item.Topic = extractStr(objText, "Topic") || extractStr2(objText, "Topic");

        // Correct value
        item.Correct = extractCorrect(objText);

        // Choices
        const cMatch = objText.match(/Choices\s*:\s*(\[[^\]]+\])/);
        if (cMatch) {
            try { item.Choices = JSON.parse(cMatch[1].replace(/'/g, '"')); } catch(e) {}
        }

        // LeftItems / RightItems
        const lMatch = objText.match(/LeftItems\s*:\s*(\[[^\]]+\])/);
        if (lMatch) {
            try { item.LeftItems = JSON.parse(lMatch[1].replace(/'/g, '"')); } catch(e) {}
        }
        const rMatch = objText.match(/RightItems\s*:\s*(\[[^\]]+\])/);
        if (rMatch) {
            try { item.RightItems = JSON.parse(rMatch[1].replace(/'/g, '"')); } catch(e) {}
        }

        items.push(item);
        pos = objEnd;
    }

    return items;
}

/**
 * Extracts the Correct value from an item text.
 */
function extractCorrect(text) {
    // Try array first (multi-select)
    const arrMatch = text.match(/Correct\s*:\s*(\[[^\]]+\])/);
    if (arrMatch) {
        try { return JSON.parse(arrMatch[1].replace(/'/g, '"')); } catch(e) {}
    }
    // Try object (match type)
    const objMatch = text.match(/Correct\s*:\s*(\{[\s\S]*?\})(?=\s*[,}\]])/);
    if (objMatch) {
        try { return JSON.parse(objMatch[1].replace(/'/g, '"')); } catch(e) {}
    }
    // Try number
    const numMatch = text.match(/Correct\s*:\s*(\d[\d,]*)/);
    if (numMatch) {
        return parseInt(numMatch[1].replace(/,/g, ""), 10);
    }
    // Try string
    const strMatch = text.match(/Correct\s*:\s*'([^']+)'/);
    if (strMatch) return strMatch[1];
    const strMatch2 = text.match(/Correct\s*:\s*"([^"]+)"/);
    if (strMatch2) return strMatch2[1];

    return undefined;
}

/**
 * Extracts string value from text using various key patterns.
 */
function extractStr2(text, key) {
    const p = new RegExp(`"${key}"\\s*:\\s*'([^']+)'`);
    const m = text.match(p);
    return m ? m[1] : undefined;
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
        reconstructFile(filePath);
    } else {
        console.log(`\n=== ${file} === NOT FOUND`);
    }
});

console.log("\n=== ALL FILES RECONSTRUCTED ===");
