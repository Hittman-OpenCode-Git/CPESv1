// SAFE re-serialization script — fails loudly, never silently drops data.
// Usage: node scripts/safe_rebuild.js <pack_file_path>
// Before running: take a timestamped backup (see backup protocol).

const fs = require('fs');

const filePath = process.argv[2];
if (!filePath) {
    console.error('ERROR: No file path provided. Usage: node scripts/safe_rebuild.js <path>');
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.error('ERROR: File not found: ' + filePath);
    process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');

// Find the MCQ bank array
const bankMatch = content.match(/const (MCQ_BANK_\w+) = \[/);
if (!bankMatch) {
    console.error('ERROR: Cannot find MCQ_BANK_* declaration in file');
    process.exit(1);
}

const bankName = bankMatch[1];
const prefix = 'const ' + bankName + ' = [';
const arrayStart = content.indexOf(prefix);
if (arrayStart < 0) {
    console.error('ERROR: Cannot locate bank array start');
    process.exit(1);
}

const jsonStart = arrayStart + prefix.length;

// Find matching ] by bracket depth
let depth = 1, pos = jsonStart;
while (pos < content.length && depth > 0) {
    if (content[pos] === '[') depth++;
    if (content[pos] === ']') depth--;
    pos++;
}

if (depth !== 0) {
    console.error('ERROR: Unbalanced brackets — cannot find matching ]');
    process.exit(1);
}

const jsonEnd = pos - 1;
const restOfFile = content.substring(pos);
const jsonString = content.substring(jsonStart, jsonEnd);

// Parse the entire JSON array — fail on FIRST error
let objects;
try {
    objects = JSON.parse(jsonString);
} catch (e) {
    console.error('ERROR: JSON parse failed at position ' + 
        (e.message.match(/position (\d+)/) || ['unknown'])[1]);
    console.error('Message: ' + e.message);
    
    // Show context around the error
    const pm = e.message.match(/position (\d+)/);
    if (pm) {
        const errPos = parseInt(pm[1]);
        const ctx = jsonString.substring(Math.max(0, errPos - 100), Math.min(jsonString.length, errPos + 100));
        console.error('Context:\n' + JSON.stringify(ctx));
    }
    process.exit(2);
}

if (!Array.isArray(objects)) {
    console.error('ERROR: Parsed content is not an array');
    process.exit(1);
}

console.log('Parsed ' + objects.length + ' objects successfully');

// Re-serialize
const header = content.substring(0, arrayStart);
const spaced = objects.map(o => '  ' + JSON.stringify(o, null, 2).replace(/\n/g, '\n  ')).join(',\n');
const output = header + prefix + '\n' + spaced + '\n];\n' + restOfFile.substring(restOfFile.indexOf('\n'));

fs.writeFileSync(filePath, output);
console.log('Written successfully. File size: ' + output.length + ' bytes');
