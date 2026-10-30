export interface MetricKPI {
  title: string;
  value: string;
  numericValue: number;
  changePercent: number;
  period: string;
  trend: 'up' | 'down';
  sparkline: number[];
}

export const mockDashboardKPIs: Record<string, MetricKPI> = {
  totalUsers: {
    title: 'Total Users',
    value: '128,452',
    numericValue: 128452,
    changePercent: 12.8,
    period: 'vs last month',
    trend: 'up',
    sparkline: [95, 102, 108, 114, 119, 124, 128]
  },
  activeUsers: {
    title: 'Daily Active Users',
    value: '34,810',
    numericValue: 34810,
    changePercent: 8.4,
    period: 'vs yesterday',
    trend: 'up',
    sparkline: [28, 30, 29, 32, 31, 33, 34]
  },
  problems: {
    title: 'Total Problems',
    value: '1,420',
    numericValue: 1420,
    changePercent: 3.2,
    period: 'vs last month',
    trend: 'up',
    sparkline: [1350, 1370, 1390, 1400, 1410, 1415, 1420]
  },
  submissions: {
    title: 'Submissions Today',
    value: '42,910',
    numericValue: 42910,
    changePercent: 18.2,
    period: 'vs yesterday',
    trend: 'up',
    sparkline: [32, 35, 34, 38, 39, 41, 43]
  },
  contests: {
    title: 'Active Contests',
    value: '3',
    numericValue: 3,
    changePercent: 0.0,
    period: 'vs last week',
    trend: 'up',
    sparkline: [2, 3, 2, 4, 3, 3, 3]
  },
  assessments: {
    title: 'Assessments Taken',
    value: '8,420',
    numericValue: 8420,
    changePercent: 14.5,
    period: 'vs last week',
    trend: 'up',
    sparkline: [6.8, 7.1, 7.4, 7.8, 8.0, 8.2, 8.4]
  },
  interviews: {
    title: 'AI Mock Interviews',
    value: '2,940',
    numericValue: 2940,
    changePercent: 24.1,
    period: 'vs last month',
    trend: 'up',
    sparkline: [1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 2.9]
  }
};

export const mockUserGrowthChart = [
  { date: 'Mon', dau: 28400, wau: 74200, mau: 114000 },
  { date: 'Tue', dau: 30100, wau: 76800, mau: 116500 },
  { date: 'Wed', dau: 29800, wau: 78100, mau: 119000 },
  { date: 'Thu', dau: 32400, wau: 80500, mau: 122400 },
  { date: 'Fri', dau: 31900, wau: 81900, mau: 124800 },
  { date: 'Sat', dau: 33800, wau: 83400, mau: 126900 },
  { date: 'Sun', dau: 34810, wau: 85200, mau: 128452 },
];

export const mockSubmissionsOutcomeChart = [
  { name: 'Accepted', value: 58, color: '#10b981' },
  { name: 'Wrong Answer', value: 24, color: '#ef4444' },
  { name: 'Time Limit Exceeded', value: 9, color: '#f59e0b' },
  { name: 'Runtime Error', value: 6, color: '#ec4899' },
  { name: 'Compilation Error', value: 3, color: '#8b5cf6' },
];

export const mockDifficultyDistribution = [
  { name: 'Easy', count: 480, percentage: 33.8, color: '#10b981' },
  { name: 'Medium', count: 720, percentage: 50.7, color: '#f59e0b' },
  { name: 'Hard', count: 220, percentage: 15.5, color: '#ef4444' },
];

export const mockTechnologyUsage = [
  { language: 'Python', percentage: 41.2, count: 17680, color: '#38bdf8' },
  { language: 'JavaScript / TS', percentage: 28.5, count: 12230, color: '#f59e0b' },
  { language: 'Java', percentage: 16.4, count: 7040, color: '#f97316' },
  { language: 'C++', percentage: 10.8, count: 4630, color: '#6366f1' },
  { language: 'Go', percentage: 3.1, count: 1330, color: '#06b6d4' },
];

export const mockCohortRetention = [
  { cohort: 'Mar 01 - Mar 07', users: 3420, w1: 100, w2: 68.4, w3: 54.2, w4: 48.1 },
  { cohort: 'Mar 08 - Mar 14', users: 3890, w1: 100, w2: 71.0, w3: 56.8, w4: 50.4 },
  { cohort: 'Mar 15 - Mar 21', users: 4120, w1: 100, w2: 73.5, w3: 59.1, w4: 52.8 },
  { cohort: 'Mar 22 - Mar 28', users: 4450, w1: 100, w2: 75.2, w3: 61.4, w4: null },
  { cohort: 'Mar 29 - Apr 04', users: 4890, w1: 100, w2: 76.8, w3: null, w4: null },
  { cohort: 'Apr 05 - Apr 11', users: 5120, w1: 100, w2: null, w3: null, w4: null },
];
