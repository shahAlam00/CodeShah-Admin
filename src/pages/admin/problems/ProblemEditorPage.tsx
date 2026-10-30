import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Eye,
  Edit3,
  Plus,
  Trash2,
  FlaskConical,
  Loader2,
  FileText,
  Code2,
} from 'lucide-react';
import Editorials from '../Editorials';
import OfficialSolutions from '../OfficialSolutions';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { Tabs } from '../../../components/admin/common/Tabs';
import { ProblemDifficulty, ProblemStatus } from '../../../types/problem';
import { useToast } from '../../../context/ToastContext';
import adminApi from '../../../lib/adminApi';

// ── Local interfaces ──────────────────────────────────────────────────────────
interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface TestCaseField {
  input: string;
  expectedOutput: string;
  isSample: boolean;
  explanation: string;
}

interface StarterCode {
  javascript: string;
  typescript: string;
  python: string;
  java: string;
  cpp: string;
}

interface SolutionEntry {
  language: string;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

type EditorTab = 'editor' | 'preview' | 'editorial' | 'solution';

// ─────────────────────────────────────────────────────────────────────────────
export const ProblemEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isEdit = Boolean(id);

  // ── loading / saving state ────────────────────────────────────────────────
  const [loadingProblem, setLoadingProblem] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  // ── form fields ───────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<EditorTab>('editor');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [difficulty, setDifficulty] = useState<ProblemDifficulty>('Medium');
  const [status, setStatus] = useState<ProblemStatus>('Draft');
  const [category, setCategory] = useState('Algorithms');
  const [topicsInput, setTopicsInput] = useState('Arrays, Hash Table');
  const [companiesInput, setCompaniesInput] = useState('Google, Amazon');
  const [description, setDescription] = useState(
    `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.\n\nYou may assume that each input would have ***exactly one solution***, and you may not use the same element twice.`
  );
  const [constraints, setConstraints] = useState<string[]>(['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9']);
  const [hints, setHints] = useState<string[]>(['Consider using a Hash Map to store past visited elements.']);
  const [followUp, setFollowUp] = useState('Can you come up with an algorithm that runs in O(N) time?');
  const [examples, setExamples] = useState<Example[]>([
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
  ]);
  const [testCases, setTestCases] = useState<TestCaseField[]>([
    { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isSample: true, explanation: '' },
  ]);
  const [starterCode, setStarterCode] = useState<StarterCode>({
    javascript: `function solution(input) {\n  // your code here\n}`,
    typescript: `function solution(input: string): string {\n  // your code here\n  return "";\n}`,
    python: `def solution(input):\n    # your code here\n    pass`,
    java: `class Solution {\n    public String solution(String input) {\n        // your code here\n        return "";\n    }\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}`,
  });
  const [activeLang, setActiveLang] = useState<keyof StarterCode>('javascript');

  // ── Editorial & Solutions state ────────────────────────────────────────────
  const [editorial, setEditorial] = useState('');
  const [editorialData, setEditorialData] = useState({
    title: '', overview: '', approach: '', keyInvariant: '',
    timeComplexity: 'O(N)', spaceComplexity: 'O(1)',
  });
  const [solutions, setSolutions] = useState<SolutionEntry[]>([]);

  // ── Fetch existing problem when editing ───────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    adminApi
      .get(`/problem/id/${id}`)
      .then(({ data }) => {
        const p = data.problem;
        setTitle(p.title || '');
        setSlug(p.slug || '');
        setDifficulty(p.difficulty || 'Medium');
        setStatus(p.status || 'Draft');
        setCategory(p.category || 'Algorithms');
        setTopicsInput((p.topics || []).join(', '));
        setCompaniesInput((p.companies || []).join(', '));
        setDescription(p.description || '');
        setConstraints(p.constraints || []);
        setHints(p.hints || []);
        setFollowUp(p.followUp || '');
        setExamples(
          (p.examples || []).map((ex: any) => ({
            input: ex.input || '',
            output: ex.output || '',
            explanation: ex.explanation || '',
          }))
        );
        setTestCases(
          (p.testCases || []).map((tc: any) => ({
            input: tc.input || '',
            expectedOutput: tc.expectedOutput || '',
            isSample: tc.isSample ?? false,
            explanation: tc.explanation || '',
          }))
        );
        if (p.starterCode) {
          setStarterCode({
            javascript: p.starterCode.javascript || '',
            typescript: p.starterCode.typescript || '',
            python: p.starterCode.python || '',
            java: p.starterCode.java || '',
            cpp: p.starterCode.cpp || '',
          });
        }
        setEditorial(p.editorial || '');
        setEditorialData(p.editorialData || { title: '', overview: '', approach: '', keyInvariant: '', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' });
        setSolutions(
          (p.solutions || []).map((s: any) => ({
            language: s.language || 'javascript',
            code: s.code || '',
            explanation: s.explanation || '',
            timeComplexity: s.timeComplexity || '',
            spaceComplexity: s.spaceComplexity || '',
          }))
        );
      })
      .catch(() => {
        showToast('error', 'Load Failed', 'Could not load problem from backend.');
      })
      .finally(() => setLoadingProblem(false));
  }, [id, isEdit]);

  // ── Slug auto-generate ────────────────────────────────────────────────────
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit || slug === '') {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  // ── Save (create or update) ───────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !description.trim()) {
      showToast('error', 'Validation Error', 'Title, slug and description are required.');
      return;
    }
    setSaving(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      difficulty,
      status,
      category,
      topics: topicsInput.split(',').map((t) => t.trim()).filter(Boolean),
      companies: companiesInput.split(',').map((c) => c.trim()).filter(Boolean),
      description: description.trim(),
      constraints: constraints.filter(Boolean),
      examples,
      hints: hints.filter(Boolean),
      followUp: followUp.trim(),
      testCases,
      starterCode,
      editorial: editorial.trim(),
      editorialData,
      solutions: solutions.filter((s) => s.code.trim() !== ''),
    };

    try {
      if (isEdit) {
        await adminApi.put(`/problem/${id}`, payload);
        showToast('success', 'Problem Updated', `"${title}" has been updated successfully.`);
      } else {
        await adminApi.post('/problem/create', payload);
        showToast('success', 'Problem Created', `"${title}" has been published to the catalog.`);
      }
      navigate('/admin/problems');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Unknown error';
      showToast('error', isEdit ? 'Update Failed' : 'Create Failed', msg);
    } finally {
      setSaving(false);
    }
  };

  // ── Constraints helpers ───────────────────────────────────────────────────
  const addConstraint = () => setConstraints([...constraints, '']);
  const removeConstraint = (idx: number) => setConstraints(constraints.filter((_, i) => i !== idx));

  // ── Hints helpers ─────────────────────────────────────────────────────────
  const addHint = () => setHints([...hints, '']);
  const removeHint = (idx: number) => setHints(hints.filter((_, i) => i !== idx));

  // ── Example helpers ───────────────────────────────────────────────────────
  const addExample = () => setExamples([...examples, { input: '', output: '', explanation: '' }]);
  const removeExample = (idx: number) => setExamples(examples.filter((_, i) => i !== idx));
  const updateExample = (idx: number, field: keyof Example, value: string) => {
    const updated = [...examples];
    updated[idx] = { ...updated[idx], [field]: value };
    setExamples(updated);
  };

  // ── Test case helpers ─────────────────────────────────────────────────────
  const addTestCase = () =>
    setTestCases([...testCases, { input: '', expectedOutput: '', isSample: false, explanation: '' }]);
  const removeTestCase = (idx: number) => setTestCases(testCases.filter((_, i) => i !== idx));
  const updateTestCase = (idx: number, field: keyof TestCaseField, value: any) => {
    const updated = [...testCases];
    updated[idx] = { ...updated[idx], [field]: value };
    setTestCases(updated);
  };

  // ── Solution helpers ──────────────────────────────────────────────────────
  const addSolution = () =>
    setSolutions([...solutions, { language: 'javascript', code: '', explanation: '', timeComplexity: '', spaceComplexity: '' }]);
  const removeSolution = (idx: number) => setSolutions(solutions.filter((_, i) => i !== idx));
  const updateSolution = (idx: number, field: keyof SolutionEntry, value: string) => {
    const updated = [...solutions];
    updated[idx] = { ...updated[idx], [field]: value };
    setSolutions(updated);
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loadingProblem) {
    return (
      <div className="flex items-center justify-center h-64 gap-2 text-slate-400 dark:text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Loading problem…</span>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back link */}
      <div>
        <Link
          to="/admin/problems"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Problems</span>
        </Link>
      </div>

      <PageHeader
        title={isEdit ? `Edit: ${title}` : 'Create New Problem'}
        subtitle="Configure the algorithmic statement, examples, test cases, starter code, constraints and hints."
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'preview' ? 'editor' : 'preview')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            {activeTab === 'preview' ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{activeTab === 'preview' ? 'Back to Editor' : 'Candidate Preview'}</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-60 rounded-xl shadow-sm transition-colors"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Problem'}</span>
          </button>
        </div>
      </PageHeader>

      {/* Tab switcher */}
      <Tabs
  tabs={[
    { id: 'editor', label: 'Editor Mode', icon: Edit3 },
    { id: 'preview', label: 'Candidate Preview', icon: Eye },
    { id: 'editorial', label: 'Editorial', icon: FileText },
    { id: 'solution', label: 'Official Solution', icon: Code2 },
  ]}
        activeTab={activeTab}
        onChange={(t) => setActiveTab(t as any)}
      />

      {/* ── EDITOR MODE ──────────────────────────────────────────────────── */}
      {activeTab === 'editor' ? (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT / MAIN COL (2 cols) ────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Metadata */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
              <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">Basic Metadata</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Problem Title</label>
                <input
                  type="text" required value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Subarray Sum Equals K"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">URL Slug</label>
                <div className="flex items-center">
                  <span className="px-3 py-2 text-xs bg-slate-100 dark:bg-navy-800 border border-r-0 border-slate-200 dark:border-slate-800 rounded-l-xl text-slate-400 font-mono">
                    /problems/
                  </span>
                  <input
                    type="text" required value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="two-sum"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Problem Description (Markdown)</label>
                <textarea
                  rows={8} value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write detailed problem statement with markdown equations..."
                  className="w-full p-3 text-sm font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Examples */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-brand-500" />
                  Examples
                </h3>
                <button type="button" onClick={addExample}
                  className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /><span>Add Example</span>
                </button>
              </div>

              {examples.length === 0 && (
                <p className="text-xs text-slate-400 italic">No examples yet — click "Add Example" to add one.</p>
              )}

              {examples.map((ex, idx) => (
                <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 bg-slate-50/60 dark:bg-navy-950/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Example {idx + 1}</span>
                    <button type="button" onClick={() => removeExample(idx)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Input</label>
                    <input type="text" value={ex.input}
                      onChange={(e) => updateExample(idx, 'input', e.target.value)}
                      placeholder="e.g. nums = [2,7,11,15], target = 9"
                      className="w-full px-3 py-1.5 text-xs font-mono bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Output</label>
                    <input type="text" value={ex.output}
                      onChange={(e) => updateExample(idx, 'output', e.target.value)}
                      placeholder="e.g. [0,1]"
                      className="w-full px-3 py-1.5 text-xs font-mono bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-emerald-700 dark:text-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Explanation <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <input type="text" value={ex.explanation}
                      onChange={(e) => updateExample(idx, 'explanation', e.target.value)}
                      placeholder="e.g. Because nums[0] + nums[1] == 9, we return [0, 1]."
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Test Cases */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                  Test Cases
                  <span className="ml-2 text-[10px] font-semibold text-slate-400 normal-case tracking-normal">
                    ({testCases.filter(t => t.isSample).length} sample · {testCases.filter(t => !t.isSample).length} hidden)
                  </span>
                </h3>
                <button type="button" onClick={addTestCase}
                  className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /><span>Add Test Case</span>
                </button>
              </div>

              {testCases.length === 0 && (
                <p className="text-xs text-slate-400 italic">No test cases yet — click "Add Test Case" to add one.</p>
              )}

              {testCases.map((tc, idx) => (
                <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 bg-slate-50/60 dark:bg-navy-950/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Test {idx + 1}
                      </span>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox" checked={tc.isSample}
                          onChange={(e) => updateTestCase(idx, 'isSample', e.target.checked)}
                          className="w-3.5 h-3.5 rounded accent-brand-600"
                        />
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          Sample (visible to user)
                        </span>
                      </label>
                    </div>
                    <button type="button" onClick={() => removeTestCase(idx)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Input (stdin)</label>
                      <textarea rows={3} value={tc.input}
                        onChange={(e) => updateTestCase(idx, 'input', e.target.value)}
                        placeholder="e.g. [2,7,11,15]&#10;9"
                        className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Expected Output</label>
                      <textarea rows={3} value={tc.expectedOutput}
                        onChange={(e) => updateTestCase(idx, 'expectedOutput', e.target.value)}
                        placeholder="e.g. [0,1]"
                        className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-emerald-700 dark:text-emerald-400 resize-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Note <span className="font-normal">(optional)</span>
                    </label>
                    <input type="text" value={tc.explanation}
                      onChange={(e) => updateTestCase(idx, 'explanation', e.target.value)}
                      placeholder="Describe what this test case covers..."
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Starter Code */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
              <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">Starter Code</h3>

              {/* Language tabs */}
              <div className="flex gap-1.5 flex-wrap">
                {(['javascript', 'typescript', 'python', 'java', 'cpp'] as (keyof StarterCode)[]).map((lang) => (
                  <button
                    key={lang} type="button"
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${activeLang === lang
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-400'
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <textarea
                rows={10} value={starterCode[activeLang]}
                onChange={(e) => setStarterCode({ ...starterCode, [activeLang]: e.target.value })}
                placeholder={`Write ${activeLang} starter code here...`}
                className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
                spellCheck={false}
              />
            </div>

            {/* Constraints */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">Input Constraints</h3>
                <button type="button" onClick={addConstraint}
                  className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /><span>Add Constraint</span>
                </button>
              </div>

              {constraints.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="text" value={c}
                    onChange={(e) => { const u = [...constraints]; u[i] = e.target.value; setConstraints(u); }}
                    placeholder="e.g. 1 <= nums.length <= 10^5"
                    className="flex-1 px-3 py-1.5 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button type="button" onClick={() => removeConstraint(i)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Hints */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">Learner Hints</h3>
                <button type="button" onClick={addHint}
                  className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /><span>Add Hint</span>
                </button>
              </div>

              {hints.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="text" value={h}
                    onChange={(e) => { const u = [...hints]; u[i] = e.target.value; setHints(u); }}
                    placeholder="Progressive hint..."
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button type="button" onClick={() => removeHint(i)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT / SETTINGS COL (1 col) ─────────────────────────────── */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
              <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">Publication Settings</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as ProblemStatus)}
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="Draft">Draft</option>
                  <option value="Review">In Review</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Difficulty Level</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as ProblemDifficulty)}
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Curriculum Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="Algorithms">Algorithms</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="System Design">System Design</option>
                  <option value="Concurrency">Concurrency</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Topics (comma separated)</label>
                <input type="text" value={topicsInput}
                  onChange={(e) => setTopicsInput(e.target.value)}
                  placeholder="Arrays, Dynamic Programming, Two Pointers"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Hiring Companies</label>
                <input type="text" value={companiesInput}
                  onChange={(e) => setCompaniesInput(e.target.value)}
                  placeholder="Google, Amazon, Meta, Uber"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Follow-up Question</label>
                <input type="text" value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  placeholder="Can you solve it in O(n) time?"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Stats panel (edit mode only) */}
            {isEdit && (
              <div className="bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] mb-3">
                  Live Stats (read-only)
                </p>
                <p>Test Cases: <strong className="text-slate-900 dark:text-white">{testCases.length}</strong></p>
                <p>Sample visible: <strong className="text-slate-900 dark:text-white">{testCases.filter(t => t.isSample).length}</strong></p>
              </div>
            )}
          </div>
        </form>
      ) : activeTab === 'preview' ?  (
        /* ── PREVIEW TAB ──────────────────────────────────────────────────── */
        <div className="max-w-4xl mx-auto bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-soft-sm space-y-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{title || 'Untitled Problem'}</h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
              difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              }`}>
              {difficulty}
            </span>
          </div>

          <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
            {description}
          </div>

          {/* Examples preview */}
          {examples.length > 0 && (
            <div className="space-y-3">
              {examples.map((ex, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-navy-950/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-2">
                  <p className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Example {idx + 1}:</p>
                  <div className="font-mono text-xs space-y-1">
                    <p>
                      <strong className="text-slate-600 dark:text-slate-400">Input:</strong>{' '}
                      <span className="text-slate-900 dark:text-slate-100 bg-white dark:bg-navy-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {ex.input || '—'}
                      </span>
                    </p>
                    <p>
                      <strong className="text-slate-600 dark:text-slate-400">Output:</strong>{' '}
                      <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {ex.output || '—'}
                      </span>
                    </p>
                    {ex.explanation && (
                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400 pt-1">
                        <strong>Explanation:</strong> {ex.explanation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Constraints preview */}
          {constraints.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Constraints:</h4>
              <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-slate-600 dark:text-slate-400">
                {constraints.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}

          {/* Follow-up preview */}
          {followUp && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <strong>Follow up:</strong> {followUp}
            </div>
          )}
        </div>
           ) : activeTab === 'editorial' ? (
         <Editorials editorialData={editorialData} setEditorialData={setEditorialData} />
      ) : (
       <OfficialSolutions solutions={solutions} setSolutions={setSolutions} />
      )}
    </div>
    
  );
};
