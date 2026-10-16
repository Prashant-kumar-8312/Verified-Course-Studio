import React from 'react';
import { ShieldCheck, CheckCircle2, Box, Layers, RefreshCw, Cpu, GitBranch, Info } from 'lucide-react';

export default function TechTrustSection() {
  const environments = [
    { name: 'Java 21 (LTS)', tag: 'OpenJDK & Eclipse Temurin', category: 'Backend' },
    { name: 'Spring Boot 3.2+', tag: 'Jakarta EE & Spring 6', category: 'Framework' },
    { name: 'Python 3.12', tag: 'FastAPI & PyTest Suites', category: 'Backend & AI' },
    { name: 'TypeScript 5.4', tag: 'Strict Typing & Node 20', category: 'Fullstack' },
    { name: 'Node.js 20 LTS', tag: 'V8 Runtime & Jest/Vitest', category: 'JavaScript' },
    { name: 'Go 1.22', tag: 'Standard Tooling & Testing', category: 'Systems' }
  ];

  const principles = [
    {
      icon: Box,
      title: 'Reproducible Sandbox Builds',
      description: 'Every run executes inside isolated, containerized runners with strictly pinned dependencies and isolated networks.'
    },
    {
      icon: Layers,
      title: 'Pinned Dependencies',
      description: 'No floating versions or unexpected upstream updates. Runtimes match exact enterprise workshop targets.'
    },
    {
      icon: ShieldCheck,
      title: 'Automated Unit & Integration Tests',
      description: 'Exercises are verified against positive reference implementations and negative boundary traps.'
    },
    {
      icon: Cpu,
      title: 'Transparent Verification Reports',
      description: 'Full compiler diagnostics, stack traces, and sandbox execution times are inspectable down to the millisecond.'
    },
    {
      icon: RefreshCw,
      title: 'Version-Aware Content Updates',
      description: 'Easily bump your curriculum from older LTS releases to the latest framework versions and re-verify everything.'
    }
  ];

  return (
    <section id="technology" className="py-24 md:py-32 bg-[#060913] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Trust & Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Supported Verification Environments
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Code samples are not just formatted text. They are tested against verified runtime environments 
            to guarantee zero surprises in your lecture hall.
          </p>
        </div>

        {/* Environment Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {environments.map((env) => (
            <div
              key={env.name}
              className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/5 hover:border-emerald-500/30 transition-all text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto mb-2 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={16} />
              </div>
              <div className="font-bold text-sm text-white">{env.name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{env.tag}</div>
            </div>
          ))}
        </div>

        {/* Runtime disclaimer note */}
        <div className="max-w-3xl mx-auto mb-16 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
          <Info size={14} className="text-slate-400 shrink-0" />
          <span>
            Actual supported programming languages and versions depend on your configured verification sandbox images.
          </span>
        </div>

        {/* Guiding Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.title}
                className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-violet-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
