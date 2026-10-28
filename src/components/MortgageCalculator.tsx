import { useState } from 'react';
import { IndianRupee, Calculator, ArrowRight, ShieldCheck, Percent, Clock } from 'lucide-react';

interface MortgageCalculatorProps {
  onScheduleAdvisory: () => void;
}

export default function MortgageCalculator({ onScheduleAdvisory }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(35000000); // 3.5 Cr default
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const monthlyEMI = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = totalPayment - loanPrincipal;
  const principalRatio = Math.round((loanPrincipal / totalPayment) * 100);
  const interestRatio = 100 - principalRatio;

  const formatCroresLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-amber-400 text-xs font-semibold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>NCR Residential Financing Suite</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
          Home Loan & EMI Estimator
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Plan your residential investment with precision. Compute monthly outflows, amortization breakdown, and leverage our banking relationships for preferential lending rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Sliders and Inputs */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Property Price */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-2">
                <span>Property Valuation / Purchase Price</span>
                <span className="text-sm font-mono font-bold text-stone-950 bg-stone-100 px-3 py-1 rounded-lg">
                  {formatCroresLakhs(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={6000000}
                max={150000000}
                step={2500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                <span>₹60 Lakh</span>
                <span>₹7.5 Cr</span>
                <span>₹15 Cr</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-2">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <span className="text-sm font-mono font-bold text-stone-950 bg-stone-100 px-3 py-1 rounded-lg">
                  {formatCroresLakhs(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                <span>10% (Min)</span>
                <span>20% (Standard)</span>
                <span>60%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-2">
                <span>Interest Rate (% per annum)</span>
                <span className="text-sm font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min={7.5}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                <span>7.5% (Prime Tier)</span>
                <span>8.5% (Prevailing Avg)</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-2">
                <span>Loan Tenure (Years)</span>
                <span className="text-sm font-mono font-bold text-stone-950 bg-stone-100 px-3 py-1 rounded-lg">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[10, 15, 20, 25].map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setTenureYears(yrs)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      tenureYears === yrs
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {yrs} Yrs
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-stone-200 mt-6 flex items-center justify-between text-xs text-stone-500">
            <span>Calculations based on monthly compound reducing balance amortisation.</span>
          </div>
        </div>

        {/* Right Column: Calculated Results & Financial Breakdown */}
        <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col justify-between">
          
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Monthly Repayment Estimate
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight font-sans tabular-nums">
                ₹{monthlyEMI.toLocaleString()} <span className="text-sm font-normal text-stone-400">/ month</span>
              </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800 text-xs">
              <div className="p-3 bg-stone-800/80 rounded-2xl border border-stone-700/60">
                <span className="text-stone-400 block text-[11px]">Principal Loan</span>
                <span className="text-base font-bold text-stone-100 font-mono mt-0.5 block tabular-nums">
                  {formatCroresLakhs(loanPrincipal)}
                </span>
              </div>

              <div className="p-3 bg-stone-800/80 rounded-2xl border border-stone-700/60">
                <span className="text-stone-400 block text-[11px]">Total Interest</span>
                <span className="text-base font-bold text-amber-400 font-mono mt-0.5 block tabular-nums">
                  {formatCroresLakhs(totalInterest)}
                </span>
              </div>

              <div className="col-span-2 p-3 bg-stone-800/80 rounded-2xl border border-stone-700/60">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 text-[11px]">Total Repayment (Principal + Interest)</span>
                  <span className="text-base font-bold text-white font-mono tabular-nums">
                    {formatCroresLakhs(totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                  <span>Principal ({principalRatio}%)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span>Interest ({interestRatio}%)</span>
                </span>
              </div>
              <div className="h-3 w-full bg-stone-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${principalRatio}%` }} className="h-full bg-white transition-all duration-300" />
                <div style={{ width: `${interestRatio}%` }} className="h-full bg-amber-400 transition-all duration-300" />
              </div>
            </div>

            {/* Banking Partner Desk */}
            <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/50 text-xs text-stone-300 space-y-1.5">
              <div className="font-bold text-stone-100 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Preferential NCR Banking Ties</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                We assist with doorstep processing, pre-approved sanctioned limits, and specialized wealth advisory for HNIs and NRIs through our institutional banking channels.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onScheduleAdvisory}
              className="w-full py-3 px-4 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Connect with Home Loan Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
