'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentLayout from '@/components/StudentLayout';
import { getSavedProfile, StudentProfile } from '@/lib/dataStore';
import { IconArrowRight } from '@/components/Icons';

interface SkillGapItem {
  skill: string;
  category: string;
  status: 'Demonstrated' | 'Needs Practice' | 'Missing';
  evidence: string;
  priority: 'High' | 'Medium' | 'Low';
  actionableStep: string;
  linkedRoadmap: string;
}

export default function SkillGapAnalyzerPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [targetRole, setTargetRole] = useState('Java Full Stack Developer');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Demonstrated' | 'Needs Practice' | 'Missing'>('All');

  useEffect(() => {
    const prof = getSavedProfile();
    setProfile(prof);
    if (prof.primaryTargetRole) setTargetRole(prof.primaryTargetRole);
  }, []);

  const isJava = targetRole.includes('Java');

  const allSkills: SkillGapItem[] = isJava ? [
    {
      skill: 'Core Java & OOP Concepts',
      category: 'Languages',
      status: 'Demonstrated',
      evidence: 'Academic coursework and Banking REST API project',
      priority: 'High',
      actionableStep: 'Review advanced multithreading and memory model mechanics.',
      linkedRoadmap: '/roadmap'
    },
    {
      skill: 'Spring Boot REST Services',
      category: 'Frameworks',
      status: 'Demonstrated',
      evidence: 'Secure Banking API project with JPA and transactions',
      priority: 'High',
      actionableStep: 'Ready for production interview questions.',
      linkedRoadmap: '/roadmap'
    },
    {
      skill: 'Relational Database SQL',
      category: 'Databases',
      status: 'Demonstrated',
      evidence: 'DBMS Lab and PostgreSQL integration in projects',
      priority: 'High',
      actionableStep: 'Practice indexing strategies and execution plan analysis.',
      linkedRoadmap: '/roadmap'
    },
    {
      skill: 'Data Structures & Algorithms',
      category: 'DSA',
      status: 'Needs Practice',
      evidence: '140+ problems solved, Graphs and Dynamic Programming in progress',
      priority: 'High',
      actionableStep: 'Complete Stages 12 and 13 on Curated DSA Roadmap.',
      linkedRoadmap: '/roadmap'
    },
    {
      skill: 'Spring Security 6 with JWT',
      category: 'Security',
      status: 'Needs Practice',
      evidence: 'Basic stateless token authentication implemented in repository',
      priority: 'High',
      actionableStep: 'Implement OAuth2 social login and refresh token rotation.',
      linkedRoadmap: '/projects'
    },
    {
      skill: 'Docker Containerization',
      category: 'DevOps',
      status: 'Missing',
      evidence: 'Self-assessed beginner without Dockerfile in public repositories',
      priority: 'Medium',
      actionableStep: 'Containerize Banking REST API with multi-stage Dockerfile.',
      linkedRoadmap: '/projects'
    },
    {
      skill: 'Distributed Caching (Redis)',
      category: 'System Design',
      status: 'Missing',
      evidence: 'No caching mechanisms recorded in project history',
      priority: 'Medium',
      actionableStep: 'Add Redis cache layer to frequently accessed endpoints.',
      linkedRoadmap: '/projects'
    }
  ] : [
    {
      skill: 'Python & Data Analysis',
      category: 'Languages',
      status: 'Demonstrated',
      evidence: 'Pandas and NumPy used in academic ML lab coursework',
      priority: 'High',
      actionableStep: 'Profile memory efficiency and vectorized matrix workflows.',
      linkedRoadmap: '/roadmap'
    },
    {
      skill: 'Linear Algebra & Statistics',
      category: 'Mathematics',
      status: 'Demonstrated',
      evidence: 'High grade in Semester 3 Applied Mathematics',
      priority: 'High',
      actionableStep: 'Connect mathematical intuition directly to backpropagation equations.',
      linkedRoadmap: '/roadmap'
    },
    {
      skill: 'Scikit-Learn Machine Learning',
      category: 'AI/ML',
      status: 'Demonstrated',
      evidence: 'Supervised classification pipelines completed',
      priority: 'High',
      actionableStep: 'Study hyperparameter tuning and cross-validation.',
      linkedRoadmap: '/roadmap'
    },
    {
      skill: 'PyTorch Deep Learning',
      category: 'Deep Learning',
      status: 'Needs Practice',
      evidence: 'Self-assessed beginner, initial lab exercises',
      priority: 'High',
      actionableStep: 'Build a convolutional and transformer model from scratch in PyTorch.',
      linkedRoadmap: '/roadmap'
    },
    {
      skill: 'Vector DBs & RAG Pipelines',
      category: 'Generative AI',
      status: 'Needs Practice',
      evidence: 'Course notes assistant in progress with ChromaDB',
      priority: 'High',
      actionableStep: 'Implement hybrid search (BM25 + dense vectors) and re-ranking.',
      linkedRoadmap: '/projects'
    },
    {
      skill: 'FastAPI Production Serving',
      category: 'Deployment',
      status: 'Missing',
      evidence: 'No live model serving APIs deployed',
      priority: 'High',
      actionableStep: 'Wrap RAG model in asynchronous FastAPI endpoints with streaming.',
      linkedRoadmap: '/projects'
    }
  ];

  const filteredSkills = allSkills.filter(s => {
    if (statusFilter === 'All') return true;
    return s.status === statusFilter;
  });

  const demonstratedCount = allSkills.filter(s => s.status === 'Demonstrated').length;
  const needsPracticeCount = allSkills.filter(s => s.status === 'Needs Practice').length;
  const missingCount = allSkills.filter(s => s.status === 'Missing').length;

  return (
    <StudentLayout pageTitle="Skill Gap Analyzer">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
              Curriculum vs. Industry Skill Gap Audit
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
              Compare your academic preparation and project repositories against verified hiring expectations.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>Target Role:</span>
            <select
              className="form-control"
              style={{ width: 'auto', padding: '0.45rem 0.75rem' }}
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
            >
              <option value="Java Full Stack Developer">Java Full Stack Developer</option>
              <option value="AI Engineer">AI Engineer</option>
            </select>
          </div>
        </div>

        {/* Status Counters */}
        <div className="grid-3">
          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--success)', textTransform: 'uppercase' }}>Demonstrated</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0.2rem 0' }}>{demonstratedCount} Competencies</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified through coursework or projects</div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--warning)', textTransform: 'uppercase' }}>Needs Practice</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0.2rem 0' }}>{needsPracticeCount} Competencies</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Foundational concept known, needs depth</div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>Missing Gaps</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0.2rem 0' }}>{missingCount} Competencies</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unverified on resume or repository</div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['All', 'Demonstrated', 'Needs Practice', 'Missing'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={statusFilter === tab ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Clean Structured Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-heading)' }}>Skill & Category</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-heading)' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-heading)' }}>Current Evidence</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-heading)' }}>Actionable Next Step</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-heading)', textAlign: 'right' }}>Resource</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.skill}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.category}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`badge ${item.status === 'Demonstrated' ? 'badge-success' : (item.status === 'Needs Practice' ? 'badge-warning' : 'badge-neutral')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-body)', maxWidth: '240px' }}>
                    {item.evidence}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-heading)', maxWidth: '280px' }}>
                    {item.actionableStep}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <Link href={item.linkedRoadmap} className="btn-secondary btn-sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </StudentLayout>
  );
}
