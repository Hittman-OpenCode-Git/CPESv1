# Session 600 — Content Operations Reserve Charter

**Document ID:** S600_CHARTER_v1.0
**Status:** DEFERRED — Not an active lane
**Authority:** PROJECT_CONSTITUTION.md, S724 Operating Model, S725 Portfolio Stewardship Framework
**Dependencies:** S723 Maintenance Framework, S724 Post-700 Operating Model, S725 Portfolio Lane Map

---

## 0. Standing Order

**S600 is not an execution lane. It is a reserve charter.**

S724 determined: the 600-series startup cost (4 sessions) exceeds the projected savings (3 sessions), producing a net effect of -1 session. The S724 Executive Board voted unanimously (26/26 agents) to defer. The S725 Portfolio Stewardship Framework (Lane 600) confirms DEFERRED status.

**This charter serves a single purpose:** to be the only approved charter under which a future 600-series could be activated. No other 600-series charter may be created, proposed, or implied. This document is the governing reference for any future reactivation decision.

---

## 1. Strategic Context

### 1.1 Portfolio Lane Map

```
300 — Analytics
    Analyzes, measures, forecasts, diagnoses
    ↓
600 — Content Operations (RESERVE)
    Drafts, prepares, organizes
    ↓
700 — Governance & Calibration
    Governs, enforces, closes, verifies
    ↓
800 — Modernization & Certification
    Reviews, certifies, deploys, promotes
```

The 300 → 600 → 800 pipeline is the intended operating model for content production at scale. In the current steady state, 300/700/800 handle all work without the 600 intermediate lane. The 600-series exists to absorb content-preparation workload if the 800-series certification pipeline becomes bottlenecked by drafting capacity rather than review capacity.

### 1.2 Binding Constraint Analysis (S724)

| Factor | Result |
|--------|--------|
| Startup cost | 4 sessions (charter establishment, tooling, workflow integration, first-run calibration) |
| Projected savings | 3 sessions (reduced 800-series drafting overhead across cert waves) |
| Net effect | **-1 session** |
| Binding constraint | **Author capacity, not tooling** — the bottleneck is skilled content authors, not the infrastructure to support them |
| Recommendation | Defer. Do not launch. Preserve charter for future evaluation. |

### 1.3 Reactivation Trigger

The binding constraint may shift. If and when:
- The 800-series certification pipeline is throughput-limited by drafting capacity (not review capacity), AND
- The modernization backlog exceeds 50+ pending items at steady state, AND
- A dedicated drafting lane would clear certification bottlenecks faster than adding authors to 800,

...then the 600-series reactivation becomes worth re-evaluating.

Until then: **all work continues through 300/700/800.**

---

## 2. Feature Scope — What 600 IS and IS NOT

### 2.1 IS — Authorized 600-Series Work

| Domain | Description |
|--------|-------------|
| **Registry operations** | Maintenance of `MASTER_QUESTION_REGISTRY.md`, `QUESTION_SIMILARITY_LEDGER.json`, and related registry artifacts |
| **EW template libraries** | Building and maintaining COSO misconception catalogs, SOX misconception catalogs, Control Activities catalogs, and distractor pattern libraries |
| **Draft-preparation support** | Creating authoring packets, research packets, and blueprint packets for 800-series execution |
| **Standards libraries** | Maintaining explanation templates, distractor templates, and feedback templates |
| **Duplicate prevention** | Running similarity checks, maintaining the similarity ledger, flagging potential duplicates for 700/800 review |
| **Modernization preparation** | Preparing content batches, organizing draft queues, and staging materials for 800-series certification passes |
| **Authoring support** | Providing research summaries, reference compilations, and draft frameworks for content authors |

### 2.2 IS NOT — Prohibited 600-Series Work

| Domain | Owned By | Reason |
|--------|----------|--------|
| **Analytics** | 300-series | DQS, EQS, BQS, ExQS, UIQS, risk models, forecasts, portfolio prioritization |
| **Governance** | 700-series | DCS, governance standards, closure controls, enforcement rules, T0 protocol, hash verification |
| **Certification decisions** | 800-series | State transitions, certification audits, question_state promotion, production deployment |
| **Scoring** | app.js / 800-series | Scoring logic, rubric application, answer-key decisions |
| **Calibration** | 700/800-series | Difficulty calibration, cognitive level assignment, psychometric review |
| **Portfolio prioritization** | 300/700-series | Lane activation decisions, resource allocation, governance board voting |

---

## 3. Ownership Boundaries

### 3.1 300-Series Boundaries

**300 OWNS:**
- All analytics models and frameworks
- Risk models and forecasting
- Quality scoring (DQS, EQS, BQS, ExQS, UIQS)
- Portfolio dashboards and reporting
- Bottleneck analysis and lane-throughput measurement

**600 MAY:**
- Consume 300-series outputs (reports, dashboards, forecasts) as input to drafting and preparation work
- Report throughput metrics upstream to 300

**600 MAY NOT:**
- Modify, extend, or override any 300-series model, framework, or scoring methodology
- Produce independent analytics that compete with or duplicate 300-series outputs
- Make portfolio prioritization decisions based on analytics consumption

### 3.2 700-Series Boundaries

**700 OWNS:**
- Governance standards and enforcement rules
- Closure controls and the Series Closure Gate
- T0 entry protocol and hash verification
- DCS (Defect Classification Standard)
- Maintenance framework and trigger thresholds
- Governance guard plugin and test suite

**600 MAY:**
- Follow 700-series governance standards in all operations
- Flag potential governance issues to 700
- Operate within 700-defined batch caps, backup protocols, and verification requirements

**600 MAY NOT:**
- Alter, extend, or override any governance standard
- Modify closure controls or enforcement rules
- Change batch caps, verification protocols, or any enforcement mechanism
- Bypass governance guard rules

### 3.3 800-Series Boundaries

**800 OWNS:**
- Certification decisions and state transitions
- Question_state promotion (Unprocessed → In Audit → Certified)
- Modernization execution
- Production deployment
- Answer-key verification and correction

**600 MAY:**
- Prepare materials for 800-series certification passes
- Provide drafting support to reduce 800-series authoring overhead
- Maintain registry and template libraries consumed by 800

**600 MAY NOT:**
- Make any certification decision
- Change question_state on any item
- Promote content to production
- Verify or modify answer keys
- Approve content for learner delivery

---

## 4. Operating Model — Agent Definitions

### 4.1 Agent A — Registry Operations

**Responsibility:** Maintain canonical content registries.

**Artifacts:**
- `QUESTION_REGISTRY_INDEX.md` — master index of all QuestionIDs
- `QUESTION_SIMILARITY_LEDGER.json` — duplicate detection records

**Allowed operations:**
- Add, update, and verify registry entries
- Run similarity scans against the ledger
- Flag potential duplicates for 700 review
- Report registry statistics to 300

**Prohibited operations:**
- Delete or archive entries (700/800 authority)
- Modify question content (800 authority)
- Generate the registry from source code (that is a build operation, not a maintenance operation unless the build script is 600-maintained)

### 4.2 Agent B — EW Template Libraries

**Responsibility:** Build and maintain explanation template libraries.

**Artifacts:**
- COSO misconception catalog (aligned to COSO 2013 principles 1–17)
- SOX misconception catalog
- Control Activities catalog
- Distractor pattern library by topic domain

**Allowed operations:**
- Research and catalog common misconceptions by standard/principle
- Maintain template libraries with versioned entries
- Provide templates to 800-series authors on request
- Update catalogs when new defect patterns are discovered (via 700 findings)

**Prohibited operations:**
- Apply templates to live items (800 authority)
- Author explanations directly into pack files (800 authority)
- Make certification claims about template-corrected items (800 authority)

### 4.3 Agent C — Draft Preparation Support

**Responsibility:** Create structured preparation packets for 800-series execution.

**Artifacts:**
- Authoring packets (complete item specifications ready for authoring)
- Research packets (topic research, standard references, formula verification)
- Blueprint packets (LOS-to-content mapping, coverage gap analysis)

**Allowed operations:**
- Research accounting standards and compile references
- Prepare item specifications with stem, choices, and correct answer proposals
- Compile exhibit templates and data verification
- Stage materials in draft directories for 800 pickup

**Prohibited operations:**
- Insert drafts into pack files (800 authority)
- Make final answer-key determinations (800 authority)
- Certify any draft as production-ready (800 authority)

### 4.4 Agent D — Standards Library Maintenance

**Responsibility:** Maintain canonical content standards libraries.

**Artifacts:**
- Explanation templates (by question type and cognitive level)
- Distractor templates (by misconception category)
- Feedback templates (by Bloom's level and answer correctness)

**Allowed operations:**
- Create, update, and version template entries
- Maintain cross-references to authoritative standards
- Deprecate outdated templates (with 700 notification)
- Respond to 800-series author requests for template variants

**Prohibited operations:**
- Mandate template usage (800 authority)
- Override 700-series governance standards
- Create competing standards that conflict with CAQS v1.0

---

## 5. Activation Conditions

The 600-series may only be activated if ALL of the following conditions are met:

### 5.1 Economic Gate

```
Forecast Savings > Startup Cost
```

Where:
- **Startup Cost** = sessions required to establish tooling, workflows, and first-run calibration (S724 estimate: 4 sessions)
- **Forecast Savings** = sessions saved by offloading drafting/preparation work from 800-series certification passes

The forecast must be independently verified by 300-series analytics. A net-negative or net-zero ROI blocks activation.

### 5.2 Governance Board Approval

A new Executive Board vote is required. The S724 deferral vote (26/26) cannot be reused. At minimum:
- 300-series Lead must confirm the binding constraint has shifted (analytics evidence)
- 700-series Governance Auditor must confirm no ownership conflicts with active lanes
- 800-series Certification Lead must confirm drafting capacity is the active bottleneck
- All three leads must vote to activate

### 5.3 No Ownership Conflict

Prior to activation, every 600-series artifact, agent, and workflow must be checked against the current ownership matrix (S725 Portfolio Stewardship Framework). Any overlap with active lanes (300, 700, 800) must be resolved before activation.

### 5.4 Pre-Launch Governance Baseline

Before any 600-series agent executes:
- Full T0 governance baseline captured (all runtime hashes verified per CURRENT_BASELINES.md)
- Certification pool count verified via direct raw-file grep
- All active defect manifests reviewed for 600-relevant entries
- Activation decision recorded in REVISION_HISTORY.md with:
  - Binding constraint evidence (from 300-series)
  - Updated Forecast Savings calculation
  - Governance Board vote record
  - T0 baseline snapshot

---

## 6. Success Criteria

A successfully activated 600-series demonstrates:

| Criterion | Measurement |
|-----------|-------------|
| No overlap with 300 | 300-series Lead confirms no analytics model duplication or competing metrics |
| No overlap with 700 | 700-series Governance Auditor confirms no governance standard alteration |
| No overlap with 800 | 800-series Certification Lead confirms no certification decision made by 600 |
| Supports modernization | Measurable reduction in 800-series drafting overhead per certification wave |
| Supports duplicate prevention | Similarity ledger maintained; duplicate rate at certification gate ≤ threshold |
| Improves authoring throughput | Items per certification wave increases vs. pre-600 baseline |
| No competing models | Single source of truth maintained for all analytics, governance, and certification artifacts |

---

## 7. Deactivation Protocol

If the 600-series is activated and later becomes redundant:

1. All in-progress drafting work transferred to 800-series
2. All registry entries verified and committed
3. All template libraries versioned and archived
4. A closure report filed with the Governance Board documenting:
   - Total sessions consumed
   - Total savings realized (vs. forecast)
   - Lessons learned
   - Reason for deactivation
5. Closure subject to the Series Closure Gate (S726)
6. Charter reverted to DEFERRED status with deactivation date recorded

---

## 8. Cross-References

| Document | Relationship |
|----------|-------------|
| PROJECT_CONSTITUTION.md | Higher authority |
| S724 Operating Model | Deferral decision (startup 4 > savings 3, unanimous 26/26) |
| S725 Portfolio Stewardship Framework | Lane 600 definition, ownership boundaries, reactivation criteria |
| S725 Post-700 Governance Model | GAP-3 (600-series deferral ownership) |
| S726 Series Closure Gate | Applies if 600-series is ever activated and later closed |
| CAQS v1.0 | Content quality standard — all 600-produced materials must conform |
| QUESTION_METADATA_STANDARD.md | Schema governing all registry entries |
| CURRENT_BASELINES.md | T0 baseline reference for activation governance |
| REVISION_HISTORY.md | Activation/deactivation must be recorded here |
| DEFECT_LIBRARY.md | Template libraries reference defect patterns from here |

---

## 9. Charter Governance

### 9.1 Amendment Authority

This charter may be amended only by:
- Executive Board vote (300 + 700 + 800 leads), OR
- Governance Board directive following a formal ownership audit (700-series)

### 9.2 Charter Versioning

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-26 | Executive Board (via Agent directive) | Initial reserve charter. Documents S724 deferral, defines 4-agent operating model, establishes activation conditions, codifies ownership boundaries with 300/700/800. |

### 9.3 Relationship to S725 Portfolio Stewardship Framework

This charter is subordinate to the S725 Portfolio Stewardship Framework. The Framework defines Lane 600 at the portfolio level (status, owner, scope). This charter provides the detailed operational specification. In any conflict, the Framework prevails.

### 9.4 Status Tracking

| Field | Value |
|-------|-------|
| Current status | DEFERRED |
| Deferral date | 2026-07-24 (S724) |
| Deferral authority | S724 Executive Board (26/26 unanimous) |
| Last reviewed | 2026-07-26 (charter creation) |
| Next review | At 800-series certification completion milestone, OR at governance board trigger |
| Reactivation vote required | Yes — new vote, S724 vote does not carry forward |

---

*Charter established 2026-07-26 per Executive Board directive. Not an active lane. No sessions allocated. No agents deployed.*
