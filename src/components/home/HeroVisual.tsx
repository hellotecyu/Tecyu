import React, { useState } from 'react';
import { Database, Shield, Cpu, Activity, Zap, CheckCircle2, Server, ArrowUpRight } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'ai' | 'cloud'>('architecture');

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl bg-[#08152F] border border-slate-800 shadow-2xl p-5 text-white overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Mockup Window Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] font-mono text-slate-400 pl-2">tecyu.cloud.orchestrator</span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'architecture' ? 'bg-[#2563EB] text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Stack
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'ai' ? 'bg-[#2563EB] text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Agent
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'cloud' ? 'bg-[#2563EB] text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Telemetry
          </button>
        </div>
      </div>

      {/* Main interactive panel */}
      {activeTab === 'architecture' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <div className="text-[10px] text-slate-400 font-medium">Core Architecture</div>
              <div className="text-sm font-semibold text-white mt-1">TypeScript / Node</div>
              <div className="text-[11px] text-cyan-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Strict Typing</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <div className="text-[10px] text-slate-400 font-medium">Database Layer</div>
              <div className="text-sm font-semibold text-white mt-1">PostgreSQL + ACID</div>
              <div className="text-[11px] text-cyan-400 mt-2 flex items-center gap-1">
                <Database className="w-3 h-3" />
                <span>Replicated</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <div className="text-[10px] text-slate-400 font-medium">API Middleware</div>
              <div className="text-sm font-semibold text-white mt-1">&lt;100ms Latency</div>
              <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Cached Redis</span>
              </div>
            </div>
          </div>

          {/* Interactive node diagram preview */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-900">
              <span>ENTERPRISE WORKFLOW PIPELINE</span>
              <span className="text-cyan-400">ACTIVE STATUS</span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-3 text-center text-[10px]">
              <div className="p-2 bg-slate-900/90 rounded border border-blue-600/40 text-blue-300">
                <div className="font-semibold">Web Client</div>
                <div className="text-slate-400 text-[9px] mt-0.5">Next.js 15</div>
              </div>
              <div className="p-2 bg-slate-900/90 rounded border border-slate-700 text-slate-300">
                <div className="font-semibold">API Gateway</div>
                <div className="text-slate-400 text-[9px] mt-0.5">Express/REST</div>
              </div>
              <div className="p-2 bg-slate-900/90 rounded border border-cyan-600/40 text-cyan-300">
                <div className="font-semibold">AI Agent</div>
                <div className="text-slate-400 text-[9px] mt-0.5">RAG Engine</div>
              </div>
              <div className="p-2 bg-slate-900/90 rounded border border-emerald-600/40 text-emerald-300">
                <div className="font-semibold">PostgreSQL</div>
                <div className="text-slate-400 text-[9px] mt-0.5">Encrypted</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div className="text-cyan-400 text-[11px] font-semibold mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>RAG Document Ingestion & Query Execution</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              &gt; Ingesting 250 enterprise contracts...<br />
              &gt; Embedding chunks: [384 dims / text-embedding-004]<br />
              &gt; Hybrid BM25 + Cosine similarity matched with 0.96 confidence.<br />
              &gt; Response synthesized strictly from cited verified sources.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 block">Hallucination Risk</span>
              <span className="text-base font-bold text-emerald-400">0.0%</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Ground-truth verified</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 block">Processing Speed</span>
              <span className="text-base font-bold text-cyan-400">45 sec / batch</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Previously 4 days</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cloud' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">High Availability</span>
                <Server className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-lg font-bold text-white mt-1 tabular-nums">99.98%</div>
              <span className="text-[10px] text-emerald-400">Multi-region failover</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Core Web Vitals</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-lg font-bold text-cyan-400 mt-1 tabular-nums">&lt; 1.4s LCP</div>
              <span className="text-[10px] text-slate-400">Optimized bundle</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Zero-Vulnerability Compliance (OWASP)</span>
            </div>
            <span className="text-emerald-400 font-semibold text-[11px]">VERIFIED</span>
          </div>
        </div>
      )}

      {/* Footer bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Engineered by TECYU</span>
        </span>
        <span className="text-cyan-400 font-medium">Hanumangarh, Rajasthan, India</span>
      </div>
    </div>
  );
};
