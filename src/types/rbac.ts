export type AdminRole = 
  | 'Super Admin'
  | 'Content Admin'
  | 'Moderator'
  | 'Support Admin'
  | 'Analytics Admin';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete';

export type PermissionResource = 
  | 'users'
  | 'problems'
  | 'submissions'
  | 'contests'
  | 'assessments'
  | 'interviews'
  | 'roadmaps'
  | 'visualizers'
  | 'discussions'
  | 'reports'
  | 'system'
  | 'auditLogs'
  | 'settings';

export type PermissionMatrix = Record<PermissionResource, Record<PermissionAction, boolean>>;

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: AdminRole;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  mfaEnabled: boolean;
  department: string;
  createdAt: string;
}

export interface RoleDefinition {
  id: string;
  name: AdminRole;
  description: string;
  userCount: number;
  isSystem: boolean;
  permissions: PermissionMatrix;
}
