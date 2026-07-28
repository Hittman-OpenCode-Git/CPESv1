/**
 * Complete file recovery: reads corrupted case bank files,
 * extracts ALL original case data, and rebuilds clean files
 * with proper metadata.
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");
const gs = require("./lib/MetadataMigrator");

function recoverFile(filePath) {
    const filename = path.basename(filePath);
    console.log(`\n=== ${filename} ===`);

    const content = fs.readFileSync(filePath, "utf8");
    console.log(`File size: ${content.length} bytes`);

    // Find the array
    const arrMatch = content.match(/(const\s+\w+\s*=\s*\[)/);
    if (!arrMatch) { console.log("ERROR: No array pattern found"); return false; }

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
    if (arrEnd === -1) { console.log("ERROR: Array end not found"); return false; }

    const arrayText = content.substring(arrStart, arrEnd + 1);
    const footer = content.substring(arrEnd + 1);
    console.log(`Array section: ${arrayText.length} bytes`);
    console.log(`Footer section: ${footer.length} bytes`);

    // Extract individual case objects
    const rawCases = [];
    let pos = 0;
    while (pos < arrayText.length) {
        while (pos < arrayText.length && arrayText[pos] !== "{") pos++;
        if (pos >= arrayText.length) break;

        let d = 0, inS = false, sC = null;
        let objStart = pos;
        for (let i = pos; i < arrayText.length; i++) {
            const ch = arrayText[i], prev = i > 0 ? arrayText[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "{") d++;
            if (ch === "}") d--;
            if (d === 0) {
                rawCases.push({ raw: arrayText.substring(objStart, i + 1), start: objStart, end: i + 1 });
                pos = i + 1;
                break;
            }
        }
        if (d !== 0) { console.log("ERROR: Unclosed case object at", pos); break; }
    }

    console.log(`Found ${rawCases.length} case objects`);

    // Extract original fields from each case and reconstruct
    const reconstructed = [];
    let placeholderCount = 0, gsCount = 0;

    rawCases.forEach((rc, idx) => {
        const orig = extractOriginalFields(rc.raw, filename, idx);
        if (!orig.CaseID) {
            console.log(`  Case ${idx}: FAILED to extract CaseID, using raw`);
            reconstructed.push(rc.raw);
            return;
        }

        // Check if placeholder
        const isPlaceholder = !orig.ScenarioText || orig.ScenarioText.length < 20 ||
            orig.ScenarioText.toLowerCase().includes("placeholder");

        if (isPlaceholder) {
            placeholderCount++;
            console.log(`  ${orig.CaseID}: Placeholder, keeping clean original`);
            reconstructed.push(serializeCleanCase(orig));
        } else {
            gsCount++;
            console.log(`  ${orig.CaseID}: Gold Standard, adding metadata`);
            const meta = gs.deriveMetadata(orig);
            reconstructed.push(serializeFullCase(orig, meta));
        }
    });

    // Rebuild file
    const outputLines = [];
    outputLines.push(header.trimEnd());
    outputLines.push("");

    reconstructed.forEach((caseStr, idx) => {
        const comma = idx < reconstructed.length - 1 ? "," : "";
        outputLines.push(caseStr.trimEnd() + (comma ? "," : ""));
    });

    if (footer.trim()) {
        outputLines.push("");
        outputLines.push(footer.trimEnd());
    }

    const newContent = outputLines.join("\n") + "\n";
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`\n${filename}: ${gsCount} Gold Standard + ${placeholderCount} placeholder = ${reconstructed.length} total`);
    console.log(`Written: ${newContent.length} bytes`);

    return true;
}

/**
 * Extracts original field values from a case object's raw text.
 * Uses simple regex to extract each field independently, ignoring
 * any broken metadata that was inserted.
 */
function extractOriginalFields(rawText, filename, idx) {
    const result = {};

    // CaseID
    const cidMatch = rawText.match(/CaseID\s*:\s*'([^']+)'/) || rawText.match(/"CaseID"\s*:\s*"([^"]+)"/);
    if (!cidMatch) { console.log(`  Case ${idx}: No CaseID found`); return result; }
    result.CaseID = cidMatch[1];

    // Title
    const titleMatch = rawText.match(/Title\s*:\s*'((?:[^'\\]|\\.)*)'/) || rawText.match(/"Title"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    result.Title = titleMatch ? titleMatch[1] : "";

    // SectionTags
    const tagsMatch = rawText.match(/SectionTags\s*:\s*\[([^\]]+)\]/) || rawText.match(/"SectionTags"\s*:\s*\[([^\]]+)\]/);
    if (tagsMatch) {
        const tagVals = tagsMatch[1].match(/['"](\w)['"]/g);
        result.SectionTags = tagVals ? tagVals.map(t => t[1]) : [];
    } else {
        result.SectionTags = [];
    }

    // EstimatedMinutes
    const emMatch = rawText.match(/EstimatedMinutes\s*:\s*(\d+)/);
    result.EstimatedMinutes = emMatch ? parseInt(emMatch[1], 10) : 30;

    // ScenarioText (use non-greedy match within string boundaries)
    const stMatch = rawText.match(/ScenarioText\s*:\s*'((?:[^'\\]|\\.)*)'/s) ||
                    rawText.match(/"ScenarioText"\s*:\s*"((?:[^"\\]|\\.)*)"/s);
    result.ScenarioText = stMatch ? stMatch[1].replace(/\\'/g, "'").replace(/\\n/g, "\n") : "";

    // Exhibits - find the Exhibits: [...] block with balanced brackets
    const exMatch = rawText.match(/Exhibits\s*:\s*(\[)/) || rawText.match(/"Exhibits"\s*:\s*(\[)/);
    if (exMatch) {
        const exStart = exMatch.index + exMatch[0].length - 1;
        let d = 0, inS = false, sC = null;
        for (let i = exStart; i < rawText.length; i++) {
            const ch = rawText[i], prev = i > 0 ? rawText[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "[") d++;
            if (ch === "]") d--;
            if (d === 0) {
                result.Exhibits = rawText.substring(exStart, i + 1);
                break;
            }
        }
    }
    if (!result.Exhibits) result.Exhibits = "[]";

    // Items - same approach
    const itMatch = rawText.match(/Items\s*:\s*(\[)/) || rawText.match(/"Items"\s*:\s*(\[)/);
    if (itMatch) {
        const itStart = itMatch.index + itMatch[0].length - 1;
        let d = 0, inS = false, sC = null;
        for (let i = itStart; i < rawText.length; i++) {
            const ch = rawText[i], prev = i > 0 ? rawText[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "[") d++;
            if (ch === "]") d--;
            if (d === 0) {
                result.Items = rawText.substring(itStart, i + 1);
                break;
            }
        }
    }
    if (!result.Items) result.Items = "[]";

    return result;
}

/**
 * Serializes a case without metadata (for placeholders).
 * Maintains original field order and values.
 */
function serializeCleanCase(orig) {
    const escStr = (s) => (s || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
    const lines = [];
    lines.push("  {");
    lines.push(`    CaseID: '${escStr(orig.CaseID)}',`);
    lines.push(`    Title: '${escStr(orig.Title)}',`);
    lines.push(`    SectionTags: [${(orig.SectionTags || []).map(t => `'${t}'`).join(", ")}],`);
    lines.push(`    EstimatedMinutes: ${orig.EstimatedMinutes || 30},`);
    lines.push(`    ScenarioText: '${escStr(orig.ScenarioText)}',`);
    // Exhibits as clean text
    lines.push(``);
    lines.push(`    Exhibits: ${orig.Exhibits},`);
    lines.push(``);
    lines.push(`    Items: ${orig.Items}`);
    lines.push(`  }`);
    return lines.join("\n");
}

/**
 * Serializes a Gold Standard case with full metadata.
 */
function serializeFullCase(orig, meta) {
    const escStr = (s) => (s || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
    const escObj = (o) => JSON.stringify(o);
    const typeMap = { "numeric": "Apply", "select": "Analyze", "multi": "Evaluate", "fill": "Understand", "match": "Synthesize" };

    const lines = [];
    lines.push("  {");
    // CaseID
    lines.push(`    CaseID: '${escStr(orig.CaseID)}',`);

    // Metadata fields
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

    // Title
    lines.push(`    Title: '${escStr(orig.Title)}',`);
    // SectionTags
    lines.push(`    SectionTags: [${(orig.SectionTags || []).map(t => `'${t}'`).join(", ")}],`);
    // ScenarioText
    lines.push(`    ScenarioText: '${escStr(orig.ScenarioText)}',`);

    // Exhibits - parse and rebuild with ExhibitIDs
    lines.push(``);
    lines.push(`    Exhibits: [`);

    // Parse exhibits from the raw text
    const exArray = parseRawArray(orig.Exhibits);
    exArray.forEach((ex, ei) => {
        const exComma = ei < exArray.length - 1 ? "," : "";
        lines.push(`      {`);
        // Add ExhibitID
        const exID = `${orig.CaseID}-E${ei + 1}`;
        lines.push(`        ExhibitID: '${exID}',`);
        // Copy other fields
        const exKeys = Object.keys(ex);
        const kvs = exKeys.map((key, ki) => {
            const val = ex[key];
            const trailing = ki < exKeys.length - 1 ? "," : "";
            if (typeof val === "string") {
                return `        ${key}: '${escStr(val)}'${trailing}`;
            } else if (typeof val === "number") {
                return `        ${key}: ${val}${trailing}`;
            } else {
                return `        ${key}: ${escObj(val)}${trailing}`;
            }
        });
        kvs.forEach(kv => lines.push(kv));
        lines.push(`      }${exComma}`);
    });
    lines.push(`    ],`);

    // Items - parse and rebuild with ItemIDs and CognitiveLevels
    lines.push(``);
    lines.push(`    Items: [`);

    const itArray = parseRawArray(orig.Items);
    itArray.forEach((item, ii) => {
        const itemComma = ii < itArray.length - 1 ? "," : "";
        const cognitive = typeMap[item.Type] || "Apply";
        const calcReq = item.Type === "numeric";

        lines.push(`      {`);
        lines.push(`        ItemID: '${orig.CaseID}-Q${ii + 1}',`);
        lines.push(`        Type: '${item.Type}',`);
        lines.push(`        CognitiveLevel: '${cognitive}',`);
        if (calcReq) {
            lines.push(`        CalculationRequired: true,`);
        }

        // Prompt
        if (item.Prompt !== undefined) {
            lines.push(`        Prompt: '${escStr(String(item.Prompt))}',`);
        }
        // Correct
        if (item.Correct !== undefined) {
            if (Array.isArray(item.Correct)) {
                lines.push(`        Correct: ${escObj(item.Correct)},`);
            } else if (typeof item.Correct === "object" && item.Correct !== null) {
                lines.push(`        Correct: ${escObj(item.Correct)},`);
            } else {
                const cStr = String(item.Correct);
                if (/^\d+$/.test(cStr)) {
                    lines.push(`        Correct: ${cStr},`);
                } else {
                    lines.push(`        Correct: '${escStr(cStr)}',`);
                }
            }
        }
        // Explanation
        if (item.Explanation !== undefined) {
            lines.push(`        Explanation: '${escStr(String(item.Explanation))}',`);
        }
        // Topic
        if (item.Topic !== undefined) {
            lines.push(`        Topic: '${escStr(item.Topic)}',`);
        }
        // Choices
        if (item.Choices && Array.isArray(item.Choices)) {
            lines.push(`        Choices: ${escObj(item.Choices)},`);
        }
        // LeftItems / RightItems
        if (item.LeftItems && Array.isArray(item.LeftItems)) {
            lines.push(`        LeftItems: ${escObj(item.LeftItems)},`);
        }
        if (item.RightItems && Array.isArray(item.RightItems)) {
            lines.push(`        RightItems: ${escObj(item.RightItems)}`);
        }
        lines.push(`      }${itemComma}`);
    });
    lines.push(`    ]`);

    lines.push(`  }`);
    return lines.join("\n");
}

/**
 * Parses a raw array text `[...]` into individual objects `{...}`.
 */
function parseRawArray(raw) {
    const results = [];
    let pos = 0;
    while (pos < raw.length) {
        const objStart = raw.indexOf("{", pos);
        if (objStart === -1) break;

        let d = 0, inS = false, sC = null, objEnd = objStart;
        for (let i = objStart; i < raw.length; i++) {
            const ch = raw[i], prev = i > 0 ? raw[i - 1] : "";
            if (inS) {
                if (ch === sC && prev !== "\\") { inS = false; sC = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sC = ch; continue; }
            if (ch === "{") d++;
            if (ch === "}") d--;
            if (d === 0) { objEnd = i + 1; break; }
        }

        results.push(parseRawObject(raw.substring(objStart, objEnd)));
        pos = objEnd;
    }
    return results;
}

/**
 * Parses a single `{...}` object from raw text.
 */
function parseRawObject(text) {
    const obj = {};

    // Extract Type
    const typeMatch = text.match(/[Tt]ype\s*:\s*'([^']+)'/);
    if (typeMatch) obj.Type = typeMatch[1];

    // Extract Title
    const titleMatch = text.match(/[Tt]itle\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (titleMatch) obj.Title = titleMatch[1];

    // Extract Prompt
    const promptMatch = text.match(/[Pp]rompt\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (promptMatch) obj.Prompt = promptMatch[1];

    // Extract Explanation
    const explMatch = text.match(/[Ee]xplanation\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (explMatch) obj.Explanation = explMatch[1];

    // Extract Topic
    const topicMatch = text.match(/[Tt]opic\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (topicMatch) obj.Topic = topicMatch[1];

    // Extract Body
    const bodyMatch = text.match(/[Bb]ody\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (bodyMatch) obj.Body = bodyMatch[1];

    // Extract Correct (try array, object, number, string)
    const corrArr = text.match(/Correct\s*:\s*(\[[^\]]+\])/);
    if (corrArr) { try { obj.Correct = JSON.parse(corrArr[1].replace(/'/g, '"')); } catch(e) {} }
    else {
        const corrObj = text.match(/Correct\s*:\s*(\{[^}]*\})/);
        if (corrObj) { try { obj.Correct = JSON.parse(corrObj[1].replace(/'/g, '"')); } catch(e) {} }
        else {
            const corrNum = text.match(/Correct\s*:\s*(\d[\d,]*)/);
            if (corrNum) { obj.Correct = parseInt(corrNum[1].replace(/,/g, ""), 10); }
            else {
                const corrStr = text.match(/Correct\s*:\s*'((?:[^'\\]|\\.)*)'/);
                if (corrStr) obj.Correct = corrStr[1];
            }
        }
    }

    // Extract arrays (Choices, LeftItems, RightItems, Headers, Rows)
    ["Choices", "LeftItems", "RightItems", "Headers"].forEach(key => {
        const re = new RegExp(`${key}\\s*:\\s*(\\[[^\\]]+\\])`);
        const m = text.match(re);
        if (m) { try { obj[key] = JSON.parse(m[1].replace(/'/g, '"')); } catch(e) {} }
    });

    // Extract Rows (may span multiple lines)
    const rowsMatch = text.match(/Rows\s*:\s*(\[[\s\S]*?\](?=\s*[,\}]))/);
    if (rowsMatch) { try { obj.Rows = JSON.parse(rowsMatch[1].replace(/'/g, '"')); } catch(e) {} }

    // Fallback: body (already handled above)

    return obj;
}

// MAIN
const root = config.paths.root;
const banks = config.caseBanks;
let allOk = true;

banks.forEach(file => {
    const filePath = path.join(root, file);
    if (fs.existsSync(filePath)) {
        const ok = recoverFile(filePath);
        if (!ok) allOk = false;
    } else {
        console.log(`\n=== ${file} === NOT FOUND`);
    }
});

if (allOk) {
    console.log("\n=== ALL FILES RECOVERED SUCCESSFULLY ===");
} else {
    console.log("\n=== SOME FILES HAD ERRORS ===");
}
