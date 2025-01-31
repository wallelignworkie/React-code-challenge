import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "@/page/DashboardPage";
import Homepage from "@/page/Homepage";
import LoginPage from "@/page/LoginPage";
import RegistrationPage from "@/page/RegistrationPage";
import TrackingComponent from "@/components/homepage/TrackingComponent";
import ReportPage from "@/page/ReportPage";
import DashboardUsersPage from "@/page/DashboardUsersPage";
import PackagePage from "@/page/PackagePage";
import AddPackage from "@/page/AddPackage";
import CreateCityPage from "@/page/CreateCityPage";
import CreateAgentAccountPage from "@/page/CreateAgentAccountPage";
import DashboardAgentsPage from "@/page/DashboardAgentsPage";
import IncomingPackages from "@/page/IncomingPackages";
import ProtectedRoute from "./ProtectedRoute";
import AgentDetailPage from "@/page/AgentDetailPage";
import SettingPage from "@/page/SettingPage";

const AppRoute: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route
          path="/search-result/:trackingNumber"
          element={<TrackingComponent />}
        />

        {/* Both Admin and Agent route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
              <DashboardUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packages"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
              <PackagePage />
            </ProtectedRoute>
          }
        />
        {/* add-packages */}
        <Route
          path="/add-packages"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
              <AddPackage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
              <ReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
              <DashboardAgentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-detail/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
              <AgentDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
              <SettingPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/cities"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateCityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-agent"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateAgentAccountPage />
            </ProtectedRoute>
          }
        />

        {/* Agent Routes */}
        <Route
          path="/incoming-packages"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <IncomingPackages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoute;
