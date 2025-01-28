import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { role } = useUserStore();
  console.log({ role });

  if (!role) {
    // If no role, redirect to login
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles.includes(role)) {
    // If role is not allowed, redirect to homepage
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
