// src/pages/LandingPage.jsx
import { useRef } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PromptComposer from '../components/landing/PromptComposer';
import FeatureGrid from '../components/landing/FeatureGrid';
import VerificationSection from '../components/landing/VerificationSection';
import HowItWorks from '../components/landing/HowItWorks';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const composerRef = useRef(null);
  const { isDark } = useApp();

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', transition: 'background-color 0.2s ease' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '5.5rem 1.5rem 6.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        {/* Subtle Abstract Background Shapes (Restrained & Architectural) */}
        {isDark ? (
          /* Dark theme subtle abstract background */
          <div className="hero-abstract-dark" aria-hidden="true">
            <svg
              style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.25, width: '1200px', height: '800px' }}
              viewBox="0 0 1200 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="600" cy="200" r="380" stroke="#333333" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="600" cy="200" r="260" stroke="#222222" strokeWidth="1" />
              <path d="M 200 400 Q 600 250 1000 400" stroke="#262626" strokeWidth="1" fill="none" />
            </svg>
          </div>
        ) : (
          /* Light theme subtle abstract background */
          <div className="hero-abstract-light" aria-hidden="true">
            <svg
              style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.45, width: '1200px', height: '800px' }}
              viewBox="0 0 1200 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="600" cy="200" r="380" stroke="#E2E2DC" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="600" cy="200" r="260" stroke="#ECECE8" strokeWidth="1" />
              <path d="M 200 400 Q 600 250 1000 400" stroke="#E5E5E0" strokeWidth="1" fill="none" />
            </svg>
          </div>
        )}

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          maxWidth: '860px',
          margin: '0 auto',
          textAlign: 'center',
          zIndex: 1
        }}>
          {/* Overline */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span className="overline-editorial" style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
            }}>
              THE TEACHING MATERIAL WORKSPACE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-editorial" style={{
            fontSize: 'clamp(2.75rem, 5.5vw, 4.25rem)',
            lineHeight: 1.08,
            marginBottom: '1.5rem',
            textWrap: 'balance',
          }}>
            Create better lessons.<br />
            Teach with confidence.
          </h1>

          {/* Supporting Description */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '660px',
            margin: '0 auto 0.75rem',
            textWrap: 'balance',
            fontWeight: 400
          }}>
            Generate presentation-ready lessons, practical exercises, trainer notes, and code examples designed to work—not just look good.
          </p>

          {/* Secondary Line */}
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '3rem',
            fontFamily: 'var(--font-mono)'
          }}>
            Built for trainers, educators, and technical teams.
          </p>

          {/* Prompt Composer */}
          <PromptComposer suggestionRef={composerRef} />
        </div>
      </section>

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Distinctive Verification Section */}
      <VerificationSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Footer */}
      <Footer />
    </div>
  );
}
