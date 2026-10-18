import React, { useState } from 'react';
import { db } from '../../lib/database';
import { BlogPost } from '../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, FileText } from 'lucide-react';

export const AdminBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => db.getBlogs());
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshBlogs = () => {
    setBlogs(db.getBlogs());
  };

  const handleTogglePublish = (b: BlogPost) => {
    const updated = { ...b, isPublished: !b.isPublished };
    db.saveBlog(updated);
    refreshBlogs();
  };

  const handleEdit = (b: BlogPost) => {
    setEditingBlog(JSON.parse(JSON.stringify(b)));
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: 'new-technology-insight',
      title: 'New Technical Article on Software Architecture',
      excerpt: 'Strategic insights on building resilient, scalable enterprise software platforms.',
      content: 'Detailed editorial analysis on software modernization and enterprise best practices...',
      category: 'Software Engineering',
      tags: ['Engineering', 'Architecture', 'BestPractices'],
      authorName: 'TECYU Engineering',
      authorRole: 'Solutions Architecture',
      readTime: '5 min read',
      isPublished: true,
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      metaTitle: 'Technical Insight | TECYU Blog',
      metaDescription: 'Software architecture guidelines from TECYU engineering.',
    };
    setEditingBlog(newBlog);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    db.saveBlog(editingBlog);
    setIsModalOpen(false);
    setEditingBlog(null);
    refreshBlogs();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this blog post?')) {
      db.deleteBlog(id);
      refreshBlogs();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Blog & Article CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, and publish technical insights, tutorials, and executive thought leadership.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Article Title</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Author</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900">{b.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">/{b.slug}</div>
                  </td>
                  <td className="py-3.5 px-6 font-medium text-slate-700">{b.category}</td>
                  <td className="py-3.5 px-6 text-slate-600">{b.authorName}</td>
                  <td className="py-3.5 px-6 text-slate-400 font-mono text-[11px]">{b.publishedAt}</td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => handleTogglePublish(b)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer ${
                        b.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {b.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{b.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(b)}
                      className="p-1.5 text-slate-600 hover:text-[#2563EB] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
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
      {isModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#08152F]">Edit Blog Article</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Headline Title *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.slug}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingBlog.authorName}
                    onChange={(e) => setEditingBlog({ ...editingBlog, authorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Article Body (Supports Markdown) *</label>
                <textarea
                  rows={8}
                  required
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={editingBlog.tags.join(', ')}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
