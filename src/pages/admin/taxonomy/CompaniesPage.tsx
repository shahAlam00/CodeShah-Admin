import React, { useState } from 'react';
import { Building2, Plus, Search, ExternalLink, Code2, Sparkles, CheckSquare } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { Drawer } from '../../../components/admin/common/Drawer';
import { mockCompanies } from '../../../data/admin/companies';
import { Company } from '../../../types/taxonomy';
import { useToast } from '../../../context/ToastContext';

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { showToast } = useToast();

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Company>[] = [
    {
      key: 'name',
      header: 'Company',
      accessor: (c) => (
        <div className="flex items-center gap-3">
          <img
            src={c.logo}
            alt={c.name}
            className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <button
              onClick={() => setSelectedCompany(c)}
              className="font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors text-sm text-left"
            >
              {c.name}
            </button>
            <p className="text-xs text-slate-400">/{c.slug}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'tier',
      header: 'Hiring Tier',
      accessor: (c) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
          {c.tier}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'problemCount',
      header: 'Tagged Problems',
      accessor: (c) => (
        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
          {c.problemCount}
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'interviewQuestionCount',
      header: 'AI Questions',
      accessor: (c) => (
        <span className="font-mono font-bold text-xs text-brand-600 dark:text-brand-400">
          {c.interviewQuestionCount}
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (c) => <StatusBadge status={c.status} size="sm" variant="dot" />,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Detail',
      align: 'right',
      accessor: (c) => (
        <button
          onClick={() => setSelectedCompany(c)}
          className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200"
        >
          View Hub
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Partner & Target Companies"
        subtitle="Manage tech company hiring profiles, tag interview problems, and curate company-specific mock interview tracks."
      />

      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter companies by name or tier..."
          className="w-full sm:w-80"
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyExtractor={(c) => c.id}
        pageSize={10}
      />

      {/* Company Hub Drawer */}
      <Drawer
        isOpen={Boolean(selectedCompany)}
        onClose={() => setSelectedCompany(null)}
        title={selectedCompany?.name || 'Company Hub'}
        subtitle={`Target Tier: ${selectedCompany?.tier}`}
      >
        {selectedCompany && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedCompany.logo}
                alt={selectedCompany.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h4 className="text-base font-bold text-navy-900 dark:text-white">
                  {selectedCompany.name}
                </h4>
                <a
                  href={selectedCompany.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand-600 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>{selectedCompany.website}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Overview
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedCompany.description}
              </p>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Difficulty Distribution in Company Pool
              </h5>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                  <span className="text-[10px] font-bold uppercase">Easy</span>
                  <p className="text-xl font-bold font-mono mt-0.5">
                    {selectedCompany.difficultyDistribution.easy}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                  <span className="text-[10px] font-bold uppercase">Medium</span>
                  <p className="text-xl font-bold font-mono mt-0.5">
                    {selectedCompany.difficultyDistribution.medium}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300">
                  <span className="text-[10px] font-bold uppercase">Hard</span>
                  <p className="text-xl font-bold font-mono mt-0.5">
                    {selectedCompany.difficultyDistribution.hard}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Code2 className="w-4 h-4 text-brand-600" />
                  <span>Total Tagged Problems</span>
                </span>
                <span className="font-bold font-mono">{selectedCompany.problemCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                  <span>Company Specific Assessments</span>
                </span>
                <span className="font-bold font-mono">{selectedCompany.assessmentCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>AI Mock Interview Questions</span>
                </span>
                <span className="font-bold font-mono">{selectedCompany.interviewQuestionCount}</span>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
