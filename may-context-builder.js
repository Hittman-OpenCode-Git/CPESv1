/**
 * MayContextBuilder — Builds structured coaching context from available data sources.
 * 
 * This is a standalone helper module. It is NOT wired into production UI.
 * It consumes global QUESTION_BANK, MayLearnerState, and app state to produce
 * a structured context object for May coaching functions.
 * 
 * Session: S76P (original prototype), MAY-001 (integration wiring)
 * Status: Active — wired behind MayFeatureFlags.ENABLE_CONTEXT_BUILDER (default: false)
 * Governance: Light Lane (helper utility, no pack/case/content impact)
 */

const MayContextBuilder = (function() {
  'use strict';

  // ─── Private ────────────────────────────────────────────────

  /**
   * Find a question in the bank by ID.
   * Searches both pack arrays and scored_cases arrays.
   */
  function _findQuestion(qid) {
    if (!qid) return null;
    
    // Search MCQ packs
    const packs = ['packA', 'packB', 'packC', 'packD', 'packE'];
    for (const packName of packs) {
      const pack = window[packName];
      if (!pack) continue;
      const found = pack.find(q => q.QuestionID === qid);
      if (found) return found;
    }
    
    // Search case files
    const caseFiles = ['scoredCases', 'scoredCases2', 'scoredCases3', 'scoredCases4', 'scoredCases5'];
    for (const caseName of caseFiles) {
      const cases = window[caseName];
      if (!cases) continue;
      for (const c of cases) {
        if (!c.Items) continue;
        const found = c.Items.find(item => item.ItemID === qid);
        if (found) {
          return { _question: found, _case: c, _isCaseItem: true };
        }
      }
    }
    
    return null;
  }

  /**
   * Infer domain name from section letter.
   */
  function _sectionName(section) {
    const map = {
      'A': 'External Financial Reporting Decisions',
      'B': 'Planning, Budgeting, and Forecasting',
      'C': 'Performance Management',
      'D': 'Cost Management',
      'E': 'Internal Controls',
      'F': 'Technology and Analytics'
    };
    return map[section] || 'Unknown';
  }

  /**
   * Get the current learner state from MayLearnerState if available.
   */
  function _getLearnerState() {
    try {
      if (typeof MayLearnerState !== 'undefined' && MayLearnerState.load) {
        return MayLearnerState.load();
      }
    } catch (e) { /* not available */ }
    return null;
  }

  /**
   * Get current app/session state.
   */
  function _getAppState() {
    const state = {
      examModeActive: false,
      coachingTabOpen: false,
      miniPanelOpen: false,
      enableLLM: false,
      tutoringPilotEnabled: false,
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
    };

    // Try to read May feature flags and config
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        state.enableLLM = MayFeatureFlags.isEnabled('ENABLE_LLM');
      }
      if (typeof May !== 'undefined' && May.config) {
        state.tutoringPilotEnabled = May.config.tutoringPilotEnabled || false;
        state.coachingTabOpen = May._coachingTabOpen || false;
        state.miniPanelOpen = May._miniPanelOpen || false;
        state.examModeActive = May._examModeActive || false;
      }
    } catch (e) { /* not loaded */ }

    return state;
  }

  /**
   * Determine recommended coaching mode from context.
   */
  function _recommendMode(context) {
    const q = context.question;
    const l = context.learner;
    const s = context.session;
    const a = context.app;

    if (a.examModeActive) return 'exam_briefing';
    if (s.isCompleted || s.isSubmitted) return 'post_session_review';
    if (s.previousQuestion && !s.previousQuestion.correct) return 'explain_wrong';
    if (s.previousQuestion && s.previousQuestion.correct && s.previousQuestion.confidence < 0.6) return 'explain_correct';
    if (s.hintsRequested > 0 && s.hintsRequested < 5) return 'hint';
    return 'socratic_probe';
  }

  // ─── Public API ──────────────────────────────────────────────

  /**
   * Build a complete QuestionContext from a QID.
   * @param {string} qid - Question ID (e.g. "P1-B-040")
   * @returns {Object|null} QuestionContext or null if not found
   */
  function buildQuestionContext(qid) {
    if (!qid) return null;

    const result = _findQuestion(qid);
    if (!result) return null;

    const isCase = result._isCaseItem;
    const qData = isCase ? result._question : result;
    const caseData = isCase ? result._case : null;

    return {
      questionId: qid,
      pack: _inferPack(qid),
      part: 1,
      section: qData.Section || (typeof qData.Part !== 'undefined' ? String.fromCharCode(64 + qData.Part) : null),
      sectionName: _sectionName(qData.Section || (qData.Part ? String.fromCharCode(64 + qData.Part) : null)),
      topic: qData.Topic || '',
      subtopic: qData.Subtopic || null,
      cognitiveLevel: qData.CognitiveLevel || 'Apply',
      difficulty: qData.Difficulty || 'Moderate',
      difficultyScore: qData.DifficultyScore || 3,
      stem: qData.Stem || qData.Prompt || '',
      choices: qData.Choices || {
        A: qData.ChoiceA || '',
        B: qData.ChoiceB || '',
        C: qData.ChoiceC || '',
        D: qData.ChoiceD || ''
      },
      correctChoice: qData.CorrectChoice || qData.Correct || '',
      explanationCorrect: qData.ExplanationCorrect || qData.Explanation || '',
      explanationWrong: {
        A: qData.ExplanationWrongA || '',
        B: qData.ExplanationWrongB || '',
        C: qData.ExplanationWrongC || '',
        D: qData.ExplanationWrongD || ''
      },
      questionState: qData.question_state || 'Unprocessed',
      isDefective: false,
      defectTags: [],
      formulaReference: qData.FormulaReference || null,
      losTag: qData.LOSTag || null,
      pedagogicalCluster: qData.pedagogical_cluster || null,
      isCaseItem: !!isCase,
      caseContext: isCase ? _buildCaseContext(caseData, qData) : null
    };
  }

  /**
   * Build a LearnerContext from MayLearnerState.
   * @returns {Object} LearnerContext (with defaults if no state available)
   */
  function buildLearnerContext() {
    const state = _getLearnerState();

    if (!state) {
      return {
        learnerId: 'anonymous',
        name: null,
        totalSessions: 0,
        totalAttempts: 0,
        overallAccuracy: 0,
        topicPerformance: {},
        weaknessClusters: [],
        readinessBands: {},
        sectionReadiness: {},
        confidenceCalibration: { overconfidentRate: 0, underconfidentRate: 0, calibratedRate: 0 },
        misconceptionMap: [],
        casePatterns: {},
        practiceMix: { recommendation: 'Mixed Practice', confidence: 0.5, evidenceFactors: [] },
        examPlan: null
      };
    }

    return {
      learnerId: state.selectedLearnerId || 'student_1',
      name: state.learnerName || null,
      totalSessions: state.totalSessions || 0,
      totalAttempts: state.totalAttempts || 0,
      overallAccuracy: state.overallAccuracy || 0,
      topicPerformance: state.topicPerformance || {},
      weaknessClusters: _buildWeaknessClusters(state),
      readinessBands: _buildReadinessBands(state),
      sectionReadiness: _buildSectionReadiness(state),
      confidenceCalibration: state.confidenceCalibration || { overconfidentRate: 0, underconfidentRate: 0, calibratedRate: 0 },
      misconceptionMap: state.misconceptionMap || [],
      casePatterns: _buildCasePatterns(state),
      practiceMix: _buildPracticeMix(state),
      examPlan: state.examPlan || null
    };
  }

  /**
   * Build a SessionContext from current app state.
   * @returns {Object} SessionContext
   */
  function buildSessionContext() {
    try {
      const appState = window.state || window.appState || {};
      const session = appState.session || {};

      return {
        sessionId: session.id || null,
        sessionType: session.mode || 'practice',
        mode: session.mode || 'mcq',
        startTime: session.startTime || null,
        elapsedMs: session.elapsed || 0,
        currentQuestionIndex: session.qIndex || 0,
        totalQuestions: (session.mcqs ? session.mcqs.length : 0) + (session.cases ? session.cases.length : 0),
        mcqsAnswered: session.mcqsAnswered || 0,
        casesStarted: session.casesStarted || 0,
        casesCompleted: session.casesCompleted || 0,
        isCompleted: session.completed || false,
        isSubmitted: session.submitted || false,
        currentTopic: null,
        previousQuestion: null,
        hintsRequested: 0
      };
    } catch (e) {
      return {
        sessionId: null,
        sessionType: 'unknown',
        mode: 'unknown',
        isCompleted: false,
        isSubmitted: false
      };
    }
  }

  /**
   * Build AppContext.
   * @returns {Object} AppContext
   */
  function buildAppContext() {
    return {
      mayConfig: _getAppState(),
      defectManifestVersion: null,
      questionBankHash: null,
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
    };
  }

  /**
   * Build the full MayContext object.
   * @param {string} qid - Current question ID (optional)
   * @returns {Object} MayContext
   */
  function buildFullContext(qid) {
    const question = qid ? buildQuestionContext(qid) : null;
    const learner = buildLearnerContext();
    const session = buildSessionContext();
    const app = buildAppContext();

    return {
      question: question,
      learner: learner,
      session: session,
      app: app,
      recommendedCoachingMode: _recommendMode({ question, learner, session, app }),
      timestamp: new Date().toISOString()
    };
  }

  // ─── Private Builders ────────────────────────────────────────

  function _inferPack(qid) {
    if (!qid) return 'unknown';
    if (qid.startsWith('P1B-')) return 'B';
    if (qid.startsWith('P1-')) {
      const section = qid.match(/P1-([A-F])-/);
      if (section) return 'A'; // Pack A format: P1-X-NNN
    }
    if (qid.startsWith('P1E-')) return 'E';
    if (qid.startsWith('P1C-')) return 'C';
    if (qid.startsWith('P1D-')) return 'D';
    if (qid.startsWith('CBQ')) {
      const num = qid.match(/^CBQ(\d*)/);
      if (num && num[1]) {
        const packNum = parseInt(num[1]);
        return ['', 'A', 'B', 'C', 'D', 'E'][packNum] || 'unknown';
      }
      return 'A'; // CBQ (no number) = Pack 1
    }
    return 'unknown';
  }

  function _buildCaseContext(caseData, itemData) {
    if (!caseData) return null;
    return {
      caseId: caseData.CaseID || '',
      caseTitle: caseData.Title || '',
      itemIndex: caseData.Items ? caseData.Items.indexOf(itemData) + 1 : 0,
      totalCaseItems: caseData.Items ? caseData.Items.length : 0,
      exhibitCount: caseData.Exhibits ? caseData.Exhibits.length : 0,
      previousItemsAnswered: 0,
      previousItemsCorrect: 0,
      scenarioText: caseData.ScenarioText || ''
    };
  }

  function _buildWeaknessClusters(state) {
    if (state.getWeaknessClusters) {
      try { return state.getWeaknessClusters(); } catch (e) {}
    }
    return [];
  }

  function _buildReadinessBands(state) {
    if (state.getReadinessSummary) {
      try {
        const summary = state.getReadinessSummary();
        const bands = {};
        if (summary && summary.topics) {
          for (const [topic, data] of Object.entries(summary.topics)) {
            bands[topic] = data.band || 'Insufficient data';
          }
        }
        return bands;
      } catch (e) {}
    }
    return {};
  }

  function _buildSectionReadiness(state) {
    if (state.getSectionReadinessSummary) {
      try { return state.getSectionReadinessSummary(); } catch (e) {}
    }
    return {};
  }

  function _buildCasePatterns(state) {
    if (state.getCasePatternSummary) {
      try { return state.getCasePatternSummary(); } catch (e) {}
    }
    return {};
  }

  function _buildPracticeMix(state) {
    if (state.getAdaptivePracticeMix) {
      try { return state.getAdaptivePracticeMix(); } catch (e) {}
    }
    return { recommendation: 'Mixed Practice', confidence: 0.5, evidenceFactors: [] };
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    buildQuestionContext: buildQuestionContext,
    buildLearnerContext: buildLearnerContext,
    buildSessionContext: buildSessionContext,
    buildAppContext: buildAppContext,
    buildFullContext: buildFullContext
  };

})();

// Make available globally (non-invasive — window namespace, does not auto-execute)
if (typeof window !== 'undefined') {
  window.MayContextBuilder = MayContextBuilder;
}

// Export for Node.js testability
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayContextBuilder;
}
