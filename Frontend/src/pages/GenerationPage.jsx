// src/pages/GenerationPage.jsx
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, AlertCircle, AlertTriangle, ShieldCheck, Sun, Moon, RefreshCw } from 'lucide-react';
import SmartBackButton from '../components/common/SmartBackButton';
import { api } from '../api';
import { useApp } from '../context/AppContext';
import { recordNavPath } from '../utils/navigation';

const GENERATION_STAGES = [
  { id: 1, label: 'Analyzing topic taxonomy & learning requirements.' },
  { id: 2, label: 'Synthesizing lecture outline & duration allocations.' },
  { id: 3, label: 'Generating teaching notes, practical activities & demonstrations.' },
  { id: 4, label: 'Creating student exercises & homework assignments.' },
  { id: 5, label: 'Building assessment quizzes with rationales.' },
  { id: 6, label: 'Compiling code artifacts & assembling final course package.' },
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
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const { guestSession, draftCourse, isDark, toggleTheme, openAuthModal } = useApp();

  // Derive topic and curriculum settings from state or saved draft
  const activeTopic = state?.topic || state?.prompt || draftCourse?.topic || 'Java Collections';
  const activeLevel = state?.level || draftCourse?.level || 'Beginner';
  const activeDuration = state?.duration || draftCourse?.duration || '60 minutes';
  const activeLectures = Number(state?.numberOfLectures || draftCourse?.numberOfLectures) || 4;
  const activeObjectives = state?.learningObjectives || draftCourse?.learningObjectives || '';

  // Parse numeric duration
  const parsedDuration = parseInt(String(activeDuration).replace(/\D/g, ''), 10) || 60;
  const timePerLecture = Math.round(parsedDuration / Math.max(1, activeLectures));

  const [stepStatus, setStepStatus] = useState(() =>
    GENERATION_STAGES.reduce((acc, s) => ({ ...acc, [s.id]: 'pending' }), {})
  );
  const [done, setDone] = useState(false);
  const [createdCourse, setCreatedCourse] = useState(null);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  // draft = course was generated but the DB save failed; holds the raw content
  // so we can retry saving without calling Gemini again.
  const [draft, setDraft] = useState(null);
  const [retryingSave, setRetryingSave] = useState(false);

  const generationStartedRef = useRef(false);

  // Record nav path for smart back tracking
  useEffect(() => {
    recordNavPath(location.pathname);
  }, [location.pathname]);

  const startGeneration = async () => {
    setError(null);
    setDraft(null);
    setDone(false);
    setIsGenerating(true);

    // Reset stages
    setStepStatus(
      GENERATION_STAGES.reduce((acc, s, idx) => ({
        ...acc,
        [s.id]: idx === 0 ? 'active' : 'pending'
      }), {})
    );

    // Animate stage progress while background API call executes
    let currentStage = 1;
    const stageInterval = setInterval(() => {
      if (currentStage < 5) {
        setStepStatus(prev => ({
          ...prev,
          [currentStage]: 'done',
          [currentStage + 1]: 'active'
        }));
        currentStage++;
      }
    }, 1200);

    try {
      const res = await api.generateCourse({
        topic: activeTopic,
        student_level: activeLevel,
        duration_minutes: parsedDuration,
        number_of_lectures: activeLectures,
        learning_objectives: activeObjectives
      });

      clearInterval(stageInterval);

      // Mark all stages as done
      setStepStatus(
        GENERATION_STAGES.reduce((acc, s) => ({ ...acc, [s.id]: 'done' }), {})
      );

      const courseData = res.course;
      setCreatedCourse(courseData);
      setDone(true);
      setIsGenerating(false);
    } catch (err) {
      clearInterval(stageInterval);
      console.error('Course generation/save failed:', err);

      // If the server returned a `draft`, the course was GENERATED but not SAVED.
      // Surface the draft so the user can retry saving without re-generating.
      if (err.draft) {
        setDraft(err.draft);
        setError(err.message);
      } else {
        setError(err.message || 'Failed to generate verified course');
      }
      setIsGenerating(false);
    }
  };

  // Retry saving an already-generated course without calling Gemini again.
  const retrySave = async () => {
    if (!draft) return;
    setRetryingSave(true);
    setError(null);
    try {
      const res = await api.createCourse({
        title: draft.title || activeTopic,
        topic: activeTopic,
        student_level: activeLevel,
        duration_minutes: parsedDuration,
        language: activeLanguage,
        content: draft
      });
      setCreatedCourse(res.course);
      setDraft(null);
      setDone(true);
    } catch (err) {
      console.error('Retry save failed:', err);
      setError(err.message || 'Retry save failed — check the backend logs');
    } finally {
      setRetryingSave(false);
    }
  };

  useEffect(() => {
    if (!generationStartedRef.current) {
      generationStartedRef.current = true;
      startGeneration();
    }
  }, []);

  const completedCount = Object.values(stepStatus).filter(s => s === 'done').length;
  const progress = Math.round((completedCount / GENERATION_STAGES.length) * 100);

  const courseId = createdCourse?.id;
  const verificationSummary = createdCourse?.content?.verificationSummary || createdCourse?.verificationSummary;
  const passedCount = verificationSummary?.passed ?? createdCourse?.verifiedCount ?? 0;
  const totalCount = verificationSummary?.total ?? createdCourse?.totalCount ?? 0;

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
            <span>Total Duration: {activeDuration}</span>
            <span>·</span>
            <span>Sessions: {activeLectures} lectures</span>
            <span>·</span>
            <span>Pacing: ~{timePerLecture} mins/class</span>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '2rem' }}>
          <p className="overline-editorial" style={{ marginBottom: '0.35rem' }}>
            {done ? 'Generation Completed' : 'Real Java 21 Sandbox Execution'}
          </p>
          <h1 className="heading-editorial" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            {done ? 'Course Workspace Ready.' : 'Compiling & Verifying Course.'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {done
              ? `Verification finished: ${passedCount}/${totalCount} Java snippets and labs passed execution.`
              : 'Synthesizing verified slide decks, trainer notes, runnable code examples, and test suites.'}
          </p>
        </div>

        {/* Progress Bar */}
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
            background: done ? 'var(--status-passed)' : 'var(--text-primary)',
            transition: 'width 0.35s ease',
          }} />
        </div>

        {/* Structured Stages */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          {GENERATION_STAGES.map(stage => {
            const status = stepStatus[stage.id];
            return (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  opacity: status === 'pending' ? 0.45 : 1,
                  transition: 'opacity 0.25s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <StageStatusIcon status={status} />
                  <span style={{ color: status === 'done' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {stage.label}
                  </span>
                </span>

                <span style={{
                  fontSize: '0.725rem',
                  fontFamily: 'var(--font-mono)',
                  color: status === 'done' ? 'var(--status-passed)' : status === 'active' ? 'var(--text-secondary)' : 'var(--text-muted)'
                }}>
                  {status === 'done' ? 'DONE' : status === 'active' ? 'EXECUTING' : 'PENDING'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Verification Guarantee Notice */}
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
          <ShieldCheck size={16} color="var(--status-passed)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong>Real Java 21 Sandbox:</strong> All code snippets and exercises are compiled with <code>javac --release 21</code> and executed to prove zero runtime failures.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '1.25rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--status-failed)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} color="var(--status-failed)" />
              <strong style={{ color: 'var(--status-failed)', fontSize: '0.875rem' }}>
                {draft ? 'Generated — but Save Failed' : 'Course Generation Failed'}
              </strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
              {error}
            </p>
            {draft ? (
              // Course was generated, only the DB save failed — retry without Gemini
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  style={{ gap: '0.4rem', fontSize: '0.825rem' }}
                  onClick={retrySave}
                  disabled={retryingSave}
                >
                  {retryingSave
                    ? <><div className="spinner" style={{ width: 13, height: 13 }} /> Saving…</>
                    : <><RefreshCw size={13} /> Retry Save (no re-generation)</>}
                </button>
                <button
                  className="btn-secondary"
                  style={{ gap: '0.4rem', fontSize: '0.825rem' }}
                  onClick={startGeneration}
                  disabled={retryingSave}
                >
                  <RefreshCw size={13} /> Re-generate from scratch
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="btn-secondary"
                  style={{ gap: '0.4rem', fontSize: '0.825rem' }}
                  onClick={startGeneration}
                >
                  <RefreshCw size={13} /> Retry Generation
                </button>
              </div>
            )}
          </div>
        )}

        {/* Completion CTA */}
        {done && courseId && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.925rem', gap: '0.45rem', justifyContent: 'center' }}
              onClick={() => navigate(`/course/${courseId}`)}
            >
              Open Course Workspace ({passedCount}/{totalCount} Verified) <ArrowRight size={14} />
            </button>
            <button
              className="btn-ghost"
              style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', justifyContent: 'center' }}
              onClick={() => navigate('/create')}
            >
              Modify Specifications & Generate Another
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
