import React, { useState } from 'react';
import { db } from '../../lib/database';
import { ServiceItem } from '../../types';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe,
  Code,
  Smartphone,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Cloud,
  Palette,
  Cpu,
  ShieldCheck,
  Layers,
  ArrowLeft,
  Calendar,
} from 'lucide-react';

interface ServicesPageProps {
  selectedSlug?: string;
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ selectedSlug, onNavigate }) => {
  const services = db.getServices().filter((s) => s.isPublished);
  const projects = db.getProjects().filter((p) => p.isPublished);
  const activeService = selectedSlug ? services.find((s) => s.slug === selectedSlug) : null;

  // Selected Category filter for index view
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Consultation form inside service detail
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMobile, setFormMobile] = useState('');
  const [formBudget, setFormBudget] = useState('$5,000 - $10,000');
  const [formDesc, setFormDesc] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(services.map((s) => s.category)))];

  const filteredServices =
    activeCategory === 'all' ? services : services.filter((s) => s.category === activeCategory);

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    Smartphone: <Smartphone className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    TrendingUp: <TrendingUp className="w-5 h-5" />,
    ShoppingBag: <ShoppingBag className="w-5 h-5" />,
    Cloud: <Cloud className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formDesc.trim() || !activeService) return;

    const lead = db.submitInquiry({
      fullName: formName.trim(),
      email: formEmail.trim(),
      mobile: formMobile.trim() || 'N/A',
      serviceId: activeService.id,
      serviceName: activeService.title,
      budget: formBudget,
      message: formDesc.trim(),
      consentPrivacy: true,
    });

    setSubmittedRef(lead.refNumber);
    setFormName('');
    setFormEmail('');
    setFormMobile('');
    setFormDesc('');
  };

  // IF AN INDIVIDUAL SERVICE IS SELECTED -> RENDER FULL SERVICE DETAIL PAGE
  if (activeService) {
    const relatedProjects = projects.filter(
      (p) =>
        p.serviceCategory.toLowerCase().includes(activeService.title.toLowerCase()) ||
        activeService.title.toLowerCase().includes(p.serviceCategory.toLowerCase())
    );
    const relatedServices = services.filter((s) => s.id !== activeService.id).slice(0, 3);

    return (
      <div className="pt-24 pb-20">
        {/* Service Hero */}
        <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </button>

            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="text-[#2563EB]">{activeService.category}</span>
                <span aria-hidden="true">·</span>
                <span>TECYU Practice</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
                {activeService.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {activeService.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content Body Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Cols: Overview, Features, Benefits, Methodology, FAQs */}
            <div className="lg:col-span-8 space-y-16">
              {/* Key Features & Deliverables */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#08152F] mb-6">
                  Key Capabilities & Deliverables
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeService.features.map((feat, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-800 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Benefits */}
              <div className="p-8 bg-[#F5F8FC] rounded-2xl border border-slate-200">
                <h2 className="text-xl font-bold text-[#08152F] mb-4">
                  Why It Matters for Your Business
                </h2>
                <div className="space-y-3">
                  {activeService.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-2" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <h2 className="text-xl font-bold text-[#08152F] mb-4">
                  Technologies & Frameworks
                </h2>
                <div className="flex flex-wrap gap-2">
                  {activeService.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono font-medium text-slate-700 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Development Methodology */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#08152F] mb-6">
                  Our Engineering Methodology
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeService.methodology.map((m, idx) => (
                    <div key={idx} className="p-5 bg-white rounded-xl border border-slate-200 relative">
                      <span className="text-xs font-mono font-bold text-[#2563EB] block mb-1">{m.step}</span>
                      <h3 className="text-sm font-bold text-[#08152F]">{m.title}</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{m.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#08152F] mb-6">
                    Relevant Projects Delivered
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedProjects.map((p) => (
                      <div key={p.id} className="p-5 bg-[#F5F8FC] rounded-xl border border-slate-200">
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider">{p.client}</div>
                        <h3 className="text-sm font-bold text-[#08152F] mt-1">{p.title}</h3>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2">{p.description}</p>
                        <button
                          onClick={() => onNavigate(`portfolio?slug=${p.slug}`)}
                          className="mt-3 text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Case Study</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Frequently Asked Questions */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#08152F] mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {activeService.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-[#08152F] hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaqIndex === idx && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Sticky Inquiry Card & Related Services */}
            <div className="lg:col-span-4 space-y-8">
              {/* Sticky Form */}
              <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#08152F]">
                    Inquire About {activeService.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect directly with our engineering team for a detailed scoping conversation.
                  </p>
                </div>

                {submittedRef ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    <div className="text-xs font-bold text-emerald-900">Inquiry Logged!</div>
                    <div className="text-[11px] text-emerald-700">Ref: {submittedRef}</div>
                    <button
                      onClick={() => setSubmittedRef(null)}
                      className="text-xs text-[#2563EB] underline block mx-auto pt-2"
                    >
                      New Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="ramesh@company.com"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formMobile}
                        onChange={(e) => setFormMobile(e.target.value)}
                        placeholder="+91 98290 00000"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Estimated Budget</label>
                      <select
                        value={formBudget}
                        onChange={(e) => setFormBudget(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      >
                        <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000+">$25,000+ Enterprise</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Project Details *</label>
                      <textarea
                        rows={3}
                        required
                        value={formDesc}
                        onChange={(e) => setFormDesc(e.target.value)}
                        placeholder="Key objectives, scope, or timeline..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Request Proposal
                    </button>
                  </form>
                )}

                {/* Related Services Links */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 mb-2">Related Capabilities</div>
                  <div className="space-y-1.5">
                    {relatedServices.map((rs) => (
                      <button
                        key={rs.id}
                        onClick={() => onNavigate(`services/${rs.slug}`)}
                        className="w-full text-left text-xs text-slate-600 hover:text-[#2563EB] py-1 block truncate"
                      >
                        → {rs.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: SERVICES INDEX LISTING VIEW
  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Enterprise Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
            Our Technology Services
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            From modern web applications and custom ERP software to autonomous AI agents and cloud infrastructure, explore our 10 core capability areas.
          </p>

          {/* Interactive filter control */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Services' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of All 10 Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {iconMap[service.iconName] || <Code className="w-5 h-5 text-blue-600" />}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">{service.category}</span>
                </div>

                <h3 className="text-lg font-bold text-[#08152F] group-hover:text-[#2563EB] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features Included</div>
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {service.technologies.slice(0, 2).join(' · ')}
                </span>
                <button
                  onClick={() => onNavigate(`services/${service.slug}`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
