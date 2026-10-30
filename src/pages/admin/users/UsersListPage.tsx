import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  Mail,
  Shield,
  Download,
  MoreVertical,
  KeyRound,
  Flame,
  Star,
  CheckCircle2,
  Ban,
  Trash2,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { ConfirmModal } from '../../../components/admin/common/ConfirmModal';
import { mockUsers } from '../../../data/admin/users';
import { PlatformUser, UserStatus, UserRole } from '../../../types/user';
import { useToast } from '../../../context/ToastContext';

export const UsersListPage: React.FC = () => {
  const [users, setUsers] = useState<PlatformUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmAction, setConfirmAction] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const { showToast } = useToast();
  const navigate = useNavigate();

  // Filter logic
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchQuery =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || u.status === statusFilter;
      const matchRole = roleFilter === 'all' || u.role === roleFilter;

      return matchQuery && matchStatus && matchRole;
    });
  }, [users, searchQuery, statusFilter, roleFilter]);

  // Actions
  const handleSingleStatusChange = (userId: string, newStatus: UserStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    showToast('success', 'User Updated', `User status updated to ${newStatus}.`);
  };

  const handleBulkStatusChange = (newStatus: UserStatus) => {
    setUsers((prev) =>
      prev.map((u) => (selectedIds.includes(u.id) ? { ...u, status: newStatus } : u))
    );
    showToast(
      'success',
      'Bulk Action Applied',
      `Updated ${selectedIds.length} users to status: ${newStatus}.`
    );
    setSelectedIds([]);
  };

  const handleExport = () => {
    showToast('success', 'Export Started', `Exporting ${filteredUsers.length} user records to CSV.`);
  };

  const columns: Column<PlatformUser>[] = [
    {
      key: 'user',
      header: 'User',
      accessor: (u) => (
        <div className="flex items-center gap-3">
          <img
            src={u.avatar}
            alt={u.name}
            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <Link
              to={`/admin/users/${u.id}`}
              className="font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors"
            >
              {u.name}
            </Link>
            <p className="text-xs text-slate-400">@{u.username}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      accessor: (u) => <span className="font-mono text-xs">{u.email}</span>,
    },
    {
      key: 'role',
      header: 'Role',
      accessor: (u) => (
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
            u.role === 'Admin'
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300'
              : u.role === 'Mentor'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300'
              : u.role === 'Premium'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
              : 'bg-slate-100 text-slate-700 dark:bg-navy-800 dark:text-slate-300'
          }`}
        >
          {u.role}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'problemsSolved',
      header: 'Solved',
      accessor: (u) => (
        <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
          {u.stats.problemsSolved}
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'contestRating',
      header: 'Rating',
      accessor: (u) => (
        <div className="flex items-center justify-center gap-1 font-mono font-bold text-amber-600 dark:text-amber-400">
          <Star className="w-3 h-3 fill-amber-500" />
          <span>{u.stats.contestRating}</span>
        </div>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'currentStreak',
      header: 'Streak',
      accessor: (u) => (
        <div className="flex items-center justify-center gap-1 font-mono text-xs font-semibold text-rose-500">
          <Flame className="w-3.5 h-3.5 fill-rose-500" />
          <span>{u.stats.currentStreak}d</span>
        </div>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (u) => <StatusBadge status={u.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'joinedAt',
      header: 'Joined',
      accessor: (u) => <span className="text-xs text-slate-400">{u.joinedAt}</span>,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      accessor: (u) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/admin/users/${u.id}`}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            Profile
          </Link>
          {u.status === 'active' ? (
            <button
              onClick={() =>
                setConfirmAction({
                  isOpen: true,
                  title: `Suspend ${u.name}?`,
                  message:
                    'Suspending this account will revoke contest eligibility and sandbox execution privileges.',
                  onConfirm: () => handleSingleStatusChange(u.id, 'suspended'),
                })
              }
              className="p-1 rounded-lg text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40"
              title="Suspend User"
            >
              <Ban className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleSingleStatusChange(u.id, 'active')}
              className="p-1 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              title="Activate User"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="User Management"
        subtitle="Manage platform users, inspect problem submission histories, assign roles, and handle account sanctions."
      >
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 transition-colors shadow-soft-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Users</span>
        </button>
      </PageHeader>

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, username, or email..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="User">Standard User</option>
            <option value="Premium">Premium</option>
            <option value="Mentor">Mentor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Reusable Data Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        keyExtractor={(u) => u.id}
        selectedIds={selectedIds}
        onSelectIds={setSelectedIds}
        pageSize={10}
        emptyTitle="No users found"
        emptyDescription="Try adjusting your search query or filter settings."
        bulkActions={
          <>
            <button
              onClick={() => handleBulkStatusChange('active')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              Activate Selected
            </button>
            <button
              onClick={() =>
                setConfirmAction({
                  isOpen: true,
                  title: `Suspend ${selectedIds.length} accounts?`,
                  message:
                    'These users will immediately lose access to coding sandboxes and contests.',
                  onConfirm: () => handleBulkStatusChange('suspended'),
                })
              }
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors"
            >
              Suspend Selected
            </button>
          </>
        }
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmAction.isOpen}
        title={confirmAction.title}
        message={confirmAction.message}
        onClose={() => setConfirmAction((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmAction.onConfirm}
      />
    </div>
  );
};
