import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus, Search, Play, Code2, Layers } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { mockVisualizers } from '../../../data/admin/visualizers';
import { DSAVisualizer } from '../../../types/visualizer';

export const VisualizersListPage: React.FC = () => {
  const [visualizers, setVisualizers] = useState<DSAVisualizer[]>(mockVisualizers);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = visualizers.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<DSAVisualizer>[] = [
    {
      key: 'name',
      header: 'Visualizer',
      accessor: (v) => (
        <div>
          <Link
            to={`/admin/visualizers/create?id=${v.id}`}
            className="font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors text-sm"
          >
            {v.name}
          </Link>
          <p className="text-xs text-slate-400">Algorithm: {v.algorithm}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'category',
      header: 'Category',
      accessor: (v) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
          {v.category}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'timeComplexity',
      header: 'Time (Avg)',
      accessor: (v) => (
        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
          {v.timeComplexity.average}
        </span>
      ),
      align: 'center',
    },
    {
      key: 'spaceComplexity',
      header: 'Space (Aux)',
      accessor: (v) => (
        <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
          {v.spaceComplexity}
        </span>
      ),
      align: 'center',
    },
    {
      key: 'viewCount',
      header: 'Learner Views',
      accessor: (v) => (
        <span className="font-mono font-bold text-xs text-brand-600 dark:text-brand-400">
          {v.viewCount.toLocaleString()}
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (v) => <StatusBadge status={v.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      accessor: (v) => (
        <Link
          to={`/admin/visualizers/create?id=${v.id}`}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200"
        >
          Configure
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="DSA Interactive Visualizers"
        subtitle="Manage step-by-step graphic animations, pseudocode traces, and color schemes for sorting, tree, and graph algorithms."
      >
        <Link
          to="/admin/visualizers/create"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Visualizer</span>
        </Link>
      </PageHeader>

      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter visualizers by algorithm or category..."
          className="w-full sm:w-80"
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyExtractor={(v) => v.id}
        pageSize={10}
      />
    </div>
  );
};
