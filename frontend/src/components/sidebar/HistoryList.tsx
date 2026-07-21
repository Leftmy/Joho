import React from 'react';
import { History, Trash2, ChevronRight, FileCode } from 'lucide-react';
import { ReviewHistoryItem } from '../../types/review';

interface HistoryListProps {
  history: ReviewHistoryItem[];
  onSelect: (item: ReviewHistoryItem) => void;
  onClear: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, onClear }) => {
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="flex items-center justify-between pt-2 border-t border-[#30363d]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8b949e]">
          <History className="w-3.5 h-3.5" />
          <span>Review History ({history.length})</span>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#8b949e] hover:text-red-400 transition-colors flex items-center gap-1"
            title="Clear History"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-6 text-xs text-[#484f58]">
          <FileCode className="w-8 h-8 mx-auto mb-2 opacity-40" />
          No review history yet. Submit code to begin!
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 overflow-y-auto max-h-48 pr-1 custom-scrollbar">
          {history.map((item) => {
            const scoreColor =
              item.score >= 80
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                : item.score >= 50
                ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className="flex items-center justify-between p-2 rounded-lg bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] transition-all text-left group"
              >
                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#c9d1d9] truncate">
                    <span className="truncate">{item.codeSnippet}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#8b949e] mt-1">
                    <span>{item.timestamp}</span>
                    <span>•</span>
                    <span className="uppercase">{item.language}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${scoreColor}`}>
                    {item.score}/100
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#484f58] group-hover:text-[#c9d1d9] transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
