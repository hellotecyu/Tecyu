import React, { useState } from 'react';
import { Shield, Check, KeyRound, UserCheck, Lock, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { UserRole, AdminUserAccount } from '../../types';
import { db } from '../../lib/database';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUserAccount[]>(() => db.getAdminUsers());
  const [selectedUser, setSelectedUser] = useState<AdminUserAccount | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const roles: { role: UserRole; title: string; description: string; permissions: string[] }[] = [
    {
      role: 'super_admin',
      title: 'Super Administrator',
      description: 'Unrestricted system access, user permissions management, and core database provisioning.',
      permissions: ['All System Permissions', 'User Role Management', 'Security & Password Reset', 'Database Reset', 'Global SEO & Settings'],
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

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    if (newPassword.length < 6) {
      setFeedback({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    const ok = db.updateAdminPassword(selectedUser.id, newPassword);
    if (ok) {
      setUsers(db.getAdminUsers());
      setFeedback({ type: 'success', message: `Password for ${selectedUser.name} updated successfully!` });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSelectedUser(null), 1500);
    } else {
      setFeedback({ type: 'error', message: 'Failed to update password.' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Admin Users & Security Governance</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage administrator login accounts, password credentials, and Role-Based Access Control (RBAC).
        </p>
      </div>

      {/* Active Admin Accounts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#08152F]">Active Administrator Accounts</h2>
            <p className="text-xs text-slate-500">Personnel authorized to access the `/homeminister` console</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            {users.length} Authorized Users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Username / Login</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {u.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    {u.username}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never logged in'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setFeedback(null);
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <KeyRound className="w-3 h-3" />
                      <span>Change Password</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Reset Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900">
                <Lock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm">Update Password for {selectedUser.name}</h3>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full px-3 py-2 pr-10 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Roles & Permissions Breakdown */}
      <div>
        <h2 className="text-base font-bold text-[#08152F] mb-3">Role Capabilities Matrix</h2>
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
    </div>
  );
};
