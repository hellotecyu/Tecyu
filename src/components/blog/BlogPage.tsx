import React, { useState } from 'react';
import { db } from '../../lib/database';
import { BlogPost } from '../../types';
import { ArrowLeft, ArrowRight, Search, Clock, Tag, Share2, BookOpen } from 'lucide-react';

interface BlogPageProps {
  selectedSlug?: string;
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ selectedSlug, onNavigate }) => {
  const blogs = db.getBlogs().filter((b) => b.isPublished);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const activeBlog = selectedSlug ? blogs.find((b) => b.slug === selectedSlug) : null;

  const categories = ['all', ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = blogs.filter((b) => {
    const matchCat = activeCategory === 'all' || b.category === activeCategory;
    const matchSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  // FULL BLOG ARTICLE READER VIEW
  if (activeBlog) {
    const relatedBlogs = blogs.filter((b) => b.id !== activeBlog.id).slice(0, 2);

    return (
      <div className="pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="text-[#2563EB]">{activeBlog.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeBlog.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeBlog.readTime}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight leading-tight">
              {activeBlog.title}
            </h1>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  {activeBlog.authorName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{activeBlog.authorName}</div>
                  <div className="text-[11px] text-slate-500">{activeBlog.authorRole}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Prose Content */}
          <div className="py-10 prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
            {activeBlog.content.split('\n\n').map((para, i) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-xl font-bold text-[#08152F] pt-4">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                return (
                  <div key={i} className="pl-4 py-1 text-xs sm:text-sm text-slate-800 font-medium">
                    {para}
                  </div>
                );
              }
              if (para.startsWith('- ')) {
                return (
                  <div key={i} className="pl-4 py-0.5 text-xs sm:text-sm text-slate-700">
                    {para}
                  </div>
                );
              }
              return (
                <p key={i} className="text-slate-600 leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-2">Tags:</span>
            {activeBlog.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h2 className="text-xl font-bold text-[#08152F] mb-6">Related Insights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedBlogs.map((rb) => (
                  <div key={rb.id} className="p-6 bg-[#F5F8FC] rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#2563EB] uppercase mb-1">{rb.category}</div>
                      <h3 className="text-sm font-bold text-[#08152F]">{rb.title}</h3>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{rb.excerpt}</p>
                    </div>
                    <button
                      onClick={() => onNavigate(`blog?slug=${rb.slug}`)}
                      className="mt-4 text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  }

  // DEFAULT: BLOG POSTS LISTING VIEW
  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Knowledge & Insights
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08152F] tracking-tight">
            TECYU Technology Insights
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            In-depth perspectives on software engineering, AI architecture, database scalability, and high-performance digital products.
          </p>

          {/* Search bar & Category filters */}
          <div className="mt-8 max-w-xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by keyword or topic..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-300 shadow-2xs focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors capitalize cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#2563EB] text-white font-semibold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' ? 'All Topics' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No articles found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3">
                    <span className="font-semibold text-[#2563EB]">{b.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{b.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#08152F] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {b.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {b.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {b.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{b.publishedAt}</span>
                  <button
                    onClick={() => onNavigate(`blog?slug=${b.slug}`)}
                    className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
