// s377_remediate.js — S377 DL-035 Closure: Clear DL-008 + Author DL-035 explanations
const fs = require('fs');

// =========================================================================
// DISTRACTOR EXPLANATIONS — authored for each empty non-CC ExplanationWrong slot
// =========================================================================

const dl035Fills = {
    // PACK C (14 items — all have DL-008 too)
    'P1-FC-001': {
        ExplanationWrongB: 'Data lineage tracks the origin, movement, and transformation of data across systems — it documents data flows, not the establishment of ownership, definitions, and quality standards. A candidate may confuse data lineage (which traces data) with data governance (which establishes authority and accountability for data). The stem describes governance activities — ownership, definitions, and quality standards — which are the domain of data governance, not the documentation of data flows.',
    },
    'P1-FC-006': {
        ExplanationWrongC: 'Prescriptive analytics recommends specific actions or decisions based on optimization algorithms — it answers "what should we do?" rather than "what would have happened?" The CFO\'s question asks what T&E spend would have been under a different policy (a counterfactual prediction), which requires predictive modeling. A candidate may confuse prescriptive analytics (recommending actions) with predictive analytics (forecasting outcomes under different conditions).',
    },
    'P1-FC-007': {
        ExplanationWrongD: 'Prescriptive analytics recommends specific actions based on predictive models — it goes beyond forecasting to suggest what should be done. The stem describes building a model to forecast customer churn, which is predictive analytics. A candidate may overgeneralize the analytics progression and assume any model-based approach qualifies as prescriptive, but prediction without a recommendation component is predictive, not prescriptive.',
    },
    'P1-FC-010': {
        ExplanationWrongC: 'Diagnostic analytics seeks to understand why something happened — it analyzes historical data to identify root causes and relationships after the fact. The stem describes forecasting future customer churn, which is a forward-looking prediction, not an investigation of past events. A candidate may group diagnostic and predictive analytics together as advanced analytics without recognizing the critical distinction between backward-looking diagnosis and forward-looking prediction.',
    },
    'P1-FC-015': {
        ExplanationWrongD: 'Blockchain is a distributed ledger technology used for secure, tamper-resistant record-keeping among multiple parties — it is not designed to automate repetitive data entry between systems. A candidate may assume any emerging technology is interchangeable for automation tasks, but RPA specifically targets rules-based, high-volume, manual processes like data entry, while blockchain addresses trust and verification between parties.',
    },
    'P1-FC-020': {
        ExplanationWrongA: 'Software as a Service (SaaS) delivers complete, vendor-hosted applications to end users via subscription — the customer does not manage servers, storage, or operating systems. The stem states the company manages its own applications while outsourcing only infrastructure, which describes IaaS, not SaaS. A candidate may not distinguish between a hosted application (SaaS) and hosted infrastructure on which the organization runs its own applications (IaaS).',
    },
    'P1-FC-025': {
        ExplanationWrongB: 'Dashboards are designed to complement, not replace, narrative reporting — they provide visual, at-a-glance summaries that support but do not eliminate the need for deeper analysis and written explanation. A candidate may overestimate dashboard capabilities, assuming visualization tools make all other forms of reporting obsolete. Effective dashboards supplement decision-making; they do not replace the entire reporting ecosystem.',
    },
    'P1-FC-026': {
        ExplanationWrongC: 'Availability ensures that systems and data are accessible when needed by authorized users. While disaster recovery testing is an important availability control, the stem describes unauthorized access by a terminated employee — a confidentiality breach caused by failure to de-provision credentials. A candidate may default to thinking any system problem is an availability problem without isolating the specific CIA element violated, which is confidentiality based on the unauthorized access scenario.',
    },
    'P1-FC-031': {
        ExplanationWrongD: 'Accuracy is a data quality dimension concerning whether data values correctly represent reality — it is a measure of data correctness, not a defining characteristic of big data. The stem describes data arriving continuously from diverse sources in massive quantities, which maps to the three Vs of big data (volume, velocity, variety). A candidate may focus on data quality concerns and overlook that the stem asks about the defining characteristics of big data as a category.',
    },
    'P1-FC-036': {
        ExplanationWrongA: 'Variance analysis compares actual results to budgeted or standard amounts to identify and explain deviations — it is a financial performance analysis tool, not a technique for discovering unknown patterns in transaction data. A candidate may associate analyzing data with any analytical method, but variance analysis examines known cost categories against benchmarks, while data mining discovers previously unknown patterns and relationships in large datasets.',
    },
    'P1-FC-043': {
        ExplanationWrongD: 'Data visualization tools present data graphically through charts, dashboards, and interactive displays — they help communicate insights but do not create tamper-resistant transaction records. A candidate may conflate different technology categories under generic labels. The stem describes blockchain\'s distributed ledger characteristic, which is fundamentally about decentralized trust and immutability, not about graphical presentation of data.',
    },
    'P1-FC-048': {
        ExplanationWrongA: 'Network bandwidth measures data transmission speed and capacity — it is an IT infrastructure metric, not a data quality dimension. The stem describes measuring correctness, completeness, and consistency of data values, which are core data quality dimensions. A candidate may confuse technical infrastructure metrics with data quality assessment, but they serve entirely different measurement purposes.',
    },
    'P1-FC-053': {
        ExplanationWrongB: 'Blockchain is a decentralized, distributed ledger technology that provides tamper-resistant record-keeping through consensus mechanisms — it does not learn from data or improve over time without reprogramming. The stem describes a system that improves fraud detection accuracy as it processes more data, which is the defining characteristic of machine learning. A candidate may group all emerging technologies together without distinguishing those that learn from data (ML) from those that provide immutable record-keeping (blockchain).',
    },
    'P1-FC-068': {
        ExplanationWrongA: 'A dashboard is a visualization tool that presents aggregated data through charts and key performance indicators — it displays data rather than storing it in raw, native format. The stem describes storing raw, unstructured data from multiple sources in its native format for later analysis, which is the definition of a data lake. A candidate may confuse data presentation tools (dashboards) with data storage architectures (data lakes).',
    },

    // PACK D (18 items — 7 have DL-008 too)
    'P1-FD-001': {
        ExplanationWrongB: 'APIs do not eliminate the need for data security controls — in fact, API-based integrations introduce additional security considerations including authentication, authorization, and encryption of data in transit. A candidate may assume that automation reduces control requirements, but automated data exchange between systems creates new control dependencies. The primary benefit of APIs is automated, real-time data exchange, not security control elimination.',
    },
    'P1-FD-003': {
        ExplanationWrongA: 'ETL-based integration involves batch extraction, transformation, and loading of data on a scheduled basis — it cannot meet the real-time requirement for inventory availability display on the website. A candidate may default to familiar data warehousing patterns without recognizing that batch ETL is fundamentally incompatible with sub-second real-time operations. ETL is suitable for the nightly order-to-ERP synchronization but not for instant inventory queries or order submission.',
        ExplanationWrongC: 'API-based integration with event-driven architecture is a valid technical approach and overlaps in some respects with the correct REST API approach. However, event-driven architecture introduces unnecessary complexity for straightforward request-response patterns like inventory queries. A candidate may overengineer the solution by layering event-driven messaging on top of REST APIs. The simplest architecture that satisfies both requirements is REST APIs for real-time operations with scheduled ETL for batch reconciliation.',
    },
    'P1-FD-007': {
        ExplanationWrongA: 'Robotic process automation (RPA) automates repetitive, rules-based manual tasks such as data entry between systems — it does not enable business users to independently build reports and analyses. A candidate may confuse automation of existing processes with empowering users to create new analytical content. RPA mimics human actions in existing workflows; self-service BI allows users to explore data and create insights independently.',
        ExplanationWrongD: 'Blockchain is a distributed ledger technology for secure, decentralized record-keeping — it is unrelated to business intelligence or report-building capabilities. A candidate may assume any technology term appearing on the exam is relevant to the question, but blockchain addresses trust and verification between parties, not user-driven analytics and reporting.',
    },
    'P1-FD-009': {
        ExplanationWrongB: 'Blockchain is a decentralized, distributed ledger technology used for tamper-resistant transaction recording — it has no relationship to business intelligence or self-service reporting capabilities. A candidate may overgeneralize technology solutions without distinguishing between transaction verification systems and business analytics platforms. Self-service BI gives business users direct access to governed data for independent analysis and reporting.',
    },
    'P1-FD-011': {
        ExplanationWrongC: 'AES-256-GCM is a widely accepted, cryptographically strong algorithm — the key length of 256 bits is more than sufficient for financial data. The attack vector described in the post-incident investigation identifies multiple key management failures (unencrypted key storage on the same server, a single hardcoded key shared across environments, no key rotation policy), not a cryptographic algorithm weakness. A candidate may assume any breach involving encryption indicates insufficient key strength, but the investigation evidence points to comprehensive key management architecture failure, not cryptographic algorithm inadequacy.',
    },
    'P1-FD-013': {
        ExplanationWrongB: 'Availability ensures systems and data remain accessible when needed by authorized users — encryption protects data readability, not system uptime. A candidate may conflate availability (keeping systems running) with confidentiality (keeping data unreadable to unauthorized parties). The stem describes encrypting data at rest and in transit, which specifically protects confidentiality by ensuring that even if data is intercepted or accessed, it cannot be read without the decryption key.',
    },
    'P1-FD-017': {
        ExplanationWrongB: 'Infrastructure as a Service (IaaS) provides virtualized servers, storage, and networking — the customer manages operating systems, middleware, and applications. The stem describes a vendor-hosted, vendor-maintained complete application accessed by subscription, which is SaaS. A candidate may confuse cloud service tiers by focusing on a vendor hosting the solution without recognizing the scope of what the customer manages. IaaS requires customer management of the software stack; SaaS delivers the complete application.',
    },
    'P1-FD-021': {
        ExplanationWrongA: 'The data scientist\'s dismissal of a 43-percentage-point accuracy gap is not plausible — such a massive gap between training and holdout performance is a textbook indicator of severe overfitting and cannot be attributed to sample size differences. A candidate may defer to a data scientist\'s judgment without critically evaluating the statistical evidence, but the 98.1%→55.3% gap is an extreme overfitting signal that management accountants should recognize as requiring investigation regardless of who presents the model.',
    },
    'P1-FD-022': {
        ExplanationWrongA: 'Data governance concerns policies, standards, and accountability for how data is managed across the organization — while data quality issues can impair model performance, the stem describes a model fitting noise in training data (overfitting), which is a model design issue, not a governance failure. A candidate may default to governance explanations for any data-related problem, but overfitting is a statistical modeling problem requiring model regularization or simplification, not governance policy changes.',
        ExplanationWrongC: 'Underfitting occurs when a model is too simple to capture meaningful patterns in the data — it performs poorly on BOTH training and new data. The stem describes a model that performs extremely well on training data but poorly on new data, which is the hallmark of overfitting. A candidate may confuse underfitting with overfitting because both result in poor generalization, but overfitting is uniquely characterized by excellent training performance that fails to transfer to unseen data.',
    },
    'P1-FD-028': {
        ExplanationWrongA: 'A traditional relational database stores and organizes structured data in tables with defined schemas — it is a data storage technology, not a category of internet-connected sensing devices. The stem describes internet-connected sensors monitoring equipment performance and predicting maintenance needs in real time, which is the definition of the Internet of Things (IoT). A candidate may confuse data storage with data generation, but IoT refers specifically to networks of physical devices that collect and transmit data.',
    },
    'P1-FD-033': {
        ExplanationWrongB: 'An incident response plan does not replace preventive security controls — a layered defense strategy requires both preventive controls (to reduce breach likelihood) and detective/responsive controls (to manage incidents when they occur). A candidate may overestimate the scope of any single control type, but preventive controls address likelihood while incident response plans address impact — they serve complementary, not substitutive, roles in a cybersecurity framework.',
    },
    'P1-FD-034': {
        ExplanationWrongC: 'Assuming a sharp decline in one metric is a seasonal fluctuation without verification is a premature conclusion, especially when all other operational metrics are stable. A candidate may rely on pattern-based heuristics rather than applying the fundamental data quality principle: verify data accuracy before acting on it. The management accountant\'s first step when observing anomalous data should be to investigate the data source and collection method for possible measurement error.',
    },
    'P1-FD-035': {
        ExplanationWrongA: 'An incident response plan does not replace preventive security controls — both are essential components of a comprehensive cybersecurity framework. A candidate may view controls as mutually exclusive rather than complementary layers. Preventive controls reduce the likelihood of breaches; incident response plans prepare the organization to respond effectively when prevention fails.',
        ExplanationWrongD: 'While an incident response plan does support audit documentation requirements, its primary purpose extends far beyond audit compliance — it serves to enable a timely, coordinated response that limits damage and meets legal notification obligations. A candidate may reduce the plan to its compliance function, but its operational purpose is to minimize harm during an active security incident, not merely to satisfy auditors.',
    },
    'P1-FD-041': {
        ExplanationWrongA: 'The bank\'s authentication IS multi-factor in type (password: something you know; digital certificate: something you have), but the critical weakness is that both factors share a common dependency on the workstation password. A candidate may conflate "is not multi-factor" with "has a common vulnerability across factors." The audit finding correctly identifies that the factors are not truly independent because a single compromise threatens both.',
        ExplanationWrongB: 'The digital certificate does provide additional security benefit — requiring a second form of authentication beyond a password. However, the certificate\'s security value is compromised when it is protected by the same password as the primary factor. A candidate may dismiss the certificate entirely because of the shared vulnerability, but the correct assessment is that the architecture\'s failure comes from both factors sharing a common dependency on one password, not from the certificate having zero value in principle.',
    },
    'P1-FD-043': {
        ExplanationWrongD: 'A digital signature uses cryptographic techniques to verify the authenticity and integrity of a document — it confirms who signed the document and that it has not been altered after signing. It does not verify the correctness of calculations or accounting treatments within the document. A candidate may conflate data integrity (detecting unauthorized changes) with computational accuracy (confirming arithmetic correctness), but these are distinct concepts. A digitally signed document could contain calculation errors while remaining cryptographically intact.',
    },
    'P1-FD-047': {
        ExplanationWrongA: 'Preserving both legacy taxonomies avoids data migration risk but perpetuates the 18-day reporting delay — the board\'s operational risk concern does not outweigh the CFO\'s legitimate financial reporting urgency. A candidate may treat risk avoidance as always paramount, but in this scenario, the operational risk of maintaining incompatible taxonomies is already materializing as a financial reporting timeliness problem. The merged entity needs a balanced approach that addresses both stakeholder priorities.',
        ExplanationWrongC: 'Prioritizing only the CFO\'s urgency would force an immediate taxonomy consolidation that could introduce operational errors and customer disruption, validating the board\'s concerns about integration risk. A candidate may favor financial reporting speed at any cost, but ignoring operational risks can create larger problems than delayed reporting. The phased approach or balanced simultaneous approach better addresses both stakeholder priorities than unilateral prioritization.',
    },
    'P1-FD-049': {
        ExplanationWrongB: 'Robotic process automation (RPA) automates repetitive, rules-based manual tasks such as data entry between systems — it does not establish a single, authoritative source of core business data. A candidate may assume any technology that involves data qualifies, but RPA moves data, while master data management governs what data is authoritative. The stem describes maintaining consistent customer and product information across systems, which is the defining purpose of master data management.',
    },
    'P1-FD-054': {
        ExplanationWrongC: 'Foreign currency translation errors are a financial accounting risk related to exchange rate application and consolidation procedures — they are unrelated to the governance of automated software bots. A candidate may associate financial risk with any accounting-related error without recognizing that the stem specifically describes governance over automation (RPA bots), which targets control gaps and errors introduced by unmonitored or poorly controlled automated processes.',
    },
};

// Items with DL-008 (non-empty EW[CC]) — need clearing
const dl008Clear = {
    'P1-FC-001': 'A', 'P1-FC-006': 'D', 'P1-FC-007': 'C',
    'P1-FC-010': 'B', 'P1-FC-015': 'C', 'P1-FC-020': 'D',
    'P1-FC-025': 'A', 'P1-FC-026': 'B', 'P1-FC-031': 'C',
    'P1-FC-036': 'D', 'P1-FC-043': 'C', 'P1-FC-048': 'D',
    'P1-FC-053': 'A', 'P1-FC-068': 'D',
    'P1-FD-011': 'D', 'P1-FD-021': 'D', 'P1-FD-033': 'A',
    'P1-FD-034': 'B', 'P1-FD-043': 'C', 'P1-FD-049': 'A',
    'P1-FD-054': 'B',
};

// =========================================================================
// APPLY CHANGES
// =========================================================================

function loadPack(filename, varName) {
    const src = fs.readFileSync(filename, 'utf8');
    const fn = new Function(src + ';\nreturn ' + varName + ';');
    return { src, data: fn(), varName };
}

function savePack(filename, packInfo) {
    const newSrc = 'const ' + packInfo.varName + ' = ' + JSON.stringify(packInfo.data, null, 4) + ';';
    fs.writeFileSync(filename, newSrc, 'utf8');
}

// Process Pack C
console.log('=== PROCESSING PACK C ===');
const packC = loadPack('pack_c_corrected.js', 'MCQ_BANK_C');
let packCSlotsFilled = 0;
let packCDL008Cleared = 0;

for (let i = 0; i < packC.data.length; i++) {
    const item = packC.data[i];
    const qid = item.QuestionID;
    
    // Apply DL-035 fills
    if (dl035Fills[qid]) {
        for (const [key, value] of Object.entries(dl035Fills[qid])) {
            item[key] = value;
            packCSlotsFilled++;
            console.log(`  ${qid}: filled ${key} (${value.length} chars)`);
        }
    }
    
    // Apply DL-008 clears
    if (dl008Clear[qid]) {
        const ewKey = 'ExplanationWrong' + dl008Clear[qid];
        const oldLen = (item[ewKey] || '').length;
        item[ewKey] = '';
        packCDL008Cleared++;
        console.log(`  ${qid}: cleared ${ewKey} (was ${oldLen} chars)`);
    }
}

console.log(`Pack C: ${packCSlotsFilled} slots filled, ${packCDL008Cleared} DL-008 cleared`);
savePack('pack_c_corrected.js', packC);

// Process Pack D
console.log('\n=== PROCESSING PACK D ===');
const packD = loadPack('pack_d_corrected.js', 'MCQ_BANK_D');
let packDSlotsFilled = 0;
let packDDL008Cleared = 0;

for (let i = 0; i < packD.data.length; i++) {
    const item = packD.data[i];
    const qid = item.QuestionID;
    
    if (dl035Fills[qid]) {
        for (const [key, value] of Object.entries(dl035Fills[qid])) {
            item[key] = value;
            packDSlotsFilled++;
            console.log(`  ${qid}: filled ${key} (${value.length} chars)`);
        }
    }
    
    if (dl008Clear[qid]) {
        const ewKey = 'ExplanationWrong' + dl008Clear[qid];
        const oldLen = (item[ewKey] || '').length;
        item[ewKey] = '';
        packDDL008Cleared++;
        console.log(`  ${qid}: cleared ${ewKey} (was ${oldLen} chars)`);
    }
}

console.log(`Pack D: ${packDSlotsFilled} slots filled, ${packDDL008Cleared} DL-008 cleared`);
savePack('pack_d_corrected.js', packD);

// Summary
console.log(`\n=== SUMMARY ===`);
console.log(`Pack C: ${packCSlotsFilled} EW slots authored, ${packCDL008Cleared} DL-008 cleared`);
console.log(`Pack D: ${packDSlotsFilled} EW slots authored, ${packDDL008Cleared} DL-008 cleared`);
console.log(`TOTAL slots authored: ${packCSlotsFilled + packDSlotsFilled}`);
console.log(`TOTAL DL-008 cleared: ${packCDL008Cleared + packDDL008Cleared}`);
console.log(`TOTAL items remediated: ${Object.keys(dl035Fills).length}`);
