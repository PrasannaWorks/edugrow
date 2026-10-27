import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Pause, 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  Award,
  Lock
} from 'lucide-react';

export default function StudentTopicView({ setCurrentView, setSelectedQuizTopic }) {
  const { currentUser, subjects, progress, logActivity } = useApp();

  const enrolledSubj = subjects[0]; // Python Foundations
  const studentProg = progress[currentUser?.id]?.[enrolledSubj?.id];

  // Pick current unlocked topic (e.g. Topic 2: Control Flow & Conditionals)
  const currentTopic = enrolledSubj?.topics[1] || enrolledSubj?.topics[0];

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastTrackedTime, setLastTrackedTime] = useState(0);
  const [skipAlert, setSkipAlert] = useState(null);
  const [videoCompleted, setVideoCompleted] = useState(false);

  const isFastTrack = currentUser?.fastTrack;

  const handlePlay = () => {
    setIsPlaying(true);
    logActivity({
      subject: enrolledSubj.title,
      actionType: 'video_play',
      details: `Student started watching "${currentTopic.title}" video.`
    });
  };

  const handlePause = () => {
    setIsPlaying(false);
    logActivity({
      subject: enrolledSubj.title,
      actionType: 'video_pause',
      details: `Student paused "${currentTopic.title}" video at timestamp ${Math.round(videoRef.current?.currentTime || 0)}s.`
    });
  };

  // Anti-skip enforcement
  const handleSeeking = () => {
    if (isFastTrack) return; // Fast-track permitted

    const currentTime = videoRef.current?.currentTime || 0;
    // If attempting to jump forward beyond watched threshold
    if (currentTime > lastTrackedTime + 3) {
      videoRef.current.currentTime = lastTrackedTime; // Snap back!
      const alertMsg = `⚠️ Video scrubbing is blocked! Anti-skip tracking is active. You must watch sequentially. Attempt (+${Math.round(currentTime - lastTrackedTime)}s) logged.`;
      setSkipAlert(alertMsg);

      logActivity({
        subject: enrolledSubj.title,
        actionType: 'video_skip_attempt',
        details: `⚠️ Intercepted skip attempt: Tried to jump forward from ${Math.round(lastTrackedTime)}s to ${Math.round(currentTime)}s in "${currentTopic.title}". Reset to watch marker.`
      });
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current?.currentTime || 0;
    if (current > lastTrackedTime) {
      setLastTrackedTime(current);
    }
  };

  const handleEnded = () => {
    setVideoCompleted(true);
    logActivity({
      subject: enrolledSubj.title,
      actionType: 'video_completed',
      details: `Student fully watched the entire video for "${currentTopic.title}". Ready for Quiz.`
    });
  };

  const handleDownload = (material) => {
    logActivity({
      subject: enrolledSubj.title,
      actionType: 'file_download',
      details: `Student downloaded material "${material.title}" (${material.type.toUpperCase()}, ${material.size}).`
    });
  };

  const canProceedToQuiz = isFastTrack || videoCompleted;

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
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
              TOPIC 02 • SEQUENTIAL STUDY CLASSROOM
            </div>
            <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#111827' }}>
              {currentTopic.title}
            </h1>
          </div>

          <button
            onClick={() => setCurrentView('student_dashboard')}
            className="btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Fast-Track or Anti-Skip Status Banner */}
        {isFastTrack ? (
          <div style={{
            backgroundColor: '#FEF9C3',
            border: '2px solid #FACC15',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(250, 204, 21, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={22} color="#CA8A04" />
              <div>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#854D0E' }}>
                  ADMIN FAST-TRACK OVERRIDE PERMITTED
                </div>
                <div style={{ fontSize: '12px', color: '#713F12' }}>
                  Admin authorized you to skip the video lecture and test out directly in the Topic Quiz!
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedQuizTopic(currentTopic);
                setCurrentView('student_quiz');
              }}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              <span>Attend Quiz Directly</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '16px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <Lock size={18} color="#2563EB" />
            <div style={{ fontSize: '13px', color: '#1E40AF' }}>
              <strong>Anti-Skip Tracking Active:</strong> Full video playback is required before the quiz unlocks. Every seek attempt is monitored in the Admin audit log.
            </div>
          </div>
        )}

        {/* Anti-Skip Intercept Alert Modal/Banner */}
        {skipAlert && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '14px',
            padding: '14px 20px',
            color: '#991B1B',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="#DC2626" />
              <span>{skipAlert}</span>
            </div>
            <button
              onClick={() => setSkipAlert(null)}
              style={{ fontWeight: 700, color: '#991B1B', fontSize: '12px' }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Video Player & Materials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', marginBottom: '32px' }}>
          {/* Video Player Card */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>
              Lecture Video ({currentTopic.videoDuration})
            </h2>

            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              marginBottom: '16px'
            }}>
              <video
                ref={videoRef}
                controls
                onPlay={handlePlay}
                onPause={handlePause}
                onSeeking={handleSeeking}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                style={{ width: '100%', display: 'block', maxHeight: '360px' }}
                src={currentTopic.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>
                Status: {videoCompleted ? (
                  <span style={{ color: '#059669', fontWeight: 700 }}>✓ Video Completed (Quiz Unlocked)</span>
                ) : isPlaying ? (
                  <span style={{ color: '#2563EB', fontWeight: 600 }}>Playing with Anti-Skip</span>
                ) : (
                  <span>Paused</span>
                )}
              </div>

              {canProceedToQuiz ? (
                <button
                  onClick={() => {
                    setSelectedQuizTopic(currentTopic);
                    setCurrentView('student_quiz');
                  }}
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '13px' }}
                >
                  <span>Attend Topic Quiz</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  disabled
                  style={{
                    backgroundColor: '#E5E7EB',
                    color: '#9CA3AF',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Lock size={14} />
                  <span>Watch Video to Unlock Quiz</span>
                </button>
              )}
            </div>
          </div>

          {/* Topic Resources & Material Download (5 File Types) */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
              Topic Reference Files (5 Types)
            </h2>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '16px' }}>
              Materials uploaded by Mentor {enrolledSubj.mentorName}. Downloads are tracked.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentTopic.materials.map(mat => (
                <div
                  key={mat.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #F3F4F6',
                    backgroundColor: '#FAFAFA'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--primary-cream)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)'
                    }}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#111827' }}>{mat.title}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>
                        {mat.type.toUpperCase()} • {mat.size}
                      </div>
                    </div>
                  </div>

                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownload(mat);
                      alert(`Downloaded ${mat.title} (${mat.size}). Action logged to Admin audit trail.`);
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
