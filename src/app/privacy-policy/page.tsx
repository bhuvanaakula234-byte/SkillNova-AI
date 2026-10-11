import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.6rem' }}>Legal Documentation</span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Effective Date: October 10, 2026. Last Updated: October 10, 2026.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7 }}>
        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>1. Introduction</h2>
          <p>
            SkillNova AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the educational career preparation platform located at this domain. This Privacy Policy describes how we collect, store, process, and protect student information when you access our website, create a profile, upload resumes, and utilize our career development tools.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>2. Information We Collect</h2>
          <p>We collect information directly provided by students during onboarding and ongoing platform use:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Academic Information:</strong> Student name, institution name, roll number, degree, semester, graduation year, CGPA, backlogs status, and class attendance.</li>
            <li><strong>Career Preferences:</strong> Target roles, preferred work locations, timeline, and company preferences.</li>
            <li><strong>Technical Competencies:</strong> Self-assessed skills, proficiency levels, and coursework history.</li>
            <li><strong>Professional Links:</strong> URLs to GitHub repositories, LinkedIn profiles, LeetCode handles, CodeChef profiles, and personal portfolios.</li>
            <li><strong>Resume Content:</strong> Text and files uploaded by the student for ATS analysis.</li>
            <li><strong>Interview Practice Records:</strong> Questions attempted, answers submitted in text or voice transcription, and generated feedback reports.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>3. How Your Information Is Used</h2>
          <p>We process your data strictly to provide educational career preparation services:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>To compute your explainable Career Readiness Score and skill gap breakdown.</li>
            <li>To generate personalized, progressive learning roadmaps and project recommendations.</li>
            <li>To evaluate resume keyword alignment against real-world job profiles.</li>
            <li>To assess mock interview responses against industry evaluation rubrics.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>4. Third-Party Processors and AI Services</h2>
          <p>
            When configured by the platform administrator, third-party artificial intelligence providers (such as OpenAI) process submitted resume snippets and interview answers to return analytical feedback. These providers operate under their respective enterprise terms and do not use customer data submitted via APIs to train foundation models.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            When an external AI key is unconfigured, processing is performed locally on the platform server using deterministic heuristic algorithms without external data transmission.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>5. Data Storage, Security, and Retention</h2>
          <p>
            Student data is cached locally in browser local storage and persisted in server memory or configured relational databases. We implement administrative and technical safeguards to secure your personal records. You may edit, update, or clear your profile data directly through the platform interface at any time.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>6. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data deletion, contact us through the <Link href="/contact" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Contact Page</Link> or email our privacy desk:
          </p>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            <strong>Entity:</strong> SkillNova AI Platform Administration<br />
            <strong>Privacy Email:</strong> privacy@skillnova.ai<br />
            <strong>Jurisdiction:</strong> India [Subject to owner legal verification]
          </div>
        </section>
      </div>
    </main>
  );
}
