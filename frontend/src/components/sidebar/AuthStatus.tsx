import React from 'react';
import { UserCheck, LogIn } from 'lucide-react';
import { UserProfile } from '../../types/auth';

interface AuthStatusProps {
  user: UserProfile | null;
  isAuthenticated: boolean;
  onOpenAuthModal: (mode?: 'login' | 'register') => void;
  onLogout?: () => void;
}

export const AuthStatus: React.FC<AuthStatusProps> = ({
  user,
  isAuthenticated,
  onOpenAuthModal,
  onLogout,
}) => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative cursor-pointer" onClick={() => !isAuthenticated && onOpenAuthModal('login')}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-glow-sm">
          {isAuthenticated && user?.userName ? user.userName.slice(0, 2).toUpperCase() : 'G'}
        </div>
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0d1117] ${
            isAuthenticated ? 'bg-emerald-400' : 'bg-amber-400'
          }`}
        />
      </div>

      <div className="flex flex-col text-left">
        <span className="text-xs font-semibold text-[#c9d1d9] flex items-center gap-1">
          {isAuthenticated ? user?.userName || 'Alex Developer' : 'Guest Developer'}
          {isAuthenticated && <UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
        </span>
        <span className="text-[10px] text-[#8b949e]">
          {isAuthenticated ? 'Authenticated' : 'Session Guest'}
        </span>
      </div>

      {isAuthenticated ? (
        <button
          type="button"
          onClick={onLogout}
          className="ml-2 text-[11px] px-2 py-0.5 rounded bg-[#21262d] hover:bg-red-500/20 text-[#8b949e] hover:text-red-400 border border-[#30363d] transition-colors"
          title="Sign Out"
        >
          Sign Out
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onOpenAuthModal('login')}
          className="ml-2 text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors flex items-center gap-1 font-medium"
        >
          <LogIn className="w-3 h-3" />
          <span>Sign In</span>
        </button>
      )}
    </div>
  );
};
