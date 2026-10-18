import React, { useState } from 'react';
import { db } from '../../lib/database';
import { JobOpening } from '../../types';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, UploadCloud, X, ArrowLeft } from 'lucide-react';

interface CareersPageProps {
  onNavigate: (path: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const jobs = db.getCareers().filter((j) => j.isPublished);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Application form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [submittedAppRef, setSubmittedAppRef] = useState<string | null>(null);

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setIsApplying(true);
  };

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !name.trim() || !email.trim() || !phone.trim() || !resumeName) return;

    const newApp = db.submitApplication({
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      applicantName: name.trim(),
      applicantEmail: email.trim(),
      applicantPhone: phone.trim(),
      portfolioUrl: portfolio.trim(),
      resumeFileName: resumeName,
      coverNote: coverNote.trim(),
    });

    setSubmittedAppRef(newApp.id);
  };

  const resetForm = () => {
    setIsApplying(false);
    setSelectedJob(null);
    setName('');
    setEmail('');
    setPhone('');
    setPortfolio('');
    setResumeName('');
    setCoverNote('');
    setSubmittedAppRef(null);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Join TECYU
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
            Build the Future of Enterprise Technology
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Work alongside experienced software engineers, architects, and AI researchers on high-impact projects. We offer competitive compensation, technical autonomy, and high learning velocity.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Culture highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-[#08152F]">Engineering-First Culture</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              We value clean code, strong architectural foundations, and modern tools over bureaucratic red tape.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-[#08152F]">Flexible Working</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Hybrid and remote options supported, with core headquarters in Hanumangarh Junction, Rajasthan.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-[#08152F]">Continuous Growth</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Budget for technical certifications, conference attendance, and access to modern AI compute infrastructure.
            </p>
          </div>
        </div>

        {/* Job Openings */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#08152F]">Current Open Roles</h2>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="font-semibold text-[#2563EB]">{job.department}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.employmentType}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#08152F]">{job.title}</h3>

                  <div className="text-xs text-slate-600">
                    <span>Experience required: {job.experience}</span>
                    {job.salaryRange && <span className="ml-3 text-emerald-600 font-medium">({job.salaryRange})</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    View & Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application / Job Detail Modal */}
      {isApplying && selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={resetForm}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedAppRef ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#08152F]">Application Submitted!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for applying for <span className="font-semibold text-slate-900">{selectedJob.title}</span>. Our recruitment team has received your application. Application ID:{' '}
                  <span className="font-mono font-bold text-[#2563EB]">{submittedAppRef}</span>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#2563EB] rounded-xl"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">{selectedJob.department}</span>
                  <h2 className="text-2xl font-bold text-[#08152F] mt-1">{selectedJob.title}</h2>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{selectedJob.employmentType}</span>
                    <span>·</span>
                    <span>{selectedJob.location}</span>
                    <span>·</span>
                    <span>Deadline: {selectedJob.deadline}</span>
                  </div>
                </div>

                {/* Job Info */}
                <div className="space-y-4 text-xs text-slate-700 bg-[#F5F8FC] p-4 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-[#08152F] mb-1.5">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                      {selectedJob.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#08152F] mb-1.5">Qualifications & Experience:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                      {selectedJob.qualifications.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Application Form */}
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <h3 className="text-sm font-bold text-[#08152F] border-b border-slate-100 pb-2">
                    Submit Your Application
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vikram@example.com"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98290 00000"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">GitHub / Portfolio URL</label>
                      <input
                        type="url"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  {/* Resume Upload simulated input */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">Resume / CV (PDF or DOC) *</label>
                    <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <UploadCloud className="w-6 h-6 text-[#2563EB] mx-auto mb-1" />
                      <div className="text-xs text-slate-700 font-medium">
                        {resumeName ? (
                          <span className="text-[#2563EB] font-bold">{resumeName} (Selected)</span>
                        ) : (
                          <span>Click to browse and upload resume</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Maximum file size 10MB</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">Brief Cover Note</label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Highlight relevant projects or technologies..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!resumeName}
                      className="px-6 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
