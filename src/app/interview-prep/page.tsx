'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';

interface EvaluationReport {
  score: number;
  technicalCorrectness: string;
  completeness: string;
  approachAndComplexity: string;
  clarityAndCommunication: string;
  keyMissedPoints: string[];
  suggestedImprovement: string;
  modelAnswerOutline: string;
}

export default function InterviewPrepStudioPage() {
  const [role, setRole] = useState('Java Full Stack Developer');
  const [round, setRound] = useState('Technical Screen');
  const [difficulty, setDifficulty] = useState('Intermediate');
  
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationReport | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechAvailable(true);
    }

    const savedHistory = localStorage.getItem('skillnova_interview_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn('Failed to parse interview history', e);
      }
    }
  }, []);

  const startSession = async () => {
    setLoading(true);
    setEvaluation(null);
    setUserAnswer('');
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate', role })
      });
      const data = await res.json();
      if (data.success && data.question) {
        setCurrentQuestion(data.question);
        setSessionActive(true);
      }
    } catch (e) {
      console.warn('Error fetching question', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeechToggle = () => {
    if (!speechAvailable) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer(prev => prev + ' ' + transcript);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition notice', err);
      setIsListening(false);
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer.trim() || userAnswer.length < 15) {
      alert('Please provide a substantive answer (at least 15 characters) before submitting.');
      return;
    }

    setEvaluating(true);
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          question: currentQuestion?.question,
          answer: userAnswer
        })
      });

      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluation(data.evaluation);

        const attempt = {
          id: `attempt-${Date.now()}`,
          date: new Date().toLocaleDateString(),
          role,
          question: currentQuestion?.question,
          score: data.evaluation.score
        };

        const updatedHistory = [attempt, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('skillnova_interview_history', JSON.stringify(updatedHistory));
      }
    } catch (e) {
      console.warn('Evaluation notice', e);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <StudentLayout pageTitle="Interview Studio">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
            Technical & Behavioral Interview Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Simulate technical screening rounds with role-specific questions and structured rubric feedback.
          </p>
        </div>

        {/* Setup Card (Progressive disclosure: hidden once question is active) */}
        {!sessionActive && (
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Configure Practice Session
            </h2>

            <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Target Role</label>
                <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="Java Full Stack Developer">Java Full Stack Developer</option>
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="DSA & Problem Solving">DSA & Problem Solving</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Interview Round</label>
                <select className="form-control" value={round} onChange={e => setRound(e.target.value)}>
                  <option value="Technical Screen">Technical Screen</option>
                  <option value="System Design">System Design</option>
                  <option value="Behavioral">Behavioral</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Difficulty Tier</label>
                <select className="form-control" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                  <option value="Intermediate">Campus SDE (Intermediate)</option>
                  <option value="Junior">Junior Entry</option>
                  <option value="Advanced">Advanced Product Specialist</option>
                </select>
              </div>
            </div>

            <button onClick={startSession} disabled={loading} className="btn-primary">
              {loading ? 'Preparing Session...' : 'Start Interview Session'}
            </button>
          </div>
        )}

        {/* Active Practice Screen (One Question At A Time) */}
        {sessionActive && currentQuestion && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Question Card */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="badge badge-primary">{role}</span>
                  <span className="badge badge-neutral">{currentQuestion.round || round}</span>
                </div>
                <button 
                  onClick={() => setSessionActive(false)} 
                  className="btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  End Session
                </button>
              </div>

              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', lineHeight: 1.5, margin: '0.5rem 0 1rem' }}>
                &quot;{currentQuestion.question}&quot;
              </h2>

              {currentQuestion.keyExpectations && (
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Evaluation Expectations
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                    {currentQuestion.keyExpectations.map((exp: string, idx: number) => (
                      <li key={idx}>&bull; {exp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Answer Input Workspace */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)' }}>Your Technical Response</label>
                
                {speechAvailable && (
                  <button
                    onClick={handleSpeechToggle}
                    className="btn-secondary btn-sm"
                    style={{
                      color: isListening ? 'var(--danger)' : undefined,
                      borderColor: isListening ? 'var(--danger)' : undefined
                    }}
                  >
                    {isListening ? 'Stop Voice Recording' : 'Voice Input (Web Speech)'}
                  </button>
                )}
              </div>

              <textarea
                className="form-control"
                rows={9}
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="Type or dictate your technical answer here. Mention data structures, edge cases, and algorithmic complexity..."
                style={{ fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Word count: {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                </span>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={startSession} className="btn-secondary btn-sm">
                    Next Question
                  </button>
                  <button onClick={handleEvaluate} disabled={evaluating} className="btn-primary btn-sm">
                    {evaluating ? 'Evaluating...' : 'Submit for Rubric Evaluation'}
                  </button>
                </div>
              </div>
            </div>

            {/* Structured Evaluation Results */}
            {evaluation && (
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <span className="badge badge-success" style={{ marginBottom: '0.25rem' }}>Evaluation Scorecard</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)' }}>Rubric Feedback</h3>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {evaluation.score} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
                  </div>
                </div>

                <div className="grid-2" style={{ marginBottom: '1rem' }}>
                  <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success)' }}>Technical Correctness</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.2rem' }}>{evaluation.technicalCorrectness}</p>
                  </div>

                  <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>Approach & Complexity</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.2rem' }}>{evaluation.approachAndComplexity}</p>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--warning)', marginBottom: '0.35rem' }}>Key Points Missed</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                    {evaluation.keyMissedPoints.map((pt, idx) => (
                      <li key={idx}>&bull; {pt}</li>
                    ))}
                  </ul>
                </div>

                {currentQuestion.modelAnswer && (
                  <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>Suggested Model Answer Outline</div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-body)', whiteSpace: 'pre-line', lineHeight: 1.5, margin: 0 }}>
                      {currentQuestion.modelAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Saved Session History */}
        {!sessionActive && history.length > 0 && (
          <div className="card">
            <h2 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>Recent Practice Attempts</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {history.slice(0, 4).map(att => (
                <div key={att.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-heading)' }}>{att.question.slice(0, 65)}...</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{att.role} &bull; {att.date}</div>
                  </div>
                  <span className="badge badge-neutral" style={{ fontWeight: 700 }}>{att.score} / 100</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </StudentLayout>
  );
}
