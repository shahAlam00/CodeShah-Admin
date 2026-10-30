import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Send, Search, Filter, Clock, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { mockSubmissions } from '../../../data/admin/submissions';
import { Submission, SubmissionStatus } from '../../../types/submission';

export const SubmissionsListPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const matchQuery =
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.problemTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchLang = languageFilter === 'all' || s.language.toLowerCase() === languageFilter.toLowerCase();

      return matchQuery && matchStatus && matchLang;
    });
  }, [submissions, searchQuery, statusFilter, languageFilter]);

  const columns: Column<Submission>[] = [
    {
      key: 'id',
      header: 'Submission ID',
      accessor: (s) => (
        <Link
          to={`/admin/submissions/${s.id}`}
          className="font-mono font-bold text-brand-600 dark:text-brand-400 hover:underline"
        >
          {s.id}
        </Link>
      ),
      sortable: true,
      width: '130px',
    },
    {
      key: 'userName',
      header: 'Candidate',
      accessor: (s) => (
        <div className="flex items-center gap-2.5">
          <img
            src={s.userAvatar}
            alt={s.userName}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <Link
            to={`/admin/users/${s.userId}`}
            className="font-semibold text-slate-900 dark:text-white text-xs hover:underline"
          >
            {s.userName}
          </Link>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'problemTitle',
      header: 'Problem',
      accessor: (s) => (
        <Link
          to={`/admin/problems/${s.problemId}`}
          className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600"
        >
          {s.problemTitle}
        </Link>
      ),
      sortable: true,
    },
    {
      key: 'language',
      header: 'Language',
      accessor: (s) => (
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800">
          {s.language}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Verdict',
      accessor: (s) => <StatusBadge status={s.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'runtime',
      header: 'Runtime',
      accessor: (s) => (
        <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
          {s.runtime} ms
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'memory',
      header: 'Memory',
      accessor: (s) => (
        <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
          {s.memory} MB
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      accessor: (s) => <span className="text-xs text-slate-400">{s.submittedAt}</span>,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Inspect',
      align: 'right',
      accessor: (s) => (
        <Link
          to={`/admin/submissions/${s.id}`}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200"
        >
          Inspect
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Submissions & Execution Telemetry"
        subtitle="Inspect live code executions dispatched across distributed sandbox worker nodes."
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by submission ID, candidate, or problem..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
          >
            <option value="all">All Verdicts</option>
            <option value="Accepted">Accepted</option>
            <option value="Wrong Answer">Wrong Answer</option>
            <option value="Time Limit Exceeded">Time Limit Exceeded</option>
            <option value="Runtime Error">Runtime Error</option>
          </select>

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
          >
            <option value="all">All Compilers</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="Go">Go</option>
          </select>
        </div>
      </div>

      <DataTable
        data={filteredSubmissions}
        columns={columns}
        keyExtractor={(s) => s.id}
        pageSize={10}
      />
    </div>
  );
};
