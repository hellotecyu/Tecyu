import React, { useState } from 'react';
import { TecyuLogo } from '../common/TecyuLogo';
import { db } from '../../lib/database';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowLeft, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { AdminSession } from '../../types';

interface AdminLoginProps {
  onLoginSuccess: (session: AdminSession) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Please enter your administrator email or username.');
      return;
    }
    if (!password) {
      setError('Please enter your administrator password.');
      return;
    }

    setIsLoading(true);

    // Simulate cryptographic verification delay for realism & security
    setTimeout(() => {
      const result = db.authenticate(identifier, password);
      setIsLoading(false);

      if (result.success && result.user) {
        const session = db.getSession();
        if (session) {
          onLoginSuccess(session);
        }
      } else {
        setAttempts((prev) => prev + 1);
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    }, 450);
  };

  const handleQuickFill = (role: 'super_admin' | 'sales' | 'editor') => {
    if (role === 'super_admin') {
      setIdentifier('admin@tecyu.com');
      setPassword('tecyu@2026');
    } else if (role === 'sales') {
      setIdentifier('sales@tecyu.com');
      setPassword('tecyu@2026');
    } else if (role === 'editor') {
      setIdentifier('editor@tecyu.com');
      setPassword('tecyu@2026');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#08152F] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Background radial aura & high-tech grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_90%,rgba(6,182,212,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <TecyuLogo variant="dark" size="md" tagline="" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Restricted Admin Portal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator Sign In
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Authorized personnel only. Sessions are monitored and access attempts are cryptographically audited.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <p className="font-semibold">{error}</p>
                {attempts >= 3 && (
                  <p className="text-[11px] text-rose-400/80 mt-1">
                    Multiple failed attempts recorded in security audit logs.
                  </p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@tecyu.com or admin"
                  autoComplete="username"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => handleQuickFill('super_admin')}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                >
                  Quick Fill Demo
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-hidden cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-[#2563EB] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-xs text-slate-400">Remember session</span>
              </label>
              <span className="text-[11px] text-slate-500">256-bit SSL Guard</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  <span>Authenticate & Open Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Quick-fill helper box for ease of use */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Default Credentials
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                Ready
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('super_admin')}
                className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/20 text-left transition-colors cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-400">Super Admin</div>
                <div className="text-[10px] text-slate-500 truncate">admin@tecyu.com</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('sales')}
                className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/20 text-left transition-colors cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-400">Sales CRM</div>
                <div className="text-[10px] text-slate-500 truncate">sales@tecyu.com</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('editor')}
                className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/20 text-left transition-colors cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-400">Editor</div>
                <div className="text-[10px] text-slate-500 truncate">editor@tecyu.com</div>
              </button>
            </div>

            <div className="mt-2.5 text-[11px] text-slate-400 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60 flex items-center justify-between">
              <span>Default password for all demo accounts:</span>
              <code className="text-cyan-300 font-mono font-bold bg-slate-800/80 px-1.5 py-0.5 rounded">tecyu@2026</code>
            </div>
          </div>
        </div>

        {/* Back to website link */}
        <div className="mt-6 text-center">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
