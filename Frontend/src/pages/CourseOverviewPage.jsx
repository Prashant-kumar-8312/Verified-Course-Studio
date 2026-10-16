// src/pages/CourseOverviewPage.jsx
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Presentation, BookText, Code2, FlaskConical, HelpCircle, FileText, ChevronRight, ShieldCheck, Clock, Layers, X, ArrowRight } from 'lucide-react';
import WorkspaceHeader from '../components/layout/WorkspaceHeader';
import { mockCourses } from '../data/mockCourses';

const materialCards = (course) => [
  {
    id: 'slides',
    icon: Presentation,
    title: 'Presentation Slides',
    stat: `${course.slidesCount} slides`,
    description: 'Structured slide deck with diagrams and code blocks.',
    status: 'Ready',
    route: 'slides',
    actionLabel: 'Edit Slides',
  },
  {
    id: 'notes',
    icon: BookText,
    title: 'Trainer Notes',
    stat: `${course.slidesCount} slides with notes`,
    description: 'Speaker notes and talking points for every slide.',
    status: 'Ready',
    route: 'slides',
    actionLabel: 'Preview Notes',
  },
  {
    id: 'code',
    icon: Code2,
    title: 'Code Examples',
    stat: `${course.codeExamplesCount} snippets`,
    description: 'Runnable code examples verified against runtime.',
    status: course.verificationStatus === 'verified' ? '6/8 Passed' : 'Partial Check',
    route: 'verification',
    actionLabel: 'Inspect Code',
  },
  {
    id: 'exercises',
    icon: FlaskConical,
    title: 'Practical Exercises',
    stat: `${course.exercisesCount} exercises`,
    description: 'Hands-on coding exercises with automated tests.',
    status: '4/5 tests pass',
    route: 'exercises',
    actionLabel: 'View Exercises',
  },
  {
    id: 'quiz',
    icon: HelpCircle,
    title: 'Interactive Quiz',
    stat: `${course.quizCount} questions`,
    description: 'Multiple-choice questions with answer rationales.',
    status: 'Ready',
    route: 'quiz',
    actionLabel: 'Take Quiz',
  },
  {
    id: 'cheatsheet',
    icon: FileText,
    title: 'Cheat Sheet',
    stat: '1-page reference',
    description: 'Condensed reference card of key syntax and complexity.',
    status: 'Ready',
    route: null,
    actionLabel: 'View Sheet',
  },
];

export default function CourseOverviewPage() {
  const { courseId } = useParams();
  const navigate     = useNavigate();
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];
  const cards  = materialCards(course);

  const [cheatSheet, setCheatSheet] = useState(false);

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', transition: 'background-color 0.2s ease' }}>
      <WorkspaceHeader course={course} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          alignItems: 'center',
          marginBottom: '1.75rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)'
        }}>
          <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Library</Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--text-primary)' }}>{course.title}</span>
        </div>

        {/* Course Overview Banner */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.25rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 450px' }}>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                <span className="badge badge-green">Completed</span>
                <span className="badge badge-gray">{course.level}</span>
                <span className="badge badge-gray">{course.language}</span>
                {course.framework !== 'None' && <span className="badge badge-gray">{course.framework}</span>}
              </div>

              <h1 className="heading-editorial" style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
              }}>
                {course.title}
              </h1>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.65,
                maxWidth: '560px'
              }}>
                {course.description}
              </p>
            </div>

            {/* Metrics Tiles */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 100px)',
              gap: '0.75rem',
              alignContent: 'start'
            }}>
              {[
                { label: 'Slides', value: course.slidesCount },
                { label: 'Code', value: course.codeExamplesCount },
                { label: 'Labs', value: course.exercisesCount },
                { label: 'Quiz Qs', value: course.quizCount },
              ].map(s => (
                <div
                  key={s.label}
                  style={{
                    textAlign: 'center',
                    padding: '0.85rem 0.5rem',
                    background: 'var(--bg-surface-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p style={{
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Meta footer row */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border)',
            flexWrap: 'wrap',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            alignItems: 'center'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={13} /> {course.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={13} /> {course.level}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--status-passed)' }}>
              <ShieldCheck size={13} /> Verification: 6/8 passed
            </span>
            <span style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              border: '1px solid var(--border)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-full)'
            }}>
              Illustrative Demo Data
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p className="overline-editorial" style={{ marginBottom: '0.35rem' }}>
            Deliverables
          </p>
          <h2 style={{
            fontWeight: 600,
            fontSize: '1.15rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em'
          }}>
            Course Materials
          </h2>
        </div>

        {/* Material Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {cards.map(card => (
            <div
              key={card.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-strong)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-secondary)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)'
                  }}>
                    <card.icon size={15} />
                  </div>
                  <span style={{
                    fontSize: '0.725rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {card.stat}
                  </span>
                </div>

                <h3 style={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem'
                }}>
                  {card.title}
                </h3>

                <p style={{
                  fontSize: '0.825rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  marginBottom: '1.25rem'
                }}>
                  {card.description}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: card.status.includes('Passed') ? 'var(--status-passed)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  ● {card.status}
                </span>

                <button
                  className="btn-secondary"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.775rem', gap: '0.35rem' }}
                  onClick={() => {
                    if (!card.route) { setCheatSheet(true); return; }
                    navigate(`/studio/${courseId}/${card.route}`);
                  }}
                >
                  {card.actionLabel} <ChevronRight size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick studio navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          borderTop: '1px solid var(--border)',
          paddingTop: '1.75rem'
        }}>
          {[
            { label: 'Slide Deck Editor', route: 'slides' },
            { label: 'Code Verification Runner', route: 'verification' },
            { label: 'Practical Labs', route: 'exercises' },
            { label: 'Interactive Assessment', route: 'quiz' },
          ].map(n => (
            <button
              key={n.label}
              className="btn-secondary"
              onClick={() => navigate(`/studio/${courseId}/${n.route}`)}
              style={{ fontSize: '0.8rem' }}
            >
              {n.label} <ArrowRight size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Cheat sheet modal */}
      {cheatSheet && (
        <div className="modal-overlay" onClick={() => setCheatSheet(false)}>
          <div className="modal-box" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <p className="overline-editorial" style={{ marginBottom: '0.2rem' }}>Reference Card</p>
                <h3 style={{ fontWeight: 600, fontSize: '1.1rem' }}>Java Collections — Quick Reference</h3>
              </div>
              <button className="btn-icon" onClick={() => setCheatSheet(false)}><X size={15} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { name: 'ArrayList', complexity: 'get O(1) · add O(1) amortized' },
                { name: 'LinkedList', complexity: 'get O(n) · addFirst/Last O(1)' },
                { name: 'HashMap', complexity: 'get/put O(1) avg · O(n) worst' },
                { name: 'HashSet', complexity: 'add/contains O(1) avg' },
                { name: 'TreeMap', complexity: 'get/put O(log n) · sorted' },
                { name: 'ArrayDeque', complexity: 'push/pop O(1) · no nulls' },
              ].map(r => (
                <div
                  key={r.name}
                  style={{
                    background: 'var(--bg-surface-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem 0.85rem'
                  }}
                >
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    {r.name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {r.complexity}
                  </p>
                </div>
              ))}
            </div>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setCheatSheet(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
