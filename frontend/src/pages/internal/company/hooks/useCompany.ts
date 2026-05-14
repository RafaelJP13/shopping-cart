import { useState } from "react";

export function useCompany(id: string | undefined) {
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingCNPJ, setLoadingCNPJ] = useState(false);
    const [cnpjStatus, setCnpjStatus] = useState<"idle" | "success" | "error">("idle");

    const [formData, setFormData] = useState({
        adminName: "",
        adminEmail: "",
        representante: "",
        fantasyName: "",
        legalName: "",
        cnpj: "",
        cnpj_status: "",
        phone: "",
        cep: "",
        state: "",
        city: "",
        address: "",
    });

    return {
        loading,
        setLoading,
        loadingPage,
        setLoadingPage,
        loadingCNPJ,
        setLoadingCNPJ,
        cnpjStatus,
        setCnpjStatus,
        formData,
        setFormData,
    };
}