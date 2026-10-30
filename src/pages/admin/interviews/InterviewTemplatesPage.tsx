import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Plus, Clock, Award, CheckCircle2, Sliders, Play } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockInterviewTemplates } from '../../../data/admin/interviews';
import { InterviewTemplate } from '../../../types/interview';

export const InterviewTemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<InterviewTemplate[]>(mockInterviewTemplates);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="AI Mock Interview Templates"
        subtitle="Configure specialized technical tracks for Frontend, Backend, Distributed Systems, and Behavioral screening."
      >
        <Link
          to="/admin/interviews/questions"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Question Bank & Prompts</span>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                  {tpl.type}
                </span>
                <StatusBadge status={tpl.difficulty} size="sm" />
              </div>

              <h3 className="text-base font-bold text-navy-900 dark:text-white">
                {tpl.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Target: {tpl.targetRole}
              </p>

              <div className="mt-4 flex flex-wrap gap-1">
                {tpl.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {tpl.durationMinutes} mins
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Conducted</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {tpl.totalCompleted} sessions
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                to="/admin/interviews/questions"
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configure Prompts</span>
              </Link>
              <Link
                to="/admin/interviews/sessions"
                className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 rounded-lg text-slate-700 dark:text-slate-200"
              >
                View Sessions ({tpl.activeSessions} active)
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
