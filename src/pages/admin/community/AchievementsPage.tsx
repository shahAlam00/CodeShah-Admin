import React, { useState } from 'react';
import { Trophy, Plus, Award, Flame, Crown, Zap, ShieldAlert } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockAchievements } from '../../../data/admin/community';
import { Achievement } from '../../../types/community';

export const AchievementsPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);

  const columns: Column<Achievement>[] = [
    {
      key: 'name',
      header: 'Badge & Achievement',
      accessor: (a) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{a.name}</h4>
            <p className="text-xs text-slate-400">{a.description}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'requirement',
      header: 'Unlock Condition',
      accessor: (a) => (
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
          {a.requirement}
        </span>
      ),
    },
    {
      key: 'xpReward',
      header: 'XP Reward',
      accessor: (a) => (
        <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400">
          +{a.xpReward} XP
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'unlockedCount',
      header: 'Unlocked By',
      accessor: (a) => (
        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
          {a.unlockedCount.toLocaleString()} users
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (a) => <StatusBadge status={a.status} size="sm" variant="dot" />,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Gamification & Achievements"
        subtitle="Manage learner accomplishment milestones, profile flair badges, and rewarded experience points (XP)."
      />

      <DataTable
        data={achievements}
        columns={columns}
        keyExtractor={(a) => a.id}
        pageSize={10}
      />
    </div>
  );
};
