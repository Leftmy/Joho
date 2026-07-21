import React from 'react';
import { Play, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { AIProvider, EffortLevel } from '../../types/provider';

interface StickySubmitBarProps {
  onSubmit: () => void;
  isLoading: boolean;
  disabled?: boolean;
  provider: AIProvider;
  model: string;
  effort: EffortLevel;
  error?: string | null;
}

export const StickySubmitBar: React.FC<StickySubmitBarProps> = ({
  onSubmit,
  isLoading,
  disabled,
  provider,
  model,
  effort,
  error,
}) => {
  return (
    <div className="sticky bottom-4 z-20 w-full mt-4">
      <div className="bg-[#161b22]/90 backdrop-blur-md border border-[#30363d] p-3 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-glow-sm">
        <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-500/30 text-sky-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#c9d1d9] truncate">
              <span>Run Code Review</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                {provider} ({model})
              </span>
            </div>
            <div className="text-[11px] text-[#8b949e] truncate flex items-center gap-1.5">
              <span>Reasoning: <strong className="text-indigo-300 uppercase">{effort}</strong></span>
              <span>•</span>
              <span>Automated Security & Architecture Analysis</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="w-full sm:w-auto flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{error}</span>
          </div>
        )}

        <div className="w-full sm:w-auto flex items-center justify-end">
          <Button
            type="button"
            onClick={onSubmit}
            isLoading={isLoading}
            disabled={disabled}
            size="lg"
            variant="primary"
            leftIcon={<Play className="w-4 h-4 fill-white" />}
            className="w-full sm:w-auto min-w-[180px]"
          >
            {isLoading ? 'Analyzing Code...' : 'Start Review'}
          </Button>
        </div>
      </div>
    </div>
  );
};
