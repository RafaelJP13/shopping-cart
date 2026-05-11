import { useEffect, useMemo, useState } from "react";
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Eye,
    Plus,
} from "lucide-react";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    companyId: string | null;
    createdAt: string;
    updatedAt: string;
};

const ITEMS_PER_PAGE = 8;

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:3000/users");
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            `${user.name} ${user.email} ${user.role}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, users]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) {
        return (
            <div className="p-6 text-gray-500">
                Loading users...
            </div>
        );
    }

    return (
        <div className="p-6 w-full">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Empresas
                    </h1>
                    <p className="text-sm text-gray-500">
                        Gerenciar todas as empresas da plataforma
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">

                    {/* ADD COMPANY BUTTON */}
                    <button
                        onClick={() => console.log("Add Company")}
                        className="
                            px-4 py-2.5
                            bg-black
                            text-white
                            rounded-xl
                            text-sm
                            hover:bg-gray-800
                            transition
                            whitespace-nowrap
                            flex items-center gap-2
                            cursor-pointer
                        "
                    >
                        <Plus size={16} />
                        Adicionar Empresa
                    </button>

                    {/* SEARCH */}
                    <div className="relative w-full md:w-80">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Buscar Empresas..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="
                    w-full
                    pl-10
                    pr-4
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    outline-none
                    focus:ring-2
                    focus:ring-black/10
                "
                        />
                    </div>

                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

                <table className="w-full min-w-[700px]">

                    <thead className="bg-[#ffac2e]/10 border-b">
                        <tr className="text-left text-sm text-gray-600">
                            <th className="px-6 py-4 font-medium">ID</th>
                            <th className="px-6 py-4 font-medium">Nome</th>
                            <th className="px-6 py-4 font-medium">E-mail</th>
                            <th className="px-6 py-4 font-medium">Função</th>
                            <th className="px-6 py-4 font-medium">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b last:border-0 hover:bg-[#ffac2e]/5 transition"
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    #{user.id.slice(0, 6)}
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {user.name}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {user.email}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#ffac2e]/20 text-[#c77700]">
                                        {user.role}
                                    </span>
                                </td>

                                {/* ACTIONS */}
                                <td className="px-6 py-4">
                                    <button
                                        className="
                                            flex items-center gap-2
                                            px-3 py-1.5
                                            rounded-lg
                                            text-sm
                                            font-medium
                                            text-[#ffac2e]
                                            hover:bg-[#ffac2e]/10
                                            transition
                                            cursor-pointer
                                        "
                                    >
                                        <Eye size={16} />
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {paginatedUsers.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-10 text-gray-500"
                                >
                                    Nenhuma empresa encontrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* PAGINATION */}
                <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">

                    <p className="text-sm text-gray-500">
                        Mostrando{" "}
                        <span className="font-medium">
                            {paginatedUsers.length}
                        </span>{" "}
                        de{" "}
                        <span className="font-medium">
                            {filteredUsers.length}
                        </span>
                    </p>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                )
                            }
                            disabled={currentPage === 1}
                            className="
                                w-9 h-9
                                rounded-lg
                                border
                                flex items-center justify-center
                                disabled:opacity-40
                                hover:bg-[#ffac2e]/10
                            "
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="text-sm font-medium px-2">
                            {currentPage} / {totalPages || 1}
                        </div>

                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="
                                w-9 h-9
                                rounded-lg
                                border
                                flex items-center justify-center
                                disabled:opacity-40
                                hover:bg-[#ffac2e]/10
                            "
                        >
                            <ChevronRight size={18} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}