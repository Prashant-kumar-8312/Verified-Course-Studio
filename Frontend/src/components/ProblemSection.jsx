import React from 'react';
import { AlertTriangle, Code2, Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      tag: 'Framework Drift',
      title: 'Outdated Content',
      description: 'Frameworks evolve at breakneck speeds, APIs get deprecated, and yesterday’s teaching decks quietly lose relevance before class even starts.'
    },
    {
      icon: AlertTriangle,
      tag: 'Hallucination Risk',
      title: 'Broken AI-Generated Code',
      description: 'Generic LLMs produce plausible-looking snippets that fail to compile, miss import statements, or blow up during live student demos.'
    },
    {
      icon: Code2,
      tag: 'Preparation Tax',
      title: 'Time-Consuming Preparation',
      description: 'Trainers waste 15+ hours per week manually formatting slides, scripting speaker notes, inventing lab exercises, and drafting quiz answer keys.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#070b16] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            The Classroom Dilemma
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            From Hours of Preparation to Minutes of Creation
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Teaching complex engineering concepts requires complete confidence in your material. 
            Here is why traditional course preparation fails technical instructors.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="group relative rounded-2xl p-6 bg-[#0c1222] border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-5 group-hover:scale-105 transition-transform">
                  <Icon size={22} />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Problem 0{index + 1} • {item.tag}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* The Solution Banner / Comparison */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-violet-950/40 via-[#0e162b] to-indigo-950/40 border border-violet-500/30 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <Sparkles size={14} />
              The Verified Studio Standard
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              “One workspace. Every teaching asset. Verified before delivery.”
            </h3>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We eliminate guesswork by combining AI course generation with an automated sandbox test runner. 
              Before you step into the lecture hall, every slide code snippet has already compiled and passed automated test suites.
            </p>

            {/* Before vs After comparison bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4">
              {/* Traditional */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-bold uppercase text-rose-400 flex items-center gap-1.5">
                  <span>✕ Traditional Method</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Manually writing slides in PowerPoint, copy-pasting code from blogs, hoping code works during class, writing labs at 2 AM.
                </p>
              </div>

              {/* Verified Studio */}
              <div className="p-4 rounded-xl bg-violet-950/40 border border-emerald-500/30 space-y-2">
                <div className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Verified Studio Method</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prompt topic and duration. Receive synchronized slides, speaker notes, and verified tests. Ready for classroom export in 2 minutes.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
