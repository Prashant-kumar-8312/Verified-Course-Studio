// src/components/landing/FeatureGrid.jsx
import { Presentation, BookText, Code2, FlaskConical, HelpCircle, FileText } from 'lucide-react';

const capabilities = [
  {
    icon: Presentation,
    title: 'Presentation Studio',
    description: 'Create structured, branded slide decks.',
    detail: 'Complete with learning outcomes, architectural comparisons, code layouts, and clean visual typography.',
  },
  {
    icon: BookText,
    title: 'Trainer Notes',
    description: 'Prepare useful explanations for every slide.',
    detail: 'Talking points, anticipated student misconceptions, timing milestones, and live demo instructions.',
  },
  {
    icon: Code2,
    title: 'Verified Code',
    description: 'Inspect code examples and their verification results.',
    detail: 'Every snippet is formatted and verified against specific compiler and runtime versions.',
  },
  {
    icon: FlaskConical,
    title: 'Practical Exercises',
    description: 'Build hands-on exercises with automated tests.',
    detail: 'Problem statements, example inputs, expected outputs, and dual reference/naive solutions.',
  },
  {
    icon: HelpCircle,
    title: 'Quizzes and Assessments',
    description: 'Generate questions with meaningful explanations.',
    detail: 'Concept-checking questions with diagnostic distractors and pedagogical rationale for answers.',
  },
  {
    icon: FileText,
    title: 'Export-Ready Materials',
    description: 'Prepare materials for PowerPoint and PDF.',
    detail: 'Ready-to-deliver assets structured for LMS integration, classroom projection, and student distribution.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" style={{
      padding: '6rem 1.5rem',
      background: 'var(--bg-base)',
      transition: 'background-color 0.2s ease'
    }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
          <p className="overline-editorial" style={{ marginBottom: '0.65rem' }}>
            Core Capabilities
          </p>
          <h2 className="heading-editorial" style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            Everything your next lesson needs.
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
          }}>
            One workspace for creating, refining, and validating your teaching materials.
          </p>
        </div>

        {/* 6 Capabilities Refined Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {capabilities.map((item, idx) => (
            <div
              key={item.title}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
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
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-secondary)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                  }}>
                    <item.icon size={16} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)'
                  }}>
                    0{idx + 1}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.01em'
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  lineHeight: 1.5
                }}>
                  {item.description}
                </p>

                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6
                }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
