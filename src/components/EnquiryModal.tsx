import React, { useState } from 'react';
import { Storage } from '../utils/storage';
import { X, CheckCircle2, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedService = 'Equity Cash Research'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    service: preselectedService,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (preselectedService && isOpen) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
      setSubmitted(false);
    }
  }, [preselectedService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email) return;

    Storage.addEnquiry({
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city || 'Not Specified',
      interestedService: formData.service || preselectedService,
      message: formData.message
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Connect with Research Desk
            </div>
            <h3 className="text-xl font-bold text-white font-display">Talk to a Research Expert</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Discuss risk suitability, research deliverables, and sample formats.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4 font-sans">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Callback Request Logged</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
              Our research coordinator will connect with <strong>{formData.name}</strong> at{' '}
              {formData.mobile} during market hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 rounded-xl hover:bg-emerald-300 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  placeholder="e.g. Pune"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Service of Interest</label>
              <input
                type="text"
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Message (Optional)</label>
              <textarea
                rows={2}
                placeholder="Any specific questions regarding performance, reports or risk..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request Immediate Callback</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-500 font-mono text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strict compliance: Zero spam. Independent Research Desk.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
