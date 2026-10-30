import { AdminUser, RoleDefinition, PermissionMatrix } from '../../types/rbac';

export const defaultPermissions: Record<string, PermissionMatrix> = {
  'Super Admin': {
    users: { view: true, create: true, edit: true, delete: true },
    problems: { view: true, create: true, edit: true, delete: true },
    submissions: { view: true, create: true, edit: true, delete: true },
    contests: { view: true, create: true, edit: true, delete: true },
    assessments: { view: true, create: true, edit: true, delete: true },
    interviews: { view: true, create: true, edit: true, delete: true },
    roadmaps: { view: true, create: true, edit: true, delete: true },
    visualizers: { view: true, create: true, edit: true, delete: true },
    discussions: { view: true, create: true, edit: true, delete: true },
    reports: { view: true, create: true, edit: true, delete: true },
    system: { view: true, create: true, edit: true, delete: true },
    auditLogs: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, create: true, edit: true, delete: true },
  },
  'Content Admin': {
    users: { view: true, create: false, edit: false, delete: false },
    problems: { view: true, create: true, edit: true, delete: true },
    submissions: { view: true, create: false, edit: false, delete: false },
    contests: { view: true, create: true, edit: true, delete: false },
    assessments: { view: true, create: true, edit: true, delete: true },
    interviews: { view: true, create: true, edit: true, delete: false },
    roadmaps: { view: true, create: true, edit: true, delete: true },
    visualizers: { view: true, create: true, edit: true, delete: true },
    discussions: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: false, edit: true, delete: false },
    system: { view: false, create: false, edit: false, delete: false },
    auditLogs: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  'Moderator': {
    users: { view: true, create: false, edit: true, delete: false },
    problems: { view: true, create: false, edit: false, delete: false },
    submissions: { view: true, create: false, edit: false, delete: false },
    contests: { view: true, create: false, edit: false, delete: false },
    assessments: { view: true, create: false, edit: false, delete: false },
    interviews: { view: true, create: false, edit: false, delete: false },
    roadmaps: { view: true, create: false, edit: false, delete: false },
    visualizers: { view: true, create: false, edit: false, delete: false },
    discussions: { view: true, create: false, edit: true, delete: true },
    reports: { view: true, create: false, edit: true, delete: true },
    system: { view: false, create: false, edit: false, delete: false },
    auditLogs: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  'Support Admin': {
    users: { view: true, create: false, edit: true, delete: false },
    problems: { view: true, create: false, edit: false, delete: false },
    submissions: { view: true, create: false, edit: true, delete: false },
    contests: { view: true, create: false, edit: false, delete: false },
    assessments: { view: true, create: false, edit: false, delete: false },
    interviews: { view: true, create: false, edit: false, delete: false },
    roadmaps: { view: true, create: false, edit: false, delete: false },
    visualizers: { view: true, create: false, edit: false, delete: false },
    discussions: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: true, edit: true, delete: false },
    system: { view: true, create: false, edit: false, delete: false },
    auditLogs: { view: true, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  'Analytics Admin': {
    users: { view: true, create: false, edit: false, delete: false },
    problems: { view: true, create: false, edit: false, delete: false },
    submissions: { view: true, create: false, edit: false, delete: false },
    contests: { view: true, create: false, edit: false, delete: false },
    assessments: { view: true, create: false, edit: false, delete: false },
    interviews: { view: true, create: false, edit: false, delete: false },
    roadmaps: { view: true, create: false, edit: false, delete: false },
    visualizers: { view: true, create: false, edit: false, delete: false },
    discussions: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: false, edit: false, delete: false },
    system: { view: true, create: false, edit: false, delete: false },
    auditLogs: { view: true, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  }
};

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'adm-001',
    name: 'Shahrukh Khan',
    email: 'shahrukh@codeforge.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '10 mins ago',
    mfaEnabled: true,
    department: 'Platform Engineering',
    createdAt: '2023-01-15'
  },
  {
    id: 'adm-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@codeforge.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    role: 'Content Admin',
    status: 'active',
    lastLogin: '25 mins ago',
    mfaEnabled: true,
    department: 'Curriculum & DSA',
    createdAt: '2023-04-10'
  },
  {
    id: 'adm-003',
    name: 'Rahul Verma',
    email: 'rahul.v@codeforge.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    role: 'Moderator',
    status: 'active',
    lastLogin: '1 hour ago',
    mfaEnabled: true,
    department: 'Trust & Safety',
    createdAt: '2023-06-20'
  },
  {
    id: 'adm-004',
    name: 'Elena Rostova',
    email: 'elena.r@codeforge.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    role: 'Analytics Admin',
    status: 'active',
    lastLogin: '3 hours ago',
    mfaEnabled: false,
    department: 'Data & Growth',
    createdAt: '2023-09-01'
  },
  {
    id: 'adm-005',
    name: 'Marcus Chen',
    email: 'marcus.c@codeforge.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    role: 'Support Admin',
    status: 'active',
    lastLogin: 'Yesterday',
    mfaEnabled: true,
    department: 'Customer Success',
    createdAt: '2023-11-12'
  }
];

export const initialRoles: RoleDefinition[] = [
  {
    id: 'role-super',
    name: 'Super Admin',
    description: 'Full root access to all platform resources, infrastructure telemetry, billing, and settings.',
    userCount: 3,
    isSystem: true,
    permissions: defaultPermissions['Super Admin']
  },
  {
    id: 'role-content',
    name: 'Content Admin',
    description: 'Create, modify and archive problems, roadmaps, visualizers, contests, and interview banks.',
    userCount: 8,
    isSystem: false,
    permissions: defaultPermissions['Content Admin']
  },
  {
    id: 'role-moderator',
    name: 'Moderator',
    description: 'Monitor discussion forums, review user reports, issue warnings, and moderate comments.',
    userCount: 14,
    isSystem: false,
    permissions: defaultPermissions['Moderator']
  },
  {
    id: 'role-support',
    name: 'Support Admin',
    description: 'Assist users with account inquiries, submission re-evaluations, and ticket escalations.',
    userCount: 6,
    isSystem: false,
    permissions: defaultPermissions['Support Admin']
  },
  {
    id: 'role-analytics',
    name: 'Analytics Admin',
    description: 'View platform usage metrics, cohorts, solve-rate analytics, and contest telemetry.',
    userCount: 4,
    isSystem: false,
    permissions: defaultPermissions['Analytics Admin']
  }
];
