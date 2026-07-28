const fs = require('fs');
const path = require('path');

const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];

for (const packFile of packs) {
    const content = fs.readFileSync(path.join(__dirname, '..', packFile), 'utf8');
    const regex = /"QuestionID":\s*"([^"]+)"/g;
    const qidMatches = [...content.matchAll(regex)];
    
    // For each QID found, check if Archived appears near it
    const archived = [];
    let lastIndex = 0;
    for (const match of qidMatches) {
        const qid = match[1];
        const pos = match.index;
        // Look forward ~3000 chars for "Archived"
        const window = content.substring(pos, pos + 3000);
        if (window.includes('"Archived"')) {
            archived.push(qid);
        }
    }
    console.log(`${packFile} (${archived.length} archived):`);
    if (archived.length > 0) {
        console.log(archived.join(', '));
    }
    console.log('');
}
