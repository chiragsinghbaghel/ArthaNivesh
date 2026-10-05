import React from 'react';
import { X, ShieldAlert, FileText, Scale } from 'lucide-react';

interface LegalModalProps {
  type: 'disclaimer' | 'privacy' | 'terms' | 'refund' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const getTitle = () => {
    switch (type) {
      case 'disclaimer':
        return 'Comprehensive Statutory Risk Disclaimer';
      case 'privacy':
        return 'Privacy & Data Protection Policy';
      case 'terms':
        return 'Terms & Conditions of Service';
      case 'refund':
        return 'Subscription & Refund Policy';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white font-display">{getTitle()}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed font-sans">
          {type === 'disclaimer' && (
            <>
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-300 font-mono text-xs">
                <strong>STATUTORY MANDATE: </strong>
                Investment in securities market is subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
              </div>
              <h4 className="font-bold text-white text-base">1. Nature of Advisory Service</h4>
              <p>
                ArthaNivesh Financial Research provides independent research, technical chart setups, fundamental valuations, and quantitative market education for retail and institutional clients. We are not a portfolio management service (PMS) and do not manage or hold client trading capital or demat assets.
              </p>
              <h4 className="font-bold text-white text-base">2. No Guaranteed Profit / Returns</h4>
              <p>
                We do not promise, imply, or guarantee any minimum profit or fixed return percentage. Any past performance track record published on our website is purely historical and does not guarantee or indicate future performance.
              </p>
              <h4 className="font-bold text-white text-base">3. Derivatives Risk Notice</h4>
              <p>
                Trading in derivatives (Futures and Options) involves leverage and carries significant financial risk. Option buyers face the potential 100% loss of paid premium upon expiration out of the money. Option sellers face theoretically unlimited risk. Clients are strongly advised to risk only surplus risk-capital that they can afford to lose entirely without impacting living standards.
              </p>
            </>
          )}

          {type === 'refund' && (
            <>
              <h4 className="font-bold text-white text-base">1. Subscription Activation & Research Delivery</h4>
              <p>
                Due to the intellectual property and immediate accessibility of real-time market research alerts, daily reports, and proprietary indicators upon purchase, all subscription plans are considered activated immediately upon payment receipt.
              </p>
              <h4 className="font-bold text-white text-base">2. Refund Eligibility</h4>
              <p>
                As a standard industry practice compliant with SEBI regulations, research fees once paid are non-refundable and non-transferable once services have commenced. In the event of duplicate billing or proven technical delivery failure lasting more than 7 consecutive trading sessions attributable to our server systems, a pro-rata credit note or refund may be evaluated upon written application to the Principal Grievance Officer.
              </p>
              <h4 className="font-bold text-white text-base">3. Suspension for Regulatory Breach</h4>
              <p>
                If a subscriber attempts unauthorized resale, sharing, or distribution of our research reports on third-party channels, ArthaNivesh reserves the right to terminate access immediately without refund.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <h4 className="font-bold text-white text-base">1. Information Collection & Usage</h4>
              <p>
                We collect personal information such as name, contact numbers, email address, and risk assessment parameters solely for complying with KYC, regulatory requirements under SEBI (Research Analysts) Regulations, 2014, and delivering research alerts.
              </p>
              <h4 className="font-bold text-white text-base">2. Zero Sale of Personal Data</h4>
              <p>
                ArthaNivesh maintains strict confidentiality. We never sell, rent, or trade client personal phone numbers or email addresses to third-party telemarketers or external financial distributors.
              </p>
              <h4 className="font-bold text-white text-base">3. Data Security & Storage</h4>
              <p>
                Client inquiries, risk profiles, and communication logs are stored on encrypted servers with role-based administrative access controls.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4 className="font-bold text-white text-base">1. Client Independent Execution</h4>
              <p>
                Subscribers agree that all buy, sell, or hold recommendations are execution-independent. The subscriber is solely responsible for placing orders through their registered stock broker and for monitoring their individual risk levels.
              </p>
              <h4 className="font-bold text-white text-base">2. Intellectual Property Rights</h4>
              <p>
                All research reports, analytical notes, models, and audio/video materials are proprietary intellectual property of ArthaNivesh Financial Research. Reproduction or redistribution is strictly prohibited without prior written consent.
              </p>
              <h4 className="font-bold text-white text-base">3. Jurisdiction & Dispute Resolution</h4>
              <p>
                Any legal dispute arising from the use of services is subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra, India.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
