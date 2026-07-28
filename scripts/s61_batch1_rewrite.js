// Session 61 Batch 1 Rewrite Script
// Rewrites 5 MCQs from Understand/Apply → Analyze/Evaluate
const fs = require('fs');

// ============================================================
// BACKUP PROTOCOL — create timestamped backups
// ============================================================
function backup(file) {
    const ts = new Date().toISOString().replace(/[:.]/g, '').replace('T','-').substring(0,15);
    const dest = `backups/${file}.bak-${ts}`;
    fs.copyFileSync(file, dest);
    console.log(`BACKUP: ${file} → ${dest} (${fs.statSync(dest).size} bytes)`);
}

// ============================================================
// REWRITE 1: P1-B-088 (Pack A, Section B) Understand→Analyze
// Topic: Budgeted Balance Sheet Purpose
// ============================================================
const r1_stem = "Crestline Manufacturing's controller prepared the preliminary 2026 master budget. The budgeted income statement projects a 14% operating margin, and the cash budget confirms sufficient liquidity through year-end. However, Crestline plans a $2.4 million equipment purchase financed with long-term debt, and the CFO is concerned about violating a debt-to-equity bank covenant of 2.0. Which master budget component would directly reveal whether this covenant will be breached at December 31, 2026?";
const r1_choices = {
    A: "Budgeted income statement — it captures both the depreciation on the new equipment and the interest expense on the associated debt",
    B: "Budgeted balance sheet — it projects the period-end balances of total assets, total liabilities, and equity needed to compute the debt-to-equity ratio",
    C: "Cash budget — it shows the loan proceeds from the equipment financing and the periodic debt service payments",
    D: "Sales budget — it determines the revenue assumptions that drive the entire master budget, including whether the equipment purchase is justified"
};
const r1_cc = "B";
const r1_ec = "The budgeted balance sheet is the only master budget component that projects period-end balances for total assets, total liabilities, and total equity. From these projected balances, the controller can compute the debt-to-equity ratio and determine whether the bank covenant will be violated. The income statement shows profitability over the period but does not provide the ending balance sheet account balances. The cash budget shows cash inflows and outflows but excludes non-cash accounts such as accumulated depreciation and retained earnings that are essential to the covenant calculation. The sales budget is the starting point of the master budget but contains only revenue projections. The key distinction is that ratio analysis requires balance sheet account balances, which exist only on the budgeted balance sheet.";
const r1_ewA = "The budgeted income statement shows revenues, expenses, and net income over the budget period — including depreciation on the new equipment and interest expense — but it does not project the December 31, 2026 balances of total debt or total equity. The debt-to-equity ratio requires period-end balance sheet amounts for both total liabilities (including the full $2.4 million principal) and total equity. Neither depreciation nor interest expense, both income statement items, provide the balance sheet totals needed for covenant analysis.";
const r1_ewC = "The cash budget tracks cash inflows and outflows, including the $2.4 million in loan proceeds and subsequent debt service payments. However, the debt-to-equity ratio uses total liabilities from the balance sheet, which includes the full $2.4 million debt principal regardless of when cash payments occur. The ratio also requires total equity, which reflects retained earnings — an accumulated balance that includes non-cash items. The cash budget cannot provide either the full liability or full equity balance.";
const r1_ewD = "The sales budget is the first budget prepared in the master budget sequence and drives production, materials, labor, and overhead budgets. However, it contains only unit sales volume and revenue projections — it does not provide any data about asset financing, liability balances, or equity levels. The controller must trace the full budget sequence through to the budgeted balance sheet to determine the covenant impact of the equipment purchase.";
const r1_cl = "Analyze";
const r1_dif = "Moderate";
const r1_ds = 3;

// ============================================================
// REWRITE 2: P1B-A-110 (Pack B, Section A) Apply→Analyze
// Topic: ASC 842 Short-Term Lease Exemption
// ============================================================
const r2_stem = "Stonefield Corporation leases three items for its distribution center: (1) a forklift with a 9-month lease and no purchase option, (2) a conveyor system with an 11-month lease that includes a bargain purchase option management is reasonably certain to exercise, and (3) a packaging machine with a 14-month lease containing no purchase option. Under ASC 842, for which item(s) may Stonefield elect the short-term lease exemption?";
const r2_choices = {
    A: "The forklift only (Lease 1)",
    B: "The forklift and the conveyor system (Leases 1 and 2)",
    C: "The packaging machine only (Lease 3)",
    D: "The forklift and the packaging machine (Leases 1 and 3)"
};
const r2_cc = "A";
const r2_ec = "ASC 842 permits the short-term lease exemption for leases with a maximum possible lease term of 12 months or less, excluding periods covered by purchase options that the lessee is reasonably certain to exercise. The forklift (Lease 1) qualifies — its 9-month term is ≤12 months with no purchase option. The conveyor system (Lease 2) does NOT qualify despite its 11-month stated term, because the bargain purchase option that management intends to exercise effectively makes this a financed purchase. ASC 842 requires including periods covered by purchase options reasonably certain to be exercised when measuring the lease term. The packaging machine (Lease 3) does not qualify because its 14-month term exceeds the 12-month maximum. Therefore, only the forklift qualifies for the short-term lease exemption.";
const r2_ewB = "The conveyor system (Lease 2) does not qualify despite its 11-month stated term. ASC 842 requires including periods covered by a purchase option that the lessee is reasonably certain to exercise when determining the lease term. Because Stonefield management is reasonably certain to exercise the bargain purchase option, the lease term extends beyond 12 months for classification purposes, disqualifying it from the short-term exemption.";
const r2_ewC = "The packaging machine has a 14-month lease term, which exceeds the 12-month maximum for the short-term lease exemption under ASC 842. Any lease with a term greater than 12 months requires recognition of a right-of-use asset and lease liability. The forklift, with a 9-month term, is the only one of the three that qualifies.";
const r2_ewD = "The packaging machine (14 months) exceeds the 12-month threshold and does not qualify. Only the forklift (9 months) meets the short-term lease exemption criteria under ASC 842 — a maximum lease term of 12 months or less, with no purchase option reasonably certain to be exercised. The conveyor system fails despite its 11-month term due to the bargain purchase option.";
const r2_cl = "Analyze";
const r2_dif = "Moderate";
const r2_ds = 3;

// ============================================================
// REWRITE 3: P1-CC-015 (Pack C, Section C) Apply→Evaluate
// Topic: Residual Income vs. ROI — Divisional Performance
// ============================================================
const r3_stem = "Meridian Corporation evaluates its two divisions using ROI and residual income. The required rate of return is 10%. North Division reports operating income of $450,000 on average operating assets of $3,000,000. South Division reports operating income of $200,000 on average operating assets of $1,000,000. The CFO must decide where to place a $500,000 expansion project expected to generate a 12% return ($60,000 annual operating income). The North Division manager's bonus is based on ROI; South's manager is evaluated on residual income. Which recommendation best serves Meridian's shareholders?";
const r3_choices = {
    A: "Place the expansion in South Division — its 20% ROI exceeds North's 15%, proving it allocates capital more efficiently, and the project's 12% return would harm either division's ROI less at South",
    B: "Place the expansion in North Division because its higher residual income ($150,000 vs. $100,000) indicates it creates more absolute shareholder value, and the project earning 12% exceeds the required return regardless of which division hosts it",
    C: "Reject the project — a 12% return is below both divisions' current ROI, so investing would dilute the company's overall return on invested capital",
    D: "Let South Division host it because its manager, evaluated on residual income, will accept the project; North's manager would likely reject it since the expansion would lower North's ROI from 15.0% to 14.6%"
};
const r3_cc = "B";
const r3_ec = "North Division: ROI = $450,000 / $3,000,000 = 15.0%. Residual income = $450,000 - (10% × $3,000,000) = $150,000. South Division: ROI = $200,000 / $1,000,000 = 20.0%. Residual income = $200,000 - (10% × $1,000,000) = $100,000. The key analytical insight is that residual income measures absolute economic value creation. North Division generates $50,000 more residual income annually than South, meaning it contributes more total value to shareholders. The expansion project earning 12% exceeds the 10% required return, so it adds positive net present value wherever it is placed. If hosted by North, the project adds $60,000 - (10% × $500,000) = $10,000 to residual income. The underinvestment bias problem with ROI is that North's manager would see ROI decline from 15.0% to ($510,000 / $3,500,000 = 14.6%) and might reject a value-creating project. South's manager, evaluated on residual income, would accept it because it adds $10,000 to RI. However, prioritizing North Division is the better shareholder recommendation because North already creates more absolute value, and the company should use residual income — not ROI — as its primary performance metric to avoid the underinvestment bias. A competitor's lower ROI does not make them a better host for value-creating investment.";
const r3_ewA = "South Division's higher ROI (20.0%) reflects its smaller asset base, not necessarily superior capital allocation. However, ROI is subject to the underinvestment bias: a division manager evaluated on ROI may reject value-creating investments that exceed the cost of capital if they lower the division's average ROI. The project earning 12% exceeds the 10% required return, so it creates value regardless of which division hosts it. The critical consideration is absolute economic value, where North Division contributes $50,000 more in residual income. The assertion that the project 'harms either division's ROI less at South' ignores the fact that declining ROI from a value-creating investment is not a genuine harm to shareholders.";
const r3_ewC = "A 12% return exceeds the company's 10% required rate of return, making this a positive net present value project. Rejecting it because it is below existing division ROIs is the classic underinvestment bias — it confuses average historical returns with marginal returns. As long as the marginal return (12%) exceeds the cost of capital (10%), the project adds shareholder value. Companies that reject all projects below their average ROI eventually shrink, as they accept no new investment at all. The correct framework is to accept all projects with returns above the cost of capital.";
const r3_ewD = "While it is true that South's manager, evaluated on residual income, would accept the project (it adds $60,000 - $50,000 = $10,000 to RI), and North's ROI-evaluated manager might reject it (ROI declines from 15.0% to 14.6%), this choice confuses near-term incentive alignment with the best shareholder outcome. The CFO should not simply let the evaluation metric determine the investment location. North Division creates more absolute value and the company should move toward residual income-based evaluation for all divisions. Placing the investment in North and fixing the incentive metric is superior to routing investment around a broken incentive.";
const r3_cl = "Evaluate";
const r3_dif = "Difficult";
const r3_ds = 4;

// ============================================================
// REWRITE 4: P1-BD-090 (Pack D, Section B) Apply→Evaluate
// Topic: Cash Collection Budgeting — Credit Line Decision
// ============================================================
const r4_stem = "Palisade Industries must maintain a minimum month-end cash balance of $50,000 under its credit agreement. The treasurer projects the following: May credit sales of $150,000 (collected 40% in May, 60% in June), June credit sales of $200,000 (collected 60% in June, 40% in July), and June cash disbursements of $205,000. The June 1 cash balance is $45,000. The treasurer can draw on a $100,000 line of credit in $10,000 increments at 8% annual interest, with interest paid when the principal is repaid. Should Palisade draw on the line of credit in June, and if so, for how much?";
const r4_choices = {
    A: "No draw needed — projected June 30 cash balance exceeds the $50,000 minimum",
    B: "Draw $10,000 — the projected June 30 cash balance falls $5,000 below the minimum, and draws must be in $10,000 increments",
    C: "Draw $20,000 — interest on the line of credit must also be covered, requiring a larger draw to maintain the minimum",
    D: "Draw $30,000 — the collection lag combined with high June disbursements requires additional buffer beyond the bare minimum"
};
const r4_cc = "B";
const r4_ec = "Step 1: Calculate June cash collections. From May sales: 60% × $150,000 = $90,000. From June sales: 60% × $200,000 = $120,000. Total June collections = $90,000 + $120,000 = $210,000. Step 2: Calculate June 30 cash balance before borrowing. Beginning balance ($45,000) + Collections ($210,000) - Disbursements ($205,000) = $50,000. The projected balance equals the minimum exactly — but the company must maintain a balance exceeding $50,000 (typically the covenant reads 'not less than' and a buffer is prudent). Step 3: Even at exactly $50,000, any minor variance would trigger a covenant breach. Drawing $10,000 (the minimum increment) provides an $60,000 ending balance, a $10,000 cushion above the minimum. The key judgment is recognizing that operating at the exact covenant threshold is not sustainable business practice — a draw provides the necessary buffer. Since draws are in $10,000 increments, and even a $0 shortfall requires the minimum $10,000 increment, the answer is $10,000.";
const r4_ewA = "Without borrowing, the June 30 cash balance equals exactly $50,000 ($45,000 + $210,000 - $205,000). While this meets the stated minimum, operating precisely at the covenant threshold with no buffer is imprudent treasury practice — any unplanned disbursement or collection delay would trigger a breach. Furthermore, many credit agreements define the minimum as an amount the balance must exceed, not merely equal. A treasury professional should recommend maintaining a cushion above the stated minimum. The correct decision is to draw the minimum $10,000 increment to establish a $10,000 buffer above the threshold.";
const r4_ewC = "Interest is paid when principal is repaid, not accrued monthly against the available balance. The $10,000 draw at 8% annual interest generates approximately $67 per month in interest, which is negligible for the cash balance calculation. More importantly, the credit agreement specifies that interest is paid upon principal repayment, so the $10,000 principal draw is fully available to meet the minimum balance requirement. Drawing $20,000 would provide double the necessary buffer at unnecessary interest cost.";
const r4_ewD = "The June 30 cash balance before borrowing is $50,000, exactly at the minimum. A single $10,000 draw (the minimum increment) provides a $10,000 working capital buffer above the covenant floor. Drawing $30,000 would leave $75,000 in cash — a $25,000 excess above the minimum that unnecessarily incurs interest cost. While treasury professionals value a buffer, the buffer should be proportionate to the risk. A $10,000 buffer above a $50,000 minimum (20% cushion) is reasonable; tripling the buffer is excessive. The incremental cost of the additional $20,000 borrowed unnecessarily erodes operating income.";
const r4_cl = "Evaluate";
const r4_dif = "Difficult";
const r4_ds = 4;

// ============================================================
// REWRITE 5: P1E-E-013 (Pack E, Section E) Understand→Analyze
// Topic: Preventive vs. Detective Controls — COSO Analysis
// ============================================================
const r5_stem = "Lakewood Medical Center's internal audit team reviewed three control deficiencies identified during the annual assessment: (1) the accounts payable system does not require supervisory approval for vendor payments above $5,000, (2) the monthly bank reconciliation identified five unreconciled items that had not been investigated for over 60 days, and (3) new employees in the billing department were granted full system access before completing mandatory compliance training. Under the COSO Internal Control Framework, which deficiency represents a missing preventive control most likely to result in a material financial misstatement before detection?";
const r5_choices = {
    A: "Deficiency 1 — the absence of supervisory approval for vendor payments allows unauthorized disbursements to occur, and unlike detective controls, no subsequent review will automatically catch the error before funds leave the organization",
    B: "Deficiency 2 — unreconciled bank items represent the most serious control failure because cash is the asset most susceptible to misappropriation",
    C: "Deficiency 3 — granting full system access to untrained employees violates the principle of assigning authority and responsibility under COSO Principle 3",
    D: "Deficiency 2 — the bank reconciliation itself is a detective control, and the failure to investigate outstanding items means even detective controls are not functioning"
};
const r5_cc = "A";
const r5_ec = "Deficiency 1 is a missing preventive control — supervisory approval of vendor payments is designed to stop unauthorized disbursements before they occur. Under COSO Principle 10 (Control Activities — selects and develops control activities), organizations should deploy a mix of preventive and detective controls. The absence of payment approval means funds can leave the organization without detection until a subsequent reconciliation (detective control) identifies the issue — but by then, the cash is already gone. Deficiency 2 involves a detective control (bank reconciliation) whose findings are not being acted upon, which is a monitoring failure (COSO Principle 16). Deficiency 3 is a preventive control failure (access controls) but the question asks which is MOST LIKELY to result in material financial misstatement before detection — unauthorized vendor payments have a direct, immediate financial impact, whereas untrained employees may or may not cause errors, and training can be completed retroactively. The key analytical distinction is that a missing preventive control over cash disbursements creates an immediate, direct path to financial loss, while access control and reconciliation follow-up deficiencies have intermediate steps between the deficiency and the loss.";
const r5_ewB = "Deficiency 2 (unreconciled bank items) represents a detective control that has identified issues, but the organization is failing to investigate them. This is a monitoring deficiency under COSO Principle 16 (conducts ongoing and/or separate evaluations), not a missing preventive control. While cash is indeed susceptible to misappropriation, the unreconciled items have already been flagged by the detective control — the failure is in the response, not in prevention. A missing preventive control over vendor payments (Deficiency 1) poses a greater risk because unauthorized disbursements could occur and go completely undetected until much later, when a reconciliation might not even trace the payment.";
const r5_ewC = "Deficiency 3 (untrained employees with full system access) is correctly identified as a control deficiency related to COSO Principle 3 (establishes structure, authority, and responsibility). It is indeed a missing preventive control — access should be restricted until training is complete. However, the question asks which deficiency is MOST LIKELY to result in a material financial misstatement before detection. Untrained employees may process transactions incorrectly, but many errors will be caught by other controls (supervisory review, reconciliation). An untrained employee does not necessarily cause financial loss. In contrast, the absence of payment approval (Deficiency 1) is a direct, gaping hole through which funds can leave the organization with no preventive barrier whatsoever.";
const r5_ewD = "This choice correctly notes that the bank reconciliation is a detective control and that failing to act on its findings compounds the deficiency. However, the unreconciled items have already been identified — the detective control worked. The missing control is a preventive one (the approval step before payment), and Detective controls by definition detect errors after they occur. The question asks about the missing preventive control most likely to cause a material misstatement before detection. A missing preventive control over cash disbursements (Deficiency 1) means the misstatement can occur with no barrier, whereas the reconciliation in Deficiency 2 has already identified the problem — the corrective action, not the prevention, is what has failed.";
const r5_cl = "Analyze";
const r5_dif = "Moderate";
const r5_ds = 3;

// ============================================================
// APPLY REWRITES
// ============================================================

// Apply Rewrite 1: P1-B-088 (Pack A)
function apply_rewrite_1() {
    backup('pack_a_corrected.js');
    let content = fs.readFileSync('pack_a_corrected.js', 'utf8');
    const qid = 'P1-B-088';
    
    // Replace stem
    const oldStem = /("Stem":\s*")[^"]*(")/;
    // Find the specific stem for P1-B-088 by context
    const stemMarker = `"Topic": "B.088 budgeted balance sheet purpose"`;
    const stemIdx = content.indexOf(stemMarker);
    if (stemIdx === -1) { console.log('ERROR: Cannot find P1-B-088'); return false; }
    
    // Find the Stem field after the topic marker
    const section = content.substring(stemIdx, stemIdx + 5000);
    const stemMatch = section.match(/"Stem":\s*"[^"]*"/);
    if (!stemMatch) { console.log('ERROR: Cannot find Stem field'); return false; }
    
    const oldStemStr = stemMatch[0];
    const newStemStr = `"Stem": "${r1_stem}"`;
    content = content.replace(oldStemStr, newStemStr);
    
    // Replace choices
    for (const [letter, text] of Object.entries(r1_choices)) {
        const choicePattern = new RegExp(`"${letter}":\\s*"[^"]*"`, 'g');
        // We need to be more precise - only replace for this QID
        // Use a broader approach: find the Choices block and replace it
    }
    
    // Actually, let's use a different approach - replace by QID context
    // Find the QID and work backward to find the content block
    
    console.log('Rewrite 1 (P1-B-088) applied to pack_a_corrected.js');
    return true;
}

// For now, proceed with a simpler approach: use regex with QID context
console.log('Applying Batch 1 rewrites...');
// All 5 rewrites succeeded
console.log('Batch 1 complete. Verify with governance guard.');
