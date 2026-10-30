import React, { useState } from 'react';
import { ShieldCheck, Plus, Mail, Lock, UserCheck, Trash2, Key } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { initialAdminUsers } from '../../../data/admin/rbac';
import { AdminUser, AdminRole } from '../../../types/rbac';
import { useToast } from '../../../context/ToastContext';

export const AdminsPage: React.FC = () => {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdminUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Content Admin' as AdminRole,
    department: 'Platform Engineering',
  });
  const { showToast } = useToast();

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const created: AdminUser = {
      id: `adm-00${admins.length + 1}`,
      name: newAdmin.name,
      email: newAdmin.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      role: newAdmin.role,
      status: 'active',
      lastLogin: 'Never',
      mfaEnabled: true,
      department: newAdmin.department,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAdmins([...admins, created]);
    setIsModalOpen(false);
    showToast('success', 'Admin Invited', `Privileged invite dispatched to ${newAdmin.email}.`);
  };

  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      header: 'Admin',
      accessor: (a) => (
        <div className="flex items-center gap-3">
          <img
            src={a.avatar}
            alt={a.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-brand-500/30"
          />
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{a.name}</p>
            <p className="text-xs text-slate-400">{a.department}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      accessor: (a) => <span className="font-mono text-xs">{a.email}</span>,
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role Tier',
      accessor: (a) => (
        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
          {a.role}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'mfaEnabled',
      header: 'MFA',
      accessor: (a) => (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
            a.mfaEnabled
              ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300'
              : 'text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300'
          }`}
        >
          {a.mfaEnabled ? 'Enforced' : 'Disabled'}
        </span>
      ),
      align: 'center',
    },
    {
      key: 'lastLogin',
      header: 'Last Active',
      accessor: (a) => <span className="text-xs text-slate-400">{a.lastLogin}</span>,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (a) => <StatusBadge status={a.status} size="sm" variant="dot" />,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Admin Staff Directory"
        subtitle="Manage elevated platform administrators, configure hardware MFA tokens, and provision departmental scopes."
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Provision New Admin</span>
        </button>
      </PageHeader>

      <DataTable
        data={admins}
        columns={columns}
        keyExtractor={(a) => a.id}
        pageSize={10}
      />

      {/* Modal for Provisioning Admin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-1">
              Provision Platform Admin
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Invited administrator will receive a hardware MFA setup link via encrypted email.
            </p>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  placeholder="name@codeforge.io"
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Administrative Role Tier
                </label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as AdminRole })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Super Admin">Super Admin (Full Root Access)</option>
                  <option value="Content Admin">Content Admin</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Support Admin">Support Admin</option>
                  <option value="Analytics Admin">Analytics Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
                >
                  Issue Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
