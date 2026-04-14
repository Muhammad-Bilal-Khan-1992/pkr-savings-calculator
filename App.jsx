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
    if (annualIncome <= 1200000) {
      return (annualIncome - 600000) * 0.05;
    }
    if (annualIncome <= 2200000) {
      return 30000 + (annualIncome - 1200000) * 0.125;
    }
    if (annualIncome <= 3200000) {
      return 155000 + (annualIncome - 2200000) * 0.175;
    }
    if (annualIncome <= 4200000) {
      return 330000 + (annualIncome - 3200000) * 0.225;
    }
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
    setKidAges((prev) => {
      const next = Array.from({ length: count }, (_, index) => prev[index] ?? "");
      return next;
    });
  };

  const handleKidAgeChange = (index, value) => {
    setKidAges((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const annualIncome = grossSalary * 12;
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
    MISC +
    HEALTH;

  const savings = grossSalary - totalDeductions;
  const effectiveTaxRate = annualIncome > 0 ? (annualTax / annualIncome) * 100 : 0;

  const formatPKR = (value) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? value : 0);

  const inputClass =
    "w-full rounded-2xl border border-slate-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-slate-400";

  const cardClass = "rounded-2xl bg-white shadow-sm border border-slate-200 p-6";

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        <div className={cardClass}>
          <h1 className="text-3xl font-bold text-slate-900">PKR Savings Calculator</h1>
          <p className="mt-2 text-slate-600">
            Enter your monthly details to calculate your estimated monthly savings after deductions.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Your per month gross salary (PKR)
              </label>
              <input
                type="number"
                min="0"
                value={grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                className={inputClass}
                placeholder="e.g. 300000"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Do you have a car?
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setHasCar(true)}
                  className={`rounded-2xl px-4 py-3 font-medium transition ${
                    hasCar
                      ? "bg-slate-900 text-white"
                      : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHasCar(false)}
                  className={`rounded-2xl px-4 py-3 font-medium transition ${
                    !hasCar
                      ? "bg-slate-900 text-white"
                      : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                How many kids do you have?
              </label>
              <input
                type="number"
                min="0"
                value={kids}
                onChange={(e) => handleKidsChange(e.target.value)}
                className={inputClass}
                placeholder="e.g. 2"
              />
            </div>

            {kids > 0 && (
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Age of each kid
                </label>
                <div className="space-y-3">
                  {Array.from({ length: kids }).map((_, index) => (
                    <div key={index}>
                      <label className="mb-2 block text-sm text-slate-600">
                        Kid {index + 1} age
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={kidAges[index] ?? ""}
                        onChange={(e) => handleKidAgeChange(index, e.target.value)}
                        className={inputClass}
                        placeholder={`Enter age for kid ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Amount of rent you pay (PKR)
              </label>
              <input
                type="number"
                min="0"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                className={inputClass}
                placeholder="e.g. 45000"
              />
            </div>
          </div>
        </div>

        <div className={`${cardClass} lg:sticky lg:top-10 h-fit`}>
          <h2 className="text-2xl font-semibold text-slate-900">Monthly Breakdown</h2>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Gross salary</span>
              <span className="font-semibold">{formatPKR(grossSalary)}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Monthly tax (slab based)</span>
              <span className="font-semibold">-{formatPKR(monthlyTax)}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Fuel charges</span>
              <span className="font-semibold">-{formatPKR(carDeduction)}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Kids cost</span>
              <span className="font-semibold">-{formatPKR(kidsDeduction)}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Kitchen + utilities</span>
              <span className="font-semibold">-{formatPKR(KITCHEN_UTILITIES)}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Rent</span>
              <span className="font-semibold">-{formatPKR(rent)}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Recreational / family</span>
              <span className="font-semibold">-{formatPKR(RECREATION)}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Health deduction</span>
              <span className="font-semibold">-{formatPKR(HEALTH)}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-slate-50 p-3">
              <span>Miscellaneous</span>
              <span className="font-semibold">-{formatPKR(MISC)}</span>
            </div>
          </div>

          {kids > 0 && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-800">Kids monthly deduction detail</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                {Array.from({ length: kids }).map((_, index) => {
                  const age = kidAges[index];
                  const cost = getKidMonthlyCost(age);
                  return (
                    <div key={index} className="flex justify-between">
                      <span>Kid {index + 1} ({age === "" ? "age not entered" : `${age} years`})</span>
                      <span className="font-medium">{formatPKR(cost)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-sm text-slate-300">Estimated monthly savings</p>
            <p className="mt-2 text-3xl font-bold">{formatPKR(savings)}</p>
            <p className="mt-2 text-sm text-slate-300">
              Effective annual tax rate: {effectiveTaxRate.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
