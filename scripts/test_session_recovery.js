// ============================================================
// Session Recovery — Reliability Test Suite
// Sprint 6.2.1 — Validates all 12 test-matrix scenarios
// ============================================================
// Usage: node scripts/test_session_recovery.js
// Output: PASS/FAIL per test with details

// ── Mock localStorage ──────────────────────────────────────
const store = new Map();
global.localStorage = {
    getItem: k => store.get(k) ?? null,
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k),
    clear: () => store.clear(),
    get length() { return store.size; },
    key: i => [...store.keys()][i] ?? null
};

// ── Mock helpers (minimal) ────────────────────────────────
function showSaveStatus(t, c) { /* noop */ }
function persistSaveStatus(t, c) { /* noop */ }

const state = { session: null, calcDisplay: '0', calcMemory: 0, analytics: null };

// ── SessionPersistence (copied from app.js) ───────────────
const SessionPersistence = {
    SAVE_KEY: 'cmaP1SessionState',
    CHECKPOINT_KEY: 'cmaP1SessionCheckpoints',
    JOURNAL_KEY: 'cmaP1SessionJournal',
    HISTORY_KEY: 'cmaP1History2026',
    SEEN_KEY: 'cmaP1SeenQuestions2026',
    DASHBOARD_KEY: 'cmaP1Dashboard',
    MAX_CHECKPOINTS: 20,
    MAX_RETRIES: 3,

    save() {
        if (!state.session) return;
        try {
            const sn = this._buildSnapshot();
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(sn));
            if (sn.session && sn.session.completed) {
                localStorage.removeItem(this.CHECKPOINT_KEY);
                localStorage.removeItem(this.JOURNAL_KEY);
            }
            this._verifySave(sn);
        } catch (e) {
            this._retrySave(this._buildSnapshot());
        }
    },

    saveImmediate() { this.save(); },

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
        if (attempt >= this.MAX_RETRIES) return;
        setTimeout(() => {
            try {
                localStorage.setItem(this.SAVE_KEY, JSON.stringify(snapshot));
            } catch (e) { /* fall through */ }
            this._retrySave(snapshot, attempt + 1);
        }, 1);
    },

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

    checkpointBeforeTransition() {
        this.addCheckpoint();
        this.save();
    },

    guardedTransition(targetFn) {
        this.checkpointBeforeTransition();
        try { targetFn(); } catch (e) {
            if (this._restoreFromCheckpoints()) {
                persistSaveStatus('Recovery used — progress restored', 'recovery');
            }
        }
    },

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

    clear() {
        localStorage.removeItem(this.SAVE_KEY);
        localStorage.removeItem(this.CHECKPOINT_KEY);
        localStorage.removeItem(this.JOURNAL_KEY);
    },
};

// ── Test harness ──────────────────────────────────────────
let passed = 0, failed = 0;

function test(name, fn) {
    try {
        fn();
        passed++;
        console.log(`  PASS: ${name}`);
    } catch (e) {
        failed++;
        console.log(`  FAIL: ${name} — ${e.message}`);
    }
}

function assert(cond, msg) {
    if (!cond) throw new Error(msg || 'assertion failed');
}

// ── Create a mock session ─────────────────────────────────
function makeSession(overrides) {
    const now = Date.now();
    return {
        mode: 'full',
        mcqs: [
            { QuestionID: 'P1A-Q001', CorrectChoice: 'C' },
            { QuestionID: 'P1A-Q002', CorrectChoice: 'B' },
            { QuestionID: 'P1A-Q003', CorrectChoice: 'A' },
        ],
        cases: [{ CaseID: 'CASE-001', SectionTags: ['A'], Items: [{ Stem: 'Item 1' }] }],
        answers: {},
        flags: {},
        guessed: {},
        confidence: {},
        caseAnswers: {},
        caseFlags: {},
        start: now,
        duration: 10800,
        qIndex: 0,
        caseIndex: 0,
        sections: ['A'],
        completed: false,
        submitted: false,
        ...overrides
    };
}

function fullReset() {
    store.clear();
    state.session = null;
    state.calcDisplay = '0';
    state.calcMemory = 0;
    state.analytics = null;
}

function resetState() {
    state.session = null;
    state.calcDisplay = '0';
    state.calcMemory = 0;
    state.analytics = null;
}

// ═══════════════════════════════════════════════════════════
// Test 1 — Close browser during MCQ
// ═══════════════════════════════════════════════════════════
test('Test 1: Close browser during MCQ', function() {
    fullReset();
    state.session = makeSession({
        answers: { 'P1A-Q001': 'C', 'P1A-Q002': 'B' },
        flags: { 'P1A-Q003': true },
        confidence: { 'P1A-Q001': 4, 'P1A-Q002': 3 },
        guessed: { 'P1A-Q002': true },
        qIndex: 1,
    });
    SessionPersistence.save();
    assert(localStorage.getItem('cmaP1SessionState'), 'Save key should exist');

    // Simulate browser close + reopen
    resetState();
    const restored = SessionPersistence.restore();
    assert(restored === true, 'restore() should return true');
    assert(state.session.answers['P1A-Q001'] === 'C', 'Answer P1A-Q001 should be C');
    assert(state.session.answers['P1A-Q002'] === 'B', 'Answer P1A-Q002 should be B');
    assert(state.session.flags['P1A-Q003'] === true, 'Flag P1A-Q003 preserved');
    assert(state.session.confidence['P1A-Q001'] === 4, 'Confidence P1A-Q001 preserved');
    assert(state.session.guessed['P1A-Q002'] === true, 'Guessed P1A-Q002 preserved');
    assert(state.session.qIndex === 1, 'qIndex should be 1');
});

// ═══════════════════════════════════════════════════════════
// Test 2 — Close browser during case study
// ═══════════════════════════════════════════════════════════
test('Test 2: Close browser during case study', function() {
    fullReset();
    state.session = makeSession({
        answers: { 'P1A-Q001': 'C', 'P1A-Q002': 'B', 'P1A-Q003': 'A' },
        qIndex: 3, // past MCQs
        caseIndex: 0,
        caseAnswers: { 'CASE-001-Q0': 'D' },
        caseFlags: { 'CASE-001-Q0': true },
    });
    SessionPersistence.save();
    SessionPersistence.addCheckpoint();

    resetState();
    const restored = SessionPersistence.restore();
    assert(restored === true, 'restore() should return true');
    assert(state.session.qIndex === 3, 'qIndex should be 3 (past MCQs)');
    assert(state.session.caseIndex === 0, 'caseIndex should be 0');
    assert(state.session.caseAnswers['CASE-001-Q0'] === 'D', 'Case answer should be D');
    assert(state.session.caseFlags['CASE-001-Q0'] === true, 'Case flag should be true');
});

// ═══════════════════════════════════════════════════════════
// Test 3 — Force-refresh (F5)
// ═══════════════════════════════════════════════════════════
test('Test 3: Force-refresh (F5)', function() {
    fullReset();
    state.session = makeSession({
        answers: { 'P1A-Q001': 'A' },
        flags: { 'P1A-Q001': true },
        qIndex: 1,
    });
    state.calcDisplay = '42.5';
    state.calcMemory = 100;
    SessionPersistence.save();

    // Simulate refresh: clear state but keep localStorage
    state.session = null;
    state.calcDisplay = '0';
    state.calcMemory = 0;

    const restored = SessionPersistence.restore();
    assert(restored === true, 'restore() should return true');
    assert(state.session.answers['P1A-Q001'] === 'A', 'Answer preserved after F5');
    assert(state.session.flags['P1A-Q001'] === true, 'Flag preserved after F5');
    assert(state.session.qIndex === 1, 'qIndex preserved after F5');
    assert(state.calcDisplay === '42.5', 'Calculator display restored');
    assert(state.calcMemory === 100, 'Calculator memory restored');
});

// ═══════════════════════════════════════════════════════════
// Test 4 — Browser crash (corrupt save -> checkpoint fallback)
// ═══════════════════════════════════════════════════════════
test('Test 4: Browser crash (corrupt save -> checkpoint fallback)', function() {
    fullReset();
    state.session = makeSession({
        answers: { 'P1A-Q001': 'C', 'P1A-Q002': 'B' },
        flags: { 'P1A-Q003': true },
    });
    SessionPersistence.save();
    SessionPersistence.addCheckpoint();

    // Corrupt the primary save
    localStorage.setItem('cmaP1SessionState', '{corrupted!!!');

    resetState();
    const restored = SessionPersistence.restore();
    assert(restored === true, 'restore() should return true from checkpoint fallback');
    assert(state.session.answers['P1A-Q001'] === 'C', 'Answer from checkpoint restored');
    assert(state.session.flags['P1A-Q003'] === true, 'Flag from checkpoint restored');
});

// ═══════════════════════════════════════════════════════════
// Test 5 — Transition MCQ -> Case (checkpoint created)
// ═══════════════════════════════════════════════════════════
test('Test 5: Transition MCQ -> Case', function() {
    fullReset();
    state.session = makeSession({
        answers: { 'P1A-Q001': 'C', 'P1A-Q002': 'B', 'P1A-Q003': 'A' },
        qIndex: 3,
    });
    SessionPersistence.checkpointBeforeTransition();
    const cps = SessionPersistence._getCheckpoints();
    assert(cps.length === 1, 'Checkpoint should be created on transition');
    assert(cps[0].session.qIndex === 3, 'Checkpoint should capture qIndex=3');

    const raw = localStorage.getItem('cmaP1SessionState');
    assert(raw !== null, 'Primary save should exist');
    const parsed = JSON.parse(raw);
    assert(parsed.session.qIndex === 3, 'Primary save should have qIndex=3');
    assert(SessionPersistence._verifySave(parsed), 'Checksum should verify');
});

// ═══════════════════════════════════════════════════════════
// Test 6 — Navigate back from Case to MCQ review
// ═══════════════════════════════════════════════════════════
test('Test 6: Transition Case -> MCQ review', function() {
    fullReset();
    state.session = makeSession({
        answers: { 'P1A-Q001': 'C', 'P1A-Q002': 'A' },
        qIndex: 1,
        caseAnswers: { 'CASE-001-Q0': 'B' },
    });
    SessionPersistence.save();

    // Navigate back (simulate clicking a review link)
    state.session.qIndex = 0;
    state.session.caseIndex = 0;
    SessionPersistence.saveImmediate();

    resetState();
    SessionPersistence.restore();
    assert(state.session.qIndex === 0, 'qIndex should be 0 after navigating back');
    assert(state.session.answers['P1A-Q001'] === 'C', 'Answer preserved');
});

// ═══════════════════════════════════════════════════════════
// Test 7 — Multiple answer changes (latest preserved)
// ═══════════════════════════════════════════════════════════
test('Test 7: Multiple answer changes (latest preserved)', function() {
    fullReset();
    state.session = makeSession();
    state.session.answers['P1A-Q001'] = 'A';
    SessionPersistence.saveImmediate();
    state.session.answers['P1A-Q001'] = 'B';
    SessionPersistence.saveImmediate();
    state.session.answers['P1A-Q001'] = 'C';
    SessionPersistence.saveImmediate();

    resetState();
    SessionPersistence.restore();
    assert(state.session.answers['P1A-Q001'] === 'C', 'Latest answer (C) restored');
});

// ═══════════════════════════════════════════════════════════
// Test 8 — Flag/unflag questions preserved
// ═══════════════════════════════════════════════════════════
test('Test 8: Flag/unflag questions', function() {
    fullReset();
    state.session = makeSession();
    state.session.flags['P1A-Q001'] = true;
    state.session.flags['P1A-Q002'] = true;
    SessionPersistence.saveImmediate();
    state.session.flags['P1A-Q001'] = false;
    SessionPersistence.saveImmediate();

    resetState();
    SessionPersistence.restore();
    assert(state.session.flags['P1A-Q001'] === false, 'P1A-Q001 should be unflagged');
    assert(state.session.flags['P1A-Q002'] === true, 'P1A-Q002 should remain flagged');
});

// ═══════════════════════════════════════════════════════════
// Test 9 — Timer preserved correctly
// ═══════════════════════════════════════════════════════════
test('Test 9: Timer preserved', function() {
    fullReset();
    const startTime = Date.now() - 60000; // 1 minute ago
    state.session = makeSession({ start: startTime, duration: 10800 });
    SessionPersistence.save();

    resetState();
    SessionPersistence.restore();
    assert(state.session !== null, 'session restored');
    assert(state.session.duration === 10800, 'duration preserved');
    const elapsed = Math.floor((Date.now() - state.session.start) / 1000);
    assert(elapsed >= 60, `Elapsed time (${elapsed}s) should be >= 60s`);
    assert(elapsed < state.session.duration, 'Elapsed should be less than duration');
});

// ═══════════════════════════════════════════════════════════
// Test 10 — Calculator memory restored
// ═══════════════════════════════════════════════════════════
test('Test 10: Calculator memory restored', function() {
    fullReset();
    state.session = makeSession({ answers: { 'P1A-Q001': 'C' } });
    state.calcDisplay = '123.45';
    state.calcMemory = 999;
    SessionPersistence.save();

    resetState();
    SessionPersistence.restore();
    assert(state.calcDisplay === '123.45', 'Calculator display should be 123.45');
    assert(state.calcMemory === 999, 'Calculator memory should be 999');
});

// ═══════════════════════════════════════════════════════════
// Test 11 — Analytics restored
// ═══════════════════════════════════════════════════════════
test('Test 11: Analytics restored', function() {
    fullReset();
    state.session = makeSession({ answers: { 'P1A-Q001': 'C' } });
    state.analytics = { totalQuestions: 3, answered: 1, correct: 1, accuracy: 1, bySection: { A: { total: 1, correct: 1 } } };
    SessionPersistence.save();

    resetState();
    SessionPersistence.restore();
    assert(state.analytics !== null, 'Analytics should be restored');
    assert(state.analytics.accuracy === 1, 'Accuracy should be 1');
    assert(state.analytics.bySection.A.correct === 1, 'Section A correct should be 1');
});

// ═══════════════════════════════════════════════════════════
// Test 12 — Finish exam clears recovery data
// ═══════════════════════════════════════════════════════════
test('Test 12: Finish exam clears recovery data', function() {
    fullReset();
    state.session = makeSession({ answers: { 'P1A-Q001': 'C' } });
    SessionPersistence.save();
    SessionPersistence.addCheckpoint();
    SessionPersistence.logAction('finish exam');

    // Complete exam
    state.session.completed = true;
    state.session.submitted = true;
    SessionPersistence.save();

    // Should not restore a completed exam
    resetState();
    const restored = SessionPersistence.restore();
    assert(restored === false, 'restore() should return false for completed exam');

    // clear() should remove all keys
    state.session = makeSession();
    SessionPersistence.save();
    assert(localStorage.getItem('cmaP1SessionState') !== null, 'save should work');
    SessionPersistence.clear();
    assert(localStorage.getItem('cmaP1SessionState') === null, 'SAVE_KEY removed');
    assert(localStorage.getItem('cmaP1SessionCheckpoints') === null, 'CHECKPOINT_KEY removed');
    assert(localStorage.getItem('cmaP1SessionJournal') === null, 'JOURNAL_KEY removed');
});

// ═══════════════════════════════════════════════════════════
// Summary
// ═══════════════════════════════════════════════════════════
console.log(`\n${'='.repeat(60)}`);
const total = passed + failed;
console.log(`Results: ${passed}/${total} passed, ${failed} failed`);
if (failed > 0) {
    console.log('SOME TESTS FAILED — Review failures before proceeding.');
    process.exit(1);
} else {
    console.log('ALL TESTS PASSED — Session Recovery System verified.');
    process.exit(0);
}
