import React from 'react';
import { Code2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../types/provider';

interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] px-2.5 py-1 rounded-lg">
      <Code2 className="w-4 h-4 text-sky-400" />
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-transparent text-xs font-mono font-medium text-[#c9d1d9] focus:outline-none cursor-pointer pr-4"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id} className="bg-[#161b22] text-[#c9d1d9]">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
