import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { Storage } from '../utils/storage';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  settings: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    interestedService: 'General Research Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email) return;

    Storage.addEnquiry({
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city || 'Mumbai',
      interestedService: formData.interestedService,
      message: formData.message
    });

    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const cleanNumber = settings.contact.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=Hello%20ArthaNivesh%20Research,%20I%20would%20like%20to%20inquire%20about%20your%20market%20advisory%20services.`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="bg-slate-900/40 py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
            Reach Our Research Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Contact & Advisory Helpdesk
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Have questions regarding our research approach or subscription plans? Our client support desk and research analysts are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
                Corporate Headquarters
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Office Address</div>
                    <div className="mt-0.5 text-slate-400 leading-relaxed">
                      {settings.contact.addressLine1}
                      <br />
                      {settings.contact.addressLine2}
                      <br />
                      {settings.contact.cityStateZip}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Telephone Lines</div>
                    <div className="mt-0.5 text-slate-400 font-mono">
                      Board: {settings.contact.phone}
                      <br />
                      Direct Desk: {settings.contact.altPhone}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Electronic Mail</div>
                    <div className="mt-0.5 text-slate-400 font-mono">
                      Research: {settings.contact.email}
                      <br />
                      Compliance: {settings.contact.complianceEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Operating Hours</div>
                    <div className="mt-0.5 text-slate-400 font-mono">
                      {settings.contact.workingHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick CTA */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect via Official WhatsApp Desk</span>
                </button>
              </div>
            </div>

            {/* Stylized Google Map Visual Canvas for BKC Mumbai */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl overflow-hidden">
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
                <span>Location: Bandra-Kurla Complex (BKC)</span>
                <span className="text-emerald-400">Financial Hub</span>
              </div>
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                {/* SVG Map Graphic */}
                <svg viewBox="0 0 400 200" className="w-full h-full opacity-60">
                  <rect width="400" height="200" fill="#090d16" />
                  {/* Grid roads */}
                  <path d="M 0 50 L 400 50" stroke="#1e293b" strokeWidth="3" />
                  <path d="M 0 110 L 400 110" stroke="#1e293b" strokeWidth="4" />
                  <path d="M 0 160 L 400 160" stroke="#1e293b" strokeWidth="2" />
                  <path d="M 80 0 L 80 200" stroke="#1e293b" strokeWidth="3" />
                  <path d="M 200 0 L 200 200" stroke="#1e293b" strokeWidth="5" />
                  <path d="M 310 0 L 310 200" stroke="#1e293b" strokeWidth="3" />
                  <path d="M 40 200 C 120 120, 260 140, 360 40" stroke="#334155" strokeWidth="2" fill="none" />
                  {/* BKC blocks */}
                  <rect x="100" y="65" width="80" height="35" rx="3" fill="#1e293b" />
                  <rect x="220" y="65" width="70" height="35" rx="3" fill="#1e293b" />
                  <rect x="100" y="125" width="80" height="25" rx="3" fill="#1e293b" />
                  <rect x="220" y="125" width="70" height="25" rx="3" fill="#1e293b" />
                  {/* Pin at 200, 110 */}
                  <circle cx="200" cy="110" r="16" fill="#10b981" opacity="0.2" />
                  <circle cx="200" cy="110" r="7" fill="#10b981" />
                  <circle cx="200" cy="110" r="3" fill="#ffffff" />
                </svg>
                <div className="absolute bottom-2 left-2 bg-slate-950/90 border border-slate-800 px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400">
                  ArthaNivesh Financial Center · BKC G-Block
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl">
            <h3 className="text-xl font-bold text-white font-display mb-1">
              Request a Research Consultation
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Leave your contact details and an analyst will reach out to discuss suitable research methodologies.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-4 font-sans">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Callback Request Confirmed</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our client relationship manager will contact you at {formData.mobile} during operating hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      mobile: '',
                      email: '',
                      city: '',
                      interestedService: 'General Research Inquiry',
                      message: ''
                    });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Varma"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">City / State</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Pune, Delhi"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Interested Service / Market Segment
                  </label>
                  <select
                    value={formData.interestedService}
                    onChange={e => setFormData({ ...formData, interestedService: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Equity Cash Prime">Equity Cash Research</option>
                    <option value="Derivatives Pro (F&O)">Derivatives Pro (Futures & Options)</option>
                    <option value="Index Expiry Research">Index Expiry Research (Nifty/Bank Nifty)</option>
                    <option value="Commodity MCX Research">Commodity MCX (Gold/Silver/Energy)</option>
                    <option value="Long-Term Wealth Creation">Long-Term Wealth Creation</option>
                    <option value="HNI Institutional Mandate">HNI Institutional Research Mandate</option>
                    <option value="Portfolio Health Review">Portfolio Health & Risk Review</option>
                    <option value="General Research Inquiry">General Research Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your investment horizon, market experience, or specific research questions..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Callback from Research Desk</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 text-center font-mono">
                  No automated spam. Your contact details remain confidential.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
