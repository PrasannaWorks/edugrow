import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function StudentLogin({ setCurrentView }) {
  const { users, switchUser } = useApp();
  const [email, setEmail] = useState('alex.rivera@edugrow.com');
  const [password, setPassword] = useState('student123');
  const [error, setError] = useState('');
  const [resetModal, setResetModal] = useState(false);
  const [resetSubmitted, setResetSubmitted] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const student = users.find(u => u.email === email && u.role === 'student');
    if (student) {
      if (student.status === 'inactive') {
        setError('Your student account is currently marked inactive or suspended by the Admin. Please contact Admin support.');
        return;
      }
      switchUser(student.id);
      setCurrentView('student_dashboard');
    } else {
      setError('Invalid student credentials or student account not yet provisioned by Admin.');
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EFF6FF',
      padding: '24px'
    }}>
      <div className="card" style={{
        maxWidth: '440px',
        width: '100%',
        padding: '36px',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: '#DBEAFE',
            border: '1px solid #BFDBFE',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1D4ED8',
            marginBottom: '16px'
          }}>
            <User size={28} />
          </div>
          <div style={{
            display: 'inline-block',
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
            STUDENT LEARNING ACCESS
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
            Student Portal Login
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            Enter your student classroom to study topics, attempt quizzes, earn topic badges, and defend your certificate.
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#991B1B',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Student Registered Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Student Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              width: '100%',
              justifyContent: 'center',
              padding: '13px',
              fontSize: '15px',
              marginTop: '8px'
            }}
          >
            <span>Sign In to Classroom</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #F3F4F6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px'
        }}>
          <button
            type="button"
            onClick={() => setCurrentView('landing')}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280' }}
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
          <button
            type="button"
            onClick={() => setResetModal(true)}
            style={{ color: '#2563EB', fontWeight: 600 }}
          >
            Forgot Password?
          </button>
        </div>

        {/* Password Reset Modal Request */}
        {resetModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
                Admin Password Verification Request
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
                Per EduGrow security protocol, passwords can only be reset after identity verification by the Admin.
              </p>

              {resetSubmitted ? (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  borderRadius: '12px',
                  fontSize: '13px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle2 size={18} />
                  <span>Request logged. Admin Eleanor Vance will verify your enrollment and dispatch reset credentials.</span>
                </div>
              ) : (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Confirm your registered email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '14px'
                    }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => { setResetModal(false); setResetSubmitted(false); }}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Close
                </button>
                {!resetSubmitted && (
                  <button
                    type="button"
                    onClick={() => setResetSubmitted(true)}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    Send to Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
