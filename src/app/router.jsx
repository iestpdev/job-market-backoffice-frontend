import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "../modules/shared/utils/authUtils";
import Layout from "../modules/shared/layout/Layout";
import { HomePage } from "../modules/home/pages/Home";
import LoginPage from "../modules/auth/pages/Login/Login";
import StudentListPage from "../modules/students/pages/StudentList";

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/" /> : children;
};

const NotFoundPage = () => <h1>404 - Página no encontrada</h1>;

const router = createBrowserRouter([
    { path: "*", element: <NotFoundPage /> },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout>
                    <HomePage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/students",
        element: (
            <ProtectedRoute>
                <Layout>
                    <StudentListPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
]);

export default router;
