import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, LogIn, UserPlus, AlertCircle, Sparkles } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { loginUser, registerUser } from '../../services/authService';
import { UserProfile } from '../../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setError(null);
  }, [initialMode, isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'register' && !username.trim()) {
      setError('Username is required for registration.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        await loginUser({ email, password });
        onSuccess({
          userName: email.split('@')[0] || 'User',
          email: email.trim(),
        });
      } else {
        await registerUser({ username, email, password });
        onSuccess({
          userName: username.trim(),
          email: email.trim(),
        });
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden shadow-glow-sm animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#0d1117] border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-glow-sm">
              J
            </div>
            <span className="font-bold text-sm text-white">Joho Account Access</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1.5 bg-[#0d1117]/60 border-b border-[#30363d]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              mode === 'login'
                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-glow-sm'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              mode === 'register'
                ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-glow-sm'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/25 rounded-xl text-xs text-rose-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' && (
            <Input
              label="Username"
              type="text"
              placeholder="e.g. alex_dev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<User className="w-4 h-4 text-[#8b949e]" />}
              required
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="developer@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-[#8b949e]" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4 text-[#8b949e]" />}
            required
          />

          <Button
            type="submit"
            isLoading={isLoading}
            variant="primary"
            size="lg"
            leftIcon={mode === 'login' ? <LogIn className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            className="w-full mt-2"
          >
            {mode === 'login' ? 'Sign In to Joho' : 'Register Account'}
          </Button>

          <p className="text-[11px] text-[#8b949e] text-center mt-2 leading-relaxed">
            Authentication tokens are handled securely via HTTP-Only browser cookies.
          </p>
        </form>
      </div>
    </div>
  );
};
