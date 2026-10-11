// D:\SkillNova\tempapp\src\lib\dataStore.ts
// Centralized state, types, and persistence layer for SkillNova AI

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  contribution: string;
  status: 'In Progress' | 'Completed' | 'Planned';
  skillsDemonstrated: string[];
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Databases' | 'Tools' | 'DSA' | 'AI/ML' | 'Cloud';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  verifiedVia: string; // e.g. "Project: Student Tracker", "Coursework", "Self-Assessed"
}

export interface StudentProfile {
  // Academic
  fullName: string;
  collegeName: string;
  rollNumber: string;
  degreeBranch: string;
  graduationYear: number;
  currentSemester: number;
  cgpa: number;
  activeBacklogs: boolean;
  attendancePercentage: number;
  relevantCoursework: string[];
  academicAchievements: string[];

  // Technical
  skills: SkillItem[];
  skillsLearning: string[];

  // Career Preferences
  primaryTargetRole: string;
  secondaryTargetRoles: string[];
  preferredCompanies: string[];
  desiredType: 'Internship' | 'Full-Time' | 'Both';
  preferredLocation: string;
  careerGoals: string;
  timelineMonths: number;

  // Social & Professional Profiles
  linkedInUrl: string;
  githubUrl: string;
  leetCodeUrl: string;
  codeChefUrl: string;
  portfolioUrl: string;

  // Projects
  projects: ProjectItem[];
}

export interface WeeklyGoal {
  id: string;
  title: string;
  category: 'DSA' | 'FullStack' | 'AI' | 'College';
  completed: boolean;
  dueDate: string;
}

export interface InterviewAttempt {
  id: string;
  role: string;
  topic: string;
  question: string;
  userAnswer: string;
  score: number; // 0-100
  feedback: string;
  modelAnswer: string;
  date: string;
}

export interface AttendanceSubject {
  id: string;
  subject: string;
  attended: number;
  total: number;
}

export interface ApplicationItem {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  status: 'Draft' | 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';
  notes: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  skillsCovered: string[];
  status: 'Completed' | 'In Progress';
}

// Initial Demo Profile for Bhuvana Akula
export const initialStudentProfile: StudentProfile = {
  fullName: "Bhuvana Akula",
  collegeName: "Vishnu Institute of Technology",
  rollNumber: "24PA1A1205",
  degreeBranch: "B.Tech - Artificial Intelligence & Data Science",
  graduationYear: 2028,
  currentSemester: 4,
  cgpa: 9.09,
  activeBacklogs: false,
  attendancePercentage: 90,
  relevantCoursework: [
    "Object-Oriented Programming with Java",
    "Data Structures & Algorithms",
    "Database Management Systems (SQL)",
    "Operating Systems & Computer Networks",
    "Linear Algebra & Applied Probability",
    "Foundations of Machine Learning"
  ],
  academicAchievements: [
    "Department Academic Excellence Merit (Top 5%)",
    "Smart India Hackathon College Level Qualifier",
    "Certified in Java Core & Object-Oriented Principles"
  ],
  skills: [
    { name: "Java", category: "Languages", level: "Advanced", verifiedVia: "Coursework & Banking API" },
    { name: "Python", category: "Languages", level: "Intermediate", verifiedVia: "ML Mini-Project" },
    { name: "JavaScript/TypeScript", category: "Languages", level: "Intermediate", verifiedVia: "Web Portfolio" },
    { name: "Spring Boot", category: "Frameworks", level: "Intermediate", verifiedVia: "REST API Project" },
    { name: "React", category: "Frameworks", level: "Intermediate", verifiedVia: "Frontend Apps" },
    { name: "PostgreSQL / MySQL", category: "Databases", level: "Intermediate", verifiedVia: "DBMS Lab" },
    { name: "Git & GitHub", category: "Tools", level: "Advanced", verifiedVia: "Daily Commits" },
    { name: "Binary Trees & Graphs", category: "DSA", level: "Intermediate", verifiedVia: "LeetCode 140+ solved" },
    { name: "Scikit-Learn & PyTorch Basics", category: "AI/ML", level: "Beginner", verifiedVia: "College Lab" },
    { name: "Docker Basics", category: "Cloud", level: "Beginner", verifiedVia: "Self-Learning" }
  ],
  skillsLearning: [
    "System Design & Microservices",
    "Spring Security with JWT",
    "LangChain & Vector Databases (Pinecone/Chroma)",
    "Dynamic Programming Mastery"
  ],
  primaryTargetRole: "Java Full Stack Developer",
  secondaryTargetRoles: ["AI Engineer", "Software Development Engineer (SDE-1)"],
  preferredCompanies: ["Amazon", "TCS Digital", "Accenture", "Microsoft", "Goldman Sachs"],
  desiredType: "Both",
  preferredLocation: "Hyderabad / Bengaluru / Remote",
  careerGoals: "Aspiring to crack Tier-1 product-based SDE internships by 2027 and build scalable enterprise AI-integrated web applications.",
  timelineMonths: 12,
  linkedInUrl: "https://linkedin.com/in/bhuvana-akula-demo",
  githubUrl: "https://github.com/bhuvana-akula-demo",
  leetCodeUrl: "https://leetcode.com/u/bhuvana_akula",
  codeChefUrl: "https://codechef.com/users/bhuvana_24",
  portfolioUrl: "https://bhuvana-portfolio.vercel.app",
  projects: [
    {
      id: "proj-1",
      name: "Secure Online Banking REST API",
      description: "Robust banking microservice backend built with Spring Boot, Spring Security, JWT authentication, and PostgreSQL. Features transaction idempotency and audit logs.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Docker"],
      githubUrl: "https://github.com/bhuvana-akula-demo/secure-banking-api",
      liveUrl: "https://secure-banking-api-demo.onrender.com",
      contribution: "Designed database schema, implemented ACID-compliant transfer endpoints, and integrated JWT authentication.",
      status: "Completed",
      skillsDemonstrated: ["Java", "Spring Boot", "SQL", "Security", "RESTful APIs"]
    },
    {
      id: "proj-2",
      name: "Student Skill and Career Intelligence Hub",
      description: "Interactive AI-powered dashboard allowing students to audit curriculum vs industry job descriptions, featuring dynamic roadmaps and interview simulations.",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind/CSS", "Python API"],
      githubUrl: "https://github.com/bhuvana-akula-demo/skillnova-career-hub",
      liveUrl: "https://skillnova.dev",
      contribution: "Built UI component library, state persistence layer, and algorithm matching logic.",
      status: "In Progress",
      skillsDemonstrated: ["React", "TypeScript", "UI/UX", "State Management"]
    },
    {
      id: "proj-3",
      name: "RAG-Based AI Course Notes Q&A Engine",
      description: "Document question-answering assistant using LangChain, sentence-transformers embeddings, and ChromaDB vector search to query academic textbooks.",
      technologies: ["Python", "FastAPI", "ChromaDB", "LangChain", "OpenAI"],
      githubUrl: "https://github.com/bhuvana-akula-demo/academic-rag-assistant",
      liveUrl: "",
      contribution: "Vectorized 12 lecture PDF modules, implemented chunking and semantic similarity search.",
      status: "In Progress",
      skillsDemonstrated: ["Python", "Vector Databases", "Embeddings", "RAG"]
    }
  ]
};

export const initialWeeklyGoals: WeeklyGoal[] = [
  { id: "goal-1", title: "Solve 15 LeetCode Binary Search & Tree Problems", category: "DSA", completed: true, dueDate: "2026-10-12" },
  { id: "goal-2", title: "Complete Spring Boot JWT Refresh-Token Flow", category: "FullStack", completed: true, dueDate: "2026-10-14" },
  { id: "goal-3", title: "Fine-tune RAG Chunking Strategy for Semester Notes", category: "AI", completed: false, dueDate: "2026-10-16" },
  { id: "goal-4", title: "Prepare Unit Test Cases for DBMS Mini-Project", category: "College", completed: false, dueDate: "2026-10-18" },
  { id: "goal-5", title: "Practice 2 Mock Behavioral Interviews on SkillNova Studio", category: "College", completed: false, dueDate: "2026-10-19" }
];

export const initialAttendanceSubjects: AttendanceSubject[] = [
  { id: "sub-1", subject: "Java & Object Oriented Design", attended: 38, total: 40 },
  { id: "sub-2", subject: "Data Structures & Algorithms", attended: 42, total: 45 },
  { id: "sub-3", subject: "Database Management Systems", attended: 34, total: 38 },
  { id: "sub-4", subject: "Operating Systems", attended: 31, total: 35 },
  { id: "sub-5", subject: "Machine Learning Fundamentals", attended: 27, total: 30 },
  { id: "sub-6", subject: "Soft Skills & Corporate Readiness", attended: 19, total: 20 }
];

export const initialCertifications: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle University",
    issueDate: "2025-11-15",
    credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=1205JAVA",
    skillsCovered: ["Java 17", "Streams", "Concurrency", "OOP"],
    status: "Completed"
  },
  {
    id: "cert-2",
    title: "DeepLearning.AI Machine Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    issueDate: "2026-03-20",
    credentialUrl: "https://coursera.org/verify/specialization/DEMOAI909",
    skillsCovered: ["Supervised ML", "Logistic Regression", "Neural Networks"],
    status: "Completed"
  },
  {
    id: "cert-3",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services",
    issueDate: "2026-12-01 (Planned)",
    credentialUrl: "",
    skillsCovered: ["Cloud Concepts", "Security", "S3", "EC2", "IAM"],
    status: "In Progress"
  }
];

export const initialApplications: ApplicationItem[] = [
  {
    id: "app-1",
    company: "Amazon",
    role: "SDE Intern (Summer 2027)",
    appliedDate: "2026-09-15",
    status: "Interviewing",
    notes: "Passed Online Assessment 1 (DSA). OA2 Work Simulation pending."
  },
  {
    id: "app-2",
    company: "Goldman Sachs",
    role: "Engineering Campus Analyst",
    appliedDate: "2026-08-28",
    status: "Applied",
    notes: "Resume screened and shortlisted for HackerRank technical challenge."
  },
  {
    id: "app-3",
    company: "TCS Digital",
    role: "Digital Cadre SDE",
    appliedDate: "2026-09-02",
    status: "Offered",
    notes: "Received pre-placement offer via national coding contest."
  }
];

// Helper calculations with transparent, explainable criteria
export function calculateCareerReadiness(profile: StudentProfile): {
  score: number;
  breakdown: { label: string; score: number; max: number; explanation: string }[];
} {
  // 1. Academic Strength (Max 20)
  const academicScore = Math.min(20, Math.round((profile.cgpa / 10) * 15 + (profile.activeBacklogs ? 0 : 5)));
  
  // 2. Core Technical Skills (Max 30)
  const verifiedCount = profile.skills.filter(s => s.level !== 'Beginner').length;
  const techScore = Math.min(30, verifiedCount * 4 + profile.skills.length * 1);

  // 3. Project & Portfolio Quality (Max 25)
  const completedProjects = profile.projects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = profile.projects.filter(p => p.status === 'In Progress').length;
  const codeLinks = profile.projects.filter(p => p.githubUrl && p.githubUrl.length > 5).length;
  const projectScore = Math.min(25, completedProjects * 9 + inProgressProjects * 4 + codeLinks * 3);

  // 4. Industry & Coding Presence (Max 15)
  let presenceScore = 0;
  if (profile.githubUrl) presenceScore += 5;
  if (profile.leetCodeUrl) presenceScore += 5;
  if (profile.linkedInUrl) presenceScore += 5;

  // 5. Verification & Certifications (Max 10)
  const certScore = 8; // base from verified coursework and certifications

  const total = academicScore + techScore + projectScore + presenceScore + certScore;

  return {
    score: Math.min(100, total),
    breakdown: [
      {
        label: "Academic Foundation",
        score: academicScore,
        max: 20,
        explanation: `Based on CGPA ${profile.cgpa}/10 and ${profile.activeBacklogs ? 'active backlogs' : 'zero backlogs'}.`
      },
      {
        label: "Technical Competencies",
        score: techScore,
        max: 30,
        explanation: `${verifiedCount} intermediate/advanced skills demonstrated out of ${profile.skills.length} tracked skills.`
      },
      {
        label: "Portfolio & Real Projects",
        score: projectScore,
        max: 25,
        explanation: `${completedProjects} completed projects and ${inProgressProjects} active builds with verifiable GitHub repositories.`
      },
      {
        label: "Coding Profiles & Social Presence",
        score: presenceScore,
        max: 15,
        explanation: "Verified presence on GitHub, LeetCode, and LinkedIn."
      },
      {
        label: "Certifications & Validation",
        score: certScore,
        max: 10,
        explanation: "Certified coursework and verified exam badges."
      }
    ]
  };
}

// Client Storage Getters & Setters
export function getSavedProfile(): StudentProfile {
  if (typeof window === 'undefined') return initialStudentProfile;
  const saved = localStorage.getItem('skillnova_student_profile');
  if (!saved) {
    localStorage.setItem('skillnova_student_profile', JSON.stringify(initialStudentProfile));
    return initialStudentProfile;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return initialStudentProfile;
  }
}

export function saveProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skillnova_student_profile', JSON.stringify(profile));
  window.dispatchEvent(new Event('skillnova_profile_updated'));
}

export function getSavedWeeklyGoals(): WeeklyGoal[] {
  if (typeof window === 'undefined') return initialWeeklyGoals;
  const saved = localStorage.getItem('skillnova_weekly_goals');
  if (!saved) {
    localStorage.setItem('skillnova_weekly_goals', JSON.stringify(initialWeeklyGoals));
    return initialWeeklyGoals;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return initialWeeklyGoals;
  }
}

export function saveWeeklyGoals(goals: WeeklyGoal[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skillnova_weekly_goals', JSON.stringify(goals));
  window.dispatchEvent(new Event('skillnova_goals_updated'));
}
