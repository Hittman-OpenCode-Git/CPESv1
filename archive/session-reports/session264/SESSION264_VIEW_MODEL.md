# SESSION 264 — Investigation Dashboard MVP — View Model

**Session:** 264  
**Program:** 250-Series — May Administration Phase 1 Build (2 of 4)  
**Type:** BUILD  
**Authorization:** S262 — READY FOR PHASE 1 DEPLOYMENT (97/100)

---

## 1. Dashboard Architecture

```
admin.html
├── <link rel="stylesheet" href="styles.css">     ← reuses existing theme
├── <script src="scripts/output/admin_dashboard_data.js">  ← data bundle
└── <inline JavaScript>                           ← dashboard logic
    ├── Tab navigation (Question | Challenge | Session | Recommendation)
    ├── Global metrics bar
    ├── View 1: Question table + detail card
    ├── View 2: Challenge table + detail card
    ├── View 3: Session table + detail card
    └── View 4: Recommendation table + detail card
```

## 2. Data Model

The dashboard consumes `window.__ADMIN_DATA__` which contains:

| Key | Type | Size |
|-----|------|------|
| metadata | object | 5 fields |
| questionIndex | object | 2,540 entries |
| questionsByHealth | object | 4 arrays |
| questionsBySection | object | 6 aggregates |
| challenges | object | 35 entries |
| investigations | object | 19 entries |
| sessions | object | 40 entries |
| recommendations | object | 5 entries |
| healthDistribution | object | 5 fields |
| investigationSummary | object | 3 fields |

## 3. Navigation & Interactivity

- **Tab navigation:** Click tab button → shows corresponding view
- **Question search:** Free-text matches QID or topic (case-insensitive)
- **Section filter:** Dropdown (A-F) → filters question table
- **Health filter:** Dropdown (HEALTHY/FAIR/NEEDS ATTENTION/CRITICAL) → filters question table
- **Challenge status filter:** Dropdown (OPEN/INVESTIGATING/RESOLVED/CLOSED/DISMISSED)
- **Click row:** Expands detail card below table
- **Cross-view linking:** Challenge detail → click question ID → switches to Question view
- **Sort:** Click column header to sort (toggle asc/desc). Default: health ascending

## 4. Health Visualization

- **Health bar:** Colored inline bar (green 90-100, yellow 70-89, orange 40-69, red 0-39) with numeric score
- **Health tier text:** Color matches tier (health-healthy, health-fair, health-needs-attention, health-critical)
- **State badges:** Green "Certified", yellow "In Audit", gray "Archived", light gray "Unprocessed"
- **Severity classes:** Red CRITICAL, orange HIGH, yellow MEDIUM, blue LOW

## 5. Detail Card Content

### Question Detail
- Identity grid: Pack, Section, Difficulty, Cognitive Level
- State badge + Health display
- Defect badges (red pill for each active defect code)
- Linked Challenges list (with ID, type, status, triage)
- Linked Investigations list (ID, type, status)
- CLI command reference

### Challenge Detail
- Identity: Type, Status, Question (clickable)
- Triage: Category, Priority Score, Confidence %
- Linked entities: Investigations, Recommendations, Sessions

### Session Detail
- Identity: Series, Date, Mode
- Questions: Total, Certified count, Certified ratio
- QID list (first 30 shown)
- Linked Challenges, Recommendations, Investigations

### Recommendation Detail
- Identity: Type, Severity, Status, Source Scan
- Description text
- Target QIDs (first 30 shown)
- Lifecycle: Created session/timestamp → Target session → Resolution session/timestamp
- Linked Investigations

## 6. Operational Readiness

- **Loads via file:// protocol** — no server required
- **Static data** — all lookups are in-memory, no network requests
- **1,260 KB data bundle** — well within browser limits
- **Reuses existing styles.css** — consistent with learner app theme
- **Zero dependencies** — no npm packages, no build tools, no frameworks

## 7. S265 Readiness

All 11 workflow-case entity IDs confirmed present in the data bundle:
- 8 QIDs (P1-A-036/046/056/066, P1-E-076, P1-EC-004, P1B-B-153, P1B-B-001, P1-FC-001)
- 4 Challenges (CH-CC1ECA89, CH-42169D7F, CH-53D73FDB, CH-5DEDA52E)
- 1 Investigation (INV-20260727-019)
- 2 Recommendations (REC-61966733, REC-5B1E489D)

Every link needed for S265 workflow chains is resolvable within the dashboard.
