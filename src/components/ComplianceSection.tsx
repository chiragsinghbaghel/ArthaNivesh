import React from 'react';
import { SiteSettings } from '../types';
import { ShieldCheck, Scale, AlertOctagon, HelpCircle, ExternalLink, Mail, Phone, Clock } from 'lucide-react';

interface ComplianceSectionProps {
  settings: SiteSettings;
  onOpenGrievanceForm: () => void;
}

export const ComplianceSection: React.FC<ComplianceSectionProps> = ({
  settings,
  onOpenGrievanceForm
}) => {
  return (
    <section id="compliance" className="bg-slate-950 py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
            Regulatory Framework & Investor Protection
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Regulatory Compliance & Governance
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            ArthaNivesh Financial Research strictly adheres to the code of conduct and reporting disclosures stipulated by the Securities and Exchange Board of India (SEBI).
          </p>
        </div>

        {/* Regulatory Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Research Analyst Registration
            </h3>
            <div className="text-xs font-mono text-emerald-400 font-semibold">
              SEBI Reg No: {settings.compliance.sebiRegNo}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Entity Registered under SEBI (Research Analysts) Regulations, 2014. Registration granted by SEBI does not guarantee returns or performance.
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              CIN: {settings.compliance.cin}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Compliance Officer Details
            </h3>
            <div className="text-xs font-bold text-slate-200">
              {settings.compliance.complianceOfficerName}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Designated Key Managerial Personnel overseeing regulatory reporting, analyst certifications, and conflict disclosures.
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Email: {settings.compliance.complianceOfficerContact}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Principal Grievance Officer
            </h3>
            <div className="text-xs font-bold text-slate-200">
              {settings.compliance.grievanceOfficerName}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Handles formal complaints, subscription disputes, and service delivery escalations with a maximum 7-day SLA.
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Email: {settings.compliance.grievanceOfficerContact}
            </div>
          </div>
        </div>

        {/* 3-Tier Grievance Redressal Matrix */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Investor Grievance Escalation Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Standard escalation process for all registered subscribers and market participants.
              </p>
            </div>

            <button
              onClick={onOpenGrievanceForm}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer self-start sm:self-auto"
            >
              Submit an Online Grievance Ticket
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1 */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>LEVEL 1: CLIENT SUPPORT & HELPDESK</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contact our customer support desk regarding research report access, SMS delivery, or billing clarification.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800 space-y-1">
                <div>Email: {settings.contact.email}</div>
                <div>Phone: {settings.contact.phone}</div>
                <div className="text-emerald-400">Response SLA: Within 24-48 Hours</div>
              </div>
            </div>

            {/* Level 2 */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>LEVEL 2: COMPLIANCE OFFICER</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If your grievance remains unaddressed after 7 working days, escalate directly to the Head of Compliance.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800 space-y-1">
                <div>Officer: {settings.compliance.complianceOfficerName}</div>
                <div>Email: {settings.contact.complianceEmail}</div>
                <div className="text-sky-400">Resolution SLA: 7 Working Days</div>
              </div>
            </div>

            {/* Level 3 */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>LEVEL 3: SEBI SCORES / SMART ODR</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If unsatisfied with internal resolution, investors can register complaints on the official SEBI Complaints Redress System.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800 space-y-1">
                <div>Portal: scores.sebi.gov.in</div>
                <div>Alternative: smartodr.in</div>
                <div className="text-amber-400">SEBI Regulatory Mechanism</div>
              </div>
            </div>
          </div>
        </div>

        {/* Investor Charter & Guidelines */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white font-display">
            Investor Charter for Research Analysts – Do's & Don'ts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 space-y-2">
              <h4 className="font-bold text-emerald-400 font-mono text-sm">
                DO's For Investors:
              </h4>
              <ul className="space-y-1.5 text-slate-300 list-disc pl-4">
                <li>Always verify the SEBI registration number of the Research Analyst before subscribing.</li>
                <li>Conduct independent risk profiling to ensure research fits your liquidity and horizon.</li>
                <li>Transact and remit fees exclusively through documented banking channels (NEFT/RTGS/UPI).</li>
                <li>Insist on an official GST tax invoice for all subscriptions paid.</li>
                <li>Always apply the specified stop-loss defensively to safeguard trading capital.</li>
              </ul>
            </div>

            <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20 space-y-2">
              <h4 className="font-bold text-rose-400 font-mono text-sm">
                DON'Ts For Investors:
              </h4>
              <ul className="space-y-1.5 text-slate-300 list-disc pl-4">
                <li>Do NOT fall for claims of guaranteed returns, sure-shot profits, or 100% accuracy.</li>
                <li>Do NOT share your trading terminal credentials, OTPs, or passwords with anyone.</li>
                <li>Do NOT remit funds to individual or personal bank accounts.</li>
                <li>Do NOT execute leveraged derivative trades without adequate risk buffer capital.</li>
                <li>Do NOT engage in profit-sharing arrangements; they are strictly prohibited by SEBI.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
