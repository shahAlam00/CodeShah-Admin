export type QuestionType = 'mcq' | 'multiple_select' | 'coding' | 'true_false';
export type AssessmentDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type AssessmentStatus = 'Active' | 'Draft' | 'Archived';

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  title: string;
  question: string;
  options?: string[];
  correctAnswers: (string | number)[];
  explanation: string;
  difficulty: AssessmentDifficulty;
  topic: string;
  marks: number;
  starterCode?: string;
  solutionSnippet?: string;
}

export interface Assessment {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  difficulty: AssessmentDifficulty;
  status: AssessmentStatus;
  attemptsCount: number;
  averageScore: number;
  questions: AssessmentQuestion[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}
