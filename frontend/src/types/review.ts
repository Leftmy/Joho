import { AIProvider, EffortLevel } from './provider';

export type SeverityLevel = 'Critical' | 'Warning' | 'Info' | 'Optimization';

export interface CodeIssueDTO {
  lineNumber: number;
  severity: SeverityLevel;
  title: string;
  description: string;
  suggestedFix: string;
}

export interface CodeReviewRequestDTO {
  code: string;
  language: string;
  focusArea: string;
  provider: AIProvider | string;
  model: string;
  effortLevel?: EffortLevel;
  customApiKey?: string | null;
}

export interface CodeReviewResponseDTO {
  score: number;
  summary: string;
  issues: CodeIssueDTO[];
  modelUsed: string;
  executionTimeMs: number;
}

export interface ReviewHistoryItem {
  id: string;
  timestamp: string;
  language: string;
  focusArea: string;
  provider: string;
  model: string;
  score: number;
  codeSnippet: string;
  response: CodeReviewResponseDTO;
}
