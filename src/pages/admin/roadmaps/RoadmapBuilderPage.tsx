import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Lock,
  Unlock,
  MoveUp,
  MoveDown,
  Save,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { mockRoadmaps } from '../../../data/admin/roadmaps';
import { Roadmap, RoadmapPhase, RoadmapTopic } from '../../../types/roadmap';
import { useToast } from '../../../context/ToastContext';

export const RoadmapBuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const initialRoadmap = id ? mockRoadmaps.find((r) => r.id === id) || mockRoadmaps[0] : mockRoadmaps[0];
  const [roadmap, setRoadmap] = useState<Roadmap>(initialRoadmap);
  const { showToast } = useToast();

  const handleAddPhase = () => {
    const newPhase: RoadmapPhase = {
      id: `phase-${Date.now().toString().slice(-4)}`,
      title: `Phase ${roadmap.phases.length + 1}: New Milestone`,
      description: 'Define syllabus objectives for this phase.',
      order: roadmap.phases.length + 1,
      topics: [],
    };
    setRoadmap({
      ...roadmap,
      phases: [...roadmap.phases, newPhase],
    });
    showToast('success', 'Phase Added', 'Appended new milestone phase to track.');
  };

  const handleMovePhase = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === roadmap.phases.length - 1)) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedPhases = [...roadmap.phases];
    const temp = updatedPhases[index];
    updatedPhases[index] = updatedPhases[newIndex];
    updatedPhases[newIndex] = temp;
    setRoadmap({ ...roadmap, phases: updatedPhases });
  };

  const handleRemovePhase = (phaseId: string) => {
    setRoadmap({
      ...roadmap,
      phases: roadmap.phases.filter((p) => p.id !== phaseId),
    });
    showToast('info', 'Phase Removed', 'Curriculum phase deleted.');
  };

  const handleToggleTopicLock = (phaseId: string, topicId: string) => {
    setRoadmap({
      ...roadmap,
      phases: roadmap.phases.map((p) => {
        if (p.id !== phaseId) return p;
        return {
          ...p,
          topics: p.topics.map((t) => (t.id === topicId ? { ...t, isLocked: !t.isLocked } : t)),
        };
      }),
    });
  };

  const handleAddTopic = (phaseId: string) => {
    const newTopic: RoadmapTopic = {
      id: `top-${Date.now().toString().slice(-4)}`,
      title: 'New Curriculum Module',
      description: 'Detailed topic overview',
      estimatedHours: 10,
      isLocked: false,
      problemIds: [],
      articleCount: 5,
      quizCount: 2,
    };
    setRoadmap({
      ...roadmap,
      phases: roadmap.phases.map((p) => {
        if (p.id !== phaseId) return p;
        return {
          ...p,
          topics: [...p.topics, newTopic],
        };
      }),
    });
  };

  const handleSave = () => {
    showToast('success', 'Roadmap Saved', `Successfully updated "${roadmap.title}".`);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div>
        <Link
          to="/admin/roadmaps"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roadmaps</span>
        </Link>
      </div>

      <PageHeader
        title={`Roadmap Builder: ${roadmap.title}`}
        subtitle="Manage progressive unlocking prerequisites, learning modules, and time allocations."
      >
        <button
          onClick={handleAddPhase}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 transition-colors shadow-soft-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Phase</span>
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </PageHeader>

      {/* Phase Cards Container */}
      <div className="space-y-6">
        {roadmap.phases.map((phase, pIdx) => (
          <div
            key={phase.id}
            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold flex items-center justify-center font-mono text-xs">
                  P{pIdx + 1}
                </span>
                <div>
                  <input
                    type="text"
                    value={phase.title}
                    onChange={(e) => {
                      const updated = [...roadmap.phases];
                      updated[pIdx].title = e.target.value;
                      setRoadmap({ ...roadmap, phases: updated });
                    }}
                    className="font-bold text-base text-navy-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none"
                  />
                  <p className="text-xs text-slate-400 mt-0.5">{phase.description}</p>
                </div>
              </div>

              {/* Order Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMovePhase(pIdx, 'up')}
                  disabled={pIdx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-30"
                  title="Move Up"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMovePhase(pIdx, 'down')}
                  disabled={pIdx === roadmap.phases.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-30"
                  title="Move Down"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemovePhase(phase.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                  title="Delete Phase"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Topics under this phase */}
            <div className="space-y-2.5">
              {phase.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleTopicLock(phase.id, topic.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        topic.isLocked
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                      }`}
                      title={topic.isLocked ? 'Locked Module' : 'Unlocked Module'}
                    >
                      {topic.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white">{topic.title}</h5>
                      <span className="text-[11px] text-slate-400">{topic.description}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{topic.estimatedHours}h</span>
                    </span>
                    <span>{topic.articleCount} articles</span>
                    <span>{topic.quizCount} quizzes</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAddTopic(phase.id)}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Topic Module to Phase</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
