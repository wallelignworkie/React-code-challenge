import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AgentRegistration from "@/components/agent/AgentRegistration";
import AdminAgentDashboardPage from "@/page/AdminAgentDashboardPage";
import AdminDashboardPage from "@/page/AdminDashboardPage";
import AdminPackagePage from "@/page/AdminPackagePage";
import AdminUsersPage from "@/page/AdminUsersPage";
import AgentAddPackage from "@/page/AgentAddPackage";
import AgentManagePackagePage from "@/page/AgentManagePackagePage";
import Homepage from "@/page/Homepage";
import LoginPage from "@/page/LoginPage";
import RegistrationPage from "@/page/RegistrationPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import AgentDashboardPage from "@/page/AgentDashboardPage";
import AdminCreateAgentAccountPage from "@/page/AdminCreateAgentAccountPage";
import AgentDashboardUsersPage from "@/page/AgentDashboardUsersPage";
import TrackingComponent from "@/components/homepage/TrackingComponent";
import ReportPage from "@/page/ReportPage";
import AdminCreateCityPage from "@/page/AdminCreateCityPage";

const AppRoute: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />

        <Route path="/agent-registration" element={<AgentRegistration />} />
        <Route path="/add-package" element={<AgentAddPackage />} />
        <Route path="/manage-package" element={<AgentManagePackagePage />} />
        {/* <Route path="/agent-dashboard" element={<AgentDashboardPage />} /> */}
        <Route path="/agent-users" element={<AgentDashboardUsersPage />} />
        <Route
          path="/search-result/:trackingNumber"
          element={<TrackingComponent />}
        />

        <Route
          path="//agent-dashboard"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentDashboardPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/agent-dashboard" element={<AgentDashboardPage />} /> */}
        {/* Agent Routes */}
        {/* <Route
          path="/agent-registration"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-package"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentAddPackage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-package"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentManagePackagePage />
            </ProtectedRoute>
          }
        /> */}

        {/* Admin Routes */}
        <Route
          path="/admin-package"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminPackagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-agents"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminAgentDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-agent"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminCreateAgentAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-city"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminCreateCityPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoute;
