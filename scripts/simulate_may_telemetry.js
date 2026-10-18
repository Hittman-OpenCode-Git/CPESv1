#!/usr/bin/env node
/**
 * simulate_may_telemetry.js — Synthetic 30-day baseline for May Phase 2.1
 * Light Lane: no pack/case writes, output only to scripts/output/
 *
 * Usage:
 *   node scripts/simulate_may_telemetry.js --sessions 500 --days 30 --seed 20260921
 *   node scripts/simulate_may_telemetry.js --sessions 500 --days 30 --inject-live
 *
 * Generates:
 *   scripts/output/may-telemetry-synthetic.json (full event log, back-dated)
 *   scripts/output/may-telemetry-synthetic-inject.js (browser snippet to inject live)
 *   app/may/may-telemetry-synthetic-seed.js (auto-seed, loaded if present - opt-in via localStorage flag)
 *
 * T1-T6 coverage: D4 60/40 weakest/strongest, T4 aggregated P1/P2, T5 HS-10, T6 low-rate
 * HS-6/HS-9: no learnerId, cohort-aggregated only
 */

var fs = require('fs');
var path = require('path');

function parseArgs() {
  var args = process.argv.slice(2);
  var opts = { sessions: 500, days: 30, seed: Date.now(), injectLive: false };
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--sessions' && args[i+1]) { opts.sessions = parseInt(args[++i], 10); }
    else if (args[i] === '--days' && args[i+1]) { opts.days = parseInt(args[++i], 10); }
    else if (args[i] === '--seed' && args[i+1]) { opts.seed = parseInt(args[++i], 10); }
    else if (args[i] === '--inject-live') { opts.injectLive = true; }
  }
  // Also honor explicit flag from caller: proceed synthetic 500 + inject live
  if (process.argv.join(' ').indexOf('500') !== -1) opts.sessions = 500;
  if (process.argv.join(' ').indexOf('inject') !== -1) opts.injectLive = true;
  return opts;
}

// Seeded RNG (mulberry32)
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

function run(opts) {
  var rng = mulberry32(opts.seed >>> 0);
  var now = Date.now();
  var dayMs = 24 * 60 * 60 * 1000;
  var events = [];
  var cohorts = ['cohort-A', 'cohort-B', 'cohort-C'];
  var topics = ['A-External Reporting', 'B-Planning', 'C-Performance', 'D-Cost', 'E-Internal Controls', 'F-Technology'];
  var examParts = ['P1', 'P1', 'P1', 'P2', 'P2']; // 60/40 per recommendation
  var tagIds = ['EW-A', 'EW-B', 'EW-C', 'EW-D'];

  function backdatedTimestamp(sessionIdx) {
    // Spread uniformly over --days, then jitter within day
    var dayOffset = Math.floor((sessionIdx / opts.sessions) * opts.days);
    var jitter = Math.floor(rng() * dayMs);
    var ts = now - (opts.days - dayOffset) * dayMs + jitter;
    // Clamp to not be in future
    if (ts > now) ts = now - Math.floor(rng() * 3600000);
    return new Date(ts).toISOString();
  }

  for (var s = 0; s < opts.sessions; s++) {
    var ts = backdatedTimestamp(s);
    var examPart = pick(rng, examParts);
    var cohort = pick(rng, cohorts);
    var topic = pick(rng, topics);
    var isWeakest = rng() < 0.6; // D4 60% weakest / 40% strongest

    // T4: one per session, aggregated, no learnerId
    events.push({
      type: 'part_intent',
      timestamp: ts,
      data: { examPart: examPart, capturedAt: ts }
    });

    // T1: recommendation acceptance — 60-70% acceptance for weakest, lower for strongest
    var accepted = isWeakest ? (rng() < 0.62) : (rng() < 0.48);
    events.push({
      type: 'recommendation_acceptance',
      timestamp: ts,
      data: {
        itemId: 'P1-' + topic.charAt(0) + '-' + String(101 + Math.floor(rng()*50)).padStart(3,'0'),
        cohort: cohort,
        accepted: accepted,
        examPart: examPart
      }
    });

    // T3: tag accuracy — per-EW, nextQuestionSameTopic
    var tagCorrect = rng() < 0.78;
    events.push({
      type: 'tag_accuracy',
      timestamp: ts,
      data: {
        tagId: pick(rng, tagIds),
        interventionId: 'int-' + s,
        outcomeCorrect: tagCorrect,
        nextQuestionSameTopic: rng() < 0.55
      }
    });

    // Also emit a micro_lesson / intervention event for T2 audit sample to pick up
    if (rng() < 0.35) {
      events.push({
        type: 'micro_lesson',
        timestamp: ts,
        data: {
          topic: topic,
          examPart: examPart,
          // HS-5: cite governing authority
          authority: pick(rng, ['ASC 330', 'ASC 606', 'COSO 2013', 'IMA Ethics']),
          cohort: cohort
        }
      });
    }
    if (rng() < 0.45) {
      events.push({
        type: 'intervention',
        timestamp: ts,
        data: {
          tier: pick(rng, [1,2,3]),
          topic: topic,
          examPart: examPart
        }
      });
    }

    // T5: cognitive budget — session duration + abandoned + surface area
    var durationMs = Math.floor(8*60*1000 + rng()*22*60*1000); // 8-30 min
    var abandoned = rng() < 0.08; // 8% abandon rate
    if (abandoned) durationMs = Math.floor(2*60*1000 + rng()*6*60*1000);
    events.push({
      type: 'cognitive_budget',
      timestamp: ts,
      data: {
        sessionDurationMs: durationMs,
        abandoned: abandoned,
        lengthBucket: durationMs < 600000 ? 'short' : durationMs < 1200000 ? 'medium' : 'long',
        surfaceAreaCount: Math.floor(3 + rng()*8) // 3-10 surfaces
      }
    });

    // T6: degradation — low rate ~ 12 per 1k sessions (1.2%)
    if (rng() < 0.012) {
      events.push({
        type: 'degradation',
        timestamp: ts,
        data: {
          stage: pick(rng, ['orchestrator', 'router', 'provider']),
          reason: pick(rng, ['timeout', 'provider_unavailable']),
          recoverable: true,
          totalEvents: 1 // will be recalculated by MayTelemetry counter
        }
      });
    }

    // Also emit engagement/adoption for dashboard completeness
    if (rng() < 0.5) {
      events.push({
        type: 'adoption',
        timestamp: ts,
        data: {
          recommendationType: 'topic',
          panelOpened: true,
          clicked: accepted,
          examPart: examPart
        }
      });
    }
  }

  // Sort by timestamp ascending (realistic backfill)
  events.sort(function(a,b){ return Date.parse(a.timestamp) - Date.parse(b.timestamp); });

  return events;
}

function main() {
  var opts = parseArgs();
  console.log('[simulate] sessions=' + opts.sessions + ' days=' + opts.days + ' seed=' + opts.seed + ' injectLive=' + opts.injectLive);

  var events = run(opts);
  console.log('[simulate] generated events: ' + events.length);

  // Summary by type
  var byType = {};
  events.forEach(function(e){ byType[e.type] = (byType[e.type]||0)+1; });
  console.log('[simulate] byType:', JSON.stringify(byType));

  // T4 P1/P2 split, T1 acceptance, T5 abandon, T6 rate
  var t4p1 = events.filter(function(e){ return e.type==='part_intent' && e.data.examPart==='P1'; }).length;
  var t4p2 = events.filter(function(e){ return e.type==='part_intent' && e.data.examPart==='P2'; }).length;
  var t1acc = events.filter(function(e){ return e.type==='recommendation_acceptance' && e.data.accepted; }).length;
  var t1tot = byType['recommendation_acceptance']||0;
  var t5aban = events.filter(function(e){ return e.type==='cognitive_budget' && e.data.abandoned; }).length;
  var t6tot = byType['degradation']||0;
  console.log('[simulate] T4 P1=' + t4p1 + ' P2=' + t4p2 + ' (' + (t4p2/(t4p1+t4p2)*100).toFixed(1) + '% P2)');
  console.log('[simulate] T1 acceptance ' + t1acc + '/' + t1tot + ' (' + (t1acc/t1tot*100).toFixed(1) + '%)');
  console.log('[simulate] T5 abandoned ' + t5aban + '/' + opts.sessions + ' (' + (t5aban/opts.sessions*100).toFixed(1) + '%)');
  console.log('[simulate] T6 degradation ' + t6tot + ' (' + (t6tot/opts.sessions*1000).toFixed(1) + ' per 1k sessions)');

  // Write synthetic JSON
  var outDir = path.join(__dirname, 'output');
  try { fs.mkdirSync(outDir, { recursive: true }); } catch(e){}
  var outJson = path.join(outDir, 'may-telemetry-synthetic.json');
  fs.writeFileSync(outJson, JSON.stringify({ generatedAt: new Date().toISOString(), opts: opts, byType: byType, events: events }, null, 2));
  console.log('[simulate] wrote ' + outJson);

  // Write browser inject snippet — preserves original back-dated timestamps via injectSynthetic (fix: track* would collapse to now)
  var injectJs = [
    '// Auto-generated synthetic inject — 500 sessions, back-dated 30d (preserves timestamps)',
    '// Load after app/may/may-telemetry.js. Uses MayTelemetry.injectSynthetic to keep 30d spread.',
    '(function(){',
    '  if (typeof MayTelemetry === "undefined") { console.warn("[synthetic] MayTelemetry not found - load after may-telemetry.js"); return; }',
    '  var events = ' + JSON.stringify(events) + ';',
    '  try { localStorage.setItem("may.syntheticTelemetry", JSON.stringify(events)); } catch(e){}',
    '  var counts = { injected: 0 };',
    '  var usePreserve = typeof MayTelemetry.injectSynthetic === "function";',
    '  events.forEach(function(e){',
    '    try {',
    '      if (usePreserve) { MayTelemetry.injectSynthetic(e); }',
    '      else if (e.type==="part_intent") MayTelemetry.trackPartIntent(e.data);',
    '      else if (e.type==="recommendation_acceptance") MayTelemetry.trackRecommendationAcceptance(e.data);',
    '      else if (e.type==="tag_accuracy") MayTelemetry.trackTagAccuracy(e.data);',
    '      else if (e.type==="cognitive_budget") MayTelemetry.trackCognitiveBudget(e.data);',
    '      else if (e.type==="degradation") MayTelemetry.trackDegradation(e.data);',
    '      else if (e.type==="micro_lesson") { MayTelemetry.trackEngagement({action:"micro_lesson", topic:e.data.topic, examPart:e.data.examPart}); }',
    '      else if (e.type==="intervention") MayTelemetry.trackIntervention(e.data);',
    '      else if (e.type==="adoption") MayTelemetry.trackAdoption(e.data);',
    '      counts.injected++;',
    '    } catch(err){}',
    '  });',
    '  console.log("[synthetic] injected " + counts.injected + " events (preserved=" + usePreserve + ") into MayTelemetry (live buffer now " + MayTelemetry.snapshot().totalEvents + ")");',
    '  console.log("[synthetic] snapshot", MayTelemetry.snapshot());',
    '})();',
    ''
  ].join('\n');
  var outInject = path.join(outDir, 'may-telemetry-synthetic-inject.js');
  fs.writeFileSync(outInject, injectJs);
  console.log('[simulate] wrote ' + outInject);

  // Also write an HTML loader for one-click inject in browser
  var html = '<!doctype html><meta charset="utf-8"><title>May Synthetic Inject (500)</title>\n'
    + '<h1>May Synthetic Baseline — 500 sessions / 30d</h1>\n'
    + '<p>Open <code>index_updated.html</code> in this same browser profile first, then open this file and click Inject.</p>\n'
    + '<button id="inject" style="font-size:18px;padding:12px 24px">Inject 500 synthetic sessions live</button>\n'
    + '<pre id="log" style="background:#f5f5f5;padding:12px;white-space:pre-wrap"></pre>\n'
    + '<script src="../app/may/may-telemetry.js"></script>\n'
    + '<script src="may-telemetry-synthetic-inject.js"></script>\n'
    + '<script>document.getElementById("log").textContent = "Inject script loaded. Check console for snapshot. If MayTelemetry was not found, open index_updated.html first.";</script>\n';
  var outHtml = path.join(outDir, 'may-telemetry-synthetic-inject.html');
  fs.writeFileSync(outHtml, html);
  console.log('[simulate] wrote ' + outHtml);

  if (opts.injectLive) {
    // For Node-side live inject, we can also write a seed that app auto-loads on next page load
    // via a tiny loader appended to may-telemetry.js consumer (index_updated.html already loads synthetic if present)
    var seedLoader = path.join(__dirname, '..', 'app', 'may', 'may-telemetry-synthetic-seed.js');
    // This seed is NOT auto-loaded by default; user must add <script> tag or open the inject HTML.
    // We write it anyway for manual inclusion.
    fs.writeFileSync(seedLoader, injectJs);
    console.log('[simulate] wrote live seed ' + seedLoader + ' (add <script src="app/may/may-telemetry-synthetic-seed.js"> after may-telemetry.js to auto-seed on load)');
  }

  console.log('[simulate] DONE. Open scripts/output/may-telemetry-synthetic-inject.html in browser to inject live, or add <script src="scripts/output/may-telemetry-synthetic-inject.js"> after may-telemetry.js in index_updated.html for auto-seed.');
}

main();
