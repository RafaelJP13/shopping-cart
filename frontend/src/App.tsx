import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CartProvider } from "./context/CartContext";
import { DashboardLayout } from "./layouts/DashboardLayout";
import UsersPage from "./pages/internal/UsersPage";

type Page = "Login" | "Dashboard" | "Usuários" | "Pedidos";

export default function App() {
    const [page, setPage] = useState<Page>("Login");

    if (page === "Login") {
        return <LoginPage onLogin={() => setPage("Dashboard")} />;
    }

    return (
        <CartProvider>
            <DashboardLayout page={page} setPage={setPage}>
                {page === "Dashboard" && <DashboardPage />}
                {page === "Usuários" && <UsersPage />}
            </DashboardLayout>
        </CartProvider>
    );
}