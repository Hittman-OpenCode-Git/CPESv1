# Session 80 — Stage 2: Audit

**Session:** 80 (Scaffold Adoption Test)
**Governance Lane:** Light

---

## Current State

### New-user card (lines 4493–4508)
```
┌─────────────────────────────────┐
│ M    Hi, I'm May                │
│      Your CMA Part 1 companion  │
│      [1-line description]       │
│                                 │
│      Try asking:                │
│      [chip] [chip] [chip] [chip]│
│                                 │
│      What's your name?          │
└─────────────────────────────────┘
```
Clean, informative, guides the user.

### Returning-user card (lines 4509–4522)
```
┌─────────────────────────────────┐
│ M    Welcome back, [name]       │
│      Your CMA Part 1 companion  │
│      [1 dense paragraph;        │
│       stats + capabilities      │
│       merged into single block] │
│                                 │
│      (no prompts, no CTA)       │
└─────────────────────────────────┘
```
Functional but inconsistent. No capability chips. The welcome message mixes stats and capabilities in one run-on.

## Approved Change

**File:** `may-core.js` line 4516–4522  
**Type:** HTML template only (no JS logic change)  
**Risk:** Zero (CSS classes already exist from S76)

### Before (returning-user template)
```html
<div class="may-onboarding-card">
  <div class="may-onboarding-avatar">M</div>
  <h2>Welcome back, ${profile.name}</h2>
  <p class="may-onboarding-subtitle">Your CMA Part 1 study companion</p>
  <p>${welcomeMsg}</p>
</div>
```

### After
```html
<div class="may-onboarding-card">
  <div class="may-onboarding-avatar">M</div>
  <h2>Welcome back, ${profile.name}</h2>
  <p class="may-onboarding-subtitle">Your CMA Part 1 study companion</p>
  ${sc > 0 ? `<p>I've tracked <strong>${sc} session${sc !== 1 ? 's' : ''}</strong> and <strong>${totalAttempts} attempts</strong> for you.</p>` : ''}
  <div class="may-capability-prompts">
    <span>What would you like to do?</span>
    <span class="may-capability-chip">Explain a question</span>
    <span class="may-capability-chip">My progress</span>
    <span class="may-capability-chip">What to study next?</span>
    <span class="may-capability-chip">Quiz me</span>
  </div>
</div>
```

### What changes
- Session stats get their own line (only if sessions exist)
- Capability-prompts chips added (same component as new-user card)
- Chips adapted for returning-user context ("Explain a question" vs "Explain the answer")
- No call-to-action for name (already known)
- The `welcomeMsg` variable is split: stats → stats line, capabilities → chips

### What stays the same
- All JS logic (lines 4510–4515 compute `sc`, `totalAttempts`, `welcomeMsg`)
- The `else` branch (`welcomeMsg` for users with 0 sessions) still used as fallback text within capability prompts
- No CSS changes needed

## Non-Approved / Not In Scope
- Changing the new-user card
- Changing May's dialogue engine
- Renaming anything in the greeting state machine
- Any file other than `may-core.js`

## Verdict
**APPROVED for Stage 3.** One file, one HTML template block, zero JS logic changes, zero CSS changes, existing styles support all new elements.
