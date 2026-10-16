// src/pages/ExercisesPage.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, Code2, BookOpen, TestTube, AlertCircle } from 'lucide-react';
import WorkspaceHeader from '../components/layout/WorkspaceHeader';
import { mockExercises } from '../data/mockExercises';
import { mockCourses } from '../data/mockCourses';
import { highlightCode } from '../utils/codeHighlighter';

function TestCaseRow({ tc }) {
  const isPassed = tc.status === 'passed';
  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
      padding: '0.6rem 0',
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.775rem'
    }}>
      {isPassed ? (
        <CheckCircle2 size={13} color="var(--status-passed)" style={{ flexShrink: 0 }} />
      ) : (
        <XCircle size={13} color="var(--status-failed)" style={{ flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'var(--text-primary)', marginBottom: '0.15rem', fontFamily: 'var(--font-sans)' }}>
          {tc.description}
        </p>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
          <span>Input: <code style={{ color: 'var(--text-secondary)' }}>{tc.input}</code></span>
          <span>Expected: <code style={{ color: 'var(--status-passed)' }}>{tc.expected}</code></span>
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise }) {
  const [expanded, setExpanded]           = useState(false);
  const [codeTab, setCodeTab]             = useState('reference');
  const [showTestCases, setShowTestCases] = useState(false);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      marginBottom: '1rem',
      transition: 'border-color 0.15s ease'
    }}>
      {/* Header */}
      <div
        onClick={() => setExpanded(v => !v)}
        style={{
          padding: '1.25rem 1.5rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          background: 'var(--bg-surface)'
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className={`badge ${exercise.difficulty === 'Easy' ? 'badge-green' : 'badge-amber'}`}>
              {exercise.difficulty}
            </span>
            <span className="badge badge-gray">{exercise.topic}</span>
            <span style={{
              fontSize: '0.725rem',
              color: 'var(--status-passed)',
              fontFamily: 'var(--font-mono)'
            }}>
              {exercise.testsPassed}/{exercise.testsPassed + exercise.testsFailed} tests pass
            </span>
          </div>
          <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {exercise.title}
          </h3>
          <p style={{
            fontSize: '0.825rem',
            color: 'var(--text-secondary)',
            marginTop: '0.2rem',
            lineHeight: 1.5,
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {exercise.description}
          </p>
        </div>
        <button className="btn-icon" style={{ flexShrink: 0 }}>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {/* Expanded Accordion Content */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {/* Problem Statement */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <p className="overline-editorial" style={{ marginBottom: '0.5rem' }}>
              Problem Statement
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-primary)',
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
            }}>
              {exercise.problemStatement}
            </p>
          </div>

          {/* Example Input / Output */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            background: 'var(--bg-surface-secondary)'
          }}>
            <div>
              <p style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                EXAMPLE INPUT
              </p>
              <pre className="code-block" style={{ fontSize: '0.75rem', padding: '0.75rem' }}>{exercise.exampleInput}</pre>
            </div>
            <div>
              <p style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                EXAMPLE OUTPUT
              </p>
              <pre className="code-block" style={{ fontSize: '0.75rem', padding: '0.75rem', color: 'var(--status-passed)' }}>{exercise.exampleOutput}</pre>
            </div>
          </div>

          {/* Test cases toggle */}
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setShowTestCases(v => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: 0,
                fontFamily: 'var(--font-mono)'
              }}
            >
              <TestTube size={13} />
              VERIFIED TEST SUITE ({exercise.testCases.length} CASES)
              {showTestCases ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {showTestCases && (
              <div style={{ marginTop: '0.75rem' }}>
                {exercise.testCases.map(tc => <TestCaseRow key={tc.id} tc={tc} />)}
              </div>
            )}
          </div>

          {/* Solution Tabs */}
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <p className="overline-editorial">
                Verified Solutions
              </p>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  className={codeTab === 'reference' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
                  onClick={() => setCodeTab('reference')}
                >
                  <Code2 size={12} /> Reference Solution
                </button>
                <button
                  className={codeTab === 'naive' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
                  onClick={() => setCodeTab('naive')}
                >
                  <BookOpen size={12} /> Naive Solution
                </button>
              </div>
            </div>

            <div
              className="code-block"
              style={{ fontSize: '0.775rem' }}
              dangerouslySetInnerHTML={{
                __html: highlightCode(codeTab === 'reference' ? exercise.referenceSolution : exercise.naiveSolution)
              }}
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              Illustrative solution preview · Verified against OpenJDK runtime
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExercisesPage() {
  const { courseId } = useParams();
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', transition: 'background-color 0.2s ease' }}>
      <WorkspaceHeader course={course} />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
          <p className="overline-editorial" style={{ marginBottom: '0.4rem' }}>
            Hands-on Curriculum
          </p>
          <h1 className="heading-editorial" style={{
            fontSize: 'clamp(1.85rem, 3.5vw, 2.35rem)',
            lineHeight: 1.15,
            marginBottom: '0.35rem'
          }}>
            Practical Exercises
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {mockExercises.length} lab exercises with reference solutions and test verification suites.
          </p>
        </div>

        {/* Demo Data Disclaimer */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          marginBottom: '1.75rem',
          padding: '0.75rem 1rem',
          background: 'var(--bg-surface-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          alignItems: 'center'
        }}>
          <AlertCircle size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
            Exercise assertions and compiler traces shown are illustrative mock datasets for template verification.
          </p>
        </div>

        {/* Exercises list */}
        {mockExercises.map(ex => <ExerciseCard key={ex.id} exercise={ex} />)}
      </div>
    </div>
  );
}
