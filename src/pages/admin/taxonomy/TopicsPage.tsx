import React, { useState } from 'react';
import { FolderTree, Plus, Search, Edit2, Trash2, Layers, Tag } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { SearchInput } from '../../../components/admin/common/SearchInput';
import { mockTopics } from '../../../data/admin/topics';
import { Topic } from '../../../types/taxonomy';
import { useToast } from '../../../context/ToastContext';

export const TopicsPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    name: '',
    slug: '',
    category: 'Data Structures' as any,
    description: '',
    color: '#0ea5e9',
  });
  const { showToast } = useToast();

  const filteredTopics = topics.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Topic = {
      id: `top-${Date.now().toString().slice(-4)}`,
      name: newTopic.name,
      slug: newTopic.slug || newTopic.name.toLowerCase().replace(/\s+/g, '-'),
      description: newTopic.description,
      icon: 'Tag',
      color: newTopic.color,
      problemCount: 0,
      roadmapCount: 0,
      status: 'Active',
      category: newTopic.category,
    };
    setTopics([...topics, created]);
    setIsModalOpen(false);
    showToast('success', 'Topic Created', `Created "${newTopic.name}" curriculum taxonomy.`);
  };

  const columns: Column<Topic>[] = [
    {
      key: 'name',
      header: 'Topic',
      accessor: (t) => (
        <div className="flex items-center gap-3">
          <span
            className="w-3.5 h-3.5 rounded-full shrink-0"
            style={{ backgroundColor: t.color }}
          />
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</p>
            <span className="font-mono text-xs text-slate-400">/{t.slug}</span>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'category',
      header: 'Domain',
      accessor: (t) => (
        <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
          {t.category}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'description',
      header: 'Curriculum Scope',
      accessor: (t) => (
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm truncate">
          {t.description}
        </p>
      ),
    },
    {
      key: 'problemCount',
      header: 'Problems',
      accessor: (t) => (
        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
          {t.problemCount}
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (t) => <StatusBadge status={t.status} size="sm" variant="dot" />,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Curriculum Topics"
        subtitle="Organize problems and career roadmaps into foundational algorithmic and data structure domains."
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Topic</span>
        </button>
      </PageHeader>

      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter topics by name or scope..."
          className="w-full sm:w-80"
        />
      </div>

      <DataTable
        data={filteredTopics}
        columns={columns}
        keyExtractor={(t) => t.id}
        pageSize={10}
      />

      {/* Create Topic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-base font-bold text-navy-900 dark:text-white mb-4">
              Create New Topic Taxonomy
            </h3>
            <form onSubmit={handleCreateTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topic Name
                </label>
                <input
                  type="text"
                  required
                  value={newTopic.name}
                  onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                  placeholder="e.g. Dynamic Programming"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Domain Category
                </label>
                <select
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <option value="Data Structures">Data Structures</option>
                  <option value="Algorithms">Algorithms</option>
                  <option value="Advanced">Advanced Techniques</option>
                  <option value="System">System Fundamentals</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Curriculum Scope Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                  placeholder="Memoization, tabulation, knapsack subproblems..."
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
                >
                  Create Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
