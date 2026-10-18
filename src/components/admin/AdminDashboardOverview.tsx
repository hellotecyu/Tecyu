import React from 'react';
import { db } from '../../lib/database';
import {
  Users,
  Layers,
  FolderGit2,
  FileText,
  Briefcase,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardOverviewProps {
  onNavigateModule: (module: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ onNavigateModule }) => {
  const inquiries = db.getInquiries();
  const services = db.getServices();
  const projects = db.getProjects();
  const blogs = db.getBlogs();
  const applications = db.getApplications();

  const totalInquiries = inquiries.length;
  const newLeads = inquiries.filter((i) => i.status === 'New').length;
  const wonDeals = inquiries.filter((i) => i.status === 'Won').length;
  const closedOrWon = inquiries.filter((i) => i.status === 'Won' || i.status === 'Closed').length;
  const conversionRate = totalInquiries > 0 ? Math.round((wonDeals / totalInquiries) * 100) : 0;

  const publishedServices = services.filter((s) => s.isPublished).length;
  const publishedProjects = projects.filter((p) => p.isPublished).length;
  const publishedBlogs = blogs.filter((b) => b.isPublished).length;

  const upcomingFollowups = inquiries.filter((i) => i.followUpDate);

  const statusCounts: Record<string, number> = {
    New: inquiries.filter((i) => i.status === 'New').length,
    Contacted: inquiries.filter((i) => i.status === 'Contacted').length,
    Qualified: inquiries.filter((i) => i.status === 'Qualified').length,
    'Proposal Sent': inquiries.filter((i) => i.status === 'Proposal Sent').length,
    Negotiation: inquiries.filter((i) => i.status === 'Negotiation').length,
    Won: wonDeals,
    Lost: inquiries.filter((i) => i.status === 'Lost').length,
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Operations & Growth Console</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time management for TECYU enterprise website, CRM pipeline, and publishing operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateModule('leads')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Manage CRM Leads ({newLeads} New)
          </button>
        </div>
      </div>

      {/* KPI Cards (Tabular figures) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Inquiries</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-[#08152F] tabular-nums">{totalInquiries}</div>
          <div className="text-[11px] text-blue-600 font-medium mt-1">{newLeads} awaiting contact</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-[#08152F] tabular-nums">{conversionRate}%</div>
          <div className="text-[11px] text-slate-500 mt-1">{wonDeals} deals won</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Published Services</span>
            <Layers className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-bold text-[#08152F] tabular-nums">{publishedServices}</div>
          <div className="text-[11px] text-slate-500 mt-1">of {services.length} configured</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Job Candidates</span>
            <Briefcase className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-[#08152F] tabular-nums">{applications.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            {applications.filter((a) => a.status === 'New').length} pending review
          </div>
        </div>
      </div>

      {/* Middle Row: Leads by Status & Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Leads by Status (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#08152F]">Lead Pipeline by Status</h2>
            <button
              onClick={() => onNavigateModule('leads')}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Open CRM Pipeline →
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(statusCounts).map(([status, count]) => {
              const percentage = totalInquiries > 0 ? Math.round((count / totalInquiries) * 100) : 0;
              return (
                <div key={status} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{status}</span>
                    <span className="font-mono text-slate-500 tabular-nums">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        status === 'New'
                          ? 'bg-blue-600'
                          : status === 'Won'
                          ? 'bg-emerald-600'
                          : status === 'Proposal Sent'
                          ? 'bg-amber-500'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scheduled Follow-ups (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#08152F]">Upcoming Follow-ups</h2>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            {upcomingFollowups.length === 0 ? (
              <div className="text-xs text-slate-400 py-6 text-center">No pending follow-ups scheduled</div>
            ) : (
              upcomingFollowups.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => onNavigateModule('leads')}
                  className="p-3 bg-[#F5F8FC] rounded-xl border border-slate-200/80 cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{lead.fullName}</span>
                    <span className="font-mono text-[11px] text-blue-600 font-semibold">{lead.followUpDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 truncate">{lead.company || lead.serviceName}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#08152F]">Recent Inquiries</h2>
            <p className="text-xs text-slate-400">Incoming inquiries from website forms</p>
          </div>
          <button
            onClick={() => onNavigateModule('leads')}
            className="text-xs font-semibold text-[#2563EB] hover:underline"
          >
            View All Inquiries →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Ref #</th>
                <th className="py-3 px-6">Client / Company</th>
                <th className="py-3 px-6">Service</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Priority</th>
                <th className="py-3 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.slice(0, 5).map((inq) => (
                <tr
                  key={inq.id}
                  onClick={() => onNavigateModule('leads')}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-6 font-mono font-medium text-blue-600">{inq.refNumber}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    {inq.fullName}
                    {inq.company && <span className="block text-[11px] text-slate-500 font-normal">{inq.company}</span>}
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">{inq.serviceName}</td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inq.status === 'New'
                          ? 'bg-blue-100 text-blue-700'
                          : inq.status === 'Won'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`text-[10px] font-semibold ${
                        inq.priority === 'Urgent'
                          ? 'text-rose-600 font-bold'
                          : inq.priority === 'High'
                          ? 'text-amber-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {inq.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right text-slate-400 font-mono text-[11px]">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
