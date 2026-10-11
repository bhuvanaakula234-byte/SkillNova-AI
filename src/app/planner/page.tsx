'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';
import { getSavedWeeklyGoals, saveWeeklyGoals, WeeklyGoal } from '@/lib/dataStore';

export default function StudyPlannerPage() {
  const [goals, setGoals] = useState<WeeklyGoal[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<WeeklyGoal['category']>('DSA');
  
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState<'Focus' | 'Break'>('Focus');

  useEffect(() => {
    setGoals(getSavedWeeklyGoals());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      if (timerMode === 'Focus') {
        alert('Pomodoro focus sprint complete. Take a 5-minute break.');
        setTimerMode('Break');
        setTimerSeconds(5 * 60);
      } else {
        alert('Break completed. Ready to resume your focus sprint?');
        setTimerMode('Focus');
        setTimerSeconds(25 * 60);
      }
      setTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds, timerMode]);

  const toggleGoal = (id: string) => {
    const updated = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    setGoals(updated);
    saveWeeklyGoals(updated);
  };

  const addGoal = () => {
    if (!newTitle.trim()) return;
    const item: WeeklyGoal = {
      id: `goal-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      completed: false,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
    };
    const updated = [item, ...goals];
    setGoals(updated);
    saveWeeklyGoals(updated);
    setNewTitle('');
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    saveWeeklyGoals(updated);
  };

  const formatTimer = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <StudentLayout pageTitle="Study Planner">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
            Weekly Milestone & Study Session Planner
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Coordinate targeted study blocks with your roadmap milestones and track completed tasks.
          </p>
        </div>

        {/* Top: Focus Timer & Summary */}
        <div className="grid-2">
          
          {/* Focus Timer */}
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
              {timerMode === 'Focus' ? '25-Minute Focus Sprint' : '5-Minute Rest Interval'}
            </span>

            <div style={{ fontSize: '3.75rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0.25rem 0 1rem' }}>
              {formatTimer(timerSeconds)}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setTimerActive(!timerActive)} className="btn-primary">
                {timerActive ? 'Pause Timer' : 'Start Focus Sprint'}
              </button>

              <button
                onClick={() => {
                  setTimerActive(false);
                  setTimerSeconds(timerMode === 'Focus' ? 25 * 60 : 5 * 60);
                }}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Weekly Task Stats */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>Milestone Progress</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                Tasks completed here feed into your verified learning streak and update your dashboard metrics.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', margin: '1rem 0' }}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Completed</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>
                  {goals.filter(g => g.completed).length} / {goals.length}
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Completion Rate</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {goals.length > 0 ? Math.round((goals.filter(g => g.completed).length / goals.length) * 100) : 0}%
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              14-day study streak currently maintained.
            </div>
          </div>

        </div>

        {/* Task Management */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)' }}>Weekly Task Roster</h2>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="form-control"
                placeholder="New task title..."
                style={{ width: '240px', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addGoal(); }}
              />
              <select
                className="form-control"
                style={{ width: 'auto', padding: '0.4rem', fontSize: '0.85rem' }}
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as any)}
              >
                <option value="DSA">DSA</option>
                <option value="FullStack">Full Stack</option>
                <option value="AI">AI/ML</option>
                <option value="College">College</option>
              </select>
              <button onClick={addGoal} className="btn-primary btn-sm">
                Add Task
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {goals.map(g => (
              <div
                key={g.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: g.completed ? 'var(--success-bg)' : '#F8FAFC',
                  border: g.completed ? '1px solid var(--success-border)' : '1px solid var(--border-light)',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    checked={g.completed}
                    onChange={() => toggleGoal(g.id)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                  <div>
                    <span style={{ fontSize: '0.9rem', color: g.completed ? 'var(--text-muted)' : 'var(--text-heading)', textDecoration: g.completed ? 'line-through' : 'none', fontWeight: 500 }}>
                      {g.title}
                    </span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due: {g.dueDate}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '0.725rem' }}>{g.category}</span>
                  <button
                    onClick={() => deleteGoal(g.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1rem' }}
                    title="Delete goal"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </StudentLayout>
  );
}
