import { AuditLogEntry, ActivityFeedItem } from '../../types/audit';

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-8901',
    adminName: 'Shahrukh Khan',
    adminEmail: 'shahrukh@codeforge.io',
    adminRole: 'Super Admin',
    action: 'Published Problem',
    entity: 'Problem',
    entityId: 'prob-001',
    details: 'Published "Two Sum" with 5 automated test cases',
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'Success',
    timestamp: '15 mins ago'
  },
  {
    id: 'aud-8902',
    adminName: 'Priya Sharma',
    adminEmail: 'priya.sharma@codeforge.io',
    adminRole: 'Content Admin',
    action: 'Created Contest',
    entity: 'Contest',
    entityId: 'cnt-105',
    details: 'Configured CodeForge Biweekly Clash #105 (4 problems, 90 mins)',
    ipAddress: '103.21.244.12',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'Success',
    timestamp: '42 mins ago'
  },
  {
    id: 'aud-8903',
    adminName: 'Rahul Verma',
    adminEmail: 'rahul.v@codeforge.io',
    adminRole: 'Moderator',
    action: 'Suspended User',
    entity: 'User',
    entityId: 'usr-105',
    details: 'Suspended user "vikram_m" for 7 days due to contest plagiarism',
    ipAddress: '49.36.128.89',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    status: 'Success',
    timestamp: '1 hour ago'
  },
  {
    id: 'aud-8904',
    adminName: 'Shahrukh Khan',
    adminEmail: 'shahrukh@codeforge.io',
    adminRole: 'Super Admin',
    action: 'Updated System Settings',
    entity: 'Settings',
    entityId: 'cfg-exec',
    details: 'Modified sandbox max execution time limit from 1500ms to 2000ms',
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'Success',
    timestamp: '3 hours ago'
  },
  {
    id: 'aud-8905',
    adminName: 'Marcus Chen',
    adminEmail: 'marcus.c@codeforge.io',
    adminRole: 'Support Admin',
    action: 'Reset User Password',
    entity: 'User',
    entityId: 'usr-103',
    details: 'Dispatched 2FA password recovery link for "david.miller@techcorp.com"',
    ipAddress: '172.56.21.14',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'Success',
    timestamp: '5 hours ago'
  },
  {
    id: 'aud-8906',
    adminName: 'Elena Rostova',
    adminEmail: 'elena.r@codeforge.io',
    adminRole: 'Analytics Admin',
    action: 'Exported User Telemetry',
    entity: 'Analytics',
    entityId: 'rep-q1-retention',
    details: 'Exported 90-day cohort retention CSV archive (24,500 records)',
    ipAddress: '82.102.25.10',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'Success',
    timestamp: 'Yesterday'
  }
];

export const mockLiveActivityFeed: ActivityFeedItem[] = [
  {
    id: 'feed-1',
    userName: 'Rahul Verma',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    action: 'solved',
    target: 'Two Sum',
    targetType: 'problem',
    timestamp: '2 mins ago',
    badgeColor: 'bg-emerald-500'
  },
  {
    id: 'feed-2',
    userName: 'Priya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    action: 'started',
    target: 'Biweekly Clash #105',
    targetType: 'contest',
    timestamp: '5 mins ago',
    badgeColor: 'bg-brand-500'
  },
  {
    id: 'feed-3',
    userName: 'Arjun Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    action: 'completed',
    target: 'React Architecture Assessment',
    targetType: 'assessment',
    timestamp: '8 mins ago',
    badgeColor: 'bg-indigo-500'
  },
  {
    id: 'feed-4',
    userName: 'Curriculum Team',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    action: 'published',
    target: 'Course Schedule II',
    targetType: 'problem',
    timestamp: '14 mins ago',
    badgeColor: 'bg-emerald-500'
  },
  {
    id: 'feed-5',
    userName: 'Moderation Bot',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    action: 'flagged',
    target: '5 reports require moderation',
    targetType: 'report',
    timestamp: '20 mins ago',
    badgeColor: 'bg-rose-500'
  }
];
