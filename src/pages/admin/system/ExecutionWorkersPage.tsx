import React, { useState } from 'react';
import { Cpu, RefreshCw, Server, AlertOctagon, CheckCircle2, Play, Power, RotateCw } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockExecutionWorkers, mockQueueJobs } from '../../../data/admin/system';
import { ExecutionWorker } from '../../../types/system';
import { useToast } from '../../../context/ToastContext';

export const ExecutionWorkersPage: React.FC = () => {
  const [workers, setWorkers] = useState<ExecutionWorker[]>(mockExecutionWorkers);
  const { showToast } = useToast();

  const handleRestartWorker = (workerId: string) => {
    setWorkers(
      workers.map((w) =>
        w.id === workerId ? { ...w, status: 'Running', cpuUsagePercent: 12, memoryUsagePercent: 28 } : w
      )
    );
    showToast('success', 'Worker Recycled', `Worker ${workerId} sandbox daemon restarted.`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Distributed Sandbox Worker Telemetry"
        subtitle="Monitor isolated gVisor Docker containers executing untrusted candidate code with strict CPU/memory limits."
      />

      {/* Cluster Execution Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Executions</span>
          <p className="text-xl font-bold font-mono text-navy-900 dark:text-white mt-0.5">34,420</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-brand-600">Currently Running</span>
          <p className="text-xl font-bold font-mono text-brand-600 mt-0.5">5 Sandboxes</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-amber-500">Queued in RabbitMQ</span>
          <p className="text-xl font-bold font-mono text-amber-500 mt-0.5">3 Submissions</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-600">Completed (Today)</span>
          <p className="text-xl font-bold font-mono text-emerald-600 mt-0.5">34,290</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <span className="text-[10px] uppercase font-bold text-rose-500">Failed / SIGKILL</span>
          <p className="text-xl font-bold font-mono text-rose-500 mt-0.5">126</p>
        </div>
      </div>

      {/* Worker Node Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-navy-900 dark:text-white">
            Sandbox Execution Nodes (8 / 10 Online)
          </h3>
          <span className="text-xs text-slate-400">Auto-scaling limit: 20 nodes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                worker.status === 'Error'
                  ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900 shadow-glow-blue'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 shadow-soft-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className={`w-4 h-4 ${worker.status === 'Error' ? 'text-rose-500' : 'text-brand-600'}`} />
                    <h4 className="text-xs font-bold text-navy-900 dark:text-white">
                      {worker.name.split(' ')[0]} {worker.name.split(' ')[1]}
                    </h4>
                  </div>
                  <StatusBadge status={worker.status} size="sm" variant="dot" />
                </div>

                <p className="font-mono text-[11px] text-slate-400 mb-3">IP: {worker.nodeIp}</p>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-400 mb-0.5 font-mono">
                      <span>CPU Load</span>
                      <span className="font-bold">{worker.cpuUsagePercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full ${
                          worker.cpuUsagePercent > 80 ? 'bg-rose-500' : 'bg-brand-500'
                        }`}
                        style={{ width: `${worker.cpuUsagePercent}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-slate-400 mb-0.5 font-mono">
                      <span>Memory (RAM)</span>
                      <span className="font-bold">{worker.memoryUsagePercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
                  <div className="mt-3 p-2 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    Task: <strong className="text-brand-600">{worker.currentSubmissionId}</strong>
                    <p className="text-[10px] text-slate-400">{worker.currentLanguage}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{worker.tasksCompleted.toLocaleString()} jobs</span>
                <button
                  onClick={() => handleRestartWorker(worker.id)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Recycle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
