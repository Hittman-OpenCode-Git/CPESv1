# Session 80 — Stage 3: Implementation Log

**File:** `may-core.js` line 4516  
**Change:** Returning-user onboarding card HTML template  
**Type:** Template-only — zero JS logic changes  

### Before
```
┌──────────────────────────┐
│ M  Welcome back, [name]  │
│    CMA Part 1 companion  │
│    [1 dense stats+help   │
│     paragraph, no chips] │
└──────────────────────────┘
```

### After
```
┌──────────────────────────┐
│ M  Welcome back, [name]  │
│    CMA Part 1 companion  │
│    [session/attempt stat]│
│                          │
│    What would you like   │
│    to do?                │
│    [chip] [chip] [chip]  │
│    [chip]                │
└──────────────────────────┘
```

### Verified
- Uses existing `.may-capability-prompts` CSS from S76 (no new CSS)
- No JS logic modified (sc, totalAttempts, welcomeMsg computed identically)
- New-user card unchanged (lines 4493-4508 intact)
