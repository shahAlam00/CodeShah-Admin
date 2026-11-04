import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Code2,
  Users,
  Swords,
  AlertOctagon,
  Send,
  Sparkles,
  Layers,
  ArrowRight,
  X,
  Command,
} from 'lucide-react';
import { mockProblems } from '../../../data/admin/problems';
import { mockUsers } from '../../../data/admin/users';
import { mockContests } from '../../../data/admin/contests';
import { mockReports } from '../../../data/admin/reports';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Quick navigation destinations
  const quickPages = [
    { title: 'Dashboard', path: '/admin/dashboard', category: 'Pages', icon: Layers },
    { title: 'Problems Directory', path: '/admin/problems', category: 'Pages', icon: Code2 },
    { title: 'Create New Problem', path: '/admin/problems/create', category: 'Pages', icon: Code2 },
    { title: 'Users Directory', path: '/admin/users', category: 'Pages', icon: Users },
    { title: 'Code Execution Monitor', path: '/admin/system/executions', category: 'Pages', icon: Layers },
    { title: 'Contest Builder', path: '/admin/contests/create', category: 'Pages', icon: Swords },
    { title: 'Security & RBAC Matrix', path: '/admin/permissions', category: 'Pages', icon: Layers },
    { title: 'Audit Logs', path: '/admin/audit-logs', category: 'Pages', icon: Layers },
  ];

  // Search filtered results
  const filteredProblems = mockProblems
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.slug.includes(query.toLowerCase()))
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: `${p.difficulty} • ${p.category}`,
      path: `/admin/problems/${p.id}`,
      category: 'Problems',
      icon: Code2,
    }));

  const filteredUsers = mockUsers
    .filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3)
    .map((u) => ({
      id: u.id,
      title: u.name,
      subtitle: `@${u.username} • ${u.role}`,
      path: `/admin/users/${u.id}`,
      category: 'Users',
      icon: Users,
    }));

  const filteredContests = mockContests
    .filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 2)
    .map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: `${c.status} • ${c.durationMinutes} mins`,
      path: `/admin/contests/${c.id}`,
      category: 'Contests',
      icon: Swords,
    }));

  const filteredReports = mockReports
    .filter((r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.category.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 2)
    .map((r) => ({
      id: r.id,
      title: r.title,
      subtitle: `${r.category} • ${r.priority}`,
      path: `/admin/reports`,
      category: 'Reports',
      icon: AlertOctagon,
    }));

  const filteredPages = quickPages.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const allResults = query.trim() === ''
    ? filteredPages
    : [...filteredProblems, ...filteredUsers, ...filteredContests, ...filteredReports, ...filteredPages];

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft-lg overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search users, problems, contests, submissions..."
            className="w-full bg-transparent text-sm focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-navy-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1">
          {allResults.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No results found for "{query}". Try searching for 'Two Sum' or 'Aarav'.
            </div>
          ) : (
            allResults.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${idx === selectedIndex
                      ? 'bg-brand-50/80 dark:bg-brand-950/40 text-brand-900 dark:text-white'
                      : 'hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300'
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{item.title}</p>
                      {'subtitle' in item && item.subtitle && (
                        <p className="text-xs text-slate-400 truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-500">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-navy-900 border rounded text-[10px]">
              ↑↓
            </kbd>
            <span>Select:</span>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-navy-900 border rounded text-[10px]">
              ENTER
            </kbd>
          </div>
          <span className="font-mono text-[11px]">CodeShah Omni-Search</span>
        </div>
      </div>
    </div>
  );
};
