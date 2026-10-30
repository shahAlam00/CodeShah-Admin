import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Milestone, Plus, Clock, Users, ArrowRight, Layers } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockRoadmaps } from '../../../data/admin/roadmaps';
import { Roadmap } from '../../../types/roadmap';
export const RoadmapsListPage: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(mockRoadmaps);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Learning Roadmaps & Curricula"
        subtitle="Design step-by-step career specialization tracks with phase prerequisites and curated practice milestones."
      >
        <Link
          to="/admin/roadmaps/create"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create New Roadmap</span>
        </Link>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmaps.map((rm) => (
          <div
            key={rm.id}
            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                  {rm.category}
                </span>
                <StatusBadge status={rm.status} size="sm" variant="dot" />
              </div>

              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                {rm.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {rm.description}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Phases</span>
                  <strong className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {rm.phases.length} Phases
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Enrolled</span>
                  <strong className="font-mono text-sm text-brand-600 dark:text-brand-400">
                    {rm.enrolledUsers.toLocaleString()}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Est. Hours</span>
                  <strong className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {rm.totalHours} hrs
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Completion Rate: {rm.completionRate}%
              </span>
              <Link
                to={`/admin/roadmaps/${rm.id}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Edit Curriculum Phases</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
