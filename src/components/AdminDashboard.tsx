import React, { useState } from 'react';
import {
  SiteSettings,
  ResearchCall,
  Enquiry,
  GrievanceComplaint,
  MarketUpdateArticle,
  ResearchReport
} from '../types';
import { Storage } from '../utils/storage';
import {
  ShieldCheck,
  X,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  RotateCcw,
  Users,
  FileText,
  Activity,
  AlertTriangle,
  Lock,
  LogOut,
  Save,
  MessageSquare
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onRefreshData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'enquiries' | 'grievances' | 'reports' | 'settings'>('overview');

  // Local state for calls, enquiries, grievances
  const [calls, setCalls] = useState<ResearchCall[]>(Storage.getResearchCalls());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(Storage.getEnquiries());
  const [grievances, setGrievances] = useState<GrievanceComplaint[]>(Storage.getGrievances());
  const [reports, setReports] = useState<ResearchReport[]>(Storage.getReports());

  // Edit settings form
  const [editableSettings, setEditableSettings] = useState<SiteSettings>(settings);

  React.useEffect(() => {
    if (isOpen) {
      setCalls(Storage.getResearchCalls());
      setEnquiries(Storage.getEnquiries());
      setGrievances(Storage.getGrievances());
      setReports(Storage.getReports());
      setEditableSettings(settings);
    }
  }, [isOpen, settings]);

  // New research call form
  const [showAddCall, setShowAddCall] = useState(false);
  const [newCall, setNewCall] = useState<Omit<ResearchCall, 'id'>>({
    instrument: '',
    segment: 'Equity Cash',
    action: 'BUY',
    entryPrice: 0,
    target1: 0,
    target2: 0,
    stopLoss: 0,
    date: 'Today',
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    status: 'ACTIVE',
    rationale: '',
    riskReward: '1:2.0'
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin password 'admin123'
    if (password === 'admin123' || password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid password. Default demo key is: admin123');
    }
  };

  const handleCreateCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCall.instrument || !newCall.entryPrice) return;

    const call: ResearchCall = {
      ...newCall,
      id: 'call-' + Date.now()
    };

    const updated = [call, ...calls];
    setCalls(updated);
    Storage.saveResearchCalls(updated);
    setShowAddCall(false);
    onRefreshData();
  };

  const handleUpdateCallStatus = (id: string, newStatus: ResearchCall['status']) => {
    const updated = calls.map(c => (c.id === id ? { ...c, status: newStatus } : c));
    setCalls(updated);
    Storage.saveResearchCalls(updated);
    onRefreshData();
  };

  const handleDeleteCall = (id: string) => {
    const updated = calls.filter(c => c.id !== id);
    setCalls(updated);
    Storage.saveResearchCalls(updated);
    onRefreshData();
  };

  const handleUpdateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    const updated = enquiries.map(e => (e.id === id ? { ...e, status } : e));
    setEnquiries(updated);
    Storage.saveEnquiries(updated);
  };

  const handleDeleteEnquiry = (id: string) => {
    const updated = enquiries.filter(e => e.id !== id);
    setEnquiries(updated);
    Storage.saveEnquiries(updated);
  };

  const handleUpdateGrievance = (
    id: string,
    status: GrievanceComplaint['status'],
    resolutionNotes: string
  ) => {
    const updated = grievances.map(g =>
      g.id === id
        ? {
            ...g,
            status,
            resolutionNotes,
            resolvedAt: new Date().toISOString().split('T')[0]
          }
        : g
    );
    setGrievances(updated);
    Storage.saveGrievances(updated);
  };

  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Storage.saveSettings(editableSettings);
    onSaveSettings(editableSettings);
    alert('Settings saved and applied across the website!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col font-sans">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                ArthaNivesh Compliance & Research Desk Portal
              </h2>
              <div className="text-[11px] text-slate-400 font-mono">
                Authorized Personnel Only · SEBI RA Admin Control
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 text-xs text-rose-400 hover:text-white rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN GATE */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 border border-slate-700">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-display">Administrator Sign In</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your administrative PIN or password to manage live calls, grievances, and settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Master Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password (demo: admin123)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-400 font-mono">{errorMsg}</div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
              >
                Unlock Administrator Console
              </button>

              <div className="text-[11px] text-slate-500 text-center font-mono">
                Hint: default administrator password is <code className="text-emerald-400">admin123</code>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto bg-slate-950/80 px-4 pt-2 border-b border-slate-800 shrink-0 text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('calls')}
                className={`py-2 px-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'calls'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Research Calls ({calls.length})
              </button>
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`py-2 px-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'enquiries'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Client Enquiries ({enquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('grievances')}
                className={`py-2 px-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'grievances'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Grievances / SCORES ({grievances.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Site Stats & Compliance Settings
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Metric Tiles */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">Total Enquiries</div>
                      <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                        {enquiries.length}
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-1">
                        {enquiries.filter(e => e.status === 'NEW').length} New Pending
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">Active Research Calls</div>
                      <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                        {calls.filter(c => c.status === 'ACTIVE').length}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{calls.length} Total Logged</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">Grievance Tickets</div>
                      <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                        {grievances.length}
                      </div>
                      <div className="text-[11px] text-amber-400 mt-1">
                        {grievances.filter(g => g.status === 'SUBMITTED').length} Require Action
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">Published Reports</div>
                      <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                        {reports.length}
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-1">Audit Ready</div>
                    </div>
                  </div>

                  {/* Quick Action Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-sm font-bold text-white font-display">
                        Publish New Market Research Call
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Issue a new research call with entry range, target 1, target 2, and mandatory stop loss across Cash, F&O, or MCX.
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab('calls');
                          setShowAddCall(true);
                        }}
                        className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Call</span>
                      </button>
                    </div>

                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-sm font-bold text-white font-display">
                        Manage Complaints & Investor Grievances
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Review formal complaints submitted through the website, update investigation notes, and mark them as resolved.
                      </p>
                      <button
                        onClick={() => setActiveTab('grievances')}
                        className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        Open Grievance Register
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CALLS MANAGEMENT */}
              {activeTab === 'calls' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-white font-display">
                      Manage Live & Historical Research Calls
                    </h3>
                    <button
                      onClick={() => setShowAddCall(!showAddCall)}
                      className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{showAddCall ? 'Cancel' : 'Create Call'}</span>
                    </button>
                  </div>

                  {/* Add Call Form Drawer */}
                  {showAddCall && (
                    <form
                      onSubmit={handleCreateCall}
                      className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4 text-xs font-mono"
                    >
                      <div className="font-bold text-emerald-400 text-sm">Create New Research Call</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1">Instrument *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. RELIANCE / NIFTY 24800 CE"
                            value={newCall.instrument}
                            onChange={e => setNewCall({ ...newCall, instrument: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Segment</label>
                          <select
                            value={newCall.segment}
                            onChange={e =>
                              setNewCall({ ...newCall, segment: e.target.value as any })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                          >
                            <option value="Equity Cash">Equity Cash</option>
                            <option value="Stock Futures">Stock Futures</option>
                            <option value="Stock Options">Stock Options</option>
                            <option value="Index Options">Index Options</option>
                            <option value="Commodity MCX">Commodity MCX</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Action</label>
                          <select
                            value={newCall.action}
                            onChange={e =>
                              setNewCall({ ...newCall, action: e.target.value as any })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                          >
                            <option value="BUY">BUY</option>
                            <option value="SELL">SELL</option>
                            <option value="HOLD">HOLD</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1">Entry Trigger *</label>
                          <input
                            type="number"
                            step="0.05"
                            required
                            placeholder="e.g. 2940"
                            value={newCall.entryPrice || ''}
                            onChange={e =>
                              setNewCall({ ...newCall, entryPrice: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Target 1</label>
                          <input
                            type="number"
                            step="0.05"
                            placeholder="e.g. 2990"
                            value={newCall.target1 || ''}
                            onChange={e =>
                              setNewCall({ ...newCall, target1: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Target 2</label>
                          <input
                            type="number"
                            step="0.05"
                            placeholder="e.g. 3040"
                            value={newCall.target2 || ''}
                            onChange={e =>
                              setNewCall({ ...newCall, target2: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Stop Loss *</label>
                          <input
                            type="number"
                            step="0.05"
                            required
                            placeholder="e.g. 2910"
                            value={newCall.stopLoss || ''}
                            onChange={e =>
                              setNewCall({ ...newCall, stopLoss: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Technical / Fundamental Rationale</label>
                        <input
                          type="text"
                          placeholder="e.g. Breakout above 20 EMA with rising delivery volume"
                          value={newCall.rationale}
                          onChange={e => setNewCall({ ...newCall, rationale: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddCall(false)}
                          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-emerald-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                        >
                          Publish Call
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Calls Table */}
                  <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                        <tr>
                          <th className="p-3">Instrument</th>
                          <th className="p-3">Segment</th>
                          <th className="p-3">Action</th>
                          <th className="p-3">Entry</th>
                          <th className="p-3">T1 / T2</th>
                          <th className="p-3">SL</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {calls.map(c => (
                          <tr key={c.id} className="hover:bg-slate-900/40">
                            <td className="p-3 font-bold text-white whitespace-nowrap">
                              {c.instrument}
                            </td>
                            <td className="p-3 text-slate-400">{c.segment}</td>
                            <td className="p-3">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  c.action === 'BUY' ? 'text-emerald-400' : 'text-rose-400'
                                }`}
                              >
                                {c.action}
                              </span>
                            </td>
                            <td className="p-3 tabular-nums">₹{c.entryPrice}</td>
                            <td className="p-3 tabular-nums text-emerald-400">
                              ₹{c.target1} / ₹{c.target2}
                            </td>
                            <td className="p-3 tabular-nums text-rose-400">₹{c.stopLoss}</td>
                            <td className="p-3">
                              <select
                                value={c.status}
                                onChange={e =>
                                  handleUpdateCallStatus(c.id, e.target.value as any)
                                }
                                className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-white"
                              >
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="TARGET_1_HIT">TARGET 1 HIT</option>
                                <option value="TARGET_2_HIT">TARGET 2 HIT</option>
                                <option value="SL_TRIGGERED">SL TRIGGERED</option>
                                <option value="CLOSED">CLOSED</option>
                              </select>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleDeleteCall(c.id)}
                                className="p-1 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                                title="Delete Call"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white font-display">Client Enquiries Log</h3>

                  <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">Lead Name</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Service</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {enquiries.map(enq => (
                          <tr key={enq.id} className="hover:bg-slate-900/40">
                            <td className="p-3 text-slate-400">{enq.createdAt}</td>
                            <td className="p-3 font-bold text-white">{enq.name}</td>
                            <td className="p-3 text-emerald-400">{enq.mobile}</td>
                            <td className="p-3 text-slate-400">{enq.email}</td>
                            <td className="p-3">{enq.interestedService}</td>
                            <td className="p-3">
                              <select
                                value={enq.status}
                                onChange={e =>
                                  handleUpdateEnquiryStatus(enq.id, e.target.value as any)
                                }
                                className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-white"
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="CLOSED">CLOSED</option>
                              </select>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="p-1 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: GRIEVANCES */}
              {activeTab === 'grievances' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white font-display">
                    Formal Grievance Register (SEBI Escalation Audit)
                  </h3>

                  <div className="space-y-4">
                    {grievances.map(g => (
                      <div
                        key={g.id}
                        className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                          <span className="font-bold text-emerald-400">{g.referenceNumber}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">{g.date}</span>
                            <select
                              value={g.status}
                              onChange={e =>
                                handleUpdateGrievance(
                                  g.id,
                                  e.target.value as any,
                                  g.resolutionNotes || 'Under investigation'
                                )
                              }
                              className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-white"
                            >
                              <option value="SUBMITTED">SUBMITTED</option>
                              <option value="UNDER_INVESTIGATION">UNDER INVESTIGATION</option>
                              <option value="RESOLVED">RESOLVED</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                          <div>
                            Applicant: <strong className="text-white">{g.name}</strong>
                          </div>
                          <div>Phone: {g.mobile}</div>
                          <div>Category: {g.category}</div>
                        </div>

                        <div className="p-3 bg-slate-900/60 rounded text-slate-300 text-xs">
                          {g.description}
                        </div>

                        {/* Resolution note editing */}
                        <div className="pt-2 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add or update official resolution notes..."
                            defaultValue={g.resolutionNotes || ''}
                            onBlur={e => handleUpdateGrievance(g.id, g.status, e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SITE STATS & SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettingsSubmit} className="space-y-6 text-xs font-mono">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white font-display">
                      Editable Trust & Statistics Counters
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-400 mb-1">Years of Research</label>
                        <input
                          type="text"
                          value={editableSettings.stats.yearsOfResearch}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              stats: {
                                ...editableSettings.stats,
                                yearsOfResearch: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Market Segments</label>
                        <input
                          type="text"
                          value={editableSettings.stats.marketSegments}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              stats: {
                                ...editableSettings.stats,
                                marketSegments: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Research Team Count</label>
                        <input
                          type="text"
                          value={editableSettings.stats.researchTeamCount}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              stats: {
                                ...editableSettings.stats,
                                researchTeamCount: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Published Notes Count</label>
                        <input
                          type="text"
                          value={editableSettings.stats.researchUpdatesCount}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              stats: {
                                ...editableSettings.stats,
                                researchUpdatesCount: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Support SLA</label>
                        <input
                          type="text"
                          value={editableSettings.stats.clientSupportSla}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              stats: {
                                ...editableSettings.stats,
                                clientSupportSla: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <h3 className="text-sm font-bold text-white font-display">
                      Contact & Compliance Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 mb-1">SEBI Registration No</label>
                        <input
                          type="text"
                          value={editableSettings.compliance.sebiRegNo}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              compliance: {
                                ...editableSettings.compliance,
                                sebiRegNo: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Compliance Officer</label>
                        <input
                          type="text"
                          value={editableSettings.compliance.complianceOfficerName}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              compliance: {
                                ...editableSettings.compliance,
                                complianceOfficerName: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Office Telephone</label>
                        <input
                          type="text"
                          value={editableSettings.contact.phone}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              contact: {
                                ...editableSettings.contact,
                                phone: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Research Desk Email</label>
                        <input
                          type="email"
                          value={editableSettings.contact.email}
                          onChange={e =>
                            setEditableSettings({
                              ...editableSettings,
                              contact: {
                                ...editableSettings.contact,
                                email: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Site Settings</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
