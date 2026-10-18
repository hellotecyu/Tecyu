import React, { useState } from 'react';
import { HeroVisual } from './HeroVisual';
import { db } from '../../lib/database';
import {
  ArrowRight,
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
  CheckCircle2,
  Calendar,
  Layers,
  FileCheck,
  Zap,
  Users,
  MessageSquare,
  Lock,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const settings = db.getSettings();
  const config = db.getHomepageConfig();
  const services = db.getServices().filter((s) => s.isPublished);
  const featuredProjects = db.getProjects().filter((p) => p.isPublished && p.isFeatured);
  const testimonials = db.getTestimonials().filter((t) => t.isApproved && t.isFeatured);
  const blogs = db.getBlogs().filter((b) => b.isPublished).slice(0, 3);

  // Quick inquiry state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryService, setInquiryService] = useState('Website Development');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState<string | null>(null);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) return;

    const matchedService = services.find((s) => s.title === inquiryService);
    const newLead = db.submitInquiry({
      fullName: inquiryName.trim(),
      email: inquiryEmail.trim(),
      mobile: 'Provided via Web Quick Form',
      serviceId: matchedService ? matchedService.id : 'srv-1',
      serviceName: inquiryService,
      message: inquiryMessage.trim(),
      consentPrivacy: true,
    });

    setInquirySubmitted(newLead.refNumber);
    setInquiryName('');
    setInquiryEmail('');
    setInquiryMessage('');
  };

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-5 h-5 text-[#2563EB]" />,
    Code: <Code className="w-5 h-5 text-[#2563EB]" />,
    Smartphone: <Smartphone className="w-5 h-5 text-[#2563EB]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-cyan-500" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-[#2563EB]" />,
    ShoppingBag: <ShoppingBag className="w-5 h-5 text-[#2563EB]" />,
    Cloud: <Cloud className="w-5 h-5 text-[#2563EB]" />,
    Palette: <Palette className="w-5 h-5 text-[#2563EB]" />,
    Cpu: <Cpu className="w-5 h-5 text-[#2563EB]" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#2563EB]" />,
  };

  return (
    <div className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Quiet unboxed text kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500">
                <span className="text-[#2563EB]">TECYU Solutions</span>
                <span aria-hidden="true">·</span>
                <span>Hanumangarh, Rajasthan, India</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#08152F] tracking-tight leading-[1.15] text-balance">
                {config.heroHeading}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                {config.heroSubheading}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>{config.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#08152F] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  <span>{config.secondaryCtaText}</span>
                </button>
              </div>

              {/* Verified Capability Proof Points */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quality</div>
                  <div className="text-sm font-bold text-[#08152F] mt-0.5">Strict TypeScript</div>
                  <div className="text-[11px] text-slate-500">Zero-vulnerability audits</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Architecture</div>
                  <div className="text-sm font-bold text-[#08152F] mt-0.5">Custom ERP & AI</div>
                  <div className="text-[11px] text-slate-500">No per-seat SaaS bloat</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reliability</div>
                  <div className="text-sm font-bold text-[#08152F] mt-0.5">99.9% Uptime</div>
                  <div className="text-[11px] text-slate-500">SLA-backed engineering</div>
                </div>
              </div>
            </div>

            {/* Hero Right Column (5 cols) */}
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST & CORE CAPABILITIES */}
      {config.showCapabilities && (
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                Engineering Discipline
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#08152F] tracking-tight">
                Full-Lifecycle Digital Transformation
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                We engineer scalable digital software platforms, autonomous AI workflows, and robust cloud architectures for organizations seeking long-term operational velocity.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { title: 'Web Development', desc: 'Corporate & Web Apps', path: 'services/website-development', icon: Globe },
                { title: 'Software Engineering', desc: 'Custom ERPs & CRMs', path: 'services/software-development', icon: Code },
                { title: 'AI & Automation', desc: 'Autonomous Agents & RAG', path: 'services/artificial-intelligence-solutions', icon: Sparkles },
                { title: 'Digital Marketing', desc: 'Technical SEO & Ads', path: 'services/digital-marketing', icon: TrendingUp },
                { title: 'Cloud Solutions', desc: 'AWS/GCP & DevOps', path: 'services/cloud-devops', icon: Cloud },
                { title: 'IT Consulting', desc: 'Enterprise Advisory', path: 'services/it-consulting', icon: ShieldCheck },
              ].map((cap, i) => {
                const IconComponent = cap.icon;
                return (
                  <button
                    key={i}
                    onClick={() => onNavigate(cap.path)}
                    className="group p-5 bg-[#F5F8FC] hover:bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                        {cap.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">{cap.desc}</div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: SERVICES MODULE */}
      {config.showServices && (
        <section className="py-20 bg-[#F5F8FC] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                  What We Build
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08152F] tracking-tight">
                  Comprehensive Technology Services
                </h2>
                <p className="text-sm text-slate-600 mt-2 max-w-xl">
                  Each solution is designed, coded, and maintained to meet your precise operational requirements.
                </p>
              </div>

              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-2xs hover:shadow-xs transition-all whitespace-nowrap self-start md:self-auto cursor-pointer"
              >
                <span>View All 10 Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-lg hover:border-blue-300 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
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

                    {/* Features list */}
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                      <span>{service.technologies.slice(0, 2).join(' · ')}</span>
                    </div>
                    <button
                      onClick={() => onNavigate(`services/${service.slug}`)}
                      className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: WHY CHOOSE TECYU? */}
      {config.showWhyUs && (
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                Built For Longevity
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08152F] tracking-tight">
                Why Enterprises Partner with TECYU
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                We reject brittle templates and generic subscription compromises. Our engineering methodology is grounded in clean architectures, verified data protection, and ongoing operational support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Custom-Built Solutions',
                  desc: 'Engineered from the ground up around your operational workflows and intellectual property requirements—never generic cookie-cutter templates.',
                  icon: Layers,
                },
                {
                  title: 'Modern Technology Stack',
                  desc: 'Built with TypeScript, React, Next.js, Python, PostgreSQL, and Docker for high maintainability and developer velocity.',
                  icon: Code,
                },
                {
                  title: 'Scalable Architecture',
                  desc: 'High-availability infrastructure supporting tens of thousands of concurrent users with sub-second response times.',
                  icon: Cpu,
                },
                {
                  title: 'Transparent Communication',
                  desc: 'Bi-weekly sprint demos, shared roadmap boards, and direct access to senior solutions architects throughout delivery.',
                  icon: Users,
                },
                {
                  title: 'Security-First Development',
                  desc: 'Strict role-based access control, encrypted databases at rest and in transit, and continuous OWASP compliance audits.',
                  icon: Lock,
                },
                {
                  title: 'Long-Term Technical Support',
                  desc: 'Committed SLA-backed maintenance, server health monitoring, security patches, and phased feature iterations.',
                  icon: ShieldCheck,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 rounded-xl border border-slate-200/80 bg-[#F5F8FC]/50 hover:bg-white hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#08152F]">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: DEVELOPMENT PROCESS TIMELINE */}
      {config.showProcess && (
        <section className="py-20 bg-[#F5F8FC] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                Execution Methodology
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08152F] tracking-tight">
                Our Structured 6-Stage Process
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                A predictable, disciplined engineering path from initial consultation to mission-critical deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { step: '01', title: 'Discovery', desc: 'Requirements analysis, stakeholder interviews, and architecture blueprinting.' },
                { step: '02', title: 'Planning', desc: 'Sprint schedules, relational schema definitions, and technical scoping.' },
                { step: '03', title: 'UI/UX Design', desc: 'Figma wireframes, design systems, and clickable interactive prototypes.' },
                { step: '04', title: 'Development', desc: 'Agile coding sprints in TypeScript and Python with automated CI/CD checks.' },
                { step: '05', title: 'QA & Testing', desc: 'Security penetration testing, unit tests, and cross-browser stress tests.' },
                { step: '06', title: 'Deployment', desc: 'Zero-downtime launch, staff documentation, and proactive 24/7 monitoring.' },
              ].map((st, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-200/80 relative flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#2563EB] block mb-2">{st.step}</span>
                    <h3 className="text-sm font-bold text-[#08152F]">{st.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: FEATURED PROJECTS */}
      {config.showProjects && (
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                  Proven Delivery
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08152F] tracking-tight">
                  Featured Case Studies
                </h2>
                <p className="text-sm text-slate-600 mt-2 max-w-xl">
                  Explore how custom software and intelligent automation generated verifiable business velocity for our clients.
                </p>
              </div>

              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-2xs hover:shadow-xs transition-all whitespace-nowrap self-start md:self-auto cursor-pointer"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#F5F8FC]/50 rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all group"
                >
                  <div>
                    {/* Visual Card Banner */}
                    <div className={`h-44 bg-gradient-to-br ${project.thumbnailGradient} p-5 flex flex-col justify-between text-white relative`}>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="font-semibold text-cyan-300">{project.industry}</span>
                        <span>{project.completionDate}</span>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium">{project.client}</div>
                        <div className="text-base font-bold text-white mt-0.5 line-clamp-1">{project.title}</div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Verified Result Strip */}
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 space-y-1.5">
                        <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">Verified Outcome</div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{project.verifiedResults[0]}</span>
                        </div>
                      </div>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => onNavigate(`portfolio?slug=${project.slug}`)}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-white bg-white hover:bg-[#2563EB] border border-slate-200 hover:border-[#2563EB] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: AI SOLUTIONS SPOTLIGHT */}
      {config.showAiSpotlight && (
        <section className="py-20 bg-[#08152F] text-white relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Artificial Intelligence Practice</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Make Your Business Smarter with AI.
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Bridge the gap between AI research and practical operational throughput. TECYU deploys custom autonomous agents that automate complex administrative work while strictly guarding company data confidentiality.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { title: 'AI Chatbots & Support', desc: 'Context-aware 24/7 customer resolution linked directly to CRM data.' },
                    { title: 'AI Business Agents', desc: 'Autonomous execution of multi-step business logic across databases.' },
                    { title: 'Workflow Automation', desc: 'Trigger smart actions based on incoming customer emails and transactions.' },
                    { title: 'Document & OCR Intelligence', desc: 'Instant extraction of tabular data from PDFs, bills, and tax forms.' },
                    { title: 'AI-Powered Analytics', desc: 'Predictive churn and sales forecasting models trained on internal metrics.' },
                    { title: 'Private RAG Knowledge Bases', desc: 'Zero data leakage guarantee with private cloud VPC vector deployments.' },
                  ].map((feat, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-cyan-300">{feat.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">{feat.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('services/artificial-intelligence-solutions')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-[#08152F] bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    <span>Explore AI Solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Visual Terminal Container */}
              <div className="lg:col-span-6 bg-slate-950/90 rounded-2xl border border-slate-800 p-6 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>tecyu-ai-agent-v1.4</span>
                  <span className="text-emerald-400">READY</span>
                </div>
                <div className="space-y-3 py-4 text-slate-300 text-[11px] leading-relaxed">
                  <div className="text-cyan-400">&gt; Loading document: Q1_Procurement_Invoices.pdf [34 pages]</div>
                  <div>&gt; Optical character recognition: Extracted 142 invoice lines.</div>
                  <div>&gt; Calculating tax variances against State GST guidelines...</div>
                  <div className="text-amber-400">&gt; 2 discrepancies detected and flagged for human review.</div>
                  <div className="text-emerald-400">&gt; 140 validated lines synced into PostgreSQL ERP ledger.</div>
                  <div className="text-slate-400">&gt; Batch completed in 14.8 seconds (99.6% human labor saved).</div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Grounding: Verified Document Sources</span>
                  <span className="text-cyan-400">Zero Hallucination Mode</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: GENUINE TESTIMONIALS */}
      {config.showTestimonials && (
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                Client Verification
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08152F] tracking-tight">
                What Leaders Say About Working with TECYU
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Real feedback from business leaders who deployed TECYU software and AI systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-[#F5F8FC]/60 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-200/80">
                    <div className="text-xs font-bold text-[#08152F]">{t.clientName}</div>
                    <div className="text-[11px] text-slate-500">{t.designation}, {t.company}</div>
                    <div className="text-[10px] text-[#2563EB] font-medium mt-1">Verified: {t.verifiedOutcome}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9: LATEST INSIGHTS & BLOG */}
      {config.showBlog && (
        <section className="py-20 bg-[#F5F8FC] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                  Engineering Insights
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08152F] tracking-tight">
                  Latest from TECYU Insights
                </h2>
                <p className="text-sm text-slate-600 mt-2 max-w-xl">
                  Deep-dives into software architecture, enterprise AI deployments, and conversion engineering.
                </p>
              </div>

              <button
                onClick={() => onNavigate('blog')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-2xs hover:shadow-xs transition-all whitespace-nowrap self-start md:self-auto cursor-pointer"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3">
                      <span className="font-semibold text-[#2563EB]">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#08152F] group-hover:text-[#2563EB] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{post.publishedAt}</span>
                    <button
                      onClick={() => onNavigate(`blog?slug=${post.slug}`)}
                      className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: LEAD GENERATION CTA & COMPACT INQUIRY FORM */}
      {config.showContactCta && (
        <section className="py-20 bg-gradient-to-br from-[#08152F] to-[#0A1A3B] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Ready To Elevate Your Business?
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Have a Project in Mind? Let's Build Something Exceptional.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Whether you require an enterprise ERP, an intelligent AI agent, or an omnichannel e-commerce platform, our engineering team is ready to assist.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Free 30-minute technical consultation with our Solutions Architect</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Custom architecture proposal with clear milestones & timeline</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Full intellectual property ownership & zero ongoing lock-in</span>
                  </div>
                </div>
              </div>

              {/* Compact Inquiry Form */}
              <div className="lg:col-span-6 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl">
                {inquirySubmitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Inquiry Received!</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Thank you. Your inquiry reference is <span className="font-mono font-bold text-[#2563EB]">{inquirySubmitted}</span>. A senior consultant will review your specifications and contact you shortly.
                    </p>
                    <button
                      onClick={() => setInquirySubmitted(null)}
                      className="mt-4 px-4 py-2 text-xs font-medium text-blue-600 hover:underline"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    <div className="text-base font-bold text-[#08152F] mb-1">
                      Request Technical Consultation
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Vikram Sharma"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="vikram@company.com"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Service Interested In</label>
                      <select
                        value={inquiryService}
                        onChange={(e) => setInquiryService(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Project Brief *</label>
                      <textarea
                        rows={3}
                        required
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="Tell us about your requirements, timeline, or current bottlenecks..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      />
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-start gap-2">
                      <input type="checkbox" required defaultChecked className="mt-0.5" />
                      <span>I agree to receive a project assessment and agree to TECYU’s Privacy Policy.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      Submit Consultation Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
