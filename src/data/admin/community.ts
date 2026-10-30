import { DiscussionPost, NotificationBroadcast, Achievement, StreakConfig } from '../../types/community';

export const mockDiscussions: DiscussionPost[] = [
  {
    id: 'disc-01',
    title: 'Intuitive Graph BFS patterns for FAANG interviews',
    content: 'After interviewing with Meta and Google this season, here is my consolidated mental framework for converting implicit state spaces into graph shortest path BFS problems...',
    author: {
      id: 'usr-101',
      name: 'Aarav Patel',
      username: 'aarav_p',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
    },
    category: 'Interview Experience',
    problemSlug: 'course-schedule-ii',
    upvotes: 184,
    commentsCount: 32,
    isPinned: true,
    status: 'Approved',
    createdAt: '2 days ago'
  },
  {
    id: 'disc-02',
    title: 'How I passed Google L5 with 300 CodeForge problems',
    content: 'Detailed prep guide: do not blindly grind 1000 questions. Focus on patterns: monotonic stacks, topological sort, two pointers, interval trees...',
    author: {
      id: 'usr-102',
      name: 'Ananya Sharma',
      username: 'ananya_codes',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80'
    },
    category: 'Interview Experience',
    upvotes: 420,
    commentsCount: 68,
    isPinned: true,
    status: 'Approved',
    createdAt: '4 days ago'
  },
  {
    id: 'disc-03',
    title: 'Check out this free crypto token giveaway link [SPAM]',
    content: 'Get 500 free tokens by signing up on external domain xyz...',
    author: {
      id: 'usr-107',
      name: 'Lucas Silva',
      username: 'lucas_silva',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80'
    },
    category: 'General',
    upvotes: 0,
    commentsCount: 1,
    isPinned: false,
    status: 'Flagged',
    flagReason: 'Automated spam keyword detector triggered',
    createdAt: '3 hours ago'
  }
];

export const mockNotifications: NotificationBroadcast[] = [
  {
    id: 'notif-01',
    title: 'CodeForge Biweekly Clash #105 starts in 2 hours!',
    message: 'Prepare your workspace and test your compiler environment. 4 problems, 90 minutes. Rated for all users.',
    type: 'Contest',
    audience: 'All Users',
    scheduleTime: '2025-04-12T12:30:00Z',
    status: 'Sent',
    sentCount: 94200,
    createdBy: 'Priya Sharma',
    createdAt: '2025-04-10'
  },
  {
    id: 'notif-02',
    title: 'Scheduled Maintenance: Worker Cluster Upgrade',
    message: 'Code execution sandboxes will undergo a rolling kernel patch on Sunday from 02:00 to 03:00 UTC.',
    type: 'Maintenance',
    audience: 'All Users',
    scheduleTime: '2025-04-14T02:00:00Z',
    status: 'Scheduled',
    sentCount: 0,
    createdBy: 'Shahrukh Khan',
    createdAt: '2025-04-11'
  }
];

export const mockAchievements: Achievement[] = [
  { id: 'ach-1', name: 'Centurion Coder', description: 'Solve 100 problems across any difficulty', icon: 'Award', requirement: '100 Problems Solved', xpReward: 500, category: 'Solving', unlockedCount: 14200, status: 'Active' },
  { id: 'ach-2', name: 'Grandmaster Solver', description: 'Solve 500 algorithmic challenges', icon: 'Crown', requirement: '500 Problems Solved', xpReward: 2500, category: 'Solving', unlockedCount: 1850, status: 'Active' },
  { id: 'ach-3', name: 'Iron Will (30 Days)', description: 'Maintain a 30-day continuous problem-solving streak', icon: 'Flame', requirement: '30 Day Streak', xpReward: 1000, category: 'Streak', unlockedCount: 6420, status: 'Active' },
  { id: 'ach-4', name: 'Century Streak (100 Days)', description: 'Keep the flame alive for 100 consecutive days', icon: 'Zap', requirement: '100 Day Streak', xpReward: 5000, category: 'Streak', unlockedCount: 920, status: 'Active' },
  { id: 'ach-5', name: 'Contest Warrior', description: 'Participate in at least 10 official rated contests', icon: 'Trophy', requirement: '10 Contests Participated', xpReward: 1200, category: 'Contest', unlockedCount: 4120, status: 'Active' },
  { id: 'ach-6', name: 'Top 100 Leaderboard', description: 'Reach the top 100 global leaderboard rank', icon: 'ShieldAlert', requirement: 'Global Rank <= 100', xpReward: 10000, category: 'Mastery', unlockedCount: 100, status: 'Active' },
];

export const mockStreakConfig: StreakConfig = {
  dailyGoalProblems: 1,
  streakCalculationHours: 24,
  graceDaysPerMonth: 2,
  xpPerProblem: 25,
  bonusMultiplierWeekend: 1.5,
  milestones: [
    { days: 7, rewardXp: 150, badgeName: '7-Day Fire Starter' },
    { days: 30, rewardXp: 1000, badgeName: 'Monthly Flame' },
    { days: 100, rewardXp: 5000, badgeName: 'Centurion Streak' },
    { days: 365, rewardXp: 20000, badgeName: '365 Legend' },
  ]
};
