/**
 * may-avatar.js
 * Controller for the "May" ledger mascot.
 *
 * States: 'idle' | 'speaking' | 'pointing-to-explanation' | 'reduced'
 * ('reduced' = T6 degraded indicator DL-060: renderer/data source is
 *  degraded, so May switches to a flattened low-emphasis pose + badge.)
 *
 * Motion contract (HS-10):
 *   1. Animations only ever play inside a short window opened by
 *      renderView() boundaries (view enter/leave), never while the
 *      exam timer is ticking.
 *   2. prefers-reduced-motion: reduce is honored unconditionally.
 *   3. A user-facing "Disable animations" toggle (persisted) can force
 *      motion off regardless of OS setting.
 *   State changes ALWAYS apply (May must still reflect reality, e.g. an
 *   immediate switch to 'reduced' for DL-060), only the *animated
 *   transition* is suppressed outside a boundary window.
 */

const MAY_STATES = Object.freeze([
  'idle',
  'speaking',
  'pointing-to-explanation',
  'reduced',
]);

const STATE_CLASS = {
  idle: 'may-idle',
  speaking: 'may-speaking',
  'pointing-to-explanation': 'may-pointing',
  reduced: 'may-reduced',
};

const STORAGE_KEY = 'may.animationsDisabled';
const BOUNDARY_WINDOW_MS = 650; // long enough to cover the longest keyframe (may-point-swing/may-talk loop tick)

export class MayAvatar {
  /**
   * @param {HTMLElement|SVGElement} rootEl - the .may-avatar root element (svg)
   * @param {object} [opts]
   * @param {boolean} [opts.disabledByDefault]
   */
  constructor(rootEl, opts = {}) {
    if (!rootEl) throw new Error('MayAvatar: rootEl is required');
    this.root = rootEl;
    this.state = 'idle';
    this.examTimerActive = false;
    this._boundaryTimeout = null;

    const stored = MayAvatar._readDisabledPref();
    this.userDisabled = stored !== null ? stored : Boolean(opts.disabledByDefault);

    this._mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    this._onMqChange = () => this._syncDisabledClass();
    this._mq.addEventListener
      ? this._mq.addEventListener('change', this._onMqChange)
      : this._mq.addListener(this._onMqChange); // Safari <14 fallback

    this._applyStateClass('idle');
    this._syncDisabledClass();
  }

  static _readDisabledPref() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return null;
      return raw === 'true';
    } catch {
      return null;
    }
  }

  /** Wire an existing checkbox <input type="checkbox"> to the toggle. */
  bindDisableToggle(checkboxEl) {
    if (!checkboxEl) return;
    checkboxEl.checked = this.userDisabled;
    checkboxEl.addEventListener('change', () => {
      this.setAnimationsDisabled(checkboxEl.checked);
    });
  }

  setAnimationsDisabled(disabled) {
    this.userDisabled = Boolean(disabled);
    try {
      localStorage.setItem(STORAGE_KEY, String(this.userDisabled));
    } catch {
      /* storage unavailable; setting still applies for this session */
    }
    this._syncDisabledClass();
  }

  _syncDisabledClass() {
    const forceOff = this.userDisabled || this._mq.matches;
    this.root.classList.toggle('anim-disabled', forceOff);
  }

  /** Call once when an exam-timed question view starts ticking. */
  onExamTimerStart() {
    this.examTimerActive = true;
    this._closeBoundaryWindow();
  }

  /** Call when the exam timer stops (submit, pause, view exit). */
  onExamTimerStop() {
    this.examTimerActive = false;
  }

  /**
   * Call this immediately after your app's renderView() finishes
   * drawing a new view (i.e. at the render boundary), e.g.:
   *   function renderView(view) {
   *     paintDOM(view);
   *     may.onRenderViewBoundary();
   *   }
   * Opens a short window in which state-change animations are allowed.
   * No-ops (silently) while the exam timer is active.
   */
  onRenderViewBoundary() {
    if (this.examTimerActive) return;
    this._openBoundaryWindow();
  }

  _openBoundaryWindow() {
    this.root.classList.add('may-animate-boundary');
    clearTimeout(this._boundaryTimeout);
    this._boundaryTimeout = setTimeout(
      () => this._closeBoundaryWindow(),
      BOUNDARY_WINDOW_MS
    );
  }

  _closeBoundaryWindow() {
    clearTimeout(this._boundaryTimeout);
    this.root.classList.remove('may-animate-boundary');
  }

  _applyStateClass(state) {
    Object.values(STATE_CLASS).forEach((c) => this.root.classList.remove(c));
    this.root.classList.add(STATE_CLASS[state]);
    this.root.setAttribute('aria-label', MayAvatar._labelFor(state));
  }

  static _labelFor(state) {
    switch (state) {
      case 'speaking':
        return 'May, your exam guide, speaking';
      case 'pointing-to-explanation':
        return 'May, your exam guide, pointing to an explanation';
      case 'reduced':
        return 'May, your exam guide, running in degraded mode (DL-060)';
      default:
        return 'May, your exam guide, idle';
    }
  }

  /**
   * Change state. If called at a renderView() boundary (i.e. shortly
   * after onRenderViewBoundary()) and motion is allowed, the transition
   * animates; otherwise the pose changes instantly with no animation --
   * this is what keeps 'reduced' (DL-060) switching immediate/safe even
   * mid-timer, per HS-10 + the exam-timer motion restriction.
   */
  setState(state) {
    if (!MAY_STATES.includes(state)) {
      throw new Error(`MayAvatar: unknown state "${state}"`);
    }
    if (this.examTimerActive) {
      this._closeBoundaryWindow(); // guarantee no animation classes linger
    }
    this.state = state;
    this._applyStateClass(state);
  }

  destroy() {
    clearTimeout(this._boundaryTimeout);
    this._mq.removeEventListener
      ? this._mq.removeEventListener('change', this._onMqChange)
      : this._mq.removeListener(this._onMqChange);
  }
}

export { MAY_STATES };
