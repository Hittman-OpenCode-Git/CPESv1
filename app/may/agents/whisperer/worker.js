/**
 * whisperer.worker.js — Web Worker host.
 *
 * Phase 2b+. Deterministic JS nudge logic. Same source-of-truth as index.js
 * (drift caught by smoke test asserting both files load).
 */

'use strict';

var DWELL_LONG_MS = 60000;
var DWELL_VERY_LONG_MS = 180000;
var ERROR_STREAK = 3;
var ELAPSED_BREAK_MS = 600000;
var MAX_NUDGE_LEN = 80;

function clip(s) {
  if (!s) return null;
  s = String(s);
  return s.length > MAX_NUDGE_LEN ? s.slice(0, MAX_NUDGE_LEN) + '\u2026' : s;
}

function whisper(input) {
  var elapsedMs = (typeof input.elapsedMs === 'number') ? input.elapsedMs : 0;
  var dwellMs = (typeof input.dwellMs === 'number') ? input.dwellMs : 0;
  var errorStreak = (typeof input.errorStreak === 'number') ? input.errorStreak : 0;
  var examIntegrity = !!input.examIntegrity;
  if (examIntegrity) {
    return { nudge: null, timing: { delayMs: 0, maxShownMs: 0 }, rationale: 'whisper:block:exam_integrity' };
  }
  var nudge = null;
  var delayMs = 0;
  var maxShownMs = 8000;
  var rationale = 'whisper:none';
  if (errorStreak >= ERROR_STREAK) {
    nudge = clip('Consider requesting a hint \u2014 a small nudge won\'t hurt.');
    delayMs = 1500; maxShownMs = 6000; rationale = 'whisper:error_streak';
  } else if (dwellMs >= DWELL_VERY_LONG_MS) {
    nudge = clip('You\'ve been here a while \u2014 try working backwards from the answer.');
    delayMs = 2000; maxShownMs = 10000; rationale = 'whisper:very_long_dwell';
  } else if (dwellMs >= DWELL_LONG_MS) {
    nudge = clip('Stuck? Read the question once more and note the verb.');
    delayMs = 1500; maxShownMs = 7000; rationale = 'whisper:long_dwell';
  } else if (elapsedMs >= ELAPSED_BREAK_MS) {
    nudge = clip('You\'ve been at it for a while \u2014 a short break may help.');
    delayMs = 3000; maxShownMs = 5000; rationale = 'whisper:long_session';
  }
  return { nudge: nudge, timing: { delayMs: delayMs, maxShownMs: maxShownMs }, rationale: rationale };
}

self.addEventListener('message', function (ev) {
  var msg = ev.data;
  if (!msg) return;
  if (msg.type === 'classify') {
    try {
      var result = whisper(msg.input);
      self.postMessage({ type: 'result', requestId: msg.requestId, output: result });
    } catch (e) {
      self.postMessage({ type: 'result', requestId: msg.requestId, error: e.message || String(e) });
    }
  }
});