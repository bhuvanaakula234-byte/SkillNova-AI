import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.6rem' }}>Our Mission</span>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
          Bridging Skills to Careers
        </h1>
        <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto' }}>
          SkillNova AI was built to address the gap between engineering college curricula and modern software engineering hiring bars.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* The Student Problem Card */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            The Student Readiness Challenge
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Across many technical institutions, students master foundational theory but lack clarity on what hiring managers at product companies and tech enterprises look for. Resumes often list generic classroom exercises, algorithmic practice lacks structure, and technical interview confidence is low.
          </p>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            SkillNova AI introduces structured career preparation: giving students an explainable Career Readiness Index, step-by-step canonical roadmaps, real-time interview evaluation, and concrete portfolio blueprints.
          </p>
        </div>

        {/* Core Methodology Pillars */}
        <div className="grid-3">
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>Explainable Metrics</h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              No arbitrary numbers. Every readiness score and ATS alignment rating is broken down into clear, criteria-based components that students can take immediate action to improve.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.4rem', fontWeight: 700 }}>Canonical Roadmaps</div>
            <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Our 15-stage Data Structures & Algorithms roadmap and role tracks are version-controlled and stable. They do not mutate between sessions, giving students steady progression.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>Privacy & Accuracy</h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Student academic data, resume uploads, and interview practice logs are stored privately. We never claim external access or fabricate placement outcomes.
            </p>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            Platform Architecture & Engineering Stack
          </h2>
          <div className="grid-2">
            <div>
              <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.25rem' }}>Frontend & Client Architecture</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                Built with Next.js 16 (App Router), React 19, TypeScript, and a light academic design token system with responsive grids and accessible keyboard focus.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.25rem' }}>AI & Deterministic Backend</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                Modular API routes (`/api/resume-analyze`, `/api/interview`, `/api/career-recommend`) supporting live OpenAI models with seamless, transparent rule-based fallbacks.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/get-started" className="btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}>
            Build My Career Roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}
