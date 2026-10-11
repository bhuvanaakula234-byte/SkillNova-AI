'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // If this is a student workspace page, the StudentLayout manages the workspace view
  const isStudentWorkspace = [
    '/dashboard',
    '/career-navigator',
    '/skill-gap-analyzer',
    '/roadmap',
    '/resume-analyzer',
    '/projects',
    '/interview-prep',
    '/profile',
    '/attendance',
    '/planner',
    '/certifications',
    '/opportunities'
  ].some(route => pathname === route || pathname?.startsWith(route + '/'));

  if (isStudentWorkspace) {
    return null;
  }

  return (
    <footer className="public-footer">
      <div className="footer-grid">
        <div>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>SkillNova AI</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px', marginBottom: '1rem' }}>
            Bridging Skills to Careers. An educational and career preparation platform designed for college students and early-career software engineers.
          </p>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--highlight-light)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
            Structured Career Intelligence
          </div>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <Link href="/features">Feature Directory</Link>
          <Link href="/get-started">Get Started</Link>
          <Link href="/dashboard">Student Dashboard</Link>
          <Link href="/roadmap">Canonical Roadmaps</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Support</Link>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; 2026 SkillNova AI. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms-and-conditions" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</Link>
        </div>
      </div>
    </footer>
  );
}
