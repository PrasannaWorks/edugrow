import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Zap, 
  PlayCircle,
  FileCheck,
  AlertTriangle
} from 'lucide-react';

export default function StudentDashboard({ setCurrentView, setSelectedTopic }) {
  const { currentUser, subjects, progress } = useApp();

  const enrolledSubj = subjects[0]; // Python Foundations
  const studentProg = progress[currentUser?.id]?.[enrolledSubj?.id] || {
    completedTopicIds: [],
    badges: [],
    currentTopicId: enrolledSubj?.topics[0]?.id
  };

  const completedCount = studentProg.completedTopicIds.length;
  const totalTopics = enrolledSubj?.topics.length || 4;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  const certData = studentProg.certification;

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Welcome Bar with HIT Foundation style */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '24px',
          padding: '28px 32px',
          marginBottom: '32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              color: '#1E40AF',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px'
            }}>
              STUDENT ACTIVE LEARNING HUB
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              Welcome back, {currentUser?.name}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-body)' }}>
              Complete topics in sequential order, earn required badges, and schedule your final 1-on-1 mentor viva.
            </p>
          </div>

          {/* Fast-Track Status Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '14px',
            backgroundColor: currentUser?.fastTrack ? '#FEF08A' : '#F3F4F6',
            border: currentUser?.fastTrack ? '1px solid #FACC15' : '1px solid #E5E7EB'
          }}>
            <Zap size={18} color={currentUser?.fastTrack ? '#CA8A04' : '#6B7280'} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: currentUser?.fastTrack ? '#854D0E' : '#374151' }}>
                {currentUser?.fastTrack ? 'FAST-TRACK ACTIVE' : 'STANDARD PROGRESSION'}
              </div>
              <div style={{ fontSize: '11px', color: currentUser?.fastTrack ? '#713F12' : '#9CA3AF' }}>
                {currentUser?.fastTrack ? 'Video skip authorized by Admin' : 'Full video watch required before quiz'}
              </div>
            </div>
          </div>
        </div>

        {/* Current Course Hero Widget (Direct replication of Screenshot 1 & 5 style) */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB',
          padding: '28px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              CURRENT ENROLLED SUBJECT
            </span>
            <span style={{
              fontSize: '13px',
              fontWeight: 800,
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>
              {progressPercent}% Complete
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
            {enrolledSubj?.title}
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>
            Faculty Mentor: <strong>{enrolledSubj?.mentorName}</strong> • {enrolledSubj?.duration} Track
          </p>

          {/* Yellow Amber Progress Bar */}
          <div style={{ width: '100%', height: '10px', backgroundColor: '#F3F4F6', borderRadius: '9999px', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '9999px', transition: 'width 0.4s ease' }} />
          </div>

          {/* 4 Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
            <div style={{ padding: '14px', backgroundColor: '#FAFAFA', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>TOPICS CLEARED</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>{completedCount} of {totalTopics}</div>
            </div>
            <div style={{ padding: '14px', backgroundColor: '#FAFAFA', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>BADGES WON</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#D97706' }}>{studentProg.badges.length} Badges</div>
            </div>
            <div style={{ padding: '14px', backgroundColor: '#FAFAFA', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>TIME INVESTED</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>{currentUser?.totalHoursSpent || 0} hrs</div>
            </div>
            <div style={{ padding: '14px', backgroundColor: '#FAFAFA', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>FINAL STEP</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#059669' }}>
                {certData?.status === 'approved' ? 'Certified 🏆' : '1-on-1 Mentor Viva'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setCurrentView('student_study')}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '14px' }}
            >
              <PlayCircle size={18} />
              <span>Continue Studying (Topic Classroom)</span>
            </button>

            <button
              onClick={() => setCurrentView('student_certification')}
              className="btn-secondary"
              style={{ padding: '12px 20px', fontSize: '14px' }}
            >
              <FileCheck size={18} />
              <span>1-on-1 Call & Certificate Portal</span>
            </button>
          </div>
        </div>

        {/* Sequential Topic Roadmap (Locked vs Unlocked) */}
        <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
            Sequential Topic Progression (Lock Enforced)
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>
            Each topic must be fully completed and its quiz passed to earn a badge. The next topic unlocks ONLY when the previous badge is earned.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {enrolledSubj?.topics.map((topic, index) => {
              const isCompleted = studentProg.completedTopicIds.includes(topic.id);
              // First topic is unlocked, subsequent topics require previous to be completed
              const isUnlocked = index === 0 || studentProg.completedTopicIds.includes(enrolledSubj.topics[index - 1].id);

              return (
                <div
                  key={topic.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 24px',
                    borderRadius: '16px',
                    backgroundColor: isCompleted ? '#ECFDF5' : isUnlocked ? '#FFFFFF' : '#F9FAFB',
                    border: isCompleted ? '1px solid #A7F3D0' : isUnlocked ? '1px solid #F59E0B' : '1px solid #E5E7EB',
                    opacity: isUnlocked ? 1 : 0.65
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: isCompleted ? '#D1FAE5' : isUnlocked ? 'var(--primary-cream)' : '#E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCompleted ? '#059669' : isUnlocked ? '#D97706' : '#9CA3AF'
                    }}>
                      {isCompleted ? <CheckCircle2 size={22} /> : isUnlocked ? <BookOpen size={22} /> : <Lock size={20} />}
                    </div>

                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: isCompleted ? '#059669' : isUnlocked ? '#D97706' : '#9CA3AF' }}>
                        TOPIC 0{index + 1} • {topic.videoDuration} Video
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>
                        {topic.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>
                        {topic.materials.length} resources available • Topic Quiz ({topic.quiz.passingPercentage}% to pass)
                      </div>
                    </div>
                  </div>

                  <div>
                    {isCompleted ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        fontSize: '12px',
                        fontWeight: 700
                      }}>
                        <Award size={15} /> Badge Won
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => setCurrentView('student_study')}
                        className="btn-primary"
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                      >
                        <span>Start Topic</span>
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        backgroundColor: '#F3F4F6',
                        color: '#9CA3AF',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>
                        <Lock size={14} /> Locked (Clear Topic 0{index} first)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Won Gallery */}
        <div className="card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
            Earned Topic Badges Showcase
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
            Each badge proves verifiable mastery of that topic's assessment.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {studentProg.badges.map((badge, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--primary-cream)',
                  border: '1px solid var(--primary-light)',
                  borderRadius: '16px',
                  padding: '18px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D97706',
                  boxShadow: '0 4px 10px rgba(245, 158, 11, 0.2)'
                }}>
                  <Award size={24} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>
                  {badge.title}
                </div>
                <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 700 }}>
                  Score: {badge.score}
                </div>
                <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px' }}>
                  Earned: {badge.earnedAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
