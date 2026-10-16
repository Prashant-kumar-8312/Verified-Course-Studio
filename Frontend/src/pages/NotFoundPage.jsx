// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{
      background: 'var(--bg-base)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <p className="overline-editorial" style={{ marginBottom: '0.5rem' }}>
          Error 404
        </p>
        <h1 className="heading-editorial" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>
          Page not found.
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '380px', margin: '0 auto 2rem' }}>
          The requested course route does not exist or has been relocated within the studio.
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ gap: '0.4rem' }}>
            <Home size={14} /> Return to Studio
          </button>
        </Link>
      </div>
    </div>
  );
}
