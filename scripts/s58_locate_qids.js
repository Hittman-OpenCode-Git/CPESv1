const fs = require('fs');

const targets = {
    'pack_c_corrected.js': ['P1-EC-033','P1-EC-036','P1-EC-037','P1-EC-042','P1-EC-043','P1-EC-045','P1-EC-046','P1-EC-047','P1-EC-050','P1-EC-051'],
    'pack_d_corrected.js': ['P1-ED-019','P1-ED-022','P1-ED-024','P1-ED-027','P1-ED-029','P1-ED-030','P1-ED-032','P1-ED-034','P1-ED-037','P1-ED-039']
};

for (const [file, qids] of Object.entries(targets)) {
    const content = fs.readFileSync(file, 'utf8');
    console.log(`=== ${file} ===`);
    for (const qid of qids) {
        const idx = content.indexOf(`"QuestionID": "${qid}"`);
        if (idx === -1) {
            console.log(`  ${qid}: NOT FOUND`);
            continue;
        }
        // Find line number
        const line = content.substring(0, idx).split('\n').length;
        // Extract ~300 chars of context
        const context = content.substring(idx, idx + 300).replace(/\n/g, '\\n');
        console.log(`  ${qid}: line ${line}`);
        console.log(`    Context: ${context}`);
        console.log('');
    }
}
