import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

interface CodeHighlightBlockProps {
  code: string;
  language?: string;
  highlightLine?: number;
  title?: string;
}

export const CodeHighlightBlock: React.FC<CodeHighlightBlockProps> = ({
  code,
  language = 'csharp',
  highlightLine,
  title,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="flex flex-col bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden my-2 font-mono text-xs shadow-inner">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-[#30363d] text-[11px] text-[#8b949e]">
        <div className="flex items-center gap-1.5 font-semibold text-[#c9d1d9]">
          <Code className="w-3.5 h-3.5 text-sky-400" />
          <span>{title || `Suggested Fix (${language})`}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] transition-colors text-[10px]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Fix</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-2 overflow-x-auto custom-scrollbar bg-[#0d1117]">
        <pre className="m-0 leading-5">
          {lines.map((line, idx) => {
            const lineNumber = idx + 1;
            const isHighlighted = highlightLine === lineNumber;

            return (
              <div
                key={idx}
                className={`flex items-start ${
                  isHighlighted ? 'bg-amber-500/15 text-amber-200 border-l-2 border-amber-400 pl-1' : 'text-[#c9d1d9]'
                }`}
              >
                <span className="select-none text-[#484f58] w-8 text-right mr-3 flex-shrink-0">
                  {lineNumber}
                </span>
                <span className="whitespace-pre">{line || ' '}</span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};
