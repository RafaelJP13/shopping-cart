import { ArrowLeft } from "lucide-react";

type Props = {
    onBack: () => void;
};

export function CompanyHeader({ onBack }: Props) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Editar Empresa
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Atualize os dados da empresa
                </p>
            </div>

            <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-2xl hover:bg-gray-100 cursor-pointer"
            >
                <ArrowLeft size={16} />
                Voltar
            </button>
        </div>
    );
}