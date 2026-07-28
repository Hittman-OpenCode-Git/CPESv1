// S75 Phase 3: Case-level governance state transitions
// Apply In Audit → Certified (READY) or Editorial Queue (EDITORIAL)
// CONTENT cases left unchanged
// Reads each scored_cases file, tracks CaseID context, applies transitions.

const fs = require('fs');
const path = require('path');

// Transition maps: CaseID → new question_state
const transitions = {
    // scored_cases2.js
    "CBQ2-C1":  "Editorial Queue",
    "CBQ2-C2":  "Editorial Queue",
    "CBQ2-C3":  null,                  // CONTENT — stay In Audit
    "CBQ2-D1":  "Editorial Queue",
    "CBQ2-D3":  "Editorial Queue",
    "CBQ2-E1":  "Certified",
    "CBQ2-E2":  "Certified",
    "CBQ2-F1":  "Editorial Queue",
    "CBQ2-F2":  "Certified",
    // scored_cases3.js
    "CBQ3-C1":  "Editorial Queue",
    "CBQ3-C2":  "Certified",
    "CBQ3-C3":  null,                  // CONTENT — stay In Audit
    "CBQ3-D3":  "Editorial Queue",
    "CBQ3-E1":  "Editorial Queue",
    "CBQ3-E2":  "Certified",
    "CBQ3-F1":  "Editorial Queue",
    "CBQ3-F2":  "Certified",
    // scored_cases4.js
    "CBQ4-C2":  "Editorial Queue",
    "CBQ4-D3":  "Certified",
    "CBQ4-E1":  "Editorial Queue",
    "CBQ4-E2":  "Certified",
    "CBQ4-E3":  "Certified",
    "CBQ4-F1":  null,                  // CONTENT — stay In Audit
    "CBQ4-F2":  "Certified",
    "CBQ4-F3":  "Certified",
    // scored_cases5.js
    "CBQ5-A2":  "Editorial Queue",
    "CBQ5-B1":  "Editorial Queue",
    "CBQ5-C1":  "Certified",
    "CBQ5-C2":  "Editorial Queue",
    "CBQ5-D2":  "Certified",
    "CBQ5-D3":  "Editorial Queue",
    "CBQ5-E1":  "Certified",
    "CBQ5-E2":  "Certified",
    "CBQ5-E3":  "Certified",
    "CBQ5-F1":  "Certified",
    "CBQ5-F2":  "Certified",
    "CBQ5-F3":  "Certified",
    "CBQ5-C3":  "Certified",
};

const files = [
    "scored_cases2.js",
    "scored_cases3.js",
    "scored_cases4.js",
    "scored_cases5.js",
];

const results = {};

for (const filename of files) {
    const filepath = path.join(process.cwd(), filename);
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split('\n');
    
    let currentCaseID = null;
    let changes = 0;
    const changedCases = new Set();
    
    const newLines = lines.map(line => {
        // Track current CaseID — first field in case object or within Items
        const caseIDMatch = line.match(/^\s*CaseID:\s*"(CBQ[2-5]?-[A-F]\d+\b)/);
        if (caseIDMatch) {
            currentCaseID = caseIDMatch[1];
        }
        
        // Check for question_state: "In Audit" that should be transitioned
        if (currentCaseID && transitions.hasOwnProperty(currentCaseID)) {
            const newState = transitions[currentCaseID];
            if (newState && line.match(/question_state:\s*"In Audit"/)) {
                changes++;
                changedCases.add(currentCaseID);
                return line.replace(/"In Audit"/, `"${newState}"`);
            }
        }
        
        return line;
    });
    
    const newContent = newLines.join('\n');
    
    // Only write if there were changes
    if (changes > 0) {
        fs.writeFileSync(filepath, newContent, 'utf8');
    }
    
    results[filename] = { changes, cases: [...changedCases] };
    console.log(`${filename}: ${changes} changes across ${changedCases.size} cases`);
    for (const c of changedCases) {
        console.log(`  ${c} → ${transitions[c]}`);
    }
}

console.log("\n=== SUMMARY ===");
const totalChanges = Object.values(results).reduce((sum, r) => sum + r.changes, 0);
console.log(`Total changes: ${totalChanges}`);
