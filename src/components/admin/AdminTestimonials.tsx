import React, { useState } from 'react';
import { db } from '../../lib/database';
import { TestimonialItem } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle2, Star, X } from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => db.getTestimonials());
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshList = () => {
    setTestimonials(db.getTestimonials());
  };

  const handleToggleApprove = (item: TestimonialItem) => {
    const updated = { ...item, isApproved: !item.isApproved };
    db.saveTestimonial(updated);
    refreshList();
  };

  const handleToggleFeature = (item: TestimonialItem) => {
    const updated = { ...item, isFeatured: !item.isFeatured };
    db.saveTestimonial(updated);
    refreshList();
  };

  const handleAddNew = () => {
    const newItem: TestimonialItem = {
      id: `test-${Date.now()}`,
      clientName: 'New Client Partner',
      designation: 'Chief Technology Officer',
      company: 'Enterprise Partner Ltd.',
      location: 'India',
      rating: 5,
      quote: 'TECYU engineered our software platform with exceptional fidelity, transparent sprint timelines, and zero production downtime.',
      verifiedOutcome: '100% on-time milestone delivery',
      isApproved: true,
      isFeatured: true,
    };
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    db.saveTestimonial(editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this client testimonial?')) {
      db.deleteTestimonial(id);
      refreshList();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Client Testimonials</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage genuine client reviews, verified outcomes, and homepage endorsement displays.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Client & Company</th>
                <th className="py-3 px-6">Rating</th>
                <th className="py-3 px-6">Verified Outcome</th>
                <th className="py-3 px-6">Featured</th>
                <th className="py-3 px-6">Approval</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900">{t.clientName}</div>
                    <div className="text-[11px] text-slate-500">
                      {t.designation}, {t.company}
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-amber-500 font-bold">{t.rating} ★</td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{t.verifiedOutcome}</td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => handleToggleFeature(t)}
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                        t.isFeatured ? 'text-amber-700 bg-amber-50' : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${t.isFeatured ? 'fill-current' : ''}`} />
                      <span>{t.isFeatured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => handleToggleApprove(t)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer ${
                        t.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      <span>{t.isApproved ? 'Approved' : 'Pending'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingItem(JSON.parse(JSON.stringify(t)));
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
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
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#08152F]">Edit Client Testimonial</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.clientName}
                    onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={editingItem.designation}
                    onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Star Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editingItem.rating}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.quote}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Verified Measurable Outcome *</label>
                <input
                  type="text"
                  required
                  value={editingItem.verifiedOutcome}
                  onChange={(e) => setEditingItem({ ...editingItem, verifiedOutcome: e.target.value })}
                  placeholder="e.g. +165% dispatch velocity across 14 logistics hubs"
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
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
