import { useState } from 'react';
import { FileText, Search, Download, ChevronDown, FolderOpen, File, FileSpreadsheet, Image } from 'lucide-react';
import { documents, Document } from '../../data/mockData';
import { Card, SectionHeader } from '../shared/UIComponents';

const categories = ['All', 'Legal', 'Tax', 'Reports', 'Financial', 'Governance', 'HR', 'Partnerships', 'Projects'];

const fileIcons: Record<string, JSX.Element> = {
  PDF: <FileText className="w-5 h-5 text-red-500" />,
  DOC: <FileText className="w-5 h-5 text-blue-500" />,
  XLSX: <FileSpreadsheet className="w-5 h-5 text-emerald-500" />,
  JPG: <Image className="w-5 h-5 text-purple-500" />,
};

const fileColors: Record<string, string> = {
  PDF: 'bg-red-100 dark:bg-red-900/20',
  DOC: 'bg-blue-100 dark:bg-blue-900/20',
  XLSX: 'bg-emerald-100 dark:bg-emerald-900/20',
  JPG: 'bg-purple-100 dark:bg-purple-900/20',
};

export default function DocumentationTab() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = documents.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    return matchSearch && matchCat;
  });

  const grouped = categories.slice(1).reduce<Record<string, Document[]>>((acc, cat) => {
    const docs = documents.filter(d => d.category === cat);
    if (docs.length > 0) acc[cat] = docs;
    return acc;
  }, {});

  return (
    <div>
      <SectionHeader
        title="Documentation"
        subtitle={`${documents.length} documents across ${Object.keys(grouped).length} categories`}
        actions={
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <FolderOpen className="w-4 h-4 text-blue-500" />
              Quick Access
              <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-10 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden">
                <div className="p-2">
                  <p className="text-xs text-slate-400 px-2 py-1.5 uppercase tracking-wider">Quick Access</p>
                  {Object.entries(grouped).map(([cat, docs]) => (
                    <div key={cat}>
                      <div className="px-2 py-1.5">
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">{cat}</p>
                      </div>
                      {docs.slice(0, 2).map(doc => (
                        <button
                          key={doc.id}
                          onClick={() => { setActiveCategory(cat); setShowDropdown(false); }}
                          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                        >
                          <div className={`p-1.5 rounded-md ${fileColors[doc.fileType]}`}>{fileIcons[doc.fileType]}</div>
                          <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{doc.title}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-1">
          {(['grid', 'list'] as const).map(m => (
            <button key={m} onClick={() => setViewMode(m)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${viewMode === m ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
              {m === 'grid' ? '⊞' : '≡'}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
          >
            {cat} {cat !== 'All' && `(${documents.filter(d => d.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Documents Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(doc => (
            <Card key={doc.id} className="p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group">
              <div className={`w-10 h-10 ${fileColors[doc.fileType]} rounded-xl flex items-center justify-center mb-3`}>
                {fileIcons[doc.fileType]}
              </div>
              <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 line-clamp-2">{doc.title}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                <span>{doc.fileType}</span>
                <span>·</span>
                <span>{doc.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">{doc.category}</span>
                <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-100">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">{doc.uploadDate}</p>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Document</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3 hidden md:table-cell">Type</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3 hidden md:table-cell">Size</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${fileColors[doc.fileType]}`}>{fileIcons[doc.fileType]}</div>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">{doc.category}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 hidden md:table-cell">{doc.fileType}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 hidden md:table-cell">{doc.size}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{doc.uploadDate}</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <File className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-slate-500 dark:text-slate-400">No documents found</p>
        </div>
      )}
    </div>
  );
}
