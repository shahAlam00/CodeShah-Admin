import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  CheckSquare,
  FileCode,
  Building2,
  Trash2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { ConfirmModal } from '../../../components/admin/common/ConfirmModal';
import { ProblemStatus, ProblemDifficulty } from '../../../types/problem';
import { useToast } from '../../../context/ToastContext';
import adminApi from '../../../lib/adminApi';

// ── Minimal shape returned by GET /api/problem/all (no testCases/starterCode) ─
interface ProblemRow {
  id: string;          // mapped from _id
  _id: string;
  title: string;
  slug: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  category: string;
  topics: string[];
  companies: string[];
  acceptanceRate: number;
}

export const ProblemsListPage: React.FC = () => {
  const [problems, setProblems] = useState<ProblemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean; title: string; message: string; action: () => void;
  }>({ isOpen: false, title: '', message: '', action: () => { } });

  const { showToast } = useToast();
  const navigate = useNavigate();

  // ── Fetch from backend ──────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    adminApi
      .get('/problem/all', { params: { limit: 200 } })
      .then(({ data }) => {
        const rows: ProblemRow[] = (data.problems || []).map((p: any) => ({
          ...p,
          id: p._id,
          acceptanceRate: p.acceptanceRate ?? 0,
        }));
        setProblems(rows);
      })
      .catch(() => {
        showToast('error', 'Load Failed', 'Could not load problems from backend.');
      })
      .finally(() => setLoading(false));
  }, [refreshKey]);

  // ── Client-side filtering ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.topics.some((t) => t.toLowerCase().includes(q));
      const matchS = statusFilter === 'all' || p.status === statusFilter;
      const matchD = diffFilter === 'all' || p.difficulty === diffFilter;
      return matchQ && matchS && matchD;
    });
  }, [problems, searchQuery, statusFilter, diffFilter]);

  // ── Delete single ───────────────────────────────────────────────────────
  const confirmDelete = (p: ProblemRow) => {
    setConfirmModal({
      isOpen: true,
      title: `Delete "${p.title}"?`,
      message: 'This will permanently remove the problem, its test cases, and all related data. This action cannot be undone.',
      action: async () => {
        try {
          await adminApi.delete(`/problem/${p._id}`);
          setProblems((prev) => prev.filter((row) => row._id !== p._id));
          showToast('success', 'Problem Deleted', `"${p.title}" was removed from the catalog.`);
        } catch (err: any) {
          showToast('error', 'Delete Failed', err.response?.data?.message || err.message);
        }
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // ── Bulk status update ──────────────────────────────────────────────────
  const handleBulkStatus = async (status: ProblemStatus) => {
    try {
      await Promise.all(
        selectedIds.map((sid) =>
          adminApi.put(`/problem/${sid}`, { status })
        )
      );
      setProblems((prev) =>
        prev.map((p) => (selectedIds.includes(p._id) ? { ...p, status } : p))
      );
      showToast('success', 'Problems Updated', `Changed status to "${status}" for ${selectedIds.length} problems.`);
      setSelectedIds([]);
    } catch (err: any) {
      showToast('error', 'Bulk Update Failed', err.response?.data?.message || err.message);
    }
  };

  // ── Table columns ───────────────────────────────────────────────────────
  const columns: Column<ProblemRow>[] = [
    {
      key: 'status',
      header: 'Status',
      accessor: (p) => <StatusBadge status={p.status} size="sm" variant="dot" />,
      sortable: true,
      width: '120px',
    },
    {
      key: 'title',
      header: 'Problem Title',
      accessor: (p) => (
        <div>
          <Link
            to={`/admin/problems/${p._id}/edit`}
            className="font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors text-sm"
          >
            {p.title}
          </Link>
          <p className="text-xs font-mono text-slate-400">/{p.slug}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'difficulty',
      header: 'Difficulty',
      accessor: (p) => <StatusBadge status={p.difficulty} size="sm" />,
      sortable: true,
      align: 'center',
    },
    {
      key: 'topics',
      header: 'Topics',
      accessor: (p) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {p.topics.slice(0, 2).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
              {t}
            </span>
          ))}
          {p.topics.length > 2 && (
            <span className="text-[11px] text-slate-400 font-semibold">+{p.topics.length - 2}</span>
          )}
        </div>
      ),
    },
    {
      key: 'companies',
      header: 'Top Companies',
      accessor: (p) => (
        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate max-w-[120px]">{p.companies.slice(0, 2).join(', ')}</span>
        </div>
      ),
    },
    {
      key: 'acceptanceRate',
      header: 'Acceptance',
      accessor: (p) => (
        <span className="font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
          {p.acceptanceRate}%
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      accessor: (p) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/admin/problems/${p._id}/edit`}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => confirmDelete(p)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            title="Delete problem"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Problem Catalog"
        subtitle="Manage coding challenges, configure test suites, curate official solutions, and manage company tags."
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/admin/problems/create"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Problem</span>
          </Link>
        </div>
      </PageHeader>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by title, slug, topic…"
          className="w-full sm:w-80"
        />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Review">In Review</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
          <select
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center h-48 gap-2 text-slate-400 dark:text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading problems…</span>
        </div>
      ) : (
        <DataTable
          data={filtered}
          columns={columns}
          keyExtractor={(p) => p._id}
          selectedIds={selectedIds}
          onSelectIds={setSelectedIds}
          pageSize={10}
          emptyTitle="No problems found"
          emptyDescription="Try adjusting your search criteria or create a new problem."
          bulkActions={
            <>
              <button
                onClick={() => handleBulkStatus('Published')}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                Publish Selected
              </button>
              <button
                onClick={() => handleBulkStatus('Archived')}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-600 hover:bg-slate-700 text-white transition-colors"
              >
                Archive Selected
              </button>
            </>
          }
        />
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.action}
      />
    </div>
  );
};
