'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';
import { getSavedProfile, StudentProfile } from '@/lib/dataStore';

interface AnalysisResult {
  mode: string;
  atsScore: number;
  scoreCriteria: string;
  extractedTechnicalSkills: string[];
  extractedSoftSkills: string[];
  matchingSkills: string[];
  missingHighPrioritySkills: string[];
  resumeStructureScore: number;
  bulletImprovements: { original: string; improved: string; reason: string }[];
  actionableRecommendations: string[];
}

export default function ResumeAnalyzerPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Java Full Stack Developer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [providerInfo, setProviderInfo] = useState('');

  useEffect(() => {
    const prof = getSavedProfile();
    setProfile(prof);
    if (prof.primaryTargetRole) setTargetRole(prof.primaryTargetRole);

    const sample = `BHUVANA AKULA
Vishnu Institute of Technology | B.Tech AI & Data Science (CGPA: 9.09)
Email: bhuvana.akula@example.com | GitHub: github.com/bhuvana-akula-demo

TECHNICAL SKILLS
Languages: Java (Core, OOP, Collections), Python, SQL, JavaScript
Frameworks: Spring Boot, React, Hibernate/JPA, RESTful Web Services
Databases: PostgreSQL, MySQL
Tools: Git, GitHub, Docker, Postman

PROJECTS
1. Secure Online Banking REST API
- Built backend banking microservices using Java and Spring Boot.
- Implemented user registration, JWT authentication, and fund transfer endpoints with transaction ACID compliance.
- Integrated PostgreSQL database and wrote unit test cases.

2. Student Skill and Career Intelligence Hub
- Developed web application in React and TypeScript.
- Built interactive roadmaps, dynamic dashboards, and local state persistence.`;

    setResumeText(sample);

    const cached = localStorage.getItem('skillnova_last_resume_analysis');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setResult(parsed.analysis);
        setProviderInfo(parsed.provider);
      } catch (e) {
        console.warn('Failed to parse previous resume analysis', e);
      }
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(txt|pdf|docx)$/i)) {
      setError('Please upload a valid text, PDF, or DOCX document.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setResumeText(content);
    };
    reader.readAsText(file);
  };

  const runAnalysis = async () => {
    if (!resumeText.trim() || resumeText.length < 40) {
      setError('Please provide resume text containing at least 40 characters.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole,
          currentSkills: profile?.skills.map(s => s.name)
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data.analysis);
      setProviderInfo(data.provider || 'SkillNova Analysis Engine');

      localStorage.setItem('skillnova_last_resume_analysis', JSON.stringify({
        analysis: data.analysis,
        provider: data.provider
      }));

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout pageTitle="Resume Analyzer">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
            Resume & ATS Optimization Auditor
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Audit your resume text for role-specific keyword density, readability, and quantifiable action bullets.
          </p>
        </div>

        {/* Input & Target Role Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)' }}>Step 1: Resume Text & Target Role</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supported Formats: TXT, PDF, DOCX</span>
          </div>

          <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Target Role for ATS Optimization</label>
              <select 
                className="form-control"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
              >
                <option value="Java Full Stack Developer">Java Full Stack Developer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Software Development Engineer (SDE-1)">Software Development Engineer (SDE-1)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Upload Resume File</label>
              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                className="form-control"
                style={{ padding: '0.45rem' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Or Paste Plain Resume Text</label>
            <textarea
              className="form-control"
              rows={8}
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder="Paste complete resume content here..."
              style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}
            />
          </div>

          {error && (
            <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Processed securely without public URL generation.
            </span>

            <button 
              onClick={runAnalysis} 
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Analyzing Keywords...' : 'Audit Resume Keywords'}
            </button>
          </div>
        </div>

        {/* Structured Results Display */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Score Banner */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>Audit Complete</span>
                  <h2 style={{ fontSize: '1.35rem', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                    Target Role Alignment: {targetRole}
                  </h2>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.875rem', maxWidth: '600px' }}>
                    {result.scoreCriteria}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>{result.atsScore}%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Keyword Alignment</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--success)' }}>{result.resumeStructureScore}%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Structure Health</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyword Matches vs Missing */}
            <div className="grid-2">
              <div className="card">
                <h3 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                  Demonstrated Role Keywords ({result.matchingSkills.length})
                </h3>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {result.matchingSkills.map((s, idx) => (
                    <span key={idx} className="badge badge-success">{s}</span>
                  ))}
                  {result.matchingSkills.length === 0 && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No direct role matches detected.</span>
                  )}
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                  Missing High Priority Keywords ({result.missingHighPrioritySkills.length})
                </h3>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {result.missingHighPrioritySkills.map((s, idx) => (
                    <span key={idx} className="badge badge-warning">{s}</span>
                  ))}
                  {result.missingHighPrioritySkills.length === 0 && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--success)' }}>Comprehensive keyword coverage!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bullet Point Improvements */}
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                Quantifiable Bullet Point Recommendations
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Grounding project statements with scale, architecture decisions, and business impact.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.bulletImprovements.map((b, idx) => (
                  <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase' }}>Current Text:</span>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-body)', marginTop: '0.1rem', fontStyle: 'italic' }}>&quot;{b.original}&quot;</div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase' }}>Improved Bullet:</span>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-heading)', fontWeight: 600, marginTop: '0.1rem' }}>&quot;{b.improved}&quot;</div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                      <strong>Why this works:</strong> {b.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Action Checklist */}
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>Actionable Recommendations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {result.actionableRecommendations.map((rec, idx) => (
                  <div key={idx} style={{ fontSize: '0.875rem', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>&rarr;</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </StudentLayout>
  );
}
