import {
  ContactInquiry,
  ServiceItem,
  ProjectItem,
  BlogPost,
  JobOpening,
  JobApplication,
  TeamMember,
  TestimonialItem,
  SiteSettings,
  ActivityLog,
  AppNotification,
  HomepageConfig,
  LeadStatus,
  LeadPriority,
  AdminUserAccount,
  AdminSession,
} from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'tecyu_site_settings_v1',
  SERVICES: 'tecyu_services_v1',
  PROJECTS: 'tecyu_projects_v1',
  BLOGS: 'tecyu_blogs_v1',
  CAREERS: 'tecyu_careers_v1',
  APPLICATIONS: 'tecyu_applications_v1',
  INQUIRIES: 'tecyu_inquiries_v1',
  TEAM: 'tecyu_team_v1',
  TESTIMONIALS: 'tecyu_testimonials_v1',
  ACTIVITIES: 'tecyu_activities_v1',
  NOTIFICATIONS: 'tecyu_notifications_v1',
  HOMEPAGE: 'tecyu_homepage_config_v1',
  AUTH_USERS: 'tecyu_admin_users_v1',
  AUTH_SESSION: 'tecyu_admin_session_v1',
};

export const INITIAL_ADMIN_USERS: AdminUserAccount[] = [
  {
    id: 'usr-superadmin-1',
    name: 'TECYU Administrator',
    email: 'admin@tecyu.com',
    username: 'admin',
    passwordHash: 'tecyu@2026',
    role: 'super_admin',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'usr-ops-2',
    name: 'Operations Lead',
    email: 'ops@tecyu.com',
    username: 'ops',
    passwordHash: 'tecyu@2026',
    role: 'admin',
    createdAt: '2026-01-15T00:00:00.000Z',
  },
  {
    id: 'usr-content-3',
    name: 'Editorial Manager',
    email: 'editor@tecyu.com',
    username: 'editor',
    passwordHash: 'tecyu@2026',
    role: 'content_editor',
    createdAt: '2026-02-01T00:00:00.000Z',
  },
  {
    id: 'usr-sales-4',
    name: 'Sales Director',
    email: 'sales@tecyu.com',
    username: 'sales',
    passwordHash: 'tecyu@2026',
    role: 'sales_manager',
    createdAt: '2026-02-15T00:00:00.000Z',
  },
  {
    id: 'usr-hr-5',
    name: 'HR & People Lead',
    email: 'hr@tecyu.com',
    username: 'hr',
    passwordHash: 'tecyu@2026',
    role: 'hr_manager',
    createdAt: '2026-03-01T00:00:00.000Z',
  },
];

// Default initial data
export const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'TECYU',
  tagline: 'Technology For You',
  secondaryTagline: 'Technology That Moves Business Forward.',
  addressLine1: 'Opp. District Collectorate, Hanumangarh Junction',
  addressLine2: 'Rajasthan – 335512, India',
  city: 'Hanumangarh',
  state: 'Rajasthan',
  pincode: '335512',
  country: 'India',
  phone: '+91 94140 00000',
  email: 'contact@tecyu.cm',
  whatsappNumber: '+919414000000',
  isWhatsAppEnabled: true,
  businessHours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13962.383188599388!2d74.3168285!3d29.5855238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3914227417578275%3A0xb35a09d3b76cf6c9!2sDistrict%20Collectorate%20Hanumangarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  linkedinUrl: 'https://linkedin.com/company/tecyu',
  twitterUrl: 'https://x.com/tecyu_tech',
  githubUrl: 'https://github.com/tecyu',
  facebookUrl: 'https://facebook.com/tecyu.tech',
  copyrightText: '© 2026 TECYU. All rights reserved. Technology That Moves Business Forward.',
  // Custom Domain Configuration
  customDomain: 'tecyu.cm',
  isDomainConnected: true,
  sslStatus: 'active',
  dnsRecords: [
    {
      type: 'A',
      host: '@',
      value: '216.239.32.21',
      ttl: '3600',
      status: 'connected',
      purpose: 'Apex Domain Routing (Google Cloud Anycast IP 1)',
    },
    {
      type: 'A',
      host: '@',
      value: '216.239.34.21',
      ttl: '3600',
      status: 'connected',
      purpose: 'Apex Domain Routing (Google Cloud Anycast IP 2)',
    },
    {
      type: 'A',
      host: '@',
      value: '216.239.36.21',
      ttl: '3600',
      status: 'connected',
      purpose: 'Apex Domain Routing (Google Cloud Anycast IP 3)',
    },
    {
      type: 'A',
      host: '@',
      value: '216.239.38.21',
      ttl: '3600',
      status: 'connected',
      purpose: 'Apex Domain Routing (Google Cloud Anycast IP 4)',
    },
    {
      type: 'CNAME',
      host: 'www',
      value: 'ghs.googlehosted.com.',
      ttl: '3600',
      status: 'connected',
      purpose: 'WWW Subdomain Redirection',
    },
    {
      type: 'TXT',
      host: '@',
      value: 'google-site-verification=TECYU_CloudRun_Security_Token_2026',
      ttl: '3600',
      status: 'verified',
      purpose: 'Domain Ownership Verification',
    },
  ],
  ga4Id: '',
  gtmId: '',
  metaPixelId: '',
};

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  heroHeading: 'Transform Your Business with Smart Technology.',
  heroSubheading:
    'From powerful websites and custom software to AI-driven automation and digital marketing, TECYU helps businesses innovate, scale, and succeed.',
  primaryCtaText: 'Get a Free Consultation',
  secondaryCtaText: 'Explore Our Services',
  showCapabilities: true,
  showServices: true,
  showWhyUs: true,
  showProcess: true,
  showProjects: true,
  showAiSpotlight: true,
  showTestimonials: true,
  showBlog: true,
  showContactCta: true,
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'website-development',
    title: 'Website Development',
    category: 'Web Engineering',
    shortDescription:
      'High-performance corporate portals, custom web applications, e-commerce stores, and headless architectures engineered for speed, conversion, and global reach.',
    longDescription:
      'TECYU engineers fast, responsive, and secure web platforms tailored to your business model. From corporate identities to sophisticated web platforms with complex user flows, we deliver pixel-perfect digital experiences built on modern web standards.',
    iconName: 'Globe',
    features: [
      'Corporate & Enterprise Websites',
      'High-converting Landing Pages',
      'Headless CMS & Custom Portals',
      'Progressive Web Apps (PWAs)',
      'Enterprise WordPress & Webflow Deployments',
      'Performance Optimization & Core Web Vitals < 2.5s',
      'Ongoing SLA-Backed Maintenance & Redesign',
    ],
    benefits: [
      'Measurable SEO gains with semantic code architecture',
      'Rapid loading times boosting user engagement and conversions',
      'Total responsive fluidity across mobile, tablet, and desktop',
      'Enterprise-grade security preventing common web vulnerabilities',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vite', 'GraphQL'],
    methodology: [
      { step: '01', title: 'UX Research & Wireframing', description: 'User journeys, site architecture, and low-fidelity prototypes.' },
      { step: '02', title: 'Component Engineering', description: 'Clean TypeScript frontend code backed by modular design systems.' },
      { step: '03', title: 'Performance Audit', description: 'Rigorous testing for speed, mobile responsiveness, and SEO compliance.' },
      { step: '04', title: 'Deployment & CI/CD', description: 'Zero-downtime deployment pipelines with proactive security monitoring.' },
    ],
    faqs: [
      { question: 'How long does a custom web development project take?', answer: 'Typical corporate websites take 2 to 4 weeks, while complex web applications with custom backends generally range from 6 to 12 weeks.' },
      { question: 'Will our team be able to update content independently?', answer: 'Yes. We integrate intuitive content management controls allowing your marketing team to edit pages, publish blogs, and modify media without coding.' },
    ],
    isFeaturedHome: true,
    isPublished: true,
    displayOrder: 1,
    metaTitle: 'Custom Website Development Services | TECYU',
    metaDescription: 'Scalable, high-performance web development and web application engineering for modern enterprises by TECYU.',
  },
  {
    id: 'srv-2',
    slug: 'software-development',
    title: 'Custom Software Development',
    category: 'Enterprise Engineering',
    shortDescription:
      'Purpose-built enterprise software, ERP, CRM, inventory, and automated billing solutions designed to eliminate operational bottlenecks and streamline operations.',
    longDescription:
      'Off-the-shelf software rarely fits complex business logic. TECYU builds proprietary software solutions that digitize workflows, sync multi-branch operations, and provide executives with real-time operational transparency.',
    iconName: 'Code',
    features: [
      'Custom ERP & Enterprise Operations Platforms',
      'Sales & Service CRM Systems',
      'Multi-warehouse Inventory Management',
      'Automated Billing, Invoicing & GST Compliance',
      'Human Resource Management Systems (HRMS)',
      'Multi-tenant SaaS Product Engineering',
      'Role-Based Access Control (RBAC) & Audit Trails',
    ],
    benefits: [
      'Elimination of manual spreadsheets and repetitive human data entry',
      'Consolidated multi-department operational data in one unified dashboard',
      'Tailored business logic that scales seamlessly with company expansion',
      'Complete intellectual property ownership with no recurring per-seat fees',
    ],
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'React', 'TypeScript'],
    methodology: [
      { step: '01', title: 'Process Mapping', description: 'Deep audit of existing workflows, forms, handoffs, and data structures.' },
      { step: '02', title: 'Database & Schema Architecture', description: 'High-integrity relational models ensuring ACID compliance and query speed.' },
      { step: '03', title: 'Agile Sprint Implementation', description: 'Bi-weekly deployable increments with continuous stakeholder feedback.' },
      { step: '04', title: 'Data Migration & Staff Training', description: 'Seamless migration of historical records and comprehensive staff onboarding.' },
    ],
    faqs: [
      { question: 'Can you migrate our legacy Excel and desktop databases?', answer: 'Yes, our team specializes in schema translation, data cleansing, and zero-loss migration into modern PostgreSQL databases.' },
      { question: 'How do you ensure data security for proprietary enterprise data?', answer: 'We enforce field-level encryption, rigorous Role-Based Access Control, audit logs, and regular automated backup routines.' },
    ],
    isFeaturedHome: true,
    isPublished: true,
    displayOrder: 2,
    metaTitle: 'Custom Software Development & ERP Solutions | TECYU',
    metaDescription: 'Tailor-made business software, ERP systems, CRMs, and automated workflow engines designed to accelerate operational velocity.',
  },
  {
    id: 'srv-3',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'Mobile Engineering',
    shortDescription:
      'Native iOS, Android, and cross-platform Flutter/React Native mobile applications delivering fluid 60 FPS interactions, offline reliability, and secure payments.',
    longDescription:
      'We design and engineer mobile applications that users love and trust. From on-demand customer platforms to internal workforce companion apps, we ensure high responsiveness, battery efficiency, and flawless store compliance.',
    iconName: 'Smartphone',
    features: [
      'Android Native Development (Kotlin)',
      'iOS Native Development (Swift)',
      'Cross-Platform Flutter & React Native Solutions',
      'Offline-First Local Storage & Auto-Sync',
      'Push Notification Automation & In-App Messaging',
      'Biometric Authentication & Secure Keychains',
      'App Store & Google Play Store Submission Management',
    ],
    benefits: [
      'Direct, real-time channel for customer engagement and loyalty',
      'High performance with smooth 60fps animations and transitions',
      'Field-tested offline support for reliable remote work execution',
      'Streamlined updates via automated over-the-air deployment pipelines',
    ],
    technologies: ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Firebase', 'REST APIs'],
    methodology: [
      { step: '01', title: 'Mobile UX Prototyping', description: 'Interactive clickable Figma flows optimized for thumb-reach zones.' },
      { step: '02', title: 'Cross-Platform Build', description: 'Reusable business logic paired with platform-specific native hooks.' },
      { step: '03', title: 'Device Lab Testing', description: 'Validation across varying screen sizes, OS versions, and network speeds.' },
      { step: '04', title: 'Store Publishing & Launch', description: 'Guaranteed compliance with Apple App Store and Google Play guidelines.' },
    ],
    faqs: [
      { question: 'Should we build cross-platform or native?', answer: 'For 90% of business applications, Flutter or React Native cuts development time in half while delivering near-native 60fps performance.' },
    ],
    isFeaturedHome: true,
    isPublished: true,
    displayOrder: 3,
    metaTitle: 'Mobile App Development (iOS & Android) | TECYU',
    metaDescription: 'Fast, secure, and user-centric iOS and Android apps engineered with Flutter, React Native, and native toolchains.',
  },
  {
    id: 'srv-4',
    slug: 'artificial-intelligence-solutions',
    title: 'Artificial Intelligence Solutions',
    category: 'AI & Automation',
    shortDescription:
      'Enterprise AI agents, domain-specific chatbots, automated document extraction, predictive analytics, and private LLM workflow integrations.',
    longDescription:
      'Empower your company with purpose-driven artificial intelligence. TECYU integrates custom AI agents that automate customer inquiries, parse complex PDFs/invoices in seconds, and extract predictive signals from your proprietary data.',
    iconName: 'Sparkles',
    features: [
      'Autonomous Business AI Agents for repetitive tasks',
      'Conversational AI Chatbots with CRM context integration',
      'Intelligent Document & Invoice OCR Extraction',
      'Retrieval-Augmented Generation (RAG) over private knowledge bases',
      'Predictive Lead Scoring & Churn Forecasting Models',
      'Automated Workflow Pipelines & Smart Triage',
      'Data Privacy Guardrails & Local/Private Model Deployments',
    ],
    benefits: [
      'Up to 80% reduction in manual document handling and support triage time',
      '24/7 immediate customer resolution with contextual domain intelligence',
      'Zero risk of hallucination through rigorous grounded retrieval systems',
      'Complete sovereignty over sensitive company files and customer data',
    ],
    technologies: ['Python', 'OpenAI', 'Gemini Models', 'LangChain', 'LlamaIndex', 'Vector DBs (Pinecone/pgvector)', 'FastAPI'],
    methodology: [
      { step: '01', title: 'Feasibility & Data Audit', description: 'Identifying high-ROI workflows and verifying clean ground-truth training data.' },
      { step: '02', title: 'RAG Pipeline & Guardrails', description: 'Indexing company documents with semantic chunking and strict safety filters.' },
      { step: '03', title: 'Agent Integration', description: 'Connecting LLM reasoning outputs into existing CRMs and ERP action queues.' },
      { step: '04', title: 'Continuous Evaluation', description: 'Monitoring accuracy, latency, and token economics with automated benchmarks.' },
    ],
    faqs: [
      { question: 'Is our sensitive company data shared with public AI models?', answer: 'Never. We deploy private enterprise endpoints with zero-data-retention agreements or self-hosted open-weights models within your secure VPC.' },
      { question: 'How quickly can an AI chatbot be deployed?', answer: 'A custom RAG-powered customer knowledge assistant can be operational in under two weeks.' },
    ],
    isFeaturedHome: true,
    isPublished: true,
    displayOrder: 4,
    metaTitle: 'Enterprise AI Agents & Automation Solutions | TECYU',
    metaDescription: 'Accelerate business efficiency with autonomous AI agents, intelligent document extraction, RAG assistants, and workflow automation.',
  },
  {
    id: 'srv-5',
    slug: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    category: 'Growth & Acquisition',
    shortDescription:
      'Data-driven Search Engine Optimization, targeted Google & Meta ad campaigns, local SEO, content distribution, and conversion rate optimization.',
    longDescription:
      'We combine technical precision with persuasive strategy. Our marketing team builds sustainable acquisition engines that place your brand in front of high-intent buyers, driving verified inbound inquiries and predictable revenue.',
    iconName: 'TrendingUp',
    features: [
      'Technical & On-Page Search Engine Optimization (SEO)',
      'High-Intent Google Search & Display Ad Campaigns',
      'Meta (Facebook & Instagram) Targeted Lead Funnels',
      'Local Business SEO & Google Maps Profile Domination',
      'Conversion Rate Optimization (CRO) & A/B Testing',
      'B2B LinkedIn Outreach & Account-Based Marketing',
      'Full-Funnel Attribution Analytics & Executive Dashboards',
    ],
    benefits: [
      'Lower cost-per-acquisition (CPA) through granular keyword negative lists',
      'First-page organic search rankings for revenue-driving search terms',
      'Transparent reporting with clear revenue return on ad spend (ROAS)',
      'Continuous conversion rate improvements through systematic A/B tests',
    ],
    technologies: ['Google Ads', 'Meta Ads Manager', 'Google Analytics 4', 'Ahrefs', 'SEMrush', 'Search Console'],
    methodology: [
      { step: '01', title: 'Market & Competitor Analysis', description: 'Auditing keyword gaps, competitor traffic sources, and conversion funnels.' },
      { step: '02', title: 'Technical SEO Foundation', description: 'Rectifying crawl errors, site architecture, and schema structured data.' },
      { step: '03', title: 'Campaign Architecture', description: 'Setting up high-intent ad sets with tailored landing page matching.' },
      { step: '04', title: 'Scale & Attribution', description: 'Reallocating spend to winning ad sets and optimizing down-funnel deal closures.' },
    ],
    faqs: [
      { question: 'How soon can we expect results from SEO?', answer: 'Technical fixes yield crawl improvements within weeks; competitive organic keyword rankings typically compound significantly between months 3 and 6.' },
    ],
    isFeaturedHome: true,
    isPublished: true,
    displayOrder: 5,
    metaTitle: 'Digital Marketing, Performance Ads & SEO Services | TECYU',
    metaDescription: 'Drive measurable business growth with targeted search ads, technical SEO, social media marketing, and conversion optimization.',
  },
  {
    id: 'srv-6',
    slug: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    category: 'Commerce Engineering',
    shortDescription:
      'Scalable Shopify, WooCommerce, and headless e-commerce architectures with seamless multi-currency payment gateways and inventory sync.',
    longDescription:
      'From boutique brands to high-volume multi-brand retailers, TECYU designs conversion-optimized online storefronts with lightning-fast checkout experiences, automated logistics integration, and multi-channel inventory control.',
    iconName: 'ShoppingBag',
    features: [
      'Shopify Plus & Custom Shopify Theme Development',
      'Headless Commerce using Next.js & Commerce APIs',
      'WooCommerce Scalable Architectures',
      'Payment Gateway Integrations (Razorpay, Stripe, Cashfree)',
      'Multi-Warehouse Inventory & Courier Logistics Sync (Shiprocket)',
      'Abandoned Cart Recovery & Automated Retargeting',
      'Custom B2B Wholesale Portals with Tiered Pricing',
    ],
    benefits: [
      'Sub-2 second page loads reducing cart abandonment rates',
      'Automated order synchronization eliminating dispatch errors',
      'Safe, frictionless checkout across UPI, cards, and net banking',
      'Effortless catalog management supporting tens of thousands of SKUs',
    ],
    technologies: ['Shopify Liquid', 'Next.js', 'WooCommerce', 'Stripe', 'Razorpay', 'Tailwind CSS'],
    methodology: [
      { step: '01', title: 'Catalog Architecture', description: 'Structuring product categories, filters, variant matrices, and bundle rules.' },
      { step: '02', title: 'Checkout & UX Design', description: 'Single-page checkout optimization with one-click payment flows.' },
      { step: '03', title: 'Gateway & ERP Sync', description: 'Integrating webhooks with warehouse software and tax calculation services.' },
      { step: '04', title: 'Peak Load Testing', description: 'Stress-testing servers to handle flash sale traffic surges without downtime.' },
    ],
    faqs: [
      { question: 'Do you support Indian payment methods like UPI and RuPay?', answer: 'Yes, our integrations natively support PhonePe, Google Pay, Paytm, credit/debit cards, and NetBanking with instant reconciliation.' },
    ],
    isFeaturedHome: false,
    isPublished: true,
    displayOrder: 6,
    metaTitle: 'Enterprise E-commerce Development & Optimization | TECYU',
    metaDescription: 'High-converting online stores, Shopify platforms, and custom commerce solutions built for seamless transactions.',
  },
  {
    id: 'srv-7',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps Infrastructure',
    category: 'Infrastructure',
    shortDescription:
      'Robust AWS, GCP, and Azure cloud migrations, automated CI/CD deployment pipelines, containerization, and 99.9% uptime architectures.',
    longDescription:
      'Ensure your digital applications stay fast, resilient, and secure under any traffic volume. TECYU architects cloud infrastructure that auto-scales with demand, guards against outages, and slashes cloud bill inefficiencies.',
    iconName: 'Cloud',
    features: [
      'Cloud Architecture & Migration (AWS, Google Cloud, Azure)',
      'Docker Containerization & Kubernetes Orchestration',
      'Automated CI/CD Pipelines (GitHub Actions, GitLab)',
      'Infrastructure as Code (Terraform)',
      'Database Clustering, Replication & Point-in-Time Backups',
      '24/7 Health Monitoring, APM & Incident Response',
      'Cloud Cost Optimization & Right-Sizing Audits',
    ],
    benefits: [
      'Guaranteed 99.9% application uptime with multi-AZ failovers',
      'Instant zero-downtime software releases through automated pipelines',
      '30% to 50% cloud cost reduction by eliminating over-provisioned resources',
      'Comprehensive disaster recovery plans with sub-15 minute RTO/RPO',
    ],
    technologies: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'PostgreSQL', 'Nginx'],
    methodology: [
      { step: '01', title: 'Cloud Infrastructure Audit', description: 'Mapping security vulnerabilities, latency bottlenecks, and spending leaks.' },
      { step: '02', title: 'IaC Provisioning', description: 'Declarative Terraform definitions guaranteeing reproducible cloud states.' },
      { step: '03', title: 'Pipeline Automation', description: 'Enforcing automated unit test gates, container builds, and staging environments.' },
      { step: '04', title: 'SLA Monitoring', description: 'Configuring Grafana and Prometheus alerts for immediate anomaly detection.' },
    ],
    faqs: [
      { question: 'Can you migrate our on-premise servers to the cloud?', answer: 'Yes, we handle end-to-end data transfer, networking setup, and DNS transition with zero business interruption.' },
    ],
    isFeaturedHome: false,
    isPublished: true,
    displayOrder: 7,
    metaTitle: 'Cloud Solutions & DevOps Engineering | TECYU',
    metaDescription: 'Scalable AWS and GCP architectures, automated deployment pipelines, and enterprise disaster recovery systems.',
  },
  {
    id: 'srv-8',
    slug: 'ui-ux-design',
    title: 'UI/UX Design & Design Systems',
    category: 'Design & Experience',
    shortDescription:
      'Human-centered digital design, interactive Figma prototypes, accessible design systems, and product ergonomics that captivate users.',
    longDescription:
      'We turn complex technical logic into clear, intuitive visual interfaces. Our design process combines rigorous cognitive psychology, user journey mapping, and brand identity to craft experiences that drive deep user retention.',
    iconName: 'Palette',
    features: [
      'User Research & Competitor Benchmarking',
      'Wireframing & Interactive Figma Prototyping',
      'Comprehensive Design Systems & Component Libraries',
      'SaaS Dashboard & Complex Data Visualization Design',
      'Mobile App UI/UX (iOS Human Interface & Material 3)',
      'Accessibility Audits & WCAG 2.2 AA Compliance',
      'Micro-Interactions & Motion Design Specifications',
    ],
    benefits: [
      'Drastically reduced training curves for internal enterprise tools',
      'Elevated brand credibility that commands premium market positioning',
      'Accelerated engineering handoffs via production-ready Figma tokens',
      'Increased conversion metrics across signups, onboarding, and checkouts',
    ],
    technologies: ['Figma', 'FigJam', 'Tokens Studio', 'Adobe CC', 'CSS3/SVG'],
    methodology: [
      { step: '01', title: 'Discovery & User Interviews', description: 'Uncovering pain points, user personas, and core job-to-be-done.' },
      { step: '02', title: 'Information Architecture', description: 'Mapping navigation hierarchy, mental models, and content layout.' },
      { step: '03', title: 'High-Fidelity Interface Design', description: 'Applying typographic scales, refined color palettes, and component states.' },
      { step: '04', title: 'Interactive Prototype Testing', description: 'Validating usability with real stakeholders before coding begins.' },
    ],
    faqs: [
      { question: 'Do we receive the Figma source files upon completion?', answer: 'Yes, you receive complete ownership of all organized Figma libraries, design tokens, and exported assets.' },
    ],
    isFeaturedHome: false,
    isPublished: true,
    displayOrder: 8,
    metaTitle: 'UI/UX Design & Enterprise Product Systems | TECYU',
    metaDescription: 'Intuitive user interface and user experience design for web applications, SaaS dashboards, and mobile platforms.',
  },
  {
    id: 'srv-9',
    slug: 'api-system-integration',
    title: 'API & System Integration',
    category: 'System Architecture',
    shortDescription:
      'Secure REST/GraphQL API architectures, payment gateway links, CRM/ERP bridges, and automated data pipelines connecting legacy systems.',
    longDescription:
      'Break down data silos. TECYU engineers resilient middleware, microservices, and webhook pipelines that allow your diverse software platforms—finance, CRM, warehouse, and customer web apps—to communicate in real time.',
    iconName: 'Cpu',
    features: [
      'Custom RESTful & GraphQL API Development',
      'Payment Gateway Integration (Razorpay, Stripe, PayPal)',
      'Salesforce, HubSpot & Zoho CRM Two-Way Sync',
      'SAP, Tally & Custom ERP Database Connectors',
      'Secure OAuth 2.0 & Token Authentication Gateways',
      'Real-Time Webhook Processing with Idempotency',
      'Third-Party Logistics (3PL) & SMS/WhatsApp API Integrations',
    ],
    benefits: [
      'Real-time data synchronization across all corporate platforms',
      'Zero manual copy-pasting between disparate software tools',
      'High throughput with queuing mechanisms preventing transaction drops',
      'Bank-grade TLS encryption and cryptographic signature verification',
    ],
    technologies: ['Node.js', 'Express', 'Python', 'Redis', 'Kafka/RabbitMQ', 'PostgreSQL', 'Swagger'],
    methodology: [
      { step: '01', title: 'API Contract Specification', description: 'Designing OpenAPI 3.0 schemas with strict input validation.' },
      { step: '02', title: 'Middleware Architecture', description: 'Constructing rate-limiting, authentication, and error-handling layers.' },
      { step: '03', title: 'Queue & Retry Logic', description: 'Configuring dead-letter queues to gracefully handle third-party timeouts.' },
      { step: '04', title: 'Load Simulation', description: 'Verifying sub-100ms response times under concurrent request loads.' },
    ],
    faqs: [
      { question: 'Can you integrate our website with Tally ERP?', answer: 'Yes, we have proven connectors that securely sync web orders, GST tax heads, and payments into Tally in real time.' },
    ],
    isFeaturedHome: false,
    isPublished: true,
    displayOrder: 9,
    metaTitle: 'API Development & Enterprise System Integration | TECYU',
    metaDescription: 'Connect your business software seamlessly with robust REST APIs, payment gateways, CRM links, and ERP connectors.',
  },
  {
    id: 'srv-10',
    slug: 'it-consulting',
    title: 'IT Consulting & Tech Modernization',
    category: 'Strategy & Advisory',
    shortDescription:
      'Strategic digital transformation roadmaps, legacy codebase refactoring, security audits, and software architecture advisory for executives.',
    longDescription:
      'Navigate technological disruption with confidence. Our senior architects advise business leaders on selecting the right tech stack, upgrading legacy monolithic systems, hardening cybersecurity posture, and scaling engineering teams.',
    iconName: 'ShieldCheck',
    features: [
      'Digital Transformation Strategic Roadmaps',
      'Legacy Codebase & Monolith Modernization',
      'Cybersecurity & Infrastructure Vulnerability Audits',
      'Software Architecture & Database Scaling Advisory',
      'Vendor & Off-the-Shelf Software Evaluation',
      'Data Privacy & Compliance Governance',
      'CTO-as-a-Service & Technical Advisory',
    ],
    benefits: [
      'Avoid costly software purchasing errors and technical dead-ends',
      'Actionable modernization blueprint with minimized operational risk',
      'Strengthened security posture protecting sensitive corporate IP',
      'Clear technological alignment with long-term commercial goals',
    ],
    technologies: ['Architecture Reviews', 'Penetration Testing', 'Cloud Well-Architected Framework', 'OWASP Top 10'],
    methodology: [
      { step: '01', title: 'Comprehensive IT Audit', description: 'Examining existing codebases, hosting infrastructure, and workflows.' },
      { step: '02', title: 'Gap & Risk Analysis', description: 'Identifying single points of failure, security risks, and cost sinks.' },
      { step: '03', title: 'Executive Roadmap', description: 'Delivering prioritized milestones with cost projections and ROI forecasts.' },
      { step: '04', title: 'Implementation Oversight', description: 'Guiding internal teams or vendor partners to ensure architectural fidelity.' },
    ],
    faqs: [
      { question: 'Do you offer ongoing fractional CTO advisory?', answer: 'Yes, our senior technical leadership is available on a monthly advisory retainer for strategic decision-making and architectural oversight.' },
    ],
    isFeaturedHome: false,
    isPublished: true,
    displayOrder: 10,
    metaTitle: 'Strategic IT Consulting & Digital Transformation | TECYU',
    metaDescription: 'Executive technology consulting, software architecture advisory, cybersecurity audits, and digital transformation roadmaps.',
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    slug: 'apex-logistics-supply-chain-erp',
    title: 'Multi-Hub Supply Chain & Fleet ERP',
    client: 'Apex Global Logistics',
    industry: 'Logistics',
    serviceCategory: 'Custom Software Development',
    description: 'Centralized enterprise operating system managing 14 regional distribution hubs, real-time GPS tracking for 350+ commercial vehicles, and automated freight billing.',
    challenge: 'The client struggled with disconnected Excel spreadsheets across 14 logistics centers, causing billing discrepancies, delayed vehicle dispatching, and frequent manual data errors.',
    solution: 'TECYU engineered a custom multi-tenant cloud ERP with real-time telematics integration, automated GST freight invoicing, driver mobile apps, and instant gate-pass generation.',
    verifiedResults: [
      '+165% Order Processing Velocity across regional hubs',
      '3.2x Faster Invoice Reconciliation & Payment Collection',
      '99.98% High Availability Uptime over 18 operating months',
      'Zero manual data reconciliation errors reported',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    liveUrl: 'https://tecyu.cm/portfolio/apex-logistics',
    thumbnailGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    isFeatured: true,
    isPublished: true,
    completionDate: 'November 2025',
  },
  {
    id: 'proj-2',
    slug: 'medivault-healthcare-patient-portal',
    title: 'HIPAA-Ready Telemedicine & Diagnostic Portal',
    client: 'MediVault Health Systems',
    industry: 'Healthcare',
    serviceCategory: 'Website Development',
    description: 'High-security digital health platform enabling electronic prescription issuance, lab report dispatching, and tele-consultation appointment booking for 45,000 active patients.',
    challenge: 'Patients faced fragmented booking experiences and diagnostic report delivery delays, while clinic receptionists spent over 5 hours daily manually confirming appointments over phone calls.',
    solution: 'Designed and deployed a fast, accessible web portal integrated with WhatsApp notification APIs, encrypted medical records storage, and automated doctor calendar synchronizations.',
    verifiedResults: [
      '45,000+ Verified Patient Consultations scheduled online',
      '78% Reduction in Patient Waiting Hall queues',
      'Sub-1.2s Page Load Speed across low-bandwidth 4G mobile devices',
      'Full Compliance with Electronic Health Records security standards',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Twilio API'],
    liveUrl: 'https://tecyu.cm/portfolio/medivault',
    thumbnailGradient: 'from-cyan-950 via-slate-900 to-sky-950',
    isFeatured: true,
    isPublished: true,
    completionDate: 'January 2026',
  },
  {
    id: 'proj-3',
    slug: 'cognix-intelligent-invoice-automation',
    title: 'Autonomous Financial Document AI Agent',
    client: 'Cognix Financial Services',
    industry: 'Professional Services',
    serviceCategory: 'Artificial Intelligence Solutions',
    description: 'Intelligent multi-format document extraction agent parsing supplier invoices, bank statements, and tax receipts into structured accounting ledgers with human-in-the-loop review.',
    challenge: 'A team of 18 accounts executives manually keyed in 15,000+ supplier invoices every month, resulting in a 4-day processing backlog and human transcription mistakes.',
    solution: 'Constructed a custom LLM vision and OCR pipeline with confidence threshold scoring, automated variance detection, and one-click direct sync into corporate ERP ledgers.',
    verifiedResults: [
      '84% Reduction in Manual Data Entry labor hours',
      '99.4% Field Extraction Accuracy on complex multi-line invoices',
      'Processing time dropped from 4 days to 45 seconds per batch',
      '$180,000 Annualized Operating Expense savings',
    ],
    techStack: ['Python', 'FastAPI', 'Gemini Models', 'LangChain', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://tecyu.cm/portfolio/cognix-ai',
    thumbnailGradient: 'from-indigo-950 via-blue-900 to-slate-950',
    isFeatured: true,
    isPublished: true,
    completionDate: 'February 2026',
  },
  {
    id: 'proj-4',
    slug: 'urbankraft-d2c-commerce-platform',
    title: 'High-Scale Omnichannel E-commerce Architecture',
    client: 'UrbanKraft Lifestyle Retail',
    industry: 'Retail & E-commerce',
    serviceCategory: 'E-commerce Solutions',
    description: 'Custom Shopify Plus storefront with bespoke product customization 3D visualizer, automated courier dispatching, and multi-currency checkout.',
    challenge: 'The brand suffered from slow checkout performance and inventory mismatches during festive flash sales, causing high drop-off rates and customer support complaints.',
    solution: 'Built a headless storefront optimized for mobile Core Web Vitals, integrated with Shiprocket logistics and Razorpay payment webhooks with automated inventory locking.',
    verifiedResults: [
      '+52% Increase in Mobile Checkout Conversion Rate',
      '1.4s Average LCP Score during 10,000 concurrent user flash sale',
      '-38% Drop in Cart Abandonment Rate within first 90 days',
      'Over 250,000 Products dispatched without inventory discrepancy',
    ],
    techStack: ['Shopify Plus', 'Next.js', 'Tailwind CSS', 'Razorpay', 'Shiprocket API'],
    liveUrl: 'https://tecyu.cm/portfolio/urbankraft',
    thumbnailGradient: 'from-slate-900 via-blue-950 to-neutral-900',
    isFeatured: false,
    isPublished: true,
    completionDate: 'August 2025',
  },
  {
    id: 'proj-5',
    slug: 'propstream-real-estate-crm',
    title: 'Real Estate Lead Pipeline & Broker Network App',
    client: 'PropStream Realty Group',
    industry: 'Real Estate',
    serviceCategory: 'Mobile App Development',
    description: 'Cross-platform mobile application for property agents, virtual 360-degree tour integration, site-visit scheduling, and automated commission tracking.',
    challenge: 'Site visit leads were regularly dropped due to lack of automated agent assignment and no real-time notification mechanism when prospects requested property viewings.',
    solution: 'Engineered a Flutter mobile application paired with a centralized backend dispatch system, instant WhatsApp prospect alerts, and automated follow-up calendar integrations.',
    verifiedResults: [
      '3.4x Faster Lead Response Time (from 4 hours to under 7 minutes)',
      '12,000+ Verified Site Visits tracked and closed through app',
      '4.9 Star Rating on Google Play across 2,400 broker reviews',
    ],
    techStack: ['Flutter', 'Node.js', 'PostgreSQL', 'Google Cloud', 'Firebase'],
    liveUrl: 'https://tecyu.cm/portfolio/propstream',
    thumbnailGradient: 'from-blue-900 via-slate-900 to-cyan-950',
    isFeatured: false,
    isPublished: true,
    completionDate: 'October 2025',
  },
  {
    id: 'proj-6',
    slug: 'edusphere-learning-management-system',
    title: 'Cloud Campus & Assessment Platform',
    client: 'EduSphere Academy',
    industry: 'Education',
    serviceCategory: 'Custom Software Development',
    description: 'Comprehensive school and college management system with live interactive lectures, proctored examinations, fee collection, and student analytics.',
    challenge: 'Manual attendance and offline paper examinations required weeks of staff grading time and created administrative delays in report card distribution.',
    solution: 'Architected a cloud-based education platform supporting real-time online quizzes, automatic grading, fee gateway integration, and parent SMS alerts.',
    verifiedResults: [
      '18,000+ Enrolled Students across 6 institutional campuses',
      '100% Elimination of paper-based examination grading delays',
      'Automated parent fee reminders resulting in 94% on-time fee recovery',
    ],
    techStack: ['React', 'Express', 'PostgreSQL', 'AWS S3', 'Razorpay'],
    liveUrl: 'https://tecyu.cm/portfolio/edusphere',
    thumbnailGradient: 'from-slate-950 via-blue-950 to-slate-900',
    isFeatured: false,
    isPublished: true,
    completionDate: 'December 2025',
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'building-enterprise-ai-agents-with-rag',
    title: 'Building Enterprise AI Agents: Beyond Simple Chatbots to Real Business Impact',
    excerpt: 'How leading organizations are moving past generic prompt engineering to deploy secure, private RAG pipelines that automate complex internal workflows.',
    content: `Artificial intelligence is undergoing a critical transition from novelty to tangible business infrastructure. While 2023 was dominated by experimental chatbots, modern enterprises are now deploying **autonomous AI agents** capable of executing multi-step business logic across databases, CRMs, and ERP systems.

### The Shift from Generic Prompts to Grounded Knowledge
When an enterprise deploys an AI solution, two risks dominate executive discussions: hallucination and data privacy. Generic models trained on public web text lack context regarding proprietary contracts, pricing schedules, or technical operating procedures.

Retrieval-Augmented Generation (RAG) resolves this by grounding the language model in your company's verified documents:
1. **Semantic Chunking:** Ingesting PDF manuals, policy files, and SQL schemas into dense vector embeddings.
2. **Hybrid Search:** Combining keyword BM25 retrieval with dense vector similarity to locate the exact clause or financial entry.
3. **Strict Context Windows:** Instructing the model to synthesize answers strictly based on retrieved evidence, accompanied by citation links.

### Tangible Business Outcomes
Companies adopting private enterprise agents are witnessing measurable throughput acceleration:
- Customer support triage response times dropping from 45 minutes to 30 seconds.
- Complex invoice reconciliation cycles shrinking from 4 business days to under a minute.
- Elimination of repetitive manual keying across financial ledgers.

At TECYU, our engineering philosophy prioritizes private deployments where customer data never leaves secure VPC boundaries.`,
    category: 'Artificial Intelligence',
    tags: ['AI Agents', 'Enterprise RAG', 'Automation', 'Python', 'LLM Security'],
    authorName: 'Engineering Team',
    authorRole: 'TECYU Labs',
    readTime: '6 min read',
    isPublished: true,
    publishedAt: 'March 18, 2026',
    metaTitle: 'Building Enterprise AI Agents with RAG | TECYU Insights',
    metaDescription: 'A technical guide to implementing autonomous AI agents and grounded retrieval pipelines for enterprise workflow automation.',
  },
  {
    id: 'blog-2',
    slug: 'why-custom-software-outperforms-off-the-shelf-erp',
    title: 'Why Growing Enterprises Outgrow Generic SaaS and Invest in Custom ERPs',
    excerpt: 'Analyzing the true total cost of ownership: monthly per-seat licensing fees versus custom-engineered software designed around your competitive advantage.',
    content: `When a business begins scaling past 50 employees, operational complexity compounds exponentially. Disparate subscription software tools often start creating friction: sales teams update one CRM, warehouse staff use another desktop inventory software, and accountants manage invoicing on separate offline systems.

### The Hidden Tax of Generic SaaS
1. **Per-Seat License Bloat:** Paying recurring monthly fees for hundreds of users across 6 different tools quickly drains capital.
2. **Workaround Culture:** Employees spend hours exporting CSVs from one software to manually reformat and import them into another.
3. **Rigid Workflows:** Off-the-shelf software forces your unique operations into a generic cookie-cutter model, diluting the competitive edge that made your business successful.

### The Custom Software Advantage
Building a tailored software platform with TECYU delivers:
- **Unified Single Source of Truth:** Multi-branch inventory, client billing, staff commissions, and operational telemetry in one clean interface.
- **Zero Per-Seat Fees:** You own the software and database; adding 500 new employees does not increase your software licensing cost.
- **Strict Role-Based Access Control:** Granular permission flags ensuring team members only access information relevant to their station.

Investing in tailored digital infrastructure builds proprietary enterprise value that compounds year after year.`,
    category: 'Software Engineering',
    tags: ['ERP Architecture', 'Custom Software', 'SaaS', 'Business Scalability'],
    authorName: 'Solutions Architecture',
    authorRole: 'TECYU Enterprise Group',
    readTime: '5 min read',
    isPublished: true,
    publishedAt: 'March 02, 2026',
    metaTitle: 'Custom Software vs Generic SaaS for Scaling Enterprises | TECYU',
    metaDescription: 'Discover why leading companies invest in proprietary ERPs to eliminate per-seat licensing fees and unify operational workflows.',
  },
  {
    id: 'blog-3',
    slug: 'mastering-core-web-vitals-and-high-conversion-architecture',
    title: 'Engineering for Sub-Second Web Performance: The Direct Link to Revenue',
    excerpt: 'How modern frontend architectures like Next.js and Vite achieve sub-second LCP scores and convert high-intent visitors into verified customers.',
    content: `In modern digital commerce, speed is not merely an engineering metric—it is the direct catalyst of revenue conversion. Independent research consistently proves that every 100-millisecond improvement in website loading speed correlates with up to a 7% increase in conversion rates.

### The Three Critical Pillars of Modern Web Engineering
1. **Largest Contentful Paint (LCP < 2.5s):** Ensuring primary hero visuals and typographic headlines render almost instantaneously through responsive WebP/SVG formatting and pre-warmed edge CDNs.
2. **Interaction to Next Paint (INP < 200ms):** Eliminating heavy JavaScript main-thread blocking by utilizing fine-grained reactive state hooks and minimal external tracking baggage.
3. **Cumulative Layout Shift (CLS < 0.1):** Enforcing explicit aspect ratios on all visual containers and reserving typography font display slots to eliminate visual jank during asset loading.

At TECYU, every website we deliver undergoes automated Lighthouse audits to guarantee top-tier organic search visibility and frictionless user retention.`,
    category: 'Web Development',
    tags: ['Web Performance', 'Core Web Vitals', 'Frontend Engineering', 'Next.js'],
    authorName: 'Frontend Practice',
    authorRole: 'TECYU Web Group',
    readTime: '4 min read',
    isPublished: true,
    publishedAt: 'February 14, 2026',
    metaTitle: 'Mastering Core Web Vitals & Web Performance | TECYU Insights',
    metaDescription: 'Learn how modern frontend engineering principles deliver sub-second loading speeds and directly amplify business conversions.',
  },
];

export const INITIAL_CAREERS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (React & Node.js)',
    slug: 'senior-full-stack-engineer',
    department: 'Engineering',
    employmentType: 'Full-time',
    location: 'Hanumangarh Junction / Hybrid / Remote',
    experience: '3+ Years',
    salaryRange: 'Competitive based on experience',
    qualifications: [
      'Strong proficiency in TypeScript, React, Next.js, and Node.js/Express.',
      'Demonstrated experience architecting PostgreSQL relational schemas and RESTful APIs.',
      'Familiarity with Docker containerization, CI/CD pipelines, and cloud deployments on AWS/GCP.',
      'Strong eye for clean UI code, responsive design, and performance optimization.',
    ],
    responsibilities: [
      'Lead end-to-end feature development for enterprise web applications and custom client ERPs.',
      'Write modular, well-documented TypeScript code with rigorous automated unit tests.',
      'Collaborate directly with UI/UX designers and project managers on sprint deliverables.',
      'Mentor junior engineers through code reviews and architectural discussions.',
    ],
    deadline: 'April 30, 2026',
    isPublished: true,
    createdAt: '2026-03-01',
  },
  {
    id: 'job-2',
    title: 'AI Solutions Engineer (Python, RAG & LLMs)',
    slug: 'ai-solutions-engineer',
    department: 'AI & Automation',
    employmentType: 'Full-time',
    location: 'Hanumangarh Junction / Hybrid / Remote',
    experience: '2+ Years',
    salaryRange: 'Competitive based on experience',
    qualifications: [
      'Hands-on experience implementing RAG architectures with LangChain, LlamaIndex, or native vector stores.',
      'Proficiency in Python, FastAPI, and data manipulation libraries.',
      'Deep understanding of model evaluation, hallucination suppression, and prompt security.',
      'Experience integrating AI agents with enterprise database backends.',
    ],
    responsibilities: [
      'Design, build, and optimize private AI agents and document extraction pipelines.',
      'Implement semantic search and vector embeddings over structured and unstructured business documents.',
      'Conduct rigorous accuracy and latency benchmarks for production deployments.',
    ],
    deadline: 'May 15, 2026',
    isPublished: true,
    createdAt: '2026-03-05',
  },
  {
    id: 'job-3',
    title: 'UI/UX & Product Designer',
    slug: 'ui-ux-product-designer',
    department: 'Design',
    employmentType: 'Full-time',
    location: 'Hanumangarh Junction / Hybrid / Remote',
    experience: '2+ Years',
    salaryRange: 'Competitive based on experience',
    qualifications: [
      'Exceptional portfolio showcasing web portals, SaaS dashboards, and mobile app interfaces.',
      'Mastery of Figma, design systems, typography hierarchies, and interactive prototyping.',
      'Deep understanding of user ergonomics, accessibility guidelines (WCAG 2.2), and conversion-centered design.',
    ],
    responsibilities: [
      'Create high-fidelity wireframes, interactive prototypes, and design tokens for web and mobile products.',
      'Conduct stakeholder interviews and user testing sessions to iterate on product usability.',
      'Partner closely with frontend engineers to ensure design implementation fidelity.',
    ],
    deadline: 'April 20, 2026',
    isPublished: true,
    createdAt: '2026-03-10',
  },
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (React & Node.js)',
    applicantName: 'Vikramaditya Sharma',
    applicantEmail: 'vikram.sharma.dev@gmail.com',
    applicantPhone: '+91 98290 12345',
    portfolioUrl: 'https://github.com/vikram-fullstack',
    resumeFileName: 'Vikram_Sharma_FullStack_Resume.pdf',
    coverNote: 'I have 4 years of hands-on experience building multi-tenant SaaS dashboards and PostgreSQL backends. Excited by TECYU’s focus on enterprise ERPs.',
    status: 'Shortlisted',
    interviewNotes: 'Strong knowledge of ACID transactions and React component architecture. Technical interview round scheduled for Thursday 3 PM.',
    submittedAt: '2026-03-28T10:15:00Z',
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'AI Solutions Engineer (Python, RAG & LLMs)',
    applicantName: 'Priya Rathore',
    applicantEmail: 'priya.rathore.ai@outlook.com',
    applicantPhone: '+91 94142 88990',
    portfolioUrl: 'https://github.com/priya-rathore-ml',
    resumeFileName: 'Priya_Rathore_AI_Engineer.pdf',
    coverNote: 'Experienced in developing private vector retrieval pipelines and OCR document extraction using FastAPI and LangChain.',
    status: 'Reviewing',
    interviewNotes: 'Reviewing GitHub repository on custom invoice OCR parser.',
    submittedAt: '2026-04-02T14:30:00Z',
  },
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-101',
    refNumber: 'TEC-2026-8901',
    fullName: 'Rajesh Meena',
    email: 'rajesh.meena@rajasthan-agri.in',
    mobile: '+91 98291 55667',
    company: 'AgroFresh Multi-State Co-op',
    serviceId: 'srv-2',
    serviceName: 'Custom Software Development',
    budget: '$5,000 - $10,000',
    timeline: '1-2 Months',
    message: 'We require a centralized inventory and billing software for 8 procurement centers in Rajasthan with offline billing sync and automated SMS receipts.',
    consentPrivacy: true,
    status: 'Proposal Sent',
    priority: 'High',
    assignedTo: 'Lead Architect',
    estimatedValue: 7500,
    followUpDate: '2026-04-18',
    notes: [
      { id: 'n-1', author: 'Admin', text: 'Conducted 45-minute discovery call. Detailed requirements document shared.', createdAt: '2026-04-05T11:00:00Z' },
      { id: 'n-2', author: 'Admin', text: 'Proposal and technical scope v1.2 dispatched via email.', createdAt: '2026-04-08T16:20:00Z' },
    ],
    activityHistory: [
      { id: 'a-1', action: 'Lead Created', actor: 'System', timestamp: '2026-04-05T09:12:00Z', details: 'Form submission via website' },
      { id: 'a-2', action: 'Status Changed', actor: 'Admin', timestamp: '2026-04-08T16:20:00Z', details: 'Changed from Qualified to Proposal Sent' },
    ],
    createdAt: '2026-04-05T09:12:00Z',
  },
  {
    id: 'inq-102',
    refNumber: 'TEC-2026-8902',
    fullName: 'Amanpreet Singh',
    email: 'aman@nordicdigital.se',
    mobile: '+46 70 123 4567',
    company: 'Nordic Mobility AB',
    serviceId: 'srv-4',
    serviceName: 'Artificial Intelligence Solutions',
    budget: '$10,000+',
    timeline: '2-3 Months',
    message: 'Looking to build an autonomous fleet maintenance intelligence assistant that digests vehicle telemetry and triggers proactive mechanic job orders.',
    consentPrivacy: true,
    status: 'Contacted',
    priority: 'Urgent',
    assignedTo: 'AI Practice Lead',
    estimatedValue: 18000,
    followUpDate: '2026-04-16',
    notes: [
      { id: 'n-3', author: 'Admin', text: 'Initial scoping call booked for Friday 4 PM CET.', createdAt: '2026-04-10T12:00:00Z' },
    ],
    activityHistory: [
      { id: 'a-3', action: 'Lead Created', actor: 'System', timestamp: '2026-04-10T08:44:00Z', details: 'Website inquiry' },
    ],
    createdAt: '2026-04-10T08:44:00Z',
  },
  {
    id: 'inq-103',
    refNumber: 'TEC-2026-8903',
    fullName: 'Dr. Sunita Kapoor',
    email: 'dr.sunita@lifelinecare.org',
    mobile: '+91 94140 22334',
    company: 'LifeLine Hospital & Trauma Center',
    serviceId: 'srv-1',
    serviceName: 'Website Development',
    budget: '$2,500 - $5,000',
    timeline: 'Within 1 Month',
    message: 'Need a modern, fast, mobile-responsive hospital website with doctor appointment scheduling and downloadable lab test reports.',
    consentPrivacy: true,
    status: 'New',
    priority: 'Medium',
    assignedTo: 'Web Lead',
    estimatedValue: 3500,
    notes: [],
    activityHistory: [
      { id: 'a-4', action: 'Lead Created', actor: 'System', timestamp: '2026-04-12T15:20:00Z', details: 'Contact form submission' },
    ],
    createdAt: '2026-04-12T15:20:00Z',
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'P. C. Maya',
    role: 'Founder & Principal Technologist',
    bio: 'Pioneering technology solutions and digital modernization for Indian enterprises and international clients with over a decade of systems architecture expertise.',
    avatarGradient: 'from-blue-700 to-cyan-500',
    linkedinUrl: 'https://linkedin.com',
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: 'team-2',
    name: 'Arjun Vardhan',
    role: 'Head of Enterprise Engineering',
    bio: 'Specializing in resilient distributed systems, PostgreSQL scaling, and mission-critical ERP backends for supply chain and manufacturing operations.',
    avatarGradient: 'from-slate-700 to-blue-900',
    githubUrl: 'https://github.com',
    displayOrder: 2,
    isPublished: true,
  },
  {
    id: 'team-3',
    name: 'Sneha Chawla',
    role: 'Lead AI & Automation Architect',
    bio: 'Specialized in private enterprise RAG deployments, autonomous business agents, and high-precision document OCR extraction pipelines.',
    avatarGradient: 'from-cyan-600 to-indigo-700',
    linkedinUrl: 'https://linkedin.com',
    displayOrder: 3,
    isPublished: true,
  },
  {
    id: 'team-4',
    name: 'Mohit Khurana',
    role: 'Design Director & UX Strategist',
    bio: 'Championing cognitive ergonomics, design token architectures, and conversion-optimized user flows across complex web and mobile platforms.',
    avatarGradient: 'from-blue-600 to-teal-500',
    linkedinUrl: 'https://linkedin.com',
    displayOrder: 4,
    isPublished: true,
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Sanjay Bishnoi',
    designation: 'Managing Director',
    company: 'Apex Global Logistics Pvt. Ltd.',
    location: 'Rajasthan, India',
    rating: 5,
    quote: 'TECYU replaced our chaotic network of Excel sheets with an exceptionally fast multi-hub ERP. Our vehicle dispatch and billing speeds increased by over 160% within the first month. The software reliability is world-class.',
    verifiedOutcome: '+165% dispatch velocity across 14 logistics hubs',
    isApproved: true,
    isFeatured: true,
  },
  {
    id: 'test-2',
    clientName: 'Dr. Vivek Singhal',
    designation: 'Medical Superintendent',
    company: 'MediVault Health Systems',
    location: 'New Delhi, India',
    rating: 5,
    quote: 'The patient portal engineered by TECYU transformed how our diagnostic centers operate. Patients get instant WhatsApp notifications with their secure lab reports, saving our staff hundreds of phone hours every week.',
    verifiedOutcome: '45,000+ scheduled consultations with sub-1.2s loading speeds',
    isApproved: true,
    isFeatured: true,
  },
  {
    id: 'test-3',
    clientName: 'Henrik Lindqvist',
    designation: 'Head of Technology Operations',
    company: 'Cognix Financial Solutions',
    location: 'Stockholm, Sweden',
    rating: 5,
    quote: 'TECYU’s artificial intelligence team built a custom invoice extraction pipeline that achieved 99.4% accuracy across diverse invoice formats. They are disciplined, transparent, and technically brilliant engineers.',
    verifiedOutcome: '84% drop in manual document processing labor hours',
    isApproved: true,
    isFeatured: true,
  },
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  { id: 'act-1', actor: 'P. C. Maya', role: 'Super Admin', action: 'Published New Service', target: 'Artificial Intelligence Solutions', timestamp: '2026-04-14T09:30:00Z' },
  { id: 'act-2', actor: 'Admin', role: 'Admin', action: 'Updated Lead Status', target: 'TEC-2026-8901 (AgroFresh)', timestamp: '2026-04-14T11:15:00Z' },
  { id: 'act-3', actor: 'HR Manager', role: 'HR Manager', action: 'Shortlisted Candidate', target: 'Vikramaditya Sharma for Senior Full Stack', timestamp: '2026-04-14T14:45:00Z' },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New High-Priority Inquiry',
    message: 'Amanpreet Singh (Nordic Mobility AB) submitted an enterprise AI inquiry ($10,000+).',
    type: 'inquiry',
    isRead: false,
    createdAt: '2026-04-14T08:44:00Z',
    link: '/admin/leads?id=inq-102',
  },
  {
    id: 'notif-2',
    title: 'New Candidate Application',
    message: 'Priya Rathore submitted application for AI Solutions Engineer position.',
    type: 'application',
    isRead: false,
    createdAt: '2026-04-14T14:30:00Z',
    link: '/admin/careers',
  },
  {
    id: 'notif-3',
    title: 'Follow-up Due Soon',
    message: 'Proposal follow-up with AgroFresh Multi-State Co-op scheduled for April 18.',
    type: 'reminder',
    isRead: true,
    createdAt: '2026-04-13T10:00:00Z',
    link: '/admin/leads?id=inq-101',
  },
];

// Database helper functions with LocalStorage persistence
class LocalDatabase {
  private get<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultVal;
      return JSON.parse(data) as T;
    } catch {
      return defaultVal;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch storage event for cross-component sync
      window.dispatchEvent(new Event('tecyu_db_change'));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  // Site Settings
  getSettings(): SiteSettings {
    return this.get<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }
  updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.set(STORAGE_KEYS.SETTINGS, updated);
    this.logActivity('Admin', 'Admin', 'Updated Business Settings', 'Site Information');
    return updated;
  }
  resetSettings(): SiteSettings {
    this.set(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    return INITIAL_SETTINGS;
  }

  // Homepage Config
  getHomepageConfig(): HomepageConfig {
    return this.get<HomepageConfig>(STORAGE_KEYS.HOMEPAGE, INITIAL_HOMEPAGE_CONFIG);
  }
  updateHomepageConfig(config: Partial<HomepageConfig>): HomepageConfig {
    const current = this.getHomepageConfig();
    const updated = { ...current, ...config };
    this.set(STORAGE_KEYS.HOMEPAGE, updated);
    this.logActivity('Admin', 'Admin', 'Updated Homepage Layout', 'Homepage Sections');
    return updated;
  }

  // Services
  getServices(): ServiceItem[] {
    return this.get<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }
  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.getServices().find((s) => s.slug === slug);
  }
  saveService(service: ServiceItem): ServiceItem {
    const services = this.getServices();
    const index = services.findIndex((s) => s.id === service.id);
    if (index >= 0) {
      services[index] = service;
    } else {
      services.push(service);
    }
    this.set(STORAGE_KEYS.SERVICES, services);
    this.logActivity('Admin', 'Admin', index >= 0 ? 'Updated Service' : 'Created Service', service.title);
    return service;
  }
  deleteService(id: string): void {
    const services = this.getServices().filter((s) => s.id !== id);
    this.set(STORAGE_KEYS.SERVICES, services);
    this.logActivity('Admin', 'Admin', 'Deleted Service', `ID: ${id}`);
  }

  // Projects
  getProjects(): ProjectItem[] {
    return this.get<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  }
  getProjectBySlug(slug: string): ProjectItem | undefined {
    return this.getProjects().find((p) => p.slug === slug);
  }
  saveProject(project: ProjectItem): ProjectItem {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.unshift(project);
    }
    this.set(STORAGE_KEYS.PROJECTS, projects);
    this.logActivity('Admin', 'Admin', index >= 0 ? 'Updated Portfolio Project' : 'Created Portfolio Project', project.title);
    return project;
  }
  deleteProject(id: string): void {
    const projects = this.getProjects().filter((p) => p.id !== id);
    this.set(STORAGE_KEYS.PROJECTS, projects);
    this.logActivity('Admin', 'Admin', 'Deleted Portfolio Project', `ID: ${id}`);
  }

  // Blog Posts
  getBlogs(): BlogPost[] {
    return this.get<BlogPost[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
  }
  getBlogBySlug(slug: string): BlogPost | undefined {
    return this.getBlogs().find((b) => b.slug === slug);
  }
  saveBlog(blog: BlogPost): BlogPost {
    const blogs = this.getBlogs();
    const index = blogs.findIndex((b) => b.id === blog.id);
    if (index >= 0) {
      blogs[index] = blog;
    } else {
      blogs.unshift(blog);
    }
    this.set(STORAGE_KEYS.BLOGS, blogs);
    this.logActivity('Admin', 'Content Editor', index >= 0 ? 'Updated Blog Post' : 'Published Blog Post', blog.title);
    return blog;
  }
  deleteBlog(id: string): void {
    const blogs = this.getBlogs().filter((b) => b.id !== id);
    this.set(STORAGE_KEYS.BLOGS, blogs);
    this.logActivity('Admin', 'Content Editor', 'Deleted Blog Post', `ID: ${id}`);
  }

  // Careers & Job Applications
  getCareers(): JobOpening[] {
    return this.get<JobOpening[]>(STORAGE_KEYS.CAREERS, INITIAL_CAREERS);
  }
  saveCareer(job: JobOpening): JobOpening {
    const careers = this.getCareers();
    const index = careers.findIndex((j) => j.id === job.id);
    if (index >= 0) {
      careers[index] = job;
    } else {
      careers.unshift(job);
    }
    this.set(STORAGE_KEYS.CAREERS, careers);
    this.logActivity('HR Manager', 'HR Manager', index >= 0 ? 'Updated Job Vacancy' : 'Posted Job Vacancy', job.title);
    return job;
  }
  deleteCareer(id: string): void {
    const careers = this.getCareers().filter((j) => j.id !== id);
    this.set(STORAGE_KEYS.CAREERS, careers);
    this.logActivity('HR Manager', 'HR Manager', 'Deleted Job Vacancy', `ID: ${id}`);
  }

  getApplications(): JobApplication[] {
    return this.get<JobApplication[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }
  submitApplication(app: Omit<JobApplication, 'id' | 'status' | 'submittedAt'>): JobApplication {
    const applications = this.getApplications();
    const newApp: JobApplication = {
      ...app,
      id: `app-${Date.now()}`,
      status: 'New',
      submittedAt: new Date().toISOString(),
    };
    applications.unshift(newApp);
    this.set(STORAGE_KEYS.APPLICATIONS, applications);

    // Create Notification
    this.addNotification({
      title: 'New Job Application Received',
      message: `${newApp.applicantName} applied for ${newApp.jobTitle}`,
      type: 'application',
      link: '/admin/careers',
    });

    return newApp;
  }
  updateApplicationStatus(id: string, status: JobApplication['status'], notes?: string): void {
    const applications = this.getApplications();
    const target = applications.find((a) => a.id === id);
    if (target) {
      target.status = status;
      if (notes !== undefined) target.interviewNotes = notes;
      this.set(STORAGE_KEYS.APPLICATIONS, applications);
      this.logActivity('HR Manager', 'HR Manager', 'Updated Candidate Status', `${target.applicantName} -> ${status}`);
    }
  }

  // Inquiries & CRM Leads
  getInquiries(): ContactInquiry[] {
    return this.get<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  }
  getInquiryById(id: string): ContactInquiry | undefined {
    return this.getInquiries().find((i) => i.id === id);
  }
  submitInquiry(
    inquiryData: Omit<ContactInquiry, 'id' | 'refNumber' | 'status' | 'priority' | 'notes' | 'activityHistory' | 'createdAt'>
  ): ContactInquiry {
    const inquiries = this.getInquiries();
    const refNumber = `TEC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      refNumber,
      status: 'New',
      priority: inquiryData.budget?.includes('10,000') ? 'High' : 'Medium',
      notes: [],
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          action: 'Inquiry Submitted',
          actor: 'Website Visitor',
          timestamp: new Date().toISOString(),
          details: 'Direct form submission',
        },
      ],
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry);
    this.set(STORAGE_KEYS.INQUIRIES, inquiries);

    // Notification
    this.addNotification({
      title: 'New Business Inquiry',
      message: `${newInquiry.fullName} (${newInquiry.company || 'Individual'}) inquired about ${newInquiry.serviceName} (${refNumber})`,
      type: 'inquiry',
      link: `/admin/leads?id=${newInquiry.id}`,
    });

    return newInquiry;
  }

  updateLeadStatus(id: string, status: LeadStatus, priority?: LeadPriority, assignedTo?: string): void {
    const inquiries = this.getInquiries();
    const lead = inquiries.find((i) => i.id === id);
    if (lead) {
      const oldStatus = lead.status;
      lead.status = status;
      if (priority) lead.priority = priority;
      if (assignedTo !== undefined) lead.assignedTo = assignedTo;

      lead.activityHistory.unshift({
        id: `act-${Date.now()}`,
        action: 'Status Updated',
        actor: 'Admin',
        timestamp: new Date().toISOString(),
        details: `Status changed from ${oldStatus} to ${status}`,
      });

      this.set(STORAGE_KEYS.INQUIRIES, inquiries);
      this.logActivity('Admin', 'Sales Manager', 'Updated Lead Status', `${lead.refNumber} -> ${status}`);
    }
  }

  addLeadNote(id: string, text: string, author: string = 'Admin'): void {
    const inquiries = this.getInquiries();
    const lead = inquiries.find((i) => i.id === id);
    if (lead) {
      lead.notes.unshift({
        id: `note-${Date.now()}`,
        author,
        text,
        createdAt: new Date().toISOString(),
      });
      lead.activityHistory.unshift({
        id: `act-${Date.now()}`,
        action: 'Note Added',
        actor: author,
        timestamp: new Date().toISOString(),
        details: text.slice(0, 60) + (text.length > 60 ? '...' : ''),
      });
      this.set(STORAGE_KEYS.INQUIRIES, inquiries);
    }
  }

  updateLeadFollowup(id: string, followUpDate: string, estimatedValue?: number): void {
    const inquiries = this.getInquiries();
    const lead = inquiries.find((i) => i.id === id);
    if (lead) {
      lead.followUpDate = followUpDate;
      if (estimatedValue !== undefined) lead.estimatedValue = estimatedValue;
      lead.activityHistory.unshift({
        id: `act-${Date.now()}`,
        action: 'Follow-up Scheduled',
        actor: 'Admin',
        timestamp: new Date().toISOString(),
        details: `Follow-up set for ${followUpDate}`,
      });
      this.set(STORAGE_KEYS.INQUIRIES, inquiries);
    }
  }

  deleteLead(id: string): void {
    const inquiries = this.getInquiries().filter((i) => i.id !== id);
    this.set(STORAGE_KEYS.INQUIRIES, inquiries);
    this.logActivity('Admin', 'Sales Manager', 'Deleted Lead Record', `ID: ${id}`);
  }

  // Team
  getTeam(): TeamMember[] {
    return this.get<TeamMember[]>(STORAGE_KEYS.TEAM, INITIAL_TEAM);
  }
  saveTeamMember(member: TeamMember): TeamMember {
    const team = this.getTeam();
    const index = team.findIndex((t) => t.id === member.id);
    if (index >= 0) {
      team[index] = member;
    } else {
      team.push(member);
    }
    this.set(STORAGE_KEYS.TEAM, team);
    this.logActivity('Admin', 'Admin', index >= 0 ? 'Updated Team Member' : 'Added Team Member', member.name);
    return member;
  }
  deleteTeamMember(id: string): void {
    const team = this.getTeam().filter((t) => t.id !== id);
    this.set(STORAGE_KEYS.TEAM, team);
    this.logActivity('Admin', 'Admin', 'Deleted Team Member', `ID: ${id}`);
  }

  // Testimonials
  getTestimonials(): TestimonialItem[] {
    return this.get<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  }
  saveTestimonial(testimonial: TestimonialItem): TestimonialItem {
    const list = this.getTestimonials();
    const index = list.findIndex((t) => t.id === testimonial.id);
    if (index >= 0) {
      list[index] = testimonial;
    } else {
      list.unshift(testimonial);
    }
    this.set(STORAGE_KEYS.TESTIMONIALS, list);
    this.logActivity('Admin', 'Admin', index >= 0 ? 'Updated Testimonial' : 'Added Testimonial', testimonial.clientName);
    return testimonial;
  }
  deleteTestimonial(id: string): void {
    const list = this.getTestimonials().filter((t) => t.id !== id);
    this.set(STORAGE_KEYS.TESTIMONIALS, list);
    this.logActivity('Admin', 'Admin', 'Deleted Testimonial', `ID: ${id}`);
  }

  // Activity Logs
  getActivities(): ActivityLog[] {
    return this.get<ActivityLog[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  }
  logActivity(actor: string, role: string, action: string, target: string): void {
    const activities = this.getActivities();
    activities.unshift({
      id: `act-${Date.now()}`,
      actor,
      role,
      action,
      target,
      timestamp: new Date().toISOString(),
    });
    // Keep last 150 entries
    if (activities.length > 150) activities.length = 150;
    this.set(STORAGE_KEYS.ACTIVITIES, activities);
  }

  // Notifications
  getNotifications(): AppNotification[] {
    return this.get<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }
  addNotification(notif: Omit<AppNotification, 'id' | 'isRead' | 'createdAt'>): void {
    const notifications = this.getNotifications();
    notifications.unshift({
      ...notif,
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    });
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }
  markNotificationAsRead(id: string): void {
    const notifications = this.getNotifications();
    const target = notifications.find((n) => n.id === id);
    if (target) {
      target.isRead = true;
      this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }
  }
  markAllNotificationsRead(): void {
    const notifications = this.getNotifications().map((n) => ({ ...n, isRead: true }));
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  // Admin Authentication & Session Management
  getAdminUsers(): AdminUserAccount[] {
    return this.get<AdminUserAccount[]>(STORAGE_KEYS.AUTH_USERS, INITIAL_ADMIN_USERS);
  }

  authenticate(identifier: string, password: string): { success: boolean; user?: AdminUserAccount; error?: string } {
    const cleanId = identifier.trim().toLowerCase();
    const users = this.getAdminUsers();

    const user = users.find(
      (u) => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId
    );

    if (!user) {
      this.logActivity('Security System', 'System', 'Failed Admin Login Attempt', `Unknown account: ${identifier}`);
      return { success: false, error: 'Invalid email/username or password.' };
    }

    if (user.passwordHash !== password.trim()) {
      this.logActivity(user.name, user.role, 'Failed Admin Login Attempt', 'Incorrect password entered');
      return { success: false, error: 'Invalid email/username or password.' };
    }

    // Update lastLogin
    user.lastLogin = new Date().toISOString();
    this.set(STORAGE_KEYS.AUTH_USERS, users);

    // Create session
    const session: AdminSession = {
      token: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      loginTime: new Date().toISOString(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };

    this.setSession(session);
    this.logActivity(user.name, user.role, 'Admin Login Successful', 'Authenticated session initialized');

    return { success: true, user };
  }

  getSession(): AdminSession | null {
    const session = this.get<AdminSession | null>(STORAGE_KEYS.AUTH_SESSION, null);
    if (!session) return null;
    if (session.expiresAt && Date.now() > session.expiresAt) {
      this.clearSession();
      return null;
    }
    return session;
  }

  setSession(session: AdminSession): void {
    this.set(STORAGE_KEYS.AUTH_SESSION, session);
    window.dispatchEvent(new Event('tecyu_auth_change'));
  }

  clearSession(): void {
    const currentSession = this.getSession();
    if (currentSession) {
      this.logActivity(currentSession.user.name, currentSession.user.role, 'Admin Logout', 'Session terminated');
    }
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    window.dispatchEvent(new Event('tecyu_auth_change'));
  }

  updateAdminPassword(userId: string, newPassword: string): boolean {
    const users = this.getAdminUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) return false;

    user.passwordHash = newPassword;
    this.set(STORAGE_KEYS.AUTH_USERS, users);
    this.logActivity(user.name, user.role, 'Password Updated', 'Admin account credentials modified');
    return true;
  }

  updateAdminUser(userId: string, data: Partial<AdminUserAccount>): boolean {
    const users = this.getAdminUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return false;

    users[index] = { ...users[index], ...data };
    this.set(STORAGE_KEYS.AUTH_USERS, users);
    return true;
  }

  // Complete DB Reset
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.BLOGS);
    localStorage.removeItem(STORAGE_KEYS.CAREERS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.HOMEPAGE);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USERS);
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    window.dispatchEvent(new Event('tecyu_db_change'));
  }
}

export const db = new LocalDatabase();
