import React, { useState } from 'react';
import { db } from '../../lib/database';
import { MapPin, Mail, Phone, Clock, MessageSquare, CheckCircle2, Shield, Send, UploadCloud } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const settings = db.getSettings();
  const services = db.getServices().filter((s) => s.isPublished);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
  const [serviceId, setServiceId] = useState(services[0]?.id || 'srv-1');
  const [budget, setBudget] = useState('$5,000 - $10,000');
  const [timeline, setTimeline] = useState('1-2 Months');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [consentPrivacy, setConsentPrivacy] = useState(true);

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!fullName.trim() || !email.trim() || !mobile.trim() || !description.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!consentPrivacy) {
      setErrorMsg('Please agree to the privacy policy to submit.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedServiceObj = services.find((s) => s.id === serviceId);
      const newLead = db.submitInquiry({
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        company: company.trim(),
        serviceId: serviceId,
        serviceName: selectedServiceObj ? selectedServiceObj.title : 'Custom IT Service',
        budget,
        timeline,
        message: description.trim(),
        attachmentName: attachmentName || undefined,
        consentPrivacy: true,
      });

      setSubmittedRef(newLead.refNumber);
      setIsSubmitting(false);
    } catch (err) {
      setErrorMsg('An error occurred submitting your inquiry. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFullName('');
    setEmail('');
    setMobile('');
    setCompany('');
    setDescription('');
    setAttachmentName('');
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Initiate Conversation
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
            Contact TECYU
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Discuss your software architecture, custom ERP roadmap, AI automation, or digital marketing goals with our solutions engineers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (5 cols): Office details, Google Maps embed */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#08152F] mb-4">Corporate Office & Contact</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We work with enterprises across India, Scandinavia, the US, and the Middle East, with engineering headquarters based in Rajasthan.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#08152F]">Office Address</div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    <strong>TECYU</strong>
                    <br />
                    {settings.addressLine1}
                    <br />
                    {settings.addressLine2}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#08152F]">Direct Inquiries</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    <a href={`mailto:${settings.email}`} className="text-[#2563EB] hover:underline font-medium">
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#08152F]">Phone & WhatsApp</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    <a href={`tel:${settings.phone}`} className="hover:text-slate-900">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#08152F]">Business Hours</div>
                  <div className="text-xs text-slate-600 mt-0.5">{settings.businessHours}</div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs h-64 bg-slate-100">
              <iframe
                title="TECYU Location - District Collectorate Hanumangarh Junction"
                src={settings.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column (7 cols): Full 10-Field Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-8 shadow-md">
            {submittedRef ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#08152F]">Inquiry Successfully Registered</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to TECYU. Your project inquiry reference number is:
                </p>
                <div className="inline-block px-5 py-2.5 bg-blue-50 border border-blue-200 rounded-xl font-mono text-base font-bold text-[#2563EB]">
                  {submittedRef}
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  A designated Solutions Architect will analyze your brief and respond with technical recommendations within 1 business day.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-[#08152F]">Project Inquiry & Consultation</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your project requirements below. Fields marked with an asterisk (*) are mandatory.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
                    {errorMsg}
                  </div>
                )}

                {/* 1. Full Name & 2. Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      1. Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rameshwar Patel"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      2. Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rameshwar@company.com"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                {/* 3. Mobile Number & 4. Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      3. Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 94140 00000"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      4. Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Patel Logistics Pvt. Ltd."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                {/* 5. Service Interested In */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    5. Service Interested In *
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Estimated Project Budget & 7. Project Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      6. Estimated Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                    >
                      <option value="Under $2,500">Under $2,500</option>
                      <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000+">$25,000+ Enterprise Scope</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      7. Target Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                    >
                      <option value="Immediate / Critical">Immediate (&lt; 2 Weeks)</option>
                      <option value="1-2 Months">1–2 Months</option>
                      <option value="2-3 Months">2–3 Months</option>
                      <option value="3+ Months">3+ Months / Strategic</option>
                    </select>
                  </div>
                </div>

                {/* 8. Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    8. Project Description & Objectives *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your current bottlenecks, target user personas, technical integrations, or desired system features..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                {/* 9. Attachment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    9. Attachment (RFP, Wireframes, or Specifications - Optional)
                  </label>
                  <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center hover:bg-slate-50 transition-colors relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                      <UploadCloud className="w-4 h-4 text-[#2563EB]" />
                      <span>{attachmentName ? attachmentName : 'Attach PDF, DOC, or image file'}</span>
                    </div>
                  </div>
                </div>

                {/* 10. Consent */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentPrivacy}
                      onChange={(e) => setConsentPrivacy(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span>
                      10. I consent to TECYU storing my contact details solely for responding to this technical inquiry in accordance with the{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('privacy')}
                        className="text-[#2563EB] underline"
                      >
                        Privacy Policy
                      </button>
                      . *
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Registering Inquiry...' : 'Submit Project Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
