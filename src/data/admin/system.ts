import { ServiceHealth, ExecutionWorker, QueueJob, SystemErrorLog } from '../../types/system';

export const mockServicesHealth: ServiceHealth[] = [
  {
    id: 'srv-api',
    name: 'Core REST / GraphQL API',
    status: 'Operational',
    latencyMs: 24,
    uptimePercent: 99.98,
    lastChecked: '5s ago',
    details: 'Kubernetes deployment: 12 pods healthy across 3 AZs'
  },
  {
    id: 'srv-db',
    name: 'Primary PostgreSQL Database',
    status: 'Operational',
    latencyMs: 4,
    uptimePercent: 99.99,
    lastChecked: '8s ago',
    details: 'Master + 2 read replicas synchronized. Connection pool 42/100'
  },
  {
    id: 'srv-redis',
    name: 'Redis Cluster (Cache & Sessions)',
    status: 'Operational',
    latencyMs: 1.2,
    uptimePercent: 100.0,
    lastChecked: '2s ago',
    details: 'Memory used: 4.8 GB / 16 GB (Hit ratio 96.4%)'
  },
  {
    id: 'srv-queue',
    name: 'Submission Queue (RabbitMQ)',
    status: 'Operational',
    latencyMs: 8,
    uptimePercent: 99.95,
    lastChecked: '3s ago',
    details: 'Queue depth: 3 jobs waiting. Ingestion rate: 142 req/min'
  },
  {
    id: 'srv-workers',
    name: 'Code Execution Workers (gVisor Sandboxes)',
    status: 'Degraded',
    latencyMs: 145,
    uptimePercent: 98.8,
    lastChecked: '1s ago',
    details: '8 of 10 workers operational. Worker #4 returned Docker daemon timeout'
  },
  {
    id: 'srv-ws',
    name: 'WebSocket Live Telemetry Server',
    status: 'Operational',
    latencyMs: 14,
    uptimePercent: 99.94,
    lastChecked: '4s ago',
    details: 'Active socket connections: 3,410'
  }
];

export const mockExecutionWorkers: ExecutionWorker[] = [
  {
    id: 'worker-01',
    name: 'Worker Node #1 (Sandbox-US-East)',
    nodeIp: '10.0.4.10',
    status: 'Running',
    currentSubmissionId: 'sub-89343',
    currentLanguage: 'Python 3.11',
    cpuUsagePercent: 43,
    memoryUsagePercent: 51,
    tasksCompleted: 4580,
    uptimeHours: 342,
    activeContainerCount: 4
  },
  {
    id: 'worker-02',
    name: 'Worker Node #2 (Sandbox-US-East)',
    nodeIp: '10.0.4.11',
    status: 'Idle',
    cpuUsagePercent: 8,
    memoryUsagePercent: 24,
    tasksCompleted: 4210,
    uptimeHours: 342,
    activeContainerCount: 0
  },
  {
    id: 'worker-03',
    name: 'Worker Node #3 (Sandbox-US-East)',
    nodeIp: '10.0.4.12',
    status: 'Running',
    currentSubmissionId: 'sub-89345',
    currentLanguage: 'C++ 20 (GCC)',
    cpuUsagePercent: 78,
    memoryUsagePercent: 64,
    tasksCompleted: 5120,
    uptimeHours: 290,
    activeContainerCount: 5
  },
  {
    id: 'worker-04',
    name: 'Worker Node #4 (Sandbox-US-East)',
    nodeIp: '10.0.4.13',
    status: 'Error',
    cpuUsagePercent: 99,
    memoryUsagePercent: 94,
    tasksCompleted: 3890,
    uptimeHours: 112,
    activeContainerCount: 1
  },
  {
    id: 'worker-05',
    name: 'Worker Node #5 (Sandbox-EU-West)',
    nodeIp: '10.0.5.10',
    status: 'Running',
    currentSubmissionId: 'sub-89346',
    currentLanguage: 'Java 21',
    cpuUsagePercent: 35,
    memoryUsagePercent: 48,
    tasksCompleted: 3410,
    uptimeHours: 198,
    activeContainerCount: 3
  },
  {
    id: 'worker-06',
    name: 'Worker Node #6 (Sandbox-EU-West)',
    nodeIp: '10.0.5.11',
    status: 'Idle',
    cpuUsagePercent: 5,
    memoryUsagePercent: 22,
    tasksCompleted: 3120,
    uptimeHours: 198,
    activeContainerCount: 0
  },
  {
    id: 'worker-07',
    name: 'Worker Node #7 (Sandbox-AP-South)',
    nodeIp: '10.0.6.10',
    status: 'Running',
    currentSubmissionId: 'sub-89347',
    currentLanguage: 'TypeScript',
    cpuUsagePercent: 52,
    memoryUsagePercent: 42,
    tasksCompleted: 6200,
    uptimeHours: 410,
    activeContainerCount: 4
  },
  {
    id: 'worker-08',
    name: 'Worker Node #8 (Sandbox-AP-South)',
    nodeIp: '10.0.6.11',
    status: 'Running',
    currentSubmissionId: 'sub-89348',
    currentLanguage: 'Go 1.22',
    cpuUsagePercent: 41,
    memoryUsagePercent: 39,
    tasksCompleted: 5900,
    uptimeHours: 410,
    activeContainerCount: 3
  }
];

export const mockQueueJobs: QueueJob[] = [
  {
    id: 'qj-01',
    submissionId: 'sub-89342',
    userId: 'usr-101',
    problemSlug: 'two-sum',
    language: 'TypeScript',
    priority: 'Normal',
    status: 'Waiting',
    enqueuedAt: '4s ago',
    waitDurationMs: 4200
  },
  {
    id: 'qj-02',
    submissionId: 'sub-89343',
    userId: 'usr-103',
    problemSlug: 'course-schedule-ii',
    language: 'Python',
    priority: 'High',
    status: 'Running',
    enqueuedAt: '12s ago',
    waitDurationMs: 1400,
    workerAssigned: 'worker-01'
  },
  {
    id: 'qj-03',
    submissionId: 'sub-89344',
    userId: 'usr-106',
    problemSlug: 'trapping-rain-water',
    language: 'Java',
    priority: 'Normal',
    status: 'Waiting',
    enqueuedAt: '6s ago',
    waitDurationMs: 6100
  },
  {
    id: 'qj-04',
    submissionId: 'sub-89345',
    userId: 'usr-104',
    problemSlug: 'median-of-two-sorted-arrays',
    language: 'C++',
    priority: 'High',
    status: 'Running',
    enqueuedAt: '18s ago',
    waitDurationMs: 800,
    workerAssigned: 'worker-03'
  }
];

export const mockSystemErrors: SystemErrorLog[] = [
  {
    id: 'err-4012',
    service: 'Worker-Node-04 (gVisor)',
    message: 'Container socket connect failed: connection refused after 3 retries',
    stackTrace: 'Error: connect ENOENT /var/run/docker.sock at PipeConnectWrap.afterConnect [as oncomplete] (net.js:1146:16)',
    severity: 'Critical',
    status: 'Open',
    occurrences: 14,
    firstSeen: '25 mins ago',
    lastSeen: '2 mins ago'
  },
  {
    id: 'err-4011',
    service: 'Redis Cluster (Cache)',
    message: 'Cluster slot redirection timeout on key prefix session:token',
    stackTrace: 'RedisClusterError: MOVED 14210 10.0.3.15:6379 after 1000ms max timeout',
    severity: 'Warning',
    status: 'Investigating',
    occurrences: 6,
    firstSeen: '1 hour ago',
    lastSeen: '14 mins ago'
  },
  {
    id: 'err-4010',
    service: 'CodeForge GraphQL Gateway',
    message: 'Upstream microservice timeout on Query.getContestLeaderboard',
    stackTrace: 'GatewayTimeoutError: Downstream leaderboard service exceeded 3000ms SLA',
    severity: 'Warning',
    status: 'Resolved',
    occurrences: 3,
    firstSeen: '3 hours ago',
    lastSeen: '2 hours ago'
  }
];
