import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && <label className="text-xs font-medium text-[#8b949e]">{label}</label>}
        <div className="relative flex items-center">
          {leftIcon && <div className="absolute left-3 text-[#8b949e] pointer-events-none">{leftIcon}</div>}
          <input
            type={type}
            ref={ref}
            className={cn(
              'w-full bg-[#0d1117] border border-[#30363d] rounded-lg text-sm text-[#c9d1d9] placeholder-[#484f58]',
              'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/40 transition-colors duration-150',
              leftIcon ? 'pl-9' : 'pl-3',
              rightIcon ? 'pr-9' : 'pr-3',
              'py-2',
              error && 'border-red-500/70 focus:border-red-500 focus:ring-red-500/30',
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 text-[#8b949e]">{rightIcon}</div>}
        </div>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
