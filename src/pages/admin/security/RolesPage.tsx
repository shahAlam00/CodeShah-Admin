import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { initialRoles } from '../../../data/admin/rbac';

export const RolesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Role-Based Access Control (RBAC)"
        subtitle="Manage administrative privilege groups and inspect security boundaries across all platform modules."
      >
        <Link
          to="/admin/permissions"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Open Permission Matrix</span>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                {role.isSystem && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
                    System Core
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-navy-900 dark:text-white">
                {role.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {role.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Assigned Staff:</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  {role.userCount} members
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                to="/admin/permissions"
                className="flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Edit Granular Permissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
