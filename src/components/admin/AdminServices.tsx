import React, { useState } from 'react';
import { db } from '../../lib/database';
import { ServiceItem } from '../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, CheckCircle2, X } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(() => db.getServices());
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshServices = () => {
    setServices(db.getServices());
  };

  const handleTogglePublish = (service: ServiceItem) => {
    const updated = { ...service, isPublished: !service.isPublished };
    db.saveService(updated);
    refreshServices();
  };

  const handleToggleFeatured = (service: ServiceItem) => {
    const updated = { ...service, isFeaturedHome: !service.isFeaturedHome };
    db.saveService(updated);
    refreshServices();
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingService(JSON.parse(JSON.stringify(service)));
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      slug: 'new-technology-service',
      title: 'New Technology Service',
      category: 'Enterprise Engineering',
      shortDescription: 'High-impact enterprise digital solution engineered for modern businesses.',
      longDescription: 'Comprehensive full-lifecycle engineering from architecture blueprinting to production deployment.',
      iconName: 'Code',
      features: ['Scalable Architecture', 'High Availability', 'Dedicated SLA Support'],
      benefits: ['Accelerated Operational Throughput', 'Guaranteed Data Sovereignty'],
      technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
      methodology: [
        { step: '01', title: 'Consultation & Discovery', description: 'Requirements scoping and architecture blueprinting.' },
        { step: '02', title: 'Implementation', description: 'Agile sprints with continuous integration and verification.' },
      ],
      faqs: [{ question: 'What is the estimated delivery timeframe?', answer: 'Typical implementations span 3 to 8 weeks based on scope.' }],
      isFeaturedHome: false,
      isPublished: true,
      displayOrder: services.length + 1,
      metaTitle: 'New Technology Service | TECYU',
      metaDescription: 'Scalable enterprise solutions engineered by TECYU.',
    };
    setEditingService(newService);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    db.saveService(editingService);
    setIsModalOpen(false);
    setEditingService(null);
    refreshServices();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      db.deleteService(id);
      refreshServices();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Services Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage public service offerings, SEO metadata, FAQs, and homepage placement.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Order</th>
                <th className="py-3 px-6">Service Title</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Home Featured</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-mono text-slate-400 font-bold">{srv.displayOrder}</td>
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900">{srv.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">/{srv.slug}</div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{srv.category}</td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => handleToggleFeatured(srv)}
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                        srv.isFeaturedHome ? 'text-amber-700 bg-amber-50' : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${srv.isFeaturedHome ? 'fill-current' : ''}`} />
                      <span>{srv.isFeaturedHome ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => handleTogglePublish(srv)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer ${
                        srv.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {srv.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{srv.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(srv)}
                      className="p-1.5 text-slate-600 hover:text-[#2563EB] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Service"
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

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#08152F]">
                {editingService.id ? `Edit: ${editingService.title}` : 'Add Service'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingService.displayOrder}
                    onChange={(e) => setEditingService({ ...editingService, displayOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Icon Name</label>
                  <select
                    value={editingService.iconName}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="Globe">Globe (Web)</option>
                    <option value="Code">Code (Software)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                    <option value="Sparkles">Sparkles (AI)</option>
                    <option value="TrendingUp">TrendingUp (Marketing)</option>
                    <option value="ShoppingBag">ShoppingBag (Commerce)</option>
                    <option value="Cloud">Cloud (DevOps)</option>
                    <option value="Palette">Palette (UI/UX)</option>
                    <option value="Cpu">Cpu (API & Systems)</option>
                    <option value="ShieldCheck">ShieldCheck (Consulting)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description (Cards) *</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDescription}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Long Description (Detail Page) *</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.longDescription}
                  onChange={(e) => setEditingService({ ...editingService, longDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={editingService.technologies.join(', ')}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={editingService.features.join('\n')}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      features: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={editingService.metaTitle}
                    onChange={(e) => setEditingService({ ...editingService, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">SEO Description</label>
                  <input
                    type="text"
                    value={editingService.metaDescription}
                    onChange={(e) => setEditingService({ ...editingService, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
