import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { AIProvider, EffortLevel } from '../../types/provider';
import { ReviewHistoryItem } from '../../types/review';
import { ProviderSelector } from '../sidebar/ProviderSelector';
import { ModelSelector } from '../sidebar/ModelSelector';
import { EffortSelector } from '../sidebar/EffortSelector';
import { ApiKeyInput } from '../sidebar/ApiKeyInput';
import { HistoryList } from '../sidebar/HistoryList';

interface SidebarProps {
  provider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
  model: string;
  onModelChange: (model: string) => void;
  effort: EffortLevel;
  onEffortChange: (effort: EffortLevel) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  history: ReviewHistoryItem[];
  onSelectHistory: (item: ReviewHistoryItem) => void;
  onClearHistory: () => void;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  provider,
  onProviderChange,
  model,
  onModelChange,
  effort,
  onEffortChange,
  apiKey,
  onApiKeyChange,
  history,
  onSelectHistory,
  onClearHistory,
}) => {
  return (
    <aside className="w-full lg:w-80 h-full bg-[#0d1117] border-r border-[#30363d] p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
      {/* Sidebar Section Title */}
      <div className="flex items-center justify-between pb-2 border-b border-[#30363d]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#c9d1d9] uppercase tracking-wider">
          <SlidersHorizontal className="w-4 h-4 text-sky-400" />
          <span>Model Configuration</span>
        </div>
        <span className="text-[10px] text-sky-400 font-mono px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
          Live Settings
        </span>
      </div>

      {/* Provider Selector */}
      <ProviderSelector provider={provider} onProviderChange={onProviderChange} />

      {/* Model Selector */}
      <ModelSelector provider={provider} model={model} onModelChange={onModelChange} />

      {/* Reasoning / Effort Level */}
      <EffortSelector effort={effort} onEffortChange={onEffortChange} />

      {/* Custom API Key input per provider (sessionStorage) */}
      <ApiKeyInput apiKey={apiKey} onApiKeyChange={onApiKeyChange} provider={provider} />

      {/* Request History */}
      <HistoryList history={history} onSelect={onSelectHistory} onClear={onClearHistory} />

      {/* Footer Info */}
      <div className="mt-auto pt-4 text-[10px] text-[#484f58] text-center font-mono border-t border-[#30363d]">
        Joho Code Review Platform © 2026
      </div>
    </aside>
  );
};
