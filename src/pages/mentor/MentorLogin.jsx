import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function MentorLogin({ setCurrentView }) {
  const { users, switchUser } = useApp();
  const [email, setEmail] = useState('sarah.jenkins@edugrow.com');
  const [password, setPassword] = useState('mentor123');
  const [error, setError] = useState('');
  const [resetRequested, setResetRequested] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const mentor = users.find(u => u.email === email && u.role === 'mentor');
    if (mentor) {
      if (mentor.status === 'inactive') {
        setError('Your mentor account is currently disabled. Please contact the Admin.');
        return;
      }
      switchUser(mentor.id);
      setCurrentView('mentor_dashboard');
    } else {
      setError('Invalid mentor credentials or you are not authorized as an instructor.');
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0FDF4',
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
            backgroundColor: '#DCFCE7',
            border: '1px solid #BBF7D0',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#15803D',
            marginBottom: '16px'
          }}>
            <Award size={28} />
          </div>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '9999px',
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px'
          }}>
            FACULTY & INSTRUCTOR GATEWAY
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
            Mentor Portal Login
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            Publish materials (PDF, PPT, Video, Image, Docs), monitor course hours, and conduct 1-on-1 viva defenses.
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

        {resetRequested && (
          <div style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            color: '#92400E',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '13px',
            marginBottom: '20px'
          }}>
            ✓ Password reset request dispatched to Admin. Admin will verify your identity and reset your credentials.
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Mentor Institutional Email
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
              Password
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
              marginTop: '8px',
              backgroundColor: '#10B981',
              color: '#FFFFFF'
            }}
          >
            <span>Enter Mentor Workspace</span>
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
            onClick={() => setResetRequested(true)}
            style={{ color: '#059669', fontWeight: 600 }}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
