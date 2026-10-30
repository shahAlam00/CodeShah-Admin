import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ChevronLeft,
  Swords,
  Clock,
  Plus,
  Trash2,
  Calendar,
  Eye,
  Send,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { mockProblems } from '../../../data/admin/problems';
import { useToast } from '../../../context/ToastContext';

export const ContestBuilderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Form State
  const [basicInfo, setBasicInfo] = useState({
    title: 'CodeForge Biweekly Clash #106',
    slug: 'codeforge-biweekly-clash-106',
    description: 'Solve 4 algorithmic challenges in 90 minutes. Open to all competitive programmers.',
    prizePool: '$1,000 + Swag',
    isRated: true,
  });

  const [selectedProblems, setSelectedProblems] = useState([
    { problemId: 'prob-001', points: 250, order: 1, title: 'Two Sum' },
    { problemId: 'prob-004', points: 500, order: 2, title: 'Course Schedule II' },
    { problemId: 'prob-002', points: 750, order: 3, title: 'LRU Cache' },
    { problemId: 'prob-003', points: 1000, order: 4, title: 'Median of Two Sorted Arrays' },
  ]);

  const [rules, setRules] = useState([
    'Contest is strictly individual. External AI code generators are prohibited.',
    'Plagiarism will result in immediate disqualification and 30-day rating freeze.',
    '5 minutes penalty added for each wrong submission prior to final acceptance.',
  ]);

  const [schedule, setSchedule] = useState({
    startDate: '2025-05-10',
    startTime: '14:00',
    durationMinutes: 90,
  });

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Problems' },
    { number: 3, title: 'Rules & Anti-Cheat' },
    { number: 4, title: 'Schedule' },
    { number: 5, title: 'Review & Publish' },
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePublish = () => {
    showToast('success', 'Contest Created', `Published "${basicInfo.title}" with 4 challenges.`);
    navigate('/admin/contests');
  };

  const addRule = () => setRules([...rules, '']);
  const removeRule = (idx: number) => setRules(rules.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <Link
          to="/admin/contests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Contests</span>
        </Link>
      </div>

      <PageHeader
        title="Contest Builder Wizard"
        subtitle="Configure official coding tournament metadata, scoring curves, problem selection, and start schedules."
      />

      {/* Stepper Progress Bar */}
      <div className="bg-white dark:bg-navy-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                    currentStep === s.number
                      ? 'bg-brand-600 text-white shadow-soft-sm'
                      : currentStep > s.number
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-400'
                  }`}
                >
                  {currentStep > s.number ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                </div>
                <span className="hidden sm:block text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  {s.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep > s.number ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-navy-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Step 1: Tournament Title & Branding
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contest Name
              </label>
              <input
                type="text"
                value={basicInfo.title}
                onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                URL Identifier (Slug)
              </label>
              <input
                type="text"
                value={basicInfo.slug}
                onChange={(e) => setBasicInfo({ ...basicInfo, slug: e.target.value })}
                className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Description & Rewards
              </label>
              <textarea
                rows={3}
                value={basicInfo.description}
                onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={basicInfo.isRated}
                  onChange={(e) => setBasicInfo({ ...basicInfo, isRated: e.target.checked })}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <span>Rated Contest (Affects Global Leaderboard Elo)</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Problem Selection */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Step 2: Assign Problems & Points
            </h3>
            <p className="text-xs text-slate-500">
              Problems will remain encrypted and hidden from participants until the start gun fires.
            </p>

            <div className="space-y-3">
              {selectedProblems.map((sp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-950 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center">
                      Q{idx + 1}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {sp.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Score:</span>
                      <input
                        type="number"
                        value={sp.points}
                        onChange={(e) => {
                          const updated = [...selectedProblems];
                          updated[idx].points = Number(e.target.value);
                          setSelectedProblems(updated);
                        }}
                        className="w-18 px-2 py-1 text-center font-mono font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                      <span className="text-slate-400">pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Rules */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-navy-900 dark:text-white">
                Step 3: Anti-Cheat & Tournament Guidelines
              </h3>
              <button
                type="button"
                onClick={addRule}
                className="text-xs text-brand-600 font-semibold hover:underline"
              >
                + Add Rule
              </button>
            </div>

            <div className="space-y-2.5">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => {
                      const updated = [...rules];
                      updated[idx] = e.target.value;
                      setRules(updated);
                    }}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeRule(idx)}
                    className="p-2 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Schedule */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Step 4: Scheduling & Duration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={schedule.startDate}
                  onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Start Time (UTC)
                </label>
                <input
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={schedule.durationMinutes}
                  onChange={(e) => setSchedule({ ...schedule, durationMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Publish */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Step 5: Review Contest Summary
            </h3>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Contest Title:</span>
                <strong className="text-sm font-bold text-navy-900 dark:text-white">
                  {basicInfo.title}
                </strong>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Rated Mode:</span>
                <span className="font-semibold text-emerald-600">
                  {basicInfo.isRated ? 'Yes (Official Elo Calculation)' : 'Unrated Practice'}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Challenges:</span>
                <span className="font-mono font-bold">
                  {selectedProblems.length} Problems (Total {selectedProblems.reduce((a, b) => a + b.points, 0)} pts)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Launch Window:</span>
                <span className="font-mono">
                  {schedule.startDate} at {schedule.startTime} UTC ({schedule.durationMinutes} mins)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handleBack}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Launch Contest</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
