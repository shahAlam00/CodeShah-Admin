import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Play,
  RotateCcw,
  Eye,
  Sliders,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { mockVisualizers } from '../../../data/admin/visualizers';
import { DSAVisualizer, VisualizerCategory } from '../../../types/visualizer';
import { useToast } from '../../../context/ToastContext';

export const VisualizerEditorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const existing = id ? mockVisualizers.find((v) => v.id === id) : null;

  const [name, setName] = useState(existing?.name || 'Quick Sort Visualizer');
  const [category, setCategory] = useState<VisualizerCategory>(existing?.category || 'Sorting');
  const [algorithm, setAlgorithm] = useState(existing?.algorithm || 'Quick Sort');
  const [description, setDescription] = useState(
    existing?.description || 'Divide and conquer algorithm picking a pivot and partitioning elements.'
  );
  const [pseudocode, setPseudocode] = useState(
    existing?.pseudocode ||
      `function quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)`
  );
  const [timeAvg, setTimeAvg] = useState(existing?.timeComplexity.average || 'O(n log n)');
  const [spaceAux, setSpaceAux] = useState(existing?.spaceComplexity || 'O(log n)');
  const [status, setStatus] = useState(existing?.status || 'Published');

  // Preview simulation bars
  const [bars, setBars] = useState<number[]>([45, 18, 82, 34, 70, 23, 10, 95, 55]);
  const [comparingIdx, setComparingIdx] = useState<number | null>(null);

  const handleSimulateStep = () => {
    // Demo visual step
    const randomIdx = Math.floor(Math.random() * (bars.length - 1));
    setComparingIdx(randomIdx);
    setTimeout(() => {
      const nextBars = [...bars];
      if (nextBars[randomIdx] > nextBars[randomIdx + 1]) {
        const temp = nextBars[randomIdx];
        nextBars[randomIdx] = nextBars[randomIdx + 1];
        nextBars[randomIdx + 1] = temp;
      }
      setBars(nextBars);
      setComparingIdx(null);
    }, 300);
  };

  const handleResetBars = () => {
    setBars([45, 18, 82, 34, 70, 23, 10, 95, 55]);
    setComparingIdx(null);
  };

  const handleSave = () => {
    showToast('success', 'Visualizer Configured', `Algorithm visualizer "${name}" saved.`);
    navigate('/admin/visualizers');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div>
        <Link
          to="/admin/visualizers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Visualizers</span>
        </Link>
      </div>

      <PageHeader
        title={`Configure Visualizer: ${name}`}
        subtitle="Manage algorithm animation physics, pseudocode highlights, and time/space complexity notes."
      >
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Configuration</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Configuration Form */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm space-y-4">
          <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">
            Algorithm Metadata
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Visualizer Title
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VisualizerCategory)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <option value="Sorting">Sorting</option>
                <option value="Searching">Searching</option>
                <option value="Array">Array</option>
                <option value="Linked List">Linked List</option>
                <option value="Stack">Stack</option>
                <option value="Queue">Queue</option>
                <option value="Tree">Tree</option>
                <option value="Graph">Graph</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Deployment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <option value="Published">Published</option>
                <option value="Beta">Beta (Selected Cohorts)</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Average Time Complexity
              </label>
              <input
                type="text"
                value={timeAvg}
                onChange={(e) => setTimeAvg(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Space Complexity
              </label>
              <input
                type="text"
                value={spaceAux}
                onChange={(e) => setSpaceAux(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Synchronized Pseudocode
            </label>
            <textarea
              rows={6}
              value={pseudocode}
              onChange={(e) => setPseudocode(e.target.value)}
              className="w-full p-2.5 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl leading-relaxed"
            />
          </div>
        </div>

        {/* Right: Live Interactive Canvas Preview */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-brand-600" />
                <span>Simulation Preview Panel</span>
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleSimulateStep}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white flex items-center gap-1 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Step Algorithm</span>
                </button>
                <button
                  onClick={handleResetBars}
                  className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-500"
                  title="Reset Data"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Animation Canvas */}
            <div className="h-64 w-full rounded-xl bg-slate-950 p-6 flex items-end justify-between gap-2 border border-slate-800 shadow-inner">
              {bars.map((height, i) => {
                const isComparing = comparingIdx === i || comparingIdx === i - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{height}</span>
                    <div
                      className={`w-full rounded-t-md transition-all duration-200 ${
                        isComparing ? 'bg-amber-400 shadow-glow-indigo' : 'bg-brand-500 hover:bg-brand-400'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[9px] font-mono text-slate-500">[{i}]</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <strong>State Trace:</strong> Click <em>Step Algorithm</em> to advance pointer indices and render instantaneous array swaps.
          </div>
        </div>
      </div>
    </div>
  );
};
