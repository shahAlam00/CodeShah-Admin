export type ServiceStatus = 'Operational' | 'Degraded' | 'Critical' | 'Maintenance';

export interface ServiceHealth {
  id: string;
  name: string;
  status: ServiceStatus;
  latencyMs: number;
  uptimePercent: number;
  lastChecked: string;
  details: string;
  icon?: string;
}

export type WorkerStatus = 'Running' | 'Idle' | 'Busy' | 'Error' | 'Draining';

export interface ExecutionWorker {
  id: string;
  name: string;
  nodeIp: string;
  status: WorkerStatus;
  currentSubmissionId?: string;
  currentLanguage?: string;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  tasksCompleted: number;
  uptimeHours: number;
  activeContainerCount: number;
}

export interface QueueJob {
  id: string;
  submissionId: string;
  userId: string;
  problemSlug: string;
  language: string;
  priority: 'High' | 'Normal' | 'Low';
  status: 'Waiting' | 'Running' | 'Retrying';
  enqueuedAt: string;
  waitDurationMs: number;
  workerAssigned?: string;
}

export interface SystemErrorLog {
  id: string;
  service: string;
  message: string;
  stackTrace?: string;
  severity: 'Info' | 'Warning' | 'Critical';
  status: 'Open' | 'Investigating' | 'Resolved' | 'Ignored';
  occurrences: number;
  firstSeen: string;
  lastSeen: string;
}
