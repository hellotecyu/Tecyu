import React from 'react';
import { Code, Database, Server, Smartphone, Cpu, Cloud, ArrowRight, ShieldCheck } from 'lucide-react';

interface TechnologiesPageProps {
  onNavigate: (path: string) => void;
}

export const TechnologiesPage: React.FC<TechnologiesPageProps> = ({ onNavigate }) => {
  const techCategories = [
    {
      category: 'Frontend Engineering',
      icon: Code,
      description: 'Modern, reactive user interfaces engineered for speed, search optimization, and strict accessibility.',
      technologies: [
        { name: 'React', description: 'Component-based dynamic web interfaces with optimized virtual DOM reconciliation.' },
        { name: 'Next.js', description: 'Server-side rendering (SSR), static site generation (SSG), and edge API routes.' },
        { name: 'TypeScript', description: 'Type-safe programming preventing runtime crashes and accelerating team velocity.' },
        { name: 'Tailwind CSS', description: 'Utility-first modular styling system ensuring consistent design tokens.' },
        { name: 'Vite', description: 'Next-generation lightning-fast frontend tooling and bundle optimization.' },
      ],
    },
    {
      category: 'Backend & Server Systems',
      icon: Server,
      description: 'Resilient application servers, asynchronous worker queues, and high-throughput REST/GraphQL APIs.',
      technologies: [
        { name: 'Node.js & Express', description: 'High-concurrency event-driven server runtimes for high-traffic microservices.' },
        { name: 'Python & FastAPI', description: 'Rapid, type-annotated API development ideal for AI model serving and automation.' },
        { name: 'Redis', description: 'In-memory caching and message queuing enabling sub-10ms data retrieval.' },
        { name: 'Docker', description: 'Lightweight containerization guaranteeing consistent development and production environments.' },
      ],
    },
    {
      category: 'Databases & Storage',
      icon: Database,
      description: 'ACID-compliant relational engines, robust vector storage, and automated point-in-time backup routines.',
      technologies: [
        { name: 'PostgreSQL', description: 'Rock-solid relational database supporting complex transactions and JSON querying.' },
        { name: 'MySQL', description: 'Proven transactional relational database for web applications and content management.' },
        { name: 'Supabase', description: 'Modern PostgreSQL infrastructure with built-in real-time subscriptions and auth.' },
        { name: 'Vector Databases', description: 'Pinecone and pgvector embeddings supporting semantic RAG enterprise retrieval.' },
      ],
    },
    {
      category: 'Mobile Applications',
      icon: Smartphone,
      description: 'Smooth 60 FPS mobile apps deployed across iOS App Store and Google Play Store.',
      technologies: [
        { name: 'Flutter', description: 'Google’s UI toolkit for natively compiled mobile apps with custom widget fidelity.' },
        { name: 'React Native', description: 'Cross-platform native iOS & Android applications with shared JavaScript logic.' },
        { name: 'Kotlin & Swift', description: 'Native platform bindings for specialized hardware sensors, GPS, and biometrics.' },
      ],
    },
    {
      category: 'Artificial Intelligence & ML',
      icon: Cpu,
      description: 'Custom autonomous agents, document extraction pipelines, and private enterprise LLM workflows.',
      technologies: [
        { name: 'Gemini Models', description: 'Multimodal vision and reasoning models powering advanced extraction pipelines.' },
        { name: 'Enterprise RAG Pipelines', description: 'Document chunking, vector indexing, and zero-hallucination semantic search.' },
        { name: 'LangChain & LlamaIndex', description: 'Robust agent orchestration frameworks linking LLMs to internal ERP databases.' },
      ],
    },
    {
      category: 'Cloud & Infrastructure',
      icon: Cloud,
      description: 'Auto-scaling cloud infrastructure, automated CI/CD deployments, and 99.9% availability architectures.',
      technologies: [
        { name: 'Amazon Web Services (AWS)', description: 'EC2, S3, RDS, CloudFront, and Lambda serverless architectures.' },
        { name: 'Google Cloud Platform (GCP)', description: 'Cloud Run, Kubernetes Engine, and BigQuery enterprise data pipelines.' },
        { name: 'Cloudflare', description: 'Global edge CDN, DDoS mitigation, SSL termination, and DNS acceleration.' },
        { name: 'CI/CD Pipelines', description: 'Automated GitHub Actions workflows with mandatory testing and security gates.' },
      ],
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Engineering Capabilities
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
            Our Technology Stack
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            We deliberately choose production-hardened tools that deliver high reliability, rapid maintainability, and enterprise data security.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {techCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#08152F]">{cat.category}</h2>
                  <p className="text-xs text-slate-500">{cat.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {cat.technologies.map((t, idx) => (
                  <div key={idx} className="p-4 bg-[#F5F8FC] rounded-xl border border-slate-200/80">
                    <div className="text-sm font-bold text-[#08152F] font-mono">{t.name}</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="p-8 bg-[#08152F] rounded-2xl text-white text-center space-y-4">
          <h3 className="text-xl font-bold">Have a Specific Tech Stack Requirement?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Our engineers work with legacy codebases and modern cloud architectures alike.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-[#08152F] bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <span>Consult an Architect</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
