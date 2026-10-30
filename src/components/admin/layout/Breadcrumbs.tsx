import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map route segments to nice readable titles
  const routeNames: Record<string, string> = {
    admin: 'Admin',
    dashboard: 'Dashboard',
    users: 'Users',
    admins: 'Admins',
    roles: 'Roles',
    permissions: 'Permissions',
    problems: 'Problems',
    create: 'Create',
    edit: 'Edit',
    'test-cases': 'Test Cases',
    solutions: 'Solutions',
    topics: 'Topics',
    companies: 'Companies',
    submissions: 'Submissions',
    contests: 'Contests',
    assessments: 'Assessments',
    interviews: 'Interviews',
    questions: 'Questions',
    sessions: 'Sessions',
    roadmaps: 'Roadmaps',
    visualizers: 'DSA Visualizers',
    discussions: 'Discussions',
    reported: 'Reported',
    reports: 'Reports',
    notifications: 'Notifications',
    achievements: 'Achievements',
    analytics: 'Analytics',
    system: 'System Health',
    queues: 'Queues',
    executions: 'Executions',
    errors: 'Errors',
    'audit-logs': 'Audit Logs',
    settings: 'Settings',
  };

  return (
    <nav className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
      <Link
        to="/admin/dashboard"
        className="flex items-center hover:text-navy-900 dark:hover:text-white transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      {pathnames.map((name, index) => {
        // Skip first 'admin' if after home
        if (index === 0 && name === 'admin') return null;

        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNames[name] || name;

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-3 h-3 text-slate-400 opacity-60" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
