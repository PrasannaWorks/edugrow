import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileUp, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  ArrowLeft,
  ShieldCheck,
  Info
} from 'lucide-react';

const FILE_CONSTRAINTS = {
  pdf: {
    label: 'PDF Document',
    extensions: ['.pdf'],
    maxSizeMB: 20,
    icon: FileText,
    color: '#DC2626'
  },
  ppt: {
    label: 'Presentation (PPT / PPTX)',
    extensions: ['.ppt', '.pptx'],
    maxSizeMB: 50,
    icon: FileSpreadsheet,
    color: '#D97706'
  },
  video: {
    label: 'Video Lecture (MP4 / WEBM)',
    extensions: ['.mp4', '.webm'],
    maxSizeMB: 500,
    icon: Video,
    color: '#2563EB'
  },
  image: {
    label: 'Diagram / Image (JPG / PNG)',
    extensions: ['.jpg', '.jpeg', '.png'],
    maxSizeMB: 5,
    icon: ImageIcon,
    color: '#059669'
  },
  docs: {
    label: 'Word Document (DOC / DOCX)',
    extensions: ['.doc', '.docx'],
    maxSizeMB: 20,
    icon: FileText,
    color: '#4B5563'
  }
};

export default function MentorMaterials({ setCurrentView }) {
  const { currentUser, subjects, setSubjects, logActivity } = useApp();
  
  const assignedSubjects = subjects.filter(s => s.mentorId === currentUser?.id || currentUser?.authorizedSubjects?.includes(s.id));
  const [selectedSubjectId, setSelectedSubjectId] = useState(assignedSubjects[0]?.id || 'subj_python');
  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
  const [selectedTopicId, setSelectedTopicId] = useState(selectedSubject?.topics[0]?.id || '');
  
  const [selectedFileType, setSelectedFileType] = useState('pdf');
  const [materialTitle, setMaterialTitle] = useState('');
  const [fileDetails, setFileDetails] = useState(null); // { name, sizeMB, extension, valid, error }
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Client-side file validation engine
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = '.' + file.name.split('.').pop().toLowerCase();
    const sizeMB = file.size / (1024 * 1024);
    const rule = FILE_CONSTRAINTS[selectedFileType];

    let error = null;

    // Check extension
    if (!rule.extensions.includes(extension)) {
      error = `Invalid format "${extension}". Only ${rule.extensions.join(', ')} are permitted for ${rule.label}.`;
    }
    // Check size limit
    else if (sizeMB > rule.maxSizeMB) {
      error = `File size (${sizeMB.toFixed(2)} MB) exceeds the strict maximum limit of ${rule.maxSizeMB} MB for ${rule.label}.`;
    }

    setFileDetails({
      name: file.name,
      sizeMB: sizeMB.toFixed(2),
      extension,
      valid: !error,
      error
    });
    setUploadSuccess('');
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!fileDetails || !fileDetails.valid || !materialTitle) return;

    const newMaterial = {
      id: 'mat_' + Date.now(),
      title: materialTitle,
      type: selectedFileType,
      size: `${fileDetails.sizeMB} MB`,
      url: '#'
    };

    setSubjects(prev => prev.map(s => {
      if (s.id === selectedSubjectId) {
        return {
          ...s,
          topics: s.topics.map(t => {
            if (t.id === selectedTopicId) {
              return {
                ...t,
                materials: [...t.materials, newMaterial]
              };
            }
            return t;
          })
        };
      }
      return s;
    }));

    logActivity({
      subject: selectedSubject.title,
      actionType: 'material_upload',
      details: `Mentor ${currentUser.name} published "${materialTitle}" (${selectedFileType.toUpperCase()}, ${fileDetails.sizeMB} MB) to Topic "${selectedSubject.topics.find(t => t.id === selectedTopicId)?.title}".`
    });

    setUploadSuccess(`Successfully published "${materialTitle}" to topic library!`);
    setMaterialTitle('');
    setFileDetails(null);
  };

  const handleDeleteMaterial = (topicId, matId, matTitle) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === selectedSubjectId) {
        return {
          ...s,
          topics: s.topics.map(t => {
            if (t.id === topicId) {
              return {
                ...t,
                materials: t.materials.filter(m => m.id !== matId)
              };
            }
            return t;
          })
        };
      }
      return s;
    }));

    logActivity({
      subject: selectedSubject.title,
      actionType: 'material_delete',
      details: `Mentor ${currentUser.name} removed material "${matTitle}" from topic.`
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#065F46',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              CURRICULUM PUBLISHING STUDIO
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              Publish Material (5 File Constraints)
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-body)' }}>
              Mentor-only upload center with strict file size and format validation: PDF, PPT, Video, Image, and Docs.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('mentor_dashboard')}
            className="btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* 5 File Constraint Matrix Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
          marginBottom: '28px'
        }}>
          {Object.entries(FILE_CONSTRAINTS).map(([key, item]) => {
            const Icon = item.icon;
            const isSelected = selectedFileType === key;
            return (
              <div
                key={key}
                onClick={() => { setSelectedFileType(key); setFileDetails(null); }}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: isSelected ? 'var(--primary-cream)' : '#FFFFFF',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid #E5E7EB',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}>
                  <Icon size={20} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: '#111827', marginBottom: '4px' }}>
                  {key.toUpperCase()}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>
                  Max: <strong>{item.maxSizeMB} MB</strong>
                </div>
                <div style={{ fontSize: '10px', color: '#9CA3AF' }}>
                  {item.extensions.join(' / ')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Form & Published Materials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '28px' }}>
          {/* Upload Form Card */}
          <div className="card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
              Upload to Selected Topic
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
              Only authorized instructors can attach verified materials.
            </p>

            {uploadSuccess && (
              <div style={{
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px'
              }}>
                <CheckCircle2 size={18} />
                <span>{uploadSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Authorized Subject
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => {
                    setSelectedSubjectId(e.target.value);
                    const sub = subjects.find(s => s.id === e.target.value);
                    setSelectedTopicId(sub?.topics[0]?.id || '');
                  }}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                >
                  {assignedSubjects.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Target Topic
                </label>
                <select
                  value={selectedTopicId}
                  onChange={(e) => setSelectedTopicId(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                >
                  {selectedSubject?.topics.map((t, idx) => (
                    <option key={t.id} value={t.id}>Topic {idx + 1}: {t.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Material Title / Display Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Memory Architecture Diagram & Guide"
                  value={materialTitle}
                  onChange={(e) => setMaterialTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                />
              </div>

              {/* File Input */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Select File ({FILE_CONSTRAINTS[selectedFileType].extensions.join(', ')} • Max {FILE_CONSTRAINTS[selectedFileType].maxSizeMB} MB)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept={FILE_CONSTRAINTS[selectedFileType].extensions.join(',')}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px dashed #D1D5DB',
                    backgroundColor: '#F9FAFB',
                    fontSize: '13px'
                  }}
                />
              </div>

              {/* Validation Feedback Box */}
              {fileDetails && (
                <div style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: fileDetails.valid ? '#ECFDF5' : '#FEF2F2',
                  border: fileDetails.valid ? '1px solid #A7F3D0' : '1px solid #FECACA',
                  fontSize: '13px'
                }}>
                  {fileDetails.valid ? (
                    <div style={{ color: '#065F46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={18} />
                      <div>
                        <strong>Validation Passed:</strong> {fileDetails.name} ({fileDetails.sizeMB} MB). Ready to publish.
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: '#991B1B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={18} />
                      <div>
                        <strong>Validation Rejected:</strong> {fileDetails.error}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={!fileDetails || !fileDetails.valid || !materialTitle}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '13px',
                  fontSize: '15px',
                  opacity: (!fileDetails || !fileDetails.valid || !materialTitle) ? 0.6 : 1,
                  cursor: (!fileDetails || !fileDetails.valid || !materialTitle) ? 'not-allowed' : 'pointer'
                }}
              >
                <span>Store & Auto-Publish for Students</span>
              </button>
            </form>
          </div>

          {/* Currently Published Materials Across Topics */}
          <div className="card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
              Published Material Catalog
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
              Materials actively visible to students upon unlocking the respective topic.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedSubject?.topics.map((topic, idx) => (
                <div key={topic.id} style={{ border: '1px solid #F3F4F6', borderRadius: '14px', padding: '16px', backgroundColor: '#FAFAFA' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                    Topic {idx + 1}: {topic.title}
                  </div>

                  {topic.materials.length === 0 ? (
                    <div style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>
                      No materials uploaded yet.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {topic.materials.map(mat => (
                        <div
                          key={mat.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: '1px solid #E5E7EB',
                            fontSize: '13px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              backgroundColor: '#FEF3C7',
                              color: '#B45309'
                            }}>
                              {mat.type}
                            </span>
                            <span style={{ fontWeight: 600 }}>{mat.title}</span>
                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>({mat.size})</span>
                          </div>

                          <button
                            onClick={() => handleDeleteMaterial(topic.id, mat.id, mat.title)}
                            style={{ color: '#EF4444', padding: '4px' }}
                            title="Delete Material"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
