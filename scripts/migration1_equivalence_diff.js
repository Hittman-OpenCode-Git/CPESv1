/**
 * migration1_equivalence_diff.js — Old-vs-New extraction equivalence proof
 * =========================================================================
 *
 * Migration 1 deliverable: proves the canonical parser (pack_parser.js)
 * extracts equivalent object sets versus the LEGACY whole-array algorithm
 * (verbatim copy of pre-migration ExplanationValidator extractQuestions /
 * extractCases), across every file the validator consumes.
 *
 * OLD = verbatim legacy algorithm (JSON.parse → Function-constructor
 *       fallback; silent null on failure or unmatched declaration).
 * NEW = parsePack + bank-pattern filter.
 *
 * READ-ONLY. Exit 0 iff every file: counts equal AND normalized deep-equal.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parsePack } = require('./lib/pack_parser.js');
const config = require('./config');

// ── OLD: verbatim legacy algorithm (intentionally unmodernized) ──────

function legacyExtract(content, varNamePattern) {
    const re = new RegExp('(?:const|let|var)\\s+(' + varNamePattern + ')\\s*=\\s*\\[');
    const varMatch = content.match(re);
    if (!varMatch) return { arr: null, via: 'null' };
    const arrStart = content.indexOf('[', varMatch.index);
    let depth = 1, pos = arrStart + 1;
    let inString = false, stringChar = "", escape = false;
    while (depth > 0 && pos < content.length) {
        const ch = content[pos];
        if (escape) { escape = false; pos++; continue; }
        if (inString) {
            if (ch === '\\') { escape = true; pos++; continue; }
            if (ch === stringChar) { inString = false; stringChar = ""; }
            pos++; continue;
        }
        if (ch === '"' || ch === "'") {
            inString = true;
            stringChar = ch;
            pos++; continue;
        }
        if (ch === '[') depth++;
        else if (ch === ']') depth--;
        pos++;
    }
    const jsStr = content.substring(arrStart, pos);
    try { return { arr: JSON.parse(jsStr), via: 'json' }; } catch (e) {
        try {
            const fn = new Function('return (' + jsStr + ')');
            return { arr: fn(), via: 'function-constructor' };
        } catch (e2) { return { arr: null, via: 'null' }; }
    }
}

// ── NEW: canonical parser ────────────────────────────────────────────

function newExtract(content, bankPattern) {
    let parsed;
    try {
        parsed = parsePack(content, {});
    } catch (e) {
        return { arr: null, via: 'invariant-throw', fallback: -1 };
    }
    const banks = parsed.banks.filter((b) => bankPattern.test(b.name)).map((b) => b.name);
    if (banks.length === 0) return { arr: null, via: 'no-match', fallback: -1 };
    const set = new Set(banks);
    const recs = parsed.records.filter((r) => set.has(r.bank));
    return {
        arr: recs.map((r) => r.object),
        via: recs.some((r) => r.parsedVia === 'function-constructor') ? 'json+fb' : 'json',
        fallback: recs.filter((r) => r.parsedVia === 'function-constructor').length,
    };
}

// ── Compare ──────────────────────────────────────────────────────────

function norm(v) {
    if (Array.isArray(v)) return v.map(norm);
    if (v && typeof v === 'object') {
        const o = {};
        for (const k of Object.keys(v).sort()) o[k] = norm(v[k]);
        return o;
    }
    return v;
}
function deepEq(a, b) {
    return JSON.stringify(norm(a)) === JSON.stringify(norm(b));
}

const FILES = [
    ...config.questionPacks.map((f) => ({ f, pattern: 'MCQ_BANK_\\w+', re: /^MCQ_BANK_/ })),
    ...config.caseBanks.map((f) => ({ f, pattern: 'ENHANCED_CASE_BASE\\d*', re: /^ENHANCED_CASE_BASE\d*$/ })),
];

let mismatches = 0;
console.log('== MIGRATION 1 EQUIVALENCE DIFF ==');
console.log('(old = verbatim legacy algorithm | new = canonical pack_parser)\n');
console.log('file'.padEnd(46) + 'oldN'.padEnd(7) + 'newN'.padEnd(7) + 'oldVia'.padEnd(21) + 'newFallback'.padEnd(12) + 'identical');

for (const { f, pattern, re } of FILES) {
    const fp = path.join(config.paths.root, f);
    let row = ('  ' + f).padEnd(46);
    if (!fs.existsSync(fp)) {
        console.log(row + 'MISSING');
        mismatches++;
        continue;
    }
    const content = fs.readFileSync(fp, 'utf8');
    const oldR = legacyExtract(content, pattern);
    const newR = newExtract(content, re);

    const oldArr = oldR.arr;
    const newArr = newR.arr;
    const countEq = (oldArr ? oldArr.length : -1) === (newArr ? newArr.length : -1);
    const eq = countEq && deepEq(oldArr || [], newArr || []);
    let firstBad = '-';
    if (!eq && oldArr && newArr) {
        for (let i = 0; i < Math.max(oldArr.length, newArr.length); i++) {
            if (!deepEq(oldArr[i], newArr[i])) { firstBad = String(i); break; }
        }
    }
    if (!eq) mismatches++;
    console.log(
        row +
        String(oldArr ? oldArr.length : 'null').padEnd(7) +
        String(newArr ? newArr.length : 'null').padEnd(7) +
        String(oldR.via).padEnd(21) +
        String(newR.fallback < 0 ? '-' : newR.fallback).padEnd(12) +
        (eq ? 'TRUE' : 'FALSE (first diff idx=' + firstBad + ')')
    );
}

console.log('\n== VERDICT: ' + (mismatches === 0 ? 'EQUIVALENT on shared scope' : mismatches + ' file(s) differ') + ' ==');
process.exit(mismatches === 0 ? 0 : 1);
