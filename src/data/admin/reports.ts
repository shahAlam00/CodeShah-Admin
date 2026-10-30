import { ReportItem } from '../../types/community';

export const mockReports: ReportItem[] = [
  {
    id: 'rep-001',
    category: 'Discussion Report',
    title: 'Offensive language in Two Sum editorial comments',
    description: 'User repeatedly harassed other learners who asked basic questions about hash table collisions.',
    reportedBy: { id: 'usr-103', name: 'David Miller', username: 'dmiller_dev' },
    reportedTarget: { type: 'comment', id: 'cmt-9921', name: 'Comment #9921 on Two Sum' },
    reason: 'Hate speech & harassment',
    status: 'Open',
    priority: 'High',
    adminNotes: ['Reviewing user post history for prior infractions.'],
    assignedTo: 'Rahul Verma',
    createdAt: '45 mins ago',
    updatedAt: '10 mins ago'
  },
  {
    id: 'rep-002',
    category: 'User Report',
    title: 'Suspicious bot submission pattern during Weekly Contest #104',
    description: 'Submissions for 4 hard problems arrived within 18 seconds of each other with identical AST tokens to public GitHub repo.',
    reportedBy: { id: 'usr-102', name: 'Ananya Sharma', username: 'ananya_codes' },
    reportedTarget: { type: 'user', id: 'usr-107', name: 'Lucas Silva (lucas_silva)' },
    reason: 'Plagiarism & automated bot exploitation',
    status: 'Investigating',
    priority: 'Urgent',
    adminNotes: ['AST diff confirmed 99.4% match with leaked LeetCode solution repo.', 'Account temporarily suspended.'],
    assignedTo: 'Rahul Verma',
    createdAt: '2 hours ago',
    updatedAt: '1 hour ago'
  },
  {
    id: 'rep-003',
    category: 'Problem Report',
    title: 'Incorrect expected output for Test Case #4 on Course Schedule II',
    description: 'Test case assumes cyclic graph is valid topological sort when prerequisite pair is self-referential.',
    reportedBy: { id: 'usr-101', name: 'Aarav Patel', username: 'aarav_p' },
    reportedTarget: { type: 'problem', id: 'prob-004', name: 'Course Schedule II' },
    reason: 'Wrong Test Case Data',
    status: 'Open',
    priority: 'Medium',
    adminNotes: ['Forwarded to Content Admin Priya Sharma for verification.'],
    assignedTo: 'Priya Sharma',
    createdAt: '5 hours ago',
    updatedAt: '3 hours ago'
  },
  {
    id: 'rep-004',
    category: 'Bug Report',
    title: 'Monaco Editor cursor jump on Firefox 124',
    description: 'Typing curly braces causes cursor to lose focus when vim keybinding mode is active.',
    reportedBy: { id: 'usr-104', name: 'Sophia Zhang', username: 'sophia_z' },
    reportedTarget: { type: 'submission', id: 'sub-ui', name: 'Frontend Monaco Component' },
    reason: 'UI / Editor Bug',
    status: 'Resolved',
    priority: 'Low',
    adminNotes: ['Monaco editor updated to v0.46 in release 2.4.1.'],
    assignedTo: 'Shahrukh Khan',
    createdAt: '1 day ago',
    updatedAt: '4 hours ago'
  }
];
