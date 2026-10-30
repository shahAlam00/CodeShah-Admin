import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Copy,
  Edit2,
  CheckCircle2,
  Eye,
  EyeOff,
  Code2,
  HelpCircle,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { mockProblems } from '../../../data/admin/problems';
import { TestCase } from '../../../types/problem';
import { useToast } from '../../../context/ToastContext';

export const TestCasesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const problem = mockProblems.find((p) => p.id === id) || mockProblems[0];
  const [testCases, setTestCases] = useState<TestCase[]>(problem.testCases || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<TestCase | null>(null);

  const [formInput, setFormInput] = useState('');
  const [formOutput, setFormOutput] = useState('');
  const [formIsSample, setFormIsSample] = useState(true);
  const [formWeight, setFormWeight] = useState(20);
  const [formExplanation, setFormExplanation] = useState('');

  const { showToast } = useToast();

  const openCreateModal = () => {
    setEditingCase(null);
    setFormInput('');
    setFormOutput('');
    setFormIsSample(true);
    setFormWeight(20);
    setFormExplanation('');
    setIsModalOpen(true);
  };

  const openEditModal = (tc: TestCase) => {
    setEditingCase(tc);
    setFormInput(tc.input);
    setFormOutput(tc.expectedOutput);
    setFormIsSample(tc.isSample);
    setFormWeight(tc.weight);
    setFormExplanation(tc.explanation || '');
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCase) {
      setTestCases(
        testCases.map((tc) =>
          tc.id === editingCase.id
            ? {
                ...tc,
                input: formInput,
                expectedOutput: formOutput,
                isSample: formIsSample,
                weight: formWeight,
                explanation: formExplanation,
              }
            : tc
        )
      );
      showToast('success', 'Test Case Updated', 'Test case parameters successfully modified.');
    } else {
      const newCase: TestCase = {
        id: `tc-${Date.now().toString().slice(-4)}`,
        input: formInput,
        expectedOutput: formOutput,
        isSample: formIsSample,
        weight: formWeight,
        explanation: formExplanation,
      };
      setTestCases([...testCases, newCase]);
      showToast('success', 'Test Case Added', 'New automated test case appended to verification suite.');
    }
    setIsModalOpen(false);
  };

  const handleDuplicate = (tc: TestCase) => {
    const dup: TestCase = {
      ...tc,
      id: `tc-${Date.now().toString().slice(-4)}`,
    };
    setTestCases([...testCases, dup]);
    showToast('info', 'Duplicated', 'Test case duplicated.');
  };

  const handleDelete = (tcId: string) => {
    setTestCases(testCases.filter((tc) => tc.id !== tcId));
    showToast('success', 'Removed', 'Test case deleted.');
  };

  const columns: Column<TestCase>[] = [
    {
      key: 'visibility',
      header: 'Visibility',
      accessor: (tc) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            tc.isSample
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800'
              : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
          }`}
        >
          {tc.isSample ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          <span>{tc.isSample ? 'Public Sample' : 'Hidden System'}</span>
        </span>
      ),
      sortable: true,
      width: '150px',
    },
    {
      key: 'input',
      header: 'Standard Input (stdin)',
      accessor: (tc) => (
        <pre className="font-mono text-xs p-2 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 max-w-xs overflow-x-auto">
          {tc.input}
        </pre>
      ),
    },
    {
      key: 'expectedOutput',
      header: 'Expected Output (stdout)',
      accessor: (tc) => (
        <pre className="font-mono text-xs p-2 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 max-w-xs overflow-x-auto text-emerald-600 dark:text-emerald-400 font-semibold">
          {tc.expectedOutput}
        </pre>
      ),
    },
    {
      key: 'weight',
      header: 'Scoring Weight',
      accessor: (tc) => (
        <span className="font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
          {tc.weight} pts
        </span>
      ),
      sortable: true,
      align: 'center',
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      accessor: (tc) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleDuplicate(tc)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-navy-800"
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => openEditModal(tc)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-navy-800"
            title="Edit"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(tc.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-navy-800"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Link
          to={`/admin/problems/${problem.id}/edit`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Problem Editor</span>
        </Link>
      </div>

      <PageHeader
        title={`Test Cases: ${problem.title}`}
        subtitle="Manage public sample test cases and hidden edge-case inputs for automated code execution sandboxes."
      >
        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Test Case</span>
        </button>
      </PageHeader>

      <DataTable
        data={testCases}
        columns={columns}
        keyExtractor={(tc) => tc.id}
        pageSize={10}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-base font-bold text-navy-900 dark:text-white mb-4">
              {editingCase ? 'Edit Test Case' : 'New Automated Test Case'}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Visibility
                  </label>
                  <select
                    value={formIsSample ? 'sample' : 'hidden'}
                    onChange={(e) => setFormIsSample(e.target.value === 'sample')}
                    className="w-full px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  >
                    <option value="sample">Public Sample (Visible to user)</option>
                    <option value="hidden">Hidden System Test Case</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Scoring Weight (Points)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formWeight}
                    onChange={(e) => setFormWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Input Stream (stdin)
                </label>
                <textarea
                  rows={3}
                  required
                  value={formInput}
                  onChange={(e) => setFormInput(e.target.value)}
                  placeholder="[2,7,11,15]&#10;9"
                  className="w-full p-2.5 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Expected Output (stdout)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formOutput}
                  onChange={(e) => setFormOutput(e.target.value)}
                  placeholder="[0,1]"
                  className="w-full p-2.5 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Explanation / Note (Optional)
                </label>
                <input
                  type="text"
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Boundary condition test for negative numbers..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
                >
                  Save Test Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
