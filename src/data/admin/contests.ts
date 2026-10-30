import { Contest } from '../../types/contest';

export const mockContests: Contest[] = [
  {
    id: 'cnt-105',
    title: 'CodeForge Biweekly Clash #105',
    slug: 'codeforge-biweekly-clash-105',
    description: 'Solve 4 challenging algorithmic problems in 90 minutes. Rated contest open to all skill tiers.',
    startTime: '2025-04-12T14:30:00Z',
    endTime: '2025-04-12T16:00:00Z',
    durationMinutes: 90,
    status: 'Upcoming',
    participantsCount: 4290,
    isRated: true,
    prizePool: '$1,500 + CodeForge Swag',
    createdBy: 'Priya Sharma',
    createdAt: '2025-04-01',
    problems: [
      { id: 'cp-1', problemId: 'prob-001', title: 'Minimum Cost String Transformation', points: 300, order: 1 },
      { id: 'cp-2', problemId: 'prob-004', title: 'Shortest Cycle in Constrained Graph', points: 500, order: 2 },
      { id: 'cp-3', problemId: 'prob-002', title: 'Optimal LRU Eviction Under Bursts', points: 700, order: 3 },
      { id: 'cp-4', problemId: 'prob-005', title: 'Multi-Dimensional Rain Trapping', points: 1000, order: 4 },
    ],
    rules: [
      'Contest is strictly individual. AI code generation extensions are disabled in the editor during contest mode.',
      'Submissions undergo automated plagiarism checks using AST diffing.',
      'Penalty of 5 minutes added for each incorrect submission prior to final acceptance.'
    ]
  },
  {
    id: 'cnt-104',
    title: 'Weekly Grand Prix #104',
    slug: 'weekly-grand-prix-104',
    description: 'The flagship weekly contest featuring dynamic programming and segment tree puzzles.',
    startTime: '2025-04-05T14:00:00Z',
    endTime: '2025-04-05T15:30:00Z',
    durationMinutes: 90,
    status: 'Completed',
    participantsCount: 8940,
    isRated: true,
    prizePool: '$2,000 Cash Pool',
    createdBy: 'Shahrukh Khan',
    createdAt: '2025-03-20',
    problems: [
      { id: 'cp-11', problemId: 'prob-001', title: 'Bitwise Counting Pairs', points: 250, order: 1 },
      { id: 'cp-12', problemId: 'prob-002', title: 'Weighted Interval Scheduler', points: 500, order: 2 },
      { id: 'cp-13', problemId: 'prob-003', title: 'Kth Smallest Element in Grid Product', points: 750, order: 3 },
      { id: 'cp-14', problemId: 'prob-005', title: 'Tree Decomposition Queries', points: 1000, order: 4 },
    ],
    rules: [
      'Standard ICPC-style scoring with 5-minute incorrect submission penalty.'
    ]
  },
  {
    id: 'cnt-106',
    title: 'FAANG Sprint Challenge (April 2025)',
    slug: 'faang-sprint-challenge-april-2025',
    description: 'High-speed speedrunning contest with real interview questions sourced from Google, Meta, and Amazon.',
    startTime: '2025-04-20T18:00:00Z',
    endTime: '2025-04-20T19:30:00Z',
    durationMinutes: 90,
    status: 'Draft',
    participantsCount: 0,
    isRated: false,
    createdBy: 'Priya Sharma',
    createdAt: '2025-04-08',
    problems: [],
    rules: [
      'Live leaderboard visible to premier hiring partners.'
    ]
  }
];
