import React from 'react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { PermissionMatrix } from '../../../components/admin/rbac/PermissionMatrix';
import { ShieldAlert, Info } from 'lucide-react';

export const PermissionsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Permission Governance Matrix"
        subtitle="Live matrix defining CRUD operations across Users, Problems, Submissions, Contests, Assessments, Reports, and System Queues."
      />

      {/* Interactive Matrix */}
      <PermissionMatrix editable={true} />

      <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-soft-sm flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
        <Info className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-navy-900 dark:text-white mb-1">
            Zero-Trust Architectural Model
          </h4>
          <p className="leading-relaxed">
            Permissions are evaluated per HTTP/RPC request via stateless JWT claims with token revocation checks against Redis. Any modified privileges take effect across active administrator sessions within 60 seconds.
          </p>
        </div>
      </div>
    </div>
  );
};
