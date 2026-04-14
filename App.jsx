import React from "react";

export default function PKRSavingsCalculator() {
  const [grossSalary, setGrossSalary] = React.useState(0);
  const [hasCar, setHasCar] = React.useState(false);
  const [kids, setKids] = React.useState(0);
  const [kidAges, setKidAges] = React.useState([]);
  const [rent, setRent] = React.useState(0);

  const CAR_FUEL = 30000;
  const KITCHEN_UTILITIES = 60000;
  const RECREATION = 5000;
  const HEALTH = 3000;
  const MISC = 5000;

  const calculateAnnualTax = (annualIncome) => {
    if (annualIncome <= 600000) return 0;
    if (annualIncome <= 1200000) return (annualIncome - 600000) * 0.05;
    if (annualIncome <= 2200000) return 30000 + (annualIncome - 1200000) * 0.125;
    if (annualIncome <= 3200000) return 155000 + (annualIncome - 2200000) * 0.175;
    if (annualIncome <= 4200000) return 330000 + (annualIncome - 3200000) * 0.225;
    return 555000 + (annualIncome - 4200000) * 0.275;
  };

  const getKidMonthlyCost = (age) => {
    const numAge = Number(age);
    if (!Number.isFinite(numAge) || numAge < 0) return 0;
    if (numAge <= 2) return 10000;
    if (numAge <= 15) return 20000;
    if (numAge <= 25) return 30000;
    return 0;
  };

  const handleKidsChange = (value) => {
    const count = Math.max(0, Number(value) || 0);
    setKids(count);
    setKidAges((prev) => Array.from({ length: count }, (_, index) => prev[index] ?? ""));
  };

  const handleKidAgeChange = (index, value) => {
    setKidAges((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const annualIncome = Number(grossSalary || 0) * 12;
  const annualTax = calculateAnnualTax(annualIncome);
  const monthlyTax = annualTax / 12;
  const carDeduction = hasCar ? CAR_FUEL : 0;
  const kidsDeduction = kidAges.reduce((sum, age) => sum + getKidMonthlyCost(age), 0);

  const totalDeductions =
    monthlyTax +
    carDeduction +
    kidsDeduction +
    KITCHEN_UTILITIES +
    Number(rent || 0) +
    RECREATION +
    HEALTH +
    MISC;

  const savings = Number(grossSalary || 0) - totalDeductions;
  const effectiveTaxRate = annualIncome > 0 ? (annualTax / annualIncome) * 100 : 0;

  const formatPKR = (value) =>
    new Intl.NumberFormat("en-PK", {
      maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? value : 0);

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #ecfeff 100%)",
    padding: "32px 16px",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#0f172a",
  };

  const containerStyle = {
    maxWidth: 1120,
    margin: "0 auto",
  };

  const heroStyle = {
    textAlign: "center",
    marginBottom: 24,
  };

  const titleStyle = {
    fontSize: "clamp(2rem, 4vw, 3.2rem)",
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.03em",
  };

  const subtitleStyle = {
    margin: "10px auto 0",
    maxWidth: 760,
    fontSize: 17,
    lineHeight: 1.6,
    color: "#475569",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 24,
    alignItems: "start",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.88)",
    border: "1px solid rgba(148,163,184,0.18)",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
    backdropFilter: "blur(8px)",
  };

  const sectionTitleStyle = {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
  };

  const sectionSubStyle = {
    marginTop: 8,
    color: "#64748b",
    fontSize: 15,
    lineHeight: 1.6,
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: 14,
    padding: "14px 16px",
    fontSize: 16,
    background: "#fff",
    outline: "none",
  };

  const buttonRowStyle = {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  };

  const getToggleStyle = (active) => ({
    flex: 1,
    minWidth: 100,
    borderRadius: 14,
    border: active ? "1px solid #0f172a" : "1px solid #cbd5e1",
    background: active ? "#0f172a" : "#fff",
    color: active ? "#fff" : "#0f172a",
    padding: "12px 16px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  });

  const breakdownRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "14px 16px",
    borderRadius: 16,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontSize: 15,
  };

  const savingsCardStyle = {
    marginTop: 20,
    borderRadius: 22,
    padding: 24,
    background: savings >= 0
      ? "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)"
      : "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    color: "#fff",
    boxShadow: "0 20px 40px rgba(15,23,42,0.18)",
  };

  const summaryLabelStyle = {
    fontSize: 14,
    opacity: 0.85,
    margin: 0,
  };

  const summaryValueStyle = {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    margin: "10px 0 8px",
    letterSpacing: "-0.03em",
  };

  const chipStyle = {
    display: "inline-block",
    marginTop: 12,
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.14)",
    fontSize: 13,
  };

  const formGroupStyle = { marginTop: 18 };
  const agesWrapStyle = { marginTop: 14, display: "grid", gap: 12 };
  const dividerTitleStyle = { margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: "#0f172a" };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={heroStyle}>
          <h1 style={titleStyle}>Average Monthly Savings for Pakistani Salary Earners</h1>
          <p style={subtitleStyle}>
            Calculate your estimated monthly savings after tax, rent, fuel, kids, utilities,
            health, recreation, and miscellaneous family expenses.
          </p>
        </div>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Your Monthly Inputs</h2>
            <p style={sectionSubStyle}>Fill in the details below. The savings amount updates instantly.</p>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Your per month gross salary (PKR)</label>
              <input
                type="number"
                min="0"
                value={grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                style={inputStyle}
                placeholder="e.g. 300000"
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Do you have a car?</label>
              <div style={buttonRowStyle}>
                <button type="button" onClick={() => setHasCar(true)} style={getToggleStyle(hasCar)}>
                  Yes
                </button>
                <button type="button" onClick={() => setHasCar(false)} style={getToggleStyle(!hasCar)}>
                  No
                </button>
              </div>
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>How many kids do you have?</label>
              <input
                type="number"
                min="0"
                value={kids}
                onChange={(e) => handleKidsChange(e.target.value)}
                style={inputStyle}
                placeholder="e.g. 2"
              />
            </div>

            {kids > 0 && (
              <div style={formGroupStyle}>
                <div style={dividerTitleStyle}>Age of each kid</div>
                <div style={agesWrapStyle}>
                  {Array.from({ length: kids }).map((_, index) => (
                    <div key={index}>
                      <label style={labelStyle}>Kid {index + 1} age</label>
                      <input
                        type="number"
                        min="0"
                        value={kidAges[index] ?? ""}
                        onChange={(e) => handleKidAgeChange(index, e.target.value)}
                        style={inputStyle}
                        placeholder={`Enter age for kid ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={formGroupStyle}>
              <label style={labelStyle}>Amount of rent you pay (PKR)</label>
              <input
                type="number"
                min="0"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                style={inputStyle}
                placeholder="e.g. 45000"
              />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Monthly Breakdown</h2>
            <p style={sectionSubStyle}>A simple view of each monthly deduction in PKR.</p>

            <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
              <div style={breakdownRowStyle}><span>Gross salary</span><strong>Rs {formatPKR(grossSalary)}</strong></div>
              <div style={breakdownRowStyle}><span>Monthly tax (slab based)</span><strong>-Rs {formatPKR(monthlyTax)}</strong></div>
              <div style={breakdownRowStyle}><span>Fuel charges</span><strong>-Rs {formatPKR(carDeduction)}</strong></div>
              <div style={breakdownRowStyle}><span>Kids cost</span><strong>-Rs {formatPKR(kidsDeduction)}</strong></div>
              <div style={breakdownRowStyle}><span>Kitchen + utilities</span><strong>-Rs {formatPKR(KITCHEN_UTILITIES)}</strong></div>
              <div style={breakdownRowStyle}><span>Rent</span><strong>-Rs {formatPKR(rent)}</strong></div>
              <div style={breakdownRowStyle}><span>Recreational / family</span><strong>-Rs {formatPKR(RECREATION)}</strong></div>
              <div style={breakdownRowStyle}><span>Health deduction</span><strong>-Rs {formatPKR(HEALTH)}</strong></div>
              <div style={breakdownRowStyle}><span>Miscellaneous</span><strong>-Rs {formatPKR(MISC)}</strong></div>
            </div>

            {kids > 0 && (
              <div style={{ marginTop: 20, padding: 18, borderRadius: 18, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 16 }}>Kids monthly deduction detail</h3>
                <div style={{ display: "grid", gap: 10 }}>
                  {Array.from({ length: kids }).map((_, index) => {
                    const age = kidAges[index];
                    const cost = getKidMonthlyCost(age);
                    return (
                      <div key={index} style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 14, color: "#334155" }}>
                        <span>Kid {index + 1} ({age === "" ? "age not entered" : `${age} years`})</span>
                        <strong>Rs {formatPKR(cost)}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={savingsCardStyle}>
              <p style={summaryLabelStyle}>Estimated monthly savings</p>
              <div style={summaryValueStyle}>{savings >= 0 ? `Rs ${formatPKR(savings)}` : `-Rs ${formatPKR(Math.abs(savings))}`}</div>
              <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>
                Total deductions: Rs {formatPKR(totalDeductions)}
              </p>
              <div style={chipStyle}>Effective annual tax rate: {effectiveTaxRate.toFixed(2)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
