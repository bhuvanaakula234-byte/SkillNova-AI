'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';
import { initialCertifications, CertificationItem, getSavedProfile, StudentProfile } from '@/lib/dataStore';

export default function CertificationsVaultPage() {
  const [certs, setCerts] = useState<CertificationItem[]>([]);
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [skillsCovered, setSkillsCovered] = useState('');
  const [status, setStatus] = useState<'Completed' | 'In Progress'>('Completed');

  useEffect(() => {
    setProfile(getSavedProfile());
    const saved = localStorage.getItem('skillnova_certifications');
    if (saved) {
      try {
        setCerts(JSON.parse(saved));
      } catch (e) {
        setCerts(initialCertifications);
      }
    } else {
      setCerts(initialCertifications);
      localStorage.setItem('skillnova_certifications', JSON.stringify(initialCertifications));
    }
  }, []);

  const saveCerts = (updated: CertificationItem[]) => {
    setCerts(updated);
    localStorage.setItem('skillnova_certifications', JSON.stringify(updated));
  };

  const addCert = () => {
    if (!title.trim() || !issuer.trim()) return;
    const item: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: title.trim(),
      issuer: issuer.trim(),
      issueDate: new Date().toISOString().split('T')[0],
      credentialUrl: credentialUrl.trim(),
      skillsCovered: skillsCovered.split(',').map(s => s.trim()).filter(Boolean),
      status
    };
    saveCerts([item, ...certs]);
    setTitle('');
    setIssuer('');
    setCredentialUrl('');
    setSkillsCovered('');
  };

  const deleteCert = (id: string) => {
    saveCerts(certs.filter(c => c.id !== id));
  };

  const evidenceMap = [
    {
      skill: 'Java & Object-Oriented Design',
      category: 'Languages',
      evidenceItems: [
        { type: 'Coursework', label: 'OOP with Java (Sem 2)' },
        { type: 'Project', label: 'Secure Banking REST API (Spring Boot)' },
        { type: 'Certification', label: 'Oracle Certified Java SE 17 Developer' }
      ],
      strength: 'Robust Proof'
    },
    {
      skill: 'Spring Boot & Microservices',
      category: 'Frameworks',
      evidenceItems: [
        { type: 'Project', label: 'Secure Banking Microservice (ACID Transfers)' }
      ],
      strength: 'Moderate Proof (Add Redis and Docker)'
    },
    {
      skill: 'PostgreSQL / Relational SQL',
      category: 'Databases',
      evidenceItems: [
        { type: 'Coursework', label: 'Database Management Systems Lab' },
        { type: 'Project', label: 'Banking Ledger Schema' }
      ],
      strength: 'Robust Proof'
    },
    {
      skill: 'Vector Databases & LangChain',
      category: 'AI Engineering',
      evidenceItems: [
        { type: 'Project', label: 'RAG Academic Notes Assistant' }
      ],
      strength: 'In Progress'
    },
    {
      skill: 'Docker Containerization',
      category: 'Cloud / DevOps',
      evidenceItems: [],
      strength: 'Lacks Evidence (Action: Containerize banking service)'
    }
  ];

  return (
    <StudentLayout pageTitle="Certifications & Evidence">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
            Certification Vault & Skill-to-Project Evidence Map
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Store official exam credentials and map tangible project proof behind every claimed competency.
          </p>
        </div>

        {/* Skill-to-Evidence Map */}
        <div className="card">
          <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>Proof Audit</span>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-heading)' }}>Interactive Skill-to-Evidence Map</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Verifies whether your self-reported skills are backed by verifiable code repositories, coursework, or certifications.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {evidenceMap.map((mapItem, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid var(--border-light)',
                  padding: '1rem',
                  borderRadius: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{mapItem.skill}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>({mapItem.category})</span>
                  </div>
                  <span className={`badge ${mapItem.strength.includes('Robust') ? 'badge-success' : (mapItem.strength.includes('Moderate') ? 'badge-warning' : 'badge-neutral')}`}>
                    {mapItem.strength}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {mapItem.evidenceItems.length > 0 ? (
                    mapItem.evidenceItems.map((e, eidx) => (
                      <span
                        key={eidx}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid var(--border-light)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          color: 'var(--text-body)'
                        }}
                      >
                        <strong style={{ color: 'var(--primary)' }}>[{e.type}]</strong> {e.label}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--danger)' }}>
                      No practical evidence or code link recorded in profile.
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Certification */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>Add Verified Credential</h2>
          <div className="grid-2">
            <div className="form-group">
              <label>Certification Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Oracle Certified Java SE 17 Developer"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Issuing Organization</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Oracle / AWS / Coursera"
                value={issuer}
                onChange={e => setIssuer(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Verification URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://credly.com/..."
                value={credentialUrl}
                onChange={e => setCredentialUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Skills Validated (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Java 17, Streams, Concurrency"
                value={skillsCovered}
                onChange={e => setSkillsCovered(e.target.value)}
              />
            </div>
          </div>

          <button onClick={addCert} className="btn-primary btn-sm">
            Save Credential
          </button>
        </div>

        {/* Recorded Credentials */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>Saved Credentials</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {certs.map(c => (
              <div key={c.id} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{c.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.issuer} &bull; {c.issueDate}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`badge ${c.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span>
                    <button onClick={() => deleteCert(c.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.9rem' }}>
                      &times;
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {c.skillsCovered.map((s, idx) => (
                    <span key={idx} className="badge badge-neutral">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </StudentLayout>
  );
}
