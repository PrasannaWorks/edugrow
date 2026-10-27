import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Laptop, 
  Rocket, 
  Presentation, 
  Award, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Sparkles,
  Users,
  Lock,
  PlayCircle
} from 'lucide-react';

export default function LandingPage({ setCurrentView }) {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Column: Hero Text */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px'
            }}>
              MENTOR-LED TECHNOLOGY COURSES
            </div>
            
            <h1 style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#111827',
              marginBottom: '20px'
            }}>
              Build real tech skills through <span style={{ color: 'var(--primary)' }}>projects</span> and <span style={{ color: 'var(--primary)' }}>mentorship</span>.
            </h1>

            <p style={{
              fontSize: '18px',
              color: 'var(--text-body)',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '520px'
            }}>
              Structured courses for students and beginners, with anti-skip verified study, locked topic quizzes, badges, and a mandatory 1-on-1 mentor viva before certification.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setCurrentView('student_dashboard')}
                className="btn-primary"
                style={{ fontSize: '15px' }}
              >
                <span>Explore courses</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => setCurrentView('admin_login')}
                className="btn-secondary"
                style={{ fontSize: '15px' }}
              >
                <span>Admin Portal</span>
              </button>

              <button 
                onClick={() => setCurrentView('mentor_login')}
                className="btn-secondary"
                style={{ fontSize: '15px' }}
              >
                <span>Mentor Portal</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '40px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #F3F4F6', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Mentor-led</div>
                <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600 }}>learning</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #F3F4F6', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Real</div>
                <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600 }}>projects</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #F3F4F6', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Structured</div>
                <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600 }}>curriculum</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #F3F4F6', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Certificate</div>
                <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600 }}>included</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Dashboard Mockup Card (Inspired by Screenshot 1) */}
          <div style={{ position: 'relative' }}>
            {/* Top Floating Badge */}
            <div style={{
              position: 'absolute',
              top: '-16px',
              right: '24px',
              backgroundColor: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '9999px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
              border: '1px solid #F3F4F6',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              zIndex: 10
            }}>
              <span>🏆</span> Certificate included
            </div>

            {/* Main Window Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB',
              padding: '24px'
            }}>
              {/* Browser Window Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F87171' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FBBF24' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#34D399' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'monospace' }}>student-dashboard</div>
              </div>

              {/* Mentor Online Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                <div className="dot-indicator" />
                <span>Mentor online</span>
              </div>

              {/* Course Progress Card */}
              <div style={{
                backgroundColor: '#FAFAFA',
                borderRadius: '16px',
                padding: '18px',
                border: '1px solid #F3F4F6',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    CURRENT COURSE
                  </span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    padding: '2px 8px',
                    borderRadius: '9999px'
                  }}>
                    68%
                  </span>
                </div>
                
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>
                  Python Foundations
                </h3>

                {/* Golden Amber Progress Bar */}
                <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '68%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '9999px' }} />
                </div>
              </div>

              {/* 4 Status Metric Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>ASSIGNMENTS</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>8/12 completed</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>MENTOR FEEDBACK</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>Available</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>PORTFOLIO PROJECT</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#D97706' }}>In Review</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>NEXT STEP</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>1-on-1 Mentor Viva</div>
                </div>
              </div>

              {/* Mock Code / Terminal Snippet */}
              <div style={{
                backgroundColor: '#1E1E1E',
                borderRadius: '12px',
                padding: '12px 16px',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#D4D4D4',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ color: '#9CDCFE' }}>certification</span>.<span style={{ color: '#4EC9B0' }}>status</span> = <span style={{ color: '#CE9178' }}>"pending_mentor_call"</span>
                </div>
                <span style={{
                  fontSize: '10px',
                  backgroundColor: '#374151',
                  color: '#FEF08A',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  Anti-Skip Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip (Screenshot 2 Style) */}
      <section style={{ padding: '24px 0', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} color="#4B5563" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
              Parent-friendly progress visibility
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} color="#4B5563" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
              Mentor-reviewed deliverables
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} color="#4B5563" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
              Portfolio-ready projects
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} color="#4B5563" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
              Beginner and college tracks
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Operating System (Screenshot 3 Style) */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, marginBottom: '12px' }}>
              One operating system for{' '}
              <span style={{
                position: 'relative',
                display: 'inline-block'
              }}>
                serious student progress
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: 0,
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'var(--primary-light)',
                  zIndex: -1,
                  borderRadius: '4px'
                }} />
              </span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-body)' }}>
              A proven learning loop designed to take students from beginners to confident builders.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {/* Step 01 */}
            <div className="card" style={{ padding: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '18px', right: '18px', fontSize: '28px', fontWeight: 800, color: '#E5E7EB' }}>
                01
              </div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-cream)',
                border: '1px solid var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                marginBottom: '20px'
              }}>
                <BookOpen size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Concept</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                Understand the core theory through high-quality materials and video lectures with anti-skip verification.
              </p>
            </div>

            {/* Step 02 */}
            <div className="card" style={{ padding: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '18px', right: '18px', fontSize: '28px', fontWeight: 800, color: '#E5E7EB' }}>
                02
              </div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-cream)',
                border: '1px solid var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                marginBottom: '20px'
              }}>
                <Laptop size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Topic Quiz</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                Pass mandatory topic assessments to unlock badges. Next topic unlocks only when current badge is earned.
              </p>
            </div>

            {/* Step 03 */}
            <div className="card" style={{ padding: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '18px', right: '18px', fontSize: '28px', fontWeight: 800, color: '#E5E7EB' }}>
                03
              </div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-cream)',
                border: '1px solid var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                marginBottom: '20px'
              }}>
                <Rocket size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Build</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                Integrate what you've learned into full-fledged deliverables across 5 supported file formats.
              </p>
            </div>

            {/* Step 04 */}
            <div className="card" style={{ padding: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '18px', right: '18px', fontSize: '28px', fontWeight: 800, color: '#E5E7EB' }}>
                04
              </div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-cream)',
                border: '1px solid var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                marginBottom: '20px'
              }}>
                <Presentation size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>1-on-1 Defense</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                Live video viva with the mentor. Receive feedback, ratings, and mentor approval before certificate issuance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog (Screenshot 4 & 5 Style) */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'var(--primary-cream)',
              border: '1px solid var(--primary-light)',
              fontSize: '12px',
              fontWeight: 700,
              color: '#B45309',
              marginBottom: '16px'
            }}>
              <span>✨</span> COURSES
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px' }}>
              Choose a path with a defined outcome.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '24px' }}>
              Every course is scoped around deliverables, mentor feedback, and a verified certification pathway.
            </p>

            {/* Filter Tabs Wrapper */}
            <div className="filter-tabs-wrapper">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`filter-tab ${activeCategory === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {/* Card 1: Python */}
            <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>LEARNING PREVIEW</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309', fontSize: '12px', fontWeight: 700 }}>
                    &lt;/&gt;
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span className="pill-badge">Most enrolled</span>
                  <span style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div className="dot-indicator yellow" /> 8 weeks
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>Python Programming</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>Class 9+, college beginners</p>

                <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '20px' }}>
                  Automation toolkit with file handling, reports, memory architecture, and clean code walkthrough.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> 4 sequential topics with quizzes
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> Anti-skip video watch verification
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> 1-on-1 mentor viva defense
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                <button 
                  onClick={() => setCurrentView('student_study')}
                  className="btn-primary" 
                  style={{ padding: '10px 18px', fontSize: '13px' }}
                >
                  <span>View Roadmap</span>
                  <ArrowRight size={15} />
                </button>
                <button 
                  onClick={() => setCurrentView('student_login')}
                  style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563' }}
                >
                  Student Login
                </button>
              </div>
            </div>

            {/* Card 2: HTML & CSS */}
            <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>LEARNING PREVIEW</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309', fontSize: '14px' }}>
                    ☰
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span className="pill-badge">Start here</span>
                  <span style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div className="dot-indicator yellow" /> 6 weeks
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>HTML & CSS Design</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>School students, design starters</p>

                <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '20px' }}>
                  Responsive portfolio website with polished design tokens, accessible semantic elements, and deployment basics.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> Layout labs & Flexbox mastery
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> Semantic HTML quiz & badges
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> Mentor design code review
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                <button 
                  onClick={() => setCurrentView('student_study')}
                  className="btn-primary" 
                  style={{ padding: '10px 18px', fontSize: '13px' }}
                >
                  <span>View Roadmap</span>
                  <ArrowRight size={15} />
                </button>
                <button 
                  onClick={() => setCurrentView('student_login')}
                  style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563' }}
                >
                  Student Login
                </button>
              </div>
            </div>

            {/* Card 3: JavaScript */}
            <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>LEARNING PREVIEW</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309', fontSize: '12px', fontWeight: 700 }}>
                    &gt;_
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span className="pill-badge">Intermediate</span>
                  <span style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div className="dot-indicator yellow" /> 8 weeks
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>JavaScript & APIs</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>Web learners & builders</p>

                <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '20px' }}>
                  Interactive dashboard using DOM, events, asynchronous fetch APIs, and stateful UI component architecture.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> Asynchronous programming labs
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> Debugging sessions with mentor
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircle size={15} color="#F59E0B" /> 1-on-1 viva defense before cert
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                <button 
                  onClick={() => setCurrentView('student_study')}
                  className="btn-primary" 
                  style={{ padding: '10px 18px', fontSize: '13px' }}
                >
                  <span>View Roadmap</span>
                  <ArrowRight size={15} />
                </button>
                <button 
                  onClick={() => setCurrentView('student_login')}
                  style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563' }}
                >
                  Student Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
