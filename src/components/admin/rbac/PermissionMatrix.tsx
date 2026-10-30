import React, { useState } from 'react';
import { Check, X, Shield, Lock, Save, RefreshCw } from 'lucide-react';
import { PermissionResource, PermissionAction, AdminRole, PermissionMatrix as MatrixType } from '../../../types/rbac';
import { defaultPermissions } from '../../../data/admin/rbac';
import { useToast } from '../../../context/ToastContext';

interface PermissionMatrixProps {
  initialRole?: AdminRole;
  editable?: boolean;
}

export const PermissionMatrix: React.FC<PermissionMatrixProps> = ({
  initialRole = 'Super Admin',
  editable = true,
}) => {
  const [selectedRole, setSelectedRole] = useState<AdminRole>(initialRole);
  const [matrix, setMatrix] = useState<Record<string, MatrixType>>(defaultPermissions);
  const { showToast } = useToast();

  const resources: { key: PermissionResource; label: string; desc: string }[] = [
    { key: 'users', label: 'Users', desc: 'Accounts, profiles, bans, sanctions' },
    { key: 'problems', label: 'Problems', desc: 'Problem statements, test cases, solutions' },
    { key: 'submissions', label: 'Submissions', desc: 'Execution re-evaluations, code review' },
    { key: 'contests', label: 'Contests', desc: 'Contest builders, schedules, leaderboards' },
    { key: 'assessments', label: 'Assessments', desc: 'Curriculum tests, questions, scoring' },
    { key: 'interviews', label: 'Interviews', desc: 'AI question banks, prompts, templates' },
    { key: 'roadmaps', label: 'Roadmaps', desc: 'Career tracks, learning phases' },
    { key: 'visualizers', label: 'DSA Visualizers', desc: 'Algorithm animations & pseudocodes' },
    { key: 'discussions', label: 'Discussions', desc: 'Community posts, comment moderation' },
    { key: 'reports', label: 'Reports', desc: 'Abuse tickets, bug reports, violations' },
    { key: 'system', label: 'System Telemetry', desc: 'Execution workers, queue pipeline, errors' },
    { key: 'auditLogs', label: 'Audit Logs', desc: 'Security event logs, administrative traces' },
    { key: 'settings', label: 'Settings', desc: 'AI models, runtime limits, security' },
  ];

  const actions: { key: PermissionAction; label: string }[] = [
    { key: 'view', label: 'View' },
    { key: 'create', label: 'Create' },
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete' },
  ];

  const rolesList: AdminRole[] = [
    'Super Admin',
    'Content Admin',
    'Moderator',
    'Support Admin',
    'Analytics Admin',
  ];

  const togglePermission = (res: PermissionResource, act: PermissionAction) => {
    if (!editable || selectedRole === 'Super Admin') return;

    setMatrix((prev) => {
      const currentRoleMatrix = { ...prev[selectedRole] };
      const currentRes = { ...currentRoleMatrix[res] };
      currentRes[act] = !currentRes[act];
      currentRoleMatrix[res] = currentRes;
      return {
        ...prev,
        [selectedRole]: currentRoleMatrix,
      };
    });
  };

  const handleSave = () => {
    showToast('success', 'Permissions Updated', `Successfully saved RBAC policy for role ${selectedRole}.`);
  };

  const handleReset = () => {
    setMatrix(defaultPermissions);
    showToast('info', 'Permissions Reset', `Default permissions restored for ${selectedRole}.`);
  };

  const currentPerms = matrix[selectedRole] || defaultPermissions['Super Admin'];

  return (
    <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft-sm overflow-hidden">
      {/* Header with Role Selector */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-navy-950/40">
        <div>
          <h3 className="text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Interactive Permission Matrix</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure resource level access rights for platform administrator roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as AdminRole)}
            className="px-3 py-2 text-sm font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800 dark:text-slate-100"
          >
            {rolesList.map((r) => (
              <option key={r} value={r}>
                {r} {r === 'Super Admin' ? '(Root System)' : ''}
              </option>
            ))}
          </select>

          {editable && selectedRole !== 'Super Admin' && (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Policy</span>
            </button>
          )}

          {editable && selectedRole !== 'Super Admin' && (
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-xl transition-colors"
              title="Reset to defaults"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {selectedRole === 'Super Admin' && (
        <div className="mx-6 mt-4 p-3 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 rounded-xl text-xs text-brand-800 dark:text-brand-300 flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-600 shrink-0" />
          <span>
            <strong>Super Admin</strong> retains immutable root privileges across all platform scopes. Select another role to customize granular policies.
          </span>
        </div>
      )}

      {/* Permission Table */}
      <div className="overflow-x-auto p-4 sm:p-6">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 text-left w-1/3">Resource Scope</th>
              {actions.map((act) => (
                <th key={act.key} className="pb-3 text-center w-1/6">
                  {act.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {resources.map((res) => {
              const resPerms = currentPerms[res.key] || { view: false, create: false, edit: false, delete: false };

              return (
                <tr
                  key={res.key}
                  className="hover:bg-slate-50/70 dark:hover:bg-navy-800/40 transition-colors"
                >
                  <td className="py-3.5 pr-4">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      {res.label}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {res.desc}
                    </p>
                  </td>

                  {actions.map((act) => {
                    const isGranted = resPerms[act.key];

                    return (
                      <td key={act.key} className="py-3.5 text-center">
                        <button
                          type="button"
                          disabled={!editable || selectedRole === 'Super Admin'}
                          onClick={() => togglePermission(res.key, act.key)}
                          className={`w-8 h-8 rounded-lg inline-flex items-center justify-center transition-all ${
                            isGranted
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-50 dark:bg-navy-950/50 text-slate-300 dark:text-slate-600 border border-slate-200 dark:border-slate-800'
                          } ${
                            editable && selectedRole !== 'Super Admin'
                              ? 'hover:scale-105 cursor-pointer'
                              : 'cursor-default'
                          }`}
                        >
                          {isGranted ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <X className="w-4 h-4 stroke-[2]" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
