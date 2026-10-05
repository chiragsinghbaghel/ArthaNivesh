import React, { useState } from 'react';
import { Storage } from '../utils/storage';
import { GrievanceComplaint } from '../types';
import { ShieldCheck, X, CheckCircle2, AlertCircle, FileUp, Search, ArrowRight } from 'lucide-react';

interface GrievanceSectionProps {
  onClose: () => void;
}

export const GrievanceSection: React.FC<GrievanceSectionProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

  // Submit form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    category: 'Research Delivery' as GrievanceComplaint['category'],
    service: 'Equity Cash Prime',
    date: new Date().toISOString().split('T')[0],
    description: '',
    attachmentName: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<GrievanceComplaint | null>(null);

  // Track ticket state
  const [trackRefNo, setTrackRefNo] = useState('');
  const [trackedTicket, setTrackedTicket] = useState<GrievanceComplaint | null | false>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email || !formData.description) return;

    const created = Storage.addGrievance({
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      category: formData.category,
      service: formData.service,
      date: formData.date,
      description: formData.description
    });

    setSubmittedTicket(created);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRefNo.trim()) return;

    const all = Storage.getGrievances();
    const found = all.find(
      g => g.referenceNumber.trim().toUpperCase() === trackRefNo.trim().toUpperCase()
    );
    setTrackedTicket(found || false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Investor Grievance Redressal
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Formal Complaint & Escalation Desk
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Official ticket logging in compliance with SEBI investor protection regulations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('submit')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'submit'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Submit New Complaint
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'track'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Track Existing Ticket Status
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {activeTab === 'submit' ? (
            submittedTicket ? (
              /* Success Confirmation */
              <div className="text-center py-6 space-y-4 font-sans">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Grievance Successfully Registered</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your formal ticket has been logged into our grievance redressal register. Our Principal Grievance Officer will review the matter within 2 business days.
                </p>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-w-sm mx-auto font-mono text-xs">
                  <div className="text-slate-400">YOUR GRIEVANCE REFERENCE NUMBER:</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1 select-all">
                    {submittedTicket.referenceNumber}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Please save this reference number for correspondence.
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFormData({
                        name: '',
                        mobile: '',
                        email: '',
                        category: 'Research Delivery',
                        service: 'Equity Cash Prime',
                        date: new Date().toISOString().split('T')[0],
                        description: '',
                        attachmentName: ''
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer"
                  >
                    Submit Another Ticket
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Submission Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunil Mehta"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Complaint Category *</label>
                    <select
                      value={formData.category}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          category: e.target.value as GrievanceComplaint['category']
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Service Delay">Service Delay / Late Delivery</option>
                      <option value="Research Delivery">Research Delivery & SMS Alerts</option>
                      <option value="Billing & Subscription">Billing, Invoices & Subscriptions</option>
                      <option value="Technical Access">Portal / App Technical Access</option>
                      <option value="Other">Other Operational Matter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Service Subscribed</label>
                    <input
                      type="text"
                      placeholder="e.g. Equity Cash Prime / Derivatives Pro"
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Date of Incident</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Detailed Complaint Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide a chronological account of the issue, dates, and expected resolution..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                {/* Simulated File Attachment */}
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <FileUp className="w-4 h-4 text-emerald-400" />
                    <span>Supporting Document / Screenshot (Optional):</span>
                  </div>
                  <input
                    type="file"
                    id="complaint-file"
                    className="hidden"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData({ ...formData, attachmentName: e.target.files[0].name });
                      }
                    }}
                  />
                  <label
                    htmlFor="complaint-file"
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer font-mono text-[11px]"
                  >
                    {formData.attachmentName ? formData.attachmentName : 'Browse File (PDF/PNG)'}
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    SLA: Initial response in 48 hours
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Submit Formal Complaint
                  </button>
                </div>
              </form>
            )
          ) : (
            /* Ticket Tracking View */
            <div className="space-y-6">
              <form onSubmit={handleTrack} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Reference No (e.g. ANR-GRV-2026-1042)"
                  value={trackRefNo}
                  onChange={e => setTrackRefNo(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Check Status</span>
                </button>
              </form>

              {trackedTicket && (
                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Ticket: {trackedTicket.referenceNumber}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        trackedTicket.status === 'RESOLVED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      Status: {trackedTicket.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Applicant: </span>
                    <strong className="text-white">{trackedTicket.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Category: </span>
                    <span className="text-slate-200">{trackedTicket.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Service: </span>
                    <span className="text-slate-200">{trackedTicket.service}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 text-slate-300">
                    <div className="text-[10px] text-slate-500 uppercase">Complaint Brief:</div>
                    <p className="mt-1 leading-relaxed">{trackedTicket.description}</p>
                  </div>
                  {trackedTicket.resolutionNotes && (
                    <div className="p-3 bg-slate-900 rounded border border-slate-800 text-emerald-300">
                      <div className="text-[10px] uppercase font-bold text-emerald-400">
                        Resolution Note ({trackedTicket.resolvedAt || 'Recent'}):
                      </div>
                      <p className="mt-1 text-slate-200">{trackedTicket.resolutionNotes}</p>
                    </div>
                  )}
                </div>
              )}

              {trackedTicket === false && (
                <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    No grievance ticket found matching "{trackRefNo}". Please verify your ticket reference number.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
          <span>Escalation Email: compliance@arthanivesh.in</span>
          <span>SEBI SCORES Integrated</span>
        </div>
      </div>
    </div>
  );
};
