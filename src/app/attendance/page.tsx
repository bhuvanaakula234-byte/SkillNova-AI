'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';
import { initialAttendanceSubjects, AttendanceSubject } from '@/lib/dataStore';

export default function AttendancePlannerPage() {
  const [subjects, setSubjects] = useState<AttendanceSubject[]>([]);
  const [targetPercentage, setTargetPercentage] = useState(75);
  const [newSubName, setNewSubName] = useState('');
  const [newAttended, setNewAttended] = useState(30);
  const [newTotal, setNewTotal] = useState(35);

  useEffect(() => {
    const saved = localStorage.getItem('skillnova_attendance_subjects');
    if (saved) {
      try {
        setSubjects(JSON.parse(saved));
      } catch (e) {
        setSubjects(initialAttendanceSubjects);
      }
    } else {
      setSubjects(initialAttendanceSubjects);
      localStorage.setItem('skillnova_attendance_subjects', JSON.stringify(initialAttendanceSubjects));
    }
  }, []);

  const saveSubs = (updated: AttendanceSubject[]) => {
    setSubjects(updated);
    localStorage.setItem('skillnova_attendance_subjects', JSON.stringify(updated));
  };

  const updateSubject = (id: string, attended: number, total: number) => {
    const updated = subjects.map(s => s.id === id ? { ...s, attended, total } : s);
    saveSubs(updated);
  };

  const addSubject = () => {
    if (!newSubName.trim()) return;
    const item: AttendanceSubject = {
      id: `sub-${Date.now()}`,
      subject: newSubName.trim(),
      attended: newAttended,
      total: newTotal
    };
    saveSubs([...subjects, item]);
    setNewSubName('');
  };

  const removeSubject = (id: string) => {
    saveSubs(subjects.filter(s => s.id !== id));
  };

  const totalAttended = subjects.reduce((acc, s) => acc + s.attended, 0);
  const totalClasses = subjects.reduce((acc, s) => acc + s.total, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : '0';

  const numOverall = parseFloat(overallPercentage);
  let statusMessage = '';
  if (numOverall >= targetPercentage) {
    const canBunk = Math.floor((totalAttended * 100 - targetPercentage * totalClasses) / targetPercentage);
    statusMessage = `Safe: You can miss up to ${Math.max(0, canBunk)} upcoming consecutive lectures and remain above ${targetPercentage}%.`;
  } else {
    const needToAttend = Math.ceil((targetPercentage * totalClasses - totalAttended * 100) / (100 - targetPercentage));
    statusMessage = `Warning: You need to attend the next ${Math.max(1, needToAttend)} classes consecutively without missing to reach ${targetPercentage}%.`;
  }

  return (
    <StudentLayout pageTitle="Academic Planner">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
            Attendance & Coursework Eligibility Planner
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Track subject-wise lecture attendance and calculate examination eligibility cutoffs.
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-light)', padding: '0.85rem 1rem', borderRadius: '6px', fontSize: '0.825rem', color: 'var(--text-body)' }}>
          <strong>Notice:</strong> Attendance values are entered and maintained directly by the student. SkillNova AI does not scrape private college ERP portals without institutional APIs.
        </div>

        {/* Overall Status Banner */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>Semester Aggregate</span>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--text-heading)', margin: '0.2rem 0' }}>
                Overall Attendance: {overallPercentage}%
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {totalAttended} attended out of {totalClasses} conducted sessions.
              </p>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem 1.25rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-heading)' }}>Target Cutoff:</span>
                <select
                  className="form-control"
                  style={{ width: 'auto', padding: '0.3rem 0.6rem', fontSize: '0.825rem' }}
                  value={targetPercentage}
                  onChange={e => setTargetPercentage(parseInt(e.target.value))}
                >
                  <option value={75}>75% (Standard Exam Cutoff)</option>
                  <option value={80}>80% (Placement Eligibility)</option>
                  <option value={85}>85% (Dean&apos;s Honor)</option>
                </select>
              </div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: numOverall >= targetPercentage ? 'var(--success)' : 'var(--warning)' }}>
                {statusMessage}
              </div>
            </div>
          </div>
        </div>

        {/* Add Subject Row */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>Add Subject Record</div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.75rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Subject title (e.g. Operating Systems)"
              value={newSubName}
              onChange={e => setNewSubName(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Attended"
              value={newAttended}
              onChange={e => setNewAttended(parseInt(e.target.value) || 0)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Total Conducted"
              value={newTotal}
              onChange={e => setNewTotal(parseInt(e.target.value) || 0)}
            />
            <button onClick={addSubject} className="btn-primary btn-sm">
              Add Subject
            </button>
          </div>
        </div>

        {/* Subject Breakdown List */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>Subject-wise Breakdown</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {subjects.map(s => {
              const pct = s.total > 0 ? Math.round((s.attended / s.total) * 100) : 0;
              const isSafe = pct >= targetPercentage;

              return (
                <div
                  key={s.id}
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid var(--border-light)',
                    padding: '0.85rem 1rem',
                    borderRadius: '6px',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1.5fr 1fr auto',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.9rem' }}>{s.subject}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.attended} / {s.total} Lectures</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: isSafe ? 'var(--success)' : 'var(--warning)' }}>
                      {pct}%
                    </span>
                  </div>

                  <div>
                    <div className="progress-track" style={{ height: '5px' }}>
                      <div className="progress-fill" style={{ width: `${pct}%`, backgroundColor: isSafe ? 'var(--success)' : 'var(--warning)' }}></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button onClick={() => updateSubject(s.id, s.attended + 1, s.total + 1)} className="btn-secondary btn-sm" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                      + Attended
                    </button>
                    <button onClick={() => updateSubject(s.id, s.attended, s.total + 1)} className="btn-secondary btn-sm" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                      + Missed
                    </button>
                  </div>

                  <button
                    onClick={() => removeSubject(s.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1rem' }}
                    title="Delete subject"
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </StudentLayout>
  );
}
