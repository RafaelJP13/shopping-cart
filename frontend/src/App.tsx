import { useState } from "react";

import { CatalogPage } from "./pages/CatalogPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

import { CartProvider } from "./context/CartContext";
import { DashboardLayout } from "./layouts/DashboardLayout";

type Page = "Login" | "Dashboard" | "Produtos" | "Pedidos";

export default function App() {
    const [page, setPage] = useState<Page>("Login");

    if (page === "Login") {
        return <LoginPage onLogin={() => setPage("Dashboard")} />;
    }

    return (
        <CartProvider>
            <DashboardLayout page={page} setPage={setPage}>
                {page === "Dashboard" && <DashboardPage />}
                {page === "Produtos" && <CatalogPage />}
                {page === "Pedidos" && <OrdersPage />}
            </DashboardLayout>
        </CartProvider>
    );
}