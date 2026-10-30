import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  MapPin,
  Calendar,
  Award,
  Flame,
  Star,
  Shield,
  Ban,
  Lock,
  Send,
  Bell,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Github,
  Globe,
  Clock,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { Tabs } from '../../../components/admin/common/Tabs';
import { ConfirmModal } from '../../../components/admin/common/ConfirmModal';
import { mockUsers, mockUserActivity } from '../../../data/admin/users';
import { mockSubmissions } from '../../../data/admin/submissions';
import { useToast } from '../../../context/ToastContext';
import { UserRole, UserStatus } from '../../../types/user';

export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = mockUsers.find((u) => u.id === id) || mockUsers[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [role, setRole] = useState<UserRole>(user.role);
  const { showToast } = useToast();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: () => {},
  });

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Live Activity' },
    { id: 'submissions', label: 'Submissions History' },
    { id: 'contests', label: 'Contest Ranks' },
    { id: 'assessments', label: 'Certifications' },
    { id: 'reports', label: 'Reports & Infractions' },
  ];

  const handleStatusUpdate = (newStatus: UserStatus) => {
    setStatus(newStatus);
    showToast('success', 'Status Changed', `User status transitioned to ${newStatus}.`);
  };

  const handlePasswordReset = () => {
    showToast('success', 'Recovery Dispatched', `Password reset token mailed to ${user.email}.`);
  };

  const userSubmissions = mockSubmissions.filter((s) => s.userId === user.id);
  const activities = mockUserActivity[user.id] || [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button */}
      <div>
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users Directory</span>
        </Link>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-brand-500/30 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white">
                  {user.name}
                </h2>
                <StatusBadge status={status} size="sm" variant="dot" />
                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                  {role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">@{user.username} • User ID: <span className="font-mono">{user.id}</span></p>

              <div className="mt-3 flex items-center flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{user.email}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Joined {user.joinedAt}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Admin Action Toolbar */}
          <div className="flex items-center flex-wrap gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePasswordReset}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Password</span>
            </button>

            {status === 'active' ? (
              <button
                onClick={() =>
                  setConfirmModal({
                    isOpen: true,
                    title: `Suspend ${user.name}?`,
                    message: 'User will be temporarily blocked from contests and live interviews.',
                    action: () => handleStatusUpdate('suspended'),
                  })
                }
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 transition-colors flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Suspend</span>
              </button>
            ) : (
              <button
                onClick={() => handleStatusUpdate('active')}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors"
              >
                Re-activate Account
              </button>
            )}

            <button
              onClick={() =>
                setConfirmModal({
                  isOpen: true,
                  title: `Ban ${user.name} Permanently?`,
                  message: 'This will lock down all account tokens, invalidate submissions, and archive ranking entries.',
                  action: () => handleStatusUpdate('banned'),
                })
              }
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 transition-colors flex items-center gap-1.5"
            >
              <Ban className="w-3.5 h-3.5 text-rose-500" />
              <span>Ban Account</span>
            </button>
          </div>
        </div>

        {/* 6 Key Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/50 border border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium">Problems Solved</span>
            <p className="text-lg font-bold font-mono text-navy-900 dark:text-white mt-0.5">
              {user.stats.problemsSolved}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/50 border border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium">Acceptance Rate</span>
            <p className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              {user.stats.acceptanceRate}%
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/50 border border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium">Contest Rating</span>
            <p className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5">
              {user.stats.contestRating}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/50 border border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium">Global Rank</span>
            <p className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
              #{user.stats.globalRank}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/50 border border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium">Current Streak</span>
            <p className="text-lg font-bold font-mono text-rose-500 mt-0.5 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-rose-500" />
              <span>{user.stats.currentStreak} days</span>
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/50 border border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium">Longest Streak</span>
            <p className="text-lg font-bold font-mono text-slate-700 dark:text-slate-300 mt-0.5">
              {user.stats.longestStreak} days
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
            <h3 className="text-base font-bold text-navy-900 dark:text-white mb-3">
              Engineer Profile & Bio
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {user.bio || 'No bio provided by candidate.'}
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Code Executions:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{user.stats.totalSubmissions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Skill Certifications:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{user.stats.assessmentsCompleted} passed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">AI Mock Interviews:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{user.stats.mockInterviews} sessions</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
            <h3 className="text-base font-bold text-navy-900 dark:text-white mb-3">
              Role & Permissions Assignment
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Switching user tier will unlock mentor privileges, private contest access, or staff portals.
            </p>

            <div className="space-y-3">
              {(['User', 'Premium', 'Mentor', 'Admin'] as UserRole[]).map((r) => (
                <label
                  key={r}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    role === r
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-950 dark:text-brand-200'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs font-semibold">{r}</span>
                  <input
                    type="radio"
                    name="userRole"
                    checked={role === r}
                    onChange={() => {
                      setRole(r);
                      showToast('success', 'Role Assigned', `Updated ${user.name}'s role to ${r}.`);
                    }}
                    className="text-brand-600 focus:ring-brand-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
          <h3 className="text-base font-bold text-navy-900 dark:text-white mb-4">
            Recent Candidate Activity Log
          </h3>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">No recent activity logged for this user.</p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-100 dark:border-slate-800 text-xs">
                  <div className="p-2 rounded-lg bg-white dark:bg-navy-900 shadow-soft-xs text-brand-600">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{act.title}</h4>
                      <span className="text-slate-400">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">{act.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'submissions' && (
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
          <h3 className="text-base font-bold text-navy-900 dark:text-white mb-4">
            Submitted Problem Solutions
          </h3>
          <div className="space-y-3">
            {userSubmissions.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">No submissions recorded for this user yet.</p>
            ) : (
              userSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-brand-600">{sub.id}</span>
                    <Link
                      to={`/admin/problems/${sub.problemId}`}
                      className="font-bold text-slate-900 dark:text-white hover:underline text-sm"
                    >
                      {sub.problemTitle}
                    </Link>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 font-mono text-[11px]">
                      {sub.language}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-slate-400">{sub.runtime}ms</span>
                    <StatusBadge status={sub.status} size="sm" />
                    <Link
                      to={`/admin/submissions/${sub.id}`}
                      className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                    >
                      Inspect Code →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
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
