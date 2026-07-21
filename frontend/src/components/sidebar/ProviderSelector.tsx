import React from 'react';
import { Cpu } from 'lucide-react';
import { AIProvider } from '../../types/provider';
import { Select } from '../ui/Select';

interface ProviderSelectorProps {
  provider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
}

const PROVIDERS: { value: AIProvider; label: string }[] = [
  { value: 'Gemini', label: 'Google Gemini' },
  { value: 'OpenAI', label: 'OpenAI' },
  { value: 'Groq', label: 'Groq Cloud' },
  { value: 'Anthropic', label: 'Anthropic Claude' },
];

export const ProviderSelector: React.FC<ProviderSelectorProps> = ({ provider, onProviderChange }) => {
  return (
    <Select
      label="AI Provider"
      value={provider}
      onChange={(e) => onProviderChange(e.target.value as AIProvider)}
      options={PROVIDERS}
      icon={<Cpu className="w-4 h-4 text-sky-400" />}
    />
  );
};
