# Independent Review Prompt — Timer Pause-Clock Fix (Third-Party Review)

## Context

You are reviewing a **timer integrity fix** for the CMA Exam Simulator (`app/app.js`). This is a focused, learner-facing correctness review — not a content review. No question banks, answer keys, or certification states were touched.

**Bug report (verbatim):** A learner paused a practice exam, returned later, and found a large amount of time had been lost — the session could not be completed. This is a recurrence: an earlier pause bug was remediated on 2026-08-31 (in-memory resume now folds the pause gap out of the elapsed clock), but the failure happened again.

**Governing rule (§19.1, project standing guidance):** the elapsed-time clock must reflect only actively-running time. Paused time must never count as elapsed, on ANY resume path (in-page resume, reload recovery, checkpoint fallback).

## Claimed Root Cause (audit this)

The 2026-08-31 fix covered only the **in-memory** resume path. It missed the **persistence** path:

1. `pause()` sets `paused=true` + `_pausedAt=now` and STOPS auto-save — but never persists the transition.
2. No `beforeunload`/`pagehide` save handler exists anywhere (verified by repo-wide grep — zero matches).
3. So a reload/tab-close/crash during pause restores the last pre-pause snapshot (`paused:false`, stale `start` epoch).
4. The recovery-resume guard (`if (paused && _pausedAt)`) then fails to match, no epoch fold occurs, and the **entire pause gap counts as elapsed** → drained timer, possible instant force-submit.
5. A second, related hole: `restore()` validity (`elapsed < duration`, raw wall-clock) would **refuse recovery entirely** for a session paused longer than its remaining time — the user loses the whole in-progress session with no modal at all.
6. Dead `pausedElapsed: 0` fields (declared at session creation, never read anywhere) were retained, repeating the exact pattern that masked the original 2026-08-31 bug.

## The Fix (verbatim diff, `app/app.js` — the complete change-set)

```diff
@@ SessionPersistence — new helper, both restore paths rewired
+    _activeElapsedSec(sn) {
+        let gap = 0;
+        if (sn && sn.session && sn.session.paused && sn.session._pausedAt) {
+            gap = Math.max(0, Date.now() - sn.session._pausedAt);
+        }
+        return Math.floor((Date.now() - sn.session.start - gap) / 1000);
+    },
     _restoreFromCheckpoints() {
-                const elapsed = Math.floor((Date.now() - sn.session.start) / 1000);
+                const elapsed = this._activeElapsedSec(sn);
     restore() {
-                    const elapsed = Math.floor((Date.now() - sn.session.start) / 1000);
+                    const elapsed = this._activeElapsedSec(sn);

@@ ExamSessionManager.start() — dead field removed
             paused: false,
-            pausedElapsed: 0,
             tierCounts: tierCounts,

@@ ExamSessionManager.pause() — persist the transition
             AnalyticsCollector.logEvent('session_resume', {});
         }
+        try { SessionPersistence.saveImmediate(); } catch (e) {}
         this.render();
     },

@@ recovery sprint creation — dead field removed
             paused: false,
-            pausedElapsed: 0,
             tierCounts: {},

@@ recoveryResume handler — legacy/corrupt hardening
             if (state.session.paused && state.session._pausedAt) {
                 state.session.start += (Date.now() - state.session._pausedAt);
                 state.session._pausedAt = null;
+            } else if (state.session.paused) {
+                state.session._pausedAt = Date.now();
             }
```

## Unchanged Context You Must Assume True (verified in-repo; challenge if implausible)

- `pause()` resume branch folds `Date.now() - _pausedAt` into `s.start` (in-memory resume — the 2026-08-31 fix, intact).
- `remaining()` excludes the active pause gap; the 1s `startTimer` tick early-returns while `paused`.
- `SessionPersistence.save()` serializes the ENTIRE session object (`paused`, `_pausedAt` included) with a checksum; `restore()` prefers the primary save, falls back to checkpoints.
- The checkpoint-restore path feeds the SAME recovery-resume handler, so the fold covers it.
- `pause()` early-returns in exam-integrity mode (Full Exam / real conditions) — pause is unavailable there, unaffected by this fix.
- Both resume buttons (pause-button toggle, overlay Resume button) route through the `pause()` toggle.
- `pausedElapsed` had zero readers (declaration-only, both sites removed).

## Review Scope (check each, report PASS/FAIL with reasoning)

1. **Root-cause validity**: does the persistence gap fully explain "lost a lot of time, unable to complete" after a pause + later return? Is any OTHER path (laptop sleep with live context, checkpoint fallback with stale data, keyboard navigation while paused) still able to burn paused time?
2. **Fix correctness — `saveImmediate()` in `pause()`**: any re-entrancy, exception, or ordering hazard (save before vs after `render()`)? Does persisting on EVERY toggle create a failure mode the old code didn't have (e.g., storage-full during pause)?
3. **Fix correctness — `_activeElapsedSec`**: sign/edge analysis — `_pausedAt` in the future (clock skew), `_pausedAt` zero/missing (guarded?), negative gap (clamped?), non-paused sessions (gap=0, identical to old behavior — confirm zero behavior change for the common path).
4. **Fix correctness — legacy `else if` branch**: is "stay paused with a fresh anchor" the right disposition, or should it fold-and-resume / discard? Any path where `paused=true` + re-anchored `_pausedAt` + started timer can still drain?
5. **Force-submit path intact**: `remaining() === 0` still submits immediately with no confirmation; the confirm-finish guard interval still auto-submits on expiry. Confirm the fix cannot brick a genuinely-expired session (e.g., paused flag stuck true blocking submit).
6. **Exam-integrity isolation**: confirm zero behavior change for Full Exam / real-conditions sessions (pause unreachable there; `remaining()`, tick, and submit paths untouched).
7. **Dead-field removal safety**: confirm `pausedElapsed` has no reader/writer left (dynamic access, string-key access, May-layer references).
8. **Test adequacy** (results below): do the W1-D (6 checks) and W1-D2 (2 checks) scenarios actually reproduce the reported bug pre-fix — i.e., would they FAIL on the old code? Identify any scenario from the bug report they miss (e.g., multi-hour pause, pause→answer→reload, double pause toggle, crash mid-pause with corrupt primary → checkpoint fallback).

## Test Evidence (in-repo runs, same change-set)

- `scripts/smoke_test.js` W1-D (new, 6 checks — all PASS): session starts with positive remaining → pause shows overlay → in-memory pause freezes clock (5392s → 5392s) → reload-during-pause keeps paused state → clock preserved across reload round-trip (5392s → 5390s, 2s tick slop) → explicit resume preserves clock and dismisses overlay.
- `scripts/smoke_test.js` W1-D2 (new, 2 checks — all PASS): simulated overnight pause (6000s gap, raw elapsed past duration) → recovery still offered (previously: no modal, session lost) → clock alive after restore and still paused.
- Full `npm run smoke`: PASS (all UI surfaces). `node scripts/thorough_test.js`: PASS 31/31. `npm run preflight`: 0 divergences, guard 89/89.

## Output Format

```json
{
  "scopeItem": "1-root-cause | 2-persist | 3-validity | 4-legacy | 5-submit | 6-integrity | 7-deadfield | 8-tests",
  "verdict": "PASS | FAIL | CONCERN",
  "reasoning": "exact mechanism, with line-level references to the blocks above",
  "counterScenario": "concrete steps that break it, if any (else null)"
}
```

Return a JSON array (8 entries) plus:
- Overall verdict: APPROVE / APPROVE-WITH-NOTES / REJECT
- Any missed scenario with reproduction steps
- Whether W1-D/W1-D2 would fail pre-fix (test-validity judgment)

## Review Rules

- Treat "not found in my copy" as an index limitation, not a finding — all evidence you need is quoted above.
- Distinguish correctness defects (wrong clock → learner harm) from style notes.
- The forced-submit-at-zero path is legitimate time-expiry behavior and must keep working — flag anything that weakens it.
