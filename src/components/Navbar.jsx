import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  Activity, 
  LogOut, 
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function Navbar({ currentView, setCurrentView }) {
  const { currentUser, switchUser } = useApp();

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #F3F4F6',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '14px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand / Logo (Inspired by HIT Foundation style) */}
        <div 
          onClick={() => setCurrentView('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary-cream)',
            border: '1px solid var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-dark)'
            }}>
              EDUGROW <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', backgroundColor: 'var(--primary-cream)', border: '1px solid var(--primary-light)' }}>PORTAL</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
              VERIFIED MENTOR-LED CERTIFICATION
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setCurrentView('landing')}
            style={{
              padding: '8px 14px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              color: currentView === 'landing' ? '#111827' : 'var(--text-body)',
              backgroundColor: currentView === 'landing' ? 'var(--primary-cream)' : 'transparent',
              border: currentView === 'landing' ? '1px solid var(--primary-light)' : '1px solid transparent'
            }}
          >
            Home
          </button>

          {/* Admin Space Nav */}
          {currentUser?.role === 'admin' && (
            <>
              <button 
                onClick={() => setCurrentView('admin_dashboard')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: currentView.startsWith('admin_') && currentView !== 'admin_activity' ? '#111827' : 'var(--text-body)',
                  backgroundColor: currentView.startsWith('admin_') && currentView !== 'admin_activity' ? 'var(--primary-cream)' : 'transparent'
                }}
              >
                Admin Hub
              </button>

              {/* Prominent Yellow "View Activity" Button */}
              <button
                onClick={() => setCurrentView('admin_activity')}
                className="btn-activity-yellow"
                style={{
                  padding: '7px 16px',
                  fontSize: '13px'
                }}
              >
                <Activity size={16} />
                VIEW ACTIVITY
              </button>
            </>
          )}

          {/* Mentor Space Nav */}
          {currentUser?.role === 'mentor' && (
            <>
              <button 
                onClick={() => setCurrentView('mentor_dashboard')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: currentView === 'mentor_dashboard' ? '#111827' : 'var(--text-body)',
                  backgroundColor: currentView === 'mentor_dashboard' ? 'var(--primary-cream)' : 'transparent'
                }}
              >
                Mentor Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('mentor_materials')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: currentView === 'mentor_materials' ? '#111827' : 'var(--text-body)',
                  backgroundColor: currentView === 'mentor_materials' ? 'var(--primary-cream)' : 'transparent'
                }}
              >
                Publish Materials (5 Types)
              </button>
            </>
          )}

          {/* Student Space Nav */}
          {currentUser?.role === 'student' && (
            <>
              <button 
                onClick={() => setCurrentView('student_dashboard')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: currentView === 'student_dashboard' ? '#111827' : 'var(--text-body)',
                  backgroundColor: currentView === 'student_dashboard' ? 'var(--primary-cream)' : 'transparent'
                }}
              >
                My Classroom
              </button>
              <button 
                onClick={() => setCurrentView('student_study')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: currentView === 'student_study' ? '#111827' : 'var(--text-body)',
                  backgroundColor: currentView === 'student_study' ? 'var(--primary-cream)' : 'transparent'
                }}
              >
                Study & Quiz
              </button>
            </>
          )}
        </nav>

        {/* Right Action: Current User Pill & Role Portals */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Active User Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#F9FAFB',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: '1px solid #E5E7EB',
            fontSize: '13px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: currentUser?.role === 'admin' ? '#CA8A04' : currentUser?.role === 'mentor' ? '#10B981' : '#3B82F6'
            }} />
            <span style={{ fontWeight: 600, color: '#111827' }}>{currentUser?.name.split(' ')[0]}</span>
            <span style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'var(--text-muted)'
            }}>
              ({currentUser?.role})
            </span>
          </div>

          {/* Quick Direct Portal Switches */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              onClick={() => setCurrentView('admin_login')}
              title="Admin Portal"
              style={{
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontWeight: 600
              }}
            >
              Admin Portal
            </button>
            <button 
              onClick={() => setCurrentView('mentor_login')}
              title="Mentor Portal"
              style={{
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontWeight: 600
              }}
            >
              Mentor Portal
            </button>
            <button 
              onClick={() => setCurrentView('student_login')}
              title="Student Portal"
              style={{
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontWeight: 600
              }}
            >
              Student Portal
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
