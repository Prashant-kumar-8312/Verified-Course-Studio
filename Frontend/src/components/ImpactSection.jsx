import React from 'react';
import { Clock, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ImpactSection() {
  const impacts = [
    {
      icon: Clock,
      badge: 'Time Reclaimed',
      title: 'Less Time Spent Preparing Courses',
      description: 'Eliminate fragmented preparation across multiple disjointed tools. Shift hours away from slide alignment and manual snippet debugging back into high-impact mentoring and curriculum strategy.',
      benefit: 'Full classroom-ready package in minutes'
    },
    {
      icon: ShieldCheck,
      badge: 'Zero Live Failures',
      title: 'More Confidence in Code Examples',
      description: 'Never face the anxiety of broken code, missing dependencies, or deprecated syntax during live technical demos. Every snippet projected has already compiled and passed in clean containers.',
      benefit: '100% verified compiler and unit check'
    },
    {
      icon: Award,
      badge: 'Classroom Polish',
      title: 'Consistent, Branded Teaching Materials',
      description: 'Deliver cohesive slide decks, synchronized trainer speaking cues, runnable lab repositories, and student revision sheets — all formatted to your institution’s brand guidelines.',
      benefit: 'Unified tone, structure, and aesthetics'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#080d1a] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            Instructor Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Designed for Educators Who Value Reliability
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Qualitative pedagogical benefits built from real classroom feedback — without the hyperbole.
          </p>
        </div>

        {/* 3 Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-3xl p-8 bg-[#0c1326] border border-white/5 hover:border-violet-500/30 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>{item.benefit}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
