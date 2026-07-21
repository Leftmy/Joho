import React from 'react';
import { ShieldAlert, ShieldCheck, Award } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let color = 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/40';
  let label = 'Excellent Code Quality';
  let Icon = ShieldCheck;

  if (score < 50) {
    color = 'from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/40';
    label = 'Action Required';
    Icon = ShieldAlert;
  } else if (score < 80) {
    color = 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/40';
    label = 'Good (Minor Suggestions)';
    Icon = Award;
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r ${color} border shadow-glow-sm`}>
      <Icon className="w-6 h-6 flex-shrink-0" />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold font-mono leading-none">{score}</span>
          <span className="text-xs text-[#8b949e] font-mono">/100</span>
        </div>
        <span className="text-[11px] font-medium leading-none mt-1">{label}</span>
      </div>
    </div>
  );
};
