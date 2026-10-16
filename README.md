# Verified Course Material Studio

> **"Create Smarter Courses. Verify Every Line of Code."**  
> Sponsored by **TechSummitTrainers**

Verified Course Material Studio is an intelligent workspace that generates classroom-ready slides, trainer notes, runnable code examples, tested assignments, quizzes, and cheat sheets — with automated sandbox verification built in.

---

## 🚀 Key Value Proposition

Trainers spend hours preparing presentations, notes, code examples, assignments, quizzes, and cheat sheets. AI-generated educational content can contain broken code, outdated APIs, poorly formatted slides, and unverified exercises.

Our platform solves this problem by generating complete teaching materials and **automatically verifying every code example and exercise before presenting the final result**.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React
- **Design Philosophy**: Deep navy / near-black aesthetic inspired by Linear, Stripe, and modern developer tools
- **Architecture**: Modular, reusable component architecture

---

## 📁 Repository Structure

```
Verified-Course-Studio/
├── Backend/               # API & verification sandbox runner services (planned)
└── Frontend/              # Production React + Tailwind CSS client application
    ├── src/
    │   ├── components/    # Reusable UI sections
    │   │   ├── Navbar.jsx               # Sticky navigation with mobile menu
    │   │   ├── Hero.jsx                 # Value prop & high-fidelity preview
    │   │   ├── ProductPreview.jsx       # Interactive React dashboard preview
    │   │   ├── ProblemSection.jsx       # 3 core challenges + workflow solution
    │   │   ├── FeaturesSection.jsx      # 10 core engine capabilities
    │   │   ├── WorkflowSection.jsx      # 4-stage pipeline
    │   │   ├── VerificationDashboard.jsx# Execution logs & status badges
    │   │   ├── SampleReportModal.jsx    # Sandbox run details modal
    │   │   ├── CourseForm.jsx           # Interactive generator form with validation
    │   │   ├── TechTrustSection.jsx     # Supported runtimes & trust principles
    │   │   ├── ImpactSection.jsx        # Qualitative educator impact
    │   │   ├── CTASection.jsx           # Conversion actions
    │   │   └── Footer.jsx               # Navigation & TechSummitTrainers attribution
    │   ├── App.jsx                      # Page composition
    │   ├── index.css                    # Tailwind CSS v4 design system
    │   └── main.jsx                     # Application entry
    ├── package.json
    └── vite.config.js
```

---

## 🏃 Local Setup & Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Quick Start
1. Navigate into the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
To create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```
