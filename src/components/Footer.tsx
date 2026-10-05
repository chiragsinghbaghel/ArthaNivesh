import React from 'react';
import { SiteSettings } from '../types';
import { ShieldCheck, ArrowUpRight, Scale, AlertTriangle } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (tab: string) => void;
  onOpenLegal: (type: 'disclaimer' | 'privacy' | 'terms' | 'refund') => void;
  onOpenGrievance: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenLegal,
  onOpenGrievance,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Prominent Statutory Risk Disclaimer Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-slate-300">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px] sm:text-xs">
              <strong className="text-white font-semibold">Statutory Risk Disclosure: </strong>
              Investment in securities and commodities is subject to market risks. Past performance does not guarantee future results. Please read all relevant risk disclosures, service agreements, and terms carefully before using any research or advisory service. We do not provide guaranteed return schemes, profit sharing, or trade execution services.
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-2">
                  <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-lg font-bold text-white font-display">
                Artha<span className="text-emerald-400">Nivesh</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              ArthaNivesh Financial Research is an independent capital markets research organization delivering evidence-based equity, derivatives, and macroeconomic intelligence for Indian market participants.
            </p>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1 font-mono text-[10px]">
              <div>SEBI Reg: {settings.compliance.sebiRegNo}</div>
              <div>CIN: {settings.compliance.cin}</div>
              <div className="text-emerald-400">NISM Certified Research Desk</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Research Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  About Research Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  All 12 Research Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('performance')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Historical Track Record
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reports')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Research Reports (PDF)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calls')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Live Calls & Updates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Subscription Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Important Legal & Regulatory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Statutory Risk Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Privacy & Data Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('refund')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Subscription Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compliance')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400/90 font-medium"
                >
                  SEBI Compliance Information
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGrievance}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-sky-400"
                >
                  Grievance Redressal / SCORES
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Investor Charter & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Research Desk Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed font-mono">
              <div>
                <strong className="text-slate-300 block font-sans">Corporate Office:</strong>
                {settings.contact.addressLine1}
                <br />
                {settings.contact.cityStateZip}
              </div>
              <div>
                <strong className="text-slate-300 block font-sans">Helpline:</strong>
                {settings.contact.phone}
              </div>
              <div>
                <strong className="text-slate-300 block font-sans">Research Inquiries:</strong>
                {settings.contact.email}
              </div>
              <div>
                <strong className="text-slate-300 block font-sans">Compliance Escalation:</strong>
                {settings.contact.complianceEmail}
              </div>
            </div>

            {/* Admin Portal Shortcut */}
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] font-mono text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Staff & Administrator Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} ArthaNivesh Financial Research Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>SEBI Research Analyst Regulations 2014</span>
            <span>·</span>
            <span>Mumbai Jurisdiction</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
