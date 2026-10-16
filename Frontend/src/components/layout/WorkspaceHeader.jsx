// src/components/layout/WorkspaceHeader.jsx
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Download, ChevronDown, Clock, Layers, AlertCircle, X, Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SmartBackButton from '../common/SmartBackButton';

export default function WorkspaceHeader({ course }) {
  const [exportOpen, setExportOpen] = useState(false);
  const [exportModal, setExportModal] = useState(null);
  const { isDark, toggleTheme } = useApp();
  const { courseId } = useParams();
  const overviewFallback = courseId ? `/studio/${courseId}` : '/dashboard';

  const handleExport = (type) => {
    setExportOpen(false);
    setExportModal(type);
  };

  return (
    <>
      <header className="navbar">
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 1.25rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'space-between'
        }}>
          {/* Left: Navigation and course metadata */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
            <SmartBackButton
              fallbackPath={overviewFallback}
              label="Back to Course"
            />
            <div style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0 }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
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
                fontFamily: 'var(--font-mono)',
                flexShrink: 0
              }}>
                V
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {course?.title || 'Course Material'}
                </p>
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Layers size={10} /> {course?.level}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Clock size={10} /> {course?.duration}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {course?.runtimeVersion}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions and theme toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <span style={{
              fontSize: '0.725rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginRight: '0.25rem'
            }}>
              <span className="status-dot green" />
              Saved
            </span>

            {/* Theme toggle */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            <button
              className="btn-secondary"
              style={{ gap: '0.35rem', fontSize: '0.775rem', padding: '0.4rem 0.75rem' }}
            >
              <Save size={12} /> Save
            </button>

            <div style={{ position: 'relative' }}>
              <button
                className="btn-primary"
                style={{ gap: '0.35rem', fontSize: '0.775rem', padding: '0.4rem 0.85rem' }}
                onClick={() => setExportOpen(v => !v)}
              >
                <Download size={12} /> Export <ChevronDown size={11} />
              </button>

              {exportOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 6px)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-md)',
                    overflow: 'hidden',
                    zIndex: 100,
                    minWidth: '170px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 0.85rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--border-subtle)'
                    }}
                    onClick={() => handleExport('pptx')}
                  >
                    <Download size={13} /> Export PowerPoint
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 0.85rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleExport('pdf')}
                  >
                    <Download size={13} /> Export PDF
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Export info modal */}
      {exportModal && (
        <div className="modal-overlay" onClick={() => setExportModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>Export {exportModal === 'pptx' ? 'PowerPoint (.pptx)' : 'PDF'}</h3>
              <button className="btn-icon" onClick={() => setExportModal(null)}><X size={15} /></button>
            </div>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              padding: '0.85rem 1rem',
              background: 'var(--status-warning-bg)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--status-warning-border)',
              marginBottom: '1.25rem'
            }}>
              <AlertCircle size={16} color="var(--status-warning)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--status-warning)', marginBottom: '0.2rem' }}>
                  Illustrative Export Preview
                </p>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Full package export is configured for Supabase storage and Node backend integration. In this frontend demo, template data structures are generated.
                </p>
              </div>
            </div>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setExportModal(null)}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
}
