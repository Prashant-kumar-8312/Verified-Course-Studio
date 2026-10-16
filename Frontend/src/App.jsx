import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import WorkflowSection from './components/WorkflowSection';
import VerificationDashboard from './components/VerificationDashboard';
import CourseForm from './components/CourseForm';
import TechTrustSection from './components/TechTrustSection';
import ImpactSection from './components/ImpactSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  const scrollToCreateCourse = () => {
    const el = document.getElementById('create-course');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 selection:bg-violet-500 selection:text-white font-sans">
      {/* Sticky Navigation */}
      <Navbar onOpenCreateCourse={scrollToCreateCourse} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Live Product Preview */}
        <Hero onOpenCreateCourse={scrollToCreateCourse} />

        {/* Problem vs Solution Section */}
        <ProblemSection />

        {/* 10 Core Features Grid */}
        <FeaturesSection />

        {/* 4-Step Pipeline Workflow */}
        <WorkflowSection />

        {/* Verification Engine Interactive Dashboard */}
        <VerificationDashboard />

        {/* Interactive Course Creation Form */}
        <CourseForm />

        {/* Supported Runtimes & Trust Principles */}
        <TechTrustSection />

        {/* Qualitative Impact & Benefits */}
        <ImpactSection />

        {/* Final Call to Action */}
        <CTASection onOpenCreateCourse={scrollToCreateCourse} />
      </main>

      {/* Footer with Sponsorship Attribution */}
      <Footer />
    </div>
  );
}
