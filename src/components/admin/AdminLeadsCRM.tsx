import React, { useState } from 'react';
import { db } from '../../lib/database';
import { ContactInquiry, LeadStatus, LeadPriority } from '../../types';
import {
  Search,
  Filter,
  Download,
  Trash2,
  Calendar,
  MessageSquare,
  CheckCircle2,
  X,
  Clock,
  User,
  DollarSign,
  AlertTriangle,
  History,
} from 'lucide-react';

export const AdminLeadsCRM: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => db.getInquiries());
  const [selectedLead, setSelectedLead] = useState<ContactInquiry | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Drawer form states
  const [newNote, setNewNote] = useState('');
  const [followupDate, setFollowupDate] = useState('');
  const [dealValue, setDealValue] = useState<number | undefined>(undefined);
  const [assignedTo, setAssignedTo] = useState('');

  // Delete modal
  const [leadToDelete, setLeadToDelete] = useState<ContactInquiry | null>(null);

  const refreshLeads = () => {
    const fresh = db.getInquiries();
    setInquiries(fresh);
    if (selectedLead) {
      const updated = fresh.find((i) => i.id === selectedLead.id);
      setSelectedLead(updated || null);
    }
  };

  const filteredLeads = inquiries.filter((lead) => {
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
    const matchSearch =
      lead.fullName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.refNumber.toLowerCase().includes(search.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchPriority && matchSearch;
  });

  const handleSelectLead = (lead: ContactInquiry) => {
    setSelectedLead(lead);
    setFollowupDate(lead.followUpDate || '');
    setDealValue(lead.estimatedValue);
    setAssignedTo(lead.assignedTo || 'Unassigned');
  };

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    db.updateLeadStatus(leadId, status);
    refreshLeads();
  };

  const handlePriorityChange = (leadId: string, priority: LeadPriority) => {
    if (!selectedLead) return;
    db.updateLeadStatus(leadId, selectedLead.status, priority);
    refreshLeads();
  };

  const handleSaveDrawerDetails = () => {
    if (!selectedLead) return;
    if (followupDate || dealValue !== undefined) {
      db.updateLeadFollowup(selectedLead.id, followupDate, dealValue);
    }
    if (assignedTo) {
      db.updateLeadStatus(selectedLead.id, selectedLead.status, selectedLead.priority, assignedTo);
    }
    refreshLeads();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;
    db.addLeadNote(selectedLead.id, newNote.trim(), 'Admin');
    setNewNote('');
    refreshLeads();
  };

  const handleDeleteLead = () => {
    if (!leadToDelete) return;
    db.deleteLead(leadToDelete.id);
    if (selectedLead?.id === leadToDelete.id) {
      setSelectedLead(null);
    }
    setLeadToDelete(null);
    refreshLeads();
  };

  const exportToCSV = () => {
    const headers = ['Reference Number', 'Full Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Priority', 'Assigned To', 'Follow Up', 'Created At'];
    const rows = filteredLeads.map((l) => [
      l.refNumber,
      `"${l.fullName}"`,
      l.email,
      `"${l.mobile}"`,
      `"${l.company || ''}"`,
      `"${l.serviceName}"`,
      `"${l.budget || ''}"`,
      l.status,
      l.priority,
      `"${l.assignedTo || ''}"`,
      l.followUpDate || '',
      l.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TECYU_CRM_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Lead & CRM Pipeline</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage inquiries, assign follow-ups, and track deal stages from submission to closure.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company, or ref number..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Ref #</th>
                <th className="py-3 px-6">Prospect / Organization</th>
                <th className="py-3 px-6">Service</th>
                <th className="py-3 px-6">Stage</th>
                <th className="py-3 px-6">Priority</th>
                <th className="py-3 px-6">Assigned To</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => handleSelectLead(lead)}
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                      selectedLead?.id === lead.id ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    <td className="py-3.5 px-6 font-mono font-bold text-blue-600">{lead.refNumber}</td>
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500">{lead.company || lead.email}</div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-700">{lead.serviceName}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          lead.status === 'New'
                            ? 'bg-blue-100 text-blue-700'
                            : lead.status === 'Won'
                            ? 'bg-emerald-100 text-emerald-700'
                            : lead.status === 'Proposal Sent'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`text-[10px] font-semibold ${
                          lead.priority === 'Urgent'
                            ? 'text-rose-600 font-bold'
                            : lead.priority === 'High'
                            ? 'text-amber-600 font-bold'
                            : 'text-slate-600'
                        }`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 font-medium">
                      {lead.assignedTo || 'Unassigned'}
                    </td>
                    <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setLeadToDelete(lead)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD PROFILE DRAWER */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-2xs flex justify-end">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl overflow-y-auto flex flex-col justify-between p-6 border-l border-slate-200">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-600 block">
                    {selectedLead.refNumber}
                  </span>
                  <h2 className="text-xl font-bold text-[#08152F] mt-0.5">{selectedLead.fullName}</h2>
                  <div className="text-xs text-slate-500">{selectedLead.company || 'Individual Client'}</div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status and Priority Selectors */}
              <div className="grid grid-cols-2 gap-4 bg-[#F5F8FC] p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deal Stage</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                    className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Priority</label>
                  <select
                    value={selectedLead.priority}
                    onChange={(e) => handlePriorityChange(selectedLead.id, e.target.value as LeadPriority)}
                    className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Inquiry Details */}
              <div className="space-y-3 text-xs">
                <h3 className="font-bold text-[#08152F] uppercase tracking-wider text-[11px]">
                  Contact & Project Scope
                </h3>
                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email</span>
                    <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone</span>
                    <span>{selectedLead.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Service</span>
                    <span>{selectedLead.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Budget</span>
                    <span>{selectedLead.budget || 'Not specified'}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block text-[10px]">Brief / Message</span>
                  <p className="mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 leading-relaxed">
                    {selectedLead.message}
                  </p>
                </div>

                {selectedLead.attachmentName && (
                  <div className="pt-1 text-[11px] text-blue-600 font-medium">
                    Attached File: {selectedLead.attachmentName}
                  </div>
                )}
              </div>

              {/* Assignment & Follow-up Scheduling */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-bold text-[#08152F] text-xs">Follow-up & Deal Valuation</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Follow-up Date</label>
                    <input
                      type="date"
                      value={followupDate}
                      onChange={(e) => setFollowupDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Est. Deal Value ($)</label>
                    <input
                      type="number"
                      value={dealValue || ''}
                      onChange={(e) => setDealValue(Number(e.target.value))}
                      placeholder="e.g. 8500"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Assigned Lead Owner</label>
                  <input
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="e.g. Lead Architect / Sales Exec"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSaveDrawerDetails}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#08152F] rounded-lg cursor-pointer"
                >
                  Save Deal Parameters
                </button>
              </div>

              {/* Internal Notes */}
              <div className="space-y-3">
                <h3 className="font-bold text-[#08152F] text-xs">Internal Team Notes</h3>
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add confidential discovery note or call summary..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] rounded-lg"
                  >
                    Add Note
                  </button>
                </form>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedLead.notes.length === 0 ? (
                    <div className="text-[11px] text-slate-400 py-2">No notes added yet.</div>
                  ) : (
                    selectedLead.notes.map((n) => (
                      <div key={n.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span className="font-bold text-slate-700">{n.author}</span>
                          <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-700">{n.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Chronological Activity Timeline */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="font-bold text-[#08152F] text-xs flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-slate-500" />
                  <span>Activity History Timeline</span>
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedLead.activityHistory.map((act) => (
                    <div key={act.id} className="text-xs flex items-start gap-2 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">{act.action}</div>
                        <div className="text-[10px] text-slate-400">
                          by {act.actor} · {new Date(act.timestamp).toLocaleString()}
                        </div>
                        {act.details && <div className="text-[11px] text-slate-500">{act.details}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setLeadToDelete(selectedLead)}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-xs text-slate-600 mt-1">
                Are you sure you want to permanently delete lead record <span className="font-mono font-bold">{leadToDelete.refNumber}</span> ({leadToDelete.fullName})? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setLeadToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteLead}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
