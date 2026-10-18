/**
 * may-avatar.js
 * W6 (token may_v2_1_may_avatar) — Controller for the "May" ledger mascot.
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
 *
 * Codebase adaptation (Light Lane, may_v2_1_may_avatar):
 *   - Asset file (`assets/may-avatar.js`) uses ES module `export class`.
 *     The May layer uses IIFE + window.* + module.exports. This file is
 *     the IIFE-shaped equivalent; class syntax preserved (modern engines
 *     handle ES6 classes inside an IIFE).
 *   - The CSS in `app/may/may-avatar.css` is scoped under
 *     `.may-companion-avatar` to avoid clashing with the small text
 *     avatar at styles.css:2789 / may-core.js:4639,4875.
 */

var MayAvatar = (function () {
  'use strict';

  var MAY_STATES = Object.freeze([
    'idle',
    'speaking',
    'pointing-to-explanation',
    'reduced'
  ]);

  var STATE_CLASS = {
    'idle': 'may-idle',
    'speaking': 'may-speaking',
    'pointing-to-explanation': 'may-pointing',
    'reduced': 'may-reduced'
  };

  var STORAGE_KEY = 'may.animationsDisabled';
  var BOUNDARY_WINDOW_MS = 650; // long enough to cover the longest keyframe (may-point-swing/may-talk loop tick)

  function _labelFor(state) {
    switch (state) {
      case 'speaking': return 'May, your exam guide, speaking';
      case 'pointing-to-explanation': return 'May, your exam guide, pointing to an explanation';
      case 'reduced': return 'May, your exam guide, running in degraded mode (DL-060)';
      default: return 'May, your exam guide, idle';
    }
  }

  function MayAvatar(rootEl, opts) {
    if (!rootEl) throw new Error('MayAvatar: rootEl is required');
    if (!(this instanceof MayAvatar)) return new MayAvatar(rootEl, opts);
    opts = opts || {};

    this.root = rootEl;
    this.state = 'idle';
    this.examTimerActive = false;
    this._boundaryTimeout = null;

    var stored = MayAvatar._readDisabledPref();
    this.userDisabled = stored !== null ? stored : !!opts.disabledByDefault;

    var self = this;
    this._mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    this._onMqChange = function () { self._syncDisabledClass(); };
    if (this._mq.addEventListener) {
      this._mq.addEventListener('change', this._onMqChange);
    } else if (this._mq.addListener) {
      // Safari <14 fallback
      this._mq.addListener(this._onMqChange);
    }

    this._applyStateClass('idle');
    this._syncDisabledClass();
  }

  MayAvatar._readDisabledPref = function () {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return null;
      return raw === 'true';
    } catch (e) {
      return null;
    }
  };

  MayAvatar.prototype.bindDisableToggle = function (checkboxEl) {
    if (!checkboxEl) return;
    checkboxEl.checked = this.userDisabled;
    var self = this;
    checkboxEl.addEventListener('change', function () {
      self.setAnimationsDisabled(checkboxEl.checked);
    });
  };

  MayAvatar.prototype.setAnimationsDisabled = function (disabled) {
    this.userDisabled = !!disabled;
    try {
      localStorage.setItem(STORAGE_KEY, String(this.userDisabled));
    } catch (e) {
      /* storage unavailable; setting still applies for this session */
    }
    this._syncDisabledClass();
  };

  MayAvatar.prototype._syncDisabledClass = function () {
    var forceOff = this.userDisabled || (this._mq && this._mq.matches);
    if (forceOff) {
      this.root.classList.add('anim-disabled');
    } else {
      this.root.classList.remove('anim-disabled');
    }
  };

  MayAvatar.prototype.onExamTimerStart = function () {
    this.examTimerActive = true;
    this._closeBoundaryWindow();
  };

  MayAvatar.prototype.onExamTimerStop = function () {
    this.examTimerActive = false;
  };

  MayAvatar.prototype.onRenderViewBoundary = function () {
    if (this.examTimerActive) return;
    this._openBoundaryWindow();
  };

  MayAvatar.prototype._openBoundaryWindow = function () {
    var self = this;
    this.root.classList.add('may-animate-boundary');
    if (this._boundaryTimeout) clearTimeout(this._boundaryTimeout);
    this._boundaryTimeout = setTimeout(function () {
      self._closeBoundaryWindow();
    }, BOUNDARY_WINDOW_MS);
  };

  MayAvatar.prototype._closeBoundaryWindow = function () {
    if (this._boundaryTimeout) {
      clearTimeout(this._boundaryTimeout);
      this._boundaryTimeout = null;
    }
    this.root.classList.remove('may-animate-boundary');
  };

  MayAvatar.prototype._applyStateClass = function (state) {
    var i, c;
    for (i = 0; i < MAY_STATES.length; i++) {
      c = STATE_CLASS[MAY_STATES[i]];
      if (c) this.root.classList.remove(c);
    }
    this.root.classList.add(STATE_CLASS[state]);
    this.root.setAttribute('aria-label', _labelFor(state));
  };

  MayAvatar.prototype.setState = function (state) {
    if (MAY_STATES.indexOf(state) === -1) {
      throw new Error('MayAvatar: unknown state "' + state + '"');
    }
    if (this.examTimerActive) {
      this._closeBoundaryWindow(); // guarantee no animation classes linger
    }
    this.state = state;
    this._applyStateClass(state);
  };

  MayAvatar.prototype.destroy = function () {
    if (this._boundaryTimeout) clearTimeout(this._boundaryTimeout);
    if (this._mq && this._mq.removeEventListener) {
      this._mq.removeEventListener('change', this._onMqChange);
    } else if (this._mq && this._mq.removeListener) {
      // Safari <14 fallback
      this._mq.removeListener(this._onMqChange);
    }
  };

  return MayAvatar;
})();

if (typeof window !== 'undefined') {
  window.MayAvatar = MayAvatar;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayAvatar;
}
