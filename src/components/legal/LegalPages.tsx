import React, { useState } from 'react';
import { db } from '../../lib/database';
import { ShieldCheck, FileText, Cookie, AlertCircle, ArrowLeft } from 'lucide-react';

interface LegalPagesProps {
  initialTab?: 'privacy' | 'terms' | 'cookies' | 'disclaimer';
  onNavigate: (path: string) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies' | 'disclaimer'>(initialTab);
  const settings = db.getSettings();

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>

          <h1 className="text-3xl font-extrabold text-[#08152F]">Legal & Compliance Information</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Governance, privacy standards, terms of engagement, and statutory disclaimers for TECYU.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveTab('cookies')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'cookies'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Cookie Policy
            </button>
            <button
              onClick={() => setActiveTab('disclaimer')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'disclaimer'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Disclaimer
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#08152F]">Privacy Policy</h2>
            <p className="text-slate-500 text-xs">Last Updated: March 2026</p>

            <p>
              At <strong>TECYU</strong> ("we", "us", or "our"), accessible at tecyu.com and our corporate registered office Opp. District Collectorate, Hanumangarh Junction, Rajasthan – 335512, India, we respect the privacy of our visitors and clients.
            </p>

            <h3 className="text-base font-bold text-[#08152F] pt-2">1. Information We Collect</h3>
            <p>
              When you submit a contact inquiry or job application, we collect your full name, email address, phone number, company name, project brief, and any attached documentation (such as RFPs or resumes).
            </p>

            <h3 className="text-base font-bold text-[#08152F] pt-2">2. How We Use Information</h3>
            <p>
              We use your information exclusively to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
              <li>Evaluate project requirements and deliver technical proposals.</li>
              <li>Coordinate discovery sessions and customer support.</li>
              <li>Assess employment candidates for open job vacancies.</li>
              <li>Maintain corporate audit logs and statutory business compliance.</li>
            </ul>

            <h3 className="text-base font-bold text-[#08152F] pt-2">3. Zero Third-Party Data Selling</h3>
            <p>
              We do not sell, rent, or trade your personal or business data to advertisers or third-party marketing brokers. All client communications and enterprise files remain confidential.
            </p>

            <h3 className="text-base font-bold text-[#08152F] pt-2">4. Contacting Our Data Officer</h3>
            <p>
              If you have questions regarding your data or wish to request data deletion, contact us at <strong>{settings.email}</strong> or by post at: Opp. District Collectorate, Hanumangarh Junction, Rajasthan – 335512, India.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#08152F]">Terms & Conditions of Service</h2>
            <p className="text-slate-500 text-xs">Last Updated: March 2026</p>

            <p>
              By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use.
            </p>

            <h3 className="text-base font-bold text-[#08152F] pt-2">1. Intellectual Property & Deliverables</h3>
            <p>
              All software, custom applications, and deliverables created under an executed Master Services Agreement (MSA) become the proprietary property of the respective client upon complete payment, in accordance with the terms of the individual Statement of Work (SOW).
            </p>

            <h3 className="text-base font-bold text-[#08152F] pt-2">2. Website Content</h3>
            <p>
              The content, brand wordmark, geometric logo, and design architecture on this website are protected under copyright and trademark laws. Unauthorized reproduction or reverse engineering without prior written consent from TECYU is prohibited.
            </p>

            <h3 className="text-base font-bold text-[#08152F] pt-2">3. Governing Jurisdiction</h3>
            <p>
              Any disputes arising out of or in connection with website use or services shall be subject to the exclusive jurisdiction of the competent courts in Hanumangarh, Rajasthan, India.
            </p>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#08152F]">Cookie Policy</h2>
            <p className="text-slate-500 text-xs">Last Updated: March 2026</p>

            <p>
              TECYU uses minimal, essential cookies and browser storage tokens solely to maintain user session security, preserve admin dashboard states, and remember user interface preferences.
            </p>

            <h3 className="text-base font-bold text-[#08152F] pt-2">1. Essential Technical Cookies</h3>
            <p>
              These tokens are required for core functionality, such as maintaining authentication states and preventing cross-site request forgery. They do not track your activity across unrelated websites.
            </p>

            <h3 className="text-base font-bold text-[#08152F] pt-2">2. Analytical Cookies (Optional)</h3>
            <p>
              Where configured by administration, anonymous aggregated metrics (such as page visit counts) may be gathered through Google Analytics 4 to help optimize website loading performance and documentation clarity.
            </p>
          </div>
        )}

        {activeTab === 'disclaimer' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#08152F]">Statutory Disclaimer</h2>
            <p className="text-slate-500 text-xs">Last Updated: March 2026</p>

            <p>
              The information provided on this website is for general informational and educational purposes only. While TECYU endeavors to keep all information up-to-date and technically accurate, we make no representations or warranties of any kind regarding completeness or suitability for any specific commercial application without a formalized scoping agreement.
            </p>

            <p>
              Case studies and verified results represent past client engagements under specific architectural conditions. Future outcomes may vary depending on business logic, hardware constraints, and third-party API dependencies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
