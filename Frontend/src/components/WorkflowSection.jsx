import React from 'react';
import { Sliders, Sparkles, ShieldCheck, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WorkflowSection() {
  const steps = [
    {
      number: '01',
      title: 'Define Your Course',
      icon: Sliders,
      description: 'Enter the topic, student level (Beginner/Intermediate/Advanced), session duration (30-120 min), target framework, and institutional branding.'
    },
    {
      number: '02',
      title: 'Generate Materials',
      icon: Sparkles,
      description: 'The engine creates synchronized 16:9 slides, in-depth trainer talking points, runnable code demos, hands-on lab exercises, quizzes, and revision cheat sheets.'
    },
    {
      number: '03',
      title: 'Verify Everything',
      icon: ShieldCheck,
      highlight: true,
      description: 'Every code snippet is executed against pinned runtime containers. Automated tests run against both reference solutions and deliberately buggy baselines.'
    },
    {
      number: '04',
      title: 'Review and Export',
      icon: Download,
      description: 'Inspect full execution logs and sandbox reports. Fine-tune any individual slide, then export directly to PowerPoint (PPTX) and printable PDF.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#080d1a] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            Automated Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            From Topic to Verified Teaching Material
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A transparent four-step workflow built to guarantee that every slide you project and every lab you assign runs without surprises.
          </p>
        </div>

        {/* 4 Steps Horizontal (Desktop) / Vertical (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  step.highlight 
                    ? 'bg-gradient-to-b from-[#121c38] to-[#0c1326] border border-violet-500/40 shadow-xl shadow-violet-950/40' 
                    : 'bg-[#0b101f] border border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-extrabold text-slate-500/50">
                      {step.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      step.highlight 
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/40' 
                        : 'bg-white/5 text-violet-400 border border-white/10'
                    }`}>
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Connector Indicator */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">Stage {index + 1} of 4</span>
                  {index < steps.length - 1 ? (
                    <span className="text-violet-400 hidden lg:inline-flex items-center gap-1 font-medium">
                      Next <ArrowRight size={12} />
                    </span>
                  ) : (
                    <span className="text-emerald-400 inline-flex items-center gap-1 font-medium">
                      <CheckCircle2 size={12} /> Class-Ready
                    </span>
                  )}
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
