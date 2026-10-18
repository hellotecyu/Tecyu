import React, { useState, useEffect } from 'react';
import { TecyuLogo } from './TecyuLogo';
import { ChevronDown, Menu, X, ArrowRight, ShieldCheck, Sparkles, Building2, Phone } from 'lucide-react';
import { db } from '../../lib/database';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const settings = db.getSettings();
  const services = db.getServices().filter((s) => s.isPublished);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setCompanyDropdown(false);
  };

  const isCurrent = (path: string) => {
    if (path === 'home') return currentPath === 'home' || currentPath === '';
    return currentPath.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Element */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-hidden group shrink-0"
            aria-label="TECYU Homepage"
          >
            <TecyuLogo variant="horizontal" size="sm" />
          </button>

          {/* Zone 2: Clean 4–5 single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                isCurrent('home') ? 'text-[#2563EB] font-semibold' : 'hover:text-slate-950'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className={`flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrent('services') ? 'text-[#2563EB] font-semibold' : 'hover:text-slate-950'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${servicesDropdown ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-2 py-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 pb-2 border-b border-slate-100 mb-1">
                      Our Solutions
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {services.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => handleNavClick(`services/${srv.slug}`)}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between group"
                        >
                          <span className="truncate">{srv.title}</span>
                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[#2563EB] shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-slate-100 mt-2 px-3">
                      <button
                        onClick={() => handleNavClick('services')}
                        className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
                      >
                        <span>View All 10 Services</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('portfolio')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                isCurrent('portfolio') ? 'text-[#2563EB] font-semibold' : 'hover:text-slate-950'
              }`}
            >
              Portfolio
            </button>

            <button
              onClick={() => handleNavClick('industries')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                isCurrent('industries') ? 'text-[#2563EB] font-semibold' : 'hover:text-slate-950'
              }`}
            >
              Industries
            </button>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyDropdown(true)}
              onMouseLeave={() => setCompanyDropdown(false)}
            >
              <button
                onClick={() => handleNavClick('about')}
                className={`flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrent('about') || isCurrent('careers') ? 'text-[#2563EB] font-semibold' : 'hover:text-slate-950'
                }`}
              >
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${companyDropdown ? 'rotate-180' : ''}`} />
              </button>

              {companyDropdown && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-2 py-2">
                    <button
                      onClick={() => handleNavClick('about')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      About Us & Mission
                    </button>
                    <button
                      onClick={() => handleNavClick('careers')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>Careers & Hiring</span>
                      <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">Hiring</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('technologies')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      Technology Stack
                    </button>
                    <button
                      onClick={() => handleNavClick('blog')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      Insights & Blog
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                isCurrent('contact') ? 'text-[#2563EB] font-semibold' : 'hover:text-slate-950'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-xs hover:shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Get Consultation</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2.5 px-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Home
            </button>

            <div className="py-2 border-y border-slate-100">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">Services</div>
              {services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => handleNavClick(`services/${srv.slug}`)}
                  className="w-full text-left py-1.5 px-3 text-xs text-slate-700 hover:text-blue-600 block"
                >
                  {srv.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-left py-2 px-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Portfolio & Case Studies
            </button>
            <button
              onClick={() => handleNavClick('industries')}
              className="text-left py-2 px-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Industries We Serve
            </button>
            <button
              onClick={() => handleNavClick('technologies')}
              className="text-left py-2 px-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Technologies
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 px-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              About TECYU
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className="text-left py-2 px-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Careers
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left py-2 px-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Insights & Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Contact Us
            </button>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-center py-2.5 px-4 text-xs font-semibold text-white bg-[#2563EB] rounded-lg"
              >
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
