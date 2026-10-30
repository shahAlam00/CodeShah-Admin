export type UserStatus = 'active' | 'suspended' | 'banned' | 'pending';
export type UserRole = 'User' | 'Premium' | 'Mentor' | 'Admin';

export interface UserStats {
  problemsSolved: number;
  totalSubmissions: number;
  acceptanceRate: number;
  contestRating: number;
  globalRank: number;
  currentStreak: number;
  longestStreak: number;
  reputation: number;
  assessmentsCompleted: number;
  mockInterviews: number;
}

export interface UserActivityItem {
  id: string;
  type: 'solve' | 'contest' | 'assessment' | 'interview' | 'post' | 'report';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
  score?: number;
}

export interface PlatformUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  stats: UserStats;
  location: string;
  githubUrl?: string;
  linkedinUrl?: string;
  bio?: string;
}
