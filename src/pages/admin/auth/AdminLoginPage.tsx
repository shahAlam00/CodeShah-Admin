import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Terminal,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { AdminRole } from '../../../types/rbac';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('shahrukh@codeforge.io');
  const [password, setPassword] = useState('SuperAdminPass2025!');
  const [selectedRole, setSelectedRole] = useState<AdminRole>('Super Admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide valid admin credentials.');
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        await login(email, selectedRole);
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 600);
      } catch (err) {
        setError('Authentication handshake failed. Check your security token.');
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const handleQuickFill = (role: AdminRole, mail: string) => {
    setSelectedRole(role);
    setEmail(mail);
    setPassword('DemoPass2025!');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-900 text-slate-100 font-sans">
      {/* Left Branding Column */}
      <div className="lg:w-1/2 relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
        {/* Background ambient light effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold shadow-glow-blue">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              CodeForge
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-brand-400 font-mono font-medium tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Root Governance Portal</span>
            </div>
          </div>
        </div>

        {/* Center Hero statement */}
        <div className="relative z-10 my-12 lg:my-0 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/80 text-brand-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            <span>High-Security Environment • Level 4 Access</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Control the entire coding ecosystem from one place.
          </h1>

          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Manage 128,000+ engineers, real-time distributed execution nodes, contest algorithms, curriculum tracks, and automated moderation pipelines.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div>
              <p className="text-slate-500">Active Workers</p>
              <p className="text-lg font-bold text-white font-mono mt-0.5">8 / 10 Online</p>
            </div>
            <div>
              <p className="text-slate-500">Submissions/Day</p>
              <p className="text-lg font-bold text-white font-mono mt-0.5">42,910</p>
            </div>
            <div>
              <p className="text-slate-500">Security SLA</p>
              <p className="text-lg font-bold text-emerald-400 font-mono mt-0.5">99.99%</p>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between">
          <span>Enterprise CodeForge v2.4.1</span>
          <span>Encrypted TLS 1.3 Handshake</span>
        </div>
      </div>

      {/* Right Login Form Column */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white dark:bg-navy-950 text-slate-900 dark:text-slate-100">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-900 dark:text-white">
              Admin Authentication
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Enter your authorized staff credentials to access privileged tools.
            </p>
          </div>

          {/* Quick-fill preset buttons */}
          <div className="mb-6 p-3 bg-slate-50 dark:bg-navy-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <p className="font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Quick-Test Demo Roles:
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickFill('Super Admin', 'shahrukh@codeforge.io')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-xs font-medium hover:border-brand-500 transition-colors"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('Content Admin', 'priya.sharma@codeforge.io')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-xs font-medium hover:border-brand-500 transition-colors"
              >
                Content Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('Moderator', 'rahul.v@codeforge.io')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-xs font-medium hover:border-brand-500 transition-colors"
              >
                Moderator
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('Analytics Admin', 'elena.r@codeforge.io')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-xs font-medium hover:border-brand-500 transition-colors"
              >
                Analytics Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Authentication approved! Redirecting to command dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@codeforge.io"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/20"
                />
                <span>Remember session for 30 days</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Dispatched password recovery instructions to registered admin device.')}
                className="text-brand-600 hover:text-brand-700 dark:text-brand-400 font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-glow-blue transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to Control Center</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
