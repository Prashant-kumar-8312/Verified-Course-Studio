// src/components/landing/PromptSuggestions.jsx
import { Zap } from 'lucide-react';

const suggestions = [
    {
        label: 'Java Collections — Beginner, 60 min',
        prompt: 'Create a 60-minute beginner course on Java Collections Framework using Java 21. Include ArrayList, LinkedList, HashMap, HashSet, with practical code examples and exercises.',
        opts: { level: 'Beginner', duration: '60 minutes', language: 'Java' },
    },
    {
        label: 'Spring Boot REST APIs — Intermediate, 90 min',
        prompt: 'Create a 90-minute intermediate course on building REST APIs with Spring Boot 3. Cover controllers, services, repositories, validation, and exception handling.',
        opts: { level: 'Intermediate', duration: '90 minutes', language: 'Java', framework: 'Spring Boot 3' },
    },
    {
        label: 'Python Data Structures — Beginner, 45 min',
        prompt: 'Create a 45-minute beginner course on Python data structures. Cover lists, tuples, dictionaries, and sets with practical examples using Python 3.12.',
        opts: { level: 'Beginner', duration: '45 minutes', language: 'Python' },
    },
];

export default function PromptSuggestions({ composerRef }) {
    const handleClick = (s) => {
        composerRef?.current?.populate(s.prompt, s.opts);
        // smooth scroll to composer
        document.getElementById('composer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Zap size={12} /> Try:
            </span>
            {suggestions.map(s => (
                <button key={s.label} className="suggestion-chip" onClick={() => handleClick(s)}>
                    {s.label}
                </button>
            ))}
        </div>
    );
}