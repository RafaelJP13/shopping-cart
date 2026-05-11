import { useEffect, useMemo, useState } from "react";
import {
    Search,
    ChevronLeft,
    ChevronRight,
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

    // FETCH USERS
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

    // FILTER
    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            `${user.name} ${user.email} ${user.role}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, users]);

    // PAGINATION
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // LOADING STATE
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
                        Usuários
                    </h1>
                    <p className="text-sm text-gray-500">
                        Gerenciar todos os usuários da plataforma
                    </p>
                </div>

                {/* SEARCH */}
                <div className="relative w-full md:w-80">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar usuários..."
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

            {/* TABLE */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">

                        <thead className="bg-gray-50 border-b">
                            <tr className="text-left text-sm text-gray-500">
                                <th className="px-6 py-4 font-medium">ID</th>
                                <th className="px-6 py-4 font-medium">Nome</th>
                                <th className="px-6 py-4 font-medium">E-mail</th>
                                <th className="px-6 py-4 font-medium">Função</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b last:border-0 hover:bg-gray-50 transition"
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

                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {paginatedUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-10 text-gray-500"
                                    >
                                        Nenhum usuário encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                {/* PAGINATION */}
                <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">

                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-medium">
                            {paginatedUsers.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                            {filteredUsers.length}
                        </span>{" "}
                        users
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
                                hover:bg-gray-100
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
                                hover:bg-gray-100
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