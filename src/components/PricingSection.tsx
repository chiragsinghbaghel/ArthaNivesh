import React, { useState } from 'react';
import { PricingPlan } from '../types';
import { Check, ShieldCheck, HelpCircle, ArrowRight, Info } from 'lucide-react';

interface PricingSectionProps {
  plans: PricingPlan[];
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ plans, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'Quarterly' | 'Annual'>('Quarterly');

  return (
    <section id="pricing" className="bg-slate-900/50 py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
            Transparent Research Subscriptions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Institutional Research Pricing
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Honest, statutory-compliant subscription plans without hidden fees or artificial discount timers. All services are subject to 18% GST with valid tax invoices issued.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map(plan => {
            const gstAmount = Math.round(plan.price * plan.gstRate);
            const totalAmount = plan.price + gstAmount;

            return (
              <div
                key={plan.id}
                className={`relative bg-slate-950 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 shadow-xl ${
                  plan.popular
                    ? 'border-2 border-emerald-400/90 shadow-emerald-500/5 -translate-y-1'
                    : 'border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Marker */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-400 text-slate-950 font-bold text-[11px] font-mono rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">
                    {plan.marketSegment}
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">{plan.name}</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{plan.researchType}</div>

                  {/* Price Box */}
                  <div className="mt-6 p-4 bg-slate-900/70 rounded-xl border border-slate-800/80 font-mono">
                    <div className="flex items-baseline gap-1 text-slate-400 text-xs">
                      <span>Base:</span>
                      <span className="text-2xl font-bold text-white tabular-nums">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-400">/ {plan.duration}</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>+ 18% GST:</span>
                      <span className="text-slate-300 font-semibold tabular-nums">
                        ₹{gstAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="mt-1 pt-1 border-t border-slate-800/60 text-xs text-slate-200 font-bold flex items-center justify-between">
                      <span>Total Payable:</span>
                      <span className="text-emerald-400 tabular-nums">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-2.5">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Included Research Deliverables:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Terms */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono space-y-1">
                    <div className="font-semibold text-slate-400">Terms of Subscription:</div>
                    {plan.terms.map((term, idx) => (
                      <div key={idx}>· {term}</div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                      plan.popular
                        ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                    }`}
                  >
                    <span>Subscribe / Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment & Compliance Guarantee */}
        <div className="mt-12 p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-slate-200">SEBI Regulatory Notice on Fees: </strong>
              All subscription fees must be remitted strictly via official banking channels (NEFT / RTGS / UPI / Corporate Gateway). We never accept cash or personal payments into unauthorized accounts.
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-500 shrink-0">
            GSTIN: 27AABCA4829K1ZZ · Corporate Invoicing
          </div>
        </div>
      </div>
    </section>
  );
};
