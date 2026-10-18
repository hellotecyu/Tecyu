import React, { useState } from 'react';
import { db } from '../../lib/database';
import { TecyuLogo, LogoVariant } from '../common/TecyuLogo';
import { Save, CheckCircle2, RotateCcw, Palette, Image as ImageIcon } from 'lucide-react';

export const AdminBranding: React.FC = () => {
  const [settings, setSettings] = useState(() => db.getSettings());
  const [tagline, setTagline] = useState(settings.tagline);
  const [secondaryTagline, setSecondaryTagline] = useState(settings.secondaryTagline);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateSettings({
      tagline: tagline.trim(),
      secondaryTagline: secondaryTagline.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRestoreDefaults = () => {
    if (confirm('Reset branding tagline and logos to default TECYU specifications?')) {
      const reset = db.resetSettings();
      setSettings(reset);
      setTagline(reset.tagline);
      setSecondaryTagline(reset.secondaryTagline);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Brand Identity & Logo System</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure company wordmarks, brand taglines, and preview vector logo variations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Branding Saved!</span>
            </span>
          )}
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </div>

      {/* Tagline Editor */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px]">
          Company Tagline Settings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Brand Tagline (Under Wordmark)
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Secondary Corporate Tagline
            </label>
            <input
              type="text"
              required
              value={secondaryTagline}
              onChange={(e) => setSecondaryTagline(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-medium"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl cursor-pointer"
          >
            Update Taglines
          </button>
        </div>
      </form>

      {/* 5 LOGO VARIATIONS PREVIEW GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#08152F]">
            Brand Identity Variations (Derived from Reference Specification)
          </h2>
          <span className="text-xs text-slate-400">Scalable Vector SVGs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Variant 1: Primary Logo */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-700">1. Primary Centered Logo</span>
              <span>Light Surfaces</span>
            </div>
            <div className="py-6 flex items-center justify-center">
              <TecyuLogo variant="primary" size="lg" tagline={tagline} />
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              Usage: Splash headers, centered presentations, corporate documentation.
            </div>
          </div>

          {/* Variant 2: Horizontal Logo */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-700">2. Horizontal Nav Logo</span>
              <span>Sticky Navigation</span>
            </div>
            <div className="py-6 flex items-center justify-center">
              <TecyuLogo variant="horizontal" size="md" />
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              Usage: Top desktop navigation bar, headers with vertical tagline divider.
            </div>
          </div>

          {/* Variant 3: Dark Background Logo */}
          <div className="bg-[#08152F] p-6 rounded-2xl border border-slate-800 shadow-2xs space-y-3 text-white">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold text-white">3. Dark Background Logo</span>
              <span>Deep Navy / Black</span>
            </div>
            <div className="py-6 flex items-center justify-center">
              <TecyuLogo variant="dark" size="lg" tagline={tagline} />
            </div>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              Usage: Website footer, dark hero banners, executive black tie pitch decks.
            </div>
          </div>

          {/* Variant 4: Compact Logo & 5: Favicon */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-700">4. Compact Wordmark & 5. Favicon</span>
              <span>Mobile & App Icon</span>
            </div>
            <div className="py-4 flex items-center justify-around gap-6">
              <div className="text-center space-y-2">
                <TecyuLogo variant="compact" size="md" />
                <span className="text-[10px] text-slate-400 block font-mono">Compact</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-200" />
              <div className="text-center space-y-2">
                <TecyuLogo variant="icon" size="md" />
                <span className="text-[10px] text-slate-400 block font-mono">App Icon (T)</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              Usage: Mobile top bar, browser tab favicon, social media square avatars.
            </div>
          </div>
        </div>
      </div>

      {/* Brand Color Swatches (As instructed) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Official Brand Palette</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#08152F]" />
            <div>
              <div className="font-bold text-xs text-slate-900">#08152F</div>
              <div className="text-[10px] text-slate-500">Primary Deep Navy</div>
            </div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#2563EB]" />
            <div>
              <div className="font-bold text-xs text-slate-900">#2563EB</div>
              <div className="text-[10px] text-slate-500">Secondary Electric Blue</div>
            </div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#06B6D4]" />
            <div>
              <div className="font-bold text-xs text-slate-900">#06B6D4</div>
              <div className="text-[10px] text-slate-500">Accent Cyan</div>
            </div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="w-full h-12 rounded-lg bg-[#64748B]" />
            <div>
              <div className="font-bold text-xs text-slate-900">#64748B</div>
              <div className="text-[10px] text-slate-500">Muted Slate Text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
