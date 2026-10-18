# Fringe Closeout — May Limits Probe (S3) — 2026-09-22

**Lane:** Governance Light Lane. Zero repo writes (1 temp-dir script).
**Verdict: 26/26 PASS — May holds at every fringe. 3 polish items, 0 defects.**

## Battery

| Fringe | Result | Evidence |
|--------|--------|----------|
| F1 buffer flood (1,200 events) | 4/4 | live 500, eviction exact (seq 700–1199 survive), byType sums 500, drain empties |
| F2 degradation under exam-integrity | 2/2 | tracked (active 1) + pill suppressed (visible false) — HS-4 correct; T6/log still record |
| F3 source storm (25) + dedupe | 2/2 | dupes add 0; scoped + global clear exact |
| F4 adversarial PII vs detector | 3/3 | injected learnerId/email caught (2 hits); reset purges; product path strips by construction |
| F5 non-compliant EV3 audit | 1/1 | 90/100 cited → compliant=false honestly reported |
| F6 empty-buffer audits | 3/3 | vacuous-clean, no crash, insufficient_data |
| F7 malformed inputs | 2/2 | never throws; still logged (visible, not silent) |
| F8 circuit-breaker | 2/2 | breach 1 → shut; 7 consecutive → open |
| F9 edge payloads + 1000-mode storm | 3/3 | 500-char reason accepted; empty source defaults; counter exact |
| F10 flag churn (150 toggles) | 4/4 | unknown rejected; changelog capped 100; state coherent |

## Remaining polish (ranked)

1. **P-01 — Safety instruments unwired (top):** `checkCognitiveBudget`, `getSelfScoreAuditSample`, `scanSelfScoreForPii`, `MayMicroLesson.auditSample` have **zero callers** anywhere (app + scripts). They work (proven above) but nothing invokes them — no session-end hook, no scheduled check, no Tend gate. Recommend: wire to a session-end hook and/or Tend probe, Light Lane, small change-set. Until then the breaker/audits are manual-only.
2. **P-02 — PII scan scope:** `scanSelfScoreForPii` covers self_score events only; decision/engagement payloads are free-form. Recommend: extend scan buffer-wide or document the scoping decision.
3. **P-03 — Copy drift (carried from S1):** "nine files" (`app/app.js:6673, 6826`) vs 11 `_src` entries (`:1406`). One-line fix with next loader touch.

## Non-items (verified, no action)

- Sticky dismiss, source-dedupe, HS-4 suppression, eviction order: all correct-by-design, proven exact.
- EV3 acronym style (S2 observation): principle-by-name satisfies EV3; no rewrite pass justified.

## Script

`s3_fringe.js` — `C:\Users\User\AppData\Local\Temp\opencode\`.
