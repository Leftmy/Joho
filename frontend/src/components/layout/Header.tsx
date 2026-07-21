import React from 'react';
import { Menu, Terminal } from 'lucide-react';
import { AuthStatus } from '../sidebar/AuthStatus';
import { UserProfile } from '../../types/auth';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  onOpenAuthModal: (mode?: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  user,
  isAuthenticated,
  onOpenAuthModal,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full h-14 bg-[#0d1117]/90 backdrop-blur-md border-b border-[#30363d] px-4 sm:px-6 flex items-center justify-between">
      {/* Left side: Logo & mobile menu button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-glow-sm border border-sky-400/40">
            J
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-bold text-sm text-white tracking-tight">
              <span>Joho</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-500/30">
                v1.0
              </span>
            </div>
            <span className="text-[10px] text-[#8b949e] hidden sm:block">
              AI Code Review & Developer Assistant
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Engine badge & User Profile */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs text-[#8b949e] bg-[#161b22] px-3 py-1.5 rounded-lg border border-[#30363d]">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span>ASP.NET Core + LLM</span>
        </div>

        {/* User Profile Badge at top right */}
        <div className="bg-[#161b22] px-3 py-1.5 rounded-xl border border-[#30363d] shadow-sm">
          <AuthStatus
            user={user}
            isAuthenticated={isAuthenticated}
            onOpenAuthModal={onOpenAuthModal}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
};
