import { useEffect, useState } from "react";
import {
    ClipboardList,
    LayoutDashboard,
    User,
    LogOut,
    Menu,
} from "lucide-react";

import {
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";

export function DashboardLayout() {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const user = {
        name: "Rafael",
        email: "rafael@compre-mais.com",
    };

    function handleLogout() {
        localStorage.removeItem("token");

        navigate("/");
    }

    // LOCK SCROLL MOBILE
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    const navItem = (
        label: string,
        path: string,
        icon: React.ReactNode
    ) => {
        const active = location.pathname === path;

        return (
            <button
                onClick={() => {
                    navigate(path);
                    setOpen(false);
                }}
                className={`
                    flex items-center gap-3
                    px-3 py-2
                    rounded-md
                    transition
                    w-full
                    text-left
                    cursor-pointer
                    ${active
                        ? "bg-black text-white"
                        : "hover:bg-gray-200 text-gray-700"
                    }
                `}
            >
                {icon}
                {label}
            </button>
        );
    };

    return (
        <div className="min-h-screen flex items-stretch bg-neutral-100 overflow-x-hidden">

            {/* MOBILE TOP BAR */}
            <div
                className="
                    md:hidden
                    fixed
                    top-0
                    left-0
                    right-0
                    h-16
                    bg-white
                    border-b
                    flex
                    items-center
                    justify-between
                    px-4
                    z-50
                "
            >
                <h1 className="font-bold">
                    CompreFlow
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                >
                    <Menu />
                </button>
            </div>

            {/* SIDEBAR */}
            <aside
                className={`
        fixed md:static
        top-0 left-0
        min-h-screen
        w-64
        bg-white
        border
        border-gray-200
        rounded-r-3xl
        shadow-sm
        flex
        flex-col
        z-50
        transition-transform
        duration-300
        m-2
        ${open
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
    `}
            >

                {/* LOGO */}
                <div className="p-4 border-b flex justify-center items-center">
                    <img
                        src="src/assets/logo.png"
                        alt="CompreFlow"
                        className="w-35 h-25 object-contain"
                    />
                </div>

                {/* NAV */}
                <div
                    className="
                        flex flex-col gap-2
                        p-3
                        flex-1
                        overflow-y-auto
                    "
                >
                    {navItem(
                        "Dashboard",
                        "/dashboard",
                        <LayoutDashboard size={18} />
                    )}

                    {navItem(
                        "Empresas",
                        "/companies",
                        <User size={18} />
                    )}

                    {navItem(
                        "Usuários",
                        "/users",
                        <ClipboardList size={18} />
                    )}
                </div>

                {/* USER */}
                <div className="p-3 border-t space-y-3">

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} />

                        <div className="leading-tight">
                            <p className="font-medium text-gray-800">
                                {user.name}
                            </p>

                            <p className="text-xs text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="
                            flex items-center gap-2
                            text-sm
                            text-red-600
                            hover:bg-red-50
                            px-2 py-2
                            rounded-md
                            w-full
                            cursor-pointer
                        "
                    >
                        <LogOut size={16} />
                        Logout
                    </button>

                </div>
            </aside>

            {/* BACKDROP MOBILE */}
            {open && (
                <div
                    className="
                        fixed inset-0
                        bg-black/40
                        md:hidden
                        z-40
                    "
                    onClick={() => setOpen(false)}
                />
            )}

            {/* MAIN CONTENT */}
            <main
                className="
                    flex-1
                    p-6
                    pt-20
                    md:pt-6
                    w-full
                    overflow-x-hidden
                "
            >
                <Outlet />
            </main>

        </div>
    );
}