import React from 'react';
import { Sparkles, Clock, Cpu, CheckCircle2, ListFilter } from 'lucide-react';
import { CodeReviewResponseDTO } from '../../types/review';
import { ScoreBadge } from './ScoreBadge';
import { IssueCard } from './IssueCard';

interface ReviewFeedbackProps {
  response: CodeReviewResponseDTO | null;
  isLoading: boolean;
}

export const ReviewFeedback: React.FC<ReviewFeedbackProps> = ({ response, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#161b22] border border-[#30363d] rounded-2xl shadow-xl min-h-[300px]">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-sky-500/20 border-t-sky-400 animate-spin" />
          <Sparkles className="w-6 h-6 text-sky-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-[#c9d1d9]">Running AI Code Review...</h3>
        <p className="mt-1 text-xs text-[#8b949e]">Analyzing security, performance, and design patterns</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-[#161b22]/50 border border-dashed border-[#30363d] rounded-2xl text-center min-h-[250px]">
        <Sparkles className="w-10 h-10 text-sky-400/40 mb-3" />
        <h3 className="text-sm font-medium text-[#c9d1d9]">Review results will appear here</h3>
        <p className="mt-1 text-xs text-[#8b949e] max-w-sm">
          Paste your code snippet into the editor and click "Start Review" to receive instant AI feedback.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Top Banner / Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#30363d]">
        <div className="flex items-start gap-3">
          <ScoreBadge score={response.score} />

          <div className="flex flex-col justify-center">
            <h3 className="text-base font-bold text-[#c9d1d9] flex items-center gap-2">
              <span>Executive Summary</span>
            </h3>
            <div className="flex items-center gap-3 text-xs text-[#8b949e] mt-1 font-mono">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                {response.modelUsed}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {response.executionTimeMs} ms
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#0d1117] px-3 py-1.5 rounded-xl border border-[#30363d] text-xs font-mono">
          <span className="text-[#8b949e]">Issues Found:</span>
          <span className="font-bold text-sky-400">{response.issues.length}</span>
        </div>
      </div>

      {/* Executive Summary */}
      {response.summary && (
        <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 text-xs text-[#c9d1d9] leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-sky-400 mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>AI Assistant Insights</span>
          </div>
          <p className="text-[#8b949e]">{response.summary}</p>
        </div>
      )}

      {/* Issues Section */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#c9d1d9] uppercase tracking-wider flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-indigo-400" />
            <span>Detailed Issues & Fixes ({response.issues.length})</span>
          </h4>
        </div>

        {response.issues.length === 0 ? (
          <div className="p-6 bg-[#0d1117] border border-[#30363d] rounded-xl text-center text-xs text-emerald-400">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-80" />
            Great job! No critical issues or warnings detected in this code snippet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {response.issues.map((issue, idx) => (
              <IssueCard key={idx} issue={issue} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
