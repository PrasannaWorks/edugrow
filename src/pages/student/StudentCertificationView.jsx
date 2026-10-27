import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Calendar, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Printer, 
  ArrowLeft,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function StudentCertificationView({ setCurrentView }) {
  const { currentUser, subjects, progress, scheduleCall } = useApp();

  const enrolledSubj = subjects[0]; // Python Foundations
  const studentProg = progress[currentUser?.id]?.[enrolledSubj?.id] || {};

  const [selectedDate, setSelectedDate] = useState('2026-03-02');
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const callInfo = studentProg.callScheduled;
  const certData = studentProg.certification;

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    scheduleCall(currentUser.id, enrolledSubj.id, selectedDate, selectedTime);
    setScheduledSuccess(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
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
              FINAL CERTIFICATION GATEWAY
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              1-on-1 Mentor Viva & Official Credential
            </h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              Prior to credential issuance, every student must defend their knowledge in a face-to-face video viva with the faculty mentor.
            </p>
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

        {/* State 1: Verified Certificate Issued (Mentor Approved) */}
        {certData?.status === 'approved' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Success Banner */}
            <div style={{
              backgroundColor: '#ECFDF5',
              border: '2px solid #10B981',
              borderRadius: '20px',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={24} color="#059669" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#065F46' }}>
                    Defense Approved by Mentor {certData.mentorName}!
                  </div>
                  <div style={{ fontSize: '13px', color: '#047857' }}>
                    Official remarks: "{certData.remarks}"
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                <Printer size={16} />
                <span>Print / Save Credential</span>
              </button>
            </div>

            {/* High-Fidelity Verified Certificate Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '12px solid #FEF3C7',
              borderRadius: '24px',
              padding: '48px 40px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
              textAlign: 'center',
              position: 'relative'
            }}>
              {/* Corner Watermark */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                fontSize: '11px',
                fontWeight: 800,
                color: '#B45309',
                backgroundColor: 'var(--primary-cream)',
                border: '1px solid var(--primary-light)',
                padding: '4px 12px',
                borderRadius: '9999px'
              }}>
                VERIFIED ID: {certData.certId}
              </div>

              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-cream)',
                border: '2px solid var(--primary)',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)'
              }}>
                <Award size={36} />
              </div>

              <div style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#92400E',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}>
                Certificate of Academic & Technical Mastery
              </div>

              <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                {currentUser?.name}
              </h2>

              <p style={{ fontSize: '15px', color: '#4B5563', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                has successfully completed all sequential topics, anti-skip lecture units, quizzes, and defended practical projects during the 1-on-1 Faculty Viva in:
              </p>

              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#B45309', marginBottom: '36px' }}>
                {enrolledSubj?.title}
              </h3>

              {/* Signatures & Seal Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                paddingTop: '24px',
                borderTop: '2px dashed #E5E7EB',
                alignItems: 'flex-end'
              }}>
                <div>
                  <div style={{ fontFamily: 'cursive', fontSize: '20px', color: '#1E293B', marginBottom: '4px' }}>
                    {certData.mentorName}
                  </div>
                  <div style={{ borderTop: '1px solid #94A3B8', paddingTop: '4px', fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                    EVALUATING FACULTY MENTOR
                  </div>
                </div>

                <div>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '3px solid #F59E0B',
                    margin: '0 auto 4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D97706',
                    fontSize: '9px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}>
                    OFFICIAL SEAL
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                    EDUGROW PORTAL
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                    {certData.issuedAt}
                  </div>
                  <div style={{ borderTop: '1px solid #94A3B8', paddingTop: '4px', fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                    ISSUE & VERIFICATION DATE
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : certData?.status === 'weak_topics' ? (
          /* State 2: Unapproved / Revision Required */
          <div className="card" style={{ padding: '32px' }}>
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px'
            }}>
              <AlertCircle size={24} color="#DC2626" />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#991B1B', marginBottom: '4px' }}>
                  Mentor Requested Revision on Weak Topics
                </h3>
                <p style={{ fontSize: '13px', color: '#7F1D1D', marginBottom: '12px' }}>
                  Mentor remarks: "{certData.remarks}". You must revise the following areas before re-attempting the 1-on-1 defense:
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {certData.weakTopics?.map((topic, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        color: '#991B1B',
                        fontWeight: 700,
                        fontSize: '12px',
                        border: '1px solid #FCA5A5'
                      }}
                    >
                      • {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCurrentView('student_study')}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '14px' }}
              >
                <span>Revise Topic Materials</span>
              </button>
            </div>
          </div>
        ) : callInfo ? (
          /* State 3: Call Scheduled, Awaiting Viva */
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669'
            }}>
              <PhoneCall size={28} />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
              1-on-1 Mentor Viva Scheduled!
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', maxWidth: '480px', margin: '0 auto 24px' }}>
              Your defense session with <strong>{enrolledSubj?.mentorName}</strong> is locked in for:
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px 24px',
              borderRadius: '14px',
              backgroundColor: 'var(--primary-cream)',
              border: '1px solid var(--primary-light)',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#92400E' }}>
                <Calendar size={18} />
                <span>{callInfo.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#92400E' }}>
                <Clock size={18} />
                <span>{callInfo.time} IST</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setCurrentView('mentor_call_eval')}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '14px' }}
              >
                <PhoneCall size={16} />
                <span>Enter Live Video Room (Simulate Defense)</span>
              </button>
            </div>
          </div>
        ) : (
          /* State 4: Subject Completed -> Student Sets Call Timing */
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                <CheckCircle2 size={13} />
                ALL TOPIC BADGES WON
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>
                Select Your 1-on-1 Call Timing
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                Choose a suitable date and time slot to meet with Faculty Mentor {enrolledSubj.mentorName}.
              </p>
            </div>

            <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    Select Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  padding: '13px',
                  fontSize: '15px',
                  justifyContent: 'center',
                  marginTop: '10px'
                }}
              >
                <span>Confirm Call Timing & Notify Mentor</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
