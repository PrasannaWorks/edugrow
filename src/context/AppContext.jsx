import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const INITIAL_USERS = [
  {
    id: 'usr_admin_1',
    name: 'Eleanor Vance (Chief Admin)',
    email: 'admin@edugrow.com',
    role: 'admin',
    status: 'active',
    lastActive: 'Just now',
    createdAt: '2026-01-10'
  },
  {
    id: 'usr_mentor_1',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@edugrow.com',
    role: 'mentor',
    status: 'active',
    authorizedSubjects: ['subj_python'],
    lastActive: '10 mins ago',
    hoursTaught: 48,
    createdAt: '2026-01-15'
  },
  {
    id: 'usr_mentor_2',
    name: 'Prof. Marcus Vance',
    email: 'marcus.vance@edugrow.com',
    role: 'mentor',
    status: 'active',
    authorizedSubjects: ['subj_webdev'],
    lastActive: '1 hour ago',
    hoursTaught: 32,
    createdAt: '2026-02-01'
  },
  {
    id: 'usr_student_1',
    name: 'Alex Rivera',
    email: 'alex.rivera@edugrow.com',
    role: 'student',
    status: 'active',
    enrolledSubjects: ['subj_python'],
    lastActive: '2 mins ago',
    totalHoursSpent: 14.5,
    fastTrack: false, // Can be toggled by Admin
    createdAt: '2026-02-10'
  },
  {
    id: 'usr_student_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@edugrow.com',
    role: 'student',
    status: 'active',
    enrolledSubjects: ['subj_webdev'],
    lastActive: '30 mins ago',
    totalHoursSpent: 8.2,
    fastTrack: false,
    createdAt: '2026-02-12'
  },
  {
    id: 'usr_student_3',
    name: 'David Kim',
    email: 'david.kim@edugrow.com',
    role: 'student',
    status: 'inactive', // No recent login for over 14 days
    enrolledSubjects: ['subj_python'],
    lastActive: '16 days ago',
    totalHoursSpent: 2.1,
    fastTrack: false,
    createdAt: '2026-01-20'
  }
];

const INITIAL_SUBJECTS = [
  {
    id: 'subj_python',
    title: 'Python Foundations & Practical Automation',
    code: 'CS-101',
    category: 'Programming',
    mentorId: 'usr_mentor_1',
    mentorName: 'Dr. Sarah Jenkins',
    duration: '8 weeks',
    description: 'Master core logic, data manipulation, clean scripting, and complete a final mentor code review for certification.',
    topics: [
      {
        id: 'top_py_1',
        title: 'Variables, Data Types & Memory Allocation',
        order: 1,
        videoDuration: '12:40',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        materials: [
          { id: 'mat_1', title: 'Python Syntax Guide.pdf', type: 'pdf', size: '3.4 MB', url: '#' },
          { id: 'mat_2', title: 'Memory Architecture.pptx', type: 'ppt', size: '12.1 MB', url: '#' }
        ],
        quiz: {
          id: 'quiz_py_1',
          title: 'Topic 1 Knowledge Check',
          passingPercentage: 70,
          questions: [
            {
              id: 'q1',
              question: 'Which of the following data types in Python is immutable?',
              options: ['List', 'Dictionary', 'Tuple', 'Set'],
              correct: 2,
              explanation: 'Tuples cannot be altered once created, making them immutable.'
            },
            {
              id: 'q2',
              question: 'What does the id() function in Python return?',
              options: ['Type of variable', 'Unique memory address', 'Size in bytes', 'Scope identifier'],
              correct: 1,
              explanation: 'id() returns the identity of the object, which corresponds to its memory location.'
            }
          ]
        }
      },
      {
        id: 'top_py_2',
        title: 'Control Flow, Conditionals & Exception Handling',
        order: 2,
        videoDuration: '16:15',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        materials: [
          { id: 'mat_3', title: 'Flowcharts & Exception Trees.pdf', type: 'pdf', size: '4.8 MB', url: '#' },
          { id: 'mat_4', title: 'Control Flow Cheatsheet.docx', type: 'docs', size: '1.2 MB', url: '#' }
        ],
        quiz: {
          id: 'quiz_py_2',
          title: 'Topic 2 Control Flow Assessment',
          passingPercentage: 75,
          questions: [
            {
              id: 'q3',
              question: 'Which clause in a try-except block executes regardless of an error?',
              options: ['else', 'finally', 'catch', 'throw'],
              correct: 1,
              explanation: 'The finally block always runs, ensuring resource cleanup.'
            },
            {
              id: 'q4',
              question: 'What is the outcome of a while True loop without a break statement?',
              options: ['SyntaxError', 'Infinite execution loop', 'Auto-terminates after 100 iterations', 'Memory overflow immediately'],
              correct: 1,
              explanation: 'Without a break condition or exception, the loop executes indefinitely.'
            }
          ]
        }
      },
      {
        id: 'top_py_3',
        title: 'Functions, Lambda Expressions & Scoping Rules (LEGB)',
        order: 3,
        videoDuration: '19:30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        materials: [
          { id: 'mat_5', title: 'Scope Diagram.png', type: 'image', size: '2.4 MB', url: '#' }
        ],
        quiz: {
          id: 'quiz_py_3',
          title: 'Topic 3 Functions & Scoping Quiz',
          passingPercentage: 75,
          questions: [
            {
              id: 'q5',
              question: 'What does LEGB stand for in Python name resolution?',
              options: [
                'Local, Enclosing, Global, Built-in',
                'Loop, Explicit, Global, Binary',
                'Lexical, External, Generic, Base',
                'Linked, Executable, Global, Block'
              ],
              correct: 0,
              explanation: 'LEGB defines standard Python scope search order: Local, Enclosing, Global, Built-in.'
            }
          ]
        }
      },
      {
        id: 'top_py_4',
        title: 'Object-Oriented Programming: Classes, Inheritance & Dunder Methods',
        order: 4,
        videoDuration: '22:10',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        materials: [
          { id: 'mat_6', title: 'OOP Design Patterns.pdf', type: 'pdf', size: '8.5 MB', url: '#' }
        ],
        quiz: {
          id: 'quiz_py_4',
          title: 'Topic 4 OOP Mastery Check',
          passingPercentage: 80,
          questions: [
            {
              id: 'q6',
              question: 'Which dunder method is called during object initialization?',
              options: ['__new__', '__init__', '__call__', '__repr__'],
              correct: 1,
              explanation: '__init__ is the initializer method executed when an instance is instantiated.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'subj_webdev',
    title: 'Modern Full-Stack Web Development',
    code: 'WEB-201',
    category: 'Web Engineering',
    mentorId: 'usr_mentor_2',
    mentorName: 'Prof. Marcus Vance',
    duration: '10 weeks',
    description: 'Learn modern HTML5/CSS, React design systems, state management, and undergo 1-on-1 portfolio code defense.',
    topics: [
      {
        id: 'top_web_1',
        title: 'HTML5 Semantic Elements & Accessibility (a11y)',
        order: 1,
        videoDuration: '14:20',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        materials: [
          { id: 'mat_w1', title: 'Semantic Tags Hierarchy.pdf', type: 'pdf', size: '2.1 MB', url: '#' }
        ],
        quiz: {
          id: 'quiz_web_1',
          title: 'Topic 1 Semantic HTML Quiz',
          passingPercentage: 70,
          questions: [
            {
              id: 'qw1',
              question: 'Which tag should wrap high-level introductory content or navigation links?',
              options: ['<section>', '<header>', '<article>', '<main>'],
              correct: 1,
              explanation: '<header> represents introductory content or navigational aids.'
            }
          ]
        }
      }
    ]
  }
];

const INITIAL_PROGRESS = {
  // Student ID -> Subject Progress
  usr_student_1: {
    subj_python: {
      completedTopicIds: ['top_py_1'],
      badges: [
        {
          topicId: 'top_py_1',
          title: 'Variables & Memory Explorer',
          earnedAt: '2026-02-14 11:32',
          score: '100%'
        }
      ],
      currentTopicId: 'top_py_2',
      readyForCall: false,
      callScheduled: null, // { date, time, mentorId, status }
      certification: null // { certId, issuedAt, mentorRemarks, rating, status: 'approved' | 'weak_topics' }
    }
  },
  usr_student_2: {
    subj_webdev: {
      completedTopicIds: ['top_web_1'],
      badges: [
        {
          topicId: 'top_web_1',
          title: 'Semantic Architect',
          earnedAt: '2026-02-15 14:05',
          score: '100%'
        }
      ],
      currentTopicId: 'top_web_1',
      readyForCall: false,
      callScheduled: null,
      certification: null
    }
  }
};

const INITIAL_ACTIVITIES = [
  {
    id: 'act_1',
    timestamp: '2026-02-18 10:45:12',
    userId: 'usr_student_1',
    userName: 'Alex Rivera',
    userRole: 'student',
    subject: 'Python Foundations',
    actionType: 'video_play',
    details: 'Started watching video "Control Flow & Conditionals"'
  },
  {
    id: 'act_2',
    timestamp: '2026-02-18 10:48:30',
    userId: 'usr_student_1',
    userName: 'Alex Rivera',
    userRole: 'student',
    subject: 'Python Foundations',
    actionType: 'video_skip_attempt',
    details: '⚠️ Attempted to scrub forward (+04:20). Action intercepted & logged by Anti-Skip Engine.'
  },
  {
    id: 'act_3',
    timestamp: '2026-02-18 10:52:14',
    userId: 'usr_student_1',
    userName: 'Alex Rivera',
    userRole: 'student',
    subject: 'Python Foundations',
    actionType: 'file_download',
    details: 'Downloaded reference file "Flowcharts & Exception Trees.pdf" (4.8 MB)'
  },
  {
    id: 'act_4',
    timestamp: '2026-02-18 09:15:00',
    userId: 'usr_mentor_1',
    userName: 'Dr. Sarah Jenkins',
    userRole: 'mentor',
    subject: 'Python Foundations',
    actionType: 'material_upload',
    details: 'Published new material "OOP Design Patterns.pdf" (8.5 MB) to Topic 4'
  },
  {
    id: 'act_5',
    timestamp: '2026-02-17 16:20:44',
    userId: 'usr_admin_1',
    userName: 'Eleanor Vance',
    userRole: 'admin',
    subject: 'System',
    actionType: 'account_created',
    details: 'Provisioned verified student account for "Priya Sharma"'
  }
];

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('edugrow_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to Admin for easy initial testing
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('edugrow_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('edugrow_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('edugrow_progress');
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('edugrow_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  // Keep localStorage synchronized
  useEffect(() => {
    localStorage.setItem('edugrow_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('edugrow_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('edugrow_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('edugrow_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('edugrow_activities', JSON.stringify(activities));
  }, [activities]);

  // Forensic Activity Logger
  const logActivity = (action) => {
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);
    
    const newEntry = {
      id: 'act_' + Date.now() + Math.random().toString(36).substr(2, 4),
      timestamp: formattedTime,
      userId: currentUser?.id || 'anonymous',
      userName: currentUser?.name || 'Visitor',
      userRole: currentUser?.role || 'visitor',
      subject: action.subject || 'General',
      actionType: action.actionType,
      details: action.details
    };

    setActivities(prev => [newEntry, ...prev]);
  };

  // Switch role / user simulated login
  const switchUser = (userId) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      logActivity({
        subject: 'Auth Portal',
        actionType: 'user_login',
        details: `Logged into session as ${found.name} (${found.role.toUpperCase()})`
      });
    }
  };

  // Toggle Fast-Track (Admin only)
  const toggleFastTrack = (studentId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === studentId) {
        const nextState = !u.fastTrack;
        logActivity({
          subject: 'Academic Policy',
          actionType: 'fasttrack_toggled',
          details: `Admin ${currentUser.name} ${nextState ? 'GRANTED' : 'REVOKED'} Fast-Track (skip video & direct quiz) for ${u.name}`
        });
        return { ...u, fastTrack: nextState };
      }
      return u;
    }));
  };

  // Toggle User Active / Inactive status
  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'inactive' : 'active';
        logActivity({
          subject: 'Account Control',
          actionType: 'status_changed',
          details: `Account for ${u.name} set to ${nextStatus.toUpperCase()}`
        });
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Add new user (No public signup; Admin created)
  const createUser = (userData) => {
    const newUser = {
      ...userData,
      id: 'usr_' + Date.now(),
      status: 'active',
      lastActive: 'Just created',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    logActivity({
      subject: 'Account Management',
      actionType: 'account_created',
      details: `Admin created new ${newUser.role.toUpperCase()} account for "${newUser.name}"`
    });
    return newUser;
  };

  // Record quiz completion and badge unlock
  const recordQuizCompletion = (studentId, subjectId, topicId, scorePercentage, passed) => {
    const topic = subjects.find(s => s.id === subjectId)?.topics.find(t => t.id === topicId);
    const topicTitle = topic?.title || 'Topic';

    if (passed) {
      const badgeTitle = `${topicTitle.split(':')[0]} Badge`;
      const newBadge = {
        topicId,
        title: badgeTitle,
        earnedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        score: `${scorePercentage}%`
      };

      setProgress(prev => {
        const studentProgress = prev[studentId] || {};
        const subjProgress = studentProgress[subjectId] || { completedTopicIds: [], badges: [] };

        const updatedCompleted = Array.from(new Set([...subjProgress.completedTopicIds, topicId]));
        const updatedBadges = [...subjProgress.badges.filter(b => b.topicId !== topicId), newBadge];

        // Find next topic if available
        const currentSubj = subjects.find(s => s.id === subjectId);
        const currentIndex = currentSubj?.topics.findIndex(t => t.id === topicId) ?? -1;
        const nextTopic = currentSubj?.topics[currentIndex + 1];

        const allCompleted = currentSubj && updatedCompleted.length === currentSubj.topics.length;

        return {
          ...prev,
          [studentId]: {
            ...studentProgress,
            [subjectId]: {
              ...subjProgress,
              completedTopicIds: updatedCompleted,
              badges: updatedBadges,
              currentTopicId: nextTopic ? nextTopic.id : topicId,
              readyForCall: allCompleted
            }
          }
        };
      });

      logActivity({
        subject: subjects.find(s => s.id === subjectId)?.title || 'Subject',
        actionType: 'badge_earned',
        details: `Student passed Quiz for "${topicTitle}" with ${scorePercentage}%. Awarded ${badgeTitle} and unlocked next topic!`
      });
    } else {
      logActivity({
        subject: subjects.find(s => s.id === subjectId)?.title || 'Subject',
        actionType: 'quiz_failed',
        details: `Student attempted Quiz for "${topicTitle}" and scored ${scorePercentage}% (Passing threshold not met). Retrying required.`
      });
    }
  };

  // Schedule 1-on-1 Call with Mentor
  const scheduleCall = (studentId, subjectId, date, time) => {
    const subj = subjects.find(s => s.id === subjectId);
    setProgress(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectId]: {
          ...prev[studentId]?.[subjectId],
          callScheduled: { date, time, mentorId: subj.mentorId, status: 'scheduled' }
        }
      }
    }));

    logActivity({
      subject: subj?.title,
      actionType: 'call_scheduled',
      details: `Student scheduled 1-on-1 Mentor Viva with ${subj?.mentorName} for ${date} at ${time}.`
    });
  };

  // Mentor remarks and certification judgment
  const submitMentorEvaluation = (studentId, subjectId, { satisfied, remarks, rating, weakTopics }) => {
    const certId = 'EDUGROW-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const certData = {
      certId,
      issuedAt: now,
      mentorName: currentUser.name,
      rating,
      remarks,
      status: satisfied ? 'approved' : 'weak_topics',
      weakTopics: satisfied ? [] : weakTopics
    };

    setProgress(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectId]: {
          ...prev[studentId]?.[subjectId],
          certification: certData
        }
      }
    }));

    logActivity({
      subject: subjects.find(s => s.id === subjectId)?.title,
      actionType: satisfied ? 'certificate_approved' : 'revision_assigned',
      details: satisfied
        ? `Mentor ${currentUser.name} APPROVED student for certification (ID: ${certId}). Remarks: "${remarks}"`
        : `Mentor ${currentUser.name} requested revision on weak topics: [${weakTopics.join(', ')}]. Remarks: "${remarks}"`
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        subjects,
        setSubjects,
        progress,
        activities,
        logActivity,
        switchUser,
        toggleFastTrack,
        toggleUserStatus,
        createUser,
        recordQuizCompletion,
        scheduleCall,
        submitMentorEvaluation
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
