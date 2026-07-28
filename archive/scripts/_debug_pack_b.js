// Debug parse: read cleaned Pack B, try to eval array
const fs = require("fs");
const cleaned = fs.readFileSync("scripts/_pack_b_cleaned.js", "utf8");

const arrayStart = cleaned.indexOf("const MCQ_BANK_B = [");
const content = cleaned.substring(arrayStart + 22); // skip "const MCQ_BANK_B = ["

// String-aware bracket matcher
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
    
    if (ch === '"' || ch === "'") {
        inString = true;
        stringChar = ch;
        continue;
    }
    
    if (ch === '[') braceDepth++;
    else if (ch === ']') {
        braceDepth--;
        if (braceDepth === 0) { arrayEnd = i; break; }
    }
}

console.log("Array end index:", arrayEnd);
console.log("Brace depth at end:", braceDepth);

if (arrayEnd === -1) {
    console.log("Could not find array end!");
    process.exit(1);
}

const arrayStr = content.substring(0, arrayEnd + 1);
console.log("Array string length:", arrayStr.length);
console.log("QuestionID markers:", (arrayStr.match(/"QuestionID":/g) || []).length);

// Try Function() constructor
try {
    const fn = new Function("const arr = " + arrayStr + "; return arr;");
    const result = fn();
    console.log("Function() SUCCESS:", result.length, "items");
    
    if (result.length === 500) {
        console.log("Match: 500 items");
    } else {
        console.log("MISMATCH: expected 500, got", result.length);
    }
} catch (e) {
    console.log("Function() FAIL:", e.message);
    
    // Try to find the exact syntax error location
    const stack = e.stack || "";
    console.log("Stack:", stack.substring(0, 500));
    
    // Try incremental parsing
    console.log("\nTrying incremental parse...");
    for (let chunk = 100; chunk <= arrayStr.length; chunk += 10000) {
        try {
            const fn = new Function("const arr = " + arrayStr.substring(0, chunk) + "]; return arr;");
            fn();
        } catch (e2) {
            console.log("First failure at chunk length", chunk);
            console.log("Error:", e2.message.substring(0, 200));
            
            // Show surrounding context
            const errorPoint = Math.max(0, chunk);
            console.log("Context around position", errorPoint);
            console.log("  ..." + arrayStr.substring(Math.max(0, errorPoint - 50), errorPoint + 50) + "...");
            break;
        }
    }
}

// Also try: simpler approach - eval each object individually
console.log("\n--- Alternative: Extract first object ---");
const firstObjStart = arrayStr.indexOf("{");
const objContent = arrayStr.substring(firstObjStart);
let objDepth = 0;
inString = false;
stringChar = "";
escape = false;
let firstObjEnd = -1;

for (let i = 0; i < objContent.length; i++) {
    const ch = objContent[i];
    if (escape) { escape = false; continue; }
    if (inString) {
        if (ch === '\\') { escape = true; continue; }
        if (ch === stringChar) { inString = false; stringChar = ""; }
        continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === '{') objDepth++;
    else if (ch === '}') {
        objDepth--;
        if (objDepth === 0) { firstObjEnd = i; break; }
    }
}

if (firstObjEnd > 0) {
    const firstObj = objContent.substring(0, firstObjEnd + 1);
    console.log("First object length:", firstObj.length);
    try {
        const fn = new Function("return " + firstObj);
        const obj = fn();
        console.log("First object parsed:");
        console.log("  QuestionID:", obj.QuestionID);
        console.log("  Section:", obj.Section);
        console.log("  CorrectChoice:", obj.CorrectChoice);
        console.log("  Stem:", (obj.Stem || "").substring(0, 80));
        console.log("  Choices:", JSON.stringify(obj.Choices || {}));
    } catch (e) {
        console.log("First object parse FAIL:", e.message);
    }
}
