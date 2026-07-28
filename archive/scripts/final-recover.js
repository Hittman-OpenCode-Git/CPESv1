/**
 * Final recovery: The recover script wrote back files with empty arrays
 * and all case content pushed into the "footer" section.
 * This script extracts cases from the footer and rebuilds properly.
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");
const gs = require("./lib/MetadataMigrator");

function escStr(s) {
    if (typeof s !== "string") return String(s || "");
    return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
}
function escObj(o) { return JSON.stringify(o); }

function recover(filePath) {
    const filename = path.basename(filePath);
    console.log(`\n=== ${filename} ===`);

    let content = fs.readFileSync(filePath, "utf8");
    console.log(`File size: ${content.length} bytes`);

    // The file now has: header + empty array `[]` + footer
    // Find the empty array pattern
    const emptyArrMatch = content.match(/(const\s+\w+\s*=\s*\[)\s*\]/);
    if (!emptyArrMatch) {
        console.log("No empty array pattern found, trying alternative...");
        // Try to find the const pattern followed by any array
        const arrMatch = content.match(/(const\s+\w+\s*=\s*\[)\s*\]/s);
        if (!arrMatch) {
            console.log("Still no match. Checking first 500 chars...");
            console.log(content.substring(0, 500));
            return false;
        }
    }

    const headerEnd = emptyArrMatch[0].length;
    const header = content.substring(0, emptyArrMatch.index + emptyArrMatch[0].length);

    // Everything after the empty array's `]` is the footer containing case data
    const footerStart = emptyArrMatch.index + emptyArrMatch[0].length;
    const footerContent = content.substring(footerStart);
    console.log(`Footer size: ${footerContent.length} bytes`);

    if (footerContent.trim().length === 0) {
        console.log("Footer is empty - all data was lost!");
        return false;
    }

    // Check if footer starts with a case object or array
    console.log("Footer starts with:", JSON.stringify(footerContent.substring(0, 200)));

    // Extract case objects from footer
    // Find array with case objects in footer
    let caseSource = footerContent;

    // Try to find an array `[...]` in the footer
    const footerArrMatch = caseSource.match(/^\s*(\[)/);
    if (footerArrMatch) {
        // The footer starts with an array - extract it
        const arrStart = footerArrMatch.index + footerArrMatch[0].length - 1;
        let depth = 0, inStr = false, sC = null, arrEnd = -1;
        for (let i = arrStart; i < caseSource.length; i++) {
            const ch = caseSource[i], prev = i > 0 ? caseSource[i - 1] : "";
            if (inStr) {
                if (ch === sC && prev !== "\\") { inStr = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inStr = true; sC = ch; continue; }
            if (ch === "[") depth++;
            if (ch === "]") depth--;
            if (depth === 0) { arrEnd = i + 1; break; }
        }
        if (arrEnd > 0) {
            caseSource = caseSource.substring(arrStart, arrEnd);
            console.log(`Found array in footer: ${arrEnd - arrStart} bytes`);
        }
    }

    // Extract individual case objects from the source
    const cases = extractCaseObjects(caseSource, filename);
    if (cases.length === 0) {
        console.log("No case objects found in footer");
        return false;
    }
    console.log(`Found ${cases.length} case objects`);

    // Extract original fields from each case
    const origCases = cases.map((raw, idx) => {
        const orig = extractFields(raw);
        if (orig) {
            console.log(`  ${idx}: ${orig.CaseID}`);
        } else {
            console.log(`  ${idx}: FAILED`);
        }
        return orig;
    }).filter(Boolean);

    console.log(`Successfully extracted: ${origCases.length}/${cases.length}`);

    // Rebuild file
    const outputLines = [header.trimEnd()];
    outputLines.push("");

    let gsCount = 0, phCount = 0;

    origCases.forEach((orig, idx) => {
        const comma = idx < origCases.length - 1 ? "," : "";

        const isPH = !orig.ScenarioText || orig.ScenarioText.length < 20 ||
            (orig.ScenarioText && orig.ScenarioText.toLowerCase().includes("placeholder"));

        let caseStr;
        if (isPH) {
            phCount++;
            caseStr = serializeClean(orig);
        } else {
            gsCount++;
            const meta = gs.deriveMetadata(orig);
            caseStr = serializeFull(orig, meta);
        }
        outputLines.push(caseStr + (comma ? "," : ""));
    });

    // Add original footer (functions, module code, etc.)
    // Check if there's code after the last case
    const afterLastCase = extractAfterCases(footerContent);
    if (afterLastCase) {
        outputLines.push("");
        outputLines.push(afterLastCase.trimEnd());
    }

    const newContent = outputLines.join("\n") + "\n";
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`\n${filename}: ${gsCount} Gold Standard + ${phCount} placeholder = ${origCases.length} total`);
    console.log(`Written: ${newContent.length} bytes`);

    return true;
}

/**
 * Extracts all { ... } case objects from a text source.
 */
function extractCaseObjects(text, filename) {
    const results = [];
    let pos = 0;

    while (pos < text.length) {
        // Find next {
        const objStart = text.indexOf("{", pos);
        if (objStart === -1) break;

        let d = 0, inS = false, sC = null, objEnd = objStart;
        for (let i = objStart; i < text.length; i++) {
            const ch = text[i], prev = i > 0 ? text[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            // Track both { } and [ ] to find the matching }
            if (ch === "{") d++;
            if (ch === "}") d--;
            if (d === 0) { objEnd = i + 1; break; }
        }

        if (d !== 0) {
            console.log(`  Unclosed object at position ${objStart}`);
            break;
        }

        results.push(text.substring(objStart, objEnd));
        pos = objEnd;
    }

    return results;
}

/**
 * Extracts original field values from a raw case object text.
 */
function extractFields(raw) {
    const result = {};

    const cidMatch = raw.match(/CaseID\s*:\s*'([^']+)'/) || raw.match(/"CaseID"\s*:\s*"([^"]+)"/);
    if (!cidMatch) return null;
    result.CaseID = cidMatch[1];

    result.Title = extractStr(raw, "Title");
    result.ScenarioText = extractStr(raw, "ScenarioText");
    result.EstimatedMinutes = extractNum(raw, "EstimatedMinutes");

    const tagsMatch = raw.match(/SectionTags\s*:\s*\[([^\]]+)\]/) || raw.match(/"SectionTags"\s*:\s*\[([^\]]+)\]/);
    if (tagsMatch) {
        const tagVals = tagsMatch[1].match(/['"](\w)['"]/g);
        result.SectionTags = tagVals ? tagVals.map(t => t[1]) : [];
    } else {
        result.SectionTags = [];
    }

    // Extract Exhibits and Items as raw blocks
    result.Exhibits = extractArrayBlock(raw, "Exhibits") || "[]";
    result.Items = extractArrayBlock(raw, "Items") || "[]";

    return result;
}

function extractStr(text, key) {
    const p1 = new RegExp(`${key}\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`);
    const m1 = text.match(p1);
    if (m1) return m1[1].replace(/\\'/g, "'").replace(/\\n/g, "\n");

    const p2 = new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`);
    const m2 = text.match(p2);
    if (m2) return m2[1].replace(/\\"/g, '"').replace(/\\n/g, "\n");

    return "";
}

function extractNum(text, key) {
    const m = text.match(new RegExp(`${key}\\s*:\\s*(\\d+)`));
    return m ? parseInt(m[1], 10) : 30;
}

function extractArrayBlock(text, key) {
    const re = new RegExp(`(?:${key}|"${key}")\\s*:\\s*(\\[)`);
    const match = text.match(re);
    if (!match) return null;

    const start = match.index + match[0].length - 1;
    let depth = 0, inStr = false, sC = null, end = -1;
    for (let i = start; i < text.length; i++) {
        const ch = text[i], prev = i > 0 ? text[i - 1] : "";
        if (inStr) {
            if (ch === sC && prev !== "\\") { inStr = false; sC = null; }
            continue;
        }
        if (ch === '"' || ch === "'" || ch === "`") { inStr = true; sC = ch; continue; }
        if (ch === "[") depth++;
        if (ch === "]") depth--;
        if (depth === 0) { end = i + 1; break; }
    }
    if (end === -1) return null;
    return text.substring(start, end);
}

/**
 * Parse array into objects.
 */
function parseArray(raw) {
    const results = [];
    let pos = 0;
    while (pos < raw.length) {
        const start = raw.indexOf("{", pos);
        if (start === -1) break;
        let d = 0, inS = false, sC = null, end = start;
        for (let i = start; i < raw.length; i++) {
            const ch = raw[i], prev = i > 0 ? raw[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "{") d++;
            if (ch === "}") d--;
            if (d === 0) { end = i + 1; break; }
        }
        const objText = raw.substring(start, end);
        const parsed = {};
        parsed.Type = extractStr(objText, "Type") || extractStr(objText, "type");
        parsed.Title = extractStr(objText, "Title") || extractStr(objText, "title");
        parsed.Prompt = extractStr(objText, "Prompt") || extractStr(objText, "prompt");
        parsed.Explanation = extractStr(objText, "Explanation") || extractStr(objText, "explanation");
        parsed.Topic = extractStr(objText, "Topic") || extractStr(objText, "topic");
        parsed.Body = extractStr(objText, "Body") || extractStr(objText, "body");
        parsed.Correct = extractCorrect(objText);
        parsed.Choices = extractJSONArray(objText, "Choices");
        parsed.LeftItems = extractJSONArray(objText, "LeftItems");
        parsed.RightItems = extractJSONArray(objText, "RightItems");
        parsed.Headers = extractJSONArray(objText, "Headers");
        parsed.Rows = extractJSONArray(objText, "Rows");
        results.push(parsed);
        pos = end;
    }
    return results;
}

function extractCorrect(text) {
    const arrM = text.match(/Correct\s*:\s*(\[[^\]]+\])/);
    if (arrM) { try { return JSON.parse(arrM[1].replace(/'/g, '"')); } catch(e) {} }
    const objM = text.match(/Correct\s*:\s*(\{[^}]*\})/);
    if (objM) { try { return JSON.parse(objM[1].replace(/'/g, '"')); } catch(e) {} }
    const numM = text.match(/Correct\s*:\s*(\d+)/);
    if (numM) return parseInt(numM[1], 10);
    const strM = text.match(/Correct\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (strM) return strM[1];
    return undefined;
}

function extractJSONArray(text, key) {
    const m = text.match(new RegExp(`${key}\\s*:\\s*(\\[[^\\]]+\\])`));
    if (m) { try { return JSON.parse(m[1].replace(/'/g, '"')); } catch(e) {} }
    return undefined;
}

function serializeClean(orig) {
    const lines = [`  {`];
    lines.push(`    CaseID: '${escStr(orig.CaseID)}',`);
    lines.push(`    Title: '${escStr(orig.Title)}',`);
    lines.push(`    SectionTags: [${(orig.SectionTags || []).map(t => `'${t}'`).join(", ")}],`);
    lines.push(`    EstimatedMinutes: ${orig.EstimatedMinutes || 30},`);
    lines.push(`    ScenarioText: '${escStr(orig.ScenarioText)}',`);
    lines.push(``);
    lines.push(`    Exhibits: ${rebuildArray(orig.Exhibits)},`);
    lines.push(``);
    lines.push(`    Items: ${rebuildArray(orig.Items)}`);
    lines.push(`  }`);
    return lines.join("\n");
}

function serializeFull(orig, meta) {
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
    lines.push(`    Title: '${escStr(orig.Title)}',`);
    lines.push(`    SectionTags: [${(orig.SectionTags || []).map(t => `'${t}'`).join(", ")}],`);
    lines.push(`    ScenarioText: '${escStr(orig.ScenarioText)}',`);
    lines.push(``);

    const typeMap = { "numeric": "Apply", "select": "Analyze", "multi": "Evaluate", "fill": "Understand", "match": "Synthesize" };

    // Exhibits
    lines.push(`    Exhibits: [`);
    const exArray = parseArray(orig.Exhibits);
    exArray.forEach((ex, ei) => {
        const ec = ei < exArray.length - 1 ? "," : "";
        lines.push(`      {`);
        lines.push(`        ExhibitID: '${orig.CaseID}-E${ei + 1}',`);
        const keys = Object.keys(ex).filter(k => k !== "ExhibitID");
        keys.forEach((k, ki) => {
            const v = ex[k];
            const tr = ki < keys.length - 1 ? "," : "";
            if (typeof v === "string") lines.push(`        ${k}: '${escStr(v)}'${tr}`);
            else if (Array.isArray(v)) lines.push(`        ${k}: ${escObj(v)}${tr}`);
            else if (typeof v === "number") lines.push(`        ${k}: ${v}${tr}`);
            else if (v === undefined) { /* skip */ }
            else lines.push(`        ${k}: ${escObj(v)}${tr}`);
        });
        lines.push(`      }${ec}`);
    });
    lines.push(`    ],`);
    lines.push(``);

    // Items
    lines.push(`    Items: [`);
    const itArray = parseArray(orig.Items);
    itArray.forEach((item, ii) => {
        const ic = ii < itArray.length - 1 ? "," : "";
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
    return lines.join("\n");
}

function rebuildArray(raw) {
    if (!raw || raw === "[]") return "[]";
    return raw;
}

function extractAfterCases(text) {
    // Find the last } followed by non-array content
    const lastBrace = text.lastIndexOf("}");
    if (lastBrace === -1) return "";
    const after = text.substring(lastBrace + 1).trim();
    if (after.startsWith(",")) {
        return after.substring(1).trim();
    }
    if (after.startsWith("]")) {
        // This is the closing of the case array - take everything after it
        const bracketEnd = lastBrace + 1 + after.indexOf("]") + 1;
        return text.substring(bracketEnd).trim();
    }
    return after;
}

// MAIN
const root = config.paths.root;
const banks = config.caseBanks;
let success = true;

banks.forEach(file => {
    const fp = path.join(root, file);
    if (fs.existsSync(fp)) {
        if (!recover(fp)) success = false;
    } else {
        console.log(`${file}: NOT FOUND`);
    }
});

if (success) {
    console.log("\n=== RECOVERY COMPLETE ===");
} else {
    console.log("\n=== RECOVERY PARTIAL - MANUAL REVIEW NEEDED ===");
}
