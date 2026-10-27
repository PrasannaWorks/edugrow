import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function StudentQuizView({ setCurrentView, selectedTopic }) {
  const { currentUser, subjects, recordQuizCompletion } = useApp();

  const enrolledSubj = subjects[0]; // Python Foundations
  const topic = selectedTopic || enrolledSubj.topics[1]; // Topic 2
  const quiz = topic.quiz;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null); // { scorePercent, passed, correctCount }

  const handleOptionSelect = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    if (Object.keys(selectedAnswers).length < quiz.questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePercent >= quiz.passingPercentage;

    setResult({ scorePercent, passed, correctCount });
    setSubmitted(true);

    recordQuizCompletion(currentUser.id, enrolledSubj.id, topic.id, scorePercent, passed);

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              TOPIC ASSESSMENT & BADGE UNLOCK
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>
              {quiz.title}
            </h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              Minimum passing criteria: <strong>{quiz.passingPercentage}%</strong>. Passing awards a verified topic badge and unlocks the subsequent topic.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('student_study')}
            className="btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <ArrowLeft size={16} />
            <span>Classroom</span>
          </button>
        </div>

        {/* Result Summary Banner */}
        {submitted && result && (
          <div style={{
            backgroundColor: result.passed ? '#ECFDF5' : '#FEF2F2',
            border: result.passed ? '2px solid #10B981' : '2px solid #EF4444',
            borderRadius: '20px',
            padding: '24px 28px',
            marginBottom: '28px',
            boxShadow: result.passed ? '0 10px 30px rgba(16, 185, 129, 0.15)' : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: result.passed ? '#D1FAE5' : '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: result.passed ? '#059669' : '#DC2626'
                }}>
                  {result.passed ? <Award size={30} /> : <XCircle size={30} />}
                </div>

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: result.passed ? '#065F46' : '#991B1B' }}>
                    {result.passed ? '🎉 Congratulations! Quiz Passed!' : 'Threshold Not Met'}
                  </h3>
                  <div style={{ fontSize: '13px', color: result.passed ? '#047857' : '#7F1D1D' }}>
                    You scored <strong>{result.scorePercent}%</strong> ({result.correctCount} of {quiz.questions.length} correct).
                    {result.passed ? ' Badge added to profile and next topic unlocked.' : ' Review topic materials and retry.'}
                  </div>
                </div>
              </div>

              <div>
                {result.passed ? (
                  <button
                    onClick={() => setCurrentView('student_dashboard')}
                    className="btn-primary"
                    style={{ padding: '12px 20px', fontSize: '14px' }}
                  >
                    <span>View Unlocked Topics</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleRetry}
                    className="btn-secondary"
                    style={{ padding: '10px 18px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <RotateCcw size={15} />
                    <span>Retry Quiz</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <form onSubmit={handleSubmitQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {quiz.questions.map((q, qIndex) => (
            <div key={q.id} className="card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#B45309', marginBottom: '8px' }}>
                QUESTION {qIndex + 1} OF {quiz.questions.length}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', marginBottom: '18px' }}>
                {q.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  const isCorrect = q.correct === optIdx;

                  let borderColor = '#E5E7EB';
                  let bgColor = '#FFFFFF';

                  if (submitted) {
                    if (isCorrect) {
                      borderColor = '#10B981';
                      bgColor = '#ECFDF5';
                    } else if (isSelected && !isCorrect) {
                      borderColor = '#EF4444';
                      bgColor = '#FEF2F2';
                    }
                  } else if (isSelected) {
                    borderColor = 'var(--primary)';
                    bgColor = 'var(--primary-cream)';
                  }

                  return (
                    <label
                      key={optIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: `2px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        cursor: submitted ? 'default' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        disabled={submitted}
                        checked={isSelected}
                        onChange={() => handleOptionSelect(q.id, optIdx)}
                      />
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#1F2937' }}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <div style={{
                  marginTop: '14px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: '#F9FAFB',
                  fontSize: '13px',
                  color: '#4B5563',
                  border: '1px solid #E5E7EB'
                }}>
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}

          {!submitted && (
            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '15px',
                justifyContent: 'center',
                marginTop: '12px'
              }}
            >
              <span>Submit Assessment for Badge Verification</span>
              <ArrowRight size={18} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
