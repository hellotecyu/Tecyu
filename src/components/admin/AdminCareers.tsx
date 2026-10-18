import React, { useState } from 'react';
import { db } from '../../lib/database';
import { JobOpening, JobApplication } from '../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, Briefcase, FileText, CheckCircle2, X, MessageSquare, Download } from 'lucide-react';

export const AdminCareers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applicants'>('jobs');
  const [jobs, setJobs] = useState<JobOpening[]>(() => db.getCareers());
  const [applications, setApplications] = useState<JobApplication[]>(() => db.getApplications());

  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Candidate review drawer
  const [selectedApplicant, setSelectedApplicant] = useState<JobApplication | null>(null);
  const [interviewNote, setInterviewNote] = useState('');

  const refreshData = () => {
    setJobs(db.getCareers());
    setApplications(db.getApplications());
  };

  const handleTogglePublish = (job: JobOpening) => {
    const updated = { ...job, isPublished: !job.isPublished };
    db.saveCareer(updated);
    refreshData();
  };

  const handleAddJob = () => {
    const newJob: JobOpening = {
      id: `job-${Date.now()}`,
      title: 'DevOps & Cloud Engineer',
      slug: 'devops-cloud-engineer',
      department: 'Infrastructure',
      employmentType: 'Full-time',
      location: 'Hanumangarh Junction / Hybrid',
      experience: '2+ Years',
      salaryRange: 'Competitive based on experience',
      qualifications: ['Experience with AWS, Docker, and GitHub Actions CI/CD.', 'PostgreSQL database clustering.'],
      responsibilities: ['Maintain high-availability infrastructure.', 'Automate deployment pipelines.'],
      deadline: 'May 30, 2026',
      isPublished: true,
      createdAt: new Date().toISOString(),
    };
    setEditingJob(newJob);
    setIsJobModalOpen(true);
  };

  const handleSaveJobModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    db.saveCareer(editingJob);
    setIsJobModalOpen(false);
    setEditingJob(null);
    refreshData();
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Delete this job vacancy?')) {
      db.deleteCareer(id);
      refreshData();
    }
  };

  const handleUpdateApplicantStatus = (appId: string, status: JobApplication['status']) => {
    db.updateApplicationStatus(appId, status, interviewNote);
    refreshData();
    if (selectedApplicant) {
      setSelectedApplicant({ ...selectedApplicant, status, interviewNotes: interviewNote || selectedApplicant.interviewNotes });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Careers & Recruitment Hub</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Post job vacancies and review incoming candidate applications and resumes.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'jobs' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vacancies ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'applicants' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Applications ({applications.length})
          </button>
        </div>
      </div>

      {/* JOBS TAB */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleAddJob}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Vacancy</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-6">Role Title</th>
                    <th className="py-3 px-6">Department</th>
                    <th className="py-3 px-6">Type & Location</th>
                    <th className="py-3 px-6">Experience</th>
                    <th className="py-3 px-6">Deadline</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-slate-900">{job.title}</td>
                      <td className="py-3.5 px-6 text-slate-600 font-medium">{job.department}</td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {job.employmentType} · {job.location}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">{job.experience}</td>
                      <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500">{job.deadline}</td>
                      <td className="py-3.5 px-6">
                        <button
                          onClick={() => handleTogglePublish(job)}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer ${
                            job.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {job.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{job.isPublished ? 'Live' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-6 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingJob(JSON.parse(JSON.stringify(job)));
                            setIsJobModalOpen(true);
                          }}
                          className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* APPLICANTS TAB */}
      {activeTab === 'applicants' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-6">Applicant Name</th>
                  <th className="py-3 px-6">Position Applied</th>
                  <th className="py-3 px-6">Contact</th>
                  <th className="py-3 px-6">Resume Asset</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No candidate applications submitted yet.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-slate-900">{app.applicantName}</td>
                      <td className="py-3.5 px-6 text-slate-700 font-medium">{app.jobTitle}</td>
                      <td className="py-3.5 px-6 text-slate-600">
                        <div>{app.applicantEmail}</div>
                        <div className="text-[11px] text-slate-400">{app.applicantPhone}</div>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          <FileText className="w-3 h-3" />
                          <span>{app.resumeFileName}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-6">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            app.status === 'New'
                              ? 'bg-blue-100 text-blue-800'
                              : app.status === 'Shortlisted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedApplicant(app);
                            setInterviewNote(app.interviewNotes || '');
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          Review Candidate
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* APPLICANT REVIEW MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Candidate Profile</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedApplicant.applicantName}</h3>
                <div className="text-xs text-slate-500">Applied for: {selectedApplicant.jobTitle}</div>
              </div>
              <button onClick={() => setSelectedApplicant(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-2 bg-[#F5F8FC] p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Email</span>
                  <a href={`mailto:${selectedApplicant.applicantEmail}`} className="text-blue-600 font-medium">
                    {selectedApplicant.applicantEmail}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone</span>
                  <span>{selectedApplicant.applicantPhone}</span>
                </div>
              </div>

              {selectedApplicant.portfolioUrl && (
                <div>
                  <span className="text-slate-400 block text-[10px]">Portfolio / GitHub</span>
                  <a href={selectedApplicant.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    {selectedApplicant.portfolioUrl}
                  </a>
                </div>
              )}

              {selectedApplicant.coverNote && (
                <div>
                  <span className="text-slate-400 block text-[10px]">Cover Note</span>
                  <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 mt-1">
                    {selectedApplicant.coverNote}
                  </p>
                </div>
              )}

              {/* Status Updater */}
              <div className="pt-2">
                <span className="text-slate-500 block text-[11px] font-bold mb-1">Update Status</span>
                <div className="flex flex-wrap gap-2">
                  {(['Reviewing', 'Shortlisted', 'Interview Scheduled', 'Offered', 'Rejected'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateApplicantStatus(selectedApplicant.id, st)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium cursor-pointer transition-colors ${
                        selectedApplicant.status === st ? 'bg-[#08152F] text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interview Notes */}
              <div>
                <span className="text-slate-500 block text-[11px] font-bold mb-1">Interview Assessment Notes</span>
                <textarea
                  rows={3}
                  value={interviewNote}
                  onChange={(e) => setInterviewNote(e.target.value)}
                  placeholder="Record technical feedback or next steps..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  db.updateApplicationStatus(selectedApplicant.id, selectedApplicant.status, interviewNote);
                  setSelectedApplicant(null);
                  refreshData();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl"
              >
                Save Candidate Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT JOB MODAL */}
      {isJobModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#08152F]">Manage Job Opening</h2>
              <button onClick={() => setIsJobModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJobModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={editingJob.department}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={editingJob.employmentType}
                    onChange={(e) => setEditingJob({ ...editingJob, employmentType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={editingJob.experience}
                    onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Responsibilities (One per line)</label>
                <textarea
                  rows={3}
                  value={editingJob.responsibilities.join('\n')}
                  onChange={(e) => setEditingJob({ ...editingJob, responsibilities: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Qualifications (One per line)</label>
                <textarea
                  rows={3}
                  value={editingJob.qualifications.join('\n')}
                  onChange={(e) => setEditingJob({ ...editingJob, qualifications: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 font-bold text-white bg-[#2563EB] rounded-xl"
                >
                  Save Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
