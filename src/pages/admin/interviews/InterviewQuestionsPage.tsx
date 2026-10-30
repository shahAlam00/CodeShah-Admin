import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Plus,
  Search,
  Sliders,
  CheckCircle2,
  Save,
  MessageSquare,
  Cpu,
  HelpCircle,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { DataTable, Column } from '../../../components/admin/common/DataTable';
import { StatusBadge } from '../../../components/admin/common/StatusBadge';
import { Tabs } from '../../../components/admin/common/Tabs';
import { mockAIQuestions, mockInterviewTemplates } from '../../../data/admin/interviews';
import { AIInterviewQuestion, QuestionCategory } from '../../../types/interview';
import { useToast } from '../../../context/ToastContext';

export const InterviewQuestionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bank' | 'promptConfig'>('bank');
  const [questions, setQuestions] = useState<AIInterviewQuestion[]>(mockAIQuestions);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [systemPrompt, setSystemPrompt] = useState(mockInterviewTemplates[0].systemPrompt);
  const [interviewRules, setInterviewRules] = useState(mockInterviewTemplates[0].interviewRules.join('\n'));
  const [followUpRules, setFollowUpRules] = useState(mockInterviewTemplates[0].followUpRules.join('\n'));
  const { showToast } = useToast();

  const filteredQuestions = questions.filter(
    (q) => selectedCategory === 'all' || q.category === selectedCategory
  );

  const handleSavePrompt = () => {
    showToast('success', 'AI Agent Configuration Updated', 'Prompt guidelines, system persona, and follow-up parameters saved.');
  };

  const columns: Column<AIInterviewQuestion>[] = [
    {
      key: 'title',
      header: 'Question Topic',
      accessor: (q) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">{q.title}</p>
          <span className="font-mono text-xs text-brand-600 dark:text-brand-400">{q.technology}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'category',
      header: 'Category',
      accessor: (q) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
          {q.category}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'difficulty',
      header: 'Target Level',
      accessor: (q) => <StatusBadge status={q.difficulty} size="sm" />,
      sortable: true,
      align: 'center',
    },
    {
      key: 'expectedSkills',
      header: 'Required Competencies',
      accessor: (q) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {q.expectedSkills.map((s) => (
            <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-[10px] text-slate-600 dark:text-slate-300">
              {s}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'rubricScoreMax',
      header: 'Rubric Max',
      accessor: (q) => (
        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
          {q.rubricScoreMax} pts
        </span>
      ),
      sortable: true,
      align: 'center',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="AI Interview Agent & Question Bank"
        subtitle="Manage technical discussion prompts, behavioral rubric scorecards, and system personas for generative AI mock interviews."
      />

      <Tabs
        tabs={[
          { id: 'bank', label: 'Curated Question Bank', icon: MessageSquare },
          { id: 'promptConfig', label: 'AI Persona & Rules Engine', icon: Sliders },
        ]}
        activeTab={activeTab}
        onChange={(t) => setActiveTab(t as any)}
      />

      {activeTab === 'bank' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['all', 'Technical', 'System Design', 'Behavioral', 'Coding'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          <DataTable
            data={filteredQuestions}
            columns={columns}
            keyExtractor={(q) => q.id}
            pageSize={10}
          />
        </div>
      ) : (
        /* Prompt Configuration UI */
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-soft-sm space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-navy-900 dark:text-white">
                Interviewer Agent System Prompt
              </h3>
              <p className="text-xs text-slate-500">
                Determines tone, skepticism, guidance thresholds, and follow-up tenacity.
              </p>
            </div>
            <button
              onClick={handleSavePrompt}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save AI Prompt Rules</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                System Prompt Persona
              </label>
              <textarea
                rows={5}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interview Rules (one per line)
              </label>
              <textarea
                rows={4}
                value={interviewRules}
                onChange={(e) => setInterviewRules(e.target.value)}
                className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Follow-up Probing Rules
              </label>
              <textarea
                rows={3}
                value={followUpRules}
                onChange={(e) => setFollowUpRules(e.target.value)}
                className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
