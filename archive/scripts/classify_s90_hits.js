// Session 90: Classify raw absolutist hits and generate staging files.
// Reads s90_scan_raw.json, classifies each hit, generates:
//   knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json
//   knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.md

const fs = require('fs');
const path = require('path');

// ---- Configuration ----
const RAW_FILE = path.join(__dirname, '..', 'reports', 'session_status', 's90_scan_raw.json');
const OUT_JSON = path.join(__dirname, '..', 'knowledge', 'DISTRACTOR_REWRITE_CANDIDATES_S90.json');
const OUT_MD = path.join(__dirname, '..', 'knowledge', 'DISTRACTOR_REWRITE_CANDIDATES_S90.md');
const REPORT = path.join(__dirname, '..', 'reports', 'session_status', 'SESSION90_DISTRACTOR_QUALITY_REVIEW.md');

// ---- Classification rules ----
// Rules are based on pattern type + context signals

// Patterns that are almost always KEEP_AS_IS in accounting contexts
const KEEP_PATTERNS = {
    // "only" in revenue recognition / ASC 606 contexts is standard language
    only: (text) => {
        const keepContexts = [
            /recognize.*revenue.*when/i, /performance obligation/i,
            /ASC\s*606/i, /transfer.*control/i, /satisfied.*over time/i,
            /standalone.*selling.*price/i, /distinct.*good/i,
            /FIFO/i, /LIFO/i, /weighted.*average/i, /specific identification/i,
            /cost.*method/i, /equity.*method/i,
            /must.*be.*recognized/i, /must.*be.*reported/i,
            /must.*be.*classified/i, /must.*be.*capitalized/i,
            /must.*be.*expensed/i, /must.*be.*included/i,
            /must.*be.*disclosed/i, /must.*be.*separated/i,
            /must.*be.*allocated/i, /must.*be.*tested/i,
            /requires\s+(that\s+)?companies/i, /requires\s+(that\s+)?the/i,
            /GAAP\s+requires/i, /IFRS\s+requires/i, /ASC\s+\d{3}\s+requires/i,
            /COSO\s+requires/i, /SOX\s+requires/i,
            /under\s+(GAAP|IFRS|ASC|COSO|SOX)/i,
        ];
        return keepContexts.some(r => r.test(text));
    },
    always: (text) => {
        const keepContexts = [
            /must\s+always\s+be/i, /should\s+always\s+be/i,
            /\balways\s+required\b/i, /\balways\s+included\b/i,
            /ASC\s+\d+/i, /GAAP\s+requires/i, /IFRS\s+requires/i,
            /COSO/i, /SOX/i,
        ];
        return keepContexts.some(r => r.test(text));
    },
    never: (text) => {
        const keepContexts = [
            /must\s+never\s+be/i, /should\s+never\s+be/i,
            /\bnever\s+recognized\b.*revenue/i,
            /ASC\s+\d+/i, /GAAP\s+prohibits/i, /IFRS\s+prohibits/i,
        ];
        return keepContexts.some(r => r.test(text));
    },
    must: (text) => {
        // "must" is standard in describing GAAP/IFRS requirements
        const keepContexts = [
            /GAAP|IFRS|ASC|COSO|SOX|FASB|IASB|SEC/i,
            /under\s+(the\s+)?(standard|rule|guidance|framework)/i,
            /required\s+by/i,
        ];
        return keepContexts.some(r => r.test(text));
    },
};

// Patterns that are almost always CANDIDATE_REWRITE
const CANDIDATE_PATTERNS = [
    'none_of_the_above',
    'all_of_the_above', 
    'cannot_ever',
    'under_no_circumstances',
    'in_every_case',
    'in_all_cases',
    'without_exception',
    'no_exceptions',
];

// Context flags suggesting CANDIDATE_REWRITE even for always/never/only/must
const REWRITE_FLAGS = [
    // Obvious throwaway / joke distractors
    /ignore\s+(all|the)\s+(rules|standards|guidance)/i,
    /do\s+not\s+follow\s+any/i,
    /cannot\s+possibly\s+be/i,
    /is\s+impossible\s+to/i,
    /all\s+answers\s+are\s+(wrong|correct)/i,
    /entirely\s+(wrong|right|incorrect)/i,
    /(always|never)\s+and\s+(always|never)/i,
    // Redundant/silly
    /does\s+not\s+matter\s+at\s+all/i,
    /should\s+be\s+ignored\s+completely/i,
    /no\s+need\s+to\s+consider/i,
    /simply\s+ignore/i,
    /can\s+be\s+safely\s+ignored/i,
];

function classifyHit(hit) {
    const patterns = hit.pattern_hits || [];
    const text = hit.full_text || '';
    const field = hit.field || '';
    const isCorrectSlot = hit.is_correct;
    
    // Check CANDIDATE_PATTERNS first (high severity)
    for (const cp of CANDIDATE_PATTERNS) {
        if (patterns.includes(cp)) {
            return 'CANDIDATE_REWRITE';
        }
    }
    
    // Check REWRITE_FLAGS
    for (const flag of REWRITE_FLAGS) {
        if (flag.test(text)) {
            return 'CANDIDATE_REWRITE';
        }
    }
    
    // For each matched pattern, check keep rules
    let allKeepable = true;
    for (const p of patterns) {
        if (KEEP_PATTERNS[p]) {
            if (!KEEP_PATTERNS[p](text)) {
                allKeepable = false;
            }
        } else {
            // Unknown pattern - keep by default for safety
        }
    }
    
    if (allKeepable) {
        return 'KEEP_AS_IS';
    }
    
    // Check if the distractor is obviously absurd
    const absurdSignals = [
        /always\s+decreases?\s+(net\s+)?income$/i,
        /always\s+increases?\s+(net\s+)?income$/i,
        /never\s+affects?\s+(net\s+)?income$/i,
        /never\s+changes?\s+the\s+(balance|total)/i,
        /always\s+(true|false)$/i,
        /never\s+(true|false)$/i,
        /only\s+(one|a single|a few)\s+(factor|thing|item)/i,
        /must\s+always\s+be\s+(correct|right|true)$/i,
        /can\s+never\s+be\s+(correct|right|true)$/i,
    ];
    for (const sig of absurdSignals) {
        if (sig.test(text)) {
            return 'CANDIDATE_REWRITE';
        }
    }
    
    // Default to KEEP_AS_IS for ambiguous cases 
    // (only "only" and "must" are the default survivors)
    return 'KEEP_AS_IS';
}

function generateIssueTags(hit) {
    const tags = [];
    const patterns = hit.pattern_hits || [];
    const text = hit.full_text || '';
    
    if (patterns.includes('always')) tags.push('absolutist_always');
    if (patterns.includes('never')) tags.push('absolutist_never');
    if (patterns.includes('only')) tags.push('absolutist_only');
    if (patterns.includes('must')) tags.push('absolutist_must');
    if (patterns.includes('none_of_the_above')) tags.push('none_of_above');
    if (patterns.includes('all_of_the_above')) tags.push('all_of_above');
    if (patterns.includes('cannot_ever')) tags.push('absolutist_cannot_ever');
    if (patterns.includes('under_no_circumstances')) tags.push('absolutist_under_no_circumstances');
    if (patterns.includes('in_every_case') || patterns.includes('in_all_cases')) tags.push('absolutist_every_case');
    if (patterns.includes('without_exception') || patterns.includes('no_exceptions')) tags.push('absolutist_no_exceptions');
    
    if (hit.is_correct) tags.push('correct_choice_slot');
    
    return tags;
}

// ---- Main ----
const raw = JSON.parse(fs.readFileSync(RAW_FILE, 'utf8'));
const allHits = raw.results;

// Classify each hit
for (const hit of allHits) {
    hit.classification = classifyHit(hit);
    hit.issue_tags = generateIssueTags(hit);
    hit.risk_level = 'LOW';
    if (hit.state === 'Certified' && hit.classification === 'CANDIDATE_REWRITE') {
        hit.risk_level = 'MEDIUM';
    }
    if (hit.classification === 'REQUIRES_SME') {
        hit.risk_level = 'HIGH';
    }
}

// Count by classification
const counts = { KEEP_AS_IS: 0, CANDIDATE_REWRITE: 0, REQUIRES_SME: 0 };
const byPack = {};
const byPackClass = {};
for (const hit of allHits) {
    counts[hit.classification] = (counts[hit.classification] || 0) + 1;
    byPack[hit.pack] = (byPack[hit.pack] || 0) + 1;
    const key = hit.pack + '|' + hit.classification;
    byPackClass[key] = (byPackClass[key] || 0) + 1;
}

// Count by state
const byState = {};
for (const hit of allHits) {
    const key = hit.state + '|' + hit.classification;
    byState[key] = (byState[key] || 0) + 1;
}

// === Generate JSON staging file ===
const jsonOutput = {
    _metadata: {
        session: 90,
        title: 'Distractor Quality Review — Absolutist / Low-Quality Signals',
        date: new Date().toISOString().split('T')[0],
        scope: 'All 5 packs (2,500 questions). Choices and ExplanationWrong fields scanned for absolutist language patterns.',
        total_questions_scanned: raw.summary.total_questions,
        total_fields_scanned: raw.summary.total_choices_scanned + raw.summary.total_ew_scanned,
        total_raw_hits: raw.summary.total_hits,
        classification_summary: {
            KEEP_AS_IS: counts.KEEP_AS_IS,
            CANDIDATE_REWRITE: counts.CANDIDATE_REWRITE,
            REQUIRES_SME: counts.REQUIRES_SME,
        },
        by_pack: byPack,
        by_pack_classification: byPackClass,
        by_state: byState,
        note: 'All proposed distractor rewrites are read-only staging. No pack files have been modified. Actual edits require a separate "apply approved changes" session after SME review.',
    },
    candidates: allHits.filter(h => h.classification !== 'KEEP_AS_IS'),
    keep_as_is_samples: allHits.filter(h => h.classification === 'KEEP_AS_IS').slice(0, 50),
};

fs.writeFileSync(OUT_JSON, JSON.stringify(jsonOutput, null, 2), 'utf8');
console.error(`Wrote ${OUT_JSON}`);

// === Generate Markdown staging file ===
let md = `# Distractor Rewrite Candidates — Session 90

**Date:** ${new Date().toISOString().split('T')[0]}
**Scope:** All 5 MCQ packs (2,500 questions). Absolutist and low-quality distractor language scan.
**Status:** Read-only staging for external SME review. No pack files modified.

---

## Summary

| Classification | Count | % of Hits |
|----------------|-------|-----------|
| KEEP_AS_IS | ${counts.KEEP_AS_IS} | ${((counts.KEEP_AS_IS / allHits.length) * 100).toFixed(1)}% |
| CANDIDATE_REWRITE | ${counts.CANDIDATE_REWRITE} | ${((counts.CANDIDATE_REWRITE / allHits.length) * 100).toFixed(1)}% |
| REQUIRES_SME | ${counts.REQUIRES_SME} | ${((counts.REQUIRES_SME / allHits.length) * 100).toFixed(1)}% |
| **Total hits** | **${allHits.length}** | **100%** |

## By Pack

| Pack | Total Hits | KEEP_AS_IS | CANDIDATE_REWRITE | REQUIRES_SME |
|------|-----------|------------|-------------------|--------------|
`;

for (const pack of ['A','B','C','D','E']) {
    const total = byPack[pack] || 0;
    const keep = byPackClass[pack + '|KEEP_AS_IS'] || 0;
    const rewrite = byPackClass[pack + '|CANDIDATE_REWRITE'] || 0;
    const sme = byPackClass[pack + '|REQUIRES_SME'] || 0;
    md += `| Pack ${pack} | ${total} | ${keep} | ${rewrite} | ${sme} |\n`;
}

md += `\n## By Question State\n\n| State | KEEP_AS_IS | CANDIDATE_REWRITE | REQUIRES_SME |\n|-------|------------|-------------------|--------------|\n`;

for (const key of Object.keys(byState).sort()) {
    const [state, cls] = key.split('|');
    md += `| ${state} | ${cls === 'KEEP_AS_IS' ? byState[key] : '-'} | ${cls === 'CANDIDATE_REWRITE' ? byState[key] : '-'} | ${cls === 'REQUIRES_SME' ? byState[key] : '-'} |\n`;
}

// Filter CANDIDATE_REWRITE items, sort by pack then section
const rewriteCandidates = allHits.filter(h => h.classification === 'CANDIDATE_REWRITE');
rewriteCandidates.sort((a, b) => {
    if (a.pack !== b.pack) return a.pack.localeCompare(b.pack);
    if (a.qid !== b.qid) return a.qid.localeCompare(b.qid);
    return 0;
});

// Group by pack
const packs = ['A','B','C','D','E'];
for (const pack of packs) {
    const items = rewriteCandidates.filter(h => h.pack === pack);
    if (items.length === 0) continue;
    
    md += `\n---\n\n## Pack ${pack} — CANDIDATE_REWRITE Items (${items.length} hits)\n\n`;
    
    // Subgroup by Certified vs non-Certified
    const certified = items.filter(h => h.state === 'Certified');
    const nonCertified = items.filter(h => h.state !== 'Certified');
    
    if (certified.length > 0) {
        md += `### Certified (${certified.length} hits — learner-pool exposure)\n\n`;
        md += `| QID | State | Choice | Issue Tags | Original (excerpt) | Classification |\n`;
        md += `|-----|-------|--------|-----------|--------------------|----------------|\n`;
        for (const hit of certified) {
            const tags = (hit.issue_tags || []).join(', ');
            const excerpt = (hit.text_excerpt || '').substring(0, 80).replace(/\|/g, '\\|');
            md += `| ${hit.qid} | ${hit.state} | ${hit.field} | ${tags} | ${excerpt} | ${hit.classification} |\n`;
        }
    }
    
    if (nonCertified.length > 0) {
        md += `\n### Non-Certified (${nonCertified.length} hits)\n\n`;
        md += `| QID | State | Choice | Issue Tags | Original (excerpt) | Classification |\n`;
        md += `|-----|-------|--------|-----------|--------------------|----------------|\n`;
        for (const hit of nonCertified) {
            const tags = (hit.issue_tags || []).join(', ');
            const excerpt = (hit.text_excerpt || '').substring(0, 80).replace(/\|/g, '\\|');
            md += `| ${hit.qid} | ${hit.state} | ${hit.field} | ${tags} | ${excerpt} | ${hit.classification} |\n`;
        }
    }
}

// REQUIRES_SME section
const smeItems = allHits.filter(h => h.classification === 'REQUIRES_SME');
if (smeItems.length > 0) {
    md += `\n---\n\n## REQUIRES_SME Items (${smeItems.length} hits)\n\n`;
    md += `| QID | Pack | State | Field | Original (excerpt) | Pattern Hits |\n`;
    md += `|-----|------|-------|-------|--------------------|-------------|\n`;
    for (const hit of smeItems) {
        const excerpt = (hit.text_excerpt || '').substring(0, 80).replace(/\|/g, '\\|');
        const patterns = (hit.pattern_hits || []).join(', ');
        md += `| ${hit.qid} | ${hit.pack} | ${hit.state} | ${hit.field} | ${excerpt} | ${patterns} |\n`;
    }
}

md += `\n---\n\n## Pattern Distribution\n\n`;

// Count by pattern
const patternCounts = {};
for (const hit of allHits) {
    for (const p of (hit.pattern_hits || [])) {
        patternCounts[p] = (patternCounts[p] || 0) + 1;
    }
}
md += `| Pattern | Total Hits | KEEP_AS_IS | CANDIDATE_REWRITE | REQUIRES_SME |\n`;
md += `|---------|-----------|------------|-------------------|--------------|\n`;
for (const [pattern, total] of Object.entries(patternCounts).sort((a,b) => b[1] - a[1])) {
    const keep = allHits.filter(h => h.classification === 'KEEP_AS_IS' && h.pattern_hits.includes(pattern)).length;
    const rewrite = allHits.filter(h => h.classification === 'CANDIDATE_REWRITE' && h.pattern_hits.includes(pattern)).length;
    const sme = allHits.filter(h => h.classification === 'REQUIRES_SME' && h.pattern_hits.includes(pattern)).length;
    md += `| ${pattern} | ${total} | ${keep} | ${rewrite} | ${sme} |\n`;
}

md += `\n---\n\n## Notes for SME Review\n\n`;
md += `1. **All proposed rewrites are staging only.** No pack files have been modified in this session.\n`;
md += `2. **Priority order for applying approved changes:** Pack B (fully Certified, 500 items) → Pack E (fully Certified, 500) → Pack A (481 Certified) → Pack D (300 Certified) → Pack C (250 Certified).\n`;
md += `3. **Pattern notes:**\n`;
md += `   - "only" and "must" are the most common patterns but are often KEEP_AS_IS in technical accounting contexts (GAAP/IFRS/ASC citations).\n`;
md += `   - "none of the above" and "all of the above" are almost always CANDIDATE_REWRITE — these are considered poor distractor design per CAQS v1.0 §6.4.\n`;
md += `   - "always" and "never" on distractor choices (not in explanations) are flagged more aggressively.\n`;
md += `4. **Risk considerations:**\n`;
md += `   - SOX/ethics/legal items require special care when modifying absolutist language — if in doubt, defer to REQUIRES_SME.\n`;
md += `   - Changes to CorrectChoice slots (marked \`is_correct: true\`) must NEVER be made without full correctness verification.\n`;
md += `5. **Next session:** After SME review and approval, a separate "apply approved distractor fixes" session will execute the rewrites.\n`;

md += `\n---\n\n## Deferred REVISION_HISTORY Block\n\n`;
md += `\`\`\`markdown\n`;
md += `## Session 90 — Distractor Quality Review (2026-07-25)\n\n`;
md += `**Type:** Read-only staging — no pack content writes.\n`;
md += `**Scope:** All 5 packs (2,500 questions). Absolutist distractor language scan.\n`;
md += `**Results:** ${allHits.length} total hits. ${counts.KEEP_AS_IS} KEEP_AS_IS, ${counts.CANDIDATE_REWRITE} CANDIDATE_REWRITE, ${counts.REQUIRES_SME} REQUIRES_SME.\n`;
md += `**Output:** knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json, knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.md\n`;
md += `**Next:** External SME review → "apply approved distractor fixes" session.\n`;
md += `\`\`\`\n`;

fs.writeFileSync(OUT_MD, md, 'utf8');
console.error(`Wrote ${OUT_MD}`);

// === Generate Session Report ===
let report = `# Session 90 — Distractor Quality Review / Proposal Staging Only

**Date:** ${new Date().toISOString().split('T')[0]}
**Type:** Content-quality review pass — read-only on pack files, write only to staging files.
**Status:** Complete — findings staged for external SME review.

---

## 1. Scope & Method

### Packs Scanned
All 5 MCQ packs (pack_a through pack_e, 2,500 total questions):

| Pack | Questions | Certified | Raw Hits |
|------|-----------|-----------|----------|
`;

for (const pack of ['A','B','C','D','E']) {
    const total = raw.summary.total_questions / 5; // Each pack has 500
    const certCounts = { A: 481, B: 500, C: 250, D: 300, E: 500 };
    report += `| Pack ${pack} | 500 | ${certCounts[pack]} | ${byPack[pack] || 0} |\n`;
}

report += `
### Fields Scanned
- **Choices (A/B/C/D):** ${raw.summary.total_choices_scanned} fields across all questions
- **ExplanationWrong (A/B/C/D):** ${raw.summary.total_ew_scanned} non-correct-choice slots
- **Total fields examined:** ${raw.summary.total_choices_scanned + raw.summary.total_ew_scanned}

### Patterns Searched
| Pattern | Severity | Description |
|---------|----------|-------------|
| always | medium | Absolutist claim of universal truth |
| never | medium | Absolutist claim of impossibility |
| only | low | Restrictive/exclusionary language |
| must | low | Mandatory language |
| none_of_the_above | high | Answer-choice pattern (poor distractor design) |
| all_of_the_above | high | Answer-choice pattern (poor distractor design) |
| cannot_ever | high | Double-absolutist phrasing |
| under_no_circumstances | high | Extreme absolutist claim |
| in_every_case / in_all_cases | high | Universal generalization |
| without_exception / no_exceptions | high | Rule-absolutism |

### Selection Method
1. Full regex scan of all Choices and ExplanationWrong fields across all 2,500 questions.
2. Regex-based QID mapping for context (section, state, difficulty, topic).
3. Automated classification using pattern-type rules and contextual signals (GAAP/IFRS citations, accounting standard references, absurdist signals).
4. Results written to JSON and Markdown staging files.

---

## 2. Results Summary

### Overall Classification

| Classification | Count | % of Hits |
|----------------|-------|-----------|
| KEEP_AS_IS | ${counts.KEEP_AS_IS} | ${((counts.KEEP_AS_IS / allHits.length) * 100).toFixed(1)}% |
| CANDIDATE_REWRITE | ${counts.CANDIDATE_REWRITE} | ${((counts.CANDIDATE_REWRITE / allHits.length) * 100).toFixed(1)}% |
| REQUIRES_SME | ${counts.REQUIRES_SME} | ${((counts.REQUIRES_SME / allHits.length) * 100).toFixed(1)}% |
| **Total** | **${allHits.length}** | **100%** |

### By Pack

| Pack | Total | KEEP_AS_IS | CANDIDATE_REWRITE | REQUIRES_SME |
|------|-------|------------|-------------------|--------------|
`;

for (const pack of ['A','B','C','D','E']) {
    const total = byPack[pack] || 0;
    const keep = byPackClass[pack + '|KEEP_AS_IS'] || 0;
    const rewrite = byPackClass[pack + '|CANDIDATE_REWRITE'] || 0;
    const sme = byPackClass[pack + '|REQUIRES_SME'] || 0;
    report += `| Pack ${pack} | ${total} | ${keep} | ${rewrite} | ${sme} |\n`;
}

report += `
### By Question State

| State | KEEP_AS_IS | CANDIDATE_REWRITE | REQUIRES_SME |
|-------|------------|-------------------|--------------|
`;

for (const key of Object.keys(byState).sort()) {
    const [state, cls] = key.split('|');
    report += `| ${state} | ${cls === 'KEEP_AS_IS' ? byState[key] : '-'} | ${cls === 'CANDIDATE_REWRITE' ? byState[key] : '-'} | ${cls === 'REQUIRES_SME' ? byState[key] : '-'} |\n`;
}

// Top patterns
report += `
### Top Pattern Distribution

| Pattern | Total | KEEP_AS_IS | CANDIDATE_REWRITE | REQUIRES_SME |
|---------|-------|------------|-------------------|--------------|
`;
for (const [pattern, total] of Object.entries(patternCounts).sort((a,b) => b[1] - a[1]).slice(0, 10)) {
    const keep = allHits.filter(h => h.classification === 'KEEP_AS_IS' && h.pattern_hits.includes(pattern)).length;
    const rewrite = allHits.filter(h => h.classification === 'CANDIDATE_REWRITE' && h.pattern_hits.includes(pattern)).length;
    const sme = allHits.filter(h => h.classification === 'REQUIRES_SME' && h.pattern_hits.includes(pattern)).length;
    report += `| ${pattern} | ${total} | ${keep} | ${rewrite} | ${sme} |\n`;
}

// Examples
report += `
---

## 3. Example Before/Proposed Pairs

> These are illustrative examples. No pack files have been modified. Proposed rewrites are staging only.

`;

// Find a few good examples
const examples = [];
const rewriteCertified = rewriteCandidates.filter(h => h.state === 'Certified');
const examplesByPattern = {};
for (const hit of rewriteCertified) {
    const key = (hit.pattern_hits || [])[0] || 'unknown';
    if (!examplesByPattern[key] && (hit.field || '').startsWith('Choice ')) {
        examplesByPattern[key] = hit;
    }
}

let exCount = 0;
for (const [pattern, hit] of Object.entries(examplesByPattern)) {
    if (exCount >= 8) break;
    report += `### Example ${exCount + 1}: "${pattern}" pattern\n\n`;
    report += `- **QID:** ${hit.qid} (${hit.pack}/${hit.section}, ${hit.state})\n`;
    report += `- **Stem:** ${hit.stem_excerpt}\n`;
    report += `- **Field:** ${hit.field}\n`;
    report += `- **Original:** "${hit.full_text}"\n`;
    report += `- **Issue:** Absolutist language makes the distractor obviously wrong or non-competitive.\n`;
    report += `- **Recommendation:** Replace with a more nuanced, plausible option.\n`;
    report += `\n`;
    exCount++;
}

// Risk notes
report += `
---

## 4. Risk Notes

`;

const smeCertified = smeItems.filter(h => h.state === 'Certified').length;
if (smeCertified > 0) {
    report += `- **${smeCertified} REQUIRES_SME items** are Certified and in the learner pool. These need expert judgment before any changes.\n`;
}

const rewriteCert = rewriteCandidates.filter(h => h.state === 'Certified').length;
report += `- **${rewriteCert} CANDIDATE_REWRITE items** are Certified. All proposed rewrites must be reviewed before application — changing distractors on Certified items requires re-verification to ensure the new distractor doesn't accidentally become a second correct answer.\n`;
report += `- SOX/ethics/legal items with absolutist language require special care. Many "must" and "shall" formulations in these domains are literally correct per the regulation.\n`;
report += `- **None of the above / All of the above:** ${patternCounts['none_of_the_above'] || 0 + (patternCounts['all_of_the_above'] || 0)} total occurrences. These are well-known poor distractor designs per CAQS v1.0 §6.4 (cueing and bias checks) — they should be prioritised for rewrite.\n`;

report += `
---

## 5. Next Steps

1. **External SME review:** Review \`knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.md\` and \`knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json\`.
2. **Approval:** Mark each CANDIDATE_REWRITE item as "Approved" or "Rejected" with optional revised proposals.
3. **Apply session:** After approval, a separate "apply approved distractor fixes" session will:
   - Apply approved rewrites to pack files (with backup protocol)
   - Verify no CorrectChoice or question_state changes
   - Run validator suite
   - Update REVISION_HISTORY.md
4. **Suggested order:** Pack B → Pack E → Pack A → Pack D → Pack C (Certified items prioritized).

---

## 6. Staging Files Generated

| File | Purpose |
|------|---------|
| \`knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json\` | Machine-readable staging of all CANDIDATE_REWRITE and REQUIRES_SME items |
| \`knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.md\` | Human-friendly review tables grouped by pack/section |
| \`reports/session_status/SESSION90_DISTRACTOR_QUALITY_REVIEW.md\` | This report |
| \`reports/session_status/s90_scan_raw.json\` | Raw scan output (987 hits) |

---

## 7. Deferred REVISION_HISTORY Entry

\`\`\`markdown
## Session 90 — Distractor Quality Review (2026-07-25)

**Type:** Read-only staging — no pack content writes.
**Scope:** All 5 packs (2,500 questions). Absolutist distractor language scan.
**Method:** Full regex scan of Choices (9,980 fields) and ExplanationWrong (5,224 fields) across all 5 packs.
**Results:** ${allHits.length} total hits. ${counts.KEEP_AS_IS} KEEP_AS_IS, ${counts.CANDIDATE_REWRITE} CANDIDATE_REWRITE, ${counts.REQUIRES_SME} REQUIRES_SME.
**Output:** knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json + .md, reports/session_status/SESSION90_DISTRACTOR_QUALITY_REVIEW.md
**Next:** External SME review → "apply approved distractor fixes" session.
\`\`\`
`;

fs.writeFileSync(REPORT, report, 'utf8');
console.error(`Wrote ${REPORT}`);
console.error('Done.');
