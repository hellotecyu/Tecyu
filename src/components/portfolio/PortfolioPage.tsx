import React, { useState } from 'react';
import { db } from '../../lib/database';
import { ProjectItem } from '../../types';
import { ArrowRight, CheckCircle2, ArrowLeft, ExternalLink, Filter, Building2, Tag } from 'lucide-react';

interface PortfolioPageProps {
  selectedSlug?: string;
  onNavigate: (path: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ selectedSlug, onNavigate }) => {
  const projects = db.getProjects().filter((p) => p.isPublished);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');

  const activeProject = selectedSlug ? projects.find((p) => p.slug === selectedSlug) : null;

  const industries = ['all', ...Array.from(new Set(projects.map((p) => p.industry)))];
  const servicesList = ['all', ...Array.from(new Set(projects.map((p) => p.serviceCategory)))];

  const filteredProjects = projects.filter((p) => {
    const matchInd = selectedIndustry === 'all' || p.industry === selectedIndustry;
    const matchSrv = selectedService === 'all' || p.serviceCategory === selectedService;
    return matchInd && matchSrv;
  });

  // DETAIL CASE STUDY VIEW
  if (activeProject) {
    return (
      <div className="pt-24 pb-20">
        <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Case Studies</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              <span className="text-[#2563EB]">{activeProject.industry}</span>
              <span aria-hidden="true">·</span>
              <span>{activeProject.serviceCategory}</span>
              <span aria-hidden="true">·</span>
              <span>Delivered {activeProject.completionDate}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] tracking-tight">
              {activeProject.title}
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wide">
              Client: {activeProject.client}
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Visual Showcase Banner */}
          <div className={`w-full h-64 md:h-80 bg-gradient-to-r ${activeProject.thumbnailGradient} rounded-2xl p-8 flex flex-col justify-end text-white shadow-xl`}>
            <div className="max-w-lg space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">Architecture Showcase</span>
              <h2 className="text-2xl font-bold text-white">{activeProject.title}</h2>
              <p className="text-xs text-slate-300 line-clamp-2">{activeProject.description}</p>
            </div>
          </div>

          {/* Verified Outcomes Strip */}
          <div className="bg-[#F5F8FC] border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-4">
              Verified Business Outcomes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProject.verifiedResults.map((result, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
              <h3 className="text-lg font-bold text-[#08152F]">The Operational Challenge</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeProject.challenge}</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
              <h3 className="text-lg font-bold text-[#08152F]">The TECYU Engineering Solution</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeProject.solution}</p>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white">
            <h3 className="text-sm font-bold text-[#08152F] mb-3">Technologies Employed</h3>
            <div className="flex flex-wrap gap-2">
              {activeProject.techStack.map((tech, i) => (
                <span key={i} className="text-xs font-mono bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="p-8 bg-[#08152F] rounded-2xl text-white text-center space-y-4">
            <h3 className="text-xl font-bold">Need Similar Results for Your Business?</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Our architects can analyze your current tech stack and formulate a clear modernization plan.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-[#08152F] bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: PORTFOLIO LISTING WITH FILTERS
  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Proven Systems
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
            Case Studies & Portfolio
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Real enterprise software, healthcare portals, e-commerce architectures, and autonomous AI agents delivered by TECYU.
          </p>

          {/* Filters Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium">Industry:</span>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:border-[#2563EB]"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind === 'all' ? 'All Industries' : ind}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium">Service:</span>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:border-[#2563EB]"
              >
                {servicesList.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv === 'all' ? 'All Services' : srv}
                  </option>
                ))}
              </select>
            </div>

            {(selectedIndustry !== 'all' || selectedService !== 'all') && (
              <button
                onClick={() => {
                  setSelectedIndustry('all');
                  setSelectedService('all');
                }}
                className="text-xs text-[#2563EB] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No projects match the selected criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all group"
              >
                <div>
                  <div className={`h-44 bg-gradient-to-br ${p.thumbnailGradient} p-5 flex flex-col justify-between text-white relative`}>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-semibold text-cyan-300">{p.industry}</span>
                      <span>{p.completionDate}</span>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-300 uppercase tracking-wider">{p.client}</div>
                      <div className="text-base font-bold text-white mt-0.5 line-clamp-1">{p.title}</div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>

                    <div className="p-3 bg-[#F5F8FC] rounded-xl border border-slate-200 text-xs text-slate-800 space-y-1">
                      <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">Outcome</div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{p.verifiedResults[0]}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.techStack.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onNavigate(`portfolio?slug=${p.slug}`)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-white bg-slate-50 hover:bg-[#2563EB] border border-slate-200 hover:border-[#2563EB] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
