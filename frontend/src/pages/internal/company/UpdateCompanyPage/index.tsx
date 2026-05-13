import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { CompanyHeader } from "./components/CompanyHeader";
import { CompanyForm } from "./components/CompanyForm";
import { CompanyInfoSection } from "./components/sections/CompanyInfoSection";
import { AddressSection } from "./components/sections/AddressSection";
import { ActionsSection } from "./components/sections/ActionsSection";

// se você extraiu hook
import { useCompany } from "./hooks/useCompany";

export default function UpdateCompanyPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const company = useCompany(id);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        company.setFormData({
            ...company.formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchCompany = async () => {
        try {
            company.setLoadingPage(true);

            const response = await fetch(
                `http://localhost:3000/companies/${id}`
            );

            if (!response.ok) {
                throw new Error("Erro ao buscar empresa");
            }

            const data = await response.json();

            company.setFormData({
                adminName: data.adminName || "",
                adminEmail: data.adminEmail || "",
                representante: data.representante || "",
                fantasyName: data.fantasyName || "",
                legalName: data.legalName || "",
                cnpj: data.cnpj || "",
                cnpj_status: data.cnpj_status || "",
                phone: data.phone || "",
                cep: data.cep || "",
                state: data.state || "",
                city: data.city || "",
                address: data.address || "",
            });

            company.setCnpjStatus("success");
        } catch (err) {
            toast.error("Erro ao carregar empresa");
            navigate("/companies");
        } finally {
            company.setLoadingPage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            company.setLoading(true);

            const response = await fetch(
                `http://localhost:3000/companies/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(company.formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao atualizar empresa");
            }

            toast.success("Empresa atualizada com sucesso!");

            setTimeout(() => {
                navigate("/companies");
            }, 1200);
        } catch (err: any) {
            toast.error(err.message || "Erro ao atualizar empresa");
        } finally {
            company.setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompany();
    }, []);

    if (company.loadingPage) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-10 h-10 border-4 border-[#ffac2e] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 w-full bg-gray-50 min-h-screen">

            <CompanyHeader onBack={() => navigate(-1)} />

            <CompanyForm onSubmit={handleSubmit}>

                <CompanyInfoSection
                    formData={company.formData}
                    onChange={handleChange}
                    onDocumentChange={company.handleDocumentChange}
                    loadingCNPJ={company.loadingCNPJ}
                    cnpjStatus={company.cnpjStatus}
                />

                <div className="mt-10">
                    <AddressSection
                        formData={company.formData}
                        onChange={handleChange}
                    />
                </div>

                <ActionsSection loading={company.loading} />

            </CompanyForm>

        </div>
    );
}