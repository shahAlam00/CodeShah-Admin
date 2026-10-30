import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';

// Auth
import { AdminLoginPage } from '../pages/admin/auth/AdminLoginPage';

// Dashboard & Analytics
import { AdminDashboardPage } from '../pages/admin/dashboard/AdminDashboardPage';
import { AnalyticsDashboardPage } from '../pages/admin/analytics/AnalyticsDashboardPage';

// Users
import { UsersListPage } from '../pages/admin/users/UsersListPage';
import { UserDetailPage } from '../pages/admin/users/UserDetailPage';

// Security & RBAC
import { AdminsPage } from '../pages/admin/security/AdminsPage';
import { RolesPage } from '../pages/admin/security/RolesPage';
import { PermissionsPage } from '../pages/admin/security/PermissionsPage';
import { AuditLogsPage } from '../pages/admin/security/AuditLogsPage';

// Problems
import { ProblemsListPage } from '../pages/admin/problems/ProblemsListPage';
import { ProblemEditorPage } from '../pages/admin/problems/ProblemEditorPage';
import { TestCasesPage } from '../pages/admin/problems/TestCasesPage';
import { SolutionsPage } from '../pages/admin/problems/SolutionsPage';

// Editorials & Official Solutions
import Editorials from '../pages/admin/Editorials';
import OfficialSolutions from '../pages/admin/OfficialSolutions';

// Taxonomy
import { TopicsPage } from '../pages/admin/taxonomy/TopicsPage';
import { CompaniesPage } from '../pages/admin/taxonomy/CompaniesPage';

// Submissions
import { SubmissionsListPage } from '../pages/admin/submissions/SubmissionsListPage';
import { SubmissionDetailPage } from '../pages/admin/submissions/SubmissionDetailPage';

// Contests
import { ContestsListPage } from '../pages/admin/contests/ContestsListPage';
import { ContestBuilderPage } from '../pages/admin/contests/ContestBuilderPage';
import { ContestDetailPage } from '../pages/admin/contests/ContestDetailPage';

// Assessments
import { AssessmentsListPage } from '../pages/admin/assessments/AssessmentsListPage';
import { AssessmentBuilderPage } from '../pages/admin/assessments/AssessmentBuilderPage';

// Interviews
import { InterviewTemplatesPage } from '../pages/admin/interviews/InterviewTemplatesPage';
import { InterviewQuestionsPage } from '../pages/admin/interviews/InterviewQuestionsPage';
import { InterviewSessionsPage } from '../pages/admin/interviews/InterviewSessionsPage';

// Roadmaps
import { RoadmapsListPage } from '../pages/admin/roadmaps/RoadmapsListPage';
import { RoadmapBuilderPage } from '../pages/admin/roadmaps/RoadmapBuilderPage';

// Visualizers
import { VisualizersListPage } from '../pages/admin/visualizers/VisualizersListPage';
import { VisualizerEditorPage } from '../pages/admin/visualizers/VisualizerEditorPage';

// Community & Moderation
import { DiscussionsPage } from '../pages/admin/community/DiscussionsPage';
import { ReportsPage } from '../pages/admin/community/ReportsPage';
import { NotificationsPage } from '../pages/admin/community/NotificationsPage';
import { AchievementsPage } from '../pages/admin/community/AchievementsPage';
import { StreakSettingsPage } from '../pages/admin/community/StreakSettingsPage';

// System & Execution Telemetry
import { SystemHealthPage } from '../pages/admin/system/SystemHealthPage';
import { ExecutionWorkersPage } from '../pages/admin/system/ExecutionWorkersPage';
import { SystemQueuesPage } from '../pages/admin/system/SystemQueuesPage';
import { SystemErrorsPage } from '../pages/admin/system/SystemErrorsPage';

// Settings
import { AdminSettingsPage } from '../pages/admin/settings/AdminSettingsPage';

export const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Authenticated Admin Layout Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Default redirect to Dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />

        {/* Analytics */}
        <Route path="analytics" element={<AnalyticsDashboardPage />} />

        {/* Users */}
        <Route path="users" element={<UsersListPage />} />
        <Route path="users/:id" element={<UserDetailPage />} />

        {/* Security & RBAC */}
        <Route path="admins" element={<AdminsPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
        <Route path="audit-logs" element={<AuditLogsPage />} />

        {/* Problems */}
        <Route path="problems" element={<ProblemsListPage />} />
        <Route path="problems/create" element={<ProblemEditorPage />} />
        <Route path="problems/:id" element={<ProblemEditorPage />} />
        <Route path="problems/:id/edit" element={<ProblemEditorPage />} />
        <Route path="problems/:id/test-cases" element={<TestCasesPage />} />
        <Route path="problems/:id/solutions" element={<SolutionsPage />} />

        {/* Editorials & Official Solutions */}
        <Route path="editorials" element={<Editorials />} />
        <Route path="solutions" element={<OfficialSolutions />} />

        {/* Taxonomy */}
        <Route path="topics" element={<TopicsPage />} />
        <Route path="companies" element={<CompaniesPage />} />

        {/* Submissions */}
        <Route path="submissions" element={<SubmissionsListPage />} />
        <Route path="submissions/:id" element={<SubmissionDetailPage />} />

        {/* Contests */}
        <Route path="contests" element={<ContestsListPage />} />
        <Route path="contests/create" element={<ContestBuilderPage />} />
        <Route path="contests/:id" element={<ContestDetailPage />} />
        <Route path="contests/:id/edit" element={<ContestBuilderPage />} />

        {/* Assessments */}
        <Route path="assessments" element={<AssessmentsListPage />} />
        <Route path="assessments/create" element={<AssessmentBuilderPage />} />
        <Route path="assessments/:id" element={<AssessmentBuilderPage />} />

        {/* Interviews */}
        <Route path="interviews" element={<InterviewTemplatesPage />} />
        <Route path="interviews/questions" element={<InterviewQuestionsPage />} />
        <Route path="interviews/sessions" element={<InterviewSessionsPage />} />

        {/* Roadmaps */}
        <Route path="roadmaps" element={<RoadmapsListPage />} />
        <Route path="roadmaps/create" element={<RoadmapBuilderPage />} />
        <Route path="roadmaps/:id" element={<RoadmapBuilderPage />} />

        {/* Visualizers */}
        <Route path="visualizers" element={<VisualizersListPage />} />
        <Route path="visualizers/create" element={<VisualizerEditorPage />} />

        {/* Community & Moderation */}
        <Route path="discussions" element={<DiscussionsPage />} />
        <Route path="discussions/reported" element={<DiscussionsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="achievements" element={<AchievementsPage />} />

        {/* System & Telemetry */}
        <Route path="system" element={<SystemHealthPage />} />
        <Route path="system/executions" element={<ExecutionWorkersPage />} />
        <Route path="system/queues" element={<SystemQueuesPage />} />
        <Route path="system/errors" element={<SystemErrorsPage />} />

        {/* Settings */}
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="settings/streak" element={<StreakSettingsPage />} />
      </Route>

      {/* Fallback Catch-all: redirect root or unknown to admin */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};
