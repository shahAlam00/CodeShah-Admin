import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Code2,
  FolderTree,
  Building2,
  Milestone,
  Eye,
  Users,
  MessageSquare,
  AlertOctagon,
  Bell,
  Trophy,
  Flame,
  Swords,
  Send,
  Cpu,
  ListOrdered,
  ShieldCheck,
  UserCheck,
  Lock,
  History,
  Activity,
  AlertTriangle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Code2Icon,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { role, hasPermission } = useAuth();

  const sections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Analytics', path: '/admin/analytics', icon: BarChart3, resource: 'users' },
      ],
    },
    {
      title: 'CONTENT',
      items: [
        { name: 'Problems', path: '/admin/problems', icon: Code2, badge: '1,420', resource: 'problems' },
        { name: 'Topics', path: '/admin/topics', icon: FolderTree, resource: 'problems' },
        { name: 'Companies', path: '/admin/companies', icon: Building2, resource: 'problems' },
        { name: 'Roadmaps', path: '/admin/roadmaps', icon: Milestone, resource: 'roadmaps' },
        { name: 'DSA Visualizers', path: '/admin/visualizers', icon: Eye, resource: 'visualizers' },

      ],
    },
    {
      title: 'INTERVIEW',
      items: [
        { name: 'Interviews', path: '/admin/interviews', icon: Sparkles, resource: 'interviews' },
        { name: 'AI Question Bank', path: '/admin/interviews/questions', icon: Code2, resource: 'interviews' },
        { name: 'Assessments', path: '/admin/assessments', icon: UserCheck, resource: 'assessments' },
      ],
    },
    {
      title: 'COMMUNITY',
      items: [
        { name: 'Users', path: '/admin/users', icon: Users, badge: '128k', resource: 'users' },
        { name: 'Discussions', path: '/admin/discussions', icon: MessageSquare, resource: 'discussions' },
        { name: 'Reports', path: '/admin/reports', icon: AlertOctagon, badge: '4', badgeColor: 'bg-rose-500 text-white', resource: 'reports' },
        { name: 'Notifications', path: '/admin/notifications', icon: Bell, resource: 'settings' },
        { name: 'Achievements', path: '/admin/achievements', icon: Trophy, resource: 'settings' },
        { name: 'Streak Rules', path: '/admin/settings/streak', icon: Flame, resource: 'settings' },
      ],
    },
    {
      title: 'COMPETITION',
      items: [
        { name: 'Contests', path: '/admin/contests', icon: Swords, badge: 'Live', badgeColor: 'bg-emerald-500 text-white', resource: 'contests' },
      ],
    },
    {
      title: 'EXECUTION',
      items: [
        { name: 'Submissions', path: '/admin/submissions', icon: Send, resource: 'submissions' },
        { name: 'Execution Workers', path: '/admin/system/executions', icon: Cpu, badge: '8/10', resource: 'system' },
        { name: 'System Queues', path: '/admin/system/queues', icon: ListOrdered, resource: 'system' },
      ],
    },
    {
      title: 'SECURITY',
      items: [
        { name: 'Admins', path: '/admin/admins', icon: ShieldCheck, resource: 'users' },
        { name: 'Roles', path: '/admin/roles', icon: Lock, resource: 'settings' },
        { name: 'Permissions', path: '/admin/permissions', icon: ShieldCheck, resource: 'settings' },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: History, resource: 'auditLogs' },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'System Health', path: '/admin/system', icon: Activity, resource: 'system' },
        { name: 'Error Monitor', path: '/admin/system/errors', icon: AlertTriangle, badge: '3', badgeColor: 'bg-amber-500 text-white', resource: 'system' },
        { name: 'Settings', path: '/admin/settings', icon: Settings, resource: 'settings' },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 flex flex-col bg-white dark:bg-navy-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'
        }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80 dark:border-slate-800">
        <NavLink to="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold shadow-soft-sm shrink-0">
            <span className="text-xl tracking-wider font-mono">CF</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base text-navy-900 dark:text-white tracking-tight leading-none">
                CodeForge
              </span>
              <span className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold tracking-wider uppercase mt-1">
                Control Center
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {sections.map((sec, secIdx) => {
          // Filter items based on RBAC permission simulation if defined
          const visibleItems = sec.items.filter((item) => {
            if (!item.resource) return true;
            return hasPermission(item.resource as any, 'view');
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={secIdx}>
              {!collapsed && (
                <p className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  {sec.title}
                </p>
              )}
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.path === '/admin/dashboard'
                      ? location.pathname === '/admin' || location.pathname === '/admin/dashboard'
                      : location.pathname.startsWith(item.path);

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={collapsed ? item.name : undefined}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group ${isActive
                        ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 font-semibold shadow-soft-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800/60 hover:text-navy-900 dark:hover:text-white'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${isActive
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                            }`}
                        />
                        {!collapsed && (
                          <span className="truncate">{item.name}</span>
                        )}
                      </div>

                      {!collapsed && item.badge && (
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${item.badgeColor
                            ? item.badgeColor
                            : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                            }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Indicator Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Active Mode:
              </span>
            </div>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-950/50">
              {role}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
