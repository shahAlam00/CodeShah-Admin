import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Download,
  Calendar,
  Layers,
  Code2,
  Clock,
  Target,
  Percent,
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
  Legend,
} from 'recharts';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatCard } from '../../../components/admin/common/StatCard';
import { Tabs } from '../../../components/admin/common/Tabs';
import {
  mockUserGrowthChart,
  mockSubmissionsOutcomeChart,
  mockDifficultyDistribution,
  mockTechnologyUsage,
  mockCohortRetention,
} from '../../../data/admin/analytics';
import { useToast } from '../../../context/ToastContext';

export const AnalyticsDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30 Days');
  const [activeTab, setActiveTab] = useState('users');
  const { showToast } = useToast();

  const handleExport = () => {
    showToast('success', 'Report Exported', `Generated CSV report for ${dateRange} analytics window.`);
  };

  const analyticsTabs = [
    { id: 'users', label: 'User & Retention' },
    { id: 'problems', label: 'Problem & Language' },
    { id: 'submissions', label: 'Submissions & Outcomes' },
    { id: 'assessments', label: 'Assessments & Interviews' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Platform Analytics & Telemetry"
        subtitle="In-depth user growth curves, cohort retention matrix, technology trends, and completion funnels."
      >
        <div className="flex items-center gap-2">
          {['7 Days', '30 Days', '90 Days', '1 Year'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                dateRange === range
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800'
              }`}
            >
              {range}
            </button>
          ))}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 transition-colors shadow-soft-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </PageHeader>

      {/* Tabs */}
      <Tabs tabs={analyticsTabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">DAU / MAU Ratio</p>
          <h3 className="text-2xl font-bold text-navy-900 dark:text-white mt-1.5">27.1%</h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.2% high engagement stickiness</span>
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. Solving Time</p>
          <h3 className="text-2xl font-bold text-navy-900 dark:text-white mt-1.5">22.4 mins</h3>
          <p className="text-xs text-slate-400 mt-2">Across medium difficulty algorithms</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Global Acceptance Rate</p>
          <h3 className="text-2xl font-bold text-navy-900 dark:text-white mt-1.5">58.4%</h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">Consistent quality benchmark</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assessment Pass Rate</p>
          <h3 className="text-2xl font-bold text-navy-900 dark:text-white mt-1.5">64.8%</h3>
          <p className="text-xs text-brand-600 dark:text-brand-400 mt-2 font-medium">8,420 total tests taken</p>
        </div>
      </div>

      {/* Cohort Retention Table Section (Section 36) */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Weekly Cohort Retention Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Percentage of signed-up users returning to solve at least 1 problem in subsequent weeks
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-slate-500">&gt; 70% Retained</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-brand-500" />
              <span className="text-slate-500">50-70% Retained</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 text-left">Cohort Window</th>
                <th className="pb-3 text-center">New Users</th>
                <th className="pb-3 text-center">Week 1</th>
                <th className="pb-3 text-center">Week 2</th>
                <th className="pb-3 text-center">Week 3</th>
                <th className="pb-3 text-center">Week 4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {mockCohortRetention.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-navy-800/40">
                  <td className="py-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
                    {row.cohort}
                  </td>
                  <td className="py-3 text-center font-bold text-slate-700 dark:text-slate-300">
                    {row.users.toLocaleString()}
                  </td>
                  <td className="py-3 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                      {row.w1}%
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {row.w2 !== null ? (
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md font-bold ${
                          row.w2 >= 70
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                            : 'bg-brand-500/20 text-brand-700 dark:text-brand-300'
                        }`}
                      >
                        {row.w2}%
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {row.w3 !== null ? (
                      <span className="inline-block px-2.5 py-1 rounded-md bg-brand-500/20 text-brand-700 dark:text-brand-300 font-bold">
                        {row.w3}%
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {row.w4 !== null ? (
                      <span className="inline-block px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                        {row.w4}%
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Language Breakdown & Difficulty Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Programming Languages Usage Bar Chart */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
          <h3 className="text-base font-bold text-navy-900 dark:text-white">
            Programming Language Distribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-6">
            Share of code submissions processed by execution worker sandboxes
          </p>

          <div className="space-y-4">
            {mockTechnologyUsage.map((tech) => (
              <div key={tech.language} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {tech.language}
                  </span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">
                    {tech.count.toLocaleString()} submissions ({tech.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${tech.percentage}%`,
                      backgroundColor: tech.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem Difficulty Breakdown */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
          <h3 className="text-base font-bold text-navy-900 dark:text-white">
            Problem Difficulty Distribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-6">
            Current catalog of 1,420 published algorithm and system problems
          </p>

          <div className="grid grid-cols-3 gap-4">
            {mockDifficultyDistribution.map((diff) => (
              <div
                key={diff.name}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/40 text-center"
              >
                <span
                  className="w-3 h-3 rounded-full inline-block mb-2"
                  style={{ backgroundColor: diff.color }}
                />
                <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                  {diff.name}
                </h4>
                <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                  {diff.count}
                </p>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {diff.percentage}% of total
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-brand-50/80 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900/60 text-xs text-brand-800 dark:text-brand-300">
            <strong>Curriculum Balance Note:</strong> Medium problems represent ~51% of our catalog, which matches typical FAANG and Tier 1 screening distributions.
          </div>
        </div>
      </div>
    </div>
  );
};
