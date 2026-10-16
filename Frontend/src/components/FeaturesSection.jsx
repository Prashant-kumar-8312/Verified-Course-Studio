import React from 'react';
import { 
  Sparkles, 
  Presentation, 
  FileText, 
  ShieldCheck, 
  Terminal, 
  HelpCircle, 
  RefreshCw, 
  Layers, 
  Download, 
  CheckSquare2 
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Course Generation',
      description: 'Generate complete teaching materials from a topic, student level, and session duration with a single prompt.'
    },
    {
      icon: Presentation,
      title: 'Intelligent Slide Decks',
      description: 'Create branded PowerPoint-ready slides with readable syntax-highlighted code, balanced pedagogical layouts, and generated diagrams.'
    },
    {
      icon: FileText,
      title: 'Trainer Notes',
      description: 'Provide slide-by-slide explanations, speaking points, classroom examples, and pedagogical guidance for seamless delivery.'
    },
    {
      icon: ShieldCheck,
      title: 'Automated Code Verification',
      badge: 'Core Engine',
      description: 'Extract code snippets from slides and notes, execute them against pinned runtime and framework versions, and display detailed results.'
    },
    {
      icon: Terminal,
      title: 'Tested Hands-On Exercises',
      description: 'Generate exercises with reference solutions that pass automated tests, and deliberately incorrect baseline solutions that fail meaningful tests.'
    },
    {
      icon: HelpCircle,
      title: 'Quiz and Cheat Sheet',
      description: 'Create diagnostic and formative quizzes with thorough answer explanations and concise 1-page quick revision cheat sheets.'
    },
    {
      icon: RefreshCw,
      title: 'Framework Version Updates',
      description: 'Update existing courses to newer framework versions (e.g. Spring Boot 3.1 to 3.3) and re-verify every changed example automatically.'
    },
    {
      icon: Layers,
      title: 'Smart Slide Regeneration',
      description: 'Fine-tune or regenerate a single slide without altering the rest of your carefully arranged lecture deck.'
    },
    {
      icon: Download,
      title: 'PowerPoint and PDF Export',
      description: 'Export polished course materials formatted for native classroom projection in PPTX, Keynote-friendly formats, and printable PDFs.'
    },
    {
      icon: CheckSquare2,
      title: 'Syllabus Coverage',
      description: 'Map generated material against an accreditation syllabus and instantly highlight covered versus missing technical topics.'
    }
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative bg-[#060913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Engine Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Teach With Confidence
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            From the initial curriculum prompt to the final slide projection, every feature is 
            engineered around pedagogical clarity and code correctness.
          </p>
        </div>

        {/* 10 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isHighlight = feature.badge;
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isHighlight 
                    ? 'bg-gradient-to-br from-violet-950/40 via-[#0e162d] to-indigo-950/40 border border-violet-500/40 shadow-xl shadow-violet-950/50' 
                    : 'bg-[#0a0f1d] border border-white/5 hover:border-white/20 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                    isHighlight 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40' 
                      : 'bg-white/5 text-violet-400 border border-white/10'
                  }`}>
                    <Icon size={20} />
                  </div>
                  {feature.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
