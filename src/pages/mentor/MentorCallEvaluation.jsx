import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PhoneCall, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowLeft, 
  Star,
  AlertCircle
} from 'lucide-react';

export default function MentorCallEvaluation({ setCurrentView }) {
  const { currentUser, subjects, users, progress, submitMentorEvaluation } = useApp();

  const assignedSubject = subjects[0]; // Python Foundations
  const student = users.find(u => u.id === 'usr_student_1'); // Alex Rivera

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  
  const [satisfied, setSatisfied] = useState(true);
  const [rating, setRating] = useState(5);
  const [remarks, setRemarks] = useState('Alex showed deep practical comprehension of Python data structures, memory allocation, and handled dynamic OOP questions with clarity.');
  const [weakTopics, setWeakTopics] = useState([]);
  const [evaluationSubmitted, setEvaluationSubmitted] = useState(false);

  const studentProgress = progress[student?.id]?.[assignedSubject?.id];
  const existingCert = studentProgress?.certification;

  const handleTopicToggle = (topicTitle) => {
    if (weakTopics.includes(topicTitle)) {
      setWeakTopics(weakTopics.filter(t => t !== topicTitle));
    } else {
      setWeakTopics([...weakTopics, topicTitle]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMentorEvaluation(student.id, assignedSubject.id, {
      satisfied,
      remarks,
      rating,
      weakTopics: satisfied ? [] : weakTopics
    });
    setEvaluationSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#065F46',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              FINAL ORAL VIVA DEFENSE GATEWAY
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              1-on-1 Mentor Video Call & Certification Evaluation
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-body)' }}>
              Evaluate student knowledge face-to-face before certifying. Approve to generate certificate or flag weak topics.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('mentor_dashboard')}
            className="btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Mentor Hub</span>
          </button>
        </div>

        {/* Video Call Grid (2 Mock Camera Feeds) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '28px'
        }}>
          {/* Mentor Feed */}
          <div style={{
            backgroundColor: '#1E293B',
            borderRadius: '20px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600
              }}>
                Dr. Sarah Jenkins (Faculty)
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: '11px',
                fontWeight: 700
              }}>
                <span className="dot-indicator" /> Live
              </span>
            </div>

            {/* Simulated Avatar / Camera */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#047857',
                color: '#FFFFFF',
                fontSize: '28px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #10B981',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
              }}>
                SJ
              </div>
              <div style={{ color: '#E2E8F0', fontSize: '13px', marginTop: '8px', fontWeight: 600 }}>
                Video Feed Active • 1080p WebRTC
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setMicOn(!micOn)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: micOn ? '#334155' : '#EF4444',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
              <button
                onClick={() => setVideoOn(!videoOn)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: videoOn ? '#334155' : '#EF4444',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>
            </div>
          </div>

          {/* Student Feed */}
          <div style={{
            backgroundColor: '#1E293B',
            borderRadius: '20px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600
              }}>
                {student?.name} (Examinee)
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: '#EFF6FF',
                color: '#1E40AF',
                fontSize: '11px',
                fontWeight: 700
              }}>
                <span className="dot-indicator" style={{ backgroundColor: '#3B82F6' }} /> Defending
              </span>
            </div>

            {/* Simulated Avatar / Camera */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#1D4ED8',
                color: '#FFFFFF',
                fontSize: '28px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #60A5FA',
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)'
              }}>
                AR
              </div>
              <div style={{ color: '#E2E8F0', fontSize: '13px', marginTop: '8px', fontWeight: 600 }}>
                {assignedSubject?.title}
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '12px', color: '#94A3B8' }}>
              Connected via Secure Viva Protocol
            </div>
          </div>
        </div>

        {/* Evaluation Remarks Panel */}
        <div className="card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827' }}>
                Oral Viva Evaluation & Official Remarks
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                Your determination directly governs whether a verified certificate is generated.
              </p>
            </div>

            {existingCert && (
              <span style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                backgroundColor: existingCert.status === 'approved' ? '#ECFDF5' : '#FFFBEB',
                color: existingCert.status === 'approved' ? '#065F46' : '#92400E',
                border: existingCert.status === 'approved' ? '1px solid #A7F3D0' : '1px solid #FDE68A'
              }}>
                Current Status: {existingCert.status.toUpperCase()} ({existingCert.certId})
              </span>
            )}
          </div>

          {evaluationSubmitted && (
            <div style={{
              backgroundColor: satisfied ? '#ECFDF5' : '#FFFBEB',
              border: satisfied ? '1px solid #A7F3D0' : '1px solid #FDE68A',
              color: satisfied ? '#065F46' : '#92400E',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              {satisfied ? <CheckCircle2 size={22} color="#059669" /> : <AlertCircle size={22} color="#D97706" />}
              <div>
                <strong>Evaluation Recorded & Dispatched to Audit Log:</strong>{' '}
                {satisfied 
                  ? 'Student passed defense. Verified Certificate unlocked and generated!'
                  : 'Student not yet satisfied. Weak topics logged for revision.'}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Satisfaction Decision Switch */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                Mentor Satisfaction Decision:
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: satisfied ? '2px solid #10B981' : '1px solid #E5E7EB',
                  backgroundColor: satisfied ? '#ECFDF5' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="satisfied"
                    checked={satisfied === true}
                    onChange={() => setSatisfied(true)}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#065F46' }}>✓ APPROVED — Good Course Knowledge</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>Unlocks instant verified Certificate generation.</div>
                  </div>
                </label>

                <label style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: !satisfied ? '2px solid #EF4444' : '1px solid #E5E7EB',
                  backgroundColor: !satisfied ? '#FEF2F2' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="satisfied"
                    checked={satisfied === false}
                    onChange={() => setSatisfied(false)}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#991B1B' }}>✕ NOT SATISFIED — Requires Revision</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>Lists weak topics student must revise and retry.</div>
                  </div>
                </label>
              </div>
            </div>

            {/* If NOT satisfied, list weak topics */}
            {!satisfied && (
              <div style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '14px',
                padding: '18px'
              }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#991B1B', marginBottom: '10px' }}>
                  Select Specific Weak Topics to Send for Student Revision:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {assignedSubject.topics.map(t => (
                    <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={weakTopics.includes(t.title)}
                        onChange={() => handleTopicToggle(t.title)}
                      />
                      <span>{t.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Rating Stars */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Knowledge Defense Rating:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: rating >= star ? '#FEF3C7' : '#F3F4F6',
                      color: rating >= star ? '#D97706' : '#9CA3AF'
                    }}
                  >
                    <Star size={20} fill={rating >= star ? '#D97706' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Remarks Textarea */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Detailed Evaluation Remarks (Printed on Student Feedback & Audit Log):
              </label>
              <textarea
                rows={4}
                required
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter feedback on student technical performance..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D1D5DB',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '14px 24px',
                fontSize: '15px',
                justifyContent: 'center',
                backgroundColor: satisfied ? 'var(--primary)' : '#DC2626',
                color: satisfied ? '#111827' : '#FFFFFF'
              }}
            >
              <span>{satisfied ? 'Sign & Approve for Verified Certificate' : 'Log Weak Topics & Request Revision'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
