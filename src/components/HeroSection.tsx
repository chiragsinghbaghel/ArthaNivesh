import React, { useState } from 'react';
import { ArrowRight, PhoneCall, ShieldCheck, ChevronRight, Activity, Award, Compass } from 'lucide-react';
import { InteractiveChart } from './InteractiveChart';

interface HeroSectionProps {
  onExploreServices: () => void;
  onTalkToExpert: () => void;
  onOpenRiskAssessment: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onTalkToExpert,
  onOpenRiskAssessment
}) => {
  const [selectedScrip, setSelectedScrip] = useState<'NIFTY' | 'BANKNIFTY' | 'RELIANCE' | 'TATASTEEL'>('NIFTY');

  const scripData = {
    NIFTY: { symbol: 'NIFTY 50', price: 24852.15, change: 142.35, pct: 0.58 },
    BANKNIFTY: { symbol: 'BANK NIFTY', price: 53215.40, change: 322.10, pct: 0.61 },
    RELIANCE: { symbol: 'RELIANCE IND', price: 2948.50, change: 24.20, pct: 0.83 },
    TATASTEEL: { symbol: 'TATA STEEL', price: 162.80, change: -1.45, pct: -0.88 }
  };

  const active = scripData[selectedScrip];

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-12 pb-16 lg:pt-18 lg:pb-24 border-b border-slate-800">
      {/* Subtle radial ambient glow behind terminal */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Regulatory trust kicker - unboxed text with separator */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Independent SEBI-Standard Research Methodology</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Zero Conflict of Interest</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-display text-balance">
              Smarter Market Research.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Better-Informed Decisions.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Independent market research and insights designed to help traders and investors understand opportunities, risks and market trends across Indian equities and derivatives.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm tracking-tight transition-all duration-200 shadow-md shadow-emerald-500/10 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTalkToExpert}
                className="px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Talk to Our Expert</span>
              </button>

              <button
                onClick={onOpenRiskAssessment}
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors underline underline-offset-4 py-2"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Check Your Risk Profile First</span>
              </button>
            </div>

            {/* Statutory Transparency Box */}
            <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Statutory Risk Awareness</span>
              </div>
              <p className="text-[11px] leading-normal text-slate-400">
                We provide independent research analysis and structured educational insights. We do not provide guaranteed returns, sure-shot tips, or profit-sharing services. All investments in capital markets carry market risks.
              </p>
            </div>
          </div>

          {/* Right Column: High-Impact Financial Chart & Live Terminal */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-2 sm:p-3 shadow-2xl">
              {/* Instrument Switch Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs px-2">
                <div className="flex items-center gap-1.5 font-mono text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="font-semibold text-slate-200">Terminal Preview</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-md border border-slate-800">
                  {(['NIFTY', 'BANKNIFTY', 'RELIANCE', 'TATASTEEL'] as const).map(scrip => (
                    <button
                      key={scrip}
                      onClick={() => setSelectedScrip(scrip)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                        selectedScrip === scrip
                          ? 'bg-slate-800 text-emerald-400 font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {scrip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Render Chart Component */}
              <InteractiveChart
                symbol={active.symbol}
                currentPrice={active.price}
                change={active.change}
                changePct={active.pct}
              />

              {/* Terminal Sub-Strip with Market Breadth */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center text-[11px] font-mono border-t border-slate-800 text-slate-300">
                <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/40">
                  <div className="text-slate-500 text-[10px]">NSE ADVANCES</div>
                  <div className="font-bold text-emerald-400 tabular-nums">1,482</div>
                </div>
                <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/40">
                  <div className="text-slate-500 text-[10px]">NSE DECLINES</div>
                  <div className="font-bold text-rose-400 tabular-nums">846</div>
                </div>
                <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/40">
                  <div className="text-slate-500 text-[10px]">FII DII NET FLOW</div>
                  <div className="font-bold text-emerald-400 tabular-nums">+₹2,310 Cr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
