/**
 * MayArchetypeCoach — S114P Coaching Recommendation Engine
 * 
 * Maps learner archetypes (New, Developing, Plateaued, Exam Ready) to
 * prioritized, evidence-backed coaching actions. Converts analytics into
 * actionable guidance.
 * 
 * Session:  S114P — Coaching Recommendation Engine
 * Engine:   S114P-1.0
 * Gov:      Light Lane (coaching layer — no pack/case/content impact)
 * Deps:     MayLearnerState (archetype, readiness, clusters, intelligence)
 */

var MayArchetypeCoach = (function() {
    'use strict';

    var VERSION = 'S114P-1.0';

    // ── Action Type Constants ──
    var ACTION = {
        START_FOUNDATIONS:    'start_foundations',
        BUILD_CADENCE:        'build_cadence',
        FOCUS_WEAKEST:        'focus_weakest',
        CONTINUE_RECOVERY:    'continue_recovery',
        MAINTAIN_STRENGTHS:   'maintain_strengths',
        TARGETED_SPRINT:      'targeted_sprint',
        CHANGE_PRACTICE_MODE: 'change_mode',
        REVIEW_EXPLANATIONS:  'review_explanations',
        INCREASE_DIFFICULTY:  'increase_difficulty',
        TIMED_MIXED_PRACTICE: 'timed_practice',
        MAINTAIN_VIGILANCE:   'maintain_vigilance',
        REVIEW_BOOKMARKED:    'review_bookmarked',
        BROADEN_COVERAGE:     'broaden_coverage'
    };

    // ── Priority ──
    var PRI = { HIGHEST: 1, HIGH: 2, MEDIUM: 3 };

    // ── Archetype Summaries ──
    var SUMMARIES = {
        'new':        { label: 'New Learner',        emoji: '\u25cf', color: '#9b59b6' },
        'developing': { label: 'Developing Learner',  emoji: '\u2191', color: '#3498db' },
        'plateaued':  { label: 'Plateau Detected',    emoji: '\u26a0', color: '#f39c12' },
        'ready':      { label: 'Exam Ready',          emoji: '\u2605', color: '#27ae60' }
    };

    // ── Domain / Section Labels ──
    var SECTION_LABELS = {
        A: 'External Financial Reporting',
        B: 'Planning, Budgeting & Forecasting',
        C: 'Performance Management',
        D: 'Cost Management',
        E: 'Internal Controls',
        F: 'Technology & Analytics'
    };

    // ── Action factory ──
    function _act(type, priority, label, guidance, rationale, actionable, handler) {
        return {
            type: type,
            priority: priority || PRI.MEDIUM,
            label: label || '',
            guidance: guidance || '',
            archetypeRationale: rationale || '',
            actionable: !!actionable,
            handler: handler || null
        };
    }

    // ═══════════════════════════════════════════════════════════════
    // DATA HELPERS
    // ═══════════════════════════════════════════════════════════════

    function _safeLS(fn) {
        try { return fn(); } catch (e) { return null; }
    }

    function _getWeakestDomain() {
        return _safeLS(function() {
            if (typeof MayLearnerState === 'undefined') return null;
            var summary = MayLearnerState.getSectionReadinessSummary();
            if (!summary) return null;
            var bandOrder = { 'Not enough data': 0, 'Recovery needed': 5, 'Developing': 10, 'Approaching review-ready': 20, 'Ready for focused review': 30 };
            var worst = null; var worstScore = Infinity;
            ['A','B','C','D','E','F'].forEach(function(sec) {
                var s = summary[sec];
                if (!s) return;
                var score = s.band === 'Not enough data' ? -1 : (bandOrder[s.band] || 0);
                if (score < worstScore) { worstScore = score; worst = s; }
            });
            return worst;
        });
    }

    function _getStrongestDomain() {
        return _safeLS(function() {
            if (typeof MayLearnerState === 'undefined') return null;
            var summary = MayLearnerState.getSectionReadinessSummary();
            if (!summary) return null;
            var bandOrder = { 'Not enough data': -1, 'Recovery needed': 5, 'Developing': 10, 'Approaching review-ready': 20, 'Ready for focused review': 30 };
            var best = null; var bestScore = -Infinity;
            ['A','B','C','D','E','F'].forEach(function(sec) {
                var s = summary[sec];
                if (!s) return;
                var score = bandOrder[s.band] || 0;
                if (score > bestScore) { bestScore = score; best = s; }
            });
            return best;
        });
    }

    function _getWeaknessTopics() {
        return _safeLS(function() {
            if (typeof MayLearnerState === 'undefined') return null;
            var clusters = MayLearnerState.getWeaknessClusters();
            return clusters && clusters.persistentWeak ? clusters.persistentWeak : [];
        });
    }

    function _getDecliningTopics() {
        return _safeLS(function() {
            if (typeof MayLearnerState === 'undefined') return null;
            var clusters = MayLearnerState.getWeaknessClusters();
            return clusters && clusters.declining ? clusters.declining : [];
        });
    }

    function _getRecoverySprintCount(bp) {
        return (bp && bp.behavioralPatterns) ? (bp.behavioralPatterns.recoverySprintCount || 0) : 0;
    }

    function _getPreferredDifficulty(bp) {
        return (bp && bp.behavioralPatterns) ? (bp.behavioralPatterns.preferredDifficulty || 'standard') : 'standard';
    }

    function _getReadinessBand(bp) {
        return (bp && bp.mayBand) ? bp.mayBand : (bp ? bp.band : 'Not enough data');
    }

    // ═══════════════════════════════════════════════════════════════
    // PER-ARCHETYPE ACTION GENERATORS
    // ═══════════════════════════════════════════════════════════════

    function _actionsForNew(bp) {
        var actions = [];
        var nSessions = bp.sessionCount || 0;

        // A1: Start foundations — suggest first domain to cover
        var weakest = _getWeakestDomain();
        var domainLabel = weakest ? 'Section ' + weakest.section + ' (' + (SECTION_LABELS[weakest.section] || '') + ')' : 'Section A (External Financial Reporting)';
        actions.push(_act(
            ACTION.START_FOUNDATIONS, PRI.HIGHEST,
            'Start foundational practice',
            'Begin with ' + domainLabel + '. Work through one section at a time to build complete coverage. ' +
            (nSessions < 2 ? 'Start with a 10-question MCQ session to establish your baseline.' : 'Continue building your foundation with structured MCQ practice.'),
            'New learners need systematic domain coverage to establish a baseline before targeting specific weaknesses.',
            true, 'startFoundations'
        ));

        // A2: Build session cadence
        if (nSessions <= 3) {
            var cadenceNote = '';
            if (bp.sessionSpacing && bp.sessionSpacing.avgDays > 7) {
                cadenceNote = ' Your sessions are ' + bp.sessionSpacing.avgDays + ' days apart on average — tighter spacing improves retention.';
            }
            actions.push(_act(
                ACTION.BUILD_CADENCE, PRI.HIGH,
                'Build consistent study cadence',
                'Aim for 2-3 practice sessions per week. Consistent, shorter sessions build retention better than infrequent long sessions.' + cadenceNote,
                'Session cadence is the strongest predictor of CMA readiness. Early habit formation prevents later cram cycles.',
                false, null
            ));
        }

        // A3: Broaden to next domain when one is covered
        var strongest = _getStrongestDomain();
        if (strongest && strongest.band === 'Approaching review-ready') {
            var nextSecs = ['A','B','C','D','E','F'].filter(function(s) {
                if (typeof MayLearnerState === 'undefined') return false;
                var summary = MayLearnerState.getSectionReadinessSummary();
                return summary && summary[s] && summary[s].band === 'Not enough data';
            });
            if (nextSecs.length > 0) {
                actions.push(_act(
                    ACTION.BROADEN_COVERAGE, PRI.MEDIUM,
                    'Expand to next domain',
                    'Section ' + strongest.section + ' is approaching review-ready. Broaden your practice to ' +
                    'Section ' + nextSecs[0] + ' (' + (SECTION_LABELS[nextSecs[0]] || '') + ') next.',
                    'Building breadth after achieving depth in one domain prevents over-specialization.',
                    false, null
                ));
            }
        }

        return actions;
    }

    function _actionsForDeveloping(bp) {
        var actions = [];
        var trend = bp.sessionTrend || {};
        var weakest = _getWeakestDomain();
        var weakTopics = _getWeaknessTopics();
        var sprintCount = _getRecoverySprintCount(bp);

        // D1: Focus weakest domain
        if (weakest && weakest.band === 'Recovery needed') {
            var domainLabel = 'Section ' + weakest.section + ' (' + (SECTION_LABELS[weakest.section] || '') + ')';
            actions.push(_act(
                ACTION.FOCUS_WEAKEST, PRI.HIGHEST,
                'Focus weakest domain',
                'Your ' + domainLabel + ' is at Recovery needed level. Dedicate your next 2-3 sessions to ' +
                (SECTION_LABELS[weakest.section] || '') + ' topics until the section reaches Developing or higher.',
                'Developing learners with a recovery-needed domain benefit most from concentrated domain work before broadening practice.',
                true, 'focusWeakest'
            ));
        }

        // D2: Continue recovery or start a sprint
        if (sprintCount > 0) {
            actions.push(_act(
                ACTION.CONTINUE_RECOVERY, PRI.HIGH,
                'Continue recovery work',
                'You have completed ' + sprintCount + ' recovery sprint' + (sprintCount !== 1 ? 's' : '') + '. ' +
                'Continue targeting your weakest topics. Each sprint that scores above 360 counts toward your next readiness band.',
                'Recovery sprints are proven to raise developing learners\' readiness band. Consistent sprint completion is the fastest path to Approaching.',
                true, 'continueRecovery'
            ));
        } else if (trend.direction === 'declining') {
            actions.push(_act(
                ACTION.TARGETED_SPRINT, PRI.HIGHEST,
                'Launch a recovery sprint',
                'Your scores are declining (delta: ' + (trend.delta || 0) + '). Launch a targeted recovery sprint focusing on your weakest topics to reverse the trend.',
                'Declining trajectory with developing status is an early-warning signal — a recovery sprint can arrest the decline before it deepens.',
                true, 'launchRecoverySprint'
            ));
        } else if (trend.direction === 'improving') {
            var improvingNote = 'Your scores are trending up (+' + (trend.delta || 0) + '). ';
            actions.push(_act(
                ACTION.CONTINUE_RECOVERY, PRI.HIGH,
                'Keep building momentum',
                improvingNote + 'Continue your current study pattern. Focus on raising your weakest section to Developing before adding new topics.',
                'Developing learners on an improving trajectory benefit from consistency — keep the same study pattern while gradually expanding coverage.',
                false, null
            ));
        }

        // D3: Maintain strong areas
        if (weakTopics && weakTopics.length > 0) {
            var strongDomain = _getStrongestDomain();
            if (strongDomain && strongDomain.band === 'Approaching review-ready') {
                actions.push(_act(
                    ACTION.MAINTAIN_STRENGTHS, PRI.MEDIUM,
                    'Refresh your strongest domain',
                    'Section ' + strongDomain.section + ' (' + (SECTION_LABELS[strongDomain.section] || '') + ') is at ' + strongDomain.band + '. ' +
                    'Do a periodic review session to keep these topics fresh — even one session every two weeks prevents skill decay.',
                    'Developing learners often lose hard-won gains in strong domains while focused on weak ones. Periodic refresh prevents backsliding.',
                    false, null
                ));
            }
        }

        return actions;
    }

    function _actionsForPlateaued(bp) {
        var actions = [];
        var plateau = bp.plateau || {};
        var sprintCount = _getRecoverySprintCount(bp);
        var preferredDiff = _getPreferredDifficulty(bp);

        // P1: Launch a targeted recovery sprint
        if (sprintCount < 3) {
            actions.push(_act(
                ACTION.TARGETED_SPRINT, PRI.HIGHEST,
                'Launch targeted recovery sprint',
                'Your scores have been flat for ' + (bp.sessionCount >= 5 ? '5+' : 'several') + ' sessions (range: ' +
                (plateau.plateauMetrics ? plateau.plateauMetrics.recentScoreRange : 'tight') + ' pts). ' +
                'Launch a recovery sprint targeting your bookmarked Recovery Candidates to break through the plateau.',
                'Targeted sprints are the highest-yield intervention for plateaued learners — focused remediation on specific weak topics forces score movement.',
                true, 'launchRecoverySprint'
            ));
        } else {
            actions.push(_act(
                ACTION.TARGETED_SPRINT, PRI.HIGHEST,
                'Run another recovery sprint',
                'You have completed ' + sprintCount + ' recovery sprints. You need ' + Math.max(0, 3 - sprintCount) +
                ' more with scores above 360 to reach your next readiness band. Focus on bookmarked Recovery Candidates.',
                'Repeated recovery sprints at high scores are the fastest path out of a plateau for learners with sufficient base knowledge.',
                true, 'launchRecoverySprint'
            ));
        }

        // P2: Change practice mode to introduce variability
        var modeGuidance = '';
        if (preferredDiff === 'standard') {
            modeGuidance = 'Try alternating between easier (to build confidence) and harder (to stretch) difficulty presets.';
        } else if (preferredDiff === 'easier') {
            modeGuidance = 'You have been using easier difficulty. Try standard difficulty to challenge yourself.';
        }
        actions.push(_act(
            ACTION.CHANGE_PRACTICE_MODE, PRI.HIGH,
            'Vary your practice mode',
            'Plateaued performance often responds to variability. ' + modeGuidance +
            ' Mix MCQ drills with case studies and try timed mixed-domain sessions to add realistic pressure.',
            'Introducing variability breaks the comfort zone that sustains a plateau. New question types and difficulty levels force adaptive learning.',
            false, null
        ));

        // P3: Review explanation engagement
        actions.push(_act(
            ACTION.REVIEW_EXPLANATIONS, PRI.MEDIUM,
            'Deepen explanation review',
            'Spend more time reviewing wrong-answer explanations. For each missed question, read why each distractor is wrong — not just why the correct answer is right. ' +
            'This builds the conceptual framework needed to break through a score ceiling.',
            'Plateaued learners often have memorized patterns but lack deep conceptual understanding. Distractor-level review builds the missing depth.',
            false, null
        ));

        return actions;
    }

    function _actionsForReady(bp) {
        var actions = [];
        var preferredDiff = _getPreferredDifficulty(bp);
        var weakTopics = _getWeaknessTopics();

        // R1: Increase difficulty
        if (preferredDiff !== 'harder') {
            actions.push(_act(
                ACTION.INCREASE_DIFFICULTY, PRI.HIGHEST,
                'Increase difficulty',
                'You are currently using ' + preferredDiff + ' difficulty. Raise to Harder form to prepare for exam conditions. ' +
                'Harder questions test edge cases and nuance that distinguish passing from high-performing candidates.',
                'Exam-ready learners need to train at or above exam difficulty. Comfort-level practice produces comfort-level results.',
                true, 'increaseDifficulty'
            ));
        }

        // R2: Timed mixed-domain practice
        actions.push(_act(
            ACTION.TIMED_MIXED_PRACTICE, PRI.HIGH,
            'Run timed mixed-domain sessions',
            'Shift from topic-focused practice to full-length timed mixed-domain sessions. ' +
            'This builds exam stamina and tests your ability to context-switch between domains under time pressure.',
            'The CMA exam tests integrated recall across all six domains. Mixed practice is the only way to build the retrieval agility required on exam day.',
            true, 'runTimedMixedPractice'
        ));

        // R3: Maintain vigilance on weak areas
        if (weakTopics && weakTopics.length > 0) {
            var weakNames = weakTopics.slice(0, 2).map(function(w) { return w.topic; }).join(', ');
            actions.push(_act(
                ACTION.MAINTAIN_VIGILANCE, PRI.MEDIUM,
                'Watch remaining weak areas',
                'Your remaining weak topics (' + weakNames + ') need periodic review. ' +
                'Even one session every two weeks on these topics prevents skill decay and keeps them from becoming exam-day surprises.',
                'Exam-ready learners with residual weak topics are at risk of regression. Periodic maintenance protects your readiness band.',
                false, null
            ));
        } else {
            actions.push(_act(
                ACTION.MAINTAIN_VIGILANCE, PRI.MEDIUM,
                'Maintain broad coverage',
                'All domains are strong. Maintain breadth by running mixed-domain sessions at least once a week. ' +
                'Consider focusing on Technology & Analytics (Section F) — it is the fastest-evolving CMA domain.',
                'Readiness requires maintenance. Without regular mixed practice, domain-specific skills decay at different rates.',
                false, null
            ));
        }

        return actions;
    }

    // ═══════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════

    /**
     * Generate prioritized coaching actions for a learner archetype.
     * @param {Object} bp — behavioral profile from MayLearnerState.getBehavioralProfile()
     * @returns {Array} 1-3 prioritized action objects
     */
    function getCoachingActions(bp) {
        if (!bp || !bp.hasProfileData) return [];

        switch (bp.archetype) {
            case 'new':        return _actionsForNew(bp);
            case 'developing': return _actionsForDeveloping(bp);
            case 'plateaued':  return _actionsForPlateaued(bp);
            case 'ready':      return _actionsForReady(bp);
            default:           return [];
        }
    }

    /**
     * Get a human-readable archetype summary card.
     * @param {Object} bp — behavioral profile
     * @returns {Object|null} { archetype, label, emoji, color, confidence, factorSummary }
     */
    function getArchetypeSummary(bp) {
        if (!bp || !bp.hasProfileData) return null;
        var s = SUMMARIES[bp.archetype] || SUMMARIES['new'];
        var factorLabels = (bp.archetypeFactors || []).map(function(f) {
            return f.replace(/_/g, ' ');
        });
        return {
            archetype: bp.archetype,
            label: s.label,
            emoji: s.emoji,
            color: s.color,
            confidence: bp.archetypeConfidence || 0,
            factorSummary: factorLabels.join(', '),
            plateaued: bp.plateau && bp.plateau.isPlateaued,
            sessionCount: bp.sessionCount || 0,
            readinessBand: _getReadinessBand(bp)
        };
    }

    // ── Action handler registry ──
    // Maps handler names to human-readable action descriptions.
    // The actual execution logic lives in the rendering layer (app.js / may-core.js).
    function getHandlerLabel(handlerName) {
        var labels = {
            'startFoundations':      'Start a practice session',
            'focusWeakest':          'View weakest domain',
            'continueRecovery':      'View recovery options',
            'launchRecoverySprint':  'Launch recovery sprint',
            'increaseDifficulty':    'Change difficulty settings',
            'runTimedMixedPractice': 'Start timed mixed session'
        };
        return labels[handlerName] || '';
    }

    return {
        VERSION: VERSION,
        ACTION: ACTION,
        PRI: PRI,
        SECTION_LABELS: SECTION_LABELS,
        getCoachingActions: getCoachingActions,
        getArchetypeSummary: getArchetypeSummary,
        getHandlerLabel: getHandlerLabel
    };

})();
