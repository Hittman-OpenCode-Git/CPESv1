# CMA Part 2 Formula Master

**Version:** 1.0
**Status:** Active
**Authority:** P2001_PART2_BLUEPRINT_FOUNDATION.md; P2002_BLUEPRINT_EXTRACTION.json
**Purpose:** Single source of truth for all 52 formulas used within the CMA Part 2 Exam Simulator.
**Cross-Reference:** `p2/P2005_FORMULA_MASTER.json` (machine-readable equivalent)

---

## Philosophy

This document is the authoritative formula registry for Part 2. Every formula includes:
- Canonical notation (LaTeX-style)
- Variable definitions
- Acceptable tolerance (from P2002_CERTIFICATION_STANDARD.md §D.4)
- Rounding rules
- Common errors (from §E.1)
- Authority citation
- Exam trap

If a question calculation conflicts with this document, the question must be reviewed.

---

# Domain A — Financial Statement Analysis (21 Formulas)

---

## FA-01: Current Ratio

**Domain:** A — Financial Statement Analysis
**Section:** Liquidity Ratios
**Notation:** `Current\ Ratio = \frac{Current\ Assets}{Current\ Liabilities}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| CA | Current Assets | Cash + receivables + inventory + prepaids + marketable securities, expected to convert within 1 year | USD |
| CL | Current Liabilities | Obligations due within 1 year (A/P, accrued expenses, short-term debt, current portion of LTD) | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Including restricted cash without verifying liquidity; misclassifying the current portion of LTD as non-current
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** Candidates often include prepaid expenses as cash equivalents or exclude the current portion of long-term debt from current liabilities.

---

## FA-02: Quick Ratio (Acid-Test Ratio)

**Domain:** A — Financial Statement Analysis
**Section:** Liquidity Ratios
**Notation:** `Quick\ Ratio = \frac{Cash + Marketable\ Securities + Accounts\ Receivable}{Current\ Liabilities}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| C | Cash | Cash and cash equivalents | USD |
| MS | Marketable Securities | Short-term investments readily convertible to cash | USD |
| AR | Accounts Receivable | Net realizable value of trade receivables | USD |
| CL | Current Liabilities | Obligations due within 1 year | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Including inventory (excluded in quick ratio); including prepaid expenses
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** The quick ratio excludes inventory because it is the least liquid current asset. Candidates frequently include it, confusing the quick ratio with the current ratio.

---

## FA-03: Cash Ratio

**Domain:** A — Financial Statement Analysis
**Section:** Liquidity Ratios
**Notation:** `Cash\ Ratio = \frac{Cash + Marketable\ Securities}{Current\ Liabilities}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| C | Cash | Cash and cash equivalents | USD |
| MS | Marketable Securities | Short-term investments readily convertible to cash | USD |
| CL | Current Liabilities | Obligations due within 1 year | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Including accounts receivable (AR is excluded from the cash ratio); treating restricted cash as unrestricted
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** The cash ratio is the most conservative liquidity measure. Candidates may apply it where inventory or receivables turn over quickly, making the ratio misleadingly low.

---

## FA-04: Inventory Turnover

**Domain:** A — Financial Statement Analysis
**Section:** Activity Ratios
**Notation:** `Inventory\ Turnover = \frac{COGS}{Average\ Inventory}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| COGS | Cost of Goods Sold | Cost of inventory sold during the period | USD |
| AvgInv | Average Inventory | (Beginning Inventory + Ending Inventory) / 2 | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Using ending inventory instead of average inventory; using sales instead of COGS
**Authority:** ASC 330 (Inventory)
**Exam Trap:** Using sales in the numerator when COGS is required inflates the turnover figure and misrepresents inventory management efficiency.

---

## FA-05: Days Sales Outstanding (DSO)

**Domain:** A — Financial Statement Analysis
**Section:** Activity Ratios
**Notation:** `DSO = \frac{Average\ Accounts\ Receivable}{Net\ Credit\ Sales} \times 365`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| AvgAR | Average Accounts Receivable | (Beginning AR + Ending AR) / 2 | USD |
| NCS | Net Credit Sales | Total credit sales less returns and allowances | USD |
| 365 | Days in Year | Standard period denominator | days |

**Tolerance:** 0.01 (days) | **Rounding:** Two decimal places
**Common Errors:** Using 360 days instead of 365; using total sales instead of credit sales
**Authority:** ASC 310 (Receivables)
**Exam Trap:** The CMA exam uses 365 days (not 360). A low DSO is generally favorable but may indicate overly restrictive credit policies sacrificing sales volume.

---

## FA-06: Days Payable Outstanding (DPO)

**Domain:** A — Financial Statement Analysis
**Section:** Activity Ratios
**Notation:** `DPO = \frac{Average\ Accounts\ Payable}{Total\ Purchases} \times 365`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| AvgAP | Average Accounts Payable | (Beginning AP + Ending AP) / 2 | USD |
| TP | Total Purchases | COGS + Ending Inventory − Beginning Inventory | USD |
| 365 | Days in Year | Standard period denominator | days |

**Tolerance:** 0.01 (days) | **Rounding:** Two decimal places
**Common Errors:** Using 360 days; using COGS directly without adjusting for inventory change
**Authority:** ASC 405 (Liabilities)
**Exam Trap:** Purchases must be computed indirectly if not given: Purchases = COGS + ΔInventory. A high DPO may signal liquidity problems rather than favorable credit terms.

---

## FA-07: Debt-to-Equity Ratio

**Domain:** A — Financial Statement Analysis
**Section:** Leverage Ratios
**Notation:** `D/E = \frac{Total\ Liabilities}{Total\ Shareholders'\ Equity}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| TL | Total Liabilities | All current and non-current obligations | USD |
| TSE | Total Shareholders' Equity | Common stock + APIC + retained earnings + AOCI − treasury stock | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Using only long-term debt instead of total liabilities; omitting operating lease liabilities (ASC 842)
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** Know which variant the question asks for—Debt-to-Equity (total liabilities) vs. Long-Term Debt-to-Equity (LT debt only). The CMA exam may use either.

---

## FA-08: Times Interest Earned (Interest Coverage)

**Domain:** A — Financial Statement Analysis
**Section:** Leverage Ratios
**Notation:** `TIE = \frac{EBIT}{Interest\ Expense}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| EBIT | Earnings Before Interest and Taxes | Operating income | USD |
| IE | Interest Expense | Total interest incurred during the period (including amortization of bond discount/premium) | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Using net income instead of EBIT; using only cash interest paid rather than total interest expense
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** EBIT is before interest and taxes. Using EBT or net income in the numerator understates the coverage ratio.

---

## FA-09: Gross Margin Percentage

**Domain:** A — Financial Statement Analysis
**Section:** Profitability Ratios
**Notation:** `Gross\ Margin\ \% = \frac{Gross\ Profit}{Net\ Sales} \times 100`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| GP | Gross Profit | Net Sales − COGS | USD |
| NS | Net Sales | Total sales less returns, allowances, and discounts | USD |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using total sales before returns; confusing gross margin with markup (markup = GP / COGS)
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** Gross Margin % = GP / Sales. Markup % = GP / COGS. These are different metrics—candidates frequently confuse them.

---

## FA-10: Operating Margin Percentage

**Domain:** A — Financial Statement Analysis
**Section:** Profitability Ratios
**Notation:** `Operating\ Margin\ \% = \frac{Operating\ Income}{Net\ Sales} \times 100`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| OI | Operating Income | Gross Profit − Operating Expenses (SG&A, R&D, depreciation) | USD |
| NS | Net Sales | Total sales less returns, allowances, and discounts | USD |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Including non-operating items (interest, gains/losses) in operating income
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** Operating income excludes interest and taxes. Including them converts the metric to net margin, not operating margin.

---

## FA-11: Net Margin Percentage

**Domain:** A — Financial Statement Analysis
**Section:** Profitability Ratios
**Notation:** `Net\ Margin\ \% = \frac{Net\ Income}{Net\ Sales} \times 100`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| NI | Net Income | Revenue − all expenses + gains − losses − taxes | USD |
| NS | Net Sales | Total sales less returns, allowances, and discounts | USD |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Including discontinued operations that distort the sustainable margin; using net income attributable to non-controlling interests inconsistently
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** Net margin includes financing and tax strategy effects. Comparing net margins across companies with different capital structures is misleading.

---

## FA-12: Return on Assets (ROA)

**Domain:** A — Financial Statement Analysis
**Section:** Profitability Ratios
**Notation:** `ROA = \frac{Net\ Income}{Average\ Total\ Assets}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| NI | Net Income | Bottom-line earnings after all expenses and taxes | USD |
| AvgTA | Average Total Assets | (Beginning Total Assets + Ending Total Assets) / 2 | USD |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using ending total assets instead of average; using operating income instead of net income without specification
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** ROA uses average assets, not end-of-period assets, unless the question explicitly states otherwise.

---

## FA-13: Return on Equity (ROE)

**Domain:** A — Financial Statement Analysis
**Section:** Profitability Ratios
**Notation:** `ROE = \frac{Net\ Income - Preferred\ Dividends}{Average\ Common\ Shareholders'\ Equity}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| NI | Net Income | Net income for the period | USD |
| PD | Preferred Dividends | Dividends on preferred stock | USD |
| AvgCSE | Average Common Equity | (Beginning Common Equity + Ending Common Equity) / 2 | USD |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using ending equity vs. average; not subtracting preferred dividends when computing ROE for common shareholders
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** If preferred stock exists, net income must be reduced by preferred dividends for common ROE. Using total net income overstates returns to common shareholders.

---

## FA-14: DuPont Identity (ROE Decomposition)

**Domain:** A — Financial Statement Analysis
**Section:** Profitability Ratios
**Notation:** `ROE = NPM \times TAT \times EM = \frac{Net\ Income}{Sales} \times \frac{Sales}{Average\ Total\ Assets} \times \frac{Average\ Total\ Assets}{Average\ Equity}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| NPM | Net Profit Margin | Net Income / Sales | ratio |
| TAT | Total Asset Turnover | Sales / Average Total Assets | ratio |
| EM | Equity Multiplier | Average Total Assets / Average Equity | ratio |

**Tolerance:** 0.01% (ROE); individual components verified separately | **Rounding:** Two decimal places (ROE); four decimal places (components)
**Common Errors:** Using ending values instead of averages for TAT and EM; computing components with inconsistent base periods
**Authority:** DuPont Corporation (1914); financial ratio analysis theory
**Exam Trap:** The three-way DuPont reveals whether ROE is driven by profitability (NPM), efficiency (TAT), or leverage (EM). High ROE from high EM signals financial risk, not operational excellence.

---

## FA-15: Earnings Per Share (EPS)

**Domain:** A — Financial Statement Analysis
**Section:** Market Ratios
**Notation:** `Basic\ EPS = \frac{Net\ Income - Preferred\ Dividends}{Weighted\ Average\ Common\ Shares\ Outstanding}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| NI | Net Income | Net income for the period | USD |
| PD | Preferred Dividends | Dividends on cumulative preferred stock (declared or not) | USD |
| WASO | Weighted Avg Shares | Shares weighted by time outstanding | shares |

**Tolerance:** $0.01 (EPS) | **Rounding:** Two decimal places
**Common Errors:** Using ending shares instead of weighted average; not subtracting undeclared cumulative preferred dividends; not retroactively adjusting for stock splits/dividends
**Authority:** ASC 260 (Earnings Per Share)
**Exam Trap:** Stock splits and stock dividends are applied retroactively to WASO for all periods presented. Failing to adjust understates prior-period EPS.

---

## FA-16: Price-to-Earnings (P/E) Ratio

**Domain:** A — Financial Statement Analysis
**Section:** Market Ratios
**Notation:** `P/E = \frac{Market\ Price\ per\ Share}{Earnings\ per\ Share}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| MPS | Market Price per Share | Current trading price of one common share | USD |
| EPS | Earnings per Share | Trailing 12-month or forward EPS | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Using basic EPS when diluted EPS is more conservative; comparing trailing P/E of one company to forward P/E of another
**Authority:** Market-based ratio (no specific ASC); SEC Regulation G (non-GAAP)
**Exam Trap:** P/E ratios are not comparable across industries. A "low" P/E in a cyclical industry may signal peak earnings about to decline, not a bargain.

---

## FA-17: Dividend Yield

**Domain:** A — Financial Statement Analysis
**Section:** Market Ratios
**Notation:** `Dividend\ Yield = \frac{Annual\ Dividends\ per\ Share}{Market\ Price\ per\ Share} \times 100`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| DPS | Dividends per Share | Total annual dividends declared per common share | USD |
| MPS | Market Price per Share | Current trading price of one common share | USD |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using one quarter's dividend × 4 without confirming representativeness; using wrong share price date
**Authority:** Market-based ratio; SEC Regulation G
**Exam Trap:** A high dividend yield may result from a declining stock price (denominator falling), not from generous dividends.

---

## FA-18: Book Value per Share

**Domain:** A — Financial Statement Analysis
**Section:** Market Ratios
**Notation:** `BVPS = \frac{Total\ Shareholders'\ Equity - Preferred\ Equity}{Common\ Shares\ Outstanding}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| TSE | Total Shareholders' Equity | Total equity including preferred stock | USD |
| PE | Preferred Equity | Liquidation value or par value of preferred stock | USD |
| CSO | Common Shares Outstanding | Shares issued − treasury shares, at period end | shares |

**Tolerance:** $0.01 | **Rounding:** Two decimal places
**Common Errors:** Using average shares instead of period-end shares; not subtracting preferred equity
**Authority:** ASC 205-10 (Presentation of Financial Statements)
**Exam Trap:** Book value reflects historical cost, not market value. A stock trading below BVPS does not necessarily mean undervaluation—assets may be impaired.

---

## FA-19: Degree of Operating Leverage (DOL)

**Domain:** A — Financial Statement Analysis
**Section:** Leverage Ratios
**Notation:** `DOL = \frac{Contribution\ Margin}{Operating\ Income}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| CM | Contribution Margin | Sales − Total Variable Costs | USD |
| OI | Operating Income | CM − Fixed Costs | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Using gross margin instead of contribution margin; computing at the wrong sales level
**Authority:** Managerial accounting theory
**Exam Trap:** DOL is a point elasticity—it changes at different sales levels. DOL of 3 means a 1% sales increase produces a 3% operating income increase, but only at that specific sales level.

---

## FA-20: Degree of Financial Leverage (DFL)

**Domain:** A — Financial Statement Analysis
**Section:** Leverage Ratios
**Notation:** `DFL = \frac{EBIT}{EBT} = \frac{Operating\ Income}{Operating\ Income - Interest\ Expense}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| EBIT | Earnings Before Interest and Taxes | Operating income | USD |
| EBT | Earnings Before Taxes | EBIT − Interest Expense | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Not adjusting denominator for preferred dividends grossed up for taxes
**Authority:** Corporate finance theory
**Exam Trap:** If preferred stock exists, denominator must also subtract Preferred Dividends / (1 − t), reflecting the after-tax nature of preferred dividends.

---

## FA-21: Sustainable Growth Rate

**Domain:** A — Financial Statement Analysis
**Section:** Profitability Ratios
**Notation:** `SGR = ROE \times (1 - Dividend\ Payout\ Ratio)`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| ROE | Return on Equity | Net Income / Average Common Equity | ratio |
| b | Retention Ratio | 1 − (Dividends / Net Income) | ratio |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using dividend yield instead of payout ratio; assuming constant SGR when ROE fluctuates
**Authority:** Corporate finance theory (Higgins, 1977)
**Exam Trap:** SGR assumes constant capital structure, dividend policy, and asset turnover. It is a theoretical maximum, not a forecast.

---

# Domain B — Corporate Finance (9 Formulas)

---

## CB-01: Expected Return (Probability-Weighted)

**Domain:** B — Corporate Finance
**Section:** Risk and Return
**Notation:** `E(R) = \sum_{i=1}^{n} P_i \times R_i`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| P_i | Probability of State i | Likelihood of economic state i occurring (sum = 1.0) | decimal |
| R_i | Return in State i | Expected return if state i occurs | percentage |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Probabilities not summing to 1.0; using simple arithmetic mean instead of probability-weighted average
**Authority:** Portfolio theory (Markowitz, 1952)
**Exam Trap:** Expected return is a probability-weighted average, not a simple arithmetic mean. Candidates frequently compute the simple mean of returns without applying probabilities.

---

## CB-02: Standard Deviation of Returns

**Domain:** B — Corporate Finance
**Section:** Risk and Return
**Notation:** `\sigma = \sqrt{\sum_{i=1}^{n} P_i \times (R_i - E(R))^2}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| σ | Standard Deviation | Measure of total risk | percentage |
| P_i | Probability of State i | Likelihood of state i | decimal |
| R_i | Return in State i | Return if state i occurs | percentage |
| E(R) | Expected Return | Probability-weighted average return | percentage |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Computing population standard deviation instead of applying probability weights; forgetting the square root
**Authority:** Portfolio theory (Markowitz, 1952)
**Exam Trap:** Standard deviation measures total risk (systematic + unsystematic). In a diversified portfolio, only systematic risk (beta) matters.

---

## CB-03: Coefficient of Variation

**Domain:** B — Corporate Finance
**Section:** Risk and Return
**Notation:** `CV = \frac{\sigma}{E(R)}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| σ | Standard Deviation | Absolute measure of dispersion | percentage |
| E(R) | Expected Return | Mean expected return | percentage |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Reversing numerator and denominator; using variance instead of standard deviation
**Authority:** Portfolio theory
**Exam Trap:** CV measures risk per unit of return—the correct metric for comparing investments with different expected returns. Standard deviation alone does not account for return magnitude.

---

## CB-04: Capital Asset Pricing Model (CAPM)

**Domain:** B — Corporate Finance
**Section:** Risk and Return
**Notation:** `R_e = R_f + \beta (R_m - R_f)`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| R_e | Required Return on Equity | Cost of equity capital | percentage |
| R_f | Risk-Free Rate | Return on risk-free asset (typically 10-year U.S. Treasury) | percentage |
| β | Beta | Systematic risk relative to market (β_market = 1) | dimensionless |
| R_m | Market Return | Expected return on the market portfolio | percentage |
| R_m − R_f | Market Risk Premium | Excess return for bearing market risk | percentage |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using historical market return instead of expected; using wrong risk-free rate maturity; computing beta from non-comparable index
**Authority:** CAPM (Sharpe, 1964; Lintner, 1965)
**Exam Trap:** CAPM gives the required return (cost of equity), not the expected return of the stock. Also, using historical beta without adjustment for mean reversion is a known limitation.

---

## CB-05: Weighted Average Cost of Capital (WACC)

**Domain:** B — Corporate Finance
**Section:** Cost of Capital
**Notation:** `WACC = \frac{E}{V} \times R_e + \frac{P}{V} \times R_p + \frac{D}{V} \times R_d \times (1 - t)`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| E | Market Value of Equity | Shares outstanding × share price | USD |
| P | Market Value of Preferred Stock | Preferred shares × price per share | USD |
| D | Market Value of Debt | Market value of interest-bearing debt | USD |
| V | Total Value | E + P + D | USD |
| R_e | Cost of Equity | Required return (CAPM or DDM) | percentage |
| R_p | Cost of Preferred Stock | D_p / P_p | percentage |
| R_d | Cost of Debt (pre-tax) | Yield to maturity on debt | percentage |
| t | Marginal Tax Rate | Corporate income tax rate | decimal |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using pre-tax cost of debt (must be after-tax); omitting preferred stock; using book values instead of market values for weights
**Authority:** Corporate finance theory (Brealey-Myers); Modigliani-Miller
**Exam Trap:** Three classic WACC errors: (1) Pre-tax cost of debt—must multiply by (1 − t). (2) Omitting preferred stock component entirely. (3) Book value weights instead of market value weights.

---

## CB-06: Cost of Preferred Stock

**Domain:** B — Corporate Finance
**Section:** Cost of Capital
**Notation:** `R_p = \frac{D_p}{P_p}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| D_p | Annual Preferred Dividend | Stated dollar dividend per preferred share | USD |
| P_p | Net Proceeds per Preferred Share | Market price less flotation costs | USD |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Subtracting flotation costs from dividend instead of from price; using par value instead of market price
**Authority:** Corporate finance theory
**Exam Trap:** Preferred dividends are not tax-deductible. Unlike debt, there is no (1 − t) adjustment for preferred stock in WACC.

---

## CB-07: Cost of Debt (After-Tax)

**Domain:** B — Corporate Finance
**Section:** Cost of Capital
**Notation:** `After\text{-}Tax\ Cost\ of\ Debt = R_d \times (1 - t)`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| R_d | Pre-Tax Cost of Debt | Yield to maturity on the firm's debt | percentage |
| t | Marginal Tax Rate | Corporate income tax rate | decimal |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using coupon rate instead of YTM; using average tax rate instead of marginal rate; forgetting (1 − t)
**Authority:** Corporate finance theory; IRC §163 (interest deductibility)
**Exam Trap:** The pre-tax cost of debt for WACC is YTM, not the coupon rate. Using the coupon rate ignores whether the bond trades at a premium or discount.

---

## CB-08: Economic Order Quantity (EOQ)

**Domain:** B — Corporate Finance
**Section:** Working Capital Management
**Notation:** `EOQ = \sqrt{\frac{2DS}{H}}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| D | Annual Demand | Total units required per year | units |
| S | Ordering Cost | Fixed cost per order placed | USD per order |
| H | Holding Cost | Annual carrying cost per unit (storage, insurance, obsolescence, opportunity cost) | USD per unit per year |

**Tolerance:** Nearest whole unit | **Rounding:** Nearest whole unit
**Common Errors:** Using demand in dollars vs. units inconsistently; double-counting or omitting opportunity cost in H
**Authority:** Inventory management theory (Harris, 1913; Wilson, 1934)
**Exam Trap:** D and H must be in the same time units (both annual). If monthly demand is given, multiply by 12 first. If holding cost is a percentage, multiply by unit cost to get H in dollars.

---

## CB-09: Forward/FX Premium or Discount

**Domain:** B — Corporate Finance
**Section:** International Finance
**Notation:** `Forward\ Premium/Discount\ (\%) = \frac{Forward\ Rate - Spot\ Rate}{Spot\ Rate} \times \frac{360}{Days} \times 100`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| F | Forward Rate | Agreed-upon exchange rate for future settlement | FX quote |
| S | Spot Rate | Current exchange rate for immediate delivery | FX quote |
| Days | Forward Period | Number of days to forward contract maturity | days |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Reversing numerator (S − F) flipping the sign; using 365 days instead of 360 (FX convention)
**Authority:** International finance theory; interest rate parity
**Exam Trap:** FX markets use a 360-day year. A positive result means the foreign currency trades at a forward premium (strengthening). Direction matters for interpretation.

---

# Domain C — Decision Analysis (11 Formulas)

---

## DA-01: Breakeven Point (Units)

**Domain:** C — Decision Analysis
**Section:** Cost-Volume-Profit Analysis
**Notation:** `BE_{units} = \frac{Fixed\ Costs}{CM\ per\ Unit}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| FC | Fixed Costs | Total fixed costs (do not vary with output) | USD |
| CM/unit | Contribution Margin per Unit | Selling Price − Variable Cost per Unit | USD per unit |

**Tolerance:** Nearest whole unit | **Rounding:** Nearest whole unit
**Common Errors:** Using selling price instead of CM; including variable costs in the numerator; not separating mixed costs
**Authority:** Managerial accounting theory; CVP analysis
**Exam Trap:** Semi-variable (mixed) costs must be separated into fixed and variable components before computing breakeven.

---

## DA-02: Breakeven Point (Dollars)

**Domain:** C — Decision Analysis
**Section:** Cost-Volume-Profit Analysis
**Notation:** `BE_{\$} = \frac{Fixed\ Costs}{CM\ Ratio}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| FC | Fixed Costs | Total fixed costs | USD |
| CM Ratio | Contribution Margin Ratio | CM per Unit / Selling Price, or Total CM / Total Sales | decimal |

**Tolerance:** $1 | **Rounding:** Nearest whole dollar
**Common Errors:** Using markup percentage instead of CM ratio; using gross margin ratio instead of CM ratio
**Authority:** Managerial accounting theory; CVP analysis
**Exam Trap:** CM Ratio = CM / Sales. Gross Margin Ratio = Gross Profit / Sales. These are different—CM excludes all variable costs (including variable SG&A), not just COGS.

---

## DA-03: Target Profit (Units)

**Domain:** C — Decision Analysis
**Section:** Cost-Volume-Profit Analysis
**Notation:** `Units_{target} = \frac{Fixed\ Costs + Target\ Operating\ Profit}{CM\ per\ Unit}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| FC | Fixed Costs | Total fixed costs | USD |
| TP | Target Operating Profit | Desired operating income (before tax) | USD |
| CM/unit | Contribution Margin per Unit | Price − Variable Cost per Unit | USD per unit |

**Tolerance:** Nearest whole unit | **Rounding:** Nearest whole unit
**Common Errors:** Using after-tax target profit without grossing up for taxes; forgetting to add fixed costs in numerator
**Authority:** Managerial accounting theory; CVP analysis
**Exam Trap:** If the question gives target net income (after-tax), convert: Target Pre-Tax = After-Tax Profit / (1 − t). Then add to fixed costs.

---

## DA-04: Margin of Safety

**Domain:** C — Decision Analysis
**Section:** Cost-Volume-Profit Analysis
**Notation:** `MOS\ (\%) = \frac{Actual\ Sales - Breakeven\ Sales}{Actual\ Sales} \times 100`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| AS | Actual Sales | Current or budgeted sales | USD or units |
| BES | Breakeven Sales | Sales at breakeven point | USD or units |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Reversing numerator (BE − Actual) giving negative MOS; mixing dollar and unit measures
**Authority:** Managerial accounting theory; CVP analysis
**Exam Trap:** Margin of safety answers "How much can sales decline before the company incurs a loss?" Always expressed as a percentage of actual sales.

---

## DA-05: Degree of Operating Leverage (CVP Form)

**Domain:** C — Decision Analysis
**Section:** Cost-Volume-Profit Analysis
**Notation:** `DOL = \frac{Contribution\ Margin}{Operating\ Income}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| CM | Contribution Margin | Sales − Total Variable Costs | USD |
| OI | Operating Income | CM − Fixed Costs | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Using gross margin instead of CM; computing at the wrong activity level
**Authority:** Managerial accounting theory
**Exam Trap:** DOL is highest near the breakeven point (operating income → 0 in denominator). Very high DOL signals both high upside and high downside risk.

---

## DA-06: Weighted Average Contribution Margin

**Domain:** C — Decision Analysis
**Section:** Cost-Volume-Profit Analysis (Multi-Product)
**Notation:** `WACM = \sum_{i=1}^{n} (Sales\ Mix_i\ (\%) \times CM_i)`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| Sales Mix_i | Sales Mix % of Product i | Proportion of total units from product i (must sum to 1.0) | decimal |
| CM_i | CM per Unit of Product i | Price_i − Variable Cost_i | USD per unit |

**Tolerance:** $0.01 (CM per unit) | **Rounding:** Two decimal places (WACM); four decimal places (mix %)
**Common Errors:** Using revenue mix instead of unit mix; mix percentages not summing to 1.0
**Authority:** Managerial accounting theory; multi-product CVP analysis
**Exam Trap:** Multi-product breakeven yields total units, not per-product units. After computing total breakeven units, multiply by sales mix % to get per-product units.

---

## DA-07: Shut-Down Point

**Domain:** C — Decision Analysis
**Section:** Marginal Analysis
**Notation:** `Shut\ Down\ if:\ Price < Minimum\ AVC`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| P | Price | Selling price per unit | USD per unit |
| AVC_min | Minimum Average Variable Cost | Lowest point on the AVC curve | USD per unit |

**Tolerance:** $0.01 | **Rounding:** Two decimal places
**Common Errors:** Comparing price to average total cost (ATC) instead of AVC; shutting down when P between AVC and ATC (should continue short-run)
**Authority:** Managerial economics; short-run production theory
**Exam Trap:** In the short run, continue if P ≥ AVC, even if P < ATC. Continuing covers variable costs and contributes to fixed costs. Shutting down when P ≥ AVC increases losses.

---

## DA-08: Sell-or-Process-Further Decision

**Domain:** C — Decision Analysis
**Section:** Marginal Analysis
**Notation:** `Process\ Further\ if:\ Incremental\ Revenue - Incremental\ Cost > 0`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| IR | Incremental Revenue | Revenue after processing − Revenue at split-off | USD |
| IC | Incremental Cost | Additional processing costs beyond split-off | USD |

**Tolerance:** $1 | **Rounding:** Nearest whole dollar
**Common Errors:** Including allocated joint costs (sunk at split-off—irrelevant); comparing total profitability instead of incremental
**Authority:** IMA SMA on relevant costing; joint product decision theory
**Exam Trap:** Joint costs allocated to products are irrelevant—they are sunk at the split-off point. Only incremental revenues and costs beyond split-off matter.

---

## DA-09: Transfer Price (Minimum)

**Domain:** C — Decision Analysis
**Section:** Transfer Pricing
**Notation:** `Transfer\ Price_{min} = Variable\ Cost\ per\ Unit + Opportunity\ Cost\ per\ Unit`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| VC | Variable Cost | Incremental cost of producing one unit | USD per unit |
| OC | Opportunity Cost | CM foregone on external sales sacrificed (only when at full capacity) | USD per unit |

**Tolerance:** $0.01 | **Rounding:** Two decimal places
**Common Errors:** Forgetting opportunity cost when at full capacity; using full absorption cost instead of variable cost
**Authority:** IMA SMA on relevant costing; transfer pricing theory
**Exam Trap:** Idle capacity → OC = $0 → minimum TP = VC. Full capacity → OC = CM lost from displaced external sales. The distinction is critical on the CMA exam.

---

## DA-10: Expected Value

**Domain:** C — Decision Analysis
**Section:** Decision Modeling Under Uncertainty
**Notation:** `EV = \sum_{i=1}^{n} P_i \times Outcome_i`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| P_i | Probability of Outcome i | Likelihood of outcome i (must sum to 1.0) | decimal |
| Outcome_i | Payoff in Outcome i | Monetary or non-monetary result | varies (typically USD) |

**Tolerance:** $1 (dollar outcomes) | **Rounding:** Nearest whole dollar
**Common Errors:** Probabilities not summing to 1.0; confusing expected value with most likely outcome
**Authority:** Decision theory (Raiffa, 1968)
**Exam Trap:** EV is a long-run average, not a prediction of a single outcome. Higher EV does not guarantee a better result in any given instance.

---

## DA-11: Value of Perfect Information

**Domain:** C — Decision Analysis
**Section:** Decision Modeling Under Uncertainty
**Notation:** `EVPI = EV_{with\ perfect\ information} - EV_{without\ perfect\ information}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| EV_w_PI | EV with Perfect Information | Weighted average of best outcomes under each state | USD |
| EV_wo_PI | EV without Perfect Information | EV of the optimal decision under uncertainty | USD |

**Tolerance:** $1 | **Rounding:** Nearest whole dollar
**Common Errors:** Computing EV with PI by taking the simple best outcome instead of probability-weighting; confusing EVPI with maximum possible payoff
**Authority:** Decision theory (Raiffa, 1968)
**Exam Trap:** EVPI is the maximum a decision-maker should pay for perfect information. If market research costs more than EVPI, don't buy it—regardless of accuracy.

---

# Domain D — Risk Management (3 Formulas)

---

## RM-01: Expected Loss

**Domain:** D — Risk Management
**Section:** Risk Assessment
**Notation:** `Expected\ Loss = Probability\ of\ Loss \times Impact\ of\ Loss`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| P | Probability of Loss | Likelihood the risk event occurs | decimal |
| I | Impact | Financial magnitude if the loss occurs | USD |

**Tolerance:** $1 | **Rounding:** Nearest whole dollar
**Common Errors:** Using ordinal labels ("likely") without converting to numeric; using worst-case impact instead of expected
**Authority:** COSO ERM (2017) — Component 3: Performance, Principle 10 (Identifies Risk)
**Exam Trap:** Expected loss is a probability-weighted average, not the worst-case scenario. Risk response should consider both expected loss and tail risk.

---

## RM-02: Risk Score

**Domain:** D — Risk Management
**Section:** Risk Assessment
**Notation:** `Risk\ Score = Likelihood \times Severity`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| L | Likelihood | Probability or frequency of occurrence (ordinal scale, e.g., 1–5) | ordinal |
| S | Severity | Magnitude of impact (ordinal scale, e.g., 1–5) | ordinal |

**Tolerance:** Exact (ordinal integer) | **Rounding:** Nearest integer
**Common Errors:** Using different scales for L and S (e.g., 1–3 for L, 1–5 for S); adding instead of multiplying
**Authority:** COSO ERM (2017) — Component 3: Performance, Principle 10 (Identifies Risk)
**Exam Trap:** Risk heat maps multiply likelihood × severity, not add them. A risk that is almost certain (5) with moderate impact (3) = 15, not 8. Adding understates high-likelihood, high-severity risks.

---

## RM-03: Residual Risk

**Domain:** D — Risk Management
**Section:** Risk Response
**Notation:** `Residual\ Risk = Inherent\ Risk - Controls\ Mitigation`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| IR | Inherent Risk | Risk level before any controls or mitigation | ordinal |
| CM | Controls Mitigation | Risk reduction from internal controls | ordinal |

**Tolerance:** Same scale as inputs | **Rounding:** Nearest integer
**Common Errors:** Reversing direction (Controls − Inherent); assuming residual risk reaches zero
**Authority:** COSO ERM (2017) — Component 4: Review & Revision, Principle 15 (Assesses Substantial Change)
**Exam Trap:** Residual risk can never be zero—no control system is perfect. The CMA exam expects candidates to recognize that some residual risk always remains.

---

# Domain E — Investment Decisions (8 Formulas)

---

## ID-01: Net Present Value (NPV)

**Domain:** E — Investment Decisions
**Section:** Capital Budgeting
**Notation:** `NPV = \sum_{t=1}^{n} \frac{CF_t}{(1 + r)^t} - I_0`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| CF_t | Cash Flow in Period t | Expected net after-tax cash inflow in period t | USD |
| r | Discount Rate | Required rate of return or cost of capital | decimal |
| t | Time Period | Year index (1, 2, ..., n) | years |
| n | Project Life | Number of periods | years |
| I_0 | Initial Investment | Cash outlay at t = 0 | USD |

**Tolerance:** $5 (discounting precision) | **Rounding:** Nearest whole dollar; carry 4 decimal places for discount factors
**Common Errors:** Wrong discount rate (real vs. nominal, pre-tax vs. after-tax); omitting working capital recovery; including sunk costs; double-counting inflation
**Authority:** Capital budgeting theory (Fisher, 1930); NPV decision rule
**Exam Trap:** NPV uses cash flows, not accounting income. Depreciation is added back via the tax shield. Discount rate must match cash flow type—nominal cash flows need nominal rates.

---

## ID-02: Profitability Index (PI)

**Domain:** E — Investment Decisions
**Section:** Capital Budgeting
**Notation:** `PI = \frac{PV\ of\ Future\ Cash\ Flows}{Initial\ Investment}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| PV_CF | PV of Future Cash Flows | Sum of discounted cash inflows (excluding I_0) | USD |
| I_0 | Initial Investment | Cash outlay at t = 0 | USD |

**Tolerance:** 0.01 (ratio) | **Rounding:** Two decimal places
**Common Errors:** Including I_0 in numerator (gives NPV/I_0 + 1, not PI); using undiscounted cash flows
**Authority:** Capital budgeting theory
**Exam Trap:** PI is NPV-based (uses discounted cash flows), not simple benefit-cost ratio. PI > 1 means NPV > 0. It is the correct ranking metric under capital rationing.

---

## ID-03: Payback Period

**Domain:** E — Investment Decisions
**Section:** Capital Budgeting
**Notation:** `Payback = \frac{Initial\ Investment}{Annual\ Cash\ Flow}\ \text{(uniform CF)};\ \text{otherwise cumulative}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| I_0 | Initial Investment | Cash outlay at t = 0 | USD |
| ACF | Annual Cash Flow | Uniform annual after-tax cash inflow | USD |

**Tolerance:** 0.1 years | **Rounding:** One decimal place
**Common Errors:** Using accounting income instead of cash flows; not using cumulative method for non-uniform CFs
**Authority:** Capital budgeting theory
**Exam Trap:** Payback ignores the time value of money and cash flows beyond the payback period. It is a liquidity/screening tool, not a profitability measure.

---

## ID-04: Discounted Payback Period

**Domain:** E — Investment Decisions
**Section:** Capital Budgeting
**Notation:** `DPP = \text{time until } \sum_{t=1}^{DPP} \frac{CF_t}{(1 + r)^t} \geq I_0`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| I_0 | Initial Investment | Cash outlay at t = 0 | USD |
| DCF_t | Discounted Cash Flow in t | CF_t / (1 + r)^t | USD |

**Tolerance:** 0.1 years | **Rounding:** One decimal place
**Common Errors:** Using undiscounted cash flows (defeats the purpose); stopping at the wrong year
**Authority:** Capital budgeting theory
**Exam Trap:** Discounted payback corrects for time value of money but still ignores post-cutoff cash flows. It is always longer than simple payback.

---

## ID-05: Equivalent Annual Annuity (EAA)

**Domain:** E — Investment Decisions
**Section:** Capital Budgeting (Unequal Lives)
**Notation:** `EAA = \frac{NPV}{PVIFA(r, n)} = \frac{NPV}{\frac{1 - (1 + r)^{-n}}{r}}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| NPV | Net Present Value | Sum of discounted net cash flows | USD |
| PVIFA | PV Interest Factor of Annuity | [1 − (1 + r)^(−n)] / r | factor |
| r | Discount Rate | Required rate of return | decimal |
| n | Project Life | Number of periods | years |

**Tolerance:** $5 | **Rounding:** Nearest whole dollar
**Common Errors:** Comparing NPVs directly for unequal-life projects; using wrong annuity factor
**Authority:** Capital budgeting theory
**Exam Trap:** When comparing mutually exclusive projects with unequal lives, NPV alone is insufficient. EAA converts lump-sum NPV to an annualized equivalent for apples-to-apples comparison.

---

## ID-06: After-Tax Cash Flow

**Domain:** E — Investment Decisions
**Section:** Capital Budgeting
**Notation:** `ATCF = (Revenue - Cash\ Operating\ Expenses) \times (1 - t) + (Depreciation \times t)`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| Rev | Revenue | Incremental revenue from the project | USD |
| COE | Cash Operating Expenses | Variable and fixed cash costs (excludes depreciation) | USD |
| t | Marginal Tax Rate | Corporate income tax rate | decimal |
| Depr | Depreciation | Annual depreciation expense (non-cash) | USD |

**Tolerance:** $1 | **Rounding:** Nearest whole dollar
**Common Errors:** Omitting the depreciation tax shield (Depr × t); treating depreciation as a cash outflow; using average tax rate instead of marginal
**Authority:** Capital budgeting theory; IRC §167 (depreciation); IRC §168 (MACRS)
**Exam Trap:** Depreciation is non-cash—it does NOT directly reduce cash flow. It reduces taxable income, creating a tax shield. Only the tax shield (Depreciation × t) is added back.

---

## ID-07: MACRS Depreciation

**Domain:** E — Investment Decisions
**Section:** Capital Budgeting
**Notation:** `MACRS\ Depreciation_t = Cost \times MACRS\ Rate_t\ \text{(IRS Pub 946 tables)}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| Cost | Asset Cost | Purchase price (MACRS ignores salvage value) | USD |
| Rate_t | MACRS Rate for Year t | Statutory percentage from IRS tables (3-, 5-, 7-year classes) | decimal |

**Tolerance:** $1 | **Rounding:** Nearest whole dollar
**Common Errors:** Subtracting salvage before applying MACRS rate (MACRS ignores salvage); wrong recovery period; wrong half-year convention application
**Authority:** MACRS — IRS Publication 946; IRC §168
**Exam Trap:** MACRS ignores salvage value—depreciable basis = full cost. Half-year convention: only 50% of Year 1 rate in Year 1, remainder in Year n+1. A 3-year property is depreciated over 4 tax years.

---

## ID-08: Accounting Rate of Return (ARR)

**Domain:** E — Investment Decisions
**Section:** Capital Budgeting
**Notation:** `ARR = \frac{Average\ Annual\ Net\ Income}{Average\ Investment}`

| Variable | Name | Description | Units |
|----------|------|-------------|-------|
| AANI | Average Annual Net Income | Average accrual-basis income over project life (after depreciation and tax) | USD |
| AI | Average Investment | (Initial Investment + Salvage Value) / 2 | USD |

**Tolerance:** 0.01% | **Rounding:** Two decimal places
**Common Errors:** Using cash flows instead of accounting net income; using initial investment instead of average investment
**Authority:** Capital budgeting theory
**Exam Trap:** ARR is the only capital budgeting method using accounting income rather than cash flows. It ignores the time value of money entirely.

---

# Domain F — Professional Ethics (0 Formulas)

**Domain F** tests the IMA Statement of Ethical Professional Practice (4 standards: Competence, Confidentiality, Integrity, Credibility), the IMA ethical decision-making model, SOX 2002, FCPA, corporate governance, and sustainability reporting. All items are conceptual—no quantitative formulas are tested.

---

# Formula Count Summary

| Domain | Name | Formula Count |
|--------|------|:------------:|
| A | Financial Statement Analysis | 21 |
| B | Corporate Finance | 9 |
| C | Decision Analysis | 11 |
| D | Risk Management | 3 |
| E | Investment Decisions | 8 |
| F | Professional Ethics | 0 |
| **Total** | | **52** |

---

# Numerical Validation Rules (G3 Gate)

Every calculation question must pass:

1. **Formula Selection:** Correct formula from this registry
2. **Input Traceability:** Every input traces to the question stem or exhibit
3. **Unit Consistency:** All units consistent before substitution
4. **Tolerance:** Result within accepted tolerance per §D.4
5. **Rounding:** Final answer rounded per formula-specific rounding rule
6. **Sign Convention:** Outflow = negative, inflow = positive (NPV/CF context)

---

# Cross-Reference Verification

| Source | Domain A | Domain B | Domain C | Domain D | Domain E | Domain F | Total |
|--------|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-----:|
| P2002_BLUEPRINT_EXTRACTION.json | 21 | 9 | 11 | 3 | 8 | 0 | **52** |
| FORMULA_MASTER_P2.md (this file) | 21 | 9 | 11 | 3 | 8 | 0 | **52** |
| P2005_FORMULA_MASTER.json | 21 | 9 | 11 | 3 | 8 | 0 | **52** |

**Verification status:** ALL MATCH — 52 formulas across all three sources. ✓

---

# Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-29 | P2-005 Formula Master Subagent | Initial version. 52 formulas across 6 domains extracted from P2002_BLUEPRINT_EXTRACTION.json and P2002_CERTIFICATION_STANDARD.md §D.4/§E.1. Cross-referenced against blueprint targets. |
