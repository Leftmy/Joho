import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, Zap, ChevronDown, ChevronUp, Wrench } from 'lucide-react';
import { CodeIssueDTO, SeverityLevel } from '../../types/review';
import { CodeHighlightBlock } from './CodeHighlightBlock';

interface IssueCardProps {
  issue: CodeIssueDTO;
  index: number;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, index }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const severityConfig: Record<SeverityLevel, { icon: any; badgeClass: string; borderClass: string }> = {
    Critical: {
      icon: AlertTriangle,
      badgeClass: 'bg-red-500/15 text-red-400 border-red-500/30',
      borderClass: 'border-l-4 border-l-red-500',
    },
    Warning: {
      icon: AlertCircle,
      badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      borderClass: 'border-l-4 border-l-amber-500',
    },
    Optimization: {
      icon: Zap,
      badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      borderClass: 'border-l-4 border-l-purple-500',
    },
    Info: {
      icon: Info,
      badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
      borderClass: 'border-l-4 border-l-sky-500',
    },
  };

  const config = severityConfig[issue.severity] || severityConfig.Warning;
  const Icon = config.icon;

  return (
    <div className={`bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm transition-all ${config.borderClass}`}>
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#21262d]/50 transition-colors select-none"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className={`p-1.5 rounded-lg border ${config.badgeClass}`}>
            <Icon className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 overflow-hidden">
            {issue.lineNumber > 0 && (
              <span className="font-mono text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 flex-shrink-0">
                Line #{issue.lineNumber}
              </span>
            )}
            <h4 className="text-xs sm:text-sm font-semibold text-[#c9d1d9] truncate">
              #{index + 1}. {issue.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${config.badgeClass}`}>
            {issue.severity}
          </span>
          <button type="button" className="p-1 text-[#8b949e]">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-3 border-t border-[#30363d] bg-[#0d1117]/50 flex flex-col gap-2.5 text-xs text-[#c9d1d9]">
          <p className="leading-relaxed text-[#8b949e]">{issue.description}</p>

          {issue.suggestedFix && (
            <div className="mt-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mb-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>Suggested Fix:</span>
              </div>
              <CodeHighlightBlock code={issue.suggestedFix} highlightLine={issue.lineNumber} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
