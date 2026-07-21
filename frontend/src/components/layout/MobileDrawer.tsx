import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { AIProvider, EffortLevel } from '../../types/provider';
import { ReviewHistoryItem } from '../../types/review';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  provider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
  model: string;
  onModelChange: (model: string) => void;
  effort: EffortLevel;
  onEffortChange: (effort: EffortLevel) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  history: ReviewHistoryItem[];
  onSelectHistory: (item: ReviewHistoryItem) => void;
  onClearHistory: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, ...sidebarProps }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-xs bg-[#0d1117] h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between p-3 border-b border-[#30363d] bg-[#161b22]">
          <span className="text-xs font-bold text-[#c9d1d9]">Joho Review Options</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Sidebar {...sidebarProps} onCloseMobile={onClose} />
        </div>
      </div>
    </div>
  );
};
