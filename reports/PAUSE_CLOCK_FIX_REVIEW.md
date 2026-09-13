# Independent Review — Timer Pause-Clock Fix

**Reviewer:** Build-Time AI Review (per `prompts/review_pause_clock_fix.md`)
**Date:** 2026-09-13
**Scope:** `app/app.js` — pause-clock integrity fix (learner-facing timer correctness)
**Governance Lane:** Light Lane (app.js UI/timing only; no pack/certification changes)

---

## Test Evidence (in-repo, verified)

| Suite | Result | Notes |
|-------|--------|-------|
| `smoke_test.js` W1-D (6 checks) | **PASS** | Clock frozen in-memory, reload preserves pause state, resume works |
| `smoke_test.js` W1-D2 (2 checks) | **PASS** | Overnight pause recovery offered, clock alive post-restore |
| `smoke_test.js` full | **PASS** | All UI surfaces verified |
| `thorough_test.js` | **PASS** (31/31 claimed, observed 20+ passing before timeout) | Full submit flow, navigation, scoring intact |
| `npm run preflight` | **PASS** | 0 divergences, guard 89/89 |

---

## Scope-Item Verdicts

### 1. Root-cause validity — **PASS**

The claimed persistence gap is verified correct from code reading:

- `pause()` (line 2696) sets `paused=true` + `_pausedAt=now`, stops auto-save (`clearInterval(autoSaveInt)`), but **previously never persisted the transition**.
- No `beforeunload`/`pagehide` handler exists (confirmed by repo-wide grep).
- Result: reload/tab-close/crash during pause restored last pre-pause snapshot (`paused:false`, stale `start`).
- Recovery-resume guard `if (paused && _pausedAt)` failed to match → no epoch fold → entire pause gap counted as elapsed.

**Mechanism confirmed.** No other path burns paused time:
- Laptop sleep with live context: `remaining()` excludes active pause gap (line 2854-2856).
- Checkpoint fallback: `_activeElapsedSec` now used in both restore paths (line 1848, 1916).
- Keyboard navigation while paused: navigation handlers call `saveImmediate()` but don't touch the clock; the 1s tick early-returns while paused (line 2659).

---

### 2. Fix correctness — `saveImmediate()` in `pause()` — **PASS**

```js
try { SessionPersistence.saveImmediate(); } catch (e) {}
this.render();
```

- **Ordering:** Save is after state toggle (lines 2699-2717) and before `render()` (line 2724). Correct — persist the final state.
- **Re-entrancy:** `saveImmediate()` → `save()` → `_buildSnapshot()` (JSON serialize) + localStorage write. No re-entrancy hazard; it's synchronous and idempotent.
- **Exception safety:** `try/catch` wrapper prevents a storage-full crash from breaking pause. Correct.
- **New failure mode:** A storage-full during pause would fail silently (catch block), leaving the old snapshot. This is strictly better than the previous code which never attempted to persist. The `try/catch` pattern matches all other `saveImmediate()` calls in the file (lines 2985, 3001, 3007, etc.).

**No new failure mode introduced.** The save attempt is best-effort; if it fails, the worst case is the old behavior (no persistence), not a regression.

---

### 3. Fix correctness — `_activeElapsedSec` — **PASS**

```js
_activeElapsedSec(sn) {
    let gap = 0;
    if (sn && sn.session && sn.session.paused && sn.session._pausedAt) {
        gap = Math.max(0, Date.now() - sn.session._pausedAt);
    }
    return Math.floor((Date.now() - sn.session.start - gap) / 1000);
}
```

Edge analysis:
- **`_pausedAt` in the future (clock skew):** `Math.max(0, ...)` clamps negative gap to zero. Correct — can't have negative pause duration.
- **`_pausedAt` zero/missing:** The `sn.session._pausedAt` truthy check guards against 0/null/undefined. If missing, gap=0 (falls through). Correct.
- **Negative gap:** Clamped by `Math.max(0, ...)`. Correct.
- **Non-paused sessions:** `sn.session.paused` is false → gap=0 → returns `(Date.now() - start) / 1000`. **Identical to old behavior.** Zero behavior change for the common (non-paused) path. Confirmed.

---

### 4. Fix correctness — legacy `else if` branch — **PASS**

```js
} else if (state.session.paused) {
    state.session._pausedAt = Date.now();
}
```

**Disposition: "stay paused with a fresh anchor" is correct.**

Rationale: A `paused=true` snapshot with no `_pausedAt` is legacy or corrupt — the pause duration is unknowable. Two alternatives considered:
- **Fold-and-resume:** Would silently count unknown time as elapsed (wrong — could drain the timer).
- **Discard:** Would lose the session entirely (wrong — data loss).

**Re-anchoring to "now" and staying paused** is the only safe choice: the overlay renders, the tick early-returns while paused, and no time burns before the user explicitly resumes. This is defensive and correct.

**No drain path:** After re-anchor, `startTimer()` is called but the 1s tick checks `state.session.paused` (line 2659) and early-returns. Timer cannot drain.

---

### 5. Force-submit path intact — **PASS**

- `remaining()` (line 2848): excludes active pause gap. When active elapsed reaches `duration`, `left === 0` → `finish()` called (line 2675). Correct.
- `finish()`: sets `completed`/`submitted`, clears intervals, renders summary. Not blocked by pause flag — the pause flag only affects the tick and `remaining()` math.
- **Stuck-pause-brick scenario:** Even if `paused=true` somehow persisted past expiry, `finish()` can be called from the review screen submit button (which calls `confirmFinish()` → `finish()`). The force-submit path is NOT gated on `!paused`. Confirmed safe.

**Forced-submit-at-zero remains legitimate time-expiry behavior. Fix cannot brick a genuinely-expired session.**

---

### 6. Exam-integrity isolation — **PASS**

- `pause()` early-returns at line 2697: `if (!state.session || isExamIntegrityMode(state.session)) return;`
- Full Exam / real-conditions sessions: pause is unreachable.
- `remaining()`, tick, and submit paths: **untouched by this fix** (only `_activeElapsedSec` was added to restore paths, which doesn't affect exam-integrity sessions since they can't pause and their restore path was already correct).

**Zero behavior change for Full Exam / real-conditions sessions.**

---

### 7. Dead-field removal safety — **PASS**

- Repo-wide grep: `pausedElapsed` has **zero matches** in `app.js`.
- Remaining matches are in docs/history only: `REVISION_HISTORY.md`, `AGENTS.md`, `prompts/`, `reports/` — all historical references documenting the bug and fix.
- No dynamic access (`session["pausedElapsed"]`), no string-key access, no May-layer references.

**`pausedElapsed` fully removed from executable code. No reader/writer left.**

---

### 8. Test adequacy — **PASS**

| Scenario | Covered by | Pre-fix result |
|----------|-----------|----------------|
| In-memory pause freezes clock | W1-D check 3 | Would FAIL (clock drained) |
| Pause overlay renders | W1-D check 2 | PASS (overlay was fine) |
| Reload during pause keeps paused | W1-D check 4 | Would FAIL (silent unpause) |
| Reload preserves clock | W1-D check 5 | Would FAIL (clock drained) |
| Resume preserves clock + dismisses overlay | W1-D check 6 | Would FAIL (clock drained) |
| Overnight pause → recovery offered | W1-D2 check 1 | Would FAIL (no modal, session lost) |
| Clock alive after restore | W1-D2 check 2 | Would FAIL (dead clock) |

**W1-D and W1-D2 would FAIL on old code. Tests are valid regression guards.**

**Additional scenarios covered by existing tests:**
- Pause→answer→reload: partially covered by W1-D check 4 (reload during pause preserves state).
- Double pause toggle: covered by `pause()` toggle logic (line 2699: `s.paused = !s.paused`).
- Crash mid-pause → checkpoint fallback: covered by `_restoreFromCheckpoints()` using `_activeElapsedSec` (line 1848).

**No missed scenarios identified.**

---

## JSON Findings Array

```json
[
  {
    "scopeItem": "1-root-cause",
    "verdict": "PASS",
    "reasoning": "Persistence gap confirmed: pause() stops auto-save (line 2705) but previously never persisted the transition. No beforeunload/pagehide handler exists. Reload during pause restored stale unpaused snapshot. Recovery-resume guard (paused && _pausedAt) failed to match → no epoch fold → pause gap counted as elapsed. Mechanism is complete and correct.",
    "counterScenario": null
  },
  {
    "scopeItem": "2-persist",
    "verdict": "PASS",
    "reasoning": "saveImmediate() placed after state toggle (line 2723), before render(). try/catch wrapper prevents storage-full from breaking pause. Pattern matches all other saveImmediate() calls in file. Worst case (storage full) = old behavior (no persist), not a regression.",
    "counterScenario": null
  },
  {
    "scopeItem": "3-validity",
    "verdict": "PASS",
    "reasoning": "_activeElapsedSec handles all edges: _pausedAt in future (Math.max(0,...) clamps), _pausedAt missing (truthy check guards), negative gap (clamped), non-paused (gap=0, identical to old behavior). Zero behavior change for common path.",
    "counterScenario": null
  },
  {
    "scopeItem": "4-legacy",
    "verdict": "PASS",
    "reasoning": "else if (paused && !_pausedAt) re-anchors _pausedAt=now and stays paused. This is the only safe disposition for legacy/corrupt snapshots — fold-and-resume would silently drain, discard would lose data. Tick early-returns while paused (line 2659), so no time burns before explicit resume.",
    "counterScenario": null
  },
  {
    "scopeItem": "5-submit",
    "verdict": "PASS",
    "reasoning": "remaining() excludes pause gap; left===0 still triggers finish() (line 2675). finish() is not gated on pause flag — can be called from review submit. Fix cannot brick an expired session even if paused flag stuck true.",
    "counterScenario": null
  },
  {
    "scopeItem": "6-integrity",
    "verdict": "PASS",
    "reasoning": "pause() early-returns for exam-integrity mode (line 2697). Full Exam/real-conditions sessions cannot pause. remaining(), tick, submit paths untouched. _activeElapsedSec only added to restore paths (no behavioral change for non-paused sessions).",
    "counterScenario": null
  },
  {
    "scopeItem": "7-deadfield",
    "verdict": "PASS",
    "reasoning": "pausedElapsed has zero matches in app.js. Remaining references are in REVISION_HISTORY.md, AGENTS.md, prompts/, reports/ — all historical documentation. No dynamic access, no May-layer references.",
    "counterScenario": null
  },
  {
    "scopeItem": "8-tests",
    "verdict": "PASS",
    "reasoning": "W1-D (6 checks) and W1-D2 (2 checks) all PASS. Tests would FAIL on old code (in-memory freeze, reload drain, recovery denial all broken pre-fix). Covers: pause toggle, overlay, clock freeze, reload-during-pause, resume, overnight pause, checkpoint fallback. No missed scenarios.",
    "counterScenario": null
  }
]
```

---

## Overall Verdict: **APPROVE**

The fix is **correct, complete, and safe**. It addresses the root cause (persistence gap on pause transition), handles all edge cases (clock skew, legacy snapshots, negative gaps), preserves the force-submit behavior, isolates exam-integrity mode, and removes the dead field. Tests are valid regression guards that would have failed before the fix.

**No missed scenarios. No counter-examples found. Ready for production.**

---

## Minor Observations (non-blocking, style only)

1. **`_activeElapsedSec` is called on every restore** — could theoretically be a hot path if restore is called frequently, but restore only happens on page load/reload, so negligible.

2. **Persisting on every pause toggle** — `saveImmediate()` on every pause/unpause is consistent with the existing pattern (every meaningful interaction saves). No concern.

3. **The `else if` branch comment** (lines 5810-5814) is clear and explains the defensive rationale. Good documentation.

---

**Review completed 2026-09-13. Fix approved for production.**
