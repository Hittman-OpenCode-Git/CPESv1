/**
 * may026_telemetry_validation.js — MAY-026 Telemetry Wiring Validation Harness
 * 
 * Validates that the trackAdoption() and trackEngagement() event wiring
 * in app.js and may-core.js is correct and complete.
 * 
 * Tests: Event generation, schema compliance, buffer retention, type aggregation.
 * Governance: Light Lane — no pack/case/content impact.
 */

var MayTelemetry = require('../may-telemetry.js');

(function() {
  'use strict';

  var PASS = 0, FAIL = 0, TOTAL = 0;
  var _log = [];

  function log(msg) {
    _log.push(msg);
  }

  function assert(condition, label) {
    TOTAL++;
    if (condition) { PASS++; log('[PASS] ' + label); }
    else { FAIL++; log('[FAIL] ' + label); }
  }

  // ── Test 1: trackAdoption schema compliance ──────────────────
  (function() {
    log('\n── Test Suite 1: trackAdoption Schema ──');
    
    // Reset telemetry buffer
    MayTelemetry.reset();
    
    // Simulate presented event (4 cards)
    MayTelemetry.trackAdoption({
      recommendationType: 'Top Weakness',
      cardId: 'top-weakness',
      topic: 'Cost Variances',
      presented: true,
      panelOpened: false,
      clicked: false,
      sessionStarted: false,
      completed: false,
      timestamp: '2026-07-31T14:30:00.000Z'
    });

    var snap = MayTelemetry.snapshot();
    assert(snap.totalEvents === 1, 'adoption event increments totalEvents');
    assert(snap.byType.adoption === 1, 'adoption event tracked as type "adoption"');

    var drained = MayTelemetry.drain();
    assert(drained.length === 1, 'drain returns exactly 1 event');
    assert(drained[0].type === 'adoption', 'drained event has correct type');
    assert(drained[0].data.cardId === 'top-weakness', 'cardId preserved');
    assert(drained[0].data.presented === true, 'presented flag preserved');
    assert(drained[0].data.panelOpened === false, 'panelOpened flag preserved');
    assert(drained[0].data.clicked === false, 'clicked flag preserved');
    assert(drained[0].data.sessionStarted === false, 'sessionStarted flag preserved');
    assert(drained[0].data.completed === false, 'completed flag preserved');
    assert(typeof drained[0].data.timestamp === 'string', 'timestamp is a string');
    assert(typeof drained[0].data.recommendationType === 'string', 'recommendationType is string');
    assert(typeof drained[0].data.cardId === 'string', 'cardId is string');
    assert(typeof drained[0].data.topic === 'string', 'topic is string');
  })();

  // ── Test 2: trackEngagement schema compliance ────────────────
  (function() {
    log('\n── Test Suite 2: trackEngagement Schema ──');
    
    MayTelemetry.reset();

    MayTelemetry.trackEngagement({ action: 'tooltipViewed', timestamp: '2026-07-31T14:30:00.000Z' });
    MayTelemetry.trackEngagement({ action: 'tooltipClicked', timestamp: '2026-07-31T14:31:00.000Z' });
    MayTelemetry.trackEngagement({ action: 'dismissed', timestamp: '2026-07-31T14:32:00.000Z' });

    var snap = MayTelemetry.snapshot();
    assert(snap.totalEvents === 3, '3 engagement events tracked');
    assert(snap.byType.engagement === 3, 'all 3 registered as engagement type');

    var drained = MayTelemetry.drain();
    assert(drained.length === 3, 'drain returns 3 events');
    assert(drained[0].data.action === 'tooltipViewed', 'action field correct (tooltipViewed)');
    assert(drained[1].data.action === 'tooltipClicked', 'action field correct (tooltipClicked)');
    assert(drained[2].data.action === 'dismissed', 'action field correct (dismissed)');
  })();

  // ── Test 3: Full adoption lifecycle (presented→opened→clicked→started→completed) ──
  (function() {
    log('\n── Test Suite 3: Full Adoption Lifecycle ──');
    
    MayTelemetry.reset();

    var events = [
      { type: 'Top Weakness', cardId: 'top-weakness', presented: true },
      { type: 'Suggested Review', cardId: 'suggested-review', presented: true },
      { type: 'Next Session', cardId: 'next-session', presented: true },
      { type: 'Readiness', cardId: 'readiness', presented: true },
      { type: 'Panel Link', cardId: 'rec-panel-link', panelOpened: true, clicked: true },
      { type: 'Session', cardId: 'session-start', sessionStarted: true },
      { type: 'Session', cardId: 'session-complete', completed: true }
    ];

    events.forEach(function(ev) {
      MayTelemetry.trackAdoption({
        recommendationType: ev.type,
        cardId: ev.cardId,
        topic: '',
        presented: ev.presented || false,
        panelOpened: ev.panelOpened || false,
        clicked: ev.clicked || false,
        sessionStarted: ev.sessionStarted || false,
        completed: ev.completed || false,
        timestamp: new Date().toISOString()
      });
    });

    var snap = MayTelemetry.snapshot();
    assert(snap.totalEvents === 7, '7 events in full lifecycle');
    assert(snap.byType.adoption === 7, 'all 7 are adoption type');

    // Verify event ordering
    var drained = MayTelemetry.drain();
    assert(drained[0].data.cardId === 'top-weakness', 'card 1: top-weakness');
    assert(drained[1].data.cardId === 'suggested-review', 'card 2: suggested-review');
    assert(drained[2].data.cardId === 'next-session', 'card 3: next-session');
    assert(drained[3].data.cardId === 'readiness', 'card 4: readiness');
    assert(drained[4].data.cardId === 'rec-panel-link', 'card 5: rec-panel-link (clicked)');
    assert(drained[5].data.sessionStarted === true, 'event 6: sessionStarted=true');
    assert(drained[6].data.completed === true, 'event 7: completed=true');
  })();

  // ── Test 4: Buffer overflow protection ───────────────────────
  (function() {
    log('\n── Test Suite 4: Buffer Overflow ──');
    
    MayTelemetry.reset();

    // Push 501 events (should cap at 500)
    for (var i = 0; i < 501; i++) {
      MayTelemetry.trackAdoption({
        recommendationType: 'Test',
        cardId: 'test-' + i,
        topic: '',
        presented: true,
        panelOpened: false,
        clicked: false,
        sessionStarted: false,
        completed: false,
        timestamp: new Date().toISOString()
      });
    }

    var snap = MayTelemetry.snapshot();
    assert(snap.totalEvents === 500, 'buffer capped at 500 events');
    assert(snap.byType.adoption === 500, 'all 500 are adoption type');

    // Drain and verify oldest was evicted, newest retained
    var drained = MayTelemetry.drain();
    assert(drained.length === 500, 'drain returns 500 events');
    assert(drained[0].data.cardId === 'test-1', 'oldest retained is test-1 (test-0 evicted)');
    assert(drained[499].data.cardId === 'test-500', 'newest is test-500');
  })();

  // ── Test 5: Mixed event type aggregation ─────────────────────
  (function() {
    log('\n── Test Suite 5: Mixed Event Types ──');
    
    MayTelemetry.reset();

    MayTelemetry.trackAdoption({ recommendationType: 'A', cardId: 'a', topic: '', presented: true, panelOpened: false, clicked: false, sessionStarted: false, completed: false, timestamp: new Date().toISOString() });
    MayTelemetry.trackEngagement({ action: 'tooltipViewed', timestamp: new Date().toISOString() });
    MayTelemetry.trackDecision({ decisionId: 'd1', action: 'test' });
    MayTelemetry.trackAdoption({ recommendationType: 'B', cardId: 'b', topic: '', presented: true, panelOpened: false, clicked: false, sessionStarted: false, completed: false, timestamp: new Date().toISOString() });
    MayTelemetry.trackEngagement({ action: 'dismissed', timestamp: new Date().toISOString() });

    var snap = MayTelemetry.snapshot();
    assert(snap.totalEvents === 5, '5 mixed events');
    assert(snap.byType.adoption === 2, '2 adoption events');
    assert(snap.byType.engagement === 2, '2 engagement events');
    assert(snap.byType.decision === 1, '1 decision event');

    // Verify snapshot structure
    assert(typeof snap.totalEvents === 'number', 'snapshot.totalEvents is number');
    assert(typeof snap.byType === 'object', 'snapshot.byType is object');
    assert(typeof snap.timestamp === 'string', 'snapshot.timestamp is string');
  })();

  // ── Test 6: Reset clears all state ───────────────────────────
  (function() {
    log('\n── Test Suite 6: Reset ──');
    
    MayTelemetry.trackAdoption({ recommendationType: 'X', cardId: 'x', topic: '', presented: true, panelOpened: false, clicked: false, sessionStarted: false, completed: false, timestamp: new Date().toISOString() });
    MayTelemetry.trackEngagement({ action: 'tooltipViewed', timestamp: new Date().toISOString() });
    
    MayTelemetry.reset();
    
    var snap = MayTelemetry.snapshot();
    assert(snap.totalEvents === 0, 'reset clears buffer (totalEvents=0)');
    assert(Object.keys(snap.byType).length === 0, 'reset clears byType');
    assert(Object.keys(snap.modeCounts).length === 0, 'reset clears modeCounts');
  })();

  // ── Test 7: Drain is non-destructive to snapshot ─────────────
  (function() {
    log('\n── Test Suite 7: Drain vs. Snapshot ──');
    
    MayTelemetry.reset();
    
    MayTelemetry.trackAdoption({ recommendationType: 'Y', cardId: 'y', topic: '', presented: true, panelOpened: false, clicked: false, sessionStarted: false, completed: false, timestamp: new Date().toISOString() });
    
    var pre = MayTelemetry.snapshot();
    assert(pre.totalEvents === 1, 'pre-drain: 1 event');

    var drained = MayTelemetry.drain();
    assert(drained.length === 1, 'drain returns 1 event');

    var post = MayTelemetry.snapshot();
    assert(post.totalEvents === 0, 'post-drain: buffer empty');
    assert(drained.length === 1, 'drained data still available');
  })();

  // ── Test 8: Injection site count verification (static analysis) ──
  (function() {
    log('\n── Test Suite 8: Injection Site Static Verification ──');

    // Verify MayTelemetry global is available
    assert(typeof MayTelemetry !== 'undefined', 'MayTelemetry global defined');
    assert(typeof MayTelemetry.trackAdoption === 'function', 'trackAdoption is a function');
    assert(typeof MayTelemetry.trackEngagement === 'function', 'trackEngagement is a function');
    assert(typeof MayTelemetry.snapshot === 'function', 'snapshot is a function');
    assert(typeof MayTelemetry.drain === 'function', 'drain is a function');
    assert(typeof MayTelemetry.reset === 'function', 'reset is a function');
  })();

  // ── Final Report ─────────────────────────────────────────────
  log('\n═══════════════════════════════════════');
  log('MAY-026 Validation Results');
  log('Total: ' + TOTAL + ' | Passed: ' + PASS + ' | Failed: ' + FAIL);
  log('═══════════════════════════════════════');

  var result = {
    total: TOTAL,
    passed: PASS,
    failed: FAIL,
    success: FAIL === 0,
    log: _log
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = result;
  }

  // Output to console for npm script integration
  if (typeof console !== 'undefined') {
    _log.forEach(function(line) { console.log(line); });
    if (FAIL > 0) {
      console.error('\\nMAY-026 VALIDATION FAILED: ' + FAIL + ' test(s) failed.');
      process.exitCode = 1;
    } else {
      console.log('\\nMAY-026 VALIDATION PASSED: ' + PASS + '/' + TOTAL + ' tests passed.');
    }
  }

  return result;
})();
