import React, { useState } from 'react';
import { Menu, X, Shield, PhoneCall, ChevronRight, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onOpenRiskAssessment: () => void;
  onOpenAdmin: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenEnquiry,
  onOpenRiskAssessment,
  onOpenAdmin,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'stock-search', label: 'Stock Search' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'performance', label: 'Performance' },
    { id: 'reports', label: 'Research Reports' },
    { id: 'calls', label: 'Live Calls' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* ZONE 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            aria-label="ArthaNivesh Financial Research"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-2">
                <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              Artha<span className="text-emerald-400">Nivesh</span>
            </span>
          </button>

          {/* ZONE 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
            {navLinks.slice(0, 7).map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 ${
                  activeTab === link.id
                    ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Overflow link dropdown for Compliance & Contact */}
            <div className="relative group py-1">
              <button
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'compliance' || activeTab === 'contact'
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                More
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block w-44 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2 z-50">
                <button
                  onClick={() => handleNavClick('compliance')}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
                >
                  Compliance & SCORES
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
                >
                  Contact & Support
                </button>
                <button
                  onClick={onOpenRiskAssessment}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
                >
                  Risk Assessment
                </button>
              </div>
            </div>
          </nav>

          {/* ZONE 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Talk to Expert</span>
            </button>
            <button
              onClick={onOpenRiskAssessment}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={onOpenAdmin}
              title="Admin Portal"
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to White / Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-slate-700/80 flex items-center gap-1.5"
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-mono text-slate-300 hidden xl:inline">White Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-sky-600" />
                  <span className="text-[11px] font-mono text-slate-700 hidden xl:inline">Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleTheme}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg border border-slate-700/80"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-600" />
              )}
            </button>
            <button
              onClick={() => onOpenEnquiry()}
              className="px-2.5 py-1.5 text-xs font-medium text-emerald-400 border border-emerald-500/30 rounded-lg"
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-1 text-sm animate-in fade-in">
          {/* Quick theme switch inside drawer */}
          <div className="flex items-center justify-between px-3 py-2 mb-2 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">Appearance Mode:</span>
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-200"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Switch to White Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                activeTab === link.id
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRiskAssessment();
              }}
              className="w-full py-2.5 text-xs font-semibold text-center text-slate-950 bg-emerald-400 rounded-lg"
            >
              Free Risk Suitability Assessment
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-2.5 text-xs font-semibold text-center text-slate-200 border border-slate-700 rounded-lg"
            >
              Request a Callback from Research Desk
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 text-center"
            >
              Admin Portal Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
