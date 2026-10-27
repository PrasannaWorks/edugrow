import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Play, 
  Pause, 
  AlertTriangle, 
  Award, 
  CheckCircle2, 
  XCircle, 
  FileUp, 
  PhoneCall, 
  Clock, 
  User, 
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

export default function AdminActivityLog({ setCurrentView }) {
  const { activities, users } = useApp();
  const [filterRole, setFilterRole] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = activities.filter(act => {
    const matchesRole = filterRole === 'all' || act.userRole === filterRole;
    const matchesType = filterType === 'all' || act.actionType.includes(filterType);
    const matchesQuery = act.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         act.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         act.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesType && matchesQuery;
  });

  const getActionBadge = (type) => {
    switch (type) {
      case 'video_skip_attempt':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#FEF2F2',
            color: '#B91C1C',
            border: '1px solid #FECACA',
            fontSize: '11px',
            fontWeight: 700
          }}>
            <AlertTriangle size={13} />
            ANTI-SKIP INTERCEPTED
          </span>
        );
      case 'video_play':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#EFF6FF',
            color: '#1D4ED8',
            fontSize: '11px',
            fontWeight: 700
          }}>
            <Play size={13} />
            VIDEO PLAY
          </span>
        );
      case 'file_download':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#F3F4F6',
            color: '#374151',
            fontSize: '11px',
            fontWeight: 700
          }}>
            <Download size={13} />
            FILE DOWNLOAD
          </span>
        );
      case 'badge_earned':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#FEF9C3',
            color: '#854D0E',
            border: '1px solid #FACC15',
            fontSize: '11px',
            fontWeight: 700
          }}>
            <Award size={13} />
            BADGE & UNLOCK
          </span>
        );
      case 'material_upload':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            fontSize: '11px',
            fontWeight: 700
          }}>
            <FileUp size={13} />
            MENTOR UPLOAD
          </span>
        );
      case 'call_scheduled':
      case 'certificate_approved':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#F5F3FF',
            color: '#6D28D9',
            fontSize: '11px',
            fontWeight: 700
          }}>
            <PhoneCall size={13} />
            1-ON-1 VIVA
          </span>
        );
      default:
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#F3F4F6',
            color: '#4B5563',
            fontSize: '11px',
            fontWeight: 700
          }}>
            <Activity size={13} />
            {type.toUpperCase().replace('_', ' ')}
          </span>
        );
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Yellow Header Banner */}
        <div style={{
          backgroundColor: '#FEF9C3',
          border: '2px solid #FACC15',
          borderRadius: '24px',
          padding: '28px 32px',
          boxShadow: '0 10px 30px rgba(250, 204, 21, 0.2)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#FACC15',
                color: '#713F12',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                marginBottom: '8px'
              }}>
                <Activity size={15} />
                ADMIN AUDIT TIMELINE • YELLOW PRINT INTERFACE
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#854D0E', margin: '4px 0' }}>
                Full Activity & Anti-Cheat Action Log
              </h1>
              <p style={{ fontSize: '14px', color: '#713F12', maxWidth: '680px' }}>
                Forensic timeline recording every micro-action across the portal: video scrub attempts, downloads, quiz attempts, badge awards, and mentor remarks.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('admin_dashboard')}
              className="btn-secondary"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#FACC15',
                color: '#854D0E',
                fontSize: '13px'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Admin Hub</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="card" style={{ padding: '18px 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            {/* Search */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              padding: '8px 14px',
              borderRadius: '10px',
              width: '320px'
            }}>
              <Search size={16} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search user, action, topic, or meta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="all">All Roles</option>
                <option value="student">Student Actions</option>
                <option value="mentor">Mentor Actions</option>
                <option value="admin">Admin Actions</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="all">All Action Categories</option>
                <option value="video">Video (Plays / Anti-Skip)</option>
                <option value="download">Downloads (PDF / Files)</option>
                <option value="quiz">Quizzes & Badges</option>
                <option value="upload">Mentor Uploads</option>
                <option value="call">1-on-1 Viva Calls</option>
              </select>
            </div>
          </div>
        </div>

        {/* Chronological Timeline Feed */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>
              Recorded Timeline ({filtered.length} Events)
            </h2>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>
              Real-time audit stream enabled
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
                No activity logs match the selected filter criteria.
              </div>
            ) : (
              filtered.map((act) => (
                <div
                  key={act.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '170px 180px 180px 1fr',
                    gap: '16px',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    backgroundColor: act.actionType === 'video_skip_attempt' ? '#FFFBEB' : '#FAFAFA',
                    border: act.actionType === 'video_skip_attempt' ? '1px solid #FDE68A' : '1px solid #F3F4F6',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Timestamp */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6B7280' }}>
                    <Clock size={14} color="#9CA3AF" />
                    <span>{act.timestamp}</span>
                  </div>

                  {/* User Profile & Role */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#111827' }}>{act.userName}</div>
                    <span style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      color: act.userRole === 'admin' ? '#92400E' : act.userRole === 'mentor' ? '#065F46' : '#1E40AF'
                    }}>
                      • {act.userRole}
                    </span>
                  </div>

                  {/* Action Badge */}
                  <div>
                    {getActionBadge(act.actionType)}
                  </div>

                  {/* The Detailed Meta & Story Piece */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '13px', color: '#1F2937', fontWeight: 500 }}>
                      {act.details}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                      Context: <span style={{ fontWeight: 600, color: '#6B7280' }}>{act.subject}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
