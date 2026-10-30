import React from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../../context/ThemeContext';

interface MonacoCodeEditorProps {
  value: string;
  onChange?: (val: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

export const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  value,
  onChange,
  language = 'typescript',
  height = '350px',
  readOnly = false,
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-soft-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-slate-400 text-xs font-mono border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-slate-300 font-semibold">{language.toUpperCase()}</span>
        </div>
        {readOnly && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-700 text-slate-300">
            Read Only
          </span>
        )}
      </div>

      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(val) => onChange && onChange(val || '')}
        theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontFamily: '"JetBrains Mono", Consolas, monospace',
        }}
      />
    </div>
  );
};
