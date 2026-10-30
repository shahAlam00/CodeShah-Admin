export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  isLocked: boolean;
  problemIds: string[];
  articleCount: number;
  quizCount: number;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  order: number;
  topics: RoadmapTopic[];
}

export interface Roadmap {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Published' | 'Draft' | 'Archived';
  enrolledUsers: number;
  completionRate: number;
  totalHours: number;
  phases: RoadmapPhase[];
  updatedAt: string;
}
