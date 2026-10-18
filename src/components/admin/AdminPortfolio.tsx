import React, { useState } from 'react';
import { db } from '../../lib/database';
import { ProjectItem } from '../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X } from 'lucide-react';

export const AdminPortfolio: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(() => db.getProjects());
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshProjects = () => {
    setProjects(db.getProjects());
  };

  const handleTogglePublish = (p: ProjectItem) => {
    const updated = { ...p, isPublished: !p.isPublished };
    db.saveProject(updated);
    refreshProjects();
  };

  const handleToggleFeatured = (p: ProjectItem) => {
    const updated = { ...p, isFeatured: !p.isFeatured };
    db.saveProject(updated);
    refreshProjects();
  };

  const handleEdit = (p: ProjectItem) => {
    setEditingProject(JSON.parse(JSON.stringify(p)));
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      slug: 'new-enterprise-solution',
      title: 'New Enterprise Transformation Project',
      client: 'Enterprise Client',
      industry: 'Manufacturing',
      serviceCategory: 'Custom Software Development',
      description: 'Proprietary enterprise platform engineered to optimize operational throughput.',
      challenge: 'Manual operational silos and uncoordinated communication across production sites.',
      solution: 'Custom cloud platform linking inventory, billing, and real-time status reporting.',
      verifiedResults: ['+120% Operational velocity', 'Zero manual data duplication'],
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      thumbnailGradient: 'from-blue-950 via-slate-900 to-indigo-950',
      isFeatured: false,
      isPublished: true,
      completionDate: 'March 2026',
    };
    setEditingProject(newProj);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    db.saveProject(editingProject);
    setIsModalOpen(false);
    setEditingProject(null);
    refreshProjects();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this case study from portfolio?')) {
      db.deleteProject(id);
      refreshProjects();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Portfolio & Case Studies</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage delivered project case studies, client outcomes, and industry tags.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Case Study</th>
                <th className="py-3 px-6">Client</th>
                <th className="py-3 px-6">Industry</th>
                <th className="py-3 px-6">Featured</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900">{p.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">/{p.slug}</div>
                  </td>
                  <td className="py-3.5 px-6 font-medium text-slate-700">{p.client}</td>
                  <td className="py-3.5 px-6 text-slate-600">{p.industry}</td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                        p.isFeatured ? 'text-amber-700 bg-amber-50' : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${p.isFeatured ? 'fill-current' : ''}`} />
                      <span>{p.isFeatured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => handleTogglePublish(p)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer ${
                        p.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {p.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{p.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-1.5 text-slate-600 hover:text-[#2563EB] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#08152F]">Edit Project Case Study</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Industry</label>
                  <input
                    type="text"
                    value={editingProject.industry}
                    onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Completion Date</label>
                  <input
                    type="text"
                    value={editingProject.completionDate}
                    onChange={(e) => setEditingProject({ ...editingProject, completionDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Overview Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">The Challenge *</label>
                  <textarea
                    rows={3}
                    required
                    value={editingProject.challenge}
                    onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">The Engineering Solution *</label>
                  <textarea
                    rows={3}
                    required
                    value={editingProject.solution}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Verified Results (One per line)</label>
                <textarea
                  rows={3}
                  value={editingProject.verifiedResults.join('\n')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      verifiedResults: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tech Stack (Comma separated)</label>
                <input
                  type="text"
                  value={editingProject.techStack.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
