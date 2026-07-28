const path = require("path");
const fs = require("fs");
const config = require("./config");

const outputDir = config.paths.output;
const jsonPath = path.join(outputDir, config.reports.json);
const csvPath = path.join(outputDir, "DefectDashboard.csv");
const summaryPath = path.join(outputDir, "DashboardSummary.md");

function loadResults() {
    if (!fs.existsSync(jsonPath)) {
        console.error("No validation report found. Run `npm run validate` first.");
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
}

function extractRealValidator(msg, parentName) {
    const match = msg.match(/^\[([^\]]+)\]/);
    if (match) return match[1];
    return parentName;
}

function extractQuestionID(msg) {
    // Try P1X-NNN or P1-XX-NNN patterns first
    let m = msg.match(/\b(P1[A-Za-z]*-[A-Z]{1,2}-\d{3,})\b/);
    if (m) return m[1];
    m = msg.match(/\b(P1[A-Za-z]+-\d{3,})\b/);
    if (m) return m[1];
    // Case IDs: CBQ-N, CBQ2-N, etc.
    m = msg.match(/\b(CBQ\d*-[A-Z]\d)\b/);
    if (m) return m[1];
    // ItemIDs in parens
    m = msg.match(/\(([^)]+)\)/);
    if (m && /[A-Z]/.test(m[1])) return m[1];
    // Fallback to "UNKNOWN"
    return "UNKNOWN";
}

function severityLabel(validator, isError) {
    if (isError) {
        const v = validator.toLowerCase();
        if (v.includes("mathematical") || v.includes("reference") || v.includes("caseintegrity")) return "Critical";
        if (v.includes("absolutelanguage") && (v.includes("always") || v.includes("never"))) return "High";
        if (v.includes("repository") || v.includes("metadata")) return "High";
        if (v.includes("blueprint")) return "High";
        return "Medium";
    }
    return "Warning";
}

function categoryFromValidator(validator) {
    const v = validator.toLowerCase();
    if (v.includes("mathematical")) return "Semantic";
    if (v.includes("explanationconsistency")) return "Explanation";
    if (v.includes("absolutelanguage")) return "Language";
    if (v.includes("ambiguity")) return "Ambiguity";
    if (v.includes("distractorsimilarity")) return "Distractor";
    if (v.includes("reference")) return "Reference";
    if (v.includes("explanation") || v.includes("explanationvalidator")) return "Explanation";
    if (v.includes("repository")) return "Structural";
    if (v.includes("metadata")) return "Metadata";
    if (v.includes("blueprint")) return "Blueprint";
    if (v.includes("difficulty")) return "Difficulty";
    if (v.includes("caseintegrity") || v.includes("case")) return "Case";
    if (v.includes("psychometric")) return "Psychometric";
    return "Other";
}

function buildDashboard() {
    const results = loadResults();
    const rows = [];

    // Header
    rows.push(["QuestionID", "Validator", "Severity", "Category", "Confidence", "Message", "Status"]);

    // Totals for summary
    const bySeverity = {};
    const byValidator = {};
    const byCategory = {};
    let totalQuestions = 0;

    results.forEach(r => {
        const parentName = r.validator;
        const confidence = r.confidence !== undefined ? r.confidence : 100;

        // Track questions audited from statistics
        if (r.statistics) {
            Object.entries(r.statistics).forEach(([k, v]) => {
                if (k.endsWith(".questionsScanned")) {
                    totalQuestions += v;
                }
            });
        }

        function addFinding(msg, isError) {
            const realValidator = extractRealValidator(msg, parentName);
            const qid = extractQuestionID(msg);
            const sev = isError ? severityLabel(realValidator, true) : "Warning";
            const cat = categoryFromValidator(realValidator);
            const conf = confidence;

            rows.push([qid, realValidator, sev, cat, conf, msg, "Open"]);

            bySeverity[sev] = (bySeverity[sev] || 0) + 1;
            const vkey = `${realValidator}`;
            if (!byValidator[vkey]) byValidator[vkey] = { errors: 0, warnings: 0, confidence: conf };
            if (isError) byValidator[vkey].errors++;
            else byValidator[vkey].warnings++;
            byCategory[cat] = (byCategory[cat] || 0) + 1;
        }

        r.errors.forEach(msg => addFinding(msg, true));
        r.warnings.forEach(msg => addFinding(msg, false));
    });

    // Write CSV
    const csvLines = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","));
    fs.writeFileSync(csvPath, csvLines.join("\n"), "utf8");
    console.log(`Defect dashboard: ${csvPath} (${rows.length - 1} findings)`);

    // Write summary
    buildSummary(totalQuestions, bySeverity, byValidator, byCategory);
}

function buildSummary(totalQuestions, bySeverity, byValidator, byCategory) {
    const lines = [];
    lines.push("# Defect Dashboard Summary");
    lines.push("");
    lines.push(`**Generated:** ${new Date().toISOString()}`);
    lines.push("");

    lines.push("## Overview");
    lines.push("");
    const sevOrder = ["Critical", "High", "Medium", "Warning"];
    lines.push("| Severity | Count |");
    lines.push("|----------|-------|");
    let totalFindings = 0;
    sevOrder.forEach(s => {
        if (bySeverity[s]) {
            lines.push(`| ${s} | ${bySeverity[s]} |`);
            totalFindings += bySeverity[s];
        }
    });
    lines.push(`| **Total** | **${totalFindings}** |`);
    lines.push("");

    lines.push("## By Validator");
    lines.push("");
    lines.push("| Validator | Errors | Warnings | Confidence |");
    lines.push("|-----------|--------|----------|------------|");
    Object.entries(byValidator).sort().forEach(([v, data]) => {
        lines.push(`| ${v} | ${data.errors} | ${data.warnings} | ${data.confidence}% |`);
    });
    lines.push("");

    lines.push("## By Category");
    lines.push("");
    lines.push("| Category | Findings |");
    lines.push("|----------|----------|");
    Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([c, n]) => {
        lines.push(`| ${c} | ${n} |`);
    });

    const avgConfidence = Object.keys(byValidator).length > 0
        ? (Object.values(byValidator).reduce((s, d) => s + d.confidence, 0) / Object.keys(byValidator).length).toFixed(0)
        : "N/A";

    lines.push("");
    lines.push("## Repository Metrics");
    lines.push("");
    lines.push(`| Metric | Value |`);
    lines.push(`|--------|-------|`);
    lines.push(`| Questions Audited (MCQ items) | ${totalQuestions} |`);
    lines.push(`| Validators / Sub-Modules | ${Object.keys(byValidator).length} |`);
    lines.push(`| Critical | ${bySeverity["Critical"] || 0} |`);
    lines.push(`| High | ${bySeverity["High"] || 0} |`);
    lines.push(`| Medium | ${bySeverity["Medium"] || 0} |`);
    lines.push(`| Warnings | ${bySeverity["Warning"] || 0} |`);
    lines.push(`| Average Confidence | ${avgConfidence}% |`);
    const criticalHigh = (bySeverity["Critical"] || 0) + (bySeverity["High"] || 0);
    const overall = criticalHigh > 0 ? "FAIL" : totalFindings > 0 ? "WARN" : "PASS";
    lines.push(`| Overall Status | ${overall} |`);

    fs.writeFileSync(summaryPath, lines.join("\n"), "utf8");
    console.log(`Dashboard summary: ${summaryPath}`);
}

buildDashboard();
