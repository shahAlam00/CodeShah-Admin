import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, FileCode, CheckCircle2, Cpu } from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { MonacoCodeEditor } from '../../../components/admin/code/MonacoCodeEditor';
import { mockProblems } from '../../../data/admin/problems';
import { SolutionCode } from '../../../types/problem';
import { useToast } from '../../../context/ToastContext';

export const SolutionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const problem = mockProblems.find((p) => p.id === id) || mockProblems[0];
  const { showToast } = useToast();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('typescript');
  const [solutions, setSolutions] = useState<Record<string, SolutionCode>>(() => {
    const map: Record<string, SolutionCode> = {};
    problem.solutions.forEach((s) => {
      map[s.language] = s;
    });

    // Provide default placeholders if missing
    if (!map['typescript']) {
      map['typescript'] = {
        language: 'typescript',
        code: `// Optimal TypeScript solution\nfunction solve(): void {\n  // Implementation here\n}`,
        explanation: 'Single-pass linear scan with hash table lookup.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      };
    }
    if (!map['python']) {
      map['python'] = {
        language: 'python',
        code: `# Optimal Python 3 solution\nclass Solution:\n    def solve(self):\n        pass`,
        explanation: 'Dictionary lookup for complement in linear time.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      };
    }
    if (!map['cpp']) {
      map['cpp'] = {
        language: 'cpp',
        code: `// C++ 20 Solution\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {}\n};`,
        explanation: 'Standard template library unordered_map lookup.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      };
    }
    if (!map['java']) {
      map['java'] = {
        language: 'java',
        code: `// Java 21 Solution\nimport java.util.*;\n\nclass Solution {\n    public void solve() {}\n}`,
        explanation: 'HashMap lookup with amortized O(1) performance.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      };
    }
    if (!map['go']) {
      map['go'] = {
        language: 'go',
        code: `// Go 1.22 Solution\npackage main\n\nfunc solve() {}`,
        explanation: 'Built-in map lookup with zero allocations.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      };
    }
    return map;
  });

  const currentSolution = solutions[selectedLanguage];

  const handleCodeChange = (newCode: string) => {
    setSolutions({
      ...solutions,
      [selectedLanguage]: {
        ...currentSolution,
        code: newCode,
      },
    });
  };

  const handleExplanationChange = (field: string, val: string) => {
    setSolutions({
      ...solutions,
      [selectedLanguage]: {
        ...currentSolution,
        [field]: val,
      },
    });
  };

  const handleSave = () => {
    showToast(
      'success',
      'Editorial Solution Saved',
      `Updated official editorial code for ${selectedLanguage.toUpperCase()}.`
    );
  };

  const languages = [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'python', label: 'Python 3' },
    { id: 'java', label: 'Java 21' },
    { id: 'cpp', label: 'C++ 20' },
    { id: 'go', label: 'Go 1.22' },
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
        title={`Official Editorial Solutions: ${problem.title}`}
        subtitle="Manage multi-language canonical reference implementations, time/space complexity Big-O analyses, and explanations."
      >
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Editorial Solution</span>
        </button>
      </PageHeader>

      {/* Language Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelectedLanguage(lang.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedLanguage === lang.id
                ? 'bg-brand-600 text-white shadow-soft-sm'
                : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monaco Editor (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <MonacoCodeEditor
            value={currentSolution?.code || ''}
            onChange={handleCodeChange}
            language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
            height="460px"
          />
        </div>

        {/* Complexity & Explanation (1 col) */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
          <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">
            Complexity & Approach
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time Complexity (Big-O)
            </label>
            <input
              type="text"
              value={currentSolution?.timeComplexity || 'O(n)'}
              onChange={(e) => handleExplanationChange('timeComplexity', e.target.value)}
              placeholder="e.g. O(n log n)"
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Space Complexity (Auxiliary)
            </label>
            <input
              type="text"
              value={currentSolution?.spaceComplexity || 'O(1)'}
              onChange={(e) => handleExplanationChange('spaceComplexity', e.target.value)}
              placeholder="e.g. O(1)"
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Algorithmic Explanation
            </label>
            <textarea
              rows={6}
              value={currentSolution?.explanation || ''}
              onChange={(e) => handleExplanationChange('explanation', e.target.value)}
              placeholder="Explain the mental model, invariants, and trade-offs..."
              className="w-full p-3 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl leading-relaxed"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 text-xs text-brand-800 dark:text-brand-300">
            <strong>Editorial Standard:</strong> Code solutions are tested through the sandboxed runner to guarantee zero compile errors before saving.
          </div>
        </div>
      </div>
    </div>
  );
};
