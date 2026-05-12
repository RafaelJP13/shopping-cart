import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import { DashboardPage } from "./pages/DashboardPage";

import CompaniesPage from "./pages/internal/company/CompanyPage";
import CreateCompanyPage from "./pages/internal/company/CreateCompanyPage";

import { DashboardLayout } from "./layouts/DashboardLayout";

export default function App() {
    return (
        <Routes>

            {/* PUBLIC */}
            <Route
                path="/"
                element={<LoginPage />}
            />

            {/* PRIVATE LAYOUT */}
            <Route element={<DashboardLayout />}>

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/companies"
                    element={<CompaniesPage />}
                />

                <Route
                    path="/companies/create"
                    element={<CreateCompanyPage />}
                />

            </Route>

        </Routes>
    );
}