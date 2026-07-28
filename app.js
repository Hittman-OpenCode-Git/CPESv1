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
// Constants
// ============================================================
const DECIMAL_PRECISION = 10000000000;
const round10 = v => Math.round(v * DECIMAL_PRECISION) / DECIMAL_PRECISION;
const CHOICES = ['A', 'B', 'C', 'D'];
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
      <div class="calc-title" id="calcDragHandle"><b>Calculator</b><span class="calc-memory-indicator">M: ${this.setValue(state.calcMemory)}</span><button class="calc-minimize" id="calcMinimize" aria-label="Minimize calculator">\u2212</button></div>
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
            if (c) { c.classList.toggle('minimized'); minBtn.textContent = c.classList.contains('minimized') ? '+' : '\u2212'; }
        };
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
                topicSnapshot
            });
            localStorage.setItem(this.HISTORY_KEY, JSON.stringify(h.slice(0, 100)));
            this.updateDashboard(h[0]);
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
const ExamSessionManager = {
    start(e) {
        e.preventDefault();
        let mode = $('mode').value;
        let secs = this.sectionsSelected();
        let c = this.getCounts();
        let dist = this.getDifficultyDistribution();
        let seen = [];
        try { seen = JSON.parse(localStorage.getItem(SessionPersistence.SEEN_KEY) || '[]'); } catch (e) { }

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

        let selection = this.selectWithDifficultyDistribution(sectionPool, c.mcqs, secs, dist, seen);
        let mcqs = selection.mcqs;
        let tierCounts = selection.tierCounts || {};

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

    selectWithDifficultyDistribution(tieredPool, count, sections, distribution, seen) {
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
                candidates = candidates.slice(0, target - filled);

                for (let q of candidates) {
                    let simKey = q._similarityKey || q.UniqueConceptKey || this._fallbackSimKey(q) || q.QuestionID;
                    usedKeys.add(simKey);
                    tierCounts[q._tier || 3] = (tierCounts[q._tier || 3] || 0) + 1;
                }
                result.push(...candidates);
                filled += candidates.length;
            }
        }

        // ---- Fill remaining count if short (fall through all tiers) ----
        let needed = count - result.length;
        if (needed > 0) {
            let remaining = shuffle(pool.filter(q =>
                !usedKeys.has(q._similarityKey || q.UniqueConceptKey || this._fallbackSimKey(q) || q.QuestionID)
            ));
            for (let q of remaining.slice(0, needed)) {
                tierCounts[q._tier || 3] = (tierCounts[q._tier || 3] || 0) + 1;
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
        if (!state.session || state.session.mode === 'full') return;
        if ($('realConditions')?.checked) return;
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
        AnalyticsCollector.logEvent('session_submit', {});
        SessionPersistence.saveHistory();
        SessionPersistence.clear();
        this.renderSummary('priority');
        if (typeof May !== 'undefined') May.handoffCompletedSession(state.session);
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
                $('sessionView').innerHTML = '<div class="empty-state"><div><h2>Ready for 2026-aligned original CMA Part 1 practice</h2><p>Select content to calculate the timer, then start a session. Review missed and marked questions after submission with targeted study links.</p></div></div>';
                // Re-inject May companion card on landing page
                if (typeof May !== 'undefined') {
                    sessionStorage.removeItem('mayCompanionDismissed');
                    setTimeout(() => { May._injectMayCompanionCard(); May._updateMayLauncherState(); }, 50);
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
                ${s.mode !== 'full' && !($('realConditions')?.checked) ? `<button id="pauseBtn" class="btn-icon" title="${s.paused ? 'Resume' : 'Pause'}">${s.paused ? '\u25B6' : '\u23F8'}</button>` : ''}
                <span class="timerblock"><span>Time remaining</span><span class="timer${this.remaining() < 300 ? (this.remaining() < 60 ? ' danger' : ' warning') : ''}">${fmt(this.remaining())}</span></span>
              </div>
            </div>
            ${s.paused ? '<div class="pause-overlay"><div class="pause-modal"><h2>Session Paused</h2><p>Your session has been paused. Timer, autosave, and navigation timer have been suspended.</p><div class="pause-disclaimer"><strong>Important:</strong> The official CMA exam does not allow pausing. The timer runs continuously in the real testing environment. This pause feature is a study aid provided by the simulator only.</div><button id="resumeBtn" class="primary">Resume Session</button></div></div>' : ''}
            ${s.mode !== 'full' && $('realConditions')?.checked ? '<div class="exam-notice">Simulate Real Exam Conditions is active. Pause is disabled. Timer runs continuously.</div>' : ''}
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
              <h2>${q.Stem}</h2>
              <div class="choices" role="radiogroup" aria-label="Answer choices">${CHOICES.map(c =>
                    `<button class="choice ${sel === c ? 'selected' : ''}" data-choice="${c}" role="radio" aria-checked="${sel === c}" tabindex="0"><span class="letter">${c}</span><span>${q.Choices[c]}</span></button>`
                ).join('')}</div>
              <div class="item-tools">
                <label class="flag"><input id="flagBox" type="checkbox" ${s.flags[q.QuestionID] ? 'checked' : ''}> Mark for review</label>
                <label class="guess"><input id="guessBox" type="checkbox" ${guessed ? 'checked' : ''}> I guessed</label>
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
                May._updateMayLauncherState();
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
            });
            let fb = $('flagBox');
            if (fb) fb.onchange = e => { s.flags[q.QuestionID] = e.target.checked; SessionPersistence.saveImmediate(); SessionPersistence.logAction('flag ' + q.QuestionID + '=' + e.target.checked); AnalyticsCollector.recordFlag(q.QuestionID, e.target.checked); };
            let gb = $('guessBox');
            if (gb) gb.onchange = e => { s.guessed[q.QuestionID] = e.target.checked; SessionPersistence.saveImmediate(); SessionPersistence.logAction('guess ' + q.QuestionID + '=' + e.target.checked); };
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
                ${s.mode !== 'full' && !($('realConditions')?.checked) ? `<button id="pauseBtn" class="btn-icon" title="${s.paused ? 'Resume' : 'Pause'}">${s.paused ? '\u25B6' : '\u23F8'}</button>` : ''}
                <span class="timerblock"><span>Time remaining</span><span class="timer${this.remaining() < 300 ? (this.remaining() < 60 ? ' danger' : ' warning') : ''}">${fmt(this.remaining())}</span></span>
              </div>
            </div>
            ${s.paused ? '<div class="pause-overlay"><div class="pause-modal"><h2>Session Paused</h2><p>Your session has been paused. Timer, autosave, and navigation timer have been suspended.</p><div class="pause-disclaimer"><strong>Important:</strong> The official CMA exam does not allow pausing. The timer runs continuously in the real testing environment. This pause feature is a study aid provided by the simulator only.</div><button id="resumeBtn" class="primary">Resume Session</button></div></div>' : ''}
            ${s.mode !== 'full' && $('realConditions')?.checked ? '<div class="exam-notice">Simulate Real Exam Conditions is active. Pause is disabled. Timer runs continuously.</div>' : ''}
            <h2>${c.Title}</h2>
            <div class="meta-row">${c.SectionTags.map(x => `<span class="pill">Section ${x}</span>`).join('')}<span class="pill">Exhibit-based case simulation</span></div>
            <p>${c.ScenarioText}</p>
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
            let exhibitHtml = activeExhibit ? (activeExhibit.Type === 'table' ?
                `<div class="case-exhibit"><h3>${activeExhibit.Title}</h3><table><thead><tr>${activeExhibit.Headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${activeExhibit.Rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
                : `<div class="case-exhibit"><h3>${activeExhibit.Title}</h3><p>${activeExhibit.Body}</p></div>`) :
                '<div class="case-exhibit"><h3>Scenario</h3><p>No separate exhibits provided.</p></div>';
            $('sessionView').innerHTML = `<div class="case-exam-shell">
          <section class="case-exam-exhibits">
            <div class="exam-top">
              <span>Case ${s.caseIndex + 1} of ${s.cases.length}</span>
              <div class="exam-top-right">
                <span class="timerblock"><span>Time remaining</span><span class="timer${this.remaining() < 300 ? (this.remaining() < 60 ? ' danger' : ' warning') : ''}">${fmt(this.remaining())}</span></span>
              </div>
            </div>
            <h2>${c.Title}</h2>
            <p>${c.ScenarioText}</p>
            <div class="exhibit-tabs">${(c.Exhibits || []).map((ex, i) => `<button class="exhibit-tab ${i === exhibitIndex ? 'active' : ''}" data-exhibit="${i}">${ex.Title}</button>`).join('')}</div>
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
        let flagHtml = `<label class="flag"><input type="checkbox" data-caseflag="${key}" ${isFlagged ? 'checked' : ''}> Mark for review</label>`;
        if (it.Type === 'numeric' || it.Type === 'fill') {
            return `<div class="case-question"><b>${idx + 1}. ${it.Prompt}</b><input class="case-input" data-casekey="${key}" value="${saved || ''}" inputmode="${it.Type === 'numeric' ? 'decimal' : 'text'}">${flagHtml}</div>`;
        }
        if (it.Type === 'multi') {
            return `<div class="case-question"><b>${idx + 1}. ${it.Prompt}</b>${it.Choices.map(ch =>
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
            return `<div class="case-question match-question"><b>${idx + 1}. ${it.Prompt}</b><div class="match-grid">${rows.join('')}</div>${flagHtml}</div>`;
        }
        return `<div class="case-question"><b>${idx + 1}. ${it.Prompt}</b>${it.Choices.map(ch =>
            `<label class="case-option"><input type="radio" name="${key}" data-casekey="${key}" value="${ch}" ${saved === ch ? 'checked' : ''}> ${ch}</label>`
        ).join('')}${flagHtml}</div>`;
    },

    caseExhibitsHtml(c) {
        if (!c.Exhibits || !c.Exhibits.length) return '';
        return `<div class="case-exhibits">${c.Exhibits.map(ex => {
            if (ex.Type === 'table') return `<div class="case-exhibit"><h3>${ex.Title}</h3><table><thead><tr>${ex.Headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${ex.Rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
            return `<div class="case-exhibit"><h3>${ex.Title}</h3><p>${ex.Body}</p></div>`;
        }).join('')}</div>`;
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
            let mcqRows = s.mcqs.map((q, i) =>
                `<tr><td>${i + 1}</td><td>${q.Section}</td><td>${q.Topic}</td><td>${s.answers[q.QuestionID] ? '<span class="status-answered">Answered</span>' : '<span class="status-unanswered">Unanswered</span>'}</td><td>${s.flags[q.QuestionID] ? '<span class="status-flagged">Flagged</span>' : ''}</td><td><button class="secondary smallbtn" data-jump="${i}">Go</button></td></tr>`
            ).join('');
            let caseRows = s.cases.map((c, i) =>
                `<tr><td>C${i + 1}</td><td>${c.SectionTags.join(', ')}</td><td>${c.Title}</td><td>Case set</td><td></td><td><button class="secondary smallbtn" data-casejump="${i}">Go</button></td></tr>`
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
          <table class="review-table"><thead><tr><th>#</th><th>Section</th><th>Topic</th><th>Status</th><th>Flag</th><th></th></tr></thead><tbody>${mcqRows}${caseRows}</tbody></table>
          <div class="exam-actions">
            <button id="backToItems" class="secondary">Back to Items</button>
            <button id="finishExam" class="primary">Submit Session</button>
          </div>
        </article>`;
            NavigationController.bind();
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

          <h3>Adaptive Review Queue</h3>
          <p class="small">Prioritized by: Incorrect (weight 5) &gt; Guesses (3) &gt; Low confidence (2) &gt; Slow correct (2) &gt; Marked (1).</p>
          <div class="review-controls">
            <button class="secondary" data-filter="priority">Priority</button>
            <button class="secondary" data-filter="missed">Missed Only</button>
            <button class="secondary" data-filter="marked">Marked Only</button>
            <button class="secondary" data-filter="all">All Items</button>
            <button id="again" class="primary">Start Another Session</button>
          </div>
          <div id="reviewCards">${reviewHtml}</div>

          ${CmaScoringDisclaimer('full')}
        </article>`;

            document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => this.renderSummary(b.dataset.filter));
            let a = $('again');
            if (a) a.onclick = () => $('sessionForm').requestSubmit();
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

        let mcqBtns = s.mcqs.map((q, i) =>
            `<button class="navitem ${i === current ? 'current' : ''} ${s.answers[q.QuestionID] ? 'answered' : ''} ${s.flags[q.QuestionID] ? 'flagged' : ''}" data-jump="${i}" title="${q.QuestionID || 'Q' + (i + 1)}">${i + 1}</button>`
        ).join('');
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

            if (item.type === 'mcq') {
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
                    correctDisplay = q.Correct;
                }
            }

            let priorityLabel = item.score >= 5 ? 'High' : item.score >= 3 ? 'Medium' : 'Low';
            let studyLinks = q.StudyLinks || STUDY_LINKS[q.Topic] || STUDY_LINKS['Case-based practice'] || [];

            return `<div class="feedback ${isCorrect ? 'good' : 'bad'} ${item.flagged ? 'marked' : ''}" data-priority="${item.score}">
          <div class="feedback-header">
            <span class="priority-badge ${priorityLabel.toLowerCase()}">${priorityLabel} priority (${item.score})</span>
            <span class="feedback-id">${item.questionID}</span>
            <span>${item.section} | ${item.topic}</span>
          </div>
          <p>${q.Prompt || q.Stem || ''}</p>
          <p><b>Your answer:</b> ${ansDisplay}</p>
          <p><b>Correct answer:</b> ${correctDisplay}</p>
          ${q.Explanation || q.ExplanationCorrect ? `<div class="explanation"><b>Explanation:</b> ${q.Explanation || q.ExplanationCorrect}</div>` : ''}
          ${item.confidence ? `<p><b>Confidence:</b> ${item.confidence}/5 ${item.guessed ? '(Guessed)' : ''}</p>` : ''}
          ${studyLinks.length ? `<div class="remediate"><b>Study:</b> ${studyLinks.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>` : ''}
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
            let bg = r.priority === 'high' ? '#fef2f2' : r.priority === 'medium' ? '#fff7ed' : '#f0f9ff';
            let border = r.priority === 'high' ? '#fca5a5' : r.priority === 'medium' ? '#fdba74' : '#bae6fd';
            let icon = r.priority === 'high' ? '!' : r.priority === 'medium' ? '>' : 'i';
            return `<div style="background:${bg};border:1px solid ${border};border-radius:6px;padding:10px;margin:8px 0;font-size:0.9rem;"><span style="font-weight:700;margin-right:8px;">${icon}</span><strong>${r.category}:</strong> ${r.text}</div>`;
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
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    CalculatorEngine.render();
    renderValidation();
    // Session 96: Defer diagnostics until after manifest loads (~200ms for fetch)
    setTimeout(renderDefectDiagnostics, 300);
    ExamSessionManager.render();
    renderCatalog();
    ExamSessionManager.renderHistory();
    updateTimeEstimate();

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
            (s ? '<p>You have an in-progress exam session from <strong>' + timeStr + '</strong> ago.</p>' : '<p>You have an in-progress exam session.</p>') +
            '<p class="small">Your progress is automatically saved. You can resume where you left off.</p>' +
            '<div class="recovery-modal-actions">' +
            '<button id="recoveryResume" class="primary">Resume Session</button>' +
            '<button id="recoveryDiscard" class="secondary">Discard &amp; Start New</button>' +
            '</div></div>';
        document.body.appendChild(modal);
        $('recoveryResume').onclick = () => {
            modal.remove();
            persistSaveStatus('Your previous exam session was successfully restored. All progress has been recovered.', 'recovery');
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
        // Hide May companion card when session starts
        if (typeof May !== 'undefined') {
            let card = document.getElementById('mayCompanionCard');
            if (card) card.remove();
        }
        ExamSessionManager.start(e);
    };
    document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
        showView(t.dataset.view);
        if (t.dataset.view === 'dashboardView') PerformanceDashboard.render();
        if (t.dataset.view === 'coachView') {
            if (typeof May !== 'undefined') May.renderView(); else ReviewCoach.renderFullCoach();
        }
        if (t.dataset.view === 'sessionView') {
            // Re-show May companion card when returning to landing view (no active session)
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

    var diag = document.getElementById('defectDiagnostics');
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
    let html = '<b>Catalog status</b><br>';
    let allOk = true;
    for (let [label, bank] of Object.entries(banks)) {
        let ok = bank.length === 0 || (bank.length >= 75 && new Set(bank.map(q => q.Stem)).size === bank.length);
        if (bank.length > 0 && !ok) allOk = false;
        let counts = {};
        bank.forEach(q => counts[q.Section] = (counts[q.Section] || 0) + 1);
        html += `Pack ${label}: ${bank.length} MCQs ${ok ? '\u2713' : '\u2717'}`;
        if (bank.length) html += ` | ${Object.entries(counts).map(([s, c]) => s + ': ' + c).join(' | ')}`;
        html += '<br>';
    }
    let caseBanks = {
        'A': (typeof CASE_BANK_A !== 'undefined' ? CASE_BANK_A : (typeof MIGRATED_CASE_BASE_A !== 'undefined' ? MIGRATED_CASE_BASE_A : [])),
        'B': (typeof CASE_BANK_B !== 'undefined' ? CASE_BANK_B : (typeof MIGRATED_CASE_BASE_B !== 'undefined' ? MIGRATED_CASE_BASE_B : [])),
        'C': (typeof CASE_BANK_C !== 'undefined' ? CASE_BANK_C : (typeof MIGRATED_CASE_BASE_C !== 'undefined' ? MIGRATED_CASE_BASE_C : [])),
        'D': (typeof CASE_BANK_D !== 'undefined' ? CASE_BANK_D : (typeof MIGRATED_CASE_BASE_D !== 'undefined' ? MIGRATED_CASE_BASE_D : [])),
        'E': (typeof CASE_BANK_E !== 'undefined' ? CASE_BANK_E : (typeof MIGRATED_CASE_BASE_E !== 'undefined' ? MIGRATED_CASE_BASE_E : []))
    };
    for (let [label, cb] of Object.entries(caseBanks)) html += `Pack ${label}: ${cb.length} cases<br>`;
    html += `<b>${allOk ? 'All packs validated' : 'Some packs have issues'}</b>`;
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
    let packLabels = { 'A': 'Pack A (Original)', 'B': 'Pack B', 'C': 'Pack C', 'D': 'Pack D', 'E': 'Pack E' };
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
