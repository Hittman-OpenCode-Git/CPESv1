// DL-026 Complete Scan — Boundary-Aware Object Parser
// Detects: empty non-CC ExplanationWrong slots ("")
// Also reports: DL-008 (non-empty CC slot), DL-021 (absent fields)
// Usage: node scripts/scan_dl026.js <pack_file.js>

const fs = require('fs');

function extractQuestions(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const questions = [];
    let pos = 0;

    while (pos < content.length) {
        const qidMatch = content.slice(pos).match(/"QuestionID"\s*:\s*"([^"]+)"/);
        if (!qidMatch) break;

        const qidPos = pos + qidMatch.index;
        const qid = qidMatch[1];

        // Find opening brace before this QuestionID
        let objStart = qidPos;
        let depth = 0;
        let inString = false;
        let stringChar = '';
        let escape = false;

        while (objStart > 0) {
            objStart--;
            const ch = content[objStart];
            if (escape) { escape = false; continue; }
            if (ch === '\\') { escape = true; continue; }
            if (inString) {
                if (ch === stringChar) { inString = false; }
                continue;
            }
            if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
            if (ch === '{') {
                depth--;
                if (depth < 0) {
                    objStart++;
                    break;
                }
            }
            if (ch === '}') depth++;
        }

        // Find closing brace matching the object
        let objEnd = qidPos + qidMatch[0].length;
        depth = 0;
        inString = false;
        stringChar = '';
        escape = false;

        while (objEnd < content.length) {
            const ch = content[objEnd];
            if (escape) { escape = false; objEnd++; continue; }
            if (ch === '\\') { escape = true; objEnd++; continue; }
            if (inString) {
                if (ch === stringChar) { inString = false; }
                objEnd++;
                continue;
            }
            if (ch === '"' || ch === "'") { inString = true; stringChar = ch; objEnd++; continue; }
            if (ch === '{') { depth++; objEnd++; continue; }
            if (ch === '}') {
                if (depth === 0) {
                    objEnd++;
                    break;
                }
                depth--;
                objEnd++;
                continue;
            }
            objEnd++;
        }

        const objText = content.slice(objStart, objEnd);
        pos = objEnd;

        // Extract fields using boundary-aware regex within this object
        const extract = (field) => {
            const re = new RegExp(`"${field}"\\s*:\\s*"([^"]*)"`, '');
            const m = objText.match(re);
            return m ? m[1] : undefined;
        };

        // Also try to extract from nested objects (e.g., within "Choices": {...})
        const extractNested = (objText) => {
            // Find the section/question part
            const ccRe = /"CorrectChoice"\s*:\s*"([^"])"/;
            const m = objText.match(ccRe);
            return m ? m[1] : undefined;
        };

        // Extract from Choices object
        const extractByKey = (key) => {
            // Try both flat field (e.g., "ChoiceA": "...") and nested (e.g., "A": "...")
            const flatRe = new RegExp(`"${key}"\\s*:\\s*"([^"]*)"`, '');
            const m = objText.match(flatRe);
            return m ? m[1] : undefined;
        };

        // Extract Section from Topic field or directly
        let section = '';
        const topicM = objText.match(/"Topic"\s*:\s*"([^"]*)"/);
        if (topicM) {
            const t = topicM[1];
            // Extract section: e.g., "C.001 bonds payable" → "C"
            const secM = t.match(/^([A-F])[\.-]/);
            if (secM) section = secM[1];
        }
        if (!section) {
            const secM2 = qid.match(/P1[A-E]?-([A-F])[A-F]?-?\d+/);
            if (secM2) section = secM2[1];
        }

        // Extract question_state
        const qsM = objText.match(/"question_state"\s*:\s*"([^"]*)"/);
        const questionState = qsM ? qsM[1] : 'MISSING';

        // Extract CorrectChoice
        const ccM = objText.match(/"CorrectChoice"\s*:\s*"([A-D])"/);
        if (!ccM) continue; // No CorrectChoice, skip
        const cc = ccM[1];

        // Check ExplanationWrong fields
        const results = { qid, section, questionState, cc, emptyNonCC: [], absentNonCC: [], ccSlotNonEmpty: false, ccSlotAbsent: false };

        for (const L of ['A', 'B', 'C', 'D']) {
            const field = 'ExplanationWrong' + L;
            const val = extract(field);

            if (L === cc) {
                // CorrectChoice slot
                if (val === undefined) {
                    results.ccSlotAbsent = true;
                } else if (val !== '') {
                    results.ccSlotNonEmpty = true;
                }
            } else {
                // Non-CC (distractor) slot
                if (val === undefined) {
                    results.absentNonCC.push(L);
                } else if (val === '') {
                    results.emptyNonCC.push(L);
                }
            }
        }

        questions.push(results);
    }

    return questions;
}

function main() {
    const filePath = process.argv[2];
    if (!filePath) {
        console.log('Usage: node scripts/scan_dl026.js <pack_file.js>');
        process.exit(1);
    }

    const questions = extractQuestions(filePath);

    // Summary by section
    const sectionStats = {};
    for (const q of questions) {
        if (!sectionStats[q.section]) {
            sectionStats[q.section] = {
                total: 0,
                certified: 0,
                dl026Items: 0,      // items with ≥1 empty non-CC slot
                dl026Fields: 0,     // total empty non-CC fields
                dl008Items: 0,      // items with non-empty CC slot
                dl021Items: 0,      // items with absent non-CC fields
                dl021Fields: 0,     // total absent non-CC fields
                dl018Items: 0,      // items with absent CC slot
            };
        }
        const s = sectionStats[q.section];
        s.total++;
        if (q.questionState === 'Certified') s.certified++;
        if (q.emptyNonCC.length > 0) { s.dl026Items++; s.dl026Fields += q.emptyNonCC.length; }
        if (q.ccSlotNonEmpty) s.dl008Items++;
        if (q.absentNonCC.length > 0) { s.dl021Items++; s.dl021Fields += q.absentNonCC.length; }
        if (q.ccSlotAbsent) s.dl018Items++;
    }

    console.log(`\n=== DL-026/008/021/018 Scan: ${filePath}`);
    console.log(`Total questions extracted: ${questions.length}`);
    console.log(`\n--- Section Summary ---`);
    console.log(`Sec | Total | Cert | DL-026(Q/F) | DL-008 | DL-021(Q/F) | DL-018`);
    console.log(`----|-------|------|-------------|--------|-------------|------`);
    for (const sec of ['A','B','C','D','E','F'].filter(s => sectionStats[s])) {
        const st = sectionStats[sec];
        console.log(` ${sec}  | ${String(st.total).padStart(5)} | ${String(st.certified).padStart(4)} | ${String(st.dl026Items).padStart(4)}/${String(st.dl026Fields).padStart(4)} | ${String(st.dl008Items).padStart(6)} | ${String(st.dl021Items).padStart(4)}/${String(st.dl021Fields).padStart(4)} | ${String(st.dl018Items).padStart(5)}`);
    }

    // Totals
    const totals = { total: 0, certified: 0, dl026Items: 0, dl026Fields: 0, dl008Items: 0, dl021Items: 0, dl021Fields: 0, dl018Items: 0 };
    for (const st of Object.values(sectionStats)) {
        totals.total += st.total;
        totals.certified += st.certified;
        totals.dl026Items += st.dl026Items;
        totals.dl026Fields += st.dl026Fields;
        totals.dl008Items += st.dl008Items;
        totals.dl021Items += st.dl021Items;
        totals.dl021Fields += st.dl021Fields;
        totals.dl018Items += st.dl018Items;
    }
    console.log(`----|-------|------|-------------|--------|-------------|------`);
    console.log(`ALL | ${String(totals.total).padStart(5)} | ${String(totals.certified).padStart(4)} | ${String(totals.dl026Items).padStart(4)}/${String(totals.dl026Fields).padStart(4)} | ${String(totals.dl008Items).padStart(6)} | ${String(totals.dl021Items).padStart(4)}/${String(totals.dl021Fields).padStart(4)} | ${String(totals.dl018Items).padStart(5)}`);

    // Detailed list of DL-026 items
    const dl026Items = questions.filter(q => q.emptyNonCC.length > 0);
    console.log(`\n--- DL-026 Items (empty non-CC slots) — ${dl026Items.length} items ---`);
    for (const q of dl026Items) {
        console.log(`${q.qid} | CC=${q.cc} | State=${q.questionState} | Empty: ${q.emptyNonCC.join(',')}`);
    }

    // DL-008 items (if any remain)
    const dl008Items = questions.filter(q => q.ccSlotNonEmpty);
    if (dl008Items.length > 0) {
        console.log(`\n--- DL-008 Items (non-empty CC slot) — ${dl008Items.length} items ---`);
        for (const q of dl008Items) {
            console.log(`${q.qid} | CC=${q.cc} | State=${q.questionState}`);
        }
    }

    // Section-Certified DL-026 breakdown
    console.log(`\n--- Certified DL-026 Items by Section ---`);
    for (const sec of Object.keys(sectionStats).sort()) {
        const certDl026 = dl026Items.filter(q => q.section === sec && q.questionState === 'Certified');
        if (certDl026.length > 0) {
            console.log(`Section ${sec}: ${certDl026.length} Certified items with DL-026`);
        }
    }
}

main();
