import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import { DashboardPage } from "./pages/DashboardPage";

import CompanyPage from "./pages/internal/company/CompanyPage";
import CreateCompanyPage from "./pages/internal/company/CreateCompanyPage";

import { DashboardLayout } from "./layouts/DashboardLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
    return (
        <Routes>

            {/* PUBLIC */}
            <Route
                path="/"
                element={<LoginPage />}
            />

            {/* PROTECTED */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/companies"
                    element={<CompanyPage />}
                />

                <Route
                    path="/companies/create"
                    element={<CreateCompanyPage />}
                />



            </Route>

        </Routes>
    );
}