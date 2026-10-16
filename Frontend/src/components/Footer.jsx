import React from 'react';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04060d] border-t border-white/5 pt-16 pb-12 text-sm text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#0a0e1a] rounded-[11px] flex items-center justify-center relative">
                  <BookOpen size={16} className="text-violet-400" />
                  <ShieldCheck size={12} className="text-emerald-400 absolute -bottom-0.5 -right-0.5" />
                </div>
              </div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                Verified Studio
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Verified Course Material Studio empowers technical trainers, corporate instructors, 
              and educators to generate classroom-ready slides, trainer notes, and sandbox-verified code examples.
            </p>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
              “Built for educators who believe great teaching starts with reliable content.”
            </div>
          </div>

          {/* Column: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#verification" className="hover:text-white transition-colors">Verification Engine</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Supported Tech</a></li>
              <li><a href="#create-course" className="hover:text-white transition-colors">Course Generator</a></li>
            </ul>
          </div>

          {/* Column: Resources */}
          <div className="space-y-3" id="resources">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Documentation demo: API and sandbox specifications.'); }} className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Guide: How to set up custom Docker sandbox runners.'); }} className="hover:text-white transition-colors">Sandbox Setup Guide</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Community: Join the educator forum.'); }} className="hover:text-white transition-colors">Educator Forum</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Release Notes: v1.4.0 added Java 21 support.'); }} className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Column: Legal & Sponsorship */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Info</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: All course source code processed in ephemeral sandboxes.'); }} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Standard SaaS terms.'); }} className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Security: Sandboxes run with network isolation.'); }} className="hover:text-white transition-colors">Security Whitepaper</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Contact: support@verifiedcoursestudio.com'); }} className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Verified Course Material Studio. All rights reserved.
          </div>

          {/* TechSummitTrainers Sponsorship attribution */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-slate-400">
            <span>Sponsored by</span>
            <strong className="text-violet-300 font-semibold">TechSummitTrainers</strong>
          </div>
        </div>

      </div>
    </footer>
  );
}
