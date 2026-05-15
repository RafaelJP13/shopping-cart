import { useEffect, useMemo, useState } from "react";
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Eye,
    Plus,
    Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import fetchWithRefresh from "../../../services/api";

type Company = {
    id: string;

    adminName: string;
    adminEmail: string;
    representante: string;

    fantasyName: string;
    legalName: string;

    cnpj: string;
    cnpj_status: string;

    phone: string;

    cep: string;
    state: string;
    city: string;

    address: string;

    createdAt: string;
    updatedAt: string;
};

const ITEMS_PER_PAGE = 8;

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetchWithRefresh("http://localhost:3000/companies");
                const data = await res.json();
                setCompanies(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const filteredCompanies = useMemo(() => {
        return companies.filter((c) =>
            `${c.fantasyName} ${c.adminName} ${c.cnpj} ${c.city} ${c.state} ${c.cnpj_status}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, companies]);

    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

    const paginatedCompanies = filteredCompanies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) {
        return (
            <div className="p-6 text-gray-500">
                Loading companies...
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

                    <button
                        onClick={() => navigate("/companies/create")}
                        className="
                            px-4 py-2.5
                            bg-black
                            text-white
                            rounded-xl
                            text-sm
                            hover:bg-gray-800
                            transition
                            flex items-center gap-2
                            cursor-pointer
                        "
                    >
                        <Plus size={16} />
                        Adicionar Empresa
                    </button>

                    <div className="relative w-full md:w-80">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Buscar empresas..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px]">

                        <thead className="bg-[#ffac2e]/10 border-b">
                            <tr className="text-left text-sm text-gray-600">
                                <th className="px-6 py-4">Empresa</th>
                                <th className="px-6 py-4">Admin</th>
                                <th className="px-6 py-4">CNPJ</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Localização</th>
                                <th className="px-6 py-4">Contato</th>
                                <th className="px-6 py-4">Endereço</th>
                                <th className="px-6 py-4">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedCompanies.map((c) => (
                                <tr
                                    key={c.id}
                                    className="border-b hover:bg-[#ffac2e]/5"
                                >

                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {c.fantasyName}
                                        <div className="text-xs text-gray-500">
                                            {c.legalName}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {c.adminName}
                                        <div className="text-xs text-gray-500">
                                            {c.adminEmail}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm">
                                        {c.cnpj}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`
                                            px-2 py-1 rounded-lg text-xs font-medium
                                            ${c.cnpj_status === "VALID"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }
                                        `}>
                                            {c.cnpj_status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {c.city} - {c.state}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {c.phone}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {c.address}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button className="flex items-center gap-2 text-[#ffac2e] hover:bg-[#ffac2e]/10 px-3 py-1.5 rounded-lg cursor-pointer" onClick={() => navigate(`/companies/${c.id}`)}>
                                            <Eye size={16} />
                                            Ver
                                        </button>
                                        <button
                                            className="flex items-center gap-2 text-[#ffac2e] hover:bg-[#ffac2e]/10 px-3 py-1.5 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                navigate(`/companies/update/${c.id}`)
                                            }
                                        >
                                            <Edit size={16} />
                                            Editar
                                        </button>
                                    </td>

                                </tr>
                            ))}

                            {paginatedCompanies.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-10 text-gray-500">
                                        Nenhuma empresa encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                {/* PAGINATION */}
                <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">

                    <p className="text-sm text-gray-500">
                        Mostrando{" "}
                        <span className="font-medium">
                            {paginatedCompanies.length}
                        </span>{" "}
                        de{" "}
                        <span className="font-medium">
                            {filteredCompanies.length}
                        </span>
                    </p>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="w-9 h-9 border rounded-lg flex items-center justify-center disabled:opacity-40"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="text-sm">
                            {currentPage} / {totalPages || 1}
                        </div>

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="w-9 h-9 border rounded-lg flex items-center justify-center disabled:opacity-40"
                        >
                            <ChevronRight size={18} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}