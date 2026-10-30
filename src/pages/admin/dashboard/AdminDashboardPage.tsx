import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Activity,
  Code2,
  Send,
  Swords,
  UserCheck,
  Sparkles,
  Server,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ArrowUpRight,
  Clock,
  RefreshCw,
  Plus,
  Play,
  Layers,
  Terminal,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatCard } from '../../../components/admin/common/StatCard';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import {
  mockDashboardKPIs,
  mockUserGrowthChart,
  mockSubmissionsOutcomeChart,
  mockDifficultyDistribution,
  mockTechnologyUsage,
} from '../../../data/admin/analytics';
import { mockServicesHealth, mockExecutionWorkers, mockQueueJobs } from '../../../data/admin/system';
import { mockLiveActivityFeed, mockAuditLogs } from '../../../data/admin/auditLogs';
import { mockReports } from '../../../data/admin/reports';

export const AdminDashboardPage: React.FC = () => {
  const { admin } = useAuth();
  const { showToast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('success', 'Telemetry Refreshed', 'Platform health, worker telemetry, and metrics updated.');
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dashboard Top Header */}
      <PageHeader
        title={`Good morning, ${admin?.name?.split(' ')[0] || 'Admin'}`}
        subtitle="Here's what's happening across the CodeForge ecosystem today."
        showBreadcrumbs={false}
      >
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors shadow-soft-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-600' : ''}`} />
          <span>Sync Telemetry</span>
        </button>
        <Link
          to="/admin/problems/create"
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Problem</span>
        </Link>
      </PageHeader>

      {/* 7 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={mockDashboardKPIs.totalUsers.value}
          changePercent={mockDashboardKPIs.totalUsers.changePercent}
          period={mockDashboardKPIs.totalUsers.period}
          icon={Users}
          sparkline={mockDashboardKPIs.totalUsers.sparkline}
          colorVariant="blue"
        />
        <StatCard
          title="Daily Active Users"
          value={mockDashboardKPIs.activeUsers.value}
          changePercent={mockDashboardKPIs.activeUsers.changePercent}
          period={mockDashboardKPIs.activeUsers.period}
          icon={Activity}
          sparkline={mockDashboardKPIs.activeUsers.sparkline}
          colorVariant="indigo"
        />
        <StatCard
          title="Total Problems"
          value={mockDashboardKPIs.problems.value}
          changePercent={mockDashboardKPIs.problems.changePercent}
          period={mockDashboardKPIs.problems.period}
          icon={Code2}
          sparkline={mockDashboardKPIs.problems.sparkline}
          colorVariant="blue"
        />
        <StatCard
          title="Submissions Today"
          value={mockDashboardKPIs.submissions.value}
          changePercent={mockDashboardKPIs.submissions.changePercent}
          period={mockDashboardKPIs.submissions.period}
          icon={Send}
          sparkline={mockDashboardKPIs.submissions.sparkline}
          colorVariant="emerald"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Active Contests"
          value={mockDashboardKPIs.contests.value}
          changePercent={mockDashboardKPIs.contests.changePercent}
          period={mockDashboardKPIs.contests.period}
          icon={Swords}
          sparkline={mockDashboardKPIs.contests.sparkline}
          colorVariant="amber"
        />
        <StatCard
          title="Assessments Taken"
          value={mockDashboardKPIs.assessments.value}
          changePercent={mockDashboardKPIs.assessments.changePercent}
          period={mockDashboardKPIs.assessments.period}
          icon={UserCheck}
          sparkline={mockDashboardKPIs.assessments.sparkline}
          colorVariant="indigo"
        />
        <StatCard
          title="AI Mock Interviews"
          value={mockDashboardKPIs.interviews.value}
          changePercent={mockDashboardKPIs.interviews.changePercent}
          period={mockDashboardKPIs.interviews.period}
          icon={Sparkles}
          sparkline={mockDashboardKPIs.interviews.sparkline}
          colorVariant="emerald"
        />
      </div>

      {/* Main Charts: User Growth & Submissions Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Area Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-navy-900 dark:text-white">
                Platform Activity & User Growth
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                DAU (Daily Active Users) vs Weekly Active Users over the past 7 days
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-500" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">DAU</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-500" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">WAU</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockUserGrowthChart}>
                <defs>
                  <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="wauGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b1329',
                    borderRadius: '12px',
                    borderColor: '#1e293b',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="wau" stroke="#6366f1" strokeWidth={2} fill="url(#wauGrad)" />
                <Area type="monotone" dataKey="dau" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#dauGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Submissions Outcome Distribution (1 col) */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Submission Outcomes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Breakdown across today's 42.9k submissions
            </p>

            <div className="h-44 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockSubmissionsOutcomeChart}
                    innerRadius={48}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {mockSubmissionsOutcomeChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1329',
                      borderRadius: '8px',
                      borderColor: '#1e293b',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            {mockSubmissionsOutcomeChart.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health Overview & Real-Time Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Infrastructure & Service Health</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Core microservices, cache layers, and execution pipelines
              </p>
            </div>
            <Link
              to="/admin/system"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Detailed Telemetry →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {mockServicesHealth.map((srv) => (
              <div
                key={srv.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-navy-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {srv.name.split(' ')[0]} {srv.name.split(' ')[1] || ''}
                  </p>
                  <StatusBadge status={srv.status} size="sm" variant="dot" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Latency: <strong className="text-slate-700 dark:text-slate-200">{srv.latencyMs}ms</strong></span>
                  <span>Uptime: <strong className="text-slate-700 dark:text-slate-200">{srv.uptimePercent}%</strong></span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 truncate">
                  {srv.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Feed (1 col) */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Platform Activity</span>
              </h3>
              <span className="text-[11px] text-slate-400">Real-time</span>
            </div>

            <div className="space-y-3.5">
              {mockLiveActivityFeed.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-xs">
                  <img
                    src={item.userAvatar}
                    alt={item.userName}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 dark:text-slate-200 leading-snug">
                      <strong className="font-semibold text-navy-900 dark:text-white">
                        {item.userName}
                      </strong>{' '}
                      <span className="text-slate-500 dark:text-slate-400">{item.action}</span>{' '}
                      <span className="font-semibold text-brand-600 dark:text-brand-400">
                        {item.target}
                      </span>
                    </p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              to="/admin/audit-logs"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View Full Administrative Audit Trail →
            </Link>
          </div>
        </div>
      </div>

      {/* Distributed Code Execution Workers & Moderation Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workers & Queue (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Distributed Code Execution Cluster</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                8 active gVisor sandbox nodes • 4 submissions processing in queue
              </p>
            </div>
            <Link
              to="/admin/system/executions"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Manage Cluster →
            </Link>
          </div>

          {/* 4 Representative Worker Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {mockExecutionWorkers.slice(0, 4).map((worker) => (
              <div
                key={worker.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/40 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 dark:text-white">
                      {worker.name}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      {worker.nodeIp}
                    </span>
                  </div>
                  <StatusBadge status={worker.status} size="sm" variant="dot" />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                      <span>CPU</span>
                      <span>{worker.cpuUsagePercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full ${
                          worker.cpuUsagePercent > 80 ? 'bg-rose-500' : 'bg-brand-500'
                        }`}
                        style={{ width: `${worker.cpuUsagePercent}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                      <span>RAM</span>
                      <span>{worker.memoryUsagePercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full ${
                          worker.memoryUsagePercent > 80 ? 'bg-rose-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${worker.memoryUsagePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {worker.currentSubmissionId && (
                  <p className="mt-2 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    Running: <strong>{worker.currentSubmissionId}</strong> ({worker.currentLanguage})
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Active Queue Snapshot */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Live Queue Pipeline (RabbitMQ)
            </h4>
            <div className="space-y-2">
              {mockQueueJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                      {job.submissionId}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {job.problemSlug}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-navy-800 text-[10px] font-mono">
                      {job.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px]">Enqueued {job.enqueuedAt}</span>
                    <StatusBadge status={job.status} size="sm" variant="dot" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Moderation Desk Queue (1 col) */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-500" />
                <span>Moderation Queue</span>
              </h3>
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                {mockReports.length} Open
              </span>
            </div>

            <div className="space-y-3">
              {mockReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/40"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 dark:text-rose-400">
                      {rep.category}
                    </span>
                    <StatusBadge status={rep.priority} size="sm" />
                  </div>
                  <h4 className="text-xs font-bold text-navy-900 dark:text-white line-clamp-1">
                    {rep.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {rep.description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-400">
                    <span>By: @{rep.reportedBy.username}</span>
                    <Link
                      to="/admin/reports"
                      className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                    >
                      Review →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/admin/discussions"
              className="w-full block text-center py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 rounded-xl transition-colors"
            >
              Open Community Moderation Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
