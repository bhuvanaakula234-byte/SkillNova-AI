'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentLayout from '@/components/StudentLayout';
import { getSavedProfile, StudentProfile } from '@/lib/dataStore';

interface ProjectBlueprint {
  id: string;
  title: string;
  role: 'Java Full Stack' | 'AI Engineering';
  problem: string;
  whyItFits: string;
  difficulty: 'Intermediate' | 'Advanced';
  workload: string;
  technologies: string[];
  prerequisites: string[];
  architecture: string;
  databaseSchema: string;
  milestones: string[];
  testing: string;
  readmeChecklist: string[];
  interviewQuestions: string[];
}

const BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: "bp-java-1",
    title: "Secure Online Banking Microservice REST API",
    role: "Java Full Stack",
    problem: "Financial institutions require high-throughput, ACID-compliant ledger transactions with zero race conditions, idempotent transfer endpoints, and rigorous audit trails.",
    whyItFits: "Directly showcases enterprise Java, Spring Boot, Spring Security, database indexing, and transaction rollback mechanics expected by product companies.",
    difficulty: "Advanced",
    workload: "3-4 Weeks (40 Hours)",
    technologies: ["Java 17", "Spring Boot 3", "PostgreSQL", "Spring Security / JWT", "Docker", "JUnit 5"],
    prerequisites: ["OOP Principles", "SQL Constraints & Joins", "RESTful HTTP Verbs"],
    architecture: "Layered architecture: Controller -> Service (with @Transactional) -> Repository (Spring Data JPA) -> PostgreSQL. Stateless JWT authentication filter chain.",
    databaseSchema: "Users (id, email, password_hash), Accounts (id, user_id, balance, currency, version [Optimistic Locking]), Transactions (id, source_id, target_id, amount, status, timestamp).",
    milestones: [
      "Milestone 1: Scaffold Spring Boot 3 with PostgreSQL and Flyway migrations",
      "Milestone 2: Implement User registration and stateless JWT authentication with BCrypt",
      "Milestone 3: Build ACID money transfer service using @Transactional and optimistic locking",
      "Milestone 4: Write JUnit 5 unit tests and MockMvc integration tests for transfer race conditions",
      "Milestone 5: Containerize application with Dockerfile and write production README"
    ],
    testing: "Unit tests with Mockito for service layer; Integration tests with Testcontainers and PostgreSQL for transaction rollbacks.",
    readmeChecklist: [
      "Architecture diagram and sequence flow for money transfer",
      "Prerequisites and step-by-step local setup",
      "API documentation table with sample cURL commands",
      "Security audit explanation (JWT, rate limiting, sanitization)"
    ],
    interviewQuestions: [
      "How do you prevent money transfer race conditions when two users send funds concurrently?",
      "Why did you choose optimistic locking over pessimistic locking for account balances?",
      "What happens if an exception is thrown in a nested @Transactional method?"
    ]
  },
  {
    id: "bp-java-2",
    title: "Campus Placement & Internship Management Portal",
    role: "Java Full Stack",
    problem: "Colleges struggle to coordinate student eligibility, interview schedules, and company drives across hundreds of applicants in real-time.",
    whyItFits: "Demonstrates full-stack end-to-end integration: React frontend interacting with a Spring Boot backend, role-based access control, and filtering algorithms.",
    difficulty: "Intermediate",
    workload: "2-3 Weeks (30 Hours)",
    technologies: ["React 19", "TypeScript", "Spring Boot", "MySQL", "TailwindCSS"],
    prerequisites: ["React Hooks", "Spring MVC", "Relational Database Design"],
    architecture: "React SPA communicating over REST to Spring Boot API gateway. JWT tokens stored securely. Relational MySQL backend with pagination and complex query filtering.",
    databaseSchema: "Students (roll_number, cgpa, branch, resume_url), Drives (id, company_name, min_cgpa, eligible_branches, deadline), Applications (id, student_id, drive_id, status).",
    milestones: [
      "Milestone 1: Design database schema and foreign key constraints",
      "Milestone 2: Build Spring Boot CRUD endpoints with pagination and sorting",
      "Milestone 3: Develop React responsive dashboard with company filter cards",
      "Milestone 4: Implement Role-Based Access Control (Admin vs Candidate)",
      "Milestone 5: Deploy React on Vercel and Spring Boot on Render"
    ],
    testing: "Integration tests for student application submission and validation.",
    readmeChecklist: [
      "Screenshots of student dashboard and recruiter admin panel",
      "Detailed list of API endpoints and request/response payloads",
      "Live deployment URL link and demo test credentials"
    ],
    interviewQuestions: [
      "How did you implement server-side pagination for large student rosters?",
      "How is role authorization enforced at both the UI and API layer?"
    ]
  },
  {
    id: "bp-ai-1",
    title: "Retrieval-Augmented Generation (RAG) Academic Notes Assistant",
    role: "AI Engineering",
    problem: "Students waste hours manually skimming 200+ page textbook PDFs for specific conceptual explanations, often encountering hallucinated summaries from vanilla LLMs.",
    whyItFits: "Demonstrates modern Generative AI engineering: Document chunking, dense vector embeddings, hybrid search, and prompt grounding without fine-tuning overhead.",
    difficulty: "Advanced",
    workload: "3 Weeks (35 Hours)",
    technologies: ["Python 3.11", "FastAPI", "LangChain", "ChromaDB", "OpenAI / Hugging Face"],
    prerequisites: ["Python OOP", "Vector Math Fundamentals", "REST APIs"],
    architecture: "FastAPI server with PDF ingestion pipeline. Text chunks vectorized via embeddings and indexed into ChromaDB. Query pipeline performs cosine similarity and injects context into LLM prompt.",
    databaseSchema: "Vector Index Collections: chunks (id, document_title, page_number, chunk_text, vector_embedding [1536 dim]).",
    milestones: [
      "Milestone 1: Build robust PDF text parsing with chunk overlap handling",
      "Milestone 2: Integrate ChromaDB vector store and test semantic similarity retrieval",
      "Milestone 3: Construct grounded QA prompt template with source attribution",
      "Milestone 4: Build asynchronous FastAPI endpoint with streaming responses",
      "Milestone 5: Measure retrieval recall and latency across sample test queries"
    ],
    testing: "Automated retrieval evaluation assessing context relevance and faithfulness.",
    readmeChecklist: [
      "Visual diagram of Ingestion vs Retrieval flow",
      "Benchmark metrics showing retrieval accuracy with different chunk sizes",
      "Setup guide with Python requirements and API key configuration"
    ],
    interviewQuestions: [
      "How do you determine optimal chunk size and chunk overlap for technical texts?",
      "What is the difference between dense vector search and sparse keyword search?",
      "How do you evaluate and prevent LLM hallucinations in a RAG pipeline?"
    ]
  }
];

export default function ProjectsHubPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [roleFilter, setRoleFilter] = useState<'All' | 'Java Full Stack' | 'AI Engineering'>('All');
  const [activeBlueprint, setActiveBlueprint] = useState<ProjectBlueprint>(BLUEPRINTS[0]);

  useEffect(() => {
    setProfile(getSavedProfile());
  }, []);

  const filteredBlueprints = BLUEPRINTS.filter(b => {
    if (roleFilter === 'All') return true;
    return b.role === roleFilter;
  });

  return (
    <StudentLayout pageTitle="Project Studio">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
            Project Blueprints & Portfolio Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Complete architectural specifications engineered to demonstrate verified industry skills on your resume.
          </p>
        </div>

        {/* Section 1: Recommended Project Catalog */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)' }}>Recommended Project Blueprints</h2>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {(['All', 'Java Full Stack', 'AI Engineering'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setRoleFilter(tab)}
                  className={roleFilter === tab ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
            {filteredBlueprints.map(bp => {
              const isSelected = activeBlueprint.id === bp.id;
              return (
                <div
                  key={bp.id}
                  onClick={() => setActiveBlueprint(bp)}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border-light)',
                    backgroundColor: isSelected ? 'var(--highlight-light)' : '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="badge badge-primary">{bp.role}</span>
                    <span className="badge badge-neutral">{bp.difficulty}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>{bp.title}</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    {bp.problem.slice(0, 100)}...
                  </p>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                    {isSelected ? 'Currently Viewing Specification' : 'View Blueprint &rarr;'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Blueprint View */}
        <div className="card">
          <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-primary">{activeBlueprint.role}</span>
              <span className="badge badge-neutral">Estimated Workload: {activeBlueprint.workload}</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-heading)' }}>{activeBlueprint.title}</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.6 }}>
              {activeBlueprint.problem}
            </p>
          </div>

          <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>Why This Fits Your Target Role</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{activeBlueprint.whyItFits}</p>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>Required Technologies</div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                {activeBlueprint.technologies.map((t, idx) => (
                  <span key={idx} className="badge badge-neutral">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>Architecture Approach</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{activeBlueprint.architecture}</p>
            </div>

            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>Database Schema Design</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{activeBlueprint.databaseSchema}</p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>Implementation Milestones</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {activeBlueprint.milestones.map((m, idx) => (
                <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '0.6rem 0.85rem', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.85rem', color: 'var(--text-heading)' }}>
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div className="grid-2">
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>GitHub README Checklist</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {activeBlueprint.readmeChecklist.map((c, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--success)' }}>&bull;</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>Expected Technical Interview Questions</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {activeBlueprint.interviewQuestions.map((q, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary)' }}>&bull;</span> {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Student's Actual Recorded Projects */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)' }}>Your Active Portfolio Projects</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>Projects currently registered on your student profile.</p>
            </div>
            <Link href="/profile" className="btn-secondary btn-sm">
              Manage in Profile
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {profile?.projects.map(p => (
              <div key={p.id} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{p.name}</div>
                  <span className="badge badge-success">{p.status}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', margin: '0.4rem 0' }}>{p.description}</p>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {p.technologies.map((t, idx) => (
                    <span key={idx} className="badge badge-neutral">{t}</span>
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
