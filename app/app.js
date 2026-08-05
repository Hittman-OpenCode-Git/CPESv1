// =============================================================
// CMA Part 1 2026 Practice Simulator — Exam Engine v8.0
// =============================================================

// ---- Theme toggle ----
(function () {
    const saved = localStorage.getItem('cma-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    window.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.textContent = saved === 'dark' ? '\u2600' : '\u263D';
            btn.addEventListener('click', function () {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('cma-theme', next);
                btn.textContent = next === 'dark' ? '\u2600' : '\u263D';
            });
        }
    });
})();

const SECTION_INFO = {
    "A": { name: "External Financial Reporting Decisions", target: 75, weight: 15 },
    "B": { name: "Planning, Budgeting, and Forecasting", target: 100, weight: 20 },
    "C": { name: "Performance Management", target: 100, weight: 20 },
    "D": { name: "Cost Management", target: 75, weight: 15 },
    "E": { name: "Internal Controls", target: 75, weight: 15 },
    "F": { name: "Technology and Analytics", target: 75, weight: 15 }
};

const STUDY_LINKS = {
    "Financial statements": [{ label: "IMA CMA Learning Outcome Statements, Part 1 Section A", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }, { label: "OpenStax: Financial Statements overview", url: "https://openstax.org/books/principles-financial-accounting/pages/2-3-prepare-an-income-statement-statement-of-owners-equity-and-balance-sheet" }],
    "Recognition and measurement": [{ label: "IMA CMA Learning Outcome Statements, Section A.2", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }, { label: "FASB Concepts Statements and revenue guidance portal", url: "https://www.fasb.org/page/PageContent?pageId=/standards/concepts-statements.html" }],
    "Planning and budgeting": [{ label: "IMA CMA Learning Outcome Statements, Section B", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }, { label: "OpenStax Managerial Accounting: Budgeting", url: "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction" }],
    "Forecasting": [{ label: "IMA CMA Learning Outcome Statements, Forecasting techniques", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }, { label: "OpenStax Introductory Business Statistics: Regression basics", url: "https://openstax.org/books/introductory-business-statistics/pages/13-introduction" }],
    "Variance analysis": [{ label: "IMA CMA Learning Outcome Statements, Section C", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }, { label: "OpenStax Managerial Accounting: Standard Costs and Variances", url: "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction" }],
    "Cost behavior": [{ label: "IMA CMA Learning Outcome Statements, Section D", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }, { label: "OpenStax Managerial Accounting: Cost Behavior Patterns", url: "https://openstax.org/books/principles-managerial-accounting/pages/5-5-cost-behavior-patterns" }],
    "Internal controls": [{ label: "IMA CMA Learning Outcome Statements, Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }, { label: "COSO Internal Control - Integrated Framework overview", url: "https://www.coso.org/Shared%20Documents/IC-2016-Summary.pdf" }],
    "Technology and analytics": [{ label: "IMA CMA Learning Outcome Statements, Section F", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }, { label: "Data Analytics in Accounting", url: "https://openstax.org/books/principles-managerial-accounting/pages/16-introduction" }],
    "Case-based practice": [{ label: "Case-based practice review", url: "https://www.imanet.org/cma-certification" }]
};

// ============================================================
// S112 — CMAProfileManager: Unified Learner Profile & Migration
// ============================================================
const CMAProfileManager = {
    STORAGE_KEY: 'cmaProfile2026',
    BACKUP_PREFIX: 'cmaProfile2026_backup_',
    MAX_BACKUPS: 5,

    LEGACY_KEYS: [
        'cmaP1History2026', 'cmaP1SeenQuestions2026', 'cmaP1Dashboard',
        'cmaMayLearnerState', 'cmaMaySelectedLearnerId', 'cmaMayStudentRoll',
        'cmaMayPilotUsageLog', 'cmaMaySafetyLog', 'cmaMayGateLog',
        'cmaMaySessionTelemetry', 'cmaMayPilotTelemetry', 'cmaMayPilotTelemetryArchive',
        'cmaDefectManifest_DL008_DL026'
    ],

    _default() {
        return {
            schemaVersion: 1,
            profileId: 'local-profile-' + Date.now().toString(36),
            metadata: { createdAt: new Date().toISOString(), migratedAt: null, lastBackupAt: null, lastSessionAt: null },
            migration: { completed: false, completedAt: null, sourceKeys: [] },
            theme: (function () { try { return localStorage.getItem('cma-theme') || 'light'; } catch (e) { return 'light'; } })(),
            sessionHistory: [],
            seenQuestionIds: [],
            bookmarkCollections: {},
            mayLearnerState: {},
            mayStudentRoll: [],
            mayUsageLog: [],
            maySafetyLog: [],
            mayGateLog: [],
            maySessionTelemetry: [],
            mayPilotTelemetry: {},
            mayPilotTelemetryArchive: [],
            maySelectedLearnerId: null,
            defectManifestCache: null
        };
    },

    load() {
        try {
            var raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) {
                var profile = JSON.parse(raw);
                var defaults = this._default();
                for (var k in defaults) { if (!(k in profile) && defaults.hasOwnProperty(k)) profile[k] = defaults[k]; }
                return profile;
            }
        } catch (e) { /* corrupted */ }
        return this._default();
    },

    save(profile) {
        // S120 — Pull fresh May data into profile before persisting (SSOT coherence)
        this.syncFromMayStorage(profile);
        try {
            profile.metadata.lastSessionAt = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
            return true;
        } catch (e) {
            try {
                if (profile.sessionHistory && profile.sessionHistory.length > 50) profile.sessionHistory = profile.sessionHistory.slice(-50);
                if (profile.mayUsageLog && profile.mayUsageLog.length > 100) profile.mayUsageLog = profile.mayUsageLog.slice(-100);
                profile.metadata.lastSessionAt = new Date().toISOString();
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
                return true;
            } catch (e2) { return false; }
        }
    },

    // ── UX-4 Bookmark Collections ────────────────────────
    SYSTEM_COLLECTIONS: {
        'must-master': { name: 'Must Master', desc: 'Questions I must get right before the exam', type: 'system' },
        'technology-weaknesses': { name: 'Technology Weaknesses', desc: 'Section F concepts and emerging tech topics', type: 'system' },
        'formula-review': { name: 'Formula Review', desc: 'Calculation-intensive questions to rework', type: 'system' },
        'recovery-candidates': { name: 'Recovery Candidates', desc: 'Previously missed questions to retry', type: 'system' }
    },

    _ensureSystemCollections(profile) {
        if (!profile.bookmarkCollections) profile.bookmarkCollections = {};
        var bc = profile.bookmarkCollections;
        for (var cid in this.SYSTEM_COLLECTIONS) {
            if (!bc[cid]) {
                bc[cid] = {
                    name: this.SYSTEM_COLLECTIONS[cid].name,
                    description: this.SYSTEM_COLLECTIONS[cid].desc,
                    type: this.SYSTEM_COLLECTIONS[cid].type,
                    items: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
            }
        }
    },

    getCollections() {
        var profile = this.load();
        this._ensureSystemCollections(profile);
        return profile.bookmarkCollections;
    },

    createCollection(name, description) {
        var profile = this.load();
        this._ensureSystemCollections(profile);
        var cid = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (!cid || profile.bookmarkCollections[cid]) return null;
        profile.bookmarkCollections[cid] = {
            name: name,
            description: description || '',
            type: 'user',
            items: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.save(profile);
        return cid;
    },

    deleteCollection(collectionId) {
        var profile = this.load();
        this._ensureSystemCollections(profile);
        if (profile.bookmarkCollections[collectionId] && profile.bookmarkCollections[collectionId].type === 'system') return false;
        delete profile.bookmarkCollections[collectionId];
        this.save(profile);
        return true;
    },

    renameCollection(collectionId, newName) {
        var profile = this.load();
        this._ensureSystemCollections(profile);
        if (!profile.bookmarkCollections[collectionId]) return false;
        profile.bookmarkCollections[collectionId].name = newName;
        profile.bookmarkCollections[collectionId].updatedAt = new Date().toISOString();
        this.save(profile);
        return true;
    },

    addToCollection(collectionId, questionId) {
        var profile = this.load();
        this._ensureSystemCollections(profile);
        if (!profile.bookmarkCollections[collectionId]) return false;
        var items = profile.bookmarkCollections[collectionId].items;
        if (items.indexOf(questionId) === -1) {
            items.push(questionId);
            profile.bookmarkCollections[collectionId].updatedAt = new Date().toISOString();
            this.save(profile);
        }
        return true;
    },

    removeFromCollection(collectionId, questionId) {
        var profile = this.load();
        this._ensureSystemCollections(profile);
        if (!profile.bookmarkCollections[collectionId]) return false;
        var items = profile.bookmarkCollections[collectionId].items;
        var idx = items.indexOf(questionId);
        if (idx !== -1) {
            items.splice(idx, 1);
            profile.bookmarkCollections[collectionId].updatedAt = new Date().toISOString();
            this.save(profile);
        }
        return true;
    },

    isInCollection(collectionId, questionId) {
        var profile = this.load();
        this._ensureSystemCollections(profile);
        if (!profile.bookmarkCollections[collectionId]) return false;
        return profile.bookmarkCollections[collectionId].items.indexOf(questionId) !== -1;
    },

    getCollectionQuestionIds(collectionId) {
        var profile = this.load();
        this._ensureSystemCollections(profile);
        if (!profile.bookmarkCollections[collectionId]) return [];
        return profile.bookmarkCollections[collectionId].items.slice();
    },

    // ── Migration detection ──────────────────────────────
    hasLegacyData() {
        for (var i = 0; i < this.LEGACY_KEYS.length; i++) {
            try { if (localStorage.getItem(this.LEGACY_KEYS[i]) !== null) return true; } catch (e) {}
        }
        return false;
    },

    // ── Legacy data inventory for UI preview ──────────────
    getLegacySummary() {
        var summary = { sessions: 0, seenQuestions: 0, maySessions: 0, mayLogs: 0, hasData: false };
        try {
            var hist = JSON.parse(localStorage.getItem('cmaP1History2026') || '[]');
            summary.sessions = hist.length;
            if (hist.length > 0) summary.hasData = true;
        } catch (e) {}
        try {
            var seen = JSON.parse(localStorage.getItem('cmaP1SeenQuestions2026') || '[]');
            summary.seenQuestions = seen.length;
            if (seen.length > 0) summary.hasData = true;
        } catch (e) {}
        try {
            var may = JSON.parse(localStorage.getItem('cmaMayLearnerState') || '{}');
            summary.maySessions = (may.sessions || []).length;
            if ((may.sessions || []).length > 0) summary.hasData = true;
        } catch (e) {}
        try {
            var usageLog = JSON.parse(localStorage.getItem('cmaMayPilotUsageLog') || '[]');
            summary.mayLogs = usageLog.length;
        } catch (e) {}
        return summary;
    },

    // ── One-time migration ───────────────────────────────
    migrateLegacy(profile) {
        var srcKeys = [];
        var safeRead = function (key) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; } };

        // Session history
        var hist = safeRead('cmaP1History2026');
        if (hist && Array.isArray(hist) && hist.length > 0) { profile.sessionHistory = hist.slice(0, 100); srcKeys.push('cmaP1History2026'); }

        // Seen questions
        var seen = safeRead('cmaP1SeenQuestions2026');
        if (seen && Array.isArray(seen)) { profile.seenQuestionIds = seen; srcKeys.push('cmaP1SeenQuestions2026'); }

        // Dashboard (merge into history if not already covered)
        var db = safeRead('cmaP1Dashboard');
        if (db && !profile.sessionHistory.length) { srcKeys.push('cmaP1Dashboard'); }

        // May learner state
        var mayLS = safeRead('cmaMayLearnerState');
        if (mayLS && typeof mayLS === 'object' && !Array.isArray(mayLS)) { profile.mayLearnerState = mayLS; srcKeys.push('cmaMayLearnerState'); }

        // May support data
        var maySid = localStorage.getItem('cmaMaySelectedLearnerId');
        if (maySid) { profile.maySelectedLearnerId = maySid; srcKeys.push('cmaMaySelectedLearnerId'); }

        var mayRoll = safeRead('cmaMayStudentRoll');
        if (mayRoll && Array.isArray(mayRoll)) { profile.mayStudentRoll = mayRoll; srcKeys.push('cmaMayStudentRoll'); }

        var mayUsage = safeRead('cmaMayPilotUsageLog');
        if (mayUsage && Array.isArray(mayUsage)) { profile.mayUsageLog = mayUsage.slice(0, 200); srcKeys.push('cmaMayPilotUsageLog'); }

        var maySafety = safeRead('cmaMaySafetyLog');
        if (maySafety && Array.isArray(maySafety)) { profile.maySafetyLog = maySafety.slice(0, 50); srcKeys.push('cmaMaySafetyLog'); }

        var mayGate = safeRead('cmaMayGateLog');
        if (mayGate && Array.isArray(mayGate)) { profile.mayGateLog = mayGate.slice(0, 50); srcKeys.push('cmaMayGateLog'); }

        var mayTelem = safeRead('cmaMaySessionTelemetry');
        if (mayTelem && Array.isArray(mayTelem)) { profile.maySessionTelemetry = mayTelem.slice(0, 100); srcKeys.push('cmaMaySessionTelemetry'); }

        var mayPilot = safeRead('cmaMayPilotTelemetry');
        if (mayPilot && typeof mayPilot === 'object') { profile.mayPilotTelemetry = mayPilot; srcKeys.push('cmaMayPilotTelemetry'); }

        var mayPilotArch = safeRead('cmaMayPilotTelemetryArchive');
        if (mayPilotArch && Array.isArray(mayPilotArch)) { profile.mayPilotTelemetryArchive = mayPilotArch; srcKeys.push('cmaMayPilotTelemetryArchive'); }

        var dmCache = safeRead('cmaDefectManifest_DL008_DL026');
        if (dmCache) { profile.defectManifestCache = dmCache; srcKeys.push('cmaDefectManifest_DL008_DL026'); }

        // Theme
        try { var theme = localStorage.getItem('cma-theme'); if (theme) profile.theme = theme; } catch (e) {}

        // Mark migration complete
        profile.migration.completed = true;
        profile.migration.completedAt = new Date().toISOString();
        profile.migration.sourceKeys = srcKeys;

        return profile;
    },

    // ── Archive legacy keys (rename, don't delete) ───────
    archiveLegacyKeys() {
        var archived = [];
        for (var i = 0; i < this.LEGACY_KEYS.length; i++) {
            try {
                var val = localStorage.getItem(this.LEGACY_KEYS[i]);
                if (val !== null) {
                    localStorage.setItem(this.LEGACY_KEYS[i] + '_ARCHIVED', val);
                    localStorage.removeItem(this.LEGACY_KEYS[i]);
                    archived.push(this.LEGACY_KEYS[i]);
                }
            } catch (e) { /* best-effort */ }
        }
        // Also archive theme if present
        try { var theme = localStorage.getItem('cma-theme'); if (theme !== null) { localStorage.setItem('cma-theme_ARCHIVED', theme); localStorage.removeItem('cma-theme'); } } catch (e) {}
        return archived;
    },

    // ── Sync profile data back to May storage (for May layer compatibility) ──
    // S120 — skipExisting: if true, only write keys that don't already exist in localStorage.
    // This prevents init() from overwriting fresher mid-session data on page reload.
    syncToMayStorage(profile, skipExisting) {
        var _setIf = function (key, val) {
            if (skipExisting) {
                try { if (localStorage.getItem(key) !== null) return; } catch (e) {}
            }
            try { localStorage.setItem(key, val); } catch (e) {}
        };
        try {
            if (profile.mayLearnerState && Object.keys(profile.mayLearnerState).length > 0) {
                _setIf('cmaMayLearnerState', JSON.stringify(profile.mayLearnerState));
            }
            if (profile.maySelectedLearnerId) _setIf('cmaMaySelectedLearnerId', profile.maySelectedLearnerId);
            if (profile.mayStudentRoll && profile.mayStudentRoll.length > 0) _setIf('cmaMayStudentRoll', JSON.stringify(profile.mayStudentRoll));
            if (profile.mayUsageLog && profile.mayUsageLog.length > 0) _setIf('cmaMayPilotUsageLog', JSON.stringify(profile.mayUsageLog));
            if (profile.maySafetyLog && profile.maySafetyLog.length > 0) _setIf('cmaMaySafetyLog', JSON.stringify(profile.maySafetyLog));
            if (profile.mayGateLog && profile.mayGateLog.length > 0) _setIf('cmaMayGateLog', JSON.stringify(profile.mayGateLog));
            if (profile.maySessionTelemetry && profile.maySessionTelemetry.length > 0) _setIf('cmaMaySessionTelemetry', JSON.stringify(profile.maySessionTelemetry));
            if (profile.mayPilotTelemetry && Object.keys(profile.mayPilotTelemetry).length > 0) _setIf('cmaMayPilotTelemetry', JSON.stringify(profile.mayPilotTelemetry));
            if (profile.mayPilotTelemetryArchive && profile.mayPilotTelemetryArchive.length > 0) _setIf('cmaMayPilotTelemetryArchive', JSON.stringify(profile.mayPilotTelemetryArchive));
            if (profile.defectManifestCache) _setIf('cmaDefectManifest_DL008_DL026', JSON.stringify(profile.defectManifestCache));
        } catch (e) { /* best-effort */ }
    },

    // ── S120 — Patch a single May field into the SSOT profile ──
    // Called by may-core.js and may-learner-state.js so writes go to cmaProfile2026,
    // not just to independent localStorage keys.
    patchMayField(field, value) {
        try {
            var profile = this.load();
            profile[field] = value;
            profile.metadata.lastSessionAt = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
            window._cmaProfile = profile;
            return true;
        } catch (e) { return false; }
    },

    // ── Pull latest May data into profile (for export) ───
    syncFromMayStorage(profile) {
        try {
            var mayLS = JSON.parse(localStorage.getItem('cmaMayLearnerState') || 'null');
            if (mayLS && typeof mayLS === 'object') profile.mayLearnerState = mayLS;
            var sid = localStorage.getItem('cmaMaySelectedLearnerId');
            if (sid) profile.maySelectedLearnerId = sid;
            var roll = JSON.parse(localStorage.getItem('cmaMayStudentRoll') || 'null');
            if (roll && Array.isArray(roll)) profile.mayStudentRoll = roll;
            var ulog = JSON.parse(localStorage.getItem('cmaMayPilotUsageLog') || 'null');
            if (ulog && Array.isArray(ulog)) profile.mayUsageLog = ulog;
            var slog = JSON.parse(localStorage.getItem('cmaMaySafetyLog') || 'null');
            if (slog && Array.isArray(slog)) profile.maySafetyLog = slog;
            var glog = JSON.parse(localStorage.getItem('cmaMayGateLog') || 'null');
            if (glog && Array.isArray(glog)) profile.mayGateLog = glog;
            var tlog = JSON.parse(localStorage.getItem('cmaMaySessionTelemetry') || 'null');
            if (tlog && Array.isArray(tlog)) profile.maySessionTelemetry = tlog;
            var ptele = JSON.parse(localStorage.getItem('cmaMayPilotTelemetry') || 'null');
            if (ptele && typeof ptele === 'object') profile.mayPilotTelemetry = ptele;
            var parch = JSON.parse(localStorage.getItem('cmaMayPilotTelemetryArchive') || 'null');
            if (parch && Array.isArray(parch)) profile.mayPilotTelemetryArchive = parch;
            var dmc = JSON.parse(localStorage.getItem('cmaDefectManifest_DL008_DL026') || 'null');
            if (dmc) profile.defectManifestCache = dmc;
            try { profile.theme = localStorage.getItem('cma-theme') || profile.theme; } catch (e) {}
        } catch (e) { /* best-effort */ }
        return profile;
    },

    // ── Export full profile as downloadable JSON ─────────
    exportProfile() {
        var profile = this.load();
        this.syncFromMayStorage(profile);
        var blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'cma-profile-backup-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
    },

    backupAllProgress() {
        var profile = this.load();
        this.syncFromMayStorage(profile);
        // Include current in-progress session if one exists
        try {
            var sessionState = localStorage.getItem('cmaP1SessionState');
            if (sessionState) {
                var parsed = JSON.parse(sessionState);
                if (parsed && !parsed.completed) {
                    profile._inProgressSession = {
                        mode: parsed.mode,
                        sections: parsed.sections || [],
                        mcqCount: (parsed.mcqs || []).length,
                        caseCount: (parsed.cases || []).length,
                        answers: Object.keys(parsed.answers || {}).length,
                        flags: Object.keys(parsed.flags || {}).length,
                        elapsed: parsed.start ? Math.floor((Date.now() - parsed.start) / 1000) : 0,
                        qIndex: parsed.qIndex || 0,
                        startedAt: parsed.start ? new Date(parsed.start).toISOString() : null
                    };
                }
            }
        } catch (e) { /* session not available */ }
        var blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'cma-all-progress-backup-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
    },

    // ── Import profile from file ──────────────────────────
    importProfile(file, onPreview, onComplete, onError) {
        var self = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var imported = JSON.parse(e.target.result);
                // Validate
                if (!imported.schemaVersion) { onError('Invalid profile file: missing schemaVersion.'); return; }
                if (typeof imported.schemaVersion !== 'number') { onError('Invalid profile: schemaVersion must be a number.'); return; }

                // Preview
                var preview = {
                    schemaVersion: imported.schemaVersion,
                    sessionCount: (imported.sessionHistory || []).length,
                    seenQuestions: (imported.seenQuestionIds || []).length,
                    maySessions: (imported.mayLearnerState && imported.mayLearnerState.sessions ? imported.mayLearnerState.sessions.length : 0),
                    lastSession: imported.metadata ? imported.metadata.lastSessionAt : null,
                    migrated: imported.migration ? imported.migration.completed : false
                };
                if (onPreview) onPreview(preview, imported);
            } catch (err) {
                onError('Failed to parse profile file: ' + err.message);
            }
        };
        reader.onerror = function () { onError('Failed to read file.'); };
        reader.readAsText(file);
    },

    // ── Execute import (after confirmation) ──────────────
    executeImport(importedProfile) {
        // Pre-import backup
        this.createBackup();

        // Merge or replace current profile
        var profile = this.load();
        // Preserve profileId if local profile exists
        if (profile.profileId && profile.profileId !== importedProfile.profileId) {
            importedProfile.profileId = profile.profileId;
        }
        importedProfile.metadata.importedAt = new Date().toISOString();
        this.save(importedProfile);

        // Sync to May storage for compatibility
        this.syncToMayStorage(importedProfile);

        // Restore theme
        try { document.documentElement.setAttribute('data-theme', importedProfile.theme || 'light'); } catch (e) {}
        if (typeof renderThemeToggle === 'function') renderThemeToggle();

        return true;
    },

    // ── Backup management ────────────────────────────────
    createBackup() {
        try {
            var profile = this.load();
            this.syncFromMayStorage(profile);
            var ts = new Date().toISOString();
            var backupEntry = { timestamp: ts, profile: profile };

            // Load rotation index
            var rotations = [];
            try { rotations = JSON.parse(localStorage.getItem(this.STORAGE_KEY + '_backupIndex') || '[]'); } catch (e) {}

            // Write backup slot
            var slot = rotations.length % this.MAX_BACKUPS;
            localStorage.setItem(this.BACKUP_PREFIX + slot, JSON.stringify(backupEntry));

            // Update index
            if (rotations.length >= this.MAX_BACKUPS) rotations.shift();
            rotations.push({ slot: slot, timestamp: ts, sessions: profile.sessionHistory ? profile.sessionHistory.length : 0 });
            localStorage.setItem(this.STORAGE_KEY + '_backupIndex', JSON.stringify(rotations));

            profile.metadata.lastBackupAt = ts;
            this.save(profile);
            return ts;
        } catch (e) { return null; }
    },

    getBackups() {
        try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY + '_backupIndex') || '[]'); } catch (e) { return []; }
    },

    // ── Profile statistics ────────────────────────────────
    getStats(profile) {
        profile = profile || this.load();
        return {
            sessions: (profile.sessionHistory || []).length,
            seenQuestions: (profile.seenQuestionIds || []).length,
            maySessions: (profile.mayLearnerState && profile.mayLearnerState.sessions ? profile.mayLearnerState.sessions.length : 0),
            migrationCompleted: profile.migration ? profile.migration.completed : false,
            migrationDate: profile.migration ? profile.migration.completedAt : null,
            backups: this.getBackups().length,
            lastBackup: profile.metadata ? profile.metadata.lastBackupAt : null,
            profileCreated: profile.metadata ? profile.metadata.createdAt : null
        };
    },

    // ── Initialize — detect, migrate, sync ────────────────
    init() {
        var profile = this.load();
        window._cmaMigrationNeeded = false;

        // UX-4: Ensure system bookmark collections exist
        this._ensureSystemCollections(profile);

        // Check for legacy data
        if (!profile.migration.completed && this.hasLegacyData()) {
            window._cmaMigrationProfile = profile;
            window._cmaMigrationNeeded = true;
        } else if (!profile.migration.completed) {
            profile.migration.completed = true;
            profile.migration.completedAt = new Date().toISOString();
            this.save(profile);
        }

        // S120 — Sync May storage on load only for absent keys (first-load bootstrap).
        // Never overwrite keys that already exist — they may contain fresher mid-session data.
        this.syncToMayStorage(profile, true);

        // Store in-memory reference
        window._cmaProfile = profile;
        return profile;
    },

    // ── Show migration dialog on page load ────────────────
    showMigrationDialog() {
        var profile = window._cmaMigrationProfile || this.load();
        var summary = this.getLegacySummary();
        var self = this;

        var dialog = document.createElement('div');
        dialog.className = 'recovery-modal';
        dialog.id = 'migrationDialog';
        dialog.innerHTML =
            '<div class="recovery-modal-backdrop"></div>' +
            '<div class="recovery-modal-dialog" role="dialog" aria-labelledby="migrationTitle" style="max-width:540px;">' +
            '<h2 id="migrationTitle">Previous Learner History Detected</h2>' +
            '<p>We found learner data from a previous version stored in your browser.</p>' +
            '<div class="profile-summary-card" style="margin:12px 0;">' +
            '<p><strong>Sessions completed:</strong> ' + summary.sessions + '</p>' +
            '<p style="margin-top:4px;"><strong>Questions seen:</strong> ' + summary.seenQuestions + '</p>' +
            '<p style="margin-top:4px;"><strong>May coaching data:</strong> ' + (summary.maySessions > 0 ? summary.maySessions + ' sessions' : 'None') + '</p>' +
            '</div>' +
            '<p class="small" style="color:var(--text-muted);margin-top:8px;">This data will be migrated to your unified learner profile. Your legacy data will be archived (not deleted) for safety — you can recover it later if needed.</p>' +
            '<div class="recovery-modal-actions" style="flex-direction:column;gap:8px;">' +
            '<button id="migrationImport" class="primary">Import Existing Data</button>' +
            '<button id="migrationSkip" class="secondary">Skip — Start Fresh</button>' +
            '</div></div>';
        document.body.appendChild(dialog);
        document.getElementById('migrationImport').onclick = function () {
            profile = self.migrateLegacy(profile);
            self.save(profile);
            self.archiveLegacyKeys();
            dialog.remove();
            window._cmaMigrationNeeded = false;
            if (typeof ExamSessionManager !== 'undefined') ExamSessionManager.renderHistory();
            renderSettingsView();
            showSaveStatus('Profile migrated successfully', 'saved');
        };
        document.getElementById('migrationSkip').onclick = function () {
            profile.migration.completed = true;
            profile.migration.completedAt = new Date().toISOString();
            self.save(profile);
            dialog.remove();
            window._cmaMigrationNeeded = false;
            renderSettingsView();
        };
    },

    // ── Restore profile from backup slot ─────────────────
    restoreBackup(slot) {
        try {
            var raw = localStorage.getItem(this.BACKUP_PREFIX + slot);
            if (!raw) return false;
            var entry = JSON.parse(raw);
            if (!entry || !entry.profile) return false;

            // Pre-restore backup of current
            this.createBackup();

            this.save(entry.profile);
            this.syncToMayStorage(entry.profile);
            try { document.documentElement.setAttribute('data-theme', entry.profile.theme || 'light'); } catch (e) {}
            renderSettingsView();
            if (typeof ExamSessionManager !== 'undefined') ExamSessionManager.renderHistory();
            return true;
        } catch (e) { return false; }
    },

    // ── Merge imported profile with existing ─────────────
    mergeProfile(importedProfile) {
        var existing = this.load();
        var existingDates = {};
        (existing.sessionHistory || []).forEach(function (h) { existingDates[h.date] = true; });

        var newSessions = (importedProfile.sessionHistory || []).filter(function (h) { return !existingDates[h.date]; });
        var merged = (existing.sessionHistory || []).concat(newSessions);

        var mergedProfile = {
            schemaVersion: existing.schemaVersion,
            profileId: existing.profileId,
            metadata: {
                createdAt: existing.metadata.createdAt,
                migratedAt: existing.metadata.migratedAt,
                lastBackupAt: existing.metadata.lastBackupAt,
                lastSessionAt: new Date().toISOString(),
                mergedAt: new Date().toISOString()
            },
            migration: existing.migration,
            theme: importedProfile.theme || existing.theme,
            sessionHistory: merged.slice(0, 500),
            seenQuestionIds: importedProfile.seenQuestionIds || existing.seenQuestionIds || [],
            mayLearnerState: importedProfile.mayLearnerState || existing.mayLearnerState || {},
            mayStudentRoll: importedProfile.mayStudentRoll || existing.mayStudentRoll || [],
            mayUsageLog: importedProfile.mayUsageLog || existing.mayUsageLog || [],
            maySafetyLog: importedProfile.maySafetyLog || existing.maySafetyLog || [],
            mayGateLog: importedProfile.mayGateLog || existing.mayGateLog || [],
            maySessionTelemetry: importedProfile.maySessionTelemetry || existing.maySessionTelemetry || [],
            mayPilotTelemetry: importedProfile.mayPilotTelemetry || existing.mayPilotTelemetry || {},
            mayPilotTelemetryArchive: importedProfile.mayPilotTelemetryArchive || existing.mayPilotTelemetryArchive || [],
            maySelectedLearnerId: importedProfile.maySelectedLearnerId || existing.maySelectedLearnerId,
            defectManifestCache: importedProfile.defectManifestCache || existing.defectManifestCache,
            bookmarkCollections: (function () {
                var existCol = existing.bookmarkCollections || {};
                var importCol = importedProfile.bookmarkCollections || {};
                var merged = {};
                var seen = {};
                for (var cid in existCol) { merged[cid] = existCol[cid]; seen[existCol[cid].name] = cid; }
                for (var cid in importCol) {
                    var name = importCol[cid].name;
                    if (seen[name]) {
                        var existCid = seen[name];
                        if (importCol[cid].items && existCol[existCid].items && importCol[cid].items.length > existCol[existCid].items.length) {
                            merged[existCid] = importCol[cid];
                        }
                    } else {
                        merged[cid] = importCol[cid];
                        seen[name] = cid;
                    }
                }
                return merged;
            })()
        };
        return mergedProfile;
    }
};

// ── S112: Settings/Data view renderer ─────────────────────
function renderSettingsView() {
    var profile = window._cmaProfile || CMAProfileManager.init();
    var stats = CMAProfileManager.getStats(profile);
    var backups = CMAProfileManager.getBackups();
    var migration = profile.migration || {};

    var html = '<h2>Settings</h2>';

    // Profile info
    html += '<div class="settings-section"><h3>Profile</h3>';
    html += '<div class="settings-grid">';
    html += '<div><span class="settings-label">Profile ID</span><span class="settings-value">' + (profile.profileId || '—') + '</span></div>';
    html += '<div><span class="settings-label">Created</span><span class="settings-value">' + (stats.profileCreated ? new Date(stats.profileCreated).toLocaleDateString() : '—') + '</span></div>';
    html += '<div><span class="settings-label">Total Sessions</span><span class="settings-value">' + stats.sessions + '</span></div>';
    html += '<div><span class="settings-label">Questions Seen</span><span class="settings-value">' + stats.seenQuestions + '</span></div>';
    html += '<div><span class="settings-label">Migration</span><span class="settings-value">' + (migration.completed ? 'Completed ' + (migration.completedAt ? new Date(migration.completedAt).toLocaleDateString() : '') : 'Not needed') + '</span></div>';
    html += '<div><span class="settings-label">Last Backup</span><span class="settings-value">' + (stats.lastBackup ? new Date(stats.lastBackup).toLocaleString() : 'None') + '</span></div>';
    html += '</div></div>';

    // Data management
    html += '<div class="settings-section"><h3>Data Management</h3>';
    html += '<div class="settings-actions">';
    html += '<button class="primary settings-btn" onclick="CMAProfileManager.backupAllProgress()" title="Download all progress including sessions, collections, May coaching data, and in-progress exam state">&#128190; Backup All Progress</button> ';
    html += '<button class="secondary settings-btn" id="importProfileBtn" onclick="document.getElementById(\'importProfileFile\').click()" title="Restore all your learner data from a previously saved backup file">&#128229; Restore Progress</button>';
    html += '<input type="file" id="importProfileFile" accept=".json" style="display:none" onchange="handleProfileImport(this.files[0])">';
    html += '</div>';
    html += '<p class="small" style="margin-top:12px;"><strong>Backup All Progress</strong> saves your complete learner data: session history, bookmark collections, May coaching memory, seen questions, and any in-progress exam session. Save this file somewhere safe to archive your training or move to another device.</p>';
    html += '<p class="small"><strong>Restore Progress</strong> replaces your current data with the saved backup. A safety backup is created automatically before restoring.</p>';
    html += '<p class="small" style="margin-top:4px;">Also available: <a href="#" onclick="CMAProfileManager.exportProfile();return false;" style="text-decoration:underline;">Export Full Profile (JSON)</a> — profile-only export without in-progress session snapshot.</p>';
    html += '</div>';

    // Backup history
    if (backups.length > 0) {
        html += '<div class="settings-section"><h3>Automatic Backups</h3>';
        html += '<p class="small">Last ' + Math.min(backups.length, 5) + ' backup(s) retained. Click <strong>Restore</strong> to roll back to a previous snapshot.</p>';
        html += '<div class="settings-grid">';
        for (var i = 0; i < backups.length; i++) {
            var b = backups[i];
            html += '<div style="display:flex;justify-content:space-between;align-items:center;width:100%;"><div><span class="settings-label">Backup ' + (b.slot + 1) + '</span><span class="settings-value">' + new Date(b.timestamp).toLocaleString() + ' (' + b.sessions + ' sessions)</span></div>';
            html += '<button onclick="if(CMAProfileManager.restoreBackup(' + b.slot + ')){alert(\'Backup restored. Current profile was backed up first.\')}" class="btn btn-small" style="padding:2px 10px;font-size:0.75rem;">Restore</button></div>';
        }
        html += '</div></div>';
    }

    // S124 — Version / admin gate trigger
    html += '<div class="settings-section"><h3>About</h3>';
    html += '<p class="small"><span id="settingsVersionLabel" style="cursor:default;color:var(--text-muted)">CMA Learning Platform v0.10.1-alpha</span></p>';
    html += '</div>';

    document.getElementById('settingsView').innerHTML = html;

    // S124 — Wire admin gate to version label
    var verLabel = document.getElementById('settingsVersionLabel');
    if (verLabel && typeof AdminGate !== 'undefined') AdminGate.attachToVersion(verLabel);
}

// ── S112: Profile import handler ──────────────────────────
function handleProfileImport(file) {
    if (!file) return;
    CMAProfileManager.importProfile(file,
        // onPreview
        function (preview, fullProfile) {
            var existing = window._cmaProfile || CMAProfileManager.load();
            var hasExisting = existing.sessionHistory && existing.sessionHistory.length > 0;
            var existingSessions = hasExisting ? existing.sessionHistory.length : 0;
            var importedSessions = preview.sessionCount;

            var msg = 'Import Profile Preview\n\n';
            msg += 'File contains: ' + importedSessions + ' sessions, ' + preview.seenQuestions + ' seen questions\n';
            msg += 'Schema version: v' + preview.schemaVersion + '\n';
            msg += 'Last activity: ' + (preview.lastSession ? new Date(preview.lastSession).toLocaleString() : 'Unknown') + '\n\n';

            if (hasExisting) {
                msg += 'Your current profile has ' + existingSessions + ' sessions.\n';
                msg += 'A backup of your current profile will be created before import.\n\n';
                msg += 'Choose an action:\n';
                msg += '  [OK] = Merge (keep both profiles' + "'" + ' data)\n';
                msg += '  [Cancel] = Replace dialog';
                var choice = confirm(msg + '\n\nClick OK to MERGE profiles, or Cancel for more options.');
                if (choice) {
                    CMAProfileManager.createBackup();
                    var merged = CMAProfileManager.mergeProfile(fullProfile);
                    CMAProfileManager.save(merged);
                    CMAProfileManager.syncToMayStorage(merged);
                    window._cmaProfile = merged;
                    renderSettingsView();
                    if (typeof ExamSessionManager !== 'undefined') ExamSessionManager.renderHistory();
                    alert('Profiles merged. ' + merged.sessionHistory.length + ' sessions total.');
                } else {
                    var msg2 = 'Replace your current profile (' + existingSessions + ' sessions) with the imported one (' + importedSessions + ' sessions)?\n\nYour current profile will be backed up first.';
                    if (confirm(msg2)) {
                        CMAProfileManager.executeImport(fullProfile);
                        renderSettingsView();
                        if (typeof ExamSessionManager !== 'undefined') ExamSessionManager.renderHistory();
                        alert('Profile replaced. ' + importedSessions + ' sessions imported. Reloading to apply.');
                        location.reload();
                    }
                }
            } else {
                msg += 'Click OK to import. A backup of the current profile will be created.';
                if (confirm(msg)) {
                    CMAProfileManager.createBackup();
                    CMAProfileManager.executeImport(fullProfile);
                    renderSettingsView();
                    if (typeof ExamSessionManager !== 'undefined') ExamSessionManager.renderHistory();
                    alert('Profile imported. ' + importedSessions + ' sessions restored. Reloading to apply.');
                    location.reload();
                }
            }
        },
        // onError
        function (err) { alert('Import failed: ' + err); }
    );
}

// ============================================================
// Constants
// ============================================================
const DECIMAL_PRECISION = 10000000000;
const round10 = v => Math.round(v * DECIMAL_PRECISION) / DECIMAL_PRECISION;
const CHOICES = ['A', 'B', 'C', 'D'];

function renderMarkdownTables(text) {
    if (!text || typeof text !== 'string') return text;
    var lines = text.split('\n');
    var result = [];
    var i = 0;
    while (i < lines.length) {
        var line = lines[i];
        if (/^\s*\|[^|\n]+\|/.test(line) && i + 1 < lines.length && /^\s*\|[\s\-:|]+\|/.test(lines[i + 1])) {
            var headerLine = line;
            var sepLine = lines[i + 1];
            var dataLines = [];
            var j = i + 2;
            while (j < lines.length && /^\s*\|[^|\n]+\|/.test(lines[j])) {
                dataLines.push(lines[j]);
                j++;
            }
            var headers = headerLine.split('|').map(function(c) { return c.trim(); }).filter(function(c) { return c !== ''; });
            var seps = sepLine.split('|').map(function(c) { return c.trim(); }).filter(function(c) { return c !== ''; });
            var alignMap = seps.map(function(s) {
                var left = s.charAt(0) === ':';
                var right = s.charAt(s.length - 1) === ':';
                if (left && right) return 'center';
                if (right) return 'right';
                return 'left';
            });
            var rows = dataLines.map(function(dl) {
                return dl.split('|').map(function(c) { return c.trim(); }).filter(function(c, idx, arr) { return idx > 0 || c !== ''; });
            });
            var html = '<table><thead><tr>';
            for (var h = 0; h < headers.length; h++) {
                html += '<th style="text-align:' + (alignMap[h] || 'left') + '">' + headers[h] + '</th>';
            }
            html += '</tr></thead><tbody>';
            for (var r = 0; r < rows.length; r++) {
                html += '<tr>';
                for (var c = 0; c < headers.length; c++) {
                    var cell = (rows[r] && rows[r][c]) ? rows[r][c] : '';
                    html += '<td style="text-align:' + (alignMap[c] || 'left') + '">' + cell + '</td>';
                }
                html += '</tr>';
            }
            html += '</tbody></table>';
            result.push(html);
            i = j;
        } else {
            result.push(line);
            i++;
        }
    }
    return result.join('\n');
}

function nl2br(text) {
    if (!text || typeof text !== 'string') return text || '';
    text = renderMarkdownTables(text);
    if (/<[a-z][\s\S]*>/i.test(text)) return text;
    let html = text.replace(/\n\n+/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    return '<p>' + html + '</p>';
}

// S77 — Extract structured sections from a single ExplanationCorrect block
function extractExplanationSections(rawText, topic) {
    if (!rawText) return { tested: '', correct: '', takeaway: '' };
    let text = rawText.trim();
    let result = { tested: '', correct: '', takeaway: '' };

    // Heuristic 1: "What was tested" — first sentence that names a standard/framework
    let testedMatch = text.match(/^(.+?(?:under\s+(?:ASC|IFRS|COSO|GAAP|IAS|IIA|IMA)|tests\s+(?:the|a)\s|covers\s+(?:the|a)\s|assesses\s+(?:the|a)\s).+?[.!?])\s/i);
    if (testedMatch) {
        result.tested = testedMatch[1];
        text = text.substring(testedMatch[0].length).trim();
    } else {
        // Fallback: first sentence
        let firstDot = text.indexOf('.');
        if (firstDot > 20 && firstDot < 250) {
            result.tested = text.substring(0, firstDot + 1);
            text = text.substring(firstDot + 1).trim();
        }
    }

    // Heuristic 2: "Takeaway" — last section mentioning "common error", "trap", "remember", "key", "exam"
    let takeawayPatterns = [
        /(?:A common error|common trap|key takeaway|remember that|on the exam|exam tip|watch (?:out )?for)[^.]*\.[^.]*\.?/gi,
        /(?:The key|In summary|Bottom line)[^.]*\.[^.]*\.?/gi
    ];
    for (let pat of takeawayPatterns) {
        let m = text.match(pat);
        if (m) {
            let takeawayText = m[m.length - 1];
            let idx = text.lastIndexOf(takeawayText);
            if (idx > text.length * 0.5) {
                result.takeaway = takeawayText.trim();
                text = text.substring(0, idx).trim();
                break;
            }
        }
    }

    // If no takeaway found, use the last sentence if it's short and "punchy"
    if (!result.takeaway && text.length > 100) {
        let sentences = text.match(/[^.!?]+[.!?]+/g);
        if (sentences && sentences.length > 1) {
            let last = sentences[sentences.length - 1].trim();
            if (last.length < 200 && last.length > 20) {
                result.takeaway = last;
                text = text.substring(0, text.lastIndexOf(last)).trim();
            }
        }
    }

    // Heuristic 3: "Why correct" — the remaining core explanation
    result.correct = text || '';

    // If nothing was extracted, put the whole thing in correct
    if (!result.tested && !result.takeaway) {
        result.correct = rawText.trim();
    }

    return result;
}
const EXAM_MODES = ['full', 'practice', 'custom', 'blueprint', 'random'];
const TIMER_WARNINGS = [1800, 600, 300]; // 30min, 10min, 5min in seconds
const AUTO_SAVE_INTERVAL = 5000; // 5 seconds
const FULL_EXAM_SECONDS = 14400; // 4 hours
const MCQ_GATE_THRESHOLD = 0.50; // 2026 CMA: 50% MCQ required before CBQ access
const SAVE_STATUS_DURATION = 3000; // 3 seconds visible

// Difficulty presets — small form-difficulty calibration applied after
// the fixed 75/25 weighting. Does NOT change the MCQ gate or section
// weights. Reflects the fact that real CMA scaled scores incorporate
// exam-form difficulty variations via equating.
const DIFFICULTY_PRESETS = {
    standard: { mcqFactor: 1.00, cbqFactor: 1.00, scaleOffset: 0 },
    easier:   { mcqFactor: 0.98, cbqFactor: 0.98, scaleOffset: -8 },
    harder:   { mcqFactor: 1.02, cbqFactor: 1.02, scaleOffset: 8 }
};

// ============================================================
// CMA Scoring Disclaimer — Centralized Candidate Explanation
// ============================================================
// Rendered on every scored test/simulation view.
// Mirrors CMA exam structural scoring rules while transparently
// disclosing differences vs. real CMA equating and scaling.
function CmaScoringDisclaimer(mode) {
    // mode: 'full' for exam results, 'compact' for drills / section tests

    const fullText = `
<div class="cma-disclaimer cma-disclaimer-full">
<h3>CMA-Style Scoring Simulator — Important Notes</h3>
<p>This practice test mirrors the <strong>structure</strong> of CMA exam scoring but does <strong>not</strong> reproduce the official scaled scoring used by the IMA.</p>

<h4>How this simulator mirrors CMA rules:</h4>
<ul>
<li><strong>MCQs are binary:</strong> Scored correct or incorrect only — no partial credit, no negative marking.</li>
<li><strong>CBQs receive partial credit:</strong> Each element earns points; incorrect components do not subtract from earned points.</li>
<li><strong>Weighting: 75% MCQ / 25% CBQ:</strong> Matches the structural weighting on the CMA exam.</li>
<li><strong>MCQ gate (50%):</strong> At least 50% of MCQs must be correct to unlock CBQs, consistent with CMA rules.</li>
<li><strong>0–500 scale with 360 threshold:</strong> Your result is reported on the same scale and passing threshold used by CMA.</li>
</ul>

<h4>How this simulator differs from real CMA scoring:</h4>
<ul>
<li><strong>No equating or item-difficulty scaling.</strong> The real CMA exam uses scaled scoring and psychometric equating: the same percentage correct can produce different scaled scores across exam forms. This simulator uses neutral, linear weighting (75% MCQ × 25% CBQ → 0–500).</li>
<li><strong>No unscored (pretest) items.</strong> The real CMA exam includes unscored items that do not count toward your result.</li>
<li><strong>Simplified CBQ grading.</strong> Real CMA CBQs are graded by trained subject-matter experts using detailed rubrics. This simulator provides an automated approximation.</li>
</ul>

<h4>What this means for your preparation:</h4>
<ul>
<li>Treat your simulator score as a <strong>training indicator</strong>, not a precise prediction of your official CMA result.</li>
<li>A simulated 360 does <strong>not guarantee</strong> a passing score on the real exam, and a score below 360 here does not guarantee failure.</li>
<li><strong>Aim to score comfortably above 360</strong> in this simulator to build a margin of safety for differences in difficulty, exam-day conditions, and the equating process.</li>
<li>Only the official CMA score report from the IMA confirms whether you have passed.</li>
<li><strong>Readiness bands and study plans</strong> are simulator-based guidance only. They reflect your practice performance patterns and are not predictive of official outcomes.</li>
</ul>
</div>`;

    const compactText = `
<div class="cma-disclaimer cma-disclaimer-compact">
<p><strong>CMA-style training score — not an official result.</strong> MCQs are scored correct/incorrect, CBQs receive partial credit, and results are shown on a 0–500 scale with 360 as a modeled passing threshold. The real CMA exam uses scaled scoring and equating based on question difficulty and exam form; your official CMA score may differ. Treat this score as a training indicator and aim to score comfortably above 360 to build a margin of safety for the real exam.</p>
    <p class="small">Performance analytics, topic breakdowns, and remediation recommendations are derived from your simulator session data and are intended for study planning only. They are not diagnostic tools for the official CMA exam.</p>
    <p class="small">Readiness bands and study plans are based on your performance in this simulator. They are designed to guide your study, not to predict your exact CMA exam score.</p>
</div>`;

    return mode === 'full' ? fullText : compactText;
}

// ============================================================
// Tiered Pool — Quality Heuristic & Caching
// ============================================================
// Tier system: favors Certified content first, then the
// best-scoring Unprocessed items, then remaining Unprocessed.
// This is a STRUCTURAL PROXY SCORE ONLY — it does NOT replace
// six-dimension verification or confer Certified status.  A
// high heuristic score should never be mistaken for a
// Certified-quality guarantee.
//
// Three tiers:
//   Tier 1 — "Certified"              (question_state === "Certified")
//   Tier 2 — "Best Unprocessed"       (Unprocessed + quality score >= 2)
//   Tier 3 — "Remaining Unprocessed"  (everything else not hard-excluded)
//
// Hard-excluded items (never included):
//   - question_state === "Archived"
//   - question_state === "In Audit" or "Editorial Queue"
//   - DL-009 / DL-011 flagged (only if flag fields exist in bank data)
//
// Scoring uses exclusively structural, deterministic signals —
// no AI/LLM is called at runtime.  Computed once per app load.

function scoreQuestionQuality(q) {
    let score = 0;

    // ---- Explanation completeness (proxy for DL-007 template risk) ----
    const expLen = (q.ExplanationCorrect || "").length;
    if (expLen >= 150) score += 3;
    else if (expLen >= 60) score += 1;
    else score -= 2; // very short / generic explanation — likely template artifact

    // ---- Distractor explanation completeness ----
    const wrongExpLens = [q.ExplanationWrongA, q.ExplanationWrongB, q.ExplanationWrongC]
        .filter(Boolean).map(e => e.length);
    if (wrongExpLens.length && wrongExpLens.every(l => l >= 40)) score += 2;
    if (wrongExpLens.some(l => l < 15)) score -= 2;

    // ---- Metadata completeness ----
    if (q.question_state) score += 1;
    if (q.CitationSource || q.Reference) score += 1;
    if (q.pedagogical_cluster) score += 1;

    // NOTE: dl007Flag / dl009Flag / dl010Flag / dl011Flag defect-list
    // exclusion is not yet wired to source pack data — no pack file
    // currently populates these fields.  When defect flags are available
    // (e.g. via a companion DEFECT_FLAGS lookup object keyed by QuestionID),
    // add penalty branches here.  Until then, the checks below are no-ops.

    // ---- Duplicate / clone pattern penalty ----
    if (q._isClonePattern) score -= 2;

    return score;
}

function assignTier(q) {
    const state = (q.question_state || "").trim();
    if (state === "Archived" || state === "In Audit" || state === "Editorial Queue") {
        q._tier = -1; // hard-excluded
        return;
    }
    // Session 88 — Delivery blocklist: checks governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json
    // and the embedded defect_manifest.js for QIDs that must be excluded from learner delivery
    // regardless of question_state.  Covers DL-008 Certified items, known answer-key risks, etc.
    if (q.QuestionID && _isDeliveryBlocked(q.QuestionID)) {
        q._tier = -1;
        q._blockedReason = 'DELIVERY_BLOCKLIST';
        return;
    }
    if (state === "Certified") {
        q._tier = 1;
    } else {
        // NOTE: dl009Flag / dl011Flag hard-exclusion is not yet wired —
        // no pack file currently populates these fields.  When wired via
        // a companion DEFECT_FLAGS lookup, add a branch here.
        // Unprocessed or missing state — score it
        const sc = scoreQuestionQuality(q);
        q._qualityScore = sc;
        q._tier = sc >= 2 ? 2 : 3;
    }
}

// ── Session 96 — Defect manifest: unified ingestion, validation, dedup, diagnostics ──
// Replaces Session 88 fragmented blocklist loading.
// Sources (priority order):
//   1. window._cmaDefectManifest.blocked — populated by may-core.js _fetchDefectManifest()
//   2. window._cmaDeliveryBlocklist.blocked — legacy static blocklist (<script> loaded)
//   3. Direct JSON fetch (governance/DEFECT_MANIFEST_DL008_DL026.json) — async fallback
let _DefectManifest = (function() {
    var LOAD_STATE = { NOT_LOADED: 0, LOADING: 1, PARTIAL: 2, LOADED: 3, ERROR: 4 };
    var _state = LOAD_STATE.NOT_LOADED;
    var _blockedSet = null;          // Set of blocked QIDs
    var _byCode = {};                // { 'DL-008': Set, 'DL-026': Set }
    var _byPack = {};                // { 'A': Set, 'C': Set, 'D': Set }
    var _entries = [];               // Raw entry objects for diagnostics
    var _loadError = null;
    var _loadTimestamp = null;

    function _entryOk(e) { return e && typeof e.qid === 'string' && e.qid.length >= 6 && e.defect_code; }

    function _addEntry(e) {
        if (!_entryOk(e)) return false;
        if (_blockedSet.has(e.qid)) return false; // already present (dedup)
        _blockedSet.add(e.qid);
        _entries.push(e);
        var code = e.defect_code || 'UNKNOWN';
        var pack = e.pack || '?';
        if (!_byCode[code]) _byCode[code] = new Set();
        _byCode[code].add(e.qid);
        if (!_byPack[pack]) _byPack[pack] = new Set();
        _byPack[pack].add(e.qid);
        return true;
    }

    function _ingestArray(arr) {
        if (!Array.isArray(arr)) return 0;
        var c = 0;
        for (var i = 0; i < arr.length; i++) {
            if (_addEntry(arr[i])) c++;
        }
        return c;
    }

    function _ingestDict(dict) {
        if (!dict || typeof dict !== 'object') return 0;
        var keys = Object.keys(dict);
        var c = 0;
        for (var i = 0; i < keys.length; i++) {
            // Legacy format: { qid: true } — synthesize minimal entry
            if (_blockedSet.has(keys[i])) continue;
            _blockedSet.add(keys[i]);
            _entries.push({ qid: keys[i], defect_code: 'UNKNOWN', pack: '?', notes: 'legacy blocklist' });
            if (!_byCode['UNKNOWN']) _byCode['UNKNOWN'] = new Set();
            _byCode['UNKNOWN'].add(keys[i]);
            if (!_byPack['?']) _byPack['?'] = new Set();
            _byPack['?'].add(keys[i]);
            c++;
        }
        return c;
    }

    function _loadSources() {
        _blockedSet = new Set();
        _byCode = {};
        _byPack = {};
        _entries = [];
        var total = 0;

        // Source 1: Full manifest (may-core.js populated from JSON fetch)
        if (typeof window !== 'undefined' && window._cmaDefectManifest) {
            var m = window._cmaDefectManifest;
            if (Array.isArray(m.blocked)) {
                total += _ingestArray(m.blocked);
            } else if (Array.isArray(m.blockedQids)) {
                total += _ingestArray(m.blockedQids);
            }
        }

        // Source 2: Legacy static blocklist (delivery_blocklist.js)
        if (typeof window !== 'undefined' && window._cmaDeliveryBlocklist && window._cmaDeliveryBlocklist.blocked) {
            total += _ingestDict(window._cmaDeliveryBlocklist.blocked);
        }

        _loadTimestamp = new Date().toISOString();
        return total;
    }

    function _ensureLoaded() {
        if (_state === LOAD_STATE.LOADED || _state === LOAD_STATE.PARTIAL) return;
        _state = LOAD_STATE.LOADING;
        try {
            var count = _loadSources();
            if (count > 0) _state = LOAD_STATE.LOADED;
            else _state = LOAD_STATE.PARTIAL; // loaded but nothing found — possibly stale
        } catch (e) {
            _state = LOAD_STATE.ERROR;
            _loadError = e.message || 'Unknown error loading defect manifest';
        }
    }

    // ── Public API ──

    function isBlocked(qid) {
        _ensureLoaded();
        return _blockedSet ? _blockedSet.has(qid) : false;
    }

    function getReason(qid) {
        _ensureLoaded();
        for (var i = 0; i < _entries.length; i++) {
            if (_entries[i].qid === qid) return _entries[i].defect_code + ': ' + (_entries[i].notes || 'no details');
        }
        return null;
    }

    function getStats() {
        _ensureLoaded();
        var byCode = {};
        for (var k in _byCode) { if (_byCode.hasOwnProperty(k)) byCode[k] = _byCode[k].size; }
        var byPack = {};
        for (var pk in _byPack) { if (_byPack.hasOwnProperty(pk)) byPack[pk] = _byPack[pk].size; }
        return {
            loadState: _state,
            loadStateLabel: ['NOT_LOADED','LOADING','PARTIAL','LOADED','ERROR'][_state] || 'UNKNOWN',
            totalBlocked: _blockedSet ? _blockedSet.size : 0,
            byCode: byCode,
            byPack: byPack,
            loadTimestamp: _loadTimestamp,
            loadError: _loadError || null
        };
    }

    function getLoadState() { return _state; }
    function isHealthy() { return _state === LOAD_STATE.LOADED && _blockedSet && _blockedSet.size > 0; }

    return { isBlocked: isBlocked, getReason: getReason, getStats: getStats, getLoadState: getLoadState, isHealthy: isHealthy };
})();

// Backward-compatible alias — existing callers can use _DefectManifest instead
function _isDeliveryBlocked(qid) { return _DefectManifest.isBlocked(qid); }

// Lightweight per-load cache keyed by user interaction with packs.
// Invalidated when pack checkboxes change (detected in start()).
let _mcqPoolCache = null;
let _casePoolCache = null;
let _poolPacksKey = "";
let _casePacksKey = "";

function _resetPoolCache() {
    _mcqPoolCache = null;
    _casePoolCache = null;
    _poolPacksKey = "";
    _casePacksKey = "";
}

// ============================================================
// State
// ============================================================
let state = {
    session: null,
    calcDisplay: '0',
    calcMemory: 0,
    calcHistory: [],
    analytics: null
};
let timerInt = null;
let autoSaveInt = null;

// ============================================================
// DOM Helper
// ============================================================
const $ = id => document.getElementById(id);

function fmt(sec) {
    sec = Math.max(0, Math.floor(sec));
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    let s = sec % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function fmtShort(sec) {
    sec = Math.max(0, Math.floor(sec));
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${sec % 60}s`;
}

let saveStatusTimer = null;
let saveStatusPersist = false;
function showSaveStatus(text, className, persist) {
    let el = $('saveStatus');
    if (!el) return;
    clearTimeout(saveStatusTimer);
    el.textContent = text;
    el.className = 'save-status visible ' + (className || '');
    saveStatusPersist = persist || false;
    if (!persist) {
        saveStatusTimer = setTimeout(() => {
            el.classList.remove('visible');
        }, SAVE_STATUS_DURATION);
    }
}
// Persist a status until explicitly cleared
function persistSaveStatus(text, className) {
    showSaveStatus(text, className, true);
}
function clearSaveStatus() {
    let el = $('saveStatus');
    if (!el) return;
    clearTimeout(saveStatusTimer);
    el.className = 'save-status';
    el.textContent = '';
    saveStatusPersist = false;
}

function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    $(id).classList.add('active');
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === id));
}

// ---- Fisher-Yates shuffle ----
function shuffle(arr) {
    let a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ============================================================
// CalculatorEngine
// ============================================================
const CalculatorEngine = {
    safeCalc(expr) {
        expr = String(expr || '').replace(/[×]/g, '*').replace(/[÷]/g, '/');
        expr = expr.replace(/[^0-9+\-*/(). ]/g, '');
        if (!expr.trim()) return '0';
        let pos = 0;

        function skipSpace() { while (pos < expr.length && expr[pos] === ' ') pos++; }

        function parseNumber() {
            skipSpace();
            let start = pos;
            if (pos < expr.length && expr[pos] === '-') pos++;
            while (pos < expr.length && /[0-9.]/.test(expr[pos])) pos++;
            if (start === pos) return null;
            let n = parseFloat(expr.slice(start, pos));
            return isNaN(n) ? null : n;
        }

        function parseAtom() {
            skipSpace();
            if (pos >= expr.length) return null;
            if (expr[pos] === '(') { pos++; let v = parseExpr(); skipSpace(); if (pos >= expr.length || expr[pos] !== ')') throw new Error('Mismatched parentheses'); pos++; return v; }
            if (expr[pos] === '-') { pos++; let v = parseAtom(); return v === null ? null : -v; }
            return parseNumber();
        }

        function parseTerm() {
            let v = parseAtom();
            while (v !== null) { skipSpace(); let op = pos < expr.length ? expr[pos] : null; if (op !== '*' && op !== '/') break; pos++; let rhs = parseAtom(); if (rhs === null) break; v = op === '*' ? v * rhs : v / rhs; }
            return v;
        }

        function parseExpr() {
            let v = parseTerm();
            while (v !== null) { skipSpace(); let op = pos < expr.length ? expr[pos] : null; if (op !== '+' && op !== '-') break; pos++; let rhs = parseTerm(); if (rhs === null) break; v = op === '+' ? v + rhs : v - rhs; }
            return v;
        }
        try {
            let result = parseExpr();
            skipSpace();
            if (result === null || pos < expr.length) return 'Error';
            return Number.isFinite(result) ? String(round10(result)) : 'Error';
        } catch (e) { return 'Error'; }
    },

    currentValue(v) {
        let n = parseFloat(this.safeCalc(v));
        return Number.isFinite(n) ? n : NaN;
    },

    setValue(v) {
        if (!Number.isFinite(v)) return 'Error';
        return String(round10(v));
    },

    render() {
        if ($('floatingCalculator')) { this.updateDisplay(); return; }
        let buttons = [
            ['clear', 'C'], ['back', '\u232B'], ['sign', '\u00B1'], ['/', '\u00F7'],
            ['7', '7'], ['8', '8'], ['9', '9'], ['*', '\u00D7'],
            ['4', '4'], ['5', '5'], ['6', '6'], ['-', '\u2212'],
            ['1', '1'], ['2', '2'], ['3', '3'], ['+', '+'],
            ['0', '0'], ['00', '00'], ['.', '.'], ['=', '=']
        ];
        let el = document.createElement('div');
        el.innerHTML = `<section id="floatingCalculator" class="exam-calculator floating-calculator" aria-label="On-screen calculator" role="application">
      <div class="calc-title" id="calcDragHandle"><b>Calculator</b><span class="calc-memory-indicator">M: ${this.setValue(state.calcMemory)}</span><button class="calc-history-clear" id="calcClearHistory" title="Clear history" aria-label="Clear calculator history">&#x2326;</button><button class="calc-minimize" id="calcMinimize" aria-label="Minimize calculator">\u2212</button></div>
      <input id="calcDisplay" class="calc-display" value="${state.calcDisplay}" inputmode="decimal" aria-label="Calculator display" tabindex="0">
      <div class="calc-grid">${buttons.map(([k, label]) =>
            `<button type="button" class="calc-btn ${k === '=' ? 'equals' : ''}" data-calc="${k}" tabindex="-1">${label}</button>`
        ).join('')}</div>
      <div class="calc-functions">
        <button type="button" data-calc="percent" tabindex="-1">%</button>
        <button type="button" data-calc="reciprocal" tabindex="-1">1/x</button>
        <button type="button" data-calc="square" tabindex="-1">x\u00B2</button>
        <button type="button" data-calc="sqrt" tabindex="-1">\u221Ax</button>
      </div>
      <div class="calc-memory">
        <button type="button" data-calc="mplus" tabindex="-1">M+</button>
        <button type="button" data-calc="mminus" tabindex="-1">M\u2212</button>
        <button type="button" data-calc="mr" tabindex="-1">MR</button>
        <button type="button" data-calc="mc" tabindex="-1">MC</button>
      </div>
      <div class="calc-history-header" id="calcHistoryToggle">
        <span>History</span>
        <span class="calc-history-arrow">&#9660;</span>
      </div>
      <div class="calc-history" id="calcHistory"></div>
    </section>`;
        document.body.appendChild(el.firstElementChild);
        this.bind();
    },

    bind() {
        let d = $('calcDisplay');
        if (!d) return;
        d.oninput = () => { state.calcDisplay = d.value || '0'; };
        d.onfocus = () => { if (state.calcDisplay === '0') { state.calcDisplay = ''; d.value = ''; } d.select(); };
        d.onblur = () => { if (d.value === '') { state.calcDisplay = '0'; d.value = '0'; } };
        d.onkeydown = e => {
            if (e.key === 'Enter') { e.preventDefault(); this.evaluate(); }
            if (e.key === 'Escape') { state.calcDisplay = '0'; d.value = '0'; }
        };
        document.querySelectorAll('[data-calc]').forEach(b => {
            b.onclick = () => this.handleKey(b.dataset.calc);
        });
        this.bindDrag();
        let minBtn = $('calcMinimize');
        if (minBtn) minBtn.onclick = () => {
            let c = $('floatingCalculator');
            if (c) {
                c.classList.toggle('minimized');
                let minimized = c.classList.contains('minimized');
                minBtn.textContent = minimized ? '+' : '\u2212';
                if (minimized) {
                    this.showCalcFloatBtn();
                } else {
                    this.hideCalcFloatBtn();
                }
            }
        };

        // Clear history with double-confirmation
        let clearBtn = $('calcClearHistory');
        if (clearBtn) {
            clearBtn.confirmState = 0;
            clearBtn.onclick = () => {
                clearBtn.confirmState = (clearBtn.confirmState || 0) + 1;
                if (clearBtn.confirmState === 1) {
                    clearBtn.textContent = '\u2713?';
                    clearBtn.style.color = '#f59e0b';
                    clearBtn.title = 'Click again to confirm clear';
                    setTimeout(() => {
                        if (clearBtn.confirmState === 1) {
                            clearBtn.confirmState = 0;
                            clearBtn.textContent = '\u2326';
                            clearBtn.style.color = '';
                            clearBtn.title = 'Clear history';
                        }
                    }, 3000);
                } else {
                    clearBtn.confirmState = 0;
                    clearBtn.textContent = '\u2326';
                    clearBtn.style.color = '';
                    clearBtn.title = 'Clear history';
                    state.calcHistory = [];
                    let ch = $('calcHistory');
                    if (ch) ch.innerHTML = '';
                }
            };
        }

        // Collapsible history
        let histToggle = $('calcHistoryToggle');
        if (histToggle) {
            histToggle.onclick = () => {
                let hist = $('calcHistory');
                if (hist) {
                    hist.classList.toggle('calc-history-collapsed');
                    let arrow = histToggle.querySelector('.calc-history-arrow');
                    if (arrow) {
                        arrow.textContent = hist.classList.contains('calc-history-collapsed') ? '\u25B6' : '\u25BC';
                    }
                }
            };
        }

        // Floating restore button (render once)
        if (!$('calcFloatRestore')) {
            let fb = document.createElement('div');
            fb.id = 'calcFloatRestore';
            fb.className = 'calc-float-btn';
            fb.title = 'Drag to reposition, click to restore';
            fb.innerHTML = '<span class="calc-float-label">123</span><span class="calc-float-sub">CALC</span>';

            let self = this;
            let dragBtn = false, btnStartX = 0, btnStartY = 0, btnBaseX = 0, btnBaseY = 0;
            fb.onpointerdown = e => {
                dragBtn = true;
                btnStartX = e.clientX; btnStartY = e.clientY;
                let r = fb.getBoundingClientRect();
                btnBaseX = r.left; btnBaseY = r.top;
                fb.setPointerCapture(e.pointerId);
            };
            fb.onpointermove = e => {
                if (!dragBtn) return;
                let x = Math.max(0, Math.min(window.innerWidth - fb.offsetWidth, btnBaseX + e.clientX - btnStartX));
                let y = Math.max(0, Math.min(window.innerHeight - fb.offsetHeight, btnBaseY + e.clientY - btnStartY));
                fb.style.left = x + 'px'; fb.style.top = y + 'px'; fb.style.right = 'auto';
            };
            fb.onpointerup = () => {
                let moved = dragBtn && (Math.abs(btnBaseX - fb.getBoundingClientRect().left) > 3 || Math.abs(btnBaseY - fb.getBoundingClientRect().top) > 3);
                dragBtn = false;
                if (moved) return;
                // Was a click (no drag) — restore calculator
                let c = $('floatingCalculator');
                if (c) {
                    c.classList.remove('minimized');
                    let mb = $('calcMinimize');
                    if (mb) mb.textContent = '\u2212';
                }
                self.hideCalcFloatBtn();
            };
            document.body.appendChild(fb);
        }
    },

    showCalcFloatBtn() {
        let fb = $('calcFloatRestore');
        if (fb) fb.classList.add('calc-float-visible');
    },

    hideCalcFloatBtn() {
        let fb = $('calcFloatRestore');
        if (fb) fb.classList.remove('calc-float-visible');
    },

    handleKey(k) {
        let v = state.calcDisplay;
        let n = this.currentValue(v);
        if (k === 'clear') { v = '0'; } else if (k === 'back') { v = v.length > 1 ? v.slice(0, -1) : '0'; } else if (k === '=') { this.evaluate(); return; } else if (k === 'sign') { v = Number.isFinite(n) ? this.setValue(-n) : (v.startsWith('-') ? v.slice(1) : '-' + v); } else if (k === 'percent') { v = Number.isFinite(n) ? this.setValue(n / 100) : 'Error'; } else if (k === 'reciprocal') { v = (Number.isFinite(n) && n !== 0) ? this.setValue(1 / n) : 'Error'; } else if (k === 'square') { v = Number.isFinite(n) ? this.setValue(n * n) : 'Error'; } else if (k === 'sqrt') { v = (Number.isFinite(n) && n >= 0) ? this.setValue(Math.sqrt(n)) : 'Error'; } else if (k === 'mplus') { if (Number.isFinite(n)) state.calcMemory += n; } else if (k === 'mminus') { if (Number.isFinite(n)) state.calcMemory -= n; } else if (k === 'mr') { v = this.setValue(state.calcMemory); } else if (k === 'mc') { state.calcMemory = 0; } else { v = (v === '0' || v === 'Error') ? k : v + k; }
        state.calcDisplay = v;
        this.updateDisplay();
    },

    evaluate() {
        let result = this.safeCalc(state.calcDisplay);
        if (result !== 'Error' && state.calcDisplay !== result) {
            state.calcHistory.unshift(state.calcDisplay + ' = ' + result);
            if (state.calcHistory.length > 20) state.calcHistory.pop();
            let ch = $('calcHistory');
            if (ch) ch.innerHTML = state.calcHistory.map(h => `<div>${h}</div>`).join('');
        }
        state.calcDisplay = result;
        this.updateDisplay();
    },

    updateDisplay() {
        let d = $('calcDisplay');
        if (d) d.value = state.calcDisplay;
        let mi = document.querySelector('.calc-memory-indicator');
        if (mi) mi.textContent = 'M: ' + this.setValue(state.calcMemory);
    },

    bindDrag() {
        let calc = $('floatingCalculator');
        let handle = $('calcDragHandle');
        if (!calc || !handle || calc.dataset.dragBound) return;
        calc.dataset.dragBound = '1';
        let dragging = false, startX = 0, startY = 0, baseX = 0, baseY = 0;
        handle.onpointerdown = e => {
            if (e.target.tagName === 'BUTTON') return;
            dragging = true;
            startX = e.clientX; startY = e.clientY;
            let rect = calc.getBoundingClientRect();
            baseX = rect.left; baseY = rect.top;
            handle.setPointerCapture(e.pointerId);
        };
        handle.onpointermove = e => {
            if (!dragging) return;
            let x = Math.max(8, Math.min(window.innerWidth - calc.offsetWidth - 8, baseX + e.clientX - startX));
            let y = Math.max(8, Math.min(window.innerHeight - calc.offsetHeight - 8, baseY + e.clientY - startY));
            calc.style.left = x + 'px'; calc.style.top = y + 'px'; calc.style.right = 'auto';
        };
        handle.onpointerup = () => { dragging = false; };
    },

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', e => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            let active = document.activeElement;
            if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) return;
            let calc = $('floatingCalculator');
            if (!calc || calc.classList.contains('minimized')) return;
            const keyMap = {
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
                '.': '.', '+': '+', '-': '-', '*': '*', '/': '/', 'Enter': '=', 'Backspace': 'back', 'Delete': 'clear',
                'Escape': 'clear', '%': 'percent'
            };
            if (e.key in keyMap) { e.preventDefault(); this.handleKey(keyMap[e.key]); }
        });
    }
};

// ============================================================
// AnalyticsCollector
// ============================================================
const AnalyticsCollector = {
    data: null,

    init(session) {
        this.data = {
            sessionId: Date.now().toString(36),
            mode: session.mode,
            startTime: Date.now(),
            questions: {},
            cases: {},
            events: []
        };
        session.mcqs.forEach((q, i) => {
            this.data.questions[q.QuestionID || i] = {
                index: i, section: q.Section, topic: q.Topic, difficulty: q.Difficulty,
                cognitiveLevel: q.CognitiveLevel, calculationRequired: q.CalculationRequired,
                timeSpent: 0, startTime: null, correct: null, confidence: null, flagged: false, guessed: false
            };
        });
        state.analytics = this.data;
    },

    startQuestion(qid) {
        if (this.data && this.data.questions[qid]) this.data.questions[qid].startTime = Date.now();
    },

    endQuestion(qid) {
        if (this.data && this.data.questions[qid] && this.data.questions[qid].startTime) {
            this.data.questions[qid].timeSpent += (Date.now() - this.data.questions[qid].startTime) / 1000;
            this.data.questions[qid].startTime = null;
        }
    },

    recordAnswer(qid, correct, confidence, guessed) {
        if (this.data && this.data.questions[qid]) {
            this.data.questions[qid].correct = correct;
            if (confidence !== undefined) this.data.questions[qid].confidence = confidence;
            if (guessed !== undefined) this.data.questions[qid].guessed = guessed;
        }
    },

    recordFlag(qid, flagged) {
        if (this.data && this.data.questions[qid]) this.data.questions[qid].flagged = flagged;
    },

    logEvent(eventType, detail) {
        if (this.data) this.data.events.push({ time: Date.now(), type: eventType, detail });
    },

    recordCbqAnswer(caseId, itemIdx, correct) {
        if (!this.data) return;
        let key = caseId + '_' + itemIdx;
        if (!this.data.cases[key]) this.data.cases[key] = { caseId, itemIdx, correct: null };
        this.data.cases[key].correct = correct;
    },

    getSummary() {
        if (!this.data) return null;
        let qs = Object.values(this.data.questions);
        let answered = qs.filter(q => q.correct !== null);
        let correct = answered.filter(q => q.correct === true);
        let bySection = {};
        qs.forEach(q => {
            if (!bySection[q.section]) bySection[q.section] = { total: 0, correct: 0, time: 0 };
            bySection[q.section].total++;
            if (q.correct === true) bySection[q.section].correct++;
            bySection[q.section].time += q.timeSpent;
        });
        let confidenceMismatch = answered.filter(q => q.confidence !== null && q.confidence >= 4 && q.correct === false).length;
        return {
            total: qs.length,
            answered: answered.length,
            correct: correct.length,
            accuracy: answered.length ? correct.length / answered.length : 0,
            bySection,
            avgTimePerQuestion: answered.length ? qs.reduce((s, q) => s + q.timeSpent, 0) / answered.length : 0,
            confidenceMismatch,
            flagged: qs.filter(q => q.flagged).length,
            guessed: qs.filter(q => q.guessed).length
        };
    }
};

// ============================================================
// SessionPersistence
// ============================================================
const SessionPersistence = {
    SAVE_KEY: 'cmaP1SessionState',
    CHECKPOINT_KEY: 'cmaP1SessionCheckpoints',
    JOURNAL_KEY: 'cmaP1SessionJournal',
    HISTORY_KEY: 'cmaP1History2026',
    SEEN_KEY: 'cmaP1SeenQuestions2026',
    TOPIC_SEEN_KEY: 'cmaP1SeenTopics2026',
    DASHBOARD_KEY: 'cmaP1Dashboard',
    MAX_CHECKPOINTS: 20,
    MAX_RETRIES: 3,

    // ── Level 1: Transactional save ──────────────────────
    save() {
        if (!state.session) return;
        try {
            showSaveStatus('Saving...', 'saving');
            const sn = this._buildSnapshot();
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(sn));
            if (sn.session && sn.session.completed) {
                localStorage.removeItem(this.CHECKPOINT_KEY);
                localStorage.removeItem(this.JOURNAL_KEY);
                // S112 — Auto-backup on session complete
                try { CMAProfileManager.createBackup(); } catch (e) {}
            }
            if (this._verifySave(sn)) {
                persistSaveStatus('All progress saved', 'saved');
            } else {
                this._retrySave(sn);
            }
        } catch (e) {
            persistSaveStatus('Save failed — retrying...', 'save-failed');
            this._retrySave(this._buildSnapshot());
        }
    },

    autoSave() {
        this.save();
    },

    // Level 1: saveImmediate — call on every meaningful interaction
    saveImmediate() {
        this.save();
    },

    _buildSnapshot() {
        const snapshot = {
            session: JSON.parse(JSON.stringify(state.session)),
            calcDisplay: state.calcDisplay,
            calcMemory: state.calcMemory,
            analytics: state.analytics,
            savedAt: Date.now(),
            checksum: 0
        };
        snapshot.checksum = this._checksum({
            session: snapshot.session,
            calcDisplay: snapshot.calcDisplay,
            calcMemory: snapshot.calcMemory,
            analytics: snapshot.analytics
        });
        return snapshot;
    },

    _checksum(obj) {
        const str = JSON.stringify(obj);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    },

    // ── Level 5: Save verification ─────────────────────
    _verifySave(snapshot) {
        try {
            const raw = localStorage.getItem(this.SAVE_KEY);
            if (!raw) return false;
            const loaded = JSON.parse(raw);
            const savedCksum = loaded.checksum;
            loaded.checksum = 0;
            const computed = this._checksum({
                session: loaded.session,
                calcDisplay: loaded.calcDisplay,
                calcMemory: loaded.calcMemory,
                analytics: loaded.analytics
            });
            return savedCksum === computed;
        } catch (e) { return false; }
    },

    _retrySave(snapshot, attempt) {
        attempt = attempt || 0;
        if (attempt >= this.MAX_RETRIES) {
            persistSaveStatus('Unable to save automatically', 'save-failed');
            return;
        }
        setTimeout(() => {
            try {
                localStorage.setItem(this.SAVE_KEY, JSON.stringify(snapshot));
                if (this._verifySave(snapshot)) {
                    persistSaveStatus('All progress saved', 'saved');
                    return;
                }
            } catch (e) { /* fall through */ }
            this._retrySave(snapshot, attempt + 1);
        }, 1000);
    },

    // ── Level 4: Rolling checkpoints ────────────────────
    addCheckpoint() {
        if (!state.session) return;
        try {
            let cps = this._getCheckpoints();
            cps.push({
                session: JSON.parse(JSON.stringify(state.session)),
                calcDisplay: state.calcDisplay,
                calcMemory: state.calcMemory,
                analytics: state.analytics,
                savedAt: Date.now()
            });
            if (cps.length > this.MAX_CHECKPOINTS) cps = cps.slice(-this.MAX_CHECKPOINTS);
            localStorage.setItem(this.CHECKPOINT_KEY, JSON.stringify(cps));
        } catch (e) { /* storage full */ }
    },

    _getCheckpoints() {
        try { return JSON.parse(localStorage.getItem(this.CHECKPOINT_KEY) || '[]'); } catch (e) { return []; }
    },

    _restoreFromCheckpoints() {
        const cps = this._getCheckpoints();
        for (let i = cps.length - 1; i >= 0; i--) {
            const sn = cps[i];
            if (sn && sn.session && !sn.session.completed && !sn.session.submitted) {
                const elapsed = Math.floor((Date.now() - sn.session.start) / 1000);
                if (elapsed < sn.session.duration) {
                    state.session = sn.session;
                    state.calcDisplay = sn.calcDisplay || '0';
                    state.calcMemory = sn.calcMemory || 0;
                    state.analytics = sn.analytics || null;
                    return true;
                }
            }
        }
        return false;
    },

    // ── Level 6: Session journal (append-only) ──────────
    logAction(action) {
        try {
            let j = this._getJournal();
            j.push({ action, timestamp: Date.now() });
            if (j.length > 500) j = j.slice(-500);
            localStorage.setItem(this.JOURNAL_KEY, JSON.stringify(j));
        } catch (e) { /* ignore */ }
    },

    _getJournal() {
        try { return JSON.parse(localStorage.getItem(this.JOURNAL_KEY) || '[]'); } catch (e) { return []; }
    },

    // ── Level 2 & 7: Guarded transition ────────────────
    checkpointBeforeTransition() {
        this.addCheckpoint();
        this.save();
    },

    guardedTransition(targetFn) {
        this.checkpointBeforeTransition();
        try {
            targetFn();
        } catch (e) {
            console.error('Transition failed, attempting recovery:', e);
            if (this._restoreFromCheckpoints()) {
                persistSaveStatus('Recovery used — progress restored', 'recovery');
            } else {
                persistSaveStatus('Transition failed — reload to resume', 'save-failed');
            }
        }
    },

    // ── Level 3: Restore (with automatic fallback) ─────
    restore() {
        try {
            const raw = localStorage.getItem(this.SAVE_KEY);
            if (raw) {
                const sn = JSON.parse(raw);
                if (sn.checksum) {
                    const savedCksum = sn.checksum;
                    sn.checksum = 0;
                    const computed = this._checksum({
                        session: sn.session,
                        calcDisplay: sn.calcDisplay,
                        calcMemory: sn.calcMemory,
                        analytics: sn.analytics
                    });
                    if (savedCksum !== computed) {
                        console.warn('Primary save corrupted, falling back to checkpoints');
                        return this._restoreFromCheckpoints();
                    }
                }
                if (sn.session && !sn.session.completed && !sn.session.submitted) {
                    const elapsed = Math.floor((Date.now() - sn.session.start) / 1000);
                    if (elapsed < sn.session.duration) {
                        state.session = sn.session;
                        state.calcDisplay = sn.calcDisplay || '0';
                        state.calcMemory = sn.calcMemory || 0;
                        state.analytics = sn.analytics || null;
                        return true;
                    }
                }
            }
        } catch (e) { /* fall through */ }
        return this._restoreFromCheckpoints();
    },

    // ── Standard methods (unchanged API) ───────────────
    clear() {
        localStorage.removeItem(this.SAVE_KEY);
        localStorage.removeItem(this.CHECKPOINT_KEY);
        localStorage.removeItem(this.JOURNAL_KEY);
    },

    saveHistory() {
        try {
            let h = JSON.parse(localStorage.getItem(this.HISTORY_KEY) || '[]');
            let seen = JSON.parse(localStorage.getItem(this.SEEN_KEY) || '[]');
            let s = state.session;
            if (!s) return;
            let correct = 0;
            s.mcqs.forEach(q => { correct += scoreMCQ(q, s.answers[q.QuestionID]); if (!seen.includes(q.QuestionID)) seen.push(q.QuestionID); });
            s.cases.forEach(c => { if (!seen.includes(c.CaseID)) seen.push(c.CaseID); });
            localStorage.setItem(this.SEEN_KEY, JSON.stringify(seen));
            // S138 — Record topic clusters for cross-session diversity
            let topicSeenList = JSON.parse(localStorage.getItem(this.TOPIC_SEEN_KEY) || '[]');
            s.mcqs.forEach(q => {
                let tc = ExamSessionManager._topicClusterKey(q);
                if (tc && !topicSeenList.includes(tc)) topicSeenList.push(tc);
            });
            s.cases.forEach(c => {
                c.Items.forEach(it => {
                    let tc = ExamSessionManager._topicClusterKey(it);
                    if (tc && !topicSeenList.includes(tc)) topicSeenList.push(tc);
                });
            });
            localStorage.setItem(this.TOPIC_SEEN_KEY, JSON.stringify(topicSeenList));
            let sc = ExamSessionManager.practiceScores();
            let analyticsSummary = AnalyticsCollector.getSummary();
            let breakdown = PerformanceAnalytics.computeBreakdown(s);

            // Collect topic-level performance snapshot for history
            let topicSnapshot = {};
            Object.entries(breakdown.byTopic || {}).slice(0, 30).forEach(([k, v]) => {
                topicSnapshot[k] = { n: v.tot_n, c: v.tot_c, pct: v.totPct, mcqPct: v.mcqPct, cbqPct: v.cbqPct };
            });

            let cbqCorrect = 0, cbqTotal = 0;
            s.cases.forEach(c => { c.Items.forEach((it, i) => { cbqTotal++; if (ExamSessionManager.correctCase(it, s.caseAnswers[ExamSessionManager.caseKey(c, i)])) cbqCorrect++; }); });

            h.unshift({
                date: new Date().toISOString(),
                mode: s.mode,
                mcqs: s.mcqs.length,
                correct,
                cases: s.cases.length,
                sections: s.sections,
                duration: s.duration,
                scaledScore: sc ? sc.scaled : null,
                accuracy: analyticsSummary ? analyticsSummary.accuracy : null,
                bySection: analyticsSummary ? analyticsSummary.bySection : null,
                mcqPct: sc ? sc.mcqPct : null,
                casePct: sc ? sc.casePct : null,
                mcqGate: sc ? (sc.mcqPct !== null && sc.mcqPct >= 0.5) : null,
                passed: sc ? sc.passed : null,
                difficultyPreset: sc ? sc.difficultyPreset : 'standard',
                grade: sc ? sc.grade : null,
                cbqCorrect, cbqTotal,
                topicSnapshot,
                recoverySource: s.recoverySource || null
            });
            localStorage.setItem(this.HISTORY_KEY, JSON.stringify(h.slice(0, 100)));
            this.updateDashboard(h[0]);
            // S112 — Update unified profile with session history
            try { var prof = CMAProfileManager.load(); prof.sessionHistory = h.slice(0, 100); CMAProfileManager.save(prof); CMAProfileManager.syncToMayStorage(prof); } catch (e) {}
        } catch (e) { /* ignore */ }
    },

    updateDashboard(entry) {
        try {
            let db = JSON.parse(localStorage.getItem(this.DASHBOARD_KEY) || '{}');
            if (!db.sessions) db.sessions = [];
            db.sessions.push({
                date: entry.date,
                mode: entry.mode,
                mcqs: entry.mcqs,
                correct: entry.correct,
                accuracy: entry.accuracy,
                scaledScore: entry.scaledScore,
                bySection: entry.bySection,
                mcqPct: entry.mcqPct,
                casePct: entry.casePct,
                mcqGate: entry.mcqGate,
                passed: entry.passed,
                difficultyPreset: entry.difficultyPreset,
                grade: entry.grade,
                cbqCorrect: entry.cbqCorrect,
                cbqTotal: entry.cbqTotal,
                sections: entry.sections
            });
            if (db.sessions.length > 100) db.sessions = db.sessions.slice(-100);
            localStorage.setItem(this.DASHBOARD_KEY, JSON.stringify(db));
        } catch (e) { /* ignore */ }
    },

    getDashboard() {
        try { return JSON.parse(localStorage.getItem(this.DASHBOARD_KEY) || '{}'); } catch (e) { return {}; }
    },

    getHistory() {
        try { return JSON.parse(localStorage.getItem(this.HISTORY_KEY) || '[]'); } catch (e) { return []; }
    },

    clearHistory() {
        localStorage.removeItem(this.HISTORY_KEY);
        localStorage.removeItem(this.SEEN_KEY);
        localStorage.removeItem(this.TOPIC_SEEN_KEY);
        localStorage.removeItem(this.DASHBOARD_KEY);
    }
};

// ============================================================
// scoreMCQ — CMA-Style Binary MCQ Grading
// ============================================================
// Returns 1 (correct) or 0 (incorrect). No partial credit, no
// negative marking. All MCQs equally weighted. Handles the three
// item types present in pack files and case-study items:
//   - single (default): user choice must match CorrectChoice
//   - multi: all correct options must be selected, no extras
//   - match: all left-right pairs must match exactly
function scoreMCQ(item, ans) {
    if (!item || ans === undefined || ans === null) return 0;
    // Multi-select (case items)
    if (item.Type === 'multi') {
        const correct = item.Correct;
        if (!Array.isArray(ans) || !Array.isArray(correct)) return 0;
        return correct.length === ans.length && correct.every(x => ans.includes(x)) ? 1 : 0;
    }
    // Matching (case items)
    if (item.Type === 'match') {
        const keys = Object.keys(item.Correct || {});
        if (!keys.length || !ans || typeof ans !== 'object') return 0;
        const nm = x => String(x || '').trim().toLowerCase().replace(/[$,]/g, '');
        return keys.every(k => nm(ans[k]) === nm(item.Correct[k])) ? 1 : 0;
    }
    // Single-select (pack MCQs and case select items)
    return ans === item.CorrectChoice ? 1 : 0;
}

// ============================================================
// ExamSessionManager
// ============================================================
// W1-A — Single source of truth for exam-integrity mode derivation.
// A session is in exam-integrity mode when it is a full exam OR real
// exam conditions are active. Used by start, resume, restore, and
// May gating so every consumer derives the same signal.
function isExamIntegrityMode(session) {
    if (!session) return false;
    return session.mode === 'full' || session.realConditions === true;
}

const ExamSessionManager = {
    start(e) {
        e.preventDefault();
        let mode = $('mode').value;
        let secs = this.sectionsSelected();
        let c = this.getCounts();
        let dist = this.getDifficultyDistribution();
        let seen = [];
        try { seen = JSON.parse(localStorage.getItem(SessionPersistence.SEEN_KEY) || '[]'); } catch (e) { }
        let topicSeen = [];
        try { topicSeen = JSON.parse(localStorage.getItem(SessionPersistence.TOPIC_SEEN_KEY) || '[]'); } catch (e) { }

        // Build tiered pool (cached per pack selection)
        let tieredPool = this.getMCQPool();
        // Filter flat pool to selected sections
        let sectionPool = {
            flat: (tieredPool.flat || []).filter(q => secs.includes(q.Section)),
            byTier: {},
            counts: tieredPool.counts || { certified: 0, bestUnprocessed: 0, unprocessed: 0 },
            packsKey: tieredPool.packsKey
        };
        // Rebuild byTier for the section-filtered subset
        for (let q of sectionPool.flat) {
            let t = q._tier || 3;
            if (!sectionPool.byTier[t]) sectionPool.byTier[t] = [];
            sectionPool.byTier[t].push(q);
        }

        let selection = this.selectWithDifficultyDistribution(sectionPool, c.mcqs, secs, dist, seen, topicSeen);
        let mcqs = selection.mcqs;
        let tierCounts = selection.tierCounts || {};

        // UX-4: Collection review — override pool selection with saved collection items
        if (state.collectionReview && state.collectionMcqs && state.collectionMcqs.length > 0) {
            mcqs = state.collectionMcqs.slice(0, c.mcqs);
            tierCounts = {};
            state.collectionReview = false;
            state.collectionMcqs = null;
        }

        let casePool = this.getCasePool().filter(x => x.SectionTags.some(s => secs.includes(s)));
        // Select cases with tier preference: unseen first, then seen
        let caseTier1 = casePool.filter(x => x._tier === 1 && !seen.includes(x.CaseID));
        let caseTier2 = casePool.filter(x => x._tier === 2 && !seen.includes(x.CaseID));
        let caseTier3 = casePool.filter(x => x._tier === 3 && !seen.includes(x.CaseID));
        let caseTier1Seen = casePool.filter(x => x._tier === 1 && seen.includes(x.CaseID));
        let caseTier2Seen = casePool.filter(x => x._tier === 2 && seen.includes(x.CaseID));
        let caseTier3Seen = casePool.filter(x => x._tier === 3 && seen.includes(x.CaseID));
        let caseSources = [caseTier1, caseTier2, caseTier3, caseTier1Seen, caseTier2Seen, caseTier3Seen];
        let allCases = [];
        for (let source of caseSources) {
            if (allCases.length >= c.cases) break;
            let needed = c.cases - allCases.length;
            allCases.push(...shuffle(source).slice(0, needed));
        }

        let duration = mode === 'full' ? FULL_EXAM_SECONDS : (mcqs.length * 108 + allCases.length * 30 * 60);

        state.session = {
            id: Date.now().toString(36),
            mode,
            sections: secs,
            realConditions: !!($('realConditions') && $('realConditions').checked),
            mcqs,
            cases: allCases,
            qIndex: 0,
            caseIndex: 0,
            caseTaskIndex: 0,
            caseExhibitIndex: 0,
            answers: {},
            flags: {},
            caseAnswers: {},
            caseFlags: {},
            struckChoices: {},
            confidence: {},
            guessed: {},
            start: Date.now(),
            duration,
            completed: false,
            submitted: false,
            _mcqGatePassed: false,
            timerWarnings: [],
            paused: false,
            pausedElapsed: 0,
            tierCounts: tierCounts,
            tierPoolCounts: tieredPool.counts
        };
        AnalyticsCollector.init(state.session);
        AnalyticsCollector.logEvent('session_start', { mode, mcqs: mcqs.length, cases: allCases.length });
        SessionPersistence.clear();
        // S130 — Exam Integrity Mode: hide non-exam UI during Full Exam or real-conditions
        if (isExamIntegrityMode(state.session)) {
            document.body.classList.add('exam-integrity-mode');
        }
        document.body.classList.add('session-active');
        showView('sessionView');
        this.render();
        this.startTimer();
        this.startAutoSave();
    },

    sectionsSelected() {
        let secs = [...document.querySelectorAll('input[name="section"]:checked')].map(x => x.value);
        return secs.length ? secs : ['A', 'B', 'C', 'D', 'E', 'F'];
    },

    getDifficultyDistribution() {
        let sliderVal = parseInt($('difficultySlider')?.value || '3');
        // 5-tier distribution keys match approved vocabulary: Easy, Moderate-Easy, Moderate, Difficult, Very Difficult
        if ($('mode').value === 'full') return { Easy: 0.25, 'Moderate-Easy': 0.15, Moderate: 0.30, Difficult: 0.20, 'Very Difficult': 0.10 };
        const dists = {
            1: { Easy: 0.50, 'Moderate-Easy': 0.20, Moderate: 0.15, Difficult: 0.10, 'Very Difficult': 0.05 },
            2: { Easy: 0.30, 'Moderate-Easy': 0.25, Moderate: 0.25, Difficult: 0.15, 'Very Difficult': 0.05 },
            3: { Easy: 0.15, 'Moderate-Easy': 0.15, Moderate: 0.30, Difficult: 0.25, 'Very Difficult': 0.15 },
            4: { Easy: 0.05, 'Moderate-Easy': 0.10, Moderate: 0.25, Difficult: 0.40, 'Very Difficult': 0.20 },
            5: { Easy: 0.03, 'Moderate-Easy': 0.05, Moderate: 0.17, Difficult: 0.40, 'Very Difficult': 0.35 }
        };
        return dists[sliderVal] || dists[3];
    },

    selectWithDifficultyDistribution(tieredPool, count, sections, distribution, seen, topicSeen) {
        if (count === 0) return { mcqs: [], tierCounts: {} };
        if (!tieredPool || !tieredPool.flat || !tieredPool.flat.length) return { mcqs: [], tierCounts: {} };

        let pool = tieredPool.flat;
        let byTier = tieredPool.byTier || {};

        // ---- Build per-difficulty, per-tier lookup ----
        let byTierDiff = {};
        for (let q of pool) {
            let d = q.Difficulty || 'Moderate';
            let t = q._tier || 3;
            if (!byTierDiff[t]) byTierDiff[t] = {};
            if (!byTierDiff[t][d]) byTierDiff[t][d] = [];
            byTierDiff[t][d].push(q);
        }

        // ---- Tier fill order: unseen first, then seen (per spec) ----
        let fillOrder = [
            { tier: 1, unseen: true }, { tier: 2, unseen: true }, { tier: 3, unseen: true },
            { tier: 1, unseen: false }, { tier: 2, unseen: false }, { tier: 3, unseen: false }
        ];

        let result = [];
        let usedKeys = new Set();
        let usedTopicClusters = new Set();
        let sectionPicks = {};
        let tierCounts = {};

        let diffLabels = Object.keys(distribution).sort((a, b) => (distribution[b] || 0) - (distribution[a] || 0));
        for (let d of diffLabels) {
            let target = Math.round(count * distribution[d]);
            let filled = 0;

            for (let fo of fillOrder) {
                if (filled >= target) break;
                let tierDiff = byTierDiff[fo.tier];
                if (!tierDiff || !tierDiff[d]) continue;

                let candidates = this.uniqueByConcept(tierDiff[d]);
                if (fo.unseen) candidates = candidates.filter(q => !seen.includes(q.QuestionID));
                // Session 88: Use _similarityKey as primary dedup to block same-template items
                // from appearing together in the same session.
                // KEY: never fall back to Topic alone for same-session dedup — Topic is too
                // broad (all 5 rotation-group items share one Topic).  Instead, fall back
                // to a composite of stem-fingerprint + Topic when _similarityKey is absent,
                // which gives a much narrower same-session collision domain.
                candidates = candidates.filter(q => {
                    let simKey = q._similarityKey || q.UniqueConceptKey || this._fallbackSimKey(q) || q.QuestionID;
                    return !usedKeys.has(simKey);
                });
                candidates.sort((a, b) => {
                    let ca = this._topicClusterKey(a);
                    let cb = this._topicClusterKey(b);
                    // Rank 0: unseen in session AND unseen ever (best — cross-session blind spot)
                    // Rank 1: unseen in session BUT seen ever (good — within-session diversity)
                    // Rank 2: seen in session (avoid)
                    let aRank = 2, bRank = 2;
                    if (ca && !usedTopicClusters.has(ca)) {
                        aRank = (topicSeen && topicSeen.includes(ca)) ? 1 : 0;
                    }
                    if (cb && !usedTopicClusters.has(cb)) {
                        bRank = (topicSeen && topicSeen.includes(cb)) ? 1 : 0;
                    }
                    if (aRank !== bRank) return aRank - bRank;
                    return (sectionPicks[a.Section] || 0) - (sectionPicks[b.Section] || 0);
                });
                candidates = candidates.slice(0, target - filled);

                for (let q of candidates) {
                    let simKey = q._similarityKey || q.UniqueConceptKey || this._fallbackSimKey(q) || q.QuestionID;
                    usedKeys.add(simKey);
                    let tc = this._topicClusterKey(q);
                    if (tc) usedTopicClusters.add(tc);
                    sectionPicks[q.Section] = (sectionPicks[q.Section] || 0) + 1;
                    tierCounts[q._tier || 3] = (tierCounts[q._tier || 3] || 0) + 1;
                }
                result.push(...candidates);
                filled += candidates.length;
            }
        }

        // ---- Fill remaining count if short (fall through all tiers) ----
        let needed = count - result.length;
        if (needed > 0) {
            let remaining = pool.filter(q =>
                !usedKeys.has(q._similarityKey || q.UniqueConceptKey || this._fallbackSimKey(q) || q.QuestionID)
            );
            remaining.sort((a, b) => {
                let ca = this._topicClusterKey(a);
                let cb = this._topicClusterKey(b);
                let aRank = 2, bRank = 2;
                if (ca && !usedTopicClusters.has(ca)) {
                    aRank = (topicSeen && topicSeen.includes(ca)) ? 1 : 0;
                }
                if (cb && !usedTopicClusters.has(cb)) {
                    bRank = (topicSeen && topicSeen.includes(cb)) ? 1 : 0;
                }
                if (aRank !== bRank) return aRank - bRank;
                return (sectionPicks[a.Section] || 0) - (sectionPicks[b.Section] || 0);
            });
            remaining = shuffle(remaining);
            for (let q of remaining.slice(0, needed)) {
                tierCounts[q._tier || 3] = (tierCounts[q._tier || 3] || 0) + 1;
                let tc = this._topicClusterKey(q);
                if (tc) usedTopicClusters.add(tc);
                sectionPicks[q.Section] = (sectionPicks[q.Section] || 0) + 1;
            }
            result.push(...remaining.slice(0, needed));
        }

        result = shuffle(result).slice(0, Math.min(count, pool.length));
        return { mcqs: result, tierCounts: tierCounts };
    },

    compositionNoteHtml() {
        let s = state.session;
        if (!s || !s.tierCounts) return "";
        let certified = s.tierCounts[1] || 0;
        let unprocessed = (s.tierCounts[2] || 0) + (s.tierCounts[3] || 0);
        if (certified === 0 && unprocessed === 0) return "";
        let parts = [];
        if (certified > 0) parts.push(`${certified} certified`);
        if (unprocessed > 0) parts.push(`${unprocessed} practice pool`);
        if (parts.length === 0) return "";
        return `<div class="composition-note"><span>This session includes ${parts.join(" and ")} questions.</span></div>`;
    },

    getCounts() {
        let mode = $('mode').value;
        let mcqs = mode === 'case' ? 0 : (mode === 'full' ? 100 : parseInt($('mcqCount').value));
        let cases = mode === 'mcq' ? 0 : (mode === 'full' ? 2 : parseInt($('caseCount').value));
        return { mode, mcqs, cases };
    },

    selectedPacks() {
        let packs = [...document.querySelectorAll('input[name="pack"]:checked')].map(x => x.value);
        return packs.length ? packs : ['A', 'B', 'C', 'D', 'E'];
    },

    getMCQPool() {
        let packs = this.selectedPacks();
        let packsKey = packs.sort().join(",");
        if (_mcqPoolCache && _poolPacksKey === packsKey) return _mcqPoolCache;
        _poolPacksKey = packsKey;

        let banks = {
            'A': typeof MCQ_BANK_A !== 'undefined' ? MCQ_BANK_A : [],
            'B': typeof MCQ_BANK_B !== 'undefined' ? MCQ_BANK_B : [],
            'C': typeof MCQ_BANK_C !== 'undefined' ? MCQ_BANK_C : [],
            'D': typeof MCQ_BANK_D !== 'undefined' ? MCQ_BANK_D : [],
            'E': typeof MCQ_BANK_E !== 'undefined' ? MCQ_BANK_E : []
        };

        // 1. Concatenate and assign tiers (do NOT mutate source arrays)
        let allItems = [];
        for (let p of packs) {
            for (let q of (banks[p] || [])) {
                // Shallow-copy so _tier / _qualityScore / _similarityKey are transient per-load
                let copy = Object.assign({}, q);
                // Skip objects that lack a renderable question body (paired-object metadata blocks)
                if (!copy.Stem || !copy.CorrectChoice) continue;
                assignTier(copy);
                copy._similarityKey = this.deriveSimilarityKey(copy);
                allItems.push(copy);
            }
        }

        // 2. Filter out hard-excluded items
        let active = allItems.filter(q => q._tier >= 1);

        // 3. Partition into tiers and deduplicate once across all tiers.
        //    uniqueByConcept keeps the FIRST occurrence per concept key,
        //    so concatenating T1 first guarantees a Certified item always
        //    wins over an Unprocessed duplicate of the same concept.
        let T1 = [], T2 = [], T3 = [];
        for (let q of active) {
            if (q._tier === 1) T1.push(q);
            else if (q._tier === 2) T2.push(q);
            else T3.push(q);
        }

        let combined = [].concat(T1, T2, T3);           // T1 first → wins duplicates
        let deduped = this.uniqueByConcept(combined);

        // 4. Re-partition the deduplicated result back into tiers for byTier access
        let dedupedT1 = deduped.filter(q => q._tier === 1);
        let dedupedT2 = deduped.filter(q => q._tier === 2);
        let dedupedT3 = deduped.filter(q => q._tier === 3);
        let flat = deduped;                              // already in tier-priority order

        _mcqPoolCache = {
            flat: flat,
            byTier: { 1: dedupedT1, 2: dedupedT2, 3: dedupedT3 },
            counts: { certified: dedupedT1.length, bestUnprocessed: dedupedT2.length, unprocessed: dedupedT3.length },
            packsKey: packsKey
        };
        return _mcqPoolCache;
    },

    getCasePool() {
        let packs = this.selectedPacks();
        let packsKey = packs.sort().join(",") + "_case";
        if (_casePoolCache && _casePacksKey === packsKey) return _casePoolCache;
        _casePacksKey = packsKey;

        let banks = {
            'A': (typeof CASE_BANK_A !== 'undefined' ? CASE_BANK_A : (typeof MIGRATED_CASE_BASE_A !== 'undefined' ? MIGRATED_CASE_BASE_A : [])),
            'B': (typeof CASE_BANK_B !== 'undefined' ? CASE_BANK_B : (typeof MIGRATED_CASE_BASE_B !== 'undefined' ? MIGRATED_CASE_BASE_B : [])),
            'C': (typeof CASE_BANK_C !== 'undefined' ? CASE_BANK_C : (typeof MIGRATED_CASE_BASE_C !== 'undefined' ? MIGRATED_CASE_BASE_C : [])),
            'D': (typeof CASE_BANK_D !== 'undefined' ? CASE_BANK_D : (typeof MIGRATED_CASE_BASE_D !== 'undefined' ? MIGRATED_CASE_BASE_D : [])),
            'E': (typeof CASE_BANK_E !== 'undefined' ? CASE_BANK_E : (typeof MIGRATED_CASE_BASE_E !== 'undefined' ? MIGRATED_CASE_BASE_E : []))
        };
        let enhanced_banks = {
            'A': [].concat(typeof ENHANCED_CASE_BANK_A !== 'undefined' ? ENHANCED_CASE_BANK_A : []).concat(typeof ENHANCED_CASE_BANK2_A !== 'undefined' ? ENHANCED_CASE_BANK2_A : []).concat(typeof ENHANCED_CASE_BANK3_A !== 'undefined' ? ENHANCED_CASE_BANK3_A : []).concat(typeof ENHANCED_CASE_BANK4_A !== 'undefined' ? ENHANCED_CASE_BANK4_A : []).concat(typeof ENHANCED_CASE_BANK5_A !== 'undefined' ? ENHANCED_CASE_BANK5_A : []),
            'B': [].concat(typeof ENHANCED_CASE_BANK_B !== 'undefined' ? ENHANCED_CASE_BANK_B : []).concat(typeof ENHANCED_CASE_BANK2_B !== 'undefined' ? ENHANCED_CASE_BANK2_B : []).concat(typeof ENHANCED_CASE_BANK3_B !== 'undefined' ? ENHANCED_CASE_BANK3_B : []).concat(typeof ENHANCED_CASE_BANK4_B !== 'undefined' ? ENHANCED_CASE_BANK4_B : []).concat(typeof ENHANCED_CASE_BANK5_B !== 'undefined' ? ENHANCED_CASE_BANK5_B : []),
            'C': [].concat(typeof ENHANCED_CASE_BANK_C !== 'undefined' ? ENHANCED_CASE_BANK_C : []).concat(typeof ENHANCED_CASE_BANK2_C !== 'undefined' ? ENHANCED_CASE_BANK2_C : []).concat(typeof ENHANCED_CASE_BANK3_C !== 'undefined' ? ENHANCED_CASE_BANK3_C : []).concat(typeof ENHANCED_CASE_BANK4_C !== 'undefined' ? ENHANCED_CASE_BANK4_C : []).concat(typeof ENHANCED_CASE_BANK5_C !== 'undefined' ? ENHANCED_CASE_BANK5_C : []),
            'D': [].concat(typeof ENHANCED_CASE_BANK_D !== 'undefined' ? ENHANCED_CASE_BANK_D : []).concat(typeof ENHANCED_CASE_BANK2_D !== 'undefined' ? ENHANCED_CASE_BANK2_D : []).concat(typeof ENHANCED_CASE_BANK3_D !== 'undefined' ? ENHANCED_CASE_BANK3_D : []).concat(typeof ENHANCED_CASE_BANK4_D !== 'undefined' ? ENHANCED_CASE_BANK4_D : []).concat(typeof ENHANCED_CASE_BANK5_D !== 'undefined' ? ENHANCED_CASE_BANK5_D : []),
            'E': [].concat(typeof ENHANCED_CASE_BANK_E !== 'undefined' ? ENHANCED_CASE_BANK_E : []).concat(typeof ENHANCED_CASE_BANK2_E !== 'undefined' ? ENHANCED_CASE_BANK2_E : []).concat(typeof ENHANCED_CASE_BANK3_E !== 'undefined' ? ENHANCED_CASE_BANK3_E : []).concat(typeof ENHANCED_CASE_BANK4_E !== 'undefined' ? ENHANCED_CASE_BANK4_E : []).concat(typeof ENHANCED_CASE_BANK5_E !== 'undefined' ? ENHANCED_CASE_BANK5_E : []),
            'F': [].concat(typeof ENHANCED_CASE_BANK_F !== 'undefined' ? ENHANCED_CASE_BANK_F : []).concat(typeof ENHANCED_CASE_BANK2_F !== 'undefined' ? ENHANCED_CASE_BANK2_F : []).concat(typeof ENHANCED_CASE_BANK3_F !== 'undefined' ? ENHANCED_CASE_BANK3_F : []).concat(typeof ENHANCED_CASE_BANK4_F !== 'undefined' ? ENHANCED_CASE_BANK4_F : []).concat(typeof ENHANCED_CASE_BANK5_F !== 'undefined' ? ENHANCED_CASE_BANK5_F : [])
        };

        let result = [];
        for (let p of packs) {
            // Enhanced cases first (higher quality signal), then standard cases.
            // Tier assignment per case: Certified > enhanced > standard
            let scored = (enhanced_banks[p] || []).map(c => {
                let copy = Object.assign({}, c);
                // Assign _tier based on question_state if present, else enhanced = Tier 2 (best available)
                let st = (copy.question_state || "").trim();
                if (st === "Certified") copy._tier = 1;
                else if (st === "Archived" || st === "In Audit" || st === "Editorial Queue") copy._tier = -1;
                else { copy._tier = 2; copy._qualityScore = scoreQuestionQuality(copy); }
                copy._isEnhanced = true;
                return copy;
            });
            let standard = (banks[p] || []).map(c => {
                let copy = Object.assign({}, c);
                let st = (copy.question_state || "").trim();
                if (st === "Certified") copy._tier = 1;
                else if (st === "Archived" || st === "In Audit" || st === "Editorial Queue") copy._tier = -1;
                else { copy._tier = 3; copy._qualityScore = scoreQuestionQuality(copy); }
                copy._isEnhanced = false;
                return copy;
            });
            // Session 96 — Blocklist-gate cases: exclude any case whose CaseID
            // or any item QID is delivery-blocked (future-proofing for case-level defects)
            let active = [].concat(scored, standard).filter(c => {
                if (c._tier < 1) return false;
                if (_DefectManifest.isBlocked(c.CaseID)) { c._tier = -1; c._blockedReason = 'DELIVERY_BLOCKLIST'; return false; }
                if (Array.isArray(c.Items)) {
                    for (let it of c.Items) {
                        let iid = it.ItemID || it.QuestionID;
                        if (iid && _DefectManifest.isBlocked(iid)) { c._tier = -1; c._blockedReason = 'DELIVERY_BLOCKLIST'; return false; }
                    }
                }
                return true;
            });
            // Sort: Tier 1 first, then Tier 2 (enhanced), then Tier 3 (standard)
            active.sort((a, b) => (a._tier || 3) - (b._tier || 3));
            result = result.concat(active);
        }
        // Deduplicate by CaseID — CASE_BANK_A/D alias same pack, CASE_BANK_B/E alias same pack
        let seenCaseIDs = new Set();
        result = result.filter(c => {
            if (seenCaseIDs.has(c.CaseID)) return false;
            seenCaseIDs.add(c.CaseID);
            return true;
        });

        _casePoolCache = result;
        _casePacksKey = packsKey;
        return result;
    },

    uniqueByConcept(items) {
        let seen = new Set();
        let seenStem = new Set();
        let seenSim = new Set();
        let out = [];
        for (let q of items) {
            let key = q.UniqueConceptKey || q.Topic || q.Stem || q.QuestionID;
            let stemCore = "";
            if (q.Stem) { let words = q.Stem.split(" "); if (words.length > 1) { stemCore = words.slice(1).join(" ").toLowerCase().replace(/[^a-z0-9]/g, ""); } }
            // Session-88: also deduplicate by similarity key to suppress near-duplicate templates
            if (!seen.has(key) && (!stemCore || !seenStem.has(stemCore)) && (!q._similarityKey || !seenSim.has(q._similarityKey))) {
                seen.add(key); if (stemCore) seenStem.add(stemCore);
                if (q._similarityKey) seenSim.add(q._similarityKey);
                out.push(q);
            }
        }
        return out;
    },

    // Session 88 — deriveSimilarityKey: fingerprints the structural template
    // of a question so items built from the same authoring template (different
    // company names, different dollar amounts, same formula/structure) can be
    // detected and suppressed from appearing together in the same session.
    deriveSimilarityKey(q) {
        // 1. If the item has a pedagogical_cluster, use it — most precise
        if (q.pedagogical_cluster) return 'cluster:' + q.pedagogical_cluster;

        let stem = (q.Stem || '').replace(/\s+/g, ' ').trim();

        // 2. Strip entities, numbers, dates — keep the structural skeleton
        let finger = stem
            .replace(/\$[\d,.]+/g, '$AMT')
            .replace(/\b\d{4,}(?:\.\d+)?\b/g, 'NNNN')
            .replace(/\b\d+\.?\d*%/g, 'PCT%')
            .replace(/\b[A-Z][a-z]+ (?:Corporation|Incorporated|Inc\.?|Co\.?|Company|Ltd\.?|LLC|Corp\.?|Industries|Group|Holdings|Enterprises|Manufacturing|Distributing|International)\b/g, 'COMPANY')
            .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+(?:,? (?:CFO|CEO|COO|Controller|Manager|Director|Partner|Analyst|Auditor|Treasurer))\b/g, 'PERSON')
            .replace(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/gi, 'MONTH')
            .replace(/\b20\d{2}\b/g, 'YEAR')
            .replace(/\b\d+\s*(?:units?|hours?|days?|months?|years?|employees?|machines?|departments?)\b/gi, 'N units')
            .replace(/\b\d+(?:\.\d+)?%/g, 'PCT')
            .toLowerCase()
            .replace(/[.,;:!?'"()\[\]{}]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        // 3. Truncate to first ~140 chars of fingerprint
        let short = finger.substring(0, 140);

        // 4. Extract topic core suffix (after section prefix / number)
        let topicCore = (q.Topic || '')
            .replace(/^[A-F]\.?\d*\s*/i, '')
            .replace(/\s+\d+$/, '')
            .trim()
            .substring(0, 60);

        return '~' + short + '|' + topicCore + '|' + (q.Section || '');
    },

    // Session 88 — Fallback similarity key for items without _similarityKey.
    // Uses a lightweight fingerprint of stem + Topic to avoid same-session
    // collisions for template-variant items.  Never uses Topic alone.
    _fallbackSimKey(q) {
        if (!q || !q.Stem) return null;
        let stemFp = (q.Stem || '').replace(/\s+/g, ' ').trim()
            .replace(/\$[\d,.]+/g, '$')
            .replace(/\b\d{3,}\b/g, '#')
            .toLowerCase()
            .substring(0, 60);
        let topicCore = (q.Topic || '').replace(/^[A-F]\.?\d*\s*/i, '').replace(/\s+\d+$/, '').trim();
        return stemFp + '|' + topicCore + '|' + (q.Section || '');
    },

    _topicClusterKey(q) {
        if (q.pedagogical_cluster) return 'pc:' + q.pedagogical_cluster;
        let cluster = (q.Topic || '')
            .replace(/^[A-F]\.?\d*\s+/, '')
            .replace(/\s+\d+$/, '')
            .trim()
            .toLowerCase();
        if (cluster) return 'tc:' + cluster + '|' + (q.Section || '');
        return null;
    },

    weightedPick(pool, count, sections) {
        pool = this.uniqueByConcept(pool);
        let all = sections.length === 6 && $('weighted') && $('weighted').checked;
        if (!all) return shuffle(pool).slice(0, Math.min(count, pool.length));
        let result = [];
        let targets = { A: 0.15, B: 0.20, C: 0.20, D: 0.15, E: 0.15, F: 0.15 };
        for (let sec of sections) {
            let secPool = this.uniqueByConcept(pool.filter(q => q.Section === sec));
            let take = Math.min(secPool.length, Math.floor(count * targets[sec]));
            result.push(...shuffle(secPool).slice(0, take));
        }
        let used = new Set(result.map(q => q.UniqueConceptKey || q.Topic || q.Stem || q.QuestionID));
        let remaining = shuffle(pool.filter(q => !used.has(q.UniqueConceptKey || q.Topic || q.Stem || q.QuestionID)));
        let needed = Math.min(count, pool.length) - result.length;
        if (needed > 0) result.push(...remaining.slice(0, needed));
        return shuffle(result).slice(0, Math.min(count, pool.length));
    },

    startTimer() {
        clearInterval(timerInt);
        timerInt = setInterval(() => {
            if (!state.session || state.session.completed || state.session.paused) return;
            let elapsed = Math.floor((Date.now() - state.session.start) / 1000);
            let left = Math.max(0, state.session.duration - elapsed);
            document.querySelectorAll('.timer').forEach(t => t.textContent = fmt(left));
            document.querySelectorAll('.timer-bar-fill').forEach(b => {
                let pct = Math.max(0, Math.min(100, (elapsed / state.session.duration) * 100));
                b.style.width = pct + '%';
                b.className = 'timer-bar-fill' + (pct > 90 ? ' danger' : pct > 75 ? ' warning' : '');
            });
            // Timer warnings
            TIMER_WARNINGS.forEach(w => {
                if (left <= w && !state.session.timerWarnings.includes(w)) {
                    state.session.timerWarnings.push(w);
                    this.showTimerWarning(w);
                }
            });
            if (left === 0) this.finish();
        }, 1000);
    },

    showTimerWarning(seconds) {
        let msg = seconds >= 1800 ? '30 minutes remaining' :
            seconds >= 600 ? '10 minutes remaining' : '5 minutes remaining';
        let el = document.createElement('div');
        el.className = 'timer-warning';
        el.setAttribute('role', 'alert');
        el.textContent = msg;
        document.body.appendChild(el);
        setTimeout(() => el.classList.add('show'), 10);
        setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 4000);
    },

    startAutoSave() {
        clearInterval(autoSaveInt);
        autoSaveInt = setInterval(() => SessionPersistence.autoSave(), AUTO_SAVE_INTERVAL);
    },

    pause() {
        if (!state.session || isExamIntegrityMode(state.session)) return;
        state.session.paused = !state.session.paused;
        if (state.session.paused) {
            clearInterval(timerInt);
            clearInterval(autoSaveInt);
            AnalyticsCollector.logEvent('session_pause', {});
        } else {
            this.startTimer();
            this.startAutoSave();
            AnalyticsCollector.logEvent('session_resume', {});
        }
        this.render();
    },

    finish() {
        if (!state.session) return;
        state.session.completed = true;
        state.session.submitted = true;
        clearInterval(timerInt);
        clearInterval(autoSaveInt);
        // S130 — Remove exam integrity mode on session completion
        document.body.classList.remove('exam-integrity-mode');
        document.body.classList.remove('session-active');
        AnalyticsCollector.logEvent('session_submit', {});
        SessionPersistence.saveHistory();
        SessionPersistence.clear();
        // S130 — Auto-save missed questions to recovery-candidates collection
        this._saveMissedToCollection(state.session);
        this.renderSummary('priority');
        if (typeof May !== 'undefined') May.handoffCompletedSession(state.session);
        if (typeof MayTelemetry !== 'undefined') {
            var _attribC = window._mayAttributionCard;
            MayTelemetry.trackAdoption({ recommendationType: 'Session', cardId: 'session-complete', topic: '', presented: false, panelOpened: false, clicked: false, sessionStarted: false, completed: true, attributionCardId: (_attribC && _attribC.cardId) || null, attributionCardType: (_attribC && _attribC.recommendationType) || null, timestamp: new Date().toISOString() });
            window._mayAttributionCard = null;
        }
    },

    // S130 — Auto-save all missed question IDs to recovery-candidates collection
    _saveMissedToCollection(s) {
        if (!s) return;
        var missed = [];
        // MCQs
        s.mcqs.forEach(function (q) {
            if (scoreMCQ(q, s.answers[q.QuestionID]) !== 1) {
                missed.push(q.QuestionID);
            }
        });
        // Case items
        s.cases.forEach(function (c) {
            c.Items.forEach(function (it, i) {
                var key = ExamSessionManager.caseKey(c, i);
                if (!ExamSessionManager.correctCase(it, s.caseAnswers[key])) {
                    missed.push(key);
                }
            });
        });
        if (missed.length === 0) return;
        for (var m = 0; m < missed.length; m++) {
            CMAProfileManager.addToCollection('recovery-candidates', missed[m]);
        }
    },

    remaining() {
        let s = state.session;
        if (!s) return 0;
        return Math.max(0, s.duration - Math.floor((Date.now() - s.start) / 1000));
    },

    render() {
        try {
            let s = state.session;
            if (s) { s.mcqs = s.mcqs || []; s.cases = s.cases || []; }
            if (!s) {
                $('sessionView').innerHTML = `<div class="empty-state-visual"><div><h2>Ready for 2026-aligned original CMA Part 1 practice</h2><p>Select content to configure your timer, then start a session. Review missed and marked questions after submission with targeted study links.</p></div><div class="empty-state-cards"><div class="empty-state-card" onclick="quickStart('mcq');updateTimeEstimate();document.getElementById('sessionForm').requestSubmit()"><div class="empty-state-card-icon">&#128218;</div><h3>MCQ Practice</h3><p>500-item question bank per pack</p></div><div class="empty-state-card" onclick="quickStart('case');updateTimeEstimate();document.getElementById('sessionForm').requestSubmit()"><div class="empty-state-card-icon">&#128203;</div><h3>Case Studies</h3><p>Real exam-style scenarios</p></div><div class="empty-state-card" onclick="quickStart('full');updateTimeEstimate();document.getElementById('sessionForm').requestSubmit()"><div class="empty-state-card-icon">&#127891;</div><h3>Full Exam</h3><p>100 MCQs + 2 cases, 4 hours</p></div></div></div>`;
                // Re-inject May companion card on landing page
                if (typeof May !== 'undefined') {
                    sessionStorage.removeItem('mayCompanionDismissed');
                    setTimeout(() => { May._injectMayCompanionCard(); }, 50);
                }
                return;
            }
            if (s.completed) return this.renderSummary('priority');
            if (s.qIndex < s.mcqs.length) return this.renderMCQ(s.mcqs[s.qIndex]);
            if (s.mode === 'full' && !s._mcqGatePassed) {
                let mcqCorrect = 0;
                s.mcqs.forEach(q => { mcqCorrect += scoreMCQ(q, s.answers[q.QuestionID]); });
                let mcqPct = s.mcqs.length ? mcqCorrect / s.mcqs.length : 0;
                if (mcqPct < MCQ_GATE_THRESHOLD) {
                    $('sessionView').innerHTML = `<div class="empty-state">
              <h2>Minimum MCQ Threshold Not Met</h2>
              <p>You answered ${mcqCorrect}/${s.mcqs.length} MCQs correctly (${Math.round(mcqPct * 100)}%).</p>
              <p>The 2026 CMA exam requires a minimum 50% MCQ score before advancing to the essay/case section. Candidates who do not meet this threshold do not have their essays scored.</p>
              <p><strong>Your session cannot proceed to the case studies.</strong></p>
              <button id="submitEarlyGate" class="primary">Submit Session</button>
              <button id="reviewMcqsGate" class="secondary">Return to Review</button>
              ${CmaScoringDisclaimer('compact')}
            </div>`;
                    $('submitEarlyGate').onclick = () => ExamSessionManager.finish();
                    $('reviewMcqsGate').onclick = () => { s.qIndex = Math.max(0, s.mcqs.length - 1); ExamSessionManager.render(); };
                    return;
                }
                s._mcqGatePassed = true;
            }
            if (s.caseIndex < (s.cases || []).length) {
                let caseObj = s.cases[s.caseIndex];
                if (!caseObj || !caseObj.Items || !caseObj.Items.length) {
                    s.caseIndex++;
                    return this.render();
                }
                // Level 2 & 7: Checkpoint and guard before MCQ-to-case transition
                if (s.qIndex >= s.mcqs.length) {
                    SessionPersistence.checkpointBeforeTransition();
                    SessionPersistence.logAction('transition mcq-to-case idx=' + s.caseIndex);
                }
                return s.mode === 'full' ? this.renderCaseExam(caseObj) : this.renderCase(caseObj);
            }
            this.renderReviewScreen();
        } catch (e) {
            console.error('render error:', e);
            $('sessionView').innerHTML = '<div class="empty-state"><h2>Something went wrong</h2><p>Your session is auto-saved. <a href="#" onclick="location.reload()" style="text-decoration:underline;cursor:pointer;">Reload the page</a> to resume your progress.</p></div>';
        }
    },

    renderMCQ(q) {
        try {
            let s = state.session;
            let sel = s.answers[q.QuestionID];
            let conf = s.confidence[q.QuestionID] || 0;
            let guessed = s.guessed[q.QuestionID] || false;

            // Build confidence selector
            let confHtml = [1, 2, 3, 4, 5].map(c =>
                `<button type="button" class="conf-btn${conf === c ? ' selected' : ''}" data-conf="${c}" title="${['No idea', 'Unsure', 'Somewhat sure', 'Confident', 'Very confident'][c - 1]}">${c}</button>`
            ).join('');

            $('sessionView').innerHTML = `<div class="exam-shell">
          <section>
            <div class="exam-top">
              <span>Item ${s.qIndex + 1} of ${s.mcqs.length + s.cases.length} <span class="item-id">${q.QuestionID}</span></span>
              <div class="exam-top-right">
                ${!isExamIntegrityMode(s) ? `<button id="pauseBtn" class="btn-icon" title="${s.paused ? 'Resume' : 'Pause'}">${s.paused ? '\u25B6' : '\u23F8'}</button>` : ''}
                <span class="timerblock"><span>Time remaining</span><span class="timer${this.remaining() < 300 ? (this.remaining() < 60 ? ' danger' : ' warning') : ''}">${fmt(this.remaining())}</span></span>
              </div>
            </div>
            ${s.paused ? '<div class="pause-overlay"><div class="pause-modal"><h2>Session Paused</h2><p>Your session has been paused. Timer, autosave, and navigation timer have been suspended.</p><div class="pause-disclaimer"><strong>Important:</strong> The official CMA exam does not allow pausing. The timer runs continuously in the real testing environment. This pause feature is a study aid provided by the simulator only.</div><button id="resumeBtn" class="primary">Resume Session</button></div></div>' : ''}
            ${s.mode !== 'full' && s.realConditions === true ? '<div class="exam-notice">Simulate Real Exam Conditions is active. Pause is disabled. Timer runs continuously.</div>' : ''}
            <div class="timer-bar"><div class="timer-bar-fill${this.remaining() < 300 ? (this.remaining() < 60 ? ' danger' : ' warning') : ''}" style="width:${Math.max(0, Math.min(100, (1 - this.remaining() / s.duration) * 100))}%"></div></div>
            ${this.compositionNoteHtml()}
            <article class="item-card">
              <div class="meta-row">
                <span class="pill">Section ${q.Section}</span>
                <span class="pill">${q.Topic}</span>
                <span class="pill">${q.LOSTag || ''}</span>
                <span class="pill">${q.Difficulty || ''}</span>
                <span class="pill">Original CMA practice</span>
              </div>
              <h2>${nl2br(q.Stem)}</h2>
              <div class="choices" role="radiogroup" aria-label="Answer choices">${CHOICES.map(c =>
                    `<button class="choice ${sel === c ? 'selected' : ''} ${s.struckChoices[q.QuestionID] && s.struckChoices[q.QuestionID][c] ? 'struck' : ''}" data-choice="${c}" role="radio" aria-checked="${sel === c}" tabindex="0"><span class="letter">${c}</span><span>${q.Choices[c]}</span></button>`
                ).join('')}</div>
              <div class="keyboard-hint" title="Keyboard shortcuts">A–D Select &middot; N/P Navigate &middot; M Flag &middot; Right-click Strike</div>
              <div class="item-tools">
                <label class="flag"><input id="flagBox" type="checkbox" ${s.flags[q.QuestionID] ? 'checked' : ''}> Mark for review</label>
                <label class="guess"><input id="guessBox" type="checkbox" ${guessed ? 'checked' : ''}> I guessed</label>
                <button id="collectionBtn" class="collection-save-btn" title="Save to bookmark collection">+ Save</button>
                <div id="collectionDropdown" class="collection-dropdown" style="display:none;"></div>
                <div class="confidence-row"><span>Confidence:</span><div class="conf-buttons">${confHtml}</div></div>
              </div>
            </article>
            <div class="exam-actions">
              <button id="prev" class="secondary" ${s.qIndex === 0 ? 'disabled' : ''}>Previous</button>
              <button id="next" class="primary">${s.qIndex === s.mcqs.length + s.cases.length - 1 ? 'Review / Submit' : 'Next'}</button>
            </div>
          </section>
          ${NavigationController.html()}
          ${typeof May !== 'undefined' && !May.isMiniPanelSuppressed() ? May.renderMiniPanel(q) : ''}</div>`;

            CalculatorEngine.render();
            if (typeof May !== 'undefined') {
                May.resetLiveHints();
            }
            if (s.paused) {
                let rb = $('resumeBtn');
                if (rb) rb.onclick = () => { this.pause(); this.render(); };
            }
            let pb = $('pauseBtn');
            if (pb) pb.onclick = () => { this.pause(); this.render(); };

            document.querySelectorAll('.choice').forEach(b => {
                b.onclick = () => {
                    AnalyticsCollector.endQuestion(q.QuestionID);
                    s.answers[q.QuestionID] = b.dataset.choice;
                    SessionPersistence.saveImmediate();
                    SessionPersistence.logAction('answer ' + q.QuestionID + '=' + b.dataset.choice);
                    let isCorrect = scoreMCQ(q, b.dataset.choice) === 1;
                    AnalyticsCollector.recordAnswer(q.QuestionID, isCorrect, s.confidence[q.QuestionID], s.guessed[q.QuestionID]);
                    AnalyticsCollector.startQuestion(q.QuestionID);
                    if (typeof May !== 'undefined') {
                        May.recordLiveAttempt(q, b.dataset.choice, isCorrect, May.context._liveHintCount || 0, false, 0, s.confidence[q.QuestionID]);
                        May.showPostAnswerFeedback(q, isCorrect);
                    }
                    this.renderMCQ(q);
                };
                b.addEventListener('contextmenu', (ev) => {
                    ev.preventDefault();
                    let ch = b.dataset.choice;
                    if (!s.struckChoices[q.QuestionID]) s.struckChoices[q.QuestionID] = {};
                    s.struckChoices[q.QuestionID][ch] = !s.struckChoices[q.QuestionID][ch];
                    SessionPersistence.saveImmediate();
                    SessionPersistence.logAction('strike ' + q.QuestionID + '=' + ch + '=' + s.struckChoices[q.QuestionID][ch]);
                    this.renderMCQ(q);
                });
            });
            let fb = $('flagBox');
            if (fb) fb.onchange = e => { s.flags[q.QuestionID] = e.target.checked; SessionPersistence.saveImmediate(); SessionPersistence.logAction('flag ' + q.QuestionID + '=' + e.target.checked); AnalyticsCollector.recordFlag(q.QuestionID, e.target.checked); };
            let gb = $('guessBox');
            if (gb) gb.onchange = e => { s.guessed[q.QuestionID] = e.target.checked; SessionPersistence.saveImmediate(); SessionPersistence.logAction('guess ' + q.QuestionID + '=' + e.target.checked); };
            // UX-4: Collection save dropdown
            let cb = $('collectionBtn');
            let cd = $('collectionDropdown');
            if (cb && cd) {
                cb.onclick = (e) => {
                    e.stopPropagation();
                    var visible = cd.style.display === 'block';
                    cd.style.display = visible ? 'none' : 'block';
                    if (!visible) {
                        var cols = CMAProfileManager.getCollections();
                        var html = '<div class="collection-dropdown-header">Save to Collection</div>';
                        var entries = Object.entries(cols);
                        if (entries.length === 0) {
                            html += '<div class="collection-dropdown-item disabled">No collections yet</div>';
                        } else {
                            entries.forEach(function (entry) {
                                var cid = entry[0], col = entry[1];
                                var saved = col.items.indexOf(q.QuestionID) !== -1;
                                html += '<div class="collection-dropdown-item' + (saved ? ' saved' : '') + '" data-cid="' + cid + '">' +
                                    (saved ? '&#10003; ' : '') + col.name + ' <span class="collection-count">' + col.items.length + '</span></div>';
                            });
                        }
                        html += '<div class="collection-dropdown-footer"><button id="collectionNewBtn" class="collection-new-btn">+ New Collection</button></div>';
                        cd.innerHTML = html;
                        cd.querySelectorAll('.collection-dropdown-item:not(.disabled)').forEach(function (item) {
                            item.onclick = function (ev) {
                                ev.stopPropagation();
                                var cid = this.dataset.cid;
                                if (CMAProfileManager.isInCollection(cid, q.QuestionID)) {
                                    CMAProfileManager.removeFromCollection(cid, q.QuestionID);
                                } else {
                                    CMAProfileManager.addToCollection(cid, q.QuestionID);
                                }
                                cd.style.display = 'none';
                                showSaveStatus('Bookmark updated', 'restore-available');
                            };
                        });
                        var nb = cd.querySelector('#collectionNewBtn');
                        if (nb) nb.onclick = function (ev) {
                            ev.stopPropagation();
                            var name = prompt('New collection name:');
                            if (name && name.trim()) {
                                var newId = CMAProfileManager.createCollection(name.trim(), '');
                                if (newId) {
                                    CMAProfileManager.addToCollection(newId, q.QuestionID);
                                    cd.style.display = 'none';
                                    showSaveStatus('Added to "' + name.trim() + '"', 'restore-available');
                                }
                            }
                        };
                    }
                };
                document.addEventListener('click', function closeCD(e) {
                    if (cb && cd && !cb.contains(e.target) && !cd.contains(e.target)) cd.style.display = 'none';
                });
            }
            document.querySelectorAll('[data-conf]').forEach(b => {
                b.onclick = () => { s.confidence[q.QuestionID] = parseInt(b.dataset.conf); SessionPersistence.saveImmediate(); SessionPersistence.logAction('conf ' + q.QuestionID + '=' + b.dataset.conf); this.renderMCQ(q); };
            });
            let p = $('prev');
            if (p) p.onclick = () => { AnalyticsCollector.endQuestion(q.QuestionID); s.qIndex = Math.max(0, s.qIndex - 1); SessionPersistence.saveImmediate(); SessionPersistence.logAction('nav prev to ' + s.qIndex); NavigationController.navigateTo(s.qIndex); };
            let n = $('next');
            if (n) n.onclick = () => { AnalyticsCollector.endQuestion(q.QuestionID); if (s.qIndex === s.mcqs.length + s.cases.length - 1) { this.renderReviewScreen(); } else { s.qIndex = s.qIndex + 1; SessionPersistence.saveImmediate(); SessionPersistence.logAction('nav next to ' + s.qIndex); this.render(); } };
            NavigationController.bind();
            CalculatorEngine.setupKeyboardShortcuts();
            AnalyticsCollector.startQuestion(q.QuestionID);
            this.updateProgressBar();
        } catch (e) {
            console.error('renderMCQ error:', e);
            $('sessionView').innerHTML = '<div class="empty-state"><h2>Something went wrong</h2><p>Your session is auto-saved. <a href="#" onclick="location.reload()" style="text-decoration:underline;cursor:pointer;">Reload the page</a> to resume your progress.</p></div>';
        }
    },

    validateCase(c) {
        let errors = [];
        if (!c || !c.Items || !c.Items.length) {
            errors.push("Case has no items");
            return errors;
        }
        let placeholderPatterns = [/incorrect/i, /placeholder/i, /lorem/i, /tbd/i, /todo/i, /false statement/i, /invalid attribute/i, /Incorrect Application/i];
        for (let i = 0; i < c.Items.length; i++) {
            let it = c.Items[i];
            if (!it.Prompt || it.Prompt.trim().length < 5) {
                errors.push(`Item ${i + 1}: Missing or empty prompt`);
            }
            if (!it.Correct || (Array.isArray(it.Correct) && it.Correct.length === 0) || (typeof it.Correct === 'string' && it.Correct.trim().length === 0)) {
                errors.push(`Item ${i + 1}: Missing correct answer`);
            }
            if (it.Type === 'select' || it.Type === 'multi') {
                if (!it.Choices || it.Choices.length < 2) {
                    errors.push(`Item ${i + 1}: Missing or insufficient choices`);
                } else {
                    for (let ch of it.Choices) {
                        for (let pat of placeholderPatterns) {
                            if (pat.test(ch)) {
                                errors.push(`Item ${i + 1}: Placeholder choice text "${ch}"`);
                                break;
                            }
                        }
                    }
                }
            }
            if (!it.Explanation || it.Explanation.trim().length < 10) {
                errors.push(`Item ${i + 1}: Missing or too short explanation`);
            }
            if (!it.ItemID) {
                // Standard case items may lack ItemID; generate one.
                it.ItemID = `${c.CaseID || 'case'}-Q${i + 1}`;
            }
        }
        // Check for duplicate normalized stems within case
        let stems = c.Items.map(it => (it.Prompt || '').toLowerCase().replace(/\(question \d+\)/g, '').trim());
        let uniqueStems = new Set(stems);
        if (stems.length > 0 && stems.length === uniqueStems.size + c.Items.filter((it, i) => stems.indexOf(stems[i]) !== i).length) {
            // still unique - do nothing
        }
        if (uniqueStems.size === 1 && c.Items.length > 1) {
            errors.push(`All ${c.Items.length} items have identical normalized prompts`);
        }
        return errors;
    },

    renderCase(c) {
        try {
            let s = state.session;
            let validationErrors = this.validateCase(c);
            if (validationErrors.length > 0) {
                let isLastCase = s.caseIndex >= s.cases.length - 1;
                $('sessionView').innerHTML = `<div class="empty-state"><h2>Case Content Error</h2><p>This case (${c.CaseID || 'unknown'}) contains invalid content and cannot be displayed.</p><p class="small">${validationErrors.join('<br>')}</p><button id="skipCaseBtn" class="primary">${isLastCase ? 'Go to Review' : 'Skip to Next Case'}</button></div>`;
                let skip = $('skipCaseBtn');
                if (skip) skip.onclick = () => { s.caseIndex++; if (s.caseIndex >= s.cases.length) this.renderReviewScreen(); else this.render(); };
                CalculatorEngine.render();
                return;
            }
            $('sessionView').innerHTML = `<div class="case-layout">
          <section class="case-passage">
            <div class="exam-top">
              <span>Case ${s.caseIndex + 1} of ${s.cases.length}</span>
              <div class="exam-top-right">
                ${!isExamIntegrityMode(s) ? `<button id="pauseBtn" class="btn-icon" title="${s.paused ? 'Resume' : 'Pause'}">${s.paused ? '\u25B6' : '\u23F8'}</button>` : ''}
                <span class="timerblock"><span>Time remaining</span><span class="timer${this.remaining() < 300 ? (this.remaining() < 60 ? ' danger' : ' warning') : ''}">${fmt(this.remaining())}</span></span>
              </div>
            </div>
            ${s.paused ? '<div class="pause-overlay"><div class="pause-modal"><h2>Session Paused</h2><p>Your session has been paused. Timer, autosave, and navigation timer have been suspended.</p><div class="pause-disclaimer"><strong>Important:</strong> The official CMA exam does not allow pausing. The timer runs continuously in the real testing environment. This pause feature is a study aid provided by the simulator only.</div><button id="resumeBtn" class="primary">Resume Session</button></div></div>' : ''}
            ${s.mode !== 'full' && s.realConditions === true ? '<div class="exam-notice">Simulate Real Exam Conditions is active. Pause is disabled. Timer runs continuously.</div>' : ''}
            <h2>${c.Title}</h2>
            <div class="meta-row">${c.SectionTags.map(x => `<span class="pill">Section ${x}</span>`).join('')}<span class="pill">Exhibit-based case simulation</span></div>
            <p>${nl2br(c.ScenarioText)}</p>
            ${this.caseExhibitsHtml(c)}
            <p class="small">Case-based practice uses original integrated item sets.</p>
          </section>
          <section class="case-items">${c.Items.map((it, i) => this.caseItemHtml(c, it, i)).join('')}
            <div class="exam-actions">
              <button id="prevCase" class="secondary">Previous</button>
              <button id="nextCase" class="primary">${s.caseIndex === s.cases.length - 1 ? 'Review / Submit' : 'Next Case'}</button>
            </div>
          </section>
        </div>`;
        CalculatorEngine.render();
        this.bindCaseInputs(c);
        this.bindCaseNav(c);
        if (s.paused) {
            let rb = $('resumeBtn');
            if (rb) rb.onclick = () => { this.pause(); this.render(); };
        }
        let pb = $('pauseBtn');
        if (pb) pb.onclick = () => { this.pause(); this.render(); };
        CalculatorEngine.setupKeyboardShortcuts();
    } catch (e) {
        console.error('renderCase error:', e);
        $('sessionView').innerHTML = '<div class="empty-state"><h2>Something went wrong rendering this case</h2><p>Your session is auto-saved. <a href="#" onclick="location.reload()" style="text-decoration:underline;cursor:pointer;">Reload the page</a> to resume, or <button id="skipCaseBtnErr" class="primary" style="padding:4px 12px;font-size:0.9rem;">Skip this case</button></p></div>';
        let skipErr = $('skipCaseBtnErr');
        if (skipErr) skipErr.onclick = () => { let s = state.session; if (s) { s.caseIndex++; if (s.caseIndex >= s.cases.length) ExamSessionManager.renderReviewScreen(); else ExamSessionManager.render(); } };
    }
},

    renderCaseExam(c) {
        try {
            let s = state.session;
            let validationErrors = this.validateCase(c);
            if (validationErrors.length > 0) {
                let isLastCase = s.caseIndex >= s.cases.length - 1;
                $('sessionView').innerHTML = `<div class="empty-state"><h2>Case Content Error</h2><p>This case (${c.CaseID || 'unknown'}) contains invalid content and cannot be displayed.</p><p class="small">${validationErrors.join('<br>')}</p><button id="skipCaseBtnExam" class="primary">${isLastCase ? 'Go to Review' : 'Skip to Next Case'}</button></div>`;
                let skip = $('skipCaseBtnExam');
                if (skip) skip.onclick = () => { s.caseIndex++; s.caseTaskIndex = 0; s.caseExhibitIndex = 0; if (s.caseIndex >= s.cases.length) this.renderReviewScreen(); else this.render(); };
                CalculatorEngine.render();
                return;
            }
            let taskIndex = Math.min(s.caseTaskIndex || 0, c.Items.length - 1);
            let exhibitIndex = Math.min(s.caseExhibitIndex || 0, Math.max(0, (c.Exhibits || []).length - 1));
            let activeExhibit = (c.Exhibits || [])[exhibitIndex];
            let task = c.Items[taskIndex];
            let taskAnswered = (i) => { let ans = s.caseAnswers[this.caseKey(c, i)]; return Array.isArray(ans) ? ans.length > 0 : !!(ans && String(ans).length); };
            var exhibitHtml = activeExhibit ? this.renderExhibitSafe(activeExhibit) : '<div class="case-exhibit"><h3>Scenario</h3><p>No separate exhibits provided.</p></div>';
            $('sessionView').innerHTML = `<div class="case-exam-shell">
          <section class="case-exam-exhibits">
            <div class="exam-top">
              <span>Case ${s.caseIndex + 1} of ${s.cases.length}</span>
              <div class="exam-top-right">
                <span class="timerblock"><span>Time remaining</span><span class="timer${this.remaining() < 300 ? (this.remaining() < 60 ? ' danger' : ' warning') : ''}">${fmt(this.remaining())}</span></span>
              </div>
            </div>
            <h2>${c.Title}</h2>
            <p>${nl2br(c.ScenarioText)}</p>
            <div class="exhibit-tabs">${(c.Exhibits || []).map((ex, i) => `<button class="exhibit-tab ${i === exhibitIndex ? 'active' : ''}" data-exhibit="${i}">${String(ex.Title || 'Exhibit')}</button>`).join('')}</div>
            ${exhibitHtml}
          </section>
          <section class="case-exam-task">
            <div class="case-task-header"><span>Task ${taskIndex + 1} of ${c.Items.length}</span><span>${task.Topic || 'Integrated task'}</span></div>
            ${this.caseItemHtml(c, task, taskIndex)}
            <div class="case-task-nav">${c.Items.map((_, i) => `<button class="case-task-button ${i === taskIndex ? 'current' : ''} ${taskAnswered(i) ? 'answered' : ''}" data-task="${i}">${i + 1}</button>`).join('')}</div>
            <div class="exam-actions">
              <button id="prevTask" class="secondary" ${taskIndex === 0 ? 'disabled' : ''}>Previous Task</button>
              <button id="nextTask" class="primary">${taskIndex === c.Items.length - 1 ? (s.caseIndex === s.cases.length - 1 ? 'Review / Submit' : 'Next Case') : 'Next Task'}</button>
            </div>
          </section>
        </div>`;
        CalculatorEngine.render();
        document.querySelectorAll('[data-exhibit]').forEach(b => b.onclick = () => { s.caseExhibitIndex = parseInt(b.dataset.exhibit); this.renderCaseExam(c); });
        document.querySelectorAll('[data-task]').forEach(b => b.onclick = () => { s.caseTaskIndex = parseInt(b.dataset.task); this.renderCaseExam(c); });
        this.bindCaseInputs(c);
        this.bindCaseExamNav(c, taskIndex);
        CalculatorEngine.setupKeyboardShortcuts();
    } catch (e) {
        console.error('renderCaseExam error:', e);
        $('sessionView').innerHTML = '<div class="empty-state"><h2>Something went wrong rendering this case</h2><p>Your session is auto-saved. <a href="#" onclick="location.reload()" style="text-decoration:underline;cursor:pointer;">Reload the page</a> to resume, or <button id="skipCaseExamBtnErr" class="primary" style="padding:4px 12px;font-size:0.9rem;">Skip this case</button></p></div>';
        let skipErrExam = $('skipCaseExamBtnErr');
        if (skipErrExam) skipErrExam.onclick = () => { let s = state.session; if (s) { s.caseIndex++; s.caseTaskIndex = 0; s.caseExhibitIndex = 0; if (s.caseIndex >= s.cases.length) ExamSessionManager.renderReviewScreen(); else ExamSessionManager.render(); } };
    }
},

    caseItemHtml(c, it, idx) {
        let key = this.caseKey(c, idx);
        let saved = state.session.caseAnswers[key];
        let isFlagged = state.session.caseFlags[key];
        let flagHtml = `<label class="flag"><input type="checkbox" data-caseflag="${key}" ${isFlagged ? 'checked' : ''}> Mark for review</label><button class="collection-save-btn case-save-btn" data-caseitemid="${it.ItemID || ''}" title="Save to bookmark collection">+ Save</button>`;
        if (it.Type === 'numeric' || it.Type === 'fill') {
            return `<div class="case-question"><b>${idx + 1}. ${nl2br(it.Prompt)}</b><input class="case-input" data-casekey="${key}" value="${saved || ''}" inputmode="${it.Type === 'numeric' ? 'decimal' : 'text'}">${flagHtml}</div>`;
        }
        if (it.Type === 'multi') {
            return `<div class="case-question"><b>${idx + 1}. ${nl2br(it.Prompt)}</b>${it.Choices.map(ch =>
                `<label class="case-option"><input type="checkbox" data-casekey="${key}" value="${ch}" ${(saved || []).includes(ch) ? 'checked' : ''}> ${ch}</label>`
            ).join('')}${flagHtml}</div>`;
        }
        if (it.Type === 'match') {
            let savedObj = saved || {};
            let rightPool = [...it.RightItems];
            let rows = it.LeftItems.map((left, i) => {
                let sel = savedObj[left] || '';
                let options = ['<option value="">-- select --</option>'].concat(rightPool.map(r => `<option value="${r}" ${sel === r ? 'selected' : ''}>${r}</option>`));
                return `<div class="match-row"><span class="match-left">${left}</span><select class="match-select" data-casekey="${key}" data-matchleft="${left}">${options.join('')}</select></div>`;
            });
            return `<div class="case-question match-question"><b>${idx + 1}. ${nl2br(it.Prompt)}</b><div class="match-grid">${rows.join('')}</div>${flagHtml}</div>`;
        }
        return `<div class="case-question"><b>${idx + 1}. ${nl2br(it.Prompt)}</b>${it.Choices.map(ch =>
            `<label class="case-option"><input type="radio" name="${key}" data-casekey="${key}" value="${ch}" ${saved === ch ? 'checked' : ''}> ${ch}</label>`
        ).join('')}${flagHtml}</div>`;
    },

    caseExhibitsHtml(c) {
        if (!c.Exhibits || !c.Exhibits.length) return '';
        var self = this;
        return '<div class="case-exhibits">' + c.Exhibits.map(function(ex) { return self.renderExhibitSafe(ex); }).join('') + '</div>';
    },

    renderExhibitSafe: function(ex) {
        if (!ex) return '<div class="case-exhibit"><h3>Exhibit</h3><p>No exhibit data available.</p></div>';
        var title = this._escapeHtml(String(ex.Title || 'Exhibit'));
        if (ex.Type === 'table') {
            var headers = ex.Headers || [];
            var rows = ex.Rows || [];
            if (!headers.length && Array.isArray(ex.Body)) {
                var b = ex.Body;
                if (b.length > 0 && Array.isArray(b[0])) { headers = b[0]; rows = b.slice(1); }
            }
            if (!headers.length) return '<div class="case-exhibit"><h3>' + title + '</h3><p>Table exhibit contains no headers or rows.</p></div>';
            var headerHtml = '<tr>' + headers.map(function(h) { return '<th>' + this._escapeHtml(String(h)) + '</th>'; }, this).join('') + '</tr>';
            var rowHtml = rows.map(function(row) {
                if (!Array.isArray(row)) row = [String(row)];
                var cells = [];
                for (var i = 0; i < headers.length; i++) {
                    cells.push('<td>' + this._escapeHtml(String(row[i] != null ? row[i] : '')) + '</td>');
                }
                return '<tr>' + cells.join('') + '</tr>';
            }, this).join('');
            return '<div class="case-exhibit"><h3>' + title + '</h3><table><thead>' + headerHtml + '</thead><tbody>' + rowHtml + '</tbody></table></div>';
        }
        var bodyText = ex.Body != null ? this._escapeHtml(String(ex.Body)) : '';
        return '<div class="case-exhibit"><h3>' + title + '</h3><p>' + bodyText + '</p></div>';
    },

    _escapeHtml: function(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    caseKey(c, i) { return c.CaseID + '-' + i; },
    norm(x) { return String(x || '').trim().toLowerCase().replace(/[$,]/g, ''); },

    correctCase(it, ans) {
        if (it.Type === 'multi') { if (!Array.isArray(ans) || !Array.isArray(it.Correct)) return false; return it.Correct.length === ans.length && it.Correct.every(x => ans.includes(x)); }
        if (it.Type === 'match') { if (!ans || typeof ans !== 'object' || !it.Correct || typeof it.Correct !== 'object') return false; return Object.keys(it.Correct).every(k => this.norm(ans[k]) === this.norm(it.Correct[k])); }
        return this.norm(ans) === this.norm(it.Correct);
    },

    normalizeCaseInput(it, value) { if (it.Type !== 'numeric') return value; return String(value || '').replace(/[$,\s]/g, ''); },

    bindCaseInputs(c) {
        let s = state.session;
        document.querySelectorAll('[data-casekey]').forEach(el => {
            let save = () => {
                let k = el.dataset.casekey;
                if (el.classList.contains('match-select')) { let obj = s.caseAnswers[k] || {}; obj[el.dataset.matchleft] = el.value; s.caseAnswers[k] = obj; } else if (el.type === 'checkbox' && !el.dataset.caseflag) { s.caseAnswers[k] = [...document.querySelectorAll('input[data-casekey="' + k + '"]:checked')].map(x => x.value); } else if (!el.dataset.caseflag) { let item = c.Items.find((_, i) => this.caseKey(c, i) === k) || {}; s.caseAnswers[k] = this.normalizeCaseInput(item, el.value); }
            };
            el.onchange = () => { save(); SessionPersistence.saveImmediate(); SessionPersistence.logAction('case-answer ' + el.dataset.casekey); };
            if (el.classList.contains('case-input')) el.oninput = () => { save(); };
        });
        document.querySelectorAll('[data-caseflag]').forEach(el => { el.onchange = () => { s.caseFlags[el.dataset.caseflag] = el.checked; SessionPersistence.saveImmediate(); SessionPersistence.logAction('case-flag ' + el.dataset.caseflag + '=' + el.checked); }; });
        // UX-4: Bind case item collection save buttons
        document.querySelectorAll('.case-save-btn').forEach(function (btn) {
            btn.onclick = function (e) {
                e.stopPropagation();
                var itemId = btn.dataset.caseitemid;
                if (!itemId) return;
                var existing = btn.nextElementSibling;
                if (existing && existing.classList.contains('collection-dropdown')) {
                    existing.style.display = existing.style.display === 'block' ? 'none' : 'block';
                    return;
                }
                var dd = document.createElement('div');
                dd.className = 'collection-dropdown';
                var cols = CMAProfileManager.getCollections();
                var html = '<div class="collection-dropdown-header">Save to Collection</div>';
                var entries = Object.entries(cols);
                if (entries.length === 0) {
                    html += '<div class="collection-dropdown-item disabled">No collections yet</div>';
                } else {
                    entries.forEach(function (entry) {
                        var cid = entry[0], col = entry[1];
                        var saved = col.items.indexOf(itemId) !== -1;
                        html += '<div class="collection-dropdown-item' + (saved ? ' saved' : '') + '" data-cid="' + cid + '">' +
                            (saved ? '&#10003; ' : '') + col.name + ' <span class="collection-count">' + col.items.length + '</span></div>';
                    });
                }
                html += '<div class="collection-dropdown-footer"><button class="collection-new-btn">+ New Collection</button></div>';
                dd.innerHTML = html;
                btn.parentNode.insertBefore(dd, btn.nextSibling);
                dd.style.display = 'block';
                dd.querySelectorAll('.collection-dropdown-item:not(.disabled)').forEach(function (item) {
                    item.onclick = function (ev) {
                        ev.stopPropagation();
                        var cid = this.dataset.cid;
                        if (CMAProfileManager.isInCollection(cid, itemId)) {
                            CMAProfileManager.removeFromCollection(cid, itemId);
                        } else {
                            CMAProfileManager.addToCollection(cid, itemId);
                        }
                        dd.style.display = 'none';
                    };
                });
                var nb = dd.querySelector('.collection-new-btn');
                if (nb) nb.onclick = function (ev) {
                    ev.stopPropagation();
                    var name = prompt('New collection name:');
                    if (name && name.trim()) {
                        var newId = CMAProfileManager.createCollection(name.trim(), '');
                        if (newId) {
                            CMAProfileManager.addToCollection(newId, itemId);
                            dd.style.display = 'none';
                        }
                    }
                };
                document.addEventListener('click', function closeCaseCD(ev) {
                    if (!btn.contains(ev.target) && !dd.contains(ev.target)) { dd.style.display = 'none'; }
                }, { once: true });
            };
        });
    },

    bindCaseNav(c) {
        let s = state.session;
        let p = $('prevCase');
        if (p) p.onclick = () => { if (s.caseIndex > 0) { s.caseIndex--; SessionPersistence.saveImmediate(); SessionPersistence.logAction('case-nav-prev ' + s.caseIndex); this.render(); } else if (s.mcqs.length) { s.qIndex = s.mcqs.length - 1; SessionPersistence.saveImmediate(); SessionPersistence.logAction('case-nav-prev-mcq ' + s.qIndex); this.render(); } };
        let n = $('nextCase');
        if (n) n.onclick = () => { if (s.caseIndex === s.cases.length - 1) { SessionPersistence.saveImmediate(); SessionPersistence.logAction('case-nav-to-review'); this.renderReviewScreen(); } else { s.caseIndex++; SessionPersistence.saveImmediate(); SessionPersistence.logAction('case-nav-next ' + s.caseIndex); this.render(); } };
    },

    bindCaseExamNav(c, taskIndex) {
        let s = state.session;
        let p = $('prevTask');
        if (p) p.onclick = () => { s.caseTaskIndex = Math.max(0, taskIndex - 1); SessionPersistence.saveImmediate(); SessionPersistence.logAction('case-exam-prev-task ' + s.caseTaskIndex); this.renderCaseExam(c); };
        let n = $('nextTask');
        if (n) n.onclick = () => {
            if (taskIndex < c.Items.length - 1) { s.caseTaskIndex = taskIndex + 1; SessionPersistence.saveImmediate(); SessionPersistence.logAction('case-exam-next-task ' + s.caseTaskIndex); this.renderCaseExam(c); return; }
            s.caseTaskIndex = 0; s.caseExhibitIndex = 0;
            if (s.caseIndex === s.cases.length - 1) this.renderReviewScreen();
            else { s.caseIndex++; this.render(); }
        };
    },

    renderReviewScreen() {
        try {
            let s = state.session;
            var colMap = {};
            try { var cols = CMAProfileManager.getCollections(); for (var cid in cols) { colMap[cid] = { name: cols[cid].name, ids: cols[cid].items || [] }; } } catch (e) {}
            let mcqRows = s.mcqs.map((q, i) => {
                let answered = !!s.answers[q.QuestionID];
                let flagged = !!s.flags[q.QuestionID];
                var colAttrs = '';
                for (var cid in colMap) { if (colMap[cid].ids.indexOf(q.QuestionID) !== -1) colAttrs += ' data-col-' + cid + '="1"'; }
                return `<tr data-answered="${answered ? '1' : '0'}" data-flagged="${flagged ? '1' : '0'}"${colAttrs}><td>${i + 1}</td><td>${q.Section}</td><td>${q.Topic}</td><td>${answered ? '<span class="status-answered">Answered</span>' : '<span class="status-unanswered">Unanswered</span>'}</td><td>${flagged ? '<span class="status-flagged">Flagged</span>' : ''}</td><td><button class="secondary smallbtn" data-jump="${i}">Go</button></td></tr>`;
            }).join('');
            let caseRows = s.cases.map((c, i) =>
                `<tr data-answered="1" data-flagged="0"><td>C${i + 1}</td><td>${c.SectionTags.join(', ')}</td><td>${c.Title}</td><td>Case set</td><td></td><td><button class="secondary smallbtn" data-casejump="${i}">Go</button></td></tr>`
            ).join('');
            let unanswered = s.mcqs.filter((_, i) => !s.answers[s.mcqs[i].QuestionID]).length;
            s.cases.forEach(c => { c.Items.forEach((_, i) => { if (!s.caseAnswers[this.caseKey(c, i)]) unanswered++; }); });
            let totalItems = s.mcqs.length + s.cases.reduce((sum, c) => sum + c.Items.length, 0);
            let answered = totalItems - unanswered;

            $('sessionView').innerHTML = `<article class="summary-card">
          <h2>Review Before Submission</h2>
          <div class="review-summary-bar">
            <span>Answered: <b>${answered}</b> / ${totalItems}</span>
            <span>Unanswered: <b>${unanswered}</b></span>
            <span>Flagged: <b>${Object.values(s.flags).filter(Boolean).length + Object.values(s.caseFlags).filter(Boolean).length}</b></span>
          </div>
          <div class="review-filters">
            <button class="secondary review-filter-btn active" data-reviewfilter="all">Review All</button>
            <button class="secondary review-filter-btn" data-reviewfilter="unanswered">Review Unanswered</button>
            <button class="secondary review-filter-btn" data-reviewfilter="flagged">Review Flagged</button>
            ${Object.keys(colMap).length ? Object.keys(colMap).map(function (cid) { return '<button class="secondary review-filter-btn" data-reviewfilter="col-' + cid + '">' + colMap[cid].name + '</button>'; }).join('') : ''}
          </div>
          <table class="review-table"><thead><tr><th>#</th><th>Section</th><th>Topic</th><th>Status</th><th>Flag</th><th></th></tr></thead><tbody>${mcqRows}${caseRows}</tbody></table>
          <div class="exam-actions">
            <button id="backToItems" class="secondary">Back to Items</button>
            <button id="finishExam" class="primary">Submit Session</button>
          </div>
        </article>`;
            NavigationController.bind();
            document.querySelectorAll('.review-filter-btn').forEach(btn => {
                btn.onclick = () => {
                    document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    let f = btn.dataset.reviewfilter;
                    document.querySelectorAll('.review-table tbody tr').forEach(tr => {
                        if (f === 'all') tr.style.display = '';
                        else if (f === 'unanswered') tr.style.display = tr.dataset.answered === '0' ? '' : 'none';
                        else if (f === 'flagged') tr.style.display = tr.dataset.flagged === '1' ? '' : 'none';
                        else if (f && f.indexOf('col-') === 0) { var attr = 'data-' + f.replace(/([A-Z])/g, '-$1').toLowerCase(); tr.style.display = tr.getAttribute(attr) === '1' ? '' : 'none'; }
                    });
                };
            });
            let b = $('backToItems');
            if (b) b.onclick = () => this.render();
            let f = $('finishExam');
            if (f) f.onclick = this.finish.bind(this);
        } catch (e) {
            console.error('renderReviewScreen error:', e);
            $('sessionView').innerHTML = '<div class="empty-state"><h2>Something went wrong</h2><p>Your session is auto-saved. <a href="#" onclick="location.reload()" style="text-decoration:underline;cursor:pointer;">Reload the page</a> to resume.</p></div>';
        }
    },

    updateProgressBar() {
        let s = state.session;
        if (!s) return;
        let total = s.mcqs.length + s.cases.reduce((sum, c) => sum + c.Items.length, 0);
        let current = s.qIndex < s.mcqs.length ? s.qIndex + 1 : s.mcqs.length + s.caseIndex + 1;
        let pct = Math.round((current / total) * 100);
        document.querySelectorAll('.progress-fill').forEach(b => { b.style.width = pct + '%'; });
        document.querySelectorAll('.progress-text').forEach(el => { el.textContent = `${current}/${total}`; });
    },

    // practiceScores — CMA-Style Aggregate Scoring
    // ------------------------------------------------------------
    // Uses the CMA structural rules:
    //   1. MCQs: binary (scoreMCQ → 0 or 1), equally weighted
    //   2. CBQs: partial credit via correctCase (per-item 0 or 1 → fractional case total)
    //   3. Weighting: 75% MCQ / 25% CBQ (fixed — never changes per question)
    //   4. 0–500 neutral linear scale with 360 passing threshold
    //   5. Difficulty calibration: a small form-difficulty adjustment
    //      applied AFTER the fixed weights. Does NOT alter the
    //      MCQ gate, section weights, or per-item visibility.
    //
    // This is a training simulator — NOT the official CMA exam.
    // The real CMA exam uses scaled scoring and psychometric
    // equating that this simulator cannot replicate.
    practiceScores(difficultyPreset) {
        if (!difficultyPreset) difficultyPreset = 'standard';
        let preset = DIFFICULTY_PRESETS[difficultyPreset] || DIFFICULTY_PRESETS.standard;
        let s = state.session;
        let mcqC = 0, caseC = 0, caseT = 0;
        s.mcqs.forEach(q => { mcqC += scoreMCQ(q, s.answers[q.QuestionID]); });
        s.cases.forEach(c => { c.Items.forEach((it, i) => { caseT++; if (this.correctCase(it, s.caseAnswers[this.caseKey(c, i)])) caseC++; }); });
        let mcqPct = s.mcqs.length ? mcqC / s.mcqs.length : null;
        let casePct = caseT ? caseC / caseT : null;

        // Fixed 75/25 weighting (CMA structural rules)
        let weighted = (mcqPct !== null && casePct !== null)
            ? (mcqPct * 0.75 + casePct * 0.25)
            : ((mcqC + caseC) / Math.max(1, s.mcqs.length + caseT));

        // Difficulty calibration — small form-difficulty adjustment
        let calibrated = (mcqPct !== null && casePct !== null)
            ? (mcqPct * preset.mcqFactor * 0.75 + casePct * preset.cbqFactor * 0.25)
            : weighted;

        let raw = (mcqC + caseC) / Math.max(1, s.mcqs.length + caseT);
        // Neutral 0–500 linear mapping (no equating)
        let scaled = Math.max(0, Math.min(500, Math.round(calibrated * 500 + preset.scaleOffset)));
        let passed = scaled >= 360;
        let grade = scaled >= 420 ? 'Strong pass range'
            : scaled >= 360 ? 'Passing range'
            : scaled >= 300 ? 'Near pass range'
            : 'Needs substantial review';
        return { mcqC, caseC, caseT, mcqPct, casePct, raw, weighted, calibrated, scaled, passed, grade, difficultyPreset };
    },

    pct(x) { return x === null ? 'n/a' : Math.round(x * 100) + '%'; },

    _renderConfidenceDashboard(s) {
        let entries = [];
        s.mcqs.forEach(q => {
            let ans = s.answers[q.QuestionID];
            if (ans === undefined) return;
            let correct = scoreMCQ(q, ans) === 1;
            let conf = s.confidence[q.QuestionID] || 0;
            if (conf === 0) return;
            entries.push({ conf, correct, guessed: !!s.guessed[q.QuestionID] });
        });
        if (entries.length === 0) return '';

        let Hc = entries.filter(e => e.conf >= 4 && e.correct).length;
        let Hw = entries.filter(e => e.conf >= 4 && !e.correct).length;
        let Mc = entries.filter(e => e.conf === 3 && e.correct).length;
        let Mw = entries.filter(e => e.conf === 3 && !e.correct).length;
        let Lc = entries.filter(e => e.conf <= 2 && e.correct).length;
        let Lw = entries.filter(e => e.conf <= 2 && !e.correct).length;

        let total = entries.length;
        let overconfident = entries.filter(e => e.conf >= 4 && !e.correct).length;
        let underconfident = entries.filter(e => e.conf <= 2 && e.correct).length;
        let guessed = entries.filter(e => e.guessed).length;
        let guessedCorrect = entries.filter(e => e.guessed && e.correct).length;

        let overconfidencePct = Math.round(overconfident / Math.max(1, entries.filter(e => e.conf >= 4).length) * 100);
        let underconfidencePct = Math.round(underconfident / Math.max(1, entries.filter(e => e.conf <= 2).length) * 100);
        let guessAccuracy = guessed > 0 ? Math.round(guessedCorrect / guessed * 100) : null;

        let Htot = Hc + Hw, Mtot = Mc + Mw, Ltot = Lc + Lw;
        let Hacc = Htot > 0 ? Math.round(Hc / Htot * 100) : 0;
        let Macc = Mtot > 0 ? Math.round(Mc / Mtot * 100) : 0;
        let Lacc = Ltot > 0 ? Math.round(Lc / Ltot * 100) : 0;

        // Calibration score: higher = better aligned. Perfect would be Hacc=100, Lacc=0.
        let calScore = Math.round(Math.max(0, Math.min(100,
            50 + (Hacc - 80) * 1.2 + (30 - Lacc) * 0.5
        )));

        let cell = (n, d, css) =>
            `<td class="conf-matrix-cell ${css}">${n > 0 ? '<span class="conf-matrix-n">' + n + '</span>' + (d ? '<span class="conf-matrix-pct">' + Math.round(n / d * 100) + '%</span>' : '') : '<span class="conf-matrix-n">&mdash;</span>'}</td>`;

        return `<div class="dashboard-card" style="grid-column:1/-1;text-align:left;">
          <h3 style="text-align:center;">Confidence Calibration</h3>
          <table class="conf-matrix">
            <thead><tr><th></th><th class="conf-matrix-th-correct">Correct</th><th class="conf-matrix-th-wrong">Wrong</th></tr></thead>
            <tbody>
              <tr><td class="conf-matrix-label">High</td>${cell(Hc, Htot, 'conf-cell-good')}${cell(Hw, Htot, 'conf-cell-bad')}</tr>
              <tr><td class="conf-matrix-label">Medium</td>${cell(Mc, Mtot, 'conf-cell-med')}${cell(Mw, Mtot, 'conf-cell-med')}</tr>
              <tr><td class="conf-matrix-label">Low</td>${cell(Lc, Ltot, 'conf-cell-warn')}${cell(Lw, Ltot, 'conf-cell-ok')}</tr>
            </tbody>
          </table>
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:14px;font-size:0.85rem;justify-content:center;">
            <span title="High confidence but wrong"><b>Overconfidence:</b> ${overconfidencePct}% of high-confidence answers</span>
            <span title="Low confidence but right"><b>Underconfidence:</b> ${underconfidencePct}% of low-confidence answers</span>
            ${guessAccuracy !== null ? '<span title="Guesses that turned out correct"><b>Guess Accuracy:</b> ' + guessAccuracy + '% (' + guessedCorrect + '/' + guessed + ')</span>' : ''}
            <span><b>Calibration Score:</b> <span class="conf-badge ' + (calScore >= 80 ? 'conf-high' : calScore >= 50 ? 'conf-med' : 'conf-low') + '">' + calScore + '/100</span></span>
          </div>
          <p class="small" style="margin-top:10px;">A well-calibrated learner: high confidence = correct, low confidence = wrong. <a href="#" onclick="showView(\'coachView\'); if(typeof May!==\'undefined\'){May.startSessionReview();May.renderView()} return false;" style="text-decoration:underline;">Review with May \u2192</a></p>
        </div>`;
    },

    _renderRecoverySprintOutcome(sc, s) {
        if (!s || s.mode !== 'recovery_sprint' || !s.recoverySource || !s.recoverySource.sessionId) return '';

        let history = SessionPersistence.getHistory() || [];
        let sourceEntry = history.find(h => h.id === s.recoverySource.sessionId);
        if (!sourceEntry) return '';

        let sourceScore = sourceEntry.scaledScore;
        let currentRaw = s.mcqs.filter((q, i) => {
            let ans = s.answers[q.QuestionID];
            return ans !== undefined && scoreMCQ(q, ans) === 1;
        }).length;
        let currentTotal = s.mcqs.filter((q, i) => s.answers[q.QuestionID] !== undefined).length;
        let currentPct = currentTotal > 0 ? Math.round(currentRaw / currentTotal * 100) : 0;

        let sprintCorrect = s.mcqs.filter(q => s.answers[q.QuestionID] !== undefined && scoreMCQ(q, s.answers[q.QuestionID]) === 1).length;
        let sprintTotal = s.mcqs.filter(q => s.answers[q.QuestionID] !== undefined).length;
        let beforePct = Math.round(sprintCorrect / Math.max(1, sprintTotal) * 100);

        // Topic-level improvement
        let topicImprovements = [];
        let topicSummary = s.recoverySource.topicSummary || {};
        Object.keys(topicSummary).sort().forEach(topic => {
            let sprintItems = s.mcqs.filter(q => {
                let qTopic = q.Topic || '';
                return qTopic.toLowerCase().indexOf(topic.toLowerCase()) !== -1 || topic.toLowerCase().indexOf(qTopic.toLowerCase()) !== -1;
            });
            let tc = sprintItems.filter(q => s.answers[q.QuestionID] !== undefined && scoreMCQ(q, s.answers[q.QuestionID]) === 1).length;
            let tt = sprintItems.filter(q => s.answers[q.QuestionID] !== undefined).length;
            let beforeTopicAcc = sourceEntry.topicSnapshot && sourceEntry.topicSnapshot[topic]
                ? sourceEntry.topicSnapshot[topic].accuracy : null;
            let afterTopicPct = tt > 0 ? Math.round(tc / tt * 100) : null;
            if (beforeTopicAcc !== null && afterTopicPct !== null) {
                topicImprovements.push({ topic, before: beforeTopicAcc, after: afterTopicPct, delta: afterTopicPct - beforeTopicAcc });
            } else if (afterTopicPct !== null) {
                topicImprovements.push({ topic, before: null, after: afterTopicPct, delta: null });
            }
        });
        topicImprovements.sort((a, b) => (b.delta || 0) - (a.delta || 0));

        let topicHtml = topicImprovements.length > 0
            ? topicImprovements.map(t => {
                let barW = Math.max(4, t.after);
                let barCls = t.delta !== null && t.delta >= 10 ? 'rec-topic-bar-good' : t.delta !== null && t.delta >= 0 ? 'rec-topic-bar-ok' : 'rec-topic-bar-focus';
                let deltaStr = t.delta !== null ? (t.delta >= 0 ? '+' : '') + t.delta + '%' : '';
                return '<div class="rec-topic-row"><div class="rec-topic-name" title="' + t.topic + '">' + t.topic + '</div><div class="rec-topic-bar-track"><div class="rec-topic-bar ' + barCls + '" style="width:' + barW + '%"></div></div><div class="rec-topic-scores">' + (t.before !== null ? t.before + '%' : '&mdash;') + ' ' + (t.delta !== null && t.delta >= 0 ? '\u2192' : '\u2192') + ' <strong>' + t.after + '%</strong> ' + deltaStr + '</div></div>';
            }).join('')
            : '';

        return `<div class="dashboard-card" style="grid-column:1/-1;text-align:left;border-left:4px solid var(--primary);">
          <h3 style="text-align:center;">Recovery Sprint Outcome</h3>
          <div class="rec-sprint-summary">
            <div class="rec-sprint-stat">
              <div class="dashboard-stat" style="color:var(--primary);">${sprintCorrect}/${sprintTotal}</div>
              <p>Sprint accuracy</p>
            </div>
            <div class="rec-sprint-stat">
              <div class="dashboard-stat" style="color:${currentPct >= 70 ? '#22c55e' : '#f59e0b'};">${currentPct}%</div>
              <p>Correct out of answered</p>
            </div>
          </div>
          <p class="small" style="text-align:center;margin-top:8px;"><em>Recovery sprints target your weakest topics with 15 high-priority questions. Each sprint improves your readiness for the next full practice session.</em></p>
          ${topicHtml ? '<div class="rec-topic-improvements"><h4 style="margin-bottom:8px;">Topic Improvement</h4>' + topicHtml + '</div>' : ''}
          <div style="display:flex;gap:8px;margin-top:14px;justify-content:center;">
            <button class="secondary" onclick="ExamSessionManager.startRecoverySprint(ExamSessionManager._lastSourceSession)" style="font-size:0.8rem;">Re-run Sprint</button>
            <button class="secondary" onclick="showView('coachView'); if(typeof May!=='undefined'){May.startSessionReview();May.renderView()}" style="font-size:0.8rem;">Escalate Review</button>
          </div>
          <p class="small" style="text-align:center;margin-top:4px;"><a href="#" onclick="showView('sessionView'); return false;">Continue</a></p>
        </div>`;
    },

    _renderRecoverySprintBar(queue) {
        var mcqEntries = queue.filter(function(e) { return e.type === 'mcq'; });
        mcqEntries.sort(function(a, b) { return b.score - a.score; });
        var sprintEntries = mcqEntries.slice(0, 15);
        if (sprintEntries.length === 0) return '';
        var topicCounts = {};
        sprintEntries.forEach(function(e) {
            var t = e.topic || 'General';
            topicCounts[t] = (topicCounts[t] || 0) + 1;
        });
        var topicPairs = [];
        for (var t in topicCounts) { topicPairs.push(t + ' (' + topicCounts[t] + ')'); }
        var topicSummary = topicPairs.join(', ');
        var qualifier = sprintEntries.length >= 15 ? '15 questions targeting your weakest areas' : (sprintEntries.length + ' questions targeting your weakest areas');
        return '<div class="recovery-sprint-bar">'
            + '<div class="recovery-sprint-info">'
            + '<span class="recovery-sprint-label">Recovery Sprint</span>'
            + '<span class="recovery-sprint-detail">' + qualifier + '</span>'
            + '</div>'
            + (topicSummary ? '<p class="small" style="margin:4px 0 0 0;color:var(--text-muted);">Topics: ' + topicSummary + '</p>' : '')
            + '<button id="launchRecoverySprint" class="primary recovery-sprint-btn">Launch Sprint</button>'
            + '</div>';
    },

    _renderMayRecommendationPanel() {
        if (typeof MayFeatureFlags === 'undefined' || !MayFeatureFlags.isEnabled('ENABLE_PRODUCTION_MAY_INTEGRATION')) return '';
        if (typeof MayLearnerState === 'undefined') return '';
        try {
            let clusters = MayLearnerState.getWeaknessClusters();
            let readiness = MayLearnerState.getReadinessSummary();
            let topWeak = clusters && clusters.persistentWeak && clusters.persistentWeak.length > 0 ? clusters.persistentWeak[0] : null;
            let declining = clusters && clusters.declining && clusters.declining.length > 0 ? clusters.declining[0] : null;
            let suggestedTopic = declining ? declining.topic : (topWeak ? topWeak.topic : null);
            let readinessBand = readiness && readiness.overall ? readiness.overall.band : 'Not enough data';
            let bandCls = readinessBand === 'Recovery needed' ? 'may-rec-danger' : readinessBand === 'Developing' ? 'may-rec-warning' : readinessBand === 'Approaching review-ready' ? 'may-rec-info' : 'may-rec-muted';
            let nextAction = suggestedTopic ? 'Review ' + suggestedTopic + ' questions' : 'Start a practice session';
            let data = MayLearnerState.load();
            let sessionCount = data.sessions ? data.sessions.length : 0;
            let hasData = sessionCount >= 1;
            if (!hasData) return '';
            if (typeof MayTelemetry !== 'undefined') {
                var _ts = new Date().toISOString();
                MayTelemetry.trackAdoption({ recommendationType: 'Top Weakness', cardId: 'top-weakness', topic: (topWeak ? topWeak.topic : ''), presented: true, panelOpened: false, clicked: false, sessionStarted: false, completed: false, timestamp: _ts });
                MayTelemetry.trackAdoption({ recommendationType: 'Suggested Review', cardId: 'suggested-review', topic: (suggestedTopic || ''), presented: true, panelOpened: false, clicked: false, sessionStarted: false, completed: false, timestamp: _ts });
                MayTelemetry.trackAdoption({ recommendationType: 'Next Session', cardId: 'next-session', topic: (suggestedTopic || ''), presented: true, panelOpened: false, clicked: false, sessionStarted: false, completed: false, timestamp: _ts });
                MayTelemetry.trackAdoption({ recommendationType: 'Readiness', cardId: 'readiness', topic: (readinessBand || ''), presented: true, panelOpened: false, clicked: false, sessionStarted: false, completed: false, timestamp: _ts });
            }
            var _tw = topWeak ? topWeak.topic : '';
            var _st = suggestedTopic || '';
            var _twEsc = _tw.replace(/'/g, "\\'");
            var _stEsc = _st.replace(/'/g, "\\'");
            var _rbEsc = readinessBand.replace(/'/g, "\\'");
            var archetypeInfo = '';
            try {
                if (typeof MayLearnerState !== 'undefined' && MayLearnerState.getBehavioralProfile) {
                    var bp = MayLearnerState.getBehavioralProfile();
                    if (bp && bp.hasProfileData && bp.archetype !== 'new') {
                        var _aLabels = { 'ready': '★ Exam Ready', 'plateaued': '⚠ Plateau', 'developing': '↑ Developing' };
                        var _aColors = { 'ready': '#27ae60', 'plateaued': '#f39c12', 'developing': '#3498db' };
                        var _aL = _aLabels[bp.archetype] || '';
                        var _aC = _aColors[bp.archetype] || '#888';
                        archetypeInfo = '<div class="may-rec-card" id="may-rec-archetype" onclick="window._mcc(\'Archetype\',\'archetype\',\'' + bp.archetype + '\')"><div class="may-rec-label">Learner Profile</div><div class="may-rec-value" style="color:' + _aC + ';">' + _aL + '</div></div>';
                    }
                }
            } catch (ae) { archetypeInfo = ''; }
            // S114P — Archetype coaching action cards
            var coachingActionCards = '';
            try {
                if (typeof MayArchetypeCoach !== 'undefined' && typeof bp !== 'undefined' && bp) {
                    var actions = MayArchetypeCoach.getCoachingActions(bp);
                    if (actions && actions.length > 0) {
                        var actionCardHtml = [];
                        var actionIcons = { 1: '\u25b6', 2: '\u25b7', 3: '\u25b8' };
                        actions.forEach(function(a) {
                            var aIcon = actionIcons[a.priority] || '\u25b8';
                            var aCls = a.actionable ? 'may-rec-card may-rec-action-card' : 'may-rec-card';
                            var aOnclick = a.actionable && a.handler
                                ? ' onclick="window._mac(\'' + a.type + '\',\'' + a.handler + '\')"'
                                : '';
                            var shortGuidance = a.guidance.length > 180 ? a.guidance.substring(0, 177) + '...' : a.guidance;
                            actionCardHtml.push(
                                '<div class="' + aCls + '"' + aOnclick + ' id="may-rec-action-' + a.type + '">' +
                                '<div class="may-rec-label">' + aIcon + ' ' + (a.label || '') + '</div>' +
                                '<div class="may-rec-detail">' + shortGuidance + '</div>' +
                                '</div>'
                            );
                        });
                        coachingActionCards = actionCardHtml.join('');
                    }
                }
            } catch (ae2) { coachingActionCards = ''; }
            return '<div class="may-recommendation-panel"><h3>May Recommendations</h3><div class="may-rec-grid">'
                + '<div class="may-rec-card" id="may-rec-weakness" onclick="window._mcc(\'Top Weakness\',\'top-weakness\',\'' + _twEsc + '\')"><div class="may-rec-label">Top Weakness</div><div class="may-rec-value">' + (topWeak ? topWeak.topic + ' (' + (topWeak.accuracy || 0) + '%)' : 'Not enough data') + '</div></div>'
                + '<div class="may-rec-card" id="may-rec-suggested" onclick="window._mcc(\'Suggested Review\',\'suggested-review\',\'' + _stEsc + '\')"><div class="may-rec-label">Suggested Review</div><div class="may-rec-value">' + (suggestedTopic || 'Complete more sessions') + '</div></div>'
                + archetypeInfo
                + coachingActionCards
                + '<div class="may-rec-card" id="may-rec-next" onclick="window._mcc(\'Next Session\',\'next-session\',\'' + _stEsc + '\')"><div class="may-rec-label">Next Session</div><div class="may-rec-value">' + nextAction + '</div></div>'
                + '<div class="may-rec-card" id="may-rec-readiness" onclick="window._mcc(\'Readiness\',\'readiness\',\'' + _rbEsc + '\')"><div class="may-rec-label">Readiness</div><div class="may-rec-value may-rec-band ' + bandCls + '">' + readinessBand + '</div></div>'
                + '</div><p class="small" style="margin-top:8px;"><a href="#" onclick="showView(\'coachView\'); if(typeof May!==\'undefined\'){May.renderView()} if(typeof MayTelemetry!==\'undefined\'){MayTelemetry.trackAdoption({recommendationType:\'Panel Link\',cardId:\'rec-panel-link\',topic:\'\',presented:false,panelOpened:true,clicked:true,sessionStarted:false,completed:false,timestamp:new Date().toISOString()})} return false;">Open May for full coaching \u2192</a></p></div>';
        } catch (e) { return ''; }
    },

    renderSummary(filter) {
        if (filter === undefined) filter = 'priority';
        try {
            let s = state.session;
            let sc = ExamSessionManager.practiceScores();
            let analyticsSummary = AnalyticsCollector.getSummary();
            let breakdown = PerformanceAnalytics.computeBreakdown(s);
            let weaknesses = PerformanceAnalytics.identifyWeakAreas(breakdown, { minAttempts: 2, topN: 3 });
            let history = SessionPersistence.getHistory();
            let remediationPlan = PerformanceAnalytics.generateRemediationPlan(breakdown, history, sc);

            // Readiness model and study plan
            let readiness = ReadinessModel.compute(history);
            let studyPlan = generateStudyPlan(
                readiness,
                history,
                sc ? sc.scaled : null,
                sc ? sc.mcqPct : null,
                sc ? sc.casePct : null
            );

            let bySec = {};
            s.mcqs.forEach(q => { let ok = scoreMCQ(q, s.answers[q.QuestionID]) === 1; bySec[q.Section] = bySec[q.Section] || { n: 0, c: 0, time: 0 }; bySec[q.Section].n++; if (ok) bySec[q.Section].c++; });
            s.cases.forEach(c => { c.Items.forEach((it, i) => { let sec = c.SectionTags[0]; let ok = this.correctCase(it, s.caseAnswers[this.caseKey(c, i)]); bySec[sec] = bySec[sec] || { n: 0, c: 0, time: 0 }; bySec[sec].n++; if (ok) bySec[sec].c++; }); });

            let tiles = Object.entries(bySec).sort((a, b) => (a[1].c / a[1].n) - (b[1].c / b[1].n)).map(([sec, v]) =>
                `<div class="scoretile"><b>Section ${sec}</b><br>${v.c}/${v.n} correct (${Math.round(v.c / v.n * 100)}%)<br><span class="small">${SECTION_INFO[sec] ? SECTION_INFO[sec].name : ''}</span></div>`
            ).join('');

            // Topic breakdown with MCQ/CBQ split
            let topicBreakdownHtml = PerformanceAnalytics.renderTopicBreakdown(breakdown, 12);

            // Weak / Strong areas
            let weakTopic = weaknesses.byTopic;
            let { weakHtml, strongHtml } = PerformanceAnalytics.renderWeakStrongCards(
                weakTopic.weakest, weakTopic.strongest
            );

            // Adaptive Review Queue
            let queue = AdaptiveReviewQueue.generate(s);
            let reviewHtml = AdaptiveReviewQueue.render(queue, filter);

            // Difficulty profile note
            let diffNote = sc.difficultyPreset !== 'standard'
                ? `<p class="small">Difficulty profile: <strong>${sc.difficultyPreset}</strong> form (calibration applied). Performance expectations are adjusted for form difficulty.</p>`
                : `<p class="small">Difficulty profile: <strong>standard</strong> (no calibration applied).</p>`;

            // MCQ vs CBQ split summary
            let mcqCbqSplit = `
            <div class="dashboard-grid">
              <div class="dashboard-card"><h3>MCQ Performance</h3><div class="dashboard-stat">${sc.mcqPct !== null ? Math.round(sc.mcqPct * 100) + '%' : 'N/A'}</div><p>${sc.mcqC}/${s.mcqs.length} correct</p><p class="small">Gate: ${s.mcqs.length ? (sc.mcqPct >= 0.5 ? 'Met' : 'Not met') : 'N/A'}</p></div>
              <div class="dashboard-card"><h3>CBQ Performance</h3><div class="dashboard-stat">${sc.casePct !== null ? Math.round(sc.casePct * 100) + '%' : 'N/A'}</div><p>${sc.caseC}/${sc.caseT} task${sc.caseT === 1 ? '' : 's'} correct</p><p class="small">Partial credit applied</p></div>
            </div>`;

            $('sessionView').innerHTML = `<article class="summary-card">
          <h2>Score Report</h2>
          ${this.compositionNoteHtml()}
          ${this._renderRecoverySprintOutcome(sc, s)}
          <div class="score-hero">
            <div>
              <span class="score-num">${sc.scaled}</span><span class="score-den"> / 500</span>
              <p><b>${sc.grade}</b> ${sc.passed ? '✓' : ''}</p>
              <p class="small">${sc.passed ? 'At or above the 360 modeled passing threshold.' : 'Below the 360 modeled passing threshold.'}</p>
              ${diffNote}
            </div>
            <div class="score-breakdown">
              <p><b>Overall raw accuracy:</b> ${this.pct(sc.raw)}</p>
              <p><b>Exam-weighted (75% MCQ / 25% CBQ):</b> ${this.pct(sc.weighted)}</p>
              <p><b>Marked:</b> ${Object.values(s.flags).filter(Boolean).length + Object.values(s.caseFlags).filter(Boolean).length}</p>
              ${analyticsSummary ? `<p><b>Avg time/question:</b> ${fmtShort(analyticsSummary.avgTimePerQuestion)}</p><p><b>Confidence mismatches:</b> ${analyticsSummary.confidenceMismatch}</p>` : ''}
            </div>
          </div>

          <h3>MCQ vs CBQ Split</h3>
          ${mcqCbqSplit}

          ${this._renderConfidenceDashboard(s)}

          <h3>Section Performance (Sorted Weakest → Strongest)</h3>
          <div class="scoregrid">${tiles}</div>

          <h3>Topic Performance</h3>
          <div class="topic-grid">${topicBreakdownHtml}</div>

          <h3>Weakest & Strongest Areas</h3>
          <div class="scoregrid">
            <div style="grid-column:1/-1;font-weight:600;color:#ef4444;margin-bottom:4px;">Weakest Topics (min 2 attempts)</div>
            ${weakHtml}
            <div style="grid-column:1/-1;font-weight:600;color:#22c55e;margin-top:12px;margin-bottom:4px;">Strongest Topics</div>
            ${strongHtml}
          </div>

          <h3>Targeted Remediation Plan</h3>
          ${PerformanceAnalytics.renderRemediationCard(remediationPlan)}

          ${generateStudyPlan.renderResultSnippet(studyPlan)}

          ${ReviewCoach.renderPostSessionCard()}

          ${ReadinessModel.renderReadinessCard(readiness)}

          ${this._renderMayRecommendationPanel()}

          <h3>Adaptive Review Queue</h3>
          <p class="small">Prioritized by: Incorrect (weight 5) &gt; Guesses (3) &gt; Low confidence (2) &gt; Slow correct (2) &gt; Marked (1).</p>
          <div class="review-controls">
            <button class="secondary" data-filter="priority">Priority</button>
            <button class="secondary" data-filter="missed">Missed Only</button>
            <button class="secondary" data-filter="marked">Marked Only</button>
            <button class="secondary" data-filter="all">All Items</button>
          </div>
          ${this._renderRecoverySprintBar(queue)}
          <div id="reviewCards">${reviewHtml}</div>
          <div style="margin-top:16px;text-align:center;">
            <button id="again" class="secondary">Start New Session</button>
          </div>

          ${CmaScoringDisclaimer('full')}
        </article>`;

            document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => this.renderSummary(b.dataset.filter));
            let a = $('again');
            if (a) a.onclick = () => $('sessionForm').requestSubmit();
            let rsBtn = $('launchRecoverySprint');
            if (rsBtn) rsBtn.onclick = () => ExamSessionManager.startRecoverySprint(s);
            this.renderHistory();
        } catch (e) {
            console.error('renderSummary error:', e);
            $('sessionView').innerHTML = '<div class="empty-state"><h2>Something went wrong generating your score report</h2><p>Your session is auto-saved. <a href="#" onclick="location.reload()" style="text-decoration:underline;cursor:pointer;">Reload the page</a> to resume.</p></div>';
        }
    },

    renderHistory() {
        let h = SessionPersistence.getHistory();
        $('historyView').innerHTML = h.length ?
            '<h2>History <button onclick="SessionPersistence.clearHistory(); ExamSessionManager.renderHistory();" class="btn btn-outline" style="float:right;padding:4px 8px;font-size:0.8rem;">Clear History</button></h2>' +
            h.map(x => `<div class="history-card"><b>${new Date(x.date).toLocaleString()}</b>` +
                `<p class="small">Mode ${x.mode} | ${fmt(x.duration)} | Sections ${(x.sections||[]).join(', ')} | MCQs ${x.correct}/${x.mcqs} | Cases ${x.cases || 0}${x.scaledScore ? ' | Scaled: ' + x.scaledScore : ''}${x.grade ? ' | ' + x.grade : ''}${x.passed ? ' | ✓ PASS' : (x.passed === false ? ' | Below threshold' : '')}${x.mcqGate === false ? ' | MCQ gate failed' : ''}${x.difficultyPreset && x.difficultyPreset !== 'standard' ? ' | ' + x.difficultyPreset + ' form' : ''}</p></div>`
            ).join('') :
            '<div class="empty-state"><h2>No saved attempts yet</h2></div>';
    }
};

// ============================================================
// NavigationController — Prometric-Style Navigation
// ============================================================
const NavigationController = {
    html() {
        let s = state.session;
        if (!s) return '';
        let total = s.mcqs.length + s.cases.length;
        let current = s.qIndex;

        var colMap = {};
        try {
            var cols = CMAProfileManager.getCollections();
            for (var cid in cols) {
                colMap[cid] = { name: cols[cid].name, ids: cols[cid].items || [] };
            }
        } catch (e) { /* profile may not exist yet */ }

        let mcqBtns = s.mcqs.map((q, i) => {
            let answ = !!s.answers[q.QuestionID];
            let flg = !!s.flags[q.QuestionID];
            var colAttrs = '';
            for (var cid in colMap) {
                if (colMap[cid].ids.indexOf(q.QuestionID) !== -1) colAttrs += ' data-col-' + cid + '="1"';
            }
            return `<button class="navitem ${i === current ? 'current' : ''} ${answ ? 'answered' : ''} ${flg ? 'flagged' : ''}" data-jump="${i}" data-answered="${answ ? '1' : '0'}" data-flagged="${flg ? '1' : '0'}"${colAttrs} title="${q.QuestionID || 'Q' + (i + 1)}">${i + 1}</button>`;
        }).join('');
        let caseBtns = s.cases.map((c, i) =>
            `<button class="navitem nav-case ${s.mcqs.length + i === current ? 'current' : ''}" data-casejump="${i}" title="${c.CaseID || 'Case ' + (i + 1)}">C${i + 1}</button>`
        ).join('');

        let unanswered = s.mcqs.filter((_, i) => !s.answers[s.mcqs[i].QuestionID]).length;

        return `<aside class="navigator" role="navigation" aria-label="Question navigator">
      <div class="nav-header">
        <h3>Navigator</h3>
        <span class="nav-progress">${current + 1}/${total}</span>
      </div>
      <div class="navgrid" role="list">${mcqBtns}${caseBtns}</div>
      <div class="legendrow">
        <span class="legend"><span class="sw ans"></span>Answered</span>
        <span class="legend"><span class="sw flag"></span>Flagged</span>
        <span class="legend"><span class="sw cur"></span>Current</span>
      </div>
      <div class="nav-stats">
        <span>Unanswered: <b>${unanswered}</b></span>
        <span>Flagged: <b>${Object.values(s.flags).filter(Boolean).length}</b></span>
      </div>
      <div class="nav-filters">
        <button class="nav-filter-btn active" data-navfilter="all" title="Show all items">All</button>
        <button class="nav-filter-btn" data-navfilter="unanswered" title="Show unanswered only">Unans</button>
        <button class="nav-filter-btn" data-navfilter="flagged" title="Show flagged only">Flag</button>
      </div>
      ${Object.keys(colMap).length ? '<div class="nav-filters nav-collections"><div class="nav-collections-label">Collections:</div>' + Object.keys(colMap).map(function (cid) {
          return '<button class="nav-filter-btn collection" data-navfilter="col-' + cid + '" title="Show items in ' + colMap[cid].name + '">' + colMap[cid].name + '</button>';
      }).join('') + '</div>' : ''}
      <button id="reviewScreen" class="secondary nav-review-btn">Review Screen</button>
    </aside>`;
    },

    bind() {
        document.querySelectorAll('[data-jump]').forEach(b => {
            b.onclick = () => {
                let idx = parseInt(b.dataset.jump);
                this.navigateTo(idx);
            };
        });
        document.querySelectorAll('[data-casejump]').forEach(b => {
            b.onclick = () => {
                let s = state.session;
                s.qIndex = s.mcqs.length;
                s.caseIndex = parseInt(b.dataset.casejump);
                ExamSessionManager.render();
            };
        });
        let r = $('reviewScreen');
        if (r) r.onclick = ExamSessionManager.renderReviewScreen.bind(ExamSessionManager);
        document.querySelectorAll('.nav-filter-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.nav-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                let f = btn.dataset.navfilter;
                document.querySelectorAll('.navgrid [data-jump]').forEach(el => {
                    if (f === 'all') el.style.display = '';
                    else if (f === 'unanswered') el.style.display = el.dataset.answered === '0' ? '' : 'none';
                    else if (f === 'flagged') el.style.display = el.dataset.flagged === '1' ? '' : 'none';
                    else if (f && f.indexOf('col-') === 0) {
                        var attr = 'data-' + f.replace(/([A-Z])/g, '-$1').toLowerCase();
                        el.style.display = el.getAttribute(attr) === '1' ? '' : 'none';
                    }
                });
            };
        });
    },

    navigateTo(idx) {
        let s = state.session;
        if (!s) return;
        if (idx < s.mcqs.length) {
            s.qIndex = idx;
            s.caseIndex = 0;
        } else {
            s.qIndex = s.mcqs.length;
            s.caseIndex = idx - s.mcqs.length;
        }
        ExamSessionManager.render();
    },

    startRecoverySprint(sourceSession) {
        this._lastSourceSession = sourceSession;
        var queue = AdaptiveReviewQueue.generate(sourceSession);
        var mcqEntries = queue.filter(function(e) { return e.type === 'mcq'; });
        mcqEntries.sort(function(a, b) { return b.score - a.score; });
        var sprintEntries = mcqEntries.slice(0, 15);
        var sprintMcqs = sprintEntries.map(function(e) { return e.item; });

        if (sprintMcqs.length === 0) {
            alert('No MCQ items available for a Recovery Sprint. Try completing a practice session with MCQs first.');
            return;
        }

        var topicSummary = {};
        sprintEntries.forEach(function(e) {
            var t = e.topic || 'General';
            topicSummary[t] = (topicSummary[t] || 0) + 1;
        });
        var sprintSections = [];
        var seenSec = {};
        sprintMcqs.forEach(function(q) { if (!seenSec[q.Section]) { seenSec[q.Section] = true; sprintSections.push(q.Section); } });

        state.session = {
            id: Date.now().toString(36),
            mode: 'recovery_sprint',
            sections: sprintSections,
            mcqs: sprintMcqs,
            cases: [],
            qIndex: 0,
            caseIndex: 0,
            caseTaskIndex: 0,
            caseExhibitIndex: 0,
            answers: {},
            flags: {},
            caseAnswers: {},
            caseFlags: {},
            struckChoices: {},
            confidence: {},
            guessed: {},
            start: Date.now(),
            duration: sprintMcqs.length * 108,
            completed: false,
            submitted: false,
            _mcqGatePassed: true,
            timerWarnings: [],
            paused: false,
            pausedElapsed: 0,
            tierCounts: {},
            tierPoolCounts: {},
            recoverySource: {
                sessionId: sourceSession.id,
                topicSummary: topicSummary,
                itemCount: sprintMcqs.length
            }
        };

        AnalyticsCollector.init(state.session);
        AnalyticsCollector.logEvent('session_start', { mode: 'recovery_sprint', mcqs: sprintMcqs.length, cases: 0 });
        SessionPersistence.clear();
        showView('sessionView');
        this.render();
        this.startTimer();
        this.startAutoSave();

        if (typeof MayTelemetry !== 'undefined') {
            MayTelemetry.trackAdoption({ recommendationType: 'Recovery Sprint', cardId: 'recovery-sprint-launch', topic: sprintEntries.length >= 10 ? 'Full Sprint' : 'Partial Sprint', presented: false, panelOpened: false, clicked: true, sessionStarted: true, completed: false, timestamp: new Date().toISOString() });
        }
    }
};

// ============================================================
// AdaptiveReviewQueue
// ============================================================
const AdaptiveReviewQueue = {
    generate(session) {
        let queue = [];

        session.mcqs.forEach((q, i) => {
            let ans = session.answers[q.QuestionID];
            let correct = scoreMCQ(q, ans) === 1;
            let flagged = !!session.flags[q.QuestionID];
            let confidence = session.confidence[q.QuestionID] || 0;
            let guessed = !!session.guessed[q.QuestionID];
            let score = 0;

            if (!correct && ans !== undefined) score += 5; // Incorrect
            if (guessed) score += 3; // Guessed
            if (confidence <= 2) score += 2; // Low confidence
            if (correct && confidence >= 4) score += 0; // Confident correct — no boost
            if (flagged) score += 1; // Marked

            queue.push({
                type: 'mcq',
                item: q,
                index: i,
                correct,
                ans,
                flagged,
                confidence,
                guessed,
                score,
                section: q.Section,
                topic: q.Topic || 'General',
                questionID: q.QuestionID
            });
        });

        session.cases.forEach(c => {
            c.Items.forEach((it, i) => {
                let key = ExamSessionManager.caseKey(c, i);
                let ans = session.caseAnswers[key];
                let correct = ExamSessionManager.correctCase(it, ans);
                let flagged = !!session.caseFlags[key];
                let score = 0;
                if (!correct && ans !== undefined) score += 5;
                if (flagged) score += 1;
                queue.push({
                    type: 'case',
                    item: it,
                    caseRef: c,
                    index: i,
                    correct,
                    ans,
                    flagged,
                    score,
                    section: c.SectionTags[0],
                    topic: it.Topic || 'Case item',
                    questionID: c.CaseID + '-Q' + (i + 1)
                });
            });
        });

        return queue.sort((a, b) => b.score - a.score);
    },

    render(queue, filter) {
        let filtered = queue;
        if (filter === 'missed') filtered = queue.filter(q => !q.correct);
        else if (filter === 'marked') filtered = queue.filter(q => q.flagged);
        else if (filter === 'priority') filtered = queue.filter(q => q.score > 0);

        let cards = filtered.map(item => {
            let q = item.item;
            let isCorrect = item.correct;
            let ansDisplay = '';
            let correctDisplay = '';
            let studentChoiceLetter = '';
            let correctLetter = '';

            if (item.type === 'mcq') {
                studentChoiceLetter = item.ans || '';
                correctLetter = q.CorrectChoice || '';
                ansDisplay = item.ans ? item.ans + '. ' + (q.Choices ? q.Choices[item.ans] : '') : 'No answer';
                correctDisplay = q.CorrectChoice + '. ' + (q.Choices ? q.Choices[q.CorrectChoice] : '');
            } else {
                if (q.Type === 'match' && item.ans && typeof item.ans === 'object') {
                    ansDisplay = Object.entries(item.ans).filter(([, v]) => v).map(([k, v]) => k + ' \u2192 ' + v).join('; ');
                    correctDisplay = Object.entries(q.Correct).map(([k, v]) => k + ' \u2192 ' + v).join('; ');
                } else if (Array.isArray(item.ans)) {
                    ansDisplay = item.ans.join('; ');
                    correctDisplay = Array.isArray(q.Correct) ? q.Correct.join('; ') : q.Correct;
                } else {
                    ansDisplay = item.ans || 'No response';
                    correctDisplay = q.Correct || '';
                }
            }

            let priorityLabel = item.score >= 5 ? 'High' : item.score >= 3 ? 'Medium' : 'Low';
            let studyLinks = q.StudyLinks || STUDY_LINKS[q.Topic] || STUDY_LINKS['Case-based practice'] || [];

            // S77 — Build structured review breakdown from explanation + wrong-choice data
            let explRaw = q.Explanation || q.ExplanationCorrect || '';
            let sections = extractExplanationSections(explRaw, item.topic);

            // Build distractor analysis (why each wrong answer is wrong)
            let distractorHtml = '';
            if (item.type === 'mcq' && q.Choices) {
                let wrongLetters = ['A','B','C','D'].filter(l => l !== correctLetter);
                let distractorParts = wrongLetters.map(l => {
                    let ewKey = 'ExplanationWrong' + l;
                    let ewText = q[ewKey] || '';
                    if (ewText && ewText.trim()) {
                        return `<div class="review-distractor-item"><strong>${l}.</strong> ${nl2br(ewText)}</div>`;
                    }
                    return '';
                }).filter(Boolean);
                if (distractorParts.length) {
                    distractorHtml = `<div class="review-distractors">${distractorParts.join('')}</div>`;
                }
            }

            // Get the ExplanationWrong text for the student's wrong answer specifically
            let yourWrongExplanation = '';
            if (!isCorrect && item.type === 'mcq' && studentChoiceLetter) {
                let ewKey = 'ExplanationWrong' + studentChoiceLetter;
                yourWrongExplanation = q[ewKey] || '';
            }

            return `<div class="feedback ${isCorrect ? 'good' : 'bad'} ${item.flagged ? 'marked' : ''}" data-priority="${item.score}">
          <div class="feedback-header">
            <span class="priority-badge ${priorityLabel.toLowerCase()}">${priorityLabel} priority (${item.score})</span>
            <span class="feedback-id">${item.questionID}</span>
            <span>${item.section} | ${item.topic}</span>
          </div>

          <div class="review-stem">${nl2br(q.Prompt || q.Stem || '')}</div>

          <div class="review-answers">
            <div class="review-answer-row ${isCorrect ? 'was-correct' : 'was-wrong'}">
              <span class="review-answer-label">Your answer</span>
              <span>${ansDisplay}</span>
            </div>
            ${!isCorrect ? `<div class="review-answer-row was-correct">
              <span class="review-answer-label">Correct answer</span>
              <span>${correctDisplay}</span>
            </div>` : ''}
          </div>

          <div class="review-breakdown">
            ${sections.tested ? `<div class="review-section review-tested">
              <div class="review-section-label">What was tested</div>
              <div class="review-section-body">${nl2br(sections.tested)}</div>
            </div>` : ''}

            ${sections.correct ? `<div class="review-section review-why-correct">
              <div class="review-section-label">${isCorrect ? 'Why this is correct' : 'Why the correct answer wins'}</div>
              <div class="review-section-body">${nl2br(sections.correct)}</div>
            </div>` : ''}

            ${!isCorrect && yourWrongExplanation ? `<div class="review-section review-why-wrong">
              <div class="review-section-label">Why your answer was wrong</div>
              <div class="review-section-body">${nl2br(yourWrongExplanation)}</div>
            </div>` : ''}

            ${distractorHtml ? `<div class="review-section review-section-collapsible collapsed">
              <div class="review-section-label" onclick="this.parentElement.classList.toggle('collapsed')">All wrong choices explained</div>
              <div class="review-section-body">${distractorHtml}</div>
            </div>` : ''}

            ${sections.takeaway ? `<div class="review-section review-takeaway">
              <div class="review-section-label">Exam takeaway</div>
              <div class="review-section-body">${nl2br(sections.takeaway)}</div>
            </div>` : ''}
          </div>

          ${item.confidence ? `<p style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;"><b>Confidence:</b> ${item.confidence}/5 ${item.guessed ? '(Guessed)' : ''}</p>` : ''}
          ${studyLinks.length ? `<div class="remediate"><b>Study:</b> ${studyLinks.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>` : ''}

          <div class="review-may-bridge">
            <button class="may-bridge-btn" onclick="document.querySelector('[data-view=\\'coachView\\']').click();May.setReviewContext(${JSON.stringify(item.questionID)},'${studentChoiceLetter}','${correctLetter}',${isCorrect});May._discussFromReview();" title="Open May coaching for this question">Discuss with May</button>
            ${!isCorrect ? `<button class="may-bridge-btn may-bridge-hint" onclick="document.querySelector('[data-view=\\'coachView\\']').click();May.setReviewContext(${JSON.stringify(item.questionID)},'${studentChoiceLetter}','${correctLetter}',${isCorrect});May.handleAction('mymistake');" title="Ask May what went wrong">What went wrong?</button>` : ''}
            <button class="may-bridge-btn may-bridge-hint" onclick="document.querySelector('[data-view=\\'coachView\\']').click();May.setReviewContext(${JSON.stringify(item.questionID)},'${studentChoiceLetter}','${correctLetter}',${isCorrect});May.handleAction('similar');" title="Ask May for a similar question">Try a similar one</button>
          </div>
        </div>`;
        }).join('');

        return cards || '<p class="small">No items match this filter.</p>';
    }
};

// ============================================================
// PerformanceAnalytics — Topic Breakdowns, Weak-Area Detection,
// Remediation Recommendations, Trend Tracking, and Difficulty
// Interpretation. All analysis is derived from simulator session
// data only; this is a study-planning tool, not a CMA diagnostic.
// ============================================================
const PerformanceAnalytics = {
    // ------------------------------------------------------------------
    // computeBreakdown — Full topic/section/pack breakdown from a scored
    // session. Returns MCQ and CBQ splits separately plus combined view.
    // ------------------------------------------------------------------
    computeBreakdown(session) {
        let byPack = {}, bySection = {}, byTopic = {};

        function ensure(pack, section, topic) {
            let packKey = pack || 'Unknown';
            let secKey = section || 'Unknown';
            let topKey = topic || 'Unclassified';
            if (!byPack[packKey]) byPack[packKey] = { mcq_n: 0, mcq_c: 0, cbq_n: 0, cbq_c: 0 };
            if (!bySection[secKey]) bySection[secKey] = { mcq_n: 0, mcq_c: 0, cbq_n: 0, cbq_c: 0, sectionName: section, pack: packKey };
            if (!byTopic[topKey]) byTopic[topKey] = { mcq_n: 0, mcq_c: 0, cbq_n: 0, cbq_c: 0, section: secKey, pack: packKey };
        }

        // MCQ breakdown
        (session.mcqs || []).forEach(q => {
            let pack = q.Pack || q.Part || (q.QuestionID ? q.QuestionID.split('-')[0] : 'Unknown');
            let section = q.Section || 'Unknown';
            let topic = q.Topic || 'Unclassified';
            ensure(pack, section, topic);
            let ok = scoreMCQ(q, session.answers[q.QuestionID]) === 1;
            byPack[pack].mcq_n++; if (ok) byPack[pack].mcq_c++;
            bySection[section].mcq_n++; if (ok) bySection[section].mcq_c++;
            byTopic[topic].mcq_n++; if (ok) byTopic[topic].mcq_c++;
        });

        // CBQ breakdown
        (session.cases || []).forEach(c => {
            let pack = c.CaseID ? c.CaseID.split('-')[0] : 'Unknown';
            let section = (c.SectionTags && c.SectionTags[0]) || 'Unknown';
            (c.Items || []).forEach((it, i) => {
                let topic = it.Topic || 'Case item';
                ensure(pack, section, topic);
                let ok = ExamSessionManager.correctCase(it, session.caseAnswers[ExamSessionManager.caseKey(c, i)]);
                byPack[pack].cbq_n++; if (ok) byPack[pack].cbq_c++;
                bySection[section].cbq_n++; if (ok) bySection[section].cbq_c++;
                byTopic[topic].cbq_n++; if (ok) byTopic[topic].cbq_c++;
            });
        });

        function pct(c, n) { return n > 0 ? Math.round(c / n * 100) : null; }
        function summarize(m) {
            let result = {};
            Object.entries(m).forEach(([k, v]) => {
                let tot_n = v.mcq_n + v.cbq_n;
                let tot_c = v.mcq_c + v.cbq_c;
                result[k] = {
                    mcq_n: v.mcq_n, mcq_c: v.mcq_c, mcqPct: pct(v.mcq_c, v.mcq_n),
                    cbq_n: v.cbq_n, cbq_c: v.cbq_c, cbqPct: pct(v.cbq_c, v.cbq_n),
                    tot_n, tot_c, totPct: pct(tot_c, tot_n),
                    section: v.sectionName, pack: v.pack
                };
            });
            return result;
        }

        return {
            byPack: summarize(byPack),
            bySection: summarize(bySection),
            byTopic: summarize(byTopic),
            _raw: { byPack, bySection, byTopic }
        };
    },

    // ------------------------------------------------------------------
    // identifyWeakAreas — Returns weakest and strongest areas based on
    // performance with minimum-attempt thresholds.
    // ------------------------------------------------------------------
    identifyWeakAreas(breakdown, options) {
        options = options || {};
        let minAttempts = options.minAttempts || 2;
        let topN = options.topN || 3;
        let detail = summary => {
            let entries = Object.entries(byTopic || breakdown.byTopic || {})
                .filter(([, v]) => v.tot_n >= minAttempts);
            if (entries.length === 0) entries = Object.entries(breakdown.byTopic || {});

            let weakest = entries
                .map(([k, v]) => ({ name: k, ...v }))
                .sort((a, b) => (a.totPct !== null && b.totPct !== null) ? a.totPct - b.totPct : (a.tot_c / Math.max(1, a.tot_n)) - (b.tot_c / Math.max(1, b.tot_n)));
            let strongest = [...weakest].reverse();

            // Also identify MCQ-specific and CBQ-specific weaknesses
            let mcqWeak = entries
                .filter(([, v]) => v.mcq_n >= minAttempts)
                .map(([k, v]) => ({ name: k, ...v }))
                .sort((a, b) => (a.mcqPct !== null && b.mcqPct !== null) ? a.mcqPct - b.mcqPct : 0);
            let cbqWeak = entries
                .filter(([, v]) => v.cbq_n >= minAttempts)
                .map(([k, v]) => ({ name: k, ...v }))
                .sort((a, b) => (a.cbqPct !== null && b.cbqPct !== null) ? a.cbqPct - b.cbqPct : 0);

            return {
                weakest: weakest.slice(0, topN),
                strongest: strongest.slice(0, topN),
                mcqWeakest: mcqWeak.slice(0, topN),
                cbqWeakest: cbqWeak.slice(0, topN),
                limitedData: entries.length === 0
            };
        };

        let byTopic = breakdown.byTopic;
        let bySection = breakdown.bySection;

        return {
            byTopic: detail(byTopic),
            bySection: detail(bySection)
        };
    },

    // ------------------------------------------------------------------
    // generateRemediationPlan — Rule-based study guidance from performance
    // evidence. Returns an array of recommendation objects.
    // ------------------------------------------------------------------
    generateRemediationPlan(breakdown, history, sc) {
        let recs = [];
        let top10pct = 0;
        let top10n = 0;
        let topMcqN = 0, topMcqC = 0;
        let topCbqN = 0, topCbqC = 0;

        Object.values(breakdown.byTopic || {}).forEach(v => {
            if (v.totPct !== null && v.tot_n >= 2) { top10pct += v.totPct; top10n++; }
            topMcqN += v.mcq_n; topMcqC += v.mcq_c;
            topCbqN += v.cbq_n; topCbqC += v.cbq_c;
        });

        let avgTopicPct = top10n > 0 ? Math.round(top10pct / top10n) : null;
        let mcqPctOverall = topMcqN > 0 ? Math.round(topMcqC / topMcqN * 100) : null;
        let cbqPctOverall = topCbqN > 0 ? Math.round(topCbqC / topCbqN * 100) : null;

        // Rule 1: CBQ materially below MCQ
        if (mcqPctOverall !== null && cbqPctOverall !== null && (mcqPctOverall - cbqPctOverall) >= 15) {
            recs.push({
                priority: 'high',
                category: 'CBQ gap',
                text: `CBQ performance (${cbqPctOverall}%) is materially below MCQ performance (${mcqPctOverall}%). Practice case decomposition and partial-credit retrieval. Focus on structured multi-part response patterns.`,
                evidence: { mcqPct: mcqPctOverall, cbqPct: cbqPctOverall }
            });
        }

        // Rule 2: Weak topics identified
        let weak = PerformanceAnalytics.identifyWeakAreas(breakdown, { minAttempts: 2, topN: 5 }).byTopic;
        if (weak && weak.weakest && weak.weakest.length > 0 && !weak.limitedData) {
            weak.weakest.forEach((w, i) => {
                if (w.totPct !== null && w.totPct < 60) {
                    let recType = 'concept review + timed drill';
                    if (w.cbqPct !== null && w.cbqPct < 50 && w.cbq_n >= 2) {
                        recType = 'case walkthrough + structured answer practice';
                    }
                    recs.push({
                        priority: i === 0 ? 'high' : 'medium',
                        category: 'Weak topic',
                        text: `"${w.name}" is below target at ${w.totPct}% (${w.tot_c}/${w.tot_n} attempts). Prioritize a 20-question timed drill and explanation review.`,
                        topic: w.name,
                        score: w.totPct,
                        evidence: { tot_n: w.tot_n, tot_c: w.tot_c, mcqPct: w.mcqPct, cbqPct: w.cbqPct }
                    });
                }
            });
        }

        // Rule 3: Near-threshold score
        if (sc && sc.scaled >= 340 && sc.scaled < 379) {
            recs.push({
                priority: 'high',
                category: 'Borderline score',
                text: `Your simulated score (${sc.scaled}/500) is near the 360 threshold. Take a full mixed simulation under time pressure to build consistency above the passing range.`,
                evidence: { scaled: sc.scaled }
            });
        }

        // Rule 4: MCQ gate not met
        if (sc && sc.mcqPct !== null && sc.mcqPct < 0.50) {
            recs.push({
                priority: 'high',
                category: 'MCQ gate',
                text: `MCQ gate not met (${Math.round(sc.mcqPct * 100)}%). Focus on concept mastery before attempting CBQs. Review foundational topics in your weakest sections.`,
                evidence: { mcqPct: Math.round(sc.mcqPct * 100) }
            });
        }

        // Rule 5: High volatility — check history
        if (history && history.length >= 3) {
            let scores = history.slice(0, 5).filter(h => h.scaledScore != null).map(h => h.scaledScore);
            if (scores.length >= 3) {
                let min = Math.min(...scores), max = Math.max(...scores);
                let range = max - min;
                if (range >= 50) {
                    recs.push({
                        priority: 'medium',
                        category: 'Score volatility',
                        text: `Your scores range from ${min} to ${max} (spread: ${range} points). Review explanations and error log before more volume — inconsistent results suggest concept gaps rather than exam readiness.`,
                        evidence: { min, max, range }
                    });
                }
            }
        }

        // Rule 6: Strongest areas — positive reinforcement
        recs.push({
            priority: 'info',
            category: 'Strategy',
            text: (sc && sc.passed ? 'You are performing in the passing range. Continue mixed practice to maintain readiness and close remaining weak areas.' : 'Focus on your weakest 2-3 topics first. Mastery in weak areas typically yields the largest score improvement.')
        });

        return recs;
    },

    // ------------------------------------------------------------------
    // summarizeHistoryTrend — Analyse history for trend direction, rolling
    // averages, best scores, MCQ gate pass rate, and difficulty mix.
    // ------------------------------------------------------------------
    summarizeHistoryTrend(history) {
        if (!history || history.length === 0) {
            return { hasData: false, message: 'No history available. Complete sessions to see trends.' };
        }

        let hasScaled = history.filter(h => h.scaledScore != null);
        let scores = hasScaled.map(h => h.scaledScore);
        let latest = hasScaled.length > 0 ? hasScaled[0].scaledScore : null;
        let best = scores.length > 0 ? Math.max(...scores) : null;

        // Rolling average over last N (max 5)
        let rollingN = Math.min(5, scores.length);
        let rollingAvg = rollingN > 0 ? Math.round(scores.slice(0, rollingN).reduce((s, v) => s + v, 0) / rollingN) : null;

        // Baseline: average of older sessions (skip most recent rollingN)
        let older = scores.slice(rollingN);
        let baselineAvg = older.length > 0 ? Math.round(older.reduce((s, v) => s + v, 0) / older.length) : null;
        let delta = (rollingAvg !== null && baselineAvg !== null) ? rollingAvg - baselineAvg : null;

        // Trend direction
        let direction = 'flat';
        if (delta !== null && delta >= 5) direction = 'improving';
        else if (delta !== null && delta <= -5) direction = 'declining';

        // MCQ gate pass rate
        let gateTotal = history.filter(h => h.mcqGate !== undefined).length;
        let gatePassed = history.filter(h => h.mcqGate === true).length;
        let gateRate = gateTotal > 0 ? Math.round(gatePassed / gateTotal * 100) : null;

        // Pass rate (360+)
        let passTotal = hasScaled.length;
        let passCount = hasScaled.filter(h => h.scaledScore >= 360).length;
        let passRate = passTotal > 0 ? Math.round(passCount / passTotal * 100) : null;

        // Difficulty mix
        let diffCounts = {};
        history.forEach(h => {
            let dp = h.difficultyPreset || 'standard';
            diffCounts[dp] = (diffCounts[dp] || 0) + 1;
        });

        // Difficulty-aware averages
        let diffAvgs = {};
        Object.keys(diffCounts).forEach(dp => {
            let subset = history.filter(h => (h.difficultyPreset || 'standard') === dp && h.scaledScore != null);
            if (subset.length > 0) {
                diffAvgs[dp] = Math.round(subset.reduce((s, h) => s + h.scaledScore, 0) / subset.length);
            }
        });

        return {
            hasData: true,
            totalSessions: history.length,
            latest,
            best,
            rollingAvg,
            baselineAvg,
            delta,
            direction,
            gateRate,
            gateTotal,
            passRate,
            passTotal,
            difficultyCounts: diffCounts,
            difficultyAvgs: diffAvgs,
            recentScores: scores.slice(0, 10)
        };
    },

    // ------------------------------------------------------------------
    // render helpers — Generate HTML for analytics cards
    // ------------------------------------------------------------------
    renderTopicBreakdown(breakdown, limit) {
        limit = limit || 10;
        let entries = Object.entries(breakdown.byTopic || {})
            .filter(([, v]) => v.tot_n > 0)
            .sort((a, b) => (a[1].totPct !== null && b[1].totPct !== null) ? a[1].totPct - b[1].totPct : 0)
            .slice(0, limit);

        if (entries.length === 0) return '<p class="small">No topic data available for this session.</p>';

        return entries.map(([topic, v]) => {
            let pct = v.totPct !== null ? v.totPct + '%' : 'n/a';
            let mcqInfo = v.mcq_n > 0 ? `MCQ: ${v.mcq_c}/${v.mcq_n}` : '';
            let cbqInfo = v.cbq_n > 0 ? `CBQ: ${v.cbq_c}/${v.cbq_n}` : '';
            let detail = [mcqInfo, cbqInfo].filter(Boolean).join(' | ');
            return `<div class="topic-tile"><b>${topic}</b><br>${pct} (${v.tot_c}/${v.tot_n})${detail ? '<br><span class="small">' + detail + '</span>' : ''}<div class="topic-bar"><div class="topic-fill" style="width:${v.totPct || 0}%"></div></div></div>`;
        }).join('');
    },

    renderWeakStrongCards(weak, strong, label) {
        let makeRow = (item, cls) => {
            let name = item.name || item[0] || 'Unknown';
            let pct = item.totPct != null ? item.totPct : (item[1] ? Math.round(item[1].tot_c / Math.max(1, item[1].tot_n) * 100) : null);
            return `<div class="scoretile" style="margin-bottom:6px;padding:8px;"><b>${name}</b><br><span class="${cls || ''}">${pct != null ? pct + '%' : 'n/a'}</span></div>`;
        };

        let weakHtml = weak && weak.length > 0
            ? weak.map(w => makeRow(w, 'bad')).join('')
            : '<p class="small">Insufficient data — complete more attempts for reliable analysis.</p>';

        let strongHtml = strong && strong.length > 0
            ? strong.map(w => makeRow(w, 'good')).join('')
            : '<p class="small">Insufficient data — complete more attempts for reliable analysis.</p>';

        return { weakHtml, strongHtml };
    },

    renderRemediationCard(plan) {
        if (!plan || plan.length === 0) return '<p class="small">Complete a scored session to receive targeted study recommendations.</p>';
        return plan.map(r => {
            let cls = r.priority === 'high' ? 'remediation-card-high' : r.priority === 'medium' ? 'remediation-card-med' : 'remediation-card-info';
            let icon = r.priority === 'high' ? '!' : r.priority === 'medium' ? '>' : 'i';
            return `<div class="remediation-card ${cls}"><span style="font-weight:700;margin-right:8px;">${icon}</span><strong>${r.category}:</strong> ${r.text}</div>`;
        }).join('');
    },

    renderTrendCard(trend) {
        if (!trend || !trend.hasData) return `<p class="small">${trend.message || 'No history available.'}</p>`;

        let dirLabel = trend.direction === 'improving' ? '↑ Improving' : trend.direction === 'declining' ? '↓ Declining' : '→ Flat';
        let dirCls = trend.direction === 'improving' ? 'good' : trend.direction === 'declining' ? 'bad' : '';

        return `<div>
          <div class="dashboard-grid">
            <div class="dashboard-card"><h3>Latest Score</h3><div class="dashboard-stat">${trend.latest != null ? trend.latest : 'N/A'}</div><p>/500</p></div>
            <div class="dashboard-card"><h3>Rolling Avg (${Math.min(5, trend.recentScores.length)})</h3><div class="dashboard-stat">${trend.rollingAvg != null ? trend.rollingAvg : 'N/A'}</div><p>/500</p></div>
            <div class="dashboard-card"><h3>Best Score</h3><div class="dashboard-stat">${trend.best != null ? trend.best : 'N/A'}</div><p>/500</p></div>
            <div class="dashboard-card"><h3>Direction</h3><div class="dashboard-stat ${dirCls}">${dirLabel}</div>${trend.delta != null ? '<p>Δ ' + (trend.delta >= 0 ? '+' : '') + trend.delta + ' pts</p>' : ''}</div>
          </div>
          ${trend.passRate != null ? `<p><b>Pass rate (360+):</b> ${trend.passRate}% (${trend.passTotal} sessions)</p>` : ''}
          ${trend.gateRate != null ? `<p><b>MCQ gate pass rate:</b> ${trend.gateRate}% (${trend.gateTotal} assessments)</p>` : ''}
        </div>`;
    },

    renderDifficultyComparison(trend) {
        if (!trend || !trend.hasData) return '';
        let avgs = trend.difficultyAvgs || {};
        let diffs = ['easier', 'standard', 'harder'];
        let parts = diffs.filter(d => avgs[d] != null).map(d =>
            `<div class="scoretile" style="margin-bottom:6px;padding:8px;"><b>${d.charAt(0).toUpperCase() + d.slice(1)} form</b><br>${avgs[d]} avg (${trend.difficultyCounts[d] || 0} sessions)</div>`
        );
        if (parts.length === 0) return '';
        return `<h3>Performance by Difficulty Form</h3><div class="scoregrid">${parts.join('')}</div><p class="small">Higher average on harder forms suggests exam readiness. A pronounced drop-off indicates topics needing targeted review.</p>`;
    }
};

// ============================================================
// ReadinessModel — Candidate-Level Readiness Band Computation
// ============================================================
const ReadinessModel = {
    BANDS: {
        BELOW_TARGET: 'BELOW_TARGET',
        APPROACHING_TARGET: 'APPROACHING_TARGET',
        AT_TARGET: 'AT_TARGET',
        ABOVE_TARGET: 'ABOVE_TARGET'
    },

    BAND_LABELS: {
        BELOW_TARGET: 'Below Target',
        APPROACHING_TARGET: 'Approaching Target',
        AT_TARGET: 'At Target',
        ABOVE_TARGET: 'Above Target'
    },

    BAND_DESCRIPTIONS: {
        BELOW_TARGET: 'You are building foundational knowledge. Focus on core concept review and MCQ drills to reach the CMA passing standard.',
        APPROACHING_TARGET: 'You are approaching the CMA passing standard. Maintain momentum with mixed format practice and targeted weak-area review.',
        AT_TARGET: 'You are performing at the CMA passing standard. Continue mixed-format practice and reinforce strong areas to build consistency.',
        ABOVE_TARGET: 'You are performing above the CMA passing standard. Maintain performance with harder forms and focus on error patterns.'
    },

    MIN_SESSIONS: 3,

    compute(history) {
        if (!history || history.length < this.MIN_SESSIONS) {
            return {
                hasData: false,
                message: `Not enough data yet — complete at least ${this.MIN_SESSIONS} full practice sessions to see your readiness assessment.`,
                minSessions: this.MIN_SESSIONS,
                sessionsCompleted: history ? history.length : 0
            };
        }

        let hasScaled = history.filter(h => h.scaledScore != null);
        let scores = hasScaled.map(h => h.scaledScore);
        let avgScore = scores.length > 0 ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : null;

        // Score by difficulty preset
        let diffAvgs = {};
        let diffCounts = {};
        hasScaled.forEach(h => {
            let dp = h.difficultyPreset || 'standard';
            if (!diffAvgs[dp]) { diffAvgs[dp] = []; diffCounts[dp] = 0; }
            diffAvgs[dp].push(h.scaledScore);
            diffCounts[dp]++;
        });
        let diffAverages = {};
        Object.keys(diffAvgs).forEach(dp => {
            diffAverages[dp] = Math.round(diffAvgs[dp].reduce((s, v) => s + v, 0) / diffAvgs[dp].length);
        });

        // MCQ gate pass rate
        let gateTotal = history.filter(h => h.mcqGate !== undefined).length;
        let gatePassed = history.filter(h => h.mcqGate === true).length;
        let gateRate = gateTotal > 0 ? Math.round(gatePassed / gateTotal * 100) : null;

        // CBQ average performance
        let cbqEntries = history.filter(h => h.cbqTotal > 0);
        let cbqTotalCorrect = cbqEntries.reduce((s, h) => s + (h.cbqCorrect || 0), 0);
        let cbqTotalItems = cbqEntries.reduce((s, h) => s + (h.cbqTotal || 0), 0);
        let cbqAvg = cbqTotalItems > 0 ? Math.round(cbqTotalCorrect / cbqTotalItems * 100) : null;

        // Recent trend (last 5 vs older)
        let recent = scores.slice(0, 5);
        let older = scores.slice(5);
        let recentAvg = recent.length > 0 ? Math.round(recent.reduce((s, v) => s + v, 0) / recent.length) : null;
        let olderAvg = older.length > 0 ? Math.round(older.reduce((s, v) => s + v, 0) / older.length) : null;
        let delta = (recentAvg !== null && olderAvg !== null) ? recentAvg - olderAvg : null;

        // Trend direction
        let trendDirection = 'flat';
        if (delta !== null && delta >= 5) trendDirection = 'improving';
        else if (delta !== null && delta <= -5) trendDirection = 'declining';

        // Pass rate (360+)
        let passCount = hasScaled.filter(h => h.scaledScore >= 360).length;
        let passRate = hasScaled.length > 0 ? Math.round(passCount / hasScaled.length * 100) : null;

        // Coverage: unique topics attempted across history
        let allTopics = new Set();
        history.forEach(h => {
            if (h.topicSnapshot) {
                Object.keys(h.topicSnapshot).forEach(t => allTopics.add(t));
            }
        });
        let topicCoverage = allTopics.size;

        // Determine band
        let band = this._determineBand({
            avgScore, gateRate, trendDirection, passRate, cbqAvg,
            recentAvg, diffAverages
        });

        return {
            hasData: true,
            band,
            bandLabel: this.BAND_LABELS[band],
            bandDescription: this.BAND_DESCRIPTIONS[band],
            metrics: {
                avgScore,
                gateRate,
                gatePassed,
                gateTotal,
                cbqAvg,
                recentAvg,
                olderAvg,
                delta,
                trendDirection,
                passRate,
                passCount,
                totalSessions: history.length,
                totalScored: hasScaled.length,
                topicCoverage,
                diffAverages,
                diffCounts,
                bestScore: scores.length > 0 ? Math.max(...scores) : null,
                latestScore: scores.length > 0 ? scores[0] : null,
                recentScores: scores.slice(0, 10)
            }
        };
    },

    _determineBand(m) {
        let { avgScore, gateRate, trendDirection, passRate, cbqAvg, recentAvg, diffAverages } = m;

        if (avgScore === null) return this.BANDS.BELOW_TARGET;

        if (avgScore >= 380
            && passRate >= 60
            && cbqAvg >= 60
            && (diffAverages.harder && diffAverages.harder >= 340 || !diffAverages.harder)
            && trendDirection !== 'declining') {
            return this.BANDS.ABOVE_TARGET;
        }

        if (avgScore >= 360
            && gateRate >= 70
            && cbqAvg >= 50) {
            return this.BANDS.AT_TARGET;
        }

        if (avgScore >= 320
            && gateRate >= 50
            && trendDirection === 'improving') {
            return this.BANDS.APPROACHING_TARGET;
        }

        if (avgScore >= 320
            && gateRate >= 50
            && trendDirection === 'flat'
            && (recentAvg || avgScore) >= 330) {
            return this.BANDS.APPROACHING_TARGET;
        }

        if (avgScore < 320 || gateRate < 40) {
            return this.BANDS.BELOW_TARGET;
        }

        return this.BANDS.APPROACHING_TARGET;
    },

    renderReadinessCard(readiness) {
        if (!readiness || !readiness.hasData) {
            return `<div class="dashboard-card" style="grid-column:1/-1;">
            <h3>Readiness Assessment</h3>
            <p class="small">${readiness ? readiness.message : 'No history available.'}</p>
          </div>`;
        }

        let m = readiness.metrics;
        let bandColors = {
            BELOW_TARGET: '#ef4444',
            APPROACHING_TARGET: '#f59e0b',
            AT_TARGET: '#22c55e',
            ABOVE_TARGET: '#3b82f6'
        };
        let bandColor = bandColors[readiness.band] || '#9ca3af';

        let diffDisplay = '';
        if (m.diffAverages && Object.keys(m.diffAverages).length > 0) {
            diffDisplay = Object.entries(m.diffAverages)
                .map(([dp, avg]) => `<span class="small">${dp.charAt(0).toUpperCase() + dp.slice(1)}: ${avg} avg</span>`)
                .join(' | ');
        }

        return `<div class="dashboard-card" style="grid-column:1/-1;border-left:4px solid ${bandColor};">
          <h3>Readiness Assessment</h3>
          <div class="dashboard-stat" style="color:${bandColor};">${readiness.bandLabel}</div>
          <p style="margin-top:8px;">${readiness.bandDescription}</p>
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;font-size:0.85rem;">
            <span><b>Avg Score:</b> ${m.avgScore != null ? m.avgScore : 'N/A'} / 500</span>
            <span><b>Gate Rate:</b> ${m.gateRate != null ? m.gateRate + '%' : 'N/A'}</span>
            <span><b>CBQ Avg:</b> ${m.cbqAvg != null ? m.cbqAvg + '%' : 'N/A'}</span>
            <span><b>Trend:</b> ${m.trendDirection === 'improving' ? '↑ Improving' : m.trendDirection === 'declining' ? '↓ Declining' : '→ Flat'} ${m.delta != null ? '(' + (m.delta >= 0 ? '+' : '') + m.delta + ')' : ''}</span>
            <span><b>Pass Rate:</b> ${m.passRate != null ? m.passRate + '%' : 'N/A'} (${m.passCount || 0}/${m.totalScored || 0})</span>
          </div>
          ${diffDisplay ? '<div style="margin-top:8px;font-size:0.8rem;color:#6b7280;">' + diffDisplay + '</div>' : ''}
          <p class="small" style="margin-top:8px;">Based on ${m.totalSessions} sessions, ${m.totalScored} scored. ${m.topicCoverage} unique topics covered.</p>
        </div>`;
    }
};

// ============================================================
// generateStudyPlan — Personalized Study Guidance from Readiness + Analytics
// ============================================================
function generateStudyPlan(readiness, history, latestScore, mcqPct, cbqPct) {
    if (!readiness || !readiness.hasData) {
        return {
            hasData: false,
            message: 'Not enough data to generate a study plan. Complete at least 3 full practice sessions.'
        };
    }

    let m = readiness.metrics;
    let band = readiness.band;

    // Identify weak and strong topics from history
    let allTopicData = {};
    history.forEach(h => {
        if (h.topicSnapshot) {
            Object.entries(h.topicSnapshot).forEach(([topic, data]) => {
                if (!allTopicData[topic]) allTopicData[topic] = { n: 0, c: 0, mcqPct: 0, cbqPct: 0 };
                allTopicData[topic].n += data.n || 0;
                allTopicData[topic].c += data.c || 0;
            });
        }
    });

    let topicEntries = Object.entries(allTopicData)
        .map(([name, v]) => ({ name, n: v.n, c: v.c, pct: v.n > 0 ? Math.round(v.c / v.n * 100) : null }))
        .filter(t => t.n >= 2);

    topicEntries.sort((a, b) => (a.pct !== null && b.pct !== null) ? a.pct - b.pct : 0);

    let weakTopics = topicEntries.filter(t => t.pct !== null && t.pct < 60).slice(0, 5);
    let strongTopics = topicEntries.filter(t => t.pct !== null && t.pct >= 75).slice(0, 3);

    let focusTopics = weakTopics.map(t => t.name);
    let reinforceTopics = strongTopics.map(t => t.name);

    // Difficulty strategy
    let difficultyStrategy;
    if (band === 'BELOW_TARGET') {
        difficultyStrategy = 'Focus on Standard difficulty forms until fundamentals improve. Introduce Harder forms only for topics where you score above 70%.';
    } else if (band === 'APPROACHING_TARGET') {
        difficultyStrategy = 'Mix Standard (60%) and Harder (40%) forms. Use Standard to build confidence and Harder to test readiness under pressure.';
    } else {
        difficultyStrategy = 'Emphasize Harder forms (70%) to simulate demanding exam conditions. Use Standard forms (30%) for warm-up and concept reinforcement.';
    }

    // Session type recommendations
    let sessionTypes;
    if (band === 'BELOW_TARGET') {
        sessionTypes = [
            { type: 'MCQ Drills', priority: 'high', description: 'Timed 20-question MCQ sets focused on your weakest topics. Review all explanations thoroughly.' },
            { type: 'CBQ Practice', priority: 'medium', description: '1 case study per week. Focus on structured response patterns and partial-credit strategy.' },
            { type: 'Full-Length Simulations', priority: 'low', description: '1 every 2 weeks to build exam stamina and track progress. Use Standard form.' }
        ];
    } else if (band === 'APPROACHING_TARGET') {
        sessionTypes = [
            { type: 'Full-Length Simulations', priority: 'high', description: '1-2 full simulations per week. Alternate Standard and Harder forms to gauge readiness.' },
            { type: 'CBQ Practice', priority: 'high', description: '2 case studies per week. Focus on decomposition and partial-credit retrieval.' },
            { type: 'MCQ Drills', priority: 'medium', description: 'Target your weakest 2-3 topics with 20-question timed drills.' }
        ];
    } else {
        sessionTypes = [
            { type: 'Full-Length Simulations', priority: 'high', description: '1-2 full simulations per week with Harder forms. Focus on time management and error review.' },
            { type: 'Error Log Review', priority: 'high', description: 'Review all marked and incorrect items from recent sessions. Identify pattern in your mistakes.' },
            { type: 'CBQ Maintenance', priority: 'medium', description: '1 case study per week to maintain integrated reasoning skills.' }
        ];
    }

    // Timeframe recommendation
    let timeframe;
    if (band === 'BELOW_TARGET') {
        timeframe = 'Over the next 4-6 weeks: build from foundational review to mixed practice.';
    } else if (band === 'APPROACHING_TARGET') {
        timeframe = 'Over the next 2-4 weeks: close remaining gaps and build exam-day readiness.';
    } else {
        timeframe = 'Over the next 1-2 weeks: maintain performance, refine weak areas, and build confidence.';
    }

    return {
        hasData: true,
        band,
        focusTopics,
        reinforceTopics,
        weakTopics,
        strongTopics,
        difficultyStrategy,
        sessionTypes,
        timeframe,
        summary: generateStudyPlan._generateSummary(band, focusTopics, sessionTypes)
    };
}

generateStudyPlan._generateSummary = function (band, focusTopics, sessionTypes) {
    if (band === 'BELOW_TARGET') {
        return `Prioritize concept mastery with MCQ drills on your weakest topics${focusTopics.length ? ': ' + focusTopics.slice(0, 3).join(', ') : ''}. Build toward full simulations as fundamentals improve.`;
    }
    if (band === 'APPROACHING_TARGET') {
        return `You're close to the passing standard. Mix full simulations with targeted CBQ practice${focusTopics.length ? '. Focus on: ' + focusTopics.slice(0, 3).join(', ') : ''}.`;
    }
    return `Maintain strong performance with Harder-form simulations and focused error review. Strengthen your${sessionTypes.filter(s => s.priority === 'high').map(s => s.type.toLowerCase()).join(' and ')}.`;
};

generateStudyPlan.renderStudyPlanCard = function (plan) {
    if (!plan || !plan.hasData) {
        return `<div class="dashboard-card" style="grid-column:1/-1;">
          <h3>Personalized Study Plan</h3>
          <p class="small">${plan ? plan.message : 'Complete more sessions to receive a personalized study plan.'}</p>
        </div>`;
    }

    let focusHtml = plan.focusTopics.length > 0
        ? '<div><strong>Focus Topics:</strong> ' + plan.focusTopics.map(t => `<span style="background:#fef2f2;border:1px solid #fca5a5;border-radius:4px;padding:2px 6px;margin:2px;display:inline-block;font-size:0.8rem;">${t}</span>`).join(' ') + '</div>'
        : '<p class="small">Complete more topic-specific sessions to identify focus areas.</p>';

    let reinforceHtml = plan.reinforceTopics.length > 0
        ? '<div style="margin-top:8px;"><strong>Reinforce:</strong> ' + plan.reinforceTopics.map(t => `<span style="background:#f0fdf4;border:1px solid #86efac;border-radius:4px;padding:2px 6px;margin:2px;display:inline-block;font-size:0.8rem;">${t}</span>`).join(' ') + '</div>'
        : '';

    let sessionHtml = plan.sessionTypes.map(s => {
        let icon = s.priority === 'high' ? '!' : s.priority === 'medium' ? '>' : 'i';
        return `<div style="margin:6px 0;padding:6px 10px;background:${s.priority === 'high' ? '#fef2f2' : s.priority === 'medium' ? '#fff7ed' : '#f0f9ff'};border-radius:4px;font-size:0.85rem;">
          <strong>${icon} ${s.type}</strong>: ${s.description}
        </div>`;
    }).join('');

    return `<div class="dashboard-card" style="grid-column:1/-1;">
      <h3>Personalized Study Plan</h3>
      <p style="margin-bottom:8px;"><strong>${plan.summary}</strong></p>
      <p class="small" style="margin-bottom:4px;"><strong>Timeframe:</strong> ${plan.timeframe}</p>
      ${focusHtml}
      ${reinforceHtml}
      <div style="margin-top:12px;"><strong>Session Plan:</strong></div>
      ${sessionHtml}
      <div style="margin-top:10px;padding:8px;background:#eff6ff;border-radius:4px;font-size:0.85rem;">
        <strong>Difficulty Strategy:</strong> ${plan.difficultyStrategy}
      </div>
    </div>`;
};

generateStudyPlan.renderResultSnippet = function (plan) {
    if (!plan || !plan.hasData) return '';
    return `<div style="margin:12px 0;padding:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;">
      <h3 style="margin-top:0;">Next Steps</h3>
      <p>${plan.summary}</p>
      <p class="small">Top session recommendations: ${plan.sessionTypes.filter(s => s.priority === 'high').map(s => s.type).join('; ')}. ${plan.timeframe}</p>
    </div>`;
};

// ============================================================
// PerformanceDashboard
// ============================================================
const PerformanceDashboard = {
    render() {
        let db = SessionPersistence.getDashboard();
        let sessions = db.sessions || [];
        let history = SessionPersistence.getHistory();

        let overallCorrect = 0, overallTotal = 0, overallCbqC = 0, overallCbqT = 0;
        let bySection = {};
        let byTopic = {};
        let trend = [];
        let gatePassed = 0, gateTotal = 0;
        let difficultyCounts = {};

        sessions.forEach(s => {
            overallCorrect += s.correct || 0;
            overallTotal += s.mcqs || 0;
            overallCbqC += s.cbqCorrect || 0;
            overallCbqT += s.cbqTotal || 0;
            trend.push({ date: s.date, accuracy: s.accuracy, scaledScore: s.scaledScore, mode: s.mode, mcqGate: s.mcqGate, difficultyPreset: s.difficultyPreset, passed: s.passed });
            if (s.mcqGate !== undefined) { gateTotal++; if (s.mcqGate) gatePassed++; }
            if (s.bySection) {
                Object.entries(s.bySection).forEach(([sec, v]) => {
                    if (!bySection[sec]) bySection[sec] = { n: 0, c: 0 };
                    bySection[sec].n += v.total || 0;
                    bySection[sec].c += v.correct || 0;
                });
            }
            let dp = s.difficultyPreset || 'standard';
            difficultyCounts[dp] = (difficultyCounts[dp] || 0) + 1;
        });

        let trendAnalysis = PerformanceAnalytics.summarizeHistoryTrend(history);
        let overallMcqPct = overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0;
        let overallCbqPct = overallCbqT > 0 ? Math.round((overallCbqC / overallCbqT) * 100) : null;

        // Accumulate topic data across sessions
        let allTopicData = {};
        history.forEach(h => {
            if (h.topicSnapshot) {
                Object.entries(h.topicSnapshot).forEach(([topic, data]) => {
                    if (!allTopicData[topic]) allTopicData[topic] = { n: 0, c: 0 };
                    allTopicData[topic].n += data.n || 0;
                    allTopicData[topic].c += data.c || 0;
                });
            }
        });

        let topicEntries = Object.entries(allTopicData)
            .filter(([, v]) => v.n >= 2)
            .sort((a, b) => (a[1].c / a[1].n) - (b[1].c / b[1].n));

        let weakestTopics = topicEntries.slice(0, 3);
        let strongestTopics = [...topicEntries].reverse().slice(0, 3);

        let sectionHtml = Object.entries(bySection).sort((a, b) => (a[1].c / a[1].n) - (b[1].c / b[1].n)).map(([sec, v]) =>
            `<div class="dashboard-section"><b>Section ${sec}: ${SECTION_INFO[sec] ? SECTION_INFO[sec].name : ''}</b><br>${v.c}/${v.n} (${Math.round(v.c / v.n * 100)}%)<div class="topic-bar"><div class="topic-fill" style="width:${Math.round(v.c / v.n * 100)}%"></div></div></div>`
        ).join('') || '<p>No section data yet. Complete a session to see section performance.</p>';

        let weakTopicHtml = weakestTopics.length > 0
            ? weakestTopics.map(([t, v]) => `<div class="dashboard-section"><b>${t}</b><br>${v.c}/${v.n} (${Math.round(v.c / v.n * 100)}%)<div class="topic-bar"><div class="topic-fill" style="background:#ef4444;width:${Math.round(v.c / v.n * 100)}%"></div></div></div>`).join('')
            : '<p class="small">Complete more sessions for reliable topic analysis.</p>';

        let strongTopicHtml = strongestTopics.length > 0
            ? strongestTopics.map(([t, v]) => `<div class="dashboard-section"><b>${t}</b><br>${v.c}/${v.n} (${Math.round(v.c / v.n * 100)}%)<div class="topic-bar"><div class="topic-fill" style="background:#22c55e;width:${Math.round(v.c / v.n * 100)}%"></div></div></div>`).join('')
            : '<p class="small">Complete more sessions for reliable topic analysis.</p>';

        let trendHtml = trend.length > 0 ? trend.slice(-10).map(t =>
            `<div class="trend-item"><span>${new Date(t.date).toLocaleDateString()}</span><span>Acc: ${Math.round((t.accuracy || 0) * 100)}%</span><span>Score: ${t.scaledScore || 'N/A'}</span><span class="small">${t.passed ? '✓ PASS' : ''} ${t.mcqGate === false ? 'GATE FAIL' : ''}</span></div>`
        ).join('') : '<p>Complete a session to see trends.</p>';

        let difficultyCompareHtml = PerformanceAnalytics.renderDifficultyComparison(trendAnalysis);

        // Readiness model and study plan
        let readiness = ReadinessModel.compute(history);

        // S112P — Unified learner record from MayAnalyticsBridge
        let unifiedRecord = null;
        if (typeof MayLearnerState !== 'undefined') {
            try { unifiedRecord = MayLearnerState.getUnifiedLearnerRecord(history); } catch (e) {}
        }
        PerformanceDashboard._unifiedRecord = unifiedRecord;

        // UX-2 — Domain Readiness Scores
        let domainScores = null;
        if (typeof MayLearnerState !== 'undefined') {
            try { domainScores = MayLearnerState.getDomainReadinessScores(); } catch (e) {}
        }

        let latestEntry = history.length > 0 ? history[0] : null;
        let studyPlan = generateStudyPlan(
            readiness,
            history,
            latestEntry ? latestEntry.scaledScore : null,
            latestEntry ? latestEntry.mcqPct : null,
            latestEntry ? latestEntry.casePct : null
        );

        let gateRateHtml = gateTotal > 0
            ? `<div class="dashboard-card"><h3>MCQ Gate Rate</h3><div class="dashboard-stat">${Math.round(gatePassed / gateTotal * 100)}%</div><p>${gatePassed}/${gateTotal} passed</p></div>`
            : '';

        $('dashboardView').innerHTML = `<div class="dashboard">
          <h2>Performance Dashboard</h2>
          <div class="dashboard-grid">
            <div class="dashboard-card"><h3>Overall MCQ Accuracy</h3><div class="dashboard-stat">${overallMcqPct}%</div><p>${overallCorrect}/${overallTotal} across ${sessions.length} session(s)</p></div>
            ${overallCbqPct !== null ? `<div class="dashboard-card"><h3>Overall CBQ Accuracy</h3><div class="dashboard-stat">${overallCbqPct}%</div><p>${overallCbqC}/${overallCbqT} tasks correct</p></div>` : ''}
            ${gateRateHtml}
            <div class="dashboard-card"><h3>Total Sessions</h3><div class="dashboard-stat">${sessions.length}</div><p>Practice sessions completed</p></div>
          </div>

          ${ReadinessModel.renderReadinessCard(readiness)}

          ${domainScores ? MayLearnerState.renderDomainReadinessCard(domainScores) : ''}

          ${generateStudyPlan.renderStudyPlanCard(studyPlan)}

          ${PerformanceAnalytics.renderTrendCard(trendAnalysis)}

          ${difficultyCompareHtml}

          <h3>Performance by Section (Weakest → Strongest)</h3>
          <div class="dashboard-sections">${sectionHtml}</div>

          <h3>Weakest & Strongest Topics</h3>
          <div class="scoregrid" style="grid-template-columns:1fr 1fr;">
            <div><div style="font-weight:600;color:#ef4444;margin-bottom:6px;">Weakest (≥2 attempts)</div>${weakTopicHtml}</div>
            <div><div style="font-weight:600;color:#22c55e;margin-bottom:6px;">Strongest</div>${strongTopicHtml}</div>
          </div>

          <h3>Recent Score Trend</h3>
          <div class="trend-list">${trendHtml}</div>

          <h3>Study Guidance</h3>
          <p class="small">Analytics and recommendations are based on simulator performance patterns and are intended for study planning — not official CMA diagnostics. Only the official CMA score report from the IMA confirms whether you have passed.</p>

          ${CmaScoringDisclaimer('compact')}
        </div>`;
    }
};

// ============================================================
// PromptGovernance — System prompt, evidence thresholds, and
// response templates for the local AI review coach. Defines what
// the agent may say and how it must qualify its claims.
// ============================================================
const PromptGovernance = {
    // ── System prompt for the Review Agent ─────────────
    SYSTEM_PROMPT: `You are the CMA Part 1 AI Review Coach. Your role is to help a CMA candidate understand their practice performance using only available session evidence.

RULES:
1. Use ONLY performance and history data provided to you. Never invent data.
2. Separate observed facts from hypotheses. Say "your data suggests" not "you are."
3. Be supportive but truthful. Never sugarcoat poor performance.
4. Prioritize actionable study advice over vague encouragement.
5. Never diagnose the user personally (e.g., "you have test anxiety").
6. Never fabricate trends from too little data — explicitly state when evidence is weak.
7. Distinguish clearly between evidence and inference.
8. When sample size is too small for a conclusion, say so.
9. Always cite the specific evidence behind each claim.
10. Never reference topics or question IDs not present in the provided data.`,

    // ── Evidence thresholds ────────────────────────────
    THRESHOLDS: {
        minSessionsForTrend: 3,
        minSessionsForStrongTrend: 5,
        minRepeatedMissesForPattern: 3,
        minAttemptsForTopicConfidence: 2,
        deltaForImproving: 5,
        deltaForDeclining: -5,
        weakThresholdPct: 60,
        strongThresholdPct: 80
    },

    // ── Confidence labels ──────────────────────────────
    confidenceLabel(sampleSize, threshold) {
        if (sampleSize >= threshold * 2) return { label: 'Strong evidence', cls: 'conf-high' };
        if (sampleSize >= threshold) return { label: 'Adequate evidence', cls: 'conf-med' };
        return { label: 'Limited evidence — more sessions needed', cls: 'conf-low' };
    },

    // ── Safety filter: topics to never claim ───────────
    safeTopic(topic) {
        if (!topic || topic === 'Unknown' || topic === 'Unclassified' || topic === 'General' || topic === 'Case item') return false;
        return true;
    },

    // ── Output contract — structured field definitions ──
    OUTPUT_CONTRACT: {
        summary: 'String — 1-3 sentence overview of session performance',
        top_weak_areas: 'Array<{topic, score, attempts, confidence}> — weakest topics by evidence',
        improving_areas: 'Array<{topic, trend, fromScore, toScore, confidence}> — areas with positive trend',
        worsening_areas: 'Array<{topic, trend, fromScore, toScore, confidence}> — areas with negative trend',
        marked_priority: 'Array<{questionID, topic, reason}> — marked questions to revisit first',
        missed_patterns: 'String — patterns in missed questions (topic, section, difficulty)',
        trend_direction: 'String — improving | flat | declining | insufficient_data',
        next_steps: 'Array<String> — actionable study recommendations',
        evidence_confidence: 'String — overall confidence in the analysis',
        supporting_metrics: 'Object — key numbers backing the analysis'
    }
};

// ============================================================
// ReviewCoach — Local AI-assisted study review agent. Analyses
// session history and current results to produce evidence-based
// coaching guidance. Designed as a local-first engine with an
// adapter layer for future LLM binding.
// ============================================================
const ReviewCoach = {
    // ── Local AI adapter (stubbed for now) ─────────────
    _adapter: {
        endpoint: null,
        enabled: false,
        async query(systemPrompt, dataContext, responseTemplate) {
            return null; // Stub — returns null to fall through to rule-based engine
        }
    },

    // ── Main entry: analyse current state ──────────────
    analyze(currentSession, history) {
        history = history || SessionPersistence.getHistory() || [];
        if (!history.length && !currentSession) {
            return { hasData: false, message: 'No session data available. Complete a practice session to receive coaching.' };
        }

        let sc = currentSession ? ExamSessionManager.practiceScores() : null;
        let breakdown = currentSession ? PerformanceAnalytics.computeBreakdown(currentSession) : null;
        let weaknesses = breakdown ? PerformanceAnalytics.identifyWeakAreas(breakdown, { minAttempts: 2, topN: 5 }) : null;
        let trend = PerformanceAnalytics.summarizeHistoryTrend(history);
        let readiness = ReadinessModel.compute(history);

        // ── Missed questions analysis ────────────────────
        let missedItems = [];
        let missedByTopic = {};
        let missedBySection = {};
        if (currentSession) {
            currentSession.mcqs.forEach(q => {
                let ans = currentSession.answers[q.QuestionID];
                if (ans !== undefined && scoreMCQ(q, ans) !== 1) {
                    missedItems.push({
                        questionID: q.QuestionID, topic: q.Topic || 'Unclassified',
                        section: q.Section, difficulty: q.Difficulty || 'Unknown',
                        cognitiveLevel: q.CognitiveLevel || 'Unknown'
                    });
                    let t = q.Topic || 'Unclassified';
                    missedByTopic[t] = (missedByTopic[t] || 0) + 1;
                    let s = q.Section || 'Unknown';
                    missedBySection[s] = (missedBySection[s] || 0) + 1;
                }
            });
            currentSession.cases.forEach(c => {
                c.Items.forEach((it, i) => {
                    let key = ExamSessionManager.caseKey(c, i);
                    let ans = currentSession.caseAnswers[key];
                    if (ans !== undefined && !ExamSessionManager.correctCase(it, ans)) {
                        missedItems.push({
                            questionID: c.CaseID + '-Q' + (i + 1), topic: it.Topic || 'Case item',
                            section: c.SectionTags[0], difficulty: it.Difficulty || 'Unknown',
                            cognitiveLevel: it.CognitiveLevel || 'Unknown'
                        });
                        let t = it.Topic || 'Case item';
                        missedByTopic[t] = (missedByTopic[t] || 0) + 1;
                        let s = c.SectionTags[0];
                        missedBySection[s] = (missedBySection[s] || 0) + 1;
                    }
                });
            });
        }

        // ── Marked questions ─────────────────────────────
        let markedItems = [];
        if (currentSession) {
            currentSession.mcqs.forEach(q => {
                if (currentSession.flags[q.QuestionID]) {
                    let ans = currentSession.answers[q.QuestionID];
                    markedItems.push({
                        questionID: q.QuestionID, topic: q.Topic || 'Unclassified',
                        section: q.Section, correct: ans !== undefined ? scoreMCQ(q, ans) === 1 : null,
                        difficulty: q.Difficulty || 'Unknown'
                    });
                }
            });
            currentSession.cases.forEach(c => {
                c.Items.forEach((it, i) => {
                    let key = ExamSessionManager.caseKey(c, i);
                    if (currentSession.caseFlags[key]) {
                        markedItems.push({
                            questionID: c.CaseID + '-Q' + (i + 1), topic: it.Topic || 'Case item',
                            section: c.SectionTags[0], correct: null,
                            difficulty: it.Difficulty || 'Unknown'
                        });
                    }
                });
            });
        }

        // ── Repeated-miss pattern detection ──────────────
        let repeatedMissTopics = Object.entries(missedByTopic)
            .filter(([, count]) => count >= PromptGovernance.THRESHOLDS.minRepeatedMissesForPattern)
            .sort((a, b) => b[1] - a[1])
            .map(([topic, count]) => ({ topic, count }));

        let repeatedMissSections = Object.entries(missedBySection)
            .sort((a, b) => b[1] - a[1])
            .map(([section, count]) => ({ section, count }));

        // ── Cross-session topic trends ───────────────────
        let topicTrends = this._computeTopicTrends(history);

        // ── CBQ vs MCQ gap analysis ──────────────────────
        let mcqCbqGap = null;
        if (sc && sc.mcqPct !== null && sc.casePct !== null) {
            let mcqPct = Math.round(sc.mcqPct * 100);
            let cbqPct = Math.round(sc.casePct * 100);
            if (mcqPct - cbqPct >= 15) {
                mcqCbqGap = { mcqPct, cbqPct, gap: mcqPct - cbqPct };
            }
        }

        // ── Difficulty-level weakness ────────────────────
        let difficultyWeakness = null;
        if (missedItems.length > 0) {
            let byDiff = {};
            missedItems.forEach(m => {
                let d = m.difficulty || 'Unknown';
                byDiff[d] = (byDiff[d] || 0) + 1;
            });
            let sorted = Object.entries(byDiff).sort((a, b) => b[1] - a[1]);
            if (sorted.length > 0 && sorted[0][1] > 3) {
                difficultyWeakness = { level: sorted[0][0], count: sorted[0][1], total: missedItems.length };
            }
        }

        // ── Next-steps generation ────────────────────────
        let nextSteps = this._generateNextSteps({
            sc, trend, readiness, weaknesses, repeatedMissTopics,
            mcqCbqGap, missedItems, markedItems, topicTrends, difficultyWeakness
        });

        return {
            hasData: true,
            currentSession: sc ? {
                scaledScore: sc.scaled, grade: sc.grade, passed: sc.passed,
                mcqPct: sc.mcqPct !== null ? Math.round(sc.mcqPct * 100) : null,
                casePct: sc.casePct !== null ? Math.round(sc.casePct * 100) : null,
                difficultyPreset: sc.difficultyPreset
            } : null,
            missedItems,
            missedByTopic,
            missedBySection,
            markedItems,
            repeatedMissTopics,
            repeatedMissSections,
            mcqCbqGap,
            difficultyWeakness,
            topicTrends,
            trend,
            readiness,
            breakdown,
            weaknesses,
            nextSteps,
            totalMissed: missedItems.length,
            totalMarked: markedItems.length,
            totalSessions: history.length,
            evidenceConfidence: history.length >= 3 ? 'Adequate' : 'Limited'
        };
    },

    // ── Cross-session topic trend computation ──────────
    _computeTopicTrends(history) {
        if (history.length < 2) return [];
        let topicScores = {};
        history.forEach((h, hi) => {
            if (!h.topicSnapshot) return;
            Object.entries(h.topicSnapshot).forEach(([topic, data]) => {
                if (!PromptGovernance.safeTopic(topic)) return;
                if (!topicScores[topic]) topicScores[topic] = [];
                topicScores[topic].push({ sessionIndex: hi, pct: data.pct, n: data.n, date: h.date });
            });
        });

        let trends = [];
        Object.entries(topicScores).forEach(([topic, points]) => {
            if (points.length < 2) return;
            points.sort((a, b) => a.sessionIndex - b.sessionIndex);
            let recent = points.slice(-3);
            let older = points.slice(0, -3);
            if (recent.length >= 2 && older.length >= 2) {
                let recentAvg = recent.reduce((s, p) => s + (p.pct || 0), 0) / recent.length;
                let olderAvg = older.reduce((s, p) => s + (p.pct || 0), 0) / older.length;
                let delta = recentAvg - olderAvg;
                let direction = 'flat';
                if (delta >= 10) direction = 'improving';
                else if (delta <= -10) direction = 'declining';
                trends.push({
                    topic, direction, delta: Math.round(delta),
                    recentAvg: Math.round(recentAvg), olderAvg: Math.round(olderAvg),
                    sessions: points.length
                });
            }
        });
        return trends;
    },

    // ── Generate next steps ───────────────────────────
    _generateNextSteps(ctx) {
        let steps = [];
        let { sc, trend, readiness, weaknesses, repeatedMissTopics, mcqCbqGap,
              missedItems, markedItems, topicTrends, difficultyWeakness } = ctx;

        if (repeatedMissTopics && repeatedMissTopics.length > 0) {
            let topics = repeatedMissTopics.slice(0, 3).map(t => t.topic).join(', ');
            steps.push(`Focus drill: The topics where you missed the most questions are: ${topics}. Create a 20-question set targeting these areas and review all explanations thoroughly.`);
        }

        if (mcqCbqGap) {
            steps.push(`CBQ gap: Your MCQ accuracy (${mcqCbqGap.mcqPct}%) is significantly higher than CBQ (${mcqCbqGap.cbqPct}%). Add 1-2 case study walkthroughs per session to strengthen integrated reasoning.`);
        }

        if (markedItems && markedItems.length >= 3) {
            let markedMissed = markedItems.filter(m => m.correct === false);
            if (markedMissed.length > 0) {
                steps.push(`Marked review: ${markedMissed.length} of your ${markedItems.length} marked questions were answered incorrectly. Revisit these first — the topics you flagged but got wrong signal where your confidence outran your understanding.`);
            } else if (markedItems.length >= 3) {
                steps.push(`Marked review: You flagged ${markedItems.length} questions for review. Prioritize re-reading their explanations before your next session.`);
            }
        }

        if (trend && trend.hasData && trend.direction === 'declining') {
            steps.push('Trend alert: Your recent scores are declining. Consider pausing timed exams and reviewing explanations for your last 2-3 sessions before taking another scored test.');
        }

        if (difficultyWeakness) {
            steps.push(`Difficulty focus: ${difficultyWeakness.count} of your ${difficultyWeakness.total} missed questions were rated "${difficultyWeakness.level}". Consider adjusting your difficulty slider and practicing at this level intentionally.`);
        }

        let decliningTopics = (topicTrends || []).filter(t => t.direction === 'declining');
        if (decliningTopics.length > 0) {
            let names = decliningTopics.slice(0, 3).map(t => t.topic).join(', ');
            steps.push(`Watch for backsliding: ${names} ${decliningTopics.length === 1 ? 'has' : 'have'} declining accuracy across recent sessions. Revisit these before your next attempt.`);
        }

        let improvingTopics = (topicTrends || []).filter(t => t.direction === 'improving');
        if (improvingTopics.length >= 2) {
            let names = improvingTopics.slice(0, 2).map(t => t.topic).join(' and ');
            steps.push(`Positive trend: You're improving in ${names}. Keep reinforcing with mixed drills but shift primary focus to weaker areas.`);
        }

        if (readiness && readiness.hasData) {
            let band = readiness.band;
            if (band === 'BELOW_TARGET') {
                steps.push('Readiness: You are building foundations. Focus on MCQ concept mastery before attempting full-length simulations.');
            } else if (band === 'APPROACHING_TARGET') {
                steps.push('Readiness: You are approaching the passing threshold. Mix full simulations with targeted weak-area drills.');
            } else if (band === 'AT_TARGET' || band === 'ABOVE_TARGET') {
                steps.push('Readiness: You are performing at or above target. Maintain with harder-form simulations and error-pattern review.');
            }
        }

        if (steps.length === 0) {
            steps.push('Complete more practice sessions with topic variety to receive targeted coaching recommendations.');
        }

        return steps;
    },

    // ── Render the AI Coach dashboard view ─────────────
    renderCoachView(analysis, compactMode) {
        if (!analysis || !analysis.hasData) {
            return `<div class="coach-empty">
                <h2>AI Review Coach</h2>
                <p>${(analysis && analysis.message) || 'Complete a practice session to receive AI-assisted review coaching.'}</p>
                <p class="small">The coach analyses your missed questions, marked items, topic trends, and session history to provide evidence-based study guidance.</p>
            </div>`;
        }

        let { missedItems, markedItems, repeatedMissTopics, repeatedMissSections,
              mcqCbqGap, difficultyWeakness, topicTrends, trend, nextSteps,
              currentSession, totalMissed, totalMarked, totalSessions, evidenceConfidence } = analysis;

        let confCls = evidenceConfidence === 'Adequate' ? 'conf-med' : 'conf-low';

        // ── What hurt your score most ──────────────────
        let hurtMostHtml = '';
        if (currentSession && currentSession.scaledScore != null) {
            let parts = [];
            if (repeatedMissTopics.length > 0) {
                parts.push(`<strong>Repeated misses</strong> in ${repeatedMissTopics.slice(0, 3).map(t => `<span class="topic-tag">${t.topic} (${t.count})</span>`).join(', ')}`);
            }
            if (mcqCbqGap) {
                parts.push(`<strong>CBQ gap:</strong> ${mcqCbqGap.cbqPct}% vs ${mcqCbqGap.mcqPct}% MCQ (${mcqCbqGap.gap}pt spread)`);
            }
            if (difficultyWeakness) {
                parts.push(`<strong>Difficulty:</strong> ${difficultyWeakness.count} misses at "${difficultyWeakness.level}" level`);
            }
            hurtMostHtml = parts.length > 0
                ? `<div class="coach-card coach-warning"><h4>What Hurt Your Score Most</h4>${parts.map(p => `<p>${p}</p>`).join('')}</div>`
                : `<div class="coach-card"><h4>What Hurt Your Score Most</h4><p class="small">Not enough data to identify specific score drivers. Complete more questions across varied topics.</p></div>`;
        }

        // ── Improving areas ────────────────────────────
        let improving = (topicTrends || []).filter(t => t.direction === 'improving');
        let improvingHtml = improving.length > 0
            ? `<div class="coach-card coach-positive"><h4>Areas Improving</h4>${improving.slice(0, 5).map(t => {
                let conf = PromptGovernance.confidenceLabel(t.sessions, 3);
                return `<div class="trend-item"><span class="trend-arrow up">+${t.delta}%</span> <strong>${t.topic}</strong> <span class="trend-detail">${t.olderAvg}% → ${t.recentAvg}% (${t.sessions} sessions)</span> <span class="conf-badge ${conf.cls}">${conf.label}</span></div>`;
            }).join('')}</div>`
            : `<div class="coach-card"><h4>Areas Improving</h4><p class="small">No clear improvement trends yet. Complete more sessions on consistent topics to detect progress.</p></div>`;

        // ── Worsening areas ────────────────────────────
        let worsening = (topicTrends || []).filter(t => t.direction === 'declining');
        let worseningHtml = worsening.length > 0
            ? `<div class="coach-card coach-warning"><h4>Areas Getting Worse</h4>${worsening.slice(0, 5).map(t => {
                let conf = PromptGovernance.confidenceLabel(t.sessions, 3);
                return `<div class="trend-item"><span class="trend-arrow down">${t.delta}%</span> <strong>${t.topic}</strong> <span class="trend-detail">${t.olderAvg}% → ${t.recentAvg}% (${t.sessions} sessions)</span> <span class="conf-badge ${conf.cls}">${conf.label}</span></div>`;
            }).join('')}</div>`
            : '';

        // ── Trend direction chip ────────────────────────
        let trendChip = '';
        if (trend && trend.hasData) {
            let dir = trend.direction;
            let icon = dir === 'improving' ? '\u2191' : dir === 'declining' ? '\u2193' : '\u2192';
            let label = dir === 'improving' ? 'Improving' : dir === 'declining' ? 'Declining' : 'Flat';
            let cls = dir === 'improving' ? 'trend-improving' : dir === 'declining' ? 'trend-declining' : 'trend-flat';
            trendChip = `<span class="trend-chip ${cls}">${icon} ${label} (rolling avg: ${trend.rollingAvg != null ? trend.rollingAvg : 'N/A'})</span>`;
        }

        // ── Marked priority ────────────────────────────
        let markedPrioHtml = '';
        if (markedItems.length > 0) {
            let missedMarked = markedItems.filter(m => m.correct === false);
            let correctMarked = markedItems.filter(m => m.correct === true);
            markedPrioHtml = `<div class="coach-card"><h4>Marked Questions (${markedItems.length} total)</h4>
                ${missedMarked.length > 0 ? `<p><strong>${missedMarked.length} marked AND missed</strong> — highest priority to review. Topics: ${[...new Set(missedMarked.map(m => m.topic))].slice(0, 5).join(', ')}</p>` : ''}
                ${correctMarked.length > 0 ? `<p><strong>${correctMarked.length} marked but correct</strong> — good instinct to flag. Review to reinforce understanding.</p>` : ''}
            </div>`;
        }

        // ── Next steps ─────────────────────────────────
        let nextStepsHtml = nextSteps && nextSteps.length > 0
            ? `<div class="coach-card coach-action"><h4>Recommended Next Steps</h4><ol>${nextSteps.map(s => `<li>${s}</li>`).join('')}</ol></div>`
            : '';

        // ── Study focus for next 3 sessions ─────────────
        let studyFocusHtml = '';
        if (repeatedMissTopics.length > 0) {
            let focusTopics = repeatedMissTopics.slice(0, 3);
            studyFocusHtml = `<div class="coach-card"><h4>Study Focus — Next 3 Sessions</h4>
                <p><strong>Session 1:</strong> Drill ${focusTopics[0].topic} (${focusTopics[0].count} misses). Timed 20-question set + full explanation review.</p>
                ${focusTopics.length > 1 ? `<p><strong>Session 2:</strong> ${mcqCbqGap ? 'CBQ walkthrough in ' + focusTopics[Math.min(1, focusTopics.length - 1)].topic + '.' : 'Drill ' + focusTopics[1].topic + ' (20 questions).'}</p>` : ''}
                ${focusTopics.length > 2 ? `<p><strong>Session 3:</strong> Mixed review: ${focusTopics.slice(0, 3).map(t => t.topic).join(', ')}. Full-length simulation practice.</p>` : `<p><strong>Session 3:</strong> Mixed review with case study integration.</p>`}
            </div>`;
        }

        // ── Likely learning deficiency patterns ─────────
        let patternHtml = '';
        let patterns = [];
        if (difficultyWeakness) {
            patterns.push(`<strong>Difficulty-level gap:</strong> ${difficultyWeakness.count}/${difficultyWeakness.total} misses at "${difficultyWeakness.level}" level suggests calibration to this difficulty tier needs reinforcement.`);
        }
        if (mcqCbqGap) {
            patterns.push(`<strong>CBQ integration weakness:</strong> ${mcqCbqGap.gap}pt gap between MCQ and CBQ suggests strong concept recall but weaker case decomposition and multi-part reasoning.`);
        }
        if (topicTrends && topicTrends.filter(t => t.direction === 'declining').length >= 3) {
            patterns.push(`<strong>Broad decline pattern:</strong> ${topicTrends.filter(t => t.direction === 'declining').length} topics trending down. May indicate exam fatigue, rushed sessions, or insufficient explanation review between attempts.`);
        }
        if (repeatedMissSections.length > 0 && repeatedMissSections[0].count >= 3) {
            let sec = repeatedMissSections[0];
            patterns.push(`<strong>Section ${sec.section} weakness:</strong> ${sec.count} repeated misses in Section ${sec.section} (${SECTION_INFO[sec.section] ? SECTION_INFO[sec.section].name : ''}). This section represents ${SECTION_INFO[sec.section] ? SECTION_INFO[sec.section].weight : '?'}% of the exam — prioritize accordingly.`);
        }
        if (patterns.length > 0) {
            patternHtml = `<div class="coach-card"><h4>Likely Learning Patterns</h4>${patterns.map(p => `<p>${p}</p>`).join('')}</div>`;
        }

        let compactClass = compactMode ? ' coach-compact' : '';

        return `<div class="coach-panel${compactClass}">
            <h2>AI Review Coach ${trendChip}</h2>
            <div class="coach-meta">
                <span>${totalSessions} session${totalSessions !== 1 ? 's' : ''} analysed</span>
                ${currentSession ? `<span>Latest: ${currentSession.scaledScore}/500 (${currentSession.grade || 'N/A'})</span>` : ''}
                <span class="conf-badge ${confCls}">${evidenceConfidence} evidence</span>
            </div>

            <div class="coach-grid">
                ${hurtMostHtml}
                ${improvingHtml}
                ${worseningHtml}
                ${markedPrioHtml}
                ${patternHtml}
                ${studyFocusHtml}
            </div>

            ${nextStepsHtml}

            <div class="coach-disclaimer">
                <p class="small">AI coaching is based on simulator session data only. This is a study aid — not an official CMA diagnostic. Scores are modelled approximations; only the official IMA score report confirms exam results. Evidence confidence scales with the number of completed sessions.</p>
            </div>
        </div>`;
    },

    // ── Render a compact post-session review card ──────
    renderPostSessionCard() {
        let s = state.session;
        if (!s || !s.completed) return '';
        let history = SessionPersistence.getHistory() || [];
        let analysis = this.analyze(s, history);
        if (!analysis.hasData) return '';

        let { repeatedMissTopics, mcqCbqGap, nextSteps, currentSession, totalMissed, totalMarked, trend } = analysis;

        // Quick post-session highlights
        let highlightHtml = '';
        if (currentSession && currentSession.scaledScore != null) {
            let gradeNote = currentSession.passed ? 'Above passing threshold' : 'Below passing threshold';
            let warning = currentSession.mcqPct !== null && currentSession.mcqPct < 50 ? ' <span class="conf-badge conf-low">MCQ gate not met</span>' : '';
            highlightHtml = `<p><strong>${currentSession.scaledScore}/500</strong> — ${gradeNote}${warning}</p>`;
        }

        let missedHtml = totalMissed > 0
            ? `<p><strong>${totalMissed} questions missed.</strong> ${repeatedMissTopics.length > 0 ? 'Top weak areas: ' + repeatedMissTopics.slice(0, 3).map(t => t.topic).join(', ') + '.' : ''}</p>`
            : '';

        let markedHtml = totalMarked > 0
            ? `<p><strong>${totalMarked} questions marked</strong> for review.</p>`
            : '';

        let nextHtml = nextSteps && nextSteps.length > 0
            ? `<p><strong>Next:</strong> ${nextSteps[0]}</p>`
            : '';

        return `<div class="coach-card coach-post-session">
            <h4>May — Quick Review</h4>
            ${highlightHtml}
            ${missedHtml}
            ${markedHtml}
            ${nextHtml}
            <p class="small"><a href="#" onclick="showView('coachView'); if(typeof May!=='undefined'){May.startSessionReview();May.renderView();}else ReviewCoach.renderFullCoach(); return false;">Review with May \u2192</a></p>
        </div>`;
    },

    // ── Render the full coach view ─────────────────────
    renderFullCoach() {
        let history = SessionPersistence.getHistory() || [];
        let s = state.session;
        let analysis = this.analyze(s, history);
        document.getElementById('coachView').innerHTML = this.renderCoachView(analysis, false);
    }
};

// ============================================================
// MAY-028: Recommendation card click attribution helper
// ============================================================
window._mcc = function(t, c, tp) {
    if (typeof MayTelemetry !== 'undefined') {
        MayTelemetry.trackAdoption({
            recommendationType: t,
            cardId: c,
            topic: tp || '',
            presented: false,
            panelOpened: false,
            clicked: true,
            sessionStarted: false,
            completed: false,
            timestamp: new Date().toISOString()
        });
    }
    window._mayAttributionCard = {
        recommendationType: t,
        cardId: c,
        topic: tp || '',
        clickedAt: new Date().toISOString()
    };
};

// ============================================================
// S114P: Archetype coaching action click handler
// ============================================================
window._mac = function(actionType, handlerName) {
    if (typeof MayTelemetry !== 'undefined') {
        MayTelemetry.trackAdoption({
            recommendationType: 'Archetype Action',
            cardId: 'action-' + actionType,
            topic: handlerName || '',
            presented: false,
            panelOpened: false,
            clicked: true,
            sessionStarted: false,
            completed: false,
            timestamp: new Date().toISOString()
        });
    }
    switch (handlerName) {
        case 'startFoundations':
            showView('setupView');
            break;
        case 'focusWeakest':
            showView('coachView');
            if (typeof May !== 'undefined') { May.renderView(); }
            break;
        case 'launchRecoverySprint':
            showView('coachView');
            if (typeof May !== 'undefined') { May.renderView(); }
            break;
        case 'continueRecovery':
            showView('coachView');
            if (typeof May !== 'undefined') { May.renderView(); }
            break;
        case 'increaseDifficulty':
            showView('settingsView');
            break;
        case 'runTimedMixedPractice':
            if (typeof quickStart === 'function') { quickStart('mixed'); }
            break;
        default: break;
    }
};

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    CalculatorEngine.render();
    renderValidation();

    // S112 — Initialize unified learner profile and detect legacy data
    CMAProfileManager.init();

    // S124 — Render Home view on initial load
    renderHomeView();

    // S112 — Show migration dialog if legacy data exists
    if (window._cmaMigrationNeeded) {
        setTimeout(function () {
            CMAProfileManager.showMigrationDialog();
        }, 500);
    }

    ExamSessionManager.render();
    renderCatalog();
    ExamSessionManager.renderHistory();
    updateTimeEstimate();

    // S130 — Render Study view tab content
    renderStudyView();

    // UX-4: Inject bookmark collections panel into left panel
    (function () {
        var setupPanel = document.querySelector('.setup-panel');
        if (setupPanel) {
            var bcPanel = document.createElement('div');
            bcPanel.id = 'bookmarkCollectionsPanel';
            bcPanel.className = 'collections-panel';
            setupPanel.appendChild(bcPanel);
            renderBookmarkCollections();
        }
    })();

    // Check for saved session
    let hasSavedSession = false;
    try { hasSavedSession = !!localStorage.getItem(SessionPersistence.SAVE_KEY); } catch (e) {}
    if (hasSavedSession) {
        showSaveStatus('Restore available', 'restore-available');
    }
    if (SessionPersistence.restore()) {
        let s = state.session;
        let timeStr = s ? fmt(Math.floor((Date.now() - s.start) / 1000)) : '';
        let modal = document.createElement('div');
        modal.className = 'recovery-modal';
        modal.innerHTML =
            '<div class="recovery-modal-backdrop"></div>' +
            '<div class="recovery-modal-dialog" role="dialog" aria-labelledby="recoveryTitle">' +
            '<h2 id="recoveryTitle">Unfinished Session Found</h2>' +
            (s ? '<p>You have an in-progress <strong>' + (s.mode === 'full' ? 'exam' : s.mode === 'recovery_sprint' ? 'recovery sprint' : 'practice') + ' session</strong> from <strong>' + timeStr + '</strong> ago.</p>' : '<p>You have an in-progress session.</p>') +
            '<p class="small">Your progress is automatically saved. You can resume where you left off.</p>' +
            '<div class="recovery-modal-actions">' +
            '<button id="recoveryResume" class="primary">Resume Session</button>' +
            '<button id="recoveryDiscard" class="secondary">Discard &amp; Start New</button>' +
            '</div></div>';
        document.body.appendChild(modal);
        $('recoveryResume').onclick = () => {
            modal.remove();
            persistSaveStatus('Your previous exam session was successfully restored. All progress has been recovered.', 'recovery');
            // W1-A — Re-derive exam-integrity mode from the restored session so a
            // resumed Full Exam (or real-conditions session) keeps non-exam UI hidden.
            if (isExamIntegrityMode(state.session)) {
                document.body.classList.add('exam-integrity-mode');
            } else {
                document.body.classList.remove('exam-integrity-mode');
            }
            document.body.classList.add('session-active');
            showView('sessionView');
            ExamSessionManager.render();
            ExamSessionManager.startTimer();
            ExamSessionManager.startAutoSave();
        };
        $('recoveryDiscard').onclick = () => {
            modal.remove();
            SessionPersistence.clear();
            showSaveStatus('', '');
        };
    }

    $('sessionForm').onsubmit = e => {
        // Hide May companion card and floating panel when session starts
        if (typeof May !== 'undefined') {
            let card = document.getElementById('mayCompanionCard');
            if (card) card.remove();
        }
        var floatPanel = document.getElementById('mayFloatingPanel');
        if (floatPanel) floatPanel.remove();
        if (typeof MayTelemetry !== 'undefined') {
            var _attrib = window._mayAttributionCard;
            MayTelemetry.trackAdoption({ recommendationType: 'Session', cardId: 'session-start', topic: '', presented: false, panelOpened: false, clicked: false, sessionStarted: true, completed: false, attributionCardId: (_attrib && _attrib.cardId) || null, attributionCardType: (_attrib && _attrib.recommendationType) || null, timestamp: new Date().toISOString() });
        }
        ExamSessionManager.start(e);
    };
    // S107: Wrap Start Session button in sticky container for always-visible CTA
    (function() {
        let submitBtn = document.querySelector('#sessionForm button[type="submit"]');
        if (submitBtn && !submitBtn.parentElement.classList.contains('setup-submit-sticky')) {
            let wrapper = document.createElement('div');
            wrapper.className = 'setup-submit-sticky';
            submitBtn.parentElement.insertBefore(wrapper, submitBtn);
            wrapper.appendChild(submitBtn);
        }
    })();
    document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
        showView(t.dataset.view);
        if (t.dataset.view === 'homeView') renderHomeView();
        if (t.dataset.view === 'studyView') renderStudyView();
        if (t.dataset.view === 'dashboardView') PerformanceDashboard.render();
        if (t.dataset.view === 'settingsView') renderSettingsView();
        if (t.dataset.view === 'operationsView') renderOperationsView();
        if (t.dataset.view === 'helpView') renderHelpCenter();
        if (t.dataset.view === 'coachView') {
            // S130 — Compact May: show collapsed initially
            if (typeof May !== 'undefined') May._renderCompactCoach();
            else ReviewCoach.renderFullCoach();
        }
        if (t.dataset.view === 'sessionView' || t.dataset.view === 'studyView') {
            // Re-show May companion card when returning to landing/study view (no active session)
            if (typeof May !== 'undefined' && (!state.session || state.session.completed)) {
                sessionStorage.removeItem('mayCompanionDismissed');
                May._injectMayCompanionCard();
            }
        } else {
            // Hide companion card when switching to non-landing views
            let card = document.getElementById('mayCompanionCard');
            if (card) card.remove();
        }
    });
    ['mode', 'mcqCount', 'caseCount', 'weighted', 'difficultySlider', 'realConditions'].forEach(id => {
        let el = $(id);
        if (el) el.onchange = updateTimeEstimate;
    });
    let slider = $('difficultySlider');
    if (slider) slider.oninput = updateSliderNote;
    document.querySelectorAll('input[name="section"]').forEach(x => x.onchange = updateTimeEstimate);
    document.querySelectorAll('input[name="pack"]').forEach(x => x.onchange = updateTimeEstimate);

    // Keyboard shortcuts for navigation
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey) return;
        let active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) return;
        if (!state.session || state.session.completed) return;
        state.session.mcqs = state.session.mcqs || [];
        state.session.cases = state.session.cases || [];
        if (e.key === 'ArrowRight' || e.key === 'n') {
            e.preventDefault();
            let s = state.session;
            if (s.qIndex < s.mcqs.length + s.cases.length - 1) { s.qIndex++; ExamSessionManager.render(); }
        }
        if (e.key === 'ArrowLeft' || e.key === 'p') {
            e.preventDefault();
            let s = state.session;
            if (s.qIndex > 0) { s.qIndex--; ExamSessionManager.render(); }
        }
        if (e.key === 'm') {
            e.preventDefault();
            let s = state.session;
            if (s.qIndex < s.mcqs.length) {
                let qid = s.mcqs[s.qIndex].QuestionID;
                s.flags[qid] = !s.flags[qid];
                SessionPersistence.saveImmediate();
                SessionPersistence.logAction('flag ' + qid + '=' + s.flags[qid]);
                ExamSessionManager.render();
            }
        }
        let k = e.key.toUpperCase();
        if (k === 'A' || k === 'B' || k === 'C' || k === 'D') {
            let s = state.session;
            if (s.qIndex < s.mcqs.length && s.qIndex < (s.mcqs || []).length) {
                e.preventDefault();
                let q = s.mcqs[s.qIndex];
                s.answers[q.QuestionID] = k;
                SessionPersistence.saveImmediate();
                SessionPersistence.logAction('keyboard-answer ' + q.QuestionID + '=' + k);
                AnalyticsCollector.endQuestion(q.QuestionID);
                let isCorrect = scoreMCQ(q, k) === 1;
                AnalyticsCollector.recordAnswer(q.QuestionID, isCorrect, s.confidence[q.QuestionID], s.guessed[q.QuestionID]);
                AnalyticsCollector.startQuestion(q.QuestionID);
                if (typeof May !== 'undefined') {
                    May.recordLiveAttempt(q, k, isCorrect, May.context._liveHintCount || 0, false, 0, s.confidence[q.QuestionID]);
                    May.showPostAnswerFeedback(q, isCorrect);
                }
                ExamSessionManager.render();
            }
        }
    });
});

// ---- Legacy functions preserved for compatibility ----
function updateTimeEstimate() {
    let mode = $('mode').value;
    let mcqs = mode === 'case' ? 0 : (mode === 'full' ? 100 : parseInt($('mcqCount').value));
    let cases = mode === 'mcq' ? 0 : (mode === 'full' ? 2 : parseInt($('caseCount').value));
    let duration = mode === 'full' ? FULL_EXAM_SECONDS : (mcqs * 108 + cases * 1800);
    $('timeEstimate').textContent = `${fmt(duration)} for ${mcqs} MCQs and ${cases} case set${cases === 1 ? '' : 's'}`;
    $('countField').style.display = (mode === 'case' || mode === 'full') ? 'none' : 'grid';
    $('caseCountField').style.display = (mode === 'mcq' || mode === 'full') ? 'none' : 'grid';
    let diffField = $('difficultyField');
    if (diffField) diffField.style.display = mode === 'full' ? 'none' : 'grid';
    let overrideNote = $('fullOverrideNote');
    if (overrideNote) overrideNote.style.display = mode === 'full' ? 'block' : 'none';
    updateSliderNote();
    // Show blueprint select only for blueprint mode
    let bpField = $('blueprintField');
    if (bpField) bpField.style.display = mode === 'blueprint' ? 'grid' : 'none';
    syncContentCards();
}

function syncContentCards() {
    let mode = $('mode').value;
    document.querySelectorAll('.content-card').forEach(card => {
        let radio = card.querySelector('input[type="radio"]');
        if (radio && radio.value === mode) card.classList.add('selected');
        else card.classList.remove('selected');
    });
}

function quickStart(mode) {
    $('mode').value = mode;
    let radio = document.querySelector('input[name="contentType"][value="' + mode + '"]');
    if (radio) radio.checked = true;
    syncContentCards();
    updateTimeEstimate();
}

function setMode(mode) {
    quickStart(mode);
}

function updateSliderNote() {
    let slider = $('difficultySlider');
    let note = $('sliderNote');
    if (!slider || !note) return;
    let val = parseInt(slider.value);
    let labels = { 1: 'Easiest — 50% Easy, 20% Mod-Easy, 15% Moderate', 2: 'Easier — 30% Easy, 25% Mod-Easy, 25% Moderate', 3: 'Balanced — spread across all 5 difficulty levels', 4: 'Harder — focus on Moderate, Difficult, Very Difficult', 5: 'Hardest — 40% Difficult, 35% Very Difficult' };
    note.textContent = 'Distribution: ' + (labels[val] || 'Balanced — spread across all 5 difficulty levels');
}

// ── Session 96: Delivery diagnostics — operator-facing pool health ──
function renderDefectDiagnostics() {
    var stats = _DefectManifest.getStats();
    var stateLabel = stats.loadStateLabel;
    var healthy = _DefectManifest.isHealthy();
    var icon = healthy ? '\u2705' : (stats.loadState === 0 ? '\u23F3' : '\u26A0\uFE0F');

    var html = '<b>Delivery Pool Diagnostics</b><br>';
    html += icon + ' Manifest: <b>' + stateLabel + '</b>';
    if (!healthy && stats.loadError) html += ' (' + stats.loadError + ')';
    html += '<br>';

    html += 'Blocked: <b>' + stats.totalBlocked + '</b> QIDs total';
    if (Object.keys(stats.byCode).length > 0) {
        html += ' | ';
        html += Object.keys(stats.byCode).sort().map(function(k) { return k + ': ' + stats.byCode[k]; }).join(', ');
    }
    html += '<br>';

    if (Object.keys(stats.byPack).length > 0) {
        html += 'By pack: ';
        html += Object.keys(stats.byPack).sort().map(function(k) { return k + ': ' + stats.byPack[k]; }).join(', ');
        html += '<br>';
    }

    if (!healthy && stats.loadState === 2) {
        html += '<span class="diag-warn">Reduced pool: manifest partially loaded. Some defective items may be in the delivery pool.</span><br>';
    } else if (stats.totalBlocked === 0) {
        html += '<span class="diag-warn">No manifest loaded — blocking is inactive. Verify governance files.</span><br>';
    }

    var diag = document.getElementById('operationsDiag');
    if (diag) diag.innerHTML = html;
}

function renderValidation() {
    let banks = {
        'A': typeof MCQ_BANK_A !== 'undefined' ? MCQ_BANK_A : [],
        'B': typeof MCQ_BANK_B !== 'undefined' ? MCQ_BANK_B : [],
        'C': typeof MCQ_BANK_C !== 'undefined' ? MCQ_BANK_C : [],
        'D': typeof MCQ_BANK_D !== 'undefined' ? MCQ_BANK_D : [],
        'E': typeof MCQ_BANK_E !== 'undefined' ? MCQ_BANK_E : []
    };
    let totalMCQs = Object.values(banks).reduce((s, b) => s + b.length, 0);
    let allOk = true;
    let detailHtml = '';
    for (let [label, bank] of Object.entries(banks)) {
        let ok = bank.length === 0 || (bank.length >= 75 && new Set(bank.map(q => q.Stem)).size === bank.length);
        if (bank.length > 0 && !ok) allOk = false;
        let counts = {};
        bank.forEach(q => counts[q.Section] = (counts[q.Section] || 0) + 1);
        detailHtml += `Pack ${label}: ${bank.length} MCQs ${ok ? '\u2713' : '\u2717'}`;
        if (bank.length) detailHtml += ` | ${Object.entries(counts).map(([s, c]) => s + ': ' + c).join(' | ')}`;
        detailHtml += '<br>';
    }
    let caseBanks = {
        'A': (typeof CASE_BANK_A !== 'undefined' ? CASE_BANK_A : (typeof MIGRATED_CASE_BASE_A !== 'undefined' ? MIGRATED_CASE_BASE_A : [])),
        'B': (typeof CASE_BANK_B !== 'undefined' ? CASE_BANK_B : (typeof MIGRATED_CASE_BASE_B !== 'undefined' ? MIGRATED_CASE_BASE_B : [])),
        'C': (typeof CASE_BANK_C !== 'undefined' ? CASE_BANK_C : (typeof MIGRATED_CASE_BASE_C !== 'undefined' ? MIGRATED_CASE_BASE_C : [])),
        'D': (typeof CASE_BANK_D !== 'undefined' ? CASE_BANK_D : (typeof MIGRATED_CASE_BASE_D !== 'undefined' ? MIGRATED_CASE_BASE_D : [])),
        'E': (typeof CASE_BANK_E !== 'undefined' ? CASE_BANK_E : (typeof MIGRATED_CASE_BASE_E !== 'undefined' ? MIGRATED_CASE_BASE_E : []))
    };
    let seenPacks = {}; for (let [label, cb] of Object.entries(caseBanks)) { if (cb && cb.length) { let key = cb.length + '|' + (cb[0].CaseID || ''); if (!seenPacks[key]) { seenPacks[key] = { labels: [label], count: cb.length, sections: cb.reduce((acc, c) => { c.SectionTags.forEach(s => acc[s] = (acc[s] || 0) + 1); return acc; }, {}) }; } else { seenPacks[key].labels.push(label); } } }
    let totalCases = Object.values(seenPacks).reduce((s, p) => s + p.count, 0);
    for (let k of Object.keys(seenPacks)) { let p = seenPacks[k]; detailHtml += `Case Pack ${p.labels.join('/')}: ${p.count} cases | ${Object.entries(p.sections).map(([s, n]) => s + ': ' + n).join(', ')}<br>`; }
    detailHtml += `<b>${allOk ? 'All packs validated' : 'Some packs have issues'}</b>`;
    let summaryHtml = `<b>${totalMCQs.toLocaleString()} MCQs across 5 packs + ${totalCases} case sets</b> &mdash; ${allOk ? 'All validated' : 'Issues detected'}`;
    let html = `${summaryHtml} <span class="catalog-toggle" onclick="this.nextElementSibling.classList.toggle('open');this.textContent=this.nextElementSibling.classList.contains('open')?'\u25B2 Collapse':'\u25BC Details'">\u25BC Details</span><div class="catalog-detail">${detailHtml}</div>`;
    $('validationStatus').innerHTML = html;
}

function renderCatalog() {
    let banks = {
        'A': typeof MCQ_BANK_A !== 'undefined' ? MCQ_BANK_A : [],
        'B': typeof MCQ_BANK_B !== 'undefined' ? MCQ_BANK_B : [],
        'C': typeof MCQ_BANK_C !== 'undefined' ? MCQ_BANK_C : [],
        'D': typeof MCQ_BANK_D !== 'undefined' ? MCQ_BANK_D : [],
        'E': typeof MCQ_BANK_E !== 'undefined' ? MCQ_BANK_E : []
    };
    let caseBanks = {
        'A': (typeof CASE_BANK_A !== 'undefined' ? CASE_BANK_A : (typeof MIGRATED_CASE_BASE_A !== 'undefined' ? MIGRATED_CASE_BASE_A : [])),
        'B': (typeof CASE_BANK_B !== 'undefined' ? CASE_BANK_B : (typeof MIGRATED_CASE_BASE_B !== 'undefined' ? MIGRATED_CASE_BASE_B : [])),
        'C': (typeof CASE_BANK_C !== 'undefined' ? CASE_BANK_C : (typeof MIGRATED_CASE_BASE_C !== 'undefined' ? MIGRATED_CASE_BASE_C : [])),
        'D': (typeof CASE_BANK_D !== 'undefined' ? CASE_BANK_D : (typeof MIGRATED_CASE_BASE_D !== 'undefined' ? MIGRATED_CASE_BASE_D : [])),
        'E': (typeof CASE_BANK_E !== 'undefined' ? CASE_BANK_E : (typeof MIGRATED_CASE_BASE_E !== 'undefined' ? MIGRATED_CASE_BASE_E : []))
    };
    let packLabels = { 'A': 'Pack A', 'B': 'Pack B', 'C': 'Pack C', 'D': 'Pack D', 'E': 'Pack E' };
    let cards = Object.entries(SECTION_INFO).map(([sec, info]) => {
        let parts = Object.entries(banks).map(([pk, bank]) => { let qs = bank.filter(q => q.Section === sec); return `${packLabels[pk]}: ${qs.length}`; }).join(' | ');
        let allTopics = [...new Set(Object.values(banks).flatMap(bank => bank.filter(q => q.Section === sec).map(q => q.Topic)))].join(', ');
        return `<div class="catalog-card"><b>Section ${sec}: ${info.name}</b><p class="small">${parts} | Official weight ${info.weight}%</p><p>${allTopics}</p></div>`;
    }).join('');
    let totalMCQs = Object.values(banks).reduce((s, b) => s + b.length, 0);
    $('catalogView').innerHTML = `
    <h2>Catalog and Source Disclosure</h2>
    <p class="small">All items are original CMA Part 1 exam-style practice mapped to the current Learning Outcome Statements used for 2026 testing.</p>
    <h3>Five Question Packs (${totalMCQs} total MCQs)</h3>
    <div class="grid">${cards}</div>
    <h2>Case-Based Practice</h2>
    <p class="small">Cases are short business scenarios with integrated item sets and response types.</p>
    <div class="grid">${Object.entries(caseBanks).flatMap(([pk, cb]) =>
        cb.map(c => `<div class="catalog-card"><b>Pack ${pk} — ${c.CaseID}: ${c.Title}</b><p class="small">Sections ${c.SectionTags.join(', ')} | ${c.Items.length} items | ${c.EstimatedMinutes} minutes</p></div>`)
    ).join('')}</div>
    <h2>Study Resource Links</h2>
    <div class="grid">${Object.entries(STUDY_LINKS).map(([k, links]) =>
        `<div class="catalog-card"><b>${k}</b><p>${links.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('<br>')}</p></div>`
    ).join('')}</div>`;
}

function renderBookmarkCollections() {
    var panel = document.getElementById('bookmarkCollectionsPanel');
    if (!panel) return;
    var cols = CMAProfileManager.getCollections();
    var entries = Object.entries(cols);
    var totalItems = entries.reduce(function (s, e) { return s + e[1].items.length; }, 0);
    var html = '<h2>Bookmark Collections <span class="collection-total">(' + totalItems + ' saved)</span></h2>';
    if (entries.length === 0) {
        html += '<p class="small">Save questions during practice sessions to build your study collections. Use the "+ Save" button next to the flag checkbox while answering questions.</p>';
    } else {
        html += '<div class="collection-list">';
        entries.forEach(function (entry) {
            var cid = entry[0], col = entry[1];
            var isSystem = col.type === 'system';
            html += '<div class="collection-row" data-cid="' + cid + '">' +
                '<div class="collection-info">' +
                '<span class="collection-name">' + col.name + '</span>' +
                (isSystem ? '<span class="collection-badge system">system</span>' : '') +
                '<span class="collection-meta">' + col.items.length + ' question' + (col.items.length !== 1 ? 's' : '') + (col.description ? ' &middot; ' + col.description : '') + '</span>' +
                '</div>' +
                '<div class="collection-actions">' +
                (!isSystem ? '<button class="collection-action-btn rename" data-cid="' + cid + '" title="Rename">&#9998;</button>' : '') +
                (!isSystem ? '<button class="collection-action-btn delete" data-cid="' + cid + '" title="Delete">&#10005;</button>' : '') +
                (col.items.length > 0 ? '<button class="collection-action-btn review" data-cid="' + cid + '" title="Review these questions">Review</button>' : '') +
                '</div></div>';
        });
        html += '</div>';
    }
    html += '<div class="collection-new-row"><input id="newCollectionName" type="text" class="collection-new-input" placeholder="New collection name..."><button id="createCollectionBtn" class="collection-create-btn">Create</button></div>';
    var profile = CMAProfileManager.load();
    var sessionCount = (profile.sessionHistory || []).length;
    html += '<div class="collection-backup-row"><span class="small">' + sessionCount + ' sessions tracked</span><button class="collection-backup-btn" onclick="CMAProfileManager.backupAllProgress()" title="Download all your progress as a backup file">&#128190; Backup All Progress</button></div>';
    panel.innerHTML = html;

    // Create collection
    var nc = document.getElementById('newCollectionName');
    var cb = document.getElementById('createCollectionBtn');
    if (nc && cb) {
        cb.onclick = function () {
            var name = nc.value.trim();
            if (!name) return;
            var cid = CMAProfileManager.createCollection(name, '');
            if (cid) { nc.value = ''; renderBookmarkCollections(); }
            else { alert('A collection with that name already exists.'); }
        };
        nc.onkeydown = function (e) { if (e.key === 'Enter') { cb.click(); e.preventDefault(); } };
    }

    // Delete
    panel.querySelectorAll('.collection-action-btn.delete').forEach(function (btn) {
        btn.onclick = function () {
            var cid = this.dataset.cid;
            if (cid && confirm('Delete this collection? Questions will not be lost, but the collection grouping will be removed.')) {
                CMAProfileManager.deleteCollection(cid);
                renderBookmarkCollections();
            }
        };
    });

    // Rename
    panel.querySelectorAll('.collection-action-btn.rename').forEach(function (btn) {
        btn.onclick = function () {
            var cid = this.dataset.cid;
            var name = prompt('New name for this collection:');
            if (name && name.trim()) {
                CMAProfileManager.renameCollection(cid, name.trim());
                renderBookmarkCollections();
            }
        };
    });

    // Review — launch a practice session with collection questions
    panel.querySelectorAll('.collection-action-btn.review').forEach(function (btn) {
        btn.onclick = function () {
            var cid = this.dataset.cid;
            var qids = CMAProfileManager.getCollectionQuestionIds(cid);
            if (qids.length === 0) { alert('No questions in this collection.'); return; }
            // Find matching questions across all banks
            var allBanks = [MCQ_BANK_A, MCQ_BANK_B, MCQ_BANK_C, MCQ_BANK_D, MCQ_BANK_E];
            var found = [];
            for (var bi = 0; bi < allBanks.length; bi++) {
                var bank = allBanks[bi];
                if (!bank) continue;
                for (var qi = 0; qi < bank.length; qi++) {
                    if (qids.indexOf(bank[qi].QuestionID) !== -1) found.push(bank[qi]);
                }
            }
            if (found.length === 0) { alert('No matching questions found in the current banks. The saved questions may be from a different pack configuration.'); return; }
            // Set up session form for collection review
            var modeEl = document.getElementById('mode');
            if (modeEl) modeEl.value = 'mcq';
            var countEl = document.getElementById('mcqCount');
            if (countEl) countEl.value = Math.min(found.length, 60);
            // Trigger session start with these specific MCQs
            state.collectionMcqs = found;
            state.collectionReview = true;
            var formEl = document.getElementById('sessionForm');
            if (formEl) formEl.requestSubmit();
        };
    });
}

// ============================================================
// S124 — Program Operations Console
// ============================================================
function renderOperationsView() {
    var el = document.getElementById('operationsView');
    if (!el) return;

    var adminData = window.__ADMIN_DATA__ || null;
    var packs = [
        { name: 'Pack A', bank: (typeof MCQ_BANK_A !== 'undefined' ? MCQ_BANK_A : []), color: '#2563eb' },
        { name: 'Pack B', bank: (typeof MCQ_BANK_B !== 'undefined' ? MCQ_BANK_B : []), color: '#059669' },
        { name: 'Pack C', bank: (typeof MCQ_BANK_C !== 'undefined' ? MCQ_BANK_C : []), color: '#d97706' },
        { name: 'Pack D', bank: (typeof MCQ_BANK_D !== 'undefined' ? MCQ_BANK_D : []), color: '#7c3aed' },
        { name: 'Pack E', bank: (typeof MCQ_BANK_E !== 'undefined' ? MCQ_BANK_E : []), color: '#db2777' }
    ];

    // Collect learner data
    var history = [];
    var dashboard = null;
    try {
        if (typeof SessionPersistence !== 'undefined') {
            history = SessionPersistence.getHistory() || [];
            dashboard = SessionPersistence.getDashboard() || null;
        }
    } catch (e) { }

    // ── Helper: per-pack stats ──
    function packStats(bank) {
        var stats = { total: bank.length, certified: 0, unprocessed: 0, archived: 0, other: 0,
            difficulty: {}, cognitive: {}, correctChoice: { A: 0, B: 0, C: 0, D: 0 },
            bySection: {} };
        for (var i = 0; i < bank.length; i++) {
            var q = bank[i];
            var s = q.question_state || 'Unprocessed';
            if (s === 'Certified') stats.certified++;
            else if (s === 'Unprocessed') stats.unprocessed++;
            else if (s === 'Archived') stats.archived++;
            else stats.other++;
            var d = q.Difficulty || '(missing)';
            stats.difficulty[d] = (stats.difficulty[d] || 0) + 1;
            var c = q.CognitiveLevel || '(missing)';
            stats.cognitive[c] = (stats.cognitive[c] || 0) + 1;
            var cc = q.CorrectChoice;
            if (cc && /^[A-D]$/.test(cc)) stats.correctChoice[cc]++;
            var sec = q.Section || '?';
            if (!stats.bySection[sec]) stats.bySection[sec] = { total: 0, certified: 0 };
            stats.bySection[sec].total++;
            if (s === 'Certified') stats.bySection[sec].certified++;
        }
        return stats;
    }

    var allStats = packs.map(function(p) { return { name: p.name, color: p.color, stats: packStats(p.bank) }; });

    // ── Helper: format percent ──
    function pct(n, total) { if (total === 0) return '0%'; return (n / total * 100).toFixed(1) + '%'; }

    // ── Helper: progress bar HTML ──
    function progressBar(pctVal, cls) {
        cls = cls || '';
        return '<div class="ops-progress"><div class="ops-progress-fill ' + cls + '" style="width:' + Math.min(100, pctVal) + '%"></div></div>';
    }

    // ── Tab 1: LEARNERS ──
    function renderLearnersPanel() {
        var h = '';
        if (history.length === 0) {
            h += '<div class="ops-empty"><b>No session data yet</b>Complete at least one exam session to see learner analytics.</div>';
            return h;
        }

        // Session stats
        var totalSessions = history.length;
        var totalMCQ = 0, totalCorrect = 0, totalCBQ = 0, totalCBQCorrect = 0;
        var readinessVals = [];
        for (var i = 0; i < history.length; i++) {
            var s = history[i];
            if (s.mcqTotal) totalMCQ += s.mcqTotal;
            if (s.mcqCorrect) totalCorrect += s.mcqCorrect;
            if (s.cbqTotal) { totalCBQ += s.cbqTotal; if (s.cbqCorrect) totalCBQCorrect += s.cbqCorrect; }
            if (s.readinessScore != null) readinessVals.push({ date: s.date || s.timestamp, score: s.readinessScore });
        }
        var mcqPct = totalMCQ > 0 ? (totalCorrect / totalMCQ * 100).toFixed(1) : '0';
        var cbqPct = totalCBQ > 0 ? (totalCBQCorrect / totalCBQ * 100).toFixed(1) : 'N/A';

        // Readiness trend
        var readinessTrend = '';
        if (readinessVals.length >= 2) {
            var latest = readinessVals[readinessVals.length - 1].score;
            var prev = readinessVals[readinessVals.length - 2].score;
            var delta = (latest - prev).toFixed(1);
            var deltaDir = delta >= 0 ? '+' : '';
            var deltaCls = delta >= 0 ? 'good' : 'bad';
            readinessTrend = '<span style="color:var(--' + (delta >= 0 ? 'success' : 'danger') + ')">' + deltaDir + delta + ' vs prior session</span>';
        }

        h += '<div class="ops-stat-row">';
        h += '<div class="ops-stat-card"><h4>Sessions</h4><div class="ops-stat-value">' + totalSessions + '</div><div class="ops-stat-sub">Total exam sessions</div></div>';
        h += '<div class="ops-stat-card"><h4>MCQ Accuracy</h4><div class="ops-stat-value">' + mcqPct + '%</div><div class="ops-stat-sub">' + totalCorrect + ' / ' + totalMCQ + ' correct</div></div>';
        h += '<div class="ops-stat-card"><h4>Case Accuracy</h4><div class="ops-stat-value">' + cbqPct + (cbqPct !== 'N/A' ? '%' : '') + '</div><div class="ops-stat-sub">' + totalCBQCorrect + ' / ' + totalCBQ + '</div></div>';
        if (readinessVals.length > 0) {
            h += '<div class="ops-stat-card"><h4>Readiness</h4><div class="ops-stat-value">' + readinessVals[readinessVals.length - 1].score.toFixed(0) + '</div><div class="ops-stat-sub">' + readinessTrend + '</div></div>';
        }
        h += '</div>';

        // Score trend table (last 10)
        if (history.length > 0) {
            h += '<div class="ops-section"><h3>Recent Sessions</h3><div class="ops-table-wrap"><table class="ops-table">';
            h += '<thead><tr><th>Date</th><th>Mode</th><th>Questions</th><th>MCQ %</th><th>Score</th><th>Pass</th></tr></thead><tbody>';
            var recent = history.slice(-10).reverse();
            for (var ri = 0; ri < recent.length; ri++) {
                var rs = recent[ri];
                var dt = rs.date || rs.timestamp || '';
                if (dt.length > 16) dt = dt.substring(0, 16);
                var mode = rs.mode || 'mcq';
                var qCount = (rs.mcqTotal || 0) + (rs.cbqTotal || 0);
                var rMcqPct = rs.mcqTotal > 0 ? (rs.mcqCorrect / rs.mcqTotal * 100).toFixed(0) + '%' : 'N/A';
                var score = rs.scaledScore != null ? rs.scaledScore : '--';
                var passed = rs.passed ? '<span class="ops-tag certified">Pass</span>' : '<span class="ops-tag blocked">Fail</span>';
                h += '<tr><td>' + dt + '</td><td>' + mode + '</td><td>' + qCount + '</td><td>' + rMcqPct + '</td><td>' + score + '</td><td>' + passed + '</td></tr>';
            }
            h += '</tbody></table></div></div>';
        }
        return h;
    }

    // ── Tab 2: MAY ──
    function renderMayPanel() {
        var h = '';
        var mayActive = (typeof May !== 'undefined' && typeof MayLearnerState !== 'undefined');

        h += '<div class="ops-stat-row">';
        h += '<div class="ops-stat-card ' + (mayActive ? 'ok' : '') + '"><h4>May Status</h4><div class="ops-stat-value">' + (mayActive ? 'Active' : 'Idle') + '</div><div class="ops-stat-sub">Coaching layer</div></div>';

        // Gate stats from dashboard
        var gateRate = 'N/A';
        var gatePass = 0, gateTotal = 0;
        if (dashboard && dashboard.gateHistory) {
            for (var gi = 0; gi < Math.min(dashboard.gateHistory.length, 10); gi++) {
                gateTotal++;
                if (dashboard.gateHistory[gi].passed) gatePass++;
            }
            if (gateTotal > 0) gateRate = (gatePass / gateTotal * 100).toFixed(0) + '%';
        } else if (history.length > 0) {
            for (var hi = 0; hi < history.length; hi++) {
                if (history[hi].gatePassed != null) { gateTotal++; if (history[hi].gatePassed) gatePass++; }
            }
            if (gateTotal > 0) gateRate = (gatePass / gateTotal * 100).toFixed(0) + '%';
        }
        h += '<div class="ops-stat-card"><h4>Gate Pass Rate</h4><div class="ops-stat-value">' + gateRate + '</div><div class="ops-stat-sub">' + gatePass + ' / ' + gateTotal + ' sessions</div></div>';

        // Recovery sprints
        var sprintCount = 0;
        for (var si = 0; si < history.length; si++) { if (history[si].isRecoverySprint) sprintCount++; }
        h += '<div class="ops-stat-card"><h4>Recovery Sprints</h4><div class="ops-stat-value">' + sprintCount + '</div><div class="ops-stat-sub">Launched</div></div>';

        h += '<div class="ops-stat-card"><h4>Recommendations</h4><div class="ops-stat-value">--</div><div class="ops-stat-sub">Tracking coming in S131</div></div>';
        h += '</div>';

        h += '<div class="ops-section"><h3>May Coaching — Coming in S129-S132</h3>';
        h += '<p class="ops-empty">Recommendation conversion analytics, coaching effectiveness metrics, and recovery sprint dashboards are targeted for Phase 2 implementation.</p>';
        h += '</div>';
        return h;
    }

    // ── Tab 3: GOVERNANCE ──
    function renderGovernancePanel() {
        var h = '';

        // Certified inventory summary
        var totalItems = 0, totalCert = 0;
        for (var pi = 0; pi < allStats.length; pi++) { totalItems += allStats[pi].stats.total; totalCert += allStats[pi].stats.certified; }
        var certPct = totalItems > 0 ? (totalCert / totalItems * 100).toFixed(1) : '0';
        var adminCert = adminData ? adminData.metadata.certifiedCount : totalCert;
        var adminTotal = adminData ? adminData.metadata.totalQids : totalItems;

        h += '<div class="ops-stat-row">';
        h += '<div class="ops-stat-card ok"><h4>Certified Inventory</h4><div class="ops-stat-value">' + adminCert + '</div><div class="ops-stat-sub">of ' + adminTotal + ' total (' + certPct + '%)</div></div>';

        // Domain coverage
        var bestDomain = '', bestPct = 0, worstDomain = '', worstPct = 100;
        var domainNames = { A: 'Ext. Fin. Reporting', B: 'Planning & Budgeting', C: 'Performance Mgmt', D: 'Cost Management', E: 'Internal Controls', F: 'Technology & Analytics' };
        var domainCerts = {};
        for (var pi2 = 0; pi2 < allStats.length; pi2++) {
            var ss = allStats[pi2].stats;
            for (var d in ss.bySection) {
                if (!domainCerts[d]) domainCerts[d] = { total: 0, certified: 0 };
                domainCerts[d].total += ss.bySection[d].total;
                domainCerts[d].certified += ss.bySection[d].certified;
            }
        }
        for (var dk in domainCerts) {
            var dp = domainCerts[dk].total > 0 ? domainCerts[dk].certified / domainCerts[dk].total * 100 : 0;
            if (dp > bestPct) { bestPct = dp; bestDomain = dk; }
            if (dp < worstPct) { worstPct = dp; worstDomain = dk; }
        }
        h += '<div class="ops-stat-card ok"><h4>Top Domain</h4><div class="ops-stat-value">' + (domainNames[bestDomain] || bestDomain) + '</div><div class="ops-stat-sub">' + bestPct.toFixed(0) + '% certified</div></div>';
        h += '<div class="ops-stat-card warn"><h4>Needs Attention</h4><div class="ops-stat-value">' + (domainNames[worstDomain] || worstDomain) + '</div><div class="ops-stat-sub">' + worstPct.toFixed(0) + '% certified</div></div>';

        // Remediation queue
        var totalBlocked = 0;
        for (var pi3 = 0; pi3 < allStats.length; pi3++) { totalBlocked += allStats[pi3].stats.unprocessed + allStats[pi3].stats.archived; }
        h += '<div class="ops-stat-card ' + (totalBlocked > 50 ? 'alert' : 'warn') + '"><h4>Not in Pool</h4><div class="ops-stat-value">' + totalBlocked + '</div><div class="ops-stat-sub">Unprocessed + Archived</div></div>';
        h += '</div>';

        // Per-domain certification progress
        h += '<div class="ops-section"><h3>Domain Certification Progress</h3><div class="ops-domain-grid">';
        for (var d2 in domainCerts) {
            var dc = domainCerts[d2];
            var dPct = dc.total > 0 ? dc.certified / dc.total * 100 : 0;
            var dCls = dPct >= 95 ? 'good' : (dPct >= 70 ? 'warn' : 'bad');
            h += '<div class="ops-domain-card"><div class="domain">' + d2 + ' — ' + (domainNames[d2] || '') + '</div>';
            h += '<div class="coverage" style="color:var(--' + (dPct >= 95 ? 'success' : (dPct >= 70 ? 'warning' : 'danger')) + ')">' + dPct.toFixed(1) + '%</div>';
            h += '<div class="ops-stat-sub">' + dc.certified + ' / ' + dc.total + ' certified</div>';
            h += progressBar(dPct, dCls);
            h += '</div>';
        }
        h += '</div></div>';

        // Per-pack state table
        h += '<div class="ops-section"><h3>Pack Inventory</h3><div class="ops-table-wrap"><table class="ops-table">';
        h += '<thead><tr><th>Pack</th><th>Total</th><th>Certified</th><th>Unprocessed</th><th>Archived</th><th>Other</th></tr></thead><tbody>';
        for (var pi4 = 0; pi4 < allStats.length; pi4++) {
            var as = allStats[pi4];
            h += '<tr><td style="font-weight:700;color:' + as.color + '">' + as.name + '</td>';
            h += '<td>' + as.stats.total + '</td>';
            h += '<td><span class="ops-tag certified">' + as.stats.certified + '</span></td>';
            h += '<td>' + (as.stats.unprocessed > 0 ? '<span class="ops-tag unprocessed">' + as.stats.unprocessed + '</span>' : '0') + '</td>';
            h += '<td>' + (as.stats.archived > 0 ? '<span class="ops-tag archived">' + as.stats.archived + '</span>' : '0') + '</td>';
            h += '<td>' + as.stats.other + '</td></tr>';
        }
        h += '</tbody></table></div></div>';

        // Governance guard status
        h += '<div class="ops-section"><h3>Governance Guard<span class="ops-section-badge good">Active</span></h3>';
        h += '<div class="ops-stat-row">';
        h += '<div class="ops-stat-card ok"><h4>Rules Enforced</h4><div class="ops-stat-value">10</div><div class="ops-stat-sub">RULE 1–10 at BLOCK level</div></div>';
        h += '<div class="ops-stat-card ok"><h4>Test Suite</h4><div class="ops-stat-value">54</div><div class="ops-stat-sub">All PASS</div></div>';
        h += '<div class="ops-stat-card ok"><h4>Pipeline</h4><div class="ops-stat-value">npm run pipeline</div><div class="ops-stat-sub">validate → build → dashboard</div></div>';
        h += '</div></div>';

        return h;
    }

    // ── Tab 4: CONTENT ──
    function renderContentPanel() {
        var h = '';

        // Per-pack difficulty distribution
        h += '<div class="ops-section"><h3>Difficulty Distribution</h3><div class="ops-table-wrap"><table class="ops-table">';
        h += '<thead><tr><th>Pack</th><th>Items</th><th>Easy</th><th>Mod-Easy</th><th>Moderate</th><th>Difficult</th><th>Very Diff</th></tr></thead><tbody>';
        var diffOrder = ['Easy', 'Moderate-Easy', 'Moderate', 'Difficult', 'Very Difficult'];
        for (var pi = 0; pi < allStats.length; pi++) {
            var as = allStats[pi];
            h += '<tr><td style="font-weight:700;color:' + as.color + '">' + as.name + '</td><td>' + as.stats.total + '</td>';
            for (var di = 0; di < diffOrder.length; di++) {
                var dVal = as.stats.difficulty[diffOrder[di]] || 0;
                h += '<td>' + pct(dVal, as.stats.total) + '</td>';
            }
            h += '</tr>';
        }
        h += '</tbody></table></div></div>';

        // Per-pack cognitive distribution
        h += '<div class="ops-section"><h3>Cognitive Level Distribution</h3><div class="ops-table-wrap"><table class="ops-table">';
        h += '<thead><tr><th>Pack</th><th>Items</th><th>Remember</th><th>Understand</th><th>Apply</th><th>Analyze</th><th>Evaluate</th></tr></thead><tbody>';
        var cogOrder = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
        for (var pi2 = 0; pi2 < allStats.length; pi2++) {
            var as2 = allStats[pi2];
            h += '<tr><td style="font-weight:700;color:' + as2.color + '">' + as2.name + '</td><td>' + as2.stats.total + '</td>';
            for (var ci = 0; ci < cogOrder.length; ci++) {
                var cVal = as2.stats.cognitive[cogOrder[ci]] || 0;
                h += '<td>' + pct(cVal, as2.stats.total) + '</td>';
            }
            h += '</tr>';
        }
        h += '</tbody></table></div></div>';

        // Per-pack correct choice distribution
        h += '<div class="ops-section"><h3>Answer Position Distribution</h3><div class="ops-table-wrap"><table class="ops-table">';
        h += '<thead><tr><th>Pack</th><th>A</th><th>B</th><th>C</th><th>D</th><th>Spread</th></tr></thead><tbody>';
        for (var pi3 = 0; pi3 < allStats.length; pi3++) {
            var as3 = allStats[pi3];
            var vals = [];
            for (var li = 0; li < 4; li++) {
                var letter = String.fromCharCode(65 + li); // A,B,C,D
                vals.push(as3.stats.correctChoice[letter] || 0);
            }
            var max = Math.max.apply(null, vals);
            var min = Math.min.apply(null, vals);
            var spread = as3.stats.total > 0 ? ((max - min) / as3.stats.total * 100).toFixed(1) + 'pp' : 'N/A';
            var spreadCls = (max - min) / (as3.stats.total || 1) > 0.06 ? 'warn' : 'good';
            h += '<tr><td style="font-weight:700;color:' + as3.color + '">' + as3.name + '</td>';
            for (var li2 = 0; li2 < 4; li2++) {
                h += '<td>' + pct(vals[li2], as3.stats.total) + '</td>';
            }
            h += '<td><span class="ops-tag ' + spreadCls + '">' + spread + '</span></td></tr>';
        }
        h += '</tbody></table></div></div>';

        return h;
    }

    // ── Build the console ──
    function renderDataPanel() {
        var h = '<div class="ops-section"><h3>Data Management</h3>';
        h += '<div class="ops-card ops-card-danger">';
        h += '<h4>Reset All Learner Data</h4>';
        h += '<p>This clears ALL learner data including session history, May coaching state, bookmarks, and settings. A backup is automatically created before clearing.</p>';
        h += '<button class="secondary settings-btn" style="color:#fff;background:var(--danger,#dc2626);border-color:var(--danger,#dc2626)" onclick="if(confirm(\'This will clear ALL your learner data including session history, May coaching state, and settings. This cannot be undone.\\n\\nA backup will be created before clearing.\\n\\nContinue?\')){CMAProfileManager.createBackup();localStorage.removeItem(CMAProfileManager.STORAGE_KEY);alert(\'Profile cleared. Backup created before clearing. Reloading page.\');location.reload()}">Reset All Learner Data</button>';
        h += '</div>';
        h += '<div class="ops-section"><h3>Profile Export</h3>';
        h += '<div class="ops-card">';
        h += '<p>Export the full learner profile for migration or backup. Includes session history, May coaching data, collections, and settings.</p>';
        h += '<button class="secondary settings-btn" onclick="CMAProfileManager.backupAllProgress();alert(\'Backup downloaded.\')">Backup All Progress</button>';
        h += '</div>';
        h += '</div>';
        return h;
    }

    var panels = {
        'learners': { label: 'Learners', render: renderLearnersPanel },
        'may': { label: 'May', render: renderMayPanel },
        'governance': { label: 'Governance', render: renderGovernancePanel },
        'content': { label: 'Content', render: renderContentPanel },
        'data': { label: 'Data', render: renderDataPanel }
    };

    var html = '<div class="ops-console">' +
        '<div class="diag-panel" id="operationsDiag" aria-label="Delivery pool diagnostics">Loading diagnostics...</div>' +
        '<div class="ops-tabs">' +
            '<button class="ops-tab active" data-opspanel="governance">Governance</button>' +
            '<button class="ops-tab" data-opspanel="content">Content</button>' +
            '<button class="ops-tab" data-opspanel="learners">Learners</button>' +
            '<button class="ops-tab" data-opspanel="may">May</button>' +
            '<button class="ops-tab" data-opspanel="data">Data</button>' +
        '</div>';

    for (var pk in panels) {
        var activeClass = (pk === 'governance') ? ' active' : '';
        html += '<div class="ops-panel' + activeClass + '" data-opspanel="' + pk + '"></div>';
    }
    html += '</div>';

    el.innerHTML = html;

    // S130 — Populate delivery pool diagnostics in Operations console
    setTimeout(function () { renderDefectDiagnostics(); }, 100);

    // Render initial panel (governance)
    var activePanel = el.querySelector('.ops-panel[data-opspanel="governance"]');
    if (activePanel) activePanel.innerHTML = renderGovernancePanel();

    // Pre-render content panel (most data) so it's ready
    var contentPanel = el.querySelector('.ops-panel[data-opspanel="content"]');
    if (contentPanel) contentPanel.innerHTML = renderContentPanel();

    // Wire sub-tab clicks
    el.querySelectorAll('.ops-tab').forEach(function(btn) {
        btn.onclick = function() {
            var panelName = btn.dataset.opspanel;
            // Update active tab
            el.querySelectorAll('.ops-tab').forEach(function(b) { b.classList.toggle('active', b === btn); });
            // Show panel
            el.querySelectorAll('.ops-panel').forEach(function(p) {
                p.classList.toggle('active', p.dataset.opspanel === panelName);
            });
            // Render if needed
            var panel = el.querySelector('.ops-panel[data-opspanel="' + panelName + '"]');
            if (panel && panel.innerHTML.trim() === '') {
                if (panels[panelName]) panel.innerHTML = panels[panelName].render();
            }
        };
    });
}

// ============================================================
// S124 — Guided Onboarding & Tour System
// ============================================================
var GuidedTour = {
    active: false,
    stepIndex: 0,
    tourType: '',
    __overlayEl: null,
    __tooltipEl: null,
    __spotlightEl: null,

    TOURS: {
        beginner: {
            title: 'Welcome to the CMA Learning Platform',
            desc: 'Get to know the key features that will help you prepare for the CMA Part 1 exam.',
            steps: [
                { id: 'welcome', title: 'Welcome!', text: 'The CMA Learning Platform is your complete CMA Part 1 exam simulator. It includes 2,545 MCQs across 5 question packs, 75 integrated case studies, and an AI-powered May coaching layer. Let us show you around.', attach: 'header', position: 'center' },
                { id: 'dashboard', title: 'Your Dashboard', text: 'Here you track readiness scores, performance over time, and your session history. The dashboard helps you see your strengths and weaknesses at a glance.', attach: 'dashboardView', tab: 'dashboardView', position: 'center' },
                { id: 'session', title: 'Start an Exam Session', text: 'Configure and launch practice sessions in the Study tab. Choose MCQ-only, case studies, mixed mode, or a full Part 1 simulation with a 4-hour timer.', attach: 'sessionForm', tab: 'studyView', position: 'top' },
                { id: 'may', title: 'Meet May — Your AI Coach', text: 'May is your AI-powered coaching assistant. After each session, May reviews your performance, identifies weak areas, and recommends targeted practice — including Recovery Sprints. Click the purple M button in the top-right to open May anytime.', attach: 'coachView', tab: 'coachView', position: 'center' },
                { id: 'collections', title: 'Bookmark Collections', text: 'Save questions during sessions to build study collections: Must Master, Technology Weaknesses, Formula Review, and Recovery Candidates. Find them in the Study tab.', attach: 'bookmarkCollectionsPanel', tab: 'studyView', position: 'top' },
                { id: 'recovery', title: 'Recovery Sprint', text: 'After a disappointing session, May recommends a Recovery Sprint — a focused practice set targeting your weakest topics. It is the fastest way to turn missed questions into learned concepts.', attach: 'studyRecovery', tab: 'studyView', position: 'top' },
                { id: 'reports', title: 'Reports & Analytics', text: 'The History view shows all past sessions with scores, pass rates, and confidence calibration charts. Use this to track your progress week by week.', attach: 'historyView', tab: 'historyView', position: 'center' },
                { id: 'settings', title: 'Settings & Backup', text: 'Backup your progress, import from another device, manage your learner profile, and configure your preferences. Always backup before switching devices.', attach: 'settingsView', tab: 'settingsView', position: 'center' },
                { id: 'complete', title: 'You are All Set!', text: 'That is the tour. You are ready to start studying. Click the <b>?</b> button in the toolbar anytime to restart tours or open the Help Center. Good luck on your CMA Part 1 journey!', attach: 'header', position: 'center' }
            ]
        },
        recovery: {
            title: 'Recovery Sprint Guide',
            desc: 'How targeted remediation accelerates your exam readiness.',
            steps: [
                { id: 'rs1', title: 'What is a Recovery Sprint?', text: 'A Recovery Sprint is a focused practice session that targets your weakest topics — pulled from the questions you got wrong across recent sessions.', attach: 'header', position: 'center' },
                { id: 'rs2', title: 'When to Sprint', text: 'After any session where you score below your target, May analyzes your errors and recommends a Recovery Sprint if your readiness score drops.', attach: 'studyRecovery', tab: 'studyView', position: 'top' },
                { id: 'rs3', title: 'How It Works', text: 'May selects questions from your weakest topics, creates a timed mini-session, and after the sprint, shows you a before/after readiness comparison.', attach: 'coachView', tab: 'coachView', position: 'center' },
                { id: 'rs4', title: 'Track Recovery', text: 'Your History dashboard shows Recovery Sprint results with a special badge. Watch your readiness climb with each sprint.', attach: 'historyView', tab: 'historyView', position: 'center' }
            ]
        },
        may: {
            title: 'May Coaching Guide',
            desc: 'How your AI coach helps you study smarter.',
            steps: [
                { id: 'may1', title: 'Session Review', text: 'After every session, May automatically reviews your performance and identifies your strongest and weakest topics.', attach: 'coachView', tab: 'coachView', position: 'center' },
                { id: 'may2', title: 'Readiness Scoring', text: 'Your Readiness Score (0-100) measures exam preparedness across all 6 blueprint domains. A score above 70 is considered exam-ready.', attach: 'coachView', tab: 'coachView', position: 'center' },
                { id: 'may3', title: 'Archetype Detection', text: 'May identifies your study archetype — e.g., "Calculator" (strong at calculations, weak at concepts) or "Theorist" — and tailors recommendations accordingly.', attach: 'coachView', tab: 'coachView', position: 'center' },
                { id: 'may4', title: 'Study Plan', text: 'Based on your archetype and readiness gaps, May generates a personalized study plan with specific topics and question counts.', attach: 'coachView', tab: 'coachView', position: 'center' }
            ]
        },
        analytics: {
            title: 'Analytics Guide',
            desc: 'Understanding your performance data.',
            steps: [
                { id: 'an1', title: 'Readiness Dashboard', text: 'The readiness dashboard shows your preparedness across all 6 CMA Part 1 domains with color-coded indicators: green (ready), yellow (developing), red (needs work).', attach: 'dashboardView', tab: 'dashboardView', position: 'center' },
                { id: 'an2', title: 'Confidence Calibration', text: 'This chart compares your self-reported confidence with actual correctness. A well-calibrated learner is confident when correct and unsure when wrong.', attach: 'dashboardView', tab: 'dashboardView', position: 'center' },
                { id: 'an3', title: 'Session Trends', text: 'Track your score and readiness over time. The trend line helps you see whether your study strategy is working.', attach: 'historyView', tab: 'historyView', position: 'center' },
                { id: 'an4', title: 'Domain Breakdown', text: 'See which blueprint domains drive your readiness score up — or drag it down. Focus your study time on the lowest-scoring domains.', attach: 'dashboardView', tab: 'dashboardView', position: 'center' }
            ]
        },
        admin: {
            title: 'Administration Guide',
            desc: 'Governance, portfolio, and repository tools.',
            steps: [
                { id: 'ad1', title: 'Governance Dashboard', text: 'Monitor certification status across all 5 question packs, track domain-level certification progress, and view the governance guard status.', attach: 'operationsView', tab: 'operationsView', position: 'center' },
                { id: 'ad2', title: 'Content Analytics', text: 'View difficulty distribution, cognitive level breakdowns, and answer-position balance across all packs.', attach: 'operationsView', tab: 'operationsView', position: 'center' },
                { id: 'ad3', title: 'Learner Analytics', text: 'Review session history, accuracy rates, and readiness trends across all learners.', attach: 'operationsView', tab: 'operationsView', position: 'center' }
            ]
        }
    },

    // ── Initialize onboarding state in profile ──
    _ensureState: function () {
        var profile = window._cmaProfile || CMAProfileManager.load();
        if (!profile.onboarding) profile.onboarding = { tourCompleted: false, completedTours: {}, adminActivated: false, adminClickCount: 0, adminClickTimestamp: 0 };
        return profile;
    },

    _saveState: function (profile) {
        window._cmaProfile = profile;
        CMAProfileManager.save(profile);
    },

    // ── Check if first-run tour should auto-trigger ──
    checkFirstRun: function () {
        var profile = this._ensureState();
        if (!profile.onboarding.tourCompleted) { this.start('beginner'); return true; }
        return false;
    },

    // ── Start a specific tour ──
    start: function (tourType) {
        var tour = this.TOURS[tourType];
        if (!tour) return;
        if (tourType === 'admin' && typeof AdminGate !== 'undefined' && !AdminGate._isActivated()) {
            if (typeof renderSettingsView === 'function') { showView('settingsView'); renderSettingsView(); }
            return;
        }
        this.active = true;
        this.stepIndex = 0;
        this.tourType = tourType;
        this._createOverlay();
        this._gotoStep(tour.steps[0]);
    },

    // ── Stop the tour ──
    stop: function (completed) {
        this.active = false;
        this._destroyOverlay();
        // S130 — Return to home after tour to avoid leaving hidden/admin tabs exposed
        if (typeof showView === 'function') showView('homeView');
        if (typeof renderHomeView === 'function') renderHomeView();
        if (completed && this.tourType === 'beginner') {
            var profile = this._ensureState();
            profile.onboarding.tourCompleted = true;
            this._saveState(profile);
        }
        if (completed) {
            var profile = this._ensureState();
            if (!profile.onboarding.completedTours) profile.onboarding.completedTours = {};
            profile.onboarding.completedTours[this.tourType] = new Date().toISOString();
            this._saveState(profile);
        }
    },

    // ── Navigate steps ──
    next: function () {
        var tour = this.TOURS[this.tourType];
        if (!tour) return;
        this.stepIndex++;
        if (this.stepIndex >= tour.steps.length) { this.stop(true); return; }
        this._gotoStep(tour.steps[this.stepIndex]);
    },

    prev: function () {
        var tour = this.TOURS[this.tourType];
        if (!tour || this.stepIndex <= 0) return;
        this.stepIndex--;
        this._gotoStep(tour.steps[this.stepIndex]);
    },

    // ── Go to step with tab-switch wait ──
    _gotoStep: function (step) {
        var self = this;
        // Switch to the target tab if needed
        if (step.tab) {
            if (typeof showView === 'function') showView(step.tab);
            if (step.tab === 'studyView' && typeof renderStudyView === 'function') renderStudyView();
            if (step.tab === 'dashboardView' && typeof PerformanceDashboard !== 'undefined') PerformanceDashboard.render();
            if (step.tab === 'coachView' && typeof May !== 'undefined' && May._renderCompactCoach) May._renderCompactCoach();
            if (step.tab === 'settingsView' && typeof renderSettingsView === 'function') renderSettingsView();
            if (step.tab === 'historyView' && typeof ExamSessionManager !== 'undefined') ExamSessionManager.renderHistory();
            if (step.tab === 'operationsView' && typeof renderOperationsView === 'function') renderOperationsView();
        }
        // S130 — Wait for tab render + scroll-into-view before positioning
        requestAnimationFrame(function () {
            setTimeout(function () { self._showStep(step); }, 200);
        });
    },

    // ── Create overlay DOM ──
    _createOverlay: function () {
        this._destroyOverlay();
        var overlay = document.createElement('div');
        overlay.id = 'guidedTourOverlay';
        overlay.className = 'guided-tour-overlay';
        overlay.innerHTML =
            '<div class="guided-tour-spotlight" id="tourSpotlight"></div>' +
            '<div class="guided-tour-tooltip" id="tourTooltip">' +
            '<div class="tour-step-indicator" id="tourStepIndicator"></div>' +
            '<h3 id="tourTitle"></h3>' +
            '<p id="tourText"></p>' +
            '<div class="tour-actions">' +
            '<button class="tour-btn tour-skip" id="tourSkip">Skip Tour</button>' +
            '<div class="tour-nav">' +
            '<button class="tour-btn tour-prev" id="tourPrev">&#8592; Back</button>' +
            '<button class="tour-btn tour-next" id="tourNext">Next &#8594;</button>' +
            '</div></div></div>';
        document.body.appendChild(overlay);
        this.__overlayEl = overlay;
        this.__spotlightEl = document.getElementById('tourSpotlight');
        this.__tooltipEl = document.getElementById('tourTooltip');
        var self = this;
        document.getElementById('tourSkip').onclick = function () { self.stop(false); };
        document.getElementById('tourPrev').onclick = function () { self.prev(); };
        document.getElementById('tourNext').onclick = function () { self.next(); };
    },

    _destroyOverlay: function () {
        if (this.__overlayEl) { this.__overlayEl.remove(); this.__overlayEl = null; this.__spotlightEl = null; this.__tooltipEl = null; }
    },

    // ── Show a specific step ──
    _showStep: function (step) {
        var tour = this.TOURS[this.tourType];

        // Position spotlight
        var targetEl = null;
        if (step.attach === 'header') {
            targetEl = document.querySelector('header.hero');
        } else if (step.attach === 'sessionForm') {
            targetEl = document.getElementById('sessionForm') || document.getElementById('studyView');
        } else if (step.attach === 'mayQuickstart') {
            targetEl = document.getElementById('mayQuickstart');
        } else if (step.attach === 'studyRecovery') {
            targetEl = document.getElementById('studyRecovery');
        } else if (step.attach === 'bookmarkCollectionsPanel') {
            targetEl = document.getElementById('bookmarkCollectionsPanel');
        } else {
            targetEl = document.getElementById(step.attach);
        }
        // S130 — Target actual May content card instead of full-height coachView container
        if (step.attach === 'coachView') {
            targetEl = document.querySelector('#coachView .may-compact') || targetEl;
        }
        if (!targetEl) {
            targetEl = document.querySelector('.work-panel') || document.querySelector('main.layout') || document.body;
        }
        // P4-W1-C T2 — body fallback: force center position so spotlight is visible
        var stepForPosition = (targetEl === document.body) ? { position: 'center' } : step;
        // P4-W1-C T4 — skip scrollIntoView on sticky/fixed elements to avoid page jump
        var cs = window.getComputedStyle(targetEl);
        if (!cs || (cs.position !== 'sticky' && cs.position !== 'fixed')) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }

        // W1-C — Position only once the smooth scroll has settled. The prior
        // fixed 300ms timer raced the browser's ~300-600ms smooth-scroll
        // animation, so placement was computed from a mid-animation rect and
        // the spotlight/tooltip ended up displaced (or off-screen) once the
        // scroll finished.
        var self = this;
        this._whenScrollSettled(function () {
            self._positionSpotlight(targetEl, stepForPosition);
        });

        // Update content
        document.getElementById('tourStepIndicator').textContent =
            (this.stepIndex + 1) + ' of ' + tour.steps.length;
        document.getElementById('tourTitle').textContent = step.title;
        document.getElementById('tourText').innerHTML = step.text;
        // Show/hide prev button
        document.getElementById('tourPrev').style.display = this.stepIndex === 0 ? 'none' : '';
        // Update next button text on last step
        var isLast = this.stepIndex >= tour.steps.length - 1;
        document.getElementById('tourNext').textContent = isLast ? 'Finish \u2713' : 'Next \u2192';
    },

    // W1-C — Invoke cb after the active smooth scroll has settled. Uses the
    // scrollend event when available, with a scroll-stability poll as a
    // fallback (older engines) and a hard 900ms cap so placement is never
    // blocked indefinitely.
    _whenScrollSettled: function (cb) {
        var done = false;
        var finish = function () { if (done) return; done = true; cb(); };
        try {
            if ('onscrollend' in window) {
                window.addEventListener('scrollend', finish, { once: true });
            }
        } catch (e) { /* scrollend not available */ }
        var lastY = window.scrollY;
        var stable = 0;
        var iv = setInterval(function () {
            var y = window.scrollY;
            if (Math.abs(y - lastY) < 1) {
                stable++;
                if (stable >= 2) { clearInterval(iv); finish(); }
            } else {
                stable = 0;
                lastY = y;
            }
        }, 50);
        setTimeout(function () { clearInterval(iv); finish(); }, 900);
    },

    // ── Position spotlight and tooltip ──
    _positionSpotlight: function (targetEl, step) {
        var rect = targetEl.getBoundingClientRect();
        var margin = 8;
        var tooltipWidth = 400;

        if (step.position === 'center') {
            // S130 — For tall elements, use a capped effective size so the spotlight doesn't engulf the viewport
            var effectiveH = Math.min(rect.height, 300);
            var effectiveTop = rect.top + Math.max(0, (rect.height - effectiveH) / 2);
            var cx = rect.left + rect.width / 2;
            var cy = effectiveTop + effectiveH / 2;
            var size = Math.max(rect.width, effectiveH, 200) + 40;
            this.__spotlightEl.style.left = (cx - size / 2) + 'px';
            this.__spotlightEl.style.top = (cy - size / 2) + 'px';
            this.__spotlightEl.style.width = size + 'px';
            this.__spotlightEl.style.height = size + 'px';
            this.__spotlightEl.style.borderRadius = '50%';
            var tx = cx - tooltipWidth / 2;
            // S130 — prefer below the target, but go above if there's no room
            var estH = this.__tooltipEl ? this.__tooltipEl.offsetHeight : 200;
            var ty = (effectiveTop + effectiveH + 16 + estH > window.innerHeight - 16)
                ? rect.top - estH - 16
                : rect.bottom + 16;
            var clamped = this._clampTooltip(tx, ty, tooltipWidth, this.__tooltipEl);
            this.__tooltipEl.style.left = clamped.left + 'px';
            this.__tooltipEl.style.top = clamped.top + 'px';
            this.__tooltipEl.style.width = tooltipWidth + 'px';
        } else if (step.position === 'top') {
            this.__spotlightEl.style.left = (rect.left - margin) + 'px';
            this.__spotlightEl.style.top = (rect.top - margin) + 'px';
            this.__spotlightEl.style.width = (rect.width + margin * 2) + 'px';
            this.__spotlightEl.style.height = (rect.height + margin * 2) + 'px';
            this.__spotlightEl.style.borderRadius = '8px';
            var tx2 = rect.left + rect.width / 2 - tooltipWidth / 2;
            var ty2 = rect.top - 160 > 20 ? rect.top - 160 : rect.bottom + 16;
            var clamped2 = this._clampTooltip(tx2, ty2, tooltipWidth, this.__tooltipEl);
            this.__tooltipEl.style.left = clamped2.left + 'px';
            this.__tooltipEl.style.top = clamped2.top + 'px';
            this.__tooltipEl.style.width = tooltipWidth + 'px';
        } else {
            this.__spotlightEl.style.left = (rect.left - margin) + 'px';
            this.__spotlightEl.style.top = (rect.top - margin) + 'px';
            this.__spotlightEl.style.width = (rect.width + margin * 2) + 'px';
            this.__spotlightEl.style.height = (rect.height + margin * 2) + 'px';
            this.__spotlightEl.style.borderRadius = '8px';
            var narrowWidth = Math.min(tooltipWidth, rect.width + 32);
            var tx3 = rect.left - 16;
            var ty3 = rect.bottom + 16;
            var clamped3 = this._clampTooltip(tx3, ty3, narrowWidth, this.__tooltipEl);
            this.__tooltipEl.style.left = clamped3.left + 'px';
            this.__tooltipEl.style.top = clamped3.top + 'px';
            this.__tooltipEl.style.width = narrowWidth + 'px';
        }
        // P4-W1-C T1 — clamp spotlight within viewport so no part renders off-screen
        this._clampSpotlight();
    },

    _clampSpotlight: function () {
        var pad = 16;
        var s = this.__spotlightEl;
        if (!s) return;
        var left = parseFloat(s.style.left) || 0;
        var top = parseFloat(s.style.top) || 0;
        var w = parseFloat(s.style.width) || 0;
        var h = parseFloat(s.style.height) || 0;
        left = Math.max(pad, Math.min(left, window.innerWidth - w - pad));
        top = Math.max(pad, Math.min(top, window.innerHeight - h - pad));
        s.style.left = left + 'px';
        s.style.top = top + 'px';
    },

    // ── S130: Clamp tooltip within viewport ──
    _clampTooltip: function (left, top, width, tooltipEl) {
        var padding = 16;
        var estHeight = tooltipEl ? tooltipEl.offsetHeight : 180;
        left = Math.max(padding, Math.min(left, window.innerWidth - width - padding));
        top = Math.max(padding, Math.min(top, window.innerHeight - estHeight - padding));
        return { left: left, top: top };
    }
};

// ── S124: Admin Console Access Gate ──
var AdminGate = {
    REQUIRED_CLICKS: 5,
    CLICK_WINDOW_MS: 3000,
    STORAGE_KEY: 'cmaAdminGate',

    init: function () {
        if (this._isActivated()) {
            this._showAdmin();
        } else {
            this._hideAdmin();
            this._wireVersionTrigger();
        }
    },

    _isActivated: function () {
        try { return sessionStorage.getItem(this.STORAGE_KEY) === '1'; } catch (e) { return false; }
    },

    _setActivated: function () {
        try { sessionStorage.setItem(this.STORAGE_KEY, '1'); } catch (e) {}
    },

    _hideAdmin: function () {
        var opsTab = document.querySelector('.tab[data-view="operationsView"]');
        if (opsTab) opsTab.style.display = 'none';
    },

    _showAdmin: function () {
        var opsTab = document.querySelector('.tab[data-view="operationsView"]');
        if (opsTab) opsTab.style.display = '';
        if (opsTab && !opsTab.querySelector('.admin-badge')) {
            var badge = document.createElement('span');
            badge.className = 'admin-badge';
            badge.textContent = 'ADMIN';
            badge.style.cssText = 'background:var(--danger);color:#fff;font-size:0.6rem;padding:1px 5px;border-radius:3px;margin-left:4px;vertical-align:middle;';
            opsTab.appendChild(badge);
        }
    },

    _wireVersionTrigger: function () {
        var self = this;
        var clickState = { count: 0, timestamp: 0 };
        function checkClick() {
            var now = Date.now();
            if (now - clickState.timestamp > self.CLICK_WINDOW_MS) {
                clickState.count = 0;
            }
            clickState.count += 1;
            clickState.timestamp = now;
            if (clickState.count >= self.REQUIRED_CLICKS) {
                clickState.count = 0;
                self._setActivated();
                self._showAdmin();
                alert('Admin console activated. You now have access to Operations, Governance, Portfolio, Repository, and Certification tools.');
            }
        }
        window._adminGateClickHandler = checkClick;
    },

    // Called by settings render to attach to version label
    attachToVersion: function (el) {
        if (!el) return;
        var handler = window._adminGateClickHandler;
        if (!handler) return;
        el.style.cursor = 'pointer';
        el.onclick = handler;
    }
};

// ── S124: Home Hub View ──
function renderHomeView() {
    var profile = window._cmaProfile || CMAProfileManager.load();
    var stats = CMAProfileManager.getStats(profile);
    var totalSessions = stats.sessions;
    var adminActive = profile.onboarding && profile.onboarding.adminActivated;
    var tourComplete = profile.onboarding && profile.onboarding.tourCompleted;

    // Readiness
    var readiness = '--';
    try {
        if (typeof SessionPersistence !== 'undefined') {
            var hist = SessionPersistence.getHistory() || [];
            if (hist.length > 0) {
                var last = hist[hist.length - 1];
                if (last.readinessScore != null) readiness = last.readinessScore.toFixed(0);
            }
        }
    } catch (e) { }

    var html = '<div class="home-hub">';

    // Welcome section
    html += '<div class="home-welcome">';
    html += '<h2>CMA Learning Platform</h2>';
    html += '<p class="home-subtitle">2,545 Part 1 MCQs &middot; 75 Case Studies &middot; AI-Powered Coaching</p>';
    if (!tourComplete) {
        html += '<button class="home-tour-btn" onclick="GuidedTour.start(\'beginner\')">&#9654; Take the Guided Tour</button>';
    }
    html += '</div>';

    // Hub cards
    html += '<div class="home-grid">';

    // Study card
    html += '<div class="home-card home-card-study" onclick="showView(\'studyView\')">';
    html += '<div class="home-card-icon">&#128218;</div>';
    html += '<h3>Study</h3>';
    html += '<p>MCQ practice, case studies, mixed sessions, and full Part 1 simulations with timed exams.</p>';
    html += '<span class="home-card-cta">Start Practice &rarr;</span>';
    html += '</div>';

    // Coach card
    html += '<div class="home-card home-card-coach" onclick="showView(\'coachView\'); if(typeof May!==\'undefined\'){May._renderCompactCoach()}else ReviewCoach.renderFullCoach()">';
    html += '<div class="home-card-icon">&#129504;</div>';
    html += '<h3>May Coach</h3>';
    html += '<p>AI-powered readiness scoring, study archetype detection, personalized recommendations, and Recovery Sprints.</p>';
    html += '<span class="home-card-cta">Open Coach &rarr;</span>';
    html += '</div>';

    // Quiz card
    html += '<div class="home-card home-card-quiz" onclick="showView(\'coachView\');MayQuizController._renderSetup()">';
    html += '<div class="home-card-icon">&#128161;</div>';
    html += '<h3>Quick Quiz</h3>';
    html += '<p>5-question micro-quizzes on any domain, topic, or bookmark collection. Knowledge Check or Guided Socratic mode — no session required.</p>';
    html += '<span class="home-card-cta">Quiz Me &rarr;</span>';
    html += '</div>';

    // Analytics card
    html += '<div class="home-card home-card-analytics" onclick="showView(\'dashboardView\')">';
    html += '<div class="home-card-icon">&#128200;</div>';
    html += '<h3>Analytics</h3>';
    html += '<p>Performance tracking, confidence calibration, domain readiness, and session trend reports.</p>';
    html += '<span class="home-card-cta">View Analytics &rarr;</span>';
    html += '</div>';

    // Collections card
    html += '<div class="home-card home-card-collections" onclick="showView(\'studyView\'); setTimeout(function(){var el=document.getElementById(\'bookmarkCollectionsPanel\');if(el)el.scrollIntoView({behavior:\'smooth\'})},200)">';
    html += '<div class="home-card-icon">&#128278;</div>';
    html += '<h3>Collections</h3>';
    html += '<p>Must Master, Technology Weaknesses, Formula Review, Recovery Candidates, and custom bookmark collections.</p>';
    html += '<span class="home-card-cta">Browse Collections &rarr;</span>';
    html += '</div>';

    // History card
    html += '<div class="home-card home-card-history" onclick="showView(\'historyView\')">';
    html += '<div class="home-card-icon">&#128337;</div>';
    html += '<h3>Session History</h3>';
    html += '<p>' + totalSessions + ' sessions completed. Review past performance, replay sessions, and compare results.</p>';
    html += '<span class="home-card-cta">View History &rarr;</span>';
    html += '</div>';

    // Admin card (conditional)
    if (adminActive) {
        html += '<div class="home-card home-card-admin" onclick="showView(\'operationsView\')">';
        html += '<div class="home-card-icon">&#128736;</div>';
        html += '<h3>Administration</h3>';
        html += '<p>Governance dashboard, portfolio analytics, repository health, certification tracking, and May control panel.</p>';
        html += '<span class="home-card-cta">Open Console &rarr;</span>';
        html += '</div>';
    }

    html += '</div>';

    // Stats bar
    html += '<div class="home-stats">';
    html += '<div class="home-stat"><span class="home-stat-value">' + totalSessions + '</span><span class="home-stat-label">Sessions</span></div>';
    html += '<div class="home-stat"><span class="home-stat-value">' + readiness + '</span><span class="home-stat-label">Readiness</span></div>';
    html += '<div class="home-stat"><span class="home-stat-value">2,545</span><span class="home-stat-label">MCQs</span></div>';
    html += '<div class="home-stat"><span class="home-stat-value">75</span><span class="home-stat-label">Cases</span></div>';
    html += '</div>';

    html += '</div>';

    var el = document.getElementById('homeView');
    if (el) el.innerHTML = html;
}

// ── S130: Study View ──
function renderStudyView() {
    var el = document.getElementById('studyView');
    if (!el) return;

    // What to Practice Next — May recommendations
    var recsEl = document.getElementById('whatToPracticeNext');
    if (recsEl) {
        try {
            var recs = '';
            if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_PRODUCTION_MAY_INTEGRATION') && typeof MayLearnerState !== 'undefined') {
                var clusters = MayLearnerState.getWeaknessClusters();
                var readiness = MayLearnerState.getReadinessSummary();
                var topWeak = clusters && clusters.persistentWeak && clusters.persistentWeak.length > 0 ? clusters.persistentWeak[0] : null;
                var declining = clusters && clusters.declining && clusters.declining.length > 0 ? clusters.declining[0] : null;
                var suggestedTopic = declining ? declining.topic : (topWeak ? topWeak.topic : null);
                var readinessBand = readiness && readiness.overall ? readiness.overall.band : 'Not enough data';
                var data = MayLearnerState.load();
                var hasData = data && data.sessions && data.sessions.length >= 1;
                if (hasData) {
                    recs = '<div class="may-recommendation-panel"><div class="may-rec-grid">';
                    recs += '<div class="may-rec-card" style="cursor:pointer" onclick="quickStart(\'mcq\'); var f=document.getElementById(\'sessionForm\'); if(f)f.requestSubmit()"><div class="may-rec-label">Top Weakness</div><div class="may-rec-value">' + (topWeak ? topWeak.topic + ' (' + (topWeak.accuracy || 0) + '%)' : 'Not enough data') + '</div></div>';
                    recs += '<div class="may-rec-card" style="cursor:pointer" onclick="quickStart(\'mcq\'); var f=document.getElementById(\'sessionForm\'); if(f)f.requestSubmit()"><div class="may-rec-label">Suggested Review</div><div class="may-rec-value">' + (suggestedTopic || 'Complete more sessions') + '</div></div>';
                    var bandCls = readinessBand === 'Recovery needed' ? 'may-rec-danger' : readinessBand === 'Developing' ? 'may-rec-warning' : 'may-rec-muted';
                    recs += '<div class="may-rec-card"><div class="may-rec-label">Readiness</div><div class="may-rec-value may-rec-band ' + bandCls + '">' + readinessBand + '</div></div>';
                    recs += '</div></div>';
                }
            }
            recsEl.innerHTML = recs || '<p class="small">Complete a practice session for personalized recommendations.</p>';
        } catch (e) { recsEl.innerHTML = '<p class="small">Recommendations will appear after your first session.</p>'; }
    }

    // Recovery Candidates
    var recoveryEl = document.getElementById('recoveryCandidates');
    if (recoveryEl) {
        try {
            var profile = window._cmaProfile || CMAProfileManager.load();
            var recovery = profile.bookmarkCollections && profile.bookmarkCollections['recovery-candidates'];
            if (recovery && recovery.items && recovery.items.length > 0) {
                recoveryEl.innerHTML = '<p>' + recovery.items.length + ' questions saved for review. <a href="#" onclick="var cid=\'recovery-candidates\'; var qids=CMAProfileManager.getCollectionQuestionIds(cid); if(qids.length===0){alert(\'No questions.\');return} var allBanks=[MCQ_BANK_A,MCQ_BANK_B,MCQ_BANK_C,MCQ_BANK_D,MCQ_BANK_E]; var found=[]; for(var bi=0;bi<allBanks.length;bi++){var bank=allBanks[bi]; if(!bank)continue; for(var qi=0;qi<bank.length;qi++){if(qids.indexOf(bank[qi].QuestionID)!==-1)found.push(bank[qi])}} if(found.length===0){alert(\'No matching questions.\');return} state.collectionMcqs=found; state.collectionReview=true; document.getElementById(\'mode\').value=\'mcq\'; document.getElementById(\'sessionForm\').requestSubmit()" style="text-decoration:underline;">Review Recovery Candidates &rarr;</a></p>';
            } else {
                recoveryEl.innerHTML = '<p class="small">Questions you missed across sessions appear here for focused retry.</p>';
            }
        } catch (e) { recoveryEl.innerHTML = '<p class="small">Missed questions will appear here after your first session.</p>'; }
    }
}

// ── S130: May Floating Bubble & Compact Coach ──
if (typeof May !== 'undefined') {
May.Floating = {
    _pos: { top: 346, right: 170 },
    _init: function () {
        var btn = document.getElementById('mayFloatBtn');
        if (!btn) return;
        btn.classList.add('may-float-visible');
        var self = this;
        var dragging = false, moved = false, startX = 0, startY = 0, baseX = 0, baseY = 0;
        btn.onpointerdown = function (e) {
            dragging = true; moved = false;
            startX = e.clientX; startY = e.clientY;
            var r = btn.getBoundingClientRect();
            baseX = r.left; baseY = r.top;
            btn.setPointerCapture(e.pointerId);
        };
        btn.onpointermove = function (e) {
            if (!dragging) return;
            var dx = e.clientX - startX, dy = e.clientY - startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
            if (!moved) return;
            var x = Math.max(8, Math.min(window.innerWidth - btn.offsetWidth - 8, baseX + dx));
            var y = Math.max(8, Math.min(window.innerHeight - btn.offsetHeight - 8, baseY + dy));
            btn.style.left = x + 'px'; btn.style.top = y + 'px'; btn.style.right = 'auto';
        };
        btn.onpointerup = function () {
            if (!dragging) return;
            dragging = false;
            var r = btn.getBoundingClientRect();
            self._pos = { top: r.top, right: window.innerWidth - r.right };
        };
        btn.addEventListener('click', function (e) {
            if (moved) { moved = false; return; }
            self._toggle();
        });
    },
    _toggle: function () {
        var panel = document.getElementById('mayFloatingPanel');
        if (panel) { this._collapse(); return; }
        this._expand();
    },
    _expand: function () {
        var btn = document.getElementById('mayFloatBtn');
        // Read position BEFORE hiding the dot (hidden elements return zero rect)
        var r = btn ? btn.getBoundingClientRect() : { left: window.innerWidth - 266, top: 346 };
        if (btn) btn.classList.remove('may-float-visible');
        var panel = document.createElement('div');
        panel.id = 'mayFloatingPanel';
        panel.className = 'may-floating-panel';
        var panelTop = r.top, panelLeft = Math.max(8, r.left - 160);
        panel.style.top = panelTop + 'px'; panel.style.left = panelLeft + 'px'; panel.style.right = 'auto';
        panel.innerHTML =
            '<div class="may-floating-handle" id="mayFloatingHandle"><span>May AI Coach</span><button class="may-floating-min" id="mayFloatingMin" title="Collapse to dot">&minus;</button><button class="may-floating-close" id="mayFloatingClose" title="Close May">&times;</button></div>' +
            '<div class="may-floating-body">' +
            '<div class="may-floating-avatar">M</div>' +
            '<h3>May AI Coach</h3>' +
            '<p>Ready to help you analyze performance, identify weaknesses, and build your study plan.</p>' +
            '<button class="may-floating-open" id="mayFloatingOpenCoach">Open Full Coach</button>' +
            '</div>';
        document.body.appendChild(panel);
        var self = this;
        // Drag handle — skip drag when clicking buttons
        var handle = document.getElementById('mayFloatingHandle');
        var dragging = false, sx = 0, sy = 0, bx = 0, by = 0;
        handle.onpointerdown = function (e) {
            if (e.target.closest('button')) return; // let button clicks through
            dragging = true; sx = e.clientX; sy = e.clientY;
            var rect = panel.getBoundingClientRect();
            bx = rect.left; by = rect.top;
            handle.setPointerCapture(e.pointerId);
        };
        handle.onpointermove = function (e) {
            if (!dragging) return;
            var x = Math.max(8, Math.min(window.innerWidth - panel.offsetWidth - 8, bx + e.clientX - sx));
            var y = Math.max(8, Math.min(window.innerHeight - panel.offsetHeight - 8, by + e.clientY - sy));
            panel.style.left = x + 'px'; panel.style.top = y + 'px'; panel.style.right = 'auto';
        };
        handle.onpointerup = function () { dragging = false; };
        document.getElementById('mayFloatingClose').onclick = function () { self._hide(); };
        document.getElementById('mayFloatingMin').onclick = function () { self._collapse(); };
        document.getElementById('mayFloatingOpenCoach').onclick = function () {
            self._hide();
            if (typeof showView !== 'undefined') showView('coachView');
            if (typeof May !== 'undefined' && May.renderView) May.renderView();
        };
    },
    _collapse: function () {
        var panel = document.getElementById('mayFloatingPanel');
        if (panel) {
            var r = panel.getBoundingClientRect();
            this._pos = { top: r.top, right: window.innerWidth - r.right };
            panel.remove();
        }
        var btn = document.getElementById('mayFloatBtn');
        if (btn) {
            btn.style.top = this._pos.top + 'px';
            btn.style.right = this._pos.right + 'px';
            btn.style.left = 'auto';
            btn.classList.add('may-float-visible');
        }
    },
    _hide: function () {
        var panel = document.getElementById('mayFloatingPanel');
        if (panel) panel.remove();
        var btn = document.getElementById('mayFloatBtn');
        if (btn) btn.classList.remove('may-float-visible');
    },
    _showDot: function () {
        var btn = document.getElementById('mayFloatBtn');
        if (btn) { btn.classList.add('may-float-visible'); }
    },
    _hideDot: function () {
        var btn = document.getElementById('mayFloatBtn');
        if (btn) { btn.classList.remove('may-float-visible'); }
    }
};

    May._renderCompactCoach = function () {
        var el = document.getElementById('coachView');
        if (!el) return;
        el.innerHTML = '<div class="may-compact">' +
            '<div class="may-compact-avatar">M</div>' +
            '<h3>May AI Coach</h3>' +
            '<p>Ready to help you analyze performance, identify weaknesses, and build your study plan.</p>' +
            '<button class="may-compact-open" onclick="May.renderView()">Open Coach</button>' +
            '</div>';
    };

    // Initialize floating bubble on load
    setTimeout(function () { May.Floating._init(); }, 1000);
} else {
    // Fallback when May is not yet loaded — still show quiz entries
    var __compactCoachFallback = function () {
        var el = document.getElementById('coachView');
        if (!el) return;
        var quizEntries = MayQuizController._renderQuizEntries();
        el.innerHTML = '<div class="may-compact"><div class="may-compact-avatar">M</div><h3>May AI Coach</h3><p>Complete a practice session to unlock May coaching features.</p>' + quizEntries + '</div>';
    };
    // Override floating button click for fallback
    var fb = document.getElementById('mayFloatBtn');
    if (fb) {
        fb.onclick = function () {
            if (typeof May !== 'undefined' && May.Floating) { May.Floating._toggle(); }
            else { showView('coachView'); MayQuizController._renderSetup(); }
        };
        fb.style.display = 'block';
    }
}

// ============================================================
// S129 — MayQuizController: Interactive Socratic Quiz Mode
// ============================================================
const MayQuizController = {
    QUIZ_SIZE: 5,

    // ── Current quiz state ──
    currentQuiz: null,

    _getAllBanks() {
        var banks = [];
        try { if (typeof MCQ_BANK_A !== 'undefined') banks.push(MCQ_BANK_A); } catch (e) { }
        try { if (typeof MCQ_BANK_B !== 'undefined') banks.push(MCQ_BANK_B); } catch (e) { }
        try { if (typeof MCQ_BANK_C !== 'undefined') banks.push(MCQ_BANK_C); } catch (e) { }
        try { if (typeof MCQ_BANK_D !== 'undefined') banks.push(MCQ_BANK_D); } catch (e) { }
        try { if (typeof MCQ_BANK_E !== 'undefined') banks.push(MCQ_BANK_E); } catch (e) { }
        var all = [];
        for (var i = 0; i < banks.length; i++) {
            for (var j = 0; j < banks[i].length; j++) all.push(banks[i][j]);
        }
        return all;
    },

    // ── Question Filters ──
    _filterBySection(questions, section) {
        var s = section.toUpperCase();
        return questions.filter(function (q) { return q.Section === s; });
    },

    _filterByTopic(questions, keyword) {
        var kw = keyword.toLowerCase();
        return questions.filter(function (q) {
            var topic = (q.Topic || '').toLowerCase();
            var stem = (q.Stem || '').toLowerCase();
            var micro = (q.MicroTopic || '').toLowerCase();
            var sectionName = (q.SectionName || '').toLowerCase();
            return topic.indexOf(kw) !== -1 || stem.indexOf(kw) !== -1 || micro.indexOf(kw) !== -1 || sectionName.indexOf(kw) !== -1;
        });
    },

    _filterByDifficulty(questions, minDifficulty) {
        return questions.filter(function (q) {
            var ds = q.DifficultyScore || 3;
            return ds >= minDifficulty;
        });
    },

    _filterByCollection(collectionId) {
        var qids = CMAProfileManager.getCollectionQuestionIds(collectionId);
        if (!qids || qids.length === 0) return [];
        var all = this._getAllBanks();
        var qidSet = {};
        for (var i = 0; i < qids.length; i++) qidSet[qids[i]] = true;
        return all.filter(function (q) { return qidSet[q.QuestionID]; });
    },

    _filterWeakAreas(topN) {
        topN = topN || 3;
        var clusters = null;
        try {
            if (typeof MayLearnerState !== 'undefined') clusters = MayLearnerState.getWeaknessClusters();
        } catch (e) { }
        var weakTopics = [];
        if (clusters && clusters.persistentWeak) {
            for (var i = 0; i < Math.min(topN, clusters.persistentWeak.length); i++) {
                weakTopics.push(clusters.persistentWeak[i].topic);
            }
        }
        if (weakTopics.length === 0 && clusters && clusters.declining) {
            for (var j = 0; j < Math.min(topN, clusters.declining.length); j++) {
                weakTopics.push(clusters.declining[j].topic);
            }
        }
        if (weakTopics.length === 0) return [];
        var all = this._getAllBanks();
        var results = [];
        for (var t = 0; t < weakTopics.length; t++) {
            var topicResults = this._filterByTopic(all, weakTopics[t]);
            for (var r = 0; r < topicResults.length; r++) results.push(topicResults[r]);
        }
        return results;
    },

    _filterRecovery() {
        return this._filterByCollection('recovery-candidates');
    },

    // ── Dedup by UniqueConceptKey, then shuffle ──
    _dedupAndShuffle(questions) {
        var seen = {};
        var deduped = [];
        for (var i = 0; i < questions.length; i++) {
            var key = questions[i].UniqueConceptKey || questions[i].QuestionID;
            if (!seen[key]) { seen[key] = true; deduped.push(questions[i]); }
        }
        var arr = deduped.slice();
        for (var j = arr.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            var tmp = arr[j]; arr[j] = arr[k]; arr[k] = tmp;
        }
        return arr;
    },

    // ── Resolve a quiz source label from filter ──
    _resolveSourceLabel(filter, value) {
        var domainLabels = { 'A': 'External Financial Reporting', 'B': 'Planning & Budgeting', 'C': 'Performance Management', 'D': 'Cost Management', 'E': 'Internal Controls', 'F': 'Technology & Analytics' };
        if (filter === 'section' && domainLabels[value]) return domainLabels[value];
        if (filter === 'section') return 'Section ' + value;
        if (filter === 'topic') return 'Topic: ' + value;
        if (filter === 'formula') return 'Formula: ' + value;
        if (filter === 'weak') return 'Weakest Areas';
        if (filter === 'recovery') return 'Recovery Candidates';
        if (filter === 'collection') return 'Collection: ' + value;
        return 'Selected Questions';
    },

    // ── Build question pool from filter ──
    _buildPool(filter, value) {
        var pool = [];
        switch (filter) {
            case 'section':
                pool = this._filterBySection(this._getAllBanks(), value);
                break;
            case 'topic':
                pool = this._filterByTopic(this._getAllBanks(), value);
                break;
            case 'formula':
                pool = this._filterByTopic(this._getAllBanks(), value);
                break;
            case 'weak':
                pool = this._filterWeakAreas(3);
                break;
            case 'recovery':
                pool = this._filterRecovery();
                break;
            case 'collection':
                pool = this._filterByCollection(value);
                break;
            case 'all':
            default:
                pool = this._getAllBanks();
                break;
        }
        return this._dedupAndShuffle(pool);
    },

    // ── Start Quiz ──
    startQuiz(filter, value, mode) {
        mode = mode || 'knowledge';
        var pool = this._buildPool(filter, value);
        if (pool.length === 0) {
            alert('No questions found for this selection. Try a different topic or complete more sessions for weak-area data.');
            return false;
        }
        var count = Math.min(this.QUIZ_SIZE, pool.length);
        var questions = pool.slice(0, count);
        this.currentQuiz = {
            questions: questions,
            mode: mode,
            currentIndex: 0,
            results: [],
            filter: filter,
            filterValue: value || '',
            sourceLabel: this._resolveSourceLabel(filter, value),
            startedAt: new Date().toISOString()
        };
        this._renderActiveQuiz();
        return true;
    },

    // ── Restart with same filter ──
    restartQuiz() {
        if (this.currentQuiz) {
            this.startQuiz(this.currentQuiz.filter, this.currentQuiz.filterValue, this.currentQuiz.mode);
        }
    },

    // ── End quiz and show results ──
    endQuiz() {
        if (!this.currentQuiz) return;
        var quiz = this.currentQuiz;
        this._saveQuizResult();
        this._renderResults();
        this.currentQuiz = null;
    },

    // ── Cancel quiz ──
    cancelQuiz() {
        if (this.currentQuiz && this.currentQuiz.results.length > 0) {
            this._saveQuizResult();
        }
        this.currentQuiz = null;
        this._renderSetup();
    },

    // ── Submit answer ──
    submitAnswer(answerIndexOrText) {
        var quiz = this.currentQuiz;
        if (!quiz) return;
        var q = quiz.questions[quiz.currentIndex];
        var correct = q.CorrectChoice;
        var isCorrect = false;
        var userAnswer = null;

        if (quiz.mode === 'knowledge') {
            userAnswer = answerIndexOrText;
            isCorrect = (userAnswer === correct);
        } else {
            // Socratic mode — compare text to correct choice text
            userAnswer = (answerIndexOrText || '').trim();
            var correctText = q.Choices && q.Choices[correct] ? q.Choices[correct].toLowerCase() : '';
            // Fuzzy match: check if user answer contains key terms from correct choice
            isCorrect = userAnswer.length > 0 && (userAnswer === correct.toLowerCase() || correctText.indexOf(userAnswer.toLowerCase()) !== -1 || this._socraticFuzzyMatch(userAnswer, correctText));
        }

        quiz.results.push({
            question: q,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            mode: quiz.mode,
            timestamp: new Date().toISOString()
        });

        // Render feedback
        this._renderFeedback(q, isCorrect, userAnswer);
    },

    _socraticFuzzyMatch(userAnswer, correctText) {
        if (!userAnswer || !correctText) return false;
        var userWords = userAnswer.toLowerCase().split(/\s+/).filter(function (w) { return w.length > 3; });
        var correctWords = correctText.split(/\s+/).filter(function (w) { return w.length > 3; });
        if (userWords.length === 0) return false;
        var matchCount = 0;
        for (var i = 0; i < userWords.length; i++) {
            if (correctWords.indexOf(userWords[i]) !== -1) matchCount++;
        }
        return (matchCount / userWords.length) >= 0.5;
    },

    // ── Move to next question ──
    nextQuestion() {
        var quiz = this.currentQuiz;
        if (!quiz) return;
        quiz.currentIndex++;
        if (quiz.currentIndex >= quiz.questions.length) {
            this.endQuiz();
        } else {
            this._renderActiveQuiz();
        }
    },

    // ── Save bookmark for current question ──
    saveCurrentQuestion(collectionId) {
        var quiz = this.currentQuiz;
        if (!quiz) return;
        var q = quiz.questions[quiz.currentIndex];
        collectionId = collectionId || 'must-master';
        CMAProfileManager.addToCollection(collectionId, q.QuestionID);
    },

    // ── Persist quiz history to profile ──
    _saveQuizResult() {
        var quiz = this.currentQuiz;
        if (!quiz || quiz.results.length === 0) return;
        var correct = 0;
        for (var i = 0; i < quiz.results.length; i++) {
            if (quiz.results[i].isCorrect) correct++;
        }
        var profile = CMAProfileManager.load();
        if (!profile.mayQuizHistory) profile.mayQuizHistory = [];
        profile.mayQuizHistory.push({
            date: quiz.startedAt,
            completedAt: new Date().toISOString(),
            mode: quiz.mode,
            sourceLabel: quiz.sourceLabel,
            filter: quiz.filter,
            filterValue: quiz.filterValue,
            total: quiz.results.length,
            correct: correct,
            accuracy: Math.round(correct / Math.max(1, quiz.results.length) * 100),
            questionIds: quiz.results.map(function (r) { return r.question.QuestionID; }),
            topicSnapshot: this._computeTopicSnapshot(quiz.results)
        });
        if (profile.mayQuizHistory.length > 200) profile.mayQuizHistory = profile.mayQuizHistory.slice(-200);
        CMAProfileManager.save(profile);
    },

    _computeTopicSnapshot(results) {
        var snapshot = {};
        for (var i = 0; i < results.length; i++) {
            var topic = (results[i].question.Topic || results[i].question.MicroTopic || 'Unknown').split(' ').slice(0, 3).join(' ');
            if (!snapshot[topic]) snapshot[topic] = { attempts: 0, correct: 0 };
            snapshot[topic].attempts++;
            if (results[i].isCorrect) snapshot[topic].correct++;
        }
        return snapshot;
    },

    getQuizHistory() {
        var profile = CMAProfileManager.load();
        return profile.mayQuizHistory || [];
    },

    // ── Quiz Setup UI ──
    _renderSetup() {
        var el = document.getElementById('coachView');
        if (!el) return;
        var sections = ['A', 'B', 'C', 'D', 'E', 'F'];
        var sectionNames = { 'A': 'Ext. Financial Reporting', 'B': 'Planning & Budgeting', 'C': 'Performance Mgmt', 'D': 'Cost Management', 'E': 'Internal Controls', 'F': 'Tech & Analytics' };
        var topicChips = ['COSO', 'variance', 'budget', 'cash flow', 'ratio', 'GAAP', 'cost', 'inventory', 'ethics', 'overhead', 'internal control', 'standard cost', 'transfer pricing', 'CVP', 'process costing'];
        var quizHistory = this.getQuizHistory();
        var recentAccuracy = null;
        if (quizHistory.length > 0) {
            var recent = quizHistory.slice(-5);
            var totalC = 0, totalT = 0;
            for (var i = 0; i < recent.length; i++) { totalC += recent[i].correct; totalT += recent[i].total; }
            recentAccuracy = totalT > 0 ? Math.round(totalC / totalT * 100) : null;
        }

        var html = '<div class="may-quiz-setup">';
        html += '<h3>&#128218; Quiz Me</h3>';
        html += '<p class="may-quiz-setup-intro">Choose a topic below and I\'ll quiz you with real CMA Part 1 questions. No session required.</p>';

        if (recentAccuracy !== null) {
            var accCls = recentAccuracy >= 80 ? 'good' : recentAccuracy >= 60 ? '' : 'bad';
            html += '<p class="small">Recent quiz accuracy: <span class="' + accCls + '">' + recentAccuracy + '%</span> (' + Math.min(5, quizHistory.length) + ' quizzes)</p>';
        }

        // Domain chips
        html += '<div class="may-quiz-chip-row-label">By Domain</div>';
        html += '<div class="may-quiz-chip-row" id="mayQuizDomainChips">';
        for (var s = 0; s < sections.length; s++) {
            html += '<button class="may-quiz-chip" data-filter="section" data-value="' + sections[s] + '" onclick="MayQuizController._selectChip(this,\'section\')">' + sections[s] + ': ' + sectionNames[sections[s]] + '</button>';
        }
        html += '</div>';

        // Topic chips
        html += '<div class="may-quiz-chip-row-label">By Topic</div>';
        html += '<div class="may-quiz-chip-row" id="mayQuizTopicChips">';
        for (var t = 0; t < topicChips.length; t++) {
            html += '<button class="may-quiz-chip" data-filter="topic" data-value="' + topicChips[t] + '" onclick="MayQuizController._selectChip(this,\'topic\')">' + topicChips[t] + '</button>';
        }
        html += '</div>';

        // Special collections
        html += '<div class="may-quiz-chip-row-label">Special</div>';
        html += '<div class="may-quiz-chip-row" id="mayQuizSpecialChips">';
        html += '<button class="may-quiz-chip" data-filter="weak" data-value="" onclick="MayQuizController._selectChip(this,\'weak\')">&#128200; Weakest Areas</button>';
        html += '<button class="may-quiz-chip" data-filter="recovery" data-value="" onclick="MayQuizController._selectChip(this,\'recovery\')">&#127919; Recovery Q\'s</button>';
        html += '<button class="may-quiz-chip" data-filter="collection" data-value="must-master" onclick="MayQuizController._selectChip(this,\'collection\')">&#11088; Must Master</button>';
        html += '<button class="may-quiz-chip" data-filter="collection" data-value="formula-review" onclick="MayQuizController._selectChip(this,\'collection\')">&#129518; Formula Review</button>';
        html += '<button class="may-quiz-chip" data-filter="collection" data-value="technology-weaknesses" onclick="MayQuizController._selectChip(this,\'collection\')">&#128187; Tech Weaknesses</button>';
        // User collections
        var collections = CMAProfileManager.getCollections();
        for (var cid in collections) {
            if (collections[cid].type === 'user') {
                html += '<button class="may-quiz-chip" data-filter="collection" data-value="' + cid + '" onclick="MayQuizController._selectChip(this,\'collection\')">&#128278; ' + collections[cid].name + '</button>';
            }
        }
        html += '</div>';

        // Mode selection
        html += '<div style="margin-top:4px;"><div class="may-quiz-chip-row-label">Quiz Mode</div></div>';
        html += '<div class="may-quiz-mode-row">';
        html += '<button class="may-quiz-mode-btn selected" id="mayQuizModeKnowledge" onclick="MayQuizController._selectMode(\'knowledge\')"><div class="may-quiz-mode-btn-title">&#128196; Knowledge Check</div><div class="may-quiz-mode-btn-desc">Standard multiple choice with answer choices shown</div></button>';
        html += '<button class="may-quiz-mode-btn" id="mayQuizModeSocratic" onclick="MayQuizController._selectMode(\'socratic\')"><div class="may-quiz-mode-btn-title">&#128161; Guided Socratic</div><div class="may-quiz-mode-btn-desc">No answer choices at first — type your answer, then see choices if needed</div></button>';
        html += '</div>';

        // Start button
        html += '<button class="may-quiz-start-btn" id="mayQuizStartBtn" disabled onclick="MayQuizController._handleStart()">Start Quiz</button>';
        html += '<p class="small" id="mayQuizSelectionHint" style="margin-top:8px;text-align:center;">Select a domain, topic, or collection above</p>';

        html += '</div>';
        el.innerHTML = html;
        this._selectedFilter = null;
        this._selectedValue = null;
        this._selectedMode = 'knowledge';
    },

    _selectedFilter: null,
    _selectedValue: null,
    _selectedMode: 'knowledge',

    _selectChip(btn, filter) {
        // Deselect siblings in the same chip row
        var row = btn.parentNode;
        var chips = row.querySelectorAll('.may-quiz-chip');
        for (var i = 0; i < chips.length; i++) chips[i].classList.remove('selected');

        // If clicking the already-selected chip, deselect it
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected');
            this._selectedFilter = null;
            this._selectedValue = null;
        } else {
            btn.classList.add('selected');
            this._selectedFilter = filter;
            this._selectedValue = btn.getAttribute('data-value');
            // Deselect chips in other rows
            var allRows = document.querySelectorAll('.may-quiz-chip-row');
            for (var r = 0; r < allRows.length; r++) {
                if (allRows[r] !== row) {
                    var otherChips = allRows[r].querySelectorAll('.may-quiz-chip');
                    for (var c = 0; c < otherChips.length; c++) otherChips[c].classList.remove('selected');
                }
            }
        }

        this._updateStartButton();
    },

    _selectMode(mode) {
        this._selectedMode = mode;
        var knowledgeBtn = document.getElementById('mayQuizModeKnowledge');
        var socraticBtn = document.getElementById('mayQuizModeSocratic');
        if (knowledgeBtn) knowledgeBtn.classList.toggle('selected', mode === 'knowledge');
        if (socraticBtn) socraticBtn.classList.toggle('selected', mode === 'socratic');
    },

    _updateStartButton() {
        var btn = document.getElementById('mayQuizStartBtn');
        var hint = document.getElementById('mayQuizSelectionHint');
        if (btn) btn.disabled = !this._selectedFilter;
        if (hint) hint.style.display = this._selectedFilter ? 'none' : 'block';
    },

    _handleStart() {
        if (!this._selectedFilter) return;
        this.startQuiz(this._selectedFilter, this._selectedValue, this._selectedMode);
    },

    // ── Active Quiz Rendering ──
    _renderActiveQuiz() {
        var quiz = this.currentQuiz;
        if (!quiz) return;
        var el = document.getElementById('coachView');
        if (!el) return;
        var q = quiz.questions[quiz.currentIndex];
        var qNum = quiz.currentIndex + 1;
        var total = quiz.questions.length;
        var progressPct = Math.round((quiz.currentIndex) / total * 100);

        var html = '<div class="may-quiz-active">';

        // Progress
        html += '<div class="may-quiz-progress-text"><span class="may-quiz-question-number">Question ' + qNum + ' of ' + total + '</span><span>' + quiz.sourceLabel + '</span></div>';
        html += '<div class="may-quiz-progress-bar"><div class="may-quiz-progress-fill" style="width:' + progressPct + '%"></div></div>';

        // Source tag
        html += '<div class="may-quiz-source-tag">' + (q.Section || '') + ' &middot; ' + (q.Topic || 'Unknown topic') + '</div>';

        // Stem
        html += '<div class="may-quiz-stem">' + nl2br(q.Stem || '') + '</div>';

        // Choices or Socratic input
        if (quiz.mode === 'knowledge') {
            html += this._renderKnowledgeChoices(q);
        } else {
            html += this._renderSocraticInput(q);
        }

        // Action buttons
        html += '<div class="may-quiz-action-row">';
        html += '<button class="may-quiz-save-btn" onclick="MayQuizController.saveCurrentQuestion(\'must-master\')">&#11088; Save</button>';
        html += '<button class="may-quiz-end-btn" onclick="MayQuizController.cancelQuiz()">&#10005; End Quiz</button>';
        html += '</div>';

        html += '</div>';
        el.innerHTML = html;

        // Focus socratic input if applicable
        if (quiz.mode === 'socratic') {
            setTimeout(function () {
                var input = document.getElementById('mayQuizSocraticInput');
                if (input) input.focus();
            }, 100);
        }
    },

    _renderKnowledgeChoices(q) {
        var letters = ['A', 'B', 'C', 'D'];
        var html = '<div class="may-quiz-choices">';
        for (var i = 0; i < letters.length; i++) {
            var choiceText = q.Choices && q.Choices[letters[i]] ? q.Choices[letters[i]] : null;
            if (!choiceText) continue;
            html += '<button class="may-quiz-choice" onclick="MayQuizController.submitAnswer(\'' + letters[i] + '\')">';
            html += '<span class="may-quiz-choice-letter">' + letters[i] + '</span>';
            html += '<span class="may-quiz-choice-text">' + choiceText + '</span>';
            html += '</button>';
        }
        html += '</div>';
        return html;
    },

    _renderSocraticInput(q) {
        var html = '<div class="may-quiz-socratic-area">';
        html += '<div class="may-quiz-socratic-label">Type your answer:</div>';
        html += '<input type="text" class="may-quiz-socratic-input" id="mayQuizSocraticInput" placeholder="Type your best answer..." onkeydown="if(event.key===\'Enter\')MayQuizController._submitSocratic()">';
        html += '<button class="may-quiz-socratic-submit" onclick="MayQuizController._submitSocratic()">Submit Answer</button>';
        html += '<button class="may-quiz-show-choices-btn" onclick="MayQuizController._showChoicesAsHint()">Show answer choices</button>';
        html += '</div>';
        return html;
    },

    _submitSocratic() {
        var input = document.getElementById('mayQuizSocraticInput');
        if (!input || !input.value.trim()) return;
        this.submitAnswer(input.value);
    },

    _showChoicesAsHint() {
        var quiz = this.currentQuiz;
        if (!quiz) return;
        var q = quiz.questions[quiz.currentIndex];
        var letters = ['A', 'B', 'C', 'D'];
        var html = '<div class="may-quiz-socratic-hint">Here are the answer choices — now select one:<br>';
        for (var i = 0; i < letters.length; i++) {
            var choiceText = q.Choices && q.Choices[letters[i]] ? q.Choices[letters[i]] : null;
            if (!choiceText) continue;
            html += '<br><button class="may-quiz-choice" onclick="MayQuizController.submitAnswer(\'' + letters[i] + '\')"><span class="may-quiz-choice-letter">' + letters[i] + '</span><span class="may-quiz-choice-text">' + choiceText + '</span></button>';
        }
        html += '</div>';
        // Replace the socratic area with the hint + choices
        var area = document.querySelector('.may-quiz-socratic-area');
        if (area) area.outerHTML = html;
    },

    // ── Feedback Rendering ──
    _renderFeedback(q, isCorrect, userAnswer) {
        var quiz = this.currentQuiz;
        if (!quiz) return;
        var el = document.getElementById('coachView');
        if (!el) return;
        var correct = q.CorrectChoice;
        var correctText = q.Choices && q.Choices[correct] ? q.Choices[correct] : '';
        var qNum = quiz.currentIndex + 1;
        var total = quiz.questions.length;
        var progressPct = Math.round((quiz.currentIndex + 1) / total * 100);

        var html = '<div class="may-quiz-active">';

        // Progress
        html += '<div class="may-quiz-progress-text"><span class="may-quiz-question-number">Question ' + qNum + ' of ' + total + '</span><span>' + quiz.sourceLabel + '</span></div>';
        html += '<div class="may-quiz-progress-bar"><div class="may-quiz-progress-fill" style="width:' + progressPct + '%"></div></div>';
        html += '<div class="may-quiz-source-tag">' + (q.Section || '') + ' &middot; ' + (q.Topic || 'Unknown topic') + '</div>';

        // Stem — dimmed
        html += '<div class="may-quiz-stem" style="opacity:0.7">' + nl2br(q.Stem || '') + '</div>';

        // Show choices with correct/wrong highlighting
        html += '<div class="may-quiz-choices">';
        var letters = ['A', 'B', 'C', 'D'];
        for (var i = 0; i < letters.length; i++) {
            var choiceText = q.Choices && q.Choices[letters[i]] ? q.Choices[letters[i]] : null;
            if (!choiceText) continue;
            var cls = 'may-quiz-choice answered';
            if (letters[i] === correct) cls += ' correct-choice';
            if (quiz.mode === 'knowledge' && letters[i] === userAnswer && userAnswer !== correct) cls += ' wrong-choice';
            html += '<div class="' + cls + '"><span class="may-quiz-choice-letter">' + letters[i] + '</span><span class="may-quiz-choice-text">' + choiceText + '</span></div>';
        }
        html += '</div>';

        // Feedback box
        if (isCorrect) {
            html += '<div class="may-quiz-feedback correct">';
            html += '<div class="may-quiz-feedback-label">&#10003; Correct!</div>';
            html += '<div class="may-quiz-feedback-correct-answer">' + correct + ': ' + correctText + '</div>';
            html += '</div>';
        } else {
            html += '<div class="may-quiz-feedback incorrect">';
            html += '<div class="may-quiz-feedback-label">&#10007; Incorrect</div>';
            if (quiz.mode === 'socratic') {
                html += '<div>Your answer: "' + userAnswer + '"</div>';
            }
            html += '<div class="may-quiz-feedback-correct-answer">The correct answer is ' + correct + ': ' + correctText + '</div>';
            // Show brief explanation snippet
            var ec = q.ExplanationCorrect || '';
            if (ec.length > 20) {
                var snippet = ec.substring(0, 250);
                if (ec.length > 250) snippet += '...';
                html += '<div class="may-quiz-feedback-explanation">' + nl2br(snippet) + '</div>';
            }
            html += '</div>';
        }

        // Next button
        var isLast = (quiz.currentIndex >= quiz.questions.length - 1);
        html += '<div class="may-quiz-action-row">';
        html += '<button class="may-quiz-save-btn" onclick="MayQuizController.saveCurrentQuestion(\'must-master\')">&#11088; Save</button>';
        if (!isCorrect) {
            html += '<button class="may-quiz-save-btn" onclick="MayQuizController.saveCurrentQuestion(\'recovery-candidates\')">&#127919; Save to Recovery</button>';
        }
        html += '<button class="may-quiz-end-btn" onclick="MayQuizController.endQuiz()">&#10005; End Quiz</button>';
        html += '<button class="may-quiz-next-btn" onclick="MayQuizController.nextQuestion()">' + (isLast ? 'See Results &rarr;' : 'Next Question &rarr;') + '</button>';
        html += '</div>';

        html += '</div>';
        el.innerHTML = html;
    },

    // ── Results Rendering ──
    _renderResults() {
        var quiz = this.currentQuiz || this._lastQuizForResults;
        if (!quiz) return;
        var el = document.getElementById('coachView');
        if (!el) return;

        var total = quiz.results.length;
        var correct = 0;
        for (var i = 0; i < total; i++) { if (quiz.results[i].isCorrect) correct++; }
        var accuracy = total > 0 ? Math.round(correct / total * 100) : 0;
        var scoreCls = accuracy >= 80 ? 'high' : accuracy >= 60 ? 'medium' : 'low';
        var impactCls = accuracy >= 80 ? 'positive' : accuracy >= 60 ? 'neutral' : 'warning';
        var impactMsg = accuracy >= 80 ? 'Strong performance! This topic area looks solid.' :
            accuracy >= 60 ? 'Decent performance. Review the missed concepts to strengthen this area.' :
                'This topic needs work. Consider a Recovery Sprint to address these gaps.';
        var readyMsg = accuracy >= 80 ? 'Readiness Impact: +1' : accuracy >= 60 ? 'Readiness Impact: neutral' : 'Readiness Impact: -1';

        var html = '<div class="may-quiz-results">';
        html += '<div class="may-quiz-results-header">';
        html += '<h3>Quiz Complete</h3>';
        html += '<p>' + quiz.sourceLabel + ' &middot; ' + (quiz.mode === 'knowledge' ? 'Knowledge Check' : 'Guided Socratic') + '</p>';
        html += '</div>';

        // Score circle
        html += '<div class="may-quiz-score-circle ' + scoreCls + '">';
        html += '<span class="may-quiz-score-number">' + accuracy + '%</span>';
        html += '<span class="may-quiz-score-label">Accuracy</span>';
        html += '</div>';

        // Stats
        html += '<div class="may-quiz-results-stats">';
        html += '<div class="may-quiz-results-stat"><div class="may-quiz-results-stat-value">' + total + '</div><div class="may-quiz-results-stat-label">Questions</div></div>';
        html += '<div class="may-quiz-results-stat"><div class="may-quiz-results-stat-value">' + correct + '</div><div class="may-quiz-results-stat-label">Correct</div></div>';
        html += '<div class="may-quiz-results-stat"><div class="may-quiz-results-stat-value">' + (total - correct) + '</div><div class="may-quiz-results-stat-label">Missed</div></div>';
        html += '</div>';

        // Impact
        html += '<div class="may-quiz-results-impact ' + impactCls + '">';
        html += '<strong>' + readyMsg + '</strong><br>' + impactMsg;
        html += '</div>';

        // Actions
        html += '<div class="may-quiz-results-actions">';
        html += '<button class="may-quiz-results-btn primary" onclick="MayQuizController.restartQuiz()">&#128260; Quiz Again</button>';
        html += '<button class="may-quiz-results-btn secondary" onclick="MayQuizController._renderSetup()">&#128218; New Quiz</button>';
        if (accuracy < 80) {
            html += '<button class="may-quiz-results-btn danger" onclick="MayQuizController._launchRecoverySprint()">&#127919; Launch Recovery Sprint</button>';
        }
        html += '</div>';

        // Review items
        html += '<div class="may-quiz-results-review">';
        var missedCount = 0;
        for (var j = 0; j < quiz.results.length; j++) {
            var r = quiz.results[j];
            var q = r.question;
            var reviewCls = r.isCorrect ? 'correct-review' : 'wrong-review';
            if (r.isCorrect && accuracy >= 80) continue; // Skip correct if doing well
            if (!r.isCorrect) missedCount++;
            html += '<div class="may-quiz-review-item ' + reviewCls + '">';
            html += '<div class="may-quiz-review-item-q">Q' + (j + 1) + ': ' + (r.isCorrect ? '&#10003; Correct' : '&#10007; Missed') + ' &middot; ' + (q.Section || '') + ' &middot; ' + (q.Difficulty || '') + '</div>';
            html += '<div>' + nl2br((q.Stem || '').substring(0, 180)) + (q.Stem && q.Stem.length > 180 ? '...' : '') + '</div>';
            if (!r.isCorrect) {
                var cc = q.CorrectChoice;
                var ct = q.Choices && q.Choices[cc] ? q.Choices[cc] : '';
                html += '<div style="margin-top:4px;color:#ef4444;font-weight:600;">Correct: ' + cc + '. ' + ct.substring(0, 120) + '</div>';
            }
            html += '</div>';
            if (missedCount >= 3 && r.isCorrect) break; // Limit review items
        }
        html += '</div>';

        html += '</div>';
        el.innerHTML = html;

        // Store for navigation back to results
        this._lastQuizForResults = quiz;
    },

    _launchRecoverySprint() {
        var quiz = this.currentQuiz || this._lastQuizForResults;
        if (!quiz) return;
        // Save missed QIDs to recovery-candidates collection
        for (var i = 0; i < quiz.results.length; i++) {
            if (!quiz.results[i].isCorrect) {
                CMAProfileManager.addToCollection('recovery-candidates', quiz.results[i].question.QuestionID);
            }
        }
        // Launch recovery sprint
        showView('studyView');
        renderStudyView();
        setTimeout(function () {
            var recoveryEl = document.getElementById('recoveryCandidates');
            if (recoveryEl) recoveryEl.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    },

    // ── Render quiz entry buttons in compact May view ──
    _renderQuizEntries() {
        var html = '';
        html += '<div class="may-quiz-entries">';
        html += '<button class="may-quiz-entry-btn" onclick="MayQuizController._renderSetup()"><span class="may-quiz-entry-icon">&#128218;</span> Quiz Me</button>';
        html += '<button class="may-quiz-entry-btn" onclick="MayQuizController._selectedFilter=\'weak\';MayQuizController._selectedValue=\'\';MayQuizController.startQuiz(\'weak\',\'\',\'knowledge\')"><span class="may-quiz-entry-icon">&#128200;</span> Weak Areas</button>';
        html += '<button class="may-quiz-entry-btn" onclick="MayQuizController._selectedFilter=\'recovery\';MayQuizController._selectedValue=\'\';MayQuizController.startQuiz(\'recovery\',\'\',\'knowledge\')"><span class="may-quiz-entry-icon">&#127919;</span> Recovery Quiz</button>';
        html += '<button class="may-quiz-entry-btn" onclick="MayQuizController._renderSetup()"><span class="may-quiz-entry-icon">&#128278;</span> Collections</button>';
        html += '</div>';
        return html;
    },

    // ── Quick start quiz from a known filter ──
    quickQuiz(filter, value, mode) {
        this._selectedFilter = filter;
        this._selectedValue = value || '';
        this._selectedMode = mode || 'knowledge';
        showView('coachView');
        this.startQuiz(filter, value, mode);
    }
};

// ── Override May compact coach to include quiz entries ──
(function () {
    var _origRenderCompactCoach = May && May._renderCompactCoach;
    if (typeof May !== 'undefined') {
        May._renderCompactCoach = function () {
            var el = document.getElementById('coachView');
            if (!el) return;
            var quizEntries = MayQuizController._renderQuizEntries();
            el.innerHTML = '<div class="may-compact">' +
                '<div class="may-compact-avatar">M</div>' +
                '<h3>May AI Coach</h3>' +
                '<p>Ready to help you analyze performance, identify weaknesses, and build your study plan.</p>' +
                quizEntries +
                '<button class="may-compact-open" onclick="May.renderView()" style="margin-top:16px;">Open Full Coach</button>' +
                '</div>';
        };
    }
})();

// ── S124: Help & Learning Center ──
function renderHelpCenter() {
    var tourComplete = false;
    try {
        var profile = CMAProfileManager.load();
        tourComplete = profile.onboarding && profile.onboarding.tourCompleted;
    } catch (e) { }

    var html = '<div class="help-center">';
    html += '<h2>Help &amp; Learning Center</h2>';

    // Quick Start
    html += '<div class="help-section"><h3>&#128640; Quick Start</h3>';
    html += '<div class="help-card" onclick="GuidedTour.start(\'beginner\')" style="cursor:pointer;">';
    html += '<b>Guided Tour</b> — A 9-step walkthrough of every feature. ' + (tourComplete ? '(Completed &#10003;)' : 'Recommended for first-time users.');
    html += '</div>';
    html += '<div class="help-card">';
    html += '<b>Start Studying</b> — Go to the <span class="help-link" onclick="showView(\'sessionView\')">Study tab</span>, select MCQ Practice, pick a question count, and click Start Session.</div>';
    html += '<div class="help-card">';
    html += '<b>Full Exam Simulation</b> — Select "Full Part 1 Simulation" to take a timed, 100-question exam with 2 case studies under realistic conditions.</div>';
    html += '</div>';

    // How It Works
    html += '<div class="help-section"><h3>&#10067; How It Works</h3>';
    html += '<div class="help-card"><b>Readiness Score</b> — A 0-100 score measuring your exam preparedness. May calculates it from your session accuracy, confidence calibration, and domain coverage. Scores above 70 indicate exam readiness.</div>';
    html += '<div class="help-card"><b>May Coach</b> — After each session, May reviews your performance, identifies weak domains, detects your study archetype, and recommends targeted practice or Recovery Sprints.</div>';
    html += '<div class="help-card"><b>Recovery Sprint</b> — A focused mini-session targeting your weakest topics from recent errors. Complete a sprint, and May shows a before/after readiness comparison.</div>';
    html += '<div class="help-card"><b>Confidence Calibration</b> — Rate your confidence on each answer. May tracks whether you are well-calibrated (confident when right, unsure when wrong) and flags miscalibration.</div>';
    html += '</div>';

    // Feature Tours
    html += '<div class="help-section"><h3>&#128269; Feature Tours</h3>';
    html += '<div class="help-tour-grid">';
    html += '<button class="help-tour-btn" onclick="GuidedTour.start(\'beginner\')">&#9654; Beginner Tour</button>';
    html += '<button class="help-tour-btn" onclick="GuidedTour.start(\'recovery\')">&#9654; Recovery Sprint</button>';
    html += '<button class="help-tour-btn" onclick="GuidedTour.start(\'may\')">&#9654; May Coach</button>';
    html += '<button class="help-tour-btn" onclick="GuidedTour.start(\'analytics\')">&#9654; Analytics</button>';
    html += '<button class="help-tour-btn" onclick="GuidedTour.start(\'admin\')">&#9654; Admin Console</button>';
    html += '</div></div>';

    // Troubleshooting
    html += '<div class="help-section"><h3>&#128295; Data Management</h3>';
    html += '<div class="help-card"><b>Backup Progress</b> — Go to <span class="help-link" onclick="showView(\'settingsView\')">Settings</span> and click "Backup All Progress." This downloads a JSON file with all your sessions, collections, and May coaching data. Save it somewhere safe.</div>';
    html += '<div class="help-card"><b>Restore Progress</b> — In Settings, click "Restore Progress" and select your backup JSON file. A safety backup is created automatically before restoring.</div>';
    html += '<div class="help-card"><b>Reset All Data</b> — Admin-only: Open the Operations console (requires admin activation), go to the Data tab, and click "Reset All Learner Data." A backup is created before clearing.</div>';
    html += '<div class="help-card"><b>Moving Devices</b> — Backup on your old device, transfer the JSON file, and Restore on your new device. Your entire study history comes with you.</div>';
    html += '</div>';

    // FAQ
    html += '<div class="help-section"><h3>&#10068; FAQ</h3>';
    html += '<div class="help-card"><b>Are these real CMA exam questions?</b> No. All content is original study material aligned to the IMA CMA Part 1 Content Specification Outline. These are not real exam questions, not official IMA samples, and not endorsed by IMA.</div>';
    html += '<div class="help-card"><b>How many questions are there?</b> 2,545 multiple-choice questions across 5 question packs (A-E), plus 75 integrated case studies with ~5 items each. Content covers all 6 blueprint domains.</div>';
    html += '<div class="help-card"><b>Can I pause during an exam?</b> Yes, unless "Simulate Real Exam Conditions" is checked. Note: the real CMA exam does not allow pausing. This feature is a study aid only.</div>';
    html += '<div class="help-card"><b>Does May work offline?</b> May coaching runs entirely in your browser. No internet connection is required after the initial page load.</div>';
    html += '</div>';

    html += '</div>';

    var el = document.getElementById('helpView');
    if (el) el.innerHTML = html;
}

// ── S124: Help button in toolbar ──
function renderHelpButton() {
    var nav = document.querySelector('.tabs');
    if (!nav || document.getElementById('helpTabBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'helpTabBtn';
    btn.className = 'tab help-tab';
    btn.setAttribute('data-view', 'helpView');
    btn.title = 'Help & Learning Center';
    btn.textContent = '?';
    btn.onclick = function () {
        showView('helpView');
        renderHelpCenter();
    };
    nav.appendChild(btn);
}

// ── S124: Auto-launch first-run tour on DOM ready ──
function initS124Onboarding() {
    renderHelpButton();
    AdminGate.init();
    // Delay tour check to let views render
    setTimeout(function () {
        GuidedTour.checkFirstRun();
    }, 800);
}

// ── Wire S124 init to DOMContentLoaded ──
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initS124Onboarding);
} else {
    initS124Onboarding();
}
