import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/layout/AdminSidebar';
import { AdminNavbar } from '../components/admin/layout/AdminNavbar';
import { useAuth } from '../context/AuthContext'; 

export const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('codeforge_sidebar_collapsed') === 'true';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('codeforge_sidebar_collapsed', String(collapsed));
  }, [collapsed]); 

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Desktop & Mobile Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 w-64 bg-white dark:bg-navy-900 h-full shadow-2xl">
            <AdminSidebar
              collapsed={false}
              onToggle={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? 'md:pl-20' : 'md:pl-64'
        }`}
      >
        <AdminNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
