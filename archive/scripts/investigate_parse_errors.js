// Quick investigation of parse errors in pack files
const fs = require('fs');

function investigateFile(filePath, maxErrors = 5) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/=\s*\[/);
    let pos = match.index + match[0].length;
    const objects = [];
    let i = 0;
    
    while (pos < content.length) {
        while (pos < content.length && /\s/.test(content[pos])) pos++;
        if (pos >= content.length) break;
        if (content[pos] === ']') break;
        if (content[pos] === ',') { pos++; continue; }
        
        if (content[pos] === '{') {
            let start = pos, depth = 0;
            let inString = false, stringChar = null, escape = false;
            while (pos < content.length) {
                const ch = content[pos];
                if (escape) { escape = false; pos++; continue; }
                if (inString) {
                    if (ch === '\\') { escape = true; }
                    else if (ch === stringChar) { inString = false; stringChar = null; }
                    pos++; continue;
                }
                if (ch === '"' || ch === "'") { inString = true; stringChar = ch; pos++; continue; }
                if (ch === '{') depth++;
                else if (ch === '}') {
                    depth--;
                    if (depth === 0) { pos++; objects.push({ str: content.substring(start, pos), idx: i }); break; }
                }
                pos++;
            }
            i++;
        } else {
            pos++;
        }
    }
    
    console.log(`File: ${filePath} — ${objects.length} objects extracted`);
    let errorCount = 0;
    for (const obj of objects) {
        try {
            JSON.parse(obj.str);
        } catch (e) {
            errorCount++;
            if (errorCount <= maxErrors) {
                const errPos = parseInt((e.message.match(/position (\d+)/) || [0, '0'])[1] || '0');
                const ctx = obj.str.substring(Math.max(0, errPos - 80), errPos + 80);
                console.log(`\n  Index ${obj.idx}: ${e.message}`);
                console.log(`  Context around pos ${errPos}:`);
                console.log(`  ...${ctx}...`);
            }
        }
    }
    console.log(`  Total parse errors: ${errorCount} / ${objects.length}`);
    return { total: objects.length, errors: errorCount };
}

console.log('=== PACK A ===');
investigateFile('pack_a_corrected.js', 3);

console.log('\n=== PACK C ===');
investigateFile('pack_c_corrected.js', 3);

console.log('\n=== PACK D ===');
investigateFile('pack_d_corrected.js', 3);
