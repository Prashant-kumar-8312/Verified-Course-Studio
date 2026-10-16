// src/components/landing/HowItWorks.jsx
import { FileEdit, Cpu, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileEdit,
    title: 'Describe Your Lesson',
    description: 'Provide your topic, learning objectives, target experience level, session duration, and chosen language runtime.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Automated Verification',
    description: 'Course materials are generated together with runnable code blocks that are compiled and test-checked in sandboxed runtimes.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Classroom Delivery',
    description: 'Inspect the verified slide deck, review instructor speaker notes, assign test-driven exercises, and export ready-to-teach materials.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      padding: '5.5rem 1.5rem',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-base)',
      transition: 'background-color 0.2s ease, border-color 0.2s ease'
    }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
          <p className="overline-editorial" style={{ marginBottom: '0.65rem' }}>
            Structured Workflow
          </p>
          <h2 className="heading-editorial" style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            How it works.
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
          }}>
            From concept to validated classroom materials in three purposeful steps.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {steps.map((s) => (
            <div
              key={s.number}
              style={{
                borderTop: '1px solid var(--border-strong)',
                paddingTop: '1.5rem',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)'
                }}>
                  STEP {s.number}
                </span>
                <div style={{
                  color: 'var(--text-secondary)'
                }}>
                  <s.icon size={16} />
                </div>
              </div>

              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em'
              }}>
                {s.title}
              </h3>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65
              }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
