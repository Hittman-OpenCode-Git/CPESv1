# Archived: legacy certification-wave scripts

**Archived:** 2026-10-04 (Session P2-HAND-SOLVE-WAVE)
**Status:** SUPERSEDED — **must not be run.**

These 17 scripts certified P1 case items during sessions dated 2026-09-10 and 2026-09-11
(one, `_certify_cases.js`, from session `P2-078` on 2026-09-04). They are retained for provenance —
so the record of what those sessions did survives — not for use.

## Why they were archived

They are **stale and inert against the current pool**, and they are a **discovery hazard**: a
future session grepping `scripts/` for `certify` finds 17 write-scripts that look current but are
not. Only two certification tools belong in the active directory.

## Why they are inert (verified, not assumed)

Every one of these scripts flips `question_state` from `"Unprocessed"` to `"Certified"`. As of
2026-10-04 the live pool contains **zero** items in `Unprocessed` state across all 8 banks
(150 cases Certified, 31 In Audit, 9 Archived). Their target population no longer exists, so
none can alter a current item.

A separate inventory recorded that 16 of the 17 mutate via a text replacement. On closer reading
that replacement is **segment-scoped and guarded** — each script locates a specific `qid`, asserts the
segment contains `"question_state": "Unprocessed"`, throws otherwise, and post-asserts the result —
not an unscoped global replace. An earlier characterisation of these as "unscoped global replaces"
was wrong; the archive rationale rests on staleness and the discovery hazard, not on an active risk.

## Superseded by

| Purpose | Use instead |
|---|---|
| P2 case-batch certification gate | `scripts/case_cert_batch_gate.js` (manifest-driven, dry-run by default) |
| Per-batch certification workflow | the session's own `certify_batch` runner (scratchpad-scoped) |
| Semantic/key/encoding screens | `scripts/case_semantic_screens.js`, `scripts/key_agreement_screen.js` |
| Post-remediation claim verification | `scripts/verify_remediation.js` |

The successor tooling is **manifest-driven, dry-run by default, and fail-closed**. These scripts are
none of those: each hardcodes its own session ID and certification `DATE`, so re-running one would
stamp a date that is now months stale.

## Deliberately NOT archived

`scripts/s853_certify_wave_a.js` stays in the active directory. It is a different animal —
substantially larger, guarded, and `--dry-run`-capable. It is not part of this stale
single-session family.

## Restoration

Files are byte-identical to `backups/legacy-certify-scripts/` (verified at archive time). To
restore, copy them back to `scripts/`. Restoration is not a remediation path — if certification
work is needed, it goes through the gate above, which re-screens and verifies rather than flipping
state by string replacement.