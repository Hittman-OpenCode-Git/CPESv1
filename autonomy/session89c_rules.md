# Session 89C — Autonomous Loop Rules

## Safe Edit Authority
- Improve distractors (add clarity, specificity, choice-unique explanations)
- Strengthen explanations (add principle, steps, business context)
- Downgrade difficulty one level where clearly overstated
- Fix local metadata defects (Topic spelling, section tags)
- Add/update delivery blocklist entries
- Add/update similarity-family flags
- Small generator-support changes for delivery suppression

## Automatic Skip Policy
Skip immediately if any item requires:
- Human adjudication
- SME uncertainty
- Major rewrite or scenario redesign
- Unclear correct answer
- Policy interpretation
- Multi-step scenario redesign
- Nonlocal pack-wide restructuring
- Answer-key changes (only add blocklist, never change CorrectChoice)

## Stop Conditions
- Queue has no remaining safe pending tasks
- 3 consecutive tasks skipped for ambiguity
- 2 consecutive validation failures
- Runtime constraints make further work unsafe
- All remaining tasks require human review
- No meaningful content improvement over multiple cycles

## No-Repeat Rules
- Never process same task_id twice after completion
- Never retry a skipped task in same run
- If validation fails once, split task before retrying
- If same source file causes repeated failures, pause that file
- Maintain "no progress" counter

## Validation After Each Batch
- Parse validation for modified files
- Item-bank load validation
- After app/generator changes: test_governance_guard.js + May suites
- After similarity/delivery work: blocked-item exclusion check

## Difficulty Recalibration
- Max one level downward per item
- Downgrade when: one-step computation, transparent distractors, low wording burden, straightforward recognition, no synthesis
- When uncertain, leave unchanged and log why
- Never mass-upgrade difficulty
