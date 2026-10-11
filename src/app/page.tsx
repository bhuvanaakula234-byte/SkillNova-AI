import Link from "next/link";
import { 
  IconCompass, 
  IconBarChart, 
  IconMap, 
  IconFileText, 
  IconFolderKanban, 
  IconMic, 
  IconCheck, 
  IconArrowRight 
} from "@/components/Icons";

export default function Home() {
  const features = [
    {
      title: "Target Role Skill Gap Analyzer",
      description: "Compare your current coursework and projects against real-world job requirements to identify high-priority competencies.",
      icon: <IconBarChart size={22} className="text-primary" />,
      href: "/skill-gap-analyzer"
    },
    {
      title: "Canonical Learning Roadmaps",
      description: "Progress through structured 15-stage DSA milestones, Java Full Stack development, and AI Engineering tracks.",
      icon: <IconMap size={22} className="text-primary" />,
      href: "/roadmap"
    },
    {
      title: "Resume & ATS Optimization",
      description: "Audit resume text for role-specific keywords, formatting structure, and quantifiable project impact bullets.",
      icon: <IconFileText size={22} className="text-primary" />,
      href: "/resume-analyzer"
    },
    {
      title: "Interactive Interview Studio",
      description: "Practice technical and behavioral interview questions with structured evaluation rubrics and instant feedback.",
      icon: <IconMic size={22} className="text-primary" />,
      href: "/interview-prep"
    },
    {
      title: "Project Blueprints",
      description: "Access complete architectural specifications for real-world portfolio projects that demonstrate verified skills.",
      icon: <IconFolderKanban size={22} className="text-primary" />,
      href: "/projects"
    },
    {
      title: "Career Navigator",
      description: "Analyze your technical background to discover career paths tailored to your strengths and preparation timeline.",
      icon: <IconCompass size={22} className="text-primary" />,
      href: "/career-navigator"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Select Your Target Role",
      description: "Choose from software engineering tracks such as Java Full Stack Developer, AI Engineer, or SDE-1."
    },
    {
      step: "02",
      title: "Audit Gaps & Follow Canonical Roadmaps",
      description: "Identify missing competencies and follow verified milestones with step-by-step concepts and problem sets."
    },
    {
      step: "03",
      title: "Build Projects & Practice Interviews",
      description: "Demonstrate practical proof with portfolio blueprints and practice technical questions with rubric scoring."
    }
  ];

  const faqs = [
    {
      question: "What is SkillNova AI?",
      answer: "SkillNova AI is a career development platform for engineering students and graduates. It bridges academic coursework with industry requirements through explainable skill-gap analysis, stable roadmaps, and interview practice."
    },
    {
      question: "Are the learning roadmaps fixed or randomly generated?",
      answer: "Our Data Structures and Algorithms roadmap is canonical and stable. It contains 15 version-controlled stages that remain consistent across sessions so students can track genuine progress without random changes."
    },
    {
      question: "How does the Resume Analyzer evaluate my text?",
      answer: "The analyzer extracts technical and soft skills, compares them against required keywords for your chosen role, and suggests quantifiable bullet point improvements based on your actual experiences."
    },
    {
      question: "Can I use the platform without third-party AI keys?",
      answer: "Yes. SkillNova AI includes a built-in deterministic heuristic engine for career recommendations, resume scoring, and interview evaluations. When external API keys are configured, live language models can also be enabled."
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '5.5rem 1rem 4rem', maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--highlight-light)', color: 'var(--primary)', padding: '0.35rem 0.85rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <span>SkillNova AI</span>
          <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
          <span>Bridging Skills to Careers</span>
        </div>

        <h1 style={{ fontSize: '3rem', lineHeight: 1.15, marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
          Build the Skills Your Target Role Requires.
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '2.25rem' }}>
          Discover career paths, identify skill gaps, follow structured learning roadmaps, build portfolio projects, and practice role-specific interviews in one place.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/get-started" className="btn-primary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}>
            Build My Career Roadmap
          </Link>
          <Link href="/features" className="btn-secondary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}>
            Explore Features
          </Link>
        </div>
      </section>

      {/* Concise Visual Demonstration Preview */}
      <section style={{ marginBottom: '6rem' }}>
        <div className="card" style={{ padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform Architecture Preview</span>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', margin: '0.2rem 0 0' }}>Unified Student Career Preparation Workflow</h2>
            </div>
            <Link href="/dashboard" className="btn-secondary btn-sm">
              Open Live Dashboard Preview &rarr;
            </Link>
          </div>

          <div className="grid-3">
            <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>STAGE 1: AUDIT</div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>Skill Gap Comparison</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                Identify exactly which algorithms, database patterns, and framework topics stand between your current coursework and role benchmarks.
              </p>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>STAGE 2: PREPARE</div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>15-Stage DSA Roadmap</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                Master programming complexity, binary search patterns, dynamic programming, and graphs through curated, consistent problem sets.
              </p>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>STAGE 3: VERIFY</div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>Portfolio & Mock Studio</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                Build verified portfolio microservices and practice technical screening questions with rubric scoring before campus placement drives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
            Core Career Intelligence Tools
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Built specifically to address the technical requirements of modern software engineering hiring bars.
          </p>
        </div>

        <div className="grid-3">
          {features.map((item, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: 40, height: 40, borderRadius: '6px', backgroundColor: 'var(--highlight-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {item.description}
                </p>
              </div>

              <Link href={item.href} style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>Launch Tool</span>
                <IconArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ marginBottom: '6rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '3.5rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>How SkillNova AI Works</h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>A disciplined, three-step methodology to achieve role readiness.</p>
        </div>

        <div className="grid-3">
          {steps.map((s, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>
                {s.step}
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6 }}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ marginBottom: '6rem', maxWidth: '800px', margin: '0 auto 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>Clear answers about our methodology, roadmaps, and tools.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>{faq.question}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Public Call to Action */}
      <section style={{ textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '3.5rem 2rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
          Ready to Begin Your Career Preparation?
        </h2>
        <p style={{ color: 'var(--text-body)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Set up your academic profile, discover target role benchmarks, and begin your structured learning roadmap today.
        </p>
        <Link href="/get-started" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
          Build My Career Roadmap
        </Link>
      </section>
    </div>
  );
}
