import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Plus, Search, Clock, Award, CheckSquare } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { mockAssessments } from '../../../data/admin/assessments';
import { Assessment } from '../../../types/assessment';

export const AssessmentsListPage: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = assessments.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Assessment>[] = [
    {
      key: 'title',
      header: 'Assessment Title',
      accessor: (a) => (
        <div>
          <Link
            to={`/admin/assessments/${a.id}`}
            className="font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors text-sm"
          >
            {a.title}
          </Link>
          <p className="text-xs text-slate-400">{a.category}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'difficulty',
      header: 'Difficulty',
      accessor: (a) => <StatusBadge status={a.difficulty} size="sm" />,
      sortable: true,
      align: 'center',
    },
    {
      key: 'durationMinutes',
      header: 'Duration',
      accessor: (a) => (
        <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
          {a.durationMinutes} mins
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'passingScore',
      header: 'Pass Mark',
      accessor: (a) => (
        <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
          {a.passingScore}%
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'attemptsCount',
      header: 'Attempts',
      accessor: (a) => (
        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
          {a.attemptsCount.toLocaleString()}
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (a) => <StatusBadge status={a.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      accessor: (a) => (
        <Link
          to={`/admin/assessments/${a.id}`}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200"
        >
          Manage
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Skill Assessments & Certifications"
        subtitle="Manage standardized technical tests for JavaScript, React, Node.js, and DSA hiring certifications."
      >
        <Link
          to="/admin/assessments/create"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Assessment</span>
        </Link>
      </PageHeader>

      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter assessments by title or category..."
          className="w-full sm:w-80"
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyExtractor={(a) => a.id}
        pageSize={10}
      />
    </div>
  );
};
