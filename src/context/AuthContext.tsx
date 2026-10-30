import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AdminRole, PermissionResource, PermissionAction } from '../types/rbac';
import { initialAdminUsers, defaultPermissions } from '../data/admin/rbac';

interface AuthContextType {
  admin: AdminUser | null;
  role: AdminRole;
  isAuthenticated: boolean;
  login: (email: string, role?: AdminRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: AdminRole) => void;
  hasPermission: (resource: PermissionResource, action: PermissionAction) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('codeforge_admin_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialAdminUsers[0];
      }
    }
    return initialAdminUsers[0]; // Default logged in as Super Admin
  });

  const [role, setRole] = useState<AdminRole>(() => {
    const savedRole = localStorage.getItem('codeforge_admin_role') as AdminRole;
    return savedRole || 'Super Admin';
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem('codeforge_admin_user', JSON.stringify(admin));
      localStorage.setItem('codeforge_admin_role', role);
    } else {
      localStorage.removeItem('codeforge_admin_user');
      localStorage.removeItem('codeforge_admin_role');
    }
  }, [admin, role]);

  const login = async (email: string, targetRole: AdminRole = 'Super Admin'): Promise<boolean> => {
    const matched = initialAdminUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) 
      || { ...initialAdminUsers[0], email, role: targetRole };
    
    setAdmin({ ...matched, role: targetRole });
    setRole(targetRole);
    return true;
  };

  const logout = () => {
    setAdmin(null);
  };

  const switchRole = (newRole: AdminRole) => {
    setRole(newRole);
    if (admin) {
      setAdmin({ ...admin, role: newRole });
    }
  };

  const hasPermission = (resource: PermissionResource, action: PermissionAction): boolean => {
    const rolePerms = defaultPermissions[role];
    if (!rolePerms || !rolePerms[resource]) return false;
    return rolePerms[resource][action] ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        role,
        isAuthenticated: !!admin,
        login,
        logout,
        switchRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
