import React from 'react';
import { X, CheckCircle2, AlertCircle, Terminal, Cpu, ShieldCheck, Download, ExternalLink, Info } from 'lucide-react';

export default function SampleReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c1222] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0e1628] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Verification Execution Report
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Passed
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Run ID: <span className="font-mono text-slate-300">#vcs-exec-8942-java21</span> • Target: Spring Boot REST APIs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Environment Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#080d1a] border border-white/5 font-mono text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Runtime</span>
              <strong className="text-white">OpenJDK 21.0.3</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Framework</span>
              <strong className="text-white">Spring Boot 3.2.4</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Build Tool</span>
              <strong className="text-white">Apache Maven 3.9.6</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Sandbox Image</span>
              <strong className="text-white">vcs/runner:java21</strong>
            </div>
          </div>

          {/* Test Suites Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Automated Check Suite Results
            </h4>
            <div className="space-y-2">
              
              {/* Check 1 */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white text-xs">CourseController.java — Compilation Check</div>
                    <div className="text-[11px] text-slate-400">javac -parameters -Werror CourseController.java</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">0 Errors / 0 Warnings</span>
                  <div className="text-[10px] text-slate-500">Duration: 18ms</div>
                </div>
              </div>

              {/* Check 2 */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white text-xs">CourseServiceTest.java — Mockito Unit Suite</div>
                    <div className="text-[11px] text-slate-400">8 unit tests verifying business validation & exception handling</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">8/8 Passed (100%)</span>
                  <div className="text-[10px] text-slate-500">Duration: 42ms</div>
                </div>
              </div>

              {/* Check 3: Reference solution */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white text-xs">Lab 02 Reference Solution Check</div>
                    <div className="text-[11px] text-slate-400">Asserts correct HTTP 201 with Location header and DTO mapping</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Passed</span>
                  <div className="text-[10px] text-slate-500">Duration: 34ms</div>
                </div>
              </div>

              {/* Check 4: Naive solution deliberate failure check */}
              <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-amber-200 text-xs">
                      Lab 02 Deliberate Buggy Solution (Sanity Validation)
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Tests whether automated grading catches common student mistake (missing @Valid)
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-amber-300 font-semibold">Failed as expected ✓</span>
                  <div className="text-[10px] text-slate-500">Assertions caught bug</div>
                </div>
              </div>

            </div>
          </div>

          {/* Sandbox Terminal Output */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Terminal size={14} /> Sandbox Execution Log
            </h4>
            <div className="rounded-xl p-4 bg-[#050811] border border-white/10 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto space-y-1">
              <div className="text-slate-500"># Docker container initialized: vcs-sandbox-container-java21-72a</div>
              <div className="text-cyan-400">$ mvn clean test -Dtest=CourseVerificationTestSuite -q</div>
              <div className="text-emerald-400">[INFO] Running com.verified.studio.CourseControllerTest</div>
              <div className="text-slate-300">[INFO] Tests run: 12, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.284 s</div>
              <div className="text-emerald-400">[INFO] BUILD SUCCESS</div>
              <div className="text-violet-400">[VCS-RUNNER] Artifact hash computed: 0x8a9bf31... All slides validated.</div>
            </div>
          </div>

          {/* Notice */}
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2.5 text-xs text-blue-200">
            <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration Report Notice:</strong> This sample report illustrates the structured data format produced by the Verified Course Studio test execution container. Live execution runs require a connected sandbox runner daemon.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#0e1628] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            SHA: a7f891b4c3e2010...
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
}
