import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Shield, Award, User, Zap, Eye, ChevronUp, ChevronDown } from 'lucide-react';

export default function RoleSwitcher({ currentView, setCurrentView }) {
  const { users, currentUser, switchUser, toggleFastTrack } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);

  const adminUser = users.find(u => u.role === 'admin');
  const mentorUser = users.find(u => u.role === 'mentor');
  const studentUser = users.find(u => u.id === 'usr_student_1'); // Alex Rivera

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
      border: '1px solid #E5E7EB',
      overflow: 'hidden',
      maxWidth: '380px',
      transition: 'all 0.3s ease'
    }}>
      {/* Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          backgroundColor: '#111827',
          color: '#FFFFFF',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
          <Users size={16} color="#F59E0B" />
          <span>Role Switcher (Live Demo Dock)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            backgroundColor: '#374151',
            padding: '2px 8px',
            borderRadius: '9999px',
            color: '#F59E0B',
            fontWeight: 600
          }}>
            {currentUser?.role?.toUpperCase()}
          </span>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>
      </div>

      {isExpanded && (
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.4 }}>
            Click any role to test its separate portal & permissions in real-time:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {/* Admin Switch */}
            <button
              onClick={() => {
                switchUser(adminUser?.id);
                setCurrentView('admin_dashboard');
              }}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: currentUser?.role === 'admin' ? '2px solid #F59E0B' : '1px solid #E5E7EB',
                backgroundColor: currentUser?.role === 'admin' ? '#FFFBEB' : '#FFFFFF',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Shield size={16} color="#CA8A04" />
              <span>Admin</span>
            </button>

            {/* Mentor Switch */}
            <button
              onClick={() => {
                switchUser(mentorUser?.id);
                setCurrentView('mentor_dashboard');
              }}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: currentUser?.role === 'mentor' ? '2px solid #10B981' : '1px solid #E5E7EB',
                backgroundColor: currentUser?.role === 'mentor' ? '#ECFDF5' : '#FFFFFF',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Award size={16} color="#059669" />
              <span>Mentor</span>
            </button>

            {/* Student Switch */}
            <button
              onClick={() => {
                switchUser(studentUser?.id);
                setCurrentView('student_dashboard');
              }}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: currentUser?.role === 'student' ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                backgroundColor: currentUser?.role === 'student' ? '#EFF6FF' : '#FFFFFF',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <User size={16} color="#2563EB" />
              <span>Student</span>
            </button>
          </div>

          {/* Quick Fast-Track Toggle */}
          <div style={{
            marginTop: '4px',
            padding: '8px 10px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #F3F4F6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} color={studentUser?.fastTrack ? '#F59E0B' : '#9CA3AF'} />
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Alex Fast-Track:</span>
            </div>
            <button
              onClick={() => toggleFastTrack('usr_student_1')}
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: studentUser?.fastTrack ? '#FEF08A' : '#E5E7EB',
                color: studentUser?.fastTrack ? '#854D0E' : '#4B5563',
                border: studentUser?.fastTrack ? '1px solid #FACC15' : '1px solid #D1D5DB'
              }}
            >
              {studentUser?.fastTrack ? 'ACTIVE (Skip Video)' : 'LOCKED (Watch First)'}
            </button>
          </div>

          {/* Direct Link to View Activity */}
          <button
            onClick={() => {
              switchUser(adminUser?.id);
              setCurrentView('admin_activity');
            }}
            className="btn-activity-yellow"
            style={{
              padding: '8px',
              fontSize: '12px',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <Eye size={15} />
            <span>Open Yellow View Activity Log</span>
          </button>
        </div>
      )}
    </div>
  );
}
