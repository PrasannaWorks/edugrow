import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Users, 
  Clock, 
  PhoneCall, 
  FileUp, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function MentorDashboard({ setCurrentView }) {
  const { currentUser, subjects, users, progress } = useApp();

  const assignedSubjects = subjects.filter(s => s.mentorId === currentUser?.id || currentUser?.authorizedSubjects?.includes(s.id));
  const enrolledStudents = users.filter(u => u.role === 'student' && u.enrolledSubjects?.some(subId => assignedSubjects.map(s => s.id).includes(subId)));

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Mentor Welcome Banner */}
        <div style={{
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          borderRadius: '24px',
          padding: '28px 32px',
          marginBottom: '32px',
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
              fontSize: '12px',
              fontWeight: 800,
              color: '#065F46',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              FACULTY INSTRUCTOR PORTAL
            </div>
            <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#064E3B' }}>
              Welcome back, {currentUser?.name}
            </h1>
            <p style={{ fontSize: '14px', color: '#047857' }}>
              Upload authorized curriculum, track student course hours, and conduct 1-on-1 viva defense calls.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setCurrentView('mentor_materials')}
              className="btn-primary"
              style={{ padding: '12px 20px', fontSize: '14px', backgroundColor: '#10B981', color: '#FFFFFF' }}
            >
              <FileUp size={18} />
              <span>Publish Course Materials</span>
            </button>
            <button
              onClick={() => setCurrentView('mentor_call_eval')}
              className="btn-secondary"
              style={{ padding: '12px 20px', fontSize: '14px', borderColor: '#10B981', color: '#065F46' }}
            >
              <PhoneCall size={18} />
              <span>1-on-1 Viva Room</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>AUTHORIZED SUBJECTS</span>
              <BookOpen size={20} color="#10B981" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>{assignedSubjects.length}</div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>Python Foundations</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>ASSIGNED STUDENTS</span>
              <Users size={20} color="#10B981" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>{enrolledStudents.length}</div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>Active in your course tracks</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>HOURS SPENT BY STUDENTS</span>
              <Clock size={20} color="#10B981" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>
              {enrolledStudents.reduce((acc, curr) => acc + (curr.totalHoursSpent || 0), 0).toFixed(1)} hrs
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>Real tracked engagement time</div>
          </div>
        </div>

        {/* Assigned Courses & Active Students List */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          {/* Courses & Topics */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '16px' }}>
              Authorized Curriculum & Material Library
            </h2>
            {assignedSubjects.map(subj => (
              <div key={subj.id} style={{ border: '1px solid #E5E7EB', borderRadius: '16px', padding: '18px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{subj.title}</h3>
                  <span className="pill-badge">{subj.duration}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '14px' }}>{subj.description}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {subj.topics.map((t, idx) => (
                    <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: '#F9FAFB', borderRadius: '10px', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600 }}>Topic {idx + 1}: {t.title}</span>
                      <span style={{ color: '#059669', fontSize: '12px', fontWeight: 600 }}>{t.materials.length} resources attached</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Student Engagement & Viva Readiness */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '16px' }}>
              Students in Your Courses
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {enrolledStudents.map(student => (
                <div key={student.id} style={{ padding: '14px', borderRadius: '12px', border: '1px solid #F3F4F6', backgroundColor: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{student.name}</div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#D97706' }}>
                      {student.totalHoursSpent} course hrs
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>{student.email}</div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: student.status === 'active' ? '#ECFDF5' : '#FEF2F2',
                      color: student.status === 'active' ? '#065F46' : '#991B1B'
                    }}>
                      Status: {student.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => setCurrentView('mentor_call_eval')}
                      style={{ fontSize: '12px', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>1-on-1 Viva</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
