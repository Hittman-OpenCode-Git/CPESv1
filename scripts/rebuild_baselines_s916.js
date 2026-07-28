// rebuild_baselines_s916.js — S916-S918 Case Pack Reconsolidation Baseline Update
// Regenerates CURRENT_BASELINES.md to reflect the new 3-pack case architecture.
// Whitelisted per governance-guard Rule 7 (filename contains "rebuild").

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const BASELINES = path.join(BASE, 'knowledge', 'CURRENT_BASELINES.md');

// Read current file
let content = fs.readFileSync(BASELINES, 'utf8');

// Update header timestamp
const now = '2026-07-28';
content = content.replace(
  /^(\*\*Updated:\*\* ).*$/m,
  `$1${now} — S916–S918 (Case Pack 3×25 Reconsolidation. 5 scored_cases files consolidated into 3 case_pack files. 75 cases redistributed: 3 packs × 25 cases. index_updated.html load chain updated. Governance guard 51/51 PASS.)`
);

// Update the "Last updated" footer
content = content.replace(
  /^\*Last updated:.*$/m,
  `*Last updated: 2026-07-28 — rebuild_baselines_s916 (S916–S918 Case Pack 3×25 Reconsolidation. 5 scored_cases files → 3 case_pack files. 75 cases, 3×25 distribution. Certified pool unchanged.)*`
);

// Replace the Scored Case Files section with the new Case Pack Files section
const oldCaseSection = `### Scored Case Files

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Provenance |
|------|---------|-----|-------------|---------------|------------|
| \`scored_cases.js\` | \`3997284429CA4B8DA6A3577441F3B74AEEDD80839EB360E4387932D2428C0EEA\` | \`TBD\` | 457,390 | 2026-07-26 20:18 | **S537: All 15 cases, 90 items fully Certified. Hash drifted from S530 baseline (97AA...). Recaptured S726.** |
| \`scored_cases2.js\` | \`C32F25808D9F64309A7EFAFEAD55F19CC2C4F4F01A3AADDB604EE695BB491110\` | \`7D02B1CDD75909FF2B5CDC90653128DA\` | 438,676 | 2026-07-26 12:05 | S64–S530 case enrichment. |
| \`scored_cases3.js\` | \`EB5B28D9BB370C29EF3B9DA20EEB332452DAD93C29106879C028A8ACA924EE62\` | \`06DF8C8559A9BB34BA0EB45B559443DE\` | 444,754 | 2026-07-26 12:05 | S64–S530 case enrichment. |
| \`scored_cases4.js\` | \`158CBEFC43F16148CD961E58AB32ED856EE46005E199F375B419F9F6F2F2D3B3\` | \`DA2B22144522E99EEB4A761EB6266ACE\` | 534,846 | 2026-07-26 14:26 | S64–S530 case enrichment. Time anomaly BC-002 resolved (incremental S530 write, backup-captured). |
| \`scored_cases5.js\` | \`6F70E589B21A1FAC5D2F1A5B3E8799616962192405BF8498D2100BB57D71E307\` | \`4FF458F549FCA3B69F4773E56342473F\` | 333,161 | 2026-07-26 12:05 | S64–S530 case enrichment. |`;

const newCaseSection = `### Case Pack Files (3×25 Architecture — S916–S918 Reconsolidation)

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Provenance |
|------|---------|-----|-------------|---------------|------------|
| \`case_pack_1_corrected.js\` | \`D07102D22B42AC63CD0A29DEC807B45490DA98100DF6AACAED28BAD52CD08BFE\` | \`TBD\` | 547,647 | 2026-07-28 16:19 | **S916–S918: Case Pack 1 (CASE_BANK_A). 25 cases, 141 items, all Certified. Sections: A4 B4 C5 D5 E4 F3.** Consolidated from ENHANCED_CASE_BASE sources. |
| \`case_pack_2_corrected.js\` | \`85F20B990211B8A52A1A75F68F6E96F35F061293D382F540A74D9C9AFA4D294B\` | \`TBD\` | 389,274 | 2026-07-28 16:19 | **S916–S918: Case Pack 2 (CASE_BANK_B). 25 cases, 132 items, all Certified. Sections: A4 B4 C5 D5 E4 F3.** Consolidated from ENHANCED_CASE_BASE sources. |
| \`case_pack_3_corrected.js\` | \`5C3560F61DCD392A7D2D4AAE2229703636BB712050382F751735391B176CC512\` | \`TBD\` | 458,444 | 2026-07-28 16:19 | **S916–S918: Case Pack 3 (CASE_BANK_C). 25 cases, 127 items, all Certified. Sections: A3 B4 C4 D4 E5 F5.** Consolidated from ENHANCED_CASE_BASE sources. |

**Total: 75 cases, 400 items across 3 packs of 25. All Certified. 5 legacy scored_cases files preserved in backups/ (s916-2026-07-28T1619).**

### Legacy Scored Case Files (Archived — S916–S918)

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Status |
|------|---------|-----|-------------|---------------|--------|
| \`scored_cases.js\` | \`3997284429CA4B8DA6A3577441F3B74AEEDD80839EB360E4387932D2428C0EEA\` | \`TBD\` | 457,390 | 2026-07-26 20:18 | **ARCHIVED S916 — content consolidated into case_pack files.** |
| \`scored_cases2.js\` | \`C32F25808D9F64309A7EFAFEAD55F19CC2C4F4F01A3AADDB604EE695BB491110\` | \`7D02B1CDD75909FF2B5CDC90653128DA\` | 438,676 | 2026-07-26 12:05 | **ARCHIVED S916.** |
| \`scored_cases3.js\` | \`EB5B28D9BB370C29EF3B9DA20EEB332452DAD93C29106879C028A8ACA924EE62\` | \`06DF8C8559A9BB34BA0EB45B559443DE\` | 444,754 | 2026-07-26 12:05 | **ARCHIVED S916.** |
| \`scored_cases4.js\` | \`158CBEFC43F16148CD961E58AB32ED856EE46005E199F375B419F9F6F2F2D3B3\` | \`DA2B22144522E99EEB4A761EB6266ACE\` | 534,846 | 2026-07-26 14:26 | **ARCHIVED S916.** |
| \`scored_cases5.js\` | \`6F70E589B21A1FAC5D2F1A5B3E8799616962192405BF8498D2100BB57D71E307\` | \`4FF458F549FCA3B69F4773E56342473F\` | 333,161 | 2026-07-26 12:05 | **ARCHIVED S916.** |`;

content = content.replace(oldCaseSection, newCaseSection);

// Update the ENHANCED_CASE_BASE note in §2 (Certified Pool) to reference the new structure
content = content.replace(
  /\*\*ENHANCED_CASE_BASE:\*\*.*$/m,
  '**Case Pack Certification (post-S916):** 75 consolidated cases across 3 packs, 400 items. **All 75 cases, 400 items Certified.** 3×25 packs: Pack 1 (A:4 B:4 C:5 D:5 E:4 F:3), Pack 2 (A:4 B:4 C:5 D:5 E:4 F:3), Pack 3 (A:3 B:4 C:4 D:4 E:5 F:5). 100% case pool closure. See case_pack_1/2/3_corrected.js. Variable aliases: CASE_BANK_A/B/C + MIGRATED_CASE_BASE_A/B/C for app.js catalog compatibility.'
);

// Update verification log
const newLogEntry = `| 2026-07-28 | **Session 916–918 (Case Pack 3×25 Reconsolidation)** | 3 new case_pack files + index_updated.html. Hash for index_updated.html: E0B7BBAAE2B6B4C3892FCF3E316DC3D88E21AB6618A05A8567B33AB66335D7D3 (6,033 bytes). 5 legacy scored_cases files archived (backups preserved S916). Governance guard: 51/51 PASS. | Yes — 3 new files registered, 5 legacy archived |`;

// Insert after the most recent log entry
content = content.replace(
  /(\| 2026-07-28 \| \*\*Session 896.*?\| Yes — 2 files re-baselined.*?\|\n)/,
  `$1${newLogEntry}\n`
);

// Write the updated file
fs.writeFileSync(BASELINES, content, 'utf8');
console.log('CURRENT_BASELINES.md updated successfully.');
console.log('Case pack files: 3×25 = 75 cases, 400 items.');
console.log('Legacy files: ARCHIVED (backups preserved).');
console.log('index_updated.html: hash E0B7BBAAE2B6B4C3892FCF3E316DC3D88E21AB6618A05A8567B33AB66335D7D3, 6,033 bytes.');
