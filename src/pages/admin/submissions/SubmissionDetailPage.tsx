import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Terminal,
  Code2,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  RefreshCw,
  Copy,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { Tabs } from '../../../components/admin/common/Tabs';
import { MonacoCodeEditor } from '../../../components/admin/code/MonacoCodeEditor';
import { mockSubmissions } from '../../../data/admin/submissions';
import { useToast } from '../../../context/ToastContext';

export const SubmissionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const submission = mockSubmissions.find((s) => s.id === id) || mockSubmissions[0];
  const [activeTab, setActiveTab] = useState('code');
  const { showToast } = useToast();

  const handleRejudge = () => {
    showToast('info', 'Re-evaluation Dispatched', `Job for ${submission.id} enqueued to sandbox cluster.`);
  };

  const tabs = [
    { id: 'code', label: 'Candidate Source Code', icon: Code2 },
    {
      id: 'testResults',
      label: `Test Results (${submission.testCaseResults.length})`,
      icon: CheckCircle2,
    },
    { id: 'logs', label: 'Sandbox Execution Logs', icon: Terminal },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Link
          to="/admin/submissions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Submissions</span>
        </Link>
      </div>

      <PageHeader
        title={`Execution #${submission.id}`}
        subtitle={`Submitted by ${submission.userName} for "${submission.problemTitle}"`}
      >
        <button
          onClick={handleRejudge}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 transition-colors shadow-soft-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Re-judge Submission</span>
        </button>
      </PageHeader>

      {/* Telemetry Summary Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <StatusBadge status={submission.status} size="md" variant="dot" />
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-navy-800 font-semibold">
              {submission.language}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Runtime</span>
              <strong className="text-sm font-mono text-slate-900 dark:text-white">
                {submission.runtime} ms
              </strong>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Memory Allocated</span>
              <strong className="text-sm font-mono text-slate-900 dark:text-white">
                {submission.memory} MB
              </strong>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Timestamp</span>
              <strong className="text-sm font-mono text-slate-900 dark:text-white">
                {submission.submittedAt}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Code Tab */}
      {activeTab === 'code' && (
        <div className="space-y-4">
          <MonacoCodeEditor
            value={submission.code}
            language={submission.language.toLowerCase() === 'c++' ? 'cpp' : submission.language.toLowerCase()}
            readOnly={true}
            height="440px"
          />
        </div>
      )}

      {/* Test Results Tab */}
      {activeTab === 'testResults' && (
        <div className="space-y-3">
          {submission.testCaseResults.length === 0 ? (
            <div className="bg-white dark:bg-navy-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
              Compilation or pre-execution check failed prior to running test suite.
            </div>
          ) : (
            submission.testCaseResults.map((tc, idx) => (
              <div
                key={tc.testCaseId}
                className={`p-4 rounded-xl border transition-colors ${
                  tc.passed
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {tc.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                    <span className="text-xs font-bold text-navy-900 dark:text-white">
                      Test Case #{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">({tc.testCaseId})</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span>{tc.runtimeMs}ms</span>
                    <span>{tc.memoryMb}MB</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">
                      Input Data
                    </span>
                    <pre className="p-2.5 rounded-lg bg-white dark:bg-navy-950 border border-slate-200 dark:border-slate-800 font-mono overflow-x-auto">
                      {tc.input}
                    </pre>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">
                      Expected vs Actual
                    </span>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-950 border border-slate-200 dark:border-slate-800 font-mono space-y-1 overflow-x-auto">
                      <p className="text-emerald-600 dark:text-emerald-400">
                        Expected: {tc.expectedOutput}
                      </p>
                      <p className={tc.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                        Actual:   {tc.actualOutput}
                      </p>
                    </div>
                  </div>
                </div>

                {tc.error && (
                  <div className="mt-2.5 p-2 rounded-lg bg-rose-100/70 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-mono">
                    {tc.error}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Execution Logs Tab */}
      {activeTab === 'logs' && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto shadow-soft-sm leading-relaxed whitespace-pre-wrap">
          {submission.executionLogs}
        </div>
      )}
    </div>
  );
};
