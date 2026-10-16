import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Code, 
  Terminal, 
  HelpCircle, 
  Bookmark, 
  ArrowRight, 
  AlertCircle,
  Download,
  ShieldCheck,
  RefreshCw,
  Palette
} from 'lucide-react';

export default function CourseForm() {
  const [formData, setFormData] = useState({
    topic: '',
    level: 'Intermediate',
    duration: '90',
    language: 'Java',
    framework: 'Spring Boot 3.2',
    institute: '',
    brandColor: '#6366f1',
    outputs: {
      slides: true,
      notes: true,
      code: true,
      exercises: true,
      quiz: true,
      cheatsheet: true
    }
  });

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedCourse, setGeneratedCourse] = useState(null);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['30', '60', '90', '120'];
  const brandColors = [
    { label: 'Violet', value: '#6366f1' },
    { label: 'Indigo', value: '#4f46e5' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Amber', value: '#f59e0b' }
  ];

  const handleOutputToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      outputs: {
        ...prev.outputs,
        [key]: !prev.outputs[key]
      }
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.topic.trim()) {
      newErrors.topic = 'Please enter a course topic (e.g. Building Microservices with Spring Boot)';
    } else if (formData.topic.trim().length < 4) {
      newErrors.topic = 'Topic must be at least 4 characters';
    }

    if (!formData.language.trim()) {
      newErrors.language = 'Please specify a programming language';
    }

    const hasAnyOutput = Object.values(formData.outputs).some(Boolean);
    if (!hasAnyOutput) {
      newErrors.outputs = 'Please select at least one output material';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsGenerating(true);
    setGenerationStep(1);
    setGeneratedCourse(null);

    // Multi-step generation animation simulation
    setTimeout(() => setGenerationStep(2), 1200);
    setTimeout(() => setGenerationStep(3), 2400);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationStep(0);
      setGeneratedCourse({
        ...formData,
        generatedAt: new Date().toLocaleTimeString(),
        id: `VCS-${Math.floor(1000 + Math.random() * 9000)}`
      });
    }, 3600);
  };

  return (
    <section id="create-course" className="py-24 md:py-32 bg-[#080d1b] relative border-t border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            Interactive Generator
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Your Next Course Starts Here
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Configure your technical topic parameters and target deliverables. 
            Our automated pipeline designs the curriculum and verifies every code snippet before export.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#0c1224] border border-white/10 shadow-2xl relative">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Field: Course Topic */}
            <div className="space-y-2">
              <label htmlFor="course-topic" className="block text-sm font-semibold text-slate-200">
                Course Topic <span className="text-violet-400">*</span>
              </label>
              <input
                id="course-topic"
                type="text"
                placeholder="e.g. Distributed Caching with Redis & Spring Boot 3"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${
                  errors.topic 
                    ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30' 
                    : 'border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
                }`}
              />
              {errors.topic && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 mt-1">
                  <AlertCircle size={13} /> {errors.topic}
                </p>
              )}
            </div>

            {/* Row: Level & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Student Level */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Student Target Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFormData({ ...formData, level: lvl })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        formData.level === lvl
                          ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30'
                          : 'bg-black/30 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Duration */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Session Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {durations.map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: dur })}
                      className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        formData.duration === dur
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                          : 'bg-black/30 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {dur}m
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Row: Language & Framework Version */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label htmlFor="course-lang" className="block text-sm font-semibold text-slate-200">
                  Language / Runtime <span className="text-violet-400">*</span>
                </label>
                <input
                  id="course-lang"
                  type="text"
                  placeholder="e.g. Java 21, Python 3.12, TypeScript 5.4"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="course-framework" className="block text-sm font-semibold text-slate-200">
                  Framework Version
                </label>
                <input
                  id="course-framework"
                  type="text"
                  placeholder="e.g. Spring Boot 3.2, Next.js 15, FastAPI 0.110"
                  value={formData.framework}
                  onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

            </div>

            {/* Row: Optional Institute Name & Brand Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label htmlFor="course-institute" className="block text-sm font-semibold text-slate-200">
                  Optional Institute / Company Name
                </label>
                <input
                  id="course-institute"
                  type="text"
                  placeholder="e.g. TechSummit Academy"
                  value={formData.institute}
                  onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Slide Branding Accent
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {brandColors.map((color) => (
                    <button
                      key={color.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, brandColor: color.value })}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        formData.brandColor === color.value 
                          ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#0c1224]' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Checkboxes: Output Materials */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-slate-200">
                Deliverable Outputs to Generate & Verify
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: 'slides', label: 'Slide Deck (PPTX/PDF)', icon: Layers },
                  { key: 'notes', label: 'Trainer Notes', icon: FileText },
                  { key: 'code', label: 'Code Examples', icon: Code },
                  { key: 'exercises', label: 'Hands-on Labs', icon: Terminal },
                  { key: 'quiz', label: 'Quiz & Keys', icon: HelpCircle },
                  { key: 'cheatsheet', label: 'Revision Sheet', icon: Bookmark }
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = formData.outputs[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleOutputToggle(item.key)}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold transition-all text-left ${
                        isChecked
                          ? 'bg-violet-600/15 border-violet-500/40 text-violet-200 shadow-sm'
                          : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                        isChecked ? 'bg-violet-600 border-violet-500 text-white' : 'border-slate-600'
                      }`}>
                        {isChecked && '✓'}
                      </div>
                      <Icon size={14} className={isChecked ? 'text-violet-400' : 'text-slate-500'} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {errors.outputs && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 mt-1">
                  <AlertCircle size={13} /> {errors.outputs}
                </p>
              )}
            </div>

            {/* Primary Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>
                      {generationStep === 1 && 'Step 1/3: Drafting curriculum & slides...'}
                      {generationStep === 2 && 'Step 2/3: Executing code sandbox tests...'}
                      {generationStep === 3 && 'Step 3/3: Assembling verified package...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate My Course</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Generated Result Card Preview */}
          {generatedCourse && (
            <div className="mt-8 pt-8 border-t border-white/10 animate-in fade-in duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10172e] to-[#0c1224] border border-emerald-500/40 shadow-xl space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                      Generation & Verification Complete
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    ID: {generatedCourse.id} • {generatedCourse.generatedAt}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-white">
                    {generatedCourse.topic}
                  </h4>
                  <p className="text-xs text-slate-300">
                    Target: {generatedCourse.level} • {generatedCourse.duration} Mins • Runtime: {generatedCourse.language} ({generatedCourse.framework})
                    {generatedCourse.institute && ` • Branded for ${generatedCourse.institute}`}
                  </p>
                </div>

                {/* Badges of verified assets */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 font-medium">
                  {Object.entries(generatedCourse.outputs).map(([key, enabled]) => (
                    enabled && (
                      <div key={key} className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="shrink-0" />
                        <span className="capitalize">{key} Ready & Verified</span>
                      </div>
                    )
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 text-xs">
                  <span className="text-slate-400">
                    Ready for PowerPoint (PPTX) and PDF export.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('Download demo: Full verified ZIP archive compiled successfully.')}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all flex items-center gap-1.5"
                    >
                      <Download size={14} /> Download Package
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
