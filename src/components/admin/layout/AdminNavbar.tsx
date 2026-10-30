import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Moon,
  Sun,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Shield,
  User,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { NotificationDropdown } from '../navigation/NotificationDropdown';
import { CommandPalette } from '../navigation/CommandPalette';
import { AdminRole } from '../../../types/rbac';

interface AdminNavbarProps {
  onMobileMenuToggle: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onMobileMenuToggle }) => {
  const { admin, role, switchRole, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: AdminRole[] = [
    'Super Admin',
    'Content Admin',
    'Moderator',
    'Support Admin',
    'Analytics Admin',
  ];

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left side: mobile toggle & title/search trigger */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search Shortcut button */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-950/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all text-sm w-44 sm:w-64 md:w-80 justify-between shadow-soft-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate text-xs">Search anything...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cluster Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Cluster: Normal (8/10 Workers)</span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Notification dropdown */}
          <NotificationDropdown />

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

          {/* Admin Profile & Role Switcher */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors text-left"
            >
              <img
                src={admin?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                alt={admin?.name || 'Admin'}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-brand-500/30"
              />
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-navy-900 dark:text-white leading-none">
                  {admin?.name || 'Administrator'}
                </p>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 font-medium">
                  {role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft-lg z-50 py-2 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-navy-900 dark:text-white">
                    {admin?.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {admin?.email}
                  </p>
                </div>

                {/* Role Switcher Demo */}
                <div className="px-3 py-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Switch Active Role (RBAC Demo)
                  </p>
                  <div className="space-y-1">
                    {rolesList.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setIsProfileOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                          role === r
                            ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-navy-800'
                        }`}
                      >
                        <span>{r}</span>
                        {role === r && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Search Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
};
