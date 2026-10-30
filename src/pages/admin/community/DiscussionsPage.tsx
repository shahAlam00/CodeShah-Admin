import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ShieldAlert, Check, EyeOff, Trash2, Ban } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { mockDiscussions } from '../../../data/admin/community';
import { DiscussionPost } from '../../../types/community';
import { useToast } from '../../../context/ToastContext';

export const DiscussionsPage: React.FC = () => {
  const [posts, setPosts] = useState<DiscussionPost[]>(mockDiscussions);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (id: string, action: 'Approved' | 'Hidden' | 'Removed') => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, status: action } : p)));
    showToast('success', 'Moderation Applied', `Post marked as ${action}.`);
  };

  const columns: Column<DiscussionPost>[] = [
    {
      key: 'title',
      header: 'Discussion Thread',
      accessor: (p) => (
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{p.title}</h4>
            {p.isPinned && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Pinned
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {p.content}
          </p>
          {p.flagReason && (
            <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1">
              Trigger: {p.flagReason}
            </p>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      key: 'author',
      header: 'Author',
      accessor: (p) => (
        <div className="flex items-center gap-2">
          <img
            src={p.author.avatar}
            alt={p.author.name}
            className="w-7 h-7 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-xs text-slate-800 dark:text-slate-200">
              {p.author.name}
            </p>
            <span className="text-[10px] text-slate-400">@{p.author.username}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Channel',
      accessor: (p) => (
        <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-navy-800 font-medium">
          {p.category}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'engagement',
      header: 'Upvotes',
      accessor: (p) => (
        <div className="flex items-center justify-center gap-1 font-mono text-xs font-bold text-brand-600">
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{p.upvotes}</span>
        </div>
      ),
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (p) => <StatusBadge status={p.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Moderation Actions',
      align: 'right',
      accessor: (p) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleAction(p.id, 'Approved')}
            className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            title="Approve Post"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAction(p.id, 'Hidden')}
            className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40"
            title="Hide from Public Feeds"
          >
            <EyeOff className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAction(p.id, 'Removed')}
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            title="Purge Thread"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Community Discussion Moderation"
        subtitle="Review community posts, solutions discussions, comments, and automated spam keyword alerts."
      />

      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter discussions by title or author..."
          className="w-full sm:w-80"
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyExtractor={(p) => p.id}
        pageSize={10}
      />
    </div>
  );
};
