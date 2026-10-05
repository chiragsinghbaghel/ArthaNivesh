import React from 'react';
import { TeamMember, SiteSettings } from '../types';
import { ShieldCheck, Target, CheckCircle2, Award, BookOpen, UserCheck, Scale, Compass } from 'lucide-react';

interface AboutSectionProps {
  team: TeamMember[];
  settings: SiteSettings;
  onExploreServices: () => void;
  onTalkToExpert: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  team,
  settings,
  onExploreServices,
  onTalkToExpert
}) => {
  return (
    <section id="about" className="bg-slate-900/40 py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
              About ArthaNivesh Financial Research
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Disciplined Research Grounded in First Principles & Regulatory Integrity
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              ArthaNivesh is an independent Indian stock market research organization founded on the conviction that retail and institutional market participants deserve rigorous, objective, and conflict-free market intelligence.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Headquartered in Bandra-Kurla Complex (BKC), Mumbai, our research desk combines traditional fundamental balance-sheet screening with modern price-action technicals, derivatives open-interest metrics, and macroeconomic stress testing.
            </p>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <Scale className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white font-mono">Zero Brokerage Conflict</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    We do not earn commission on turnover or trade volumes.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white font-mono">SEBI Compliance Standard</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Operated under strict SEBI (Research Analysts) Regulations, 2014.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Philosophy Visual Canvas */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white font-display border-b border-slate-800 pb-3">
              Our 4-Pillar Research Philosophy
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  01
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Fundamental Moat & Cash Flow</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Deep financial modeling, Return on Capital Employed (ROCE &gt; 18%), and forensic balance sheet audits.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  02
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Price Action & Volume Profiling</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Multi-timeframe breakouts, Wyckoff accumulation structures, and Volume-Weighted Average Price (VWAP).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  03
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Derivatives Open Interest & Greeks</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Tracking institutional FII/DII positioning, option gamma clustering, and Put-Call Ratio inflection points.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  04
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Defensive Risk Preservation</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Mandatory stop-loss rules, position-sizing caps, and zero unhedged naked overnight derivatives exposure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Research Team Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
              Our Research Leadership
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Experienced Research Analysts & Compliance Officers
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              All senior analysts hold recognized certifications from NISM, CFA Institute, and the Market Technicians Association.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(member => (
              <div
                key={member.id}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Avatar Initials Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold font-mono text-base shadow-inner">
                      {member.initials}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">{member.name}</h4>
                      <div className="text-xs text-emerald-400 font-mono">{member.designation}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono mb-3 pb-3 border-b border-slate-800/80">
                    <div>{member.qualification}</div>
                    <div className="text-slate-500 mt-0.5">{member.experienceYears} Years Market Experience</div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                  <span>Specialization: {member.specialization}</span>
                  <span className="text-emerald-400">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
