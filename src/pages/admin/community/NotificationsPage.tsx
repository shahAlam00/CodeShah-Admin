import React, { useState } from 'react';
import { Bell, Plus, Send, Clock, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockNotifications } from '../../../data/admin/community';
import { NotificationBroadcast } from '../../../types/community';
import { useToast } from '../../../context/ToastContext';

export const NotificationsPage: React.FC = () => {
  const [broadcasts, setBroadcasts] = useState<NotificationBroadcast[]>(mockNotifications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotif, setNewNotif] = useState({
    title: '',
    message: '',
    type: 'System' as any,
    audience: 'All Users' as any,
    scheduleTime: new Date().toISOString().slice(0, 16),
  });

  const { showToast } = useToast();

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const created: NotificationBroadcast = {
      id: `notif-${Date.now().toString().slice(-4)}`,
      title: newNotif.title,
      message: newNotif.message,
      type: newNotif.type,
      audience: newNotif.audience,
      scheduleTime: newNotif.scheduleTime,
      status: 'Sent',
      sentCount: 128452,
      createdBy: 'Shahrukh Khan',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBroadcasts([created, ...broadcasts]);
    setIsModalOpen(false);
    showToast('success', 'Broadcast Dispatched', `Broadcast pushed to ${newNotif.audience}.`);
  };

  const columns: Column<NotificationBroadcast>[] = [
    {
      key: 'title',
      header: 'Broadcast Message',
      accessor: (b) => (
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{b.title}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{b.message}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'type',
      header: 'Category',
      accessor: (b) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
          {b.type}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'audience',
      header: 'Target Segment',
      accessor: (b) => (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {b.audience}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'sentCount',
      header: 'Recipients',
      accessor: (b) => (
        <span className="font-mono font-bold text-xs text-brand-600 dark:text-brand-400">
          {b.sentCount.toLocaleString()}
        </span>
      ),
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (b) => <StatusBadge status={b.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'createdAt',
      header: 'Date',
      accessor: (b) => <span className="text-xs text-slate-400">{b.createdAt}</span>,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Platform Notification Center"
        subtitle="Broadcast global system alerts, tournament start announcements, and maintenance advisories."
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Notification Broadcast</span>
        </button>
      </PageHeader>

      <DataTable
        data={broadcasts}
        columns={columns}
        keyExtractor={(b) => b.id}
        pageSize={10}
      />

      {/* Broadcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-lg space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Dispatch Global Notification
            </h3>

            <form onSubmit={handleDispatch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Notification Title
                </label>
                <input
                  type="text"
                  required
                  value={newNotif.title}
                  onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                  placeholder="e.g. Biweekly Clash #105 starts in 30 minutes!"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Body
                </label>
                <textarea
                  rows={3}
                  required
                  value={newNotif.message}
                  onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                  placeholder="Body content visible in user notifications tray..."
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Notification Category
                  </label>
                  <select
                    value={newNotif.type}
                    onChange={(e) => setNewNotif({ ...newNotif, type: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  >
                    <option value="System">System Alert</option>
                    <option value="Contest">Contest Alert</option>
                    <option value="Maintenance">Maintenance Advisory</option>
                    <option value="Announcement">Product Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Audience Segment
                  </label>
                  <select
                    value={newNotif.audience}
                    onChange={(e) => setNewNotif({ ...newNotif, audience: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  >
                    <option value="All Users">All Users (128,452)</option>
                    <option value="Active Users">Active Users Only</option>
                    <option value="Premium Users">Premium Tier</option>
                    <option value="Contest Participants">Registered Contestants</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Push Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
