/**
 * Fixes the specific corruption from the fix-missing-commas.js and recover-files.js scripts.
 * The corruption pattern is:
 *   1405: "FieldName": "value"
 * Where 1405 was the match offset being output as a field name.
 * 
 * Also rebuilds files with clean formatting.
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

function fixFile(filePath) {
    const filename = path.basename(filePath);
    console.log(`\n=== ${filename} ===`);

    let content = fs.readFileSync(filePath, "utf8");
    console.log(`Size: ${content.length} bytes`);

    // Remove the corruption pattern: "number: \"FieldName\""
    content = content.replace(/^\s*\d+:\s*/gm, "");

    // Remove lines that are just `,` (from the recover-files not handling 0 cases)
    content = content.replace(/^,\s*$/gm, "");

    // Now try to find case objects in the cleaned content
    // Find the first {
    const firstBrace = content.indexOf("{");
    if (firstBrace === -1) {
        console.log("No case objects found");
        return false;
    }

    // Extract all { ... } objects
    const rawCases = [];
    let pos = firstBrace;
    while (pos < content.length) {
        const objStart = content.indexOf("{", pos);
        if (objStart === -1) break;

        let d = 0, inS = false, sC = null, objEnd = objStart;
        for (let i = objStart; i < content.length; i++) {
            const ch = content[i], prev = i > 0 ? content[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "{") d++;
            if (ch === "}") d--;
            if (d === 0) { objEnd = i + 1; break; }
        }

        if (d !== 0) { console.log(`Unclosed object at ${objStart}`); break; }

        const rawText = content.substring(objStart, objEnd);
        // Check if this looks like a case (has CaseID)
        if (rawText.includes("CaseID") || rawText.includes('"CaseID"')) {
            rawCases.push(rawText);
        }
        pos = objEnd;
    }

    console.log(`Found ${rawCases.length} case objects`);

    if (rawCases.length === 0) {
        // Try finding objects without CaseID
        console.log("Trying alternative extraction...");
        // Reset
        pos = firstBrace;
        let count = 0;
        while (pos < content.length) {
            const objStart = content.indexOf("{", pos);
            if (objStart === -1) break;
            let d = 0, inS = false, sC = null, objEnd = objStart;
            for (let i = objStart; i < content.length; i++) {
                const ch = content[i], prev = i > 0 ? content[i - 1] : "";
                if (inS) { if (ch === sC && prev !== "\\") { inS = false; sC = null; } continue; }
                if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
                if (ch === "{") d++;
                if (ch === "}") d--;
                if (d === 0) { objEnd = i + 1; break; }
            }
            if (d !== 0) break;
            rawCases.push(content.substring(objStart, objEnd));
            count++;
            pos = objEnd;
        }
        console.log(`Found ${count} objects (any type)`);
        if (count === 0) return false;
    }

    // Extract fields from each case
    const origCases = [];
    rawCases.forEach((raw, idx) => {
        // Try to find CaseID in the raw text
        let cid = null;
        const cidM = raw.match(/CaseID\s*:\s*'([^']+)'/) || raw.match(/"CaseID"\s*:\s*"([^"]+)"/);
        if (cidM) cid = cidM[1];

        if (!cid) {
            console.log(`  Case ${idx}: No CaseID found`);
            return;
        }

        const orig = {
            CaseID: cid,
            Title: extractF(raw, "Title"),
            ScenarioText: extractF(raw, "ScenarioText"),
            EstimatedMinutes: extractN(raw, "EstimatedMinutes"),
            SectionTags: extractT(raw, "SectionTags"),
            Exhibits: extractB(raw, "Exhibits") || "[]",
            Items: extractB(raw, "Items") || "[]"
        };

        console.log(`  ${idx}: ${orig.CaseID}`);
        origCases.push(orig);
    });

    if (origCases.length === 0) {
        console.log("No valid cases extracted");
        return false;
    }

    console.log(`\nExtracted ${origCases.length} cases. Rebuilding file...`);

    // Build new file
    const output = [];
    output.push("// Enhanced 2026-style CMA Part 1 case simulations - " + getPackName(filename));
    output.push("// These cases are original study content and are not official IMA or Prometric material.");
    output.push("");
    output.push(`const ENHANCED_CASE_BASE${getPackNum(filename)} = [`);
    output.push("");

    const typeMap = { "numeric": "Apply", "select": "Analyze", "multi": "Evaluate", "fill": "Understand", "match": "Synthesize" };
    let gsCount = 0, phCount = 0;

    origCases.forEach((orig, idx) => {
        const comma = idx < origCases.length - 1 ? "," : "";
        const isPH = !orig.ScenarioText || orig.ScenarioText.length < 20 ||
            orig.ScenarioText.toLowerCase().includes("placeholder");

        if (isPH) {
            phCount++;
            const lines = [`  {`];
            lines.push(`    CaseID: '${escStr(orig.CaseID)}',`);
            lines.push(`    Title: '${escStr(orig.Title)}',`);
            lines.push(`    SectionTags: [${(orig.SectionTags || []).map(t => `'${t}'`).join(", ")}],`);
            lines.push(`    EstimatedMinutes: ${orig.EstimatedMinutes || 30},`);
            lines.push(`    ScenarioText: '${escStr(orig.ScenarioText)}',`);
            lines.push(``);
            lines.push(`    Exhibits: ${orig.Exhibits},`);
            lines.push(``);
            lines.push(`    Items: ${orig.Items}`);
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
            lines.push(`    Title: '${escStr(orig.Title)}',`);
            lines.push(`    SectionTags: [${(orig.SectionTags || []).map(t => `'${t}'`).join(", ")}],`);
            lines.push(`    ScenarioText: '${escStr(orig.ScenarioText)}',`);
            lines.push(``);
            lines.push(`    Exhibits: [`);

            const exArray = parseObjects(orig.Exhibits);
            exArray.forEach((ex, ei) => {
                const ec = ei < exArray.length - 1 ? "," : "";
                lines.push(`      {`);
                lines.push(`        ExhibitID: '${orig.CaseID}-E${ei + 1}',`);
                ["Type", "Title", "Body", "Headers", "Rows"].forEach(k => {
                    const v = ex[k];
                    if (v === undefined) return;
                    const tr = k !== "Rows" && k !== "Body" && k !== "Headers" ? "," : "";
                    if (typeof v === "string") lines.push(`        ${k}: '${escStr(v)}'${tr}`);
                    else if (Array.isArray(v)) lines.push(`        ${k}: ${escObj(v)}${tr}`);
                });
                lines.push(`      }${ec}`);
            });
            lines.push(`    ],`);
            lines.push(``);
            lines.push(`    Items: [`);

            const itArray = parseObjects(orig.Items);
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
            output.push(lines.join("\n") + (comma ? "," : ""));
        }
    });

    output.push("");
    output.push("];");

    const newContent = output.join("\n");
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`\n${filename}: ${gsCount} GS + ${phCount} PH = ${origCases.length} total`);
    console.log(`Written: ${newContent.length} bytes`);

    return true;
}

function extractF(text, key) {
    const m = text.match(new RegExp(`(?:"${key}"|${key})\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    if (m) return m[1].replace(/\\"/g, '"').replace(/\\n/g, "\n");
    const m2 = text.match(new RegExp(`(?:${key}|"${key}")\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
    if (m2) return m2[1].replace(/\\'/g, "'").replace(/\\n/g, "\n");
    return "";
}

function extractN(text, key) {
    const m = text.match(new RegExp(`(?:"${key}"|${key})\\s*:\\s*(\\d+)`));
    return m ? parseInt(m[1], 10) : 30;
}

function extractT(text, key) {
    const m = text.match(new RegExp(`(?:"${key}"|${key})\\s*:\\s*\\[([^\\]]+)\\]`));
    if (!m) return [];
    const vals = m[1].match(/['"](\w)['"]/g);
    return vals ? vals.map(t => t[1]) : [];
}

function extractB(text, key) {
    const p = new RegExp(`(?:"${key}"|${key})\\s*:\\s*(\\[)`);
    const m = text.match(p);
    if (!m) return null;
    const start = m.index + m[0].length - 1;
    let depth = 0, inS = false, sC = null, end = -1;
    for (let i = start; i < text.length; i++) {
        const ch = text[i], prev = i > 0 ? text[i - 1] : "";
        if (inS) { if (ch === sC && prev !== "\\") { inS = false; sC = null; } continue; }
        if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
        if (ch === "[") depth++;
        if (ch === "]") depth--;
        if (depth === 0) { end = i + 1; break; }
    }
    if (end === -1) return null;
    return text.substring(start, end);
}

function parseObjects(raw) {
    const results = [];
    let pos = 0;
    while (pos < raw.length) {
        const st = raw.indexOf("{", pos);
        if (st === -1) break;
        let d = 0, inS = false, sC = null, en = st;
        for (let i = st; i < raw.length; i++) {
            const ch = raw[i], prev = i > 0 ? raw[i - 1] : "";
            if (inS) { if (ch === sC && prev !== "\\") { inS = false; sC = null; } continue; }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "{") d++;
            if (ch === "}") d--;
            if (d === 0) { en = i + 1; break; }
        }
        const objText = raw.substring(st, en);
        const obj = {};
        obj.Type = extractF(objText, "Type");
        obj.Title = extractF(objText, "Title");
        obj.Prompt = extractF(objText, "Prompt");
        obj.Explanation = extractF(objText, "Explanation");
        obj.Topic = extractF(objText, "Topic");
        obj.Body = extractF(objText, "Body");
        obj.Correct = extractCorrect(objText);
        obj.Choices = extractJSON(objText, "Choices");
        obj.LeftItems = extractJSON(objText, "LeftItems");
        obj.RightItems = extractJSON(objText, "RightItems");
        obj.Headers = extractJSON(objText, "Headers");
        obj.Rows = extractJSON(objText, "Rows");
        results.push(obj);
        pos = en;
    }
    return results;
}

function extractCorrect(text) {
    const a = text.match(/Correct\s*:\s*(\[[^\]]+\])/);
    if (a) { try { return JSON.parse(a[1].replace(/'/g, '"')); } catch(e) {} }
    const o = text.match(/Correct\s*:\s*(\{[^}]*\})/);
    if (o) { try { return JSON.parse(o[1].replace(/'/g, '"')); } catch(e) {} }
    const n = text.match(/Correct\s*:\s*(\d+)/);
    if (n) return parseInt(n[1], 10);
    const s = text.match(/Correct\s*:\s*"((?:[^"\\]|\\.)*)"/);
    if (s) return s[1];
    const s2 = text.match(/Correct\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (s2) return s2[1];
    return undefined;
}

function extractJSON(text, key) {
    const m = text.match(new RegExp(`${key}\\s*:\\s*(\\[[^\\]]+\\])`));
    if (m) { try { return JSON.parse(m[1].replace(/'/g, '"')); } catch(e) {} }
    return undefined;
}

function getPackName(filename) {
    const map = { "scored_cases.js": "Pack 1", "scored_cases2.js": "Pack 2", "scored_cases3.js": "Pack 3", "scored_cases4.js": "Pack 4", "scored_cases5.js": "Pack 5" };
    return map[filename] || filename;
}

function getPackNum(filename) {
    const m = filename.match(/scored_cases(\d*)\.js/);
    return m ? m[1] : "";
}

// MAIN
const root = config.paths.root;
const banks = config.caseBanks;

banks.forEach(file => {
    const fp = path.join(root, file);
    if (fs.existsSync(fp)) fixFile(fp);
    else console.log(`${file}: NOT FOUND`);
});
