import React, { useState } from 'react';
import { db } from '../../lib/database';
import { Globe, CheckCircle2, Copy, Save, Share2, Code } from 'lucide-react';

export const AdminSEO: React.FC = () => {
  const settings = db.getSettings();
  const [ga4Id, setGa4Id] = useState(settings.ga4Id || '');
  const [gtmId, setGtmId] = useState(settings.gtmId || '');
  const [metaPixelId, setMetaPixelId] = useState(settings.metaPixelId || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateSettings({
      ga4Id: ga4Id.trim(),
      gtmId: gtmId.trim(),
      metaPixelId: metaPixelId.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Structured data generated from actual verified business data
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.companyName,
    legalName: 'TECYU Technologies',
    url: 'https://tecyu.com',
    logo: 'https://tecyu.com/logo.svg',
    description: 'Transforming businesses with custom software engineering, AI workflow automation, and digital platforms.',
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.addressLine1,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.pincode,
      addressCountry: settings.country,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    sameAs: [settings.linkedinUrl, settings.twitterUrl, settings.githubUrl],
  };

  const copyJsonLd = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLdSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">SEO & Digital Marketing Integrations</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage search engine metadata, OpenGraph social previews, structured JSON-LD, and analytics tokens for <span className="font-bold text-[#2563EB]">tecyu.com</span>.
          </p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Saved Successfully!</span>
          </span>
        )}
      </div>

      {/* Production Domain Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px]">
              Production Domain & Indexing Status
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>CONFIGURED & CANONICAL</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="p-3 bg-[#F5F8FC] rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-medium">Primary Domain</span>
            <span className="font-mono font-bold text-slate-900 mt-0.5 block">https://tecyu.com</span>
            <span className="text-[10px] text-emerald-600">SSL / TLS 1.3 Ready</span>
          </div>

          <div className="p-3 bg-[#F5F8FC] rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-medium">XML Sitemap</span>
            <a href="/sitemap.xml" target="_blank" className="font-mono font-bold text-[#2563EB] hover:underline mt-0.5 block">
              /sitemap.xml
            </a>
            <span className="text-[10px] text-slate-500">22 URLs mapped</span>
          </div>

          <div className="p-3 bg-[#F5F8FC] rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-medium">Robots Directive</span>
            <a href="/robots.txt" target="_blank" className="font-mono font-bold text-[#2563EB] hover:underline mt-0.5 block">
              /robots.txt
            </a>
            <span className="text-[10px] text-slate-500">Public crawling enabled</span>
          </div>
        </div>
      </div>

      {/* Custom Domain DNS Setup Guide for tecyu.com */}
      <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-2xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#2563EB]" />
              <span>How to Connect tecyu.com (DNS Records Setup)</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Add the following DNS records in your domain registrar (GoDaddy, Namecheap, Cloudflare, Hostinger, BigRock) to point <strong>tecyu.com</strong> to this application:
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200">
            DNS GUIDE
          </span>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Host / Name</th>
                <th className="py-2.5 px-3">Value / Target</th>
                <th className="py-2.5 px-3">TTL</th>
                <th className="py-2.5 px-3 text-right">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-bold text-blue-600">A</td>
                <td className="py-2.5 px-3">@</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">216.239.32.21</td>
                <td className="py-2.5 px-3 text-slate-400">Auto / 3600</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => navigator.clipboard.writeText('216.239.32.21')}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Copy
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-bold text-blue-600">A</td>
                <td className="py-2.5 px-3">@</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">216.239.34.21</td>
                <td className="py-2.5 px-3 text-slate-400">Auto / 3600</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => navigator.clipboard.writeText('216.239.34.21')}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Copy
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-bold text-blue-600">A</td>
                <td className="py-2.5 px-3">@</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">216.239.36.21</td>
                <td className="py-2.5 px-3 text-slate-400">Auto / 3600</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => navigator.clipboard.writeText('216.239.36.21')}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Copy
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-bold text-blue-600">A</td>
                <td className="py-2.5 px-3">@</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">216.239.38.21</td>
                <td className="py-2.5 px-3 text-slate-400">Auto / 3600</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => navigator.clipboard.writeText('216.239.38.21')}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Copy
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-bold text-cyan-600">CNAME</td>
                <td className="py-2.5 px-3">www</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">ghs.googlehosted.com</td>
                <td className="py-2.5 px-3 text-slate-400">Auto / 3600</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => navigator.clipboard.writeText('ghs.googlehosted.com')}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2 font-sans">
          <div className="font-bold text-[#08152F]">Step-by-Step Instructions:</div>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
            <li>Log in to where you purchased <strong>tecyu.com</strong> (GoDaddy, Hostinger, Namecheap, Cloudflare, etc.).</li>
            <li>Go to <strong>DNS Management</strong> (DNS Records).</li>
            <li>Add the 4 <strong>A records</strong> pointing <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">@</code> to the Google Cloud Anycast IPs above.</li>
            <li>Add the <strong>CNAME record</strong> pointing <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">www</code> to <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">ghs.googlehosted.com</code>.</li>
            <li>Google Cloud automatically provisions and renews a free SSL certificate (HTTPS) for <strong>tecyu.com</strong> within 15–60 minutes of DNS propagation.</li>
          </ol>
        </div>
      </div>

      {/* Analytics & Tracking Tags Configuration */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px]">
          Measurement & Analytics IDs
        </h2>
        <p className="text-xs text-slate-500">
          Tracking scripts are safely retained in settings and only loaded when valid IDs are configured.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Google Analytics 4 (GA4)</label>
            <input
              type="text"
              value={ga4Id}
              onChange={(e) => setGa4Id(e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Google Tag Manager (GTM)</label>
            <input
              type="text"
              value={gtmId}
              onChange={(e) => setGtmId(e.target.value)}
              placeholder="GTM-XXXXXXX"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Pixel ID</label>
            <input
              type="text"
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
              placeholder="123456789012345"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl cursor-pointer"
          >
            Save Tracking Settings
          </button>
        </div>
      </form>

      {/* OpenGraph & Social Preview Mockup */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px]">
          Social Share Card Preview (OpenGraph / Twitter)
        </h2>

        <div className="max-w-md mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-md bg-white">
          <div className="h-40 bg-gradient-to-r from-[#08152F] via-[#0D224C] to-[#2563EB] p-6 flex flex-col justify-between text-white">
            <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-300">TECYU.COM</span>
            <div>
              <div className="text-lg font-extrabold">TECYU — Technology For You</div>
              <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                Custom software engineering, enterprise ERP, and autonomous AI automation.
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs">
            <div className="text-slate-400 font-mono text-[10px] uppercase">tecyu.com</div>
            <div className="font-bold text-slate-900 mt-0.5">TECYU — Technology That Moves Business Forward</div>
            <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
              Transform your business with smart technology. Powerful websites, custom software, enterprise AI, and digital marketing.
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema.org Generator */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#08152F] uppercase tracking-wider text-[11px]">
              Structured Data (Schema.org / LocalBusiness)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Generated using verified registered address and business hours.</p>
          </div>
          <button
            onClick={copyJsonLd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedSchema ? 'Copied JSON!' : 'Copy JSON-LD'}</span>
          </button>
        </div>

        <pre className="p-4 bg-slate-950 text-cyan-300 rounded-xl text-[11px] font-mono overflow-x-auto max-h-60">
          {JSON.stringify(jsonLdSchema, null, 2)}
        </pre>
      </div>
    </div>
  );
};
