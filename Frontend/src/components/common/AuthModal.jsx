import { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight, LoaderCircle, LockKeyhole, Mail, Shield, UserCheck, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AuthModal({ isOpen, onClose, onNavigate }) {
    const { createGuestSession, addToast, setAuthSession } = useApp();
    const [mode, setMode] = useState('register');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        if (!isOpen) return;
        setEmail('');
        setPassword('');
        setNotice(null);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAuthSubmit = async (event) => {
        event.preventDefault();
        const normalizedEmail = email.trim();

        if (!normalizedEmail || !normalizedEmail.includes('@')) {
            setNotice({ type: 'error', message: 'Enter a valid email address.' });
            return;
        }
        if (password.length < 8) {
            setNotice({ type: 'error', message: 'Password must be at least 8 characters.' });
            return;
        }
        setLoading(true);
        setNotice(null);

        try {
            const response = await fetch(`${API_URL}/api/auth/${mode}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: normalizedEmail, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed.');
            }

            if (data.session) {
                setAuthSession(data.session);
                onClose();
                addToast(mode === 'register' ? 'Account created successfully.' : 'Welcome back.', 'success');
                if (onNavigate) onNavigate('/');
                return;
            }

            setNotice({
                type: 'success',
                message: data.message || 'Check your email to confirm your account, then sign in.',
            });
            setMode('login');
            setPassword('');
        } catch (error) {
            setNotice({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGuestClick = () => {
        createGuestSession();
        onClose();
        addToast('Guest session started. Drafts are preserved locally.', 'info');
        if (onNavigate) onNavigate('/create');
    };

    return (
        <div className="modal-overlay" onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
        }} style={{ zIndex: 9999 }}>
            <div className="modal-box animate-slide-up" style={{
                maxWidth: '480px',
                padding: '2.25rem 2rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: 26, height: 26, borderRadius: '5px', background: 'var(--text-primary)', color: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>V</div>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>VERIFIED COURSE STUDIO</span>
                    </div>
                    <button type="button" className="btn-icon" onClick={onClose} aria-label="Close modal"><X size={15} /></button>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                        {mode === 'register' ? 'New workspace' : 'Member access'}
                    </p>
                    <h2 className="heading-editorial" style={{ fontSize: '1.8rem', lineHeight: 1.15, marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
                        {mode === 'register' ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, maxWidth: '34rem' }}>
                        {mode === 'register' ? 'Start building verified teaching material.' : 'Sign in to continue creating courses.'}
                    </p>
                </div>

                {notice && (
                    <div role="alert" aria-live="polite" style={{ display: 'flex', gap: '0.65rem', padding: '0.8rem 1rem', background: notice.type === 'success' ? 'var(--status-passed-bg)' : 'var(--status-failed-bg)', border: `1px solid ${notice.type === 'success' ? 'var(--status-passed-border)' : 'var(--status-failed-border)'}`, borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                        {notice.type === 'success' ? <Shield size={15} color="var(--status-passed)" /> : <AlertCircle size={15} color="var(--status-failed)" />}
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{notice.message}</p>
                    </div>
                )}

                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }} htmlFor="auth-email">
                        Email address
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={15} color="var(--text-muted)" />
                        <input id="auth-email" type="email" autoComplete="email" placeholder="name@domain.com" value={email} onChange={(event) => setEmail(event.target.value)} className="input-text" style={{ fontSize: '0.825rem', padding: '0.6rem 0.75rem', flex: 1 }} required />
                    </div>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }} htmlFor="auth-password">
                        Password
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LockKeyhole size={15} color="var(--text-muted)" />
                        <input id="auth-password" type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} className="input-text" style={{ fontSize: '0.825rem', padding: '0.6rem 0.75rem', flex: 1 }} required minLength={8} />
                    </div>
                    </label>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '0.65rem 1rem', justifyContent: 'center', fontSize: '0.85rem', gap: '0.5rem', marginTop: '0.25rem' }}>
                        {loading ? <LoaderCircle size={15} className="spin" /> : <ArrowRight size={14} />}
                        <span>{loading ? 'Please wait...' : mode === 'register' ? 'Register' : 'Login'}</span>
                    </button>
                </form>

                <button type="button" className="btn-ghost" onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setNotice(null); }} style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', marginTop: '0.85rem', color: 'var(--text-secondary)' }}>
                    {mode === 'register' ? 'Already have an account? Login' : 'Need an account? Register'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>OR</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>

                <button type="button" onClick={handleGuestClick} className="btn-secondary" style={{ width: '100%', padding: '0.65rem 1rem', justifyContent: 'center', fontSize: '0.8rem', gap: '0.5rem' }}>
                    <UserCheck size={14} />
                    <span>Continue as Guest</span>
                </button>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
                    <Shield size={12} /> Guest drafts are stored in this browser session only.
                </p>
            </div>
        </div>
    );
}
