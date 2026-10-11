import Link from 'next/link';
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
  IconBriefcase,
  IconArrowRight
} from '@/components/Icons';

export default function FeaturesPage() {
  const tools = [
    {
      title: "Student Dashboard",
      description: "Aggregated overview tracking explainable career readiness, academic stats, active streak, and weekly milestones.",
      category: "Overview",
      href: "/dashboard",
      icon: <IconDashboard size={20} className="text-primary" />
    },
    {
      title: "Canonical Learning Roadmaps",
      description: "Structured 15-stage DSA progression plus specialized tracks for Java Full Stack and AI Engineering.",
      category: "Roadmaps",
      href: "/roadmap",
      icon: <IconMap size={20} className="text-primary" />
    },
    {
      title: "Resume & ATS Optimization",
      description: "Upload resumes, extract technical skills, match target role keywords, and improve bullet points.",
      category: "Assessment",
      href: "/resume-analyzer",
      icon: <IconFileText size={20} className="text-primary" />
    },
    {
      title: "Target Role Skill Gap Analyzer",
      description: "Compare college coursework and self-reported competencies against verifiable industry hiring benchmarks.",
      category: "Audit",
      href: "/skill-gap-analyzer",
      icon: <IconBarChart size={20} className="text-primary" />
    },
    {
      title: "AI Career Navigator",
      description: "Predictive role suitability model analyzing academic coursework and interests to recommend optimal career tracks.",
      category: "Advisory",
      href: "/career-navigator",
      icon: <IconCompass size={20} className="text-primary" />
    },
    {
      title: "Interactive Interview Studio",
      description: "Practice technical coding, system design, and behavioral questions with speech dictation and real-time rubric scoring.",
      category: "Preparation",
      href: "/interview-prep",
      icon: <IconMic size={20} className="text-primary" />
    },
    {
      title: "Project Blueprints & Portfolio",
      description: "Architecture blueprints for Java banking microservices and Python RAG engines with GitHub README checklists.",
      category: "Engineering",
      href: "/projects",
      icon: <IconFolderKanban size={20} className="text-primary" />
    },
    {
      title: "Academic Attendance Planner",
      description: "Subject-wise attendance tracking with 75% exam cutoff safety calculators and class eligibility forecasts.",
      category: "College",
      href: "/attendance",
      icon: <IconGraduationCap size={20} className="text-primary" />
    },
    {
      title: "Weekly Study & Milestone Planner",
      description: "Focus Pomodoro sprint timer, weekly study goals linked to roadmaps, and streak tracking.",
      category: "Productivity",
      href: "/planner",
      icon: <IconCalendar size={20} className="text-primary" />
    },
    {
      title: "Certification & Evidence Vault",
      description: "Official credential storage coupled with our unique Skill-to-Project Evidence Map verifying practical code proof.",
      category: "Validation",
      href: "/certifications",
      icon: <IconAward size={20} className="text-primary" />
    },
    {
      title: "Placement Tracker & Playbooks",
      description: "Company-specific interview playbooks for Amazon, Goldman Sachs, and TCS Digital alongside an application pipeline.",
      category: "Careers",
      href: "/opportunities",
      icon: <IconBriefcase size={20} className="text-primary" />
    },
    {
      title: "Student Profile Manager",
      description: "Centralized record keeping for academic CGPA, backlogs, projects, GitHub and LeetCode links, and technical skills.",
      category: "Profile",
      href: "/profile",
      icon: <IconUser size={20} className="text-primary" />
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.6rem' }}>Platform Directory</span>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
          SkillNova AI Platform Suite
        </h1>
        <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.6 }}>
          A unified collection of 12 production modules engineered specifically for engineering students, fresh graduates, and campus placement candidates.
        </p>
      </div>

      <div className="grid-3">
        {tools.map((t, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '6px', backgroundColor: 'var(--highlight-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {t.icon}
                </div>
                <span className="badge badge-neutral">{t.category}</span>
              </div>
              <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>{t.title}</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {t.description}
              </p>
            </div>

            <Link href={t.href} className="btn-secondary btn-sm" style={{ textAlign: 'center', justifyContent: 'center' }}>
              Launch Tool
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
