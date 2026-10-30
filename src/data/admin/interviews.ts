import { AIInterviewQuestion, InterviewTemplate, InterviewSession } from '../../types/interview';

export const mockAIQuestions: AIInterviewQuestion[] = [
  {
    id: 'aiq-01',
    title: 'Explain Database Indexing & B-Tree Structure',
    category: 'Technical',
    difficulty: 'Senior',
    technology: 'Databases / PostgreSQL',
    expectedSkills: ['B-Trees', 'Query Planner', 'Clustered vs Non-Clustered', 'Cardinality'],
    evaluationCriteria: [
      'Candidate correctly explains logarithmic search tree properties',
      'Understands how composite indexes work (leftmost prefix rule)',
      'Identifies write penalty trade-offs on high-ingestion tables'
    ],
    followUpQuestions: [
      'How does PostgreSQL handle VACUUM and dead index tuples?',
      'When would you prefer a Hash index or BRIN index over a standard B-Tree?'
    ],
    rubricScoreMax: 20
  },
  {
    id: 'aiq-02',
    title: 'Design a Distributed Rate Limiter',
    category: 'System Design',
    difficulty: 'Staff',
    technology: 'Distributed Systems / Redis',
    expectedSkills: ['Token Bucket', 'Leaky Bucket', 'Sliding Window Counter', 'Redis Lua Scripts'],
    evaluationCriteria: [
      'Clarifies throughput requirements and concurrency models',
      'Recognizes race conditions with standard GET/SET in Redis',
      'Proposes sliding window log vs sliding window counter trade-offs'
    ],
    followUpQuestions: [
      'How do you handle multi-region active-active replication synchronization?',
      'What happens if the Redis cluster experiences network partitions?'
    ],
    rubricScoreMax: 25
  },
  {
    id: 'aiq-03',
    title: 'Resolving Team Disagreements Under Tight Deadlines',
    category: 'Behavioral',
    difficulty: 'Mid',
    technology: 'Leadership / Communication',
    expectedSkills: ['Conflict Resolution', 'Data-driven Decisions', 'Empathy', 'STAR method'],
    evaluationCriteria: [
      'Uses structured STAR framework (Situation, Task, Action, Result)',
      'Shows willingness to disagree and commit once direction is finalized'
    ],
    followUpQuestions: [
      'What was the long-term impact on the team relationship after the project shipped?'
    ],
    rubricScoreMax: 15
  },
  {
    id: 'aiq-04',
    title: 'React Fiber Architecture & Concurrent Mode',
    category: 'Technical',
    difficulty: 'Senior',
    technology: 'React',
    expectedSkills: ['Reconciliation', 'Time Slicing', 'Prioritized Work', 'useTransition'],
    evaluationCriteria: [
      'Explains difference between stack reconciler and linked-list fiber tree',
      'Explains how high-priority user interactions interrupt background renders'
    ],
    followUpQuestions: [
      'What are the memory implications of keeping previous fiber work in progress?'
    ],
    rubricScoreMax: 20
  }
];

export const mockInterviewTemplates: InterviewTemplate[] = [
  {
    id: 'itpl-01',
    title: 'Senior Frontend Engineer (React/TS)',
    type: 'Frontend',
    durationMinutes: 60,
    difficulty: 'Hard',
    targetRole: 'Senior Frontend Engineer',
    skills: ['React 18', 'TypeScript', 'Web Vitals', 'Architecture', 'CSS Performance'],
    questionCount: 4,
    evaluationCriteria: [
      'Deep architectural intuition',
      'DOM rendering pipeline knowledge',
      'Modular state management design'
    ],
    systemPrompt: `You are an expert Senior Frontend Interviewer at a premier technology company. Evaluate the candidate with challenging follow-up questions. Push for technical depth, trade-offs, and browser performance realities. Avoid generic textbook answers.`,
    interviewRules: [
      'Conduct a 5-minute technical warm-up.',
      'Spend 35 minutes on architecture and live code design.',
      'Leave 10 minutes for performance edge cases.'
    ],
    followUpRules: [
      'If the candidate answers correctly, probe edge cases with concurrency and memory leaks.',
      'If the candidate struggles, provide one minimal hint and adjust scoring.'
    ],
    activeSessions: 14,
    totalCompleted: 182
  },
  {
    id: 'itpl-02',
    title: 'Distributed Backend Engineer (Go/Microservices)',
    type: 'Backend',
    durationMinutes: 60,
    difficulty: 'Hard',
    targetRole: 'Senior Backend Engineer',
    skills: ['Go', 'gRPC', 'Distributed Systems', 'Kafka', 'PostgreSQL'],
    questionCount: 4,
    evaluationCriteria: [
      'Idempotency and distributed transaction handling',
      'Concurrency patterns (goroutines, channels, mutexes)',
      'Database isolation levels'
    ],
    systemPrompt: `You are a Principal Backend Architect conducting a high-stakes mock interview. Focus on failure modes, network partitions, split-brain mitigation, and high throughput.`,
    interviewRules: [
      'Focus on system resiliency and fault tolerance.'
    ],
    followUpRules: [
      'Ask what breaks when downstream services latency spikes 10x.'
    ],
    activeSessions: 8,
    totalCompleted: 140
  },
  {
    id: 'itpl-03',
    title: 'Large Scale System Design',
    type: 'System Design',
    durationMinutes: 75,
    difficulty: 'Hard',
    targetRole: 'Staff / Principal Engineer',
    skills: ['Scalability', 'CAP Theorem', 'Load Balancing', 'Sharding', 'Cache Hierarchies'],
    questionCount: 2,
    evaluationCriteria: [
      'Clear requirements gathering',
      'Calculations of scale (QPS, storage, bandwidth)',
      'High-level architecture block diagram'
    ],
    systemPrompt: `You are a Principal Engineer interviewing a candidate for a Staff role. Require back-of-the-envelope calculations before high level designs.`,
    interviewRules: [
      'Evaluate trade-offs between consistency and availability.'
    ],
    followUpRules: [
      'Inject node failure scenarios halfway through design.'
    ],
    activeSessions: 22,
    totalCompleted: 310
  }
];

export const mockInterviewSessions: InterviewSession[] = [
  {
    id: 'ses-901',
    candidateName: 'Aarav Patel',
    candidateEmail: 'aarav.patel@gmail.com',
    templateTitle: 'Senior Frontend Engineer (React/TS)',
    type: 'Frontend',
    status: 'Completed',
    score: 92,
    durationMinutes: 58,
    startedAt: 'Yesterday 14:00',
    completedAt: 'Yesterday 14:58',
    summaryFeedback: 'Exceptional depth in React Fiber internals and memory profiling. Demonstrated outstanding knowledge of paint cycles and bundle splitting.'
  },
  {
    id: 'ses-902',
    candidateName: 'David Miller',
    candidateEmail: 'david.miller@techcorp.com',
    templateTitle: 'Large Scale System Design',
    type: 'System Design',
    status: 'In Progress',
    durationMinutes: 32,
    startedAt: '32 mins ago'
  },
  {
    id: 'ses-903',
    candidateName: 'Sophia Zhang',
    candidateEmail: 'sophia.zhang@berkeley.edu',
    templateTitle: 'Distributed Backend Engineer (Go/Microservices)',
    type: 'Backend',
    status: 'Completed',
    score: 88,
    durationMinutes: 62,
    startedAt: '2 days ago',
    completedAt: '2 days ago',
    summaryFeedback: 'Strong grasp of gRPC streaming and distributed tracing. Suggested adding dead letter queues for message ingestion.'
  }
];
