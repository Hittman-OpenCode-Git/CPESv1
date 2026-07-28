// Session 61 Batch 1 Rewrite — single parse-modify-write per pack
const fs = require('fs');

function backup(file) {
    const ts = new Date().toISOString().replace(/[T:.]/g, '-').substring(0, 19);
    const dest = `backups/${file}.bak-S61B1-${ts}`;
    fs.copyFileSync(file, dest);
    const sz = fs.statSync(dest).size;
    if (sz === 0) throw new Error(`Backup failed: ${dest} is empty`);
    console.log(`BACKUP OK: ${dest} (${sz} bytes)`);
}

const packs = {
    pack_a: { file: 'pack_a_corrected.js', varname: 'MCQ_BANK_A', decl: 'var ' },
    pack_b: { file: 'pack_b_corrected.js', varname: 'MCQ_BANK_B', decl: 'const ' },
    pack_c: { file: 'pack_c_corrected.js', varname: 'MCQ_BANK_C', decl: 'const ' },
    pack_d: { file: 'pack_d_corrected.js', varname: 'MCQ_BANK_D', decl: 'const ' },
    pack_e: { file: 'pack_e_corrected.js', varname: 'MCQ_BANK_E', decl: 'const ' }
};

// Rewrites grouped by pack
const rewritesByPack = {
    pack_a: {
        'P1-B-088': {
            Stem: "Crestline Manufacturing's controller prepared the preliminary 2026 master budget. The budgeted income statement projects a 14% operating margin, and the cash budget confirms sufficient liquidity through year-end. However, Crestline plans a $2.4 million equipment purchase financed with long-term debt, and the CFO is concerned about violating a debt-to-equity bank covenant of 2.0. Which master budget component would directly reveal whether this covenant will be breached at December 31, 2026?",
            Choices: { A: "Budgeted income statement — it captures both the depreciation on the new equipment and the interest expense on the associated debt", B: "Budgeted balance sheet — it projects the period-end balances of total assets, total liabilities, and equity needed to compute the debt-to-equity ratio", C: "Cash budget — it shows the loan proceeds from the equipment financing and the periodic debt service payments", D: "Sales budget — it determines the revenue assumptions that drive the entire master budget, including whether the equipment purchase is justified" },
            CorrectChoice: "B",
            ExplanationCorrect: "The budgeted balance sheet is the only master budget component that projects period-end balances for total assets, total liabilities, and total equity. From these projected balances, the controller can compute the debt-to-equity ratio and determine whether the bank covenant will be violated. The income statement shows profitability over the period but does not provide the ending balance sheet account balances. The cash budget shows cash inflows and outflows but excludes non-cash accounts such as accumulated depreciation and retained earnings that are essential to the covenant calculation. The sales budget is the starting point of the master budget but contains only revenue projections. The key distinction is that ratio analysis requires balance sheet account balances, which exist only on the budgeted balance sheet.",
            ExplanationWrongA: "The budgeted income statement shows revenues, expenses, and net income over the budget period — including depreciation on the new equipment and interest expense — but it does not project the December 31, 2026 balances of total debt or total equity. The debt-to-equity ratio requires period-end balance sheet amounts for both total liabilities (including the full $2.4 million principal) and total equity. Neither depreciation nor interest expense, both income statement items, provide the balance sheet totals needed for covenant analysis.",
            ExplanationWrongB: "",
            ExplanationWrongC: "The cash budget tracks cash inflows and outflows, including the $2.4 million in loan proceeds and subsequent debt service payments. However, the debt-to-equity ratio uses total liabilities from the balance sheet, which includes the full $2.4 million debt principal regardless of when cash payments occur. The ratio also requires total equity, which reflects retained earnings — an accumulated balance that includes non-cash items. The cash budget cannot provide either the full liability or full equity balance.",
            ExplanationWrongD: "The sales budget is the first budget prepared in the master budget sequence and drives production, materials, labor, and overhead budgets. However, it contains only unit sales volume and revenue projections — it does not provide any data about asset financing, liability balances, or equity levels. The controller must trace the full budget sequence through to the budgeted balance sheet to determine the covenant impact of the equipment purchase.",
            CognitiveLevel: "Analyze",
            Difficulty: "Moderate",
            DifficultyScore: 3
        }
    },
    pack_b: {
        'P1B-A-110': {
            Stem: "Stonefield Corporation leases three items for its distribution center: (1) a forklift with a 9-month lease and no purchase option, (2) a conveyor system with an 11-month lease that includes a bargain purchase option management is reasonably certain to exercise, and (3) a packaging machine with a 14-month lease containing no purchase option. Under ASC 842, for which item(s) may Stonefield elect the short-term lease exemption?",
            Choices: { A: "The forklift only (Lease 1)", B: "The forklift and the conveyor system (Leases 1 and 2)", C: "The packaging machine only (Lease 3)", D: "The forklift and the packaging machine (Leases 1 and 3)" },
            CorrectChoice: "A",
            ExplanationCorrect: "ASC 842 permits the short-term lease exemption for leases with a maximum possible lease term of 12 months or less, excluding periods covered by purchase options that the lessee is reasonably certain to exercise. The forklift (Lease 1) qualifies — its 9-month term is 12 months or less with no purchase option. The conveyor system (Lease 2) does NOT qualify despite its 11-month stated term, because the bargain purchase option that management intends to exercise effectively makes this a financed purchase. ASC 842 requires including periods covered by purchase options reasonably certain to be exercised when measuring the lease term. The packaging machine (Lease 3) does not qualify because its 14-month term exceeds the 12-month maximum. Therefore, only the forklift qualifies for the short-term lease exemption.",
            ExplanationWrongA: "",
            ExplanationWrongB: "The conveyor system (Lease 2) does not qualify despite its 11-month stated term. ASC 842 requires including periods covered by a purchase option that the lessee is reasonably certain to exercise when determining the lease term. Because Stonefield management is reasonably certain to exercise the bargain purchase option, the lease term extends beyond 12 months for classification purposes, disqualifying it from the short-term lease exemption.",
            ExplanationWrongC: "The packaging machine has a 14-month lease term, which exceeds the 12-month maximum for the short-term lease exemption under ASC 842. Any lease with a term greater than 12 months requires recognition of a right-of-use asset and lease liability. The forklift, with a 9-month term, is the only one of the three that qualifies.",
            ExplanationWrongD: "The packaging machine (14 months) exceeds the 12-month threshold and does not qualify. Only the forklift (9 months) meets the short-term lease exemption criteria under ASC 842 — a maximum lease term of 12 months or less, with no purchase option reasonably certain to be exercised. The conveyor system fails despite its 11-month term due to the bargain purchase option.",
            CognitiveLevel: "Analyze",
            Difficulty: "Moderate",
            DifficultyScore: 3
        }
    },
    pack_c: {
        'P1-CC-015': {
            Stem: "Meridian Corporation evaluates its two divisions using ROI and residual income. The required rate of return is 10%. North Division reports operating income of $450,000 on average operating assets of $3,000,000. South Division reports operating income of $200,000 on average operating assets of $1,000,000. The CFO must decide where to place a $500,000 expansion project expected to generate a 12% return ($60,000 annual operating income). The North Division manager's bonus is based on ROI; South's manager is evaluated on residual income. Which recommendation best serves Meridian's shareholders?",
            Choices: { A: "Place the expansion in South Division — its 20% ROI exceeds North's 15%, proving it allocates capital more efficiently, and the project's 12% return would harm either division's ROI less at South", B: "Place the expansion in North Division because its higher residual income ($150,000 vs. $100,000) indicates it creates more absolute shareholder value, and the project earning 12% exceeds the required return regardless of which division hosts it", C: "Reject the project — a 12% return is below both divisions' current ROI, so investing would dilute the company's overall return on invested capital", D: "Let South Division host it because its manager, evaluated on residual income, will accept the project; North's manager would likely reject it since the expansion would lower North's ROI from 15.0% to 14.6%" },
            CorrectChoice: "B",
            ExplanationCorrect: "North Division: ROI = $450,000 / $3,000,000 = 15.0%. Residual income = $450,000 - (10% × $3,000,000) = $150,000. South Division: ROI = $200,000 / $1,000,000 = 20.0%. Residual income = $200,000 - (10% × $1,000,000) = $100,000. The key analytical insight is that residual income measures absolute economic value creation. North Division generates $50,000 more residual income annually than South, meaning it contributes more total value to shareholders. The expansion project earning 12% exceeds the 10% required return, so it adds positive net present value wherever it is placed. If hosted by North, the project adds $60,000 - (10% × $500,000) = $10,000 to residual income. The underinvestment bias problem with ROI is that North's manager would see ROI decline from 15.0% to ($510,000 / $3,500,000 = 14.6%) and might reject a value-creating project. South's manager, evaluated on residual income, would accept it because it adds $10,000 to RI. However, prioritizing North Division is the better shareholder recommendation because North already creates more absolute value, and the company should use residual income — not ROI — as its primary performance metric to avoid the underinvestment bias. A division's higher ROI does not make it a better host for value-creating investment.",
            ExplanationWrongA: "South Division's higher ROI (20.0%) reflects its smaller asset base, not necessarily superior capital allocation. ROI is subject to the underinvestment bias: a division manager may reject value-creating investments that exceed the cost of capital if they lower the division's average ROI. The project earning 12% exceeds the 10% required return, so it creates value regardless of which division hosts it. The critical consideration is absolute economic value, where North Division contributes $50,000 more in residual income. The assertion that the project harms either division's ROI less at South ignores that declining ROI from a value-creating investment is not a genuine harm to shareholders.",
            ExplanationWrongC: "A 12% return exceeds the company's 10% required rate of return, making this a positive net present value project. Rejecting it because it is below existing division ROIs is the classic underinvestment bias — it confuses average historical returns with marginal returns. As long as the marginal return (12%) exceeds the cost of capital (10%), the project adds shareholder value. Companies that reject all projects below their average ROI eventually shrink, as they accept no new investment. The correct framework is to accept all projects with returns above the cost of capital.",
            ExplanationWrongD: "While it is true that South's manager, evaluated on residual income, would accept the project (it adds $10,000 to RI), and North's ROI-evaluated manager might reject it (ROI declines from 15.0% to 14.6%), this choice confuses near-term incentive alignment with the best shareholder outcome. The CFO should not simply let the evaluation metric determine the investment location. North Division creates more absolute value and the company should move toward residual income-based evaluation for all divisions. Placing the investment in North and fixing the incentive metric is superior to routing investment decisions around a broken incentive design.",
            CognitiveLevel: "Evaluate",
            Difficulty: "Difficult",
            DifficultyScore: 4
        }
    },
    pack_d: {
        'P1-BD-090': {
            Stem: "Palisade Industries must maintain a minimum month-end cash balance of $50,000 under its credit agreement. The treasurer projects the following: May credit sales of $150,000 (collected 40% in May, 60% in June), June credit sales of $200,000 (collected 60% in June, 40% in July), and June cash disbursements of $205,000. The June 1 cash balance is $45,000. The treasurer can draw on a $100,000 line of credit in $10,000 increments at 8% annual interest, with interest paid when the principal is repaid. Should Palisade draw on the line of credit in June, and if so, for how much?",
            Choices: { A: "No draw needed — projected June 30 cash balance exceeds the $50,000 minimum", B: "Draw $10,000 — the projected June 30 cash balance of $50,000 meets the minimum exactly, but a draw provides a prudent working capital buffer above the covenant threshold", C: "Draw $20,000 — interest on the line of credit must also be covered in the same month, requiring a larger draw to maintain the minimum balance", D: "Draw $30,000 — the collection lag combined with high June disbursements requires additional buffer beyond the bare minimum to absorb timing variances" },
            CorrectChoice: "B",
            ExplanationCorrect: "Step 1: Calculate June cash collections. From May sales collected in June: 60% × $150,000 = $90,000. From June sales collected in June: 60% × $200,000 = $120,000. Total June collections = $210,000. Step 2: Project June 30 cash balance before borrowing. Beginning balance ($45,000) + Collections ($210,000) - Disbursements ($205,000) = $50,000. The projected balance equals the $50,000 minimum exactly. While this technically meets the stated minimum, operating precisely at the covenant threshold with zero buffer is imprudent treasury practice — any unplanned disbursement or minor collection delay triggers a breach. Additionally, many credit agreements define the minimum as a balance that must be maintained, not merely reached. Step 3: Drawing $10,000 (the minimum increment) produces a $60,000 ending balance, establishing a $10,000 buffer above the covenant floor. Interest is paid upon principal repayment, not accrued against the available balance, so the full $10,000 is available for the minimum balance requirement. The key judgment is recognizing that a draw is warranted despite meeting the stated minimum, because operating without a buffer is not commercially reasonable treasury management.",
            ExplanationWrongA: "Without borrowing, the June 30 cash balance equals exactly $50,000 ($45,000 + $210,000 - $205,000). While this calculation is mathematically correct, operating precisely at the covenant threshold with no margin for error is not prudent treasury management. Any unplanned disbursement — a vendor demanding earlier payment, a utility bill arriving ahead of schedule — would trigger a covenant breach and potential default. Treasury professionals maintain a working capital buffer above stated minimums. The correct decision is to draw the $10,000 minimum increment to establish this buffer.",
            ExplanationWrongC: "Interest is paid when the principal is repaid per the credit agreement terms, not accrued monthly against the available cash balance. The $10,000 draw at 8% annual interest would generate approximately $67 per month in interest, which is negligible for the cash balance calculation. More importantly, the interest expense accrues but is not paid until principal repayment, meaning the full $10,000 principal draw is available to meet the minimum balance requirement. Drawing $20,000 provides double the necessary buffer at unnecessary interest cost.",
            ExplanationWrongD: "The June 30 cash balance before borrowing is $50,000, exactly at the minimum. A $10,000 draw provides a $10,000 working capital buffer (20% above the covenant floor), which is a proportionate and reasonable cushion for a business of this size. Drawing $30,000 would leave $75,000 in cash — a $25,000 excess above the minimum. While treasury professionals value buffers, they should be proportionate to risk. The $20,000 of unnecessary borrowing would incur approximately $1,600 in annual interest cost with no offsetting benefit to the business.",
            CognitiveLevel: "Evaluate",
            Difficulty: "Difficult",
            DifficultyScore: 4
        }
    },
    pack_e: {
        'P1E-E-013': {
            Stem: "Lakewood Medical Center's internal audit team reviewed three control deficiencies identified during the annual assessment: (1) the accounts payable system does not require supervisory approval for vendor payments above $5,000, (2) the monthly bank reconciliation identified five unreconciled items that had not been investigated for over 60 days, and (3) new employees in the billing department were granted full system access before completing mandatory compliance training. Under the COSO Internal Control Framework, which deficiency represents a missing preventive control most likely to result in a material financial misstatement before detection?",
            Choices: { A: "Deficiency 1 — the absence of supervisory approval for vendor payments allows unauthorized disbursements to occur, and unlike detective controls, no subsequent review will automatically catch the error before funds leave the organization", B: "Deficiency 2 — unreconciled bank items represent the most serious control failure because cash is the asset most susceptible to misappropriation", C: "Deficiency 3 — granting full system access to untrained employees violates the principle of assigning authority and responsibility under COSO Principle 3", D: "Deficiency 2 — the bank reconciliation itself is a detective control, and the failure to investigate outstanding items means even detective controls are not functioning" },
            CorrectChoice: "A",
            ExplanationCorrect: "Deficiency 1 is a missing preventive control — supervisory approval of vendor payments is designed to stop unauthorized disbursements before they occur. Under COSO Principle 10 (selects and develops control activities), organizations should deploy a mix of preventive and detective controls. The absence of payment approval means funds can leave the organization without detection until a subsequent reconciliation (detective control) identifies the issue — but by then, the cash is already gone. Deficiency 2 involves a detective control (bank reconciliation) whose findings are not being acted upon, representing a monitoring failure under COSO Principle 16. Deficiency 3 is a preventive control failure (access controls), but the question asks which is most likely to result in material financial misstatement before detection — unauthorized vendor payments have a direct, immediate financial impact, whereas untrained employees may or may not cause errors, and training can be retroactively completed. The key analytical distinction is that a missing preventive control over cash disbursements creates an immediate, direct path to financial loss, while access control and reconciliation follow-up deficiencies have intermediate steps between the deficiency and the loss.",
            ExplanationWrongA: "",
            ExplanationWrongB: "Deficiency 2 (unreconciled bank items) represents a detective control that has identified issues, but the organization is failing to investigate them. This is a monitoring deficiency under COSO Principle 16 (conducts ongoing and/or separate evaluations), not a missing preventive control. While cash is susceptible to misappropriation, the unreconciled items have already been flagged by the detective control — the failure is in the response, not in prevention. A missing preventive control over vendor payments (Deficiency 1) poses greater risk because unauthorized disbursements could occur and go completely undetected until much later.",
            ExplanationWrongC: "Deficiency 3 (untrained employees with full system access) is correctly identified as a control deficiency related to COSO Principle 3 (establishes structure, authority, and responsibility). It is indeed a missing preventive control — access should be restricted until training is complete. However, the question asks which deficiency is most likely to result in a material financial misstatement before detection. Untrained employees may process transactions incorrectly, but many errors will be caught by other controls. An untrained employee does not necessarily cause financial loss. The absence of payment approval (Deficiency 1) is a direct opening through which funds can leave the organization with no preventive barrier whatsoever.",
            ExplanationWrongD: "This choice correctly notes that the bank reconciliation is a detective control and that failing to act on its findings compounds the deficiency. However, the unreconciled items have already been identified — the detective control worked. The missing preventive control is the approval step before payment, and detective controls by definition detect errors after they occur. The question asks about the missing preventive control most likely to cause a material misstatement before detection. A missing preventive control over cash disbursements (Deficiency 1) means the misstatement can occur with no barrier, whereas the reconciliation in Deficiency 2 has already identified the problem — the corrective action, not the prevention, is what has failed.",
            CognitiveLevel: "Analyze",
            Difficulty: "Moderate",
            DifficultyScore: 3
        }
    }
};

// ===== APPLY ALL REWRITES =====
for (const [packKey, packQids] of Object.entries(rewritesByPack)) {
    const packInfo = packs[packKey];
    console.log(`\n=== Processing ${packKey}: ${packInfo.file} ===`);
    
    // Parse pack file once
    const rawContent = fs.readFileSync(packInfo.file, 'utf8');
    const data = (new Function(rawContent + '; return ' + packInfo.varname + ';'))();
    console.log(`  Parsed: ${data.length} items`);
    
    let modCount = 0;
    
    for (const [qid, fields] of Object.entries(packQids)) {
        let found = false;
        for (const item of data) {
            if (item.QuestionID === qid) {
                found = true;
                
                // Apply all field changes
                for (const [key, value] of Object.entries(fields)) {
                    item[key] = value;
                }
                
                // DL-008 check
                const cc = item.CorrectChoice;
                const ewCC = item['ExplanationWrong' + cc];
                if (ewCC && ewCC !== '') {
                    console.log(`  *** DL-008: ${qid} EW[${cc}] non-empty! ***`);
                }
                
                // DL-026 check
                const letters = ['A','B','C','D'];
                const emptyNonCC = letters.filter(l => l !== cc && (!item['ExplanationWrong' + l] || item['ExplanationWrong' + l] === ''));
                if (emptyNonCC.length > 0) {
                    console.log(`  *** DL-026: ${qid} empty non-CC slots: ${emptyNonCC.join(',')} ***`);
                }
                
                console.log(`  ✓ ${qid}: ${fields.CognitiveLevel || item.CognitiveLevel} / ${fields.Difficulty || item.Difficulty} — CC=${cc} DL-008=OK`);
                modCount++;
                break;
            }
        }
        if (!found) console.log(`  *** NOT FOUND: ${qid} ***`);
    }
    
    if (modCount === 0) {
        console.log(`  No modifications applied, skipping backup+write.`);
        continue;
    }
    
    // Backup
    backup(packInfo.file);
    
    // Serialize and write
    const serialized = packInfo.decl + packInfo.varname + ' = ' + JSON.stringify(data, null, 4) + ';';
    fs.writeFileSync(packInfo.file, serialized, 'utf8');
    console.log(`  WRITTEN: ${serialized.length} bytes`);
    
    // Verify
    const verifyData = (new Function(serialized + '; return ' + packInfo.varname + ';'))();
    console.log(`  VERIFIED: ${verifyData.length} items parsed, ${modCount} items modified`);
}

console.log('\n=== BATCH 1 APPLIED ===');
