export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type ProblemStatus = 'Draft' | 'Review' | 'Published' | 'Archived';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isSample: boolean;
  weight: number;
  explanation?: string;
}

export interface SolutionCode {
  language: 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go';
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ProblemExample {
  id: string;
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  category: string;
  topics: string[];
  companies: string[];
  description: string; // Markdown supported
  constraints: string[];
  examples: ProblemExample[];
  hints: string[];
  followUp?: string;
  testCases: TestCase[];
  solutions: SolutionCode[];
  totalSubmissions: number;
  acceptedSubmissions: number;
  acceptanceRate: number;
  likes: number;
  dislikes: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}
