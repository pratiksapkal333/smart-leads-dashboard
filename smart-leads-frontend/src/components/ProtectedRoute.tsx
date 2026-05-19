import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");

    if (!isAuthenticated && !token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}