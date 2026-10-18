import React, { useState } from 'react';
import { db, INITIAL_SETTINGS } from '../../lib/database';
import { SiteSettings } from '../../types';
import { Save, CheckCircle2, RotateCcw, Building2, MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => db.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetToDefault = () => {
    if (confirm('Reset contact information to verified default address and parameters?')) {
      const reset = db.updateSettings(INITIAL_SETTINGS);
      setSettings(reset);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Business & Contact Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure company registered office address, phone numbers, WhatsApp, and social media links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Settings Saved!</span>
            </span>
          )}
          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Company Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Company Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company Legal Name</label>
              <input
                type="text"
                required
                value={settings.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Copyright Notice</label>
              <input
                type="text"
                required
                value={settings.copyrightText}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Physical Office Address */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Registered Office Location</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Address Line 1</label>
              <input
                type="text"
                required
                value={settings.addressLine1}
                onChange={(e) => handleChange('addressLine1', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Address Line 2 (State & PIN)</label>
              <input
                type="text"
                required
                value={settings.addressLine2}
                onChange={(e) => handleChange('addressLine2', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={settings.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Postal Code</label>
              <input
                type="text"
                value={settings.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                value={settings.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              value={settings.googleMapsEmbedUrl}
              onChange={(e) => handleChange('googleMapsEmbedUrl', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>Public Contact Methods</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Corporate Email Address</label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="waEnable"
                checked={settings.isWhatsAppEnabled}
                onChange={(e) => handleChange('isWhatsAppEnabled', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              <label htmlFor="waEnable" className="font-semibold text-slate-700 cursor-pointer">
                Display Floating WhatsApp Chat Button on Website
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Working Hours</label>
            <input
              type="text"
              value={settings.businessHours}
              onChange={(e) => handleChange('businessHours', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
        </div>

        {/* Social Profiles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Social Network URLs</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">LinkedIn Page</label>
              <input
                type="url"
                value={settings.linkedinUrl}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">X (Twitter)</label>
              <input
                type="url"
                value={settings.twitterUrl}
                onChange={(e) => handleChange('twitterUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">GitHub Organization</label>
              <input
                type="url"
                value={settings.githubUrl}
                onChange={(e) => handleChange('githubUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Facebook Page</label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
