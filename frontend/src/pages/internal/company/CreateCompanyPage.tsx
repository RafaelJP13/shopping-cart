import { useState } from "react";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Save,
    ArrowLeft,
} from "lucide-react";

export default function CreateCompanyPage() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        document: "",
        address: "",
        city: "",
        state: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/companies",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create company");
            }

            const data = await response.json();

            console.log("Company created:", data);

            alert("Empresa criada com sucesso!");

            setFormData({
                name: "",
                email: "",
                phone: "",
                document: "",
                address: "",
                city: "",
                state: "",
            });
        } catch (error) {
            console.error(error);
            alert("Erro ao criar empresa");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 w-full">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Adicionar Empresa
                    </h1>

                    <p className="text-sm text-gray-500">
                        Cadastre uma nova empresa na plataforma
                    </p>
                </div>

                <button
                    onClick={() => window.history.back()}
                    className="
                        flex items-center gap-2
                        px-4 py-2
                        border
                        rounded-xl
                        text-sm
                        hover:bg-gray-100
                        transition
                        cursor-pointer
                    "
                >
                    <ArrowLeft size={16} />
                    Voltar
                </button>
            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    p-6
                    shadow-sm
                "
            >

                {/* COMPANY INFO */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Building2
                            size={20}
                            className="text-[#ffac2e]"
                        />

                        <h2 className="text-lg font-semibold text-gray-800">
                            Informações da Empresa
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* NAME */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome da Empresa
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Digite o nome da empresa"
                                required
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-gray-200
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#ffac2e]/30
                                    focus:border-[#ffac2e]
                                "
                            />
                        </div>

                        {/* DOCUMENT */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CNPJ
                            </label>

                            <input
                                type="text"
                                name="document"
                                value={formData.document}
                                onChange={handleChange}
                                placeholder="00.000.000/0000-00"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-gray-200
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#ffac2e]/30
                                    focus:border-[#ffac2e]
                                "
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                E-mail
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                    "
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="empresa@email.com"
                                    className="
                                        w-full
                                        pl-10
                                        pr-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-gray-200
                                        outline-none
                                        focus:ring-2
                                        focus:ring-[#ffac2e]/30
                                        focus:border-[#ffac2e]
                                    "
                                />
                            </div>
                        </div>

                        {/* PHONE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Telefone
                            </label>

                            <div className="relative">
                                <Phone
                                    size={18}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                    "
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="(11) 99999-9999"
                                    className="
                                        w-full
                                        pl-10
                                        pr-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-gray-200
                                        outline-none
                                        focus:ring-2
                                        focus:ring-[#ffac2e]/30
                                        focus:border-[#ffac2e]
                                    "
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* ADDRESS */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin
                            size={20}
                            className="text-[#ffac2e]"
                        />

                        <h2 className="text-lg font-semibold text-gray-800">
                            Endereço
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* ADDRESS */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Endereço
                            </label>

                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Rua, número e bairro"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-gray-200
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#ffac2e]/30
                                    focus:border-[#ffac2e]
                                "
                            />
                        </div>

                        {/* CITY */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cidade
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="São Paulo"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-gray-200
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#ffac2e]/30
                                    focus:border-[#ffac2e]
                                "
                            />
                        </div>

                        {/* STATE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado
                            </label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="SP"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-gray-200
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#ffac2e]/30
                                    focus:border-[#ffac2e]
                                "
                            />
                        </div>

                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end mt-8">

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            flex items-center gap-2
                            px-5 py-3
                            rounded-xl
                            bg-[#ffac2e]
                            text-white
                            font-medium
                            hover:opacity-90
                            transition
                            disabled:opacity-50
                            cursor-pointer
                        "
                    >
                        <Save size={18} />

                        {loading
                            ? "Salvando..."
                            : "Salvar Empresa"}
                    </button>

                </div>
            </form>
        </div>
    );
}