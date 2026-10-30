import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Server, Cpu, Database, Wifi, ListOrdered, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { mockServicesHealth } from '../../../data/admin/system';
import { useToast } from '../../../context/ToastContext';

export const SystemHealthPage: React.FC = () => {
  const { showToast } = useToast();

  const handlePing = () => {
    showToast('success', 'Health Check Ping Dispatched', 'All 6 microservice clusters responded within expected latency bounds.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Infrastructure System Health"
        subtitle="Real-time uptime metrics, round-trip network latencies, and container health across CodeForge services."
      >
        <button
          onClick={handlePing}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors shadow-soft-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-brand-600" />
          <span>Ping All Services</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockServicesHealth.map((srv) => (
          <div
            key={srv.id}
            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <Server className="w-5 h-5" />
                </div>
                <StatusBadge status={srv.status} size="sm" variant="dot" />
              </div>

              <h3 className="text-base font-bold text-navy-900 dark:text-white">
                {srv.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {srv.details}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Avg Latency</span>
                  <strong className="text-sm text-slate-900 dark:text-white">{srv.latencyMs} ms</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Uptime (30d)</span>
                  <strong className="text-sm text-emerald-600 dark:text-emerald-400">{srv.uptimePercent}%</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Heartbeat: {srv.lastChecked}</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400">Operational SLA ✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
