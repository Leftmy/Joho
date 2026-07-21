import React from 'react';
import { Gauge } from 'lucide-react';
import { EffortLevel } from '../../types/provider';

interface EffortSelectorProps {
  effort: EffortLevel;
  onEffortChange: (effort: EffortLevel) => void;
}

const EFFORT_OPTIONS: { id: EffortLevel; label: string; desc: string }[] = [
  { id: 'low', label: 'Low', desc: 'Fast analysis for basic issues' },
  { id: 'medium', label: 'Medium', desc: 'Balanced speed and depth' },
  { id: 'high', label: 'High', desc: 'Maximum reasoning & deep review' },
];

export const EffortSelector: React.FC<EffortSelectorProps> = ({ effort, onEffortChange }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-[#8b949e] flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-indigo-400" />
          <span>Reasoning / Effort Level</span>
        </label>
        <span className="text-[10px] font-mono capitalize px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          {effort}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-[#0d1117] p-1 border border-[#30363d] rounded-lg">
        {EFFORT_OPTIONS.map((item) => {
          const isActive = effort === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onEffortChange(item.id)}
              className={`py-1.5 px-2 rounded text-xs font-medium transition-all duration-150 text-center ${
                isActive
                  ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-300 border border-sky-500/40 shadow-glow-sm'
                  : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]'
              }`}
              title={item.desc}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
