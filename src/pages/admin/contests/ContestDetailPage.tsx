import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Swords, Users, Clock, Award, Shield, CheckCircle2, Play } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockContests } from '../../../data/admin/contests';
import { useToast } from '../../../context/ToastContext';

export const ContestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contest = mockContests.find((c) => c.id === id) || mockContests[0];
  const { showToast } = useToast();

  const handleStartContest = () => {
    showToast('success', 'Contest Initiated', `Contest "${contest.title}" state moved to LIVE.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Link
          to="/admin/contests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Contests</span>
        </Link>
      </div>

      <PageHeader
        title={contest.title}
        subtitle={`Contest ID: ${contest.id} • Created by ${contest.createdBy}`}
      >
        <button
          onClick={handleStartContest}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Force Start Live Window</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-navy-900 dark:text-white">
                Contest Problem Sequence
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {contest.problems.length} Challenges Assigned
              </span>
            </div>

            <div className="space-y-3">
              {contest.problems.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-950 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center font-mono">
                      Q{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {p.title}
                      </h4>
                      <Link
                        to={`/admin/problems/${p.problemId}`}
                        className="text-brand-600 hover:underline text-[11px]"
                      >
                        Inspect Problem Details →
                      </Link>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm text-brand-600 dark:text-brand-400">
                    {p.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-3">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Rules & Regulations
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {contest.rules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Telemetry Sidebar Card */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
          <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">
            Tournament Status
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status:</span>
              <StatusBadge status={contest.status} size="sm" variant="dot" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Enrolled Users:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {contest.participantsCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Duration:</span>
              <span className="font-mono font-bold">{contest.durationMinutes} mins</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Prize Pool:</span>
              <span className="font-bold text-amber-500">{contest.prizePool || 'None'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
