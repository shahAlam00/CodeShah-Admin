import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swords, Plus, Calendar, Clock, Users, Play, CheckCircle2, Copy } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { mockContests } from '../../../data/admin/contests';
import { Contest } from '../../../types/contest';
import { useToast } from '../../../context/ToastContext';

export const ContestsListPage: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const filteredContests = contests.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDuplicate = (c: Contest) => {
    const dup: Contest = {
      ...c,
      id: `cnt-${Date.now().toString().slice(-3)}`,
      title: `${c.title} (Clone)`,
      status: 'Draft',
      participantsCount: 0,
    };
    setContests([...contests, dup]);
    showToast('info', 'Contest Cloned', `Cloned contest template "${c.title}".`);
  };

  const columns: Column<Contest>[] = [
    {
      key: 'title',
      header: 'Contest Name',
      accessor: (c) => (
        <div>
          <Link
            to={`/admin/contests/${c.id}`}
            className="font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors text-sm"
          >
            {c.title}
          </Link>
          <p className="text-xs text-slate-400">/{c.slug}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (c) => <StatusBadge status={c.status} size="sm" variant="dot" />,
      sortable: true,
      width: '130px',
    },
    {
      key: 'durationMinutes',
      header: 'Duration',
      accessor: (c) => (
        <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
          {c.durationMinutes} mins
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'problems',
      header: 'Problems',
      accessor: (c) => (
        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
          {c.problems.length} problems
        </span>
      ),
      align: 'center',
    },
    {
      key: 'participantsCount',
      header: 'Registered',
      accessor: (c) => (
        <span className="font-mono font-bold text-xs text-brand-600 dark:text-brand-400">
          {c.participantsCount.toLocaleString()}
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      accessor: (c) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleDuplicate(c)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-navy-800"
            title="Duplicate Contest"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <Link
            to={`/admin/contests/${c.id}`}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200"
          >
            Manage
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Contests & Tournaments"
        subtitle="Manage rated weekly challenges, FAANG speedrun sprints, and official platform coding clashes."
      >
        <Link
          to="/admin/contests/create"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Launch Contest Builder</span>
        </Link>
      </PageHeader>

      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter contests by title or slug..."
          className="w-full sm:w-80"
        />
      </div>

      <DataTable
        data={filteredContests}
        columns={columns}
        keyExtractor={(c) => c.id}
        pageSize={10}
      />
    </div>
  );
};
