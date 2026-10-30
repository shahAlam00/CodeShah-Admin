import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Code2,
  CheckSquare,
  HelpCircle,
  Save,
  Eye,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { QuestionType, AssessmentDifficulty, AssessmentQuestion } from '../../../types/assessment';
import { useToast } from '../../../context/ToastContext';

export const AssessmentBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [title, setTitle] = useState('Advanced React & Concurrency Evaluation');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [passingScore, setPassingScore] = useState(75);
  const [difficulty, setDifficulty] = useState<AssessmentDifficulty>('Intermediate');

  const [questions, setQuestions] = useState<AssessmentQuestion[]>([
    {
      id: 'q-1',
      type: 'mcq',
      title: 'React Fiber Reconciler',
      question: 'Which method schedule updates in React 18 concurrent mode without blocking urgent user inputs?',
      options: ['useTransition', 'useEffect', 'useLayoutEffect', 'useImperativeHandle'],
      correctAnswers: ['useTransition'],
      explanation: 'useTransition marks state updates as non-urgent transitions, enabling interruptible rendering.',
      difficulty: 'Intermediate',
      topic: 'React Concurrency',
      marks: 10,
    },
    {
      id: 'q-2',
      type: 'true_false',
      title: 'Strict Mode Double Invocation',
      question: 'React Strict Mode in development executes component bodies twice to detect accidental side effects.',
      options: ['True', 'False'],
      correctAnswers: ['True'],
      explanation: 'In development, Strict Mode intentionally calls components twice to surface purity issues.',
      difficulty: 'Beginner',
      topic: 'React Core',
      marks: 5,
    },
  ]);

  const [newQType, setNewQType] = useState<QuestionType>('mcq');

  const addQuestion = () => {
    const q: AssessmentQuestion = {
      id: `q-${Date.now().toString().slice(-4)}`,
      type: newQType,
      title: 'New Evaluation Question',
      question: 'Enter question text here...',
      options: newQType === 'true_false' ? ['True', 'False'] : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswers: [],
      explanation: 'Explanation of correct answer.',
      difficulty: 'Intermediate',
      topic: 'General',
      marks: 10,
    };
    setQuestions([...questions, q]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSave = () => {
    showToast('success', 'Assessment Published', `Assessment "${title}" configured with ${questions.length} questions.`);
    navigate('/admin/assessments');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <Link
          to="/admin/assessments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessments</span>
        </Link>
      </div>

      <PageHeader
        title="Assessment Question Builder"
        subtitle="Construct technical evaluations with auto-graded Multiple Choice, Multiple Select, and Coding questions."
      >
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Publish Assessment</span>
        </button>
      </PageHeader>

      {/* Meta Config Card */}
      <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm space-y-4">
        <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">
          Assessment Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assessment Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Duration (Mins)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pass Mark (%)
              </label>
              <input
                type="number"
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Builder List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-navy-900 dark:text-white">
            Questions ({questions.length})
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={newQType}
              onChange={(e) => setNewQType(e.target.value as QuestionType)}
              className="px-2.5 py-1.5 text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <option value="mcq">Multiple Choice (Single)</option>
              <option value="multiple_select">Multiple Select (Checkboxes)</option>
              <option value="true_false">True / False</option>
              <option value="coding">Coding Challenge</option>
            </select>
            <button
              onClick={addQuestion}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Question</span>
            </button>
          </div>
        </div>

        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                <span className="font-mono text-xs font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-500">
                  {q.type}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono font-bold">
                  {q.marks} Marks
                </span>
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              rows={2}
              value={q.question}
              onChange={(e) => {
                const updated = [...questions];
                updated[idx].question = e.target.value;
                setQuestions(updated);
              }}
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />

            {q.options && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Choice Options:
                </span>
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${q.id}`}
                      checked={q.correctAnswers.includes(opt)}
                      onChange={() => {
                        const updated = [...questions];
                        updated[idx].correctAnswers = [opt];
                        setQuestions(updated);
                      }}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[idx].options![optIdx] = e.target.value;
                        setQuestions(updated);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
