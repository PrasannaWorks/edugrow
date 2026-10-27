import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import RoleSwitcher from './components/RoleSwitcher';

// Pages
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminActivityLog from './pages/admin/AdminActivityLog';
import MentorLogin from './pages/mentor/MentorLogin';
import MentorDashboard from './pages/mentor/MentorDashboard';
import MentorMaterials from './pages/mentor/MentorMaterials';
import MentorCallEvaluation from './pages/mentor/MentorCallEvaluation';
import StudentLogin from './pages/student/StudentLogin';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentTopicView from './pages/student/StudentTopicView';
import StudentQuizView from './pages/student/StudentQuizView';
import StudentCertificationView from './pages/student/StudentCertificationView';

function MainApp() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Universal Top Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentView === 'landing' && <LandingPage setCurrentView={setCurrentView} />}
        
        {/* Admin Views */}
        {currentView === 'admin_login' && <AdminLogin setCurrentView={setCurrentView} />}
        {currentView === 'admin_dashboard' && <AdminDashboard setCurrentView={setCurrentView} />}
        {currentView === 'admin_activity' && <AdminActivityLog setCurrentView={setCurrentView} />}

        {/* Mentor Views */}
        {currentView === 'mentor_login' && <MentorLogin setCurrentView={setCurrentView} />}
        {currentView === 'mentor_dashboard' && <MentorDashboard setCurrentView={setCurrentView} />}
        {currentView === 'mentor_materials' && <MentorMaterials setCurrentView={setCurrentView} />}
        {currentView === 'mentor_call_eval' && <MentorCallEvaluation setCurrentView={setCurrentView} />}

        {/* Student Views */}
        {currentView === 'student_login' && <StudentLogin setCurrentView={setCurrentView} />}
        {currentView === 'student_dashboard' && (
          <StudentDashboard setCurrentView={setCurrentView} setSelectedTopic={setSelectedTopic} />
        )}
        {currentView === 'student_study' && (
          <StudentTopicView setCurrentView={setCurrentView} setSelectedQuizTopic={setSelectedTopic} />
        )}
        {currentView === 'student_quiz' && (
          <StudentQuizView setCurrentView={setCurrentView} selectedTopic={selectedTopic} />
        )}
        {currentView === 'student_certification' && (
          <StudentCertificationView setCurrentView={setCurrentView} />
        )}
      </main>

      {/* Footer matching HIT Foundation aesthetic */}
      <footer style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #F3F4F6',
        padding: '32px 0',
        textAlign: 'center',
        fontSize: '13px',
        color: '#6B7280'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontWeight: 700, color: '#111827' }}>
            EDUGROW — High-Integrity Verified Certification Portal
          </div>
          <div>
            Built with strict sequential topic locking, anti-skip watch tracking, 5 file validation limits, and 1-on-1 mentor viva defense.
          </div>
        </div>
      </footer>

      {/* Floating Demo Role Switcher Dock */}
      <RoleSwitcher currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
