export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  problemCount: number;
  roadmapCount: number;
  status: 'Active' | 'Draft' | 'Archived';
  category: 'Data Structures' | 'Algorithms' | 'Advanced' | 'System';
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  website: string;
  problemCount: number;
  assessmentCount: number;
  interviewQuestionCount: number;
  tier: 'FAANG/MAMAA' | 'Tier 1' | 'Unicorn' | 'Enterprise';
  status: 'Active' | 'Draft';
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
}
