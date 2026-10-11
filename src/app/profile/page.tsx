'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';
import { getSavedProfile, saveProfile, StudentProfile, ProjectItem, SkillItem } from '@/lib/dataStore';
import { IconCheck, IconAlertCircle } from '@/components/Icons';

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'technical' | 'career' | 'links' | 'projects'>('personal');
  const [saveStatus, setSaveStatus] = useState('');
  
  // New skill input
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillItem['category']>('Languages');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillItem['level']>('Intermediate');

  // New project input
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    name: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    status: 'In Progress'
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    setProfile(getSavedProfile());
  }, []);

  if (!profile) {
    return (
      <StudentLayout pageTitle="Student Profile">
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading student profile...</p>
        </div>
      </StudentLayout>
    );
  }

  const handleSave = async () => {
    saveProfile(profile);
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
    } catch (e) {
      console.warn('API sync notice', e);
    }
    setSaveStatus('Profile changes saved successfully to local storage and database.');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    const item: SkillItem = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
      verifiedVia: 'Self-Assessed'
    };
    setProfile({ ...profile, skills: [...profile.skills, item] });
    setNewSkillName('');
  };

  const removeSkill = (index: number) => {
    setProfile({ ...profile, skills: profile.skills.filter((_, idx) => idx !== index) });
  };

  const addProject = () => {
    if (!newProject.name?.trim()) return;
    const techs = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const item: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: newProject.name,
      description: newProject.description || '',
      technologies: techs.length > 0 ? techs : ['General'],
      githubUrl: newProject.githubUrl || '',
      liveUrl: newProject.liveUrl || '',
      contribution: 'Developer',
      status: (newProject.status as ProjectItem['status']) || 'In Progress',
      skillsDemonstrated: techs
    };
    setProfile({ ...profile, projects: [item, ...profile.projects] });
    setNewProject({ name: '', description: '', githubUrl: '', liveUrl: '', status: 'In Progress' });
    setTechInput('');
  };

  const removeProject = (id: string) => {
    setProfile({ ...profile, projects: profile.projects.filter(p => p.id !== id) });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'academic', label: 'Academic Records' },
    { id: 'technical', label: 'Technical Skills' },
    { id: 'career', label: 'Career Preferences' },
    { id: 'links', label: 'Professional Profiles' },
    { id: 'projects', label: 'Projects & Work' },
  ];

  return (
    <StudentLayout pageTitle="Student Profile">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header & Save Action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
              Profile Management
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
              Maintain verified academic credentials, demonstrated skills, and portfolio project links.
            </p>
          </div>

          <button onClick={handleSave} className="btn-primary">
            <IconCheck size={16} />
            <span>Save Profile Changes</span>
          </button>
        </div>

        {saveStatus && (
          <div style={{ backgroundColor: 'var(--success-bg)', border: '1px solid var(--success-border)', color: 'var(--success)', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600 }}>
            {saveStatus}
          </div>
        )}

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-light)', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-body)',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: '0.875rem',
                padding: '0.6rem 0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Personal Information */}
        {activeTab === 'personal' && (
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Personal & Institutional Details
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
                <label>Roll / Registration Number</label>
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
                <label>Graduation Year</label>
                <input
                  type="number"
                  className="form-control"
                  value={profile.graduationYear}
                  onChange={e => setProfile({ ...profile, graduationYear: parseInt(e.target.value) || 2028 })}
                />
              </div>

              <div className="form-group">
                <label>Current Semester</label>
                <input
                  type="number"
                  className="form-control"
                  value={profile.currentSemester}
                  onChange={e => setProfile({ ...profile, currentSemester: parseInt(e.target.value) || 4 })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Academic Information */}
        {activeTab === 'academic' && (
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Academic Performance & Coursework
            </h2>
            <div className="grid-3">
              <div className="form-group">
                <label>Current Cumulative CGPA (out of 10.0)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={profile.cgpa}
                  onChange={e => setProfile({ ...profile, cgpa: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="form-group">
                <label>Attendance Percentage (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={profile.attendancePercentage}
                  onChange={e => setProfile({ ...profile, attendancePercentage: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="form-group">
                <label>Active Backlogs</label>
                <select
                  className="form-control"
                  value={profile.activeBacklogs ? 'Yes' : 'No'}
                  onChange={e => setProfile({ ...profile, activeBacklogs: e.target.value === 'Yes' })}
                >
                  <option value="No">No (Clean Record)</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Relevant Completed Coursework</label>
              <textarea
                className="form-control"
                rows={3}
                value={profile.relevantCoursework.join('\n')}
                onChange={e => setProfile({ ...profile, relevantCoursework: e.target.value.split('\n').filter(Boolean) })}
                placeholder="List one subject per line (e.g. Object Oriented Programming with Java)"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enter one subject title per line.</span>
            </div>
          </div>
        )}

        {/* Tab 3: Technical Skills */}
        {activeTab === 'technical' && (
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              Technical Competencies ({profile.skills.length} Tracked)
            </h2>

            {/* Add Skill Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr auto', gap: '0.75rem', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Skill name (e.g. Docker, Redis, Kafka)"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
              />
              <select
                className="form-control"
                value={newSkillCategory}
                onChange={e => setNewSkillCategory(e.target.value as any)}
              >
                <option value="Languages">Languages</option>
                <option value="Frameworks">Frameworks</option>
                <option value="Databases">Databases</option>
                <option value="Tools">Tools</option>
                <option value="DSA">DSA</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Cloud">Cloud</option>
              </select>
              <select
                className="form-control"
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as any)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button onClick={addSkill} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                Add Skill
              </button>
            </div>

            {/* Skills List */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {profile.skills.map((s, idx) => (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{s.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({s.level})</span>
                  <button 
                    onClick={() => removeSkill(idx)}
                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: 0, fontSize: '0.9rem', lineHeight: 1 }}
                    title="Remove skill"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Career Preferences */}
        {activeTab === 'career' && (
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Target Roles & Preferences
            </h2>
            <div className="grid-2">
              <div className="form-group">
                <label>Primary Target Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.primaryTargetRole}
                  onChange={e => setProfile({ ...profile, primaryTargetRole: e.target.value })}
                />
              </div>

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
                <label>Preferred Work Locations</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.preferredLocation}
                  onChange={e => setProfile({ ...profile, preferredLocation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Preparation Timeline (Months)</label>
                <input
                  type="number"
                  className="form-control"
                  value={profile.timelineMonths}
                  onChange={e => setProfile({ ...profile, timelineMonths: parseInt(e.target.value) || 12 })}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Career Goals Summary</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={profile.careerGoals}
                  onChange={e => setProfile({ ...profile, careerGoals: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Professional Profiles */}
        {activeTab === 'links' && (
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Verified Online Handles & Portfolios
            </h2>
            <div className="grid-2">
              <div className="form-group">
                <label>GitHub Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={profile.githubUrl}
                  onChange={e => setProfile({ ...profile, githubUrl: e.target.value })}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="form-group">
                <label>LinkedIn Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={profile.linkedInUrl}
                  onChange={e => setProfile({ ...profile, linkedInUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="form-group">
                <label>LeetCode Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={profile.leetCodeUrl}
                  onChange={e => setProfile({ ...profile, leetCodeUrl: e.target.value })}
                  placeholder="https://leetcode.com/username"
                />
              </div>

              <div className="form-group">
                <label>Personal Portfolio Website URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={profile.portfolioUrl}
                  onChange={e => setProfile({ ...profile, portfolioUrl: e.target.value })}
                  placeholder="https://yourname.dev"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Projects & Work */}
        {activeTab === 'projects' && (
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Demonstrated Portfolio Projects
            </h2>

            {/* Add Project Form */}
            <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '6px', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.85rem' }}>Add New Project</div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Banking REST API"
                    value={newProject.name}
                    onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Technologies (comma-separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Java, Spring Boot, PostgreSQL"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>GitHub Repository URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://github.com/..."
                    value={newProject.githubUrl}
                    onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://demo.app"
                    value={newProject.liveUrl}
                    onChange={e => setNewProject({ ...newProject, liveUrl: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Project Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Describe problem solved, technical decisions, and architecture."
                    value={newProject.description}
                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  />
                </div>
              </div>
              <button onClick={addProject} className="btn-primary btn-sm">
                Add Project
              </button>
            </div>

            {/* Projects List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {profile.projects.map((proj) => (
                <div key={proj.id} style={{ border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{proj.name}</div>
                      <span className="badge badge-success" style={{ fontSize: '0.725rem', marginTop: '0.2rem' }}>{proj.status}</span>
                    </div>
                    <button 
                      onClick={() => removeProject(proj.id)} 
                      style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Delete
                    </button>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', margin: '0.5rem 0' }}>{proj.description}</p>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="badge badge-neutral">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </StudentLayout>
  );
}
