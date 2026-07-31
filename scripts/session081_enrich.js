// Session 81 — Pack D Section B Cognitive Upgrade Campaign, Final Wave
// Enrichment script: rewrites 15 low-order items to Analyze/Evaluate
// Batch 1: BD-041, BD-054, BD-055, BD-069, BD-030

const fs = require('fs');
const path = require('path');

const PACK_FILE = 'pack_d_corrected.js';
const PACK_PATH = path.join(__dirname, '..', PACK_FILE);

// Read the pack file
let raw = fs.readFileSync(PACK_PATH, 'utf8');

// Define rewrites as array of { qid, findPattern, replacement }
// We use a simple approach: locate each QID block by its JSON object boundaries
// and replace the entire object with the upgraded version.

const UPGRADES = {

// ── BATCH 1 (5 items) ──

"P1-BD-041": { from: "Apply", to: "Evaluate", topic: "operating budget vs financial budget" },
"P1-BD-054": { from: "Apply", to: "Evaluate", topic: "direct materials purchases budget" },
"P1-BD-055": { from: "Apply", to: "Evaluate", topic: "direct materials purchases budget" },
"P1-BD-069": { from: "Apply", to: "Evaluate", topic: "selling and administrative expense budget" },
"P1-BD-030": { from: "Understand", to: "Analyze", topic: "standard cost setting basis" },

// ── BATCH 2 (5 items) ──
"P1-BD-031": { from: "Understand", to: "Analyze", topic: "standard cost setting basis" },
"P1-BD-032": { from: "Understand", to: "Analyze", topic: "standard cost setting basis" },
"P1-BD-033": { from: "Understand", to: "Analyze", topic: "standard cost setting basis" },
"P1-BD-045": { from: "Understand", to: "Analyze", topic: "time series forecasting components" },

// ── BATCH 3 (5 items) — placeholder, to be continued

};

// For each QID, find its location and prepare the upgrade
let qids = Object.keys(UPGRADES);
let count = 0;

qids.forEach(qid => {
    let pos = raw.indexOf('"QuestionID": "' + qid + '"');
    if (pos === -1) {
        console.log('NOT FOUND: ' + qid);
        return;
    }
    console.log('Found: ' + qid + ' at position ' + pos);
    count++;
});

console.log('\nTotal items found: ' + count + '/' + qids.length);
console.log('Ready for upgrade. Run the apply script to execute.');
