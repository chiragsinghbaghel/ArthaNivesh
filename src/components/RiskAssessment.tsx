import React, { useState } from 'react';
import { RISK_ASSESSMENT_QUESTIONS } from '../data/initialData';
import { RiskProfileOutput } from '../types';
import { ShieldCheck, Compass, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft, Printer, FileDown } from 'lucide-react';

interface RiskAssessmentProps {
  onExploreServices: () => void;
  onTalkToExpert: () => void;
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  onExploreServices,
  onTalkToExpert
}) => {
  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    occupation: 'Salaried Corporate Professional',
    investmentCapital: '₹10 Lakhs - ₹25 Lakhs'
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [step, setStep] = useState<'details' | 'questions' | 'result'>('details');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [calculatedProfile, setCalculatedProfile] = useState<RiskProfileOutput | null>(null);

  const handleSelectOption = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < RISK_ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const calculateResult = () => {
    const scores = Object.values(answers);
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxScore = RISK_ASSESSMENT_QUESTIONS.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let profile: 'Conservative' | 'Moderate' | 'Balanced' | 'Aggressive' | 'High Growth';
    let riskTolerance: string;
    let horizon: string;
    let allocation = {
      fixedIncome: 50,
      largeCapEquity: 35,
      midSmallCap: 10,
      derivativesCommodities: 0,
      goldCash: 5
    };
    let suitable: string[] = [];

    if (percentage <= 35) {
      profile = 'Conservative';
      riskTolerance = 'Low Capital Risk Tolerance. Priority is capital preservation with minimal volatility.';
      horizon = 'Medium to Long Term (3+ Years)';
      allocation = {
        fixedIncome: 55,
        largeCapEquity: 30,
        midSmallCap: 5,
        derivativesCommodities: 0,
        goldCash: 10
      };
      suitable = ['Portfolio Health Review', 'Long-Term Wealth Creation', 'Equity Cash Large-Cap'];
    } else if (percentage <= 55) {
      profile = 'Moderate';
      riskTolerance = 'Moderate Risk Tolerance. Accepts short-term fluctuations in pursuit of healthy inflation-beating alpha.';
      horizon = '1 to 3 Years';
      allocation = {
        fixedIncome: 35,
        largeCapEquity: 40,
        midSmallCap: 15,
        derivativesCommodities: 0,
        goldCash: 10
      };
      suitable = ['Equity Cash Research', 'Positional Swing Research', 'Long-Term Wealth Creation'];
    } else if (percentage <= 75) {
      profile = 'Balanced';
      riskTolerance = 'Balanced Growth & Derivative Awareness. Willing to absorb 10-15% periodic drawdowns for multi-week alpha.';
      horizon = '6 Months to 2 Years';
      allocation = {
        fixedIncome: 20,
        largeCapEquity: 40,
        midSmallCap: 25,
        derivativesCommodities: 10,
        goldCash: 5
      };
      suitable = ['Positional Swing Research', 'Stock & Index Options Spreads', 'Equity Cash Prime'];
    } else {
      profile = 'Aggressive';
      riskTolerance = 'High Risk Tolerance. Deep knowledge of leverage, margin calls, and derivative decay.';
      horizon = 'Intraday to Short Term';
      allocation = {
        fixedIncome: 10,
        largeCapEquity: 30,
        midSmallCap: 30,
        derivativesCommodities: 25,
        goldCash: 5
      };
      suitable = ['Derivatives Pro (F&O)', 'Index Expiry Research', 'Commodity MCX Energy & Bullion'];
    }

    setCalculatedProfile({
      score: totalScore,
      profile,
      riskTolerance,
      investmentHorizon: horizon,
      assetAllocation: allocation,
      suitableServices: suitable,
      disclaimer: 'This assessment is for informational and educational purposes only and does not constitute personalized investment advice or portfolio management.'
    });

    setStep('result');
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQIndex(0);
    setCalculatedProfile(null);
    setStep('details');
  };

  const handlePrintResult = () => {
    window.print();
  };

  return (
    <section id="risk-assessment" className="bg-slate-950 py-20 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
            Investor Suitability & Risk Profiling
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Interactive Risk Assessment
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Evaluate your risk tolerance, liquidity horizon, and capital preservation thresholds in accordance with SEBI investor awareness principles.
          </p>
        </div>

        {/* STEP 1: Personal Details */}
        {step === 'details' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white font-display">
                Step 1: Investor Background Profile
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Please provide basic details to contextualize your risk capacity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={personalDetails.fullName}
                  onChange={e => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={personalDetails.mobileNumber}
                  onChange={e => setPersonalDetails({ ...personalDetails, mobileNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={personalDetails.email}
                  onChange={e => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Occupation</label>
                <select
                  value={personalDetails.occupation}
                  onChange={e => setPersonalDetails({ ...personalDetails, occupation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Salaried Corporate Professional">Salaried Corporate Professional</option>
                  <option value="Business Owner / Entrepreneur">Business Owner / Entrepreneur</option>
                  <option value="Professional (Doctor, CA, Lawyer, Consultant)">Professional (Doctor, CA, Lawyer)</option>
                  <option value="Retired / Senior Citizen">Retired / Senior Citizen</option>
                  <option value="Full-Time Market Trader">Full-Time Market Trader</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Planned Market Investment Capital (INR)
                </label>
                <select
                  value={personalDetails.investmentCapital}
                  onChange={e => setPersonalDetails({ ...personalDetails, investmentCapital: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Below ₹5 Lakhs">Below ₹5 Lakhs</option>
                  <option value="₹5 Lakhs - ₹15 Lakhs">₹5 Lakhs - ₹15 Lakhs</option>
                  <option value="₹15 Lakhs - ₹50 Lakhs">₹15 Lakhs - ₹50 Lakhs</option>
                  <option value="Above ₹50 Lakhs (HNI)">Above ₹50 Lakhs (HNI)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                disabled={!personalDetails.fullName || !personalDetails.mobileNumber}
                onClick={() => setStep('questions')}
                className="px-6 py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed to Risk Questionnaire (12 Questions)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Questions Carousel */}
        {step === 'questions' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>
                  Question {currentQIndex + 1} of {RISK_ASSESSMENT_QUESTIONS.length}
                </span>
                <span className="text-emerald-400">
                  {Math.round(((currentQIndex + 1) / RISK_ASSESSMENT_QUESTIONS.length) * 100)}% Completed
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{
                    width: `${((currentQIndex + 1) / RISK_ASSESSMENT_QUESTIONS.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Current Question */}
            {(() => {
              const q = RISK_ASSESSMENT_QUESTIONS[currentQIndex];
              const selectedScore = answers[q.id];
              return (
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    {q.id}. {q.question}
                  </h3>

                  <div className="space-y-2.5">
                    {q.options.map((opt, i) => {
                      const isSelected = selectedScore === opt.score;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(q.id, opt.score)}
                          className={`w-full p-4 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500/10 border-2 border-emerald-400 text-white shadow-sm'
                              : 'bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="leading-relaxed">{opt.text}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                              isSelected
                                ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                                : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQIndex === 0}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                disabled={answers[RISK_ASSESSMENT_QUESTIONS[currentQIndex].id] === undefined}
                onClick={handleNextQuestion}
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {currentQIndex === RISK_ASSESSMENT_QUESTIONS.length - 1
                    ? 'Calculate My Risk Profile'
                    : 'Next Question'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Result Summary Card */}
        {step === 'result' && calculatedProfile && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Top Score Banner */}
            <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Assessment Outcome for {personalDetails.fullName}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Profile: <span className="text-emerald-400">{calculatedProfile.profile}</span>
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  Suitability Score: {calculatedProfile.score} / {RISK_ASSESSMENT_QUESTIONS.length * 4}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintResult}
                  className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                  title="Retake Assessment"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Explanation & Tolerance */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Risk Capacity Interpretation:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {calculatedProfile.riskTolerance}
              </p>
              <div className="text-xs text-emerald-400 font-mono pt-1">
                Recommended Horizon: {calculatedProfile.investmentHorizon}
              </div>
            </div>

            {/* Recommended Asset Allocation Matrix */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-3">
                Suggested Capital Allocation Framework:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-center text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500">FIXED DEPOSITS / DEBT</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {calculatedProfile.assetAllocation.fixedIncome}%
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500">LARGE CAP EQUITIES</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">
                    {calculatedProfile.assetAllocation.largeCapEquity}%
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500">MID / SMALL CAP</div>
                  <div className="text-lg font-bold text-sky-400 mt-1">
                    {calculatedProfile.assetAllocation.midSmallCap}%
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500">F&O / COMMODITIES</div>
                  <div className="text-lg font-bold text-amber-400 mt-1">
                    {calculatedProfile.assetAllocation.derivativesCommodities}%
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-500">GOLD / EMERGENCY</div>
                  <div className="text-lg font-bold text-yellow-400 mt-1">
                    {calculatedProfile.assetAllocation.goldCash}%
                  </div>
                </div>
              </div>
            </div>

            {/* Suitable Research Services */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2.5">
                Recommended Research Services for Your Profile:
              </h4>
              <div className="flex flex-wrap gap-2">
                {calculatedProfile.suitableServices.map((srv, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium"
                  >
                    ✓ {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Mandatory Regulatory Disclaimer */}
            <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-amber-200">Statutory Notice: </strong>
                {calculatedProfile.disclaimer}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ← Retake Risk Questionnaire
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={onTalkToExpert}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  Discuss Profile with Senior Analyst
                </button>
                <button
                  onClick={onExploreServices}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
                >
                  Explore Suitable Services
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
