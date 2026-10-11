'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentLayout from '@/components/StudentLayout';
import { 
  getSavedProfile, 
  calculateCareerReadiness, 
  StudentProfile 
} from '@/lib/dataStore';
import { 
  IconArrowRight, 
  IconCheck, 
  IconClock, 
  IconTarget, 
  IconAlertCircle, 
  IconMap, 
  IconFileText, 
  IconMic,
  IconFolderKanban
} from '@/components/Icons';

export default function DashboardPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [readiness, setReadiness] = useState<ReturnType<typeof calculateCareerReadiness> | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const prof = getSavedProfile();
    setProfile(prof);
    setReadiness(calculateCareerReadiness(prof));

    const savedProgress = localStorage.getItem('skillnova_roadmap_progress');
    if (savedProgress) {
      try {
        setCompletedTopics(JSON.parse(savedProgress));
      } catch (e) {
        console.warn('Error reading roadmap progress', e);
      }
    }

    const handleUpdate = () => {
      const p = getSavedProfile();
      setProfile(p);
      setReadiness(calculateCareerReadiness(p));
    };

    window.addEventListener('skillnova_profile_updated', handleUpdate);
    return () => window.removeEventListener('skillnova_profile_updated', handleUpdate);
  }, []);

  if (!profile || !readiness) {
    return (
      <StudentLayout pageTitle="Dashboard">
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading student workspace...</p>
        </div>
      </StudentLayout>
    );
  }

  // Active student first name
  const firstName = profile.fullName.split(' ')[0] || profile.fullName;

  // Unfinished Roadmap Tasks for Progressive Disclosure
  const upcomingTasks = [
    {
      id: "dsa-2-2",
      title: "Longest Substring Without Repeating Characters",
      roadmap: "15-Stage DSA Roadmap",
      category: "Arrays & Strings",
      href: "/roadmap"
    },
    {
      id: "dsa-3-1",
      title: "Group Anagrams & Frequency Hashing",
      roadmap: "15-Stage DSA Roadmap",
      category: "Hashing & Math",
      href: "/roadmap"
    }
  ];

  return (
    <StudentLayout pageTitle="Student Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* A. Welcome Section */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Personal Career Overview</span>
              <h1 style={{ fontSize: '1.75rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                Welcome back, {firstName}
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
                Your next step toward becoming a Java Full Stack Developer or AI Engineer.
              </p>
            </div>

            <Link href="/roadmap" className="btn-primary">
              <span>Continue Learning</span>
              <IconArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* B. Compact Academic Summary (4 Cards Only) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)' }}>Academic Summary</h2>
            <Link href="/profile" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
              Edit in Profile &rarr;
            </Link>
          </div>

          <div className="grid-4">
            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current CGPA</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0.25rem 0' }}>
                {profile.cgpa.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scale of 10.0</div>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attendance</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: profile.attendancePercentage >= 85 ? 'var(--success)' : 'var(--warning)', margin: '0.25rem 0' }}>
                {profile.attendancePercentage}%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recorded attendance</div>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Backlogs</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: profile.activeBacklogs ? 'var(--danger)' : 'var(--success)', margin: '0.25rem 0' }}>
                {profile.activeBacklogs ? 'Yes' : 'No'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {profile.activeBacklogs ? '1 backlog pending' : 'Clean academic record'}
              </div>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Graduation Year</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0.25rem 0' }}>
                {profile.graduationYear}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Semester {profile.currentSemester}</div>
            </div>
          </div>
        </div>

        {/* C. Career Goals (2 Cards Only) */}
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>Primary Career Goals</h2>
          <div className="grid-2">
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>Primary Track</span>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)' }}>Java Full Stack Developer</h3>
                </div>
                <span className="badge badge-success">85% Alignment</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Focuses on Core Java, Spring Boot microservices, relational database transactions, and React frontend integration.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/roadmap" className="btn-secondary btn-sm">
                  View Role Roadmap
                </Link>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>11 Structured Stages</span>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span className="badge badge-neutral" style={{ marginBottom: '0.35rem' }}>Specialization Track</span>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)' }}>AI Engineer</h3>
                </div>
                <span className="badge badge-warning">80% Alignment</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Focuses on Applied Python, Linear Algebra, Machine Learning pipelines, vector search, and Retrieval-Augmented Generation.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/roadmap" className="btn-secondary btn-sm">
                  View Role Roadmap
                </Link>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>10 Structured Stages</span>
              </div>
            </div>
          </div>
        </div>

        {/* D. Continue Learning & E. Skill Gap Snapshot */}
        <div className="grid-2">
          
          {/* Continue Learning */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)' }}>Continue Learning</h2>
                <Link href="/roadmap" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                  View All Stages &rarr;
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {upcomingTasks.map((t) => (
                  <div key={t.id} style={{ backgroundColor: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)' }}>{t.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.roadmap} &bull; {t.category}</div>
                    </div>
                    <Link href={t.href} className="btn-secondary btn-sm" style={{ padding: '0.3rem 0.65rem' }}>
                      Continue
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Completed topics are saved locally and update your readiness score automatically.
            </div>
          </div>

          {/* Skill Gap Snapshot */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)' }}>Skill Gap Snapshot</h2>
                <Link href="/skill-gap-analyzer" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                  View Full Audit &rarr;
                </Link>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Demonstrated Competencies</span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                  <span className="badge badge-success">Java Core & OOP</span>
                  <span className="badge badge-success">Spring Boot REST</span>
                  <span className="badge badge-success">PostgreSQL</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>High Priority Gaps to Develop</span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                  <span className="badge badge-warning">Dynamic Programming</span>
                  <span className="badge badge-warning">Spring Security JWT</span>
                  <span className="badge badge-neutral">Docker Containers</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <Link href="/skill-gap-analyzer" className="btn-secondary btn-sm" style={{ width: '100%' }}>
                View Analysis & Actionable Plan
              </Link>
            </div>
          </div>

        </div>

        {/* F. Portfolio & Interview Activity */}
        <div className="grid-3">
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <IconFolderKanban size={18} className="text-primary" />
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>Projects in Progress</h3>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.2rem' }}>
              {profile.projects.filter(p => p.status === 'In Progress').length} Active Builds
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {profile.projects[0]?.name || 'Banking REST API'} currently recorded.
            </p>
            <Link href="/projects" style={{ fontSize: '0.825rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
              Open Project Studio &rarr;
            </Link>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <IconFileText size={18} className="text-primary" />
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>Resume ATS Status</h3>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.2rem' }}>
              Role Ready
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Target role aligned to {profile.primaryTargetRole}.
            </p>
            <Link href="/resume-analyzer" style={{ fontSize: '0.825rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
              Review Resume Keywords &rarr;
            </Link>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <IconMic size={18} className="text-primary" />
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>Interview Practice</h3>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.2rem' }}>
              Technical Screen
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Practice Java HashMap and Spring transactions.
            </p>
            <Link href="/interview-prep" style={{ fontSize: '0.825rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
              Launch Practice Studio &rarr;
            </Link>
          </div>
        </div>

        {/* G. Personalized Next Action (Single Focused Recommendation) */}
        <div className="card" style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '6px', backgroundColor: 'var(--highlight-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconTarget size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Recommended Next Action</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                  Complete Stage 2 Topic: Longest Substring Without Repeating Characters
                </div>
              </div>
            </div>

            <Link href="/roadmap" className="btn-primary btn-sm">
              Start Practice Problem
            </Link>
          </div>
        </div>

      </div>
    </StudentLayout>
  );
}
