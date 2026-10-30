import React, { useState } from 'react';
import { Code2 } from 'lucide-react';

interface SolutionEntry {
    language: string;
    code: string;
    explanation: string;
    timeComplexity: string;
    spaceComplexity: string;
}

interface Props {
    solutions: SolutionEntry[];
    setSolutions: (s: SolutionEntry[]) => void;
}

const LANGUAGES = ['javascript', 'cpp', 'python', 'java', 'typescript'] as const;
type Lang = typeof LANGUAGES[number];

export const OfficialSolutions = ({ solutions, setSolutions }: Props) => {
    const [activeLang, setActiveLang] = useState<Lang>('javascript');

    const getSolution = (lang: Lang): SolutionEntry =>
        solutions.find(s => s.language === lang) || { language: lang, code: '', explanation: '', timeComplexity: '', spaceComplexity: '' };

    const updateSolution = (lang: Lang, field: keyof SolutionEntry, value: string) => {
        const existing = solutions.find(s => s.language === lang);
        if (existing) {
            setSolutions(solutions.map(s => s.language === lang ? { ...s, [field]: value } : s));
        } else {
            setSolutions([...solutions, { language: lang, code: '', explanation: '', timeComplexity: '', spaceComplexity: '', [field]: value }]);
        }
    };

    const current = getSolution(activeLang);

    return (
        <div className="p-6 max-w-4xl space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-brand-600" />
                    Manage Official Solutions (Multi-Language)
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    Add optimal solutions per language — saved when you publish the problem.
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-5">
                {/* Language Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => setActiveLang(lang)}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${activeLang === lang
                                ? 'bg-brand-600 text-white shadow-soft-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {lang} {getSolution(lang).code ? '✓' : ''}
                        </button>
                    ))}
                </div>

                {/* Code */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            {activeLang} Solution Code
                        </label>
                        <span className="text-[10px] font-mono text-slate-400">
                            Editing: <strong className="text-brand-600">{activeLang}</strong>
                        </span>
                    </div>
                    <textarea
                        rows={10}
                        placeholder={`Paste optimal ${activeLang} code here...`}
                        value={current.code}
                        onChange={e => updateSolution(activeLang, 'code', e.target.value)}
                        className="w-full px-3.5 py-3 text-sm bg-slate-900 text-emerald-400 font-mono border border-slate-700 rounded-xl outline-none focus:border-brand-500"
                    />
                </div>

                {/* Explanation */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {activeLang} Explanation (Optional)
                    </label>
                    <textarea
                        rows={3}
                        placeholder={`Briefly explain the ${activeLang} approach...`}
                        value={current.explanation}
                        onChange={e => updateSolution(activeLang, 'explanation', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                    />
                </div>

                {/* Complexity */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Time Complexity</label>
                        <input
                            type="text"
                            placeholder="e.g. O(N)"
                            value={current.timeComplexity}
                            onChange={e => updateSolution(activeLang, 'timeComplexity', e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500 font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Space Complexity</label>
                        <input
                            type="text"
                            placeholder="e.g. O(1)"
                            value={current.spaceComplexity}
                            onChange={e => updateSolution(activeLang, 'spaceComplexity', e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500 font-mono"
                        />
                    </div>
                </div>

                <p className="text-xs text-slate-400 pt-1">
                    ✓ Switch tabs to fill other languages. All saved when you click "Publish Problem" above.
                </p>
            </div>
        </div>
    );
};

export default OfficialSolutions;
