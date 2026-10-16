// src/components/landing/PromptComposer.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paperclip, Users, Clock, Code2, Layers, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = ['30 minutes', '45 minutes', '60 minutes', '90 minutes', '120 minutes'];
const LANGUAGES = ['Java', 'Python', 'TypeScript', 'Go', 'Rust', 'C++'];
const RUNTIMES = ['Java 21', 'Python 3.12', 'Node 20', 'Spring Boot 3', 'FastAPI', 'Standard'];

const EXAMPLE_PROMPTS = [
  {
    label: 'Java Collections · Beginner · 60 min',
    prompt: 'Create a 60-minute beginner course on the Java Collections Framework. Cover ArrayList, LinkedList, HashMap, and HashSet with verified code examples, common pitfalls, and hands-on exercises.',
    level: 'Beginner',
    duration: '60 minutes',
    language: 'Java',
    runtime: 'Java 21',
  },
  {
    label: 'Spring Boot APIs · Intermediate · 90 min',
    prompt: 'Create a 90-minute intermediate course on building production-ready REST APIs with Spring Boot 3. Cover controllers, service layers, repositories, validation, and automated API tests.',
    level: 'Intermediate',
    duration: '90 minutes',
    language: 'Java',
    runtime: 'Spring Boot 3',
  },
  {
    label: 'Python Data Structures · Beginner · 45 min',
    prompt: 'Create a 45-minute beginner course on core Python data structures. Explore lists, tuples, dictionaries, and sets with real-world examples and interactive quiz questions.',
    level: 'Beginner',
    duration: '45 minutes',
    language: 'Python',
    runtime: 'Python 3.12',
  },
];

export default function PromptComposer({ suggestionRef }) {
  const [prompt, setPrompt]       = useState('');
  const [level, setLevel]         = useState('Beginner');
  const [duration, setDuration]   = useState('60 minutes');
  const [language, setLanguage]   = useState('Java');
  const [runtime, setRuntime]     = useState('Java 21');
  const [fileAttached, setFileAttached] = useState(false);
  const [loading, setLoading]     = useState(false);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { addToast } = useApp();

  // Natural textarea auto-grow
  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(90, textareaRef.current.scrollHeight)}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [prompt, adjustHeight]);

  // Expose populate method to parent if needed
  if (suggestionRef) {
    suggestionRef.current = {
      populate: (text, opts) => {
        setPrompt(text);
        if (opts?.level)    setLevel(opts.level);
        if (opts?.duration) setDuration(opts.duration);
        if (opts?.language) setLanguage(opts.language);
        if (opts?.runtime)  setRuntime(opts.runtime);
        setTimeout(() => {
          adjustHeight();
          textareaRef.current?.focus();
        }, 50);
      }
    };
  }

  const applySuggestion = (item) => {
    setPrompt(item.prompt);
    setLevel(item.level);
    setDuration(item.duration);
    setLanguage(item.language);
    setRuntime(item.runtime);
    setTimeout(() => {
      adjustHeight();
      textareaRef.current?.focus();
    }, 50);
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      addToast('Please enter a course topic or description.', 'warning');
      textareaRef.current?.focus();
      return;
    }
    setLoading(true);
    // Small delay for tactile feedback, then navigate to course creation page pre-populated
    await new Promise(r => setTimeout(r, 350));
    navigate('/create', {
      state: { prompt, level, duration, language, runtime, fileAttached },
    });
  }, [prompt, level, duration, language, runtime, fileAttached, navigate, addToast]);

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div id="composer" style={{ width: '100%', maxWidth: '820px', margin: '0 auto' }}>
      {/* Main Composer Box */}
      <div className="prompt-composer-box">
        {/* Text Input Area */}
        <div style={{ padding: '0.5rem 0.25rem 0' }}>
          <textarea
            ref={textareaRef}
            className="prompt-textarea"
            value={prompt}
            onChange={e => {
              setPrompt(e.target.value);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="What would you like to teach today?&#10;Describe the topic, student level, session length, and learning outcomes..."
            aria-label="Course generation prompt"
          />
        </div>

        {/* Controls Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface-secondary)',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Left: Configuration Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={e => {
                if (e.target.files?.[0]) {
                  setFileAttached(true);
                  addToast(`Attached: ${e.target.files[0].name}`, 'info');
                }
              }}
            />
            <button
              type="button"
              className="btn-icon"
              title={fileAttached ? "Reference file attached" : "Attach reference file or syllabus"}
              onClick={() => fileInputRef.current?.click()}
              style={{
                color: fileAttached ? 'var(--status-passed)' : 'var(--text-secondary)',
                borderColor: fileAttached ? 'var(--status-passed)' : 'var(--border)'
              }}
            >
              {fileAttached ? <Check size={14} /> : <Paperclip size={14} />}
            </button>

            {/* Level Selector */}
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="select-field"
              title="Target student experience level"
            >
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>

            {/* Duration Selector */}
            <select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="select-field"
              title="Class session duration"
            >
              {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* Language Selector */}
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="select-field"
              title="Primary programming language"
            >
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>

            {/* Runtime / Framework */}
            <select
              value={runtime}
              onChange={e => setRuntime(e.target.value)}
              className="select-field"
              title="Pinned compiler or framework version"
            >
              {RUNTIMES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Right: Generate Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }} className="hide-mobile">
              Ctrl+Enter
            </span>
            <button
              type="button"
              className="btn-primary"
              onClick={handleGenerate}
              disabled={loading}
              style={{
                padding: '0.5rem 1.15rem',
                fontSize: '0.825rem',
                gap: '0.45rem'
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <span>Generate Course</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Understated Example Prompts */}
      <div style={{
        marginTop: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginRight: '0.25rem'
        }}>
          Examples:
        </span>
        {EXAMPLE_PROMPTS.map(item => (
          <button
            key={item.label}
            type="button"
            className="suggestion-chip"
            onClick={() => applySuggestion(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
