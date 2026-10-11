// D:\SkillNova\tempapp\src\app\api\resume-analyze/route.ts
import { NextResponse } from 'next/server';

interface ResumeAnalysisRequest {
  resumeText: string;
  targetRole: string;
  currentSkills?: string[];
}

export async function POST(request: Request) {
  try {
    const { resumeText, targetRole = 'Java Full Stack Developer' }: ResumeAnalysisRequest = await request.json();

    if (!resumeText || resumeText.trim().length < 40) {
      return NextResponse.json(
        { success: false, error: 'Resume text is too short to analyze. Please provide at least 40 characters.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // Check if live OpenAI API is configured
    if (apiKey && apiKey.startsWith('sk-') && !apiKey.includes('your-actual-api-key')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are a strict, senior technical recruiter and career coach analyzing a college student's resume for the target role: "${targetRole}". 
Return ONLY valid JSON matching this structure:
{
  "mode": "live-llm",
  "atsScore": number (0-100),
  "scoreCriteria": "detailed explanation of why this score was given",
  "extractedTechnicalSkills": string[],
  "extractedSoftSkills": string[],
  "matchingSkills": string[],
  "missingHighPrioritySkills": string[],
  "resumeStructureScore": number (0-100),
  "bulletImprovements": [
    { "original": string, "improved": string, "reason": string }
  ],
  "actionableRecommendations": string[]
}`
              },
              {
                role: 'user',
                content: `Here is the student's resume text:\n\n${resumeText.slice(0, 4000)}`
              }
            ],
            response_format: { type: 'json_object' }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          return NextResponse.json({
            success: true,
            provider: 'OpenAI GPT-4o-mini',
            mode: 'live-llm',
            analysis: parsed
          });
        }
      } catch (err) {
        console.warn('Live AI provider failed, falling back to rule-based engine:', err);
      }
    }

    // Transparent Rule-based Career Heuristic Engine
    // (Used when API key is not configured or offline)
    const lower = resumeText.toLowerCase();

    // Standard Industry Skill Dictionary
    const techDictionary = [
      'java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'sql', 'html', 'css',
      'spring boot', 'react', 'node.js', 'express', 'next.js', 'angular', 'django', 'fastapi',
      'postgresql', 'mysql', 'mongodb', 'redis', 'hibernate', 'jpa',
      'docker', 'kubernetes', 'aws', 'azure', 'git', 'github', 'linux', 'ci/cd',
      'rest', 'graphql', 'microservices', 'data structures', 'algorithms', 'oop',
      'machine learning', 'pytorch', 'tensorflow', 'langchain', 'rag', 'embeddings'
    ];

    const softDictionary = [
      'communication', 'teamwork', 'leadership', 'problem-solving', 'adaptability', 
      'critical thinking', 'time management', 'collaboration', 'analytical'
    ];

    const extractedTech: string[] = [];
    techDictionary.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(lower)) {
        extractedTech.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      }
    });

    const extractedSoft: string[] = [];
    softDictionary.forEach(skill => {
      const regex = new RegExp(`\\b${skill}\\b`, 'i');
      if (regex.test(lower)) {
        extractedSoft.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      }
    });

    // Target Role Benchmarks
    let expectedSkills: string[] = [];
    if (targetRole.toLowerCase().includes('java')) {
      expectedSkills = ['Java', 'Spring boot', 'Sql', 'Rest', 'Oop', 'Git', 'Data structures', 'Postgresql', 'Docker'];
    } else if (targetRole.toLowerCase().includes('ai')) {
      expectedSkills = ['Python', 'Machine learning', 'Pytorch', 'Sql', 'Langchain', 'Algorithms', 'Fastapi', 'Rag'];
    } else {
      expectedSkills = ['Javascript', 'React', 'Node.js', 'Sql', 'Git', 'Data structures', 'Rest'];
    }

    const matching = expectedSkills.filter(req => 
      extractedTech.some(t => t.toLowerCase() === req.toLowerCase())
    );

    const missing = expectedSkills.filter(req => 
      !extractedTech.some(t => t.toLowerCase() === req.toLowerCase())
    );

    // Scoring Breakdown
    const skillRatio = expectedSkills.length > 0 ? (matching.length / expectedSkills.length) : 0.5;
    const baseAts = Math.min(95, Math.max(35, Math.round(skillRatio * 60 + (extractedTech.length > 5 ? 20 : 10) + (lower.includes('project') ? 10 : 0))));
    
    // Bullet Improvement Suggestions based on real text fragments
    const sentences = resumeText.split(/\n|\./).map(s => s.trim()).filter(s => s.length > 25);
    const sampleSentence = sentences[0] || "Built a project using Java and Spring Boot for user management.";

    const bulletImprovements = [
      {
        original: sampleSentence,
        improved: `Architected and deployed ${targetRole.includes('Java') ? 'Spring Boot microservices' : 'Python AI pipelines'} handling 1,000+ test requests with sub-100ms latency and robust error logging.`,
        reason: "Transformed passive task description into active impact with quantifiable scale and engineering rigor."
      }
    ];

    const actionableRecs = [
      `Add explicit evidence for ${missing.slice(0, 3).join(', ')} which are crucial for ${targetRole} positions.`,
      "Quantify project achievements with metrics (e.g. latency, test coverage, throughput, or user count).",
      "Include direct links to GitHub repositories with well-structured READMEs and live deployment URLs."
    ];

    return NextResponse.json({
      success: true,
      provider: 'SkillNova Heuristic Career Engine (Offline / Local Rule-Based Mode)',
      mode: 'rule-based-engine',
      note: 'OPENAI_API_KEY is not configured in server environment. Evaluated via SkillNova Deterministic ATS Parser.',
      analysis: {
        atsScore: baseAts,
        scoreCriteria: `Score computed from ${matching.length}/${expectedSkills.length} required role keywords, presence of project markers, and technical density.`,
        extractedTechnicalSkills: extractedTech,
        extractedSoftSkills: extractedSoft,
        matchingSkills: matching,
        missingHighPrioritySkills: missing,
        resumeStructureScore: lower.includes('education') && lower.includes('project') ? 85 : 65,
        bulletImprovements,
        actionableRecommendations: actionableRecs
      }
    });

  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Failed to analyze resume: ${errorMsg}` },
      { status: 500 }
    );
  }
}
