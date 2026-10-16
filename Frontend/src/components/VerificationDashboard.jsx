import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileCode2, 
  Terminal, 
  ExternalLink, 
  Sparkles, 
  Info,
  Clock,
  Box
} from 'lucide-react';
import SampleReportModal from './SampleReportModal';

export default function VerificationDashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  const testRows = [
    {
      id: 'TC-01',
      file: 'CourseController.java',
      label: 'REST Controller Example',
      type: 'Endpoint & Serialization',
      status: 'Passed',
      time: '18ms',
      detail: 'Valid HTTP 200/201 response schema with Jackson serialization'
    },
    {
      id: 'TC-02',
      file: 'CourseService.java',
      label: 'Service Layer Example',
      type: 'Unit Mockito Tests',
      status: 'Passed',
      time: '24ms',
      detail: '8/8 tests passed with 100% boundary assertion coverage'
    },
    {
      id: 'TC-03',
      file: 'Lab01_Solution.java',
      label: 'Validation Exercise — Reference Solution',
      type: 'Reference Solution Check',
      status: 'Passed',
      time: '31ms',
      detail: 'All constraints (@NotBlank, @Min) passed edge-case payloads'
    },
    {
      id: 'TC-04',
      file: 'Lab01_Naive.java',
      label: 'Validation Exercise — Naive Solution',
      type: 'Deliberate Failure Audit',
      status: 'Failed (Expected)',
      statusType: 'warning',
      time: '15ms',
      detail: 'Deliberately missing @Valid properly failed boundary assertions'
    }
  ];

  return (
    <section id="verification" className="py-24 md:py-32 bg-[#060913] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck size={14} />
            <span>The Verification Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            AI Content Is Only Useful When It Works.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Every code example must earn its place in your course. Verify examples against pinned environments 
            and inspect exactly what was executed before delivering your lecture.
          </p>
        </div>

        {/* The Verification Report Interface Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0a0f1e] border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-lg font-bold text-white">
                  Automated Sandbox Execution Report
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  100% Validated
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Target: Spring Boot REST APIs • Evaluated against pinned Dockerized toolchain
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-indigo-600/30 transition-all hover:scale-105 shrink-0"
            >
              <span>View Sample Report</span>
              <ExternalLink size={13} />
            </button>
          </div>

          {/* Environment Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 py-4 border-b border-white/5 font-mono text-xs text-slate-300">
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Language</span>
              <strong className="text-white">Java</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Runtime</span>
              <strong className="text-white">Java 21 (LTS)</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Framework</span>
              <strong className="text-white">Spring Boot 3.2</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Compiler</span>
              <strong className="text-emerald-400">javac 0 warnings</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Unit Tests</span>
              <strong className="text-emerald-400">12/12 Passed</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Timestamp</span>
              <strong className="text-slate-300">Today 17:45 UTC</strong>
            </div>
          </div>

          {/* Test Execution List */}
          <div className="py-4 space-y-3">
            <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Verification Test Results
            </div>

            <div className="space-y-2">
              {testRows.map((row) => (
                <div
                  key={row.id}
                  className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {row.statusType === 'warning' ? (
                      <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                    ) : (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{row.label}</span>
                        <span className="font-mono text-[11px] text-slate-400">({row.file})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{row.detail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:justify-end shrink-0 text-slate-400 font-mono text-[11px]">
                    <span>{row.time}</span>
                    <span className={`px-2.5 py-1 rounded-full font-semibold ${
                      row.statusType === 'warning' 
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' 
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Notice */}
          <div className="pt-4 mt-2 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Info size={13} className="text-slate-400" />
              <span>
                Demonstration results are illustrative simulation data until a real verification backend runner is connected.
              </span>
            </div>
            <div className="font-mono text-[11px] text-slate-400">
              Container Hash: sha256:4a8f9c2d7b80...
            </div>
          </div>

        </div>

      </div>

      {/* Detailed Sample Report Modal */}
      <SampleReportModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
