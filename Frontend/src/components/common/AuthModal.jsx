// src/components/common/AuthModal.jsx
import { useState } from 'react';
import { X, ArrowRight, UserCheck, Shield, Mail, AlertCircle, Lock, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiLogin, apiRegister, saveAuthToken } from '../../services/api';

export default function AuthModal({ isOpen, onClose, onNavigate }) {
  const { createGuestSession, addToast } = useApp();

  const [authMode, setAuthMode] = useState('guest'); // 'guest' | 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  if (!isOpen) return null;

  const handleGoogleClick = () => {
    setNotice({
      type: 'info',
      title: 'Google OAuth Notice',
      message: 'Google Sign-In is configured on the Supabase dashboard. You can sign in using Email & Password or explore immediately as a Guest.'
    });
  };

  const handleEmailAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'warning');
      return;
    }
    if (!password || password.length < 6) {
      addToast('Password must be at least 6 characters.', 'warning');
      return;
    }

    setLoading(true);
    setNotice(null);

    try {
      if (authMode === 'register') {
        const res = await apiRegister({ email: email.trim(), password });
        if (res.session?.access_token) {
          saveAuthToken(res.session.access_token);
          addToast('Account created and signed in!', 'success');
          onClose();
          if (onNavigate) onNavigate('/dashboard');
        } else {
          setNotice({
            type: 'info',
            title: 'Registration Received',
            message: res.message || 'Check your email for confirmation if required, or sign in now.'
          });
          setAuthMode('login');
        }
      } else {
        const res = await apiLogin({ email: email.trim(), password });
        if (res.session?.access_token) {
          saveAuthToken(res.session.access_token);
          addToast('Signed in successfully!', 'success');
          onClose();
          if (onNavigate) onNavigate('/dashboard');
        }
      }
    } catch (err) {
      setNotice({
        type: 'error',
        title: authMode === 'register' ? 'Registration Error' : 'Sign In Error',
        message: err.message || 'Authentication failed. Please verify credentials or continue as guest.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestClick = () => {
    createGuestSession();
    onClose();
    addToast('Guest session active. Your curriculum drafts are preserved.', 'info');
    if (onNavigate) {
      onNavigate('/create');
    } else {
      window.location.href = '/create';
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ zIndex: 9999 }}
    >
      <div
        className="modal-box animate-slide-up"
        style={{
          maxWidth: '440px',
          padding: '2rem 1.75rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header row with logo and close button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: '5px',
              background: 'var(--text-primary)',
              color: 'var(--bg-base)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)'
            }}>
              V
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)'
            }}>
              VERIFIED COURSE STUDIO
            </span>
          </div>

          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close authentication modal"
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Title */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontSize: '1.35rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '0.35rem'
          }}>
            {authMode === 'login' ? 'Sign In to Your Studio' : authMode === 'register' ? 'Create Studio Account' : 'Access Course Studio'}
          </h2>
          <p style={{
            fontSize: '0.825rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5
          }}>
            {authMode === 'guest'
              ? 'Start creating immediately as a guest or sign in to save your courses to the cloud database.'
              : 'Enter your credentials to manage and persist your courses.'}
          </p>
        </div>

        {/* Informative notice message if active */}
        {notice && (
          <div style={{
            display: 'flex',
            gap: '0.65rem',
            padding: '0.8rem 1rem',
            background: notice.type === 'error' ? 'rgba(239, 68, 68, 0.08)' : 'var(--bg-surface-secondary)',
            border: '1px solid ' + (notice.type === 'error' ? 'rgba(239, 68, 68, 0.25)' : 'var(--border)'),
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={15} color={notice.type === 'error' ? '#ef4444' : 'var(--text-secondary)'} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: '0.775rem', fontWeight: 600, color: notice.type === 'error' ? '#ef4444' : 'var(--text-primary)', marginBottom: '0.15rem' }}>
                {notice.title}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {notice.message}
              </p>
            </div>
          </div>
        )}

        {/* Actions list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {authMode === 'guest' ? (
            <>
              {/* Continue as Guest - Primary & Highlighted */}
              <button
                type="button"
                onClick={handleGuestClick}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  gap: '0.5rem',
                }}
              >
                <UserCheck size={15} />
                <span>Continue as Guest</span>
                <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
              </button>

              {/* Guest Perks note */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.725rem',
                color: 'var(--text-muted)',
                padding: '0 0.25rem'
              }}>
                <Shield size={12} />
                <span>Guest mode stores your course drafts locally in this browser.</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                margin: '0.5rem 0'
              }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>OR</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              {/* Switch to email login */}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  justifyContent: 'center',
                  fontSize: '0.825rem',
                  gap: '0.5rem'
                }}
              >
                <Mail size={14} />
                <span>Sign in with Email & Password</span>
              </button>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleClick}
                className="btn-ghost"
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  gap: '0.5rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <span>Google OAuth Info</span>
              </button>
            </>
          ) : (
            /* Email + Password Form */
            <form onSubmit={handleEmailAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-text"
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem 0.75rem' }}
                  autoFocus
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-text"
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem 0.75rem' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '0.7rem', justifyContent: 'center', fontSize: '0.85rem', gap: '0.45rem', marginTop: '0.25rem' }}
              >
                {loading ? <Loader2 size={14} className="spin" /> : <Lock size={14} />}
                <span>{authMode === 'register' ? 'Register Account' : 'Sign In'}</span>
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                <button
                  type="button"
                  className="btn-ghost"
                  style={{ padding: 0, fontSize: '0.75rem', color: 'var(--accent-subtle)' }}
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                >
                  {authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Sign In'}
                </button>

                <button
                  type="button"
                  className="btn-ghost"
                  style={{ padding: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}
                  onClick={() => setAuthMode('guest')}
                >
                  Back to Guest
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Subtle Privacy Notice Footer */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.725rem',
            color: 'var(--text-muted)',
            lineHeight: 1.45
          }}>
            By continuing, you agree to Verified Course Studio terms and privacy standards.
          </p>
        </div>
      </div>
    </div>
  );
}
