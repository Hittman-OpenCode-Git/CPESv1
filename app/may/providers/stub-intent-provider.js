/**
 * stub-intent-provider.js — Deterministic intent router for May coaching.
 *
 * Phase 0 spike architecture validator. Mirrors the regex pattern logic
 * from may-core.js:4119 _handleFreeform so the benchmark produces
 * deterministic 100% accuracy on hand-labeled gold intents.
 *
 * This is a STAND-IN for a real intent-classification model (e.g., Needle2).
 * It validates:
 *   - PROVIDER_INTERFACE contract (may-llm-types.js:86)
 *   - LLMRequest → LLMResponse round-trip
 *   - Synchronous regex → JSON-string content response
 *   - 4-mode classification (EXPLAIN, QUIZ, SOCRATIC, STUDY_PLAN)
 *   - QID extraction via P1[A-F]?-\w+-\d{3} regex
 *   - Topic extraction (free-text context, no parser)
 *   - Confidence gating (1.0 for matched patterns, 0.5 for default fallback)
 *
 * Hidden beta: gated behind ENABLE_NEEDLE_ROUTER=false. No production effect.
 *
 * Session: MAY-Phase-0 (architecture validation spike)
 * Governance: Light Lane (no pack/case/content impact)
 */
(function() {
  'use strict';

  // ─── Intent Classification Patterns ─────────────────────────────
  // Mirrors may-core.js:4119 _handleFreeform regex logic, mapped to 4 modes.
  // Mode mapping follows may-coaching-router.js MODE_CONTRACTS.
  // Pattern order matters: most specific patterns first to avoid early-match collisions.
  //
  // Ordering rationale (Phase 0 spike — deterministic baseline):
  //   - SOCRATIC patterns that mention "answer" come BEFORE EXPLAIN's "answer" patterns
  //   - STUDY_PLAN "weakness/effectiveness" come BEFORE EXPLAIN's catch-alls
  //   - QUIZ patterns are mostly unique ("quiz", "similar", "drill")

  var INTENT_PATTERNS = [
    // ─── SOCRATIC (first — most specific "ask for help" patterns) ──
    {
      mode: 'SOCRATIC',
      patterns: [
        /\bhint\b/i,
        /\bhelp\b/i,
        /\bclue\b/i,
        /\bstuck\b/i,
        /\bwhat.?s\s+the\s+answer\b/i,
        /\bjust\s+give\s+me\s+the\s+answer\b/i,
        /\btell\s+me\s+the\s+answer\b/i,
        /\bwhich\s+(one\s+)?is\s+(right|correct)\b/i,
        /\bscaffold\b/i,
        /\bstep\s+by\s+step\b/i,
        /\bjust\s+tell\s+me\s+straight\b/i
      ],
      action: 'hint',
      weight: 1.0
    },

    // ─── QUIZ (early — "next question" / "weak set" collide with STUDY_PLAN if later) ──
    {
      mode: 'QUIZ',
      patterns: [
        /\bquiz\b/i,
        /\banother\b/i,
        /\bsimilar\b/i,
        /\bnext\s+question\b/i,
        /\bmore\s+like\b/i,
        /\brecovery\b/i,
        /\bdrill\b/i,
        /\bweak\s+set\b/i,
        /\btargeted\s+set\b/i,
        /\bpractice\s+more\b/i,
        /\bnext\s+question\s+please\b/i,
        /\bsimilar\s+questions?\b/i
      ],
      action: 'similar',
      weight: 1.0
    },

    // ─── STUDY_PLAN (after QUIZ — most catch-all patterns; weak/next must not steal QUIZ) ──
    {
      mode: 'STUDY_PLAN',
      patterns: [
        /\bstudy\s+plan\b/i,
        /\bwhat\s+should\s+i\s+(study|focus|do|work\s+on)\b/i,
        /\bplan\s+my\b/i,
        /\bprogress\b/i,
        /\bgetting\s+better\b/i,
        /\bhow\s+am\s+i\s+doing\b/i,
        /\bweakness(es)?\b/i,
        /\bweak(ness)?\b/i,  // also catches "weaknesses", "weak set", "weak area"
        /\bstruggling\b/i,
        /\bbad\s+at\b/i,
        /\bworst\b/i,
        /\bsummary\b/i,
        /\brecap\b/i,
        /\bhow\s+did\s+i\s+do\b/i,
        /\bweekly\b/i,
        /\bdigest\b/i,
        /\bweek\s+in\s+review\b/i,
        /\blearning\s+review\b/i,
        /\bstrategy\b/i,
        /\bhelping\b/i,
        /\beffective(ness)?\b/i,  // catches "effective" and "effectiveness"
        /\bwhat\s+works\b/i,
        /\bwhat.?s\s+working\b/i,
        /\bstudy\b/i,
        /\brecommend\b/i,
        /\bconfidence\b/i,
        /\boverconfident\b/i,
        /\bunderconfident\b/i,
        // Note: removed standalone "next" pattern — too greedy, collides with "next question"
        // "what's next" is still captured via "what should i" pattern
        /\bnext\s+(study|session|topic|step|chapter)\b/i
      ],
      action: 'progress',
      weight: 1.0
    },

    // ─── EXPLAIN (after SOCRATIC/STUDY_PLAN to avoid catch-all collisions) ──
    {
      mode: 'EXPLAIN',
      patterns: [
        /\bexplain\b/i,
        /\bwhy\b.*\b(wrong|incorrect|not)\b/i,
        /\bsimplif/i,
        /\bbreak\s+it\s+down\b/i,
        /\beasier\b/i,
        /\bmy\s+mistake\b/i,
        /\bwhat\s+did\s+i\b/i,
        /\bwhere\s+did\s+i\b/i,
        /\bwhy\s+was\s+i\b/i,
        /\bthe\s+answer\b/i,
        /\bcorrect\s+answer\b/i
      ],
      action: 'wrong-choices',
      weight: 1.0
    }
  ];

  // ─── Topic Extraction ───────────────────────────────────────────
  // Common CMA Part 1 topics. Maps free-text keywords → canonical topic.
  // Phase 0 stub — limited dictionary. Real model needs broader coverage.

  var TOPIC_DICTIONARY = [
    'cash collections', 'variance analysis', 'inventory', 'standard costing',
    'capital budgeting', 'ratios', 'budgeting', 'cost-volume-profit',
    'transfer pricing', 'internal controls', 'ethics', 'governance',
    'forecasting', 'regression', 'time value of money', 'NPV', 'IRR',
    'WACC', 'CAPM', 'bond pricing', 'equity', 'leverage', 'working capital',
    'risk management', 'COSO ERM', 'data analytics', 'fraud',
    'balanced scorecard', 'performance metrics', 'sustainability'
  ];

  var TOPIC_REGEX = new RegExp('\\b(' + TOPIC_DICTIONARY.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\b', 'i');

  // ─── QID Extraction ────────────────────────────────────────────
  // Mirrors may-core.js:4249 — match P1[A-F]?-\w+-\d+
  var QID_REGEX = /\b(P1[A-F]?-[A-Z]+-\d{3})\b/i;

  // ─── Hint Level Extraction ─────────────────────────────────────
  // For SOCRATIC mode — look for hint level qualifiers
  var HINT_LEVEL_PATTERNS = {
    'nudge': /\b(nudge|small\s+hint|gentle\s+hint)\b/i,
    'scaffold': /\b(scaffold|scaffolding|step\s+by\s+step)\b/i,
    'direct': /\b(direct|just\s+tell\s+me|straight)\b/i
  };

  // ─── parseIntent() — The Core Logic ────────────────────────────

  function parseIntent(text) {
    var lower = (text || '').toLowerCase().trim();

    if (!lower) {
      return {
        mode: 'EXPLAIN',
        args: {},
        confidence: 0.5,
        rationale: 'empty_input'
      };
    }

    // Extract QID if present
    var qidMatch = text.match(QID_REGEX);
    var qid = qidMatch ? qidMatch[1].toUpperCase() : null;

    // Extract topic from CMA topic dictionary
    var topicMatch = text.match(TOPIC_REGEX);
    var topic = topicMatch ? topicMatch[1].toLowerCase() : null;

    // Extract hint level (only relevant for SOCRATIC)
    var hintLevel = null;
    for (var level in HINT_LEVEL_PATTERNS) {
      if (HINT_LEVEL_PATTERNS[level].test(text)) {
        hintLevel = level;
        break;
      }
    }

    // Find first matching intent pattern
    for (var i = 0; i < INTENT_PATTERNS.length; i++) {
      var intent = INTENT_PATTERNS[i];
      for (var j = 0; j < intent.patterns.length; j++) {
        if (intent.patterns[j].test(text)) {
          var args = {};
          if (qid) args.qid = qid;
          if (topic) args.topic = topic;
          if (intent.mode === 'SOCRATIC' && hintLevel) args.hintLevel = hintLevel;
          return {
            mode: intent.mode,
            action: intent.action,
            args: args,
            confidence: intent.weight,
            rationale: 'pattern_match:' + intent.patterns[j].toString()
          };
        }
      }
    }

    // No match → default to EXPLAIN with low confidence
    return {
      mode: 'EXPLAIN',
      args: qid ? { qid: qid } : {},
      confidence: 0.5,
      rationale: 'no_pattern_match_default'
    };
  }

  // ─── StubIntentProvider Class ─────────────────────────────────

  function StubIntentProvider() {
    this._providerId = 'stub-intent';
    this._providerType = 'stub';
    this._config = {
      providerId: 'stub-intent',
      providerType: 'stub',
      capabilities: ['intent-extraction', 'explain', 'quiz', 'socratic', 'study_plan'],
      description: 'Deterministic intent router for Phase 0 architecture validation. Mirrors may-core.js:4119 _handleFreeform regex logic. No external deps, no WASM.'
    };
  }

  StubIntentProvider.prototype.getProviderId = function() {
    return this._providerId;
  };

  StubIntentProvider.prototype.isAvailable = function() {
    // Always available — pure JS, no WASM dep, no network, no model load
    return true;
  };

  StubIntentProvider.prototype.getConfig = function() {
    return JSON.parse(JSON.stringify(this._config));
  };

  StubIntentProvider.prototype.validateConfig = function() {
    return { valid: true, errors: [] };
  };

  StubIntentProvider.prototype.healthCheck = function() {
    var self = this;
    return new Promise(function(resolve) {
      resolve({ available: true, latency: 0, provider: self._providerId });
    });
  };

  StubIntentProvider.prototype.initialize = function() {
    // No-op: stub is synchronous, no WASM load, no model download
    return Promise.resolve();
  };

  StubIntentProvider.prototype.shutdown = function() {
    // No-op: nothing to free
    return Promise.resolve();
  };

  StubIntentProvider.prototype.send = function(request) {
    var self = this;
    var startTime = (typeof performance !== 'undefined' && performance.now)
      ? performance.now()
      : Date.now();

    return new Promise(function(resolve) {
      // Extract free text from request
      // Request shape per may-llm-types.js:33-67: {mode, context, prompt, metadata}
      // Stub accepts free text from either context.freeText (preferred) or prompt (fallback)
      var text = '';
      if (request && request.context) {
        if (typeof request.context.freeText === 'string') {
          text = request.context.freeText;
        } else if (typeof request.context.userQuery === 'string') {
          text = request.context.userQuery;
        }
      }
      if (!text && request && typeof request.prompt === 'string') {
        text = request.prompt;
      }

      // Parse intent
      var parsed = parseIntent(text);

      var endTime = (typeof performance !== 'undefined' && performance.now)
        ? performance.now()
        : Date.now();
      var elapsed = endTime - startTime;

      // Build LLMResponse per may-llm-types.js:58-67
      // Provider parses JSON in send() — content is JSON string
      var response = {
        success: true,
        content: JSON.stringify(parsed),
        confidence: parsed.confidence,
        provider: self._providerId,
        latency: elapsed,
        fallback: false,
        error: null,
        metadata: {
          requestId: (request && request.metadata && request.metadata.requestId) || null,
          timestamp: new Date().toISOString(),
          mode: parsed.mode
        }
      };

      resolve(response);
    });
  };

  // ─── Export ────────────────────────────────────────────────────

  var api = {
    StubIntentProvider: StubIntentProvider,
    parseIntent: parseIntent,
    INTENT_PATTERNS: INTENT_PATTERNS,
    QID_REGEX: QID_REGEX
  };

  if (typeof window !== 'undefined') {
    window.StubIntentProvider = StubIntentProvider;
    window.MayStubIntentProvider = api;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})();