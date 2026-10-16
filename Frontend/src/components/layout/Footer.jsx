// src/components/layout/Footer.jsx
import { Globe, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-base)',
      padding: '4rem 1.5rem 2.5rem',
      transition: 'background-color 0.2s ease, border-color 0.2s ease'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'space-between',
          marginBottom: '3rem'
        }}>
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '4px',
                background: 'var(--text-primary)',
                color: 'var(--bg-base)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}>
                V
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Verified Course Studio
              </span>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              A specialized studio for technical educators, instructors, and training teams to create verified, reliable course curriculum.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '3.5rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
                fontFamily: 'var(--font-mono)'
              }}>
                Platform
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {['Presentation Studio', 'Verification Engine', 'Exercises & Labs', 'Assessments'].map(l => (
                  <span key={l} style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
                fontFamily: 'var(--font-mono)'
              }}>
                Studio
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <Link to="/dashboard" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Course Library
                </Link>
                <Link to="/studio/course-001/slides" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Slide Canvas
                </Link>
                <Link to="/studio/course-001/verification" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Code Verification
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '1.75rem' }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            © 2026 Verified Course Studio. Monochromatic educational architecture.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              v1.2 · Clean Monochromatic Edition
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
