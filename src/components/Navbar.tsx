'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // If this is a student workspace page, the StudentLayout sidebar handles navigation
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

  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="public-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image 
            src="/logo.jpg" 
            alt="SkillNova AI" 
            width={125} 
            height={34} 
            priority
            style={{ borderRadius: '4px' }}
          />
        </Link>

        <div className="public-nav-links">
          {navLinks.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <Link href="/dashboard" className="btn-secondary btn-sm">
          Student Dashboard
        </Link>
        <Link href="/get-started" className="btn-primary btn-sm">
          Build My Career Roadmap
        </Link>
      </div>
    </nav>
  );
}
