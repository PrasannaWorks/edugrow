import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Key, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AdminLogin({ setCurrentView }) {
  const { users, switchUser } = useApp();
  const [email, setEmail] = useState('admin@edugrow.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = users.find(u => u.email === email && u.role === 'admin');
    if (admin) {
      if (admin.status === 'inactive') {
        setError('This Admin account has been disabled. Access denied.');
        return;
      }
      switchUser(admin.id);
      setCurrentView('admin_dashboard');
    } else {
      setError('Invalid Admin credentials or unauthorized access attempt.');
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAF5FF',
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
            backgroundColor: '#FEF3C7',
            border: '1px solid #FDE68A',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B45309',
            marginBottom: '16px'
          }}>
            <Shield size={28} />
          </div>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '9999px',
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px'
          }}>
            SUPERINTENDENT ACCESS ONLY
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
            Admin Portal Login
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            Restricted environment for account creation, mentor authorization, and forensic activity auditing.
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
              Admin Identifier / Email
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
              Master Security Key / Password
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
            <span>Authenticate Admin Session</span>
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
          <span style={{ color: '#9CA3AF' }}>Zero Public Registration</span>
        </div>
      </div>
    </div>
  );
}
