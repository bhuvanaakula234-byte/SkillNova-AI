'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';
import { initialApplications, ApplicationItem } from '@/lib/dataStore';

export default function OpportunitiesPage() {
  const [apps, setApps] = useState<ApplicationItem[]>([]);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationItem['status']>('Applied');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('skillnova_job_applications');
    if (saved) {
      try {
        setApps(JSON.parse(saved));
      } catch (e) {
        setApps(initialApplications);
      }
    } else {
      setApps(initialApplications);
      localStorage.setItem('skillnova_job_applications', JSON.stringify(initialApplications));
    }
  }, []);

  const saveApps = (updated: ApplicationItem[]) => {
    setApps(updated);
    localStorage.setItem('skillnova_job_applications', JSON.stringify(updated));
  };

  const addApplication = () => {
    if (!newCompany.trim() || !newRole.trim()) return;
    const item: ApplicationItem = {
      id: `app-${Date.now()}`,
      company: newCompany.trim(),
      role: newRole.trim(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: newStatus,
      notes: newNotes.trim() || 'Applied directly via company career portal.'
    };
    saveApps([item, ...apps]);
    setNewCompany('');
    setNewRole('');
    setNewNotes('');
  };

  const updateStatus = (id: string, status: ApplicationItem['status']) => {
    const updated = apps.map(a => a.id === id ? { ...a, status } : a);
    saveApps(updated);
  };

  const deleteApp = (id: string) => {
    saveApps(apps.filter(a => a.id !== id));
  };

  const companyChecklists = [
    {
      company: "Amazon SDE-1 / Intern",
      rounds: "OA1 (2 DSA Problems) -> OA2 (Work Simulation) -> 3 Technical Screening Rounds",
      keyTopics: ["Binary Trees and Graphs", "Dynamic Programming", "16 Leadership Principles", "System Design Basics"]
    },
    {
      company: "Goldman Sachs Analyst",
      rounds: "HackerRank Math and Coding -> Technical Round (DSA & Math) -> Senior Round",
      keyTopics: ["Probability and Combinatorics", "Hashing and Strings", "OOP in Java or C++", "Operating Systems"]
    },
    {
      company: "TCS Digital SDE",
      rounds: "National Qualifier Test (NQT) -> Technical Interview -> HR Round",
      keyTopics: ["Advanced Coding (Arrays, Strings)", "Spring Boot Concepts", "SQL Joins", "Logical Aptitude"]
    }
  ];

  return (
    <StudentLayout pageTitle="Placement Tracker">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
            Placement Playbooks & Application Pipeline
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Review company-specific assessment structures and maintain your personal application statuses.
          </p>
        </div>

        {/* Company Playbooks */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>Tier-1 Hiring Playbooks</h2>
          <div className="grid-3">
            {companyChecklists.map((c, idx) => (
              <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>{c.company}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <strong>Format:</strong> {c.rounds}
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {c.keyTopics.map((t, tidx) => (
                    <span key={tidx} className="badge badge-neutral" style={{ fontSize: '0.725rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Application Form */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>Record Application</h2>
          <div className="grid-4" style={{ alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Company</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Microsoft"
                value={newCompany}
                onChange={e => setNewCompany(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Role</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. SDE Intern"
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Status</label>
              <select
                className="form-control"
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as any)}
              >
                <option value="Draft">Draft</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <button onClick={addApplication} className="btn-primary btn-sm" style={{ height: '39px' }}>
              Add Application
            </button>
          </div>
        </div>

        {/* Application Pipeline Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-heading)' }}>Company & Date</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-heading)' }}>Role</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-heading)' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-heading)' }}>Notes</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-heading)', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.85rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{a.company}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.appliedDate}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-heading)' }}>
                    {a.role}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <select
                      className="form-control"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                      value={a.status}
                      onChange={e => updateStatus(a.id, e.target.value as any)}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offered">Offered</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-body)', fontSize: '0.825rem' }}>
                    {a.notes}
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>
                    <button onClick={() => deleteApp(a.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.8rem' }}>
                      Delete
                    </button>
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
