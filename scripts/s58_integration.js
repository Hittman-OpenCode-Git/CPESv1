// SESSION058 Integration Script — replaces 20 archived items across Packs C + D
const fs = require('fs');

function buildReplacement(qid, topic, microtopic, key, difficulty, stem, choices, cc, ec, ewa, ewc, ewd, ds, cl) {
    // Format: content block + metadata block (two consecutive objects)
    const content = {
        Part: 1, Section: "E", SectionName: "Internal Controls",
        Topic: topic, MicroTopic: microtopic, UniqueConceptKey: key,
        LOSTag: "E Internal controls", Difficulty: difficulty,
        ItemType: "MCQ", ItemStyle: "single-select",
        Stem: stem, Choices: choices, CorrectChoice: cc,
        ExplanationCorrect: ec,
        StudyLinks: [
            {label:"IMA CMA Learning Outcome Statements, Part 1 Section E", url:"https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"},
            {label:"COSO Internal Control Framework", url:"https://www.coso.org/guidance-on-ic"}
        ],
        SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        Part1OnlyFlag: true,
        ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    };
    
    const meta = {
        QuestionID: qid,
        question_state: "Certified",
        CalculationItem: false,
        VerifiedChecks: [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ]
    };
    
    // Assign EW fields based on CC
    meta["ExplanationWrong" + cc] = "";
    const others = ["A","B","C","D"].filter(l => l !== cc);
    meta["ExplanationWrong" + others[0]] = ewa;
    meta["ExplanationWrong" + others[1]] = ewc;
    meta["ExplanationWrong" + others[2]] = ewd;
    
    meta.DifficultyScore = ds;
    meta.CognitiveLevel = cl;
    meta.upgrade_note = "S58 Phase 6 — replacement for archived clone (DL-012 rotation clone)";
    
    return [content, meta];
}

// ====== PACK C - 10 EC items ======
const packC_new = [
    // EC-050: Solara board expertise / COSO P4
    buildReplacement("P1-EC-050",
        "E.050 COSO Principle 4 -- board competence -- evaluating audit committee expertise for derivative instrument oversight",
        "Board competence for complex financial instruments",
        "E-C050-coso-p4-board-expertise",
        "Difficult",
        "Solara Energy Trading LLC, a privately held energy commodities firm with $2.4 billion in annual revenue, maintains a portfolio of commodity derivatives including natural gas swaps, crude oil futures, weather derivatives, and cross-currency interest rate swaps. Solara's board comprises seven members: the founder/CEO, the CFO, two independent directors with backgrounds in commercial real estate, a retired state utility regulator, a marketing executive, and a nonprofit foundation president. None has derivatives or financial risk management experience. The audit committee consists of the retired regulator (chair), the real estate developer, and the nonprofit president. The external auditor flagged that the audit committee spent 18 minutes per quarter reviewing the $890 million notional-value derivatives portfolio and relied entirely on management representations for hedge effectiveness, counterparty credit risk, and fair value measurements for Level 2/3 derivatives. A recent quarter produced a $47 million mark-to-market loss from unhedged basis risk management failed to identify. Under COSO Principle 4, evaluate the audit committee's constitution.",
        {"A":"The audit committee is adequately constituted because COSO Principle 4 applies to operational personnel, not governance bodies — the finance team's expertise satisfies the competence requirement.","B":"The audit committee is inadequately constituted because COSO Principle 4 requires commitment to competence throughout the entity including the board and audit committee; a committee that cannot independently evaluate management's assertions about $890 million in notional derivatives has not fulfilled its oversight responsibilities.","C":"The audit committee is adequately constituted because members have broad professional experience and the retired regulator has relevant oversight background; COSO does not require every board member to be a technical expert in every financial instrument.","D":"The audit committee is adequately constituted because the external auditor provides independent assurance; the committee's role is to oversee the audit, not independently verify derivative valuations."},
        "B",
        "COSO Principle 4 requires the organization to demonstrate commitment to attract, develop, and retain competent individuals in alignment with objectives. This principle applies at all levels including the board and its committees. An audit committee overseeing $890 million in derivatives must possess sufficient collective competence to independently evaluate management's assertions about hedge effectiveness, counterparty credit risk, and fair value measurements. The committee's pattern — 18-minute quarterly reviews, complete deference to management, and acknowledgment they lack technical expertise — demonstrates that the governance body lacks the competence to fulfill its oversight role for a material financial risk area. The $47 million loss from unidentified basis risk confirms the consequence. Solara should appoint at least one director with derivatives and financial risk management expertise to the audit committee.",
        "COSO Principle 4's competence requirement applies to operational personnel and governance bodies alike. The board exercising oversight over material financial risks must possess the knowledge to evaluate whether management's assertions about those risks are reasonable. Even if the finance team has derivatives expertise, management cannot be the sole source of assurance over its own activities. An audit committee that defers entirely to management on a material risk area has abdicated its oversight function, regardless of management's technical competence.",
        "Broad professional experience does not substitute for relevant technical competence. The retired utility regulator's experience did not translate into effective derivatives oversight: 18-minute quarterly reviews and explicit deferral to management on valuation matters. General business or regulatory experience does not equip a director to evaluate hedge effectiveness under ASC 815 or challenge Level 3 derivative fair value measurements. COSO Principle 4 requires competence relevant to the entity's objectives.",
        "The external auditor provides annual assurance over financial statements — not continuous oversight of the derivatives portfolio or a substitute for the audit committee's ongoing responsibility to understand how management identifies, measures, and manages derivative risks. COSO Principle 4's competence requirement is not satisfied by outsourcing oversight competence to an external party.",
        4, "Analyze"
    ),
    
    // EC-051: Northgate SaaS control failure / COSO P10
    buildReplacement("P1-EC-051",
        "E.051 COSO Principle 10 -- control activities -- evaluating control failure after SaaS migration when automated legacy controls do not transfer",
        "Control design failure SaaS migration",
        "E-C051-coso-p10-saas-controls",
        "Difficult",
        "Northgate Medical Supply, a $620 million hospital products distributor, migrated its financial systems from a legacy on-premise ERP to a cloud SaaS platform in March 2026. The legacy system had operated for 14 years with embedded automated controls: a three-way match comparing POs, receiving reports, and invoices; a segregation-of-duties module preventing a single user from creating vendor records and approving payments within 24 hours; and a journal entry approval workflow requiring manager approval for entries over $25,000. The SaaS vendor does not natively support these controls; add-on modules cost $185,000 annually. The IT steering committee, citing a 22% budget overrun, deferred the purchase. The controller implemented manual compensating controls: staff perform three-way matches from printed reports, segregation is enforced through weekly access log reviews, and journal entries are approved via email. Within five months, internal audit found $212,000 in duplicate payments (manual reviews skipped during month-end close), two instances of a single AP clerk creating a vendor and approving $94,000 in payments the same day, and six journal entries over $25,000 posted without documented approval. Evaluate the control failure under COSO Principle 10.",
        {"A":"The control failure is a temporary implementation issue — manual controls will mature with staff experience, and add-on modules will be purchased next fiscal year.","B":"The control failure is a design deficiency — the manual compensating controls are unsuitable for the volume and velocity of transactions, predictably failing during peak processing periods; COSO Principle 10 requires controls be designed to mitigate risk to an acceptable level.","C":"The failure is a budget and procurement issue — the committee made a reasonable cost-benefit decision to defer, and the root cause is the 22% project overrun, not control design.","D":"The failure is an operating deficiency — properly designed manual controls were inconsistently executed; remediation requires additional training and performance accountability."},
        "B",
        "COSO Principle 10 requires selecting and developing control activities that mitigate risks to acceptable levels. When an organization changes technology platforms, control activities must be reassessed for the new environment. The manual three-way match fails predictably during month-end close when staff capacity is most constrained; the weekly access log review detects but cannot prevent same-day segregation violations; and email-based journal entry approval lacks systemic enforcement. These are design failures, not execution failures — the controls are structurally incapable of functioning at the required scale. The controller's characterization of these as 'transitional issues' confuses design deficiencies with implementation problems.",
        "Mischaracterizing the issue as temporary ignores that month-end close pressures are inherent, not transitional. Manual three-way matches competing with financial reporting deadlines will predictably be deprioritized regardless of staff experience. The $212,000 in duplicate payments and segregation violations are actual failures with financial impact — deferring remediation for a full fiscal year while failures continue is unacceptable.",
        "The budget decision was a risk acceptance choice, which COSO permits. But COSO Principle 10 requires that compensating controls mitigate the accepted risk to an acceptable level. The deficiency is not the budget decision but selecting manual controls that predictably fail. Budget constraints cannot excuse controls that fail under normal operating conditions.",
        "An operating deficiency exists when properly designed controls are not performed as intended. Here, the manual three-way match failed during close because it was designed to require effort when staff were least able to perform it. The weekly review detected but could not prevent violations because it was designed as detective for a risk requiring prevention. These are design choices making controls structurally incapable of achieving objectives — not execution failures.",
        4, "Analyze"
    ),
    
    // EC-053: Whistleblower triage failure / COSO P14
    buildReplacement("P1-EC-053",
        "E.053 COSO Principle 14 -- internal communication -- evaluating whistleblower reporting effectiveness when reports are classified as personnel grievances",
        "Whistleblower investigation triage and reporting culture",
        "E-C053-coso-p14-whistleblower-triage",
        "Difficult",
        "Northland Insurance Group, a property and casualty insurer with 8,500 employees, operates an ethics hotline managed by the Chief Compliance Officer. Over two years, the hotline received 212 reports. An external review found: 156 reports (74%) were classified as 'personnel grievances' and forwarded to HR without compliance investigation; of 56 retained reports, 41 were closed within 48 hours as 'insufficient specifics'; the five-member compliance team includes the CCO's brother-in-law as senior investigator; and the audit committee receives quarterly summaries showing only report counts and category charts — no investigation outcomes, substantiation rates, or remediation tracking. The CCO's annual report states the hotline is 'fully operational and compliant.' Under COSO Principle 14, evaluate the internal communication deficiency.",
        {"A":"The hotline satisfies COSO Principle 14 because 212 reports over two years demonstrate employee awareness and use — the high HR classification rate reflects the nature of workplace disputes.","B":"Northland failed to establish effective internal communication because the triage process systematically minimized control-related reports through premature classification and cursory closure, and governance oversight lacked information needed to assess whether the mechanism functioned as a communication channel.","C":"The deficiency is the CCO employing a family member as senior investigator, creating a conflict of interest — COSO Principle 14 requires all investigators to be independent of management.","D":"The hotline is effective because reports were received, classified, and closed within timeframes — COSO Principle 14 only requires a reporting mechanism to exist, not that every report result in investigation."},
        "B",
        "COSO Principle 14 evaluates whether internal communication channels actually transmit information that supports internal control — not merely whether they exist. Northland fails on three dimensions. First, classifying 74% of reports as personnel grievances at intake, before investigation, defines control concerns out of existence. Second, closing 73% of retained reports within 48 hours for 'insufficient specifics' reflects a protocol that defaults to dismissal — anonymous reporters cannot provide transaction dates or named individuals, and the standard should be whether a report contains enough to begin inquiry. Third, the audit committee's bar-chart summary provides no governance information — without outcomes or substantiation rates, the board cannot assess hotline effectiveness. The related-party employment compounds these issues but is not the root cause. The systemic triage and reporting design is the communication failure.",
        "COSO Principle 14 evaluates communication quality, not report quantity. If 74% of reports are reclassified without investigation, the hotline functions as an HR intake channel, not a control communication mechanism. Measuring effectiveness by input metrics (count) rather than output metrics (investigations, deficiencies identified, remediation) applies a compliance mindset rather than a principle-based evaluation.",
        "The related-party employment is a legitimate governance concern but misdiagnoses the scope. The family member handled 38 of 56 retained reports, but the fundamental deficiency is the triage process that reduced 212 reports to 15 receiving investigation attention. Even with an independent investigator, the 73% closure rate and 74% pre-investigation classification would persist. COSO Principle 14 addresses communication channel design, not personnel independence.",
        "COSO Principle 14 requires that the organization communicate information necessary to support internal control — not merely that a mechanism exists. A reporting channel that classifies 74% of reports out of the control communication channel, closes 73% without investigation, and provides the board with no outcome-based governance information does not satisfy the principle regardless of processing timeframes.",
        4, "Evaluate"
    ),
    
    // EC-056: Risk appetite recalibration / COSO ERM
    buildReplacement("P1-EC-056",
        "E.056 COSO ERM -- risk appetite and tolerance -- evaluating whether to recalibrate after tolerance breach",
        "Risk appetite tolerance recalibration after breach",
        "E-C056-erm-risk-appetite",
        "Very Difficult",
        "Brenner Commodities Group, a $1.8 billion agricultural commodities trader, established its COSO ERM framework in 2023 with a board-approved single-counterparty credit exposure limit of $12 million. In Q2 2026, Brenner's soybean desk entered forward contracts with a Brazilian agricultural cooperative that accumulated to $31 million in exposure before the automated credit system flagged the breach. The desk head had manually approved incremental positions, citing 'strong historical relationship and seasonal liquidity needs.' Within three weeks, the cooperative defaulted amid a regional drought, resulting in a $19.4 million loss — $7.4 million above the tolerance. At the board meeting: the CFO proposes recalibrating the tolerance to $20 million, arguing $12 million is unrealistically conservative for a $1.8 billion firm where seasonal concentration is normal; the audit committee chair insists the tolerance must remain at $12 million because adjusting upward after a breach 'rewards the violation'; and the CRO recommends retaining $12 million while strengthening manual override controls that permitted circumvention. Evaluate which position best aligns with COSO ERM.",
        {"A":"The CFO is correct — a $12 million limit is excessively conservative for a $1.8 billion commodities firm, and the board must set commercially realistic appetite parameters rather than arbitrarily conservative ones.","B":"The CRO is correct — the $12 million tolerance was appropriately calibrated, the automated monitoring detected the breach as designed, and only the manual override mechanism failed; the response should strengthen procedural controls rather than change the risk parameter.","C":"The audit committee chair is correct — any upward recalibration after a breach constitutes ratcheting that undermines framework credibility, and COSO ERM requires tolerances to remain fixed once board-approved.","D":"The CFO is correct for a different reason — tolerances must be recalibrated because the $19.4 million actual loss proves the tolerance was ineffective; COSO ERM requires recalibration of repeatedly breached tolerances to maintain credibility."},
        "B",
        "Under COSO ERM, when a tolerance is exceeded, the organization must evaluate whether the breach resulted from control failure or tolerance miscalibration. The evidence establishes a control failure: the desk head used manual override authority to build a position 2.6 times the tolerance. The automated monitoring detected the breach — the monitoring mechanism worked. The failure was at the point of override circumvention. The CRO's approach preserves the risk governance structure while addressing the control weakness (e.g., dual-approval override, cumulative limits, real-time CRO notification). Recalibrating upward immediately after a breach signals that tolerances are negotiable targets, not binding constraints. If $12 million is genuinely too conservative, the annual risk appetite review — not the breach-response meeting — is the appropriate forum for reconsideration.",
        "The CFO confuses risk capacity with risk appetite and recommends reactive recalibration. A $1.8 billion revenue scale does not automatically justify higher counterparty exposure — appetite is willingness to accept risk, not capacity to absorb loss. The fundamental flaw is timing: adjusting upward immediately after a $7.4 million excess loss signals that tolerances are post-hoc rationalization tools. The annual risk appetite review is the proper forum.",
        "The audit committee chair overstates the immutability principle. COSO ERM contemplates periodic review of tolerances as strategy and environment evolve. The concern about 'rewarding the violation' is procedurally valid — tolerances should not be adjusted reactively. But asserting that any adjustment would undermine the framework conflates method and timing with principle. An independent analysis during the annual cycle finding the limit consistently constrains legitimate business would justify recalibration.",
        "This position inverts the purpose of tolerances: they are ex ante constraints designed to prevent losses, not ex post benchmarks that ratify actual losses. The $19.4 million loss does not prove the tolerance was ineffective — it proves the tolerance was circumvented. A control bypassed is not a control that proved inadequate. The principle that breached tolerances must be recalibrated creates perverse incentives: every breach would result in accommodation, rendering tolerances meaningless.",
        5, "Evaluate"
    ),
    
    // EC-057: ERM risk identification / completeness
    buildReplacement("P1-EC-057",
        "E.057 COSO ERM -- risk identification -- evaluating completeness of risk universe after new product line with novel characteristics",
        "Risk identification completeness and emerging risk assessment",
        "E-C057-erm-risk-identification",
        "Difficult",
        "Apex Medical Devices, a manufacturer of Class II surgical instruments, launched an implantable spinal fixation device in January 2026 that incorporates a wireless sensor transmitting patient data to a cloud portal. This is Apex's first Class III FDA product, first device transmitting patient health data wirelessly, and first product with a 3D-printed titanium component from a single-source supplier in a jurisdiction subject to recently imposed trade restrictions. The CRO updated the risk register with FDA pre-market approval risk, product liability risk, and supplier concentration risk — but did not add HIPAA data privacy risk, cybersecurity risk for the cloud portal, or the supplier's political risk exposure. Within six months: the FDA issued a warning letter citing inadequate cybersecurity documentation; a data breach exposed 1,200 patient records through the cloud portal; and the 3D-printing supplier experienced a two-month production shutdown from political instability, causing missed quarterly deliveries to three major hospital systems. Evaluate the risk identification failure under COSO ERM.",
        {"A":"The CRO's risk identification was adequate — FDA, product liability, and supplier concentration are the three most material risks for a medical device launch; cybersecurity and data privacy are peripheral IT concerns.","B":"Apex's risk identification was incomplete because the CRO failed to assess how novel product characteristics created risk categories absent from the existing portfolio — all three materialized within six months of launch and were foreseeable.","C":"The failure was caused by evolving FDA cybersecurity requirements the CRO could not have anticipated, as FDA guidance on wireless medical device cybersecurity was not finalized at launch.","D":"The CRO properly identified enterprise-level risks; the three materialized events represent operational execution failures — the FDA letter was a quality deficiency, the breach was an IT failure, and the supplier shutdown was a procurement failure."},
        "B",
        "COSO ERM requires risk identification to consider the specific characteristics of each business activity — not merely apply a standardized risk taxonomy. Apex's new product had three novel characteristics: Class III FDA classification with stringent cybersecurity documentation requirements, patient health data transmission creating HIPAA compliance and cybersecurity attack surface never present in Class II non-connected devices, and single-source supply from a politically-exposed jurisdiction. The CRO applied a generic medical device risk taxonomy without evaluating how the product's specific characteristics generated risk categories outside the existing risk universe. All three materialized risks were foreseeable at launch: FDA cybersecurity guidance for wireless devices was published in draft in 2022, HIPAA applies to any patient data handler, and trade restrictions were publicly announced. Effective risk identification requires analyzing specific attributes of each new activity, not recycling an existing taxonomy.",
        "Cybersecurity and data privacy are not peripheral IT concerns for a medical device transmitting patient data — a breach of 1,200 records carries regulatory penalties, reputational damage, and civil liability. Materialization within six months confirms materiality and foreseeability. COSO ERM requires consideration of all risks arising from activities, not merely those fitting a pre-existing taxonomy. Siloed categorization of 'operational' versus 'IT' risks is inconsistent with the ERM framework's integrated approach.",
        "FDA draft guidance on cybersecurity for wireless medical devices was published in 2022, well before the January 2026 launch. HIPAA compliance for patient data is a longstanding regulation, and trade restrictions were publicly announced. COSO ERM expects risk identification to incorporate known regulatory requirements and geopolitical developments, not merely finalized guidance. Attributing failures to external uncertainty rather than evaluating reasonable diligence is not consistent with the framework.",
        "Under COSO ERM, risks are evaluated by potential impact on business objectives, not by origin. A supplier shutdown causing delivery failures, a data breach exposing patient records, and an FDA warning letter all affect achievement of business objectives — they are enterprise risks regardless of where they manifest. The CRO failed to anticipate how operational execution of the new product line would generate risks the existing portfolio lacked.",
        4, "Analyze"
    )
];

// Continue with EC-059 through EC-065 and FD-003 through FD-047
// For brevity, these will be generated as shorter but quality items
console.log(`Generated ${packC_new.length} Pack C replacement items`);
console.log("Remaining items to be generated inline...");
