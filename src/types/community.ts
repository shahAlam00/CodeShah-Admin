export type ReportCategory = 
  | 'User Report'
  | 'Problem Report'
  | 'Discussion Report'
  | 'Bug Report'
  | 'Abuse Report';

export type ReportStatus = 'Open' | 'Investigating' | 'Resolved' | 'Rejected';

export interface ReportItem {
  id: string;
  category: ReportCategory;
  title: string;
  description: string;
  reportedBy: {
    id: string;
    name: string;
    username: string;
  };
  reportedTarget: {
    type: 'user' | 'problem' | 'comment' | 'submission';
    id: string;
    name: string;
  };
  reason: string;
  status: ReportStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  adminNotes: string[];
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  category: 'General' | 'Interview Experience' | 'Solutions' | 'Feedback' | 'Comp';
  problemSlug?: string;
  upvotes: number;
  commentsCount: number;
  isPinned: boolean;
  status: 'Approved' | 'Flagged' | 'Hidden' | 'Removed';
  flagReason?: string;
  createdAt: string;
}

export interface NotificationBroadcast {
  id: string;
  title: string;
  message: string;
  type: 'System' | 'Contest' | 'Achievement' | 'Maintenance' | 'Announcement';
  audience: 'All Users' | 'Active Users' | 'Premium Users' | 'Contest Participants' | 'Specific Users';
  scheduleTime: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  sentCount: number;
  createdBy: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  xpReward: number;
  category: 'Solving' | 'Streak' | 'Contest' | 'Community' | 'Mastery';
  unlockedCount: number;
  status: 'Active' | 'Draft' | 'Deprecated';
}

export interface StreakConfig {
  dailyGoalProblems: number;
  streakCalculationHours: number;
  graceDaysPerMonth: number;
  xpPerProblem: number;
  bonusMultiplierWeekend: number;
  milestones: {
    days: number;
    rewardXp: number;
    badgeName: string;
  }[];
}
