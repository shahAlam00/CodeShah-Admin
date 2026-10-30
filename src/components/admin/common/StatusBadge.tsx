import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'dot';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', variant = 'default' }) => {
  const getColors = (val: string) => {
    const s = val.toLowerCase();
    
    // Status mappings
    if (['active', 'published', 'accepted', 'operational', 'success', 'resolved', 'running', 'easy', 'junior'].includes(s)) {
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-800/60',
        dot: 'bg-emerald-500'
      };
    }
    if (['medium', 'upcoming', 'investigating', 'warning', 'degraded', 'intermediate', 'mid', 'busy'].includes(s)) {
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-800/60',
        dot: 'bg-amber-500'
      };
    }
    if (['hard', 'wrong answer', 'critical', 'failed', 'error', 'banned', 'suspended', 'urgent', 'time limit exceeded', 'advanced', 'senior', 'staff'].includes(s)) {
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-700 dark:text-rose-300',
        border: 'border-rose-200 dark:border-rose-800/60',
        dot: 'bg-rose-500'
      };
    }
    if (['draft', 'review', 'pending', 'waiting', 'scheduled', 'idle', 'open', 'draining'].includes(s)) {
      return {
        bg: 'bg-brand-50 dark:bg-slate-800',
        text: 'text-brand-700 dark:text-brand-300',
        border: 'border-brand-200 dark:border-slate-700',
        dot: 'bg-brand-500'
      };
    }
    if (['archived', 'completed', 'sent', 'deprecated'].includes(s)) {
      return {
        bg: 'bg-slate-100 dark:bg-slate-800/80',
        text: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-200 dark:border-slate-700',
        dot: 'bg-slate-400'
      };
    }

    return {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-700 dark:text-slate-300',
      border: 'border-slate-200 dark:border-slate-700',
      dot: 'bg-slate-400'
    };
  };

  const colors = getColors(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {variant === 'dot' && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${colors.dot}`} />
      )}
      {status}
    </span>
  );
};
