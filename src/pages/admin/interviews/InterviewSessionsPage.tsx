import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, CheckCircle2, Award, User, Play } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockInterviewSessions } from '../../../data/admin/interviews';
import { InterviewSession } from '../../../types/interview';

export const InterviewSessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<InterviewSession[]>(mockInterviewSessions);

  const columns: Column<InterviewSession>[] = [
    {
      key: 'candidateName',
      header: 'Candidate',
      accessor: (s) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">{s.candidateName}</p>
          <span className="text-xs text-slate-400 font-mono">{s.candidateEmail}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'templateTitle',
      header: 'Interview Track',
      accessor: (s) => (
        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
          {s.templateTitle}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'type',
      header: 'Type',
      accessor: (s) => (
        <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
          {s.type}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (s) => <StatusBadge status={s.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'score',
      header: 'AI Evaluation Score',
      accessor: (s) => (
        s.score ? (
          <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
            {s.score} / 100
          </span>
        ) : (
          <span className="text-xs text-slate-400 font-mono">In Progress</span>
        )
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'startedAt',
      header: 'Started',
      accessor: (s) => <span className="text-xs text-slate-400">{s.startedAt}</span>,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Live & Historical Interview Sessions"
        subtitle="Review generative transcripts, candidate communication scores, and automated feedback summaries."
      />

      <DataTable
        data={sessions}
        columns={columns}
        keyExtractor={(s) => s.id}
        pageSize={10}
      />
    </div>
  );
};
