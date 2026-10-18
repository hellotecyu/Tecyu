import React from 'react';
import { db } from '../../lib/database';
import { TecyuLogo } from '../common/TecyuLogo';
import { ArrowRight, CheckCircle2, MapPin, Shield, Zap, Target, Users, Award, Code2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const settings = db.getSettings();
  const team = db.getTeam().filter((t) => t.isPublished);

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            About TECYU
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
            Technology That Moves Business Forward.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Headquartered in Hanumangarh Junction, Rajasthan, TECYU is an engineering-driven IT solutions company. We specialize in purpose-built enterprise software, AI workflow automation, and conversion-centered web architectures.
          </p>
        </div>
      </section>

      {/* Company Intro & Mission / Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              Our Foundation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#08152F]">
              Pioneering High-Trust Digital Engineering
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded on the conviction that Indian and global businesses deserve tailored, high-integrity software rather than generic per-seat subscription lock-in, TECYU bridges complex backend systems with intuitive user experiences.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether modernizing a supply chain fleet across regional hubs or embedding private AI agents inside financial accounting departments, our team upholds strict software engineering standards, data confidentiality, and measurable business velocity.
            </p>

            <div className="p-4 bg-[#F5F8FC] rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#08152F] block">Registered Headquarters:</span>
                <span>{settings.addressLine1}, {settings.addressLine2}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#08152F]">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To equip organizations with intelligent, resilient, and custom-engineered technology that eliminates manual overhead, accelerates execution speed, and drives lasting competitive advantage.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#08152F]">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To be the most trusted technology and AI solutions partner for enterprises seeking verifiable operational excellence and long-term digital sovereignty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#F5F8FC] py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1">
              Guiding Principles
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#08152F]">
              Our Core Engineering Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Architectural Rigor', desc: 'No shortcuts. We build maintainable, well-documented systems with strict type safety and modular components.' },
              { title: 'Data Confidentiality', desc: 'Enterprise data remains strictly private. We deploy closed VPC pipelines and ground-truth LLM safeguards.' },
              { title: 'Intellectual Sovereignty', desc: 'Clients own 100% of their proprietary source code and relational database schemas with zero vendor lock-in.' },
              { title: 'Measurable Velocity', desc: 'We measure success through verified business throughput: faster invoicing, lower latency, higher conversions.' },
            ].map((v, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="text-xs font-mono font-bold text-[#2563EB] mb-2">0{i + 1}</div>
                <h3 className="text-sm font-bold text-[#08152F]">{v.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Core Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1">
            The Builders
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#08152F]">
            Leadership & Senior Engineering Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Experienced architects, full-stack engineers, and AI practitioners dedicated to your project's success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-tr ${member.avatarGradient} flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md`}>
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h3 className="text-sm font-bold text-[#08152F]">{member.name}</h3>
              <div className="text-xs text-[#2563EB] font-medium mt-0.5">{member.role}</div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed text-left line-clamp-4">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="p-8 sm:p-12 bg-[#08152F] rounded-3xl text-white text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold">Partner with TECYU on Your Next Initiative</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            From initial requirements discovery to deployment and SLA maintenance, let our engineers build software that moves your business forward.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-[#08152F] bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <span>Schedule Initial Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
