import React, { useState } from 'react';
import { ListOrdered, Search, RefreshCw, Trash2, ArrowUpRight, Clock, Cpu } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockQueueJobs } from '../../../data/admin/system';
import { QueueJob } from '../../../types/system';
import { useToast } from '../../../context/ToastContext';

export const SystemQueuesPage: React.FC = () => {
  const [jobs, setJobs] = useState<QueueJob[]>(mockQueueJobs);
  const { showToast } = useToast();

  const handlePurgeQueue = () => {
    setJobs([]);
    showToast('warning', 'Queue Purged', 'Flushed non-running submissions from RabbitMQ pipeline.');
  };

  const columns: Column<QueueJob>[] = [
    {
      key: 'submissionId',
      header: 'Task ID',
      accessor: (j) => (
        <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
          {j.submissionId}
        </span>
      ),
      sortable: true,
      width: '140px',
    },
    {
      key: 'problemSlug',
      header: 'Target Challenge',
      accessor: (j) => (
        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
          {j.problemSlug}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'language',
      header: 'Compiler Environment',
      accessor: (j) => (
        <span className="px-2 py-0.5 rounded font-mono text-xs bg-slate-100 dark:bg-navy-800">
          {j.language}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'priority',
      header: 'Priority',
      accessor: (j) => (
        <span
          className={`px-2 py-0.5 rounded text-xs font-semibold ${
            j.priority === 'High'
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              : 'bg-slate-100 text-slate-700 dark:bg-navy-800 dark:text-slate-300'
          }`}
        >
          {j.priority}
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Queue Status',
      accessor: (j) => <StatusBadge status={j.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'waitDurationMs',
      header: 'Wait Duration',
      accessor: (j) => (
        <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
          {(j.waitDurationMs / 1000).toFixed(1)}s
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'workerAssigned',
      header: 'Worker Assignment',
      accessor: (j) => (
        <span className="font-mono text-xs text-slate-500">
          {j.workerAssigned || 'Waiting for node...'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Execution Queue Pipelines (RabbitMQ)"
        subtitle="Inspect task queues dispatching candidate solutions to distributed gVisor sandbox workers."
      >
        <button
          onClick={handlePurgeQueue}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900 rounded-xl transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Purge Idle Queue</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase">Pending Depth</span>
          <p className="text-2xl font-bold font-mono text-navy-900 dark:text-white mt-1">
            {jobs.filter((j) => j.status === 'Waiting').length} Jobs
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase">In Execution</span>
          <p className="text-2xl font-bold font-mono text-brand-600 mt-1">
            {jobs.filter((j) => j.status === 'Running').length} Sandboxes
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase">Avg Pipeline Latency</span>
          <p className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            1.4s
          </p>
        </div>
      </div>

      <DataTable
        data={jobs}
        columns={columns}
        keyExtractor={(j) => j.id}
        pageSize={10}
      />
    </div>
  );
};
