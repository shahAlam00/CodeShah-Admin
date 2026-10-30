import React, { useState } from 'react';
import { AlertTriangle, AlertOctagon, Info, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockSystemErrors } from '../../../data/admin/system';
import { SystemErrorLog } from '../../../types/system';
import { useToast } from '../../../context/ToastContext';

export const SystemErrorsPage: React.FC = () => {
  const [errors, setErrors] = useState<SystemErrorLog[]>(mockSystemErrors);
  const { showToast } = useToast();

  const handleResolve = (errId: string) => {
    setErrors(
      errors.map((e) => (e.id === errId ? { ...e, status: 'Resolved' } : e))
    );
    showToast('success', 'Error Resolved', `Marked ${errId} as resolved.`);
  };

  const columns: Column<SystemErrorLog>[] = [
    {
      key: 'id',
      header: 'Error ID',
      accessor: (e) => (
        <span className="font-mono font-bold text-xs text-rose-600 dark:text-rose-400">
          {e.id}
        </span>
      ),
      sortable: true,
      width: '120px',
    },
    {
      key: 'service',
      header: 'Service / Worker',
      accessor: (e) => (
        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
          {e.service}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'message',
      header: 'Error Message & Exception',
      accessor: (e) => (
        <div>
          <p className="font-mono text-xs text-slate-900 dark:text-white font-medium">
            {e.message}
          </p>
          {e.stackTrace && (
            <p className="font-mono text-[11px] text-slate-400 truncate max-w-md mt-0.5">
              {e.stackTrace}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'severity',
      header: 'Severity',
      accessor: (e) => <StatusBadge status={e.severity} size="sm" />,
      sortable: true,
      align: 'center',
    },
    {
      key: 'occurrences',
      header: 'Events',
      accessor: (e) => (
        <span className="font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
          {e.occurrences}x
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (e) => <StatusBadge status={e.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      accessor: (e) => (
        <div className="flex items-center justify-end">
          {e.status !== 'Resolved' ? (
            <button
              onClick={() => handleResolve(e.id)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200"
            >
              Resolve
            </button>
          ) : (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resolved</span>
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="System Error & Exception Tracking"
        subtitle="Aggregated panic traces, Docker daemon timeout alerts, and Redis cluster failover logs."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Errors Today</span>
          <p className="text-2xl font-bold font-mono text-navy-900 dark:text-white mt-1">23</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-rose-600">Critical Unresolved</span>
          <p className="text-2xl font-bold font-mono text-rose-600 mt-1">1</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-amber-500">API Gateway Timeouts</span>
          <p className="text-2xl font-bold font-mono text-amber-500 mt-1">6</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-brand-600">Worker Sandboxes</span>
          <p className="text-2xl font-bold font-mono text-brand-600 mt-1">16</p>
        </div>
      </div>

      <DataTable
        data={errors}
        columns={columns}
        keyExtractor={(e) => e.id}
        pageSize={10}
      />
    </div>
  );
};
