import React from 'react';
import { Target } from 'lucide-react';
import { FOCUS_AREAS } from '../../types/provider';

interface FocusAreaSelectorProps {
  focusArea: string;
  onFocusAreaChange: (focus: string) => void;
}

export const FocusAreaSelector: React.FC<FocusAreaSelectorProps> = ({ focusArea, onFocusAreaChange }) => {
  return (
    <div className="flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] px-2.5 py-1 rounded-lg">
      <Target className="w-4 h-4 text-indigo-400" />
      <select
        value={focusArea}
        onChange={(e) => onFocusAreaChange(e.target.value)}
        className="bg-transparent text-xs font-medium text-[#c9d1d9] focus:outline-none cursor-pointer pr-4"
      >
        {FOCUS_AREAS.map((area) => (
          <option key={area.id} value={area.id} className="bg-[#161b22] text-[#c9d1d9]">
            {area.label}
          </option>
        ))}
      </select>
    </div>
  );
};
