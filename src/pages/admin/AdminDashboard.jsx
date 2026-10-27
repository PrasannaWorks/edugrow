import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Award, 
  BookOpen, 
  Activity, 
  Plus, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';

export default function AdminDashboard({ setCurrentView }) {
  const { users, subjects, toggleFastTrack, toggleUserStatus, createUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'student',
    subject: 'subj_python'
  });

  const students = users.filter(u => u.role === 'student');
  const activeStudentsCount = students.filter(s => s.status === 'active').length;
  const inactiveStudentsCount = students.filter(s => s.status === 'inactive').length;
  const mentorsCount = users.filter(u => u.role === 'mentor').length;

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createUser({
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      enrolledSubjects: newUserData.role === 'student' ? [newUserData.subject] : [],
      authorizedSubjects: newUserData.role === 'mentor' ? [newUserData.subject] : [],
      fastTrack: false,
      totalHoursSpent: 0
    });
    setShowCreateModal(false);
    setNewUserData({ name: '', email: '', role: 'student', subject: 'subj_python' });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Top Header & Prominent Yellow View Activity Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '28px',
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
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              SUPERINTENDENT CONTROL CENTER
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              Admin Operations Dashboard
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-body)' }}>
              Manage accounts, toggle fast-track exam authorizations, and inspect student engagement.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* The Special Yellow View Activity Button */}
            <button
              onClick={() => setCurrentView('admin_activity')}
              className="btn-activity-yellow"
              style={{
                fontSize: '14px',
                padding: '12px 24px',
                borderWidth: '2px'
              }}
            >
              <Activity size={18} />
              <span>VIEW ACTIVITY (ACTION TIMELINE)</span>
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
              style={{ padding: '12px 20px', fontSize: '14px' }}
            >
              <Plus size={18} />
              <span>Create Account</span>
            </button>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '32px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>ACTIVE STUDENTS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckCircle size={18} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#065F46' }}>{activeStudentsCount}</div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>Currently attending courses</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>INACTIVE STUDENTS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
                <XCircle size={18} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#991B1B' }}>{inactiveStudentsCount}</div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>No recent login (&gt;14 days)</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>ASSIGNED MENTORS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309' }}>
                <Award size={18} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>{mentorsCount}</div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>Authorized instructors</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>COURSE SUBJECTS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                <BookOpen size={18} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>{subjects.length}</div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>Structured curricula</div>
          </div>
        </div>

        {/* User Management & Active / Inactive Status Section */}
        <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>
                Student & User Directory (Active / Inactive Status)
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                Every student action is verified. Toggle student statuses or authorize video skip (Fast-Track).
              </p>
            </div>

            {/* Filter and Search */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                padding: '6px 12px',
                borderRadius: '8px'
              }}>
                <Search size={16} color="#9CA3AF" />
                <input
                  type="text"
                  placeholder="Search user or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '180px' }}
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              >
                <option value="all">All Roles</option>
                <option value="student">Students Only</option>
                <option value="mentor">Mentors Only</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '12px 14px' }}>User Details</th>
                  <th style={{ padding: '12px 14px' }}>Role</th>
                  <th style={{ padding: '12px 14px' }}>Enrolled Course</th>
                  <th style={{ padding: '12px 14px' }}>Engagement</th>
                  <th style={{ padding: '12px 14px' }}>Account Status</th>
                  <th style={{ padding: '12px 14px' }}>Fast-Track Exam Permission</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const isStudent = u.role === 'student';
                  return (
                    <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background 0.15s ease' }}>
                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{u.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{u.email}</div>
                      </td>

                      <td style={{ padding: '14px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          backgroundColor: u.role === 'admin' ? '#FEF3C7' : u.role === 'mentor' ? '#ECFDF5' : '#EFF6FF',
                          color: u.role === 'admin' ? '#92400E' : u.role === 'mentor' ? '#065F46' : '#1E40AF'
                        }}>
                          {u.role}
                        </span>
                      </td>

                      <td style={{ padding: '14px', color: '#374151', fontWeight: 500 }}>
                        {isStudent 
                          ? (u.enrolledSubjects?.includes('subj_python') ? 'Python Foundations' : 'Web Development')
                          : (u.role === 'mentor' ? 'Instructor (Python/Web)' : 'Master Superintendent')}
                      </td>

                      <td style={{ padding: '14px' }}>
                        {isStudent ? (
                          <div>
                            <span style={{ fontWeight: 700, color: '#111827' }}>{u.totalHoursSpent || 0} hrs</span>
                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Last: {u.lastActive}</div>
                          </div>
                        ) : (
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>Active: {u.lastActive}</div>
                        )}
                      </td>

                      {/* Active vs Inactive Column */}
                      <td style={{ padding: '14px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: u.status === 'active' ? '#ECFDF5' : '#FEF2F2',
                          color: u.status === 'active' ? '#065F46' : '#991B1B',
                          border: u.status === 'active' ? '1px solid #A7F3D0' : '1px solid #FECACA'
                        }}>
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: u.status === 'active' ? '#10B981' : '#EF4444'
                          }} />
                          {u.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>

                      {/* Fast-Track Permission Toggle */}
                      <td style={{ padding: '14px' }}>
                        {isStudent ? (
                          <button
                            onClick={() => toggleFastTrack(u.id)}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: u.fastTrack ? '#FEF08A' : '#F3F4F6',
                              color: u.fastTrack ? '#854D0E' : '#6B7280',
                              border: u.fastTrack ? '1px solid #FACC15' : '1px solid #E5E7EB'
                            }}
                          >
                            <Zap size={14} color={u.fastTrack ? '#CA8A04' : '#9CA3AF'} />
                            <span>{u.fastTrack ? 'ALLOW SKIP (Fast-Track)' : 'LOCKED (Must Watch)'}</span>
                          </button>
                        ) : (
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>N/A</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid #E5E7EB',
                            color: u.status === 'active' ? '#DC2626' : '#059669',
                            backgroundColor: '#FFFFFF'
                          }}
                        >
                          {u.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Account Modal */}
        {showCreateModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              maxWidth: '460px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
                Provision New Account
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
                Admin creates verified student or mentor accounts directly.
              </p>

              <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Smith"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Institutional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. liam.smith@edugrow.com"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Role</label>
                    <select
                      value={newUserData.role}
                      onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                    >
                      <option value="student">Student</option>
                      <option value="mentor">Mentor</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Assign Subject</label>
                    <select
                      value={newUserData.subject}
                      onChange={(e) => setNewUserData({ ...newUserData, subject: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                    >
                      <option value="subj_python">Python Foundations</option>
                      <option value="subj_webdev">Full-Stack Web Dev</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary"
                    style={{ padding: '10px 18px', fontSize: '13px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '10px 20px', fontSize: '13px' }}
                  >
                    Create & Activate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
