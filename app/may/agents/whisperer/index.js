/**
 * Whisperer — Micro-Agent (Phase 2b+)
 *
 * Input: { elapsedMs, dwellMs, errorStreak, examIntegrity, mode? }
 *   (called from may-telemetry.js:trackEngagement + may-coaching-memory.js:recordInteraction)
 * Output: { nudge: string|null, timing: { delayMs, maxShownMs }, rationale }
 *
 * Decides whether to surface a quiet prompt when the learner has been
 * staring at a question too long (dwell), is in an error-streak, or is
 * transitioning between modes. The output `nudge` is a short string
 * (≤80 chars) that the integration point may surface as a passive UI hint.
 *
 * HARD BLOCK: when examIntegrity is true, the agent returns {nudge: null}
 * unconditionally — never suggests help during integrity-mode exams.
 *
 * PROVIDER_INTERFACE conformant. Worker-mandatory. Hidden beta:
 * ENABLE_WHISPERER flag defaults to false. When off, the agent never
 * executes and the call sites return {nudge: null} without any UI change.
 */
(function () {
  'use strict';

  // Tunable thresholds (deterministic). All time in ms.
  var DWELL_LONG_MS = 60_000;   // 60s on one question → encourage
  var DWELL_VERY_LONG_MS = 180_000; // 3 minutes → suggest Socratic
  var ERROR_STREAK = 3;          // 3 consecutive wrong → suggest hint
  var ELAPSED_BREAK_MS = 600_000; // 10 min in session → encourage break
  var MAX_NUDGE_LEN = 80;

  function _clip(s) {
    if (!s) return null;
    s = String(s);
    return s.length > MAX_NUDGE_LEN ? s.slice(0, MAX_NUDGE_LEN) + '…' : s;
  }

  function whisper(input) {
    var elapsedMs = (typeof input.elapsedMs === 'number') ? input.elapsedMs : 0;
    var dwellMs = (typeof input.dwellMs === 'number') ? input.dwellMs : 0;
    var errorStreak = (typeof input.errorStreak === 'number') ? input.errorStreak : 0;
    var examIntegrity = !!input.examIntegrity;

    // HARD BLOCK during exam integrity mode.
    if (examIntegrity) {
      return { nudge: null, timing: { delayMs: 0, maxShownMs: 0 }, rationale: 'whisper:block:exam_integrity' };
    }

    var nudge = null;
    var delayMs = 0;
    var maxShownMs = 8000;
    var rationale = 'whisper:none';

    if (errorStreak >= ERROR_STREAK) {
      nudge = _clip('Consider requesting a hint — a small nudge won\'t hurt.');
      delayMs = 1500;
      maxShownMs = 6000;
      rationale = 'whisper:error_streak';
    } else if (dwellMs >= DWELL_VERY_LONG_MS) {
      nudge = _clip('You\'ve been here a while — try working backwards from the answer.');
      delayMs = 2000;
      maxShownMs = 10000;
      rationale = 'whisper:very_long_dwell';
    } else if (dwellMs >= DWELL_LONG_MS) {
      nudge = _clip('Stuck? Read the question once more and note the verb.');
      delayMs = 1500;
      maxShownMs = 7000;
      rationale = 'whisper:long_dwell';
    } else if (elapsedMs >= ELAPSED_BREAK_MS) {
      nudge = _clip('You\'ve been at it for a while — a short break may help.');
      delayMs = 3000;
      maxShownMs = 5000;
      rationale = 'whisper:long_session';
    }

    return {
      nudge: nudge,
      timing: { delayMs: delayMs, maxShownMs: maxShownMs },
      rationale: rationale
    };
  }

  function _send(request) {
    var input = (request && request.context) ? request.context : (request || {});
    var result = whisper(input);
    return Promise.resolve({
      success: true,
      content: JSON.stringify(result),
      confidence: 0.7,
      provider: 'whisperer',
      latency: 0,
      fallback: false,
      error: null,
      metadata: {
        requestId: (request && request.metadata && request.metadata.requestId) || null,
        timestamp: new Date().toISOString(),
        mode: 'whisper'
      }
    });
  }

  function WhispererProvider() {
    this._providerId = 'whisperer';
    this._providerType = 'whisperer';
    this._isAvailable = false;
  }

  WhispererProvider.prototype.getProviderId = function () { return this._providerId; };

  WhispererProvider.prototype.isAvailable = function () {
    if (this._isAvailable) return true;
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_WHISPERER')) {
        this._isAvailable = true;
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  };

  WhispererProvider.prototype.getConfig = function () {
    return {
      providerId: this._providerId,
      providerType: this._providerType,
      capabilities: ['engagement-nudge', 'dwell-aware', 'error-streak-aware', 'exam-integrity-hard-block'],
      description: 'Whisperer (Phase 2b+, hidden beta) — engagement nudges with exam-integrity guard'
    };
  };

  WhispererProvider.prototype.validateConfig = function () {
    return { valid: true, errors: [] };
  };

  WhispererProvider.prototype.healthCheck = function () {
    return Promise.resolve({ available: this.isAvailable(), latency: 0 });
  };

  WhispererProvider.prototype.initialize = function () { return Promise.resolve(); };
  WhispererProvider.prototype.shutdown = function () { return Promise.resolve(); };
  WhispererProvider.prototype.send = _send;

  WhispererProvider.whisper = whisper;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WhispererProvider: WhispererProvider, whisper: whisper };
  }
  if (typeof window !== 'undefined') {
    window.WhispererProvider = WhispererProvider;
    window.WhispererWhisper = whisper;
  }
})();