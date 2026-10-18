export type UserRole = 'super_admin' | 'admin' | 'content_editor' | 'sales_manager' | 'hr_manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost' | 'Closed';
export type LeadPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  details?: string;
}

export interface ContactInquiry {
  id: string;
  refNumber: string;
  fullName: string;
  email: string;
  mobile: string;
  company?: string;
  serviceId: string;
  serviceName: string;
  budget?: string;
  timeline?: string;
  message: string;
  attachmentName?: string;
  consentPrivacy: boolean;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string;
  estimatedValue?: number;
  followUpDate?: string;
  notes: LeadNote[];
  activityHistory: LeadActivity[];
  createdAt: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  methodology: { step: string; title: string; description: string }[];
  faqs: ServiceFAQ[];
  isFeaturedHome: boolean;
  isPublished: boolean;
  displayOrder: number;
  metaTitle: string;
  metaDescription: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  serviceCategory: string;
  description: string;
  challenge: string;
  solution: string;
  verifiedResults: string[];
  techStack: string[];
  liveUrl?: string;
  thumbnailGradient: string;
  isFeatured: boolean;
  isPublished: boolean;
  completionDate: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  readTime: string;
  isPublished: boolean;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
}

export interface JobOpening {
  id: string;
  title: string;
  slug: string;
  department: string;
  employmentType: 'Full-time' | 'Contract' | 'Remote' | 'Hybrid';
  location: string;
  experience: string;
  salaryRange?: string;
  qualifications: string[];
  responsibilities: string[];
  deadline: string;
  isPublished: boolean;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  portfolioUrl?: string;
  resumeFileName: string;
  coverNote?: string;
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Interview Scheduled' | 'Offered' | 'Rejected';
  interviewNotes?: string;
  submittedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarGradient: string;
  linkedinUrl?: string;
  githubUrl?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  location: string;
  rating: number;
  quote: string;
  verifiedOutcome: string;
  isApproved: boolean;
  isFeatured: boolean;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  secondaryTagline: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  isWhatsAppEnabled: boolean;
  businessHours: string;
  googleMapsEmbedUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  githubUrl: string;
  facebookUrl: string;
  copyrightText: string;
  // Custom Domain & DNS
  customDomain: string;
  isDomainConnected: boolean;
  sslStatus: 'active' | 'provisioning' | 'pending';
  dnsRecords: {
    type: string;
    host: string;
    value: string;
    ttl: string;
    status: 'connected' | 'pending' | 'verified';
    purpose: string;
  }[];
  // Tracking
  ga4Id?: string;
  gtmId?: string;
  metaPixelId?: string;
}

export interface ActivityLog {
  id: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'inquiry' | 'application' | 'reminder' | 'system';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface HomepageConfig {
  heroHeading: string;
  heroSubheading: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  showCapabilities: boolean;
  showServices: boolean;
  showWhyUs: boolean;
  showProcess: boolean;
  showProjects: boolean;
  showAiSpotlight: boolean;
  showTestimonials: boolean;
  showBlog: boolean;
  showContactCta: boolean;
}
