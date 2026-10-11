'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  IconDashboard, 
  IconCompass, 
  IconBarChart, 
  IconMap, 
  IconFileText, 
  IconFolderKanban, 
  IconMic, 
  IconUser, 
  IconGraduationCap, 
  IconCalendar, 
  IconAward, 
  IconBriefcase
} from '@/components/Icons';
import { getSavedProfile, StudentProfile } from '@/lib/dataStore';

interface StudentLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function StudentLayout({ children, pageTitle }: StudentLayoutProps) {
  const pathname = usePathname();
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    setProfile(getSavedProfile());
    const handleUpdate = () => setProfile(getSavedProfile());
    window.addEventListener('skillnova_profile_updated', handleUpdate);
    return () => window.removeEventListener('skillnova_profile_updated', handleUpdate);
  }, []);

  const navOverview = [
    { label: 'Dashboard', href: '/dashboard', icon: <IconDashboard size={18} /> },
  ];

  const navCareer = [
    { label: 'Career Navigator', href: '/career-navigator', icon: <IconCompass size={18} /> },
    { label: 'Skill Gap Analyzer', href: '/skill-gap-analyzer', icon: <IconBarChart size={18} /> },
    { label: 'Learning Roadmaps', href: '/roadmap', icon: <IconMap size={18} /> },
    { label: 'Resume Analyzer', href: '/resume-analyzer', icon: <IconFileText size={18} /> },
    { label: 'Project Studio', href: '/projects', icon: <IconFolderKanban size={18} /> },
    { label: 'Interview Studio', href: '/interview-prep', icon: <IconMic size={18} /> },
  ];

  const navWorkspace = [
    { label: 'My Profile', href: '/profile', icon: <IconUser size={18} /> },
    { label: 'Academic Planner', href: '/attendance', icon: <IconGraduationCap size={18} /> },
    { label: 'Weekly Study Planner', href: '/planner', icon: <IconCalendar size={18} /> },
    { label: 'Certifications', href: '/certifications', icon: <IconAward size={18} /> },
    { label: 'Placement Tracker', href: '/opportunities', icon: <IconBriefcase size={18} /> },
  ];

  const studentName = profile?.fullName || 'Student';

  return (
    <div className="app-layout">
      {/* Desktop Sidebar */}
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <Image 
              src="/logo.jpg" 
              alt="SkillNova AI" 
              width={120} 
              height={32} 
              priority 
              style={{ borderRadius: '4px' }} 
            />
          </Link>
        </div>

        <nav className="sidebar-nav">
          <div>
            <div className="nav-group-title">Overview</div>
            {navOverview.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={isActive ? 'active' : ''}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div>
            <div className="nav-group-title">Career Development</div>
            {navCareer.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={isActive ? 'active' : ''}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div>
            <div className="nav-group-title">Student Workspace</div>
            {navWorkspace.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={isActive ? 'active' : ''}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: 'var(--highlight-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
              {studentName.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {studentName}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                View Student Profile
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="app-main">
        {/* Topbar */}
        <header className="app-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
              {pageTitle || 'Student Workspace'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" className="btn-secondary btn-sm" style={{ fontWeight: 500 }}>
              Public Site
            </Link>
            <Link href="/profile" className="btn-primary btn-sm">
              My Profile
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
