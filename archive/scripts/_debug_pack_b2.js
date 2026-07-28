// Debug: Find exact syntax error in full Pack B array
const fs = require("fs");
const cleaned = fs.readFileSync("scripts/_pack_b_cleaned.js", "utf8");

const arrayStart = cleaned.indexOf("const MCQ_BANK_B = [");
const content = cleaned.substring(arrayStart + 22);

// String-aware bracket matcher for full array
let braceDepth = 1;
let inString = false;
let stringChar = "";
let escape = false;
let arrayEnd = -1;
for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (escape) { escape = false; continue; }
    if (inString) {
        if (ch === '\\') { escape = true; continue; }
        if (ch === stringChar) { inString = false; stringChar = ""; }
        continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === '[') braceDepth++;
    else if (ch === ']') {
        braceDepth--;
        if (braceDepth === 0) { arrayEnd = i; break; }
    }
}

const arrayStr = content.substring(0, arrayEnd + 1);

// Try vm.runInNewContext
const vm = require("vm");
try {
    const script = new vm.Script(arrayStr);
    const ctx = vm.createContext({});
    const result = script.runInContext(ctx);
    console.log("vm.runInContext OK:", Array.isArray(result) ? result.length + " items" : typeof result);
} catch (e) {
    console.log("vm FAIL:", e.message.substring(0, 200));
    console.log("Stack:", (e.stack || "").split("\n")[1]);
}

// Try direct eval of each object and rebuilding array
console.log("\n--- Object-by-object parsing ---");
const objects = [];
let objDepth = 0;
inString = false;
stringChar = "";
escape = false;
let currentObjStart = -1;

// Skip the leading "[" or ","
let objStr = "";
let objCount = 0;
let parseErrors = 0;

// Find all top-level objects using brace matching
let i = 0;
while (i < arrayStr.length) {
    const ch = arrayStr[i];
    
    // Skip whitespace and array delimiters
    if (!inString && (ch === ' [' || ch === '[' || ch === ',' || ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t')) {
        if (ch === '{') {
            currentObjStart = i;
            objDepth = 1;
            inString = false;
        }
        i++;
        continue;
    }
    
    if (!inString && ch === '{') {
        if (currentObjStart === -1) {
            currentObjStart = i;
        }
        objDepth++;
        i++;
        continue;
    }
    
    if (escape) { escape = false; i++; continue; }
    if (ch === '\\' && inString) { escape = true; i++; continue; }
    if (ch === '"') { inString = !inString; i++; continue; }
    
    if (!inString && ch === '}') {
        objDepth--;
        if (objDepth === 0) {
            const objStr = arrayStr.substring(currentObjStart, i + 1);
            try {
                const fn = new Function("return " + objStr);
                const obj = fn();
                objects.push(obj);
                objCount++;
            } catch (e) {
                parseErrors++;
                if (parseErrors <= 3) {
                    console.log("Parse error at obj " + (objCount + 1) + ":", e.message.substring(0, 100));
                    console.log("  Object start:", objStr.substring(0, 100));
                }
            }
            currentObjStart = -1;
        }
    }
    
    i++;
}

console.log(`Parsed ${objCount} objects, ${parseErrors} errors`);
console.log("Last object QID:", objects.length > 0 ? objects[objects.length - 1].QuestionID : "NONE");

// Section breakdown
const secCount = {};
objects.forEach(o => {
    const s = o.Section || "MISSING";
    secCount[s] = (secCount[s] || 0) + 1;
});
console.log("Sections:", JSON.stringify(secCount));

// State breakdown
const stateCount = {};
objects.forEach(o => {
    const s = o.question_state || "MISSING";
    stateCount[s] = (stateCount[s] || 0) + 1;
});
console.log("States:", JSON.stringify(stateCount));
