export type ContestStatus = 'Draft' | 'Upcoming' | 'Live' | 'Completed';

export interface ContestProblem {
  id: string;
  problemId: string;
  title: string;
  points: number;
  order: number;
}

export interface ContestRule {
  id: string;
  title: string;
  description: string;
}

export interface Contest {
  id: string;
  title: string;
  slug: string;
  description: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: ContestStatus;
  participantsCount: number;
  problems: ContestProblem[];
  rules: string[];
  bannerUrl?: string;
  isRated: boolean;
  prizePool?: string;
  createdBy: string;
  createdAt: string;
}
