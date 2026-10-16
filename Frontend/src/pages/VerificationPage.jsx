// src/pages/VerificationPage.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, ShieldX, Terminal, TestTube, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import WorkspaceHeader from '../components/layout/WorkspaceHeader';
import { mockVerificationSummary, mockSnippets } from '../data/mockVerification';
import { mockCourses } from '../data/mockCourses';
import { highlightCode } from '../utils/codeHighlighter';

function StatusBadge({ status }) {
  const cfg = {
    passed:  { cls: 'badge-green', label: 'Passed' },
    failed:  { cls: 'badge-red',   label: 'Failed' },
    pending: { cls: 'badge-gray',  label: 'Pending' },
    review:  { cls: 'badge-amber', label: 'Review' },
  }[status] || { cls: 'badge-gray', label: status };

  return (
    <span className={`badge ${cfg.cls}`}>
      {status === 'passed' ? '● ' : status === 'failed' ? '✕ ' : '○ '}
      {cfg.label}
    </span>
  );
}

function CodeViewer({ snippet }) {
  const [tab, setTab] = useState('code');

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
        alignItems: 'center',
        background: 'var(--bg-surface)'
      }}>
        <div>
          <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            {snippet.title}
          </h3>
          <div style={{ display: 'flex', gap: '0.65rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span>{snippet.language}</span>
            <span>·</span>
            <span>{snippet.runtimeVersion}</span>
            <span>·</span>
            <span>{snippet.slideTitle}</span>
          </div>
        </div>
        <StatusBadge status={snippet.status} />
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface-secondary)'
      }}>
        {[
          { id: 'code',    label: 'Code' },
          { id: 'compile', label: 'Build Output' },
          { id: 'output',  label: 'Execution Output' },
          { id: 'tests',   label: 'Test Results' },
          { id: 'history', label: 'History' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '0.55rem 0.95rem',
              fontSize: '0.775rem',
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${tab === t.id ? 'var(--text-primary)' : 'transparent'}`,
              color: tab === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontWeight: tab === t.id ? 600 : 400,
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div style={{ padding: '1.25rem' }}>
        {tab === 'code' && (
          <div
            className="code-block"
            dangerouslySetInnerHTML={{ __html: highlightCode(snippet.code || '') }}
          />
        )}

        {tab === 'compile' && (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
              padding: '0.4rem 0.65rem',
              background: 'var(--bg-surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)'
            }}>
              <Terminal size={13} color="var(--text-muted)" />
              <code style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {snippet.command}
              </code>
            </div>
            {snippet.compilationOutput ? (
              <pre
                className="code-block"
                style={{
                  color: snippet.status === 'failed' ? 'var(--status-failed)' : 'var(--status-passed)'
                }}
              >
                {snippet.compilationOutput}
              </pre>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                Verification not yet executed.
              </p>
            )}
          </div>
        )}

        {tab === 'output' && (
          <div>
            {snippet.executionOutput ? (
              <>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  STANDARD OUTPUT
                </p>
                <pre
                  className="code-block"
                  style={{
                    color: 'var(--status-passed)',
                    marginBottom: '1rem'
                  }}
                >
                  {snippet.executionOutput}
                </pre>
                {snippet.error && (
                  <>
                    <p style={{ fontSize: '0.75rem', color: 'var(--status-failed)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                      STANDARD ERROR
                    </p>
                    <pre
                      className="code-block"
                      style={{
                        color: 'var(--status-failed)',
                        marginBottom: '1rem'
                      }}
                    >
                      {snippet.error}
                    </pre>
                  </>
                )}
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  EXPECTED MATCH
                </p>
                <pre className="code-block" style={{ color: 'var(--text-secondary)' }}>
                  {snippet.expectedOutput}
                </pre>
              </>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                Execution not yet run.
              </p>
            )}
          </div>
        )}

        {tab === 'tests' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                background: 'var(--status-passed-bg)',
                border: '1px solid var(--status-passed-border)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--status-passed)', fontFamily: 'var(--font-mono)' }}>
                  {snippet.testsPassed}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tests Passed</p>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                background: snippet.testsFailed ? 'var(--status-failed-bg)' : 'var(--bg-surface-secondary)',
                border: `1px solid ${snippet.testsFailed ? 'var(--status-failed-border)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)'
              }}>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: snippet.testsFailed ? 'var(--status-failed)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {snippet.testsFailed}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tests Failed</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {snippet.verificationHistory?.length > 0 ? snippet.verificationHistory.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.775rem'
                }}
              >
                <span className={`status-dot ${h.status === 'passed' ? 'green' : 'red'}`} />
                <span style={{ color: 'var(--text-primary)', flex: 1, textTransform: 'capitalize' }}>
                  {h.status}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{h.durationMs}ms</span>
                <span style={{ color: 'var(--text-muted)' }}>{new Date(h.at).toLocaleDateString()}</span>
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>No verification history recorded.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerificationPage() {
  const { courseId } = useParams();
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];
  const [selected, setSelected] = useState(mockSnippets[0]);
  const summary = mockVerificationSummary;

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', transition: 'background-color 0.2s ease' }}>
      <WorkspaceHeader course={course} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
        {/* Verification Report Notice */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          padding: '0.85rem 1.25rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <AlertCircle size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>ILLUSTRATIVE PREVIEW:</strong> All compilation logs, exit codes, and test assertions are mock records for this frontend demonstration.
            </p>
          </div>
          <span style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>
            CONTAINER: DEBIAN-BOOKWORM-SLIM
          </span>
        </div>

        {/* Technical Summary Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { label: 'Total Snippets', value: summary.total, sub: '8 in curriculum' },
            { label: 'Passed Tests',   value: summary.passed, sub: 'exit code 0', color: 'var(--status-passed)' },
            { label: 'Failed Tests',   value: summary.failed, sub: 'runtime exception', color: 'var(--status-failed)' },
            { label: 'Pending Check',  value: summary.pending, sub: 'queued for build', color: 'var(--text-muted)' },
          ].map(s => (
            <div
              key={s.label}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
              }}
            >
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: s.color || 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1
              }}>
                {s.value}
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-primary)', fontWeight: 500, marginTop: '0.5rem' }}>
                {s.label}
              </p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {s.sub}
              </p>
            </div>
          ))}

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
          }}>
            <p style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.2
            }}>
              {summary.environment}
            </p>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-primary)', fontWeight: 500, marginTop: '0.5rem' }}>
              Runtime Target
            </p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Pinned Container SDK
            </p>
          </div>
        </div>

        {/* Master-Detail Code Inspection Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 320px) 1fr',
          gap: '1.25rem',
          alignItems: 'start'
        }}>
          {/* Left: Snippets Selector List */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '0.85rem 1rem',
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg-surface)'
            }}>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                Verified Snippets ({mockSnippets.length})
              </p>
            </div>

            {mockSnippets.map(snip => {
              const isSelected = selected?.id === snip.id;
              return (
                <div
                  key={snip.id}
                  onClick={() => setSelected(snip)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--bg-surface-secondary)' : 'transparent',
                    borderLeft: `3px solid ${isSelected ? 'var(--text-primary)' : 'transparent'}`,
                    transition: 'all 0.1s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        fontSize: '0.825rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: '0.2rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {snip.title}
                      </p>
                      <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        {snip.slideTitle}
                      </p>
                    </div>
                    <StatusBadge status={snip.status} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Technical Code & Log Inspector */}
          {selected && <CodeViewer snippet={selected} />}
        </div>
      </div>
    </div>
  );
}
