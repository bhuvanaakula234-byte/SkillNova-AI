'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';
import { getSavedProfile, StudentProfile } from '@/lib/dataStore';
import { IconCheck, IconTarget, IconArrowRight } from '@/components/Icons';

interface CareerRecommendation {
  mode: string;
  provider: string;
  recommendedRole: string;
  fitPercentage: number;
  suitabilityReason: string;
  currentStrengths: string[];
  criticalGaps: string[];
  recommendedProjects: { title: string; description: string; tech: string[] }[];
  learningSequence: string[];
  recommendedCertifications: string[];
}

export default function CareerNavigatorPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [targetRole, setTargetRole] = useState('Java Full Stack Developer');
  const [timeline, setTimeline] = useState(12);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const prof = getSavedProfile();
    setProfile(prof);
    if (prof.primaryTargetRole) setTargetRole(prof.primaryTargetRole);
    if (prof.timelineMonths) setTimeline(prof.timelineMonths);
    handleGenerate(prof.primaryTargetRole || 'Java Full Stack Developer', prof.timelineMonths || 12);
  }, []);

  const handleGenerate = async (role = targetRole, time = timeline) => {
    setLoading(true);
    setSavedNotice(false);
    try {
      const prof = profile || getSavedProfile();
      const res = await fetch('/api/career-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: role,
          skills: prof.skills,
          cgpa: prof.cgpa,
          timeline: time
        })
      });

      const data = await res.json();
      if (data.success && data.recommendation) {
        setRecommendation(data.recommendation);
      }
    } catch (e) {
      console.warn('Recommendation fetch notice', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = () => {
    if (!profile) return;
    const updated = {
      ...profile,
      primaryTargetRole: targetRole,
      timelineMonths: timeline
    };
    localStorage.setItem('skillnova_student_profile', JSON.stringify(updated));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <StudentLayout pageTitle="Career Navigator">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header Section */}
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
            AI Career Trajectory Navigator
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            A structured workflow to evaluate your coursework and project history against industry target roles.
          </p>
        </div>

        {/* Step 1 & 2: Role & Timeline Configuration Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)' }}>Step 1: Select Role & Preparation Horizon</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Adaptive Career Engine</span>
          </div>

          <div className="grid-3" style={{ alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Target Role</label>
              <select
                className="form-control"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
              >
                <option value="Java Full Stack Developer">Java Full Stack Developer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Software Development Engineer (SDE-1)">Software Development Engineer (SDE-1)</option>
                <option value="Backend Engineer">Backend Engineer</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Preparation Timeline</label>
              <select
                className="form-control"
                value={timeline}
                onChange={e => setTimeline(parseInt(e.target.value))}
              >
                <option value={6}>6 Months (Placement Sprint)</option>
                <option value={12}>12 Months (Standard Cycle)</option>
                <option value={24}>24 Months (Early Undergrad)</option>
              </select>
            </div>

            <button
              onClick={() => handleGenerate(targetRole, timeline)}
              disabled={loading}
              className="btn-primary"
              style={{ height: '39px' }}
            >
              {loading ? 'Evaluating Fit...' : 'Generate Career Analysis'}
            </button>
          </div>
        </div>

        {/* Step 3 & 4: Structured Results Display */}
        {recommendation && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Alignment Summary Banner */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ maxWidth: '720px' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', alignItems: 'center' }}>
                    <span className="badge badge-primary">{recommendation.recommendedRole}</span>
                    <span className="badge badge-neutral">{recommendation.provider}</span>
                  </div>
                  <h2 style={{ fontSize: '1.35rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                    Role Alignment: {recommendation.fitPercentage}% Match
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    {recommendation.suitabilityReason}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '160px' }}>
                  <button onClick={handleSaveResult} className="btn-secondary btn-sm" style={{ width: '100%' }}>
                    Save Result to Profile
                  </button>
                  {savedNotice && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--success)', textAlign: 'center', fontWeight: 600 }}>
                      Saved to profile!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Strengths vs Critical Gaps */}
            <div className="grid-2">
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span className="badge badge-success">Validated Strengths</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {recommendation.currentStrengths.map((str, idx) => (
                    <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                      {str}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span className="badge badge-warning">High Priority Gaps</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {recommendation.criticalGaps.map((gap, idx) => (
                    <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--text-body)' }}>
                      {gap}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Structured Learning Sequence */}
            <div className="card">
              <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.85rem' }}>
                Recommended Learning Sequence
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recommendation.learningSequence.map((seq, idx) => (
                  <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                    {seq}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Projects */}
            <div className="card">
              <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.85rem' }}>
                Recommended Capstone Projects
              </h2>
              <div className="grid-2">
                {recommendation.recommendedProjects.map((p, idx) => (
                  <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>{p.title}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {p.tech.map((t, tidx) => (
                        <span key={tidx} className="badge badge-neutral">{t}</span>
                      ))}
                    </div>
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
