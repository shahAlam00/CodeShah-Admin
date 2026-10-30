export type SubmissionStatus = 
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'
  | 'Runtime Error'
  | 'Compilation Error';

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  runtimeMs: number;
  memoryMb: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
}

export interface Submission {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  problemId: string;
  problemTitle: string;
  language: string;
  status: SubmissionStatus;
  runtime: number; // in ms
  memory: number; // in MB
  code: string;
  testCaseResults: TestCaseResult[];
  executionLogs: string;
  submittedAt: string;
}
