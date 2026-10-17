// src/components/common/SmartBackButton.jsx
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { executeSmartBack } from '../../utils/navigation';

export default function SmartBackButton({
    fallbackPath = '/',
    label = 'Back',
    className = 'btn-ghost',
    style = {},
    iconSize = 13
}) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        executeSmartBack(navigate, fallbackPath);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid transparent',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                ...style
            }}
            title={`Navigate back (fallback: ${fallbackPath})`}
        >
            <ArrowLeft size={iconSize} />
            <span>{label}</span>
        </button>
    );
}