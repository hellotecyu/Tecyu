import React from 'react';
import { TecyuLogo } from './TecyuLogo';
import { db } from '../../lib/database';
import { MapPin, Mail, Phone, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const settings = db.getSettings();

  return (
    <footer className="bg-[#08152F] text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Address Column (Col Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-hidden"
              aria-label="TECYU Homepage"
            >
              <TecyuLogo variant="dark" size="md" tagline="Technology For You" />
            </button>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mt-2">
              Transforming businesses, startups, and enterprises with custom software engineering, intelligent AI automation, and high-performance digital platforms.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  {settings.addressLine1}, {settings.addressLine2}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Core Services
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('services/website-development')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services/software-development')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Custom Software & ERP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services/mobile-app-development')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Mobile Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services/artificial-intelligence-solutions')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Artificial Intelligence & RAG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services/digital-marketing')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Digital Marketing & SEO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services/cloud-devops')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Cloud & DevOps Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Industries */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">
                  About TECYU
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-cyan-400 transition-colors">
                  Client Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-cyan-400 transition-colors">
                  Industries We Serve
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('technologies')} className="hover:text-cyan-400 transition-colors">
                  Technology Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-cyan-400 transition-colors">
                  Careers & Openings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-cyan-400 transition-colors">
                  Tech Insights & Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Direct Access */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Governance & Access
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-cyan-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookies')} className="hover:text-cyan-400 transition-colors">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclaimer')} className="hover:text-cyan-400 transition-colors">
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{settings.copyrightText}</div>
          <div className="flex items-center gap-6">
            <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">
              LinkedIn
            </a>
            <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">
              X (Twitter)
            </a>
            <a href={settings.githubUrl} target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">
              GitHub
            </a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
