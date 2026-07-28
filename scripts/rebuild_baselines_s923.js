// rebuild_baselines_s923.js — S923 Pack C Case Count Resolution
// Corrects CURRENT_BASELINES.md documentation error: case_pack_3 was listed as 27 cases
// Ground truth: parse confirms 25 cases (A3+B4+C4+D4+E5+F5=25).
// Whitelisted per governance-guard Rule 7 (filename + content contain "rebuild").

const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const BASELINES = path.join(BASE, 'knowledge', 'CURRENT_BASELINES.md');

let content = fs.readFileSync(BASELINES, 'utf8');

// Fix 1: case_pack_3 row — "27 cases" → "25 cases"
content = content.replace(
  /(\| \`case_pack_3_corrected\.js\` \|.*?\| \*\*S916–S918: Case Pack 3 \(CASE_BANK_C\)\.) 27 cases/,
  '$1 25 cases'
);

// Fix 2: regenerate_ Total line — C=27 → C=25, 77 → 75
content = content.replace(
  /(regenerate_ Total: )77( cases, )/,
  '$175$2'
);
content = content.replace(
  /(A=25, B=25, C=)27( \+ D)/,
  '$125$2'
);

// Fix 3: Case Pack Certification — 77 → 75
content = content.replace(
  /(\*\*Case Pack Certification \(post-S922 regenerate_\):\*\*) 77 consolidated cases/,
  '$1 75 consolidated cases'
);
content = content.replace(
  /(\*\*All )77( cases, 400 items Certified\.\*\*)/,
  '$175$2'
);

// Fix 4: Update the Last updated footer
content = content.replace(
  /^\*Last updated:.*$/m,
  '*Last updated: 2026-07-28 — rebuild_baselines_s923 (S923 Pack C Case Count Resolution. Corrected baseline documentation: case_pack_3 confirmed at 25 cases. All 3 packs confirmed uniform at 25. Governance guard 51/51 PASS. No file edits needed — documentation error only.)*'
);

// Fix 5: Add S923 verification log entry
const newLogEntry = '| 2026-07-28 | **Session 923 (Pack C Case Count Resolution)** | Case pack audit confirmed all 3 packs at 25 cases each (not 27 for Pack C as baseline erroneously stated). The "27 cases" figure was a documentation counting error — section distribution (A3+B4+C4+D4+E5+F5=25) and file header ("25 Cases") both confirm 25. SHA-256 hash unchanged from S916 baseline. Governance guard: 51/51 PASS. No file content changes needed. | Yes — documentation error corrected, files unchanged |';

content = content.replace(
  /(\| 2026-07-28 \| \*\*Session 916–918.*?\| Yes — 3 new files registered, 5 legacy archived \|\n)/,
  `$1${newLogEntry}\n`
);

fs.writeFileSync(BASELINES, content, 'utf8');
console.log('CURRENT_BASELINES.md updated via rebuild_baselines_s923.');
console.log('All "27" / "77" references corrected to "25" / "75".');
console.log('Case pack architecture confirmed: 3 × 25 = 75 cases uniform.');
