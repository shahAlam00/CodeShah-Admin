import React, { useState, useMemo } from 'react';
import { History, Search, Download, Filter, Shield } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { mockAuditLogs } from '../../../data/admin/auditLogs';
import { AuditLogEntry } from '../../../types/audit';
import { useToast } from '../../../context/ToastContext';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');
  const { showToast } = useToast();

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchQuery =
        log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ipAddress.includes(searchQuery);

      const matchAction = actionFilter === 'all' || log.action === actionFilter;
      const matchEntity = entityFilter === 'all' || log.entity === entityFilter;

      return matchQuery && matchAction && matchEntity;
    });
  }, [logs, searchQuery, actionFilter, entityFilter]);

  const handleExport = () => {
    showToast('success', 'Audit Trail Exported', `Generated compliant CSV log archive of ${filteredLogs.length} entries.`);
  };

  const columns: Column<AuditLogEntry>[] = [
    {
      key: 'adminName',
      header: 'Admin Actor',
      accessor: (log) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">{log.adminName}</p>
          <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">{log.adminRole}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'action',
      header: 'Action Taken',
      accessor: (log) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {log.action}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'entity',
      header: 'Entity',
      accessor: (log) => (
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-xs font-mono font-medium">
            {log.entity}
          </span>
          <span className="font-mono text-xs text-slate-400">{log.entityId}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'details',
      header: 'Event Description',
      accessor: (log) => (
        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm truncate">
          {log.details}
        </p>
      ),
    },
    {
      key: 'ipAddress',
      header: 'Origin IP',
      accessor: (log) => <span className="font-mono text-xs text-slate-400">{log.ipAddress}</span>,
    },
    {
      key: 'timestamp',
      header: 'Timestamp',
      accessor: (log) => <span className="text-xs text-slate-400 whitespace-nowrap">{log.timestamp}</span>,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Administrative Audit Logs"
        subtitle="Immutable security event records documenting privileged administrative actions, configuration changes, and sanctions."
      >
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 transition-colors shadow-soft-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Log</span>
        </button>
      </PageHeader>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by admin name, action, IP, or details..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Entities</option>
            <option value="Problem">Problem</option>
            <option value="Contest">Contest</option>
            <option value="User">User</option>
            <option value="Settings">Settings</option>
            <option value="Analytics">Analytics</option>
          </select>
        </div>
      </div>

      <DataTable
        data={filteredLogs}
        columns={columns}
        keyExtractor={(l) => l.id}
        pageSize={10}
      />
    </div>
  );
};
