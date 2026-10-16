import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Layers, 
  Lock, 
  Code2, 
  Users, 
  Star, 
  ArrowRight, 
  X, 
  PlayCircle,
  FileCheck2,
  Cpu
} from 'lucide-react';
import './App.css';

const COURSES = [
  {
    id: 1,
    title: 'Advanced Full-Stack Engineering with Next.js 15 & GraphQL',
    category: 'Full-Stack Dev',
    level: 'Advanced',
    rating: 4.9,
    reviews: '1,420',
    modules: 14,
    hours: '42 hrs',
    instructor: 'Dr. Sophia Vance',
    accreditation: 'OpenCred ISO-27001',
    description: 'Master server actions, distributed state caching, high-concurrency microservices, and cryptographic credential issuance.',
    syllabus: [
      'Architecting resilient distributed systems',
      'GraphQL federation and schema stitching',
      'Next.js 15 app router performance tuning',
      'Production deployment and automated cryptographic verification'
    ]
  },
  {
    id: 2,
    title: 'Applied Large Language Models & Autonomous Agent Studio',
    category: 'AI & ML',
    level: 'Intermediate',
    rating: 4.95,
    reviews: '2,890',
    modules: 18,
    hours: '56 hrs',
    instructor: 'Marcus Chen',
    accreditation: 'AI Ethics & Alignment Guild',
    description: 'Build enterprise-grade cognitive agents, multi-agent evaluation pipelines, and fine-tune open-weights neural models.',
    syllabus: [
      'Foundations of tool-calling & RAG reasoning graphs',
      'Autonomous supervisor-worker agent topologies',
      'Evaluation harnesses and guardrail verifications',
      'Deploying low-latency quantized inference engines'
    ]
  },
  {
    id: 3,
    title: 'Enterprise Cloud Architecture & Kubernetes Orchestration',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    rating: 4.88,
    reviews: '980',
    modules: 12,
    hours: '38 hrs',
    instructor: 'Elena Rostova',
    accreditation: 'Cloud Native CNCF Standard',
    description: 'Zero-downtime cluster lifecycle, GitOps CI/CD pipelines, service meshes, and infrastructure-as-code hardening.',
    syllabus: [
      'Production Kubernetes topology & ingress mesh',
      'GitOps rollouts with ArgoCD and Helm',
      'Multi-region failover and disaster recovery drills',
      'Cryptographic image provenance and SBOM auditing'
    ]
  },
  {
    id: 4,
    title: 'Zero-Trust Cybersecurity & Cryptographic Protocol Defense',
    category: 'Cybersecurity',
    level: 'Intermediate',
    rating: 4.92,
    reviews: '1,150',
    modules: 16,
    hours: '48 hrs',
    instructor: 'Alex Rivera',
    accreditation: 'NIST Cyber Defense Standard',
    description: 'Defense-in-depth principles, public-key infrastructure, threat modeling, and automated penetration testing suites.',
    syllabus: [
      'PKI infrastructure and automated TLS certificate rotation',
      'Identity and access management with zero-trust gateways',
      'Defensive auditing for distributed API ecosystems',
      'Cryptographic timestamping for secure audit logs'
    ]
  },
  {
    id: 5,
    title: 'Modern UI/UX Design Systems & Interactive Micro-animations',
    category: 'UI/UX Design',
    level: 'Beginner-Friendly',
    rating: 4.86,
    reviews: '3,210',
    modules: 10,
    hours: '28 hrs',
    instructor: 'Chloe Dupont',
    accreditation: 'International UX Guild',
    description: 'Craft high-conversion design systems, accessibility-first component libraries, and buttery 60fps micro-interactions.',
    syllabus: [
      'Design tokens and cross-platform component architecture',
      'Motion physics and delight-driven interaction design',
      'WCAG 2.2 AAA accessibility compliance engineering',
      'Figma to production React component sync'
    ]
  },
  {
    id: 6,
    title: 'Decentralized Smart Contracts & Verification Protocols',
    category: 'Full-Stack Dev',
    level: 'Advanced',
    rating: 4.91,
    reviews: '870',
    modules: 15,
    hours: '45 hrs',
    instructor: 'Tariq Al-Mansoor',
    accreditation: 'Ethereum Standards Alliance',
    description: 'Build verifiably secure contracts, audit for reentrancy vulnerabilities, and issue tamper-evident credentials.',
    syllabus: [
      'Solidity security patterns and static analysis',
      'Zero-knowledge proof verification foundations',
      'Decentralized credential registries and revocation checks',
      'Gas optimization and formal verification testing'
    ]
  }
];

const CATEGORIES = ['All', 'Full-Stack Dev', 'AI & ML', 'Cloud & DevOps', 'Cybersecurity', 'UI/UX Design'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeEngineTab, setActiveEngineTab] = useState('signatures');
  const [learnerName, setLearnerName] = useState('Alex Morgan');
  const [previewCourse, setPreviewCourse] = useState(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set([1]));
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleEnroll = (course) => {
    setEnrolledCourseIds((prev) => {
      const next = new Set(prev);
      if (next.has(course.id)) {
        next.delete(course.id);
        showToast(`Unenrolled from ${course.title.slice(0, 32)}...`);
      } else {
        next.add(course.id);
        showToast(`Enrolled in "${course.title.slice(0, 32)}..." Verification track active!`);
      }
      return next;
    });
  };

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-banner" role="status">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="brand-logo">
            <div className="logo-icon-box">
              <ShieldCheck size={24} />
            </div>
            <div className="brand-text">
              <span className="brand-title">Verified Course Studio</span>
              <span className="brand-tag">Accredited Learning</span>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#courses" className="nav-link">Courses</a>
            <a href="#engine" className="nav-link">Verification Engine</a>
            <a href="#certificate" className="nav-link">Certificates</a>
            <a href="#studio" className="nav-link">Studio Hub</a>
          </nav>

          <div className="nav-actions">
            <button className="btn-secondary" onClick={() => showToast('Studio Console demo mode')}>
              Creator Studio
            </button>
            <button className="btn-primary" onClick={() => showToast('Wallet / Account connected!')}>
              Verify Credentials
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <Sparkles size={14} />
          <span>Next-Generation Credential & Course Verification Studio</span>
        </div>
        <h1 className="hero-title">
          Master Real-World Tech with <span className="gradient-text">Verifiable Credentials</span>
        </h1>
        <p className="hero-subtitle">
          Every curriculum in Verified Course Studio is tamper-proof, industry-accredited, 
          and backed by cryptographic proofs that top employers trust.
        </p>
        <div className="hero-cta-group">
          <a href="#courses" className="btn-hero-primary">
            <BookOpen size={18} />
            Explore Verified Catalog
          </a>
          <a href="#certificate" className="btn-hero-outline">
            <Award size={18} />
            Preview Live Certificate
          </a>
        </div>

        {/* Live Metrics Counter */}
        <div className="stats-strip">
          <div className="stat-item">
            <span className="stat-number gradient-text">145K+</span>
            <span className="stat-label">Verified Certifications Issued</span>
          </div>
          <div className="stat-item">
            <span className="stat-number gradient-text">99.8%</span>
            <span className="stat-label">Employer Verification Trust Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number gradient-text">450+</span>
            <span className="stat-label">Accredited Studio Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number gradient-text">100%</span>
            <span className="stat-label">Cryptographically Tamper-Proof</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="content-wrapper" id="courses">
        <div className="section-header">
          <div className="section-heading-group">
            <h2>Accredited Course Catalog</h2>
            <p>Hands-on engineering tracks with automated grading and verifiable credential hashes.</p>
          </div>
        </div>

        {/* Search and Category Filters */}
        <div className="catalog-toolbar">
          <div className="search-box">
            <Search size={18} color="var(--text-muted)" />
            <input 
              id="course-search-input"
              type="text" 
              placeholder="Search by topic, keyword, or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-pills">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="course-grid">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.has(course.id);
            return (
              <article key={course.id} className="course-card">
                <div className="card-header-banner">
                  <span className="card-badge">
                    <CheckCircle2 size={12} />
                    {course.accreditation}
                  </span>
                  <span className="card-level-chip">{course.level}</span>
                </div>

                <div className="card-body">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-desc">{course.description}</p>
                  
                  <div className="course-meta-row">
                    <span className="course-instructor">
                      <Users size={14} />
                      {course.instructor}
                    </span>
                    <span>{course.modules} modules • {course.hours}</span>
                  </div>
                  <div className="course-meta-row" style={{ marginTop: '8px', borderTop: 'none', paddingTop: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                      <Star size={14} fill="#fbbf24" />
                      {course.rating} ({course.reviews})
                    </span>
                    <span style={{ color: 'var(--accent-cyan)' }}>{course.category}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <button 
                    className="btn-card-preview"
                    onClick={() => setPreviewCourse(course)}
                  >
                    View Syllabus
                  </button>
                  <button 
                    className={`btn-card-enroll ${isEnrolled ? 'enrolled' : ''}`}
                    onClick={() => handleEnroll(course)}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle2 size={14} />
                        Enrolled
                      </>
                    ) : (
                      <>
                        Enroll Now
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Verification Engine Interactive Showcase */}
        <section className="verification-section" id="engine">
          <div className="verification-header">
            <span className="hero-pill">
              <Cpu size={14} />
              <span>Proprietary Verification Architecture</span>
            </span>
            <h2>How Course Studio Verification Works</h2>
            <p>Every milestone you complete is validated via automated evaluation suites and cryptographically signed.</p>
          </div>

          <div className="engine-tab-nav">
            <button 
              className={`engine-tab-btn ${activeEngineTab === 'signatures' ? 'active' : ''}`}
              onClick={() => setActiveEngineTab('signatures')}
            >
              1. Cryptographic Signatures
            </button>
            <button 
              className={`engine-tab-btn ${activeEngineTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveEngineTab('matrix')}
            >
              2. Skill Matrix Scoring
            </button>
            <button 
              className={`engine-tab-btn ${activeEngineTab === 'registry' ? 'active' : ''}`}
              onClick={() => setActiveEngineTab('registry')}
            >
              3. Permanent Verifier Registry
            </button>
          </div>

          <div className="engine-display-card">
            <div className="engine-content">
              {activeEngineTab === 'signatures' && (
                <>
                  <h3>Automated SHA-256 Code Sign-off</h3>
                  <p>
                    When you submit studio deliverables, our automated testing suites execute your codebase in isolated sandboxes. Once benchmarks pass, an immutable cryptographic signature is generated.
                  </p>
                  <ul className="engine-feature-list">
                    <li><CheckCircle2 size={16} color="#10b981" /> Sandbox runtime verification with 100% test coverage</li>
                    <li><CheckCircle2 size={16} color="#10b981" /> Public-key authentication for instructors & student identity</li>
                    <li><CheckCircle2 size={16} color="#10b981" /> Zero risk of paper-mill fake credentials</li>
                  </ul>
                </>
              )}
              {activeEngineTab === 'matrix' && (
                <>
                  <h3>Multi-Dimensional Skill Matrix</h3>
                  <p>
                    Unlike passive video courses, Verified Course Studio computes proficiency vectors across algorithmic efficiency, test rigor, software architecture, and security best practices.
                  </p>
                  <ul className="engine-feature-list">
                    <li><CheckCircle2 size={16} color="#10b981" /> Real-time telemetry on code quality and execution speed</li>
                    <li><CheckCircle2 size={16} color="#10b981" /> Granular breakdown of competencies on each certificate</li>
                    <li><CheckCircle2 size={16} color="#10b981" /> Employer-shareable portfolio links with interactive logs</li>
                  </ul>
                </>
              )}
              {activeEngineTab === 'registry' && (
                <>
                  <h3>Global Decentralized Registry</h3>
                  <p>
                    Certificates are posted to an open verifier API. Anyone—including hiring managers and enterprise HR departments—can check authenticity in 1-click without any login wall.
                  </p>
                  <ul className="engine-feature-list">
                    <li><CheckCircle2 size={16} color="#10b981" /> Sub-second public lookup via unique certificate hash</li>
                    <li><CheckCircle2 size={16} color="#10b981" /> LinkedIn & GitHub profile direct credential integration</li>
                    <li><CheckCircle2 size={16} color="#10b981" /> Revocation transparency in case of academic dishonesty</li>
                  </ul>
                </>
              )}
            </div>

            <div className="engine-code-terminal">
              <div className="terminal-title">LIVE PROOF VALIDATOR // RUNTIME OUTPUT</div>
              <div>{`> INITIALIZING VCS_ENGINE v4.2.1...`}</div>
              <div>{`> VERIFYING SUBMISSION: course_id="adv-fullstack-101"`}</div>
              <div>{`> AUDIT HASH: 0x8f9c2d7b...e54a3901`}</div>
              <div>{`> ACCREDITATION AUTHORITY: OpenCred Global Standard`}</div>
              <div>{`> CHECKSUM STATUS: [PASSED - 100% VALIDATED]`}</div>
              <div style={{ color: '#10b981', marginTop: '12px' }}>
                {`✓ CERTIFICATE ISSUED: verifiedcoursestudio.com/verify/VCS-9941`}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Certificate Simulator */}
        <section className="certificate-preview-section" id="certificate">
          <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="section-heading-group">
              <span className="hero-pill">
                <FileCheck2 size={14} />
                <span>Interactive Live Preview</span>
              </span>
              <h2>Your Verified Completion Credential</h2>
              <p>Type your name below to simulate what your accredited credential looks like upon course completion.</p>
            </div>
          </div>

          <div className="cert-input-row">
            <label htmlFor="student-name-input">Student / Learner Full Name:</label>
            <input 
              id="student-name-input"
              type="text" 
              className="cert-name-input"
              value={learnerName} 
              onChange={(e) => setLearnerName(e.target.value)}
              placeholder="e.g. Jane Doe"
            />
          </div>

          {/* Certificate Frame Display */}
          <div className="certificate-frame">
            <div className="certificate-border-inset">
              <div className="cert-logo-seal">
                <Award size={28} />
              </div>
              <div className="cert-title-top">Verified Course Studio • Accredited Credential</div>
              <h2 className="cert-title-main">CERTIFICATE OF DISTINCTION</h2>
              <div className="cert-text-lead">This is proudly presented and permanently recorded for</div>
              
              <div className="cert-recipient-name">
                {learnerName.trim() ? learnerName : 'Distinguished Learner'}
              </div>

              <div className="cert-text-lead">for demonstrated mastery in the rigorous laboratory curriculum of</div>
              <div className="cert-course-name">
                Advanced Full-Stack Engineering & Microservices Architecture
              </div>

              <div className="cert-footer-grid">
                <div>
                  <strong>Issuer:</strong> Verified Course Studio
                </div>
                <div>
                  <strong>Verification ID:</strong> <span className="cert-hash">VCS-2026-X812-99F1</span>
                </div>
                <div>
                  <strong>Security Seal:</strong> <span style={{ color: '#10b981' }}>● Tamper-Proof SHA-256</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Course Preview / Syllabus Modal */}
      {previewCourse && (
        <div className="modal-overlay" onClick={() => setPreviewCourse(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{previewCourse.title}</h3>
              <button className="modal-close-btn" onClick={() => setPreviewCourse(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {previewCourse.description}
              </p>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '0.88rem' }}>
                <div><strong>Instructor:</strong> {previewCourse.instructor}</div>
                <div><strong>Accreditation:</strong> {previewCourse.accreditation}</div>
                <div><strong>Duration:</strong> {previewCourse.hours}</div>
              </div>

              <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '8px' }}>
                Course Modules & Verification Milestones
              </h4>
              <div className="syllabus-list">
                {previewCourse.syllabus.map((topic, idx) => (
                  <div key={idx} className="syllabus-item">
                    <span><strong>Module {idx + 1}:</strong> {topic}</span>
                    <PlayCircle size={16} color="var(--accent-cyan)" />
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setPreviewCourse(null)}>
                Close
              </button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  handleEnroll(previewCourse);
                  setPreviewCourse(null);
                }}
              >
                {enrolledCourseIds.has(previewCourse.id) ? 'Unenroll' : 'Enroll in this Studio'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer" id="studio">
        <div className="footer-inner">
          <div className="footer-status">
            <span className="status-dot"></span>
            <span>VCS Global Ledger Status: 100% Operational • 0 Latency</span>
          </div>

          <div className="footer-copyright">
            © {new Date().getFullYear()} Verified Course Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
