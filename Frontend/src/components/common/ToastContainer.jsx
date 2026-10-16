// src/components/common/ToastContainer.jsx
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const icons = {
  success: <CheckCircle size={15} color="var(--status-passed)" />,
  error:   <XCircle size={15} color="var(--status-failed)" />,
  info:    <Info size={15} color="var(--text-primary)" />,
  warning: <AlertTriangle size={15} color="var(--status-warning)" />,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span>{icons[t.type]}</span>
          <span style={{ flex: 1, fontSize: '0.825rem', color: 'var(--text-primary)' }}>{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="btn-icon"
            style={{ width: 22, height: 22, minWidth: 22, padding: 0 }}
            aria-label="Dismiss"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
