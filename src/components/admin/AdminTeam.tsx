import React, { useState } from 'react';
import { db } from '../../lib/database';
import { TeamMember } from '../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, User, X } from 'lucide-react';

export const AdminTeam: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(() => db.getTeam());
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshTeam = () => {
    setTeam(db.getTeam());
  };

  const handleTogglePublish = (m: TeamMember) => {
    const updated = { ...m, isPublished: !m.isPublished };
    db.saveTeamMember(updated);
    refreshTeam();
  };

  const handleAddNew = () => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: 'New Engineering Leader',
      role: 'Staff Systems Architect',
      bio: 'Seasoned engineer specializing in high-throughput enterprise systems and database reliability.',
      avatarGradient: 'from-blue-600 to-indigo-700',
      linkedinUrl: 'https://linkedin.com',
      displayOrder: team.length + 1,
      isPublished: true,
    };
    setEditingMember(newMember);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    db.saveTeamMember(editingMember);
    setIsModalOpen(false);
    setEditingMember(null);
    refreshTeam();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this team profile?')) {
      db.deleteTeamMember(id);
      refreshTeam();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Team Members Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage leadership profiles, engineering heads, and bios displayed on the About page.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Profile</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Order</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Designation</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {team.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-mono text-slate-400 font-bold">{m.displayOrder}</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">{m.name}</td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{m.role}</td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => handleTogglePublish(m)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer ${
                        m.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {m.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{m.isPublished ? 'Public' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingMember(JSON.parse(JSON.stringify(m)));
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#08152F]">Edit Team Member Profile</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingMember.displayOrder}
                    onChange={(e) => setEditingMember({ ...editingMember, displayOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Biography *</label>
                <textarea
                  rows={3}
                  required
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={editingMember.linkedinUrl || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, linkedinUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 font-bold text-white bg-[#2563EB] rounded-xl"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
