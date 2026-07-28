// Session 96 — Manifest normalization: adds unified "blocked" array + metadata
// Run: node scripts/normalize_defect_manifest_s96.js
const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'governance', 'DEFECT_MANIFEST_DL008_DL026.json');
const raw = fs.readFileSync(manifestPath, 'utf8');
const manifest = JSON.parse(raw);

const now = new Date().toISOString();
const blocked = [];

// Merge dl008 entries
if (Array.isArray(manifest.dl008)) {
    for (const e of manifest.dl008) {
        // Pack detection: P1-X-NNN = Pack A, P1-XC-NNN = Pack C, P1-XD-NNN = Pack D
        let pack = '?';
        if (e.qid) {
            const m = e.qid.match(/^P1-([A-F])([CD])?-/);
            if (m) {
                if (m[2] === 'C') pack = 'C';
                else if (m[2] === 'D') pack = 'D';
                else pack = 'A';
            }
        }
        blocked.push({
            qid: e.qid,
            pack: pack,
            section: e.section || '?',
            defect_code: e.issue_code || 'DL-008',
            state: e.state || '?',
            block_from_delivery: true,
            block_from_recommendation: true,
            cc: e.cc || '?',
            ewLen: e.ewLen || 0,
            notes: e.verified || 'DL-008 non-empty EW[CC]'
        });
    }
}

// Merge dl026 entries
if (Array.isArray(manifest.dl026)) {
    for (const e of manifest.dl026) {
        blocked.push({
            qid: e.qid,
            pack: e.pack || 'D',
            section: e.section || '?',
            defect_code: e.defect_code || 'DL-026',
            state: e.state || '?',
            block_from_delivery: true,
            block_from_recommendation: e.block_from_recommendation !== false,
            correctChoice: e.correctChoice || '?',
            notes: e.notes || 'DL-026 empty non-CC EW slots'
        });
    }
}

// Deduplicate by qid (keep first occurrence)
const seen = new Set();
const deduped = [];
for (const e of blocked) {
    if (!seen.has(e.qid)) {
        seen.add(e.qid);
        deduped.push(e);
    }
}

// Compute stats
const countsByCode = {};
const countsByPack = {};
for (const e of deduped) {
    countsByCode[e.defect_code] = (countsByCode[e.defect_code] || 0) + 1;
    countsByPack[e.pack] = (countsByPack[e.pack] || 0) + 1;
}

// Update metadata
manifest._metadata.schema_version = '1.1';
manifest._metadata.normalized_at = now;
manifest._metadata.normalized_by = 'Session 96';
manifest._metadata.counts_by_code = countsByCode;
manifest._metadata.counts_by_pack = countsByPack;
manifest._metadata.total_blocked = deduped.length;
manifest._metadata.validation_notes = 'Unified blocked array merged from dl008 + dl026. DL-008 Pack E (371 items) not yet enumerated — pending Session 92 QID extraction.';

// Preserve original arrays, add unified blocked array
manifest.blocked = deduped;

// Update stats section
manifest.stats.total_blocked_unified = deduped.length;
manifest.stats.normalized_session = 96;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`Normalized: ${deduped.length} unique blocked QIDs (${Object.keys(countsByCode).map(k => `${k}=${countsByCode[k]}`).join(', ')})`);
console.log(`By pack: ${Object.keys(countsByPack).sort().map(k => `${k}=${countsByPack[k]}`).join(', ')}`);
console.log(`Written to: ${manifestPath}`);
