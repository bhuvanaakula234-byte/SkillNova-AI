'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Student Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.6rem' }}>Support & Partnerships</span>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
          Contact SkillNova AI
        </h1>
        <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          Have questions regarding career roadmaps, college training partnerships, or platform feedback? Reach out to our academic advisory team.
        </p>
      </div>

      <div className="card">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <span className="badge badge-success" style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>Message Received</span>
            <h2 style={{ color: 'var(--text-heading)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Thank You, {name}</h2>
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', maxWidth: '450px', margin: '0 auto 1.5rem' }}>
              Your message has been logged. Our academic advisory team will respond to <strong>{email}</strong> within 24 business hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }}
              className="btn-primary btn-sm"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Bhuvana Akula"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="student@institution.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Inquiry Category</label>
              <select
                className="form-control"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Student Inquiry">Student Career Guidance & Tools</option>
                <option value="College Partnership">College / Placement Cell Partnership</option>
                <option value="Bug Report">Technical Bug Report / Suggestion</option>
                <option value="General">General Inquiry</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                required
                className="form-control"
                rows={5}
                placeholder="How can we assist your engineering journey?"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Response turnaround: Typically within 24 business hours.
              </span>

              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Support Details Strip */}
      <div className="grid-3" style={{ marginTop: '2rem' }}>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Student Support</div>
          <span style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>support@skillnova.ai</span>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Institutional Outreach</div>
          <span style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>partnerships@skillnova.ai</span>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Location</div>
          <span style={{ color: 'var(--text-body)', fontSize: '0.85rem' }}>Hyderabad & Bengaluru, India</span>
        </div>
      </div>
    </div>
  );
}
