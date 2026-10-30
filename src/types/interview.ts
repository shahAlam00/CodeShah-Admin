export type InterviewType = 
  | 'Frontend'
  | 'Backend'
  | 'Full Stack'
  | 'DSA'
  | 'Behavioral'
  | 'System Design';

export type QuestionCategory = 'Technical' | 'Behavioral' | 'Coding' | 'System Design';

export interface AIInterviewQuestion {
  id: string;
  title: string;
  category: QuestionCategory;
  difficulty: 'Junior' | 'Mid' | 'Senior' | 'Staff';
  technology: string;
  expectedSkills: string[];
  evaluationCriteria: string[];
  followUpQuestions: string[];
  rubricScoreMax: number;
}

export interface InterviewTemplate {
  id: string;
  title: string;
  type: InterviewType;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetRole: string;
  skills: string[];
  questionCount: number;
  evaluationCriteria: string[];
  systemPrompt: string;
  interviewRules: string[];
  followUpRules: string[];
  activeSessions: number;
  totalCompleted: number;
}

export interface InterviewSession {
  id: string;
  candidateName: string;
  candidateEmail: string;
  templateTitle: string;
  type: InterviewType;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  score?: number;
  durationMinutes: number;
  startedAt: string;
  completedAt?: string;
  summaryFeedback?: string;
}
