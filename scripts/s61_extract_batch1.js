const fs = require('fs');
const targets = ['P1B-A-110', 'P1-CC-015', 'P1-BD-090', 'P1E-E-013', 'P1-B-088'];
const packMap = {
    pack_a: {file:'pack_a_corrected.js', vn:'MCQ_BANK_A'},
    pack_b: {file:'pack_b_corrected.js', vn:'MCQ_BANK_B'},
    pack_c: {file:'pack_c_corrected.js', vn:'MCQ_BANK_C'},
    pack_d: {file:'pack_d_corrected.js', vn:'MCQ_BANK_D'},
    pack_e: {file:'pack_e_corrected.js', vn:'MCQ_BANK_E'}
};

const results = [];

for (const [pk, info] of Object.entries(packMap)) {
    const content = fs.readFileSync(info.file, 'utf8');
    const data = (new Function(content + '; return ' + info.vn + ';'))();
    for (const q of data) {
        if (targets.includes(q.QuestionID)) {
            const cc = q.CorrectChoice;
            const ewCC = q['ExplanationWrong' + cc];
            const dl008 = (ewCC === '' || ewCC === undefined || ewCC === null) ? 'CLEAN' : 'DIRTY';

            // Check DL-026 (empty non-CC slots)
            const letters = ['A','B','C','D'];
            const emptyNonCC = letters.filter(l => l !== cc && (q['ExplanationWrong'+l] === '' || q['ExplanationWrong'+l] === undefined));
            
            results.push({
                qid: q.QuestionID,
                pack: pk,
                section: q.Section,
                cognitive: q.CognitiveLevel,
                difficulty: q.Difficulty,
                difficultyScore: q.DifficultyScore,
                certified: q.question_state === 'Certified',
                stem: q.Stem,
                choices: q.Choices,
                correctChoice: cc,
                explanationCorrect: q.ExplanationCorrect,
                explanationWrongA: q.ExplanationWrongA || '',
                explanationWrongB: q.ExplanationWrongB || '',
                explanationWrongC: q.ExplanationWrongC || '',
                explanationWrongD: q.ExplanationWrongD || '',
                topic: q.Topic,
                dl008: dl008,
                dl026_emptyNonCC: emptyNonCC.join(',') || 'NONE'
            });
        }
    }
}

console.log(JSON.stringify(results, null, 2));
