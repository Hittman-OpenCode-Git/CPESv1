# Session 80 — Stage 1: Plan

**Session:** 80 (Scaffold Adoption Test)  
**Governance Lane:** Light  
**Scaffold:** `knowledge/SESSION_SCAFFOLD.md` v1.0

---

## Task

Clean up a small UI inconsistency: May's returning-user onboarding card shows a dense welcome message with no capability-prompts, while the new-user card (from S76) has a clean greeting + 4 capability chips.

## Success Criteria

1. Returning-user empty-state card matches the new-user card structure: greeting → capability prompts → clear call-to-action
2. The welcome message is split: session/attempt stats shown concisely, capabilities shown as chips
3. The new-user greeting flow is unchanged (no regression)
4. `npm run smoke` PASS
5. No files outside Light Lane scope touched

## Likely Files

| File | Reason | Risk |
|------|--------|------|
| `may-core.js` | The onboarding card HTML at ~line 4509 | Low (HTML template change only) |
| `styles.css` | Already has `.may-capability-prompts` styles from S76 | None (already exists) |

## Non-Goals

- No changes to May's dialogue engine or greeting state machine
- No changes to new-user flow
- No changes to the returning-student (pre-exam / handshake) flow
- No changes to CSS beyond reusing existing styles

## Stop Conditions

- If the returning-user card needs more than 2 HTML template changes, stop and report
- If any JS logic change is needed, stop and report
- If smoke fails after implementation, revert and report
