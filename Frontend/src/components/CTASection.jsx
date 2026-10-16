import React from 'react';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export default function CTASection({ onOpenCreateCourse }) {
  return (
    <section className="py-20 md:py-28 relative bg-[#060913] overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-violet-600/20 via-indigo-600/15 to-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="rounded-3xl p-10 sm:p-16 bg-gradient-to-b from-[#0f172e] to-[#0a0f1d] border border-white/10 shadow-2xl relative space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/30">
            <Sparkles size={13} />
            <span>Ready for Classroom Delivery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Spend Less Time Preparing.{' '}
            <span className="gradient-text">More Time Teaching.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Build engaging courses with verified examples and classroom-ready resources in one workspace. 
            Join the forward-thinking technical instructors raising the bar for reliable curriculum.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenCreateCourse}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all transform hover:-translate-y-0.5 text-base"
            >
              <span>Create Your First Course</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-base"
            >
              <span>Explore the Workflow</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
