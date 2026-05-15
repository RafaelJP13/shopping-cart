import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    Building2,
    Mail,
    MapPin,
    Calendar,
    BadgeCheck,
} from "lucide-react";

import toast from "react-hot-toast";
import fetchWithRefresh from "../../../services/api";

interface Company {
    id: string;

    fantasyName: string;
    legalName: string;

    cnpj: string;
    cnpj_status: string;

    representante: string;

    adminName: string;
    adminEmail: string;

    phone: string;

    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;

    createdAt: string;
}

export default function CompanyDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadCompany() {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetchWithRefresh(
                `http://localhost:3000/companies/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Erro ao carregar empresa");
            }

            const data = await response.json();

            setCompany(data);
        } catch (error) {
            toast.error("Erro ao carregar empresa");

            navigate("/companies");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCompany();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-zinc-500">
                    Carregando empresa...
                </p>
            </div>
        );
    }

    if (!company) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">
                        {company.fantasyName}
                    </h1>

                    <p className="text-zinc-500 mt-1">
                        Visualização completa da empresa
                    </p>
                </div>

                <button
                    onClick={() => navigate("/companies")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#FFAC2E] hover:bg-zinc-100 transition cursor-pointer"
                >
                    <ArrowLeft size={18} />
                    Voltar
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-[#FFAC2E] rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
                                <Building2 className="text-zinc-700" />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-zinc-900">
                                    Informações da empresa
                                </h2>

                                <p className="text-sm text-zinc-500">
                                    Dados cadastrais da empresa
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InfoItem
                                label="Nome fantasia"
                                value={company.fantasyName}
                            />

                            <InfoItem
                                label="Razão social"
                                value={company.legalName}
                            />

                            <InfoItem
                                label="CNPJ"
                                value={company.cnpj}
                            />

                            <InfoItem
                                label="Status do CNPJ"
                                value={company.cnpj_status}
                            />

                            <InfoItem
                                label="Representante"
                                value={company.representante}
                            />

                            <InfoItem
                                label="Telefone"
                                value={company.phone}
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-[#FFAC2E] rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
                                <MapPin className="text-zinc-700" />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-zinc-900">
                                    Endereço
                                </h2>

                                <p className="text-sm text-zinc-500">
                                    Informações de localização
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InfoItem
                                label="CEP"
                                value={company.cep}
                            />

                            <InfoItem
                                label="Estado"
                                value={company.state}
                            />

                            <InfoItem
                                label="Cidade"
                                value={company.city}
                            />

                            <InfoItem
                                label="Bairro"
                                value={company.neighborhood}
                            />

                            <div className="md:col-span-2">
                                <InfoItem
                                    label="Endereço"
                                    value={company.address}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-[#FFAC2E]  rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <Mail className="text-zinc-700" />

                            <h2 className="text-lg font-semibold text-zinc-900">
                                Administrador
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <InfoItem
                                label="Nome"
                                value={company.adminName}
                            />

                            <InfoItem
                                label="E-mail"
                                value={company.adminEmail}
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-[#FFAC2E] rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <BadgeCheck className="text-zinc-700" />

                            <h2 className="text-lg font-semibold text-zinc-900">
                                Status
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-zinc-500 mb-1">
                                    Situação do CNPJ
                                </p>

                                <span className="inline-flex px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700 font-medium">
                                    {company.cnpj_status}
                                </span>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500 mb-1">
                                    Data de criação
                                </p>

                                <div className="flex items-center gap-2 text-zinc-800">
                                    <Calendar size={16} />

                                    {new Date(
                                        company.createdAt,
                                    ).toLocaleDateString("pt-BR")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-sm text-zinc-500 mb-1">
                {label}
            </p>

            <p className="text-zinc-900 font-medium break-words">
                {value || "-"}
            </p>
        </div>
    );
}