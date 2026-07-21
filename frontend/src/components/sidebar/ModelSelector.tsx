import React from 'react';
import { Sparkles } from 'lucide-react';
import { AIProvider, VALID_MODELS } from '../../types/provider';

interface ModelSelectorProps {
  provider: AIProvider;
  model: string;
  onModelChange: (model: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ provider, model, onModelChange }) => {
  const models = VALID_MODELS[provider] || [];

  return (
    <div className="w-full flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#8b949e] flex items-center justify-between">
        <span>LLM Model</span>
        <span className="text-[10px] text-sky-400 font-mono">
          {models.find((m) => m.id === model)?.id || model}
        </span>
      </label>

      <div className="grid grid-cols-1 gap-1.5">
        {models.map((m) => {
          const isSelected = m.id === model;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onModelChange(m.id)}
              className={`flex items-start justify-between p-2.5 rounded-lg border text-left transition-all duration-150 ${
                isSelected
                  ? 'bg-sky-500/10 border-sky-500/50 text-white shadow-glow-sm'
                  : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:border-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-medium text-xs text-[#c9d1d9]">
                  {isSelected && <Sparkles className="w-3 h-3 text-sky-400 fill-sky-400" />}
                  <span>{m.name}</span>
                </div>
                <span className="text-[10px] text-[#8b949e] mt-0.5">{m.description}</span>
              </div>

              {m.recommended && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
                  Recommended
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
