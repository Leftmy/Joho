import React, { useState } from 'react';
import { Key, Eye, EyeOff, Trash2, ShieldCheck, Lock } from 'lucide-react';
import { Input } from '../ui/Input';

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  provider: string;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onApiKeyChange, provider }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2 p-3 bg-[#161b22] border border-[#30363d] rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c9d1d9]">
          <Key className="w-3.5 h-3.5 text-sky-400" />
          <span>{provider} API Key</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span>sessionStorage</span>
        </div>
      </div>

      <div className="relative">
        <Input
          type={isVisible ? 'text' : 'password'}
          placeholder={`Enter ${provider} API Key (optional)`}
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          leftIcon={<Lock className="w-3.5 h-3.5 text-[#8b949e]" />}
          rightIcon={
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="p-1 hover:text-sky-400 transition-colors text-[#8b949e]"
                title={isVisible ? 'Hide Key' : 'Show Key'}
              >
                {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              {apiKey && (
                <button
                  type="button"
                  onClick={() => onApiKeyChange('')}
                  className="p-1 hover:text-red-400 transition-colors text-[#8b949e]"
                  title="Clear Key from session"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          }
          className="text-xs py-1.5 pr-14"
        />
      </div>

      <p className="text-[11px] text-[#8b949e] leading-tight">
        Keys are stored separately per provider in session memory and cleared when tab is closed.
      </p>
    </div>
  );
};
