# Session 90P — Runtime Stability Plan

**Session:** 90P  
**Lane:** Governance Light  
**Date:** 2026-07-30  
**Status:** Active

---

## 1. Target Areas

### 1.1 Long-Session Stability
| Component | Concern | Current Mitigation |
|-----------|---------|-------------------|
| Memory | 2,545 MCQs + 400 case items loaded into memory | Acceptable — single-page app |
| localStorage | Session state + checkpoints + journal + history + dashboard | 5 keys max; checkpoint limit = 20 |
| Timer interval | `setInterval` every 1 second | Cleared on pause/complete |
| Autosave interval | `setInterval` every 5 seconds | Cleared on pause/complete |
| Event listeners | Dynamic binding per render cycle | Replaced on re-render |
| DOM accumulation | Full innerHTML replacement per render | Clean — no incremental DOM |

**Assessment:** Long-session stability is well-architected. No known leak paths. The `innerHTML` full-replacement pattern prevents DOM node accumulation. Timer and autosave intervals are explicitly cleared on completion and pause.

### 1.2 Navigation Stability
| Path | Implementation | Risk |
|------|---------------|------|
| MCQ prev/next | `s.qIndex--` / `s.qIndex++` then `render()` | Low |
| Case prev/next | `s.caseIndex--` / `s.caseIndex++` then `render()` | Low |
| MCQ→Case transition | Gate modal → `render()` | Low |
| Case→Review transition | `renderReviewScreen()` | Low |
| Navigator click | `navigateTo(idx)` | Low |
| Keyboard arrow keys | ArrowRight → qIndex++; ArrowLeft → qIndex-- | Low |
| Submit gate | `$('submitEarlyGate')` button | Low |
| Session recovery | `restore()` from localStorage | Medium — see DL-022 |

**Assessment:** Navigation is stable. DL-022 (null-array crash on corrupted restore) is already patched with Insertions 1+2.

### 1.3 Timer Stability
| Property | Value |
|----------|-------|
| Update interval | 1000ms |
| Calculation | `Math.floor((Date.now() - start) / 1000)` wall-clock based |
| Warnings | 900s, 300s, 60s — fired once per threshold |
| Pause | Clears `timerInt` and `autoSaveInt`; stores `pausedElapsed` offset |
| Resume | Recalculates remaining from wall-clock with offset |
| Auto-submit | Not implemented — timer reaching 0 does not auto-submit in current code |

**Concern:** Timer reaching 0 does NOT auto-submit (line 1543: `if (!state.session ... state.session.paused) return;` — completed sessions have `completed: false` until manually submitted). The timer display will show 0:00 but the session remains active. This is a design choice (candidates can continue after time expires for practice mode), but could confuse users who expect auto-submission.

### 1.4 Review Stability
| Path | Implementation |
|------|---------------|
| Pre-submit review | `renderReviewScreen()` — shows all items with answered/marked/unanswered counts |
| Post-submit review | `ReviewCoach` + May coaching layer |
| Missed/Marked filter | "Review Missed/Marked" button on results screen |
| Per-item review | Click item → show stem, choices, correct answer, explanation |

**Assessment:** Review paths are stable. The post-submit review rebuilds questions from session data, not from the original banks — this is correct behavior.

---

## 2. Runtime Diagnostics Framework

### 2.1 Startup Performance
| Metric | Measurement Method | Expected |
|--------|-------------------|----------|
| DOMContentLoaded | Performance API | < 500ms |
| Bank parsing | Parse completion timestamp | < 1000ms |
| First paint | Paint timing API | < 1000ms |
| Time to interactive | First click handled | < 2000ms |

### 2.2 Navigation Consistency
| Metric | Measurement Method |
|--------|-------------------|
| MCQ render time | Per-render duration |
| Case render time | Per-render duration |
| Navigator response | Click-to-render latency |
| Keyboard response | Keydown-to-render latency |

### 2.3 Review Performance
| Metric | Measurement Method |
|--------|-------------------|
| Review screen build time | renderReviewScreen() duration |
| Per-item click → display | Event handler latency |
| Study link resolution | Link lookup time |

### 2.4 End-Session Behavior
| Metric | Measurement Method |
|--------|-------------------|
| Submit → results latency | Submit button click to results render |
| Score calculation time | practiceScores() duration |
| History write time | saveHistory() duration |
| Dashboard update time | getDashboard() calculation |

---

## 3. Known Defenses (Already Implemented)

| Defense | Location | Purpose |
|---------|----------|---------|
| DL-022 fix | app.js:1182, 2004 | Null-guard on s.mcqs/s.cases |
| DL-006 fix | SessionPersistence.save() | Completed session checkpoint cleanup |
| DL-020 fix | ExplanationValidator | String-aware brace matching |
| Save verification | SessionPersistence._verifySave() | Checksum-based save integrity |
| Retry logic | SessionPersistence._retrySave() | Up to 3 retries on save failure |
| Checkpoint rotation | SessionPersistence.addCheckpoint() | Max 20 rolling checkpoints |
| JSON parse guards | Multiple locations | try/catch on all localStorage reads |
| Theme persistence | localStorage.cma-theme | Survives page reload |
| Session recovery | restore() with checksum verification | Corrupted session detection |

---

## 4. Stability Run Plan

### Phase 1: Quick Stability (5 min)
1. Start 5-MCQ session → answer 3 → refresh page → verify recovery prompt
2. Resume session → complete → verify score report

### Phase 2: Mid-Session Stability (15 min)
1. Start 50-MCQ session → answer 25 → pause → resume
2. Navigate across questions rapidly
3. Use navigator to jump to specific questions
4. Flag/unflag several questions

### Phase 3: Long-Session Stability (2+ hours)
1. Start 100-MCQ Full Exam
2. Answer questions at natural pace
3. Verify autosave every ~30 seconds
4. Let timer run down to < 5 min — verify warning
5. Complete and verify results

### Phase 4: Cross-Session Stability
1. Complete 3 sessions without page reload
2. Verify History panel accumulates correctly
3. Verify Dashboard stats update
4. Verify May coaching recommendations evolve across sessions
