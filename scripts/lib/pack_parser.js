/**
 * pack_parser.js — Canonical Pack Parser (Item 1, Phase A)
 * ========================================================
 *
 * Single-source-of-truth parser for MCQ pack / case bank files.
 * Replaces per-script ad-hoc extraction (whole-file `new Function` evals,
 * forward-scanning regex windows) that produced DL-016/DL-020/DL-029-class
 * scan artifacts and silent object drops.
 *
 * CONTRACT
 * --------
 * parsePack(content, options) is a PURE function of (content, options):
 *   - no clock, randomness, filesystem, or environment reads;
 *   - records are emitted in file order; diagnostics are sorted stably by
 *     (offsets.start, code, message); identical inputs produce deep-equal
 *     outputs across runs (enforced by unit test, scripts/test_pack_parser.js).
 *
 * ZERO-SILENT-DROP INVARIANT (enforced in code, not just tests)
 *   Every top-level `{` directly inside a discovered bank array becomes
 *   exactly one record (parsed via JSON or JS fallback) OR exactly one
 *   ERROR diagnostic (unparseable region). An independent second counting
 *   method (start-token census at array depth 1) must agree with the
 *   brace-matched region count before parsePack returns:
 *       records.length + errorDiagnostics.length === totalRegions
 *   Any disagreement throws `ParserInvariantViolation` — parsePack never
 *   returns null/undefined and never silently drops a byte region.
 *
 * SEVERITY TAXONOMY (two levels, defined contract)
 *   ERROR   — region could not be materialized as an object: both JSON.parse
 *             and the JS fallback failed; truncated array/object at EOF;
 *             mismatched closer; junk tokens between elements.
 *             Meaning: consumers cannot trust this region's data.
 *   WARNING — degraded provenance on materialized data: region parsed only
 *             via the JS fallback (JS-tolerated syntax: bare numeric keys,
 *             single quotes, trailing commas); no bank array found in input.
 *             Meaning: data is available but provenance is flagged.
 *
 * ROLE TAGGING (dual-block architecture, per DL-016/DL-026)
 *   'metadata' — flat ChoiceA–D / ExplanationWrongA–D keys present,
 *                no nested Choices + CorrectChoice.
 *   'content'  — nested Choices plus CorrectChoice/Correct present,
 *                no flat ChoiceA–D keys.
 *   'single'   — both shapes in one object (Pack B / Pack A Section E style).
 *   null       — neither shape detected (e.g., case exhibits).
 *   CorrectChoice is always read from the SAME enclosing parsed object as the
 *   ExplanationWrong fields evaluated against it (DL-029 structural fix).
 *
 * toCanonicalRecords(parseResult)
 *   Optional consumer-facing view: merges adjacent metadata+content blocks
 *   sharing a QID into one canonical record with explicit provenance
 *   (architecture, dualBlock, contentChoicesMatchMetadata, parsedVia).
 *   Unclassifiable objects are emitted with architecture:'unclassified' —
 *   nothing is omitted.
 *
 * LIMITATIONS (deliberate, documented)
 *   - Backticks are NOT treated as string delimiters: repo bank data is
 *     JSON-style with no legitimate template literals. Treating '`' as a
 *     plain character keeps DL-017-corrupted regions brace-balanced and
 *     isolated to a single diagnostic instead of swallowing neighbours.
 *   - No // or block-comment awareness; no regex-literal awareness. Bank
 *     files contain none between array elements.
 *   - A bare sub-array directly inside a bank array (array of arrays) is
 *     counted as junk by discovery but excluded from the census; such input
 *     trips the invariant throw by design — it should surface loudly.
 *
 * SECURITY
 *   The JS fallback executes `new Function(...)` on region text. This is
 *   build-time tooling for trusted repository files ONLY (same trust model
 *   as scripts/preflight.js). Never point parsePack at untrusted input.
 */

'use strict';

// ── Public constants ─────────────────────────────────────────────────

const SEVERITY = Object.freeze({
  ERROR: 'error',
  WARNING: 'warning',
});

const CODES = Object.freeze({
  REGION_PARSE_FAILED: 'REGION_PARSE_FAILED',
  TRUNCATED_ARRAY: 'TRUNCATED_ARRAY',
  MISMATCHED_CLOSER: 'MISMATCHED_CLOSER',
  JUNK_TOKENS: 'JUNK_TOKENS',
  JS_FALLBACK_USED: 'JS_FALLBACK_USED',
  NO_ARRAYS_FOUND: 'NO_ARRAYS_FOUND',
});

// Declaration may carry // line comments between '=' and '[' — observed in
// the wild as BLOCK-AUTHORIZED batch annotations (Pack C, S853 remediation).
const DECL_RE = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:\/\/[^\n]*\n\s*)*\[/g;

// ── Internals ────────────────────────────────────────────────────────

function isQuote(ch) {
  return ch === '"' || ch === "'";
}

/**
 * Discover top-level bank-array declarations.
 * Returns [{ name, start }] where start indexes the '[' character.
 */
function discoverArrays(content) {
  const out = [];
  DECL_RE.lastIndex = 0;
  let m;
  while ((m = DECL_RE.exec(content)) !== null) {
    const bracket = content.indexOf('[', m.index + m[0].length - 1);
    if (bracket === -1) break;
    out.push({ name: m[1], start: bracket });
    DECL_RE.lastIndex = bracket + 1; // resume after this array's opening
  }
  return out;
}

/**
 * String-aware stack-based scan for the matching end of an array.
 * start must index '['. Returns { end (exclusive), truncated, mismatch }.
 */
function findArrayEnd(content, start) {
  const stack = ['['];
  let inString = false;
  let sc = '';
  let esc = false;
  let i = start + 1;
  while (i < content.length) {
    const ch = content[i];
    if (esc) { esc = false; i++; continue; }
    if (inString) {
      if (ch === '\\') { esc = true; i++; continue; }
      if (ch === sc) { inString = false; sc = ''; }
      i++;
      continue;
    }
    if (isQuote(ch)) { inString = true; sc = ch; i++; continue; }
    if (ch === '[' || ch === '{') { stack.push(ch); i++; continue; }
    if (ch === ']' || ch === '}') {
      const open = stack.pop();
      const expectedClose = open === '[' ? ']' : '}';
      if (ch !== expectedClose) {
        return { end: i, truncated: true, mismatch: { expected: expectedClose, found: ch, at: i } };
      }
      if (stack.length === 0) return { end: i + 1, truncated: false };
      i++;
      continue;
    }
    i++;
  }
  return { end: content.length, truncated: true };
}

/**
 * Scan [from, to) for top-level object regions and junk token runs.
 * Regions are brace-matched spans {start, end-exclusive, truncated}.
 */
function scanObjectRegions(content, from, to) {
  const regions = [];
  const junk = [];
  let i = from;
  let inString = false;
  let sc = '';
  let esc = false;
  while (i < to) {
    const ch = content[i];
    if (esc) { esc = false; i++; continue; }
    if (inString) {
      if (ch === '\\') { esc = true; i++; continue; }
      if (ch === sc) { inString = false; sc = ''; }
      i++;
      continue;
    }
    if (isQuote(ch)) { inString = true; sc = ch; i++; continue; }

    if (ch === '{') {
      let depth = 1;
      let j = i + 1;
      let s2 = false;
      let c2 = '';
      let e2 = false;
      while (j < to && depth > 0) {
        const c = content[j];
        if (e2) { e2 = false; j++; continue; }
        if (s2) {
          if (c === '\\') { e2 = true; j++; continue; }
          if (c === c2) { s2 = false; c2 = ''; }
          j++;
          continue;
        }
        if (isQuote(c)) { s2 = true; c2 = c; j++; continue; }
        if (c === '{') depth++;
        else if (c === '}') depth--;
        j++;
      }
      regions.push({ start: i, end: j, truncated: depth > 0 });
      i = j;
      continue;
    }

    if (/\s/.test(ch) || ch === ',') { i++; continue; }

    // Closing bracket terminates element scanning (end may be inclusive
    // depending on discovery's boundary report).
    if (ch === ']') break;

    // Junk run: consume until whitespace/comma or a structural char.
    let j = i;
    while (j < to) {
      const c = content[j];
      if (/[\s,{}[\]"']/.test(c)) break;
      j++;
    }
    if (j === i) j = i + 1; // structural stray char — consume singly
    junk.push({ start: i, end: j });
    i = j;
  }
  return { regions, junk };
}

/**
 * INDEPENDENT CENSUS — second counting method feeding the invariant.
 * Counts `{` occurrences that open an object directly inside the array
 * (arrayDepth === 1 && objDepth === 0), WITHOUT brace-matching closers.
 * Scope-bounded by the discovery pass's end offset so both methods count
 * the same interval; the counting mechanics remain fully independent.
 */
function censusTopLevelObjects(content, arrStart, stopAt) {
  let arrayDepth = 0;
  let objDepth = 0;
  let inString = false;
  let sc = '';
  let esc = false;
  let count = 0;
  let i = arrStart;
  while (i < stopAt) {
    const ch = content[i];
    if (esc) { esc = false; i++; continue; }
    if (inString) {
      if (ch === '\\') { esc = true; i++; continue; }
      if (ch === sc) { inString = false; sc = ''; }
      i++;
      continue;
    }
    if (isQuote(ch)) { inString = true; sc = ch; i++; continue; }
    if (ch === '[') arrayDepth++;
    else if (ch === ']') arrayDepth--;
    else if (ch === '{') {
      if (arrayDepth === 1 && objDepth === 0) count++;
      objDepth++;
    } else if (ch === '}') objDepth--;
    i++;
  }
  return count;
}

/** Prebuilt newline index → 1-based line lookup (binary search). */
function makeLineLookup(content) {
  const newlines = [0];
  let idx = content.indexOf('\n');
  while (idx !== -1) {
    newlines.push(idx + 1);
    idx = content.indexOf('\n', idx + 1);
  }
  return function lineOf(offset) {
    let lo = 0;
    let hi = newlines.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (newlines[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

/** Best-effort QID recovery from raw region text (works on corrupted spans). */
function recoverQid(text) {
  let m = text.match(/"QuestionID"\s*:\s*"([^"]*)"/);
  if (m) return m[1];
  m = text.match(/QuestionID\s*:\s*["']([^"']+)["']/);
  if (m) return m[1];
  m = text.match(/QuestionID\s*:\s*([A-Za-z_$][\w$]*)/);
  if (m) return m[1] + ' (identifier)';
  return null;
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/** Role tagging by field shape (DL-016 architecture detection). */
function tagRole(object) {
  if (!object || typeof object !== 'object') return null;
  const flatMeta =
    hasOwn(object, 'ChoiceA') || hasOwn(object, 'ExplanationWrongA');
  const nestedContent =
    hasOwn(object, 'Choices') &&
    (hasOwn(object, 'CorrectChoice') || hasOwn(object, 'Correct'));
  if (flatMeta && nestedContent) return 'single';
  if (flatMeta) return 'metadata';
  if (nestedContent) return 'content';
  return null;
}

function diag(severity, code, message, offsets, lineOf, extra) {
  return Object.assign(
    { severity, code, message, offsets, line: lineOf(offsets.start) },
    extra || {}
  );
}

// ── Public API ───────────────────────────────────────────────────────

/**
 * Parse pack/bank file content into per-object records + diagnostics.
 * Pure; deterministic; never returns null. Throws ParserInvariantViolation
 * if the zero-silent-drop accounting check fails.
 *
 * @param {string} content Raw file text.
 * @param {{sourceName?: string}} [options] Label used in messages only.
 */
function parsePack(content, options) {
  const opts = options || {};
  const sourceName = opts.sourceName || '(input)';
  const lineOf = makeLineLookup(content);
  const records = [];
  const diagnostics = [];
  const banks = [];

  const stats = {
    sourceName,
    bytesScanned: content.length,
    banksFound: 0,
    totalRegions: 0,
    parsedJson: 0,
    parsedJsFallback: 0,
    failed: 0,
    junkRuns: 0,
    truncatedArrays: 0,
    mismatchedClosers: 0,
  };

  const arrays = discoverArrays(content);

  if (arrays.length === 0) {
    diagnostics.push(
      diag(
        SEVERITY.WARNING,
        CODES.NO_ARRAYS_FOUND,
        sourceName + ': no `const|let|var NAME = [` bank declaration found.',
        { start: 0, end: Math.min(content.length, 80) },
        lineOf
      )
    );
  }

  for (const arr of arrays) {
    stats.banksFound++;
    banks.push({ name: arr.name, start: arr.start });

    const fe = findArrayEnd(content, arr.start);
    if (fe.mismatch) {
      stats.mismatchedClosers++;
      stats.truncatedArrays++;
      diagnostics.push(
        diag(
          SEVERITY.ERROR,
          CODES.MISMATCHED_CLOSER,
          sourceName +
            ' [' + arr.name + ']: mismatched closer — expected "' +
            fe.mismatch.expected + '", found "' + fe.mismatch.found + '".',
          { start: fe.mismatch.at, end: fe.mismatch.at + 1 },
          lineOf,
          { bank: arr.name }
        )
      );
    } else if (fe.truncated) {
      stats.truncatedArrays++;
      diagnostics.push(
        diag(
          SEVERITY.ERROR,
          CODES.TRUNCATED_ARRAY,
          sourceName + ' [' + arr.name + ']: array not closed before EOF.',
          { start: Math.max(arr.start, fe.end - 1), end: fe.end },
          lineOf,
          { bank: arr.name }
        )
      );
    }

    const scanned = scanObjectRegions(content, arr.start + 1, fe.end);

    for (const run of scanned.junk) {
      stats.junkRuns++;
      diagnostics.push(
        diag(
          SEVERITY.ERROR,
          CODES.JUNK_TOKENS,
          sourceName + ' [' + arr.name + ']: unexpected tokens between array elements: ' +
            JSON.stringify(content.slice(run.start, Math.min(run.end, run.start + 40))),
          { start: run.start, end: run.end },
          lineOf,
          { bank: arr.name }
        )
      );
    }

    // Independent census over the same interval.
    const census = censusTopLevelObjects(content, arr.start, fe.end);
    stats.totalRegions += census;

    let arrayRecords = 0;
    let arrayFailures = 0;

    for (const region of scanned.regions) {
      const text = content.slice(region.start, region.end);
      const qid = recoverQid(text);
      let object = null;
      let parsedVia = null;

      try {
        object = JSON.parse(text);
        parsedVia = 'json';
      } catch (eJson) {
        try {
          /* Trusted-repo build-time tooling only — see SECURITY note above. */
          object = new Function('return (' + text + ')')();
          parsedVia = 'function-constructor';
        } catch (eJs) {
          parsedVia = null;
        }
      }

      if (object !== null && typeof object === 'object') {
        const role = tagRole(object);
        const degraded = parsedVia === 'function-constructor';
        records.push({
          bank: arr.name,
          qid: typeof object.QuestionID === 'string' ? object.QuestionID : qid,
          role,
          object,
          parsedVia,
          degraded,
          offsets: { start: region.start, end: region.end },
          line: lineOf(region.start),
        });
        arrayRecords++;
        if (degraded) {
          stats.parsedJsFallback++;
          diagnostics.push(
            diag(
              SEVERITY.WARNING,
              CODES.JS_FALLBACK_USED,
              sourceName + ' [' + arr.name + '] ' + (qid || '(qid unrecovered)') +
                ': parsed via JS fallback (non-JSON syntax tolerated); provenance degraded.',
              { start: region.start, end: region.end },
              lineOf,
              { qid, bank: arr.name }
            )
          );
        } else {
          stats.parsedJson++;
        }
      } else {
        arrayFailures++;
        stats.failed++;
        const why =
          object === null
            ? 'region is not a valid object (JSON and JS fallback both failed' +
              (region.truncated ? '; region truncated' : '') + ')'
            : 'region evaluated to a non-object value';
        diagnostics.push(
          diag(
            SEVERITY.ERROR,
            CODES.REGION_PARSE_FAILED,
            sourceName + ' [' + arr.name + '] ' + (qid || '(qid unrecovered)') + ': ' + why + '.',
            { start: region.start, end: region.end },
            lineOf,
            { qid, bank: arr.name }
          )
        );
      }
    }

    // ── Zero-silent-drop invariant (condition 2) ──
    if (arrayRecords + arrayFailures !== census) {
      const err = new Error(
        'PARSER_INVARIANT_VIOLATION [' + sourceName + ' / ' + arr.name + ']: ' +
          'records(' + arrayRecords + ') + errorDiagnostics(' + arrayFailures + ')' +
          ' !== independentCensus(' + census + '). ' +
          'A byte region was dropped or double-counted near offset ' + arr.start + '.'
      );
      err.name = 'ParserInvariantViolation';
      err.details = {
        sourceName,
        bank: arr.name,
        arrayStart: arr.start,
        records: arrayRecords,
        failures: arrayFailures,
        census,
      };
      throw err;
    }
  }

  // Stable sort of diagnostics by (offsets.start, code, message).
  diagnostics.sort((a, b) =>
    a.offsets.start - b.offsets.start ||
    (a.code < b.code ? -1 : a.code > b.code ? 1 : 0) ||
    (a.message < b.message ? -1 : a.message > b.message ? 1 : 0)
  );

  return { records, diagnostics, stats, banks };
}

/**
 * Canonical merged view (consumer-facing; optional).
 * Pairs adjacent metadata+content records sharing (or missing) QIDs into
 * dual-block canonical entries; singles stand alone; anything unclassifiable
 * is preserved with architecture:'unclassified'. Never omits records.
 */
function toCanonicalRecords(parseResult) {
  const recs = parseResult.records;
  const canonical = [];
  const warningsFor = new Map(); // record -> string[]

  const warnOn = (rec, msg) => {
    if (!warningsFor.has(rec)) warningsFor.set(rec, []);
    warningsFor.get(rec).push(msg);
  };

  const used = new Array(recs.length).fill(false);

  const ewSlots = (obj) => {
    const ew = {};
    for (const L of ['A', 'B', 'C', 'D']) {
      if (obj && hasOwn(obj, 'ExplanationWrong' + L)) ew[L] = obj['ExplanationWrong' + L];
    }
    return ew;
  };

  const metaChoices = (obj) => {
    const out = {};
    for (const L of ['A', 'B', 'C', 'D']) {
      if (obj && hasOwn(obj, 'Choice' + L)) out[L] = obj['Choice' + L];
    }
    return out;
  };

  for (let i = 0; i < recs.length; i++) {
    if (used[i]) continue;
    const rec = recs[i];

    if (rec.role === 'single' || rec.role === null) {
      canonical.push({
        qid: rec.qid,
        architecture: rec.role === 'single' ? 'single' : 'unclassified',
        questionState: rec.object && rec.object.question_state != null ? rec.object.question_state : null,
        choices: rec.object && rec.object.Choices ? rec.object.Choices : null,
        correctChoice:
          rec.object && rec.object.CorrectChoice != null
            ? rec.object.CorrectChoice
            : rec.object && rec.object.Correct != null
              ? rec.object.Correct
              : null,
        explanationCorrect: rec.object ? rec.object.ExplanationCorrect ?? null : null,
        explanationWrong: ewSlots(rec.object),
        metadataChoices: rec.role === 'single' ? metaChoices(rec.object) : null,
        provenance: {
          dualBlock: false,
          contentChoicesMatchMetadata: null,
          parsedVia: rec.parsedVia,
          degraded: rec.degraded,
          offsets: rec.offsets,
          line: rec.line,
          bank: rec.bank,
        },
        warnings: warningsFor.get(rec) || [],
      });
      used[i] = true;
      continue;
    }

    if (rec.role === 'metadata') {
      const next = i + 1 < recs.length ? recs[i + 1] : null;
      const pairable =
        next &&
        !used[i + 1] &&
        next.role === 'content' &&
        (rec.qid == null || next.qid == null || rec.qid === next.qid);

      if (pairable) {
        used[i] = true;
        used[i + 1] = true;
        const meta = rec.object;
        const cont = next.object;
        let match = null;
        if (meta && cont && cont.Choices && typeof cont.Choices === 'object') {
          match = true;
          for (const L of ['A', 'B', 'C', 'D']) {
            if (hasOwn(meta, 'Choice' + L) && hasOwn(cont.Choices, L)) {
              if (meta['Choice' + L] !== cont.Choices[L]) { match = false; break; }
            }
          }
        }
        canonical.push({
          qid: rec.qid || next.qid,
          architecture: 'dual',
          questionState: meta && meta.question_state != null ? meta.question_state : null,
          choices: cont.Choices || null,
          correctChoice:
            cont.CorrectChoice != null ? cont.CorrectChoice : cont.Correct != null ? cont.Correct : null,
          explanationCorrect: cont.ExplanationCorrect ?? null,
          explanationWrong: ewSlots(meta),
          metadataChoices: metaChoices(meta),
          provenance: {
            dualBlock: true,
            contentChoicesMatchMetadata: match,
            parsedVia: { metadata: rec.parsedVia, content: next.parsedVia },
            degraded: rec.degraded || next.degraded,
            offsets: { start: rec.offsets.start, end: next.offsets.end },
            line: rec.line,
            bank: rec.bank,
          },
          warnings: (warningsFor.get(rec) || []).concat(warningsFor.get(next) || []),
        });
        continue;
      }

      // Unpaired metadata block.
      warnOn(rec, 'metadata block without following content block');
      canonical.push({
        qid: rec.qid,
        architecture: 'dual',
        contentMissing: true,
        questionState: rec.object && rec.object.question_state != null ? rec.object.question_state : null,
        choices: null,
        correctChoice: null,
        explanationCorrect: null,
        explanationWrong: ewSlots(rec.object),
        metadataChoices: metaChoices(rec.object),
        provenance: {
          dualBlock: true,
          contentChoicesMatchMetadata: null,
          parsedVia: { metadata: rec.parsedVia, content: null },
          degraded: rec.degraded,
          offsets: rec.offsets,
          line: rec.line,
          bank: rec.bank,
        },
        warnings: warningsFor.get(rec) || [],
      });
      used[i] = true;
      continue;
    }

    // role === 'content' with no preceding usable metadata block.
    warnOn(rec, 'content block without preceding metadata block');
    canonical.push({
      qid: rec.qid,
      architecture: 'dual',
      metadataMissing: true,
      questionState: null,
      choices: rec.object && rec.object.Choices ? rec.object.Choices : null,
      correctChoice:
        rec.object && rec.object.CorrectChoice != null
          ? rec.object.CorrectChoice
          : rec.object && rec.object.Correct != null
            ? rec.object.Correct
            : null,
      explanationCorrect: rec.object ? rec.object.ExplanationCorrect ?? null : null,
      explanationWrong: {},
      metadataChoices: null,
      provenance: {
        dualBlock: true,
        contentChoicesMatchMetadata: null,
        parsedVia: { metadata: null, content: rec.parsedVia },
        degraded: rec.degraded,
        offsets: rec.offsets,
        line: rec.line,
        bank: rec.bank,
      },
      warnings: warningsFor.get(rec) || [],
    });
    used[i] = true;
  }

  return canonical;
}

module.exports = {
  SEVERITY,
  CODES,
  parsePack,
  toCanonicalRecords,
};
