import React, { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, AlertOctagon, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  timestamp: string;
  link?: string;
  isRead: boolean;
}

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: 'notif-1',
      title: 'Worker #4 Unhealthy',
      message: 'Docker daemon timeout reported on US-East sandbox node.',
      severity: 'critical',
      timestamp: '2 mins ago',
      link: '/admin/system/executions',
      isRead: false,
    },
    {
      id: 'notif-2',
      title: '4 Pending Reports',
      message: 'Harassment and plagiarism reports require moderator action.',
      severity: 'warning',
      timestamp: '14 mins ago',
      link: '/admin/reports',
      isRead: false,
    },
    {
      id: 'notif-3',
      title: 'Contest Starting Soon',
      message: 'CodeForge Biweekly Clash #105 starts in 30 minutes.',
      severity: 'info',
      timestamp: '28 mins ago',
      link: '/admin/contests/cnt-105',
      isRead: false,
    },
    {
      id: 'notif-4',
      title: 'High Submission Traffic',
      message: 'Ingestion rate reached 142 req/min on RabbitMQ queue.',
      severity: 'info',
      timestamp: '1 hour ago',
      link: '/admin/system/queues',
      isRead: true,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
        title="Admin Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft-lg z-50 overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/50">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                Admin Alerts
              </h4>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {notifications.map((notif) => (
              <Link
                key={notif.id}
                to={notif.link || '#'}
                onClick={() => setIsOpen(false)}
                className={`flex items-start gap-3 p-3.5 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors ${
                  !notif.isRead ? 'bg-brand-50/20 dark:bg-brand-950/10' : ''
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {notif.severity === 'critical' && (
                    <AlertOctagon className="w-4 h-4 text-rose-500" />
                  )}
                  {notif.severity === 'warning' && (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                  {notif.severity === 'info' && (
                    <Sparkles className="w-4 h-4 text-brand-500" />
                  )}
                  {notif.severity === 'success' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {notif.message}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-2 border-t border-slate-200 dark:border-slate-800 text-center bg-slate-50/50 dark:bg-navy-950/50">
            <Link
              to="/admin/reports"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View Moderation Desk & System Alerts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
