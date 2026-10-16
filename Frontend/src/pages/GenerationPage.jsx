// src/pages/GenerationPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, AlertCircle, Shield, Sun, Moon } from 'lucide-react';
import SmartBackButton from '../components/common/SmartBackButton';
import { mockCourses } from '../data/mockCourses';
import { useApp } from '../context/AppContext';
import { recordNavPath } from '../utils/navigation';

const GENERATION_STAGES = [
  { id: 1, label: 'Analyzing learning objectives.',        duration: 900 },
  { id: 2, label: 'Structuring the lesson.',              duration: 1100 },
  { id: 3, label: 'Generating presentation slides.',      duration: 1300 },
  { id: 4, label: 'Preparing trainer notes.',             duration: 1100 },
  { id: 5, label: 'Creating exercises and automated tests.', duration: 1500 },
  { id: 6, label: 'Preparing quiz and cheat sheet.',      duration: 1200 },
  { id: 7, label: 'Running code verification.',           duration: 1400 },
];

function StageStatusIcon({ status }) {
  if (status === 'done') {
    return <CheckCircle2 size={15} color="var(--status-passed)" />;
  }
  if (status === 'active') {
    return <div className="spinner" style={{ width: 14, height: 14 }} />;
  }
  return <Circle size={14} color="var(--border-strong)" />;
}

export default function GenerationPage() {
  const { courseId = 'course-001' } = useParams();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const { guestSession, draftCourse, isDark, toggleTheme, openAuthModal } = useApp();

  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];

  // Derive topic and curriculum settings from state or saved draft
  const activeTopic = state?.topic || state?.prompt || draftCourse?.topic || course.title;
  const activeLevel = state?.level || draftCourse?.level || course.level;
  const activeDuration = state?.duration || draftCourse?.duration || course.duration;
  const activeLanguage = state?.language || draftCourse?.language || course.language;
  const activeRuntime = state?.runtime || draftCourse?.runtime || course.runtimeVersion;

  const [stepStatus, setStepStatus] = useState(() =>
    GENERATION_STAGES.reduce((acc, s) => ({ ...acc, [s.id]: 'pending' }), {})
  );
  const [done, setDone] = useState(false);

  // Record nav path for smart back tracking
  useEffect(() => {
    recordNavPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let totalDelay = 0;
    GENERATION_STAGES.forEach((step, i) => {
      // Mark active
      const activateAt = totalDelay;
      setTimeout(() => {
        setStepStatus(prev => ({ ...prev, [step.id]: 'active' }));
      }, activateAt);

      totalDelay += step.duration;

      // Mark done
      const doneAt = totalDelay;
      setTimeout(() => {
        setStepStatus(prev => ({ ...prev, [step.id]: 'done' }));
        if (i === GENERATION_STAGES.length - 1) {
          setTimeout(() => setDone(true), 300);
        }
      }, doneAt);
    });
  }, []);

  const completedCount = Object.values(stepStatus).filter(s => s === 'done').length;
  const progress = Math.round((completedCount / GENERATION_STAGES.length) * 100);

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', transition: 'background-color 0.2s ease' }}>
      {/* Top Header with Smart Back to /create */}
      <header className="navbar">
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Smart Back Navigation to Course Creation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <SmartBackButton fallbackPath="/create" label="Back to Course Creation" />
            <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Generation Progress
            </span>
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {guestSession && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border)',
                fontSize: '0.725rem',
                color: 'var(--text-secondary)'
              }}>
                <span className="status-dot green" />
                <span style={{ fontFamily: 'var(--font-mono)' }}>Guest Session</span>
                <button
                  type="button"
                  onClick={openAuthModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--accent-subtle)',
                    fontSize: '0.7rem',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Sign in
                </button>
              </div>
            )}

            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Generation Container */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
        {/* Course Specification Summary */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem'
        }}>
          <p className="overline-editorial" style={{ marginBottom: '0.35rem' }}>
            Submitted Course Topic
          </p>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            {activeTopic}
          </p>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '0.75rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            flexWrap: 'wrap'
          }}>
            <span>Level: {activeLevel}</span>
            <span>·</span>
            <span>Duration: {activeDuration}</span>
            <span>·</span>
            <span>Language: {activeLanguage}</span>
            <span>·</span>
            <span>Runtime: {activeRuntime}</span>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '2rem' }}>
          <p className="overline-editorial" style={{ marginBottom: '0.35rem' }}>
            {done ? 'Generation Completed' : 'Simulated Pipeline Execution'}
          </p>
          <h1 className="heading-editorial" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            {done ? 'Course Workspace Ready.' : 'Building course curriculum.'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {done
              ? 'All 7 pedagogical modules and code verification pipelines are compiled.'
              : 'Synthesizing verified slide decks, trainer notes, runnable code examples, and test suites.'}
          </p>
        </div>

        {/* Restrained Monochromatic Progress Bar */}
        <div style={{
          background: 'var(--border)',
          borderRadius: 'var(--radius-full)',
          height: 3,
          marginBottom: '2rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--text-primary)',
            transition: 'width 0.35s ease',
          }} />
        </div>

        {/* 7 Structured Stages */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          {GENERATION_STAGES.map((step, idx) => {
            const status = stepStatus[step.id];
            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1.25rem',
                  borderBottom: idx < GENERATION_STAGES.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  background: status === 'active' ? 'var(--bg-surface-secondary)' : 'transparent',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <StageStatusIcon status={status} />
                <span style={{
                  fontSize: '0.85rem',
                  color: status === 'done' ? 'var(--text-primary)' : status === 'active' ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: status === 'active' ? 500 : 400,
                  flex: 1
                }}>
                  {step.label}
                </span>

                <span style={{
                  fontSize: '0.725rem',
                  fontFamily: 'var(--font-mono)',
                  color: status === 'done' ? 'var(--status-passed)' : status === 'active' ? 'var(--text-secondary)' : 'var(--text-muted)'
                }}>
                  {status === 'done' ? 'DONE' : status === 'active' ? 'PROCESSING' : 'PENDING'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Demo Disclaimer Notice */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          padding: '0.85rem 1rem',
          background: 'var(--bg-surface-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '2rem',
          alignItems: 'center'
        }}>
          <AlertCircle size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong>Demo simulation:</strong> Templates, test suites, and slides are structured for this frontend preview. Real execution will be powered by the Docker-based verification backend.
          </p>
        </div>

        {/* Completion CTA */}
        {done && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.925rem', gap: '0.45rem', justifyContent: 'center' }}
              onClick={() => navigate(`/course/${courseId}`)}
            >
              Open Course Workspace <ArrowRight size={14} />
            </button>
            <button
              className="btn-ghost"
              style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', justifyContent: 'center' }}
              onClick={() => navigate('/create')}
            >
              Modify Specifications & Regenerate
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
