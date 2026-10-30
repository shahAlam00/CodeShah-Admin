export interface AuditLogEntry {
  id: string;
  adminName: string;
  adminEmail: string;
  adminRole: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'Success' | 'Failed';
  timestamp: string;
}

export interface ActivityFeedItem {
  id: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string;
  targetType: 'problem' | 'contest' | 'assessment' | 'interview' | 'report' | 'system';
  timestamp: string;
  badgeColor: string;
}
