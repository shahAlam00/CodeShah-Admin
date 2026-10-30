import React from 'react';
import { BookOpen } from 'lucide-react';

interface EditorialData {
    title: string;
    overview: string;
    approach: string;
    keyInvariant: string;
    timeComplexity: string;
    spaceComplexity: string;
}

interface Props {
    editorialData: EditorialData;
    setEditorialData: (data: EditorialData) => void;
}

export const Editorials = ({ editorialData, setEditorialData }: Props) => {
    const set = (field: keyof EditorialData, value: string) =>
        setEditorialData({ ...editorialData, [field]: value });

    return (
        <div className="p-6 max-w-8xl space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-brand-600" />
                    Manage Problem Editorial
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    Fill editorial details — they will be saved when you publish the problem.
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Editorial Title / Heading
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Plus One: Intuition & Analysis"
                        value={editorialData.title}
                        onChange={e => set('title', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        1. Problem Overview & Invariants
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Describe the core objective and background..."
                        value={editorialData.overview}
                        onChange={e => set('overview', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        2. Optimal Approach: Step-by-Step
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Explain step-by-step logic..."
                        value={editorialData.approach}
                        onChange={e => set('approach', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Key Invariant Box Note (Highlight Box)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Maintain an auxiliary lookup structure..."
                        value={editorialData.keyInvariant}
                        onChange={e => set('keyInvariant', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Time Complexity
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. O(N)"
                            value={editorialData.timeComplexity}
                            onChange={e => set('timeComplexity', e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500 font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Space Complexity
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. O(1)"
                            value={editorialData.spaceComplexity}
                            onChange={e => set('spaceComplexity', e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500 font-mono"
                        />
                    </div>
                </div>

                <p className="text-xs text-slate-400 pt-1">
                    ✓ Changes are saved automatically when you click "Publish Problem" or "Save Changes" above.
                </p>
            </div>
        </div>
    );
};

export default Editorials;
