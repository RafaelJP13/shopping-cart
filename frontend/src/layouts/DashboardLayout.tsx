import { ReactNode, useState } from "react";
import {
    ShoppingBag,
    ClipboardList,
    LayoutDashboard,
    User,
    LogOut,
    Menu,
    X,
} from "lucide-react";

type Page = "Dashboard" | "Produtos" | "Pedidos" | "Login";

interface Props {
    page: Page;
    setPage: (page: Page) => void;
    children: ReactNode;
}

export function DashboardLayout({ page, setPage, children }: Props) {

    const [open, setOpen] = useState(false);

    const user = {
        name: "Rafael",
        email: "rafael@compre-mais.com",
    };

    function handleLogout() {
        localStorage.removeItem("token");
        setPage("Login");
    }

    const navItem = (
        label: Exclude<Page, "Login">,
        icon: ReactNode,
    ) => (
        <button
            onClick={() => {
                setPage(label);
                setOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition w-full text-left ${page === label
                ? "bg-black text-white"
                : "hover:bg-gray-200 text-gray-700"
                }`}
        >
            {icon}
            {label}
        </button>
    );

    return (
        <div className="min-h-screen flex bg-neutral-100">

            {/* MOBILE TOP BAR */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b flex items-center justify-between p-3 z-50">
                <h1 className="font-bold">Compre Mais</h1>
                <button onClick={() => setOpen(true)}>
                    <Menu />
                </button>
            </div>

            {/* SIDENAV */}
            <aside
                className={`
                    fixed md:static top-0 left-0 h-screen w-64 bg-white border-r flex flex-col z-50
                    transition-transform
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >

                {/* HEADER */}
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold">Compre Mais</h1>
                </div>

                {/* NAV */}
                <div className="flex flex-col gap-2 p-3 flex-1">
                    {navItem("Dashboard", <LayoutDashboard size={18} />)}
                    {navItem("Produtos", <ShoppingBag size={18} />)}
                    {navItem("Pedidos", <ClipboardList size={18} />)}
                </div>

                {/* USER */}
                <div className="p-3 border-t space-y-3">

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} />
                        <div className="leading-tight">
                            <p className="font-medium text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-2 py-2 rounded-md w-full"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>

                </div>
            </aside>

            {/* BACKDROP MOBILE */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* MAIN CONTENT (NO GAP, NO PADDING SHIFT) */}
            <main className="flex-1 p-6 pt-16 md:pt-6">
                {children}
            </main>

        </div>
    );
}