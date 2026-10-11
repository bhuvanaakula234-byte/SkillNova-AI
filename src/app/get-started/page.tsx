'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { initialStudentProfile, saveProfile, StudentProfile } from '@/lib/dataStore';

export default function GetStartedPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<StudentProfile>({ ...initialStudentProfile });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      saveProfile(profile);
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.6rem' }}>Onboarding Step {step} of 3</span>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
          Personalize Your Career Journey
        </h1>
        <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
          Configure your academic foundation and target roles to customize your roadmaps and readiness metrics.
        </p>
      </div>

      {/* Progress Track */}
      <div className="progress-track" style={{ marginBottom: '2rem' }}>
        <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      <div className="card">
        {/* Step 1: Academic Basics */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              1. Academic Foundation
            </h2>
            
            <div className="grid-2">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.fullName}
                  onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>College / University</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.collegeName}
                  onChange={e => setProfile({ ...profile, collegeName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.rollNumber}
                  onChange={e => setProfile({ ...profile, rollNumber: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Degree & Branch</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.degreeBranch}
                  onChange={e => setProfile({ ...profile, degreeBranch: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Cumulative CGPA (out of 10.0)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={profile.cgpa}
                  onChange={e => setProfile({ ...profile, cgpa: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="form-group">
                <label>Current Attendance (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={profile.attendancePercentage}
                  onChange={e => setProfile({ ...profile, attendancePercentage: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Target Roles */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              2. Career Targets & Horizon
            </h2>

            <div className="form-group">
              <label>Primary Target Role</label>
              <select
                className="form-control"
                value={profile.primaryTargetRole}
                onChange={e => setProfile({ ...profile, primaryTargetRole: e.target.value })}
              >
                <option value="Java Full Stack Developer">Java Full Stack Developer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Software Development Engineer (SDE-1)">Software Development Engineer (SDE-1)</option>
                <option value="Backend Engineer">Backend Engineer</option>
              </select>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Opportunity Type</label>
                <select
                  className="form-control"
                  value={profile.desiredType}
                  onChange={e => setProfile({ ...profile, desiredType: e.target.value as any })}
                >
                  <option value="Both">Both Internships & Full-Time</option>
                  <option value="Internship">Internship Only</option>
                  <option value="Full-Time">Full-Time Only</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preparation Timeline</label>
                <select
                  className="form-control"
                  value={profile.timelineMonths}
                  onChange={e => setProfile({ ...profile, timelineMonths: parseInt(e.target.value) || 12 })}
                >
                  <option value={6}>6 Months (Placement Sprint)</option>
                  <option value={12}>12 Months (Standard Horizon)</option>
                  <option value={24}>24 Months (Early Undergrad)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Preferred Companies (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                value={profile.preferredCompanies.join(', ')}
                onChange={e => setProfile({ ...profile, preferredCompanies: e.target.value.split(',').map(s => s.trim()) })}
              />
            </div>
          </div>
        )}

        {/* Step 3: Online Profiles */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              3. Online Profiles & Verification
            </h2>

            <div className="grid-2">
              <div className="form-group">
                <label>GitHub Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={profile.githubUrl}
                  onChange={e => setProfile({ ...profile, githubUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>LinkedIn Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={profile.linkedInUrl}
                  onChange={e => setProfile({ ...profile, linkedInUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>LeetCode Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={profile.leetCodeUrl}
                  onChange={e => setProfile({ ...profile, leetCodeUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Portfolio URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={profile.portfolioUrl}
                  onChange={e => setProfile({ ...profile, portfolioUrl: e.target.value })}
                />
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-body)' }}>
              Ready to launch your personalized student dashboard. Your configuration is saved to local storage.
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn-secondary btn-sm">
              &larr; Back
            </button>
          ) : <div></div>}

          <button onClick={handleNext} className="btn-primary">
            {step === 3 ? 'Finish & Open Dashboard' : 'Continue &rarr;'}
          </button>
        </div>
      </div>
    </div>
  );
}
