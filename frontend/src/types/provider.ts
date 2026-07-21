export type AIProvider = 'Gemini' | 'OpenAI' | 'Groq' | 'Anthropic';

export type EffortLevel = 'low' | 'medium' | 'high';

export interface ModelOption {
  id: string;
  name: string;
  provider: AIProvider;
  description: string;
  recommended?: boolean;
}

export const VALID_MODELS: Record<AIProvider, ModelOption[]> = {
  Gemini: [
    {
      id: 'gemini-2.5-flash',
      name: 'Gemini 2.5 Flash',
      provider: 'Gemini',
      description: 'Fast, efficient low-latency review',
      recommended: true,
    },
    {
      id: 'gemini-2.5-pro',
      name: 'Gemini 2.5 Pro',
      provider: 'Gemini',
      description: 'Deep architectural & complex logic analysis',
    },
  ],
  OpenAI: [
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      description: 'Omni model for complex refactoring',
      recommended: true,
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
      provider: 'OpenAI',
      description: 'Lightweight & cost-effective review',
    },
  ],
  Groq: [
    {
      id: 'llama-3.1-70b-versatile',
      name: 'Llama 3.1 70B (Groq)',
      provider: 'Groq',
      description: 'Ultra-fast open-weights model',
      recommended: true,
    },
  ],
  Anthropic: [
    {
      id: 'claude-3-5-sonnet',
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      description: 'State-of-the-art coding intelligence',
      recommended: true,
    },
  ],
};

export const SUPPORTED_LANGUAGES = [
  { id: 'csharp', label: 'C#' },
  { id: 'typescript', label: 'TypeScript / JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'sql', label: 'SQL' },
] as const;

export const FOCUS_AREAS = [
  { id: 'General', label: 'General Review' },
  { id: 'Security', label: 'Security & Vulnerabilities' },
  { id: 'Performance', label: 'Performance & Speed' },
  { id: 'Maintainability', label: 'Maintainability & Clean Code' },
  { id: 'Architecture', label: 'Architecture & Patterns' },
] as const;
