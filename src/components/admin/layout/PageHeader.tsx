import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  showBreadcrumbs?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
  showBreadcrumbs = true,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        {showBreadcrumbs && (
          <div className="mb-2">
            <Breadcrumbs />
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-navy-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
};
