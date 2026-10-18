import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, FileText, Trash2, Copy, CheckCircle2, Search } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'document';
  size: string;
  url: string;
  altText: string;
  createdAt: string;
}

export const AdminMedia: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      id: 'm-1',
      name: 'tecyu_primary_brand_logo.svg',
      type: 'image',
      size: '12 KB',
      url: '/logo.svg',
      altText: 'TECYU Technology For You Primary Vector Wordmark',
      createdAt: '2026-03-15',
    },
    {
      id: 'm-2',
      name: 'tecyu_icon_favicon.svg',
      type: 'image',
      size: '4 KB',
      url: '/favicon.svg',
      altText: 'TECYU Aerodynamic T Brand Mark',
      createdAt: '2026-03-15',
    },
    {
      id: 'm-3',
      name: 'enterprise_erp_architecture_diagram.pdf',
      type: 'document',
      size: '420 KB',
      url: '/docs/architecture.pdf',
      altText: 'TECYU Multi-Tenant ERP Architecture Specification',
      createdAt: '2026-04-01',
    },
  ]);

  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newItem: MediaItem = {
        id: `m-${Date.now()}`,
        name: file.name,
        type: file.type.includes('image') ? 'image' : 'document',
        size: `${Math.round(file.size / 1024)} KB`,
        url: URL.createObjectURL(file),
        altText: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setMediaList([newItem, ...mediaList]);
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter((m) => m.id !== id));
  };

  const filtered = mediaList.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.altText.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">Media & Document Asset Library</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Store, preview, and manage logos, documents, and illustrations.
          </p>
        </div>

        <label className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-colors cursor-pointer">
          <UploadCloud className="w-4 h-4" />
          <span>Upload File</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files by name or alt text..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="h-32 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
              {item.type === 'image' ? (
                <div className="flex flex-col items-center gap-1">
                  <ImageIcon className="w-8 h-8 text-blue-500" />
                  <span className="text-[10px] font-mono text-slate-500">Vector SVG Asset</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <FileText className="w-8 h-8 text-indigo-500" />
                  <span className="text-[10px] font-mono text-slate-500">Document Asset</span>
                </div>
              )}
            </div>

            <div>
              <div className="font-bold text-xs text-slate-900 truncate" title={item.name}>
                {item.name}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
                <span>{item.size}</span>
                <span>{item.createdAt}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 italic truncate">
                Alt: {item.altText}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => copyUrl(item.id, item.url)}
                className="text-[11px] text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedId === item.id ? 'Copied Path!' : 'Copy Path'}</span>
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Delete Asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
