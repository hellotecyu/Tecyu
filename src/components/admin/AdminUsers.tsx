import React from 'react';
import { Shield, Check, X } from 'lucide-react';
import { UserRole } from '../../types';

export const AdminUsers: React.FC = () => {
  const roles: { role: UserRole; title: string; description: string; permissions: string[] }[] = [
    {
      role: 'super_admin',
      title: 'Super Administrator',
      description: 'Unrestricted system access, user permissions management, and core database provisioning.',
      permissions: ['All System Permissions', 'User Role Management', 'Financial Valuation', 'Database Reset', 'Global SEO & Settings'],
    },
    {
      role: 'admin',
      title: 'Administrator',
      description: 'Operational control across content, leads, careers, services, and activity auditing.',
      permissions: ['Manage Services', 'Manage Portfolio', 'Manage Leads', 'Manage Blog', 'Review Applications', 'View Activity Logs'],
    },
    {
      role: 'content_editor',
      title: 'Content Editor',
      description: 'Dedicated publishing access for blog articles, services copy, and portfolio case studies.',
      permissions: ['Manage Blog Posts', 'Edit Service Content', 'Edit Portfolio Case Studies', 'Media Library Access'],
    },
    {
      role: 'sales_manager',
      title: 'Sales & CRM Manager',
      description: 'Exclusive access to inbound inquiries, lead assignment, deal values, and client notes.',
      permissions: ['View Inquiries', 'Update Lead Status', 'Schedule Follow-ups', 'Add Client Notes', 'Export CRM Data'],
    },
    {
      role: 'hr_manager',
      title: 'HR & Recruitment Manager',
      description: 'Recruitment portal access for job opening creation, applicant screening, and interview notes.',
      permissions: ['Post Job Vacancies', 'Review Candidate Resumes', 'Update Application Status', 'Interview Feedback Notes'],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">User Roles & Permission Matrix</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Role-Based Access Control (RBAC) governance enforced across administrative modules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((r) => (
          <div key={r.role} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#08152F]">{r.title}</h3>
                <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider">{r.role}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{r.description}</p>

            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Capabilities</span>
              {r.permissions.map((perm, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
