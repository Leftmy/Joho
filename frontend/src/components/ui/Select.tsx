import React from 'react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[] | { value: string; label: string }[];
  error?: string;
  icon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && <label className="text-xs font-medium text-[#8b949e]">{label}</label>}
        <div className="relative flex items-center">
          {icon && <div className="absolute left-3 text-[#8b949e] pointer-events-none">{icon}</div>}
          <select
            ref={ref}
            className={cn(
              'w-full bg-[#0d1117] border border-[#30363d] rounded-lg text-sm text-[#c9d1d9]',
              'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/40 transition-colors duration-150',
              'cursor-pointer appearance-none py-2 pr-8',
              icon ? 'pl-9' : 'pl-3',
              error && 'border-red-500/70',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#161b22] text-[#c9d1d9]">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-[#8b949e]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
