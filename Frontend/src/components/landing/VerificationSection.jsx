// src/components/landing/VerificationSection.jsx
import { ShieldCheck, Terminal, CheckCircle2, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VerificationSection() {
    return (
        <section style={{
            padding: '5.5rem 1.5rem',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-surface-secondary)',
            transition: 'background-color 0.2s ease, border-color 0.2s ease'
        }}>
            <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3.5rem',
                    alignItems: 'center'
                }}>
                    {/* Left Column: Editorial explanation */}
                    <div>
                        <p className="overline-editorial" style={{ marginBottom: '0.75rem' }}>
                            The Core Differentiator
                        </p>
                        <h2 className="heading-editorial" style={{
                            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                            lineHeight: 1.15,
                            marginBottom: '1.25rem',
                        }}>
                            Generated is not the same as verified.
                        </h2>
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: '1.5rem'
                        }}>
                            Course examples are designed to be checked against specific runtime versions, with clear results for compilation, execution, and tests.
                        </p>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.6,
                            marginBottom: '2rem'
                        }}>
                            Eliminate classroom syntax surprises, deprecated APIs, and broken edge cases before you step in front of your students.
                        </p>

                        <Link
                            to="/studio/course-001/verification"
                            className="btn-secondary"
                            style={{ gap: '0.5rem', fontSize: '0.85rem' }}
                        >
                            <Terminal size={14} /> Open Verification Center
                        </Link>
                    </div>

                    {/* Right Column: Restrained Developer Verification Report Preview */}
                    <div>
                        <div style={{
                            background: 'var(--code-bg)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-md)',
                            overflow: 'hidden',
                            fontFamily: 'var(--font-mono)'
                        }}>
                            {/* Report Header */}
                            <div style={{
                                padding: '0.75rem 1.25rem',
                                borderBottom: '1px solid var(--border)',
                                background: 'var(--bg-surface)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        background: 'var(--status-passed)'
                                    }} />
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.06em',
                                        color: 'var(--text-primary)'
                                    }}>
                                        JAVA 21 · VERIFICATION REPORT
                                    </span>
                                </div>
                                <span style={{
                                    fontSize: '0.7rem',
                                    color: 'var(--text-muted)',
                                    border: '1px solid var(--border)',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: 'var(--radius-full)',
                                    background: 'var(--bg-surface-secondary)'
                                }}>
                                    Illustrative preview
                                </span>
                            </div>

                            {/* Code snippet tested */}
                            <div style={{
                                padding: '1rem 1.25rem',
                                borderBottom: '1px solid var(--border-subtle)',
                                fontSize: '0.775rem',
                                lineHeight: 1.6,
                                color: 'var(--text-secondary)'
                            }}>
                                <span style={{ color: 'var(--hl-keyword)' }}>import</span> java.util.<span style={{ color: 'var(--hl-type)' }}>ArrayList</span>;<br />
                                <span style={{ color: 'var(--hl-keyword)' }}>public class</span> <span style={{ color: 'var(--text-primary)' }}>CollectionsDemo</span> &#123;<br />
                                &nbsp;&nbsp;<span style={{ color: 'var(--hl-keyword)' }}>public static void</span> <span style={{ color: 'var(--text-primary)' }}>main</span>(String[] args) &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;var list = <span style={{ color: 'var(--hl-keyword)' }}>new</span> <span style={{ color: 'var(--hl-type)' }}>ArrayList</span>&lt;String&gt;();<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;list.add(<span style={{ color: 'var(--hl-string)' }}>"verified"</span>);<br />
                                &nbsp;&nbsp;&#125;<br />
                                &#125;
                            </div>

                            {/* Report Metrics List */}
                            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Code compilation</span>
                                    <span style={{ color: 'var(--status-passed)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 500 }}>
                                        <CheckCircle2 size={13} /> Passed
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Execution</span>
                                    <span style={{ color: 'var(--status-passed)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 500 }}>
                                        <CheckCircle2 size={13} /> Passed
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Automated tests</span>
                                    <span style={{ color: 'var(--status-passed)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 500 }}>
                                        <CheckCircle2 size={13} /> Passed
                                    </span>
                                </div>

                                <div style={{
                                    height: '1px',
                                    background: 'var(--border-subtle)',
                                    margin: '0.25rem 0'
                                }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    <span>Runtime version</span>
                                    <span style={{ color: 'var(--text-primary)' }}>Java 21 (OpenJDK 21.0.2)</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    <span>Target container</span>
                                    <span style={{ color: 'var(--text-primary)' }}>debian-bookworm-slim</span>
                                </div>
                            </div>

                            {/* Footer status notice */}
                            <div style={{
                                padding: '0.6rem 1.25rem',
                                background: 'var(--bg-surface)',
                                borderTop: '1px solid var(--border)',
                                fontSize: '0.7rem',
                                color: 'var(--text-muted)'
                            }}>
                                Verified runtime sandbox template · Zero classroom regressions
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}