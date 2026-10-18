import React, { useState } from 'react';
import {
  Shield,
  Check,
  KeyRound,
  UserCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  UserX,
  Clock,
  Sparkles,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { UserRole, AdminUserAccount } from '../../types';
import { db } from '../../lib/database';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUserAccount[]>(() => db.getAdminUsers());
  const [selectedUserForPassword, setSelectedUserForPassword] = useState<AdminUserAccount | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const reloadUsers = () => {
    setUsers(db.getAdminUsers());
  };

  const pendingRequests = users.filter((u) => u.status === 'pending_approval');
  const activeUsers = users.filter((u) => u.status !== 'pending_approval' && u.status !== 'rejected');

  const rolesList: { role: UserRole; title: string; description: string; permissions: string[] }[] = [
    {
      role: 'super_admin',
      title: 'Super Administrator',
      description: 'Exclusive total system control: User approval, role changes, database provisioning, and settings.',
      permissions: ['All System Permissions', 'Approve/Reject Sign-Ups', 'Change User Roles', 'Security & Password Reset', 'Global SEO & Settings'],
    },
    {
      role: 'admin',
      title: 'Administrator',
      description: 'Operational management across CMS, inquiries, careers, and activity monitoring.',
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
      description: 'Pipeline management: leads, follow-ups, client meeting notes, and deal progress.',
      permissions: ['View Inquiries', 'Update Lead Status', 'Schedule Follow-ups', 'Add Client Notes', 'Export CRM Data'],
    },
    {
      role: 'hr_manager',
      title: 'HR & Recruitment Manager',
      description: 'Recruitment portal access for job vacancy publishing, candidate resumes, and screening.',
      permissions: ['Post Job Vacancies', 'Review Candidate Resumes', 'Update Application Status', 'Interview Feedback Notes'],
    },
  ];

  // Super Admin Action: Approve Access Request
  const handleApprove = (userId: string, assignedRole: UserRole) => {
    const success = db.approveAccessRequest(userId, assignedRole);
    if (success) {
      reloadUsers();
      setFeedback({ type: 'success', message: 'User access request approved! Account is now active.' });
    }
  };

  // Super Admin Action: Reject Access Request
  const handleReject = (userId: string) => {
    const success = db.rejectAccessRequest(userId);
    if (success) {
      reloadUsers();
      setFeedback({ type: 'success', message: 'Access request has been rejected.' });
    }
  };

  // Super Admin Action: Change Role of Existing User
  const handleChangeRole = (userId: string, newRole: UserRole) => {
    const success = db.updateAdminUser(userId, { role: newRole });
    if (success) {
      reloadUsers();
      setFeedback({ type: 'success', message: 'User role updated successfully!' });
    }
  };

  // Super Admin Action: Toggle User Active/Disabled
  const handleToggleStatus = (u: AdminUserAccount) => {
    if (u.role === 'super_admin') {
      alert('Super Administrator account cannot be disabled.');
      return;
    }
    const newStatus = u.status === 'disabled' ? 'active' : 'disabled';
    db.updateAdminUser(u.id, { status: newStatus });
    reloadUsers();
    setFeedback({
      type: 'success',
      message: `User ${u.name} status updated to ${newStatus}.`,
    });
  };

  // Super Admin Action: Password Reset
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForPassword) return;

    if (newPassword.length < 6) {
      setFeedback({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    const ok = db.updateAdminPassword(selectedUserForPassword.id, newPassword);
    if (ok) {
      reloadUsers();
      setFeedback({
        type: 'success',
        message: `Password for ${selectedUserForPassword.name} updated successfully!`,
      });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSelectedUserForPassword(null), 1200);
    } else {
      setFeedback({ type: 'error', message: 'Failed to update password.' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F] flex items-center gap-2">
            <span>Admin Users & Access Governance</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-mono font-semibold">
              Super Admin Authority
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Super Admin exclusive: Approve new signups, assign roles, manage passwords, and configure access permissions.
          </p>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center justify-between border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 1: PENDING ACCESS REQUESTS (SIGNUPS AWAITING APPROVAL)  */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border border-amber-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 bg-amber-50/50 border-b border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Pending Access Requests ({pendingRequests.length})
              </h2>
              <p className="text-xs text-slate-500">
                Users who signed up from `/homeminister` and need your approval before they can log in
              </p>
            </div>
          </div>
          {pendingRequests.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full border border-amber-300">
              Action Required
            </span>
          )}
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            <div className="font-semibold text-slate-700">No pending access requests</div>
            <p className="text-slate-500 text-[11px] mt-0.5">
              All sign-up requests have been reviewed. When new team members sign up, they will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-amber-50/20 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{req.name}</span>
                    <span className="text-xs text-slate-400 font-mono">(@{req.username})</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Requested: {req.requestedRole?.replace('_', ' ') || req.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-4">
                    <span>Email: <strong className="text-slate-700">{req.email}</strong></span>
                    <span>Date: {new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                  {req.requestNote && (
                    <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 mt-1 max-w-xl">
                      <span className="font-semibold text-slate-700">Reason:</span> &ldquo;{req.requestNote}&rdquo;
                    </div>
                  )}
                </div>

                {/* Super Admin Approval Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-xs text-slate-500">
                    <span className="mr-1 hidden sm:inline">Role:</span>
                    <select
                      id={`role-${req.id}`}
                      defaultValue={req.requestedRole || req.role}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden"
                    >
                      <option value="content_editor">Content Editor</option>
                      <option value="sales_manager">Sales Manager</option>
                      <option value="hr_manager">HR Manager</option>
                      <option value="admin">Administrator</option>
                      <option value="super_admin">Super Administrator</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      const selectEl = document.getElementById(`role-${req.id}`) as HTMLSelectElement;
                      const assigned = (selectEl?.value as UserRole) || req.requestedRole || 'content_editor';
                      handleApprove(req.id, assigned);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Activate</span>
                  </button>

                  <button
                    onClick={() => handleReject(req.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg cursor-pointer transition-colors"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* SECTION 2: ACTIVE ADMINISTRATOR ACCOUNTS                        */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#08152F]">Active Administrator Accounts</h2>
            <p className="text-xs text-slate-500">
              Only Super Admin can change user roles and credentials
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            {activeUsers.length} Active Accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role (Controlled by Super Admin)</th>
                <th className="py-3 px-4">Login Username</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {activeUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {u.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {u.role === 'super_admin' && (
                            <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded font-semibold">
                              Owner
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role Selector exclusively for Super Admin */}
                  <td className="py-3.5 px-4">
                    {u.role === 'super_admin' ? (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        Super Administrator
                      </span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={(e) => handleChangeRole(u.id, e.target.value as UserRole)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-800 hover:border-blue-400 focus:outline-hidden cursor-pointer"
                        title="Change role for this user"
                      >
                        <option value="admin">Admin</option>
                        <option value="content_editor">Content Editor</option>
                        <option value="sales_manager">Sales Manager</option>
                        <option value="hr_manager">HR Manager</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    {u.username}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        u.status === 'disabled'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {u.status === 'disabled' ? 'Suspended' : 'Active'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUserForPassword(u);
                        setFeedback(null);
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <KeyRound className="w-3 h-3" />
                      <span>Change Password</span>
                    </button>

                    {u.role !== 'super_admin' && (
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          u.status === 'disabled'
                            ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                            : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                        }`}
                        title={u.status === 'disabled' ? 'Activate Account' : 'Suspend Account'}
                      >
                        <span>{u.status === 'disabled' ? 'Activate' : 'Suspend'}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 3: ROLE-BASED ACCESS CONTROL (RBAC) MATRIX             */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#08152F]">System RBAC Matrix (Access Levels)</h2>
          <p className="text-xs text-slate-500">
            Permissions granted to each role. Users cannot elevate their own permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rolesList.map((r) => (
            <div
              key={r.role}
              className={`p-4 rounded-xl border transition-all ${
                r.role === 'super_admin'
                  ? 'border-purple-200 bg-purple-50/30'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-900">{r.title}</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white border border-slate-200 font-semibold text-slate-700">
                  {r.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{r.description}</p>
              <div className="space-y-1.5 border-t border-slate-200/60 pt-2">
                {r.permissions.map((perm, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{perm}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Password Reset Modal */}
      {selectedUserForPassword && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900">
                <Lock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm">
                  Update Password for {selectedUserForPassword.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedUserForPassword(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

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
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password
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

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedUserForPassword(null)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
