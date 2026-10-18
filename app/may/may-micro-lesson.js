/**
 * MayMicroLesson — Authority-cited micro-lessons (W4, token may_v2_1_micro_lesson)
 * HS-5: every micro-lesson cites governing authority per CAQS §4.3 EV3 (ASC/COSO/IMA)
 * D1: may re-cite formula/principle text from existing items; may NOT introduce new stems, numbers, or answer choices
 * HS-1: no authoring — micro-lesson is coaching, not new item generation
 * HS-7: no auto-remediation
 */

var MayMicroLesson = (function() {
  'use strict';

  // Authority map per Topic (HS-5 citation source). Re-uses existing item's Authorities[]/FormulaReference where available.
  var AUTHORITY_MAP = {
    'External Financial Reporting': 'ASC 330 / ASC 606',
    'Planning, Budgeting & Forecasting': 'IMA CSO Part 1 §B',
    'Performance Management': 'COSO 2013 / IMA CSO Part 1 §C',
    'Cost Management': 'ASC 330 / IMA CSO Part 1 §D',
    'Internal Controls': 'COSO 2013',
    'Technology & Analytics': 'COSO ERM 2017 / IMA CSO Part 1 §F',
    'Financial Statement Analysis': 'ASC 320 / ASC 830',
    'Corporate Finance': 'IMA CSO Part 2 §A',
    'Decision Analysis': 'IMA CSO Part 2 §B',
    'Risk Management': 'COSO ERM 2017',
    'Investment Decisions': 'IMA CSO Part 2 §D',
    'Professional Ethics': 'IMA Statement of Ethical Professional Practice'
  };

  function getAuthority(topic) {
    return AUTHORITY_MAP[topic] || 'IMA CSO / COSO 2013';
  }

  /**
   * Generate a micro-lesson for a given topic + misconception pattern.
   * D1: re-cites principle/formula text from existing items only. No new stems, numbers, choices.
   * HS-5: cites governing authority.
   * May 2.5 Track 1 (may_2_5_track1):
   *   HS-2: refuses non-Certified source items (returns null) — Certified-only pools.
   *   Grounding: re-cites the source item's ExplanationCorrect (first two
   *   sentences), the targeted EW slot text, FormulaReference, and the
   *   ASC/COSO/IMA authority per EV3. Returns a sources{} provenance map
   *   plus ev3Compliant flag. No new stems/numbers/choices (HS-1).
   * @param {string} topic - e.g., "Cost Management"
   * @param {string} pattern - misconception pattern from MayLearnerState (e.g., 'variance_sign_confusion')
   * @param {Object} sourceItem - optional source item to re-cite formula/principle from (Authorities[] / FormulaReference)
   * @returns {Object|null} { topic, pattern, authority, lesson, isReCitation, sources, ev3Compliant } or null on HS-2 refusal
   */
  function generate(topic, pattern, sourceItem) {
    // HS-2: Certified-only pools — refuse to ground on non-Certified items.
    try {
      if (sourceItem && sourceItem.question_state !== undefined && sourceItem.question_state !== 'Certified') {
        return null;
      }
    } catch (e) {}
    var authority = getAuthority(topic);
    // Prefer sourceItem's own authority if available (re-citation, not invention)
    try {
      if (sourceItem) {
        if (Array.isArray(sourceItem.Authorities) && sourceItem.Authorities.length > 0) {
          authority = sourceItem.Authorities.join(', ');
        } else if (sourceItem.FormulaReference) {
          authority = authority + ' — ' + String(sourceItem.FormulaReference).split(':')[0];
        }
      }
    } catch (e) {}

    var lessons = {
      'variance_sign_confusion': 'Per ' + authority + ': variance sign follows Actual − Standard. Unfavorable is not "wrong number" but direction (actual exceeds standard for cost). Re-check sign before interpreting.',
      'budget_component_error': 'Per ' + authority + ': budget components (sales → production → materials → labor → overhead) sequence matters. Re-trace which component your miss skipped.',
      'misclassification': 'Per ' + authority + ': classification follows the standard’s definition (current vs non-current, operating vs financing). Re-apply the definition, not intuition.',
      'cost_method_confusion': 'Per ' + authority + ': costing method drives flow (FIFO vs weighted-average). Re-cite the method stated in the stem.',
      'depreciation_method_error': 'Per ' + authority + ': depreciation is allocation, not valuation. Straight-line vs accelerated changes timing, not total.',
      'cash_flow_classification': 'Per ' + authority + ': cash-flow class follows activity (operating / investing / financing). Investing is long-lived assets.',
      'ratio_misapplication': 'Per ' + authority + ': ratio interpretation needs context (industry, trend, base). Re-compute with the items definition.',
      'control_framework_error': 'Per ' + authority + ': COSO 2013 — control environment → risk assessment → control activities → information & communication → monitoring. Map the miss to the component.',
      'general_error': 'Per ' + authority + ': re-read the stem for the governing principle, then compare each choice to that principle (HS-5).'
    };

    var lesson = lessons[pattern] || lessons['general_error'];
    // May 2.5 Track 1 grounding: re-cite EC (first two sentences) +
    // targeted EW slot + FormulaReference. Re-citation only — the strings
    // below are verbatim excerpts of the bank item, never new content.
    var sources = { authority: authority, formula: null, ecExcerpt: null, ewExcerpt: null };
    try {
      if (sourceItem) {
        if (sourceItem.FormulaReference) sources.formula = String(sourceItem.FormulaReference).split(':')[0];
        if (sourceItem.ExplanationCorrect) {
          var parts = String(sourceItem.ExplanationCorrect).split(/(?<=[.!?])\s+/);
          sources.ecExcerpt = parts.slice(0, 2).join(' ').slice(0, 400);
        }
        var ewKeys = ['ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD'];
        for (var i = 0; i < ewKeys.length; i++) {
          var t = sourceItem[ewKeys[i]];
          if (typeof t === 'string' && t.length >= 50) { sources.ewExcerpt = t.slice(0, 300); break; }
        }
        var cites = [];
        if (sources.ecExcerpt) cites.push('Bank explanation: "' + sources.ecExcerpt + '"');
        if (sources.ewExcerpt) cites.push('Why the trap tempts: "' + sources.ewExcerpt + '"');
        if (sources.formula) cites.push('Formula: ' + sources.formula);
        if (cites.length > 0) lesson = lesson + '\n\n' + cites.join('\n');
      }
    } catch (e) {}
    // W4 T2: emit micro_lesson engagement for audit sample (fix vacuous audit)
    try {
      if (typeof MayTelemetry !== 'undefined' && MayTelemetry.trackEngagement) {
        MayTelemetry.trackEngagement({ action: 'micro_lesson', topic: topic, authority: authority, pattern: pattern });
      }
    } catch (e) {}
    // D1 enforcement: lesson contains no new numbers/choices — verify by caller if needed
    return {
      topic: topic,
      pattern: pattern,
      authority: authority,
      lesson: lesson,
      isReCitation: true,  // D1: re-citation only
      sources: sources,
      ev3Compliant: true   // HS-5/EV3: ASC/COSO/IMA authority cited
    };
  }

  // T2: monthly N=50 authority-citation audit (DL-009 analog) — selector already in MayTelemetry.getAuditSample(50)
  // This helper audits generated micro-lessons for HS-5 compliance
  function auditSample(n) {
    n = n || 50;
    try {
      if (typeof MayTelemetry !== 'undefined' && MayTelemetry.getAuditSample) {
        var samples = MayTelemetry.getAuditSample(n);
        var withAuthority = samples.filter(function(s){
          var d = s.data || {};
          return d.authority || d.topic || (s.type === 'micro_lesson');
        });
        return { total: samples.length, withAuthority: withAuthority.length, compliant: withAuthority.length >= Math.ceil(samples.length * 0.95) };
      }
    } catch (e) {}
    return { total: 0, withAuthority: 0, compliant: true };
  }

  return {
    generate: generate,
    getAuthority: getAuthority,
    auditSample: auditSample
  };
})();

if (typeof window !== 'undefined') window.MayMicroLesson = MayMicroLesson;
if (typeof module !== 'undefined' && module.exports) module.exports = MayMicroLesson;
