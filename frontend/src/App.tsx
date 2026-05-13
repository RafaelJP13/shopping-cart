import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import { DashboardPage } from "./pages/DashboardPage";

import CompanyPage from "./pages/internal/company/CompanyPage";
import CreateCompanyPage from "./pages/internal/company/CreateCompanyPage";
import UpdateCompanyPage from "./pages/internal/company/UpdateCompanyPage";

import { DashboardLayout } from "./layouts/DashboardLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import CompanyDetailsPage from "./pages/internal/company/CompanyDetails";

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
                <Route
                    path="/companies/:id"
                    element={<CompanyDetailsPage />}
                />
                <Route
                    path="/companies/update/:id"
                    element={<UpdateCompanyPage />}
                />

            </Route>

        </Routes>
    );
}