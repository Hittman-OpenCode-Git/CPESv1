/**
 * guard.worker.js — Web Worker host.
 *
 * Phase 2b+. Deterministic JS post-filter. Mirrors index.js.
 */

'use strict';

var ABSOLUTE_TERMS = /\b(always|never|must|guaranteed|cannot fail|impossible)\b/i;
var CITATION_PATTERNS = [
  /\bASC\s*\d{3}/i,
  /\bCOSO\b/i,
  /\bGAAP\b|\bIFRS\b/i,
  /\bformula\b.*=/i,
  /\bbecause\s+of\b.*\b(principle|rule|definition|standard)/i,
  /\u00a7\s*\d+/i,
  /\b[A-F]\.\d{3}/
];

function looksCited(text) {
  if (!text || typeof text !== 'string') return false;
  for (var i = 0; i < CITATION_PATTERNS.length; i++) {
    if (CITATION_PATTERNS[i].test(text)) return true;
  }
  return false;
}

function bankPhrasesMatch(draft, bank) {
  if (!draft || !bank || typeof bank !== 'object' || !bank.length) return true;
  var dl = String(draft).toLowerCase();
  var hits = 0;
  for (var i = 0; i < bank.length; i++) {
    var phrase = String(bank[i] || '').toLowerCase();
    if (phrase && phrase.length >= 6 && dl.indexOf(phrase) !== -1) hits++;
    if (hits >= 2) return true;
  }
  return false;
}

function guard(input) {
  var draft = (input && typeof input.draftResponse === 'string') ? input.draftResponse : '';
  var bank = (input && Array.isArray(input.citedBank)) ? input.citedBank : [];
  var cited = looksCited(draft);
  var faithful = bankPhrasesMatch(draft, bank);
  var overconfident = ABSOLUTE_TERMS.test(draft) && !cited;
  var block = overconfident && !cited && faithful === false && draft.length >= 40;
  return {
    faithful: faithful,
    citesBank: cited,
    overconfident: overconfident,
    block: block,
    rationale: block ? 'guard:block:overconfident_uncited'
           : (overconfident ? 'guard:warn:overconfident_but_cited' : 'guard:pass')
  };
}

self.addEventListener('message', function (ev) {
  var msg = ev.data;
  if (!msg) return;
  if (msg.type === 'classify') {
    try {
      var result = guard(msg.input);
      self.postMessage({ type: 'result', requestId: msg.requestId, output: result });
    } catch (e) {
      self.postMessage({ type: 'result', requestId: msg.requestId, error: e.message || String(e) });
    }
  }
});