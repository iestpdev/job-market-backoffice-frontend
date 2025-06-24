import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "../modules/shared/utils/authUtils";
import Layout from "../modules/shared/layout/Layout";
import { HomePage } from "../modules/home/pages/Home";
import LoginPage from "../modules/auth/pages/Login/Login";

import StudentListPage from "../modules/students/pages/StudentList/StudentList";
import StudentCreatePage from "../modules/students/pages/StudentCreate/StudentCreate";
import StudentEditPage from "../modules/students/pages/StudentEdit/StudentEdit";
import StudentViewPage from "../modules/students/pages/StudentView/StudentView";

import CompanyListPage from "../modules/companies/pages/CompanyList/CompanyList";
import CompanyCreatePage from "../modules/companies/pages/CompanyCreate/CompanyCreate";
import CompanyViewPage from "../modules/companies/pages/CompanyView/CompanyView";
import CompanyEditPage from "../modules/companies/pages/CompanyEdit/CompanyEdit";

import OfferListPage from "../modules/offers/pages/OfferList/OfferList";

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
    {
        path: "/students/create",
        element: (
            <ProtectedRoute>
                <Layout>
                    <StudentCreatePage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/students/edit/:id",
        element: (
            <ProtectedRoute>
                <Layout>
                    <StudentEditPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/students/view/:id",
        element: (
            <ProtectedRoute>
                <Layout>
                    <StudentViewPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/companies",
        element: (
            <ProtectedRoute>
                <Layout>
                    <CompanyListPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/companies/create",
        element: (
            <ProtectedRoute>
                <Layout>
                    <CompanyCreatePage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/companies/view/:id",
        element: (
            <ProtectedRoute>
                <Layout>
                    <CompanyViewPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/companies/edit/:id",
        element: (
            <ProtectedRoute>
                <Layout>
                    <CompanyEditPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/offers",
        element: (
            <ProtectedRoute>
                <Layout>
                    <OfferListPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
]);

export default router;
