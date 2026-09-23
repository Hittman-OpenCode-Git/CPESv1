const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");

/**
 * CaseIdentityValidator — DL-048 + DL-032 regression gates.
 *
 * Check 1 (ERROR): cross-file CaseID uniqueness across all case banks
 *   (legacy scored_cases* + case_pack_*). Any duplicate CaseID → error.
 *   Regression gate for DL-048 (CBQ3-A1/A2 duplicated across case_pack_2/3).
 *
 * Check 2 (ERROR): per-bank difficulty variance. If a single item-level
 *   Difficulty label accounts for >= 90% of a bank's items → error.
 *   Regression gate for DL-032 (original 100%-Moderate defect).
 *
 * Check 3 (WARNING): DifficultyScore ↔ Difficulty label consistency per item.
 */
class CaseIdentityValidator extends Validator {
    constructor() {
        super("Case Identity Validator");
        // Live bank: the 3-pack architecture loaded at runtime (S916-S918).
        // Legacy banks are ARCHIVED (CURRENT_BASELINES.md §"Legacy Scored Case Files") —
        // their CaseIDs intentionally overlap the consolidated packs, so legacy↔live
        // overlap is informational, not a defect. Only within-live duplicates are errors.
        this.liveFiles = config.casePackBanks || [];
        this.archivedFiles = config.caseBanks || [];
        this.part2Files = config.part2CasePacks || [];
        this.caseFiles = this.liveFiles.concat(this.archivedFiles).concat(this.part2Files);
        this.liveSet = new Set(this.liveFiles);
        this.part2Set = new Set(this.part2Files);
        this.scoreMap = { 1: "Easy", 2: "Moderate-Easy", 3: "Moderate", 4: "Difficult", 5: "Very Difficult" };
    }

    extractCases(content) {
        const varMatch = content.match(/(?:const|let|var)\s+(ENHANCED_CASE_BASE\d*|CASE_PACK_\d+|casePackP2_\d+|casePackP2Authored|casePackP2_C4_C8)\s*=/);
        let arrStart = -1;
        if (varMatch) {
            arrStart = content.indexOf("[", varMatch.index);
        } else {
            // Fallback: bare array at start of file (e.g., case_pack_p2_C4_C8.js)
            const bareMatch = content.match(/^\s*\[/m);
            if (bareMatch) arrStart = bareMatch.index;
        }
        if (arrStart === -1) return null;
        let depth = 0, pos = arrStart;
        do {
            if (content[pos] === "[") depth++;
            if (content[pos] === "]") depth--;
            pos++;
        } while (depth > 0 && pos < content.length);
        const jsStr = content.substring(arrStart, pos);
        try { return JSON.parse(jsStr); } catch (e) {
            try {
                const fn = new Function("return (" + jsStr + ")");
                return fn();
            } catch (e2) { return null; }
        }
    }

    validate() {
        this.start();
        const root = config.paths.root;
        const seen = new Map(); // CaseID -> [files]
        let totalCases = 0, totalItems = 0, mismatchCount = 0;

        for (const file of this.caseFiles) {
            const fullPath = path.join(root, file);
            if (!fs.existsSync(fullPath)) {
                this.addWarning(`Case bank not found: ${file}`);
                continue;
            }
            const content = fs.readFileSync(fullPath, "utf8");
            const cases = this.extractCases(content);
            if (!cases || cases.length === 0) {
                this.addWarning(`No cases parsed in ${file}`);
                continue;
            }
            const dist = {};
            for (const c of cases) {
                totalCases++;
                if (!c.CaseID) {
                    this.addWarning(`${file}: case without CaseID`);
                    continue;
                }
                if (!seen.has(c.CaseID)) seen.set(c.CaseID, []);
                seen.get(c.CaseID).push(file);
                for (const it of (c.Items || [])) {
                    totalItems++;
                    const label = it.Difficulty || "?";
                    dist[label] = (dist[label] || 0) + 1;
                    if (it.DifficultyScore !== undefined && this.scoreMap[it.DifficultyScore] !== undefined) {
                        if (this.scoreMap[it.DifficultyScore] !== it.Difficulty) {
                            mismatchCount++;
                            this.addWarning(`${file} ${c.CaseID}/${it.ItemID || "?"}: Difficulty "${it.Difficulty}" contradicts DifficultyScore ${it.DifficultyScore}`);
                        }
                    }
                }
            }
            // DL-032 gate: single-label dominance per bank file
            const bankItems = Object.values(dist).reduce((a, b) => a + b, 0);
            for (const [label, count] of Object.entries(dist)) {
                const pct = bankItems ? count / bankItems : 0;
                this.addStatistic(`${file} :: ${label}`, `${count} (${(pct * 100).toFixed(1)}%)`);
                if (pct >= 0.90) {
                    this.addError(`DL-032 signal in ${file}: "${label}" accounts for ${(pct * 100).toFixed(1)}% of ${bankItems} items (threshold 90%)`);
                }
            }
        }

        // DL-048 gate: duplicates WITHIN the live banks are errors.
        // Live = Part 1 consolidated packs (casePackBanks) + Part 2 case packs (part2CasePacks).
        // Legacy(archived)↔live overlap is expected post-S916 consolidation → informational.
        let dupCount = 0, archivedOverlap = 0;
        const allLiveFiles = new Set([...this.liveFiles, ...this.part2Files]);
        for (const [caseID, files] of seen.entries()) {
            const uniqFiles = [...new Set(files)];
            if (uniqFiles.length > 1) {
                const liveHits = uniqFiles.filter(f => allLiveFiles.has(f));
                if (liveHits.length > 1) {
                    dupCount++;
                    this.addError(`DL-048 duplicate CaseID ${caseID} in ${liveHits.length} LIVE files: ${liveHits.join(", ")}`);
                } else {
                    archivedOverlap++;
                }
            }
        }

        this.addStatistic("Total Cases Checked", totalCases);
        this.addStatistic("Unique CaseIDs", seen.size);
        this.addStatistic("Total Items Checked", totalItems);
        this.addStatistic("Duplicate CaseIDs (live banks incl. P2)", dupCount);
        this.addStatistic("Archived↔Live Overlaps (expected, S916)", archivedOverlap);
        this.addStatistic("Score/Label Mismatches", mismatchCount);

        this.finish();
        return this.report();
    }
}

module.exports = CaseIdentityValidator;