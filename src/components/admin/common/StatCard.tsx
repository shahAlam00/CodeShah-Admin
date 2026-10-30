import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  changePercent?: number;
  period?: string;
  icon: LucideIcon;
  sparkline?: number[];
  colorVariant?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  changePercent,
  period = 'vs last month',
  icon: Icon,
  sparkline,
  colorVariant = 'blue',
}) => {
  const isPositive = (changePercent ?? 0) >= 0;

  const getGradient = () => {
    switch (colorVariant) {
      case 'emerald':
        return { stroke: '#10b981', fill: '#10b981', bgIcon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' };
      case 'indigo':
        return { stroke: '#6366f1', fill: '#6366f1', bgIcon: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' };
      case 'amber':
        return { stroke: '#f59e0b', fill: '#f59e0b', bgIcon: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400' };
      case 'rose':
        return { stroke: '#ef4444', fill: '#ef4444', bgIcon: 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400' };
      case 'blue':
      default:
        return { stroke: '#0ea5e9', fill: '#0ea5e9', bgIcon: 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400' };
    }
  };

  const styling = getGradient();

  const chartData = (sparkline || [10, 15, 12, 18, 16, 22, 24]).map((val, idx) => ({
    i: idx,
    val,
  }));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-navy-900/80 p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-navy-900 dark:text-white">
            {value}
          </h3>
        </div>
        <div className={`rounded-xl p-2.5 ${styling.bgIcon} ring-1 ring-black/5 dark:ring-white/10`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        {changePercent !== undefined && (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={`inline-flex items-center font-semibold ${
                isPositive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {isPositive ? `+${changePercent}%` : `${changePercent}%`}
            </span>
            <span className="text-slate-400 dark:text-slate-500">{period}</span>
          </div>
        )}

        {sparkline && (
          <div className="h-9 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`grad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={styling.fill} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={styling.fill} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke={styling.stroke}
                  strokeWidth={2}
                  fill={`url(#grad-${title.replace(/\s+/g, '')})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
