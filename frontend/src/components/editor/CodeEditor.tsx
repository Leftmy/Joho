import React, { useRef, useMemo } from 'react';
import { Copy, Trash2, Check } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { FocusAreaSelector } from './FocusAreaSelector';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  focusArea: string;
  onFocusAreaChange: (focus: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onCodeChange,
  language,
  onLanguageChange,
  focusArea,
  onFocusAreaChange,
}) => {
  const [copied, setCopied] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lineCount = useMemo(() => {
    return code.split('\n').length || 1;
  }, [code]);

  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  }, [lineCount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onCodeChange('');
  };

  return (
    <div className="flex flex-col h-full bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-xl focus-within:border-sky-500/50 focus-within:shadow-glow-sm transition-all duration-200">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1117] border-b border-[#30363d] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Decorative mac dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono font-medium text-[#8b949e]">Input Code Workspace</span>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
          <FocusAreaSelector focusArea={focusArea} onFocusAreaChange={onFocusAreaChange} />

          <div className="h-4 w-[1px] bg-[#30363d] mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={handleCopy}
            disabled={!code}
            className="p-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] disabled:opacity-40 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={!code}
            className="p-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-red-400 disabled:opacity-40 transition-colors"
            title="Clear Field"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 flex min-h-[300px] overflow-hidden bg-[#0d1117]/80">
        {/* Line Numbers Column */}
        <div className="select-none py-3 px-3 text-right bg-[#0d1117] border-r border-[#30363d] font-mono text-xs text-[#484f58] leading-6 min-w-[45px]">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="// Paste your code snippet here for automated AI review..."
          spellCheck={false}
          className="flex-1 w-full h-full p-3 bg-transparent text-[#c9d1d9] font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none placeholder-[#484f58] selection:bg-sky-500/30 selection:text-sky-100"
        />
      </div>

      {/* Editor Footer Status */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#0d1117] border-t border-[#30363d] text-[11px] text-[#8b949e] font-mono">
        <div className="flex items-center gap-3">
          <span>Lines: {lineCount}</span>
          <span>Chars: {code.length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>Ready for Review</span>
        </div>
      </div>
    </div>
  );
};
