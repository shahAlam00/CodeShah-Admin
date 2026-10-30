import React, { useState } from 'react';
import { Flame, Save, Calendar, Award, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { mockStreakConfig } from '../../../data/admin/community';
import { StreakConfig } from '../../../types/community';
import { useToast } from '../../../context/ToastContext';

export const StreakSettingsPage: React.FC = () => {
  const [config, setConfig] = useState<StreakConfig>(mockStreakConfig);
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Streak Rules Saved', 'Updated daily goal rules, streak calculation hours, and grace policies.');
  };

  // 30 days mock heatmap preview
  const days = Array.from({ length: 35 }, (_, i) => ({
    day: i + 1,
    solved: i === 4 || i === 12 || i === 19 ? 0 : Math.floor(Math.random() * 4) + 1,
  }));

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <PageHeader
        title="Coding Streak & Consistency Engine"
        subtitle="Configure daily activity thresholds, freeze allowances, grace windows, and automated milestone awards."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settings Form */}
        <form onSubmit={handleSave} className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
          <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Streak Computation Rules</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Daily Goal (Minimum Problems to Count)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={config.dailyGoalProblems}
              onChange={(e) => setConfig({ ...config, dailyGoalProblems: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Streak Calculation Window (Hours)
            </label>
            <input
              type="number"
              value={config.streakCalculationHours}
              onChange={(e) => setConfig({ ...config, streakCalculationHours: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
            <span className="text-[10px] text-slate-400">Default 24h aligned to candidate local timezone.</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Grace / Freeze Days Per Month
            </label>
            <input
              type="number"
              value={config.graceDaysPerMonth}
              onChange={(e) => setConfig({ ...config, graceDaysPerMonth: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Base XP Awarded Per Accepted Problem
            </label>
            <input
              type="number"
              value={config.xpPerProblem}
              onChange={(e) => setConfig({ ...config, xpPerProblem: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Apply Streak Rules</span>
          </button>
        </form>

        {/* Live Calendar Heatmap Preview */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <span>User Calendar Experience Preview</span>
            </h3>

            <p className="text-xs text-slate-500 mb-4">
              Visualizes how candidate profiles reflect daily problem completions.
            </p>

            <div className="grid grid-cols-7 gap-1.5 p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
              {days.map((d, i) => (
                <div
                  key={i}
                  className={`h-8 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold ${
                    d.solved === 0
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      : d.solved === 1
                      ? 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                      : d.solved === 2
                      ? 'bg-emerald-400 text-emerald-950'
                      : 'bg-emerald-500 text-white shadow-soft-xs'
                  }`}
                  title={`Day ${d.day}: ${d.solved} problems`}
                >
                  {d.day}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Current Month: 32 Active Streak</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px]">Less</span>
              <span className="w-2.5 h-2.5 rounded bg-slate-200 dark:bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded bg-emerald-200" />
              <span className="w-2.5 h-2.5 rounded bg-emerald-400" />
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span className="text-[10px]">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
