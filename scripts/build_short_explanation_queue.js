const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function extractArray(content, varName) {
    const re = new RegExp('(?:const|let|var)\\s+' + varName + '\\s*=\\s*\\[', 'm');
    const vm = content.match(re);
    if (!vm) return null;
    const start = content.indexOf('[', vm.index);
    let depth = 0, pos = start;
    do { if (content[pos] === '[') depth++; if (content[pos] === ']') depth--; pos++; } while (depth > 0 && pos < content.length);
    try { return JSON.parse(content.substring(start, pos)); } catch(e) { return null; }
}

const packs = ['pack_a_corrected.js','pack_b_corrected.js','pack_c_corrected.js','pack_d_corrected.js','pack_e_corrected.js'];
const vars = ['MCQ_BANK_A','MCQ_BANK_B','MCQ_BANK_C','MCQ_BANK_D','MCQ_BANK_E'];
const r14 = [], e1 = [];

for (let i = 0; i < packs.length; i++) {
    const fp = path.join(ROOT, packs[i]);
    if (!fs.existsSync(fp)) continue;
    const content = fs.readFileSync(fp, 'utf8');
    const arr = extractArray(content, vars[i]);
    if (!arr) continue;
    for (const q of arr) {
        if (!q.QuestionID) continue;
        const qid = q.QuestionID;
        const pack = packs[i];
        if (q.ExplanationCorrect && String(q.ExplanationCorrect).trim().length < 50) {
            r14.push({ qid, pack, field: 'ExplanationCorrect', content: q.ExplanationCorrect, len: q.ExplanationCorrect.length });
        }
        for (const letter of ['A','B','C','D']) {
            const fn = 'ExplanationWrong' + letter;
            if (q[fn] && String(q[fn]).trim().length > 0 && String(q[fn]).trim().length < 50) {
                e1.push({ qid, pack, field: fn, content: q[fn], len: q[fn].length });
            }
        }
    }
}

r14.sort((a,b) => a.qid.localeCompare(b.qid));
e1.sort((a,b) => a.qid.localeCompare(b.qid));

let md = '# Short Explanation Queue (R14 + E1)\n\n';
md += '**Date:** 2026-07-22\n';
md += '**Source:** Structural audit\n';
md += '**Total items:** ' + (r14.length + e1.length) + ' (R14: ' + r14.length + ', E1: ' + e1.length + ')\n\n';
md += '> Each item requires editorial expansion. No sweep. Process in batches of ~15 between verification waves.\n';
md += '> For each expansion: include concept being tested, reasoning, and (for ExplanationCorrect) the seven CAQS educational components where applicable.\n';
md += '> AI verification per expansion: does the new content satisfy CAQS? Confidence flag required.\n\n';

md += '## R14 — ExplanationCorrect < 50 chars (' + r14.length + ' items)\n\n';
md += '| QID | Pack | Field | Length | Content |\n';
md += '|-----|------|-------|--------|--------|\n';
for (const e of r14) {
    const disp = e.content.length > 180 ? e.content.substring(0, 177) + '...' : e.content;
    md += '| ' + e.qid + ' | ' + e.pack + ' | ' + e.field + ' | ' + e.len + ' | ' + disp + ' |\n';
}

md += '\n## E1 — Distractor Explanations < 50 chars (' + e1.length + ' items)\n\n';
md += '| QID | Pack | Field | Length | Content |\n';
md += '|-----|------|-------|--------|--------|\n';
for (const e of e1) {
    const disp = e.content.length > 180 ? e.content.substring(0, 177) + '...' : e.content;
    md += '| ' + e.qid + ' | ' + e.pack + ' | ' + e.field + ' | ' + e.len + ' | ' + disp + ' |\n';
}

const outPath = path.join(ROOT, 'knowledge', 'SHORT_EXPLANATION_QUEUE.md');
fs.writeFileSync(outPath, md, 'utf8');
console.log('SHORT_EXPLANATION_QUEUE.md written');
console.log('  R14: ' + r14.length + ' items');
console.log('  E1:  ' + e1.length + ' items');
console.log('  Total: ' + (r14.length + e1.length) + ' items');
