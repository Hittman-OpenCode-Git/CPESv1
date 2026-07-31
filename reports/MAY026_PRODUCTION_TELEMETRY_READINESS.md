# MAY-026 — Production Telemetry Readiness

**Session:** MAY-026 — Adoption Telemetry Wiring & Production Data Collection
**Date:** 2026-07-31
**Governance Lane:** Light
**Status:** Ready for Production

---

## 1. Readiness Declaration

May has crossed from **Production Activated** (MAY-024) to **Production Measured** (MAY-026). The telemetry system now collects real adoption and engagement data from every session.

## 2. Telemetry Pipeline Status

| Component | Status | Details |
|-----------|--------|---------|
| `may-telemetry.js` | Active | 7 event types: decision, mode, readiness, recommendation, intervention, adoption, engagement |
| `trackAdoption()` | Wired | 8 injection sites across app.js + may-core.js |
| `trackEngagement()` | Wired | 5 injection sites across may-core.js |
| Buffer | Active | 500-event cap, oldest-first eviction |
| Persistence | Active | `cmaMayPilotTelemetry` in localStorage per session |
| Orchestration | Active | may-coaching-orchestrator.js persists snapshot on each `orchestrate()` call |

## 3. Event Collection Coverage

### 3.1 Adoption Funnel (per session)

```
presented → panelOpened → clicked → sessionStarted → completed
   (4×)         (1×)         (1×)        (1×)            (1×)
```

### 3.2 Engagement Touchpoints (per session)

```
tooltipViewed → tooltipClicked → dismissed
     (2-3×)          (0-1×)         (0-1×)
```

### 3.3 Total Events Per Session (Estimated)

| Flow | Events |
|------|--------|
| Orchestration (existing) | 6-10 |
| Adoption (new) | 6-7 |
| Engagement (new) | 2-5 |
| **Total** | **14-22** |

Buffer headroom: ~480 events per session. Well within the 500-event cap.

## 4. Data Available for Analysis

### 4.1 Immediate (Session 1+)

- Presented: Which recommendation types users see
- panelOpened: Do users open May after seeing recommendations?
- clicked: Do users click through to coaching?
- tooltipViewed/Clicked/Dismissed: Launcher interaction patterns

### 4.2 Session 10+ (Statistically Significant)

- Conversion rate: presented → clicked
- Adoption rate: clicked → sessionStarted
- Completion rate: sessionStarted → completed
- Engagement pattern: launcher interaction frequency
- Dismiss pattern: companion card fatigue

### 4.3 Populate `MAY025_EFFECTIVENESS_EXECUTIVE_SUMMARY.md`

After the measurement window (25 sessions / 14 days / 3 distinct learners):

| Metric | Source | Ready? |
|--------|--------|--------|
| UA1: panelOpened rate | `byType.adoption` → panelOpened | On first session |
| UA2: clicked rate | `byType.adoption` → clicked | On first click |
| UA3: sessionStarted rate | `byType.adoption` → sessionStarted | On first session start |
| UA4: completed rate | `byType.adoption` → completed | On first session complete |
| UA5: type effectiveness | `byType.adoption` → recommendationType | After 10 sessions |
| UA6: ignored types | `byType.adoption` → cardId clustering | After 10 sessions |
| EG1-4: engagement metrics | `byType.engagement` | After 3 sessions |
| TR1-4: telemetry reliability | `snapshot()` cross-check | After 1 session |

## 5. Governance Confirmation

| Requirement | Status |
|-------------|--------|
| No content changes | Confirmed |
| No scoring changes | Confirmed |
| No certification changes | Confirmed |
| No LLM activation | Confirmed |
| No recommendation logic changes | Confirmed |
| Preflight: 0 divergences | Confirmed |
| Governance guard: 54/54 | Confirmed |
| Smoke: 17/17 PASS | Confirmed |
| Telemetry validation: 54/54 | Confirmed |

## 6. Next Steps

1. **Collect data** — Run sessions normally. Telemetry collects automatically.
2. **Monitor buffer** — Check `cmaMayPilotTelemetry` snapshots for overflow (unlikely).
3. **Analyze at 25 sessions** — Run the MAY-025 effectiveness scoring framework.
4. **Populate `MAY025_EFFECTIVENESS_EXECUTIVE_SUMMARY.md`** with real data replacing synthetic assumptions.

---

*MAY-026 — Production Telemetry Readiness — 2026-07-31*
