import React, { useState } from 'react';
import {
  AlertOctagon,
  Search,
  CheckCircle2,
  Clock,
  User,
  Shield,
  MessageSquare,
  FileText,
  Send,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { Drawer } from '../../../components/admin/common/Drawer';
import { mockReports } from '../../../data/admin/reports';
import { ReportItem, ReportStatus } from '../../../types/community';
import { useToast } from '../../../context/ToastContext';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [newNote, setNewNote] = useState('');
  const { showToast } = useToast();

  const filtered = reports.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = (repId: string, status: ReportStatus) => {
    setReports(reports.map((r) => (r.id === repId ? { ...r, status } : r)));
    if (selectedReport && selectedReport.id === repId) {
      setSelectedReport({ ...selectedReport, status });
    }
    showToast('success', 'Status Updated', `Report moved to ${status}.`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedReport) return;
    const updatedNotes = [...selectedReport.adminNotes, newNote];
    setReports(
      reports.map((r) => (r.id === selectedReport.id ? { ...r, adminNotes: updatedNotes } : r))
    );
    setSelectedReport({ ...selectedReport, adminNotes: updatedNotes });
    setNewNote('');
    showToast('info', 'Note Recorded', 'Added administrative internal note.');
  };

  const columns: Column<ReportItem>[] = [
    {
      key: 'category',
      header: 'Category',
      accessor: (r) => (
        <div>
          <span className="font-bold text-xs text-rose-600 dark:text-rose-400 block">
            {r.category}
          </span>
          <span className="text-[11px] font-mono text-slate-400">{r.id}</span>
        </div>
      ),
      sortable: true,
      width: '140px',
    },
    {
      key: 'title',
      header: 'Report Title & Reason',
      accessor: (r) => (
        <div>
          <button
            onClick={() => setSelectedReport(r)}
            className="font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors text-sm text-left"
          >
            {r.title}
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Violation: <span className="font-medium text-slate-700 dark:text-slate-300">{r.reason}</span>
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'reportedTarget',
      header: 'Target Entity',
      accessor: (r) => (
        <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-navy-800 font-mono text-slate-700 dark:text-slate-300">
          {r.reportedTarget.type}: {r.reportedTarget.name}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      accessor: (r) => <StatusBadge status={r.priority} size="sm" />,
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (r) => <StatusBadge status={r.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      accessor: (r) => (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {r.assignedTo || 'Unassigned'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Review',
      align: 'right',
      accessor: (r) => (
        <button
          onClick={() => setSelectedReport(r)}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200"
        >
          Review
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Centralized Reports Desk"
        subtitle="Manage user violations, incorrect problem test cases, code plagiarism escalations, and abuse tickets."
      />

      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter reports by ticket, title, or reason..."
          className="w-full sm:w-80"
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyExtractor={(r) => r.id}
        pageSize={10}
      />

      {/* Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        title={selectedReport?.title || 'Report Ticket'}
        subtitle={`Ticket #${selectedReport?.id} • Category: ${selectedReport?.category}`}
      >
        {selectedReport && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedReport.priority} size="sm" />
                <span className="text-xs text-slate-400">Current Status:</span>
              </div>
              <div className="flex items-center gap-1.5">
                {(['Open', 'Investigating', 'Resolved', 'Rejected'] as ReportStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedReport.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedReport.status === st
                        ? 'bg-brand-600 text-white'
                        : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Reported Offense Description
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                {selectedReport.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Filed By</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedReport.reportedBy.name}
                </span>
                <p className="text-slate-400">@{selectedReport.reportedBy.username}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Investigating Staff</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedReport.assignedTo || 'Unassigned'}
                </span>
                <p className="text-slate-400">Lead Trust & Safety</p>
              </div>
            </div>

            {/* Admin Notes Section */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Internal Administrative Case Notes
              </h5>

              <div className="space-y-2">
                {selectedReport.adminNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                  >
                    • {note}
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record an investigation note..."
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
                >
                  Post Note
                </button>
              </form>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
