// e3q6_fix.js — DL-051 #3c: E3-Q6 rationale repair (key Gamma/B intact).
// Replaces full Correct + Explanation with case-contained versions.
// Byte-exact old strings from TEMP dumps; new strings from TEMP authored files.
// Asserts exactly one occurrence each; aborts otherwise. No other changes.
'use strict';
const fs = require('fs');
const T = 'C:/Users/User/AppData/Local/Temp/opencode/';
const F = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/case_pack_p2_1.js';
const oldC = fs.readFileSync(T + 'e3q6_correct.txt', 'utf8');
const oldE = fs.readFileSync(T + 'e3q6_expl.txt', 'utf8');
const newC = fs.readFileSync(T + 'e3q6_new_correct.txt', 'utf8').trimEnd();
const newE = fs.readFileSync(T + 'e3q6_new_expl.txt', 'utf8').trimEnd();
let t = fs.readFileSync(F, 'utf8');
const count = (s, sub) => s.split(sub).length - 1;
// The Correct text duplicates choice-B text (key==choice verbatim), so the
// old Correct occurs TWICE (choice + Correct key) — both take the identical
// rewrite, keeping key and choice in sync for the scorer. Explanation occurs once.
if (count(t, oldC) !== 2) { console.log('ABORT: Correct occurrences=' + count(t, oldC) + ' (expect 2: choice B + Correct)'); process.exit(1); }
// Explanation twins: Explanation + ExplanationCorrect carry identical text.
if (count(t, oldE) !== 2) { console.log('ABORT: Explanation occurrences=' + count(t, oldE) + ' (expect 2: Explanation + ExplanationCorrect)'); process.exit(1); }
t = t.split(oldC).join(newC).split(oldE).join(newE);
fs.writeFileSync(F, t);
const t2 = fs.readFileSync(F, 'utf8');
console.log('new-Correct present: ' + (t2.includes(newC) ? 'YES' : 'NO'));
console.log('new-Explanation present: ' + (t2.includes(newE) ? 'YES' : 'NO'));
console.log('old-Correct gone: ' + (!t2.includes(oldC) ? 'YES' : 'NO'));
console.log('old-Explanation gone: ' + (!t2.includes(oldE) ? 'YES' : 'NO'));
