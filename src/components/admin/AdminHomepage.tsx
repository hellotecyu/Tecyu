import React, { useState } from 'react';
import { db } from '../../lib/database';
import { HomepageConfig } from '../../types';
import { Save, CheckCircle2, RotateCcw } from 'lucide-react';

export const AdminHomepage: React.FC = () => {
  const [config, setConfig] = useState<HomepageConfig>(() => db.getHomepageConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateHomepageConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleToggle = (key: keyof HomepageConfig) => {
    setConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Homepage Content Builder</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Customize hero headlines, CTA actions, and toggle public homepage sections.
          </p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Changes Published Live!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Section Copy */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px]">
            Hero Section Messaging
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Main Heading</label>
            <input
              type="text"
              required
              value={config.heroHeading}
              onChange={(e) => setConfig({ ...config, heroHeading: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subheading</label>
            <textarea
              rows={3}
              required
              value={config.heroSubheading}
              onChange={(e) => setConfig({ ...config, heroSubheading: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 text-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary CTA Button</label>
              <input
                type="text"
                required
                value={config.primaryCtaText}
                onChange={(e) => setConfig({ ...config, primaryCtaText: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Secondary CTA Button</label>
              <input
                type="text"
                required
                value={config.secondaryCtaText}
                onChange={(e) => setConfig({ ...config, secondaryCtaText: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Section Toggles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px]">
            Homepage Section Visibility
          </h2>
          <p className="text-xs text-slate-500">Enable or disable homepage modules instantly.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { key: 'showCapabilities', label: 'Trust & Core Capabilities Strip' },
              { key: 'showServices', label: 'Services Grid' },
              { key: 'showWhyUs', label: 'Why Choose TECYU Section' },
              { key: 'showProcess', label: '6-Stage Development Process Timeline' },
              { key: 'showProjects', label: 'Featured Portfolio Projects' },
              { key: 'showAiSpotlight', label: 'AI Solutions Spotlight' },
              { key: 'showTestimonials', label: 'Client Testimonials' },
              { key: 'showBlog', label: 'Recent Blog & Insights' },
              { key: 'showContactCta', label: 'Lead Generation CTA & Form' },
            ].map((sec) => {
              const k = sec.key as keyof HomepageConfig;
              const isEnabled = config[k] as boolean;
              return (
                <div
                  key={sec.key}
                  onClick={() => handleToggle(k)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isEnabled ? 'bg-blue-50/60 border-blue-200' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-800">{sec.label}</span>
                  <div
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                      isEnabled ? 'bg-[#2563EB]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isEnabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Homepage Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
