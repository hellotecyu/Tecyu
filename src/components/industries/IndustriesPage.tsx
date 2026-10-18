import React from 'react';
import {
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Building,
  UtensilsCrossed,
  Factory,
  Truck,
  Briefcase,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (path: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  const industries = [
    {
      title: 'Healthcare & Telemedicine',
      icon: HeartPulse,
      summary: 'HIPAA-ready patient scheduling portals, electronic medical record bridges, and diagnostic report distribution.',
      deliverables: ['Patient Appointment Portals', 'Lab Report Dispatch via WhatsApp', 'Telemedicine Video Modules', 'Clinic Inventory & Pharmacy Billing'],
    },
    {
      title: 'Education & EdTech',
      icon: GraduationCap,
      summary: 'Comprehensive campus management systems, proctored examinations, parent communication, and fee gateways.',
      deliverables: ['School & University ERPs', 'Live Interactive Lecture Platforms', 'Online Fee Collection & Reconciliation', 'Student Academic Performance Dashboards'],
    },
    {
      title: 'Retail & E-commerce',
      icon: ShoppingBag,
      summary: 'High-speed headless commerce platforms, multi-currency checkout, and multi-warehouse logistics synchronization.',
      deliverables: ['Custom Shopify Plus Stores', 'Multi-Warehouse Inventory Sync', 'One-Click UPI & Card Checkouts', 'Automated Courier Label Dispatch'],
    },
    {
      title: 'Real Estate & Property',
      icon: Building,
      summary: 'Broker mobile applications, 360-degree virtual walkthroughs, lead routing, and automated site visit scheduling.',
      deliverables: ['Broker Network Mobile Apps', 'Virtual Property Tour Modules', 'Real-Time Site Visit Dispatch', 'Commission & Deal Ledger Systems'],
    },
    {
      title: 'Hospitality & Dining',
      icon: UtensilsCrossed,
      summary: 'Direct hotel reservation engines, contactless digital dining menus, guest feedback automation, and billing.',
      deliverables: ['Zero-Commission Booking Engines', 'Digital QR Ordering & KDS', 'Guest Loyalty & CRM Automation', 'Kitchen Inventory & Procurement'],
    },
    {
      title: 'Manufacturing & Plants',
      icon: Factory,
      summary: 'Production floor job tracking, raw material procurement management, machine maintenance schedules, and quality assurance.',
      deliverables: ['Shop Floor Production ERPs', 'Raw Material Inventory Control', 'Predictive Equipment Maintenance', 'Worker Shift Scheduling & Attendance'],
    },
    {
      title: 'Logistics & Supply Chain',
      icon: Truck,
      summary: 'Fleet telematics tracking, regional hub dispatching, automated freight GST billing, and driver mobile apps.',
      deliverables: ['Multi-Hub Supply Chain Portals', 'Real-Time GPS Fleet Tracking', 'Consignment Gate-Pass Generation', 'Automated Freight Invoice Generation'],
    },
    {
      title: 'Professional Services',
      icon: Briefcase,
      summary: 'Client document vaults, time-billing software, automated contract generation, and private AI document analysis.',
      deliverables: ['Secure Client Document Portals', 'Hourly & Milestone Billing Platforms', 'Autonomous Invoice OCR Extraction', 'Staff Utilization & Project Ledgers'],
    },
    {
      title: 'Startups & Emerging Tech',
      icon: Rocket,
      summary: 'Rapid MVP engineering, scalable multi-tenant SaaS architecture, and investor-ready technological foundations.',
      deliverables: ['Full-Stack MVP in 4–8 Weeks', 'Multi-Tenant Database Architectures', 'Stripe Billing & Subscription Engines', 'Zero-Downtime Cloud Auto-scaling'],
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Domain Specialization
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
            Industries We Serve
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Every industry has distinct regulatory requirements and operational friction points. TECYU delivers custom systems tailored to your sector's operational reality.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#08152F]">{ind.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ind.summary}</p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Common Solutions</div>
                    {ind.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Discuss Your Sector Needs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
