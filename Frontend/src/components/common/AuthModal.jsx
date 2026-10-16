// src/components/common/AuthModal.jsx
import { useState } from 'react';
import { X, ArrowRight, UserCheck, Shield, Mail, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AuthModal({ isOpen, onClose, onNavigate }) {
  const { createGuestSession, addToast } = useApp();

  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState(null);

  if (!isOpen) return null;

  const handleGoogleClick = () => {
    setNotice({
      type: 'info',
      title: 'Google OAuth Setup',
      message: 'Google Sign-In is configured for the future Supabase backend. Please use "Continue as Guest" for full immediate access to the course creation studio.'
    });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'warning');
      return;
    }
    setNotice({
      type: 'info',
      title: 'Magic Link Demo',
      message: `Supabase Auth integration is planned for the Express backend. A demo sign-in link would be dispatched to ${email}. Continue as Guest to explore now.`
    });
  };

  const handleGuestClick = () => {
    createGuestSession();
    onClose();
    addToast('Guest session started. Drafts are preserved locally.', 'info');
    // Use the onNavigate callback instead of useNavigate to avoid Router context issues
    if (onNavigate) {
      onNavigate('/create');
    } else {
      // Fallback: use window.location for safety
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
          {/* Logo Monogram */}
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
            aria-label="Close modal"
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Headings */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h2 className="heading-editorial" style={{
            fontSize: '1.5rem',
            lineHeight: 1.25,
            marginBottom: '0.45rem',
            color: 'var(--text-primary)'
          }}>
            Welcome to Verified Course Studio
          </h2>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5
          }}>
            Create, verify, and teach with confidence.
          </p>
        </div>

        {/* Informational Notice if triggered */}
        {notice && (
          <div style={{
            display: 'flex',
            gap: '0.65rem',
            padding: '0.8rem 1rem',
            background: 'var(--bg-surface-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={15} color="var(--text-secondary)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
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
          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleClick}
            className="btn-secondary"
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              justifyContent: 'center',
              fontSize: '0.85rem',
              gap: '0.6rem',
              borderColor: 'var(--border)'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Continue as Guest - Primary & Highlighted */}
          <button
            type="button"
            onClick={handleGuestClick}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              justifyContent: 'center',
              fontSize: '0.85rem',
              gap: '0.5rem',
            }}
          >
            <UserCheck size={14} />
            <span>Continue as Guest</span>
            <ArrowRight size={13} style={{ marginLeft: 'auto' }} />
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
            <span>Guest mode stores your course drafts locally in this browser session only.</span>
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

          {/* Optional Email Sign-In */}
          {!emailOpen ? (
            <button
              type="button"
              onClick={() => setEmailOpen(true)}
              className="btn-ghost"
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                justifyContent: 'center'
              }}
            >
              <Mail size={13} />
              <span>Sign in with Email</span>
            </button>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-text"
                  style={{
                    fontSize: '0.825rem',
                    padding: '0.5rem 0.75rem',
                    flex: 1
                  }}
                  autoFocus
                />
                <button
                  type="submit"
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}
                >
                  Send
                </button>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Passwordless magic link authentication.
              </p>
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
            By continuing, you agree to Verified Course Studio's terms and privacy standards.
            No sensitive data is collected.
          </p>
        </div>
      </div>
    </div>
  );
}
