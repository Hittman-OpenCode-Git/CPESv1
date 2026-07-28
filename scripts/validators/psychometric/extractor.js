const path = require("path");
const fs = require("fs");
const config = require("../../config");

function extractQuestions(content, filename) {
    const banks = [];
    const bankRegex = /(?:MCQ|CASE)_BANK_[A-Z]\s*=\s*\[/g;
    let match;

    while ((match = bankRegex.exec(content)) !== null) {
        const start = match.index;
        const varName = match[0];

        let depth = 1;
        let pos = match.index + match[0].length;
        while (pos < content.length && depth > 0) {
            if (content[pos] === '[') depth++;
            else if (content[pos] === ']') depth--;
            pos++;
        }

        if (depth === 0) {
            try {
                const arrayStr = content.slice(start + varName.length, pos - 1);
                const arrStart = arrayStr.indexOf('{');
                if (arrStart === -1) continue;
                const trimmed = '[' + arrayStr.slice(arrStart).trim() + ']';
                const parsed = JSON.parse(trimmed);
                banks.push(...parsed);
            } catch (e) {
                // Silently skip unparseable banks
            }
        }
    }

    return banks.length > 0 ? banks : null;
}

function loadAllQuestions() {
    const allQuestions = [];
    config.questionPacks.forEach(file => {
        const fullPath = path.join(config.paths.root, file);
        if (!fs.existsSync(fullPath)) return;
        const content = fs.readFileSync(fullPath, "utf8");
        const questions = extractQuestions(content, file);
        if (questions) {
            questions.forEach(q => {
                q._sourceFile = file;
                allQuestions.push(q);
            });
        }
    });

    config.caseBanks.forEach(file => {
        const fullPath = path.join(config.paths.root, file);
        if (!fs.existsSync(fullPath)) return;
        const content = fs.readFileSync(fullPath, "utf8");
        const cases = extractQuestions(content, file);
        if (cases) {
            cases.forEach(c => {
                c._sourceFile = file;
                c._isCase = true;
                allQuestions.push(c);
                // Also extract individual items from cases
                if (c.Items && Array.isArray(c.Items)) {
                    c.Items.forEach((item, idx) => {
                        item._sourceFile = file;
                        item._caseID = c.CaseID;
                        item._isCaseItem = true;
                        allQuestions.push(item);
                    });
                }
            });
        }
    });

    return allQuestions;
}

module.exports = { extractQuestions, loadAllQuestions };
